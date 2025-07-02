// ChatApp.vue
<template>
  <div class="chat-app">
    <ChatSidebar
      :chats="chats"
      :active-chat-id="activeChatId"
      @select="selectChat"
    />

    <ChatWindow
      v-if="activeChat"
      :chat="activeChat"
      :user-name="userName"
      :cartorio-token="cartorioToken"
      @close="activeChatId=null"
    />

    <div v-else class="placeholder">
      Selecione um chat à esquerda
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRuntimeConfig } from '#imports'
import ChatSidebar from './components/chat_atendimento/ChatSidebar.vue'
import ChatWindow  from './components/chat_atendimento/ChatWindow.vue'
import { queue } from 'vue3-toastify';
definePageMeta({
  layout: 'empty',
});
/* ──────────── ESTADO GERAL ──────────── */
const config        = useRuntimeConfig()
const chats         = ref([])
const activeChatId  = ref(null)
const isHumanized  = ref(false)

const activeChat    = computed(() => chats.value.find(c => c.id === activeChatId.value))

const route         = useRoute()
const cartorioToken = route.query.cartorio_token ?? ''
const userName      = ref('')
let socket = null

/* ──────────── FUNÇÕES ──────────── */
function selectChat(id){ activeChatId.value = id }

/* Mock inicial para testar a UI sem WebSocket */

//use e ssa função para preencher 
function connectWebSocket() {
  socket = new WebSocket(`${config.public.chat_bot}?user_name='Ewerton'&room_id=notifications`);

  socket.onopen = () => {
    console.log('🔌 WebSocket conectado');

    // Envia o evento "accept_request" após a conexão ser estabelecida
    sendAcceptRequest();
  };

  socket.onmessage = (event) => {
    console.log('Mensagem recebida:', JSON.parse(event.data));
    try {
      const dataQueue = JSON.parse(event.data);
      chats.value = []; // Limpa para evitar valores duplicados

      dataQueue.queue.forEach(element => {
        const data = {
          id: element.id,
          name: element.name,
          room: element.room,
          preview: element.preview,
        };
        chats.value.push(data);
      });
    } catch (err) {
      console.error('Falha ao parsear mensagem:', err);
    }
  };

  socket.onclose = () => {
    console.warn('WebSocket desconectado — reconectando em 5 s…');
    setTimeout(connectWebSocket, 5_000);
  };

  socket.onerror = (err) => {
    console.error('Erro WebSocket:', err);
    socket.close();
  };
}



function sendAcceptRequest() {
  if (socket && socket.readyState === WebSocket.OPEN) {
    const payload = {
      type: "queue_list",
      message: "1",
      id: "notifications", // Substitua pelo ID correto, se necessário
    };
    socket.send(JSON.stringify(payload));
    console.log("📤 Evento enviado ao WebSocket:", payload);
  } else {
    console.warn("⚠️ WebSocket não está conectado. Tentando novamente em 1 segundo...");
    setTimeout(sendAcceptRequest, 1000); // Tenta novamente após 1 segundo
  }
}

onMounted(() => {
  connectWebSocket();
});

onUnmounted(() => socket?.close())
// onMounted(() => {
//   userName.value = '  (mock)'
//   chats.value = [
//     { id:'sala-joao',  name:'João da Silva', room:'sala-joao',  preview:'Olá, gostaria de autenticar um documento…' },
//     { id:'sala-maria', name:'Maria Oliveira',room:'sala-maria', preview:'Boa tarde, preciso de informações…' }
//   ]
// })
</script>

<style scoped>
.chat-app       { display:flex; height:100%; font-family:'Segoe UI', Arial, sans-serif; background:#f0f2f5; }
.placeholder    { flex:1; display:flex; align-items:center; justify-content:center; color:#666; font-size:1rem; }
</style>