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
      :items="items"
      item-key="name"
    ></v-data-table>
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
  { title: "Pyramid", value: "name" },
  { title: "Location", value: "location" },
  { title: "Construction Date", value: "constructionDate" },
  {
    title: "Dimensions",
    align: "center",
    children: [
      { title: "Height (m)", value: "height" },
      { title: "Base (m)", value: "base" },
      { title: "Volume (m³)", value: "volume" },
    ],
  },
];
const items = [
  {
    name: "Great Pyramid of Giza",
    location: "Egypt",
    height: "146.6",
    base: "230.4",
    volume: "2583285",
    constructionDate: "c. 2580–2560 BC",
  },
  {
    name: "Pyramid of Khafre",
    location: "Egypt",
    height: "136.4",
    base: "215.3",
    volume: "1477485",
    constructionDate: "c. 2570 BC",
  },
  {
    name: "Red Pyramid",
    location: "Egypt",
    height: "104",
    base: "220",
    volume: "1602895",
    constructionDate: "c. 2590 BC",
  },
  {
    name: "Bent Pyramid",
    location: "Egypt",
    height: "101.1",
    base: "188.6",
    volume: "1200690",
    constructionDate: "c. 2600 BC",
  },
  {
    name: "Pyramid of the Sun",
    location: "Mexico",
    height: "65",
    base: "225",
    volume: "1237097",
    constructionDate: "c. 200 CE",
  },
];

const { data: documentos,status,pending } = await useLazyAsyncData("cliente-documentos", async () => {
  const [tipoDocumentoItems, ufItems] = await Promise.all([
    $fetch("http://localhost:3200/listarTipoDocumento"),
    $fetch( "http://localhost:3200/listarUF"),
  ]);

  return { tipoDocumentoItems,ufItems };

});
</script>
