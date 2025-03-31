<template>
  <v-container>
    <v-row>

      <v-col cols="5" class="mt-2">
        <v-text-field
        v-if="!isVisualizar"
          v-model="state.descricao"
          :error-messages="v$.descricao.$errors.map((e) => e.$message)"
          @blur="v$.descricao.$touch"
          @update:modelValue="v$.descricao.$touch"
          required
          label="Descrição"
        ></v-text-field>
      </v-col>
      <div v-if="!isVisualizar" @click="handleScannerClick" title="Escanear">
        <img
          class="mt-3"
          style="width: 40px; height: 40px; cursor: pointer"
          src="../../../assets/escanear.png"
          alt="Escanear"
        />
      </div>
      <!-- <div v-if="status_arquivo">
        <div @click="openFolderFromPc" title="Criar">
          <img
            class="mt-3 ml-2"
            style="width: 40px; height: 40px; cursor: pointer"
            src="../../../assets/abre-arquivo.png"
            alt="Criar"
          />
        </div>
      </div> -->
      <div @click="openFolderFromPc" title="Criar">
        <img
          v-if="status_arquivo === false"
          class="mt-3 ml-2"
          style="width: 40px; height: 40px; cursor: pointer"
          src="../../../assets/abre-arquivo-vermelho.jpeg"
          alt="Criar"
        />
        <img
          v-else-if="status_arquivo === true"
          class="mt-3 ml-2"
          style="width: 40px; height: 40px; cursor: pointer"
          src="../../../assets/abre-arquivo-verde.png"
          alt="Criar"
        />
        <img
          v-else
          class="mt-3 ml-2"
          style="width: 40px; height: 40px; cursor: pointer"
          src="../../../assets/abre-arquivo.png"
          alt="Criar"
        />
      </div>
      <div v-if="!isVisualizar" @click="createAnexo" title="Criar">
        <img
          class="mt-3 ml-2"
          style="width: 40px; height: 40px; cursor: pointer"
          src="../../../assets/novo.png"
          alt="Criar"
        />
      </div>
    </v-row>
    <v-data-table
      :headers="headers"
      :items="anexos"
      style="height: 465px; max-width: 600px"
    >
      <template v-slot:item.actions="{ item }">
        <v-row>
          <div
            style="display: flex; cursor: pointer; justify-content: flex-end"
            class="mr-2"
            @click="redirectToAnexo(item)"
            title="Visualizar Anexo"
          >
            <img
              style="width: 30px; height: 30px"
              @click="visualisarAnexo(item)"
              src="../../../assets/visualizar.png"
              alt="Visualizar"
            />
          </div>
          <div
            class="mr-2"
            style="display: flex; cursor: pointer; justify-content: flex-end"
            @click="deleteAnexo(item)"
            title="Deletar Pessoa"
          >
            <img
              v-if="item.excluido"
              style="width: 30px; height: 30px"
              src="../../../assets/excluido.png"
              alt="Visualizar"
              title="Reativar"
            />
            <img
              v-else
              src="../../../assets/mudarStatus.png"
              alt="Excluir"
              class="trash-icon"
              style="width: 30px; height: 30px"
              title="Excluir"
            />
          </div>
        </v-row>
      </template>
    </v-data-table>
    <!-- <v-dialog v-model="isModalAnexoOpen" width="600">
      <v-card max-width="600" title="Anexo">
        <v-btn
          class="ms-auto mt-3 mb-3"
          text="Fechar"
          size="large"
          color="red"
          @click="isModalAnexoOpen = false"
        ></v-btn>
      </v-card>
    </v-dialog> -->
    <NuxtLink @click="goBack">
      <v-btn size="large" color="red">Voltar</v-btn>
    </NuxtLink>
  </v-container>
</template>

<script setup>
import { useVuelidate } from "@vuelidate/core";
import { helpers, required } from "@vuelidate/validators";
import { tr } from "vuetify/locale";

const config = useRuntimeConfig();
const { $toast } = useNuxtApp();
const router = useRouter();
const route = useRoute();
const isVisualizar = ref(route.query.origem === 'vizualizar');
const acionarScanner = `${config.public.biometria}/run-scanner`;
const criarAtoAnexo = `${config.public.managemant}/atos_anexos`;
const atualizarAtoAnexo = `${config.public.managemant}/atos_anexos`;
const downloadAnexo = `${config.public.managemant}/download`;

const getAnexos = `${config.public.managemant}/atos_anexos`;
const upload = `${config.public.managemant}/upload`;

const isModalAnexoOpen = ref(false);

const status_arquivo = ref(null); // Variável para indicar erro na seleção do arquivo

const anexos = ref([]);
const tokenCookie = useCookie("pessoa_token");
const state = reactive({
  descricao: "",
  fileEvent: null
});

const rules = {
  descricao: {
    required: helpers.withMessage("O campo é obrigatório", required),
  },

};

const v$ = useVuelidate(rules, state, { $autoDirty: true });

const headers = [
  {
    title: "Documento",
    key: "descricao",
  },
  { text: "Ações", value: "actions" },
];

const { data } = await useFetch(`${getAnexos}/${route.query.ato_id}`, {
  method: "GET",
});
anexos.value = data.value;

async function handleScannerClick() {
  try {
    await openScanner();
    await enviarArquivo();
  } catch (error) {
    console.error("Erro ao executar scanner ou listar arquivos:", error);
  }
}

async function openScanner() {
  try {
    const { data } = await useFetch(acionarScanner, { method: "GET" });
  } catch (error) {
    $toast.error("Erro ao acionar o scanner:", error);
  }
}

  /**
   * Envia o arquivo escolhido pelo usuário para o servidor local.
   * @returns {Promise<void>}
   */
async function enviarArquivo() {
  try {
    const { data, status } = await useFetch(
      "http://localhost:3500/uploadAnexo",
      {
        method: "POST",
        body: {
          tipo: "ato_translado",
          token: route.query.ato_token_edit,
          cartorio_token: useCookie("user-data").value.cartorio_token,
        },
      }
    );
  } catch (error) {
    console.error("Erro ao enviar o arquivo:", error);
  }
}

async function openFolderFromPc() {
  try {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "*/*"; // Accept all file types
    input.onchange = async (event) => {
      state.fileEvent = event;
      const file = event.target.files[0];
      if(file){
        status_arquivo.value = true;
      }
    };
    input.click();
  } catch (error) {
    console.error("Erro ao abrir o explorador de arquivos:", error);
  }
}

const redirectToAnexo = async () => {
  isModalAnexoOpen.value = true;
};



function validarArquivoSelecionado(file) {
  if (!file) {
    console.error("Erro: Nenhum arquivo foi selecionado!");
    status_arquivo.value = false; // Define erro
    return false;
  }
  console.log("Arquivo válido:", file.name);
  // isError.value = false; // Remove erro
  return true;
}
const UploadAnexo = async (token) => {
  if (!state.fileEvent || !state.fileEvent.target.files.length) {
    console.error("Nenhum arquivo selecionado.");
    $toast.error("Nenhum arquivo selecionado.");
    return;
  }

  // Pega o arquivo correto
  const file = state.fileEvent.target.files[0];

  console.log("Arquivo selecionado:", file);

  const formData = new FormData();
  formData.append("file", file); // Adiciona o arquivo corretamente
  formData.append("cartorio_token", useCookie("user-data").value.cartorio_token);
  formData.append("token", token);
  formData.append("tipo", "ato_anexo");

  try {
    // Envia o FormData para o servidor
    const response = await useFetch(upload, {
      method: "POST",
      body: formData,
    });

    console.log("Resposta do servidor:", response.data);
    $toast.success("Anexo registrado com sucesso!");

  } catch (error) {
    console.error("Erro ao enviar o arquivo:", error);
    $toast.error("Erro ao enviar o arquivo.");
  }
};

const createAnexo = async () => {


  v$.value.$touch(); // Aciona a validação antes de prosseguir
  if (v$.value.$invalid) {
    return;
  }
  if(validarArquivoSelecionado(state.fileEvent)){
    const { data, error, status } = await useFetch(criarAtoAnexo, {
      method: "POST",
      body: {
        ato_id: route.query.ato_id,
        descricao: state.descricao,
        user_id: useCookie("user-data").value.usuario_id,
        link: "sdfsdfsdf",
      },
    });
    if (status.value === "success") {
      $toast.success("Anexo registrado com sucesso!");
      anexos.value.push(data.value);
      console.log('createAnexo\n',data.value.token);
      UploadAnexo(data.value.token);

    }    
  }


};

async function deleteAnexo(item) {
  item.excluido = !item.excluido;
  try {
    await useFetch(`${atualizarAtoAnexo}/${item.id}`, {
      method: "PUT",
      body: JSON.stringify({ excluido: item.excluido }),
    });
  } catch (error) {
    console.error("Erro ao excluir pessoa:", error);
  }
}




async function visualisarAnexo(item) {
  try {

    const data = await useFetch(`${downloadAnexo}`, {
      method: "POST",
      body:  { bucket: useCookie("user-data").value.cartorio_token, path: item.link },
    });
    // console.log(data.data.value);
    // window.open(data.data.value, "_blank");

    // visualizarDocumento(data.data.value);
    const response = await fetch(data.data.value); // Baixa o arquivo
    const blob = await response.blob(); // Converte a resposta para Blob
    const blobUrl = URL.createObjectURL(blob); // Cria URL temporária

    window.open(blobUrl, "_blank");

  } catch (error) {
    console.error("Erro ao excluir pessoa:", error);
  }
}

const goBack = () => {
  const origem = route.query.origem || "criar";
  const id = route.query.id;
  if (origem === "atualizar" || origem === "vizualizar") {
    router.push(`/os/atualizar/${id}`);
  } else {
    router.push("/os/criar-registro");
  }
};
</script>
