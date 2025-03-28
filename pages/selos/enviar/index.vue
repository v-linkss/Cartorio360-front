<template>
    <v-container class="mt-5">
      <v-text-field
        v-model="search"
        label="Buscar pelo protocolo..."
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
        <template v-slot:item.situacao="{ item }">
          <v-chip color="green" text-color="white" outlined>
            {{ item.situacao }}
          </v-chip>
        </template>
      </v-data-table>
    </v-container>
  </template>
  
  <script setup>
  const search = ref("");
  
  const headers = [
    { title: "Selo", value: "selo" },
    { title: "Protocolo TJ", value: "protocolo_tj" },
    { title: "Protocolo", value: "protocolo" },
    { title: "Tipo de pedido", value: "tipo_pedido" },
    { title: "Emolumentos R$", value: "emolumentos" },
    { title: "Selo R$", value: "selo_valor" },
    { title: "Total R$", value: "total" },
    { title: "Situação", value: "situacao" },
  ];
  
  const selos = ref([
    {
      selo: "AFQ34168-AYTX",
      protocolo_tj: "211661",
      protocolo: "2025022516205013",
      tipo_pedido: "Registro Primitivo Integral",
      emolumentos: "R$ 15,49",
      selo_valor: "R$ 35,19",
      total: "R$ 50,68",
      situacao: "Enviado",
    },
    {
      selo: "AFR39424-V4D9",
      protocolo_tj: "211994",
      protocolo: "2025031815365103",
      tipo_pedido: "Registro Primitivo Integral",
      emolumentos: "R$ 77,09",
      selo_valor: "R$ 35,19",
      total: "R$ 236,08",
      situacao: "Enviado",
    },
    {
      selo: "AFP57028-XL0E",
      protocolo_tj: "8159",
      protocolo: "2025022112013650",
      tipo_pedido: "Constituição de nova PJ",
      emolumentos: "R$ 94,69",
      selo_valor: "R$ 35,19",
      total: "R$ 134,61",
      situacao: "Enviado",
    },
  ]);
  
  const filteredSelos = computed(() => {
    return selos.value.filter((item) => {
      const searchTerm = search.value.toLowerCase();
      return (
        item.protocolo_tj.toLowerCase().includes(searchTerm) ||
        item.protocolo.toLowerCase().includes(searchTerm)
      );
    });
  });
  </script>
  