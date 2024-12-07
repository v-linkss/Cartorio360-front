<template>
  <v-dialog persistent v-model="isVisible" max-width="650">
    <v-card >
      <v-container>
        <v-row class="mb-5 mt-1 ml-2">
          <h1>Cancelamento da OS nº</h1>
          <h1 style="color: red; margin-left: 18px">
            {{ props.numero_os }}
          </h1>
        </v-row>
        <v-container>
          <v-card variant="outlined" class="mb-5">
            <v-card-text>
              {{ analiseCancela }}
            </v-card-text>
          </v-card>
          <v-textarea
            label="Motivo"
            v-model="state.motivo"
            required
            :error-messages="v$.motivo.$errors.map((e) => e.$message)"
            @blur="v$.motivo.$touch"
            @input="v$.motivo.$touch"
          ></v-textarea>
        </v-container>
      </v-container>

      <div class="mb-5" style="display: flex; justify-content: flex-start">
        <div class="ml-6">
          <v-btn
            size="large"
            color="red"
            @click="closeModal"
          >Fechar</v-btn>
        </div>
        <div class="ml-6">
          <v-btn
             size="large"
            color="green"
            @click="cancelarOrdemServ"
          >Salvar</v-btn>
        </div>
      </div>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { useVuelidate } from "@vuelidate/core";
import { helpers, required } from "@vuelidate/validators";

const props = defineProps({
  show: Boolean,
  numero_os: Number,
  ordemserv_token: String,
});

const isVisible = ref(props.show);
const config = useRuntimeConfig();
const cartorio_token = ref(useCookie("user-data").value.cartorio_token).value;
const usuario_token = useCookie("auth_token").value;
const analisaCancelamento = `${config.public.auth}/service/gerencia/analisaCancelamento`;
const cancelarOs = `${config.public.auth}service/gerencia/cancelaOs`;

const state = reactive({
  motivo: null,
});

const analiseCancela = ref(null)

const emit = defineEmits(["close"]);

const rules = {
  motivo: {
    required: helpers.withMessage("O campo é obrigatorio", required),
  },
};

const v$ = useVuelidate(rules, state);

watch(
  () => props.show,
  (newVal) => {
    isVisible.value = newVal;
  }
);
const closeModal = () => {
  isVisible.value = false;
  emit("close");
};

const analisaCancelamentoOs = async () => {
  const { data, error } = await fetchWithToken(`${analisaCancelamento}`, {
      method: "POST",
      body: { ordemserv_token:props.ordemserv_token },
    });
    analiseCancela.value = data.value.mensagem
};

analisaCancelamentoOs()

const cancelarOrdemServ = async () => {
  if (await v$.value.$validate()) {
    const { status } = await fetchWithToken(`${cancelarOs}`, {
      method: "POST",
      body: { usuario_token: usuario_token, motivo:state.motivo, ordemserv_token:props.ordemserv_token },
    });
    if(status.value ==='success'){
      window.location.reload()
      closeModal()
    }
  }
};
</script>
