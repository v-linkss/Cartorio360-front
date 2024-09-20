<template>
  <v-container>
    <v-row>
      <v-autocomplete
        class="mr-5"
        label="Selecione o Servico"
        :items="servicos"
        item-title="descricao"
        v-model="selectedServico"
      ></v-autocomplete>
      <v-autocomplete
        label="Selecione o tipo de ato"
        v-model="selectedAto"
        item-title="descricao"
        item-value="rota"
        :items="atos"
      ></v-autocomplete>
    </v-row>
  </v-container>
  <v-container>
    <component :is="selectedComponent" />
  </v-container>
  <NuxtLink to="/OrdensServico/criar-registro">
    <img class="btn-pointer mt-10" src="../../assets/sair.png" alt="Sair" />
  </NuxtLink>
</template>

<script setup>
import semelhanca from "../fontes/atos/semelhanca.vue";
import autencidade from "../fontes/atos/autencidade.vue";

const config = useRuntimeConfig();
const getTiposAtos = `${config.public.managemant}/tipoAtos`;

const usuario_token = useCookie("auth_token").value;
const cartorio_token = ref(useCookie("user-data").value.cartorio_token).value;

const components = {
  "/fontes/atos/semelhanca": semelhanca,
  "/fontes/atos/autenticidade": autencidade,
};


const servicos = ref([]);
const atos = ref([]);
const selectedServico = ref("");
const selectedAto = ref("");
const selectedComponent = computed(() => {
  return components[selectedAto.value];
});

const { data } = await useFetch(getTiposAtos, {
  method: "POST",
  body: { usuario_token: usuario_token, cartorio_token: cartorio_token },
});
servicos.value = data.value;
atos.value = servicos.value[0].atos;

</script>

<style scoped>
.menu-texts .v-btn {
  color: #429946;
}
</style>
