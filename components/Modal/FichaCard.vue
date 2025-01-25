<template>
  <v-dialog persistent v-model="isVisible" max-width="550">
    <v-card>
      <v-card-title class="text-h5">Ficha de Firma</v-card-title>
      <div class="d-flex justify-center align-center" >
        <TiffViewer :tiff-url="fichaRender" :is-modal="true"/>
      </div>
      <v-card-actions>
        <v-btn
          style="background-color: #429946; color: white"
          @click="confirmarRecebimento"
          >Reconhecer</v-btn
        >
        <v-btn style="background-color: red; color: white" @click="closeModal"
          >Voltar</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
const props = defineProps({
  show: Boolean,
  item: Object
});

const config = useRuntimeConfig();
const buscarPessoa = `${config.public.managemant}/getLinkTipo`;
const baixarDocumento = `${config.public.managemant}/download`;

const isVisible = ref(props.show);
const fichaRender = ref()

const emit = defineEmits(["close","confirmar"]);

watch(
  () => props.show,
  async(newVal) => {
    isVisible.value = newVal;
    fichaRender.value = null;
    await beforeOpenFicha();
  }
);

const confirmarRecebimento = () => {
  emit("confirmar");
  closeModal();
};

const beforeOpenFicha = async () => {
  if (!props.item.id) return;

const { data: imagemBiometria } = await useFetch(buscarPessoa, {
  method: "POST",
  body: { tipo: "ficha", id:props.item.id },
});

if (!imagemBiometria.value?.link) return;

const { data: link } = await useFetch(baixarDocumento, {
  method: "POST",
  body: { bucket: "qvgjz", path: imagemBiometria.value.link },
});

const linkMinio = imagemBiometria.value.link;
const linkPayload = link.value;

if (/\.(tr7|tiff)$/i.test(linkMinio)) {
  fichaRender.value = linkPayload;
} else {
  fotoRender.value = `data:image/jpeg;base64,${linkPayload}`;
}
};


const closeModal = () => {
  isVisible.value = false;
  fichaRender.value = null;
  emit("close");
};
</script>
