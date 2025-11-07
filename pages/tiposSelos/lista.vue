<script setup>
const config = useRuntimeConfig();
const getSelo = `${config.public.managemant}/tipo-selos`;
const deleteSelo = `${config.public.managemant}/tipo-selos`;
const getUfs = `${config.public.managemant}/listarUF`;

const selos = ref([]);
const ufList = ref([]);

const { data: ufs } = await useFetch(getUfs, { method: "GET" });
ufList.value = ufs.value;

const { data: selosList } = await useFetch(getSelo, { method: "GET" });
selos.value = selosList.value.data;

const headers = [
  { title: "ID", value: "id" },
  { title: "UF", value: "uf" },
  { title: "Cor", value: "cor" },
  { title: "Descrição", value: "descricao" },
  { title: "Valor", value: "vlr_compra" },
  { title: "Ações", value: "actions", sortable: false },
];

async function HandleDeleteSelo(item) {
  item.excluido = !item.excluido;

  const updatedItem = JSON.stringify({ excluido: item.excluido });

  try {
    const { error } = await useFetch(`${deleteSelo}/${item.id}`, {
      method: "PUT",
      body: updatedItem,
    });
  } catch (err) {
    console.error("Erro ao excluir selo:", err);
  }
}
</script>

<template>
  <v-container>
    <v-row class="mb-5 mt-5">
      <NuxtLink to="/tiposSelos/cadastro">
        <img class="btn-pointer" src="../../assets/novo.png" alt="Cadastro" />
      </NuxtLink>
      <h1 class="mt-3 ml-3">Tipos de Selos</h1>
    </v-row>
    <v-data-table :items="selos" :headers="headers" item-value="id">
      <template #item.actions="{ item }">
        <v-row style="margin-top: -6px">
          <div>
            <nuxt-link :to="`/tiposSelos/atualizar/${item.id}`">
              <img
                style="width: 30px; height: 30px; cursor: pointer"
                src="../../assets/editar.png"
                alt="Atualizar"
              />
            </nuxt-link>
          </div>

          <div @click="HandleDeleteSelo(item)" title="Deletar">
            <img
              v-if="item.excluido"
              style="
                width: 30px;
                height: 30px;
                cursor: pointer;
                margin-left: 7px;
              "
              src="../../assets/excluido.png"
              alt="Visualizar"
              title="Reativar"
            />
            <img
              v-else
              src="../../assets/mudarStatus.png"
              alt="Excluir"
              class="trash-icon"
              style="
                width: 30px;
                height: 30px;
                cursor: pointer;
                margin-left: 7px;
              "
              title="Excluir"
            />
          </div>
        </v-row>
      </template>
    </v-data-table>
  </v-container>
</template>
