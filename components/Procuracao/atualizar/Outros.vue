<template>
  <v-container>
    <v-row v-if="!isVisualizar">
      <v-col cols="5"  class="mt-6">
        <v-autocomplete label="Outros Atos" :items="outrosItems" item-title="descricao" item-value="id"></v-autocomplete>
      </v-col>
      <v-col cols="2" class="mt-6">
        <v-text-field label="QTD" type="number" v-mask="'###'" v-model="state.quantidade"> </v-text-field>
      </v-col>
      <v-col cols="2">
        <label for="">Valor unitario</label>
        <MoneyInput v-model="state.valor_unitario"/>
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
        <v-text-field label="Observação" v-model="state.observacao"/>
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
});

const router = useRouter();
const route = useRoute();
const config = useRuntimeConfig();
const { $toast } = useNuxtApp();
const allOutrosTj = `${config.public.managemant}/outros_tj`;
const getOutros = `${config.public.managemant}/outros`;
const createAtoObservacao = `${config.public.managemant}/atos_observacao`;
const observacaoUpdate = `${config.public.managemant}/atos_observacao`;
const getAtosObservacao = `${config.public.managemant}/atos_observacao`;
const cartorio_token = ref(useCookie("user-data").value.cartorio_token);
const isVisualizar = ref(route.query.origem === 'vizualizar');
const outrosItemsTable = ref([]);
const outrosItems = ref([]);

const headers = [
  { title: "Data", align: "start", key: "created" },
  { title: "Quantidade", align: "start", key: "users.nome" },
  { title: "Valor Unitario", align: "start", key: "users.nome" },
  { title: "Observação", align: "start", key: "observacao" },
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
  // Verifica se o campo está vazio e só valida se houver algo
  if (state.observacao.trim() === "") {
    $toast.error("O campo de observação está vazio.");
    return;
  }

  if (await v$.value.$validate()) {
    const { data, error, status } = await useFetch(createAtoObservacao, {
      method: "POST",
      body: {
        ato_id: route.query.ato_id,
        observacao: state.observacao,
        user_id: useCookie("user-data").value.usuario_id,
      },
    });

    if (status.value === "success") {
      observacoesItems.value.push({
        created: formatDate(data.value.created, "dd/mm/yyyy hh:mm"),
        observacao: data.value.observacao,
        id: data.value.id,
        escrevente: useCookie("user-data").value.nome,
      });

      state.observacao = "";

      $toast.success("Observação registrada com sucesso");
    }
  } else {
    $toast.error("Preencha os campos obrigatórios.");
  }
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

const { data } = await useFetch(allOutrosTj, {
  method: "POST",
  body: { cartorio_token: cartorio_token },
});
outrosItems.value = data.value

const { data:payloadOutros } = await useFetch(getOutros, {
  method: "POST",
  body: { cartorio_token: cartorio_token },
});
outrosItemsTable.value = payloadOutros.value || [];

const goBack = () => {
  const origem = route.query.origem || "criar";
  const id = route.query.id;
  if (origem === "atualizar" || origem === "vizualizar"){
    router.push(`/os/atualizar/${id}`);
  } else {
    router.push("/os/criar-registro");
  }
};
</script>
