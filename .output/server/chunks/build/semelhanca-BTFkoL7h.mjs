import { g } from './nuxt-link-P_iIRbMa.mjs';
import { withCtx, createVNode, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderAttr } from 'vue/server-renderer';
import { A } from './sair-ToPptOUL.mjs';
import '../runtime.mjs';
import 'node:http';
import 'node:https';
import 'fs';
import 'path';
import 'node:fs';
import 'node:url';
import './server.mjs';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'devalue';
import '@unhead/ssr';
import 'unhead';
import '@unhead/shared';
import 'vue-router';
import 'vue3-toastify';
import 'vue-the-mask';

const a = { __name: "semelhanca", __ssrInlineRender: true, setup: (o2) => (o3, a2, p2, n) => {
  const u = g;
  a2("<!--[--><h1>Semelhan\xE7a</h1><div>"), a2(ssrRenderComponent(u, { to: "/OrdensServico/criar-registro" }, { default: withCtx((r2, e2, o4, i2) => {
    if (!e2)
      return [createVNode("img", { class: "btn-pointer mt-10 mb-5", src: A, alt: "Sair" })];
    e2(`<img class="btn-pointer mt-10 mb-5"${ssrRenderAttr("src", A)} alt="Sair"${i2}>`);
  }), _: 1 }, p2)), a2("</div><!--]-->");
} }, p = a.setup;
a.setup = (r2, e2) => {
  const t2 = useSSRContext();
  return (t2.modules || (t2.modules = /* @__PURE__ */ new Set())).add("pages/fontes/atos/semelhanca.vue"), p ? p(r2, e2) : void 0;
};

export { a as default };
//# sourceMappingURL=semelhanca-BTFkoL7h.mjs.map
