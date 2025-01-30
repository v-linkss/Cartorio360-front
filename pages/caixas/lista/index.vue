<template>
  <v-container class="mt-5">
    <v-row class="mb-5">
      <h1>Caixas</h1>
    </v-row>
    <v-row>
      <v-col cols="2">
        <v-text-field v-model="state.data" type="date" label="Data"></v-text-field>
      </v-col>
      <v-col md="3">
        <v-autocomplete v-model="state.situacao" :items="situacaoItems" label="Situação"></v-autocomplete>
      </v-col>
      <v-col md="2">
        <v-autocomplete
          :items="usuariosItems"
          v-model="state.usuario_token"
          item-title="user_nome"
          item-value="user_token"
          label="Usuário"
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
            @click="item.btn_receber ? redirectToCiaxasRecebimento(item) : null"
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
              src="../../../assets/salvar.png"
              alt="Salvar"
            />
          </div>
          <div
            :class="{ disabled: !item.btn_cancelar }"
            @click="item.btn_cancelar ? redirectToCancelamento(item.numero, item.token) : null"
            title="Cancelamento"
          >
            <img style="width: 30px; height: 30px" src="../../../assets/visualizar.png" alt="Visualizar" />
          </div>
        </v-row>
      </template>
    </v-data-table>
  </v-container>
</template>

<script setup>
import { ref, reactive, onMounted, nextTick } from "vue";
import { useRuntimeConfig, useCookie, useFetch, navigateTo, useRouter } from "#imports";

const config = useRuntimeConfig();
const { $toast } = useNuxtApp();

const allUsuarios = `${config.public.managemant}/listarUsuarios`;
const getCaixas = `${config.public.managemant}/listarCaixas`;

const router = useRouter();

const usuario_token = ref(useCookie("auth_token").value) || null;
const cartorio_token = ref(useCookie("user-data").value.cartorio_token) || null;

const usuariosItems = ref([]);
const caixaItems = ref([]);
const situacaoItems = ref(["PENDENTE", "ENCERRADO", "CANCELADO"]);
const numero_os = ref(null);
const servicosItems = ref([]);

const state = reactive({
  data: null || getCurrentDate(),
  situacao: null,
  usuario_token: null,
});

const headers = [
  { title: "Data", value: "data" },
  { title: "Situação", value: "situacao" },
  { title: "Usuário", value: "usuario_nome" },
  { title: "Ações", value: "actions", sortable: false },
];

function getCurrentDate() {
  const today = new Date();
  const yyyy = today.getFullYear();
  const MM = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");
  return `${yyyy}-${MM}-${dd}`;
}

async function usuariosDataPayload() {
  try {
    const { data: usuarioData } = await useFetch(allUsuarios, {
      method: "POST",
      body: {
        cartorio_token: cartorio_token.value,
      },
    });
    usuariosItems.value = usuarioData.value;
  } catch (error) {
    $toast.error("Erro ao buscar usuários.");
    console.error(error);
  }
}

async function searchCaixas() {
  try {
    sessionStorage.setItem("pesquisaCaixas", JSON.stringify(state));

    const { data: caixasData } = await useFetch(getCaixas, {
      method: "POST",
      body: {
        cartorio_token: cartorio_token.value,
        user_token: state.usuario_token,
        data: state.data || null,
        situacao: state.situacao,
      },
    });

    if (caixasData.value.length > 0) {
      caixaItems.value = caixasData.value;
    } else {
      caixaItems.value = [];
      $toast.error("Não existe caixa registrada!");
    }
  } catch (error) {
    $toast.error("Erro ao buscar caixas.");
    console.error(error);
  }
}

function redirectToCancelamento(numero, token) {
  numero_os.value = numero;
}

function redirectToUpdate(id) {
  const serviceCookie = useCookie("user-service");
  const servico = servicosItems.value.find((item) => item.id === id);
  serviceCookie.value = JSON.stringify({
    id: servico.id,
    token: servico.token,
  });

  router.push({ path: `/os/atualizar/${id}` });
}

function redirectToCiaxasRecebimento(item) {
  const serviceCookie = useCookie("caixa-service");
  serviceCookie.value = JSON.stringify({
    caixa_token: item.token,
    usuario_nome: item.usuario_nome,
    data: item.data,
  });
  navigateTo("/caixas/caixasRecebimentoOs");
}

onMounted(() => {
  nextTick(async () => {
    const pesquisaSalva = sessionStorage.getItem("pesquisaCaixas");

    if (pesquisaSalva) {
      const dadosRestaurados = JSON.parse(pesquisaSalva);
      Object.assign(state, dadosRestaurados);
    }

    await usuariosDataPayload();
  });
});
</script>
