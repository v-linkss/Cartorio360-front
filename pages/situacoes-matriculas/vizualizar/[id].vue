<template>
    <div v-if="!pending">
      <v-container class="data-container mt-16">
        <v-row no-gutters>
          <v-col>
            <v-sheet class="pa-2 ma-2">
              Descrição: {{ situacaoMatricula.descricao }}
            </v-sheet>
          </v-col>
          <v-col>
            <v-sheet class="pa-2 ma-2">
              Situação: : {{ situacaoMatricula.situacao }}
            </v-sheet>
          </v-col>
  
          <v-responsive width="100%"></v-responsive>
  
          <v-responsive width="100%"></v-responsive>
        </v-row>
      </v-container>
  </div>
  <NuxtLink class="mt-10" to="/situacoes-matriculas/lista">
     <v-btn size="large" color="red">Voltar</v-btn>
  </NuxtLink>
  </template>
  
  <script setup>
  const route = useRoute();
  const { id } = route.params;
  
  const config = useRuntimeConfig();
  const getSituacaoMatricula = `${config.public.managemant}/situacao-matriculas`

  const { data: situacaoMatricula, pending } = await useFetch(
`${getSituacaoMatricula}/${id}`,
  {
    method: 'GET',
    
  }
  );
  </script>
  
  <style scoped>
  .data-container {
    border: 1px solid black;
    border-radius: 8px;
    padding: 16px;
  }
  </style>
  