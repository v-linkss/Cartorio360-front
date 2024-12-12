<template>
  <v-row>
    <v-col cols="4" class="d-flex align-center justify-center">
      <v-container>
        <center>
          <v-img
            style="margin-bottom: 30px"
            :width="300"
            :height="230"
            src="../../assets/cartorio_logo.jpeg"
          ></v-img>
        </center>
        <v-autocomplete
          v-model="perfil_descricao"
          variant="outlined"
          :items="cartorios"
          item-title="perfil_descricao"
          item-value="perfil_descricao"
          label="Selecione uma opção"
        />
        <v-btn
          @click="acessarSistema()"
          color="green"
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
const router = useRouter();
const route = useRoute();
const config = useRuntimeConfig();
const listarMenu = `${config.public.managemant}/listarMenu`;
definePageMeta({
  layout: "false",
});

const cartorios = JSON.parse(route.query.cartorios || "[]");
const perfil_descricao = ref(null);

const acessarSistema = async () => {
  const { data: menuItems, status } = await useLazyFetch(listarMenu, {
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
