<template>
  <v-container>
    <v-card width="1300">
      <h1
        style="
          background-color: #f5f2f2;
          color: #525050;
          padding: 5px 0px 0px 20px;
        "
      >
        Cadastramento de pessoas
      </h1>
      <div style="background-color: #f5f2f2; padding: 5px 0px 0px 20px">
        <v-autocomplete
          v-model="state.tipo_pessoa"
          style="width: 200px"
          :items="pessoa_tipo"
          item-title="label"
          item-value="value"
          label="Tipo de pessoa"
          bg-color="#F6F6F6"
          :disabled="autocompleteDisabled"
        >
        </v-autocomplete>
      </div>

      <v-tabs v-model="tab" bg-color="#f5f2f2">
        <v-tab value="dados">Dados</v-tab>
        <v-tab v-if="showTabsFisica" value="documento">Documentos</v-tab>
        <v-tab v-if="showTabsJuridica" value="representante"
          >Representantes</v-tab
        >
        <v-tab v-if="showTabsJuridica || showTabsFisica" value="endereco"
          >Endereços</v-tab
        >
        <v-tab v-if="showTabsFisica" value="biometria">Biometria</v-tab>
        <v-tab v-if="showTabsJuridica || showTabsFisica" value="restricao"
          >Restrições</v-tab
        >
      </v-tabs>

      <v-tabs-window v-model="tab">
        <v-tabs-window-item value="dados">
          <Dados v-if="state.tipo_pessoa === 'FISICA'" @saved="handleSave" />
          <DadosJuridica
            v-else-if="state.tipo_pessoa === 'JURIDICA'"
            @saved="handleSaveJuridica"
          />
        </v-tabs-window-item>
        <v-tabs-window-item v-if="showTabsFisica" value="documento">
          <Documentos />
        </v-tabs-window-item>
        <v-tabs-window-item v-if="showTabsJuridica" value="representante">
          <PessoasCadastrosRepresentantes />
        </v-tabs-window-item>
        <v-tabs-window-item
          v-if="showTabsJuridica || showTabsFisica"
          value="endereco"
        >
          <Endereco />
        </v-tabs-window-item>
        <v-tabs-window-item v-if="showTabsFisica" value="biometria">
          <v-container class="mt-5">
            <Biometria />
          </v-container>
        </v-tabs-window-item>
        <v-tabs-window-item
          v-if="showTabsJuridica || showTabsFisica"
          value="restricao"
        >
          <Restricoes />
        </v-tabs-window-item>
      </v-tabs-window>
    </v-card>
  </v-container>
</template>

<script setup>
const tab = ref("dados");
const showTabsFisica = ref(false);
const showTabsJuridica = ref(false);
const autocompleteDisabled = ref(false);

const state = reactive({
  tipo_pessoa: "FISICA",
});

const pessoa_tipo = [
  { label: "FÍSICA", value: "FISICA" },
  { label: "JURÍDICA", value: "JURIDICA" },
  { label: "ESTRANGEIRA", value: "ESTRANGEIRA" },
];

const handleSave = () => {
  showTabsFisica.value = true;
  autocompleteDisabled.value = true;
};

const handleSaveJuridica = () => {
  showTabsJuridica.value = true;
  autocompleteDisabled.value = true;
};
</script>
