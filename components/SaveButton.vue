<template>
  <v-btn
    :loading="loading"
    :disabled="loading || disabled"
    color="green"
    @click="handleClick"
    size="large"
  >
    <template v-slot:loader>
      <v-progress-circular
        indeterminate
        color="white"
        size="24"
      ></v-progress-circular>
    </template>
    <slot>Salvar</slot>
  </v-btn>
</template>

<script setup>
const props = defineProps({
  onSave: {
    type: Function,
    required: true,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

const loading = ref(false);

async function handleClick() {
  if (loading.value) return;
  loading.value = true;
  try {
    await props.onSave();
  } finally {
    loading.value = false;
  }
}
</script>
