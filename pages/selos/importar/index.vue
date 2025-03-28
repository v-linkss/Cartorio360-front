<template>
  <v-container class="mt-5">
    <v-text-field
      v-model="search"
      label="Buscar selo, cor, situação ou protocolo"
      prepend-inner-icon="mdi-magnify"
      variant="outlined"
      hide-details
      class="mb-4"
    ></v-text-field>
    <v-data-table
      density="compact"
      :headers="headers"
      :items="filteredSelos"
      item-key="selo"
    >
      <template v-slot:item.certificado_nt="{ item }">
        <span>{{ item.certificado_nt ? "Sim" : "Não" }}</span>
      </template>
    </v-data-table>
  </v-container>
</template>

<script setup>
const search = ref("");

const headers = [
  { title: "Selo", value: "selo" },
  { title: "Cor", value: "cor" },
  { title: "Situação", value: "situacao" },
  { title: "Protocolo", value: "protocolo" },
  { title: "Certificado NT", value: "certificado_nt" },
  { title: "Data cadastro", value: "data_cadastro" },
];

const selos = ref([
  {
    selo: "AFR39581-762Q",
    cor: "VERMELHO",
    situacao: "Disponível",
    protocolo: "",
    certificado_nt: false,
    data_cadastro: "17/03/2025 16:54",
  },
  {
    selo: "BFR12345-678X",
    cor: "AZUL",
    situacao: "Utilizado",
    protocolo: "123456",
    certificado_nt: true,
    data_cadastro: "15/02/2025 10:30",
  },
  {
    selo: "CFR98765-432Y",
    cor: "VERDE",
    situacao: "Cancelado",
    protocolo: "789012",
    certificado_nt: false,
    data_cadastro: "20/01/2025 14:20",
  },
  {
    selo: "DFR54321-098Z",
    cor: "AMARELO",
    situacao: "Disponível",
    protocolo: "",
    certificado_nt: true,
    data_cadastro: "10/03/2025 09:15",
  },
  {
    selo: "EFR11223-445W",
    cor: "ROXO",
    situacao: "Utilizado",
    protocolo: "456789",
    certificado_nt: false,
    data_cadastro: "05/04/2025 11:45",
  },
]);

const filteredSelos = computed(() => {
  return selos.value.filter((item) => {
    const searchTerm = search.value.toLowerCase();
    return (
      item.selo.toLowerCase().includes(searchTerm) ||
      item.cor.toLowerCase().includes(searchTerm) ||
      item.situacao.toLowerCase().includes(searchTerm) ||
      item.protocolo.toLowerCase().includes(searchTerm)
    );
  });
});
</script>
