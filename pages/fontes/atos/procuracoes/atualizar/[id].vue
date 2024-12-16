<template>
  <h1 class="mb-2">Procuração</h1>
  <v-card width="1300">
    <v-tabs v-model="tab" bg-color="#f5f2f2">
      <v-tab value="dados">Dados</v-tab>
      <v-tab value="partes">Partes</v-tab>
      <v-tab value="minuta">Minuta</v-tab>
      <v-tab value="livro">Livro</v-tab>
      <v-tab value="observacao">Observações</v-tab>
      <v-tab value="anexo">Anexos</v-tab>
    </v-tabs>

    <v-tabs-window v-model="tab">
      <v-tabs-window-item value="dados">
        <ProcuracaoAtualizarDados :item_dados="dadosData" :item_situacoes="situacoesItems"/>
      </v-tabs-window-item>
      <v-tabs-window-item value="partes">
          <ProcuracaoAtualizarPartes />
        </v-tabs-window-item>
        <v-tabs-window-item value="minuta">
          <ProcuracaoMinuta @page="getPages" @doc="getDocument" />
        </v-tabs-window-item>
        <v-tabs-window-item value="livro">
          <ProcuracaoLivro :pages="pages_prop" :document="doc_prop"/>
        </v-tabs-window-item>
        <v-tabs-window-item value="observacao">
          <ProcuracaoAtualizarObservacao  />
        </v-tabs-window-item>
        <v-tabs-window-item value="anexo">
          <ProcuracaoAtualizarAnexos />
        </v-tabs-window-item>
    </v-tabs-window>
  </v-card>
</template>

<script setup>
const pages_prop = ref(null);
const doc_prop = ref(null);
const tab = ref(null);
const config = useRuntimeConfig();
const route = useRoute();
const allSituacoes = `${config.public.managemant}/listarSituacoes`;
const getAtoId = `${config.public.managemant}/getAtos`;
const cartorio_token = ref(useCookie("user-data").value.cartorio_token);
const body = route.query.id
  ? { ato_token: "xkyaA" }
  : { cartorio_token: cartorio_token };
const situacoesItems = ref([]);
const dadosData = ref([]);

async function loadData() {
  try {
    const { data: tipoAtoId } = await useFetch(
      `${getAtoId}/${route.query.id}`,
      {
        method: "GET",
      }
    );
    dadosData.value = tipoAtoId.value
  } catch (error) {
    console.log(error);
  }
}
await loadData();

const { data: situacaoData,status } = await useFetch(allSituacoes, {
  method: "POST",
  body: body,
});
situacoesItems.value = situacaoData.value;

const getPages = (pages) => {
  pages_prop.value = pages;
};

const getDocument = (doc) => {
  doc_prop.value = doc;
};
</script>
