<template>
    <v-container class="mt-5">
      <v-row class="mb-5">
        <h1>Caixas</h1>
      </v-row>
      <v-row>
        <v-col cols="2">
          <v-text-field
            v-model="state.data"
            type="date"
            label="Data"
          ></v-text-field>
        </v-col>
        <v-col md="3">
          <v-autocomplete
            v-model="state.situacao"
            :items="situacaoItems"
            label="Situação"
          ></v-autocomplete>
        </v-col>
        <v-col md="2">
          <v-autocomplete
            :items="usuariosItems"
            v-model="state.usuario_token"
            item-title="user_nome"
            item-value="user_token"
            label="Usuario"
          ></v-autocomplete>
        </v-col>
        <v-col>
          <div>
            <img
              @click="searchCaixas"
              style="width: 40px; height: 40px; cursor: pointer"
              src="../../../assets/visualizar.png"
              alt="Pesquisar"
            />
          </div>
        </v-col>
      </v-row>
      <hr class="mt-5 mb-5" />
      <v-data-table :headers="headers" :items="caixaItems" item-key="id">
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
              :class="{ disabled: !item.btn_editar }"
              @click="item.btn_editar ? redirectToUpdate(item.id) : null"
              :title="item.btn_editar ? 'Editar' : 'Bloqueado'"
            >
              <img
                :style="{
                  cursor: item.btn_editar ? 'pointer' : 'default',
                  width: '30px',
                  height: '30px',
                }"
                src="../../../assets/Salvar.png"
                alt="Salvar"
              />
            </div>
  
            <div
              :disabled="!item.btn_cancelar"
              @click="
                item.btn_cancelar
                  ? redirectToCancelamento(item.numero, item.token)
                  : null
              "
              title="Cancelamento"
            >
              <img
                style="width: 30px; height: 30px"
                src="../../../assets/visualizar.png"
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
      <CancelamentoOrdem
        :show="isModalCancelamentoOpen"
        :numero_os="numero_os"
        :ordemserv_token="ordemserv_token"
        @close="isModalCancelamentoOpen = false"
      />
    </v-container>
  </template>
  
  <script setup>
  const config = useRuntimeConfig();
  const { $toast } = useNuxtApp();
  const allUsuarios = `${config.public.managemant}/listarUsuarios`;
  const getCaixas = `${config.public.managemant}/listarCaixas`;
  
  const router = useRouter();
  
  const usuario_token = ref(useCookie("auth_token").value) || null;
  const cartorio_token = ref(useCookie("user-data").value.cartorio_token) || null;
  const usuariosItems = ref([]);
  const caixaItems  = ref([]);
  const situacaoItems = ref(["PENDENTE", "ENCERRADO", "CANCELADO"]);
  const isModalRecebimentoOpen = ref(false);
  const isModalCancelamentoOpen = ref(false);
  const showCreateOrdemServ = ref(null);
  const numero_os = ref(null);
  const selectedOrder = ref({});
  
  const state = reactive({
    data: null || getCurrentDate(),
    situacao: null,
    usuario_token: null
  });
  
  const headers = [
    { title: "Data Recebimento", value: "data" },
    { title: "Número", value: "numero" },
    { title: "Situação", value: "situacao" },
    { title: "CPF", value: "apresentante_cpf" },
    { title: "Apresentante", value: "apresentante_nome" },
    { title: "Usuario", value: "usuario_nome" },
    { title: "Valor", value: "valor" },
    {
      value: "actions",
    },
  ];
  
  function getCurrentDate() {
    const today = new Date();
    const yyyy = today.getFullYear();
    const MM = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    return `${yyyy}-${MM}-${dd}`;
  }
  
  async function usuariosDataPayload() {
    const { data: usuarioData, error } = await useFetch(allUsuarios, {
      method: "POST",
      body: {
        cartorio_token: cartorio_token.value,
      },
    });
    usuariosItems.value = usuarioData.value
  }
  
  async function searchCaixas() {
    console.log(cartorio_token.value)
    try {
      sessionStorage.setItem("pesquisaCaixas", JSON.stringify(state));
  
      const { data: caixasData, error } = await useFetch(getCaixas, {
        method: "POST",
        body: {
          cartorio_token: cartorio_token.value,
          user_token: state.usuario_token,
          data: state.data || null,
          situacaoItems: state.situacaoItems,
        },
      });
      if (caixasData.value.length > 0) {
        caixaItems.value = caixasData.value;
      } else {
        caixaItems.value = [];
        $toast.error("Não existe caixa registrada!")
      }
    } catch (error) {
      console.error("Erro na requisição", error);
    }
  }
  
  const caixaDataTable = async () => {
    try {
      const currentDate = getCurrentDate();
      const pesquisaSalva = sessionStorage.getItem("pesquisaCaixas");
      const dadosRestaurados = JSON.parse(pesquisaSalva);
      const { data: caixaData, error } = await useFetch(getCaixas, {
        method: "POST",
        body: {
          cartorio_token: cartorio_token.value,
          usuario_token: usuario_token.value,
          data: dadosRestaurados?.data || currentDate,
        },
      });
      if (caixaData.value.length > 0) {
        caixaItems.value = caixaData.value.map((item) => {
          return {
            ...item,
            data: formatDate(item.data, "dd/mm/yyyy"),
          };
        });
      } else {
        caixaItems.value = [];
      }
    } catch (error) {
      console.error("Erro ao buscar serviços", error);
    }
  };
  
  usuariosDataPayload();
  
  function redirectToCancelamento(numero, token, item) {
    numero_os.value = numero;
    ordemserv_token.value = token;
    isModalCancelamentoOpen.value = true;
  }
  
  function redirectToUpdate(id) {
    const serviceCookie = useCookie("user-service");
    const servico = servicosItems.value.find((item) => item.id === id);
    serviceCookie.value = serviceCookie.value = JSON.stringify({
      id: servico.id,
      token: servico.token,
    });
  
    router.push({ path: `/os/atualizar/${id}` });
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
  
  const showCreateOrdem = () => {
    const serviceCookie = useCookie("user-service");
    const isTrueOrdemServ = useCookie("ordem-button");
    serviceCookie.value = null;
    showCreateOrdemServ.value = true;
    isTrueOrdemServ.value = showCreateOrdemServ.value;
  };
  
  onMounted(() => {
    nextTick(async () => {
      const pesquisaSalva = sessionStorage.getItem("pesquisaCaixas");
  
      if (pesquisaSalva) {
        const dadosRestaurados = JSON.parse(pesquisaSalva);
        Object.assign(state, dadosRestaurados);
      }
  
      await caixaData();
    });
  });
  </script>
  