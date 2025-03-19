<script setup>
const config = useRuntimeConfig();
const createSituacaoMatricula = `${config.public.managemant}/situacao-matriculas`;

const userData = ref(useCookie("user-data").value || {});
const cartorio_id = ref(useCookie("user-data").value.cartorio_id || null);

console.log('cartorio_id:', cartorio_id)

const form = ref({
    situacao: null,
    descricao: null,
    observacao: null,
})

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

    form.value = {
      situacao: null,
      descricao: null,
      observacao: null,
    };

  } catch (error) {
    console.error('Erro ao criar situacao matricula:', error);
  }
};
</script>

<template>
  <v-container>
    <h1 class="mb-5">Situação Matricula</h1>
    <v-form @submit.prevent="handleCreateSituacaoMatricula">
      <v-row>
        <v-col cols="3">
          <v-text-field v-model="form.situacao" label="Situação" required outlined />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="6">
          <v-text-field v-model="form.descricao" label="Descrição" required outlined />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="6">
          <v-text-field v-model="form.observacao" label="Observação" outlined />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-btn size="large" color="red" to="/situacaoMatricula/lista">Voltar</v-btn>
          <v-btn type="submit" class="ml-4" size="large" color="green">Salvar</v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>
