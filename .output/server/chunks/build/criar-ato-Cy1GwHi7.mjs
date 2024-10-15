import { _ as _export_sfc, d as useCookie, b as useRuntimeConfig } from './server.mjs';
import { ref, computed, withAsyncContext, watch, withCtx, unref, isRef, createVNode, resolveDynamicComponent, useSSRContext } from 'vue';
import { u as useFetch } from './fetch-Dsyde8UD.mjs';
import { ssrRenderComponent, ssrRenderVNode } from 'vue/server-renderer';
import _sfc_main$1 from './semelhanca-D8FC2XYz.mjs';
import _sfc_main$2 from './autencidade-6B0TjINj.mjs';
import autenticacao from './autenticacao-BBBwwnjX.mjs';
import { V as VContainer } from './VContainer-chgtNZst.mjs';
import { V as VRow } from './VRow-BuaJrtx0.mjs';
import { V as VCol } from './VCol-uBIoF0At.mjs';
import { V as VAutocomplete } from './salvar-BSOMUYLt.mjs';
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
import './nuxt-link-DyZc7qn_.mjs';
import './visualizar-CsXww5Hd.mjs';
import './mudarStatus-8RJ9gJOS.mjs';
import './sair-CV1ySkp8.mjs';
import './VCard-e7pECtGK.mjs';
import '@vuelidate/core';
import '@vuelidate/validators';

const _sfc_main = {
  __name: "criar-ato",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const config = useRuntimeConfig();
    const getTiposAtos = `${config.public.managemant}/tipoAtos`;
    const usuario_token = useCookie("auth_token").value;
    const cartorio_token = ref(useCookie("user-data").value.cartorio_token).value;
    const components = {
      "/fontes/atos/reconhecimento/semelhanca": _sfc_main$1,
      "/fontes/atos/reconhecimento/autenticidade": _sfc_main$2,
      "/fontes/atos/autenticacao/autenticacao": autenticacao
    };
    const servicos = ref([]);
    const atos = ref([]);
    const selectedServico = ref("");
    const selectedAto = ref("");
    const selectedComponent = computed(() => {
      return components[selectedAto.value];
    });
    const { data } = ([__temp, __restore] = withAsyncContext(() => useFetch(getTiposAtos, {
      method: "POST",
      body: { usuario_token, cartorio_token }
    }, "$eDvF6utwet")), __temp = await __temp, __restore(), __temp);
    servicos.value = data.value.map((servico) => ({
      descricao: servico.descricao,
      atos: JSON.stringify(servico.atos)
    }));
    if (servicos.value.length > 0) {
      selectedServico.value = servicos.value[0].atos;
      atos.value = JSON.parse(servicos.value[0].atos);
      if (atos.value.length > 0) {
        selectedAto.value = atos.value[0].rota;
      }
    }
    watch(selectedServico, (newValue) => {
      if (newValue) {
        atos.value = JSON.parse(newValue);
        selectedAto.value = atos.value.length > 0 ? atos.value[0].rota : "";
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(VContainer, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
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
                          "item-value": "atos",
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
                            "item-value": "atos",
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
                          "item-value": "rota",
                          items: unref(atos)
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VAutocomplete, {
                            label: "Selecione o tipo de ato",
                            modelValue: unref(selectedAto),
                            "onUpdate:modelValue": ($event) => isRef(selectedAto) ? selectedAto.value = $event : null,
                            "item-title": "descricao",
                            "item-value": "rota",
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
                          "item-value": "atos",
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
                          "item-value": "rota",
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
              createVNode(VRow, null, {
                default: withCtx(() => [
                  createVNode(VCol, { md: "6" }, {
                    default: withCtx(() => [
                      createVNode(VAutocomplete, {
                        class: "mr-5",
                        label: "Selecione o Servico",
                        items: unref(servicos),
                        "item-title": "descricao",
                        "item-value": "atos",
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
                        "item-value": "rota",
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
      ssrRenderVNode(_push, createVNode(resolveDynamicComponent(unref(selectedComponent)), null, null), _parent);
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
const criarAto = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-b9909f4c"]]);

export { criarAto as default };
//# sourceMappingURL=criar-ato-Cy1GwHi7.mjs.map
