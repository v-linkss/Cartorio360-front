import { ref, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderList, ssrRenderClass, ssrRenderAttr } from 'vue/server-renderer';
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
  __name: "index copy",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const input = ref("");
    const messages = ref([
      { from: "server", text: "Por favor, me informe seu nome" }
    ]);
    const userName = ref();
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "chat-app" }, _attrs))} data-v-523cd452><aside class="sidebar" data-v-523cd452><div class="sidebar-header" data-v-523cd452>Cart\xF3rio 360</div><div class="user-info" data-v-523cd452>\u{1F464} ${ssrInterpolate(userName.value || "Usu\xE1rio")}</div></aside><main class="chat-window" data-v-523cd452><header class="chat-header" data-v-523cd452><div class="chat-title" data-v-523cd452>Atendimento Online</div><button class="chat-close" data-v-523cd452>\u2716</button></header><section class="chat-history" data-v-523cd452><!--[-->`);
      ssrRenderList(messages.value, (msg, i) => {
        var _a;
        _push(`<div class="${ssrRenderClass(["chat-bubble", bubbleClass(msg.from)])}" data-v-523cd452>${(_a = msg.text.message || msg.text) != null ? _a : ""}</div>`);
      });
      _push(`<!--]--></section><footer class="chat-input-area" data-v-523cd452><input${ssrRenderAttr("value", input.value)} class="chat-input" placeholder="Digite sua mensagem..." data-v-523cd452><button class="chat-send-button" data-v-523cd452>\u{1F4E4}</button></footer></main></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/chat_bot/index copy.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : undefined;
};
const index_copy = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-523cd452"]]);

export { index_copy as default };
//# sourceMappingURL=index copy-DydcPw0z.mjs.map
