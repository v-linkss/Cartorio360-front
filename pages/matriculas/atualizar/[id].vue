<template>
  <v-card width="1300">
    <h1
      style="
        background-color: #f5f2f2;
        color: #525050;
        padding: 5px 0px 0px 20px;
      "
    >
      Atualização de Matriculas
    </h1>
    <v-tabs v-model="tab" bg-color="#f5f2f2">
      <v-tab value="dados">Dados</v-tab>
      <v-tab value="enderecos">Enderecos</v-tab>
    </v-tabs>

    <v-tabs-window v-model="tab">
      <v-tabs-window-item value="dados">
        <v-container v-if="!pending">
          <v-row>
            <v-col md="6">
              <v-text-field
                v-model="state.numero"
                label="Matrícula"
                required
              ></v-text-field>
            </v-col>
            <v-col md="4">
              <v-text-field
                v-model="state.protocolo"
                label="Protocolo"
                required
                disabled
              ></v-text-field>
            </v-col>
            <v-col md="4">
              <v-autocomplete
                v-model="state.livro_id"
                :items="dados.livroItens.data"
                label="Livro"
                item-title="descricao"
                item-value="id"
                disabled
              />
            </v-col>

            <v-col md="4">
              <v-text-field
                v-model.number="state.pagina_inicial"
                label="Folha inicial"
                type="number"
                required
                min="0"
                disabled
              ></v-text-field>
            </v-col>

            <v-col md="4">
              <v-text-field
                v-model.number="state.pagina_final"
                label="Folha Final"
                type="number"
                min="0"
                disabled
              ></v-text-field>
            </v-col>
            <v-col md="4">
              <v-text-field
                v-model="state.data"
                type="date"
                label="Data"
              ></v-text-field>
            </v-col>
            <v-col md="4">
              <v-autocomplete
                v-model="state.situacao_id"
                :items="dados.situacaoItens"
                label="Situação"
                item-title="descricao"
                item-value="id"
              />
            </v-col>

            <v-col md="4">
              <v-text-field
                v-model="state.descricao"
                label="Descrição"
                required
              ></v-text-field>
            </v-col>
            <v-col md="4">
              <v-text-field
                v-model="state.cnm"
                label="CNM"
                required
              ></v-text-field>
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
            <v-btn @click="onUpdate()" class="ml-4" size="large" color="green"
              >Salvar</v-btn
            >
          </v-row>
        </v-container>
      </v-tabs-window-item>
      <v-tabs-window-item value="enderecos">
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
            <v-btn @click="onUpdate()" class="ml-4" size="large" color="green"
              >Salvar</v-btn
            >
          </v-row>
        </v-container>
      </v-tabs-window-item>
    </v-tabs-window>
  </v-card>
</template>

<script setup>
const tab = ref("dados");

const route = useRoute();
const id = route.params.id;
const emit = defineEmits(["saved", "close-modal"]);

const router = useRouter();
const config = useRuntimeConfig();
const { $toast } = useNuxtApp();

const situacao = `${config.public.auth}/service/gerencia/listar_situacao_matriculas`;
const naturezaImoveis = `${config.public.auth}/service/gerencia/natureza_imoveis`;
const tipoLogradouros = `${config.public.auth}/service/gerencia/tipo_logradouros`;
const cidades = `${config.public.auth}/service/gerencia/listarCidades`;
const livro = `${config.public.auth}/service/gerencia/livro`;
const matriculas = `${config.public.auth}/service/gerencia/matriculas`;

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
  pagina_inicial: null,
  pagina_final: null,
  user_alteracao_id: useCookie("user-data").value.usuario_id,
});

const {
  data: dados,
  status,
  pending,
  error,
} = await useLazyAsyncData("cliente-dados", fetchData);

async function fetchData() {
  const tokenCookie = useCookie("auth_token");

  try {
    const [
      situacaoItens,
      naturezaImoveisItens,
      tipoLogradouroItens,
      cidadesItens,
      livroItens,
      matriculasItens,
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
      $fetch(`${matriculas}/${id}`, {
        headers: {
          Authorization: `Bearer ${tokenCookie.value}`,
        },
      }),
    ]);
    Object.assign(state, matriculasItens);
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
}

// function refreshData() {
//   fetchData().then((newData) => {
//     Object.assign(dados, newData);
//   });
// }

// Trigger refresh on page reload
// onMounted(() => {
//   refreshData();
// });

async function onUpdate() {
  try {
    const tokenCookie = useCookie("auth_token");

    // Usando o payload formatado
    const response = await $fetch(
      `${config.public.auth}/service/gerencia/matriculas/${id}`,
      {
        method: "PUT",
        body: state, // Aqui usa o payload formatado
        headers: {
          Authorization: `Bearer ${tokenCookie.value}`,
        },
      }
    );

    if (response.statusCode === 500) {
      $toast.error("Erro ao cadastrar Matricula.");
    } else {
      $toast.success("Matrícula atualizada com sucesso!");
      router.push("/matriculas/lista");
    }
  } catch (error) {
    console.log("Erro ao Atualizar:", error);
    $toast.error("Erro ao Atualizar. Tente novamente.");
  }
}

function voltar() {
  router.push("/matriculas/lista");
}
</script>
