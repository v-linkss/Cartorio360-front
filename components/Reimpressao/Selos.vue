<template>
  <v-dialog persistent v-model="isVisible" max-width="500">
    <v-card>
      <v-container>
        <v-row class="mt-1 mb-1" style="justify-content: space-between">
          <v-card-title class="text-h5">Reimpressão de Selos</v-card-title>

          <v-icon class="mt-4 mr-4" style="color: red" @click="closeModal"
            >mdi-close</v-icon
          >
        </v-row>
        <hr class="mb-5" />

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
          <img src="../../assets/selo.png" alt="" @click="reimprimeSelosAtos" />
        </div>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
const props = defineProps({
  show: Boolean,
  ato_token: String,
});

const isVisible = ref(props.show);
const config = useRuntimeConfig();
const getSelos = `${config.public.managemant}/listarSelos`;
const reimprimeSelos = `${config.public.managemant}/reimprimirSelo`;

const selosItems = ref([]);
const selectedSelos = ref([]);

const emit = defineEmits(["close"]);

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
  emit("close");
};

const reimprimeSelosAtos = async () => {
  const selosJson = selectedSelos.value.map((selo) => ({ selo_token: selo }));
  const body = {
    ato_token: props.ato_token,
    selos: selosJson,
  };
  const { data, error } = await useFetch(`${reimprimeSelos}`, {
    method: "POST",
    body: body,
  });
};

const fetchSelos = async () => {
  const { data, error } = await useFetch(`${getSelos}`, {
    method: "POST",
    body: { ato_token: props.ato_token },
  });
  if (!error.value) {
    selosItems.value = data.value.selos;
  }
};
</script>
