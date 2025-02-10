<template>
  <div v-if="loading" class="d-flex justify-center">
    <v-progress-circular
      indeterminate
      class="loading-spinner"
      size="64"
    ></v-progress-circular>
  </div>
  <v-container v-else>
    <v-row>
      <v-col class="mt-5" cols="12">
        <v-textarea
          label="Descrição"
          v-model="state.descricao"
          :error-messages="v$.descricao.$errors.map((e) => e.$message)"
        >
        </v-textarea>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="3">
        <v-autocomplete
          label="Tipo de Registro"
          v-model="state.tabvalores_tipo_regimovel_id"
          :items="registroItems"
          item-title="descricao"
          item-value="id"
        >
        </v-autocomplete>
      </v-col>
      <v-col cols="2">
        <v-text-field
          label="Cartório"
          v-model="state.registro_cartorio"
        ></v-text-field>
      </v-col>
      <v-col cols="2">
        <v-text-field
          label="Matricula"
          v-model="state.registro_matricula"
        ></v-text-field>
      </v-col>
      <v-col>
        <v-text-field
          label="Letra"
          v-model="state.registro_matricula_letra"
        ></v-text-field>
      </v-col>
      <v-col cols="2">
        <v-autocomplete
          label="Natureza"
          v-model="state.tabvalores_nat_imovel_id"
          :items="naturezaItems"
          item-title="descricao"
          item-value="id"
        ></v-autocomplete>
      </v-col>
      <v-col cols="1">
        <v-text-field label="CIB" v-model="state.cib"></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="3">
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
      <v-col cols="4">
        <v-autocomplete
          label="Logradouro"
          v-model="state.tabvalores_tipologradouro_id"
          :items="tipoLogradouroItems"
          item-title="descricao"
          item-value="id"
        >
        </v-autocomplete>
      </v-col>
      <v-col cols="1">
        <v-text-field
          label="N*"
          v-model="state.end_logradouro_numero"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-text-field label="Bairro" v-model="state.end_bairro"></v-text-field>
      </v-col>
      <v-col>
        <v-text-field label="CEP" v-model="state.end_cep"></v-text-field>
      </v-col>
      <v-col>
        <v-text-field
          label="Complemento"
          v-model="state.end_complemento"
        ></v-text-field>
      </v-col>
      <v-col cols="3">
        <v-autocomplete
          v-model="state.tipo_id"
          :items="tipoBensItems"
          label="Tipo de imovel"
          item-title="descricao"
          item-value="id"
          :error-messages="v$.tipo_id.$errors.map((e) => e.$message)"
        >
        </v-autocomplete>
      </v-col>
      <v-col cols="3">
        <v-text-field label="Inscrição Municipal"></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="mt-6" cols="4">
        <v-autocomplete
          label="Situação"
          :items="situacaoItems"
          item-title="descricao"
          item-value="id"
        >
        </v-autocomplete>
      </v-col>
      <v-col cols="2">
        <label>Valor Alienação</label>
        <MoneyInput
          label="Valor Alienação"
          v-model="state.vlr_alienacao"
        ></MoneyInput>
      </v-col>
      <v-col cols="2">
        <label>Valor Avaliação</label>
        <MoneyInput
          label="Valor Avaliação"
          v-model="state.vlr_avaliacao"
        ></MoneyInput>
      </v-col>
      <v-col cols="2">
        <label>Valor Mercado</label>
        <MoneyInput
          label="Valor Mercado"
          v-model="state.vlr_mercado"
        ></MoneyInput>
      </v-col>
      <v-col cols="1">
        <label>%ITB</label>
        <MoneyInput label="%ITB" v-model="state.aliq_itbi"></MoneyInput>
      </v-col>
      <v-col cols="1">
        <label>Valor ITB</label>
        <MoneyInput label="Valor ITB" v-model="state.vlr_itbi"></MoneyInput>
      </v-col>
    </v-row>
    <v-row class="mt-10">
      <NuxtLink @click="goBack">
        <v-btn size="large" color="red">Voltar</v-btn>
      </NuxtLink>
      <v-btn v-if="isUpdate" class="ml-5" size="large" color="green" @click="updateImovelModal(props.imovel_id)"
        >Atualizar</v-btn
      >
      <v-btn
        v-else
        class="ml-5"
        size="large"
        color="green"
        @click="createImovel"
        >Salvar</v-btn
      >
    </v-row>
  </v-container>
</template>

<script setup>
import { useVuelidate } from "@vuelidate/core";
import { helpers, required } from "@vuelidate/validators";

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

const emit = defineEmits(["saved", "close-modal","refresh-list"]);
const route = useRoute();
const config = useRuntimeConfig();
const { $toast } = useNuxtApp();
const { id } = route.params;
const createAtosBens = `${config.public.managemant}/atos_bens`;
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
  vlr_alienacao: null,
  tabvalores_tipo_regimovel_id: null,
  registro_cartorio: null,
  registro_matricula: null,
  registro_matricula_letra: null,
  tabvalores_nat_imovel_id: null,
  cib: null,
  end_cidade_id: null,
  end_quadra: null,
  end_lote: null,
  tabvalores_tipologradouro_id: null,
  end_logradouro: null,
  end_logradouro_numero: null,
  end_bairro: null,
  end_cep: null,
  end_complemento: null,
  tipo_id: null,
  descricao: null,
  inscricao_estadual: null,
  tabvalores_situacao_imoveis_id: null,
  tipo_id: null,
  vlr_alienacao: null,
  vlr_mercado: null,
  valor_mercado: "0.00",
  aliq_itbi: null,
  vlr_itbi: null,
  user_id: user_id,
  ato_id: Number(route.query.ato_id) || Number(props.ato_id),
});
const statePayload = reactive({ ...state })
const rules = {
  descricao: {
    required: helpers.withMessage("O campo é obrigatório", required),
  },
  tipo_id: { required: helpers.withMessage("O campo é obrigatório", required) },
};

const v$ = useVuelidate(rules, state);

const createImovel = async () => {
  const isValid = await v$.value.$validate();

  if (!isValid) {
    $toast.error("Preencha todos os campos obrigatórios!");
    return;
  }
  const { data,status } = await useFetch(`${createAtosBens}`, {
    method: "POST",
    body: state,
  });
  if (status.value === "success") {
    $toast.success("Imovel criado com sucesso!");
    emit("saved", { id: data.value.id,token:data.value.token });
    emit('refresh-list')
  }
};

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
 const {status} = await useFetch(`${updateImovel}/${id}`, {
    method: "PUT",
    body:updatedValues,
  });
  if(status.value === 'success'){
    $toast.success('Imovel Atualizado com sucesso!')
    emit('close-modal')
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
