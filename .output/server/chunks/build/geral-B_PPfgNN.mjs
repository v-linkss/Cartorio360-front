import { _ as _sfc_main$5, a as _sfc_main$4, b as _sfc_main$3, c as _sfc_main$2$1, d as _sfc_main$1$2, e as _sfc_main$6 } from './Anexos-CzLwbTn5.mjs';
import { _ as _sfc_main$1$1, a as _sfc_main$2 } from './Imoveis-DLno7DHR.mjs';
import { _ as __nuxt_component_0 } from './nuxt-link-TpvcaGEw.mjs';
import { ref, watch, mergeProps, withCtx, unref, isRef, createTextVNode, createVNode, openBlock, createBlock, createCommentVNode, useSSRContext, reactive, computed } from 'vue';
import { ssrRenderComponent } from 'vue/server-renderer';
import { u as useRouter$1, g as useRoute$1, b as useNuxtApp, f as VTextField, V as VBtn, c as useRuntimeConfig } from './server.mjs';
import { f as fetchWithToken } from './fetchWithToken-CCGIQo0b.mjs';
import { u as useFetch } from './fetch-uf6n1sXR.mjs';
import { V as VContainer } from './VContainer-CUysD4sO.mjs';
import { V as VRow } from './VRow-Bqz0CuIN.mjs';
import { V as VCol } from './VCol-BT4RzX0Q.mjs';
import { V as VAutocomplete } from './VAutocomplete-B9VRQqKl.mjs';
import { _ as _sfc_main$7 } from './Outros-DjQv9RXs.mjs';
import { V as VCard } from './VCard-Dbn6yWsi.mjs';
import { V as VTabs, a as VTab, d as VTabsWindow, e as VTabsWindowItem } from './VTabs-CQrE9VMQ.mjs';
import '@vuelidate/core';
import '@vuelidate/validators';
import './RegistroPessoas-Dm_bitTh.mjs';
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
import './asyncData-B8plM1p3.mjs';
import './formatDate-DflkuJ_V.mjs';
import './filter-BaqCkjdl.mjs';
import './VList-w5fWkTAt.mjs';
import './VAvatar-CfQAG9re.mjs';
import './VImg-CtUi4yCS.mjs';
import './VResponsive-BwPb2GHE.mjs';
import './VDivider-BxKHtM2e.mjs';
import './VSelectionControl-DI6QefPE.mjs';
import './novo-CWU3oYa5.mjs';
import './editar-BcGPsVK2.mjs';
import './excluido-D7FHZla7.mjs';
import './VDataTable-BqxaRhj7.mjs';
import './VDialog-BVe31KMa.mjs';
import 'utif';
import './FichaCard-BDq7cEeS.mjs';
import './visualizar-BoZ30DMV.mjs';
import './abre-arquivo-verde-CiKqsOQ8.mjs';
import './VTextarea-DJCeftNm.mjs';
import './Confirmacao-CQvuimra.mjs';
import './escanear-CJoLAgRx.mjs';
import './MoneyInput-ot-UsY0X.mjs';
import 'v-money3';
import './Atualizar-DtNPj0mW.mjs';
import './SaveButton-CahdIl3Y.mjs';
import './VCheckbox-QGLcwXmu.mjs';
import 'pinia';
import 'vue-router';
import 'vue3-toastify';
import 'vue-the-mask';

const _sfc_main$1 = {
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
  setup(__props) {
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
    `${config.public.auth}/service/gerencia/getAtos/${props.ato_id}`;
    `${config.public.auth}/service/gerencia/regime_casamento`;
    const getAtosPessoa = `${config.public.auth}/service/gerencia/getAtosPessoaById/${props.ato_id}`;
    const updateAtos = `${config.public.managemant}/updateAtos`;
    ref("");
    ref("");
    ref(false);
    ref(false);
    ref(null);
    const rawResponsavelFilhos = ref([]);
    const combolistResponsavel = computed(
      () => {
        var _a;
        return ((_a = rawResponsavelFilhos.value) == null ? undefined : _a.map((parte) => {
          var _a2;
          return {
            id: parte.pessoa.id,
            nome: ((_a2 = parte.pessoa) == null ? undefined : _a2.nome) || "Sem nome"
          };
        })) || [];
      }
    );
    const reloadResponsaveis = async () => {
      try {
        const { data } = await fetchWithToken(getAtosPessoa, { method: "GET" });
        rawResponsavelFilhos.value = data.value || [];
      } catch (e) {
      }
    };
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
      const { data, error, status } = await useFetch(
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
      if (status.value === "success") {
        $toast.success("Div\xF3rcio salvo com sucesso");
      }
    }
    const blockNonNumeric = (e) => {
      const allowedKeys = ["Backspace", "Tab", "ArrowLeft", "ArrowRight", "Delete"];
      if (!/[0-9]/.test(e.key) && !allowedKeys.includes(e.key)) {
        e.preventDefault();
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
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
                          onFocus: reloadResponsaveis,
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
                            onFocus: reloadResponsaveis,
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
                          onFocus: reloadResponsaveis,
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
                        onFocus: reloadResponsaveis,
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
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Procuracao/SeparacaoDivorcio.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : undefined;
};
const _sfc_main = {
  __name: "geral",
  __ssrInlineRender: true,
  props: {
    ato_token: {
      type: String,
      required: true
    },
    ato_tipo_id: {
      type: Number
    },
    usa_imoveis: {
      type: Boolean,
      default: false
    }
  },
  emits: ["ato-created"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const ato_id_prop = ref(null);
    const ato_token_prop = ref(null);
    const pages_prop = ref(null);
    const doc_prop = ref(null);
    const tab = ref(null);
    const showTabs = ref(false);
    const selectedAto = ref(props.ato_token);
    const selectedTipoAtoId = ref(props.ato_tipo_id);
    const tabEvent = ref(0);
    const divorcioTabClicks = ref(0);
    const handleSave = ({ id, token }) => {
      ato_id_prop.value = id;
      ato_token_prop.value = token;
      showTabs.value = true;
      emit("ato-created");
    };
    function onTabChange(newTab) {
      if (newTab === "divorcio") {
        tabEvent.value++;
      }
    }
    function onDivorcioTabClick() {
      if (tab.value === "divorcio" && divorcioTabClicks.value < 3) {
        tabEvent.value++;
        divorcioTabClicks.value++;
      }
    }
    const getPages = (pages) => {
      pages_prop.value = pages;
    };
    const getDocument = (doc) => {
      doc_prop.value = doc;
    };
    watch(
      () => props.ato_token,
      (newValue) => {
        selectedAto.value = newValue;
      }
    );
    watch(
      () => props.ato_tipo_id,
      (newValue) => {
        selectedTipoAtoId.value = newValue;
      }
    );
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ProcuracaoDados = _sfc_main$5;
      const _component_ProcuracaoPartes = _sfc_main$4;
      const _component_ProcuracaoBens = _sfc_main$1$1;
      const _component_ProcuracaoSeparacaoDivorcio = _sfc_main$1;
      const _component_ProcuracaoImoveis = _sfc_main$2;
      const _component_ProcuracaoMinuta = _sfc_main$3;
      const _component_ProcuracaoLivro = _sfc_main$2$1;
      const _component_ProcuracaoObservacao = _sfc_main$1$2;
      const _component_ProcuracaoAnexos = _sfc_main$6;
      const _component_ProcuracaoOutros = _sfc_main$7;
      _push(ssrRenderComponent(VCard, mergeProps({ width: "1300" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VTabs, {
              modelValue: unref(tab),
              "onUpdate:modelValue": ($event) => isRef(tab) ? tab.value = $event : null,
              "bg-color": "#f5f2f2"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VTab, { value: "dados" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Dados`);
                      } else {
                        return [
                          createTextVNode("Dados")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  if (unref(showTabs)) {
                    _push3(ssrRenderComponent(VTab, { value: "partes" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`Partes`);
                        } else {
                          return [
                            createTextVNode("Partes")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  if (unref(showTabs)) {
                    _push3(ssrRenderComponent(VTab, { value: "bens" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`Bens`);
                        } else {
                          return [
                            createTextVNode("Bens")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  if (unref(showTabs)) {
                    _push3(ssrRenderComponent(VTab, { value: "imoveis" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`Imoveis`);
                        } else {
                          return [
                            createTextVNode("Imoveis")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  if (unref(showTabs)) {
                    _push3(ssrRenderComponent(VTab, {
                      onClick: onDivorcioTabClick,
                      value: "divorcio"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`Matrim\xF4nio`);
                        } else {
                          return [
                            createTextVNode("Matrim\xF4nio")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  if (unref(showTabs)) {
                    _push3(ssrRenderComponent(VTab, { value: "minuta" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`Minuta`);
                        } else {
                          return [
                            createTextVNode("Minuta")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  if (unref(showTabs)) {
                    _push3(ssrRenderComponent(VTab, { value: "livro" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`Livro`);
                        } else {
                          return [
                            createTextVNode("Livro")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  if (unref(showTabs)) {
                    _push3(ssrRenderComponent(VTab, { value: "observacao" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`Observa\xE7\xF5es`);
                        } else {
                          return [
                            createTextVNode("Observa\xE7\xF5es")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  if (unref(showTabs)) {
                    _push3(ssrRenderComponent(VTab, { value: "anexo" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`Anexos`);
                        } else {
                          return [
                            createTextVNode("Anexos")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  if (unref(showTabs)) {
                    _push3(ssrRenderComponent(VTab, { value: "outros" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`Outros`);
                        } else {
                          return [
                            createTextVNode("Outros")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                } else {
                  return [
                    createVNode(VTab, { value: "dados" }, {
                      default: withCtx(() => [
                        createTextVNode("Dados")
                      ]),
                      _: 1
                    }),
                    unref(showTabs) ? (openBlock(), createBlock(VTab, {
                      key: 0,
                      value: "partes"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Partes")
                      ]),
                      _: 1
                    })) : createCommentVNode("", true),
                    unref(showTabs) ? (openBlock(), createBlock(VTab, {
                      key: 1,
                      value: "bens"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Bens")
                      ]),
                      _: 1
                    })) : createCommentVNode("", true),
                    unref(showTabs) ? (openBlock(), createBlock(VTab, {
                      key: 2,
                      value: "imoveis"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Imoveis")
                      ]),
                      _: 1
                    })) : createCommentVNode("", true),
                    unref(showTabs) ? (openBlock(), createBlock(VTab, {
                      key: 3,
                      onClick: onDivorcioTabClick,
                      value: "divorcio"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Matrim\xF4nio")
                      ]),
                      _: 1
                    })) : createCommentVNode("", true),
                    unref(showTabs) ? (openBlock(), createBlock(VTab, {
                      key: 4,
                      value: "minuta"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Minuta")
                      ]),
                      _: 1
                    })) : createCommentVNode("", true),
                    unref(showTabs) ? (openBlock(), createBlock(VTab, {
                      key: 5,
                      value: "livro"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Livro")
                      ]),
                      _: 1
                    })) : createCommentVNode("", true),
                    unref(showTabs) ? (openBlock(), createBlock(VTab, {
                      key: 6,
                      value: "observacao"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Observa\xE7\xF5es")
                      ]),
                      _: 1
                    })) : createCommentVNode("", true),
                    unref(showTabs) ? (openBlock(), createBlock(VTab, {
                      key: 7,
                      value: "anexo"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Anexos")
                      ]),
                      _: 1
                    })) : createCommentVNode("", true),
                    unref(showTabs) ? (openBlock(), createBlock(VTab, {
                      key: 8,
                      value: "outros"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Outros")
                      ]),
                      _: 1
                    })) : createCommentVNode("", true)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(VTabsWindow, {
              modelValue: unref(tab),
              "onUpdate:modelValue": [($event) => isRef(tab) ? tab.value = $event : null, onTabChange]
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VTabsWindowItem, { value: "dados" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_ProcuracaoDados, {
                          onSaved: handleSave,
                          ato_token: unref(selectedAto),
                          ato_tipo_id: unref(selectedTipoAtoId)
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_ProcuracaoDados, {
                            onSaved: handleSave,
                            ato_token: unref(selectedAto),
                            ato_tipo_id: unref(selectedTipoAtoId)
                          }, null, 8, ["ato_token", "ato_tipo_id"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  if (unref(showTabs)) {
                    _push3(ssrRenderComponent(VTabsWindowItem, { value: "partes" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_component_ProcuracaoPartes, {
                            ato_token: unref(selectedAto),
                            ato_id: unref(ato_id_prop)
                          }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_component_ProcuracaoPartes, {
                              ato_token: unref(selectedAto),
                              ato_id: unref(ato_id_prop)
                            }, null, 8, ["ato_token", "ato_id"])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  if (unref(showTabs)) {
                    _push3(ssrRenderComponent(VTabsWindowItem, { value: "bens" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_component_ProcuracaoBens, {
                            ato_token: unref(ato_token_prop),
                            ato_id: unref(ato_id_prop)
                          }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_component_ProcuracaoBens, {
                              ato_token: unref(ato_token_prop),
                              ato_id: unref(ato_id_prop)
                            }, null, 8, ["ato_token", "ato_id"])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  if (unref(showTabs)) {
                    _push3(ssrRenderComponent(VTabsWindowItem, { value: "divorcio" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_component_ProcuracaoSeparacaoDivorcio, {
                            ato_token: unref(ato_token_prop),
                            ato_id: unref(ato_id_prop),
                            "tab-event": unref(tabEvent)
                          }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_component_ProcuracaoSeparacaoDivorcio, {
                              ato_token: unref(ato_token_prop),
                              ato_id: unref(ato_id_prop),
                              "tab-event": unref(tabEvent)
                            }, null, 8, ["ato_token", "ato_id", "tab-event"])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  if (unref(showTabs)) {
                    _push3(ssrRenderComponent(VTabsWindowItem, { value: "imoveis" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_component_ProcuracaoImoveis, {
                            ato_token: unref(ato_token_prop),
                            ato_token_selected: unref(selectedAto),
                            ato_id: unref(ato_id_prop)
                          }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_component_ProcuracaoImoveis, {
                              ato_token: unref(ato_token_prop),
                              ato_token_selected: unref(selectedAto),
                              ato_id: unref(ato_id_prop)
                            }, null, 8, ["ato_token", "ato_token_selected", "ato_id"])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  if (unref(showTabs)) {
                    _push3(ssrRenderComponent(VTabsWindowItem, { value: "minuta" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_component_ProcuracaoMinuta, {
                            onPage: getPages,
                            onDoc: getDocument,
                            ato_token: unref(ato_token_prop)
                          }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_component_ProcuracaoMinuta, {
                              onPage: getPages,
                              onDoc: getDocument,
                              ato_token: unref(ato_token_prop)
                            }, null, 8, ["ato_token"])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  if (unref(showTabs)) {
                    _push3(ssrRenderComponent(VTabsWindowItem, { value: "livro" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_component_ProcuracaoLivro, {
                            pages: unref(pages_prop),
                            ato_token: unref(ato_token_prop),
                            document: unref(doc_prop)
                          }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_component_ProcuracaoLivro, {
                              pages: unref(pages_prop),
                              ato_token: unref(ato_token_prop),
                              document: unref(doc_prop)
                            }, null, 8, ["pages", "ato_token", "document"])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  if (unref(showTabs)) {
                    _push3(ssrRenderComponent(VTabsWindowItem, { value: "observacao" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_component_ProcuracaoObservacao, { ato_id: unref(ato_id_prop) }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_component_ProcuracaoObservacao, { ato_id: unref(ato_id_prop) }, null, 8, ["ato_id"])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  if (unref(showTabs)) {
                    _push3(ssrRenderComponent(VTabsWindowItem, { value: "anexo" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_component_ProcuracaoAnexos, {
                            ato_token: unref(ato_token_prop),
                            ato_id: unref(ato_id_prop)
                          }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_component_ProcuracaoAnexos, {
                              ato_token: unref(ato_token_prop),
                              ato_id: unref(ato_id_prop)
                            }, null, 8, ["ato_token", "ato_id"])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  if (unref(showTabs)) {
                    _push3(ssrRenderComponent(VTabsWindowItem, { value: "outros" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_component_ProcuracaoOutros, {
                            ato_token: unref(ato_token_prop),
                            ato_id: unref(ato_id_prop)
                          }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_component_ProcuracaoOutros, {
                              ato_token: unref(ato_token_prop),
                              ato_id: unref(ato_id_prop)
                            }, null, 8, ["ato_token", "ato_id"])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                } else {
                  return [
                    createVNode(VTabsWindowItem, { value: "dados" }, {
                      default: withCtx(() => [
                        createVNode(_component_ProcuracaoDados, {
                          onSaved: handleSave,
                          ato_token: unref(selectedAto),
                          ato_tipo_id: unref(selectedTipoAtoId)
                        }, null, 8, ["ato_token", "ato_tipo_id"])
                      ]),
                      _: 1
                    }),
                    unref(showTabs) ? (openBlock(), createBlock(VTabsWindowItem, {
                      key: 0,
                      value: "partes"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_ProcuracaoPartes, {
                          ato_token: unref(selectedAto),
                          ato_id: unref(ato_id_prop)
                        }, null, 8, ["ato_token", "ato_id"])
                      ]),
                      _: 1
                    })) : createCommentVNode("", true),
                    unref(showTabs) ? (openBlock(), createBlock(VTabsWindowItem, {
                      key: 1,
                      value: "bens"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_ProcuracaoBens, {
                          ato_token: unref(ato_token_prop),
                          ato_id: unref(ato_id_prop)
                        }, null, 8, ["ato_token", "ato_id"])
                      ]),
                      _: 1
                    })) : createCommentVNode("", true),
                    unref(showTabs) ? (openBlock(), createBlock(VTabsWindowItem, {
                      key: 2,
                      value: "divorcio"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_ProcuracaoSeparacaoDivorcio, {
                          ato_token: unref(ato_token_prop),
                          ato_id: unref(ato_id_prop),
                          "tab-event": unref(tabEvent)
                        }, null, 8, ["ato_token", "ato_id", "tab-event"])
                      ]),
                      _: 1
                    })) : createCommentVNode("", true),
                    unref(showTabs) ? (openBlock(), createBlock(VTabsWindowItem, {
                      key: 3,
                      value: "imoveis"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_ProcuracaoImoveis, {
                          ato_token: unref(ato_token_prop),
                          ato_token_selected: unref(selectedAto),
                          ato_id: unref(ato_id_prop)
                        }, null, 8, ["ato_token", "ato_token_selected", "ato_id"])
                      ]),
                      _: 1
                    })) : createCommentVNode("", true),
                    unref(showTabs) ? (openBlock(), createBlock(VTabsWindowItem, {
                      key: 4,
                      value: "minuta"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_ProcuracaoMinuta, {
                          onPage: getPages,
                          onDoc: getDocument,
                          ato_token: unref(ato_token_prop)
                        }, null, 8, ["ato_token"])
                      ]),
                      _: 1
                    })) : createCommentVNode("", true),
                    unref(showTabs) ? (openBlock(), createBlock(VTabsWindowItem, {
                      key: 5,
                      value: "livro"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_ProcuracaoLivro, {
                          pages: unref(pages_prop),
                          ato_token: unref(ato_token_prop),
                          document: unref(doc_prop)
                        }, null, 8, ["pages", "ato_token", "document"])
                      ]),
                      _: 1
                    })) : createCommentVNode("", true),
                    unref(showTabs) ? (openBlock(), createBlock(VTabsWindowItem, {
                      key: 6,
                      value: "observacao"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_ProcuracaoObservacao, { ato_id: unref(ato_id_prop) }, null, 8, ["ato_id"])
                      ]),
                      _: 1
                    })) : createCommentVNode("", true),
                    unref(showTabs) ? (openBlock(), createBlock(VTabsWindowItem, {
                      key: 7,
                      value: "anexo"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_ProcuracaoAnexos, {
                          ato_token: unref(ato_token_prop),
                          ato_id: unref(ato_id_prop)
                        }, null, 8, ["ato_token", "ato_id"])
                      ]),
                      _: 1
                    })) : createCommentVNode("", true),
                    unref(showTabs) ? (openBlock(), createBlock(VTabsWindowItem, {
                      key: 8,
                      value: "outros"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_ProcuracaoOutros, {
                          ato_token: unref(ato_token_prop),
                          ato_id: unref(ato_id_prop)
                        }, null, 8, ["ato_token", "ato_id"])
                      ]),
                      _: 1
                    })) : createCommentVNode("", true)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(VTabs, {
                modelValue: unref(tab),
                "onUpdate:modelValue": ($event) => isRef(tab) ? tab.value = $event : null,
                "bg-color": "#f5f2f2"
              }, {
                default: withCtx(() => [
                  createVNode(VTab, { value: "dados" }, {
                    default: withCtx(() => [
                      createTextVNode("Dados")
                    ]),
                    _: 1
                  }),
                  unref(showTabs) ? (openBlock(), createBlock(VTab, {
                    key: 0,
                    value: "partes"
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Partes")
                    ]),
                    _: 1
                  })) : createCommentVNode("", true),
                  unref(showTabs) ? (openBlock(), createBlock(VTab, {
                    key: 1,
                    value: "bens"
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Bens")
                    ]),
                    _: 1
                  })) : createCommentVNode("", true),
                  unref(showTabs) ? (openBlock(), createBlock(VTab, {
                    key: 2,
                    value: "imoveis"
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Imoveis")
                    ]),
                    _: 1
                  })) : createCommentVNode("", true),
                  unref(showTabs) ? (openBlock(), createBlock(VTab, {
                    key: 3,
                    onClick: onDivorcioTabClick,
                    value: "divorcio"
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Matrim\xF4nio")
                    ]),
                    _: 1
                  })) : createCommentVNode("", true),
                  unref(showTabs) ? (openBlock(), createBlock(VTab, {
                    key: 4,
                    value: "minuta"
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Minuta")
                    ]),
                    _: 1
                  })) : createCommentVNode("", true),
                  unref(showTabs) ? (openBlock(), createBlock(VTab, {
                    key: 5,
                    value: "livro"
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Livro")
                    ]),
                    _: 1
                  })) : createCommentVNode("", true),
                  unref(showTabs) ? (openBlock(), createBlock(VTab, {
                    key: 6,
                    value: "observacao"
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Observa\xE7\xF5es")
                    ]),
                    _: 1
                  })) : createCommentVNode("", true),
                  unref(showTabs) ? (openBlock(), createBlock(VTab, {
                    key: 7,
                    value: "anexo"
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Anexos")
                    ]),
                    _: 1
                  })) : createCommentVNode("", true),
                  unref(showTabs) ? (openBlock(), createBlock(VTab, {
                    key: 8,
                    value: "outros"
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Outros")
                    ]),
                    _: 1
                  })) : createCommentVNode("", true)
                ]),
                _: 1
              }, 8, ["modelValue", "onUpdate:modelValue"]),
              createVNode(VTabsWindow, {
                modelValue: unref(tab),
                "onUpdate:modelValue": [($event) => isRef(tab) ? tab.value = $event : null, onTabChange]
              }, {
                default: withCtx(() => [
                  createVNode(VTabsWindowItem, { value: "dados" }, {
                    default: withCtx(() => [
                      createVNode(_component_ProcuracaoDados, {
                        onSaved: handleSave,
                        ato_token: unref(selectedAto),
                        ato_tipo_id: unref(selectedTipoAtoId)
                      }, null, 8, ["ato_token", "ato_tipo_id"])
                    ]),
                    _: 1
                  }),
                  unref(showTabs) ? (openBlock(), createBlock(VTabsWindowItem, {
                    key: 0,
                    value: "partes"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_ProcuracaoPartes, {
                        ato_token: unref(selectedAto),
                        ato_id: unref(ato_id_prop)
                      }, null, 8, ["ato_token", "ato_id"])
                    ]),
                    _: 1
                  })) : createCommentVNode("", true),
                  unref(showTabs) ? (openBlock(), createBlock(VTabsWindowItem, {
                    key: 1,
                    value: "bens"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_ProcuracaoBens, {
                        ato_token: unref(ato_token_prop),
                        ato_id: unref(ato_id_prop)
                      }, null, 8, ["ato_token", "ato_id"])
                    ]),
                    _: 1
                  })) : createCommentVNode("", true),
                  unref(showTabs) ? (openBlock(), createBlock(VTabsWindowItem, {
                    key: 2,
                    value: "divorcio"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_ProcuracaoSeparacaoDivorcio, {
                        ato_token: unref(ato_token_prop),
                        ato_id: unref(ato_id_prop),
                        "tab-event": unref(tabEvent)
                      }, null, 8, ["ato_token", "ato_id", "tab-event"])
                    ]),
                    _: 1
                  })) : createCommentVNode("", true),
                  unref(showTabs) ? (openBlock(), createBlock(VTabsWindowItem, {
                    key: 3,
                    value: "imoveis"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_ProcuracaoImoveis, {
                        ato_token: unref(ato_token_prop),
                        ato_token_selected: unref(selectedAto),
                        ato_id: unref(ato_id_prop)
                      }, null, 8, ["ato_token", "ato_token_selected", "ato_id"])
                    ]),
                    _: 1
                  })) : createCommentVNode("", true),
                  unref(showTabs) ? (openBlock(), createBlock(VTabsWindowItem, {
                    key: 4,
                    value: "minuta"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_ProcuracaoMinuta, {
                        onPage: getPages,
                        onDoc: getDocument,
                        ato_token: unref(ato_token_prop)
                      }, null, 8, ["ato_token"])
                    ]),
                    _: 1
                  })) : createCommentVNode("", true),
                  unref(showTabs) ? (openBlock(), createBlock(VTabsWindowItem, {
                    key: 5,
                    value: "livro"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_ProcuracaoLivro, {
                        pages: unref(pages_prop),
                        ato_token: unref(ato_token_prop),
                        document: unref(doc_prop)
                      }, null, 8, ["pages", "ato_token", "document"])
                    ]),
                    _: 1
                  })) : createCommentVNode("", true),
                  unref(showTabs) ? (openBlock(), createBlock(VTabsWindowItem, {
                    key: 6,
                    value: "observacao"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_ProcuracaoObservacao, { ato_id: unref(ato_id_prop) }, null, 8, ["ato_id"])
                    ]),
                    _: 1
                  })) : createCommentVNode("", true),
                  unref(showTabs) ? (openBlock(), createBlock(VTabsWindowItem, {
                    key: 7,
                    value: "anexo"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_ProcuracaoAnexos, {
                        ato_token: unref(ato_token_prop),
                        ato_id: unref(ato_id_prop)
                      }, null, 8, ["ato_token", "ato_id"])
                    ]),
                    _: 1
                  })) : createCommentVNode("", true),
                  unref(showTabs) ? (openBlock(), createBlock(VTabsWindowItem, {
                    key: 8,
                    value: "outros"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_ProcuracaoOutros, {
                        ato_token: unref(ato_token_prop),
                        ato_id: unref(ato_id_prop)
                      }, null, 8, ["ato_token", "ato_id"])
                    ]),
                    _: 1
                  })) : createCommentVNode("", true)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/fontes/atos/divorcio/geral.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : undefined;
};

export { _sfc_main as default };
//# sourceMappingURL=geral-B_PPfgNN.mjs.map
