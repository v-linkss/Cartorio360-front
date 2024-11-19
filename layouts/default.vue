<template>
  <v-app>
    <v-app-bar color="#C8FCCA" height="85">
      <h5 style="color: #429946; margin-left: 30px">
        {{ useCookie("user-data").value.cartorio_nome }}
      </h5>
      <v-spacer></v-spacer>
      <v-menu>
        <template v-slot:activator="{ props }">
          <v-btn style="color: #429946" v-bind="props"> Cadastros </v-btn>
        </template>
        <v-list>
          <v-list-item >
            <NuxtLink style="text-decoration: none; color: inherit;" to="/pessoas/registros"> Pessoas </NuxtLink>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-menu>
        <template v-slot:activator="{ props }">
          <v-btn style="color: #429946" v-bind="props"> Atendimento </v-btn>
        </template>
        <v-list>
          <v-list-item >
            <NuxtLink style="text-decoration: none; color: inherit;" to="/ordens-servicos"> Ordens de Serviços </NuxtLink>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-menu>
        <template v-slot:activator="{ props }">
          <v-btn class="user" v-bind="props"
            >{{ useCookie("user-data").value.nome }}
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="(item, index) in items"
            :key="index"
            :value="index"
            @click="itemClick(item.title)"
          >
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
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

function itemClick(title) {
  if (title === "Sair") {
    logout();
  } else if (title === "Alterar Senha") {
    // Adicione lógica para alterar a senha
  }
}

function logout() {
  // Limpe os cookies  
  useCookie("user-data").value ='';
  useCookie("auth_token").value ='';
  router.push("/login");

}
</script>

<style scoped>
.menu-texts .v-btn {
  color: #429946; /* Texto branco para contraste */
}
.user {
  background-color: #ffffff;
  color: #73777a;
}
</style>
