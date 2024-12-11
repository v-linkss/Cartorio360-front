<script setup>
const config = useRuntimeConfig();
const getSelo = `${config.public.managemant}/tipo-selos`;
const updateSelo = `${config.public.managemant}/tipo-selos`;
const findSelo = `${config.public.managemant}/tipo-selos`;
const deleteSelo = `${config.public.managemant}/tipo-selos-delete`;
const getUfs = `${config.public.managemant}/uf`;

const selos = ref([]);
const isEditModalOpen = ref(false);
const ufList = ref([]);

const editForm = ref({
  id: null,
  uf: "",
  cor: "",
  descricao: "",
  vlr_compra: null,
});

const { data: ufs } = await useFetch(getUfs, { method: "GET" });
ufList.value = ufs.value;

const { data: selosList } = await useFetch(getSelo, { method: "GET" });
selos.value = selosList.value;

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
    <v-data-table
      :items="selosList"
      :headers="headers"
      item-value="id"
    >
      <template #item.actions="{ item }">
        <v-row style="margin-top: -6px;">

          <div>
          <nuxt-link :to="`/tiposSelos/atualizar/${item.id}`">
            <img
              style="width: 30px; height: 30px;cursor: pointer;"
              src="../../assets/editar.png"
              alt="Atualizar"
            />
          </nuxt-link>
          </div>
  
          <div @click="HandleDeleteSelo(item)" title="Deletar">
            <img
              v-if="item.excluido"
              style="width: 30px; height: 30px;cursor: pointer; margin-left: 7px;"
              src="../../assets/excluido.png"
              alt="Visualizar"
              title="Reativar"
            />
            <img
              v-else
              src="../../assets/mudarStatus.png"
              alt="Excluir"
              class="trash-icon"
              style="width: 30px; height: 30px;cursor: pointer;margin-left: 7px;"
              title="Excluir"
            />
          </div>
        </v-row>
      </template>
    </v-data-table>
  </v-container>

  <v-dialog v-model="isEditModalOpen" max-width="500">
    <v-card>
      <v-card-title>
        <span class="text-h6">Editar Selo</span>
      </v-card-title>
      <v-card-text>
        <v-form @submit.prevent="HandleSubmitEdit">
          <v-autocomplete
            v-model="editForm.uf"
            :items="ufList"
            class="mb-5"
            item-title="descricao"
            item-value="sigla"
            label="UF"
            required
            outlined
          />
          <v-text-field v-model="editForm.cor" label="Cor" required outlined />
          <v-text-field
            v-model="editForm.descricao"
            label="Descrição"
            required
            outlined
          />
          <MoneyInput required v-model="editForm.vlr_compra" />
          <v-row>
            <v-btn type="submit" color="green" size="large">Salvar</v-btn>
            <v-btn color="red" size="large" @click="isEditModalOpen = false"
              >Cancelar</v-btn
            >
          </v-row>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
