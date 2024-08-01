<template>
  <v-row class="d-flex align-items-center justify-space-between">
    <v-col cols="auto">
      <v-img src="../assets/biometria.png" :width="500" class="mr-4"></v-img>
    </v-col>
    <v-spacer></v-spacer>
    <v-col cols="auto">
      <v-dialog max-width="700" v-model="isDialogActive">
        <template v-slot:activator="{ props: activatorProps }">
          <v-btn
            v-bind="activatorProps"
            variant="outlined"
            style="width: 300px; height: 300px"
            @click="openDialog"
          >
            <img src="../assets/camera.png" />
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
              <v-container style="overflow: hidden;" >
                <v-col>
                  <video
                    class="ml-3"
                    ref="video"
                    width="640"
                    height="480"
                    autoplay    
                    :style="{ transform: `scale(${zoomLevel})`,transformOrigin: ' center center' }"  
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
                  src="../assets/sair.png"
                  alt="Excluir"
                />
              </div>
              <div @click="closeDialog">
                <img
                   style="cursor: pointer;"
                  src="../assets/salvar.png"
                  alt="Salvar"
                />
              </div>
            </v-row>
          </v-card>
        </template>
      </v-dialog>
    </v-col>
    <v-col>
      <img class="btn-pointer" src="../assets/trash.png" alt="Excluir" />
    </v-col>
  </v-row>
  <NuxtLink to="home">
    <img class="mt-15" src="../assets/sair.png" alt="Sair" />
  </NuxtLink>
</template>

<script setup>
const video = ref(null);
const devices = ref([]);
const selectedDeviceId = ref("");
const isDialogActive = ref(false);
const zoomLevel = ref(1);

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
  isDialogActive.value = true;
  try {
    await navigator.mediaDevices.getUserMedia({ video: true }); // Solicitar permissão do usuário
    await updateDevices(); // Atualizar a lista de dispositivos após obter permissão
  } catch (error) {
    console.error("Erro ao acessar dispositivos de mídia:", error);
  }
};

const closeDialog = () => {
  isDialogActive.value = false;
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

onMounted(async () => {
  try {
    await navigator.mediaDevices.getUserMedia({ video: true }); // Solicitar permissão do usuário
    await updateDevices(); // Atualizar a lista de dispositivos após obter permissão
  } catch (error) {
    console.error("Erro ao acessar dispositivos de mídia:", error);
  }
});
</script>

