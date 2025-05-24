<template>
  <v-dialog persistent v-model="isVisible" max-width="1100">
    <v-card>
      <v-card-title class="text-h5">Ficha de Firma</v-card-title>

      <div class="d-flex justify-center align-center">
        <ejs-imageeditor
          height="750px"
          width="850px"
          ref="imageEditorRef"
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
import { registerLicense } from "@syncfusion/ej2-base";
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
const { $toast } = useNuxtApp();
registerLicense(`${config.public.docEditor}`);
const transformarTiffParaPng = `${config.public.managemant}/minio/tiff_para_png`;
const atualizarFicha = `${config.public.managemant}/minio/update_image`;
const imageEditorRef = ref(null);

const isVisible = ref(props.show);
const fichaRender = ref(props.linkView || null);

const emit = defineEmits(["close", "confirmar"]);

const confirmarRecebimento = () => {
  emit("confirmar");
  closeModal();
};

const editarImagem = async () => {
  try {
    const imageEditor = imageEditorRef.value?.ej2Instances;
    if (!imageEditor) return;

    const imageData = imageEditor.getImageData();

    const canvas = document.createElement("canvas");
    canvas.width = imageData.width;
    canvas.height = imageData.height;
    const ctx = canvas.getContext("2d");
    ctx.putImageData(imageData, 0, 0);

    const blob = await new Promise((resolve) => {
      canvas.toBlob((blob) => {
        resolve(blob);
      }, "image/png");
    });

    const formData = new FormData();
    formData.append(
      "cartorio_token",
      useCookie("user-data").value.cartorio_token
    );
    formData.append("path", props.pessoaObj.link_ficha);
    formData.append("file", blob, "ficha_editada.png");

    const { status } = await useFetch(atualizarFicha, {
      method: "PUT",
      body: formData,
    });

    if (status.value === "success") {
      $toast.success("Ficha Atualizada com Sucesso!");
    }
  } catch (error) {
    console.error("Erro ao editar imagem:", error);
    $toast.error("Erro ao atualizar a ficha");
  }
};

const loadImageIntoEditor = async () => {
  if (!fichaRender.value || !imageEditorRef.value?.ej2Instances) return;

  try {
    const imageEditor = imageEditorRef.value.ej2Instances;

    const response = await fetch(fichaRender.value);
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

    await imageEditor.open(imagemBiometria.value.msg);
  } catch (error) {
    console.error("Erro ao carregar imagem no editor:", error);
  }
};

watch(
  () => props.linkView,
  async (newLinkView) => {
    if (newLinkView) {
      fichaRender.value = newLinkView;
      await loadImageIntoEditor();
    }
  },
  { immediate: true }
);

const closeModal = () => {
  isVisible.value = false;
  fichaRender.value = null;
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
