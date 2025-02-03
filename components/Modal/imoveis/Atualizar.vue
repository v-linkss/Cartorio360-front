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
            Atualizar imovel
          </h1>
  
          <v-tabs v-model="tab" bg-color="#f5f2f2">
            <v-tab value="dados">Dados</v-tab>
            <v-tab value="partes">Partes</v-tab>
          </v-tabs>
  
          <v-tabs-window v-model="tab">
            <v-tabs-window-item value="dados">
              <ModalImoveisElementosDados
                @saved="handleSave"
                @close-modal="closeModal"
              />
            </v-tabs-window-item>
            <v-tabs-window-item value="partes">
              <ModalImoveisElementosPartes
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
  });
  
  const tab = ref("dados");
  const isVisible = ref(props.show);
  const emit = defineEmits(["close"]);
  
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
  