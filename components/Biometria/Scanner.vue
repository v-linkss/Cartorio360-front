<template>
  <div>
    <!-- Botão de Imagem para abrir o Modal -->
    <img
      @click="openScannerAndModal"
      src="../../assets/escanearFicha.png"
      style="width: 280px; height: 120px; cursor: pointer; margin-top: 30px"
    />

    <!-- Modal para listar os arquivos -->
    <v-dialog v-model="isModalOpen" max-width="800px">
      <v-card>
        <v-card-title >Arquivos da Pasta</v-card-title>
        <v-container>
          <div style="display: flex;justify-content: center;align-items: center;">
            <v-btn  color="green" @click="openDirectory">Abrir Pasta de Arquivos</v-btn>
          </div>
            <v-row class="mt-5" v-if="files.length">
              <v-col cols="4" v-for="file in files" :key="file.name">
                <div style="display: flex; align-items: center; justify-content: space-between;">
                  {{ file.name }}
                  <v-btn color="green" @click="uploadFile(file)">Enviar</v-btn>
                </div>
              </v-col>
            </v-row>
          </v-container>
          <div>
            <v-btn color="red" text @click="isModalOpen = false">Fechar</v-btn>
          </div>

      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>

const config = useRuntimeConfig();
const { $toast } = useNuxtApp();

const upload = `${config.public.managemant}/upload`;
const acionarScanner = `${config.public.biometria}/run-scanner`;

const files = ref([]);
const isModalOpen = ref(false);

const tokenCookie = useCookie('pessoa_token');
const token = tokenCookie.value;

async function openDirectory() {
  try {
    const directoryHandle = await window.showDirectoryPicker();
    files.value = [];

    // Itera sobre os arquivos da pasta e adiciona ao array
    for await (const entry of directoryHandle.values()) {
      if (entry.kind === 'file') {
        const file = await entry.getFile();
        files.value.push(file);
      }
    }
  } catch (error) {
    console.error('Erro ao acessar a pasta:', error);
  }
}

// Função para enviar o arquivo
async function uploadFile(file) {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('pessoa_token', token);
  formData.append('bucket', 'cartorio-teste');
  formData.append('tipo', 'ficha');

  try {
    const { data, error, status } = await useFetch(upload, {
      method: "POST",
      body: formData
    });
    if (status.value === 'success') {
      $toast.success("Documento enviado com sucesso!");
    } else {
      $toast.error("Falha no envio do documento.");
    }
  } catch (error) {
    console.error('Erro no upload:', error);
  }
}

const openScannerAndModal = async() =>{
  isModalOpen.value = true
  const { data } = await useFetch(acionarScanner, {
    method: "GET"
  });
  console.log(acionarScanner)
}
</script>


