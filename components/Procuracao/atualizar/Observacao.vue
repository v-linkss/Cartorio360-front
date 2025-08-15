<template>
  <v-container>
    <v-row v-if="!isVisualizar" class="mt-5">
      <v-btn
        v-if="!isVisualizar"
        class="mb-4 ml-8"
        @click="openModalCreateObservacao"
        size="large"
        color="green"
        >Novo</v-btn
      >
    </v-row>

    <v-row>
      <v-col>
        <v-data-table
          style="height: 465px"
          :headers="headers"
          :items="observacoesItems"
        >
          <template v-slot:item.observacao="{ item }">
            {{
              item.observacao.length > 100
                ? item.observacao.slice(0, 100) + "..."
                : item.observacao
            }}
          </template>
          <template v-slot:item.actions="{ item }">
            <v-row>
              <div @click="openModalVisualizar(item)">
                <img
                  style="width: 30px; height: 30px; cursor: pointer"
                  src="../../../assets/visualizar.png"
                  alt="Visualizar"
                />
              </div>
              <div
                style="
                  display: flex;
                  cursor: pointer;
                  justify-content: flex-end;
                  margin-left: 5px;
                "
                @click="deleteObservacao(item)"
                title="Deletar Observação"
              >
                <img
                  v-if="item.excluido"
                  style="width: 30px; height: 30px"
                  src="../../../assets/excluido.png"
                  alt="Visualizar"
                  title="Reativar"
                />
                <img
                  v-else
                  src="../../../assets/mudarStatus.png"
                  alt="Excluir"
                  class="trash-icon"
                  style="width: 30px; height: 30px"
                  title="Excluir"
                />
              </div>
            </v-row>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
    <ModalObservacao
      v-if="isModalObservacaoOpen"
      :show="isModalObservacaoOpen"
      :observacao="modalObservacaoText"
      :visualizar="isVisualizarModal"
      @close="isModalObservacaoOpen = false"
    />
    <v-row>
      <NuxtLink @click="goBack">
        <v-btn size="large" color="red">Voltar</v-btn>
      </NuxtLink>
    </v-row>
  </v-container>
</template>

<script setup>
import { useVuelidate } from "@vuelidate/core";
import { helpers, required } from "@vuelidate/validators";
import { ref, reactive } from "vue";
const props = defineProps({
  ato_id: {
    type: Number,
    required: true,
  },
});

const router = useRouter();
const route = useRoute();
const config = useRuntimeConfig();
const { $toast } = useNuxtApp();
const allEscreventes = `${config.public.managemant}/listarEscrevente`;
const observacaoUpdate = `${config.public.managemant}/atos_observacao`;
const getAtosObservacao = `${config.public.managemant}/atos_observacao`;
const cartorio_token = ref(useCookie("user-data").value.cartorio_token);
const isVisualizar = ref(route.query.origem === "vizualizar");
const isModalObservacaoOpen = ref(false);
const isVisualizarModal = ref(false);
const modalObservacaoText = ref("");
const observacoesItems = ref([]);
const escreventesItems = ref([]);
function openModalVisualizar(item) {
  modalObservacaoText.value = item.observacao;
  isVisualizarModal.value = true;
  isModalObservacaoOpen.value = true;
}

const openModalCreateObservacao = () => {
  isVisualizarModal.value = false;
  isModalObservacaoOpen.value = true;
  modalObservacaoText.value = "";
};
const headers = [
  { title: "Data", align: "start", key: "created" },
  { title: "Escrevente", align: "start", key: "users.nome" },
  { title: "Observação", align: "start", key: "observacao" },
  { value: "actions" },
];

const state = reactive({
  observacao: "",
});

const rules = {
  observacao: {
    required: helpers.withMessage("O campo é obrigatório", required),
  },
};

const v$ = useVuelidate(rules, state);

// Carrega as observações ao carregar o componente
const { data: dadosObservacao } = await useFetch(
  `${getAtosObservacao}/${route.query.ato_id}`,
  {
    method: "GET",
  }
);
if (Array.isArray(dadosObservacao.value)) {
  observacoesItems.value = dadosObservacao.value.map((item) => ({
    ...item,
    created: formatDate(item.created, "dd/mm/yyyy hh:mm"),
  }));
} else if (dadosObservacao.value && typeof dadosObservacao.value === "object") {
  observacoesItems.value = [
    {
      ...dadosObservacao.value,
      created: formatDate(dadosObservacao.value.created, "dd/mm/yyyy hh:mm"),
    },
  ];
}

async function deleteObservacao(item) {
  item.excluido = !item.excluido;
  try {
    await useFetch(`${observacaoUpdate}/${item.id}`, {
      method: "PUT",
      body: JSON.stringify({ excluido: item.excluido }),
    });
  } catch (error) {
    console.error("Erro ao excluir observação:", error);
  }
}

const { data } = await useFetch(allEscreventes, {
  method: "POST",
  body: { cartorio_token: cartorio_token },
});
escreventesItems.value = data.value[0].func_json_escreventes;

const goBack = () => {
  const origem = route.query.origem || "criar";
  const id = route.query.id;
  switch (origem) {
    case "atualizar":
    case "vizualizar":
      router.push(`/os/atualizar/${id}`);
      break;
    case "atualizar-lista":
    case "vizualizar-lista":
      router.push("/atos/lista");
      break;
    default:
      router.push("/os/criar-registro");
      break;
  }
};
</script>
