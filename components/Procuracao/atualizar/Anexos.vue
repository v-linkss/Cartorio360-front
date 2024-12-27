<template>
<v-container>
    <v-row>
        <v-col cols="5">
            <v-text-field v-model="state.descricao" label="Descrição"></v-text-field>
        </v-col>
        <div
            @click="handleScannerClick"
            title="Escanear"
          >
            <img
            class="mt-3 "
              style="width: 40px; height: 40px;cursor: pointer;"
              src="../../../assets/escanear.png"
              alt="Escanear"
            />
          </div>
          <div
            @click="createAnexo"
            title="Criar"
          >
            <img
              class="mt-3 ml-2"
              style="width: 40px; height: 40px;cursor: pointer;"
              src="../../../assets/novo.png"
              alt="Criar"
            />
          </div>
    </v-row>
    <v-data-table :headers="headers" :items="anexos" style="height: 465px;max-width: 600px;">
      <template v-slot:item.actions="{ item }">
            <v-row>
              <div
                style="
                  display: flex;
                  cursor: pointer;
                  justify-content: flex-end;
                "
                class="mr-2"
                @click="redirectToAnexo(item)"
                title="Visualizar Anexo"
              >
                <img
                  style="width: 30px; height: 30px"
                  src="../../../assets/visualizar.png"
                  alt="Visualizar"
                />
              </div>
              <div
                class="mr-2"
                style="
                  display: flex;
                  cursor: pointer;
                  justify-content: flex-end;
                "
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
    <v-dialog v-model="isModalAnexoOpen" width="600">
      <v-card max-width="600" title="Anexo">
        <v-btn
          class="ms-auto mt-3 mb-3"
          text="Fechar"
          size="large"
          color="red"
          @click="isModalAnexoOpen = false"
        ></v-btn>
      </v-card>
    </v-dialog>
    <NuxtLink @click="goBack">
        <v-btn size="large" color="red">Voltar</v-btn>
      </NuxtLink>
</v-container>
</template>

<script setup>

const config = useRuntimeConfig();
const { $toast } = useNuxtApp();
const router = useRouter();
const route = useRoute();
const acionarScanner = `${config.public.biometria}/run-scanner`;
const criarAtoAnexo = `${config.public.managemant}/atos_anexos`;
const atualizarAtoAnexo = `${config.public.managemant}/atos_anexos`;
const getAnexos = `${config.public.managemant}/atos_anexos`;
const isModalAnexoOpen = ref(false)

const anexos = ref([])

const state = reactive({
  descricao: '',
});

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
    await enviarArquivo()
  } catch (error) {
    console.error('Erro ao executar scanner ou listar arquivos:', error);
  }
}

async function openScanner() {
  try {
    const { data } = await useFetch(acionarScanner, { method: 'GET' });

  } catch (error) {
    $toast.error('Erro ao acionar o scanner:', error);
  }
}

async function enviarArquivo() {
  try {
    const { data,status } = await useFetch("http://localhost:3500/uploadAnexo", {
      method: 'POST',
      body: { tipo: 'ato_translado', token: route.query.ato_token_edit ,cartorio_token:useCookie("user-data").value.cartorio_token}
    });
  } catch (error) {
    console.error('Erro ao enviar o arquivo:', error);
  }
}

const redirectToAnexo = async () => {
    isModalAnexoOpen.value = true
};

const createAnexo = async () => {
  const { data, error, status } = await useFetch(criarAtoAnexo, {
    method: "POST",
    body: {
      ato_id: route.query.ato_id,
      descricao: state.descricao,
      user_id: useCookie("user-data").value.usuario_id,
      link:"sdfsdfsdf"
    },
  });
  if(status.value==='success'){
    $toast.success("Anexo registrado com sucesso!")
    anexos.value.push(data.value)
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

const goBack = () => {
  const origem = route.query.origem || "criar";
  const id = route.query.id;
  if (origem === "atualizar") {
    router.push(`/os/atualizar/${id}`);
  } else {
    router.push("/os/criar-registro");
  }
};
</script>
