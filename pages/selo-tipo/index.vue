<script setup>
const config = useRuntimeConfig();
const getSelo = `${config.public.managemant}/tipo-selos`;
const updateSelo = `${config.public.managemant}/tipo-selos`;
const findByIdSelo = `${config.public.managemant}/tipo-selos`;
const deleteSelo = `${config.public.managemant}/tipo-selos`;
const getUfs = `${config.public.managemant}/uf`;

const selos = ref([])
const isEditModalOpen = ref(false); 
const ufList = ref([])

const editForm = ref({
    id: null,
    uf: '',
    cor: '',
    descricao: '',
    vlr_compra: null
})

const { data: ufs } = await useFetch(getUfs, {method: 'GET'})
ufList.value = ufs.value
console.log(ufList)

const { data: selosList } = await useFetch(getSelo, {method: 'GET'})
selos.value = selosList.value
console.log(selos)

const headers = [
  { title: 'ID', value: 'id' },
  { title: 'UF', value: 'uf' },
  { title: 'Cor', value: 'cor' },
  { title: 'Descrição', value: 'descricao' },
  { title: 'Valor', value: 'vlr_compra' },
  { title: 'Ações', value: 'actions', sortable: false },
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
      valor: editForm.value.vlr_compra,
    }

    await useFetch(`${updateSelo}/${editForm.value.id}`,{
      method: "PUT",
      body: edicaoSelo
    }
    )
    location.reload()
    console.log(edicaoSelo, editForm.value.id)
    isEditModalOpen = false; 
  } catch (error) {
    console.error('Erro ao atualizar pessoa:', error);
  }
}

async function HandleDeleteSelo(id) {
  try {
    await useFetch(`${deleteSelo}/${id}`, {method: 'DELETE'})
    selos.value = selos.value.filter(selo => selo.id !== id);
  } catch (err) {
    alert('Erro ao deletar selo', err)
  }
}
</script>

<template>
    <v-contaier>
        <v-card>
          <v-card-title class="d-flex justify-space-between align-center">
            <h2>Lista de Selos</h2>
            <v-btn to="/selo-tipo/criar-selo">Criar selo</v-btn>
          </v-card-title>
          <v-data-table
            :items="selos"
            :headers="headers"
            class="elevation-1"
            item-value="id"
          >
            <template #item.actions="{ item }">
              <v-btn icon @click="editSelo(item)">
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
              <v-btn icon @click="HandleDeleteSelo(item.id)">
                <div class="btn-pointer" @click="deletePessoa(item)" title="Deletar">
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
              </v-btn>
            </template>
          </v-data-table>
        </v-card>
    </v-contaier>
    

    <!-- Modal de edição -->
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
                item-title="descricao"
                item-value="sigla"
                label="UF"
                required
                outlined
                />
                <v-text-field
                v-model="editForm.cor"
                label="Cor"
                required
                outlined
                />
                <v-text-field
                v-model="editForm.descricao"
                label="Descrição"
                required
                outlined
                />
                <MoneyInput required v-model="editForm.vlr_compra" />
                <v-card-actions>
                <v-btn type="submit" color="primary">Salvar</v-btn>
                <v-btn text @click="isEditModalOpen = false">Cancelar</v-btn>
                </v-card-actions>
            </v-form>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>