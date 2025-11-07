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
              @click="updateRepresentante(item)"
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
  ato_pessoa_token: String,
});
const isVisible = ref(props.show);

const config = useRuntimeConfig();
const isClear = ref(false);
const { $toast } = useNuxtApp();
const pessoasCreate = `${config.public.managemant}/atos_pessoas_repres`;
const pessoasDelete = `${config.public.managemant}/delete/atos_pessoas_repres`;
const listaRepresentanes = `${config.public.managemant}/lista_representantes`;

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

    if (props.show) {
      listaRepresentantes();
    }
  }
);
const closeModal = () => {
  state.representante_id = null;
  tableData.value = [];
  isVisible.value = false;
  emit("close");
};

const addRepresentante = async () => {
  if (state.representante_id) {
    const exists = tableData.value.some(
      (item) => item.id === state.representante_id.id
    );
    if (!exists) {
      const { data, error, status } = await useFetch(`${pessoasCreate}`, {
        method: "POST",
        body: {
          ato_pessoa_id: props.ato_id,
          representante_id: state.representante_id.id,
          user_id: useCookie("user-data").value.usuario_id,
        },
      });

      if (status.value === "success") {
        tableData.value.push({
          id: state.representante_id.id,
          nome: state.representante_id.nome,
        });
        emit("update-representante", state.representante_id.nome);
        $toast.success("Representante adicionado com Sucesso!");
      }
    } else {
      $toast.error("Este representante já foi adicionado!");
    }
    state.representante_id = null;
  }
};

const updateRepresentante = async (item) => {
  item.excluido = !item.excluido;
  const { status } = await useFetch(`${pessoasDelete}/${item.id}`, {
    method: "PUT",
    body: {
      excluido: item.excluido,
    },
  });
  if (status.value === "success") {
    $toast.success("Representante deletado com Sucesso!");
  }
};

async function listaRepresentantes() {
  const { data, error, status } = await useFetch(`${listaRepresentanes}`, {
    method: "POST",
    body: {
      ato_pessoa_token: props.ato_pessoa_token,
    },
  });
  if (status.value === "success") {
    tableData.value = data.value.map((item) => ({
      ...item,
      nome: item.descricao,
    }));
  }
}
</script>
