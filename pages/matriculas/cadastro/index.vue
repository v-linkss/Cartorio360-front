<template>
  <v-card width="1300">
    <h1 style="background-color: #f5f2f2; color: #525050; padding: 5px 0px 0px 20px">
      Cadastramento de Matriculas
    </h1>

    <v-tabs v-model="tab" bg-color="#f5f2f2">
      <v-tab value="dados">Dados</v-tab>
      <v-tab v-if="showTabs" value="endereco">Endereços</v-tab>
    </v-tabs>

    <v-tabs-window v-model="tab">
      <v-tabs-window-item value="dados">
        <DadosMatricula @saved="handleSave" />
      </v-tabs-window-item>
      <v-tabs-window-item v-if="showTabs" value="endereco">
        <Endereco />
      </v-tabs-window-item>
    </v-tabs-window>
  </v-card>
</template>

<script setup>

const tab = ref("dados");
const showTabs = ref(false);
const autocompleteDisabled = ref(false);

const handleSave = () => {
  showTabs.value = true;
  autocompleteDisabled.value = true;
};

</script>
