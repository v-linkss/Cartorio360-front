import { ref, reactive, mergeProps, withCtx, createVNode, unref, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderStyle, ssrRenderAttr, ssrRenderClass } from 'vue/server-renderer';
import { _ as _imports_1 } from './visualizar-BoZ30DMV.mjs';
import { _ as _imports_2 } from './recebe-D8d082aE.mjs';
import { _ as _imports_0 } from './salvar-DQISB1bG.mjs';
import { b as useNuxtApp, u as useRouter$1, e as useCookie, f as VTextField, c as useRuntimeConfig, a as navigateTo } from './server.mjs';
import { u as useFetch } from './fetch-uf6n1sXR.mjs';
import { f as formatDate } from './formatDate-DflkuJ_V.mjs';
import { V as VContainer } from './VContainer-CUysD4sO.mjs';
import { V as VRow } from './VRow-Bqz0CuIN.mjs';
import { V as VCol } from './VCol-BT4RzX0Q.mjs';
import { V as VAutocomplete } from './VAutocomplete-C8djLHoj.mjs';
import { V as VDataTable } from './VDataTable-C_f4_7jt.mjs';
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
import './filter-bkfdtiUs.mjs';
import './VList-D_RDxmYC.mjs';
import './VAvatar-DbYv82M1.mjs';
import './VImg-DADPV1UJ.mjs';
import './VResponsive-BwPb2GHE.mjs';
import './VDivider-BxKHtM2e.mjs';
import './VSelectionControl-DI6QefPE.mjs';

const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const config = useRuntimeConfig();
    const { $toast } = useNuxtApp();
    `${config.public.managemant}/listarUsuarios`;
    const getCaixas = `${config.public.managemant}/listarCaixas`;
    const router = useRouter$1();
    const cartorio_token = ref(useCookie("user-data").value.cartorio_token) || null;
    const usuariosItems = ref([]);
    const caixaItems = ref([]);
    const situacaoItems = ref(["PENDENTE", "ENCERRADO", "CANCELADO"]);
    const numero_os = ref(null);
    const servicosItems = ref([]);
    const state = reactive({
      data: getCurrentDate(),
      situacao: null,
      usuario_token: null
    });
    const headers = [
      { title: "Data", value: "data" },
      { title: "Situa\xE7\xE3o", value: "situacao" },
      { title: "Usu\xE1rio", value: "usuario_nome" },
      { title: "A\xE7\xF5es", value: "actions", sortable: false }
    ];
    function getCurrentDate() {
      const today = /* @__PURE__ */ new Date();
      const yyyy = today.getFullYear();
      const MM = String(today.getMonth() + 1).padStart(2, "0");
      const dd = String(today.getDate()).padStart(2, "0");
      return `${yyyy}-${MM}-${dd}`;
    }
    async function searchCaixas() {
      try {
        sessionStorage.setItem("pesquisaCaixas", JSON.stringify(state));
        const { data: caixasData } = await useFetch(getCaixas, {
          method: "POST",
          body: {
            cartorio_token: cartorio_token.value,
            ussuario_token: state.usuario_token,
            data: state.data || null,
            situacao: state.situacao
          }
        }, "$XYvyo77vvU");
        if (caixasData.value.length > 0) {
          caixaItems.value = caixasData.value.map((item) => {
            return {
              ...item,
              data: formatDate(item.data, "dd/mm/yyyy")
            };
          });
        } else {
          caixaItems.value = [];
          $toast.error("N\xE3o existe caixa registrada!");
        }
      } catch (error) {
        $toast.error("Erro ao buscar caixas.");
        console.error(error);
      }
    }
    function redirectToCancelamento(numero, token) {
      numero_os.value = numero;
    }
    function redirectToUpdate(id) {
      const serviceCookie = useCookie("user-service");
      const servico = servicosItems.value.find((item) => item.id === id);
      serviceCookie.value = JSON.stringify({
        id: servico.id,
        token: servico.token
      });
      router.push({ path: `/os/atualizar/${id}` });
    }
    function redirectToCiaxasRecebimento(item) {
      const serviceCookie = useCookie("caixa-service");
      serviceCookie.value = JSON.stringify({
        caixa_token: item.token,
        usuario_nome: item.usuario_nome,
        data: item.data,
        caixa_id: item.id
      });
      navigateTo("/caixas/caixasRecebimentoOs");
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(VContainer, mergeProps({ class: "mt-5" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VRow, { class: "mb-5" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<h1${_scopeId2}>Caixas</h1>`);
                } else {
                  return [
                    createVNode("h1", null, "Caixas")
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
                          modelValue: unref(state).data,
                          "onUpdate:modelValue": ($event) => unref(state).data = $event,
                          type: "date",
                          label: "Data"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VTextField, {
                            modelValue: unref(state).data,
                            "onUpdate:modelValue": ($event) => unref(state).data = $event,
                            type: "date",
                            label: "Data"
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
                          label: "Usu\xE1rio"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VAutocomplete, {
                            items: unref(usuariosItems),
                            modelValue: unref(state).usuario_token,
                            "onUpdate:modelValue": ($event) => unref(state).usuario_token = $event,
                            "item-title": "user_nome",
                            "item-value": "user_token",
                            label: "Usu\xE1rio"
                          }, null, 8, ["items", "modelValue", "onUpdate:modelValue"])
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
                              onClick: searchCaixas,
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
                          modelValue: unref(state).data,
                          "onUpdate:modelValue": ($event) => unref(state).data = $event,
                          type: "date",
                          label: "Data"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
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
                          label: "Usu\xE1rio"
                        }, null, 8, ["items", "modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, null, {
                      default: withCtx(() => [
                        createVNode("div", null, [
                          createVNode("img", {
                            onClick: searchCaixas,
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
              items: unref(caixaItems),
              "item-key": "id"
            }, {
              "item.actions": withCtx(({ item }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VRow, { style: { "display": "flex", "gap": "10px", "margin-top": "-5px" } }, {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="${ssrRenderClass({ disabled: !item.btn_receber })}"${ssrRenderAttr("title", item.btn_receber ? "Receber" : "Bloqueado")}${_scopeId3}><img style="${ssrRenderStyle({
                          cursor: item.btn_receber ? "pointer" : "default",
                          width: "30px",
                          height: "30px"
                        })}"${ssrRenderAttr("src", _imports_2)} alt="Receber"${_scopeId3}></div><div class="${ssrRenderClass({ disabled: !item.btn_editar })}"${ssrRenderAttr("title", item.btn_editar ? "Editar" : "Bloqueado")}${_scopeId3}><img style="${ssrRenderStyle({
                          cursor: item.btn_editar ? "pointer" : "default",
                          width: "30px",
                          height: "30px"
                        })}"${ssrRenderAttr("src", _imports_0)} alt="Salvar"${_scopeId3}></div><div class="${ssrRenderClass({ disabled: !item.btn_cancelar })}" title="Bloquear"${_scopeId3}><img style="${ssrRenderStyle({ "width": "30px", "height": "30px" })}"${ssrRenderAttr("src", _imports_1)} alt="Visualizar"${_scopeId3}></div>`);
                      } else {
                        return [
                          createVNode("div", {
                            class: { disabled: !item.btn_receber },
                            title: item.btn_receber ? "Receber" : "Bloqueado",
                            onClick: ($event) => item.btn_receber ? redirectToCiaxasRecebimento(item) : null
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
                              src: _imports_0,
                              alt: "Salvar"
                            }, null, 4)
                          ], 10, ["onClick", "title"]),
                          createVNode("div", {
                            class: { disabled: !item.btn_cancelar },
                            onClick: ($event) => item.btn_cancelar ? redirectToCancelamento(item.numero, item.token) : null,
                            title: "Bloquear"
                          }, [
                            createVNode("img", {
                              style: { "width": "30px", "height": "30px" },
                              src: _imports_1,
                              alt: "Visualizar"
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
                          onClick: ($event) => item.btn_receber ? redirectToCiaxasRecebimento(item) : null
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
                            src: _imports_0,
                            alt: "Salvar"
                          }, null, 4)
                        ], 10, ["onClick", "title"]),
                        createVNode("div", {
                          class: { disabled: !item.btn_cancelar },
                          onClick: ($event) => item.btn_cancelar ? redirectToCancelamento(item.numero, item.token) : null,
                          title: "Bloquear"
                        }, [
                          createVNode("img", {
                            style: { "width": "30px", "height": "30px" },
                            src: _imports_1,
                            alt: "Visualizar"
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
          } else {
            return [
              createVNode(VRow, { class: "mb-5" }, {
                default: withCtx(() => [
                  createVNode("h1", null, "Caixas")
                ]),
                _: 1
              }),
              createVNode(VRow, null, {
                default: withCtx(() => [
                  createVNode(VCol, { cols: "2" }, {
                    default: withCtx(() => [
                      createVNode(VTextField, {
                        modelValue: unref(state).data,
                        "onUpdate:modelValue": ($event) => unref(state).data = $event,
                        type: "date",
                        label: "Data"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
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
                        label: "Usu\xE1rio"
                      }, null, 8, ["items", "modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(VCol, null, {
                    default: withCtx(() => [
                      createVNode("div", null, [
                        createVNode("img", {
                          onClick: searchCaixas,
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
                items: unref(caixaItems),
                "item-key": "id"
              }, {
                "item.actions": withCtx(({ item }) => [
                  createVNode(VRow, { style: { "display": "flex", "gap": "10px", "margin-top": "-5px" } }, {
                    default: withCtx(() => [
                      createVNode("div", {
                        class: { disabled: !item.btn_receber },
                        title: item.btn_receber ? "Receber" : "Bloqueado",
                        onClick: ($event) => item.btn_receber ? redirectToCiaxasRecebimento(item) : null
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
                          src: _imports_0,
                          alt: "Salvar"
                        }, null, 4)
                      ], 10, ["onClick", "title"]),
                      createVNode("div", {
                        class: { disabled: !item.btn_cancelar },
                        onClick: ($event) => item.btn_cancelar ? redirectToCancelamento(item.numero, item.token) : null,
                        title: "Bloquear"
                      }, [
                        createVNode("img", {
                          style: { "width": "30px", "height": "30px" },
                          src: _imports_1,
                          alt: "Visualizar"
                        })
                      ], 10, ["onClick"])
                    ]),
                    _: 2
                  }, 1024)
                ]),
                _: 1
              }, 8, ["items"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/caixas/lista/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : undefined;
};

export { _sfc_main as default };
//# sourceMappingURL=index-D2YMTcQD.mjs.map
