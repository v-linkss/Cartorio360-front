<template>
  <v-dialog persistent v-model="isVisible" max-width="500">
    <v-card>
      <v-container>
        <v-row class="mt-1 mb-3" style="justify-content: space-between">
          <h1 class="ml-4">Tipos de Atos</h1>
        </v-row>
        <hr class="mb-5" />
        <v-autocomplete
          class="mb-5"
          label="Selecione o Serviço"
          v-model="state.selectedServico"
          :items="servicos"
        ></v-autocomplete>
        <v-autocomplete
          class="mb-5"
          label="Selecione o Tipo de Ato"
          v-model="state.selectedTipoAto"
          :items="tiposAtos"
        ></v-autocomplete>
      </v-container>
      <v-card-actions>
        <v-btn style="background-color: red; color: white" @click="closeModal"
          >Voltar</v-btn
        >
        <v-btn
          style="background-color: green; color: white"
          @click="save"
          >Salvar</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
const props = defineProps({
  show: Boolean,
  servicos: Array,
  tiposAtos: Array,
});
const isVisible = ref(props.show);

const state = reactive({
  selectedServico: null,
  selectedTipoAto: null,
});

const emit = defineEmits(["close", "save"]);

watch(
  () => props.show,
  (newVal) => {
    isVisible.value = newVal;
  }
);

const closeModal = () => {
  state.selectedServico = null;
  state.selectedTipoAto = null;
  isVisible.value = false;
  emit("close");
};

const save = () => {
  emit("save", {
    servico: state.selectedServico,
    tipoAto: state.selectedTipoAto,
  });
  closeModal();
};
</script>
