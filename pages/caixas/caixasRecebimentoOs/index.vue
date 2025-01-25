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
            label="Numero"
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
      <v-data-table :headers="headers" :items="caixaRecebeOsItems" item-key="id">
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
    </v-container>
  </template>
  
  <script setup>
  const config = useRuntimeConfig();
  const { $toast } = useNuxtApp();
  const listarOSCaixas = `${config.public.managemant}/listarOSCaixas`;
  

  const nome_usuario = useCookie('caixa-service').value.usuario_nome
  const data = useCookie('caixa-service').value.data
  

  const caixaRecebeOsItems  = ref([]);
  const isModalCancelamentoOpen = ref(false);
  const numero_os = ref(null);

  const searchNumero = ref("");
  const searchApresentante = ref("");
  
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

  async function caixaOsDataPayload() {
    const { data: caixaOsData, error } = await useFetch(listarOSCaixas, {
      method: "POST",
      body: {
        caixa_token: useCookie('caixa-service').value.caixa_token
      },
    });
    caixaRecebeOsItems.value = caixaOsData.value
  }
  
  caixaOsDataPayload();
  
  function redirectToCancelamento(numero, token, item) {
    numero_os.value = numero;
    ordemserv_token.value = token;
    isModalCancelamentoOpen.value = true;
  }
  
  const filteredItems = computed(() => {
    return caixaRecebeOsItems.value.filter((item) => {
      const numero = item.numero
        ? item.numero.toLowerCase()
        : "";
      const apresentante_nome = item.apresentante_nome ? item.apresentante_nome.toLowerCase() : "";

      const matchesNumero = numero.includes(searchNumero.value.toLowerCase());
      const matchesApresentante = apresentante_nome.includes(searchApresentante.value.toLowerCase());

      return matchesNumero && matchesApresentante;
    });
  });

</script>
  