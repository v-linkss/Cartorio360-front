// import this after install `@mdi/font` package
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import { VDateInput } from 'vuetify/labs/VDateInput'
import { pt } from 'vuetify/locale';
import VueTheMask from 'vue-the-mask'
import { VDataTable } from 'vuetify/lib/components/index.mjs'

export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
    locale: {
      locale: 'pt',
      messages: { pt },
    },
    components: {
      VDateInput,
    },
    defaults:{
      VAutocomplete: {
        noDataText: 'Não há dados correspondentes',
        hideDetails: true,
        density:"compact",
        clearable:true
      },
      VTextField: {
        density:"compact",
      },
      VDataTable:{
         density:"compact"
      }
    },
  })
  app.vueApp.use(vuetify)
  app.vueApp.use(VDataTable)
  app.vueApp.use(VueTheMask)
})


