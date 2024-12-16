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
    :enableWordExport='true'
  >
  </ejs-documenteditorcontainer>
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


provide("DocumentEditorContainer", [Toolbar,WordExport]);
const config = useRuntimeConfig();
const {$toast} = useNuxtApp();
const router = useRouter();
const route = useRoute();
const emit = defineEmits(["page","doc"]);
registerLicense(
 `${config.public.docEditor}`
);
const enviarDocumento = `${config.public.managemant}/upload`;

const serviceUrl =
  "https://ej2services.syncfusion.com/production/web-services/api/documenteditor/";
const documentEditorContainer = ref(null);

const onDocumentChange = async () => {
  const document = documentEditorContainer.value.ej2Instances.documentEditor;
  const sfdt = await document.saveAsBlob("Sfdt");
  const reader = new FileReader();
  reader.onload = () => {
    const sfdtText = reader.result;
    console.log(sfdtText)
    emit("doc",sfdtText)
  };
  reader.readAsText(sfdt);
};

const salvarDocumento = async() =>{
  const document = documentEditorContainer.value.ej2Instances.documentEditor
  const blob = await document.saveAsBlob("Docx");

  const formData = new FormData();
  formData.append("file", blob, `anexo.docx`);
  formData.append("cartorio_token", useCookie("user-data").value.cartorio_token);
  formData.append("token", route.query.ato_token_edit);
  formData.append("tipo", "ato_minuta");

  const { data,status } = await useFetch(enviarDocumento, {
      method: "POST",
      body: formData,
    });

    if (status.value === "success") {
      $toast.success("Documento enviado!");
      const document = documentEditorContainer.value.ej2Instances.documentEditor;
      const pageCount = document.pageCount; 
      onDocumentChange()
      emit("page",pageCount)
    } else {
      $toast.error("Erro ao enviar documento para o sistema.");
    }
}

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
