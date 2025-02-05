<template>
  <v-progress-circular
    style="margin-left: 200px"
    class="loading-spinner"
    indeterminate
    size="64"
    v-if="loading"
  ></v-progress-circular>

  <canvas
    v-if="!tiffError"
    ref="tiffCanvas"
    :style="canvasStyle"
  ></canvas>
</template>

<script setup>
import * as UTIF from "utif";
const props = defineProps({
  tiffUrl: String,
  isModal: {
    type: Boolean,
    default: false,
  },
  zoomLevel: {
    type: Number,
    default: 1,
  },
});
const tiffCanvas = ref(null);
const tiffError = ref(false);
const loading = ref(false);
const emit = defineEmits(["error"]);

const canvasStyle = computed(() => ({
  width: props.isModal ? "100%" : `${250 * props.zoomLevel}px`,
  height: props.isModal ? "100%" : `${250 * props.zoomLevel}px`,
  transform: `scale(${props.zoomLevel})`,
}));

const renderTiff = async () => {
  if (!props.tiffUrl) return;
  loading.value = true;
  try {
    const response = await fetch(props.tiffUrl);
    const buffer = await response.arrayBuffer();

    // Decodificar TIFF e extrair IFDs
    const ifds = UTIF.decode(buffer);
    UTIF.decodeImage(buffer, ifds[0]);

    // Converter para RGBA
    const rgba = UTIF.toRGBA8(ifds[0]);

    // Renderizar no canvas
    if (tiffCanvas.value) {
      const canvas = tiffCanvas.value;
      const ctx = canvas.getContext("2d");

      // Definir tamanho do canvas com base na imagem
      canvas.width = ifds[0].width * props.zoomLevel;
      canvas.height = ifds[0].height * props.zoomLevel;

      // Criar ImageData com a imagem RGBA
      const imageData = new ImageData(
        new Uint8ClampedArray(rgba),
        ifds[0].width,
        ifds[0].height
      );

      // Limpar o canvas e desenhar a imagem
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.putImageData(imageData, 0, 0);
    }

    loading.value = false;
  } catch (error) {
    loading.value = false;
    tiffError.value = true;
    emit("error");
    console.error("Erro ao carregar TIFF:", error);
  }
};
watch(() => props.tiffUrl, renderTiff, { immediate: true });
</script> 