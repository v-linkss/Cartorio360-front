<template>
  <v-dialog persistent v-model="isVisible" max-width="650">
    <v-card>
      <v-container>
        <v-row class="mb-5 mt-1 ml-2">
          <h1>Confirmação de Recebimento</h1>
        </v-row>

        <v-row class="ml-2">
          <p>
            O valor recebido é menor que o valor da OS, confirma o recebimento
            parcial?
          </p>
        </v-row>
      </v-container>

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
  faltaReceber: Number,
});

const isVisible = ref(props.show);
const emit = defineEmits(["close"]);

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
