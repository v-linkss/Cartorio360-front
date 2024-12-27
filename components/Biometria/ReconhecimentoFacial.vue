<template>
  <v-col cols="auto">
    <v-dialog max-width="700" v-model="isDialogActiveBiometria">
      <template v-slot:activator="{ props: activatorProps }">
        <v-btn
          v-bind="activatorProps"
          variant="outlined"
          style="width: 300px; height: 300px"
          @click="openDialog"
        >
          <img v-if="fotoRender === null" src="../../assets/camera.png" />
          <img
            v-if="fotoRender !== null"
            :src="fotoRender"
            style="width: 100%; height: 100%; object-fit: cover"
          />
        </v-btn>
      </template>

      <template v-slot:default="{ isActive }">
        <v-card title="Biometria">
          <v-row>
            <v-col>
              <v-container>

                <v-select
                  :items="devices"
                  v-model="selectedDeviceId"
                  item-title="label"
                  item-value="deviceId"
                  label="Selecionar Webcam"
                ></v-select>
              </v-container>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-btn size="large" class="ml-5" @click="startVideo">Exibir</v-btn>
            </v-col>
          </v-row>
          <v-row>
            <v-container style="overflow: hidden">
              <v-col>
                <video
                  class="ml-3"
                  ref="video"
                  width="640"
                  height="480"
                  autoplay
                  :style="{
                    transform: `scale(${zoomLevel})`,
                    transformOrigin: 'center center',
                  }"
                ></video>
              </v-col>
            </v-container>
          </v-row>
          <v-container>
            <v-slider
              v-model="zoomLevel"
              :min="1"
              :max="3"
              step="0.1"
              label="Zoom"
            ></v-slider>
          </v-container>
          <v-row class="mt-10 mb-5 ml-5">
            <v-btn color="red" size="large" @click="closeDialog">Fechar</v-btn>
            <v-btn color="green" size="large" class="ml-5" @click="handleCapture">Salvar</v-btn>
          </v-row>
        </v-card>
      </template>
    </v-dialog>
  </v-col>
</template>

<script setup>
const video = ref(null);
const devices = ref([]);
const selectedDeviceId = ref("");
const isDialogActiveBiometria = ref(false);
const capturedPhoto = ref(null);
const fotoRender = ref(null);

const route = useRoute();
const { id } = route.params;

const zoomLevel = ref(1);

const tokenCookie = useCookie("pessoa_token");
const token = tokenCookie.value;

const pessoaNome = useCookie("user-data").value;
const nomePessoa = pessoaNome.nome;

const config = useRuntimeConfig();
const enviarFoto = `${config.public.managemant}/uploadPessoa`;
const buscarPessoa = `${config.public.managemant}/getLinkTipo`;

const { $toast } = useNuxtApp();

const updateDevices = async () => {
  const mediaDevices = await navigator.mediaDevices.enumerateDevices();
  devices.value = mediaDevices
    .filter((device) => device.kind === "videoinput")
    .map((device) => ({
      deviceId: device.deviceId,
      label: device.label || `Camera ${devices.value.length + 1}`,
    }));
};

const openDialog = async () => {
  isDialogActiveBiometria.value = true;
  try {
    await navigator.mediaDevices.getUserMedia({ video: true }); // Solicitar permissão do usuário
    await updateDevices(); // Atualizar a lista de dispositivos após obter permissão
  } catch (error) {
    console.error("Erro ao acessar dispositivos de mídia:", error);
  }
};

const closeDialog = () => {
  isDialogActiveBiometria.value = false;
  const stream = video.value.srcObject;
  if (stream) {
    const tracks = stream.getTracks();
    tracks.forEach((track) => track.stop());
  }
};

const startVideo = async () => {
  if (selectedDeviceId.value) {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { deviceId: { exact: selectedDeviceId.value } },
    });
    video.value.srcObject = stream;
  }
};

const handleCapture = async () => {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  const width = video.value.videoWidth;
  const height = video.value.videoHeight;
  const scaledWidth = width * zoomLevel.value;
  const scaledHeight = height * zoomLevel.value;
  const offsetX = (width - scaledWidth) / 2;
  const offsetY = (height - scaledHeight) / 2;

  canvas.width = width;
  canvas.height = height;

  context.drawImage(video.value, offsetX, offsetY, scaledWidth, scaledHeight);

  canvas.toBlob(async (blob) => {
    const formData = new FormData();
    formData.append("file", blob, `${nomePessoa}.jpg`);
    formData.append("pessoa_token", token);
    formData.append("tipo", "foto");

    const { status } = await useFetch(enviarFoto, {
      method: "POST",
      body: formData,
    });
    if (status.value === "success") {
      $toast.success("Imagem enviada!");
      const photoUrl = URL.createObjectURL(blob);
      fotoRender.value = photoUrl;
      closeDialog();
    } else {
      $toast.error("Erro ao enviar imagem para o sistema.");
    }
  }, "image/jpeg");
};

if (id) {
  const { data: imagemBiometria } = await useFetch(buscarPessoa, {
    method: "POST",
    body: { tipo: "foto", id: id },
  });

  if (imagemBiometria.value !== null && imagemBiometria.value.link !== null) {
    fotoRender.value = `data:image/jpeg;base64,${imagemBiometria.value.link}`;
  }
}

onMounted(async () => {
  try {
    await navigator.mediaDevices.getUserMedia({ video: true });
    await updateDevices();
  } catch (error) {
    console.error("Erro ao acessar dispositivos de mídia:", error);
  }
});
</script>
