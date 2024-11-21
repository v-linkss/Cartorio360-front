<template>
  <v-dialog persistent v-model="isVisible" max-width="700">
    <v-card>
      <v-card-title class="text-h5">Ficha de Firma</v-card-title>
      <v-img :src="fichaRender"/>
      <v-card-actions>
        <v-btn
          style="background-color: #429946; color: white"
          @click="confirmarRecebimento"
          >Reconhecer</v-btn
        >
        <v-btn style="background-color: red; color: white" @click="closeModal"
          >Voltar</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
const props = defineProps({
  show: Boolean,
  item: Object
});

const config = useRuntimeConfig();
const buscarPessoa = `${config.public.managemant}/getLinkTipo`;

const isVisible = ref(props.show);
const fichaRender = ref()

const emit = defineEmits(["close","confirmar"]);

watch(
  () => props.show,
  async(newVal) => {
    isVisible.value = newVal;
    await beforeOpenFicha();
  }
);

const confirmarRecebimento = () => {
  emit("confirmar");
  closeModal();
};

const beforeOpenFicha = async () => {
  try {
    const { data: imagemBiometria } = await useFetch(
      `${buscarPessoa}`,
      {
        method: "POST",
        body:{id:props.item.id,tipo:'ficha'}
      }
    );
    if (imagemBiometria.value && imagemBiometria.value.link) {
      fichaRender.value = `data:image/jpeg;base64,${imagemBiometria.value.link}`;
    } else {
      fichaRender.value = null; 
    }
  } catch (error) {
    console.error("Erro ao buscar a imagem da ficha:", error);
  }
};


const closeModal = () => {
  isVisible.value = false;
  fichaRender.value = null;
  emit("close");
};
</script>
