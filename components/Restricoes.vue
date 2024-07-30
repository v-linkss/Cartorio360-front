<template>
    <div>
      <v-autocomplete
        v-if="!isLoading"
        v-model="estado_civil"
        :items="estadoCivilItems"
        item-title="descricao"
        item-value="token"
        label="Estado Civil"
      ></v-autocomplete>
      <div v-else>Loading...</div>
    </div>
  </template>
  <script>
  export default {
      setup() {
        const estado_civil = ref([])
        const estadoCivilItems = ref([]);
        const isLoading = ref(true);
    
        const fetchEstadoCivil = async () => {
          try {
            const { data } = await useLazyFetch("http://localhost:3200/listarEstadoCivil", {
              method: "POST",
            });
            estadoCivilItems.value = data.value;
          } catch (error) {
            console.error("Error fetching estado civil items:", error);
          } finally {
            isLoading.value = false;
          }
        };
    
        onMounted(fetchEstadoCivil);
    
        return {
          estadoCivilItems,
          estado_civil,
          isLoading,
        };
      },
    };  
</script>