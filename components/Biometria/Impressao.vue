<template>
    <v-col cols="auto">
      <div style="display: flex; flex-direction: column;">
        <img
          @click="printPage"
          src="../../assets/imprimirFicha.png"
          style="width: 280px; height: 120px; cursor: pointer;"
        />
        <img
          @click="printPage2"
          src="../../assets/escanearFicha.png"
          style="width: 280px; height: 120px; cursor: pointer; margin-top: 30px;"
        />
      </div>
    </v-col>
  </template>
  
  <script setup>
  const printPage = () => {
    window.print();
  };
  
  const printPage2 = () => {
    const printUrl = 'https://www.durabil.com.br/webservice/index.php/tools/executaConsulta?param=eyJjb25zdWx0YSI6IkZJQ0hBIEFTU0lOQVRVUkEiLCJwZXNzb2FfdG9rZW4iOiJLdkF2QyJ9';

// Abra uma nova janela com o URL
const printWindow = window.open(printUrl, '_blank');

// Use um timeout para esperar a página carregar antes de chamar o print
setTimeout(() => {
  if (printWindow) {
    printWindow.print();
  } else {
    console.error("A janela de impressão foi bloqueada pelo navegador.");
  }
}, 5000); // Ajuste o temp
  };
  </script>
  