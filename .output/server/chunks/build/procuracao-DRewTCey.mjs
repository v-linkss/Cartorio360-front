import { _ as _sfc_main$5, a as _sfc_main$4, b as _sfc_main$3, c as _sfc_main$2$1, d as _sfc_main$1$1, e as _sfc_main$6 } from './Anexos-SEFlBepe.mjs';
import { _ as _sfc_main$1, a as _sfc_main$2 } from './Imoveis-SaF4uLSg.mjs';
import { ref, mergeProps, withCtx, unref, isRef, createTextVNode, createVNode, openBlock, createBlock, createCommentVNode, useSSRContext } from 'vue';
import { ssrRenderComponent } from 'vue/server-renderer';
import { V as VCard } from './VCard-BqP110Fm.mjs';
import { V as VTabs, a as VTab, d as VTabsWindow, e as VTabsWindowItem } from './VTabs-CugQte4B.mjs';
import './nuxt-link-TpvcaGEw.mjs';
import '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:fs';
import 'node:url';
import 'node:path';
import './server.mjs';
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
import '@vuelidate/core';
import '@vuelidate/validators';
import './fetch-pt4nsUe7.mjs';
import './VRow-DlYJpeem.mjs';
import './VContainer-DT30lSDe.mjs';
import './VCol-HDwo5SVF.mjs';
import './VAutocomplete-CK-tWCuO.mjs';
import './filter-cWQ1Yonf.mjs';
import './VList-D7gG12Ur.mjs';
import './VAvatar-BqhB4Z7D.mjs';
import './VResponsive-BWsCuDwY.mjs';
import './RegistroPessoas-DoVoZmpS.mjs';
import './fetchWithToken-C8MltWUJ.mjs';
import './formatDate-DflkuJ_V.mjs';
import './novo-CWU3oYa5.mjs';
import './editar-BcGPsVK2.mjs';
import './excluido-ceRs5bdR.mjs';
import './VDataTable-C86S73KO.mjs';
import './VDialog-C710R8ST.mjs';
import './FichaCard-LDNNOLnf.mjs';
import 'utif';
import './visualizar-BoZ30DMV.mjs';
import './abre-arquivo-verde-ChzGQ5tU.mjs';
import './Confirmacao-BnNgq5i3.mjs';
import './MoneyInput-ot-UsY0X.mjs';
import 'v-money3';
import './VTextarea-Btp5AP4K.mjs';
import './Atualizar-C7a5nTkn.mjs';

const _sfc_main = {
  __name: "procuracao",
  __ssrInlineRender: true,
  props: {
    ato_token: {
      type: String,
      required: true
    }
  },
  setup(__props) {
    const props = __props;
    const ato_id_prop = ref(null);
    const ato_token_prop = ref(null);
    const pages_prop = ref(null);
    const doc_prop = ref(null);
    const tab = ref(null);
    const showTabs = ref(false);
    const selectedAto = ref(props.ato_token);
    const handleSave = ({ id, token }) => {
      ato_id_prop.value = id;
      ato_token_prop.value = token;
      showTabs.value = true;
    };
    const getPages = (pages) => {
      pages_prop.value = pages;
    };
    const getDocument = (doc) => {
      doc_prop.value = doc;
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ProcuracaoDados = _sfc_main$5;
      const _component_ProcuracaoPartes = _sfc_main$4;
      const _component_ProcuracaoBens = _sfc_main$1;
      const _component_ProcuracaoImoveis = _sfc_main$2;
      const _component_ProcuracaoMinuta = _sfc_main$3;
      const _component_ProcuracaoLivro = _sfc_main$2$1;
      const _component_ProcuracaoObservacao = _sfc_main$1$1;
      const _component_ProcuracaoAnexos = _sfc_main$6;
      _push(ssrRenderComponent(VCard, mergeProps({ width: "1300" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
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
                    _push3(ssrRenderComponent(VTab, { value: "partes" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`Partes`);
                        } else {
                          return [
                            createTextVNode("Partes")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  if (unref(showTabs)) {
                    _push3(ssrRenderComponent(VTab, { value: "bens" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`Bens`);
                        } else {
                          return [
                            createTextVNode("Bens")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  if (unref(showTabs)) {
                    _push3(ssrRenderComponent(VTab, { value: "imoveis" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`Imoveis`);
                        } else {
                          return [
                            createTextVNode("Imoveis")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  if (unref(showTabs)) {
                    _push3(ssrRenderComponent(VTab, { value: "minuta" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`Minuta`);
                        } else {
                          return [
                            createTextVNode("Minuta")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  if (unref(showTabs)) {
                    _push3(ssrRenderComponent(VTab, { value: "livro" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`Livro`);
                        } else {
                          return [
                            createTextVNode("Livro")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  if (unref(showTabs)) {
                    _push3(ssrRenderComponent(VTab, { value: "observacao" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`Observa\xE7\xF5es`);
                        } else {
                          return [
                            createTextVNode("Observa\xE7\xF5es")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  if (unref(showTabs)) {
                    _push3(ssrRenderComponent(VTab, { value: "anexo" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`Anexos`);
                        } else {
                          return [
                            createTextVNode("Anexos")
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
                      value: "partes"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Partes")
                      ]),
                      _: 1
                    })) : createCommentVNode("", true),
                    unref(showTabs) ? (openBlock(), createBlock(VTab, {
                      key: 1,
                      value: "bens"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Bens")
                      ]),
                      _: 1
                    })) : createCommentVNode("", true),
                    unref(showTabs) ? (openBlock(), createBlock(VTab, {
                      key: 2,
                      value: "imoveis"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Imoveis")
                      ]),
                      _: 1
                    })) : createCommentVNode("", true),
                    unref(showTabs) ? (openBlock(), createBlock(VTab, {
                      key: 3,
                      value: "minuta"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Minuta")
                      ]),
                      _: 1
                    })) : createCommentVNode("", true),
                    unref(showTabs) ? (openBlock(), createBlock(VTab, {
                      key: 4,
                      value: "livro"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Livro")
                      ]),
                      _: 1
                    })) : createCommentVNode("", true),
                    unref(showTabs) ? (openBlock(), createBlock(VTab, {
                      key: 5,
                      value: "observacao"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Observa\xE7\xF5es")
                      ]),
                      _: 1
                    })) : createCommentVNode("", true),
                    unref(showTabs) ? (openBlock(), createBlock(VTab, {
                      key: 6,
                      value: "anexo"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Anexos")
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
                        _push4(ssrRenderComponent(_component_ProcuracaoDados, {
                          onSaved: handleSave,
                          ato_token: unref(selectedAto)
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_ProcuracaoDados, {
                            onSaved: handleSave,
                            ato_token: unref(selectedAto)
                          }, null, 8, ["ato_token"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  if (unref(showTabs)) {
                    _push3(ssrRenderComponent(VTabsWindowItem, { value: "partes" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_component_ProcuracaoPartes, {
                            ato_token: unref(selectedAto),
                            ato_id: unref(ato_id_prop)
                          }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_component_ProcuracaoPartes, {
                              ato_token: unref(selectedAto),
                              ato_id: unref(ato_id_prop)
                            }, null, 8, ["ato_token", "ato_id"])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  if (unref(showTabs)) {
                    _push3(ssrRenderComponent(VTabsWindowItem, { value: "bens" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_component_ProcuracaoBens, {
                            ato_token: unref(ato_token_prop),
                            ato_id: unref(ato_id_prop)
                          }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_component_ProcuracaoBens, {
                              ato_token: unref(ato_token_prop),
                              ato_id: unref(ato_id_prop)
                            }, null, 8, ["ato_token", "ato_id"])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  if (unref(showTabs)) {
                    _push3(ssrRenderComponent(VTabsWindowItem, { value: "imoveis" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_component_ProcuracaoImoveis, {
                            ato_token: unref(ato_token_prop),
                            ato_id: unref(ato_id_prop)
                          }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_component_ProcuracaoImoveis, {
                              ato_token: unref(ato_token_prop),
                              ato_id: unref(ato_id_prop)
                            }, null, 8, ["ato_token", "ato_id"])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  if (unref(showTabs)) {
                    _push3(ssrRenderComponent(VTabsWindowItem, { value: "minuta" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_component_ProcuracaoMinuta, {
                            onPage: getPages,
                            onDoc: getDocument,
                            ato_token: unref(ato_token_prop)
                          }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_component_ProcuracaoMinuta, {
                              onPage: getPages,
                              onDoc: getDocument,
                              ato_token: unref(ato_token_prop)
                            }, null, 8, ["ato_token"])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  if (unref(showTabs)) {
                    _push3(ssrRenderComponent(VTabsWindowItem, { value: "livro" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_component_ProcuracaoLivro, {
                            pages: unref(pages_prop),
                            ato_token: unref(ato_token_prop),
                            document: unref(doc_prop)
                          }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_component_ProcuracaoLivro, {
                              pages: unref(pages_prop),
                              ato_token: unref(ato_token_prop),
                              document: unref(doc_prop)
                            }, null, 8, ["pages", "ato_token", "document"])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  if (unref(showTabs)) {
                    _push3(ssrRenderComponent(VTabsWindowItem, { value: "observacao" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_component_ProcuracaoObservacao, { ato_id: unref(ato_id_prop) }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_component_ProcuracaoObservacao, { ato_id: unref(ato_id_prop) }, null, 8, ["ato_id"])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  if (unref(showTabs)) {
                    _push3(ssrRenderComponent(VTabsWindowItem, { value: "anexo" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_component_ProcuracaoAnexos, {
                            ato_token: unref(ato_token_prop),
                            ato_id: unref(ato_id_prop)
                          }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_component_ProcuracaoAnexos, {
                              ato_token: unref(ato_token_prop),
                              ato_id: unref(ato_id_prop)
                            }, null, 8, ["ato_token", "ato_id"])
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
                        createVNode(_component_ProcuracaoDados, {
                          onSaved: handleSave,
                          ato_token: unref(selectedAto)
                        }, null, 8, ["ato_token"])
                      ]),
                      _: 1
                    }),
                    unref(showTabs) ? (openBlock(), createBlock(VTabsWindowItem, {
                      key: 0,
                      value: "partes"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_ProcuracaoPartes, {
                          ato_token: unref(selectedAto),
                          ato_id: unref(ato_id_prop)
                        }, null, 8, ["ato_token", "ato_id"])
                      ]),
                      _: 1
                    })) : createCommentVNode("", true),
                    unref(showTabs) ? (openBlock(), createBlock(VTabsWindowItem, {
                      key: 1,
                      value: "bens"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_ProcuracaoBens, {
                          ato_token: unref(ato_token_prop),
                          ato_id: unref(ato_id_prop)
                        }, null, 8, ["ato_token", "ato_id"])
                      ]),
                      _: 1
                    })) : createCommentVNode("", true),
                    unref(showTabs) ? (openBlock(), createBlock(VTabsWindowItem, {
                      key: 2,
                      value: "imoveis"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_ProcuracaoImoveis, {
                          ato_token: unref(ato_token_prop),
                          ato_id: unref(ato_id_prop)
                        }, null, 8, ["ato_token", "ato_id"])
                      ]),
                      _: 1
                    })) : createCommentVNode("", true),
                    unref(showTabs) ? (openBlock(), createBlock(VTabsWindowItem, {
                      key: 3,
                      value: "minuta"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_ProcuracaoMinuta, {
                          onPage: getPages,
                          onDoc: getDocument,
                          ato_token: unref(ato_token_prop)
                        }, null, 8, ["ato_token"])
                      ]),
                      _: 1
                    })) : createCommentVNode("", true),
                    unref(showTabs) ? (openBlock(), createBlock(VTabsWindowItem, {
                      key: 4,
                      value: "livro"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_ProcuracaoLivro, {
                          pages: unref(pages_prop),
                          ato_token: unref(ato_token_prop),
                          document: unref(doc_prop)
                        }, null, 8, ["pages", "ato_token", "document"])
                      ]),
                      _: 1
                    })) : createCommentVNode("", true),
                    unref(showTabs) ? (openBlock(), createBlock(VTabsWindowItem, {
                      key: 5,
                      value: "observacao"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_ProcuracaoObservacao, { ato_id: unref(ato_id_prop) }, null, 8, ["ato_id"])
                      ]),
                      _: 1
                    })) : createCommentVNode("", true),
                    unref(showTabs) ? (openBlock(), createBlock(VTabsWindowItem, {
                      key: 6,
                      value: "anexo"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_ProcuracaoAnexos, {
                          ato_token: unref(ato_token_prop),
                          ato_id: unref(ato_id_prop)
                        }, null, 8, ["ato_token", "ato_id"])
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
                    value: "partes"
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Partes")
                    ]),
                    _: 1
                  })) : createCommentVNode("", true),
                  unref(showTabs) ? (openBlock(), createBlock(VTab, {
                    key: 1,
                    value: "bens"
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Bens")
                    ]),
                    _: 1
                  })) : createCommentVNode("", true),
                  unref(showTabs) ? (openBlock(), createBlock(VTab, {
                    key: 2,
                    value: "imoveis"
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Imoveis")
                    ]),
                    _: 1
                  })) : createCommentVNode("", true),
                  unref(showTabs) ? (openBlock(), createBlock(VTab, {
                    key: 3,
                    value: "minuta"
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Minuta")
                    ]),
                    _: 1
                  })) : createCommentVNode("", true),
                  unref(showTabs) ? (openBlock(), createBlock(VTab, {
                    key: 4,
                    value: "livro"
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Livro")
                    ]),
                    _: 1
                  })) : createCommentVNode("", true),
                  unref(showTabs) ? (openBlock(), createBlock(VTab, {
                    key: 5,
                    value: "observacao"
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Observa\xE7\xF5es")
                    ]),
                    _: 1
                  })) : createCommentVNode("", true),
                  unref(showTabs) ? (openBlock(), createBlock(VTab, {
                    key: 6,
                    value: "anexo"
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Anexos")
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
                      createVNode(_component_ProcuracaoDados, {
                        onSaved: handleSave,
                        ato_token: unref(selectedAto)
                      }, null, 8, ["ato_token"])
                    ]),
                    _: 1
                  }),
                  unref(showTabs) ? (openBlock(), createBlock(VTabsWindowItem, {
                    key: 0,
                    value: "partes"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_ProcuracaoPartes, {
                        ato_token: unref(selectedAto),
                        ato_id: unref(ato_id_prop)
                      }, null, 8, ["ato_token", "ato_id"])
                    ]),
                    _: 1
                  })) : createCommentVNode("", true),
                  unref(showTabs) ? (openBlock(), createBlock(VTabsWindowItem, {
                    key: 1,
                    value: "bens"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_ProcuracaoBens, {
                        ato_token: unref(ato_token_prop),
                        ato_id: unref(ato_id_prop)
                      }, null, 8, ["ato_token", "ato_id"])
                    ]),
                    _: 1
                  })) : createCommentVNode("", true),
                  unref(showTabs) ? (openBlock(), createBlock(VTabsWindowItem, {
                    key: 2,
                    value: "imoveis"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_ProcuracaoImoveis, {
                        ato_token: unref(ato_token_prop),
                        ato_id: unref(ato_id_prop)
                      }, null, 8, ["ato_token", "ato_id"])
                    ]),
                    _: 1
                  })) : createCommentVNode("", true),
                  unref(showTabs) ? (openBlock(), createBlock(VTabsWindowItem, {
                    key: 3,
                    value: "minuta"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_ProcuracaoMinuta, {
                        onPage: getPages,
                        onDoc: getDocument,
                        ato_token: unref(ato_token_prop)
                      }, null, 8, ["ato_token"])
                    ]),
                    _: 1
                  })) : createCommentVNode("", true),
                  unref(showTabs) ? (openBlock(), createBlock(VTabsWindowItem, {
                    key: 4,
                    value: "livro"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_ProcuracaoLivro, {
                        pages: unref(pages_prop),
                        ato_token: unref(ato_token_prop),
                        document: unref(doc_prop)
                      }, null, 8, ["pages", "ato_token", "document"])
                    ]),
                    _: 1
                  })) : createCommentVNode("", true),
                  unref(showTabs) ? (openBlock(), createBlock(VTabsWindowItem, {
                    key: 5,
                    value: "observacao"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_ProcuracaoObservacao, { ato_id: unref(ato_id_prop) }, null, 8, ["ato_id"])
                    ]),
                    _: 1
                  })) : createCommentVNode("", true),
                  unref(showTabs) ? (openBlock(), createBlock(VTabsWindowItem, {
                    key: 6,
                    value: "anexo"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_ProcuracaoAnexos, {
                        ato_token: unref(ato_token_prop),
                        ato_id: unref(ato_id_prop)
                      }, null, 8, ["ato_token", "ato_id"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/fontes/atos/procuracoes/procuracao.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : undefined;
};

export { _sfc_main as default };
//# sourceMappingURL=procuracao-DRewTCey.mjs.map
