<script setup>
const config = useRuntimeConfig();
const createSituacaoMatricula = `${config.public.managemant}/situacao-matriculas`;

const userData = ref(useCookie("user-data").value || {});
const cartorio_id = ref(useCookie("user-data").value.cartorio_id || null);

const { $toast } = useNuxtApp();

const form = ref({
    situacao: null,
    descricao: null,
    observacao: null,
})

const situacao_tipo = [
  { label: "ATIVA", value: "ATIVA"},
  { label: "UNIFICADA", value: "UNIFICADA" },
  { label: "DESMEMBRADA", value: "DESMEMBRADA" },
  { label: "COM RESTRIÇÃO", value: "COM RESTRIÇÃO" },
  { label: "CANCELADA", value: "CANCELADA" },
];

const handleCreateSituacaoMatricula = async () => {
  try {
    const situacaoMatricula = {
      situacao: form.value.situacao,
      descricao: form.value.descricao,
      observacao: form.value.observacao,
      user_id: userData.value.usuario_id,
      user_alteracao_id: userData.value.usuario_id,
      cartorio_id
    }

    await useFetch(`${createSituacaoMatricula}`, {
      method: "POST",
      body: situacaoMatricula,
    });

    $toast.success("situação da matricula cadastrada com sucesso");
    
    navigateTo('/situacoes-matriculas/lista')

  } catch (error) {
    console.error('Erro ao criar situacao matricula:', error);
    $toast.error("Erro ao cadastrar situacao da matricula,a situacao matricula já está cadastrado.");
  }
};
</script>

<template>
  <v-container>
    <h1 class="mb-5">Situação Matricula</h1>
    <v-form @submit.prevent="handleCreateSituacaoMatricula">
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
          <v-btn size="large" color="red" to="/situacoes-matriculas/lista">Voltar</v-btn>
          <v-btn type="submit" class="ml-4" size="large" color="green">Salvar</v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>
