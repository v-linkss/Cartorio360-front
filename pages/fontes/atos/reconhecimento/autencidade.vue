<template>
  <div>
    <h1>Reconhecimento por Autencidade</h1>
    <div>
      <NuxtLink @click="goBack">
        <img
          class="btn-pointer mt-10 mb-5"
          src="../../../../assets/sair.png"
          alt="Sair"
          style="cursor: pointer;"
        />
      </NuxtLink>
    </div>
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
