<template>
  <div>
    <img
      @click="runScanner"
      src="../../assets/escanearFicha.png"
      style="width: 280px; height: 120px; cursor: pointer; margin-top: 30px"
    />
  </div>
  <input type="file" @change="handleFileUpload" />
  <button @click="uploadFile()">Enviar</button>
</template>

<script setup>
const config = useRuntimeConfig();
var formData = new FormData();
const upload = `${config.public.managemant}/upload`;
const acionarScanner = `${config.public.biometria}/run-scanner`;



const runScanner = async () => {


};
const handleFileUpload = (event) => { 
  console.log("handleFileUpload", event.target.files[0]);
  const file = event.target.files[0];
  formData.append("file", file);
  formData.append("pessoa_token", useCookie('pessoa_token').value); 
  formData.append("bucket", "cartorio-teste"); 
  formData.append("tipo", "ficha"); 



};
function uploadFile() {
    console.log("uploadFile");
    const { data, error, status } = useFetch(upload, {
    method: "POST",
    body: formData
  });
};
</script>

<style scoped></style>
