<template>
  <ejs-documenteditorcontainer
    height="900px"
    ref="documentEditorContainer"
    :serviceUrl="serviceUrl"
    :enableToolbar="true"
    :enableWordExport="true"
  >
  </ejs-documenteditorcontainer>
  <div v-if="loading" class="loading-overlay">
    <v-progress-circular
      indeterminate
      color="white"
      size="60"
      class="loading-spinner"
    ></v-progress-circular>
  </div>

  <v-row class="ml-4 mt-4 mb-4">
    <NuxtLink class="mr-4">
      <v-btn size="large" @click="goBack" color="red">Voltar</v-btn>
    </NuxtLink>
    <v-btn
      size="large"
      color="green"
      @click="salvarDocumento"
      :disabled="loading"
      >Salvar</v-btn
    >
    <v-btn class="ml-4" size="large" color="blue" @click="gerarMinuta"
      >Gerar Minuta</v-btn
    >
  </v-row>
</template>

<script setup>
import { provide } from "vue";
import {
  DocumentEditorContainerComponent as EjsDocumenteditorcontainer,
  Toolbar,
  WordExport,
} from "@syncfusion/ej2-vue-documenteditor";
import { registerLicense } from "@syncfusion/ej2-base";

const props = defineProps({
  ato_token: {
    type: String,
    required: true,
  },
});

provide("DocumentEditorContainer", [Toolbar, WordExport]);
const config = useRuntimeConfig();
const { $toast } = useNuxtApp();
const router = useRouter();
const route = useRoute();
const emit = defineEmits(["page", "doc"]);
registerLicense(`${config.public.docEditor}`);
const enviarDocumento = `${config.public.managemant}/upload`;

const serviceUrl =
  "https://ej2services.syncfusion.com/production/web-services/api/documenteditor/";
const documentEditorContainer = ref(null);
const loading = ref(false);

const onDocumentChange = async () => {
  const document = documentEditorContainer.value.ej2Instances.documentEditor;
  const sfdt = await document.saveAsBlob("Sfdt");
  const reader = new FileReader();
  reader.onload = () => {
    const sfdtText = reader.result;
    emit("doc", sfdtText);
  };
  reader.readAsText(sfdt);
};

const salvarDocumento = async () => {
  loading.value = true;
  try {
    const document = documentEditorContainer.value.ej2Instances.documentEditor;
    const blob = await document.saveAsBlob("Sfdt");
    const formData = new FormData();
    formData.append("file", blob, `anexo.docx`);
    formData.append(
      "cartorio_token",
      useCookie("user-data").value.cartorio_token
    );
    formData.append("token", props.ato_token);
    formData.append("tipo", "ato_minuta");

    const { data, status } = await useFetch(enviarDocumento, {
      method: "POST",
      body: formData,
    });

    if (status.value === "success") {
      $toast.success("Documento enviado!");
      const document =
        documentEditorContainer.value.ej2Instances.documentEditor;
      const pageCount = document.pageCount;
      onDocumentChange();
      emit("page", pageCount);
    } else {
      $toast.error("Erro ao enviar documento para o sistema.");
    }
  } catch (error) {
    $toast.error("Erro ao salvar documento.");
    console.error(error);
  } finally {
    loading.value = false;
  }
};

const gerarMinuta = async () => {
  setLoading(true);

  try {
    await carregarModeloDeMinuta();

    setLoading(true);

    const { data, status } = await useFetch(substituirModelo, {
      method: "POST",
      body: { ato_token: props.ato_token },
    });

    if (data.value) {
      substituirMarcadoresNoDocumento(data.value);
    }
  } catch (error) {
    console.error("Erro ao gerar a minuta:", error);
    $toast.error("Ocorreu um erro ao gerar a minuta.");
  } finally {
    setLoading(false);
  }
};

const carregarModeloDeMinuta = async () => {
  try {
    const { data: docModelo } = await useFetch(baixarDocumento, {
      method: "POST",
      body: { bucket: "qvgjz", path: "provider/modeloAto.sfdt" },
    });

    const blob = await fetchBlobFromMinIO(docModelo.value);
    if (blob) {
      const reader = new FileReader();

      reader.onload = () => {
        const content = reader.result;
        const documentEditor =
          documentEditorContainer.value.ej2Instances.documentEditor;
        documentEditor.open(content);
        emit("doc", content);
      };

      reader.readAsText(blob); // Leia o Blob como texto
    }
  } catch (error) {
    console.error("Erro ao carregar o modelo de minuta:", error);
    $toast.error("Falha ao carregar o modelo de minuta.");
  }
};

const substituirMarcadoresNoDocumento = (data) => {
  const documentEditor =
    documentEditorContainer.value.ej2Instances.documentEditor;

  const substituirMarcadores = (obj) => {
    for (const [chave, valor] of Object.entries(obj)) {
      // Substituir apenas chaves no formato <<chave>>
      if (/^<<.+>>$/.test(chave)) {
        try {
          documentEditor.search.findAll(chave);
          if (documentEditor.search.searchResults.length > 0) {
            documentEditor.search.searchResults.replaceAll(valor);
          }
        } catch (error) {
          console.error(`Erro ao substituir o marcador ${chave}:`, error);
        }
      } else if (
        chave === "partes" &&
        Array.isArray(valor) &&
        valor.length > 0
      ) {
        // Processar a chave "partes" se for um array com elementos
        for (const parte of valor) {
          if (typeof parte === "object") {
            substituirMarcadores(parte); // Substituir marcadores recursivamente
          }
        }
      }
    }
  };

  substituirMarcadores(data);
};

const setLoading = (status) => {
  loading.value = status;
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

<style>
@import "../../node_modules/@syncfusion/ej2-base/styles/material.css";
@import "../../node_modules/@syncfusion/ej2-buttons/styles/material.css";
@import "../../node_modules/@syncfusion/ej2-inputs/styles/material.css";
@import "../../node_modules/@syncfusion/ej2-popups/styles/material.css";
@import "../../node_modules/@syncfusion/ej2-lists/styles/material.css";
@import "../../node_modules/@syncfusion/ej2-navigations/styles/material.css";
@import "../../node_modules/@syncfusion/ej2-splitbuttons/styles/material.css";
@import "../../node_modules/@syncfusion/ej2-dropdowns/styles/material.css";
@import "../../node_modules/@syncfusion/ej2-vue-documenteditor/styles/material.css";
</style>
