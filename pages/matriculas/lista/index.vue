<template>
  <v-container  class="mt-5">
    <NuxtLink to="/matriculas/cadastro">
      <img
        style="cursor: pointer"
        src="../../../assets/novo.png"
        alt="Cadastro"
      />
    </NuxtLink>
    <v-row style="gap: 3rem">
      <div style="width: 200px">
        <v-text-field
          class="mt-7 mb-4"
          v-model="searchNumero"
          label="Numero"
          prepend-inner-icon="mdi-magnify"
          variant="outlined"
          hide-details
        ></v-text-field>
      </div>
      <div style="width: 300px">
        <v-text-field
          class="mt-7 mb-4"
          v-model="searchCnm"
          label="CNM"
          prepend-inner-icon="mdi-magnify"
          variant="outlined"
          hide-details
        ></v-text-field>
      </div>
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

// const matriculasLista = `${config.public.auth}/service/gerencia/matriculas`;
const matriculasUpdate = `${config.public.auth}/service/gerencia/matriculas`;
const tokenCookie = useCookie('auth_token');

const router = useRouter();

const searchCnm = ref("");
const searchNumero = ref("");

const headers = [
  { title: "Número", value: "numero" },
  { title: "CNM", value: "cnm" },
  { title: "Data", value: "data" },
  { title: "Situação", value: "situacao" },
  { title: "Protocolo", value: "protocolo" },
  { title: "Descrição", value: "descricao" },

  { value: "actions" },
];

// const { data: matriculasItems, status } = await fetchWithToken(`${matriculasLista}?pageNumber=${1}&pageSize=${1000000}`);
const  matriculasItems  = await $fetch(`${matriculasLista}?pageNumber=${1}&pageSize=${1000000}`,
{
  method: "POST",
  body: {cartorio_token: useCookie("user-data").value.cartorio_token},
  headers: {
    Authorization: `Bearer ${tokenCookie.value}`,
  },
}
);

const filteredMatriculas = computed(() => {
  // console.log('matriculasItems', formatDate(matriculasItems[0].data)); // Verifica o valor de matriculasItems
  // Verifica se matriculasItems é válido antes de tentar acessar o método filter
  if (!matriculasItems || matriculasItems.length === 0) {
    return []; // Retorna um array vazio se não houver itens
  }

  return matriculasItems.filter((item) => {
    const numeroIdentificacao = item.numero
      ? item.numero.toLowerCase()
      : "";
    const cnm = item.cnm ? item.cnm.toLowerCase() : "";

    const matchesNumero = numeroIdentificacao.includes(searchNumero.value.toLowerCase());
    const matchesCnm = cnm.includes(searchCnm.value.toLowerCase());

    return matchesNumero && matchesCnm;
  }).map((item) => {
    return {
      ...item,
      data: formatDate(item.data, 'dd/mm/yyyy'),
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
  console.log('id:', id), 
  router.push({ path: `/matriculas/vizualizar/${id}` });
}

function redirectToUpdate(id) {
  router.push({ path: `/matriculas/atualizar/${id}` });
}
</script>
