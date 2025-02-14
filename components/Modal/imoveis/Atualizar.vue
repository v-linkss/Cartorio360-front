<template>
  <v-dialog persistent v-model="isVisible" max-width="1000">
    <v-card style="height: 650px;">
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
          <v-tab value="enderecos">Endereço</v-tab>
          <v-tab value="partes">Partes</v-tab>
        </v-tabs>

        <!-- Conteúdo das abas sem transição -->
        <div v-if="tab === 'dados'">
          <ModalImoveisElementosDados     
            @refresh-list="refreshList" 
            :isUpdate="true"
            :imovel_id="props.imovel_id"
            @close-modal="closeModal"
          />
        </div>
        <div v-if="tab === 'enderecos'">
          <ModalImoveisElementosEnderecos
            @refresh-list="refreshList" 
            :isUpdate="true"
            :imovel_id="props.imovel_id"
            @close-modal="closeModal"
          />
        </div>
        <div v-if="tab === 'partes'">
          <ModalImoveisElementosPartes
            :imovel_id="props.imovel_id"
            @close-modal="closeModal"
          />
        </div>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script setup>
const props = defineProps({
  show: Boolean,
  imovel_id: Number,
});

const tab = ref("dados");
const isVisible = ref(props.show);
const emit = defineEmits(["close",'refresh']);

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

const refreshList = () => {
  emit("refresh");
};
</script>