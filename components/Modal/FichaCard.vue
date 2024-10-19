<template>
  <v-dialog persistent v-model="isVisible" per max-width="700">
    <v-card>
      <v-card-title class="text-h5">Ficha de Firma</v-card-title>
      <v-img src="../../assets/ficha.png"/>
      <v-card-actions>
        <v-btn
          style="background-color: #429946; color: white"
          @click="confirmarRecebimento"
          >Confirmar</v-btn
        >
        <v-btn style="background-color: red; color: white" @click="closeModal"
          >Cancelar</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
const props = defineProps({
  show: Boolean,
});

const isVisible = ref(props.show);

const emit = defineEmits(["close","confirmar"]);

watch(
  () => props.show,
  (newVal) => {
    isVisible.value = newVal;
  }
);

const confirmarRecebimento = () => {
  emit("confirmar");
  closeModal();
};

const closeModal = () => {
  isVisible.value = false;
  emit("close");
};
</script>
