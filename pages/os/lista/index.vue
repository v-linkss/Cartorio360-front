<template>
  <v-container class="mt-5" style="width: 100%;">
    <v-row class="mb-5">
      <h1>Ordens de Serviço</h1>
      <NuxtLink to="/os/criar-registro">
        <img
          style="width: 60px; height: 60px; cursor: pointer; margin-left: 70px"
          src="../../../assets/novo.png"
          alt="novo"
          @click="showCreateOrdem"
        />
      </NuxtLink>
    </v-row>
    <v-row style="margin-bottom: -35px">
      <v-col>
        <v-text-field
          v-model="state.numero"
          label="Número"
        ></v-text-field>
      </v-col>
      <v-col>
        <v-text-field
          v-model="state.data_inicio"
          type="date"
          label="Abertura de"
          style="width: 150px"
        ></v-text-field>
      </v-col>
      <v-col>
        <v-text-field
          v-model="state.data_fim"
          type="date"
          label="Abertura até"
          style="width: 150px"
        ></v-text-field>
      </v-col>
      <v-col>
        <v-text-field
          v-model="state.data_lavratura_inicio"
          type="date"
          label="Lavratura de"
          style="width: 150px"
        ></v-text-field>
      </v-col>
      <v-col>
        <v-text-field
          v-model="state.data_lavratura_fim"
          type="date"
          label="Lavratura até"
          style="width: 150px"
        ></v-text-field>
      </v-col>
      <v-col>
        <v-text-field
          v-model="state.protocolo"
          label="Protocolo"
        ></v-text-field>
      </v-col>
      <v-col md="1">
        <v-text-field
          v-model="state.livro"
          label="Livro"
        ></v-text-field>
      </v-col>
      <v-col md="1">
        <v-text-field
          v-model="state.folha"
          label="Folha"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col md="3">
        <v-autocomplete
          v-model="state.situacao"
          :items="situacaoItems"
          label="Situação"
        ></v-autocomplete>
      </v-col>
      <v-col md="2">
        <v-autocomplete
          :items="usuariosItems"
          v-model="state.usuario_token"
          item-title="user_nome"
          item-value="user_token"
          label="Usuario"
        ></v-autocomplete>
      </v-col>
      <v-col md="1">
        <v-text-field v-model="state.selo" label="Selo"></v-text-field>
      </v-col>
      <v-col md="3">
        <v-autocomplete
          v-model="state.ato_tipo_token"
          :items="tipoAtosItems"
          item-title="descricao"
          item-value="token"
          label="Serviço"
        ></v-autocomplete>
      </v-col>
      <v-col md="2">
        <v-text-field
          v-model="state.apresentante"
          label="Apresentante"
        ></v-text-field>
      </v-col>
      <v-col>
        <div>
          <img
            @click="searchOrdersService"
            style="width: 40px; height: 40px; cursor: pointer"
            src="../../../assets/visualizar.png"
            alt="Pesquisar"
          />
        </div>
      </v-col>
    </v-row>
    <hr class="mt-5 mb-5" />
    <v-data-table :headers="headers" :items="servicosItems" item-key="id" >
      <template v-slot:item.actions="{ item }">
        <v-row style="display: flex; gap: 4px; margin-top: -5px">
          <div
            :class="{ disabled: !item.btn_receber }"
            :title="item.btn_receber ? 'Receber' : 'Bloqueado'"
            @click="
              item.btn_receber ? redirectToRecebimento(item.numero, item) : null
            "
            title="Receber"
          >
            <img
              :style="{
                cursor: item.btn_receber ? 'pointer' : 'default',
                width: '30px',
                height: '30px',
              }"
              src="../../../assets/recebe.png"
              alt="Receber"
            />
          </div>

          <div
            :class="{ disabled: !item.btn_editar }"
            @click="item.btn_editar ? redirectToUpdate(item.id) : null"
            :title="item.btn_editar ? 'Editar' : 'Bloqueado'"
          >
            <img
              :style="{
                cursor: item.btn_editar ? 'pointer' : 'default',
                width: '30px',
                height: '30px',
              }"
              src="../../../assets/editar.png"
              alt="Editar"
            />
          </div>

          <div
            :disabled="!item.btn_cancelar"
            @click="
              item.btn_cancelar
                ? redirectToCancelamento(item)
                : null
            "
            title="Cancelamento"
          >
            <img
              v-if="item.excluido"
              style="width: 30px; height: 30px"
              src="../../../assets/excluido.png"
              alt="Visualizar"
              title="Bloqueado"
            />
            <img
              v-else
              src="../../../assets/mudarStatus.png"
              alt="Cancelamento"
              class="trash-icon"
              style="width: 30px; height: 30px; cursor: pointer"
              title="Cancelamento"
            />
          </div>
        </v-row>
      </template>
    </v-data-table>
    <RecebimentoOrdem
      :show="isModalRecebimentoOpen"
      :numero_os="numero_os"
      :ordem="selectedOrder"
      @close="isModalRecebimentoOpen = false"
      @refresh-value="servicosDataTable()"
    />
    <CancelamentoOrdem
      :show="isModalCancelamentoOpen"
      :numero_os="numero_os"
      :ordemserv_token="ordemserv_token"
      @close="isModalCancelamentoOpen = false"
    />
  </v-container>
</template>

<script setup>
const config = useRuntimeConfig();
const { $toast } = useNuxtApp();
const allUsuarios = `${config.public.managemant}/listarUsuarios`;
const allServicos = `${config.public.managemant}/listarOrdensServico`;
const allTiposAtos = `${config.public.managemant}/tipoAtos`;

const router = useRouter();

const usuario_token = ref(useCookie("auth_token").value) || null;
const cartorio_token = ref(useCookie("user-data").value.cartorio_token) || null;
const servicosItems = ref([]);
const usuariosItems = ref([]);
const tipoAtosItems = ref([]);
const situacaoItems = ref(["PENDENTE", "EM ANDAMENTO", "CONCLUÍDA", "LAVRADA"]);
const isModalRecebimentoOpen = ref(false);
const isModalCancelamentoOpen = ref(false);
const showCreateOrdemServ = ref(null);
const ordemserv_token = ref(null);
const numero_os = ref(null);
const selectedOrder = ref({});

const state = reactive({
  numero: null,
  data_inicio: null || getCurrentDate(),
  data_fim: null || getCurrentDate(),
  data_lavratura_inicio: null,
  data_lavratura_fim: null,
  protocolo: null,
  livro: null,
  folha: null,
  situacao: null,
  usuario_token: null || usuario_token.value,
  selo: null,
  ato_tipo_token: null,
  apresentante: null,
});

const headers = [
  { title: "Data Recebimento", value: "data" , width: "140px"},
  { title: "Número", value: "numero" , width: "120px"},
  { title: "Situação", value: "situacao" , width: "120px"},
  { title: "CPF", value: "apresentante_cpf", width: "120px" },
  { title: "Apresentante", value: "apresentante_nome", width: "120px" },
  { title: "Usuario", value: "usuario_nome", width: "120px" },
  { title: "Valor", value: "valor", width: "100px" },
  { title: "A Receber", value: "valor_a_receber", width: "100px" },
  {
    value: "actions",
  },
];

function getCurrentDate() {
  const today = new Date();
  const yyyy = today.getFullYear();
  const MM = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");
  return `${yyyy}-${MM}-${dd}`;
}

async function usuariosDataPayload() {
  const { data: usuarioData } = await useFetch(allUsuarios, {
    method: "POST",
    body: {
      cartorio_token: cartorio_token.value,
    },
  });
  usuariosItems.value = usuarioData.value;
}

async function searchOrdersService() {
  try {
    sessionStorage.setItem("pesquisaOS", JSON.stringify(state));

    const { data: servicosData, error } = await useFetch(allServicos, {
      method: "POST",
      body: {
        cartorio_token: cartorio_token.value,
        numero: state.numero || null,
        data_inicio: state.data_inicio || null,
        data_fim: state.data_fim || null,
        data_lavratura_inicio: state.data_lavratura_inicio || null,
        data_lavratura_fim: state.data_lavratura_fim || null,
        protocolo: state.protocolo || null,
        livro: state.livro || null,
        folha: state.folha || null,
        situacao: state.situacao || null,
        usuario_token: state.usuario_token,
        selo: state.selo || null,
        ato_tipo_token: state.ato_tipo_token,
        apresentante: state.apresentante || null,
      },
    });
    if (servicosData.value.length > 0) {
      servicosItems.value = servicosData.value.map((item) => {
        return {
          ...item,
          data: item.data ? formatDate(item.data, "dd/mm/yyyy") : null,
        };
      });
    } else {
      servicosItems.value = [];
      $toast.error("Não existe Ordem de Serviço Registrada!")
    }
  } catch (error) {
    console.error("Erro na requisição", error);
  }
}

async function tipoAtosDataPayload() {
  const { data: tipoAtosData, error } = await useFetch(allTiposAtos, {
    method: "POST",
    body: {
      cartorio_token: cartorio_token.value,
      usuario_token: usuario_token.value,
    },
  });
  tipoAtosItems.value = tipoAtosData.value;
}

const servicosDataTable = async () => {
  try {
    const currentDate = getCurrentDate();
    const pesquisaSalva = sessionStorage.getItem("pesquisaOS");
    const dadosRestaurados = JSON.parse(pesquisaSalva);
    const { data: servicosData, error } = await useFetch(allServicos, {
      method: "POST",
      body: {
        cartorio_token: cartorio_token.value,
        usuario_token: usuario_token.value,
        data_fim: dadosRestaurados?.data_fim || currentDate,
        data_inicio: dadosRestaurados?.data_inicio || currentDate,
      },
    });
    if (servicosData.value.length > 0) {
      servicosItems.value = servicosData.value.map((item) => {
        return {
          ...item,
          data: formatDate(item.data, "dd/mm/yyyy"),
        };
      });
    } else {
      servicosItems.value = [];
    }
  } catch (error) {
    console.error("Erro ao buscar serviços", error);
  }
};

function redirectToCancelamento(item) {
  numero_os.value = item.numero;
  ordemserv_token.value = item.token;
  isModalCancelamentoOpen.value = true;
}

function redirectToUpdate(id) {
  const serviceCookie = useCookie("user-service");
  const servico = servicosItems.value.find((item) => item.id === id);
  serviceCookie.value = serviceCookie.value = JSON.stringify({
    id: servico.id,
    token: servico.token,
  });

  router.push({ path: `/os/atualizar/${id}` });
}

function redirectToRecebimento(numero, item) {
  numero_os.value = numero;
  selectedOrder.value = {
    token: item.token,
    numero: item.numero,
    valor: item.valor,
    valor_pago: item.valor_pago,
  };
  isModalRecebimentoOpen.value = true;
}

const showCreateOrdem = () => {
  const serviceCookie = useCookie("user-service");
  const isTrueOrdemServ = useCookie("ordem-button");
  serviceCookie.value = null;
  showCreateOrdemServ.value = true;
  isTrueOrdemServ.value = showCreateOrdemServ.value;
};

usuariosDataPayload();
tipoAtosDataPayload();
onMounted(() => {
  nextTick(async () => {
    const pesquisaSalva = sessionStorage.getItem("pesquisaOS");

    if (pesquisaSalva) {
      const dadosRestaurados = JSON.parse(pesquisaSalva);
      Object.assign(state, dadosRestaurados);
    }

    await servicosDataTable();
  });
});
</script>
