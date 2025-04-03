<template>
    <v-card width="1300">
      <v-tabs v-model="tab" bg-color="#f5f2f2">
        <v-tab value="dados">Dados</v-tab>
        <v-tab v-if="showTabs" value="partes">Partes</v-tab>
        <v-tab v-if="showTabs" value="minuta">Minuta</v-tab>
        <v-tab v-if="showTabs" value="livro">Livro</v-tab>
        <v-tab v-if="showTabs" value="observacao">Observações</v-tab>
        <v-tab v-if="showTabs" value="anexo">Anexos</v-tab>
        <v-tab v-if="showTabs" value="outros">Outros</v-tab>
      </v-tabs>
  
      <v-tabs-window v-model="tab">
        <v-tabs-window-item value="dados">
          <ProcuracaoDados @saved="handleSave" :ato_token="selectedAto" :ato_tipo_id="selectedTipoAtoId"/>
        </v-tabs-window-item>
        <v-tabs-window-item v-if="showTabs" value="partes">
          <ProcuracaoPartes :ato_token="selectedAto" :ato_id="ato_id_prop"/>
        </v-tabs-window-item>
        <v-tabs-window-item v-if="showTabs" value="minuta">
          <ProcuracaoMinuta @page="getPages" @doc="getDocument" :ato_token="ato_token_prop"/>
        </v-tabs-window-item>
        <v-tabs-window-item v-if="showTabs" value="livro">
          <ProcuracaoLivro :pages="pages_prop" :ato_token="ato_token_prop" :document="doc_prop"/>
        </v-tabs-window-item>
        <v-tabs-window-item v-if="showTabs" value="observacao">
          <ProcuracaoObservacao :ato_id="ato_id_prop" />
        </v-tabs-window-item>
        <v-tabs-window-item v-if="showTabs" value="anexo">
          <ProcuracaoAnexos :ato_token="ato_token_prop" :ato_id="ato_id_prop"/>
        </v-tabs-window-item>
        <v-tabs-window-item v-if="showTabs" value="outros">
        <ProcuracaoOutros :ato_token="ato_token_prop" :ato_id="ato_id_prop"/>
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
    ato_tipo_id: {
      type: Number,
    }
  });
  const emit = defineEmits(["ato-created"]);
  const ato_id_prop = ref(null);
  const ato_token_prop = ref(null);
  const pages_prop = ref(null)
  const doc_prop = ref(null)
  const tab = ref(null);
  const showTabs = ref(false);
  const selectedTipoAtoId = ref(props.ato_tipo_id);
  const selectedAto = ref(props.ato_token);
  
  const handleSave = ({id,token}) => {
    ato_id_prop.value = id;
    ato_token_prop.value = token
    showTabs.value = true;
    emit('ato-created')
  };
  
  const getPages = (pages) =>{
    pages_prop.value = pages
  }
  
  const getDocument = (doc) =>{
    doc_prop.value = doc
  }

  watch(
    () => props.ato_token,
    (newValue) => {
      selectedAto.value = newValue; 
    }
  );
  
  watch(
    () => props.ato_tipo_id,
    (newValue) => {
      selectedTipoAtoId.value = newValue; 
    }
  );
  </script>
  