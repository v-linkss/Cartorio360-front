<template>
  <v-row>
    <v-col>
      <ejs-documenteditorcontainer
        :restrictEditing="true"
        :enableToolbar="false"
        ref="documentEditorContainer"
        height="850px"
        width="850px"
      >
      </ejs-documenteditorcontainer>
    </v-col>
    <v-col v-if="!isVisualizar">
      <v-autocomplete
        class="mt-15"
        label="Tabelião/escrevente"
        v-model="state.escrevente"
        :items="escreventesItems"
        item-title="nome"
        item-value="token"
        required
      >
      </v-autocomplete>
      <img
        @click="openModalCond()"
        style="height: 80px; width: 80px; cursor: pointer; margin-top: 40px"
        src="../../../assets/lavrar.png"
      />
      <v-card v-if="lavraData" width="360">
        <v-row>
          <v-col>
            <v-sheet style="font-weight: bold" class="pa-2 ma-2">
              <v-col> Livro: {{ lavraData[0].livro_numero }} </v-col>
              <v-col>
                Protocolo:
                {{ lavraData[0].protocolo ? lavraData[0].protocolo : null }}
              </v-col>
            </v-sheet>
          </v-col>
          <v-col>
            <v-sheet style="font-weight: bold" class="pa-2 ma-2 mt-3">
              Folhas : {{ lavraData[0].pagina_inicial }} A
              {{ lavraData[0].pagina_final }}
            </v-sheet>
          </v-col>
        </v-row>

        <div
          style="margin-left: 10px; padding-bottom: 20px; margin-top: -10px"
          v-html="selo"
        ></div>
      </v-card>
    </v-col>
  </v-row>

  <v-btn class="mt-5 ml-7 mb-5" color="red" size="large" @click="goBack"
    >Voltar</v-btn
  >
  <ModalConfirmacao
    :show="isModalCondOpen"
    :condMessage="condMessage"
    :description="condStatusMensagem"
    :valor="valorAto"
    @close="restartProcess"
    @confirm="confirmLavrar"
  />
</template>

<script setup>
import { DocumentEditorContainerComponent as EjsDocumenteditorcontainer } from "@syncfusion/ej2-vue-documenteditor";
import { registerLicense } from "@syncfusion/ej2-base";

const props = defineProps({
  pages: {
    type: Number,
    required: true,
  },
  document: {
    type: String,
    required: true,
  },
});

const config = useRuntimeConfig();
registerLicense(`${config.public.docEditor}`);
const { $toast } = useNuxtApp();
const router = useRouter();
const route = useRoute();
const baixarDocumento = `${config.public.managemant}/download`;
const pegarCaminhoDocumento = `${config.public.managemant}/atos/files`;
const lavraAtoLivro = `${config.public.managemant}/lavrarAto`;
const validaAto = `${config.public.managemant}/valida_lavratura`;
const allEscreventes = `${config.public.managemant}/listarEscrevente`;
const calculaAto = `${config.public.managemant}/ato_calcular`;
const cartorio_token = ref(useCookie("user-data").value.cartorio_token);
const usuario_token = useCookie("auth_token").value;
const condMessage = ref(
  "Ao lavrar esse ato, a operação não poderá ser desfeita. Confirma ?"
);
const condStatus = ref(null); // Guarda status da validação
const condStatusMensagem = ref(""); // Guarda mensagem do backend
const isModalCondOpen = ref(false);
const lavraData = ref(null);
const selo = ref(null);
const isVisualizar = ref(route.query.origem === "vizualizar");
const documentEditorContainer = ref(null);
const escreventesItems = ref([]);
const valorAto = ref({});
const state = reactive({
  escrevente: null,
});

const fetchBlobFromMinIO = async (fileUrl) => {
  try {
    const response = await fetch(fileUrl);
    if (!response.ok) {
      throw new Error("Erro ao baixar o arquivo do MinIO.");
    }
    return await response.blob();
  } catch (error) {
    console.error(error);
    return null;
  }
};

const getPathFromDocument = async () => {
  try {
    const { data } = await useFetch(
      `${pegarCaminhoDocumento}/${route.query.ato_token_edit}`,
      {
        method: "GET",
      }
    );

    return data.value.link_ato;
  } catch (error) {
    console.error("Erro ao carregar o documento:", error);
    $toast.error(error);
  }
};

const loadDefaultDocument = async () => {
  try {
    const filePath = await getPathFromDocument();
    const { data, status } = await useFetch(baixarDocumento, {
      method: "POST",
      body: {
        bucket: useCookie("user-data").value.cartorio_token,
        path: filePath,
      },
    });

    const fileUrl = data.value;
    const blob = await fetchBlobFromMinIO(fileUrl);
    if (blob) {
      const reader = new FileReader();

      reader.onload = () => {
        const content = reader.result;
        const documentEditor =
          documentEditorContainer.value.ej2Instances.documentEditor;
        documentEditor.open(content);
      };

      reader.readAsText(blob); // Leia o Blob como texto
    }
  } catch (error) {
    $toast.error("Erro ao carregar o documento.");
  }
};
loadDefaultDocument();

// Função para validar antes de lavrar
const lavraAto = async (force = false) => {
  const pages =
    documentEditorContainer.value.ej2Instances.documentEditor.pageCount;

  if (!force) {
    const { data, error, status } = await useFetch(validaAto, {
      method: "POST",
      body: { ato_token: route.query.ato_token_edit },
    });

    let statusResp, statusMsg;

    if (status.value === "success" && data.value) {
      statusResp = data.value[0].status;
      statusMsg = data.value[0].status_mensagem;
    } else if (error.value && error.value.data) {
      statusResp = error.value.data[0].status;
      statusMsg = error.value.data[0].status_mensagem;
    }

    if (statusResp !== "OK") {
      condStatus.value = statusResp;
      condStatusMensagem.value = statusMsg;
      valorAto.value = null;
      isModalCondOpen.value = true;
      condMessage.value = ` O ato apresenta inconsistências, deseja prosseguir?`;
      return;
    }
  }
  // Fluxo normal de lavratura
  const {
    data,
    status: statusLavrar,
    error,
  } = await useFetch(lavraAtoLivro, {
    method: "POST",
    body: {
      ato_token: route.query.ato_token_edit,
      qtd_paginas: pages,
      escrevente_token: state.escrevente,
      usuario_token: usuario_token,
      cartorio_token: cartorio_token,
    },
  });

  if (statusLavrar.value === "success") {
    lavraData.value = data.value;
    selo.value = data.value[0].selo;
    $toast.success("Ato lavrado com sucesso!");
  } else {
    $toast.error(
      error.value.data[0].status_mensagem || "Falha ao lavrar o ato."
    );
  }
};
const restartProcess = () => {
  isModalCondOpen.value = false;
  condStatus.value = null;
  condStatusMensagem.value = "";
  valorAto.value = {};
};
const calcularAto = async () => {
  const pages =
    documentEditorContainer.value.ej2Instances.documentEditor.pageCount;
  const { data, status } = await useFetch(calculaAto, {
    method: "POST",
    body: {
      ato_token: route.query.ato_token_edit,
      cartorio_token: cartorio_token,
      quantidade: 1,
      usuario_token: usuario_token,
      escrevente_token: state.escrevente,
      qtd_paginas: pages,
    },
  });

  if (status.value === "success") {
    valorAto.value = data.value[0];
  } else {
    $toast.error("Falha ao calcular o ato.");
  }
};

// Confirmação do modal: se veio de inconsistência, força lavratura
const confirmLavrar = async () => {
  isModalCondOpen.value = false;

  if (condStatus.value && condStatus.value !== "OK") {
    await lavraAto(true);
    condStatus.value = null;
    condStatusMensagem.value = "";
  } else {
    await lavraAto();
  }
};

const openModalCond = async () => {
  isModalCondOpen.value = true;
  condMessage.value =
    "Ao lavrar esse ato, a operação não poderá ser desfeita. Confirma ?";
  await calcularAto();
};
const { data } = await useFetch(allEscreventes, {
  method: "POST",
  body: { cartorio_token: cartorio_token },
});
escreventesItems.value = data.value[0].func_json_escreventes;

const goBack = () => {
  const origem = route.query.origem || "criar";
  const id = route.query.id;
  switch (origem) {
    case "atualizar":
    case "vizualizar":
      router.push(`/os/atualizar/${id}`);
      break;
    case "atualizar-lista":
    case "vizualizar-lista":
      router.push("/atos/lista");
      break;
    default:
      router.push("/os/criar-registro");
      break;
  }
};

watch(
  () => props.document,
  (newVal, oldVal) => {
    loadDefaultDocument();
  }
);
</script>
