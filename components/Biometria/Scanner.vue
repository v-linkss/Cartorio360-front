<template>
  <div>
    <img
      @click="openPrintModal"
      src="../../assets/escanearFicha.png"
      style="width: 280px; height: 120px; cursor: pointer; margin-top: 30px"
    />
    <v-dialog v-model="isPrintModalOpen" max-width="800">
      <v-card>
        <v-card-title>
          <span>Dados da digitalização</span>
        </v-card-title>
        <div>
          <v-select v-model="selectedIndex">
            <option
              v-for="(source, index) in sourceList"
              :value="index"
              :key="index"
            >
              {{ source.displayName }}
            </option>
          </v-select>
          <v-btn>Acquire Images</v-btn>
          <v-btn>Open Documents</v-btn>
        </div>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green" @click="printContent">Digitalizar</v-btn>
          <v-btn color="red" @click="isPrintModalOpen = false">Fechar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>

</script>

<style scoped></style>
