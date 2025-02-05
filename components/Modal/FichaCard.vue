<template>
  <v-dialog persistent v-model="isVisible" max-width="650">
    <v-card>
      <v-card-title class="text-h5">Ficha de Firma</v-card-title>

      <v-container>
        <v-row>
          <v-col cols="10">
            <v-slider
              v-model="zoomLevel"
              min="1"
              max="2"
              step="0.1"
              label="Zoom"
              class="mt-3"
            ></v-slider>
          </v-col>
          <v-col cols="2">
            <v-icon class="ml-6" :size="'50px'" @click="rotateImage"
              >mdi-rotate-right</v-icon
            >
          </v-col>
        </v-row>
      </v-container>
      <div class="d-flex justify-center align-center">
        <TiffViewer
          v-if="hasTiff"
          :tiff-url="fichaRender"
          :is-modal="true"
          :zoom-level="zoomLevel"
          :style="{
            transform: `scale(${zoomLevel}) rotate(${rotationDegree}deg)`,
          }"
        />
        <img
          v-else-if="hasFoto"
          :src="fotoRender"
          :style="{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transform: `scale(${zoomLevel}) rotate(${rotationDegree}deg)`,
          }"
        />
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
  item: Object,
});

const config = useRuntimeConfig();
const buscarPessoa = `${config.public.managemant}/getLinkTipo`;
const baixarDocumento = `${config.public.managemant}/download`;

const hasTiff = computed(() => !!fichaRender.value);
const hasFoto = computed(() => !!fotoRender.value);

const isVisible = ref(props.show);
const fichaRender = ref(null);
const fotoRender = ref(null);

const zoomLevel = ref(1); // Nível de zoom (inicialmente 1x)
const rotationDegree = ref(0); // Grau de rotação (inicialmente 0)

const emit = defineEmits(["close", "confirmar"]);

watch(
  () => props.show,
  async (newVal) => {
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
    body: { tipo: "ficha", id: props.item.id },
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
    fotoRender.value = linkPayload;
  }
};

const closeModal = () => {
  isVisible.value = false;
  fichaRender.value = null;
  fotoRender.value = null;
  zoomLevel.value = 
  emit("close");
};

const rotateImage = () => {
  rotationDegree.value += 90; // Rotaciona a imagem 90 graus
  if (rotationDegree.value >= 360) {
    rotationDegree.value = 0; // Reseta a rotação após 360 graus
  }
};
</script>

<style scoped>
/* Estilo para o slider */
.v-slider {
  width: 100%;
}
</style>
