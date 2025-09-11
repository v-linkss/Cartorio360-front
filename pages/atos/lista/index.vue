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
        <v-text-field v-model="state.numero" label="N° OS"></v-text-field>
      </v-col>

      <v-col cols="2">
        <v-text-field v-model="state.selo" label="Selo" dense></v-text-field>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="2">
        <v-text-field
          v-model="state.protocolo"
          label="Protocolo"
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

      <v-col cols="3">
        <v-text-field v-model="state.parte" label="Parte" dense></v-text-field>
      </v-col>
      <v-col cols="3">
        <v-autocomplete
          v-model="state.ato_tipo_token"
          :items="tipoAtosItems"
          item-value="token"
          item-title="descricao"
          label="Tipo Serviço"
          :menu-props="{
            maxWidth: '680px',
            width: '680px',
          }"
          dense
        >
        </v-autocomplete>
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
  <div style="width: 1300px; margin: 0 auto">
    <hr class="mt-5 mb-5" />

    <v-data-table
      :headers="headers"
      :items="atos"
      style="font-size: 12px"
      item-key="id"
    >
      <template v-slot:item.actions="{ item }">
        {{ item.token }}
        <div style="display: flex; gap: 4px; justify-content: center">
          <div
            @click="
              redirectToView({
                id: item.id,
                tipo: `${item.tipo_servico} - ${item.tipo_ato}`,
                token: item.token,
                tipo_token: item.tipo_token,
                rota: item.rota,
                numero_os: item.numero_os,
              })
            "
            title="Visualizar"
          >
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
                    tipo: `${item.tipo_servico} - ${item.tipo_ato}`,
                    token: item.token,
                    tipo_token: item.tipo_token,
                    rota: item.rota,
                    numero_os: item.numero_os,
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
            @click="item.btn_cancelar ? cancelaAto(item.token) : null"
            title="Excluir"
          >
            <img
              style="width: 30px; height: 30px; cursor: pointer"
              src="../../../assets/btn_cancela_lavratura.png"
              alt="Cancelar"
              title="Cancelar"
            />
          </div>
          <div @click="digitalizeDocument(item.token)">
            <img
              style="width: 30px; height: 30px; cursor: pointer"
              src="../../../assets/escanear.png"
              alt="escanear"
              title="escanear"
            />
          </div>
          <div @click="deleteAto(item)" title="Excluir">
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
  <ModalConfirmacao
    :show="isModalCancelamentoOpen"
    :condMessage="condMessage"
    @close="isModalCancelamentoOpen = false"
    @confirm="cancelaAto"
  />
</template>

<script setup>
const config = useRuntimeConfig();
const { $toast } = useNuxtApp();
const allUsuarios = `${config.public.managemant}/listarUsuarios`;
const allTiposAtos = `${config.public.managemant}/listar_tipo_atos`;
const cancelaLavratura = `${config.public.managemant}/cancela_lavratura`;
const acionarScanner = `${config.public.biometria}/run-scanner?format=pdf`;
const viewDoc = `${config.public.envioDoc}/upload`;
const updateAto = `${config.public.managemant}/updateAtos`;
const pesquisaAtos = `${config.public.managemant}/pesquisaAtos`;

const { redirectTo } = useRedirectTo();

const usuario_token = ref(useCookie("auth_token").value) || null;
const cartorio_token = ref(useCookie("user-data").value.cartorio_token) || null;

const modalVisible = ref(false);

const atos = ref([]);
const usuariosItems = ref([]);
const tipoAtosItems = ref([]);
const situacaoItems = ref(["PENDENTE", "EM ANDAMENTO", "CONCLUÍDA", "LAVRADA"]);
const isModalRecebimentoOpen = ref(false);
const isModalCancelamentoOpen = ref(false);
const condMessage = ref("");
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
  parte: null,
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
  {
    title: "ID/Protocolo",
    key: "protocoloId",
    width: "70px",
    value: (item) =>
      item.protocolo ? `${item.id}\n${item.protocolo}` : `${item.id}`,
    cellProps: {
      style: {
        whiteSpace: "pre-line",
        lineHeight: "2",
      },
    },
  },
  {
    title: "Abertura/CPF",
    key: "aberturaCpf",
    value: (item) =>
      item.dt_abertura
        ? `${item.dt_abertura}\n${item.apresentante_cpf}`
        : `${item.apresentante_cpf}`,
    cellProps: {
      style: {
        whiteSpace: "pre-line",
        lineHeight: "2",
      },
    },
  },
  {
    title: "Data lavratura/Parte",
    key: "lavraturaNome",
    value: (item) =>
      item.dt_lavratura
        ? `${item.dt_lavratura}\n${item.apresentante_nome}`
        : `${item.apresentante_nome}`,
    cellProps: {
      style: {
        whiteSpace: "pre-line",
        lineHeight: "2",
      },
    },
  },
  { title: "N° OS", value: "numero_os" },
  { title: "Usuario", value: "usuario_nome" },
  {
    title: "Situação/Serviço",
    key: "situacaoServico",
    value: (item) =>
      item.situacao
        ? `${item.situacao}\n${item.ato_servico}`
        : `${item.ato_servico}`,
    cellProps: {
      style: {
        whiteSpace: "pre-line",
        lineHeight: "2",
      },
    },
  },
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
  const pesquisaSalva = sessionStorage.getItem("pesquisaAto");
  const dadosRestaurados = JSON.parse(pesquisaSalva);

  const { data: atosData } = await useFetch(pesquisaAtos, {
    method: "POST",
    body: {
      cartorio_token: useCookie("user-data").value.cartorio_token,
      usuario_token: dadosRestaurados.usuario_token || usuario_token.value,
      data_fim: convertToISODate(dadosRestaurados?.data_fim),
      data_inicio: convertToISODate(dadosRestaurados?.data_inicio),
    },
  });
  if (atosData.value.length > 0) {
    atos.value = atosData.value.map((item) => {
      return {
        ...item,
        dt_lavratura: item.dt_lavratura
          ? formatDate(item.dt_lavratura, "dd/mm/yyyy hh:mm")
          : null,
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

    const { data: atosData } = await useFetch(pesquisaAtos, {
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
        parte: state.parte || null,
      },
    });
    if (atosData.value.length > 0) {
      atos.value = atosData.value.map((item) => {
        return {
          ...item,
          dt_lavratura: item.dt_lavratura
            ? formatDate(item.dt_lavratura, "dd/mm/yyyy hh:mm")
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

const redirectToView = (item) => {
  redirectTo({
    item,
    id: item.id,
    numeroOs: item.numero_os,
    origem: "vizualizar-lista",
  });
};

async function tipoAtosDataPayload() {
  const { data: tipoAtosData, error } = await useFetch(allTiposAtos, {
    method: "POST",
    body: {
      cartorio_token: cartorio_token.value,
      usuario_token: usuario_token.value,
      tipo_retorno: "servico_ato",
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

const cancelaAto = async (ato_token) => {
  const { data, status } = await useFetch(cancelaLavratura, {
    method: "POST",
    body: {
      ato_token: ato_token,
      user_token: usuario_token.value,
      cancelar_selo: false,
    },
  });
  if (status.value === "success" && data.value[0].status === "OK") {
    $toast.success("Lavratura cancelada com sucesso!");
  } else if (data.value[0].status === "ERRO") {
    isModalCancelamentoOpen.value = true;
    condMessage.value = data.value[0].status_mensagem;
  }
};

const redirectToUpdateAto = (item) => {
  redirectTo({
    item,
    id: item.id,
    numeroOs: item.numero_os,
    origem: "atualizar-lista",
  });
};

const digitalizeDocument = async (token) => {
  try {
    await openScanner();
    await enviarArquivo(token);
  } catch (error) {
    console.error("Erro ao executar scanner ou listar arquivos:", error);
  }
};

async function enviarArquivo(ato_token) {
  try {
    const { status, data } = await useFetch(viewDoc, {
      method: "POST",
      body: {
        tipo: "ato_livro",
        token: ato_token,
        cartorio_token: useCookie("user-data").value.cartorio_token,
      },
    });
    if (status.value === "success") {
      $toast.success("Arquivo enviado com sucesso!");
    }
  } catch (error) {
    $toast.error(error);
    console.error("Erro ao enviar o arquivo:", error);
  }
}

async function openScanner() {
  try {
    const { data } = await useFetch(acionarScanner, { method: "GET" });
  } catch (error) {
    $toast.error("Erro ao acionar o scanner:", error);
  }
}

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
