import { g } from './nuxt-link-P_iIRbMa.mjs';
import { withCtx, createVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr } from 'vue/server-renderer';
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

const p = { __name: "autencidade", __ssrInlineRender: true, setup: (o2) => (o3, p2, n2, d) => {
  const u = g;
  p2(`<div${ssrRenderAttrs(d)}><h1>Autencidade</h1><div>`), p2(ssrRenderComponent(u, { to: "/OrdensServico/criar-registro" }, { default: withCtx((t2, r2, o4, i2) => {
    if (!r2)
      return [createVNode("img", { class: "btn-pointer mt-10 mb-5", src: A, alt: "Sair" })];
    r2(`<img class="btn-pointer mt-10 mb-5"${ssrRenderAttr("src", A)} alt="Sair"${i2}>`);
  }), _: 1 }, n2)), p2("</div></div>");
} }, n = p.setup;
p.setup = (t2, r2) => {
  const e2 = useSSRContext();
  return (e2.modules || (e2.modules = /* @__PURE__ */ new Set())).add("pages/fontes/atos/autencidade.vue"), n ? n(t2, r2) : void 0;
};

export { p as default };
//# sourceMappingURL=autencidade-EbCLfIT9.mjs.map
