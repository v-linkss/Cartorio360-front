<template>
  <v-dialog persistent v-model="isVisible" max-width="1000">
    <v-card>
      <v-container>
        <h1
          style="
            background-color: #f5f2f2;
            color: #525050;
            padding: 10px 0px 0px 20px;
          "
        >
          Cadastro de imoveis
        </h1>

        <v-tabs v-model="tab" bg-color="#f5f2f2">
          <v-tab value="dados">Dados</v-tab>
          <v-tab v-if="showPartes" value="partes">Partes</v-tab>
        </v-tabs>

        <v-tabs-window v-model="tab">
          <v-tabs-window-item value="dados">
            <ModalImoveisElementosDados
              :ato_id="props.ato_id"
              @saved="handleSave"
              @close-modal="closeModal"
            />
          </v-tabs-window-item>
          <v-tabs-window-item value="partes">
            <ModalImoveisElementosPartes
               v-if="showPartes"
              :imovel_id="imovel_id_prop"
              :ato_token="props.ato_token"
              :ato_id="props.ato_id"
              :ato_token_selected="props.ato_token_selected"
              @close-modal="closeModal"
            />
          </v-tabs-window-item>
        </v-tabs-window>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script setup>
const props = defineProps({
  show: Boolean,
  imovel_id: Number,
  ato_token: String,
  ato_id: Number,
  ato_token_selected: String,
});
const tab = ref("dados");
const isVisible = ref(props.show);
const imovel_id_prop = ref(null);
const showPartes = ref(false);
const emit = defineEmits(["close"]);

watch(
  () => props.show,
  (newVal) => {
    isVisible.value = newVal;
  }
);

const handleSave = (imovel) => {
  showPartes.value = true;
  imovel_id_prop.value = imovel.id;
};

const closeModal = () => {
  isVisible.value = false;
  showPartes.value = false;
  emit("close");
};
</script>
