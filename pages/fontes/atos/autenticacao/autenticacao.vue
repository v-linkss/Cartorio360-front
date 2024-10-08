<template>
  <v-card class="mt-10" title="Autenticação">
    <v-container>
      <div style="width: 600px; margin-top: 10px">
        <v-autocomplete
          label="Tabelião/escrivão"
          v-model="state.escrevente"
          :items="escreventesItems"
          item-title="nome"
          item-value="token"
          required
          :error-messages="v$.escrevente.$errors.map((e) => e.$message)"
          @blur="v$.escrevente.$touch"
          @input="v$.escrevente.$touch"
        ></v-autocomplete>
      </div>
      <div style="width: 180px; margin-top: 20px">
        <v-text-field type="number" label="Quantidade" v-model="state.quantidade">
        </v-text-field>
      </div>
      <v-row>
        <div>
          <NuxtLink @click="goBack">
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
    <ErrorModalCard :show="errorModalVisible" :errorMessage="errorMessage" @close="errorModalVisible = false"/>
  </v-card>
</template>

<script setup>
import { useVuelidate } from "@vuelidate/core";
import { helpers, required } from "@vuelidate/validators";

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
const ordemserv_token = ref(useCookie("user-service").value.token).value || ref(useCookie("user-service").value).value;
const usuario_token = useCookie("auth_token").value;
const autenticaAtos = `${config.public.managemant}/atoAutentica`;
const autenticaEtiquetas = `${config.public.managemant}/etiquetaAutentica`;

const errorModalVisible = ref(false);  // Controle de visibilidade do modal
const errorMessage = ref('');  

const state = reactive({
  escrevente:null,
  quantidade:1
})
const escreventesItems = ref([]);

const { data } = await useFetch(allEscreventes, {
  method: "POST",
  body: { cartorio_token: cartorio_token },
});
escreventesItems.value = data.value[0].func_json_escreventes;

const rules = {
  escrevente: {
    required: helpers.withMessage("O campo é obrigatorio", required),
  },
};

const v$ = useVuelidate(rules, state);

const atoAutentica = async () => {
  if (await v$.value.$validate()) {
    const { data:ato_token,status,error } = await useFetch(autenticaAtos, {
      method: "POST",
      body: {
        usuario_token: usuario_token,
        cartorio_token: cartorio_token,
        quantidade: Number(state.quantidade),
        ordemserv_token: ordemserv_token,
        ato_tipo_token:"bFsdV"
      },
    });
    if(status.value === 'success'){
      etiquetaAutentica(ato_token.value.token)
    } else {
      errorModalVisible.value = true;
      errorMessage.value = error.value.data.details
    }
  }
};

const etiquetaAutentica = async (ato_token) => {
  const { data,status} = await useFetch(autenticaEtiquetas, {
    method: "POST",
    body: {
      escrevente_token: state.escrevente,
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

const goBack = () => {
  const origem = route.query.origem || 'criar';
  const id = route.query.id;  
  if (origem === 'atualizar') {
    router.push(`/ordens-servicos/atualizar/${id}`); 
  } else {
    router.push('/ordens-servicos/criar-registro'); 
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
