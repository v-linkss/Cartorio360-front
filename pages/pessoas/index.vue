<template>
  <v-card width="1300">
    <h1 style="background-color: #C8FCCA; color: #429946; padding: 10px 0px 0px 20px">
      Cadastramento de pessoas
    </h1>
    <div style="background-color: #C8FCCA; padding: 20px 0px 20px 20px">
      <v-autocomplete
        v-model="state.tipo_pessoa"
        style="width: 200px"
        :items="pessoa_tipo"
        label="Tipo de pessoa"
        bg-color="#F6F6F6"
         :disabled="autocompleteDisabled"
      >
      </v-autocomplete>
    </div>

    <v-tabs v-model="tab" bg-color="#C8FCCA">
      <v-tab value="dados">Dados</v-tab>
      <v-tab v-if="showTabs" value="documento">Documentos</v-tab>
      <v-tab v-if="showTabs" value="endereco">Endereços</v-tab>
      <v-tab v-if="showTabs" value="biometria">Biometria</v-tab>
      <v-tab v-if="showTabs" value="restricao">Restrições</v-tab>
    </v-tabs>

    <v-tabs-window v-model="tab">
      <v-tabs-window-item value="dados">
        <Dados @saved="handleSave" />
      </v-tabs-window-item>
      <v-tabs-window-item v-if="showTabs" value="documento">
        <Documentos />
      </v-tabs-window-item>
      <v-tabs-window-item v-if="showTabs" value="endereco">
        <Endereco />
      </v-tabs-window-item>
      <v-tabs-window-item v-if="showTabs" value="biometria">
        <v-container class="mt-5">
          <Biometria />
        </v-container>
      </v-tabs-window-item>
      <v-tabs-window-item v-if="showTabs" value="restricao">
        <Restricoes/>
      </v-tabs-window-item>
    </v-tabs-window>
  </v-card>
</template>

<script setup>
const tab = ref(null);
const showTabs = ref(false);
const autocompleteDisabled = ref(false);

const initialState = {
  tipo_pessoa: "FISICA",
};

const state = reactive({
  ...initialState,
});

const pessoa_tipo = ["FISICA", "JURIDICA", "ESTRANGEIRA"];

const handleSave = () => {
  showTabs.value = true;
  autocompleteDisabled.value = true; 
};
</script>

<style scoped></style>
