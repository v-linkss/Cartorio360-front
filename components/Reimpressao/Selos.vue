<template>
  <v-dialog persistent v-model="isVisible" max-width="500">
    <v-card>
      <v-container>
        <v-row class="mt-1 mb-3" style="justify-content: space-between">
          <h1 class="ml-4">Reimpressão de Selos</h1>

          <v-icon class="mt-4 mr-4" style="color: red" @click="closeModal"
            >mdi-close</v-icon
          >
        </v-row>
        <hr class="mb-5" />
        <v-autocomplete
          class="mb-5"
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
        <v-data-table
          :headers="headers"
          :items="selosItems"
          item-value="token"
          show-select
          v-model="selectedSelos"
        >
        </v-data-table>
      </v-container>
      <v-card-actions>
        <div>
          <img
            src="../../assets/selo.png"
            style="cursor: pointer"
            @click="reimprimeSelosAtos"
          />
        </div>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { useVuelidate } from "@vuelidate/core";
import { helpers, required } from "@vuelidate/validators";

const props = defineProps({
  show: Boolean,
  ato_token: String,
});

const isVisible = ref(props.show);
const config = useRuntimeConfig();
const { $toast } = useNuxtApp();
const cartorio_token = ref(useCookie("user-data").value.cartorio_token).value;
const getSelos = `${config.public.managemant}/listarSelos`;
const reimprimeSelos = `${config.public.managemant}/reimprimirSelo`;
const allEscreventes = `${config.public.managemant}/listarEscrevente`;
const imprimeZplSelo = `${config.public.envioDoc}/print`;

const selosItems = ref([]);
const selectedSelos = ref([]);
const escreventesItems = ref([]);

const state = reactive({
  escrevente: null,
});

const emit = defineEmits(["close"]);

const rules = {
  escrevente: {
    required: helpers.withMessage("O campo é obrigatorio", required),
  },
};

const v$ = useVuelidate(rules, state);

const headers = [
  { title: "Numero", value: "numero" },
  { title: "Referencia", value: "referencia" },
  {
    value: "actions",
  },
];

watch(
  () => props.show,
  (newVal) => {
    isVisible.value = newVal;
    if (newVal) {
      fetchSelos();
    }
  }
);
const closeModal = () => {
  isVisible.value = false;
  state.escrevente = null;
  selectedSelos.value = null;
  emit("close");
};

const { data } = await useFetch(allEscreventes, {
  method: "POST",
  body: { cartorio_token: cartorio_token },
});

escreventesItems.value = data.value[0].func_json_escreventes;

const reimprimeSelosAtos = async () => {
  if (await v$.value.$validate()) {
    const selosJson = selectedSelos.value.map((selo) => ({ selo_token: selo }));
    const body = {
      escrevente_token: state.escrevente,
      ato_token: props.ato_token,
      selos: selosJson,
    };
    const { data, error, status } = await useFetch(`${reimprimeSelos}`, {
      method: "POST",
      body: body,
    });
    if (status.value === "success") {
      if (data.value[0].tipo_etiqueta === "html") {
        const newWindow = window.open("", "_blank");
        newWindow.document.open();
        newWindow.document.write(data.value[0].etiqueta);
        newWindow.document.close();
      } else if (data.value[0].tipo_etiqueta === "zpl") {
        const { status: zplStatus } = await useFetch(`${imprimeZplSelo}`, {
          method: "POST",
          body: {
            zpl: "^XA\n^CF0,40\n^FO50,30^FDCartório 360^FS\n^CF0,30\n^FO50,80^FDDocumento: 123456^FS\n^FO50,120^FDData: 21/06/2025^FS\n^FO50,160^FDAssinatura:___________________^FS\n^FO50,210^GB700,3,3^FS\n^CF0,25\n^FO50,230^FDEste documento foi autenticado eletronicamente.^FS\n^XZ",
          },
        });
        if (zplStatus.value !== "success") {
          $toast.error("Não foi possivel fazer a impressao da etiqueta");
          return;
        }
      }
      closeModal();
    }
  }
};

const fetchSelos = async () => {
  const { data, error } = await useFetch(`${getSelos}`, {
    method: "POST",
    body: { ato_token: props.ato_token },
  });
  if (data.value.selos === null) {
    selosItems.value = [];
  } else {
    selosItems.value = data.value.selos;
  }
};
</script>
