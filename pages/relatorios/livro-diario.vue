<template>
  <v-container>
    <v-row class="mt-1">
      <v-col>
        <v-text-field
          v-model="state.data_inicial"
          label="Data Inicial"
          placeholder="dd/mm/yyyy"
          v-mask="'##/##/####'"
        ></v-text-field>
      </v-col>
      <v-col>
        <v-text-field
          v-model="state.data_final"
          label="Data Final"
          placeholder="dd/mm/yyyy"
          v-mask="'##/##/####'"
        ></v-text-field>
      </v-col>
      <v-col>
        <v-text-field
          label="N* Livro"
          type="number"
          v-model="state.livro"
        ></v-text-field>
      </v-col>
      <v-col>
        <v-text-field
          label="Pagina Inicial"
          type="number"
          v-model="state.paginaInicial"
        ></v-text-field>
      </v-col>
      <v-col>
        <img
          @click="gerarRelatorioDiarioCaixa"
          style="width: 40px; height: 40px; cursor: pointer"
          src="../../assets/imprimir.png"
          alt="imprimir"
          title="imprimir"
        />
        <img
          @click="gerarRelatorioDiarioCaixaCSV"
          style="width: 40px; height: 40px; cursor: pointer; margin-left: 20px"
          src="../../assets/btn-csv.png"
          alt="exportar"
          title="exportar"
        />
      </v-col>
      <v-col> </v-col>
    </v-row>
  </v-container>
</template>
<script setup>
const config = useRuntimeConfig();
const gerarRelatorio = `${config.public.managemant}/relatorios`;
const cartorio_token = ref(useCookie("user-data").value.cartorio_token);

const state = reactive({
  data_inicial: null || getCurrentDate(),
  data_final: null || getCurrentDate(),
  paginaInicial: 0,
  livro: 0,
});

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

const gerarRelatorioDiarioCaixa = async () => {
  const { data } = await useFetch(gerarRelatorio, {
    method: "POST",
    body: {
      cartorio_token: cartorio_token,
      data_inicial: convertToISODate(state.data_inicial),
      data_final: convertToISODate(state.data_final),
      livro: state.livro,
      paginaInicial: state.paginaInicial,
    },
  });

  if (data.value) {
    const blob = new Blob([data.value], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank");

    setTimeout(() => URL.revokeObjectURL(url), 10000);
  }
};

const gerarRelatorioDiarioCaixaCSV = async () => {
  const response = await fetch(gerarRelatorio, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      cartorio_token: cartorio_token.value,
      data_inicial: convertToISODate(state.data_inicial),
      data_final: convertToISODate(state.data_final),
      livro: state.livro,
      paginaInicial: state.paginaInicial,
      tipo_retorno: "csv",
    }),
  });

  if (response.ok) {
    const blob = await response.blob();
    // O nome do arquivo está vindo como "relatorio.csv" porque o backend provavelmente não está enviando o header Content-Disposition com o filename.
    // Se o header não vier, usamos "relatorio.csv" como padrão.
    let filename = "relatorio.csv";
    const disposition = response.headers.get("Content-Disposition");
    console.log("######\n", disposition);
    if (disposition && disposition.includes("filename=")) {
      filename = disposition.split("filename=")[1].replace(/['"]/g, "").trim();
    }
    // Se quiser um nome mais descritivo, pode gerar aqui caso o header não venha:
    if (filename === "relatorio.csv") {
      // Gera nome no padrão livro_diario_ddmmyyyyhhmiss.csv
      const now = new Date();
      const pad = (n) => n.toString().padStart(2, "0");
      const dd = pad(now.getDate());
      const mm = pad(now.getMonth() + 1);
      const yyyy = now.getFullYear();
      const hh = pad(now.getHours());
      const mi = pad(now.getMinutes());
      const ss = pad(now.getSeconds());
      filename = `livro_diario_${dd}${mm}${yyyy}${hh}${mi}${ss}.csv`;
    }
    // Create a link and trigger download
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      URL.revokeObjectURL(url);
      document.body.removeChild(a);
    }, 1000);
  }
};
</script>
