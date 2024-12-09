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

const { data, status } = await useFetch(baixarDocumento, {
  method: "POST",
  body: { bucket: "cartorio-1", path: "ato-xkyaA/ato-xkyaA" },
});

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
