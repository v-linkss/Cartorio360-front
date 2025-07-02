import { ssrInterpolate, ssrRenderList, ssrRenderClass, ssrRenderAttr } from 'vue/server-renderer';
import { useRoute } from 'vue-router';
import { ref, computed, useSSRContext } from 'vue';
import { _ as _export_sfc } from './server.mjs';
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
import 'vue3-toastify';
import 'vue-the-mask';

const _sfc_main = {
  __name: "atendimento",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const input = ref("");
    const messages = ref([]);
    const chatList = ref([
      { id: 1, name: "Atendimento Cart\xF3rio", preview: "\xDAltima mensagem\u2026" },
      { id: 2, name: "Suporte T\xE9cnico", preview: "Estamos analisando\u2026" }
    ]);
    const activeChatId = ref(1);
    computed(() => chatList.value.find((c) => c.id === activeChatId.value));
    ref();
    ref(null);
    ref();
    route.query.cartorio_token;
    function bubbleClass(from) {
      return {
        "from-user": from === "user",
        "from-server": from === "server",
        "from-system": from === "system",
        "from-button": from === "button"
      };
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->${ssrInterpolate(messages.value)} <div class="chat-app" data-v-52774488><aside class="sidebar" data-v-52774488><div class="sidebar-header" data-v-52774488>Cart\xF3rio 360</div><div class="chat-list" data-v-52774488><!--[-->`);
      ssrRenderList(chatList.value, (chat) => {
        _push(`<div class="${ssrRenderClass(["chat-item", { active: chat.id === activeChatId.value }])}" data-v-52774488><div class="chat-name" data-v-52774488>${ssrInterpolate(chat.name)}</div><div class="chat-preview" data-v-52774488>${ssrInterpolate(chat.preview)}</div></div>`);
      });
      _push(`<!--]--></div></aside><main class="chat-window" data-v-52774488><header class="chat-header" data-v-52774488><div class="chat-title" data-v-52774488>Atendimento Online</div><button class="chat-close" data-v-52774488>\u2716</button></header><section class="chat-history" data-v-52774488><!--[-->`);
      ssrRenderList(messages.value, (msg, i) => {
        var _a;
        _push(`<div class="${ssrRenderClass(["chat-bubble", bubbleClass(msg.from)])}" data-v-52774488>${(_a = msg.text.message || msg.text) != null ? _a : ""}</div>`);
      });
      _push(`<!--]--></section><footer class="chat-input-area" data-v-52774488><input${ssrRenderAttr("value", input.value)} class="chat-input" placeholder="Digite sua mensagem..." data-v-52774488><button class="chat-send-button" data-v-52774488>\u{1F4E4}</button></footer></main></div><!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/chat_bot/atendimento.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : undefined;
};
const atendimento = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-52774488"]]);

export { atendimento as default };
//# sourceMappingURL=atendimento-BC7Fv87C.mjs.map
