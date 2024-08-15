<template>
  <v-container v-if="!pending" class="mt-5">
    <NuxtLink to="/pessoas">
      <img class="btn-pointer" src="../../../assets/novo.png" alt="Cadastro" />
    </NuxtLink>
    <v-row style="gap: 2rem;">
      <v-text-field
        class="mt-7 mb-4"
        v-model="search"
        label="Pessoa"
        prepend-inner-icon="mdi-magnify"
        variant="outlined"
        hide-details
        single-line
      ></v-text-field>
      <v-text-field
        class="mt-7 mb-4"
        v-model="searchDoc"
        label="Documento"
        prepend-inner-icon="mdi-magnify"
        variant="outlined"
        hide-details
        single-line
      ></v-text-field>
    </v-row>
    <v-data-table :search="search" :headers="headers" :items="pessoasItems" item-key="id">
      <template v-slot:item.actions="{ item }">
        <v-row style="display: flex;gap: 10px; justify-content: flex-end">
          <div
            class="btn-pointer"
            @click="redirectToView(item.id)"
            title="Visualizar"
          >
            <img
              style="width: 40px; height: 40px"
              src="../../../assets/visualizar.png"
              alt="Visualizar"
            />
          </div>
          <div
            class="btn-pointer"
            @click="redirectToUpdate(item.id)"
            title="Atualizar"
          >
            <img
              style="width: 40px; height: 40px"
              src="../../../assets/editar.png"
              alt="Atualizar"
            />
          </div>
          <div
            class="btn-pointer"
            @click="deletePessoa(item)"
            title="Deletar"
          >
            <img
              v-if="item.excluido"
              style="width: 40px; height: 40px"
              src="../../../assets/excluido.png"
              alt="Visualizar"
              title="Reativar"
            />
            <img
              v-else
              src="../../../assets/mudarStatus.png"
              alt="Excluir"
              class="trash-icon"
              style="width: 40px; height: 40px"
              title="Excluir"
            />
          </div>
        </v-row>
      </template>
    </v-data-table>
    <NuxtLink to="/home">
      <img src="../../../assets/sair.png" alt="Sair" />
    </NuxtLink>
  </v-container>
</template>

<script setup>
const config = useRuntimeConfig();
const pessoasLista = `${config.public.managemant}/getAllPessoa`
const pessoasUpdate = `${config.public.managemant}/deletePessoa`

const router = useRouter();

const search = ref('')
const searchDoc = ref('')

const headers = [
  { title: "Documento", value: "doc_identificacao", search: "", },
  { title: "Nome/Razão Social", value: "nome", search: "", },
  { value: "actions" },
];
const { data: pessoasItems, pending } = await useLazyFetch(
  pessoasLista
);

async function deletePessoa(item) {
  item.excluido = !item.excluido;
  try {
    await useFetch(`${pessoasUpdate}/${item.id}`, {
      method: 'PUT',
      body: JSON.stringify({ excluido: item.excluido }),
    });
  } catch (error) {
    console.error('Erro ao excluir pessoa:', error);
  }
}

function redirectToView(id) {
  router.push({ path: `/pessoas/vizualizar/${id}` });
}

function redirectToUpdate(id) {
  router.push({ path: `/pessoas/atualizar/${id}` });
}
</script>

<style scoped>
.btn-pointer {
  cursor: pointer;
}
</style>
