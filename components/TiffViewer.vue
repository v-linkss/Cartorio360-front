<template>
  <div>
    <v-progress-circular
      style="margin-left: 300px;"
      class="loading-spinner"
      indeterminate
      size="64"
      v-if="loading"
    ></v-progress-circular>

    <canvas v-if="!tiffError" ref="tiffCanvas"></canvas>
  </div>
</template>

<script setup>
let Tiff = null;

const props = defineProps(["tiffUrl"]);
const tiffCanvas = ref(null);
const tiffError = ref(false);
const loading = ref(false);
const emit = defineEmits(["error"]);

const renderTiff = async () => {
  if (!props.tiffUrl) return;
  loading.value = true;
  try {
    const response = await fetch(props.tiffUrl);
    const buffer = await response.arrayBuffer();
    const tiff = new Tiff({ buffer });
    const canvas = tiff.toCanvas();

    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.objectFit = "cover";

    if (tiffCanvas.value) {
      tiffCanvas.value.replaceWith(canvas);
    }
    loading.value = false;
  } catch (error) {
    loading.value = false;
    tiffError.value = true;
    emit("error");
    console.error("Erro ao carregar TIFF do MinIO:", error);
  }
};

onMounted(async () => {
  try {
    Tiff = (await import("tiff.js")).default; // Importa apenas no cliente
  } catch (error) {
    console.error("Erro ao carregar tiff.js:", error);
    tiffError.value = true;
  }
});

watch(() => props.tiffUrl, renderTiff, { immediate: true });
</script>
