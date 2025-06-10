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
        <v-autocomplete
          v-model="perfil_descricao"
          variant="outlined"
          :items="perfis"
          style="background-color: aliceblue"
          item-title="cartorio_descricao"
          item-value="perfil_descricao"
          label="Selecione uma opção"
          return-object
        />
        <v-btn
          rounded
          @click="acessarSistema()"
          color="primary"
          style="margin-bottom: 220px; margin-top: 30px"
          block
          >Acessar</v-btn
        >
      </v-container>
    </v-col>

    <v-img src="../../assets/Login.jpg" cover></v-img>
  </v-row>
</template>

<script setup>
const cartorioStore = useCartoriosStore();
const router = useRouter();
const config = useRuntimeConfig();
const listarMenu = `${config.public.auth}/service/gerencia/listarMenu`;
definePageMeta({
  layout: "false",
});
const perfis = cartorioStore.cartorioInfos.cartorios;
const user_id = cartorioStore.cartorioInfos.id;
const perfil_descricao = ref(null);

console.log(perfil_descricao.value);
const acessarSistema = async () => {
  const { data: menuItems, status } = await fetchWithToken(listarMenu, {
    method: "POST",
    body: { usuario_id: cartorioStore.cartorioInfos.id , perfil_descricao: perfil_descricao.value },

  });
  const menuItemsCookie = useCookie("menu-navbar");
  menuItemsCookie.value = menuItems.value;
  if (status.value === "success") {
    router.push("/");
  }
};
</script>

