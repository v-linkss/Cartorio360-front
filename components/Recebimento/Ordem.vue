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
            <v-text-field class="mr-5" label="Recebido"  v-model="props.ordem.valor_pago" disabled> </v-text-field>

            <v-text-field label="Falta Receber"  v-model="props.ordem.valor" disabled> </v-text-field>
          </v-row>
          <v-row>
            <v-autocomplete
              class="mb-5 mr-5"
              label="Forma"
              v-model="state.forma"
              :items="formaItens"
              item-title="descricao"
              item-value="token"
              required
              :error-messages="v$.forma.$errors.map((e) => e.$message)"
              @blur="v$.forma.$touch"
            ></v-autocomplete>
            <v-text-field label="Valor" v-model="state.valor" type="number"> </v-text-field>
            <div>
              <img
                src="../../assets/novo.png"
                class="ml-5"
                style="cursor: pointer; height: 40px; width: 40px"
                @click="addNewRow"
              />
            </div>
          </v-row>
        </v-container>
        <hr class="mb-5" />
        <v-data-table :headers="headers" :items="selosItems" item-value="token">
          <template v-slot:item.forma="{ item }">
            {{ item.descricao }}
          </template>
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
            @click="receberOs"
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
  ordemserv_token: String,
  ordem: {
    type: Object,
    required: true,
  },
});

const isVisible = ref(props.show);
const config = useRuntimeConfig();
const listarFormasReceb = `${config.public.managemant}/listarFormasReceb`;
const routereceberOs = `${config.public.managemant}/receberOs`;
const formaItens = ref([]);

const selosItems = ref([]);
const recebimentos = ref([]);

const state = reactive({
  descricao: null,
  forma: null,
  valor: 0.00,
});
const emit = defineEmits(["close"]);

const rules = {
  forma: {
    required: helpers.withMessage("O campo é obrigatorio", required),
  },
};

const v$ = useVuelidate(rules, state);

const headers = [
  { title: "Forma", value: "forma" },

  { title: "Valor", value: "valor" },

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

const receberOs = async () => {
  try {
    const usuario_token = useCookie("auth_token").value;

    const body = {
      ordemserv_token: props.ordemserv_token,
      usuario_token: usuario_token,
      recebimentos: recebimentos.value,
    };
    const { data: forma, error } = await useFetch(routereceberOs, {
      method: "POST",
      body: JSON.stringify(body),
    });
  } catch (error) {
    console.error("Erro ao realizar a requisição:", error);
  }
};

// Carregar formas de recebimento ao montar o componente
const loadEscreventes = async () => {
  try {
    const cartorio_token = ref(useCookie("user-data").value.cartorio_token);
    const body = {
      cartorio_token: cartorio_token.value,
    };
    const { data: forma, error } = await useFetch(listarFormasReceb, {
      method: "POST",
      body: JSON.stringify(body),
    });
    formaItens.value = toRaw(forma.value);
  } catch (error) {
    console.error("Erro ao realizar a requisição:", error);
  }
};
const addNewRow = () => {
  const selectedForma = formaItens.value.find(
    (forma) => forma.token === state.forma
  );
  if (selectedForma) {
    selosItems.value.push({
      forma: state.forma, 
      descricao: selectedForma.descricao, 
      valor: state.valor,
    });
  }
  // recebimentos.value.push({
  //   forma_receb_token: state.token,
  //   valor: state.valor,
  // });
  // state.token = null;
  // state.valor = null;
  // state.descricao = null;
};

loadEscreventes();
</script>
