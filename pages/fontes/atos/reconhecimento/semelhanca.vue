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
        required
        :error-messages="v$.escrevente.$errors.map((e) => e.$message)"
        @blur="v$.escrevente.$touch"
        @input="v$.escrevente.$touch"
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
          title="Pesquisar Pessoa"
          @click="searchPessoasService"
        />
      </div>
      <div>
      <img
        class="btn-pointer mt-3 ml-2"
        src="../../../../assets/novo.png"
        style="width: 40px; cursor: pointer"
        title="Criar Pessoa"
        @click="createPessoa"
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
<ModalRegistroPessoas :show="isModalRegistroOpen" @close="isModalRegistroOpen = false"/>
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
        class="mt-10 mb-5 ml-10"
        @click="reconhecerAtoSemelhanca"
        style="cursor: pointer"
        src="../../../../assets/salvar.png"
      />
    </div>
  </v-row>
  <ErrorModalCard
    :show="errorModalVisible"
    :errorMessage="errorMessage"
    @close="errorModalVisible = false"
  />
</template>

<script setup>
import { useVuelidate } from "@vuelidate/core";
import { helpers, required } from "@vuelidate/validators";

const props = defineProps({
  ato_token:{
    type: String,
    required: true
  }
});

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

const pessoasItems = ref([]);
const selectedPessoasSemelhanca = ref([]);
const escreventesItems = ref([]);
const selectedObjects = ref([]);
const errorModalVisible = ref(false);
const isModalRegistroOpen = ref(false);
const errorMessage = ref("");

const headers = [
  {
    title: "Documento",
    align: "start",
    key: "documento",
  },
  {
    title: "Pessoa",
    align: "start",
    key: "nome",
  },
  { value: "actions" },
];

const state = reactive({
  quantidade: 1,
  escrevente: null,
  nome: null,
  documento: null,
});

const rules = {
  escrevente: {
    required: helpers.withMessage("O campo é obrigatorio", required),
  },
};

const v$ = useVuelidate(rules, state);

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

const createPessoa = () => {
  isModalRegistroOpen.value = true
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
    (pessoa) => pessoa.pessoa_token !== item.pessoa_token
  );
  selectedPessoasSemelhanca.value = selectedPessoasSemelhanca.value.filter(
    (pessoa) => pessoa !== `${item.nome}-${item.documento}-${item.pessoa_token}`
  );
}

async function reconhecerAtoSemelhanca() {
  if (await v$.value.$validate()) {
    const selectedTokens = selectedObjects.value.map((item) => {
      return { pessoa_token: item.pessoa_token };
    });
    try {
      const { data, error, status } = await useFetch(reconhecerPessoa, {
        method: "POST",
        body: {
          pessoas: selectedTokens,
          cartorio_token: cartorio_token.value,
          ordemserv_token: ordemserv_token,
          quantidade: state.quantidade,
          usuario_token: usuario_token,
          ato_tipo_token: props.ato_token,
        },
      });
      if (status.value === "success" && data.value[0].status === "OK") {
        reconhecerEtiquetaSemelhanca(data.value[0].token);
      } else {
        errorModalVisible.value = true;
        errorMessage.value =
          ato_token.value.status_mensagem || error.value.data.details;
      }
    } catch (error) {
      console.error("Erro na requisição", error);
    }
  }
}

async function reconhecerEtiquetaSemelhanca(token) {
  try {
    const { data, error, status } = await useFetch(etiquetaSemelhanca, {
      method: "POST",
      body: {
        ato_token: token,
        cartorio_token: cartorio_token.value,
        escrevente_token: state.escrevente,
      },
    });
    if (status.value === "success") {
      const newWindow = window.open("", "_blank");
      newWindow.document.open();
      newWindow.document.write(data.value[0].etiqueta);
      newWindow.document.close();
    }
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
