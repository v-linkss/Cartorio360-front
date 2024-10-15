<template>
  <h1>Reconhecimento por Semelhança</h1>
  <v-row class="mt-5">
    <v-col cols="5">
      <v-autocomplete
        label="Tabelião/escrevente"
        v-model="state.escrevente"
        :items="escreventesItems"
        item-title="nome"
        item-value="token"
      >
      </v-autocomplete>
    </v-col>
    <v-col cols="2">
      <v-text-field label="Quantidade" type="number" v-model="state.quantidade">
      </v-text-field>
    </v-col>
  </v-row>

  <v-row>
    <v-col cols="3">
      <v-text-field label="Documento" v-model="state.documento"> </v-text-field>
    </v-col>
    <v-col cols="4">
      <v-text-field label="Pessoa" v-model="state.nome"> </v-text-field>
    </v-col>
    <div>
      <img
        class="btn-pointer mt-3"
        src="../../../../assets/visualizar.png"
        style="width: 40px; cursor: pointer"
        @click="searchPessoasService"
      />
    </div>
  </v-row>

  <v-row>
    <v-col class="mr-10">
      <v-data-table
        style="height: 465px"
        :headers="headers"
        :items="pessoasItems"
        show-select
        v-model="selectedPessoasSemelhanca"
        :item-value="
          (pessoasItems) =>
            `${pessoasItems.nome}-${pessoasItems.documento}-${pessoasItems.token}`
        "
        :onchange="updateSelectedPessoas(selectedPessoasSemelhanca)"
      >
      </v-data-table>
    </v-col>

    <v-col>
      <!-- Exibir os itens selecionados na segunda tabela -->
      <v-data-table
        :headers="headers"
        :items="selectedObjects"
        style="height: 465px"
        item-key="id"
      >
        <template v-slot:item.actions="{ item }">
          <div
            style="display: flex; justify-content: flex-end"
            @click="removeFormValueFromTable(item)"
            title="Remover"
          >
            <img
              style="width: 30px; height: 30px; cursor: pointer"
              src="../../../../assets/mudarStatus.png"
              alt="Remover"
            />
          </div>
        </template>
      </v-data-table>
    </v-col>
  </v-row>

  <v-row>
    <NuxtLink @click="goBack">
      <img
        class="btn-pointer mt-10 mb-5"
        src="../../../../assets/sair.png"
        alt="Sair"
        style="cursor: pointer"
      />
    </NuxtLink>

    <div>
      <img
        class="mt-10 mb-5"
        @click="reconhecerAtoSemelhanca"
        style="cursor: pointer"
        src="../../../../assets/salvar.png"
      />
    </div>
  </v-row>
</template>

<script setup>
const router = useRouter();
const route = useRoute();
const config = useRuntimeConfig();
const allEscreventes = `${config.public.managemant}/listarEscrevente`;
const procurarPessoa = `${config.public.managemant}/pesquisarPessoas`;
const reconhecerPessoa = `${config.public.managemant}/atoReconhecimento`;
const etiquetaSemelhanca = `${config.public.managemant}/etiquetaReconhecimento`;
const cartorio_token = ref(useCookie("user-data").value.cartorio_token);
const ordemserv_token =
  ref(useCookie("user-service").value.token).value ||
  ref(useCookie("user-service").value).value;
const usuario_token = useCookie("auth_token").value;

const pessoasItems = ref([]); // Itens da primeira tabela
const selectedPessoasSemelhanca = ref([]); // Itens selecionados para a segunda tabela
const selectedObjects = ref([]);

const headers = [
  {
    title: "Documento",
    align: "start",
    key: "documento",
  },
  {
    title: "Pessoa",
    align: "start",
    key: "nome", // Exibe o campo "nome"
  },
  { value: "actions" },
];

const state = reactive({
  quantidade: 1,
  escrevente: null,
  nome: null,
  documento: null,
});

const escreventesItems = ref([]);

// Requisição para buscar escreventes
const { data } = await useFetch(allEscreventes, {
  method: "POST",
  body: { cartorio_token: cartorio_token },
});
escreventesItems.value = data.value[0].func_json_escreventes;

async function searchPessoasService() {
  try {
    const { data: pessoasData, error } = await useFetch(procurarPessoa, {
      method: "POST",
      body: {
        cartorio_token: cartorio_token.value,
        documento: state.documento,
        nome: state.nome,
      },
    });
    if (pessoasData.value.length > 0) {
      pessoasItems.value = pessoasData.value;
    } else {
      pessoasItems.value = [];
    }
  } catch (error) {
    console.error("Erro na requisição", error);
  }
}

function updateSelectedPessoas(selectedItems) {
  if (selectedItems.length > 0) {
    selectedObjects.value = selectedItems.map((item) => {
      const [nome, documento, pessoa_token] = item.split("-");

      return {
        nome,
        documento: documento === "null" ? null : documento,
        pessoa_token,
      };
    });
  } else {
    console.log("Nenhum item selecionado");
  }
}

function removeFormValueFromTable(item) {
  selectedObjects.value = selectedObjects.value.filter(
    (pessoa) => pessoa.token !== item.token
  );
}

async function reconhecerAtoSemelhanca() {
  const selectedTokens = selectedObjects.value.map((item) => {
    return { pessoa_token: item.pessoa_token };
  });
  try {
    const { data, error } = await useFetch(reconhecerPessoa, {
      method: "POST",
      body: {
        pessoas: [selectedTokens],
        cartorio_token: cartorio_token.value,
        ordemserv_token: ordemserv_token,
        quantidade:state.quantidade,
        usuario_token: usuario_token,
        ato_tipo_token:"yXA3K"
      },
    });
    await reconhecerEtiquetaSemelhanca()
  } catch (error) {
    console.error("Erro na requisição", error);
  }
}

async function reconhecerEtiquetaSemelhanca() {
  try {
    const { data, error } = await useFetch(etiquetaSemelhanca, {
      method: "POST",
      body: {
        ato_token: [selectedTokens],
        cartorio_token: cartorio_token.value,
        escrevente_token: ordemserv_token,
      },
    });
  } catch (error) {
    console.error("Erro na requisição", error);
  }
}

const goBack = () => {
  const origem = route.query.origem || "criar";
  const id = route.query.id;
  if (origem === "atualizar") {
    router.push(`/ordens-servicos/atualizar/${id}`);
  } else {
    router.push("/ordens-servicos/criar-registro");
  }
};
</script>
