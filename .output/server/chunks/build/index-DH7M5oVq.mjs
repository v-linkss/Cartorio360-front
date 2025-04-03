import { ref, computed, mergeProps, withCtx, createTextVNode, unref, isRef, createVNode, toDisplayString, useSSRContext, reactive, watch } from 'vue';
import { ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import { f as VBtn, V as VTextField, aS as useRoute$1, b as useNuxtApp, c as useRuntimeConfig } from './server.mjs';
import { u as useFetch } from './fetch-Q70wXbL3.mjs';
import { V as VDialog } from './VDialog-CGFJar9P.mjs';
import { V as VCard, c as VCardActions } from './VCard-B1PhK9Ih.mjs';
import { V as VContainer } from './VContainer-CTpFP9Uv.mjs';
import { V as VRow } from './VRow-BVT9G9vF.mjs';
import { V as VCol } from './VCol-BfQDPyTL.mjs';
import { V as VDataTable } from './VDataTable-DomJgUVT.mjs';
import '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:fs';
import 'node:url';
import 'node:path';
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
import './VAvatar-C1Wv3qCt.mjs';
import './VResponsive-BFQ60k4B.mjs';
import './filter-1TH8I8rV.mjs';
import './VList-DgVXz_Z-.mjs';

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
    const route = useRoute$1();
    const config = useRuntimeConfig();
    const { $toast } = useNuxtApp();
    const pessoasUpdate = `${config.public.managemant}/updateAtosPessoa`;
    const papeisApresentante = `${config.public.managemant}/listarPapeis`;
    const papeisItems = ref([]);
    const state = reactive({
      tipo_parte_id: null
    });
    const emit = __emit;
    watch(
      () => props.show,
      async (newVal) => {
        isVisible.value = newVal;
        if (newVal) {
          await getPapeis();
        }
      }
    );
    const closeModal = () => {
      isVisible.value = false;
      emit("close");
    };
    const getPapeis = async () => {
      const { data } = await useFetch(papeisApresentante, {
        method: "POST",
        body: { tipo_ato_token: route.query.tipo_ato_token || props.ato_token }
      }, "$Z1bKGPif1c");
      papeisItems.value = data.value;
    };
    const updateAtoPessoa = async () => {
      const { data, error, status } = await useFetch(`${pessoasUpdate}/${props.ato_id}`, {
        method: "PUT",
        body: {
          tipo_parte_id: state.tipo_parte_id.id
        }
      }, "$Kr3yBtlYBF");
      if (status.value === "success") {
        $toast.success("Papel Atualizado com Sucesso!");
        emit("update-papel", state.tipo_parte_id.descricao);
        closeModal();
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(VDialog, mergeProps({
        persistent: "",
        modelValue: unref(isVisible),
        "onUpdate:modelValue": ($event) => isRef(isVisible) ? isVisible.value = $event : null,
        "max-width": "800"
      }, _attrs), {
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
                                    _push6(`<h1 class="ml-4"${_scopeId5}> Importar selos do lote </h1><p class="ml-4 mt-3"${_scopeId5}> Informe o codigo do lote para realizar a importa\xE7\xE3o </p>`);
                                  } else {
                                    return [
                                      createVNode("h1", { class: "ml-4" }, " Importar selos do lote "),
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
                                    createVNode("h1", { class: "ml-4" }, " Importar selos do lote "),
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
                        _push4(ssrRenderComponent(VTextField, { label: "Lote" }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VRow, {
                            class: "mt-1 mb-3",
                            style: { "justify-content": "space-between" }
                          }, {
                            default: withCtx(() => [
                              createVNode(VCol, null, {
                                default: withCtx(() => [
                                  createVNode("h1", { class: "ml-4" }, " Importar selos do lote "),
                                  createVNode("p", { class: "ml-4 mt-3" }, " Informe o codigo do lote para realizar a importa\xE7\xE3o ")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode("hr", { class: "mb-5" }),
                          createVNode(VTextField, { label: "Lote" })
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
                              _push5(`Voltar`);
                            } else {
                              return [
                                createTextVNode("Voltar")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VBtn, {
                          style: { "background-color": "green", "color": "white" },
                          onClick: updateAtoPessoa
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Importar`);
                            } else {
                              return [
                                createTextVNode("Importar")
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
                              createTextVNode("Voltar")
                            ]),
                            _: 1
                          }),
                          createVNode(VBtn, {
                            style: { "background-color": "green", "color": "white" },
                            onClick: updateAtoPessoa
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Importar")
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
                        createVNode(VRow, {
                          class: "mt-1 mb-3",
                          style: { "justify-content": "space-between" }
                        }, {
                          default: withCtx(() => [
                            createVNode(VCol, null, {
                              default: withCtx(() => [
                                createVNode("h1", { class: "ml-4" }, " Importar selos do lote "),
                                createVNode("p", { class: "ml-4 mt-3" }, " Informe o codigo do lote para realizar a importa\xE7\xE3o ")
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        createVNode("hr", { class: "mb-5" }),
                        createVNode(VTextField, { label: "Lote" })
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
                            createTextVNode("Voltar")
                          ]),
                          _: 1
                        }),
                        createVNode(VBtn, {
                          style: { "background-color": "green", "color": "white" },
                          onClick: updateAtoPessoa
                        }, {
                          default: withCtx(() => [
                            createTextVNode("Importar")
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
                      createVNode(VRow, {
                        class: "mt-1 mb-3",
                        style: { "justify-content": "space-between" }
                      }, {
                        default: withCtx(() => [
                          createVNode(VCol, null, {
                            default: withCtx(() => [
                              createVNode("h1", { class: "ml-4" }, " Importar selos do lote "),
                              createVNode("p", { class: "ml-4 mt-3" }, " Informe o codigo do lote para realizar a importa\xE7\xE3o ")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode("hr", { class: "mb-5" }),
                      createVNode(VTextField, { label: "Lote" })
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
                          createTextVNode("Voltar")
                        ]),
                        _: 1
                      }),
                      createVNode(VBtn, {
                        style: { "background-color": "green", "color": "white" },
                        onClick: updateAtoPessoa
                      }, {
                        default: withCtx(() => [
                          createTextVNode("Importar")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Modal/ImportaSelos.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : undefined;
};
const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const search = ref("");
    const isModalOpen = ref(false);
    const headers = [
      { title: "Selo", value: "selo" },
      { title: "Cor", value: "cor" },
      { title: "Situa\xE7\xE3o", value: "situacao" },
      { title: "Protocolo", value: "protocolo" },
      { title: "Certificado NT", value: "certificado_nt" },
      { title: "Data cadastro", value: "data_cadastro" }
    ];
    const selos = ref([
      {
        selo: "AFR39581-762Q",
        cor: "VERMELHO",
        situacao: "Dispon\xEDvel",
        protocolo: "",
        certificado_nt: false,
        data_cadastro: "17/03/2025 16:54"
      },
      {
        selo: "BFR12345-678X",
        cor: "AZUL",
        situacao: "Utilizado",
        protocolo: "123456",
        certificado_nt: true,
        data_cadastro: "15/02/2025 10:30"
      },
      {
        selo: "CFR98765-432Y",
        cor: "VERDE",
        situacao: "Cancelado",
        protocolo: "789012",
        certificado_nt: false,
        data_cadastro: "20/01/2025 14:20"
      },
      {
        selo: "DFR54321-098Z",
        cor: "AMARELO",
        situacao: "Dispon\xEDvel",
        protocolo: "",
        certificado_nt: true,
        data_cadastro: "10/03/2025 09:15"
      },
      {
        selo: "EFR11223-445W",
        cor: "ROXO",
        situacao: "Utilizado",
        protocolo: "456789",
        certificado_nt: false,
        data_cadastro: "05/04/2025 11:45"
      }
    ]);
    const filteredSelos = computed(() => {
      return selos.value.filter((item) => {
        const searchTerm = search.value.toLowerCase();
        return item.selo.toLowerCase().includes(searchTerm) || item.cor.toLowerCase().includes(searchTerm) || item.situacao.toLowerCase().includes(searchTerm) || item.protocolo.toLowerCase().includes(searchTerm);
      });
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ModalImportaSelos = _sfc_main$1;
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
            _push2(ssrRenderComponent(VTextField, {
              modelValue: unref(search),
              "onUpdate:modelValue": ($event) => isRef(search) ? search.value = $event : null,
              label: "Buscar selo, cor, situa\xE7\xE3o ou protocolo",
              "prepend-inner-icon": "mdi-magnify",
              variant: "outlined",
              "hide-details": "",
              class: "mb-4"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(VDataTable, {
              density: "compact",
              headers,
              items: unref(filteredSelos),
              "item-key": "selo"
            }, {
              "item.certificado_nt": withCtx(({ item }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span${_scopeId2}>${ssrInterpolate(item.certificado_nt ? "Sim" : "N\xE3o")}</span>`);
                } else {
                  return [
                    createVNode("span", null, toDisplayString(item.certificado_nt ? "Sim" : "N\xE3o"), 1)
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
              createVNode(VTextField, {
                modelValue: unref(search),
                "onUpdate:modelValue": ($event) => isRef(search) ? search.value = $event : null,
                label: "Buscar selo, cor, situa\xE7\xE3o ou protocolo",
                "prepend-inner-icon": "mdi-magnify",
                variant: "outlined",
                "hide-details": "",
                class: "mb-4"
              }, null, 8, ["modelValue", "onUpdate:modelValue"]),
              createVNode(VDataTable, {
                density: "compact",
                headers,
                items: unref(filteredSelos),
                "item-key": "selo"
              }, {
                "item.certificado_nt": withCtx(({ item }) => [
                  createVNode("span", null, toDisplayString(item.certificado_nt ? "Sim" : "N\xE3o"), 1)
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
//# sourceMappingURL=index-DH7M5oVq.mjs.map
