<template>
  <v-container>
    <v-row class="d-flex align-items-center justify-space-between">
      <BiometriaDigital />
      <div :style="{ maxWidth: props.isModal ? '200px' : 'none' }">
        <BiometriaReconhecimentoFacial />
      </div>
      <BiometriaImpressao />
    </v-row>
  </v-container>
  <v-btn @click="voltar" class="mt-10" size="large" color="red">Voltar</v-btn>
</template>

<script setup>
const router = useRouter();

const emit = defineEmits(["close-modal"]);

const props = defineProps({
  isModal: {
    type: Boolean,
    default: false,
  },
});

const voltar = () => {
  if (props.isModal === true) {
    emit("close-modal");
    return;
  }
  router.push("/pessoas/lista");
};
</script>
