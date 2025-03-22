<template>
  <div v-if="!pending">
    <v-container class="data-container mt-16">
      <v-row no-gutters>
        <v-col>
          <v-sheet class="pa-2 ma-2">
            Número: {{ PessoaView.numero }}
          </v-sheet>
        </v-col>
        <v-col>
          <v-sheet class="pa-2 ma-2">
            CNM : {{ PessoaView.cnm }}
          </v-sheet>
        </v-col>
        <v-col>
          <v-sheet class="pa-2 ma-2">
            Data:
            {{ formatDate(PessoaView.data )}}
          </v-sheet>
        </v-col>


        <v-responsive width="100%"></v-responsive>

        <v-col>
          <v-sheet class="pa-2 ma-2">
            Situação:
            {{ PessoaView.situacao.situacao}}
          </v-sheet>
        </v-col>
        <v-col>
          <v-sheet class="pa-2 ma-2">
            Protocolo:
            {{ PessoaView.protocolo}}
          </v-sheet>
        </v-col>
        <v-col>
          <v-sheet class="pa-2 ma-2">
            Descrição:
            {{ PessoaView.descricao }}
          </v-sheet>
        </v-col>
      </v-row>
    </v-container>
</div>
<NuxtLink class="mt-10" to="/matriculas/lista">
   <v-btn size="large" color="red">Voltar</v-btn>
</NuxtLink>
</template>

<script setup>
const route = useRoute();
const { id } = route.params;

const config = useRuntimeConfig();
const matriculasView = `${config.public.auth}/service/gerencia/matriculas`

const { data: PessoaView, pending } = await fetchWithToken(
  `${matriculasView}/${id}`
);
</script>

<style scoped>
.data-container {
  border: 1px solid black;
  border-radius: 8px;
  padding: 16px;
}
</style>
