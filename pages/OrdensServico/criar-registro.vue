<template>
  <v-container class="mt-5">
    <v-row
      style="display: flex; justify-content: space-between; margin-bottom: 30px"
    >
      <h1>Ordens de Serviço</h1>
    </v-row>

    <v-row>
      <v-col md="3">
        <v-autocomplete
          label="Nacionalidade"
          :items="nacionalidade"
        ></v-autocomplete>
      </v-col>
      <v-col md="2">
        <v-text-field
        v-model="state.cpf"
          label="CPF"
        ></v-text-field>
      </v-col>
      <v-col md="4">
        <v-text-field
        v-model="state.apresentante"
          label="Nome Apresentante"
        ></v-text-field>
      </v-col>
      <v-col>
        <div>
          <img
            style="width: 40px; height: 40px; cursor: pointer"
            src="../../assets/salvar.png"
            alt="Salvar"
          />
        </div>
      </v-col>
    </v-row>
    <v-row style="display: flex; margin-bottom: 10px; gap: 2rem">
      <h1 class="ml-5">Atos</h1>
      <NuxtLink to="/OrdensServico/criar-ato">
        <img
          style="width: 45px; height: 45px; cursor: pointer"
          src="../../assets/novo.png"
          alt="novo"
        />
      </NuxtLink>
    </v-row>
    <!-- <v-data-table
      :headers="headers"
      item-key="id"
    >
      <template v-slot:item.actions="{ item }">
        <v-row style="display: flex; gap: 10px">
          <div @click="redirectToUpdate(item.id)" title="Editar">
            <img
              style="width: 40px; height: 40px; cursor: pointer"
              src="../../assets/recebe.png"
              alt="Editar"
            />
          </div>
          <div @click="redirectToUpdate(item.id)" title="Editar">
            <img
              style="width: 40px; height: 40px; cursor: pointer"
              src="../../assets/editar.png"
              alt="Editar"
            />
          </div>
          <div @click="deleteEndereco(item)" title="Visualizar">
            <img
              v-if="item.excluido"
              style="width: 40px; height: 40px; cursor: pointer"
              src="../../assets/excluido.png"
              alt="Visualizar"
              title="Reativar"
            />
            <img
              v-else
              src="../../assets/mudarStatus.png"
              alt="Excluir"
              class="trash-icon"
              style="width: 40px; height: 40px; cursor: pointer"
              title="Excluir"
            />
          </div>
        </v-row>
      </template>
    </v-data-table> -->
    <NuxtLink  to="/OrdensServico">
      <img class="btn-pointer mt-10" src="../../assets/sair.png" alt="Sair" />
    </NuxtLink>
  </v-container>
</template>

<script setup>
const { $toast } = useNuxtApp();
const route = useRoute();
const { id } = route.params;

const config = useRuntimeConfig();
const allPaises = `${config.public.managemant}/listarPais`;
const allEnderecos = `${config.public.managemant}/getPessoaEnderecoById`;
const allServicos = `${config.public.managemant}/listarOrdensServico`;
const updateEndereco = `${config.public.managemant}/updatePessoaEndereco`;
const allTiposAtos = `${config.public.managemant}/tipoAtos`;

const cartorio_token = ref(useCookie("user-data").value.cartorio_token);
const pessoa_id = Number(useCookie("pessoa-id").value || id);

const state = reactive({
  cpf:'',
  apresentante:'',

});

const nacionalidade = [
{ title: "BRASILEIRO", value: "brasileiro" },
{ title: "ESTRANGEIRO", value: "estrangeiro" },
]

const headers = [
  { title: "Protocolo", value: "pais.descricao" },
  { title: "Lavratura", value: "codcep" },
  { title: "Situação", value: "codcep" },
  { title: "Tipo", value: "codcep" },
  { title: "Usuário", value: "codcep" },
  { title: "Livro", value: "codcep" },
  { title: "Folha", value: "codcep" },
  { title: "Valor", value: "codcep" },
  {
    value: "actions",
  },
];

const isModalOpen = ref(false);
const selectedEndereco = ref(null);


async function onSubmit() {

}

function redirectToUpdate(id) {


}

async function onUpdate(id) {
 
}

async function deleteEndereco(item) {
 
}
</script>
