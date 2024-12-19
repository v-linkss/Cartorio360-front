<template>
  <v-row class="ml-4 mt-4 mb-4">
    <v-btn size="large" color="green" @click="salvarDocumento">Salvar</v-btn>
    <NuxtLink class="ml-4">
      <v-btn size="large" @click="goBack" color="red">Voltar</v-btn>
    </NuxtLink>
  </v-row>
  <ejs-documenteditorcontainer
    height="700px"
    ref="documentEditorContainer"
    :serviceUrl="serviceUrl"
    :enableToolbar="true"
    :enableWordExport="true"
  >
  </ejs-documenteditorcontainer>
</template>

<script setup>
import { provide, ref, onMounted } from "vue";
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
const minioFileUrl = `${config.public.minioBaseUrl}/path/to/your-file.docx`; // URL do arquivo no MinIO

const serviceUrl =
  "https://ej2services.syncfusion.com/production/web-services/api/documenteditor/";
const documentEditorContainer = ref(null);
const baixarDocumento = `${config.public.managemant}/download`;

// Função para buscar o arquivo do MinIO como Blob
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
  const { data, status } = await useFetch(baixarDocumento, {
    method: "POST",
    body: { bucket: "qvgjz", path: "ato/fKumj/ato_minuta-2024-12-13T14:57:36.974Z" },
  });
  console.log(data.value)
  // const blob = await fetchBlobFromMinIO(minioFileUrl);

  // if (blob) {
  //   const reader = new FileReader();
  //   reader.onload = () => {
  //     const sfdtContent = reader.result;
  //     const documentEditor = documentEditorContainer.value.ej2Instances.documentEditor;
  //     documentEditor.open(sfdtContent);
  //   };
  //   reader.readAsText(blob);
  // }
};

// Função para salvar o documento
const salvarDocumento = async () => {
  const document = documentEditorContainer.value.ej2Instances.documentEditor;
  const blob = await document.saveAsBlob("Docx");

  const formData = new FormData();
  formData.append("file", blob, `anexo.docx`);
  formData.append("cartorio_token", useCookie("user-data").value.cartorio_token);
  formData.append("token", route.query.ato_token_edit);
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
};

// Detectar alterações no documento
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

// Voltar para a tela anterior
const goBack = () => {
  const origem = route.query.origem || "criar";
  const id = route.query.id;
  if (origem === "atualizar") {
    router.push(`/os/atualizar/${id}`);
  } else {
    router.push("/ os/criar-registro");
  }
};

// Carregar o documento inicial ao montar o componente
onMounted(async () => {
  console.log("Componente montado e pronto para uso.");
  await loadDefaultDocument(); // Chama a função para carregar o documento inicial
});
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