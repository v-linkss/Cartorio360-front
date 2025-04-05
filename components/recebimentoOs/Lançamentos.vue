<template>
    <v-container class="mt-5">
      <v-row class="mb-5">
        <h1>
          Lançamentos do caixa
        </h1>
      </v-row>
      <v-row>
        <v-col cols="3">
            <v-text-field
            v-model="searchDescricao"
            label="Descrição"
            />
        </v-col>
        <v-col cols="3">
            <v-text-field
            v-model="searchFormaReceb"
            label="Forma de Recebimento"
            />
        </v-col>
       </v-row>
      <hr class="mt-5 mb-5" />
      <v-data-table :headers="headers" :items="filteredItems" item-key="id">
        <template v-slot:item.actions="{ item }">
          <v-row style="display: flex; gap: 4px; margin-top: -5px">
            <div
              :class="{ disabled: !item.btn_encerrar }"
              @click="item.btn_encerrar ?  openCancelamentoModal(item.id) : false"
              title="Cancelamento"
            >
              <img
                style="width: 30px; height: 30px; cursor: pointer"
                src="../../assets/excluido.png"
                alt="Encerrar"
                title="Encerrar"
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
  const selectedOrder = ref({});
  const numero_os = ref(null);
  const condMessage = ref("O encerramento de OS não poderá ser revertido. Confirma o encerramento?") 
  const isModalRecebimentoOpen = ref(false);
  const isModalCancelamentoOpen = ref(false);
  
  const goBack = () => {
    navigateTo("/caixas/lista");
  };
  
  const headers = [
    { title: "Forma recebimento", value: "forma_receb" },
    { title: "Valor", value: "valor" },
    { title: "Descrição", value: "Descricao" },
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
    const apresentante = item.apresentante_nome ? item.apresentante_nome.toLowerCase() : "";
    const situacao = item.situacao ? item.situacao.toUpperCase() : "";
    const descricao = item.Descricao ? item.Descricao.toLowerCase() : "";
    const formaReceb = item.forma_receb ? item.forma_receb.toLowerCase() : "";

    const matchesNumero = numero.includes(searchNumero.value.toLowerCase());
    const matchesApresentante = apresentante.includes(searchApresentante.value.toLowerCase());
    const matchesSituacao = searchSituacao.value ? situacao === searchSituacao.value : true;
    const matchesDescricao = descricao.includes(searchDescricao.value.toLowerCase());
    const matchesFormaReceb = formaReceb.includes(searchFormaReceb.value.toLowerCase());

    return (
      matchesNumero &&
      matchesApresentante &&
      matchesSituacao &&
      matchesDescricao &&
      matchesFormaReceb
    );
  });
});

  
  function redirectToCancelamento(numero, token) {
    isModalCancelamentoOpen.value = true;
  
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
  