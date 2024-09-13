<template>
  <v-container class="mt-5">
    <v-row
      style="display: flex; justify-content: space-between; margin-bottom: 30px"
    >
      <h1>Ordens de Serviço</h1>
    </v-row>

    <v-row>
      <v-col md="3">
        <v-autocomplete
          label="Nacionalidade"
          :items="nacionalidade"
          v-model="state.nacionalidade"
        ></v-autocomplete>
      </v-col>
      <v-col md="2">
        <v-text-field
          autofocus
          v-model="state.apresentante_cpf"
          label="CPF"
        ></v-text-field>
      </v-col>
      <v-col md="4">
        <v-text-field
          v-model="state.apresentante_nome"
          label="Nome Apresentante"
        ></v-text-field>
      </v-col>
      <v-col>
        <div>
          <img
            style="width: 40px; height: 40px; cursor: pointer"
            src="../../assets/salvar.png"
            alt="Salvar"
            @click="onSubmit()"
          />
        </div>
      </v-col>
    </v-row>
    <v-row style="display: flex; margin-bottom: 10px; gap: 2rem">
      <h1 class="ml-5">Atos</h1>
      <NuxtLink to="/OrdensServico/criar-ato">
        <img
          style="width: 45px; height: 45px; cursor: pointer"
          src="../../assets/novo.png"
          alt="novo"
        />
      </NuxtLink>
    </v-row>
    <NuxtLink to="/OrdensServico">
      <img class="btn-pointer mt-5" src="../../assets/sair.png" alt="Sair" />
    </NuxtLink>
  </v-container>
</template>

<script setup>
const { $toast } = useNuxtApp();
const route = useRoute();
const { id } = route.params;

const config = useRuntimeConfig();
const createOs = `${config.public.managemant}/createOrdensServico`;

const cartorio_id = ref(useCookie("user-data").value.cartorio_id);
const pessoa_id = ref(useCookie("user-data").value.usuario_id);

const state = reactive({
  nacionalidade: "BRASILEIRO",
  apresentante_nome: "",
  apresentante_cpf: "",
  user_id:pessoa_id.value,
  cartorio_id:cartorio_id.value
});

const nacionalidade = [
  { title: "BRASILEIRO", value: "brasileiro" },
  { title: "ESTRANGEIRO", value: "estrangeiro" },
];

async function onSubmit() {
  console.log(state)
    const { data, error,status } = await useFetch(
   createOs,
    {
      method: "POST",
      body: state,
    }
  );
}
</script>
