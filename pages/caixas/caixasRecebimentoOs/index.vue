<template>
  <v-container class="mt-5">
    <v-row class="mb-5">
      <h1>
        Recebimento de Ordens de Serviço - Caixa {{ data }} - {{ nome_usuario }}
      </h1>
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
    <hr class="mt-5 mb-5" />
    <v-data-table :headers="headers" :items="filteredItems" item-key="id">
      <template v-slot:item.actions="{ item }">
        <v-row style="display: flex; gap: 10px; margin-top: -5px">
          <div
            :class="{ disabled: !item.btn_receber }"
            :title="item.btn_receber ?  'Bloqueado': 'Receber'"
            @click="
              item.btn_receber ? null : redirectToRecebimento(item.numero, item)
            "
            title="Receber"
          >
            <img
              :style="{
                cursor: item.btn_receber ? 'default' : 'pointer',
                width: '30px',
                height: '30px',
              }"
              src="../../../assets/recebe.png"
              alt="Receber"
            />
          </div>
          <div
            :class="{ disabled: !item.btn_encerrar }"
            title="Cancelamento"
          >
            <img
              style="width: 30px; height: 30px; cursor: pointer"
              src="../../../assets/salvar.png"
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
      @confirm="encerrarCaixaOs(selectedOrder)"
      :condMessage="condMessage"
      :show="isModalEncerramentoOpen"
      @close="isModalEncerramentoOpen = false"
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
const encerrarCaixa = `${config.public.managemant}/caixas`;

const nome_usuario = useCookie("caixa-service").value.usuario_nome;
const data = useCookie("caixa-service").value.data;

const caixaRecebeOsItems = ref([]);
const searchNumero = ref("");
const searchApresentante = ref("");
const selectedOrder = ref({});
const numero_os = ref(null);
const condMessage = ref("O encerramento de caixa não poderá ser revertido. Confirma o encerramento?") 
const isModalRecebimentoOpen = ref(false);
const isModalEncerramentoOpen = ref(false);

const goBack = () => {
  navigateTo("/caixas/lista");
};

const headers = [
  { title: "Data Recebimento", value: "data" },
  { title: "Número", value: "numero" },
  { title: "Situação", value: "situacao" },
  { title: "CPF", value: "apresentante_cpf" },
  { title: "Apresentante", value: "apresentante_nome" },
  { title: "Usuário", value: "usuario_nome" },
  { title: "Valor", value: "valor" },
  { title: "Ações", value: "actions" },
];

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
      $toast.error("Nenhum dado retornado da API.");
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

const openEncerramentoModal = (item) => {
  selectedOrder.value = item; 
  isModalEncerramentoOpen.value = true;
}

async function encerrarCaixaOs(id) {
  try {
    const response = await $fetch(`${encerrarCaixa}/${id}`, {
      method: "PUT",
      body: {
        dt_fechamento: getCurrentDate(),
      },
    });
    if (response) {
      $toast.success("Ordem de Serviço encerrada com sucesso!");
      isModalEncerramentoOpen.value = false;
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

    const matchesNumero = numero.includes(searchNumero.value.toLowerCase());
    const matchesApresentante = apresentante.includes(
      searchApresentante.value.toLowerCase()
    );

    return matchesNumero && matchesApresentante;
  });
});

function redirectToCancelamento(numero, token) {
  isModalEncerramentoOpen.value = true;

  console.log("Cancelando OS:", { numero, token });
}

function redirectToRecebimento(numero, item) {
  numero_os.value = numero;
  selectedOrder.value = {
    token: item.token,
    numero: item.numero,
    valor: item.valor,
    valor_pago: item.valor_pago,
  };
  isModalRecebimentoOpen.value = true;
}

function redirectToUpdate(id) {
  // Lógica para redirecionar à edição
  console.log("Editando OS:", id);
}
</script>
