import { _ as _sfc_main$1 } from './Ordem-IeOesCrJ.mjs';
import { _ as _sfc_main$2 } from './Confirmacao-DhfM-U61.mjs';
import { ref, computed, resolveComponent, withCtx, unref, createVNode, toDisplayString, isRef, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrInterpolate, ssrRenderClass, ssrRenderAttr, ssrRenderStyle } from 'vue/server-renderer';
import { _ as _imports_2 } from './recebe-D8d082aE.mjs';
import { _ as _imports_1 } from './visualizar-BoZ30DMV.mjs';
import { b as useNuxtApp, e as useCookie, V as VTextField, f as VBtn, c as useRuntimeConfig, a as navigateTo } from './server.mjs';
import { V as VContainer } from './VContainer-CTpFP9Uv.mjs';
import { V as VRow } from './VRow-CFCOc45b.mjs';
import { V as VCol } from './VCol-SA9_fG05.mjs';
import { V as VDataTable } from './VDataTable-C3n1YD6y.mjs';
import './MoneyInput-ot-UsY0X.mjs';
import 'v-money3';
import './VDialog-D0zunqbh.mjs';
import './VAvatar-CmbR2XIC.mjs';
import './VResponsive-dUk8X3PH.mjs';
import './excluido-CyV-jbSn.mjs';
import './VAutocomplete-CsH0CvxZ.mjs';
import './filter-D8lmgvWc.mjs';
import './VList-BYK7AaxH.mjs';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:fs';
import 'node:path';
import 'node:url';
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
    const { $toast } = useNuxtApp();
    const listarOSCaixas = `${config.public.managemant}/listarOSCaixas`;
    const encerrarOs = `${config.public.managemant}/updateOrdensServico`;
    const nome_usuario = useCookie("caixa-service").value.usuario_nome;
    const data = useCookie("caixa-service").value.data;
    const caixaRecebeOsItems = ref([]);
    const searchNumero = ref("");
    const searchApresentante = ref("");
    const selectedOrder = ref({});
    const numero_os = ref(null);
    const condMessage = ref("O encerramento de OS n\xE3o poder\xE1 ser revertido. Confirma o encerramento?");
    const isModalRecebimentoOpen = ref(false);
    const isModalCancelamentoOpen = ref(false);
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
          $toast.error("Nenhum dado retornado da API.");
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
        const matchesNumero = numero.includes(searchNumero.value.toLowerCase());
        const matchesApresentante = apresentante.includes(
          searchApresentante.value.toLowerCase()
        );
        return matchesNumero && matchesApresentante;
      });
    });
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
      const _component_ModalConfirmacao = _sfc_main$2;
      const _component_v_rows = resolveComponent("v-rows");
      const _component_v_cols = resolveComponent("v-cols");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(VContainer, { class: "mt-5" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VRow, { class: "mb-5" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<h1${_scopeId2}> Recebimento de Ordens de Servi\xE7o - Caixa ${ssrInterpolate(unref(data))} - ${ssrInterpolate(unref(nome_usuario))}</h1>`);
                } else {
                  return [
                    createVNode("h1", null, " Recebimento de Ordens de Servi\xE7o - Caixa " + toDisplayString(unref(data)) + " - " + toDisplayString(unref(nome_usuario)), 1)
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
            _push2(`<hr class="mt-5 mb-5"${_scopeId}>`);
            _push2(ssrRenderComponent(VDataTable, {
              headers,
              items: unref(filteredItems),
              "item-key": "id"
            }, {
              "item.actions": withCtx(({ item }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VRow, { style: { "display": "flex", "gap": "10px", "margin-top": "-5px" } }, {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="${ssrRenderClass({ disabled: !item.btn_receber })}"${ssrRenderAttr("title", item.btn_receber ? "Bloqueado" : "Receber")} title="Receber"${_scopeId3}><img style="${ssrRenderStyle({
                          cursor: item.btn_receber ? "default" : "pointer",
                          width: "30px",
                          height: "30px"
                        })}"${ssrRenderAttr("src", _imports_2)} alt="Receber"${_scopeId3}></div><div class="${ssrRenderClass({ disabled: !item.btn_encerrar })}" title="Cancelamento"${_scopeId3}><img style="${ssrRenderStyle({ "width": "30px", "height": "30px", "cursor": "pointer" })}"${ssrRenderAttr("src", _imports_1)} alt="Encerrar" title="Encerrar"${_scopeId3}></div>`);
                      } else {
                        return [
                          createVNode("div", {
                            class: { disabled: !item.btn_receber },
                            title: item.btn_receber ? "Bloqueado" : "Receber",
                            onClick: ($event) => item.btn_receber ? null : redirectToRecebimento(item.numero, item)
                          }, [
                            createVNode("img", {
                              style: {
                                cursor: item.btn_receber ? "default" : "pointer",
                                width: "30px",
                                height: "30px"
                              },
                              src: _imports_2,
                              alt: "Receber"
                            }, null, 4)
                          ], 10, ["title", "onClick"]),
                          createVNode("div", {
                            class: { disabled: !item.btn_encerrar },
                            onClick: ($event) => item.btn_encerrar ? false : openCancelamentoModal(item.id),
                            title: "Cancelamento"
                          }, [
                            createVNode("img", {
                              style: { "width": "30px", "height": "30px", "cursor": "pointer" },
                              src: _imports_1,
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
                    createVNode(VRow, { style: { "display": "flex", "gap": "10px", "margin-top": "-5px" } }, {
                      default: withCtx(() => [
                        createVNode("div", {
                          class: { disabled: !item.btn_receber },
                          title: item.btn_receber ? "Bloqueado" : "Receber",
                          onClick: ($event) => item.btn_receber ? null : redirectToRecebimento(item.numero, item)
                        }, [
                          createVNode("img", {
                            style: {
                              cursor: item.btn_receber ? "default" : "pointer",
                              width: "30px",
                              height: "30px"
                            },
                            src: _imports_2,
                            alt: "Receber"
                          }, null, 4)
                        ], 10, ["title", "onClick"]),
                        createVNode("div", {
                          class: { disabled: !item.btn_encerrar },
                          onClick: ($event) => item.btn_encerrar ? false : openCancelamentoModal(item.id),
                          title: "Cancelamento"
                        }, [
                          createVNode("img", {
                            style: { "width": "30px", "height": "30px", "cursor": "pointer" },
                            src: _imports_1,
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
                  createVNode("h1", null, " Recebimento de Ordens de Servi\xE7o - Caixa " + toDisplayString(unref(data)) + " - " + toDisplayString(unref(nome_usuario)), 1)
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
              createVNode("hr", { class: "mt-5 mb-5" }),
              createVNode(VDataTable, {
                headers,
                items: unref(filteredItems),
                "item-key": "id"
              }, {
                "item.actions": withCtx(({ item }) => [
                  createVNode(VRow, { style: { "display": "flex", "gap": "10px", "margin-top": "-5px" } }, {
                    default: withCtx(() => [
                      createVNode("div", {
                        class: { disabled: !item.btn_receber },
                        title: item.btn_receber ? "Bloqueado" : "Receber",
                        onClick: ($event) => item.btn_receber ? null : redirectToRecebimento(item.numero, item)
                      }, [
                        createVNode("img", {
                          style: {
                            cursor: item.btn_receber ? "default" : "pointer",
                            width: "30px",
                            height: "30px"
                          },
                          src: _imports_2,
                          alt: "Receber"
                        }, null, 4)
                      ], 10, ["title", "onClick"]),
                      createVNode("div", {
                        class: { disabled: !item.btn_encerrar },
                        onClick: ($event) => item.btn_encerrar ? false : openCancelamentoModal(item.id),
                        title: "Cancelamento"
                      }, [
                        createVNode("img", {
                          style: { "width": "30px", "height": "30px", "cursor": "pointer" },
                          src: _imports_1,
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
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/caixas/caixasRecebimentoOs/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : undefined;
};

export { _sfc_main as default };
//# sourceMappingURL=index-CrfRMk_-.mjs.map
