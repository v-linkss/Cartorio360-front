<template>
  <v-card width="1300">
    <h1
      style="
        background-color: #f5f2f2;
        color: #525050;
        padding: 10px 0px 0px 20px;
      "
    >
      {{ id ? "Atualização de Pessoas" : "Cadastramento de Pessoas" }}
    </h1>
    <div style="background-color: #f5f2f2; padding: 20px 0px 20px 20px">
      <v-autocomplete
        v-model="state.tipo_pessoa"
        style="width: 200px"
        :items="pessoa_tipo"
        item-title="label"
        item-value="value"
        label="Tipo de pessoa"
        bg-color="#F6F6F6"
        disabled
      >
      </v-autocomplete>
    </div>
    <div v-if="loading" class="d-flex justify-center">
      <v-progress-circular
        indeterminate
        class="loading-spinner"
        size="64"
      ></v-progress-circular>
    </div>
    <div v-else>
      <v-tabs v-model="tab" bg-color="#f5f2f2">
        <v-tab value="dados">Dados</v-tab>
        <v-tab v-if="state.tipo_pessoa === 'FISICA'" value="documento"
          >Documentos</v-tab
        >
        <v-tab v-if="state.tipo_pessoa === 'JURIDICA'" value="representante"
          >Representantes</v-tab
        >
        <v-tab
          v-if="
            state.tipo_pessoa === 'JURIDICA' || state.tipo_pessoa === 'FISICA'
          "
          value="endereco"
          >Endereços</v-tab
        >
        <v-tab v-if="state.tipo_pessoa === 'FISICA'" value="biometria"
          >Biometria</v-tab
        >
        <v-tab
          v-if="
            state.tipo_pessoa === 'JURIDICA' || state.tipo_pessoa === 'FISICA'
          "
          value="restricao"
          >Restrições</v-tab
        >
      </v-tabs>
      <v-tabs-window v-model="tab">
        <v-tabs-window-item value="dados">
          <v-container v-if="state.tipo_pessoa === 'FISICA'">
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field v-model="state.nome" label="Nome"></v-text-field>
              </v-col>
              <v-col cols="12" md="4">
                <v-text-field
                  v-model="state.doc_identificacao"
                  label="CPF"
                  v-mask="'###.###.###-##'"
                ></v-text-field>
              </v-col>
              <v-col md="2">
                <v-select
                  label="Sexo"
                  v-model="state.tabvalores_sexo_id"
                  :items="sexoItemsData"
                  item-title="descricao"
                  item-value="id"
                ></v-select>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="4">
                <v-autocomplete
                  v-model="state.tabvalores_estadocivil_id"
                  :items="estadoCivilItemsData"
                  item-title="descricao"
                  item-value="id"
                  label="Estado Civil"
                >
                </v-autocomplete>
              </v-col>
              <v-col cols="12" md="4">
                <v-text-field
                  v-model="state.profissao"
                  label="Profissão"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="4">
                <v-text-field
                  v-model="state.local_trabalho"
                  label="Local de trabalho"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="4">
                <v-text-field
                  v-model="state.data_nascimento"
                  label="Data de nascimento"
                  placeholder="dd/mm/yyyy"
                  v-mask="'##/##/####'"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="4">
                <v-autocomplete
                  v-model="state.tabvalores_capacidadecivil_id"
                  :items="capacidadeCivilItemsData"
                  label="Capacidade Civil"
                  item-title="descricao"
                  item-value="id"
                ></v-autocomplete>
              </v-col>
              <v-col cols="12" md="4">
                <v-autocomplete
                  v-model="state.cidade_natural_id"
                  :items="cidadeNascimentoItemsData"
                  label="Cidade de nascimento"
                  item-title="descricao"
                  item-value="id"
                ></v-autocomplete>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="4">
                <v-text-field
                  v-model.date="state.cpf_pai"
                  label="CPF do Pai"
                  v-mask="'###.###.###-##'"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="4">
                <v-text-field
                  v-model.date="state.nome_pai"
                  label="Nome do Pai"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="4">
                <v-text-field
                  v-model.date="state.cpf_mae"
                  label="CPF da Mãe"
                  v-mask="'###.###.###-##'"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="4">
                <v-text-field
                  v-model.date="state.nome_mae"
                  label="Nome da Mãe"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row class="mb-3">
              <NuxtLink to="/pessoas/lista">
                <v-btn size="large" color="red">Voltar</v-btn>
              </NuxtLink>
              <v-btn @click="onUpdate()" class="ml-4" size="large" color="green"
                >Salvar</v-btn
              >
            </v-row>
          </v-container>
          <DadosJuridica v-else-if="state.tipo_pessoa === 'JURIDICA'" />
        </v-tabs-window-item>
        <v-tabs-window-item value="documento">
          <Documentos />
        </v-tabs-window-item>
        <v-tabs-window-item value="representante">
          <PessoasCadastrosRepresentantes />
        </v-tabs-window-item>
        <v-tabs-window-item value="endereco">
          <Endereco />
        </v-tabs-window-item>
        <v-tabs-window-item value="biometria">
          <v-container class="mt-5">
            <Biometria :link-ficha="link_ficha"/>
          </v-container>
        </v-tabs-window-item>
        <v-tabs-window-item value="restricao">
          <Restricoes />
        </v-tabs-window-item>
      </v-tabs-window>
    </div>
  </v-card>
</template>

<script setup>
const tab = ref(null);
const emit = defineEmits(["saved"]);
const router = useRouter();
const { $toast } = useNuxtApp();

const route = useRoute();
const { id } = route.params;

const config = useRuntimeConfig();
const updatePessoa = `${config.public.auth}/service/gerencia/updatePessoa`;
const estadoCivil = `${config.public.auth}/service/gerencia/listarEstadoCivil`;
const capacidadeCivil = `${config.public.auth}/service/gerencia/listarCapacidadeCivil`;
const cidades = `${config.public.auth}/service/gerencia/listarCidades`;
const buscarPessoa = `${config.public.auth}/service/gerencia/getPessoaById`;
const sexo = `${config.public.auth}/service/gerencia/listarSexo`;

const estadoCivilItemsData = ref([]);
const capacidadeCivilItemsData = ref([]);
const cidadeNascimentoItemsData = ref([]);
const sexoItemsData = ref([]);
const loading = ref(true);
const link_ficha=ref(null)

const initialState = {
  nome: null,
  nome_pai: null,
  nome_mae: null,
  profissao: null,
  data_nascimento: null,
  doc_identificacao: null,
  cpf_pai: null,
  cpf_mae: null,
  tipo_pessoa: "FISICA",
  tabvalores_estadocivil_id: null,
  tabvalores_capacidadecivil_id: null,
  cidade_natural_id: null,
  tabvalores_sexo_id: null,
  cartorio_id: useCookie("user-data").value.cartorio_id,
  user_id: useCookie("user-data").value.usuario_id,
};

const pessoa_tipo = [
  { label: "FÍSICA", value: "FISICA" },
  { label: "JURÍDICA", value: "JURIDICA" },
  { label: "ESTRANGEIRA", value: "ESTRANGEIRA" },
];

const state = reactive({
  ...initialState,
});

function removeFormatting(value) {
  if (value) {
    return value.replace(/[.\-]/g, "");
  } else {
    value = null;
  }
}

async function loadPessoaData() {
  try {
    const [
      estadoCivilItems,
      capacidadeCivilItems,
      cidadeNascimentoItems,
      pessoa,
      sexoItems,
    ] = await Promise.all([
      $fetchWithToken(estadoCivil),
      $fetchWithToken(capacidadeCivil),
      $fetchWithToken(cidades),
      $fetchWithToken(`${buscarPessoa}/${id}`),
      $fetchWithToken(sexo),
    ]);

    const pessoa_token = useCookie("pessoa_token");
    pessoa_token.value = pessoa.token;

    estadoCivilItemsData.value = estadoCivilItems;
    capacidadeCivilItemsData.value = capacidadeCivilItems;
    cidadeNascimentoItemsData.value = cidadeNascimentoItems;
    sexoItemsData.value = sexoItems;
    if (pessoa.data_nascimento) {
      pessoa.data_nascimento = formatDate(pessoa.data_nascimento, "dd/mm/yyyy");
    }
    link_ficha.value = pessoa.link_ficha
    Object.assign(state, pessoa);
  } catch (error) {
    console.error("Erro ao carregar os dados da pessoa:", error);
  } finally {
    loading.value = false; // Finaliza o estado de carregamento
  }
}

// Chamando a função para carregar dados quando o componente é montado
onMounted(() => {
  if (id) {
    loadPessoaData();
  } else {
    loading.value = false; // Caso não tenha ID, finaliza o carregamento
  }
});

function formatPayload(payload) {
  const formattedPayload = {};
  for (const key in payload) {
    switch (key) {
      case "doc_identificacao":
      case "cpf_pai":
      case "cpf_mae":
        formattedPayload[key] = removeFormatting(payload[key]);
        break;
      case "data_nascimento":
        formattedPayload[key] = formatToISO(payload[key]); 
        break;
      default:
        formattedPayload[key] = payload[key] === "" ? null : payload[key];
        break;
    }
  }
  return formattedPayload;
}

async function onUpdate() {
  const payloadFormated = formatPayload(state);
  const { data, error } = await fetchWithToken(`${updatePessoa}/${id}`, {
    method: "PUT",
    body: payloadFormated,
  });
  $toast.success("Pessoa atualizada com sucesso!");
  router.push("/pessoas/lista");
}
</script>

<style scoped>
.btn-pointer {
  width: 50px;
  height: 50px;
  margin-left: 25px;
  margin-top: 20px;
  cursor: pointer;
}
</style>
