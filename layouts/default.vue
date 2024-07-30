<template>
    <v-app>
      <v-app-bar class="menu-texts" color="#C8FCCA" height="85">
        <v-spacer></v-spacer>
        <v-menu>
          <template v-slot:activator="{ props }">
            <v-btn class="text" v-bind="props"> Tela Principal </v-btn>
          </template>
        </v-menu>
        <v-menu>
          <template v-slot:activator="{ props }">
            <v-btn class="text" v-bind="props"> Cadastros </v-btn>
          </template>
        </v-menu>
        <v-menu>
          <template v-slot:activator="{ props }">
            <v-btn class="text" v-bind="props"> Financeiro</v-btn>
          </template>
        </v-menu>
        <v-menu>
          <template v-slot:activator="{ props }">
            <v-btn class="text" v-bind="props"> Relatórios </v-btn>
          </template>
        </v-menu>
        <v-menu>
          <template v-slot:activator="{ props }">
            <v-btn class="text" v-bind="props"> Operação </v-btn>
          </template>
        </v-menu>
      </v-app-bar>
      <v-main>

        <v-container>
          <slot></slot>
        </v-container>
      </v-main>
    </v-app>
  </template>
  

  <style scoped>
  .menu-texts .v-btn {

  color: #429946; /* Texto branco para contraste */
}
</style>
  