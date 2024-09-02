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
              <img v-if="!capturedPhoto" src="../../assets/camera.png" />
              <img v-if="capturedPhoto" :src="capturedPhoto" style="width: 100%; height: 100%; object-fit: cover;" />
            </v-btn>
          </template>
  
          <template v-slot:default="{ isActive }">
            <v-card title="Biometria">
              <v-row>
                <v-col>
                  <v-select
                    :items="devices"
                    v-model="selectedDeviceId"
                    item-title="label"
                    item-value="deviceId"
                    label="Selecionar Webcam"
                  ></v-select>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-btn @click="startVideo">Exibir</v-btn>
                </v-col>
              </v-row>
              <v-row>
                <v-container style="overflow: hidden;">
                  <v-col>
                    <video
                      class="ml-3"
                      ref="video"
                      width="640"
                      height="480"
                      autoplay
                      :style="{ transform: `scale(${zoomLevel})`, transformOrigin: 'center center' }"
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
              <v-row class="mt-10 justify-space-around">
                <div @click="closeDialog">
                  <img
                    style="cursor: pointer;"
                    src="../../assets/sair.png"
                    alt="Excluir"
                  />
                </div>
                <div @click="handleCapture">
                  <img
                    style="cursor: pointer;"
                    src="../../assets/salvar.png"
                    alt="Salvar"
                  />
                </div>
              </v-row>
            </v-card>
          </template>
        </v-dialog> 
        <img @click="handleDelete" style="width: 40px;margin-left: 10px;cursor: pointer;" src="../../assets/mudarStatus.png" alt="Excluir" />
      </v-col>
  </template>
  
  <script setup>
  
  const video = ref(null);
  const devices = ref([]);
  const selectedDeviceId = ref("");
  const isDialogActiveBiometria = ref(false);
  const capturedPhoto = ref(null);

  const zoomLevel = ref(1);
  
  const tokenCookie = useCookie('auth_token');
  const token = tokenCookie.value;
  
  const pessoaNome = useCookie("user-data").value;
  const nomePessoa = pessoaNome.nome;
  
  const config = useRuntimeConfig();
  const enviarFoto = `${config.public.managemant}/uploadFaceId`;
  
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
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    const width = video.value.videoWidth;
    const height = video.value.videoHeight;
    const scaledWidth = width * zoomLevel.value;
    const scaledHeight = height * zoomLevel.value;
    const offsetX = (width - scaledWidth) / 2;
    const offsetY = (height - scaledHeight) / 2;
  
    canvas.width = width;
    canvas.height = height;
  
    context.drawImage(
      video.value,
      offsetX,
      offsetY,
      scaledWidth,
      scaledHeight
    );
  
    canvas.toBlob(async (blob) => {
      const formData = new FormData();
      formData.append('file', blob, `${nomePessoa}.jpg`);
      formData.append('pessoa_token', token); // Adiciona o token ao FormData
      formData.append('bucket', 'cartorio-teste'); // Adiciona o campo bucket
  
      const { status } = await useFetch(enviarFoto, {
        method: 'POST',
        body: formData,
      });
  
      if (status.value === 'success') {
        const photoUrl = URL.createObjectURL(blob);
        $toast.success("Imagem enviada!");
        capturedPhoto.value = photoUrl;
        closeDialog();
      } else {
        $toast.error("Erro ao enviar imagem para o sistema.");
      }
    }, 'image/jpeg');
  };

  const handleDelete = () => {
    capturedPhoto.value = null; 
};

  onMounted(async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ video: true }); 
      await updateDevices(); 
    } catch (error) {
      console.error("Erro ao acessar dispositivos de mídia:", error);
    }
  });
  </script>
  