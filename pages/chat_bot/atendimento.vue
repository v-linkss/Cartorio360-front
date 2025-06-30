<template>
  {{ messages }}
  <div class="chat-app">
    <!-- Sidebar fictícia para imitar o layout do WhatsApp Web -->
    <aside class="sidebar">
      <div class="sidebar-header">Cartório 360</div>

      <!-- Lista (simulada) de chats -->
      <div class="chat-list">
        <div
          v-for="chat in chatList"
          :key="chat.id"
          :class="['chat-item', { active: chat.id === activeChatId }]"
          @click="selectChat(chat.id)"
        >
          <div class="chat-name">{{ chat.name }}</div>
          <div class="chat-preview">{{ chat.preview }}</div>
        </div>
      </div>
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
]);


/* Sidebar: lista fictícia de chats (pode vir da API depois) */
const chatList = ref([
  { id: 1, name: 'Atendimento Cartório', preview: 'Última mensagem…' },
  { id: 2, name: 'Suporte Técnico',       preview: 'Estamos analisando…' }
])

const activeChatId = ref(1)
const activeChat   = computed(() => chatList.value.find(c => c.id === activeChatId.value))

const userName = ref();

const chatHistory = ref(null)

const exibirBotãoDownload = ref()
let socket = null;


const cartorio_token = route.query.cartorio_token

function addMessage(from, text) {
  if(from !== userName.value){
    messages.value.push({ from, text });
  }
  nextTick(() => {
    if (chatHistory.value) {
      chatHistory.value.scrollTop = chatHistory.value.scrollHeight;
    }
  });
}

function sendMessage() {
  // if(!userName.value){
  //   userName.value = 'Camila'
  //   connect()

  // }


  if (!input.value.trim()) return;
    const msg = formatMessage(input.value);
    addMessage('user', msg);
    const data = {
      type: "chat_message",
      message: msg,
      cartorio_token: cartorio_token


  } 
  input.value = '';
  console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$\n",data)
  socket.send(JSON.stringify(data)); 
}

  function connect() {
    if(!userName.value){
      userName.value = 'Camila'

    }
    // socket = new WebSocket(`ws://157.230.216.74:3452?user_name=${userName.value}`);
    socket = new WebSocket(`${config.public.chat_bot}?user_name=${userName.value}&room_id=1750948570391Ewerton`);

    socket.addEventListener('open', () => {
      console.log('✅ Conectado ao servidor');
      
    });

    socket.addEventListener('message', (event) => {
      try {
        const data = JSON.parse(event.data);
        const state = data?.message?.state;
        console.log('###############################'.data);
        switch (state) {

          case 'Fim':
            console.log('📴 Chat encerrado pelo servidor');
            socket.close(1000, 'Chat encerrado pelo servidor');
            break;

          case undefined:
            if (data.type === 'connection_info') {
              console.log('🔗 Informações de conexão recebidas');
              // addMessage('system', `Conectado como ${data.username} na sala ${data.roomId}`);
            } else {
              if(data.username && data.username != userName.value){
                addMessage('server', data.message);
                
              }else{
  

                addMessage(userName.value, data.message);
              }
            }
            break;

          case 'MenuPrincipal':

            if (state === 'MenuPrincipal' && Array.isArray(data.history)) {
              console.log("📜 Carregando histórico...");
              messages.value = [];
              processHistory(data.history);
              return;
            }

            // addMessage('server', data.message);
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

  function processHistory(history) {
  history.forEach(entry => {
    if (entry.type === 'chat_message') {
      const from = entry.username === userName.value ? 'user' : 'server';
      messages.value.push({ from, text: formatMessage(entry.message) });
    } else if (entry.type === 'bot_message') {
      messages.value.push({ from: 'server', text: formatMessage(entry.message.message || entry.message) });
    }
  });

  nextTick(() => {
    if (chatHistory.value) {
      chatHistory.value.scrollTop = chatHistory.value.scrollHeight;
    }
  });
}
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

function selectChat(id) {
  activeChatId.value = id
  // futuramente: carregar mensagens distintas por chat
}

onMounted(() => {
  connect(); // Chama a função connect ao montar o componente
});
</script>

<style scoped>
.chat-app  { display:flex; height:100vh; font-family:'Segoe UI',sans-serif; background:#f0f2f5 }

/* ----- SIDEBAR (única definição) ----- */
.sidebar   { width:280px; background:#111b21; color:#fff; display:flex; flex-direction:column; padding:1rem; overflow-y:auto }
.sidebar-header{ font-size:1.25rem; font-weight:700; margin-bottom:1rem }

.chat-list { display:flex; flex-direction:column; gap:.75rem }
.chat-item { background:#202c33; padding:.75rem; border-radius:8px; cursor:pointer; transition:background .3s }
.chat-item:hover { background:#2a3942 }
.chat-item.active{ background:#005c4b }
.chat-name { font-weight:600 }
.chat-preview{ font-size:.8rem; color:#aebac1; margin-top:.2rem }

/* ----- JANELA DE CHAT ----- */
.chat-window { flex:1; display:flex; flex-direction:column; background:#e5ddd5 }
.chat-header { background:#075e54; color:#fff; padding:1rem; display:flex; justify-content:space-between; align-items:center }
.chat-history{ flex:1; overflow-y:auto; padding:1rem; display:flex; flex-direction:column; gap:.5rem }

.chat-bubble { max-width:75%; padding:.7rem 1rem; border-radius:8px; word-wrap:break-word; white-space:pre-wrap }
.from-user   { align-self:flex-end; background:#dcf8c6 }
.from-server { align-self:flex-start; background:#fff }
.from-system { align-self:center; background:#fffae6; font-style:italic; color:#555 }
.from-button { align-self:flex-start; background:#3b82f6; color:#fff; cursor:pointer; text-align:center }

/* Botão de download */
.chat-button { display:inline-block; padding:.75rem 1.25rem; border:none; border-radius:999px; background:linear-gradient(to right,#3b82f6,#2563eb); color:#fff; font-weight:600; cursor:pointer; transition:background .3s,transform .2s }
.chat-button:hover{ background:linear-gradient(to right,#2563eb,#1d4ed8); transform:translateY(-2px) }

/* Input */
.chat-input-area{ display:flex; padding:1rem; background:#f0f2f5; gap:.5rem }
.chat-input { flex:1; padding:.5rem 1rem; border:none; border-radius:20px; font-size:1rem; outline:none }
.chat-send-button{ background:#128c7e; color:#fff; border:none; border-radius:20px; padding:.5rem 1rem; font-size:1rem; cursor:pointer }
.chat-send-button:hover{ background:#0d7c6d }
</style>
