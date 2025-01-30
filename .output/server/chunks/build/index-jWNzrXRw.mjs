import { ref, computed, mergeProps, withCtx, unref, createVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrInterpolate, ssrRenderClass, ssrRenderAttr, ssrRenderStyle } from 'vue/server-renderer';
import { _ as _imports_2 } from './recebe-D8d082aE.mjs';
import { _ as _imports_0 } from './salvar-DQISB1bG.mjs';
import { _ as _imports_1 } from './visualizar-BoZ30DMV.mjs';
import { b as useNuxtApp, e as useCookie, V as VTextField, c as useRuntimeConfig } from './server.mjs';
import { V as VContainer } from './VContainer-DUPM_BP9.mjs';
import { V as VRow } from './VRow-DbcfFNio.mjs';
import { V as VCol } from './VCol-BY-FaYhw.mjs';
import { V as VDataTable } from './VDataTable-C53h7B9w.mjs';
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
import './filter-DK3_4lVs.mjs';
import './VList-iVnq_OpI.mjs';
import './VAvatar-DEYOjnUS.mjs';
import './VResponsive-_f8EzDDz.mjs';

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
      console.log("Recebendo OS:", { numero, item });
    }
    function redirectToUpdate(id) {
      console.log("Editando OS:", id);
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(VContainer, mergeProps({ class: "mt-5" }, _attrs), {
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
                        })}"${ssrRenderAttr("src", _imports_2)} alt="Receber"${_scopeId3}></div><div class="${ssrRenderClass({ disabled: !item.btn_editar })}"${ssrRenderAttr("title", item.btn_editar ? "Editar" : "Bloqueado")}${_scopeId3}><img style="${ssrRenderStyle({
                          cursor: item.btn_editar ? "pointer" : "default",
                          width: "30px",
                          height: "30px"
                        })}"${ssrRenderAttr("src", _imports_0)} alt="Salvar"${_scopeId3}></div><div class="${ssrRenderClass({ disabled: !item.btn_cancelar })}" title="Cancelamento"${_scopeId3}><img style="${ssrRenderStyle({ "width": "30px", "height": "30px" })}"${ssrRenderAttr("src", _imports_1)} alt="Visualizar" title="Visualizar"${_scopeId3}></div>`);
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
                              src: _imports_0,
                              alt: "Salvar"
                            }, null, 4)
                          ], 10, ["onClick", "title"]),
                          createVNode("div", {
                            class: { disabled: !item.btn_cancelar },
                            onClick: ($event) => item.btn_cancelar ? redirectToCancelamento(item.numero, item.token) : null,
                            title: "Cancelamento"
                          }, [
                            createVNode("img", {
                              style: { "width": "30px", "height": "30px" },
                              src: _imports_1,
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
                          title: "Cancelamento"
                        }, [
                          createVNode("img", {
                            style: { "width": "30px", "height": "30px" },
                            src: _imports_1,
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
                        title: "Cancelamento"
                      }, [
                        createVNode("img", {
                          style: { "width": "30px", "height": "30px" },
                          src: _imports_1,
                          alt: "Visualizar",
                          title: "Visualizar"
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/caixas/caixasRecebimentoOs/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : undefined;
};

export { _sfc_main as default };
//# sourceMappingURL=index-jWNzrXRw.mjs.map
