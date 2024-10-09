<template>
  <v-container class="mt-5">
    <v-row class="mb-5">
      <h1>Ordem de Serviço nº</h1>
      <h1 style="color: red; margin-left: 30px">
        {{ numeroOs }}
      </h1>
    </v-row>

    <v-row>
      <v-col md="3">
        <v-autocomplete
          label="Nacionalidade"
          :items="nacionalidade"
          v-model="state.nacionalidade"
        ></v-autocomplete>
      </v-col>
      <v-col md="2">
        <v-text-field
          v-if="state.nacionalidade === 'brasileiro'"
          autofocus
          v-model="state.apresentante_cpf"
          label="CPF"
          v-mask="'###.###.###-##'"
          required
          :error-messages="v$.apresentante_cpf.$errors.map((e) => e.$message)"
          @blur="v$.apresentante_cpf.$touch"
          @input="v$.apresentante_cpf.$touch"
        ></v-text-field>
        <v-text-field
          v-else
          autofocus
          v-model="state.apresentante_cpf"
          label="Documento"
          required
          :error-messages="v$.apresentante_cpf.$errors.map((e) => e.$message)"
          @blur="v$.apresentante_cpf.$touch"
        ></v-text-field>
      </v-col>
      <v-col md="4">
        <v-text-field
          v-model="state.apresentante_nome"
          label="Nome Apresentante"
          required
          :error-messages="v$.apresentante_nome.$errors.map((e) => e.$message)"
          @input="v$.apresentante_nome.$touch"
        ></v-text-field>
      </v-col>
      <v-col>
        <div>
          <img
            style="width: 40px; height: 40px; cursor: pointer"
            src="../../../assets/salvar.png"
            alt="Salvar"
            @click="onUpdate()"
          />
        </div>
      </v-col>
    </v-row>
    <v-row style="display: flex; margin-bottom: 10px; gap: 2rem">
      <h1 class="ml-5">Atos</h1>
      <NuxtLink
        :to="{
          path: '/ordens-servicos/criar-ato',
          query: { origem: 'atualizar', id: id },
        }"
      >
        <img
          style="width: 45px; height: 45px; cursor: pointer"
          src="../../../assets/novo.png"
          alt="novo"
        />
      </NuxtLink>
      <v-data-table :headers="headers" :items="atosItems" item-key="id">
        <template v-slot:item.actions="{ item }">
          <v-row style="display: flex; gap: 10px; margin-top: -5px">
            <div @click="redirectToModalReimprimir(item.token)" title="Reimprimir">
              <img
                style="width: 30px; height: 30px; cursor: pointer"
                src="../../../assets/selo.png"
                alt="Reimprimir"
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
                src="../../../assets/editar.png"
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
                src="../../../assets/excluido.png"
                alt="Visualizar"
                title="Reativar"
              />
              <img
                v-else
                src="../../../assets/mudarStatus.png"
                alt="Excluir"
                class="trash-icon"
                style="width: 30px; height: 30px; cursor: pointer"
                title="Excluir"
              />
            </div>
          </v-row>
        </template>
      </v-data-table>
      <ReimpressaoSelos
        :show="isModalReimprimirOpen"
        :ato_token="ato_token"
        @close="isModalReimprimirOpen = false"
      />
    </v-row>
    <NuxtLink to="/ordens-servicos">
      <img class="btn-pointer mt-5" src="../../../assets/sair.png" alt="Sair" />
    </NuxtLink>
  </v-container>
</template>

<script setup>
import { helpers, required } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";

const { $toast } = useNuxtApp();

const route = useRoute();
const { id } = route.params;
const router = useRouter();

const config = useRuntimeConfig();
const updateOs = `${config.public.managemant}/updateOrdensServico`;
const getOsPayload = `${config.public.managemant}/getOrdensServicoById`;
const atosPayload = `${config.public.managemant}/listarAtos`;

const cartorio_id = ref(useCookie("user-data").value.cartorio_id);
const pessoa_id = ref(useCookie("user-data").value.usuario_id);
const ordemserv_token = ref(useCookie("user-service").value).value || null;
const cartorio_token = ref(useCookie("user-data").value.cartorio_token).value;

const atosItems = ref([]);
const isModalReimprimirOpen = ref(false);
const ato_token = ref(null);
const numeroOs = ref(null);

const state = reactive({
  nacionalidade: "brasileiro",
  apresentante_nome: null,
  apresentante_cpf: null,
  documento: null,
});

const headers = [
  { title: "Protocolo", value: "protocolo" },
  { title: "Usuario", value: "usuario_nome" },
  { title: "Situação", value: "situacao" },
  { title: "Valor", value: "valor" },
  { title: "Tipo", value: "tipo" },
  {
    value: "actions",
  },
];

const nacionalidade = [
  { title: "BRASILEIRO", value: "brasileiro" },
  { title: "ESTRANGEIRO", value: "estrangeiro" },
];

const rules = {
  apresentante_nome: {
    required: helpers.withMessage("O campo é obrigatorio", required),
  },
  apresentante_cpf: {
    required: helpers.withMessage("O campo é obrigatorio", required),
  },
};

const v$ = useVuelidate(rules, state);

function removeFormatting(value) {
  if (value) {
    return value.replace(/[.\-]/g, "");
  } else {
    value = null;
  }
}

const redirectToModalReimprimir = (token) => {
  ato_token.value = token;
  isModalReimprimirOpen.value = true;
};

async function onUpdate() {
  const payloadFormated = {
    apresentante_cpf: removeFormatting(state.apresentante_cpf),
    apresentante_nome: state.apresentante_nome,
    user_id: pessoa_id.value,
    cartorio_id: cartorio_id.value,
  };

  const { error, status } = await useFetch(`${updateOs}/${id}`, {
    method: "PUT",
    body: payloadFormated,
  });
  if (status.value === "error" && error.value.statusCode === 500) {
    $toast.error("Erro ao cadastrar ordem,erro no sistema.");
  } else {
    $toast.success("Ordem Atualizada com sucesso!");
    router.push({ path: `/ordens-servicos` });
  }
}

const { data: dataOs } = await useFetch(`${getOsPayload}/${id}`, {
  method: "GET",
});
numeroOs.value = dataOs.value.numero;
state.apresentante_cpf = dataOs.value.apresentante_cpf;
state.apresentante_nome = dataOs.value.apresentante_nome;

const { data } = await useFetch(atosPayload, {
  method: "POST",
  body: {
    cartorio_token: cartorio_token,
    ordemserv_token: ordemserv_token,
  },
});

if (data.value.length > 0) {
  atosItems.value = data.value;
} else {
  atosItems.value = [];
}
</script>
