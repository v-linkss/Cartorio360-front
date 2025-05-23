import { useSSRContext, ref, reactive, watch, mergeProps, unref, isRef, withCtx, createVNode, toDisplayString, createTextVNode } from 'vue';
import { ssrRenderComponent, ssrRenderStyle, ssrInterpolate } from 'vue/server-renderer';
import { useVuelidate } from '@vuelidate/core';
import { helpers, required } from '@vuelidate/validators';
import { e as useCookie, g as VBtn, c as useRuntimeConfig } from './server.mjs';
import { u as useFetch } from './fetch-uf6n1sXR.mjs';
import { V as VDialog } from './VDialog-BVe31KMa.mjs';
import { V as VCard, b as VCardText } from './VCard-4px4Zqx0.mjs';
import { V as VContainer } from './VContainer-CUysD4sO.mjs';
import { V as VRow } from './VRow-Bqz0CuIN.mjs';
import { V as VTextarea } from './VTextarea-DJCeftNm.mjs';

const _sfc_main = {
  __name: "Ordem",
  __ssrInlineRender: true,
  props: {
    show: Boolean,
    numero_os: Number,
    ordemserv_token: String
  },
  emits: ["close"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const isVisible = ref(props.show);
    const config = useRuntimeConfig();
    ref(useCookie("user-data").value.cartorio_token).value;
    const usuario_token = useCookie("auth_token").value;
    const analisaCancelamento = `${config.public.managemant}/analisaCancelamento`;
    const cancelarOs = `${config.public.managemant}/cancelaOs`;
    const state = reactive({
      motivo: null
    });
    const analiseCancela = ref(null);
    const emit = __emit;
    const rules = {
      motivo: {
        required: helpers.withMessage("O campo \xE9 obrigatorio", required)
      }
    };
    const v$ = useVuelidate(rules, state);
    watch(
      () => props.show,
      (newVal) => {
        isVisible.value = newVal;
      }
    );
    const closeModal = () => {
      isVisible.value = false;
      emit("close");
    };
    const analisaCancelamentoOs = async () => {
      const { data, error } = await useFetch(`${analisaCancelamento}`, {
        method: "POST",
        body: { ordemserv_token: props.ordemserv_token }
      }, "$1fnrIk2fgs");
      analiseCancela.value = data.value.mensagem;
    };
    analisaCancelamentoOs();
    const cancelarOrdemServ = async () => {
      if (await v$.value.$validate()) {
        const { status } = await useFetch(`${cancelarOs}`, {
          method: "POST",
          body: { usuario_token, motivo: state.motivo, ordemserv_token: props.ordemserv_token }
        }, "$21WlhUNXeM");
        if (status.value === "success") {
          (undefined).location.reload();
          closeModal();
        }
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(VDialog, mergeProps({
        persistent: "",
        modelValue: unref(isVisible),
        "onUpdate:modelValue": ($event) => isRef(isVisible) ? isVisible.value = $event : null,
        "max-width": "650"
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VCard, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VContainer, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VRow, { class: "mb-5 mt-1 ml-2" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<h1${_scopeId4}>Cancelamento da OS n\xBA</h1><h1 style="${ssrRenderStyle({ "color": "red", "margin-left": "18px" })}"${_scopeId4}>${ssrInterpolate(props.numero_os)}</h1>`);
                            } else {
                              return [
                                createVNode("h1", null, "Cancelamento da OS n\xBA"),
                                createVNode("h1", { style: { "color": "red", "margin-left": "18px" } }, toDisplayString(props.numero_os), 1)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VContainer, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VCard, {
                                variant: "outlined",
                                class: "mb-5"
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(VCardText, null, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`${ssrInterpolate(unref(analiseCancela))}`);
                                        } else {
                                          return [
                                            createTextVNode(toDisplayString(unref(analiseCancela)), 1)
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(VCardText, null, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(unref(analiseCancela)), 1)
                                        ]),
                                        _: 1
                                      })
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(VTextarea, {
                                label: "Motivo",
                                modelValue: unref(state).motivo,
                                "onUpdate:modelValue": ($event) => unref(state).motivo = $event,
                                required: "",
                                "error-messages": unref(v$).motivo.$errors.map((e) => e.$message),
                                onBlur: unref(v$).motivo.$touch,
                                onInput: unref(v$).motivo.$touch
                              }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(VCard, {
                                  variant: "outlined",
                                  class: "mb-5"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(VCardText, null, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(unref(analiseCancela)), 1)
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }),
                                createVNode(VTextarea, {
                                  label: "Motivo",
                                  modelValue: unref(state).motivo,
                                  "onUpdate:modelValue": ($event) => unref(state).motivo = $event,
                                  required: "",
                                  "error-messages": unref(v$).motivo.$errors.map((e) => e.$message),
                                  onBlur: unref(v$).motivo.$touch,
                                  onInput: unref(v$).motivo.$touch
                                }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages", "onBlur", "onInput"])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VRow, { class: "mb-5 mt-1 ml-2" }, {
                            default: withCtx(() => [
                              createVNode("h1", null, "Cancelamento da OS n\xBA"),
                              createVNode("h1", { style: { "color": "red", "margin-left": "18px" } }, toDisplayString(props.numero_os), 1)
                            ]),
                            _: 1
                          }),
                          createVNode(VContainer, null, {
                            default: withCtx(() => [
                              createVNode(VCard, {
                                variant: "outlined",
                                class: "mb-5"
                              }, {
                                default: withCtx(() => [
                                  createVNode(VCardText, null, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(unref(analiseCancela)), 1)
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }),
                              createVNode(VTextarea, {
                                label: "Motivo",
                                modelValue: unref(state).motivo,
                                "onUpdate:modelValue": ($event) => unref(state).motivo = $event,
                                required: "",
                                "error-messages": unref(v$).motivo.$errors.map((e) => e.$message),
                                onBlur: unref(v$).motivo.$touch,
                                onInput: unref(v$).motivo.$touch
                              }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages", "onBlur", "onInput"])
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<div class="mb-5" style="${ssrRenderStyle({ "display": "flex", "justify-content": "flex-start" })}"${_scopeId2}><div class="ml-6"${_scopeId2}>`);
                  _push3(ssrRenderComponent(VBtn, {
                    size: "large",
                    color: "red",
                    onClick: closeModal
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Fechar`);
                      } else {
                        return [
                          createTextVNode("Fechar")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div><div class="ml-6"${_scopeId2}>`);
                  _push3(ssrRenderComponent(VBtn, {
                    size: "large",
                    color: "green",
                    onClick: cancelarOrdemServ
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Salvar`);
                      } else {
                        return [
                          createTextVNode("Salvar")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div></div>`);
                } else {
                  return [
                    createVNode(VContainer, null, {
                      default: withCtx(() => [
                        createVNode(VRow, { class: "mb-5 mt-1 ml-2" }, {
                          default: withCtx(() => [
                            createVNode("h1", null, "Cancelamento da OS n\xBA"),
                            createVNode("h1", { style: { "color": "red", "margin-left": "18px" } }, toDisplayString(props.numero_os), 1)
                          ]),
                          _: 1
                        }),
                        createVNode(VContainer, null, {
                          default: withCtx(() => [
                            createVNode(VCard, {
                              variant: "outlined",
                              class: "mb-5"
                            }, {
                              default: withCtx(() => [
                                createVNode(VCardText, null, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(unref(analiseCancela)), 1)
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }),
                            createVNode(VTextarea, {
                              label: "Motivo",
                              modelValue: unref(state).motivo,
                              "onUpdate:modelValue": ($event) => unref(state).motivo = $event,
                              required: "",
                              "error-messages": unref(v$).motivo.$errors.map((e) => e.$message),
                              onBlur: unref(v$).motivo.$touch,
                              onInput: unref(v$).motivo.$touch
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages", "onBlur", "onInput"])
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode("div", {
                      class: "mb-5",
                      style: { "display": "flex", "justify-content": "flex-start" }
                    }, [
                      createVNode("div", { class: "ml-6" }, [
                        createVNode(VBtn, {
                          size: "large",
                          color: "red",
                          onClick: closeModal
                        }, {
                          default: withCtx(() => [
                            createTextVNode("Fechar")
                          ]),
                          _: 1
                        })
                      ]),
                      createVNode("div", { class: "ml-6" }, [
                        createVNode(VBtn, {
                          size: "large",
                          color: "green",
                          onClick: cancelarOrdemServ
                        }, {
                          default: withCtx(() => [
                            createTextVNode("Salvar")
                          ]),
                          _: 1
                        })
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(VCard, null, {
                default: withCtx(() => [
                  createVNode(VContainer, null, {
                    default: withCtx(() => [
                      createVNode(VRow, { class: "mb-5 mt-1 ml-2" }, {
                        default: withCtx(() => [
                          createVNode("h1", null, "Cancelamento da OS n\xBA"),
                          createVNode("h1", { style: { "color": "red", "margin-left": "18px" } }, toDisplayString(props.numero_os), 1)
                        ]),
                        _: 1
                      }),
                      createVNode(VContainer, null, {
                        default: withCtx(() => [
                          createVNode(VCard, {
                            variant: "outlined",
                            class: "mb-5"
                          }, {
                            default: withCtx(() => [
                              createVNode(VCardText, null, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(unref(analiseCancela)), 1)
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(VTextarea, {
                            label: "Motivo",
                            modelValue: unref(state).motivo,
                            "onUpdate:modelValue": ($event) => unref(state).motivo = $event,
                            required: "",
                            "error-messages": unref(v$).motivo.$errors.map((e) => e.$message),
                            onBlur: unref(v$).motivo.$touch,
                            onInput: unref(v$).motivo.$touch
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages", "onBlur", "onInput"])
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode("div", {
                    class: "mb-5",
                    style: { "display": "flex", "justify-content": "flex-start" }
                  }, [
                    createVNode("div", { class: "ml-6" }, [
                      createVNode(VBtn, {
                        size: "large",
                        color: "red",
                        onClick: closeModal
                      }, {
                        default: withCtx(() => [
                          createTextVNode("Fechar")
                        ]),
                        _: 1
                      })
                    ]),
                    createVNode("div", { class: "ml-6" }, [
                      createVNode(VBtn, {
                        size: "large",
                        color: "green",
                        onClick: cancelarOrdemServ
                      }, {
                        default: withCtx(() => [
                          createTextVNode("Salvar")
                        ]),
                        _: 1
                      })
                    ])
                  ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Cancelamento/Ordem.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : undefined;
};

export { _sfc_main as _ };
//# sourceMappingURL=Ordem-BCMI1-th.mjs.map
