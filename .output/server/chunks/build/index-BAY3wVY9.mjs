import { _ as __nuxt_component_0 } from './nuxt-link-TpvcaGEw.mjs';
import { _ as _sfc_main$2 } from './Ordem-BnOmwFpr.mjs';
import { ref, reactive, mergeProps, withCtx, createVNode, unref, openBlock, createBlock, useSSRContext, watch, isRef, toDisplayString, createTextVNode } from 'vue';
import { ssrRenderComponent, ssrRenderStyle, ssrRenderAttr, ssrRenderClass, ssrIncludeBooleanAttr, ssrInterpolate } from 'vue/server-renderer';
import { useVuelidate } from '@vuelidate/core';
import { helpers, required } from '@vuelidate/validators';
import { b as useNuxtApp, u as useRouter$1, e as useCookie, V as VTextField, c as useRuntimeConfig, f as VBtn } from './server.mjs';
import { V as VRow, u as useFetch } from './VRow-CFCOc45b.mjs';
import { a as VDialog, V as VCard, c as VCardText } from './VDialog-D0zunqbh.mjs';
import { V as VContainer } from './VContainer-CTpFP9Uv.mjs';
import { V as VTextarea } from './VTextarea-Dnx9-S0j.mjs';
import { _ as _imports_0 } from './novo-CWU3oYa5.mjs';
import { _ as _imports_1 } from './visualizar-BoZ30DMV.mjs';
import { _ as _imports_2 } from './recebe-D8d082aE.mjs';
import { _ as _imports_1$1, a as _imports_2$1, b as _imports_3 } from './mudarStatus-PcpZQ96w.mjs';
import { V as VCol } from './VCol-SA9_fG05.mjs';
import { V as VAutocomplete } from './VAutocomplete-CsH0CvxZ.mjs';
import { V as VDataTable } from './VDataTable-C3n1YD6y.mjs';
import '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:fs';
import 'node:url';
import 'node:path';
import './MoneyInput-ot-UsY0X.mjs';
import 'v-money3';
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
import './VAvatar-CmbR2XIC.mjs';
import './VResponsive-dUk8X3PH.mjs';
import './filter-D8lmgvWc.mjs';
import './VList-BYK7AaxH.mjs';

const _sfc_main$1 = {
  __name: "Ordem",
  __ssrInlineRender: true,
  props: {
    show: Boolean,
    numero_os: Number,
    ordemserv_token: String
  },
  emits: ["close"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const isVisible = ref(props.show);
    const config = useRuntimeConfig();
    ref(useCookie("user-data").value.cartorio_token).value;
    const usuario_token = useCookie("auth_token").value;
    const analisaCancelamento = `${config.public.managemant}/analisaCancelamento`;
    const cancelarOs = `${config.public.managemant}/cancelaOs`;
    const state = reactive({
      motivo: null
    });
    const analiseCancela = ref(null);
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
    const analisaCancelamentoOs = async () => {
      const { data, error } = await useFetch(`${analisaCancelamento}`, {
        method: "POST",
        body: { ordemserv_token: props.ordemserv_token }
      }, "$1fnrIk2fgs");
      analiseCancela.value = data.value.mensagem;
    };
    analisaCancelamentoOs();
    const cancelarOrdemServ = async () => {
      if (await v$.value.$validate()) {
        const { status } = await useFetch(`${cancelarOs}`, {
          method: "POST",
          body: { usuario_token, motivo: state.motivo, ordemserv_token: props.ordemserv_token }
        }, "$21WlhUNXeM");
        if (status.value === "success") {
          (undefined).location.reload();
          closeModal();
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
                              _push5(`<h1${_scopeId4}>Cancelamento da OS n\xBA</h1><h1 style="${ssrRenderStyle({ "color": "red", "margin-left": "18px" })}"${_scopeId4}>${ssrInterpolate(props.numero_os)}</h1>`);
                            } else {
                              return [
                                createVNode("h1", null, "Cancelamento da OS n\xBA"),
                                createVNode("h1", { style: { "color": "red", "margin-left": "18px" } }, toDisplayString(props.numero_os), 1)
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
                                          _push7(`${ssrInterpolate(unref(analiseCancela))}`);
                                        } else {
                                          return [
                                            createTextVNode(toDisplayString(unref(analiseCancela)), 1)
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(VCardText, null, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(unref(analiseCancela)), 1)
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
                                        createTextVNode(toDisplayString(unref(analiseCancela)), 1)
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
                              createVNode("h1", null, "Cancelamento da OS n\xBA"),
                              createVNode("h1", { style: { "color": "red", "margin-left": "18px" } }, toDisplayString(props.numero_os), 1)
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
                                      createTextVNode(toDisplayString(unref(analiseCancela)), 1)
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
                    onClick: cancelarOrdemServ
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Salvar`);
                      } else {
                        return [
                          createTextVNode("Salvar")
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
                            createVNode("h1", null, "Cancelamento da OS n\xBA"),
                            createVNode("h1", { style: { "color": "red", "margin-left": "18px" } }, toDisplayString(props.numero_os), 1)
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
                                    createTextVNode(toDisplayString(unref(analiseCancela)), 1)
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
                          onClick: cancelarOrdemServ
                        }, {
                          default: withCtx(() => [
                            createTextVNode("Salvar")
                          ]),
                          _: 1
                        })
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
                          createVNode("h1", null, "Cancelamento da OS n\xBA"),
                          createVNode("h1", { style: { "color": "red", "margin-left": "18px" } }, toDisplayString(props.numero_os), 1)
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
                                  createTextVNode(toDisplayString(unref(analiseCancela)), 1)
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
                        onClick: cancelarOrdemServ
                      }, {
                        default: withCtx(() => [
                          createTextVNode("Salvar")
                        ]),
                        _: 1
                      })
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Cancelamento/Ordem.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : undefined;
};
const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const config = useRuntimeConfig();
    const { $toast } = useNuxtApp();
    const allUsuarios = `${config.public.managemant}/listarUsuarios`;
    const allServicos = `${config.public.managemant}/listarOrdensServico`;
    const allTiposAtos = `${config.public.managemant}/tipoAtos`;
    const router = useRouter$1();
    const usuario_token = ref(useCookie("auth_token").value) || null;
    const cartorio_token = ref(useCookie("user-data").value.cartorio_token) || null;
    const servicosItems = ref([]);
    const usuariosItems = ref([]);
    const tipoAtosItems = ref([]);
    const situacaoItems = ref(["PENDENTE", "EM ANDAMENTO", "CONCLU\xCDDA", "LAVRADA"]);
    const isModalRecebimentoOpen = ref(false);
    const isModalCancelamentoOpen = ref(false);
    const showCreateOrdemServ = ref(null);
    const ordemserv_token = ref(null);
    const numero_os = ref(null);
    const selectedOrder = ref({});
    const state = reactive({
      numero: null,
      data_inicio: getCurrentDate(),
      data_fim: getCurrentDate(),
      data_lavratura_inicio: null,
      data_lavratura_fim: null,
      protocolo: null,
      livro: null,
      folha: null,
      situacao: null,
      usuario_token: usuario_token.value,
      selo: null,
      ato_tipo_token: null,
      apresentante: null
    });
    const headers = [
      { title: "Data Recebimento", value: "data" },
      { title: "N\xFAmero", value: "numero" },
      { title: "Situa\xE7\xE3o", value: "situacao" },
      { title: "CPF", value: "apresentante_cpf" },
      { title: "Apresentante", value: "apresentante_nome" },
      { title: "Usuario", value: "usuario_nome" },
      { title: "Valor", value: "valor" },
      {
        value: "actions"
      }
    ];
    function getCurrentDate() {
      const today = /* @__PURE__ */ new Date();
      const yyyy = today.getFullYear();
      const MM = String(today.getMonth() + 1).padStart(2, "0");
      const dd = String(today.getDate()).padStart(2, "0");
      return `${yyyy}-${MM}-${dd}`;
    }
    async function usuariosDataPayload() {
      const { data: usuarioData, error } = await useFetch(allUsuarios, {
        method: "POST",
        body: {
          cartorio_token: cartorio_token.value
        }
      }, "$pAAptWJdb1");
      usuariosItems.value = usuarioData.value;
    }
    async function searchOrdersService() {
      try {
        sessionStorage.setItem("pesquisaOS", JSON.stringify(state));
        const { data: servicosData, error } = await useFetch(allServicos, {
          method: "POST",
          body: {
            cartorio_token: cartorio_token.value,
            numero: state.numero || null,
            data_inicio: state.data_inicio || null,
            data_fim: state.data_fim || null,
            data_lavratura_inicio: state.data_lavratura_inicio || null,
            data_lavratura_fim: state.data_lavratura_fim || null,
            protocolo: state.protocolo || null,
            livro: state.livro || null,
            folha: state.folha || null,
            situacao: state.situacao || null,
            usuario_token: state.usuario_token,
            selo: state.selo || null,
            ato_tipo_token: state.ato_tipo_token,
            apresentante: state.apresentante || null
          }
        }, "$IO02J210Z9");
        if (servicosData.value.length > 0) {
          servicosItems.value = servicosData.value;
        } else {
          servicosItems.value = [];
          $toast.error("N\xE3o existe Ordem de Servi\xE7o Registrada!");
        }
      } catch (error) {
        console.error("Erro na requisi\xE7\xE3o", error);
      }
    }
    async function tipoAtosDataPayload() {
      const { data: tipoAtosData, error } = await useFetch(allTiposAtos, {
        method: "POST",
        body: {
          cartorio_token: cartorio_token.value,
          usuario_token: usuario_token.value
        }
      }, "$YgUhKRJlsV");
      tipoAtosItems.value = tipoAtosData.value;
    }
    usuariosDataPayload();
    tipoAtosDataPayload();
    function redirectToCancelamento(item) {
      numero_os.value = item.numero;
      ordemserv_token.value = item.token;
      isModalCancelamentoOpen.value = true;
    }
    function redirectToUpdate(id) {
      const serviceCookie = useCookie("user-service");
      const servico = servicosItems.value.find((item) => item.id === id);
      serviceCookie.value = serviceCookie.value = JSON.stringify({
        id: servico.id,
        token: servico.token
      });
      router.push({ path: `/os/atualizar/${id}` });
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
    const showCreateOrdem = () => {
      const serviceCookie = useCookie("user-service");
      const isTrueOrdemServ = useCookie("ordem-button");
      serviceCookie.value = null;
      showCreateOrdemServ.value = true;
      isTrueOrdemServ.value = showCreateOrdemServ.value;
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      const _component_RecebimentoOrdem = _sfc_main$2;
      const _component_CancelamentoOrdem = _sfc_main$1;
      _push(ssrRenderComponent(VContainer, mergeProps({ class: "mt-5" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VRow, { class: "mb-5" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<h1${_scopeId2}>Ordens de Servi\xE7o</h1>`);
                  _push3(ssrRenderComponent(_component_NuxtLink, { to: "/os/criar-registro" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<img style="${ssrRenderStyle({ "width": "60px", "height": "60px", "cursor": "pointer", "margin-left": "70px" })}"${ssrRenderAttr("src", _imports_0)} alt="novo"${_scopeId3}>`);
                      } else {
                        return [
                          createVNode("img", {
                            style: { "width": "60px", "height": "60px", "cursor": "pointer", "margin-left": "70px" },
                            src: _imports_0,
                            alt: "novo",
                            onClick: showCreateOrdem
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode("h1", null, "Ordens de Servi\xE7o"),
                    createVNode(_component_NuxtLink, { to: "/os/criar-registro" }, {
                      default: withCtx(() => [
                        createVNode("img", {
                          style: { "width": "60px", "height": "60px", "cursor": "pointer", "margin-left": "70px" },
                          src: _imports_0,
                          alt: "novo",
                          onClick: showCreateOrdem
                        })
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(VRow, { style: { "margin-bottom": "-35px" } }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VCol, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VTextField, {
                          modelValue: unref(state).numero,
                          "onUpdate:modelValue": ($event) => unref(state).numero = $event,
                          label: "N\xFAmero"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VTextField, {
                            modelValue: unref(state).numero,
                            "onUpdate:modelValue": ($event) => unref(state).numero = $event,
                            label: "N\xFAmero"
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
                          modelValue: unref(state).data_inicio,
                          "onUpdate:modelValue": ($event) => unref(state).data_inicio = $event,
                          type: "date",
                          label: "Abertura de",
                          style: { "width": "150px" }
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VTextField, {
                            modelValue: unref(state).data_inicio,
                            "onUpdate:modelValue": ($event) => unref(state).data_inicio = $event,
                            type: "date",
                            label: "Abertura de",
                            style: { "width": "150px" }
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
                          modelValue: unref(state).data_fim,
                          "onUpdate:modelValue": ($event) => unref(state).data_fim = $event,
                          type: "date",
                          label: "Abertura at\xE9",
                          style: { "width": "150px" }
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VTextField, {
                            modelValue: unref(state).data_fim,
                            "onUpdate:modelValue": ($event) => unref(state).data_fim = $event,
                            type: "date",
                            label: "Abertura at\xE9",
                            style: { "width": "150px" }
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
                          modelValue: unref(state).data_lavratura_inicio,
                          "onUpdate:modelValue": ($event) => unref(state).data_lavratura_inicio = $event,
                          type: "date",
                          label: "Lavratura de",
                          style: { "width": "150px" }
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VTextField, {
                            modelValue: unref(state).data_lavratura_inicio,
                            "onUpdate:modelValue": ($event) => unref(state).data_lavratura_inicio = $event,
                            type: "date",
                            label: "Lavratura de",
                            style: { "width": "150px" }
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
                          modelValue: unref(state).data_lavratura_fim,
                          "onUpdate:modelValue": ($event) => unref(state).data_lavratura_fim = $event,
                          type: "date",
                          label: "Lavratura at\xE9",
                          style: { "width": "150px" }
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VTextField, {
                            modelValue: unref(state).data_lavratura_fim,
                            "onUpdate:modelValue": ($event) => unref(state).data_lavratura_fim = $event,
                            type: "date",
                            label: "Lavratura at\xE9",
                            style: { "width": "150px" }
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
                  _push3(ssrRenderComponent(VCol, { md: "1" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VTextField, {
                          modelValue: unref(state).livro,
                          "onUpdate:modelValue": ($event) => unref(state).livro = $event,
                          label: "Livro"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VTextField, {
                            modelValue: unref(state).livro,
                            "onUpdate:modelValue": ($event) => unref(state).livro = $event,
                            label: "Livro"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VCol, { md: "1" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VTextField, {
                          modelValue: unref(state).folha,
                          "onUpdate:modelValue": ($event) => unref(state).folha = $event,
                          label: "Folha"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VTextField, {
                            modelValue: unref(state).folha,
                            "onUpdate:modelValue": ($event) => unref(state).folha = $event,
                            label: "Folha"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VCol, null, {
                      default: withCtx(() => [
                        createVNode(VTextField, {
                          modelValue: unref(state).numero,
                          "onUpdate:modelValue": ($event) => unref(state).numero = $event,
                          label: "N\xFAmero"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, null, {
                      default: withCtx(() => [
                        createVNode(VTextField, {
                          modelValue: unref(state).data_inicio,
                          "onUpdate:modelValue": ($event) => unref(state).data_inicio = $event,
                          type: "date",
                          label: "Abertura de",
                          style: { "width": "150px" }
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, null, {
                      default: withCtx(() => [
                        createVNode(VTextField, {
                          modelValue: unref(state).data_fim,
                          "onUpdate:modelValue": ($event) => unref(state).data_fim = $event,
                          type: "date",
                          label: "Abertura at\xE9",
                          style: { "width": "150px" }
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, null, {
                      default: withCtx(() => [
                        createVNode(VTextField, {
                          modelValue: unref(state).data_lavratura_inicio,
                          "onUpdate:modelValue": ($event) => unref(state).data_lavratura_inicio = $event,
                          type: "date",
                          label: "Lavratura de",
                          style: { "width": "150px" }
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, null, {
                      default: withCtx(() => [
                        createVNode(VTextField, {
                          modelValue: unref(state).data_lavratura_fim,
                          "onUpdate:modelValue": ($event) => unref(state).data_lavratura_fim = $event,
                          type: "date",
                          label: "Lavratura at\xE9",
                          style: { "width": "150px" }
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, null, {
                      default: withCtx(() => [
                        createVNode(VTextField, {
                          modelValue: unref(state).protocolo,
                          "onUpdate:modelValue": ($event) => unref(state).protocolo = $event,
                          label: "Protocolo"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, { md: "1" }, {
                      default: withCtx(() => [
                        createVNode(VTextField, {
                          modelValue: unref(state).livro,
                          "onUpdate:modelValue": ($event) => unref(state).livro = $event,
                          label: "Livro"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, { md: "1" }, {
                      default: withCtx(() => [
                        createVNode(VTextField, {
                          modelValue: unref(state).folha,
                          "onUpdate:modelValue": ($event) => unref(state).folha = $event,
                          label: "Folha"
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
                  _push3(ssrRenderComponent(VCol, { md: "3" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VAutocomplete, {
                          modelValue: unref(state).situacao,
                          "onUpdate:modelValue": ($event) => unref(state).situacao = $event,
                          items: unref(situacaoItems),
                          label: "Situa\xE7\xE3o"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VAutocomplete, {
                            modelValue: unref(state).situacao,
                            "onUpdate:modelValue": ($event) => unref(state).situacao = $event,
                            items: unref(situacaoItems),
                            label: "Situa\xE7\xE3o"
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VCol, { md: "2" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VAutocomplete, {
                          items: unref(usuariosItems),
                          modelValue: unref(state).usuario_token,
                          "onUpdate:modelValue": ($event) => unref(state).usuario_token = $event,
                          "item-title": "user_nome",
                          "item-value": "user_token",
                          label: "Usuario"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VAutocomplete, {
                            items: unref(usuariosItems),
                            modelValue: unref(state).usuario_token,
                            "onUpdate:modelValue": ($event) => unref(state).usuario_token = $event,
                            "item-title": "user_nome",
                            "item-value": "user_token",
                            label: "Usuario"
                          }, null, 8, ["items", "modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VCol, { md: "1" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VTextField, {
                          modelValue: unref(state).selo,
                          "onUpdate:modelValue": ($event) => unref(state).selo = $event,
                          label: "Selo"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VTextField, {
                            modelValue: unref(state).selo,
                            "onUpdate:modelValue": ($event) => unref(state).selo = $event,
                            label: "Selo"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VCol, { md: "3" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VAutocomplete, {
                          modelValue: unref(state).ato_tipo_token,
                          "onUpdate:modelValue": ($event) => unref(state).ato_tipo_token = $event,
                          items: unref(tipoAtosItems),
                          "item-title": "descricao",
                          "item-value": "token",
                          label: "Servi\xE7o"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VAutocomplete, {
                            modelValue: unref(state).ato_tipo_token,
                            "onUpdate:modelValue": ($event) => unref(state).ato_tipo_token = $event,
                            items: unref(tipoAtosItems),
                            "item-title": "descricao",
                            "item-value": "token",
                            label: "Servi\xE7o"
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VCol, { md: "2" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VTextField, {
                          modelValue: unref(state).apresentante,
                          "onUpdate:modelValue": ($event) => unref(state).apresentante = $event,
                          label: "Apresentante"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VTextField, {
                            modelValue: unref(state).apresentante,
                            "onUpdate:modelValue": ($event) => unref(state).apresentante = $event,
                            label: "Apresentante"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VCol, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div${_scopeId3}><img style="${ssrRenderStyle({ "width": "40px", "height": "40px", "cursor": "pointer" })}"${ssrRenderAttr("src", _imports_1)} alt="Pesquisar"${_scopeId3}></div>`);
                      } else {
                        return [
                          createVNode("div", null, [
                            createVNode("img", {
                              onClick: searchOrdersService,
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
                    createVNode(VCol, { md: "3" }, {
                      default: withCtx(() => [
                        createVNode(VAutocomplete, {
                          modelValue: unref(state).situacao,
                          "onUpdate:modelValue": ($event) => unref(state).situacao = $event,
                          items: unref(situacaoItems),
                          label: "Situa\xE7\xE3o"
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, { md: "2" }, {
                      default: withCtx(() => [
                        createVNode(VAutocomplete, {
                          items: unref(usuariosItems),
                          modelValue: unref(state).usuario_token,
                          "onUpdate:modelValue": ($event) => unref(state).usuario_token = $event,
                          "item-title": "user_nome",
                          "item-value": "user_token",
                          label: "Usuario"
                        }, null, 8, ["items", "modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, { md: "1" }, {
                      default: withCtx(() => [
                        createVNode(VTextField, {
                          modelValue: unref(state).selo,
                          "onUpdate:modelValue": ($event) => unref(state).selo = $event,
                          label: "Selo"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, { md: "3" }, {
                      default: withCtx(() => [
                        createVNode(VAutocomplete, {
                          modelValue: unref(state).ato_tipo_token,
                          "onUpdate:modelValue": ($event) => unref(state).ato_tipo_token = $event,
                          items: unref(tipoAtosItems),
                          "item-title": "descricao",
                          "item-value": "token",
                          label: "Servi\xE7o"
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, { md: "2" }, {
                      default: withCtx(() => [
                        createVNode(VTextField, {
                          modelValue: unref(state).apresentante,
                          "onUpdate:modelValue": ($event) => unref(state).apresentante = $event,
                          label: "Apresentante"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, null, {
                      default: withCtx(() => [
                        createVNode("div", null, [
                          createVNode("img", {
                            onClick: searchOrdersService,
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
            _push2(`<hr class="mt-5 mb-5"${_scopeId}>`);
            _push2(ssrRenderComponent(VDataTable, {
              headers,
              items: unref(servicosItems),
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
                        })}"${ssrRenderAttr("src", _imports_2)} alt="Receber"${_scopeId3}></div><div class="${ssrRenderClass({ disabled: !item.btn_editar })}"${ssrRenderAttr("title", item.btn_editar ? "Editar" : "Bloqueado")}${_scopeId3}><img style="${ssrRenderStyle({
                          cursor: item.btn_editar ? "pointer" : "default",
                          width: "30px",
                          height: "30px"
                        })}"${ssrRenderAttr("src", _imports_1$1)} alt="Editar"${_scopeId3}></div><div${ssrIncludeBooleanAttr(!item.btn_cancelar) ? " disabled" : ""} title="Cancelamento"${_scopeId3}>`);
                        if (item.excluido) {
                          _push4(`<img style="${ssrRenderStyle({ "width": "30px", "height": "30px" })}"${ssrRenderAttr("src", _imports_2$1)} alt="Visualizar" title="Bloqueado"${_scopeId3}>`);
                        } else {
                          _push4(`<img${ssrRenderAttr("src", _imports_3)} alt="Cancelamento" class="trash-icon" style="${ssrRenderStyle({ "width": "30px", "height": "30px", "cursor": "pointer" })}" title="Cancelamento"${_scopeId3}>`);
                        }
                        _push4(`</div>`);
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
                            class: { disabled: !item.btn_editar },
                            onClick: ($event) => item.btn_editar ? redirectToUpdate(item.id) : null,
                            title: item.btn_editar ? "Editar" : "Bloqueado"
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
                            disabled: !item.btn_cancelar,
                            onClick: ($event) => item.btn_cancelar ? redirectToCancelamento(item) : null,
                            title: "Cancelamento"
                          }, [
                            item.excluido ? (openBlock(), createBlock("img", {
                              key: 0,
                              style: { "width": "30px", "height": "30px" },
                              src: _imports_2$1,
                              alt: "Visualizar",
                              title: "Bloqueado"
                            })) : (openBlock(), createBlock("img", {
                              key: 1,
                              src: _imports_3,
                              alt: "Cancelamento",
                              class: "trash-icon",
                              style: { "width": "30px", "height": "30px", "cursor": "pointer" },
                              title: "Cancelamento"
                            }))
                          ], 8, ["disabled", "onClick"])
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
                          class: { disabled: !item.btn_editar },
                          onClick: ($event) => item.btn_editar ? redirectToUpdate(item.id) : null,
                          title: item.btn_editar ? "Editar" : "Bloqueado"
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
                          disabled: !item.btn_cancelar,
                          onClick: ($event) => item.btn_cancelar ? redirectToCancelamento(item) : null,
                          title: "Cancelamento"
                        }, [
                          item.excluido ? (openBlock(), createBlock("img", {
                            key: 0,
                            style: { "width": "30px", "height": "30px" },
                            src: _imports_2$1,
                            alt: "Visualizar",
                            title: "Bloqueado"
                          })) : (openBlock(), createBlock("img", {
                            key: 1,
                            src: _imports_3,
                            alt: "Cancelamento",
                            class: "trash-icon",
                            style: { "width": "30px", "height": "30px", "cursor": "pointer" },
                            title: "Cancelamento"
                          }))
                        ], 8, ["disabled", "onClick"])
                      ]),
                      _: 2
                    }, 1024)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_RecebimentoOrdem, {
              show: unref(isModalRecebimentoOpen),
              numero_os: unref(numero_os),
              ordem: unref(selectedOrder),
              onClose: ($event) => isModalRecebimentoOpen.value = false
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_CancelamentoOrdem, {
              show: unref(isModalCancelamentoOpen),
              numero_os: unref(numero_os),
              ordemserv_token: unref(ordemserv_token),
              onClose: ($event) => isModalCancelamentoOpen.value = false
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(VRow, { class: "mb-5" }, {
                default: withCtx(() => [
                  createVNode("h1", null, "Ordens de Servi\xE7o"),
                  createVNode(_component_NuxtLink, { to: "/os/criar-registro" }, {
                    default: withCtx(() => [
                      createVNode("img", {
                        style: { "width": "60px", "height": "60px", "cursor": "pointer", "margin-left": "70px" },
                        src: _imports_0,
                        alt: "novo",
                        onClick: showCreateOrdem
                      })
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(VRow, { style: { "margin-bottom": "-35px" } }, {
                default: withCtx(() => [
                  createVNode(VCol, null, {
                    default: withCtx(() => [
                      createVNode(VTextField, {
                        modelValue: unref(state).numero,
                        "onUpdate:modelValue": ($event) => unref(state).numero = $event,
                        label: "N\xFAmero"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(VCol, null, {
                    default: withCtx(() => [
                      createVNode(VTextField, {
                        modelValue: unref(state).data_inicio,
                        "onUpdate:modelValue": ($event) => unref(state).data_inicio = $event,
                        type: "date",
                        label: "Abertura de",
                        style: { "width": "150px" }
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(VCol, null, {
                    default: withCtx(() => [
                      createVNode(VTextField, {
                        modelValue: unref(state).data_fim,
                        "onUpdate:modelValue": ($event) => unref(state).data_fim = $event,
                        type: "date",
                        label: "Abertura at\xE9",
                        style: { "width": "150px" }
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(VCol, null, {
                    default: withCtx(() => [
                      createVNode(VTextField, {
                        modelValue: unref(state).data_lavratura_inicio,
                        "onUpdate:modelValue": ($event) => unref(state).data_lavratura_inicio = $event,
                        type: "date",
                        label: "Lavratura de",
                        style: { "width": "150px" }
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(VCol, null, {
                    default: withCtx(() => [
                      createVNode(VTextField, {
                        modelValue: unref(state).data_lavratura_fim,
                        "onUpdate:modelValue": ($event) => unref(state).data_lavratura_fim = $event,
                        type: "date",
                        label: "Lavratura at\xE9",
                        style: { "width": "150px" }
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(VCol, null, {
                    default: withCtx(() => [
                      createVNode(VTextField, {
                        modelValue: unref(state).protocolo,
                        "onUpdate:modelValue": ($event) => unref(state).protocolo = $event,
                        label: "Protocolo"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(VCol, { md: "1" }, {
                    default: withCtx(() => [
                      createVNode(VTextField, {
                        modelValue: unref(state).livro,
                        "onUpdate:modelValue": ($event) => unref(state).livro = $event,
                        label: "Livro"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(VCol, { md: "1" }, {
                    default: withCtx(() => [
                      createVNode(VTextField, {
                        modelValue: unref(state).folha,
                        "onUpdate:modelValue": ($event) => unref(state).folha = $event,
                        label: "Folha"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(VRow, null, {
                default: withCtx(() => [
                  createVNode(VCol, { md: "3" }, {
                    default: withCtx(() => [
                      createVNode(VAutocomplete, {
                        modelValue: unref(state).situacao,
                        "onUpdate:modelValue": ($event) => unref(state).situacao = $event,
                        items: unref(situacaoItems),
                        label: "Situa\xE7\xE3o"
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                    ]),
                    _: 1
                  }),
                  createVNode(VCol, { md: "2" }, {
                    default: withCtx(() => [
                      createVNode(VAutocomplete, {
                        items: unref(usuariosItems),
                        modelValue: unref(state).usuario_token,
                        "onUpdate:modelValue": ($event) => unref(state).usuario_token = $event,
                        "item-title": "user_nome",
                        "item-value": "user_token",
                        label: "Usuario"
                      }, null, 8, ["items", "modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(VCol, { md: "1" }, {
                    default: withCtx(() => [
                      createVNode(VTextField, {
                        modelValue: unref(state).selo,
                        "onUpdate:modelValue": ($event) => unref(state).selo = $event,
                        label: "Selo"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(VCol, { md: "3" }, {
                    default: withCtx(() => [
                      createVNode(VAutocomplete, {
                        modelValue: unref(state).ato_tipo_token,
                        "onUpdate:modelValue": ($event) => unref(state).ato_tipo_token = $event,
                        items: unref(tipoAtosItems),
                        "item-title": "descricao",
                        "item-value": "token",
                        label: "Servi\xE7o"
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                    ]),
                    _: 1
                  }),
                  createVNode(VCol, { md: "2" }, {
                    default: withCtx(() => [
                      createVNode(VTextField, {
                        modelValue: unref(state).apresentante,
                        "onUpdate:modelValue": ($event) => unref(state).apresentante = $event,
                        label: "Apresentante"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(VCol, null, {
                    default: withCtx(() => [
                      createVNode("div", null, [
                        createVNode("img", {
                          onClick: searchOrdersService,
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
              }),
              createVNode("hr", { class: "mt-5 mb-5" }),
              createVNode(VDataTable, {
                headers,
                items: unref(servicosItems),
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
                        class: { disabled: !item.btn_editar },
                        onClick: ($event) => item.btn_editar ? redirectToUpdate(item.id) : null,
                        title: item.btn_editar ? "Editar" : "Bloqueado"
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
                        disabled: !item.btn_cancelar,
                        onClick: ($event) => item.btn_cancelar ? redirectToCancelamento(item) : null,
                        title: "Cancelamento"
                      }, [
                        item.excluido ? (openBlock(), createBlock("img", {
                          key: 0,
                          style: { "width": "30px", "height": "30px" },
                          src: _imports_2$1,
                          alt: "Visualizar",
                          title: "Bloqueado"
                        })) : (openBlock(), createBlock("img", {
                          key: 1,
                          src: _imports_3,
                          alt: "Cancelamento",
                          class: "trash-icon",
                          style: { "width": "30px", "height": "30px", "cursor": "pointer" },
                          title: "Cancelamento"
                        }))
                      ], 8, ["disabled", "onClick"])
                    ]),
                    _: 2
                  }, 1024)
                ]),
                _: 1
              }, 8, ["items"]),
              createVNode(_component_RecebimentoOrdem, {
                show: unref(isModalRecebimentoOpen),
                numero_os: unref(numero_os),
                ordem: unref(selectedOrder),
                onClose: ($event) => isModalRecebimentoOpen.value = false
              }, null, 8, ["show", "numero_os", "ordem", "onClose"]),
              createVNode(_component_CancelamentoOrdem, {
                show: unref(isModalCancelamentoOpen),
                numero_os: unref(numero_os),
                ordemserv_token: unref(ordemserv_token),
                onClose: ($event) => isModalCancelamentoOpen.value = false
              }, null, 8, ["show", "numero_os", "ordemserv_token", "onClose"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/os/lista/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : undefined;
};

export { _sfc_main as default };
//# sourceMappingURL=index-BAY3wVY9.mjs.map
