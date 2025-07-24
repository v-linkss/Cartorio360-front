import { a as buildAssetsURL } from '../routes/renderer.mjs';
import { ref, reactive, resolveDirective, withCtx, mergeProps, unref, withDirectives, createVNode, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrGetDirectiveProps, ssrRenderStyle, ssrRenderAttr } from 'vue/server-renderer';
import { e as useCookie, V as VTextField, c as useRuntimeConfig } from './server.mjs';
import { u as useFetch } from './fetch-DOsfzFYE.mjs';
import { V as VContainer } from './VContainer-CUysD4sO.mjs';
import { V as VRow } from './VRow-Bqz0CuIN.mjs';
import { V as VCol } from './VCol-BT4RzX0Q.mjs';
import 'vue-bundle-renderer/runtime';
import '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:fs';
import 'node:url';
import 'node:path';
import 'devalue';
import '@unhead/ssr';
import 'unhead';
import '@unhead/shared';
import 'pinia';
import 'vue-router';
import 'vue3-toastify';
import 'vue-the-mask';
import './asyncData-B13qrLU7.mjs';

const _imports_0 = "data:image/png;base64,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";
const _imports_1 = "" + buildAssetsURL("btn-csv.DS5dvxBS.png");
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
        const blob = new Blob([data.value], { type: "application/pdf" });
        const url = URL.createObjectURL(blob);
        (undefined).open(url, "_blank");
        setTimeout(() => URL.revokeObjectURL(url), 1e4);
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
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
                        _push4(`<img style="${ssrRenderStyle({ "width": "40px", "height": "40px", "cursor": "pointer" })}"${ssrRenderAttr("src", _imports_0)} alt="imprimir" title="imprimir"${_scopeId3}><img style="${ssrRenderStyle({ "width": "40px", "height": "40px", "cursor": "pointer", "margin-left": "20px" })}"${ssrRenderAttr("src", _imports_1)} alt="exportar" title="exportar"${_scopeId3}>`);
                      } else {
                        return [
                          createVNode("img", {
                            onClick: gerarRelatorioDiarioCaixa,
                            style: { "width": "40px", "height": "40px", "cursor": "pointer" },
                            src: _imports_0,
                            alt: "imprimir",
                            title: "imprimir"
                          }),
                          createVNode("img", {
                            onClick: gerarRelatorioDiarioCaixa,
                            style: { "width": "40px", "height": "40px", "cursor": "pointer", "margin-left": "20px" },
                            src: _imports_1,
                            alt: "exportar",
                            title: "exportar"
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VCol, null, null, _parent3, _scopeId2));
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
                        createVNode("img", {
                          onClick: gerarRelatorioDiarioCaixa,
                          style: { "width": "40px", "height": "40px", "cursor": "pointer" },
                          src: _imports_0,
                          alt: "imprimir",
                          title: "imprimir"
                        }),
                        createVNode("img", {
                          onClick: gerarRelatorioDiarioCaixa,
                          style: { "width": "40px", "height": "40px", "cursor": "pointer", "margin-left": "20px" },
                          src: _imports_1,
                          alt: "exportar",
                          title: "exportar"
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(VCol)
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
                      createVNode("img", {
                        onClick: gerarRelatorioDiarioCaixa,
                        style: { "width": "40px", "height": "40px", "cursor": "pointer" },
                        src: _imports_0,
                        alt: "imprimir",
                        title: "imprimir"
                      }),
                      createVNode("img", {
                        onClick: gerarRelatorioDiarioCaixa,
                        style: { "width": "40px", "height": "40px", "cursor": "pointer", "margin-left": "20px" },
                        src: _imports_1,
                        alt: "exportar",
                        title: "exportar"
                      })
                    ]),
                    _: 1
                  }),
                  createVNode(VCol)
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
//# sourceMappingURL=livro-diario-D6jdXQv0.mjs.map
