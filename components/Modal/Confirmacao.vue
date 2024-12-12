<template>
    <v-dialog persistent v-model="isVisible" per max-width="500">
      <v-card>
        <v-card-text>
          <div >
            {{ condMessage }}
          </div>
        </v-card-text>
        <v-card-actions>
          <v-btn
            style="background-color: red; color: white"
            @click="closeModal"
            >Não</v-btn
          >
          <v-btn
            style="background-color: green; color: white"
            @click="closeModal"
            >Sim</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </template>
  
  <script setup>
  const props = defineProps({
    show: Boolean,
    condMessage: String,
  });
  
  const isVisible = ref(props.show);
  
  const emit = defineEmits(['close']);
  
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
  