<template>
  <v-dialog persistent v-model="isVisible" max-width="1200" >
    <v-card>
      <!-- ­­­­­­­­­­­­­­­­­­­­­­­­­­­­­­­­­­­­­­­­­­­­­­­­­­­­­­­­­­­­­­­­­ Cabeçalho -->
      <v-card-title class="text-h5 d-flex justify-space-between align-center">
        <span>Ficha de Firma</span>
        <span v-if="images[0].length > 1 && !isEditing" class="mx-2">
          {{ currentIndex + 1 }} / {{ images[0].length }}
        </span>
      </v-card-title>

      <!-- ­­­­­­­­­­­­­­­­­­­­­­­­­­­­­­­­­­­­­­­­­­­­­­­­­­­­­­­­­­­­­­­­­ Visualização (miniaturas) -->
      <v-carousel
        v-if="!isEditing && images[0].length > 1"
        v-model="currentIndex"
        show-arrows="hover"
        hide-delimiter-background
        height="750"
        width="1000"
        class="rounded-lg overflow-hidden"
      >
        <v-carousel-item
          v-for="(image, index) in images[0]"
          :key="index"
          :value="index"
        >
          <v-img :src="image.url" cover />
        </v-carousel-item>
      </v-carousel>

      <!-- ­­­­­­­­­­­­­­­­­­­­­­­­­­­­­­­­­­­­­­­­­­­­­­­­­­­­­­­­­­­­­­­­­ Edição -->
      <div
        v-if="isEditing"
        class="d-flex justify-center align-center mt-4"
      >
        <ejs-imageeditor
          height="750px"
          width="850px"
          ref="imageEditorRef"
          :toolbar="toolbar"
          :toolbarUpdating="onToolbarUpdating"
        />
      </div>

      <v-card-actions>

        <!-- Botão Salvar só no modo edição -->
        <v-btn
          style="background-color: #429946; color: white"
          @click="toggleEditing"
          :disabled="isCropActive"
        >{{ isEditing ? 'Voltar ao carrossel' : 'Editar imagem' }}</v-btn>
        <v-btn
          style="background-color: #429946; color: white"
          @click="editarImagem"
          :disabled="isCropActive"
        >Salvar</v-btn>
        <v-btn
          v-if="!props.isView"
          style="background-color: #085a98; color: white"
          @click="confirmarRecebimento"
        >Reconhecer</v-btn>
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

/***** Props *****/
const props = defineProps({
  show: Boolean,
  item: Object,
  isView: {
    type: Boolean,
    default: false,
  },
  linkView: String,
  images: {
    type: Array,
    default: () => [],
  },
  pessoaObj: Object,
});

/***** Global utils *****/
const toolbar = ["RotateLeft", "RotateRight", "Crop", "ZoomIn", "ZoomOut"];
const config = useRuntimeConfig();
const { $toast } = useNuxtApp();
registerLicense(`${config.public.docEditor}`);

/***** Endpoints *****/
const transformarTiffParaPng = `${config.public.managemant}/minio/tiff_para_png`;
const atualizarFicha = `${config.public.managemant}/minio/update_image`;

/***** State *****/
const imageEditorRef = ref(null);
const isVisible = ref(props.show);
const currentIndex = ref(0);
const isCropActive = ref(false);
const isEditing = ref(false);
const emit = defineEmits(["close", "confirmar"]);

/***** Imagens *****/
const images = computed(() => {
  if (props.images && props.images.length > 0) {
    // Se images é um array aninhado [[]], pega o primeiro array interno
    if (Array.isArray(props.images[0])) {
      return props.images;
    }
    // Se images é um array simples []
    return props.images;
  }
  return props.linkView ? [props.linkView] : [];
});

/***** Toolbar update *****/
const onToolbarUpdating = (args) => {
  isCropActive.value = args.toolbarType === "crop-transform";
};

/***** Ações *****/
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

    const blob = await new Promise((resolve) => canvas.toBlob(resolve, "image/png"));

    const formData = new FormData();
    formData.append("cartorio_token", useCookie("user-data").value.cartorio_token);
    formData.append("path", images.value[0][currentIndex.value].path);
    formData.append("file", blob, `ficha_editada_${currentIndex.value}.png`);

    const { status } = await useFetch(atualizarFicha, { method: "PUT", body: formData });
    if (status.value === "success") $toast.success(`Ficha ${currentIndex.value + 1} atualizada com sucesso!`);
  } catch (error) {
    console.error(error);
    $toast.error("Erro ao atualizar a ficha");
  }
};

/***** Carregamento de imagens *****/
const loadImageIntoEditor = async (imageObj) => {
  if (!imageObj || !imageEditorRef.value?.ej2Instances) return;
  try {
    const imageEditor = imageEditorRef.value.ej2Instances;
    const response = await fetch(imageObj.url);
    const blob = await response.blob();
    const file = new File([blob], "image.tiff", { type: blob.type || "application/octet-stream" });

    const formData = new FormData();
    formData.append("tipo", "ficha");
    formData.append("cartorio_token", useCookie("user-data").value.cartorio_token);
    formData.append("path", imageObj.path);
    formData.append("pessoa_token", props.pessoaObj.token);
    formData.append("file", file);

    const { data } = await useFetch(transformarTiffParaPng, { method: "POST", body: formData });
    await imageEditor.open(data.value.msg);
  } catch (error) {
    console.error("Erro ao carregar imagem:", error);
  }
};

const loadCurrentImage = async () => {
  if (!isEditing) return;
  if (images.value[0].length && images.value[0][currentIndex.value]) {
    await loadImageIntoEditor(images.value[0][currentIndex.value]);
  }
};

/***** Watchers *****/
watch(
  () => props.linkView,
  loadCurrentImage,
  { immediate: true }
);
watch(
  () => props.images,
  loadCurrentImage,
  { immediate: true, deep: true }
);
watch(currentIndex, async () => await loadCurrentImage());

/***** Ciclo de vida *****/
onMounted(async () => {
  await nextTick();
  await loadCurrentImage();
});

/***** Encerrar *****/
const closeModal = () => {
  isVisible.value = false;
  emit("close");
};

/***** Alternador *****/
const toggleEditing = async () => {
  isEditing.value = !isEditing.value;
  if (isEditing.value) {
    // ao entrar no modo edição carregamos/atualizamos a imagem corrente
    await nextTick();
    await loadCurrentImage();
  }
};

// Ajuste: só carregue imagem no editor quando ele estiver visível
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

.overlay-chips {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  z-index: 2;
}

.v-chip--active {
  background-color: #1976d2 !important;
  color: white !important;
}
</style>
