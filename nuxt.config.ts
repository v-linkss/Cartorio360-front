// https://nuxt.com/docs/api/configuration/nuxt-config

import vuetify, { transformAssetUrls } from "vite-plugin-vuetify";
export default defineNuxtConfig({
  devtools: { enabled: true },
  build: {
    transpile: ["vuetify"],
  },
  modules: [
    (_options, nuxt) => {
      nuxt.hooks.hook("vite:extendConfig", (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }));
      });
    },
  ],
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
  runtimeConfig: {
    public: {
      auth: process.env.AUTH_API_URL,

      //Funcoes-banco
      listarEstadoCivilUrl: process.env.LISTAR_ESTADO_CIVIL_URL,
      listarCapacidadeCivilUrl: process.env.LISTAR_CAPACIDADE_CIVIL_URL,
      listarCidadesUrl: process.env.LISTAR_CIDADES_URL,
      listarTipoDocumentoUrl: process.env.LISTAR_TIPO_DOCUMENTO_URL,
      listarUfUrl: process.env.LISTAR_UF_URL,
      listarPaisUrl: process.env.LISTAR_PAIS_URL,

      // Pessoas
      allPessoaApiUrl: process.env.ALLPESSOA_API_URL,
      getPessoaByIdUrl: process.env.GET_PESSOA_BY_ID_URL,
      createPessoaUrl: process.env.CREATE_PESSOA_URL,
      updatePessoaUrl: process.env.UPDATE_PESSOA_URL,

      // PessoasDoc
      allPessoaDocApiUrl: process.env.GET_ALL_PESSOA_DOC_URL,
      getPessoaDocByIdUrl: process.env.GET_PESSOA_DOC_BY_ID_URL,
      createPessoaDocUrl: process.env.CREATE_PESSOA_DOC_URL,
      updatePessoaDocUrl: process.env.UPDATE_PESSOA_DOC_URL,

      // PessoasEndereco
      getPessoaEnderecoByIdUrl: process.env.GET_PESSOA_ENDERECO_BY_ID_URL,
      getAllPessoaEnderecoUrl: process.env.GET_ALL_PESSOA_ENDERECO_URL,
      createPessoaEnderecoUrl: process.env.CREATE_PESSOA_ENDERECO_URL,
      updatePessoaEnderecoUrl: process.env.UPDATE_PESSOA_ENDERECO_URL,
      deletePessoaEnderecoUrl: process.env.DELETE_PESSOA_ENDERECO_URL,

      // Minio
      minioListeUrl: process.env.MINIO_LISTE_URL,
      minioDownloadUrl: process.env.MINIO_DOWNLOAD_URL,
      minioUploadFaceIdUrl: process.env.MINIO_UPLOAD_FACE_ID_URL,
      minioUploadDigitalUrl: process.env.MINIO_UPLOAD_DIGITAL_URL,
      minioDeleteUrl: process.env.MINIO_DELETE_URL,
      minioCreateBucketUrl: process.env.MINIO_CREATE_BUCKET_URL,
    },
  },

  css: ["~/assets/css/main.css"],
});
