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
      <v-col>
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
      <v-col md="2">
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
      <v-col md="2">
        <v-text-field
          v-model="state.bairro"
          :error-messages="v$.bairro.$errors.map((e) => e.$message)"
          required
          @blur="v$.bairro.$touch"
          @input="v$.bairro.$touch"
          label="Bairro"
        ></v-text-field>
      </v-col>
      <v-col md="2">
        <v-autocomplete
          v-model="state.cidade_id"
          :items="enderecos.cidadesItems"
          label="Cidade"
          item-title="descricao"
          item-value="id"
        ></v-autocomplete>
      </v-col>
      <div class="mt-3">
        <img
          style="width: 40px; height: 40px; cursor: pointer"
          src="../assets/novo.png"
          alt="novo"
          @click="onSubmit"
        />
      </div>
    </v-row>
    <v-data-table
      :headers="headers"
      :items="enderecos.enderecosItems"
      item-key="name"
    >
    <template v-slot:item.actions="{ item }">
        <v-row>
          <div
            @click="redirectToUpdate(item.id)"
            title="Visualizar"
          >
            <img
              style="width: 40px; height: 40px;cursor: pointer;"
              src="../assets/editar.png"
              alt="Visualizar"
            />
          </div>
          <div
            @click="deleteEndereco(item)"
            title="Visualizar"
          >
            <img
              v-if="item.excluido"
              style="width: 40px; height: 40px;cursor: pointer;"
              src="../assets/excluido.png"
              alt="Visualizar"
              title="Reativar"
            />
            <img
              v-else
              src="../assets/trash.png"
              alt="Excluir"
              class="trash-icon"
              style="width: 40px; height: 40px;cursor: pointer;"
              title="Excluir"
            />
          </div>
        </v-row>
      </template>
  </v-data-table>
    <NuxtLink to="/pessoas/registros">
      <img class="btn-pointer" src="../assets/sair.png" alt="Sair" />
    </NuxtLink>
  </v-container>
</template>

<script setup>
import { useVuelidate } from "@vuelidate/core";
import { helpers, required } from "@vuelidate/validators";

const { $toast } = useNuxtApp();

const config = useRuntimeConfig();
const allPaises = `${config.public.managemant}/listarPais`
const allEnderecos = `${config.public.managemant}/getPessoaEnderecoById`
const cidades = `${config.public.managemant}/listarCidades`
const criarEnderecos = `${config.public.managemant}/createPessoaEndereco`
const updateEndereco =  `${config.public.managemant}/updatePessoaEndereco`

const state = reactive({
  tabvalores_pais_id: "",
  cidade_id: "",
  codcep: "",
  logradouro: "",
  numero: "",
  bairro: "",
  user_id: useCookie("user-data").value.usuario_id,
  pessoa_id: useCookie("pessoa-id").value,
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
    title: "Bairro",
    value: "bairro",
  },
  {
    title: "Cidade",
    value: "cidades.nome",
  },
  {
    value:"actions"
  }
];

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
} = await useLazyAsyncData("cliente-enderecos", async () => {
  const [paisItems, enderecosItems, cidadesItems] = await Promise.all([
    $fetch(allPaises),
    $fetch(`${allEnderecos}/${ useCookie("pessoa-id").value}`),
    $fetch(cidades),
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
    };
    const { data, error, status } = await useFetch(criarEnderecos, {
      method: "POST",
      body: payloadFormated,
    });
    if (status.value === "error" && error.value.statusCode === 500) {
      $toast.error("Erro ao cadastrar endereço,falta de id obrigatorios.");
      console.log(payloadFormated)
    } else {
      enderecos.value.enderecosItems.push(data.value);
      $toast.success("Endereço cadastrado com sucesso!");
      Object.assign(state, {
        tabvalores_pais_id: "",
        cidade_id: "",
        codcep: "",
        logradouro: "",
        numero: "",
        bairro: "",
        data_vencimento: "",
        tabvalores_ufemissor_id: "",
      });
    }
  } else {
    $toast.error(
      "Erro ao cadastrar Endereço, preencha os campos obrigatorios."
    );
  }
}

async function deleteEndereco(item) {
  item.excluido = !item.excluido;
  try {
    await useFetch(`${updateEndereco}/${item.id}`, {
      method: 'PUT',
      body: JSON.stringify({ excluido: item.excluido }),
    });
  } catch (error) {
    console.error('Erro ao excluir pessoa:', error);
  }
}
</script>
