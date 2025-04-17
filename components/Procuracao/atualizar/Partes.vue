<template>
  <v-container>
    <v-row v-if="!isVisualizar" class="mt-5">
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

    <v-row v-if="!isVisualizar">
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
      <div v-if="!isVisualizar">
        <img
          class="mt-1"
          src="../../../assets/novo.png"
          style="width: 40px; cursor: pointer"
          title="Criar Representante"
          @click="createRepresentante"
        />

        <img
          class="mt-3 ml-2"
          src="../../../assets/visualizar.png"
          style="width: 40px; cursor: pointer"
          title="Visualisar Fixa"
          @click="isModalFichaOpen = true"
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
            <v-row v-if="!isVisualizar">
              <div
                style="
                  display: flex;
                  cursor: pointer;
                  justify-content: flex-end;
                "
                class="mr-1"
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
                style="
                  display: flex;
                  cursor: pointer;
                  justify-content: flex-end;
                "
                @click="redirectToPapel(item)"
                class="mr-1"
                title="Alterar Papel"
              >
                <img
                  style="width: 30px; height: 30px"
                  src="../../../assets/editar.png"
                  alt="Visualizar"
                />
              </div>
              <div
                class="mr-1"
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
              <div
                style="
                  display: flex;
                  cursor: pointer;
                  justify-content: flex-end;
                "
                class="mr-1"
                @click="redirectToRepresentante(item)"
                title="Selecionar Representante"
              >
                <img
                  style="width: 30px; height: 30px"
                  src="../../../assets/btn-pessoa.png"
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
    <ModalRepresentante
      :representante_nome="representante_nome"
      :representantes="pessoasRepresentantes"
      :ato_id="ato_pessoa_id"
      :show="isModalRepresentanteOpen"
      @close="isModalRepresentanteOpen = false"
      @updateRepresentante="atualizarRepresentante"
    />
    <ModalPapel
      :representante_nome="representante_nome"
      :ato_token="ato_token"
      :ato_id="ato_papel_id"
      :show="isModalPapelOpen"
      @close="isModalPapelOpen = false"
      @updatePapel="atualizarPapel"
    />
    <ModalFichaCard
    :show="isModalFichaOpen"
    :item="state.pessoa" 
    @confirmar="confirmItem(state.pessoa)"
    @close="isModalFichaOpen = false"
    />
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
const procurarPessoa = `${config.public.managemant}/pesquisarPessoas`;
const papeisApresentante = `${config.public.managemant}/listarPapeis`;
const buscarPessoa = `${config.public.managemant}/getLinkTipo`;
const criarAtoPessoa = `${config.public.managemant}/createAtosPessoa`;
const pessoasUpdate = `${config.public.managemant}/updateAtosPessoa`;
const getPartesId = `${config.public.managemant}/getAtosPessoaById`;
const baixarDocumento = `${config.public.managemant}/download`;
const cartorio_token = ref(useCookie("user-data").value.cartorio_token);
const isVisualizar = ref(route.query.origem === "vizualizar");

const pessoasItems = ref([]);
const pessoasTable = ref([]);
const papeisItems = ref([]);

const isModalRepresentanteOpen = ref(false);
const isModalRegistroOpen = ref(false);
const isModalFichaOpen = ref(false);
const isModalPapelOpen = ref(false);
const pessoasRepresentantes = ref(null);
const representante_nome = ref(null);
const ato_pessoa_id = ref(null);
const ato_papel_id = ref(null);
const representante_pessoa_id = ref(null);
const ato_token = ref(route.query.tipo_ato_token);
const fichaRender = ref(null);

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
    key: "representante.nome",
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
  body: { tipo_ato_token: route.query.tipo_ato_token },
});
papeisItems.value = data.value;

const getDadosPartes = async () => {
  const { data: dadosParte } = await useFetch(
    `${getPartesId}/${route.query.ato_id}`,
    {
      method: "GET",
    }
  );

  const transformarObjetos = (listaDePartes) => {
    return listaDePartes.map((parte) => ({
      ...parte,
      pessoa: {
        ...parte.pessoa,
        documento: parte.pessoa.doc_identificacao,
      },
      papel: {
        ...parte.partes_tipos,
      },
    }));
  };
  const listaTransformada = transformarObjetos(dadosParte.value);
  pessoasTable.value = listaTransformada;
};

getDadosPartes();
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

const atualizarPapel = async () => {
  await getDadosPartes();
};
const atualizarRepresentante = async () => {
  await getDadosPartes();
};

const createRepresentante = async () => {
  const representante = {
    pessoa: state.pessoa,
    papel: papeisItems.value.find((papel) => papel.id === state.papeis), // Objeto completo do papel
    representante: { nome: null },
  };

  const atosPessoas = await useFetch(`${getPartesId}/${route.query.ato_id}`, {
    method: "GET",
  });

  for (const element of atosPessoas.data.value) {
    if (
      element.pessoa_id === state.pessoa.id &&
      element.ato_id === Number(route.query.ato_id) &&
      element.tipo_parte_id === state.papeis
    ) {
      $toast.error("Pessoa Já Registrada Com Esse Papel!");
      return;
    }
  }

  const { data, error, status } = await useFetch(criarAtoPessoa, {
    method: "POST",
    body: {
      ato_id: Number(route.query.ato_id),
      pessoa_id: state.pessoa.id,
      tipo_parte_id: state.papeis,
      user_id: useCookie("user-data").value.usuario_id,
    },
  });
  if (status.value === "success") {
    representante.id = data.value.id;
    $toast.success("Pessoa Registrada com Sucesso!");
    pessoasTable.value.push(representante);
  } else {
    $toast.error(error.value.message);
  }
};

const redirectToFicha = async (item) => {
  isModalFichaOpen.value = true;

  fichaRender.value = null;

  if (!item.pessoa.id) return;

  const { data: imagemBiometria } = await useFetch(buscarPessoa, {
    method: "POST",
    body: { tipo: "ficha", id: item.pessoa.id },
  });

  if (!imagemBiometria.value?.link) return;

  const { data: link } = await useFetch(baixarDocumento, {
    method: "POST",
    body: {
      bucket: useCookie("user-data").value.cartorio_token,
      path: imagemBiometria.value.link,
    },
  });

  const linkMinio = imagemBiometria.value.link;
  const linkPayload = link.value;

  if (/\.(tr7|tiff)$/i.test(linkMinio)) {
    fichaRender.value = linkPayload;
  } else {
    fichaRender.value = linkPayload;
  }
};

const redirectToRepresentante = (item) => {
  const pessoasFiltradas = pessoasTable.value
    .filter((p) => p.pessoa.id !== item.pessoa.id)
    .map((p) => ({
      id: p.pessoa.id,
      nome: p.pessoa.nome,
    }));
  ato_pessoa_id.value = item.id;
  pessoasRepresentantes.value = pessoasFiltradas;
  isModalRepresentanteOpen.value = true;
  representante_nome.value = item.pessoa.nome;
  representante_pessoa_id.value = item.pessoa.id;
};

const redirectToPapel = (item) => {
  isModalPapelOpen.value = true;
  ato_papel_id.value = item.id;
  representante_nome.value = item.pessoa.nome;
};

async function deletePessoa(item) {
  item.excluido = !item.excluido;
  try {
    await useFetch(`${pessoasUpdate}/${item.id}`, {
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
  if (origem === "atualizar" || origem === "vizualizar") {
    router.push(`/os/atualizar/${id}`);
  } else {
    router.push("/os/criar-registro");
  }
};
</script>
