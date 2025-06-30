import { _ as _sfc_main$2 } from './ErrorModalCard-DJXKbqKt.mjs';
import { ref, reactive, computed, unref, mergeProps, withCtx, createTextVNode, createVNode, openBlock, createBlock, useSSRContext, watch, isRef } from 'vue';
import { ssrRenderComponent, ssrRenderStyle, ssrRenderAttr } from 'vue/server-renderer';
import { b0 as VProgressCircular, g as VBtn, V as VTextField, c as useRuntimeConfig, b as useNuxtApp, e as useCookie } from './server.mjs';
import { u as useFetch } from './fetch-DOsfzFYE.mjs';
import { V as VDialog } from './VDialog-BVe31KMa.mjs';
import { V as VCard, c as VCardActions } from './VCard-CaQDfbK8.mjs';
import { V as VContainer } from './VContainer-CUysD4sO.mjs';
import { V as VRow } from './VRow-Bqz0CuIN.mjs';
import { V as VCol } from './VCol-BT4RzX0Q.mjs';
import { _ as _imports_2, a as _imports_3 } from './excluido-ceRs5bdR.mjs';
import { f as formatDate } from './formatDate-DflkuJ_V.mjs';
import { V as VDataTable } from './VDataTable-D6BQKL_5.mjs';
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
import './VAvatar-Dy2zMqU_.mjs';
import './VResponsive-BwPb2GHE.mjs';
import './filter-D58pPGs5.mjs';
import './VList-BkmWkhVS.mjs';

const _sfc_main$1 = {
  __name: "ImportaSelos",
  __ssrInlineRender: true,
  props: {
    show: Boolean,
    ato_token: String,
    ato_id: Number,
    representante_nome: String
  },
  emits: ["close", "update-papel"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const isVisible = ref(props.show);
    const config = useRuntimeConfig();
    const { $toast } = useNuxtApp();
    const errorModalVisible = ref(false);
    const errorMessage = ref("");
    const forneceSeloPorLote = `${config.public.ws}/fornecer_selos_por_lote`;
    const forneceSelo = `${config.public.managemant}/fornecer_selos`;
    const isLoading = ref(false);
    const state = reactive({
      nuLote: null
    });
    const emit = __emit;
    watch(
      () => props.show,
      async (newVal) => {
        isVisible.value = newVal;
      }
    );
    const closeModal = () => {
      isVisible.value = false;
      emit("close");
    };
    const importaSelo = async () => {
      isLoading.value = true;
      try {
        const { data, error, status } = await useFetch(forneceSeloPorLote, {
          method: "POST",
          body: {
            user: "56415451472",
            pass: "Ra961206",
            statusSelo: "D",
            nuLote: state.nuLote
          },
          onResponseError({ response }) {
            var _a;
            const mensagemErro = ((_a = response._data) == null ? void 0 : _a.details) || "Erro ao buscar lote de selos.";
            errorMessage.value = mensagemErro;
            errorModalVisible.value = true;
            console.error("Erro forneceSeloPorLote:", mensagemErro);
          }
        }, "$Z1bKGPif1c");
        if (status.value === "success") {
          const selos = data.value.selos;
          const {
            data: seloData,
            error: error2,
            status: sucessoSelo
          } = await useFetch(forneceSelo, {
            method: "POST",
            body: {
              tipo_id: 1,
              cartorio_id: useCookie("user-data").value.cartorio_id,
              selos,
              user_id: useCookie("user-data").value.usuario_id
            }
          }, "$Kr3yBtlYBF");
          if (sucessoSelo.value === "success") {
            $toast.success("Selos importados com sucesso");
            closeModal();
          }
        }
      } catch (err) {
        console.error("Erro ao importar selos:", err);
      } finally {
        isLoading.value = false;
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ErrorModalCard = _sfc_main$2;
      _push(`<!--[-->`);
      _push(ssrRenderComponent(VDialog, {
        persistent: "",
        modelValue: unref(isVisible),
        "onUpdate:modelValue": ($event) => isRef(isVisible) ? isVisible.value = $event : null,
        "max-width": "800"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VCard, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VContainer, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VRow, {
                          class: "mt-1 mb-3",
                          style: { "justify-content": "space-between" }
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VCol, null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`<h1 class="ml-4"${_scopeId5}>Importar selos do lote</h1><p class="ml-4 mt-3"${_scopeId5}> Informe o codigo do lote para realizar a importa\xE7\xE3o </p>`);
                                  } else {
                                    return [
                                      createVNode("h1", { class: "ml-4" }, "Importar selos do lote"),
                                      createVNode("p", { class: "ml-4 mt-3" }, " Informe o codigo do lote para realizar a importa\xE7\xE3o ")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(VCol, null, {
                                  default: withCtx(() => [
                                    createVNode("h1", { class: "ml-4" }, "Importar selos do lote"),
                                    createVNode("p", { class: "ml-4 mt-3" }, " Informe o codigo do lote para realizar a importa\xE7\xE3o ")
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`<hr class="mb-5"${_scopeId3}>`);
                        _push4(ssrRenderComponent(VTextField, {
                          label: "Lote",
                          modelValue: unref(state).nuLote,
                          "onUpdate:modelValue": ($event) => unref(state).nuLote = $event,
                          modelModifiers: { number: true }
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VRow, {
                            class: "mt-1 mb-3",
                            style: { "justify-content": "space-between" }
                          }, {
                            default: withCtx(() => [
                              createVNode(VCol, null, {
                                default: withCtx(() => [
                                  createVNode("h1", { class: "ml-4" }, "Importar selos do lote"),
                                  createVNode("p", { class: "ml-4 mt-3" }, " Informe o codigo do lote para realizar a importa\xE7\xE3o ")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode("hr", { class: "mb-5" }),
                          createVNode(VTextField, {
                            label: "Lote",
                            modelValue: unref(state).nuLote,
                            "onUpdate:modelValue": ($event) => unref(state).nuLote = $event,
                            modelModifiers: { number: true }
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VCardActions, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VBtn, {
                          style: { "background-color": "red", "color": "white" },
                          onClick: closeModal
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(` Voltar `);
                            } else {
                              return [
                                createTextVNode(" Voltar ")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VBtn, {
                          style: { "background-color": "green", "color": "white" },
                          loading: unref(isLoading),
                          disabled: unref(isLoading),
                          onClick: importaSelo
                        }, {
                          loader: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VProgressCircular, {
                                indeterminate: "",
                                color: "white",
                                size: "24"
                              }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(VProgressCircular, {
                                  indeterminate: "",
                                  color: "white",
                                  size: "24"
                                })
                              ];
                            }
                          }),
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(` Importar `);
                            } else {
                              return [
                                createTextVNode(" Importar ")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VBtn, {
                            style: { "background-color": "red", "color": "white" },
                            onClick: closeModal
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Voltar ")
                            ]),
                            _: 1
                          }),
                          createVNode(VBtn, {
                            style: { "background-color": "green", "color": "white" },
                            loading: unref(isLoading),
                            disabled: unref(isLoading),
                            onClick: importaSelo
                          }, {
                            loader: withCtx(() => [
                              createVNode(VProgressCircular, {
                                indeterminate: "",
                                color: "white",
                                size: "24"
                              })
                            ]),
                            default: withCtx(() => [
                              createTextVNode(" Importar ")
                            ]),
                            _: 1
                          }, 8, ["loading", "disabled"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VContainer, null, {
                      default: withCtx(() => [
                        createVNode(VRow, {
                          class: "mt-1 mb-3",
                          style: { "justify-content": "space-between" }
                        }, {
                          default: withCtx(() => [
                            createVNode(VCol, null, {
                              default: withCtx(() => [
                                createVNode("h1", { class: "ml-4" }, "Importar selos do lote"),
                                createVNode("p", { class: "ml-4 mt-3" }, " Informe o codigo do lote para realizar a importa\xE7\xE3o ")
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        createVNode("hr", { class: "mb-5" }),
                        createVNode(VTextField, {
                          label: "Lote",
                          modelValue: unref(state).nuLote,
                          "onUpdate:modelValue": ($event) => unref(state).nuLote = $event,
                          modelModifiers: { number: true }
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(VCardActions, null, {
                      default: withCtx(() => [
                        createVNode(VBtn, {
                          style: { "background-color": "red", "color": "white" },
                          onClick: closeModal
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Voltar ")
                          ]),
                          _: 1
                        }),
                        createVNode(VBtn, {
                          style: { "background-color": "green", "color": "white" },
                          loading: unref(isLoading),
                          disabled: unref(isLoading),
                          onClick: importaSelo
                        }, {
                          loader: withCtx(() => [
                            createVNode(VProgressCircular, {
                              indeterminate: "",
                              color: "white",
                              size: "24"
                            })
                          ]),
                          default: withCtx(() => [
                            createTextVNode(" Importar ")
                          ]),
                          _: 1
                        }, 8, ["loading", "disabled"])
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
                      createVNode(VRow, {
                        class: "mt-1 mb-3",
                        style: { "justify-content": "space-between" }
                      }, {
                        default: withCtx(() => [
                          createVNode(VCol, null, {
                            default: withCtx(() => [
                              createVNode("h1", { class: "ml-4" }, "Importar selos do lote"),
                              createVNode("p", { class: "ml-4 mt-3" }, " Informe o codigo do lote para realizar a importa\xE7\xE3o ")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode("hr", { class: "mb-5" }),
                      createVNode(VTextField, {
                        label: "Lote",
                        modelValue: unref(state).nuLote,
                        "onUpdate:modelValue": ($event) => unref(state).nuLote = $event,
                        modelModifiers: { number: true }
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(VCardActions, null, {
                    default: withCtx(() => [
                      createVNode(VBtn, {
                        style: { "background-color": "red", "color": "white" },
                        onClick: closeModal
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Voltar ")
                        ]),
                        _: 1
                      }),
                      createVNode(VBtn, {
                        style: { "background-color": "green", "color": "white" },
                        loading: unref(isLoading),
                        disabled: unref(isLoading),
                        onClick: importaSelo
                      }, {
                        loader: withCtx(() => [
                          createVNode(VProgressCircular, {
                            indeterminate: "",
                            color: "white",
                            size: "24"
                          })
                        ]),
                        default: withCtx(() => [
                          createTextVNode(" Importar ")
                        ]),
                        _: 1
                      }, 8, ["loading", "disabled"])
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
      _push(ssrRenderComponent(_component_ErrorModalCard, {
        show: unref(errorModalVisible),
        errorMessage: unref(errorMessage),
        onClose: ($event) => errorModalVisible.value = false
      }, null, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Modal/ImportaSelos.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : undefined;
};
const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const config = useRuntimeConfig();
    const selos = ref([]);
    const isModalOpen = ref(false);
    const loading = ref(false);
    const getSelo = `${config.public.managemant}/selos`;
    const filters = reactive({
      dt_compra: "",
      numero: "",
      lote_compra: "",
      sequencia: "",
      sigla: ""
    });
    const headers = [
      { title: "Data de compra", value: "dt_compra" },
      { title: "Selo", value: "numero" },
      { title: "Valor de compra", value: "lote_compra" }
      // { value: "actions" },
    ];
    const fetchSelos = async () => {
      loading.value = true;
      try {
        const { data, error, status } = await useFetch(getSelo, {
          method: "GET"
        }, "$g9WNETx7rH");
        if (status.value === "success") {
          selos.value = Array.isArray(data.value) ? data.value.map((item) => ({
            ...item,
            dt_compra: item.dt_compra ? formatDate(item.dt_compra, "dd/mm/yyyy") : null
            // Aplica a formatação da data
          })) : [];
        } else {
          console.error(error);
        }
      } catch (err) {
        console.error("Erro ao buscar selos:", err);
      } finally {
        loading.value = false;
      }
    };
    const filteredSelos = computed(() => {
      return selos.value.filter((item) => {
        return (!filters.dt_compra || item.dt_compra.toLowerCase().includes(filters.dt_compra.toLowerCase())) && (!filters.numero || item.numero.toLowerCase().includes(filters.numero.toLowerCase())) && (!filters.lote_compra || item.lote_compra.toLowerCase().includes(filters.lote_compra.toLowerCase())) && (!filters.sequencia || item.sequencia.toLowerCase().includes(filters.sequencia.toLowerCase())) && (!filters.sigla || item.sigla.toLowerCase().includes(filters.sigla.toLowerCase()));
      });
    });
    fetchSelos();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ModalImportaSelos = _sfc_main$1;
      if (unref(loading)) {
        _push(ssrRenderComponent(VProgressCircular, mergeProps({
          class: "d-flex justify-center align-center",
          indeterminate: "",
          size: "64",
          style: { "position": "absolute", "top": "40%", "left": "50%" }
        }, _attrs), null, _parent));
      } else {
        _push(ssrRenderComponent(VContainer, mergeProps({ class: "mt-5" }, _attrs), {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="d-flex flex-column"${_scopeId}>`);
              _push2(ssrRenderComponent(VBtn, {
                class: "mb-10 mt-auto align-self-end",
                color: "green",
                size: "large",
                onClick: ($event) => isModalOpen.value = true
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` Importar Selos TJ `);
                  } else {
                    return [
                      createTextVNode(" Importar Selos TJ ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div>`);
              _push2(ssrRenderComponent(VRow, {
                class: "mb-4",
                style: { "gap": "10rem" }
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(VCol, {
                      cols: "12",
                      md: "2"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(VTextField, {
                            modelValue: unref(filters).dt_compra,
                            "onUpdate:modelValue": ($event) => unref(filters).dt_compra = $event,
                            label: "Data de Compra",
                            "prepend-inner-icon": "mdi-magnify",
                            variant: "outlined",
                            "hide-details": ""
                          }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(VTextField, {
                              modelValue: unref(filters).dt_compra,
                              "onUpdate:modelValue": ($event) => unref(filters).dt_compra = $event,
                              label: "Data de Compra",
                              "prepend-inner-icon": "mdi-magnify",
                              variant: "outlined",
                              "hide-details": ""
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(VCol, {
                      cols: "12",
                      md: "2"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(VTextField, {
                            modelValue: unref(filters).numero,
                            "onUpdate:modelValue": ($event) => unref(filters).numero = $event,
                            label: "Selo",
                            "prepend-inner-icon": "mdi-magnify",
                            variant: "outlined",
                            "hide-details": ""
                          }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(VTextField, {
                              modelValue: unref(filters).numero,
                              "onUpdate:modelValue": ($event) => unref(filters).numero = $event,
                              label: "Selo",
                              "prepend-inner-icon": "mdi-magnify",
                              variant: "outlined",
                              "hide-details": ""
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(VCol, {
                      cols: "12",
                      md: "2"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(VTextField, {
                            modelValue: unref(filters).lote_compra,
                            "onUpdate:modelValue": ($event) => unref(filters).lote_compra = $event,
                            label: "Valor de Compra",
                            "prepend-inner-icon": "mdi-magnify",
                            variant: "outlined",
                            "hide-details": ""
                          }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(VTextField, {
                              modelValue: unref(filters).lote_compra,
                              "onUpdate:modelValue": ($event) => unref(filters).lote_compra = $event,
                              label: "Valor de Compra",
                              "prepend-inner-icon": "mdi-magnify",
                              variant: "outlined",
                              "hide-details": ""
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(VCol, {
                        cols: "12",
                        md: "2"
                      }, {
                        default: withCtx(() => [
                          createVNode(VTextField, {
                            modelValue: unref(filters).dt_compra,
                            "onUpdate:modelValue": ($event) => unref(filters).dt_compra = $event,
                            label: "Data de Compra",
                            "prepend-inner-icon": "mdi-magnify",
                            variant: "outlined",
                            "hide-details": ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        _: 1
                      }),
                      createVNode(VCol, {
                        cols: "12",
                        md: "2"
                      }, {
                        default: withCtx(() => [
                          createVNode(VTextField, {
                            modelValue: unref(filters).numero,
                            "onUpdate:modelValue": ($event) => unref(filters).numero = $event,
                            label: "Selo",
                            "prepend-inner-icon": "mdi-magnify",
                            variant: "outlined",
                            "hide-details": ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        _: 1
                      }),
                      createVNode(VCol, {
                        cols: "12",
                        md: "2"
                      }, {
                        default: withCtx(() => [
                          createVNode(VTextField, {
                            modelValue: unref(filters).lote_compra,
                            "onUpdate:modelValue": ($event) => unref(filters).lote_compra = $event,
                            label: "Valor de Compra",
                            "prepend-inner-icon": "mdi-magnify",
                            variant: "outlined",
                            "hide-details": ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        _: 1
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(VDataTable, {
                density: "compact",
                headers,
                items: unref(filteredSelos),
                "item-key": "selo"
              }, {
                "item.actions": withCtx(({ item }, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div style="${ssrRenderStyle({ "display": "flex", "cursor": "pointer", "justify-content": "flex-end" })}" title="Deletar Observa\xE7\xE3o"${_scopeId2}>`);
                    if (item.excluido) {
                      _push3(`<img style="${ssrRenderStyle({ "width": "30px", "height": "30px" })}"${ssrRenderAttr("src", _imports_2)} alt="Visualizar" title="Reativar"${_scopeId2}>`);
                    } else {
                      _push3(`<img${ssrRenderAttr("src", _imports_3)} alt="Excluir" class="trash-icon" style="${ssrRenderStyle({ "width": "30px", "height": "30px" })}" title="Excluir"${_scopeId2}>`);
                    }
                    _push3(`</div>`);
                  } else {
                    return [
                      createVNode("div", {
                        style: { "display": "flex", "cursor": "pointer", "justify-content": "flex-end" },
                        onClick: ($event) => _ctx.deleteObservacao(item),
                        title: "Deletar Observa\xE7\xE3o"
                      }, [
                        item.excluido ? (openBlock(), createBlock("img", {
                          key: 0,
                          style: { "width": "30px", "height": "30px" },
                          src: _imports_2,
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
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_ModalImportaSelos, {
                show: unref(isModalOpen),
                onClose: ($event) => isModalOpen.value = false
              }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode("div", { class: "d-flex flex-column" }, [
                  createVNode(VBtn, {
                    class: "mb-10 mt-auto align-self-end",
                    color: "green",
                    size: "large",
                    onClick: ($event) => isModalOpen.value = true
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Importar Selos TJ ")
                    ]),
                    _: 1
                  }, 8, ["onClick"])
                ]),
                createVNode(VRow, {
                  class: "mb-4",
                  style: { "gap": "10rem" }
                }, {
                  default: withCtx(() => [
                    createVNode(VCol, {
                      cols: "12",
                      md: "2"
                    }, {
                      default: withCtx(() => [
                        createVNode(VTextField, {
                          modelValue: unref(filters).dt_compra,
                          "onUpdate:modelValue": ($event) => unref(filters).dt_compra = $event,
                          label: "Data de Compra",
                          "prepend-inner-icon": "mdi-magnify",
                          variant: "outlined",
                          "hide-details": ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, {
                      cols: "12",
                      md: "2"
                    }, {
                      default: withCtx(() => [
                        createVNode(VTextField, {
                          modelValue: unref(filters).numero,
                          "onUpdate:modelValue": ($event) => unref(filters).numero = $event,
                          label: "Selo",
                          "prepend-inner-icon": "mdi-magnify",
                          variant: "outlined",
                          "hide-details": ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, {
                      cols: "12",
                      md: "2"
                    }, {
                      default: withCtx(() => [
                        createVNode(VTextField, {
                          modelValue: unref(filters).lote_compra,
                          "onUpdate:modelValue": ($event) => unref(filters).lote_compra = $event,
                          label: "Valor de Compra",
                          "prepend-inner-icon": "mdi-magnify",
                          variant: "outlined",
                          "hide-details": ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                createVNode(VDataTable, {
                  density: "compact",
                  headers,
                  items: unref(filteredSelos),
                  "item-key": "selo"
                }, {
                  "item.actions": withCtx(({ item }) => [
                    createVNode("div", {
                      style: { "display": "flex", "cursor": "pointer", "justify-content": "flex-end" },
                      onClick: ($event) => _ctx.deleteObservacao(item),
                      title: "Deletar Observa\xE7\xE3o"
                    }, [
                      item.excluido ? (openBlock(), createBlock("img", {
                        key: 0,
                        style: { "width": "30px", "height": "30px" },
                        src: _imports_2,
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
                  _: 1
                }, 8, ["items"]),
                createVNode(_component_ModalImportaSelos, {
                  show: unref(isModalOpen),
                  onClose: ($event) => isModalOpen.value = false
                }, null, 8, ["show", "onClose"])
              ];
            }
          }),
          _: 1
        }, _parent));
      }
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/selos/importar/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : undefined;
};

export { _sfc_main as default };
//# sourceMappingURL=index-CqwsEGoL.mjs.map
