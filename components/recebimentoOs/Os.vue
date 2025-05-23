<template>
  <v-container class="mt-5">
    <v-row class="mb-5">
      <h1>Recebimento de Ordens de Serviço</h1>
    </v-row>
    <v-row>
      <v-col cols="2">
        <v-text-field
          v-model="searchNumero"
          type="text"
          label="Número"
        ></v-text-field>
      </v-col>
      <v-col md="3">
        <v-text-field
          v-model="searchApresentante"
          label="Apresentante"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col md="3">
        <v-autocomplete
          v-model="searchSituacao"
          :items="situacoes"
          label="Situação"
          clearable
        ></v-autocomplete>
      </v-col>
    </v-row>
    <hr class="mt-5 mb-5" />
    <v-data-table :headers="headers" :items="filteredItems" item-key="id">
      <template v-slot:item.actions="{ item }">
        <v-row style="display: flex; gap: 4px; margin-top: -5px">
          <div
            :class="{ disabled: !item.btn_receber }"
            :title="item.btn_receber ? 'Receber' : 'Bloqueado'"
            @click="
              item.btn_receber ? redirectToRecebimento(item.numero, item) : null
            "
            title="Receber"
          >
            <img
              :style="{
                cursor: item.btn_receber ? 'pointer' : 'default',
                width: '30px',
                height: '30px',
              }"
              src="../../assets/recebe.png"
              alt="Receber"
            />
          </div>
          <div
            :class="{ disabled: !item.btn_encerrar }"
            @click="item.btn_encerrar ? openCancelamentoModal(item.id) : false"
            title="Cancelamento"
          >
            <img
              style="width: 30px; height: 30px; cursor: pointer"
              src="../../assets/salvar.png"
              alt="Encerrar"
              title="Encerrar"
            />
          </div>
        </v-row>
      </template>
    </v-data-table>
    <RecebimentoOrdem
      :show="isModalRecebimentoOpen"
      :numero_os="numero_os"
      :ordem="selectedOrder"
      @close="isModalRecebimentoOpen = false"
    />
    <ModalConfirmacao
      @confirm="encerrarOS(selectedOrder)"
      :condMessage="condMessage"
      :show="isModalCancelamentoOpen"
      @close="isModalCancelamentoOpen = false"
    />
  </v-container>
  <v-rows>
    <v-cols>
      <v-btn class="ml-8" size="large" @click="goBack" color="red"
        >Voltar
      </v-btn>
    </v-cols>
  </v-rows>
</template>

<script setup>
const config = useRuntimeConfig();
const { $toast } = useNuxtApp();
const listarOSCaixas = `${config.public.managemant}/listarOSCaixas`;
const situacaoOS = `${config.public.managemant}/lista_sit_ordemserv`;
const encerrarOs = `${config.public.managemant}/updateOrdensServico`;

const caixaRecebeOsItems = ref([]);
const situacoes = ref([]);
const searchNumero = ref("");
const searchApresentante = ref("");
const selectedOrder = ref({});
const numero_os = ref(null);
const condMessage = ref(
  "O encerramento de OS não poderá ser revertido. Confirma o encerramento?"
);
const isModalRecebimentoOpen = ref(false);
const isModalCancelamentoOpen = ref(false);

const goBack = () => {
  navigateTo("/caixas/lista");
};

const headers = [
  { title: "Número", value: "numero" },
  { title: "Situação", value: "situacao" },
  { title: "CPF", value: "apresentante_cpf" },
  { title: "Apresentante", value: "apresentante_nome" },
  { title: "Usuário", value: "usuario_nome" },
  { title: "Valor", value: "valor" },
  { title: "A Receber", value: "valor_a_receber" },
  { title: "Ações", value: "actions" },
];

const searchSituacao = ref("");

async function caixaOsDataPayload() {
  try {
    const response = await $fetch(listarOSCaixas, {
      method: "POST",
      body: {
        caixa_token: useCookie("caixa-service").value.caixa_token,
      },
    });

    if (response && Array.isArray(response)) {
      caixaRecebeOsItems.value = response;
    } else {
      $toast.error("Erro ao buscar dados da API.");
    }
  } catch (error) {
    const errorMessage =
      error.message || "Erro ao buscar dados da API. Tente novamente.";
    $toast.error(errorMessage);
  }
}

function getCurrentDate() {
  const today = new Date();
  const yyyy = today.getFullYear();
  const MM = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");
  return `${yyyy}-${MM}-${dd}`;
}

const openCancelamentoModal = (item) => {
  selectedOrder.value = item;
  isModalCancelamentoOpen.value = true;
};

async function getSituacaoOs() {
  try {
    const { data, error } = await useFetch(situacaoOS, {
      method: "GET",
    });

    if (data.value && Array.isArray(data.value)) {
      situacoes.value = data.value.map((item) => ({
        title: item.descricao,
        value: item.descricao,
      }));
    } else {
      $toast.error("Erro ao buscar dados da API de situação.");
      if (error.value) {
        console.error("Erro detalhado:", error.value);
      }
    }
  } catch (error) {
    const errorMessage =
      error.message || "Erro ao buscar dados da API. Tente novamente.";
    $toast.error(errorMessage);
    console.error("Erro na requisição:", error);
  }
}

getSituacaoOs();

async function encerrarOS(id) {
  try {
    const response = await $fetch(`${encerrarOs}/${id}`, {
      method: "PUT",
      body: {
        dt_pagto: getCurrentDate(),
      },
    });
    if (response) {
      $toast.success("Ordem de Serviço encerrada com sucesso!");
      isModalCancelamentoOpen.value = false;
      caixaOsDataPayload();
    } else {
      $toast.error("Erro ao encerrar OS. Tente novamente.");
    }
  } catch (error) {
    const errorMessage =
      error.message || "Erro ao buscar dados da API. Tente novamente.";
    $toast.error(errorMessage);
  }
}

onMounted(() => {
  caixaOsDataPayload();
});

const filteredItems = computed(() => {
  return caixaRecebeOsItems.value.filter((item) => {
    const numero = item.numero ? item.numero.toString().toLowerCase() : "";
    const apresentante = item.apresentante_nome
      ? item.apresentante_nome.toLowerCase()
      : "";
    const situacao = item.situacao ? item.situacao.toUpperCase() : "";

    const matchesNumero = numero.includes(searchNumero.value.toLowerCase());
    const matchesApresentante = apresentante.includes(
      searchApresentante.value.toLowerCase()
    );
    const matchesSituacao = searchSituacao.value
      ? situacao === searchSituacao.value
      : true;

    return matchesNumero && matchesApresentante && matchesSituacao;
  });
});

function redirectToRecebimento(numero, item) {
  numero_os.value = numero;
  selectedOrder.value = {
    token: item.token,
    numero: item.numero,
    valor: item.valor,
    valor_pago: item.valor_pago,
    caixa_token: useCookie("caixa-service").value.caixa_token,
  };
  isModalRecebimentoOpen.value = true;
}
</script>
