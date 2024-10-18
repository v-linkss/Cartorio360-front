import { _ as __nuxt_component_0 } from './nuxt-link-DyZc7qn_.mjs';
import { u as useRouter$1, c as useRoute$1 } from './server.mjs';
import { withCtx, createVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrRenderStyle } from 'vue/server-renderer';
import { _ as _imports_0 } from './sair-CV1ySkp8.mjs';
import '../runtime.mjs';
import 'node:http';
import 'node:https';
import 'fs';
import 'path';
import 'node:fs';
import 'node:url';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'devalue';
import '@unhead/ssr';
import 'unhead';
import '@unhead/shared';
import 'vue-router';
import 'vue3-toastify';
import 'vue-the-mask';

const _sfc_main = {
  __name: "autencidade",
  __ssrInlineRender: true,
  props: {
    ato_token: {
      type: String,
      required: true
    }
  },
  setup(__props) {
    const router = useRouter$1();
    const route = useRoute$1();
    const goBack = () => {
      const origem = route.query.origem || "criar";
      const id = route.query.id;
      if (origem === "atualizar") {
        router.push(`/ordens-servicos/atualizar/${id}`);
      } else {
        router.push("/ordens-servicos/criar-registro");
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(_attrs)}><h1>Reconhecimento por Autencidade</h1><div>`);
      _push(ssrRenderComponent(_component_NuxtLink, { onClick: goBack }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<img class="btn-pointer mt-10 mb-5"${ssrRenderAttr("src", _imports_0)} alt="Sair" style="${ssrRenderStyle({ "cursor": "pointer" })}"${_scopeId}>`);
          } else {
            return [
              createVNode("img", {
                class: "btn-pointer mt-10 mb-5",
                src: _imports_0,
                alt: "Sair",
                style: { "cursor": "pointer" }
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/fontes/atos/reconhecimento/autencidade.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=autencidade-BWlbOK2c.mjs.map
