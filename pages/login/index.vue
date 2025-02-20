<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <v-row style="background-color:#0a063b;">
    <v-col cols="5" class="ml-5 d-flex align-center justify-center">
      <v-container >
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
          style="background-color: aliceblue;"
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
          style="background-color: aliceblue;"
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
              class="mb-10 mt-4"
              style="width: 570px; margin-left: 90px;"
              v-bind="activatorProps"
              color="primary"
              v-on:click="login"
              v-model="dialog"
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
            style="color: white;margin-left: 90px;"
          >
            Esqueceu a senha?</a
          >
        </div>
      </v-container>
    </v-col>
    <v-img src="../../assets/Login.jpg" cover></v-img>
  </v-row>
</template>

<script setup>
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
    useCartoriosStore().cartorioInfos = userInfo.cartorios;
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
        body: { perfil_descricao: userInfo.cartorios[0].perfil_descricao },
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
</script>
<style scoped>
.input {
  margin-left: 90px;
  width: 570px;
}
.text {
  font-size: 25px;
  font-family: "calibri";
  color: white;
  margin-bottom: 30px;
  margin-left: 90px;
}

</style>
