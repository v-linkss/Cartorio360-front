import { useSSRContext, ref, computed, mergeProps, unref, watch, nextTick } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrRenderClass, ssrInterpolate, ssrRenderAttr } from 'vue/server-renderer';
import { _ as _export_sfc, f as useRoute$1, c as useRuntimeConfig } from './server.mjs';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:fs';
import 'node:path';
import 'node:url';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'devalue';
import '@unhead/ssr';
import 'unhead';
import '@unhead/shared';
import 'pinia';
import 'vue-router';
import 'vue3-toastify';
import 'vue-the-mask';

const _sfc_main$4 = {
  __name: "ChatSidebar",
  __ssrInlineRender: true,
  props: {
    chats: { type: Array, required: true },
    activeChatId: { type: [String, Number], required: true }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<aside${ssrRenderAttrs(mergeProps({ class: "chat-sidebar" }, _attrs))} data-v-e3721af5><h2 class="sidebar-header" data-v-e3721af5>Cart\xF3rio 360</h2><!--[-->`);
      ssrRenderList(__props.chats, (chat) => {
        _push(`<button class="${ssrRenderClass([{ active: chat.id === __props.activeChatId }, "chat-item"])}" data-v-e3721af5><span class="chat-name" data-v-e3721af5>${ssrInterpolate(chat.name)}</span><span class="chat-preview" data-v-e3721af5>${ssrInterpolate(chat.preview)}</span></button>`);
      });
      _push(`<!--]--></aside>`);
    };
  }
};
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/chat_atendimento/ChatSidebar.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : undefined;
};
const ChatSidebar = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__scopeId", "data-v-e3721af5"]]);
const _sfc_main$3 = {
  __name: "ChatHistory",
  __ssrInlineRender: true,
  props: { messages: Array },
  setup(__props) {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    function formatText(text) {
      return text.replace(urlRegex, (url) => `<a href="${url}" target="_blank" class="chat-link">${url}</a>`);
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "chat-history" }, _attrs))} data-v-067b9bdc><!--[-->`);
      ssrRenderList(__props.messages, (msg, i) => {
        var _a;
        _push(`<div class="${ssrRenderClass(["chat-bubble", msg.from === "user" ? "from-user" : "from-server"])}" data-v-067b9bdc>${(_a = formatText(msg.text)) != null ? _a : ""}</div>`);
      });
      _push(`<!--]--></div>`);
    };
  }
};
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/chat_atendimento/ChatHistory.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : undefined;
};
const ChatHistory = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-067b9bdc"]]);
const _sfc_main$2 = {
  __name: "ChatInput",
  __ssrInlineRender: true,
  emits: ["send"],
  setup(__props, { emit: __emit }) {
    const text = ref("");
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<footer${ssrRenderAttrs(mergeProps({ class: "chat-input-area" }, _attrs))} data-v-7b918800><input${ssrRenderAttr("value", text.value)} class="chat-input" placeholder="Digite sua mensagem\u2026" data-v-7b918800><button class="chat-send-button" data-v-7b918800>\u{1F4E4}</button></footer>`);
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/chat_atendimento/ChatInput.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : undefined;
};
const ChatInput = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-7b918800"]]);
const _sfc_main$1 = {
  __name: "ChatWindow",
  __ssrInlineRender: true,
  props: {
    chat: { type: Object, required: true },
    userName: { type: String, required: true },
    cartorioToken: { type: String, required: true }
  },
  setup(__props) {
    const props = __props;
    const messages = ref([]);
    let socket = null;
    const config = useRuntimeConfig();
    function connect() {
      if (socket) socket.close();
      const url = `${config.public.chat_bot}?user_name=Ewerton&room_id=${props.chat.room}`;
      console.log("Conectando no chat:", url);
      socket = new WebSocket(url);
      socket.addEventListener("message", handleMessage);
    }
    function handleMessage(evt) {
      try {
        const data = JSON.parse(evt.data);
        if (data.type === "chat_message" && data.username !== "Ewerton") {
          messages.value.push({
            from: data.username === "Ewerton",
            text: data.message
          });
        }
        if (data.message.state === "MenuPrincipal") {
          console.log("\u{1F4DC} Carregando hist\xF3rico...");
          messages.value = [];
          console.log("\u{1F4DC} Hist\xF3rico carregado:", data.history);
          processHistory(data.history);
        }
      } catch (e) {
      }
      nextTick(() => scrollBottom());
    }
    function sendMessage(text) {
      if (!socket || socket.readyState !== WebSocket.OPEN) return;
      const payload = { type: "chat_message", message: text, cartorio_token: props.cartorioToken, isHumanized: true };
      messages.value.push({ from: "user", text });
      socket.send(JSON.stringify(payload));
      nextTick(() => scrollBottom());
    }
    function scrollBottom() {
      var _a;
      const el = ((_a = historyRef.value) == null ? undefined : _a.$el) || historyRef.value;
      if (el) el.scrollTop = el.scrollHeight;
    }
    const historyRef = ref(null);
    watch(() => props.chat.room, connect, { immediate: true });
    function processHistory(history) {
      console.log("\u{1F4DC} Processando hist\xF3rico:", history);
      history.forEach((entry) => {
        if (entry.type === "chat_message") {
          console.log("\u{1F4DC} Processando mensagem do chat_message:", entry);
          var from = entry.username;
          if (entry.username === "Ewerton") {
            from = "user";
          } else {
            from = entry.username;
          }
          messages.value.push({ from, text: entry.message });
        } else if (entry.type === "bot_message") {
          console.log("\u{1F4DC} Processando mensagem do bot_message:", entry);
          messages.value.push({ from: "server", text: entry.message.message || entry.message });
        } else {
          console.warn("\u26A0\uFE0F Tipo de mensagem desconhecido:", entry.type);
        }
      });
      nextTick(() => {
        if (historyRef.value) {
          historyRef.value.scrollTop = historyRef.value.scrollHeight;
        }
      });
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "chat-window" }, _attrs))} data-v-f47b55d7><header class="chat-header" data-v-f47b55d7><h3 class="chat-title" data-v-f47b55d7>${ssrInterpolate(__props.chat.name)}</h3><button class="chat-close" data-v-f47b55d7>\u2716</button></header>`);
      _push(ssrRenderComponent(ChatHistory, {
        ref: "history",
        messages: messages.value,
        class: "history"
      }, null, _parent));
      _push(ssrRenderComponent(ChatInput, { onSend: sendMessage }, null, _parent));
      _push(`</section>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/chat_atendimento/ChatWindow.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : undefined;
};
const ChatWindow = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-f47b55d7"]]);
const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    var _a;
    const chats = ref([]);
    const activeChatId = ref(null);
    ref(false);
    const activeChat = computed(() => chats.value.find((c) => c.id === activeChatId.value));
    const route = useRoute$1();
    const cartorioToken = (_a = route.query.cartorio_token) != null ? _a : "";
    const userName = ref("");
    function selectChat(id) {
      activeChatId.value = id;
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "chat-app" }, _attrs))} data-v-17c49c7c>`);
      _push(ssrRenderComponent(ChatSidebar, {
        chats: chats.value,
        "active-chat-id": activeChatId.value,
        onSelect: selectChat
      }, null, _parent));
      if (activeChat.value) {
        _push(ssrRenderComponent(ChatWindow, {
          chat: activeChat.value,
          "user-name": userName.value,
          "cartorio-token": unref(cartorioToken),
          onClose: ($event) => activeChatId.value = null
        }, null, _parent));
      } else {
        _push(`<div class="placeholder" data-v-17c49c7c> Selecione um chat \xE0 esquerda </div>`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/chat_atendimento/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : undefined;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-17c49c7c"]]);

export { index as default };
//# sourceMappingURL=index-4CP_h7Of.mjs.map
