<template>
  <v-container class="mt-5">
    <!-- Tabs -->
    <v-tabs v-model="activeTab">
      <v-tab value="ordens">Ordens de Serviço</v-tab>
      <v-tab value="lancamentos">Lançamentos</v-tab>
    </v-tabs>

    <v-window v-model="activeTab">
      <!-- Aba de Ordens de Serviço -->
      <v-window-item value="ordens">
        <OsComponent />
      </v-window-item>

      <!-- Aba de Lançamentos -->
      <v-window-item value="lancamentos">
        <LancamentosComponent />
      </v-window-item>
    </v-window>
  </v-container>
</template>

<script setup>
import OsComponent from "@/components/recebimentoOs/Os.vue"; 
import LancamentosComponent from "@/components/recebimentoOs/Lançamentos.vue"; 

const activeTab = ref("ordens"); // Aba inicial
const data = useCookie("caixa-service").value.data;
const nome_usuario = useCookie("caixa-service").value.usuario_nome;

const goBack = () => {
  navigateTo("/caixas/lista");
};
</script>
