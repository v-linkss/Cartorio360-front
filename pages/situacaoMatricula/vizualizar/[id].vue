<template>
    <div v-if="!pending">
      <v-container class="data-container mt-16">
        <v-row no-gutters>
          <v-col>
            <v-sheet class="pa-2 ma-2">
              Documento: {{ situacaoMatricula.descricao }}
            </v-sheet>
          </v-col>
          <v-col>
            <v-sheet class="pa-2 ma-2">
              Nome/Razão Social : {{ situacaoMatricula.situacao }}
            </v-sheet>
          </v-col>
  
          <v-responsive width="100%"></v-responsive>
  
          <v-responsive width="100%"></v-responsive>
        </v-row>
      </v-container>
  </div>
  <NuxtLink class="mt-10" to="/pessoas/lista">
     <v-btn size="large" color="red">Voltar</v-btn>
  </NuxtLink>
  </template>
  
  <script setup>
  const route = useRoute();
  const { id } = route.params;
  
  const config = useRuntimeConfig();
  const getSituacaoMatricula = `${config.public.auth}/situacao-matricula`
  
  const { data: situacaoMatricula, pending } = await fetchWithToken(
    `${getSituacaoMatricula}/${id}`
  );
  </script>
  
  <style scoped>
  .data-container {
    border: 1px solid black;
    border-radius: 8px;
    padding: 16px;
  }
  </style>
  