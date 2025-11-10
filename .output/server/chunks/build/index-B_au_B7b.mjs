import { _ as __nuxt_component_0 } from './nuxt-link-TpvcaGEw.mjs';
import { _ as _sfc_main$3 } from './Ordem-CeEeRvDM.mjs';
import { ref, reactive, resolveDirective, mergeProps, withCtx, createVNode, unref, withDirectives, openBlock, createBlock, useSSRContext, watch, isRef, toDisplayString, createTextVNode, createCommentVNode } from 'vue';
import { ssrRenderComponent, ssrRenderStyle, ssrRenderAttr, ssrGetDirectiveProps, ssrRenderClass, ssrIncludeBooleanAttr, ssrInterpolate } from 'vue/server-renderer';
import { useVuelidate } from '@vuelidate/core';
import { helpers, required } from '@vuelidate/validators';
import { b as useNuxtApp, u as useRouter$1, e as useCookie, f as VTextField, c as useRuntimeConfig, V as VBtn } from './server.mjs';
import { u as useFetch } from './fetch-uf6n1sXR.mjs';
import { V as VDialog } from './VDialog-BVe31KMa.mjs';
import { V as VCard, a as VCardText, c as VCardActions } from './VCard-Dbn6yWsi.mjs';
import { V as VContainer } from './VContainer-CUysD4sO.mjs';
import { V as VRow } from './VRow-Bqz0CuIN.mjs';
import { V as VTextarea } from './VTextarea-DJCeftNm.mjs';
import { V as VCol } from './VCol-BT4RzX0Q.mjs';
import { _ as _imports_0 } from './novo-CWU3oYa5.mjs';
import { _ as _imports_1 } from './visualizar-BoZ30DMV.mjs';
import { _ as _imports_2 } from './recebe-D8d082aE.mjs';
import { _ as _imports_1$1 } from './editar-BcGPsVK2.mjs';
import { _ as _imports_2$1, a as _imports_3 } from './excluido-D7FHZla7.mjs';
import { f as formatDate } from './formatDate-DflkuJ_V.mjs';
import { V as VAutocomplete } from './VAutocomplete-B9VRQqKl.mjs';
import { V as VDataTable } from './VDataTable-BqxaRhj7.mjs';
import '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:fs';
import 'node:url';
import 'node:path';
import './MoneyInput-ot-UsY0X.mjs';
import 'v-money3';
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
import './VAvatar-CfQAG9re.mjs';
import './VImg-CtUi4yCS.mjs';
import './VResponsive-BwPb2GHE.mjs';
import './filter-BaqCkjdl.mjs';
import './VList-w5fWkTAt.mjs';
import './VDivider-BxKHtM2e.mjs';
import './VSelectionControl-DI6QefPE.mjs';

const _sfc_main$2 = {
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
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Cancelamento/Ordem.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : undefined;
};
const _sfc_main$1 = {
  __name: "ImprecaoRecibo",
  __ssrInlineRender: true,
  props: {
    show: Boolean,
    apresentante_nome: String,
    apresentante_cpf: String,
    visualizar: Boolean
  },
  emits: ["close"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const state = reactive({
      apresentante_nome: props.apresentante_nome,
      apresentante_cpf: props.apresentante_cpf,
      usuario_token: useCookie("auth_token").value
    });
    const emit = __emit;
    useCookie("auth_token").value;
    const isVisible = ref(props.show);
    const { $toast } = useNuxtApp();
    const config = useRuntimeConfig();
    const imprimirRecibo = `${config.public.auth}/service/gerencia/emitir_recibo`;
    watch(
      () => props.show,
      (val) => {
        isVisible.value = val;
      },
      { immediate: true }
      // <<< ISSO É IMPORTANTE
    );
    watch(
      () => props,
      (val) => {
        state.apresentante_nome = val.apresentante_nome;
        state.apresentante_cpf = val.apresentante_cpf;
      },
      { deep: true, immediate: true }
    );
    const closeModal = () => {
      isVisible.value = false;
      emit("close");
    };
    async function onSubmit() {
      var _a, _b;
      try {
        const { data, error } = await useFetch(
          imprimirRecibo,
          {
            method: "POST",
            body: {
              nome_recibo: state.apresentante_nome,
              doc_recibo: state.apresentante_cpf,
              usuario_token: state.usuario_token
            },
            headers: {
              Authorization: `Bearer ${state.usuario_token}`
            }
          },
          "$26dgQHax0q"
        );
        if (data.value) {
          const blob = new Blob([data.value], { type: "text/html" });
          const url = URL.createObjectURL(blob);
          (void 0).open(url, "_blank");
        } else {
          $toast.error(((_b = (_a = error == null ? void 0 : error.value) == null ? void 0 : _a.data) == null ? void 0 : _b.details) || "Erro ao emitir recibo");
        }
        closeModal();
      } catch (e) {
        $toast.error("Erro inesperado");
      }
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(VDialog, mergeProps({
        persistent: "",
        modelValue: unref(isVisible),
        "onUpdate:modelValue": ($event) => isRef(isVisible) ? isVisible.value = $event : null,
        "max-width": "600"
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VCard, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VContainer, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VRow, {
                          class: "mt-1 mb-3",
                          style: { "justify-content": "space-between" }
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<h1 class="ml-4"${_scopeId4}> Emitir Recibo </h1>`);
                            } else {
                              return [
                                createVNode("h1", { class: "ml-4" }, " Emitir Recibo ")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VRow, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VCol, {
                                cols: "12",
                                md: "6"
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(VTextField, {
                                      label: "Destinat\xE1rio",
                                      modelValue: unref(state).apresentante_nome,
                                      "onUpdate:modelValue": ($event) => unref(state).apresentante_nome = $event,
                                      readonly: __props.visualizar
                                    }, null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(VTextField, {
                                        label: "Destinat\xE1rio",
                                        modelValue: unref(state).apresentante_nome,
                                        "onUpdate:modelValue": ($event) => unref(state).apresentante_nome = $event,
                                        readonly: __props.visualizar
                                      }, null, 8, ["modelValue", "onUpdate:modelValue", "readonly"])
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(VCol, {
                                cols: "12",
                                md: "6"
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(VTextField, {
                                      label: "Documento",
                                      modelValue: unref(state).apresentante_cpf,
                                      "onUpdate:modelValue": ($event) => unref(state).apresentante_cpf = $event,
                                      readonly: __props.visualizar
                                    }, null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(VTextField, {
                                        label: "Documento",
                                        modelValue: unref(state).apresentante_cpf,
                                        "onUpdate:modelValue": ($event) => unref(state).apresentante_cpf = $event,
                                        readonly: __props.visualizar
                                      }, null, 8, ["modelValue", "onUpdate:modelValue", "readonly"])
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(VCol, {
                                  cols: "12",
                                  md: "6"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(VTextField, {
                                      label: "Destinat\xE1rio",
                                      modelValue: unref(state).apresentante_nome,
                                      "onUpdate:modelValue": ($event) => unref(state).apresentante_nome = $event,
                                      readonly: __props.visualizar
                                    }, null, 8, ["modelValue", "onUpdate:modelValue", "readonly"])
                                  ]),
                                  _: 1
                                }),
                                createVNode(VCol, {
                                  cols: "12",
                                  md: "6"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(VTextField, {
                                      label: "Documento",
                                      modelValue: unref(state).apresentante_cpf,
                                      "onUpdate:modelValue": ($event) => unref(state).apresentante_cpf = $event,
                                      readonly: __props.visualizar
                                    }, null, 8, ["modelValue", "onUpdate:modelValue", "readonly"])
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
                          createVNode(VRow, {
                            class: "mt-1 mb-3",
                            style: { "justify-content": "space-between" }
                          }, {
                            default: withCtx(() => [
                              createVNode("h1", { class: "ml-4" }, " Emitir Recibo ")
                            ]),
                            _: 1
                          }),
                          createVNode(VRow, null, {
                            default: withCtx(() => [
                              createVNode(VCol, {
                                cols: "12",
                                md: "6"
                              }, {
                                default: withCtx(() => [
                                  createVNode(VTextField, {
                                    label: "Destinat\xE1rio",
                                    modelValue: unref(state).apresentante_nome,
                                    "onUpdate:modelValue": ($event) => unref(state).apresentante_nome = $event,
                                    readonly: __props.visualizar
                                  }, null, 8, ["modelValue", "onUpdate:modelValue", "readonly"])
                                ]),
                                _: 1
                              }),
                              createVNode(VCol, {
                                cols: "12",
                                md: "6"
                              }, {
                                default: withCtx(() => [
                                  createVNode(VTextField, {
                                    label: "Documento",
                                    modelValue: unref(state).apresentante_cpf,
                                    "onUpdate:modelValue": ($event) => unref(state).apresentante_cpf = $event,
                                    readonly: __props.visualizar
                                  }, null, 8, ["modelValue", "onUpdate:modelValue", "readonly"])
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
                  _push3(ssrRenderComponent(VCardActions, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VBtn, {
                          style: { "background-color": "red", "color": "white" },
                          onClick: closeModal
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(` Voltar `);
                            } else {
                              return [
                                createTextVNode(" Voltar ")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        if (!__props.visualizar) {
                          _push4(ssrRenderComponent(VBtn, {
                            style: { "background-color": "green", "color": "white" },
                            onClick: onSubmit
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(` Imprimir `);
                              } else {
                                return [
                                  createTextVNode(" Imprimir ")
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        } else {
                          _push4(`<!---->`);
                        }
                      } else {
                        return [
                          createVNode(VBtn, {
                            style: { "background-color": "red", "color": "white" },
                            onClick: closeModal
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Voltar ")
                            ]),
                            _: 1
                          }),
                          !__props.visualizar ? (openBlock(), createBlock(VBtn, {
                            key: 0,
                            style: { "background-color": "green", "color": "white" },
                            onClick: onSubmit
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Imprimir ")
                            ]),
                            _: 1
                          })) : createCommentVNode("", true)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VContainer, null, {
                      default: withCtx(() => [
                        createVNode(VRow, {
                          class: "mt-1 mb-3",
                          style: { "justify-content": "space-between" }
                        }, {
                          default: withCtx(() => [
                            createVNode("h1", { class: "ml-4" }, " Emitir Recibo ")
                          ]),
                          _: 1
                        }),
                        createVNode(VRow, null, {
                          default: withCtx(() => [
                            createVNode(VCol, {
                              cols: "12",
                              md: "6"
                            }, {
                              default: withCtx(() => [
                                createVNode(VTextField, {
                                  label: "Destinat\xE1rio",
                                  modelValue: unref(state).apresentante_nome,
                                  "onUpdate:modelValue": ($event) => unref(state).apresentante_nome = $event,
                                  readonly: __props.visualizar
                                }, null, 8, ["modelValue", "onUpdate:modelValue", "readonly"])
                              ]),
                              _: 1
                            }),
                            createVNode(VCol, {
                              cols: "12",
                              md: "6"
                            }, {
                              default: withCtx(() => [
                                createVNode(VTextField, {
                                  label: "Documento",
                                  modelValue: unref(state).apresentante_cpf,
                                  "onUpdate:modelValue": ($event) => unref(state).apresentante_cpf = $event,
                                  readonly: __props.visualizar
                                }, null, 8, ["modelValue", "onUpdate:modelValue", "readonly"])
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(VCardActions, null, {
                      default: withCtx(() => [
                        createVNode(VBtn, {
                          style: { "background-color": "red", "color": "white" },
                          onClick: closeModal
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Voltar ")
                          ]),
                          _: 1
                        }),
                        !__props.visualizar ? (openBlock(), createBlock(VBtn, {
                          key: 0,
                          style: { "background-color": "green", "color": "white" },
                          onClick: onSubmit
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Imprimir ")
                          ]),
                          _: 1
                        })) : createCommentVNode("", true)
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
                  createVNode(VContainer, null, {
                    default: withCtx(() => [
                      createVNode(VRow, {
                        class: "mt-1 mb-3",
                        style: { "justify-content": "space-between" }
                      }, {
                        default: withCtx(() => [
                          createVNode("h1", { class: "ml-4" }, " Emitir Recibo ")
                        ]),
                        _: 1
                      }),
                      createVNode(VRow, null, {
                        default: withCtx(() => [
                          createVNode(VCol, {
                            cols: "12",
                            md: "6"
                          }, {
                            default: withCtx(() => [
                              createVNode(VTextField, {
                                label: "Destinat\xE1rio",
                                modelValue: unref(state).apresentante_nome,
                                "onUpdate:modelValue": ($event) => unref(state).apresentante_nome = $event,
                                readonly: __props.visualizar
                              }, null, 8, ["modelValue", "onUpdate:modelValue", "readonly"])
                            ]),
                            _: 1
                          }),
                          createVNode(VCol, {
                            cols: "12",
                            md: "6"
                          }, {
                            default: withCtx(() => [
                              createVNode(VTextField, {
                                label: "Documento",
                                modelValue: unref(state).apresentante_cpf,
                                "onUpdate:modelValue": ($event) => unref(state).apresentante_cpf = $event,
                                readonly: __props.visualizar
                              }, null, 8, ["modelValue", "onUpdate:modelValue", "readonly"])
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode(VCardActions, null, {
                    default: withCtx(() => [
                      createVNode(VBtn, {
                        style: { "background-color": "red", "color": "white" },
                        onClick: closeModal
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Voltar ")
                        ]),
                        _: 1
                      }),
                      !__props.visualizar ? (openBlock(), createBlock(VBtn, {
                        key: 0,
                        style: { "background-color": "green", "color": "white" },
                        onClick: onSubmit
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Imprimir ")
                        ]),
                        _: 1
                      })) : createCommentVNode("", true)
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
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Modal/ImprecaoRecibo.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : undefined;
};
const _imports_4 = "data:image/png;base64,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";
const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const config = useRuntimeConfig();
    const { $toast } = useNuxtApp();
    const allUsuarios = `${config.public.managemant}/listarUsuarios`;
    const allServicos = `${config.public.managemant}/listarOrdensServico`;
    const allTiposAtos = `${config.public.managemant}/tipoAtos`;
    `${config.public.auth}/service/gerencia/emitir_recibo`;
    const router = useRouter$1();
    const usuario_token = ref(useCookie("auth_token").value) || null;
    const cartorio_token = ref(useCookie("user-data").value.cartorio_token) || null;
    const servicosItems = ref([]);
    const usuariosItems = ref([]);
    const tipoAtosItems = ref([]);
    const situacaoItems = ref(["PENDENTE", "EM ANDAMENTO", "CONCLU\xCDDA", "LAVRADA"]);
    const isModalRecebimentoOpen = ref(false);
    const isModalCancelamentoOpen = ref(false);
    const isModalImprecaoRecibo = ref(false);
    const showCreateOrdemServ = ref(null);
    const ordemserv_token = ref(null);
    const numero_os = ref(null);
    const selectedOrder = ref({});
    const selectedRecibo = ref({});
    useCookie("auth_token");
    const state = reactive({
      numero: null,
      data_inicio: getCurrentDate(),
      data_fim: getCurrentDate(),
      data_lavratura_inicio: null,
      data_lavratura_fim: null,
      protocolo: null,
      livro: null,
      folha: null,
      situacao: null,
      usuario_token: usuario_token.value,
      selo: null,
      ato_tipo_token: null,
      apresentante: null
    });
    const headers = [
      { title: "Data Abertura", value: "dt_abertura", width: "100px" },
      { title: "Data Recebimento", value: "data", width: "100px" },
      { title: "N\xFAmero", value: "numero", width: "10px" },
      { title: "Situa\xE7\xE3o", value: "situacao", width: "115px" },
      { title: "CPF", value: "apresentante_cpf", width: "100px" },
      { title: "Apresentante", value: "apresentante_nome", width: "228px" },
      { title: "Usuario", value: "usuario_nome", width: "30px" },
      { title: "Valor", value: "valor", width: "50px" },
      { title: "A Receber", value: "valor_a_receber", width: "50px" },
      {
        value: "actions"
      }
    ];
    function getCurrentDate() {
      const today = /* @__PURE__ */ new Date();
      const yyyy = today.getFullYear();
      const mm = String(today.getMonth() + 1).padStart(2, "0");
      const dd = String(today.getDate()).padStart(2, "0");
      return `${dd}-${mm}-${yyyy}`;
    }
    function convertToISODate(date) {
      if (!date) return null;
      const [dd, mm, yyyy] = date.split("/");
      return `${yyyy}-${mm}-${dd}`;
    }
    async function usuariosDataPayload() {
      const { data: usuarioData } = await useFetch(allUsuarios, {
        method: "POST",
        body: {
          cartorio_token: cartorio_token.value
        }
      }, "$pAAptWJdb1");
      usuariosItems.value = usuarioData.value;
    }
    async function searchOrdersService() {
      try {
        sessionStorage.setItem("pesquisaOS", JSON.stringify(state));
        const { data: servicosData, error } = await useFetch(allServicos, {
          method: "POST",
          body: {
            cartorio_token: cartorio_token.value,
            numero: state.numero || null,
            data_inicio: convertToISODate(state.data_inicio) || null,
            data_fim: convertToISODate(state.data_fim) || null,
            data_lavratura_inicio: convertToISODate(state.data_lavratura_inicio) || null,
            data_lavratura_fim: convertToISODate(state.data_lavratura_fim) || null,
            protocolo: state.protocolo || null,
            livro: state.livro || null,
            folha: state.folha || null,
            situacao: state.situacao || null,
            usuario_token: state.usuario_token,
            selo: state.selo || null,
            ato_tipo_token: state.ato_tipo_token,
            apresentante: state.apresentante || null
          }
        }, "$IO02J210Z9");
        if (servicosData.value.length > 0) {
          servicosItems.value = servicosData.value.map((item) => {
            return {
              ...item,
              data: item.data ? formatDate(item.data, "dd/mm/yyyy") : null,
              dt_abertura: item.dt_abertura ? formatDate(item.dt_abertura, "dd/mm/yyyy") : null
            };
          });
        } else {
          servicosItems.value = [];
          $toast.error("N\xE3o existe Ordem de Servi\xE7o Registrada!");
        }
      } catch (error) {
        console.error("Erro na requisi\xE7\xE3o", error);
      }
    }
    async function tipoAtosDataPayload() {
      const { data: tipoAtosData, error } = await useFetch(allTiposAtos, {
        method: "POST",
        body: {
          cartorio_token: cartorio_token.value,
          usuario_token: usuario_token.value
        }
      }, "$YgUhKRJlsV");
      tipoAtosItems.value = tipoAtosData.value;
    }
    const servicosDataTable = async () => {
      try {
        const currentDate = getCurrentDate();
        const pesquisaSalva = sessionStorage.getItem("pesquisaOS");
        const dadosRestaurados = JSON.parse(pesquisaSalva);
        const { data: servicosData, error } = await useFetch(allServicos, {
          method: "POST",
          body: {
            cartorio_token: cartorio_token.value,
            usuario_token: dadosRestaurados.usuario_token || usuario_token.value,
            data_fim: convertToISODate(dadosRestaurados == null ? void 0 : dadosRestaurados.data_fim) || currentDate,
            data_inicio: convertToISODate(dadosRestaurados == null ? void 0 : dadosRestaurados.data_inicio) || currentDate
          }
        }, "$xKnfARCL4G");
        if (servicosData.value.length > 0) {
          servicosItems.value = servicosData.value.map((item) => {
            return {
              ...item,
              data: formatDate(item.data, "dd/mm/yyyy"),
              dt_abertura: formatDate(item.dt_abertura, "dd/mm/yyyy")
            };
          });
        } else {
          servicosItems.value = [];
        }
      } catch (error) {
        console.error("Erro ao buscar servi\xE7os", error);
      }
    };
    function redirectToCancelamento(item) {
      numero_os.value = item.numero;
      ordemserv_token.value = item.token;
      isModalCancelamentoOpen.value = true;
    }
    function redirectToImprecaoRecibo(item) {
      selectedRecibo.value.apresentante_nome = item.apresentante_nome;
      selectedRecibo.value.apresentante_cpf = item.apresentante_cpf;
      isModalImprecaoRecibo.value = true;
    }
    function redirectToUpdate(id) {
      const serviceCookie = useCookie("user-service");
      const servico = servicosItems.value.find((item) => item.id === id);
      serviceCookie.value = serviceCookie.value = JSON.stringify({
        id: servico.id,
        token: servico.token
      });
      router.push({ path: `/os/atualizar/${id}` });
    }
    function redirectToRecebimento(numero, item) {
      numero_os.value = numero;
      selectedOrder.value = {
        token: item.token,
        numero: item.numero,
        valor: item.valor,
        valor_pago: item.valor_pago
      };
      isModalRecebimentoOpen.value = true;
    }
    const showCreateOrdem = () => {
      const serviceCookie = useCookie("user-service");
      const isTrueOrdemServ = useCookie("ordem-button");
      serviceCookie.value = null;
      showCreateOrdemServ.value = true;
      isTrueOrdemServ.value = showCreateOrdemServ.value;
    };
    usuariosDataPayload();
    tipoAtosDataPayload();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      const _component_RecebimentoOrdem = _sfc_main$3;
      const _component_CancelamentoOrdem = _sfc_main$2;
      const _component_ModalImprecaoRecibo = _sfc_main$1;
      const _directive_mask = resolveDirective("mask");
      _push(ssrRenderComponent(VContainer, mergeProps({
        class: "mt-5",
        style: { "width": "100%" }
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VRow, { class: "mb-5" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<h1${_scopeId2}>Ordens de Servi\xE7o</h1>`);
                  _push3(ssrRenderComponent(_component_NuxtLink, { to: "/os/criar-registro" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<img style="${ssrRenderStyle({ "width": "60px", "height": "60px", "cursor": "pointer", "margin-left": "70px" })}"${ssrRenderAttr("src", _imports_0)} alt="novo"${_scopeId3}>`);
                      } else {
                        return [
                          createVNode("img", {
                            style: { "width": "60px", "height": "60px", "cursor": "pointer", "margin-left": "70px" },
                            src: _imports_0,
                            alt: "novo",
                            onClick: showCreateOrdem
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode("h1", null, "Ordens de Servi\xE7o"),
                    createVNode(_component_NuxtLink, { to: "/os/criar-registro" }, {
                      default: withCtx(() => [
                        createVNode("img", {
                          style: { "width": "60px", "height": "60px", "cursor": "pointer", "margin-left": "70px" },
                          src: _imports_0,
                          alt: "novo",
                          onClick: showCreateOrdem
                        })
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(VRow, { style: { "margin-bottom": "-35px" } }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VCol, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VTextField, {
                          modelValue: unref(state).numero,
                          "onUpdate:modelValue": ($event) => unref(state).numero = $event,
                          label: "N\xFAmero"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VTextField, {
                            modelValue: unref(state).numero,
                            "onUpdate:modelValue": ($event) => unref(state).numero = $event,
                            label: "N\xFAmero"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VCol, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VTextField, mergeProps({
                          modelValue: unref(state).data_inicio,
                          "onUpdate:modelValue": ($event) => unref(state).data_inicio = $event,
                          label: "Abertura de",
                          placeholder: "dd/mm/yyyy",
                          style: { "width": "150px" }
                        }, ssrGetDirectiveProps(_ctx, _directive_mask, "##/##/####")), null, _parent4, _scopeId3));
                      } else {
                        return [
                          withDirectives(createVNode(VTextField, {
                            modelValue: unref(state).data_inicio,
                            "onUpdate:modelValue": ($event) => unref(state).data_inicio = $event,
                            label: "Abertura de",
                            placeholder: "dd/mm/yyyy",
                            style: { "width": "150px" }
                          }, null, 8, ["modelValue", "onUpdate:modelValue"]), [
                            [_directive_mask, "##/##/####"]
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VCol, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VTextField, mergeProps({
                          modelValue: unref(state).data_fim,
                          "onUpdate:modelValue": ($event) => unref(state).data_fim = $event,
                          label: "Abertura at\xE9",
                          placeholder: "dd/mm/yyyy",
                          style: { "width": "150px" }
                        }, ssrGetDirectiveProps(_ctx, _directive_mask, "##/##/####")), null, _parent4, _scopeId3));
                      } else {
                        return [
                          withDirectives(createVNode(VTextField, {
                            modelValue: unref(state).data_fim,
                            "onUpdate:modelValue": ($event) => unref(state).data_fim = $event,
                            label: "Abertura at\xE9",
                            placeholder: "dd/mm/yyyy",
                            style: { "width": "150px" }
                          }, null, 8, ["modelValue", "onUpdate:modelValue"]), [
                            [_directive_mask, "##/##/####"]
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VCol, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VTextField, mergeProps({
                          modelValue: unref(state).data_lavratura_inicio,
                          "onUpdate:modelValue": ($event) => unref(state).data_lavratura_inicio = $event,
                          label: "Lavratura de",
                          placeholder: "dd/mm/yyyy",
                          style: { "width": "150px" }
                        }, ssrGetDirectiveProps(_ctx, _directive_mask, "##/##/####")), null, _parent4, _scopeId3));
                      } else {
                        return [
                          withDirectives(createVNode(VTextField, {
                            modelValue: unref(state).data_lavratura_inicio,
                            "onUpdate:modelValue": ($event) => unref(state).data_lavratura_inicio = $event,
                            label: "Lavratura de",
                            placeholder: "dd/mm/yyyy",
                            style: { "width": "150px" }
                          }, null, 8, ["modelValue", "onUpdate:modelValue"]), [
                            [_directive_mask, "##/##/####"]
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VCol, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VTextField, mergeProps({
                          modelValue: unref(state).data_lavratura_fim,
                          "onUpdate:modelValue": ($event) => unref(state).data_lavratura_fim = $event,
                          label: "Lavratura at\xE9",
                          placeholder: "dd/mm/yyyy",
                          style: { "width": "150px" }
                        }, ssrGetDirectiveProps(_ctx, _directive_mask, "##/##/####")), null, _parent4, _scopeId3));
                      } else {
                        return [
                          withDirectives(createVNode(VTextField, {
                            modelValue: unref(state).data_lavratura_fim,
                            "onUpdate:modelValue": ($event) => unref(state).data_lavratura_fim = $event,
                            label: "Lavratura at\xE9",
                            placeholder: "dd/mm/yyyy",
                            style: { "width": "150px" }
                          }, null, 8, ["modelValue", "onUpdate:modelValue"]), [
                            [_directive_mask, "##/##/####"]
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VCol, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VTextField, {
                          modelValue: unref(state).protocolo,
                          "onUpdate:modelValue": ($event) => unref(state).protocolo = $event,
                          label: "Protocolo"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VTextField, {
                            modelValue: unref(state).protocolo,
                            "onUpdate:modelValue": ($event) => unref(state).protocolo = $event,
                            label: "Protocolo"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VCol, { md: "1" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VTextField, {
                          modelValue: unref(state).livro,
                          "onUpdate:modelValue": ($event) => unref(state).livro = $event,
                          label: "Livro"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VTextField, {
                            modelValue: unref(state).livro,
                            "onUpdate:modelValue": ($event) => unref(state).livro = $event,
                            label: "Livro"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VCol, { md: "1" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VTextField, {
                          modelValue: unref(state).folha,
                          "onUpdate:modelValue": ($event) => unref(state).folha = $event,
                          label: "Folha"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VTextField, {
                            modelValue: unref(state).folha,
                            "onUpdate:modelValue": ($event) => unref(state).folha = $event,
                            label: "Folha"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VCol, null, {
                      default: withCtx(() => [
                        createVNode(VTextField, {
                          modelValue: unref(state).numero,
                          "onUpdate:modelValue": ($event) => unref(state).numero = $event,
                          label: "N\xFAmero"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, null, {
                      default: withCtx(() => [
                        withDirectives(createVNode(VTextField, {
                          modelValue: unref(state).data_inicio,
                          "onUpdate:modelValue": ($event) => unref(state).data_inicio = $event,
                          label: "Abertura de",
                          placeholder: "dd/mm/yyyy",
                          style: { "width": "150px" }
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]), [
                          [_directive_mask, "##/##/####"]
                        ])
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, null, {
                      default: withCtx(() => [
                        withDirectives(createVNode(VTextField, {
                          modelValue: unref(state).data_fim,
                          "onUpdate:modelValue": ($event) => unref(state).data_fim = $event,
                          label: "Abertura at\xE9",
                          placeholder: "dd/mm/yyyy",
                          style: { "width": "150px" }
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]), [
                          [_directive_mask, "##/##/####"]
                        ])
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, null, {
                      default: withCtx(() => [
                        withDirectives(createVNode(VTextField, {
                          modelValue: unref(state).data_lavratura_inicio,
                          "onUpdate:modelValue": ($event) => unref(state).data_lavratura_inicio = $event,
                          label: "Lavratura de",
                          placeholder: "dd/mm/yyyy",
                          style: { "width": "150px" }
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]), [
                          [_directive_mask, "##/##/####"]
                        ])
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, null, {
                      default: withCtx(() => [
                        withDirectives(createVNode(VTextField, {
                          modelValue: unref(state).data_lavratura_fim,
                          "onUpdate:modelValue": ($event) => unref(state).data_lavratura_fim = $event,
                          label: "Lavratura at\xE9",
                          placeholder: "dd/mm/yyyy",
                          style: { "width": "150px" }
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]), [
                          [_directive_mask, "##/##/####"]
                        ])
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, null, {
                      default: withCtx(() => [
                        createVNode(VTextField, {
                          modelValue: unref(state).protocolo,
                          "onUpdate:modelValue": ($event) => unref(state).protocolo = $event,
                          label: "Protocolo"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, { md: "1" }, {
                      default: withCtx(() => [
                        createVNode(VTextField, {
                          modelValue: unref(state).livro,
                          "onUpdate:modelValue": ($event) => unref(state).livro = $event,
                          label: "Livro"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, { md: "1" }, {
                      default: withCtx(() => [
                        createVNode(VTextField, {
                          modelValue: unref(state).folha,
                          "onUpdate:modelValue": ($event) => unref(state).folha = $event,
                          label: "Folha"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
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
                  _push3(ssrRenderComponent(VCol, { md: "3" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VAutocomplete, {
                          modelValue: unref(state).situacao,
                          "onUpdate:modelValue": ($event) => unref(state).situacao = $event,
                          items: unref(situacaoItems),
                          label: "Situa\xE7\xE3o"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VAutocomplete, {
                            modelValue: unref(state).situacao,
                            "onUpdate:modelValue": ($event) => unref(state).situacao = $event,
                            items: unref(situacaoItems),
                            label: "Situa\xE7\xE3o"
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VCol, { md: "2" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VAutocomplete, {
                          items: unref(usuariosItems),
                          modelValue: unref(state).usuario_token,
                          "onUpdate:modelValue": ($event) => unref(state).usuario_token = $event,
                          "item-title": "user_nome",
                          "item-value": "user_token",
                          label: "Usuario"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VAutocomplete, {
                            items: unref(usuariosItems),
                            modelValue: unref(state).usuario_token,
                            "onUpdate:modelValue": ($event) => unref(state).usuario_token = $event,
                            "item-title": "user_nome",
                            "item-value": "user_token",
                            label: "Usuario"
                          }, null, 8, ["items", "modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VCol, { md: "1" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VTextField, {
                          modelValue: unref(state).selo,
                          "onUpdate:modelValue": ($event) => unref(state).selo = $event,
                          label: "Selo"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VTextField, {
                            modelValue: unref(state).selo,
                            "onUpdate:modelValue": ($event) => unref(state).selo = $event,
                            label: "Selo"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VCol, { md: "3" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VAutocomplete, {
                          modelValue: unref(state).ato_tipo_token,
                          "onUpdate:modelValue": ($event) => unref(state).ato_tipo_token = $event,
                          items: unref(tipoAtosItems),
                          "item-title": "descricao",
                          "item-value": "token",
                          label: "Servi\xE7o"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VAutocomplete, {
                            modelValue: unref(state).ato_tipo_token,
                            "onUpdate:modelValue": ($event) => unref(state).ato_tipo_token = $event,
                            items: unref(tipoAtosItems),
                            "item-title": "descricao",
                            "item-value": "token",
                            label: "Servi\xE7o"
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VCol, { md: "2" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VTextField, {
                          modelValue: unref(state).apresentante,
                          "onUpdate:modelValue": ($event) => unref(state).apresentante = $event,
                          label: "Apresentante"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VTextField, {
                            modelValue: unref(state).apresentante,
                            "onUpdate:modelValue": ($event) => unref(state).apresentante = $event,
                            label: "Apresentante"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VCol, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div${_scopeId3}><img style="${ssrRenderStyle({ "width": "40px", "height": "40px", "cursor": "pointer" })}"${ssrRenderAttr("src", _imports_1)} alt="Pesquisar"${_scopeId3}></div>`);
                      } else {
                        return [
                          createVNode("div", null, [
                            createVNode("img", {
                              onClick: searchOrdersService,
                              style: { "width": "40px", "height": "40px", "cursor": "pointer" },
                              src: _imports_1,
                              alt: "Pesquisar"
                            })
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VCol, { md: "3" }, {
                      default: withCtx(() => [
                        createVNode(VAutocomplete, {
                          modelValue: unref(state).situacao,
                          "onUpdate:modelValue": ($event) => unref(state).situacao = $event,
                          items: unref(situacaoItems),
                          label: "Situa\xE7\xE3o"
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, { md: "2" }, {
                      default: withCtx(() => [
                        createVNode(VAutocomplete, {
                          items: unref(usuariosItems),
                          modelValue: unref(state).usuario_token,
                          "onUpdate:modelValue": ($event) => unref(state).usuario_token = $event,
                          "item-title": "user_nome",
                          "item-value": "user_token",
                          label: "Usuario"
                        }, null, 8, ["items", "modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, { md: "1" }, {
                      default: withCtx(() => [
                        createVNode(VTextField, {
                          modelValue: unref(state).selo,
                          "onUpdate:modelValue": ($event) => unref(state).selo = $event,
                          label: "Selo"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, { md: "3" }, {
                      default: withCtx(() => [
                        createVNode(VAutocomplete, {
                          modelValue: unref(state).ato_tipo_token,
                          "onUpdate:modelValue": ($event) => unref(state).ato_tipo_token = $event,
                          items: unref(tipoAtosItems),
                          "item-title": "descricao",
                          "item-value": "token",
                          label: "Servi\xE7o"
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, { md: "2" }, {
                      default: withCtx(() => [
                        createVNode(VTextField, {
                          modelValue: unref(state).apresentante,
                          "onUpdate:modelValue": ($event) => unref(state).apresentante = $event,
                          label: "Apresentante"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, null, {
                      default: withCtx(() => [
                        createVNode("div", null, [
                          createVNode("img", {
                            onClick: searchOrdersService,
                            style: { "width": "40px", "height": "40px", "cursor": "pointer" },
                            src: _imports_1,
                            alt: "Pesquisar"
                          })
                        ])
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<hr class="mt-5 mb-5"${_scopeId}>`);
            _push2(ssrRenderComponent(VDataTable, {
              headers,
              style: { "min-width": "1230px", "font-size": "12px" },
              items: unref(servicosItems),
              "item-key": "id"
            }, {
              "item.actions": withCtx(({ item }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VRow, { style: { "display": "flex", "gap": "2px", "margin-top": "-5px" } }, {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="${ssrRenderClass({ disabled: !item.btn_receber })}"${ssrRenderAttr("title", item.btn_receber ? "Receber" : "Bloqueado")} title="Receber"${_scopeId3}><img style="${ssrRenderStyle({
                          cursor: item.btn_receber ? "pointer" : "default",
                          width: "30px",
                          height: "30px"
                        })}"${ssrRenderAttr("src", _imports_2)} alt="Receber"${_scopeId3}></div><div class="${ssrRenderClass({ disabled: !item.btn_editar })}"${ssrRenderAttr("title", item.btn_editar ? "Editar" : "Bloqueado")}${_scopeId3}><img style="${ssrRenderStyle({
                          cursor: item.btn_editar ? "pointer" : "default",
                          width: "30px",
                          height: "30px"
                        })}"${ssrRenderAttr("src", _imports_1$1)} alt="Editar"${_scopeId3}></div><div class="${ssrRenderClass({ disabled: !item.btn_recibo })}"${ssrRenderAttr("title", item.btn_recibo ? "Emitir Recibo" : "Bloqueado")}${_scopeId3}><img style="${ssrRenderStyle({
                          cursor: item.btn_recibo ? "pointer" : "default",
                          width: "30px",
                          height: "30px"
                        })}"${ssrRenderAttr("src", _imports_4)} alt="Emitir Recibo"${_scopeId3}></div><div${ssrIncludeBooleanAttr(!item.btn_cancelar) ? " disabled" : ""} title="Cancelamento" style="${ssrRenderStyle({
                          opacity: item.btn_cancelar ? 1 : 0.5,
                          cursor: item.btn_cancelar ? "pointer" : "not-allowed"
                        })}"${_scopeId3}>`);
                        if (item.excluido) {
                          _push4(`<img style="${ssrRenderStyle({ "width": "30px", "height": "30px" })}"${ssrRenderAttr("src", _imports_2$1)} alt="Visualizar" title="Reativar"${_scopeId3}>`);
                        } else {
                          _push4(`<img${ssrRenderAttr("src", _imports_3)} alt="Cancelamento" class="trash-icon" style="${ssrRenderStyle({ "width": "30px", "height": "30px" })}" title="Excluir"${_scopeId3}>`);
                        }
                        _push4(`</div>`);
                      } else {
                        return [
                          createVNode("div", {
                            class: { disabled: !item.btn_receber },
                            title: item.btn_receber ? "Receber" : "Bloqueado",
                            onClick: ($event) => item.btn_receber ? redirectToRecebimento(item.numero, item) : null
                          }, [
                            createVNode("img", {
                              style: {
                                cursor: item.btn_receber ? "pointer" : "default",
                                width: "30px",
                                height: "30px"
                              },
                              src: _imports_2,
                              alt: "Receber"
                            }, null, 4)
                          ], 10, ["title", "onClick"]),
                          createVNode("div", {
                            class: { disabled: !item.btn_editar },
                            onClick: ($event) => item.btn_editar ? redirectToUpdate(item.id) : null,
                            title: item.btn_editar ? "Editar" : "Bloqueado"
                          }, [
                            createVNode("img", {
                              style: {
                                cursor: item.btn_editar ? "pointer" : "default",
                                width: "30px",
                                height: "30px"
                              },
                              src: _imports_1$1,
                              alt: "Editar"
                            }, null, 4)
                          ], 10, ["onClick", "title"]),
                          createVNode("div", {
                            class: { disabled: !item.btn_recibo },
                            onClick: ($event) => item.btn_recibo ? redirectToImprecaoRecibo(item) : null,
                            title: item.btn_recibo ? "Emitir Recibo" : "Bloqueado"
                          }, [
                            createVNode("img", {
                              style: {
                                cursor: item.btn_recibo ? "pointer" : "default",
                                width: "30px",
                                height: "30px"
                              },
                              src: _imports_4,
                              alt: "Emitir Recibo"
                            }, null, 4)
                          ], 10, ["onClick", "title"]),
                          createVNode("div", {
                            disabled: !item.btn_cancelar,
                            onClick: ($event) => item.btn_cancelar ? redirectToCancelamento(item) : null,
                            title: "Cancelamento",
                            style: {
                              opacity: item.btn_cancelar ? 1 : 0.5,
                              cursor: item.btn_cancelar ? "pointer" : "not-allowed"
                            }
                          }, [
                            item.excluido ? (openBlock(), createBlock("img", {
                              key: 0,
                              style: { "width": "30px", "height": "30px" },
                              src: _imports_2$1,
                              alt: "Visualizar",
                              title: "Reativar"
                            })) : (openBlock(), createBlock("img", {
                              key: 1,
                              src: _imports_3,
                              alt: "Cancelamento",
                              class: "trash-icon",
                              style: { "width": "30px", "height": "30px" },
                              title: "Excluir"
                            }))
                          ], 12, ["disabled", "onClick"])
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VRow, { style: { "display": "flex", "gap": "2px", "margin-top": "-5px" } }, {
                      default: withCtx(() => [
                        createVNode("div", {
                          class: { disabled: !item.btn_receber },
                          title: item.btn_receber ? "Receber" : "Bloqueado",
                          onClick: ($event) => item.btn_receber ? redirectToRecebimento(item.numero, item) : null
                        }, [
                          createVNode("img", {
                            style: {
                              cursor: item.btn_receber ? "pointer" : "default",
                              width: "30px",
                              height: "30px"
                            },
                            src: _imports_2,
                            alt: "Receber"
                          }, null, 4)
                        ], 10, ["title", "onClick"]),
                        createVNode("div", {
                          class: { disabled: !item.btn_editar },
                          onClick: ($event) => item.btn_editar ? redirectToUpdate(item.id) : null,
                          title: item.btn_editar ? "Editar" : "Bloqueado"
                        }, [
                          createVNode("img", {
                            style: {
                              cursor: item.btn_editar ? "pointer" : "default",
                              width: "30px",
                              height: "30px"
                            },
                            src: _imports_1$1,
                            alt: "Editar"
                          }, null, 4)
                        ], 10, ["onClick", "title"]),
                        createVNode("div", {
                          class: { disabled: !item.btn_recibo },
                          onClick: ($event) => item.btn_recibo ? redirectToImprecaoRecibo(item) : null,
                          title: item.btn_recibo ? "Emitir Recibo" : "Bloqueado"
                        }, [
                          createVNode("img", {
                            style: {
                              cursor: item.btn_recibo ? "pointer" : "default",
                              width: "30px",
                              height: "30px"
                            },
                            src: _imports_4,
                            alt: "Emitir Recibo"
                          }, null, 4)
                        ], 10, ["onClick", "title"]),
                        createVNode("div", {
                          disabled: !item.btn_cancelar,
                          onClick: ($event) => item.btn_cancelar ? redirectToCancelamento(item) : null,
                          title: "Cancelamento",
                          style: {
                            opacity: item.btn_cancelar ? 1 : 0.5,
                            cursor: item.btn_cancelar ? "pointer" : "not-allowed"
                          }
                        }, [
                          item.excluido ? (openBlock(), createBlock("img", {
                            key: 0,
                            style: { "width": "30px", "height": "30px" },
                            src: _imports_2$1,
                            alt: "Visualizar",
                            title: "Reativar"
                          })) : (openBlock(), createBlock("img", {
                            key: 1,
                            src: _imports_3,
                            alt: "Cancelamento",
                            class: "trash-icon",
                            style: { "width": "30px", "height": "30px" },
                            title: "Excluir"
                          }))
                        ], 12, ["disabled", "onClick"])
                      ]),
                      _: 2
                    }, 1024)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_RecebimentoOrdem, {
              show: unref(isModalRecebimentoOpen),
              numero_os: unref(numero_os),
              ordem: unref(selectedOrder),
              onClose: ($event) => isModalRecebimentoOpen.value = false,
              onRefreshValue: ($event) => servicosDataTable()
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_CancelamentoOrdem, {
              show: unref(isModalCancelamentoOpen),
              numero_os: unref(numero_os),
              ordemserv_token: unref(ordemserv_token),
              onClose: ($event) => isModalCancelamentoOpen.value = false
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_ModalImprecaoRecibo, {
              show: unref(isModalImprecaoRecibo),
              apresentante_nome: unref(selectedRecibo).apresentante_nome,
              apresentante_cpf: unref(selectedRecibo).apresentante_cpf,
              onClose: ($event) => isModalImprecaoRecibo.value = false
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(VRow, { class: "mb-5" }, {
                default: withCtx(() => [
                  createVNode("h1", null, "Ordens de Servi\xE7o"),
                  createVNode(_component_NuxtLink, { to: "/os/criar-registro" }, {
                    default: withCtx(() => [
                      createVNode("img", {
                        style: { "width": "60px", "height": "60px", "cursor": "pointer", "margin-left": "70px" },
                        src: _imports_0,
                        alt: "novo",
                        onClick: showCreateOrdem
                      })
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(VRow, { style: { "margin-bottom": "-35px" } }, {
                default: withCtx(() => [
                  createVNode(VCol, null, {
                    default: withCtx(() => [
                      createVNode(VTextField, {
                        modelValue: unref(state).numero,
                        "onUpdate:modelValue": ($event) => unref(state).numero = $event,
                        label: "N\xFAmero"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(VCol, null, {
                    default: withCtx(() => [
                      withDirectives(createVNode(VTextField, {
                        modelValue: unref(state).data_inicio,
                        "onUpdate:modelValue": ($event) => unref(state).data_inicio = $event,
                        label: "Abertura de",
                        placeholder: "dd/mm/yyyy",
                        style: { "width": "150px" }
                      }, null, 8, ["modelValue", "onUpdate:modelValue"]), [
                        [_directive_mask, "##/##/####"]
                      ])
                    ]),
                    _: 1
                  }),
                  createVNode(VCol, null, {
                    default: withCtx(() => [
                      withDirectives(createVNode(VTextField, {
                        modelValue: unref(state).data_fim,
                        "onUpdate:modelValue": ($event) => unref(state).data_fim = $event,
                        label: "Abertura at\xE9",
                        placeholder: "dd/mm/yyyy",
                        style: { "width": "150px" }
                      }, null, 8, ["modelValue", "onUpdate:modelValue"]), [
                        [_directive_mask, "##/##/####"]
                      ])
                    ]),
                    _: 1
                  }),
                  createVNode(VCol, null, {
                    default: withCtx(() => [
                      withDirectives(createVNode(VTextField, {
                        modelValue: unref(state).data_lavratura_inicio,
                        "onUpdate:modelValue": ($event) => unref(state).data_lavratura_inicio = $event,
                        label: "Lavratura de",
                        placeholder: "dd/mm/yyyy",
                        style: { "width": "150px" }
                      }, null, 8, ["modelValue", "onUpdate:modelValue"]), [
                        [_directive_mask, "##/##/####"]
                      ])
                    ]),
                    _: 1
                  }),
                  createVNode(VCol, null, {
                    default: withCtx(() => [
                      withDirectives(createVNode(VTextField, {
                        modelValue: unref(state).data_lavratura_fim,
                        "onUpdate:modelValue": ($event) => unref(state).data_lavratura_fim = $event,
                        label: "Lavratura at\xE9",
                        placeholder: "dd/mm/yyyy",
                        style: { "width": "150px" }
                      }, null, 8, ["modelValue", "onUpdate:modelValue"]), [
                        [_directive_mask, "##/##/####"]
                      ])
                    ]),
                    _: 1
                  }),
                  createVNode(VCol, null, {
                    default: withCtx(() => [
                      createVNode(VTextField, {
                        modelValue: unref(state).protocolo,
                        "onUpdate:modelValue": ($event) => unref(state).protocolo = $event,
                        label: "Protocolo"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(VCol, { md: "1" }, {
                    default: withCtx(() => [
                      createVNode(VTextField, {
                        modelValue: unref(state).livro,
                        "onUpdate:modelValue": ($event) => unref(state).livro = $event,
                        label: "Livro"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(VCol, { md: "1" }, {
                    default: withCtx(() => [
                      createVNode(VTextField, {
                        modelValue: unref(state).folha,
                        "onUpdate:modelValue": ($event) => unref(state).folha = $event,
                        label: "Folha"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(VRow, null, {
                default: withCtx(() => [
                  createVNode(VCol, { md: "3" }, {
                    default: withCtx(() => [
                      createVNode(VAutocomplete, {
                        modelValue: unref(state).situacao,
                        "onUpdate:modelValue": ($event) => unref(state).situacao = $event,
                        items: unref(situacaoItems),
                        label: "Situa\xE7\xE3o"
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                    ]),
                    _: 1
                  }),
                  createVNode(VCol, { md: "2" }, {
                    default: withCtx(() => [
                      createVNode(VAutocomplete, {
                        items: unref(usuariosItems),
                        modelValue: unref(state).usuario_token,
                        "onUpdate:modelValue": ($event) => unref(state).usuario_token = $event,
                        "item-title": "user_nome",
                        "item-value": "user_token",
                        label: "Usuario"
                      }, null, 8, ["items", "modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(VCol, { md: "1" }, {
                    default: withCtx(() => [
                      createVNode(VTextField, {
                        modelValue: unref(state).selo,
                        "onUpdate:modelValue": ($event) => unref(state).selo = $event,
                        label: "Selo"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(VCol, { md: "3" }, {
                    default: withCtx(() => [
                      createVNode(VAutocomplete, {
                        modelValue: unref(state).ato_tipo_token,
                        "onUpdate:modelValue": ($event) => unref(state).ato_tipo_token = $event,
                        items: unref(tipoAtosItems),
                        "item-title": "descricao",
                        "item-value": "token",
                        label: "Servi\xE7o"
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                    ]),
                    _: 1
                  }),
                  createVNode(VCol, { md: "2" }, {
                    default: withCtx(() => [
                      createVNode(VTextField, {
                        modelValue: unref(state).apresentante,
                        "onUpdate:modelValue": ($event) => unref(state).apresentante = $event,
                        label: "Apresentante"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(VCol, null, {
                    default: withCtx(() => [
                      createVNode("div", null, [
                        createVNode("img", {
                          onClick: searchOrdersService,
                          style: { "width": "40px", "height": "40px", "cursor": "pointer" },
                          src: _imports_1,
                          alt: "Pesquisar"
                        })
                      ])
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode("hr", { class: "mt-5 mb-5" }),
              createVNode(VDataTable, {
                headers,
                style: { "min-width": "1230px", "font-size": "12px" },
                items: unref(servicosItems),
                "item-key": "id"
              }, {
                "item.actions": withCtx(({ item }) => [
                  createVNode(VRow, { style: { "display": "flex", "gap": "2px", "margin-top": "-5px" } }, {
                    default: withCtx(() => [
                      createVNode("div", {
                        class: { disabled: !item.btn_receber },
                        title: item.btn_receber ? "Receber" : "Bloqueado",
                        onClick: ($event) => item.btn_receber ? redirectToRecebimento(item.numero, item) : null
                      }, [
                        createVNode("img", {
                          style: {
                            cursor: item.btn_receber ? "pointer" : "default",
                            width: "30px",
                            height: "30px"
                          },
                          src: _imports_2,
                          alt: "Receber"
                        }, null, 4)
                      ], 10, ["title", "onClick"]),
                      createVNode("div", {
                        class: { disabled: !item.btn_editar },
                        onClick: ($event) => item.btn_editar ? redirectToUpdate(item.id) : null,
                        title: item.btn_editar ? "Editar" : "Bloqueado"
                      }, [
                        createVNode("img", {
                          style: {
                            cursor: item.btn_editar ? "pointer" : "default",
                            width: "30px",
                            height: "30px"
                          },
                          src: _imports_1$1,
                          alt: "Editar"
                        }, null, 4)
                      ], 10, ["onClick", "title"]),
                      createVNode("div", {
                        class: { disabled: !item.btn_recibo },
                        onClick: ($event) => item.btn_recibo ? redirectToImprecaoRecibo(item) : null,
                        title: item.btn_recibo ? "Emitir Recibo" : "Bloqueado"
                      }, [
                        createVNode("img", {
                          style: {
                            cursor: item.btn_recibo ? "pointer" : "default",
                            width: "30px",
                            height: "30px"
                          },
                          src: _imports_4,
                          alt: "Emitir Recibo"
                        }, null, 4)
                      ], 10, ["onClick", "title"]),
                      createVNode("div", {
                        disabled: !item.btn_cancelar,
                        onClick: ($event) => item.btn_cancelar ? redirectToCancelamento(item) : null,
                        title: "Cancelamento",
                        style: {
                          opacity: item.btn_cancelar ? 1 : 0.5,
                          cursor: item.btn_cancelar ? "pointer" : "not-allowed"
                        }
                      }, [
                        item.excluido ? (openBlock(), createBlock("img", {
                          key: 0,
                          style: { "width": "30px", "height": "30px" },
                          src: _imports_2$1,
                          alt: "Visualizar",
                          title: "Reativar"
                        })) : (openBlock(), createBlock("img", {
                          key: 1,
                          src: _imports_3,
                          alt: "Cancelamento",
                          class: "trash-icon",
                          style: { "width": "30px", "height": "30px" },
                          title: "Excluir"
                        }))
                      ], 12, ["disabled", "onClick"])
                    ]),
                    _: 2
                  }, 1024)
                ]),
                _: 1
              }, 8, ["items"]),
              createVNode(_component_RecebimentoOrdem, {
                show: unref(isModalRecebimentoOpen),
                numero_os: unref(numero_os),
                ordem: unref(selectedOrder),
                onClose: ($event) => isModalRecebimentoOpen.value = false,
                onRefreshValue: ($event) => servicosDataTable()
              }, null, 8, ["show", "numero_os", "ordem", "onClose", "onRefreshValue"]),
              createVNode(_component_CancelamentoOrdem, {
                show: unref(isModalCancelamentoOpen),
                numero_os: unref(numero_os),
                ordemserv_token: unref(ordemserv_token),
                onClose: ($event) => isModalCancelamentoOpen.value = false
              }, null, 8, ["show", "numero_os", "ordemserv_token", "onClose"]),
              createVNode(_component_ModalImprecaoRecibo, {
                show: unref(isModalImprecaoRecibo),
                apresentante_nome: unref(selectedRecibo).apresentante_nome,
                apresentante_cpf: unref(selectedRecibo).apresentante_cpf,
                onClose: ($event) => isModalImprecaoRecibo.value = false
              }, null, 8, ["show", "apresentante_nome", "apresentante_cpf", "onClose"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/os/lista/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : undefined;
};

export { _sfc_main as default };
//# sourceMappingURL=index-B_au_B7b.mjs.map
