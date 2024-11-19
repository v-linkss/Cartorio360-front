<template>
  <v-container>
    <v-row class="mt-5">
      <v-text-field label="Observação" v-model="state.documento">
      </v-text-field>

      <div>
        <img
          class="btn-pointer ml-2"
          src="../../assets/novo.png"
          style="width: 40px; cursor: pointer"
          title="Criar Pessoa"
          @click="createPessoa"
        />
      </div>
    </v-row>

    <v-row>
      <v-col>
        <v-data-table
          style="height: 465px"
          :headers="headers"
          :items="pessoasItems"
        >
          <template v-slot:item.actions="{ item }">
            <div
              style="display: flex; cursor: pointer; justify-content: flex-end"
              @click="redirectToFicha(item)"
              title="Visualizar Ficha"
            >
              <img
                style="width: 30px; height: 30px"
                src="../../assets/visualizar.png"
                alt="Visualizar"
              />
            </div>
          </template>
        </v-data-table>
      </v-col>
    </v-row>

    <v-row>
      <NuxtLink @click="goBack">
        <img
          class="btn-pointer mt-10 mb-5"
          src="../../assets/sair.png"
          alt="Sair"
          style="cursor: pointer"
        />
      </NuxtLink>
    </v-row>
  </v-container>
</template>

<script setup>
const props = defineProps({
  ato_token: {
    type: String,
    required: true,
  },
});

const router = useRouter();
const route = useRoute();
const config = useRuntimeConfig();
const { $toast } = useNuxtApp();
const allEscreventes = `${config.public.managemant}/listarEscrevente`;
const cartorio_token = ref(useCookie("user-data").value.cartorio_token);


const pessoasItems = ref([]);
const escreventesItems = ref([]);
const isModalRegistroOpen = ref(false);


const headers = [
  {
    title: "Data",
    align: "start",
    key: "data",
  },
  {
    title: "Escrevente",
    align: "start",
    key: "nome",
  },
  {
    title: "Observação",
    align: "start",
    key: "nome",
  },

  { value: "actions" },
];

const state = reactive({
  escrevente: null,
  nome: null,
  documento: null,
});

const { data } = await useFetch(allEscreventes, {
  method: "POST",
  body: { cartorio_token: cartorio_token },
});
escreventesItems.value = data.value[0].func_json_escreventes;




const goBack = () => {
  const origem = route.query.origem || "criar";
  const id = route.query.id;
  if (origem === "atualizar") {
    router.push(`/ordens-servicos/atualizar/${id}`);
  } else {
    router.push("/ordens-servicos/criar-registro");
  }
};
</script>
