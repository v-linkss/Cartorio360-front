<template>
  <v-container v-if="!pending" class="mt-5">
    <v-row>
      <v-col md="2">
        <v-autocomplete
          v-model="selectedItem"
          :items="documentos.tipoDocumentoItems"
          label="Tipo"
          item-title="descricao"
          item-value="id"
        ></v-autocomplete>
      </v-col>
      <v-col>
        <v-text-field v-model="valorTitulos" label="Numero"></v-text-field>
      </v-col>
      <v-col md="2">
        <v-text-field label="Emissor"></v-text-field>
      </v-col>
      <v-col>
        <v-autocomplete
          v-model="state.uf_model"
          :items="documentos.ufItems"
          label="UF"
         item-title="descricao"
          item-value="id"
        ></v-autocomplete>
      </v-col>
      <v-col md="2">
        <v-text-field
          v-model="state.emissao"
          type="date"
          label="Emissão"
        ></v-text-field>
      </v-col>
      <v-col md="2">
        <v-text-field
          v-model="state.validade"
          type="date"
          label="Validade"
        ></v-text-field>
      </v-col>
      <div class="mt-3">
        <img
          style="width: 40px; height: 40px; cursor: pointer"
          src="../assets/novo.png"
          alt="novo"
        />
      </div>
    </v-row>
    <v-data-table
      :headers="headers"
      item-key="name"
    ></v-data-table>
    <NuxtLink to="/home">
        <img class="btn-pointer" src="../assets/sair.png" alt="Sair" />
      </NuxtLink>
  </v-container>
</template>

<script setup>
const selectedItem = ref(null);
const valorTitulos = ref("");
const state = reactive({
  uf_model: "",
  emissao: "",
  validade: "",
});

const headers = [
  { title: "Tipo",},
  { title: "Número",  },
  { title: "Emissor",  },
  {
    title: "UF"
  },
  {
    title: "Emissão"
  },
  {
    title: "Validade"
  },
];

const { data: documentos,status,pending } = await useLazyAsyncData("cliente-documentos", async () => {
  const [tipoDocumentoItems, ufItems] = await Promise.all([
    $fetch("http://45.55.192.246:3746/listarTipoDocumento"),
    $fetch( "http://45.55.192.246:3746/listarUF"),
  ]);

  return { tipoDocumentoItems,ufItems };

});
</script>
