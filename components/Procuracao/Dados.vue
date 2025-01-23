<template>
  <v-container>
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
          disabled
          readonly
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row class="mb-3">
      <NuxtLink @click="goBack">
        <v-btn size="large" color="red">Voltar</v-btn>
      </NuxtLink>

      <v-btn class="ml-10" @click="onSubmit" size="large" color="green"
        >Salvar</v-btn
      >
    </v-row>
  </v-container>
</template>

<script setup>
import { useVuelidate } from "@vuelidate/core";
import { helpers, required } from "@vuelidate/validators";
const props = defineProps({
  ato_token: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(["saved"]);
const router = useRouter();
const route = useRoute();
const config = useRuntimeConfig();
const { $toast } = useNuxtApp();
const allSituacoes = `${config.public.managemant}/listarSituacoes`;
const createAtoProcuracao = `${config.public.managemant}/createAtos`;
const getAtoId = `${config.public.managemant}/getAtosTiposByToken`;
const cartorio_token = ref(useCookie("user-data").value.cartorio_token);
const ordemserv_id =
  ref(useCookie("user-service").value.id).value ||
  ref(useCookie("user-service").value).value;
const situacoesItems = ref([]);

const state = reactive({
  dt_abertura: null,
  status: "EM EDIÇÃO",
  mne: null,
});

const rules = {
  status: {
    required: helpers.withMessage("O campo é obrigatorio", required),
  },
};

const v$ = useVuelidate(rules, state);

const { data: tipoAtoId } = await useFetch(`${getAtoId}/${props.ato_token}`, {
  method: "GET",
});

async function onSubmit() {
  if (await v$.value.$validate()) {
    const { data, error, status } = await useFetch(createAtoProcuracao, {
      method: "POST",
      body: {
        ato_tipo_id: tipoAtoId.value.id,
        cartorio_id: useCookie("user-data").value.cartorio_id,
        ordemserv_id: ordemserv_id,
        status: state.status,
        dt_abertura: state.dt_abertura,
        mne: state.mne,
        user_id: useCookie("user-data").value.usuario_id,
        user_alteracao_id:useCookie("user-data").value.usuario_id
      },
    });
    if (status.value === "success") {
      $toast.success("Ato registrado com sucesso!");
      emit("saved", { id: data.value.id, token: data.value.token });
    }
  } else {
    $toast.error("Preencha os campos obrigatorios.");
  }
}

const { data: situacaoData } = await useFetch(allSituacoes, {
  method: "POST",
  body: {cartorio_token:cartorio_token.value},
});
situacoesItems.value = situacaoData.value;

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
