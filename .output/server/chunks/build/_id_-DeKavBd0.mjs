import { _ as _sfc_main$6, a as _sfc_main$5, b as _sfc_main$4, c as _sfc_main$3, d as _sfc_main$2, e as _sfc_main$1, f as _sfc_main$7 } from './TiposAtos-C6orTGZU.mjs';
import { ref, withAsyncContext, withCtx, unref, createVNode, toDisplayString, isRef, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderStyle, ssrInterpolate, ssrRenderAttr } from 'vue/server-renderer';
import { _ as _imports_1 } from './editar-BcGPsVK2.mjs';
import { aZ as useRoute$1, e as useCookie, c as useRuntimeConfig } from './server.mjs';
import { f as fetchWithToken } from './fetchWithToken-D8Xr_sCB.mjs';
import { V as VRow } from './VRow-DVf727cH.mjs';
import { V as VCol } from './VCol-D9_5u2PU.mjs';
import { V as VAutocomplete } from './VAutocomplete-DqtW1GoU.mjs';
import { V as VCard } from './VCard-sRL_sqEi.mjs';
import { V as VTabs, a as VTab, d as VTabsWindow, e as VTabsWindowItem } from './VTabs-DRgtA1OR.mjs';
import './nuxt-link-TpvcaGEw.mjs';
import '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:fs';
import 'node:url';
import 'node:path';
import './fetch-78FO9XjX.mjs';
import './VContainer-CTpFP9Uv.mjs';
import './RegistroPessoas-bLULNXQh.mjs';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'devalue';
import '@unhead/ssr';
import 'unhead';
import '@unhead/shared';
import '@vuelidate/core';
import '@vuelidate/validators';
import './formatDate-DflkuJ_V.mjs';
import './filter-BuIQEza-.mjs';
import './VList-Bep3Frr6.mjs';
import './VAvatar-D7LEgnBn.mjs';
import './VResponsive-Cv_UVb0M.mjs';
import './novo-CWU3oYa5.mjs';
import './excluido-ceRs5bdR.mjs';
import './VDataTable-DScAK-sC.mjs';
import './VDialog-x7_nItFY.mjs';
import 'utif';
import './visualizar-BoZ30DMV.mjs';
import './abre-arquivo-verde-CNI-tG9Q.mjs';
import './Confirmacao-BXaYxSTg.mjs';
import '@syncfusion/ej2-vue-documenteditor';
import '@syncfusion/ej2-base';
import 'pinia';
import 'vue-router';
import 'vue3-toastify';
import 'vue-the-mask';

const _sfc_main = {
  __name: "[id]",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const pages_prop = ref(null);
    const doc_prop = ref(null);
    const modalVisible = ref(false);
    const tab = ref(null);
    const config = useRuntimeConfig();
    const route = useRoute$1();
    const allSituacoes = `${config.public.auth}/service/gerencia/listarSituacoes`;
    const getAtoId = `${config.public.auth}/service/gerencia/getAtos`;
    const cartorio_token = ref(useCookie("user-data").value.cartorio_token);
    const body = route.query.id ? { ato_token: route.query.tipo_ato_token } : { cartorio_token };
    const situacoesItems = ref([]);
    const dadosData = ref([]);
    const label = ref("PROCURA\xC7\xD5ES");
    ref("PROCURA\xC7\xC3O GERAL");
    async function loadData() {
      try {
        const { data: tipoAtoId } = await fetchWithToken(
          `${getAtoId}/${route.query.ato_id}`,
          {
            method: "GET"
          }
        );
        dadosData.value = tipoAtoId.value;
      } catch (error) {
        console.log(error);
      }
    }
    [__temp, __restore] = withAsyncContext(() => loadData()), await __temp, __restore();
    const { data: situacaoData, status } = ([__temp, __restore] = withAsyncContext(() => fetchWithToken(allSituacoes, {
      method: "POST",
      body
    })), __temp = await __temp, __restore(), __temp);
    situacoesItems.value = situacaoData.value;
    const getPages = (pages) => {
      pages_prop.value = pages;
    };
    const getDocument = (doc) => {
      doc_prop.value = doc;
    };
    function openModal() {
      if (!dadosData.dt_lavratura) {
        modalVisible.value = true;
      }
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ProcuracaoAtualizarDados = _sfc_main$6;
      const _component_ProcuracaoAtualizarPartes = _sfc_main$5;
      const _component_ProcuracaoAtualizarMinuta = _sfc_main$4;
      const _component_ProcuracaoAtualizarLivro = _sfc_main$3;
      const _component_ProcuracaoAtualizarObservacao = _sfc_main$2;
      const _component_ProcuracaoAtualizarAnexos = _sfc_main$1;
      const _component_ModalTiposAtos = _sfc_main$7;
      _push(`<!--[--><div class="mb-10">`);
      _push(ssrRenderComponent(VRow, { class: "mb-5 mt-5" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h1${_scopeId}>Ordem de Servi\xE7o n\xBA</h1><h1 style="${ssrRenderStyle({ "color": "red", "margin-left": "30px" })}"${_scopeId}>${ssrInterpolate(unref(route).query.numero_os)}</h1>`);
          } else {
            return [
              createVNode("h1", null, "Ordem de Servi\xE7o n\xBA"),
              createVNode("h1", { style: { "color": "red", "margin-left": "30px" } }, toDisplayString(unref(route).query.numero_os), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(VRow, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VCol, { md: "6" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VAutocomplete, {
                    class: "mr-5",
                    modelValue: unref(label),
                    "onUpdate:modelValue": ($event) => isRef(label) ? label.value = $event : null,
                    disabled: ""
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VAutocomplete, {
                      class: "mr-5",
                      modelValue: unref(label),
                      "onUpdate:modelValue": ($event) => isRef(label) ? label.value = $event : null,
                      disabled: ""
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(VCol, { md: "5" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VAutocomplete, {
                    modelValue: unref(route).query.tipo_ato,
                    "onUpdate:modelValue": ($event) => unref(route).query.tipo_ato = $event,
                    disabled: ""
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VAutocomplete, {
                      modelValue: unref(route).query.tipo_ato,
                      "onUpdate:modelValue": ($event) => unref(route).query.tipo_ato = $event,
                      disabled: ""
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<div${_scopeId}><img class="mt-2" style="${ssrRenderStyle({
              cursor: unref(dadosData).dt_lavratura ? "default" : "pointer",
              width: "35px",
              height: "35px"
            })}"${ssrRenderAttr("src", _imports_1)} alt="Editar"${_scopeId}></div>`);
          } else {
            return [
              createVNode(VCol, { md: "6" }, {
                default: withCtx(() => [
                  createVNode(VAutocomplete, {
                    class: "mr-5",
                    modelValue: unref(label),
                    "onUpdate:modelValue": ($event) => isRef(label) ? label.value = $event : null,
                    disabled: ""
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              }),
              createVNode(VCol, { md: "5" }, {
                default: withCtx(() => [
                  createVNode(VAutocomplete, {
                    modelValue: unref(route).query.tipo_ato,
                    "onUpdate:modelValue": ($event) => unref(route).query.tipo_ato = $event,
                    disabled: ""
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              }),
              createVNode("div", null, [
                createVNode("img", {
                  class: "mt-2",
                  style: {
                    cursor: unref(dadosData).dt_lavratura ? "default" : "pointer",
                    width: "35px",
                    height: "35px"
                  },
                  src: _imports_1,
                  alt: "Editar",
                  onClick: openModal
                }, null, 4)
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(VCard, { width: "1300" }, {
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
                  return [
                    createVNode(VTab, { value: "dados" }, {
                      default: withCtx(() => [
                        createTextVNode("Dados")
                      ]),
                      _: 1
                    }),
                    createVNode(VTab, { value: "partes" }, {
                      default: withCtx(() => [
                        createTextVNode("Partes")
                      ]),
                      _: 1
                    }),
                    createVNode(VTab, { value: "minuta" }, {
                      default: withCtx(() => [
                        createTextVNode("Minuta")
                      ]),
                      _: 1
                    }),
                    createVNode(VTab, { value: "livro" }, {
                      default: withCtx(() => [
                        createTextVNode("Livro")
                      ]),
                      _: 1
                    }),
                    createVNode(VTab, { value: "observacao" }, {
                      default: withCtx(() => [
                        createTextVNode("Observa\xE7\xF5es")
                      ]),
                      _: 1
                    }),
                    createVNode(VTab, { value: "anexo" }, {
                      default: withCtx(() => [
                        createTextVNode("Anexos")
                      ]),
                      _: 1
                    })
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
                        _push4(ssrRenderComponent(_component_ProcuracaoAtualizarDados, {
                          item_dados: unref(dadosData),
                          item_situacoes: unref(situacoesItems)
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_ProcuracaoAtualizarDados, {
                            item_dados: unref(dadosData),
                            item_situacoes: unref(situacoesItems)
                          }, null, 8, ["item_dados", "item_situacoes"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VTabsWindowItem, { value: "partes" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_ProcuracaoAtualizarPartes, null, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_ProcuracaoAtualizarPartes)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VTabsWindowItem, { value: "minuta" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_ProcuracaoAtualizarMinuta, {
                          onPage: getPages,
                          onDoc: getDocument
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_ProcuracaoAtualizarMinuta, {
                            onPage: getPages,
                            onDoc: getDocument
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VTabsWindowItem, { value: "livro" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_ProcuracaoAtualizarLivro, {
                          pages: unref(pages_prop),
                          document: unref(doc_prop)
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_ProcuracaoAtualizarLivro, {
                            pages: unref(pages_prop),
                            document: unref(doc_prop)
                          }, null, 8, ["pages", "document"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VTabsWindowItem, { value: "observacao" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_ProcuracaoAtualizarObservacao, null, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_ProcuracaoAtualizarObservacao)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VTabsWindowItem, { value: "anexo" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_ProcuracaoAtualizarAnexos, null, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_ProcuracaoAtualizarAnexos)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VTabsWindowItem, { value: "dados" }, {
                      default: withCtx(() => [
                        createVNode(_component_ProcuracaoAtualizarDados, {
                          item_dados: unref(dadosData),
                          item_situacoes: unref(situacoesItems)
                        }, null, 8, ["item_dados", "item_situacoes"])
                      ]),
                      _: 1
                    }),
                    createVNode(VTabsWindowItem, { value: "partes" }, {
                      default: withCtx(() => [
                        createVNode(_component_ProcuracaoAtualizarPartes)
                      ]),
                      _: 1
                    }),
                    createVNode(VTabsWindowItem, { value: "minuta" }, {
                      default: withCtx(() => [
                        createVNode(_component_ProcuracaoAtualizarMinuta, {
                          onPage: getPages,
                          onDoc: getDocument
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(VTabsWindowItem, { value: "livro" }, {
                      default: withCtx(() => [
                        createVNode(_component_ProcuracaoAtualizarLivro, {
                          pages: unref(pages_prop),
                          document: unref(doc_prop)
                        }, null, 8, ["pages", "document"])
                      ]),
                      _: 1
                    }),
                    createVNode(VTabsWindowItem, { value: "observacao" }, {
                      default: withCtx(() => [
                        createVNode(_component_ProcuracaoAtualizarObservacao)
                      ]),
                      _: 1
                    }),
                    createVNode(VTabsWindowItem, { value: "anexo" }, {
                      default: withCtx(() => [
                        createVNode(_component_ProcuracaoAtualizarAnexos)
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
                  createVNode(VTab, { value: "partes" }, {
                    default: withCtx(() => [
                      createTextVNode("Partes")
                    ]),
                    _: 1
                  }),
                  createVNode(VTab, { value: "minuta" }, {
                    default: withCtx(() => [
                      createTextVNode("Minuta")
                    ]),
                    _: 1
                  }),
                  createVNode(VTab, { value: "livro" }, {
                    default: withCtx(() => [
                      createTextVNode("Livro")
                    ]),
                    _: 1
                  }),
                  createVNode(VTab, { value: "observacao" }, {
                    default: withCtx(() => [
                      createTextVNode("Observa\xE7\xF5es")
                    ]),
                    _: 1
                  }),
                  createVNode(VTab, { value: "anexo" }, {
                    default: withCtx(() => [
                      createTextVNode("Anexos")
                    ]),
                    _: 1
                  })
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
                      createVNode(_component_ProcuracaoAtualizarDados, {
                        item_dados: unref(dadosData),
                        item_situacoes: unref(situacoesItems)
                      }, null, 8, ["item_dados", "item_situacoes"])
                    ]),
                    _: 1
                  }),
                  createVNode(VTabsWindowItem, { value: "partes" }, {
                    default: withCtx(() => [
                      createVNode(_component_ProcuracaoAtualizarPartes)
                    ]),
                    _: 1
                  }),
                  createVNode(VTabsWindowItem, { value: "minuta" }, {
                    default: withCtx(() => [
                      createVNode(_component_ProcuracaoAtualizarMinuta, {
                        onPage: getPages,
                        onDoc: getDocument
                      })
                    ]),
                    _: 1
                  }),
                  createVNode(VTabsWindowItem, { value: "livro" }, {
                    default: withCtx(() => [
                      createVNode(_component_ProcuracaoAtualizarLivro, {
                        pages: unref(pages_prop),
                        document: unref(doc_prop)
                      }, null, 8, ["pages", "document"])
                    ]),
                    _: 1
                  }),
                  createVNode(VTabsWindowItem, { value: "observacao" }, {
                    default: withCtx(() => [
                      createVNode(_component_ProcuracaoAtualizarObservacao)
                    ]),
                    _: 1
                  }),
                  createVNode(VTabsWindowItem, { value: "anexo" }, {
                    default: withCtx(() => [
                      createVNode(_component_ProcuracaoAtualizarAnexos)
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["modelValue", "onUpdate:modelValue"])
            ];
          }
        }),
        _: 1
      }, _parent));
      if (unref(modalVisible)) {
        _push(ssrRenderComponent(_component_ModalTiposAtos, {
          show: unref(modalVisible),
          servicos: unref(dadosData).servicos || [],
          tiposAtos: unref(dadosData).tiposAtos || [],
          onClose: ($event) => modalVisible.value = false
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/fontes/atos/atos-sem-bem/atualizar/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : undefined;
};

export { _sfc_main as default };
//# sourceMappingURL=_id_-DeKavBd0.mjs.map
