<template>
  <div>
    <img
      @click="handleScannerClick"
      src="../../assets/escanearFicha.png"
      style="width: 280px; height: 120px; cursor: pointer; margin-top: 30px"
    />

  </div>
</template>

<script setup>

const config = useRuntimeConfig();
const { $toast } = useNuxtApp();

const viewDoc = `${config.public.envioDoc}`;
const acionarScanner = `${config.public.biometria}/run-scanner`;
const tokenCookie = useCookie('pessoa_token');
const token = tokenCookie.value;

// Função principal ao clicar na imagem
async function handleScannerClick() {
  try {
    await openScanner();
  } catch (error) {
    console.error('Erro ao executar scanner ou listar arquivos:', error);
  }
}

// Função para acionar o scanner
async function openScanner() {
  await enviarArquivo()
  try {
    const { data } = await useFetch(acionarScanner, { method: 'GET' });

  } catch (error) {
    $toast.error('Erro ao acionar o scanner:', error);
  }
}

// Função para enviar um arquivo específico
async function enviarArquivo() {
  try {
    const { status } = await useFetch(viewDoc, {
      method: 'POST',
      body: { bucket: 'cartorio-teste', tipo: 'ficha', pessoa_token: token }
    });
  } catch (error) {
    console.error('Erro ao enviar o arquivo:', error);
  }
}
</script>
