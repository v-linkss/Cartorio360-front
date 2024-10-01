<template>
  <v-dialog v-model="isVisible" max-width="500">
    <v-card>
      <v-card-title class="text-h5">Erro na Requisição</v-card-title>
      <v-card-text>
        <div v-if="errorMessage">
          {{ errorMessage }}
        </div>
        <div v-else>Ocorreu um erro inesperado.</div>
      </v-card-text>
      <v-card-actions>
        <v-btn
          style="background-color: #429946; color: white"
          @click="closeModal"
          >OK</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
const props = defineProps({
  show: Boolean,
  errorMessage: String,
});

const isVisible = ref(props.show);

const emit = defineEmits(['close']);

watch(
  () => props.show,
  (newVal) => {
    isVisible.value = newVal;
  }
);

const closeModal = () => {
  isVisible.value = false;
  emit("close");
};
</script>
