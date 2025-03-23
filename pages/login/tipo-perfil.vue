<template>
  <v-row style="background-color:#0a063b;">
    <v-col cols="5" class="d-flex align-center justify-center">
      <v-container>
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
          :items="cartorios"
           style="background-color: aliceblue; margin-left: 90px;"
          item-title="cartorio_descricao"
          item-value="perfil_descricao"
          label="Selecione uma opção"
          width="570"
        />
        <v-btn
          rounded
          @click="acessarSistema()"
          color="primary"
          style="margin-bottom: 220px; margin-top: 30px;width: 570px; margin-left: 90px"
          >Acessar</v-btn
        >
      </v-container>
    </v-col>

    <v-img src="../../assets/Login.jpg" cover></v-img>
  </v-row>
</template>

<script setup>
const cartorioStore = useCartoriosStore()
const router = useRouter();
const config = useRuntimeConfig();
const listarMenu = `${config.public.auth}/service/gerencia/listarMenu`;
definePageMeta({
  layout: "false",
});

const cartorios = cartorioStore.cartorioInfos
const perfil_descricao = ref(null);
const acessarSistema = async () => {
  const { data: menuItems, status } = await fetchWithToken(listarMenu, {
    method: "POST",
    body: { perfil_descricao: perfil_descricao.value },
  });
  const menuItemsCookie = useCookie("menu-navbar");
  menuItemsCookie.value = menuItems.value
  if(status.value ==='success'){
    router.push("/");
  }
};
</script>
