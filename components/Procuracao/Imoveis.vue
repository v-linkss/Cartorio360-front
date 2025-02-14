<template>
  <v-container class="mt-5">
    <img
      @click="isModalCadastroImoveisOpen = true"
      style="cursor: pointer"
      src="../../assets/novo.png"
      alt="Cadastro"
    />
    <v-row style="gap: 3rem">
      <div style="width: 200px">
        <v-text-field
          class="mt-7 mb-4"
          v-model="searchMatricula"
          label="Matrícula"
          prepend-inner-icon="mdi-magnify"
          variant="outlined"
          hide-details
        ></v-text-field>
      </div>
      <div style="width: 300px">
        <v-text-field
          class="mt-7 mb-4"
          v-model="search"
          label="Descrição"
          prepend-inner-icon="mdi-magnify"
          variant="outlined"
          hide-details
        ></v-text-field>
      </div>
    </v-row>
    <v-data-table
      density="compact"
      :headers="headers"
      :items="filteredImoveis"
      item-key="id"
    >
    <template v-slot:item.descricao="{ item }">
            <h3 style="width: 800px; font-weight: 500">
              {{ item.descricao }}
            </h3>
          </template>
      <template v-slot:item.actions="{ item }">
        <v-row style="display: flex; gap: 10px; justify-content: flex-end">
          <div
            style="cursor: pointer"
            @click="redirectToView(item.id)"
            title="Visualizar"
          >
            <img
              style="width: 30px; height: 30px"
              src="../../assets/visualizar.png"
              alt="Visualizar"
            />
          </div>
          <div
            style="cursor: pointer"
            @click="redirectToUpdate(item.id)"
            title="Atualizar"
          >
            <img
              style="width: 30px; height: 30px"
              src="../../assets/editar.png"
              alt="Atualizar"
            />
          </div>
          <div
            style="cursor: pointer"
            @click="deletePessoa(item)"
            title="Deletar"
          >
            <img
              v-if="item.excluido"
              style="width: 30px; height: 30px"
              src="../../assets/excluido.png"
              alt="Visualizar"
              title="Reativar"
            />
            <img
              v-else
              src="../../assets/mudarStatus.png"
              alt="Excluir"
              class="trash-icon"
              style="width: 30px; height: 30px"
              title="Excluir"
            />
          </div>
        </v-row>
      </template>
    </v-data-table>
    <NuxtLink @click="goBack">
        <v-btn size="large" color="red">Voltar</v-btn>
      </NuxtLink>
    <ModalImoveisCadastro
     @refresh="atualizarListaImoveis"
      :ato_id="props.ato_id"
      :ato_token="props.ato_token"
      :ato_token_selected="props.ato_token_selected"
      :show="isModalCadastroImoveisOpen"
      @close="isModalCadastroImoveisOpen = false"
    />
    <ModalImoveisAtualizar
    @refresh="atualizarListaImoveis"
    :imovel_id="idImovel"
    :show="isModalAtualizarImoveisOpen"
    @close="isModalAtualizarImoveisOpen = false"/>
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
  ato_token_selected: {
    type: String,
    required: true,
  },
});
const config = useRuntimeConfig();
const imoveisUpdate = `${config.public.auth}/service/gerencia/atos_bens`;
const imoveisLista = `${config.public.auth}/service/gerencia/atos_imoveis`;
const router = useRouter();
const route = useRoute();

const search = ref("");
const searchMatricula = ref("");
const isModalCadastroImoveisOpen = ref(false);
const isModalAtualizarImoveisOpen = ref(false);
const idImovel = ref(null)

const headers = [
  { title: "Matrícula", value: "registro_matricula" },
  { title: "Descrição", value: "descricao" },
  { value: "actions" },
];
const { data: imoveisItems, status } = await fetchWithToken(imoveisLista, {
  method:"POST",
  body: { ato_token: props.ato_token },
});

const filteredImoveis = computed(() => {
  if(Object.keys(imoveisItems.value).length === 0){
    return
  }
 
  return imoveisItems.value.filter((item) => {
    const matriculaSearch = item.matricula
      ? item.matricula.toLowerCase()
      : "";
    const descricao = item.descricao ? item.descricao.toLowerCase() : "";

    const matchesMatricula = matriculaSearch.includes(searchMatricula.value.toLowerCase());
    const matchesDescricao = descricao.includes(search.value.toLowerCase());

    return matchesMatricula && matchesDescricao;
  });
});
async function deletePessoa(item) {
  item.excluido = !item.excluido;
  try {
    await fetchWithToken(`${imoveisUpdate}/${item.id}`, {
      method: "PUT",
      body: { excluido: item.excluido },
    });
  } catch (error) {
    console.error("Erro ao excluir pessoa:", error);
  }
}

function redirectToUpdate(id) {
  idImovel.value = id
  isModalAtualizarImoveisOpen.value = true
}

const atualizarListaImoveis = async () => {
 await fetchWithToken(imoveisLista, {
  method:"POST",
  body: { ato_token: props.ato_token },
});
};

const goBack = () => {
  const origem = route.query.origem || "criar";
  const id = route.query.id;
  if (origem === "atualizar") {
    router.push(`/os/atualizar/${id}`);
  } else {
    router.push("/os/criar-registro");
  }
};
</script>
