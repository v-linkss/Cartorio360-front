<template>
  <v-dialog persistent v-model="isVisible" max-width="900">
    <v-card>
      <v-container>
        <h1
          style="
            background-color: #f5f2f2;
            color: #525050;
            padding: 10px 0px 0px 20px;
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
            <Dados
              v-if="state.tipo_pessoa === 'fisica'"
              @saved="handleSave"
              @close-modal="closeModal"
              :isModal="true"
            />
            <DadosJuridica
              v-else-if="state.tipo_pessoa === 'juridica'"
              @saved="handleSaveJuridica"
              @close-modal="closeModal"
              :isModal="true"
            />
          </v-tabs-window-item>
          <v-tabs-window-item v-if="showTabs" value="documento">
            <Documentos @close-modal="closeModal" :isModal="true" />
          </v-tabs-window-item>
          <v-tabs-window-item v-if="showTabsJuridica" value="representante">
            <PessoasCadastrosRepresentantes
              @close-modal="closeModal"
              :isModal="true"
            />
          </v-tabs-window-item>
          <v-tabs-window-item
            v-if="showTabsJuridica || showTabsFisica"
            value="endereco"
          >
            <Endereco @close-modal="closeModal" :isModal="true" />
          </v-tabs-window-item>
          <v-tabs-window-item v-if="showTabs" value="biometria">
            <v-container>
              <Biometria @close-modal="closeModal" :isModal="true" />
            </v-container>
          </v-tabs-window-item>
          <v-tabs-window-item v-if="showTabs" value="restricao">
            <Restricoes @close-modal="closeModal" :isModal="true" />
          </v-tabs-window-item>
        </v-tabs-window>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script setup>
const props = defineProps({
  show: Boolean,
});

const isVisible = ref(props.show);
const emit = defineEmits(["close"]);

const tab = ref("dados");
const showTabsFisica = ref(false);
const showTabsJuridica = ref(false);
const autocompleteDisabled = ref(false);

const state = reactive({
  tipo_pessoa: "fisica", // Valor inicial
});

const pessoa_tipo = [
  { label: "FÍSICA", value: "FISICA"},
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
watch(
  () => props.show,
  (newVal) => {
    isVisible.value = newVal;
  }
);

const closeModal = () => {
  isVisible.value = false;
  emit("close");
};
</script>
