<template>
  <v-container>
    <v-autocomplete
      class="mt-5"
      style="width: 800px; margin-left: 150px"
      label="Selecione o ato"
      :items="pages"
      v-model="selectedPage"
    ></v-autocomplete>

  </v-container>
  <v-container>
    <component :is="selectedComponent" />
  </v-container>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import Testamento from "../fontes/atos/Testamento.vue";
import ReconhecimentoFirma from "../fontes/atos/ReconhecimentoFirma.vue";

const components = {
  ReconhecimentoFirma,
  Testamento,
};

const pages = [
  { title: "Reconhecimento de Firma", value: "ReconhecimentoFirma" },
  { title: "Testamento", value: "Testamento" },
];
const selectedPage = ref<string>("");
  console.log(useCookie('user-data'))
const selectedComponent = computed(() => {
  return components[selectedPage.value as keyof typeof components];
});
</script>

<style scoped>
.menu-texts .v-btn {
  color: #429946; /* Texto branco para contraste */
}
</style>
