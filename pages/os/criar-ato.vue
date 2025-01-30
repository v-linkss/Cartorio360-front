<template>
  <v-container>
    <v-row class="mb-5">
      <h1>Ordem de Serviço nº</h1>
      <h1 style="color: red; margin-left: 30px">
        {{ numeroOs || useCookie("user-service").value?.numero || null }}
      </h1>
    </v-row>
    <v-row>
      <v-col md="6">
        <v-autocomplete
          class="mr-5"
          label="Selecione o Servico"
          :items="servicos"
          item-title="descricao"
          item-value="token"
          v-model="selectedServico"
        ></v-autocomplete>
      </v-col>
      <v-col md="6">
        <v-autocomplete
          label="Selecione o tipo de ato"
          v-model="selectedAto"
          item-title="descricao"
          item-value="token"
          :items="atos"
          return-object
        ></v-autocomplete>
      </v-col>
    </v-row>
  </v-container>
  <component :is="selectedComponent" :ato_token="selectedAto.token" />
</template>

<script setup>
import semelhanca from "../fontes/atos/reconhecimento/semelhanca.vue";
import autencidade from "../fontes/atos/reconhecimento/autencidade.vue";
import autenticacao from "../fontes/atos/autenticacao/autenticacao.vue";
import procuracao from "../fontes/atos/atos-sem-bem/geral.vue";
import procuracaoComBens from "../fontes/atos/atos-com-bem/geral.vue";

const route = useRoute();
const numeroOs = route.query.numeroOs;

const components = {
 "/fontes/atos/reconhecimento/semelhanca": semelhanca,
 "/fontes/atos/reconhecimento/autenticidade": autencidade,
 "/fontes/atos/autenticacao/autenticacao": autenticacao,
 "/fontes/atos/ato-sem-bem/geral": procuracao,
 "/fontes/atos/ato-com-bem/geral": procuracaoComBens
};

const servicos = ref([]);
const atos = ref([]);
const selectedServico = ref("");
const selectedAto = ref(" ");
const selectedComponent = computed(() => components[selectedAto.value.rota]);

const config = useRuntimeConfig();
const getTiposAtos = `${config.public.managemant}/tipoAtos`;

const usuario_token = useCookie("auth_token").value;
const cartorio_token = ref(useCookie("user-data").value.cartorio_token).value;

const loadServicos = async () => {
  const { data } = await useFetch(getTiposAtos, {
    method: "POST",
    body: { usuario_token: usuario_token, cartorio_token: cartorio_token },
  });
  servicos.value = data.value;
  if (servicos.value.length > 0) {
    selectedServico.value = servicos.value[0].token;
  }
};

const onServicoChange = async (token) => {
  const { data } = await useFetch(getTiposAtos, {
    method: "POST",
    body: {
      usuario_token: usuario_token,
      cartorio_token: cartorio_token,
      servico_token: token,
    },
  });
  atos.value = data.value;
};

loadServicos();

watch(selectedServico, async (newValue) => {
  if (newValue) {
    await onServicoChange(newValue);
    selectedAto.value = atos.value.length > 0 ? atos.value[0] : null;
  }
});
</script>

<style scoped>
.menu-texts .v-btn {
  color: #429946;
}
</style>
