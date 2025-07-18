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
    @close="isModalCondOpen = false"
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

const state = reactive({
  escrevente: null,
});

const lavraAto = async () => {
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
    if (data.value[0].tipo_etiqueta === "html") {
      lavraData.value = data.value;
      selo.value = data.value[0].selo;
    } else if (data.value[0].tipo_etiqueta === "zpl") {
      const { status: zplStatus } = await useFetch(`${imprimeZplSelo}`, {
        method: "POST",
        body: {
          zpl: data.value[0].selo,
        },
      });
      if (zplStatus.value !== "success") {
        $toast.error("Não foi possivel fazer a impressao da etiqueta");
        return;
      }
    }
    $toast.success("Ato lavrado com sucesso!");
  } else {
    $toast.error("Falha ao lavrar o ato.");
  }
};

const calcularAto = async () => {
  const { data, status } = await useFetch(calculaAto, {
    method: "POST",
    body: {
      ato_token: props.ato_token,
      cartorio_token: cartorio_token.value,
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
  await lavraAto();
};
const openModalCond = async () => {
  isModalCondOpen.value = true;
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
  if (origem === "atualizar") {
    router.push(`/os/atualizar/${id}`);
  } else {
    router.push("/os/criar-registro");
  }
};
</script>
