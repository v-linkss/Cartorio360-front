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

    await useFetch(`${createSelo}`, {
      method: "POST",
      body: novoSelo,
    });

    navigateTo('/tiposSelos/lista')
  } catch (error) {
    console.error('Erro ao criar selo:', error);
  }
};
</script>

<template>
    <v-card elevation="4" max-width="1000">
      <v-card-title>
        <span class="text-h6">Criar Novo Selo</span>
      </v-card-title>
      <v-form @submit.prevent="HandleCreateSelo">
          <v-container>
              <v-autocomplete
                v-model="form.uf"
                :items="ufList"
                item-title="descricao"
                item-value="sigla"
                label="UF"
                required
                outlined
                class="mb-5"
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
              <v-btn size="large" color="red" to="/tiposSelos/lista">Voltar</v-btn>
              <v-btn
                type="submit"
                class="ml-4"
                size="large"
                color="green"
              >
                Salvar
              </v-btn>
            </v-card-actions>
            </v-container>
        </v-form>
    </v-card>
</template>