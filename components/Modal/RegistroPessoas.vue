<template>
  <v-dialog persistent v-model="isVisible" max-width="900" >
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
        <div style="background-color: #f5f2f2; padding: 20px 0px 20px 20px">
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

        <v-tabs v-model="tab" bg-color="#f5f2f2">
          <v-tab value="dados">Dados</v-tab>
          <v-tab v-if="showTabs" value="documento">Documentos</v-tab>
          <v-tab v-if="showTabs" value="endereco">Endereços</v-tab>
          <v-tab v-if="showTabs" value="biometria">Biometria</v-tab>
          <v-tab v-if="showTabs" value="restricao">Restrições</v-tab>
        </v-tabs>

        <v-tabs-window v-model="tab">
          <v-tabs-window-item value="dados">
            <Dados
              @saved="handleSave"
              @close-modal="closeModal"
              :isModal="true"
            />
          </v-tabs-window-item>
          <v-tabs-window-item v-if="showTabs" value="documento">
            <Documentos @close-modal="closeModal" :isModal="true" />
          </v-tabs-window-item>
          <v-tabs-window-item v-if="showTabs" value="endereco">
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
