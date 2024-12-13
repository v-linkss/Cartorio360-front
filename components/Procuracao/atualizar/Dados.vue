<template>
  <v-container >
    <v-row class="mt-5">
      <v-col cols="3">
        <v-autocomplete
          label="Situação"
          v-model="state.status"
          :items="situacoesItems"
          item-title="descricao"
          item-value="descricao"
          required
          :error-messages="v$.status.$errors.map((e) => e.$message)"
          @blur="v$.status.$touch"
          @input="v$.status.$touch"
        >
        </v-autocomplete>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="5">
        <v-text-field
          label="MNE - Matrícula Notoria Eletrônica"
          v-model="state.mne"
        >
        </v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="2">
        <v-text-field
          v-model="state.dt_abertura"
          type="date"
          label="Data Lavratura"
          readonly
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row class="mb-3">
      <NuxtLink @click="goBack">
        <v-btn size="large" color="red">Voltar</v-btn>
      </NuxtLink>

      <v-btn class="ml-10" @click="onUpdate" size="large" color="green"
        >Salvar</v-btn
      >
    </v-row>
  </v-container>
</template>

<script setup>
import { useVuelidate } from "@vuelidate/core";
import { helpers, required } from "@vuelidate/validators";


const emit = defineEmits(["saved"]);
const router = useRouter();
const route = useRoute();
const config = useRuntimeConfig();
const { $toast } = useNuxtApp();
const allSituacoes = `${config.public.managemant}/listarSituacoes`;
const updateAtoProcuracao = `${config.public.managemant}/updateAtos`;
const getAtoId = `${config.public.managemant}/getAtos`;
const cartorio_token = ref(useCookie("user-data").value.cartorio_token);
const body = route.query.id
  ? { ato_token: "xkyaA" }
  : { cartorio_token: cartorio_token };
const ordemserv_id =
  ref(useCookie("user-service").value.id).value ||
  ref(useCookie("user-service").value).value;
const situacoesItems = ref([]);

const state = reactive({
  dt_abertura: getCurrentDate(),
  status: null,
  mne: null,
});

const rules = {
  status: {
    required: helpers.withMessage("O campo é obrigatorio", required),
  },
};

const v$ = useVuelidate(rules, state);
async function loadData() {
  try {
    const { data: tipoAtoId,status } = await useFetch(`${getAtoId}/${route.query.id}`, {
  method: "GET",
});
console.log(tipoAtoId.value)
  } catch (error) {
    //asdasd
    console.log(error)
  }
}
await loadData()
async function onUpdate() {
  if (await v$.value.$validate()) {
    const { data, error, status } = await useFetch(updateAtoProcuracao, {
      method: "PUT",
      body: {
        status:state.status,
        mne:state.mne
      },
    });
    if (status.value === "success") {
      $toast.success("Situação Atualizada com sucesso");
    }
  } else {
    $toast.error("Preencha os campos obrigatorios.");
  }
}

function getCurrentDate() {
  const today = new Date();
  const yyyy = today.getFullYear();
  const MM = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");
  return `${yyyy}-${MM}-${dd}`;
}
console.log(body)


onMounted(async() => {
  if (body) {
    const { data: situacaoData,status } = await useLazyFetch(allSituacoes, {
  method: "POST",
  body: body,
});
// situacoesItems.value = situacaoData.value;
console.log(situacaoData.value)
  }
});

const goBack = () => {
  const origem = route.query.origem || "criar";
  const id = route.query.id;
  if (origem === "atualizar") {
    router.push(`/os/atualizar/${id}`);
  } else {
    router.push("/os/criar-registro");
  }
};
</script>
