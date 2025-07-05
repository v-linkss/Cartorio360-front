<template>
  <div class="chat-history">
    <div
      v-for="(msg,i) in messages"
      :key="i"
      :class="['chat-bubble', msg.from==='user' ? 'from-user' : 'from-server']"
      v-html="formatText(msg.text)"
    ></div>
  </div>
</template>
<script setup>
const props = defineProps({ messages:Array })
const urlRegex = /(https?:\/\/[^\s]+)/g
function formatText(text){
  return text.replace(urlRegex, url => `<a href="${url}" target="_blank" class="chat-link">${url}</a>`)
}
</script>
<style scoped>
.chat-history   { display:flex; flex-direction:column; gap:.5rem; }
.chat-bubble    { max-width:75%; padding:.7rem 1rem; border-radius:8px; word-wrap:break-word; white-space:pre-wrap; }
.from-user      { align-self:flex-end; background:#dcf8c6; }
.from-server    { align-self:flex-start; background:#fff; }
.chat-link      { color:#2563eb; text-decoration:underline; word-break:break-all; }
</style>

