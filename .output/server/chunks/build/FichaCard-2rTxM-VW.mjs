import { V as VSlider, a as _sfc_main$6 } from './RegistroPessoas-Ch92pngm.mjs';
import { useSSRContext, computed, ref, watch, mergeProps, unref, isRef, withCtx, createTextVNode, createVNode, openBlock, createBlock, createCommentVNode } from 'vue';
import { ssrRenderComponent, ssrRenderAttr, ssrRenderStyle } from 'vue/server-renderer';
import { _ as _export_sfc, e as useCookie, Y as VIcon, f as VBtn, c as useRuntimeConfig } from './server.mjs';
import { u as useFetch } from './fetch-78FO9XjX.mjs';
import { V as VDialog } from './VDialog-x7_nItFY.mjs';
import { V as VCard, a as VCardTitle, c as VCardActions } from './VCard-sRL_sqEi.mjs';
import { V as VContainer } from './VContainer-CTpFP9Uv.mjs';
import { V as VRow } from './VRow-DVf727cH.mjs';
import { V as VCol } from './VCol-D9_5u2PU.mjs';

const _sfc_main = {
  __name: "FichaCard",
  __ssrInlineRender: true,
  props: {
    show: Boolean,
    item: Object,
    isView: {
      type: Boolean,
      default: false
    },
    linkView: String
  },
  emits: ["close", "confirmar"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const config = useRuntimeConfig();
    const buscarPessoa = `${config.public.managemant}/getLinkTipo`;
    const baixarDocumento = `${config.public.managemant}/download`;
    const hasTiff = computed(() => !!fichaRender.value);
    const hasFoto = computed(() => !!fotoRender.value);
    const isVisible = ref(props.show);
    const fichaRender = ref(null);
    const fotoRender = ref(null);
    const zoomLevel = ref(0.8);
    const rotationDegree = ref(0);
    const emit = __emit;
    const translateX = computed(() => {
      return (zoomLevel.value - 1) * -50;
    });
    watch(
      () => props.show,
      async (newVal) => {
        isVisible.value = newVal;
        fichaRender.value = null;
        await beforeOpenFicha();
      }
    );
    watch(
      () => props.linkView,
      (newLinkView) => {
        if (props.isView) {
          if (newLinkView && newLinkView.includes(".tr7")) {
            fichaRender.value = newLinkView;
            fotoRender.value = null;
          } else {
            fichaRender.value = null;
            fotoRender.value = newLinkView;
          }
        }
      }
    );
    const confirmarRecebimento = () => {
      emit("confirmar");
      closeModal();
    };
    const beforeOpenFicha = async () => {
      var _a;
      if (props.isView) {
        return;
      }
      if (!props.item.id) return;
      const { data: imagemBiometria } = await useFetch(buscarPessoa, {
        method: "POST",
        body: { tipo: "ficha", id: props.item.id }
      }, "$4omB3S9Tg3");
      if (!((_a = imagemBiometria.value) == null ? undefined : _a.link)) return;
      const { data: link } = await useFetch(baixarDocumento, {
        method: "POST",
        body: {
          bucket: useCookie("user-data").value.cartorio_token,
          path: imagemBiometria.value.link
        }
      }, "$yanMHqBuqW");
      const linkMinio = imagemBiometria.value.link;
      const linkPayload = link.value;
      if (/\.(tr7|tiff)$/i.test(linkMinio)) {
        fichaRender.value = linkPayload;
      } else {
        fotoRender.value = linkPayload;
      }
    };
    const closeModal = () => {
      isVisible.value = false;
      fichaRender.value = null;
      fotoRender.value = null;
      zoomLevel.value = 0.8;
      rotationDegree.value = 0;
      emit("close");
    };
    const rotateImage = () => {
      rotationDegree.value += 90;
      if (rotationDegree.value >= 360) {
        rotationDegree.value = 0;
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_TiffViewer = _sfc_main$6;
      _push(ssrRenderComponent(VDialog, mergeProps({
        persistent: "",
        modelValue: unref(isVisible),
        "onUpdate:modelValue": ($event) => isRef(isVisible) ? isVisible.value = $event : null,
        "max-width": "850"
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VCard, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VCardTitle, { class: "text-h5" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Ficha de Firma`);
                      } else {
                        return [
                          createTextVNode("Ficha de Firma")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VContainer, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VRow, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VCol, { cols: "10" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(VSlider, {
                                      modelValue: unref(zoomLevel),
                                      "onUpdate:modelValue": ($event) => isRef(zoomLevel) ? zoomLevel.value = $event : null,
                                      min: "0.5",
                                      max: "1.1",
                                      step: "0.1",
                                      label: "Zoom",
                                      class: "mt-3"
                                    }, null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(VSlider, {
                                        modelValue: unref(zoomLevel),
                                        "onUpdate:modelValue": ($event) => isRef(zoomLevel) ? zoomLevel.value = $event : null,
                                        min: "0.5",
                                        max: "1.1",
                                        step: "0.1",
                                        label: "Zoom",
                                        class: "mt-3"
                                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(VCol, { cols: "2" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(VIcon, {
                                      class: "ml-6",
                                      size: "50px",
                                      onClick: rotateImage
                                    }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`mdi-rotate-right`);
                                        } else {
                                          return [
                                            createTextVNode("mdi-rotate-right")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(VIcon, {
                                        class: "ml-6",
                                        size: "50px",
                                        onClick: rotateImage
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode("mdi-rotate-right")
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
                                createVNode(VCol, { cols: "10" }, {
                                  default: withCtx(() => [
                                    createVNode(VSlider, {
                                      modelValue: unref(zoomLevel),
                                      "onUpdate:modelValue": ($event) => isRef(zoomLevel) ? zoomLevel.value = $event : null,
                                      min: "0.5",
                                      max: "1.1",
                                      step: "0.1",
                                      label: "Zoom",
                                      class: "mt-3"
                                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                  ]),
                                  _: 1
                                }),
                                createVNode(VCol, { cols: "2" }, {
                                  default: withCtx(() => [
                                    createVNode(VIcon, {
                                      class: "ml-6",
                                      size: "50px",
                                      onClick: rotateImage
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode("mdi-rotate-right")
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
                      } else {
                        return [
                          createVNode(VRow, null, {
                            default: withCtx(() => [
                              createVNode(VCol, { cols: "10" }, {
                                default: withCtx(() => [
                                  createVNode(VSlider, {
                                    modelValue: unref(zoomLevel),
                                    "onUpdate:modelValue": ($event) => isRef(zoomLevel) ? zoomLevel.value = $event : null,
                                    min: "0.5",
                                    max: "1.1",
                                    step: "0.1",
                                    label: "Zoom",
                                    class: "mt-3"
                                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                ]),
                                _: 1
                              }),
                              createVNode(VCol, { cols: "2" }, {
                                default: withCtx(() => [
                                  createVNode(VIcon, {
                                    class: "ml-6",
                                    size: "50px",
                                    onClick: rotateImage
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode("mdi-rotate-right")
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
                  }, _parent3, _scopeId2));
                  _push3(`<div class="d-flex justify-center align-center" data-v-d447ef31${_scopeId2}>`);
                  if (unref(hasTiff)) {
                    _push3(`<div class="ml-5 mt-15" data-v-d447ef31${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_TiffViewer, {
                      "tiff-url": unref(fichaRender),
                      "is-modal": true,
                      "zoom-level": unref(zoomLevel),
                      "rotation-degree": unref(rotationDegree),
                      "translate-x": unref(translateX)
                    }, null, _parent3, _scopeId2));
                    _push3(`</div>`);
                  } else if (unref(hasFoto)) {
                    _push3(`<img${ssrRenderAttr("src", unref(fotoRender))} style="${ssrRenderStyle({
                      width: "70%",
                      height: "70%",
                      transform: `scale(${unref(zoomLevel)}) rotate(${unref(rotationDegree)}deg)`
                    })}" data-v-d447ef31${_scopeId2}>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`</div>`);
                  _push3(ssrRenderComponent(VCardActions, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        if (!props.isView) {
                          _push4(ssrRenderComponent(VBtn, {
                            style: { "background-color": "#429946", "color": "white" },
                            onClick: confirmarRecebimento
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`Reconhecer`);
                              } else {
                                return [
                                  createTextVNode("Reconhecer")
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        } else {
                          _push4(`<!---->`);
                        }
                        _push4(ssrRenderComponent(VBtn, {
                          style: { "background-color": "red", "color": "white" },
                          onClick: closeModal
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
                          !props.isView ? (openBlock(), createBlock(VBtn, {
                            key: 0,
                            style: { "background-color": "#429946", "color": "white" },
                            onClick: confirmarRecebimento
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Reconhecer")
                            ]),
                            _: 1
                          })) : createCommentVNode("", true),
                          createVNode(VBtn, {
                            style: { "background-color": "red", "color": "white" },
                            onClick: closeModal
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
                    createVNode(VCardTitle, { class: "text-h5" }, {
                      default: withCtx(() => [
                        createTextVNode("Ficha de Firma")
                      ]),
                      _: 1
                    }),
                    createVNode(VContainer, null, {
                      default: withCtx(() => [
                        createVNode(VRow, null, {
                          default: withCtx(() => [
                            createVNode(VCol, { cols: "10" }, {
                              default: withCtx(() => [
                                createVNode(VSlider, {
                                  modelValue: unref(zoomLevel),
                                  "onUpdate:modelValue": ($event) => isRef(zoomLevel) ? zoomLevel.value = $event : null,
                                  min: "0.5",
                                  max: "1.1",
                                  step: "0.1",
                                  label: "Zoom",
                                  class: "mt-3"
                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                              ]),
                              _: 1
                            }),
                            createVNode(VCol, { cols: "2" }, {
                              default: withCtx(() => [
                                createVNode(VIcon, {
                                  class: "ml-6",
                                  size: "50px",
                                  onClick: rotateImage
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode("mdi-rotate-right")
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
                    }),
                    createVNode("div", { class: "d-flex justify-center align-center" }, [
                      unref(hasTiff) ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "ml-5 mt-15"
                      }, [
                        createVNode(_component_TiffViewer, {
                          "tiff-url": unref(fichaRender),
                          "is-modal": true,
                          "zoom-level": unref(zoomLevel),
                          "rotation-degree": unref(rotationDegree),
                          "translate-x": unref(translateX)
                        }, null, 8, ["tiff-url", "zoom-level", "rotation-degree", "translate-x"])
                      ])) : unref(hasFoto) ? (openBlock(), createBlock("img", {
                        key: 1,
                        src: unref(fotoRender),
                        style: {
                          width: "70%",
                          height: "70%",
                          transform: `scale(${unref(zoomLevel)}) rotate(${unref(rotationDegree)}deg)`
                        }
                      }, null, 12, ["src"])) : createCommentVNode("", true)
                    ]),
                    createVNode(VCardActions, null, {
                      default: withCtx(() => [
                        !props.isView ? (openBlock(), createBlock(VBtn, {
                          key: 0,
                          style: { "background-color": "#429946", "color": "white" },
                          onClick: confirmarRecebimento
                        }, {
                          default: withCtx(() => [
                            createTextVNode("Reconhecer")
                          ]),
                          _: 1
                        })) : createCommentVNode("", true),
                        createVNode(VBtn, {
                          style: { "background-color": "red", "color": "white" },
                          onClick: closeModal
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
              createVNode(VCard, null, {
                default: withCtx(() => [
                  createVNode(VCardTitle, { class: "text-h5" }, {
                    default: withCtx(() => [
                      createTextVNode("Ficha de Firma")
                    ]),
                    _: 1
                  }),
                  createVNode(VContainer, null, {
                    default: withCtx(() => [
                      createVNode(VRow, null, {
                        default: withCtx(() => [
                          createVNode(VCol, { cols: "10" }, {
                            default: withCtx(() => [
                              createVNode(VSlider, {
                                modelValue: unref(zoomLevel),
                                "onUpdate:modelValue": ($event) => isRef(zoomLevel) ? zoomLevel.value = $event : null,
                                min: "0.5",
                                max: "1.1",
                                step: "0.1",
                                label: "Zoom",
                                class: "mt-3"
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            _: 1
                          }),
                          createVNode(VCol, { cols: "2" }, {
                            default: withCtx(() => [
                              createVNode(VIcon, {
                                class: "ml-6",
                                size: "50px",
                                onClick: rotateImage
                              }, {
                                default: withCtx(() => [
                                  createTextVNode("mdi-rotate-right")
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
                  }),
                  createVNode("div", { class: "d-flex justify-center align-center" }, [
                    unref(hasTiff) ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "ml-5 mt-15"
                    }, [
                      createVNode(_component_TiffViewer, {
                        "tiff-url": unref(fichaRender),
                        "is-modal": true,
                        "zoom-level": unref(zoomLevel),
                        "rotation-degree": unref(rotationDegree),
                        "translate-x": unref(translateX)
                      }, null, 8, ["tiff-url", "zoom-level", "rotation-degree", "translate-x"])
                    ])) : unref(hasFoto) ? (openBlock(), createBlock("img", {
                      key: 1,
                      src: unref(fotoRender),
                      style: {
                        width: "70%",
                        height: "70%",
                        transform: `scale(${unref(zoomLevel)}) rotate(${unref(rotationDegree)}deg)`
                      }
                    }, null, 12, ["src"])) : createCommentVNode("", true)
                  ]),
                  createVNode(VCardActions, null, {
                    default: withCtx(() => [
                      !props.isView ? (openBlock(), createBlock(VBtn, {
                        key: 0,
                        style: { "background-color": "#429946", "color": "white" },
                        onClick: confirmarRecebimento
                      }, {
                        default: withCtx(() => [
                          createTextVNode("Reconhecer")
                        ]),
                        _: 1
                      })) : createCommentVNode("", true),
                      createVNode(VBtn, {
                        style: { "background-color": "red", "color": "white" },
                        onClick: closeModal
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Modal/FichaCard.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : undefined;
};
const __nuxt_component_1 = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-d447ef31"]]);

export { __nuxt_component_1 as _ };
//# sourceMappingURL=FichaCard-2rTxM-VW.mjs.map
