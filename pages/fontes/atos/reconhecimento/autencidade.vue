<template>
  <div>
    <h1>Reconhecimento por Autencidade</h1>
  </div>
</template>
<script setup>

const props = defineProps({
  ato_token:{
    type: String,
    required: true
  }
});

const router = useRouter();
const route = useRoute();

const goBack = () => {
  const origem = route.query.origem || "criar";
  const id = route.query.id;
  if (origem === "atualizar") {
    router.push(`/ordens-servicos/atualizar/${id}`);
  } else {
    router.push("/ordens-servicos/criar-registro");
  }
};
</script>
