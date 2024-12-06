<template>
  <v-row class="ml-4 mt-4 mb-4">
    <v-btn size="large" color="green">Salvar</v-btn>
    <NuxtLink class="ml-4">
      <v-btn size="large"  @click="goBack" color="red">Voltar</v-btn>
    </NuxtLink>
  </v-row>
  <ejs-documenteditorcontainer
    height="700px"
    :serviceUrl="serviceUrl"
    :enableToolbar="true"
  >
  </ejs-documenteditorcontainer>
</template>

<script setup>
import { provide } from "vue";
import {
  DocumentEditorContainerComponent as EjsDocumenteditorcontainer,
  Toolbar,
} from "@syncfusion/ej2-vue-documenteditor";
import { registerLicense } from "@syncfusion/ej2-base";
registerLicense(
  "Ngo9BigBOggjHTQxAR8/V1NDaF1cX2hIfEx3R3xbf1x0ZFREallXTnRWUj0eQnxTdEFiW39bcXZQQGJVUUJ3Ww=="
);
provide("DocumentEditorContainer", [Toolbar]);
const router = useRouter();
const route = useRoute();

const serviceUrl =
  "https://ej2services.syncfusion.com/production/web-services/api/documenteditor/";
const documentEditorContainer = ref(null);

const goBack = () => {
  console.log("test")
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
