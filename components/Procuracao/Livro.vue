<template>
  <v-row>
    <v-col>
      <ejs-documenteditorcontainer
        :restrictEditing="true"
        :enableToolbar="false"
        :created="props.document ? onCreated : null"
        ref="documentEditorContainer"
        height="850px"
        width="850px"
        :key="props.document"
      >
      </ejs-documenteditorcontainer>
    </v-col>
    <v-col>
      <div>
        <div>
          <img
            @click="isModalCondOpen = true"
            class="ml-2"
            style="
              height: 80px;
              width: 80px;
              cursor: pointer;
              margin-top: 40px;
            "
            src="../../assets/lavrar.png"
          />
          <v-card v-if="lavraData" class="mr-16">
            <v-row no-gutters>
              <v-col>
                <v-sheet style="font-weight: bold" class="pa-2 ma-2">
                  Livro: {{ lavraData[0].livro_numero }}
                </v-sheet>
              </v-col>
              <v-col>
                <v-sheet style="font-weight: bold" class="pa-2 ma-2">
                  Folhas : {{ lavraData[0].pagina_inicial }} Á
                  {{ lavraData[0].pagina_final }}
                </v-sheet>
              </v-col>
            </v-row>
            <div v-html="selo">

            </div>
          </v-card>
        </div>
      </div>
    </v-col>
  </v-row>
  <v-btn color="red" size="large" @click="goBack">Voltar</v-btn>
  <ModalConfirmacao
    :show="isModalCondOpen"
    :condMessage="condMessage"
    @close="isModalCondOpen = false"
    @confirm="confirmLavrar"
  />
</template>

<script setup>
import { DocumentEditorContainerComponent as EjsDocumenteditorcontainer } from "@syncfusion/ej2-vue-documenteditor";
import { registerLicense } from "@syncfusion/ej2-base";
const props = defineProps({
  ato_token: {
    type: String,
    required: true,
  },
  pages: {
    type: Number,
    required: true,
  },
  document: {
    type: String,
    required: true,
  },
});

const config = useRuntimeConfig();
registerLicense(`${config.public.docEditor}`);
const { $toast } = useNuxtApp();
const router = useRouter();
const route = useRoute();
const lavraAtoLivro = `${config.public.managemant}/lavrarAto`;
const condMessage = ref(
  "Ao lavrar esse ato, a operação não poderá ser desfeita. Confirma ?"
);
const isModalCondOpen = ref(false);
const lavraData = ref(null);
const selo = ref(null);
const documentEditorContainer = ref(null);

const lavraAto = async () => {
  try {
    const { data, status } = await useFetch(lavraAtoLivro, {
      method: "POST",
      body: { ato_token: props.ato_token, qtd_paginas: props.pages },
    });

    if (status.value === "success") {
      lavraData.value = data.value;
      selo.value = data.value[0].selo
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

const onCreated = function () {
  const documentEditor = documentEditorContainer.value.ej2Instances.documentEditor;
  documentEditor.open(props.document); 
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
