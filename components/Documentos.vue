<template>
  <v-container v-if="!pending" class="mt-5">
    <v-row>
      <v-col md="2">
        <v-autocomplete
          v-model="state.tabvalores_tipodoc_id"
          :items="documentos.tipoDocumentoItems"
          label="Tipo"
          item-title="descricao"
          item-value="id"
        ></v-autocomplete>
      </v-col>
      <v-col>
        <v-text-field
          v-model="state.numero"
          :error-messages="v$.numero.$errors.map((e) => e.$message)"
          label="Numero"
          required
          @blur="v$.numero.$touch"
          @input="v$.numero.$touch"
        ></v-text-field>
      </v-col>
      <v-col md="2">
        <v-text-field
          v-model="state.emissor"
          :error-messages="v$.emissor.$errors.map((e) => e.$message)"
          required
          @blur="v$.emissor.$touch"
          @input="v$.emissor.$touch"
          label="Emissor"
        ></v-text-field>
      </v-col>
      <v-col>
        <v-autocomplete
          v-model="state.tabvalores_ufemissor_id"
          :items="documentos.ufItems"
          label="UF"
          item-title="descricao"
          item-value="id"
        ></v-autocomplete>
      </v-col>
      <v-col md="2">
        <v-text-field
          v-model="state.data_emissao"
          type="date"
          label="Emissão"
        ></v-text-field>
      </v-col>
      <v-col md="2">
        <v-text-field
          v-model="state.data_vencimento"
          type="date"
          label="Validade"
        ></v-text-field>
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
      :items="documentos.pessoasDocsItems"
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
const allTipos = config.public.listarTipoDocumentoUrl
const allUf = config.public.listarUfUrl;
const allDoc = config.public.allPessoaDocApiUrl
const createDoc = config.public.createPessoaDocUrl

const state = reactive({
  tabvalores_tipodoc_id: "",
  emissor: "",
  validade: "",
  numero: "",
  data_emissao: "",
  data_vencimento: "",
  tabvalores_ufemissor_id: "",
});

const headers = [
  { title: "Tipo", value: "tabvalores_tipodoc_id" },
  { title: "Número", value: "numero" },
  { title: "Emissor", value: "emissor" },
  {
    title: "UF",
    value: "tabvalores_ufemissor_id",
  },
  {
    title: "Emissão",
    value: "data_emissao",
  },
  {
    title: "Validade",
    value: "data_vencimento",
  },
];

const rules = {
  numero: {
    required: helpers.withMessage("O campo é obrigatorio", required),
  },
  emissor: {
    required: helpers.withMessage("O campo é obrigatorio", required),
  },
};

const v$ = useVuelidate(rules, state);

const {
  data: documentos,
  pending,
} = await useLazyAsyncData("cliente-documentos", async () => {
  const [tipoDocumentoItems, ufItems, pessoasDocsItems] = await Promise.all([
    $fetch(allTipos),
    $fetch(allUf),
    $fetch(allDoc),
  ]);

  return { tipoDocumentoItems, ufItems, pessoasDocsItems };
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
     createDoc,
      {
        method: "POST",
        body: payloadFormated,
      }
    );
    if (status.value === 'error' && error.value.statusCode === 500){
      $toast.error("Erro ao cadastrar documento,falta de id obrigatorios.");
    }else{

      $toast.success("Documento cadastrado com sucesso!");
    }
  } else {
    $toast.error("Erro ao cadastrar documento, preencha os campos obrigatorios.");
  }
}
</script>
