<template>
  <v-container class="mt-5">
    <v-row dense>
      <v-col cols="12" sm="4" md="3">
        <v-text-field v-model="atos.dt_casamento" type="date" label="Data Casamento"></v-text-field>
      </v-col>

      <v-col cols="12" sm="6" md="4">
<<<<<<< HEAD
        <v-autocomplete label="Regime Bens" v-model="atos.tabvalores_regimecasamento_id" :items="combolistRegimeBens"
          item-title="descricao" item-value="id" required></v-autocomplete>
=======
        <v-autocomplete v-if="combolistRegimeBens.length" label="Regime Bens"
          v-model="atos.tabvalores_regimecasamento_id" :items="combolistRegimeBens" item-title="descricao"
          item-value="id" required></v-autocomplete>
>>>>>>> fix/divorcio
      </v-col>

      <v-col cols="12" sm="6" md="3">
        <v-text-field label="Filhos Maiores" v-model.number="atos.qtd_filhos_maiores" type="number" min="0"
          @keydown="blockNonNumeric"></v-text-field>
      </v-col>

      <v-col cols="12" sm="6" md="3">
<<<<<<< HEAD
        <v-text-field label="Filhos Menores" v-model="atos.qtd_filhos_menores" type="number" min="0"
=======
        <v-text-field label="Filhos Menores" v-model.number="atos.qtd_filhos_menores" type="number" min="0"
>>>>>>> fix/divorcio
          @keydown="blockNonNumeric"></v-text-field>
      </v-col>

      <v-col cols="12" sm="6" md="4">
<<<<<<< HEAD
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
const config = useRuntimeConfig();
const atos = reactive({
  dt_casamento: null,
  tabvalores_regimecasamento_id: null,
  qtd_filhos_maiores: null,
  qtd_filhos_menores: null,
  responsavel_menores_id: null,
});
const combolistRegimeBens = ref([]);

const props = defineProps({
  tabEvent: {
    type: Number,
    default: 0,
  },
});

const router = useRouter();
const route = useRoute();
const { $toast } = useNuxtApp();
const getAtos = `${config.public.auth}/service/gerencia/getAtos/${route.query.ato_id}`;
const regimeBens = `${config.public.auth}/service/gerencia/regime_casamento`;
const getAtosPessoa = `${config.public.auth}/service/gerencia/getAtosPessoaById/${route.query.ato_id}`;
const updateAtos = `${config.public.managemant}/updateAtos`;

const fetchAtosData = async () => {
  const { data: atosData, status } = await fetchWithToken(getAtos, {
    method: "GET",
  });
  if (atosData.value) {
    atos.dt_casamento = atosData.value[0].dt_casamento;
    atos.tabvalores_regimecasamento_id =
      atosData.value[0].tabvalores_regimecasamento_id;
    atos.qtd_filhos_maiores = atosData.value[0].qtd_filhos_maiores;
    atos.qtd_filhos_menores = atosData.value[0].qtd_filhos_menores;
    atos.responsavel_menores_id = atosData.value[0].responsavel_menores_id;
  }
};

const { data: regimeBensData } = await fetchWithToken(regimeBens, {
  method: "GET",
});

const rawResponsavelFilhos = ref([]);

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

async function fetchAtosPessoa() {
  const { data: responsavelFilhos } = await fetchWithToken(getAtosPessoa, {
    method: "GET",
  });
  if (responsavelFilhos.value) {
    rawResponsavelFilhos.value = responsavelFilhos.value;
  }
}

=======
        <v-autocomplete @focus="reloadResponsaveis" v-if="combolistResponsavel.length" label="Responsável"
          v-model="atos.responsavel_menores_id" :items="combolistResponsavel" item-title="nome" item-value="id"
          required></v-autocomplete>
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
const getAtos = `${config.public.auth}/service/gerencia/getAtos/${route.query.ato_id}`;
const regimeBens = `${config.public.auth}/service/gerencia/regime_casamento`;
const getAtosPessoa = `${config.public.auth}/service/gerencia/getAtosPessoaById/${route.query.ato_id}`;
const updateAtos = `${config.public.managemant}/updateAtos`;
const search = ref("");
const searchMatricula = ref("");
const isModalCadastroImoveisOpen = ref(false);
const isModalAtualizarImoveisOpen = ref(false);
const idImovel = ref(null);
// onMounted(async () => {
//   const { data: atosData, status } = await fetchWithToken(getAtos, {
//     method: "GET",
//   });

//   if (atosData.value) {
//     atos.dt_casamento = atosData.value[0]?.dt_casamento;
//     atos.tabvalores_regimecasamento_id = atosData.value[0]?.tabvalores_regimecasamento_id;
//     atos.qtd_filhos_maiores = atosData.value[0]?.qtd_filhos_maiores;
//     atos.qtd_filhos_menores = atosData.value[0]?.qtd_filhos_menores;
//     atos.responsavel_menores_id = atosData.value[0]?.responsavel_menores_id;
//   }
// })
onMounted(async () => {
  const [atosRes, regimeBensRes, responsavelRes] = await Promise.all([
    fetchWithToken(getAtos, { method: "GET" }),
    fetchWithToken(regimeBens, { method: "GET" }),
    fetchWithToken(getAtosPessoa, { method: "GET" }),
  ]);

  if (atosRes.data.value) {
    Object.assign(atos, atosRes.data.value[0] || atosRes.data.value);
  }

  if (regimeBensRes.data.value) {
    combolistRegimeBens.value = regimeBensRes.data.value;
  }

  if (responsavelRes.data.value) {
    rawResponsavelFilhos.value = responsavelRes.data.value;
  }
});

// Recarrega responsáveis sempre que a tela voltar a ficar ativa ou o ato mudar
const reloadResponsaveis = async () => {
  try {
    const { data } = await fetchWithToken(getAtosPessoa, { method: "GET" });
    rawResponsavelFilhos.value = data.value || [];
  } catch (e) {
    // mantém lista anterior em caso de erro
  }
}


const rawResponsavelFilhos = ref([]);

const combolistResponsavel = computed(() =>
  rawResponsavelFilhos.value?.map((parte) => ({
    id: parte.id,
    nome: parte.pessoa?.nome || "Sem nome"
  })) || []
);


function redirectToUpdate(id) {
  idImovel.value = id;
  isModalAtualizarImoveisOpen.value = true;
}
const atualizarListaImoveis = async () => {
  await fetchWithToken(imoveisLista, {
    method: "POST",
    body: { ato_token: route.query.ato_token_edit },
  });
};
>>>>>>> fix/divorcio
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
    `${updateAtos}/${route.query.ato_id}`,
    {
      method: "PUT",
      body: {
        dt_casamento: atos.dt_casamento,
        tabvalores_regimecasamento_id: atos.tabvalores_regimecasamento_id,
        qtd_filhos_maiores: atos.qtd_filhos_maiores,
        qtd_filhos_menores: atos.qtd_filhos_menores,
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
await fetchAtosData();
const blockNonNumeric = (e) => {
  const allowedKeys = ["Backspace", "Tab", "ArrowLeft", "ArrowRight", "Delete"];

  if (!/[0-9]/.test(e.key) && !allowedKeys.includes(e.key)) {
    e.preventDefault();
  }
};
<<<<<<< HEAD
</script>
=======

</script>
>>>>>>> fix/divorcio
