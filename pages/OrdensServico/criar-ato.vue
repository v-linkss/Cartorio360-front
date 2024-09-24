<template>
  <v-container>
    <v-row>
      <v-col md="6">
        <v-autocomplete
          class="mr-5"
          label="Selecione o Servico"
          :items="servicos"
          item-title="descricao"
          item-value="atos"
          v-model="selectedServico"
        ></v-autocomplete>
      </v-col>
      <v-col md="6">
        <v-autocomplete
          label="Selecione o tipo de ato"
          v-model="selectedAto"
          item-title="descricao"
          item-value="rota"
          :items="atos"
        ></v-autocomplete>
      </v-col>
    </v-row>
  </v-container>
  <v-container>
    <component :is="selectedComponent" />
  </v-container>
</template>

<script setup>
import semelhanca from "../fontes/atos/semelhanca.vue";
import autencidade from "../fontes/atos/autencidade.vue";
import autenticacao from "../fontes/atos/autenticacao/autenticacao.vue";

const config = useRuntimeConfig();
const getTiposAtos = `${config.public.managemant}/tipoAtos`;

const usuario_token = useCookie("auth_token").value;
const cartorio_token = ref(useCookie("user-data").value.cartorio_token).value;

const components = {
  "/fontes/atos/semelhanca": semelhanca,
  "/fontes/atos/autenticidade": autencidade,
  "/fontes/atos/autenticacao/autenticacao": autenticacao,
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

servicos.value = data.value.map((servico) => ({
  descricao: servico.descricao,
  atos: JSON.stringify(servico.atos),
}));

if (servicos.value.length > 0) {
  selectedServico.value = servicos.value[0].atos;
  atos.value = JSON.parse(servicos.value[0].atos);

  if (atos.value.length > 0) {
    selectedAto.value = atos.value[0].rota;
  }
}

watch(selectedServico, (newValue) => {
  if (newValue) {
    atos.value = JSON.parse(newValue);
    selectedAto.value = atos.value.length > 0 ? atos.value[0].rota : "";
  }
});
</script>

<style scoped>
.menu-texts .v-btn {
  color: #429946;
}
</style>
