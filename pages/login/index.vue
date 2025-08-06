<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <v-row style="background-color: #0a063b">
    <v-col cols="5" class="d-flex align-center justify-center">
      <v-container style="max-width: 650px">
        <center>
          <v-img
            style="margin-bottom: 30px"
            :width="400"
            :height="330"
            src="../../assets/logo_login.png"
          ></v-img>
        </center>
        <div class="text">Login</div>

        <v-text-field
          autofocus
          autocomplete="email"
          type="email"
          v-model="loginData.email"
          persistent-hint
          class="input mb-5"
          style="background-color: aliceblue"
          hide-details
          density="compact"
          placeholder="Email"
          prepend-inner-icon="mdi-email-outline"
          variant="outlined"
        ></v-text-field>

        <v-text-field
          v-model="loginData.senha"
          class="input"
          :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
          :type="visible ? 'text' : 'password'"
          density="compact"
          style="background-color: aliceblue"
          hide-details
          placeholder="Senha"
          prepend-inner-icon="mdi-lock-outline"
          variant="outlined"
          @click:append-inner="visible = !visible"
        ></v-text-field>

        <v-dialog v-model="dialog" max-width="400" persistent>
          <template v-slot:activator="{ props: activatorProps }">
            <v-btn
              rounded
              class="mb-10 mt-4 ml-1"
              v-bind="activatorProps"
              color="primary"
              v-on:click="login"
              v-model="dialog"
              block
            >
              Acessar
            </v-btn>
          </template>

          <v-card v-if="showPasswordError" text="Senha inválida.">
            <template v-slot:actions>
              <v-spacer></v-spacer>

              <v-btn
                @click="closeAlert"
                style="background-color: #429946; color: white"
              >
                OK
              </v-btn>
            </template>
          </v-card>
          <v-card v-if="showEmailError" text="Esse email não está cadastrado.">
            <template v-slot:actions>
              <v-spacer></v-spacer>

              <v-btn
                @click="closeAlert"
                style="background-color: #429946; color: white"
              >
                OK
              </v-btn>
            </template>
          </v-card>
          <v-card v-if="showError" text="Erro no sistema, fora do ar.">
            <template v-slot:actions>
              <v-spacer></v-spacer>

              <v-btn
                @click="closeAlert"
                style="background-color: #429946; color: white"
              >
                OK
              </v-btn>
            </template>
          </v-card>
          <v-card
            v-if="ShowNoPermissionError"
            text="Seu cadastro está desativado. Entre em contato com o administrador da conta."
          >
            <template v-slot:actions>
              <v-spacer></v-spacer>

              <v-btn
                @click="closeAlert"
                style="background-color: #429946; color: white"
              >
                OK
              </v-btn>
            </template>
          </v-card>
        </v-dialog>
        <div>
          <a
            class="text-decoration-none"
            rel="noopener noreferrer"
            style="color: white; margin-left: 10px"
            @click="showRecoverDialog = true"
          >
            Esqueceu a senha?
          </a>

        </div>
      </v-container>
    </v-col>
    <v-img src="../../assets/Login.jpg" cover></v-img>
  
    <v-dialog v-model="showRecoverDialog" max-width="500">
      <v-card>
        <v-card-title>Recuperar senha</v-card-title>
        <v-card-text>
  '        <v-text-field
            v-model="recoveryEmail"
            :readonly="codigoEnviado"
            type="email"
            label="Digite seu email"
            prepend-inner-icon="mdi-email-outline"
          />
        </v-card-text>'
        <v-card-actions>
  <v-spacer />
  
  <!-- Botão verde (Enviar ou Confirmar) -->
  <v-btn
    class="bg-green text-white"
    @click="codigoEnviado ? confirmarCodigo() : enviarCodigo()"
  >
    {{ codigoEnviado ? 'Confirmar' : 'Enviar' }}
  </v-btn>

  <!-- Botão vermelho (Cancelar) -->
  <v-btn
    class="bg-red text-white"
    @click="showRecoverDialog = false; codigoEnviado = false"
  >
    Cancelar
  </v-btn>
</v-card-actions>


      </v-card>
    </v-dialog>

  </v-row>
</template>

<script setup>
import toast from '~/plugins/toast';

definePageMeta({
  layout: "false",
});
const router = useRouter();
const { $toast } = useNuxtApp();
const loginData = ref({
  senha: "",
  email: "",
});

const visible = ref(false);
const dialog = ref(false);

const showPasswordError = ref(false);
const showEmailError = ref(false);
const ShowNoPermissionError = ref(false);
const showError = ref(false);

const showRecoverDialog = ref(false);
const recoveryEmail = ref("");

const closeAlert = () => {
  showPasswordError.value = false;
  showEmailError.value = false;
  showError.value = false;
  ShowNoPermissionError.value = false;
  dialog.value = false;
};
const config = useRuntimeConfig();
const listarMenu = `${config.public.auth}/service/gerencia/listarMenu`;
const auth = config.public.auth;
const managemant = config.public.managemant;

const codigoEnviado = ref(false);
const recoveryCode = ref("");
const authenticateUser = async () => {
  const { data, status, error } = await fetchWithToken(`${auth}/login`, {
    method: "POST",
    body: {
      senha: loginData.value.senha,
      email: loginData.value.email,
    },
  });

  return { data: data?.value, status: status?.value, error: error?.value };
};

const setCookies = (userInfo) => {
  const userCookie = useCookie("user-data");
  userCookie.value = JSON.stringify({
    nome: userInfo.nome,
    usuario_id: userInfo.id,
    cartorio_id: userInfo.cartorios[0].cartorio_id,
    cartorio_nome: userInfo.cartorios[0].cartorio_descricao,
    cartorio_token: userInfo.cartorios[0].cartorio_token,
  });

  const tokenCookie = useCookie("auth_token");
  tokenCookie.value = userInfo.token;
};

const handleErrors = (error) => {
  const errorData = error?.data?.[0]?.func_autentica_acesso_v1?.[0];
  const statusMessage = errorData?.status_mensagem;

  if (!errorData) {
    showError.value = true;
    return;
  }

  switch (statusMessage) {
    case "Esse email não está cadastrado no Durabil.":
      showEmailError.value = true;
      break;
    case "Senha inválida.":
      showPasswordError.value = true;
      break;
    case "Seu cadastro está desativado. Entre em contato com o administrador da conta.":
      ShowNoPermissionError.value = true;
      break;
    default:
      showError.value = true;
      break;
  }
};

const login = async () => {
  const { data, status, error } = await authenticateUser();

  if (status === "success") {
    const userInfo = data?.[0]?.func_autentica_acesso_v1?.[0]?.registro?.[0];
    useCartoriosStore().cartorioInfos = userInfo;
    setCookies(userInfo);

    if (userInfo.cartorios.length > 1) {
      router.push({
        path: "/login/tipo-perfil",
      });
      return;
    }
    $toast.success("Login realizado com sucesso!");
    const { data: menuItems, status: statusMenu } = await fetchWithToken(
      listarMenu,
      {
        method: "POST", 
        body: { usuario_id: userInfo.id ,perfil_descricao: userInfo.cartorios[0].perfil_descricao },
      }
    );
    if (statusMenu.value === "success") {
      const menuItemsCookie = useCookie("menu-navbar");
      menuItemsCookie.value = menuItems.value;
      router.push({
        path: "/",
      });
    }
  } else {
    if (status === "error" && error?.statusCode === 500) {
      showError.value = true;
    } else {
      handleErrors(error);
    }
  }
};

const enviarCodigo = async () => {
  const { data, status, error } = await useFetch(`${managemant}/recupera_senha`, {
    method: "POST",
    body: {
      email: recoveryEmail.value,
      acao: "gerar",
    },
  });
  console.log(data)
  if (data.value.status === 'OK') {
    $toast.success(data.value.status_mensagem || 'Código enviado');
    codigoEnviado.value = true;
    router.push('/recupera_senha');

  } else {
    $toast.error(error.value?.data?.menssage?.details || 'Erro desconhecido');
  }
};

// const confirmarCodigo = async () => {
//   const { data, status, error } = await useFetch(`${managemant}/verifica_codigo_recuperacao`, {
//     method: "POST",
//     body: {
//       email: recoveryEmail.value,
//       code: recoveryCode.value,
//     },
//   });

//   if (status.value === 'success') {
//     $toast.success(data.value.message || 'Código verificado com sucesso');
//     showRecoverDialog.value = false;
//     router.push('/recupera_senha');

//   } else {
//     $toast.error(error.value?.data?.menssage?.details || 'Código inválido');
//   }
// };


// const enviarCodigo = async () => {
//   const { data, status, error } = await useFetch(`${managemant}/recupera_senha`, {
//     method: "POST",
//     body: {
//       email: recoveryEmail.value,
//       acao: "gerar",
//     },
//   });
//   console.log(status.value)
//   if(status.value ===  'success') {
//     $toast.success(data.value.message)
//   } else {
//     $toast.error(error.value.data.menssage?.details || 'Erro desconhecido');
//   }
//   // const retorno = data.value?.func_recupera_senha?.[0];
//   // if (retorno?.statis === "ERRO") {
//   //   $toast.error(retorno.status_mensagem);
//   // } else {
//   //   $toast.success(retorno.status_mensagem);
//   //   showRecoverDialog.value = false;
//   // }
// };

</script>
<style scoped>
.input {
  margin-left: 10px;
}
.text {
  font-size: 25px;
  font-family: "calibri";
  color: white;
  margin-bottom: 30px;
  margin-left: 10px;
}
</style>
