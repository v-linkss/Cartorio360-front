<template>
  <div>
    <form >
      <h1>Envio dados Minio</h1>
      <input type="file" @change="onFileChange" required />
      <button type="submit" @click="handleSubmit">Upload</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const cpf = ref('12345678910');
const imageId = ref('23');
const file = ref<File | null>(null);

const onFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files.length > 0) {
    file.value = target.files[0];
  }
};

const handleSubmit = async () => {
  if (!file.value) return;

  const formData = new FormData();
  formData.append('cpf', cpf.value);
  formData.append('imageId', imageId.value);
  formData.append('file', file.value);

  const { data:responseData, error } = await useFetch('http://localhost:3345/minio/upload', {
    method: 'POST',
    body: formData,
  });

  console.log(responseData.value)
  if (error.value) {
    console.error('Error uploading file:', error.value);
  } else {
    console.log('Upload successful:');
  }
};
</script>