import { _ as __nuxt_component_0 } from './nuxt-link-TpvcaGEw.mjs';
import { ref, withAsyncContext, withCtx, createVNode, unref, openBlock, createBlock, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderAttr, ssrRenderStyle } from 'vue/server-renderer';
import { _ as _imports_0 } from './novo-CWU3oYa5.mjs';
import { _ as _imports_1 } from './editar-BcGPsVK2.mjs';
import { _ as _imports_2, a as _imports_3 } from './excluido-D7FHZla7.mjs';
import { c as useRuntimeConfig } from './server.mjs';
import { u as useFetch } from './fetch-DOsfzFYE.mjs';
import { V as VContainer } from './VContainer-CUysD4sO.mjs';
import { V as VRow } from './VRow-Bqz0CuIN.mjs';
import { V as VDataTable } from './VDataTable-BvoCqvdy.mjs';
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
import './asyncData-B13qrLU7.mjs';
import './filter-DEBkKozo.mjs';
import './VList-C6CbBWCS.mjs';
import './VAvatar-Ov8UECBZ.mjs';
import './VImg-C5puQtOR.mjs';
import './VResponsive-BwPb2GHE.mjs';

const _sfc_main = {
  __name: "lista",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const config = useRuntimeConfig();
    const getSelo = `${config.public.managemant}/tipo-selos`;
    const deleteSelo = `${config.public.managemant}/tipo-selos`;
    const getUfs = `${config.public.managemant}/listarUF`;
    const selos = ref([]);
    const ufList = ref([]);
    const { data: ufs } = ([__temp, __restore] = withAsyncContext(() => useFetch(getUfs, { method: "GET" }, "$7yCH3mLdj9")), __temp = await __temp, __restore(), __temp);
    ufList.value = ufs.value;
    const { data: selosList } = ([__temp, __restore] = withAsyncContext(() => useFetch(getSelo, { method: "GET" }, "$sAxng7NVFv")), __temp = await __temp, __restore(), __temp);
    selos.value = selosList.value;
    const headers = [
      { title: "ID", value: "id" },
      { title: "UF", value: "uf" },
      { title: "Cor", value: "cor" },
      { title: "Descri\xE7\xE3o", value: "descricao" },
      { title: "Valor", value: "vlr_compra" },
      { title: "A\xE7\xF5es", value: "actions", sortable: false }
    ];
    async function HandleDeleteSelo(item) {
      item.excluido = !item.excluido;
      const updatedItem = JSON.stringify({ excluido: item.excluido });
      try {
        const { error } = await useFetch(`${deleteSelo}/${item.id}`, {
          method: "PUT",
          body: updatedItem
        }, "$fzpNhzhZeF");
      } catch (err) {
        console.error("Erro ao excluir selo:", err);
      }
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      const _component_nuxt_link = __nuxt_component_0;
      _push(ssrRenderComponent(VContainer, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VRow, { class: "mb-5 mt-5" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_NuxtLink, { to: "/tiposSelos/cadastro" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<img class="btn-pointer"${ssrRenderAttr("src", _imports_0)} alt="Cadastro"${_scopeId3}>`);
                      } else {
                        return [
                          createVNode("img", {
                            class: "btn-pointer",
                            src: _imports_0,
                            alt: "Cadastro"
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<h1 class="mt-3 ml-3"${_scopeId2}>Tipos de Selos</h1>`);
                } else {
                  return [
                    createVNode(_component_NuxtLink, { to: "/tiposSelos/cadastro" }, {
                      default: withCtx(() => [
                        createVNode("img", {
                          class: "btn-pointer",
                          src: _imports_0,
                          alt: "Cadastro"
                        })
                      ]),
                      _: 1
                    }),
                    createVNode("h1", { class: "mt-3 ml-3" }, "Tipos de Selos")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(VDataTable, {
              items: unref(selosList),
              headers,
              "item-value": "id"
            }, {
              "item.actions": withCtx(({ item }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VRow, { style: { "margin-top": "-6px" } }, {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div${_scopeId3}>`);
                        _push4(ssrRenderComponent(_component_nuxt_link, {
                          to: `/tiposSelos/atualizar/${item.id}`
                        }, {
                          default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<img style="${ssrRenderStyle({ "width": "30px", "height": "30px", "cursor": "pointer" })}"${ssrRenderAttr("src", _imports_1)} alt="Atualizar"${_scopeId4}>`);
                            } else {
                              return [
                                createVNode("img", {
                                  style: { "width": "30px", "height": "30px", "cursor": "pointer" },
                                  src: _imports_1,
                                  alt: "Atualizar"
                                })
                              ];
                            }
                          }),
                          _: 2
                        }, _parent4, _scopeId3));
                        _push4(`</div><div title="Deletar"${_scopeId3}>`);
                        if (item.excluido) {
                          _push4(`<img style="${ssrRenderStyle({ "width": "30px", "height": "30px", "cursor": "pointer", "margin-left": "7px" })}"${ssrRenderAttr("src", _imports_2)} alt="Visualizar" title="Reativar"${_scopeId3}>`);
                        } else {
                          _push4(`<img${ssrRenderAttr("src", _imports_3)} alt="Excluir" class="trash-icon" style="${ssrRenderStyle({ "width": "30px", "height": "30px", "cursor": "pointer", "margin-left": "7px" })}" title="Excluir"${_scopeId3}>`);
                        }
                        _push4(`</div>`);
                      } else {
                        return [
                          createVNode("div", null, [
                            createVNode(_component_nuxt_link, {
                              to: `/tiposSelos/atualizar/${item.id}`
                            }, {
                              default: withCtx(() => [
                                createVNode("img", {
                                  style: { "width": "30px", "height": "30px", "cursor": "pointer" },
                                  src: _imports_1,
                                  alt: "Atualizar"
                                })
                              ]),
                              _: 2
                            }, 1032, ["to"])
                          ]),
                          createVNode("div", {
                            onClick: ($event) => HandleDeleteSelo(item),
                            title: "Deletar"
                          }, [
                            item.excluido ? (openBlock(), createBlock("img", {
                              key: 0,
                              style: { "width": "30px", "height": "30px", "cursor": "pointer", "margin-left": "7px" },
                              src: _imports_2,
                              alt: "Visualizar",
                              title: "Reativar"
                            })) : (openBlock(), createBlock("img", {
                              key: 1,
                              src: _imports_3,
                              alt: "Excluir",
                              class: "trash-icon",
                              style: { "width": "30px", "height": "30px", "cursor": "pointer", "margin-left": "7px" },
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
                    createVNode(VRow, { style: { "margin-top": "-6px" } }, {
                      default: withCtx(() => [
                        createVNode("div", null, [
                          createVNode(_component_nuxt_link, {
                            to: `/tiposSelos/atualizar/${item.id}`
                          }, {
                            default: withCtx(() => [
                              createVNode("img", {
                                style: { "width": "30px", "height": "30px", "cursor": "pointer" },
                                src: _imports_1,
                                alt: "Atualizar"
                              })
                            ]),
                            _: 2
                          }, 1032, ["to"])
                        ]),
                        createVNode("div", {
                          onClick: ($event) => HandleDeleteSelo(item),
                          title: "Deletar"
                        }, [
                          item.excluido ? (openBlock(), createBlock("img", {
                            key: 0,
                            style: { "width": "30px", "height": "30px", "cursor": "pointer", "margin-left": "7px" },
                            src: _imports_2,
                            alt: "Visualizar",
                            title: "Reativar"
                          })) : (openBlock(), createBlock("img", {
                            key: 1,
                            src: _imports_3,
                            alt: "Excluir",
                            class: "trash-icon",
                            style: { "width": "30px", "height": "30px", "cursor": "pointer", "margin-left": "7px" },
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
          } else {
            return [
              createVNode(VRow, { class: "mb-5 mt-5" }, {
                default: withCtx(() => [
                  createVNode(_component_NuxtLink, { to: "/tiposSelos/cadastro" }, {
                    default: withCtx(() => [
                      createVNode("img", {
                        class: "btn-pointer",
                        src: _imports_0,
                        alt: "Cadastro"
                      })
                    ]),
                    _: 1
                  }),
                  createVNode("h1", { class: "mt-3 ml-3" }, "Tipos de Selos")
                ]),
                _: 1
              }),
              createVNode(VDataTable, {
                items: unref(selosList),
                headers,
                "item-value": "id"
              }, {
                "item.actions": withCtx(({ item }) => [
                  createVNode(VRow, { style: { "margin-top": "-6px" } }, {
                    default: withCtx(() => [
                      createVNode("div", null, [
                        createVNode(_component_nuxt_link, {
                          to: `/tiposSelos/atualizar/${item.id}`
                        }, {
                          default: withCtx(() => [
                            createVNode("img", {
                              style: { "width": "30px", "height": "30px", "cursor": "pointer" },
                              src: _imports_1,
                              alt: "Atualizar"
                            })
                          ]),
                          _: 2
                        }, 1032, ["to"])
                      ]),
                      createVNode("div", {
                        onClick: ($event) => HandleDeleteSelo(item),
                        title: "Deletar"
                      }, [
                        item.excluido ? (openBlock(), createBlock("img", {
                          key: 0,
                          style: { "width": "30px", "height": "30px", "cursor": "pointer", "margin-left": "7px" },
                          src: _imports_2,
                          alt: "Visualizar",
                          title: "Reativar"
                        })) : (openBlock(), createBlock("img", {
                          key: 1,
                          src: _imports_3,
                          alt: "Excluir",
                          class: "trash-icon",
                          style: { "width": "30px", "height": "30px", "cursor": "pointer", "margin-left": "7px" },
                          title: "Excluir"
                        }))
                      ], 8, ["onClick"])
                    ]),
                    _: 2
                  }, 1024)
                ]),
                _: 1
              }, 8, ["items"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/tiposSelos/lista.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : undefined;
};

export { _sfc_main as default };
//# sourceMappingURL=lista-D4GD1OXs.mjs.map
