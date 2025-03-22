<script setup>
const config = useRuntimeConfig();
const getRelatorios = `${config.public.managemant}/getRelatorios`
const createRelatorios = `${config.public.managemant}/gerarRelatorioPessoa`
const getDadosDominio = `${config.public.managemant}/listaQuery`

const relatorios = ref([]);
const selectedRelatorio = ref(null);
const formInputs = ref([]);

const tokens = {
  user_token: useCookie("auth_token").value,
  cartorio_token: useCookie("user-data").value.cartorio_token,
  user_name: useCookie("user-data").value.nome,
};

const { data } = await useFetch(getRelatorios, {
  method: "POST",
  body: tokens,
});

relatorios.value = Array.isArray(data.value) ? data.value : [];
const options = computed(() =>
  relatorios.value.every((relatorio) => 
    !relatorio.codigo && !relatorio.value && !relatorio.parametros
  )
    ? []
    : relatorios.value.map((relatorio) => ({
        label: relatorio.codigo,
        value: relatorio.codigo,
        parametros: relatorio.parametros,
      }))
);

const handleRelatorioChange = async (selected) => {
  const selectedItem = options.value.find((option) => option.value === selected);
  if (selectedItem) {
    // Inicializa os campos com os parâmetros
    formInputs.value = selectedItem.parametros.map((param) => ({
      ...param,
      value: null,
      showDatePicker: false,
      items: [], // Para armazenar os dados do autocomplete
    }));

    // Busca dados para os campos do tipo TABLE
    for (const input of formInputs.value) {
      if (input.tipo === "TABLE" && input.dominio) {
        try {
          const { data } = await useFetch(getDadosDominio, {
            method: "POST",
            body: {
              cartorio_token: tokens.cartorio_token,
              parametros: input.dominio,
            },
          });
          input.items = Array.isArray(data.value)
            ? data.value.map((item) => ({ label: item.nome, value: item.token }))
            : [];
        } catch (error) {
          console.error("Erro ao buscar dados para TABLE:", error);
        }
      }
    }
  } else {
    formInputs.value = [];
  }
};

const handleCreateRelatorio = async (input) => {

  // Prepara os dados para envio com base no formulário preenchido
  const parametros = formInputs.value.reduce((acc, input) => {
    acc[input.parametro] = input.value;
    return acc;
  }, {});
  try {
    const novoRelatorio = {
      ...parametros,
      // user_id: useCookie("user-data").value.usuario_id,
      cartorio_token: useCookie("user-data").value.cartorio_token,
      consulta: selectedRelatorio.value

    }    
    console.log(novoRelatorio)
    // {"atos":null,"user_id":2,"consulta":"TIPOS ATOS - PARTES"}
    const {data} = await useFetch(createRelatorios, {
      method: "POST",
      body: novoRelatorio,
    });
        // Criar um Blob com o HTML retornado
    const blob = new Blob([data.value], { type: "text/html" });
    const url = URL.createObjectURL(blob);

    window.open(url, "_blank");
    formInputs.value = [];
    selectedRelatorio.value = null;

  } catch (error) {
    console.error('Erro ao criar o relatório:', error);
  }
};

</script>

<template>
  <h1>Relatórios</h1>
  <div>
    <v-autocomplete
      v-model="selectedRelatorio"
      :items="options"
      class="mb-5"
      item-title="label"
      item-value="value"
      label="Selecione o relatório"
      required
      @update:search="handleRelatorioChange"
    />
  </div>

  <div v-if="selectedRelatorio">
    <v-form>
      <v-row v-for="(input, index) in formInputs" :key="index">
        <v-col cols="4">
          <!-- Campo de texto padrão -->
          <v-text-field
            v-if="input.tipo !== 'DATE' && input.tipo !== 'TABLE'"
            v-model="input.value"
            :label="input.label"
            :required="input.obrigatorio"
          />

          <v-text-field
            v-if="input.tipo === 'INTEGER'"
            v-model="input.value"
            type="number"
            outlined
          />

          <!-- Campo de data -->
          <v-text-field
            v-if="input.tipo === 'DATE'"
            v-model="input.value"
            type="date"
          >
          </v-text-field>

          <!-- Campo autocomplete para tipo TABLE -->
          <v-autocomplete
            v-if="input.tipo === 'TABLE'"
            v-model="input.value"
            :items="input.items"
            item-title="label"
            item-value="value" 
            :label="input.label"
            :required="input.obrigatorio"
          />

        </v-col>
      </v-row>

      <v-btn color="green" class="mt-4" @click="handleCreateRelatorio(selectedRelatorio)">Enviar</v-btn>
    </v-form>
  </div>
</template>