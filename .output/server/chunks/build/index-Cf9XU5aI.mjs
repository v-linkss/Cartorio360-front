import { ref, reactive, computed, unref, withCtx, createVNode, createTextVNode, isRef, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import { b as useNuxtApp, b1 as VProgressCircular, V as VTextField, f as VBtn, c as useRuntimeConfig, e as useCookie } from './server.mjs';
import { u as useFetch } from './fetch-pt4nsUe7.mjs';
import { f as formatDate } from './formatDate-DflkuJ_V.mjs';
import { V as VContainer } from './VContainer-DT30lSDe.mjs';
import { V as VRow } from './VRow-DlYJpeem.mjs';
import { V as VCol } from './VCol-HDwo5SVF.mjs';
import { V as VDataTable } from './VDataTable-C86S73KO.mjs';
import { g as VChip } from './filter-cWQ1Yonf.mjs';
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
import './VList-D7gG12Ur.mjs';
import './VAvatar-BqhB4Z7D.mjs';
import './VResponsive-BWsCuDwY.mjs';

const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const config = useRuntimeConfig();
    const { $toast } = useNuxtApp();
    const getSelo = `${config.public.managemant}/lista_selos_transmitir`;
    const integraSelos = `${config.public.managemant}/integra_selos`;
    const enviaSelos = `${config.public.ws}/enviar_ato`;
    const marcarSelos = `${config.public.managemant}/marcar_selos_enviado`;
    const selectedSelos = ref([]);
    const loadingEnvio = ref(false);
    const selos = ref([]);
    const loading = ref(false);
    const filters = reactive({
      data_utilizacao: "",
      descricao: "",
      numero: ""
    });
    const headers = [
      { title: "Data", value: "data_utilizacao" },
      { title: "Descri\xE7\xE3o", value: "descricao" },
      { title: "N\xFAmero", value: "numero" },
      { title: "Resultado", value: "resultado" }
    ];
    const fetchSelos = async () => {
      loading.value = true;
      try {
        const { data, error, status } = await useFetch(getSelo, {
          method: "POST",
          body: { cartorio_token: useCookie("user-data").value.cartorio_token }
        }, "$Xe0bfknJZY");
        if (status.value === "success") {
          selos.value = Array.isArray(data.value) ? data.value.map((item) => ({
            ...item,
            data_utilizacao: item.data_utilizacao ? formatDate(item.data_utilizacao, "dd/mm/yyyy hh:mm") : null,
            resultado: null
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
    const enviaSelo = async () => {
      loadingEnvio.value = true;
      let erroEnvio = null;
      try {
        const selosJson = selectedSelos.value.map((selo) => ({ selo_token: selo }));
        const { data, error, status } = await useFetch(integraSelos, {
          method: "POST",
          body: selosJson,
          onResponseError({ response }) {
            var _a;
            const mensagemErro = ((_a = response._data) == null ? void 0 : _a.details) || "Erro ao buscar lote de selos.";
            $toast.error(mensagemErro);
          }
        }, "$Bhrd8mFcH5");
        if (status.value === "success") {
          const selosData = data.value;
          const { data: seloData, error: error2, status: sucessoSelo } = await useFetch(enviaSelos, {
            method: "POST",
            body: {
              user: "56415451472",
              pass: "Ra961206",
              xmlData: selosData
            },
            onResponseError({ response }) {
              var _a, _b;
              const mensagemErro = ((_a = response._data) == null ? void 0 : _a.result) || "Erro ao enviar os selos.";
              const mensagemErroEnvio = ((_b = response._data) == null ? void 0 : _b.result[0].error) || "Erro ao enviar os selos.";
              erroEnvio = mensagemErro;
              $toast.error(mensagemErroEnvio);
            }
          }, "$QOGY8cy73o");
          if (sucessoSelo.value === "success" && seloData.value) {
            seloData.value.forEach((retorno) => {
              const seloEncontrado = selos.value.find((s) => s.token === retorno.selo_token);
              if (seloEncontrado) {
                seloEncontrado.resultado = retorno.details || "TRANSMITIDO";
              }
            });
          }
          const { status: sucessoMarcar } = await useFetch(marcarSelos, {
            method: "PUT",
            body: erroEnvio || seloData.value
          }, "$ZZswjXVZN8");
          if (sucessoMarcar.value === "success") {
            $toast.success("Selos marcados como enviados com sucesso");
          } else {
            $toast.error("Erro ao marcar os selos como enviados");
          }
        }
      } catch (err) {
        console.error("Erro ao enviar selos:", err);
        $toast.error("Erro inesperado ao enviar selos.");
      } finally {
        loadingEnvio.value = false;
      }
    };
    const filteredSelos = computed(() => {
      return selos.value.filter((item) => {
        return (!filters.data_utilizacao || item.data_utilizacao.toLowerCase().includes(filters.data_utilizacao.toLowerCase())) && (!filters.numero || item.numero.toLowerCase().includes(filters.numero.toLowerCase())) && (!filters.descricao || item.descricao.toLowerCase().includes(filters.descricao.toLowerCase()));
      });
    });
    fetchSelos();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      if (unref(loading)) {
        _push(ssrRenderComponent(VProgressCircular, {
          class: "d-flex justify-center align-center",
          indeterminate: "",
          size: "64",
          style: { "position": "absolute", "top": "40%", "left": "50%" }
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(VContainer, { class: "mt-5" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VRow, { class: "d-flex align-center" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VCol, {
                    cols: "12",
                    md: "2"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VTextField, {
                          modelValue: unref(filters).data_utilizacao,
                          "onUpdate:modelValue": ($event) => unref(filters).data_utilizacao = $event,
                          label: "Data",
                          variant: "outlined",
                          "hide-details": "",
                          class: "mb-4"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VTextField, {
                            modelValue: unref(filters).data_utilizacao,
                            "onUpdate:modelValue": ($event) => unref(filters).data_utilizacao = $event,
                            label: "Data",
                            variant: "outlined",
                            "hide-details": "",
                            class: "mb-4"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VCol, {
                    cols: "12",
                    md: "3"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VTextField, {
                          modelValue: unref(filters).descricao,
                          "onUpdate:modelValue": ($event) => unref(filters).descricao = $event,
                          label: "Descri\xE7\xE3o",
                          variant: "outlined",
                          "hide-details": "",
                          class: "mb-4"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VTextField, {
                            modelValue: unref(filters).descricao,
                            "onUpdate:modelValue": ($event) => unref(filters).descricao = $event,
                            label: "Descri\xE7\xE3o",
                            variant: "outlined",
                            "hide-details": "",
                            class: "mb-4"
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
                          label: "N\xFAmero",
                          variant: "outlined",
                          "hide-details": "",
                          class: "mb-4"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VTextField, {
                            modelValue: unref(filters).numero,
                            "onUpdate:modelValue": ($event) => unref(filters).numero = $event,
                            label: "N\xFAmero",
                            variant: "outlined",
                            "hide-details": "",
                            class: "mb-4"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VCol, {
                    cols: "12",
                    md: "5",
                    class: "d-flex justify-end mb-2"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VBtn, {
                          color: "green",
                          size: "large",
                          onClick: enviaSelo,
                          loading: unref(loadingEnvio),
                          disabled: unref(loadingEnvio)
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
                              _push5(` Enviar Selos `);
                            } else {
                              return [
                                createTextVNode(" Enviar Selos ")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VBtn, {
                            color: "green",
                            size: "large",
                            onClick: enviaSelo,
                            loading: unref(loadingEnvio),
                            disabled: unref(loadingEnvio)
                          }, {
                            loader: withCtx(() => [
                              createVNode(VProgressCircular, {
                                indeterminate: "",
                                color: "white",
                                size: "24"
                              })
                            ]),
                            default: withCtx(() => [
                              createTextVNode(" Enviar Selos ")
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
                    createVNode(VCol, {
                      cols: "12",
                      md: "2"
                    }, {
                      default: withCtx(() => [
                        createVNode(VTextField, {
                          modelValue: unref(filters).data_utilizacao,
                          "onUpdate:modelValue": ($event) => unref(filters).data_utilizacao = $event,
                          label: "Data",
                          variant: "outlined",
                          "hide-details": "",
                          class: "mb-4"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, {
                      cols: "12",
                      md: "3"
                    }, {
                      default: withCtx(() => [
                        createVNode(VTextField, {
                          modelValue: unref(filters).descricao,
                          "onUpdate:modelValue": ($event) => unref(filters).descricao = $event,
                          label: "Descri\xE7\xE3o",
                          variant: "outlined",
                          "hide-details": "",
                          class: "mb-4"
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
                          label: "N\xFAmero",
                          variant: "outlined",
                          "hide-details": "",
                          class: "mb-4"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, {
                      cols: "12",
                      md: "5",
                      class: "d-flex justify-end mb-2"
                    }, {
                      default: withCtx(() => [
                        createVNode(VBtn, {
                          color: "green",
                          size: "large",
                          onClick: enviaSelo,
                          loading: unref(loadingEnvio),
                          disabled: unref(loadingEnvio)
                        }, {
                          loader: withCtx(() => [
                            createVNode(VProgressCircular, {
                              indeterminate: "",
                              color: "white",
                              size: "24"
                            })
                          ]),
                          default: withCtx(() => [
                            createTextVNode(" Enviar Selos ")
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
            _push2(ssrRenderComponent(VDataTable, {
              "show-select": "",
              density: "compact",
              headers,
              items: unref(filteredSelos),
              "item-key": "token",
              "item-value": "token",
              modelValue: unref(selectedSelos),
              "onUpdate:modelValue": ($event) => isRef(selectedSelos) ? selectedSelos.value = $event : null
            }, {
              "item.situacao": withCtx(({ item }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VChip, {
                    color: "green",
                    "text-color": "white",
                    outlined: ""
                  }, {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`${ssrInterpolate(item.situacao)}`);
                      } else {
                        return [
                          createTextVNode(toDisplayString(item.situacao), 1)
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VChip, {
                      color: "green",
                      "text-color": "white",
                      outlined: ""
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(item.situacao), 1)
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
              createVNode(VRow, { class: "d-flex align-center" }, {
                default: withCtx(() => [
                  createVNode(VCol, {
                    cols: "12",
                    md: "2"
                  }, {
                    default: withCtx(() => [
                      createVNode(VTextField, {
                        modelValue: unref(filters).data_utilizacao,
                        "onUpdate:modelValue": ($event) => unref(filters).data_utilizacao = $event,
                        label: "Data",
                        variant: "outlined",
                        "hide-details": "",
                        class: "mb-4"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(VCol, {
                    cols: "12",
                    md: "3"
                  }, {
                    default: withCtx(() => [
                      createVNode(VTextField, {
                        modelValue: unref(filters).descricao,
                        "onUpdate:modelValue": ($event) => unref(filters).descricao = $event,
                        label: "Descri\xE7\xE3o",
                        variant: "outlined",
                        "hide-details": "",
                        class: "mb-4"
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
                        label: "N\xFAmero",
                        variant: "outlined",
                        "hide-details": "",
                        class: "mb-4"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(VCol, {
                    cols: "12",
                    md: "5",
                    class: "d-flex justify-end mb-2"
                  }, {
                    default: withCtx(() => [
                      createVNode(VBtn, {
                        color: "green",
                        size: "large",
                        onClick: enviaSelo,
                        loading: unref(loadingEnvio),
                        disabled: unref(loadingEnvio)
                      }, {
                        loader: withCtx(() => [
                          createVNode(VProgressCircular, {
                            indeterminate: "",
                            color: "white",
                            size: "24"
                          })
                        ]),
                        default: withCtx(() => [
                          createTextVNode(" Enviar Selos ")
                        ]),
                        _: 1
                      }, 8, ["loading", "disabled"])
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(VDataTable, {
                "show-select": "",
                density: "compact",
                headers,
                items: unref(filteredSelos),
                "item-key": "token",
                "item-value": "token",
                modelValue: unref(selectedSelos),
                "onUpdate:modelValue": ($event) => isRef(selectedSelos) ? selectedSelos.value = $event : null
              }, {
                "item.situacao": withCtx(({ item }) => [
                  createVNode(VChip, {
                    color: "green",
                    "text-color": "white",
                    outlined: ""
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(item.situacao), 1)
                    ]),
                    _: 2
                  }, 1024)
                ]),
                _: 1
              }, 8, ["items", "modelValue", "onUpdate:modelValue"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/selos/enviar/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : undefined;
};

export { _sfc_main as default };
//# sourceMappingURL=index-Cf9XU5aI.mjs.map
