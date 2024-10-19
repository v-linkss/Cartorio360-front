import { u as useRouter$1, c as useRoute$1 } from './server.mjs';
import { ssrRenderAttrs } from 'vue/server-renderer';
import { useSSRContext } from 'vue';
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
    useRouter$1();
    useRoute$1();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)}><h1>Reconhecimento por Autencidade</h1></div>`);
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
//# sourceMappingURL=autencidade-GvcqGOQD.mjs.map
