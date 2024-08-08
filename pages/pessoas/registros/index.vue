<template>
  <v-container v-if="!pending" class="mt-5">
    <NuxtLink to="/pessoas">
      <img class="btn-pointer" src="../../../assets/novo.png" alt="Sair" />
    </NuxtLink>
    <v-data-table :headers="headers" :items="pessoasItems" item-key="id">
      <template v-slot:item.actions="{ item }">
        <v-row>
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
            title="Visualizar"
          >
            <img
              style="width: 40px; height: 40px"
              src="../../../assets/editar.png"
              alt="Visualizar"
            />
          </div>
          <div
            class="btn-pointer"
            @click="deletePessoa(item)"
            title="Visualizar"
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
              src="../../../assets/trash.png"
              alt="Excluir"
              class="trash-icon"
              style="width: 40px; height: 40px"
              title="Excluir"
            />
          </div>
        </v-row>
      </template>
    </v-data-table>

    <NuxtLink to="/pessoas/registro">
      <img src="../../../assets/sair.png" alt="Sair" />
    </NuxtLink>
  </v-container>
</template>

<script setup>
const config = useRuntimeConfig();
const pessoasLista = `${config.public.managemant}/getAllPessoa`
const pessoasUpdate = `${config.public.managemant}/deletePessoa`

const router = useRouter();
const headers = [
  { title: "Documento", value: "doc_identificacao" },
  { title: "Nome/Razão Social", value: "nome" },
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
