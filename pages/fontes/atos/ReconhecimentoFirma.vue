<template>
  <v-card v-if="!pending" title=" Reconhecimento de Firma Presencial">
    <v-container> 
      <v-row>
        <div style="width: 600px;margin: 20px 0px 20px 10px;">
        <v-autocomplete
        v-model="pessoa"
        :items="pessoasItems"
        item-title="nome"
        label="Tipo de pessoa"
        bg-color="#F6F6F6"
      >
      </v-autocomplete>
        </div>
        <NuxtLink to="/pessoas">
          <img class="btn-pointer" style="width: 40px; height: 40px;"
            src="../../../assets/visualizar.png"></img>
        </NuxtLink>
      </v-row>
      <div style="width: 600px; margin-top: 10px;">
        <v-autocomplete label="Tabelião/escrivão"></v-autocomplete>
      </div>
      <div style="width: 600px; margin-top: 20px;">
        <v-text-field label="Quantidade"> </v-text-field>
      </div>
      <v-row>
        <img class="btn-pointer" src="../../../assets/sair.png" alt="Sair" />

        <img class="btn-pointer"
          src="../../../assets/salvar.png"></img>
      </v-row>
    </v-container>
  </v-card>
</template>

<script setup>
const config = useRuntimeConfig();
const pessoasLista = `${config.public.managemant}/getAllPessoa`;
const pessoa = ref('')
const {data:pessoasItems,pending} = await useLazyFetch(pessoasLista)
</script>

<style scoped>
    .btn-pointer{
      width: 50px; height: 50px;margin-left: 25px; margin-top: 20px;cursor: pointer;
    }
</style>
