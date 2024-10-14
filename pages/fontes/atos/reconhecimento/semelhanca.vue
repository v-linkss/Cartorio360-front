<template>
  <v-row>
    <v-col cols="7">
      <h1>Reconhecimento por Semelhança</h1>
      <v-row class="mt-5">
        <v-col cols="8">
          <v-autocomplete
            label="Tabelião/escrevente"
            v-model="state.escrevente"
            :items="escreventesItems"
            item-title="nome"
            item-value="token"
          >
          </v-autocomplete>
        </v-col>
        <v-col cols="3">
          <v-text-field
            label="Quantidade"
            type="number"
            v-model="state.quantidade"
          >
          </v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="4">
          <v-text-field label="Documento"> </v-text-field>
        </v-col>
        <v-col cols="6">
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

      <v-data-table :headers="headers" :items="items" show-select item-key="id">
      </v-data-table>

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
          <img
            class="btn-pointer mt-10 mb-5"
            src="../../../../assets/salvar.png"
          />
        </div>
      </v-row>
    </v-col>
    <v-col cols="5">
      <v-data-table class="mt-5" :headers="headers" :items="items" item-key="id">
      </v-data-table>
    </v-col>
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
          title: 'Pessoa',
          align: 'start',
          key: 'name',
        },
       
      ]
const items = [
        {
          name: 'Intel Core i9-11900K',
          cores: 8,
          threads: 16,
          baseClock: '3.5 GHz',
          boostClock: '5.3 GHz',
          tdp: '125W',
        },
        {
          name: 'AMD Ryzen 9 5950X',
          cores: 16,
          threads: 32,
          baseClock: '3.4 GHz',
          boostClock: '4.9 GHz',
          tdp: '105W',
        },
        {
          name: 'Intel Core i7-10700K',
          cores: 8,
          threads: 16,
          baseClock: '3.8 GHz',
          boostClock: '5.1 GHz',
          tdp: '125W',
        },
        {
          name: 'AMD Ryzen 5 5600X',
          cores: 6,
          threads: 12,
          baseClock: '3.7 GHz',
          boostClock: '4.6 GHz',
          tdp: '65W',
        },
        {
          name: 'Intel Core i5-10600K',
          cores: 6,
          threads: 12,
          baseClock: '4.1 GHz',
          boostClock: '4.8 GHz',
          tdp: '125W',
        },
        {
          name: 'AMD Ryzen 7 5800X',
          cores: 8,
          threads: 16,
          baseClock: '3.8 GHz',
          boostClock: '4.7 GHz',
          tdp: '105W',
        },
        {
          name: 'Intel Core i3-10100',
          cores: 4,
          threads: 8,
          baseClock: '3.6 GHz',
          boostClock: '4.3 GHz',
          tdp: '65W',
        },
        {
          name: 'AMD Ryzen 3 3300X',
          cores: 4,
          threads: 8,
          baseClock: '3.8 GHz',
          boostClock: '4.3 GHz',
          tdp: '65W',
        },
        {
          name: 'Intel Pentium Gold G6400',
          cores: 2,
          threads: 4,
          baseClock: '4.0 GHz',
          tdp: '58W',
        },
        {
          name: 'AMD Athlon 3000G',
          cores: 2,
          threads: 4,
          baseClock: '3.5 GHz',
          tdp: '35W',
        },
      ]
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
