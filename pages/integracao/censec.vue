<template>
  <v-container>
    <v-row>
      <v-col class="mt-1">
        <v-text-field
          v-model="state.data_inicio"
          label="Data Inicio"
          placeholder="dd/mm/yyyy"
          v-mask="'##/##/####'"
        ></v-text-field>
      </v-col>
      <v-col class="mt-1">
        <v-text-field
          v-model="state.data_fim"
          label="Data Fim"
          placeholder="dd/mm/yyyy"
          v-mask="'##/##/####'"
        ></v-text-field>
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
const integraCensec = `${config.public.managemant}/integra_censec_cep`;
const enviaCensec = `${config.public.ws}/censec/enviar`;
const state = reactive({
  data_inicio: null || getCurrentDate(),
  data_fim: null || getCurrentDate(),
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
  const { data, status } = await useFetch(`${integraCensec}`, {
    method: "POST",
    body: {
      cartorio_token: useCookie("user-data").value.cartorio_token,
      data_inicio: convertToISODate(state.data_inicio),
      data_fim: convertToISODate(state.data_fim),
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
