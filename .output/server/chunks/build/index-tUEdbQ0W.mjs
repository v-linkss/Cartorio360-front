import { _ as __nuxt_component_0 } from './nuxt-link-DyZc7qn_.mjs';
import { _ as _export_sfc, u as useRouter$1, aV as VDataTable, b as useRuntimeConfig } from './server.mjs';
import { u as useLazyFetch, a as useFetch } from './fetch-3DdSDKmI.mjs';
import { withAsyncContext, unref, mergeProps, withCtx, createVNode, openBlock, createBlock, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderAttr, ssrRenderStyle } from 'vue/server-renderer';
import { _ as _imports_0, a as _imports_2, b as _imports_3 } from './excluido-BJN1kjTO.mjs';
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
//# sourceMappingURL=index-tUEdbQ0W.mjs.map
