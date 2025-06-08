<template>
  <v-dialog persistent v-model="isVisible" per max-width="500">
    <v-card>
      <v-card-text>
        <div>
          {{ condMessage }}
          <div class="mt-5" v-if="valor">
            <span style="font-size: larger">Valor Emolumento</span> :
            {{ formatCurrency(valor.valor_emolumento) }}
            &nbsp; <span style="font-size: large">Valor Ato</span>:
            {{ formatCurrency(valor.valor_ato) }}
            <br />
            <span style="font-size: large">Valor Selo</span> :
            {{ formatCurrency(valor.valor_selo) }}
            &nbsp;<span style="font-size: large">Valor TSNR</span> :
            {{ formatCurrency(valor.valor_tsnr) }}
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

function formatCurrency(value) {
  if (typeof value !== "number") {
    value = Number(value);
  }
  if (isNaN(value)) return "R$ 0,00";
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  });
}

const closeModal = () => {
  isVisible.value = false;
  emit("close");
};

const confirmAction = () => {
  isVisible.value = false;
  emit("confirm");
};
</script>
