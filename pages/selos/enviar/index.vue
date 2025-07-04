<template>
  <v-progress-circular
    class="d-flex justify-center align-center"
    indeterminate
    size="64"
    v-if="loading"
    style="position: absolute; top: 40%; left: 50%"
  ></v-progress-circular>
  <v-container class="mt-5">
    <v-row class="d-flex align-center">
      <v-col cols="12" md="2">
        <v-text-field
          v-model="filters.data_utilizacao"
          label="Data"
          variant="outlined"
          hide-details
          class="mb-4"
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="3">
        <v-text-field
          v-model="filters.descricao"
          label="Descrição"
          variant="outlined"
          hide-details
          class="mb-4"
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="2">
        <v-text-field
          v-model="filters.numero"
          label="Número"
          variant="outlined"
          hide-details
          class="mb-4"
        ></v-text-field>
      </v-col>
      <v-col>
        <img
          src="../../../assets/Btn-refresh.png"
          style="width: 40px; height: 40px; margin-top: -10px; cursor: pointer"
          @click="fetchSelos()"
        />
      </v-col>
      <v-col cols="12" md="3" class="d-flex justify-end mb-2">
        <v-btn
          color="green"
          size="large"
          @click="enviaSelo"
          :loading="loadingEnvio"
          :disabled="loadingEnvio"
        >
          <template v-slot:loader>
            <v-progress-circular
              indeterminate
              color="white"
              size="24"
            ></v-progress-circular>
          </template>
          Enviar Selos
        </v-btn>
      </v-col>
    </v-row>
    <v-data-table
      show-select
      density="compact"
      :headers="headers"
      :items="filteredSelos"
      item-key="token"
      item-value="token"
      v-model="selectedSelos"
      :items-per-page="50"
      :items-per-page-options="[50]"
    >
      <template v-slot:item.situacao="{ item }">
        <v-chip color="green" text-color="white" outlined>
          {{ item.situacao }}
        </v-chip>
      </template>
    </v-data-table>
  </v-container>
</template>

<script setup>
const config = useRuntimeConfig();
const { $toast } = useNuxtApp();
const getSelo = `${config.public.managemant}/lista_selos_transmitir`;
const integraSelos = `${config.public.managemant}/integra_selos`;
const enviaSelos = `${config.public.ws}/enviar_ato`;
const marcarSelos = `${config.public.managemant}/marcar_selos_enviado`;
const selectedSelos = ref([]);
const loadingEnvio = ref(false);
const selos = ref([]);
const loading = ref(false);

const filters = reactive({
  data_utilizacao: "",
  descricao: "",
  numero: "",
});

const headers = [
  { title: "Data", value: "data_utilizacao" },
  { title: "Descrição", value: "descricao" },
  { title: "Número", value: "numero" },
  { title: "Resultado", value: "resultado" },
];

const fetchSelos = async () => {
  loading.value = true;
  try {
    const { data, error, status } = await useFetch(getSelo, {
      method: "POST",
      body: { cartorio_token: useCookie("user-data").value.cartorio_token },
    });
    if (status.value === "success") {
      selos.value = Array.isArray(data.value)
        ? data.value.map((item) => ({
            ...item,
            data_utilizacao: item.data_utilizacao
              ? formatDate(item.data_utilizacao, "dd/mm/yyyy hh:mm")
              : null,
            resultado: null,
          }))
        : [];
    } else {
      console.error(error);
    }
  } catch (err) {
    console.error("Erro ao buscar selos:", err);
  } finally {
    loading.value = false;
  }
};

const enviaSelo = async () => {
  loadingEnvio.value = true;
  let erroEnvio = null;

  try {
    const selosJson = montarSelosJson();
    const dadosSelos = await buscarDadosSelos(selosJson);
    if (!dadosSelos) return;

    const respostaEnvio = await enviarSelosExternos(dadosSelos, (erro) => {
      erroEnvio = erro;
    });
    if (!respostaEnvio) return;

    atualizarResultadoSelos(respostaEnvio);
    selectedSelos.value = [];

    const marcado = await marcarSelosComoEnviados(erroEnvio || respostaEnvio);
    if (marcado) {
      $toast.success("Selos marcados como enviados com sucesso");
    } else {
      $toast.error("Erro ao marcar os selos como enviados");
    }
  } catch (err) {
    console.error("Erro ao enviar selos:", err);
    $toast.error("Erro inesperado ao enviar selos.");
  } finally {
    loadingEnvio.value = false;
  }
};

function montarSelosJson() {
  return selectedSelos.value.map((selo) => ({ selo_token: selo }));
}

async function buscarDadosSelos(selosJson) {
  const { data, error, status } = await useFetch(integraSelos, {
    method: "POST",
    body: selosJson,
    onResponseError({ response }) {
      const mensagemErro =
        response._data?.details || "Erro ao buscar lote de selos.";
      $toast.error(mensagemErro);
    },
  });
  if (status.value !== "success" || !data.value) {
    return null;
  }
  return data.value;
}

async function enviarSelosExternos(dadosSelos, setErroEnvio) {
  const { data, error, status } = await useFetch(enviaSelos, {
    method: "POST",
    body: {
      user: "56415451472",
      pass: "Ra961206",
      xmlData: dadosSelos,
    },
    onResponseError({ response }) {
      const mensagemErro = response._data?.result || "Erro ao enviar os selos.";
      const mensagemErroEnvio =
        response._data?.result?.[0]?.error || "Erro ao enviar os selos.";
      setErroEnvio(mensagemErro);
      $toast.error(mensagemErroEnvio);
    },
  });
  if (status.value !== "success" || !data.value) {
    return null;
  }
  return data.value;
}

function atualizarResultadoSelos(respostaEnvio) {
  respostaEnvio.forEach((retorno) => {
    const seloEncontrado = selos.value.find(
      (s) => s.token === retorno.selo_token
    );
    if (seloEncontrado) {
      seloEncontrado.resultado = retorno.details || "TRANSMITIDO";
    }
  });
}

async function marcarSelosComoEnviados(body) {
  const { status } = await useFetch(marcarSelos, {
    method: "PUT",
    body,
  });
  return status.value === "success";
}

const filteredSelos = computed(() => {
  return selos.value.filter((item) => {
    return (
      (!filters.data_utilizacao ||
        item.data_utilizacao
          .toLowerCase()
          .includes(filters.data_utilizacao.toLowerCase())) &&
      (!filters.numero ||
        item.numero.toLowerCase().includes(filters.numero.toLowerCase())) &&
      (!filters.descricao ||
        item.descricao.toLowerCase().includes(filters.descricao.toLowerCase()))
    );
  });
});

fetchSelos();
</script>
