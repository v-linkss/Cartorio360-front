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
        <v-textarea label="Descrição" v-model="state.descricao"> </v-textarea>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="3">
        <v-autocomplete
          label="Selecione o Tipo de Registro"
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
      <v-col cols="2">
        <v-text-field label="CIB" v-model="state.cib"></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="3">
        <v-autocomplete
          label="Selecione a Cidade"
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
          label="Selecione o tipo de imovel"
          item-title="descricao"
          item-value="id"
        >
        </v-autocomplete>
      </v-col>
      <v-col cols="3">
        <v-text-field label="Inscrição Municipal"></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="mt-6" cols="3">
        <v-autocomplete
          label="Selecione a Situação"
          :items="situacaoItems"
          item-title="descricao"
          item-value="id"
        >
        </v-autocomplete>
      </v-col>
      <v-col>
        <label>Valor Alienação</label>
        <MoneyInput label="Valor Alienação" v-model="state.vlr_alienacao"></MoneyInput>
      </v-col>
      <v-col>
        <label>Valor Avaliação</label>
        <MoneyInput label="Valor Avaliação" v-model="state.vlr_avaliacao"></MoneyInput>
      </v-col>
      <v-col>
        <label>Valor Mercado</label>
        <MoneyInput label="Valor Mercado" v-model="state.vlr_mercado"></MoneyInput>
      </v-col>
      <v-col cols="1">
        <label>%ITB</label>
        <MoneyInput label="%ITB" v-model="state.aliq_itbi"></MoneyInput>
      </v-col>
      <v-col>
        <label>Valor ITB</label>
        <MoneyInput label="Valor ITB" v-model="state.vlr_itbi"></MoneyInput>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-data-table
          style="height: 465px"
          :headers="headers"
          :items="pessoasTable"
        >
          <template v-slot:item.descricao="{ item }">
            <h3 style="width: 800px; font-weight: 500">
              {{ item.descricao }}
            </h3>
          </template>
          <template v-slot:item.actions="{ item }">
            <v-row style="margin-top: -8px" justify="end">
              <div
                style="cursor: pointer"
                class="mr-2"
                @click="redirectToFicha(item)"
                title="Visualizar Ficha"
              >
                <img
                  style="width: 30px; height: 30px"
                  src="../../assets/visualizar.png"
                  alt="Visualizar"
                />
              </div>
              <div
                style="cursor: pointer"
                class="mr-2"
                @click="redirectToUpdateBens(item.id)"
                title="Alterar Papel"
              >
                <img
                  style="width: 30px; height: 30px"
                  src="../../assets/editar.png"
                  alt="Editar"
                />
              </div>
              <div
                style="cursor: pointer"
                class="mr-2"
                @click="deletePessoa(item)"
                title="Deletar Pessoa"
              >
                <img
                  v-if="item.excluido"
                  style="width: 30px; height: 30px"
                  src="../../assets/excluido.png"
                  alt="Reativar"
                  title="Reativar"
                />
                <img
                  v-else
                  src="../../assets/mudarStatus.png"
                  alt="Excluir"
                  style="width: 30px; height: 30px"
                  title="Excluir"
                />
              </div>
            </v-row>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
    <v-dialog v-model="isModalOpen" max-width="600px">
      <v-card>
        <v-card-title style="color: green">Atualizar Bem</v-card-title>
        <v-card-text>
          <v-col class="mt-1" cols="12">
            <v-textarea label="Descrição" v-model="selectedBem.descricao">
            </v-textarea>
          </v-col>
          <v-row>
            <v-col class="mt-6 ml-3" cols="8">
              <v-autocomplete
                label="Selecione o Tipo"
                :items="state.tiposBens"
                v-model="selectedBem.tipo_id"
                item-title="descricao"
                item-value="id"
              >
              </v-autocomplete>
            </v-col>
            <v-col class="ml-5" cols="3">
              <label>Valor</label>
              <MoneyInput v-model="selectedBem.valor_mercado" />
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green" text @click="isModalOpen = false"
            >Cancelar</v-btn
          >
          <v-btn color="green" text @click="updateAtosBensModal(selectedBem.id)"
            >Salvar</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-row>
      <NuxtLink @click="goBack">
        <v-btn size="large" color="red">Voltar</v-btn>
      </NuxtLink>
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
});

const router = useRouter();
const route = useRoute();
const config = useRuntimeConfig();
const { $toast } = useNuxtApp();
const listarRegistroImoveis = `${config.public.managemant}/registro_imoveis`;
const listarNaturezaImoveis = `${config.public.managemant}/natureza_imoveis`;
const listarTipoLogradouro = `${config.public.managemant}/tipo_logradouros`;
const listarSituacaoImoveis = `${config.public.managemant}/situacao_imoveis`;
const listarCidades = `${config.public.managemant}/listarCidades`;
const listarBens = `${config.public.managemant}/listarTipoBens`;
const cartorio_token = ref(useCookie("user-data").value.cartorio_token);
const user_id = ref(useCookie("user-data").value.usuario_id).value;

const pessoasTable = ref([]);
const selectedBem = ref([]);
const registroItems = ref([]);
const naturezaItems = ref([]);
const tipoLogradouroItems = ref([]);
const cidadeItems = ref([]);
const situacaoItems = ref([]);
const isModalOpen = ref(false);
const loading = ref(true);

const headers = [
  {
    title: "Descrição",
    align: "start",
    key: "descricao",
  },
  {
    title: "Valor",
    align: "end",
    key: "valor_mercado",
  },
  {
    title: "%",
    align: "end",
    key: "valor_mercado",
  },
  { align: "end", value: "actions" },
];

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
  aliq_itbi: null,
  vlr_itbi: null,
});

const createTiposDeBens = async () => {
  if (!state.vlr_alienacao && !state.descricao) {
    $toast.error("Os campos Descrição e Valor são Obrigatorios!");
    return;
  }
  const { data, status } = await useFetch(`${createAtosBens}`, {
    method: "POST",
    body: {
      descricao: state.descricao,
      tipo_id: state.tipo_id,
      valor_mercado: state.vlr_alienacao,
      user_id: user_id,
      ato_id: Number.parseInt(props.ato_id),
      token: props.ato_token,
    },
  });
  if (status.value === "success") {
    $toast.success("Bem registrado com sucesso!");
    pessoasTable.value.push(data.value);
    Object.assign(state, {
      vlr_alienacao: null,
      descricao: null,
      tipo_id: null,
    });
  }
};

const updateAtosBensModal = async (id) => {
  const { status } = await useFetch(`${updateAtosBens}/${id}`, {
    method: "PUT",
    body: {
      descricao: selectedBem.value.descricao,
      tipo_id: selectedBem.value.tipo_id,
      valor_mercado: selectedBem.value.valor_mercado,
    },
  });
  if (status.value === "success") {
    $toast.success("Bem Atualizado com sucesso!");
    isModalOpen.value = false;
  }
};

const redirectToUpdateBens = (id) => {
  const bem = pessoasTable.value.find((item) => item.id === id);
  if (bem) {
    selectedBem.value = bem;
    isModalOpen.value = true;
  }
};

const { data } = await useFetch(`${listarBens}`, {
  method: "POST",
  body: { cartorio_token: cartorio_token.value, imoveis: true },
});
state.tiposBens = data.value;

// const { data: bensPayload } = await useFetch(
//   `${getAtosBens}/${route.query.ato_id}`,
//   {
//     method: "GET",
//   }
// );
// pessoasTable.value = bensPayload.value;

async function deletePessoa(item) {
  item.excluido = !item.excluido;
  try {
    await useFetch(`${updateAtosBens}/${item.id}`, {
      method: "PUT",
      body: JSON.stringify({ excluido: item.excluido }),
    });
  } catch (error) {
    console.error("Erro ao excluir pessoa:", error);
  }
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

const goBack = () => {
  const origem = route.query.origem || "criar";
  const id = route.query.id;
  if (origem === "atualizar") {
    router.push(`/os/atualizar/${id}`);
  } else {
    router.push("/os/criar-registro");
  }
};

onMounted(() => {
  if (props.ato_id) {
    loadImoveisData();
  } else {
    loading.value = false; // Caso não tenha ID, finaliza o carregamento
  }
});
</script>
