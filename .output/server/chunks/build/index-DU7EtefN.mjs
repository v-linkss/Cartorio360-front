import { ref, mergeProps, withCtx, unref, isRef, createTextVNode, createVNode, useSSRContext, computed, resolveComponent, openBlock, createBlock } from 'vue';
import { ssrRenderComponent, ssrRenderClass, ssrRenderAttr, ssrRenderStyle } from 'vue/server-renderer';
import { _ as _sfc_main$3 } from './Ordem-yHRhLh5F.mjs';
import { _ as _sfc_main$4 } from './Confirmacao-DJuj7WGW.mjs';
import { _ as _imports_2 } from './recebe-D8d082aE.mjs';
import { _ as _imports_0 } from './salvar-DQISB1bG.mjs';
import { e as useCookie, b as useNuxtApp, V as VTextField, g as VBtn, c as useRuntimeConfig, a as navigateTo } from './server.mjs';
import { u as useFetch } from './fetch-DOsfzFYE.mjs';
import { V as VContainer } from './VContainer-CUysD4sO.mjs';
import { V as VRow } from './VRow-Bqz0CuIN.mjs';
import { V as VCol } from './VCol-BT4RzX0Q.mjs';
import { V as VAutocomplete } from './VAutocomplete-jDMrV6Ty.mjs';
import { V as VDataTable } from './VDataTable-D9q4gsV5.mjs';
import { _ as __nuxt_component_0 } from './nuxt-link-TpvcaGEw.mjs';
import { _ as _imports_0$1 } from './novo-CWU3oYa5.mjs';
import { _ as _imports_2$1, a as _imports_3 } from './excluido-ceRs5bdR.mjs';
import { V as VTabs, a as VTab } from './VTabs-CsXP8zCT.mjs';
import { V as VWindow, a as VWindowItem } from './VWindowItem-DpFv1Eet.mjs';
import './MoneyInput-ot-UsY0X.mjs';
import 'v-money3';
import './VDialog-BVe31KMa.mjs';
import './VCard-C4igN6I0.mjs';
import './VAvatar-DtgTBdiE.mjs';
import './VResponsive-BwPb2GHE.mjs';
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
import 'pinia';
import 'vue-router';
import 'vue3-toastify';
import 'vue-the-mask';
import './asyncData-B13qrLU7.mjs';
import './filter-Cq0do3eB.mjs';
import './VList-Cz7Gkd6P.mjs';

const _sfc_main$2 = {
  __name: "Os",
  __ssrInlineRender: true,
  setup(__props) {
    const config = useRuntimeConfig();
    const { $toast } = useNuxtApp();
    const listarOSCaixas = `${config.public.managemant}/listarOSCaixas`;
    const situacaoOS = `${config.public.managemant}/lista_sit_ordemserv`;
    const encerrarOs = `${config.public.managemant}/updateOrdensServico`;
    const caixaRecebeOsItems = ref([]);
    const situacoes = ref([]);
    const searchNumero = ref("");
    const searchApresentante = ref("");
    const selectedOrder = ref({});
    const numero_os = ref(null);
    const condMessage = ref(
      "O encerramento de OS n\xE3o poder\xE1 ser revertido. Confirma o encerramento?"
    );
    const isModalRecebimentoOpen = ref(false);
    const isModalCancelamentoOpen = ref(false);
    const goBack = () => {
      navigateTo("/caixas/lista");
    };
    const headers = [
      { title: "N\xFAmero", value: "numero" },
      { title: "Situa\xE7\xE3o", value: "situacao" },
      { title: "CPF", value: "apresentante_cpf" },
      { title: "Apresentante", value: "apresentante_nome" },
      { title: "Usu\xE1rio", value: "usuario_nome" },
      { title: "Valor", value: "valor" },
      { title: "A Receber", value: "valor_a_receber" },
      { title: "A\xE7\xF5es", value: "actions" }
    ];
    const searchSituacao = ref("");
    async function caixaOsDataPayload() {
      try {
        const response = await $fetch(listarOSCaixas, {
          method: "POST",
          body: {
            caixa_token: useCookie("caixa-service").value.caixa_token
          }
        });
        if (response && Array.isArray(response)) {
          caixaRecebeOsItems.value = response;
        } else {
          $toast.error("Erro ao buscar dados da API.");
        }
      } catch (error) {
        const errorMessage = error.message || "Erro ao buscar dados da API. Tente novamente.";
        $toast.error(errorMessage);
      }
    }
    function getCurrentDate() {
      const today = /* @__PURE__ */ new Date();
      const yyyy = today.getFullYear();
      const MM = String(today.getMonth() + 1).padStart(2, "0");
      const dd = String(today.getDate()).padStart(2, "0");
      return `${yyyy}-${MM}-${dd}`;
    }
    const openCancelamentoModal = (item) => {
      selectedOrder.value = item;
      isModalCancelamentoOpen.value = true;
    };
    async function getSituacaoOs() {
      try {
        const { data, error } = await useFetch(situacaoOS, {
          method: "GET"
        }, "$nTZq0SR2Wg");
        if (data.value && Array.isArray(data.value)) {
          situacoes.value = data.value.map((item) => ({
            title: item.descricao,
            value: item.descricao
          }));
        } else {
          $toast.error("Erro ao buscar dados da API de situa\xE7\xE3o.");
          if (error.value) {
            console.error("Erro detalhado:", error.value);
          }
        }
      } catch (error) {
        const errorMessage = error.message || "Erro ao buscar dados da API. Tente novamente.";
        $toast.error(errorMessage);
        console.error("Erro na requisi\xE7\xE3o:", error);
      }
    }
    getSituacaoOs();
    async function encerrarOS(id) {
      try {
        const response = await $fetch(`${encerrarOs}/${id}`, {
          method: "PUT",
          body: {
            dt_pagto: getCurrentDate()
          }
        });
        if (response) {
          $toast.success("Ordem de Servi\xE7o encerrada com sucesso!");
          isModalCancelamentoOpen.value = false;
          caixaOsDataPayload();
        } else {
          $toast.error("Erro ao encerrar OS. Tente novamente.");
        }
      } catch (error) {
        const errorMessage = error.message || "Erro ao buscar dados da API. Tente novamente.";
        $toast.error(errorMessage);
      }
    }
    const filteredItems = computed(() => {
      return caixaRecebeOsItems.value.filter((item) => {
        const numero = item.numero ? item.numero.toString().toLowerCase() : "";
        const apresentante = item.apresentante_nome ? item.apresentante_nome.toLowerCase() : "";
        const situacao = item.situacao ? item.situacao.toUpperCase() : "";
        const matchesNumero = numero.includes(searchNumero.value.toLowerCase());
        const matchesApresentante = apresentante.includes(
          searchApresentante.value.toLowerCase()
        );
        const matchesSituacao = searchSituacao.value ? situacao === searchSituacao.value : true;
        return matchesNumero && matchesApresentante && matchesSituacao;
      });
    });
    function redirectToRecebimento(numero, item) {
      numero_os.value = numero;
      selectedOrder.value = {
        token: item.token,
        numero: item.numero,
        valor: item.valor,
        valor_pago: item.valor_pago,
        caixa_token: useCookie("caixa-service").value.caixa_token
      };
      isModalRecebimentoOpen.value = true;
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_RecebimentoOrdem = _sfc_main$3;
      const _component_ModalConfirmacao = _sfc_main$4;
      const _component_v_rows = resolveComponent("v-rows");
      const _component_v_cols = resolveComponent("v-cols");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(VContainer, { class: "mt-5" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VRow, { class: "mb-5" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<h1${_scopeId2}>Recebimento de Ordens de Servi\xE7o</h1>`);
                } else {
                  return [
                    createVNode("h1", null, "Recebimento de Ordens de Servi\xE7o")
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
                          modelValue: unref(searchNumero),
                          "onUpdate:modelValue": ($event) => isRef(searchNumero) ? searchNumero.value = $event : null,
                          type: "text",
                          label: "N\xFAmero"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VTextField, {
                            modelValue: unref(searchNumero),
                            "onUpdate:modelValue": ($event) => isRef(searchNumero) ? searchNumero.value = $event : null,
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
                          modelValue: unref(searchApresentante),
                          "onUpdate:modelValue": ($event) => isRef(searchApresentante) ? searchApresentante.value = $event : null,
                          label: "Apresentante"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VTextField, {
                            modelValue: unref(searchApresentante),
                            "onUpdate:modelValue": ($event) => isRef(searchApresentante) ? searchApresentante.value = $event : null,
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
                          modelValue: unref(searchNumero),
                          "onUpdate:modelValue": ($event) => isRef(searchNumero) ? searchNumero.value = $event : null,
                          type: "text",
                          label: "N\xFAmero"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, { md: "3" }, {
                      default: withCtx(() => [
                        createVNode(VTextField, {
                          modelValue: unref(searchApresentante),
                          "onUpdate:modelValue": ($event) => isRef(searchApresentante) ? searchApresentante.value = $event : null,
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
            _push2(ssrRenderComponent(VRow, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VCol, { md: "3" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VAutocomplete, {
                          modelValue: unref(searchSituacao),
                          "onUpdate:modelValue": ($event) => isRef(searchSituacao) ? searchSituacao.value = $event : null,
                          items: unref(situacoes),
                          label: "Situa\xE7\xE3o",
                          clearable: ""
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VAutocomplete, {
                            modelValue: unref(searchSituacao),
                            "onUpdate:modelValue": ($event) => isRef(searchSituacao) ? searchSituacao.value = $event : null,
                            items: unref(situacoes),
                            label: "Situa\xE7\xE3o",
                            clearable: ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
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
                          modelValue: unref(searchSituacao),
                          "onUpdate:modelValue": ($event) => isRef(searchSituacao) ? searchSituacao.value = $event : null,
                          items: unref(situacoes),
                          label: "Situa\xE7\xE3o",
                          clearable: ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
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
              items: unref(filteredItems),
              "item-key": "id"
            }, {
              "item.actions": withCtx(({ item }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VRow, { style: { "display": "flex", "gap": "4px", "margin-top": "-5px" } }, {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="${ssrRenderClass({ disabled: !item.btn_receber })}"${ssrRenderAttr("title", item.btn_receber ? "Receber" : "Bloqueado")} title="Receber"${_scopeId3}><img style="${ssrRenderStyle({
                          cursor: item.btn_receber ? "pointer" : "default",
                          width: "30px",
                          height: "30px"
                        })}"${ssrRenderAttr("src", _imports_2)} alt="Receber"${_scopeId3}></div><div class="${ssrRenderClass({ disabled: !item.btn_encerrar })}" title="Cancelamento"${_scopeId3}><img style="${ssrRenderStyle({ "width": "30px", "height": "30px", "cursor": "pointer" })}"${ssrRenderAttr("src", _imports_0)} alt="Encerrar" title="Encerrar"${_scopeId3}></div>`);
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
                            class: { disabled: !item.btn_encerrar },
                            onClick: ($event) => item.btn_encerrar ? openCancelamentoModal(item.id) : false,
                            title: "Cancelamento"
                          }, [
                            createVNode("img", {
                              style: { "width": "30px", "height": "30px", "cursor": "pointer" },
                              src: _imports_0,
                              alt: "Encerrar",
                              title: "Encerrar"
                            })
                          ], 10, ["onClick"])
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VRow, { style: { "display": "flex", "gap": "4px", "margin-top": "-5px" } }, {
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
                          class: { disabled: !item.btn_encerrar },
                          onClick: ($event) => item.btn_encerrar ? openCancelamentoModal(item.id) : false,
                          title: "Cancelamento"
                        }, [
                          createVNode("img", {
                            style: { "width": "30px", "height": "30px", "cursor": "pointer" },
                            src: _imports_0,
                            alt: "Encerrar",
                            title: "Encerrar"
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
              show: unref(isModalRecebimentoOpen),
              numero_os: unref(numero_os),
              ordem: unref(selectedOrder),
              onClose: ($event) => isModalRecebimentoOpen.value = false
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_ModalConfirmacao, {
              onConfirm: ($event) => encerrarOS(unref(selectedOrder)),
              condMessage: unref(condMessage),
              show: unref(isModalCancelamentoOpen),
              onClose: ($event) => isModalCancelamentoOpen.value = false
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(VRow, { class: "mb-5" }, {
                default: withCtx(() => [
                  createVNode("h1", null, "Recebimento de Ordens de Servi\xE7o")
                ]),
                _: 1
              }),
              createVNode(VRow, null, {
                default: withCtx(() => [
                  createVNode(VCol, { cols: "2" }, {
                    default: withCtx(() => [
                      createVNode(VTextField, {
                        modelValue: unref(searchNumero),
                        "onUpdate:modelValue": ($event) => isRef(searchNumero) ? searchNumero.value = $event : null,
                        type: "text",
                        label: "N\xFAmero"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(VCol, { md: "3" }, {
                    default: withCtx(() => [
                      createVNode(VTextField, {
                        modelValue: unref(searchApresentante),
                        "onUpdate:modelValue": ($event) => isRef(searchApresentante) ? searchApresentante.value = $event : null,
                        label: "Apresentante"
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
                        modelValue: unref(searchSituacao),
                        "onUpdate:modelValue": ($event) => isRef(searchSituacao) ? searchSituacao.value = $event : null,
                        items: unref(situacoes),
                        label: "Situa\xE7\xE3o",
                        clearable: ""
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode("hr", { class: "mt-5 mb-5" }),
              createVNode(VDataTable, {
                headers,
                items: unref(filteredItems),
                "item-key": "id"
              }, {
                "item.actions": withCtx(({ item }) => [
                  createVNode(VRow, { style: { "display": "flex", "gap": "4px", "margin-top": "-5px" } }, {
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
                        class: { disabled: !item.btn_encerrar },
                        onClick: ($event) => item.btn_encerrar ? openCancelamentoModal(item.id) : false,
                        title: "Cancelamento"
                      }, [
                        createVNode("img", {
                          style: { "width": "30px", "height": "30px", "cursor": "pointer" },
                          src: _imports_0,
                          alt: "Encerrar",
                          title: "Encerrar"
                        })
                      ], 10, ["onClick"])
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
              createVNode(_component_ModalConfirmacao, {
                onConfirm: ($event) => encerrarOS(unref(selectedOrder)),
                condMessage: unref(condMessage),
                show: unref(isModalCancelamentoOpen),
                onClose: ($event) => isModalCancelamentoOpen.value = false
              }, null, 8, ["onConfirm", "condMessage", "show", "onClose"])
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
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/recebimentoOs/Os.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : undefined;
};
const _sfc_main$1 = {
  __name: "Lan\xE7amentos",
  __ssrInlineRender: true,
  setup(__props) {
    const config = useRuntimeConfig();
    const { $toast } = useNuxtApp();
    const listarLancamentoCaixa = `${config.public.managemant}/lista_lanctos_caixa`;
    const encerrarCaixa = `${config.public.managemant}/caixasLanctos`;
    useCookie("caixa-service").value.usuario_nome;
    useCookie("caixa-service").value.data;
    const lancamentoCaixa = ref([]);
    const searchDescricao = ref("");
    const searchFormaReceb = ref("");
    const searchNumero = ref("");
    const searchApresentante = ref("");
    const selectedOrder = ref({});
    ref(null);
    const condMessage = ref(
      "O encerramento de OS n\xE3o poder\xE1 ser revertido. Confirma o encerramento?"
    );
    ref(false);
    const isModalCancelamentoOpen = ref(false);
    const goBack = () => {
      navigateTo("/caixas/lista");
    };
    const headers = [
      { title: "Forma recebimento", value: "forma_receb" },
      { title: "Valor", value: "valor" },
      { title: "Descri\xE7\xE3o", value: "descricao" },
      { title: "O.S", value: "ordemserv_numero" },
      { title: "Apresentatante", value: "apresentante_nome" },
      { title: "Usu\xE1rio", value: "usuario_nome" },
      { title: "A\xE7\xF5es", value: "actions" }
    ];
    const searchSituacao = ref("");
    async function lancamentoCaixaPayload() {
      try {
        const response = await $fetch(listarLancamentoCaixa, {
          method: "POST",
          body: {
            caixa_token: useCookie("caixa-service").value.caixa_token
          }
        });
        if (response && Array.isArray(response)) {
          lancamentoCaixa.value = response;
        } else {
          $toast.error("Erro ao buscar dados da API.");
        }
      } catch (error) {
        const errorMessage = error.message || "Erro ao buscar dados da API. Tente novamente.";
        $toast.error(errorMessage);
      }
    }
    async function HandleDelete(item) {
      try {
        item.excluido = !item.excluido;
        const { data, error } = await useFetch(`${encerrarCaixa}/${item.id}`, {
          method: "PUT",
          body: { excluido: item.excluido },
          headers: {
            "Content-Type": "application/json"
          }
        }, "$LFu4iQCu2T");
        if (error.value) {
          throw error.value;
        }
        $toast.success("Lan\xE7amento exclu\xEDdo com sucesso!");
        await lancamentoCaixaPayload();
      } catch (err) {
        console.error("Erro ao excluir lan\xE7amento:", err);
        $toast.error("Erro ao excluir lan\xE7amento");
      }
    }
    async function encerrarCaixaLancamento(id) {
      try {
        const response = await $fetch(`${encerrarCaixa}/${id}`, {
          method: "PUT",
          body: {
            excluido: true
          }
        });
        if (response) {
          $toast.success("Lan\xE7amento do caixa encerrada com sucesso!");
          isModalCancelamentoOpen.value = false;
          lancamentoCaixaPayload();
        } else {
          $toast.error("Erro ao encerrar o Lan\xE7amento do caixa. Tente novamente.");
        }
      } catch (error) {
        const errorMessage = error.message || "Erro ao buscar dados da API. Tente novamente.";
        $toast.error(errorMessage);
      }
    }
    const filteredItems = computed(() => {
      return lancamentoCaixa.value.filter((item) => {
        const numero = item.numero ? item.numero.toString().toLowerCase() : "";
        const apresentante = item.apresentante_nome ? item.apresentante_nome.toLowerCase() : "";
        const situacao = item.situacao ? item.situacao.toUpperCase() : "";
        const descricao = item.descricao ? item.descricao.toLowerCase() : "";
        const formaReceb = item.forma_receb ? item.forma_receb.toLowerCase() : "";
        const matchesNumero = numero.includes(searchNumero.value.toLowerCase());
        const matchesApresentante = apresentante.includes(
          searchApresentante.value.toLowerCase()
        );
        const matchesSituacao = searchSituacao.value ? situacao === searchSituacao.value : true;
        const matchesDescricao = descricao.includes(
          searchDescricao.value.toLowerCase()
        );
        const matchesFormaReceb = formaReceb.includes(
          searchFormaReceb.value.toLowerCase()
        );
        return matchesNumero && matchesApresentante && matchesSituacao && matchesDescricao && matchesFormaReceb;
      });
    });
    const redirectCreateCaixa = () => {
      navigateTo("/caixas/cadastro");
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      const _component_ModalConfirmacao = _sfc_main$4;
      const _component_v_rows = resolveComponent("v-rows");
      const _component_v_cols = resolveComponent("v-cols");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(VContainer, { class: "mt-5" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VRow, { class: "mb-5" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<h1${_scopeId2}>Lan\xE7amentos do caixa</h1>`);
                  _push3(ssrRenderComponent(_component_NuxtLink, { to: "/caixas/cadastro" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<img style="${ssrRenderStyle({ "width": "60px", "height": "60px", "cursor": "pointer", "margin-left": "70px" })}"${ssrRenderAttr("src", _imports_0$1)} alt="novo"${_scopeId3}>`);
                      } else {
                        return [
                          createVNode("img", {
                            style: { "width": "60px", "height": "60px", "cursor": "pointer", "margin-left": "70px" },
                            src: _imports_0$1,
                            alt: "novo",
                            onClick: redirectCreateCaixa
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode("h1", null, "Lan\xE7amentos do caixa"),
                    createVNode(_component_NuxtLink, { to: "/caixas/cadastro" }, {
                      default: withCtx(() => [
                        createVNode("img", {
                          style: { "width": "60px", "height": "60px", "cursor": "pointer", "margin-left": "70px" },
                          src: _imports_0$1,
                          alt: "novo",
                          onClick: redirectCreateCaixa
                        })
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
                  _push3(ssrRenderComponent(VCol, { cols: "3" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VTextField, {
                          modelValue: unref(searchDescricao),
                          "onUpdate:modelValue": ($event) => isRef(searchDescricao) ? searchDescricao.value = $event : null,
                          label: "Descri\xE7\xE3o"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VTextField, {
                            modelValue: unref(searchDescricao),
                            "onUpdate:modelValue": ($event) => isRef(searchDescricao) ? searchDescricao.value = $event : null,
                            label: "Descri\xE7\xE3o"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VCol, { cols: "3" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VTextField, {
                          modelValue: unref(searchFormaReceb),
                          "onUpdate:modelValue": ($event) => isRef(searchFormaReceb) ? searchFormaReceb.value = $event : null,
                          label: "Forma de Recebimento"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VTextField, {
                            modelValue: unref(searchFormaReceb),
                            "onUpdate:modelValue": ($event) => isRef(searchFormaReceb) ? searchFormaReceb.value = $event : null,
                            label: "Forma de Recebimento"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VCol, { cols: "3" }, {
                      default: withCtx(() => [
                        createVNode(VTextField, {
                          modelValue: unref(searchDescricao),
                          "onUpdate:modelValue": ($event) => isRef(searchDescricao) ? searchDescricao.value = $event : null,
                          label: "Descri\xE7\xE3o"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, { cols: "3" }, {
                      default: withCtx(() => [
                        createVNode(VTextField, {
                          modelValue: unref(searchFormaReceb),
                          "onUpdate:modelValue": ($event) => isRef(searchFormaReceb) ? searchFormaReceb.value = $event : null,
                          label: "Forma de Recebimento"
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
              items: unref(filteredItems),
              "item-key": "id"
            }, {
              "item.actions": withCtx(({ item }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VRow, { style: { "display": "flex", "gap": "4px", "margin-top": "-5px" } }, {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div style="${ssrRenderStyle({ "cursor": "pointer" })}" title="Cancelamento"${_scopeId3}>`);
                        if (item.excluido) {
                          _push4(`<img style="${ssrRenderStyle({ "width": "30px", "height": "30px" })}"${ssrRenderAttr("src", _imports_2$1)} alt="Visualizar" title="Reativar"${_scopeId3}>`);
                        } else {
                          _push4(`<img${ssrRenderAttr("src", _imports_3)} alt="Excluir" class="trash-icon" style="${ssrRenderStyle({ "width": "30px", "height": "30px" })}" title="Excluir"${_scopeId3}>`);
                        }
                        _push4(`</div>`);
                      } else {
                        return [
                          createVNode("div", {
                            style: { "cursor": "pointer" },
                            onClick: ($event) => HandleDelete(item),
                            title: "Cancelamento"
                          }, [
                            item.excluido ? (openBlock(), createBlock("img", {
                              key: 0,
                              style: { "width": "30px", "height": "30px" },
                              src: _imports_2$1,
                              alt: "Visualizar",
                              title: "Reativar"
                            })) : (openBlock(), createBlock("img", {
                              key: 1,
                              src: _imports_3,
                              alt: "Excluir",
                              class: "trash-icon",
                              style: { "width": "30px", "height": "30px" },
                              title: "Excluir"
                            }))
                          ], 8, ["onClick"])
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VRow, { style: { "display": "flex", "gap": "4px", "margin-top": "-5px" } }, {
                      default: withCtx(() => [
                        createVNode("div", {
                          style: { "cursor": "pointer" },
                          onClick: ($event) => HandleDelete(item),
                          title: "Cancelamento"
                        }, [
                          item.excluido ? (openBlock(), createBlock("img", {
                            key: 0,
                            style: { "width": "30px", "height": "30px" },
                            src: _imports_2$1,
                            alt: "Visualizar",
                            title: "Reativar"
                          })) : (openBlock(), createBlock("img", {
                            key: 1,
                            src: _imports_3,
                            alt: "Excluir",
                            class: "trash-icon",
                            style: { "width": "30px", "height": "30px" },
                            title: "Excluir"
                          }))
                        ], 8, ["onClick"])
                      ]),
                      _: 2
                    }, 1024)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_ModalConfirmacao, {
              onConfirm: ($event) => encerrarCaixaLancamento(unref(selectedOrder)),
              condMessage: unref(condMessage),
              show: unref(isModalCancelamentoOpen),
              onClose: ($event) => isModalCancelamentoOpen.value = false
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(VRow, { class: "mb-5" }, {
                default: withCtx(() => [
                  createVNode("h1", null, "Lan\xE7amentos do caixa"),
                  createVNode(_component_NuxtLink, { to: "/caixas/cadastro" }, {
                    default: withCtx(() => [
                      createVNode("img", {
                        style: { "width": "60px", "height": "60px", "cursor": "pointer", "margin-left": "70px" },
                        src: _imports_0$1,
                        alt: "novo",
                        onClick: redirectCreateCaixa
                      })
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(VRow, null, {
                default: withCtx(() => [
                  createVNode(VCol, { cols: "3" }, {
                    default: withCtx(() => [
                      createVNode(VTextField, {
                        modelValue: unref(searchDescricao),
                        "onUpdate:modelValue": ($event) => isRef(searchDescricao) ? searchDescricao.value = $event : null,
                        label: "Descri\xE7\xE3o"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(VCol, { cols: "3" }, {
                    default: withCtx(() => [
                      createVNode(VTextField, {
                        modelValue: unref(searchFormaReceb),
                        "onUpdate:modelValue": ($event) => isRef(searchFormaReceb) ? searchFormaReceb.value = $event : null,
                        label: "Forma de Recebimento"
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
                items: unref(filteredItems),
                "item-key": "id"
              }, {
                "item.actions": withCtx(({ item }) => [
                  createVNode(VRow, { style: { "display": "flex", "gap": "4px", "margin-top": "-5px" } }, {
                    default: withCtx(() => [
                      createVNode("div", {
                        style: { "cursor": "pointer" },
                        onClick: ($event) => HandleDelete(item),
                        title: "Cancelamento"
                      }, [
                        item.excluido ? (openBlock(), createBlock("img", {
                          key: 0,
                          style: { "width": "30px", "height": "30px" },
                          src: _imports_2$1,
                          alt: "Visualizar",
                          title: "Reativar"
                        })) : (openBlock(), createBlock("img", {
                          key: 1,
                          src: _imports_3,
                          alt: "Excluir",
                          class: "trash-icon",
                          style: { "width": "30px", "height": "30px" },
                          title: "Excluir"
                        }))
                      ], 8, ["onClick"])
                    ]),
                    _: 2
                  }, 1024)
                ]),
                _: 1
              }, 8, ["items"]),
              createVNode(_component_ModalConfirmacao, {
                onConfirm: ($event) => encerrarCaixaLancamento(unref(selectedOrder)),
                condMessage: unref(condMessage),
                show: unref(isModalCancelamentoOpen),
                onClose: ($event) => isModalCancelamentoOpen.value = false
              }, null, 8, ["onConfirm", "condMessage", "show", "onClose"])
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
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/recebimentoOs/Lan\xE7amentos.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : undefined;
};
const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const activeTab = ref("ordens");
    useCookie("caixa-service").value.data;
    useCookie("caixa-service").value.usuario_nome;
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(VContainer, mergeProps({ class: "mt-5" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VTabs, {
              modelValue: unref(activeTab),
              "onUpdate:modelValue": ($event) => isRef(activeTab) ? activeTab.value = $event : null
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VTab, { value: "ordens" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Ordens de Servi\xE7o`);
                      } else {
                        return [
                          createTextVNode("Ordens de Servi\xE7o")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VTab, { value: "lancamentos" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Lan\xE7amentos`);
                      } else {
                        return [
                          createTextVNode("Lan\xE7amentos")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VTab, { value: "ordens" }, {
                      default: withCtx(() => [
                        createTextVNode("Ordens de Servi\xE7o")
                      ]),
                      _: 1
                    }),
                    createVNode(VTab, { value: "lancamentos" }, {
                      default: withCtx(() => [
                        createTextVNode("Lan\xE7amentos")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(VWindow, {
              modelValue: unref(activeTab),
              "onUpdate:modelValue": ($event) => isRef(activeTab) ? activeTab.value = $event : null
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VWindowItem, { value: "ordens" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_sfc_main$2, null, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_sfc_main$2)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VWindowItem, { value: "lancamentos" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_sfc_main$1, null, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_sfc_main$1)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VWindowItem, { value: "ordens" }, {
                      default: withCtx(() => [
                        createVNode(_sfc_main$2)
                      ]),
                      _: 1
                    }),
                    createVNode(VWindowItem, { value: "lancamentos" }, {
                      default: withCtx(() => [
                        createVNode(_sfc_main$1)
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
              createVNode(VTabs, {
                modelValue: unref(activeTab),
                "onUpdate:modelValue": ($event) => isRef(activeTab) ? activeTab.value = $event : null
              }, {
                default: withCtx(() => [
                  createVNode(VTab, { value: "ordens" }, {
                    default: withCtx(() => [
                      createTextVNode("Ordens de Servi\xE7o")
                    ]),
                    _: 1
                  }),
                  createVNode(VTab, { value: "lancamentos" }, {
                    default: withCtx(() => [
                      createTextVNode("Lan\xE7amentos")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["modelValue", "onUpdate:modelValue"]),
              createVNode(VWindow, {
                modelValue: unref(activeTab),
                "onUpdate:modelValue": ($event) => isRef(activeTab) ? activeTab.value = $event : null
              }, {
                default: withCtx(() => [
                  createVNode(VWindowItem, { value: "ordens" }, {
                    default: withCtx(() => [
                      createVNode(_sfc_main$2)
                    ]),
                    _: 1
                  }),
                  createVNode(VWindowItem, { value: "lancamentos" }, {
                    default: withCtx(() => [
                      createVNode(_sfc_main$1)
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["modelValue", "onUpdate:modelValue"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/caixas/caixasRecebimentoOs/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : undefined;
};

export { _sfc_main as default };
//# sourceMappingURL=index-DU7EtefN.mjs.map
