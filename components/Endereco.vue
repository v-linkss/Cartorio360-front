<template>
  <v-container v-if="!pending" class="mt-5">
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
          v-model="state.codcep"
          v-mask="'########'"
          :error-messages="v$.codcep.$errors.map((e) => e.$message)"
          required
          @blur="v$.codcep.$touch"
          @input="v$.codcep.$touch"
          label="CEP"
        ></v-text-field>
      </v-col>
      <v-col md="6">
        <v-text-field
          v-model="state.logradouro"
          label="Endereço"
          :error-messages="v$.logradouro.$errors.map((e) => e.$message)"
          required
          @blur="v$.logradouro.$touch"
          @input="v$.logradouro.$touch"
        ></v-text-field>
      </v-col>
      <v-col md="1">
        <v-text-field
          v-model="state.numero"
          :error-messages="v$.numero.$errors.map((e) => e.$message)"
          required
          @blur="v$.numero.$touch"
          @input="v$.numero.$touch"
          label="N*"
        ></v-text-field>
      </v-col>
      <div class="mt-3">
        <img
          style="width: 40px; height: 40px; cursor: pointer"
          src="../assets/novo.png"
          alt="novo"
          @click="onSubmit"
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
          v-model="state.bairro"
          :error-messages="v$.bairro.$errors.map((e) => e.$message)"
          required
          @blur="v$.bairro.$touch"
          @input="v$.bairro.$touch"
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
      :headers="headers"
      :items="enderecos.enderecosItems"
      item-key="id"
    >
      <template v-slot:item.actions="{ item }">
        <v-row style="display: flex; gap: 10px">
          <div @click="redirectToUpdate(item.id)" title="Visualizar">
            <img
              style="width: 40px; height: 40px; cursor: pointer"
              src="../assets/editar.png"
              alt="Visualizar"
            />
          </div>
          <div @click="deleteEndereco(item)" title="Visualizar">
            <img
              v-if="item.excluido"
              style="width: 40px; height: 40px; cursor: pointer"
              src="../assets/excluido.png"
              alt="Visualizar"
              title="Reativar"
            />
            <img
              v-else
              src="../assets/mudarStatus.png"
              alt="Excluir"
              class="trash-icon"
              style="width: 40px; height: 40px; cursor: pointer"
              title="Excluir"
            />
          </div>
        </v-row>
      </template>
    </v-data-table>
    <NuxtLink to="/pessoas/registros">
      <img class="btn-pointer" src="../assets/sair.png" alt="Sair" />
    </NuxtLink>
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
                v-model="selectedEndereco.cidade_id"
                :items="enderecos.cidadesItems"
                label="Cidade"
                item-title="descricao"
                item-value="id"
              ></v-autocomplete>
            </v-col>

            <!-- Outros campos que precisar -->
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
</template>

<script setup>
import { useVuelidate } from "@vuelidate/core";
import { helpers, required } from "@vuelidate/validators";

const { $toast } = useNuxtApp();
const route = useRoute();
const { id } = route.params;

const config = useRuntimeConfig();
const allPaises = `${config.public.managemant}/listarPais`;
const allEnderecos = `${config.public.managemant}/getPessoaEnderecoById`;
const criarEnderecos = `${config.public.managemant}/createPessoaEndereco`;
const updateEndereco = `${config.public.managemant}/updatePessoaEndereco`;

const user_id = ref(useCookie("user-data").value.usuario_id).value;
const pessoa_id = Number(useCookie("pessoa-id").value || id);

const state = reactive({
  tabvalores_pais_id: "",
  cidade_id: "",
  codcep: "",
  logradouro: "",
  numero: "",
  bairro: "",
  data_vencimento: "",
  tabvalores_ufemissor_id: "",
  complemento: "",
  cidade_estrangeira: "",
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
    value: "logradouro",
  },
  {
    title: "Cidade",
    value: "cidades.nome",
  },
  {
    value: "actions",
  },
];

const isModalOpen = ref(false); // Controla a visibilidade do modal
const selectedEndereco = ref(null);

const isForeign = computed(() => {
  const selectedPais = enderecos.value.paisItems.find(
    (pais) => pais.id === state.tabvalores_pais_id
  );
  return selectedPais ? selectedPais.estrangeiro : false;
});

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

const {
  data: enderecos,
  status,
  pending,
  refresh,
} = await useLazyAsyncData("cliente-enderecos", async () => {
  const [paisItems, enderecosItems, cidadesItems] = await Promise.all([
    $fetch(allPaises),
    $fetch(`${allEnderecos}/${pessoa_id}`),
    $fetch(`${config.public.managemant}/listarCidades`),
  ]);
  return { paisItems, enderecosItems, cidadesItems };
});

async function onSubmit() {
  if (await v$.value.$validate()) {
    const payload = { ...state };
    for (const key in payload) {
      if (payload[key] === "") {
        payload[key] = null;
      }
    }
    const payloadFormated = {
      ...payload,
      user_id,
      pessoa_id,
    };
    const { data, error, status } = await useFetch(criarEnderecos, {
      method: "POST",
      body: payloadFormated,
    });
    if (status.value === "error" && error.value.statusCode === 500) {
      $toast.error("Erro ao cadastrar endereço,erro no sistema.");
    } else {
      $toast.success("Endereço cadastrado com sucesso!");
      refresh();
      for (const key in state) {
        state[key] = "";
      }
      v$.value.$reset();
    }
  } else {
    $toast.error(
      "Erro ao cadastrar Endereço, preencha os campos obrigatorios."
    );
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
  const { status } = await useFetch(`${updateEndereco}/${id}`, {
    method: "PUT",
    body: payloadFormated,
  });
  if (status.value === "success") {
    isModalOpen.value = false;
    $toast.success("Endereço atualizado com sucesso!");
    refresh();
  }
}

async function deleteEndereco(item) {
  item.excluido = !item.excluido;
  try {
    await useFetch(`${updateEndereco}/${item.id}`, {
      method: "PUT",
      body: JSON.stringify({ excluido: item.excluido }),
    });
  } catch (error) {
    console.error("Erro ao excluir pessoa:", error);
  }
}
</script>
