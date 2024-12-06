<template>
  <v-app>
    <v-app-bar color="#f5f2f2" height="85">
      <h5 style="color: #525050; margin-left: 30px">
        {{ useCookie("user-data").value.cartorio_nome }}
      </h5>
      <v-spacer></v-spacer>

      <!-- Loop de menus -->
      <v-menu v-for="(menu, index) in menuName" :key="index">
        <template v-slot:activator="{ props }">
          <v-btn style="color: #525050" v-bind="props">
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
    </v-app-bar>

    <!-- Corpo da página -->
    <v-main>
      <v-container>
        <slot></slot>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
const router = useRouter();
const items = [{ title: "Alterar Senha" }, { title: "Sair" }];

const tipoPerfilData = useCookie("menu-navbar");

const menuName = ref(
  Object.keys(tipoPerfilData.value || {})
    .filter(key => key !== "Tela Principal")
    .map(key => ({
      name: key,
      subMenus: Object.keys(tipoPerfilData.value[key]).map(subKey => ({
        name: subKey,
        url: tipoPerfilData.value[key][subKey].url
      }))
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
