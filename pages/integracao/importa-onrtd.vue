<template>
  <div
    v-if="statusLoading === 'pending'"
    class="d-flex align-center justify-center"
    style="height: 80vh"
  >
    <v-progress-circular
      class="loading-spinner"
      indeterminate
      size="64"
    ></v-progress-circular>
  </div>
  <v-container v-else>
    <h1>Importar Lançamentos do Caixa (ONRTD)</h1>

    <input
      ref="fileInput"
      type="file"
      accept=".json"
      style="display: none"
      @change="handleFileChange"
    />

    <div class="mt-2" @click="openFolderFromPc" title="Criar">
      <img
        class="mt-3 ml-2"
        style="width: 80px; height: 80px; cursor: pointer"
        src="../../assets/abre-arquivo.png"
        alt="Criar"
      />
      <span v-if="file" class="ml-4" style="font-size: 1.3rem">{{
        file.name
      }}</span>
    </div>
    <SaveButton
      :text="'Importar'"
      class="mt-5"
      :disabled="!file"
      :onSave="openConfirmModal"
    />
    <ModalConfirmacao
      :show="ModalConfirmacaoOpen"
      :cond-message="'Deseja continuar com a importação? Essa operação não poderá ser desfeita.'"
      @close="ModalConfirmacaoOpen = false"
      @confirm="importFile"
    />
  </v-container>
</template>

<script setup>
const config = useRuntimeConfig();
const { $toast } = useNuxtApp();
const importaCaixaOnrtd = `${config.public.managemant}/importa_caixa_onrtd`;
const cartorio_token = useCookie("user-data").value.cartorio_token;
const usuario_token = useCookie("auth_token").value;

const file = ref(null);
const statusLoading = ref(null);
const ModalConfirmacaoOpen = ref(false);
const fileInput = ref(null);

function openFolderFromPc() {
  fileInput.value && fileInput.value.click();
}

function handleFileChange(event) {
  const selectedFile = event.target.files[0];
  file.value = selectedFile || null;
}

const openConfirmModal = () => {
  ModalConfirmacaoOpen.value = true;
};

async function importFile() {
  const conteudo = await file.value.text();
  statusLoading.value = "pending";
  const { data, status, error } = await useFetch(importaCaixaOnrtd, {
    method: "POST",
    body: {
      cartorio_token,
      usuario_token,
      conteudo,
    },
  });
  statusLoading.value = status.value;
  if (status.value === "success") {
    $toast.success("Importação realizada com sucesso!");
    ModalConfirmacaoOpen.value = false;
  } else {
    $toast.error(`Erro: ${error.value.data.details}`);
  }
}
</script>
