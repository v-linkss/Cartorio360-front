<template>
  <v-container>
    <v-row class="mb-5">
      <h1>Cancelamento de Lavratura</h1>
    </v-row>

    <v-row>
      <v-col cols="2">
        <v-text-field v-model="state.id" label="ID do ato"></v-text-field>
      </v-col>
      <v-col cols="2">
        <v-text-field
          v-model="state.selo_numero"
          label="Numero do selo"
        ></v-text-field>
      </v-col>
      <v-col>
        <div>
          <img
            @click="searchAtos"
            style="width: 40px; height: 40px; cursor: pointer"
            src="../../assets/visualizar.png"
            alt="Pesquisar"
          />
        </div>
      </v-col>
    </v-row>

    <div>
      <hr class="mt-5 mb-5" />

      <v-data-table
        :headers="headers"
        :items="atos"
        style="font-size: 12px"
        item-key="id"
      >
        <template v-slot:item.actions="{ item }">
          <div style="display: flex; gap: 4px; justify-content: center">
            <div
              @click="abrirModalCancelamento(item.token, item.selo_numero)"
              title="Excluir"
            >
              <img
                style="width: 30px; height: 30px; cursor: pointer"
                src="../../assets/btn_cancela_lavratura.png"
                alt="Cancelar"
                title="Cancelar"
              />
            </div>
          </div>
        </template>
      </v-data-table>
    </div>
  </v-container>

  <ModalConfirmacao
    :show="isModalCancelamentoOpen"
    :condMessage="condMessage"
    @close="isModalCancelamentoOpen = false"
    @confirm="cancelaAto"
  />
</template>

<script setup>
const config = useRuntimeConfig();
const { $toast } = useNuxtApp();
const cancelaLavratura = `${config.public.managemant}/cancela_lavratura`;
const pesquisaAtos = `${config.public.managemant}/pesquisaAtos`;

const usuario_token = ref(useCookie("auth_token").value) || null;
const cartorio_token = ref(useCookie("user-data").value.cartorio_token) || null;

const atos = ref([]);
const isModalCancelamentoOpen = ref(false);
const condMessage = ref("");
const ato_token = ref(null);
const selo_numero = ref(null);
const cancelamentoForcadoPendente = ref(false);
const mensagemAvisoCondicional = ref("");

const state = reactive({
  id: null,
  selo_numero: null,
});

const headers = [
  {
    title: "Protocolo",
    value: "protocolo",
  },
  {
    title: "Data lavratura/Parte",
    value: "dt_lavratura",
  },
  {
    title: "Situação/Serviço",
    key: "situacaoServico",
    value: (item) =>
      item.situacao
        ? `${item.situacao}\n${item.ato_servico}`
        : `${item.ato_servico}`,
    cellProps: {
      style: {
        whiteSpace: "pre-line",
        lineHeight: "2",
      },
    },
  },
  { title: "Livro", value: "livro_numero" },
  { title: "Folha", value: "folha" },
  { title: "Valor", value: "valor" },
  { title: "Ações", value: "actions" },
];

async function searchAtos() {
  try {
    if (state.id === null) {
      $toast.error("Informe o ID do ato!");
      return;
    }
    sessionStorage.setItem("pesquisaAto", JSON.stringify(state));

    const { data: atosData } = await useFetch(pesquisaAtos, {
      method: "POST",
      body: {
        cartorio_token: cartorio_token.value,
        ato_id: Number(state.id) || null,
      },
    });
    if (atosData.value.length > 0) {
      atos.value = atosData.value.map((item) => {
        return {
          ...item,
          dt_lavratura: item.dt_lavratura
            ? formatDate(item.dt_lavratura, "dd/mm/yyyy hh:mm")
            : null,
          dt_abertura: item.dt_abertura
            ? formatDate(item.dt_abertura, "dd/mm/yyyy")
            : null,
        };
      });
    } else {
      atos.value = [];
      $toast.error("Não existe ato Registrado!");
    }
  } catch (error) {
    console.error("Erro na requisição", error);
  }
}

const abrirModalCancelamento = (token, selo_numero) => {
  ato_token.value = token;
  selo_numero.value = selo_numero;
  condMessage.value =
    "O cancelamento de lavratura é definitivo e não poderá ser revertido. Confirma o cancelamento da lavratura deste ato?";
  cancelamentoForcadoPendente.value = false;
  isModalCancelamentoOpen.value = true;
};

const cancelaAto = async () => {
  if (cancelamentoForcadoPendente.value) {
    await executaCancelaAto(true);
    return;
  }

  await executaCancelaAto(false);
};

const executaCancelaAto = async (forcar) => {
  isModalCancelamentoOpen.value = false;

  const { data, status, error } = await useFetch(cancelaLavratura, {
    method: "POST",
    body: {
      ato_token: ato_token.value,
      user_token: usuario_token.value,
      selo_numero: selo_numero.value,
      forcar_cancelamento: forcar,
    },
  });

  isModalCancelamentoOpen.value = false;

  if (status.value === "success" && data.value && data.value[0]) {
    const resultado = data.value[0];
    if (resultado.status === "OK") {
      $toast.success("Lavratura cancelada com sucesso!");
      atos.value = [];
      state.id = null;
      cancelamentoForcadoPendente.value = false;
    }
  } else if (status.value === "error" && error.value) {
    mensagemAvisoCondicional.value = `${error.value.data[0].status_mensagem} Confirma o cancelamento?`;
    condMessage.value = mensagemAvisoCondicional.value;
    cancelamentoForcadoPendente.value = true;
    isModalCancelamentoOpen.value = true;
  }
};
</script>

<style scoped>
.disabled {
  opacity: 0.5;
  pointer-events: none;
}
</style>
