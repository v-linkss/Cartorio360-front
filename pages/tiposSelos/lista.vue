<script setup>
const config = useRuntimeConfig();
const getSelo = `${config.public.managemant}/tipo-selos`;
const updateSelo = `${config.public.managemant}/tipo-selos`;
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

function editSelo(item) {
  editForm.value = { ...item };
  isEditModalOpen.value = true;
}

async function HandleSubmitEdit() {
  try {
    const edicaoSelo = {
      uf: editForm.value.uf,
      cor: editForm.value.cor,
      descricao: editForm.value.descricao,
      vlr_compra: editForm.value.vlr_compra,
    };

    await useFetch(`${updateSelo}/${editForm.value.id}`, {
      method: "PUT",
      body: edicaoSelo,
    });
    location.reload();
    isEditModalOpen = false;
  } catch (error) {
    console.error("Erro ao atualizar pessoa:", error);
  }
}

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
    <NuxtLink to="/tiposSelos/criar-selo">
      <img class="btn-pointer" src="../../assets/novo.png" alt="Cadastro" />
    </NuxtLink>

    <v-data-table
      :items="selosList"
      :headers="headers"
      item-value="id"
    >
      <template #item.actions="{ item }">
        <v-row style="margin-top: -6px;">

          <div>
            <img
              @click="editSelo(item)"
              style="width: 30px; height: 30px;cursor: pointer;"
              src="../../assets/editar.png"
              alt="Atualizar"
            />
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
          <v-card-actions>
            <v-btn type="submit" color="green" size="large">Salvar</v-btn>
            <v-btn color="red" size="large" @click="isEditModalOpen = false"
              >Cancelar</v-btn
            >
          </v-card-actions>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
