import { g as g$2 } from './nuxt-link-P_iIRbMa.mjs';
import { b as Ye, u as Ze, d as Ct, e as is, at as Dc } from './server.mjs';
import { ref, reactive, mergeProps, withCtx, createVNode, unref, openBlock, createBlock, useSSRContext } from 'vue';
import { g } from './fetch-D2ZU2xOO.mjs';
import { ssrRenderComponent, ssrRenderStyle, ssrRenderAttr, ssrRenderClass, ssrIncludeBooleanAttr } from 'vue/server-renderer';
import { A, B, g as g$1, a } from './mudarStatus-COPzM8_6.mjs';
import { A as A$1 } from './visualizar-DCsXQasW.mjs';
import { A as A$2 } from './selo-DmmIIbRx.mjs';
import { i } from './VContainer-Dwlw6VVY.mjs';
import { $ } from './VRow-Ca2v9sIW.mjs';
import { y } from './VCol-CrrHdFZ4.mjs';
import { L as L$1 } from './VAutocomplete-yDrVnvO6.mjs';
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

const R = { __name: "index", __ssrInlineRender: true, setup(_2) {
  const R2 = Ye(), L2 = `${R2.public.managemant}/listarUsuarios`, P = `${R2.public.managemant}/listarOrdensServico`, D = `${R2.public.managemant}/tipoAtos`, N = Ze(), O = ref(Ct("auth_token").value) || null, j = ref(Ct("user-data").value.cartorio_token) || null, q = ref([]), z = ref([]), F = ref([]), T = ref(["PENDENTE", "EM ANDAMENTO", "CONCLU\xCDDA", "LAVRADA"]), M = reactive({ numero: null, data_inicio: Z(), data_fim: Z(), data_lavratura_inicio: null, data_lavratura_fim: null, protocolo: null, livro: null, folha: null, situacao: null, usuario_token: O.value, selo: null, ato_tipo_token: null, apresentante: null }), G = [{ title: "N\xFAmero", value: "numero" }, { title: "Situa\xE7\xE3o", value: "situacao" }, { title: "CPF", value: "apresentante_cpf" }, { title: "Apresentante", value: "apresentante_nome" }, { title: "Usuario", value: "usuario_nome" }, { title: "Data Recebimento", value: "dt_pagto" }, { value: "actions" }];
  function Z() {
    const e2 = /* @__PURE__ */ new Date();
    return `${e2.getFullYear()}-${String(e2.getMonth() + 1).padStart(2, "0")}-${String(e2.getDate()).padStart(2, "0")}`;
  }
  async function H() {
    try {
      const { data: e2, error: l2 } = await g(P, { method: "POST", body: { cartorio_token: j.value, numero: M.numero, data_inicio: M.data_inicio, data_fim: M.data_fim, data_lavratura_inicio: M.data_lavratura_inicio, data_lavratura_fim: M.data_lavratura_fim, protocolo: M.protocolo, livro: M.livro, folha: M.folha, situacao: M.situacao, usuario_token: M.usuario_token, selo: M.selo, ato_tipo_token: M.ato_tipo_token, apresentante: M.apresentante } }, "$GorUGsNsKS");
      e2.value.length > 0 ? q.value = e2.value : q.value = [];
    } catch (e2) {
      console.error("Erro na requisi\xE7\xE3o", e2);
    }
  }
  async function I(e2) {
    console.log("excluido");
  }
  function K(e2) {
    const l2 = Ct("user-service"), t2 = q.value.find((l3) => l3.id === e2);
    l2.value = t2.token, N.push({ path: `/ordens-servicos/atualizar/${e2}` });
  }
  !async function() {
    const { data: e2, error: l2 } = await g(L2, { method: "POST", body: { cartorio_token: j.value } }, "$865v1qFEsl");
    z.value = e2.value;
  }(), async function() {
    const { data: e2, error: l2 } = await g(D, { method: "POST", body: { cartorio_token: j.value, usuario_token: O.value } }, "$wkWiNo8Od3");
    F.value = e2.value;
  }(), async function() {
    const e2 = Z(), { data: l2, error: a2 } = await g(P, { method: "POST", body: { cartorio_token: j.value, usuario_token: O.value, data_fim: e2, data_inicio: e2 } }, "$zDH8ovqZZe");
    l2.value.length > 0 ? (q.value = l2.value, console.log(l2.value)) : q.value = [];
  }();
  const W = ref(null), Y = () => {
    const e2 = Ct("user-service"), l2 = Ct("ordem-button");
    e2.value = null, W.value = true, l2.value = W.value;
  };
  return (l2, a2, i2, d2) => {
    const u2 = g$2;
    a2(ssrRenderComponent(i, mergeProps({ class: "mt-5" }, d2), { default: withCtx((e2, l3, a3, i3) => {
      if (!l3)
        return [createVNode($, { class: "mb-5" }, { default: withCtx(() => [createVNode("h1", null, "Ordens de Servi\xE7o"), createVNode(u2, { to: "/ordens-servicos/criar-registro" }, { default: withCtx(() => [createVNode("img", { style: { width: "60px", height: "60px", cursor: "pointer", "margin-left": "70px" }, src: A, alt: "novo", onClick: Y })]), _: 1 })]), _: 1 }), createVNode($, { style: { "margin-bottom": "-35px" } }, { default: withCtx(() => [createVNode(y, null, { default: withCtx(() => [createVNode(is, { modelValue: unref(M).numero, "onUpdate:modelValue": (e3) => unref(M).numero = e3, label: "N\xFAmero", style: { width: "110px" } }, null, 8, ["modelValue", "onUpdate:modelValue"])]), _: 1 }), createVNode(y, null, { default: withCtx(() => [createVNode(is, { modelValue: unref(M).data_inicio, "onUpdate:modelValue": (e3) => unref(M).data_inicio = e3, type: "date", label: "Abertura de", style: { width: "150px" } }, null, 8, ["modelValue", "onUpdate:modelValue"])]), _: 1 }), createVNode(y, null, { default: withCtx(() => [createVNode(is, { modelValue: unref(M).data_fim, "onUpdate:modelValue": (e3) => unref(M).data_fim = e3, type: "date", label: "Abertura at\xE9", style: { width: "150px" } }, null, 8, ["modelValue", "onUpdate:modelValue"])]), _: 1 }), createVNode(y, null, { default: withCtx(() => [createVNode(is, { modelValue: unref(M).data_lavratura_inicio, "onUpdate:modelValue": (e3) => unref(M).data_lavratura_inicio = e3, type: "date", label: "Lavratura de", style: { width: "150px" } }, null, 8, ["modelValue", "onUpdate:modelValue"])]), _: 1 }), createVNode(y, null, { default: withCtx(() => [createVNode(is, { modelValue: unref(M).data_lavratura_fim, "onUpdate:modelValue": (e3) => unref(M).data_lavratura_fim = e3, type: "date", label: "Lavratura at\xE9", style: { width: "150px" } }, null, 8, ["modelValue", "onUpdate:modelValue"])]), _: 1 }), createVNode(y, null, { default: withCtx(() => [createVNode(is, { modelValue: unref(M).protocolo, "onUpdate:modelValue": (e3) => unref(M).protocolo = e3, label: "Protocolo", style: { width: "110px" } }, null, 8, ["modelValue", "onUpdate:modelValue"])]), _: 1 }), createVNode(y, { md: "1" }, { default: withCtx(() => [createVNode(is, { modelValue: unref(M).livro, "onUpdate:modelValue": (e3) => unref(M).livro = e3, label: "Livro", style: { width: "80px" } }, null, 8, ["modelValue", "onUpdate:modelValue"])]), _: 1 }), createVNode(y, { md: "1" }, { default: withCtx(() => [createVNode(is, { modelValue: unref(M).folha, "onUpdate:modelValue": (e3) => unref(M).folha = e3, label: "Folha", style: { width: "80px" } }, null, 8, ["modelValue", "onUpdate:modelValue"])]), _: 1 })]), _: 1 }), createVNode($, null, { default: withCtx(() => [createVNode(y, { md: "3" }, { default: withCtx(() => [createVNode(L$1, { modelValue: unref(M).situacao, "onUpdate:modelValue": (e3) => unref(M).situacao = e3, items: unref(T), label: "Situa\xE7\xE3o" }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])]), _: 1 }), createVNode(y, { md: "2" }, { default: withCtx(() => [createVNode(L$1, { items: unref(z), modelValue: unref(M).usuario_token, "onUpdate:modelValue": (e3) => unref(M).usuario_token = e3, "item-title": "user_nome", "item-value": "user_token", label: "Usuario" }, null, 8, ["items", "modelValue", "onUpdate:modelValue"])]), _: 1 }), createVNode(y, { md: "1" }, { default: withCtx(() => [createVNode(is, { modelValue: unref(M).selo, "onUpdate:modelValue": (e3) => unref(M).selo = e3, label: "Selo" }, null, 8, ["modelValue", "onUpdate:modelValue"])]), _: 1 }), createVNode(y, { md: "3" }, { default: withCtx(() => [createVNode(L$1, { modelValue: unref(M).ato_tipo_token, "onUpdate:modelValue": (e3) => unref(M).ato_tipo_token = e3, items: unref(F), "item-title": "descricao", "item-value": "token", label: "Servi\xE7o" }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])]), _: 1 }), createVNode(y, { md: "2" }, { default: withCtx(() => [createVNode(is, { modelValue: unref(M).apresentante, "onUpdate:modelValue": (e3) => unref(M).apresentante = e3, label: "Apresentante" }, null, 8, ["modelValue", "onUpdate:modelValue"])]), _: 1 }), createVNode(y, null, { default: withCtx(() => [createVNode("div", null, [createVNode("img", { onClick: H, style: { width: "40px", height: "40px", cursor: "pointer" }, src: A$1, alt: "Pesquisar" })])]), _: 1 })]), _: 1 }), createVNode("hr", { class: "mt-5 mb-5" }), createVNode(Dc, { headers: G, items: unref(q), "item-key": "id" }, { "item.actions": withCtx(({ item: e3 }) => [createVNode($, { style: { display: "flex", gap: "10px", "margin-top": "-5px" } }, { default: withCtx(() => [createVNode("div", { onClick: (l4) => K(e3.id), title: "Receber" }, [createVNode("img", { style: { width: "30px", height: "30px", cursor: "pointer" }, src: A$2, alt: "Receber" })], 8, ["onClick"]), createVNode("div", { class: { disabled: !e3.btn_editar }, onClick: (l4) => e3.btn_editar ? K(e3.id) : null, title: e3.btn_editar ? "Editar" : "Desabilitado" }, [createVNode("img", { style: { cursor: e3.btn_editar ? "pointer" : "default", width: "30px", height: "30px" }, src: B, alt: "Editar" }, null, 4)], 10, ["onClick", "title"]), createVNode("div", { disabled: !e3.btn_cancelar, onClick: (l4) => e3.btn_cancelar ? I() : null, title: "Excluir" }, [e3.excluido ? (openBlock(), createBlock("img", { key: 0, style: { width: "30px", height: "30px", cursor: "pointer" }, src: g$1, alt: "Visualizar", title: "Reativar" })) : (openBlock(), createBlock("img", { key: 1, src: a, alt: "Excluir", class: "trash-icon", style: { width: "30px", height: "30px", cursor: "pointer" }, title: "Excluir" }))], 8, ["disabled", "onClick"])]), _: 2 }, 1024)]), _: 1 }, 8, ["items"])];
      l3(ssrRenderComponent($, { class: "mb-5" }, { default: withCtx((e3, l4, a4, t2) => {
        if (!l4)
          return [createVNode("h1", null, "Ordens de Servi\xE7o"), createVNode(u2, { to: "/ordens-servicos/criar-registro" }, { default: withCtx(() => [createVNode("img", { style: { width: "60px", height: "60px", cursor: "pointer", "margin-left": "70px" }, src: A, alt: "novo", onClick: Y })]), _: 1 })];
        l4(`<h1${t2}>Ordens de Servi\xE7o</h1>`), l4(ssrRenderComponent(u2, { to: "/ordens-servicos/criar-registro" }, { default: withCtx((e4, l5, a5, t3) => {
          if (!l5)
            return [createVNode("img", { style: { width: "60px", height: "60px", cursor: "pointer", "margin-left": "70px" }, src: A, alt: "novo", onClick: Y })];
          l5(`<img style="${ssrRenderStyle({ width: "60px", height: "60px", cursor: "pointer", "margin-left": "70px" })}"${ssrRenderAttr("src", A)} alt="novo"${t3}>`);
        }), _: 1 }, a4, t2));
      }), _: 1 }, a3, i3)), l3(ssrRenderComponent($, { style: { "margin-bottom": "-35px" } }, { default: withCtx((e3, l4, a4, o2) => {
        if (!l4)
          return [createVNode(y, null, { default: withCtx(() => [createVNode(is, { modelValue: unref(M).numero, "onUpdate:modelValue": (e4) => unref(M).numero = e4, label: "N\xFAmero", style: { width: "110px" } }, null, 8, ["modelValue", "onUpdate:modelValue"])]), _: 1 }), createVNode(y, null, { default: withCtx(() => [createVNode(is, { modelValue: unref(M).data_inicio, "onUpdate:modelValue": (e4) => unref(M).data_inicio = e4, type: "date", label: "Abertura de", style: { width: "150px" } }, null, 8, ["modelValue", "onUpdate:modelValue"])]), _: 1 }), createVNode(y, null, { default: withCtx(() => [createVNode(is, { modelValue: unref(M).data_fim, "onUpdate:modelValue": (e4) => unref(M).data_fim = e4, type: "date", label: "Abertura at\xE9", style: { width: "150px" } }, null, 8, ["modelValue", "onUpdate:modelValue"])]), _: 1 }), createVNode(y, null, { default: withCtx(() => [createVNode(is, { modelValue: unref(M).data_lavratura_inicio, "onUpdate:modelValue": (e4) => unref(M).data_lavratura_inicio = e4, type: "date", label: "Lavratura de", style: { width: "150px" } }, null, 8, ["modelValue", "onUpdate:modelValue"])]), _: 1 }), createVNode(y, null, { default: withCtx(() => [createVNode(is, { modelValue: unref(M).data_lavratura_fim, "onUpdate:modelValue": (e4) => unref(M).data_lavratura_fim = e4, type: "date", label: "Lavratura at\xE9", style: { width: "150px" } }, null, 8, ["modelValue", "onUpdate:modelValue"])]), _: 1 }), createVNode(y, null, { default: withCtx(() => [createVNode(is, { modelValue: unref(M).protocolo, "onUpdate:modelValue": (e4) => unref(M).protocolo = e4, label: "Protocolo", style: { width: "110px" } }, null, 8, ["modelValue", "onUpdate:modelValue"])]), _: 1 }), createVNode(y, { md: "1" }, { default: withCtx(() => [createVNode(is, { modelValue: unref(M).livro, "onUpdate:modelValue": (e4) => unref(M).livro = e4, label: "Livro", style: { width: "80px" } }, null, 8, ["modelValue", "onUpdate:modelValue"])]), _: 1 }), createVNode(y, { md: "1" }, { default: withCtx(() => [createVNode(is, { modelValue: unref(M).folha, "onUpdate:modelValue": (e4) => unref(M).folha = e4, label: "Folha", style: { width: "80px" } }, null, 8, ["modelValue", "onUpdate:modelValue"])]), _: 1 })];
        l4(ssrRenderComponent(y, null, { default: withCtx((e4, l5, a5, o3) => {
          if (!l5)
            return [createVNode(is, { modelValue: unref(M).numero, "onUpdate:modelValue": (e5) => unref(M).numero = e5, label: "N\xFAmero", style: { width: "110px" } }, null, 8, ["modelValue", "onUpdate:modelValue"])];
          l5(ssrRenderComponent(is, { modelValue: unref(M).numero, "onUpdate:modelValue": (e5) => unref(M).numero = e5, label: "N\xFAmero", style: { width: "110px" } }, null, a5, o3));
        }), _: 1 }, a4, o2)), l4(ssrRenderComponent(y, null, { default: withCtx((e4, l5, a5, o3) => {
          if (!l5)
            return [createVNode(is, { modelValue: unref(M).data_inicio, "onUpdate:modelValue": (e5) => unref(M).data_inicio = e5, type: "date", label: "Abertura de", style: { width: "150px" } }, null, 8, ["modelValue", "onUpdate:modelValue"])];
          l5(ssrRenderComponent(is, { modelValue: unref(M).data_inicio, "onUpdate:modelValue": (e5) => unref(M).data_inicio = e5, type: "date", label: "Abertura de", style: { width: "150px" } }, null, a5, o3));
        }), _: 1 }, a4, o2)), l4(ssrRenderComponent(y, null, { default: withCtx((e4, l5, a5, o3) => {
          if (!l5)
            return [createVNode(is, { modelValue: unref(M).data_fim, "onUpdate:modelValue": (e5) => unref(M).data_fim = e5, type: "date", label: "Abertura at\xE9", style: { width: "150px" } }, null, 8, ["modelValue", "onUpdate:modelValue"])];
          l5(ssrRenderComponent(is, { modelValue: unref(M).data_fim, "onUpdate:modelValue": (e5) => unref(M).data_fim = e5, type: "date", label: "Abertura at\xE9", style: { width: "150px" } }, null, a5, o3));
        }), _: 1 }, a4, o2)), l4(ssrRenderComponent(y, null, { default: withCtx((e4, l5, a5, o3) => {
          if (!l5)
            return [createVNode(is, { modelValue: unref(M).data_lavratura_inicio, "onUpdate:modelValue": (e5) => unref(M).data_lavratura_inicio = e5, type: "date", label: "Lavratura de", style: { width: "150px" } }, null, 8, ["modelValue", "onUpdate:modelValue"])];
          l5(ssrRenderComponent(is, { modelValue: unref(M).data_lavratura_inicio, "onUpdate:modelValue": (e5) => unref(M).data_lavratura_inicio = e5, type: "date", label: "Lavratura de", style: { width: "150px" } }, null, a5, o3));
        }), _: 1 }, a4, o2)), l4(ssrRenderComponent(y, null, { default: withCtx((e4, l5, a5, o3) => {
          if (!l5)
            return [createVNode(is, { modelValue: unref(M).data_lavratura_fim, "onUpdate:modelValue": (e5) => unref(M).data_lavratura_fim = e5, type: "date", label: "Lavratura at\xE9", style: { width: "150px" } }, null, 8, ["modelValue", "onUpdate:modelValue"])];
          l5(ssrRenderComponent(is, { modelValue: unref(M).data_lavratura_fim, "onUpdate:modelValue": (e5) => unref(M).data_lavratura_fim = e5, type: "date", label: "Lavratura at\xE9", style: { width: "150px" } }, null, a5, o3));
        }), _: 1 }, a4, o2)), l4(ssrRenderComponent(y, null, { default: withCtx((e4, l5, a5, o3) => {
          if (!l5)
            return [createVNode(is, { modelValue: unref(M).protocolo, "onUpdate:modelValue": (e5) => unref(M).protocolo = e5, label: "Protocolo", style: { width: "110px" } }, null, 8, ["modelValue", "onUpdate:modelValue"])];
          l5(ssrRenderComponent(is, { modelValue: unref(M).protocolo, "onUpdate:modelValue": (e5) => unref(M).protocolo = e5, label: "Protocolo", style: { width: "110px" } }, null, a5, o3));
        }), _: 1 }, a4, o2)), l4(ssrRenderComponent(y, { md: "1" }, { default: withCtx((e4, l5, a5, o3) => {
          if (!l5)
            return [createVNode(is, { modelValue: unref(M).livro, "onUpdate:modelValue": (e5) => unref(M).livro = e5, label: "Livro", style: { width: "80px" } }, null, 8, ["modelValue", "onUpdate:modelValue"])];
          l5(ssrRenderComponent(is, { modelValue: unref(M).livro, "onUpdate:modelValue": (e5) => unref(M).livro = e5, label: "Livro", style: { width: "80px" } }, null, a5, o3));
        }), _: 1 }, a4, o2)), l4(ssrRenderComponent(y, { md: "1" }, { default: withCtx((e4, l5, a5, o3) => {
          if (!l5)
            return [createVNode(is, { modelValue: unref(M).folha, "onUpdate:modelValue": (e5) => unref(M).folha = e5, label: "Folha", style: { width: "80px" } }, null, 8, ["modelValue", "onUpdate:modelValue"])];
          l5(ssrRenderComponent(is, { modelValue: unref(M).folha, "onUpdate:modelValue": (e5) => unref(M).folha = e5, label: "Folha", style: { width: "80px" } }, null, a5, o3));
        }), _: 1 }, a4, o2));
      }), _: 1 }, a3, i3)), l3(ssrRenderComponent($, null, { default: withCtx((e3, l4, a4, o2) => {
        if (!l4)
          return [createVNode(y, { md: "3" }, { default: withCtx(() => [createVNode(L$1, { modelValue: unref(M).situacao, "onUpdate:modelValue": (e4) => unref(M).situacao = e4, items: unref(T), label: "Situa\xE7\xE3o" }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])]), _: 1 }), createVNode(y, { md: "2" }, { default: withCtx(() => [createVNode(L$1, { items: unref(z), modelValue: unref(M).usuario_token, "onUpdate:modelValue": (e4) => unref(M).usuario_token = e4, "item-title": "user_nome", "item-value": "user_token", label: "Usuario" }, null, 8, ["items", "modelValue", "onUpdate:modelValue"])]), _: 1 }), createVNode(y, { md: "1" }, { default: withCtx(() => [createVNode(is, { modelValue: unref(M).selo, "onUpdate:modelValue": (e4) => unref(M).selo = e4, label: "Selo" }, null, 8, ["modelValue", "onUpdate:modelValue"])]), _: 1 }), createVNode(y, { md: "3" }, { default: withCtx(() => [createVNode(L$1, { modelValue: unref(M).ato_tipo_token, "onUpdate:modelValue": (e4) => unref(M).ato_tipo_token = e4, items: unref(F), "item-title": "descricao", "item-value": "token", label: "Servi\xE7o" }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])]), _: 1 }), createVNode(y, { md: "2" }, { default: withCtx(() => [createVNode(is, { modelValue: unref(M).apresentante, "onUpdate:modelValue": (e4) => unref(M).apresentante = e4, label: "Apresentante" }, null, 8, ["modelValue", "onUpdate:modelValue"])]), _: 1 }), createVNode(y, null, { default: withCtx(() => [createVNode("div", null, [createVNode("img", { onClick: H, style: { width: "40px", height: "40px", cursor: "pointer" }, src: A$1, alt: "Pesquisar" })])]), _: 1 })];
        l4(ssrRenderComponent(y, { md: "3" }, { default: withCtx((e4, l5, a5, t2) => {
          if (!l5)
            return [createVNode(L$1, { modelValue: unref(M).situacao, "onUpdate:modelValue": (e5) => unref(M).situacao = e5, items: unref(T), label: "Situa\xE7\xE3o" }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])];
          l5(ssrRenderComponent(L$1, { modelValue: unref(M).situacao, "onUpdate:modelValue": (e5) => unref(M).situacao = e5, items: unref(T), label: "Situa\xE7\xE3o" }, null, a5, t2));
        }), _: 1 }, a4, o2)), l4(ssrRenderComponent(y, { md: "2" }, { default: withCtx((e4, l5, a5, t2) => {
          if (!l5)
            return [createVNode(L$1, { items: unref(z), modelValue: unref(M).usuario_token, "onUpdate:modelValue": (e5) => unref(M).usuario_token = e5, "item-title": "user_nome", "item-value": "user_token", label: "Usuario" }, null, 8, ["items", "modelValue", "onUpdate:modelValue"])];
          l5(ssrRenderComponent(L$1, { items: unref(z), modelValue: unref(M).usuario_token, "onUpdate:modelValue": (e5) => unref(M).usuario_token = e5, "item-title": "user_nome", "item-value": "user_token", label: "Usuario" }, null, a5, t2));
        }), _: 1 }, a4, o2)), l4(ssrRenderComponent(y, { md: "1" }, { default: withCtx((e4, l5, a5, o3) => {
          if (!l5)
            return [createVNode(is, { modelValue: unref(M).selo, "onUpdate:modelValue": (e5) => unref(M).selo = e5, label: "Selo" }, null, 8, ["modelValue", "onUpdate:modelValue"])];
          l5(ssrRenderComponent(is, { modelValue: unref(M).selo, "onUpdate:modelValue": (e5) => unref(M).selo = e5, label: "Selo" }, null, a5, o3));
        }), _: 1 }, a4, o2)), l4(ssrRenderComponent(y, { md: "3" }, { default: withCtx((e4, l5, a5, t2) => {
          if (!l5)
            return [createVNode(L$1, { modelValue: unref(M).ato_tipo_token, "onUpdate:modelValue": (e5) => unref(M).ato_tipo_token = e5, items: unref(F), "item-title": "descricao", "item-value": "token", label: "Servi\xE7o" }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])];
          l5(ssrRenderComponent(L$1, { modelValue: unref(M).ato_tipo_token, "onUpdate:modelValue": (e5) => unref(M).ato_tipo_token = e5, items: unref(F), "item-title": "descricao", "item-value": "token", label: "Servi\xE7o" }, null, a5, t2));
        }), _: 1 }, a4, o2)), l4(ssrRenderComponent(y, { md: "2" }, { default: withCtx((e4, l5, a5, o3) => {
          if (!l5)
            return [createVNode(is, { modelValue: unref(M).apresentante, "onUpdate:modelValue": (e5) => unref(M).apresentante = e5, label: "Apresentante" }, null, 8, ["modelValue", "onUpdate:modelValue"])];
          l5(ssrRenderComponent(is, { modelValue: unref(M).apresentante, "onUpdate:modelValue": (e5) => unref(M).apresentante = e5, label: "Apresentante" }, null, a5, o3));
        }), _: 1 }, a4, o2)), l4(ssrRenderComponent(y, null, { default: withCtx((e4, l5, a5, t2) => {
          if (!l5)
            return [createVNode("div", null, [createVNode("img", { onClick: H, style: { width: "40px", height: "40px", cursor: "pointer" }, src: A$1, alt: "Pesquisar" })])];
          l5(`<div${t2}><img style="${ssrRenderStyle({ width: "40px", height: "40px", cursor: "pointer" })}"${ssrRenderAttr("src", A$1)} alt="Pesquisar"${t2}></div>`);
        }), _: 1 }, a4, o2));
      }), _: 1 }, a3, i3)), l3(`<hr class="mt-5 mb-5"${i3}>`), l3(ssrRenderComponent(Dc, { headers: G, items: unref(q), "item-key": "id" }, { "item.actions": withCtx(({ item: e3 }, l4, a4, t2) => {
        if (!l4)
          return [createVNode($, { style: { display: "flex", gap: "10px", "margin-top": "-5px" } }, { default: withCtx(() => [createVNode("div", { onClick: (l5) => K(e3.id), title: "Receber" }, [createVNode("img", { style: { width: "30px", height: "30px", cursor: "pointer" }, src: A$2, alt: "Receber" })], 8, ["onClick"]), createVNode("div", { class: { disabled: !e3.btn_editar }, onClick: (l5) => e3.btn_editar ? K(e3.id) : null, title: e3.btn_editar ? "Editar" : "Desabilitado" }, [createVNode("img", { style: { cursor: e3.btn_editar ? "pointer" : "default", width: "30px", height: "30px" }, src: B, alt: "Editar" }, null, 4)], 10, ["onClick", "title"]), createVNode("div", { disabled: !e3.btn_cancelar, onClick: (l5) => e3.btn_cancelar ? I() : null, title: "Excluir" }, [e3.excluido ? (openBlock(), createBlock("img", { key: 0, style: { width: "30px", height: "30px", cursor: "pointer" }, src: g$1, alt: "Visualizar", title: "Reativar" })) : (openBlock(), createBlock("img", { key: 1, src: a, alt: "Excluir", class: "trash-icon", style: { width: "30px", height: "30px", cursor: "pointer" }, title: "Excluir" }))], 8, ["disabled", "onClick"])]), _: 2 }, 1024)];
        l4(ssrRenderComponent($, { style: { display: "flex", gap: "10px", "margin-top": "-5px" } }, { default: withCtx((l5, a5, t3, o2) => {
          if (!a5)
            return [createVNode("div", { onClick: (l6) => K(e3.id), title: "Receber" }, [createVNode("img", { style: { width: "30px", height: "30px", cursor: "pointer" }, src: A$2, alt: "Receber" })], 8, ["onClick"]), createVNode("div", { class: { disabled: !e3.btn_editar }, onClick: (l6) => e3.btn_editar ? K(e3.id) : null, title: e3.btn_editar ? "Editar" : "Desabilitado" }, [createVNode("img", { style: { cursor: e3.btn_editar ? "pointer" : "default", width: "30px", height: "30px" }, src: B, alt: "Editar" }, null, 4)], 10, ["onClick", "title"]), createVNode("div", { disabled: !e3.btn_cancelar, onClick: (l6) => e3.btn_cancelar ? I() : null, title: "Excluir" }, [e3.excluido ? (openBlock(), createBlock("img", { key: 0, style: { width: "30px", height: "30px", cursor: "pointer" }, src: g$1, alt: "Visualizar", title: "Reativar" })) : (openBlock(), createBlock("img", { key: 1, src: a, alt: "Excluir", class: "trash-icon", style: { width: "30px", height: "30px", cursor: "pointer" }, title: "Excluir" }))], 8, ["disabled", "onClick"])];
          a5(`<div title="Receber"${o2}><img style="${ssrRenderStyle({ width: "30px", height: "30px", cursor: "pointer" })}"${ssrRenderAttr("src", A$2)} alt="Receber"${o2}></div><div class="${ssrRenderClass({ disabled: !e3.btn_editar })}"${ssrRenderAttr("title", e3.btn_editar ? "Editar" : "Desabilitado")}${o2}><img style="${ssrRenderStyle({ cursor: e3.btn_editar ? "pointer" : "default", width: "30px", height: "30px" })}"${ssrRenderAttr("src", B)} alt="Editar"${o2}></div><div${ssrIncludeBooleanAttr(!e3.btn_cancelar) ? " disabled" : ""} title="Excluir"${o2}>`), e3.excluido ? a5(`<img style="${ssrRenderStyle({ width: "30px", height: "30px", cursor: "pointer" })}"${ssrRenderAttr("src", g$1)} alt="Visualizar" title="Reativar"${o2}>`) : a5(`<img${ssrRenderAttr("src", a)} alt="Excluir" class="trash-icon" style="${ssrRenderStyle({ width: "30px", height: "30px", cursor: "pointer" })}" title="Excluir"${o2}>`), a5("</div>");
        }), _: 2 }, a4, t2));
      }), _: 1 }, a3, i3));
    }), _: 1 }, i2));
  };
} }, L = R.setup;
R.setup = (e2, l2) => {
  const a2 = useSSRContext();
  return (a2.modules || (a2.modules = /* @__PURE__ */ new Set())).add("pages/ordens-servicos/index.vue"), L ? L(e2, l2) : void 0;
};

export { R as default };
//# sourceMappingURL=index-BdulsX8v.mjs.map
