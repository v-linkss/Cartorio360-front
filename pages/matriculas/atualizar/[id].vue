<template>
  <v-card width="1300">
    <h1 style="background-color: #f5f2f2; color: #525050; padding: 5px 0px 0px 20px">
      Atualização de Matriculas
    </h1>
    <v-tabs v-model="tab" bg-color="#f5f2f2">
      <v-tab value="dados">Dados</v-tab>
    </v-tabs>

    <v-tabs-window v-model="tab">
      <v-tabs-window-item value="dados">
        <v-container v-if="!pending">
          {{ matriculasItens }}
          <v-row>
            <v-col md="6">
              <v-text-field
                v-model="state.numero"
                :error-messages="v$.numero.$errors.map((e) => e.$message)"
                label="Matrícula"
                required
                @blur="v$.numero.$touch"
                @input="v$.numero.$touch"
              ></v-text-field>
            </v-col>
            <v-col md="4">
              <v-text-field
                v-model="state.protocolo"
                label="Protocolo"
                required
                disabled
              ></v-text-field>
            </v-col>
            <v-col md="4">
              <v-autocomplete
                v-model="state.livro_id"
                :error-messages="v$.situacao_id.$errors.map((e) => e.$message)"
                :items="dados.livroItens.data"
                label="Livro"
                required
                item-title="descricao"
                item-value="id"
                disabled
              />
            </v-col>

            <v-col md="4">
              <v-text-field
                v-model.number="state.pagina_inicial"
                label="Folha inicial"
                type="number"
                required
                min="0"
                disabled
              ></v-text-field>
            </v-col>

            <v-col md="4">
              <v-text-field
                v-model.number="state.pagina_final"
                label="Folha Final"
                type="number"
                required
                min="0"
                disabled
              ></v-text-field>
            </v-col>
            <v-col md="4">
              <v-text-field
                v-model="state.data"
                :error-messages="v$.situacao_id.$errors.map((e) => e.$message)"
                @blur="v$.numero.$touch"
                @input="v$.numero.$touch"
                type="date"
                label="Data"
              ></v-text-field>
            </v-col>
            <v-col md="4">

              <v-autocomplete
                v-model="state.situacao_id"
                :error-messages="v$.situacao_id.$errors.map((e) => e.$message)"
                :items="dados.situacaoItens"
                label="Situação"
                required
                @blur="v$.situacao_id.$touch"
                @input="v$.situacao_id.$touch"
                item-title="descricao"
                item-value="id"
              />
            </v-col>

            <v-col md="4">
              <v-text-field
                v-model="state.descricao"
                :error-messages="v$.situacao_id.$errors.map((e) => e.$message)"
                label="Descrição"
                required

              ></v-text-field>
            </v-col>
            <v-col md="4">
              <v-text-field
                v-model="state.cnm"
                label="CNM"
                required

              ></v-text-field>
            </v-col>
            <v-col md="4">
              <v-text-field
                v-model="state.observacao"
                label="Observação"
                required

              ></v-text-field>
            </v-col>
            <v-col md="4">
              <v-text-field
                v-model="state.inscricao_municipal"
                label="Inscrição Municipal"
                required

              ></v-text-field>
            </v-col>
            <v-col md="4">

              <v-autocomplete
                v-model="state.tabvalores_natureza_id"
                :items="dados.naturezaImoveisItens"
                label="Natureza Imovel"
                item-title="descricao"
                item-value="id"
              />
            </v-col>
            <v-col md="4">
              <v-autocomplete
                v-model="state.tabvalores_tipologradouro_id"
                :items="dados.tipoLogradouroItens"
                label="Tipo de Logradouro"
                item-title="descricao"
                item-value="id"
              />
            </v-col>
            <v-col md="4">
              <v-text-field
                v-model="state.end_logradouro"
                label="Endereço"
                required

              ></v-text-field>
            </v-col>
            <v-col md="4">
              <v-text-field
                v-model="state.end_logradouro_numero"
                label="Numero"
                required

              ></v-text-field>
            </v-col>   
            <v-col md="4">
              <v-text-field
                v-model="state.end_bairro"
                label="Bairro"
                required

              ></v-text-field>
            </v-col>   
            <v-col md="4">
              <v-autocomplete
                  v-model="state.end_cidade_id"
                  :items="dados.cidadesItens"
                  label="Cidade"
                  item-title="descricao"
                  item-value="id"
                />
            </v-col>
            <v-col md="4">
              <v-text-field
                v-model="state.end_cep"
                label="CEP"
                required

              ></v-text-field>
            </v-col>   
            <v-col md="4">
              <v-text-field
                v-model="state.end_complemento"
                label="Complemento"
                required

              ></v-text-field>
            </v-col>   
            <v-col md="4">
              <v-text-field
                v-model="state.end_quadra"
                label="Quadra"
                required

              ></v-text-field>
            </v-col>   

            <v-col md="4">
              <v-text-field
                v-model="state.end_lote"
                label="Lote"
                required

              ></v-text-field>
            </v-col>   
            
          </v-row>
          <v-row class="mb-3">
            <v-btn @click="voltar" size="large" color="red">Voltar</v-btn>
            <v-btn
              @click="isEditMode ? onUpdate() : onSubmit()"
              class="ml-4"
              size="large"
              color="green"
              >Salvar</v-btn
            >
          </v-row>
        </v-container>  
      </v-tabs-window-item>
    </v-tabs-window>
  </v-card>
</template>


<script setup>
const tab = ref("dados");
import { useVuelidate } from "@vuelidate/core";
import { helpers, required } from "@vuelidate/validators";
import { useRouter, useRuntimeConfig, useCookie } from "#imports";
import { useRoute } from 'vue-router'

const route = useRoute();
const id = route.params.id;
const emit = defineEmits(["saved", "close-modal"]);

const router = useRouter();
const config = useRuntimeConfig();
const { $toast } = useNuxtApp();

const isEditMode = ref(false);
const pessoaId = useCookie("pessoa-id");

const situacao = `${config.public.auth}/service/gerencia/listar_situacao_matriculas`;
const naturezaImoveis = `${config.public.auth}/service/gerencia/natureza_imoveis`;
const tipoLogradouros = `${config.public.auth}/service/gerencia/tipo_logradouros`;
const cidades = `${config.public.auth}/service/gerencia/listarCidades`;
const livro = `${config.public.auth}/service/gerencia/livro`;
const matriculas = `${config.public.auth}/service/gerencia/matriculas`;

const {
  data: dados,
  status,
  pending,
  error,
} = await useLazyAsyncData("cliente-dados", async () => {
  const tokenCookie = useCookie('auth_token');

  try {
    const [situacaoItens, naturezaImoveisItens, tipoLogradouroItens, cidadesItens, livroItens,matriculasItens] =
      await Promise.all([
        $fetch(`${situacao}`, {
          method: "POST", 
          body: {
            cartorio_token: useCookie("user-data").value.cartorio_token,  
          },
          headers: {
            Authorization: `Bearer ${tokenCookie.value}`,
          },
        }),
        $fetch(`${naturezaImoveis}`, {
          headers: {
            Authorization: `Bearer ${tokenCookie.value}`,
          },
        }),
        $fetch(`${tipoLogradouros}`, {
          headers: {
            Authorization: `Bearer ${tokenCookie.value}`,
          },
        }),
        $fetch(`${cidades}`, {
          headers: {
            Authorization: `Bearer ${tokenCookie.value}`,
          },
        }),
        $fetch(`${livro}`, {
          headers: {
            Authorization: `Bearer ${tokenCookie.value}`,
          },
        
        }),
        $fetch(`${matriculas}/${id}`, {
          headers: {
            Authorization: `Bearer ${tokenCookie.value}`,
          },
        
        }),
      ]);
      Object.assign(state, matriculasItens);
    return { situacaoItens, naturezaImoveisItens, tipoLogradouroItens, cidadesItens, livroItens };
  } catch (error) {
    console.error("Erro ao carregar dados:", error);
    return { situacaoItens: [], naturezaImoveisItens: [], tipoLogradouroItens: [], cidadesItens: [], livroItens: [] };
  }
});


const state = reactive({
  numero: null,
  protocolo: null,
  livro: null,
  folhas: null,
  data: null,
  descricao: null,
  cnm: null,
  livro_id: null,
  observacao: null,
  inscricao_municipal: null,
  situacao_id: null,
  tabvalores_natureza_id: null,
  tabvalores_tipologradouro_id: null,
  end_logradouro: null,
  end_logradouro_numero: null,
  end_bairro: null,
  end_cidade_id: null,
  end_cep: null,
  end_complemento: null,
  end_quadra: null,
  end_lote: null,
  pagina_inicial:null,
  pagina_final:null,
  cartorio_id: useCookie("user-data").value.cartorio_id,
  user_id: useCookie("user-data").value.usuario_id,

});

const rules = {
  numero: {
    required: helpers.withMessage("O campo é obrigatório", required),
  },

  data: {
    required: helpers.withMessage("O campo é obrigatório", required),
  },

  situacao_id: {
    required: helpers.withMessage("O campo é obrigatório", required),
  },

  tabvalores_natureza_id: {
    required: helpers.withMessage("O campo é obrigatório", required),
  },

  livro_id: {
    required: helpers.withMessage("O campo é obrigatório", required),
  },

};
const v$ = useVuelidate(rules, state);
function removeFormatting(value) {
    if (value) {
      return value.replace(/[.\-]/g, "");
    } else {
      value = null;
    }
  }
  async function onSubmit() {
  if (await v$.value.$validate()) {
    const payload = { ...state };
    // Substituindo valores vazios por null
    for (const key in payload) {
      if (payload[key] === "") {
        payload[key] = null;
      }
    }
    
    const payloadFormated = {
      ...payload,
    }
    
    try {
      const tokenCookie = useCookie('auth_token');

      // Usando o payload formatado
      const response = await $fetch(`${config.public.auth}/service/gerencia/matriculas/${id}`, {
        method: "PUT",
        body: payloadFormated,  // Aqui usa o payload formatado
        headers: {
          Authorization: `Bearer ${tokenCookie.value}`,
        },
      });
      
      // Verificação de sucesso
      if (response.statusCode === 500) {
        $toast.error("Erro ao cadastrar pessoa, o CPF já está cadastrado.");
      } else {
        $toast.success("Pessoa cadastrada com sucesso!");
        const pessoaIdValue = response.id;
        pessoaId.value = pessoaIdValue;
        const pessoa_token = useCookie("pessoa_token");
        pessoa_token.value = response.token;
        isEditMode.value = true;
        emit("saved");
        router.push("/matriculas/lista");

      }
    } catch (error) {
      console.log('Erro ao cadastrar:', error);
      $toast.error("Erro ao cadastrar. Tente novamente.");
    }
  }
}

function voltar() {

  router.push("/matriculas/lista");
}
</script>