import { ref, reactive, computed, unref, withCtx, createVNode, createTextVNode, isRef, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderAttr, ssrRenderStyle, ssrInterpolate } from 'vue/server-renderer';
import { b as useNuxtApp, b0 as VProgressCircular, V as VTextField, g as VBtn, c as useRuntimeConfig, e as useCookie } from './server.mjs';
import { u as useFetch } from './fetch-BGOGxZIT.mjs';
import { f as formatDate } from './formatDate-DflkuJ_V.mjs';
import { V as VContainer } from './VContainer-CUysD4sO.mjs';
import { V as VRow } from './VRow-Bqz0CuIN.mjs';
import { V as VCol } from './VCol-BT4RzX0Q.mjs';
import { V as VDataTable } from './VDataTable-BIulIhGO.mjs';
import { d as VChip } from './filter-BT7qJclb.mjs';
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
import './asyncData-Diyd6umk.mjs';
import './VList-D6fdCBQk.mjs';
import './VAvatar-CnoOhuaA.mjs';
import './VResponsive-D5W8jAiq.mjs';

const _imports_0 = "data:image/png;base64,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";
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
        const selosJson = montarSelosJson();
        const dadosSelos = await buscarDadosSelos(selosJson);
        if (!dadosSelos) return;
        const respostaEnvio = await enviarSelosExternos(dadosSelos, (erro) => {
          erroEnvio = erro;
        });
        if (!respostaEnvio) return;
        atualizarResultadoSelos(respostaEnvio);
        selectedSelos.value = [];
        const marcado = await marcarSelosComoEnviados(erroEnvio || respostaEnvio);
        if (marcado) {
          $toast.success("Selos marcados como enviados com sucesso");
        } else {
          $toast.error("Erro ao marcar os selos como enviados");
        }
      } catch (err) {
        console.error("Erro ao enviar selos:", err);
        $toast.error("Erro inesperado ao enviar selos.");
      } finally {
        loadingEnvio.value = false;
      }
    };
    function montarSelosJson() {
      return selectedSelos.value.map((selo) => ({ selo_token: selo }));
    }
    async function buscarDadosSelos(selosJson) {
      const { data, error, status } = await useFetch(integraSelos, {
        method: "POST",
        body: selosJson,
        onResponseError({ response }) {
          var _a;
          const mensagemErro = ((_a = response._data) == null ? undefined : _a.details) || "Erro ao buscar lote de selos.";
          $toast.error(mensagemErro);
        }
      }, "$Bhrd8mFcH5");
      if (status.value !== "success" || !data.value) {
        return null;
      }
      return data.value;
    }
    async function enviarSelosExternos(dadosSelos, setErroEnvio) {
      const { data, error, status } = await useFetch(enviaSelos, {
        method: "POST",
        body: {
          user: "56415451472",
          pass: "Ra961206",
          xmlData: dadosSelos
        },
        onResponseError({ response }) {
          var _a, _b, _c, _d;
          const mensagemErro = ((_a = response._data) == null ? undefined : _a.result) || "Erro ao enviar os selos.";
          const mensagemErroEnvio = ((_d = (_c = (_b = response._data) == null ? undefined : _b.result) == null ? undefined : _c[0]) == null ? undefined : _d.error) || "Erro ao enviar os selos.";
          setErroEnvio(mensagemErro);
          $toast.error(mensagemErroEnvio);
        }
      }, "$QOGY8cy73o");
      if (status.value !== "success" || !data.value) {
        return null;
      }
      return data.value;
    }
    function atualizarResultadoSelos(respostaEnvio) {
      respostaEnvio.forEach((retorno) => {
        const seloEncontrado = selos.value.find(
          (s) => s.token === retorno.selo_token
        );
        if (seloEncontrado) {
          seloEncontrado.resultado = retorno.details || "TRANSMITIDO";
        }
      });
    }
    async function marcarSelosComoEnviados(body) {
      const { status } = await useFetch(marcarSelos, {
        method: "PUT",
        body
      }, "$ZZswjXVZN8");
      return status.value === "success";
    }
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
                  _push3(ssrRenderComponent(VCol, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<img${ssrRenderAttr("src", _imports_0)} style="${ssrRenderStyle({ "width": "40px", "height": "40px", "margin-top": "-10px", "cursor": "pointer" })}"${_scopeId3}>`);
                      } else {
                        return [
                          createVNode("img", {
                            src: _imports_0,
                            style: { "width": "40px", "height": "40px", "margin-top": "-10px", "cursor": "pointer" },
                            onClick: ($event) => fetchSelos()
                          }, null, 8, ["onClick"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VCol, {
                    cols: "12",
                    md: "3",
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
                    createVNode(VCol, null, {
                      default: withCtx(() => [
                        createVNode("img", {
                          src: _imports_0,
                          style: { "width": "40px", "height": "40px", "margin-top": "-10px", "cursor": "pointer" },
                          onClick: ($event) => fetchSelos()
                        }, null, 8, ["onClick"])
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, {
                      cols: "12",
                      md: "3",
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
              "onUpdate:modelValue": ($event) => isRef(selectedSelos) ? selectedSelos.value = $event : null,
              "items-per-page": 50,
              "items-per-page-options": [50]
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
                  createVNode(VCol, null, {
                    default: withCtx(() => [
                      createVNode("img", {
                        src: _imports_0,
                        style: { "width": "40px", "height": "40px", "margin-top": "-10px", "cursor": "pointer" },
                        onClick: ($event) => fetchSelos()
                      }, null, 8, ["onClick"])
                    ]),
                    _: 1
                  }),
                  createVNode(VCol, {
                    cols: "12",
                    md: "3",
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
                "onUpdate:modelValue": ($event) => isRef(selectedSelos) ? selectedSelos.value = $event : null,
                "items-per-page": 50,
                "items-per-page-options": [50]
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
//# sourceMappingURL=index-CzBbuwHc.mjs.map
