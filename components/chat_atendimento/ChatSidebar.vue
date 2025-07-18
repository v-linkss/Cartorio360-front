<template>
  <aside class="chat-sidebar">
    <h2 class="sidebar-header">Cartório 360</h2>
    <button
      v-for="chat in chats"
      :key="chat.id"
      class="chat-item"
      :class="{ active: chat.id === activeChatId }"
      @click="$emit('select', chat.id)"
    >
      <span class="chat-name">{{ chat.name.split("_").slice(1).join("_")   }}</span>
      <span class="chat-preview">{{ chat.preview }}</span>
    </button>
  </aside>
</template>
<script setup>
const props = defineProps({
  chats:         { type:Array, required:true },
  activeChatId:  { type:[String,Number], required:true }
})
</script>
<style scoped>
.chat-sidebar        { width:280px; background:#111b21; color:#fff; display:flex; flex-direction:column; padding:1rem; overflow-y:auto; }
.sidebar-header      { font-size:1.25rem; font-weight:700; margin-bottom:1rem; }
.chat-item           { background:#202c33; padding:.75rem; border-radius:8px; text-align:left; cursor:pointer; transition:background .3s ease; border:none; width:100%; }
.chat-item:hover     { background:#2a3942; }
.chat-item.active    { background:#005c4b; }
.chat-name           { font-weight:600; display:block; color:#fff; }
.chat-preview        { font-size:.8rem; color:#aebac1; margin-top:.2rem; display:block; }
</style>