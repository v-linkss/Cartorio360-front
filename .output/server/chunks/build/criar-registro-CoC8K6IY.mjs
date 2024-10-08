import { g as g$2 } from './nuxt-link-P_iIRbMa.mjs';
import { R } from './Selos-DP5pidWu.mjs';
import { f as Ue, b as Ye, d as Ct, e as is, at as Dc } from './server.mjs';
import { ref, reactive, withAsyncContext, resolveDirective, mergeProps, withCtx, createVNode, toDisplayString, unref, withDirectives, openBlock, createBlock, createCommentVNode, useSSRContext } from 'vue';
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
import { L as L$1 } from './VAutocomplete-yDrVnvO6.mjs';
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

const L = { __name: "criar-registro", __ssrInlineRender: true, async setup(b2) {
  var L2, G2, H, M;
  let J, Q;
  const { $toast: Y } = Ue(), K = Ye(), W = `${K.public.managemant}/createOrdensServico`, X = `${K.public.managemant}/validarCpf`, Z = `${K.public.managemant}/listarAtos`, ee = ref(Ct("user-data").value.cartorio_id), ae = ref(Ct("user-data").value.usuario_id), te = ref(null == (L2 = Ct("user-service").value) ? void 0 : L2.token).value || null, re = ref(Ct("user-data").value.cartorio_token).value;
  let le = ref(!!(null == (G2 = Ct("user-service").value) ? void 0 : G2.numero)), oe = ref(Ct("ordem-button").value), ie = false;
  const ne = ref(false), se = ref([]), ue = reactive({ nacionalidade: "brasileiro", apresentante_nome: null == (H = Ct("user-service").value) ? void 0 : H.apresentante_nome, apresentante_cpf: null == (M = Ct("user-service").value) ? void 0 : M.apresentante_cpf, documento: null }), de = [{ title: "Protocolo", value: "protocolo" }, { title: "Usuario", value: "usuario_nome" }, { title: "Situa\xE7\xE3o", value: "situacao" }, { title: "Valor", value: "valor" }, { title: "Tipo", value: "tipo" }, { value: "actions" }], pe = [{ title: "BRASILEIRO", value: "brasileiro" }, { title: "ESTRANGEIRO", value: "estrangeiro" }], ce = { apresentante_nome: { required: helpers.withMessage("O campo \xE9 obrigatorio", required) }, apresentante_cpf: { required: helpers.withMessage("O campo \xE9 obrigatorio", required) } }, me = useVuelidate(ce, ue);
  function fe(e2) {
    if (e2)
      return e2.replace(/[.\-]/g, "");
    e2 = null;
  }
  function _e() {
    const e2 = Ct("user-service"), a2 = Ct("ordem-button");
    e2.value = null, a2.value = null;
  }
  const he = () => {
    ne.value = true;
  };
  async function ve() {
    const e2 = { apresentante_cpf: fe(ue.apresentante_cpf), apresentante_nome: ue.apresentante_nome, user_id: ae.value, cartorio_id: ee.value };
    if (await me.value.$validate()) {
      const { data: a2, error: t2, status: l2 } = await g(W, { method: "POST", body: e2 }, "$omLGvLxYlw");
      if ("error" === l2.value && 500 === t2.value.statusCode)
        Y.error("Erro ao cadastrar ordem,erro no sistema.");
      else {
        Y.success("Ordem registrada com sucesso!"), le.value = true, oe.value = false;
        Ct("ordem-button").value = oe.value;
        const e3 = Ct("user-service");
        e3.value = e3.value = JSON.stringify({ numero: a2.value.numero, apresentante_cpf: a2.value.apresentante_cpf, apresentante_nome: a2.value.apresentante_nome, token: a2.value.token });
      }
    }
  }
  async function ge(e2) {
    const a2 = fe(e2);
    if (11 === a2.length && !ie) {
      ie = true;
      const e3 = { cpf: a2 };
      try {
        const { data: a3, error: t2, status: r2 } = await g(X, { method: "POST", body: e3 }, "$e6ybTA3ect");
        "error" === r2.value && 500 === t2.value.statusCode ? Y.error("Erro ao cadastrar pessoa, o CPF j\xE1 est\xE1 cadastrado.") : true === a3.value.cpfValidation ? (ue.apresentante_nome = a3.value.nome, Y.success("Cpf autenticado com sucesso!")) : false === a3.value.cpfValidation && Y.error("Cpf n\xE3o cadastrado!");
      } catch (t2) {
        console.error("Erro ao validar CPF:", t2);
      } finally {
        ie = false;
      }
    }
  }
  const { data: xe } = ([J, Q] = withAsyncContext(() => g(Z, { method: "POST", body: { cartorio_token: re, ordemserv_token: te } }, "$Q1qkHbHde0")), J = await J, Q(), J);
  return xe.value.length > 0 ? se.value = xe.value : se.value = [], (t2, i2, n2, s2) => {
    const u2 = g$2, b3 = R, y2 = resolveDirective("mask");
    i2(ssrRenderComponent(i, mergeProps({ class: "mt-5" }, s2), { default: withCtx((e2, a2, i3, n3) => {
      if (!a2)
        return [createVNode($, { class: "mb-5" }, { default: withCtx(() => {
          var e3;
          return [createVNode("h1", null, "Ordem de Servi\xE7o n\xBA"), createVNode("h1", { style: { color: "red", "margin-left": "30px" } }, toDisplayString(null == (e3 = ("useCookie" in t2 ? t2.useCookie : unref(Ct))("user-service").value) ? void 0 : e3.numero), 1)];
        }), _: 1 }), createVNode($, null, { default: withCtx(() => [createVNode(y, { md: "3" }, { default: withCtx(() => [createVNode(L$1, { label: "Nacionalidade", items: pe, modelValue: unref(ue).nacionalidade, "onUpdate:modelValue": (e3) => unref(ue).nacionalidade = e3 }, null, 8, ["modelValue", "onUpdate:modelValue"])]), _: 1 }), createVNode(y, { md: "2" }, { default: withCtx(() => ["brasileiro" === unref(ue).nacionalidade ? withDirectives((openBlock(), createBlock(is, { key: 0, autofocus: "", modelValue: unref(ue).apresentante_cpf, "onUpdate:modelValue": (e3) => unref(ue).apresentante_cpf = e3, label: "CPF", required: "", "error-messages": unref(me).apresentante_cpf.$errors.map((e3) => e3.$message), onBlur: unref(me).apresentante_cpf.$touch, onInput: (e3) => ge(unref(ue).apresentante_cpf) }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages", "onBlur", "onInput"])), [[y2, "###.###.###-##"]]) : (openBlock(), createBlock(is, { key: 1, autofocus: "", modelValue: unref(ue).apresentante_cpf, "onUpdate:modelValue": (e3) => unref(ue).apresentante_cpf = e3, label: "Documento", required: "", "error-messages": unref(me).apresentante_cpf.$errors.map((e3) => e3.$message), onBlur: unref(me).apresentante_cpf.$touch }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages", "onBlur"]))]), _: 1 }), createVNode(y, { md: "4" }, { default: withCtx(() => [createVNode(is, { modelValue: unref(ue).apresentante_nome, "onUpdate:modelValue": (e3) => unref(ue).apresentante_nome = e3, label: "Nome Apresentante", required: "", "error-messages": unref(me).apresentante_nome.$errors.map((e3) => e3.$message), onInput: unref(me).apresentante_nome.$touch }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages", "onInput"])]), _: 1 }), unref(oe) ? (openBlock(), createBlock(y, { key: 0 }, { default: withCtx(() => [createVNode("div", null, [createVNode("img", { style: { width: "40px", height: "40px", cursor: "pointer" }, src: A, alt: "Salvar", onClick: (e3) => ve() }, null, 8, ["onClick"])])]), _: 1 })) : createCommentVNode("", true)]), _: 1 }), unref(le) ? (openBlock(), createBlock($, { key: 0, style: { display: "flex", "margin-bottom": "10px", gap: "2rem" } }, { default: withCtx(() => [createVNode("h1", { class: "ml-5" }, "Atos"), createVNode(u2, { to: { path: "/ordens-servicos/criar-ato", query: { origem: "criar" } } }, { default: withCtx(() => [createVNode("img", { style: { width: "45px", height: "45px", cursor: "pointer" }, src: A$1, alt: "novo" })]), _: 1 }), createVNode(Dc, { headers: de, items: unref(se), "item-key": "id" }, { "item.actions": withCtx(({ item: e3 }) => [createVNode($, { style: { display: "flex", gap: "10px", "margin-top": "-5px" } }, { default: withCtx(() => [createVNode("div", { onClick: (e4) => he(), title: "Reimprimir" }, [createVNode("img", { style: { width: "30px", height: "30px", cursor: "pointer" }, src: A$2, alt: "Reimprimir" })], 8, ["onClick"]), createVNode("div", { class: { disabled: !e3.btn_editar }, onClick: (a3) => e3.btn_editar ? t2.redirectToUpdate(e3.id) : null, title: e3.btn_editar ? "Editar" : "Desabilitado" }, [createVNode("img", { style: { cursor: e3.btn_editar ? "pointer" : "default", width: "30px", height: "30px" }, src: B, alt: "Editar" }, null, 4)], 10, ["onClick", "title"]), createVNode("div", { disabled: !e3.btn_cancelar, onClick: (a3) => e3.btn_cancelar ? t2.deleteEndereco(e3) : null, title: "Excluir" }, [e3.excluido ? (openBlock(), createBlock("img", { key: 0, style: { width: "30px", height: "30px", cursor: "pointer" }, src: g$1, alt: "Visualizar", title: "Reativar" })) : (openBlock(), createBlock("img", { key: 1, src: a, alt: "Excluir", class: "trash-icon", style: { width: "30px", height: "30px", cursor: "pointer" }, title: "Excluir" }))], 8, ["disabled", "onClick"])]), _: 2 }, 1024)]), _: 1 }, 8, ["items"]), createVNode(b3, { show: unref(ne), onClose: (e3) => ne.value = false }, null, 8, ["show", "onClose"])]), _: 1 })) : createCommentVNode("", true), createVNode(u2, { to: "/ordens-servicos" }, { default: withCtx(() => [createVNode("img", { class: "btn-pointer mt-5", src: A$3, alt: "Sair", onClick: _e })]), _: 1 })];
      a2(ssrRenderComponent($, { class: "mb-5" }, { default: withCtx((e3, a3, l2, o2) => {
        var i4, n4;
        if (!a3)
          return [createVNode("h1", null, "Ordem de Servi\xE7o n\xBA"), createVNode("h1", { style: { color: "red", "margin-left": "30px" } }, toDisplayString(null == (n4 = ("useCookie" in t2 ? t2.useCookie : unref(Ct))("user-service").value) ? void 0 : n4.numero), 1)];
        a3(`<h1${o2}>Ordem de Servi\xE7o n\xBA</h1><h1 style="${ssrRenderStyle({ color: "red", "margin-left": "30px" })}"${o2}>${ssrInterpolate(null == (i4 = ("useCookie" in t2 ? t2.useCookie : unref(Ct))("user-service").value) ? void 0 : i4.numero)}</h1>`);
      }), _: 1 }, i3, n3)), a2(ssrRenderComponent($, null, { default: withCtx((e3, a3, r2, o2) => {
        if (!a3)
          return [createVNode(y, { md: "3" }, { default: withCtx(() => [createVNode(L$1, { label: "Nacionalidade", items: pe, modelValue: unref(ue).nacionalidade, "onUpdate:modelValue": (e4) => unref(ue).nacionalidade = e4 }, null, 8, ["modelValue", "onUpdate:modelValue"])]), _: 1 }), createVNode(y, { md: "2" }, { default: withCtx(() => ["brasileiro" === unref(ue).nacionalidade ? withDirectives((openBlock(), createBlock(is, { key: 0, autofocus: "", modelValue: unref(ue).apresentante_cpf, "onUpdate:modelValue": (e4) => unref(ue).apresentante_cpf = e4, label: "CPF", required: "", "error-messages": unref(me).apresentante_cpf.$errors.map((e4) => e4.$message), onBlur: unref(me).apresentante_cpf.$touch, onInput: (e4) => ge(unref(ue).apresentante_cpf) }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages", "onBlur", "onInput"])), [[y2, "###.###.###-##"]]) : (openBlock(), createBlock(is, { key: 1, autofocus: "", modelValue: unref(ue).apresentante_cpf, "onUpdate:modelValue": (e4) => unref(ue).apresentante_cpf = e4, label: "Documento", required: "", "error-messages": unref(me).apresentante_cpf.$errors.map((e4) => e4.$message), onBlur: unref(me).apresentante_cpf.$touch }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages", "onBlur"]))]), _: 1 }), createVNode(y, { md: "4" }, { default: withCtx(() => [createVNode(is, { modelValue: unref(ue).apresentante_nome, "onUpdate:modelValue": (e4) => unref(ue).apresentante_nome = e4, label: "Nome Apresentante", required: "", "error-messages": unref(me).apresentante_nome.$errors.map((e4) => e4.$message), onInput: unref(me).apresentante_nome.$touch }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages", "onInput"])]), _: 1 }), unref(oe) ? (openBlock(), createBlock(y, { key: 0 }, { default: withCtx(() => [createVNode("div", null, [createVNode("img", { style: { width: "40px", height: "40px", cursor: "pointer" }, src: A, alt: "Salvar", onClick: (e4) => ve() }, null, 8, ["onClick"])])]), _: 1 })) : createCommentVNode("", true)];
        a3(ssrRenderComponent(y, { md: "3" }, { default: withCtx((e4, a4, t3, r3) => {
          if (!a4)
            return [createVNode(L$1, { label: "Nacionalidade", items: pe, modelValue: unref(ue).nacionalidade, "onUpdate:modelValue": (e5) => unref(ue).nacionalidade = e5 }, null, 8, ["modelValue", "onUpdate:modelValue"])];
          a4(ssrRenderComponent(L$1, { label: "Nacionalidade", items: pe, modelValue: unref(ue).nacionalidade, "onUpdate:modelValue": (e5) => unref(ue).nacionalidade = e5 }, null, t3, r3));
        }), _: 1 }, r2, o2)), a3(ssrRenderComponent(y, { md: "2" }, { default: withCtx((e4, a4, r3, o3) => {
          if (!a4)
            return ["brasileiro" === unref(ue).nacionalidade ? withDirectives((openBlock(), createBlock(is, { key: 0, autofocus: "", modelValue: unref(ue).apresentante_cpf, "onUpdate:modelValue": (e5) => unref(ue).apresentante_cpf = e5, label: "CPF", required: "", "error-messages": unref(me).apresentante_cpf.$errors.map((e5) => e5.$message), onBlur: unref(me).apresentante_cpf.$touch, onInput: (e5) => ge(unref(ue).apresentante_cpf) }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages", "onBlur", "onInput"])), [[y2, "###.###.###-##"]]) : (openBlock(), createBlock(is, { key: 1, autofocus: "", modelValue: unref(ue).apresentante_cpf, "onUpdate:modelValue": (e5) => unref(ue).apresentante_cpf = e5, label: "Documento", required: "", "error-messages": unref(me).apresentante_cpf.$errors.map((e5) => e5.$message), onBlur: unref(me).apresentante_cpf.$touch }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages", "onBlur"]))];
          "brasileiro" === unref(ue).nacionalidade ? a4(ssrRenderComponent(is, mergeProps({ autofocus: "", modelValue: unref(ue).apresentante_cpf, "onUpdate:modelValue": (e5) => unref(ue).apresentante_cpf = e5, label: "CPF", required: "", "error-messages": unref(me).apresentante_cpf.$errors.map((e5) => e5.$message), onBlur: unref(me).apresentante_cpf.$touch, onInput: (e5) => ge(unref(ue).apresentante_cpf) }, ssrGetDirectiveProps(t2, y2, "###.###.###-##")), null, r3, o3)) : a4(ssrRenderComponent(is, { autofocus: "", modelValue: unref(ue).apresentante_cpf, "onUpdate:modelValue": (e5) => unref(ue).apresentante_cpf = e5, label: "Documento", required: "", "error-messages": unref(me).apresentante_cpf.$errors.map((e5) => e5.$message), onBlur: unref(me).apresentante_cpf.$touch }, null, r3, o3));
        }), _: 1 }, r2, o2)), a3(ssrRenderComponent(y, { md: "4" }, { default: withCtx((e4, a4, t3, r3) => {
          if (!a4)
            return [createVNode(is, { modelValue: unref(ue).apresentante_nome, "onUpdate:modelValue": (e5) => unref(ue).apresentante_nome = e5, label: "Nome Apresentante", required: "", "error-messages": unref(me).apresentante_nome.$errors.map((e5) => e5.$message), onInput: unref(me).apresentante_nome.$touch }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages", "onInput"])];
          a4(ssrRenderComponent(is, { modelValue: unref(ue).apresentante_nome, "onUpdate:modelValue": (e5) => unref(ue).apresentante_nome = e5, label: "Nome Apresentante", required: "", "error-messages": unref(me).apresentante_nome.$errors.map((e5) => e5.$message), onInput: unref(me).apresentante_nome.$touch }, null, t3, r3));
        }), _: 1 }, r2, o2)), unref(oe) ? a3(ssrRenderComponent(y, null, { default: withCtx((e4, a4, t3, r3) => {
          if (!a4)
            return [createVNode("div", null, [createVNode("img", { style: { width: "40px", height: "40px", cursor: "pointer" }, src: A, alt: "Salvar", onClick: (e5) => ve() }, null, 8, ["onClick"])])];
          a4(`<div${r3}><img style="${ssrRenderStyle({ width: "40px", height: "40px", cursor: "pointer" })}"${ssrRenderAttr("src", A)} alt="Salvar"${r3}></div>`);
        }), _: 1 }, r2, o2)) : a3("<!---->");
      }), _: 1 }, i3, n3)), unref(le) ? a2(ssrRenderComponent($, { style: { display: "flex", "margin-bottom": "10px", gap: "2rem" } }, { default: withCtx((e3, a3, r2, l2) => {
        if (!a3)
          return [createVNode("h1", { class: "ml-5" }, "Atos"), createVNode(u2, { to: { path: "/ordens-servicos/criar-ato", query: { origem: "criar" } } }, { default: withCtx(() => [createVNode("img", { style: { width: "45px", height: "45px", cursor: "pointer" }, src: A$1, alt: "novo" })]), _: 1 }), createVNode(Dc, { headers: de, items: unref(se), "item-key": "id" }, { "item.actions": withCtx(({ item: e4 }) => [createVNode($, { style: { display: "flex", gap: "10px", "margin-top": "-5px" } }, { default: withCtx(() => [createVNode("div", { onClick: (e5) => he(), title: "Reimprimir" }, [createVNode("img", { style: { width: "30px", height: "30px", cursor: "pointer" }, src: A$2, alt: "Reimprimir" })], 8, ["onClick"]), createVNode("div", { class: { disabled: !e4.btn_editar }, onClick: (a4) => e4.btn_editar ? t2.redirectToUpdate(e4.id) : null, title: e4.btn_editar ? "Editar" : "Desabilitado" }, [createVNode("img", { style: { cursor: e4.btn_editar ? "pointer" : "default", width: "30px", height: "30px" }, src: B, alt: "Editar" }, null, 4)], 10, ["onClick", "title"]), createVNode("div", { disabled: !e4.btn_cancelar, onClick: (a4) => e4.btn_cancelar ? t2.deleteEndereco(e4) : null, title: "Excluir" }, [e4.excluido ? (openBlock(), createBlock("img", { key: 0, style: { width: "30px", height: "30px", cursor: "pointer" }, src: g$1, alt: "Visualizar", title: "Reativar" })) : (openBlock(), createBlock("img", { key: 1, src: a, alt: "Excluir", class: "trash-icon", style: { width: "30px", height: "30px", cursor: "pointer" }, title: "Excluir" }))], 8, ["disabled", "onClick"])]), _: 2 }, 1024)]), _: 1 }, 8, ["items"]), createVNode(b3, { show: unref(ne), onClose: (e4) => ne.value = false }, null, 8, ["show", "onClose"])];
        a3(`<h1 class="ml-5"${l2}>Atos</h1>`), a3(ssrRenderComponent(u2, { to: { path: "/ordens-servicos/criar-ato", query: { origem: "criar" } } }, { default: withCtx((e4, a4, t3, r3) => {
          if (!a4)
            return [createVNode("img", { style: { width: "45px", height: "45px", cursor: "pointer" }, src: A$1, alt: "novo" })];
          a4(`<img style="${ssrRenderStyle({ width: "45px", height: "45px", cursor: "pointer" })}"${ssrRenderAttr("src", A$1)} alt="novo"${r3}>`);
        }), _: 1 }, r2, l2)), a3(ssrRenderComponent(Dc, { headers: de, items: unref(se), "item-key": "id" }, { "item.actions": withCtx(({ item: e4 }, a4, r3, l3) => {
          if (!a4)
            return [createVNode($, { style: { display: "flex", gap: "10px", "margin-top": "-5px" } }, { default: withCtx(() => [createVNode("div", { onClick: (e5) => he(), title: "Reimprimir" }, [createVNode("img", { style: { width: "30px", height: "30px", cursor: "pointer" }, src: A$2, alt: "Reimprimir" })], 8, ["onClick"]), createVNode("div", { class: { disabled: !e4.btn_editar }, onClick: (a5) => e4.btn_editar ? t2.redirectToUpdate(e4.id) : null, title: e4.btn_editar ? "Editar" : "Desabilitado" }, [createVNode("img", { style: { cursor: e4.btn_editar ? "pointer" : "default", width: "30px", height: "30px" }, src: B, alt: "Editar" }, null, 4)], 10, ["onClick", "title"]), createVNode("div", { disabled: !e4.btn_cancelar, onClick: (a5) => e4.btn_cancelar ? t2.deleteEndereco(e4) : null, title: "Excluir" }, [e4.excluido ? (openBlock(), createBlock("img", { key: 0, style: { width: "30px", height: "30px", cursor: "pointer" }, src: g$1, alt: "Visualizar", title: "Reativar" })) : (openBlock(), createBlock("img", { key: 1, src: a, alt: "Excluir", class: "trash-icon", style: { width: "30px", height: "30px", cursor: "pointer" }, title: "Excluir" }))], 8, ["disabled", "onClick"])]), _: 2 }, 1024)];
          a4(ssrRenderComponent($, { style: { display: "flex", gap: "10px", "margin-top": "-5px" } }, { default: withCtx((a5, r4, l4, o2) => {
            if (!r4)
              return [createVNode("div", { onClick: (e5) => he(), title: "Reimprimir" }, [createVNode("img", { style: { width: "30px", height: "30px", cursor: "pointer" }, src: A$2, alt: "Reimprimir" })], 8, ["onClick"]), createVNode("div", { class: { disabled: !e4.btn_editar }, onClick: (a6) => e4.btn_editar ? t2.redirectToUpdate(e4.id) : null, title: e4.btn_editar ? "Editar" : "Desabilitado" }, [createVNode("img", { style: { cursor: e4.btn_editar ? "pointer" : "default", width: "30px", height: "30px" }, src: B, alt: "Editar" }, null, 4)], 10, ["onClick", "title"]), createVNode("div", { disabled: !e4.btn_cancelar, onClick: (a6) => e4.btn_cancelar ? t2.deleteEndereco(e4) : null, title: "Excluir" }, [e4.excluido ? (openBlock(), createBlock("img", { key: 0, style: { width: "30px", height: "30px", cursor: "pointer" }, src: g$1, alt: "Visualizar", title: "Reativar" })) : (openBlock(), createBlock("img", { key: 1, src: a, alt: "Excluir", class: "trash-icon", style: { width: "30px", height: "30px", cursor: "pointer" }, title: "Excluir" }))], 8, ["disabled", "onClick"])];
            r4(`<div title="Reimprimir"${o2}><img style="${ssrRenderStyle({ width: "30px", height: "30px", cursor: "pointer" })}"${ssrRenderAttr("src", A$2)} alt="Reimprimir"${o2}></div><div class="${ssrRenderClass({ disabled: !e4.btn_editar })}"${ssrRenderAttr("title", e4.btn_editar ? "Editar" : "Desabilitado")}${o2}><img style="${ssrRenderStyle({ cursor: e4.btn_editar ? "pointer" : "default", width: "30px", height: "30px" })}"${ssrRenderAttr("src", B)} alt="Editar"${o2}></div><div${ssrIncludeBooleanAttr(!e4.btn_cancelar) ? " disabled" : ""} title="Excluir"${o2}>`), e4.excluido ? r4(`<img style="${ssrRenderStyle({ width: "30px", height: "30px", cursor: "pointer" })}"${ssrRenderAttr("src", g$1)} alt="Visualizar" title="Reativar"${o2}>`) : r4(`<img${ssrRenderAttr("src", a)} alt="Excluir" class="trash-icon" style="${ssrRenderStyle({ width: "30px", height: "30px", cursor: "pointer" })}" title="Excluir"${o2}>`), r4("</div>");
          }), _: 2 }, r3, l3));
        }), _: 1 }, r2, l2)), a3(ssrRenderComponent(b3, { show: unref(ne), onClose: (e4) => ne.value = false }, null, r2, l2));
      }), _: 1 }, i3, n3)) : a2("<!---->"), a2(ssrRenderComponent(u2, { to: "/ordens-servicos" }, { default: withCtx((e3, a3, t3, r2) => {
        if (!a3)
          return [createVNode("img", { class: "btn-pointer mt-5", src: A$3, alt: "Sair", onClick: _e })];
        a3(`<img class="btn-pointer mt-5"${ssrRenderAttr("src", A$3)} alt="Sair"${r2}>`);
      }), _: 1 }, i3, n3));
    }), _: 1 }, n2));
  };
} }, G = L.setup;
L.setup = (e2, a2) => {
  const t2 = useSSRContext();
  return (t2.modules || (t2.modules = /* @__PURE__ */ new Set())).add("pages/ordens-servicos/criar-registro.vue"), G ? G(e2, a2) : void 0;
};

export { L as default };
//# sourceMappingURL=criar-registro-CoC8K6IY.mjs.map
