import { _ as _sfc_main$2 } from './TiposAtos-CQwkAZsB.mjs';
import { _ as _imports_3, a as _sfc_main$3 } from './Selos-C-3uEi7u.mjs';
import { _ as _sfc_main$4 } from './Ordem-Bi-SbRCz.mjs';
import { _ as __nuxt_component_1 } from './Confirmacao-BqR7T8Ab.mjs';
import { ref, reactive, resolveDirective, withCtx, createVNode, mergeProps, unref, withDirectives, useSSRContext, watch, isRef, createTextVNode, toDisplayString } from 'vue';
import { ssrRenderComponent, ssrGetDirectiveProps, ssrRenderStyle, ssrRenderAttr, ssrRenderClass, ssrInterpolate } from 'vue/server-renderer';
import { useVuelidate } from '@vuelidate/core';
import { helpers, required } from '@vuelidate/validators';
import { _ as _export_sfc, b as useNuxtApp, e as useCookie, f as VTextField, c as useRuntimeConfig, V as VBtn } from './server.mjs';
import { u as useFetch } from './fetch-uf6n1sXR.mjs';
import { V as VDialog } from './VDialog-BVe31KMa.mjs';
import { V as VCard, a as VCardText } from './VCard-DfXRXpQ0.mjs';
import { V as VContainer } from './VContainer-CUysD4sO.mjs';
import { V as VRow } from './VRow-Bqz0CuIN.mjs';
import { V as VTextarea } from './VTextarea-DJCeftNm.mjs';
import { _ as _imports_1 } from './visualizar-BoZ30DMV.mjs';
import { _ as _imports_1$1 } from './editar-BcGPsVK2.mjs';
import { _ as _imports_5 } from './btn_cancela_lavratura-LRoFRHHt.mjs';
import { _ as _imports_2 } from './escanear-CJoLAgRx.mjs';
import { u as useRedirectTo } from './redirectTo-ChNiqiFi.mjs';
import { f as formatDate } from './formatDate-DflkuJ_V.mjs';
import { V as VCol } from './VCol-BT4RzX0Q.mjs';
import { V as VAutocomplete } from './VAutocomplete-C8djLHoj.mjs';
import { V as VDataTable } from './VDataTable-C_f4_7jt.mjs';
import '../routes/renderer.mjs';
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
import './MoneyInput-ot-UsY0X.mjs';
import 'v-money3';
import './novo-CWU3oYa5.mjs';
import './excluido-D7FHZla7.mjs';
import 'pinia';
import 'vue-router';
import 'vue3-toastify';
import 'vue-the-mask';
import './asyncData-B8plM1p3.mjs';
import './VAvatar-DbYv82M1.mjs';
import './VImg-DADPV1UJ.mjs';
import './VResponsive-BwPb2GHE.mjs';
import './filter-bkfdtiUs.mjs';
import './VList-D_RDxmYC.mjs';
import './VDivider-BxKHtM2e.mjs';
import './VSelectionControl-DI6QefPE.mjs';

const analiseCancela = "O cancelamento de atos \xE9 definitivo e n\xE3o pode ser revertido. Informe o motivo do cancelamento para confirmar";
const _sfc_main$1 = {
  __name: "CancelamentoAto",
  __ssrInlineRender: true,
  props: {
    show: Boolean,
    ato_token: String
  },
  emits: ["close"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const isVisible = ref(props.show);
    const config = useRuntimeConfig();
    const { $toast } = useNuxtApp();
    const usuario_token = ref(useCookie("auth_token").value);
    const cancelaLavratura = `${config.public.managemant}/cancela_lavratura`;
    const state = reactive({
      motivo: null
    });
    const emit = __emit;
    const rules = {
      motivo: {
        required: helpers.withMessage("O campo \xE9 obrigatorio", required)
      }
    };
    const v$ = useVuelidate(rules, state);
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
    const cancelaAto = async () => {
      var _a, _b;
      if (await v$.value.$validate()) {
        try {
          const { data, status } = await useFetch(cancelaLavratura, {
            method: "POST",
            body: {
              ato_token: props.ato_token,
              user_token: usuario_token.value,
              cancelar_selo: false,
              motivo_cancelamento: state.motivo
            }
          }, "$VPLGcUZMk8");
          if (status.value === "success" && Array.isArray(data.value) && ((_a = data.value[0]) == null ? void 0 : _a.status) === "OK") {
            $toast.success("Ato cancelado com sucesso!");
            closeModal();
          } else if (Array.isArray(data.value) && ((_b = data.value[0]) == null ? void 0 : _b.status) === "ERRO") {
            $toast.error(data.value[0].status_mensagem || "Erro ao cancelar ato");
          } else {
            $toast.error("Erro inesperado ao cancelar ato");
          }
        } catch (error) {
          console.error("Erro ao cancelar ato:", error);
          $toast.error("Erro ao cancelar ato");
        }
      }
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
                              _push5(`<h1${_scopeId4}>Cancelamento de Ato</h1><h1 style="${ssrRenderStyle({ "color": "red", "margin-left": "18px" })}"${_scopeId4}></h1>`);
                            } else {
                              return [
                                createVNode("h1", null, "Cancelamento de Ato"),
                                createVNode("h1", { style: { "color": "red", "margin-left": "18px" } })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VContainer, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VCard, {
                                variant: "outlined",
                                class: "mb-5"
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(VCardText, null, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`${ssrInterpolate(analiseCancela)}`);
                                        } else {
                                          return [
                                            createTextVNode(toDisplayString(analiseCancela))
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(VCardText, null, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(analiseCancela))
                                        ]),
                                        _: 1
                                      })
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(VTextarea, {
                                label: "Motivo",
                                modelValue: unref(state).motivo,
                                "onUpdate:modelValue": ($event) => unref(state).motivo = $event,
                                required: "",
                                "error-messages": unref(v$).motivo.$errors.map((e) => e.$message),
                                onBlur: unref(v$).motivo.$touch,
                                onInput: unref(v$).motivo.$touch
                              }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(VCard, {
                                  variant: "outlined",
                                  class: "mb-5"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(VCardText, null, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(analiseCancela))
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }),
                                createVNode(VTextarea, {
                                  label: "Motivo",
                                  modelValue: unref(state).motivo,
                                  "onUpdate:modelValue": ($event) => unref(state).motivo = $event,
                                  required: "",
                                  "error-messages": unref(v$).motivo.$errors.map((e) => e.$message),
                                  onBlur: unref(v$).motivo.$touch,
                                  onInput: unref(v$).motivo.$touch
                                }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages", "onBlur", "onInput"])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VRow, { class: "mb-5 mt-1 ml-2" }, {
                            default: withCtx(() => [
                              createVNode("h1", null, "Cancelamento de Ato"),
                              createVNode("h1", { style: { "color": "red", "margin-left": "18px" } })
                            ]),
                            _: 1
                          }),
                          createVNode(VContainer, null, {
                            default: withCtx(() => [
                              createVNode(VCard, {
                                variant: "outlined",
                                class: "mb-5"
                              }, {
                                default: withCtx(() => [
                                  createVNode(VCardText, null, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(analiseCancela))
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }),
                              createVNode(VTextarea, {
                                label: "Motivo",
                                modelValue: unref(state).motivo,
                                "onUpdate:modelValue": ($event) => unref(state).motivo = $event,
                                required: "",
                                "error-messages": unref(v$).motivo.$errors.map((e) => e.$message),
                                onBlur: unref(v$).motivo.$touch,
                                onInput: unref(v$).motivo.$touch
                              }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages", "onBlur", "onInput"])
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<div class="mb-5" style="${ssrRenderStyle({ "display": "flex", "justify-content": "flex-start" })}"${_scopeId2}><div class="ml-6"${_scopeId2}>`);
                  _push3(ssrRenderComponent(VBtn, {
                    size: "large",
                    color: "red",
                    onClick: closeModal
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Fechar`);
                      } else {
                        return [
                          createTextVNode("Fechar")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div><div class="ml-6"${_scopeId2}>`);
                  _push3(ssrRenderComponent(VBtn, {
                    size: "large",
                    color: "green",
                    disabled: !unref(state).motivo || unref(state).motivo.trim() === "",
                    onClick: cancelaAto
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
                  _push3(`</div></div>`);
                } else {
                  return [
                    createVNode(VContainer, null, {
                      default: withCtx(() => [
                        createVNode(VRow, { class: "mb-5 mt-1 ml-2" }, {
                          default: withCtx(() => [
                            createVNode("h1", null, "Cancelamento de Ato"),
                            createVNode("h1", { style: { "color": "red", "margin-left": "18px" } })
                          ]),
                          _: 1
                        }),
                        createVNode(VContainer, null, {
                          default: withCtx(() => [
                            createVNode(VCard, {
                              variant: "outlined",
                              class: "mb-5"
                            }, {
                              default: withCtx(() => [
                                createVNode(VCardText, null, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(analiseCancela))
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }),
                            createVNode(VTextarea, {
                              label: "Motivo",
                              modelValue: unref(state).motivo,
                              "onUpdate:modelValue": ($event) => unref(state).motivo = $event,
                              required: "",
                              "error-messages": unref(v$).motivo.$errors.map((e) => e.$message),
                              onBlur: unref(v$).motivo.$touch,
                              onInput: unref(v$).motivo.$touch
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages", "onBlur", "onInput"])
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode("div", {
                      class: "mb-5",
                      style: { "display": "flex", "justify-content": "flex-start" }
                    }, [
                      createVNode("div", { class: "ml-6" }, [
                        createVNode(VBtn, {
                          size: "large",
                          color: "red",
                          onClick: closeModal
                        }, {
                          default: withCtx(() => [
                            createTextVNode("Fechar")
                          ]),
                          _: 1
                        })
                      ]),
                      createVNode("div", { class: "ml-6" }, [
                        createVNode(VBtn, {
                          size: "large",
                          color: "green",
                          disabled: !unref(state).motivo || unref(state).motivo.trim() === "",
                          onClick: cancelaAto
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Salvar ")
                          ]),
                          _: 1
                        }, 8, ["disabled"])
                      ])
                    ])
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
                          createVNode("h1", null, "Cancelamento de Ato"),
                          createVNode("h1", { style: { "color": "red", "margin-left": "18px" } })
                        ]),
                        _: 1
                      }),
                      createVNode(VContainer, null, {
                        default: withCtx(() => [
                          createVNode(VCard, {
                            variant: "outlined",
                            class: "mb-5"
                          }, {
                            default: withCtx(() => [
                              createVNode(VCardText, null, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(analiseCancela))
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(VTextarea, {
                            label: "Motivo",
                            modelValue: unref(state).motivo,
                            "onUpdate:modelValue": ($event) => unref(state).motivo = $event,
                            required: "",
                            "error-messages": unref(v$).motivo.$errors.map((e) => e.$message),
                            onBlur: unref(v$).motivo.$touch,
                            onInput: unref(v$).motivo.$touch
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages", "onBlur", "onInput"])
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode("div", {
                    class: "mb-5",
                    style: { "display": "flex", "justify-content": "flex-start" }
                  }, [
                    createVNode("div", { class: "ml-6" }, [
                      createVNode(VBtn, {
                        size: "large",
                        color: "red",
                        onClick: closeModal
                      }, {
                        default: withCtx(() => [
                          createTextVNode("Fechar")
                        ]),
                        _: 1
                      })
                    ]),
                    createVNode("div", { class: "ml-6" }, [
                      createVNode(VBtn, {
                        size: "large",
                        color: "green",
                        disabled: !unref(state).motivo || unref(state).motivo.trim() === "",
                        onClick: cancelaAto
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Salvar ")
                        ]),
                        _: 1
                      }, 8, ["disabled"])
                    ])
                  ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Modal/CancelamentoAto.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : undefined;
};
const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const config = useRuntimeConfig();
    const { $toast } = useNuxtApp();
    const allUsuarios = `${config.public.managemant}/listarUsuarios`;
    const allTiposAtos = `${config.public.managemant}/listar_tipo_atos`;
    const acionarScanner = `${config.public.biometria}/run-scanner?format=pdf`;
    const viewDoc = `${config.public.envioDoc}/upload`;
    `${config.public.managemant}/updateAtos`;
    const pesquisaAtos = `${config.public.managemant}/pesquisaAtos`;
    const { redirectTo } = useRedirectTo();
    const usuario_token = ref(useCookie("auth_token").value) || null;
    const cartorio_token = ref(useCookie("user-data").value.cartorio_token) || null;
    const modalVisible = ref(false);
    const atos = ref([]);
    const usuariosItems = ref([]);
    const tipoAtosItems = ref([]);
    const situacaoItems = ref(["PENDENTE", "EM ANDAMENTO", "CONCLU\xCDDA", "LAVRADA"]);
    const isModalRecebimentoOpen = ref(false);
    const isModalCancelamentoOpen = ref(false);
    const isModalCancelamentoAtoOpen = ref(false);
    const numero_os = ref(null);
    const selectedOrder = ref({});
    const isModalReimprimirOpen = ref(false);
    const ato_token = ref(null);
    const state = reactive({
      numero: null,
      data_inicio: getCurrentDate(),
      data_fim: getCurrentDate(),
      data_lavratura_inicio: null,
      data_lavratura_fim: null,
      protocolo: null,
      parte: null,
      livro: null,
      folha: null,
      situacao: null,
      usuario_token: usuario_token.value,
      selo: null,
      ato_tipo_token: null,
      apresentante_cpf: null,
      apresentante_nome: null,
      valor: null
    });
    const headers = [
      {
        title: "ID/Protocolo",
        key: "protocoloId",
        width: "70px",
        value: (item) => item.protocolo ? `${item.id}
${item.protocolo}` : `${item.id}`,
        cellProps: {
          style: {
            whiteSpace: "pre-line",
            lineHeight: "2"
          }
        }
      },
      {
        title: "Abertura/CPF",
        key: "aberturaCpf",
        value: (item) => item.dt_abertura ? `${item.dt_abertura}
${item.apresentante_cpf}` : `${item.apresentante_cpf}`,
        cellProps: {
          style: {
            whiteSpace: "pre-line",
            lineHeight: "2"
          }
        }
      },
      {
        title: "Data lavratura/Parte",
        key: "lavraturaNome",
        value: (item) => item.dt_lavratura ? `${item.dt_lavratura}
${item.apresentante_nome}` : `${item.apresentante_nome}`,
        cellProps: {
          style: {
            whiteSpace: "pre-line",
            lineHeight: "2"
          }
        }
      },
      { title: "N\xB0 OS", value: "numero_os" },
      { title: "Usuario", value: "usuario_nome" },
      {
        title: "Situa\xE7\xE3o/Servi\xE7o",
        key: "situacaoServico",
        value: (item) => item.situacao ? `${item.situacao}
${item.ato_servico}` : `${item.ato_servico}`,
        cellProps: {
          style: {
            whiteSpace: "pre-line",
            lineHeight: "2"
          }
        }
      },
      { title: "Livro", value: "livro_numero" },
      { title: "Folha", value: "folha" },
      { title: "Valor", value: "valor" },
      { title: "A\xE7\xF5es", value: "actions" }
    ];
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
    async function atosPayload() {
      const pesquisaSalva = sessionStorage.getItem("pesquisaAto");
      const dadosRestaurados = JSON.parse(pesquisaSalva);
      const { data: atosData } = await useFetch(pesquisaAtos, {
        method: "POST",
        body: {
          cartorio_token: useCookie("user-data").value.cartorio_token,
          usuario_token: dadosRestaurados.usuario_token || usuario_token.value,
          data_fim: convertToISODate(dadosRestaurados == null ? undefined : dadosRestaurados.data_fim),
          data_inicio: convertToISODate(dadosRestaurados == null ? undefined : dadosRestaurados.data_inicio)
        }
      }, "$1U9Iv6Es1X");
      if (atosData.value.length > 0) {
        atos.value = atosData.value.map((item) => {
          return {
            ...item,
            dt_lavratura: item.dt_lavratura ? formatDate(item.dt_lavratura, "dd/mm/yyyy hh:mm") : null,
            dt_abertura: formatDate(item.dt_abertura, "dd/mm/yyyy")
          };
        });
      }
    }
    async function usuariosDataPayload() {
      const { data: usuarioData } = await useFetch(allUsuarios, {
        method: "POST",
        body: {
          cartorio_token: cartorio_token.value
        }
      }, "$hvipqUJYtS");
      usuariosItems.value = usuarioData.value;
    }
    async function searchAtos() {
      try {
        sessionStorage.setItem("pesquisaAto", JSON.stringify(state));
        const { data: atosData } = await useFetch(pesquisaAtos, {
          method: "POST",
          body: {
            cartorio_token: cartorio_token.value,
            numero_os: state.numero || null,
            data_inicio: convertToISODate(state.data_inicio) || null,
            data_fim: convertToISODate(state.data_fim) || null,
            data_lavratura_inicio: convertToISODate(state.data_lavratura_inicio) || null,
            data_lavratura_fim: convertToISODate(state.data_lavratura_fim) || null,
            protocolo: state.protocolo || null,
            livro: state.livro || null,
            folha: state.folha || null,
            situacao: state.situacao || null,
            usuario_token: state.usuario_token,
            selo: state.selo || null,
            ato_tipo_token: state.ato_tipo_token,
            parte: state.parte || null
          }
        }, "$OjamgBH6nj");
        if (atosData.value.length > 0) {
          atos.value = atosData.value.map((item) => {
            return {
              ...item,
              dt_lavratura: item.dt_lavratura ? formatDate(item.dt_lavratura, "dd/mm/yyyy hh:mm") : null,
              dt_abertura: item.dt_abertura ? formatDate(item.dt_abertura, "dd/mm/yyyy") : null
            };
          });
        } else {
          atos.value = [];
          $toast.error("N\xE3o existe ato Registrado!");
        }
      } catch (error) {
        console.error("Erro na requisi\xE7\xE3o", error);
      }
    }
    const redirectToView = (item) => {
      redirectTo({
        item,
        id: item.id,
        numeroOs: item.numero_os,
        origem: "vizualizar-lista"
      });
    };
    async function tipoAtosDataPayload() {
      const { data: tipoAtosData, error } = await useFetch(allTiposAtos, {
        method: "POST",
        body: {
          cartorio_token: cartorio_token.value,
          usuario_token: usuario_token.value,
          tipo_retorno: "servico_ato"
        }
      }, "$QxIfw0Zxe4");
      tipoAtosItems.value = tipoAtosData.value;
    }
    const redirectToModalReimprimir = (token) => {
      ato_token.value = token;
      isModalReimprimirOpen.value = true;
    };
    function redirectToCancelamento(item) {
      numero_os.value = item.numero;
      ato_token.value = item.token;
      isModalCancelamentoAtoOpen.value = true;
    }
    const redirectToUpdateAto = (item) => {
      redirectTo({
        item,
        id: item.id,
        numeroOs: item.numero_os,
        origem: "atualizar-lista"
      });
    };
    const digitalizeDocument = async (token) => {
      try {
        await openScanner();
        await enviarArquivo(token);
      } catch (error) {
        console.error("Erro ao executar scanner ou listar arquivos:", error);
      }
    };
    async function enviarArquivo(ato_token2) {
      try {
        const { status, data } = await useFetch(viewDoc, {
          method: "POST",
          body: {
            tipo: "ato_livro",
            token: ato_token2,
            cartorio_token: useCookie("user-data").value.cartorio_token
          }
        }, "$ceiptlfDNO");
        if (status.value === "success") {
          $toast.success("Arquivo enviado com sucesso!");
        }
      } catch (error) {
        $toast.error(error);
        console.error("Erro ao enviar o arquivo:", error);
      }
    }
    async function openScanner() {
      try {
        const { data } = await useFetch(acionarScanner, { method: "GET" }, "$zTNfED00Fu");
      } catch (error) {
        $toast.error("Erro ao acionar o scanner:", error);
      }
    }
    usuariosDataPayload();
    tipoAtosDataPayload();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ModalTiposAtos = _sfc_main$2;
      const _component_ReimpressaoSelos = _sfc_main$3;
      const _component_RecebimentoOrdem = _sfc_main$4;
      const _component_ModalConfirmacao = __nuxt_component_1;
      const _component_ModalCancelamentoAto = _sfc_main$1;
      const _directive_mask = resolveDirective("mask");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(VContainer, { class: "mt-5" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VRow, { class: "mb-5" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<h1 data-v-9ea35206${_scopeId2}>Atos</h1>`);
                } else {
                  return [
                    createVNode("h1", null, "Atos")
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
                        _push4(ssrRenderComponent(VTextField, mergeProps({
                          modelValue: unref(state).data_inicio,
                          "onUpdate:modelValue": ($event) => unref(state).data_inicio = $event,
                          label: "Abertura de",
                          placeholder: "dd/mm/yyyy",
                          dense: ""
                        }, ssrGetDirectiveProps(_ctx, _directive_mask, "##/##/####")), null, _parent4, _scopeId3));
                      } else {
                        return [
                          withDirectives(createVNode(VTextField, {
                            modelValue: unref(state).data_inicio,
                            "onUpdate:modelValue": ($event) => unref(state).data_inicio = $event,
                            label: "Abertura de",
                            placeholder: "dd/mm/yyyy",
                            dense: ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue"]), [
                            [_directive_mask, "##/##/####"]
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VCol, { cols: "2" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VTextField, mergeProps({
                          modelValue: unref(state).data_fim,
                          "onUpdate:modelValue": ($event) => unref(state).data_fim = $event,
                          label: "Abertura at\xE9",
                          placeholder: "dd/mm/yyyy",
                          dense: ""
                        }, ssrGetDirectiveProps(_ctx, _directive_mask, "##/##/####")), null, _parent4, _scopeId3));
                      } else {
                        return [
                          withDirectives(createVNode(VTextField, {
                            modelValue: unref(state).data_fim,
                            "onUpdate:modelValue": ($event) => unref(state).data_fim = $event,
                            label: "Abertura at\xE9",
                            placeholder: "dd/mm/yyyy",
                            dense: ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue"]), [
                            [_directive_mask, "##/##/####"]
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VCol, { cols: "2" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VTextField, mergeProps({
                          modelValue: unref(state).data_lavratura_inicio,
                          "onUpdate:modelValue": ($event) => unref(state).data_lavratura_inicio = $event,
                          label: "Lavratura de",
                          placeholder: "dd/mm/yyyy",
                          dense: ""
                        }, ssrGetDirectiveProps(_ctx, _directive_mask, "##/##/####")), null, _parent4, _scopeId3));
                      } else {
                        return [
                          withDirectives(createVNode(VTextField, {
                            modelValue: unref(state).data_lavratura_inicio,
                            "onUpdate:modelValue": ($event) => unref(state).data_lavratura_inicio = $event,
                            label: "Lavratura de",
                            placeholder: "dd/mm/yyyy",
                            dense: ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue"]), [
                            [_directive_mask, "##/##/####"]
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VCol, { cols: "2" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VTextField, mergeProps({
                          modelValue: unref(state).data_lavratura_fim,
                          "onUpdate:modelValue": ($event) => unref(state).data_lavratura_fim = $event,
                          label: "Lavratura at\xE9",
                          placeholder: "dd/mm/yyyy",
                          dense: ""
                        }, ssrGetDirectiveProps(_ctx, _directive_mask, "##/##/####")), null, _parent4, _scopeId3));
                      } else {
                        return [
                          withDirectives(createVNode(VTextField, {
                            modelValue: unref(state).data_lavratura_fim,
                            "onUpdate:modelValue": ($event) => unref(state).data_lavratura_fim = $event,
                            label: "Lavratura at\xE9",
                            placeholder: "dd/mm/yyyy",
                            dense: ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue"]), [
                            [_directive_mask, "##/##/####"]
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VCol, { cols: "2" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VTextField, {
                          modelValue: unref(state).numero,
                          "onUpdate:modelValue": ($event) => unref(state).numero = $event,
                          label: "N\xB0 OS"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VTextField, {
                            modelValue: unref(state).numero,
                            "onUpdate:modelValue": ($event) => unref(state).numero = $event,
                            label: "N\xB0 OS"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VCol, { cols: "2" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VTextField, {
                          modelValue: unref(state).selo,
                          "onUpdate:modelValue": ($event) => unref(state).selo = $event,
                          label: "Selo",
                          dense: ""
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VTextField, {
                            modelValue: unref(state).selo,
                            "onUpdate:modelValue": ($event) => unref(state).selo = $event,
                            label: "Selo",
                            dense: ""
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
                        withDirectives(createVNode(VTextField, {
                          modelValue: unref(state).data_inicio,
                          "onUpdate:modelValue": ($event) => unref(state).data_inicio = $event,
                          label: "Abertura de",
                          placeholder: "dd/mm/yyyy",
                          dense: ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]), [
                          [_directive_mask, "##/##/####"]
                        ])
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, { cols: "2" }, {
                      default: withCtx(() => [
                        withDirectives(createVNode(VTextField, {
                          modelValue: unref(state).data_fim,
                          "onUpdate:modelValue": ($event) => unref(state).data_fim = $event,
                          label: "Abertura at\xE9",
                          placeholder: "dd/mm/yyyy",
                          dense: ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]), [
                          [_directive_mask, "##/##/####"]
                        ])
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, { cols: "2" }, {
                      default: withCtx(() => [
                        withDirectives(createVNode(VTextField, {
                          modelValue: unref(state).data_lavratura_inicio,
                          "onUpdate:modelValue": ($event) => unref(state).data_lavratura_inicio = $event,
                          label: "Lavratura de",
                          placeholder: "dd/mm/yyyy",
                          dense: ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]), [
                          [_directive_mask, "##/##/####"]
                        ])
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, { cols: "2" }, {
                      default: withCtx(() => [
                        withDirectives(createVNode(VTextField, {
                          modelValue: unref(state).data_lavratura_fim,
                          "onUpdate:modelValue": ($event) => unref(state).data_lavratura_fim = $event,
                          label: "Lavratura at\xE9",
                          placeholder: "dd/mm/yyyy",
                          dense: ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]), [
                          [_directive_mask, "##/##/####"]
                        ])
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, { cols: "2" }, {
                      default: withCtx(() => [
                        createVNode(VTextField, {
                          modelValue: unref(state).numero,
                          "onUpdate:modelValue": ($event) => unref(state).numero = $event,
                          label: "N\xB0 OS"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, { cols: "2" }, {
                      default: withCtx(() => [
                        createVNode(VTextField, {
                          modelValue: unref(state).selo,
                          "onUpdate:modelValue": ($event) => unref(state).selo = $event,
                          label: "Selo",
                          dense: ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    })
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
                          modelValue: unref(state).protocolo,
                          "onUpdate:modelValue": ($event) => unref(state).protocolo = $event,
                          label: "Protocolo"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VTextField, {
                            modelValue: unref(state).protocolo,
                            "onUpdate:modelValue": ($event) => unref(state).protocolo = $event,
                            label: "Protocolo"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VCol, { cols: "2" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VTextField, mergeProps({
                          modelValue: unref(state).apresentante_cpf,
                          "onUpdate:modelValue": ($event) => unref(state).apresentante_cpf = $event,
                          label: "CPF",
                          dense: ""
                        }, ssrGetDirectiveProps(_ctx, _directive_mask, "###.###.###-##")), null, _parent4, _scopeId3));
                      } else {
                        return [
                          withDirectives(createVNode(VTextField, {
                            modelValue: unref(state).apresentante_cpf,
                            "onUpdate:modelValue": ($event) => unref(state).apresentante_cpf = $event,
                            label: "CPF",
                            dense: ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue"]), [
                            [_directive_mask, "###.###.###-##"]
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VCol, { cols: "3" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VTextField, {
                          modelValue: unref(state).parte,
                          "onUpdate:modelValue": ($event) => unref(state).parte = $event,
                          label: "Parte",
                          dense: ""
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VTextField, {
                            modelValue: unref(state).parte,
                            "onUpdate:modelValue": ($event) => unref(state).parte = $event,
                            label: "Parte",
                            dense: ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VCol, { cols: "3" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VAutocomplete, {
                          modelValue: unref(state).ato_tipo_token,
                          "onUpdate:modelValue": ($event) => unref(state).ato_tipo_token = $event,
                          items: unref(tipoAtosItems),
                          "item-value": "token",
                          "item-title": "descricao",
                          label: "Tipo Servi\xE7o",
                          "menu-props": {
                            maxWidth: "680px",
                            width: "680px"
                          },
                          dense: ""
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VAutocomplete, {
                            modelValue: unref(state).ato_tipo_token,
                            "onUpdate:modelValue": ($event) => unref(state).ato_tipo_token = $event,
                            items: unref(tipoAtosItems),
                            "item-value": "token",
                            "item-title": "descricao",
                            label: "Tipo Servi\xE7o",
                            "menu-props": {
                              maxWidth: "680px",
                              width: "680px"
                            },
                            dense: ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VCol, { cols: "2" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VAutocomplete, {
                          items: unref(usuariosItems),
                          modelValue: unref(state).usuario_token,
                          "onUpdate:modelValue": ($event) => unref(state).usuario_token = $event,
                          "item-title": "user_nome",
                          "item-value": "user_token",
                          label: "Usu\xE1rio",
                          dense: ""
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VAutocomplete, {
                            items: unref(usuariosItems),
                            modelValue: unref(state).usuario_token,
                            "onUpdate:modelValue": ($event) => unref(state).usuario_token = $event,
                            "item-title": "user_nome",
                            "item-value": "user_token",
                            label: "Usu\xE1rio",
                            dense: ""
                          }, null, 8, ["items", "modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VCol, { cols: "3" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VAutocomplete, {
                          modelValue: unref(state).situacao,
                          "onUpdate:modelValue": ($event) => unref(state).situacao = $event,
                          items: unref(situacaoItems),
                          label: "Situa\xE7\xE3o",
                          dense: ""
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VAutocomplete, {
                            modelValue: unref(state).situacao,
                            "onUpdate:modelValue": ($event) => unref(state).situacao = $event,
                            items: unref(situacaoItems),
                            label: "Situa\xE7\xE3o",
                            dense: ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VCol, { cols: "1" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VTextField, {
                          modelValue: unref(state).livro,
                          "onUpdate:modelValue": ($event) => unref(state).livro = $event,
                          label: "Livro",
                          dense: ""
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VTextField, {
                            modelValue: unref(state).livro,
                            "onUpdate:modelValue": ($event) => unref(state).livro = $event,
                            label: "Livro",
                            dense: ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VCol, { cols: "1" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VTextField, {
                          modelValue: unref(state).folha,
                          "onUpdate:modelValue": ($event) => unref(state).folha = $event,
                          label: "Folha",
                          dense: ""
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VTextField, {
                            modelValue: unref(state).folha,
                            "onUpdate:modelValue": ($event) => unref(state).folha = $event,
                            label: "Folha",
                            dense: ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VCol, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div data-v-9ea35206${_scopeId3}><img style="${ssrRenderStyle({ "width": "40px", "height": "40px", "cursor": "pointer" })}"${ssrRenderAttr("src", _imports_1)} alt="Pesquisar" data-v-9ea35206${_scopeId3}></div>`);
                      } else {
                        return [
                          createVNode("div", null, [
                            createVNode("img", {
                              onClick: searchAtos,
                              style: { "width": "40px", "height": "40px", "cursor": "pointer" },
                              src: _imports_1,
                              alt: "Pesquisar"
                            })
                          ])
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
                          modelValue: unref(state).protocolo,
                          "onUpdate:modelValue": ($event) => unref(state).protocolo = $event,
                          label: "Protocolo"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, { cols: "2" }, {
                      default: withCtx(() => [
                        withDirectives(createVNode(VTextField, {
                          modelValue: unref(state).apresentante_cpf,
                          "onUpdate:modelValue": ($event) => unref(state).apresentante_cpf = $event,
                          label: "CPF",
                          dense: ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]), [
                          [_directive_mask, "###.###.###-##"]
                        ])
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, { cols: "3" }, {
                      default: withCtx(() => [
                        createVNode(VTextField, {
                          modelValue: unref(state).parte,
                          "onUpdate:modelValue": ($event) => unref(state).parte = $event,
                          label: "Parte",
                          dense: ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, { cols: "3" }, {
                      default: withCtx(() => [
                        createVNode(VAutocomplete, {
                          modelValue: unref(state).ato_tipo_token,
                          "onUpdate:modelValue": ($event) => unref(state).ato_tipo_token = $event,
                          items: unref(tipoAtosItems),
                          "item-value": "token",
                          "item-title": "descricao",
                          label: "Tipo Servi\xE7o",
                          "menu-props": {
                            maxWidth: "680px",
                            width: "680px"
                          },
                          dense: ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, { cols: "2" }, {
                      default: withCtx(() => [
                        createVNode(VAutocomplete, {
                          items: unref(usuariosItems),
                          modelValue: unref(state).usuario_token,
                          "onUpdate:modelValue": ($event) => unref(state).usuario_token = $event,
                          "item-title": "user_nome",
                          "item-value": "user_token",
                          label: "Usu\xE1rio",
                          dense: ""
                        }, null, 8, ["items", "modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, { cols: "3" }, {
                      default: withCtx(() => [
                        createVNode(VAutocomplete, {
                          modelValue: unref(state).situacao,
                          "onUpdate:modelValue": ($event) => unref(state).situacao = $event,
                          items: unref(situacaoItems),
                          label: "Situa\xE7\xE3o",
                          dense: ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, { cols: "1" }, {
                      default: withCtx(() => [
                        createVNode(VTextField, {
                          modelValue: unref(state).livro,
                          "onUpdate:modelValue": ($event) => unref(state).livro = $event,
                          label: "Livro",
                          dense: ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, { cols: "1" }, {
                      default: withCtx(() => [
                        createVNode(VTextField, {
                          modelValue: unref(state).folha,
                          "onUpdate:modelValue": ($event) => unref(state).folha = $event,
                          label: "Folha",
                          dense: ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, null, {
                      default: withCtx(() => [
                        createVNode("div", null, [
                          createVNode("img", {
                            onClick: searchAtos,
                            style: { "width": "40px", "height": "40px", "cursor": "pointer" },
                            src: _imports_1,
                            alt: "Pesquisar"
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
          } else {
            return [
              createVNode(VRow, { class: "mb-5" }, {
                default: withCtx(() => [
                  createVNode("h1", null, "Atos")
                ]),
                _: 1
              }),
              createVNode(VRow, null, {
                default: withCtx(() => [
                  createVNode(VCol, { cols: "2" }, {
                    default: withCtx(() => [
                      withDirectives(createVNode(VTextField, {
                        modelValue: unref(state).data_inicio,
                        "onUpdate:modelValue": ($event) => unref(state).data_inicio = $event,
                        label: "Abertura de",
                        placeholder: "dd/mm/yyyy",
                        dense: ""
                      }, null, 8, ["modelValue", "onUpdate:modelValue"]), [
                        [_directive_mask, "##/##/####"]
                      ])
                    ]),
                    _: 1
                  }),
                  createVNode(VCol, { cols: "2" }, {
                    default: withCtx(() => [
                      withDirectives(createVNode(VTextField, {
                        modelValue: unref(state).data_fim,
                        "onUpdate:modelValue": ($event) => unref(state).data_fim = $event,
                        label: "Abertura at\xE9",
                        placeholder: "dd/mm/yyyy",
                        dense: ""
                      }, null, 8, ["modelValue", "onUpdate:modelValue"]), [
                        [_directive_mask, "##/##/####"]
                      ])
                    ]),
                    _: 1
                  }),
                  createVNode(VCol, { cols: "2" }, {
                    default: withCtx(() => [
                      withDirectives(createVNode(VTextField, {
                        modelValue: unref(state).data_lavratura_inicio,
                        "onUpdate:modelValue": ($event) => unref(state).data_lavratura_inicio = $event,
                        label: "Lavratura de",
                        placeholder: "dd/mm/yyyy",
                        dense: ""
                      }, null, 8, ["modelValue", "onUpdate:modelValue"]), [
                        [_directive_mask, "##/##/####"]
                      ])
                    ]),
                    _: 1
                  }),
                  createVNode(VCol, { cols: "2" }, {
                    default: withCtx(() => [
                      withDirectives(createVNode(VTextField, {
                        modelValue: unref(state).data_lavratura_fim,
                        "onUpdate:modelValue": ($event) => unref(state).data_lavratura_fim = $event,
                        label: "Lavratura at\xE9",
                        placeholder: "dd/mm/yyyy",
                        dense: ""
                      }, null, 8, ["modelValue", "onUpdate:modelValue"]), [
                        [_directive_mask, "##/##/####"]
                      ])
                    ]),
                    _: 1
                  }),
                  createVNode(VCol, { cols: "2" }, {
                    default: withCtx(() => [
                      createVNode(VTextField, {
                        modelValue: unref(state).numero,
                        "onUpdate:modelValue": ($event) => unref(state).numero = $event,
                        label: "N\xB0 OS"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(VCol, { cols: "2" }, {
                    default: withCtx(() => [
                      createVNode(VTextField, {
                        modelValue: unref(state).selo,
                        "onUpdate:modelValue": ($event) => unref(state).selo = $event,
                        label: "Selo",
                        dense: ""
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(VRow, null, {
                default: withCtx(() => [
                  createVNode(VCol, { cols: "2" }, {
                    default: withCtx(() => [
                      createVNode(VTextField, {
                        modelValue: unref(state).protocolo,
                        "onUpdate:modelValue": ($event) => unref(state).protocolo = $event,
                        label: "Protocolo"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(VCol, { cols: "2" }, {
                    default: withCtx(() => [
                      withDirectives(createVNode(VTextField, {
                        modelValue: unref(state).apresentante_cpf,
                        "onUpdate:modelValue": ($event) => unref(state).apresentante_cpf = $event,
                        label: "CPF",
                        dense: ""
                      }, null, 8, ["modelValue", "onUpdate:modelValue"]), [
                        [_directive_mask, "###.###.###-##"]
                      ])
                    ]),
                    _: 1
                  }),
                  createVNode(VCol, { cols: "3" }, {
                    default: withCtx(() => [
                      createVNode(VTextField, {
                        modelValue: unref(state).parte,
                        "onUpdate:modelValue": ($event) => unref(state).parte = $event,
                        label: "Parte",
                        dense: ""
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(VCol, { cols: "3" }, {
                    default: withCtx(() => [
                      createVNode(VAutocomplete, {
                        modelValue: unref(state).ato_tipo_token,
                        "onUpdate:modelValue": ($event) => unref(state).ato_tipo_token = $event,
                        items: unref(tipoAtosItems),
                        "item-value": "token",
                        "item-title": "descricao",
                        label: "Tipo Servi\xE7o",
                        "menu-props": {
                          maxWidth: "680px",
                          width: "680px"
                        },
                        dense: ""
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                    ]),
                    _: 1
                  }),
                  createVNode(VCol, { cols: "2" }, {
                    default: withCtx(() => [
                      createVNode(VAutocomplete, {
                        items: unref(usuariosItems),
                        modelValue: unref(state).usuario_token,
                        "onUpdate:modelValue": ($event) => unref(state).usuario_token = $event,
                        "item-title": "user_nome",
                        "item-value": "user_token",
                        label: "Usu\xE1rio",
                        dense: ""
                      }, null, 8, ["items", "modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(VCol, { cols: "3" }, {
                    default: withCtx(() => [
                      createVNode(VAutocomplete, {
                        modelValue: unref(state).situacao,
                        "onUpdate:modelValue": ($event) => unref(state).situacao = $event,
                        items: unref(situacaoItems),
                        label: "Situa\xE7\xE3o",
                        dense: ""
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                    ]),
                    _: 1
                  }),
                  createVNode(VCol, { cols: "1" }, {
                    default: withCtx(() => [
                      createVNode(VTextField, {
                        modelValue: unref(state).livro,
                        "onUpdate:modelValue": ($event) => unref(state).livro = $event,
                        label: "Livro",
                        dense: ""
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(VCol, { cols: "1" }, {
                    default: withCtx(() => [
                      createVNode(VTextField, {
                        modelValue: unref(state).folha,
                        "onUpdate:modelValue": ($event) => unref(state).folha = $event,
                        label: "Folha",
                        dense: ""
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(VCol, null, {
                    default: withCtx(() => [
                      createVNode("div", null, [
                        createVNode("img", {
                          onClick: searchAtos,
                          style: { "width": "40px", "height": "40px", "cursor": "pointer" },
                          src: _imports_1,
                          alt: "Pesquisar"
                        })
                      ])
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
      _push(`<div style="${ssrRenderStyle({ "width": "1300px", "margin": "0 auto" })}" data-v-9ea35206><hr class="mt-5 mb-5" data-v-9ea35206>`);
      _push(ssrRenderComponent(VDataTable, {
        headers,
        items: unref(atos),
        style: { "font-size": "12px" },
        "item-key": "id"
      }, {
        "item.actions": withCtx(({ item }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div style="${ssrRenderStyle({ "display": "flex", "gap": "4px", "justify-content": "center" })}" data-v-9ea35206${_scopeId}><div title="Visualizar" data-v-9ea35206${_scopeId}><img style="${ssrRenderStyle({ "width": "30px", "height": "30px", "cursor": "pointer" })}"${ssrRenderAttr("src", _imports_1)} alt="Visualizar" data-v-9ea35206${_scopeId}></div><div title="Reimprimir" data-v-9ea35206${_scopeId}><img style="${ssrRenderStyle({ "width": "30px", "height": "30px", "cursor": "pointer" })}"${ssrRenderAttr("src", _imports_3)} alt="Reimprimir" data-v-9ea35206${_scopeId}></div><div class="${ssrRenderClass({ disabled: !item.btn_editar })}"${ssrRenderAttr("title", item.btn_editar ? "Editar" : "Desabilitado")} data-v-9ea35206${_scopeId}><img style="${ssrRenderStyle({
              cursor: item.btn_editar ? "pointer" : "default",
              width: "30px",
              height: "30px"
            })}"${ssrRenderAttr("src", _imports_1$1)} alt="Editar" data-v-9ea35206${_scopeId}></div><div title="Excluir" style="${ssrRenderStyle({ cursor: item.btn_cancelar ? "pointer" : "not-allowed" })}" data-v-9ea35206${_scopeId}><img style="${ssrRenderStyle({
              width: "30px",
              height: "30px",
              cursor: item.btn_cancelar ? "pointer" : "not-allowed",
              opacity: item.btn_cancelar ? "1" : "0.5"
            })}"${ssrRenderAttr("src", _imports_5)} alt="Cancelar"${ssrRenderAttr("title", item.btn_cancelar ? "Cancelar" : "N\xE3o permitido")} data-v-9ea35206${_scopeId}></div><div data-v-9ea35206${_scopeId}><img style="${ssrRenderStyle({ "width": "30px", "height": "30px", "cursor": "pointer" })}"${ssrRenderAttr("src", _imports_2)} alt="escanear" title="escanear" data-v-9ea35206${_scopeId}></div></div>`);
          } else {
            return [
              createVNode("div", { style: { "display": "flex", "gap": "4px", "justify-content": "center" } }, [
                createVNode("div", {
                  onClick: ($event) => redirectToView({
                    id: item.id,
                    tipo: `${item.tipo_servico} - ${item.tipo_ato}`,
                    token: item.token,
                    tipo_token: item.tipo_token,
                    rota: item.rota,
                    numero_os: item.numero_os
                  }),
                  title: "Visualizar"
                }, [
                  createVNode("img", {
                    style: { "width": "30px", "height": "30px", "cursor": "pointer" },
                    src: _imports_1,
                    alt: "Visualizar"
                  })
                ], 8, ["onClick"]),
                createVNode("div", {
                  onClick: ($event) => redirectToModalReimprimir(item.token),
                  title: "Reimprimir"
                }, [
                  createVNode("img", {
                    style: { "width": "30px", "height": "30px", "cursor": "pointer" },
                    src: _imports_3,
                    alt: "Reimprimir"
                  })
                ], 8, ["onClick"]),
                createVNode("div", {
                  class: { disabled: !item.btn_editar },
                  onClick: ($event) => item.btn_editar ? redirectToUpdateAto({
                    id: item.id,
                    tipo: `${item.tipo_servico} - ${item.tipo_ato}`,
                    token: item.token,
                    tipo_token: item.tipo_token,
                    rota: item.rota,
                    numero_os: item.numero_os
                  }) : null,
                  title: item.btn_editar ? "Editar" : "Desabilitado"
                }, [
                  createVNode("img", {
                    style: {
                      cursor: item.btn_editar ? "pointer" : "default",
                      width: "30px",
                      height: "30px"
                    },
                    src: _imports_1$1,
                    alt: "Editar"
                  }, null, 4)
                ], 10, ["onClick", "title"]),
                createVNode("div", {
                  onClick: ($event) => item.btn_cancelar ? redirectToCancelamento(item) : null,
                  title: "Excluir",
                  style: { cursor: item.btn_cancelar ? "pointer" : "not-allowed" }
                }, [
                  createVNode("img", {
                    style: {
                      width: "30px",
                      height: "30px",
                      cursor: item.btn_cancelar ? "pointer" : "not-allowed",
                      opacity: item.btn_cancelar ? "1" : "0.5"
                    },
                    src: _imports_5,
                    alt: "Cancelar",
                    title: item.btn_cancelar ? "Cancelar" : "N\xE3o permitido"
                  }, null, 12, ["title"])
                ], 12, ["onClick"]),
                createVNode("div", {
                  onClick: ($event) => digitalizeDocument(item.token)
                }, [
                  createVNode("img", {
                    style: { "width": "30px", "height": "30px", "cursor": "pointer" },
                    src: _imports_2,
                    alt: "escanear",
                    title: "escanear"
                  })
                ], 8, ["onClick"])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      if (unref(modalVisible)) {
        _push(ssrRenderComponent(_component_ModalTiposAtos, {
          show: unref(modalVisible),
          servicos: _ctx.dadosData.servicos || [],
          tiposAtos: _ctx.dadosData.tiposAtos || [],
          onClose: ($event) => modalVisible.value = false,
          onUpdateAto: _ctx.handleUpdateAto
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(_component_ReimpressaoSelos, {
        show: unref(isModalReimprimirOpen),
        ato_token: unref(ato_token),
        onClose: ($event) => isModalReimprimirOpen.value = false
      }, null, _parent));
      _push(ssrRenderComponent(_component_RecebimentoOrdem, {
        show: unref(isModalRecebimentoOpen),
        numero_os: unref(numero_os),
        ordem: unref(selectedOrder),
        onClose: ($event) => isModalRecebimentoOpen.value = false,
        onRefreshValue: ($event) => atosPayload()
      }, null, _parent));
      _push(ssrRenderComponent(_component_ModalConfirmacao, {
        show: unref(isModalCancelamentoOpen),
        condMessage: _ctx.condMessage,
        onClose: ($event) => isModalCancelamentoOpen.value = false,
        onConfirm: _ctx.cancelaAto
      }, null, _parent));
      _push(ssrRenderComponent(_component_ModalCancelamentoAto, {
        show: unref(isModalCancelamentoAtoOpen),
        ato_token: unref(ato_token),
        onClose: ($event) => isModalCancelamentoAtoOpen.value = false
      }, null, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/atos/lista/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : undefined;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-9ea35206"]]);

export { index as default };
//# sourceMappingURL=index-m-meH3z2.mjs.map
