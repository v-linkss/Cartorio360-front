<template>
  <h1>Matricula Teste</h1>
   <v-progress-circular
    class="loading-spinner"
    indeterminate
    size="64"
    v-if="pending"
  ></v-progress-circular>
  
  <div v-else-if="error">{{ error.message }}</div>
  <v-container v-if="!pending">
    <v-row>
      <v-col md="6">
        <v-text-field
          v-model="state.numero"
          :error-messages="v$.numero.$errors.map((e) => e.$message)"
          label="Matrícula"
          required
          @blur="v$.numero.$touch"
          @input="v$.numero.$touch"
        ></v-text-field>
      </v-col>
      <v-col md="4">
        <v-text-field
          v-model="state.protocolo"
          :error-messages="v$.protocolo.$errors.map((e) => e.$message)"
          label="Protocolo"
          required
          @blur="v$.protocolo.$touch"
          @input="v$.protocolo.$touch"
        ></v-text-field>
      </v-col>
      <v-col md="4">
        <v-text-field
          v-model="state.protocolo"
          :error-messages="v$.protocolo.$errors.map((e) => e.$message)"
          label="Protocolo"
          required
          @blur="v$.protocolo.$touch"
          @input="v$.protocolo.$touch"
        ></v-text-field>
      </v-col>
      <v-col md="4">
        <v-text-field
          v-model="state.protocolo"
          :error-messages="v$.protocolo.$errors.map((e) => e.$message)"
          label="Livro"
          required
          @blur="v$.protocolo.$touch"
          @input="v$.protocolo.$touch"
        ></v-text-field>
      </v-col>
      <v-col md="4">
        <v-text-field
          v-model="state.protocolo"
          :error-messages="v$.protocolo.$errors.map((e) => e.$message)"
          label="FOLHAS"
          required
          @blur="v$.protocolo.$touch"
          @input="v$.protocolo.$touch"
        ></v-text-field>
      </v-col>
      <v-col md="4">
        <v-text-field
          v-model="state.protocolo"
          :error-messages="v$.protocolo.$errors.map((e) => e.$message)"
          label="FOLHAS"
          required
          @blur="v$.protocolo.$touch"
          @input="v$.protocolo.$touch"
        ></v-text-field>
      </v-col>
      <v-col md="4">
        <v-text-field
          v-model="state.data"
          type="date"
          prepend-icon=""
          label="Data"
        ></v-text-field>
      </v-col>
      <v-col md="4">
        <v-text-field
          v-model="state.descricao"
          :error-messages="v$.descricao.$errors.map((e) => e.$message)"
          label="Descrição"
          required
          @blur="v$.descricao.$touch"
          @input="v$.descricao.$touch"
        ></v-text-field>
      </v-col>
      <v-col md="4">
        <v-text-field
          v-model="state.cnm"
          :error-messages="v$.cnm.$errors.map((e) => e.$message)"
          label="CNM"
          required
          @blur="v$.cnm.$touch"
          @input="v$.cnm.$touch"
        ></v-text-field>
      </v-col>
      <v-col md="4">
        <v-text-field
          v-model="state.cnm"
          :error-messages="v$.cnm.$errors.map((e) => e.$message)"
          label="CNM"
          required
          @blur="v$.cnm.$touch"
          @input="v$.cnm.$touch"
        ></v-text-field>
      </v-col>
      <v-col md="4">
        <v-text-field
          v-model="state.observacao"
          :error-messages="v$.observacao.$errors.map((e) => e.$message)"
          label="Observação"
          required
          @blur="v$.observacao.$touch"
          @input="v$.observacao.$touch"
        ></v-text-field>
      </v-col>
      <v-col md="4">
        <v-text-field
          v-model="state.inscricao_municipal"
          :error-messages="v$.inscricao_municipal.$errors.map((e) => e.$message)"
          label="Inscrição Municipal"
          required
          @blur="v$.inscricao_municipal.$touch"
          @input="v$.inscricao_municipal.$touch"
        ></v-text-field>
      </v-col>
    </v-row>
    <!--<v-row>
      <v-col md="4">
        <v-autocomplete
          v-model="state.tabvalores_estadocivil_id"
          :items="dados.estadoCivilItems"
          item-title="descricao"
          item-value="id"
          label="Estado Civil"
        >
        </v-autocomplete>
      </v-col>
      <v-col md="4">
        <v-text-field
          v-model="state.profissao"
          label="Profissão"
        ></v-text-field>
      </v-col>
      <v-col md="4">
        <v-text-field
          v-model="state.local_trabalho"
          label="Local de trabalho"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>

      <v-col md="4">
        <v-autocomplete
          v-model="state.tabvalores_capacidadecivil_id"
          :items="dados.capacidadeCivilItems"
          label="Capacidade Civil"
          item-title="descricao"
          item-value="id"
        ></v-autocomplete>
      </v-col>
      <v-col md="4">
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
      <v-col md="4">
        <v-text-field
          v-model.date="state.cpf_pai"
          label="CPF do Pai"
          v-mask="'###.###.###-##'"
        ></v-text-field>
      </v-col>
      <v-col md="4">
        <v-text-field
          v-model.date="state.nome_pai"
          label="Nome do Pai"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col md="4">
        <v-text-field
          v-model.date="state.cpf_mae"
          label="CPF da Mãe"
          v-mask="'###.###.###-##'"
        ></v-text-field>
      </v-col>
      <v-col md="4">
        <v-text-field
          v-model.date="state.nome_mae"
          :error-messages="v$.nome_mae.$errors.map((e) => e.$message)"
          label="Nome da Mãe"
          required
          @blur="v$.nome_mae.$touch"
          @input="v$.nome_mae.$touch"
        ></v-text-field>
      </v-col>
    </v-row>-->
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
import { cpf } from "~/composables/validaCpf";

const props = defineProps({
  isModal: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["saved", "close-modal"]);
const router = useRouter();
const { $toast } = useNuxtApp();

const config = useRuntimeConfig();
const createPessoa = `${config.public.auth}/service/gerencia/createPessoa`;
const updatePessoa = `${config.public.auth}/service/gerencia/updatePessoa`;
const estadoCivil = `${config.public.auth}/service/gerencia/listarEstadoCivil`;
const capacidadeCivil = `${config.public.auth}/service/gerencia/listarCapacidadeCivil`;
const cidade = `${config.public.auth}/service/gerencia/listarCidades`;
const sexo = `${config.public.auth}/service/gerencia/listarSexo`;

const initialState = {
  numero: null,
  protocolo: null,
  livro: null,
  folhas: null,
  data: null,
  descricao: null,
  cnm: null,
  observacao: null,
  inscricao_municipal: null,
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
  const [estadoCivilItems, capacidadeCivilItems, cidadeNascimentoItems, sexoItems] =
    await Promise.all([
      $fetchWithToken(estadoCivil),
      $fetchWithToken(capacidadeCivil),
      $fetchWithToken(cidade),
      $fetchWithToken(sexo)
    ]);

  return { estadoCivilItems, capacidadeCivilItems, cidadeNascimentoItems, sexoItems };
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
    const { data, error, status } = await fetchWithToken(createPessoa, {
      method: "POST",
      body: payloadFormated,
    });
    if (status.value === "error" && error.value.statusCode === 500) {
      $toast.error("Erro ao cadastrar pessoa,o CPF já está cadastrado.");
    } else {
      $toast.success("Pessoa cadastrada com sucesso!");
      const pessoaIdValue = data.value.id;
      pessoaId.value = pessoaIdValue;
      const pessoa_token = useCookie("pessoa_token");
      pessoa_token.value = data.value.token;
      isEditMode.value = true;
      emit("saved");
    }
  } else {
    $toast.error("Erro ao cadastrar pessoa, preencha os campos obrigatorios.");
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
  const { data, error, status } = await fetchWithToken(
    `${updatePessoa}/${pessoaId.value}`,
    {
      method: "PUT",
      body: payloadFormated,
    }
  );
  if (status.value === "success") {
    if (props.isModal === true) {
      $toast.success("Pessoa atualizada com sucesso!");
      emit("close-modal");
      return;
    }
    $toast.success("Pessoa atualizada com sucesso!");
    router.push("/pessoas/lista");
  }
}

const voltar = () => {
  if (props.isModal === true) {
    emit("close-modal");
    return;
  }
  router.push("/pessoas/lista");
};
</script>
