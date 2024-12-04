<script setup>
const config = useRuntimeConfig();
const createSelo = `${config.public.managemant}/tipo-selos`;
const getUfs = `${config.public.managemant}/uf`;

const form = ref({
    uf: null,
    cor: null,
    descricao: null,
    vlr_compra: null,
    
})

const ufList = ref([])

const {data: ufs} = await useFetch(getUfs, {method: 'GET'})
ufList.value = ufs.value

const HandleCreateSelo = async () => {
  try {
    const novoSelo = {
      uf: form.value.uf,
      cor: form.value.cor,
      descricao: form.value.descricao,
      vlr_compra: form.value.vlr_compra,
      user_id: useCookie("user-data").value.usuario_id,
      user_alteracao_id: useCookie("user-data").value.usuario_id
    }
    console.log(novoSelo)

    await useFetch(`${createSelo}`, {
      method: "POST",
      body: novoSelo,
    });

    form.uf = null;
    form.cor = null;
    form.descricao = null;
    form.valor = null
  } catch (error) {
    console.error('Erro ao criar selo:', error);
    alert('Erro ao criar selo. Tente novamente.');
  }
};
</script>

<template>
  <v-container class="d-flex justify-center align-center" style="height: 100vh;">
    <v-card elevation="3" max-width="500">
      <v-card-title>
        <span class="text-h6">Criar Novo Selo</span>
      </v-card-title>

      <v-card-text>
        <v-form @submit.prevent="HandleCreateSelo">
            <v-autocomplete
            v-model="form.uf"
            :items="ufList"
            item-title="descricao"
            item-value="sigla"
            label="UF"
            required
            outlined
          />
          <v-text-field
            v-model="form.cor"
            label="Cor"
            required
            outlined
          />
          <v-text-field
            v-model="form.descricao"
            label="Descrição"
            required
            outlined
          />
          <MoneyInput required v-model="form.vlr_compra" />
          <v-card-actions>
            <v-btn text to="/selo-tipo">Voltar</v-btn>
            <v-btn color="primary" type="submit" >Salvar</v-btn>
          </v-card-actions>
        </v-form>
      </v-card-text>

      
    </v-card>
  </v-container>
</template>