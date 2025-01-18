<template>
    <v-container>
      <v-col class="mt-5" cols="12">
        <v-textarea label="Descrição" v-model="state.documento"> </v-textarea>
      </v-col>
  
      <v-row class="ml-1 mb-3">
        <v-col class="mt-6" cols="8">
          <v-autocomplete
            label="Selecione o Tipo"
            v-model="state.pessoa"
            item-title="nome"
            item-value="id"
            return-object
            required
          >
          </v-autocomplete>
        </v-col>
        <v-col class="ml-5" cols="3">
          <label>Valor</label>
          <MoneyInput v-model="state.valor" />
        </v-col>
        <div>
          <img
            class="mt-7"
            src="../../../assets/novo.png"
            style="width: 40px; cursor: pointer"
            title="Criar Representante"
            @click="createRepresentante"
          />
        </div>
      </v-row>
  
      <v-row>
        <v-col>
          <v-data-table
            style="height: 465px"
            :headers="headers"
            :items="pessoasTable"
          >
            <template v-slot:item="{ item }">
              <tr>
                <td>{{ item.pessoa.descricao }}</td>
                <td class="text-end">{{ item.pessoa.valor }}</td>
                <td class="text-end">
                  <v-row justify="end">
                    <div
                      style="cursor: pointer"
                      class="mr-2"
                      @click="redirectToFicha(item)"
                      title="Visualizar Ficha"
                    >
                      <img
                        style="width: 30px; height: 30px"
                        src="../../../assets/visualizar.png"
                        alt="Visualizar"
                      />
                    </div>
                    <div
                      style="cursor: pointer"
                      class="mr-2"
                      @click="redirectToPapel(item)"
                      title="Alterar Papel"
                    >
                      <img
                        style="width: 30px; height: 30px"
                        src="../../../assets/editar.png"
                        alt="Editar"
                      />
                    </div>
                    <div
                      style="cursor: pointer"
                      class="mr-2"
                      @click="deletePessoa(item)"
                      title="Deletar Pessoa"
                    >
                      <img
                        v-if="item.excluido"
                        style="width: 30px; height: 30px"
                        src="../../../assets/excluido.png"
                        alt="Reativar"
                        title="Reativar"
                      />
                      <img
                        v-else
                        src="../../../assets/mudarStatus.png"
                        alt="Excluir"
                        style="width: 30px; height: 30px"
                        title="Excluir"
                      />
                    </div>
                  </v-row>
                </td>
              </tr>
            </template>
          </v-data-table>
        </v-col>
      </v-row>
  
      <v-row>
        <NuxtLink @click="goBack">
          <v-btn size="large" color="red">Voltar</v-btn>
        </NuxtLink>
      </v-row>
    </v-container>
  </template>
  
  <script setup>
  const props = defineProps({
    ato_token: {
      type: String,
      required: true,
    },
    ato_id: {
      type: Number,
      required: true,
    },
  });
  
  const router = useRouter();
  const route = useRoute();
  const config = useRuntimeConfig();
  const { $toast } = useNuxtApp();
  const pessoasUpdate = `${config.public.managemant}/updateAtosPessoa`;
  const cartorio_token = ref(useCookie("user-data").value.cartorio_token);
  
  const pessoasTable = ref([
    {
      pessoa: {
        descricao: "João Silva",
        valor: 1500,
      },
    },
    {
      pessoa: {
        descricao: "Maria Oliveira",
        valor: 2300,
      },
    },
    {
      pessoa: {
        descricao: "Carlos Souza",
        valor: 1800,
      },
    },
    {
      pessoa: {
        descricao: "Ana Lima",
        valor: 2100,
      },
    },
    {
      pessoa: {
        descricao: "Fernando Costa",
        valor: 1750,
      },
    },
  ]);
  
  const ato_pessoa_id = ref(null);
  
  const headers = [
    {
      title: "Descrição",
      align: "start",
      key: "pessoa.descricao",
    },
    {
      title: "Valor",
      align: "end",
      key: "pessoa.valor",
    },
    {  align: "end", value: "actions" },
  ];
  
  const state = reactive({
    papeis: null,
    nome: null,
    pessoa: null,
    documento: null,
  });
  
  const createRepresentante = async () => {};
  
  async function deletePessoa(item) {
    item.excluido = !item.excluido;
    try {
      await useFetch(`${pessoasUpdate}/${ato_pessoa_id.value}`, {
        method: "PUT",
        body: JSON.stringify({ excluido: item.excluido }),
      });
    } catch (error) {
      console.error("Erro ao excluir pessoa:", error);
    }
  }
  
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
  