import { _ as _sfc_main$1 } from './SaveButton-0YznNGYC.mjs';
import { reactive, ref, resolveDirective, withCtx, mergeProps, unref, withDirectives, createVNode, createTextVNode, openBlock, createBlock, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrGetDirectiveProps, ssrInterpolate } from 'vue/server-renderer';
import { b as useNuxtApp, V as VTextField, c as useRuntimeConfig, e as useCookie } from './server.mjs';
import { u as useFetch } from './fetch-DOsfzFYE.mjs';
import { V as VContainer } from './VContainer-CUysD4sO.mjs';
import { V as VRow } from './VRow-Bqz0CuIN.mjs';
import { V as VCol } from './VCol-BT4RzX0Q.mjs';
import { V as VCard, a as VCardTitle, b as VCardText } from './VCard-CUYv16rw.mjs';
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
import './asyncData-B13qrLU7.mjs';
import './VAvatar-Ov8UECBZ.mjs';
import './VImg-C5puQtOR.mjs';
import './VResponsive-BwPb2GHE.mjs';

const _sfc_main = {
  __name: "censec",
  __ssrInlineRender: true,
  setup(__props) {
    const config = useRuntimeConfig();
    const { $toast } = useNuxtApp();
    const integraCensec = `${config.public.managemant}/integra_censec_cep`;
    const enviaCensec = `${config.public.ws}/censec/enviar`;
    const state = reactive({
      data_inicio: getCurrentDate(),
      data_fim: getCurrentDate()
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
      const { data, status } = await useFetch(`${integraCensec}`, {
        method: "POST",
        body: {
          cartorio_token: useCookie("user-data").value.cartorio_token,
          data_inicio: convertToISODate(state.data_inicio),
          data_fim: convertToISODate(state.data_fim)
        }
      }, "$prCSPBNmKL");
      const value = data.value;
      if (status.value === "success") {
        const { data: dadosRetornados, status: statusEnvio } = await useFetch(
          `${enviaCensec}`,
          {
            method: "POST",
            body: { value }
          },
          "$IBf41hwtjc"
        );
        if (statusEnvio.value === "success") {
          $toast.success("Dados enviados com sucesso!");
          dadosCensec.value = dadosRetornados.value;
        } else {
          $toast.error("Erro ao enviar dados para CENSEC.");
        }
      }
    };
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
                          label: "Data Inicio",
                          placeholder: "dd/mm/yyyy"
                        }, ssrGetDirectiveProps(_ctx, _directive_mask, "##/##/####")), null, _parent4, _scopeId3));
                      } else {
                        return [
                          withDirectives(createVNode(VTextField, {
                            modelValue: unref(state).data_inicio,
                            "onUpdate:modelValue": ($event) => unref(state).data_inicio = $event,
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
                  _push3(ssrRenderComponent(VCol, { class: "mt-1" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VTextField, mergeProps({
                          modelValue: unref(state).data_fim,
                          "onUpdate:modelValue": ($event) => unref(state).data_fim = $event,
                          label: "Data Fim",
                          placeholder: "dd/mm/yyyy"
                        }, ssrGetDirectiveProps(_ctx, _directive_mask, "##/##/####")), null, _parent4, _scopeId3));
                      } else {
                        return [
                          withDirectives(createVNode(VTextField, {
                            modelValue: unref(state).data_fim,
                            "onUpdate:modelValue": ($event) => unref(state).data_fim = $event,
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
                  _push3(ssrRenderComponent(VCol, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_SaveButton, {
                          text: "Confirmar",
                          onSave: enviaDadosCensec
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_SaveButton, {
                            text: "Confirmar",
                            onSave: enviaDadosCensec
                          })
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
                          label: "Data Inicio",
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
                          label: "Data Fim",
                          placeholder: "dd/mm/yyyy"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]), [
                          [_directive_mask, "##/##/####"]
                        ])
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, null, {
                      default: withCtx(() => [
                        createVNode(_component_SaveButton, {
                          text: "Confirmar",
                          onSave: enviaDadosCensec
                        })
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
                  _push3(ssrRenderComponent(VCardText, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        if (unref(dadosCensec)) {
                          _push4(`<div${_scopeId3}><pre${_scopeId3}>${ssrInterpolate(JSON.stringify(unref(dadosCensec), null, 2))}</pre></div>`);
                        } else {
                          _push4(`<div${_scopeId3}>Nenhum dado dispon\xEDvel.</div>`);
                        }
                      } else {
                        return [
                          unref(dadosCensec) ? (openBlock(), createBlock("div", { key: 0 }, [
                            createVNode("pre", null, toDisplayString(JSON.stringify(unref(dadosCensec), null, 2)), 1)
                          ])) : (openBlock(), createBlock("div", { key: 1 }, "Nenhum dado dispon\xEDvel."))
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
                    }),
                    createVNode(VCardText, null, {
                      default: withCtx(() => [
                        unref(dadosCensec) ? (openBlock(), createBlock("div", { key: 0 }, [
                          createVNode("pre", null, toDisplayString(JSON.stringify(unref(dadosCensec), null, 2)), 1)
                        ])) : (openBlock(), createBlock("div", { key: 1 }, "Nenhum dado dispon\xEDvel."))
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
                        label: "Data Inicio",
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
                        label: "Data Fim",
                        placeholder: "dd/mm/yyyy"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"]), [
                        [_directive_mask, "##/##/####"]
                      ])
                    ]),
                    _: 1
                  }),
                  createVNode(VCol, null, {
                    default: withCtx(() => [
                      createVNode(_component_SaveButton, {
                        text: "Confirmar",
                        onSave: enviaDadosCensec
                      })
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
                  }),
                  createVNode(VCardText, null, {
                    default: withCtx(() => [
                      unref(dadosCensec) ? (openBlock(), createBlock("div", { key: 0 }, [
                        createVNode("pre", null, toDisplayString(JSON.stringify(unref(dadosCensec), null, 2)), 1)
                      ])) : (openBlock(), createBlock("div", { key: 1 }, "Nenhum dado dispon\xEDvel."))
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
//# sourceMappingURL=censec-Cu28wix0.mjs.map
