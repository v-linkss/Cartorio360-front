<template>
  <v-container>
    <v-row>
      <v-col class="mt-1">
        <v-text-field v-model="state.data_inicio" label="Data Inicio" placeholder="dd/mm/yyyy"
          v-mask="'##/##/####'"></v-text-field>
      </v-col>
      <v-col class="mt-1">
        <v-text-field v-model="state.data_fim" label="Data Fim" placeholder="dd/mm/yyyy"
          v-mask="'##/##/####'"></v-text-field>
      </v-col>
      <v-radio-group v-model="state.validar" inline>
        <v-radio label="VALIDAR ATOS" value="ATOS"></v-radio>
        <v-radio label="CESDI" value="CESDI"></v-radio>
        <v-radio label="CEP" value="CEP"></v-radio>
        <v-radio label="RCTO" value="RCTO"></v-radio>
        <v-radio label="CCN" value="CCN"></v-radio>
      </v-radio-group>
    </v-row>

    <v-row>
      <v-col class="mt-1">
        <v-text-field label="Nome do arquivo" v-model="state.file_name" :disabled="!state.validar">
        </v-text-field>
      </v-col>
      <v-col>
        <SaveButton :text="'Confirmar'" :onSave="enviaDadosCensec" />
      </v-col>

    </v-row>


    <v-card>
      <v-card-title>Dados CENSEC</v-card-title>
      <v-card-text>
        <div v-if="dadosCensec">
          <pre>{{ JSON.stringify(dadosCensec, null, 2) }}</pre>
        </div>
        <div v-else>Nenhum dado disponível.</div>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
const config = useRuntimeConfig();
const { $toast } = useNuxtApp();
const integraCensec = `${config.public.managemant}/integra_censec`;
const enviaCensec = `${config.public.ws}/censec/enviar`;

const state = reactive({
  data_inicio: getCurrentDate(),
  data_fim: getCurrentDate(),
  validar: null,       // radio selecionado
  file_name: "",       // nome do arquivo
});

const dadosCensec = ref(null);

function getCurrentDate() {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");
  return `${dd}-${mm}-${yyyy}`;
}

function convertToISODate(date) {
  if (!date) return null;
  const [dd, mm, yyyy] = date.split("/");
  return `${yyyy}-${mm}-${dd}`;
}

const enviaDadosCensec = async () => {
  if (!state.validar) {
    $toast.warning("Selecione um tipo de validação antes de enviar!");
    return;
  }

  if (!state.file_name) {
    $toast.warning("Digite o nome do arquivo!");
    return;
  }

  const { data, status } = await useFetch(`${integraCensec}`, {
    method: "POST",
    body: {
      cartorio_token: useCookie("user-data").value.cartorio_token,
      data_inicio: convertToISODate(state.data_inicio),
      data_fim: convertToISODate(state.data_fim),
      validar: state.validar,        // envia o radio selecionado
      file_name: state.file_name,    // envia o nome do arquivo
    },
  });

  const value = data.value;

  if (status.value === "success") {
    const { data: dadosRetornados, status: statusEnvio } = await useFetch(
      `${enviaCensec}`,
      {
        method: "POST",
        body: { value },
      }
    );

    if (statusEnvio.value === "success") {
      $toast.success("Dados enviados com sucesso!");
      dadosCensec.value = dadosRetornados.value;
    } else {
      $toast.error("Erro ao enviar dados para CENSEC.");
    }
  }
};
</script>
