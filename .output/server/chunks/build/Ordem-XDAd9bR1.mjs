import { _ as __nuxt_component_0 } from './MoneyInput-ot-UsY0X.mjs';
import { useSSRContext, ref, reactive, watch, mergeProps, unref, isRef, withCtx, createVNode, toDisplayString, createTextVNode, toRaw } from 'vue';
import { ssrRenderComponent, ssrRenderStyle, ssrInterpolate, ssrRenderAttr } from 'vue/server-renderer';
import { a as VDialog, V as VCard, d as VCardActions } from './VDialog-D0zunqbh.mjs';
import { V as VContainer } from './VContainer-CTpFP9Uv.mjs';
import { u as useFetch, V as VRow } from './VRow-CFCOc45b.mjs';
import { b as useNuxtApp, e as useCookie, V as VTextField, f as VBtn, c as useRuntimeConfig } from './server.mjs';
import { _ as _imports_0 } from './novo-CWU3oYa5.mjs';
import { V as VAutocomplete } from './VAutocomplete-CsH0CvxZ.mjs';
import { V as VDataTable } from './VDataTable-C3n1YD6y.mjs';

const _sfc_main$1 = {
  __name: "ModalRecebimentoCond",
  __ssrInlineRender: true,
  props: {
    show: Boolean,
    faltaReceber: Number
  },
  emits: ["close", "confirmar"],
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
    const confirmarRecebimento = () => {
      emit("confirmar");
      closeModal();
    };
    const closeModal = () => {
      isVisible.value = false;
      emit("close");
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
                              _push5(`<h1${_scopeId4}>Confirma\xE7\xE3o de Recebimento</h1>`);
                            } else {
                              return [
                                createVNode("h1", null, "Confirma\xE7\xE3o de Recebimento")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VRow, { class: "ml-2" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<p${_scopeId4}> O valor recebido \xE9 menor que o valor da OS, confirma o recebimento parcial? </p>`);
                            } else {
                              return [
                                createVNode("p", null, " O valor recebido \xE9 menor que o valor da OS, confirma o recebimento parcial? ")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VRow, { class: "mb-5 mt-1 ml-2" }, {
                            default: withCtx(() => [
                              createVNode("h1", null, "Confirma\xE7\xE3o de Recebimento")
                            ]),
                            _: 1
                          }),
                          createVNode(VRow, { class: "ml-2" }, {
                            default: withCtx(() => [
                              createVNode("p", null, " O valor recebido \xE9 menor que o valor da OS, confirma o recebimento parcial? ")
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
                          style: { "background-color": "#429946", "color": "white" },
                          onClick: confirmarRecebimento
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Confirmar`);
                            } else {
                              return [
                                createTextVNode("Confirmar")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VBtn, {
                          style: { "background-color": "red", "color": "white" },
                          onClick: closeModal
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Cancelar`);
                            } else {
                              return [
                                createTextVNode("Cancelar")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VBtn, {
                            style: { "background-color": "#429946", "color": "white" },
                            onClick: confirmarRecebimento
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Confirmar")
                            ]),
                            _: 1
                          }),
                          createVNode(VBtn, {
                            style: { "background-color": "red", "color": "white" },
                            onClick: closeModal
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Cancelar")
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
                    createVNode(VContainer, null, {
                      default: withCtx(() => [
                        createVNode(VRow, { class: "mb-5 mt-1 ml-2" }, {
                          default: withCtx(() => [
                            createVNode("h1", null, "Confirma\xE7\xE3o de Recebimento")
                          ]),
                          _: 1
                        }),
                        createVNode(VRow, { class: "ml-2" }, {
                          default: withCtx(() => [
                            createVNode("p", null, " O valor recebido \xE9 menor que o valor da OS, confirma o recebimento parcial? ")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(VCardActions, null, {
                      default: withCtx(() => [
                        createVNode(VBtn, {
                          style: { "background-color": "#429946", "color": "white" },
                          onClick: confirmarRecebimento
                        }, {
                          default: withCtx(() => [
                            createTextVNode("Confirmar")
                          ]),
                          _: 1
                        }),
                        createVNode(VBtn, {
                          style: { "background-color": "red", "color": "white" },
                          onClick: closeModal
                        }, {
                          default: withCtx(() => [
                            createTextVNode("Cancelar")
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
                  createVNode(VContainer, null, {
                    default: withCtx(() => [
                      createVNode(VRow, { class: "mb-5 mt-1 ml-2" }, {
                        default: withCtx(() => [
                          createVNode("h1", null, "Confirma\xE7\xE3o de Recebimento")
                        ]),
                        _: 1
                      }),
                      createVNode(VRow, { class: "ml-2" }, {
                        default: withCtx(() => [
                          createVNode("p", null, " O valor recebido \xE9 menor que o valor da OS, confirma o recebimento parcial? ")
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode(VCardActions, null, {
                    default: withCtx(() => [
                      createVNode(VBtn, {
                        style: { "background-color": "#429946", "color": "white" },
                        onClick: confirmarRecebimento
                      }, {
                        default: withCtx(() => [
                          createTextVNode("Confirmar")
                        ]),
                        _: 1
                      }),
                      createVNode(VBtn, {
                        style: { "background-color": "red", "color": "white" },
                        onClick: closeModal
                      }, {
                        default: withCtx(() => [
                          createTextVNode("Cancelar")
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
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ModalRecebimentoCond.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : undefined;
};
const _imports_1 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAABJhJREFUeJztW81v3EQcfTM73ZU3C1GF4NJAG+UGSKgSjZAgfwCFHnMpiAMSyckHGim2FAl8cSRvFFopApEixIW/APFx48IKCS5wQOKGGpqWAx/SqhslMY6HS1PZg+0de2fsSdN3m/HM6Ofn37zxPI8JNMO27Y5lWcuEkKsAngcwNabLHoBfOOefd7vdm57nhTrjIzoHX1tbOxdF0VcAXqg4xM+Msdd937+jMq4ktBFg23an2+3+gOo3f4yfLMt6SVcmUB2DAoBlWcuY/OYB4OL+/v47CsbJBNM1MCHkjWSZc/41gOV+v79b1G91dXWGEHITwKuJ6jcBfKg+So0ZAOBZoTz25gGg3+/vMsaWhern1IWVhk4CesmCzM0fw/f920LVY0oiyoBOAk4Exq4CjuNcAXANwCWMX8NNwR6AH+M4/mBjY+PLooatoouu664D+AjABQBtZeHpRxvALCHk6sLCwpnBYPBtXsPcDLj/5L/QEV3diOP4Sl4mFGnANU3x1A5K6bt514reA14Uyi8HQfC9mpD0wnGcVwB8l6i6lNe2KANSy9hJuXkACIJgIFTlLqOnfhl8REDTATSNU0+A9G7QcRyuM5CmcOozoIgA6d2b6eCci7vLBygiYAkPAQmc89uU0qW861KeoOM4OwCeOS5HUXRhc3NzR0F8yrCysnKeMXYrUfV7EATnx/WT1YBRssAY6+U1bAqdTkd827sn068SAZRS4wiIokiMaZTZUEAlAo6OjowjIOOhSBEg9R5ACBlxzpPlXAIcx3kNwDYADmApCIJv6mgXx3GPkJSkqcsAzvlIKBdlwMcAzgGY4Zxv19VOfCiEEKVTICUolNIil3YmEcTTNbZLxRTHsToRLJkBjUBrBlBKU4MVaUCDSDnWhJA9mU6yUyA1GOfcOHs8juPUQxGzNg+VpgA0fqmZAKmYtIqgiVNAjOmRCOoUQQiOsQkQH4pSDYjj2HgCIMTUarXUEcAYO3EimPHQMiFFwOHhoSgoxmVAhi6pE8F2u238FBBFMAxDdRkwGo2MJwBCTNPT0+oI2NraOgTwb6Kq7XmeMecFbNvuADiTqAplj9WVscVTjA6HQ2OyoNfrVTJDgBIEiOvqmC1xrQjDUD8B4puVScZohiGqngD83xQxhoAMQ1RqCQQm0ACTjNGqhigwwRQwaUcoegGoQwRN2hFW3QkCD8kqAGEfILsTBCYQQZMzADpE0HBjtJIhCpTLAGON0aqGKDCBBsAsT6CSIQpMQEDBFHhwqKLoZIbKdmIsTYvgEoDdcSczVLabRASlT4lRSlNfiJHjCdz/elv0DU95u6qGKFAiAww3RisZokA5DfhbqJr1PK/xY3aLi4stALPJuiiK/pHtL30DU1NTO0gvhU8dHBxcd133rOwYquG67tm5ubkbAJ5MVN8bDoe3ZMco9eeo4zifAni7TJ8G8EkQBEWimkKpFGaMvQfgr9Ih1Yc/W63W+2U6lCLA9/07hJDLAP4oFVY9uMs5v7y+vl4qtsK/xrIwGAzuzs/Pf8YYCznnTxBCHofGX3DH4ADArwC2CSFvBUHwW9kB/gMs68lWOHHFdwAAAABJRU5ErkJggg==";
const _sfc_main = {
  __name: "Ordem",
  __ssrInlineRender: true,
  props: {
    show: Boolean,
    ordem: { type: Object, required: true }
  },
  emits: ["close"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const { $toast } = useNuxtApp();
    const isVisible = ref(props.show);
    const isMoreOrLess = ref(false);
    const config = useRuntimeConfig();
    const listarFormasReceb = `${config.public.managemant}/listarFormasReceb`;
    const listarRecebimentos = `${config.public.managemant}/listar_recebimentos_os`;
    const routereceberOs = `${config.public.managemant}/receberOs`;
    const usuario_token = useCookie("auth_token").value;
    const formaItens = ref([]);
    const faltaReceber = ref(null);
    const selosItems = ref([]);
    const recebimentos = ref([]);
    const state = reactive({
      descricao: null,
      forma: null,
      valor: ""
    });
    const headers = [
      { title: "Forma", value: "descricao" },
      { title: "Valor", value: "valor" },
      { value: "actions" }
    ];
    const faltaReceberValorDeOrdem = ref(0);
    const calcularFaltaReceber = () => {
      faltaReceberValorDeOrdem.value = formatNumber(props.ordem.valor - props.ordem.valor_pago);
    };
    watch(() => props.show, async (newVal) => {
      isVisible.value = newVal;
      const { data } = await useFetch(listarRecebimentos, {
        method: "POST",
        body: { os_token: props.ordem.token }
      }, "$vhMIR8Sr2p");
      const responseData = Array.isArray(data.value) ? data.value : [];
      if (responseData) {
        selosItems.value = responseData.map(({ forma_recebimento, ...valores }) => ({
          descricao: forma_recebimento,
          ...valores
        }));
      }
      if (newVal) calcularFaltaReceber();
    });
    const closeModal = () => {
      isVisible.value = false;
      Object.assign(state, { forma: null, descricao: null, valor: "" });
      selosItems.value = [];
      emit("close");
    };
    const receberOsParcial = () => {
      faltaReceber.value = Number(props.ordem.valor);
      isMoreOrLess.value = true;
    };
    const realizarRecebimentoCompleto = async () => {
      try {
        const body = {
          ordemserv_token: props.ordem.token,
          usuario_token,
          recebimentos: [recebimentos.value]
        };
        const { data } = await useFetch(routereceberOs, {
          method: "POST",
          body
        }, "$eiMzO5y6Bb");
        if (data.value[0].status === "OK") {
          $toast.success(`${data.value[0].status}: Valores Recebidos com Sucesso!`);
          selosItems.value = [];
          closeModal();
        } else {
          $toast.error(data.value[0].status_mensagem);
        }
      } catch (error) {
        $toast.error(error);
      }
    };
    const formatDecimal = () => {
      props.ordem.valor = formatNumber(props.ordem.valor);
      props.ordem.valor_pago = formatNumber(props.ordem.valor_pago);
      faltaReceberValorDeOrdem.value = formatNumber(faltaReceberValorDeOrdem.value);
    };
    const formatNumber = (value) => Number(parseFloat(value).toFixed(2));
    const loadEscreventes = async () => {
      try {
        const cartorio_token = useCookie("user-data").value.cartorio_token;
        const body = { cartorio_token };
        const { data: forma } = await useFetch(listarFormasReceb, {
          method: "POST",
          body: JSON.stringify(body)
        }, "$7DferZWeQF");
        formaItens.value = toRaw(forma.value);
      } catch (error) {
        console.error("Erro ao carregar formas de pagamento:", error);
      }
    };
    const addNewRow = () => {
      const selectedForma = formaItens.value.find((f) => f.token === state.forma);
      if (!selectedForma) return $toast.error("Por favor, selecione uma forma.");
      const valor = parseCurrency(state.valor);
      selosItems.value.push({ forma: state.forma, descricao: selectedForma.descricao, valor });
      recebimentos.value.push({ forma_receb_token: state.forma, valor });
      props.ordem.valor_pago = formatNumber(props.ordem.valor_pago + valor);
      props.ordem.valor = formatNumber(props.ordem.valor - valor);
      faltaReceberValorDeOrdem.value = formatNumber(faltaReceberValorDeOrdem.value - valor);
      Object.assign(state, { forma: null, valor: "0.00" });
      formatDecimal();
    };
    const removeFormValueFromTable = (itemRemove) => {
      const index = selosItems.value.indexOf(itemRemove);
      if (index !== -1) {
        selosItems.value.splice(index, 1);
        recebimentos.value.splice(index, 1);
        const valor = parseCurrency(itemRemove.valor);
        props.ordem.valor_pago = formatNumber(props.ordem.valor_pago - valor);
        faltaReceberValorDeOrdem.value = formatNumber(faltaReceberValorDeOrdem.value + valor);
      }
      formatDecimal();
    };
    const parseCurrency = (value) => Number(value.toString().replace(/,/g, ""));
    loadEscreventes();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_MoneyInput = __nuxt_component_0;
      const _component_ModalRecebimentoCond = _sfc_main$1;
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
                              _push5(`<h1${_scopeId4}>Ordem de Servi\xE7o n\xBA</h1><h1 style="${ssrRenderStyle({ "color": "red", "margin-left": "18px" })}"${_scopeId4}>${ssrInterpolate(props.ordem.numero)}</h1>`);
                            } else {
                              return [
                                createVNode("h1", null, "Ordem de Servi\xE7o n\xBA"),
                                createVNode("h1", { style: { "color": "red", "margin-left": "18px" } }, toDisplayString(props.ordem.numero), 1)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VContainer, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VRow, null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(VTextField, {
                                      class: "mr-5",
                                      label: "Recebido",
                                      modelValue: props.ordem.valor_pago,
                                      "onUpdate:modelValue": ($event) => props.ordem.valor_pago = $event,
                                      readonly: "",
                                      style: { "font-weight": "bold", "cursor": "default", "pointer-events": "none" }
                                    }, null, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(VTextField, {
                                      label: "Falta Receber",
                                      modelValue: unref(faltaReceberValorDeOrdem),
                                      "onUpdate:modelValue": ($event) => isRef(faltaReceberValorDeOrdem) ? faltaReceberValorDeOrdem.value = $event : null,
                                      readonly: "",
                                      style: { "font-weight": "bold", "cursor": "default", "pointer-events": "none" }
                                    }, null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(VTextField, {
                                        class: "mr-5",
                                        label: "Recebido",
                                        modelValue: props.ordem.valor_pago,
                                        "onUpdate:modelValue": ($event) => props.ordem.valor_pago = $event,
                                        readonly: "",
                                        style: { "font-weight": "bold", "cursor": "default", "pointer-events": "none" }
                                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                                      createVNode(VTextField, {
                                        label: "Falta Receber",
                                        modelValue: unref(faltaReceberValorDeOrdem),
                                        "onUpdate:modelValue": ($event) => isRef(faltaReceberValorDeOrdem) ? faltaReceberValorDeOrdem.value = $event : null,
                                        readonly: "",
                                        style: { "font-weight": "bold", "cursor": "default", "pointer-events": "none" }
                                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(VRow, null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(VAutocomplete, {
                                      class: "mb-5 mr-5",
                                      label: "Forma",
                                      modelValue: unref(state).forma,
                                      "onUpdate:modelValue": ($event) => unref(state).forma = $event,
                                      items: unref(formaItens),
                                      "item-title": "descricao",
                                      "item-value": "token"
                                    }, null, _parent6, _scopeId5));
                                    _push6(`<div style="${ssrRenderStyle({ "max-width": "180px" })}"${_scopeId5}>`);
                                    _push6(ssrRenderComponent(_component_MoneyInput, {
                                      modelValue: unref(state).valor,
                                      "onUpdate:modelValue": ($event) => unref(state).valor = $event
                                    }, null, _parent6, _scopeId5));
                                    _push6(`</div><div${_scopeId5}><img${ssrRenderAttr("src", _imports_0)} class="ml-5" style="${ssrRenderStyle({ "cursor": "pointer", "height": "40px", "width": "40px" })}"${_scopeId5}></div>`);
                                  } else {
                                    return [
                                      createVNode(VAutocomplete, {
                                        class: "mb-5 mr-5",
                                        label: "Forma",
                                        modelValue: unref(state).forma,
                                        "onUpdate:modelValue": ($event) => unref(state).forma = $event,
                                        items: unref(formaItens),
                                        "item-title": "descricao",
                                        "item-value": "token"
                                      }, null, 8, ["modelValue", "onUpdate:modelValue", "items"]),
                                      createVNode("div", { style: { "max-width": "180px" } }, [
                                        createVNode(_component_MoneyInput, {
                                          modelValue: unref(state).valor,
                                          "onUpdate:modelValue": ($event) => unref(state).valor = $event
                                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                      ]),
                                      createVNode("div", null, [
                                        createVNode("img", {
                                          src: _imports_0,
                                          class: "ml-5",
                                          style: { "cursor": "pointer", "height": "40px", "width": "40px" },
                                          onClick: addNewRow
                                        })
                                      ])
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(VRow, null, {
                                  default: withCtx(() => [
                                    createVNode(VTextField, {
                                      class: "mr-5",
                                      label: "Recebido",
                                      modelValue: props.ordem.valor_pago,
                                      "onUpdate:modelValue": ($event) => props.ordem.valor_pago = $event,
                                      readonly: "",
                                      style: { "font-weight": "bold", "cursor": "default", "pointer-events": "none" }
                                    }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                                    createVNode(VTextField, {
                                      label: "Falta Receber",
                                      modelValue: unref(faltaReceberValorDeOrdem),
                                      "onUpdate:modelValue": ($event) => isRef(faltaReceberValorDeOrdem) ? faltaReceberValorDeOrdem.value = $event : null,
                                      readonly: "",
                                      style: { "font-weight": "bold", "cursor": "default", "pointer-events": "none" }
                                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                  ]),
                                  _: 1
                                }),
                                createVNode(VRow, null, {
                                  default: withCtx(() => [
                                    createVNode(VAutocomplete, {
                                      class: "mb-5 mr-5",
                                      label: "Forma",
                                      modelValue: unref(state).forma,
                                      "onUpdate:modelValue": ($event) => unref(state).forma = $event,
                                      items: unref(formaItens),
                                      "item-title": "descricao",
                                      "item-value": "token"
                                    }, null, 8, ["modelValue", "onUpdate:modelValue", "items"]),
                                    createVNode("div", { style: { "max-width": "180px" } }, [
                                      createVNode(_component_MoneyInput, {
                                        modelValue: unref(state).valor,
                                        "onUpdate:modelValue": ($event) => unref(state).valor = $event
                                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                    ]),
                                    createVNode("div", null, [
                                      createVNode("img", {
                                        src: _imports_0,
                                        class: "ml-5",
                                        style: { "cursor": "pointer", "height": "40px", "width": "40px" },
                                        onClick: addNewRow
                                      })
                                    ])
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`<hr class="mb-5"${_scopeId3}>`);
                        _push4(ssrRenderComponent(VDataTable, {
                          headers,
                          items: unref(selosItems),
                          "item-value": "token"
                        }, {
                          "item.forma": withCtx(({ item }, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`${ssrInterpolate(item.descricao)}`);
                            } else {
                              return [
                                createTextVNode(toDisplayString(item.descricao), 1)
                              ];
                            }
                          }),
                          "item.actions": withCtx(({ item }, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<div style="${ssrRenderStyle({ "display": "flex", "justify-content": "flex-end" })}" title="Remover"${_scopeId4}><img${ssrRenderAttr("src", _imports_1)} style="${ssrRenderStyle({ "width": "30px", "height": "30px", "cursor": "pointer" })}" alt="Remover"${_scopeId4}></div>`);
                            } else {
                              return [
                                createVNode("div", {
                                  style: { "display": "flex", "justify-content": "flex-end" },
                                  onClick: ($event) => removeFormValueFromTable(item),
                                  title: "Remover"
                                }, [
                                  createVNode("img", {
                                    src: _imports_1,
                                    style: { "width": "30px", "height": "30px", "cursor": "pointer" },
                                    alt: "Remover"
                                  })
                                ], 8, ["onClick"])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VRow, { class: "mb-5 mt-1 ml-2" }, {
                            default: withCtx(() => [
                              createVNode("h1", null, "Ordem de Servi\xE7o n\xBA"),
                              createVNode("h1", { style: { "color": "red", "margin-left": "18px" } }, toDisplayString(props.ordem.numero), 1)
                            ]),
                            _: 1
                          }),
                          createVNode(VContainer, null, {
                            default: withCtx(() => [
                              createVNode(VRow, null, {
                                default: withCtx(() => [
                                  createVNode(VTextField, {
                                    class: "mr-5",
                                    label: "Recebido",
                                    modelValue: props.ordem.valor_pago,
                                    "onUpdate:modelValue": ($event) => props.ordem.valor_pago = $event,
                                    readonly: "",
                                    style: { "font-weight": "bold", "cursor": "default", "pointer-events": "none" }
                                  }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                                  createVNode(VTextField, {
                                    label: "Falta Receber",
                                    modelValue: unref(faltaReceberValorDeOrdem),
                                    "onUpdate:modelValue": ($event) => isRef(faltaReceberValorDeOrdem) ? faltaReceberValorDeOrdem.value = $event : null,
                                    readonly: "",
                                    style: { "font-weight": "bold", "cursor": "default", "pointer-events": "none" }
                                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                ]),
                                _: 1
                              }),
                              createVNode(VRow, null, {
                                default: withCtx(() => [
                                  createVNode(VAutocomplete, {
                                    class: "mb-5 mr-5",
                                    label: "Forma",
                                    modelValue: unref(state).forma,
                                    "onUpdate:modelValue": ($event) => unref(state).forma = $event,
                                    items: unref(formaItens),
                                    "item-title": "descricao",
                                    "item-value": "token"
                                  }, null, 8, ["modelValue", "onUpdate:modelValue", "items"]),
                                  createVNode("div", { style: { "max-width": "180px" } }, [
                                    createVNode(_component_MoneyInput, {
                                      modelValue: unref(state).valor,
                                      "onUpdate:modelValue": ($event) => unref(state).valor = $event
                                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                  ]),
                                  createVNode("div", null, [
                                    createVNode("img", {
                                      src: _imports_0,
                                      class: "ml-5",
                                      style: { "cursor": "pointer", "height": "40px", "width": "40px" },
                                      onClick: addNewRow
                                    })
                                  ])
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode("hr", { class: "mb-5" }),
                          createVNode(VDataTable, {
                            headers,
                            items: unref(selosItems),
                            "item-value": "token"
                          }, {
                            "item.forma": withCtx(({ item }) => [
                              createTextVNode(toDisplayString(item.descricao), 1)
                            ]),
                            "item.actions": withCtx(({ item }) => [
                              createVNode("div", {
                                style: { "display": "flex", "justify-content": "flex-end" },
                                onClick: ($event) => removeFormValueFromTable(item),
                                title: "Remover"
                              }, [
                                createVNode("img", {
                                  src: _imports_1,
                                  style: { "width": "30px", "height": "30px", "cursor": "pointer" },
                                  alt: "Remover"
                                })
                              ], 8, ["onClick"])
                            ]),
                            _: 1
                          }, 8, ["items"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<div style="${ssrRenderStyle({ "display": "flex", "justify-content": "flex-start" })}"${_scopeId2}>`);
                  _push3(ssrRenderComponent(VBtn, {
                    class: "ml-8",
                    size: "large",
                    onClick: closeModal,
                    color: "red"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Voltar`);
                      } else {
                        return [
                          createTextVNode("Voltar")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VBtn, {
                    size: "large",
                    class: "ml-6 mb-6",
                    color: "green",
                    onClick: ($event) => props.ordem.valor > 0 ? receberOsParcial() : realizarRecebimentoCompleto()
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Salvar `);
                      } else {
                        return [
                          createTextVNode(" Salvar ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode(VContainer, null, {
                      default: withCtx(() => [
                        createVNode(VRow, { class: "mb-5 mt-1 ml-2" }, {
                          default: withCtx(() => [
                            createVNode("h1", null, "Ordem de Servi\xE7o n\xBA"),
                            createVNode("h1", { style: { "color": "red", "margin-left": "18px" } }, toDisplayString(props.ordem.numero), 1)
                          ]),
                          _: 1
                        }),
                        createVNode(VContainer, null, {
                          default: withCtx(() => [
                            createVNode(VRow, null, {
                              default: withCtx(() => [
                                createVNode(VTextField, {
                                  class: "mr-5",
                                  label: "Recebido",
                                  modelValue: props.ordem.valor_pago,
                                  "onUpdate:modelValue": ($event) => props.ordem.valor_pago = $event,
                                  readonly: "",
                                  style: { "font-weight": "bold", "cursor": "default", "pointer-events": "none" }
                                }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                                createVNode(VTextField, {
                                  label: "Falta Receber",
                                  modelValue: unref(faltaReceberValorDeOrdem),
                                  "onUpdate:modelValue": ($event) => isRef(faltaReceberValorDeOrdem) ? faltaReceberValorDeOrdem.value = $event : null,
                                  readonly: "",
                                  style: { "font-weight": "bold", "cursor": "default", "pointer-events": "none" }
                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                              ]),
                              _: 1
                            }),
                            createVNode(VRow, null, {
                              default: withCtx(() => [
                                createVNode(VAutocomplete, {
                                  class: "mb-5 mr-5",
                                  label: "Forma",
                                  modelValue: unref(state).forma,
                                  "onUpdate:modelValue": ($event) => unref(state).forma = $event,
                                  items: unref(formaItens),
                                  "item-title": "descricao",
                                  "item-value": "token"
                                }, null, 8, ["modelValue", "onUpdate:modelValue", "items"]),
                                createVNode("div", { style: { "max-width": "180px" } }, [
                                  createVNode(_component_MoneyInput, {
                                    modelValue: unref(state).valor,
                                    "onUpdate:modelValue": ($event) => unref(state).valor = $event
                                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                ]),
                                createVNode("div", null, [
                                  createVNode("img", {
                                    src: _imports_0,
                                    class: "ml-5",
                                    style: { "cursor": "pointer", "height": "40px", "width": "40px" },
                                    onClick: addNewRow
                                  })
                                ])
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        createVNode("hr", { class: "mb-5" }),
                        createVNode(VDataTable, {
                          headers,
                          items: unref(selosItems),
                          "item-value": "token"
                        }, {
                          "item.forma": withCtx(({ item }) => [
                            createTextVNode(toDisplayString(item.descricao), 1)
                          ]),
                          "item.actions": withCtx(({ item }) => [
                            createVNode("div", {
                              style: { "display": "flex", "justify-content": "flex-end" },
                              onClick: ($event) => removeFormValueFromTable(item),
                              title: "Remover"
                            }, [
                              createVNode("img", {
                                src: _imports_1,
                                style: { "width": "30px", "height": "30px", "cursor": "pointer" },
                                alt: "Remover"
                              })
                            ], 8, ["onClick"])
                          ]),
                          _: 1
                        }, 8, ["items"])
                      ]),
                      _: 1
                    }),
                    createVNode("div", { style: { "display": "flex", "justify-content": "flex-start" } }, [
                      createVNode(VBtn, {
                        class: "ml-8",
                        size: "large",
                        onClick: closeModal,
                        color: "red"
                      }, {
                        default: withCtx(() => [
                          createTextVNode("Voltar")
                        ]),
                        _: 1
                      }),
                      createVNode(VBtn, {
                        size: "large",
                        class: "ml-6 mb-6",
                        color: "green",
                        onClick: ($event) => props.ordem.valor > 0 ? receberOsParcial() : realizarRecebimentoCompleto()
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Salvar ")
                        ]),
                        _: 1
                      }, 8, ["onClick"])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_ModalRecebimentoCond, {
              modelValue: unref(isMoreOrLess),
              "onUpdate:modelValue": ($event) => isRef(isMoreOrLess) ? isMoreOrLess.value = $event : null,
              faltaReceber: unref(faltaReceber),
              onClose: ($event) => isMoreOrLess.value = false,
              onConfirmar: realizarRecebimentoCompleto
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(VCard, null, {
                default: withCtx(() => [
                  createVNode(VContainer, null, {
                    default: withCtx(() => [
                      createVNode(VRow, { class: "mb-5 mt-1 ml-2" }, {
                        default: withCtx(() => [
                          createVNode("h1", null, "Ordem de Servi\xE7o n\xBA"),
                          createVNode("h1", { style: { "color": "red", "margin-left": "18px" } }, toDisplayString(props.ordem.numero), 1)
                        ]),
                        _: 1
                      }),
                      createVNode(VContainer, null, {
                        default: withCtx(() => [
                          createVNode(VRow, null, {
                            default: withCtx(() => [
                              createVNode(VTextField, {
                                class: "mr-5",
                                label: "Recebido",
                                modelValue: props.ordem.valor_pago,
                                "onUpdate:modelValue": ($event) => props.ordem.valor_pago = $event,
                                readonly: "",
                                style: { "font-weight": "bold", "cursor": "default", "pointer-events": "none" }
                              }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                              createVNode(VTextField, {
                                label: "Falta Receber",
                                modelValue: unref(faltaReceberValorDeOrdem),
                                "onUpdate:modelValue": ($event) => isRef(faltaReceberValorDeOrdem) ? faltaReceberValorDeOrdem.value = $event : null,
                                readonly: "",
                                style: { "font-weight": "bold", "cursor": "default", "pointer-events": "none" }
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            _: 1
                          }),
                          createVNode(VRow, null, {
                            default: withCtx(() => [
                              createVNode(VAutocomplete, {
                                class: "mb-5 mr-5",
                                label: "Forma",
                                modelValue: unref(state).forma,
                                "onUpdate:modelValue": ($event) => unref(state).forma = $event,
                                items: unref(formaItens),
                                "item-title": "descricao",
                                "item-value": "token"
                              }, null, 8, ["modelValue", "onUpdate:modelValue", "items"]),
                              createVNode("div", { style: { "max-width": "180px" } }, [
                                createVNode(_component_MoneyInput, {
                                  modelValue: unref(state).valor,
                                  "onUpdate:modelValue": ($event) => unref(state).valor = $event
                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                              ]),
                              createVNode("div", null, [
                                createVNode("img", {
                                  src: _imports_0,
                                  class: "ml-5",
                                  style: { "cursor": "pointer", "height": "40px", "width": "40px" },
                                  onClick: addNewRow
                                })
                              ])
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode("hr", { class: "mb-5" }),
                      createVNode(VDataTable, {
                        headers,
                        items: unref(selosItems),
                        "item-value": "token"
                      }, {
                        "item.forma": withCtx(({ item }) => [
                          createTextVNode(toDisplayString(item.descricao), 1)
                        ]),
                        "item.actions": withCtx(({ item }) => [
                          createVNode("div", {
                            style: { "display": "flex", "justify-content": "flex-end" },
                            onClick: ($event) => removeFormValueFromTable(item),
                            title: "Remover"
                          }, [
                            createVNode("img", {
                              src: _imports_1,
                              style: { "width": "30px", "height": "30px", "cursor": "pointer" },
                              alt: "Remover"
                            })
                          ], 8, ["onClick"])
                        ]),
                        _: 1
                      }, 8, ["items"])
                    ]),
                    _: 1
                  }),
                  createVNode("div", { style: { "display": "flex", "justify-content": "flex-start" } }, [
                    createVNode(VBtn, {
                      class: "ml-8",
                      size: "large",
                      onClick: closeModal,
                      color: "red"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Voltar")
                      ]),
                      _: 1
                    }),
                    createVNode(VBtn, {
                      size: "large",
                      class: "ml-6 mb-6",
                      color: "green",
                      onClick: ($event) => props.ordem.valor > 0 ? receberOsParcial() : realizarRecebimentoCompleto()
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Salvar ")
                      ]),
                      _: 1
                    }, 8, ["onClick"])
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_ModalRecebimentoCond, {
                modelValue: unref(isMoreOrLess),
                "onUpdate:modelValue": ($event) => isRef(isMoreOrLess) ? isMoreOrLess.value = $event : null,
                faltaReceber: unref(faltaReceber),
                onClose: ($event) => isMoreOrLess.value = false,
                onConfirmar: realizarRecebimentoCompleto
              }, null, 8, ["modelValue", "onUpdate:modelValue", "faltaReceber", "onClose"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Recebimento/Ordem.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : undefined;
};

export { _sfc_main as _ };
//# sourceMappingURL=Ordem-XDAd9bR1.mjs.map
