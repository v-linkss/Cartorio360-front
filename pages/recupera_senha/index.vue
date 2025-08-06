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


        <v-text-field
          v-model="recoveryCode"
          class="input mt-5"
          :type="text"
          density="compact"
          style="background-color: aliceblue"
          hide-details
          placeholder="Código de verificação"
          variant="outlined"
        />

        <v-text-field
          v-model="novaSenha"
          class="input mt-5"
          :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
          :type="visible ? 'text' : 'password'"
          density="compact"
          style="background-color: aliceblue"
          hide-details
          placeholder="Nova Senha"
          prepend-inner-icon="mdi-lock-outline"
          variant="outlined"
          @click:append-inner="visible = !visible"
        />

        <v-text-field
          v-model="confirmarSenha"
          class="input mt-3"
          :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
          :type="visible ? 'text' : 'password'"
          density="compact"
          style="background-color: aliceblue"
          hide-details
          placeholder="Confirmar Senha"
          prepend-inner-icon="mdi-lock-outline"
          variant="outlined"
          @click:append-inner="visible = !visible"
        />
          


        <div>
          <v-btn
            rounded
            class="mb-10 mt-4 ml-1"
            v-bind="activatorProps"
            color="primary"
            v-on:click="alterarSenha"
            v-model="dialog"
            block
            :disabled="!senhasValidas"
          >
            Alterar Senha
          </v-btn>


        </div>
      </v-container>
    </v-col>
    <v-img src="../../assets/Login.jpg" cover></v-img>
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

const novaSenha = ref('');
const confirmarSenha = ref('');

const showPasswordError = ref(false);
const showEmailError = ref(false);
const ShowNoPermissionError = ref(false);
const showError = ref(false);

const showRecoverDialog = ref(false);
const recoveryEmail = ref("");
const senhaInvalida = ref(false);


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

  if (status.value === 'success') {
    $toast.success(data.value.message || 'Código enviado');
    codigoEnviado.value = true;
  } else {
    $toast.error(error.value?.data?.menssage?.details || 'Erro desconhecido');
  }
};

const confirmarCodigo = async () => {
  const { data, status, error } = await useFetch(`${managemant}/verifica_codigo_recuperacao`, {
    method: "POST",
    body: {
      email: recoveryEmail.value,
      code: recoveryCode.value,
    },
  });

  if (status.value === 'success') {
    $toast.success(data.value.message || 'Código verificado com sucesso');
    showRecoverDialog.value = false;
  } else {
    $toast.error(error.value?.data?.menssage?.details || 'Código inválido');
  }
};
const alterarSenha = async () => {
  if (novaSenha.value !== confirmarSenha.value) {
    senhaInvalida.value = true;
    $toast.error("As senhas não coincidem.");
    return;
  }

  senhaInvalida.value = false;

  try {
    const response = await $fetch(`${managemant}/verifica_codigo_recuperacao`, {
      method: "POST",
      body: {
        email: recoveryEmail.value,
        acao: "alterar",
        token: recoveryCode.value,
        senha: novaSenha.value,
      },
    });

    $toast.success(response.message || "Senha alterada com sucesso!");

    // Limpa e fecha o formulário
    showRecoverDialog.value = false;
    codigoEnviado.value = false;
    recoveryEmail.value = "";
    recoveryCode.value = "";
    novaSenha.value = "";
    confirmarSenha.value = "";
  } catch (error) {
    $toast.error(error?.data?.menssage?.details || error?.data?.status_mensagem);
  }
};


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

const senhasValidas = computed(() => {
  return (
    novaSenha.value &&
    confirmarSenha.value &&
    novaSenha.value === confirmarSenha.value
  );
});

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
