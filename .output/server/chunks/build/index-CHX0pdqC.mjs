import { _ as _sfc_main$1 } from './Ordem-jfzzP3AU.mjs';
import { ref, computed, resolveComponent, withCtx, unref, createVNode, toDisplayString, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrInterpolate, ssrRenderClass, ssrRenderAttr, ssrRenderStyle } from 'vue/server-renderer';
import { _ as _imports_2 } from './recebe-D8d082aE.mjs';
import { _ as _imports_0 } from './salvar-DQISB1bG.mjs';
import { b as useNuxtApp, e as useCookie, V as VTextField, f as VBtn, c as useRuntimeConfig, a as navigateTo } from './server.mjs';
import { V as VContainer } from './VContainer-CTpFP9Uv.mjs';
import { V as VRow } from './VRow-BgTPlN44.mjs';
import { V as VCol } from './VCol-W86HRYUB.mjs';
import { V as VDataTable } from './VDataTable-DSnUBExV.mjs';
import './MoneyInput-nC85fGUl.mjs';
import 'v-money3';
import './VDialog-CYKPt9Vw.mjs';
import './VAvatar-Bc96djyd.mjs';
import './VResponsive-dUk8X3PH.mjs';
import './novo-CWU3oYa5.mjs';
import './fetch-B37nLMbz.mjs';
import '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:fs';
import 'node:url';
import 'node:path';
import './VAutocomplete-u12jjvbo.mjs';
import './filter-ClbLKnC8.mjs';
import './VList-BV9T5xsx.mjs';
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

const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const config = useRuntimeConfig();
    useNuxtApp();
    `${config.public.managemant}/listarOSCaixas`;
    const nome_usuario = useCookie("caixa-service").value.usuario_nome;
    const data = useCookie("caixa-service").value.data;
    const caixaRecebeOsItems = ref([]);
    const searchNumero = ref("");
    const searchApresentante = ref("");
    const selectedOrder = ref({});
    const numero_os = ref(null);
    const isModalRecebimentoOpen = ref(false);
    const goBack = () => {
      navigateTo("/caixas/lista");
    };
    const headers = [
      { title: "Data Recebimento", value: "data" },
      { title: "N\xFAmero", value: "numero" },
      { title: "Situa\xE7\xE3o", value: "situacao" },
      { title: "CPF", value: "apresentante_cpf" },
      { title: "Apresentante", value: "apresentante_nome" },
      { title: "Usu\xE1rio", value: "usuario_nome" },
      { title: "Valor", value: "valor" },
      { title: "A\xE7\xF5es", value: "actions" }
    ];
    const filteredItems = computed(() => {
      return caixaRecebeOsItems.value.filter((item) => {
        const numero = item.numero ? item.numero.toString().toLowerCase() : "";
        const apresentante = item.apresentante_nome ? item.apresentante_nome.toLowerCase() : "";
        const matchesNumero = numero.includes(searchNumero.value.toLowerCase());
        const matchesApresentante = apresentante.includes(
          searchApresentante.value.toLowerCase()
        );
        return matchesNumero && matchesApresentante;
      });
    });
    function redirectToCancelamento(numero, token) {
      console.log("Cancelando OS:", { numero, token });
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
    return (_ctx, _push, _parent, _attrs) => {
      const _component_RecebimentoOrdem = _sfc_main$1;
      const _component_v_rows = resolveComponent("v-rows");
      const _component_v_cols = resolveComponent("v-cols");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(VContainer, { class: "mt-5" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VRow, { class: "mb-5" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<h1${_scopeId2}>Recebimento de Ordens de Servi\xE7o - Caixa ${ssrInterpolate(unref(data))} - ${ssrInterpolate(unref(nome_usuario))}</h1>`);
                } else {
                  return [
                    createVNode("h1", null, "Recebimento de Ordens de Servi\xE7o - Caixa " + toDisplayString(unref(data)) + " - " + toDisplayString(unref(nome_usuario)), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(VRow, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VCol, { cols: "2" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VTextField, {
                          modelValue: searchNumero.value,
                          "onUpdate:modelValue": ($event) => searchNumero.value = $event,
                          type: "text",
                          label: "N\xFAmero"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VTextField, {
                            modelValue: searchNumero.value,
                            "onUpdate:modelValue": ($event) => searchNumero.value = $event,
                            type: "text",
                            label: "N\xFAmero"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VCol, { md: "3" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VTextField, {
                          modelValue: searchApresentante.value,
                          "onUpdate:modelValue": ($event) => searchApresentante.value = $event,
                          label: "Apresentante"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VTextField, {
                            modelValue: searchApresentante.value,
                            "onUpdate:modelValue": ($event) => searchApresentante.value = $event,
                            label: "Apresentante"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VCol, { cols: "2" }, {
                      default: withCtx(() => [
                        createVNode(VTextField, {
                          modelValue: searchNumero.value,
                          "onUpdate:modelValue": ($event) => searchNumero.value = $event,
                          type: "text",
                          label: "N\xFAmero"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, { md: "3" }, {
                      default: withCtx(() => [
                        createVNode(VTextField, {
                          modelValue: searchApresentante.value,
                          "onUpdate:modelValue": ($event) => searchApresentante.value = $event,
                          label: "Apresentante"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
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
              items: filteredItems.value,
              "item-key": "id"
            }, {
              "item.actions": withCtx(({ item }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VRow, { style: { "display": "flex", "gap": "10px", "margin-top": "-5px" } }, {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="${ssrRenderClass({ disabled: !item.btn_receber })}"${ssrRenderAttr("title", item.btn_receber ? "Receber" : "Bloqueado")} title="Receber"${_scopeId3}><img style="${ssrRenderStyle({
                          cursor: item.btn_receber ? "pointer" : "default",
                          width: "30px",
                          height: "30px"
                        })}"${ssrRenderAttr("src", _imports_2)} alt="Receber"${_scopeId3}></div><div class="${ssrRenderClass({ disabled: !item.btn_cancelar })}" title="Cancelamento"${_scopeId3}><img style="${ssrRenderStyle({ "width": "30px", "height": "30px" })}"${ssrRenderAttr("src", _imports_0)} alt="Visualizar" title="Visualizar"${_scopeId3}></div>`);
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
                            class: { disabled: !item.btn_cancelar },
                            onClick: ($event) => item.btn_cancelar ? redirectToCancelamento(item.numero, item.token) : null,
                            title: "Cancelamento"
                          }, [
                            createVNode("img", {
                              style: { "width": "30px", "height": "30px" },
                              src: _imports_0,
                              alt: "Visualizar",
                              title: "Visualizar"
                            })
                          ], 10, ["onClick"])
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VRow, { style: { "display": "flex", "gap": "10px", "margin-top": "-5px" } }, {
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
                          class: { disabled: !item.btn_cancelar },
                          onClick: ($event) => item.btn_cancelar ? redirectToCancelamento(item.numero, item.token) : null,
                          title: "Cancelamento"
                        }, [
                          createVNode("img", {
                            style: { "width": "30px", "height": "30px" },
                            src: _imports_0,
                            alt: "Visualizar",
                            title: "Visualizar"
                          })
                        ], 10, ["onClick"])
                      ]),
                      _: 2
                    }, 1024)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_RecebimentoOrdem, {
              show: isModalRecebimentoOpen.value,
              numero_os: numero_os.value,
              ordem: selectedOrder.value,
              onClose: ($event) => isModalRecebimentoOpen.value = false
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(VRow, { class: "mb-5" }, {
                default: withCtx(() => [
                  createVNode("h1", null, "Recebimento de Ordens de Servi\xE7o - Caixa " + toDisplayString(unref(data)) + " - " + toDisplayString(unref(nome_usuario)), 1)
                ]),
                _: 1
              }),
              createVNode(VRow, null, {
                default: withCtx(() => [
                  createVNode(VCol, { cols: "2" }, {
                    default: withCtx(() => [
                      createVNode(VTextField, {
                        modelValue: searchNumero.value,
                        "onUpdate:modelValue": ($event) => searchNumero.value = $event,
                        type: "text",
                        label: "N\xFAmero"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(VCol, { md: "3" }, {
                    default: withCtx(() => [
                      createVNode(VTextField, {
                        modelValue: searchApresentante.value,
                        "onUpdate:modelValue": ($event) => searchApresentante.value = $event,
                        label: "Apresentante"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode("hr", { class: "mt-5 mb-5" }),
              createVNode(VDataTable, {
                headers,
                items: filteredItems.value,
                "item-key": "id"
              }, {
                "item.actions": withCtx(({ item }) => [
                  createVNode(VRow, { style: { "display": "flex", "gap": "10px", "margin-top": "-5px" } }, {
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
                        class: { disabled: !item.btn_cancelar },
                        onClick: ($event) => item.btn_cancelar ? redirectToCancelamento(item.numero, item.token) : null,
                        title: "Cancelamento"
                      }, [
                        createVNode("img", {
                          style: { "width": "30px", "height": "30px" },
                          src: _imports_0,
                          alt: "Visualizar",
                          title: "Visualizar"
                        })
                      ], 10, ["onClick"])
                    ]),
                    _: 2
                  }, 1024)
                ]),
                _: 1
              }, 8, ["items"]),
              createVNode(_component_RecebimentoOrdem, {
                show: isModalRecebimentoOpen.value,
                numero_os: numero_os.value,
                ordem: selectedOrder.value,
                onClose: ($event) => isModalRecebimentoOpen.value = false
              }, null, 8, ["show", "numero_os", "ordem", "onClose"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_v_rows, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_v_cols, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VBtn, {
                    class: "ml-8",
                    size: "large",
                    onClick: goBack,
                    color: "red"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Voltar `);
                      } else {
                        return [
                          createTextVNode("Voltar ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VBtn, {
                      class: "ml-8",
                      size: "large",
                      onClick: goBack,
                      color: "red"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Voltar ")
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
              createVNode(_component_v_cols, null, {
                default: withCtx(() => [
                  createVNode(VBtn, {
                    class: "ml-8",
                    size: "large",
                    onClick: goBack,
                    color: "red"
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Voltar ")
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
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/caixas/caixasRecebimentoOs/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : undefined;
};

export { _sfc_main as default };
//# sourceMappingURL=index-CHX0pdqC.mjs.map
