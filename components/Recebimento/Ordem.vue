<template>
  <v-dialog persistent v-model="isVisible" max-width="650">
    <v-card>
      <v-container>
        <v-row class="mb-5 mt-1 ml-2">
          <h1>Ordem de Serviço nº</h1>
          <h1 style="color: red; margin-left: 18px">{{ props.ordem.numero }}</h1>
        </v-row>
        <v-container>
          <v-row>
            <v-text-field
              class="mr-5"
              label="Recebido"
              v-model="props.ordem.valor_pago"
              readonly
              style="font-weight: bold; cursor: default; pointer-events: none"
            />
            <v-text-field
              label="Falta Receber"
              v-model="faltaReceberValorDeOrdem"
              readonly
              style="font-weight: bold; cursor: default; pointer-events: none"
            />
          </v-row>
          <v-row>
            <v-autocomplete
              class="mb-5 mr-5"
              label="Forma"
              v-model="state.forma"
              :items="formaItens"
              item-title="descricao"
              item-value="token"
            />
            <div style="max-width: 180px">
              <MoneyInput v-model="state.valor" />
            </div>
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
                src="../../assets/trash.png"
                style="width: 30px; height: 30px; cursor: pointer"
                alt="Remover"
              />
            </div>
          </template>
        </v-data-table>
      </v-container>

      <div style="display: flex; justify-content: flex-start">
        <v-btn class="ml-8" size="large" @click="closeModal" color="red">Voltar</v-btn>
        <v-btn
          size="large"
          class="ml-6 mb-6"
          color="green"
          @click="props.ordem.valor > 0 ? receberOsParcial() : realizarRecebimentoCompleto()"
        >
          Salvar
        </v-btn>
      </div>
    </v-card>
    <ModalRecebimentoCond
      v-model="isMoreOrLess"
      :faltaReceber="faltaReceber"
      @close="isMoreOrLess = false"
      @confirmar="realizarRecebimentoCompleto"
    />
  </v-dialog>
</template>

<script setup>
const props = defineProps({
  show: Boolean,
  ordem: { type: Object, required: true },
});

const emit = defineEmits(["close"]);

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
  valor: "",
});

const headers = [
  { title: "Forma", value: "forma" },
  { title: "Valor", value: "valor" },
  { value: "actions" },
];

const faltaReceberValorDeOrdem = ref(0);

const calcularFaltaReceber = () => {
  faltaReceberValorDeOrdem.value = formatNumber(props.ordem.valor - props.ordem.valor_pago);
};

watch(() => props.show, (newVal) => {
  isVisible.value = newVal;
  if (newVal) calcularFaltaReceber();
});

const closeModal = () => {
  isVisible.value = false;
  Object.assign(state, { forma: null, descricao: null, valor: "" });
  selosItems.value = [];
  emit("close");
};

const receberOsParcial = () => {
  faltaReceber.value = Number(props.ordem.valor);
  isMoreOrLess.value = true;
};

const realizarRecebimentoCompleto = async () => {
  try {
    const body = {
      ordemserv_token: props.ordem.token,
      usuario_token,
      recebimentos: [recebimentos.value],
    };
    console.log(body);

    const { data } = await useFetch(routereceberOs, {
      method: "POST",
      body: JSON.stringify(body),
    });

    if (data.value[0].status === "OK") {
      $toast.success(`${data.value[0].status}: Valores Recebidos com Sucesso!`);
      selosItems.value = [];
      closeModal();
    } else {
      $toast.error(data.value[0].status_mensagem);
    }
  } catch (error) {
    $toast.error(error);
  }
};

const formatDecimal = () => {
  props.ordem.valor = formatNumber(props.ordem.valor);
  props.ordem.valor_pago = formatNumber(props.ordem.valor_pago);
  faltaReceberValorDeOrdem.value = formatNumber(faltaReceberValorDeOrdem.value);
};

const formatNumber = (value) => Number(parseFloat(value).toFixed(2));

const loadEscreventes = async () => {
  try {
    const cartorio_token = useCookie("user-data").value.cartorio_token;
    const body = { cartorio_token };
    const { data: forma } = await useFetch(listarFormasReceb, {
      method: "POST",
      body: JSON.stringify(body),
    });
    formaItens.value = toRaw(forma.value);
  } catch (error) {
    console.error("Erro ao carregar formas de pagamento:", error);
  }
};

const addNewRow = () => {
  const selectedForma = formaItens.value.find((f) => f.token === state.forma);
  if (!selectedForma) return $toast.error("Por favor, selecione uma forma.");

  const valor = parseCurrency(state.valor);
  selosItems.value.push({ forma: state.forma, descricao: selectedForma.descricao, valor });
  recebimentos.value.push({ forma_receb_token: state.forma, valor });

  props.ordem.valor_pago = formatNumber(props.ordem.valor_pago + valor);
  props.ordem.valor = formatNumber(props.ordem.valor - valor);
  faltaReceberValorDeOrdem.value = formatNumber(faltaReceberValorDeOrdem.value - valor);

  Object.assign(state, { forma: null, valor: "0.00" });
  formatDecimal();
};

const removeFormValueFromTable = (itemRemove) => {
  const index = selosItems.value.indexOf(itemRemove);
  if (index !== -1) {
    selosItems.value.splice(index, 1);
    recebimentos.value.splice(index, 1);
    const valor = parseCurrency(itemRemove.valor);

    props.ordem.valor_pago = formatNumber(props.ordem.valor_pago - valor);
    faltaReceberValorDeOrdem.value = formatNumber(faltaReceberValorDeOrdem.value + valor);
  }
  formatDecimal();
};

const parseCurrency = (value) => Number(value.toString().replace(/,/g, ""));

loadEscreventes();
</script>
