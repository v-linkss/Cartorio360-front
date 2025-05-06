<template>
    <v-container class="mt-5" style="width: 100%">
      <v-row class="mb-5">
        <h1>Atos</h1>
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
          <v-text-field v-model="state.numero" label="Número OS"></v-text-field>
        </v-col>
        <v-col>
          <v-text-field
            v-model="state.data_inicio"
            label="Abertura de"
            placeholder="dd/mm/yyyy"
            v-mask="'##/##/####'"
            style="width: 150px"
          ></v-text-field>
        </v-col>
        <v-col>
          <v-text-field
            v-model="state.data_fim"
            label="Abertura até"
            placeholder="dd/mm/yyyy"
            v-mask="'##/##/####'"
            style="width: 150px"
          ></v-text-field>
        </v-col>
        <v-col>
          <v-text-field
            v-model="state.data_lavratura_inicio"
            label="Lavratura de"
            placeholder="dd/mm/yyyy"
            v-mask="'##/##/####'"
            style="width: 150px"
          ></v-text-field>
        </v-col>
        <v-col>
          <v-text-field
            v-model="state.data_lavratura_fim"
            label="Lavratura até"
            placeholder="dd/mm/yyyy"
            v-mask="'##/##/####'"
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
          <v-text-field v-model="state.livro" label="Livro"></v-text-field>
        </v-col>
        <v-col md="1">
          <v-text-field v-model="state.folha" label="Folha"></v-text-field>
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
      <v-data-table :headers="headers" style="min-width: 1230px;font-size:12px;" :items="servicosItems" item-key="id">
        <template v-slot:item.actions="{ item }">
          <v-row style="display: flex; gap: 2px; margin-top: -5px">
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
          </v-row>
        </template>
      </v-data-table>
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
  const updateAto = `${config.public.managemant}/updateAtos`;

  
  const router = useRouter();
  
  const usuario_token = ref(useCookie("auth_token").value) || null;
  const cartorio_token = ref(useCookie("user-data").value.cartorio_token) || null;
  const servicosItems = ref([
  {
    id: 1,
    dt_abertura: '2023-01-15',
    data: '2023-01-20',
    numero: 'OS-001',
    situacao: 'Finalizado',
    apresentante_cpf: '123.456.789-00',
    apresentante_nome: 'João Silva',
    usuario_nome: 'ADM'
  },
  {
    id: 2,
    dt_abertura: '2023-02-10',
    data: '2023-02-15',
    numero: 'OS-002',
    situacao: 'Em andamento',
    apresentante_cpf: '987.654.321-00',
    apresentante_nome: 'Maria Oliveira',
    usuario_nome: 'USER'
  },
  {
    id: 3,
    dt_abertura: '2023-03-05',
    data: null,
    numero: 'OS-003',
    situacao: 'Aguardando',
    apresentante_cpf: '456.789.123-00',
    apresentante_nome: 'Carlos Souza',
    usuario_nome: 'ADM'
  },
  {
    id: 4,
    dt_abertura: '2023-04-12',
    data: '2023-04-18',
    numero: 'OS-004',
    situacao: 'Finalizado',
    apresentante_cpf: '789.123.456-00',
    apresentante_nome: 'Ana Costa',
    usuario_nome: 'USER'
  },
  {
    id: 5,
    dt_abertura: '2023-05-20',
    data: null,
    numero: 'OS-005',
    situacao: 'Cancelado',
    apresentante_cpf: '321.654.987-00',
    apresentante_nome: 'Pedro Santos',
    usuario_nome: 'ADM'
  },
  {
    id: 6,
    dt_abertura: '2023-06-08',
    data: '2023-06-12',
    numero: 'OS-006',
    situacao: 'Finalizado',
    apresentante_cpf: '654.987.321-00',
    apresentante_nome: 'Juliana Lima',
    usuario_nome: 'USER'
  },
  {
    id: 7,
    dt_abertura: '2023-07-15',
    data: '2023-07-22',
    numero: 'OS-007',
    situacao: 'Finalizado',
    apresentante_cpf: '147.258.369-00',
    apresentante_nome: 'Marcos Oliveira',
    usuario_nome: 'ADM'
  },
  {
    id: 8,
    dt_abertura: '2023-08-30',
    data: null,
    numero: 'OS-008',
    situacao: 'Em andamento',
    apresentante_cpf: '258.369.147-00',
    apresentante_nome: 'Fernanda Silva',
    usuario_nome: 'USER'
  },
  {
    id: 9,
    dt_abertura: '2023-09-17',
    data: '2023-09-25',
    numero: 'OS-009',
    situacao: 'Finalizado',
    apresentante_cpf: '369.147.258-00',
    apresentante_nome: 'Ricardo Pereira',
    usuario_nome: 'ADM'
  },
  {
    id: 10,
    dt_abertura: '2023-10-05',
    data: null,
    numero: 'OS-010',
    situacao: 'Aguardando',
    apresentante_cpf: '951.753.852-00',
    apresentante_nome: 'Patricia Almeida',
    usuario_nome: 'USER'
  }
]);
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
    apresentante: null,
  });
  
  const headers = [
    { title: "ID", value: "id", width: "100px" },
    { title: "Data Abertura", value: "dt_abertura", width: "100px" },
    { title: "Data Recebimento", value: "data", width: "100px", },
    { title: "N° OS", value: "numero", width: "10px" },
    { title: "Situação", value: "situacao", width: "115px" },
    { title: "CPF", value: "apresentante_cpf", width: "100px" },
    { title: "Apresentante", value: "apresentante_nome", width: "228px" },
    { title: "Usuario", value: "usuario_nome", width: "30px" },
    {
      title: 'Ações', value: "actions",
    },
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
          apresentante: state.apresentante || null,
        },
      });
      if (servicosData.value.length > 0) {
        servicosItems.value = servicosData.value.map((item) => {
          return {
            ...item,
            data: item.data ? formatDate(item.data, "dd/mm/yyyy") : null,
            dt_abertura: item.dt_abertura
              ? formatDate(item.dt_abertura, "dd/mm/yyyy")
              : null, 
          };
        });
      } else {
        servicosItems.value = [];
        $toast.error("Não existe Ordem de Serviço Registrada!");
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
          usuario_token: dadosRestaurados.usuario_token || usuario_token.value,
          data_fim: convertToISODate(dadosRestaurados?.data_fim) || currentDate,
          data_inicio:
            convertToISODate(dadosRestaurados?.data_inicio) || currentDate,
        },
      });
      if (servicosData.value.length > 0) {
        servicosItems.value = servicosData.value.map((item) => {
          return {
            ...item,
            data: formatDate(item.data, "dd/mm/yyyy"),
            dt_abertura: formatDate(item.dt_abertura, "dd/mm/yyyy"),
          };
        });
      } else {
        servicosItems.value = [];
      }
    } catch (error) {
      console.error("Erro ao buscar serviços", error);
    }
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
        origem: "atualizar",
        id: id,
        ato_id: item.id,
        tipo_ato_token: item.tipo_token,
        tipo_ato: item.tipo,
        ato_token_edit: item.token,
        numero_os: numeroOs.value,
        usa_imoveis: item.usa_imoveis,
      },
    });
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

  const redirectToModalReimprimir = (token) => {
    ato_token.value = token;
    isModalReimprimirOpen.value = true;
  };

  </script>
  