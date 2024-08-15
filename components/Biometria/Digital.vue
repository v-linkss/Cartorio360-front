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
          <v-btn color="primary" @click="captureBiometria">Capturar</v-btn>
          <v-btn color="secondary" @click="closeModal">Cancelar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-col>
</template>

<script setup>
const leftFingers = ref(["e_1", "e_2", "e_3", "e_4", "e_5"]);
const rightFingers = ref(["d_1", "d_2", "d_3", "d_4", "d_5"]);

const isModalOpen = ref(false);
const selectedFinger = ref(null);
const currentFingerBiometria = ref(null);
const biometricDevice = ref(null);

const config = useRuntimeConfig();
const enviarDigital = `${config.public.managemant}/uploadDigital`;

// Função para abrir o modal e verificar se a biometria do dedo já existe
function openModal(finger) {
  selectedFinger.value = finger;
  currentFingerBiometria.value = getBiometria(finger);
  isModalOpen.value = true;
  detectBiometricDevice();
}

// Função para fechar o modal
function closeModal() {
  isModalOpen.value = false;
  selectedFinger.value = null;
  currentFingerBiometria.value = null;
  biometricDevice.value = null;
}

// Função para buscar a biometria de um dedo específico (substitua com sua lógica)
function getBiometria(finger) {
  // Implementação real para buscar a biometria do dedo
  return null;
}

// Função para capturar e enviar a biometria
async function captureBiometria() {
  try {
    console.log("Iniciando captura biométrica...");

    if (biometricDevice.value) {
      console.log("Dispositivo biométrico detectado:", biometricDevice.value);
      const biometriaData = await initiateBiometricCapture(
        selectedFinger.value
      );
      const formData = new FormData();
      const tokenCookie = useCookie('auth_token');
      const token = tokenCookie.value;
      formData.append("file", biometriaData);
      formData.append("token", token);

      const { status } = await useFetch(enviarDigital, {
        method: "POST",
        body: formData,
      });

      console.log("Biometria capturada e enviada com sucesso.");
      closeModal();
    } else {
      console.log("Nenhum dispositivo biométrico encontrado.");
    }
  } catch (error) {
    console.error("Erro ao capturar ou enviar a biometria:", error);
  }
}

// Função para detectar o dispositivo biométrico
async function detectBiometricDevice() {
  try {
    biometricDevice.value = await getBiometricDevice();
    if (biometricDevice.value) {
      console.log("Dispositivo biométrico conectado:", biometricDevice.value);
    } else {
      console.log("Nenhum dispositivo biométrico detectado.");
    }
  } catch (error) {
    console.error("Erro ao detectar dispositivo biométrico:", error);
  }
}

// Função para obter o dispositivo biométrico (simulação)
function getBiometricDevice() {
  // Simulação de verificação de dispositivo biométrico
  return new Promise((resolve) => {
    setTimeout(() => {
      const deviceDetected = true; // Altere para false se quiser simular que nenhum dispositivo foi encontrado
      resolve(deviceDetected ? deviceDetected : null);
    }, 1000); // Simula tempo de verificação
  });
}

// Função para iniciar a captura biométrica (simulação)
function initiateBiometricCapture(finger) {
  // Implementação do leitor biométrico para capturar os dados do dedo
  return new Promise((resolve) => {
    setTimeout(() => {
      const dummyBiometria = new Blob(["biometric data"], {
        type: "image/png",
      }); // Simulação de dados biométricos
      resolve(dummyBiometria);
    }, 2000); // Simula tempo de captura
  });
}

// Estilo dos dedos (posição e cor)
function getFingerStyle(finger, side) {
  const baseTopLeft = {
    e_1: { top: 82, left: -10 },
    e_2: { top: 35, left: 4 },
    e_3: { top: 0, left: 30 },
    e_4: { top: 15, left: 75 },
    e_5: { top: 50, left: 170 },

    d_1: { top: 50, left: 210 },
    d_2: { top: 18, left: 300 },
    d_3: { top: 5, left: 350 },
    d_4: { top: 35, left: 375 },
    d_5: { top: 80, left: 390 },
  };

  const position = baseTopLeft[finger];

  return {
    backgroundColor: "red", // Todos os dedos inicialmente vermelhos
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
