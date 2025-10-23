<template>
  <v-row>
    <v-col>
      <ejs-documenteditorcontainer
        :restrictEditing="true"
        :enableToolbar="false"
        :created="props.document ? onCreated : null"
        ref="documentEditorContainer"
        height="850px"
        width="850px"
        :key="props.document"
      >
      </ejs-documenteditorcontainer>
    </v-col>
    <v-col>
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
      <div>
        <div>
          <img
            @click="openModalCond()"
            class="ml-2"
            style="height: 80px; width: 80px; cursor: pointer; margin-top: 40px"
            src="../../assets/lavrar.png"
          />
          <v-card v-if="lavraData" class="mr-16">
            <v-row no-gutters>
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
            <div v-html="selo"></div>
          </v-card>
        </div>
      </div>
    </v-col>
  </v-row>
  <v-btn class="mt-5 ml-7 mb-5" color="red" size="large" @click="goBack"
    >Voltar</v-btn
  >
  <ModalConfirmacao
    :show="isModalCondOpen"
    :condMessage="condMessage"
    :valor="valorAto"
    :description="condStatusMensagem"
    @close="restartProcess"
    @confirm="confirmLavrar"
  />
</template>

<script setup>
import { DocumentEditorContainerComponent as EjsDocumenteditorcontainer } from "@syncfusion/ej2-vue-documenteditor";
import { registerLicense } from "@syncfusion/ej2-base";
const props = defineProps({
  ato_token: {
    type: String,
    required: true,
  },
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
const allEscreventes = `${config.public.managemant}/listarEscrevente`;
const lavraAtoLivro = `${config.public.managemant}/lavrarAto`;
const validaAto = `${config.public.managemant}/valida_lavratura`;
const calculaAto = `${config.public.managemant}/ato_calcular`;
const condMessage = ref(
  "Ao lavrar esse ato, a operação não poderá ser desfeita. Confirma ?"
);
const isModalCondOpen = ref(false);
const lavraData = ref(null);
const selo = ref(null);
const documentEditorContainer = ref(null);
const cartorio_token = ref(useCookie("user-data").value.cartorio_token);
const usuario_token = useCookie("auth_token").value;
const escreventesItems = ref([]);
const valorAto = ref({});
const condStatus = ref(null); // Guarda status da validação
const condStatusMensagem = ref(""); // Guarda mensagem do backend
const state = reactive({
  escrevente: null,
});

const lavraAto = async (force = false) => {
  if (!force) {
    const { data: validaData } = await useFetch(validaAto, {
      method: "POST",
      body: { ato_token: props.ato_token },
    });
    const statusResp = validaData.value[0].status;
    const statusMsg = validaData.value[0].status_mensagem;
    if (statusResp !== "OK") {
      condStatus.value = statusResp;
      condStatusMensagem.value = statusMsg;
      valorAto.value = null;
      isModalCondOpen.value = true;
      condMessage.value = `O ato apresenta inconsistências, deseja prosseguir?`;
      return;
    }
  }
  // Fluxo normal de lavratura
  const { data, status } = await useFetch(lavraAtoLivro, {
    method: "POST",
    body: {
      ato_token: props.ato_token,
      qtd_paginas: props.pages,
      escrevente_token: state.escrevente,
      usuario_token: usuario_token,
      cartorio_token: cartorio_token,
    },
  });

  if (status.value === "success") {
    lavraData.value = data.value;
    selo.value = data.value[0].selo;
    $toast.success("Ato lavrado com sucesso!");
  } else {
    $toast.error("Falha ao lavrar o ato.");
  }
};

const restartProcess = () => {
  isModalCondOpen.value = false;
  condStatus.value = null;
  condStatusMensagem.value = "";
  valorAto.value = {};
};

const calcularAto = async () => {
  const { data, status } = await useFetch(calculaAto, {
    method: "POST",
    body: {
      ato_token: props.ato_token,
      cartorio_token: cartorio_token,
      quantidade: 1,
      usuario_token: usuario_token,
      escrevente_token: state.escrevente,
      qtd_paginas: props.pages,
    },
  });

  if (status.value === "success") {
    valorAto.value = data.value[0];
  } else {
    $toast.error("Falha ao calcular o ato.");
  }
};

const confirmLavrar = async () => {
  isModalCondOpen.value = false;
  // Se condStatus está preenchido e não é OK, força lavratura
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
  console.log("oi");
  await calcularAto();
};
const { data } = await useFetch(allEscreventes, {
  method: "POST",
  body: { cartorio_token: cartorio_token },
});
escreventesItems.value = data.value[0].func_json_escreventes;

const onCreated = function () {
  const documentEditor =
    documentEditorContainer.value.ej2Instances.documentEditor;
  documentEditor.open(props.document);
};

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
</script>
