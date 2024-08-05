<template>
  <v-container v-if="!pending" class="mt-5">
    <v-row>
      <v-col md="2">
        <v-autocomplete
          v-model="state.tabvalores_pais_id"
          :items="enderecos.paisItems"
          label="País"
          item-title="descricao"
          item-value="id"
        ></v-autocomplete>
      </v-col>
      <v-col>
        <v-text-field
          v-model="state.codcep"
           v-mask="'########'"
          :error-messages="v$.codcep.$errors.map((e) => e.$message)"
          required
          @blur="v$.codcep.$touch"
          @input="v$.codcep.$touch"
          label="CEP"
        ></v-text-field>
      </v-col>
      <v-col md="2">
        <v-text-field
          v-model="state.logradouro"
          label="Endereço"
          :error-messages="v$.logradouro.$errors.map((e) => e.$message)"
          required
          @blur="v$.logradouro.$touch"
          @input="v$.logradouro.$touch"
        ></v-text-field>
      </v-col>
      <v-col md="1">
        <v-text-field
          v-model="state.numero"
          :error-messages="v$.numero.$errors.map((e) => e.$message)"
          required
          @blur="v$.numero.$touch"
          @input="v$.numero.$touch"
          label="N*"
        ></v-text-field>
      </v-col>
      <v-col md="2">
        <v-text-field
          v-model="state.bairro"
          :error-messages="v$.bairro.$errors.map((e) => e.$message)"
          required
          @blur="v$.bairro.$touch"
          @input="v$.bairro.$touch"
          label="Bairro"
        ></v-text-field>
      </v-col>
      <v-col md="2">
        <v-autocomplete
          v-model="state.cidade_id"
          :items="enderecos.cidadesItems"
          label="Cidade"
          item-title="descricao"
          item-value="id"
        ></v-autocomplete>
      </v-col>
      <div class="mt-3">
        <img
          style="width: 40px; height: 40px; cursor: pointer"
          src="../assets/novo.png"
          alt="novo"
          @click="onSubmit"
        />
      </div>
    </v-row>
    <v-data-table
      :headers="headers"
      :items="enderecos.enderecosItems"
      item-key="name"
    ></v-data-table>
    <NuxtLink to="/pessoas/registros">
      <img class="btn-pointer" src="../assets/sair.png" alt="Sair" />
    </NuxtLink>
  </v-container>
</template>

<script setup>
import { useVuelidate } from "@vuelidate/core";
import { helpers, required } from "@vuelidate/validators";

const { $toast } = useNuxtApp();

const config = useRuntimeConfig();
const allPaises = config.public.listarPaisUrl
const allEnderecos = config.public.getAllPessoaEnderecoUrl
const cidades = config.public.listarCidadesUrl
const criarEnderecos = config.public.createPessoaEnderecoUrl

const state = reactive({
  tabvalores_pais_id: "",
  cidade_id:"",
  codcep: "",
  logradouro: "",
  numero: "",
  bairro: "",
  data_vencimento: "",
  tabvalores_ufemissor_id: "",
});
const headers = [
  { title: "País", value: "tabvalores_pais_id" },
  { title: "CEP", value: "codcep" },
  { title: "Endereço", value: "logradouro" },
  {
    title: "N*",
    value: "numero",
  },
  {
    title: "Bairro",
    value: "data_vencimento",
  },
  {
    title: "Cidade",
    value: " tabvalores_ufemissor_id",
  },
];

const rules = {
  numero: {
    required: helpers.withMessage("O campo é obrigatorio", required),
  },
  bairro: {
    required: helpers.withMessage("O campo é obrigatorio", required),
  },
  logradouro: {
    required: helpers.withMessage("O campo é obrigatorio", required),
  },
  codcep: {
    required: helpers.withMessage("O campo é obrigatorio e precisa de 8 digitos", required),
  },
};

const v$ = useVuelidate(rules, state);

const {
  data: enderecos,
  status,
  pending,
} = await useLazyAsyncData("cliente-enderecos", async () => {
  const [paisItems, enderecosItems,cidadesItems] = await Promise.all([
    $fetch(allPaises),
    $fetch(allEnderecos),
    $fetch(cidades),
  ]);

  return { paisItems, enderecosItems,cidadesItems };
});

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
    };
    const { data, error,status } = await useFetch(
      criarEnderecos,
      {
        method: "POST",
        body: payloadFormated,
      }
    );
    if (status.value === 'error' && error.value.statusCode === 500){
      $toast.error("Erro ao cadastrar endereço,falta de id obrigatorios.");
    }else{

      $toast.success("Endereço cadastrado com sucesso!");
    }
  } else {
    $toast.error("Erro ao cadastrar Endereço, preencha os campos obrigatorios.");
  }
}
</script>

