import { _ as __nuxt_component_1 } from './Confirmacao-Dgl39c3X.mjs';
import { ref, reactive, withCtx, createVNode, unref, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderStyle, ssrRenderAttr } from 'vue/server-renderer';
import { _ as _imports_1 } from './visualizar-BoZ30DMV.mjs';
import { _ as _imports_5 } from './btn_cancela_lavratura-LRoFRHHt.mjs';
import { _ as _export_sfc, b as useNuxtApp, e as useCookie, f as VTextField, c as useRuntimeConfig } from './server.mjs';
import { u as useFetch } from './fetch-uf6n1sXR.mjs';
import { f as formatDate } from './formatDate-DflkuJ_V.mjs';
import { V as VContainer } from './VContainer-CUysD4sO.mjs';
import { V as VRow } from './VRow-Bqz0CuIN.mjs';
import { V as VCol } from './VCol-BT4RzX0Q.mjs';
import { V as VDataTable } from './VDataTable-BqxaRhj7.mjs';
import './VDialog-BVe31KMa.mjs';
import './VCard-Dbn6yWsi.mjs';
import './VAvatar-CfQAG9re.mjs';
import './VImg-CtUi4yCS.mjs';
import './VResponsive-BwPb2GHE.mjs';
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
import './asyncData-B8plM1p3.mjs';
import './filter-BaqCkjdl.mjs';
import './VList-w5fWkTAt.mjs';
import './VDivider-BxKHtM2e.mjs';
import './VSelectionControl-DI6QefPE.mjs';

const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const config = useRuntimeConfig();
    const { $toast } = useNuxtApp();
    const cancelaLavratura = `${config.public.managemant}/cancela_lavratura`;
    const pesquisaAtos = `${config.public.managemant}/pesquisaAtos`;
    const usuario_token = ref(useCookie("auth_token").value) || null;
    const cartorio_token = ref(useCookie("user-data").value.cartorio_token) || null;
    const atos = ref([]);
    const isModalCancelamentoOpen = ref(false);
    const condMessage = ref("");
    const ato_token = ref(null);
    const numero_selo = ref(null);
    const cancelamentoForcadoPendente = ref(false);
    const mensagemAvisoCondicional = ref("");
    const state = reactive({
      id: null,
      selo_numero: null
    });
    const headers = [
      {
        title: "Protocolo",
        value: "protocolo"
      },
      {
        title: "Data lavratura/Parte",
        value: "dt_lavratura"
      },
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
    async function searchAtos() {
      try {
        if (state.id === null) {
          $toast.error("Informe o ID do ato!");
          return;
        }
        sessionStorage.setItem("pesquisaAto", JSON.stringify(state));
        const { data: atosData } = await useFetch(pesquisaAtos, {
          method: "POST",
          body: {
            cartorio_token: cartorio_token.value,
            ato_id: Number(state.id) || null
          }
        }, "$xahYxgiURx");
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
    const abrirModalCancelamento = (token, selo_numero) => {
      ato_token.value = token;
      selo_numero.value = selo_numero;
      condMessage.value = "O cancelamento de lavratura \xE9 definitivo e n\xE3o poder\xE1 ser revertido. Confirma o cancelamento da lavratura deste ato?";
      cancelamentoForcadoPendente.value = false;
      isModalCancelamentoOpen.value = true;
    };
    const cancelaAto = async () => {
      if (cancelamentoForcadoPendente.value) {
        await executaCancelaAto(true);
        return;
      }
      await executaCancelaAto(false);
    };
    const executaCancelaAto = async (forcar) => {
      isModalCancelamentoOpen.value = false;
      const { data, status, error } = await useFetch(cancelaLavratura, {
        method: "POST",
        body: {
          ato_token: ato_token.value,
          user_token: usuario_token.value,
          selo_numero: numero_selo.value,
          forcar_cancelamento: forcar
        }
      }, "$0XhtmZH7s8");
      isModalCancelamentoOpen.value = false;
      if (status.value === "success" && data.value && data.value[0]) {
        const resultado = data.value[0];
        if (resultado.status === "OK") {
          $toast.success("Lavratura cancelada com sucesso!");
          atos.value = [];
          state.id = null;
          cancelamentoForcadoPendente.value = false;
        }
      } else if (status.value === "error" && error.value) {
        mensagemAvisoCondicional.value = `${error.value.data[0].status_mensagem} Confirma o cancelamento?`;
        condMessage.value = mensagemAvisoCondicional.value;
        cancelamentoForcadoPendente.value = true;
        isModalCancelamentoOpen.value = true;
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ModalConfirmacao = __nuxt_component_1;
      _push(`<!--[-->`);
      _push(ssrRenderComponent(VContainer, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VRow, { class: "mb-5" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<h1 data-v-34b0b1ff${_scopeId2}>Cancelamento de Lavratura</h1>`);
                } else {
                  return [
                    createVNode("h1", null, "Cancelamento de Lavratura")
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
                          modelValue: unref(state).id,
                          "onUpdate:modelValue": ($event) => unref(state).id = $event,
                          label: "ID do ato"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VTextField, {
                            modelValue: unref(state).id,
                            "onUpdate:modelValue": ($event) => unref(state).id = $event,
                            label: "ID do ato"
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
                          modelValue: unref(state).selo_numero,
                          "onUpdate:modelValue": ($event) => unref(state).selo_numero = $event,
                          label: "Numero do selo"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VTextField, {
                            modelValue: unref(state).selo_numero,
                            "onUpdate:modelValue": ($event) => unref(state).selo_numero = $event,
                            label: "Numero do selo"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VCol, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div data-v-34b0b1ff${_scopeId3}><img style="${ssrRenderStyle({ "width": "40px", "height": "40px", "cursor": "pointer" })}"${ssrRenderAttr("src", _imports_1)} alt="Pesquisar" data-v-34b0b1ff${_scopeId3}></div>`);
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
                          modelValue: unref(state).id,
                          "onUpdate:modelValue": ($event) => unref(state).id = $event,
                          label: "ID do ato"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, { cols: "2" }, {
                      default: withCtx(() => [
                        createVNode(VTextField, {
                          modelValue: unref(state).selo_numero,
                          "onUpdate:modelValue": ($event) => unref(state).selo_numero = $event,
                          label: "Numero do selo"
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
            _push2(`<div data-v-34b0b1ff${_scopeId}><hr class="mt-5 mb-5" data-v-34b0b1ff${_scopeId}>`);
            _push2(ssrRenderComponent(VDataTable, {
              headers,
              items: unref(atos),
              style: { "font-size": "12px" },
              "item-key": "id"
            }, {
              "item.actions": withCtx(({ item }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div style="${ssrRenderStyle({ "display": "flex", "gap": "4px", "justify-content": "center" })}" data-v-34b0b1ff${_scopeId2}><div title="Excluir" data-v-34b0b1ff${_scopeId2}><img style="${ssrRenderStyle({ "width": "30px", "height": "30px", "cursor": "pointer" })}"${ssrRenderAttr("src", _imports_5)} alt="Cancelar" title="Cancelar" data-v-34b0b1ff${_scopeId2}></div></div>`);
                } else {
                  return [
                    createVNode("div", { style: { "display": "flex", "gap": "4px", "justify-content": "center" } }, [
                      createVNode("div", {
                        onClick: ($event) => abrirModalCancelamento(item.token, item.selo_numero),
                        title: "Excluir"
                      }, [
                        createVNode("img", {
                          style: { "width": "30px", "height": "30px", "cursor": "pointer" },
                          src: _imports_5,
                          alt: "Cancelar",
                          title: "Cancelar"
                        })
                      ], 8, ["onClick"])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode(VRow, { class: "mb-5" }, {
                default: withCtx(() => [
                  createVNode("h1", null, "Cancelamento de Lavratura")
                ]),
                _: 1
              }),
              createVNode(VRow, null, {
                default: withCtx(() => [
                  createVNode(VCol, { cols: "2" }, {
                    default: withCtx(() => [
                      createVNode(VTextField, {
                        modelValue: unref(state).id,
                        "onUpdate:modelValue": ($event) => unref(state).id = $event,
                        label: "ID do ato"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(VCol, { cols: "2" }, {
                    default: withCtx(() => [
                      createVNode(VTextField, {
                        modelValue: unref(state).selo_numero,
                        "onUpdate:modelValue": ($event) => unref(state).selo_numero = $event,
                        label: "Numero do selo"
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
              }),
              createVNode("div", null, [
                createVNode("hr", { class: "mt-5 mb-5" }),
                createVNode(VDataTable, {
                  headers,
                  items: unref(atos),
                  style: { "font-size": "12px" },
                  "item-key": "id"
                }, {
                  "item.actions": withCtx(({ item }) => [
                    createVNode("div", { style: { "display": "flex", "gap": "4px", "justify-content": "center" } }, [
                      createVNode("div", {
                        onClick: ($event) => abrirModalCancelamento(item.token, item.selo_numero),
                        title: "Excluir"
                      }, [
                        createVNode("img", {
                          style: { "width": "30px", "height": "30px", "cursor": "pointer" },
                          src: _imports_5,
                          alt: "Cancelar",
                          title: "Cancelar"
                        })
                      ], 8, ["onClick"])
                    ])
                  ]),
                  _: 1
                }, 8, ["items"])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_ModalConfirmacao, {
        show: unref(isModalCancelamentoOpen),
        condMessage: unref(condMessage),
        onClose: ($event) => isModalCancelamentoOpen.value = false,
        onConfirm: cancelaAto
      }, null, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/cancela_lavratura/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : undefined;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-34b0b1ff"]]);

export { index as default };
//# sourceMappingURL=index-BUFP8fIX.mjs.map
