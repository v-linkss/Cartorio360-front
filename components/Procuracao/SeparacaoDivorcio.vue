<template>
  <v-container class="mt-5">
    <v-row dense>
      <v-col cols="12" sm="4" md="3">
        <v-text-field v-model="atos.dt_casamento" type="date" label="Data Casamento"></v-text-field>
      </v-col>

      <v-col cols="12" sm="6" md="4">
        <v-autocomplete label="Regime Bens" v-model="atos.tabvalores_regimecasamento_id" :items="combolistRegimeBens"
          item-title="descricao" item-value="id" required></v-autocomplete>
      </v-col>

      <v-col cols="12" sm="6" md="3">
        <v-text-field label="Filhos Maiores" v-model.number="atos.qtd_filhos_maiores" type="number" min="0"
          @keydown="blockNonNumeric"></v-text-field>
      </v-col>

      <v-col cols="12" sm="6" md="3">
        <v-text-field label="Filhos Menores" v-model="atos.qtd_filhos_menores" type="number" min="0"
          @keydown="blockNonNumeric"></v-text-field>
      </v-col>

      <v-col cols="12" sm="6" md="4">
        <v-autocomplete label="Responsável" v-model="atos.responsavel_menores_id" :items="combolistResponsavel"
          item-title="nome" item-value="id" required></v-autocomplete>
      </v-col>
    </v-row>

    <v-row class="mt-5" justify="start" align="center">
      <v-col cols="auto">
        <NuxtLink @click="goBack">
          <v-btn size="large" color="red">Voltar</v-btn>
        </NuxtLink>
      </v-col>
      <v-col cols="auto">
        <v-btn class="ml-2" @click="onUpdate" size="large" color="green">Salvar</v-btn>
      </v-col>
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
  tabEvent: {
    type: Number,
    default: 0,
  },
});
const config = useRuntimeConfig();
const atos = reactive({
  dt_casamento: null,
  tabvalores_regimecasamento_id: null,
  qtd_filhos_maiores: null,
  qtd_filhos_menores: null,
  responsavel_menores_id: null,
});
const combolistRegimeBens = ref([]);

const router = useRouter();
const route = useRoute();
const { $toast } = useNuxtApp();
const regimeBens = `${config.public.auth}/service/gerencia/regime_casamento`;
const getAtosPessoa = `${config.public.auth}/service/gerencia/getAtosPessoaById/${props.ato_id}`;
const updateAtos = `${config.public.managemant}/updateAtos`;

const { data: regimeBensData } = await fetchWithToken(regimeBens, {
  method: "GET",
});

async function fetchAtosPessoa() {
  const { data: responsavelFilhos } = await fetchWithToken(getAtosPessoa, {
    method: "GET",
  });
  if (responsavelFilhos.value) {
    rawResponsavelFilhos.value = responsavelFilhos.value;
  }
}

const rawResponsavelFilhos = ref([]);
// O array "rawResponsavelFilhos" é preenchido pela função fetchAtosPessoa, que faz uma requisição GET para o endpoint getAtosPessoa.


const combolistResponsavel = computed(
  () =>
    rawResponsavelFilhos.value?.map((parte) => ({
      id: parte.pessoa_id,
      nome: parte.pessoa?.nome || "Sem nome",
    })) || []
);

if (regimeBensData.value) {
  combolistRegimeBens.value = regimeBensData.value;
}

const goBack = () => {
  const origem = route.query.origem || "criar";
  const id = route.query.id;
  switch (origem) {
    case "atualizar":
    case "vizualizar":
      router.push(`/os/atualizar/${id}`);
      break;
    case "atualizar-lista":
    case "vizualizar-lista":
      router.push("/atos/lista");
      break;
    default:
      router.push("/os/criar-registro");
      break;
  }
};
async function onUpdate() {
  const { data, error, status } = await useFetch(
    `${updateAtos}/${Number.parseInt(props.ato_id)}`,
    {
      method: "PUT",
      body: {
        dt_casamento: atos.dt_casamento,
        tabvalores_regimecasamento_id: atos.tabvalores_regimecasamento_id,
        qtd_filhos_maiores: Number(atos.qtd_filhos_maiores),
        qtd_filhos_menores: Number(atos.qtd_filhos_menores),
        responsavel_menores_id: atos.responsavel_menores_id,
      },
    }
  );
  if (status.value === "success") {
    $toast.success("Divórcio salvo com sucesso");
  }
}


watch(
  () => props.tabEvent,
  async () => {
    await fetchAtosPessoa()
  },
  { immediate: true }  // traz os dados já na primeira montagem
);



const blockNonNumeric = (e) => {
  const allowedKeys = ["Backspace", "Tab", "ArrowLeft", "ArrowRight", "Delete"];

  if (!/[0-9]/.test(e.key) && !allowedKeys.includes(e.key)) {
    e.preventDefault();
  }
};
</script>
