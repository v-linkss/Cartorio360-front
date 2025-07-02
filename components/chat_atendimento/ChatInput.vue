// components/chat_atendimento/ChatInput.vue
<template>
  <footer class="chat-input-area">
    <input
      v-model="text"
      class="chat-input"
      placeholder="Digite sua mensagem…"
      @keyup.enter="emitSend"
    />
    <button class="chat-send-button" @click="emitSend">📤</button>
  </footer>
</template>
<script setup>
import { ref } from 'vue'
const emit = defineEmits(['send'])
const text = ref('')
function emitSend(){
  if(!text.value.trim()) return
  emit('send', text.value.trim())
  text.value = ''
}
</script>
<style scoped>
.chat-input-area  { display:flex; gap:.5rem; padding:1rem; background:#f0f2f5; }
.chat-input       { flex:1; padding:.5rem 1rem; border:1px solid #ccc; border-radius:20px; font-size:1rem; outline:none; }
.chat-send-button { background:#128c7e; color:#fff; border:none; border-radius:20px; padding:.5rem 1rem; font-size:1rem; cursor:pointer; }
.chat-send-button:hover{ background:#0d7c6d; }
</style>
