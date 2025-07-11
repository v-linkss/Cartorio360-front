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
          @click="gerarRelatorioDiarioCaixa"
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
    const newWindow = window.open();
    if (newWindow) {
      newWindow.document.open();
      newWindow.document.writeln(data.value);
      newWindow.document.close();
    }
  }
};
</script>
