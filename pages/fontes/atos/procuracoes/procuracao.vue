<template>
    <h1>Procuração</h1>
    <ClientOnly>
        <div>
          <QuillEditor
            :options="editorOptions"
            contentType="html"
          />
        </div>
    </ClientOnly>
</template>

<script setup>
import { QuillEditor } from "@vueup/vue-quill";
import '@vueup/vue-quill/dist/vue-quill.snow.css';

const content = ref("");
const editorOptions = ref({
  theme: "snow",
  modules: {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
    ],
  },
});
</script>
