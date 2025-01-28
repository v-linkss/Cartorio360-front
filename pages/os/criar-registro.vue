<template>
  <v-container class="mt-5">
    <v-row class="mb-5">
      <h1>Ordem de Serviço nº</h1>
      <h1 style="color: red; margin-left: 30px">
        {{ ordemNumero || useCookie("user-service").value?.numero }}
      </h1>
    </v-row>

    <v-row>
      <v-col md="3">
        <v-autocomplete
          label="Nacionalidade"
          :items="nacionalidade"
          v-model="state.nacionalidade"
          :disabled="isDisabledCookie || isDisabled"
        ></v-autocomplete>
      </v-col>
      <v-col md="2">
        <v-text-field
          v-if="state.nacionalidade === false"
          autofocus
          v-model="state.apresentante_cpf"
          label="CPF"
          v-mask="'###.###.###-##'"
          required
          :error-messages="v$.apresentante_cpf.$errors.map((e) => e.$message)"
          @blur="v$.apresentante_cpf.$touch"
          @input="validarCpf(state.apresentante_cpf)"
          :disabled="isDisabledCookie || isDisabled"
        ></v-text-field>
        <v-text-field
          v-else
          autofocus
          v-model="state.apresentante_cpf"
          label="Documento"
          required
          :error-messages="v$.apresentante_cpf.$errors.map((e) => e.$message)"
          @blur="v$.apresentante_cpf.$touch"
          :disabled="isDisabledCookie || isDisabled"
        ></v-text-field>
      </v-col>
      <v-col md="4">
        <v-text-field
          v-model="state.apresentante_nome"
          label="Nome Apresentante"
          required
          :error-messages="v$.apresentante_nome.$errors.map((e) => e.$message)"
          @input="v$.apresentante_nome.$touch"
          :disabled="isDisabledCookie || isDisabled"
        ></v-text-field>
      </v-col>
      <v-col v-if="showCreateOrdemServ">
        <div>
          <img
            style="width: 40px; height: 40px; cursor: pointer"
            src="../../assets/salvar.png"
            alt="Salvar"
            @click="onSubmit()"
          />
        </div>
      </v-col>
    </v-row>
    <v-row
      v-if="showCreateAtos"
      style="display: flex; margin-bottom: 10px; gap: 2rem"
    >
      <h1 class="ml-5">Atos</h1>
      <NuxtLink :to="{ path: '/os/criar-ato', query: { origem: 'criar' } }">
        <img
          style="width: 45px; height: 45px; cursor: pointer"
          src="../../assets/novo.png"
          alt="novo"
        />
      </NuxtLink>
      <v-data-table :headers="headers" :items="atosItems" item-key="id">
        <template v-slot:item.actions="{ item }">
          <v-row style="display: flex; gap: 10px; margin-top: -5px">
            <div @click="redirectToModalReimprimir()" title="Reimprimir">
              <img
                style="width: 30px; height: 30px; cursor: pointer"
                src="../../assets/selo.png"
                alt="Reimprimir"
              />
            </div>
            <div
              :class="{ disabled: !item.btn_editar }"
              @click="
                item.btn_editar
                  ? redirectToUpdateAto({
                      id: item.id,
                      tipo: item.tipo,
                      token: item.token,
                    })
                  : null
              "
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

      <ReimpressaoSelos
        :show="isModalReimprimirOpen"
        @close="isModalReimprimirOpen = false"
      />
    </v-row>
    <NuxtLink to="/os/lista">
      <v-btn size="large" color="red" @click="limparDados">Voltar</v-btn>
    </NuxtLink>
  </v-container>
</template>

<script setup>
import { helpers, required } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";

const { $toast } = useNuxtApp();
const router = useRouter();
const config = useRuntimeConfig();
const createOs = `${config.public.managemant}/createOrdensServico`;
const routeValidaCpf = `${config.public.managemant}/validarCpf`;
const atosPayload = `${config.public.managemant}/listarAtos`;

const cartorio_id = ref(useCookie("user-data").value.cartorio_id);
const pessoa_id = ref(useCookie("user-data").value.usuario_id);
const ordemserv_token =
  ref(useCookie("user-service").value?.token).value || null;
const cartorio_token = ref(useCookie("user-data").value.cartorio_token).value;
const ordemNumero = ref(useCookie("user-service").value?.numero);
const isDisabledCookie = ref(useCookie("user-service").value?.isDisabled);

let showCreateAtos = ref(!!useCookie("user-service").value?.numero);
let showCreateOrdemServ = ref(useCookie("ordem-button").value);

let isValidatingCpf = false;
const isModalReimprimirOpen = ref(false);
const atosItems = ref([]);

const state = reactive({
  nacionalidade: useCookie("user-service").value?.estrangeiro || false,
  apresentante_nome: null || useCookie("user-service").value?.apresentante_nome,
  apresentante_cpf: null || useCookie("user-service").value?.apresentante_cpf,
});

const isDisabled = ref(false);

const headers = [
{ title: "ID", value: "id" },
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
  { title: "BRASILEIRO", value: false },
  { title: "ESTRANGEIRO", value: true },
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

const redirectToUpdateAto = (item) => {
  if (item.tipo === "PROCURAÇÃO GERAL") {
    router.push({
      path: `/fontes/atos/atos-sem-bem/atualizar/${item.id}`,
      query: {
        origem: "atualizar",
        id: useCookie("user-service").value.id,
        ato_id: item.id,
        ato_token_edit: item.token,
        numero_os: numeroOs,
      },
    });
  }else{
    router.push({
      path: `/fontes/atos/atos-com-bem/atualizar/${item.id}`,
      query: {
        origem: "atualizar",
        id: id,
        ato_id: item.id,
        ato_token_edit: item.token,
        numero_os: numeroOs.value,
      },
    });
  }
};

function limparDados() {
  const serviceCookie = useCookie("user-service");
  const isTrueOrdemServ = useCookie("ordem-button");
  serviceCookie.value = null;
  isTrueOrdemServ.value = null;
}

const redirectToModalReimprimir = () => {
  isModalReimprimirOpen.value = true;
};

async function onSubmit() {
  const payloadFormated = {
    apresentante_cpf: removeFormatting(state.apresentante_cpf),
    apresentante_nome: state.apresentante_nome,
    user_id: pessoa_id.value,
    cartorio_id: cartorio_id.value,
    estrangeiro: state.nacionalidade,
  };
  if (await v$.value.$validate()) {
    const { data, error, status } = await useFetch(createOs, {
      method: "POST",
      body: payloadFormated,
    });
    if (status.value === "error" && error.value.statusCode === 500) {
      $toast.error("Erro ao cadastrar ordem,erro no sistema.");
    } else {
      $toast.success("Ordem registrada com sucesso!");

      showCreateAtos.value = true;
      showCreateOrdemServ.value = false;
      ordemNumero.value = data.value.numero;

      const isTrueOrdemServ = useCookie("ordem-button");
      isTrueOrdemServ.value = showCreateOrdemServ.value;

      const serviceCookie = useCookie("user-service");
      serviceCookie.value = serviceCookie.value = JSON.stringify({
        numero: data.value.numero,
        id: data.value.id,
        apresentante_cpf: data.value.apresentante_cpf,
        apresentante_nome: data.value.apresentante_nome,
        estrangeiro: data.value.estrangeiro,
        token: data.value.token,
        isDisabled: true,
      });
      isDisabled.value = true;
    }
  }
}

async function validarCpf(cpf) {
  const cpfFormated = removeFormatting(cpf);

  if (cpfFormated.length === 11 && !isValidatingCpf) {
    isValidatingCpf = true;

    const payloadFormated = {
      cpf: cpfFormated,
    };

    try {
      const { data, error, status } = await useFetch(routeValidaCpf, {
        method: "POST",
        body: payloadFormated,
      });

      if (status.value === "error" && error.value.statusCode === 500) {
        $toast.error("Erro ao cadastrar pessoa, o CPF já está cadastrado.");
      } else if (data.value.cpfValidation === true) {
        state.apresentante_nome = data.value.nome;
        $toast.success("Cpf autenticado com sucesso!");
      } else if (data.value.cpfValidation === false) {
        $toast.error("Cpf não cadastrado!");
      }
    } catch (error) {
      console.error("Erro ao validar CPF:", error);
    } finally {
      isValidatingCpf = false;
    }
  }
}

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
