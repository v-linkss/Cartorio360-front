<template>
  <v-dialog persistent v-model="isVisible" max-width="800">
    <v-card>
      <v-container>
        <v-row class="mt-1 mb-3" style="justify-content: space-between">
          <v-col>
            <h1 class="ml-4">
              Importar selos do lote
            </h1>
            <p class="ml-4 mt-3">
              Informe o codigo do lote para realizar a importação
            </p>
          </v-col>
        </v-row>
        <hr class="mb-5" />
        <v-text-field label="Lote" v-model.number="state.nuLote"/>
      </v-container>
      <v-card-actions>
        <v-btn style="background-color: red; color: white" @click="closeModal">Voltar</v-btn>
        <v-btn style="background-color: green; color: white" @click="updateAtoPessoa">Importar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
const props = defineProps({
  show: Boolean,
  ato_token: String,
  ato_id: Number,
  representante_nome: String,
});
const isVisible = ref(props.show);
const route = useRoute()
const config = useRuntimeConfig();
const { $toast } = useNuxtApp();
const forneceSeloPorLote = `${config.public.ws}/fornecer_selos_por_lote`;
const forneceSelo = `${config.public.managemant}/fornecer_selos`;
const papeisItems = ref([]);

const state = reactive({
  nuLote: null,
});

const emit = defineEmits(["close", "update-papel"]);

watch(
  () => props.show,
  async (newVal) => {
    isVisible.value = newVal;
    if (newVal) {
      await getPapeis();
    }
  }
);
const closeModal = () => {
  isVisible.value = false;
  emit("close");
};

const updateAtoPessoa = async () => {
  const { data, error, status } = await useFetch(forneceSeloPorLote, {
    method: "POST",
    body: {
      user: "41140940406",
      pass: "RP6DEN",
      statusSelo:"D",
      nuLote:state.nuLote
    },
  });
  if (status.value === "success") {
    const selos = data.value.selos
    const { data:seloData,error, status:sucessoSelo } = await useFetch(forneceSelo, {
    method: "POST",
    body: {
      tipo_id:1,
      cartorio_id: useCookie("user-data").value.cartorio_id,
      selos,
      user_id: useCookie("user-data").value.usuario_id
    },
  });
  if(sucessoSelo.value === 'success'){
    $toast.success("Selos importados com sucesso")
    closeModal()
  }
  }
};
</script>