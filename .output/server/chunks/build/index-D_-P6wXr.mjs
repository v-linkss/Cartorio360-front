import { g as g$2 } from './nuxt-link-P_iIRbMa.mjs';
import { _ as jc, b as Ye, u as Ze, e as is, at as Dc } from './server.mjs';
import { ref, withAsyncContext, computed, unref, mergeProps, withCtx, createVNode, isRef, openBlock, createBlock, useSSRContext } from 'vue';
import { _, g as g$1 } from './fetch-D2ZU2xOO.mjs';
import { ssrRenderComponent, ssrRenderAttr, ssrRenderStyle } from 'vue/server-renderer';
import { A as A$1, B, g, a } from './mudarStatus-COPzM8_6.mjs';
import { A as A$2 } from './visualizar-DCsXQasW.mjs';
import { i } from './VContainer-Dwlw6VVY.mjs';
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

const j = { __name: "index", __ssrInlineRender: true, async setup(t2) {
  let v2, j2;
  const A2 = Ye(), E2 = `${A2.public.managemant}/getAllPessoa`, R = `${A2.public.managemant}/deletePessoa`, D = Ze(), P = ref(""), L = ref(""), S = [{ title: "Documento", value: "doc_identificacao" }, { title: "Nome/Raz\xE3o Social", value: "nome" }, { value: "actions" }], { data: I, pending: J } = ([v2, j2] = withAsyncContext(() => _(E2, "$Y8azOgWBC8")), v2 = await v2, j2(), v2), N = computed(() => I.value.filter((e2) => {
    const t3 = e2.doc_identificacao ? e2.doc_identificacao.toLowerCase() : "", i2 = e2.nome ? e2.nome.toLowerCase() : "", a2 = t3.includes(L.value.toLowerCase()), l2 = i2.includes(P.value.toLowerCase());
    return a2 && l2;
  }));
  async function O(e2) {
    e2.excluido = !e2.excluido;
    try {
      await g$1(`${R}/${e2.id}`, { method: "PUT", body: JSON.stringify({ excluido: e2.excluido }) }, "$R09XREGJQC");
    } catch (t3) {
      console.error("Erro ao excluir pessoa:", t3);
    }
  }
  function q(e2) {
    D.push({ path: `/pessoas/vizualizar/${e2}` });
  }
  function B$1(e2) {
    D.push({ path: `/pessoas/atualizar/${e2}` });
  }
  return (t3, i2, s2, o2) => {
    const n2 = g$2;
    unref(J) ? i2("<!---->") : i2(ssrRenderComponent(i, mergeProps({ class: "mt-5" }, o2), { default: withCtx((e2, t4, i3, s3) => {
      if (!t4)
        return [createVNode(n2, { to: "/pessoas/cadastro" }, { default: withCtx(() => [createVNode("img", { class: "btn-pointer", src: A$1, alt: "Cadastro" })]), _: 1 }), createVNode($, { style: { gap: "10rem" } }, { default: withCtx(() => [createVNode("div", { style: { width: "200px" } }, [createVNode(is, { class: "mt-7 mb-4", modelValue: unref(L), "onUpdate:modelValue": (e3) => isRef(L) ? L.value = e3 : null, label: "Documento", "prepend-inner-icon": "mdi-magnify", variant: "outlined", "hide-details": "", "single-line": "" }, null, 8, ["modelValue", "onUpdate:modelValue"])]), createVNode("div", { style: { width: "300px" } }, [createVNode(is, { class: "mt-7 mb-4", modelValue: unref(P), "onUpdate:modelValue": (e3) => isRef(P) ? P.value = e3 : null, label: "Pessoa", "prepend-inner-icon": "mdi-magnify", variant: "outlined", "hide-details": "", "single-line": "" }, null, 8, ["modelValue", "onUpdate:modelValue"])])]), _: 1 }), createVNode(Dc, { density: "compact", headers: S, items: unref(N), "item-key": "id" }, { "item.actions": withCtx(({ item: e3 }) => [createVNode($, { style: { display: "flex", gap: "10px", "justify-content": "flex-end" } }, { default: withCtx(() => [createVNode("div", { class: "btn-pointer", onClick: (t5) => q(e3.id), title: "Visualizar" }, [createVNode("img", { style: { width: "30px", height: "30px" }, src: A$2, alt: "Visualizar" })], 8, ["onClick"]), createVNode("div", { class: "btn-pointer", onClick: (t5) => B$1(e3.id), title: "Atualizar" }, [createVNode("img", { style: { width: "30px", height: "30px" }, src: B, alt: "Atualizar" })], 8, ["onClick"]), createVNode("div", { class: "btn-pointer", onClick: (t5) => O(e3), title: "Deletar" }, [e3.excluido ? (openBlock(), createBlock("img", { key: 0, style: { width: "30px", height: "30px" }, src: g, alt: "Visualizar", title: "Reativar" })) : (openBlock(), createBlock("img", { key: 1, src: a, alt: "Excluir", class: "trash-icon", style: { width: "30px", height: "30px" }, title: "Excluir" }))], 8, ["onClick"])]), _: 2 }, 1024)]), _: 1 }, 8, ["items"])];
      t4(ssrRenderComponent(n2, { to: "/pessoas/cadastro" }, { default: withCtx((e3, t5, i4, a2) => {
        if (!t5)
          return [createVNode("img", { class: "btn-pointer", src: A$1, alt: "Cadastro" })];
        t5(`<img class="btn-pointer"${ssrRenderAttr("src", A$1)} alt="Cadastro" data-v-10ccdacb${a2}>`);
      }), _: 1 }, i3, s3)), t4(ssrRenderComponent($, { style: { gap: "10rem" } }, { default: withCtx((e3, t5, i4, l2) => {
        if (!t5)
          return [createVNode("div", { style: { width: "200px" } }, [createVNode(is, { class: "mt-7 mb-4", modelValue: unref(L), "onUpdate:modelValue": (e4) => isRef(L) ? L.value = e4 : null, label: "Documento", "prepend-inner-icon": "mdi-magnify", variant: "outlined", "hide-details": "", "single-line": "" }, null, 8, ["modelValue", "onUpdate:modelValue"])]), createVNode("div", { style: { width: "300px" } }, [createVNode(is, { class: "mt-7 mb-4", modelValue: unref(P), "onUpdate:modelValue": (e4) => isRef(P) ? P.value = e4 : null, label: "Pessoa", "prepend-inner-icon": "mdi-magnify", variant: "outlined", "hide-details": "", "single-line": "" }, null, 8, ["modelValue", "onUpdate:modelValue"])])];
        t5(`<div style="${ssrRenderStyle({ width: "200px" })}" data-v-10ccdacb${l2}>`), t5(ssrRenderComponent(is, { class: "mt-7 mb-4", modelValue: unref(L), "onUpdate:modelValue": (e4) => isRef(L) ? L.value = e4 : null, label: "Documento", "prepend-inner-icon": "mdi-magnify", variant: "outlined", "hide-details": "", "single-line": "" }, null, i4, l2)), t5(`</div><div style="${ssrRenderStyle({ width: "300px" })}" data-v-10ccdacb${l2}>`), t5(ssrRenderComponent(is, { class: "mt-7 mb-4", modelValue: unref(P), "onUpdate:modelValue": (e4) => isRef(P) ? P.value = e4 : null, label: "Pessoa", "prepend-inner-icon": "mdi-magnify", variant: "outlined", "hide-details": "", "single-line": "" }, null, i4, l2)), t5("</div>");
      }), _: 1 }, i3, s3)), t4(ssrRenderComponent(Dc, { density: "compact", headers: S, items: unref(N), "item-key": "id" }, { "item.actions": withCtx(({ item: e3 }, t5, i4, a2) => {
        if (!t5)
          return [createVNode($, { style: { display: "flex", gap: "10px", "justify-content": "flex-end" } }, { default: withCtx(() => [createVNode("div", { class: "btn-pointer", onClick: (t6) => q(e3.id), title: "Visualizar" }, [createVNode("img", { style: { width: "30px", height: "30px" }, src: A$2, alt: "Visualizar" })], 8, ["onClick"]), createVNode("div", { class: "btn-pointer", onClick: (t6) => B$1(e3.id), title: "Atualizar" }, [createVNode("img", { style: { width: "30px", height: "30px" }, src: B, alt: "Atualizar" })], 8, ["onClick"]), createVNode("div", { class: "btn-pointer", onClick: (t6) => O(e3), title: "Deletar" }, [e3.excluido ? (openBlock(), createBlock("img", { key: 0, style: { width: "30px", height: "30px" }, src: g, alt: "Visualizar", title: "Reativar" })) : (openBlock(), createBlock("img", { key: 1, src: a, alt: "Excluir", class: "trash-icon", style: { width: "30px", height: "30px" }, title: "Excluir" }))], 8, ["onClick"])]), _: 2 }, 1024)];
        t5(ssrRenderComponent($, { style: { display: "flex", gap: "10px", "justify-content": "flex-end" } }, { default: withCtx((t6, i5, a3, l2) => {
          if (!i5)
            return [createVNode("div", { class: "btn-pointer", onClick: (t7) => q(e3.id), title: "Visualizar" }, [createVNode("img", { style: { width: "30px", height: "30px" }, src: A$2, alt: "Visualizar" })], 8, ["onClick"]), createVNode("div", { class: "btn-pointer", onClick: (t7) => B$1(e3.id), title: "Atualizar" }, [createVNode("img", { style: { width: "30px", height: "30px" }, src: B, alt: "Atualizar" })], 8, ["onClick"]), createVNode("div", { class: "btn-pointer", onClick: (t7) => O(e3), title: "Deletar" }, [e3.excluido ? (openBlock(), createBlock("img", { key: 0, style: { width: "30px", height: "30px" }, src: g, alt: "Visualizar", title: "Reativar" })) : (openBlock(), createBlock("img", { key: 1, src: a, alt: "Excluir", class: "trash-icon", style: { width: "30px", height: "30px" }, title: "Excluir" }))], 8, ["onClick"])];
          i5(`<div class="btn-pointer" title="Visualizar" data-v-10ccdacb${l2}><img style="${ssrRenderStyle({ width: "30px", height: "30px" })}"${ssrRenderAttr("src", A$2)} alt="Visualizar" data-v-10ccdacb${l2}></div><div class="btn-pointer" title="Atualizar" data-v-10ccdacb${l2}><img style="${ssrRenderStyle({ width: "30px", height: "30px" })}"${ssrRenderAttr("src", B)} alt="Atualizar" data-v-10ccdacb${l2}></div><div class="btn-pointer" title="Deletar" data-v-10ccdacb${l2}>`), e3.excluido ? i5(`<img style="${ssrRenderStyle({ width: "30px", height: "30px" })}"${ssrRenderAttr("src", g)} alt="Visualizar" title="Reativar" data-v-10ccdacb${l2}>`) : i5(`<img${ssrRenderAttr("src", a)} alt="Excluir" class="trash-icon" style="${ssrRenderStyle({ width: "30px", height: "30px" })}" title="Excluir" data-v-10ccdacb${l2}>`), i5("</div>");
        }), _: 2 }, i4, a2));
      }), _: 1 }, i3, s3));
    }), _: 1 }, s2));
  };
} }, A = j.setup;
j.setup = (e2, t2) => {
  const i2 = useSSRContext();
  return (i2.modules || (i2.modules = /* @__PURE__ */ new Set())).add("pages/pessoas/registros/index.vue"), A ? A(e2, t2) : void 0;
};
const E = jc(j, [["__scopeId", "data-v-10ccdacb"]]);

export { E as default };
//# sourceMappingURL=index-D_-P6wXr.mjs.map
