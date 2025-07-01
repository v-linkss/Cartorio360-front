import { _ as __nuxt_component_0 } from './MoneyInput-ot-UsY0X.mjs';
import { ref, withAsyncContext, withCtx, unref, createVNode, createTextVNode, withModifiers, useSSRContext } from 'vue';
import { ssrRenderComponent } from 'vue/server-renderer';
import { e as useCookie, b as useNuxtApp, V as VTextField, g as VBtn, c as useRuntimeConfig } from './server.mjs';
import { u as useFetch } from './fetch-DOsfzFYE.mjs';
import { V as VContainer } from './VContainer-CUysD4sO.mjs';
import { V as VForm } from './VForm-BbYSeK1s.mjs';
import { V as VCol } from './VCol-BT4RzX0Q.mjs';
import { V as VRow } from './VRow-Bqz0CuIN.mjs';
import { V as VAutocomplete } from './VAutocomplete-DxrmY4dO.mjs';
import 'v-money3';
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
    const createCaixa = `${config.public.managemant}/caixasLanctos`;
    const getClsassesDespesas = `${config.public.managemant}/classes-despesas`;
    const userData = ref(useCookie("user-data").value || {});
    const cartorio_id = ref(useCookie("user-data").value.cartorio_id || null);
    const caixa_service = ref(useCookie("caixa-service").value) || null;
    const cartorio_token = ref(useCookie("user-data").value.cartorio_token) || null;
    const classesDespesas = ref([]);
    const { $toast } = useNuxtApp();
    const form = ref({
      data: null,
      classe_despesa_id: null,
      descricao: "",
      valor: null
    });
    const token = {
      cartorio_token: cartorio_token.value
    };
    const { data: classesDespesasData } = ([__temp, __restore] = withAsyncContext(() => useFetch(`${getClsassesDespesas}`, {
      method: "POST",
      body: token
    }, "$lCSZvX2UQJ")), __temp = await __temp, __restore(), __temp);
    classesDespesas.value = classesDespesasData.value || [];
    const handleCreateCaixas = async () => {
      var _a;
      try {
        const classesDespesasPayload = {
          data: form.value.data,
          classe_despesa_id: form.value.classe_despesa_id,
          descricao: form.value.descricao,
          valor: (_a = form.value.valor) == null ? void 0 : _a.replace(/,/g, ""),
          user_id: userData.value.usuario_id,
          user_alteracao_id: userData.value.usuario_id,
          cartorio_id: cartorio_id.value,
          caixa_id: caixa_service.value.caixa_id
        };
        const { error } = await useFetch(createCaixa, {
          method: "POST",
          body: classesDespesasPayload
        }, "$MWUNioyuGO");
        if (error.value) {
          throw new Error(error.value.message || "Erro desconhecido na API");
        }
        $toast.success("Caixa cadastrada com sucesso");
        form.value = {
          data: null,
          classe_despesa_id: null,
          descricao: "",
          valor: null
        };
      } catch (error) {
        console.error("Erro ao criar caixa:", error);
        $toast.error(error.message || "Erro ao cadastrar caixa");
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_MoneyInput = __nuxt_component_0;
      _push(ssrRenderComponent(VContainer, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h1 class="mb-5"${_scopeId}>Criar lan\xE7amento do caixa Caixa</h1>`);
            _push2(ssrRenderComponent(VForm, { onSubmit: handleCreateCaixas }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VCol, { cols: "6" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VRow, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VTextField, {
                                modelValue: unref(form).data,
                                "onUpdate:modelValue": ($event) => unref(form).data = $event,
                                type: "date",
                                label: "Data"
                              }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(VTextField, {
                                  modelValue: unref(form).data,
                                  "onUpdate:modelValue": ($event) => unref(form).data = $event,
                                  type: "date",
                                  label: "Data"
                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VRow, null, {
                            default: withCtx(() => [
                              createVNode(VTextField, {
                                modelValue: unref(form).data,
                                "onUpdate:modelValue": ($event) => unref(form).data = $event,
                                type: "date",
                                label: "Data"
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VRow, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VCol, { cols: "6" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VAutocomplete, {
                                modelValue: unref(form).classe_despesa_id,
                                "onUpdate:modelValue": ($event) => unref(form).classe_despesa_id = $event,
                                items: unref(classesDespesas),
                                "item-title": "descricao",
                                "item-value": "id",
                                label: "Servi\xE7o",
                                required: "",
                                outlined: ""
                              }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(VAutocomplete, {
                                  modelValue: unref(form).classe_despesa_id,
                                  "onUpdate:modelValue": ($event) => unref(form).classe_despesa_id = $event,
                                  items: unref(classesDespesas),
                                  "item-title": "descricao",
                                  "item-value": "id",
                                  label: "Servi\xE7o",
                                  required: "",
                                  outlined: ""
                                }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VCol, { cols: "6" }, {
                            default: withCtx(() => [
                              createVNode(VAutocomplete, {
                                modelValue: unref(form).classe_despesa_id,
                                "onUpdate:modelValue": ($event) => unref(form).classe_despesa_id = $event,
                                items: unref(classesDespesas),
                                "item-title": "descricao",
                                "item-value": "id",
                                label: "Servi\xE7o",
                                required: "",
                                outlined: ""
                              }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VRow, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VCol, { cols: "6" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_MoneyInput, {
                                required: "",
                                modelValue: unref(form).valor,
                                "onUpdate:modelValue": ($event) => unref(form).valor = $event,
                                label: "Valor"
                              }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_MoneyInput, {
                                  required: "",
                                  modelValue: unref(form).valor,
                                  "onUpdate:modelValue": ($event) => unref(form).valor = $event,
                                  label: "Valor"
                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VCol, { cols: "6" }, {
                            default: withCtx(() => [
                              createVNode(_component_MoneyInput, {
                                required: "",
                                modelValue: unref(form).valor,
                                "onUpdate:modelValue": ($event) => unref(form).valor = $event,
                                label: "Valor"
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VRow, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VCol, { cols: "6" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VTextField, {
                                modelValue: unref(form).descricao,
                                "onUpdate:modelValue": ($event) => unref(form).descricao = $event,
                                label: "Descri\xE7\xE3o",
                                required: "",
                                outlined: ""
                              }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(VTextField, {
                                  modelValue: unref(form).descricao,
                                  "onUpdate:modelValue": ($event) => unref(form).descricao = $event,
                                  label: "Descri\xE7\xE3o",
                                  required: "",
                                  outlined: ""
                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VCol, { cols: "6" }, {
                            default: withCtx(() => [
                              createVNode(VTextField, {
                                modelValue: unref(form).descricao,
                                "onUpdate:modelValue": ($event) => unref(form).descricao = $event,
                                label: "Descri\xE7\xE3o",
                                required: "",
                                outlined: ""
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VRow, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VCol, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VBtn, {
                                size: "large",
                                color: "red",
                                to: "/caixas/caixasRecebimentoOs"
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Voltar`);
                                  } else {
                                    return [
                                      createTextVNode("Voltar")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(VBtn, {
                                type: "submit",
                                class: "ml-4",
                                size: "large",
                                color: "green"
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Salvar`);
                                  } else {
                                    return [
                                      createTextVNode("Salvar")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(VBtn, {
                                  size: "large",
                                  color: "red",
                                  to: "/caixas/caixasRecebimentoOs"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode("Voltar")
                                  ]),
                                  _: 1
                                }),
                                createVNode(VBtn, {
                                  type: "submit",
                                  class: "ml-4",
                                  size: "large",
                                  color: "green"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode("Salvar")
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
                          createVNode(VCol, null, {
                            default: withCtx(() => [
                              createVNode(VBtn, {
                                size: "large",
                                color: "red",
                                to: "/caixas/caixasRecebimentoOs"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode("Voltar")
                                ]),
                                _: 1
                              }),
                              createVNode(VBtn, {
                                type: "submit",
                                class: "ml-4",
                                size: "large",
                                color: "green"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode("Salvar")
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
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VCol, { cols: "6" }, {
                      default: withCtx(() => [
                        createVNode(VRow, null, {
                          default: withCtx(() => [
                            createVNode(VTextField, {
                              modelValue: unref(form).data,
                              "onUpdate:modelValue": ($event) => unref(form).data = $event,
                              type: "date",
                              label: "Data"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(VRow, null, {
                      default: withCtx(() => [
                        createVNode(VCol, { cols: "6" }, {
                          default: withCtx(() => [
                            createVNode(VAutocomplete, {
                              modelValue: unref(form).classe_despesa_id,
                              "onUpdate:modelValue": ($event) => unref(form).classe_despesa_id = $event,
                              items: unref(classesDespesas),
                              "item-title": "descricao",
                              "item-value": "id",
                              label: "Servi\xE7o",
                              required: "",
                              outlined: ""
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(VRow, null, {
                      default: withCtx(() => [
                        createVNode(VCol, { cols: "6" }, {
                          default: withCtx(() => [
                            createVNode(_component_MoneyInput, {
                              required: "",
                              modelValue: unref(form).valor,
                              "onUpdate:modelValue": ($event) => unref(form).valor = $event,
                              label: "Valor"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(VRow, null, {
                      default: withCtx(() => [
                        createVNode(VCol, { cols: "6" }, {
                          default: withCtx(() => [
                            createVNode(VTextField, {
                              modelValue: unref(form).descricao,
                              "onUpdate:modelValue": ($event) => unref(form).descricao = $event,
                              label: "Descri\xE7\xE3o",
                              required: "",
                              outlined: ""
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(VRow, null, {
                      default: withCtx(() => [
                        createVNode(VCol, null, {
                          default: withCtx(() => [
                            createVNode(VBtn, {
                              size: "large",
                              color: "red",
                              to: "/caixas/caixasRecebimentoOs"
                            }, {
                              default: withCtx(() => [
                                createTextVNode("Voltar")
                              ]),
                              _: 1
                            }),
                            createVNode(VBtn, {
                              type: "submit",
                              class: "ml-4",
                              size: "large",
                              color: "green"
                            }, {
                              default: withCtx(() => [
                                createTextVNode("Salvar")
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
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode("h1", { class: "mb-5" }, "Criar lan\xE7amento do caixa Caixa"),
              createVNode(VForm, {
                onSubmit: withModifiers(handleCreateCaixas, ["prevent"])
              }, {
                default: withCtx(() => [
                  createVNode(VCol, { cols: "6" }, {
                    default: withCtx(() => [
                      createVNode(VRow, null, {
                        default: withCtx(() => [
                          createVNode(VTextField, {
                            modelValue: unref(form).data,
                            "onUpdate:modelValue": ($event) => unref(form).data = $event,
                            type: "date",
                            label: "Data"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode(VRow, null, {
                    default: withCtx(() => [
                      createVNode(VCol, { cols: "6" }, {
                        default: withCtx(() => [
                          createVNode(VAutocomplete, {
                            modelValue: unref(form).classe_despesa_id,
                            "onUpdate:modelValue": ($event) => unref(form).classe_despesa_id = $event,
                            items: unref(classesDespesas),
                            "item-title": "descricao",
                            "item-value": "id",
                            label: "Servi\xE7o",
                            required: "",
                            outlined: ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode(VRow, null, {
                    default: withCtx(() => [
                      createVNode(VCol, { cols: "6" }, {
                        default: withCtx(() => [
                          createVNode(_component_MoneyInput, {
                            required: "",
                            modelValue: unref(form).valor,
                            "onUpdate:modelValue": ($event) => unref(form).valor = $event,
                            label: "Valor"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode(VRow, null, {
                    default: withCtx(() => [
                      createVNode(VCol, { cols: "6" }, {
                        default: withCtx(() => [
                          createVNode(VTextField, {
                            modelValue: unref(form).descricao,
                            "onUpdate:modelValue": ($event) => unref(form).descricao = $event,
                            label: "Descri\xE7\xE3o",
                            required: "",
                            outlined: ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode(VRow, null, {
                    default: withCtx(() => [
                      createVNode(VCol, null, {
                        default: withCtx(() => [
                          createVNode(VBtn, {
                            size: "large",
                            color: "red",
                            to: "/caixas/caixasRecebimentoOs"
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Voltar")
                            ]),
                            _: 1
                          }),
                          createVNode(VBtn, {
                            type: "submit",
                            class: "ml-4",
                            size: "large",
                            color: "green"
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Salvar")
                            ]),
                            _: 1
                          })
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/caixas/cadastro/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : undefined;
};

export { _sfc_main as default };
//# sourceMappingURL=index-CeBwHT9F.mjs.map
