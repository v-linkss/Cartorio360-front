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
    >
    <template v-slot:item.actions="{ item }">
        <v-row>
          <div
            @click="redirectToUpdate(item.id)"
            title="Visualizar"
          >
            <img
              style="width: 40px; height: 40px;cursor: pointer;"
              src="../assets/editar.png"
              alt="Visualizar"
            />
          </div>
          <div
            @click="deleteDocumento(item)"
            title="Visualizar"
          >
            <img
              v-if="item.excluido"
              style="width: 40px; height: 40px;cursor: pointer;"
              src="../assets/excluido.png"
              alt="Visualizar"
              title="Reativar"
            />
            <img
              v-else
              src="../assets/trash.png"
              alt="Excluir"
              class="trash-icon"
              style="width: 40px; height: 40px;cursor: pointer;"
              title="Excluir"
            />
          </div>
        </v-row>
      </template>
  </v-data-table>
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
const allTipos = `${config.public.managemant}/listarTipoDocumento`
const allUf = `${config.public.managemant}/listarUF`;
const allDoc = `${config.public.managemant}/getPessoaDocById`
const createDoc = `${config.public.managemant}/createPessoaDoc`
const updateDoc = `${config.public.managemant}/updatePessoaDoc`

const state = reactive({
  tabvalores_tipodoc_id: "",
  emissor: "",
  validade: "",
  numero: "",
  data_emissao: "",
  data_vencimento: "",
  tabvalores_ufemissor_id: "",
  user_id: useCookie("user-data").value.usuario_id,
  pessoa_id: useCookie("pessoa-id").value
});

const headers = [
  { title: "Tipo", value: "tipoDocumento.descricao" },
  { title: "Número", value: "numero" },
  { title: "Emissor", value: "emissor" },
  {
    title: "UF",
    value: "ufEmissor.descricao",
  },
  {
    title: "Emissão",
    value: "data_emissao",
  },
  {
    title: "Validade",
    value: "data_vencimento",
  },
  { value: "actions" },
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
    $fetch(`${allDoc}/${ useCookie("pessoa-id").value}`),
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
      documentos.value.pessoasDocsItems.push(data.value);
      $toast.success("Documento cadastrado com sucesso!");
      Object.assign(state, {
      tabvalores_tipodoc_id: "",
      emissor: "",
      validade: "",
      numero: "",
      data_emissao: "",
      data_vencimento: "",
      tabvalores_ufemissor_id: "",
    });
    }
  } else {
    $toast.error("Erro ao cadastrar documento, preencha os campos obrigatorios.");
  }
}

async function deleteDocumento(item) {
  item.excluido = !item.excluido;
  try {
    await useFetch(`${updateDoc}/${item.id}`, {
      method: 'PUT',
      body: JSON.stringify({ excluido: item.excluido }),
    });
  } catch (error) {
    console.error('Erro ao excluir pessoa:', error);
  }
}
</script>
