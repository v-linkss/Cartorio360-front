import { _ as __nuxt_component_0 } from './nuxt-link-TpvcaGEw.mjs';
import { useSSRContext, reactive, ref, withAsyncContext, computed, unref, mergeProps, withCtx, createVNode, createTextVNode } from 'vue';
import { ssrRenderComponent } from 'vue/server-renderer';
import { u as useRouter$1, f as useRoute$1, b as useNuxtApp, V as VTextField, g as VBtn, c as useRuntimeConfig } from './server.mjs';
import { f as fetchWithToken } from './fetchWithToken-Cjtduyn0.mjs';
import { u as useFetch } from './fetch-DOsfzFYE.mjs';
import { V as VContainer } from './VContainer-CUysD4sO.mjs';
import { V as VRow } from './VRow-Bqz0CuIN.mjs';
import { V as VCol } from './VCol-BT4RzX0Q.mjs';
import { V as VAutocomplete } from './VAutocomplete-DxrmY4dO.mjs';

const _sfc_main = {
  __name: "SeparacaoDivorcio",
  __ssrInlineRender: true,
  props: {
    ato_token: {
      type: String,
      required: true
    },
    ato_id: {
      type: Number,
      required: true
    }
  },
  async setup(__props) {
    let __temp, __restore;
    const props = __props;
    const config = useRuntimeConfig();
    const atos = reactive({
      dt_casamento: null,
      tabvalores_regimecasamento_id: null,
      qtd_filhos_maiores: null,
      qtd_filhos_menores: null,
      responsavel_menores_id: null
    });
    const combolistRegimeBens = ref([]);
    const router = useRouter$1();
    const route = useRoute$1();
    const { $toast } = useNuxtApp();
    const getAtos = `${config.public.auth}/service/gerencia/getAtos/${props.ato_id}`;
    const regimeBens = `${config.public.auth}/service/gerencia/regime_casamento`;
    const getAtosPessoa = `${config.public.auth}/service/gerencia/getAtosPessoaById/${props.ato_id}`;
    const updateAtos = `${config.public.managemant}/updateAtos`;
    ref("");
    ref("");
    ref(false);
    ref(false);
    ref(null);
    const { data: atosData, status } = ([__temp, __restore] = withAsyncContext(() => fetchWithToken(getAtos, {
      method: "GET"
    })), __temp = await __temp, __restore(), __temp);
    const { data: regimeBensData } = ([__temp, __restore] = withAsyncContext(() => fetchWithToken(
      regimeBens,
      {
        method: "GET"
      }
    )), __temp = await __temp, __restore(), __temp);
    const { data: responsavelFilhos } = ([__temp, __restore] = withAsyncContext(() => fetchWithToken(
      getAtosPessoa,
      {
        method: "GET"
      }
    )), __temp = await __temp, __restore(), __temp);
    const rawResponsavelFilhos = ref([]);
    const combolistResponsavel = computed(
      () => {
        var _a;
        return ((_a = rawResponsavelFilhos.value) == null ? undefined : _a.map((parte) => {
          var _a2;
          return {
            id: parte.id,
            nome: ((_a2 = parte.pessoa) == null ? undefined : _a2.nome) || "Sem nome"
          };
        })) || [];
      }
    );
    if (atosData.value) {
      atos.dt_casamento = atosData.value.dt_casamento;
      atos.tabvalores_regimecasamento_id = atosData.value.tabvalores_regimecasamento_id;
      atos.qtd_filhos_maiores = atosData.value.qtd_filhos_maiores;
      atos.qtd_filhos_menores = atosData.value.qtd_filhos_menores;
      atos.responsavel_menores_id = atosData.value.responsavel_menores_id;
    }
    if (regimeBensData.value) {
      combolistRegimeBens.value = regimeBensData.value;
    }
    if (responsavelFilhos.value) {
      rawResponsavelFilhos.value = responsavelFilhos.value;
    }
    const goBack = () => {
      const origem = route.query.origem || "criar";
      const id = route.query.id;
      switch (origem) {
        case "atualizar":
        case "vizualizar":
          router.push(`/os/atualizar/${id}`);
          break;
        case "atualizar-lista":
        case "vizualizar-lista":
          router.push("/atos/lista");
          break;
        default:
          router.push("/os/criar-registro");
          break;
      }
    };
    async function onUpdate() {
      const { data, error, status: status2 } = await useFetch(
        `${updateAtos}/${Number.parseInt(props.ato_id)}`,
        {
          method: "PUT",
          body: {
            dt_casamento: atos.dt_casamento,
            tabvalores_regimecasamento_id: atos.tabvalores_regimecasamento_id,
            qtd_filhos_maiores: atos.qtd_filhos_maiores,
            qtd_filhos_menores: atos.qtd_filhos_menores,
            responsavel_menores_id: atos.responsavel_menores_id
          }
        },
        "$2MFTkguIXN"
      );
      if (status2.value === "success") {
        $toast.success("Div\xF3rcio salvo com sucesso");
      }
    }
    const blockNonNumeric = (e) => {
      const allowedKeys = [
        "Backspace",
        "Tab",
        "ArrowLeft",
        "ArrowRight",
        "Delete"
      ];
      if (!/[0-9]/.test(e.key) && !allowedKeys.includes(e.key)) {
        e.preventDefault();
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      if (unref(status) === "success") {
        _push(ssrRenderComponent(VContainer, mergeProps({ class: "mt-5" }, _attrs), {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(VRow, { dense: "" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(VCol, {
                      cols: "12",
                      sm: "4",
                      md: "3"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(VTextField, {
                            modelValue: unref(atos).dt_casamento,
                            "onUpdate:modelValue": ($event) => unref(atos).dt_casamento = $event,
                            type: "date",
                            label: "Data Casamento"
                          }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(VTextField, {
                              modelValue: unref(atos).dt_casamento,
                              "onUpdate:modelValue": ($event) => unref(atos).dt_casamento = $event,
                              type: "date",
                              label: "Data Casamento"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(VCol, {
                      cols: "12",
                      sm: "6",
                      md: "4"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(VAutocomplete, {
                            label: "Regime Bens",
                            modelValue: unref(atos).tabvalores_regimecasamento_id,
                            "onUpdate:modelValue": ($event) => unref(atos).tabvalores_regimecasamento_id = $event,
                            items: unref(combolistRegimeBens),
                            "item-title": "descricao",
                            "item-value": "id",
                            required: ""
                          }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(VAutocomplete, {
                              label: "Regime Bens",
                              modelValue: unref(atos).tabvalores_regimecasamento_id,
                              "onUpdate:modelValue": ($event) => unref(atos).tabvalores_regimecasamento_id = $event,
                              items: unref(combolistRegimeBens),
                              "item-title": "descricao",
                              "item-value": "id",
                              required: ""
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(VCol, {
                      cols: "12",
                      sm: "6",
                      md: "3"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(VTextField, {
                            label: "Filhos Maiores",
                            modelValue: unref(atos).qtd_filhos_maiores,
                            "onUpdate:modelValue": ($event) => unref(atos).qtd_filhos_maiores = $event,
                            modelModifiers: { number: true },
                            type: "number",
                            min: "0",
                            onKeydown: blockNonNumeric
                          }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(VTextField, {
                              label: "Filhos Maiores",
                              modelValue: unref(atos).qtd_filhos_maiores,
                              "onUpdate:modelValue": ($event) => unref(atos).qtd_filhos_maiores = $event,
                              modelModifiers: { number: true },
                              type: "number",
                              min: "0",
                              onKeydown: blockNonNumeric
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(VCol, {
                      cols: "12",
                      sm: "6",
                      md: "3"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(VTextField, {
                            label: "Filhos Menores",
                            modelValue: unref(atos).qtd_filhos_menores,
                            "onUpdate:modelValue": ($event) => unref(atos).qtd_filhos_menores = $event,
                            type: "number",
                            min: "0",
                            onKeydown: blockNonNumeric
                          }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(VTextField, {
                              label: "Filhos Menores",
                              modelValue: unref(atos).qtd_filhos_menores,
                              "onUpdate:modelValue": ($event) => unref(atos).qtd_filhos_menores = $event,
                              type: "number",
                              min: "0",
                              onKeydown: blockNonNumeric
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(VCol, {
                      cols: "12",
                      sm: "6",
                      md: "4"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(VAutocomplete, {
                            label: "Respons\xE1vel",
                            modelValue: unref(atos).responsavel_menores_id,
                            "onUpdate:modelValue": ($event) => unref(atos).responsavel_menores_id = $event,
                            items: unref(combolistResponsavel),
                            "item-title": "nome",
                            "item-value": "id",
                            required: ""
                          }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(VAutocomplete, {
                              label: "Respons\xE1vel",
                              modelValue: unref(atos).responsavel_menores_id,
                              "onUpdate:modelValue": ($event) => unref(atos).responsavel_menores_id = $event,
                              items: unref(combolistResponsavel),
                              "item-title": "nome",
                              "item-value": "id",
                              required: ""
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(VCol, {
                        cols: "12",
                        sm: "4",
                        md: "3"
                      }, {
                        default: withCtx(() => [
                          createVNode(VTextField, {
                            modelValue: unref(atos).dt_casamento,
                            "onUpdate:modelValue": ($event) => unref(atos).dt_casamento = $event,
                            type: "date",
                            label: "Data Casamento"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        _: 1
                      }),
                      createVNode(VCol, {
                        cols: "12",
                        sm: "6",
                        md: "4"
                      }, {
                        default: withCtx(() => [
                          createVNode(VAutocomplete, {
                            label: "Regime Bens",
                            modelValue: unref(atos).tabvalores_regimecasamento_id,
                            "onUpdate:modelValue": ($event) => unref(atos).tabvalores_regimecasamento_id = $event,
                            items: unref(combolistRegimeBens),
                            "item-title": "descricao",
                            "item-value": "id",
                            required: ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                        ]),
                        _: 1
                      }),
                      createVNode(VCol, {
                        cols: "12",
                        sm: "6",
                        md: "3"
                      }, {
                        default: withCtx(() => [
                          createVNode(VTextField, {
                            label: "Filhos Maiores",
                            modelValue: unref(atos).qtd_filhos_maiores,
                            "onUpdate:modelValue": ($event) => unref(atos).qtd_filhos_maiores = $event,
                            modelModifiers: { number: true },
                            type: "number",
                            min: "0",
                            onKeydown: blockNonNumeric
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        _: 1
                      }),
                      createVNode(VCol, {
                        cols: "12",
                        sm: "6",
                        md: "3"
                      }, {
                        default: withCtx(() => [
                          createVNode(VTextField, {
                            label: "Filhos Menores",
                            modelValue: unref(atos).qtd_filhos_menores,
                            "onUpdate:modelValue": ($event) => unref(atos).qtd_filhos_menores = $event,
                            type: "number",
                            min: "0",
                            onKeydown: blockNonNumeric
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        _: 1
                      }),
                      createVNode(VCol, {
                        cols: "12",
                        sm: "6",
                        md: "4"
                      }, {
                        default: withCtx(() => [
                          createVNode(VAutocomplete, {
                            label: "Respons\xE1vel",
                            modelValue: unref(atos).responsavel_menores_id,
                            "onUpdate:modelValue": ($event) => unref(atos).responsavel_menores_id = $event,
                            items: unref(combolistResponsavel),
                            "item-title": "nome",
                            "item-value": "id",
                            required: ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                        ]),
                        _: 1
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(VRow, {
                class: "mt-5",
                justify: "start",
                align: "center"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(VCol, { cols: "auto" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_component_NuxtLink, { onClick: goBack }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(VBtn, {
                                  size: "large",
                                  color: "red"
                                }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(`Voltar`);
                                    } else {
                                      return [
                                        createTextVNode("Voltar")
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(VBtn, {
                                    size: "large",
                                    color: "red"
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode("Voltar")
                                    ]),
                                    _: 1
                                  })
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_component_NuxtLink, { onClick: goBack }, {
                              default: withCtx(() => [
                                createVNode(VBtn, {
                                  size: "large",
                                  color: "red"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode("Voltar")
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
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(VCol, { cols: "auto" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(VBtn, {
                            class: "ml-2",
                            onClick: onUpdate,
                            size: "large",
                            color: "green"
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`Salvar`);
                              } else {
                                return [
                                  createTextVNode("Salvar")
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(VBtn, {
                              class: "ml-2",
                              onClick: onUpdate,
                              size: "large",
                              color: "green"
                            }, {
                              default: withCtx(() => [
                                createTextVNode("Salvar")
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
                      createVNode(VCol, { cols: "auto" }, {
                        default: withCtx(() => [
                          createVNode(_component_NuxtLink, { onClick: goBack }, {
                            default: withCtx(() => [
                              createVNode(VBtn, {
                                size: "large",
                                color: "red"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode("Voltar")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(VCol, { cols: "auto" }, {
                        default: withCtx(() => [
                          createVNode(VBtn, {
                            class: "ml-2",
                            onClick: onUpdate,
                            size: "large",
                            color: "green"
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Salvar")
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
                createVNode(VRow, { dense: "" }, {
                  default: withCtx(() => [
                    createVNode(VCol, {
                      cols: "12",
                      sm: "4",
                      md: "3"
                    }, {
                      default: withCtx(() => [
                        createVNode(VTextField, {
                          modelValue: unref(atos).dt_casamento,
                          "onUpdate:modelValue": ($event) => unref(atos).dt_casamento = $event,
                          type: "date",
                          label: "Data Casamento"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, {
                      cols: "12",
                      sm: "6",
                      md: "4"
                    }, {
                      default: withCtx(() => [
                        createVNode(VAutocomplete, {
                          label: "Regime Bens",
                          modelValue: unref(atos).tabvalores_regimecasamento_id,
                          "onUpdate:modelValue": ($event) => unref(atos).tabvalores_regimecasamento_id = $event,
                          items: unref(combolistRegimeBens),
                          "item-title": "descricao",
                          "item-value": "id",
                          required: ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, {
                      cols: "12",
                      sm: "6",
                      md: "3"
                    }, {
                      default: withCtx(() => [
                        createVNode(VTextField, {
                          label: "Filhos Maiores",
                          modelValue: unref(atos).qtd_filhos_maiores,
                          "onUpdate:modelValue": ($event) => unref(atos).qtd_filhos_maiores = $event,
                          modelModifiers: { number: true },
                          type: "number",
                          min: "0",
                          onKeydown: blockNonNumeric
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, {
                      cols: "12",
                      sm: "6",
                      md: "3"
                    }, {
                      default: withCtx(() => [
                        createVNode(VTextField, {
                          label: "Filhos Menores",
                          modelValue: unref(atos).qtd_filhos_menores,
                          "onUpdate:modelValue": ($event) => unref(atos).qtd_filhos_menores = $event,
                          type: "number",
                          min: "0",
                          onKeydown: blockNonNumeric
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, {
                      cols: "12",
                      sm: "6",
                      md: "4"
                    }, {
                      default: withCtx(() => [
                        createVNode(VAutocomplete, {
                          label: "Respons\xE1vel",
                          modelValue: unref(atos).responsavel_menores_id,
                          "onUpdate:modelValue": ($event) => unref(atos).responsavel_menores_id = $event,
                          items: unref(combolistResponsavel),
                          "item-title": "nome",
                          "item-value": "id",
                          required: ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                createVNode(VRow, {
                  class: "mt-5",
                  justify: "start",
                  align: "center"
                }, {
                  default: withCtx(() => [
                    createVNode(VCol, { cols: "auto" }, {
                      default: withCtx(() => [
                        createVNode(_component_NuxtLink, { onClick: goBack }, {
                          default: withCtx(() => [
                            createVNode(VBtn, {
                              size: "large",
                              color: "red"
                            }, {
                              default: withCtx(() => [
                                createTextVNode("Voltar")
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, { cols: "auto" }, {
                      default: withCtx(() => [
                        createVNode(VBtn, {
                          class: "ml-2",
                          onClick: onUpdate,
                          size: "large",
                          color: "green"
                        }, {
                          default: withCtx(() => [
                            createTextVNode("Salvar")
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
      } else {
        _push(`<!---->`);
      }
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Procuracao/SeparacaoDivorcio.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : undefined;
};

export { _sfc_main as _ };
//# sourceMappingURL=SeparacaoDivorcio-_ty1npQq.mjs.map
