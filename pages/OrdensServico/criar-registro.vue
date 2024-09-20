<template>
  <v-container class="mt-5">
    <v-row class="mb-5" 
    >
      <h1>Ordens de Serviço</h1>
      <h1 style="color: red; margin-left: 30px">
        {{ useCookie("user-service").value.numero }}
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
          autofocus
          v-model="state.apresentante_cpf"
          label="CPF"
          v-mask="'###.###.###-##'"
          required
          :error-messages="v$.apresentante_cpf.$errors.map((e) => e.$message)"
          @blur="v$.apresentante_cpf.$touch"
          @input="validarCpf(state.apresentante_cpf)"
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
            src="../../assets/salvar.png"
            alt="Salvar"
            @click="onSubmit()"
          />
        </div>
      </v-col>
    </v-row>
    <v-row style="display: flex; margin-bottom: 10px; gap: 2rem">
      <h1 class="ml-5">Atos</h1>
      <NuxtLink to="/OrdensServico/criar-ato">
        <img
          style="width: 45px; height: 45px; cursor: pointer"
          src="../../assets/novo.png"
          alt="novo"
        />
      </NuxtLink>
    </v-row>
    <NuxtLink to="/OrdensServico">
      <img class="btn-pointer mt-5" src="../../assets/sair.png" alt="Sair" />
    </NuxtLink>
  </v-container>
</template>

<script setup>
import { helpers, required } from "@vuelidate/validators";
import { cpf } from "~/composables/validaCpf";
import { useVuelidate } from "@vuelidate/core";

const { $toast } = useNuxtApp();
const route = useRoute();
const { id } = route.params;

const config = useRuntimeConfig();
const createOs = `${config.public.managemant}/createOrdensServico`;
const routeValidaCpf = `${config.public.managemant}/validarCpf`;

const cartorio_id = ref(useCookie("user-data").value.cartorio_id);
const pessoa_id = ref(useCookie("user-data").value.usuario_id);
let isValidatingCpf = false;

const state = reactive({
  nacionalidade: "brasileiro",
  apresentante_nome: null,
  apresentante_cpf: null,
});

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
    cpf,
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

async function onSubmit() {
  if (await v$.value.$validate()) {
    const payloadFormated = {
      apresentante_cpf: removeFormatting(state.apresentante_cpf),
      apresentante_nome: state.apresentante_nome,
      user_id: pessoa_id.value,
      cartorio_id: cartorio_id.value,
    };
    const { data, error, status } = await useFetch(createOs, {
      method: "POST",
      body: payloadFormated,
    });
    if (status.value === "error" && error.value.statusCode === 500) {
      $toast.error("Erro ao cadastrar ordem,erro no sistema.");
    } else {
      $toast.success("Ordem registrada com sucesso!");
      const serviceCookie = useCookie("user-service");
      serviceCookie.value = serviceCookie.value = JSON.stringify({
        numero: data.value.numero,
        token: data.value.token,
      });
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
</script>
