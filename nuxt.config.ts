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
      //auth: "http://localhost:3333",
      //managemant: "http://localhost:3200",
      biometria:"http://localhost:5000/apiservice",
      auth: 'http://45.55.192.246:3746',
      managemant: 'http://45.55.192.246:5982',
    },
  },
  css: ["~/assets/css/main.css"],
});
