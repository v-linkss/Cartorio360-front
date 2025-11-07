import { useSSRContext, ref, watch, mergeProps, unref, isRef, withCtx, createVNode, createTextVNode, toDisplayString, openBlock, createBlock, createCommentVNode } from 'vue';
import { ssrRenderComponent, ssrInterpolate, ssrRenderStyle } from 'vue/server-renderer';
import { _ as _export_sfc, V as VBtn } from './server.mjs';
import { V as VDialog } from './VDialog-BVe31KMa.mjs';
import { V as VCard, a as VCardText, c as VCardActions } from './VCard-DfXRXpQ0.mjs';

const _sfc_main = {
  __name: "Confirmacao",
  __ssrInlineRender: true,
  props: {
    show: Boolean,
    condMessage: String,
    description: String,
    valor: Object
  },
  emits: ["close", "confirm"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const isVisible = ref(props.show);
    const emit = __emit;
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
    const confirmAction = () => {
      isVisible.value = false;
      emit("confirm");
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(VDialog, mergeProps({
        persistent: "",
        modelValue: unref(isVisible),
        "onUpdate:modelValue": ($event) => isRef(isVisible) ? isVisible.value = $event : null,
        "max-width": "500"
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VCard, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VCardText, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div data-v-0dd687d7${_scopeId3}>${ssrInterpolate(__props.condMessage)} `);
                        if (__props.description) {
                          _push4(`<div class="description-scroll mt-2" data-v-0dd687d7${_scopeId3}>${ssrInterpolate(__props.description)}</div>`);
                        } else {
                          _push4(`<!---->`);
                        }
                        if (__props.valor) {
                          _push4(`<div class="mt-5" data-v-0dd687d7${_scopeId3}><span style="${ssrRenderStyle({ "font-size": "larger" })}" data-v-0dd687d7${_scopeId3}>Valor Emolumento</span> : R$${ssrInterpolate(__props.valor.valor_emolumento)} \xA0 <span style="${ssrRenderStyle({ "font-size": "large" })}" data-v-0dd687d7${_scopeId3}>Valor Ato</span>: R$${ssrInterpolate(__props.valor.valor_ato)} <br data-v-0dd687d7${_scopeId3}><span style="${ssrRenderStyle({ "font-size": "large" })}" data-v-0dd687d7${_scopeId3}>Valor Selo</span> : R$${ssrInterpolate(__props.valor.valor_selo)} \xA0<span style="${ssrRenderStyle({ "font-size": "large" })}" data-v-0dd687d7${_scopeId3}>Valor TSNR</span> : R$${ssrInterpolate(__props.valor.valor_tsnr)}</div>`);
                        } else {
                          _push4(`<!---->`);
                        }
                        _push4(`</div>`);
                      } else {
                        return [
                          createVNode("div", null, [
                            createTextVNode(toDisplayString(__props.condMessage) + " ", 1),
                            __props.description ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "description-scroll mt-2"
                            }, toDisplayString(__props.description), 1)) : createCommentVNode("", true),
                            __props.valor ? (openBlock(), createBlock("div", {
                              key: 1,
                              class: "mt-5"
                            }, [
                              createVNode("span", { style: { "font-size": "larger" } }, "Valor Emolumento"),
                              createTextVNode(" : R$" + toDisplayString(__props.valor.valor_emolumento) + " \xA0 ", 1),
                              createVNode("span", { style: { "font-size": "large" } }, "Valor Ato"),
                              createTextVNode(": R$" + toDisplayString(__props.valor.valor_ato) + " ", 1),
                              createVNode("br"),
                              createVNode("span", { style: { "font-size": "large" } }, "Valor Selo"),
                              createTextVNode(" : R$" + toDisplayString(__props.valor.valor_selo) + " \xA0", 1),
                              createVNode("span", { style: { "font-size": "large" } }, "Valor TSNR"),
                              createTextVNode(" : R$" + toDisplayString(__props.valor.valor_tsnr), 1)
                            ])) : createCommentVNode("", true)
                          ])
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
                              _push5(`N\xE3o`);
                            } else {
                              return [
                                createTextVNode("N\xE3o")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VBtn, {
                          style: { "background-color": "green", "color": "white" },
                          onClick: confirmAction
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Sim`);
                            } else {
                              return [
                                createTextVNode("Sim")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VBtn, {
                            style: { "background-color": "red", "color": "white" },
                            onClick: closeModal
                          }, {
                            default: withCtx(() => [
                              createTextVNode("N\xE3o")
                            ]),
                            _: 1
                          }),
                          createVNode(VBtn, {
                            style: { "background-color": "green", "color": "white" },
                            onClick: confirmAction
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Sim")
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
                    createVNode(VCardText, null, {
                      default: withCtx(() => [
                        createVNode("div", null, [
                          createTextVNode(toDisplayString(__props.condMessage) + " ", 1),
                          __props.description ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "description-scroll mt-2"
                          }, toDisplayString(__props.description), 1)) : createCommentVNode("", true),
                          __props.valor ? (openBlock(), createBlock("div", {
                            key: 1,
                            class: "mt-5"
                          }, [
                            createVNode("span", { style: { "font-size": "larger" } }, "Valor Emolumento"),
                            createTextVNode(" : R$" + toDisplayString(__props.valor.valor_emolumento) + " \xA0 ", 1),
                            createVNode("span", { style: { "font-size": "large" } }, "Valor Ato"),
                            createTextVNode(": R$" + toDisplayString(__props.valor.valor_ato) + " ", 1),
                            createVNode("br"),
                            createVNode("span", { style: { "font-size": "large" } }, "Valor Selo"),
                            createTextVNode(" : R$" + toDisplayString(__props.valor.valor_selo) + " \xA0", 1),
                            createVNode("span", { style: { "font-size": "large" } }, "Valor TSNR"),
                            createTextVNode(" : R$" + toDisplayString(__props.valor.valor_tsnr), 1)
                          ])) : createCommentVNode("", true)
                        ])
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
                            createTextVNode("N\xE3o")
                          ]),
                          _: 1
                        }),
                        createVNode(VBtn, {
                          style: { "background-color": "green", "color": "white" },
                          onClick: confirmAction
                        }, {
                          default: withCtx(() => [
                            createTextVNode("Sim")
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
                  createVNode(VCardText, null, {
                    default: withCtx(() => [
                      createVNode("div", null, [
                        createTextVNode(toDisplayString(__props.condMessage) + " ", 1),
                        __props.description ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "description-scroll mt-2"
                        }, toDisplayString(__props.description), 1)) : createCommentVNode("", true),
                        __props.valor ? (openBlock(), createBlock("div", {
                          key: 1,
                          class: "mt-5"
                        }, [
                          createVNode("span", { style: { "font-size": "larger" } }, "Valor Emolumento"),
                          createTextVNode(" : R$" + toDisplayString(__props.valor.valor_emolumento) + " \xA0 ", 1),
                          createVNode("span", { style: { "font-size": "large" } }, "Valor Ato"),
                          createTextVNode(": R$" + toDisplayString(__props.valor.valor_ato) + " ", 1),
                          createVNode("br"),
                          createVNode("span", { style: { "font-size": "large" } }, "Valor Selo"),
                          createTextVNode(" : R$" + toDisplayString(__props.valor.valor_selo) + " \xA0", 1),
                          createVNode("span", { style: { "font-size": "large" } }, "Valor TSNR"),
                          createTextVNode(" : R$" + toDisplayString(__props.valor.valor_tsnr), 1)
                        ])) : createCommentVNode("", true)
                      ])
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
                          createTextVNode("N\xE3o")
                        ]),
                        _: 1
                      }),
                      createVNode(VBtn, {
                        style: { "background-color": "green", "color": "white" },
                        onClick: confirmAction
                      }, {
                        default: withCtx(() => [
                          createTextVNode("Sim")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Modal/Confirmacao.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : undefined;
};
const __nuxt_component_1 = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-0dd687d7"]]);

export { __nuxt_component_1 as _ };
//# sourceMappingURL=Confirmacao-DfcCEKd1.mjs.map
