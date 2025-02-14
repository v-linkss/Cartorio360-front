<template>
  <div v-if="loading" class="d-flex justify-center">
    <v-progress-circular
      indeterminate
      class="loading-spinner"
      size="64"
    ></v-progress-circular>
  </div>
  <v-container style="height: 500px;" class="mt-2" v-else>
    <v-row>
      <v-col cols="5">
        <v-autocomplete
          label="Cidade"
          v-model="state.end_cidade_id"
          :items="cidadeItems"
          item-title="descricao"
          item-value="id"
        >
        </v-autocomplete>
      </v-col>
      <v-col cols="2">
        <v-text-field label="Quadra" v-model="state.end_quadra"></v-text-field>
      </v-col>
      <v-col cols="2">
        <v-text-field label="Lote" v-model="state.end_lote"></v-text-field>
      </v-col>
      <v-col cols="3">
        <v-autocomplete
          label="Tipo de Logradouro"
          v-model="state.tabvalores_tipologradouro_id"
          :items="tipoLogradouroItems"
          item-title="descricao"
          item-value="id"
        >
        </v-autocomplete>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="5">
        <v-text-field
          label="Logradouro"
          v-model="state.end_logradouro"
        ></v-text-field>
      </v-col>
      <v-col cols="1">
        <v-text-field
          label="N*"
          v-model="state.end_logradouro_numero"
        ></v-text-field>
      </v-col>
      <v-col>
        <v-text-field label="Bairro" v-model="state.end_bairro"></v-text-field>
      </v-col>
      <v-col cols="2">
        <v-text-field label="CEP" v-model="state.end_cep"></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="5">
        <v-text-field
          label="Complemento"
          v-model="state.end_complemento"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row class="mt-10 justify-start ">
      <NuxtLink @click="goBack">
        <v-btn size="large" color="red">Voltar</v-btn>
      </NuxtLink>
      <v-btn
        v-if="isUpdate"
        class="ml-5"
        size="large"
        color="green"
        @click="updateImovelModal(props.imovel_id)"
        >Atualizar</v-btn
      >
      <v-btn
        v-else
        class="ml-5"
        size="large"
        color="green"
        @click="updateImovelModal(props.imovel_id)"
        >Salvar</v-btn
      >
    </v-row>
  </v-container>
</template>

<script setup>

const props = defineProps({
  ato_token: {
    type: String,
    required: true,
  },
  ato_id: {
    type: Number,
    required: true,
  },
  isUpdate: {
    type: Boolean,
  },
  imovel_id: {
    type: Number,
  },
});

const emit = defineEmits(["saved", "close-modal", "refresh-list"]);
const route = useRoute();
const config = useRuntimeConfig();
const { $toast } = useNuxtApp();
const { id } = route.params;
const getImoveisById = `${config.public.managemant}/atos_bens`;
const updateImovel = `${config.public.managemant}/atos_bens`;
const listarRegistroImoveis = `${config.public.managemant}/registro_imoveis`;
const listarNaturezaImoveis = `${config.public.managemant}/natureza_imoveis`;
const listarTipoLogradouro = `${config.public.managemant}/tipo_logradouros`;
const listarSituacaoImoveis = `${config.public.managemant}/situacao_imoveis`;
const listarCidades = `${config.public.managemant}/listarCidades`;
const listarBens = `${config.public.managemant}/listarTipoBens`;
const cartorio_token = ref(useCookie("user-data").value.cartorio_token);
const user_id = ref(useCookie("user-data").value.usuario_id).value;

const registroItems = ref([]);
const naturezaItems = ref([]);
const tipoLogradouroItems = ref([]);
const cidadeItems = ref([]);
const situacaoItems = ref([]);
const tipoBensItems = ref([]);
const loading = ref(true);

const state = reactive({
  end_cidade_id: null,
  end_quadra: null,
  end_lote: null,
  tabvalores_tipologradouro_id: null,
  end_logradouro: null,
  end_logradouro_numero: null,
  end_bairro: null,
  end_cep: null,
  end_complemento: null,
  user_id: user_id,
  ato_id: Number(route.query.ato_id) || Number(props.ato_id),
});
const statePayload = reactive({ ...state });

const { data } = await useFetch(`${listarBens}`, {
  method: "POST",
  body: { cartorio_token: cartorio_token.value, imoveis: true },
});
tipoBensItems.value = data.value;

if (props.isUpdate === true) {
  const { data: dadosParte } = await useFetch(
    `${getImoveisById}/${props.imovel_id}`,
    {
      method: "GET",
    }
  );
  if (dadosParte.value) {

    Object.keys(state).forEach((key) => {
      if (dadosParte.value[key] !== undefined) {
        state[key] = dadosParte.value[key];
      }
    });
  }
  Object.assign(statePayload, state);
}

async function loadImoveisData() {
  try {
    const [natureza, registro, situacao, logradouro, cidade] =
      await Promise.all([
        $fetch(listarNaturezaImoveis),
        $fetch(listarRegistroImoveis),
        $fetch(listarSituacaoImoveis),
        $fetch(listarTipoLogradouro),
        $fetch(listarCidades),
      ]);

    naturezaItems.value = natureza;
    registroItems.value = registro;
    situacaoItems.value = situacao;
    tipoLogradouroItems.value = logradouro;
    cidadeItems.value = cidade;
  } catch (error) {
    console.error("Erro ao carregar os dados de imoveis pessoa:", error);
  } finally {
    loading.value = false; // Finaliza o estado de carregamento
  }
}

const updateImovelModal = async (id) => {
  const updatedValues = {};

  Object.keys(state).forEach((key) => {
    if (state[key] !== statePayload[key]) {
      updatedValues[key] = state[key];
    }
  });

  if (Object.keys(updatedValues).length === 0) {
    return;
  }
  const { status } = await useFetch(`${updateImovel}/${id}`, {
    method: "PUT",
    body: updatedValues,
  });
  if (status.value === "success") {
    $toast.success("Imovel Atualizado com sucesso!");
    emit('refresh-list')
  }
};

const goBack = () => {
  emit("close-modal");
};

onMounted(() => {
  if (id || props.ato_id) {
    loadImoveisData();
  } else {
    loading.value = false; // Caso não tenha ID, finaliza o carregamento
  }
});
</script>
