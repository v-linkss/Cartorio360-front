<template>
  <v-progress-circular
    class="d-flex justify-center align-center"
    indeterminate
    size="64"
    v-if="loading"
    style="position: absolute; top: 40%; left: 50%;"
  ></v-progress-circular>
  <v-container v-else class="mt-5">
    <div class="d-flex flex-column">
      <v-btn
        class="mb-10 mt-auto align-self-end"
        color="green"
        size="large"
        @click="isModalOpen = true"
      >
        Importar Selos TJ
      </v-btn>
    </div>
    <v-row class="mb-4" style="gap: 10rem;">
      <v-col cols="12" md="2">
        <v-text-field
          v-model="filters.dt_compra"
          label="Data de Compra"
          prepend-inner-icon="mdi-magnify"
          variant="outlined"
          hide-details
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="2">
        <v-text-field
          v-model="filters.numero"
          label="Selo"
          prepend-inner-icon="mdi-magnify"
          variant="outlined"
          hide-details
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="2">
        <v-text-field
          v-model="filters.lote_compra"
          label="Valor de Compra"
          prepend-inner-icon="mdi-magnify"
          variant="outlined"
          hide-details
        ></v-text-field>
      </v-col>
    </v-row>
    <!-- Tabela -->
    <v-data-table
      density="compact"
      :headers="headers"
      :items="filteredSelos"
      item-key="selo"
    >
      <template v-slot:item.actions="{ item }">
        <div
          style="display: flex; cursor: pointer; justify-content: flex-end"
          @click="deleteObservacao(item)"
          title="Deletar Observação"
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
      </template>
    </v-data-table>
    <ModalImportaSelos :show="isModalOpen" @close="isModalOpen = false" />
  </v-container>
</template>

<script setup>
const config = useRuntimeConfig();
const selos = ref([]);
const isModalOpen = ref(false);
const loading = ref(false);
const getSelo = `${config.public.managemant}/selos`;

// Filtros individuais
const filters = reactive({
  dt_compra: "",
  numero: "",
  lote_compra: "",
  sequencia: "",
  sigla: "",
});

const headers = [
  { title: "Data de compra", value: "dt_compra" },
  { title: "Selo", value: "numero" },
  { title: "Valor de compra", value: "lote_compra" },
  // { value: "actions" },
];

const fetchSelos = async () => {
  loading.value = true;
  try {
    const { data, error, status } = await useFetch(getSelo, {
      method: "GET",
    });
    if (status.value === "success") {
      selos.value = Array.isArray(data.value)
        ? data.value.map((item) => ({
            ...item,
            dt_compra: item.dt_compra ? formatDate(item.dt_compra, 'dd/mm/yyyy') :null, // Aplica a formatação da data
          }))
        : [];
    } else {
      console.error(error);
    }
  } catch (err) {
    console.error("Erro ao buscar selos:", err);
  } finally {
    loading.value = false;
  }
};

// Filtragem com base nos filtros individuais
const filteredSelos = computed(() => {
  return selos.value.filter((item) => {
    return (
      (!filters.dt_compra || item.dt_compra.toLowerCase().includes(filters.dt_compra.toLowerCase())) &&
      (!filters.numero || item.numero.toLowerCase().includes(filters.numero.toLowerCase())) &&
      (!filters.lote_compra || item.lote_compra.toLowerCase().includes(filters.lote_compra.toLowerCase())) &&
      (!filters.sequencia || item.sequencia.toLowerCase().includes(filters.sequencia.toLowerCase())) &&
      (!filters.sigla || item.sigla.toLowerCase().includes(filters.sigla.toLowerCase()))
    );
  });
});

fetchSelos();
</script>
