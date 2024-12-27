import { _ as _sfc_main$1 } from './Dados-RxML_POq.mjs';
import { V as VTabs, a as VTab, b as VTabsWindow, c as VTabsWindowItem, _ as _sfc_main$7, d as _sfc_main$6, e as _sfc_main$1$1, f as __nuxt_component_4 } from './Restricoes-TofE_Imy.mjs';
import { ref, reactive, watch, mergeProps, unref, isRef, withCtx, createTextVNode, createVNode, openBlock, createBlock, createCommentVNode, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderStyle } from 'vue/server-renderer';
import { a as VDialog, V as VCard } from './VCard-uMKFEuGZ.mjs';
import { V as VContainer } from './VContainer-Dd724oJ4.mjs';
import { V as VAutocomplete } from './VAutocomplete-D1-afj5_.mjs';

const _sfc_main = {
  __name: "RegistroPessoas",
  __ssrInlineRender: true,
  props: {
    show: Boolean
  },
  emits: ["close"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const isVisible = ref(props.show);
    const emit = __emit;
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
    watch(
      () => props.show,
      (newVal) => {
        isVisible.value = newVal;
      }
    );
    const closeModal = () => {
      isVisible.value = false;
      emit("close");
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Dados = _sfc_main$1;
      const _component_Documentos = _sfc_main$7;
      const _component_Endereco = _sfc_main$6;
      const _component_Biometria = _sfc_main$1$1;
      const _component_Restricoes = __nuxt_component_4;
      _push(ssrRenderComponent(VDialog, mergeProps({
        persistent: "",
        modelValue: unref(isVisible),
        "onUpdate:modelValue": ($event) => isRef(isVisible) ? isVisible.value = $event : null,
        "max-width": "900"
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VCard, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VContainer, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<h1 style="${ssrRenderStyle({ "background-color": "#f5f2f2", "color": "#525050", "padding": "10px 0px 0px 20px" })}"${_scopeId3}> Cadastramento de pessoas </h1><div style="${ssrRenderStyle({ "background-color": "#f5f2f2", "padding": "20px 0px 20px 20px" })}"${_scopeId3}>`);
                        _push4(ssrRenderComponent(VAutocomplete, {
                          modelValue: unref(state).tipo_pessoa,
                          "onUpdate:modelValue": ($event) => unref(state).tipo_pessoa = $event,
                          style: { "width": "200px" },
                          items: pessoa_tipo,
                          label: "Tipo de pessoa",
                          "bg-color": "#F6F6F6",
                          disabled: unref(autocompleteDisabled)
                        }, null, _parent4, _scopeId3));
                        _push4(`</div>`);
                        _push4(ssrRenderComponent(VTabs, {
                          modelValue: unref(tab),
                          "onUpdate:modelValue": ($event) => isRef(tab) ? tab.value = $event : null,
                          "bg-color": "#f5f2f2"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VTab, { value: "dados" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Dados`);
                                  } else {
                                    return [
                                      createTextVNode("Dados")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              if (unref(showTabs)) {
                                _push5(ssrRenderComponent(VTab, { value: "documento" }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(`Documentos`);
                                    } else {
                                      return [
                                        createTextVNode("Documentos")
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent5, _scopeId4));
                              } else {
                                _push5(`<!---->`);
                              }
                              if (unref(showTabs)) {
                                _push5(ssrRenderComponent(VTab, { value: "endereco" }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(`Endere\xE7os`);
                                    } else {
                                      return [
                                        createTextVNode("Endere\xE7os")
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent5, _scopeId4));
                              } else {
                                _push5(`<!---->`);
                              }
                              if (unref(showTabs)) {
                                _push5(ssrRenderComponent(VTab, { value: "biometria" }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(`Biometria`);
                                    } else {
                                      return [
                                        createTextVNode("Biometria")
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent5, _scopeId4));
                              } else {
                                _push5(`<!---->`);
                              }
                              if (unref(showTabs)) {
                                _push5(ssrRenderComponent(VTab, { value: "restricao" }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(`Restri\xE7\xF5es`);
                                    } else {
                                      return [
                                        createTextVNode("Restri\xE7\xF5es")
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent5, _scopeId4));
                              } else {
                                _push5(`<!---->`);
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
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VTabsWindow, {
                          modelValue: unref(tab),
                          "onUpdate:modelValue": ($event) => isRef(tab) ? tab.value = $event : null
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VTabsWindowItem, { value: "dados" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_Dados, {
                                      onSaved: handleSave,
                                      onCloseModal: closeModal,
                                      isModal: true
                                    }, null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(_component_Dados, {
                                        onSaved: handleSave,
                                        onCloseModal: closeModal,
                                        isModal: true
                                      })
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              if (unref(showTabs)) {
                                _push5(ssrRenderComponent(VTabsWindowItem, { value: "documento" }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(ssrRenderComponent(_component_Documentos, {
                                        onCloseModal: closeModal,
                                        isModal: true
                                      }, null, _parent6, _scopeId5));
                                    } else {
                                      return [
                                        createVNode(_component_Documentos, {
                                          onCloseModal: closeModal,
                                          isModal: true
                                        })
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent5, _scopeId4));
                              } else {
                                _push5(`<!---->`);
                              }
                              if (unref(showTabs)) {
                                _push5(ssrRenderComponent(VTabsWindowItem, { value: "endereco" }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(ssrRenderComponent(_component_Endereco, {
                                        onCloseModal: closeModal,
                                        isModal: true
                                      }, null, _parent6, _scopeId5));
                                    } else {
                                      return [
                                        createVNode(_component_Endereco, {
                                          onCloseModal: closeModal,
                                          isModal: true
                                        })
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent5, _scopeId4));
                              } else {
                                _push5(`<!---->`);
                              }
                              if (unref(showTabs)) {
                                _push5(ssrRenderComponent(VTabsWindowItem, { value: "biometria" }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(ssrRenderComponent(VContainer, null, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(ssrRenderComponent(_component_Biometria, {
                                              onCloseModal: closeModal,
                                              isModal: true
                                            }, null, _parent7, _scopeId6));
                                          } else {
                                            return [
                                              createVNode(_component_Biometria, {
                                                onCloseModal: closeModal,
                                                isModal: true
                                              })
                                            ];
                                          }
                                        }),
                                        _: 1
                                      }, _parent6, _scopeId5));
                                    } else {
                                      return [
                                        createVNode(VContainer, null, {
                                          default: withCtx(() => [
                                            createVNode(_component_Biometria, {
                                              onCloseModal: closeModal,
                                              isModal: true
                                            })
                                          ]),
                                          _: 1
                                        })
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent5, _scopeId4));
                              } else {
                                _push5(`<!---->`);
                              }
                              if (unref(showTabs)) {
                                _push5(ssrRenderComponent(VTabsWindowItem, { value: "restricao" }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(ssrRenderComponent(_component_Restricoes, {
                                        onCloseModal: closeModal,
                                        isModal: true
                                      }, null, _parent6, _scopeId5));
                                    } else {
                                      return [
                                        createVNode(_component_Restricoes, {
                                          onCloseModal: closeModal,
                                          isModal: true
                                        })
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent5, _scopeId4));
                              } else {
                                _push5(`<!---->`);
                              }
                            } else {
                              return [
                                createVNode(VTabsWindowItem, { value: "dados" }, {
                                  default: withCtx(() => [
                                    createVNode(_component_Dados, {
                                      onSaved: handleSave,
                                      onCloseModal: closeModal,
                                      isModal: true
                                    })
                                  ]),
                                  _: 1
                                }),
                                unref(showTabs) ? (openBlock(), createBlock(VTabsWindowItem, {
                                  key: 0,
                                  value: "documento"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(_component_Documentos, {
                                      onCloseModal: closeModal,
                                      isModal: true
                                    })
                                  ]),
                                  _: 1
                                })) : createCommentVNode("", true),
                                unref(showTabs) ? (openBlock(), createBlock(VTabsWindowItem, {
                                  key: 1,
                                  value: "endereco"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(_component_Endereco, {
                                      onCloseModal: closeModal,
                                      isModal: true
                                    })
                                  ]),
                                  _: 1
                                })) : createCommentVNode("", true),
                                unref(showTabs) ? (openBlock(), createBlock(VTabsWindowItem, {
                                  key: 2,
                                  value: "biometria"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(VContainer, null, {
                                      default: withCtx(() => [
                                        createVNode(_component_Biometria, {
                                          onCloseModal: closeModal,
                                          isModal: true
                                        })
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
                                    createVNode(_component_Restricoes, {
                                      onCloseModal: closeModal,
                                      isModal: true
                                    })
                                  ]),
                                  _: 1
                                })) : createCommentVNode("", true)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
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
                                  createVNode(_component_Dados, {
                                    onSaved: handleSave,
                                    onCloseModal: closeModal,
                                    isModal: true
                                  })
                                ]),
                                _: 1
                              }),
                              unref(showTabs) ? (openBlock(), createBlock(VTabsWindowItem, {
                                key: 0,
                                value: "documento"
                              }, {
                                default: withCtx(() => [
                                  createVNode(_component_Documentos, {
                                    onCloseModal: closeModal,
                                    isModal: true
                                  })
                                ]),
                                _: 1
                              })) : createCommentVNode("", true),
                              unref(showTabs) ? (openBlock(), createBlock(VTabsWindowItem, {
                                key: 1,
                                value: "endereco"
                              }, {
                                default: withCtx(() => [
                                  createVNode(_component_Endereco, {
                                    onCloseModal: closeModal,
                                    isModal: true
                                  })
                                ]),
                                _: 1
                              })) : createCommentVNode("", true),
                              unref(showTabs) ? (openBlock(), createBlock(VTabsWindowItem, {
                                key: 2,
                                value: "biometria"
                              }, {
                                default: withCtx(() => [
                                  createVNode(VContainer, null, {
                                    default: withCtx(() => [
                                      createVNode(_component_Biometria, {
                                        onCloseModal: closeModal,
                                        isModal: true
                                      })
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
                                  createVNode(_component_Restricoes, {
                                    onCloseModal: closeModal,
                                    isModal: true
                                  })
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
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VContainer, null, {
                      default: withCtx(() => [
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
                                createVNode(_component_Dados, {
                                  onSaved: handleSave,
                                  onCloseModal: closeModal,
                                  isModal: true
                                })
                              ]),
                              _: 1
                            }),
                            unref(showTabs) ? (openBlock(), createBlock(VTabsWindowItem, {
                              key: 0,
                              value: "documento"
                            }, {
                              default: withCtx(() => [
                                createVNode(_component_Documentos, {
                                  onCloseModal: closeModal,
                                  isModal: true
                                })
                              ]),
                              _: 1
                            })) : createCommentVNode("", true),
                            unref(showTabs) ? (openBlock(), createBlock(VTabsWindowItem, {
                              key: 1,
                              value: "endereco"
                            }, {
                              default: withCtx(() => [
                                createVNode(_component_Endereco, {
                                  onCloseModal: closeModal,
                                  isModal: true
                                })
                              ]),
                              _: 1
                            })) : createCommentVNode("", true),
                            unref(showTabs) ? (openBlock(), createBlock(VTabsWindowItem, {
                              key: 2,
                              value: "biometria"
                            }, {
                              default: withCtx(() => [
                                createVNode(VContainer, null, {
                                  default: withCtx(() => [
                                    createVNode(_component_Biometria, {
                                      onCloseModal: closeModal,
                                      isModal: true
                                    })
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
                                createVNode(_component_Restricoes, {
                                  onCloseModal: closeModal,
                                  isModal: true
                                })
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
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(VCard, null, {
                default: withCtx(() => [
                  createVNode(VContainer, null, {
                    default: withCtx(() => [
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
                              createVNode(_component_Dados, {
                                onSaved: handleSave,
                                onCloseModal: closeModal,
                                isModal: true
                              })
                            ]),
                            _: 1
                          }),
                          unref(showTabs) ? (openBlock(), createBlock(VTabsWindowItem, {
                            key: 0,
                            value: "documento"
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_Documentos, {
                                onCloseModal: closeModal,
                                isModal: true
                              })
                            ]),
                            _: 1
                          })) : createCommentVNode("", true),
                          unref(showTabs) ? (openBlock(), createBlock(VTabsWindowItem, {
                            key: 1,
                            value: "endereco"
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_Endereco, {
                                onCloseModal: closeModal,
                                isModal: true
                              })
                            ]),
                            _: 1
                          })) : createCommentVNode("", true),
                          unref(showTabs) ? (openBlock(), createBlock(VTabsWindowItem, {
                            key: 2,
                            value: "biometria"
                          }, {
                            default: withCtx(() => [
                              createVNode(VContainer, null, {
                                default: withCtx(() => [
                                  createVNode(_component_Biometria, {
                                    onCloseModal: closeModal,
                                    isModal: true
                                  })
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
                              createVNode(_component_Restricoes, {
                                onCloseModal: closeModal,
                                isModal: true
                              })
                            ]),
                            _: 1
                          })) : createCommentVNode("", true)
                        ]),
                        _: 1
                      }, 8, ["modelValue", "onUpdate:modelValue"])
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
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Modal/RegistroPessoas.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as _ };
//# sourceMappingURL=RegistroPessoas-BDGCIt8t.mjs.map
