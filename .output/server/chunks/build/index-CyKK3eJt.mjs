import { _ as _export_sfc, c as useCookie } from './server.mjs';
import { useSSRContext, defineComponent, ref, computed, withCtx, createVNode, resolveDynamicComponent, openBlock, createBlock } from 'vue';
import { ssrRenderComponent, ssrRenderVNode } from 'vue/server-renderer';
import Testamento from './Testamento-zeJGkPIK.mjs';
import ReconhecimentoFirma from './ReconhecimentoFirma-xq8njznI.mjs';
import { V as VContainer } from './VContainer-yRa93Mia.mjs';
import { V as VAutocomplete } from './VAutocomplete-C8KrUryE.mjs';
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
import './VWindowItem-WRzzTVXF.mjs';
import './nuxt-link-DyZc7qn_.mjs';
import './fetch-CXRKblKa.mjs';
import './visualizar-CsXww5Hd.mjs';
import './sair-B-uLsLLb.mjs';
import './salvar-DNXAfpCz.mjs';
import './VCard-BC0uejm3.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const components = {
      ReconhecimentoFirma,
      Testamento
    };
    const pages = [
      { title: "Reconhecimento de Firma", value: "ReconhecimentoFirma" },
      { title: "Testamento", value: "Testamento" }
    ];
    const selectedPage = ref("");
    console.log(useCookie("user-data"));
    const selectedComponent = computed(() => {
      return components[selectedPage.value];
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(VContainer, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VAutocomplete, {
              class: "mt-5",
              style: { "width": "800px", "margin-left": "150px" },
              label: "Selecione o ato",
              items: pages,
              modelValue: selectedPage.value,
              "onUpdate:modelValue": ($event) => selectedPage.value = $event
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(VAutocomplete, {
                class: "mt-5",
                style: { "width": "800px", "margin-left": "150px" },
                label: "Selecione o ato",
                items: pages,
                modelValue: selectedPage.value,
                "onUpdate:modelValue": ($event) => selectedPage.value = $event
              }, null, 8, ["modelValue", "onUpdate:modelValue"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(VContainer, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderVNode(_push2, createVNode(resolveDynamicComponent(selectedComponent.value), null, null), _parent2, _scopeId);
          } else {
            return [
              (openBlock(), createBlock(resolveDynamicComponent(selectedComponent.value)))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/home/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-bbc7cc72"]]);

export { index as default };
//# sourceMappingURL=index-CyKK3eJt.mjs.map
