<template>
  <v-col style="margin-top: 20px" cols="auto" class="biometria-container">
    <div class="finger-container">
      <!-- Mão esquerda -->
      <div
        v-for="(finger, index) in leftFingers"
        :key="index"
        class="finger"
        :style="getFingerStyle(finger, 'left')"
       @click="captureBiometria(finger)"
      ></div>
      <!-- Mão direita -->
      <div
        v-for="(finger, index) in rightFingers"
        :key="index"
        class="finger"
        :style="getFingerStyle(finger, 'right')"
       @click="captureBiometria(finger)"
      ></div>
    </div>

  </v-col>
</template>

<script setup>
const leftFingers = ref(["E1", "E2", "E3", "E4", "E5"]);
var colorLeftFingers = ref(["red", "red", "red", "red", "red"]);
const rightFingers = ref(["D1", "D2", "D3", "D4", "D5"]);
var colorRightFingers = ref(["red", "red", "red", "red", "red"]);

const route = useRoute();
const { $toast } = useNuxtApp();
const config = useRuntimeConfig();
const { id } = route.params;
const pessoa_id = ref(useCookie('pessoa-id').value).value;

const enviarDigital = `${config.public.biometria}/capture-finger`;
const enviarDigitalBanco = `${config.public.managemant}/createPessoaBiometria`;
const listarDedos = `${config.public.managemant}/getPessoaBiometriaById`;

async function getFingers() {
  const { status, data: fingerData } = await useFetch(`${listarDedos}/${id || pessoa_id}`, {
    method: "GET",
  });

  if (status.value === "success" && fingerData.value) {
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
async function captureBiometria(finger) {
  const { status, data: captureData } = await useFetch("http://localhost:5000/apiservice/capture-finger", {
    method: "GET",
  });
  if (status.value === "success") {
    const hash = captureData.value.hash;
    const bodyDigital = {
      user_id: useCookie("user-data").value.usuario_id,
      pessoa_id: Number(id) || pessoa_id,
      dedo: finger,
      hash,
    };

    const { status } = await useFetch(enviarDigitalBanco, {
      method: "POST",
      body: bodyDigital,
    });
    if (status.value === "success") {
      $toast.success("Biometria enviada com sucesso!");
      updateFingerColor(finger, "green");
    } else {
      $toast.error("Falha ao enviar a biometria.");
    }
  } else {
    $toast.error("Erro ao Capturar biometria para o sistema.");
  }
}

function updateFingerColor(finger, color) {
  const leftIndex = leftFingers.value.findIndex((f) => f === finger);
  if (leftIndex !== -1) {
    colorLeftFingers.value[leftIndex] = color;
  } else {
    const rightIndex = rightFingers.value.findIndex((f) => f === finger);
    if (rightIndex !== -1) {
      colorRightFingers.value[rightIndex] = color;
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
  let color = "red"; 

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
