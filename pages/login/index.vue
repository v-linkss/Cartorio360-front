<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="container-main">
    <div class="container-form">
      <v-img
        class="image"
        :width="300"
        height="230"
        src="../../assets/cartorio_logo.jpeg"
      ></v-img>
      <div class="text">Log in</div>
      <v-text-field
        autofocus
        autocomplete="email"
        type="email"
        v-model="loginData.email"
        persistent-hint
        class="input"
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
        placeholder="Senha"
        prepend-inner-icon="mdi-lock-outline"
        variant="outlined"
        @click:append-inner="visible = !visible"
      ></v-text-field>
      <v-dialog v-model="dialog" max-width="400" persistent>
        <template v-slot:activator="{ props: activatorProps }">
          <v-btn
            block
            rounded
            class="button mb-10 mt-4"
            v-bind="activatorProps"
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
      </v-dialog>
      <a
        class="text-decoration-none"
        rel="noopener noreferrer"
        style="color: #429946"
      >
        Esqueceu a senha?</a
      >
    </div>

    <div class="background-image"></div>
  </div>
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
const showError = ref(false);

const closeAlert = () => {
  showPasswordError.value = false;
  showEmailError.value = false;
  showError.value = false;
  dialog.value = false;
};
const config = useRuntimeConfig();
const auth = config.public.auth;

const login = async () => {
  const {
    data: responseData,
    status,
    error,
  } = await useFetch(auth, {
    method: "POST",
    body: {
      senha: loginData.value.senha,
      email: loginData.value.email,
    },
  });
  if (status.value === "success") {
    const userInfo =
      responseData.value[0].func_autentica_acesso_v1[0].registro[0];

    const userCookie = useCookie("user-data");
    userCookie.value = userCookie.value = JSON.stringify({
      nome: userInfo.nome,
      usuario_id: userInfo.id,
      cartorio_id: userInfo.cartorios[0].cartorio_id,
      cartorio_nome: userInfo.cartorios[0].cartorio_descricao,
      cartorio_token: userInfo.cartorios[0].cartorio_token,
    });

    $toast.success("Login realizado com sucesso!");
    const tokenAuth =
    responseData.value[0].func_autentica_acesso_v1[0].registro[0].token;
    const tokenCookie = useCookie("auth_token");
    tokenCookie.value = tokenAuth;

    router.push("/home")
  } else {
    if (status.value === 'error' && error.value.statusCode === 500){
    (showError.value = true);
  } 
    const errorData = error.value.data[0].func_autentica_acesso_v1[0];
    switch (errorData.status_mensagem) {
      case "Esse email não está cadastrado no Durabil.":
        showEmailError.value = true;
        break;
      case "Senha inválida.":
        showPasswordError.value = true;
        break;
      default:
        if (errorData.error === "Erro ao autenticar usuário") {
          showError.value = true;
        }
        break;
    }
  }
};
</script>
<style scoped>
.input {
  width: 500px;
}

.text {
  font-size: 25px;
  font-family: "calibri";
  color: #429946;
  margin-bottom: 30px;
}
.button {
  background-color: #429946;
  color: white;
}
.container-form {
  width: 500px;
  height: 650px;
}

.container-main {
  margin-left: 20px;
  display: flex;
  align-items: center;
  height: 846px;
}

.background-image {
  margin-left: 20px;
  width: 80%;
  height: 100%;
  background-image: url("../../assets/Login.jpg");
  background-size: cover;
  background-position: center;
  flex: 1;
}
.image {
  display: flex;
  margin-left: 120px;
  justify-content: center;
}
</style>
