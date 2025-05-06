<template>
  <v-container class="mt-3" style="height: 425px">
    <v-row>
      <v-col md="8">
        <v-text-field
          v-model="state.nome"
          :error-messages="v$.nome.$errors.map((e) => e.$message)"
          label="Razão Social"
          required
          @blur="v$.nome.$touch"
          @input="v$.nome.$touch"
        ></v-text-field>
      </v-col>
      <v-col md="4">
        <v-text-field
          v-model="state.doc_identificacao"
          :error-messages="v$.doc_identificacao.$errors.map((e) => e.$message)"
          label="CNPJ"
          v-mask="'##.###.###/####-##'"
          required
          @blur="v$.doc_identificacao.$touch"
          @input="v$.doc_identificacao.$touch"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col md="8">
        <v-text-field
          v-model="state.nome_fantasia"
          label="Nome Fantasia"
        ></v-text-field>
      </v-col>
      <v-col md="4">
        <v-text-field
          v-model="state.inscricao_estadual"
          label="Inscrição Estadual"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col md="12">
        <v-text-field
          v-model="state.observacao"
          label="Observação"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row class="mb-3">
      <v-btn @click="voltar" size="large" color="red">Voltar</v-btn>
      <v-btn
        @click="isEditMode ? onUpdate() : onSubmit()"
        class="ml-4"
        size="large"
        color="green"
        >Salvar</v-btn
      >
    </v-row>
  </v-container>
</template>

<script setup>
import { useVuelidate } from "@vuelidate/core";
import { helpers, required } from "@vuelidate/validators";
import { cnpj } from "~/composables/validaCnpj";

const props = defineProps({
  isModal: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["saved", "close-modal"]);
const router = useRouter();
const route = useRoute();
const { $toast } = useNuxtApp();

const config = useRuntimeConfig();
const buscarPessoaJuridica = `${config.public.auth}/service/gerencia/getPessoaById`;
const createPessoa = `${config.public.auth}/service/gerencia/createPessoa`;
const updatePessoa = `${config.public.auth}/service/gerencia/updatePessoa`;
const { id } = route.params;

const initialState = {
  nome: null,
  nome_fantasia: null,
  inscricao_estadual: null,
  observacao: null,
  doc_identificacao: null,
  tipo_pessoa: "JURIDICA",
  cartorio_id: useCookie("user-data").value.cartorio_id,
  user_id: useCookie("user-data").value.usuario_id,
};

const isEditMode = ref(false);
const pessoaId = useCookie("pessoa-id");

const state = reactive({
  ...initialState,
});

function removeFormatting(value) {
  if (value) {
    return value.replace(/[.\-/]/g, "");
  } else {
    return null;
  }
}

const rules = {
  nome: {
    required: helpers.withMessage("O campo é obrigatorio", required),
  },
  doc_identificacao: {
    required: helpers.withMessage("O campo é obrigatorio", required),
    cnpj,
  },
};

const v$ = useVuelidate(rules, state);

async function onSubmit() {
  if (await v$.value.$validate()) {
    const payload = { ...state };
    for (const key in payload) {
      if (payload[key] === "") {
        payload[key] = null;
      }
    }
    const payloadFormated = {
      ...payload,
      doc_identificacao: removeFormatting(state.doc_identificacao),
    };
    const { data, error, status } = await fetchWithToken(createPessoa, {
      method: "POST",
      body: payloadFormated,
    });
    if (status.value === "error" && error.value.statusCode === 500) {
      const mensagemErro = error.value?.data?.error?.errors?.[0]?.message;

      $toast.error(mensagemErro || "Erro interno ao cadastrar pessoa juridica.");
    } else {
      $toast.success("Pessoa Juridica cadastrada com sucesso!");
      const pessoaIdValue = data.value.id;
      pessoaId.value = pessoaIdValue;
      const pessoa_token = useCookie("pessoa_token");
      pessoa_token.value = data.value.token;
      isEditMode.value = true;
      emit("saved");
    }
  } else {
    $toast.error(
      "Erro ao cadastrar pessoa juridica, preencha os campos obrigatorios."
    );
  }
}
async function onUpdate() {
  const payload = { ...state };
  for (const key in payload) {
    if (payload[key] === "") {
      payload[key] = null;
    }
  }
  const payloadFormated = {
    ...payload,
    doc_identificacao: removeFormatting(state.doc_identificacao),
  };
  const { data, error, status } = await fetchWithToken(
    `${updatePessoa}/${id || pessoaId.value}`,
    {
      method: "PUT",
      body: payloadFormated,
    }
  );
  if (status.value === "success") {
    if (props.isModal === true) {
      $toast.success("Pessoa Juridica atualizada com sucesso!");
      emit("close-modal");
      return;
    }
    $toast.success("Pessoa Juridica atualizada com sucesso!");
    router.push("/pessoas/lista");
  }
}

async function loadPessoaJuridicaData() {
  const { data, error } = await fetchWithToken(`${buscarPessoaJuridica}/${id}`, {
    method: "GET",
  });
  Object.assign(state,data.value)
}

const voltar = () => {
  if (props.isModal === true) {
    emit("close-modal");
    return;
  }
  router.push("/pessoas/lista");
};

onMounted(() => {
  if (id) {
    loadPessoaJuridicaData();
    isEditMode.value = true
  }
});


</script>
