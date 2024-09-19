<template>
  <v-container class="mt-5">
    <v-row class="mb-5">
      <h1>Ordens de Serviço</h1>
      <NuxtLink to="./OrdensServico/criar-registro">
        <img
          style="width: 60px; height: 60px; cursor: pointer;margin-left: 70px;"
          src="../../assets/novo.png"
          alt="novo"
        />
      </NuxtLink>
    </v-row>
    <v-row style="margin-bottom: -35px">
      <v-col>
        <v-text-field
          v-model="state.numero"
          label="Número"
          style="width: 110px"
        ></v-text-field>
      </v-col>
      <v-col>
        <v-text-field
          v-model="state.data_inicio"
          type="date"
          label="Abertura de"
          style="width: 150px"
        ></v-text-field>
      </v-col>
      <v-col>
        <v-text-field
          v-model="state.data_fim"
          type="date"
          label="Abertura até"
          style="width: 150px"
        ></v-text-field>
      </v-col>
      <v-col>
        <v-text-field
          v-model="state.data_lavratura_inicio"
          type="date"
          label="Lavratura de"
          style="width: 150px"
        ></v-text-field>
      </v-col>
      <v-col>
        <v-text-field
          v-model="state.data_lavratura_fim"
          type="date"
          label="Lavratura até"
          style="width: 150px"
        ></v-text-field>
      </v-col>
      <v-col>
        <v-text-field
          v-model="state.protocolo"
          label="Protocolo"
          style="width: 110px"
        ></v-text-field>
      </v-col>
      <v-col md="1">
        <v-text-field
          v-model="state.livro"
          label="Livro"
          style="width: 80px"
        ></v-text-field>
      </v-col>
      <v-col md="1">
        <v-text-field
          v-model="state.folha"
          label="Folha"
          style="width: 80px"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
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
      <v-col md="1">
        <v-text-field v-model="state.selo" label="Selo"></v-text-field>
      </v-col>
      <v-col md="3">
        <v-autocomplete
          v-model="state.ato_tipo_token"
          :items="tipoAtosItems"
          item-title="descricao"
          item-value="token"
          label="Serviço"
        ></v-autocomplete>
      </v-col>
      <v-col md="2">
        <v-text-field
          v-model="state.apresentante"
          label="Apresentante"
        ></v-text-field>
      </v-col>
      <v-col>
        <div>
          <img
            @click="searchOrdersService"
            style="width: 40px; height: 40px; cursor: pointer"
            src="../../assets/visualizar.png"
            alt="Pesquisar"
          />
        </div>
      </v-col>
    </v-row>
    <hr class="mt-5 mb-5" />
    <v-data-table :headers="headers" :items="servicosItems" item-key="id">
      <template v-slot:item.actions="{ item }">
        <v-row style="display: flex; gap: 10px;margin-top: -5px;">
          <div @click="redirectToUpdate(item.id)" title="Receber">
            <img
              style="width: 30px; height: 30px; cursor: pointer"
              src="../../assets/recebe.png"
              alt="Receber"
            />
          </div>

          <div
            :class="{ disabled: !item.btn_editar }"
            @click="item.btn_editar ? redirectToUpdate(item.id) : null"
            :title="item.btn_editar ? 'Editar' : 'Desabilitado'"
          >
            <img
              :style="{
                cursor: item.btn_editar ? 'pointer' : 'default',
                width: '30px',
                height: '30px',
              }"
              src="../../assets/editar.png"
              alt="Editar"
            />
          </div>

          <div
            :disabled="!item.btn_cancelar"
            @click="item.btn_cancelar ? deleteEndereco(item) : null"
            title="Excluir"
          >
            <img
              v-if="item.excluido"
              style="width: 30px; height: 30px; cursor: pointer"
              src="../../assets/excluido.png"
              alt="Visualizar"
              title="Reativar"
            />
            <img
              v-else
              src="../../assets/mudarStatus.png"
              alt="Excluir"
              class="trash-icon"
              style="width: 30px; height: 30px; cursor: pointer"
              title="Excluir"
            />
          </div>
        </v-row>
      </template>
    </v-data-table>
    <NuxtLink to="/">
      <img class="btn-pointer" src="../../assets/sair.png" alt="Sair" />
    </NuxtLink>
  </v-container>
</template>

<script setup>

const config = useRuntimeConfig();
const allUsuarios = `${config.public.managemant}/listarUsuarios`;
const allServicos = `${config.public.managemant}/listarOrdensServico`;
const allTiposAtos = `${config.public.managemant}/tipoAtos`;

const usuario_token = ref(useCookie("auth_token").value);
const cartorio_token = ref(useCookie("user-data").value.cartorio_token);
const servicosItems = ref([]);
const usuariosItems = ref([]);
const tipoAtosItems = ref([]);
const situacaoItems = ref(["PENDENTE","EM ANDAMENTO", "CONCLUÍDA", "LAVRADA"]);


const state = reactive({
  numero: null,
  data_inicio: null,
  data_fim: null,
  data_lavratura_inicio: null,
  data_lavratura_fim: null,
  protocolo: null,
  livro: null,
  folha: null,
  situacao: null,
  usuario_token: null,
  selo: null,
  ato_tipo_token: null,
  apresentante: null,
});

const headers = [
  { title: "Número", value: "numero" },
  { title: "Situação", value: "situacao" },
  { title: "Apresentante", value: "apresentante" },
  { title: "Usuario", value: "usuario_nome" },
  { title: "Data Recebimento", value: "dt_pagto" },

  {
    value: "actions",
  },
];

function getCurrentDate() {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0'); 
  const dd = String(today.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

async function usuariosDataPayload() {
  const { data: usuarioData, error } = await useFetch(allUsuarios, {
    method: "POST",
    body:{
      cartorio_token:cartorio_token.value
    }
  });
  usuariosItems.value = usuarioData.value;
}

async function searchOrdersService() {

  try {
    const { data: servicosData, error } = await useFetch(allServicos, {
      method: "POST",
      body: {
        cartorio_token: cartorio_token.value,
        numero: state.numero,
        data_inicio: state.data_inicio,
        data_fim: state.data_fim,
        data_lavratura_inicio: state.data_lavratura_inicio,
        data_lavratura_fim: state.data_lavratura_fim,
        protocolo: state.protocolo,
        livro: state.livro,
        folha: state.folha,
        situacao: state.situacao,
        usuario_token: state.usuario_token,
        selo: state.selo,
        ato_tipo_token: state.ato_tipo_token,
        apresentante: state.apresentante,
      },
    });

    servicosItems.value = servicosData.value
  } catch (error) {
    console.error("Erro na requisição", error);
  }
}

async function tipoAtosDataPayload() {
  const { data: tipoAtosData, error } = await useFetch(allTiposAtos, {
    method: "POST",
    body: {
      cartorio_token: cartorio_token.value,
      usuario_token: usuario_token.value,
    },
  });
  tipoAtosItems.value = tipoAtosData.value;
}

async function servicosDataTable() {
  const currentDate = getCurrentDate();
  const { data: servicosData, error } = await useFetch(allServicos, {
    method: "POST",
    body: {
      cartorio_token: cartorio_token.value,
    },
  });

  servicosItems.value = servicosData.value;
}
usuariosDataPayload()
tipoAtosDataPayload();
servicosDataTable();

async function deleteEndereco(item) {
  console.log("excluido");
}
</script>
