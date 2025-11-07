<template>
  <v-progress-circular
    style="margin-left: 200px"
    class="loading-spinner"
    indeterminate
    size="64"
    v-if="loading"
  ></v-progress-circular>

  <canvas v-if="!tiffError" ref="tiffCanvas" :style="canvasStyle"></canvas>
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
  rotationDegree: {
    type: Number,
    default: 0,
  },
  translateX: { type: Number, default: 0 },
});

const tiffCanvas = ref(null);
const tiffError = ref(false);
const loading = ref(false);
const emit = defineEmits(["error"]);

const canvasStyle = computed(() => ({
  width: props.isModal ? "100%" : `${250 * props.zoomLevel}px`,
  height: props.isModal ? "100%" : `${250 * props.zoomLevel}px`,
  transform: `scale(${props.zoomLevel}) rotate(${props.rotationDegree}deg)  translateX(${props.translateX}px)`,
  objectFit: "contain",
  transformOrigin: "left",
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

    if (tiffCanvas.value) {
      const canvas = tiffCanvas.value;
      const ctx = canvas.getContext("2d");

      // Definir tamanho do canvas baseado na imagem
      canvas.width = ifds[0].width;
      canvas.height = ifds[0].height;

      // Criar ImageData com a imagem RGBA
      const imageData = new ImageData(
        new Uint8ClampedArray(rgba),
        ifds[0].width,
        ifds[0].height
      );

      // Limpar o canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Aplicar rotação
      ctx.save(); // Salva o estado do contexto
      ctx.translate(canvas.width / 2, canvas.height / 2); // Move o contexto para o centro
      ctx.rotate((props.rotationDegree * Math.PI) / 180); // Rotaciona
      ctx.drawImage(canvas, -canvas.width / 2, -canvas.height / 2); // Desenha a imagem
      ctx.restore(); // Restaura o contexto

      // Colocar a imagem no canvas
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

// Re-renderiza o TIFF sempre que mudar URL ou rotação
watch(() => [props.tiffUrl, props.rotationDegree], renderTiff, {
  immediate: true,
});
</script>
