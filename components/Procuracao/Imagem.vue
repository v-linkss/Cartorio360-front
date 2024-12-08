<template>
  <div>
    <h1>imagem</h1>
    <v-btn color="red" size="large" @click="goBack">Voltar</v-btn>
  </div>
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
const baixarDocumento = `${config.public.managemant}/download`;

const { data, status } = await useFetch(baixarDocumento, {
  method: "POST",
  body: { bucket: "cartorio-1", path: "ato-xkyaA/ato-xkyaA" },
});

console.log(data.value);
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
