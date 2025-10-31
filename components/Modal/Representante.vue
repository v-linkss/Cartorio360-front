<template>
  <v-dialog persistent v-model="isVisible" max-width="800">
    <v-card>
      <v-container>
        <v-row class="mt-1 mb-3" style="justify-content: space-between">
          <h2 class="ml-4">
            Representante para: {{ props.representante_nome }}
          </h2>
        </v-row>
        <hr class="mb-5" />
        <div style="display: flex; align-items: center; gap: 10px">
          <v-autocomplete
            label="Selecione o Representante"
            v-model="state.representante_id"
            :items="props.representantes"
            item-title="nome"
            item-value="id"
            return-object
          ></v-autocomplete>
          <img
            src="../../assets/novo.png"
            style="width: 40px; cursor: pointer"
            title="Adicionar Representante"
            @click="addRepresentante"
          />
        </div>
        <v-data-table :headers="headers" :items="tableData">
          <template v-slot:item.actions="{ item }">
            <div
              class="mr-1"
              style="display: flex; cursor: pointer; justify-content: flex-end"
              @click="deletePessoa(item)"
              title="Deletar Pessoa"
            >
              <img
                src="../../assets/mudarStatus.png"
                alt="Excluir"
                class="trash-icon"
                style="width: 30px; height: 30px"
                title="Excluir"
              />
            </div>
          </template>
        </v-data-table>
      </v-container>
      <v-card-actions>
        <v-btn style="background-color: red; color: white" @click="closeModal"
          >Voltar</v-btn
        >
        <v-btn @click="limparRepresentante" border>Limpar</v-btn>
        <v-btn
          style="background-color: green; color: white"
          @click="updateAtoPessoa"
          >Salvar</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
const props = defineProps({
  show: Boolean,
  representantes: Array,
  ato_id: Number,
  representante_nome: String,
});
const isVisible = ref(props.show);

const config = useRuntimeConfig();
const isClear = ref(false);
const { $toast } = useNuxtApp();
const pessoasUpdate = `${config.public.managemant}/atos_pessoas_repres`;

const headers = [
  {
    title: "Representante",
    key: "nome",
    align: "start",
  },

  { value: "actions" },
];

const state = reactive({
  representante_id: null,
});
const tableData = ref([]);
const emit = defineEmits(["close", "update-representante"]);

watch(
  () => props.show,
  async (newVal) => {
    isVisible.value = newVal;
  }
);
const closeModal = () => {
  state.representante_id = null;
  isVisible.value = false;
  emit("close");
};

const addRepresentante = () => {
  if (state.representante_id) {
    const exists = tableData.value.some(
      (item) => item.id === state.representante_id.id
    );
    if (!exists) {
      tableData.value.push({
        id: state.representante_id.id,
        nome: state.representante_id.nome,
      });
    } else {
      $toast.error("Este representante já foi adicionado!");
    }
    state.representante_id = null;
  }
};

const deletePessoa = (item) => {
  const index = tableData.value.findIndex((rep) => rep.id === item.id);
  if (index !== -1) {
    tableData.value.splice(index, 1);
  }
};

const updateAtoPessoa = async (clear) => {
  const representanteId = state.representante_id?.id ?? null;
  const { data, error, status } = await useFetch(`${pessoasUpdate}`, {
    method: "POST",
    body: {
      ato_pessoa_id: props.ato_id,
      representante_id: representanteId,
      user_id: useCookie("user-data").value.usuario_id,
    },
  });
  if (status.value === "success") {
    if (clear === true) {
      $toast.success("Representante removido com Sucesso!");
      emit("update-representante", "");
      closeModal();
    } else {
      $toast.success("Representante adicionado com Sucesso!");
      emit("update-representante", state.representante_id.nome);
      closeModal();
    }
  }
};

const limparRepresentante = () => {
  state.representante_id = null;
  isClear.value = true;
  updateAtoPessoa(isClear.value);
};
</script>
