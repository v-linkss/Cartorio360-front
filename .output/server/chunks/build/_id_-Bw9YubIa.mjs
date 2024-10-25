import { _ as __nuxt_component_0 } from './nuxt-link-DyZc7qn_.mjs';
import { V as VTabs, a as VTab, b as VTabsWindow, c as VTabsWindowItem, _ as _sfc_main$7, d as _sfc_main$6, e as __nuxt_component_3, f as __nuxt_component_4 } from './Restricoes-C-tPFUro.mjs';
import { ref, reactive, resolveDirective, mergeProps, withCtx, unref, isRef, createTextVNode, createVNode, withDirectives, toDisplayString, useSSRContext } from 'vue';
import { _ as _export_sfc, u as useRouter$1, f as useNuxtApp, c as useRoute$1, d as useCookie, V as VTextField, b as useRuntimeConfig } from './server.mjs';
import { u as useFetch } from './fetch-Dsyde8UD.mjs';
import { ssrRenderComponent, ssrRenderStyle, ssrInterpolate, ssrGetDirectiveProps, ssrRenderAttr } from 'vue/server-renderer';
import { _ as _imports_0 } from './sair-CV1ySkp8.mjs';
import { V as VAutocomplete, _ as _imports_1 } from './salvar-DRINGrxl.mjs';
import { useVuelidate } from '@vuelidate/core';
import { a as VCard } from './VCard-DfTYaOUe.mjs';
import { V as VContainer } from './VContainer-chgtNZst.mjs';
import { V as VRow } from './VRow-BuaJrtx0.mjs';
import { V as VCol } from './VCol-uBIoF0At.mjs';
import '../runtime.mjs';
import 'node:http';
import 'node:https';
import 'fs';
import 'path';
import 'node:fs';
import 'node:url';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'devalue';
import '@unhead/ssr';
import 'unhead';
import '@unhead/shared';
import './formatDate-B6RUKh9-.mjs';
import './mudarStatus-D3vc2C0t.mjs';
import './excluido-CHOPYrBt.mjs';
import '@vuelidate/validators';
import 'vue-router';
import 'vue3-toastify';
import 'vue-the-mask';

const _sfc_main = {
  __name: "[id]",
  __ssrInlineRender: true,
  emits: ["saved"],
  setup(__props, { emit: __emit }) {
    const tab = ref(null);
    const router = useRouter$1();
    const { $toast } = useNuxtApp();
    const route = useRoute$1();
    const { id } = route.params;
    const config = useRuntimeConfig();
    const updatePessoa = `${config.public.managemant}/updatePessoa`;
    `${config.public.managemant}/listarEstadoCivil`;
    `${config.public.managemant}/listarCapacidadeCivil`;
    `${config.public.managemant}/listarCidades`;
    `${config.public.managemant}/getPessoaById`;
    const estadoCivilItemsData = ref([]);
    const capacidadeCivilItemsData = ref([]);
    const cidadeNascimentoItemsData = ref([]);
    const initialState = {
      nome: "",
      nome_pai: "",
      nome_mae: "",
      profissao: "",
      data_nascimento: "",
      doc_identificacao: "",
      cpf_pai: "",
      cpf_mae: "",
      tipo_pessoa: "FISICA",
      tabvalores_estadocivil_id: "",
      tabvalores_capacidadecivil_id: "",
      cidade_natural_id: "",
      cartorio_id: useCookie("user-data").value.cartorio_id,
      user_id: useCookie("user-data").value.usuario_id
    };
    const state = reactive({
      ...initialState
    });
    function removeFormatting(value) {
      if (value) {
        return value.replace(/[.\-]/g, "");
      } else {
        value = null;
      }
    }
    useVuelidate(state);
    function formatPayload(payload) {
      const formattedPayload = {};
      for (const key in payload) {
        if (payload[key] === "") {
          formattedPayload[key] = null;
        } else if (key === "doc_identificacao" || key === "cpf_pai" || key === "cpf_mae") {
          formattedPayload[key] = removeFormatting(payload[key]);
        } else {
          formattedPayload[key] = payload[key];
        }
      }
      return formattedPayload;
    }
    async function onUpdate() {
      const payloadFormated = formatPayload(state);
      await useFetch(`${updatePessoa}/${id}`, {
        method: "PUT",
        body: payloadFormated
      }, "$NdF8Uiv290");
      $toast.success("Pessoa atualizada com sucesso!");
      router.push("/pessoas/registros");
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      const _component_Documentos = _sfc_main$7;
      const _component_Endereco = _sfc_main$6;
      const _component_Biometria = __nuxt_component_3;
      const _component_Restricoes = __nuxt_component_4;
      const _directive_mask = resolveDirective("mask");
      _push(ssrRenderComponent(VCard, mergeProps({ width: "1300" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h1 style="${ssrRenderStyle({ "background-color": "#c8fcca", "color": "#429946", "padding": "10px 0px 0px 20px" })}" data-v-5dd60f64${_scopeId}>${ssrInterpolate(unref(id) ? "Atualiza\xE7\xE3o de Pessoas" : "Cadastramento de Pessoas")}</h1><div style="${ssrRenderStyle({ "background-color": "#c8fcca", "padding": "20px 0px 20px 20px" })}" data-v-5dd60f64${_scopeId}>`);
            _push2(ssrRenderComponent(VAutocomplete, {
              modelValue: state.tipo_pessoa,
              "onUpdate:modelValue": ($event) => state.tipo_pessoa = $event,
              style: { "width": "200px" },
              items: _ctx.pessoa_tipo,
              label: "Tipo de pessoa",
              "bg-color": "#F6F6F6",
              disabled: ""
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
            _push2(ssrRenderComponent(VTabs, {
              modelValue: unref(tab),
              "onUpdate:modelValue": ($event) => isRef(tab) ? tab.value = $event : null,
              "bg-color": "#C8FCCA"
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
                  _push3(ssrRenderComponent(VTab, { value: "documento" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Documentos`);
                      } else {
                        return [
                          createTextVNode("Documentos")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VTab, { value: "endereco" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Endere\xE7os`);
                      } else {
                        return [
                          createTextVNode("Endere\xE7os")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VTab, { value: "biometria" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Biometria`);
                      } else {
                        return [
                          createTextVNode("Biometria")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VTab, { value: "restricao" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Restri\xE7\xF5es`);
                      } else {
                        return [
                          createTextVNode("Restri\xE7\xF5es")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VTab, { value: "dados" }, {
                      default: withCtx(() => [
                        createTextVNode("Dados")
                      ]),
                      _: 1
                    }),
                    createVNode(VTab, { value: "documento" }, {
                      default: withCtx(() => [
                        createTextVNode("Documentos")
                      ]),
                      _: 1
                    }),
                    createVNode(VTab, { value: "endereco" }, {
                      default: withCtx(() => [
                        createTextVNode("Endere\xE7os")
                      ]),
                      _: 1
                    }),
                    createVNode(VTab, { value: "biometria" }, {
                      default: withCtx(() => [
                        createTextVNode("Biometria")
                      ]),
                      _: 1
                    }),
                    createVNode(VTab, { value: "restricao" }, {
                      default: withCtx(() => [
                        createTextVNode("Restri\xE7\xF5es")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(VTabsWindow, {
              modelValue: unref(tab),
              "onUpdate:modelValue": ($event) => isRef(tab) ? tab.value = $event : null
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VTabsWindowItem, { value: "dados" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VContainer, { class: "mt-5" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VRow, null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(VCol, {
                                      cols: "12",
                                      md: "8"
                                    }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(VTextField, {
                                            modelValue: state.nome,
                                            "onUpdate:modelValue": ($event) => state.nome = $event,
                                            label: "Nome"
                                          }, null, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(VTextField, {
                                              modelValue: state.nome,
                                              "onUpdate:modelValue": ($event) => state.nome = $event,
                                              label: "Nome"
                                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(VCol, {
                                      cols: "12",
                                      md: "4"
                                    }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(VTextField, mergeProps({
                                            modelValue: state.doc_identificacao,
                                            "onUpdate:modelValue": ($event) => state.doc_identificacao = $event,
                                            label: "CPF"
                                          }, ssrGetDirectiveProps(_ctx, _directive_mask, "###.###.###-##")), null, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            withDirectives(createVNode(VTextField, {
                                              modelValue: state.doc_identificacao,
                                              "onUpdate:modelValue": ($event) => state.doc_identificacao = $event,
                                              label: "CPF"
                                            }, null, 8, ["modelValue", "onUpdate:modelValue"]), [
                                              [_directive_mask, "###.###.###-##"]
                                            ])
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(VCol, {
                                        cols: "12",
                                        md: "8"
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(VTextField, {
                                            modelValue: state.nome,
                                            "onUpdate:modelValue": ($event) => state.nome = $event,
                                            label: "Nome"
                                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(VCol, {
                                        cols: "12",
                                        md: "4"
                                      }, {
                                        default: withCtx(() => [
                                          withDirectives(createVNode(VTextField, {
                                            modelValue: state.doc_identificacao,
                                            "onUpdate:modelValue": ($event) => state.doc_identificacao = $event,
                                            label: "CPF"
                                          }, null, 8, ["modelValue", "onUpdate:modelValue"]), [
                                            [_directive_mask, "###.###.###-##"]
                                          ])
                                        ]),
                                        _: 1
                                      })
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(VRow, null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(VCol, {
                                      cols: "12",
                                      md: "4"
                                    }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(VAutocomplete, {
                                            modelValue: state.tabvalores_estadocivil_id,
                                            "onUpdate:modelValue": ($event) => state.tabvalores_estadocivil_id = $event,
                                            items: unref(estadoCivilItemsData),
                                            "item-title": "descricao",
                                            "item-value": "id",
                                            label: "Estado Civil"
                                          }, null, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(VAutocomplete, {
                                              modelValue: state.tabvalores_estadocivil_id,
                                              "onUpdate:modelValue": ($event) => state.tabvalores_estadocivil_id = $event,
                                              items: unref(estadoCivilItemsData),
                                              "item-title": "descricao",
                                              "item-value": "id",
                                              label: "Estado Civil"
                                            }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(VCol, {
                                      cols: "12",
                                      md: "4"
                                    }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(VTextField, {
                                            modelValue: state.profissao,
                                            "onUpdate:modelValue": ($event) => state.profissao = $event,
                                            label: "Profiss\xE3o"
                                          }, null, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(VTextField, {
                                              modelValue: state.profissao,
                                              "onUpdate:modelValue": ($event) => state.profissao = $event,
                                              label: "Profiss\xE3o"
                                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(VCol, {
                                      cols: "12",
                                      md: "4"
                                    }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(VTextField, {
                                            modelValue: state.local_trabalho,
                                            "onUpdate:modelValue": ($event) => state.local_trabalho = $event,
                                            label: "Local de trabalho"
                                          }, null, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(VTextField, {
                                              modelValue: state.local_trabalho,
                                              "onUpdate:modelValue": ($event) => state.local_trabalho = $event,
                                              label: "Local de trabalho"
                                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(VCol, {
                                        cols: "12",
                                        md: "4"
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(VAutocomplete, {
                                            modelValue: state.tabvalores_estadocivil_id,
                                            "onUpdate:modelValue": ($event) => state.tabvalores_estadocivil_id = $event,
                                            items: unref(estadoCivilItemsData),
                                            "item-title": "descricao",
                                            "item-value": "id",
                                            label: "Estado Civil"
                                          }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(VCol, {
                                        cols: "12",
                                        md: "4"
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(VTextField, {
                                            modelValue: state.profissao,
                                            "onUpdate:modelValue": ($event) => state.profissao = $event,
                                            label: "Profiss\xE3o"
                                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(VCol, {
                                        cols: "12",
                                        md: "4"
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(VTextField, {
                                            modelValue: state.local_trabalho,
                                            "onUpdate:modelValue": ($event) => state.local_trabalho = $event,
                                            label: "Local de trabalho"
                                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                        ]),
                                        _: 1
                                      })
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(VRow, null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(VCol, {
                                      cols: "12",
                                      md: "4"
                                    }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(VTextField, {
                                            modelValue: state.data_nascimento,
                                            "onUpdate:modelValue": ($event) => state.data_nascimento = $event,
                                            type: "date",
                                            "prepend-icon": "",
                                            label: "Data de nascimento"
                                          }, null, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(VTextField, {
                                              modelValue: state.data_nascimento,
                                              "onUpdate:modelValue": ($event) => state.data_nascimento = $event,
                                              type: "date",
                                              "prepend-icon": "",
                                              label: "Data de nascimento"
                                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(VCol, {
                                      cols: "12",
                                      md: "4"
                                    }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(VAutocomplete, {
                                            modelValue: state.tabvalores_capacidadecivil_id,
                                            "onUpdate:modelValue": ($event) => state.tabvalores_capacidadecivil_id = $event,
                                            items: unref(capacidadeCivilItemsData),
                                            label: "Capacidade Civil",
                                            "item-title": "descricao",
                                            "item-value": "id"
                                          }, null, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(VAutocomplete, {
                                              modelValue: state.tabvalores_capacidadecivil_id,
                                              "onUpdate:modelValue": ($event) => state.tabvalores_capacidadecivil_id = $event,
                                              items: unref(capacidadeCivilItemsData),
                                              label: "Capacidade Civil",
                                              "item-title": "descricao",
                                              "item-value": "id"
                                            }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(VCol, {
                                      cols: "12",
                                      md: "4"
                                    }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(VAutocomplete, {
                                            modelValue: state.cidade_natural_id,
                                            "onUpdate:modelValue": ($event) => state.cidade_natural_id = $event,
                                            items: unref(cidadeNascimentoItemsData),
                                            label: "Cidade de nascimento",
                                            "item-title": "descricao",
                                            "item-value": "id"
                                          }, null, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(VAutocomplete, {
                                              modelValue: state.cidade_natural_id,
                                              "onUpdate:modelValue": ($event) => state.cidade_natural_id = $event,
                                              items: unref(cidadeNascimentoItemsData),
                                              label: "Cidade de nascimento",
                                              "item-title": "descricao",
                                              "item-value": "id"
                                            }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(VCol, {
                                        cols: "12",
                                        md: "4"
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(VTextField, {
                                            modelValue: state.data_nascimento,
                                            "onUpdate:modelValue": ($event) => state.data_nascimento = $event,
                                            type: "date",
                                            "prepend-icon": "",
                                            label: "Data de nascimento"
                                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(VCol, {
                                        cols: "12",
                                        md: "4"
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(VAutocomplete, {
                                            modelValue: state.tabvalores_capacidadecivil_id,
                                            "onUpdate:modelValue": ($event) => state.tabvalores_capacidadecivil_id = $event,
                                            items: unref(capacidadeCivilItemsData),
                                            label: "Capacidade Civil",
                                            "item-title": "descricao",
                                            "item-value": "id"
                                          }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(VCol, {
                                        cols: "12",
                                        md: "4"
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(VAutocomplete, {
                                            modelValue: state.cidade_natural_id,
                                            "onUpdate:modelValue": ($event) => state.cidade_natural_id = $event,
                                            items: unref(cidadeNascimentoItemsData),
                                            label: "Cidade de nascimento",
                                            "item-title": "descricao",
                                            "item-value": "id"
                                          }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                                        ]),
                                        _: 1
                                      })
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(VRow, null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(VCol, {
                                      cols: "12",
                                      md: "4"
                                    }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(VTextField, mergeProps({
                                            modelValue: state.cpf_pai,
                                            "onUpdate:modelValue": ($event) => state.cpf_pai = $event,
                                            modelModifiers: { date: true },
                                            label: "CPF do Pai"
                                          }, ssrGetDirectiveProps(_ctx, _directive_mask, "###.###.###-##")), null, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            withDirectives(createVNode(VTextField, {
                                              modelValue: state.cpf_pai,
                                              "onUpdate:modelValue": ($event) => state.cpf_pai = $event,
                                              modelModifiers: { date: true },
                                              label: "CPF do Pai"
                                            }, null, 8, ["modelValue", "onUpdate:modelValue"]), [
                                              [_directive_mask, "###.###.###-##"]
                                            ])
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(VCol, {
                                      cols: "12",
                                      md: "4"
                                    }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(VTextField, {
                                            modelValue: state.nome_pai,
                                            "onUpdate:modelValue": ($event) => state.nome_pai = $event,
                                            modelModifiers: { date: true },
                                            label: "Nome do Pai"
                                          }, null, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(VTextField, {
                                              modelValue: state.nome_pai,
                                              "onUpdate:modelValue": ($event) => state.nome_pai = $event,
                                              modelModifiers: { date: true },
                                              label: "Nome do Pai"
                                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(VCol, {
                                        cols: "12",
                                        md: "4"
                                      }, {
                                        default: withCtx(() => [
                                          withDirectives(createVNode(VTextField, {
                                            modelValue: state.cpf_pai,
                                            "onUpdate:modelValue": ($event) => state.cpf_pai = $event,
                                            modelModifiers: { date: true },
                                            label: "CPF do Pai"
                                          }, null, 8, ["modelValue", "onUpdate:modelValue"]), [
                                            [_directive_mask, "###.###.###-##"]
                                          ])
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(VCol, {
                                        cols: "12",
                                        md: "4"
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(VTextField, {
                                            modelValue: state.nome_pai,
                                            "onUpdate:modelValue": ($event) => state.nome_pai = $event,
                                            modelModifiers: { date: true },
                                            label: "Nome do Pai"
                                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                        ]),
                                        _: 1
                                      })
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(VRow, null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(VCol, {
                                      cols: "12",
                                      md: "4"
                                    }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(VTextField, mergeProps({
                                            modelValue: state.cpf_mae,
                                            "onUpdate:modelValue": ($event) => state.cpf_mae = $event,
                                            modelModifiers: { date: true },
                                            label: "CPF da M\xE3e"
                                          }, ssrGetDirectiveProps(_ctx, _directive_mask, "###.###.###-##")), null, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            withDirectives(createVNode(VTextField, {
                                              modelValue: state.cpf_mae,
                                              "onUpdate:modelValue": ($event) => state.cpf_mae = $event,
                                              modelModifiers: { date: true },
                                              label: "CPF da M\xE3e"
                                            }, null, 8, ["modelValue", "onUpdate:modelValue"]), [
                                              [_directive_mask, "###.###.###-##"]
                                            ])
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(VCol, {
                                      cols: "12",
                                      md: "4"
                                    }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(VTextField, {
                                            modelValue: state.nome_mae,
                                            "onUpdate:modelValue": ($event) => state.nome_mae = $event,
                                            modelModifiers: { date: true },
                                            label: "Nome da M\xE3e"
                                          }, null, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(VTextField, {
                                              modelValue: state.nome_mae,
                                              "onUpdate:modelValue": ($event) => state.nome_mae = $event,
                                              modelModifiers: { date: true },
                                              label: "Nome da M\xE3e"
                                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(VCol, {
                                        cols: "12",
                                        md: "4"
                                      }, {
                                        default: withCtx(() => [
                                          withDirectives(createVNode(VTextField, {
                                            modelValue: state.cpf_mae,
                                            "onUpdate:modelValue": ($event) => state.cpf_mae = $event,
                                            modelModifiers: { date: true },
                                            label: "CPF da M\xE3e"
                                          }, null, 8, ["modelValue", "onUpdate:modelValue"]), [
                                            [_directive_mask, "###.###.###-##"]
                                          ])
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(VCol, {
                                        cols: "12",
                                        md: "4"
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(VTextField, {
                                            modelValue: state.nome_mae,
                                            "onUpdate:modelValue": ($event) => state.nome_mae = $event,
                                            modelModifiers: { date: true },
                                            label: "Nome da M\xE3e"
                                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                        ]),
                                        _: 1
                                      })
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(VRow, null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_NuxtLink, { to: "/pessoas/registros" }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`<img class="btn-pointer"${ssrRenderAttr("src", _imports_0)} alt="Sair" data-v-5dd60f64${_scopeId6}>`);
                                        } else {
                                          return [
                                            createVNode("img", {
                                              class: "btn-pointer",
                                              src: _imports_0,
                                              alt: "Sair"
                                            })
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(`<img class="btn-pointer"${ssrRenderAttr("src", _imports_1)} data-v-5dd60f64${_scopeId5}>`);
                                  } else {
                                    return [
                                      createVNode(_component_NuxtLink, { to: "/pessoas/registros" }, {
                                        default: withCtx(() => [
                                          createVNode("img", {
                                            class: "btn-pointer",
                                            src: _imports_0,
                                            alt: "Sair"
                                          })
                                        ]),
                                        _: 1
                                      }),
                                      createVNode("img", {
                                        class: "btn-pointer",
                                        src: _imports_1,
                                        onClick: ($event) => onUpdate()
                                      }, null, 8, ["onClick"])
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(VRow, null, {
                                  default: withCtx(() => [
                                    createVNode(VCol, {
                                      cols: "12",
                                      md: "8"
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(VTextField, {
                                          modelValue: state.nome,
                                          "onUpdate:modelValue": ($event) => state.nome = $event,
                                          label: "Nome"
                                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(VCol, {
                                      cols: "12",
                                      md: "4"
                                    }, {
                                      default: withCtx(() => [
                                        withDirectives(createVNode(VTextField, {
                                          modelValue: state.doc_identificacao,
                                          "onUpdate:modelValue": ($event) => state.doc_identificacao = $event,
                                          label: "CPF"
                                        }, null, 8, ["modelValue", "onUpdate:modelValue"]), [
                                          [_directive_mask, "###.###.###-##"]
                                        ])
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }),
                                createVNode(VRow, null, {
                                  default: withCtx(() => [
                                    createVNode(VCol, {
                                      cols: "12",
                                      md: "4"
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(VAutocomplete, {
                                          modelValue: state.tabvalores_estadocivil_id,
                                          "onUpdate:modelValue": ($event) => state.tabvalores_estadocivil_id = $event,
                                          items: unref(estadoCivilItemsData),
                                          "item-title": "descricao",
                                          "item-value": "id",
                                          label: "Estado Civil"
                                        }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(VCol, {
                                      cols: "12",
                                      md: "4"
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(VTextField, {
                                          modelValue: state.profissao,
                                          "onUpdate:modelValue": ($event) => state.profissao = $event,
                                          label: "Profiss\xE3o"
                                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(VCol, {
                                      cols: "12",
                                      md: "4"
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(VTextField, {
                                          modelValue: state.local_trabalho,
                                          "onUpdate:modelValue": ($event) => state.local_trabalho = $event,
                                          label: "Local de trabalho"
                                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }),
                                createVNode(VRow, null, {
                                  default: withCtx(() => [
                                    createVNode(VCol, {
                                      cols: "12",
                                      md: "4"
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(VTextField, {
                                          modelValue: state.data_nascimento,
                                          "onUpdate:modelValue": ($event) => state.data_nascimento = $event,
                                          type: "date",
                                          "prepend-icon": "",
                                          label: "Data de nascimento"
                                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(VCol, {
                                      cols: "12",
                                      md: "4"
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(VAutocomplete, {
                                          modelValue: state.tabvalores_capacidadecivil_id,
                                          "onUpdate:modelValue": ($event) => state.tabvalores_capacidadecivil_id = $event,
                                          items: unref(capacidadeCivilItemsData),
                                          label: "Capacidade Civil",
                                          "item-title": "descricao",
                                          "item-value": "id"
                                        }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(VCol, {
                                      cols: "12",
                                      md: "4"
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(VAutocomplete, {
                                          modelValue: state.cidade_natural_id,
                                          "onUpdate:modelValue": ($event) => state.cidade_natural_id = $event,
                                          items: unref(cidadeNascimentoItemsData),
                                          label: "Cidade de nascimento",
                                          "item-title": "descricao",
                                          "item-value": "id"
                                        }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }),
                                createVNode(VRow, null, {
                                  default: withCtx(() => [
                                    createVNode(VCol, {
                                      cols: "12",
                                      md: "4"
                                    }, {
                                      default: withCtx(() => [
                                        withDirectives(createVNode(VTextField, {
                                          modelValue: state.cpf_pai,
                                          "onUpdate:modelValue": ($event) => state.cpf_pai = $event,
                                          modelModifiers: { date: true },
                                          label: "CPF do Pai"
                                        }, null, 8, ["modelValue", "onUpdate:modelValue"]), [
                                          [_directive_mask, "###.###.###-##"]
                                        ])
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(VCol, {
                                      cols: "12",
                                      md: "4"
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(VTextField, {
                                          modelValue: state.nome_pai,
                                          "onUpdate:modelValue": ($event) => state.nome_pai = $event,
                                          modelModifiers: { date: true },
                                          label: "Nome do Pai"
                                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }),
                                createVNode(VRow, null, {
                                  default: withCtx(() => [
                                    createVNode(VCol, {
                                      cols: "12",
                                      md: "4"
                                    }, {
                                      default: withCtx(() => [
                                        withDirectives(createVNode(VTextField, {
                                          modelValue: state.cpf_mae,
                                          "onUpdate:modelValue": ($event) => state.cpf_mae = $event,
                                          modelModifiers: { date: true },
                                          label: "CPF da M\xE3e"
                                        }, null, 8, ["modelValue", "onUpdate:modelValue"]), [
                                          [_directive_mask, "###.###.###-##"]
                                        ])
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(VCol, {
                                      cols: "12",
                                      md: "4"
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(VTextField, {
                                          modelValue: state.nome_mae,
                                          "onUpdate:modelValue": ($event) => state.nome_mae = $event,
                                          modelModifiers: { date: true },
                                          label: "Nome da M\xE3e"
                                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }),
                                createVNode(VRow, null, {
                                  default: withCtx(() => [
                                    createVNode(_component_NuxtLink, { to: "/pessoas/registros" }, {
                                      default: withCtx(() => [
                                        createVNode("img", {
                                          class: "btn-pointer",
                                          src: _imports_0,
                                          alt: "Sair"
                                        })
                                      ]),
                                      _: 1
                                    }),
                                    createVNode("img", {
                                      class: "btn-pointer",
                                      src: _imports_1,
                                      onClick: ($event) => onUpdate()
                                    }, null, 8, ["onClick"])
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
                          createVNode(VContainer, { class: "mt-5" }, {
                            default: withCtx(() => [
                              createVNode(VRow, null, {
                                default: withCtx(() => [
                                  createVNode(VCol, {
                                    cols: "12",
                                    md: "8"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(VTextField, {
                                        modelValue: state.nome,
                                        "onUpdate:modelValue": ($event) => state.nome = $event,
                                        label: "Nome"
                                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(VCol, {
                                    cols: "12",
                                    md: "4"
                                  }, {
                                    default: withCtx(() => [
                                      withDirectives(createVNode(VTextField, {
                                        modelValue: state.doc_identificacao,
                                        "onUpdate:modelValue": ($event) => state.doc_identificacao = $event,
                                        label: "CPF"
                                      }, null, 8, ["modelValue", "onUpdate:modelValue"]), [
                                        [_directive_mask, "###.###.###-##"]
                                      ])
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }),
                              createVNode(VRow, null, {
                                default: withCtx(() => [
                                  createVNode(VCol, {
                                    cols: "12",
                                    md: "4"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(VAutocomplete, {
                                        modelValue: state.tabvalores_estadocivil_id,
                                        "onUpdate:modelValue": ($event) => state.tabvalores_estadocivil_id = $event,
                                        items: unref(estadoCivilItemsData),
                                        "item-title": "descricao",
                                        "item-value": "id",
                                        label: "Estado Civil"
                                      }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(VCol, {
                                    cols: "12",
                                    md: "4"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(VTextField, {
                                        modelValue: state.profissao,
                                        "onUpdate:modelValue": ($event) => state.profissao = $event,
                                        label: "Profiss\xE3o"
                                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(VCol, {
                                    cols: "12",
                                    md: "4"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(VTextField, {
                                        modelValue: state.local_trabalho,
                                        "onUpdate:modelValue": ($event) => state.local_trabalho = $event,
                                        label: "Local de trabalho"
                                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }),
                              createVNode(VRow, null, {
                                default: withCtx(() => [
                                  createVNode(VCol, {
                                    cols: "12",
                                    md: "4"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(VTextField, {
                                        modelValue: state.data_nascimento,
                                        "onUpdate:modelValue": ($event) => state.data_nascimento = $event,
                                        type: "date",
                                        "prepend-icon": "",
                                        label: "Data de nascimento"
                                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(VCol, {
                                    cols: "12",
                                    md: "4"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(VAutocomplete, {
                                        modelValue: state.tabvalores_capacidadecivil_id,
                                        "onUpdate:modelValue": ($event) => state.tabvalores_capacidadecivil_id = $event,
                                        items: unref(capacidadeCivilItemsData),
                                        label: "Capacidade Civil",
                                        "item-title": "descricao",
                                        "item-value": "id"
                                      }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(VCol, {
                                    cols: "12",
                                    md: "4"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(VAutocomplete, {
                                        modelValue: state.cidade_natural_id,
                                        "onUpdate:modelValue": ($event) => state.cidade_natural_id = $event,
                                        items: unref(cidadeNascimentoItemsData),
                                        label: "Cidade de nascimento",
                                        "item-title": "descricao",
                                        "item-value": "id"
                                      }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }),
                              createVNode(VRow, null, {
                                default: withCtx(() => [
                                  createVNode(VCol, {
                                    cols: "12",
                                    md: "4"
                                  }, {
                                    default: withCtx(() => [
                                      withDirectives(createVNode(VTextField, {
                                        modelValue: state.cpf_pai,
                                        "onUpdate:modelValue": ($event) => state.cpf_pai = $event,
                                        modelModifiers: { date: true },
                                        label: "CPF do Pai"
                                      }, null, 8, ["modelValue", "onUpdate:modelValue"]), [
                                        [_directive_mask, "###.###.###-##"]
                                      ])
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(VCol, {
                                    cols: "12",
                                    md: "4"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(VTextField, {
                                        modelValue: state.nome_pai,
                                        "onUpdate:modelValue": ($event) => state.nome_pai = $event,
                                        modelModifiers: { date: true },
                                        label: "Nome do Pai"
                                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }),
                              createVNode(VRow, null, {
                                default: withCtx(() => [
                                  createVNode(VCol, {
                                    cols: "12",
                                    md: "4"
                                  }, {
                                    default: withCtx(() => [
                                      withDirectives(createVNode(VTextField, {
                                        modelValue: state.cpf_mae,
                                        "onUpdate:modelValue": ($event) => state.cpf_mae = $event,
                                        modelModifiers: { date: true },
                                        label: "CPF da M\xE3e"
                                      }, null, 8, ["modelValue", "onUpdate:modelValue"]), [
                                        [_directive_mask, "###.###.###-##"]
                                      ])
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(VCol, {
                                    cols: "12",
                                    md: "4"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(VTextField, {
                                        modelValue: state.nome_mae,
                                        "onUpdate:modelValue": ($event) => state.nome_mae = $event,
                                        modelModifiers: { date: true },
                                        label: "Nome da M\xE3e"
                                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }),
                              createVNode(VRow, null, {
                                default: withCtx(() => [
                                  createVNode(_component_NuxtLink, { to: "/pessoas/registros" }, {
                                    default: withCtx(() => [
                                      createVNode("img", {
                                        class: "btn-pointer",
                                        src: _imports_0,
                                        alt: "Sair"
                                      })
                                    ]),
                                    _: 1
                                  }),
                                  createVNode("img", {
                                    class: "btn-pointer",
                                    src: _imports_1,
                                    onClick: ($event) => onUpdate()
                                  }, null, 8, ["onClick"])
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
                  _push3(ssrRenderComponent(VTabsWindowItem, { value: "documento" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_Documentos, null, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_Documentos)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VTabsWindowItem, { value: "endereco" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_Endereco, null, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_Endereco)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VTabsWindowItem, { value: "biometria" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VContainer, { class: "mt-5" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_Biometria, null, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_Biometria)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VContainer, { class: "mt-5" }, {
                            default: withCtx(() => [
                              createVNode(_component_Biometria)
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VTabsWindowItem, { value: "restricao" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_Restricoes, null, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_Restricoes)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VTabsWindowItem, { value: "dados" }, {
                      default: withCtx(() => [
                        createVNode(VContainer, { class: "mt-5" }, {
                          default: withCtx(() => [
                            createVNode(VRow, null, {
                              default: withCtx(() => [
                                createVNode(VCol, {
                                  cols: "12",
                                  md: "8"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(VTextField, {
                                      modelValue: state.nome,
                                      "onUpdate:modelValue": ($event) => state.nome = $event,
                                      label: "Nome"
                                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                  ]),
                                  _: 1
                                }),
                                createVNode(VCol, {
                                  cols: "12",
                                  md: "4"
                                }, {
                                  default: withCtx(() => [
                                    withDirectives(createVNode(VTextField, {
                                      modelValue: state.doc_identificacao,
                                      "onUpdate:modelValue": ($event) => state.doc_identificacao = $event,
                                      label: "CPF"
                                    }, null, 8, ["modelValue", "onUpdate:modelValue"]), [
                                      [_directive_mask, "###.###.###-##"]
                                    ])
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }),
                            createVNode(VRow, null, {
                              default: withCtx(() => [
                                createVNode(VCol, {
                                  cols: "12",
                                  md: "4"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(VAutocomplete, {
                                      modelValue: state.tabvalores_estadocivil_id,
                                      "onUpdate:modelValue": ($event) => state.tabvalores_estadocivil_id = $event,
                                      items: unref(estadoCivilItemsData),
                                      "item-title": "descricao",
                                      "item-value": "id",
                                      label: "Estado Civil"
                                    }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                                  ]),
                                  _: 1
                                }),
                                createVNode(VCol, {
                                  cols: "12",
                                  md: "4"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(VTextField, {
                                      modelValue: state.profissao,
                                      "onUpdate:modelValue": ($event) => state.profissao = $event,
                                      label: "Profiss\xE3o"
                                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                  ]),
                                  _: 1
                                }),
                                createVNode(VCol, {
                                  cols: "12",
                                  md: "4"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(VTextField, {
                                      modelValue: state.local_trabalho,
                                      "onUpdate:modelValue": ($event) => state.local_trabalho = $event,
                                      label: "Local de trabalho"
                                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }),
                            createVNode(VRow, null, {
                              default: withCtx(() => [
                                createVNode(VCol, {
                                  cols: "12",
                                  md: "4"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(VTextField, {
                                      modelValue: state.data_nascimento,
                                      "onUpdate:modelValue": ($event) => state.data_nascimento = $event,
                                      type: "date",
                                      "prepend-icon": "",
                                      label: "Data de nascimento"
                                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                  ]),
                                  _: 1
                                }),
                                createVNode(VCol, {
                                  cols: "12",
                                  md: "4"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(VAutocomplete, {
                                      modelValue: state.tabvalores_capacidadecivil_id,
                                      "onUpdate:modelValue": ($event) => state.tabvalores_capacidadecivil_id = $event,
                                      items: unref(capacidadeCivilItemsData),
                                      label: "Capacidade Civil",
                                      "item-title": "descricao",
                                      "item-value": "id"
                                    }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                                  ]),
                                  _: 1
                                }),
                                createVNode(VCol, {
                                  cols: "12",
                                  md: "4"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(VAutocomplete, {
                                      modelValue: state.cidade_natural_id,
                                      "onUpdate:modelValue": ($event) => state.cidade_natural_id = $event,
                                      items: unref(cidadeNascimentoItemsData),
                                      label: "Cidade de nascimento",
                                      "item-title": "descricao",
                                      "item-value": "id"
                                    }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }),
                            createVNode(VRow, null, {
                              default: withCtx(() => [
                                createVNode(VCol, {
                                  cols: "12",
                                  md: "4"
                                }, {
                                  default: withCtx(() => [
                                    withDirectives(createVNode(VTextField, {
                                      modelValue: state.cpf_pai,
                                      "onUpdate:modelValue": ($event) => state.cpf_pai = $event,
                                      modelModifiers: { date: true },
                                      label: "CPF do Pai"
                                    }, null, 8, ["modelValue", "onUpdate:modelValue"]), [
                                      [_directive_mask, "###.###.###-##"]
                                    ])
                                  ]),
                                  _: 1
                                }),
                                createVNode(VCol, {
                                  cols: "12",
                                  md: "4"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(VTextField, {
                                      modelValue: state.nome_pai,
                                      "onUpdate:modelValue": ($event) => state.nome_pai = $event,
                                      modelModifiers: { date: true },
                                      label: "Nome do Pai"
                                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }),
                            createVNode(VRow, null, {
                              default: withCtx(() => [
                                createVNode(VCol, {
                                  cols: "12",
                                  md: "4"
                                }, {
                                  default: withCtx(() => [
                                    withDirectives(createVNode(VTextField, {
                                      modelValue: state.cpf_mae,
                                      "onUpdate:modelValue": ($event) => state.cpf_mae = $event,
                                      modelModifiers: { date: true },
                                      label: "CPF da M\xE3e"
                                    }, null, 8, ["modelValue", "onUpdate:modelValue"]), [
                                      [_directive_mask, "###.###.###-##"]
                                    ])
                                  ]),
                                  _: 1
                                }),
                                createVNode(VCol, {
                                  cols: "12",
                                  md: "4"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(VTextField, {
                                      modelValue: state.nome_mae,
                                      "onUpdate:modelValue": ($event) => state.nome_mae = $event,
                                      modelModifiers: { date: true },
                                      label: "Nome da M\xE3e"
                                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }),
                            createVNode(VRow, null, {
                              default: withCtx(() => [
                                createVNode(_component_NuxtLink, { to: "/pessoas/registros" }, {
                                  default: withCtx(() => [
                                    createVNode("img", {
                                      class: "btn-pointer",
                                      src: _imports_0,
                                      alt: "Sair"
                                    })
                                  ]),
                                  _: 1
                                }),
                                createVNode("img", {
                                  class: "btn-pointer",
                                  src: _imports_1,
                                  onClick: ($event) => onUpdate()
                                }, null, 8, ["onClick"])
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(VTabsWindowItem, { value: "documento" }, {
                      default: withCtx(() => [
                        createVNode(_component_Documentos)
                      ]),
                      _: 1
                    }),
                    createVNode(VTabsWindowItem, { value: "endereco" }, {
                      default: withCtx(() => [
                        createVNode(_component_Endereco)
                      ]),
                      _: 1
                    }),
                    createVNode(VTabsWindowItem, { value: "biometria" }, {
                      default: withCtx(() => [
                        createVNode(VContainer, { class: "mt-5" }, {
                          default: withCtx(() => [
                            createVNode(_component_Biometria)
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(VTabsWindowItem, { value: "restricao" }, {
                      default: withCtx(() => [
                        createVNode(_component_Restricoes)
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
              createVNode("h1", { style: { "background-color": "#c8fcca", "color": "#429946", "padding": "10px 0px 0px 20px" } }, toDisplayString(unref(id) ? "Atualiza\xE7\xE3o de Pessoas" : "Cadastramento de Pessoas"), 1),
              createVNode("div", { style: { "background-color": "#c8fcca", "padding": "20px 0px 20px 20px" } }, [
                createVNode(VAutocomplete, {
                  modelValue: state.tipo_pessoa,
                  "onUpdate:modelValue": ($event) => state.tipo_pessoa = $event,
                  style: { "width": "200px" },
                  items: _ctx.pessoa_tipo,
                  label: "Tipo de pessoa",
                  "bg-color": "#F6F6F6",
                  disabled: ""
                }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
              ]),
              createVNode(VTabs, {
                modelValue: unref(tab),
                "onUpdate:modelValue": ($event) => isRef(tab) ? tab.value = $event : null,
                "bg-color": "#C8FCCA"
              }, {
                default: withCtx(() => [
                  createVNode(VTab, { value: "dados" }, {
                    default: withCtx(() => [
                      createTextVNode("Dados")
                    ]),
                    _: 1
                  }),
                  createVNode(VTab, { value: "documento" }, {
                    default: withCtx(() => [
                      createTextVNode("Documentos")
                    ]),
                    _: 1
                  }),
                  createVNode(VTab, { value: "endereco" }, {
                    default: withCtx(() => [
                      createTextVNode("Endere\xE7os")
                    ]),
                    _: 1
                  }),
                  createVNode(VTab, { value: "biometria" }, {
                    default: withCtx(() => [
                      createTextVNode("Biometria")
                    ]),
                    _: 1
                  }),
                  createVNode(VTab, { value: "restricao" }, {
                    default: withCtx(() => [
                      createTextVNode("Restri\xE7\xF5es")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["modelValue", "onUpdate:modelValue"]),
              createVNode(VTabsWindow, {
                modelValue: unref(tab),
                "onUpdate:modelValue": ($event) => isRef(tab) ? tab.value = $event : null
              }, {
                default: withCtx(() => [
                  createVNode(VTabsWindowItem, { value: "dados" }, {
                    default: withCtx(() => [
                      createVNode(VContainer, { class: "mt-5" }, {
                        default: withCtx(() => [
                          createVNode(VRow, null, {
                            default: withCtx(() => [
                              createVNode(VCol, {
                                cols: "12",
                                md: "8"
                              }, {
                                default: withCtx(() => [
                                  createVNode(VTextField, {
                                    modelValue: state.nome,
                                    "onUpdate:modelValue": ($event) => state.nome = $event,
                                    label: "Nome"
                                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                ]),
                                _: 1
                              }),
                              createVNode(VCol, {
                                cols: "12",
                                md: "4"
                              }, {
                                default: withCtx(() => [
                                  withDirectives(createVNode(VTextField, {
                                    modelValue: state.doc_identificacao,
                                    "onUpdate:modelValue": ($event) => state.doc_identificacao = $event,
                                    label: "CPF"
                                  }, null, 8, ["modelValue", "onUpdate:modelValue"]), [
                                    [_directive_mask, "###.###.###-##"]
                                  ])
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(VRow, null, {
                            default: withCtx(() => [
                              createVNode(VCol, {
                                cols: "12",
                                md: "4"
                              }, {
                                default: withCtx(() => [
                                  createVNode(VAutocomplete, {
                                    modelValue: state.tabvalores_estadocivil_id,
                                    "onUpdate:modelValue": ($event) => state.tabvalores_estadocivil_id = $event,
                                    items: unref(estadoCivilItemsData),
                                    "item-title": "descricao",
                                    "item-value": "id",
                                    label: "Estado Civil"
                                  }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                                ]),
                                _: 1
                              }),
                              createVNode(VCol, {
                                cols: "12",
                                md: "4"
                              }, {
                                default: withCtx(() => [
                                  createVNode(VTextField, {
                                    modelValue: state.profissao,
                                    "onUpdate:modelValue": ($event) => state.profissao = $event,
                                    label: "Profiss\xE3o"
                                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                ]),
                                _: 1
                              }),
                              createVNode(VCol, {
                                cols: "12",
                                md: "4"
                              }, {
                                default: withCtx(() => [
                                  createVNode(VTextField, {
                                    modelValue: state.local_trabalho,
                                    "onUpdate:modelValue": ($event) => state.local_trabalho = $event,
                                    label: "Local de trabalho"
                                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(VRow, null, {
                            default: withCtx(() => [
                              createVNode(VCol, {
                                cols: "12",
                                md: "4"
                              }, {
                                default: withCtx(() => [
                                  createVNode(VTextField, {
                                    modelValue: state.data_nascimento,
                                    "onUpdate:modelValue": ($event) => state.data_nascimento = $event,
                                    type: "date",
                                    "prepend-icon": "",
                                    label: "Data de nascimento"
                                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                ]),
                                _: 1
                              }),
                              createVNode(VCol, {
                                cols: "12",
                                md: "4"
                              }, {
                                default: withCtx(() => [
                                  createVNode(VAutocomplete, {
                                    modelValue: state.tabvalores_capacidadecivil_id,
                                    "onUpdate:modelValue": ($event) => state.tabvalores_capacidadecivil_id = $event,
                                    items: unref(capacidadeCivilItemsData),
                                    label: "Capacidade Civil",
                                    "item-title": "descricao",
                                    "item-value": "id"
                                  }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                                ]),
                                _: 1
                              }),
                              createVNode(VCol, {
                                cols: "12",
                                md: "4"
                              }, {
                                default: withCtx(() => [
                                  createVNode(VAutocomplete, {
                                    modelValue: state.cidade_natural_id,
                                    "onUpdate:modelValue": ($event) => state.cidade_natural_id = $event,
                                    items: unref(cidadeNascimentoItemsData),
                                    label: "Cidade de nascimento",
                                    "item-title": "descricao",
                                    "item-value": "id"
                                  }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(VRow, null, {
                            default: withCtx(() => [
                              createVNode(VCol, {
                                cols: "12",
                                md: "4"
                              }, {
                                default: withCtx(() => [
                                  withDirectives(createVNode(VTextField, {
                                    modelValue: state.cpf_pai,
                                    "onUpdate:modelValue": ($event) => state.cpf_pai = $event,
                                    modelModifiers: { date: true },
                                    label: "CPF do Pai"
                                  }, null, 8, ["modelValue", "onUpdate:modelValue"]), [
                                    [_directive_mask, "###.###.###-##"]
                                  ])
                                ]),
                                _: 1
                              }),
                              createVNode(VCol, {
                                cols: "12",
                                md: "4"
                              }, {
                                default: withCtx(() => [
                                  createVNode(VTextField, {
                                    modelValue: state.nome_pai,
                                    "onUpdate:modelValue": ($event) => state.nome_pai = $event,
                                    modelModifiers: { date: true },
                                    label: "Nome do Pai"
                                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(VRow, null, {
                            default: withCtx(() => [
                              createVNode(VCol, {
                                cols: "12",
                                md: "4"
                              }, {
                                default: withCtx(() => [
                                  withDirectives(createVNode(VTextField, {
                                    modelValue: state.cpf_mae,
                                    "onUpdate:modelValue": ($event) => state.cpf_mae = $event,
                                    modelModifiers: { date: true },
                                    label: "CPF da M\xE3e"
                                  }, null, 8, ["modelValue", "onUpdate:modelValue"]), [
                                    [_directive_mask, "###.###.###-##"]
                                  ])
                                ]),
                                _: 1
                              }),
                              createVNode(VCol, {
                                cols: "12",
                                md: "4"
                              }, {
                                default: withCtx(() => [
                                  createVNode(VTextField, {
                                    modelValue: state.nome_mae,
                                    "onUpdate:modelValue": ($event) => state.nome_mae = $event,
                                    modelModifiers: { date: true },
                                    label: "Nome da M\xE3e"
                                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(VRow, null, {
                            default: withCtx(() => [
                              createVNode(_component_NuxtLink, { to: "/pessoas/registros" }, {
                                default: withCtx(() => [
                                  createVNode("img", {
                                    class: "btn-pointer",
                                    src: _imports_0,
                                    alt: "Sair"
                                  })
                                ]),
                                _: 1
                              }),
                              createVNode("img", {
                                class: "btn-pointer",
                                src: _imports_1,
                                onClick: ($event) => onUpdate()
                              }, null, 8, ["onClick"])
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode(VTabsWindowItem, { value: "documento" }, {
                    default: withCtx(() => [
                      createVNode(_component_Documentos)
                    ]),
                    _: 1
                  }),
                  createVNode(VTabsWindowItem, { value: "endereco" }, {
                    default: withCtx(() => [
                      createVNode(_component_Endereco)
                    ]),
                    _: 1
                  }),
                  createVNode(VTabsWindowItem, { value: "biometria" }, {
                    default: withCtx(() => [
                      createVNode(VContainer, { class: "mt-5" }, {
                        default: withCtx(() => [
                          createVNode(_component_Biometria)
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode(VTabsWindowItem, { value: "restricao" }, {
                    default: withCtx(() => [
                      createVNode(_component_Restricoes)
                    ]),
                    _: 1
                  })
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/pessoas/atualizar/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _id_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-5dd60f64"]]);

export { _id_ as default };
//# sourceMappingURL=_id_-Bw9YubIa.mjs.map
