import { _ as __nuxt_component_0 } from './nuxt-link-TpvcaGEw.mjs';
import { ref, withAsyncContext, computed, unref, mergeProps, withCtx, createVNode, isRef, openBlock, createBlock, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderStyle, ssrRenderAttr } from 'vue/server-renderer';
import { _ as _imports_0 } from './novo-CWU3oYa5.mjs';
import { _ as _imports_1 } from './visualizar-BoZ30DMV.mjs';
import { _ as _imports_1$1 } from './editar-BcGPsVK2.mjs';
import { _ as _imports_2, a as _imports_3 } from './excluido-ceRs5bdR.mjs';
import { e as useCookie, u as useRouter$1, V as VTextField, c as useRuntimeConfig } from './server.mjs';
import { u as useFetch } from './fetch-DOsfzFYE.mjs';
import { f as fetchWithToken } from './fetchWithToken-Cjtduyn0.mjs';
import { V as VContainer } from './VContainer-CUysD4sO.mjs';
import { V as VRow } from './VRow-Bqz0CuIN.mjs';
import { V as VDataTable } from './VDataTable-D6BQKL_5.mjs';
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
import './filter-D58pPGs5.mjs';
import './VList-BkmWkhVS.mjs';
import './VAvatar-Dy2zMqU_.mjs';
import './VResponsive-BwPb2GHE.mjs';

const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const config = useRuntimeConfig();
    const tipoAtosLista = `${config.public.managemant}/listar_tipo_atos`;
    const tipoAtosUpdate = `${config.public.managemant}/tipo-atos`;
    `${config.public.managemant}/tipo-atos/delete`;
    const usuario_token = ref(useCookie("auth_token").value) || null;
    const cartorio_token = ref(useCookie("user-data").value.cartorio_token) || null;
    const router = useRouter$1();
    const search = ref("");
    const searchDoc = ref("");
    const headers = [
      { title: "ID", value: "id" },
      { title: "Tipo de servi\xE7o", value: "tipo_servico" },
      { title: "Descri\xE7\xE3o", value: "descricao" },
      { value: "actions" }
    ];
    const cartorioTokenPayload = {
      cartorio_token: cartorio_token.value,
      tipo: "ATO",
      user_token: usuario_token.value
    };
    const { data: tipoAtos, status } = ([__temp, __restore] = withAsyncContext(() => useFetch(`${tipoAtosLista}`, {
      method: "POST",
      body: cartorioTokenPayload
    }, "$oZbUuIoeXz")), __temp = await __temp, __restore(), __temp);
    const filteredAtoTipo = computed(() => {
      if (!tipoAtos.value) return [];
      return tipoAtos.value.filter((item) => {
        var _a2, _b2;
        var _a, _b;
        const descricao = (_a2 = (_a = item.descricao) == null ? undefined : _a.toLowerCase()) != null ? _a2 : "";
        const tipoServico = (_b2 = (_b = item.tipo_servico) == null ? undefined : _b.toLowerCase()) != null ? _b2 : "";
        return descricao.includes(searchDoc.value.toLowerCase()) && tipoServico.includes(search.value.toLowerCase());
      });
    });
    async function deleteTipoMatricula(item) {
      item.excluido = !item.excluido;
      try {
        await fetchWithToken(`${tipoAtosUpdate}/${item.id}`, {
          method: "PUT",
          body: { excluido: item.excluido }
        });
      } catch (error) {
        console.error("Erro ao excluir pessoa:", error);
      }
    }
    function redirectToView(id) {
      router.push({ path: `/tipoAtos/visualizar/${id}` });
    }
    function redirectToUpdate(id) {
      router.push({ path: `/tipoAtos/atualizar/${id}` });
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      if (unref(status) === "success") {
        _push(ssrRenderComponent(VContainer, mergeProps({ class: "mt-5" }, _attrs), {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_NuxtLink, { to: "/tipoAtos/cadastro" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<img style="${ssrRenderStyle({ "cursor": "pointer" })}"${ssrRenderAttr("src", _imports_0)} alt="Cadastro"${_scopeId2}>`);
                  } else {
                    return [
                      createVNode("img", {
                        style: { "cursor": "pointer" },
                        src: _imports_0,
                        alt: "Cadastro"
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(VRow, { style: { "gap": "3rem" } }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div style="${ssrRenderStyle({ "width": "300px" })}"${_scopeId2}>`);
                    _push3(ssrRenderComponent(VTextField, {
                      class: "mt-7 mb-4",
                      modelValue: unref(search),
                      "onUpdate:modelValue": ($event) => isRef(search) ? search.value = $event : null,
                      label: "tipo do ato",
                      "prepend-inner-icon": "mdi-magnify",
                      variant: "outlined",
                      "hide-details": ""
                    }, null, _parent3, _scopeId2));
                    _push3(`</div><div style="${ssrRenderStyle({ "width": "200px" })}"${_scopeId2}>`);
                    _push3(ssrRenderComponent(VTextField, {
                      class: "mt-7 mb-4",
                      modelValue: unref(searchDoc),
                      "onUpdate:modelValue": ($event) => isRef(searchDoc) ? searchDoc.value = $event : null,
                      label: "Descri\xE7\xE3o",
                      "prepend-inner-icon": "mdi-magnify",
                      variant: "outlined",
                      "hide-details": ""
                    }, null, _parent3, _scopeId2));
                    _push3(`</div>`);
                  } else {
                    return [
                      createVNode("div", { style: { "width": "300px" } }, [
                        createVNode(VTextField, {
                          class: "mt-7 mb-4",
                          modelValue: unref(search),
                          "onUpdate:modelValue": ($event) => isRef(search) ? search.value = $event : null,
                          label: "tipo do ato",
                          "prepend-inner-icon": "mdi-magnify",
                          variant: "outlined",
                          "hide-details": ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      createVNode("div", { style: { "width": "200px" } }, [
                        createVNode(VTextField, {
                          class: "mt-7 mb-4",
                          modelValue: unref(searchDoc),
                          "onUpdate:modelValue": ($event) => isRef(searchDoc) ? searchDoc.value = $event : null,
                          label: "Descri\xE7\xE3o",
                          "prepend-inner-icon": "mdi-magnify",
                          variant: "outlined",
                          "hide-details": ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(VDataTable, {
                density: "compact",
                headers,
                items: unref(filteredAtoTipo),
                "item-key": "id"
              }, {
                "item.actions": withCtx(({ item }, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(VRow, { style: { "display": "flex", "gap": "10px", "justify-content": "flex-end" } }, {
                      default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<div style="${ssrRenderStyle({ "cursor": "pointer" })}" title="Visualizar"${_scopeId3}><img style="${ssrRenderStyle({ "width": "30px", "height": "30px" })}"${ssrRenderAttr("src", _imports_1)} alt="Visualizar"${_scopeId3}></div><div style="${ssrRenderStyle({ "cursor": "pointer" })}" title="Atualizar"${_scopeId3}><img style="${ssrRenderStyle({ "width": "30px", "height": "30px" })}"${ssrRenderAttr("src", _imports_1$1)} alt="Atualizar"${_scopeId3}></div><div style="${ssrRenderStyle({ "cursor": "pointer" })}" title="Deletar"${_scopeId3}>`);
                          if (item.excluido) {
                            _push4(`<img style="${ssrRenderStyle({ "width": "30px", "height": "30px" })}"${ssrRenderAttr("src", _imports_2)} alt="Visualizar" title="Reativar"${_scopeId3}>`);
                          } else {
                            _push4(`<img${ssrRenderAttr("src", _imports_3)} alt="Excluir" class="trash-icon" style="${ssrRenderStyle({ "width": "30px", "height": "30px" })}" title="Excluir"${_scopeId3}>`);
                          }
                          _push4(`</div>`);
                        } else {
                          return [
                            createVNode("div", {
                              style: { "cursor": "pointer" },
                              onClick: ($event) => redirectToView(item.id),
                              title: "Visualizar"
                            }, [
                              createVNode("img", {
                                style: { "width": "30px", "height": "30px" },
                                src: _imports_1,
                                alt: "Visualizar"
                              })
                            ], 8, ["onClick"]),
                            createVNode("div", {
                              style: { "cursor": "pointer" },
                              onClick: ($event) => redirectToUpdate(item.id),
                              title: "Atualizar"
                            }, [
                              createVNode("img", {
                                style: { "width": "30px", "height": "30px" },
                                src: _imports_1$1,
                                alt: "Atualizar"
                              })
                            ], 8, ["onClick"]),
                            createVNode("div", {
                              style: { "cursor": "pointer" },
                              onClick: ($event) => deleteTipoMatricula(item),
                              title: "Deletar"
                            }, [
                              item.excluido ? (openBlock(), createBlock("img", {
                                key: 0,
                                style: { "width": "30px", "height": "30px" },
                                src: _imports_2,
                                alt: "Visualizar",
                                title: "Reativar"
                              })) : (openBlock(), createBlock("img", {
                                key: 1,
                                src: _imports_3,
                                alt: "Excluir",
                                class: "trash-icon",
                                style: { "width": "30px", "height": "30px" },
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
                      createVNode(VRow, { style: { "display": "flex", "gap": "10px", "justify-content": "flex-end" } }, {
                        default: withCtx(() => [
                          createVNode("div", {
                            style: { "cursor": "pointer" },
                            onClick: ($event) => redirectToView(item.id),
                            title: "Visualizar"
                          }, [
                            createVNode("img", {
                              style: { "width": "30px", "height": "30px" },
                              src: _imports_1,
                              alt: "Visualizar"
                            })
                          ], 8, ["onClick"]),
                          createVNode("div", {
                            style: { "cursor": "pointer" },
                            onClick: ($event) => redirectToUpdate(item.id),
                            title: "Atualizar"
                          }, [
                            createVNode("img", {
                              style: { "width": "30px", "height": "30px" },
                              src: _imports_1$1,
                              alt: "Atualizar"
                            })
                          ], 8, ["onClick"]),
                          createVNode("div", {
                            style: { "cursor": "pointer" },
                            onClick: ($event) => deleteTipoMatricula(item),
                            title: "Deletar"
                          }, [
                            item.excluido ? (openBlock(), createBlock("img", {
                              key: 0,
                              style: { "width": "30px", "height": "30px" },
                              src: _imports_2,
                              alt: "Visualizar",
                              title: "Reativar"
                            })) : (openBlock(), createBlock("img", {
                              key: 1,
                              src: _imports_3,
                              alt: "Excluir",
                              class: "trash-icon",
                              style: { "width": "30px", "height": "30px" },
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
                createVNode(_component_NuxtLink, { to: "/tipoAtos/cadastro" }, {
                  default: withCtx(() => [
                    createVNode("img", {
                      style: { "cursor": "pointer" },
                      src: _imports_0,
                      alt: "Cadastro"
                    })
                  ]),
                  _: 1
                }),
                createVNode(VRow, { style: { "gap": "3rem" } }, {
                  default: withCtx(() => [
                    createVNode("div", { style: { "width": "300px" } }, [
                      createVNode(VTextField, {
                        class: "mt-7 mb-4",
                        modelValue: unref(search),
                        "onUpdate:modelValue": ($event) => isRef(search) ? search.value = $event : null,
                        label: "tipo do ato",
                        "prepend-inner-icon": "mdi-magnify",
                        variant: "outlined",
                        "hide-details": ""
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    createVNode("div", { style: { "width": "200px" } }, [
                      createVNode(VTextField, {
                        class: "mt-7 mb-4",
                        modelValue: unref(searchDoc),
                        "onUpdate:modelValue": ($event) => isRef(searchDoc) ? searchDoc.value = $event : null,
                        label: "Descri\xE7\xE3o",
                        "prepend-inner-icon": "mdi-magnify",
                        variant: "outlined",
                        "hide-details": ""
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ])
                  ]),
                  _: 1
                }),
                createVNode(VDataTable, {
                  density: "compact",
                  headers,
                  items: unref(filteredAtoTipo),
                  "item-key": "id"
                }, {
                  "item.actions": withCtx(({ item }) => [
                    createVNode(VRow, { style: { "display": "flex", "gap": "10px", "justify-content": "flex-end" } }, {
                      default: withCtx(() => [
                        createVNode("div", {
                          style: { "cursor": "pointer" },
                          onClick: ($event) => redirectToView(item.id),
                          title: "Visualizar"
                        }, [
                          createVNode("img", {
                            style: { "width": "30px", "height": "30px" },
                            src: _imports_1,
                            alt: "Visualizar"
                          })
                        ], 8, ["onClick"]),
                        createVNode("div", {
                          style: { "cursor": "pointer" },
                          onClick: ($event) => redirectToUpdate(item.id),
                          title: "Atualizar"
                        }, [
                          createVNode("img", {
                            style: { "width": "30px", "height": "30px" },
                            src: _imports_1$1,
                            alt: "Atualizar"
                          })
                        ], 8, ["onClick"]),
                        createVNode("div", {
                          style: { "cursor": "pointer" },
                          onClick: ($event) => deleteTipoMatricula(item),
                          title: "Deletar"
                        }, [
                          item.excluido ? (openBlock(), createBlock("img", {
                            key: 0,
                            style: { "width": "30px", "height": "30px" },
                            src: _imports_2,
                            alt: "Visualizar",
                            title: "Reativar"
                          })) : (openBlock(), createBlock("img", {
                            key: 1,
                            src: _imports_3,
                            alt: "Excluir",
                            class: "trash-icon",
                            style: { "width": "30px", "height": "30px" },
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
      } else {
        _push(`<!---->`);
      }
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/tipoAtos/lista/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : undefined;
};

export { _sfc_main as default };
//# sourceMappingURL=index-CYlilH8H.mjs.map
