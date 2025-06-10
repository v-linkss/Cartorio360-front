import { ref, withAsyncContext, withCtx, unref, createVNode, createTextVNode, withModifiers, useSSRContext } from 'vue';
import { ssrRenderComponent } from 'vue/server-renderer';
import { f as useRoute$1, b as useNuxtApp, V as VTextField, g as VBtn, c as useRuntimeConfig, a as navigateTo } from './server.mjs';
import { u as useFetch } from './fetch-uf6n1sXR.mjs';
import { V as VContainer } from './VContainer-CUysD4sO.mjs';
import { V as VForm } from './VForm-DedwsU-K.mjs';
import { V as VRow } from './VRow-Bqz0CuIN.mjs';
import { V as VCol } from './VCol-BT4RzX0Q.mjs';
import { V as VAutocomplete } from './VAutocomplete-BKZ1aqE0.mjs';
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
import './asyncData-B8plM1p3.mjs';
import './filter-DktR6j_7.mjs';
import './VList-nUNnjYu3.mjs';
import './VAvatar-B-oWAlT9.mjs';
import './VResponsive-BwPb2GHE.mjs';

const _sfc_main = {
  __name: "[id]",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const config = useRuntimeConfig();
    const updateSituacaoMatricula = `${config.public.managemant}/situacao-matriculas`;
    const getSituacaoMatricula = `${config.public.managemant}/situacao-matriculas`;
    const route = useRoute$1();
    const { id } = route.params;
    const { $toast } = useNuxtApp();
    const form = ref({
      id: null,
      situacao: null,
      descricao: null,
      observacao: null
    });
    const situacao_tipo = [
      { label: "ATIVA", value: "ATIVA" },
      { label: "UNIFICADA", value: "UNIFICADA" },
      { label: "DESMEMBRADA", value: "DESMEMBRADA" },
      { label: "COM RESTRI\xC7\xC3O", value: "COM RESTRI\xC7\xC3O" },
      { label: "CANCELADA", value: "CANCELADA" }
    ];
    async function fetchSituacaoMatricula() {
      try {
        const { data: situacaomatriculaData } = await useFetch(`${getSituacaoMatricula}/${id}`, { method: "GET" }, "$FzfNicglZV");
        if (situacaomatriculaData.value) {
          form.value = {
            id: situacaomatriculaData.value.id,
            situacao: situacaomatriculaData.value.situacao,
            descricao: situacaomatriculaData.value.descricao,
            observacao: situacaomatriculaData.value.observacao
          };
        }
      } catch (error) {
        console.error("Erro ao carregar os dados da situa\xE7\xE3o da matricula:", error);
      }
    }
    [__temp, __restore] = withAsyncContext(() => fetchSituacaoMatricula()), await __temp, __restore();
    async function HandleSubmitEdit() {
      try {
        const edicaoSituacaoMatricula = {
          situacao: form.value.situacao,
          descricao: form.value.descricao,
          observacao: form.value.observacao
        };
        await useFetch(`${updateSituacaoMatricula}/${id}`, {
          method: "PUT",
          body: edicaoSituacaoMatricula
        }, "$hj4Vh4U496");
        $toast.success("situa\xE7\xE3o da matricula atulizada com sucesso");
        navigateTo("/situacoes-matriculas/lista");
      } catch (error) {
        console.error("Erro ao atualizar a situa\xE7\xE3o da matricula:", error);
        $toast.error("Erro ao atualizar situacao da matricula");
      }
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(VContainer, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h1 class="mb-5"${_scopeId}>Edi\xE7\xE3o de Situa\xE7\xE3o matricula</h1>`);
            _push2(ssrRenderComponent(VForm, { onSubmit: HandleSubmitEdit }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VRow, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VCol, { cols: "6" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VTextField, {
                                label: "C\xD3DIGO",
                                modelValue: unref(form).id,
                                "onUpdate:modelValue": ($event) => unref(form).id = $event,
                                outlined: "",
                                readonly: ""
                              }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(VTextField, {
                                  label: "C\xD3DIGO",
                                  modelValue: unref(form).id,
                                  "onUpdate:modelValue": ($event) => unref(form).id = $event,
                                  outlined: "",
                                  readonly: ""
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
                                label: "C\xD3DIGO",
                                modelValue: unref(form).id,
                                "onUpdate:modelValue": ($event) => unref(form).id = $event,
                                outlined: "",
                                readonly: ""
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
                        _push4(ssrRenderComponent(VCol, { cols: "6" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VAutocomplete, {
                                modelValue: unref(form).situacao,
                                "onUpdate:modelValue": ($event) => unref(form).situacao = $event,
                                style: { "width": "200px" },
                                items: situacao_tipo,
                                "item-title": "label",
                                "item-value": "value",
                                label: "Tipo de situa\xE7\xE3o",
                                "bg-color": "#F6F6F6"
                              }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(VAutocomplete, {
                                  modelValue: unref(form).situacao,
                                  "onUpdate:modelValue": ($event) => unref(form).situacao = $event,
                                  style: { "width": "200px" },
                                  items: situacao_tipo,
                                  "item-title": "label",
                                  "item-value": "value",
                                  label: "Tipo de situa\xE7\xE3o",
                                  "bg-color": "#F6F6F6"
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
                              createVNode(VAutocomplete, {
                                modelValue: unref(form).situacao,
                                "onUpdate:modelValue": ($event) => unref(form).situacao = $event,
                                style: { "width": "200px" },
                                items: situacao_tipo,
                                "item-title": "label",
                                "item-value": "value",
                                label: "Tipo de situa\xE7\xE3o",
                                "bg-color": "#F6F6F6"
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
                                modelValue: unref(form).observacao,
                                "onUpdate:modelValue": ($event) => unref(form).observacao = $event,
                                label: "Observa\xE7\xE3o",
                                outlined: ""
                              }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(VTextField, {
                                  modelValue: unref(form).observacao,
                                  "onUpdate:modelValue": ($event) => unref(form).observacao = $event,
                                  label: "Observa\xE7\xE3o",
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
                                modelValue: unref(form).observacao,
                                "onUpdate:modelValue": ($event) => unref(form).observacao = $event,
                                label: "Observa\xE7\xE3o",
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
                                to: "/situacoes-matriculas/lista"
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
                                  to: "/situacoes-matriculas/lista"
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
                                to: "/situacoes-matriculas/lista"
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
                        createVNode(VCol, { cols: "6" }, {
                          default: withCtx(() => [
                            createVNode(VTextField, {
                              label: "C\xD3DIGO",
                              modelValue: unref(form).id,
                              "onUpdate:modelValue": ($event) => unref(form).id = $event,
                              outlined: "",
                              readonly: ""
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
                        createVNode(VCol, { cols: "6" }, {
                          default: withCtx(() => [
                            createVNode(VAutocomplete, {
                              modelValue: unref(form).situacao,
                              "onUpdate:modelValue": ($event) => unref(form).situacao = $event,
                              style: { "width": "200px" },
                              items: situacao_tipo,
                              "item-title": "label",
                              "item-value": "value",
                              label: "Tipo de situa\xE7\xE3o",
                              "bg-color": "#F6F6F6"
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
                              modelValue: unref(form).observacao,
                              "onUpdate:modelValue": ($event) => unref(form).observacao = $event,
                              label: "Observa\xE7\xE3o",
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
                              to: "/situacoes-matriculas/lista"
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
              createVNode("h1", { class: "mb-5" }, "Edi\xE7\xE3o de Situa\xE7\xE3o matricula"),
              createVNode(VForm, {
                onSubmit: withModifiers(HandleSubmitEdit, ["prevent"])
              }, {
                default: withCtx(() => [
                  createVNode(VRow, null, {
                    default: withCtx(() => [
                      createVNode(VCol, { cols: "6" }, {
                        default: withCtx(() => [
                          createVNode(VTextField, {
                            label: "C\xD3DIGO",
                            modelValue: unref(form).id,
                            "onUpdate:modelValue": ($event) => unref(form).id = $event,
                            outlined: "",
                            readonly: ""
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
                      createVNode(VCol, { cols: "6" }, {
                        default: withCtx(() => [
                          createVNode(VAutocomplete, {
                            modelValue: unref(form).situacao,
                            "onUpdate:modelValue": ($event) => unref(form).situacao = $event,
                            style: { "width": "200px" },
                            items: situacao_tipo,
                            "item-title": "label",
                            "item-value": "value",
                            label: "Tipo de situa\xE7\xE3o",
                            "bg-color": "#F6F6F6"
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
                            modelValue: unref(form).observacao,
                            "onUpdate:modelValue": ($event) => unref(form).observacao = $event,
                            label: "Observa\xE7\xE3o",
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
                            to: "/situacoes-matriculas/lista"
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/situacoes-matriculas/atualizar/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : undefined;
};

export { _sfc_main as default };
//# sourceMappingURL=_id_-CjBk2HRE.mjs.map
