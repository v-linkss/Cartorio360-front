import { _ as _sfc_main$1 } from './Dados-Ct4NRW7w.mjs';
import { V as VTabs, a as VTab, b as VTabsWindow, c as VTabsWindowItem, _ as _sfc_main$7, d as _sfc_main$6, e as _sfc_main$1$1, f as __nuxt_component_4 } from './Restricoes-BmnJ34so.mjs';
import { ref, reactive, mergeProps, withCtx, unref, isRef, createTextVNode, createVNode, openBlock, createBlock, createCommentVNode, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderStyle } from 'vue/server-renderer';
import { V as VCard } from './VCard-uMKFEuGZ.mjs';
import { V as VAutocomplete } from './VAutocomplete-D1-afj5_.mjs';
import { V as VContainer } from './VContainer-Dd724oJ4.mjs';
import './server.mjs';
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
import './fetch-bT3G74K0.mjs';
import '@vuelidate/core';
import '@vuelidate/validators';
import './VRow-CVrt2SWs.mjs';
import './VCol-DvbNDJG_.mjs';
import './formatDate-BbsHL418.mjs';
import './mudarStatus-CVlVNUDw.mjs';

const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const tab = ref(null);
    const showTabs = ref(false);
    const autocompleteDisabled = ref(false);
    const initialState = {
      tipo_pessoa: "FISICA"
    };
    const state = reactive({
      ...initialState
    });
    const pessoa_tipo = ["FISICA", "JURIDICA", "ESTRANGEIRA"];
    const handleSave = () => {
      showTabs.value = true;
      autocompleteDisabled.value = true;
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Dados = _sfc_main$1;
      const _component_Documentos = _sfc_main$7;
      const _component_Endereco = _sfc_main$6;
      const _component_Biometria = _sfc_main$1$1;
      const _component_Restricoes = __nuxt_component_4;
      _push(ssrRenderComponent(VCard, mergeProps({ width: "1300" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h1 style="${ssrRenderStyle({ "background-color": "#f5f2f2", "color": "#525050", "padding": "10px 0px 0px 20px" })}"${_scopeId}> Cadastramento de pessoas </h1><div style="${ssrRenderStyle({ "background-color": "#f5f2f2", "padding": "20px 0px 20px 20px" })}"${_scopeId}>`);
            _push2(ssrRenderComponent(VAutocomplete, {
              modelValue: unref(state).tipo_pessoa,
              "onUpdate:modelValue": ($event) => unref(state).tipo_pessoa = $event,
              style: { "width": "200px" },
              items: pessoa_tipo,
              label: "Tipo de pessoa",
              "bg-color": "#F6F6F6",
              disabled: unref(autocompleteDisabled)
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
            _push2(ssrRenderComponent(VTabs, {
              modelValue: unref(tab),
              "onUpdate:modelValue": ($event) => isRef(tab) ? tab.value = $event : null,
              "bg-color": "#f5f2f2"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VTab, { value: "dados" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Dados`);
                      } else {
                        return [
                          createTextVNode("Dados")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  if (unref(showTabs)) {
                    _push3(ssrRenderComponent(VTab, { value: "documento" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`Documentos`);
                        } else {
                          return [
                            createTextVNode("Documentos")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  if (unref(showTabs)) {
                    _push3(ssrRenderComponent(VTab, { value: "endereco" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`Endere\xE7os`);
                        } else {
                          return [
                            createTextVNode("Endere\xE7os")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  if (unref(showTabs)) {
                    _push3(ssrRenderComponent(VTab, { value: "biometria" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`Biometria`);
                        } else {
                          return [
                            createTextVNode("Biometria")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  if (unref(showTabs)) {
                    _push3(ssrRenderComponent(VTab, { value: "restricao" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`Restri\xE7\xF5es`);
                        } else {
                          return [
                            createTextVNode("Restri\xE7\xF5es")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                } else {
                  return [
                    createVNode(VTab, { value: "dados" }, {
                      default: withCtx(() => [
                        createTextVNode("Dados")
                      ]),
                      _: 1
                    }),
                    unref(showTabs) ? (openBlock(), createBlock(VTab, {
                      key: 0,
                      value: "documento"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Documentos")
                      ]),
                      _: 1
                    })) : createCommentVNode("", true),
                    unref(showTabs) ? (openBlock(), createBlock(VTab, {
                      key: 1,
                      value: "endereco"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Endere\xE7os")
                      ]),
                      _: 1
                    })) : createCommentVNode("", true),
                    unref(showTabs) ? (openBlock(), createBlock(VTab, {
                      key: 2,
                      value: "biometria"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Biometria")
                      ]),
                      _: 1
                    })) : createCommentVNode("", true),
                    unref(showTabs) ? (openBlock(), createBlock(VTab, {
                      key: 3,
                      value: "restricao"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Restri\xE7\xF5es")
                      ]),
                      _: 1
                    })) : createCommentVNode("", true)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(VTabsWindow, {
              modelValue: unref(tab),
              "onUpdate:modelValue": ($event) => isRef(tab) ? tab.value = $event : null
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VTabsWindowItem, { value: "dados" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_Dados, { onSaved: handleSave }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_Dados, { onSaved: handleSave })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  if (unref(showTabs)) {
                    _push3(ssrRenderComponent(VTabsWindowItem, { value: "documento" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_component_Documentos, null, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_component_Documentos)
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  if (unref(showTabs)) {
                    _push3(ssrRenderComponent(VTabsWindowItem, { value: "endereco" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_component_Endereco, null, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_component_Endereco)
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  if (unref(showTabs)) {
                    _push3(ssrRenderComponent(VTabsWindowItem, { value: "biometria" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(VContainer, { class: "mt-5" }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(_component_Biometria, null, null, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(_component_Biometria)
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(VContainer, { class: "mt-5" }, {
                              default: withCtx(() => [
                                createVNode(_component_Biometria)
                              ]),
                              _: 1
                            })
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  if (unref(showTabs)) {
                    _push3(ssrRenderComponent(VTabsWindowItem, { value: "restricao" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_component_Restricoes, null, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_component_Restricoes)
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                } else {
                  return [
                    createVNode(VTabsWindowItem, { value: "dados" }, {
                      default: withCtx(() => [
                        createVNode(_component_Dados, { onSaved: handleSave })
                      ]),
                      _: 1
                    }),
                    unref(showTabs) ? (openBlock(), createBlock(VTabsWindowItem, {
                      key: 0,
                      value: "documento"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_Documentos)
                      ]),
                      _: 1
                    })) : createCommentVNode("", true),
                    unref(showTabs) ? (openBlock(), createBlock(VTabsWindowItem, {
                      key: 1,
                      value: "endereco"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_Endereco)
                      ]),
                      _: 1
                    })) : createCommentVNode("", true),
                    unref(showTabs) ? (openBlock(), createBlock(VTabsWindowItem, {
                      key: 2,
                      value: "biometria"
                    }, {
                      default: withCtx(() => [
                        createVNode(VContainer, { class: "mt-5" }, {
                          default: withCtx(() => [
                            createVNode(_component_Biometria)
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    })) : createCommentVNode("", true),
                    unref(showTabs) ? (openBlock(), createBlock(VTabsWindowItem, {
                      key: 3,
                      value: "restricao"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_Restricoes)
                      ]),
                      _: 1
                    })) : createCommentVNode("", true)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode("h1", { style: { "background-color": "#f5f2f2", "color": "#525050", "padding": "10px 0px 0px 20px" } }, " Cadastramento de pessoas "),
              createVNode("div", { style: { "background-color": "#f5f2f2", "padding": "20px 0px 20px 20px" } }, [
                createVNode(VAutocomplete, {
                  modelValue: unref(state).tipo_pessoa,
                  "onUpdate:modelValue": ($event) => unref(state).tipo_pessoa = $event,
                  style: { "width": "200px" },
                  items: pessoa_tipo,
                  label: "Tipo de pessoa",
                  "bg-color": "#F6F6F6",
                  disabled: unref(autocompleteDisabled)
                }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"])
              ]),
              createVNode(VTabs, {
                modelValue: unref(tab),
                "onUpdate:modelValue": ($event) => isRef(tab) ? tab.value = $event : null,
                "bg-color": "#f5f2f2"
              }, {
                default: withCtx(() => [
                  createVNode(VTab, { value: "dados" }, {
                    default: withCtx(() => [
                      createTextVNode("Dados")
                    ]),
                    _: 1
                  }),
                  unref(showTabs) ? (openBlock(), createBlock(VTab, {
                    key: 0,
                    value: "documento"
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Documentos")
                    ]),
                    _: 1
                  })) : createCommentVNode("", true),
                  unref(showTabs) ? (openBlock(), createBlock(VTab, {
                    key: 1,
                    value: "endereco"
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Endere\xE7os")
                    ]),
                    _: 1
                  })) : createCommentVNode("", true),
                  unref(showTabs) ? (openBlock(), createBlock(VTab, {
                    key: 2,
                    value: "biometria"
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Biometria")
                    ]),
                    _: 1
                  })) : createCommentVNode("", true),
                  unref(showTabs) ? (openBlock(), createBlock(VTab, {
                    key: 3,
                    value: "restricao"
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Restri\xE7\xF5es")
                    ]),
                    _: 1
                  })) : createCommentVNode("", true)
                ]),
                _: 1
              }, 8, ["modelValue", "onUpdate:modelValue"]),
              createVNode(VTabsWindow, {
                modelValue: unref(tab),
                "onUpdate:modelValue": ($event) => isRef(tab) ? tab.value = $event : null
              }, {
                default: withCtx(() => [
                  createVNode(VTabsWindowItem, { value: "dados" }, {
                    default: withCtx(() => [
                      createVNode(_component_Dados, { onSaved: handleSave })
                    ]),
                    _: 1
                  }),
                  unref(showTabs) ? (openBlock(), createBlock(VTabsWindowItem, {
                    key: 0,
                    value: "documento"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_Documentos)
                    ]),
                    _: 1
                  })) : createCommentVNode("", true),
                  unref(showTabs) ? (openBlock(), createBlock(VTabsWindowItem, {
                    key: 1,
                    value: "endereco"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_Endereco)
                    ]),
                    _: 1
                  })) : createCommentVNode("", true),
                  unref(showTabs) ? (openBlock(), createBlock(VTabsWindowItem, {
                    key: 2,
                    value: "biometria"
                  }, {
                    default: withCtx(() => [
                      createVNode(VContainer, { class: "mt-5" }, {
                        default: withCtx(() => [
                          createVNode(_component_Biometria)
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })) : createCommentVNode("", true),
                  unref(showTabs) ? (openBlock(), createBlock(VTabsWindowItem, {
                    key: 3,
                    value: "restricao"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_Restricoes)
                    ]),
                    _: 1
                  })) : createCommentVNode("", true)
                ]),
                _: 1
              }, 8, ["modelValue", "onUpdate:modelValue"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/pessoas/cadastro/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-COROPc8e.mjs.map
