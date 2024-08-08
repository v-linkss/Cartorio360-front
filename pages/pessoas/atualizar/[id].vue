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
          label="Nome"
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="4">
        <v-text-field
          v-model="state.doc_identificacao"
          label="CPF"
          v-mask="'###.###.###-##'"
          required
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
          label="Nome da Mãe"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <NuxtLink to="/pessoas/registros">
        <img class="btn-pointer" src="../../../assets/sair.png" alt="Sair" />
      </NuxtLink>

      <img
        class="btn-pointer"
        src="../../../assets/salvar.png"
        @click="onUpdate()"
      />
    </v-row>
  </v-container>
</template>

<script setup>
import { reactive } from "vue";
import { useVuelidate } from "@vuelidate/core";

const emit = defineEmits(["saved"]);
const { $toast } = useNuxtApp();

const route = useRoute();
const { id } = route.params;

const config = useRuntimeConfig();
const updatePessoa = `${config.public.managemant}/updatePessoa`
const estadoCivil = `${config.public.managemant}/listarEstadoCivil`
const capacidadeCivil = `${config.public.managemant}/listarCapacidadeCivil`
const cidades = `${config.public.managemant}/listarCidades`
const buscarPessoa = `${config.public.managemant}/getPessoaById`

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
  local_trabalho: "",
  tipo_pessoa: "FISICA",
  tabvalores_estadocivil_id: "",
  tabvalores_capacidadecivil_id: "",
  cidade_natural_id: "",
  cartorio_id: useCookie("user-data").value.cartorio_id,
  user_id: useCookie("user-data").value.usuario_id,
};

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
  const [estadoCivilItems, capacidadeCivilItems, cidadeNascimentoItems, pessoa] =
    await Promise.all([
      $fetch(estadoCivil),
      $fetch(capacidadeCivil),
      $fetch(cidades),
      $fetch(`${buscarPessoa}/${id}`),
    ]);

  // Atribuir os dados da pessoa ao estado reativo
  Object.assign(state, pessoa);

  return { estadoCivilItems, capacidadeCivilItems, cidadeNascimentoItems };
});



const v$ = useVuelidate(state);

function formatPayload(payload) {
  const formattedPayload = {};
  for (const key in payload) {
    if (payload[key] === "") {
      formattedPayload[key] = null;
    } else if (key === "doc_identificacao" || key === "cpf_pai" || key === "cpf_mae") {
      formattedPayload[key] = removeFormatting(payload[key]);
    } else {
      formattedPayload[key] = payload[key];
    }
  }
  return formattedPayload;
}

async function onUpdate() {
    const payloadFormated = formatPayload(state);
    const { data, error } = await useFetch(
      `${updatePessoa}/${id}`,
      {
        method: "PUT",
        body: payloadFormated,
      }
    );

    $toast.success("Pessoa atualizada com sucesso!");
    console.log(payloadFormated)
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
