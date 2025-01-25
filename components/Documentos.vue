<template>
  <v-container class="mt-3" v-if="!pending" style="height: 425px">
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
      <div class="mt-1">
        <img
          style="width: 40px; height: 40px; cursor: pointer"
          src="../assets/novo.png"
          alt="novo"
          @click="onSubmit"
        />
      </div>
    </v-row>
    <v-data-table
      style="max-height: 330px"
      :headers="headers"
      :items="documentos.pessoasDocsItems"
      item-key="id"
    >
      <template v-slot:item.actions="{ item }">
        <v-row style="display: flex; margin-top: -8px; gap: 10px">
          <div @click="redirectToUpdate(item)" title="editar">
            <img
              style="width: 30px; height: 30px; cursor: pointer"
              src="../assets/editar.png"
              alt="editar"
            />
          </div>
          <div @click="deleteDocumento(item)" title="deletar">
            <img
              v-if="item.excluido"
              style="width: 30px; height: 30px; cursor: pointer"
              src="../assets/excluido.png"
              alt="deletar"
              title="Reativar"
            />
            <img
              v-else
              src="../assets/mudarStatus.png"
              alt="reativar"
              class="trash-icon"
              style="width: 30px; height: 30px; cursor: pointer"
              title="reativar"
            />
          </div>
        </v-row>
      </template>
    </v-data-table>
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
  <NuxtLink @click="voltar">
    <v-btn size="large" class="ml-10 mb-5" color="red">Voltar</v-btn>
  </NuxtLink>
</template>

<script setup>
import { useVuelidate } from "@vuelidate/core";
import { helpers, required } from "@vuelidate/validators";
const emit = defineEmits(["close-modal"]);

const props = defineProps({
  isModal: {
    type: Boolean,
    default: false,
  },
});

const { $toast } = useNuxtApp();
const route = useRoute();
const router = useRouter();
const { id } = route.params;

const config = useRuntimeConfig();
const allTipos = `${config.public.auth}/service/gerencia/listarTipoDocumento`;
const allUf = `${config.public.auth}/service/gerencia/listarUF`;
const allDoc = `${config.public.auth}/service/gerencia/getPessoaDocById`;
const createDoc = `${config.public.auth}/service/gerencia/createPessoaDoc`;
const updateDoc = `${config.public.auth}/service/gerencia/updatePessoaDoc`;

const isModalOpen = ref(false);
const selectedDoc = ref(null);
const user_id = ref(useCookie("user-data").value.usuario_id).value;
const pessoa_id = id ? Number(id) : Number(useCookie("pessoa-id").value);

const state = reactive({
  tabvalores_tipodoc_id: null,
  emissor: null,
  numero: null,
  data_emissao: null,
  data_vencimento: null,
  tabvalores_ufemissor_id: null,
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
  {
    value: "actions",
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
  refresh,
} = await useLazyAsyncData("cliente-documentos", async () => {
  const [tipoDocumentoItems, ufItems, pessoasDocsItems] = await Promise.all([
    $fetchWithToken(allTipos),
    $fetchWithToken(allUf),
    $fetchWithToken(`${allDoc}/${pessoa_id}`),
  ]);
  const formattedPessoasDocsItems = pessoasDocsItems.map((doc) => {
    return {
      ...doc,
      data_emissao: formatDate(doc.data_emissao),
      data_vencimento: formatDate(doc.data_vencimento),
    };
  });
  return {
    tipoDocumentoItems,
    ufItems,
    pessoasDocsItems: formattedPessoasDocsItems,
  };
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
      user_id,
      pessoa_id,
    };
    const { data, error, status } = await fetchWithToken(createDoc, {
      method: "POST",
      body: payloadFormated,
    });
    if (status.value === "error" && error.value.statusCode === 500) {
      $toast.error("Erro ao cadastrar documento,erro no sistema.");
    } else {
      $toast.success("Documento cadastrado com sucesso!");
      refresh();
      for (const key in state) {
        state[key] = "";
      }
      v$.value.$reset();
    }
  } else {
    $toast.error(
      "Erro ao cadastrar documento, preencha os campos obrigatorios."
    );
  }
}
function redirectToUpdate(item) {
  if (item) {
    selectedDoc.value = {
    ...item,
    data_emissao: formatToISO(item.data_emissao),
    data_vencimento: formatToISO(item.data_vencimento),
  }
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

  const { status } = await fetchWithToken(`${updateDoc}/${id}`, {
    method: "PUT",
    body: payloadFormated,
  });
  if (status.value === "success") {
    isModalOpen.value = false;
    $toast.success("Pessoa atualizada com sucesso!");
    refresh();
  }
}

async function deleteDocumento(item) {
  item.excluido = !item.excluido;
  try {
    await fetchWithToken(`${updateDoc}/${item.id}`, {
      method: "PUT",
      body: JSON.stringify({ excluido: item.excluido }),
    });
  } catch (error) {
    console.error("Erro ao excluir pessoa:", error);
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
