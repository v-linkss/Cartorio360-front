<template>
  <v-container>
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
            label="Serviço"
            class="mr-5"
            v-model="label"
            disabled
          ></v-autocomplete>
        </v-col>
        <v-col md="5">
          <v-autocomplete
            v-model="updatedAtoDetails"
            label="Tipo de Ato"
            disabled
          ></v-autocomplete>
        </v-col>
        <div v-if="!isVisualizar">
          <img
            class="mt-2"
            :style="{
              cursor: dadosData.dt_lavratura ? 'default' : 'pointer',
              width: '35px',
              height: '35px',
            }"
            src="../../../../../assets/editar.png"
            alt="Editar"
            @click="openModal"
          />
        </div>
      </v-row>
    </div>

    <v-card width="1300">
      <v-tabs v-model="tab" bg-color="#f5f2f2">
        <v-tab value="dados">Dados</v-tab>
        <v-tab value="partes">Partes</v-tab>
        <v-tab v-if="usaImoveis" value="bens">Bens</v-tab>
        <v-tab v-if="usaImoveis" value="imoveis">Imoveis</v-tab>
        <v-tab value="minuta">Minuta</v-tab>
        <v-tab value="livro">Livro</v-tab>
        <v-tab value="observacao">Observações</v-tab>
        <v-tab value="anexo">Anexos</v-tab>
        <v-tab value="outros">Outros</v-tab>
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
        <v-tabs-window-item value="bens" v-if="usaImoveis">
          <ProcuracaoAtualizarBens />
        </v-tabs-window-item>
        <v-tabs-window-item value="imoveis" v-if="usaImoveis">
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
        <v-tabs-window-item value="outros">
          <ProcuracaoAtualizarOutros />
        </v-tabs-window-item>
      </v-tabs-window>
    </v-card>
  </v-container>
  <ModalTiposAtos
    v-if="modalVisible"
    :show="modalVisible"
    :servicos="dadosData.servicos || []"
    :tiposAtos="dadosData.tiposAtos || []"
    @close="modalVisible = false"
    @updateAto="handleUpdateAto"
  />
</template>

<script setup>
const pages_prop = ref(null);
const doc_prop = ref(null);
const tab = ref(null);
const config = useRuntimeConfig();
const route = useRoute();
const isVisualizar = ref(route.query.origem === "vizualizar");
const allSituacoes = `${config.public.auth}/service/gerencia/listarSituacoes`;
const getAtoId = `${config.public.auth}/service/gerencia/getAtos`;
const cartorio_token = ref(useCookie("user-data").value.cartorio_token);
const body = route.query.id
  ? { ato_token: route.query.tipo_ato_token }
  : { cartorio_token: cartorio_token };
const situacoesItems = ref([]);
const dadosData = ref([]);
const modalVisible = ref(false);
const usaImoveis = ref(route.query.usa_imoveis === "true" ? true : false);
const tipoAto = route.query.tipo_ato || "";
const label = ref(null);
const updatedAtoDetails = ref(null);
const [initialLabel, initialUpdatedAtoDetails] = tipoAto.split(" - ");
label.value = initialLabel || ""; // Primeiro autocomplete
updatedAtoDetails.value = initialUpdatedAtoDetails || ""; // Segundo autocomplete

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
    console.error(error);
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

function openModal() {
  if (!dadosData.dt_lavratura) {
    modalVisible.value = true;
  }
}

function handleUpdateAto({ descricao, usaImoveisParams }) {
  const [firstPart, secondPart] = descricao.split(" - ");
  label.value = firstPart || ""; // Primeiro autocomplete
  updatedAtoDetails.value = secondPart || ""; // Segundo autocomplete
  usaImoveis.value = usaImoveisParams;
}
</script>
