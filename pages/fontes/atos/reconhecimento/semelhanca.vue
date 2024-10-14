<template>

  <v-row>
    <v-col cols="6">
      <h1>Reconhecimento por Semelhança</h1>
      <v-row class="mt-5">
        <v-col cols="8">
          <v-autocomplete label="Tabelião/escrevente"> </v-autocomplete>
        </v-col>
        <v-col cols="3">
          <v-text-field label="Quantidade"> </v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="4">
          <v-text-field label="Documento"> </v-text-field>
        </v-col>
        <v-col cols="6">
          <v-text-field label="Pessoa"> </v-text-field>
        </v-col>
        <div>
          <img
            class="btn-pointer mt-3"
            src="../../../../assets/visualizar.png"
            @click="atoAutentica"
            style="width: 40px;"
          />
        </div>
      </v-row>

      <v-data-table :headers="headers" show-select item-key="id">
      </v-data-table>

      <v-row>
          <NuxtLink @click="goBack">
            <img
              class="btn-pointer mt-10 mb-5"
              src="../../../../assets/sair.png"
              alt="Sair"
            />
          </NuxtLink>
 
          <div>
            <img
              class="btn-pointer mt-10 mb-5"
              src="../../../../assets/salvar.png"
              @click="atoAutentica"
            />
          </div>
      </v-row>
    </v-col>
    <v-col>
      <v-data-table :headers="headers" item-key="id"> </v-data-table>
    </v-col>
  </v-row>


</template>
<script setup>
// defineProps({
//   token: {
//     type: String,
//     required: true,
//   },
// });

const headers = ref([]);
const goBack = () => {
  const origem = route.query.origem || "criar";
  const id = route.query.id;
  if (origem === "atualizar") {
    router.push(`/ordens-servicos/atualizar/${id}`);
  } else {
    router.push("/ordens-servicos/criar-registro");
  }
};
</script>
