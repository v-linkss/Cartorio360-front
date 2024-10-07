import { ref, reactive, watch, withAsyncContext, mergeProps, unref, isRef, withCtx, createVNode, createTextVNode, useSSRContext } from 'vue';
import { b as Ye, d as Ct, E as To, at as Dc } from './server.mjs';
import { g } from './fetch-D2ZU2xOO.mjs';
import { ssrRenderComponent, ssrRenderAttr, ssrRenderStyle } from 'vue/server-renderer';
import { A } from './selo-DmmIIbRx.mjs';
import { useVuelidate } from '@vuelidate/core';
import { helpers, required } from '@vuelidate/validators';
import { $, o as oe, e as ee } from './VCard-zlRMnW-z.mjs';
import { i } from './VContainer-Dwlw6VVY.mjs';
import { $ as $$1 } from './VRow-Ca2v9sIW.mjs';
import { L } from './VAutocomplete-yDrVnvO6.mjs';

const R = { __name: "Selos", __ssrInlineRender: true, props: { show: Boolean, ato_token: String }, emits: ["close"], async setup(i2, { emit: R2 }) {
  let I2, T;
  const B = i2, q = ref(B.show), O = Ye(), P = ref(Ct("user-data").value.cartorio_token).value, x = `${O.public.managemant}/listarSelos`, D = `${O.public.managemant}/reimprimirSelo`, E = `${O.public.managemant}/listarEscrevente`, z = ref([]), A$1 = ref([]), H = reactive({ escrevente: null }), J = R2, L$1 = { escrevente: { required: helpers.withMessage("O campo \xE9 obrigatorio", required) } }, M = useVuelidate(L$1, H), N = [{ title: "Numero", value: "numero" }, { title: "Referencia", value: "referencia" }, { value: "actions" }];
  watch(() => B.show, (e2) => {
    q.value = e2, e2 && K();
  });
  const W = () => {
    q.value = false, J("close");
  }, Y = ref([]), { data: F } = ([I2, T] = withAsyncContext(() => g(E, { method: "POST", body: { cartorio_token: P } }, "$V2ulT7DYvP")), I2 = await I2, T(), I2);
  Y.value = F.value[0].func_json_escreventes;
  const G = async () => {
    if (await M.value.$validate()) {
      const e2 = A$1.value.map((e3) => ({ selo_token: e3 })), l2 = { escrevente_token: H.escrevente, ato_token: B.ato_token, selos: e2 }, { data: s2, error: t2, status: o2 } = await g(`${D}`, { method: "POST", body: l2 }, "$45J51uHTfa");
      if ("success" === o2.value) {
        const e3 = (void 0).open("", "_blank");
        e3.document.open(), e3.document.write(s2.value[0].etiqueta), e3.document.close(), W();
      }
    }
  }, K = async () => {
    const { data: e2, error: l2 } = await g(`${x}`, { method: "POST", body: { ato_token: B.ato_token } }, "$rLWIRtrfDz");
    l2.value || (z.value = e2.value.selos);
  };
  return (e2, l2, s2, t2) => {
    l2(ssrRenderComponent($, mergeProps({ persistent: "", modelValue: unref(q), "onUpdate:modelValue": (e3) => isRef(q) ? q.value = e3 : null, "max-width": "500" }, t2), { default: withCtx((e3, l3, s3, t3) => {
      if (!l3)
        return [createVNode(oe, null, { default: withCtx(() => [createVNode(i, null, { default: withCtx(() => [createVNode($$1, { class: "mt-1 mb-3", style: { "justify-content": "space-between" } }, { default: withCtx(() => [createVNode("h1", { class: "ml-4" }, "Reimpress\xE3o de Selos"), createVNode(To, { class: "mt-4 mr-4", style: { color: "red" }, onClick: W }, { default: withCtx(() => [createTextVNode("mdi-close")]), _: 1 })]), _: 1 }), createVNode("hr", { class: "mb-5" }), createVNode(L, { class: "mb-5", label: "Tabeli\xE3o/escriv\xE3o", modelValue: unref(H).escrevente, "onUpdate:modelValue": (e4) => unref(H).escrevente = e4, items: unref(Y), "item-title": "nome", "item-value": "token", required: "", "error-messages": unref(M).escrevente.$errors.map((e4) => e4.$message), onBlur: unref(M).escrevente.$touch, onInput: unref(M).escrevente.$touch }, null, 8, ["modelValue", "onUpdate:modelValue", "items", "error-messages", "onBlur", "onInput"]), createVNode(Dc, { headers: N, items: unref(z), "item-value": "token", "show-select": "", modelValue: unref(A$1), "onUpdate:modelValue": (e4) => isRef(A$1) ? A$1.value = e4 : null }, null, 8, ["items", "modelValue", "onUpdate:modelValue"])]), _: 1 }), createVNode(ee, null, { default: withCtx(() => [createVNode("div", null, [createVNode("img", { src: A, style: { cursor: "pointer" }, onClick: G })])]), _: 1 })]), _: 1 })];
      l3(ssrRenderComponent(oe, null, { default: withCtx((e4, l4, s4, t4) => {
        if (!l4)
          return [createVNode(i, null, { default: withCtx(() => [createVNode($$1, { class: "mt-1 mb-3", style: { "justify-content": "space-between" } }, { default: withCtx(() => [createVNode("h1", { class: "ml-4" }, "Reimpress\xE3o de Selos"), createVNode(To, { class: "mt-4 mr-4", style: { color: "red" }, onClick: W }, { default: withCtx(() => [createTextVNode("mdi-close")]), _: 1 })]), _: 1 }), createVNode("hr", { class: "mb-5" }), createVNode(L, { class: "mb-5", label: "Tabeli\xE3o/escriv\xE3o", modelValue: unref(H).escrevente, "onUpdate:modelValue": (e5) => unref(H).escrevente = e5, items: unref(Y), "item-title": "nome", "item-value": "token", required: "", "error-messages": unref(M).escrevente.$errors.map((e5) => e5.$message), onBlur: unref(M).escrevente.$touch, onInput: unref(M).escrevente.$touch }, null, 8, ["modelValue", "onUpdate:modelValue", "items", "error-messages", "onBlur", "onInput"]), createVNode(Dc, { headers: N, items: unref(z), "item-value": "token", "show-select": "", modelValue: unref(A$1), "onUpdate:modelValue": (e5) => isRef(A$1) ? A$1.value = e5 : null }, null, 8, ["items", "modelValue", "onUpdate:modelValue"])]), _: 1 }), createVNode(ee, null, { default: withCtx(() => [createVNode("div", null, [createVNode("img", { src: A, style: { cursor: "pointer" }, onClick: G })])]), _: 1 })];
        l4(ssrRenderComponent(i, null, { default: withCtx((e5, l5, s5, t5) => {
          if (!l5)
            return [createVNode($$1, { class: "mt-1 mb-3", style: { "justify-content": "space-between" } }, { default: withCtx(() => [createVNode("h1", { class: "ml-4" }, "Reimpress\xE3o de Selos"), createVNode(To, { class: "mt-4 mr-4", style: { color: "red" }, onClick: W }, { default: withCtx(() => [createTextVNode("mdi-close")]), _: 1 })]), _: 1 }), createVNode("hr", { class: "mb-5" }), createVNode(L, { class: "mb-5", label: "Tabeli\xE3o/escriv\xE3o", modelValue: unref(H).escrevente, "onUpdate:modelValue": (e6) => unref(H).escrevente = e6, items: unref(Y), "item-title": "nome", "item-value": "token", required: "", "error-messages": unref(M).escrevente.$errors.map((e6) => e6.$message), onBlur: unref(M).escrevente.$touch, onInput: unref(M).escrevente.$touch }, null, 8, ["modelValue", "onUpdate:modelValue", "items", "error-messages", "onBlur", "onInput"]), createVNode(Dc, { headers: N, items: unref(z), "item-value": "token", "show-select": "", modelValue: unref(A$1), "onUpdate:modelValue": (e6) => isRef(A$1) ? A$1.value = e6 : null }, null, 8, ["items", "modelValue", "onUpdate:modelValue"])];
          l5(ssrRenderComponent($$1, { class: "mt-1 mb-3", style: { "justify-content": "space-between" } }, { default: withCtx((e6, l6, s6, t6) => {
            if (!l6)
              return [createVNode("h1", { class: "ml-4" }, "Reimpress\xE3o de Selos"), createVNode(To, { class: "mt-4 mr-4", style: { color: "red" }, onClick: W }, { default: withCtx(() => [createTextVNode("mdi-close")]), _: 1 })];
            l6(`<h1 class="ml-4"${t6}>Reimpress\xE3o de Selos</h1>`), l6(ssrRenderComponent(To, { class: "mt-4 mr-4", style: { color: "red" }, onClick: W }, { default: withCtx((e7, l7, s7, t7) => {
              if (!l7)
                return [createTextVNode("mdi-close")];
              l7("mdi-close");
            }), _: 1 }, s6, t6));
          }), _: 1 }, s5, t5)), l5(`<hr class="mb-5"${t5}>`), l5(ssrRenderComponent(L, { class: "mb-5", label: "Tabeli\xE3o/escriv\xE3o", modelValue: unref(H).escrevente, "onUpdate:modelValue": (e6) => unref(H).escrevente = e6, items: unref(Y), "item-title": "nome", "item-value": "token", required: "", "error-messages": unref(M).escrevente.$errors.map((e6) => e6.$message), onBlur: unref(M).escrevente.$touch, onInput: unref(M).escrevente.$touch }, null, s5, t5)), l5(ssrRenderComponent(Dc, { headers: N, items: unref(z), "item-value": "token", "show-select": "", modelValue: unref(A$1), "onUpdate:modelValue": (e6) => isRef(A$1) ? A$1.value = e6 : null }, null, s5, t5));
        }), _: 1 }, s4, t4)), l4(ssrRenderComponent(ee, null, { default: withCtx((e5, l5, s5, t5) => {
          if (!l5)
            return [createVNode("div", null, [createVNode("img", { src: A, style: { cursor: "pointer" }, onClick: G })])];
          l5(`<div${t5}><img${ssrRenderAttr("src", A)} style="${ssrRenderStyle({ cursor: "pointer" })}"${t5}></div>`);
        }), _: 1 }, s4, t4));
      }), _: 1 }, s3, t3));
    }), _: 1 }, s2));
  };
} }, I = R.setup;
R.setup = (e2, l2) => {
  const s2 = useSSRContext();
  return (s2.modules || (s2.modules = /* @__PURE__ */ new Set())).add("components/Reimpressao/Selos.vue"), I ? I(e2, l2) : void 0;
};

export { R };
//# sourceMappingURL=Selos-DP5pidWu.mjs.map
