import { _ as _sfc_main$1 } from './SaveButton-0YznNGYC.mjs';
import { reactive, resolveDirective, withCtx, mergeProps, unref, withDirectives, createVNode, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrGetDirectiveProps } from 'vue/server-renderer';
import { V as VContainer } from './VContainer-CUysD4sO.mjs';
import { V as VRow } from './VRow-Bqz0CuIN.mjs';
import { V as VCol } from './VCol-BT4RzX0Q.mjs';
import { V as VTextField } from './server.mjs';
import { V as VCard, a as VCardTitle } from './VCard-C4igN6I0.mjs';
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
import './VAvatar-DtgTBdiE.mjs';
import './VResponsive-BwPb2GHE.mjs';

const _sfc_main = {
  __name: "censec",
  __ssrInlineRender: true,
  setup(__props) {
    const state = reactive({
      data_inicio: getCurrentDate(),
      data_fim: getCurrentDate()
    });
    function getCurrentDate() {
      const today = /* @__PURE__ */ new Date();
      const yyyy = today.getFullYear();
      const mm = String(today.getMonth() + 1).padStart(2, "0");
      const dd = String(today.getDate()).padStart(2, "0");
      return `${dd}-${mm}-${yyyy}`;
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_SaveButton = _sfc_main$1;
      const _directive_mask = resolveDirective("mask");
      _push(ssrRenderComponent(VContainer, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VRow, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VCol, { class: "mt-1" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VTextField, mergeProps({
                          modelValue: unref(state).data_inicio,
                          "onUpdate:modelValue": ($event) => unref(state).data_inicio = $event,
                          label: "Abertura de",
                          placeholder: "dd/mm/yyyy"
                        }, ssrGetDirectiveProps(_ctx, _directive_mask, "##/##/####")), null, _parent4, _scopeId3));
                      } else {
                        return [
                          withDirectives(createVNode(VTextField, {
                            modelValue: unref(state).data_inicio,
                            "onUpdate:modelValue": ($event) => unref(state).data_inicio = $event,
                            label: "Abertura de",
                            placeholder: "dd/mm/yyyy"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"]), [
                            [_directive_mask, "##/##/####"]
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VCol, { class: "mt-1" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VTextField, mergeProps({
                          modelValue: unref(state).data_fim,
                          "onUpdate:modelValue": ($event) => unref(state).data_fim = $event,
                          label: "Abertura at\xE9",
                          placeholder: "dd/mm/yyyy"
                        }, ssrGetDirectiveProps(_ctx, _directive_mask, "##/##/####")), null, _parent4, _scopeId3));
                      } else {
                        return [
                          withDirectives(createVNode(VTextField, {
                            modelValue: unref(state).data_fim,
                            "onUpdate:modelValue": ($event) => unref(state).data_fim = $event,
                            label: "Abertura at\xE9",
                            placeholder: "dd/mm/yyyy"
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
                        _push4(ssrRenderComponent(_component_SaveButton, { text: "Confirmar" }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_SaveButton, { text: "Confirmar" })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VCol, { class: "mt-1" }, {
                      default: withCtx(() => [
                        withDirectives(createVNode(VTextField, {
                          modelValue: unref(state).data_inicio,
                          "onUpdate:modelValue": ($event) => unref(state).data_inicio = $event,
                          label: "Abertura de",
                          placeholder: "dd/mm/yyyy"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]), [
                          [_directive_mask, "##/##/####"]
                        ])
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, { class: "mt-1" }, {
                      default: withCtx(() => [
                        withDirectives(createVNode(VTextField, {
                          modelValue: unref(state).data_fim,
                          "onUpdate:modelValue": ($event) => unref(state).data_fim = $event,
                          label: "Abertura at\xE9",
                          placeholder: "dd/mm/yyyy"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]), [
                          [_directive_mask, "##/##/####"]
                        ])
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, null, {
                      default: withCtx(() => [
                        createVNode(_component_SaveButton, { text: "Confirmar" })
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(VCard, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VCardTitle, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Dados CENSEC`);
                      } else {
                        return [
                          createTextVNode("Dados CENSEC")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VCardTitle, null, {
                      default: withCtx(() => [
                        createTextVNode("Dados CENSEC")
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
              createVNode(VRow, null, {
                default: withCtx(() => [
                  createVNode(VCol, { class: "mt-1" }, {
                    default: withCtx(() => [
                      withDirectives(createVNode(VTextField, {
                        modelValue: unref(state).data_inicio,
                        "onUpdate:modelValue": ($event) => unref(state).data_inicio = $event,
                        label: "Abertura de",
                        placeholder: "dd/mm/yyyy"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"]), [
                        [_directive_mask, "##/##/####"]
                      ])
                    ]),
                    _: 1
                  }),
                  createVNode(VCol, { class: "mt-1" }, {
                    default: withCtx(() => [
                      withDirectives(createVNode(VTextField, {
                        modelValue: unref(state).data_fim,
                        "onUpdate:modelValue": ($event) => unref(state).data_fim = $event,
                        label: "Abertura at\xE9",
                        placeholder: "dd/mm/yyyy"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"]), [
                        [_directive_mask, "##/##/####"]
                      ])
                    ]),
                    _: 1
                  }),
                  createVNode(VCol, null, {
                    default: withCtx(() => [
                      createVNode(_component_SaveButton, { text: "Confirmar" })
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(VCard, null, {
                default: withCtx(() => [
                  createVNode(VCardTitle, null, {
                    default: withCtx(() => [
                      createTextVNode("Dados CENSEC")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/integracao/censec.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : undefined;
};

export { _sfc_main as default };
//# sourceMappingURL=censec-BRKrmoTC.mjs.map
