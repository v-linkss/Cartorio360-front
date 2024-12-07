<template>
  <h1>Reconhecimento por Autencidade</h1>
  <v-row class="mt-5">
    <v-col cols="5">
      <v-autocomplete
        label="Tabelião/escrevente"
        v-model="state.escrevente"
        :items="escreventesItems"
        item-title="nome"
        item-value="token"
        required
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
      >
        <template v-slot:item.actions="{ item }">
          <div
            style="display: flex; cursor: pointer; justify-content: flex-end"
            @click="redirectToFicha(item)"
            title="Visualizar Ficha"
          >
            <img
              style="width: 30px; height: 30px"
              src="../../../../assets/visualizar.png"
              alt="Visualizar"
            />
          </div>
        </template>
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
  <ModalRegistroPessoas
    :show="isModalRegistroOpen"
    @close="isModalRegistroOpen = false"
  />
  <ModalFichaCard
   :show="isModalFichaOpen"
   :item="selectedItem" 
   @confirmar="confirmItem(selectedItem)"
   @close="isModalFichaOpen = false"
  />
  <ErrorModalCard
    :show="errorModalVisible"
    :errorMessage="errorMessage"
    @close="errorModalVisible = false"
  />
  <v-row>
    <NuxtLink @click="goBack">
      <v-btn size="large" color="red">Voltar</v-btn>
    </NuxtLink>

      <v-btn
        class="ml-5"
        @click="reconhecerAtoAutencidade"
        size="large" 
        color="green"
      >Salvar</v-btn>
  </v-row>
</template>

<script setup>

const props = defineProps({
  ato_token: {
    type: String,
    required: true,
  },
});

const router = useRouter();
const route = useRoute();
const config = useRuntimeConfig();
const { $toast } = useNuxtApp();
const allEscreventes = `${config.public.auth}/service/gerencia/listarEscrevente`;
const procurarPessoa = `${config.public.auth}/service/gerencia/pesquisarPessoas`;
const reconhecerPessoa = `${config.public.auth}/service/gerencia/atoReconhecimento`;
const etiquetaAutencidade = `${config.public.auth}/service/gerencia/etiquetaAutenticidade`;
const cartorio_token = ref(useCookie("user-data").value.cartorio_token);
const ordemserv_token =
  ref(useCookie("user-service").value.token).value ||
  ref(useCookie("user-service").value).value;
const usuario_token = useCookie("auth_token").value;

const pessoasItems = ref([]);
const escreventesItems = ref([]);
const selectedObjects = ref([]);
const errorModalVisible = ref(false);
const isModalRegistroOpen = ref(false);
const isModalFichaOpen = ref(false);
const selectedItem = ref(null);
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

const { data } = await fetchWithToken(allEscreventes, {
  method: "POST",
  body: { cartorio_token: cartorio_token },
});
escreventesItems.value = data.value[0].func_json_escreventes;

async function searchPessoasService() {
  try {
    const { data: pessoasData, error } = await fetchWithToken(procurarPessoa, {
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
  isModalRegistroOpen.value = true;
};

function confirmItem(item) {
  selectedObjects.value.push(item);
}

const redirectToFicha = (item) =>{
  selectedItem.value = item;
  isModalFichaOpen.value = true
}

function removeFormValueFromTable(item) {
  selectedObjects.value = selectedObjects.value.filter(
    (pessoa) => pessoa.token !== item.token
  );

}

  async function reconhecerAtoAutencidade() {
    if (!state.escrevente) {
      $toast.error("Por favor selecione um Escrevente")
      return
    }
    try {
      const selectedTokens = selectedObjects.value.map((item) => {
        return { pessoa_token: item.token };
      });
      const { data, error, status } = await fetchWithToken(reconhecerPessoa, {
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
        reconhecerEtiquetaAutencidade(data.value[0].token);
        goBack();
      } else {
        errorModalVisible.value = true;
        errorMessage.value =
          ato_token.value.status_mensagem || error.value.data.details;
      }
    } catch (error) {
      console.error("Erro na requisição", error);
    }
  }


async function reconhecerEtiquetaAutencidade(token) {
  try {
    const { data, error, status } = await fetchWithToken(etiquetaAutencidade, {
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
