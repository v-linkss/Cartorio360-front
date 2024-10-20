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
  // devServer: {
  //   https: {
  //     key: fs
  //       .readFileSync(
  //         path.resolve(
  //           __dirname,
  //           "/var/www/certificado-cartorio360/Certificados/server.key"
  //         )
  //       )
  //       .toString(),
  //     cert: fs
  //       .readFileSync(
  //         path.resolve(
  //           __dirname,
  //           "/var/www/certificado-cartorio360/Certificados/server.crt"
  //         )
  //       )
  //       .toString(),
  //   },
  // },
  runtimeConfig: {
    public: {
      // auth: process.env.MS_AUTH_DESENV,
      // managemant_desenv:  process.env.MS_MANAGEMENT_DESENV,
      biometria:"http://localhost:5000/apiservice/capture-finger",
      auth: process.env.MS_AUTH,
      managemant: process.env.MS_MANAGEMENT,
    },
  },
  css: ["~/assets/css/main.css"],
});
