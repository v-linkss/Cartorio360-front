import { _ as _export_sfc, c as useRoute$1, d as useCookie, b as useRuntimeConfig } from './server.mjs';
import { ref, computed, watch, withCtx, unref, createVNode, toDisplayString, isRef, resolveDynamicComponent, useSSRContext } from 'vue';
import { u as useFetch } from './fetch-Dsyde8UD.mjs';
import { ssrRenderComponent, ssrRenderStyle, ssrInterpolate, ssrRenderVNode } from 'vue/server-renderer';
import _sfc_main$1 from './semelhanca-DZKlN5T0.mjs';
import _sfc_main$2 from './autencidade-BkNbBP-c.mjs';
import autenticacao from './autenticacao-C2Ri5mIk.mjs';
import _sfc_main$3 from './procuracao-ieztQuTd.mjs';
import { V as VContainer } from './VContainer-Dd724oJ4.mjs';
import { V as VRow } from './VRow-CVrt2SWs.mjs';
import { V as VCol } from './VCol-DvbNDJG_.mjs';
import { V as VAutocomplete } from './VAutocomplete-D1-afj5_.mjs';
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
import '@ckeditor/ckeditor5-vue';
import 'vue3-toastify';
import 'vue-the-mask';
import './RegistroPessoas-C7csFBo6.mjs';
import '@vuelidate/core';
import '@vuelidate/validators';
import './validaCpf-DuucUl6O.mjs';
import './VCard-uMKFEuGZ.mjs';
import './FichaCard-X1AOFdOA.mjs';
import './nuxt-link-DyZc7qn_.mjs';
import './ErrorModalCard-DUPV_dzc.mjs';
import './visualizar-CsXww5Hd.mjs';
import './mudarStatus-D3vc2C0t.mjs';
import './excluido-CHOPYrBt.mjs';
import 'mammoth';
import 'ckeditor5';
import 'ckeditor5/translations/pt.js';
import './VTabs-eFSwjNml.mjs';

const _sfc_main = {
  __name: "criar-ato",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute$1();
    const numeroOs = route.query.numeroOs;
    const components = {
      "yXA3K": _sfc_main$1,
      "WrhCH": _sfc_main$2,
      "bFsdV": autenticacao,
      "xkyaA": _sfc_main$3
    };
    const servicos = ref([]);
    const atos = ref([]);
    const selectedServico = ref("");
    const selectedAto = ref(" ");
    const selectedComponent = computed(() => components[selectedAto.value]);
    const config = useRuntimeConfig();
    const getTiposAtos = `${config.public.managemant}/tipoAtos`;
    const usuario_token = useCookie("auth_token").value;
    const cartorio_token = ref(useCookie("user-data").value.cartorio_token).value;
    const loadServicos = async () => {
      const { data } = await useFetch(getTiposAtos, {
        method: "POST",
        body: { usuario_token, cartorio_token }
      }, "$eDvF6utwet");
      servicos.value = data.value;
      if (servicos.value.length > 0) {
        selectedServico.value = servicos.value[0].token;
      }
    };
    const onServicoChange = async (token) => {
      const { data } = await useFetch(getTiposAtos, {
        method: "POST",
        body: {
          usuario_token,
          cartorio_token,
          servico_token: token
        }
      }, "$vJbA9pxpeK");
      atos.value = data.value;
      console.log(atos.value);
    };
    loadServicos();
    watch(selectedServico, async (newValue) => {
      if (newValue) {
        await onServicoChange(newValue);
        selectedAto.value = atos.value.length > 0 ? atos.value[0].token : [];
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(VContainer, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VRow, { class: "mb-5" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                var _a, _b;
                if (_push3) {
                  _push3(`<h1 data-v-1bef3340${_scopeId2}>Ordem de Servi\xE7o n\xBA</h1><h1 style="${ssrRenderStyle({ "color": "red", "margin-left": "30px" })}" data-v-1bef3340${_scopeId2}>${ssrInterpolate(unref(numeroOs) || ((_a = ("useCookie" in _ctx ? _ctx.useCookie : unref(useCookie))("user-service").value) == null ? void 0 : _a.numero) || null)}</h1>`);
                } else {
                  return [
                    createVNode("h1", null, "Ordem de Servi\xE7o n\xBA"),
                    createVNode("h1", { style: { "color": "red", "margin-left": "30px" } }, toDisplayString(unref(numeroOs) || ((_b = ("useCookie" in _ctx ? _ctx.useCookie : unref(useCookie))("user-service").value) == null ? void 0 : _b.numero) || null), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(VRow, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VCol, { md: "6" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VAutocomplete, {
                          class: "mr-5",
                          label: "Selecione o Servico",
                          items: unref(servicos),
                          "item-title": "descricao",
                          "item-value": "token",
                          modelValue: unref(selectedServico),
                          "onUpdate:modelValue": ($event) => isRef(selectedServico) ? selectedServico.value = $event : null
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VAutocomplete, {
                            class: "mr-5",
                            label: "Selecione o Servico",
                            items: unref(servicos),
                            "item-title": "descricao",
                            "item-value": "token",
                            modelValue: unref(selectedServico),
                            "onUpdate:modelValue": ($event) => isRef(selectedServico) ? selectedServico.value = $event : null
                          }, null, 8, ["items", "modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VCol, { md: "6" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VAutocomplete, {
                          label: "Selecione o tipo de ato",
                          modelValue: unref(selectedAto),
                          "onUpdate:modelValue": ($event) => isRef(selectedAto) ? selectedAto.value = $event : null,
                          "item-title": "descricao",
                          "item-value": "token",
                          items: unref(atos)
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VAutocomplete, {
                            label: "Selecione o tipo de ato",
                            modelValue: unref(selectedAto),
                            "onUpdate:modelValue": ($event) => isRef(selectedAto) ? selectedAto.value = $event : null,
                            "item-title": "descricao",
                            "item-value": "token",
                            items: unref(atos)
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VCol, { md: "6" }, {
                      default: withCtx(() => [
                        createVNode(VAutocomplete, {
                          class: "mr-5",
                          label: "Selecione o Servico",
                          items: unref(servicos),
                          "item-title": "descricao",
                          "item-value": "token",
                          modelValue: unref(selectedServico),
                          "onUpdate:modelValue": ($event) => isRef(selectedServico) ? selectedServico.value = $event : null
                        }, null, 8, ["items", "modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, { md: "6" }, {
                      default: withCtx(() => [
                        createVNode(VAutocomplete, {
                          label: "Selecione o tipo de ato",
                          modelValue: unref(selectedAto),
                          "onUpdate:modelValue": ($event) => isRef(selectedAto) ? selectedAto.value = $event : null,
                          "item-title": "descricao",
                          "item-value": "token",
                          items: unref(atos)
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(VRow, { class: "mb-5" }, {
                default: withCtx(() => {
                  var _a;
                  return [
                    createVNode("h1", null, "Ordem de Servi\xE7o n\xBA"),
                    createVNode("h1", { style: { "color": "red", "margin-left": "30px" } }, toDisplayString(unref(numeroOs) || ((_a = ("useCookie" in _ctx ? _ctx.useCookie : unref(useCookie))("user-service").value) == null ? void 0 : _a.numero) || null), 1)
                  ];
                }),
                _: 1
              }),
              createVNode(VRow, null, {
                default: withCtx(() => [
                  createVNode(VCol, { md: "6" }, {
                    default: withCtx(() => [
                      createVNode(VAutocomplete, {
                        class: "mr-5",
                        label: "Selecione o Servico",
                        items: unref(servicos),
                        "item-title": "descricao",
                        "item-value": "token",
                        modelValue: unref(selectedServico),
                        "onUpdate:modelValue": ($event) => isRef(selectedServico) ? selectedServico.value = $event : null
                      }, null, 8, ["items", "modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(VCol, { md: "6" }, {
                    default: withCtx(() => [
                      createVNode(VAutocomplete, {
                        label: "Selecione o tipo de ato",
                        modelValue: unref(selectedAto),
                        "onUpdate:modelValue": ($event) => isRef(selectedAto) ? selectedAto.value = $event : null,
                        "item-title": "descricao",
                        "item-value": "token",
                        items: unref(atos)
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      ssrRenderVNode(_push, createVNode(resolveDynamicComponent(unref(selectedComponent)), { ato_token: unref(selectedAto) }, null), _parent);
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/ordens-servicos/criar-ato.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const criarAto = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-1bef3340"]]);

export { criarAto as default };
//# sourceMappingURL=criar-ato-BDiTS2y6.mjs.map