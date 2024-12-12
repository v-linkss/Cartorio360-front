<template>
  <div class="d-flex align-center justify-center">
    <div>
      <v-card>
        <div ref="livro" style="height: 600px; overflow-y: auto;">
          <ejs-documenteditorcontainer
            :restrictEditing="true"
            :enableToolbar="false"
            v-bind:created="onCreated"
            ref="documentEditorContainer"
            height="590px"
          >
          </ejs-documenteditorcontainer>
        </div>
      </v-card>
    </div>
    <img
      @click="isModalCondOpen = true"
      class="ml-15"
      style="height: 40px; width: 40px; cursor: pointer"
      src="../../assets/lavrar.png"
    />
    <v-btn color="red" size="large" @click="goBack">Voltar</v-btn>
    <ModalConfirmacao :show="isModalCondOpen" :condMessage="condMessage" @close="isModalCondOpen = false" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Cookies from 'js-cookie';
import { DocumentEditorContainerComponent as EjsDocumenteditorcontainer } from '@syncfusion/ej2-vue-documenteditor';
import { registerLicense } from "@syncfusion/ej2-base";

const props = defineProps({
  ato_token: {
    type: String,
    required: true,
  },
});

const serviceUrl = "https://ej2services.syncfusion.com/production/web-services/api/documenteditor/";
const config = useRuntimeConfig();
const { $toast } = useNuxtApp();
const router = useRouter();
const route = useRoute();
const condMessage = ref('Ao lavrar esse ato, a operação não poderá ser desfeita. Confirma?');
const isModalCondOpen = ref(false);
const documentEditorContainer = ref(null);

registerLicense(`${config.public.docEditor}`);

// Função para abrir o documento do cookie
const openDocumentFromCookie = () => {
  const documentString = useCookie('document-data').value; // Lê o cookie

  if (documentString) {
    // const decodedDocumentString = decodeURIComponent(documentString.value);
    // console.log("Decodificado")
    // console.log(decodedDocumentString)

    // Abre o documento no editor
    // documentEditorContainer.value.ej2Instances.documentEditor.open(documentString);
    // console.log(documentString)
    // documentString.value =''
    return documentString
  } else {
    $toast.error("Nenhum documento encontrado nos cookies.");
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

const onCreated = function () {
  // Chama a função para abrir o documento do cookie quando o editor é criado
  const doc = openDocumentFromCookie();
  const docString =JSON.stringify(doc)
  console.log(docString);
  //Open default document in Document Editor.
  documentEditorContainer.value.ej2Instances.documentEditor.open(docString); // Abre o documento no editor (doc.);
  // let obj = documentEditorContainer.value.ej2Instances.documentEditor;
  // obj.editor.paste(doc);
};
</script>

<style>
@import '../../node_modules/@syncfusion/ej2-base/styles/material.css';
@import '../../node_modules/@syncfusion/ej2-buttons/styles/material.css';
@import '../../node_modules/@syncfusion/ej2-inputs/styles/material.css';
@import '../../node_modules/@syncfusion/ej2-popups/styles/material.css';
@import '../../node_modules/@syncfusion/ej2-lists/styles/material.css';
@import '../../node_modules/@syncfusion/ej2-navigations/styles/material.css';
@import '../../node_modules/@syncfusion/ej2-splitbuttons/styles/material.css';
@import '../../node_modules/@syncfusion/ej2-dropdowns/styles/material.css';
@import "../../node_modules/@syncfusion/ej2-vue-documenteditor/styles/material.css";
</style>