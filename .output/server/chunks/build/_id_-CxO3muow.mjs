import { _ as __nuxt_component_0 } from './nuxt-link-TpvcaGEw.mjs';
import { _ as __unimport_formatDate } from './formatDate-C0bMm8hr.mjs';
import { withAsyncContext, unref, withCtx, createTextVNode, toDisplayString, createVNode, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import { _ as _export_sfc, aS as useRoute$1, aV as VSheet, f as VBtn, c as useRuntimeConfig } from './server.mjs';
import { f as fetchWithToken } from './fetchWithToken-Cv5nC8pK.mjs';
import { V as VContainer } from './VContainer-CTpFP9Uv.mjs';
import { V as VRow } from './VRow-BVT9G9vF.mjs';
import { V as VCol } from './VCol-BfQDPyTL.mjs';
import { V as VResponsive } from './VResponsive-BFQ60k4B.mjs';
import '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:fs';
import 'node:url';
import 'node:path';
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
    const matriculasView = `${config.public.auth}/service/gerencia/matriculas`;
    const { data: PessoaView, pending } = ([__temp, __restore] = withAsyncContext(() => fetchWithToken(
      `${matriculasView}/${id}`
    )), __temp = await __temp, __restore(), __temp);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<!--[-->`);
      if (!unref(pending)) {
        _push(`<div data-v-15d7606b>`);
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
                                _push5(` N\xFAmero: ${ssrInterpolate(unref(PessoaView).numero)}`);
                              } else {
                                return [
                                  createTextVNode(" N\xFAmero: " + toDisplayString(unref(PessoaView).numero), 1)
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(VSheet, { class: "pa-2 ma-2" }, {
                              default: withCtx(() => [
                                createTextVNode(" N\xFAmero: " + toDisplayString(unref(PessoaView).numero), 1)
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
                                _push5(` CNM : ${ssrInterpolate(unref(PessoaView).cnm)}`);
                              } else {
                                return [
                                  createTextVNode(" CNM : " + toDisplayString(unref(PessoaView).cnm), 1)
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(VSheet, { class: "pa-2 ma-2" }, {
                              default: withCtx(() => [
                                createTextVNode(" CNM : " + toDisplayString(unref(PessoaView).cnm), 1)
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
                                _push5(` Data:${ssrInterpolate(unref(PessoaView).data ? ("formatDate" in _ctx ? _ctx.formatDate : unref(__unimport_formatDate))(unref(PessoaView).data) : null)}`);
                              } else {
                                return [
                                  createTextVNode(" Data:" + toDisplayString(unref(PessoaView).data ? ("formatDate" in _ctx ? _ctx.formatDate : unref(__unimport_formatDate))(unref(PessoaView).data) : null), 1)
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(VSheet, { class: "pa-2 ma-2" }, {
                              default: withCtx(() => [
                                createTextVNode(" Data:" + toDisplayString(unref(PessoaView).data ? ("formatDate" in _ctx ? _ctx.formatDate : unref(__unimport_formatDate))(unref(PessoaView).data) : null), 1)
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
                                _push5(` Situa\xE7\xE3o: ${ssrInterpolate(unref(PessoaView).situacao.situacao)}`);
                              } else {
                                return [
                                  createTextVNode(" Situa\xE7\xE3o: " + toDisplayString(unref(PessoaView).situacao.situacao), 1)
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(VSheet, { class: "pa-2 ma-2" }, {
                              default: withCtx(() => [
                                createTextVNode(" Situa\xE7\xE3o: " + toDisplayString(unref(PessoaView).situacao.situacao), 1)
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
                                _push5(` Protocolo: ${ssrInterpolate(unref(PessoaView).protocolo)}`);
                              } else {
                                return [
                                  createTextVNode(" Protocolo: " + toDisplayString(unref(PessoaView).protocolo), 1)
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(VSheet, { class: "pa-2 ma-2" }, {
                              default: withCtx(() => [
                                createTextVNode(" Protocolo: " + toDisplayString(unref(PessoaView).protocolo), 1)
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
                                _push5(` Descri\xE7\xE3o: ${ssrInterpolate(unref(PessoaView).descricao)}`);
                              } else {
                                return [
                                  createTextVNode(" Descri\xE7\xE3o: " + toDisplayString(unref(PessoaView).descricao), 1)
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(VSheet, { class: "pa-2 ma-2" }, {
                              default: withCtx(() => [
                                createTextVNode(" Descri\xE7\xE3o: " + toDisplayString(unref(PessoaView).descricao), 1)
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
                              createTextVNode(" N\xFAmero: " + toDisplayString(unref(PessoaView).numero), 1)
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
                              createTextVNode(" CNM : " + toDisplayString(unref(PessoaView).cnm), 1)
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
                              createTextVNode(" Data:" + toDisplayString(unref(PessoaView).data ? ("formatDate" in _ctx ? _ctx.formatDate : unref(__unimport_formatDate))(unref(PessoaView).data) : null), 1)
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
                              createTextVNode(" Situa\xE7\xE3o: " + toDisplayString(unref(PessoaView).situacao.situacao), 1)
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
                              createTextVNode(" Protocolo: " + toDisplayString(unref(PessoaView).protocolo), 1)
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
                              createTextVNode(" Descri\xE7\xE3o: " + toDisplayString(unref(PessoaView).descricao), 1)
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
                            createTextVNode(" N\xFAmero: " + toDisplayString(unref(PessoaView).numero), 1)
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
                            createTextVNode(" CNM : " + toDisplayString(unref(PessoaView).cnm), 1)
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
                            createTextVNode(" Data:" + toDisplayString(unref(PessoaView).data ? ("formatDate" in _ctx ? _ctx.formatDate : unref(__unimport_formatDate))(unref(PessoaView).data) : null), 1)
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
                            createTextVNode(" Situa\xE7\xE3o: " + toDisplayString(unref(PessoaView).situacao.situacao), 1)
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
                            createTextVNode(" Protocolo: " + toDisplayString(unref(PessoaView).protocolo), 1)
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
                            createTextVNode(" Descri\xE7\xE3o: " + toDisplayString(unref(PessoaView).descricao), 1)
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
        to: "/matriculas/lista"
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/matriculas/vizualizar/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : undefined;
};
const _id_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-15d7606b"]]);

export { _id_ as default };
//# sourceMappingURL=_id_-CxO3muow.mjs.map
