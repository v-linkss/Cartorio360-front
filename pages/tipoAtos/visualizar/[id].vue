<template>
  <div v-if="!pending">
    <v-container class="data-container mt-16">
      <v-row no-gutters>
        <!-- <v-col cols="12" md="6">
          <v-sheet class="pa-2 ma-2">Pai ID: {{ atoTipo.pai_id }}</v-sheet>
        </v-col> -->

        <!-- <v-col cols="12" md="6">
          <v-sheet class="pa-2 ma-2">Ato Tipo TJ: {{ atoTipo.ato_tipo_tj_id }}</v-sheet>
        </v-col> -->

        <v-col cols="12" md="6">
          <v-sheet class="pa-2 ma-2">Descrição: {{ atoTipo.descricao }}</v-sheet>
        </v-col>
        
        <!-- <v-col cols="12" md="6">
          <v-sheet class="pa-2 ma-2">Livro: {{ atoTipo.livro_id ?? 'Não informado' }}</v-sheet>
        </v-col> -->
        
        <v-col cols="12" md="6">
          <v-sheet class="pa-2 ma-2">Usa Imóveis: {{ atoTipo.usa_imoveis ? 'Sim' : 'Não' }}</v-sheet>
        </v-col>
        <v-col cols="12" md="6">
          <v-sheet class="pa-2 ma-2">quantiade Limite de Folhas: {{ atoTipo.qtd_limite_folhas }}</v-sheet>
        </v-col>
        
        <v-col cols="12" md="6">
          <v-sheet class="pa-2 ma-2">Valor Adicional Folhas: {{ atoTipo.vlr_adicional_folhas }}</v-sheet>
        </v-col>
        <v-col cols="12" md="6">
          <v-sheet class="pa-2 ma-2">Texto Padrão Etiqueta: {{ atoTipo.texto_padrao_etiqueta || 'Não informado' }}</v-sheet>
        </v-col>
      </v-row>
    </v-container>
  </div>
  
  <NuxtLink class="mt-10" to="/tipoAtos/lista">
    <v-btn size="large" color="red">Voltar</v-btn>
  </NuxtLink>
</template>

<script setup>
const route = useRoute();
const { id } = route.params;

const config = useRuntimeConfig();
const getTipoAto = `${config.public.managemant}/tipo-atos`;

const { data: atoTipo, pending } = await fetchWithToken(`${getTipoAto}/${id}`);
</script>

<style scoped>
.data-container {
  border: 1px solid black;
  border-radius: 8px;
  padding: 16px;
}
</style>
