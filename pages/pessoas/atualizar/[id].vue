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
          ></v-autocomplete
        ></v-col>
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
            :error-messages="v$.cpf_pai.$errors.map((e) => e.$message)"
            label="CPF do Pai"
            v-mask="'###.###.###-##'"
            @blur="v$.cpf_pai.$touch"
            @input="v$.cpf_pai.$touch"
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
            :error-messages="v$.cpf_mae.$errors.map((e) => e.$message)"
            label="CPF da Mãe"
            v-mask="'###.###.###-##'"
            required
            @blur="v$.cpf_mae.$touch"
            @input="v$.cpf_mae.$touch"
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
        <NuxtLink to="/home">
          <img class="btn-pointer" src="../assets/sair.png" alt="Sair" />
        </NuxtLink>
  
        <img class="btn-pointer" src="../assets/salvar.png" @click="onSubmit" />
      </v-row>
    </v-container>
  </template>
  
  <script setup>
  import { reactive } from "vue";
  import { useVuelidate } from "@vuelidate/core";
  import { helpers, required } from "@vuelidate/validators";
  import { cpf } from "~/composables/validaCpf";
  
  const emit = defineEmits(["saved"]);
  
  const { $toast } = useNuxtApp();
  
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
    return value.replace(/[.\-]/g, "");
  }
  
  const {
    data: dados,
    status,
    pending,
    error,
  } = await useLazyAsyncData("cliente-dados", async () => {
    const [estadoCivilItems, capacidadeCivilItems, cidadeNascimentoItems] =
      await Promise.all([
        $fetch("http://45.55.192.246:3746/listarEstadoCivil"),
        $fetch("http://45.55.192.246:3746/listarCapacidadeCivil"),
        $fetch("http://45.55.192.246:3746/listarCidades"),
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
    cpf_mae: {
      required: helpers.withMessage("O campo é obrigatorio", required),
      cpf,
    },
    cpf_pai: {
      cpf,
    },
  };
  
  const v$ = useVuelidate(rules, state);
  
  async function onSubmit() {
    if (await v$.value.$validate()) {
      const payload = {
        ...state,
        doc_identificacao: removeFormatting(state.doc_identificacao),
        cpf_pai: removeFormatting(state.cpf_pai),
        cpf_mae: removeFormatting(state.cpf_mae),
      };
      await $fetch("http://45.55.192.246:3746/createPessoa", {
        method: "POST",
        body: payload,
      });
      $toast.success("Pessoa cadastrada com sucesso!");
      emit("saved");
      console.log(payload);
    } else {
      $toast.error("Erro ao cadastrar pessoa");
    }
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
  