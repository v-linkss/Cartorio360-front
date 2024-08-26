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
const leftFingers = ref(["e_1", "e_2", "e_3", "e_4", "e_5"]);
const rightFingers = ref(["d_1", "d_2", "d_3", "d_4", "d_5"]);

const isModalOpen = ref(false);
const selectedFinger = ref(null);
const currentFingerBiometria = ref(null);
const biometricDevice = ref(null);
  
const { $toast } = useNuxtApp();

const config = useRuntimeConfig();
const enviarDigital = `${config.public.capturaDigital}/capture-finger`;

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

async function captureBiometria() {
  const { status,data } = await useFetch(enviarDigital, {
    method: "GET",
  });
  if (status.value === 'success') {
        $toast.success("Biometria enviada com sucesso!");
        // console.log(data.value.hash)
        closeModal();
      } else {
        $toast.error("Erro ao enviar biometria para o sistema.");
      }
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
