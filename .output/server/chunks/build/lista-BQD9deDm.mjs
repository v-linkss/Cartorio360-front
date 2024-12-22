import { _ as __nuxt_component_0 } from './nuxt-link-DyZc7qn_.mjs';
import { _ as __nuxt_component_1 } from './MoneyInput-CqoPZ5qG.mjs';
import { as as VDataTable, V as VTextField, e as VBtn, b as useRuntimeConfig } from './server.mjs';
import { ref, withAsyncContext, withCtx, createVNode, unref, openBlock, createBlock, isRef, createTextVNode, withModifiers, useSSRContext } from 'vue';
import { u as useFetch } from './fetch-bT3G74K0.mjs';
import { ssrRenderComponent, ssrRenderAttr, ssrRenderStyle } from 'vue/server-renderer';
import { _ as _imports_0, a as _imports_1, b as _imports_2, c as _imports_3 } from './mudarStatus-CVlVNUDw.mjs';
import { V as VContainer } from './VContainer-Dd724oJ4.mjs';
import { V as VRow } from './VRow-CVrt2SWs.mjs';
import { a as VDialog, V as VCard, d as VCardTitle, c as VCardText } from './VCard-uMKFEuGZ.mjs';
import { V as VForm } from './VForm-CmTVV0a-.mjs';
import { V as VAutocomplete } from './VAutocomplete-D1-afj5_.mjs';
import '../runtime.mjs';
import 'node:http';
import 'node:https';
import 'fs';
import 'path';
import 'node:fs';
import 'node:url';
import 'v-money3';
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
  __name: "lista",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const config = useRuntimeConfig();
    const getSelo = `${config.public.managemant}/tipo-selos`;
    `${config.public.managemant}/tipo-selos`;
    `${config.public.managemant}/tipo-selos`;
    const deleteSelo = `${config.public.managemant}/tipo-selos-delete`;
    const getUfs = `${config.public.managemant}/uf`;
    const selos = ref([]);
    const isEditModalOpen = ref(false);
    const ufList = ref([]);
    const editForm = ref({
      id: null,
      uf: "",
      cor: "",
      descricao: "",
      vlr_compra: null
    });
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
      const _component_MoneyInput = __nuxt_component_1;
      _push(`<!--[-->`);
      _push(ssrRenderComponent(VContainer, null, {
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
      _push(ssrRenderComponent(VDialog, {
        modelValue: unref(isEditModalOpen),
        "onUpdate:modelValue": ($event) => isRef(isEditModalOpen) ? isEditModalOpen.value = $event : null,
        "max-width": "500"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VCard, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VCardTitle, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<span class="text-h6"${_scopeId3}>Editar Selo</span>`);
                      } else {
                        return [
                          createVNode("span", { class: "text-h6" }, "Editar Selo")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VCardText, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VForm, { onSubmit: _ctx.HandleSubmitEdit }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VAutocomplete, {
                                modelValue: unref(editForm).uf,
                                "onUpdate:modelValue": ($event) => unref(editForm).uf = $event,
                                items: unref(ufList),
                                class: "mb-5",
                                "item-title": "descricao",
                                "item-value": "sigla",
                                label: "UF",
                                required: "",
                                outlined: ""
                              }, null, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(VTextField, {
                                modelValue: unref(editForm).cor,
                                "onUpdate:modelValue": ($event) => unref(editForm).cor = $event,
                                label: "Cor",
                                required: "",
                                outlined: ""
                              }, null, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(VTextField, {
                                modelValue: unref(editForm).descricao,
                                "onUpdate:modelValue": ($event) => unref(editForm).descricao = $event,
                                label: "Descri\xE7\xE3o",
                                required: "",
                                outlined: ""
                              }, null, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_MoneyInput, {
                                required: "",
                                modelValue: unref(editForm).vlr_compra,
                                "onUpdate:modelValue": ($event) => unref(editForm).vlr_compra = $event
                              }, null, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(VRow, null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(VBtn, {
                                      type: "submit",
                                      color: "green",
                                      size: "large"
                                    }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`Salvar`);
                                        } else {
                                          return [
                                            createTextVNode("Salvar")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(VBtn, {
                                      color: "red",
                                      size: "large",
                                      onClick: ($event) => isEditModalOpen.value = false
                                    }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`Cancelar`);
                                        } else {
                                          return [
                                            createTextVNode("Cancelar")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(VBtn, {
                                        type: "submit",
                                        color: "green",
                                        size: "large"
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode("Salvar")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(VBtn, {
                                        color: "red",
                                        size: "large",
                                        onClick: ($event) => isEditModalOpen.value = false
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode("Cancelar")
                                        ]),
                                        _: 1
                                      }, 8, ["onClick"])
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(VAutocomplete, {
                                  modelValue: unref(editForm).uf,
                                  "onUpdate:modelValue": ($event) => unref(editForm).uf = $event,
                                  items: unref(ufList),
                                  class: "mb-5",
                                  "item-title": "descricao",
                                  "item-value": "sigla",
                                  label: "UF",
                                  required: "",
                                  outlined: ""
                                }, null, 8, ["modelValue", "onUpdate:modelValue", "items"]),
                                createVNode(VTextField, {
                                  modelValue: unref(editForm).cor,
                                  "onUpdate:modelValue": ($event) => unref(editForm).cor = $event,
                                  label: "Cor",
                                  required: "",
                                  outlined: ""
                                }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                                createVNode(VTextField, {
                                  modelValue: unref(editForm).descricao,
                                  "onUpdate:modelValue": ($event) => unref(editForm).descricao = $event,
                                  label: "Descri\xE7\xE3o",
                                  required: "",
                                  outlined: ""
                                }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                                createVNode(_component_MoneyInput, {
                                  required: "",
                                  modelValue: unref(editForm).vlr_compra,
                                  "onUpdate:modelValue": ($event) => unref(editForm).vlr_compra = $event
                                }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                                createVNode(VRow, null, {
                                  default: withCtx(() => [
                                    createVNode(VBtn, {
                                      type: "submit",
                                      color: "green",
                                      size: "large"
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode("Salvar")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(VBtn, {
                                      color: "red",
                                      size: "large",
                                      onClick: ($event) => isEditModalOpen.value = false
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode("Cancelar")
                                      ]),
                                      _: 1
                                    }, 8, ["onClick"])
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VForm, {
                            onSubmit: withModifiers(_ctx.HandleSubmitEdit, ["prevent"])
                          }, {
                            default: withCtx(() => [
                              createVNode(VAutocomplete, {
                                modelValue: unref(editForm).uf,
                                "onUpdate:modelValue": ($event) => unref(editForm).uf = $event,
                                items: unref(ufList),
                                class: "mb-5",
                                "item-title": "descricao",
                                "item-value": "sigla",
                                label: "UF",
                                required: "",
                                outlined: ""
                              }, null, 8, ["modelValue", "onUpdate:modelValue", "items"]),
                              createVNode(VTextField, {
                                modelValue: unref(editForm).cor,
                                "onUpdate:modelValue": ($event) => unref(editForm).cor = $event,
                                label: "Cor",
                                required: "",
                                outlined: ""
                              }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                              createVNode(VTextField, {
                                modelValue: unref(editForm).descricao,
                                "onUpdate:modelValue": ($event) => unref(editForm).descricao = $event,
                                label: "Descri\xE7\xE3o",
                                required: "",
                                outlined: ""
                              }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                              createVNode(_component_MoneyInput, {
                                required: "",
                                modelValue: unref(editForm).vlr_compra,
                                "onUpdate:modelValue": ($event) => unref(editForm).vlr_compra = $event
                              }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                              createVNode(VRow, null, {
                                default: withCtx(() => [
                                  createVNode(VBtn, {
                                    type: "submit",
                                    color: "green",
                                    size: "large"
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode("Salvar")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(VBtn, {
                                    color: "red",
                                    size: "large",
                                    onClick: ($event) => isEditModalOpen.value = false
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode("Cancelar")
                                    ]),
                                    _: 1
                                  }, 8, ["onClick"])
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }, 8, ["onSubmit"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VCardTitle, null, {
                      default: withCtx(() => [
                        createVNode("span", { class: "text-h6" }, "Editar Selo")
                      ]),
                      _: 1
                    }),
                    createVNode(VCardText, null, {
                      default: withCtx(() => [
                        createVNode(VForm, {
                          onSubmit: withModifiers(_ctx.HandleSubmitEdit, ["prevent"])
                        }, {
                          default: withCtx(() => [
                            createVNode(VAutocomplete, {
                              modelValue: unref(editForm).uf,
                              "onUpdate:modelValue": ($event) => unref(editForm).uf = $event,
                              items: unref(ufList),
                              class: "mb-5",
                              "item-title": "descricao",
                              "item-value": "sigla",
                              label: "UF",
                              required: "",
                              outlined: ""
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "items"]),
                            createVNode(VTextField, {
                              modelValue: unref(editForm).cor,
                              "onUpdate:modelValue": ($event) => unref(editForm).cor = $event,
                              label: "Cor",
                              required: "",
                              outlined: ""
                            }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                            createVNode(VTextField, {
                              modelValue: unref(editForm).descricao,
                              "onUpdate:modelValue": ($event) => unref(editForm).descricao = $event,
                              label: "Descri\xE7\xE3o",
                              required: "",
                              outlined: ""
                            }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                            createVNode(_component_MoneyInput, {
                              required: "",
                              modelValue: unref(editForm).vlr_compra,
                              "onUpdate:modelValue": ($event) => unref(editForm).vlr_compra = $event
                            }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                            createVNode(VRow, null, {
                              default: withCtx(() => [
                                createVNode(VBtn, {
                                  type: "submit",
                                  color: "green",
                                  size: "large"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode("Salvar")
                                  ]),
                                  _: 1
                                }),
                                createVNode(VBtn, {
                                  color: "red",
                                  size: "large",
                                  onClick: ($event) => isEditModalOpen.value = false
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode("Cancelar")
                                  ]),
                                  _: 1
                                }, 8, ["onClick"])
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }, 8, ["onSubmit"])
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
              createVNode(VCard, null, {
                default: withCtx(() => [
                  createVNode(VCardTitle, null, {
                    default: withCtx(() => [
                      createVNode("span", { class: "text-h6" }, "Editar Selo")
                    ]),
                    _: 1
                  }),
                  createVNode(VCardText, null, {
                    default: withCtx(() => [
                      createVNode(VForm, {
                        onSubmit: withModifiers(_ctx.HandleSubmitEdit, ["prevent"])
                      }, {
                        default: withCtx(() => [
                          createVNode(VAutocomplete, {
                            modelValue: unref(editForm).uf,
                            "onUpdate:modelValue": ($event) => unref(editForm).uf = $event,
                            items: unref(ufList),
                            class: "mb-5",
                            "item-title": "descricao",
                            "item-value": "sigla",
                            label: "UF",
                            required: "",
                            outlined: ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "items"]),
                          createVNode(VTextField, {
                            modelValue: unref(editForm).cor,
                            "onUpdate:modelValue": ($event) => unref(editForm).cor = $event,
                            label: "Cor",
                            required: "",
                            outlined: ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                          createVNode(VTextField, {
                            modelValue: unref(editForm).descricao,
                            "onUpdate:modelValue": ($event) => unref(editForm).descricao = $event,
                            label: "Descri\xE7\xE3o",
                            required: "",
                            outlined: ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                          createVNode(_component_MoneyInput, {
                            required: "",
                            modelValue: unref(editForm).vlr_compra,
                            "onUpdate:modelValue": ($event) => unref(editForm).vlr_compra = $event
                          }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                          createVNode(VRow, null, {
                            default: withCtx(() => [
                              createVNode(VBtn, {
                                type: "submit",
                                color: "green",
                                size: "large"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode("Salvar")
                                ]),
                                _: 1
                              }),
                              createVNode(VBtn, {
                                color: "red",
                                size: "large",
                                onClick: ($event) => isEditModalOpen.value = false
                              }, {
                                default: withCtx(() => [
                                  createTextVNode("Cancelar")
                                ]),
                                _: 1
                              }, 8, ["onClick"])
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }, 8, ["onSubmit"])
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
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/tiposSelos/lista.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=lista-BQD9deDm.mjs.map
