import { a as buildAssetsURL } from '../routes/renderer.mjs';
import { ref, mergeProps, unref, isRef, withCtx, createVNode, createTextVNode, openBlock, createBlock, createCommentVNode, useSSRContext } from 'vue';
import { _ as jc, u as Ze, f as Ue, b as Ye, a2 as gs, e as is, V as br, as as Sr, d as Ct } from './server.mjs';
import { g } from './fetch-D2ZU2xOO.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle } from 'vue/server-renderer';
import { $, o as oe } from './VCard-zlRMnW-z.mjs';
import 'vue-bundle-renderer/runtime';
import '../runtime.mjs';
import 'node:http';
import 'node:https';
import 'fs';
import 'path';
import 'node:fs';
import 'node:url';
import 'devalue';
import '@unhead/ssr';
import 'unhead';
import '@unhead/shared';
import 'vue-router';
import 'vue3-toastify';
import 'vue-the-mask';

const O = "" + buildAssetsURL("cartorio_logo.CfnnJMUp.jpeg"), K = { __name: "index", __ssrInlineRender: true, setup(c2) {
  const d2 = Ze(), { $toast: K2 } = Ue(), E2 = ref({ senha: "", email: "" }), U2 = ref(false), S = ref(false), $$1 = ref(false), j = ref(false), A = ref(false), I = () => {
    $$1.value = false, j.value = false, A.value = false, S.value = false;
  }, J = Ye().public.auth, L = async () => {
    const { data: e2, status: a2, error: o2 } = await g(`${J}/login`, { method: "POST", body: { senha: E2.value.senha, email: E2.value.email } }, "$iX10IJN3fa");
    if ("success" === a2.value) {
      const a3 = e2.value[0].func_autentica_acesso_v1[0].registro[0], o3 = Ct("user-data");
      o3.value = o3.value = JSON.stringify({ nome: a3.nome, usuario_id: a3.id, cartorio_id: a3.cartorios[0].cartorio_id, cartorio_nome: a3.cartorios[0].cartorio_descricao, cartorio_token: a3.cartorios[0].cartorio_token }), K2.success("Login realizado com sucesso!");
      const t2 = e2.value[0].func_autentica_acesso_v1[0].registro[0].token;
      Ct("auth_token").value = t2, d2.push("/");
    } else {
      "error" === a2.value && 500 === o2.value.statusCode && (A.value = true);
      const e3 = o2.value.data[0].func_autentica_acesso_v1[0];
      switch (e3.status_mensagem) {
        case "Esse email n\xE3o est\xE1 cadastrado no Durabil.":
          j.value = true;
          break;
        case "Senha inv\xE1lida.":
          $$1.value = true;
          break;
        default:
          "Erro ao autenticar usu\xE1rio" === e3.error && (A.value = true);
      }
    }
  };
  return (e2, c3, d3, m2) => {
    c3(`<div${ssrRenderAttrs(mergeProps({ class: "container-main" }, m2))} data-v-578b0a84><div class="container-form" data-v-578b0a84>`), c3(ssrRenderComponent(gs, { class: "image", width: 300, height: "230", src: O }, null, d3)), c3('<div class="text" data-v-578b0a84>Log in</div>'), c3(ssrRenderComponent(is, { autofocus: "", autocomplete: "email", type: "email", modelValue: unref(E2).email, "onUpdate:modelValue": (e3) => unref(E2).email = e3, "persistent-hint": "", class: "input", density: "compact", placeholder: "Email", "prepend-inner-icon": "mdi-email-outline", variant: "outlined" }, null, d3)), c3(ssrRenderComponent(is, { modelValue: unref(E2).senha, "onUpdate:modelValue": (e3) => unref(E2).senha = e3, class: "input", "append-inner-icon": unref(U2) ? "mdi-eye-off" : "mdi-eye", type: unref(U2) ? "text" : "password", density: "compact", placeholder: "Senha", "prepend-inner-icon": "mdi-lock-outline", variant: "outlined", "onClick:appendInner": (e3) => U2.value = !unref(U2) }, null, d3)), c3(ssrRenderComponent($, { modelValue: unref(S), "onUpdate:modelValue": (e3) => isRef(S) ? S.value = e3 : null, "max-width": "400", persistent: "" }, { activator: withCtx(({ props: e3 }, n2, s2, u2) => {
      if (!n2)
        return [createVNode(br, mergeProps({ block: "", rounded: "", class: "button mb-10 mt-4" }, e3, { onClick: L, modelValue: unref(S), "onUpdate:modelValue": (e4) => isRef(S) ? S.value = e4 : null }), { default: withCtx(() => [createTextVNode(" Acessar ")]), _: 2 }, 1040, ["modelValue", "onUpdate:modelValue"])];
      n2(ssrRenderComponent(br, mergeProps({ block: "", rounded: "", class: "button mb-10 mt-4" }, e3, { onClick: L, modelValue: unref(S), "onUpdate:modelValue": (e4) => isRef(S) ? S.value = e4 : null }), { default: withCtx((e4, a2, o2, t2) => {
        if (!a2)
          return [createTextVNode(" Acessar ")];
        a2(" Acessar ");
      }), _: 2 }, s2, u2));
    }), default: withCtx((e3, a2, t2, c4) => {
      if (!a2)
        return [unref($$1) ? (openBlock(), createBlock(oe, { key: 0, text: "Senha inv\xE1lida." }, { actions: withCtx(() => [createVNode(Sr), createVNode(br, { onClick: I, style: { "background-color": "#429946", color: "white" } }, { default: withCtx(() => [createTextVNode(" OK ")]), _: 1 })]), _: 1 })) : createCommentVNode("", true), unref(j) ? (openBlock(), createBlock(oe, { key: 1, text: "Esse email n\xE3o est\xE1 cadastrado." }, { actions: withCtx(() => [createVNode(Sr), createVNode(br, { onClick: I, style: { "background-color": "#429946", color: "white" } }, { default: withCtx(() => [createTextVNode(" OK ")]), _: 1 })]), _: 1 })) : createCommentVNode("", true), unref(A) ? (openBlock(), createBlock(oe, { key: 2, text: "Erro no sistema, fora do ar." }, { actions: withCtx(() => [createVNode(Sr), createVNode(br, { onClick: I, style: { "background-color": "#429946", color: "white" } }, { default: withCtx(() => [createTextVNode(" OK ")]), _: 1 })]), _: 1 })) : createCommentVNode("", true)];
      unref($$1) ? a2(ssrRenderComponent(oe, { text: "Senha inv\xE1lida." }, { actions: withCtx((e4, a3, o2, t3) => {
        if (!a3)
          return [createVNode(Sr), createVNode(br, { onClick: I, style: { "background-color": "#429946", color: "white" } }, { default: withCtx(() => [createTextVNode(" OK ")]), _: 1 })];
        a3(ssrRenderComponent(Sr, null, null, o2, t3)), a3(ssrRenderComponent(br, { onClick: I, style: { "background-color": "#429946", color: "white" } }, { default: withCtx((e5, a4, o3, t4) => {
          if (!a4)
            return [createTextVNode(" OK ")];
          a4(" OK ");
        }), _: 1 }, o2, t3));
      }), _: 1 }, t2, c4)) : a2("<!---->"), unref(j) ? a2(ssrRenderComponent(oe, { text: "Esse email n\xE3o est\xE1 cadastrado." }, { actions: withCtx((e4, a3, o2, t3) => {
        if (!a3)
          return [createVNode(Sr), createVNode(br, { onClick: I, style: { "background-color": "#429946", color: "white" } }, { default: withCtx(() => [createTextVNode(" OK ")]), _: 1 })];
        a3(ssrRenderComponent(Sr, null, null, o2, t3)), a3(ssrRenderComponent(br, { onClick: I, style: { "background-color": "#429946", color: "white" } }, { default: withCtx((e5, a4, o3, t4) => {
          if (!a4)
            return [createTextVNode(" OK ")];
          a4(" OK ");
        }), _: 1 }, o2, t3));
      }), _: 1 }, t2, c4)) : a2("<!---->"), unref(A) ? a2(ssrRenderComponent(oe, { text: "Erro no sistema, fora do ar." }, { actions: withCtx((e4, a3, o2, t3) => {
        if (!a3)
          return [createVNode(Sr), createVNode(br, { onClick: I, style: { "background-color": "#429946", color: "white" } }, { default: withCtx(() => [createTextVNode(" OK ")]), _: 1 })];
        a3(ssrRenderComponent(Sr, null, null, o2, t3)), a3(ssrRenderComponent(br, { onClick: I, style: { "background-color": "#429946", color: "white" } }, { default: withCtx((e5, a4, o3, t4) => {
          if (!a4)
            return [createTextVNode(" OK ")];
          a4(" OK ");
        }), _: 1 }, o2, t3));
      }), _: 1 }, t2, c4)) : a2("<!---->");
    }), _: 1 }, d3)), c3(`<a class="text-decoration-none" rel="noopener noreferrer" style="${ssrRenderStyle({ color: "#429946" })}" data-v-578b0a84> Esqueceu a senha?</a></div><div class="background-image" data-v-578b0a84></div></div>`);
  };
} }, E = K.setup;
K.setup = (e2, a2) => {
  const o2 = useSSRContext();
  return (o2.modules || (o2.modules = /* @__PURE__ */ new Set())).add("pages/login/index.vue"), E ? E(e2, a2) : void 0;
};
const U = jc(K, [["__scopeId", "data-v-578b0a84"]]);

export { U as default };
//# sourceMappingURL=index-VUO0yGZa.mjs.map
