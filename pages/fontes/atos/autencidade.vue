<template>
  <v-card class="mt-10" v-if="!pending" title=" Reconhecimento de Autencidade">
    <v-container> 

      <div style="width: 600px; margin-top: 10px;">
        <v-autocomplete label="Tabelião/escrivão"></v-autocomplete>
      </div>
      <div style="width: 600px; margin-top: 20px;">
        <v-text-field label="Quantidade"> </v-text-field>
      </div>
      <v-row>
        <img class="btn-pointer mt-10 mb-5" src="../../../assets/sair.png" alt="Sair" />

        <img class="btn-pointer mt-10"
          src="../../../assets/salvar.png"></img>
      </v-row>
    </v-container>
  </v-card>
</template>

<script setup>
const config = useRuntimeConfig();
</script>

<style scoped>
    .btn-pointer{
      width: 50px; height: 50px;margin-left: 25px; margin-top: 20px;cursor: pointer;
    }
</style>
