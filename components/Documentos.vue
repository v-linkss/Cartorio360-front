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
      item-key="id"
    >
      <template v-slot:item.actions="{ item }">
        <v-row>
          <div @click="redirectToUpdate(item.id)" title="editar">
            <img
              style="width: 40px; height: 40px; cursor: pointer"
              src="../assets/editar.png"
              alt="editar"
            />
          </div>
          <div @click="deleteDocumento(item)" title="deletar">
            <img
              v-if="item.excluido"
              style="width: 40px; height: 40px; cursor: pointer"
              src="../assets/excluido.png"
              alt="deletar"
              title="Reativar"
            />
            <img
              v-else
              src="../assets/trash.png"
              alt="reativar"
              class="trash-icon"
              style="width: 40px; height: 40px; cursor: pointer"
              title="reativar"
            />
          </div>
        </v-row>
      </template>
    </v-data-table>
    <NuxtLink to="/pessoas/registros">
      <img class="btn-pointer" src="../assets/sair.png" alt="Sair" />
    </NuxtLink>
    <v-dialog v-model="isModalOpen" max-width="600px">
      <v-card>
        <v-card-title style="color: green">Atualizar Endereço</v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="12" md="6">
              <v-autocomplete
                v-model="selectedDoc.tabvalores_tipodoc_id"
                :items="documentos.tipoDocumentoItems"
                label="Tipo"
                item-title="descricao"
                item-value="id"
              ></v-autocomplete>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="selectedDoc.numero"
                label="Número"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="selectedDoc.emissor"
                label="Número"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-autocomplete
                v-model="selectedDoc.tabvalores_ufemissor_id"
                :items="documentos.ufItems"
                label="UF"
                item-title="descricao"
                item-value="id"
              ></v-autocomplete>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="selectedDoc.data_emissao"
                type="date"
                label="Emissão"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="selectedDoc.data_vencimento"
                type="date"
                label="Validade"
              ></v-text-field>
            </v-col>

            <!-- Outros campos que precisar -->
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green" text @click="isModalOpen = false"
            >Cancelar</v-btn
          >
          <v-btn color="green" text @click="onUpdate(selectedDoc.id)"
            >Salvar</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import { useVuelidate } from "@vuelidate/core";
import { helpers, required } from "@vuelidate/validators";

const { $toast } = useNuxtApp();

const config = useRuntimeConfig();
const allTipos = `${config.public.managemant}/listarTipoDocumento`
const allUf = `${config.public.managemant}/listarUF`
const allDoc = `${config.public.managemant}/getAllPessoaDoc`
const createDoc = `${config.public.managemant}/createPessoaDoc`
const updateDoc = `${config.public.managemant}/updatePessoaDoc`

const isModalOpen = ref(false); // Controla a visibilidade do modal
const selectedDoc = ref(null);

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
      $toast.error("Erro ao cadastrar documento,erro no sistema.");
    }else{

      $toast.success("Documento cadastrado com sucesso!");
    }
  } else {
    $toast.error("Erro ao cadastrar documento, preencha os campos obrigatorios.");
  }
}
function redirectToUpdate(id) {
  const documento = documentos.value.pessoasDocsItems.find(
    (item) => item.id === id
  );
  if (documento) {
    selectedDoc.value = documento;
    isModalOpen.value = true;
  }
}

async function onUpdate(id) {
  const payloadFormated = {
    tabvalores_tipodoc_id: selectedDoc.value.tabvalores_tipodoc_id,
    numero: selectedDoc.value.numero,
    emissor: selectedDoc.value.emissor,
    tabvalores_ufemissor_id: selectedDoc.value.tabvalores_ufemissor_id,
    data_vencimento: selectedDoc.value.data_vencimento,
    data_emissao: selectedDoc.value.data_emissao,
  };
  const { status } = await useFetch(`${updateDoc}/${id}`, {
    method: "PUT",
    body: payloadFormated,
  });
  if (status.value === "success") {
    isModalOpen.value = false
    $toast.success("Pessoa atualizada com sucesso!");
  }
}
</script>
