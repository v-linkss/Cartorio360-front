// import this after install `@mdi/font` package
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";
import { createVuetify } from "vuetify";
import { VDateInput } from "vuetify/labs/VDateInput";
import { pt } from "vuetify/locale";
import VueTheMask from "vue-the-mask";

export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
    locale: {
      locale: "pt",
      messages: { pt },
    },
    components: {
      VDateInput,
    },
    defaults: {
      VAutocomplete: {
        noDataText: "Não há dados correspondentes",
        hideDetails: true,
        density: "compact",
        clearable: true,
      },
      VSelect: {
        noDataText: "Não há dados correspondentes",
        hideDetails: true,
        density: "compact",
      },
      VTextField: {
        density: "compact",
      },
      VDataTable: {
        density: "compact",
      },
      VCol: {
        style: {
          padding: "5px",
        },
      },
    },
  });
  app.vueApp.use(vuetify);
  app.vueApp.use(VueTheMask as any);
});
