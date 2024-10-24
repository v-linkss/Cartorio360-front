<template>
  <div>
    <img
      @click="runScanner"
      src="../../assets/escanearFicha.png"
      style="width: 280px; height: 120px; cursor: pointer; margin-top: 30px"
    />
  </div>
</template>

<script setup>
const config = useRuntimeConfig();
const acionarScanner = `${config.public.biometria}/run-scanner`;

const runScanner = async () => {
  const { status } = await useFetch(acionarScanner, {
    method: "GET",
  });
};
</script>

<style scoped></style>
