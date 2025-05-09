// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetify, { transformAssetUrls } from "vite-plugin-vuetify";
export default defineNuxtConfig({
  app: {
    head: {
      link: [{ rel: "icon", type: "image/png", href: "/cartorio_icon.png" }],
    },
  },

  devtools: { enabled: true },

  build: {
    transpile: ["vuetify", /@syncfusion/],
  },

  modules: [
    (_options, nuxt) => {
      nuxt.hooks.hook("vite:extendConfig", (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }));
      });
    },
    "@pinia/nuxt",
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
      auth:
        process.env.DEV_MODE === "true"
          ? process.env.MS_AUTH_DESENV
          : process.env.MS_AUTH,
      managemant:
        process.env.DEV_MODE === "true"
          ? process.env.MS_MANAGEMENT_DESENV
          : process.env.MS_MANAGEMENT,
      biometria: process.env.BIOMETRIA,
      envioDoc: process.env.OBSERVER,
      docEditor: process.env.LICENSE_KEY,
      ws: process.env.WEB_SERVICE,
    },
  },

  css: ["~/assets/css/main.css"],
  compatibilityDate: "2025-01-25",
});
