import { _ as _sfc_main$1 } from './SaveButton-NegzxXb_.mjs';
import { _ as _sfc_main$2 } from './Confirmacao-B8gh5Xe9.mjs';
import { ref, unref, mergeProps, withCtx, createVNode, openBlock, createBlock, toDisplayString, createCommentVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle, ssrRenderAttr, ssrInterpolate } from 'vue/server-renderer';
import { _ as _imports_0 } from './abre-arquivo-KvIa04gq.mjs';
import { b as useNuxtApp, e as useCookie, b1 as VProgressCircular, c as useRuntimeConfig } from './server.mjs';
import { u as useFetch } from './fetch-DOsfzFYE.mjs';
import { V as VContainer } from './VContainer-CUysD4sO.mjs';
import './VDialog-BVe31KMa.mjs';
import './VCard-CaQDfbK8.mjs';
import './VAvatar-Dy2zMqU_.mjs';
import './VResponsive-BwPb2GHE.mjs';
import '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:fs';
import 'node:url';
import 'node:path';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'devalue';
import '@unhead/ssr';
import 'unhead';
import '@unhead/shared';
import 'pinia';
import 'vue-router';
import 'vue3-toastify';
import 'vue-the-mask';
import './asyncData-B13qrLU7.mjs';

const _sfc_main = {
  __name: "importa-onrtd",
  __ssrInlineRender: true,
  setup(__props) {
    const config = useRuntimeConfig();
    const { $toast } = useNuxtApp();
    const importaCaixaOnrtd = `${config.public.managemant}/importa_caixa_onrtd`;
    const cartorio_token = useCookie("user-data").value.cartorio_token;
    const usuario_token = useCookie("auth_token").value;
    const file = ref(null);
    const statusLoading = ref(null);
    const ModalConfirmacaoOpen = ref(false);
    const fileInput = ref(null);
    function openFolderFromPc() {
      fileInput.value && fileInput.value.click();
    }
    function handleFileChange(event) {
      const selectedFile = event.target.files[0];
      file.value = selectedFile || null;
    }
    const openConfirmModal = () => {
      ModalConfirmacaoOpen.value = true;
    };
    async function importFile() {
      const conteudo = await file.value.text();
      statusLoading.value = "pending";
      const { data, status, error } = await useFetch(importaCaixaOnrtd, {
        method: "POST",
        body: {
          cartorio_token,
          usuario_token,
          conteudo
        }
      }, "$wpU3kJtn6B");
      statusLoading.value = status.value;
      if (status.value === "success") {
        $toast.success("Importa\xE7\xE3o realizada com sucesso!");
        ModalConfirmacaoOpen.value = false;
      } else {
        $toast.error(`Erro: ${error.value.data.details}`);
      }
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_SaveButton = _sfc_main$1;
      const _component_ModalConfirmacao = _sfc_main$2;
      if (unref(statusLoading) === "pending") {
        _push(`<div${ssrRenderAttrs(mergeProps({
          class: "d-flex align-center justify-center",
          style: { "height": "80vh" }
        }, _attrs))}>`);
        _push(ssrRenderComponent(VProgressCircular, {
          class: "loading-spinner",
          indeterminate: "",
          size: "64"
        }, null, _parent));
        _push(`</div>`);
      } else {
        _push(ssrRenderComponent(VContainer, _attrs, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<h1${_scopeId}>Importar Lan\xE7amentos do Caixa (ONRTD)</h1><input type="file" accept=".json" style="${ssrRenderStyle({ "display": "none" })}"${_scopeId}><div class="mt-2" title="Criar"${_scopeId}><img class="mt-3 ml-2" style="${ssrRenderStyle({ "width": "80px", "height": "80px", "cursor": "pointer" })}"${ssrRenderAttr("src", _imports_0)} alt="Criar"${_scopeId}>`);
              if (unref(file)) {
                _push2(`<span class="ml-4" style="${ssrRenderStyle({ "font-size": "1.3rem" })}"${_scopeId}>${ssrInterpolate(unref(file).name)}</span>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
              _push2(ssrRenderComponent(_component_SaveButton, {
                text: "Importar",
                class: "mt-5",
                disabled: !unref(file),
                onSave: openConfirmModal
              }, null, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_ModalConfirmacao, {
                show: unref(ModalConfirmacaoOpen),
                "cond-message": "Deseja continuar com a importa\xE7\xE3o? Essa opera\xE7\xE3o n\xE3o poder\xE1 ser desfeita.",
                onClose: ($event) => ModalConfirmacaoOpen.value = false,
                onConfirm: importFile
              }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode("h1", null, "Importar Lan\xE7amentos do Caixa (ONRTD)"),
                createVNode("input", {
                  ref_key: "fileInput",
                  ref: fileInput,
                  type: "file",
                  accept: ".json",
                  style: { "display": "none" },
                  onChange: handleFileChange
                }, null, 544),
                createVNode("div", {
                  class: "mt-2",
                  onClick: openFolderFromPc,
                  title: "Criar"
                }, [
                  createVNode("img", {
                    class: "mt-3 ml-2",
                    style: { "width": "80px", "height": "80px", "cursor": "pointer" },
                    src: _imports_0,
                    alt: "Criar"
                  }),
                  unref(file) ? (openBlock(), createBlock("span", {
                    key: 0,
                    class: "ml-4",
                    style: { "font-size": "1.3rem" }
                  }, toDisplayString(unref(file).name), 1)) : createCommentVNode("", true)
                ]),
                createVNode(_component_SaveButton, {
                  text: "Importar",
                  class: "mt-5",
                  disabled: !unref(file),
                  onSave: openConfirmModal
                }, null, 8, ["disabled"]),
                createVNode(_component_ModalConfirmacao, {
                  show: unref(ModalConfirmacaoOpen),
                  "cond-message": "Deseja continuar com a importa\xE7\xE3o? Essa opera\xE7\xE3o n\xE3o poder\xE1 ser desfeita.",
                  onClose: ($event) => ModalConfirmacaoOpen.value = false,
                  onConfirm: importFile
                }, null, 8, ["show", "onClose"])
              ];
            }
          }),
          _: 1
        }, _parent));
      }
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/integracao/importa-onrtd.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : undefined;
};

export { _sfc_main as default };
//# sourceMappingURL=importa-onrtd-B8ueMnKT.mjs.map
