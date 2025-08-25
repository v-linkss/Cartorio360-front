<template>
  <v-app>
    <v-app-bar color="#0a063b" height="100">
      <div class="d-flex align-center">
        <img
          class="ml-5 mt-2"
          width="300"
          height="50"
          src="../assets/logo_navbar.png"
        />
        <h3 class="cartorio ml-6">{{ cartorioNome }}</h3>
      </div>

      <v-spacer />

      <template v-for="(menu, idx) in menuName" :key="`menu-${idx}`">
        <v-menu>
          <template #activator="{ props }">
            <v-btn v-bind="props" text class="white--text">
              {{ menu.name }}
            </v-btn>
          </template>

          <v-list>
            <v-list-item
              v-for="(sub, sIdx) in menu.subMenus"
              :key="`submenu-${sIdx}`"
            >
              <NuxtLink
                :to="`/${sub.url}`"
                class="text-decoration-none inherit"
              >
                <v-list-item-title>{{ sub.name }}</v-list-item-title>
              </NuxtLink>
            </v-list-item>
          </v-list>
        </v-menu>
      </template>

      <!-- Ícone de notificações -->
      <v-badge
        v-if="notificationCount > 0"
        :content="notificationCount"
        color="red"
        overlap
      >
        <v-btn icon @click="openNotificationPanel">
          <v-icon color="white">mdi-bell</v-icon>
        </v-btn>
      </v-badge>
      <v-btn v-else icon @click="openNotificationPanel">
        <v-icon color="white">mdi-bell</v-icon>
      </v-btn>

      <!-- Menu do usuário -->
      <v-menu>
        <template #activator="{ props }">
          <v-btn class="user" v-bind="props">{{ userName }}</v-btn>
        </template>

        <v-list>
          <v-list-item
            v-for="(item, i) in items"
            :key="`item-${i}`"
            @click="itemClick(item.title)"
          >
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <!-- Conteúdo principal -->
    <v-main>
      <slot />
    </v-main>
  </v-app>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import { useCookie } from "#app";
const config = useRuntimeConfig();

const router = useRouter();
const items = [{ title: "Alterar Senha" }, { title: "Sair" }];

const perfilCookie = useCookie("menu-navbar");
const userCookie = useCookie("user-data");
const authToken = useCookie("auth_token");

const menuName = computed(() =>
  Object.keys(perfilCookie.value || {})
    .filter((key) => key !== "Tela Principal")
    .map((key) => ({
      name: key,
      subMenus: Object.keys(perfilCookie.value[key]).map((subKey) => ({
        name: subKey,
        url: perfilCookie.value[key][subKey].url,
      })),
    }))
);

const userName = computed(() => userCookie.value?.nome ?? "Usuário");
const cartorioNome = computed(() => userCookie.value?.cartorio_nome ?? "");

const userNameCookie = useCookie("userName");
userNameCookie.value = userName.value;

const notificationCount = ref(0);
let socket = null;

function openNotificationPanel() {
  router.push("/chat_atendimento");
}

function connectWebSocket() {
  socket = new WebSocket(
    `${config.public.chat_bot}?user_name=${userName.value}&room_id=notifications`
  );

  socket.onopen = () => {
    console.log("🔌 WebSocket conectado");

    // Envia o evento "accept_request" após a conexão ser estabelecida
    sendAcceptRequest();
  };
  socket.onmessage = (event) => {
    try {
      console.log(event.data);
      const data = JSON.parse(event.data);
      switch (data.type) {
        case "notification":
          console.log("Nova notificação recebida:", data);
          notificationCount.value = data.queue.length || 0;
          break;
        case "queue_list":
          console.log("Lista de notificações recebida:", data);
          notificationCount.value = data.totalRequests || 0;
          break;
      }
    } catch (err) {
      console.error("Falha ao parsear mensagem:", err);
    }
  };

  socket.onclose = () => {
    console.warn("WebSocket desconectado — reconectando em 5 s…");
    setTimeout(connectWebSocket, 5_000);
  };

  socket.onerror = (err) => {
    console.error("Erro WebSocket:", err);
    socket.close();
  };
}
function goToNotifications() {
  router.push("/notifications"); // Substitua '/notifications' pela rota desejada
}

onMounted(connectWebSocket);
onUnmounted(() => socket?.close());

function itemClick(title) {
  if (title === "Sair") logout();
  if (title === "Alterar Senha") {
  }
}

function logout() {
  userCookie.value = "";
  authToken.value = "";
  router.push("/login");
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
    console.warn(
      "⚠️ WebSocket não está conectado. Tentando novamente em 1 segundo..."
    );
    setTimeout(sendAcceptRequest, 1000); // Tenta novamente após 1 segundo
  }
}
</script>

<style scoped>
.cartorio,
.white--text {
  color: #ffffff;
}

.inherit {
  color: inherit;
}

.ml-6 {
  margin-left: 30px;
}

.user {
  background: #ffffff;
  color: #73777a;
}
</style>
