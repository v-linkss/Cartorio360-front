<template>
  <v-app>
    <v-app-bar color="#0a063b" height="100">
      <div>
        <img
          class="ml-5 mt-2"
          :width="300"
          :height="50"
          src="../assets/logo_navbar.png"
        />
        <h3 style="color: white; margin-left: 30px">
          {{ useCookie("user-data").value.cartorio_nome }}
        </h3>
      </div>
      <v-spacer></v-spacer>

      <!-- Loop de menus -->
      <v-menu v-for="(menu, index) in menuName" :key="index">
        <template v-slot:activator="{ props }">
          <v-btn style="color: white" v-bind="props">
            {{ menu.name }}
          </v-btn>
        </template>
        <v-list>
          <!-- Submenu: itera sobre as subchaves de cada menu -->
          <v-list-item
            v-for="(subMenu, subIndex) in menu.subMenus"
            :key="subIndex"
            :value="subMenu.url"
          >
            <NuxtLink
              style="text-decoration: none; color: inherit"
              :to="`/${subMenu.url}`"
            >
              <v-list-item-title>{{ subMenu.name }}</v-list-item-title>
            </NuxtLink>
          </v-list-item>
        </v-list>
      </v-menu>

      <!-- Menu de usuário -->
      <div class="flex flex-col justify-center align-center mt-6">
        <v-menu>
          <template v-slot:activator="{ props }">
            <v-btn class="user" v-bind="props">
              {{ useCookie("user-data").value.nome }}
            </v-btn>
          </template>
          <v-list>
            <v-list-item
              v-for="(item, index) in items"
              :key="index"
              @click="itemClick(item.title)"
            >
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        <h4 class="mt-1">
          CPF: <span>{{ cpf }}</span>
        </h4>
      </div>
    </v-app-bar>

    <!-- Corpo da página -->
    <v-main>
      <slot></slot>
    </v-main>
  </v-app>
</template>

<script setup>
import CryptoJS from "crypto-js";
const router = useRouter();
const items = [{ title: "Alterar Senha" }, { title: "Sair" }];
const userData = useCookie("user-data").value;
const SECRET_KEY = useRuntimeConfig().public.docEditor;

const decryptData = (ciphertext) => {
  const bytes = CryptoJS.AES.decrypt(ciphertext, SECRET_KEY);
  const decrypted = bytes.toString(CryptoJS.enc.Utf8);
  return JSON.parse(decrypted);
};

const cpf = userData.cpf ? decryptData(userData.cpf) : null;
const tipoPerfilData = useCookie("menu-navbar");

const menuName = ref(
  Object.keys(tipoPerfilData.value || {})
    .filter((key) => key !== "Tela Principal")
    .map((key) => ({
      name: key,
      subMenus: Object.keys(tipoPerfilData.value[key]).map((subKey) => ({
        name: subKey,
        url: tipoPerfilData.value[key][subKey].url,
      })),
    }))
);

function itemClick(title) {
  if (title === "Sair") {
    logout();
  } else if (title === "Alterar Senha") {
    // Placeholder para a funcionalidade de Alterar Senha
  }
}

function logout() {
  useCookie("user-data").value = "";
  useCookie("auth_token").value = "";
  router.push("/login");
}
</script>

<style scoped>
.menu-texts .v-btn {
  color: #429946;
}
.user {
  background-color: #ffffff;
  color: #73777a;
}
</style>
