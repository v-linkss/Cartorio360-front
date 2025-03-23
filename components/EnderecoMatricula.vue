<template>
  <v-container>
    <v-row>
      <v-col md="4">
        <v-text-field
          v-model="state.inscricao_municipal"
          label="Inscrição Municipal"
          required
        ></v-text-field>
      </v-col>
      <v-col md="4">
        <v-autocomplete
          v-model="state.tabvalores_natureza_id"
          :items="dados.naturezaImoveisItens"
          label="Natureza Imovel"
          item-title="descricao"
          item-value="id"
        />
      </v-col>
      <v-col md="4">
        <v-autocomplete
          v-model="state.tabvalores_tipologradouro_id"
          :items="dados.tipoLogradouroItens"
          label="Tipo de Logradouro"
          item-title="descricao"
          item-value="id"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col md="4">
        <v-text-field
          v-model="state.end_logradouro"
          label="Endereço"
          required
        ></v-text-field>
      </v-col>
      <v-col md="4">
        <v-text-field
          v-model="state.end_logradouro_numero"
          label="Numero"
          required
        ></v-text-field>
      </v-col>
      <v-col md="4">
        <v-text-field
          v-model="state.end_bairro"
          label="Bairro"
          required
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col md="4">
        <v-autocomplete
          v-model="state.end_cidade_id"
          :items="dados.cidadesItens"
          label="Cidade"
          item-title="descricao"
          item-value="id"
        />
      </v-col>
      <v-col md="4">
        <v-text-field
          v-model="state.end_cep"
          label="CEP"
          required
        ></v-text-field>
      </v-col>
      <v-col md="4">
        <v-text-field
          v-model="state.end_complemento"
          label="Complemento"
          required
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col md="4">
        <v-text-field
          v-model="state.end_quadra"
          label="Quadra"
          required
        ></v-text-field>
      </v-col>

      <v-col md="4">
        <v-text-field
          v-model="state.end_lote"
          label="Lote"
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

function removeFormatting(value) {
  if (value) {
    return value.replace(/[.\-]/g, "");
  } else {
    value = null;
  }
}
async function onSubmit() {
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
    const tokenCookie = useCookie("auth_token");

    // Usando o payload formatado
    const response = await $fetch(
      `${config.public.auth}/service/gerencia/matriculas`,
      {
        method: "POST",
        body: payloadFormated,
        headers: {
          Authorization: `Bearer ${tokenCookie.value}`,
        },
      }
    );

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
async function onUpdate() {
  const payload = { ...state };
  for (const key in payload) {
    if (payload[key] === "") {
      payload[key] = null;
    }
  }
  const payloadFormated = {
    ...payload,
    doc_identificacao: removeFormatting(state.doc_identificacao),
    cpf_mae: removeFormatting(state.cpf_mae),
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
