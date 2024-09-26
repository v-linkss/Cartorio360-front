<template>
  <v-card class="mt-10" title="Autenticação">
    <v-container>
      <div style="width: 600px; margin-top: 10px">
        <v-autocomplete
          label="Tabelião/escrivão"
          v-model="escrevente"
          :items="escreventesItems"
          item-title="nome"
          item-value="token"
        ></v-autocomplete>
      </div>
      <div style="width: 180px; margin-top: 20px">
        <v-text-field type="number" label="Quantidade" v-model="quantidade">
        </v-text-field>
      </div>
      <v-row>
        <div>
          <NuxtLink to="/OrdensServico/criar-registro">
            <img
              class="btn-pointer mt-10 mb-5"
              src="../../../../assets/sair.png"
              alt="Sair"
            />
          </NuxtLink>
        </div>

        <img
          class="btn-pointer mt-10"
          src="../../../../assets/salvar.png"
          @click="atoAutentica"
        />
      </v-row>
    </v-container>
  </v-card>
</template>

<script setup>

// defineProps({
//   token: {
//     type: String,
//     required: true,
//   },
// });

const config = useRuntimeConfig();
const allEscreventes = `${config.public.managemant}/listarEscrevente`;

const cartorio_token = ref(useCookie("user-data").value.cartorio_token).value;
const ordemserv_token = ref(useCookie("user-service").value.token).value;
const usuario_token = useCookie("auth_token").value;
const autenticaAtos = `${config.public.managemant}/atoAutentica`;
const autenticaEtiquetas = `${config.public.managemant}/etiquetaAutentica`;

const escrevente = ref(null)
const escreventesItems = ref([]);
const quantidade = ref(1);

const { data } = await useFetch(allEscreventes, {
  method: "POST",
  body: { cartorio_token: cartorio_token },
});
escreventesItems.value = data.value[0].func_json_escreventes;

const atoAutentica = async () => {
  const { data:ato_token,status } = await useFetch(autenticaAtos, {
    method: "POST",
    body: {
      usuario_token: usuario_token,
      cartorio_token: cartorio_token,
      quantidade: Number(quantidade.value),
      ordemserv_token: ordemserv_token,
      ato_tipo_token:"bFsdV"
    },
  });
  if(status.value === 'success'){

    etiquetaAutentica(ato_token.value.token)
  }
};

const etiquetaAutentica = async (ato_token) => {
  const { data,status} = await useFetch(autenticaEtiquetas, {
    method: "POST",
    body: {
      escrevente_token: escrevente.value,
      cartorio_token: cartorio_token,
      ato_token:ato_token
    },
  });
  if(status.value === 'success'){
    const newWindow = window.open("", "_blank");
    newWindow.document.open();
    newWindow.document.write(data.value.etiqueta);
    newWindow.document.close();
  }
};
</script>

<style scoped>
.btn-pointer {
  width: 50px;
  height: 50px;
  margin-left: 25px;
  margin-top: 20px;
  cursor: pointer;
}
</style>
