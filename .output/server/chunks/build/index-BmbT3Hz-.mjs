import { _ as __nuxt_component_0 } from './nuxt-link-TpvcaGEw.mjs';
import { ref, withAsyncContext, computed, resolveDirective, mergeProps, withCtx, createVNode, unref, isRef, withDirectives, openBlock, createBlock, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderStyle, ssrRenderAttr, ssrGetDirectiveProps } from 'vue/server-renderer';
import { _ as _imports_0 } from './novo-CWU3oYa5.mjs';
import { _ as _imports_1 } from './visualizar-BoZ30DMV.mjs';
import { _ as _imports_1$1 } from './editar-BcGPsVK2.mjs';
import { _ as _imports_2, a as _imports_3 } from './excluido-D7FHZla7.mjs';
import { e as useCookie, u as useRouter$1, f as VTextField, c as useRuntimeConfig } from './server.mjs';
import { f as formatDate } from './formatDate-DflkuJ_V.mjs';
import { f as fetchWithToken } from './fetchWithToken-CCGIQo0b.mjs';
import { V as VContainer } from './VContainer-CUysD4sO.mjs';
import { V as VRow } from './VRow-Bqz0CuIN.mjs';
import { V as VCol } from './VCol-BT4RzX0Q.mjs';
import { V as VDataTable } from './VDataTable-BsvkD4vs.mjs';
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
import './fetch-uf6n1sXR.mjs';
import './asyncData-B8plM1p3.mjs';
import './filter-C0rfsHC2.mjs';
import './VList-p98P2nQM.mjs';
import './VAvatar-qPSA6PD-.mjs';
import './VImg-BQaOrhxX.mjs';
import './VResponsive-BwPb2GHE.mjs';

const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const config = useRuntimeConfig();
    const matriculasLista = `${config.public.auth}/service/gerencia/listar_matriculas`;
    const matriculasUpdate = `${config.public.auth}/service/gerencia/matriculas`;
    const tokenCookie = useCookie("auth_token");
    const router = useRouter$1();
    const searchDescricao = ref("");
    const searchNumero = ref("");
    const searchProtocolo = ref("");
    const searchData = ref("");
    const headers = [
      { title: "N\xFAmero", value: "numero" },
      { title: "Data", value: "data" },
      { title: "Protocolo", value: "protocolo" },
      { title: "Descri\xE7\xE3o", value: "descricao" },
      { value: "actions" }
    ];
    const matriculasItems = ([__temp, __restore] = withAsyncContext(() => $fetch(
      `${matriculasLista}?pageNumber=${1}&pageSize=${1e6}`,
      {
        method: "POST",
        body: { cartorio_token: useCookie("user-data").value.cartorio_token },
        headers: {
          Authorization: `Bearer ${tokenCookie.value}`
        }
      }
    )), __temp = await __temp, __restore(), __temp);
    const filteredMatriculas = computed(() => {
      if (!matriculasItems || matriculasItems.length === 0) {
        return [];
      }
      return matriculasItems.filter((item) => {
        const numeroIdentificacao = item.numero ? item.numero.toLowerCase() : "";
        const descricao = item.descricao ? item.descricao.toLowerCase() : "";
        const protocolo = item.protocolo ? item.protocolo.toLowerCase() : "";
        const data = item.data ? formatDate(item.data, "dd/mm/yyyy") : "";
        const matchesNumero = numeroIdentificacao.includes(
          searchNumero.value.toLowerCase()
        );
        const matchesDescricao = descricao.includes(
          searchDescricao.value.toLowerCase()
        );
        const matchesProtocolo = protocolo.includes(
          searchProtocolo.value.toLowerCase()
        );
        const matchesData = data.includes(searchData.value);
        return matchesNumero && matchesDescricao && matchesProtocolo && matchesData;
      }).map((item) => {
        return {
          ...item,
          data: formatDate(item.data, "dd/mm/yyyy")
        };
      });
    });
    async function deleteMatricula(item) {
      item.excluido = !item.excluido;
      try {
        await fetchWithToken(`${matriculasUpdate}/${item.id}`, {
          method: "PUT",
          body: { excluido: item.excluido }
        });
      } catch (error) {
        console.error("Erro ao excluir pessoa:", error);
      }
    }
    function redirectToView(id) {
      router.push({ path: `/matriculas/vizualizar/${id}` });
    }
    function redirectToUpdate(id) {
      router.push({ path: `/matriculas/atualizar/${id}` });
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      const _directive_mask = resolveDirective("mask");
      _push(ssrRenderComponent(VContainer, mergeProps({ class: "mt-5" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_NuxtLink, { to: "/matriculas/cadastro" }, {
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
            _push2(ssrRenderComponent(VRow, { style: { "gap": "0.5rem" } }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VCol, { cols: "2" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VTextField, {
                          class: "mt-7 mb-4",
                          modelValue: unref(searchNumero),
                          "onUpdate:modelValue": ($event) => isRef(searchNumero) ? searchNumero.value = $event : null,
                          label: "N\xFAmero",
                          "prepend-inner-icon": "mdi-magnify",
                          variant: "outlined",
                          "hide-details": ""
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VTextField, {
                            class: "mt-7 mb-4",
                            modelValue: unref(searchNumero),
                            "onUpdate:modelValue": ($event) => isRef(searchNumero) ? searchNumero.value = $event : null,
                            label: "N\xFAmero",
                            "prepend-inner-icon": "mdi-magnify",
                            variant: "outlined",
                            "hide-details": ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VCol, { cols: "2" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VTextField, mergeProps({
                          class: "mt-7 mb-4",
                          modelValue: unref(searchData),
                          "onUpdate:modelValue": ($event) => isRef(searchData) ? searchData.value = $event : null,
                          label: "Data",
                          "prepend-inner-icon": "mdi-magnify",
                          placeholder: "dd/mm/yyyy",
                          variant: "outlined",
                          "hide-details": ""
                        }, ssrGetDirectiveProps(_ctx, _directive_mask, "##/##/####")), null, _parent4, _scopeId3));
                      } else {
                        return [
                          withDirectives(createVNode(VTextField, {
                            class: "mt-7 mb-4",
                            modelValue: unref(searchData),
                            "onUpdate:modelValue": ($event) => isRef(searchData) ? searchData.value = $event : null,
                            label: "Data",
                            "prepend-inner-icon": "mdi-magnify",
                            placeholder: "dd/mm/yyyy",
                            variant: "outlined",
                            "hide-details": ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue"]), [
                            [_directive_mask, "##/##/####"]
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VCol, { cols: "2" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VTextField, {
                          class: "mt-7 mb-4",
                          modelValue: unref(searchProtocolo),
                          "onUpdate:modelValue": ($event) => isRef(searchProtocolo) ? searchProtocolo.value = $event : null,
                          label: "Protocolo",
                          "prepend-inner-icon": "mdi-magnify",
                          variant: "outlined",
                          "hide-details": ""
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VTextField, {
                            class: "mt-7 mb-4",
                            modelValue: unref(searchProtocolo),
                            "onUpdate:modelValue": ($event) => isRef(searchProtocolo) ? searchProtocolo.value = $event : null,
                            label: "Protocolo",
                            "prepend-inner-icon": "mdi-magnify",
                            variant: "outlined",
                            "hide-details": ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VCol, { cols: "3" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VTextField, {
                          class: "mt-7 mb-4",
                          modelValue: unref(searchDescricao),
                          "onUpdate:modelValue": ($event) => isRef(searchDescricao) ? searchDescricao.value = $event : null,
                          label: "Descri\xE7\xE3o",
                          "prepend-inner-icon": "mdi-magnify",
                          variant: "outlined",
                          "hide-details": ""
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VTextField, {
                            class: "mt-7 mb-4",
                            modelValue: unref(searchDescricao),
                            "onUpdate:modelValue": ($event) => isRef(searchDescricao) ? searchDescricao.value = $event : null,
                            label: "Descri\xE7\xE3o",
                            "prepend-inner-icon": "mdi-magnify",
                            variant: "outlined",
                            "hide-details": ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VCol, { cols: "2" }, {
                      default: withCtx(() => [
                        createVNode(VTextField, {
                          class: "mt-7 mb-4",
                          modelValue: unref(searchNumero),
                          "onUpdate:modelValue": ($event) => isRef(searchNumero) ? searchNumero.value = $event : null,
                          label: "N\xFAmero",
                          "prepend-inner-icon": "mdi-magnify",
                          variant: "outlined",
                          "hide-details": ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, { cols: "2" }, {
                      default: withCtx(() => [
                        withDirectives(createVNode(VTextField, {
                          class: "mt-7 mb-4",
                          modelValue: unref(searchData),
                          "onUpdate:modelValue": ($event) => isRef(searchData) ? searchData.value = $event : null,
                          label: "Data",
                          "prepend-inner-icon": "mdi-magnify",
                          placeholder: "dd/mm/yyyy",
                          variant: "outlined",
                          "hide-details": ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]), [
                          [_directive_mask, "##/##/####"]
                        ])
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, { cols: "2" }, {
                      default: withCtx(() => [
                        createVNode(VTextField, {
                          class: "mt-7 mb-4",
                          modelValue: unref(searchProtocolo),
                          "onUpdate:modelValue": ($event) => isRef(searchProtocolo) ? searchProtocolo.value = $event : null,
                          label: "Protocolo",
                          "prepend-inner-icon": "mdi-magnify",
                          variant: "outlined",
                          "hide-details": ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, { cols: "3" }, {
                      default: withCtx(() => [
                        createVNode(VTextField, {
                          class: "mt-7 mb-4",
                          modelValue: unref(searchDescricao),
                          "onUpdate:modelValue": ($event) => isRef(searchDescricao) ? searchDescricao.value = $event : null,
                          label: "Descri\xE7\xE3o",
                          "prepend-inner-icon": "mdi-magnify",
                          variant: "outlined",
                          "hide-details": ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(VDataTable, {
              density: "compact",
              headers,
              items: unref(filteredMatriculas),
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
                            onClick: ($event) => deleteMatricula(item),
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
                          onClick: ($event) => deleteMatricula(item),
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
              createVNode(_component_NuxtLink, { to: "/matriculas/cadastro" }, {
                default: withCtx(() => [
                  createVNode("img", {
                    style: { "cursor": "pointer" },
                    src: _imports_0,
                    alt: "Cadastro"
                  })
                ]),
                _: 1
              }),
              createVNode(VRow, { style: { "gap": "0.5rem" } }, {
                default: withCtx(() => [
                  createVNode(VCol, { cols: "2" }, {
                    default: withCtx(() => [
                      createVNode(VTextField, {
                        class: "mt-7 mb-4",
                        modelValue: unref(searchNumero),
                        "onUpdate:modelValue": ($event) => isRef(searchNumero) ? searchNumero.value = $event : null,
                        label: "N\xFAmero",
                        "prepend-inner-icon": "mdi-magnify",
                        variant: "outlined",
                        "hide-details": ""
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(VCol, { cols: "2" }, {
                    default: withCtx(() => [
                      withDirectives(createVNode(VTextField, {
                        class: "mt-7 mb-4",
                        modelValue: unref(searchData),
                        "onUpdate:modelValue": ($event) => isRef(searchData) ? searchData.value = $event : null,
                        label: "Data",
                        "prepend-inner-icon": "mdi-magnify",
                        placeholder: "dd/mm/yyyy",
                        variant: "outlined",
                        "hide-details": ""
                      }, null, 8, ["modelValue", "onUpdate:modelValue"]), [
                        [_directive_mask, "##/##/####"]
                      ])
                    ]),
                    _: 1
                  }),
                  createVNode(VCol, { cols: "2" }, {
                    default: withCtx(() => [
                      createVNode(VTextField, {
                        class: "mt-7 mb-4",
                        modelValue: unref(searchProtocolo),
                        "onUpdate:modelValue": ($event) => isRef(searchProtocolo) ? searchProtocolo.value = $event : null,
                        label: "Protocolo",
                        "prepend-inner-icon": "mdi-magnify",
                        variant: "outlined",
                        "hide-details": ""
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(VCol, { cols: "3" }, {
                    default: withCtx(() => [
                      createVNode(VTextField, {
                        class: "mt-7 mb-4",
                        modelValue: unref(searchDescricao),
                        "onUpdate:modelValue": ($event) => isRef(searchDescricao) ? searchDescricao.value = $event : null,
                        label: "Descri\xE7\xE3o",
                        "prepend-inner-icon": "mdi-magnify",
                        variant: "outlined",
                        "hide-details": ""
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(VDataTable, {
                density: "compact",
                headers,
                items: unref(filteredMatriculas),
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
                        onClick: ($event) => deleteMatricula(item),
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
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/matriculas/lista/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : undefined;
};

export { _sfc_main as default };
//# sourceMappingURL=index-BmbT3Hz-.mjs.map
