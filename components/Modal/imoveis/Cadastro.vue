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
          Cadastro de imoveis
        </h1>

        <v-tabs v-model="tab" bg-color="#f5f2f2">
          <v-tab value="dados">Dados</v-tab>
          <v-tab v-if="showPartes" value="enderecos">Endereco</v-tab>
          <v-tab v-if="showPartes" value="partes">Partes</v-tab>
        </v-tabs>

        <div v-if="tab === 'dados'">
          <ModalImoveisElementosDados
            @refresh-list="refreshList"
            :ato_id="props.ato_id"
            @saved="handleSave"
            @close-modal="closeModal"
          />
        </div>
        <div v-if="tab === 'enderecos' && showPartes">
          <ModalImoveisElementosEnderecos
            @refresh-list="refreshList"
            :isUpdate="true"
            :ato_id="ato_id_imovel"
            :ato_token="props.ato_token"
            :imovel_id="imovel_id_prop"
            @close-modal="closeModal"
          />
        </div>
        <div v-if="tab === 'partes' && showPartes">
          <ModalImoveisElementosPartes
            @refresh-list="refreshList"
            :imovel_id="imovel_id_prop"
            :ato_token="props.ato_token"
            :ato_id="props.ato_id"
            :ato_token_selected="props.ato_token_selected"
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
  ato_token: String,
  ato_id: Number,
  ato_token_selected: String,
});
const tab = ref("dados");
const isVisible = ref(props.show);
const imovel_id_prop = ref(null);
const ato_id_imovel = ref(null);
const showPartes = ref(false);
const emit = defineEmits(["close", "refresh"]);

watch(
  () => props.show,
  (newVal) => {
    isVisible.value = newVal;
  }
);

const handleSave = (imovel) => {
  showPartes.value = true;
  ato_id_imovel.value = imovel.ato_id;
  imovel_id_prop.value = imovel.id;
};

const closeModal = () => {
  isVisible.value = false;
  showPartes.value = false;
  emit("close");
};

const refreshList = () => {
  emit("refresh");
};
</script>
