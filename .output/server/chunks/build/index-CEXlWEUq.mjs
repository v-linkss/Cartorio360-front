import { ref, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrRenderClass, ssrInterpolate, ssrRenderAttr } from 'vue/server-renderer';
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
import 'vue-router';
import 'vue3-toastify';
import 'vue-the-mask';

const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const input = ref("");
    const messages = ref([]);
    ref(null);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "chat-container" }, _attrs))} data-v-d64f41a3><div class="chat-header" data-v-d64f41a3><span class="chat-title" data-v-d64f41a3>Chat</span><button class="chat-close" data-v-d64f41a3>\xD7</button></div><div class="chat-history" data-v-d64f41a3><!--[-->`);
      ssrRenderList(messages.value, (msg, i) => {
        _push(`<div class="${ssrRenderClass([
          "chat-bubble",
          msg.from === "user" ? "user-bubble" : msg.from === "system" ? "system-bubble" : "server-bubble"
        ])}" data-v-d64f41a3>${ssrInterpolate(msg.text.message || msg.text)}</div>`);
      });
      _push(`<!--]--></div><form class="chat-input-area" data-v-d64f41a3><input${ssrRenderAttr("value", input.value)} type="text" placeholder="Digite sua mensagem..." class="chat-input" data-v-d64f41a3><button type="submit" class="chat-send-button" data-v-d64f41a3>\u27A4</button></form></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/chat_bot/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : undefined;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-d64f41a3"]]);

export { index as default };
//# sourceMappingURL=index-CEXlWEUq.mjs.map
