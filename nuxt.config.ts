// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetify, { transformAssetUrls } from "vite-plugin-vuetify";
export default defineNuxtConfig({
  app: {
    head: {
      link: [
        { rel: 'icon', type: 'image/png', href: '/cartorio_icon.png' }
      ]
    }
  },

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
    '@pinia/nuxt'
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
      // auth: process.env.MS_AUTH_DESENV,
      // managemant:  process.env.MS_MANAGEMENT_DESENV,
      biometria: process.env.BIOMETRIA,
      auth: process.env.MS_AUTH,
      managemant: process.env.MS_MANAGEMENT,
      envioDoc: process.env.OBSERVER,
      docEditor: process.env.LICENSE_KEY
    },
  },

  css: ["~/assets/css/main.css"],
  compatibilityDate: "2025-01-25",
});