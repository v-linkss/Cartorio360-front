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
              style="width: 40px; height: 40px"
              src="../../assets/escanear.png"
              alt="Escanear"
            />
          </div>
          <div
            @click="createAnexo"
            title="Criar"
          >
            <img
            class="mt-3 ml-2"
              style="width: 40px; height: 40px"
              src="../../assets/novo.png"
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
                @click="redirectToFicha(item)"
                title="Visualizar Ficha"
              >
                <img
                  style="width: 30px; height: 30px"
                  src="../../assets/visualizar.png"
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
                @click="deletePessoa(item)"
                title="Deletar Pessoa"
              >
                <!-- <img
                  v-if="item.excluido"
                  style="width: 30px; height: 30px"
                  src="../../assets/excluido.png"
                  alt="Visualizar"
                  title="Reativar"
                /> -->
                <img
                  src="../../assets/mudarStatus.png"
                  alt="Excluir"
                  class="trash-icon"
                  style="width: 30px; height: 30px"
                  title="Excluir"
                />
              </div>
            </v-row>
          </template>
    </v-data-table>
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
const viewDoc = `${config.public.envioDoc}`;
const acionarScanner = `${config.public.biometria}/run-scanner`;
const tokenCookie = useCookie('pessoa_token');
const token = tokenCookie.value;
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

async function handleScannerClick() {
  try {
    await openScanner();
    await enviarArquivo()
  } catch (error) {
    console.error('Erro ao executar scanner ou listar arquivos:', error);
  }
}

// Função para acionar o scanner
async function openScanner() {

  try {
    const { data } = await useFetch(acionarScanner, { method: 'GET' });

  } catch (error) {
    $toast.error('Erro ao acionar o scanner:', error);
  }
}

async function enviarArquivo() {
  try {
    const { status } = await useFetch(viewDoc, {
      method: 'POST',
      body: { tipo: 'ficha', pessoa_token: token }
    });
  } catch (error) {
    console.error('Erro ao enviar o arquivo:', error);
  }
}

const createAnexo = async()=>{
  const anexo = {
    descricao:state.descricao
  }
  anexos.value.push(anexo)
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
