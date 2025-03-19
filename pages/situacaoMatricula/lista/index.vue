<template>
  <v-container v-if="status === 'success'" class="mt-5">
    <NuxtLink to="/situacaoMatricula/cadastro">
      <img
        style="cursor: pointer"
        src="../../../assets/novo.png"
        alt="Cadastro"
      />
    </NuxtLink>
    <v-row style="gap: 3rem">
      <div style="width: 200px">
        <v-text-field
          class="mt-7 mb-4"
          v-model="searchDoc"
          label="Documento"
          prepend-inner-icon="mdi-magnify"
          variant="outlined"
          hide-details
        ></v-text-field>
      </div>
      <div style="width: 300px">
        <v-text-field
          class="mt-7 mb-4"
          v-model="search"
          label="Pessoa"
          prepend-inner-icon="mdi-magnify"
          variant="outlined"
          hide-details
        ></v-text-field>
      </div>
    </v-row>
    <v-data-table
      density="compact"
      :headers="headers"
      :items="filteredSituacaoMatricula"
      item-key="id"
    >
      <template v-slot:item.actions="{ item }">
        <v-row style="display: flex; gap: 10px; justify-content: flex-end">
          <div
            style="cursor: pointer"
            @click="redirectToView(item.id)"
            title="Visualizar"
          >
            <img
              style="width: 30px; height: 30px"
              src="../../../assets/visualizar.png"
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
              src="../../../assets/editar.png"
              alt="Atualizar"
            />
          </div>
          <div
            style="cursor: pointer"
            @click="deleteSituacaoMatricula(item)"
            title="Deletar"
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
  </v-container>
</template>

<script setup>
const config = useRuntimeConfig();
const situacaoLista = `${config.public.managemant}/listar_situacao_matriculas`;
const situacaoUpdate = `${config.public.managemant}/situacao-matriculas`;

const usuario_token = ref(useCookie("auth_token").value) || null;
const cartorio_token = ref(useCookie("user-data").value.cartorio_token) || null;

const router = useRouter();

const search = ref("");
const searchDoc = ref("");

const headers = [
  { title: "Descrição", value: "descricao" },
  { title: "Situação", value: "situacao" },
  { value: "actions" },
];

const cartorioTokenPayload = {
    cartorio_token: cartorio_token.value,
    // user_token: usuario_token.value
}

const { data: situacaoMatricula, status } = await useFetch(`${situacaoLista}`,{
    method:'POST',
    body: cartorioTokenPayload
});

console.log('sitaucao matricula', situacaoMatricula.value)

const filteredSituacaoMatricula = computed(() => {
  if (!situacaoMatricula.value) return [];

  return situacaoMatricula.value.filter((item) => {
    const situacaomatriculaDescricao = item.situacao_descricao?.toLowerCase() ?? "";
    const situacao = item.situacao?.toLowerCase() ?? "";

    return situacaomatriculaDescricao.includes(searchDoc.value.toLowerCase()) &&
           situacao.includes(search.value.toLowerCase());
  });
});


console.log('filtro', filteredSituacaoMatricula.value)

async function deleteSituacaoMatricula(item) {
  item.excluido = !item.excluido;
  try {
    await fetchWithToken(`${situacaoUpdate}/${item.id}`, {
      method: "PUT",
      body: { excluido: item.excluido },
    });
  } catch (error) {
    console.error("Erro ao excluir pessoa:", error);
  }
}

function redirectToView(id) {
  router.push({ path: `/situacaoMatricula/vizualizar/${id}` });
}

function redirectToUpdate(id) {
  router.push({ path: `/situacaoMatricula/atualizar/${id}` });
}
</script>
