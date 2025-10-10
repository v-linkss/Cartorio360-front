<template>
  <v-container class="mt-5">
    <v-row class="mb-5">
      <h1>Cancelamento de Lavratura</h1>
    </v-row>

    <v-row>
      <v-col cols="2">
        <v-text-field
          v-model="state.protocolo"
          label="Protocolo"
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
  </v-container>
  <div style="width: 1300px; margin: 0 auto">
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
            :disabled="!item.btn_cancelar"
            @click="
              item.btn_cancelar ? abrirModalCancelamento(item.token) : null
            "
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

const state = reactive({
  protocolo: null,
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
    sessionStorage.setItem("pesquisaAto", JSON.stringify(state));

    const { data: atosData } = await useFetch(pesquisaAtos, {
      method: "POST",
      body: {
        cartorio_token: cartorio_token.value,
        protocolo: state.protocolo || null,
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
const abrirModalCancelamento = (token) => {
  ato_token.value = token;
  condMessage.value = "Tem certeza que deseja cancelar este ato?";
  isModalCancelamentoOpen.value = true;
};

const cancelaAto = async () => {
  const { data, status } = await useFetch(cancelaLavratura, {
    method: "POST",
    body: {
      ato_token: ato_token.value,
      user_token: usuario_token.value,
      cancelar_selo: false,
    },
  });
  if (status.value === "success" && data.value[0].status === "OK") {
    $toast.success("Lavratura cancelada com sucesso!");
    isModalCancelamentoOpen.value = false;
  } else if (data.value[0].status === "ERRO") {
    $toast.error("erro ao cancelar ato");
    // isModalCancelamentoOpen.value = true;
    // condMessage.value = data.value[0].status_mensagem;
  }
};
</script>

<style scoped>
.disabled {
  opacity: 0.5;
  pointer-events: none;
}
</style>
