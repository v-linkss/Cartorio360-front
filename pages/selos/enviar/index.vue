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
      show-select
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
  
  const selos = ref([]);
  
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
  