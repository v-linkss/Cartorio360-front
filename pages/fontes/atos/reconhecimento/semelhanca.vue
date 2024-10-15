<template>
  <h1>Reconhecimento por Semelhança</h1>
  <v-row class="mt-5">
    <v-col cols="5">
      <v-autocomplete
        label="Tabelião/escrevente"
        v-model="state.escrevente"
        :items="escreventesItems"
        item-title="nome"
        item-value="token"
      >
      </v-autocomplete>
    </v-col>
    <v-col cols="2">
      <v-text-field label="Quantidade" type="number" v-model="state.quantidade">
      </v-text-field>
    </v-col>
  </v-row>

  <v-row>
    <v-col cols="3">
      <v-text-field label="Documento"> </v-text-field>
    </v-col>
    <v-col cols="4">
      <v-text-field label="Pessoa"> </v-text-field>
    </v-col>
    <div>
      <img
        class="btn-pointer mt-3"
        src="../../../../assets/visualizar.png"
        style="width: 40px"
      />
    </div>
  </v-row>
  <v-row>
    <v-col class="mr-10">
      <v-data-table
        :headers="headers"
        style="height: 465px"
        show-select
        item-key="id"
      >
      </v-data-table>
    </v-col>

    <v-col>
      <v-data-table :headers="headers"  style="height: 465px"  item-key="id">
        <template v-slot:item.actions="{ item }">
          <div
            style="display: flex; justify-content: flex-end"
            @click="removeFormValueFromTable(item)"
            title="Remover"
          >
            <img
              style="width: 30px; height: 30px; cursor: pointer"
              src="../../../../assets/mudarStatus.png"
              alt="Remover"
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
        src="../../../../assets/sair.png"
        alt="Sair"
        style="cursor: pointer"
      />
    </NuxtLink>

    <div>
      <img class="btn-pointer mt-10 mb-5" src="../../../../assets/salvar.png" />
    </div>
  </v-row>
</template>
<script setup>
// defineProps({
//   token: {
//     type: String,
//     required: true,
//   },
// });

const router = useRouter();
const route = useRoute();
const config = useRuntimeConfig();
const allEscreventes = `${config.public.managemant}/listarEscrevente`;
const cartorio_token = ref(useCookie("user-data").value.cartorio_token).value;

const headers = [
  {
    title: "Pessoa",
    align: "start",
    key: "name",
  },
  { value: "actions" },
];

const state = reactive({
  escrevente: null,
  quantidade: 1,
});

const escreventesItems = ref([]);

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
