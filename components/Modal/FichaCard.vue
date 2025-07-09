<template>
  <v-dialog persistent v-model="isVisible" max-width="1200">
    <v-card>
      <v-card-title class="text-h5 d-flex justify-space-between align-center">
        <span>Ficha de Firma</span>
        <div v-if="images[0].length > 1" class="d-flex align-center">
          <v-btn
            icon
            small
            @click="previousImage"
            :disabled="currentIndex === 0"
          >
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
          <span class="mx-2">{{ currentIndex + 1 }} / {{ images[0].length }}</span>
          <v-btn
            icon
            small
            @click="nextImage"
            :disabled="currentIndex === images[0].length - 1"
          >
            <v-icon>mdi-chevron-right</v-icon>
          </v-btn>
        </div>
      </v-card-title>

      <!-- Thumbnails do carrossel -->
      <div v-if="images[0].length > 1" class="d-flex justify-center pa-2">
        <v-chip-group v-model="currentIndex" mandatory>
          <v-chip
            v-for="(image, index) in images[0]"
            :key="index"
            :value="index"
            small
            @click="selectImage(index)"
            :class="{ 'v-chip--active': index === currentIndex }"
          >
            {{ index + 1 }}
          </v-chip>
        </v-chip-group>
      </div>

      <div class="d-flex justify-center align-center">
        <ejs-imageeditor
          height="750px"
          width="850px"
          ref="imageEditorRef"
          :toolbar="toolbar"
          :toolbarUpdating="onToolbarUpdating"
        ></ejs-imageeditor>
      </div>

      <v-card-actions>
        <v-btn
          style="background-color: #429946; color: white"
          @click="editarImagem"
          :disabled="isCropActive"
          >Salvar</v-btn
        >
        <v-btn
          v-if="!props.isView"
          style="background-color: #085a98; color: white"
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
  images: {
    type: Array,
    default: () => []
  },
  pessoaObj: Object,
});

const toolbar = ["RotateLeft", "RotateRight", "Crop", "ZoomIn", "ZoomOut"];
const config = useRuntimeConfig();
const { $toast } = useNuxtApp();
registerLicense(`${config.public.docEditor}`);

const transformarTiffParaPng = `${config.public.managemant}/minio/tiff_para_png`;
const atualizarFicha = `${config.public.managemant}/minio/update_image`;
const imageEditorRef = ref(null);

const isVisible = ref(props.show);
const currentIndex = ref(0);
const fichaRender = ref(props.linkView || null);
const isCropActive = ref(false);
const processedImages = ref([]);

const emit = defineEmits(["close", "confirmar"]);

// Computed para obter as imagens (array de URLs ou single URL)
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

const onToolbarUpdating = (args) => {
  if (args.toolbarType === "crop-transform") {
    isCropActive.value = true;
    return;
  }
  isCropActive.value = false;
};

const confirmarRecebimento = () => {
  emit("confirmar");
  closeModal();
};

// Navegação do carrossel
const nextImage = () => {
  if (currentIndex.value < images.value[0].length - 1) {
    currentIndex.value++;
    loadCurrentImage();
  }
};

const previousImage = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--;
    loadCurrentImage();
  }
};

const selectImage = (index) => {
  currentIndex.value = index;
  loadCurrentImage();
};

const editarImagem = async () => {
  try {
    // console.log('Imaghe',currentIndex.value,images.value[0][currentIndex.value].path,'\n',currentIndex.value,images.value[0][currentIndex.value].url)
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
    
    // Se estiver trabalhando com múltiplas imagens, incluir o índice
    // const currentImagePath = Array.isArray(props.pessoaObj.link_ficha) 
    //   ? props.pessoaObj.link_ficha[currentIndex.value]
    //   : props.pessoaObj.link_ficha;
    
    formData.append("path", images.value[0][currentIndex.value].path);
    formData.append("file", blob, `ficha_editada_${currentIndex.value}.png`);

    const { status } = await useFetch(atualizarFicha, {
      method: "PUT",
      body: formData,
    });

    if (status.value === "success") {
      $toast.success(`Ficha ${currentIndex.value + 1} atualizada com sucesso!`);
    }
  } catch (error) {
    console.error("Erro ao editar imagem:", error);
    $toast.error("Erro ao atualizar a ficha");
  }
};

const loadNextImageIntoEditor = async (imageUrl) => {
  if (!imageUrl || !imageEditorRef.value?.ej2Instances) return;

  try {
    const imageEditor = imageEditorRef.value.ej2Instances;   
    await imageEditor.open(imageUrl);
  } catch (error) {
    console.error("Erro ao carregar imagem no editor:", error);
  }
};

const loadImageIntoEditor = async (imageUrl) => {
  if (!imageUrl || !imageEditorRef.value?.ej2Instances) return;

  try {
    const imageEditor = imageEditorRef.value.ej2Instances;

    const response = await fetch(imageUrl.url);

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
    
    // Corrigindo o acesso ao path
    // const currentImagePath = Array.isArray(props.pessoaObj.link_ficha) 
    //   ? props.pessoaObj.link_ficha[currentIndex.value]
    //   : props.pessoaObj.link_ficha;
    
    formData.append("path", imageUrl.path);
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

const loadCurrentImage = async () => {
  if (images.value[0].length > 0 && currentIndex.value < images.value[0].length) {
    await loadImageIntoEditor(images.value[0][currentIndex.value]);
  }
};

// Watchers
watch(
  () => props.linkView,
  async (newLinkView) => {
    if (newLinkView) {
      fichaRender.value = newLinkView;
      currentIndex.value = 0;
      await loadCurrentImage();
    }
  },
  { immediate: true }
);

watch(
  () => props.images,
  async (newImages) => {
    if (newImages && newImages.length > 0) {
      currentIndex.value = 0;
      await loadCurrentImage();
    }
  },
  { immediate: true, deep: true }
);

// Watch para mudanças no currentIndex - ESTE É O PONTO CHAVE
watch(
  () => currentIndex.value,
  async (newIndex, oldIndex) => {
    // Só carrega se realmente mudou e não é a primeira vez
    if (newIndex !== oldIndex && oldIndex !== undefined) {
      await loadCurrentImage();
    }
  }
);

// Inicialização
onMounted(async () => {
  console.log('Componente montado');
  await nextTick();
  await loadCurrentImage();
});

const closeModal = () => {
  isVisible.value = false;
  fichaRender.value = null;
  currentIndex.value = 0;
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

.v-slider {
  width: 100%;
}

.v-chip--active {
  background-color: #1976d2 !important;
  color: white !important;
}

.v-chip-group {
  max-width: 100%;
  overflow-x: auto;
}
</style>