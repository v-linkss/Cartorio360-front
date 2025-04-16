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
    <div v-if="props.linkFicha">
        <img
        @click="redirectToFicha()"
          style="width: 80px; height: 80px; cursor: pointer"
          src="../../assets/visualizar.png"
          alt="Ver ficha"
        />
      </div>
    </v-col>
    <ModalFichaCard
    v-if="isModalFichaOpen"
    :show="isModalFichaOpen"
    :link-view="linkFichaPessoa"
    :is-view="true"
    @close="isModalFichaOpen = false"
  />
</template>

<script setup>
const props = defineProps({
  linkFicha: String
});
const printHtml = ref("");

const config = useRuntimeConfig();
const impressao = `${config.public.managemant}/gerarRelatorioPessoa`;
const baixarDocumento = `${config.public.managemant}/download`;
const linkFichaPessoa = ref(null)
const isView = ref(false)
const isModalFichaOpen = ref(false)

const consultaFicha = async () => {
  const response = await useFetch(impressao, {
    method: "POST",
    body :{
      consulta:"FICHA ASSINATURA",
      pessoa_token: useCookie('pessoa_token').value
    }
  });
  printHtml.value = response.data.value;
};

if(props.linkFicha){
  const { data: link } = await useFetch(baixarDocumento, {
      method: "POST",
      body: {
        bucket: useCookie("user-data").value.cartorio_token,
        path: props.linkFicha,
      },
    });
  linkFichaPessoa.value = link.value;
}

const redirectToFicha = () =>{
  isModalFichaOpen.value = true
  isView.value = true
}


const printContent = async() => {
  await consultaFicha()
  const iframe = document.createElement("iframe");

  iframe.style.position = "absolute";
  iframe.style.width = "0px";
  iframe.style.height = "0px";
  iframe.style.border = "none";
  document.body.appendChild(iframe);

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
