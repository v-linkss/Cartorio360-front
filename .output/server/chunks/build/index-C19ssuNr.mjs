import { g as g$1 } from './nuxt-link-P_iIRbMa.mjs';
import { _ as jc, u as Ze, f as Ue, b as Ye, d as Ct, au as Lo, e as is } from './server.mjs';
import { ref, reactive, mergeProps, withCtx, createVNode, unref, isRef, createTextVNode, openBlock, createBlock, createCommentVNode, useSSRContext, withAsyncContext, resolveDirective, withDirectives } from 'vue';
import { v, g } from './fetch-D2ZU2xOO.mjs';
import { ssrRenderComponent, ssrRenderStyle, ssrInterpolate, ssrGetDirectiveProps, ssrRenderAttr } from 'vue/server-renderer';
import { A } from './sair-ToPptOUL.mjs';
import { A as A$1 } from './salvar-37abXc2X.mjs';
import { useVuelidate } from '@vuelidate/core';
import { helpers, required } from '@vuelidate/validators';
import { i } from './VContainer-Dwlw6VVY.mjs';
import { $ } from './VRow-Ca2v9sIW.mjs';
import { y } from './VCol-CrrHdFZ4.mjs';
import { L } from './VAutocomplete-yDrVnvO6.mjs';
import { A as Al, $ as $l, I as Il, B as Bl, D as Dl, N as Nl, G as Gl, e as ea } from './Restricoes-B1mU28cL.mjs';
import { o as oe } from './VCard-zlRMnW-z.mjs';
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
import './formatDate-Dt3m51Lf.mjs';
import './mudarStatus-COPzM8_6.mjs';

const r = helpers.withMessage("CPF inv\xE1lido", (t2) => {
  if (!t2)
    return false;
  const r2 = t2.replace(/[^\d]+/g, "");
  if (11 !== r2.length)
    return false;
  if (/^(\d)\1+$/.test(r2))
    return false;
  let e = 0;
  for (let n = 0; n < 9; n++)
    e += parseInt(r2.charAt(n)) * (10 - n);
  let a = 11 - e % 11;
  if (10 !== a && 11 !== a || (a = 0), a !== parseInt(r2.charAt(9)))
    return false;
  e = 0;
  for (let n = 0; n < 10; n++)
    e += parseInt(r2.charAt(n)) * (11 - n);
  return a = 11 - e % 11, 10 !== a && 11 !== a || (a = 0), a === parseInt(r2.charAt(10));
});

const X = { __name: "Dados", __ssrInlineRender: true, emits: ["saved"], async setup(a2, { emit: v2 }) {
  let b2, U2;
  const C2 = v2, g2 = Ze(), { $toast: $2 } = Ue(), F2 = Ye(), R2 = `${F2.public.managemant}/createPessoa`, T2 = `${F2.public.managemant}/updatePessoa`, L2 = `${F2.public.managemant}/listarEstadoCivil`, O2 = `${F2.public.managemant}/listarCapacidadeCivil`, z2 = `${F2.public.managemant}/listarCidades`, G2 = { nome: "", nome_pai: "", nome_mae: "", profissao: "", local_trabalho: "", data_nascimento: "", doc_identificacao: "", cpf_pai: "", cpf_mae: "", tipo_pessoa: "FISICA", tabvalores_estadocivil_id: "", tabvalores_capacidadecivil_id: "", cidade_natural_id: "", cartorio_id: Ct("user-data").value.cartorio_id, user_id: Ct("user-data").value.usuario_id }, H2 = ref(false), J2 = Ct("pessoa-id"), W2 = reactive({ ...G2 });
  function X2(e2) {
    if (e2)
      return e2.replace(/[.\-]/g, "");
    e2 = null;
  }
  const { data: Y2, status: Z2, pending: K2, error: Q2 } = ([b2, U2] = withAsyncContext(async () => v("cliente-dados", async () => {
    const [e2, a3, l2] = await Promise.all([$fetch(L2), $fetch(O2), $fetch(z2)]);
    return { estadoCivilItems: e2, capacidadeCivilItems: a3, cidadeNascimentoItems: l2 };
  })), b2 = await b2, U2(), b2), ee = { nome: { required: helpers.withMessage("O campo \xE9 obrigatorio", required) }, nome_mae: { required: helpers.withMessage("O campo \xE9 obrigatorio", required) }, doc_identificacao: { required: helpers.withMessage("O campo \xE9 obrigatorio", required), cpf: r } }, ae = useVuelidate(ee, W2);
  async function le() {
    if (await ae.value.$validate()) {
      const e2 = { ...W2 };
      for (const t2 in e2)
        "" === e2[t2] && (e2[t2] = null);
      const a3 = { ...e2, doc_identificacao: X2(W2.doc_identificacao), cpf_pai: X2(W2.cpf_pai), cpf_mae: X2(W2.cpf_mae) }, { data: l2, error: o2, status: d2 } = await g(R2, { method: "POST", body: a3 }, "$fcbWHpl5XR");
      if ("error" === d2.value && 500 === o2.value.statusCode)
        $2.error("Erro ao cadastrar pessoa,o CPF j\xE1 est\xE1 cadastrado.");
      else {
        $2.success("Pessoa cadastrada com sucesso!");
        const e3 = l2.value.id;
        J2.value = e3, C2("saved"), H2.value = true;
      }
    } else
      $2.error("Erro ao cadastrar pessoa, preencha os campos obrigatorios.");
  }
  async function oe() {
    const e2 = { ...W2 };
    for (const l2 in e2)
      "" === e2[l2] && (e2[l2] = null);
    const a3 = { ...e2, doc_identificacao: X2(W2.doc_identificacao), cpf_mae: X2(W2.cpf_mae) };
    await g(`${T2}/${J2.value}`, { method: "PUT", body: a3 }, "$S30ZRYxneo"), $2.success("Pessoa atualizada com sucesso!"), g2.push("/pessoas/registros");
  }
  return (a3, l2, o2, d2) => {
    const u2 = g$1, m2 = resolveDirective("mask");
    l2("<!--[-->"), unref(K2) ? l2(ssrRenderComponent(Lo, { class: "loading-spinner", indeterminate: "", size: "64" }, null, o2)) : unref(Q2) ? l2(`<div data-v-72971175>${ssrInterpolate(unref(Q2).message)}</div>`) : l2("<!---->"), unref(K2) ? l2("<!---->") : l2(ssrRenderComponent(i, { class: "mt-5" }, { default: withCtx((e2, l3, o3, d3) => {
      if (!l3)
        return [createVNode($, null, { default: withCtx(() => [createVNode(y, { cols: "12", md: "8" }, { default: withCtx(() => [createVNode(is, { modelValue: unref(W2).nome, "onUpdate:modelValue": (e3) => unref(W2).nome = e3, "error-messages": unref(ae).nome.$errors.map((e3) => e3.$message), label: "Nome", required: "", onBlur: unref(ae).nome.$touch, onInput: unref(ae).nome.$touch }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages", "onBlur", "onInput"])]), _: 1 }), createVNode(y, { cols: "12", md: "4" }, { default: withCtx(() => [withDirectives(createVNode(is, { modelValue: unref(W2).doc_identificacao, "onUpdate:modelValue": (e3) => unref(W2).doc_identificacao = e3, "error-messages": unref(ae).doc_identificacao.$errors.map((e3) => e3.$message), label: "CPF", required: "", onBlur: unref(ae).doc_identificacao.$touch, onInput: unref(ae).doc_identificacao.$touch }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages", "onBlur", "onInput"]), [[m2, "###.###.###-##"]])]), _: 1 })]), _: 1 }), createVNode($, null, { default: withCtx(() => [createVNode(y, { cols: "12", md: "4" }, { default: withCtx(() => [createVNode(L, { modelValue: unref(W2).tabvalores_estadocivil_id, "onUpdate:modelValue": (e3) => unref(W2).tabvalores_estadocivil_id = e3, items: unref(Y2).estadoCivilItems, "item-title": "descricao", "item-value": "id", label: "Estado Civil" }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])]), _: 1 }), createVNode(y, { cols: "12", md: "4" }, { default: withCtx(() => [createVNode(is, { modelValue: unref(W2).profissao, "onUpdate:modelValue": (e3) => unref(W2).profissao = e3, label: "Profiss\xE3o" }, null, 8, ["modelValue", "onUpdate:modelValue"])]), _: 1 }), createVNode(y, { cols: "12", md: "4" }, { default: withCtx(() => [createVNode(is, { modelValue: unref(W2).local_trabalho, "onUpdate:modelValue": (e3) => unref(W2).local_trabalho = e3, label: "Local de trabalho" }, null, 8, ["modelValue", "onUpdate:modelValue"])]), _: 1 })]), _: 1 }), createVNode($, null, { default: withCtx(() => [createVNode(y, { cols: "12", md: "4" }, { default: withCtx(() => [createVNode(is, { modelValue: unref(W2).data_nascimento, "onUpdate:modelValue": (e3) => unref(W2).data_nascimento = e3, type: "date", "prepend-icon": "", label: "Data de nascimento" }, null, 8, ["modelValue", "onUpdate:modelValue"])]), _: 1 }), createVNode(y, { cols: "12", md: "4" }, { default: withCtx(() => [createVNode(L, { modelValue: unref(W2).tabvalores_capacidadecivil_id, "onUpdate:modelValue": (e3) => unref(W2).tabvalores_capacidadecivil_id = e3, items: unref(Y2).capacidadeCivilItems, label: "Capacidade Civil", "item-title": "descricao", "item-value": "id" }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])]), _: 1 }), createVNode(y, { cols: "12", md: "4" }, { default: withCtx(() => [createVNode(L, { modelValue: unref(W2).cidade_natural_id, "onUpdate:modelValue": (e3) => unref(W2).cidade_natural_id = e3, items: unref(Y2).cidadeNascimentoItems, label: "Cidade de nascimento", "item-title": "descricao", "item-value": "id" }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])]), _: 1 })]), _: 1 }), createVNode($, null, { default: withCtx(() => [createVNode(y, { cols: "12", md: "4" }, { default: withCtx(() => [withDirectives(createVNode(is, { modelValue: unref(W2).cpf_pai, "onUpdate:modelValue": (e3) => unref(W2).cpf_pai = e3, modelModifiers: { date: true }, label: "CPF do Pai" }, null, 8, ["modelValue", "onUpdate:modelValue"]), [[m2, "###.###.###-##"]])]), _: 1 }), createVNode(y, { cols: "12", md: "4" }, { default: withCtx(() => [createVNode(is, { modelValue: unref(W2).nome_pai, "onUpdate:modelValue": (e3) => unref(W2).nome_pai = e3, modelModifiers: { date: true }, label: "Nome do Pai" }, null, 8, ["modelValue", "onUpdate:modelValue"])]), _: 1 })]), _: 1 }), createVNode($, null, { default: withCtx(() => [createVNode(y, { cols: "12", md: "4" }, { default: withCtx(() => [withDirectives(createVNode(is, { modelValue: unref(W2).cpf_mae, "onUpdate:modelValue": (e3) => unref(W2).cpf_mae = e3, modelModifiers: { date: true }, label: "CPF da M\xE3e" }, null, 8, ["modelValue", "onUpdate:modelValue"]), [[m2, "###.###.###-##"]])]), _: 1 }), createVNode(y, { cols: "12", md: "4" }, { default: withCtx(() => [createVNode(is, { modelValue: unref(W2).nome_mae, "onUpdate:modelValue": (e3) => unref(W2).nome_mae = e3, modelModifiers: { date: true }, "error-messages": unref(ae).nome_mae.$errors.map((e3) => e3.$message), label: "Nome da M\xE3e", required: "", onBlur: unref(ae).nome_mae.$touch, onInput: unref(ae).nome_mae.$touch }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages", "onBlur", "onInput"])]), _: 1 })]), _: 1 }), createVNode($, null, { default: withCtx(() => [createVNode(u2, { to: "/pessoas/registros" }, { default: withCtx(() => [createVNode("img", { class: "btn-pointer", src: A, alt: "Sair" })]), _: 1 }), createVNode("img", { class: "btn-pointer", src: A$1, onClick: (e3) => unref(H2) ? oe() : le() }, null, 8, ["onClick"])]), _: 1 })];
      l3(ssrRenderComponent($, null, { default: withCtx((e3, l4, o4, d4) => {
        if (!l4)
          return [createVNode(y, { cols: "12", md: "8" }, { default: withCtx(() => [createVNode(is, { modelValue: unref(W2).nome, "onUpdate:modelValue": (e4) => unref(W2).nome = e4, "error-messages": unref(ae).nome.$errors.map((e4) => e4.$message), label: "Nome", required: "", onBlur: unref(ae).nome.$touch, onInput: unref(ae).nome.$touch }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages", "onBlur", "onInput"])]), _: 1 }), createVNode(y, { cols: "12", md: "4" }, { default: withCtx(() => [withDirectives(createVNode(is, { modelValue: unref(W2).doc_identificacao, "onUpdate:modelValue": (e4) => unref(W2).doc_identificacao = e4, "error-messages": unref(ae).doc_identificacao.$errors.map((e4) => e4.$message), label: "CPF", required: "", onBlur: unref(ae).doc_identificacao.$touch, onInput: unref(ae).doc_identificacao.$touch }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages", "onBlur", "onInput"]), [[m2, "###.###.###-##"]])]), _: 1 })];
        l4(ssrRenderComponent(y, { cols: "12", md: "8" }, { default: withCtx((e4, a4, l5, o5) => {
          if (!a4)
            return [createVNode(is, { modelValue: unref(W2).nome, "onUpdate:modelValue": (e5) => unref(W2).nome = e5, "error-messages": unref(ae).nome.$errors.map((e5) => e5.$message), label: "Nome", required: "", onBlur: unref(ae).nome.$touch, onInput: unref(ae).nome.$touch }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages", "onBlur", "onInput"])];
          a4(ssrRenderComponent(is, { modelValue: unref(W2).nome, "onUpdate:modelValue": (e5) => unref(W2).nome = e5, "error-messages": unref(ae).nome.$errors.map((e5) => e5.$message), label: "Nome", required: "", onBlur: unref(ae).nome.$touch, onInput: unref(ae).nome.$touch }, null, l5, o5));
        }), _: 1 }, o4, d4)), l4(ssrRenderComponent(y, { cols: "12", md: "4" }, { default: withCtx((e4, l5, o5, d5) => {
          if (!l5)
            return [withDirectives(createVNode(is, { modelValue: unref(W2).doc_identificacao, "onUpdate:modelValue": (e5) => unref(W2).doc_identificacao = e5, "error-messages": unref(ae).doc_identificacao.$errors.map((e5) => e5.$message), label: "CPF", required: "", onBlur: unref(ae).doc_identificacao.$touch, onInput: unref(ae).doc_identificacao.$touch }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages", "onBlur", "onInput"]), [[m2, "###.###.###-##"]])];
          l5(ssrRenderComponent(is, mergeProps({ modelValue: unref(W2).doc_identificacao, "onUpdate:modelValue": (e5) => unref(W2).doc_identificacao = e5, "error-messages": unref(ae).doc_identificacao.$errors.map((e5) => e5.$message), label: "CPF", required: "", onBlur: unref(ae).doc_identificacao.$touch, onInput: unref(ae).doc_identificacao.$touch }, ssrGetDirectiveProps(a3, m2, "###.###.###-##")), null, o5, d5));
        }), _: 1 }, o4, d4));
      }), _: 1 }, o3, d3)), l3(ssrRenderComponent($, null, { default: withCtx((e3, a4, l4, o4) => {
        if (!a4)
          return [createVNode(y, { cols: "12", md: "4" }, { default: withCtx(() => [createVNode(L, { modelValue: unref(W2).tabvalores_estadocivil_id, "onUpdate:modelValue": (e4) => unref(W2).tabvalores_estadocivil_id = e4, items: unref(Y2).estadoCivilItems, "item-title": "descricao", "item-value": "id", label: "Estado Civil" }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])]), _: 1 }), createVNode(y, { cols: "12", md: "4" }, { default: withCtx(() => [createVNode(is, { modelValue: unref(W2).profissao, "onUpdate:modelValue": (e4) => unref(W2).profissao = e4, label: "Profiss\xE3o" }, null, 8, ["modelValue", "onUpdate:modelValue"])]), _: 1 }), createVNode(y, { cols: "12", md: "4" }, { default: withCtx(() => [createVNode(is, { modelValue: unref(W2).local_trabalho, "onUpdate:modelValue": (e4) => unref(W2).local_trabalho = e4, label: "Local de trabalho" }, null, 8, ["modelValue", "onUpdate:modelValue"])]), _: 1 })];
        a4(ssrRenderComponent(y, { cols: "12", md: "4" }, { default: withCtx((e4, a5, l5, o5) => {
          if (!a5)
            return [createVNode(L, { modelValue: unref(W2).tabvalores_estadocivil_id, "onUpdate:modelValue": (e5) => unref(W2).tabvalores_estadocivil_id = e5, items: unref(Y2).estadoCivilItems, "item-title": "descricao", "item-value": "id", label: "Estado Civil" }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])];
          a5(ssrRenderComponent(L, { modelValue: unref(W2).tabvalores_estadocivil_id, "onUpdate:modelValue": (e5) => unref(W2).tabvalores_estadocivil_id = e5, items: unref(Y2).estadoCivilItems, "item-title": "descricao", "item-value": "id", label: "Estado Civil" }, null, l5, o5));
        }), _: 1 }, l4, o4)), a4(ssrRenderComponent(y, { cols: "12", md: "4" }, { default: withCtx((e4, a5, l5, o5) => {
          if (!a5)
            return [createVNode(is, { modelValue: unref(W2).profissao, "onUpdate:modelValue": (e5) => unref(W2).profissao = e5, label: "Profiss\xE3o" }, null, 8, ["modelValue", "onUpdate:modelValue"])];
          a5(ssrRenderComponent(is, { modelValue: unref(W2).profissao, "onUpdate:modelValue": (e5) => unref(W2).profissao = e5, label: "Profiss\xE3o" }, null, l5, o5));
        }), _: 1 }, l4, o4)), a4(ssrRenderComponent(y, { cols: "12", md: "4" }, { default: withCtx((e4, a5, l5, o5) => {
          if (!a5)
            return [createVNode(is, { modelValue: unref(W2).local_trabalho, "onUpdate:modelValue": (e5) => unref(W2).local_trabalho = e5, label: "Local de trabalho" }, null, 8, ["modelValue", "onUpdate:modelValue"])];
          a5(ssrRenderComponent(is, { modelValue: unref(W2).local_trabalho, "onUpdate:modelValue": (e5) => unref(W2).local_trabalho = e5, label: "Local de trabalho" }, null, l5, o5));
        }), _: 1 }, l4, o4));
      }), _: 1 }, o3, d3)), l3(ssrRenderComponent($, null, { default: withCtx((e3, a4, l4, o4) => {
        if (!a4)
          return [createVNode(y, { cols: "12", md: "4" }, { default: withCtx(() => [createVNode(is, { modelValue: unref(W2).data_nascimento, "onUpdate:modelValue": (e4) => unref(W2).data_nascimento = e4, type: "date", "prepend-icon": "", label: "Data de nascimento" }, null, 8, ["modelValue", "onUpdate:modelValue"])]), _: 1 }), createVNode(y, { cols: "12", md: "4" }, { default: withCtx(() => [createVNode(L, { modelValue: unref(W2).tabvalores_capacidadecivil_id, "onUpdate:modelValue": (e4) => unref(W2).tabvalores_capacidadecivil_id = e4, items: unref(Y2).capacidadeCivilItems, label: "Capacidade Civil", "item-title": "descricao", "item-value": "id" }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])]), _: 1 }), createVNode(y, { cols: "12", md: "4" }, { default: withCtx(() => [createVNode(L, { modelValue: unref(W2).cidade_natural_id, "onUpdate:modelValue": (e4) => unref(W2).cidade_natural_id = e4, items: unref(Y2).cidadeNascimentoItems, label: "Cidade de nascimento", "item-title": "descricao", "item-value": "id" }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])]), _: 1 })];
        a4(ssrRenderComponent(y, { cols: "12", md: "4" }, { default: withCtx((e4, a5, l5, o5) => {
          if (!a5)
            return [createVNode(is, { modelValue: unref(W2).data_nascimento, "onUpdate:modelValue": (e5) => unref(W2).data_nascimento = e5, type: "date", "prepend-icon": "", label: "Data de nascimento" }, null, 8, ["modelValue", "onUpdate:modelValue"])];
          a5(ssrRenderComponent(is, { modelValue: unref(W2).data_nascimento, "onUpdate:modelValue": (e5) => unref(W2).data_nascimento = e5, type: "date", "prepend-icon": "", label: "Data de nascimento" }, null, l5, o5));
        }), _: 1 }, l4, o4)), a4(ssrRenderComponent(y, { cols: "12", md: "4" }, { default: withCtx((e4, a5, l5, o5) => {
          if (!a5)
            return [createVNode(L, { modelValue: unref(W2).tabvalores_capacidadecivil_id, "onUpdate:modelValue": (e5) => unref(W2).tabvalores_capacidadecivil_id = e5, items: unref(Y2).capacidadeCivilItems, label: "Capacidade Civil", "item-title": "descricao", "item-value": "id" }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])];
          a5(ssrRenderComponent(L, { modelValue: unref(W2).tabvalores_capacidadecivil_id, "onUpdate:modelValue": (e5) => unref(W2).tabvalores_capacidadecivil_id = e5, items: unref(Y2).capacidadeCivilItems, label: "Capacidade Civil", "item-title": "descricao", "item-value": "id" }, null, l5, o5));
        }), _: 1 }, l4, o4)), a4(ssrRenderComponent(y, { cols: "12", md: "4" }, { default: withCtx((e4, a5, l5, o5) => {
          if (!a5)
            return [createVNode(L, { modelValue: unref(W2).cidade_natural_id, "onUpdate:modelValue": (e5) => unref(W2).cidade_natural_id = e5, items: unref(Y2).cidadeNascimentoItems, label: "Cidade de nascimento", "item-title": "descricao", "item-value": "id" }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])];
          a5(ssrRenderComponent(L, { modelValue: unref(W2).cidade_natural_id, "onUpdate:modelValue": (e5) => unref(W2).cidade_natural_id = e5, items: unref(Y2).cidadeNascimentoItems, label: "Cidade de nascimento", "item-title": "descricao", "item-value": "id" }, null, l5, o5));
        }), _: 1 }, l4, o4));
      }), _: 1 }, o3, d3)), l3(ssrRenderComponent($, null, { default: withCtx((e3, l4, o4, d4) => {
        if (!l4)
          return [createVNode(y, { cols: "12", md: "4" }, { default: withCtx(() => [withDirectives(createVNode(is, { modelValue: unref(W2).cpf_pai, "onUpdate:modelValue": (e4) => unref(W2).cpf_pai = e4, modelModifiers: { date: true }, label: "CPF do Pai" }, null, 8, ["modelValue", "onUpdate:modelValue"]), [[m2, "###.###.###-##"]])]), _: 1 }), createVNode(y, { cols: "12", md: "4" }, { default: withCtx(() => [createVNode(is, { modelValue: unref(W2).nome_pai, "onUpdate:modelValue": (e4) => unref(W2).nome_pai = e4, modelModifiers: { date: true }, label: "Nome do Pai" }, null, 8, ["modelValue", "onUpdate:modelValue"])]), _: 1 })];
        l4(ssrRenderComponent(y, { cols: "12", md: "4" }, { default: withCtx((e4, l5, o5, d5) => {
          if (!l5)
            return [withDirectives(createVNode(is, { modelValue: unref(W2).cpf_pai, "onUpdate:modelValue": (e5) => unref(W2).cpf_pai = e5, modelModifiers: { date: true }, label: "CPF do Pai" }, null, 8, ["modelValue", "onUpdate:modelValue"]), [[m2, "###.###.###-##"]])];
          l5(ssrRenderComponent(is, mergeProps({ modelValue: unref(W2).cpf_pai, "onUpdate:modelValue": (e5) => unref(W2).cpf_pai = e5, modelModifiers: { date: true }, label: "CPF do Pai" }, ssrGetDirectiveProps(a3, m2, "###.###.###-##")), null, o5, d5));
        }), _: 1 }, o4, d4)), l4(ssrRenderComponent(y, { cols: "12", md: "4" }, { default: withCtx((e4, a4, l5, o5) => {
          if (!a4)
            return [createVNode(is, { modelValue: unref(W2).nome_pai, "onUpdate:modelValue": (e5) => unref(W2).nome_pai = e5, modelModifiers: { date: true }, label: "Nome do Pai" }, null, 8, ["modelValue", "onUpdate:modelValue"])];
          a4(ssrRenderComponent(is, { modelValue: unref(W2).nome_pai, "onUpdate:modelValue": (e5) => unref(W2).nome_pai = e5, modelModifiers: { date: true }, label: "Nome do Pai" }, null, l5, o5));
        }), _: 1 }, o4, d4));
      }), _: 1 }, o3, d3)), l3(ssrRenderComponent($, null, { default: withCtx((e3, l4, o4, d4) => {
        if (!l4)
          return [createVNode(y, { cols: "12", md: "4" }, { default: withCtx(() => [withDirectives(createVNode(is, { modelValue: unref(W2).cpf_mae, "onUpdate:modelValue": (e4) => unref(W2).cpf_mae = e4, modelModifiers: { date: true }, label: "CPF da M\xE3e" }, null, 8, ["modelValue", "onUpdate:modelValue"]), [[m2, "###.###.###-##"]])]), _: 1 }), createVNode(y, { cols: "12", md: "4" }, { default: withCtx(() => [createVNode(is, { modelValue: unref(W2).nome_mae, "onUpdate:modelValue": (e4) => unref(W2).nome_mae = e4, modelModifiers: { date: true }, "error-messages": unref(ae).nome_mae.$errors.map((e4) => e4.$message), label: "Nome da M\xE3e", required: "", onBlur: unref(ae).nome_mae.$touch, onInput: unref(ae).nome_mae.$touch }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages", "onBlur", "onInput"])]), _: 1 })];
        l4(ssrRenderComponent(y, { cols: "12", md: "4" }, { default: withCtx((e4, l5, o5, d5) => {
          if (!l5)
            return [withDirectives(createVNode(is, { modelValue: unref(W2).cpf_mae, "onUpdate:modelValue": (e5) => unref(W2).cpf_mae = e5, modelModifiers: { date: true }, label: "CPF da M\xE3e" }, null, 8, ["modelValue", "onUpdate:modelValue"]), [[m2, "###.###.###-##"]])];
          l5(ssrRenderComponent(is, mergeProps({ modelValue: unref(W2).cpf_mae, "onUpdate:modelValue": (e5) => unref(W2).cpf_mae = e5, modelModifiers: { date: true }, label: "CPF da M\xE3e" }, ssrGetDirectiveProps(a3, m2, "###.###.###-##")), null, o5, d5));
        }), _: 1 }, o4, d4)), l4(ssrRenderComponent(y, { cols: "12", md: "4" }, { default: withCtx((e4, a4, l5, o5) => {
          if (!a4)
            return [createVNode(is, { modelValue: unref(W2).nome_mae, "onUpdate:modelValue": (e5) => unref(W2).nome_mae = e5, modelModifiers: { date: true }, "error-messages": unref(ae).nome_mae.$errors.map((e5) => e5.$message), label: "Nome da M\xE3e", required: "", onBlur: unref(ae).nome_mae.$touch, onInput: unref(ae).nome_mae.$touch }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages", "onBlur", "onInput"])];
          a4(ssrRenderComponent(is, { modelValue: unref(W2).nome_mae, "onUpdate:modelValue": (e5) => unref(W2).nome_mae = e5, modelModifiers: { date: true }, "error-messages": unref(ae).nome_mae.$errors.map((e5) => e5.$message), label: "Nome da M\xE3e", required: "", onBlur: unref(ae).nome_mae.$touch, onInput: unref(ae).nome_mae.$touch }, null, l5, o5));
        }), _: 1 }, o4, d4));
      }), _: 1 }, o3, d3)), l3(ssrRenderComponent($, null, { default: withCtx((e3, a4, l4, o4) => {
        if (!a4)
          return [createVNode(u2, { to: "/pessoas/registros" }, { default: withCtx(() => [createVNode("img", { class: "btn-pointer", src: A, alt: "Sair" })]), _: 1 }), createVNode("img", { class: "btn-pointer", src: A$1, onClick: (e4) => unref(H2) ? oe() : le() }, null, 8, ["onClick"])];
        a4(ssrRenderComponent(u2, { to: "/pessoas/registros" }, { default: withCtx((e4, a5, l5, o5) => {
          if (!a5)
            return [createVNode("img", { class: "btn-pointer", src: A, alt: "Sair" })];
          a5(`<img class="btn-pointer"${ssrRenderAttr("src", A)} alt="Sair" data-v-72971175${o5}>`);
        }), _: 1 }, l4, o4)), a4(`<img class="btn-pointer"${ssrRenderAttr("src", A$1)} data-v-72971175${o4}>`);
      }), _: 1 }, o3, d3));
    }), _: 1 }, o2)), l2("<!--]-->");
  };
} }, Y = X.setup;
X.setup = (e2, a2) => {
  const l2 = useSSRContext();
  return (l2.modules || (l2.modules = /* @__PURE__ */ new Set())).add("components/Dados.vue"), Y ? Y(e2, a2) : void 0;
};
const Z = jc(X, [["__scopeId", "data-v-72971175"]]), K = { __name: "index", __ssrInlineRender: true, setup(e2) {
  const a2 = ref(null), l2 = ref(false), o2 = ref(false), d2 = reactive({ tipo_pessoa: "FISICA" }), t2 = ["FISICA", "JURIDICA", "ESTRANGEIRA"], i2 = () => {
    l2.value = true, o2.value = true;
  };
  return (e3, u2, m2, s2) => {
    const n2 = Z, r2 = Dl, V2 = Nl, v2 = Gl, h2 = ea;
    u2(ssrRenderComponent(oe, mergeProps({ width: "1300" }, s2), { default: withCtx((e4, u3, m3, s3) => {
      if (!u3)
        return [createVNode("h1", { style: { "background-color": "#C8FCCA", color: "#429946", padding: "10px 0px 0px 20px" } }, " Cadastramento de pessoas "), createVNode("div", { style: { "background-color": "#C8FCCA", padding: "20px 0px 20px 20px" } }, [createVNode(L, { modelValue: unref(d2).tipo_pessoa, "onUpdate:modelValue": (e5) => unref(d2).tipo_pessoa = e5, style: { width: "200px" }, items: t2, label: "Tipo de pessoa", "bg-color": "#F6F6F6", disabled: unref(o2) }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"])]), createVNode(Al, { modelValue: unref(a2), "onUpdate:modelValue": (e5) => isRef(a2) ? a2.value = e5 : null, "bg-color": "#C8FCCA" }, { default: withCtx(() => [createVNode($l, { value: "dados" }, { default: withCtx(() => [createTextVNode("Dados")]), _: 1 }), unref(l2) ? (openBlock(), createBlock($l, { key: 0, value: "documento" }, { default: withCtx(() => [createTextVNode("Documentos")]), _: 1 })) : createCommentVNode("", true), unref(l2) ? (openBlock(), createBlock($l, { key: 1, value: "endereco" }, { default: withCtx(() => [createTextVNode("Endere\xE7os")]), _: 1 })) : createCommentVNode("", true), unref(l2) ? (openBlock(), createBlock($l, { key: 2, value: "biometria" }, { default: withCtx(() => [createTextVNode("Biometria")]), _: 1 })) : createCommentVNode("", true), unref(l2) ? (openBlock(), createBlock($l, { key: 3, value: "restricao" }, { default: withCtx(() => [createTextVNode("Restri\xE7\xF5es")]), _: 1 })) : createCommentVNode("", true)]), _: 1 }, 8, ["modelValue", "onUpdate:modelValue"]), createVNode(Il, { modelValue: unref(a2), "onUpdate:modelValue": (e5) => isRef(a2) ? a2.value = e5 : null }, { default: withCtx(() => [createVNode(Bl, { value: "dados" }, { default: withCtx(() => [createVNode(n2, { onSaved: i2 })]), _: 1 }), unref(l2) ? (openBlock(), createBlock(Bl, { key: 0, value: "documento" }, { default: withCtx(() => [createVNode(r2)]), _: 1 })) : createCommentVNode("", true), unref(l2) ? (openBlock(), createBlock(Bl, { key: 1, value: "endereco" }, { default: withCtx(() => [createVNode(V2)]), _: 1 })) : createCommentVNode("", true), unref(l2) ? (openBlock(), createBlock(Bl, { key: 2, value: "biometria" }, { default: withCtx(() => [createVNode(i, { class: "mt-5" }, { default: withCtx(() => [createVNode(v2)]), _: 1 })]), _: 1 })) : createCommentVNode("", true), unref(l2) ? (openBlock(), createBlock(Bl, { key: 3, value: "restricao" }, { default: withCtx(() => [createVNode(h2)]), _: 1 })) : createCommentVNode("", true)]), _: 1 }, 8, ["modelValue", "onUpdate:modelValue"])];
      u3(`<h1 style="${ssrRenderStyle({ "background-color": "#C8FCCA", color: "#429946", padding: "10px 0px 0px 20px" })}"${s3}> Cadastramento de pessoas </h1><div style="${ssrRenderStyle({ "background-color": "#C8FCCA", padding: "20px 0px 20px 20px" })}"${s3}>`), u3(ssrRenderComponent(L, { modelValue: unref(d2).tipo_pessoa, "onUpdate:modelValue": (e5) => unref(d2).tipo_pessoa = e5, style: { width: "200px" }, items: t2, label: "Tipo de pessoa", "bg-color": "#F6F6F6", disabled: unref(o2) }, null, m3, s3)), u3("</div>"), u3(ssrRenderComponent(Al, { modelValue: unref(a2), "onUpdate:modelValue": (e5) => isRef(a2) ? a2.value = e5 : null, "bg-color": "#C8FCCA" }, { default: withCtx((e5, a3, o3, d3) => {
        if (!a3)
          return [createVNode($l, { value: "dados" }, { default: withCtx(() => [createTextVNode("Dados")]), _: 1 }), unref(l2) ? (openBlock(), createBlock($l, { key: 0, value: "documento" }, { default: withCtx(() => [createTextVNode("Documentos")]), _: 1 })) : createCommentVNode("", true), unref(l2) ? (openBlock(), createBlock($l, { key: 1, value: "endereco" }, { default: withCtx(() => [createTextVNode("Endere\xE7os")]), _: 1 })) : createCommentVNode("", true), unref(l2) ? (openBlock(), createBlock($l, { key: 2, value: "biometria" }, { default: withCtx(() => [createTextVNode("Biometria")]), _: 1 })) : createCommentVNode("", true), unref(l2) ? (openBlock(), createBlock($l, { key: 3, value: "restricao" }, { default: withCtx(() => [createTextVNode("Restri\xE7\xF5es")]), _: 1 })) : createCommentVNode("", true)];
        a3(ssrRenderComponent($l, { value: "dados" }, { default: withCtx((e6, a4, l3, o4) => {
          if (!a4)
            return [createTextVNode("Dados")];
          a4("Dados");
        }), _: 1 }, o3, d3)), unref(l2) ? a3(ssrRenderComponent($l, { value: "documento" }, { default: withCtx((e6, a4, l3, o4) => {
          if (!a4)
            return [createTextVNode("Documentos")];
          a4("Documentos");
        }), _: 1 }, o3, d3)) : a3("<!---->"), unref(l2) ? a3(ssrRenderComponent($l, { value: "endereco" }, { default: withCtx((e6, a4, l3, o4) => {
          if (!a4)
            return [createTextVNode("Endere\xE7os")];
          a4("Endere\xE7os");
        }), _: 1 }, o3, d3)) : a3("<!---->"), unref(l2) ? a3(ssrRenderComponent($l, { value: "biometria" }, { default: withCtx((e6, a4, l3, o4) => {
          if (!a4)
            return [createTextVNode("Biometria")];
          a4("Biometria");
        }), _: 1 }, o3, d3)) : a3("<!---->"), unref(l2) ? a3(ssrRenderComponent($l, { value: "restricao" }, { default: withCtx((e6, a4, l3, o4) => {
          if (!a4)
            return [createTextVNode("Restri\xE7\xF5es")];
          a4("Restri\xE7\xF5es");
        }), _: 1 }, o3, d3)) : a3("<!---->");
      }), _: 1 }, m3, s3)), u3(ssrRenderComponent(Il, { modelValue: unref(a2), "onUpdate:modelValue": (e5) => isRef(a2) ? a2.value = e5 : null }, { default: withCtx((e5, a3, o3, d3) => {
        if (!a3)
          return [createVNode(Bl, { value: "dados" }, { default: withCtx(() => [createVNode(n2, { onSaved: i2 })]), _: 1 }), unref(l2) ? (openBlock(), createBlock(Bl, { key: 0, value: "documento" }, { default: withCtx(() => [createVNode(r2)]), _: 1 })) : createCommentVNode("", true), unref(l2) ? (openBlock(), createBlock(Bl, { key: 1, value: "endereco" }, { default: withCtx(() => [createVNode(V2)]), _: 1 })) : createCommentVNode("", true), unref(l2) ? (openBlock(), createBlock(Bl, { key: 2, value: "biometria" }, { default: withCtx(() => [createVNode(i, { class: "mt-5" }, { default: withCtx(() => [createVNode(v2)]), _: 1 })]), _: 1 })) : createCommentVNode("", true), unref(l2) ? (openBlock(), createBlock(Bl, { key: 3, value: "restricao" }, { default: withCtx(() => [createVNode(h2)]), _: 1 })) : createCommentVNode("", true)];
        a3(ssrRenderComponent(Bl, { value: "dados" }, { default: withCtx((e6, a4, l3, o4) => {
          if (!a4)
            return [createVNode(n2, { onSaved: i2 })];
          a4(ssrRenderComponent(n2, { onSaved: i2 }, null, l3, o4));
        }), _: 1 }, o3, d3)), unref(l2) ? a3(ssrRenderComponent(Bl, { value: "documento" }, { default: withCtx((e6, a4, l3, o4) => {
          if (!a4)
            return [createVNode(r2)];
          a4(ssrRenderComponent(r2, null, null, l3, o4));
        }), _: 1 }, o3, d3)) : a3("<!---->"), unref(l2) ? a3(ssrRenderComponent(Bl, { value: "endereco" }, { default: withCtx((e6, a4, l3, o4) => {
          if (!a4)
            return [createVNode(V2)];
          a4(ssrRenderComponent(V2, null, null, l3, o4));
        }), _: 1 }, o3, d3)) : a3("<!---->"), unref(l2) ? a3(ssrRenderComponent(Bl, { value: "biometria" }, { default: withCtx((e6, a4, l3, o4) => {
          if (!a4)
            return [createVNode(i, { class: "mt-5" }, { default: withCtx(() => [createVNode(v2)]), _: 1 })];
          a4(ssrRenderComponent(i, { class: "mt-5" }, { default: withCtx((e7, a5, l4, o5) => {
            if (!a5)
              return [createVNode(v2)];
            a5(ssrRenderComponent(v2, null, null, l4, o5));
          }), _: 1 }, l3, o4));
        }), _: 1 }, o3, d3)) : a3("<!---->"), unref(l2) ? a3(ssrRenderComponent(Bl, { value: "restricao" }, { default: withCtx((e6, a4, l3, o4) => {
          if (!a4)
            return [createVNode(h2)];
          a4(ssrRenderComponent(h2, null, null, l3, o4));
        }), _: 1 }, o3, d3)) : a3("<!---->");
      }), _: 1 }, m3, s3));
    }), _: 1 }, m2));
  };
} }, Q = K.setup;
K.setup = (e2, a2) => {
  const l2 = useSSRContext();
  return (l2.modules || (l2.modules = /* @__PURE__ */ new Set())).add("pages/pessoas/cadastro/index.vue"), Q ? Q(e2, a2) : void 0;
};

export { K as default };
//# sourceMappingURL=index-C19ssuNr.mjs.map
