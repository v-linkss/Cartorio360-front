<template>
  <v-col cols="auto">
    <div style="display: flex; flex-direction: column">
      <img
        @click="printContent()"
        src="../../assets/imprimirFicha.png"
        style="width: 280px; height: 120px; cursor: pointer"
      />
      <BiometriaScanner/>
    </div>
  </v-col>
</template>

<script setup>
const printHtml = ref("");

const config = useRuntimeConfig();
const impressao = `${config.public.auth}service/gerencia/gerarRelatorio`;
//  console.log(useCookie('pessoa_token').value);
const consultaFicha = async () => {
  const response = await fetchWithToken(impressao, {
    method: "POST",
    body :{
      consulta:"FICHA ASSINATURA",
      pessoa_token: useCookie('pessoa_token').value
    }
  });
  
  printHtml.value = response.data.value;
};
const printContent = async() => {
  await consultaFicha()
  const iframe = document.createElement("iframe");

  iframe.style.position = "absolute";
  iframe.style.width = "0px";
  iframe.style.height = "0px";
  iframe.style.border = "none";
  document.body.appendChild(iframe);

  // Pega o documento do iframe e insere o HTML retornado
  const doc = iframe.contentWindow.document;
  doc.open();
  doc.write(printHtml.value);
  doc.close();

  // Foca e imprime o conteúdo
  iframe.contentWindow.focus();
  iframe.contentWindow.print();

  // Remove o iframe após a impressão
  document.body.removeChild(iframe);

};
</script>

<style scoped>
</style>
