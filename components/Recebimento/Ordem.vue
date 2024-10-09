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
              v-model="state.token"
              :items="formaItens"
              item-title="descricao"
              item-value="token"
              required
              :error-messages="v$.escrevente.$errors.map((e) => e.$message)"
              @blur="v$.escrevente.$touch"
              @input="handleFormaSelect($event.target.textContent)"
            ></v-autocomplete>
            <v-text-field 
              label="Valor"
              v-model="state.valor"
            > </v-text-field>
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
  ordemserv_token: String
  
});

const isVisible = ref(props.show);
const config = useRuntimeConfig();
const cartorio_token = useCookie("user-data").value.cartorio_token;
const getSelos = `${config.public.managemant}/listarSelos`;
const reimprimeSelos = `${config.public.managemant}/reimprimirSelo`;
const allEscreventes = `${config.public.managemant}/listarEscrevente`;
const formaItens = ref([]);

const selosItems = ref([]);
const recebimentos = ref([]);
const selectedSelos = ref([]);

const state = reactive({
        descricao: null,
        token: null,
        valor:null
});
const emit = defineEmits(["close"]);

const rules = {
  escrevente: {
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

const listarFormasReceb = `${config.public.managemant}/listarFormasReceb`;
const routereceberOs = `${config.public.managemant}/receberOs`;
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

// Função para enviar os dados para a API
const receberOs = async () => {


    try {
      const usuario_token = useCookie("auth_token").value;


    const body = {
      ordemserv_token: props.ordemserv_token,  
      usuario_token: usuario_token,    
      recebimentos: recebimentos.value,
    };
    console.log(body)
    const { data: forma ,error } = await useFetch(routereceberOs,      {
        method: "POST",
        body: JSON.stringify(body),  // Convertendo o objeto para JSON string

      });
      window.console.log("Resposta da API:", toRaw(forma.value));
  } catch (error) {
    console.error("Erro ao realizar a requisição:", error);
  }


};

// Carregar formas de recebimento ao montar o componente
const loadEscreventes = async () => {


  try {
    const cartorio_token = ref(useCookie("user-data").value.cartorio_token) || null;
    const body = {
      cartorio_token: cartorio_token.value
    }

    const { data: forma ,error } = await useFetch(listarFormasReceb,      {
        method: "POST",
        body: JSON.stringify(body),  // Convertendo o objeto para JSON string

      });
      formaItens.value = toRaw(forma.value); // Assign the array to formaItens.value
      window.console.log("Resposta da API:", toRaw(forma.value));
  } catch (error) {
    console.error("Erro ao realizar a requisição:", error);
  }
}
const addNewRow = () => {
  console.log("descrição", state.descricao)
  selosItems.value.push({
    forma: state.descricao,
    valor: state.valor,
  });
  recebimentos.value.push({
    forma_receb_token: state.token,
    valor: state.valor,
  });
  state.token = null;
  state.valor = null;
  state.descricao = null;

};

const handleFormaSelect = (descricao) => {
  console.log("##########################\n",descricao)
  state.descricao = descricao;
};
loadEscreventes()
;</script>
