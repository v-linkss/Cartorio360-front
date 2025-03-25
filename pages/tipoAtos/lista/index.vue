<template>
    <v-container v-if="status === 'success'" class="mt-5">
      <NuxtLink to="/tipoAtos/cadastro">
        <img
          style="cursor: pointer"
          src="../../../assets/novo.png"
          alt="Cadastro"
        />
      </NuxtLink>
      <v-row style="gap: 3rem">
        <!-- <div style="width: 200px">
          <v-text-field
            class="mt-7 mb-4"
            v-model="searchDoc"
            label="Descrição"
            prepend-inner-icon="mdi-magnify"
            variant="outlined"
            hide-details
          ></v-text-field>
        </div> -->
        <div style="width: 300px">
          <v-text-field
            class="mt-7 mb-4"
            v-model="search"
            label="tipo do ato"
            prepend-inner-icon="mdi-magnify"
            variant="outlined"
            hide-details
          ></v-text-field>
        </div>
      </v-row>
      <v-data-table
        density="compact"
        :headers="headers"
        :items="filteredAtoTipo"
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
              @click="deleteTipoMatricula(item)"
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
  const tipoAtosLista = `${config.public.managemant}/listar_tipo_atos`;
  const tipoAtosUpdate = `${config.public.managemant}/tipo-atos`;
  const tipoAtosDelete = `${config.public.managemant}/tipo-atos/delete`;
  
  const usuario_token = ref(useCookie("auth_token").value) || null;
  const cartorio_token = ref(useCookie("user-data").value.cartorio_token) || null;
  
  const router = useRouter();
  
  const search = ref("");
  const searchDoc = ref("");
  
  const headers = [
    { title: "ID", value: "id" },
    { title: "Tipo de serviço", value: "tipo_servico" },
    { title: "Descrição", value: "descricao" },
    { value: "actions" },
  ];
  
  const cartorioTokenPayload = {
      cartorio_token: cartorio_token.value,
      user_token: usuario_token.value
  }


  const { data: tipoAtos, status } = await useFetch(`${tipoAtosLista}`,{
        method:'POST',
        body: cartorioTokenPayload
    });

  console.log('tipo atos', tipoAtos.value)
  
  const filteredAtoTipo = computed(() => {
    if (!tipoAtos.value) return [];

    return tipoAtos.value.filter((item) => {
      const descricao = item.descricao?.toLowerCase() ?? "";
      const tipoServico = item.tipo_servico?.toLowerCase() ?? "";

      return descricao.includes(searchDoc.value.toLowerCase()) &&
            tipoServico.includes(search.value.toLowerCase());
    });
  });
    
  async function deleteTipoMatricula(item) {
    item.excluido = !item.excluido;
    try {
      await fetchWithToken(`${tipoAtosUpdate}/${item.id}`, {
        method: "PUT",
        body: { excluido: item.excluido },
      });
    } catch (error) {
      console.error("Erro ao excluir pessoa:", error);
    }
  }
  
  function redirectToView(id) {
    router.push({ path: `/tipoAtos/vizualizar/${id}` });
  }
  
  function redirectToUpdate(id) {
    router.push({ path: `/tipoAtos/atualizar/${id}` });
  }
  </script>
  