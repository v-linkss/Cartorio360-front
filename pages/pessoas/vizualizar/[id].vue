<template>
  <div v-if="!pending">
    <v-container class="data-container mt-16">
      <v-row no-gutters>
        <v-col>
          <v-sheet class="pa-2 ma-2">
            Documento: {{ PessoaView.doc_identificacao }}
          </v-sheet>
        </v-col>
        <v-col>
          <v-sheet class="pa-2 ma-2">
            Nome/Razão Social : {{ PessoaView.nome }}
          </v-sheet>
        </v-col>
        <v-col>
          <v-sheet class="pa-2 ma-2">
            Data de Nascimento:
            {{ formatDate(PessoaView.data_nascimento )}}
          </v-sheet>
        </v-col>

        <v-responsive width="100%"></v-responsive>

        <v-col>
          <v-sheet class="pa-2 ma-2">
            Tipo Pessoa:
            {{ PessoaView.tipo_pessoa }}
          </v-sheet>
        </v-col>

        <v-col>
          <v-sheet class="pa-2 ma-2"
            >Profissão: {{ PessoaView.profissao }}</v-sheet
          >
        </v-col>

        <v-responsive width="100%"></v-responsive>

        <v-col>
          <v-sheet class="pa-2 ma-2">
            Local de Trabalho:
            {{ PessoaView.local_trabalho }}
          </v-sheet>
        </v-col>
        <v-col>
          <v-sheet class="pa-2 ma-2">
            Nome da mãe:
            {{ PessoaView.nome_mae }}
          </v-sheet>
        </v-col>
      </v-row>
    </v-container>
</div>
<NuxtLink class="mt-10" to="/pessoas/registros">
  <img class="btn-pointer" src="../../../assets/sair.png" alt="Sair" />
</NuxtLink>
</template>

<script setup>
const route = useRoute();
const { id } = route.params;

const config = useRuntimeConfig();
const pessoasView = `${config.public.managemant}/getPessoaById`

const { data: PessoaView, pending } = await useFetch(
  `${pessoasView}/${id}`
);
console.log(pessoasView)
</script>

<style scoped>
.data-container {
  border: 1px solid black;
  border-radius: 8px;
  padding: 16px;
}
</style>
