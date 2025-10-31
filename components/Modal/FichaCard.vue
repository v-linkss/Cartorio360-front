<template>
  <v-dialog persistent v-model="isVisible" max-width="1200">
    <v-card>
      <!-- Cabeçalho -->
      <v-card-title class="text-h5 d-flex justify-space-between align-center">
        <span>Ficha de Firma</span>
        <span v-if="images.length > 1 && !isEditing" class="mx-2">
          {{ currentIndex + 1 }} / {{ images.length }}
        </span>
      </v-card-title>

      <!-- Quando há várias imagens -->
      <v-carousel v-if="!isEditing && images.length > 1" v-model="currentIndex" show-arrows="hover"
        hide-delimiter-background height="750" width="1000" class="rounded-lg overflow-hidden">
        <v-carousel-item v-for="(image, index) in images" :key="index" :value="index">
          <v-img :src="image.url" cover />
        </v-carousel-item>
      </v-carousel>

      <!-- Quando há apenas uma imagem -->
      <v-img v-else-if="!isEditing && images.length === 1" :src="images[0].url" height="750" width="1000"
        class="rounded-lg overflow-hidden" cover />

      <!-- Quando não há nenhuma imagem -->
      <div v-else-if="!isEditing && images.length === 0"
        class="d-flex flex-column align-center justify-center mx-auto text-center" style="
    height: 750px;
    width: 1000px;
    border: 2px dashed #ccc;
    border-radius: 12px;
  ">
        <v-icon size="64" color="grey">mdi-file-alert-outline</v-icon>
        <p class="mt-4 text-subtitle-1">
          Nenhuma ficha cadastrada para esta pessoa.
        </p>
      </div>



      <!-- Edição -->
      <div v-if="isEditing" class="d-flex justify-center align-center mt-4">
        <ejs-imageeditor height="750px" width="850px" ref="imageEditorRef" :toolbar="toolbar"
          :toolbarUpdating="onToolbarUpdating" />
      </div>

      <v-card-actions>
        <!-- Botão Salvar só no modo edição -->
        <v-btn style="background-color: #429946; color: white" @click="toggleEditing"
          :disabled="isCropActive || images.length === 0">
          {{ isEditing ? 'Voltar ao carrossel' : 'Editar imagem' }}
        </v-btn>

        <v-btn style="background-color: #429946; color: white" @click="editarImagem"
          :disabled="isCropActive || !isEditing || images.length === 0">
          Salvar
        </v-btn>

        <v-btn v-if="!props.isView" style="background-color: #085a98; color: white" @click="confirmarRecebimento">
          Reconhecer
        </v-btn>

        <v-btn style="background-color: red; color: white" @click="closeModal">
          Voltar
        </v-btn>
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
  if (props.linkView && props.linkView.length > 0) {
    // Se linkView é um array aninhado [[]], pega o primeiro array interno
    if (Array.isArray(props.linkView[0])) {
      console.log('é um array aninhado\n', props.linkView)
      return props.linkView;
    }
    // Se linkView é um array simples []
    console.log('é um array simples\n', props.linkView)
    return props.linkView;
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
    if (!imageEditor) {
      $toast.warning("Editor de imagem não está disponível");
      return;
    }

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
  // Verificar se o editor está disponível antes de continuar
  if (!imageEditorRef.value?.ej2Instances) {
    console.warn("Editor de imagem não está disponível ainda");
    return;
  }

  if (!imageObj) {
    console.warn("Objeto de imagem não fornecido");
    return;
  }

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

    if (data.value?.msg) {
      await imageEditor.open(data.value.msg);
    }
  } catch (error) {
    console.error("Erro ao carregar imagem:", error);
    $toast.error("Erro ao carregar imagem no editor");
  }
};

const loadCurrentImage = async () => {
  // Só carregar se estiver no modo de edição
  if (!isEditing.value) return;

  // Aguardar o próximo tick para garantir que o editor foi renderizado
  await nextTick();

  if (images.value?.length && images.value[currentIndex.value]) {
    await loadImageIntoEditor(images.value[currentIndex.value]);
  }
};

/***** Watchers *****/
// Remover watchers que chamavam loadCurrentImage automaticamente
// pois agora só carregamos quando isEditing é true

watch(currentIndex, async () => {
  if (isEditing.value) {
    await loadCurrentImage();
  }
});

/***** Ciclo de vida *****/
// Remover o onMounted que carregava a imagem automaticamente

/***** Encerrar *****/
const closeModal = () => {
  isVisible.value = false;
  isEditing.value = false; // Resetar o estado de edição ao fechar
  emit("close");
};

/***** Alternador *****/
const toggleEditing = async () => {
  console.log("Antes\n", isEditing.value);
  isEditing.value = !isEditing.value;
  console.log("Depois\n", isEditing.value);

  if (isEditing.value) {
    // Aguardar o componente ser renderizado
    await nextTick();
    // Pequeno delay adicional para garantir que o Syncfusion foi inicializado
    await new Promise(resolve => setTimeout(resolve, 100));
    // Agora sim carregar a imagem
    await loadCurrentImage();
  }
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
