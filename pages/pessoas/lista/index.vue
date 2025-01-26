<template>
  <v-container v-if="status === 'success'" class="mt-5">
    <NuxtLink to="/pessoas/cadastro">
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
      :items="filteredPessoas"
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
            @click="deletePessoa(item)"
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
const pessoasLista = `${config.public.auth}/service/gerencia/getAllPessoa`;
const pessoasUpdate = `${config.public.auth}/service/gerencia/updatePessoa`;

const router = useRouter();

const search = ref("");
const searchDoc = ref("");

const headers = [
  { title: "Documento", value: "doc_identificacao" },
  { title: "Nome/Razão Social", value: "nome" },
  { value: "actions" },
];

const { data: pessoasItems, status } = await fetchWithToken(pessoasLista);

const filteredPessoas = computed(() => {
  return pessoasItems.value.filter((item) => {
    const docIdentificacao = item.doc_identificacao
      ? item.doc_identificacao.toLowerCase()
      : "";
    const nome = item.nome ? item.nome.toLowerCase() : "";

    const matchesDoc = docIdentificacao.includes(searchDoc.value.toLowerCase());
    const matchesNome = nome.includes(search.value.toLowerCase());

    return matchesDoc && matchesNome;
  });
});

async function deletePessoa(item) {
  item.excluido = !item.excluido;
  try {
    await fetchWithToken(`${pessoasUpdate}/${item.id}`, {
      method: "PUT",
      body: { excluido: item.excluido },
    });
  } catch (error) {
    console.error("Erro ao excluir pessoa:", error);
  }
}

function redirectToView(id) {
  router.push({ path: `/pessoas/vizualizar/${id}` });
}

function redirectToUpdate(id) {
  router.push({ path: `/pessoas/atualizar/${id}` });
}
</script>
