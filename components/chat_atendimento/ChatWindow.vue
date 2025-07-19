<template>
  <section class="chat-window">
    <header class="chat-header">
      <h3 class="chat-title">{{ chat.name.split("_").slice(1).join("_")   }}</h3>
      <div>
        <button class="chat-button end" @click="endChat">Encerrar</button>
        <button class="chat-close" @click="$emit('close')">✖</button>
      </div>
    </header>

    <ChatHistory ref="history" :messages="messages" class="history" />
    <ChatInput @send="sendMessage" />
  </section>
</template>

<script setup>
import { ref, watch, nextTick, onBeforeUnmount } from 'vue'
import ChatHistory from './ChatHistory.vue'
import ChatInput   from './ChatInput.vue'
import { useRuntimeConfig } from '#imports'
const userNameCookie = useCookie('userName')  // retorna um proxy

const props = defineProps({
  chat:           { type:Object, required:true },
  userName:       { type:String, required:true },
  cartorioToken:  { type:String, required:true }
})

const emit = defineEmits(['close', 'end'])

const messages  = ref([])
let socket      = null
const config    = useRuntimeConfig()

function connect(){
  if(socket) socket.close()
  const url = `${config.public.chat_bot}?user_name=${userNameCookie.value}&room_id=${props.chat.room}`
  console.log('Conectando no chat:', url)
  socket = new WebSocket(url)
  socket.addEventListener('message', handleMessage)
}

function handleMessage(evt){
  try{
    const data = JSON.parse(evt.data)
    if(data.type === 'chat_message' && data.username !== userNameCookie.value){
      messages.value.push({
        from: data.username === userNameCookie.value,
        text: data.message
      })
    }
    if(data.message.state === 'MenuPrincipal'){
      console.log("📜 Carregando histórico...");
      messages.value = []
      console.log("📜 Histórico carregado:", data.history)
      processHistory(data.history)
    }
  }catch(e){}
  nextTick(()=>scrollBottom())
}

function sendMessage(text){
  if(!socket || socket.readyState!==WebSocket.OPEN) return
  const payload = { type:'chat_message', message:text, cartorio_token:props.cartorioToken, isHumanized: true }
  messages.value.push({ from:'user', text })
  socket.send(JSON.stringify(payload))
  nextTick(()=>scrollBottom())
}

function scrollBottom(){
  const el = historyRef.value?.$el || historyRef.value
  if(el) el.scrollTop = el.scrollHeight
}

function endChat(){
  if(socket) socket.close(4001,'EncerraAtendimento')
  socket = null
  messages.value.push({ from:'server', text: '🛑 Atendimento encerrado.' })
  emit('end') // permite que o componente pai saiba
}

const historyRef = ref(null)

watch(()=>props.chat.room, connect, { immediate:true })
onBeforeUnmount(()=> socket && socket.close())

function processHistory(history) {
  console.log("📜 Processando histórico:", history)

  history.forEach(entry => {
    if (entry.type === 'chat_message') {
      var from = entry.username === userNameCookie.value ? userNameCookie.value : entry.username
      messages.value.push({ from, text: entry.message })
    } else if (entry.type === 'bot_message') {
      messages.value.push({ from: 'server', text: entry.message.message || entry.message })
    } else {
      console.warn("⚠️ Tipo de mensagem desconhecido:", entry.type)
    }
  })

  nextTick(() => {
    if (historyRef.value) {
      historyRef.value.scrollTop = historyRef.value.scrollHeight
    }
  })
}



</script>

<style scoped>
.chat-window      { flex:1; display:flex; flex-direction:column; background:#e5ddd5; }
.chat-header      { background:#075e54; color:#fff; padding:1rem; display:flex; justify-content:space-between; align-items:center; }
.chat-title       { margin:0; font-weight:600; }
.chat-close       { background:transparent; border:none; color:#fff; font-size:1.25rem; cursor:pointer; }
.chat-button.end  { margin-right: 1rem; background:#c62828; border:none; color:white; padding:0.4rem 1rem; border-radius:5px; cursor:pointer; }
.chat-button.end:hover { background:#b71c1c; }
.history          { flex:1; overflow-y:auto; padding:1rem; display:flex; flex-direction:column; gap:.5rem; }
</style>
