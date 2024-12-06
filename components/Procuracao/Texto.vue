
<template>
  <ejs-documenteditorcontainer  style="height: 1000px;" :serviceUrl='serviceUrl' :enableToolbar='true'> </ejs-documenteditorcontainer>

</template>

<script setup>
  import { provide, ref } from 'vue';
  import { DocumentEditorContainerComponent as EjsDocumenteditorcontainer, Toolbar } from '@syncfusion/ej2-vue-documenteditor';
  import { registerLicense } from "@syncfusion/ej2-base";
registerLicense(
  "Ngo9BigBOggjHTQxAR8/V1NDaF1cX2hIfEx3R3xbf1x0ZFREallXTnRWUj0eQnxTdEFiW39bcXZQQGJVUUJ3Ww=="
);

  const serviceUrl = 'https://ej2services.syncfusion.com/production/web-services/api/documenteditor/';
  const documentEditorContainer = ref(null);

  provide('DocumentEditorContainer', [Toolbar]);
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
