<template>
  <v-container class="mt-3" v-if="!pending" style="height: 425px">
    <v-row>
      <v-col md="2">
        <v-autocomplete
          v-model="state.tabvalores_pais_id"
          :items="enderecos.paisItems"
          label="País"
          item-title="descricao"
          item-value="id"
        ></v-autocomplete>
      </v-col>
      <v-col md="2">
        <v-text-field
          v-if="!isForeign"
          v-model="state.codcep"
          v-mask="'########'"
          :error-messages="v$.codcep.$errors.map((e) => e.$message)"
          required
          @blur="v$.codcep.$touch"
          @input="v$.codcep.$touch"
          label="CEP"
        ></v-text-field>
        <v-text-field
          v-else
          v-model="state.codcep"
          v-mask="'########'"
          label="CEP"
        ></v-text-field>
      </v-col>
      <v-col md="6">
        <v-text-field
          v-if="!isForeign"
          v-model="state.logradouro"
          label="Endereço"
          :error-messages="v$.logradouro.$errors.map((e) => e.$message)"
          required
          @blur="v$.logradouro.$touch"
          @input="v$.logradouro.$touch"
        ></v-text-field>
        <v-text-field
          v-else
          v-model="state.logradouro"
          label="Endereço"
        ></v-text-field>
      </v-col>
      <v-col md="1">
        <v-text-field
          v-if="!isForeign"
          v-model="state.numero"
          required
          :error-messages="v$.numero.$errors.map((e) => e.$message)"
          @blur="v$.numero.$touch"
          @input="v$.numero.$touch"
          label="N*"
        ></v-text-field>
        <v-text-field v-else v-model="state.numero" label="N*"></v-text-field>
      </v-col>
      <div class="mt-1">
        <img
          style="width: 40px; height: 40px; cursor: pointer"
          src="../assets/novo.png"
          alt="novo"
          @click="
            !isForeign ? onSubmitAdressNational() : onSubmitAdressForeign()
          "
        />
      </div>
      <v-col md="5">
        <v-text-field
          v-model="state.complemento"
          label="Complemento"
        ></v-text-field>
      </v-col>
      <v-col md="3">
        <v-text-field
          v-if="!isForeign"
          v-model="state.bairro"
          :error-messages="v$.bairro.$errors.map((e) => e.$message)"
          required
          @blur="v$.bairro.$touch"
          @input="v$.bairro.$touch"
          label="Bairro"
        ></v-text-field>
        <v-text-field
          v-else
          v-model="state.bairro"
          label="Bairro"
        ></v-text-field>
      </v-col>
      <v-col md="3">
        <v-autocomplete
          v-if="!isForeign"
          v-model="state.cidade_id"
          :items="enderecos.cidadesItems"
          label="Cidade"
          item-title="descricao"
          item-value="id"
        ></v-autocomplete>
        <v-text-field
          v-else
          v-model="state.cidade_estrangeira"
          label="Cidade Estrangeira"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-data-table
      style="max-height: 330px"
      :headers="headers"
      :items="enderecos.enderecosItems"
      item-key="id"
    >
      <template v-slot:item.cidade="{ item }">
        <h4 style="width: 150px; font-weight: 500">
          {{ getCidadeNome(item) }}
        </h4>
      </template>
      <template v-slot:item.logradouro="{ item }">
        <h4 style="width: 200px; font-weight: 500">
          {{ item.logradouro }}
        </h4>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-row style="display: flex; margin-top: -8px; gap: 10px">
          <div @click="redirectToUpdate(item.id)" title="Visualizar">
            <img
              style="width: 30px; height: 30px; cursor: pointer"
              src="../assets/editar.png"
              alt="Visualizar"
            />
          </div>
          <div @click="deleteEndereco(item)" title="Visualizar">
            <img
              v-if="item.excluido"
              style="width: 30px; height: 30px; cursor: pointer"
              src="../assets/excluido.png"
              alt="Visualizar"
              title="Reativar"
            />
            <img
              v-else
              src="../assets/mudarStatus.png"
              alt="Excluir"
              class="trash-icon"
              style="width: 30px; height: 30px; cursor: pointer"
              title="Excluir"
            />
          </div>
        </v-row>
      </template>
    </v-data-table>
    <v-dialog v-model="isModalOpen" max-width="600px">
      <v-card>
        <v-card-title style="color: green">Atualizar Endereço</v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="12" md="6">
              <v-autocomplete
                v-model="selectedEndereco.tabvalores_pais_id"
                :items="enderecos.paisItems"
                label="País"
                item-title="descricao"
                item-value="id"
              ></v-autocomplete>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="selectedEndereco.logradouro"
                label="Logradouro"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="selectedEndereco.complemento"
                label="Complemento"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="selectedEndereco.numero"
                label="Número"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="selectedEndereco.bairro"
                label="Bairro"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="selectedEndereco.codcep"
                label="CEP"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-autocomplete
                v-if="selectedEndereco.cidade_estrangeira"
                v-model="selectedEndereco.cidade_id"
                :items="enderecos.cidadesItems"
                label="Cidade"
                item-title="descricao"
                item-value="id"
              ></v-autocomplete>
              <v-text-field
                v-else
                v-model="selectedEndereco.cidade_estrangeira"
                label="Cidade Estrangeira"
              />
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green" text @click="isModalOpen = false"
            >Cancelar</v-btn
          >
          <v-btn color="green" text @click="onUpdate(selectedEndereco.id)"
            >Salvar</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
  <v-btn @click="voltar" class="ml-10 mb-5" size="large" color="red"
    >Voltar</v-btn
  >
</template>

<script setup>
import { useVuelidate } from "@vuelidate/core";
import { helpers, required } from "@vuelidate/validators";
const emit = defineEmits(["close-modal"]);

const props = defineProps({
  isModal: {
    type: Boolean,
    default: false,
  },
});

const { $toast } = useNuxtApp();
const route = useRoute();
const { id } = route.params;
const router = useRouter();
const config = useRuntimeConfig();
const allPaises = `${config.public.auth}/service/gerencia/listarPais`;
const allEnderecos = `${config.public.auth}/service/gerencia/getPessoaEnderecoById`;
const criarEnderecos = `${config.public.auth}/service/gerencia/createPessoaEndereco`;
const updateEndereco = `${config.public.auth}/service/gerencia/updatePessoaEndereco`;
const cep = `${config.public.auth}/service/gerencia/cep`;

const user_id = ref(useCookie("user-data").value.usuario_id).value;
const pessoa_id = id ? Number(id) : Number(useCookie("pessoa-id").value);

const state = reactive({
  tabvalores_pais_id: null,
  cidade_id: null,
  codcep: null,
  logradouro: null,
  numero: null,
  bairro: null,
  complemento: null,
  cidade_estrangeira: null,
});
const headers = [
  { title: "País", value: "pais.descricao" },
  { title: "CEP", value: "codcep" },
  { title: "Endereço", value: "logradouro" },
  {
    title: "N*",
    value: "numero",
  },
  {
    title: "Complemento",
    value: "complemento",
  },
  {
    title: "Bairro",
    value: "bairro",
  },
  {
    title: "Cidade",
    value: "cidade",
  },
  {
    value: "actions",
  },
];

const isModalOpen = ref(false); 
const selectedEndereco = ref(null);

const isForeign = computed(() => {
  const selectedPais = enderecos.value.paisItems.find(
    (pais) => pais.id === state.tabvalores_pais_id
  );
  return selectedPais ? selectedPais.estrangeiro : false;
});

const getCidadeNome = (item) => {
  return item.cidades?.nome || item.cidade_estrangeira;
};

const rules = {
  numero: {
    required: helpers.withMessage("O campo é obrigatorio", required),
  },
  bairro: {
    required: helpers.withMessage("O campo é obrigatorio", required),
  },
  logradouro: {
    required: helpers.withMessage("O campo é obrigatorio", required),
  },
  codcep: {
    required: helpers.withMessage(
      "O campo é obrigatorio e precisa de 8 digitos",
      required
    ),
  },
};

const v$ = useVuelidate(rules, state);
const tokenCookie = useCookie('auth_token');
const token = tokenCookie.value;
const {
  data: enderecos,
  status,
  pending,
  refresh,
} = await useLazyAsyncData("cliente-enderecos", async () => {
  const [paisItems, enderecosItems, cidadesItems] = await Promise.all([
    $fetchWithToken(allPaises),
    $fetchWithToken(`${allEnderecos}/${pessoa_id}`),
    $fetchWithToken(`${config.public.auth}/service/gerencia/listarCidades`),
  ]);
  return { paisItems, enderecosItems, cidadesItems };
});

async function onSubmitAdressNational() {
  if (await v$.value.$validate()) {
    const payload = { ...state };

    const payloadFormated = {
      ...payload,
      user_id,
      pessoa_id,
    };
    const { data, error, status } = await fetchWithToken(criarEnderecos, {
      method: "POST",
      body: payloadFormated,
    });
    if (status.value === "error" && error.value.statusCode === 500) {
      $toast.error("Erro ao cadastrar endereço,erro no sistema.");
    } else {
      $toast.success("Endereço cadastrado com sucesso!");
      refresh();
      for (const key in state) {
        state[key] = null;
      }
      v$.value.$reset();
    }
  } else {
    $toast.error(
      "Erro ao cadastrar Endereço, preencha os campos obrigatorios."
    );
  }
}

async function onSubmitAdressForeign() {
  if (!state.cidade_estrangeira || !state.logradouro) {
    $toast.error("Os Campos Cidade Estrangeira e Endereço são obrigatorios!");
    return;
  }

  const payload = { ...state };

  const payloadFormated = {
    ...payload,
    user_id,
    pessoa_id,
  };
  const { data, error, status } = await fetchWithToken(criarEnderecos, {
    method: "POST",
    body: payloadFormated,
  });
  if (status.value === "error" && error.value.statusCode === 500) {
    $toast.error("Erro ao cadastrar endereço,erro no sistema.");
  } else {

    $toast.success("Endereço cadastrado com sucesso!");
    refresh();
    for (const key in state) {
      state[key] = null;
    } 
    v$.value.$reset();
  }
}

function redirectToUpdate(id) {
  const endereco = enderecos.value.enderecosItems.find(
    (item) => item.id === id
  );
  if (endereco) {
    selectedEndereco.value = endereco;
    isModalOpen.value = true;
  }
}

async function onUpdate(id) {
  const payloadFormated = {
    tabvalores_pais_id: selectedEndereco.value.tabvalores_pais_id,
    cidade_id: selectedEndereco.value.cidade_id,
    codcep: selectedEndereco.value.codcep,
    logradouro: selectedEndereco.value.logradouro,
    numero: selectedEndereco.value.numero,
    bairro: selectedEndereco.value.bairro,
    complemento: selectedEndereco.value.complemento,
  };
  const { status } = await fetchWithToken(`${updateEndereco}/${id}`, {
    method: "PUT",
    body: payloadFormated,
  });
  if (status.value === "success") {
    isModalOpen.value = false;
    $toast.success("Endereço atualizado com sucesso!");
    refresh();
  }
}

watch(
  () => state.codcep,
  async (newCep) => {
    if (newCep.length === 8) {
      try {
        const { data, error } = await useFetch(`${cep}/${newCep}`, {
          headers: {
            Authorization: token,
          },
        });

        if (error.value) {
          console.error("Erro ao buscar CEP:", error.value);
          $toast.error("Erro ao buscar CEP no servidor.");
          return;
        }

        if (
          data.value.logradouro &&
          data.value.bairro &&
          data.value.localidade &&
          data.value.uf
        ) {
          state.logradouro = data.value.logradouro;
          state.bairro = data.value.bairro;
          state.complemento = data.value.complemento;

          let cidade = `${data.value.localidade}/${data.value.uf}`.toUpperCase();

          const cidadeItem = enderecos.value.cidadesItems.find(
            (item) => item.descricao === cidade
          );

          if (cidadeItem) {
            state.cidade_id = cidadeItem.id;
            state.tabvalores_pais_id = 76;
          } else {
            $toast.error("Cidade não encontrada na lista!");
          }
        } else {
          $toast.error("CEP não retornou dados válidos!");
        }
      } catch (err) {
        console.error("Erro inesperado:", err);
        $toast.error("Erro inesperado. Verifique sua conexão.");
      }
    }
  }
);

async function deleteEndereco(item) {
  item.excluido = !item.excluido;
  try {
    await fetchWithToken(`${updateEndereco}/${item.id}`, {
      method: "PUT",
      body: { excluido: item.excluido },
    });
  } catch (error) {
    console.error("Erro ao excluir pessoa:", error);
  }
}

const voltar = () => {
  if (props.isModal === true) {
    emit("close-modal");
    return;
  }
  router.push("/pessoas/lista");
};
</script>
