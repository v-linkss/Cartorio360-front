<template>
  <v-container v-if="status === 'success'" class="mt-5">
    <v-row style="gap: 3rem">
      <div style="width: 200px">
        <v-text-field
          class="mt-7 mb-4"
          type="date"
          v-model="atos.dt_casamento"
          label="Data Casamento"
          prepend-inner-icon="mdi-magnify"
          variant="outlined"
          hide-details
        ></v-text-field>
      </div>
      
      <div style="width: 300px">
        <v-autocomplete
          class="mt-7 mb-4"
          label="Situação"
          v-model="atos.tabvalores_regimecasamento_id"
          :items="combolistregimeBens"
          item-title="descricao"
          item-value="id"
          variant="outlined"
          required
        />

      </div>
      <div style="width: 300px">
        <v-text-field
          class="mt-7 mb-4"
          v-model="atos.qtd_filhos_maiores"
          label="Filhos Maiores"
          prepend-inner-icon="mdi-magnify"
          variant="outlined"
          hide-details
        ></v-text-field>
      </div>

      <div style="width: 300px">
        <v-text-field
          class="mt-7 mb-4"
          v-model="atos.qtd_filhos_maiores"
          label="Filhos Menores"
          prepend-inner-icon="mdi-magnify"
          variant="outlined"
          hide-details
        ></v-text-field>
      </div>
      <div style="width: 300px">
        <v-autocomplete
          class="mt-7 mb-4"
          label="Situação"
          v-model="atos.tabvalores_regimecasamento_id"
          :items="combolistregimeBens"
          item-title="Regime Bens"
          item-value="id"
          variant="outlined"
          required
        />

      </div>
      

    </v-row>

    <NuxtLink @click="goBack">
      <v-btn size="large" color="red">Voltar</v-btn>
    </NuxtLink>
    <ModalImoveisCadastro
      @refresh="atualizarListaImoveis"
      :show="isModalCadastroImoveisOpen"
      @close="isModalCadastroImoveisOpen = false"
    />
    <ModalImoveisAtualizar
      @refresh="atualizarListaImoveis"
      :imovel_id="idImovel"
      :show="isModalAtualizarImoveisOpen"
      @close="isModalAtualizarImoveisOpen = false"
    />
  </v-container>
</template>

<script setup>
const config = useRuntimeConfig();
const atos = reactive({
  dt_casamento: null,
  tabvalores_regimecasamento_id: null,
  qtd_filhos_maiores:null,
  qtd_filhos_menores:null,
  responsavel_menores_id:null,

  
});
const combolistregimeBens = ref([]);
const router = useRouter();
const route = useRoute();

const getAtos = `${config.public.auth}/service/gerencia/getAtos/${route.query.ato_id}`;
const regimeBens = `${config.public.auth}/service/gerencia/regime_casamento`;


const search = ref("");
const searchMatricula = ref("");
const isModalCadastroImoveisOpen = ref(false);
const isModalAtualizarImoveisOpen = ref(false);
const idImovel = ref(null);


const { data: atosData, status } = await fetchWithToken(getAtos, {
  method: "GET",
});

const { data: regimeBensData } = await fetchWithToken(regimeBens
, {
  method: "GET",
});

if(atosData.value){
  atos.dt_casamento = atosData.value.dt_casamento;
  atos.tabvalores_regimecasamento_id = atosData.value.tabvalores_regimecasamento_id;
  atos.qtd_filhos_maiores = atosData.value.qtd_filhos_maiores;
  atos.qtd_filhos_menores = atosData.value.qtd_filhos_menores;
  atos.responsavel_menores_id = atosData.value.responsavel_menores_id;
}

if(regimeBensData.value){
  combolistregimeBens.value = regimeBensData.value
}



function redirectToUpdate(id) {
  idImovel.value = id;
  isModalAtualizarImoveisOpen.value = true;
}
const atualizarListaImoveis = async () => {
  await fetchWithToken(imoveisLista, {
    method: "POST",
    body: { ato_token: route.query.ato_token_edit },
  });
};
const goBack = () => {
  const origem = route.query.origem || "criar";
  const id = route.query.id;
  switch (origem) {
    case "atualizar":
    case "vizualizar":
      router.push(`/os/atualizar/${id}`);
      break;
    case "atualizar-lista":
    case "vizualizar-lista":
      router.push("/atos/lista");
      break;
    default:
      router.push("/os/criar-registro");
      break;
  }
};
</script>
