<template>
  <v-container class="mt-5">
    <v-row class="mb-5">
      <h1>Atos</h1>
    </v-row>

    <v-row>
      <v-col cols="2">
        <v-text-field
          v-model="state.data_inicio"
          label="Abertura de"
          placeholder="dd/mm/yyyy"
          v-mask="'##/##/####'"
          dense
        ></v-text-field>
      </v-col>
      <v-col cols="2">
        <v-text-field
          v-model="state.data_fim"
          label="Abertura até"
          placeholder="dd/mm/yyyy"
          v-mask="'##/##/####'"
          dense
        ></v-text-field>
      </v-col>
      <v-col cols="2">
        <v-text-field
          v-model="state.data_lavratura_inicio"
          label="Lavratura de"
          placeholder="dd/mm/yyyy"
          v-mask="'##/##/####'"
          dense
        ></v-text-field>
      </v-col>
      <v-col cols="2">
        <v-text-field
          v-model="state.data_lavratura_fim"
          label="Lavratura até"
          placeholder="dd/mm/yyyy"
          v-mask="'##/##/####'"
          dense
        ></v-text-field>
      </v-col>
      <v-col cols="2">
        <v-text-field
          v-model="state.apresentante_cpf"
          label="CPF"
          v-mask="'###.###.###-##'"
          dense
        ></v-text-field>
      </v-col>
      <v-col cols="2">
        <v-text-field v-model="state.selo" label="Selo" dense></v-text-field>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="2">
        <v-text-field v-model="state.numero" label="N° OS"></v-text-field>
      </v-col>
      <v-col cols="2">
        <v-text-field
          v-model="state.protocolo"
          label="Protocolo"
        ></v-text-field>
      </v-col>
      <v-col cols="3">
        <v-text-field
          v-model="state.apresentante"
          label="Apresentante"
          dense
        ></v-text-field>
      </v-col>
      <v-col cols="3">
        <v-autocomplete
          v-model="state.ato_tipo_token"
          :items="tipoAtosItems"
          item-title="descricao"
          item-value="token"
          label="Tipo Serviço"
          dense
        ></v-autocomplete>
      </v-col>
      <v-col cols="2">
        <v-autocomplete
          :items="usuariosItems"
          v-model="state.usuario_token"
          item-title="user_nome"
          item-value="user_token"
          label="Usuário"
          dense
        ></v-autocomplete>
      </v-col>
      <v-col cols="3">
        <v-autocomplete
          v-model="state.situacao"
          :items="situacaoItems"
          label="Situação"
          dense
        ></v-autocomplete>
      </v-col>
      <v-col cols="1">
        <v-text-field v-model="state.livro" label="Livro" dense></v-text-field>
      </v-col>
      <v-col cols="1">
        <v-text-field v-model="state.folha" label="Folha" dense></v-text-field>
      </v-col>

      <v-col>
        <div>
          <img
            @click="searchAtos"
            style="width: 40px; height: 40px; cursor: pointer"
            src="../../../assets/visualizar.png"
            alt="Pesquisar"
          />
        </div>
      </v-col>
    </v-row>
  </v-container>
  <div style="width: 175vh; margin-left: 100px; overflow-x: auto">
    <hr class="mt-5 mb-5" />

    <v-data-table
      :headers="headers"
      :items="atos"
      style="font-size: 12px"
      item-key="id"
    >
      <template v-slot:item.actions="{ item }">
        <div style="display: flex; gap: 4px; justify-content: center">
          <div @click="redirectoToView(item)" title="Visualizar">
            <img
              style="width: 30px; height: 30px; cursor: pointer"
              src="../../../assets/visualizar.png"
              alt="Visualizar"
            />
          </div>
          <div
            @click="redirectToModalReimprimir(item.token)"
            title="Reimprimir"
          >
            <img
              style="width: 30px; height: 30px; cursor: pointer"
              src="../../../assets/selo.png"
              alt="Reimprimir"
            />
          </div>
          <div
            :class="{ disabled: !item.btn_editar }"
            @click="
              item.btn_editar
                ? redirectToUpdateAto({
                    id: item.id,
                    tipo: item.tipo,
                    token: item.token,
                    tipo_token: item.tipo_token,
                    usa_imoveis: item.usa_imoveis,
                  })
                : null
            "
            :title="item.btn_editar ? 'Editar' : 'Desabilitado'"
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
            @click="item.btn_cancelar ? deleteAto(item) : null"
            title="Excluir"
          >
            <img
              v-if="item.excluido"
              style="width: 30px; height: 30px; cursor: pointer"
              src="../../../assets/excluido.png"
              alt="Visualizar"
              title="Reativar"
            />
            <img
              v-else
              src="../../../assets/mudarStatus.png"
              alt="Excluir"
              class="trash-icon"
              style="width: 30px; height: 30px; cursor: pointer"
              title="Excluir"
            />
          </div>
        </div>
      </template>
    </v-data-table>
  </div>

  <ModalTiposAtos
    v-if="modalVisible"
    :show="modalVisible"
    :servicos="dadosData.servicos || []"
    :tiposAtos="dadosData.tiposAtos || []"
    @close="modalVisible = false"
    @updateAto="handleUpdateAto"
  />
  <ReimpressaoSelos
    :show="isModalReimprimirOpen"
    :ato_token="ato_token"
    @close="isModalReimprimirOpen = false"
  />
  <RecebimentoOrdem
    :show="isModalRecebimentoOpen"
    :numero_os="numero_os"
    :ordem="selectedOrder"
    @close="isModalRecebimentoOpen = false"
    @refresh-value="atosPayload()"
  />
  <CancelamentoOrdem
    :show="isModalCancelamentoOpen"
    :numero_os="numero_os"
    :ordemserv_token="ordemserv_token"
    @close="isModalCancelamentoOpen = false"
  />
</template>

<script setup>
const config = useRuntimeConfig();
const { $toast } = useNuxtApp();
const allUsuarios = `${config.public.managemant}/listarUsuarios`;
const allTiposAtos = `${config.public.managemant}/tipoAtos`;
const updateAto = `${config.public.managemant}/updateAtos`;
const pesquisaAtos = `${config.public.managemant}/pesquisaAtos`;

const router = useRouter();

const usuario_token = ref(useCookie("auth_token").value) || null;

const cartorio_token = ref(useCookie("user-data").value.cartorio_token) || null;

const modalVisible = ref(false);

const atos = ref([]);
const usuariosItems = ref([]);
const tipoAtosItems = ref([]);
const situacaoItems = ref(["PENDENTE", "EM ANDAMENTO", "CONCLUÍDA", "LAVRADA"]);
const isModalRecebimentoOpen = ref(false);
const isModalCancelamentoOpen = ref(false);
const showCreateOrdemServ = ref(null);
const ordemserv_token = ref(null);
const numero_os = ref(null);
const selectedOrder = ref({});
const isModalReimprimirOpen = ref(false);
const ato_token = ref(null);

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
  apresentante_cpf: null,
  apresentante_nome: null,
  valor: null,
});

const headers = [
  { title: "ID", value: "id" },
  { title: "Data Abertura", value: "dt_abertura" },
  { title: "Data lavratura", value: "dt_lavratura" },
  { title: "N° OS", value: "numero_os" },
  { title: "Protocolo", value: "protocolo" },
  { title: "Apresentante", value: "apresentante_nome" },
  { title: "CPF", value: "apresentante_cpf" },
  { title: "Tipo Serviço", value: "ato_servico" },
  { title: "Usuario", value: "usuario_nome" },
  { title: "Situação", value: "situacao" },
  { title: "Livro", value: "livro_numero" },
  { title: "Folha", value: "folha" },
  { title: "Valor", value: "valor" },
  { title: "Ações", value: "actions" },
];

function getCurrentDate() {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");
  return `${dd}-${mm}-${yyyy}`;
}

function convertToISODate(date) {
  if (!date) return null;
  const [dd, mm, yyyy] = date.split("/");
  return `${yyyy}-${mm}-${dd}`;
}

async function atosPayload() {
  const currentDate = getCurrentDate();
  const pesquisaSalva = sessionStorage.getItem("pesquisaAto");
  const dadosRestaurados = JSON.parse(pesquisaSalva);

  const { data: atosData } = await useFetch(pesquisaAtos, {
    method: "POST",
    body: {
      cartorio_token: useCookie("user-data").value.cartorio_token,
      usuario_token: dadosRestaurados.usuario_token || usuario_token.value,
      data_fim: convertToISODate(dadosRestaurados?.data_fim) || currentDate,
      data_inicio:
        convertToISODate(dadosRestaurados?.data_inicio) || currentDate,
    },
  });
  if (atosData.value.length > 0) {
    atos.value = atosData.value.map((item) => {
      return {
        ...item,
        dt_lavratura: formatDate(item.dt_lavratura, "dd/mm/yyyy"),
        dt_abertura: formatDate(item.dt_abertura, "dd/mm/yyyy"),
      };
    });
  }
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

async function searchAtos() {
  try {
    sessionStorage.setItem("pesquisaAto", JSON.stringify(state));

    const { data: atosData, error } = await useFetch(pesquisaAtos, {
      method: "POST",
      body: {
        cartorio_token: cartorio_token.value,
        numero: state.numero || null,
        data_inicio: convertToISODate(state.data_inicio) || null,
        data_fim: convertToISODate(state.data_fim) || null,
        data_lavratura_inicio:
          convertToISODate(state.data_lavratura_inicio) || null,
        data_lavratura_fim: convertToISODate(state.data_lavratura_fim) || null,
        protocolo: state.protocolo || null,
        livro: state.livro || null,
        folha: state.folha || null,
        situacao: state.situacao || null,
        usuario_token: state.usuario_token,
        selo: state.selo || null,
        ato_tipo_token: state.ato_tipo_token,
        apresentante: state.apresentante_nome || null,
      },
    });
    if (atosData.value.length > 0) {
      atos.value = atosData.value.map((item) => {
        return {
          ...item,
          dt_lavratura: item.data
            ? formatDate(item.dt_lavratura, "dd/mm/yyyy")
            : null,
          dt_abertura: item.dt_abertura
            ? formatDate(item.dt_abertura, "dd/mm/yyyy")
            : null,
        };
      });
    } else {
      atos.value = [];
      $toast.error("Não existe ato Registrado!");
    }
  } catch (error) {
    console.error("Erro na requisição", error);
  }
}

const redirectoToView = (item) => {
  router.push({
    path: `/fontes/atos/atos-com-bem/atualizar/${item.id}`,
    query: {
      origem: "vizualizar-lista",
      id: item.id,
      ato_id: item.id,
      tipo_ato_token: item.tipo_token,
      tipo_ato: item.ato_servico,
      ato_token_edit: item.token,
      numero_os: item.numero_os,
      usa_imoveis: true,
    },
  });
};

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

const redirectToModalReimprimir = (token) => {
  ato_token.value = token;
  isModalReimprimirOpen.value = true;
};

async function deleteAto(item) {
  item.excluido = !item.excluido;
  try {
    await fetchWithToken(`${updateAto}/${item.id}`, {
      method: "PUT",
      body: { excluido: item.excluido },
    });
  } catch (error) {
    console.error("Erro ao excluir pessoa:", error);
  }
}

const redirectToUpdateAto = (item) => {
  if (item.usa_imoveis || !item.usa_imoveis) {
    router.push({
      path: `/fontes/atos/atos-com-bem/atualizar/${item.id}`,
      query: {
        origem: "atualizar-lista",
        id: item.id,
        ato_id: item.id,
        tipo_ato_token: item.tipo_token,
        tipo_ato: item.tipo,
        ato_token_edit: item.token,
        numero_os: item.numero_os,
        usa_imoveis: true,
      },
    });
  }
};

const showCreateOrdem = () => {
  const serviceCookie = useCookie("user-service");
  const isTrueOrdemServ = useCookie("ordem-button");
  serviceCookie.value = null;
  showCreateOrdemServ.value = true;
  isTrueOrdemServ.value = showCreateOrdemServ.value;
};

onMounted(() => {
  nextTick(async () => {
    const pesquisaSalva = sessionStorage.getItem("pesquisaAto");

    if (pesquisaSalva) {
      const dadosRestaurados = JSON.parse(pesquisaSalva);
      Object.assign(state, dadosRestaurados);
    }

    await atosPayload();
  });
});

usuariosDataPayload();
tipoAtosDataPayload();
</script>

<style scoped>
.disabled {
  opacity: 0.5;
  pointer-events: none;
}
</style>
