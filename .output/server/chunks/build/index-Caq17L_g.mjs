import { ref, computed, mergeProps, withCtx, unref, isRef, createVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import { V as VContainer } from './VContainer-CTpFP9Uv.mjs';
import { V as VTextField } from './server.mjs';
import { V as VDataTable } from './VDataTable-CK60pvn7.mjs';
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
import './filter-DBr0YsK-.mjs';
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
      { title: "Cor", value: "cor" },
      { title: "Situa\xE7\xE3o", value: "situacao" },
      { title: "Protocolo", value: "protocolo" },
      { title: "Certificado NT", value: "certificado_nt" },
      { title: "Data cadastro", value: "data_cadastro" }
    ];
    const selos = ref([
      {
        selo: "AFR39581-762Q",
        cor: "VERMELHO",
        situacao: "Dispon\xEDvel",
        protocolo: "",
        certificado_nt: false,
        data_cadastro: "17/03/2025 16:54"
      },
      {
        selo: "BFR12345-678X",
        cor: "AZUL",
        situacao: "Utilizado",
        protocolo: "123456",
        certificado_nt: true,
        data_cadastro: "15/02/2025 10:30"
      },
      {
        selo: "CFR98765-432Y",
        cor: "VERDE",
        situacao: "Cancelado",
        protocolo: "789012",
        certificado_nt: false,
        data_cadastro: "20/01/2025 14:20"
      },
      {
        selo: "DFR54321-098Z",
        cor: "AMARELO",
        situacao: "Dispon\xEDvel",
        protocolo: "",
        certificado_nt: true,
        data_cadastro: "10/03/2025 09:15"
      },
      {
        selo: "EFR11223-445W",
        cor: "ROXO",
        situacao: "Utilizado",
        protocolo: "456789",
        certificado_nt: false,
        data_cadastro: "05/04/2025 11:45"
      }
    ]);
    const filteredSelos = computed(() => {
      return selos.value.filter((item) => {
        const searchTerm = search.value.toLowerCase();
        return item.selo.toLowerCase().includes(searchTerm) || item.cor.toLowerCase().includes(searchTerm) || item.situacao.toLowerCase().includes(searchTerm) || item.protocolo.toLowerCase().includes(searchTerm);
      });
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(VContainer, mergeProps({ class: "mt-5" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VTextField, {
              modelValue: unref(search),
              "onUpdate:modelValue": ($event) => isRef(search) ? search.value = $event : null,
              label: "Buscar selo, cor, situa\xE7\xE3o ou protocolo",
              "prepend-inner-icon": "mdi-magnify",
              variant: "outlined",
              "hide-details": "",
              class: "mb-4"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(VDataTable, {
              density: "compact",
              headers,
              items: unref(filteredSelos),
              "item-key": "selo"
            }, {
              "item.certificado_nt": withCtx(({ item }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span${_scopeId2}>${ssrInterpolate(item.certificado_nt ? "Sim" : "N\xE3o")}</span>`);
                } else {
                  return [
                    createVNode("span", null, toDisplayString(item.certificado_nt ? "Sim" : "N\xE3o"), 1)
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
                label: "Buscar selo, cor, situa\xE7\xE3o ou protocolo",
                "prepend-inner-icon": "mdi-magnify",
                variant: "outlined",
                "hide-details": "",
                class: "mb-4"
              }, null, 8, ["modelValue", "onUpdate:modelValue"]),
              createVNode(VDataTable, {
                density: "compact",
                headers,
                items: unref(filteredSelos),
                "item-key": "selo"
              }, {
                "item.certificado_nt": withCtx(({ item }) => [
                  createVNode("span", null, toDisplayString(item.certificado_nt ? "Sim" : "N\xE3o"), 1)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/selos/importar/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : undefined;
};

export { _sfc_main as default };
//# sourceMappingURL=index-Caq17L_g.mjs.map
