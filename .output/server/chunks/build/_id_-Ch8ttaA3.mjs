import { g as g$2 } from './nuxt-link-P_iIRbMa.mjs';
import { _ as jc, c as Qe, b as Ye, aW as Xr, aX as fs } from './server.mjs';
import { g as g$1 } from './fetch-D2ZU2xOO.mjs';
import { t } from './formatDate-Dt3m51Lf.mjs';
import { withAsyncContext, unref, withCtx, createVNode, createTextVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrInterpolate, ssrRenderAttr } from 'vue/server-renderer';
import { A } from './sair-ToPptOUL.mjs';
import { i } from './VContainer-Dwlw6VVY.mjs';
import { $ } from './VRow-Ca2v9sIW.mjs';
import { y } from './VCol-CrrHdFZ4.mjs';
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

const x = { __name: "[id]", __ssrInlineRender: true, async setup(e2) {
  let p2, x2;
  const P2 = Qe(), { id: g2 } = P2.params, T = `${Ye().public.managemant}/getPessoaById`, { data: w, pending: j } = ([p2, x2] = withAsyncContext(() => g$1(`${T}/${g2}`, "$df2lemleOL")), p2 = await p2, x2(), p2);
  return console.log(T), (e3, t2, s2, r2) => {
    const i2 = g$2;
    t2("<!--[-->"), unref(j) ? t2("<!---->") : (t2("<div data-v-9c9bba6e>"), t2(ssrRenderComponent(i, { class: "data-container mt-16" }, { default: withCtx((a2, t3, s3, r3) => {
      if (!t3)
        return [createVNode($, { "no-gutters": "" }, { default: withCtx(() => [createVNode(y, null, { default: withCtx(() => [createVNode(Xr, { class: "pa-2 ma-2" }, { default: withCtx(() => [createTextVNode(" Documento: " + toDisplayString(unref(w).doc_identificacao), 1)]), _: 1 })]), _: 1 }), createVNode(y, null, { default: withCtx(() => [createVNode(Xr, { class: "pa-2 ma-2" }, { default: withCtx(() => [createTextVNode(" Nome/Raz\xE3o Social : " + toDisplayString(unref(w).nome), 1)]), _: 1 })]), _: 1 }), createVNode(y, null, { default: withCtx(() => [createVNode(Xr, { class: "pa-2 ma-2" }, { default: withCtx(() => [createTextVNode(" Data de Nascimento: " + toDisplayString(("formatDate" in e3 ? e3.formatDate : unref(t))(unref(w).data_nascimento)), 1)]), _: 1 })]), _: 1 }), createVNode(fs, { width: "100%" }), createVNode(y, null, { default: withCtx(() => [createVNode(Xr, { class: "pa-2 ma-2" }, { default: withCtx(() => [createTextVNode(" Tipo Pessoa: " + toDisplayString(unref(w).tipo_pessoa), 1)]), _: 1 })]), _: 1 }), createVNode(y, null, { default: withCtx(() => [createVNode(Xr, { class: "pa-2 ma-2" }, { default: withCtx(() => [createTextVNode("Profiss\xE3o: " + toDisplayString(unref(w).profissao), 1)]), _: 1 })]), _: 1 }), createVNode(fs, { width: "100%" }), createVNode(y, null, { default: withCtx(() => [createVNode(Xr, { class: "pa-2 ma-2" }, { default: withCtx(() => [createTextVNode(" Local de Trabalho: " + toDisplayString(unref(w).local_trabalho), 1)]), _: 1 })]), _: 1 }), createVNode(y, null, { default: withCtx(() => [createVNode(Xr, { class: "pa-2 ma-2" }, { default: withCtx(() => [createTextVNode(" Nome da m\xE3e: " + toDisplayString(unref(w).nome_mae), 1)]), _: 1 })]), _: 1 })]), _: 1 })];
      t3(ssrRenderComponent($, { "no-gutters": "" }, { default: withCtx((a3, t4, s4, r4) => {
        if (!t4)
          return [createVNode(y, null, { default: withCtx(() => [createVNode(Xr, { class: "pa-2 ma-2" }, { default: withCtx(() => [createTextVNode(" Documento: " + toDisplayString(unref(w).doc_identificacao), 1)]), _: 1 })]), _: 1 }), createVNode(y, null, { default: withCtx(() => [createVNode(Xr, { class: "pa-2 ma-2" }, { default: withCtx(() => [createTextVNode(" Nome/Raz\xE3o Social : " + toDisplayString(unref(w).nome), 1)]), _: 1 })]), _: 1 }), createVNode(y, null, { default: withCtx(() => [createVNode(Xr, { class: "pa-2 ma-2" }, { default: withCtx(() => [createTextVNode(" Data de Nascimento: " + toDisplayString(("formatDate" in e3 ? e3.formatDate : unref(t))(unref(w).data_nascimento)), 1)]), _: 1 })]), _: 1 }), createVNode(fs, { width: "100%" }), createVNode(y, null, { default: withCtx(() => [createVNode(Xr, { class: "pa-2 ma-2" }, { default: withCtx(() => [createTextVNode(" Tipo Pessoa: " + toDisplayString(unref(w).tipo_pessoa), 1)]), _: 1 })]), _: 1 }), createVNode(y, null, { default: withCtx(() => [createVNode(Xr, { class: "pa-2 ma-2" }, { default: withCtx(() => [createTextVNode("Profiss\xE3o: " + toDisplayString(unref(w).profissao), 1)]), _: 1 })]), _: 1 }), createVNode(fs, { width: "100%" }), createVNode(y, null, { default: withCtx(() => [createVNode(Xr, { class: "pa-2 ma-2" }, { default: withCtx(() => [createTextVNode(" Local de Trabalho: " + toDisplayString(unref(w).local_trabalho), 1)]), _: 1 })]), _: 1 }), createVNode(y, null, { default: withCtx(() => [createVNode(Xr, { class: "pa-2 ma-2" }, { default: withCtx(() => [createTextVNode(" Nome da m\xE3e: " + toDisplayString(unref(w).nome_mae), 1)]), _: 1 })]), _: 1 })];
        t4(ssrRenderComponent(y, null, { default: withCtx((a4, e4, t5, l2) => {
          if (!e4)
            return [createVNode(Xr, { class: "pa-2 ma-2" }, { default: withCtx(() => [createTextVNode(" Documento: " + toDisplayString(unref(w).doc_identificacao), 1)]), _: 1 })];
          e4(ssrRenderComponent(Xr, { class: "pa-2 ma-2" }, { default: withCtx((a5, e5, t6, o2) => {
            if (!e5)
              return [createTextVNode(" Documento: " + toDisplayString(unref(w).doc_identificacao), 1)];
            e5(` Documento: ${ssrInterpolate(unref(w).doc_identificacao)}`);
          }), _: 1 }, t5, l2));
        }), _: 1 }, s4, r4)), t4(ssrRenderComponent(y, null, { default: withCtx((a4, e4, t5, l2) => {
          if (!e4)
            return [createVNode(Xr, { class: "pa-2 ma-2" }, { default: withCtx(() => [createTextVNode(" Nome/Raz\xE3o Social : " + toDisplayString(unref(w).nome), 1)]), _: 1 })];
          e4(ssrRenderComponent(Xr, { class: "pa-2 ma-2" }, { default: withCtx((a5, e5, t6, o2) => {
            if (!e5)
              return [createTextVNode(" Nome/Raz\xE3o Social : " + toDisplayString(unref(w).nome), 1)];
            e5(` Nome/Raz\xE3o Social : ${ssrInterpolate(unref(w).nome)}`);
          }), _: 1 }, t5, l2));
        }), _: 1 }, s4, r4)), t4(ssrRenderComponent(y, null, { default: withCtx((a4, t5, l2, s5) => {
          if (!t5)
            return [createVNode(Xr, { class: "pa-2 ma-2" }, { default: withCtx(() => [createTextVNode(" Data de Nascimento: " + toDisplayString(("formatDate" in e3 ? e3.formatDate : unref(t))(unref(w).data_nascimento)), 1)]), _: 1 })];
          t5(ssrRenderComponent(Xr, { class: "pa-2 ma-2" }, { default: withCtx((a5, t6, o2, l3) => {
            if (!t6)
              return [createTextVNode(" Data de Nascimento: " + toDisplayString(("formatDate" in e3 ? e3.formatDate : unref(t))(unref(w).data_nascimento)), 1)];
            t6(` Data de Nascimento: ${ssrInterpolate(("formatDate" in e3 ? e3.formatDate : unref(t))(unref(w).data_nascimento))}`);
          }), _: 1 }, l2, s5));
        }), _: 1 }, s4, r4)), t4(ssrRenderComponent(fs, { width: "100%" }, null, s4, r4)), t4(ssrRenderComponent(y, null, { default: withCtx((a4, e4, t5, l2) => {
          if (!e4)
            return [createVNode(Xr, { class: "pa-2 ma-2" }, { default: withCtx(() => [createTextVNode(" Tipo Pessoa: " + toDisplayString(unref(w).tipo_pessoa), 1)]), _: 1 })];
          e4(ssrRenderComponent(Xr, { class: "pa-2 ma-2" }, { default: withCtx((a5, e5, t6, o2) => {
            if (!e5)
              return [createTextVNode(" Tipo Pessoa: " + toDisplayString(unref(w).tipo_pessoa), 1)];
            e5(` Tipo Pessoa: ${ssrInterpolate(unref(w).tipo_pessoa)}`);
          }), _: 1 }, t5, l2));
        }), _: 1 }, s4, r4)), t4(ssrRenderComponent(y, null, { default: withCtx((a4, e4, t5, l2) => {
          if (!e4)
            return [createVNode(Xr, { class: "pa-2 ma-2" }, { default: withCtx(() => [createTextVNode("Profiss\xE3o: " + toDisplayString(unref(w).profissao), 1)]), _: 1 })];
          e4(ssrRenderComponent(Xr, { class: "pa-2 ma-2" }, { default: withCtx((a5, e5, t6, o2) => {
            if (!e5)
              return [createTextVNode("Profiss\xE3o: " + toDisplayString(unref(w).profissao), 1)];
            e5(`Profiss\xE3o: ${ssrInterpolate(unref(w).profissao)}`);
          }), _: 1 }, t5, l2));
        }), _: 1 }, s4, r4)), t4(ssrRenderComponent(fs, { width: "100%" }, null, s4, r4)), t4(ssrRenderComponent(y, null, { default: withCtx((a4, e4, t5, l2) => {
          if (!e4)
            return [createVNode(Xr, { class: "pa-2 ma-2" }, { default: withCtx(() => [createTextVNode(" Local de Trabalho: " + toDisplayString(unref(w).local_trabalho), 1)]), _: 1 })];
          e4(ssrRenderComponent(Xr, { class: "pa-2 ma-2" }, { default: withCtx((a5, e5, t6, o2) => {
            if (!e5)
              return [createTextVNode(" Local de Trabalho: " + toDisplayString(unref(w).local_trabalho), 1)];
            e5(` Local de Trabalho: ${ssrInterpolate(unref(w).local_trabalho)}`);
          }), _: 1 }, t5, l2));
        }), _: 1 }, s4, r4)), t4(ssrRenderComponent(y, null, { default: withCtx((a4, e4, t5, l2) => {
          if (!e4)
            return [createVNode(Xr, { class: "pa-2 ma-2" }, { default: withCtx(() => [createTextVNode(" Nome da m\xE3e: " + toDisplayString(unref(w).nome_mae), 1)]), _: 1 })];
          e4(ssrRenderComponent(Xr, { class: "pa-2 ma-2" }, { default: withCtx((a5, e5, t6, o2) => {
            if (!e5)
              return [createTextVNode(" Nome da m\xE3e: " + toDisplayString(unref(w).nome_mae), 1)];
            e5(` Nome da m\xE3e: ${ssrInterpolate(unref(w).nome_mae)}`);
          }), _: 1 }, t5, l2));
        }), _: 1 }, s4, r4));
      }), _: 1 }, s3, r3));
    }), _: 1 }, s2)), t2("</div>")), t2(ssrRenderComponent(i2, { class: "mt-10", to: "/pessoas/registros" }, { default: withCtx((a2, e4, t3, o2) => {
      if (!e4)
        return [createVNode("img", { class: "btn-pointer", src: A, alt: "Sair" })];
      e4(`<img class="btn-pointer"${ssrRenderAttr("src", A)} alt="Sair" data-v-9c9bba6e${o2}>`);
    }), _: 1 }, s2)), t2("<!--]-->");
  };
} }, P = x.setup;
x.setup = (a2, e2) => {
  const t2 = useSSRContext();
  return (t2.modules || (t2.modules = /* @__PURE__ */ new Set())).add("pages/pessoas/vizualizar/[id].vue"), P ? P(a2, e2) : void 0;
};
const g = jc(x, [["__scopeId", "data-v-9c9bba6e"]]);

export { g as default };
//# sourceMappingURL=_id_-Ch8ttaA3.mjs.map
