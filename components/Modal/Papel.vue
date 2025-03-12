<template>
  <v-dialog persistent v-model="isVisible" max-width="800">
    <v-card>
      <v-container>
        <v-row class="mt-1 mb-3" style="justify-content: space-between">
          <h1 class="ml-4">
            Altere o papel para: {{ props.representante_nome }}
          </h1>
        </v-row>
        <hr class="mb-5" />
        <v-autocomplete
          class="mb-5"
          label="Selecione o Papel"
          v-model="state.tipo_parte_id"
          :items="papeisItems"
          item-title="descricao"
          item-value="descricao"
          return-object
        ></v-autocomplete>
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
  representante_nome: String,
});
const isVisible = ref(props.show);
const route = useRoute()
const config = useRuntimeConfig();
const { $toast } = useNuxtApp();
const pessoasUpdate = `${config.public.managemant}/updateAtosPessoa`;
const papeisApresentante = `${config.public.managemant}/listarPapeis`;
const papeisItems = ref([]);

const state = reactive({
  tipo_parte_id: null,
});

const emit = defineEmits(["close", "update-papel"]);

watch(
  () => props.show,
  async (newVal) => {
    isVisible.value = newVal;
    if (newVal) {
      await getPapeis();
    }
  }
);
const closeModal = () => {
  isVisible.value = false;
  emit("close");
};

const getPapeis = async () => {
  const { data } = await useFetch(papeisApresentante, {
    method: "POST",
    body: { tipo_ato_token: route.query.tipo_ato_token||props.ato_token },
  });
  papeisItems.value = data.value;
};

const updateAtoPessoa = async () => {
    const { data, error, status } = await useFetch(`${pessoasUpdate}/${props.ato_id}`, {
      method: "PUT",
      body: {
        tipo_parte_id: state.tipo_parte_id.id,
      },
    });
    if (status.value === "success") {
      $toast.success("Papel Atualizado com Sucesso!");
      emit('update-papel', state.tipo_parte_id.descricao);
      closeModal()
    }
};
</script>
