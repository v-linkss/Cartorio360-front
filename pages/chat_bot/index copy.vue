<template>
  <div class="chat-app">
    <!-- Sidebar fictícia para imitar o layout do WhatsApp Web -->
    <aside class="sidebar">
      <div class="sidebar-header">Cartório 360</div>
      <div class="user-info">👤 {{ userName || 'Usuário' }}</div>
    </aside>

    <!-- Chat principal -->
    <main class="chat-window">
      <header class="chat-header">
        <div class="chat-title">Atendimento Online</div>
        <button class="chat-close" @click="closeChat">✖</button>
      </header>

      <section ref="chatHistory" class="chat-history">
        <div
          v-for="(msg, i) in messages"
          :key="i"
          :class="['chat-bubble', bubbleClass(msg.from)]"
          v-html="msg.text.message || msg.text"
        />
      </section>

      <footer class="chat-input-area">
        <input
          v-model="input"
          class="chat-input"
          placeholder="Digite sua mensagem..."
          @keyup.enter="sendMessage"
        />
        <button @click="sendMessage" class="chat-send-button">📤</button>
      </footer>
    </main>
  </div>
</template>



<script setup>

import { useRoute } from 'vue-router';
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue';
definePageMeta({
  layout: 'empty',
});
const config = useRuntimeConfig();
const route = useRoute();

const input = ref('');
const messages = ref([
  { from: 'server', text: 'Por favor, me informe seu nome' }
]);
const userName = ref();

const chatHistory = ref(null)

const exibirBotãoDownload = ref()
let socket = null;


const cartorio_token = route.query.cartorio_token

function addMessage(from, text) {
  messages.value.push({ from, text });
  nextTick(() => {
    if (chatHistory.value) {
      chatHistory.value.scrollTop = chatHistory.value.scrollHeight;
    }
  });
}

function sendMessage() {
  if(!userName.value){
    userName.value = input.value
    connect()

  }

  if (!input.value.trim()) return;
    const msg = formatMessage(input.value);
    addMessage('user', msg);
    const data = {
      type: "chat_bot_message",
      message: msg,
      cartorio_token: cartorio_token


  } 
  input.value = '';
  socket.send(JSON.stringify(data)); 
}

  function connect() {
    // socket = new WebSocket(`ws://157.230.216.74:3452?user_name=${userName.value}`);
    socket = new WebSocket(`${config.public.chat_bot}?user_name=${userName.value}`);

    socket.addEventListener('open', () => {
      console.log('✅ Conectado ao servidor');
    });

    socket.addEventListener('message', (event) => {
      try {
        const data = JSON.parse(event.data);
        const state = data?.message?.state;

        switch (state) {
          case 'ExibirResposta':
            console.log('📥 ExibirResposta');
            exibirBotãoDownload.value = data.message;
            addMessage('button', data.message);
            break;

          case 'Fim':
            console.log('📴 Chat encerrado pelo servidor');
            socket.close(1000, 'Chat encerrado pelo servidor');
            break;

          case undefined:
            if (data.type === 'connection_info') {
              console.log('🔗 Informações de conexão recebidas');
              // addMessage('system', `Conectado como ${data.username} na sala ${data.roomId}`);
            } else {
              console.log('📩 Mensagem desconhecida:', data);
              addMessage('server', JSON.stringify(data));
            }
            break;

          default:
            console.log(`📨 Mensagem com estado "${state}"`);
            addMessage('server', data.message);
            break;
        }

      } catch (e) {
        console.error('❌ Erro ao processar mensagem:', e);
        addMessage('server', event.data);
      }
    });


    socket.addEventListener('close', () => {
      console.log('❌ Conexão encerrada');
      addMessage('system', '⚠️ Chat encerrado');
    });

    socket.addEventListener('error', (error) => {
      console.error('⚠️ Erro na conexão:', error);
      addMessage('system', '⚠️ Erro na conexão');
    });
  };

  function downloadDocument(url) {
    fetch(url)
    .then(response=>{
      if (!response.ok) {
        throw new Error('Erro ao baixar o arquivo');
      }
      return response.blob();
    })
    .then(blob => {
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'documento.pdf';
      link.click();
      URL.revokeObjectURL(url);
    })
  }

function formatMessage(text) {
  const rawText = typeof text === 'object' ? text.message : text;
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  return rawText.replace(urlRegex, (url) => {
    return `<a href="${url}" target="_blank" class="chat-link">${url}</a>`;
  });
}

function bubbleClass(from) {
  return {
    'from-user': from === 'user',
    'from-server': from === 'server',
    'from-system': from === 'system',
    'from-button': from === 'button'
  };
}

onBeforeUnmount(() => {
  if (socket && socket.readyState === WebSocket.OPEN) {
    socket.close();
  }
});
</script>

<style scoped>
.chat-app {
  display: flex;
  height: 100vh;
  font-family: 'Segoe UI', sans-serif;
  background-color: #f0f2f5;
}

/* Sidebar */
.sidebar {
  width: 280px;
  background-color: #111b21;
  color: white;
  display: flex;
  flex-direction: column;
  padding: 1rem;
}

.sidebar-header {
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

.user-info {
  font-size: 0.9rem;
  color: #aebac1;
}

/* Chat */
.chat-window {
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: #e5ddd5;
}

/* Header */
.chat-header {
  background-color: #075e54;
  color: white;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* History */
.chat-history {
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

/* Bubbles */
.chat-bubble {
  max-width: 75%;
  padding: 0.7rem 1rem;
  border-radius: 8px;
  word-wrap: break-word;
  white-space: pre-wrap;
}

.from-user {
  align-self: flex-end;
  background-color: #dcf8c6;
}

.from-server {
  align-self: flex-start;
  background-color: #fff;
}

.from-system {
  align-self: center;
  background-color: #fffae6;
  font-style: italic;
  color: #555;
}

.from-button {
  align-self: flex-start;
  background-color: #3b82f6;
  color: white;
  cursor: pointer;
  text-align: center;
}

/* Input */
.chat-input-area {
  display: flex;
  padding: 1rem;
  background-color: #f0f2f5;
  gap: 0.5rem;
}

.chat-input {
  flex: 1;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 20px;
  font-size: 1rem;
  outline: none;
}

.chat-send-button {
  background-color: #128c7e;
  color: white;
  border: none;
  border-radius: 20px;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  cursor: pointer;
}

</style>
