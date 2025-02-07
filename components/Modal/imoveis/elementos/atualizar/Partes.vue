<template>
  <v-dialog persistent v-model="isVisible" max-width="800">
    <v-card>
      <v-container>
        <v-row class="mt-1 mb-3" style="justify-content: space-between">
          <h1 class="ml-4">
            Altere o papel para: {{ props.partes_imovel.pessoa.nome }}
          </h1>
        </v-row>
        <hr class="mb-5" />
        <v-row>
          <v-col cols="8">
            <v-autocomplete
              class="mt-6"
              label="Selecione o Papel"
              v-model="state.tipo_parte_id"
              :items="partesItems"
              item-title="descricao"
              item-value="descricao"
              return-object
            ></v-autocomplete>
          </v-col>
          <v-col cols="2">
            <label>%</label>
            <MoneyInput v-model="state.percentual"></MoneyInput>
          </v-col>
        </v-row>
      </v-container>
      <v-card-actions>
        <v-btn style="background-color: red; color: white" @click="closeModal"
          >Voltar</v-btn
        >
        <v-btn
          style="background-color: green; color: white"
          @click="updateAtoPessoa"
          >Salvar</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
const props = defineProps({
  show: Boolean,
  ato_token: String,
  ato_id: Number,
  partes_imovel: Object,
});

const isVisible = ref(props.show);
const route = useRoute();
const config = useRuntimeConfig();
const { $toast } = useNuxtApp();
const pessoasImovelUpdate = `${config.public.managemant}/bens_pessoa`;
const papeisApresentante = `${config.public.managemant}/listarPapeis`;
const partesItems = ref([]);

const state = reactive({
  percentual: null,
  tipo_parte_id: null,
});

// Estado inicial para comparação
const initialState = ref({});

const emit = defineEmits(["close", "update-imovel"]);

watch(
  () => props.show,
  async (newVal) => {
    isVisible.value = newVal;
    if (newVal) {
      await getPartesAtos();
      state.tipo_parte_id = props.partes_imovel.partes_tipos.descricao || null;
      state.percentual = props.partes_imovel.percentual || null;

      initialState.value = {
        tipo_parte_id: state.tipo_parte_id,
        percentual: state.percentual,
      };
    }
  }
);

const closeModal = () => {
  isVisible.value = false;
  emit("close");
};

const getPartesAtos = async () => {
  const { data } = await useFetch(papeisApresentante, {
    method: "POST",
    body: { tipo_ato_token: route.query.tipo_ato_token },
  });

  partesItems.value = data.value;
};

const updateAtoPessoa = async () => {
  const updatedValues = {};

  Object.keys(state).forEach((key) => {
    let newValue = state[key];

    if (key === "tipo_parte_id" && newValue) {
      newValue = newValue.id;
    }

    if (newValue !== initialState.value[key]) {
      updatedValues[key] = newValue;
    }
  });

  const { status } = await useFetch(
    `${pessoasImovelUpdate}/${props.partes_imovel.id}`,
    {
      method: "PUT",
      body: updatedValues,
    }
  );
  
  if (status.value === "success") {
    $toast.success("Parte Atualizada com Sucesso!");
    emit("update-imovel", updatedValues);
    closeModal();
  }
};
</script>

