import vuetify, { transformAssetUrls } from "vite-plugin-vuetify";
import fs from "fs";
import path from "path";

export default defineNuxtConfig({
  // Desativar devtools em produção para reduzir o uso de memória
  devtools: { enabled: process.env.NODE_ENV !== 'production' },
  
  build: {
    // Transpilar apenas o necessário
    transpile: ["vuetify"],
    // Minimizar o build e remover código desnecessário
    extractCSS: true,  // Extração de CSS para otimizar carregamento
    optimizeCSS: true, // Otimização de CSS
    // Enable cache to speed up and optimize build
    cache: true,
  },
  
  // Remover módulos não utilizados e configurar Vuetify para tree-shaking
  modules: [
    (_options, nuxt) => {
      nuxt.hooks.hook("vite:extendConfig", (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({
          autoImport: true, // Ativar auto-importação de componentes
          // Utilize apenas os componentes que você realmente usa
          treeshake: true, // Habilitar tree-shaking do Vuetify para remover componentes não utilizados
        }));
      });
    },
  ],
  
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
    // Reduzir o tamanho do bundle desativando a transformação de fontes grandes
    build: {
      chunkSizeWarningLimit: 500,  // Limite de tamanho de chunk para otimizar
      minify: 'terser',  // Usar Terser para minificação mais eficiente
    },
  },
  
  css: [
    '~/assets/css/main.css',  // Importar apenas o CSS necessário
  ],

  runtimeConfig: {
    public: {
      biometria: "http://10.0.0.104:5000/apiservice/capture-finger",
      auth: process.env.MS_AUTH || "http://localhost:3333",
      managemant: process.env.MS_MANAGEMENT || "http://localhost:3200",
    },
  },

  // Comentar ou desativar partes não utilizadas para liberar memória
  // devServer: {
  //   https: {
  //     key: fs.readFileSync(
  //       path.resolve(
  //         __dirname,
  //         "/var/www/certificado-cartorio360/Certificados/server.key"
  //       )
  //     ),
  //     cert: fs.readFileSync(
  //       path.resolve(
  //         __dirname,
  //         "/var/www/certificado-cartorio360/Certificados/server.crt"
  //       )
  //     ),
  //   },
  // },
});
