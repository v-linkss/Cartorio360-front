<template> 
<div class="mb-10">
  <v-row class="mb-5 mt-5">
      <h1>Ordem de Serviço nº</h1>
      <h1 style="color: red; margin-left: 30px">
        {{ route.query.numero_os }}
      </h1>
    </v-row>
  <v-row>
    <v-col md="6">
      <v-autocomplete
        class="mr-5"
        v-model="label"
        disabled
      ></v-autocomplete>
    </v-col>
    <v-col md="6">
      <v-autocomplete
        v-model="label2"
        disabled
      ></v-autocomplete>
    </v-col>
  </v-row>
</div> 
  <v-card width="1300">
    <v-tabs v-model="tab" bg-color="#f5f2f2">
      <v-tab value="dados">Dados</v-tab>
      <v-tab value="partes">Partes</v-tab>
      <v-tab value="bens">Bens</v-tab>
      <v-tab value="imoveis">Imoveis</v-tab>
      <v-tab value="minuta">Minuta</v-tab>
      <v-tab value="livro">Livro</v-tab>
      <v-tab value="observacao">Observações</v-tab>
      <v-tab value="anexo">Anexos</v-tab>
    </v-tabs>

    <v-tabs-window v-model="tab">
      <v-tabs-window-item value="dados">
        <ProcuracaoAtualizarDados
          :item_dados="dadosData"
          :item_situacoes="situacoesItems"
        />
      </v-tabs-window-item>
      <v-tabs-window-item value="partes">
        <ProcuracaoAtualizarPartes />
      </v-tabs-window-item>
      <v-tabs-window-item value="bens">
        <ProcuracaoAtualizarBens />
      </v-tabs-window-item>
      <v-tabs-window-item value="imoveis">
        <ProcuracaoAtualizarImoveis />
      </v-tabs-window-item>
      <v-tabs-window-item value="minuta">
        <ProcuracaoAtualizarMinuta @page="getPages" @doc="getDocument" />
      </v-tabs-window-item>
      <v-tabs-window-item value="livro">
        <ProcuracaoAtualizarLivro :pages="pages_prop" :document="doc_prop" />
      </v-tabs-window-item>
      <v-tabs-window-item value="observacao">
        <ProcuracaoAtualizarObservacao />
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
const allSituacoes = `${config.public.auth}/service/gerencia/listarSituacoes`;
const getAtoId = `${config.public.auth}/service/gerencia/getAtos`;
const cartorio_token = ref(useCookie("user-data").value.cartorio_token);
const body = route.query.id
  ? { ato_token: "xkyaA" }
  : { cartorio_token: cartorio_token };
const situacoesItems = ref([]);
const dadosData = ref([]);
const label = ref("PROCURAÇÕES")
const label2 = ref("PROCURAÇÃO")

async function loadData() {
  try {
    const { data: tipoAtoId } = await fetchWithToken(
      `${getAtoId}/${route.query.ato_id}`,
      {
        method: "GET",
      }
    );
    dadosData.value = tipoAtoId.value;
  } catch (error) {
    console.log(error);
  }
}
await loadData();

const { data: situacaoData, status } = await fetchWithToken(allSituacoes, {
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
