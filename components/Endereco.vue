<template>
  <v-container v-if="!pending" class="mt-5">
    <v-row>
      <v-col md="2">
        <v-autocomplete
          v-model="selectedItem"
          :items="paisItems"
          label="País"
          item-title="descricao"
          item-value="id"
        ></v-autocomplete>
      </v-col>
      <v-col>
        <v-text-field v-model="cep" label="CEP"></v-text-field>
      </v-col>
      <v-col md="2">
        <v-text-field label="Endereço"></v-text-field>
      </v-col>
      <v-col md="1">
        <v-text-field v-model="state.numero" label="N*"></v-text-field>
      </v-col>
      <v-col md="2">
        <v-text-field v-model="state.bairro" label="Bairro"></v-text-field>
      </v-col>
      <v-col md="2">
        <v-autocomplete
          v-model="cidade"
          :items="cidade"
          label="Cidade"
          item-title="nome"
          item-value="token"
        ></v-autocomplete>
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
const valorTitulos = ref('');
const state = reactive({
  uf_model: '',
  emissao: '',
  validade: ''
});

const {data:paisItems,pending} = await useLazyFetch('http://localhost:3200/listarPais')
</script>


