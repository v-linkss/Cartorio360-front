<template>
  <v-progress-circular
    class="loading-spinner"
    indeterminate
    size="64"
    v-if="pending"
  ></v-progress-circular>

  <div v-else-if="error">{{ error.message }}</div>

  <v-container v-if="!pending">
    <v-row>
      <v-col md="6">
        <v-text-field
          v-model="state.numero"
          :error-messages="v$.numero.$errors.map((e) => e.$message)"
          label="Matrícula"
          required
          @blur="v$.numero.$touch"
          @input="v$.numero.$touch"
        ></v-text-field>
      </v-col>
      <v-col md="4">
        <v-text-field
          v-model="state.protocolo"
          label="Protocolo"
          required
        ></v-text-field>
      </v-col>
      <v-col md="4">
        <v-autocomplete
          v-model="state.livro_id"
          :error-messages="v$.situacao_id.$errors.map((e) => e.$message)"
          :items="dados.livroItens.data"
          label="Livro"
          required
          item-title="descricao"
          item-value="id"
        />
      </v-col>
      <v-col md="4">
        <v-text-field
          v-model.number="state.folha_inicial"
          label="Folha inicial"
          type="number"
          required
          min="0"
        ></v-text-field>
      </v-col>
      <v-col md="4">
        <v-text-field
          v-model.number="state.folha_final"
          label="Folha Final"
          type="number"
          required
          min="0"
        ></v-text-field>
      </v-col>
      <v-col md="4">
        <v-text-field
          v-model="state.data"
          :error-messages="v$.situacao_id.$errors.map((e) => e.$message)"
          @blur="v$.numero.$touch"
          @input="v$.numero.$touch"
          placeholder="dd/mm/yyyy"
          v-mask="'##/##/####'"
          label="Data"
        ></v-text-field>
      </v-col>
      <v-col md="4">
        <v-autocomplete
          v-model="state.situacao_id"
          :error-messages="v$.situacao_id.$errors.map((e) => e.$message)"
          :items="dados.situacaoItens"
          label="Situação"
          required
          @blur="v$.situacao_id.$touch"
          @input="v$.situacao_id.$touch"
          item-title="descricao"
          item-value="id"
        />
      </v-col>
      <v-col md="4">
        <v-text-field
          v-model="state.descricao"
          :error-messages="v$.situacao_id.$errors.map((e) => e.$message)"
          label="Descrição"
          required
        ></v-text-field>
      </v-col>
      <v-col md="4">
        <v-text-field v-model="state.cnm" label="CNM" required></v-text-field>
      </v-col>
      <v-col md="4">
        <v-text-field
          v-model="state.observacao"
          label="Observação"
          required
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row class="mb-3">
      <v-btn @click="voltar" size="large" color="red">Voltar</v-btn>
      <v-btn
        @click="isEditMode ? onUpdate() : onSubmit()"
        class="ml-4"
        size="large"
        color="green"
        >Salvar</v-btn
      >
    </v-row>
  </v-container>
</template>

<script setup>
import { useVuelidate } from "@vuelidate/core";
import { helpers, required } from "@vuelidate/validators";
const emit = defineEmits(["saved", "close-modal"]);

const router = useRouter();
const config = useRuntimeConfig();
const { $toast } = useNuxtApp();

const isEditMode = ref(false);
const MatriculaId = useCookie("Matricula-id");

const situacao = `${config.public.auth}/service/gerencia/listar_situacao_matriculas`;
const naturezaImoveis = `${config.public.auth}/service/gerencia/natureza_imoveis`;
const tipoLogradouros = `${config.public.auth}/service/gerencia/tipo_logradouros`;
const cidades = `${config.public.auth}/service/gerencia/listarCidades`;
const livro = `${config.public.auth}/service/gerencia/livro`;

const {
  data: dados,
  status,
  pending,
  error,
} = await useLazyAsyncData("cliente-dados", async () => {
  const tokenCookie = useCookie("auth_token");

  try {
    const [
      situacaoItens,
      naturezaImoveisItens,
      tipoLogradouroItens,
      cidadesItens,
      livroItens,
    ] = await Promise.all([
      $fetch(`${situacao}`, {
        method: "POST",
        body: {
          cartorio_token: useCookie("user-data").value.cartorio_token,
        },
        headers: {
          Authorization: `Bearer ${tokenCookie.value}`,
        },
      }),
      $fetch(`${naturezaImoveis}`, {
        headers: {
          Authorization: `Bearer ${tokenCookie.value}`,
        },
      }),
      $fetch(`${tipoLogradouros}`, {
        headers: {
          Authorization: `Bearer ${tokenCookie.value}`,
        },
      }),
      $fetch(`${cidades}`, {
        headers: {
          Authorization: `Bearer ${tokenCookie.value}`,
        },
      }),
      $fetch(`${livro}`, {
        headers: {
          Authorization: `Bearer ${tokenCookie.value}`,
        },
      }),
    ]);
    return {
      situacaoItens,
      naturezaImoveisItens,
      tipoLogradouroItens,
      cidadesItens,
      livroItens,
    };
  } catch (error) {
    console.error("Erro ao carregar dados:", error);
    return {
      situacaoItens: [],
      naturezaImoveisItens: [],
      tipoLogradouroItens: [],
      cidadesItens: [],
      livroItens: [],
    };
  }
});

const state = reactive({
  numero: null,
  protocolo: null,
  livro: null,
  folhas: null,
  data: null,
  descricao: null,
  cnm: null,
  livro_id: null,
  observacao: null,
  inscricao_municipal: null,
  situacao_id: null,
  tabvalores_natureza_id: null,
  tabvalores_tipologradouro_id: null,
  end_logradouro: null,
  end_logradouro_numero: null,
  end_bairro: null,
  end_cidade_id: null,
  end_cep: null,
  end_complemento: null,
  end_quadra: null,
  end_lote: null,
  folha_inicial: null,
  folha_final: null,
  cartorio_id: useCookie("user-data").value.cartorio_id,
  user_id: useCookie("user-data").value.usuario_id,
});

const rules = {
  numero: {
    required: helpers.withMessage("O campo é obrigatório", required),
  },

  data: {
    required: helpers.withMessage("O campo é obrigatório", required),
  },

  situacao_id: {
    required: helpers.withMessage("O campo é obrigatório", required),
  },

  tabvalores_natureza_id: {
    required: helpers.withMessage("O campo é obrigatório", required),
  },

  livro_id: {
    required: helpers.withMessage("O campo é obrigatório", required),
  },
};

const v$ = useVuelidate(rules, state);

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
      data: formatToISO(state.data),
    };

    try {
      const tokenCookie = useCookie("auth_token");

      // Usando o payload formatado
      const response = await $fetch(
        `${config.public.auth}/service/gerencia/matriculas`,
        {
          method: "POST",
          body: payloadFormated, // Aqui usa o payload formatado
          headers: {
            Authorization: `Bearer ${tokenCookie.value}`,
          },
        }
      );

      // Verificação de sucesso
      if (response.statusCode === 500) {
        $toast.error("Erro ao cadastrar Matricula, o CPF já está cadastrado.");
      } else {
        $toast.success("Matricula cadastrada com sucesso!");
        const MatriculaIdValue = response.id;
        MatriculaId.value = MatriculaIdValue;
        const Matricula_token = useCookie("Matricula_token");
        Matricula_token.value = response.token;
        isEditMode.value = true;
        emit("saved");
      }
    } catch (error) {
      console.log("Erro ao cadastrar:", error);
      $toast.error("Erro ao cadastrar. Tente novamente.");
    }
  }
}
async function onUpdate() {
  const payload = { ...state };
  for (const key in payload) {
    if (payload[key] === "") {
      payload[key] = null;
    }
  }
  const payloadFormated = {
    ...payload,
    data: formatToISO(state.data),
  };
  const { data, error, status } = await fetchWithToken(
    `${updateMatricula}/${MatriculaId.value}`,
    {
      method: "PUT",
      body: payloadFormated,
    }
  );
  if (status.value === "success") {
    $toast.success("Matricula atualizada com sucesso!");
    router.push("/Matriculas/lista");
    return;
  }
}

function voltar() {
  router.push("/matriculas/lista");
}
</script>
