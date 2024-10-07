import { _ as jc, b as Ye, d as Ct } from './server.mjs';
import { ref, computed, withAsyncContext, watch, withCtx, createVNode, unref, isRef, openBlock, createBlock, resolveDynamicComponent, useSSRContext } from 'vue';
import { g as g$1 } from './fetch-D2ZU2xOO.mjs';
import { ssrRenderComponent, ssrRenderVNode } from 'vue/server-renderer';
import a from './semelhanca-BTFkoL7h.mjs';
import p from './autencidade-EbCLfIT9.mjs';
import X from './autenticacao-DDVHkOS2.mjs';
import { i } from './VContainer-Dwlw6VVY.mjs';
import { $ } from './VRow-Ca2v9sIW.mjs';
import { y as y$1 } from './VCol-CrrHdFZ4.mjs';
import { L } from './VAutocomplete-yDrVnvO6.mjs';
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
import './nuxt-link-P_iIRbMa.mjs';
import './sair-ToPptOUL.mjs';
import './VCard-zlRMnW-z.mjs';
import './salvar-37abXc2X.mjs';
import '@vuelidate/core';
import '@vuelidate/validators';

const g = { __name: "criar-ato", __ssrInlineRender: true, async setup(e2) {
  let v2, g2;
  const y2 = `${Ye().public.managemant}/tipoAtos`, w2 = Ct("auth_token").value, O = ref(Ct("user-data").value.cartorio_token).value, C = { "/fontes/atos/semelhanca": a, "/fontes/atos/autenticidade": p, "/fontes/atos/autenticacao/autenticacao": X }, J = ref([]), N = ref([]), A = ref(""), I = ref(""), R = computed(() => C[I.value]), { data: $$1 } = ([v2, g2] = withAsyncContext(() => g$1(y2, { method: "POST", body: { usuario_token: w2, cartorio_token: O } }, "$eDvF6utwet")), v2 = await v2, g2(), v2);
  return J.value = $$1.value.map((e3) => ({ descricao: e3.descricao, atos: JSON.stringify(e3.atos) })), J.value.length > 0 && (A.value = J.value[0].atos, N.value = JSON.parse(J.value[0].atos), N.value.length > 0 && (I.value = N.value[0].rota)), watch(A, (e3) => {
    e3 && (N.value = JSON.parse(e3), I.value = N.value.length > 0 ? N.value[0].rota : "");
  }), (e3, a2, l2, t2) => {
    a2("<!--[-->"), a2(ssrRenderComponent(i, null, { default: withCtx((e4, a3, l3, t3) => {
      if (!a3)
        return [createVNode($, null, { default: withCtx(() => [createVNode(y$1, { md: "6" }, { default: withCtx(() => [createVNode(L, { class: "mr-5", label: "Selecione o Servico", items: unref(J), "item-title": "descricao", "item-value": "atos", modelValue: unref(A), "onUpdate:modelValue": (e5) => isRef(A) ? A.value = e5 : null }, null, 8, ["items", "modelValue", "onUpdate:modelValue"])]), _: 1 }), createVNode(y$1, { md: "6" }, { default: withCtx(() => [createVNode(L, { label: "Selecione o tipo de ato", modelValue: unref(I), "onUpdate:modelValue": (e5) => isRef(I) ? I.value = e5 : null, "item-title": "descricao", "item-value": "rota", items: unref(N) }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])]), _: 1 })]), _: 1 })];
      a3(ssrRenderComponent($, null, { default: withCtx((e5, a4, l4, t4) => {
        if (!a4)
          return [createVNode(y$1, { md: "6" }, { default: withCtx(() => [createVNode(L, { class: "mr-5", label: "Selecione o Servico", items: unref(J), "item-title": "descricao", "item-value": "atos", modelValue: unref(A), "onUpdate:modelValue": (e6) => isRef(A) ? A.value = e6 : null }, null, 8, ["items", "modelValue", "onUpdate:modelValue"])]), _: 1 }), createVNode(y$1, { md: "6" }, { default: withCtx(() => [createVNode(L, { label: "Selecione o tipo de ato", modelValue: unref(I), "onUpdate:modelValue": (e6) => isRef(I) ? I.value = e6 : null, "item-title": "descricao", "item-value": "rota", items: unref(N) }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])]), _: 1 })];
        a4(ssrRenderComponent(y$1, { md: "6" }, { default: withCtx((e6, a5, l5, t5) => {
          if (!a5)
            return [createVNode(L, { class: "mr-5", label: "Selecione o Servico", items: unref(J), "item-title": "descricao", "item-value": "atos", modelValue: unref(A), "onUpdate:modelValue": (e7) => isRef(A) ? A.value = e7 : null }, null, 8, ["items", "modelValue", "onUpdate:modelValue"])];
          a5(ssrRenderComponent(L, { class: "mr-5", label: "Selecione o Servico", items: unref(J), "item-title": "descricao", "item-value": "atos", modelValue: unref(A), "onUpdate:modelValue": (e7) => isRef(A) ? A.value = e7 : null }, null, l5, t5));
        }), _: 1 }, l4, t4)), a4(ssrRenderComponent(y$1, { md: "6" }, { default: withCtx((e6, a5, l5, t5) => {
          if (!a5)
            return [createVNode(L, { label: "Selecione o tipo de ato", modelValue: unref(I), "onUpdate:modelValue": (e7) => isRef(I) ? I.value = e7 : null, "item-title": "descricao", "item-value": "rota", items: unref(N) }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])];
          a5(ssrRenderComponent(L, { label: "Selecione o tipo de ato", modelValue: unref(I), "onUpdate:modelValue": (e7) => isRef(I) ? I.value = e7 : null, "item-title": "descricao", "item-value": "rota", items: unref(N) }, null, l5, t5));
        }), _: 1 }, l4, t4));
      }), _: 1 }, l3, t3));
    }), _: 1 }, l2)), a2(ssrRenderComponent(i, null, { default: withCtx((e4, a3, l3, t3) => {
      if (!a3)
        return [(openBlock(), createBlock(resolveDynamicComponent(unref(R))))];
      ssrRenderVNode(a3, createVNode(resolveDynamicComponent(unref(R)), null, null), l3, t3);
    }), _: 1 }, l2)), a2("<!--]-->");
  };
} }, y = g.setup;
g.setup = (e2, a2) => {
  const l2 = useSSRContext();
  return (l2.modules || (l2.modules = /* @__PURE__ */ new Set())).add("pages/ordens-servicos/criar-ato.vue"), y ? y(e2, a2) : void 0;
};
const w = jc(g, [["__scopeId", "data-v-6463a20f"]]);

export { w as default };
//# sourceMappingURL=criar-ato-BvXE-N4O.mjs.map
