<template>
    <h1 class="mb-2">Procuração</h1>
    <v-card width="1300">
      <v-tabs v-model="tab" bg-color="#f5f2f2">
        <v-tab value="dados">Dados</v-tab>
        <v-tab value="partes">Partes</v-tab>
        <v-tab value="minuta">Minuta</v-tab>
        <v-tab value="livro">Livro</v-tab>
        <v-tab value="observacao">Observações</v-tab>
        <v-tab value="anexo">Anexos</v-tab>
      </v-tabs>
  
      <v-tabs-window v-model="tab">
        <v-tabs-window-item value="dados">
          <ProcuracaoAtualizarDados  />
        </v-tabs-window-item>
        <!-- <v-tabs-window-item value="partes">
          <ProcuracaoPartes />
        </v-tabs-window-item>
        <v-tabs-window-item value="minuta">
          <ProcuracaoMinuta />
        </v-tabs-window-item>
        <v-tabs-window-item value="livro">
          <ProcuracaoLivro />
        </v-tabs-window-item>
        <v-tabs-window-item value="observacao">
          <ProcuracaoObservacao  />
        </v-tabs-window-item>
        <v-tabs-window-item value="anexo">
          <ProcuracaoAnexos />
        </v-tabs-window-item> -->
      </v-tabs-window>
    </v-card>
  </template>
  
  <script setup>
  
  const ato_id_prop = ref(null);
  const pages_prop = ref(null)
  const doc_prop = ref(null)
  const tab = ref(null);
  
  const handleSave = ({id,token}) => {
    ato_id_prop.value = id;

  };
  
  const getPages = (pages) =>{
    pages_prop.value = pages
  }
  
  const getDocument = (doc) =>{
    doc_prop.value = doc
  }
  
  </script>
  