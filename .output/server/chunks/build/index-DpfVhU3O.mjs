import { V as VTabs, a as VTab, b as VTabsWindow, c as VTabsWindowItem, j as _sfc_main$b, d as _sfc_main$a, e as _sfc_main$9, f as _sfc_main$8, g as _sfc_main$7, h as _sfc_main$2, i as __nuxt_component_6 } from './RegistroPessoas-B1rh_yfM.mjs';
import { ref, reactive, mergeProps, withCtx, unref, isRef, createTextVNode, createVNode, openBlock, createBlock, createCommentVNode, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderStyle } from 'vue/server-renderer';
import { V as VCard } from './VDialog-BnIkuznU.mjs';
import { V as VAutocomplete } from './VAutocomplete-DmQ99COP.mjs';
import { V as VContainer } from './VContainer-BOtutO2k.mjs';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import '../runtime.mjs';
import 'node:http';
import 'node:https';
import 'fs';
import 'path';
import 'node:fs';
import 'node:url';
import 'devalue';
import '@unhead/ssr';
import 'unhead';
import '@unhead/shared';
import './server.mjs';
import 'vue-router';
import 'vue3-toastify';
import 'vue-the-mask';
import './fetch-bT3G74K0.mjs';
import '@vuelidate/core';
import '@vuelidate/validators';
import './VRow-B_iA44Vb.mjs';
import './VCol-B4e6QNL9.mjs';
import './filter-DxEBKIwJ.mjs';
import './VList-CYYVz_6B.mjs';
import './VAvatar-CJ4Ett-u.mjs';
import './VResponsive-CDbSCp4e.mjs';
import './nuxt-link-DyZc7qn_.mjs';
import './formatDate-BbsHL418.mjs';
import './VDataTable-CE_HhQ7P.mjs';
import './visualizar-BoZ30DMV.mjs';

const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const tab = ref("dados");
    const showTabsFisica = ref(false);
    const showTabsJuridica = ref(false);
    const autocompleteDisabled = ref(false);
    const state = reactive({
      tipo_pessoa: "FISICA"
    });
    const pessoa_tipo = [
      { label: "F\xCDSICA", value: "FISICA" },
      { label: "JUR\xCDDICA", value: "JURIDICA" },
      { label: "ESTRANGEIRA", value: "ESTRANGEIRA" }
    ];
    const handleSave = () => {
      showTabsFisica.value = true;
      autocompleteDisabled.value = true;
    };
    const handleSaveJuridica = () => {
      showTabsJuridica.value = true;
      autocompleteDisabled.value = true;
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Dados = _sfc_main$b;
      const _component_DadosJuridica = _sfc_main$a;
      const _component_Documentos = _sfc_main$9;
      const _component_PessoasCadastrosRepresentantes = _sfc_main$8;
      const _component_Endereco = _sfc_main$7;
      const _component_Biometria = _sfc_main$2;
      const _component_Restricoes = __nuxt_component_6;
      _push(ssrRenderComponent(VCard, mergeProps({ width: "1300" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h1 style="${ssrRenderStyle({ "background-color": "#f5f2f2", "color": "#525050", "padding": "5px 0px 0px 20px" })}"${_scopeId}> Cadastramento de pessoas </h1><div style="${ssrRenderStyle({ "background-color": "#f5f2f2", "padding": "5px 0px 0px 20px" })}"${_scopeId}>`);
            _push2(ssrRenderComponent(VAutocomplete, {
              modelValue: unref(state).tipo_pessoa,
              "onUpdate:modelValue": ($event) => unref(state).tipo_pessoa = $event,
              style: { "width": "200px" },
              items: pessoa_tipo,
              "item-title": "label",
              "item-value": "value",
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
                  if (unref(showTabsFisica)) {
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
                  if (unref(showTabsJuridica)) {
                    _push3(ssrRenderComponent(VTab, { value: "representante" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`Representantes`);
                        } else {
                          return [
                            createTextVNode("Representantes")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  if (unref(showTabsJuridica) || unref(showTabsFisica)) {
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
                  if (unref(showTabsFisica)) {
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
                  if (unref(showTabsJuridica) || unref(showTabsFisica)) {
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
                    unref(showTabsFisica) ? (openBlock(), createBlock(VTab, {
                      key: 0,
                      value: "documento"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Documentos")
                      ]),
                      _: 1
                    })) : createCommentVNode("", true),
                    unref(showTabsJuridica) ? (openBlock(), createBlock(VTab, {
                      key: 1,
                      value: "representante"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Representantes")
                      ]),
                      _: 1
                    })) : createCommentVNode("", true),
                    unref(showTabsJuridica) || unref(showTabsFisica) ? (openBlock(), createBlock(VTab, {
                      key: 2,
                      value: "endereco"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Endere\xE7os")
                      ]),
                      _: 1
                    })) : createCommentVNode("", true),
                    unref(showTabsFisica) ? (openBlock(), createBlock(VTab, {
                      key: 3,
                      value: "biometria"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Biometria")
                      ]),
                      _: 1
                    })) : createCommentVNode("", true),
                    unref(showTabsJuridica) || unref(showTabsFisica) ? (openBlock(), createBlock(VTab, {
                      key: 4,
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
                        if (unref(state).tipo_pessoa === "FISICA") {
                          _push4(ssrRenderComponent(_component_Dados, { onSaved: handleSave }, null, _parent4, _scopeId3));
                        } else if (unref(state).tipo_pessoa === "JURIDICA") {
                          _push4(ssrRenderComponent(_component_DadosJuridica, { onSaved: handleSaveJuridica }, null, _parent4, _scopeId3));
                        } else {
                          _push4(`<!---->`);
                        }
                      } else {
                        return [
                          unref(state).tipo_pessoa === "FISICA" ? (openBlock(), createBlock(_component_Dados, {
                            key: 0,
                            onSaved: handleSave
                          })) : unref(state).tipo_pessoa === "JURIDICA" ? (openBlock(), createBlock(_component_DadosJuridica, {
                            key: 1,
                            onSaved: handleSaveJuridica
                          })) : createCommentVNode("", true)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  if (unref(showTabsFisica)) {
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
                  if (unref(showTabsJuridica)) {
                    _push3(ssrRenderComponent(VTabsWindowItem, { value: "representante" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_component_PessoasCadastrosRepresentantes, null, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_component_PessoasCadastrosRepresentantes)
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  if (unref(showTabsJuridica) || unref(showTabsFisica)) {
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
                  if (unref(showTabsFisica)) {
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
                  if (unref(showTabsJuridica) || unref(showTabsFisica)) {
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
                        unref(state).tipo_pessoa === "FISICA" ? (openBlock(), createBlock(_component_Dados, {
                          key: 0,
                          onSaved: handleSave
                        })) : unref(state).tipo_pessoa === "JURIDICA" ? (openBlock(), createBlock(_component_DadosJuridica, {
                          key: 1,
                          onSaved: handleSaveJuridica
                        })) : createCommentVNode("", true)
                      ]),
                      _: 1
                    }),
                    unref(showTabsFisica) ? (openBlock(), createBlock(VTabsWindowItem, {
                      key: 0,
                      value: "documento"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_Documentos)
                      ]),
                      _: 1
                    })) : createCommentVNode("", true),
                    unref(showTabsJuridica) ? (openBlock(), createBlock(VTabsWindowItem, {
                      key: 1,
                      value: "representante"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_PessoasCadastrosRepresentantes)
                      ]),
                      _: 1
                    })) : createCommentVNode("", true),
                    unref(showTabsJuridica) || unref(showTabsFisica) ? (openBlock(), createBlock(VTabsWindowItem, {
                      key: 2,
                      value: "endereco"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_Endereco)
                      ]),
                      _: 1
                    })) : createCommentVNode("", true),
                    unref(showTabsFisica) ? (openBlock(), createBlock(VTabsWindowItem, {
                      key: 3,
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
                    unref(showTabsJuridica) || unref(showTabsFisica) ? (openBlock(), createBlock(VTabsWindowItem, {
                      key: 4,
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
              createVNode("h1", { style: { "background-color": "#f5f2f2", "color": "#525050", "padding": "5px 0px 0px 20px" } }, " Cadastramento de pessoas "),
              createVNode("div", { style: { "background-color": "#f5f2f2", "padding": "5px 0px 0px 20px" } }, [
                createVNode(VAutocomplete, {
                  modelValue: unref(state).tipo_pessoa,
                  "onUpdate:modelValue": ($event) => unref(state).tipo_pessoa = $event,
                  style: { "width": "200px" },
                  items: pessoa_tipo,
                  "item-title": "label",
                  "item-value": "value",
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
                  unref(showTabsFisica) ? (openBlock(), createBlock(VTab, {
                    key: 0,
                    value: "documento"
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Documentos")
                    ]),
                    _: 1
                  })) : createCommentVNode("", true),
                  unref(showTabsJuridica) ? (openBlock(), createBlock(VTab, {
                    key: 1,
                    value: "representante"
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Representantes")
                    ]),
                    _: 1
                  })) : createCommentVNode("", true),
                  unref(showTabsJuridica) || unref(showTabsFisica) ? (openBlock(), createBlock(VTab, {
                    key: 2,
                    value: "endereco"
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Endere\xE7os")
                    ]),
                    _: 1
                  })) : createCommentVNode("", true),
                  unref(showTabsFisica) ? (openBlock(), createBlock(VTab, {
                    key: 3,
                    value: "biometria"
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Biometria")
                    ]),
                    _: 1
                  })) : createCommentVNode("", true),
                  unref(showTabsJuridica) || unref(showTabsFisica) ? (openBlock(), createBlock(VTab, {
                    key: 4,
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
                      unref(state).tipo_pessoa === "FISICA" ? (openBlock(), createBlock(_component_Dados, {
                        key: 0,
                        onSaved: handleSave
                      })) : unref(state).tipo_pessoa === "JURIDICA" ? (openBlock(), createBlock(_component_DadosJuridica, {
                        key: 1,
                        onSaved: handleSaveJuridica
                      })) : createCommentVNode("", true)
                    ]),
                    _: 1
                  }),
                  unref(showTabsFisica) ? (openBlock(), createBlock(VTabsWindowItem, {
                    key: 0,
                    value: "documento"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_Documentos)
                    ]),
                    _: 1
                  })) : createCommentVNode("", true),
                  unref(showTabsJuridica) ? (openBlock(), createBlock(VTabsWindowItem, {
                    key: 1,
                    value: "representante"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_PessoasCadastrosRepresentantes)
                    ]),
                    _: 1
                  })) : createCommentVNode("", true),
                  unref(showTabsJuridica) || unref(showTabsFisica) ? (openBlock(), createBlock(VTabsWindowItem, {
                    key: 2,
                    value: "endereco"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_Endereco)
                    ]),
                    _: 1
                  })) : createCommentVNode("", true),
                  unref(showTabsFisica) ? (openBlock(), createBlock(VTabsWindowItem, {
                    key: 3,
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
                  unref(showTabsJuridica) || unref(showTabsFisica) ? (openBlock(), createBlock(VTabsWindowItem, {
                    key: 4,
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
//# sourceMappingURL=index-DpfVhU3O.mjs.map
