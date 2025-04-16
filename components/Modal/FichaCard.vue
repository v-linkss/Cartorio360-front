<template>
  <v-dialog persistent v-model="isVisible" max-width="850">
    <v-card>
      <v-card-title class="text-h5">Ficha de Firma</v-card-title>
      <v-container>
        <v-row>
          <v-col cols="10">
            <v-slider
              v-model="zoomLevel"
              min="0.5"
              max="1.1"
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
        <div v-if="hasTiff" class="ml-5 mt-15">
          <TiffViewer
            :tiff-url="fichaRender"
            :is-modal="true"
            :zoom-level="zoomLevel"
            :rotation-degree="rotationDegree"
            :translate-x="translateX"
          />
        </div>
        <img
          v-else-if="hasFoto"
          :src="fotoRender"
          :style="{
            width: '70%',
            height: '70%',
            transform: `scale(${zoomLevel}) rotate(${rotationDegree}deg)`,
          }"
        />
        <div v-if="!fotoRender && !fichaRender">
          <h3 class="mb-5">
            Este usuario não possui ficha de firma cadastrada.
          </h3>
        </div>
      </div>
      <v-card-actions>
        <v-btn
          v-if="!props.isView"
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
  isView: {
    type: Boolean,
    default: false,
  },
  linkView: String,
});
const config = useRuntimeConfig();
const buscarPessoa = `${config.public.managemant}/getLinkTipo`;
const baixarDocumento = `${config.public.managemant}/download`;

const hasTiff = computed(() => !!fichaRender.value);
const hasFoto = computed(() => !!fotoRender.value);

const isVisible = ref(props.show);
const fichaRender = ref(null);
const fotoRender = ref(null);

const zoomLevel = ref(0.8); // Nível de zoom (inicialmente 1x)
const rotationDegree = ref(0); // Grau de rotação (inicialmente 0)

const emit = defineEmits(["close", "confirmar"]);

const translateX = computed(() => {
  // Ajuste o valor de acordo com o quanto você quer que ele se mova
  return (zoomLevel.value - 1) * -50; // Move 50px para a esquerda por nível de zoom
});

watch(
  () => props.show,
  async (newVal) => {
    isVisible.value = newVal;
    fichaRender.value = null;
    await beforeOpenFicha();
  },
  {immediate: true}
);

watch(
  () => props.linkView,
  (newLinkView) => {
    if(props.isView){
      if (newLinkView && newLinkView.includes('.tr7')) {
        fichaRender.value = newLinkView;
        fotoRender.value = null;
      } else {
        fichaRender.value = null;
        fotoRender.value = newLinkView;
      }
    }
  },
  {immediate: true}
);

const confirmarRecebimento = () => {
  emit("confirmar");
  closeModal();
};

const beforeOpenFicha = async () => {
  if (props.isView) {
    return
  }
  if (!props.item.id) return;

  const { data: imagemBiometria } = await useFetch(buscarPessoa, {
    method: "POST",
    body: { tipo: "ficha", id: props.item.id },
  });

  if (!imagemBiometria.value?.link) return;

  const { data: link } = await useFetch(baixarDocumento, {
    method: "POST",
    body: {
      bucket: useCookie("user-data").value.cartorio_token,
      path: imagemBiometria.value.link,
    },
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
  zoomLevel.value = 0.8;
  rotationDegree.value = 0;
  emit("close");
};

const rotateImage = () => {
  rotationDegree.value += 90;
  if (rotationDegree.value >= 360) {
    rotationDegree.value = 0;
  }
};
</script>

<style scoped>
/* Estilo para o slider */
.v-slider {
  width: 100%;
}
</style>
