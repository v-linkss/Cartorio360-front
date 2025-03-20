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
          v-model="selectedServico"
          :items="servicos"
          item-title="descricao"
          item-value="token"
        ></v-autocomplete>
        <v-autocomplete
          item-title="descricao"
          item-value="token"
          class="mb-5"
          label="Selecione o Tipo de Ato"
          v-model="selectedAto"
          :items="atos"
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

const selectedServico = ref("");
const selectedAto = ref("");
const config = useRuntimeConfig();
const usuario_token = useCookie("auth_token").value;
const cartorio_token = ref(useCookie("user-data").value.cartorio_token).value;
const servicos = ref([]);
const atos = ref([]);

const emit = defineEmits(["close", "save"]);
const getTiposAtos = `${config.public.managemant}/tipoAtos`;

const loadServicos = async () => {
  const { data } = await useFetch(getTiposAtos, {
    method: "POST",
    body: { usuario_token: usuario_token, cartorio_token: cartorio_token },
  });
  servicos.value = data.value;
  if (servicos.value.length > 0) {
    selectedServico.value = servicos.value[0].token;
  }
};

const onServicoChange = async (token) => {
  const { data } = await useFetch(getTiposAtos, {
    method: "POST",
    body: {
      usuario_token: usuario_token,
      cartorio_token: cartorio_token,
      servico_token: token,
    },
  });
  atos.value = data.value;
};

watch(selectedServico, async (newValue) => {
  if (newValue) {
    await onServicoChange(newValue);
    selectedAto.value = atos.value.length > 0 ? atos.value[0] : null;
  }
});

const closeModal = () => {
  isVisible.value = false;
  emit("close");
};

loadServicos()

</script>
