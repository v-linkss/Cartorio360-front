<template>
  <v-dialog v-model="isVisible" max-width="500">
    <v-card>
      <v-card-title class="text-h5">Reimpressão de Selos</v-card-title>
      <v-container>
        <hr class="mb-5" />

        <v-data-table
          :headers="headers"
          :items="atosItems"
          item-key="id"
          show-select
        >
        </v-data-table>
      </v-container>
      <v-card-actions>
        <div>
          <img src="../../assets/selo.png" alt="" @click="closeModal" />
        </div>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
const props = defineProps({
  show: Boolean,
});

const isVisible = ref(props.show);

const emit = defineEmits(["close"]);

const headers = [
  { title: "Numero", value: "protocolo" },
  { title: "Referencia", value: "usuario_nome" },
  {
    value: "actions",
  },
];

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
