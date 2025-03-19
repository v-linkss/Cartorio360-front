<script setup>
const config = useRuntimeConfig();
const updateSituacaoMatricula = `${config.public.managemant}/situacao-matriculas`;
const getSituacaoMatricula = `${config.public.managemant}/situacao-matriculas`;

const route = useRoute();
const { id } = route.params;

const userData = ref(useCookie("user-data").value || {});

const form = ref({
  situacao: null,
  descricao: null,
  observacao: null,
});


async function fetchSituacaoMatricula() {
  try {
    const { data: situacaomatriculaData } = await useFetch(`${getSituacaoMatricula}/${id}`, { method: "GET" });
    if (situacaomatriculaData.value) {
      form.value = {
        situacao: situacaomatriculaData.value.situacao,
        descricao: situacaomatriculaData.value.descricao,
        observacao: situacaomatriculaData.value.observacao,
      };
    }
  } catch (error) {
    console.error("Erro ao carregar os dados da situação da matricula:", error);
  }
}

await fetchSituacaoMatricula();

async function HandleSubmitEdit() {
  try {
    const edicaoSituacaoMatricula = {
      situacao: form.value.situacao,
      descricao: form.value.descricao,
      observacao: form.value.observacao,
      user_alteracao_id: userData.value.usuario_id,
    };

    console.log(edicaoSituacaoMatricula)

    await useFetch(`${updateSituacaoMatricula}/${id}`, {
      method: "PUT",
      body: edicaoSituacaoMatricula,
    });
    console.log("Atualizando situação matrícula ID:", id);


    navigateTo("/situacaoMatricula/lista")
  } catch (error) {
    console.error("Erro ao atualizar a situação da matricula:", error);
  }
}
</script>

<template>
  <v-container>
    <h1 class="mb-5">Edição de Situação matricula</h1>
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
        <v-col cols="6">
          <v-text-field
          v-model="form.observacao"
          label="Obervação"
          required
          outlined
        />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-btn size="large" color="red" to="/situacaoMatricula/lista">Voltar</v-btn>
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
