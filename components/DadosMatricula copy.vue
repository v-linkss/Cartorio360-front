<template>
  <h1>Matricula Teste</h1>
  <v-progress-circular class="loading-spinner" indeterminate size="64" v-if="pending"></v-progress-circular>
  
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
          :error-messages="v$.protocolo.$errors.map((e) => e.$message)"
          label="Protocolo"
          required
          @blur="v$.protocolo.$touch"
          @input="v$.protocolo.$touch"
        ></v-text-field>
      </v-col>
      <v-col md="4">
        <v-text-field
          v-model="state.livro"
          :error-messages="v$.livro.$errors.map((e) => e.$message)"
          label="Livro"
          required
          @blur="v$.livro.$touch"
          @input="v$.livro.$touch"
        ></v-text-field>
      </v-col>
      <v-col md="4">
        <v-text-field
          v-model="state.folhas"
          :error-messages="v$.folhas.$errors.map((e) => e.$message)"
          label="Folhas"
          required
          @blur="v$.folhas.$touch"
          @input="v$.folhas.$touch"
        ></v-text-field>
      </v-col>
      <v-col md="4">
        <v-text-field
          v-model="state.data"
          type="date"
          label="Data"
        ></v-text-field>
      </v-col>
      {{ dados.situacaoItens }}
      <v-autocomplete
        v-if="dados && dados.situacaoItens"
        v-model="state.situacao_id"
        :items="dados.situacaoItens"
        label="Situação"
        item-title="descricao"
        item-value="id"
      />
      <v-col md="4">
        <v-text-field
          v-model="state.descricao"
          :error-messages="v$.descricao.$errors.map((e) => e.$message)"
          label="Descrição"
          required
          @blur="v$.descricao.$touch"
          @input="v$.descricao.$touch"
        ></v-text-field>
      </v-col>
      <v-col md="4">
        <v-text-field
          v-model="state.cnm"
          :error-messages="v$.cnm.$errors.map((e) => e.$message)"
          label="CNM"
          required
          @blur="v$.cnm.$touch"
          @input="v$.cnm.$touch"
        ></v-text-field>
      </v-col>
      <v-col md="4">
        <v-text-field
          v-model="state.observacao"
          :error-messages="v$.observacao.$errors.map((e) => e.$message)"
          label="Observação"
          required
          @blur="v$.observacao.$touch"
          @input="v$.observacao.$touch"
        ></v-text-field>
      </v-col>
      <v-col md="4">
        <v-text-field
          v-model="state.inscricao_municipal"
          :error-messages="v$.inscricao_municipal.$errors.map((e) => e.$message)"
          label="Inscrição Municipal"
          required
          @blur="v$.inscricao_municipal.$touch"
          @input="v$.inscricao_municipal.$touch"
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
import { useRouter, useRuntimeConfig, useCookie } from "#imports";

const router = useRouter();
const config = useRuntimeConfig();
const { $toast } = useNuxtApp();

const isEditMode = ref(false);
const pessoaId = useCookie("pessoa-id");

const situacao = `${config.public.auth}/service/gerencia/listar_situacao_matriculas`;
const naturezaImoveis = `${config.public.auth}/service/gerencia/natureza_imoveis`;
const tipoLogradouros = `${config.public.auth}/service/gerencia/tipo_logradouros`;
const cidades = `${config.public.auth}/service/gerencia/listarCidades`;
const tokenCookie = useCookie('auth_token');
const {
  data: dados,
  status,
  pending,
  error,
} = await useLazyAsyncData("cliente-dados", async () => {
  const tokenCookie = useCookie('auth_token');

  try {
    const [situacaoItens, naturezaImoveisItens, tipoLogradouroItens, cidadesItens] =
      await Promise.all([

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
      ]);

    return { situacaoItens, naturezaImoveisItens, tipoLogradouroItens, cidadesItens };
  } catch (error) {
    console.error("Erro ao carregar dados:", error);
    return { situacaoItens: [], naturezaImoveisItens: [], tipoLogradouroItens: [], cidadesItens: [] };
  }
});

const fetchData = async () => {
  $fetch(`${situacao}`, {
      method: "POST",
      body: {
        cartorio_token: cartorioToken,  // Adiciona o cartorio_token no corpo da requisição
        // Adicione outros dados que você deseja enviar no corpo aqui
      },
      headers: {
        Authorization: `Bearer ${tokenCookie.value}`,
        'Content-Type': 'application/json', // Especificando que o corpo está em JSON
      },
    }),
}
const state = reactive({
  numero: null,
  protocolo: null,
  livro: null,
  folhas: null,
  data: null,
  descricao: null,
  cnm: null,
  observacao: null,
  inscricao_municipal: null,
  situacao_id: null,
  tabvalores_nat_matricula_id: null,
  tabvalores_tipologradouro_id: null,
  end_cidade_id: null,
  cartorio_id: useCookie("user-data").value.cartorio_id,
  user_id: useCookie("user-data").value.usuario_id,
});

const rules = {
  numero: {
    required: helpers.withMessage("O campo é obrigatório", required),
  },
  protocolo: {
    required: helpers.withMessage("O campo é obrigatório", required),
  },
  livro: {
    required: helpers.withMessage("O campo é obrigatório", required),
  },
  folhas: {
    required: helpers.withMessage("O campo é obrigatório", required),
  },
  descricao: {
    required: helpers.withMessage("O campo é obrigatório", required),
  },
  cnm: {
    required: helpers.withMessage("O campo é obrigatório", required),
  },
  observacao: {
    required: helpers.withMessage("O campo é obrigatório", required),
  },
  inscricao_municipal: {
    required: helpers.withMessage("O campo é obrigatório", required),
  },
};

const v$ = useVuelidate(rules, state);
function removeFormatting(value) {
    if (value) {
      return value.replace(/[.\-]/g, "");
    } else {
      value = null;
    }
  }
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
        doc_identificacao: removeFormatting(state.doc_identificacao),
        cpf_pai: removeFormatting(state.cpf_pai),
        cpf_mae: removeFormatting(state.cpf_mae),
      };
    try {
    //   const { data, error, status } = await fetchWithToken(
    //   `${config.public.auth}/service/gerencia/matriculas`,
    //   {
    //     method: "PUT",
    //     body: payloadFormated,
    //   }
    // );
    const tokenCookie = useCookie('auth_token');

    const response = await $fetch(`${config.public.auth}/service/gerencia/matriculas`, {
      method: "POST",
      body: payload,
      headers: {
        Authorization: `Bearer ${tokenCookie.value}`,
      },
    });

    
      $toast.success("Cadastro realizado com sucesso!");
      router.push("/sucesso");
    } catch (error) {
      console.log('###############\n',error);
      $toast.error("Erro ao cadastrar.", error);
    }
  }
}

function voltar() {
  router.back();
}
</script>
