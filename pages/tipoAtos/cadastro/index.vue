<script setup>
const config = useRuntimeConfig();
const createTipoAtos = `${config.public.managemant}/tipo-atos`;
const getTiposAtos = `${config.public.managemant}/listar_tipo_atos`;
const getTiposAtosTj = `${config.public.managemant}/listar_tipo_atos_tj`;

const userData = ref(useCookie("user-data").value || {});
const cartorio_id = ref(useCookie("user-data").value.cartorio_id || null);

const usuario_token = ref(useCookie("auth_token").value) || null;
const cartorio_token = ref(useCookie("user-data").value.cartorio_token) || null;

const tiposAtos = ref([])
const tiposAtosTj = ref([])

const { $toast } = useNuxtApp();

const form = ref({
    tipo_situacao: null,
    descricao: null,
})

const situacao_tipo = [
  { label: "ATIVA", value: "ATIVA"},
  { label: "UNIFICADA", value: "UNIFICADA" },
  { label: "DESMEMBRADA", value: "DESMEMBRADA" },
  { label: "COM RESTRIÇÃO", value: "COM RESTRIÇÃO" },
  { label: "CANCELADA", value: "CANCELADA" },
];

const cartorioTokenPayload = {
      cartorio_token: cartorio_token.value,
  }

const {data: atosTipos} = await useFetch(`${getTiposAtos}`, {
  method: "POST",
  body: cartorioTokenPayload,
});

tiposAtos.value = atosTipos.value

const {data: atosTispoTj} = await useFetch(`${getTiposAtosTj}`, {
  method: "POST",
  body: cartorioTokenPayload,
});

tiposAtosTj.value = atosTispoTj.value

const handleCreateTipoAtos = async () => {
  try {
    const tipoAtosPayload = {
      tipo_situacao: form.value.situacao,
      descricao: form.value.descricao,
      user_id: userData.value.usuario_id,
      user_alteracao_id: userData.value.usuario_id,
      cartorio_id
    }

    await useFetch(`${createTipoAtos}`, {
      method: "POST",
      body: tipoAtosPayload,
    });

    $toast.success("tipo de ato cadastrado com sucesso");
    
    navigateTo('/tipoAtos/lista')

  } catch (error) {
    console.error('Erro ao criar tipo de ato:', error);
    $toast.error("Erro ao cadastrar tipo de ato");
  }
};
</script>

<template>
  <v-container>
    <h1 class="mb-5">Tipo de ato</h1>
    <v-form @submit.prevent="handleCreateTipoAtos">
      <v-row>
        <v-col cols="6">
          <v-text-field label="CÓDIGO" disabled outlined />
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
            v-model="form.situacao"
            style="width: 200px"
            :items="situacao_tipo"
            item-title="label"
            item-value="value"
            label="Tipo de situação"
            bg-color="#F6F6F6"
        >
        </v-autocomplete>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="6">
          <v-text-field v-model="form.observacao" label="Observação" outlined />
        </v-col>
      </v-row>
      <v-row>
      </v-row>
      <v-row>
        <v-col>
          <v-btn size="large" color="red" to="/tipos-matriculas/lista">Voltar</v-btn>
          <v-btn type="submit" class="ml-4" size="large" color="green">Salvar</v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>
