<template>
  <v-container class="py-6">
    <v-row class="mb-5">
      <v-col cols="12" class="mx-auto" style="max-width: 1200px;">
        <h1 class="text-h4 font-weight-bold">Integração CENSEC</h1>
      </v-col>
    </v-row>
    <v-card elevation="2" class="mx-auto" max-width="1200">

      <v-card-text class="pa-6">
        <!-- Seção de Período -->
        <div class="mb-6">
          <h3 class="text-h6 mb-4">Período de Consulta</h3>
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field v-model="state.data_inicio" label="Data Início" placeholder="dd/mm/yyyy"
                v-mask="'##/##/####'" prepend-inner-icon="mdi-calendar-start" variant="outlined"
                density="comfortable"></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field v-model="state.data_fim" label="Data Fim" placeholder="dd/mm/yyyy" v-mask="'##/##/####'"
                prepend-inner-icon="mdi-calendar-end" variant="outlined" density="comfortable"></v-text-field>
            </v-col>
          </v-row>
        </div>

        <v-divider class="my-6"></v-divider>

        <!-- Seção de Tipo de Validação -->
        <div class="mb-6">
          <h3 class="text-h6 mb-4">Tipo de Validação</h3>
          <v-radio-group v-model="state.validar" class="mt-2">
            <v-row>
              <v-col cols="12" sm="6" md="4" lg="2-4">
                <v-radio label="VALIDAR ATOS" value="ATOS" color="primary"></v-radio>
              </v-col>
              <v-col cols="12" sm="6" md="4" lg="2-4">
                <v-radio label="CESDI" value="CESDI" color="primary"></v-radio>
              </v-col>
              <v-col cols="12" sm="6" md="4" lg="2-4">
                <v-radio label="CEP" value="CEP" color="primary"></v-radio>
              </v-col>
              <v-col cols="12" sm="6" md="4" lg="2-4">
                <v-radio label="RCTO" value="RCTO" color="primary"></v-radio>
              </v-col>
              <v-col cols="12" sm="6" md="4" lg="2-4">
                <v-radio label="CCN" value="CCN" color="primary"></v-radio>
              </v-col>
            </v-row>
          </v-radio-group>
        </div>

        <v-divider class="my-6"></v-divider>

        <!-- Seção de Nome do Arquivo e Ação -->
        <div class="mb-4">
          <h3 class="text-h6 mb-4">Arquivo</h3>
          <v-row align="center">
            <v-col cols="12" md="8">
              <v-text-field label="Nome do arquivo" v-model="state.file_name"
                :disabled="!state.validar || state.validar === 'ATOS'" prepend-inner-icon="mdi-file-document-outline"
                variant="outlined" density="comfortable" hint="Selecione um tipo de validação primeiro"
                persistent-hint></v-text-field>
            </v-col>
            <v-col cols="12" md="4" class="d-flex justify-end">
              <SaveButton :text="'Enviar'" :onSave="enviaDadosCensec" class="px-8" />
            </v-col>
          </v-row>
        </div>
      </v-card-text>
    </v-card>

    <!-- Card de Resultados -->
    <v-card elevation="2" class="mx-auto mt-6" max-width="1200" v-if="dadosCensec">
      <v-card-title class="bg-success text-white pa-4">
        <v-icon class="mr-2">mdi-check-circle</v-icon>
        Dados CENSEC Retornados
      </v-card-title>
      <v-card-text class="pa-6">
        <pre class="bg-grey-lighten-4 pa-4 rounded">{{ JSON.stringify(dadosCensec, null, 2) }}</pre>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
const config = useRuntimeConfig();
const { $toast } = useNuxtApp();
const integraCensec = `${config.public.auth}/service/gerencia/integra_censec`;
const enviaCensec = `${config.public.ws}/censec/enviar`;

const tokenCookie = useCookie("auth_token");
const token = tokenCookie.value;
const state = reactive({
  data_inicio: getCurrentDate(),
  data_fim: getCurrentDate(),
  validar: null,
  file_name: "",
});

const dadosCensec = ref(null);


function getCurrentDate() {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");
  return `${dd}-${mm}-${yyyy}`;
}

function convertToISODate(date) {
  if (!date) return null;
  const [dd, mm, yyyy] = date.split("/");
  return `${yyyy}-${mm}-${dd}`;
}

const enviaDadosCensec = async () => {
  console.log("Token:", token);

  if (!state.validar) {
    $toast.warning("Selecione um tipo de validação antes de enviar!");
    return;
  }

  try {
    const response = await fetch(`${integraCensec}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        cartorio_token: useCookie("user-data").value.cartorio_token,
        data_inicio: convertToISODate(state.data_inicio),
        data_fim: convertToISODate(state.data_fim),
        validar: state.validar,
        file_name: state.file_name,
      }),
    });

    if (!response.ok) {
      throw new Error(`Erro ao gerar dados (HTTP ${response.status})`);
    }

    if (state.validar === "ATOS") {
      const htmlContent = await response.text();
      const newWindow = window.open("", "_blank");
      if (newWindow) {
        newWindow.document.open();
        newWindow.document.write(htmlContent);
        newWindow.document.close();
      } else {
        $toast.warning("Não foi possível abrir a nova aba (bloqueador de pop-up?).");
      }
    } else {
      if (!state.file_name) {
        $toast.warning("Digite o nome do arquivo!");
        return;
      }

      const blob = await response.blob();
      const contentDisposition = response.headers.get("Content-Disposition");
      const match = contentDisposition && contentDisposition.match(/filename="(.+)"/);
      const fileName = match ? match[1] : `${state.file_name}.json`;

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);

      $toast.success("Arquivo baixado com sucesso!");
    }
  } catch (err) {
    console.error(err);
    $toast.error("Erro ao processar a requisição.");
  }
};


</script>