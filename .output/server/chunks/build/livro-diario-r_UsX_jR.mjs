import { _ as _sfc_main$1 } from './SaveButton-NegzxXb_.mjs';
import { ref, reactive, resolveDirective, withCtx, mergeProps, unref, withDirectives, createVNode, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrGetDirectiveProps } from 'vue/server-renderer';
import { e as useCookie, V as VTextField, c as useRuntimeConfig } from './server.mjs';
import { u as useFetch } from './fetch-BGOGxZIT.mjs';
import { V as VContainer } from './VContainer-CUysD4sO.mjs';
import { V as VRow } from './VRow-Bqz0CuIN.mjs';
import { V as VCol } from './VCol-BT4RzX0Q.mjs';
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
import './asyncData-Diyd6umk.mjs';

const _sfc_main = {
  __name: "livro-diario",
  __ssrInlineRender: true,
  setup(__props) {
    const config = useRuntimeConfig();
    const gerarRelatorio = `${config.public.managemant}/relatorios`;
    const cartorio_token = ref(useCookie("user-data").value.cartorio_token);
    const state = reactive({
      data_inicial: getCurrentDate(),
      data_final: getCurrentDate(),
      paginaInicial: 0,
      livro: 0
    });
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
    const gerarRelatorioDiarioCaixa = async () => {
      const { data } = await useFetch(gerarRelatorio, {
        method: "POST",
        body: {
          cartorio_token,
          data_inicial: convertToISODate(state.data_inicial),
          data_final: convertToISODate(state.data_final),
          livro: state.livro,
          paginaInicial: state.paginaInicial
        }
      }, "$YxyRzXktgB");
      if (data.value) {
        const newWindow = (undefined).open();
        if (newWindow) {
          newWindow.document.open();
          newWindow.document.writeln(data.value);
          newWindow.document.close();
        }
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_SaveButton = _sfc_main$1;
      const _directive_mask = resolveDirective("mask");
      _push(ssrRenderComponent(VContainer, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VRow, { class: "mt-1" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VCol, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VTextField, mergeProps({
                          modelValue: unref(state).data_inicial,
                          "onUpdate:modelValue": ($event) => unref(state).data_inicial = $event,
                          label: "Data Inicial",
                          placeholder: "dd/mm/yyyy"
                        }, ssrGetDirectiveProps(_ctx, _directive_mask, "##/##/####")), null, _parent4, _scopeId3));
                      } else {
                        return [
                          withDirectives(createVNode(VTextField, {
                            modelValue: unref(state).data_inicial,
                            "onUpdate:modelValue": ($event) => unref(state).data_inicial = $event,
                            label: "Data Inicial",
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
                        _push4(ssrRenderComponent(VTextField, mergeProps({
                          modelValue: unref(state).data_final,
                          "onUpdate:modelValue": ($event) => unref(state).data_final = $event,
                          label: "Data Final",
                          placeholder: "dd/mm/yyyy"
                        }, ssrGetDirectiveProps(_ctx, _directive_mask, "##/##/####")), null, _parent4, _scopeId3));
                      } else {
                        return [
                          withDirectives(createVNode(VTextField, {
                            modelValue: unref(state).data_final,
                            "onUpdate:modelValue": ($event) => unref(state).data_final = $event,
                            label: "Data Final",
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
                        _push4(ssrRenderComponent(VTextField, {
                          label: "N* Livro",
                          type: "number",
                          modelValue: unref(state).livro,
                          "onUpdate:modelValue": ($event) => unref(state).livro = $event
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VTextField, {
                            label: "N* Livro",
                            type: "number",
                            modelValue: unref(state).livro,
                            "onUpdate:modelValue": ($event) => unref(state).livro = $event
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VCol, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VTextField, {
                          label: "Pagina Inicial",
                          type: "number",
                          modelValue: unref(state).paginaInicial,
                          "onUpdate:modelValue": ($event) => unref(state).paginaInicial = $event
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VTextField, {
                            label: "Pagina Inicial",
                            type: "number",
                            modelValue: unref(state).paginaInicial,
                            "onUpdate:modelValue": ($event) => unref(state).paginaInicial = $event
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VCol, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_SaveButton, {
                          text: "Imprimir",
                          onSave: gerarRelatorioDiarioCaixa
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_SaveButton, {
                            text: "Imprimir",
                            onSave: gerarRelatorioDiarioCaixa
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VCol, null, {
                      default: withCtx(() => [
                        withDirectives(createVNode(VTextField, {
                          modelValue: unref(state).data_inicial,
                          "onUpdate:modelValue": ($event) => unref(state).data_inicial = $event,
                          label: "Data Inicial",
                          placeholder: "dd/mm/yyyy"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]), [
                          [_directive_mask, "##/##/####"]
                        ])
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, null, {
                      default: withCtx(() => [
                        withDirectives(createVNode(VTextField, {
                          modelValue: unref(state).data_final,
                          "onUpdate:modelValue": ($event) => unref(state).data_final = $event,
                          label: "Data Final",
                          placeholder: "dd/mm/yyyy"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]), [
                          [_directive_mask, "##/##/####"]
                        ])
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, null, {
                      default: withCtx(() => [
                        createVNode(VTextField, {
                          label: "N* Livro",
                          type: "number",
                          modelValue: unref(state).livro,
                          "onUpdate:modelValue": ($event) => unref(state).livro = $event
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, null, {
                      default: withCtx(() => [
                        createVNode(VTextField, {
                          label: "Pagina Inicial",
                          type: "number",
                          modelValue: unref(state).paginaInicial,
                          "onUpdate:modelValue": ($event) => unref(state).paginaInicial = $event
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, null, {
                      default: withCtx(() => [
                        createVNode(_component_SaveButton, {
                          text: "Imprimir",
                          onSave: gerarRelatorioDiarioCaixa
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
              createVNode(VRow, { class: "mt-1" }, {
                default: withCtx(() => [
                  createVNode(VCol, null, {
                    default: withCtx(() => [
                      withDirectives(createVNode(VTextField, {
                        modelValue: unref(state).data_inicial,
                        "onUpdate:modelValue": ($event) => unref(state).data_inicial = $event,
                        label: "Data Inicial",
                        placeholder: "dd/mm/yyyy"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"]), [
                        [_directive_mask, "##/##/####"]
                      ])
                    ]),
                    _: 1
                  }),
                  createVNode(VCol, null, {
                    default: withCtx(() => [
                      withDirectives(createVNode(VTextField, {
                        modelValue: unref(state).data_final,
                        "onUpdate:modelValue": ($event) => unref(state).data_final = $event,
                        label: "Data Final",
                        placeholder: "dd/mm/yyyy"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"]), [
                        [_directive_mask, "##/##/####"]
                      ])
                    ]),
                    _: 1
                  }),
                  createVNode(VCol, null, {
                    default: withCtx(() => [
                      createVNode(VTextField, {
                        label: "N* Livro",
                        type: "number",
                        modelValue: unref(state).livro,
                        "onUpdate:modelValue": ($event) => unref(state).livro = $event
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(VCol, null, {
                    default: withCtx(() => [
                      createVNode(VTextField, {
                        label: "Pagina Inicial",
                        type: "number",
                        modelValue: unref(state).paginaInicial,
                        "onUpdate:modelValue": ($event) => unref(state).paginaInicial = $event
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(VCol, null, {
                    default: withCtx(() => [
                      createVNode(_component_SaveButton, {
                        text: "Imprimir",
                        onSave: gerarRelatorioDiarioCaixa
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/relatorios/livro-diario.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : undefined;
};

export { _sfc_main as default };
//# sourceMappingURL=livro-diario-r_UsX_jR.mjs.map
