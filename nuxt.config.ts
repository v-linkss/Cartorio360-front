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
      // auth: "http://localhost:3333",
      // managemant: "http://localhost:3200",
      biometria:"http://0.0.0.0:5000/apiservice/capture-hash",
      auth: process.env.MS_AUTH,
      managemant: process.env.MS_MANAGEMENT,
    },
  },
  css: ["~/assets/css/main.css"],
});
