import { _ as __nuxt_component_0 } from './nuxt-link-DyZc7qn_.mjs';
import { _ as _export_sfc, u as useRouter$1, aV as VDataTable, b as useRuntimeConfig } from './server.mjs';
import { u as useLazyFetch, a as useFetch } from './fetch-3DdSDKmI.mjs';
import { withAsyncContext, unref, mergeProps, withCtx, createVNode, openBlock, createBlock, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderAttr, ssrRenderStyle } from 'vue/server-renderer';
import { _ as _imports_0 } from './novo-ZDaciQiz.mjs';
import { _ as _imports_1 } from './visualizar-CsXww5Hd.mjs';
import { _ as _imports_4 } from './trash-DzRaA21m.mjs';
import { V as VRow, _ as _imports_0$1 } from './sair-B9PBMH_8.mjs';
import { V as VContainer } from './VContainer-Mst0JKJ7.mjs';
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
import 'vue3-toastify';
import 'vue-the-mask';

const _imports_2 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAdhAAAHYQGVw7i2AAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAABClJREFUWIW9l11sU2Ucxn//084KS9d1HcZw40diJHoJJCJT09Wek8x9JCAXYGIMhi7EqyWgZk6WmeBHMicwjFAUs82BmSHG6ZJtpWMR3dVcjJdGE+ACdgExfCTbuvb9e9EW99kWOPO5O2/+7/s87/M+7znnL6oKQOSk04DQorBFwM8aQOG2wKQIXef3jfwEIKpKbdw+LEjrWpAWwOFkbKRNak/YDQiDOY3XUTmLcGNNKIUQRvcgEgIwJtPgRWjJk6fQzRebR6+4wdUcby77Wy45igQtzQwmYombANF4tNMoU4iELPG0WApbsvxy9mIs4Qr5c911FX/ppTMKg6j2GmQiHHc2ASRiiSsIZ7OUbLXuBs4l2+v66yrKfaYPi50okh2VZzwwmBcBcj1Lid9yg3QhUnfSjaCv/EeehcJTFnzv9DmPLBz3ukVc119XMTM/Y41Pj5+p3Wg/jfLuCutvMjO8tnDAFQecTqc8dSfTa809dC7yRCR4Ux//APgEMIsKlbQiv7sqIHwkXJkJ0K9CE0KtmfH8EDKXgmPNo+8DHwHpXOm8WHLgfGx43DUBTqdTbq339ajSmB8TYXva4lv7C3vDTW50IHwMzCq898LVbd2AuiIgGo8G0hV8A9oIiwMHhOctOednY2Bs3+ghyYhdHQx0tbe3m6Xr3FcIa043+X1YfUD9ajWC1ghz/XafvWNk//DF1eru2YGa001+X2a2B6Ge5TtfIECMwnDg4cBsofXuyYFoPBrw4elFaFh6z5dgzqhpvTC9/ajGltt+XwIa443rjVpfI1qM3IhoayhYeVSbC5OXLCAajwYy4ukRaCpSmgJ5J3l19Jju06LkJQlwOp3yjN/qkWzaV4eSVqGtOljRrbHSyKFICPNXTYQmCgQOJY3IwZeuPf/pwK6BTKnkBQU4fU65wdNLCbar0PritW3HVrrnxbDqEczPyqGitoMR1bdDVZXH24ukfTUscyDcEfaKiGiZ5zNgqsDcOVE9mJxOdN+r7QUFyKNldviks/vCG0PTeLw7EH5bVoMYVW2tqqo8qu2lB640AUjYQk/VnnL2Jt8cumzKvPVLRMwZ9MCF6e1HHmTnKwrooMNC2KywXpTjkS/trBOp9E6yx5FBaKsOBo7pfQSuqICJzol1wLO5x3UY+ar2lLM3+Vby8jxSr8jrY1dHu9zYeR6LboGp8D6JpDcs+GKvE6U7Erdv/xwb/Q444xbxXQG5dsmPEDKarsm951PAn6JMGeFXMp4/REQ038c9MLQ691675RWYBMIY3SNlngbJ6Ksqvl+qAr5/BnYNpO7O2e8OdeTzyGN4PbsRQJmUSNyuV+XHrDC9kW0asv/t7kOrUXbnWjNVTEO2OT1hHxbrf21OFfgwGRtpk/yxhk+8XG+Jp0WFrWvVngO3UCZVTNdYLDEE8C9kr6WCvMZJ6wAAAABJRU5ErkJggg==";
const _imports_3 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAHCAAABwgHoPH1UAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAABOFJREFUeJztm1tsFFUYx3/fmYFeDCBQt5S2gQq2EGPig0Q0tknFJiYKwQceeJEmxktCYiQaEy8vkogxIcZLohhCgCcTH5QYjBESiQpGGh+NaVV0e5HStdBQBBaZ2c+H3dkdENKend0OlPm97Mw55/vOf/47Z85s9hzhKoZIrTBor2I6QduBhUDt1e1uErLABMivgn7nI/uWMfZHuIEEB3+yvNblwnvAU4Azw0JnCl9ht0/9tjbSWSgYMExLHfz7DbA2VnkzhMKxDJnu++BywYDUx8AzoTYeyCHQPoExkFw8UqOiRqERuB/oAdxSnXzQytjzMkRqhcAAxdte+g3+xmbGB2ZecPX4i4aOHM4B0FWFIs9H2o1BeymNeW82XjxAM+MDDt4TgF8och201+Sf9gFyaDZefMBSTvcDh0sl2ukWprqg4HilOuunYd5tmNcVOsrNYcBTOJFl/pt38ftkhaT9CDyaP5QOl/w8D4DC3xXqhFrMc8DLMmXL66OFzzrOnQV2RFcFCpmQpkWGK15y9FIlOgFw4I5K5So8ySuVLXyNte5121UUOSL4X9hEKM4G0O5qKQqYIQP4uYXxd20Chmm8E6i6AabaHdzolHUH/MbK+bVMviZIF+iSa7VRuD109uQIqfU2fSi6MHS2ZYTUhmu3lFMK32aZt6OcmcLaAIU5w0weBDq1+JyekgUKC2z7ml68LgfW1jL5gMI6Ac8msfUQGKFpvUDn1C1nnK5Rlj5uG1TGHeDfHcyjghz28N+yzVFJXJxXFO0B8PDuAQ7YxVtikLnBrZ9DR5czfsQ2RyUZItUbfCEGmWsbH2kaFKQuzYK2KDmiIkgd038W/Y+I7wG6yaFmU7QcUSn/4iF5D0gMKGMWmLMjx7l3AAw1bwNPF6p25rhUkV9sU2GoeRV4Ka+H/cqlbfnyeVnbXNYGtDJyEbgIMETKL/20FG8ZZyds85XDMI1eMPYdxG8u9nvWOlcyBKqZfJDG9Q6sBBC0r5nMsaAuTUO3i3MvgEF/WUrm66DuBEvW1KAPAShmsJXRz6qlsaoGGNis6GYAhTeAogEu5jFFXwTwkd1A0YA55LoUdubPcgeBqhlwyw+BxIC4BcRNYkDcAuImMSBuAXGTGBC3gLhJDIhbQNwkBsQtIG4SA+IWEDeJAXELiJvEgLgFxE1iQNwC4iYxIG4BcVPV/wUEnQAZBMih/4TrFCalVHfFf1oGzgdxoGeqqbGqBrSQ2QpsvVZdK5ntwPbrxO0CdlVRWpFkCEQJNnChtD5D14zQ8EJkRdNA0TXBcQ7OR8kVyYAc7k9SWpa3TjHrouQrD9MXKZr81rICUmMT3MrJT0G+jCIgIl+1MPqJXYiEtwBmXWACaAIQyyXuAr4ytnGExi2Qe1CRxXZiykPQ02B+aGFsv5S2wEwzllTo9IwLOgDSVCiw3jaXX5o6tgfYYxsbE+Fr7DcCR0MFPSdZvOrqiNlCmqbVwCOhoqPGx+wltJPKxzkwG01I07Tawf+c0A45D7NXAIZI7RJ4NtTeJ7+76rhCxiBWK7BvFHKoWxjza8l/88UtwQIftpDZKlDcN3yEW2TrrMDRy9T3tJHOGoA20lmP+m6Bj7Bcb3+T4YG8f4rMw1dsng6TprHNQXtBu0DagUXc3NvnzwD9wPceZl8bp9LhBv8B7XNZmfqBOzYAAAAASUVORK5CYII=";
const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const config = useRuntimeConfig();
    const pessoasLista = `${config.public.managemant}/getAllPessoa`;
    const pessoasUpdate = `${config.public.managemant}/deletePessoa`;
    const router = useRouter$1();
    const headers = [
      { title: "Documento", value: "doc_identificacao" },
      { title: "Nome/Raz\xE3o Social", value: "nome" },
      { value: "actions" }
    ];
    const { data: pessoasItems, pending } = ([__temp, __restore] = withAsyncContext(() => useLazyFetch(
      pessoasLista,
      "$Y8azOgWBC8"
    )), __temp = await __temp, __restore(), __temp);
    async function deletePessoa(item) {
      item.excluido = !item.excluido;
      try {
        await useFetch(`${pessoasUpdate}/${item.id}`, {
          method: "PUT",
          body: JSON.stringify({ excluido: item.excluido })
        }, "$R09XREGJQC");
      } catch (error) {
        console.error("Erro ao excluir pessoa:", error);
      }
    }
    function redirectToView(id) {
      router.push({ path: `/pessoas/vizualizar/${id}` });
    }
    function redirectToUpdate(id) {
      router.push({ path: `/pessoas/atualizar/${id}` });
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      if (!unref(pending)) {
        _push(ssrRenderComponent(VContainer, mergeProps({ class: "mt-5" }, _attrs), {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_NuxtLink, { to: "/pessoas" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<img class="btn-pointer"${ssrRenderAttr("src", _imports_0)} alt="Sair" data-v-8054c56e${_scopeId2}>`);
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
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(VDataTable, {
                headers,
                items: unref(pessoasItems),
                "item-key": "id"
              }, {
                "item.actions": withCtx(({ item }, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(VRow, null, {
                      default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<div class="btn-pointer" title="Visualizar" data-v-8054c56e${_scopeId3}><img style="${ssrRenderStyle({ "width": "40px", "height": "40px" })}"${ssrRenderAttr("src", _imports_1)} alt="Visualizar" data-v-8054c56e${_scopeId3}></div><div class="btn-pointer" title="Visualizar" data-v-8054c56e${_scopeId3}><img style="${ssrRenderStyle({ "width": "40px", "height": "40px" })}"${ssrRenderAttr("src", _imports_2)} alt="Visualizar" data-v-8054c56e${_scopeId3}></div><div class="btn-pointer" title="Visualizar" data-v-8054c56e${_scopeId3}>`);
                          if (item.excluido) {
                            _push4(`<img style="${ssrRenderStyle({ "width": "40px", "height": "40px" })}"${ssrRenderAttr("src", _imports_3)} alt="Visualizar" title="Reativar" data-v-8054c56e${_scopeId3}>`);
                          } else {
                            _push4(`<img${ssrRenderAttr("src", _imports_4)} alt="Excluir" class="trash-icon" style="${ssrRenderStyle({ "width": "40px", "height": "40px" })}" title="Excluir" data-v-8054c56e${_scopeId3}>`);
                          }
                          _push4(`</div>`);
                        } else {
                          return [
                            createVNode("div", {
                              class: "btn-pointer",
                              onClick: ($event) => redirectToView(item.id),
                              title: "Visualizar"
                            }, [
                              createVNode("img", {
                                style: { "width": "40px", "height": "40px" },
                                src: _imports_1,
                                alt: "Visualizar"
                              })
                            ], 8, ["onClick"]),
                            createVNode("div", {
                              class: "btn-pointer",
                              onClick: ($event) => redirectToUpdate(item.id),
                              title: "Visualizar"
                            }, [
                              createVNode("img", {
                                style: { "width": "40px", "height": "40px" },
                                src: _imports_2,
                                alt: "Visualizar"
                              })
                            ], 8, ["onClick"]),
                            createVNode("div", {
                              class: "btn-pointer",
                              onClick: ($event) => deletePessoa(item),
                              title: "Visualizar"
                            }, [
                              item.excluido ? (openBlock(), createBlock("img", {
                                key: 0,
                                style: { "width": "40px", "height": "40px" },
                                src: _imports_3,
                                alt: "Visualizar",
                                title: "Reativar"
                              })) : (openBlock(), createBlock("img", {
                                key: 1,
                                src: _imports_4,
                                alt: "Excluir",
                                class: "trash-icon",
                                style: { "width": "40px", "height": "40px" },
                                title: "Excluir"
                              }))
                            ], 8, ["onClick"])
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(VRow, null, {
                        default: withCtx(() => [
                          createVNode("div", {
                            class: "btn-pointer",
                            onClick: ($event) => redirectToView(item.id),
                            title: "Visualizar"
                          }, [
                            createVNode("img", {
                              style: { "width": "40px", "height": "40px" },
                              src: _imports_1,
                              alt: "Visualizar"
                            })
                          ], 8, ["onClick"]),
                          createVNode("div", {
                            class: "btn-pointer",
                            onClick: ($event) => redirectToUpdate(item.id),
                            title: "Visualizar"
                          }, [
                            createVNode("img", {
                              style: { "width": "40px", "height": "40px" },
                              src: _imports_2,
                              alt: "Visualizar"
                            })
                          ], 8, ["onClick"]),
                          createVNode("div", {
                            class: "btn-pointer",
                            onClick: ($event) => deletePessoa(item),
                            title: "Visualizar"
                          }, [
                            item.excluido ? (openBlock(), createBlock("img", {
                              key: 0,
                              style: { "width": "40px", "height": "40px" },
                              src: _imports_3,
                              alt: "Visualizar",
                              title: "Reativar"
                            })) : (openBlock(), createBlock("img", {
                              key: 1,
                              src: _imports_4,
                              alt: "Excluir",
                              class: "trash-icon",
                              style: { "width": "40px", "height": "40px" },
                              title: "Excluir"
                            }))
                          ], 8, ["onClick"])
                        ]),
                        _: 2
                      }, 1024)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_NuxtLink, { to: "/home" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<img${ssrRenderAttr("src", _imports_0$1)} alt="Sair" data-v-8054c56e${_scopeId2}>`);
                  } else {
                    return [
                      createVNode("img", {
                        src: _imports_0$1,
                        alt: "Sair"
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_NuxtLink, { to: "/pessoas" }, {
                  default: withCtx(() => [
                    createVNode("img", {
                      class: "btn-pointer",
                      src: _imports_0,
                      alt: "Sair"
                    })
                  ]),
                  _: 1
                }),
                createVNode(VDataTable, {
                  headers,
                  items: unref(pessoasItems),
                  "item-key": "id"
                }, {
                  "item.actions": withCtx(({ item }) => [
                    createVNode(VRow, null, {
                      default: withCtx(() => [
                        createVNode("div", {
                          class: "btn-pointer",
                          onClick: ($event) => redirectToView(item.id),
                          title: "Visualizar"
                        }, [
                          createVNode("img", {
                            style: { "width": "40px", "height": "40px" },
                            src: _imports_1,
                            alt: "Visualizar"
                          })
                        ], 8, ["onClick"]),
                        createVNode("div", {
                          class: "btn-pointer",
                          onClick: ($event) => redirectToUpdate(item.id),
                          title: "Visualizar"
                        }, [
                          createVNode("img", {
                            style: { "width": "40px", "height": "40px" },
                            src: _imports_2,
                            alt: "Visualizar"
                          })
                        ], 8, ["onClick"]),
                        createVNode("div", {
                          class: "btn-pointer",
                          onClick: ($event) => deletePessoa(item),
                          title: "Visualizar"
                        }, [
                          item.excluido ? (openBlock(), createBlock("img", {
                            key: 0,
                            style: { "width": "40px", "height": "40px" },
                            src: _imports_3,
                            alt: "Visualizar",
                            title: "Reativar"
                          })) : (openBlock(), createBlock("img", {
                            key: 1,
                            src: _imports_4,
                            alt: "Excluir",
                            class: "trash-icon",
                            style: { "width": "40px", "height": "40px" },
                            title: "Excluir"
                          }))
                        ], 8, ["onClick"])
                      ]),
                      _: 2
                    }, 1024)
                  ]),
                  _: 1
                }, 8, ["items"]),
                createVNode(_component_NuxtLink, { to: "/home" }, {
                  default: withCtx(() => [
                    createVNode("img", {
                      src: _imports_0$1,
                      alt: "Sair"
                    })
                  ]),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/pessoas/registros/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-8054c56e"]]);

export { index as default };
//# sourceMappingURL=index-wLHG1x9y.mjs.map
