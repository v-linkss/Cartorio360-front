import { _ as __nuxt_component_0 } from './nuxt-link-TpvcaGEw.mjs';
import { withAsyncContext, unref, withCtx, createTextVNode, toDisplayString, createVNode, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import { _ as _export_sfc, f as useRoute$1, b1 as VSheet, g as VBtn, c as useRuntimeConfig } from './server.mjs';
import { u as useFetch } from './fetch-BGOGxZIT.mjs';
import { V as VContainer } from './VContainer-CUysD4sO.mjs';
import { V as VRow } from './VRow-Bqz0CuIN.mjs';
import { V as VCol } from './VCol-BT4RzX0Q.mjs';
import { V as VResponsive } from './VResponsive-D5W8jAiq.mjs';
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
import './asyncData-Diyd6umk.mjs';

const _sfc_main = {
  __name: "[id]",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const route = useRoute$1();
    const { id } = route.params;
    const config = useRuntimeConfig();
    const getSituacaoMatricula = `${config.public.managemant}/situacao-matriculas`;
    const { data: situacaoMatricula, pending } = ([__temp, __restore] = withAsyncContext(() => useFetch(
      `${getSituacaoMatricula}/${id}`,
      {
        method: "GET"
      },
      "$pdthEWSfqV"
    )), __temp = await __temp, __restore(), __temp);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<!--[-->`);
      if (!unref(pending)) {
        _push(`<div data-v-9589e0ff>`);
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
                                _push5(` Descri\xE7\xE3o: ${ssrInterpolate(unref(situacaoMatricula).descricao)}`);
                              } else {
                                return [
                                  createTextVNode(" Descri\xE7\xE3o: " + toDisplayString(unref(situacaoMatricula).descricao), 1)
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(VSheet, { class: "pa-2 ma-2" }, {
                              default: withCtx(() => [
                                createTextVNode(" Descri\xE7\xE3o: " + toDisplayString(unref(situacaoMatricula).descricao), 1)
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
                                _push5(` Situa\xE7\xE3o: : ${ssrInterpolate(unref(situacaoMatricula).situacao)}`);
                              } else {
                                return [
                                  createTextVNode(" Situa\xE7\xE3o: : " + toDisplayString(unref(situacaoMatricula).situacao), 1)
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(VSheet, { class: "pa-2 ma-2" }, {
                              default: withCtx(() => [
                                createTextVNode(" Situa\xE7\xE3o: : " + toDisplayString(unref(situacaoMatricula).situacao), 1)
                              ]),
                              _: 1
                            })
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(VResponsive, { width: "100%" }, null, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(VResponsive, { width: "100%" }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(VCol, null, {
                        default: withCtx(() => [
                          createVNode(VSheet, { class: "pa-2 ma-2" }, {
                            default: withCtx(() => [
                              createTextVNode(" Descri\xE7\xE3o: " + toDisplayString(unref(situacaoMatricula).descricao), 1)
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
                              createTextVNode(" Situa\xE7\xE3o: : " + toDisplayString(unref(situacaoMatricula).situacao), 1)
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(VResponsive, { width: "100%" }),
                      createVNode(VResponsive, { width: "100%" })
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
                            createTextVNode(" Descri\xE7\xE3o: " + toDisplayString(unref(situacaoMatricula).descricao), 1)
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
                            createTextVNode(" Situa\xE7\xE3o: : " + toDisplayString(unref(situacaoMatricula).situacao), 1)
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(VResponsive, { width: "100%" }),
                    createVNode(VResponsive, { width: "100%" })
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
        to: "/situacoes-matriculas/lista"
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/situacoes-matriculas/vizualizar/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : undefined;
};
const _id_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-9589e0ff"]]);

export { _id_ as default };
//# sourceMappingURL=_id_-tZ6McIv8.mjs.map
