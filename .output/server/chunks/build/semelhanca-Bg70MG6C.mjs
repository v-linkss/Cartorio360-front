import { _ as __nuxt_component_0 } from './nuxt-link-DyZc7qn_.mjs';
import { u as useRouter$1, c as useRoute$1, d as useCookie, e as VTextField, as as VDataTable, b as useRuntimeConfig } from './server.mjs';
import { ref, reactive, withAsyncContext, withCtx, unref, createVNode, useSSRContext } from 'vue';
import { u as useFetch } from './fetch-Dsyde8UD.mjs';
import { ssrRenderComponent, ssrRenderAttr, ssrRenderStyle } from 'vue/server-renderer';
import { _ as _imports_1 } from './visualizar-CsXww5Hd.mjs';
import { _ as _imports_0 } from './sair-CV1ySkp8.mjs';
import { V as VAutocomplete, _ as _imports_1$1 } from './salvar-BSOMUYLt.mjs';
import { V as VRow } from './VRow-BuaJrtx0.mjs';
import { V as VCol } from './VCol-uBIoF0At.mjs';
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
  __name: "semelhanca",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const router = useRouter$1();
    const route = useRoute$1();
    const config = useRuntimeConfig();
    const allEscreventes = `${config.public.managemant}/listarEscrevente`;
    const cartorio_token = ref(useCookie("user-data").value.cartorio_token).value;
    const headers = [
      {
        title: "Pessoa",
        align: "start",
        key: "name"
      }
    ];
    const items = [
      {
        name: "Intel Core i9-11900K",
        cores: 8,
        threads: 16,
        baseClock: "3.5 GHz",
        boostClock: "5.3 GHz",
        tdp: "125W"
      },
      {
        name: "AMD Ryzen 9 5950X",
        cores: 16,
        threads: 32,
        baseClock: "3.4 GHz",
        boostClock: "4.9 GHz",
        tdp: "105W"
      },
      {
        name: "Intel Core i7-10700K",
        cores: 8,
        threads: 16,
        baseClock: "3.8 GHz",
        boostClock: "5.1 GHz",
        tdp: "125W"
      },
      {
        name: "AMD Ryzen 5 5600X",
        cores: 6,
        threads: 12,
        baseClock: "3.7 GHz",
        boostClock: "4.6 GHz",
        tdp: "65W"
      },
      {
        name: "Intel Core i5-10600K",
        cores: 6,
        threads: 12,
        baseClock: "4.1 GHz",
        boostClock: "4.8 GHz",
        tdp: "125W"
      },
      {
        name: "AMD Ryzen 7 5800X",
        cores: 8,
        threads: 16,
        baseClock: "3.8 GHz",
        boostClock: "4.7 GHz",
        tdp: "105W"
      },
      {
        name: "Intel Core i3-10100",
        cores: 4,
        threads: 8,
        baseClock: "3.6 GHz",
        boostClock: "4.3 GHz",
        tdp: "65W"
      },
      {
        name: "AMD Ryzen 3 3300X",
        cores: 4,
        threads: 8,
        baseClock: "3.8 GHz",
        boostClock: "4.3 GHz",
        tdp: "65W"
      },
      {
        name: "Intel Pentium Gold G6400",
        cores: 2,
        threads: 4,
        baseClock: "4.0 GHz",
        tdp: "58W"
      },
      {
        name: "AMD Athlon 3000G",
        cores: 2,
        threads: 4,
        baseClock: "3.5 GHz",
        tdp: "35W"
      }
    ];
    const state = reactive({
      escrevente: null,
      quantidade: 1
    });
    const escreventesItems = ref([]);
    const { data } = ([__temp, __restore] = withAsyncContext(() => useFetch(allEscreventes, {
      method: "POST",
      body: { cartorio_token }
    }, "$iEFsIjdWdW")), __temp = await __temp, __restore(), __temp);
    escreventesItems.value = data.value[0].func_json_escreventes;
    const goBack = () => {
      const origem = route.query.origem || "criar";
      const id = route.query.id;
      if (origem === "atualizar") {
        router.push(`/ordens-servicos/atualizar/${id}`);
      } else {
        router.push("/ordens-servicos/criar-registro");
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(ssrRenderComponent(VRow, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VCol, { cols: "7" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<h1${_scopeId2}>Reconhecimento por Semelhan\xE7a</h1>`);
                  _push3(ssrRenderComponent(VRow, { class: "mt-5" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VCol, { cols: "8" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VAutocomplete, {
                                label: "Tabeli\xE3o/escrevente",
                                modelValue: unref(state).escrevente,
                                "onUpdate:modelValue": ($event) => unref(state).escrevente = $event,
                                items: unref(escreventesItems),
                                "item-title": "nome",
                                "item-value": "token"
                              }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(VAutocomplete, {
                                  label: "Tabeli\xE3o/escrevente",
                                  modelValue: unref(state).escrevente,
                                  "onUpdate:modelValue": ($event) => unref(state).escrevente = $event,
                                  items: unref(escreventesItems),
                                  "item-title": "nome",
                                  "item-value": "token"
                                }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VCol, { cols: "3" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VTextField, {
                                label: "Quantidade",
                                type: "number",
                                modelValue: unref(state).quantidade,
                                "onUpdate:modelValue": ($event) => unref(state).quantidade = $event
                              }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(VTextField, {
                                  label: "Quantidade",
                                  type: "number",
                                  modelValue: unref(state).quantidade,
                                  "onUpdate:modelValue": ($event) => unref(state).quantidade = $event
                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VCol, { cols: "8" }, {
                            default: withCtx(() => [
                              createVNode(VAutocomplete, {
                                label: "Tabeli\xE3o/escrevente",
                                modelValue: unref(state).escrevente,
                                "onUpdate:modelValue": ($event) => unref(state).escrevente = $event,
                                items: unref(escreventesItems),
                                "item-title": "nome",
                                "item-value": "token"
                              }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                            ]),
                            _: 1
                          }),
                          createVNode(VCol, { cols: "3" }, {
                            default: withCtx(() => [
                              createVNode(VTextField, {
                                label: "Quantidade",
                                type: "number",
                                modelValue: unref(state).quantidade,
                                "onUpdate:modelValue": ($event) => unref(state).quantidade = $event
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VRow, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VCol, { cols: "4" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VTextField, { label: "Documento" }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(VTextField, { label: "Documento" })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VCol, { cols: "6" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VTextField, { label: "Pessoa" }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(VTextField, { label: "Pessoa" })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`<div${_scopeId3}><img class="btn-pointer mt-3"${ssrRenderAttr("src", _imports_1)} style="${ssrRenderStyle({ "width": "40px" })}"${_scopeId3}></div>`);
                      } else {
                        return [
                          createVNode(VCol, { cols: "4" }, {
                            default: withCtx(() => [
                              createVNode(VTextField, { label: "Documento" })
                            ]),
                            _: 1
                          }),
                          createVNode(VCol, { cols: "6" }, {
                            default: withCtx(() => [
                              createVNode(VTextField, { label: "Pessoa" })
                            ]),
                            _: 1
                          }),
                          createVNode("div", null, [
                            createVNode("img", {
                              class: "btn-pointer mt-3",
                              src: _imports_1,
                              style: { "width": "40px" }
                            })
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VDataTable, {
                    headers,
                    items,
                    "show-select": "",
                    "item-key": "id"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VRow, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_NuxtLink, { onClick: goBack }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<img class="btn-pointer mt-10 mb-5"${ssrRenderAttr("src", _imports_0)} alt="Sair" style="${ssrRenderStyle({ "cursor": "pointer" })}"${_scopeId4}>`);
                            } else {
                              return [
                                createVNode("img", {
                                  class: "btn-pointer mt-10 mb-5",
                                  src: _imports_0,
                                  alt: "Sair",
                                  style: { "cursor": "pointer" }
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`<div${_scopeId3}><img class="btn-pointer mt-10 mb-5"${ssrRenderAttr("src", _imports_1$1)}${_scopeId3}></div>`);
                      } else {
                        return [
                          createVNode(_component_NuxtLink, { onClick: goBack }, {
                            default: withCtx(() => [
                              createVNode("img", {
                                class: "btn-pointer mt-10 mb-5",
                                src: _imports_0,
                                alt: "Sair",
                                style: { "cursor": "pointer" }
                              })
                            ]),
                            _: 1
                          }),
                          createVNode("div", null, [
                            createVNode("img", {
                              class: "btn-pointer mt-10 mb-5",
                              src: _imports_1$1
                            })
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode("h1", null, "Reconhecimento por Semelhan\xE7a"),
                    createVNode(VRow, { class: "mt-5" }, {
                      default: withCtx(() => [
                        createVNode(VCol, { cols: "8" }, {
                          default: withCtx(() => [
                            createVNode(VAutocomplete, {
                              label: "Tabeli\xE3o/escrevente",
                              modelValue: unref(state).escrevente,
                              "onUpdate:modelValue": ($event) => unref(state).escrevente = $event,
                              items: unref(escreventesItems),
                              "item-title": "nome",
                              "item-value": "token"
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                          ]),
                          _: 1
                        }),
                        createVNode(VCol, { cols: "3" }, {
                          default: withCtx(() => [
                            createVNode(VTextField, {
                              label: "Quantidade",
                              type: "number",
                              modelValue: unref(state).quantidade,
                              "onUpdate:modelValue": ($event) => unref(state).quantidade = $event
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(VRow, null, {
                      default: withCtx(() => [
                        createVNode(VCol, { cols: "4" }, {
                          default: withCtx(() => [
                            createVNode(VTextField, { label: "Documento" })
                          ]),
                          _: 1
                        }),
                        createVNode(VCol, { cols: "6" }, {
                          default: withCtx(() => [
                            createVNode(VTextField, { label: "Pessoa" })
                          ]),
                          _: 1
                        }),
                        createVNode("div", null, [
                          createVNode("img", {
                            class: "btn-pointer mt-3",
                            src: _imports_1,
                            style: { "width": "40px" }
                          })
                        ])
                      ]),
                      _: 1
                    }),
                    createVNode(VDataTable, {
                      headers,
                      items,
                      "show-select": "",
                      "item-key": "id"
                    }),
                    createVNode(VRow, null, {
                      default: withCtx(() => [
                        createVNode(_component_NuxtLink, { onClick: goBack }, {
                          default: withCtx(() => [
                            createVNode("img", {
                              class: "btn-pointer mt-10 mb-5",
                              src: _imports_0,
                              alt: "Sair",
                              style: { "cursor": "pointer" }
                            })
                          ]),
                          _: 1
                        }),
                        createVNode("div", null, [
                          createVNode("img", {
                            class: "btn-pointer mt-10 mb-5",
                            src: _imports_1$1
                          })
                        ])
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(VCol, { cols: "5" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VDataTable, {
                    class: "mt-5",
                    headers,
                    items,
                    "item-key": "id"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VDataTable, {
                      class: "mt-5",
                      headers,
                      items,
                      "item-key": "id"
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(VCol, { cols: "7" }, {
                default: withCtx(() => [
                  createVNode("h1", null, "Reconhecimento por Semelhan\xE7a"),
                  createVNode(VRow, { class: "mt-5" }, {
                    default: withCtx(() => [
                      createVNode(VCol, { cols: "8" }, {
                        default: withCtx(() => [
                          createVNode(VAutocomplete, {
                            label: "Tabeli\xE3o/escrevente",
                            modelValue: unref(state).escrevente,
                            "onUpdate:modelValue": ($event) => unref(state).escrevente = $event,
                            items: unref(escreventesItems),
                            "item-title": "nome",
                            "item-value": "token"
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                        ]),
                        _: 1
                      }),
                      createVNode(VCol, { cols: "3" }, {
                        default: withCtx(() => [
                          createVNode(VTextField, {
                            label: "Quantidade",
                            type: "number",
                            modelValue: unref(state).quantidade,
                            "onUpdate:modelValue": ($event) => unref(state).quantidade = $event
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode(VRow, null, {
                    default: withCtx(() => [
                      createVNode(VCol, { cols: "4" }, {
                        default: withCtx(() => [
                          createVNode(VTextField, { label: "Documento" })
                        ]),
                        _: 1
                      }),
                      createVNode(VCol, { cols: "6" }, {
                        default: withCtx(() => [
                          createVNode(VTextField, { label: "Pessoa" })
                        ]),
                        _: 1
                      }),
                      createVNode("div", null, [
                        createVNode("img", {
                          class: "btn-pointer mt-3",
                          src: _imports_1,
                          style: { "width": "40px" }
                        })
                      ])
                    ]),
                    _: 1
                  }),
                  createVNode(VDataTable, {
                    headers,
                    items,
                    "show-select": "",
                    "item-key": "id"
                  }),
                  createVNode(VRow, null, {
                    default: withCtx(() => [
                      createVNode(_component_NuxtLink, { onClick: goBack }, {
                        default: withCtx(() => [
                          createVNode("img", {
                            class: "btn-pointer mt-10 mb-5",
                            src: _imports_0,
                            alt: "Sair",
                            style: { "cursor": "pointer" }
                          })
                        ]),
                        _: 1
                      }),
                      createVNode("div", null, [
                        createVNode("img", {
                          class: "btn-pointer mt-10 mb-5",
                          src: _imports_1$1
                        })
                      ])
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(VCol, { cols: "5" }, {
                default: withCtx(() => [
                  createVNode(VDataTable, {
                    class: "mt-5",
                    headers,
                    items,
                    "item-key": "id"
                  })
                ]),
                _: 1
              })
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/fontes/atos/reconhecimento/semelhanca.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=semelhanca-Bg70MG6C.mjs.map
