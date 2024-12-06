<template>
  <div>
    <div class="control-section">
      <div class="sample-container">
        <div class="default-section">
          <ejs-richtexteditor
            :value="value"
            :enableXhtml="enableXhtml"
            :importWord="importWord"
            :insertImageSettings="insertImageSettings"
            :toolbarSettings="toolbarSettings"
          >
          </ejs-richtexteditor>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  RichTextEditorComponent,
  Toolbar,
  Link,
  Image,
  HtmlEditor,
  QuickToolbar,
  Table,
  PasteCleanup,
  ImportExport,
} from "@syncfusion/ej2-vue-richtexteditor";
let hostUrl = "https://services.syncfusion.com/vue/production/";
import { registerLicense } from "@syncfusion/ej2-base";
registerLicense(
  "Ngo9BigBOggjHTQxAR8/V1NDaF1cX2hIfEx3R3xbf1x0ZFREallXTnRWUj0eQnxTdEFiW39bcXZQQGJVUUJ3Ww=="
);
export default {
  components: {
    "ejs-richtexteditor": RichTextEditorComponent,
  },
  data: function () {
    return {
      value: ``,
      enableXhtml: true,
      insertImageSettings: {
        saveUrl: hostUrl + "api/RichTextEditor/SaveFile",
        removeUrl: hostUrl + "api/RichTextEditor/DeleteFile",
        path: hostUrl + "RichTextEditor/",
      },
      importWord: {
        serviceUrl: hostUrl + "api/RichTextEditor/ImportFromWord",
      },
      toolbarSettings: {
        items: [
          "Undo",
          "Redo",
          "|",
          "ImportWord",
          "|",
          "Bold",
          "Italic",
          "Underline",
          "StrikeThrough",
          "|",
          "FontName",
          "FontSize",
          "FontColor",
          "BackgroundColor",
          "|",
          "Formats",
          "Alignments",
          "Blockquote",
          "|",
          "NumberFormatList",
          "BulletFormatList",
          "|",
          "CreateLink",
          "Image",
          "CreateTable",
          "|",
          "ClearFormat",
          "SourceCode",
        ],
      },
    };
  },

  provide: {
    richtexteditor: [
      Toolbar,
      Image,
      Link,
      HtmlEditor,
      QuickToolbar,
      Table,
      PasteCleanup,
      ImportExport,
    ],
  },
};
</script>

<style>
@import "../../node_modules/@syncfusion/ej2-base/styles/material.css";
@import "../../node_modules/@syncfusion/ej2-inputs/styles/material.css";
@import "../../node_modules/@syncfusion/ej2-lists/styles/material.css";
@import "../../node_modules/@syncfusion/ej2-popups/styles/material.css";
@import "../../node_modules/@syncfusion/ej2-buttons/styles/material.css";
@import "../../node_modules/@syncfusion/ej2-navigations/styles/material.css";
@import "../../node_modules/@syncfusion/ej2-splitbuttons/styles/material.css";
@import "../../node_modules/@syncfusion/ej2-vue-richtexteditor/styles/material.css";
</style>
