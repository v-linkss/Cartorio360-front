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
  <component :is="selectedComponent" />
</template>

<script setup>
import semelhanca from "../fontes/atos/reconhecimento/semelhanca.vue";
import autencidade from "../fontes/atos/reconhecimento/autencidade.vue";
import autenticacao from "../fontes/atos/autenticacao/autenticacao.vue";

const config = useRuntimeConfig();
const getTiposAtos = `${config.public.managemant}/tipoAtos`;

const usuario_token = useCookie("auth_token").value;
const cartorio_token = ref(useCookie("user-data").value.cartorio_token).value;

const components = {
  "/fontes/atos/reconhecimento/semelhanca": semelhanca,
  "/fontes/atos/reconhecimento/autenticidade": autencidade,
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
