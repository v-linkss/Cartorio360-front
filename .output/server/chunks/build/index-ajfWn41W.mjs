import { ref, computed, mergeProps, withCtx, unref, isRef, createTextVNode, toDisplayString, createVNode, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import { V as VContainer } from './VContainer-CTpFP9Uv.mjs';
import { V as VTextField } from './server.mjs';
import { V as VDataTable } from './VDataTable-DomJgUVT.mjs';
import { d as VChip } from './filter-1TH8I8rV.mjs';
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
import './VList-DgVXz_Z-.mjs';
import './VAvatar-C1Wv3qCt.mjs';
import './VResponsive-BFQ60k4B.mjs';

const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const search = ref("");
    const headers = [
      { title: "Selo", value: "selo" },
      { title: "Protocolo TJ", value: "protocolo_tj" },
      { title: "Protocolo", value: "protocolo" },
      { title: "Tipo de pedido", value: "tipo_pedido" },
      { title: "Emolumentos R$", value: "emolumentos" },
      { title: "Selo R$", value: "selo_valor" },
      { title: "Total R$", value: "total" },
      { title: "Situa\xE7\xE3o", value: "situacao" }
    ];
    const selos = ref([]);
    const filteredSelos = computed(() => {
      return selos.value.filter((item) => {
        const searchTerm = search.value.toLowerCase();
        return item.protocolo_tj.toLowerCase().includes(searchTerm) || item.protocolo.toLowerCase().includes(searchTerm);
      });
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(VContainer, mergeProps({ class: "mt-5" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VTextField, {
              modelValue: unref(search),
              "onUpdate:modelValue": ($event) => isRef(search) ? search.value = $event : null,
              label: "Buscar pelo protocolo...",
              "prepend-inner-icon": "mdi-magnify",
              variant: "outlined",
              "hide-details": "",
              class: "mb-4"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(VDataTable, {
              "show-select": "",
              density: "compact",
              headers,
              items: unref(filteredSelos),
              "item-key": "selo"
            }, {
              "item.situacao": withCtx(({ item }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VChip, {
                    color: "green",
                    "text-color": "white",
                    outlined: ""
                  }, {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`${ssrInterpolate(item.situacao)}`);
                      } else {
                        return [
                          createTextVNode(toDisplayString(item.situacao), 1)
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VChip, {
                      color: "green",
                      "text-color": "white",
                      outlined: ""
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(item.situacao), 1)
                      ]),
                      _: 2
                    }, 1024)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(VTextField, {
                modelValue: unref(search),
                "onUpdate:modelValue": ($event) => isRef(search) ? search.value = $event : null,
                label: "Buscar pelo protocolo...",
                "prepend-inner-icon": "mdi-magnify",
                variant: "outlined",
                "hide-details": "",
                class: "mb-4"
              }, null, 8, ["modelValue", "onUpdate:modelValue"]),
              createVNode(VDataTable, {
                "show-select": "",
                density: "compact",
                headers,
                items: unref(filteredSelos),
                "item-key": "selo"
              }, {
                "item.situacao": withCtx(({ item }) => [
                  createVNode(VChip, {
                    color: "green",
                    "text-color": "white",
                    outlined: ""
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(item.situacao), 1)
                    ]),
                    _: 2
                  }, 1024)
                ]),
                _: 1
              }, 8, ["items"])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/selos/enviar/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : undefined;
};

export { _sfc_main as default };
//# sourceMappingURL=index-ajfWn41W.mjs.map
