<template>
  <v-container class="mt-5">
    <v-row class="mb-5">
      <h1>Recebimento de Ordens de Serviço - Caixa {{ data }} - {{ nome_usuario }}</h1>
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
              src="../../../assets/recebe.png"
              alt="Receber"
            />
          </div>
          <div
            :class="{ disabled: !item.btn_cancelar }"
            @click="
              item.btn_cancelar
                ? redirectToCancelamento(item.numero, item.token)
                : null
            "
            title="Cancelamento"
          >
            <img
              style="width: 30px; height: 30px"
              src="../../../assets/salvar.png"
              alt="Visualizar"
              title="Visualizar"
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
import { ref, computed, onMounted } from "vue";

const config = useRuntimeConfig();
const { $toast } = useNuxtApp();
const listarOSCaixas = `${config.public.managemant}/listarOSCaixas`;

const nome_usuario = useCookie("caixa-service").value.usuario_nome;
const data = useCookie("caixa-service").value.data;

const caixaRecebeOsItems = ref([]);
const searchNumero = ref("");
const searchApresentante = ref("");
const selectedOrder = ref({});
const numero_os = ref(null);
const isModalRecebimentoOpen = ref(false);

const goBack = () => {
navigateTo('/caixas/lista')
}

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
      console.error("Nenhum dado retornado da API.");
    }
  } catch (error) {
    const errorMessage =
      error.message || "Erro ao buscar dados da API. Tente novamente.";
    $toast.error(errorMessage);
    console.error(errorMessage);
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
  // Lógica para redirecionar ao cancelamento
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
