<template>
  <v-row class="d-flex align-items-center justify-space-between">
    <BiometriaDigital />
    <BiometriaReconhecimentoFacial/>
    <BiometriaImpressao/>
  </v-row>
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
