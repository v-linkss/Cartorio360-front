import { h as _sfc_main$c, b as _sfc_main$b, c as _sfc_main$a, d as _sfc_main$9, e as _sfc_main$8, f as _sfc_main$2, g as __nuxt_component_7 } from './RegistroPessoas-Pzjw_Sfx.mjs';
import { _ as _sfc_main$1 } from './DadosEstrangeira-BbwfXIk2.mjs';
import { ref, reactive, withCtx, unref, isRef, createTextVNode, createVNode, openBlock, createBlock, createCommentVNode, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderStyle } from 'vue/server-renderer';
import { V as VContainer } from './VContainer-CUysD4sO.mjs';
import { V as VCard } from './VCard-CUYv16rw.mjs';
import { V as VAutocomplete } from './VAutocomplete-2evAzH_w.mjs';
import { V as VTabs, a as VTab, d as VTabsWindow, e as VTabsWindowItem } from './VTabs-DIDFsoeu.mjs';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:fs';
import 'node:url';
import 'node:path';
import 'devalue';
import '@unhead/ssr';
import 'unhead';
import '@unhead/shared';
import '@vuelidate/core';
import '@vuelidate/validators';
import './server.mjs';
import 'pinia';
import 'vue-router';
import 'vue3-toastify';
import 'vue-the-mask';
import './asyncData-B13qrLU7.mjs';
import './fetchWithToken-Cjtduyn0.mjs';
import './fetch-DOsfzFYE.mjs';
import './formatDate-DflkuJ_V.mjs';
import './VRow-Bqz0CuIN.mjs';
import './VCol-BT4RzX0Q.mjs';
import './filter-DEBkKozo.mjs';
import './VList-C6CbBWCS.mjs';
import './VAvatar-Ov8UECBZ.mjs';
import './VImg-C5puQtOR.mjs';
import './VResponsive-BwPb2GHE.mjs';
import './nuxt-link-TpvcaGEw.mjs';
import './novo-CWU3oYa5.mjs';
import './editar-BcGPsVK2.mjs';
import './excluido-ceRs5bdR.mjs';
import './VDataTable-BvoCqvdy.mjs';
import './VDialog-BVe31KMa.mjs';
import 'utif';
import './FichaCard-D-EEskri.mjs';
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
      const _component_Dados = _sfc_main$c;
      const _component_DadosJuridica = _sfc_main$b;
      const _component_DadosEstrangeira = _sfc_main$1;
      const _component_Documentos = _sfc_main$a;
      const _component_PessoasCadastrosRepresentantes = _sfc_main$9;
      const _component_Endereco = _sfc_main$8;
      const _component_Biometria = _sfc_main$2;
      const _component_Restricoes = __nuxt_component_7;
      _push(ssrRenderComponent(VContainer, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VCard, { width: "1300" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<h1 style="${ssrRenderStyle({ "background-color": "#f5f2f2", "color": "#525050", "padding": "5px 0px 0px 20px" })}"${_scopeId2}> Cadastramento de pessoas </h1><div style="${ssrRenderStyle({ "background-color": "#f5f2f2", "padding": "5px 0px 0px 20px" })}"${_scopeId2}>`);
                  _push3(ssrRenderComponent(VAutocomplete, {
                    modelValue: unref(state).tipo_pessoa,
                    "onUpdate:modelValue": ($event) => unref(state).tipo_pessoa = $event,
                    style: { "width": "200px" },
                    items: pessoa_tipo,
                    "item-title": "label",
                    "item-value": "value",
                    label: "Tipo de pessoa",
                    "bg-color": "#F6F6F6",
                    disabled: unref(autocompleteDisabled)
                  }, null, _parent3, _scopeId2));
                  _push3(`</div>`);
                  _push3(ssrRenderComponent(VTabs, {
                    modelValue: unref(tab),
                    "onUpdate:modelValue": ($event) => isRef(tab) ? tab.value = $event : null,
                    "bg-color": "#f5f2f2"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VTab, { value: "dados" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Dados`);
                            } else {
                              return [
                                createTextVNode("Dados")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        if (unref(showTabsFisica)) {
                          _push4(ssrRenderComponent(VTab, { value: "documento" }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`Documentos`);
                              } else {
                                return [
                                  createTextVNode("Documentos")
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        } else {
                          _push4(`<!---->`);
                        }
                        if (unref(showTabsJuridica)) {
                          _push4(ssrRenderComponent(VTab, { value: "representante" }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`Representantes`);
                              } else {
                                return [
                                  createTextVNode("Representantes")
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        } else {
                          _push4(`<!---->`);
                        }
                        if (unref(showTabsJuridica) || unref(showTabsFisica)) {
                          _push4(ssrRenderComponent(VTab, { value: "endereco" }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`Endere\xE7os`);
                              } else {
                                return [
                                  createTextVNode("Endere\xE7os")
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        } else {
                          _push4(`<!---->`);
                        }
                        if (unref(showTabsFisica)) {
                          _push4(ssrRenderComponent(VTab, { value: "biometria" }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`Biometria`);
                              } else {
                                return [
                                  createTextVNode("Biometria")
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        } else {
                          _push4(`<!---->`);
                        }
                        if (unref(showTabsJuridica) || unref(showTabsFisica)) {
                          _push4(ssrRenderComponent(VTab, { value: "restricao" }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`Restri\xE7\xF5es`);
                              } else {
                                return [
                                  createTextVNode("Restri\xE7\xF5es")
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        } else {
                          _push4(`<!---->`);
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
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VTabsWindow, {
                    modelValue: unref(tab),
                    "onUpdate:modelValue": ($event) => isRef(tab) ? tab.value = $event : null
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VTabsWindowItem, { value: "dados" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              if (unref(state).tipo_pessoa === "FISICA") {
                                _push5(ssrRenderComponent(_component_Dados, { onSaved: handleSave }, null, _parent5, _scopeId4));
                              } else if (unref(state).tipo_pessoa === "JURIDICA") {
                                _push5(ssrRenderComponent(_component_DadosJuridica, { onSaved: handleSaveJuridica }, null, _parent5, _scopeId4));
                              } else if (unref(state).tipo_pessoa === "ESTRANGEIRA") {
                                _push5(ssrRenderComponent(_component_DadosEstrangeira, { onSaved: handleSave }, null, _parent5, _scopeId4));
                              } else {
                                _push5(`<!---->`);
                              }
                            } else {
                              return [
                                unref(state).tipo_pessoa === "FISICA" ? (openBlock(), createBlock(_component_Dados, {
                                  key: 0,
                                  onSaved: handleSave
                                })) : unref(state).tipo_pessoa === "JURIDICA" ? (openBlock(), createBlock(_component_DadosJuridica, {
                                  key: 1,
                                  onSaved: handleSaveJuridica
                                })) : unref(state).tipo_pessoa === "ESTRANGEIRA" ? (openBlock(), createBlock(_component_DadosEstrangeira, {
                                  key: 2,
                                  onSaved: handleSave
                                })) : createCommentVNode("", true)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        if (unref(showTabsFisica)) {
                          _push4(ssrRenderComponent(VTabsWindowItem, { value: "documento" }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(_component_Documentos, null, null, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(_component_Documentos)
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        } else {
                          _push4(`<!---->`);
                        }
                        if (unref(showTabsJuridica)) {
                          _push4(ssrRenderComponent(VTabsWindowItem, { value: "representante" }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(_component_PessoasCadastrosRepresentantes, null, null, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(_component_PessoasCadastrosRepresentantes)
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        } else {
                          _push4(`<!---->`);
                        }
                        if (unref(showTabsJuridica) || unref(showTabsFisica)) {
                          _push4(ssrRenderComponent(VTabsWindowItem, { value: "endereco" }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(_component_Endereco, null, null, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(_component_Endereco)
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        } else {
                          _push4(`<!---->`);
                        }
                        if (unref(showTabsFisica)) {
                          _push4(ssrRenderComponent(VTabsWindowItem, { value: "biometria" }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(VContainer, { class: "mt-5" }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(ssrRenderComponent(_component_Biometria, null, null, _parent6, _scopeId5));
                                    } else {
                                      return [
                                        createVNode(_component_Biometria)
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent5, _scopeId4));
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
                          }, _parent4, _scopeId3));
                        } else {
                          _push4(`<!---->`);
                        }
                        if (unref(showTabsJuridica) || unref(showTabsFisica)) {
                          _push4(ssrRenderComponent(VTabsWindowItem, { value: "restricao" }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(_component_Restricoes, null, null, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(_component_Restricoes)
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        } else {
                          _push4(`<!---->`);
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
                              })) : unref(state).tipo_pessoa === "ESTRANGEIRA" ? (openBlock(), createBlock(_component_DadosEstrangeira, {
                                key: 2,
                                onSaved: handleSave
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
                  }, _parent3, _scopeId2));
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
                            })) : unref(state).tipo_pessoa === "ESTRANGEIRA" ? (openBlock(), createBlock(_component_DadosEstrangeira, {
                              key: 2,
                              onSaved: handleSave
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
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(VCard, { width: "1300" }, {
                default: withCtx(() => [
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
                          })) : unref(state).tipo_pessoa === "ESTRANGEIRA" ? (openBlock(), createBlock(_component_DadosEstrangeira, {
                            key: 2,
                            onSaved: handleSave
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/pessoas/cadastro/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : undefined;
};

export { _sfc_main as default };
//# sourceMappingURL=index-CfLniQ3C.mjs.map
