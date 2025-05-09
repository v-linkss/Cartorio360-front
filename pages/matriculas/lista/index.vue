<template>
  <v-container class="mt-5">
    <NuxtLink to="/matriculas/cadastro">
      <img
        style="cursor: pointer"
        src="../../../assets/novo.png"
        alt="Cadastro"
      />
    </NuxtLink>
    <v-row style="gap: 0.5rem">
      <v-col cols="2">
      <v-text-field
        class="mt-7 mb-4"
        v-model="searchNumero"
        label="Número"
        prepend-inner-icon="mdi-magnify"
        variant="outlined"
        hide-details
      ></v-text-field>
      </v-col>
      <v-col cols="2">
      <v-text-field
        class="mt-7 mb-4"
        v-model="searchData"
        label="Data"
        prepend-inner-icon="mdi-magnify"
        placeholder="dd/mm/yyyy"
        v-mask="'##/##/####'"
        variant="outlined"
        hide-details
      ></v-text-field>
      </v-col>
      <v-col cols="2">
      <v-text-field
        class="mt-7 mb-4"
        v-model="searchProtocolo"
        label="Protocolo"
        prepend-inner-icon="mdi-magnify"
        variant="outlined"
        hide-details
      ></v-text-field>
      </v-col>
      <v-col cols="3">
      <v-text-field
        class="mt-7 mb-4"
        v-model="searchDescricao"
        label="Descrição"
        prepend-inner-icon="mdi-magnify"
        variant="outlined"
        hide-details
      ></v-text-field>
      </v-col>
    </v-row>
    <v-data-table
      density="compact"
      :headers="headers"
      :items="filteredMatriculas"
      item-key="id"
    >
      <template v-slot:item.actions="{ item }">
        <v-row style="display: flex; gap: 10px; justify-content: flex-end">
          <div
            style="cursor: pointer"
            @click="redirectToView(item.id)"
            title="Visualizar"
          >
            <img
              style="width: 30px; height: 30px"
              src="../../../assets/visualizar.png"
              alt="Visualizar"
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
            @click="deleteMatricula(item)"
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
  </v-container>
</template>
<script setup>
const config = useRuntimeConfig();
const matriculasLista = `${config.public.auth}/service/gerencia/listar_matriculas`;
const matriculasUpdate = `${config.public.auth}/service/gerencia/matriculas`;
const tokenCookie = useCookie("auth_token");

const router = useRouter();

const searchDescricao = ref("");
const searchNumero = ref("");
const searchProtocolo = ref("");
const searchData = ref("");

const headers = [
  { title: "Número", value: "numero" },
  { title: "Data", value: "data" },
  { title: "Protocolo", value: "protocolo" },
  { title: "Descrição", value: "descricao" },
  { value: "actions" },
];

const matriculasItems = await $fetch(
  `${matriculasLista}?pageNumber=${1}&pageSize=${1000000}`,
  {
    method: "POST",
    body: { cartorio_token: useCookie("user-data").value.cartorio_token },
    headers: {
      Authorization: `Bearer ${tokenCookie.value}`,
    },
  }
);

const filteredMatriculas = computed(() => {
  if (!matriculasItems || matriculasItems.length === 0) {
    return [];
  }

  return matriculasItems
    .filter((item) => {
      const numeroIdentificacao = item.numero ? item.numero.toLowerCase() : "";
      const descricao = item.descricao ? item.descricao.toLowerCase() : "";
      const protocolo = item.protocolo ? item.protocolo.toLowerCase() : "";
      const data = item.data ? formatDate(item.data, "dd/mm/yyyy") : "";

      const matchesNumero = numeroIdentificacao.includes(
        searchNumero.value.toLowerCase()
      );
      const matchesDescricao = descricao.includes(
        searchDescricao.value.toLowerCase()
      );
      const matchesProtocolo = protocolo.includes(
        searchProtocolo.value.toLowerCase()
      );
      const matchesData = data.includes(searchData.value);

      return (
        matchesNumero && matchesDescricao && matchesProtocolo && matchesData
      );
    })
    .map((item) => {
      return {
        ...item,
        data: formatDate(item.data, "dd/mm/yyyy"),
      };
    });
});

async function deleteMatricula(item) {
  item.excluido = !item.excluido;
  try {
    await fetchWithToken(`${matriculasUpdate}/${item.id}`, {
      method: "PUT",
      body: { excluido: item.excluido },
    });
  } catch (error) {
    console.error("Erro ao excluir pessoa:", error);
  }
}

function redirectToView(id) {
  router.push({ path: `/matriculas/vizualizar/${id}` });
}

function redirectToUpdate(id) {
  router.push({ path: `/matriculas/atualizar/${id}` });
}
</script>
