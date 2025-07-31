<template>
  <v-container>
    <v-row v-if="!isVisualizar">
      <v-col cols="5" class="mt-6">
        <v-autocomplete
          label="Outros Atos"
          :items="outrosItems"
          item-title="descricao"
          item-value="id"
          v-model="state.outros_tj_id"
        ></v-autocomplete>
      </v-col>
      <v-col cols="2" class="mt-6">
        <v-text-field
          label="QTD"
          type="number"
          v-mask="'###'"
          v-model="state.quantidade"
        >
        </v-text-field>
      </v-col>
      <v-col cols="2">
        <label for="">Valor unitario</label>
        <MoneyInput v-model="state.valor_unitario" />
      </v-col>
      <div>
        <img
          class="btn-pointer ml-2 mt-7"
          src="../../../assets/novo.png"
          style="width: 40px; cursor: pointer"
          title="Criar Pessoa"
          @click="onSubmit"
        />
      </div>
    </v-row>
    <v-row v-if="!isVisualizar">
      <v-col cols="9">
        <v-text-field label="Observação" v-model="state.observacao" />
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-data-table
          style="height: 465px"
          :headers="headers"
          :items="outrosItemsTable"
        >
          <template v-slot:item.actions="{ item }">
            <div
              v-if="!isVisualizar"
              style="display: flex; cursor: pointer; justify-content: flex-end"
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
          </template>
        </v-data-table>
      </v-col>
    </v-row>

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
  ato_token: {
    type: String,
    required: true,
  },
});

const router = useRouter();
const route = useRoute();
const config = useRuntimeConfig();
const { $toast } = useNuxtApp();
const allOutrosTj = `${config.public.managemant}/outros_tj`;
const getOutros = `${config.public.managemant}/outros`;
const createAtoOutros = `${config.public.managemant}/atos_outros`;
const outrosUpdate = `${config.public.managemant}/atos_outros`;
const getAtosoutros = `${config.public.managemant}/atos_outros`;
const cartorio_token = ref(useCookie("user-data").value.cartorio_token);
const isVisualizar = ref(route.query.origem === "vizualizar");
const outrosItemsTable = ref([]);
const outrosItems = ref([]);

const headers = [
  { title: "Id", align: "start", key: "id" },
  { title: "Descrição", align: "start", key: "descricao" },
  { title: "Quantidade", align: "start", key: "quantidade" },
  { title: "Valor Unitario", align: "start", key: "valor_unitario" },
  { value: "actions" },
];

const state = reactive({
  observacao: null,
  outros_tj_id: null,
  quantidade: 1,
  valor_unitario: null,
});

const rules = {
  observacao: {
    required: helpers.withMessage("O campo é obrigatório", required),
  },
};

const v$ = useVuelidate(rules, state);

async function onSubmit() {
  const { error, status } = await useFetch(createAtoOutros, {
    method: "POST",
    body: {
      ato_id: Number(props.ato_id),
      observacao: state.observacao,
      valor_unitario: state.valor_unitario.replace(/,/g, ""),
      outros_tj_id: state.outros_tj_id,
      quantidade: state.quantidade,
      user_id: useCookie("user-data").value.usuario_id,
    },
  });

  if (status.value === "success") {
    $toast.success("Outro Ato registrado com sucesso");
    await fetchOutrosItemsTable();
  }
}

async function deleteObservacao(item) {
  item.excluido = !item.excluido;
  try {
    await useFetch(`${outrosUpdate}/${item.id}`, {
      method: "PUT",
      body: JSON.stringify({ excluido: item.excluido }),
    });
  } catch (error) {
    console.error("Erro ao excluir observação:", error);
  }
}

async function fetchOutrosItemsTable() {
  const { data: payloadOutros } = await useFetch(getOutros, {
    method: "POST",
    body: { ato_token: props.ato_token },
  });
  outrosItemsTable.value = payloadOutros.value || [];
}

const { data } = await useFetch(allOutrosTj, {
  method: "POST",
  body: { cartorio_token: cartorio_token },
});
outrosItems.value = data.value;

await fetchOutrosItemsTable();

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
