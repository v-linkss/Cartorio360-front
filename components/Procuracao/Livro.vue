<template>
  <div class="d-flex align-center justify-center">
    <div>
      <v-img
        class="mt-10 mb-5"
        :aspect-ratio="1"
        src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"
        width="600"
        cover
      ></v-img>
      <v-card>
      <div ref="livro" style="height: 600px; overflow-y: auto;"></div>
    </v-card>
    </div>
    <img
          @click="isModalCondOpen = true"
          class="ml-15"
          style="height: 40px; width: 40px; cursor: pointer"
          src="../../assets/lavrar.png"
        >
        </img>
  </div>
  <v-btn color="red" size="large" @click="goBack">Voltar</v-btn>
  <ModalConfirmacao :show="isModalCondOpen" :condMessage="condMessage" @close="isModalCondOpen = false"/>
</template>

<script setup>
const props = defineProps({
  ato_token: {
    type: String,
    required: true,
  },
});
const config = useRuntimeConfig();
const { $toast } = useNuxtApp();
const router = useRouter();
const route = useRoute();
const condMessage = ref('Ao lavrar esse ato, a operação não poderá ser desfeita. Confirma ?')
const baixarDocumento = `${config.public.managemant}/download`;
const isModalCondOpen = ref(false)
const livro = ref("https://www.cartorio360.com.br:24468/cartorio-1/ato-xkyaA/ato-xkyaA-2024-12-08T17%3A50%3A42.813Z.docx?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=33a9bf3d4c%2F20241210%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20241210T124214Z&X-Amz-Expires=600000&X-Amz-SignedHeaders=host&X-Amz-Signature=1d5fbe3cb7817eff4067be8e473853791dad62904cbb8f7d4eefca960450731b")

const { data, status } = await useFetch(baixarDocumento, {
  method: "POST",
  body: { bucket: useCookie("user-data").value.cartorio_token.toLowerCase(), path: "ato/Yuz2x/ato_minuta-2024-12-10T12:07:12.265Z" },
});
console.log(data.value)
const goBack = () => {
  const origem = route.query.origem || "criar";
  const id = route.query.id;
  if (origem === "atualizar") {
    router.push(`/os/atualizar/${id}`);
  } else {
    router.push("/os/criar-registro");
  }
};
</script>
