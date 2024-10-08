<template>
  <v-progress-circular
    class="loading-spinner"
    indeterminate
    size="64"
    v-if="pending"
  ></v-progress-circular>
  <div v-else-if="error">{{ error.message }}</div>
  <v-container v-if="!pending" class="mt-5">
    <v-row>
      <v-col cols="12" md="8">
        <v-text-field
          v-model="state.nome"
          :error-messages="v$.nome.$errors.map((e) => e.$message)"
          label="Nome"
          required
          @blur="v$.nome.$touch"
          @input="v$.nome.$touch"
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="4">
        <v-text-field
          v-model="state.doc_identificacao"
          :error-messages="v$.doc_identificacao.$errors.map((e) => e.$message)"
          label="CPF"
          v-mask="'###.###.###-##'"
          required
          @blur="v$.doc_identificacao.$touch"
          @input="v$.doc_identificacao.$touch"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="4">
        <v-autocomplete
          v-model="state.tabvalores_estadocivil_id"
          :items="dados.estadoCivilItems"
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
          type="date"
          prepend-icon=""
          label="Data de nascimento"
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="4">
        <v-autocomplete
          v-model="state.tabvalores_capacidadecivil_id"
          :items="dados.capacidadeCivilItems"
          label="Capacidade Civil"
          item-title="descricao"
          item-value="id"
        ></v-autocomplete>
      </v-col>
      <v-col cols="12" md="4">
        <v-autocomplete
          v-model="state.cidade_natural_id"
          :items="dados.cidadeNascimentoItems"
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
          :error-messages="v$.nome_mae.$errors.map((e) => e.$message)"
          label="Nome da Mãe"
          required
          @blur="v$.nome_mae.$touch"
          @input="v$.nome_mae.$touch"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <NuxtLink to="/pessoas/registros">
        <img class="btn-pointer" src="../assets/sair.png" alt="Sair" />
      </NuxtLink>

      <img
        class="btn-pointer"
        src="../assets/salvar.png"
        @click="isEditMode ? onUpdate() : onSubmit()"
      />
    </v-row>
  </v-container>
</template>

<script setup>
import { useVuelidate } from "@vuelidate/core";
import { helpers, required } from "@vuelidate/validators";
import { cpf } from "~/composables/validaCpf";

const emit = defineEmits(["saved"]);
const router = useRouter();
const { $toast } = useNuxtApp();

const config = useRuntimeConfig();
const createPessoa = `${config.public.managemant}/createPessoa`
const updatePessoa = `${config.public.managemant}/updatePessoa`
const estadoCivil = `${config.public.managemant}/listarEstadoCivil`
const capacidadeCivil = `${config.public.managemant}/listarCapacidadeCivil`
const cidade = `${config.public.managemant}/listarCidades`

const initialState = {
  nome: "",
  nome_pai: "",
  nome_mae: "",
  profissao: "",
  local_trabalho: "",
  data_nascimento: "",
  doc_identificacao: "",
  cpf_pai: "",
  cpf_mae: "",
  tipo_pessoa: "FISICA",
  tabvalores_estadocivil_id: "",
  tabvalores_capacidadecivil_id: "",
  cidade_natural_id: "",
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
    return value.replace(/[.\-]/g, "");
  } else {
    value = null;
  }
}

const {
  data: dados,
  status,
  pending,
  error,
} = await useLazyAsyncData("cliente-dados", async () => {
  const [estadoCivilItems, capacidadeCivilItems, cidadeNascimentoItems] =
    await Promise.all([
      $fetch(estadoCivil),
      $fetch(capacidadeCivil),
      $fetch(cidade)
    ]);

  return { estadoCivilItems, capacidadeCivilItems, cidadeNascimentoItems };
});

const rules = {
  nome: {
    required: helpers.withMessage("O campo é obrigatorio", required),
  },
  nome_mae: {
    required: helpers.withMessage("O campo é obrigatorio", required),
  },
  doc_identificacao: {
    required: helpers.withMessage("O campo é obrigatorio", required),
    cpf,
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
      cpf_pai: removeFormatting(state.cpf_pai),
      cpf_mae: removeFormatting(state.cpf_mae),
    };
    const { data, error, status } = await useFetch(createPessoa, {
      method: "POST",
      body: payloadFormated,
    });
    if (status.value === "error" && error.value.statusCode === 500) {
      $toast.error("Erro ao cadastrar pessoa,o CPF já está cadastrado.");
    } else {
      $toast.success("Pessoa cadastrada com sucesso!");
      const pessoaIdValue = data.value.id;
      pessoaId.value = pessoaIdValue;
      emit("saved");
      isEditMode.value = true;
    }
  } else {
    $toast.error("Erro ao cadastrar pessoa, preencha os campos obrigatorios.")
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
    cpf_mae: removeFormatting(state.cpf_mae),
  };
  const { data, error } = await useFetch(
    `${updatePessoa}/${pessoaId.value}`,
    {
      method: "PUT",
      body: payloadFormated,
    }
  );
  $toast.success("Pessoa atualizada com sucesso!");
  router.push("/pessoas/registros");
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
