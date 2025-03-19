<script setup>
const config = useRuntimeConfig();
const updateSituacaoMatricula = `${config.public.managemant}/tipo-selos`;
const selo = `${config.public.managemant}/tipo-selos`;
const getUfs = `${config.public.managemant}/listarUF`;

const route = useRoute();
const { id } = route.params;

const form = ref({
  situacao: null,
  descricao: null,
});

const ufList = ref([]);

async function loadSeloData() {
  try {
    const { data: seloData } = await useFetch(`${selo}/${id}`, { method: "GET" });
    if (seloData.value) {
      form.value = {
        situacao: seloData.value.situacao,
        descricao: seloData.value.descricao,
      };
    }
  } catch (error) {
    console.error("Erro ao carregar os dados do selo:", error);
  }
}


await loadSeloData();

// Função para salvar as alterações
async function HandleSubmitEdit() {
  try {
    const edicaoSelo = {
      uf: form.value.uf,
      situacao: form.value.situacao,
      descricao: form.value.descricao,
      vlr_compra: form.value.vlr_compra.replace(/,/g, ""),
    };

    await useFetch(`${updateSituacaoMatricula}/${id}`, {
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
          <v-text-field
            v-model="form.situacao"
            label="situacao"
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
