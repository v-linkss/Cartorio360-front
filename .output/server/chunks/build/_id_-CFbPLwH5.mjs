import { _ as __nuxt_component_0 } from './nuxt-link-DyZc7qn_.mjs';
import { _ as _export_sfc, c as useRoute$1, b1 as VSheet, b2 as VResponsive, b as useRuntimeConfig } from './server.mjs';
import { u as useFetch } from './fetch-Dsyde8UD.mjs';
import { _ as __unimport_formatDate } from './formatDate-B6RUKh9-.mjs';
import { withAsyncContext, unref, withCtx, createTextVNode, toDisplayString, createVNode, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrInterpolate, ssrRenderAttr } from 'vue/server-renderer';
import { _ as _imports_0 } from './sair-CV1ySkp8.mjs';
import { V as VContainer } from './VContainer-chgtNZst.mjs';
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
import '@ckeditor/ckeditor5-vue';
import 'vue3-toastify';
import 'vue-the-mask';

const _sfc_main = {
  __name: "[id]",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const route = useRoute$1();
    const { id } = route.params;
    const config = useRuntimeConfig();
    const pessoasView = `${config.public.managemant}/getPessoaById`;
    const { data: PessoaView, pending } = ([__temp, __restore] = withAsyncContext(() => useFetch(
      `${pessoasView}/${id}`,
      "$df2lemleOL"
    )), __temp = await __temp, __restore(), __temp);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<!--[-->`);
      if (!unref(pending)) {
        _push(`<div data-v-d91ee4d9>`);
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
                                _push5(` Data de Nascimento: ${ssrInterpolate(("formatDate" in _ctx ? _ctx.formatDate : unref(__unimport_formatDate))(unref(PessoaView).data_nascimento))}`);
                              } else {
                                return [
                                  createTextVNode(" Data de Nascimento: " + toDisplayString(("formatDate" in _ctx ? _ctx.formatDate : unref(__unimport_formatDate))(unref(PessoaView).data_nascimento)), 1)
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(VSheet, { class: "pa-2 ma-2" }, {
                              default: withCtx(() => [
                                createTextVNode(" Data de Nascimento: " + toDisplayString(("formatDate" in _ctx ? _ctx.formatDate : unref(__unimport_formatDate))(unref(PessoaView).data_nascimento)), 1)
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
                              createTextVNode(" Data de Nascimento: " + toDisplayString(("formatDate" in _ctx ? _ctx.formatDate : unref(__unimport_formatDate))(unref(PessoaView).data_nascimento)), 1)
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
                            createTextVNode(" Data de Nascimento: " + toDisplayString(("formatDate" in _ctx ? _ctx.formatDate : unref(__unimport_formatDate))(unref(PessoaView).data_nascimento)), 1)
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
        to: "/pessoas/registros"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<img class="btn-pointer"${ssrRenderAttr("src", _imports_0)} alt="Sair" data-v-d91ee4d9${_scopeId}>`);
          } else {
            return [
              createVNode("img", {
                class: "btn-pointer",
                src: _imports_0,
                alt: "Sair"
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
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _id_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-d91ee4d9"]]);

export { _id_ as default };
//# sourceMappingURL=_id_-CFbPLwH5.mjs.map
