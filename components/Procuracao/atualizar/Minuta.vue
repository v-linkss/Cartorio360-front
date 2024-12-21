
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
    <v-progress-circular indeterminate color="white" size="60" class="loading-spinner"></v-progress-circular>
  </div>

  <div 
    class="mt-4 mb-4 justify-end fixed-buttons" 
    style="bottom: 0; left: 0; width: 100%; background-color: #fff; padding: 16px; z-index: 1000;"
  >
    <v-btn 
      size="large" 
      color="green" 
      @click="salvarDocumento" 
      :disabled="loading"
    >
      Salvar
    </v-btn>

    <NuxtLink class="ml-4">
      <v-btn size="large" @click="goBack" color="red">Voltar</v-btn>
    </NuxtLink>
  </div>
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
const baixarDocumento = `${config.public.managemant}/download`;

const enviarDocumento = `${config.public.managemant}/upload`;
const serviceUrl =
  "https://ej2services.syncfusion.com/production/web-services/api/documenteditor/";

const documentEditorContainer = ref(null);

// Variável de estado para controlar o loading
const loading = ref(false);


const fetchBlobFromMinIO = async (fileUrl) => {
  try {
    const response = await fetch(fileUrl);
    if (!response.ok) {
      throw new Error("Erro ao baixar o arquivo do MinIO.");
    }
    return await response.blob();
  } catch (error) {
    console.error(error);
    $toast.error("Erro ao carregar o documento inicial.");
    return null;
  }
};

// Função para carregar o documento inicial no editor
const loadDefaultDocument = async () => {
  loading.value = true; // Inicia o loading
  try {
    const { data, status } = await useFetch(baixarDocumento, {
      method: "POST",
      body: { bucket: "qvgjz", path: "ato/fKumj/66398.sfdt" },
    });
    const fileUrl = data.value;
    const blob = await fetchBlobFromMinIO(fileUrl);

    if (blob) {
      const reader = new FileReader();

      reader.onload = () => {
        const content = reader.result; // O conteúdo do arquivo
        const documentEditor = documentEditorContainer.value.ej2Instances.documentEditor;
        documentEditor.open(content); // Carregue o conteúdo no editor
      };

      reader.readAsText(blob); // Leia o Blob como texto
    } else {
      $toast.error("Erro ao carregar o documento do MinIO.");
    }
  } catch (error) {
    console.error("Erro ao carregar o documento:", error);
    $toast.error("Erro ao carregar o documento.");
  } finally {
    loading.value = false; // Finaliza o loading
  }
};
const onDocumentChange = async () => {
  const document = documentEditorContainer.value.ej2Instances.documentEditor;
  const blob = await document.saveAsBlob("Docx");

  const sfdt = await document.saveAsBlob("Sfdt");
  const reader = new FileReader();
  reader.onload = () => {
    const sfdtText = reader.result;
    const document = documentEditorContainer.value.ej2Instances.documentEditor;
    const pageCount = document.pageCount;
    emit("doc", sfdtText);
    emit("page", pageCount);
  };
  reader.readAsText(sfdt);
};

const salvarDocumento = async () => {
  loading.value = true; // Inicia o loading

  try {
    const document = documentEditorContainer.value.ej2Instances.documentEditor;
    const blob = await document.saveAsBlob("Docx");

    const formData = new FormData();
    formData.append("file", blob, `anexo.docx`);
    formData.append("cartorio_token", useCookie("user-data").value.cartorio_token);
    formData.append("token", props.ato_token);
    formData.append("tipo", "ato_minuta");

    const { data, status } = await useFetch(enviarDocumento, {
      method: "POST",
      body: formData,
    });

    if (status.value === "success") {
      $toast.success("Documento enviado!");
      const document = documentEditorContainer.value.ej2Instances.documentEditor;
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
    loading.value = false; // Finaliza o loading
  }
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

onMounted(async () => {
  await loadDefaultDocument(); 

  onDocumentChange();
});
</script>

<style>
@import "../../../node_modules/@syncfusion/ej2-base/styles/material.css";
@import "../../../node_modules/@syncfusion/ej2-buttons/styles/material.css";
@import "../../../node_modules/@syncfusion/ej2-inputs/styles/material.css";
@import "../../../node_modules/@syncfusion/ej2-popups/styles/material.css";
@import "../../../node_modules/@syncfusion/ej2-lists/styles/material.css";
@import "../../../node_modules/@syncfusion/ej2-navigations/styles/material.css";
@import "../../../node_modules/@syncfusion/ej2-splitbuttons/styles/material.css";
@import "../../../node_modules/@syncfusion/ej2-dropdowns/styles/material.css";
@import "../../../node_modules/@syncfusion/ej2-vue-documenteditor/styles/material.css";

/* Estilo da tela de loading */
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
}

.loading-spinner {
  margin-right: 20px;
}

.loading-text {
  color: white;
  font-size: 20px;
  font-weight: bold;
}
</style>
