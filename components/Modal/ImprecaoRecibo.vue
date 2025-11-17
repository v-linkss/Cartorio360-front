<template>
  <v-dialog persistent v-model="isVisible" max-width="600">
    <v-card>
      <v-container>

        <v-row class="mt-1 mb-3" style="justify-content: space-between">
          <h1 class="ml-4">
            Emitir Recibo
          </h1>
        </v-row>
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field label="Destinatário" v-model="state.apresentante_nome" :readonly="visualizar" />
          </v-col>

          <v-col cols="12" md="6">
            <v-text-field label="Documento" v-model="state.apresentante_cpf" :readonly="visualizar" />
          </v-col>
        </v-row>
      </v-container>

      <v-card-actions>
        <v-btn style="background-color: red; color: white" @click="closeModal">
          Voltar
        </v-btn>

        <v-btn v-if="!visualizar" style="background-color: green; color: white" @click="onSubmit">
          Imprimir
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>

const props = defineProps({
  show: Boolean,
  apresentante_nome: String,
  apresentante_cpf: String,
  visualizar: Boolean,
  token: String,
});
const state = reactive({
  apresentante_nome: props.apresentante_nome,
  apresentante_cpf: props.apresentante_cpf,
  token: props.token,
  usuario_token: useCookie("auth_token").value
});
const emit = defineEmits(["close"]);

const isVisible = ref(props.show);
const { $toast } = useNuxtApp();
const config = useRuntimeConfig();

const imprimirRecibo = `${config.public.auth}/service/gerencia/emitir_recibo`;

watch(
  () => props.show,
  (val) => {
    isVisible.value = val
  },
  { immediate: true }
)
watch(
  () => props,
  (val) => {
    state.apresentante_nome = val.apresentante_nome
    state.apresentante_cpf = val.apresentante_cpf
    state.token = val.token

  },
  { deep: true, immediate: true }
)

const closeModal = () => {
  isVisible.value = false;
  emit("close");
};

async function onSubmit() {
  try {
    const { data, error } = await useFetch(
      imprimirRecibo,
      {
        method: "POST",
        body: {
          nome_recibo: state.apresentante_nome,
          doc_recibo: state.apresentante_cpf,
          usuario_token: state.usuario_token,
          os_token: state.token,

        },
        headers: {
          Authorization: `Bearer ${state.usuario_token}`,
        },
      }
    );
    console.log(data)

    if (data.value) {
      const blob = new Blob([data.value], { type: "text/html" });
      const url = URL.createObjectURL(blob);
      window.open(url, "_blank");
    } else {
      $toast.error(error?.value?.data?.details || "Erro ao emitir recibo");
    }
    closeModal();
  } catch (e) {
    $toast.error("Erro inesperado");
  }
}
</script>
