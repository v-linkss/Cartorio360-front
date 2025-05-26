<template>
  <v-container>
    <v-row>
      <v-col class="mt-1">
        <v-text-field
          v-model="state.data_inicio"
          label="Abertura de"
          placeholder="dd/mm/yyyy"
          v-mask="'##/##/####'"
        ></v-text-field>
      </v-col>
      <v-col class="mt-1">
        <v-text-field
          v-model="state.data_fim"
          label="Abertura até"
          placeholder="dd/mm/yyyy"
          v-mask="'##/##/####'"
        ></v-text-field>
      </v-col>
      <v-col>
        <SaveButton :text="'Confirmar'" />
      </v-col>
    </v-row>
    <v-card>
      <v-card-title>Dados CENSEC</v-card-title>
    </v-card>
  </v-container>
</template>
<script setup>
const state = reactive({
  data_inicio: null || getCurrentDate(),
  data_fim: null || getCurrentDate(),
});
function getCurrentDate() {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");
  return `${dd}-${mm}-${yyyy}`;
}
</script>
