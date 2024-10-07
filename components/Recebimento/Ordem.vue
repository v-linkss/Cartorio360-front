<template>
  <v-dialog persistent v-model="isVisible" max-width="650">
    <v-card>
      <v-container>
        <v-row class="mb-5 mt-1 ml-2">
          <h1>Ordem de Serviço nº</h1>
          <h1 style="color: red; margin-left: 18px">
            {{ props.numero_os }}
          </h1>
        </v-row>
        <v-container>
          <v-row>
            <v-text-field class="mr-5" label="Recebido"> </v-text-field>

            <v-text-field label="Falta Receber"> </v-text-field>
          </v-row>
          <v-row>
            <v-autocomplete
              class="mb-5 mr-5"
              label="Forma"
              v-model="state.escrevente"
              :items="escreventesItems"
              item-title="nome"
              item-value="token"
              required
              :error-messages="v$.escrevente.$errors.map((e) => e.$message)"
              @blur="v$.escrevente.$touch"
              @input="v$.escrevente.$touch"
            ></v-autocomplete>
            <v-text-field label="Valor"> </v-text-field>
            <div>
              <img
                src="../../assets/novo.png"
                class="ml-5"
                style="cursor: pointer; height: 40px; width: 40px"
                @click="reimprimeSelosAtos"
              />
            </div>
          </v-row>
        </v-container>
        <hr class="mb-5" />
        <v-data-table :headers="headers" :items="selosItems" item-value="token">
        </v-data-table>
      </v-container>

      <div style="display: flex; justify-content: flex-start">
        <div class="ml-10">
          <img
            src="../../assets/sair.png"
            style="cursor: pointer"
            @click="closeModal"
          />
        </div>
        <div class="ml-12">
          <img
            src="../../assets/salvar.png"
            style="cursor: pointer"
            @click="reimprimeSelosAtos"
          />
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
});

const isVisible = ref(props.show);
const config = useRuntimeConfig();
const cartorio_token = ref(useCookie("user-data").value.cartorio_token).value;
const getSelos = `${config.public.managemant}/listarSelos`;
const reimprimeSelos = `${config.public.managemant}/reimprimirSelo`;
const allEscreventes = `${config.public.managemant}/listarEscrevente`;

const selosItems = ref([]);
const selectedSelos = ref([]);

const state = reactive({
  escrevente: null,
});

const emit = defineEmits(["close"]);

const rules = {
  escrevente: {
    required: helpers.withMessage("O campo é obrigatorio", required),
  },
};

const v$ = useVuelidate(rules, state);

const headers = [
  { title: "Forma", value: "numero" },
  { title: "Valor", value: "referencia" },
  {
    value: "actions",
  },
];

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

const escreventesItems = ref([]);
</script>
