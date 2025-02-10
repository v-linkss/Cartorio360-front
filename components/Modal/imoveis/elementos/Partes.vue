<template>
  <v-container>
    <v-row>
      <v-col class="mt-6" cols="4">
        <v-autocomplete
          label="Selecione a Pessoa"
          v-model="state.pessoa"
          :items="pessoasItems"
          item-title="pessoa_nome"
          item-value="id"
          return-object
          required
        >
        </v-autocomplete>
      </v-col>
      <v-col class="mt-6" cols="3">
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
      <v-col cols="1">
        <label>%</label>
        <MoneyInput v-model="state.percentual"></MoneyInput>
      </v-col>
      <div>
        <img
          class="mt-7"
          src="../../../../assets/novo.png"
          style="width: 40px; cursor: pointer"
          title="Criar Imovel"
          @click="createImovel"
        />
      </div>
    </v-row>

    <v-row>
      <v-col>
        <v-data-table
          style="height: 385px"
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
                  src="../../../../assets/visualizar.png"
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
                class="mr-2"
                title="Alterar Papel"
              >
                <img
                  style="width: 30px; height: 30px"
                  src="../../../../assets/editar.png"
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
                  v-if="item.excluido"
                  style="width: 30px; height: 30px"
                  src="../../../../assets/excluido.png"
                  alt="Visualizar"
                  title="Reativar"
                />
                <img
                  v-else
                  src="../../../../assets/mudarStatus.png"
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

    <ModalImoveisElementosAtualizarPartes
      :partes_imovel="imovelItem"
      :ato_token="ato_token"
      :ato_id="ato_papel_id"
      :show="isModalPapelOpen"
      @close="isModalPapelOpen = false"
      @updateImovel="atualizarPapel"
    />
    <v-dialog v-model="isModalFichaOpen" width="600">
      <v-card max-width="600" title="Ficha">
        <TiffViewer :tiff-url="fichaRender" />
        <v-btn
          class="ms-auto mt-3 mb-3"
          text="Fechar"
          size="large"
          color="red"
          @click="isModalFichaOpen = false"
        ></v-btn>
      </v-card>
    </v-dialog>
    <v-row class="mt-5">
      <NuxtLink @click="goBack">
        <v-btn size="large" color="red">Voltar</v-btn>
      </NuxtLink>
      <v-btn class="ml-5" size="large" color="green">Salvar</v-btn>
    </v-row>
  </v-container>
</template>

<script setup>
const props = defineProps({
  ato_token: {
    type: String,
  },
  ato_token_selected: {
    type: String,
  },
  ato_id: {
    type: Number,
  },
  isUpdate: {
    type: Boolean,
  },
  imovel_id: {
    type: Number,
  },
});

const emit = defineEmits(["saved", "close-modal"]);
const route = useRoute();
const config = useRuntimeConfig();
const { $toast } = useNuxtApp();
const listarPartesAtos = `${config.public.managemant}/partes_atos`;
const papeisApresentante = `${config.public.managemant}/listarPapeis`;
const buscarPessoa = `${config.public.managemant}/getLinkTipo`;
const criarParteImovelPessoa = `${config.public.managemant}/bens_pessoa`;
const getPartesId = `${config.public.managemant}/bens_pessoa`;
const baixarDocumento = `${config.public.managemant}/download`;

const imovelItem = ref(null)
const pessoasItems = ref([]);
const pessoasTable = ref([]);
const papeisItems = ref([]);

const isModalFichaOpen = ref(false);
const isModalPapelOpen = ref(false);
const ato_papel_id = ref(null);
const ato_token = ref(route.query.tipo_ato_token);
const fichaRender = ref(null);

const headers = [
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
    title: "%",
    align: "start",
    key: "percentual",
  },
  { value: "actions" },
];

const state = reactive({
  papeis: null,
  percentual: null,
});

const { data } = await useFetch(papeisApresentante, {
  method: "POST",
  body: { tipo_ato_token: props.ato_token_selected || route.query.tipo_ato_token },
});
papeisItems.value = data.value;

const getDadosPartes = async () => {
  const { data: dadosParte } = await useFetch(
    `${getPartesId}/${props.imovel_id}`,
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

const atualizarPapel = async () => {
  await getDadosPartes();
};

const { data: parteAtos, status } = await useFetch(listarPartesAtos, {
  method: "POST",
  body: {
    ato_token: props.ato_token || route.query.ato_token_edit,
  },
});
pessoasItems.value =
  parteAtos.value && Object.keys(parteAtos.value).length === 0
    ? []
    : parteAtos.value;

const createImovel = async () => {
  const representante = {
    pessoa: {nome:state.pessoa.pessoa_nome},
    papel: papeisItems.value.find((papel) => papel.id === state.papeis),
    percentual: state.percentual,
  };

  const { data, status } = await useFetch(criarParteImovelPessoa, {
    method: "POST",
    body: {
      bem_id: props.imovel_id,
      ato_id: Number(route.query.ato_id),
      pessoa_id: state.pessoa.pessoa_id,
      tipo_parte_id: state.papeis,
      user_id: useCookie("user-data").value.usuario_id,
      percentual: state.percentual,
    },
  });
  if (status.value === "success") {
    representante.id = data.value.id;
    $toast.success("Pessoa Registrada com Sucesso!");
    pessoasTable.value.push(representante);
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
    body: { bucket: "qvgjz", path: imagemBiometria.value.link },
  });

  const linkMinio = imagemBiometria.value.link;
  const linkPayload = link.value;

  if (/\.(tr7|tiff)$/i.test(linkMinio)) {
    fichaRender.value = linkPayload;
  } else {
    fotoRender.value = `data:image/jpeg;base64,${linkPayload}`;
  }
};

const redirectToPapel = (item) => {
  isModalPapelOpen.value = true;
  imovelItem.value = item
  ato_papel_id.value = item.id;
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
  emit("close-modal");
};
</script>
