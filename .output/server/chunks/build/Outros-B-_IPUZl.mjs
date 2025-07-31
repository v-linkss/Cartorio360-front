import { _ as __nuxt_component_0 } from './MoneyInput-ot-UsY0X.mjs';
import { _ as __nuxt_component_0$1 } from './nuxt-link-TpvcaGEw.mjs';
import { useSSRContext, ref, reactive, withAsyncContext, resolveDirective, withCtx, createVNode, mergeProps, withDirectives, openBlock, createBlock, createCommentVNode, createTextVNode } from 'vue';
import { ssrRenderComponent, ssrGetDirectiveProps, ssrRenderAttr, ssrRenderStyle } from 'vue/server-renderer';
import { _ as _imports_0 } from './novo-CWU3oYa5.mjs';
import { _ as _imports_2, a as _imports_3 } from './excluido-ceRs5bdR.mjs';
import { useVuelidate } from '@vuelidate/core';
import { helpers, required } from '@vuelidate/validators';
import { u as useRouter$1, f as useRoute$1, b as useNuxtApp, e as useCookie, V as VTextField, g as VBtn, c as useRuntimeConfig } from './server.mjs';
import { u as useFetch } from './fetch-DOsfzFYE.mjs';
import { V as VContainer } from './VContainer-CUysD4sO.mjs';
import { V as VRow } from './VRow-Bqz0CuIN.mjs';
import { V as VCol } from './VCol-BT4RzX0Q.mjs';
import { V as VAutocomplete } from './VAutocomplete-DxrmY4dO.mjs';
import { V as VDataTable } from './VDataTable-D6BQKL_5.mjs';

const _sfc_main = {
  __name: "Outros",
  __ssrInlineRender: true,
  props: {
    ato_id: {
      type: Number,
      required: true
    },
    ato_token: {
      type: String,
      required: true
    }
  },
  async setup(__props) {
    let __temp, __restore;
    const props = __props;
    const router = useRouter$1();
    const route = useRoute$1();
    const config = useRuntimeConfig();
    const { $toast } = useNuxtApp();
    const allOutrosTj = `${config.public.managemant}/outros_tj`;
    const getOutros = `${config.public.managemant}/outros`;
    const createAtoOutros = `${config.public.managemant}/atos_outros`;
    const outrosUpdate = `${config.public.managemant}/atos_outros`;
    `${config.public.managemant}/atos_outros`;
    const cartorio_token = ref(useCookie("user-data").value.cartorio_token);
    const isVisualizar = ref(route.query.origem === "vizualizar");
    const outrosItemsTable = ref([]);
    const outrosItems = ref([]);
    const headers = [
      { title: "Id", align: "start", key: "id" },
      { title: "Descri\xE7\xE3o", align: "start", key: "descricao" },
      { title: "Quantidade", align: "start", key: "quantidade" },
      { title: "Valor Unitario", align: "start", key: "valor_unitario" },
      { value: "actions" }
    ];
    const state = reactive({
      observacao: null,
      outros_tj_id: null,
      quantidade: 1,
      valor_unitario: null
    });
    const rules = {
      observacao: {
        required: helpers.withMessage("O campo \xE9 obrigat\xF3rio", required)
      }
    };
    useVuelidate(rules, state);
    async function onSubmit() {
      const { error, status } = await useFetch(createAtoOutros, {
        method: "POST",
        body: {
          ato_id: Number(props.ato_id),
          observacao: state.observacao,
          valor_unitario: state.valor_unitario.replace(/,/g, ""),
          outros_tj_id: state.outros_tj_id,
          quantidade: state.quantidade,
          user_id: useCookie("user-data").value.usuario_id
        }
      }, "$dM20KOZmKZ");
      if (status.value === "success") {
        $toast.success("Outro Ato registrado com sucesso");
        await fetchOutrosItemsTable();
      }
    }
    async function deleteObservacao(item) {
      item.excluido = !item.excluido;
      try {
        await useFetch(`${outrosUpdate}/${item.id}`, {
          method: "PUT",
          body: JSON.stringify({ excluido: item.excluido })
        }, "$AOYgWW9EtV");
      } catch (error) {
        console.error("Erro ao excluir observa\xE7\xE3o:", error);
      }
    }
    async function fetchOutrosItemsTable() {
      const { data: payloadOutros } = await useFetch(getOutros, {
        method: "POST",
        body: { ato_token: props.ato_token }
      }, "$Ds0arNsgwW");
      outrosItemsTable.value = payloadOutros.value || [];
    }
    const { data } = ([__temp, __restore] = withAsyncContext(() => useFetch(allOutrosTj, {
      method: "POST",
      body: { cartorio_token }
    }, "$wwMEIxY4Vy")), __temp = await __temp, __restore(), __temp);
    outrosItems.value = data.value;
    [__temp, __restore] = withAsyncContext(() => fetchOutrosItemsTable()), await __temp, __restore();
    const goBack = () => {
      const origem = route.query.origem || "criar";
      const id = route.query.id;
      switch (origem) {
        case "atualizar":
        case "vizualizar":
          router.push(`/os/atualizar/${id}`);
          break;
        case "atualizar-lista":
        case "vizualizar-lista":
          router.push("/atos/lista");
          break;
        default:
          router.push("/os/criar-registro");
          break;
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_MoneyInput = __nuxt_component_0;
      const _component_NuxtLink = __nuxt_component_0$1;
      const _directive_mask = resolveDirective("mask");
      _push(ssrRenderComponent(VContainer, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (!isVisualizar.value) {
              _push2(ssrRenderComponent(VRow, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(VCol, {
                      cols: "5",
                      class: "mt-6"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(VAutocomplete, {
                            label: "Outros Atos",
                            items: outrosItems.value,
                            "item-title": "descricao",
                            "item-value": "id",
                            modelValue: state.outros_tj_id,
                            "onUpdate:modelValue": ($event) => state.outros_tj_id = $event
                          }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(VAutocomplete, {
                              label: "Outros Atos",
                              items: outrosItems.value,
                              "item-title": "descricao",
                              "item-value": "id",
                              modelValue: state.outros_tj_id,
                              "onUpdate:modelValue": ($event) => state.outros_tj_id = $event
                            }, null, 8, ["items", "modelValue", "onUpdate:modelValue"])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(VCol, {
                      cols: "2",
                      class: "mt-6"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(VTextField, mergeProps({
                            label: "QTD",
                            type: "number",
                            modelValue: state.quantidade,
                            "onUpdate:modelValue": ($event) => state.quantidade = $event
                          }, ssrGetDirectiveProps(_ctx, _directive_mask, "###")), null, _parent4, _scopeId3));
                        } else {
                          return [
                            withDirectives(createVNode(VTextField, {
                              label: "QTD",
                              type: "number",
                              modelValue: state.quantidade,
                              "onUpdate:modelValue": ($event) => state.quantidade = $event
                            }, null, 8, ["modelValue", "onUpdate:modelValue"]), [
                              [_directive_mask, "###"]
                            ])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(VCol, { cols: "2" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<label for=""${_scopeId3}>Valor unitario</label>`);
                          _push4(ssrRenderComponent(_component_MoneyInput, {
                            modelValue: state.valor_unitario,
                            "onUpdate:modelValue": ($event) => state.valor_unitario = $event
                          }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode("label", { for: "" }, "Valor unitario"),
                            createVNode(_component_MoneyInput, {
                              modelValue: state.valor_unitario,
                              "onUpdate:modelValue": ($event) => state.valor_unitario = $event
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(`<div${_scopeId2}><img class="btn-pointer ml-2 mt-7"${ssrRenderAttr("src", _imports_0)} style="${ssrRenderStyle({ "width": "40px", "cursor": "pointer" })}" title="Criar Pessoa"${_scopeId2}></div>`);
                  } else {
                    return [
                      createVNode(VCol, {
                        cols: "5",
                        class: "mt-6"
                      }, {
                        default: withCtx(() => [
                          createVNode(VAutocomplete, {
                            label: "Outros Atos",
                            items: outrosItems.value,
                            "item-title": "descricao",
                            "item-value": "id",
                            modelValue: state.outros_tj_id,
                            "onUpdate:modelValue": ($event) => state.outros_tj_id = $event
                          }, null, 8, ["items", "modelValue", "onUpdate:modelValue"])
                        ]),
                        _: 1
                      }),
                      createVNode(VCol, {
                        cols: "2",
                        class: "mt-6"
                      }, {
                        default: withCtx(() => [
                          withDirectives(createVNode(VTextField, {
                            label: "QTD",
                            type: "number",
                            modelValue: state.quantidade,
                            "onUpdate:modelValue": ($event) => state.quantidade = $event
                          }, null, 8, ["modelValue", "onUpdate:modelValue"]), [
                            [_directive_mask, "###"]
                          ])
                        ]),
                        _: 1
                      }),
                      createVNode(VCol, { cols: "2" }, {
                        default: withCtx(() => [
                          createVNode("label", { for: "" }, "Valor unitario"),
                          createVNode(_component_MoneyInput, {
                            modelValue: state.valor_unitario,
                            "onUpdate:modelValue": ($event) => state.valor_unitario = $event
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        _: 1
                      }),
                      createVNode("div", null, [
                        createVNode("img", {
                          class: "btn-pointer ml-2 mt-7",
                          src: _imports_0,
                          style: { "width": "40px", "cursor": "pointer" },
                          title: "Criar Pessoa",
                          onClick: onSubmit
                        })
                      ])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            if (!isVisualizar.value) {
              _push2(ssrRenderComponent(VRow, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(VCol, { cols: "9" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(VTextField, {
                            label: "Observa\xE7\xE3o",
                            modelValue: state.observacao,
                            "onUpdate:modelValue": ($event) => state.observacao = $event
                          }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(VTextField, {
                              label: "Observa\xE7\xE3o",
                              modelValue: state.observacao,
                              "onUpdate:modelValue": ($event) => state.observacao = $event
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(VCol, { cols: "9" }, {
                        default: withCtx(() => [
                          createVNode(VTextField, {
                            label: "Observa\xE7\xE3o",
                            modelValue: state.observacao,
                            "onUpdate:modelValue": ($event) => state.observacao = $event
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        _: 1
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(ssrRenderComponent(VRow, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VCol, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VDataTable, {
                          style: { "height": "465px" },
                          headers,
                          items: outrosItemsTable.value
                        }, {
                          "item.actions": withCtx(({ item }, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              if (!isVisualizar.value) {
                                _push5(`<div style="${ssrRenderStyle({ "display": "flex", "cursor": "pointer", "justify-content": "flex-end" })}" title="Deletar Observa\xE7\xE3o"${_scopeId4}>`);
                                if (item.excluido) {
                                  _push5(`<img style="${ssrRenderStyle({ "width": "30px", "height": "30px" })}"${ssrRenderAttr("src", _imports_2)} alt="Visualizar" title="Reativar"${_scopeId4}>`);
                                } else {
                                  _push5(`<img${ssrRenderAttr("src", _imports_3)} alt="Excluir" class="trash-icon" style="${ssrRenderStyle({ "width": "30px", "height": "30px" })}" title="Excluir"${_scopeId4}>`);
                                }
                                _push5(`</div>`);
                              } else {
                                _push5(`<!---->`);
                              }
                            } else {
                              return [
                                !isVisualizar.value ? (openBlock(), createBlock("div", {
                                  key: 0,
                                  style: { "display": "flex", "cursor": "pointer", "justify-content": "flex-end" },
                                  onClick: ($event) => deleteObservacao(item),
                                  title: "Deletar Observa\xE7\xE3o"
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
                                ], 8, ["onClick"])) : createCommentVNode("", true)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VDataTable, {
                            style: { "height": "465px" },
                            headers,
                            items: outrosItemsTable.value
                          }, {
                            "item.actions": withCtx(({ item }) => [
                              !isVisualizar.value ? (openBlock(), createBlock("div", {
                                key: 0,
                                style: { "display": "flex", "cursor": "pointer", "justify-content": "flex-end" },
                                onClick: ($event) => deleteObservacao(item),
                                title: "Deletar Observa\xE7\xE3o"
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
                              ], 8, ["onClick"])) : createCommentVNode("", true)
                            ]),
                            _: 1
                          }, 8, ["items"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VCol, null, {
                      default: withCtx(() => [
                        createVNode(VDataTable, {
                          style: { "height": "465px" },
                          headers,
                          items: outrosItemsTable.value
                        }, {
                          "item.actions": withCtx(({ item }) => [
                            !isVisualizar.value ? (openBlock(), createBlock("div", {
                              key: 0,
                              style: { "display": "flex", "cursor": "pointer", "justify-content": "flex-end" },
                              onClick: ($event) => deleteObservacao(item),
                              title: "Deletar Observa\xE7\xE3o"
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
                            ], 8, ["onClick"])) : createCommentVNode("", true)
                          ]),
                          _: 1
                        }, 8, ["items"])
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(VRow, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_NuxtLink, { onClick: goBack }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VBtn, {
                          size: "large",
                          color: "red"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Voltar`);
                            } else {
                              return [
                                createTextVNode("Voltar")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
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
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_NuxtLink, { onClick: goBack }, {
                      default: withCtx(() => [
                        createVNode(VBtn, {
                          size: "large",
                          color: "red"
                        }, {
                          default: withCtx(() => [
                            createTextVNode("Voltar")
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
              !isVisualizar.value ? (openBlock(), createBlock(VRow, { key: 0 }, {
                default: withCtx(() => [
                  createVNode(VCol, {
                    cols: "5",
                    class: "mt-6"
                  }, {
                    default: withCtx(() => [
                      createVNode(VAutocomplete, {
                        label: "Outros Atos",
                        items: outrosItems.value,
                        "item-title": "descricao",
                        "item-value": "id",
                        modelValue: state.outros_tj_id,
                        "onUpdate:modelValue": ($event) => state.outros_tj_id = $event
                      }, null, 8, ["items", "modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(VCol, {
                    cols: "2",
                    class: "mt-6"
                  }, {
                    default: withCtx(() => [
                      withDirectives(createVNode(VTextField, {
                        label: "QTD",
                        type: "number",
                        modelValue: state.quantidade,
                        "onUpdate:modelValue": ($event) => state.quantidade = $event
                      }, null, 8, ["modelValue", "onUpdate:modelValue"]), [
                        [_directive_mask, "###"]
                      ])
                    ]),
                    _: 1
                  }),
                  createVNode(VCol, { cols: "2" }, {
                    default: withCtx(() => [
                      createVNode("label", { for: "" }, "Valor unitario"),
                      createVNode(_component_MoneyInput, {
                        modelValue: state.valor_unitario,
                        "onUpdate:modelValue": ($event) => state.valor_unitario = $event
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode("div", null, [
                    createVNode("img", {
                      class: "btn-pointer ml-2 mt-7",
                      src: _imports_0,
                      style: { "width": "40px", "cursor": "pointer" },
                      title: "Criar Pessoa",
                      onClick: onSubmit
                    })
                  ])
                ]),
                _: 1
              })) : createCommentVNode("", true),
              !isVisualizar.value ? (openBlock(), createBlock(VRow, { key: 1 }, {
                default: withCtx(() => [
                  createVNode(VCol, { cols: "9" }, {
                    default: withCtx(() => [
                      createVNode(VTextField, {
                        label: "Observa\xE7\xE3o",
                        modelValue: state.observacao,
                        "onUpdate:modelValue": ($event) => state.observacao = $event
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              })) : createCommentVNode("", true),
              createVNode(VRow, null, {
                default: withCtx(() => [
                  createVNode(VCol, null, {
                    default: withCtx(() => [
                      createVNode(VDataTable, {
                        style: { "height": "465px" },
                        headers,
                        items: outrosItemsTable.value
                      }, {
                        "item.actions": withCtx(({ item }) => [
                          !isVisualizar.value ? (openBlock(), createBlock("div", {
                            key: 0,
                            style: { "display": "flex", "cursor": "pointer", "justify-content": "flex-end" },
                            onClick: ($event) => deleteObservacao(item),
                            title: "Deletar Observa\xE7\xE3o"
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
                          ], 8, ["onClick"])) : createCommentVNode("", true)
                        ]),
                        _: 1
                      }, 8, ["items"])
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(VRow, null, {
                default: withCtx(() => [
                  createVNode(_component_NuxtLink, { onClick: goBack }, {
                    default: withCtx(() => [
                      createVNode(VBtn, {
                        size: "large",
                        color: "red"
                      }, {
                        default: withCtx(() => [
                          createTextVNode("Voltar")
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
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Procuracao/Outros.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : undefined;
};

export { _sfc_main as _ };
//# sourceMappingURL=Outros-B-_IPUZl.mjs.map
