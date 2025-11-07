<template>
  <v-dialog persistent v-model="isVisible" max-width="1200">
    <v-card>
      <v-container>
        <v-textarea
          label="Observação"
          rows="19"
          v-model="state.observacao"
          :readonly="visualizar"
        ></v-textarea>
      </v-container>
      <v-card-actions>
        <v-btn style="background-color: red; color: white" @click="closeModal"
          >Voltar</v-btn
        >
        <v-btn
          v-if="!visualizar"
          style="background-color: green; color: white"
          @click="onSubmit"
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
  observacao: String,
  visualizar: Boolean,
});
const isVisible = ref(props.show);
const route = useRoute();
const config = useRuntimeConfig();
const { $toast } = useNuxtApp();
const createAtoObservacao = `${config.public.managemant}/atos_observacao`;

const state = reactive({
  observacao: props.observacao || "",
});

const emit = defineEmits(["close", "update-papel"]);

watch(
  () => props.show,
  async (newVal) => {
    isVisible.value = newVal;
    if (props.visualizar) {
      state.observacao = props.observacao;
    }
  }
);
const closeModal = () => {
  isVisible.value = false;
  emit("close");
};

async function onSubmit() {
  // Verifica se o campo está vazio e só valida se houver algo
  if (state.observacao === "" || state.observacao === null) {
    $toast.error("O campo de observação está vazio.");
    return;
  }

  const { data, error, status } = await useFetch(createAtoObservacao, {
    method: "POST",
    body: {
      ato_id: Number(route.query.ato_id),
      observacao: state.observacao,
      user_id: useCookie("user-data").value.usuario_id,
    },
  });
  if (status.value === "success") {
    state.observacao = "";
    closeModal();
    $toast.success("Observação registrada com sucesso");
  }
}
</script>
