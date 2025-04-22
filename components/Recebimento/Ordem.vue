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
            <div style="display: flex; justify-content: flex-end">
              <img
                v-if="item.btn_cancelar === true"
                src="../../assets/mudarStatus.png"
                style="width: 30px; height: 30px; cursor: pointer"
                @click="removeFormValueFromTable(item)"
                alt="Mudar Status"
              />

              <img
                v-if="item.btn_cancelar === false"
                src="../../assets/excluido.png"
                style="width: 30px; height: 30px; cursor: not-allowed"
                alt="Remover"
              />
            </div>
          </template>
        </v-data-table>
      </v-container>

      <div style="display: flex; justify-content: flex-start">
        <v-btn class="ml-8" size="large" @click="closeModal" color="red"
          >Voltar</v-btn
        >
        <v-btn
          size="large"
          class="ml-6 mb-6"
          color="green"
          @click="
            props.ordem.valor > 0
              ? receberOsParcial()
              : realizarRecebimentoCompleto()
          "
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

const emit = defineEmits(["close", "refresh-value"]);

const { $toast } = useNuxtApp();
const isVisible = ref(props.show);
const isMoreOrLess = ref(false);
const config = useRuntimeConfig();
const listarFormasReceb = `${config.public.managemant}/listarFormasReceb`;
const listarRecebimentos = `${config.public.managemant}/listar_recebimentos_os`;
const routereceberOs = `${config.public.managemant}/receberOs`;
const atualizarStatusCaixa = `${config.public.managemant}/caixasLanctos`;
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
  { title: "Forma", value: "descricao" },
  { title: "Valor", value: "valor" },
  { value: "actions" },
];

const faltaReceberValorDeOrdem = ref(0);

const calcularFaltaReceber = () => {
  faltaReceberValorDeOrdem.value = formatNumber(
    props.ordem.valor - props.ordem.valor_pago
  );
};

watch(
  () => props.show,
  async (newVal) => {
    isVisible.value = newVal;
    const { data } = await useFetch(listarRecebimentos, {
      method: "POST",
      body: { os_token: props.ordem.token },
    });
    const responseData = Array.isArray(data.value) ? data.value : [];
    if (responseData) {
      selosItems.value = responseData.map(
        ({ forma_recebimento, ...valores }) => ({
          descricao: forma_recebimento,
          ...valores,
        })
      );
    }
    if (newVal) calcularFaltaReceber();
  }
);

const closeModal = () => {
  isVisible.value = false;
  Object.assign(state, { forma: null, descricao: null, valor: "" });
  recebimentos.value = [];
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
      caixa_token: props.ordem.caixa_token ? props.ordem.caixa_token : null,
    };
    const { data } = await useFetch(routereceberOs, {
      method: "POST",
      body: body,
    });

    if (data.value[0].status === "OK") {
      $toast.success(`${data.value[0].status}: Valores Recebidos com Sucesso!`);
      selosItems.value = [];
      emit("refresh-value");
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
  selosItems.value.push({
    forma: state.forma,
    descricao: selectedForma.descricao,
    valor,
    btn_cancelar: true,
  });
  recebimentos.value.push({ forma_receb_token: state.forma, valor });

  props.ordem.valor_pago = formatNumber(props.ordem.valor_pago + valor);
  props.ordem.valor = formatNumber(props.ordem.valor - valor);
  faltaReceberValorDeOrdem.value = formatNumber(
    faltaReceberValorDeOrdem.value - valor
  );

  Object.assign(state, { forma: null, valor: "0.00" });
  formatDecimal();
};

const removeFormValueFromTable = async (itemRemove) => {
  const index = selosItems.value.indexOf(itemRemove);
  if (itemRemove.id && itemRemove.id !== null) {
    itemRemove.btn_cancelar = !itemRemove.btn_cancelar;
    const { status } = await useFetch(
      `${atualizarStatusCaixa}/${itemRemove.id}`,
      {
        method: "PUT",
        body: { excluido: true },
      }
    );
    if (status.value === "success") {
      $toast.success("Item marcado para remoção.");
    } else {
      $toast.error("Erro ao marcar o item para remoção.");
    }
  } else {
    selosItems.value.splice(index, 1);
    recebimentos.value.splice(index, 1);
    const valor = parseCurrency(itemRemove.valor);

    props.ordem.valor_pago = formatNumber(props.ordem.valor_pago - valor);
    faltaReceberValorDeOrdem.value = formatNumber(
      faltaReceberValorDeOrdem.value + valor
    );
  }
  formatDecimal();
};

const parseCurrency = (value) => Number(value.toString().replace(/,/g, ""));

loadEscreventes();
</script>
