<template>
  <v-dialog persistent v-model="isVisible" max-width="500">
    <v-card>
      <v-card-text>
        <div>
          <p>
            Digite o código de validação para confirmar o ato de reconhecimento
            por autenticidade:
          </p>
          <div class="random-numbers">
            <span>{{ randomNumbers.join(" ") }}</span>
          </div>
          <v-text-field
            v-model="userInput"
            label="Digite os números"
            maxlength="4"
            outlined
            dense
            @keyup.enter="validateInput"
          />
          <div v-if="errorMessage" class="error-message">
            {{ errorMessage }}
          </div>
        </div>
      </v-card-text>
      <v-card-actions>
        <v-btn style="background-color: red; color: white" @click="closeModal"
          >Cancelar</v-btn
        >
        <v-btn
          style="background-color: green; color: white"
          @click="validateInput"
          >Validar</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
const props = defineProps({
  show: Boolean,
});

const emit = defineEmits(["close", "confirm"]);

const isVisible = ref(props.show);
const randomNumbers = ref([]);
const userInput = ref("");
const errorMessage = ref("");

function generateRandomNumbers() {
  randomNumbers.value = [];
  for (let i = 0; i < 4; i++) {
    randomNumbers.value.push(Math.floor(Math.random() * 10));
  }
}

watch(
  () => props.show,
  (newVal) => {
    isVisible.value = newVal;
    if (newVal) {
      generateRandomNumbers();
      userInput.value = "";
      errorMessage.value = "";
    }
  }
);

const closeModal = () => {
  isVisible.value = false;
  emit("close");
};

const validateInput = () => {
  if (userInput.value === randomNumbers.value.join("")) {
    errorMessage.value = "";
    isVisible.value = false;
    emit("confirm");
  } else {
    errorMessage.value = "Números digitados incorretos. Tente novamente.";
  }
};
</script>

<style scoped>
.random-numbers {
  font-size: 1.5rem;
  font-weight: bold;
  letter-spacing: 0.5rem;
  margin-top: 0.5rem;
  margin-bottom: 1rem;
  user-select: none;
}
.error-message {
  color: red;
  margin-top: 0.5rem;
}
</style>
