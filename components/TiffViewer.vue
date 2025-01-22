<template>
  <canvas ref="tiffCanvas"></canvas>
</template>

<script setup>
import Tiff from "tiff.js";

const props = defineProps(["tiffUrl"]); 
const tiffCanvas = ref(null);

const renderTiff = async () => {
  if (!props.tiffUrl) return;

  try {
    const response = await fetch(props.tiffUrl);
    const buffer = await response.arrayBuffer();
    const tiff = new Tiff({ buffer });
    const canvas = tiff.toCanvas();

    if (tiffCanvas.value) {
      tiffCanvas.value.replaceWith(canvas);
    }
  } catch (error) {
    console.error("Erro ao carregar TIFF do MinIO:", error);
  }
};

watch(() => props.tiffUrl, renderTiff, { immediate: true });
</script>
