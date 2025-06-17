<template>
  <div class="chat-container">
    <!-- Cabeçalho azul -->
    <div class="chat-header">
      <span class="chat-title">Chat</span>
      <button class="chat-close">&times;</button>
    </div>

    <!-- Histórico -->
    <div ref="chatHistory" class="chat-history">
      <div
        v-for="(msg, i) in messages"
        :key="i"
        :class="[
          'chat-bubble',
          msg.from === 'user'
            ? 'user-bubble'
            : msg.from === 'system'
              ? 'system-bubble'
              : 'server-bubble'
        ]"
      >
        {{ msg.text.message || msg.text }}
      </div>
    </div>

    <!-- Input -->
    <form @submit.prevent="sendMessage" class="chat-input-area">
      <input
        v-model="input"
        type="text"
        placeholder="Digite sua mensagem..."
        class="chat-input"
      />
      <button type="submit" class="chat-send-button">➤</button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue';
definePageMeta({
  layout: 'empty',
});
const input = ref('');
const messages = ref([]);
const chatHistory = ref(null)

let socket = null;

function addMessage(from, text) {
  messages.value.push({ from, text });
  nextTick(() => {
    if (chatHistory.value) {
      chatHistory.value.scrollTop = chatHistory.value.scrollHeight;
    }
  });
}

function sendMessage() {
  if (!input.value.trim()) return;
  const msg = formatMessage(input.value);
  addMessage('user', msg);
  const data = {
    type: "chat_bot_message",
    message: msg,
    cartorio_token:"qvgjz"


  } 
  socket.send(JSON.stringify(data)); 
  input.value = '';
}

onMounted(() => {
  socket = new WebSocket('ws://157.230.216.74:3452?room=chat1&user_name=Deborah2');

  socket.addEventListener('open', () => {
    console.log('✅ Conectado ao servidor');
  });

  socket.addEventListener('message', (event) => {
    
    try {
      const data = JSON.parse(event.data);
      if (data.message) {
        addMessage('server', data.message);
      }
       else if (data.type === 'connection_info') {
        // addMessage('system', `🔗 Conectado como ${data.username} na sala ${data.roomId}`);
      }
       else {
        addMessage('server', JSON.stringify(data));
      }
    } catch (e) {
      addMessage('server', event.data);
    }
  });

  socket.addEventListener('close', () => {
    console.log('❌ Conexão encerrada');
    addMessage('system', '⚠️ Conexão encerrada');
  });

  socket.addEventListener('error', (error) => {
    console.error('⚠️ Erro na conexão:', error);
    addMessage('system', '⚠️ Erro na conexão');
  });
});

function formatMessage(text) {
  const rawText = typeof text === 'object' ? text.message : text;
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  return rawText.replace(urlRegex, (url) => {
    return `<a href="${url}" target="_blank" class="chat-link">${url}</a>`;
  });
}

onBeforeUnmount(() => {
  if (socket && socket.readyState === WebSocket.OPEN) {
    socket.close();
  }
});
</script>

<style scoped>
.chat-container {
  width: 600px;
  height: 500px;
  margin: 2rem auto;
  display: flex;
  flex-direction: column;
  border: 1px solid #ccc;
  border-radius: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  font-family: sans-serif;
}

.chat-header {
  background-color: #082657;
  color: white;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.chat-title {
  font-weight: bold;
}

.chat-close {
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
}

.chat-history {
  flex: 1;
  padding: 1rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  background-color: white;
}

/* Bolhas de mensagem */
.chat-bubble {
  padding: 0.75rem 1rem;
  border-radius: 20px;
  max-width: 80%;
  word-wrap: break-word;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
}

.user-bubble {
  align-self: flex-end;
  background-color: #dbeafe;
  text-align: right;
}

.server-bubble {
  align-self: flex-start;
  background-color: #e5e7eb;
  text-align: left;
}

.system-bubble {
  align-self: center;
  background-color: #fef9c3;
  font-size: 0.85rem;
  font-style: italic;
  color: #555;
  text-align: center;
}

/* Área do input */
.chat-input-area {
  display: flex;
  border-top: 1px solid #ddd;
  padding: 0.75rem;
  background: white;
  gap: 0.5rem;
}

.chat-input {
  flex: 1;
  padding: 0.5rem 1rem;
  border: 1px solid #ccc;
  border-radius: 999px;
  font-size: 0.95rem;
  outline: none;
}

.chat-send-button {
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 999px;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s ease;
}

.chat-send-button:hover {
  background-color: #2563eb;
}
</style>
