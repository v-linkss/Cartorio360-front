<script setup>
const config = useRuntimeConfig();
const updateTipoAtos = `${config.public.managemant}/tipo-atos`;
const tipoAto = `${config.public.managemant}/tipo-atos`;
const getTipoTj = `${config.public.managemant}/listar_tipo_atos_tj`;
const getTiposAtos = `${config.public.managemant}/listar_tipo_atos"`;
const getlivros = `${config.public.managemant}/listar_livros"`;


const route = useRoute();
const { id } = route.params; 

const form = ref({
  servico: null,
  atoTj: null,
  descricao: null,
  livro: null,
  usaImoveis: false,
  qtdLimiteFolhas: 0,
  vlrAdicionalFolhas: 0,
  textoPadraoEtiqueta: null,
});

const tipoAtosServico = ref([]);
const tipoAtosTj = ref([]);
const livros = ref([]);

const cartorio_token = ref(useCookie("user-data").value.cartorio_token) || null;

async function loadData() {
  try {
    const { data: seloData } = await useFetch(`${tipoAto}/${id}`, { method: "GET" });
    if (seloData.value) {
      form.value = {
        uf: seloData.value.uf,
        cor: seloData.value.cor,
        descricao: seloData.value.descricao,
        vlr_compra: seloData.value.vlr_compra,
      };
    }
  } catch (error) {
    console.error("Erro ao carregar os dados do selo:", error);
  }
}


const atoTipoServicoPayload = {
    cartorio_token: cartorio_token.value,
    tipo: 'SERVIÇO'
}

const { data: atosTipoServico } = await useFetch(getTiposAtos,
 { 
    method: "POST",
    body: atoTipoServicoPayload
});

const cartorioTokenPayload = {
    cartorio_token: cartorio_token.value,
}


tipoAtosServico.value = atosTipoServico.value

const { data: atosTj } = await useFetch(getTipoTj,
 { 
    method: "POST",
    body: cartorioTokenPayload
});

tipoAtosTj.value = atosTj.value;

const { data: livrosData } = await useFetch(getLirvos,
 { 
    method: "POST",
    body: cartorioTokenPayload
});

livros.value = livrosData.value;

await loadData();

async function HandleSubmitEdit() {
  try {
    const edicaoTipoAto = {
      servico: form.value.servico,
      atoTj: form.value.atoTj,
      descricao: form.value.descricao,
      livro: form.value.livro,
      usaImoveis: form.value.usaImoveis,
      qtdLimiteFolhas: form.value.qtdLimiteFolhas,
      vlrAdicionalFolhas: form.value.vlrAdicionalFolhas,
      textoPadraoEtiqueta: form.value.textoPadraoEtiqueta,
    };

    await useFetch(`${updateTipoAtos}/${id}`, {
      method: "PUT",
      body: edicaoTipoAto,
    });

    navigateTo("/tipoAtos/lista");
  } catch (error) {
    console.error("Erro ao atualizar o tipo ato:", error);
  }
}

</script>

<template>
  <v-container>
    <h1 class="mb-5">Edição de Tipo ato</h1>
    <v-form @submit.prevent="HandleSubmitEdit">
      <v-row>
        <v-col cols="3">
          <v-autocomplete
            v-model="form.uf"
            :items="ufList"
            item-title="descricao"
            item-value="sigla"
            label="UF"
            required
            outlined
          />
        </v-col>
        <v-col cols="3">
          <v-text-field
            v-model="form.cor"
            label="Cor"
            required
            outlined
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="6">
          <v-text-field
          v-model="form.descricao"
          label="Descrição"
          required
          outlined
        />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="3">
          <MoneyInput required v-model="form.vlr_compra" />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-btn size="large" color="red" to="/tiposSelos/lista">Voltar</v-btn>
          <v-btn
            type="submit"
            class="ml-4"
            size="large"
            color="green"
          >
            Salvar
          </v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>