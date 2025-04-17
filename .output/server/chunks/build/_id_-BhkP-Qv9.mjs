import { _ as __nuxt_component_0 } from './MoneyInput-ot-UsY0X.mjs';
import { ref, withAsyncContext, withCtx, unref, createVNode, createTextVNode, withModifiers, useSSRContext } from 'vue';
import { ssrRenderComponent } from 'vue/server-renderer';
import { a$ as useRoute$1, V as VTextField, f as VBtn, c as useRuntimeConfig, a as navigateTo } from './server.mjs';
import { u as useFetch } from './fetch-pt4nsUe7.mjs';
import { V as VContainer } from './VContainer-DT30lSDe.mjs';
import { V as VForm } from './VForm-b3_sMQQT.mjs';
import { V as VRow } from './VRow-DlYJpeem.mjs';
import { V as VCol } from './VCol-HDwo5SVF.mjs';
import { V as VAutocomplete } from './VAutocomplete-CK-tWCuO.mjs';
import 'v-money3';
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
import './filter-cWQ1Yonf.mjs';
import './VList-D7gG12Ur.mjs';
import './VAvatar-BqhB4Z7D.mjs';
import './VResponsive-BWsCuDwY.mjs';

const _sfc_main = {
  __name: "[id]",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const config = useRuntimeConfig();
    const updateSelo = `${config.public.managemant}/tipo-selos`;
    const selo = `${config.public.managemant}/tipo-selos`;
    const getUfs = `${config.public.managemant}/listarUF`;
    const route = useRoute$1();
    const { id } = route.params;
    const form = ref({
      uf: null,
      cor: null,
      descricao: null,
      vlr_compra: null
    });
    const ufList = ref([]);
    async function loadSeloData() {
      try {
        const { data: seloData } = await useFetch(`${selo}/${id}`, { method: "GET" }, "$6TZfMfcZ97");
        if (seloData.value) {
          form.value = {
            uf: seloData.value.uf,
            cor: seloData.value.cor,
            descricao: seloData.value.descricao,
            vlr_compra: seloData.value.vlr_compra
          };
        }
      } catch (error) {
        console.error("Erro ao carregar os dados do selo:", error);
      }
    }
    const { data: ufs } = ([__temp, __restore] = withAsyncContext(() => useFetch(getUfs, { method: "GET" }, "$AcfCaA9uDU")), __temp = await __temp, __restore(), __temp);
    ufList.value = ufs.value;
    [__temp, __restore] = withAsyncContext(() => loadSeloData()), await __temp, __restore();
    async function HandleSubmitEdit() {
      try {
        const edicaoSelo = {
          uf: form.value.uf,
          cor: form.value.cor,
          descricao: form.value.descricao,
          vlr_compra: form.value.vlr_compra.replace(/,/g, "")
        };
        await useFetch(`${updateSelo}/${id}`, {
          method: "PUT",
          body: edicaoSelo
        }, "$R6RXNupMbC");
        navigateTo("/tiposSelos/lista");
      } catch (error) {
        console.error("Erro ao atualizar o selo:", error);
      }
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_MoneyInput = __nuxt_component_0;
      _push(ssrRenderComponent(VContainer, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h1 class="mb-5"${_scopeId}>Edi\xE7\xE3o de Tipo de Selo</h1>`);
            _push2(ssrRenderComponent(VForm, { onSubmit: HandleSubmitEdit }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VRow, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VCol, { cols: "3" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VAutocomplete, {
                                modelValue: unref(form).uf,
                                "onUpdate:modelValue": ($event) => unref(form).uf = $event,
                                items: unref(ufList),
                                "item-title": "descricao",
                                "item-value": "sigla",
                                label: "UF",
                                required: "",
                                outlined: ""
                              }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(VAutocomplete, {
                                  modelValue: unref(form).uf,
                                  "onUpdate:modelValue": ($event) => unref(form).uf = $event,
                                  items: unref(ufList),
                                  "item-title": "descricao",
                                  "item-value": "sigla",
                                  label: "UF",
                                  required: "",
                                  outlined: ""
                                }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VCol, { cols: "3" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VTextField, {
                                modelValue: unref(form).cor,
                                "onUpdate:modelValue": ($event) => unref(form).cor = $event,
                                label: "Cor",
                                required: "",
                                outlined: ""
                              }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(VTextField, {
                                  modelValue: unref(form).cor,
                                  "onUpdate:modelValue": ($event) => unref(form).cor = $event,
                                  label: "Cor",
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
                          createVNode(VCol, { cols: "3" }, {
                            default: withCtx(() => [
                              createVNode(VAutocomplete, {
                                modelValue: unref(form).uf,
                                "onUpdate:modelValue": ($event) => unref(form).uf = $event,
                                items: unref(ufList),
                                "item-title": "descricao",
                                "item-value": "sigla",
                                label: "UF",
                                required: "",
                                outlined: ""
                              }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                            ]),
                            _: 1
                          }),
                          createVNode(VCol, { cols: "3" }, {
                            default: withCtx(() => [
                              createVNode(VTextField, {
                                modelValue: unref(form).cor,
                                "onUpdate:modelValue": ($event) => unref(form).cor = $event,
                                label: "Cor",
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
                        _push4(ssrRenderComponent(VCol, { cols: "3" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_MoneyInput, {
                                required: "",
                                modelValue: unref(form).vlr_compra,
                                "onUpdate:modelValue": ($event) => unref(form).vlr_compra = $event
                              }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_MoneyInput, {
                                  required: "",
                                  modelValue: unref(form).vlr_compra,
                                  "onUpdate:modelValue": ($event) => unref(form).vlr_compra = $event
                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VCol, { cols: "3" }, {
                            default: withCtx(() => [
                              createVNode(_component_MoneyInput, {
                                required: "",
                                modelValue: unref(form).vlr_compra,
                                "onUpdate:modelValue": ($event) => unref(form).vlr_compra = $event
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
                                to: "/tiposSelos/lista"
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
                                    _push6(` Salvar `);
                                  } else {
                                    return [
                                      createTextVNode(" Salvar ")
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
                                  to: "/tiposSelos/lista"
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
                                    createTextVNode(" Salvar ")
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
                                to: "/tiposSelos/lista"
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
                                  createTextVNode(" Salvar ")
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
                    createVNode(VRow, null, {
                      default: withCtx(() => [
                        createVNode(VCol, { cols: "3" }, {
                          default: withCtx(() => [
                            createVNode(VAutocomplete, {
                              modelValue: unref(form).uf,
                              "onUpdate:modelValue": ($event) => unref(form).uf = $event,
                              items: unref(ufList),
                              "item-title": "descricao",
                              "item-value": "sigla",
                              label: "UF",
                              required: "",
                              outlined: ""
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                          ]),
                          _: 1
                        }),
                        createVNode(VCol, { cols: "3" }, {
                          default: withCtx(() => [
                            createVNode(VTextField, {
                              modelValue: unref(form).cor,
                              "onUpdate:modelValue": ($event) => unref(form).cor = $event,
                              label: "Cor",
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
                        createVNode(VCol, { cols: "3" }, {
                          default: withCtx(() => [
                            createVNode(_component_MoneyInput, {
                              required: "",
                              modelValue: unref(form).vlr_compra,
                              "onUpdate:modelValue": ($event) => unref(form).vlr_compra = $event
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
                              to: "/tiposSelos/lista"
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
                                createTextVNode(" Salvar ")
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
              createVNode("h1", { class: "mb-5" }, "Edi\xE7\xE3o de Tipo de Selo"),
              createVNode(VForm, {
                onSubmit: withModifiers(HandleSubmitEdit, ["prevent"])
              }, {
                default: withCtx(() => [
                  createVNode(VRow, null, {
                    default: withCtx(() => [
                      createVNode(VCol, { cols: "3" }, {
                        default: withCtx(() => [
                          createVNode(VAutocomplete, {
                            modelValue: unref(form).uf,
                            "onUpdate:modelValue": ($event) => unref(form).uf = $event,
                            items: unref(ufList),
                            "item-title": "descricao",
                            "item-value": "sigla",
                            label: "UF",
                            required: "",
                            outlined: ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                        ]),
                        _: 1
                      }),
                      createVNode(VCol, { cols: "3" }, {
                        default: withCtx(() => [
                          createVNode(VTextField, {
                            modelValue: unref(form).cor,
                            "onUpdate:modelValue": ($event) => unref(form).cor = $event,
                            label: "Cor",
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
                      createVNode(VCol, { cols: "3" }, {
                        default: withCtx(() => [
                          createVNode(_component_MoneyInput, {
                            required: "",
                            modelValue: unref(form).vlr_compra,
                            "onUpdate:modelValue": ($event) => unref(form).vlr_compra = $event
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
                            to: "/tiposSelos/lista"
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
                              createTextVNode(" Salvar ")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/tiposSelos/atualizar/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : undefined;
};

export { _sfc_main as default };
//# sourceMappingURL=_id_-BhkP-Qv9.mjs.map
