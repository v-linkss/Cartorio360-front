<template>
  <v-container>
    <v-row class="d-flex align-items-center">
      <BiometriaDigital />
      <BiometriaReconhecimentoFacial class="ml-5 mr-5"/>
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
