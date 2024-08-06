import { _ as __nuxt_component_0 } from './nuxt-link-DyZc7qn_.mjs';
import { _ as _export_sfc, V as VTextField, b as useRuntimeConfig } from './server.mjs';
import { ref, withAsyncContext, unref, mergeProps, withCtx, isRef, createVNode, useSSRContext } from 'vue';
import { u as useLazyFetch } from './fetch-3DdSDKmI.mjs';
import { ssrRenderComponent, ssrRenderStyle, ssrRenderAttr } from 'vue/server-renderer';
import { _ as _imports_1 } from './visualizar-CsXww5Hd.mjs';
import { V as VRow, _ as _imports_0 } from './sair-B9PBMH_8.mjs';
import { _ as _imports_3 } from './salvar-DNXAfpCz.mjs';
import { V as VCard } from './VCard-DoRh_S2C.mjs';
import { V as VContainer } from './VContainer-Mst0JKJ7.mjs';
import { V as VAutocomplete } from './VAutocomplete-BYlFWgTC.mjs';
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

const _sfc_main = {
  __name: "ReconhecimentoFirma",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const config = useRuntimeConfig();
    const pessoasLista = `${config.public.managemant}/getAllPessoa`;
    const pessoa = ref("");
    const { data: pessoasItems, pending } = ([__temp, __restore] = withAsyncContext(() => useLazyFetch(pessoasLista, "$zSQf2ZdhtQ")), __temp = await __temp, __restore(), __temp);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      if (!unref(pending)) {
        _push(ssrRenderComponent(VCard, mergeProps({ title: " Reconhecimento de Firma Presencial" }, _attrs), {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(VContainer, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(VRow, null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<div style="${ssrRenderStyle({ "width": "600px", "margin": "20px 0px 20px 10px" })}" data-v-9ba35c26${_scopeId3}>`);
                          _push4(ssrRenderComponent(VAutocomplete, {
                            modelValue: unref(pessoa),
                            "onUpdate:modelValue": ($event) => isRef(pessoa) ? pessoa.value = $event : null,
                            items: unref(pessoasItems),
                            "item-title": "nome",
                            label: "Tipo de pessoa",
                            "bg-color": "#F6F6F6"
                          }, null, _parent4, _scopeId3));
                          _push4(`</div>`);
                          _push4(ssrRenderComponent(_component_NuxtLink, { to: "/pessoas" }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`<img class="btn-pointer" style="${ssrRenderStyle({ "width": "40px", "height": "40px" })}"${ssrRenderAttr("src", _imports_1)} data-v-9ba35c26${_scopeId4}>`);
                              } else {
                                return [
                                  createVNode("img", {
                                    class: "btn-pointer",
                                    style: { "width": "40px", "height": "40px" },
                                    src: _imports_1
                                  })
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode("div", { style: { "width": "600px", "margin": "20px 0px 20px 10px" } }, [
                              createVNode(VAutocomplete, {
                                modelValue: unref(pessoa),
                                "onUpdate:modelValue": ($event) => isRef(pessoa) ? pessoa.value = $event : null,
                                items: unref(pessoasItems),
                                "item-title": "nome",
                                label: "Tipo de pessoa",
                                "bg-color": "#F6F6F6"
                              }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                            ]),
                            createVNode(_component_NuxtLink, { to: "/pessoas" }, {
                              default: withCtx(() => [
                                createVNode("img", {
                                  class: "btn-pointer",
                                  style: { "width": "40px", "height": "40px" },
                                  src: _imports_1
                                })
                              ]),
                              _: 1
                            })
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(`<div style="${ssrRenderStyle({ "width": "600px", "margin-top": "10px" })}" data-v-9ba35c26${_scopeId2}>`);
                    _push3(ssrRenderComponent(VAutocomplete, { label: "Tabeli\xE3o/escriv\xE3o" }, null, _parent3, _scopeId2));
                    _push3(`</div><div style="${ssrRenderStyle({ "width": "600px", "margin-top": "20px" })}" data-v-9ba35c26${_scopeId2}>`);
                    _push3(ssrRenderComponent(VTextField, { label: "Quantidade" }, null, _parent3, _scopeId2));
                    _push3(`</div>`);
                    _push3(ssrRenderComponent(VRow, null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<img class="btn-pointer"${ssrRenderAttr("src", _imports_0)} alt="Sair" data-v-9ba35c26${_scopeId3}><img class="btn-pointer"${ssrRenderAttr("src", _imports_3)} data-v-9ba35c26${_scopeId3}>`);
                        } else {
                          return [
                            createVNode("img", {
                              class: "btn-pointer",
                              src: _imports_0,
                              alt: "Sair"
                            }),
                            createVNode("img", {
                              class: "btn-pointer",
                              src: _imports_3
                            })
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(VRow, null, {
                        default: withCtx(() => [
                          createVNode("div", { style: { "width": "600px", "margin": "20px 0px 20px 10px" } }, [
                            createVNode(VAutocomplete, {
                              modelValue: unref(pessoa),
                              "onUpdate:modelValue": ($event) => isRef(pessoa) ? pessoa.value = $event : null,
                              items: unref(pessoasItems),
                              "item-title": "nome",
                              label: "Tipo de pessoa",
                              "bg-color": "#F6F6F6"
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                          ]),
                          createVNode(_component_NuxtLink, { to: "/pessoas" }, {
                            default: withCtx(() => [
                              createVNode("img", {
                                class: "btn-pointer",
                                style: { "width": "40px", "height": "40px" },
                                src: _imports_1
                              })
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode("div", { style: { "width": "600px", "margin-top": "10px" } }, [
                        createVNode(VAutocomplete, { label: "Tabeli\xE3o/escriv\xE3o" })
                      ]),
                      createVNode("div", { style: { "width": "600px", "margin-top": "20px" } }, [
                        createVNode(VTextField, { label: "Quantidade" })
                      ]),
                      createVNode(VRow, null, {
                        default: withCtx(() => [
                          createVNode("img", {
                            class: "btn-pointer",
                            src: _imports_0,
                            alt: "Sair"
                          }),
                          createVNode("img", {
                            class: "btn-pointer",
                            src: _imports_3
                          })
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
                createVNode(VContainer, null, {
                  default: withCtx(() => [
                    createVNode(VRow, null, {
                      default: withCtx(() => [
                        createVNode("div", { style: { "width": "600px", "margin": "20px 0px 20px 10px" } }, [
                          createVNode(VAutocomplete, {
                            modelValue: unref(pessoa),
                            "onUpdate:modelValue": ($event) => isRef(pessoa) ? pessoa.value = $event : null,
                            items: unref(pessoasItems),
                            "item-title": "nome",
                            label: "Tipo de pessoa",
                            "bg-color": "#F6F6F6"
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                        ]),
                        createVNode(_component_NuxtLink, { to: "/pessoas" }, {
                          default: withCtx(() => [
                            createVNode("img", {
                              class: "btn-pointer",
                              style: { "width": "40px", "height": "40px" },
                              src: _imports_1
                            })
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode("div", { style: { "width": "600px", "margin-top": "10px" } }, [
                      createVNode(VAutocomplete, { label: "Tabeli\xE3o/escriv\xE3o" })
                    ]),
                    createVNode("div", { style: { "width": "600px", "margin-top": "20px" } }, [
                      createVNode(VTextField, { label: "Quantidade" })
                    ]),
                    createVNode(VRow, null, {
                      default: withCtx(() => [
                        createVNode("img", {
                          class: "btn-pointer",
                          src: _imports_0,
                          alt: "Sair"
                        }),
                        createVNode("img", {
                          class: "btn-pointer",
                          src: _imports_3
                        })
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
      } else {
        _push(`<!---->`);
      }
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/fontes/atos/ReconhecimentoFirma.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const ReconhecimentoFirma = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-9ba35c26"]]);

export { ReconhecimentoFirma as default };
//# sourceMappingURL=ReconhecimentoFirma-DK3Zx2-O.mjs.map
