<template>
    <v-dialog persistent v-model="isVisible" max-width="800">
      <v-card>
        <v-container>
          <v-row class="mt-1 mb-3" style="justify-content: space-between">
            <h1 class=" ml-4">Altere o papel para: {{ props.representante_nome }}</h1>
  
          </v-row>
          <hr class="mb-5" />
          <v-autocomplete
            class="mb-5"
            label="Selecione o Papel"
            v-model="state.papel_id"
            :items="props.papeis"
            item-title="descricao"
            item-value="token"
          ></v-autocomplete>
        </v-container>
        <v-card-actions>
          <v-btn style="background-color: red; color: white" @click="closeModal"
          >Voltar</v-btn
        >
            <v-btn style="background-color: green; color: white">Salvar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </template>
  
  <script setup>
  
  const props = defineProps({
    show: Boolean,
    ato_token: String,
    representante_nome:String,
    papeis: Array,
  });
  const isVisible = ref(props.show);
  const config = useRuntimeConfig();
  
  const state = reactive({
    papel_id: null,
  });
  
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
  