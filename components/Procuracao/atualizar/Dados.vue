<template>
  <v-container>
    <v-row class="mt-5">
      <v-col cols="3">
        <v-autocomplete
          label="Situação"
          v-model="state.status"
          :items="situacoesItems"
          item-title="descricao"
          item-value="descricao"
          required
        >
        </v-autocomplete>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="5">
        <v-text-field
          label="MNE - Matrícula Notoria Eletrônica"
          v-model="state.mne"
        >
        </v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="2">
        <v-text-field
          v-model="state.dt_abertura"
          type="date"
          label="Data Lavratura"
          readonly
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row class="mb-3">
      <NuxtLink @click="goBack">
        <v-btn size="large" color="red">Voltar</v-btn>
      </NuxtLink>

      <v-btn class="ml-10" @click="onUpdate" size="large" color="green"
        >Salvar</v-btn
      >
    </v-row>
  </v-container>
</template>

<script setup>
const props = defineProps({
  item_dados: {
    type: Array,
    required: true,
  },
  item_situacoes: {
    type: Array,
    required: true,
  },
});

const { $toast } = useNuxtApp();
const config = useRuntimeConfig();
const router = useRouter();
const route = useRoute();
const updateAtoProcuracao = `${config.public.managemant}/updateAtos`;
const situacoesItems = ref(props.item_situacoes);

const state = reactive({
  dt_abertura: props.item_dados[0].dt_abertura || null,
  status: props.item_dados[0].status || null,
  mne: props.item_dados[0].mne || null,
});

async function onUpdate() {
  const { data, error, status } = await useFetch(`${updateAtoProcuracao}/${route.query.id}`, {
    method: "PUT",
    body: {
      status: state.status,
      mne: state.mne,
    },
  });
  if (status.value === "success") {
    $toast.success("Ato Atualizado com sucesso");
  }
}

const goBack = () => {
  const origem = route.query.origem || "criar";
  const id = route.query.id;
  if (origem === "atualizar") {
    router.push(`/os/atualizar/${id}`);
  } else {
    router.push("/os/criar-registro");
  }
};
</script>
