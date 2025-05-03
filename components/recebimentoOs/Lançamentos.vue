<template>
  <v-container class="mt-5">
    <v-row class="mb-5">
      <h1>Lançamentos do caixa</h1>
      <NuxtLink to="/caixas/cadastro">
        <img
          style="width: 60px; height: 60px; cursor: pointer; margin-left: 70px"
          src="../../assets/novo.png"
          alt="novo"
          @click="redirectCreateCaixa"
        />
      </NuxtLink>
    </v-row>
    <v-row>
      <v-col cols="3">
        <v-text-field v-model="searchDescricao" label="Descrição" />
      </v-col>
      <v-col cols="3">
        <v-text-field v-model="searchFormaReceb" label="Forma de Recebimento" />
      </v-col>
    </v-row>
    <hr class="mt-5 mb-5" />
    <v-data-table :headers="headers" :items="filteredItems" item-key="id">
      <template v-slot:item.actions="{ item }">
        <v-row style="display: flex; gap: 4px; margin-top: -5px">
          <div
            style="cursor: pointer"
            @click="HandleDelete(item)"
            title="Cancelamento"
          >
            <img
              v-if="item.excluido"
              style="width: 30px; height: 30px"
              src="../../assets/excluido.png"
              alt="Visualizar"
              title="Reativar"
            />
            <img
              v-else
              src="../../assets/mudarStatus.png"
              alt="Excluir"
              class="trash-icon"
              style="width: 30px; height: 30px"
              title="Excluir"
            />
          </div>
        </v-row>
      </template>
    </v-data-table>
    <ModalConfirmacao
      @confirm="encerrarCaixaLancamento(selectedOrder)"
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
const listarLancamentoCaixa = `${config.public.managemant}/lista_lanctos_caixa`;
const encerrarCaixa = `${config.public.managemant}/caixasLanctos`;

const nome_usuario = useCookie("caixa-service").value.usuario_nome;
const data = useCookie("caixa-service").value.data;

const lancamentoCaixa = ref([]);
const searchDescricao = ref("");
const searchFormaReceb = ref("");
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
  { title: "Forma recebimento", value: "forma_receb" },
  { title: "Valor", value: "valor" },
  { title: "Descrição", value: "descricao" },
  { title: "O.S", value: "ordemserv_numero" },
  { title: "Apresentatante", value: "apresentante_nome" },
  { title: "Usuário", value: "usuario_nome" },
  { title: "Ações", value: "actions" },
];

const searchSituacao = ref("");

async function lancamentoCaixaPayload() {
  try {
    const response = await $fetch(listarLancamentoCaixa, {
      method: "POST",
      body: {
        caixa_token: useCookie("caixa-service").value.caixa_token,
      },
    });

    if (response && Array.isArray(response)) {
      lancamentoCaixa.value = response;
    } else {
      $toast.error("Erro ao buscar dados da API.");
    }
  } catch (error) {
    const errorMessage =
      error.message || "Erro ao buscar dados da API. Tente novamente.";
    $toast.error(errorMessage);
  }
}

async function HandleDelete(item) {
  try {
    item.excluido = !item.excluido;

    const { data, error } = await useFetch(`${encerrarCaixa}/${item.id}`, {
      method: "PUT",
      body: { excluido: item.excluido },
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (error.value) {
      throw error.value;
    }

    $toast.success("Lançamento excluído com sucesso!");
    await lancamentoCaixaPayload(); // Atualiza a lista após exclusão
  } catch (err) {
    console.error("Erro ao excluir lançamento:", err);
    $toast.error("Erro ao excluir lançamento");
  }
}

async function encerrarCaixaLancamento(id) {
  try {
    const response = await $fetch(`${encerrarCaixa}/${id}`, {
      method: "PUT",
      body: {
        excluido: true,
      },
    });
    if (response) {
      $toast.success("Lançamento do caixa encerrada com sucesso!");
      isModalCancelamentoOpen.value = false;
      lancamentoCaixaPayload();
    } else {
      $toast.error("Erro ao encerrar o Lançamento do caixa. Tente novamente.");
    }
  } catch (error) {
    const errorMessage =
      error.message || "Erro ao buscar dados da API. Tente novamente.";
    $toast.error(errorMessage);
  }
}

onMounted(() => {
  lancamentoCaixaPayload();
});

const filteredItems = computed(() => {
  return lancamentoCaixa.value.filter((item) => {
    const numero = item.numero ? item.numero.toString().toLowerCase() : "";
    const apresentante = item.apresentante_nome
      ? item.apresentante_nome.toLowerCase()
      : "";
    const situacao = item.situacao ? item.situacao.toUpperCase() : "";
    const descricao = item.descricao ? item.descricao.toLowerCase() : "";
    const formaReceb = item.forma_receb ? item.forma_receb.toLowerCase() : "";

    const matchesNumero = numero.includes(searchNumero.value.toLowerCase());
    const matchesApresentante = apresentante.includes(
      searchApresentante.value.toLowerCase()
    );
    const matchesSituacao = searchSituacao.value
      ? situacao === searchSituacao.value
      : true;
    const matchesDescricao = descricao.includes(
      searchDescricao.value.toLowerCase()
    );
    const matchesFormaReceb = formaReceb.includes(
      searchFormaReceb.value.toLowerCase()
    );

    return (
      matchesNumero &&
      matchesApresentante &&
      matchesSituacao &&
      matchesDescricao &&
      matchesFormaReceb
    );
  });
});

const redirectCreateCaixa = () => {
  navigateTo("/caixas/cadastro");
};
</script>
