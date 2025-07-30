<template>
  <v-dialog persistent v-model="isVisible" max-width="500">
    <v-card>
      <v-card-text>
        <div>
          {{ condMessage }}
          <div class="description-scroll mt-2" v-if="description">
            {{ description }}
          </div>
          <div class="mt-5" v-if="valor">
            <span style="font-size: larger">Valor Emolumento</span> : R${{
              valor.valor_emolumento
            }}
            &nbsp; <span style="font-size: large">Valor Ato</span>: R${{
              valor.valor_ato
            }}
            <br />
            <span style="font-size: large">Valor Selo</span> : R${{
              valor.valor_selo
            }}
            &nbsp;<span style="font-size: large">Valor TSNR</span> : R${{
              valor.valor_tsnr
            }}
          </div>
        </div>
      </v-card-text>
      <v-card-actions>
        <v-btn style="background-color: red; color: white" @click="closeModal"
          >Não</v-btn
        >
        <v-btn
          style="background-color: green; color: white"
          @click="confirmAction"
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
  description: String,
  valor: Object,
});

const isVisible = ref(props.show);

const emit = defineEmits(["close", "confirm"]);

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

const confirmAction = () => {
  isVisible.value = false;
  emit("confirm");
};
</script>
<style scoped>
.description-scroll {
  max-height: 400px; /* ajuste conforme necessário */
  overflow-y: auto;
  /* Só aplica o scroll se o modal for maior que 700px */
}

@media (min-height: 700px) {
  .description-scroll {
    max-height: 500px; /* ou outro valor que funcione bem para seu layout */
  }
}
</style>
