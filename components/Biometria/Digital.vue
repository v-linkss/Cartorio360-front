<template>
  <v-col style="margin-top: 20px" cols="auto" class="biometria-container">
    <div class="finger-container">
      <!-- Mão esquerda -->
      <div
        v-for="(finger, index) in leftFingers"
        :key="index"
        class="finger"
        :style="getFingerStyle(finger, 'left')"
        @click="openModal(finger)"
      ></div>
      <!-- Mão direita -->
      <div
        v-for="(finger, index) in rightFingers"
        :key="index"
        class="finger"
        :style="getFingerStyle(finger, 'right')"
        @click="openModal(finger)"
      ></div>
    </div>
    <v-dialog v-model="isModalOpen" max-width="600px">
      <v-card>
        <v-card-title> Captura de Biometria </v-card-title>
        <v-card-text>
          <div v-if="currentFingerBiometria">
            <p>Biometria existente para {{ selectedFinger }}.</p>
            <v-img :src="currentFingerBiometria" alt="Biometria" />
            <p>Deseja substituir?</p>
          </div>
          <div v-else>
            <p>
              Nenhuma biometria encontrada para {{ selectedFinger }}. Capturando
              nova biometria...
            </p>
          </div>
          <div v-if="biometricDevice">
            <p>Dispositivo biométrico detectado: {{ biometricDevice }}</p>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-btn color="green" @click="captureBiometria">Capturar</v-btn>
          <v-btn color="red" @click="closeModal">Cancelar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-col>
</template>

<script setup>
const leftFingers = ref(["E1", "E2", "E3", "E4", "E5"]);
var colorLeftFingers = ref(["red", "red", "red", "red", "red"]);
const rightFingers = ref(["D1", "D2", "D3", "D4", "D5"]);
var colorRightFingers = ref(["red", "red", "red", "red", "red"]);

const isModalOpen = ref(false);
const selectedFinger = ref(null);
const currentFingerBiometria = ref(null);
const biometricDevice = ref(null);

const route = useRoute();
const { id } = route.params;

const { $toast } = useNuxtApp();

const config = useRuntimeConfig();
const enviarDigital = `${config.public.biometria}`;
const enviarDigitalBanco = `${config.public.managemant}/createPessoaBiometria`;
const listarDedos = `${config.public.managemant}/getPessoaBiometriaById`;

// Função para abrir o modal e verificar se a biometria do dedo já existe
function openModal(finger) {
  selectedFinger.value = finger;
  isModalOpen.value = true;
}

// Função para fechar o modal
function closeModal() {
  isModalOpen.value = false;
  selectedFinger.value = null;
  currentFingerBiometria.value = null;
  biometricDevice.value = null;
}

async function getFingers() {
  const { status, data: fingerData } = await useFetch(`${listarDedos}/${id}`, {
    method: "GET",
  });

  if (status.value === "success" && fingerData.value) {
    updateFingerColor("E1", "green");
    fingerData.value.forEach((finger) => {
      if (leftFingers.value.includes(finger.dedo)) {
        updateFingerColor(finger.dedo, "green");
      } else if (rightFingers.value.includes(finger.dedo)) {
        updateFingerColor(finger.dedo, "green");
      }
    });
  }
}

onMounted(() => {
  getFingers();
});
async function captureBiometria() {
  const { status, data: captureData } = await useFetch(enviarDigital, {
    method: "GET",
  });
  if (status.value === "success") {
    const hash = captureData.value.hash;
    const bodyDigital = {
      user_id: useCookie("user-data").value.usuario_id,
      pessoa_id: Number(id),
      dedo: selectedFinger.value,
      hash,
    };

    const { status, data } = await useFetch(enviarDigitalBanco, {
      method: "POST",
      body: bodyDigital,
    });
    if (status.value === "success") {
      $toast.success("Biometria enviada com sucesso!");
      closeModal();
    } else {
      $toast.error("Falha ao enviar a biometria.");
    }
    closeModal();
  } else {
    $toast.error("Erro ao Capturar biometria para o sistema.");
  }
}

function updateFingerColor(finger, color) {
  const leftIndex = leftFingers.value.findIndex((f, index) => {
    if (f === finger) {
      return f === finger;
    }
  });
  if (leftIndex !== -1) {
    colorLeftFingers.value[leftIndex] = color;
  } else {
    const rightIndex = rightFingers.value.findIndex((f) => f === finger);
    if (rightIndex !== -1) {
      colorLeftFingers.value[leftIndex] = color;
    }
  }
}

// Estilo dos dedos (posição e cor)
function getFingerStyle(finger, side) {
  const baseTopLeft = {
    E1: { top: 82, left: -10 },
    E2: { top: 35, left: 4 },
    E3: { top: 0, left: 30 },
    E4: { top: 15, left: 75 },
    E5: { top: 50, left: 170 },

    D1: { top: 50, left: 210 },
    D2: { top: 18, left: 300 },
    D3: { top: 5, left: 350 },
    D4: { top: 35, left: 375 },
    D5: { top: 80, left: 390 },
  };

  const position = baseTopLeft[finger];
  let color = "red"; // Default color

  if (side === "left") {
    const leftIndex = leftFingers.value.indexOf(finger);
    if (leftIndex !== -1) {
      color = colorLeftFingers.value[leftIndex];
    }
  } else if (side === "right") {
    const rightIndex = rightFingers.value.indexOf(finger);
    if (rightIndex !== -1) {
      color = colorRightFingers.value[rightIndex];
    }
  }

  return {
    backgroundColor: color,
    top: `${position.top}px`,
    left: `${position.left}px`,
  };
}
</script>

<style scoped>
.biometria-container {
  position: relative;
  width: 400px;
  height: 300px;
}

.finger-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url("@/assets/biometria.png");
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
}

.finger {
  position: absolute;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  cursor: pointer;
}
</style>
