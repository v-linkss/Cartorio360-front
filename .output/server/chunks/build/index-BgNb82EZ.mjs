import { ref, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrRenderClass, ssrInterpolate, ssrRenderAttr } from 'vue/server-renderer';
import { useRoute } from 'vue-router';
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
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const input = ref("");
    const messages = ref([
      { from: "server", text: "Por favor, me informe seu nome" }
    ]);
    ref();
    ref(null);
    ref();
    route.query.cartorio_token;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "chat-container" }, _attrs))} data-v-368172da><div class="chat-header" data-v-368172da><span class="chat-title" data-v-368172da>Chat</span><button class="chat-close" data-v-368172da>\xD7</button></div><div class="chat-history" data-v-368172da><!--[-->`);
      ssrRenderList(messages.value, (msg, i) => {
        _push(`<div class="${ssrRenderClass([
          "chat-bubble",
          msg.from === "user" ? "user-bubble" : msg.from === "system" ? "system-bubble" : "server-bubble"
        ])}" data-v-368172da>`);
        if (msg.from === "button") {
          _push(`<button class="chat-button" data-v-368172da> \u{1F4CE} Baixar documento </button>`);
        } else {
          _push(`<!--[-->${ssrInterpolate(msg.text.message || msg.text)}<!--]-->`);
        }
        _push(`</div>`);
      });
      _push(`<!--]--></div><form class="chat-input-area" data-v-368172da><input${ssrRenderAttr("value", input.value)} type="text" placeholder="Digite sua mensagem..." class="chat-input" data-v-368172da><button type="submit" class="chat-send-button" data-v-368172da>\u27A4</button></form></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/chat_bot/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : undefined;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-368172da"]]);

export { index as default };
//# sourceMappingURL=index-BgNb82EZ.mjs.map
