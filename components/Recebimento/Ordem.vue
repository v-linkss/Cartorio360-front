<template>
  <v-dialog persistent v-model="isVisible" max-width="650">
    <v-card>
      <v-container>
        <v-row class="mb-5 mt-1 ml-2">
          <h1>Ordem de Serviço nº</h1>
          <h1 style="color: red; margin-left: 18px">
            {{ props.ordem.numero }}
          </h1>
        </v-row>
        <v-container>
          <v-row>
            <v-text-field
              class="mr-5"
              label="Recebido"
              v-model="props.ordem.valor_pago"
              disabled
              @input="formatDecimal"
            >
            </v-text-field>

            <v-text-field
              label="Falta Receber"
              v-model="props.ordem.valor"
              disabled
              @input="formatDecimal"
            >
            </v-text-field>
          </v-row>
          <v-row>
            <v-autocomplete
              class="mb-5 mr-5"
              label="Forma"
              v-model="state.forma"
              :items="formaItens"
              item-title="descricao"
              item-value="token"
            ></v-autocomplete>
            <v-text-field
              label="Valor"
              v-model="state.valor"
              required
              @input="formatDecimal"
            >
            </v-text-field>
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
          <template v-slot:item.actions="{ item }">
            <div
              style="display: flex; justify-content: flex-end"
              @click="removeFormValueFromTable(item)"
              title="Remover"
            >
              <img
                style="width: 30px; height: 30px; cursor: pointer"
                src="../../assets/trash.png"
                alt="Remover"
              />
            </div>
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
        <div class="ml-12 mb-5">
          <img
            src="../../assets/salvar.png"
            style="cursor: pointer"
            @click="receberOs"
          />
        </div>
      </div>
    </v-card>
    <ModalRecebimentoCond
      v-model="isMoreOrLess"
      :faltaReceber="faltaReceber"
      @close="isMoreOrLess = false"
    />
  </v-dialog>
</template>

<script setup>
const props = defineProps({
  show: Boolean,
  ordem: {
    type: Object,
    required: true,
  },
});
const { $toast } = useNuxtApp();
const isVisible = ref(props.show);
const isMoreOrLess = ref(false);
const config = useRuntimeConfig();
const listarFormasReceb = `${config.public.managemant}/listarFormasReceb`;
const routereceberOs = `${config.public.managemant}/receberOs`;
const usuario_token = useCookie("auth_token").value;
const formaItens = ref([]);
const faltaReceber = ref(null);

const selosItems = ref([]);
const recebimentos = ref([]);

const state = reactive({
  descricao: null,
  forma: null,
  valor: 0.0,
});
const emit = defineEmits(["close"]);

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
    if (props.ordem.valor > 0) {
      faltaReceber.value = props.ordem.valor;
      isMoreOrLess.value = true;
    }
    const body = {
      ordemserv_token: props.ordem.token,
      usuario_token: usuario_token,
      recebimentos: [recebimentos.value],
    };
    if (props.ordem.valor === 0) {
      const { data, error } = await useFetch(routereceberOs, {
        method: "POST",
        body: JSON.stringify(body),
      });
      if (data.value[0].status === "OK") {
        $toast.success("Valores Recebidos com Sucesso!");
        closeModal()
      }
    }
  } catch (error) {
    console.error("Erro ao realizar a requisição:", error);
  }
};

const formatDecimal = () => {
  props.ordem.valor = parseFloat(props.ordem.valor).toFixed(2);
  props.ordem.valor_pago = parseFloat(props.ordem.valor_pago).toFixed(2);
  if (state.valor) {
    state.valor = parseFloat(state.valor).toFixed(2);
  }
};

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

const addNewRow = async () => {
  const selectedForma = formaItens.value.find(
    (forma) => forma.token === state.forma
  );

  if (!selectedForma) {
    $toast.error("Por favor, selecione uma forma.");
    return;
  }

  if (props.ordem.valor <= 0) {
    $toast.error(
      "O valor recebido não deve ultrapassar o valor total da ordem."
    );
    return;
  }
  selosItems.value.push({
    forma: state.forma,
    descricao: selectedForma.descricao,
    valor: state.valor,
  });
  recebimentos.value.push({
    forma_receb_token: state.forma,
    valor: state.valor,
  });
  props.ordem.valor_pago =
    parseFloat(props.ordem.valor_pago) + parseFloat(state.valor);
  props.ordem.valor = parseFloat(props.ordem.valor) - parseFloat(state.valor);

  state.forma = null;
  state.valor = "0.00";
};

const removeFormValueFromTable = (itemRemove) => {
  const index = selosItems.value.indexOf(itemRemove);

  if (index !== -1) {
    selosItems.value.splice(index, 1);
    recebimentos.value.splice(index, 1);

    props.ordem.valor_pago =
      parseFloat(props.ordem.valor_pago) - parseFloat(itemRemove.valor);
    props.ordem.valor =
      parseFloat(props.ordem.valor) + parseFloat(itemRemove.valor);
  }
};

loadEscreventes();
</script>
