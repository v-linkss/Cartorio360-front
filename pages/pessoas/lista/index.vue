<template>
  <v-container class="mt-5">
    <NuxtLink to="/pessoas/cadastro">
      <img
        style="cursor: pointer"
        src="../../../assets/novo.png"
        alt="Cadastro"
      />
    </NuxtLink>
    <v-row style="gap: 1rem">
      <div style="width: 200px">
        <v-text-field
          class="mt-7 mb-4"
          v-model="searchDoc"
          label="Documento"
          prepend-inner-icon="mdi-magnify"
          variant="outlined"
          hide-details
        ></v-text-field>
      </div>
      <div style="width: 150px">
        <v-text-field
          class="mt-7 mb-4"
          v-model="searchCartao"
          label="Cartão"
          prepend-inner-icon="mdi-magnify"
          variant="outlined"
          hide-details
        ></v-text-field>
      </div>
      <div style="width: 300px">
        <v-text-field
          class="mt-7 mb-4"
          v-model="searchName"
          label="Pessoa"
          prepend-inner-icon="mdi-magnify"
          variant="outlined"
          hide-details
        ></v-text-field>
      </div>
      <div
        style="cursor: pointer"
        @click="searchPessoas()"
        title="Visualizar"
        class="mt-7"
      >
        <img
          style="width: 40px; height: 40px"
          src="../../../assets/visualizar.png"
          alt="Visualizar"
          title="Possui Ficha"
        />
      </div>
    </v-row>
    <v-progress-circular
      class="loading-spinner"
      indeterminate
      size="80"
      v-if="pending"
    ></v-progress-circular>
    <v-data-table
      v-else
      density="compact"
      :headers="headers"
      :items="pessoasItems"
      item-key="id"
      :items-per-page-options="[10, 25, 50]"
    >
      <template v-slot:item.doc_identificacao="{ item }">
        {{ formatDoc(item.documento) }}
      </template>
      <template v-slot:item.actions="{ item }">
        <v-row style="display: flex; gap: 10px; justify-content: flex-end">
          <div
            style="cursor: pointer"
            @click="openModalFicha(item.link_ficha, item)"
            title="Visualizar"
          >
            <img
              v-if="item.link_ficha"
              style="width: 30px; height: 30px"
              src="../../../assets/visualizar.png"
              alt="Visualizar"
              title="Possui Ficha"
            />
            <img
              v-else
              style="width: 30px; height: 30px"
              src="../../../assets/visualizar-vermelho.png"
              alt="Visualizar"
              title="Não Ficha"
            />
          </div>
          <div
            style="cursor: pointer"
            @click="redirectToUpdate(item.id)"
            title="Atualizar"
          >
            <img
              style="width: 30px; height: 30px"
              src="../../../assets/editar.png"
              alt="Atualizar"
            />
          </div>
          <div
            style="cursor: pointer"
            @click="deletePessoa(item)"
            title="Deletar"
          >
            <img
              v-if="item.excluido"
              style="width: 30px; height: 30px"
              src="../../../assets/excluido.png"
              alt="Visualizar"
              title="Reativar"
            />
            <img
              v-else
              src="../../../assets/mudarStatus.png"
              alt="Excluir"
              class="trash-icon"
              style="width: 30px; height: 30px"
              title="Excluir"
            />
          </div>
        </v-row>
      </template>
    </v-data-table>
    <ModalFichaCard
      v-if="isModalFichaOpen"
      :show="isModalFichaOpen"
      :link-view="linkFichaPessoa"
      :is-view="true"
      :pessoa-obj="pessoaObj"
      @close="isModalFichaOpen = false"
    />
  </v-container>
</template>

<script setup>
const config = useRuntimeConfig();
const pessoasLista = `${config.public.auth}/service/gerencia/pesquisarPessoas`;
const pessoasUpdate = `${config.public.auth}/service/gerencia/updatePessoa`;
const baixarDocumento = `${config.public.managemant}/download`;
const isModalFichaOpen = ref(false);
const linkFichaPessoa = ref([]);
const pathFichaPessoa = ref(null);
const pessoaObj = ref({});
const router = useRouter();
const pending = ref(false);
const pessoasItems = ref([]);

const searchName = ref(null);
const searchDoc = ref(null);
const searchCartao = ref(null);

const headers = [
  { title: "Documento", value: "doc_identificacao", width: "190px" },
  { title: "Cartão", value: "numero_ficha" },
  { title: "Nome/Razão Social", value: "nome", width: "400px" },
  { value: "actions" },
];

const searchPessoas = async () => {
  pending.value = true;
  const { data: pessoasResponse, status } = await fetchWithToken(
    `${pessoasLista}`,
    {
      method: "POST",
      body: {
        cartorio_token: useCookie("user-data").value.cartorio_token,
        nome: searchName.value ? searchName.value : null,
        documento: searchDoc.value ? searchDoc.value.replace(/\D/g, "") : null,
        numero_ficha: Number(searchCartao.value)
          ? Number(searchCartao.value)
          : null,
      },
    }
  );
  if (status.value === "success") {
    pending.value = false;
    pessoasItems.value = pessoasResponse.value;
  }
};

function formatDoc(doc) {
  if (!doc) return "";

  const cleaned = doc.replace(/\D/g, "");

  if (cleaned.length === 11) {
    return cleaned.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  } else if (cleaned.length === 14) {
    return cleaned.replace(
      /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
      "$1.$2.$3/$4-$5"
    );
  }

  return doc;
}

const openModalFicha = async (link, objeto) => {
  isModalFichaOpen.value = true;
  const { data: linkUrl } = await useFetch(baixarDocumento, {
    method: "POST",
    body: {
      bucket: useCookie("user-data").value.cartorio_token,
      path: link,
    },
  });

  linkFichaPessoa.value = linkUrl.value;
  pathFichaPessoa.value = link;
  pessoaObj.value = objeto;
};

async function deletePessoa(item) {
  item.excluido = !item.excluido;
  try {
    await fetchWithToken(`${pessoasUpdate}/${item.id}`, {
      method: "PUT",
      body: { excluido: item.excluido },
    });
  } catch (error) {
    console.error("Erro ao excluir pessoa:", error);
  }
}

function redirectToUpdate(id) {
  router.push({ path: `/pessoas/atualizar/${id}` });
}
</script>
