import { _ as _sfc_main$1 } from './SaveButton-CahdIl3Y.mjs';
import { createVNode, mergeProps, computed, Fragment, reactive, ref, resolveDirective, withCtx, unref, withDirectives, createTextVNode, openBlock, createBlock, toDisplayString, createCommentVNode, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrGetDirectiveProps, ssrInterpolate } from 'vue/server-renderer';
import { p as propsFactory, o as genericComponent, s as useRender, ax as makeVInputProps, v as omit, K as IconValue, aU as getUid, z as useProxiedModel, aB as filterInputAttrs, aC as VInput, a_ as VLabel, b as useNuxtApp, e as useCookie, f as VTextField, h as VIcon, c as useRuntimeConfig } from './server.mjs';
import { V as VContainer } from './VContainer-CUysD4sO.mjs';
import { V as VRow } from './VRow-Bqz0CuIN.mjs';
import { V as VCol } from './VCol-BT4RzX0Q.mjs';
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
      data_inicial: getCurrentDate(),
      data_final: getCurrentDate(),
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
      if (!state.validar) {
        $toast.warning("Selecione um tipo de valida\xE7\xE3o antes de enviar!");
        return;
      }
      try {
        const response = await fetch(`${integraCensec}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            cartorio_token: useCookie("user-data").value.cartorio_token,
            data_inicial: convertToISODate(state.data_inicial),
            data_final: convertToISODate(state.data_final),
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
            $toast.warning(
              "N\xE3o foi poss\xEDvel abrir a nova aba (bloqueador de pop-up?)."
            );
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
      _push(ssrRenderComponent(VContainer, mergeProps({ class: "mt-5" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VRow, { class: "mb-10" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<h1${_scopeId2}>Integra\xE7\xE3o CENSEC</h1>`);
                } else {
                  return [
                    createVNode("h1", null, "Integra\xE7\xE3o CENSEC")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<div${_scopeId}><div class="mb-6"${_scopeId}><h3 class="text-h6 mb-2"${_scopeId}>Per\xEDodo de Consulta</h3>`);
            _push2(ssrRenderComponent(VRow, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VCol, {
                    cols: "12",
                    md: "2"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VTextField, mergeProps({
                          modelValue: unref(state).data_inicial,
                          "onUpdate:modelValue": ($event) => unref(state).data_inicial = $event,
                          label: "Data Inicio",
                          placeholder: "dd/mm/yyyy"
                        }, ssrGetDirectiveProps(_ctx, _directive_mask, "##/##/####")), null, _parent4, _scopeId3));
                      } else {
                        return [
                          withDirectives(createVNode(VTextField, {
                            modelValue: unref(state).data_inicial,
                            "onUpdate:modelValue": ($event) => unref(state).data_inicial = $event,
                            label: "Data Inicio",
                            placeholder: "dd/mm/yyyy"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"]), [
                            [_directive_mask, "##/##/####"]
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VCol, {
                    cols: "12",
                    md: "2"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VTextField, mergeProps({
                          modelValue: unref(state).data_final,
                          "onUpdate:modelValue": ($event) => unref(state).data_final = $event,
                          label: "Data Fim",
                          placeholder: "dd/mm/yyyy"
                        }, ssrGetDirectiveProps(_ctx, _directive_mask, "##/##/####")), null, _parent4, _scopeId3));
                      } else {
                        return [
                          withDirectives(createVNode(VTextField, {
                            modelValue: unref(state).data_final,
                            "onUpdate:modelValue": ($event) => unref(state).data_final = $event,
                            label: "Data Fim",
                            placeholder: "dd/mm/yyyy"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"]), [
                            [_directive_mask, "##/##/####"]
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VCol, {
                      cols: "12",
                      md: "2"
                    }, {
                      default: withCtx(() => [
                        withDirectives(createVNode(VTextField, {
                          modelValue: unref(state).data_inicial,
                          "onUpdate:modelValue": ($event) => unref(state).data_inicial = $event,
                          label: "Data Inicio",
                          placeholder: "dd/mm/yyyy"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]), [
                          [_directive_mask, "##/##/####"]
                        ])
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, {
                      cols: "12",
                      md: "2"
                    }, {
                      default: withCtx(() => [
                        withDirectives(createVNode(VTextField, {
                          modelValue: unref(state).data_final,
                          "onUpdate:modelValue": ($event) => unref(state).data_final = $event,
                          label: "Data Fim",
                          placeholder: "dd/mm/yyyy"
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
            }, _parent2, _scopeId));
            _push2(`</div>`);
            _push2(ssrRenderComponent(VDivider, { class: "my-6" }, null, _parent2, _scopeId));
            _push2(`<div class="mb-6"${_scopeId}>`);
            _push2(ssrRenderComponent(VRow, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VCol, {
                    cols: "12",
                    sm: "6",
                    md: "4"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VCol, {
                    cols: "12",
                    sm: "6",
                    md: "4"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<h3 class="text-h6 mb-4"${_scopeId3}>Gerar Arquivo</h3>`);
                      } else {
                        return [
                          createVNode("h3", { class: "text-h6 mb-4" }, "Gerar Arquivo")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VCol, {
                      cols: "12",
                      sm: "6",
                      md: "4"
                    }),
                    createVNode(VCol, {
                      cols: "12",
                      sm: "6",
                      md: "4"
                    }, {
                      default: withCtx(() => [
                        createVNode("h3", { class: "text-h6 mb-4" }, "Gerar Arquivo")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(VRadioGroup, {
              modelValue: unref(state).validar,
              "onUpdate:modelValue": ($event) => unref(state).validar = $event,
              class: "mt-2"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VRow, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VCol, {
                          cols: "12",
                          sm: "6",
                          md: "4",
                          lg: "2-4"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VRadio, {
                                label: "VALIDAR ATOS",
                                value: "ATOS",
                                color: "primary"
                              }, null, _parent5, _scopeId4));
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
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VCol, {
                          cols: "12",
                          sm: "6",
                          md: "4",
                          lg: "2-4"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VRadio, {
                                label: "CESDI",
                                value: "CESDI",
                                color: "primary"
                              }, null, _parent5, _scopeId4));
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
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VCol, {
                          cols: "12",
                          sm: "6",
                          md: "4",
                          lg: "2-4"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VRadio, {
                                label: "CEP",
                                value: "CEP",
                                color: "primary"
                              }, null, _parent5, _scopeId4));
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
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VCol, {
                          cols: "12",
                          sm: "6",
                          md: "4",
                          lg: "2-4"
                        }, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VCol, {
                          cols: "12",
                          sm: "6",
                          md: "4",
                          lg: "2-4"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VRadio, {
                                label: "RCTO",
                                value: "RCTO",
                                color: "primary"
                              }, null, _parent5, _scopeId4));
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
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VCol, {
                          cols: "12",
                          sm: "6",
                          md: "4",
                          lg: "2-4"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VRadio, {
                                label: "CCN",
                                value: "CCN",
                                color: "primary"
                              }, null, _parent5, _scopeId4));
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
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VCol, {
                          cols: "12",
                          sm: "6",
                          md: "4",
                          lg: "2-4"
                        }, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VCol, {
                          cols: "12",
                          sm: "6",
                          md: "4",
                          lg: "2-4"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VRadio, {
                                label: "CTP",
                                value: "CTP",
                                color: "primary"
                              }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(VRadio, {
                                  label: "CTP",
                                  value: "CTP",
                                  color: "primary"
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
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
                          }),
                          createVNode(VCol, {
                            cols: "12",
                            sm: "6",
                            md: "4",
                            lg: "2-4"
                          }),
                          createVNode(VCol, {
                            cols: "12",
                            sm: "6",
                            md: "4",
                            lg: "2-4"
                          }, {
                            default: withCtx(() => [
                              createVNode(VRadio, {
                                label: "CTP",
                                value: "CTP",
                                color: "primary"
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
                        }),
                        createVNode(VCol, {
                          cols: "12",
                          sm: "6",
                          md: "4",
                          lg: "2-4"
                        }),
                        createVNode(VCol, {
                          cols: "12",
                          sm: "6",
                          md: "4",
                          lg: "2-4"
                        }, {
                          default: withCtx(() => [
                            createVNode(VRadio, {
                              label: "CTP",
                              value: "CTP",
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
            }, _parent2, _scopeId));
            _push2(`</div>`);
            _push2(ssrRenderComponent(VDivider, { class: "my-6" }, null, _parent2, _scopeId));
            _push2(`<div class="mb-4"${_scopeId}><h3 class="text-h6 mb-4"${_scopeId}>Arquivo</h3>`);
            _push2(ssrRenderComponent(VRow, { align: "center" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VCol, {
                    cols: "12",
                    md: "8"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VTextField, {
                          label: "Nome do arquivo",
                          modelValue: unref(state).file_name,
                          "onUpdate:modelValue": ($event) => unref(state).file_name = $event,
                          disabled: !unref(state).validar || unref(state).validar === "ATOS"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VTextField, {
                            label: "Nome do arquivo",
                            modelValue: unref(state).file_name,
                            "onUpdate:modelValue": ($event) => unref(state).file_name = $event,
                            disabled: !unref(state).validar || unref(state).validar === "ATOS"
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VCol, {
                    cols: "12",
                    md: "4",
                    class: "d-flex justify-end"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_SaveButton, {
                          text: "Enviar",
                          onSave: enviaDadosCensec,
                          class: "px-8"
                        }, null, _parent4, _scopeId3));
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
                  }, _parent3, _scopeId2));
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
                          disabled: !unref(state).validar || unref(state).validar === "ATOS"
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
            }, _parent2, _scopeId));
            _push2(`</div></div>`);
            if (unref(dadosCensec)) {
              _push2(`<div class="mt-6"${_scopeId}><div class="bg-success text-white pa-4 mb-4 rounded"${_scopeId}>`);
              _push2(ssrRenderComponent(VIcon, { class: "mr-2" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`mdi-check-circle`);
                  } else {
                    return [
                      createTextVNode("mdi-check-circle")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(` Dados CENSEC Retornados </div><div class="bg-grey-lighten-4 pa-4 rounded"${_scopeId}><pre${_scopeId}>${ssrInterpolate(JSON.stringify(unref(dadosCensec), null, 2))}</pre></div></div>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode(VRow, { class: "mb-10" }, {
                default: withCtx(() => [
                  createVNode("h1", null, "Integra\xE7\xE3o CENSEC")
                ]),
                _: 1
              }),
              createVNode("div", null, [
                createVNode("div", { class: "mb-6" }, [
                  createVNode("h3", { class: "text-h6 mb-2" }, "Per\xEDodo de Consulta"),
                  createVNode(VRow, null, {
                    default: withCtx(() => [
                      createVNode(VCol, {
                        cols: "12",
                        md: "2"
                      }, {
                        default: withCtx(() => [
                          withDirectives(createVNode(VTextField, {
                            modelValue: unref(state).data_inicial,
                            "onUpdate:modelValue": ($event) => unref(state).data_inicial = $event,
                            label: "Data Inicio",
                            placeholder: "dd/mm/yyyy"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"]), [
                            [_directive_mask, "##/##/####"]
                          ])
                        ]),
                        _: 1
                      }),
                      createVNode(VCol, {
                        cols: "12",
                        md: "2"
                      }, {
                        default: withCtx(() => [
                          withDirectives(createVNode(VTextField, {
                            modelValue: unref(state).data_final,
                            "onUpdate:modelValue": ($event) => unref(state).data_final = $event,
                            label: "Data Fim",
                            placeholder: "dd/mm/yyyy"
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
                  createVNode(VRow, null, {
                    default: withCtx(() => [
                      createVNode(VCol, {
                        cols: "12",
                        sm: "6",
                        md: "4"
                      }),
                      createVNode(VCol, {
                        cols: "12",
                        sm: "6",
                        md: "4"
                      }, {
                        default: withCtx(() => [
                          createVNode("h3", { class: "text-h6 mb-4" }, "Gerar Arquivo")
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
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
                          }),
                          createVNode(VCol, {
                            cols: "12",
                            sm: "6",
                            md: "4",
                            lg: "2-4"
                          }),
                          createVNode(VCol, {
                            cols: "12",
                            sm: "6",
                            md: "4",
                            lg: "2-4"
                          }, {
                            default: withCtx(() => [
                              createVNode(VRadio, {
                                label: "CTP",
                                value: "CTP",
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
                            disabled: !unref(state).validar || unref(state).validar === "ATOS"
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
              unref(dadosCensec) ? (openBlock(), createBlock("div", {
                key: 0,
                class: "mt-6"
              }, [
                createVNode("div", { class: "bg-success text-white pa-4 mb-4 rounded" }, [
                  createVNode(VIcon, { class: "mr-2" }, {
                    default: withCtx(() => [
                      createTextVNode("mdi-check-circle")
                    ]),
                    _: 1
                  }),
                  createTextVNode(" Dados CENSEC Retornados ")
                ]),
                createVNode("div", { class: "bg-grey-lighten-4 pa-4 rounded" }, [
                  createVNode("pre", null, toDisplayString(JSON.stringify(unref(dadosCensec), null, 2)), 1)
                ])
              ])) : createCommentVNode("", true)
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
<<<<<<<< HEAD:.output/server/chunks/build/censec-EtHEYUMs.mjs
//# sourceMappingURL=censec-EtHEYUMs.mjs.map
========
//# sourceMappingURL=censec-DA4-0niE.mjs.map
>>>>>>>> lavratura-cancela-um-selo:.output/server/chunks/build/censec-DA4-0niE.mjs
