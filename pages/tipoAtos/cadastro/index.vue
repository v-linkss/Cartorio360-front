<script setup>
const config = useRuntimeConfig();
const createTipoAtos = `${config.public.managemant}/tipo-atos`;
const getTiposAtos = `${config.public.managemant}/listar_tipo_atos`;
const getTiposAtosTj = `${config.public.managemant}/listar_tipo_atos_tj`;
const getlivros = `${config.public.managemant}/listar_livros`;

const userData = ref(useCookie("user-data").value || {});
const cartorio_id = ref(useCookie("user-data").value.cartorio_id || null);

const usuario_token = ref(useCookie("auth_token").value) || null;
const cartorio_token = ref(useCookie("user-data").value.cartorio_token) || null;

const tiposAtos = ref([])
const tiposAtosTj = ref([])
const livros = ref([])

const { $toast } = useNuxtApp();

const form = ref({
  pai_id: null,
  ato_tipo_tj_id: null,
  descricao: "",
  livro_id: null,
  usa_imoveis: false,
  qtd_limite_folhas: 0,
  vlr_adicional_folhas: 0.00,
  texto_padrao_etiqueta: "",
});

const tipoAtoServicoPayload = {
      cartorio_token: cartorio_token.value,
      tipo: 'SERVIÇO'
  }

const {data: atosTipos} = await useFetch(`${getTiposAtos}`, {
  method: "POST",
  body: tipoAtoServicoPayload,
});

tiposAtos.value = atosTipos.value;

const cartorioTokenPayload = {
    cartorio_token: cartorio_token.value,
}

const {data: atosTipoTj} = await useFetch(`${getTiposAtosTj}`, {
  method: "POST",
  body: cartorioTokenPayload,
});

tiposAtosTj.value = atosTipoTj.value

const {data: livrosData} = await useFetch(`${getlivros}`, {
  method: "POST",
  body: cartorioTokenPayload,
});

livros.value = livrosData.value

const handleCreateTipoAtos = async () => {
  try {
    const tipoAtosPayload = {
      pai_id: form.value.pai_id,
      ato_tipo_tj_id: form.value.ato_tipo_tj_id,
      descricao: form.value.descricao,
      livro_id: form.value.livro_id, 
      usa_imoveis: form.value.usa_imoveis,
      qtd_limite_folhas: form.value.qtd_limite_folhas,
      vlr_adicional_folhas: form.value.vlr_adicional_folhas,
      texto_padrao_etiqueta: form.value.texto_padrao_etiqueta,
      user_id: userData.value.usuario_id,
      user_alteracao_id: userData.value.usuario_id,
      cartorio_id: cartorio_id.value,
      tabvalores_tipotelaato_id: 1
    };
    
    const { data, error } = await useFetch(createTipoAtos, {
      method: "POST",
      body: tipoAtosPayload,
    });

    if (error.value) {
      throw new Error(error.value.message || "Erro desconhecido na API");
    }

    $toast.success("Tipo de ato cadastrado com sucesso");
    navigateTo('/tipoAtos/lista');

  } catch (error) {
    console.error("Erro ao criar tipo de ato:", error);
    $toast.error(error.message || "Erro ao cadastrar tipo de ato");
  }
};

</script>

<template>
  <v-container>
    <h1 class="mb-5">Criar Tipo de Ato</h1>
    <v-form @submit.prevent="handleCreateTipoAtos">
      <v-row>
        <v-col cols="6">
          <v-text-field label="Código" disabled outlined />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="6">
          <v-autocomplete
            v-model="form.pai_id"
            :items="tiposAtos"
            item-title="descricao"
            item-value="id"
            label="Serviço"
            required
            outlined
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="6">
          <v-autocomplete
            class="mr-5"
            label="Ato tj"
            :items="tiposAtosTj"
            item-title="descricao"
            item-value="id"
            v-model="form.ato_tipo_tj_id"
          ></v-autocomplete>
          <v-col md="6">
        </v-col>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="6">
          <v-text-field v-model="form.descricao" label="Descrição" required outlined />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="6">
          <v-autocomplete
            v-model="form.livro_id"
            :items="livros"
            item-title="descricao"
            item-value="id"
            label="Livro"
            required
            outlined
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="6">
          <v-checkbox v-model="form.usa_imoveis" label="Usa Imóveis">
          </v-checkbox> 
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="6">
          <v-text-field
            v-model.number="form.qtd_limite_folhas"
            type="number"
            label="Quantidade Limite de Folhas"
            required
            outlined
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="6">
          <MoneyInput required v-model="form.vlr_adicional_folhas" label="Valor Adicional por Folha" />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="6">
          <v-textarea v-model="form.texto_padrao_etiqueta" label="Texto Padrão da Etiqueta" outlined />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-btn size="large" color="red" to="/tipoAtos/lista">Voltar</v-btn>
          <v-btn type="submit" class="ml-4" size="large" color="green">Salvar</v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>
