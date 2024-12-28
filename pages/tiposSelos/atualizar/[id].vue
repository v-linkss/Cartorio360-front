<script setup>
const config = useRuntimeConfig();
const updateSelo = `${config.public.managemant}/tipo-selos`;
const selo = `${config.public.managemant}/tipo-selos`;
const getUfs = `${config.public.managemant}/listarUF`;

const route = useRoute();
const { id } = route.params; // Obtém o ID da rota

// Estado para o formulário
const form = ref({
  uf: null,
  cor: null,
  descricao: null,
  vlr_compra: null,
});

// Lista de UFs
const ufList = ref([]);

// Função para carregar os dados do selo
async function loadSeloData() {
  try {
    const { data: seloData } = await useFetch(`${selo}/${id}`, { method: "GET" });
    if (seloData.value) {
      form.value = {
        uf: seloData.value.uf,
        cor: seloData.value.cor,
        descricao: seloData.value.descricao,
        vlr_compra: seloData.value.vlr_compra,
      };
    }
  } catch (error) {
    console.error("Erro ao carregar os dados do selo:", error);
  }
}

// Carrega a lista de UFs e os dados do selo ao montar o componente
const { data: ufs } = await useFetch(getUfs, { method: "GET" });
ufList.value = ufs.value;

await loadSeloData();

// Função para salvar as alterações
async function HandleSubmitEdit() {
  try {
    const edicaoSelo = {
      uf: form.value.uf,
      cor: form.value.cor,
      descricao: form.value.descricao,
      vlr_compra: form.value.vlr_compra,
    };

    await useFetch(`${updateSelo}/${id}`, {
      method: "PUT",
      body: edicaoSelo,
    });

    navigateTo("/tiposSelos/lista")
  } catch (error) {
    console.error("Erro ao atualizar o selo:", error);
  }
}
</script>

<template>
  <v-container>
    <h1 class="mb-5">Edição de Tipo de Selo</h1>
    <v-form @submit.prevent="HandleSubmitEdit">
      <v-row>
        <v-col cols="3">
          <v-autocomplete
            v-model="form.uf"
            :items="ufList"
            item-title="descricao"
            item-value="sigla"
            label="UF"
            required
            outlined
          />
        </v-col>
        <v-col cols="3">
          <v-text-field
            v-model="form.cor"
            label="Cor"
            required
            outlined
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="6">
          <v-text-field
          v-model="form.descricao"
          label="Descrição"
          required
          outlined
        />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="3">
          <MoneyInput required v-model="form.vlr_compra" />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-btn size="large" color="red" to="/tiposSelos/lista">Voltar</v-btn>
          <v-btn
            type="submit"
            class="ml-4"
            size="large"
            color="green"
          >
            Salvar
          </v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>
