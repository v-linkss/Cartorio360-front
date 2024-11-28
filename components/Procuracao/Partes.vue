<template>
  <v-container>
    <v-row class="mt-5">
      <v-col cols="3">
        <v-text-field label="Documento" v-model="state.documento">
        </v-text-field>
      </v-col>
      <v-col cols="4">
        <v-text-field label="Pessoa" v-model="state.nome"> </v-text-field>
      </v-col>
      <div>
        <img
          class="btn-pointer mt-3"
          src="../../assets/visualizar.png"
          style="width: 40px; cursor: pointer"
          title="Pesquisar Pessoa"
          @click="searchPessoasService"
        />
      </div>
      <div>
        <img
          class="btn-pointer mt-3 ml-2"
          src="../../assets/novo.png"
          style="width: 40px; cursor: pointer"
          title="Criar Pessoa"
          @click="createPessoa"
        />
      </div>
    </v-row>

    <v-row>
      <v-col cols="4">
        <v-autocomplete
          label="Selecione a Pessoa"
          v-model="state.pessoa"
          :items="pessoasItems"
          item-title="nome"
          item-value="id"
          return-object
          required
        >
        </v-autocomplete>
      </v-col>
      <v-col cols="3">
        <v-autocomplete
          label="Papel"
          v-model="state.papeis"
          :items="papeisItems"
          item-title="descricao"
          item-value="id"
          required
        >
        </v-autocomplete>
      </v-col>
      <div>
        <img
          class="btn-pointer mt-3"
          src="../../assets/novo.png"
          style="width: 40px; cursor: pointer"
          title="Criar Representante"
          @click="createRepresentante"
        />
      </div>
    </v-row>

    <v-row>
      <v-col>
        <v-data-table
          style="height: 465px"
          :headers="headers"
          :items="pessoasTable"
        >
          <template v-slot:item.actions="{ item }">
            <v-row>
              <div
                style="
                  display: flex;
                  cursor: pointer;
                  justify-content: flex-end;
                "
                class="mr-2"
                @click="redirectToFicha(item)"
                title="Visualizar Ficha"
              >
                <img
                  style="width: 30px; height: 30px"
                  src="../../assets/visualizar.png"
                  alt="Visualizar"
                />
              </div>
              <div
                style="
                  display: flex;
                  cursor: pointer;
                  justify-content: flex-end;
                "
                @click="redirectToFicha(item)"
                class="mr-2"
                title="Alterar Papel"
              >
                <img
                  style="width: 30px; height: 30px"
                  src="../../assets/editar.png"
                  alt="Visualizar"
                />
              </div>
              <div
                class="mr-2"
                style="
                  display: flex;
                  cursor: pointer;
                  justify-content: flex-end;
                "
                @click="deletePessoa(item)"
                title="Deletar Pessoa"
              >
                <img
                  style="width: 30px; height: 30px"
                  src="../../assets/mudarStatus.png"
                  alt="Visualizar"
                />
              </div>
              <div
                style="
                  display: flex;
                  cursor: pointer;
                  justify-content: flex-end;
                "
                class="mr-2"
                @click="redirectToRepresentante(item)"
                title="Selecionar Representante"
              >
                <img
                  style="width: 30px; height: 30px"
                  src="../../assets/btn-pessoa.png"
                  alt="Visualizar"
                />
              </div>
            </v-row>
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
    </v-row>
  </v-container>
</template>

<script setup>
const props = defineProps({
  ato_token: {
    type: String,
    required: true,
  },
  ato_id: {
    type: Number,
    required: true,
  },
});

const router = useRouter();
const route = useRoute();
const config = useRuntimeConfig();
const { $toast } = useNuxtApp();
const procurarPessoa = `${config.public.managemant}/pesquisarPessoas`;
const criarAtoPessoa = `${config.public.managemant}/createAtosPessoa`;
const papeisApresentante = `${config.public.managemant}/listarPapeis`;
const cartorio_token = ref(useCookie("user-data").value.cartorio_token);
const ordemserv_token =
  ref(useCookie("user-service").value.token).value ||
  ref(useCookie("user-service").value).value;
const usuario_token = useCookie("auth_token").value;

const pessoasItems = ref([]);
const pessoasTable = ref([]);
const papeisItems = ref([]);
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
    key: "pessoa.documento",
  },
  {
    title: "Pessoa",
    align: "start",
    key: "pessoa.nome",
  },
  {
    title: "Papel",
    align: "start",
    key: "papel.descricao",
  },
  {
    title: "Representante",
    align: "start",
    key: "nome",
  },
  { value: "actions" },
];

const state = reactive({
  papeis: null,
  nome: null,
  pessoa: null,
  documento: null,
});

const { data } = await useFetch(papeisApresentante, {
  method: "POST",
  body: { tipo_ato_token: props.ato_token },
});
papeisItems.value = data.value;

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
      state.pessoa = pessoasItems.value[0];
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

const createRepresentante = async () => {
  const representante = {
    pessoa: state.pessoa,
    papel: papeisItems.value.find((papel) => papel.id === state.papeis), // Objeto completo do papel
  };
  // const { data, error, status } = await useFetch(criarAtoPessoa, {
  //   method: "POST",
  //   body: {
  //     ato_id: props.ato_id,
  //     pessoa_id: state.pessoa.id,
  //     tipo_parte_id: state.papeis,
  //     user_id: useCookie("user-data").value.usuario_id,
  //   },
  // });
  console.log(representante);
  pessoasTable.value.push(representante);
};

function confirmItem(item) {
  selectedObjects.value.push(item);
}

const redirectToFicha = (item) => {
  selectedItem.value = item.pessoa.id;
  isModalFichaOpen.value = true;
};

async function reconhecerAtoAutencidade() {}

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
