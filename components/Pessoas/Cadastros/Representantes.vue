<template>
  <v-container style="height: 425px">
    <v-row class="mt-1">
      <v-col cols="3">
        <v-text-field label="Documento" v-model="state.documento">
        </v-text-field>
      </v-col>
      <v-col cols="4">
        <v-text-field label="Pessoa" v-model="state.nome"> </v-text-field>
      </v-col>
      <div>
        <img
          class="mt-1"
          src="../../../assets/visualizar.png"
          style="width: 40px; cursor: pointer"
          title="Pesquisar Pessoa"
          @click="searchPessoasService"
        />
      </div>
      <div>
        <img
          class="mt-1 ml-2"
          src="../../../assets/novo.png"
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
          class="mt-1"
          src="../../../assets/novo.png"
          style="width: 40px; cursor: pointer"
          title="Criar Representante"
          @click="createRepresentante"
        />
      </div>
    </v-row>
    <v-row>
      <v-col>
        <v-data-table
          style="max-height: 330px;"
          :headers="headers"
          :items="pessoasTable"
        >
          <template v-slot:item.actions="{ item }">
            <v-row>
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
                  v-if="item.excluido"
                  style="width: 30px; height: 30px"
                  src="../../../assets/excluido.png"
                  alt="Visualizar"
                  title="Reativar"
                />
                <img
                  v-else
                  src="../../../assets/mudarStatus.png"
                  alt="Excluir"
                  class="trash-icon"
                  style="width: 30px; height: 30px"
                  title="Excluir"
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
  </v-container>
  <NuxtLink @click="voltar">
      <v-btn size="large" class="ml-10 mb-5" color="red">Voltar</v-btn>
    </NuxtLink>
</template>

<script setup>
const props = defineProps({
  isModal: {
    type: Boolean,
    default: false,
  },
});

const config = useRuntimeConfig();
const { $toast } = useNuxtApp();
const route = useRoute();
const router = useRouter();
const procurarPessoa = `${config.public.managemant}/pesquisarPessoas`;
const papeisApresentante = `${config.public.managemant}/listarPapeis`;
const criarAtoPessoa = `${config.public.managemant}/representante`;
const buscarRepresentante = `${config.public.managemant}/representante`;
const pessoasUpdate = `${config.public.managemant}/representante`;
const cartorio_token = ref(useCookie("user-data").value.cartorio_token);
const pessoa_id = Number(useCookie("pessoa-id").value || id);
const { id } = route.params;

const pessoasItems = ref([]);
const pessoasTable = ref([]);
const papeisItems = ref([]);

const isModalRegistroOpen = ref(false);

const headers = [
  {
    title: "Documento",
    align: "start",
    key:"representante",
    value: (item) => item.representante?.doc_identificacao || item.representante?.documento,
  },
  {
    title: "Pessoa",
    align: "start",
    key: "representante.nome",
  },
  {
    title: "Papel",
    align: "start",
    key: "papel.descricao",
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
  body: { rotina: "CADASTRO_PJ" },
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
    representante: state.pessoa,
    papel: papeisItems.value.find((papel) => papel.id === state.papeis),
  };
  try {
    const { data, error, status } = await useFetch(criarAtoPessoa, {
      method: "POST",
      body: {
        ato_id: null,
        representante_id: state.pessoa.id,
        pessoa_id: pessoa_id || id,
        papel_id: state.papeis,
        user_id: useCookie("user-data").value.usuario_id,
      },
    });

    if (status.value === "success") {
      representante.id = data.value.id;
      $toast.success("Pessoa Registrada com Sucesso!");
      pessoasTable.value.push(representante);
    } else {
      $toast.error("Erro ao registrar a pessoa!");
    }
  } catch (error) {
    $toast.error("Erro no servidor. Tente novamente.");
  }
};

async function loadRepresentanteData() {
  const { data, error } = await useFetch(`${buscarRepresentante}/${id}`, {
    method: "GET",
  });
pessoasTable.value =data.value
}

async function deletePessoa(item) {
  item.excluido = !item.excluido;
  console.log(item.excluido)
  try {
    await useFetch(`${pessoasUpdate}/${item.id}`, {
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

onMounted(() => {
  if (id) {
    loadRepresentanteData();
  }
});
</script>
