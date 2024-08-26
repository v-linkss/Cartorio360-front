<template>
  <v-col cols="auto">
    <div style="display: flex; flex-direction: column">
      <img
        @click="openPrintModal"
        src="../../assets/imprimirFicha.png"
        style="width: 280px; height: 120px; cursor: pointer"
      />
      <img
        @click="printPage2"
        src="../../assets/escanearFicha.png"
        style="width: 280px; height: 120px; cursor: pointer; margin-top: 30px"
      />
    </div>
    <v-dialog v-model="isPrintModalOpen" max-width="800">
      <v-card>
        <v-card-title>
          <span>Dados para Impressão</span>
        </v-card-title>
        <v-card-text>
          <div id="ficha-pessoa" ref="printContent">
            <div v-html="printHtml"></div>
            <!-- Renderiza o HTML retornado -->
          </div>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green" @click="printContent">Imprimir</v-btn>
          <v-btn color="red" @click="isPrintModalOpen = false"
            >Fechar</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-col>
</template>

<script setup>
const isPrintModalOpen = ref(false);
const printHtml = ref("");

const config = useRuntimeConfig();
const impressao = `${config.public.managemant}/gerarRelatorio`;

const openPrintModal = async () => {
  const response = await useFetch(impressao, {
    method: "GET",
  });
  printHtml.value = response.data.value;
  isPrintModalOpen.value = true;
};

const printContent = () => {
  const printContents = document.getElementById("ficha-pessoa").innerHTML;
  const iframe = document.createElement("iframe");

  document.body.appendChild(iframe);

  const doc = iframe.contentWindow.document;
  doc.open();
  doc.write(printContents);
  doc.close();

  iframe.contentWindow.focus();
  iframe.contentWindow.print();
};
</script>

<style scoped>
</style>
