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
        <ProcuracaoDados @saved="handleSave" :ato_token="selectedAto" />
      </v-tabs-window-item>
      <v-tabs-window-item v-if="showTabs" value="partes">
        <ProcuracaoPartes :ato_token="selectedAto" :ato_id="ato_id_prop"/>
      </v-tabs-window-item>
      <v-tabs-window-item v-if="showTabs" value="texto">
        <ProcuracaoTexto style="height: 1000px;"/>
      </v-tabs-window-item>
      <v-tabs-window-item v-if="showTabs" value="imagem">
        <ProcuracaoImagem />
      </v-tabs-window-item>
      <v-tabs-window-item v-if="showTabs" value="observacao">
        <ProcuracaoObservacao :ato_id="ato_id_prop" />
      </v-tabs-window-item>
      <v-tabs-window-item v-if="showTabs" value="anexo">
        <ProcuracaoAnexos />
      </v-tabs-window-item>
    </v-tabs-window>
  </v-card>
</template>

<script setup>
const props = defineProps({
  ato_token: {
    type: String,
    required: true,
  },
});

const ato_id_prop = ref(null);
const tab = ref(null);
const showTabs = ref(false);
const selectedAto = ref(props.ato_token);

const handleSave = (atoId) => {
  ato_id_prop.value = atoId;
  showTabs.value = true;
};
</script>

<style scoped></style>
