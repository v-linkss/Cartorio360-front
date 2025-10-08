import { _ as _sfc_main$1 } from './SaveButton-CahdIl3Y.mjs';
import { createVNode, mergeProps, computed, Fragment, reactive, ref, resolveDirective, withCtx, unref, withDirectives, createTextVNode, toDisplayString, openBlock, createBlock, createCommentVNode, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrGetDirectiveProps, ssrInterpolate } from 'vue/server-renderer';
import { p as propsFactory, o as genericComponent, s as useRender, ax as makeVInputProps, v as omit, K as IconValue, aU as getUid, z as useProxiedModel, aB as filterInputAttrs, aC as VInput, a_ as VLabel, b as useNuxtApp, e as useCookie, f as VTextField, h as VIcon, c as useRuntimeConfig } from './server.mjs';
import { V as VContainer } from './VContainer-CUysD4sO.mjs';
import { V as VRow } from './VRow-Bqz0CuIN.mjs';
import { V as VCol } from './VCol-BT4RzX0Q.mjs';
import { V as VCard, a as VCardText, b as VCardTitle } from './VCard-Dbn6yWsi.mjs';
import { V as VDivider } from './VDivider-BxKHtM2e.mjs';
import { m as makeVSelectionControlProps, V as VSelectionControl, a as makeSelectionControlGroupProps, b as VSelectionControlGroup } from './VSelectionControl-DI6QefPE.mjs';
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
import './VAvatar-CfQAG9re.mjs';
import './VImg-CtUi4yCS.mjs';
import './VResponsive-BwPb2GHE.mjs';

const makeVRadioProps = propsFactory({
  ...makeVSelectionControlProps({
    falseIcon: "$radioOff",
    trueIcon: "$radioOn"
  })
}, "VRadio");
const VRadio = genericComponent()({
  name: "VRadio",
  props: makeVRadioProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    useRender(() => createVNode(VSelectionControl, mergeProps(props, {
      "class": ["v-radio", props.class],
      "style": props.style,
      "type": "radio"
    }), slots));
    return {};
  }
});
const makeVRadioGroupProps = propsFactory({
  height: {
    type: [Number, String],
    default: "auto"
  },
  ...makeVInputProps(),
  ...omit(makeSelectionControlGroupProps(), ["multiple"]),
  trueIcon: {
    type: IconValue,
    default: "$radioOn"
  },
  falseIcon: {
    type: IconValue,
    default: "$radioOff"
  },
  type: {
    type: String,
    default: "radio"
  }
}, "VRadioGroup");
const VRadioGroup = genericComponent()({
  name: "VRadioGroup",
  inheritAttrs: false,
  props: makeVRadioGroupProps(),
  emits: {
    "update:modelValue": (value) => true
  },
  setup(props, _ref) {
    let {
      attrs,
      slots
    } = _ref;
    const uid = getUid();
    const id = computed(() => props.id || `radio-group-${uid}`);
    const model = useProxiedModel(props, "modelValue");
    useRender(() => {
      const [rootAttrs, controlAttrs] = filterInputAttrs(attrs);
      const inputProps = VInput.filterProps(props);
      const controlProps = VSelectionControl.filterProps(props);
      const label = slots.label ? slots.label({
        label: props.label,
        props: {
          for: id.value
        }
      }) : props.label;
      return createVNode(VInput, mergeProps({
        "class": ["v-radio-group", props.class],
        "style": props.style
      }, rootAttrs, inputProps, {
        "modelValue": model.value,
        "onUpdate:modelValue": ($event) => model.value = $event,
        "id": id.value
      }), {
        ...slots,
        default: (_ref2) => {
          let {
            id: id2,
            messagesId,
            isDisabled,
            isReadonly
          } = _ref2;
          return createVNode(Fragment, null, [label && createVNode(VLabel, {
            "id": id2.value
          }, {
            default: () => [label]
          }), createVNode(VSelectionControlGroup, mergeProps(controlProps, {
            "id": id2.value,
            "aria-describedby": messagesId.value,
            "defaultsTarget": "VRadio",
            "trueIcon": props.trueIcon,
            "falseIcon": props.falseIcon,
            "type": props.type,
            "disabled": isDisabled.value,
            "readonly": isReadonly.value,
            "aria-labelledby": label ? id2.value : undefined,
            "multiple": false
          }, controlAttrs, {
            "modelValue": model.value,
            "onUpdate:modelValue": ($event) => model.value = $event
          }), slots)]);
        }
      });
    });
    return {};
  }
});
const _sfc_main = {
  __name: "censec",
  __ssrInlineRender: true,
  setup(__props) {
    const config = useRuntimeConfig();
    const { $toast } = useNuxtApp();
    const integraCensec = `${config.public.auth}/service/gerencia/integra_censec`;
    `${config.public.ws}/censec/enviar`;
    const tokenCookie = useCookie("auth_token");
    const token = tokenCookie.value;
    const state = reactive({
      data_inicio: getCurrentDate(),
      data_fim: getCurrentDate(),
      validar: null,
      file_name: ""
    });
    const dadosCensec = ref(null);
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
    const enviaDadosCensec = async () => {
      console.log("Token:", token);
      if (!state.validar) {
        $toast.warning("Selecione um tipo de valida\xE7\xE3o antes de enviar!");
        return;
      }
      try {
        const response = await fetch(`${integraCensec}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify({
            cartorio_token: useCookie("user-data").value.cartorio_token,
            data_inicio: convertToISODate(state.data_inicio),
            data_fim: convertToISODate(state.data_fim),
            validar: state.validar,
            file_name: state.file_name
          })
        });
        if (!response.ok) {
          throw new Error(`Erro ao gerar dados (HTTP ${response.status})`);
        }
        if (state.validar === "ATOS") {
          const htmlContent = await response.text();
          const newWindow = (void 0).open("", "_blank");
          if (newWindow) {
            newWindow.document.open();
            newWindow.document.write(htmlContent);
            newWindow.document.close();
          } else {
            $toast.warning("N\xE3o foi poss\xEDvel abrir a nova aba (bloqueador de pop-up?).");
          }
        } else {
          if (!state.file_name) {
            $toast.warning("Digite o nome do arquivo!");
            return;
          }
          const blob = await response.blob();
          const contentDisposition = response.headers.get("Content-Disposition");
          const match = contentDisposition && contentDisposition.match(/filename="(.+)"/);
          const fileName = match ? match[1] : `${state.file_name}.json`;
          const url = (void 0).URL.createObjectURL(blob);
          const a = (void 0).createElement("a");
          a.href = url;
          a.download = fileName;
          (void 0).body.appendChild(a);
          a.click();
          a.remove();
          (void 0).URL.revokeObjectURL(url);
          $toast.success("Arquivo baixado com sucesso!");
        }
      } catch (err) {
        console.error(err);
        $toast.error("Erro ao processar a requisi\xE7\xE3o.");
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_SaveButton = _sfc_main$1;
      const _directive_mask = resolveDirective("mask");
      _push(ssrRenderComponent(VContainer, mergeProps({ class: "py-6" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VRow, { class: "mb-5" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VCol, {
                    cols: "12",
                    class: "mx-auto",
                    style: { "max-width": "1200px" }
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<h1 class="text-h4 font-weight-bold"${_scopeId3}>Integra\xE7\xE3o CENSEC</h1>`);
                      } else {
                        return [
                          createVNode("h1", { class: "text-h4 font-weight-bold" }, "Integra\xE7\xE3o CENSEC")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VCol, {
                      cols: "12",
                      class: "mx-auto",
                      style: { "max-width": "1200px" }
                    }, {
                      default: withCtx(() => [
                        createVNode("h1", { class: "text-h4 font-weight-bold" }, "Integra\xE7\xE3o CENSEC")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(VCard, {
              elevation: "2",
              class: "mx-auto",
              "max-width": "1200"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VCardText, { class: "pa-6" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="mb-6"${_scopeId3}><h3 class="text-h6 mb-4"${_scopeId3}>Per\xEDodo de Consulta</h3>`);
                        _push4(ssrRenderComponent(VRow, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VCol, {
                                cols: "12",
                                md: "6"
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(VTextField, mergeProps({
                                      modelValue: unref(state).data_inicio,
                                      "onUpdate:modelValue": ($event) => unref(state).data_inicio = $event,
                                      label: "Data In\xEDcio",
                                      placeholder: "dd/mm/yyyy",
                                      "prepend-inner-icon": "mdi-calendar-start",
                                      variant: "outlined",
                                      density: "comfortable"
                                    }, ssrGetDirectiveProps(_ctx, _directive_mask, "##/##/####")), null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      withDirectives(createVNode(VTextField, {
                                        modelValue: unref(state).data_inicio,
                                        "onUpdate:modelValue": ($event) => unref(state).data_inicio = $event,
                                        label: "Data In\xEDcio",
                                        placeholder: "dd/mm/yyyy",
                                        "prepend-inner-icon": "mdi-calendar-start",
                                        variant: "outlined",
                                        density: "comfortable"
                                      }, null, 8, ["modelValue", "onUpdate:modelValue"]), [
                                        [_directive_mask, "##/##/####"]
                                      ])
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
                                    _push6(ssrRenderComponent(VTextField, mergeProps({
                                      modelValue: unref(state).data_fim,
                                      "onUpdate:modelValue": ($event) => unref(state).data_fim = $event,
                                      label: "Data Fim",
                                      placeholder: "dd/mm/yyyy",
                                      "prepend-inner-icon": "mdi-calendar-end",
                                      variant: "outlined",
                                      density: "comfortable"
                                    }, ssrGetDirectiveProps(_ctx, _directive_mask, "##/##/####")), null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      withDirectives(createVNode(VTextField, {
                                        modelValue: unref(state).data_fim,
                                        "onUpdate:modelValue": ($event) => unref(state).data_fim = $event,
                                        label: "Data Fim",
                                        placeholder: "dd/mm/yyyy",
                                        "prepend-inner-icon": "mdi-calendar-end",
                                        variant: "outlined",
                                        density: "comfortable"
                                      }, null, 8, ["modelValue", "onUpdate:modelValue"]), [
                                        [_directive_mask, "##/##/####"]
                                      ])
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
                                    withDirectives(createVNode(VTextField, {
                                      modelValue: unref(state).data_inicio,
                                      "onUpdate:modelValue": ($event) => unref(state).data_inicio = $event,
                                      label: "Data In\xEDcio",
                                      placeholder: "dd/mm/yyyy",
                                      "prepend-inner-icon": "mdi-calendar-start",
                                      variant: "outlined",
                                      density: "comfortable"
                                    }, null, 8, ["modelValue", "onUpdate:modelValue"]), [
                                      [_directive_mask, "##/##/####"]
                                    ])
                                  ]),
                                  _: 1
                                }),
                                createVNode(VCol, {
                                  cols: "12",
                                  md: "6"
                                }, {
                                  default: withCtx(() => [
                                    withDirectives(createVNode(VTextField, {
                                      modelValue: unref(state).data_fim,
                                      "onUpdate:modelValue": ($event) => unref(state).data_fim = $event,
                                      label: "Data Fim",
                                      placeholder: "dd/mm/yyyy",
                                      "prepend-inner-icon": "mdi-calendar-end",
                                      variant: "outlined",
                                      density: "comfortable"
                                    }, null, 8, ["modelValue", "onUpdate:modelValue"]), [
                                      [_directive_mask, "##/##/####"]
                                    ])
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`</div>`);
                        _push4(ssrRenderComponent(VDivider, { class: "my-6" }, null, _parent4, _scopeId3));
                        _push4(`<div class="mb-6"${_scopeId3}><h3 class="text-h6 mb-4"${_scopeId3}>Tipo de Valida\xE7\xE3o</h3>`);
                        _push4(ssrRenderComponent(VRadioGroup, {
                          modelValue: unref(state).validar,
                          "onUpdate:modelValue": ($event) => unref(state).validar = $event,
                          class: "mt-2"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VRow, null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(VCol, {
                                      cols: "12",
                                      sm: "6",
                                      md: "4",
                                      lg: "2-4"
                                    }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(VRadio, {
                                            label: "VALIDAR ATOS",
                                            value: "ATOS",
                                            color: "primary"
                                          }, null, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(VRadio, {
                                              label: "VALIDAR ATOS",
                                              value: "ATOS",
                                              color: "primary"
                                            })
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(VCol, {
                                      cols: "12",
                                      sm: "6",
                                      md: "4",
                                      lg: "2-4"
                                    }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(VRadio, {
                                            label: "CESDI",
                                            value: "CESDI",
                                            color: "primary"
                                          }, null, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(VRadio, {
                                              label: "CESDI",
                                              value: "CESDI",
                                              color: "primary"
                                            })
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(VCol, {
                                      cols: "12",
                                      sm: "6",
                                      md: "4",
                                      lg: "2-4"
                                    }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(VRadio, {
                                            label: "CEP",
                                            value: "CEP",
                                            color: "primary"
                                          }, null, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(VRadio, {
                                              label: "CEP",
                                              value: "CEP",
                                              color: "primary"
                                            })
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(VCol, {
                                      cols: "12",
                                      sm: "6",
                                      md: "4",
                                      lg: "2-4"
                                    }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(VRadio, {
                                            label: "RCTO",
                                            value: "RCTO",
                                            color: "primary"
                                          }, null, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(VRadio, {
                                              label: "RCTO",
                                              value: "RCTO",
                                              color: "primary"
                                            })
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(VCol, {
                                      cols: "12",
                                      sm: "6",
                                      md: "4",
                                      lg: "2-4"
                                    }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(VRadio, {
                                            label: "CCN",
                                            value: "CCN",
                                            color: "primary"
                                          }, null, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(VRadio, {
                                              label: "CCN",
                                              value: "CCN",
                                              color: "primary"
                                            })
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(VCol, {
                                        cols: "12",
                                        sm: "6",
                                        md: "4",
                                        lg: "2-4"
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(VRadio, {
                                            label: "VALIDAR ATOS",
                                            value: "ATOS",
                                            color: "primary"
                                          })
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(VCol, {
                                        cols: "12",
                                        sm: "6",
                                        md: "4",
                                        lg: "2-4"
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(VRadio, {
                                            label: "CESDI",
                                            value: "CESDI",
                                            color: "primary"
                                          })
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(VCol, {
                                        cols: "12",
                                        sm: "6",
                                        md: "4",
                                        lg: "2-4"
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(VRadio, {
                                            label: "CEP",
                                            value: "CEP",
                                            color: "primary"
                                          })
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(VCol, {
                                        cols: "12",
                                        sm: "6",
                                        md: "4",
                                        lg: "2-4"
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(VRadio, {
                                            label: "RCTO",
                                            value: "RCTO",
                                            color: "primary"
                                          })
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(VCol, {
                                        cols: "12",
                                        sm: "6",
                                        md: "4",
                                        lg: "2-4"
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(VRadio, {
                                            label: "CCN",
                                            value: "CCN",
                                            color: "primary"
                                          })
                                        ]),
                                        _: 1
                                      })
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(VRow, null, {
                                  default: withCtx(() => [
                                    createVNode(VCol, {
                                      cols: "12",
                                      sm: "6",
                                      md: "4",
                                      lg: "2-4"
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(VRadio, {
                                          label: "VALIDAR ATOS",
                                          value: "ATOS",
                                          color: "primary"
                                        })
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(VCol, {
                                      cols: "12",
                                      sm: "6",
                                      md: "4",
                                      lg: "2-4"
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(VRadio, {
                                          label: "CESDI",
                                          value: "CESDI",
                                          color: "primary"
                                        })
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(VCol, {
                                      cols: "12",
                                      sm: "6",
                                      md: "4",
                                      lg: "2-4"
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(VRadio, {
                                          label: "CEP",
                                          value: "CEP",
                                          color: "primary"
                                        })
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(VCol, {
                                      cols: "12",
                                      sm: "6",
                                      md: "4",
                                      lg: "2-4"
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(VRadio, {
                                          label: "RCTO",
                                          value: "RCTO",
                                          color: "primary"
                                        })
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(VCol, {
                                      cols: "12",
                                      sm: "6",
                                      md: "4",
                                      lg: "2-4"
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(VRadio, {
                                          label: "CCN",
                                          value: "CCN",
                                          color: "primary"
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
                        }, _parent4, _scopeId3));
                        _push4(`</div>`);
                        _push4(ssrRenderComponent(VDivider, { class: "my-6" }, null, _parent4, _scopeId3));
                        _push4(`<div class="mb-4"${_scopeId3}><h3 class="text-h6 mb-4"${_scopeId3}>Arquivo</h3>`);
                        _push4(ssrRenderComponent(VRow, { align: "center" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VCol, {
                                cols: "12",
                                md: "8"
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(VTextField, {
                                      label: "Nome do arquivo",
                                      modelValue: unref(state).file_name,
                                      "onUpdate:modelValue": ($event) => unref(state).file_name = $event,
                                      disabled: !unref(state).validar || unref(state).validar === "ATOS",
                                      "prepend-inner-icon": "mdi-file-document-outline",
                                      variant: "outlined",
                                      density: "comfortable",
                                      hint: "Selecione um tipo de valida\xE7\xE3o primeiro",
                                      "persistent-hint": ""
                                    }, null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(VTextField, {
                                        label: "Nome do arquivo",
                                        modelValue: unref(state).file_name,
                                        "onUpdate:modelValue": ($event) => unref(state).file_name = $event,
                                        disabled: !unref(state).validar || unref(state).validar === "ATOS",
                                        "prepend-inner-icon": "mdi-file-document-outline",
                                        variant: "outlined",
                                        density: "comfortable",
                                        hint: "Selecione um tipo de valida\xE7\xE3o primeiro",
                                        "persistent-hint": ""
                                      }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"])
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(VCol, {
                                cols: "12",
                                md: "4",
                                class: "d-flex justify-end"
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_SaveButton, {
                                      text: "Enviar",
                                      onSave: enviaDadosCensec,
                                      class: "px-8"
                                    }, null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(_component_SaveButton, {
                                        text: "Enviar",
                                        onSave: enviaDadosCensec,
                                        class: "px-8"
                                      })
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(VCol, {
                                  cols: "12",
                                  md: "8"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(VTextField, {
                                      label: "Nome do arquivo",
                                      modelValue: unref(state).file_name,
                                      "onUpdate:modelValue": ($event) => unref(state).file_name = $event,
                                      disabled: !unref(state).validar || unref(state).validar === "ATOS",
                                      "prepend-inner-icon": "mdi-file-document-outline",
                                      variant: "outlined",
                                      density: "comfortable",
                                      hint: "Selecione um tipo de valida\xE7\xE3o primeiro",
                                      "persistent-hint": ""
                                    }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"])
                                  ]),
                                  _: 1
                                }),
                                createVNode(VCol, {
                                  cols: "12",
                                  md: "4",
                                  class: "d-flex justify-end"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(_component_SaveButton, {
                                      text: "Enviar",
                                      onSave: enviaDadosCensec,
                                      class: "px-8"
                                    })
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`</div>`);
                      } else {
                        return [
                          createVNode("div", { class: "mb-6" }, [
                            createVNode("h3", { class: "text-h6 mb-4" }, "Per\xEDodo de Consulta"),
                            createVNode(VRow, null, {
                              default: withCtx(() => [
                                createVNode(VCol, {
                                  cols: "12",
                                  md: "6"
                                }, {
                                  default: withCtx(() => [
                                    withDirectives(createVNode(VTextField, {
                                      modelValue: unref(state).data_inicio,
                                      "onUpdate:modelValue": ($event) => unref(state).data_inicio = $event,
                                      label: "Data In\xEDcio",
                                      placeholder: "dd/mm/yyyy",
                                      "prepend-inner-icon": "mdi-calendar-start",
                                      variant: "outlined",
                                      density: "comfortable"
                                    }, null, 8, ["modelValue", "onUpdate:modelValue"]), [
                                      [_directive_mask, "##/##/####"]
                                    ])
                                  ]),
                                  _: 1
                                }),
                                createVNode(VCol, {
                                  cols: "12",
                                  md: "6"
                                }, {
                                  default: withCtx(() => [
                                    withDirectives(createVNode(VTextField, {
                                      modelValue: unref(state).data_fim,
                                      "onUpdate:modelValue": ($event) => unref(state).data_fim = $event,
                                      label: "Data Fim",
                                      placeholder: "dd/mm/yyyy",
                                      "prepend-inner-icon": "mdi-calendar-end",
                                      variant: "outlined",
                                      density: "comfortable"
                                    }, null, 8, ["modelValue", "onUpdate:modelValue"]), [
                                      [_directive_mask, "##/##/####"]
                                    ])
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            })
                          ]),
                          createVNode(VDivider, { class: "my-6" }),
                          createVNode("div", { class: "mb-6" }, [
                            createVNode("h3", { class: "text-h6 mb-4" }, "Tipo de Valida\xE7\xE3o"),
                            createVNode(VRadioGroup, {
                              modelValue: unref(state).validar,
                              "onUpdate:modelValue": ($event) => unref(state).validar = $event,
                              class: "mt-2"
                            }, {
                              default: withCtx(() => [
                                createVNode(VRow, null, {
                                  default: withCtx(() => [
                                    createVNode(VCol, {
                                      cols: "12",
                                      sm: "6",
                                      md: "4",
                                      lg: "2-4"
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(VRadio, {
                                          label: "VALIDAR ATOS",
                                          value: "ATOS",
                                          color: "primary"
                                        })
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(VCol, {
                                      cols: "12",
                                      sm: "6",
                                      md: "4",
                                      lg: "2-4"
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(VRadio, {
                                          label: "CESDI",
                                          value: "CESDI",
                                          color: "primary"
                                        })
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(VCol, {
                                      cols: "12",
                                      sm: "6",
                                      md: "4",
                                      lg: "2-4"
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(VRadio, {
                                          label: "CEP",
                                          value: "CEP",
                                          color: "primary"
                                        })
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(VCol, {
                                      cols: "12",
                                      sm: "6",
                                      md: "4",
                                      lg: "2-4"
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(VRadio, {
                                          label: "RCTO",
                                          value: "RCTO",
                                          color: "primary"
                                        })
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(VCol, {
                                      cols: "12",
                                      sm: "6",
                                      md: "4",
                                      lg: "2-4"
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(VRadio, {
                                          label: "CCN",
                                          value: "CCN",
                                          color: "primary"
                                        })
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          createVNode(VDivider, { class: "my-6" }),
                          createVNode("div", { class: "mb-4" }, [
                            createVNode("h3", { class: "text-h6 mb-4" }, "Arquivo"),
                            createVNode(VRow, { align: "center" }, {
                              default: withCtx(() => [
                                createVNode(VCol, {
                                  cols: "12",
                                  md: "8"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(VTextField, {
                                      label: "Nome do arquivo",
                                      modelValue: unref(state).file_name,
                                      "onUpdate:modelValue": ($event) => unref(state).file_name = $event,
                                      disabled: !unref(state).validar || unref(state).validar === "ATOS",
                                      "prepend-inner-icon": "mdi-file-document-outline",
                                      variant: "outlined",
                                      density: "comfortable",
                                      hint: "Selecione um tipo de valida\xE7\xE3o primeiro",
                                      "persistent-hint": ""
                                    }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"])
                                  ]),
                                  _: 1
                                }),
                                createVNode(VCol, {
                                  cols: "12",
                                  md: "4",
                                  class: "d-flex justify-end"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(_component_SaveButton, {
                                      text: "Enviar",
                                      onSave: enviaDadosCensec,
                                      class: "px-8"
                                    })
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            })
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VCardText, { class: "pa-6" }, {
                      default: withCtx(() => [
                        createVNode("div", { class: "mb-6" }, [
                          createVNode("h3", { class: "text-h6 mb-4" }, "Per\xEDodo de Consulta"),
                          createVNode(VRow, null, {
                            default: withCtx(() => [
                              createVNode(VCol, {
                                cols: "12",
                                md: "6"
                              }, {
                                default: withCtx(() => [
                                  withDirectives(createVNode(VTextField, {
                                    modelValue: unref(state).data_inicio,
                                    "onUpdate:modelValue": ($event) => unref(state).data_inicio = $event,
                                    label: "Data In\xEDcio",
                                    placeholder: "dd/mm/yyyy",
                                    "prepend-inner-icon": "mdi-calendar-start",
                                    variant: "outlined",
                                    density: "comfortable"
                                  }, null, 8, ["modelValue", "onUpdate:modelValue"]), [
                                    [_directive_mask, "##/##/####"]
                                  ])
                                ]),
                                _: 1
                              }),
                              createVNode(VCol, {
                                cols: "12",
                                md: "6"
                              }, {
                                default: withCtx(() => [
                                  withDirectives(createVNode(VTextField, {
                                    modelValue: unref(state).data_fim,
                                    "onUpdate:modelValue": ($event) => unref(state).data_fim = $event,
                                    label: "Data Fim",
                                    placeholder: "dd/mm/yyyy",
                                    "prepend-inner-icon": "mdi-calendar-end",
                                    variant: "outlined",
                                    density: "comfortable"
                                  }, null, 8, ["modelValue", "onUpdate:modelValue"]), [
                                    [_directive_mask, "##/##/####"]
                                  ])
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          })
                        ]),
                        createVNode(VDivider, { class: "my-6" }),
                        createVNode("div", { class: "mb-6" }, [
                          createVNode("h3", { class: "text-h6 mb-4" }, "Tipo de Valida\xE7\xE3o"),
                          createVNode(VRadioGroup, {
                            modelValue: unref(state).validar,
                            "onUpdate:modelValue": ($event) => unref(state).validar = $event,
                            class: "mt-2"
                          }, {
                            default: withCtx(() => [
                              createVNode(VRow, null, {
                                default: withCtx(() => [
                                  createVNode(VCol, {
                                    cols: "12",
                                    sm: "6",
                                    md: "4",
                                    lg: "2-4"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(VRadio, {
                                        label: "VALIDAR ATOS",
                                        value: "ATOS",
                                        color: "primary"
                                      })
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(VCol, {
                                    cols: "12",
                                    sm: "6",
                                    md: "4",
                                    lg: "2-4"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(VRadio, {
                                        label: "CESDI",
                                        value: "CESDI",
                                        color: "primary"
                                      })
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(VCol, {
                                    cols: "12",
                                    sm: "6",
                                    md: "4",
                                    lg: "2-4"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(VRadio, {
                                        label: "CEP",
                                        value: "CEP",
                                        color: "primary"
                                      })
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(VCol, {
                                    cols: "12",
                                    sm: "6",
                                    md: "4",
                                    lg: "2-4"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(VRadio, {
                                        label: "RCTO",
                                        value: "RCTO",
                                        color: "primary"
                                      })
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(VCol, {
                                    cols: "12",
                                    sm: "6",
                                    md: "4",
                                    lg: "2-4"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(VRadio, {
                                        label: "CCN",
                                        value: "CCN",
                                        color: "primary"
                                      })
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        createVNode(VDivider, { class: "my-6" }),
                        createVNode("div", { class: "mb-4" }, [
                          createVNode("h3", { class: "text-h6 mb-4" }, "Arquivo"),
                          createVNode(VRow, { align: "center" }, {
                            default: withCtx(() => [
                              createVNode(VCol, {
                                cols: "12",
                                md: "8"
                              }, {
                                default: withCtx(() => [
                                  createVNode(VTextField, {
                                    label: "Nome do arquivo",
                                    modelValue: unref(state).file_name,
                                    "onUpdate:modelValue": ($event) => unref(state).file_name = $event,
                                    disabled: !unref(state).validar || unref(state).validar === "ATOS",
                                    "prepend-inner-icon": "mdi-file-document-outline",
                                    variant: "outlined",
                                    density: "comfortable",
                                    hint: "Selecione um tipo de valida\xE7\xE3o primeiro",
                                    "persistent-hint": ""
                                  }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"])
                                ]),
                                _: 1
                              }),
                              createVNode(VCol, {
                                cols: "12",
                                md: "4",
                                class: "d-flex justify-end"
                              }, {
                                default: withCtx(() => [
                                  createVNode(_component_SaveButton, {
                                    text: "Enviar",
                                    onSave: enviaDadosCensec,
                                    class: "px-8"
                                  })
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
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
            if (unref(dadosCensec)) {
              _push2(ssrRenderComponent(VCard, {
                elevation: "2",
                class: "mx-auto mt-6",
                "max-width": "1200"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(VCardTitle, { class: "bg-success text-white pa-4" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(VIcon, { class: "mr-2" }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`mdi-check-circle`);
                              } else {
                                return [
                                  createTextVNode("mdi-check-circle")
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                          _push4(` Dados CENSEC Retornados `);
                        } else {
                          return [
                            createVNode(VIcon, { class: "mr-2" }, {
                              default: withCtx(() => [
                                createTextVNode("mdi-check-circle")
                              ]),
                              _: 1
                            }),
                            createTextVNode(" Dados CENSEC Retornados ")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(VCardText, { class: "pa-6" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<pre class="bg-grey-lighten-4 pa-4 rounded"${_scopeId3}>${ssrInterpolate(JSON.stringify(unref(dadosCensec), null, 2))}</pre>`);
                        } else {
                          return [
                            createVNode("pre", { class: "bg-grey-lighten-4 pa-4 rounded" }, toDisplayString(JSON.stringify(unref(dadosCensec), null, 2)), 1)
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(VCardTitle, { class: "bg-success text-white pa-4" }, {
                        default: withCtx(() => [
                          createVNode(VIcon, { class: "mr-2" }, {
                            default: withCtx(() => [
                              createTextVNode("mdi-check-circle")
                            ]),
                            _: 1
                          }),
                          createTextVNode(" Dados CENSEC Retornados ")
                        ]),
                        _: 1
                      }),
                      createVNode(VCardText, { class: "pa-6" }, {
                        default: withCtx(() => [
                          createVNode("pre", { class: "bg-grey-lighten-4 pa-4 rounded" }, toDisplayString(JSON.stringify(unref(dadosCensec), null, 2)), 1)
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
          } else {
            return [
              createVNode(VRow, { class: "mb-5" }, {
                default: withCtx(() => [
                  createVNode(VCol, {
                    cols: "12",
                    class: "mx-auto",
                    style: { "max-width": "1200px" }
                  }, {
                    default: withCtx(() => [
                      createVNode("h1", { class: "text-h4 font-weight-bold" }, "Integra\xE7\xE3o CENSEC")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(VCard, {
                elevation: "2",
                class: "mx-auto",
                "max-width": "1200"
              }, {
                default: withCtx(() => [
                  createVNode(VCardText, { class: "pa-6" }, {
                    default: withCtx(() => [
                      createVNode("div", { class: "mb-6" }, [
                        createVNode("h3", { class: "text-h6 mb-4" }, "Per\xEDodo de Consulta"),
                        createVNode(VRow, null, {
                          default: withCtx(() => [
                            createVNode(VCol, {
                              cols: "12",
                              md: "6"
                            }, {
                              default: withCtx(() => [
                                withDirectives(createVNode(VTextField, {
                                  modelValue: unref(state).data_inicio,
                                  "onUpdate:modelValue": ($event) => unref(state).data_inicio = $event,
                                  label: "Data In\xEDcio",
                                  placeholder: "dd/mm/yyyy",
                                  "prepend-inner-icon": "mdi-calendar-start",
                                  variant: "outlined",
                                  density: "comfortable"
                                }, null, 8, ["modelValue", "onUpdate:modelValue"]), [
                                  [_directive_mask, "##/##/####"]
                                ])
                              ]),
                              _: 1
                            }),
                            createVNode(VCol, {
                              cols: "12",
                              md: "6"
                            }, {
                              default: withCtx(() => [
                                withDirectives(createVNode(VTextField, {
                                  modelValue: unref(state).data_fim,
                                  "onUpdate:modelValue": ($event) => unref(state).data_fim = $event,
                                  label: "Data Fim",
                                  placeholder: "dd/mm/yyyy",
                                  "prepend-inner-icon": "mdi-calendar-end",
                                  variant: "outlined",
                                  density: "comfortable"
                                }, null, 8, ["modelValue", "onUpdate:modelValue"]), [
                                  [_directive_mask, "##/##/####"]
                                ])
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        })
                      ]),
                      createVNode(VDivider, { class: "my-6" }),
                      createVNode("div", { class: "mb-6" }, [
                        createVNode("h3", { class: "text-h6 mb-4" }, "Tipo de Valida\xE7\xE3o"),
                        createVNode(VRadioGroup, {
                          modelValue: unref(state).validar,
                          "onUpdate:modelValue": ($event) => unref(state).validar = $event,
                          class: "mt-2"
                        }, {
                          default: withCtx(() => [
                            createVNode(VRow, null, {
                              default: withCtx(() => [
                                createVNode(VCol, {
                                  cols: "12",
                                  sm: "6",
                                  md: "4",
                                  lg: "2-4"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(VRadio, {
                                      label: "VALIDAR ATOS",
                                      value: "ATOS",
                                      color: "primary"
                                    })
                                  ]),
                                  _: 1
                                }),
                                createVNode(VCol, {
                                  cols: "12",
                                  sm: "6",
                                  md: "4",
                                  lg: "2-4"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(VRadio, {
                                      label: "CESDI",
                                      value: "CESDI",
                                      color: "primary"
                                    })
                                  ]),
                                  _: 1
                                }),
                                createVNode(VCol, {
                                  cols: "12",
                                  sm: "6",
                                  md: "4",
                                  lg: "2-4"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(VRadio, {
                                      label: "CEP",
                                      value: "CEP",
                                      color: "primary"
                                    })
                                  ]),
                                  _: 1
                                }),
                                createVNode(VCol, {
                                  cols: "12",
                                  sm: "6",
                                  md: "4",
                                  lg: "2-4"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(VRadio, {
                                      label: "RCTO",
                                      value: "RCTO",
                                      color: "primary"
                                    })
                                  ]),
                                  _: 1
                                }),
                                createVNode(VCol, {
                                  cols: "12",
                                  sm: "6",
                                  md: "4",
                                  lg: "2-4"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(VRadio, {
                                      label: "CCN",
                                      value: "CCN",
                                      color: "primary"
                                    })
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      createVNode(VDivider, { class: "my-6" }),
                      createVNode("div", { class: "mb-4" }, [
                        createVNode("h3", { class: "text-h6 mb-4" }, "Arquivo"),
                        createVNode(VRow, { align: "center" }, {
                          default: withCtx(() => [
                            createVNode(VCol, {
                              cols: "12",
                              md: "8"
                            }, {
                              default: withCtx(() => [
                                createVNode(VTextField, {
                                  label: "Nome do arquivo",
                                  modelValue: unref(state).file_name,
                                  "onUpdate:modelValue": ($event) => unref(state).file_name = $event,
                                  disabled: !unref(state).validar || unref(state).validar === "ATOS",
                                  "prepend-inner-icon": "mdi-file-document-outline",
                                  variant: "outlined",
                                  density: "comfortable",
                                  hint: "Selecione um tipo de valida\xE7\xE3o primeiro",
                                  "persistent-hint": ""
                                }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"])
                              ]),
                              _: 1
                            }),
                            createVNode(VCol, {
                              cols: "12",
                              md: "4",
                              class: "d-flex justify-end"
                            }, {
                              default: withCtx(() => [
                                createVNode(_component_SaveButton, {
                                  text: "Enviar",
                                  onSave: enviaDadosCensec,
                                  class: "px-8"
                                })
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        })
                      ])
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              unref(dadosCensec) ? (openBlock(), createBlock(VCard, {
                key: 0,
                elevation: "2",
                class: "mx-auto mt-6",
                "max-width": "1200"
              }, {
                default: withCtx(() => [
                  createVNode(VCardTitle, { class: "bg-success text-white pa-4" }, {
                    default: withCtx(() => [
                      createVNode(VIcon, { class: "mr-2" }, {
                        default: withCtx(() => [
                          createTextVNode("mdi-check-circle")
                        ]),
                        _: 1
                      }),
                      createTextVNode(" Dados CENSEC Retornados ")
                    ]),
                    _: 1
                  }),
                  createVNode(VCardText, { class: "pa-6" }, {
                    default: withCtx(() => [
                      createVNode("pre", { class: "bg-grey-lighten-4 pa-4 rounded" }, toDisplayString(JSON.stringify(unref(dadosCensec), null, 2)), 1)
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              })) : createCommentVNode("", true)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/integracao/censec.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : undefined;
};

export { _sfc_main as default };
//# sourceMappingURL=censec-BtV3mxdl.mjs.map
