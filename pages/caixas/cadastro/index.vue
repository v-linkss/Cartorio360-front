<script setup>
const config = useRuntimeConfig();
const createCaixa = `${config.public.managemant}/caixasLanctos`;
const getClsassesDespesas = `${config.public.managemant}/classes-despesas`;

const userData = ref(useCookie("user-data").value || {});
const cartorio_id = ref(useCookie("user-data").value.cartorio_id || null);

const usuario_token = ref(useCookie("auth_token").value) || null;
const cartorio_token = ref(useCookie("user-data").value.cartorio_token) || null;

const classesDespesas = ref([])

const { $toast } = useNuxtApp();

const form = ref({
  data: null,
  classe_despesa_id: null,
  descricao: "",
  valor: null,
});

const token = {
    cartorio_token: cartorio_token.value,
  }

const {data: classesDespesasData} = await useFetch(`${getClsassesDespesas}`, {
  method: "POST",
  body: token,
});

classesDespesas.value = classesDespesasData.value || [];

const handleCreateCaixas = async () => {
  try {
    const classesDespesasPayload = {
      data: form.data,
      classe_despesa_id: form.value.pai_id,
      descricao: form.value.ato_tipo_tj_id,
      valor: form.value.descricao,
      user_id: userData.value.usuario_id,
      user_alteracao_id: userData.value.usuario_id,
      cartorio_id: cartorio_id.value,
    };
    
    const { data, error } = await useFetch(createCaixa, {
      method: "POST",
      body: classesDespesasPayload,
    });

    if (error.value) {
      throw new Error(error.value.message || "Erro desconhecido na API");
    }

    $toast.success("Caixa cadastrada com sucesso");
    navigateTo('/tipoAtos/lista');

  } catch (error) {
    console.error("Erro ao criar caixa:", error);
    $toast.error(error.message || "Erro ao cadastrar caixa");
  }
};

</script>

<template>
  <v-container>
    <h1 class="mb-5">Criar Caixa</h1>
    <v-form @submit.prevent="handleCreateCaixas">
      <v-col cols="6">
        <v-row>
            <v-text-field v-model="form.data" type="date" label="Data"></v-text-field>
        </v-row>
      </v-col>
      <v-row>
        <v-col cols="6">
          <v-autocomplete
            v-model="form.classe_despesa_id"
            :items="classesDespesas"
            item-title="descricao"
            item-value="id"
            label="Serviço"
            required
            outlined
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="6">
          <MoneyInput required v-model="form.valor" label="Valor" />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="6">
          <v-text-field v-model="form.descricao" label="Descrição" required outlined />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-btn size="large" color="red" to="/caixas/caixasRecebimentoOs">Voltar</v-btn>
          <v-btn type="submit" class="ml-4" size="large" color="green">Salvar</v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>
