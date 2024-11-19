<template>
  <h1 class="mb-2">Procuração</h1>
  <v-card width="1300">
    <v-tabs v-model="tab" bg-color="#C8FCCA">
      <v-tab value="dados">Dados</v-tab>
      <v-tab v-if="showTabs" value="partes">Partes</v-tab>
      <v-tab v-if="showTabs" value="texto">Texto</v-tab>
      <v-tab v-if="showTabs" value="imagem">Imagem</v-tab>
      <v-tab v-if="showTabs" value="observacao">Observações</v-tab>
      <v-tab v-if="showTabs" value="anexo">Anexos</v-tab>
    </v-tabs>

    <v-tabs-window v-model="tab">
      <v-tabs-window-item value="dados">
        <ProcuracaoDados />
      </v-tabs-window-item>
      <v-tabs-window-item v-if="showTabs" value="partes">
        <ProcuracaoPartes />
      </v-tabs-window-item>
      <v-tabs-window-item v-if="showTabs" value="texto">
        <ProcuracaoTexto/>
      </v-tabs-window-item>
      <v-tabs-window-item v-if="showTabs" value="imagem">
        <ProcuracaoImagem/>
      </v-tabs-window-item>
      <v-tabs-window-item v-if="showTabs" value="observacao">
        <ProcuracaoObservacao/>
      </v-tabs-window-item>
      <v-tabs-window-item v-if="showTabs" value="anexo">
        <ProcuracaoAnexos/>
      </v-tabs-window-item>
    </v-tabs-window>
  </v-card>
</template>

<script setup>

const tab = ref(null);
const showTabs = ref(true);
const autocompleteDisabled = ref(false);

const initialState = {
  tipo_pessoa: "FISICA",
};

const state = reactive({
  ...initialState,
});

const handleSave = () => {
  showTabs.value = true;
  autocompleteDisabled.value = true; 
};
</script>

<style scoped></style>
