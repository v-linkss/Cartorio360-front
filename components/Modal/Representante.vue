<template>
    <v-dialog persistent v-model="isVisible" max-width="500">
      <v-card>
        <v-container>
          <v-row class="mt-1 mb-3" style="justify-content: space-between">
            <h1 class=" ml-4">Representante para:</h1>
  
          </v-row>
          <hr class="mb-5" />
          <v-autocomplete
            class="mb-5"
            label="Tabelião/escrivão"
            v-model="state.escrevente"
            :items="escreventesItems"
            item-title="nome"
            item-value="token"
            required
            :error-messages="v$.escrevente.$errors.map((e) => e.$message)"
            @blur="v$.escrevente.$touch"
            @input="v$.escrevente.$touch"
          ></v-autocomplete>
        </v-container>
        <v-card-actions>
            <v-btn color="green">Salvar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </template>
  
  <script setup>
  import { useVuelidate } from "@vuelidate/core";
  import { helpers, required } from "@vuelidate/validators";
  
  const props = defineProps({
    show: Boolean,
    ato_token: String,
  });
  
  const isVisible = ref(props.show);
  const config = useRuntimeConfig();
  const cartorio_token = ref(useCookie("user-data").value.cartorio_token).value;
  const getSelos = `${config.public.managemant}/listarSelos`;
  const reimprimeSelos = `${config.public.managemant}/reimprimirSelo`;
  const allEscreventes = `${config.public.managemant}/listarEscrevente`;
  
  const selosItems = ref([]);
  const selectedSelos = ref([]);
  
  const state = reactive({
    escrevente: null,
  });
  
  const emit = defineEmits(["close"]);
  
  const rules = {
    escrevente: {
      required: helpers.withMessage("O campo é obrigatorio", required),
    },
  };
  
  const v$ = useVuelidate(rules, state);
  
  const headers = [
    { title: "Numero", value: "numero" },
    { title: "Referencia", value: "referencia" },
    {
      value: "actions",
    },
  ];
  
  watch(
    () => props.show,
    (newVal) => {
      isVisible.value = newVal;
      if (newVal) {
        fetchSelos();
      }
    }
  );
  const closeModal = () => {
    isVisible.value = false;
    emit("close");
  };
  
  const escreventesItems = ref([]);
  


  </script>
  