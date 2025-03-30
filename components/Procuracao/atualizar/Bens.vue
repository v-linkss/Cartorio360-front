<template>
  <v-container>
    <v-col class="mt-5" cols="12" v-if="!isVisualizar">
      <v-textarea label="Descrição" v-model="state.descricao"> </v-textarea>
    </v-col>

    <v-row class="ml-1 mb-3" v-if="!isVisualizar">
      <v-col class="mt-6" cols="8">
        <v-autocomplete
          label="Selecione o Tipo"
          :items="state.tiposBens"
          v-model="state.tipo_id"
          item-title="descricao"
          item-value="id"
        >
        </v-autocomplete>
      </v-col>
      <v-col class="ml-5" cols="3">
        <label>Valor</label>
        <MoneyInput v-model="state.vlr_alienacao" />
      </v-col>
      <div >
        <img
          class="mt-7 ml-4"
          src="../../../assets/novo.png"
          style="width: 40px; cursor: pointer"
          title="Criar Representante"
          @click="createTiposDeBens"
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
        <template v-slot:item.descricao="{item}">
            <h3 style="width: 800px; font-weight: 500">
          {{ item.descricao }}
        </h3>
        </template>
          <template v-slot:item.actions="{ item }">
            <v-row style="margin-top: -8px;" justify="end">
              <div
                style="cursor: pointer"
                class="mr-2"
                @click="redirectToFicha(item)"
                title="Visualizar Ficha"
              >
                <img
                  style="width: 30px; height: 30px"
                  src="../../../assets/visualizar.png"
                  alt="Visualizar"
                />
              </div>
              <div
                style="cursor: pointer"
                class="mr-2"
                @click="redirectToUpdateBens(item.id)"
                title="Alterar Papel"
              >
                <img
                  style="width: 30px; height: 30px"
                  src="../../../assets/editar.png"
                  alt="Editar"
                />
              </div>
              <div
                style="cursor: pointer"
                class="mr-2"
                @click="deletePessoa(item)"
                title="Deletar Pessoa"
              >
                <img
                  v-if="item.excluido"
                  style="width: 30px; height: 30px"
                  src="../../../assets/excluido.png"
                  alt="Reativar"
                  title="Reativar"
                />
                <img
                  v-else
                  src="../../../assets/mudarStatus.png"
                  alt="Excluir"
                  style="width: 30px; height: 30px"
                  title="Excluir"
                />
              </div>
            </v-row>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
    <v-dialog v-model="isModalOpen" max-width="600px">
      <v-card>
        <v-card-title style="color: green">Atualizar Bem</v-card-title>
        <v-card-text>
          <v-col class="mt-1" cols="12">
            <v-textarea label="Descrição" v-model="selectedBem.descricao">
            </v-textarea>
          </v-col>
          <v-row>
            <v-col class="mt-6 ml-3" cols="8">
              <v-autocomplete
                label="Selecione o Tipo"
                :items="state.tiposBens"
                v-model="selectedBem.tipo_id"
                item-title="descricao"
                item-value="id"
              >
              </v-autocomplete>
            </v-col>
            <v-col class="ml-5" cols="3">
              <label>Valor</label>
              <MoneyInput v-model="selectedBem.vlr_alienacao" />
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green" text @click="isModalOpen = false"
            >Cancelar</v-btn
          >
          <v-btn color="green" text @click="updateAtosBensModal(selectedBem.id)"
            >Salvar</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-row>
      <NuxtLink @click="goBack">
        <v-btn size="large" color="red">Voltar</v-btn>
      </NuxtLink>
    </v-row>
  </v-container>
</template>

<script setup>

const router = useRouter();
const route = useRoute();
const config = useRuntimeConfig();
const { $toast } = useNuxtApp();
const createAtosBens = `${config.public.managemant}/atos_bens`;
const updateAtosBens = `${config.public.managemant}/atos_bens`;
const getAtosBens = `${config.public.managemant}/listarBens`;
const listarBens = `${config.public.managemant}/listarTipoBens`;
const cartorio_token = ref(useCookie("user-data").value.cartorio_token);
const user_id = ref(useCookie("user-data").value.usuario_id).value;
const isVisualizar = ref(route.query.origem === 'vizualizar');

const pessoasTable = ref([]);
const selectedBem = ref([]);
const isModalOpen = ref(false);

const headers = [
  {
    title: "Descrição",
    align: "start",
    key: "descricao",
  },
  {
    title: "Valor",
    align: "end",
    key: "vlr_alienacao",
  },
  { align: "end", value: "actions" },
];

const state = reactive({
  vlr_alienacao: null,
  descricao: null,
  tipo_id: null,
  tiposBens: [],
});

const createTiposDeBens = async () => {
  if (!state.vlr_alienacao && !state.descricao) {
    $toast.error("Os campos Descrição e Valor são Obrigatorios!");
    return;
  }
  const { data, status } = await useFetch(`${createAtosBens}`, {
    method: "POST",
    body: {
      descricao: state.descricao,
      tipo_id: state.tipo_id,
      valor_mercado: '0.00',
      vlr_alienacao: state.vlr_alienacao.replace(/,/g, ""),
      user_id: user_id,
      ato_id: Number.parseInt(route.query.ato_id),
      token: route.query.ato_token_edit,
    },
  });
  if (status.value === "success") {
    $toast.success("Bem registrado com sucesso!");
    pessoasTable.value.push(data.value);
    Object.assign(state, {
      vlr_alienacao: null,
      descricao: null,
      tipo_id: null,
    });
  }
};

const updateAtosBensModal = async (id) => {
 const {status} = await useFetch(`${updateAtosBens}/${id}`, {
    method: "PUT",
    body: {
      descricao: selectedBem.value.descricao,
      tipo_id: selectedBem.value.tipo_id,
      vlr_alienacao: selectedBem.value.vlr_alienacao.replace(/,/g, ""),
    },
  });
  if(status.value === 'success'){
    $toast.success('Bem Atualizado com sucesso!')
    isModalOpen.value = false
  }
};

const redirectToUpdateBens = (id) => {
  const bem = pessoasTable.value.find((item) => item.id === id);
  if (bem) {
    selectedBem.value = bem;
    isModalOpen.value = true;
  }
};

const { data } = await useFetch(`${listarBens}`, {
  method: "POST",
  body: { cartorio_token: cartorio_token.value, imoveis: false },
});
state.tiposBens = data.value;

const { data: bensPayload } = await useFetch(
  `${getAtosBens}`,
  {
    method: "POST",
    body:{ato_token:route.query.ato_token_edit}
  }
  
);
pessoasTable.value =
  bensPayload.value && Object.keys(bensPayload.value).length === 0
    ? []
    : bensPayload.value;

async function deletePessoa(item) {
  item.excluido = !item.excluido;
  try {
    await useFetch(`${updateAtosBens}/${item.id}`, {
      method: "PUT",
      body: JSON.stringify({ excluido: item.excluido }),
    });
  } catch (error) {
    console.error("Erro ao excluir pessoa:", error);
  }
}

const goBack = () => {
  const origem = route.query.origem || "criar";
  const id = route.query.id;
  if (origem === "atualizar" || origem === "vizualizar"){
    router.push(`/os/atualizar/${id}`);
  } else {
    router.push("/os/criar-registro");
  }
};
</script>
