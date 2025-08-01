<template>
  <v-container>
    <v-row class="mt-5">
      <v-text-field
        label="Observação"
        v-model="state.observacao"
        required
        :error-messages="v$.observacao.$errors.map((e) => e.$message)"
        @blur="v$.observacao.$touch"
        @input="v$.observacao.$touch"
      >
      </v-text-field>

      <div>
        <img
          class="btn-pointer ml-2"
          src="../../assets/novo.png"
          style="width: 40px; cursor: pointer"
          title="Criar Pessoa"
          @click="onSubmit"
        />
      </div>
    </v-row>

    <v-row>
      <v-col>
        <v-data-table
          style="height: 465px"
          :headers="headers"
          :items="observacoesItems"
        >
          <template v-slot:item.actions="{ item }">
            <div
              style="display: flex; cursor: pointer; justify-content: flex-end"
              @click="deleteObservacao(item)"
              title="Deletar Observação"
            >
              <img
                v-if="item.excluido"
                style="width: 30px; height: 30px"
                src="../../assets/excluido.png"
                alt="Visualizar"
                title="Reativar"
              />
              <img
                v-else
                src="../../assets/mudarStatus.png"
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
const getAtoId = `${config.public.managemant}/getAtosTiposByToken`;
const createAtoObservacao = `${config.public.managemant}/atos_observacao`;
const observacaoUpdate = `${config.public.managemant}/atos_observacao`;
const cartorio_token = ref(useCookie("user-data").value.cartorio_token);

const observacoesItems = ref([]);
const escreventesItems = ref([]);

const headers = [
  {
    title: "Data",
    align: "start",
    key: "data",
  },
  {
    title: "Escrevente",
    align: "start",
    key: "escrevente",
  },
  {
    title: "Observação",
    align: "start",
    key: "observacao",
  },

  { value: "actions" },
];

const state = reactive({
  observacao: null,
});

const rules = {
  observacao: {
    required: helpers.withMessage("O campo é obrigatorio", required),
  },
};

const v$ = useVuelidate(rules, state);

const { data: tipoAtoId } = await useFetch(`${getAtoId}/${props.ato_token}`, {
  method: "GET",
});

async function onSubmit() {
  if (await v$.value.$validate()) {
    const { data, error, status } = await useFetch(createAtoObservacao, {
      method: "POST",
      body: {
        ato_id: props.ato_id,
        observacao: state.observacao,
        user_id: useCookie("user-data").value.usuario_id,
      },
    });

    if (status.value === "success") {
      observacoesItems.value.push({
        data: formatDate(data.value.created, "dd/mm/yyyy hh:mm"),
        observacao: data.value.observacao,
        id: data.value.id,
        escrevente: useCookie("user-data").value.nome,
      });
      $toast.success("Observação registrada com sucesso");
    }
  } else {
    $toast.error("Preencha os campos obrigatorios.");
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
    console.error("Erro ao excluir observacao:", error);
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
