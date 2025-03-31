import { _ as __nuxt_component_0 } from './nuxt-link-TpvcaGEw.mjs';
import { _ as __unimport_formatDate } from './formatDate-Han2ORzf.mjs';
import { withAsyncContext, unref, withCtx, createTextVNode, toDisplayString, createVNode, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import { _ as _export_sfc, aS as useRoute$1, aV as VSheet, f as VBtn, c as useRuntimeConfig } from './server.mjs';
import { f as fetchWithToken } from './fetchWithToken-Cv5nC8pK.mjs';
import { V as VContainer } from './VContainer-CTpFP9Uv.mjs';
import { V as VRow } from './VRow-BVT9G9vF.mjs';
import { V as VCol } from './VCol-BfQDPyTL.mjs';
import { V as VResponsive } from './VResponsive-BFQ60k4B.mjs';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:fs';
import 'node:path';
import 'node:url';
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
import './fetch-Q70wXbL3.mjs';

const _sfc_main = {
  __name: "[id]",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const route = useRoute$1();
    const { id } = route.params;
    const config = useRuntimeConfig();
    const pessoasView = `${config.public.auth}/service/gerencia/getPessoaById`;
    const { data: PessoaView, pending } = ([__temp, __restore] = withAsyncContext(() => fetchWithToken(
      `${pessoasView}/${id}`
    )), __temp = await __temp, __restore(), __temp);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<!--[-->`);
      if (!unref(pending)) {
        _push(`<div data-v-09b8699c>`);
        _push(ssrRenderComponent(VContainer, { class: "data-container mt-16" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(VRow, { "no-gutters": "" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(VCol, null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(VSheet, { class: "pa-2 ma-2" }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(` Documento: ${ssrInterpolate(unref(PessoaView).doc_identificacao)}`);
                              } else {
                                return [
                                  createTextVNode(" Documento: " + toDisplayString(unref(PessoaView).doc_identificacao), 1)
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(VSheet, { class: "pa-2 ma-2" }, {
                              default: withCtx(() => [
                                createTextVNode(" Documento: " + toDisplayString(unref(PessoaView).doc_identificacao), 1)
                              ]),
                              _: 1
                            })
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(VCol, null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(VSheet, { class: "pa-2 ma-2" }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(` Nome/Raz\xE3o Social : ${ssrInterpolate(unref(PessoaView).nome)}`);
                              } else {
                                return [
                                  createTextVNode(" Nome/Raz\xE3o Social : " + toDisplayString(unref(PessoaView).nome), 1)
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(VSheet, { class: "pa-2 ma-2" }, {
                              default: withCtx(() => [
                                createTextVNode(" Nome/Raz\xE3o Social : " + toDisplayString(unref(PessoaView).nome), 1)
                              ]),
                              _: 1
                            })
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(VCol, null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(VSheet, { class: "pa-2 ma-2" }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(` Data de Nascimento: ${ssrInterpolate(unref(PessoaView).data_nascimento ? ("formatDate" in _ctx ? _ctx.formatDate : unref(__unimport_formatDate))(unref(PessoaView).data_nascimento) : null)}`);
                              } else {
                                return [
                                  createTextVNode(" Data de Nascimento: " + toDisplayString(unref(PessoaView).data_nascimento ? ("formatDate" in _ctx ? _ctx.formatDate : unref(__unimport_formatDate))(unref(PessoaView).data_nascimento) : null), 1)
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(VSheet, { class: "pa-2 ma-2" }, {
                              default: withCtx(() => [
                                createTextVNode(" Data de Nascimento: " + toDisplayString(unref(PessoaView).data_nascimento ? ("formatDate" in _ctx ? _ctx.formatDate : unref(__unimport_formatDate))(unref(PessoaView).data_nascimento) : null), 1)
                              ]),
                              _: 1
                            })
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(VResponsive, { width: "100%" }, null, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(VCol, null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(VSheet, { class: "pa-2 ma-2" }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(` Tipo Pessoa: ${ssrInterpolate(unref(PessoaView).tipo_pessoa)}`);
                              } else {
                                return [
                                  createTextVNode(" Tipo Pessoa: " + toDisplayString(unref(PessoaView).tipo_pessoa), 1)
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(VSheet, { class: "pa-2 ma-2" }, {
                              default: withCtx(() => [
                                createTextVNode(" Tipo Pessoa: " + toDisplayString(unref(PessoaView).tipo_pessoa), 1)
                              ]),
                              _: 1
                            })
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(VCol, null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(VSheet, { class: "pa-2 ma-2" }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`Profiss\xE3o: ${ssrInterpolate(unref(PessoaView).profissao)}`);
                              } else {
                                return [
                                  createTextVNode("Profiss\xE3o: " + toDisplayString(unref(PessoaView).profissao), 1)
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(VSheet, { class: "pa-2 ma-2" }, {
                              default: withCtx(() => [
                                createTextVNode("Profiss\xE3o: " + toDisplayString(unref(PessoaView).profissao), 1)
                              ]),
                              _: 1
                            })
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(VResponsive, { width: "100%" }, null, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(VCol, null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(VSheet, { class: "pa-2 ma-2" }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(` Local de Trabalho: ${ssrInterpolate(unref(PessoaView).local_trabalho)}`);
                              } else {
                                return [
                                  createTextVNode(" Local de Trabalho: " + toDisplayString(unref(PessoaView).local_trabalho), 1)
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(VSheet, { class: "pa-2 ma-2" }, {
                              default: withCtx(() => [
                                createTextVNode(" Local de Trabalho: " + toDisplayString(unref(PessoaView).local_trabalho), 1)
                              ]),
                              _: 1
                            })
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(VCol, null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(VSheet, { class: "pa-2 ma-2" }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(` Nome da m\xE3e: ${ssrInterpolate(unref(PessoaView).nome_mae)}`);
                              } else {
                                return [
                                  createTextVNode(" Nome da m\xE3e: " + toDisplayString(unref(PessoaView).nome_mae), 1)
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(VSheet, { class: "pa-2 ma-2" }, {
                              default: withCtx(() => [
                                createTextVNode(" Nome da m\xE3e: " + toDisplayString(unref(PessoaView).nome_mae), 1)
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
                      createVNode(VCol, null, {
                        default: withCtx(() => [
                          createVNode(VSheet, { class: "pa-2 ma-2" }, {
                            default: withCtx(() => [
                              createTextVNode(" Documento: " + toDisplayString(unref(PessoaView).doc_identificacao), 1)
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(VCol, null, {
                        default: withCtx(() => [
                          createVNode(VSheet, { class: "pa-2 ma-2" }, {
                            default: withCtx(() => [
                              createTextVNode(" Nome/Raz\xE3o Social : " + toDisplayString(unref(PessoaView).nome), 1)
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(VCol, null, {
                        default: withCtx(() => [
                          createVNode(VSheet, { class: "pa-2 ma-2" }, {
                            default: withCtx(() => [
                              createTextVNode(" Data de Nascimento: " + toDisplayString(unref(PessoaView).data_nascimento ? ("formatDate" in _ctx ? _ctx.formatDate : unref(__unimport_formatDate))(unref(PessoaView).data_nascimento) : null), 1)
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(VResponsive, { width: "100%" }),
                      createVNode(VCol, null, {
                        default: withCtx(() => [
                          createVNode(VSheet, { class: "pa-2 ma-2" }, {
                            default: withCtx(() => [
                              createTextVNode(" Tipo Pessoa: " + toDisplayString(unref(PessoaView).tipo_pessoa), 1)
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(VCol, null, {
                        default: withCtx(() => [
                          createVNode(VSheet, { class: "pa-2 ma-2" }, {
                            default: withCtx(() => [
                              createTextVNode("Profiss\xE3o: " + toDisplayString(unref(PessoaView).profissao), 1)
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(VResponsive, { width: "100%" }),
                      createVNode(VCol, null, {
                        default: withCtx(() => [
                          createVNode(VSheet, { class: "pa-2 ma-2" }, {
                            default: withCtx(() => [
                              createTextVNode(" Local de Trabalho: " + toDisplayString(unref(PessoaView).local_trabalho), 1)
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(VCol, null, {
                        default: withCtx(() => [
                          createVNode(VSheet, { class: "pa-2 ma-2" }, {
                            default: withCtx(() => [
                              createTextVNode(" Nome da m\xE3e: " + toDisplayString(unref(PessoaView).nome_mae), 1)
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
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(VRow, { "no-gutters": "" }, {
                  default: withCtx(() => [
                    createVNode(VCol, null, {
                      default: withCtx(() => [
                        createVNode(VSheet, { class: "pa-2 ma-2" }, {
                          default: withCtx(() => [
                            createTextVNode(" Documento: " + toDisplayString(unref(PessoaView).doc_identificacao), 1)
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, null, {
                      default: withCtx(() => [
                        createVNode(VSheet, { class: "pa-2 ma-2" }, {
                          default: withCtx(() => [
                            createTextVNode(" Nome/Raz\xE3o Social : " + toDisplayString(unref(PessoaView).nome), 1)
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, null, {
                      default: withCtx(() => [
                        createVNode(VSheet, { class: "pa-2 ma-2" }, {
                          default: withCtx(() => [
                            createTextVNode(" Data de Nascimento: " + toDisplayString(unref(PessoaView).data_nascimento ? ("formatDate" in _ctx ? _ctx.formatDate : unref(__unimport_formatDate))(unref(PessoaView).data_nascimento) : null), 1)
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(VResponsive, { width: "100%" }),
                    createVNode(VCol, null, {
                      default: withCtx(() => [
                        createVNode(VSheet, { class: "pa-2 ma-2" }, {
                          default: withCtx(() => [
                            createTextVNode(" Tipo Pessoa: " + toDisplayString(unref(PessoaView).tipo_pessoa), 1)
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, null, {
                      default: withCtx(() => [
                        createVNode(VSheet, { class: "pa-2 ma-2" }, {
                          default: withCtx(() => [
                            createTextVNode("Profiss\xE3o: " + toDisplayString(unref(PessoaView).profissao), 1)
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(VResponsive, { width: "100%" }),
                    createVNode(VCol, null, {
                      default: withCtx(() => [
                        createVNode(VSheet, { class: "pa-2 ma-2" }, {
                          default: withCtx(() => [
                            createTextVNode(" Local de Trabalho: " + toDisplayString(unref(PessoaView).local_trabalho), 1)
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, null, {
                      default: withCtx(() => [
                        createVNode(VSheet, { class: "pa-2 ma-2" }, {
                          default: withCtx(() => [
                            createTextVNode(" Nome da m\xE3e: " + toDisplayString(unref(PessoaView).nome_mae), 1)
                          ]),
                          _: 1
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
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(_component_NuxtLink, {
        class: "mt-10",
        to: "/pessoas/lista"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VBtn, {
              size: "large",
              color: "red"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Voltar`);
                } else {
                  return [
                    createTextVNode("Voltar")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(VBtn, {
                size: "large",
                color: "red"
              }, {
                default: withCtx(() => [
                  createTextVNode("Voltar")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/pessoas/vizualizar/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : undefined;
};
const _id_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-09b8699c"]]);

export { _id_ as default };
//# sourceMappingURL=_id_-BpTWNciR.mjs.map
