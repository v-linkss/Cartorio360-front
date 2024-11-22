<template>
  <v-container>
    <v-row class="mt-5">
      <v-col cols="3">
        <v-autocomplete
          label="Situação"
          v-model="state.escrevente"
          :items="situacoesItems"
          item-title="descricao"
          item-value="token"
          required
        >
        </v-autocomplete>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="5">
        <v-text-field
          label="MNE - Matrícula Notoria Eletrônica"
          v-model="state.quantidade"
        >
        </v-text-field>
      </v-col>
    </v-row>

    <v-row>
      <NuxtLink @click="goBack">
        <v-btn size="large" color="red">Voltar</v-btn>
      </NuxtLink>

      <v-btn class="ml-10" @click="onSubmit" size="large" color="green"
        >Salvar</v-btn
      >
    </v-row>
  </v-container>
</template>

<script setup>
const props = defineProps({
  ato_token: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(["saved"]);
const router = useRouter();
const route = useRoute();
const config = useRuntimeConfig();
const { $toast } = useNuxtApp();
const allSituacoes = `${config.public.managemant}/listarSituacoes`;
const cartorio_token = ref(useCookie("user-data").value.cartorio_token);
const body = route.query.id
  ? { ato_token: props.ato_token }
  : { cartorio_token: cartorio_token };

const situacoesItems = ref([]);

const state = reactive({
  quantidade: null,
  nome: null,
  documento: null,
});

async function onSubmit() {
  emit("saved");
}

const { data: situacaoData } = await useFetch(allSituacoes, {
  method: "POST",
  body: body,
});
situacoesItems.value = situacaoData.value;

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
