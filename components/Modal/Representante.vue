<template>
  <v-dialog persistent v-model="isVisible" max-width="800">
    <v-card>
      <v-container>
        <v-row class="mt-1 mb-3" style="justify-content: space-between">
          <h2 class="ml-4">
            Representante para: {{ props.representante_nome }}
          </h2>
        </v-row>
        <hr class="mb-5" />
        <v-autocomplete
          class="mb-5"
          label="Selecione o Representante"
          v-model="state.representante_id"
          :items="props.representantes"
          item-title="nome"
          item-value="id"
          return-object
        ></v-autocomplete>
      </v-container>
      <v-card-actions>
        <v-btn style="background-color: red; color: white" @click="closeModal"
          >Voltar</v-btn
        >
        <v-btn @click="limparRepresentante" border>Limpar</v-btn>
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
  representantes: Array,
  ato_id: Number,
  representante_nome: String,
});
const isVisible = ref(props.show);

const config = useRuntimeConfig();
const isClear = ref(false);
const { $toast } = useNuxtApp();
const pessoasUpdate = `${config.public.managemant}/updateAtosPessoa`;

const state = reactive({
  representante_id: null,
});

const emit = defineEmits(["close", "update-representante"]);

watch(
  () => props.show,
  async (newVal) => {
    isVisible.value = newVal;
  }
);
const closeModal = () => {
  state.representante_id = null;
  isVisible.value = false;
  emit("close");
};

const updateAtoPessoa = async (clear) => {
  const representanteId = state.representante_id?.id ?? null;
  const { data, error, status } = await useFetch(
    `${pessoasUpdate}/${props.ato_id}`,
    {
      method: "PUT",
      body: {
        representante_id: representanteId,
      },
    }
  );
  if (status.value === "success") {
    if (clear === true) {
      $toast.success("Representante removido com Sucesso!");
      emit("update-representante", "");
      closeModal();
    } else {
      $toast.success("Representante adicionado com Sucesso!");
      emit("update-representante", state.representante_id.nome);
      closeModal();
    }
  }
};

const limparRepresentante = () => {
  state.representante_id = null;
  isClear.value = true;
  updateAtoPessoa(isClear.value);
};
</script>
