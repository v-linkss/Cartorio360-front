<template>
  <v-card class="mt-10" title="Autenticação">
    <v-container>

      <div style="width: 600px; margin-top: 10px;">
        <v-autocomplete label="Tabelião/escrivão" :items="escreventesItems" item-title="nome"
          item-value="token"></v-autocomplete>
      </div>
      <div style="width: 180px; margin-top: 20px;">
        <v-text-field type="number" label="Quantidade" v-model="quantidade"> </v-text-field>
      </div>
      <v-row>
        <div>
          <NuxtLink to="/OrdensServico/criar-registro">
            <img class="btn-pointer mt-10 mb-5" src="../../../../assets/sair.png" alt="Sair" />
          </NuxtLink>
        </div>

        <img class="btn-pointer mt-10" src="../../../../assets/salvar.png"></img>
      </v-row>
    </v-container>
  </v-card>
</template>

<script setup>
const config = useRuntimeConfig();
const allEscreventes = `${config.public.managemant}/listarEscrevente`;

const cartorio_token = ref(useCookie("user-data").value.cartorio_token).value;

const escreventesItems = ref([])
const quantidade = ref(1)

const { data } = await useFetch(allEscreventes, {
  method: "POST",
  body: { cartorio_token: cartorio_token },
});
escreventesItems.value = data.value[0].func_json_escreventes

</script>

<style scoped>
.btn-pointer {
  width: 50px;
  height: 50px;
  margin-left: 25px;
  margin-top: 20px;
  cursor: pointer;
}
</style>