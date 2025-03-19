<template>
  <div v-if="!pending">
    <v-container class="data-container mt-16">
      <v-row no-gutters>
        <v-col>
          <v-sheet class="pa-2 ma-2">
            Descrição: {{ situacaomatriculaData?.descricao || "N/A" }}
          </v-sheet>
        </v-col>
        <v-col>
          <v-sheet class="pa-2 ma-2">
            Situação: {{ situacaomatriculaData?.situacao || "N/A" }}
          </v-sheet>
        </v-col>
        <v-col>
          <v-sheet class="pa-2 ma-2">
            Observação: {{ situacaomatriculaData?.observacao || "N/A" }}
          </v-sheet>
        </v-col>
        <v-col>
          <v-sheet class="pa-2 ma-2">
            Excluído: {{ situacaomatriculaData?.excluido ? "Sim" : "Não" }}
          </v-sheet>
        </v-col>

        <v-responsive width="100%"></v-responsive>

        <v-col>
          <v-sheet class="pa-2 ma-2">
            Tipo Pessoa: {{ situacaomatriculaData?.tipo_pessoa || "N/A" }}
          </v-sheet>
        </v-col>

        <v-col>
          <v-sheet class="pa-2 ma-2">
            Profissão: {{ situacaomatriculaData?.profissao || "N/A" }}
          </v-sheet>
        </v-col>

        <v-responsive width="100%"></v-responsive>
      </v-row>
    </v-container>
  </div>
  <NuxtLink class="mt-10" to="/situacaoMatricula/lista">
    <v-btn size="large" color="red">Voltar</v-btn>
  </NuxtLink>
</template>

<script setup>
import { ref } from "vue";
import { useRoute, useFetch, useRuntimeConfig } from "#imports";

const route = useRoute();
const { id } = route.params;

const config = useRuntimeConfig();
const getSituacaoMatricula = `${config.public.managemant}/situacao-matriculas`;

const situacaomatriculaData = ref(null);
const pending = ref(true);

async function fetchSituacaoMatricula() {
  try {
    const { data, pending: fetchPending } = await useFetch(
      `${getSituacaoMatricula}/${id}`,
      { method: "GET" }
    );

    situacaomatriculaData.value = data.value;
    pending.value = fetchPending.value;
  } catch (error) {
    console.error("Erro ao carregar os dados da situação da matrícula:", error);
  }
}

await fetchSituacaoMatricula();
</script>

<style scoped>
.data-container {
  border: 1px solid black;
  border-radius: 8px;
  padding: 16px;
}
</style>
