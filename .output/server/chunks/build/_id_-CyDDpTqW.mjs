import { _ as _sfc_main$5, a as _sfc_main$4, b as _sfc_main$3, c as _sfc_main$2$1, d as _sfc_main$1$1, e as _sfc_main$6 } from './Anexos-oXBrScR3.mjs';
import { _ as _sfc_main$2, a as _sfc_main$1, b as _sfc_main$7 } from './Outros-CxWdOsK3.mjs';
import { _ as _sfc_main$8 } from './TiposAtos-TRftF4MJ.mjs';
import { ref, withAsyncContext, withCtx, unref, createVNode, toDisplayString, isRef, openBlock, createBlock, createCommentVNode, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderStyle, ssrInterpolate, ssrRenderAttr } from 'vue/server-renderer';
import { _ as _imports_1 } from './editar-BcGPsVK2.mjs';
import { f as useRoute$1, e as useCookie, c as useRuntimeConfig } from './server.mjs';
import { f as fetchWithToken } from './fetchWithToken-Cjtduyn0.mjs';
import { V as VContainer } from './VContainer-CUysD4sO.mjs';
import { V as VRow } from './VRow-Bqz0CuIN.mjs';
import { V as VCol } from './VCol-BT4RzX0Q.mjs';
import { V as VAutocomplete } from './VAutocomplete-jDMrV6Ty.mjs';
import { V as VCard } from './VCard-C4igN6I0.mjs';
import { V as VTabs, a as VTab, b as VTabsWindow, c as VTabsWindowItem } from './VTabs-CsXP8zCT.mjs';
import './nuxt-link-TpvcaGEw.mjs';
import '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:fs';
import 'node:url';
import 'node:path';
import './fetch-DOsfzFYE.mjs';
import './asyncData-B13qrLU7.mjs';
import './RegistroPessoas-CdDkRpaP.mjs';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'devalue';
import '@unhead/ssr';
import 'unhead';
import '@unhead/shared';
import '@vuelidate/core';
import '@vuelidate/validators';
import './formatDate-DflkuJ_V.mjs';
import './filter-Cq0do3eB.mjs';
import './VList-Cz7Gkd6P.mjs';
import './VAvatar-DtgTBdiE.mjs';
import './VResponsive-BwPb2GHE.mjs';
import './novo-CWU3oYa5.mjs';
import './excluido-ceRs5bdR.mjs';
import './VDataTable-D9q4gsV5.mjs';
import './VDialog-BVe31KMa.mjs';
import 'utif';
import './FichaCard-DyCJUUML.mjs';
import './VWindowItem-DpFv1Eet.mjs';
import './visualizar-BoZ30DMV.mjs';
import './lavrar-CC2INa1Z.mjs';
import './visualizar-vermelho-Ly_aKn8Z.mjs';
import './Confirmacao-FW_B2Sxg.mjs';
import './abre-arquivo-KvIa04gq.mjs';
import './MoneyInput-ot-UsY0X.mjs';
import 'v-money3';
import './VTextarea-BxOCT6fJ.mjs';
import './Atualizar-CMtqpEuN.mjs';
import './SaveButton-0YznNGYC.mjs';
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
    const tab = ref(null);
    const config = useRuntimeConfig();
    const route = useRoute$1();
    const isVisualizar = ref(route.query.origem === "vizualizar");
    const allSituacoes = `${config.public.auth}/service/gerencia/listarSituacoes`;
    const getAtoId = `${config.public.auth}/service/gerencia/getAtos`;
    const cartorio_token = ref(useCookie("user-data").value.cartorio_token);
    const body = route.query.id ? { ato_token: route.query.tipo_ato_token } : { cartorio_token };
    const situacoesItems = ref([]);
    const dadosData = ref([]);
    const modalVisible = ref(false);
    const tipoAto = route.query.tipo_ato || "";
    const label = ref(null);
    const updatedAtoDetails = ref(null);
    const [initialLabel, initialUpdatedAtoDetails] = tipoAto.split(" - ");
    label.value = initialLabel || "";
    updatedAtoDetails.value = initialUpdatedAtoDetails || "";
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
        console.error(error);
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
    function handleUpdateAto({ descricao, usaImoveisParams }) {
      const [firstPart, secondPart] = descricao.split(" - ");
      label.value = firstPart || "";
      updatedAtoDetails.value = secondPart || "";
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ProcuracaoAtualizarDados = _sfc_main$5;
      const _component_ProcuracaoAtualizarPartes = _sfc_main$4;
      const _component_ProcuracaoAtualizarBens = _sfc_main$2;
      const _component_ProcuracaoAtualizarImoveis = _sfc_main$1;
      const _component_ProcuracaoAtualizarMinuta = _sfc_main$3;
      const _component_ProcuracaoAtualizarLivro = _sfc_main$2$1;
      const _component_ProcuracaoAtualizarObservacao = _sfc_main$1$1;
      const _component_ProcuracaoAtualizarAnexos = _sfc_main$6;
      const _component_ProcuracaoAtualizarOutros = _sfc_main$7;
      const _component_ModalTiposAtos = _sfc_main$8;
      _push(`<!--[-->`);
      _push(ssrRenderComponent(VContainer, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="mb-10"${_scopeId}>`);
            _push2(ssrRenderComponent(VRow, { class: "mb-5 mt-5" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<h1${_scopeId2}>Ordem de Servi\xE7o n\xBA</h1><h1 style="${ssrRenderStyle({ "color": "red", "margin-left": "30px" })}"${_scopeId2}>${ssrInterpolate(unref(route).query.numero_os)}</h1>`);
                } else {
                  return [
                    createVNode("h1", null, "Ordem de Servi\xE7o n\xBA"),
                    createVNode("h1", { style: { "color": "red", "margin-left": "30px" } }, toDisplayString(unref(route).query.numero_os), 1)
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
                          label: "Servi\xE7o",
                          class: "mr-5",
                          modelValue: unref(label),
                          "onUpdate:modelValue": ($event) => isRef(label) ? label.value = $event : null,
                          disabled: ""
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VAutocomplete, {
                            label: "Servi\xE7o",
                            class: "mr-5",
                            modelValue: unref(label),
                            "onUpdate:modelValue": ($event) => isRef(label) ? label.value = $event : null,
                            disabled: ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VCol, { md: "5" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VAutocomplete, {
                          modelValue: unref(updatedAtoDetails),
                          "onUpdate:modelValue": ($event) => isRef(updatedAtoDetails) ? updatedAtoDetails.value = $event : null,
                          label: "Tipo de Ato",
                          disabled: ""
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VAutocomplete, {
                            modelValue: unref(updatedAtoDetails),
                            "onUpdate:modelValue": ($event) => isRef(updatedAtoDetails) ? updatedAtoDetails.value = $event : null,
                            label: "Tipo de Ato",
                            disabled: ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  if (!unref(isVisualizar)) {
                    _push3(`<div${_scopeId2}><img class="mt-2" style="${ssrRenderStyle({
                      cursor: unref(dadosData).dt_lavratura ? "default" : "pointer",
                      width: "35px",
                      height: "35px"
                    })}"${ssrRenderAttr("src", _imports_1)} alt="Editar"${_scopeId2}></div>`);
                  } else {
                    _push3(`<!---->`);
                  }
                } else {
                  return [
                    createVNode(VCol, { md: "6" }, {
                      default: withCtx(() => [
                        createVNode(VAutocomplete, {
                          label: "Servi\xE7o",
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
                          modelValue: unref(updatedAtoDetails),
                          "onUpdate:modelValue": ($event) => isRef(updatedAtoDetails) ? updatedAtoDetails.value = $event : null,
                          label: "Tipo de Ato",
                          disabled: ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    !unref(isVisualizar) ? (openBlock(), createBlock("div", { key: 0 }, [
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
                    ])) : createCommentVNode("", true)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
            _push2(ssrRenderComponent(VCard, { width: "1300" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
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
                        _push4(ssrRenderComponent(VTab, { value: "partes" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Partes`);
                            } else {
                              return [
                                createTextVNode("Partes")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VTab, { value: "bens" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Bens`);
                            } else {
                              return [
                                createTextVNode("Bens")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VTab, { value: "imoveis" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Imoveis`);
                            } else {
                              return [
                                createTextVNode("Imoveis")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VTab, { value: "minuta" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Minuta`);
                            } else {
                              return [
                                createTextVNode("Minuta")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VTab, { value: "livro" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Livro`);
                            } else {
                              return [
                                createTextVNode("Livro")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VTab, { value: "observacao" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Observa\xE7\xF5es`);
                            } else {
                              return [
                                createTextVNode("Observa\xE7\xF5es")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VTab, { value: "anexo" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Anexos`);
                            } else {
                              return [
                                createTextVNode("Anexos")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VTab, { value: "outros" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Outros`);
                            } else {
                              return [
                                createTextVNode("Outros")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
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
                          createVNode(VTab, { value: "bens" }, {
                            default: withCtx(() => [
                              createTextVNode("Bens")
                            ]),
                            _: 1
                          }),
                          createVNode(VTab, { value: "imoveis" }, {
                            default: withCtx(() => [
                              createTextVNode("Imoveis")
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
                          }),
                          createVNode(VTab, { value: "outros" }, {
                            default: withCtx(() => [
                              createTextVNode("Outros")
                            ]),
                            _: 1
                          })
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
                              _push5(ssrRenderComponent(_component_ProcuracaoAtualizarDados, {
                                item_dados: unref(dadosData),
                                item_situacoes: unref(situacoesItems)
                              }, null, _parent5, _scopeId4));
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
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VTabsWindowItem, { value: "partes" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_ProcuracaoAtualizarPartes, null, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_ProcuracaoAtualizarPartes)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VTabsWindowItem, { value: "bens" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_ProcuracaoAtualizarBens, null, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_ProcuracaoAtualizarBens)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VTabsWindowItem, { value: "imoveis" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_ProcuracaoAtualizarImoveis, null, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_ProcuracaoAtualizarImoveis)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VTabsWindowItem, { value: "minuta" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_ProcuracaoAtualizarMinuta, {
                                onPage: getPages,
                                onDoc: getDocument
                              }, null, _parent5, _scopeId4));
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
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VTabsWindowItem, { value: "livro" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_ProcuracaoAtualizarLivro, {
                                pages: unref(pages_prop),
                                document: unref(doc_prop)
                              }, null, _parent5, _scopeId4));
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
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VTabsWindowItem, { value: "observacao" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_ProcuracaoAtualizarObservacao, null, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_ProcuracaoAtualizarObservacao)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VTabsWindowItem, { value: "anexo" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_ProcuracaoAtualizarAnexos, null, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_ProcuracaoAtualizarAnexos)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VTabsWindowItem, { value: "outros" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_ProcuracaoAtualizarOutros, null, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_ProcuracaoAtualizarOutros)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
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
                          createVNode(VTabsWindowItem, { value: "bens" }, {
                            default: withCtx(() => [
                              createVNode(_component_ProcuracaoAtualizarBens)
                            ]),
                            _: 1
                          }),
                          createVNode(VTabsWindowItem, { value: "imoveis" }, {
                            default: withCtx(() => [
                              createVNode(_component_ProcuracaoAtualizarImoveis)
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
                          }),
                          createVNode(VTabsWindowItem, { value: "outros" }, {
                            default: withCtx(() => [
                              createVNode(_component_ProcuracaoAtualizarOutros)
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
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
                        createVNode(VTab, { value: "bens" }, {
                          default: withCtx(() => [
                            createTextVNode("Bens")
                          ]),
                          _: 1
                        }),
                        createVNode(VTab, { value: "imoveis" }, {
                          default: withCtx(() => [
                            createTextVNode("Imoveis")
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
                        }),
                        createVNode(VTab, { value: "outros" }, {
                          default: withCtx(() => [
                            createTextVNode("Outros")
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
                        createVNode(VTabsWindowItem, { value: "bens" }, {
                          default: withCtx(() => [
                            createVNode(_component_ProcuracaoAtualizarBens)
                          ]),
                          _: 1
                        }),
                        createVNode(VTabsWindowItem, { value: "imoveis" }, {
                          default: withCtx(() => [
                            createVNode(_component_ProcuracaoAtualizarImoveis)
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
                        }),
                        createVNode(VTabsWindowItem, { value: "outros" }, {
                          default: withCtx(() => [
                            createVNode(_component_ProcuracaoAtualizarOutros)
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
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode("div", { class: "mb-10" }, [
                createVNode(VRow, { class: "mb-5 mt-5" }, {
                  default: withCtx(() => [
                    createVNode("h1", null, "Ordem de Servi\xE7o n\xBA"),
                    createVNode("h1", { style: { "color": "red", "margin-left": "30px" } }, toDisplayString(unref(route).query.numero_os), 1)
                  ]),
                  _: 1
                }),
                createVNode(VRow, null, {
                  default: withCtx(() => [
                    createVNode(VCol, { md: "6" }, {
                      default: withCtx(() => [
                        createVNode(VAutocomplete, {
                          label: "Servi\xE7o",
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
                          modelValue: unref(updatedAtoDetails),
                          "onUpdate:modelValue": ($event) => isRef(updatedAtoDetails) ? updatedAtoDetails.value = $event : null,
                          label: "Tipo de Ato",
                          disabled: ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    !unref(isVisualizar) ? (openBlock(), createBlock("div", { key: 0 }, [
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
                    ])) : createCommentVNode("", true)
                  ]),
                  _: 1
                })
              ]),
              createVNode(VCard, { width: "1300" }, {
                default: withCtx(() => [
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
                      createVNode(VTab, { value: "bens" }, {
                        default: withCtx(() => [
                          createTextVNode("Bens")
                        ]),
                        _: 1
                      }),
                      createVNode(VTab, { value: "imoveis" }, {
                        default: withCtx(() => [
                          createTextVNode("Imoveis")
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
                      }),
                      createVNode(VTab, { value: "outros" }, {
                        default: withCtx(() => [
                          createTextVNode("Outros")
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
                      createVNode(VTabsWindowItem, { value: "bens" }, {
                        default: withCtx(() => [
                          createVNode(_component_ProcuracaoAtualizarBens)
                        ]),
                        _: 1
                      }),
                      createVNode(VTabsWindowItem, { value: "imoveis" }, {
                        default: withCtx(() => [
                          createVNode(_component_ProcuracaoAtualizarImoveis)
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
                      }),
                      createVNode(VTabsWindowItem, { value: "outros" }, {
                        default: withCtx(() => [
                          createVNode(_component_ProcuracaoAtualizarOutros)
                        ]),
                        _: 1
                      })
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
      if (unref(modalVisible)) {
        _push(ssrRenderComponent(_component_ModalTiposAtos, {
          show: unref(modalVisible),
          servicos: unref(dadosData).servicos || [],
          tiposAtos: unref(dadosData).tiposAtos || [],
          onClose: ($event) => modalVisible.value = false,
          onUpdateAto: handleUpdateAto
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/fontes/atos/atos-com-bem/atualizar/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : undefined;
};

export { _sfc_main as default };
//# sourceMappingURL=_id_-CyDDpTqW.mjs.map
