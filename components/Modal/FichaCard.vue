<template>
  <v-dialog persistent v-model="isVisible" max-width="1100">
    <v-card>
      <v-card-title class="text-h5">Ficha de Firma</v-card-title>
      <div class="d-flex justify-center align-center">
        <ejs-imageeditor
          height="750px"
          width="750px"
          ref="imageEditorRef"
          :created="created"
        ></ejs-imageeditor>
      </div>

      <v-card-actions>
        <v-btn
          style="background-color: aqua; color: white"
          @click="editarImagem"
          >Editar</v-btn
        >
        <v-btn
          v-if="!props.isView"
          style="background-color: #429946; color: white"
          @click="confirmarRecebimento"
          >Reconhecer</v-btn
        >
        <v-btn style="background-color: red; color: white" @click="closeModal"
          >Voltar</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { Browser, registerLicense } from "@syncfusion/ej2-base";
import { ImageEditorComponent as EjsImageeditor } from "@syncfusion/ej2-vue-image-editor";
const props = defineProps({
  show: Boolean,
  item: Object,
  isView: {
    type: Boolean,
    default: false,
  },
  linkView: String,
  pessoaObj: Object,
});

const config = useRuntimeConfig();
registerLicense(`${config.public.docEditor}`);
const transformarTiffParaPng = `${config.public.managemant}/minio/tiff_para_png`;
const imageEditorRef = ref(null);

const isLoading = ref(true);
const isVisible = ref(props.show);
const fichaRender = ref(null);
const fotoRender = ref(null);

const zoomLevel = ref(0.8); // Nível de zoom (inicialmente 1x)
const rotationDegree = ref(0); // Grau de rotação (inicialmente 0)

const emit = defineEmits(["close", "confirmar"]);

watch(
  () => props.show,
  async (newVal) => {
    isVisible.value = newVal;
    fichaRender.value = null;
    // await beforeOpenFicha();
  },
  { immediate: true }
);

watch(
  () => props.linkView,
  (newLinkView) => {
    if (props.isView) {
      if (newLinkView && newLinkView.includes(".tr7")) {
        fichaRender.value = newLinkView;
        fotoRender.value = null;
      } else {
        fichaRender.value = null;
        fotoRender.value = newLinkView;
      }
    }
  },
  { immediate: true }
);

const confirmarRecebimento = () => {
  emit("confirmar");
  closeModal();
};

// const editarImagem = async () => {};

const created = async () => {
  isLoading.value = true; // Inicia o loading ao criar o editor
  try {
    const imageEditor = imageEditorRef.value?.ej2Instances;
    if (!imageEditor) return;

    const response = await fetch(props.linkView);
    const blob = await response.blob();

    const file = new File([blob], "image.tiff", {
      type: blob.type || "application/octet-stream",
    });

    const formData = new FormData();
    formData.append("tipo", "ficha");
    formData.append(
      "cartorio_token",
      useCookie("user-data").value.cartorio_token
    );
    formData.append("path", props.pessoaObj.link_ficha);
    formData.append("pessoa_token", props.pessoaObj.token);
    formData.append("file", file);

    const { data: imagemBiometria } = await useFetch(transformarTiffParaPng, {
      method: "POST",
      body: formData,
    });

    imageEditor.open(imagemBiometria.value.msg);
  } catch (error) {
    console.error("Erro ao criar o editor de imagem:", error);
  } finally {
    isLoading.value = false; // Finaliza o loading
  }
};

const closeModal = () => {
  isVisible.value = false;
  fichaRender.value = null;
  fotoRender.value = null;
  zoomLevel.value = 0.8;
  rotationDegree.value = 0;
  emit("close");
};
</script>

<style>
@import "../../node_modules/@syncfusion/ej2-base/styles/material.css";
@import "../../node_modules/@syncfusion/ej2-buttons/styles/material.css";
@import "../../node_modules/@syncfusion/ej2-splitbuttons/styles/material.css";
@import "../../node_modules/@syncfusion/ej2-lists/styles/material.css";
@import "../../node_modules/@syncfusion/ej2-popups/styles/material.css";
@import "../../node_modules/@syncfusion/ej2-inputs/styles/material.css";
@import "../../node_modules/@syncfusion/ej2-navigations/styles/material.css";
@import "../../node_modules/@syncfusion/ej2-dropdowns/styles/material.css";
@import "../../node_modules/@syncfusion/ej2-image-editor/styles/material.css";

#image-editor {
  width: 550px !important;
  height: 350px !important;
}
v.slider {
  width: 100%;
}
</style>
