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
    <div>
      <img
        @click="isModalCondOpen = true"
        class="ml-15"
        style="height: 40px; width: 40px; cursor: pointer"
        src="../../assets/lavrar.png"
      />
      <v-card v-if="lavraData" class="ml-8 mt-5">
        <v-row no-gutters>
          <v-col>
            <v-sheet style="font-weight: bold;" class="pa-2 ma-2">
              Livro: {{ lavraData[0].livro_numero }}
            </v-sheet>
          </v-col>
          <v-col>
            <v-sheet style="font-weight: bold;" class="pa-2 ma-2">
              Folhas : {{ lavraData[0].pagina_inicial }} Á
              {{ lavraData[0].pagina_final }}
            </v-sheet>
          </v-col>
        </v-row>
        <!-- <div>
          <div v-html="selo">

          </div>
        </div> -->
      </v-card>
    </div>
  </div>
  <v-btn color="red" size="large" @click="goBack">Voltar</v-btn>
  <ModalConfirmacao
    :show="isModalCondOpen"
    :condMessage="condMessage"
    @close="isModalCondOpen = false"
    @confirm="confirmLavrar"
  />
</template>

<script setup>
const props = defineProps({
  ato_token: {
    type: String,
    required: true,
  },
  pages: {
    type: Number,
    required: true,
  },
});

const config = useRuntimeConfig();
const { $toast } = useNuxtApp();
const router = useRouter();
const route = useRoute();
const baixarDocumento = `${config.public.managemant}/download`;
const lavraAtoLivro = `${config.public.managemant}/lavrarAto`;
const condMessage = ref(
  "Ao lavrar esse ato, a operação não poderá ser desfeita. Confirma ?"
);
const isModalCondOpen = ref(false);
const lavraData = ref(null);
const selo = ref(null);

const { data, status } = await useFetch(baixarDocumento, {
  method: "POST",
  body: { bucket: "cartorio-1", path: "ato-xkyaA/ato-xkyaA" },
});

const lavraAto = async () => {
  try {
    const { data, status } = await useFetch(lavraAtoLivro, {
      method: "POST",
      body: { ato_token: props.ato_token, qtd_paginas: props.pages },
    });

    if (status.value === "success") {
      lavraData.value = data.value;
      $toast.success("Ato lavrado com sucesso!");
    } else {
      $toast.error("Falha ao lavrar o ato.");
    }
  } catch (error) {
    $toast.error("Erro ao conectar com o servidor.");
  }
};

const confirmLavrar = () => {
  isModalCondOpen.value = false;
  lavraAto();
};

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
