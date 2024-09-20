<template>
  <v-container>
    <v-row>
      <v-autocomplete
        class="mr-5"
        label="Selecione o ato"
        :items="pages"
        v-model="selectedPage"
      ></v-autocomplete>
      <v-autocomplete

      ></v-autocomplete>
    </v-row>
  </v-container>
  <v-container>
    <component :is="selectedComponent" />
  </v-container>
  <NuxtLink  to="/OrdensServico/criar-registro">
      <img class="btn-pointer mt-10" src="../../assets/sair.png" alt="Sair" />
    </NuxtLink>
</template>

<script setup lang="ts">
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
const selectedComponent = computed(() => {
  return components[selectedPage.value as keyof typeof components];
});
</script>

<style scoped>
.menu-texts .v-btn {
  color: #429946;
}
</style>
