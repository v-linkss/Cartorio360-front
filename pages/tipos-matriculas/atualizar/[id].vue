<script setup>
const config = useRuntimeConfig();
const updateSituacaoMatricula = `${config.public.managemant}/situacao-matriculas`;
const getSituacaoMatricula = `${config.public.managemant}/situacao-matriculas`;

const route = useRoute();
const { id } = route.params;

const { $toast } = useNuxtApp();

const form = ref({
  id: null,
  situacao: null,
  descricao: null,
  observacao: null,
});

const situacao_tipo = [
  { label: "ATIVA", value: "ATIVA"},
  { label: "UNIFICADA", value: "UNIFICADA" },
  { label: "DESMEMBRADA", value: "DESMEMBRADA" },
  { label: "COM RESTRIÇÃO", value: "COM RESTRIÇÃO" },
  { label: "CANCELADA", value: "CANCELADA" },
];

async function fetchSituacaoMatricula() {
  try {
    const { data: situacaomatriculaData } = await useFetch(`${getSituacaoMatricula}/${id}`, { method: "GET" });
    if (situacaomatriculaData.value) {
      form.value = {
        id: situacaomatriculaData.value.id,
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
    };

    await useFetch(`${updateSituacaoMatricula}/${id}`, {
      method: "PUT",
      body: edicaoSituacaoMatricula,
    });

    $toast.success("situação da matricula atulizada com sucesso");

    navigateTo('/tipos-matriculas/lista')
  } catch (error) {
    console.error("Erro ao atualizar a situação da matricula:", error);
    $toast.error("Erro ao atualizar situacao da matricula");
  }
}
</script>

<template>
  <v-container>
    <h1 class="mb-5">Edição de Situação matricula</h1>
    <v-form @submit.prevent="HandleSubmitEdit">
      <v-row>
        <v-col cols="6">
          <v-text-field label="CÓDIGO" v-model="form.id" outlined readonly/>
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
          <v-autocomplete
            v-model="form.situacao"
            style="width: 200px"
            :items="situacao_tipo"
            item-title="label"
            item-value="value"
            label="Tipo de situação"
            bg-color="#F6F6F6"
        >
        </v-autocomplete>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="6">
          <v-text-field v-model="form.observacao" label="Observação" outlined />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-btn size="large" color="red" to="/tipos-matriculas/lista">Voltar</v-btn>
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
