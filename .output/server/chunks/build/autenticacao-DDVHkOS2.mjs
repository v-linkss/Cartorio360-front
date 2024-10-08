import { g as g$1 } from './nuxt-link-P_iIRbMa.mjs';
import { ref, reactive, withAsyncContext, mergeProps, withCtx, createVNode, unref, useSSRContext, watch, isRef, createTextVNode, openBlock, createBlock, toDisplayString } from 'vue';
import { ssrRenderComponent, ssrRenderStyle, ssrRenderAttr, ssrInterpolate } from 'vue/server-renderer';
import { o as oe, $ as $$1, l as le, i as ie, e as ee } from './VCard-zlRMnW-z.mjs';
import { _ as jc, u as Ze, c as Qe, b as Ye, d as Ct, e as is, V as br } from './server.mjs';
import { g } from './fetch-D2ZU2xOO.mjs';
import { A } from './sair-ToPptOUL.mjs';
import { A as A$1 } from './salvar-37abXc2X.mjs';
import { useVuelidate } from '@vuelidate/core';
import { helpers, required } from '@vuelidate/validators';
import { i } from './VContainer-Dwlw6VVY.mjs';
import { L as L$1 } from './VAutocomplete-yDrVnvO6.mjs';
import { $ } from './VRow-Ca2v9sIW.mjs';
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

const P = { __name: "ErrorModalCard", __ssrInlineRender: true, props: { show: Boolean, errorMessage: String }, emits: ["close"], setup(e2, { emit: c2 }) {
  const p2 = e2, v2 = ref(p2.show), g2 = c2;
  watch(() => p2.show, (e3) => {
    v2.value = e3;
  });
  const h2 = () => {
    v2.value = false, g2("close");
  };
  return (t2, a2, c3, p3) => {
    a2(ssrRenderComponent($$1, mergeProps({ modelValue: unref(v2), "onUpdate:modelValue": (e3) => isRef(v2) ? v2.value = e3 : null, "max-width": "500" }, p3), { default: withCtx((t3, a3, r2, o2) => {
      if (!a3)
        return [createVNode(oe, null, { default: withCtx(() => [createVNode(le, { class: "text-h5" }, { default: withCtx(() => [createTextVNode("Erro na Requisi\xE7\xE3o")]), _: 1 }), createVNode(ie, null, { default: withCtx(() => [e2.errorMessage ? (openBlock(), createBlock("div", { key: 0 }, toDisplayString(e2.errorMessage), 1)) : (openBlock(), createBlock("div", { key: 1 }, "Ocorreu um erro inesperado."))]), _: 1 }), createVNode(ee, null, { default: withCtx(() => [createVNode(br, { style: { "background-color": "#429946", color: "white" }, onClick: h2 }, { default: withCtx(() => [createTextVNode("OK")]), _: 1 })]), _: 1 })]), _: 1 })];
      a3(ssrRenderComponent(oe, null, { default: withCtx((t4, a4, r3, o3) => {
        if (!a4)
          return [createVNode(le, { class: "text-h5" }, { default: withCtx(() => [createTextVNode("Erro na Requisi\xE7\xE3o")]), _: 1 }), createVNode(ie, null, { default: withCtx(() => [e2.errorMessage ? (openBlock(), createBlock("div", { key: 0 }, toDisplayString(e2.errorMessage), 1)) : (openBlock(), createBlock("div", { key: 1 }, "Ocorreu um erro inesperado."))]), _: 1 }), createVNode(ee, null, { default: withCtx(() => [createVNode(br, { style: { "background-color": "#429946", color: "white" }, onClick: h2 }, { default: withCtx(() => [createTextVNode("OK")]), _: 1 })]), _: 1 })];
        a4(ssrRenderComponent(le, { class: "text-h5" }, { default: withCtx((e3, t5, a5, r4) => {
          if (!t5)
            return [createTextVNode("Erro na Requisi\xE7\xE3o")];
          t5("Erro na Requisi\xE7\xE3o");
        }), _: 1 }, r3, o3)), a4(ssrRenderComponent(ie, null, { default: withCtx((t5, a5, r4, o4) => {
          if (!a5)
            return [e2.errorMessage ? (openBlock(), createBlock("div", { key: 0 }, toDisplayString(e2.errorMessage), 1)) : (openBlock(), createBlock("div", { key: 1 }, "Ocorreu um erro inesperado."))];
          e2.errorMessage ? a5(`<div${o4}>${ssrInterpolate(e2.errorMessage)}</div>`) : a5(`<div${o4}>Ocorreu um erro inesperado.</div>`);
        }), _: 1 }, r3, o3)), a4(ssrRenderComponent(ee, null, { default: withCtx((e3, t5, a5, r4) => {
          if (!t5)
            return [createVNode(br, { style: { "background-color": "#429946", color: "white" }, onClick: h2 }, { default: withCtx(() => [createTextVNode("OK")]), _: 1 })];
          t5(ssrRenderComponent(br, { style: { "background-color": "#429946", color: "white" }, onClick: h2 }, { default: withCtx((e4, t6, a6, r5) => {
            if (!t6)
              return [createTextVNode("OK")];
            t6("OK");
          }), _: 1 }, a5, r4));
        }), _: 1 }, r3, o3));
      }), _: 1 }, r2, o2));
    }), _: 1 }, c3));
  };
} }, z = P.setup;
P.setup = (e2, t2) => {
  const a2 = useSSRContext();
  return (a2.modules || (a2.modules = /* @__PURE__ */ new Set())).add("components/ErrorModalCard.vue"), z ? z(e2, t2) : void 0;
};
const L = { __name: "autenticacao", __ssrInlineRender: true, async setup(a2) {
  let l2, n2;
  const u2 = Ze(), i2 = Qe(), d2 = Ye(), c2 = `${d2.public.managemant}/listarEscrevente`, _2 = ref(Ct("user-data").value.cartorio_token).value, b2 = ref(Ct("user-service").value.token).value || ref(Ct("user-service").value).value, V2 = Ct("auth_token").value, $2 = `${d2.public.managemant}/atoAutentica`, y2 = `${d2.public.managemant}/etiquetaAutentica`, w2 = ref(false), q2 = ref(""), z2 = reactive({ escrevente: null, quantidade: 1 }), L2 = ref([]), { data: Q2 } = ([l2, n2] = withAsyncContext(() => g(c2, { method: "POST", body: { cartorio_token: _2 } }, "$nXL9eJBhI7")), l2 = await l2, n2(), l2);
  L2.value = Q2.value[0].func_json_escreventes;
  const X2 = { escrevente: { required: helpers.withMessage("O campo \xE9 obrigatorio", required) } }, F = useVuelidate(X2, z2), J = async () => {
    if (await F.value.$validate()) {
      const { data: e2, status: t2, error: a3 } = await g($2, { method: "POST", body: { usuario_token: V2, cartorio_token: _2, quantidade: Number(z2.quantidade), ordemserv_token: b2, ato_tipo_token: "bFsdV" } }, "$dpfLzAlO85");
      "success" === t2.value ? N(e2.value.token) : (w2.value = true, q2.value = a3.value.data.details);
    }
  }, N = async (e2) => {
    const { data: t2, status: a3 } = await g(y2, { method: "POST", body: { escrevente_token: z2.escrevente, cartorio_token: _2, ato_token: e2 } }, "$fPnSl9XMLA");
    if ("success" === a3.value) {
      const e3 = (void 0).open("", "_blank");
      e3.document.open(), e3.document.write(t2.value.etiqueta), e3.document.close();
    }
  }, D = () => {
    const e2 = i2.query.origem || "criar", t2 = i2.query.id;
    "atualizar" === e2 ? u2.push(`/ordens-servicos/atualizar/${t2}`) : u2.push("/ordens-servicos/criar-registro");
  };
  return (t2, a3, l3, n3) => {
    const u3 = g$1, i3 = P;
    a3(ssrRenderComponent(oe, mergeProps({ class: "mt-10", title: "Autentica\xE7\xE3o" }, n3), { default: withCtx((e2, t3, a4, r2) => {
      if (!t3)
        return [createVNode(i, null, { default: withCtx(() => [createVNode("div", { style: { width: "600px", "margin-top": "10px" } }, [createVNode(L$1, { label: "Tabeli\xE3o/escriv\xE3o", modelValue: unref(z2).escrevente, "onUpdate:modelValue": (e3) => unref(z2).escrevente = e3, items: unref(L2), "item-title": "nome", "item-value": "token", required: "", "error-messages": unref(F).escrevente.$errors.map((e3) => e3.$message), onBlur: unref(F).escrevente.$touch, onInput: unref(F).escrevente.$touch }, null, 8, ["modelValue", "onUpdate:modelValue", "items", "error-messages", "onBlur", "onInput"])]), createVNode("div", { style: { width: "180px", "margin-top": "20px" } }, [createVNode(is, { type: "number", label: "Quantidade", modelValue: unref(z2).quantidade, "onUpdate:modelValue": (e3) => unref(z2).quantidade = e3 }, null, 8, ["modelValue", "onUpdate:modelValue"])]), createVNode($, null, { default: withCtx(() => [createVNode("div", null, [createVNode(u3, { onClick: D }, { default: withCtx(() => [createVNode("img", { class: "btn-pointer mt-10 mb-5", src: A, alt: "Sair" })]), _: 1 })]), createVNode("img", { class: "btn-pointer mt-10", src: A$1, onClick: J })]), _: 1 })]), _: 1 }), createVNode(i3, { show: unref(w2), errorMessage: unref(q2), onClose: (e3) => w2.value = false }, null, 8, ["show", "errorMessage", "onClose"])];
      t3(ssrRenderComponent(i, null, { default: withCtx((e3, t4, a5, r3) => {
        if (!t4)
          return [createVNode("div", { style: { width: "600px", "margin-top": "10px" } }, [createVNode(L$1, { label: "Tabeli\xE3o/escriv\xE3o", modelValue: unref(z2).escrevente, "onUpdate:modelValue": (e4) => unref(z2).escrevente = e4, items: unref(L2), "item-title": "nome", "item-value": "token", required: "", "error-messages": unref(F).escrevente.$errors.map((e4) => e4.$message), onBlur: unref(F).escrevente.$touch, onInput: unref(F).escrevente.$touch }, null, 8, ["modelValue", "onUpdate:modelValue", "items", "error-messages", "onBlur", "onInput"])]), createVNode("div", { style: { width: "180px", "margin-top": "20px" } }, [createVNode(is, { type: "number", label: "Quantidade", modelValue: unref(z2).quantidade, "onUpdate:modelValue": (e4) => unref(z2).quantidade = e4 }, null, 8, ["modelValue", "onUpdate:modelValue"])]), createVNode($, null, { default: withCtx(() => [createVNode("div", null, [createVNode(u3, { onClick: D }, { default: withCtx(() => [createVNode("img", { class: "btn-pointer mt-10 mb-5", src: A, alt: "Sair" })]), _: 1 })]), createVNode("img", { class: "btn-pointer mt-10", src: A$1, onClick: J })]), _: 1 })];
        t4(`<div style="${ssrRenderStyle({ width: "600px", "margin-top": "10px" })}" data-v-098d52a5${r3}>`), t4(ssrRenderComponent(L$1, { label: "Tabeli\xE3o/escriv\xE3o", modelValue: unref(z2).escrevente, "onUpdate:modelValue": (e4) => unref(z2).escrevente = e4, items: unref(L2), "item-title": "nome", "item-value": "token", required: "", "error-messages": unref(F).escrevente.$errors.map((e4) => e4.$message), onBlur: unref(F).escrevente.$touch, onInput: unref(F).escrevente.$touch }, null, a5, r3)), t4(`</div><div style="${ssrRenderStyle({ width: "180px", "margin-top": "20px" })}" data-v-098d52a5${r3}>`), t4(ssrRenderComponent(is, { type: "number", label: "Quantidade", modelValue: unref(z2).quantidade, "onUpdate:modelValue": (e4) => unref(z2).quantidade = e4 }, null, a5, r3)), t4("</div>"), t4(ssrRenderComponent($, null, { default: withCtx((e4, t5, a6, r4) => {
          if (!t5)
            return [createVNode("div", null, [createVNode(u3, { onClick: D }, { default: withCtx(() => [createVNode("img", { class: "btn-pointer mt-10 mb-5", src: A, alt: "Sair" })]), _: 1 })]), createVNode("img", { class: "btn-pointer mt-10", src: A$1, onClick: J })];
          t5(`<div data-v-098d52a5${r4}>`), t5(ssrRenderComponent(u3, { onClick: D }, { default: withCtx((e5, t6, a7, r5) => {
            if (!t6)
              return [createVNode("img", { class: "btn-pointer mt-10 mb-5", src: A, alt: "Sair" })];
            t6(`<img class="btn-pointer mt-10 mb-5"${ssrRenderAttr("src", A)} alt="Sair" data-v-098d52a5${r5}>`);
          }), _: 1 }, a6, r4)), t5(`</div><img class="btn-pointer mt-10"${ssrRenderAttr("src", A$1)} data-v-098d52a5${r4}>`);
        }), _: 1 }, a5, r3));
      }), _: 1 }, a4, r2)), t3(ssrRenderComponent(i3, { show: unref(w2), errorMessage: unref(q2), onClose: (e3) => w2.value = false }, null, a4, r2));
    }), _: 1 }, l3));
  };
} }, Q = L.setup;
L.setup = (e2, t2) => {
  const a2 = useSSRContext();
  return (a2.modules || (a2.modules = /* @__PURE__ */ new Set())).add("pages/fontes/atos/autenticacao/autenticacao.vue"), Q ? Q(e2, t2) : void 0;
};
const X = jc(L, [["__scopeId", "data-v-098d52a5"]]);

export { X as default };
//# sourceMappingURL=autenticacao-DDVHkOS2.mjs.map
