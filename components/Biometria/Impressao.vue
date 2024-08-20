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
          <iframe :src="printUrl" width="100%" height="400px"></iframe>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="printContent">Imprimir</v-btn>
          <v-btn color="secondary" @click="isPrintModalOpen = false">Fechar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-col>
</template>

<script setup>
const isPrintModalOpen = ref(false);
const printUrl = ref("");

const openPrintModal = () => {
  printUrl.value = "https://www.durabil.com.br/webservice/index.php/tools/executaConsulta?param=eyJjb25zdWx0YSI6IkZJQ0hBIEFTU0lOQVRVUkEiLCJwZXNzb2FfdG9rZW4iOiJLdkF2QyJ9";
  isPrintModalOpen.value = true;
};

const printContent = () => {
  const iframe = document.querySelector('iframe');
  if (iframe) {
    iframe.contentWindow.print();
  }
  
};
</script>

<style scoped>
/* Adicione qualquer estilo necessário aqui */
</style>
