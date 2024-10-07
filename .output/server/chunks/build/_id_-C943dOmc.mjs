import { g as g$2 } from './nuxt-link-P_iIRbMa.mjs';
import { R } from './Selos-DP5pidWu.mjs';
import { f as Ue, c as Qe, u as Ze, b as Ye, d as Ct, e as is, at as Dc } from './server.mjs';
import { ref, reactive, withAsyncContext, resolveDirective, mergeProps, withCtx, createVNode, toDisplayString, unref, withDirectives, openBlock, createBlock, useSSRContext } from 'vue';
import { g } from './fetch-D2ZU2xOO.mjs';
import { ssrRenderComponent, ssrRenderStyle, ssrInterpolate, ssrGetDirectiveProps, ssrRenderAttr, ssrRenderClass, ssrIncludeBooleanAttr } from 'vue/server-renderer';
import { A } from './salvar-37abXc2X.mjs';
import { A as A$1, B, g as g$1, a } from './mudarStatus-COPzM8_6.mjs';
import { A as A$2 } from './selo-DmmIIbRx.mjs';
import { A as A$3 } from './sair-ToPptOUL.mjs';
import { helpers, required } from '@vuelidate/validators';
import { useVuelidate } from '@vuelidate/core';
import { i } from './VContainer-Dwlw6VVY.mjs';
import { $ } from './VRow-Ca2v9sIW.mjs';
import { y } from './VCol-CrrHdFZ4.mjs';
import { L } from './VAutocomplete-yDrVnvO6.mjs';
import '../runtime.mjs';
import 'node:http';
import 'node:https';
import 'fs';
import 'path';
import 'node:fs';
import 'node:url';
import './VCard-zlRMnW-z.mjs';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'devalue';
import '@unhead/ssr';
import 'unhead';
import '@unhead/shared';
import 'vue-router';
import 'vue3-toastify';
import 'vue-the-mask';

const K = { __name: "[id]", __ssrInlineRender: true, async setup($2) {
  let K2, M2;
  const { $toast: Q } = Ue(), L$1 = Qe(), { id: Z } = L$1.params, H = Ze(), J = Ye(), W = `${J.public.managemant}/updateOrdensServico`, X = `${J.public.managemant}/getOrdensServicoById`, Y = `${J.public.managemant}/listarAtos`, ee = ref(Ct("user-data").value.cartorio_id), te = ref(Ct("user-data").value.usuario_id), ae = ref(Ct("user-service").value).value || null, re = ref(Ct("user-data").value.cartorio_token).value, le = ref([]), oe = ref(false), ie = ref(null), ne = ref(null), se = reactive({ nacionalidade: "brasileiro", apresentante_nome: null, apresentante_cpf: null, documento: null }), de = [{ title: "Protocolo", value: "protocolo" }, { title: "Usuario", value: "usuario_nome" }, { title: "Situa\xE7\xE3o", value: "situacao" }, { title: "Valor", value: "valor" }, { title: "Tipo", value: "tipo" }, { value: "actions" }], ue = [{ title: "BRASILEIRO", value: "brasileiro" }, { title: "ESTRANGEIRO", value: "estrangeiro" }], pe = { apresentante_nome: { required: helpers.withMessage("O campo \xE9 obrigatorio", required) }, apresentante_cpf: { required: helpers.withMessage("O campo \xE9 obrigatorio", required) } }, ce = useVuelidate(pe, se);
  function me(e2) {
    if (e2)
      return e2.replace(/[.\-]/g, "");
    e2 = null;
  }
  const he = (e2) => {
    ie.value = e2, oe.value = true;
  };
  async function _e() {
    const e2 = { apresentante_cpf: me(se.apresentante_cpf), apresentante_nome: se.apresentante_nome, user_id: te.value, cartorio_id: ee.value };
    if (await ce.value.$validate()) {
      const { data: t2, error: a2, status: r2 } = await g(`${W}/${Z}`, { method: "PUT", body: e2 }, "$K99ffdcGQC");
      "error" === r2.value && 500 === a2.value.statusCode ? Q.error("Erro ao cadastrar ordem,erro no sistema.") : (Q.success("Ordem Atualizada com sucesso!"), H.push({ path: "/ordens-servicos" }));
    }
  }
  const { data: fe } = ([K2, M2] = withAsyncContext(() => g(`${X}/${Z}`, { method: "GET" }, "$Q22OaB87ZU")), K2 = await K2, M2(), K2);
  ne.value = fe.value.numero, se.apresentante_cpf = fe.value.apresentante_cpf, se.apresentante_nome = fe.value.apresentante_nome;
  const { data: ge } = ([K2, M2] = withAsyncContext(() => g(Y, { method: "POST", body: { cartorio_token: re, ordemserv_token: ae } }, "$Fci2yt5KvV")), K2 = await K2, M2(), K2);
  return ge.value.length > 0 ? le.value = ge.value : le.value = [], (a2, r2, l2, o2) => {
    const s2 = g$2, d2 = R, u2 = resolveDirective("mask");
    r2(ssrRenderComponent(i, mergeProps({ class: "mt-5" }, o2), { default: withCtx((e2, t2, r3, l3) => {
      if (!t2)
        return [createVNode($, { class: "mb-5" }, { default: withCtx(() => [createVNode("h1", null, "Ordem de Servi\xE7o n\xBA"), createVNode("h1", { style: { color: "red", "margin-left": "30px" } }, toDisplayString(unref(ne)), 1)]), _: 1 }), createVNode($, null, { default: withCtx(() => [createVNode(y, { md: "3" }, { default: withCtx(() => [createVNode(L, { label: "Nacionalidade", items: ue, modelValue: unref(se).nacionalidade, "onUpdate:modelValue": (e3) => unref(se).nacionalidade = e3 }, null, 8, ["modelValue", "onUpdate:modelValue"])]), _: 1 }), createVNode(y, { md: "2" }, { default: withCtx(() => ["brasileiro" === unref(se).nacionalidade ? withDirectives((openBlock(), createBlock(is, { key: 0, autofocus: "", modelValue: unref(se).apresentante_cpf, "onUpdate:modelValue": (e3) => unref(se).apresentante_cpf = e3, label: "CPF", required: "", "error-messages": unref(ce).apresentante_cpf.$errors.map((e3) => e3.$message), onBlur: unref(ce).apresentante_cpf.$touch, onInput: unref(ce).apresentante_cpf.$touch }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages", "onBlur", "onInput"])), [[u2, "###.###.###-##"]]) : (openBlock(), createBlock(is, { key: 1, autofocus: "", modelValue: unref(se).apresentante_cpf, "onUpdate:modelValue": (e3) => unref(se).apresentante_cpf = e3, label: "Documento", required: "", "error-messages": unref(ce).apresentante_cpf.$errors.map((e3) => e3.$message), onBlur: unref(ce).apresentante_cpf.$touch }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages", "onBlur"]))]), _: 1 }), createVNode(y, { md: "4" }, { default: withCtx(() => [createVNode(is, { modelValue: unref(se).apresentante_nome, "onUpdate:modelValue": (e3) => unref(se).apresentante_nome = e3, label: "Nome Apresentante", required: "", "error-messages": unref(ce).apresentante_nome.$errors.map((e3) => e3.$message), onInput: unref(ce).apresentante_nome.$touch }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages", "onInput"])]), _: 1 }), createVNode(y, null, { default: withCtx(() => [createVNode("div", null, [createVNode("img", { style: { width: "40px", height: "40px", cursor: "pointer" }, src: A, alt: "Salvar", onClick: (e3) => _e() }, null, 8, ["onClick"])])]), _: 1 })]), _: 1 }), createVNode($, { style: { display: "flex", "margin-bottom": "10px", gap: "2rem" } }, { default: withCtx(() => [createVNode("h1", { class: "ml-5" }, "Atos"), createVNode(s2, { to: { path: "/ordens-servicos/criar-ato", query: { origem: "atualizar", id: unref(Z) } } }, { default: withCtx(() => [createVNode("img", { style: { width: "45px", height: "45px", cursor: "pointer" }, src: A$1, alt: "novo" })]), _: 1 }, 8, ["to"]), createVNode(Dc, { headers: de, items: unref(le), "item-key": "id" }, { "item.actions": withCtx(({ item: e3 }) => [createVNode($, { style: { display: "flex", gap: "10px", "margin-top": "-5px" } }, { default: withCtx(() => [createVNode("div", { onClick: (t3) => he(e3.token), title: "Receber" }, [createVNode("img", { style: { width: "30px", height: "30px", cursor: "pointer" }, src: A$2, alt: "Receber" })], 8, ["onClick"]), createVNode("div", { class: { disabled: !e3.btn_editar }, onClick: (t3) => e3.btn_editar ? a2.redirectToUpdate(e3.id) : null, title: e3.btn_editar ? "Editar" : "Desabilitado" }, [createVNode("img", { style: { cursor: e3.btn_editar ? "pointer" : "default", width: "30px", height: "30px" }, src: B, alt: "Editar" }, null, 4)], 10, ["onClick", "title"]), createVNode("div", { disabled: !e3.btn_cancelar, onClick: (t3) => e3.btn_cancelar ? a2.deleteEndereco(e3) : null, title: "Excluir" }, [e3.excluido ? (openBlock(), createBlock("img", { key: 0, style: { width: "30px", height: "30px", cursor: "pointer" }, src: g$1, alt: "Visualizar", title: "Reativar" })) : (openBlock(), createBlock("img", { key: 1, src: a, alt: "Excluir", class: "trash-icon", style: { width: "30px", height: "30px", cursor: "pointer" }, title: "Excluir" }))], 8, ["disabled", "onClick"])]), _: 2 }, 1024)]), _: 1 }, 8, ["items"]), createVNode(d2, { show: unref(oe), ato_token: unref(ie), onClose: (e3) => oe.value = false }, null, 8, ["show", "ato_token", "onClose"])]), _: 1 }), createVNode(s2, { to: "/ordens-servicos" }, { default: withCtx(() => [createVNode("img", { class: "btn-pointer mt-5", src: A$3, alt: "Sair" })]), _: 1 })];
      t2(ssrRenderComponent($, { class: "mb-5" }, { default: withCtx((e3, t3, a3, r4) => {
        if (!t3)
          return [createVNode("h1", null, "Ordem de Servi\xE7o n\xBA"), createVNode("h1", { style: { color: "red", "margin-left": "30px" } }, toDisplayString(unref(ne)), 1)];
        t3(`<h1${r4}>Ordem de Servi\xE7o n\xBA</h1><h1 style="${ssrRenderStyle({ color: "red", "margin-left": "30px" })}"${r4}>${ssrInterpolate(unref(ne))}</h1>`);
      }), _: 1 }, r3, l3)), t2(ssrRenderComponent($, null, { default: withCtx((e3, t3, r4, l4) => {
        if (!t3)
          return [createVNode(y, { md: "3" }, { default: withCtx(() => [createVNode(L, { label: "Nacionalidade", items: ue, modelValue: unref(se).nacionalidade, "onUpdate:modelValue": (e4) => unref(se).nacionalidade = e4 }, null, 8, ["modelValue", "onUpdate:modelValue"])]), _: 1 }), createVNode(y, { md: "2" }, { default: withCtx(() => ["brasileiro" === unref(se).nacionalidade ? withDirectives((openBlock(), createBlock(is, { key: 0, autofocus: "", modelValue: unref(se).apresentante_cpf, "onUpdate:modelValue": (e4) => unref(se).apresentante_cpf = e4, label: "CPF", required: "", "error-messages": unref(ce).apresentante_cpf.$errors.map((e4) => e4.$message), onBlur: unref(ce).apresentante_cpf.$touch, onInput: unref(ce).apresentante_cpf.$touch }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages", "onBlur", "onInput"])), [[u2, "###.###.###-##"]]) : (openBlock(), createBlock(is, { key: 1, autofocus: "", modelValue: unref(se).apresentante_cpf, "onUpdate:modelValue": (e4) => unref(se).apresentante_cpf = e4, label: "Documento", required: "", "error-messages": unref(ce).apresentante_cpf.$errors.map((e4) => e4.$message), onBlur: unref(ce).apresentante_cpf.$touch }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages", "onBlur"]))]), _: 1 }), createVNode(y, { md: "4" }, { default: withCtx(() => [createVNode(is, { modelValue: unref(se).apresentante_nome, "onUpdate:modelValue": (e4) => unref(se).apresentante_nome = e4, label: "Nome Apresentante", required: "", "error-messages": unref(ce).apresentante_nome.$errors.map((e4) => e4.$message), onInput: unref(ce).apresentante_nome.$touch }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages", "onInput"])]), _: 1 }), createVNode(y, null, { default: withCtx(() => [createVNode("div", null, [createVNode("img", { style: { width: "40px", height: "40px", cursor: "pointer" }, src: A, alt: "Salvar", onClick: (e4) => _e() }, null, 8, ["onClick"])])]), _: 1 })];
        t3(ssrRenderComponent(y, { md: "3" }, { default: withCtx((e4, t4, a3, r5) => {
          if (!t4)
            return [createVNode(L, { label: "Nacionalidade", items: ue, modelValue: unref(se).nacionalidade, "onUpdate:modelValue": (e5) => unref(se).nacionalidade = e5 }, null, 8, ["modelValue", "onUpdate:modelValue"])];
          t4(ssrRenderComponent(L, { label: "Nacionalidade", items: ue, modelValue: unref(se).nacionalidade, "onUpdate:modelValue": (e5) => unref(se).nacionalidade = e5 }, null, a3, r5));
        }), _: 1 }, r4, l4)), t3(ssrRenderComponent(y, { md: "2" }, { default: withCtx((e4, t4, r5, l5) => {
          if (!t4)
            return ["brasileiro" === unref(se).nacionalidade ? withDirectives((openBlock(), createBlock(is, { key: 0, autofocus: "", modelValue: unref(se).apresentante_cpf, "onUpdate:modelValue": (e5) => unref(se).apresentante_cpf = e5, label: "CPF", required: "", "error-messages": unref(ce).apresentante_cpf.$errors.map((e5) => e5.$message), onBlur: unref(ce).apresentante_cpf.$touch, onInput: unref(ce).apresentante_cpf.$touch }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages", "onBlur", "onInput"])), [[u2, "###.###.###-##"]]) : (openBlock(), createBlock(is, { key: 1, autofocus: "", modelValue: unref(se).apresentante_cpf, "onUpdate:modelValue": (e5) => unref(se).apresentante_cpf = e5, label: "Documento", required: "", "error-messages": unref(ce).apresentante_cpf.$errors.map((e5) => e5.$message), onBlur: unref(ce).apresentante_cpf.$touch }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages", "onBlur"]))];
          "brasileiro" === unref(se).nacionalidade ? t4(ssrRenderComponent(is, mergeProps({ autofocus: "", modelValue: unref(se).apresentante_cpf, "onUpdate:modelValue": (e5) => unref(se).apresentante_cpf = e5, label: "CPF", required: "", "error-messages": unref(ce).apresentante_cpf.$errors.map((e5) => e5.$message), onBlur: unref(ce).apresentante_cpf.$touch, onInput: unref(ce).apresentante_cpf.$touch }, ssrGetDirectiveProps(a2, u2, "###.###.###-##")), null, r5, l5)) : t4(ssrRenderComponent(is, { autofocus: "", modelValue: unref(se).apresentante_cpf, "onUpdate:modelValue": (e5) => unref(se).apresentante_cpf = e5, label: "Documento", required: "", "error-messages": unref(ce).apresentante_cpf.$errors.map((e5) => e5.$message), onBlur: unref(ce).apresentante_cpf.$touch }, null, r5, l5));
        }), _: 1 }, r4, l4)), t3(ssrRenderComponent(y, { md: "4" }, { default: withCtx((e4, t4, a3, r5) => {
          if (!t4)
            return [createVNode(is, { modelValue: unref(se).apresentante_nome, "onUpdate:modelValue": (e5) => unref(se).apresentante_nome = e5, label: "Nome Apresentante", required: "", "error-messages": unref(ce).apresentante_nome.$errors.map((e5) => e5.$message), onInput: unref(ce).apresentante_nome.$touch }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages", "onInput"])];
          t4(ssrRenderComponent(is, { modelValue: unref(se).apresentante_nome, "onUpdate:modelValue": (e5) => unref(se).apresentante_nome = e5, label: "Nome Apresentante", required: "", "error-messages": unref(ce).apresentante_nome.$errors.map((e5) => e5.$message), onInput: unref(ce).apresentante_nome.$touch }, null, a3, r5));
        }), _: 1 }, r4, l4)), t3(ssrRenderComponent(y, null, { default: withCtx((e4, t4, a3, r5) => {
          if (!t4)
            return [createVNode("div", null, [createVNode("img", { style: { width: "40px", height: "40px", cursor: "pointer" }, src: A, alt: "Salvar", onClick: (e5) => _e() }, null, 8, ["onClick"])])];
          t4(`<div${r5}><img style="${ssrRenderStyle({ width: "40px", height: "40px", cursor: "pointer" })}"${ssrRenderAttr("src", A)} alt="Salvar"${r5}></div>`);
        }), _: 1 }, r4, l4));
      }), _: 1 }, r3, l3)), t2(ssrRenderComponent($, { style: { display: "flex", "margin-bottom": "10px", gap: "2rem" } }, { default: withCtx((e3, t3, r4, l4) => {
        if (!t3)
          return [createVNode("h1", { class: "ml-5" }, "Atos"), createVNode(s2, { to: { path: "/ordens-servicos/criar-ato", query: { origem: "atualizar", id: unref(Z) } } }, { default: withCtx(() => [createVNode("img", { style: { width: "45px", height: "45px", cursor: "pointer" }, src: A$1, alt: "novo" })]), _: 1 }, 8, ["to"]), createVNode(Dc, { headers: de, items: unref(le), "item-key": "id" }, { "item.actions": withCtx(({ item: e4 }) => [createVNode($, { style: { display: "flex", gap: "10px", "margin-top": "-5px" } }, { default: withCtx(() => [createVNode("div", { onClick: (t4) => he(e4.token), title: "Receber" }, [createVNode("img", { style: { width: "30px", height: "30px", cursor: "pointer" }, src: A$2, alt: "Receber" })], 8, ["onClick"]), createVNode("div", { class: { disabled: !e4.btn_editar }, onClick: (t4) => e4.btn_editar ? a2.redirectToUpdate(e4.id) : null, title: e4.btn_editar ? "Editar" : "Desabilitado" }, [createVNode("img", { style: { cursor: e4.btn_editar ? "pointer" : "default", width: "30px", height: "30px" }, src: B, alt: "Editar" }, null, 4)], 10, ["onClick", "title"]), createVNode("div", { disabled: !e4.btn_cancelar, onClick: (t4) => e4.btn_cancelar ? a2.deleteEndereco(e4) : null, title: "Excluir" }, [e4.excluido ? (openBlock(), createBlock("img", { key: 0, style: { width: "30px", height: "30px", cursor: "pointer" }, src: g$1, alt: "Visualizar", title: "Reativar" })) : (openBlock(), createBlock("img", { key: 1, src: a, alt: "Excluir", class: "trash-icon", style: { width: "30px", height: "30px", cursor: "pointer" }, title: "Excluir" }))], 8, ["disabled", "onClick"])]), _: 2 }, 1024)]), _: 1 }, 8, ["items"]), createVNode(d2, { show: unref(oe), ato_token: unref(ie), onClose: (e4) => oe.value = false }, null, 8, ["show", "ato_token", "onClose"])];
        t3(`<h1 class="ml-5"${l4}>Atos</h1>`), t3(ssrRenderComponent(s2, { to: { path: "/ordens-servicos/criar-ato", query: { origem: "atualizar", id: unref(Z) } } }, { default: withCtx((e4, t4, a3, r5) => {
          if (!t4)
            return [createVNode("img", { style: { width: "45px", height: "45px", cursor: "pointer" }, src: A$1, alt: "novo" })];
          t4(`<img style="${ssrRenderStyle({ width: "45px", height: "45px", cursor: "pointer" })}"${ssrRenderAttr("src", A$1)} alt="novo"${r5}>`);
        }), _: 1 }, r4, l4)), t3(ssrRenderComponent(Dc, { headers: de, items: unref(le), "item-key": "id" }, { "item.actions": withCtx(({ item: e4 }, t4, r5, l5) => {
          if (!t4)
            return [createVNode($, { style: { display: "flex", gap: "10px", "margin-top": "-5px" } }, { default: withCtx(() => [createVNode("div", { onClick: (t5) => he(e4.token), title: "Receber" }, [createVNode("img", { style: { width: "30px", height: "30px", cursor: "pointer" }, src: A$2, alt: "Receber" })], 8, ["onClick"]), createVNode("div", { class: { disabled: !e4.btn_editar }, onClick: (t5) => e4.btn_editar ? a2.redirectToUpdate(e4.id) : null, title: e4.btn_editar ? "Editar" : "Desabilitado" }, [createVNode("img", { style: { cursor: e4.btn_editar ? "pointer" : "default", width: "30px", height: "30px" }, src: B, alt: "Editar" }, null, 4)], 10, ["onClick", "title"]), createVNode("div", { disabled: !e4.btn_cancelar, onClick: (t5) => e4.btn_cancelar ? a2.deleteEndereco(e4) : null, title: "Excluir" }, [e4.excluido ? (openBlock(), createBlock("img", { key: 0, style: { width: "30px", height: "30px", cursor: "pointer" }, src: g$1, alt: "Visualizar", title: "Reativar" })) : (openBlock(), createBlock("img", { key: 1, src: a, alt: "Excluir", class: "trash-icon", style: { width: "30px", height: "30px", cursor: "pointer" }, title: "Excluir" }))], 8, ["disabled", "onClick"])]), _: 2 }, 1024)];
          t4(ssrRenderComponent($, { style: { display: "flex", gap: "10px", "margin-top": "-5px" } }, { default: withCtx((t5, r6, l6, o3) => {
            if (!r6)
              return [createVNode("div", { onClick: (t6) => he(e4.token), title: "Receber" }, [createVNode("img", { style: { width: "30px", height: "30px", cursor: "pointer" }, src: A$2, alt: "Receber" })], 8, ["onClick"]), createVNode("div", { class: { disabled: !e4.btn_editar }, onClick: (t6) => e4.btn_editar ? a2.redirectToUpdate(e4.id) : null, title: e4.btn_editar ? "Editar" : "Desabilitado" }, [createVNode("img", { style: { cursor: e4.btn_editar ? "pointer" : "default", width: "30px", height: "30px" }, src: B, alt: "Editar" }, null, 4)], 10, ["onClick", "title"]), createVNode("div", { disabled: !e4.btn_cancelar, onClick: (t6) => e4.btn_cancelar ? a2.deleteEndereco(e4) : null, title: "Excluir" }, [e4.excluido ? (openBlock(), createBlock("img", { key: 0, style: { width: "30px", height: "30px", cursor: "pointer" }, src: g$1, alt: "Visualizar", title: "Reativar" })) : (openBlock(), createBlock("img", { key: 1, src: a, alt: "Excluir", class: "trash-icon", style: { width: "30px", height: "30px", cursor: "pointer" }, title: "Excluir" }))], 8, ["disabled", "onClick"])];
            r6(`<div title="Receber"${o3}><img style="${ssrRenderStyle({ width: "30px", height: "30px", cursor: "pointer" })}"${ssrRenderAttr("src", A$2)} alt="Receber"${o3}></div><div class="${ssrRenderClass({ disabled: !e4.btn_editar })}"${ssrRenderAttr("title", e4.btn_editar ? "Editar" : "Desabilitado")}${o3}><img style="${ssrRenderStyle({ cursor: e4.btn_editar ? "pointer" : "default", width: "30px", height: "30px" })}"${ssrRenderAttr("src", B)} alt="Editar"${o3}></div><div${ssrIncludeBooleanAttr(!e4.btn_cancelar) ? " disabled" : ""} title="Excluir"${o3}>`), e4.excluido ? r6(`<img style="${ssrRenderStyle({ width: "30px", height: "30px", cursor: "pointer" })}"${ssrRenderAttr("src", g$1)} alt="Visualizar" title="Reativar"${o3}>`) : r6(`<img${ssrRenderAttr("src", a)} alt="Excluir" class="trash-icon" style="${ssrRenderStyle({ width: "30px", height: "30px", cursor: "pointer" })}" title="Excluir"${o3}>`), r6("</div>");
          }), _: 2 }, r5, l5));
        }), _: 1 }, r4, l4)), t3(ssrRenderComponent(d2, { show: unref(oe), ato_token: unref(ie), onClose: (e4) => oe.value = false }, null, r4, l4));
      }), _: 1 }, r3, l3)), t2(ssrRenderComponent(s2, { to: "/ordens-servicos" }, { default: withCtx((e3, t3, a3, r4) => {
        if (!t3)
          return [createVNode("img", { class: "btn-pointer mt-5", src: A$3, alt: "Sair" })];
        t3(`<img class="btn-pointer mt-5"${ssrRenderAttr("src", A$3)} alt="Sair"${r4}>`);
      }), _: 1 }, r3, l3));
    }), _: 1 }, l2));
  };
} }, M = K.setup;
K.setup = (e2, t2) => {
  const a2 = useSSRContext();
  return (a2.modules || (a2.modules = /* @__PURE__ */ new Set())).add("pages/ordens-servicos/atualizar/[id].vue"), M ? M(e2, t2) : void 0;
};

export { K as default };
//# sourceMappingURL=_id_-C943dOmc.mjs.map
