<template>
  <v-card class="mt-10">
    <v-container>
      <div style="width: 600px; margin-top: 10px">
        <v-autocomplete
          label="Tabelião/escrivão"
          v-model="state.escrevente"
          :items="escreventesItems"
          item-title="nome"
          item-value="token"
          required
          :error-messages="v$.escrevente.$errors.map((e) => e.$message)"
          @blur="v$.escrevente.$touch"
          @input="v$.escrevente.$touch"
        ></v-autocomplete>
      </div>
      <div style="width: 180px; margin-top: 20px">
        <v-text-field
          type="number"
          label="Quantidade"
          v-model="state.quantidade"
        >
        </v-text-field>
      </div>
      <v-row class="mb-3 mt-2">
        <NuxtLink @click="goBack">
          <v-btn class="ml-4" size="large" color="red">Voltar</v-btn>
        </NuxtLink>

        <SaveButton
          class="ml-4"
          size="large"
          color="green"
          :onSave="atoAutentica"
          :disabled="isSaving"
          >Salvar</SaveButton
        >
      </v-row>
    </v-container>
    <ErrorModalCard
      :show="errorModalVisible"
      :errorMessage="errorMessage"
      @close="returnToPreviousPage"
    />
  </v-card>
</template>

<script setup>
import { useVuelidate } from "@vuelidate/core";
import { helpers, required } from "@vuelidate/validators";

const props = defineProps({
  ato_token: {
    type: String,
    required: true,
  },
});

const router = useRouter();
const route = useRoute();
const config = useRuntimeConfig();
const allEscreventes = `${config.public.auth}/service/gerencia/listarEscrevente`;
const { $toast } = useNuxtApp();
const cartorio_token = ref(useCookie("user-data").value.cartorio_token).value;
const ordemserv_token =
  ref(useCookie("user-service").value.token).value ||
  ref(useCookie("user-service").value).value;
const usuario_token = useCookie("auth_token").value;
const autenticaAtos = `${config.public.auth}/service/gerencia/atoAutentica`;
const autenticaEtiquetas = `${config.public.auth}/service/gerencia/etiquetaAutentica`;
const imprimeZplSelo = `${config.public.envioDoc}/print`;
const errorModalVisible = ref(false);
const errorMessage = ref("");
const isSaving = ref(false);
const state = reactive({
  escrevente: null,
  quantidade: 1,
});
const escreventesItems = ref([]);

const { data } = await fetchWithToken(allEscreventes, {
  method: "POST",
  body: { cartorio_token: cartorio_token },
});
escreventesItems.value = data.value[0].func_json_escreventes;

const rules = {
  escrevente: {
    required: helpers.withMessage("O campo é obrigatorio", required),
  },
};

const v$ = useVuelidate(rules, state);

const atoAutentica = async () => {
  if (await v$.value.$validate()) {
    if (isSaving.value) return;
    isSaving.value = true;
    const {
      data: ato_token,
      status,
      error,
    } = await fetchWithToken(autenticaAtos, {
      method: "POST",
      body: {
        usuario_token: usuario_token,
        cartorio_token: cartorio_token,
        quantidade: Number(state.quantidade),
        ordemserv_token: ordemserv_token,
        ato_tipo_token: props.ato_token,
      },
    });
    if (status.value === "success" && ato_token.value.status === "OK") {
      await etiquetaAutentica(ato_token.value.token);
    } else {
      errorModalVisible.value = true;
      errorMessage.value =
        ato_token.value.status_mensagem || error.value.data.details;
    }
  }
};

const etiquetaAutentica = async (ato_token) => {
  const { data, status, error } = await fetchWithToken(autenticaEtiquetas, {
    method: "POST",
    body: {
      escrevente_token: state.escrevente,
      cartorio_token: cartorio_token,
      ato_token: ato_token,
    },
  });
  if (status.value === "success") {
    $toast.success("Ato autenticado com sucesso!");
    if (data.value.tipo_etiqueta === "html") {
      const newWindow = window.open("", "_blank");
      newWindow.document.open();
      newWindow.document.write(data.value.etiqueta);
      newWindow.document.close();
    } else if (data.value.tipo_etiqueta === "zpl") {
      const { status: zplStatus, error } = await useFetch(`${imprimeZplSelo}`, {
        method: "POST",
        body: {
          zpl: atob(data.value.etiqueta),
        },
        timeout: 30000, // Set timeout to 30 seconds
      });
      if (zplStatus.value !== "success") {
        errorModalVisible.value = true;

        const apiErrorMessage = error.value?.data?.message;

        if (apiErrorMessage) {
          errorMessage.value = apiErrorMessage;
        } else {
          errorMessage.value =
            "O sistema demorou demais para responder e a impressão não foi feita.";
        }

        return;
      }
    }
    goBack();
  }
};

const returnToPreviousPage = () => {
  errorModalVisible.value = false;
  goBack();
};

const goBack = () => {
  const origem = route.query.origem || "criar";
  const id = route.query.id;
  if (origem === "atualizar") {
    router.push(`/os/atualizar/${id}`);
  } else {
    router.push("/os/criar-registro");
  }
};
</script>

<style scoped>
.btn-pointer {
  width: 50px;
  height: 50px;
  margin-left: 25px;
  margin-top: 20px;
  cursor: pointer;
}
</style>
