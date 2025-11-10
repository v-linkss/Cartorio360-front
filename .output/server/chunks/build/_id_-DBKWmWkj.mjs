import { _ as __nuxt_component_0 } from './nuxt-link-TpvcaGEw.mjs';
import { b as _sfc_main$b, c as _sfc_main$a, d as _sfc_main$9, e as _sfc_main$8, f as _sfc_main$2, g as __nuxt_component_7 } from './RegistroPessoas-CpTfcpUs.mjs';
import { _ as _sfc_main$1 } from './DadosEstrangeira-1HmmJQsE.mjs';
import { ref, reactive, resolveDirective, withCtx, unref, createVNode, toDisplayString, isRef, createTextVNode, openBlock, createBlock, createCommentVNode, mergeProps, withDirectives, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderStyle, ssrInterpolate, ssrGetDirectiveProps } from 'vue/server-renderer';
import { _ as _export_sfc, u as useRouter$1, b as useNuxtApp, g as useRoute$1, e as useCookie, b8 as VProgressCircular, f as VTextField, V as VBtn, c as useRuntimeConfig } from './server.mjs';
import { f as fetchWithToken } from './fetchWithToken-CCGIQo0b.mjs';
import { a as formatToISO } from './formatDate-DflkuJ_V.mjs';
import { u as useFetch } from './fetch-uf6n1sXR.mjs';
import { V as VContainer } from './VContainer-CUysD4sO.mjs';
import { V as VCard } from './VCard-Dbn6yWsi.mjs';
import { V as VRow } from './VRow-Bqz0CuIN.mjs';
import { V as VAutocomplete } from './VAutocomplete-B9VRQqKl.mjs';
import { V as VTabs, a as VTab, d as VTabsWindow, e as VTabsWindowItem } from './VTabs-CQrE9VMQ.mjs';
import { V as VCol } from './VCol-BT4RzX0Q.mjs';
import { e as VSelect } from './filter-BaqCkjdl.mjs';
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
import '@vuelidate/core';
import '@vuelidate/validators';
import './asyncData-B8plM1p3.mjs';
import './novo-CWU3oYa5.mjs';
import './editar-BcGPsVK2.mjs';
import './excluido-D7FHZla7.mjs';
import './VDataTable-BqxaRhj7.mjs';
import './VDivider-BxKHtM2e.mjs';
import './VDialog-BVe31KMa.mjs';
import 'utif';
import './FichaCard-BDq7cEeS.mjs';
import './visualizar-BoZ30DMV.mjs';
import 'pinia';
import 'vue-router';
import 'vue3-toastify';
import 'vue-the-mask';
import './VAvatar-CfQAG9re.mjs';
import './VImg-CtUi4yCS.mjs';
import './VResponsive-BwPb2GHE.mjs';
import './VList-w5fWkTAt.mjs';
import './VSelectionControl-DI6QefPE.mjs';

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
    const updatePessoa = `${config.public.auth}/service/gerencia/updatePessoa`;
    `${config.public.auth}/service/gerencia/listarEstadoCivil`;
    `${config.public.auth}/service/gerencia/listarCapacidadeCivil`;
    `${config.public.auth}/service/gerencia/listarCidades`;
    `${config.public.auth}/service/gerencia/getPessoaById`;
    `${config.public.auth}/service/gerencia/listarSexo`;
    const routeValidaCpf = `${config.public.managemant}/validarCpf`;
    const estadoCivilItemsData = ref([]);
    const capacidadeCivilItemsData = ref([]);
    const cidadeNascimentoItemsData = ref([]);
    const sexoItemsData = ref([]);
    const loading = ref(true);
    const link_ficha = ref(null);
    const criacaoData = ref(null);
    let isValidatingCpf = false;
    const initialState = {
      nome: null,
      nome_pai: null,
      nome_mae: null,
      profissao: null,
      fone_celular: null,
      data_nascimento: null,
      doc_identificacao: null,
      cpf_pai: null,
      cpf_mae: null,
      tipo_pessoa: "FISICA",
      tabvalores_estadocivil_id: null,
      tabvalores_capacidadecivil_id: null,
      cidade_nascimento_id: null,
      tabvalores_sexo_id: null,
      cartorio_id: useCookie("user-data").value.cartorio_id,
      user_id: useCookie("user-data").value.usuario_id
    };
    const pessoa_tipo = [
      { label: "F\xCDSICA", value: "FISICA" },
      { label: "JUR\xCDDICA", value: "JURIDICA" },
      { label: "ESTRANGEIRA", value: "ESTRANGEIRA" }
    ];
    const state = reactive({
      ...initialState
    });
    const originalState = reactive({ ...initialState });
    function removeFormatting(value) {
      if (value) {
        return value.replace(/[.\-]/g, "");
      } else {
        value = null;
      }
    }
    function formatPayload(payload) {
      const formattedPayload = {};
      for (const key in payload) {
        switch (key) {
          case "doc_identificacao":
          case "cpf_pai":
          case "cpf_mae":
            formattedPayload[key] = removeFormatting(payload[key]);
            break;
          case "data_nascimento":
            formattedPayload[key] = formatToISO(payload[key]);
            break;
          case "fone_celular":
            formattedPayload[key] = payload[key] ? payload[key].replace(/[^0-9]/g, "") : null;
            break;
          default:
            formattedPayload[key] = payload[key] === "" ? null : payload[key];
            break;
        }
      }
      return formattedPayload;
    }
    async function onUpdate() {
      const payloadFormated = formatPayload(state);
      const editedFields = {};
      for (const key in payloadFormated) {
        if (payloadFormated[key] !== originalState[key]) {
          editedFields[key] = payloadFormated[key];
        }
      }
      const { status } = await fetchWithToken(`${updatePessoa}/${id}`, {
        method: "PUT",
        body: editedFields
      });
      if (status.value === "success") {
        $toast.success("Pessoa atualizada com sucesso!");
        router.push("/pessoas/lista");
      } else {
        $toast.error("Erro ao atualizar pessoa.");
      }
    }
    async function validarCpf(cpf) {
      const cpfFormated = removeFormatting(cpf);
      const cpfNoMask = removeFormatting(originalState.doc_identificacao);
      if (cpfFormated.length === 11 && !isValidatingCpf && cpfFormated !== cpfNoMask) {
        isValidatingCpf = true;
        const payloadFormated = {
          cpf: cpfFormated
        };
        try {
          const { data, error, status } = await useFetch(routeValidaCpf, {
            method: "POST",
            body: payloadFormated
          }, "$NdF8Uiv290");
          if (status.value === "error" && error.value.statusCode === 500) {
            $toast.error(" o CPF j\xE1 est\xE1 cadastrado.");
            return;
          }
          if (data.value.cpfValidation) {
            $toast.error("J\xE1 existe uma pessoa cadastrada com o CPF digitado.");
          }
        } catch (error) {
          console.error("Erro ao validar CPF:", error);
        } finally {
          isValidatingCpf = false;
        }
      }
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      const _component_DadosJuridica = _sfc_main$b;
      const _component_DadosEstrangeira = _sfc_main$1;
      const _component_Documentos = _sfc_main$a;
      const _component_PessoasCadastrosRepresentantes = _sfc_main$9;
      const _component_Endereco = _sfc_main$8;
      const _component_Biometria = _sfc_main$2;
      const _component_Restricoes = __nuxt_component_7;
      const _directive_mask = resolveDirective("mask");
      _push(ssrRenderComponent(VContainer, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VCard, { width: "1300" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VRow, { style: { "background-color": "#f5f2f2" } }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<h1 style="${ssrRenderStyle({ "color": "#525050", "padding": "10px 0px 0px 30px" })}" data-v-03351b8b${_scopeId3}>${ssrInterpolate(unref(id) ? "Atualiza\xE7\xE3o de Pessoas" : "Cadastramento de Pessoas")}</h1><h3 style="${ssrRenderStyle({ "color": "#525050", "padding": "25px 0px 0px 20px" })}" data-v-03351b8b${_scopeId3}> Cadastrado em ${ssrInterpolate(unref(criacaoData))}</h3>`);
                      } else {
                        return [
                          createVNode("h1", { style: { "color": "#525050", "padding": "10px 0px 0px 30px" } }, toDisplayString(unref(id) ? "Atualiza\xE7\xE3o de Pessoas" : "Cadastramento de Pessoas"), 1),
                          createVNode("h3", { style: { "color": "#525050", "padding": "25px 0px 0px 20px" } }, " Cadastrado em " + toDisplayString(unref(criacaoData)), 1)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<div style="${ssrRenderStyle({ "background-color": "#f5f2f2", "padding": "20px 0px 20px 20px" })}" data-v-03351b8b${_scopeId2}>`);
                  _push3(ssrRenderComponent(VAutocomplete, {
                    modelValue: unref(state).tipo_pessoa,
                    "onUpdate:modelValue": ($event) => unref(state).tipo_pessoa = $event,
                    style: { "width": "200px" },
                    items: pessoa_tipo,
                    "item-title": "label",
                    "item-value": "value",
                    label: "Tipo de pessoa",
                    "bg-color": "#F6F6F6",
                    disabled: ""
                  }, null, _parent3, _scopeId2));
                  _push3(`</div>`);
                  if (unref(loading)) {
                    _push3(`<div class="d-flex justify-center" data-v-03351b8b${_scopeId2}>`);
                    _push3(ssrRenderComponent(VProgressCircular, {
                      indeterminate: "",
                      class: "loading-spinner",
                      size: "64"
                    }, null, _parent3, _scopeId2));
                    _push3(`</div>`);
                  } else {
                    _push3(`<div data-v-03351b8b${_scopeId2}>`);
                    _push3(ssrRenderComponent(VTabs, {
                      modelValue: unref(tab),
                      "onUpdate:modelValue": ($event) => isRef(tab) ? tab.value = $event : null,
                      "bg-color": "#f5f2f2"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(VTab, { value: "dados" }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`Dados`);
                              } else {
                                return [
                                  createTextVNode("Dados")
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                          if (unref(state).tipo_pessoa === "FISICA" || unref(state).tipo_pessoa === "ESTRANGEIRA") {
                            _push4(ssrRenderComponent(VTab, { value: "documento" }, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(`Documentos`);
                                } else {
                                  return [
                                    createTextVNode("Documentos")
                                  ];
                                }
                              }),
                              _: 1
                            }, _parent4, _scopeId3));
                          } else {
                            _push4(`<!---->`);
                          }
                          if (unref(state).tipo_pessoa === "JURIDICA") {
                            _push4(ssrRenderComponent(VTab, { value: "representante" }, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(`Representantes`);
                                } else {
                                  return [
                                    createTextVNode("Representantes")
                                  ];
                                }
                              }),
                              _: 1
                            }, _parent4, _scopeId3));
                          } else {
                            _push4(`<!---->`);
                          }
                          _push4(ssrRenderComponent(VTab, { value: "endereco" }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`Endere\xE7os`);
                              } else {
                                return [
                                  createTextVNode("Endere\xE7os")
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                          if (unref(state).tipo_pessoa === "FISICA" || unref(state).tipo_pessoa === "ESTRANGEIRA") {
                            _push4(ssrRenderComponent(VTab, { value: "biometria" }, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(`Biometria`);
                                } else {
                                  return [
                                    createTextVNode("Biometria")
                                  ];
                                }
                              }),
                              _: 1
                            }, _parent4, _scopeId3));
                          } else {
                            _push4(`<!---->`);
                          }
                          _push4(ssrRenderComponent(VTab, { value: "restricao" }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`Restri\xE7\xF5es`);
                              } else {
                                return [
                                  createTextVNode("Restri\xE7\xF5es")
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(VTab, { value: "dados" }, {
                              default: withCtx(() => [
                                createTextVNode("Dados")
                              ]),
                              _: 1
                            }),
                            unref(state).tipo_pessoa === "FISICA" || unref(state).tipo_pessoa === "ESTRANGEIRA" ? (openBlock(), createBlock(VTab, {
                              key: 0,
                              value: "documento"
                            }, {
                              default: withCtx(() => [
                                createTextVNode("Documentos")
                              ]),
                              _: 1
                            })) : createCommentVNode("", true),
                            unref(state).tipo_pessoa === "JURIDICA" ? (openBlock(), createBlock(VTab, {
                              key: 1,
                              value: "representante"
                            }, {
                              default: withCtx(() => [
                                createTextVNode("Representantes")
                              ]),
                              _: 1
                            })) : createCommentVNode("", true),
                            createVNode(VTab, { value: "endereco" }, {
                              default: withCtx(() => [
                                createTextVNode("Endere\xE7os")
                              ]),
                              _: 1
                            }),
                            unref(state).tipo_pessoa === "FISICA" || unref(state).tipo_pessoa === "ESTRANGEIRA" ? (openBlock(), createBlock(VTab, {
                              key: 2,
                              value: "biometria"
                            }, {
                              default: withCtx(() => [
                                createTextVNode("Biometria")
                              ]),
                              _: 1
                            })) : createCommentVNode("", true),
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
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(VTabsWindow, {
                      modelValue: unref(tab),
                      "onUpdate:modelValue": ($event) => isRef(tab) ? tab.value = $event : null
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(VTabsWindowItem, { value: "dados" }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                if (unref(state).tipo_pessoa === "FISICA") {
                                  _push5(ssrRenderComponent(VContainer, null, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(ssrRenderComponent(VRow, null, {
                                          default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                            if (_push7) {
                                              _push7(ssrRenderComponent(VCol, {
                                                cols: "12",
                                                md: "4"
                                              }, {
                                                default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                  if (_push8) {
                                                    _push8(ssrRenderComponent(VTextField, mergeProps({
                                                      modelValue: unref(state).doc_identificacao,
                                                      "onUpdate:modelValue": ($event) => unref(state).doc_identificacao = $event,
                                                      label: "CPF",
                                                      onBlur: ($event) => validarCpf(unref(state).doc_identificacao)
                                                    }, ssrGetDirectiveProps(_ctx, _directive_mask, "###.###.###-##")), null, _parent8, _scopeId7));
                                                  } else {
                                                    return [
                                                      withDirectives(createVNode(VTextField, {
                                                        modelValue: unref(state).doc_identificacao,
                                                        "onUpdate:modelValue": ($event) => unref(state).doc_identificacao = $event,
                                                        label: "CPF",
                                                        onBlur: ($event) => validarCpf(unref(state).doc_identificacao)
                                                      }, null, 8, ["modelValue", "onUpdate:modelValue", "onBlur"]), [
                                                        [_directive_mask, "###.###.###-##"]
                                                      ])
                                                    ];
                                                  }
                                                }),
                                                _: 1
                                              }, _parent7, _scopeId6));
                                              _push7(ssrRenderComponent(VCol, {
                                                cols: "12",
                                                md: "6"
                                              }, {
                                                default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                  if (_push8) {
                                                    _push8(ssrRenderComponent(VTextField, {
                                                      modelValue: unref(state).nome,
                                                      "onUpdate:modelValue": ($event) => unref(state).nome = $event,
                                                      label: "Nome"
                                                    }, null, _parent8, _scopeId7));
                                                  } else {
                                                    return [
                                                      createVNode(VTextField, {
                                                        modelValue: unref(state).nome,
                                                        "onUpdate:modelValue": ($event) => unref(state).nome = $event,
                                                        label: "Nome"
                                                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                                    ];
                                                  }
                                                }),
                                                _: 1
                                              }, _parent7, _scopeId6));
                                              _push7(ssrRenderComponent(VCol, { md: "2" }, {
                                                default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                  if (_push8) {
                                                    _push8(ssrRenderComponent(VSelect, {
                                                      label: "Sexo",
                                                      modelValue: unref(state).tabvalores_sexo_id,
                                                      "onUpdate:modelValue": ($event) => unref(state).tabvalores_sexo_id = $event,
                                                      items: unref(sexoItemsData),
                                                      "item-title": "descricao",
                                                      "item-value": "id"
                                                    }, null, _parent8, _scopeId7));
                                                  } else {
                                                    return [
                                                      createVNode(VSelect, {
                                                        label: "Sexo",
                                                        modelValue: unref(state).tabvalores_sexo_id,
                                                        "onUpdate:modelValue": ($event) => unref(state).tabvalores_sexo_id = $event,
                                                        items: unref(sexoItemsData),
                                                        "item-title": "descricao",
                                                        "item-value": "id"
                                                      }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                                                    ];
                                                  }
                                                }),
                                                _: 1
                                              }, _parent7, _scopeId6));
                                            } else {
                                              return [
                                                createVNode(VCol, {
                                                  cols: "12",
                                                  md: "4"
                                                }, {
                                                  default: withCtx(() => [
                                                    withDirectives(createVNode(VTextField, {
                                                      modelValue: unref(state).doc_identificacao,
                                                      "onUpdate:modelValue": ($event) => unref(state).doc_identificacao = $event,
                                                      label: "CPF",
                                                      onBlur: ($event) => validarCpf(unref(state).doc_identificacao)
                                                    }, null, 8, ["modelValue", "onUpdate:modelValue", "onBlur"]), [
                                                      [_directive_mask, "###.###.###-##"]
                                                    ])
                                                  ]),
                                                  _: 1
                                                }),
                                                createVNode(VCol, {
                                                  cols: "12",
                                                  md: "6"
                                                }, {
                                                  default: withCtx(() => [
                                                    createVNode(VTextField, {
                                                      modelValue: unref(state).nome,
                                                      "onUpdate:modelValue": ($event) => unref(state).nome = $event,
                                                      label: "Nome"
                                                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                                  ]),
                                                  _: 1
                                                }),
                                                createVNode(VCol, { md: "2" }, {
                                                  default: withCtx(() => [
                                                    createVNode(VSelect, {
                                                      label: "Sexo",
                                                      modelValue: unref(state).tabvalores_sexo_id,
                                                      "onUpdate:modelValue": ($event) => unref(state).tabvalores_sexo_id = $event,
                                                      items: unref(sexoItemsData),
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
                                        }, _parent6, _scopeId5));
                                        _push6(ssrRenderComponent(VRow, null, {
                                          default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                            if (_push7) {
                                              _push7(ssrRenderComponent(VCol, {
                                                cols: "12",
                                                md: "4"
                                              }, {
                                                default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                  if (_push8) {
                                                    _push8(ssrRenderComponent(VAutocomplete, {
                                                      modelValue: unref(state).tabvalores_estadocivil_id,
                                                      "onUpdate:modelValue": ($event) => unref(state).tabvalores_estadocivil_id = $event,
                                                      items: unref(estadoCivilItemsData),
                                                      "item-title": "descricao",
                                                      "item-value": "id",
                                                      label: "Estado Civil"
                                                    }, null, _parent8, _scopeId7));
                                                  } else {
                                                    return [
                                                      createVNode(VAutocomplete, {
                                                        modelValue: unref(state).tabvalores_estadocivil_id,
                                                        "onUpdate:modelValue": ($event) => unref(state).tabvalores_estadocivil_id = $event,
                                                        items: unref(estadoCivilItemsData),
                                                        "item-title": "descricao",
                                                        "item-value": "id",
                                                        label: "Estado Civil"
                                                      }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                                                    ];
                                                  }
                                                }),
                                                _: 1
                                              }, _parent7, _scopeId6));
                                              _push7(ssrRenderComponent(VCol, {
                                                cols: "12",
                                                md: "4"
                                              }, {
                                                default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                  if (_push8) {
                                                    _push8(ssrRenderComponent(VTextField, {
                                                      modelValue: unref(state).profissao,
                                                      "onUpdate:modelValue": ($event) => unref(state).profissao = $event,
                                                      label: "Profiss\xE3o"
                                                    }, null, _parent8, _scopeId7));
                                                  } else {
                                                    return [
                                                      createVNode(VTextField, {
                                                        modelValue: unref(state).profissao,
                                                        "onUpdate:modelValue": ($event) => unref(state).profissao = $event,
                                                        label: "Profiss\xE3o"
                                                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                                    ];
                                                  }
                                                }),
                                                _: 1
                                              }, _parent7, _scopeId6));
                                              _push7(ssrRenderComponent(VCol, {
                                                cols: "12",
                                                md: "4"
                                              }, {
                                                default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                  if (_push8) {
                                                    _push8(ssrRenderComponent(VTextField, {
                                                      modelValue: unref(state).local_trabalho,
                                                      "onUpdate:modelValue": ($event) => unref(state).local_trabalho = $event,
                                                      label: "Local de trabalho"
                                                    }, null, _parent8, _scopeId7));
                                                  } else {
                                                    return [
                                                      createVNode(VTextField, {
                                                        modelValue: unref(state).local_trabalho,
                                                        "onUpdate:modelValue": ($event) => unref(state).local_trabalho = $event,
                                                        label: "Local de trabalho"
                                                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                                    ];
                                                  }
                                                }),
                                                _: 1
                                              }, _parent7, _scopeId6));
                                            } else {
                                              return [
                                                createVNode(VCol, {
                                                  cols: "12",
                                                  md: "4"
                                                }, {
                                                  default: withCtx(() => [
                                                    createVNode(VAutocomplete, {
                                                      modelValue: unref(state).tabvalores_estadocivil_id,
                                                      "onUpdate:modelValue": ($event) => unref(state).tabvalores_estadocivil_id = $event,
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
                                                      modelValue: unref(state).profissao,
                                                      "onUpdate:modelValue": ($event) => unref(state).profissao = $event,
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
                                                      modelValue: unref(state).local_trabalho,
                                                      "onUpdate:modelValue": ($event) => unref(state).local_trabalho = $event,
                                                      label: "Local de trabalho"
                                                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                                  ]),
                                                  _: 1
                                                })
                                              ];
                                            }
                                          }),
                                          _: 1
                                        }, _parent6, _scopeId5));
                                        _push6(ssrRenderComponent(VRow, null, {
                                          default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                            if (_push7) {
                                              _push7(ssrRenderComponent(VCol, {
                                                cols: "12",
                                                md: "2"
                                              }, {
                                                default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                  if (_push8) {
                                                    _push8(ssrRenderComponent(VTextField, mergeProps({
                                                      modelValue: unref(state).data_nascimento,
                                                      "onUpdate:modelValue": ($event) => unref(state).data_nascimento = $event,
                                                      label: "Data de nascimento",
                                                      placeholder: "dd/mm/yyyy"
                                                    }, ssrGetDirectiveProps(_ctx, _directive_mask, "##/##/####")), null, _parent8, _scopeId7));
                                                  } else {
                                                    return [
                                                      withDirectives(createVNode(VTextField, {
                                                        modelValue: unref(state).data_nascimento,
                                                        "onUpdate:modelValue": ($event) => unref(state).data_nascimento = $event,
                                                        label: "Data de nascimento",
                                                        placeholder: "dd/mm/yyyy"
                                                      }, null, 8, ["modelValue", "onUpdate:modelValue"]), [
                                                        [_directive_mask, "##/##/####"]
                                                      ])
                                                    ];
                                                  }
                                                }),
                                                _: 1
                                              }, _parent7, _scopeId6));
                                              _push7(ssrRenderComponent(VCol, {
                                                cols: "12",
                                                md: "2"
                                              }, {
                                                default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                  if (_push8) {
                                                    _push8(ssrRenderComponent(VTextField, mergeProps({
                                                      modelValue: unref(state).fone_celular,
                                                      "onUpdate:modelValue": ($event) => unref(state).fone_celular = $event,
                                                      label: "Celular",
                                                      placeholder: "'(99) 99999-9999'"
                                                    }, ssrGetDirectiveProps(_ctx, _directive_mask, "(##) #####-####")), null, _parent8, _scopeId7));
                                                  } else {
                                                    return [
                                                      withDirectives(createVNode(VTextField, {
                                                        modelValue: unref(state).fone_celular,
                                                        "onUpdate:modelValue": ($event) => unref(state).fone_celular = $event,
                                                        label: "Celular",
                                                        placeholder: "'(99) 99999-9999'"
                                                      }, null, 8, ["modelValue", "onUpdate:modelValue"]), [
                                                        [_directive_mask, "(##) #####-####"]
                                                      ])
                                                    ];
                                                  }
                                                }),
                                                _: 1
                                              }, _parent7, _scopeId6));
                                              _push7(ssrRenderComponent(VCol, {
                                                cols: "12",
                                                md: "4"
                                              }, {
                                                default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                  if (_push8) {
                                                    _push8(ssrRenderComponent(VAutocomplete, {
                                                      modelValue: unref(state).tabvalores_capacidadecivil_id,
                                                      "onUpdate:modelValue": ($event) => unref(state).tabvalores_capacidadecivil_id = $event,
                                                      items: unref(capacidadeCivilItemsData),
                                                      label: "Capacidade Civil",
                                                      "item-title": "descricao",
                                                      "item-value": "id"
                                                    }, null, _parent8, _scopeId7));
                                                  } else {
                                                    return [
                                                      createVNode(VAutocomplete, {
                                                        modelValue: unref(state).tabvalores_capacidadecivil_id,
                                                        "onUpdate:modelValue": ($event) => unref(state).tabvalores_capacidadecivil_id = $event,
                                                        items: unref(capacidadeCivilItemsData),
                                                        label: "Capacidade Civil",
                                                        "item-title": "descricao",
                                                        "item-value": "id"
                                                      }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                                                    ];
                                                  }
                                                }),
                                                _: 1
                                              }, _parent7, _scopeId6));
                                              _push7(ssrRenderComponent(VCol, {
                                                cols: "12",
                                                md: "4"
                                              }, {
                                                default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                  if (_push8) {
                                                    _push8(ssrRenderComponent(VAutocomplete, {
                                                      modelValue: unref(state).cidade_nascimento_id,
                                                      "onUpdate:modelValue": ($event) => unref(state).cidade_nascimento_id = $event,
                                                      items: unref(cidadeNascimentoItemsData),
                                                      label: "Cidade de nascimento",
                                                      "item-title": "descricao",
                                                      "item-value": "id"
                                                    }, null, _parent8, _scopeId7));
                                                  } else {
                                                    return [
                                                      createVNode(VAutocomplete, {
                                                        modelValue: unref(state).cidade_nascimento_id,
                                                        "onUpdate:modelValue": ($event) => unref(state).cidade_nascimento_id = $event,
                                                        items: unref(cidadeNascimentoItemsData),
                                                        label: "Cidade de nascimento",
                                                        "item-title": "descricao",
                                                        "item-value": "id"
                                                      }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                                                    ];
                                                  }
                                                }),
                                                _: 1
                                              }, _parent7, _scopeId6));
                                            } else {
                                              return [
                                                createVNode(VCol, {
                                                  cols: "12",
                                                  md: "2"
                                                }, {
                                                  default: withCtx(() => [
                                                    withDirectives(createVNode(VTextField, {
                                                      modelValue: unref(state).data_nascimento,
                                                      "onUpdate:modelValue": ($event) => unref(state).data_nascimento = $event,
                                                      label: "Data de nascimento",
                                                      placeholder: "dd/mm/yyyy"
                                                    }, null, 8, ["modelValue", "onUpdate:modelValue"]), [
                                                      [_directive_mask, "##/##/####"]
                                                    ])
                                                  ]),
                                                  _: 1
                                                }),
                                                createVNode(VCol, {
                                                  cols: "12",
                                                  md: "2"
                                                }, {
                                                  default: withCtx(() => [
                                                    withDirectives(createVNode(VTextField, {
                                                      modelValue: unref(state).fone_celular,
                                                      "onUpdate:modelValue": ($event) => unref(state).fone_celular = $event,
                                                      label: "Celular",
                                                      placeholder: "'(99) 99999-9999'"
                                                    }, null, 8, ["modelValue", "onUpdate:modelValue"]), [
                                                      [_directive_mask, "(##) #####-####"]
                                                    ])
                                                  ]),
                                                  _: 1
                                                }),
                                                createVNode(VCol, {
                                                  cols: "12",
                                                  md: "4"
                                                }, {
                                                  default: withCtx(() => [
                                                    createVNode(VAutocomplete, {
                                                      modelValue: unref(state).tabvalores_capacidadecivil_id,
                                                      "onUpdate:modelValue": ($event) => unref(state).tabvalores_capacidadecivil_id = $event,
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
                                                      modelValue: unref(state).cidade_nascimento_id,
                                                      "onUpdate:modelValue": ($event) => unref(state).cidade_nascimento_id = $event,
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
                                        }, _parent6, _scopeId5));
                                        _push6(ssrRenderComponent(VRow, null, {
                                          default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                            if (_push7) {
                                              _push7(ssrRenderComponent(VCol, {
                                                cols: "12",
                                                md: "4"
                                              }, {
                                                default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                  if (_push8) {
                                                    _push8(ssrRenderComponent(VTextField, mergeProps({
                                                      modelValue: unref(state).cpf_pai,
                                                      "onUpdate:modelValue": ($event) => unref(state).cpf_pai = $event,
                                                      modelModifiers: { date: true },
                                                      label: "CPF do Pai"
                                                    }, ssrGetDirectiveProps(_ctx, _directive_mask, "###.###.###-##")), null, _parent8, _scopeId7));
                                                  } else {
                                                    return [
                                                      withDirectives(createVNode(VTextField, {
                                                        modelValue: unref(state).cpf_pai,
                                                        "onUpdate:modelValue": ($event) => unref(state).cpf_pai = $event,
                                                        modelModifiers: { date: true },
                                                        label: "CPF do Pai"
                                                      }, null, 8, ["modelValue", "onUpdate:modelValue"]), [
                                                        [_directive_mask, "###.###.###-##"]
                                                      ])
                                                    ];
                                                  }
                                                }),
                                                _: 1
                                              }, _parent7, _scopeId6));
                                              _push7(ssrRenderComponent(VCol, {
                                                cols: "12",
                                                md: "4"
                                              }, {
                                                default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                  if (_push8) {
                                                    _push8(ssrRenderComponent(VTextField, {
                                                      modelValue: unref(state).nome_pai,
                                                      "onUpdate:modelValue": ($event) => unref(state).nome_pai = $event,
                                                      modelModifiers: { date: true },
                                                      label: "Nome do Pai"
                                                    }, null, _parent8, _scopeId7));
                                                  } else {
                                                    return [
                                                      createVNode(VTextField, {
                                                        modelValue: unref(state).nome_pai,
                                                        "onUpdate:modelValue": ($event) => unref(state).nome_pai = $event,
                                                        modelModifiers: { date: true },
                                                        label: "Nome do Pai"
                                                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                                    ];
                                                  }
                                                }),
                                                _: 1
                                              }, _parent7, _scopeId6));
                                            } else {
                                              return [
                                                createVNode(VCol, {
                                                  cols: "12",
                                                  md: "4"
                                                }, {
                                                  default: withCtx(() => [
                                                    withDirectives(createVNode(VTextField, {
                                                      modelValue: unref(state).cpf_pai,
                                                      "onUpdate:modelValue": ($event) => unref(state).cpf_pai = $event,
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
                                                      modelValue: unref(state).nome_pai,
                                                      "onUpdate:modelValue": ($event) => unref(state).nome_pai = $event,
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
                                        }, _parent6, _scopeId5));
                                        _push6(ssrRenderComponent(VRow, null, {
                                          default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                            if (_push7) {
                                              _push7(ssrRenderComponent(VCol, {
                                                cols: "12",
                                                md: "4"
                                              }, {
                                                default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                  if (_push8) {
                                                    _push8(ssrRenderComponent(VTextField, mergeProps({
                                                      modelValue: unref(state).cpf_mae,
                                                      "onUpdate:modelValue": ($event) => unref(state).cpf_mae = $event,
                                                      modelModifiers: { date: true },
                                                      label: "CPF da M\xE3e"
                                                    }, ssrGetDirectiveProps(_ctx, _directive_mask, "###.###.###-##")), null, _parent8, _scopeId7));
                                                  } else {
                                                    return [
                                                      withDirectives(createVNode(VTextField, {
                                                        modelValue: unref(state).cpf_mae,
                                                        "onUpdate:modelValue": ($event) => unref(state).cpf_mae = $event,
                                                        modelModifiers: { date: true },
                                                        label: "CPF da M\xE3e"
                                                      }, null, 8, ["modelValue", "onUpdate:modelValue"]), [
                                                        [_directive_mask, "###.###.###-##"]
                                                      ])
                                                    ];
                                                  }
                                                }),
                                                _: 1
                                              }, _parent7, _scopeId6));
                                              _push7(ssrRenderComponent(VCol, {
                                                cols: "12",
                                                md: "4"
                                              }, {
                                                default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                  if (_push8) {
                                                    _push8(ssrRenderComponent(VTextField, {
                                                      modelValue: unref(state).nome_mae,
                                                      "onUpdate:modelValue": ($event) => unref(state).nome_mae = $event,
                                                      modelModifiers: { date: true },
                                                      label: "Nome da M\xE3e"
                                                    }, null, _parent8, _scopeId7));
                                                  } else {
                                                    return [
                                                      createVNode(VTextField, {
                                                        modelValue: unref(state).nome_mae,
                                                        "onUpdate:modelValue": ($event) => unref(state).nome_mae = $event,
                                                        modelModifiers: { date: true },
                                                        label: "Nome da M\xE3e"
                                                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                                    ];
                                                  }
                                                }),
                                                _: 1
                                              }, _parent7, _scopeId6));
                                            } else {
                                              return [
                                                createVNode(VCol, {
                                                  cols: "12",
                                                  md: "4"
                                                }, {
                                                  default: withCtx(() => [
                                                    withDirectives(createVNode(VTextField, {
                                                      modelValue: unref(state).cpf_mae,
                                                      "onUpdate:modelValue": ($event) => unref(state).cpf_mae = $event,
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
                                                      modelValue: unref(state).nome_mae,
                                                      "onUpdate:modelValue": ($event) => unref(state).nome_mae = $event,
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
                                        }, _parent6, _scopeId5));
                                        _push6(ssrRenderComponent(VRow, { class: "mb-3" }, {
                                          default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                            if (_push7) {
                                              _push7(ssrRenderComponent(_component_NuxtLink, { to: "/pessoas/lista" }, {
                                                default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                  if (_push8) {
                                                    _push8(ssrRenderComponent(VBtn, {
                                                      size: "large",
                                                      color: "red"
                                                    }, {
                                                      default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                        if (_push9) {
                                                          _push9(`Voltar`);
                                                        } else {
                                                          return [
                                                            createTextVNode("Voltar")
                                                          ];
                                                        }
                                                      }),
                                                      _: 1
                                                    }, _parent8, _scopeId7));
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
                                              }, _parent7, _scopeId6));
                                              _push7(ssrRenderComponent(VBtn, {
                                                onClick: ($event) => onUpdate(),
                                                class: "ml-4",
                                                size: "large",
                                                color: "green"
                                              }, {
                                                default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                  if (_push8) {
                                                    _push8(`Salvar`);
                                                  } else {
                                                    return [
                                                      createTextVNode("Salvar")
                                                    ];
                                                  }
                                                }),
                                                _: 1
                                              }, _parent7, _scopeId6));
                                            } else {
                                              return [
                                                createVNode(_component_NuxtLink, { to: "/pessoas/lista" }, {
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
                                                }),
                                                createVNode(VBtn, {
                                                  onClick: ($event) => onUpdate(),
                                                  class: "ml-4",
                                                  size: "large",
                                                  color: "green"
                                                }, {
                                                  default: withCtx(() => [
                                                    createTextVNode("Salvar")
                                                  ]),
                                                  _: 1
                                                }, 8, ["onClick"])
                                              ];
                                            }
                                          }),
                                          _: 1
                                        }, _parent6, _scopeId5));
                                      } else {
                                        return [
                                          createVNode(VRow, null, {
                                            default: withCtx(() => [
                                              createVNode(VCol, {
                                                cols: "12",
                                                md: "4"
                                              }, {
                                                default: withCtx(() => [
                                                  withDirectives(createVNode(VTextField, {
                                                    modelValue: unref(state).doc_identificacao,
                                                    "onUpdate:modelValue": ($event) => unref(state).doc_identificacao = $event,
                                                    label: "CPF",
                                                    onBlur: ($event) => validarCpf(unref(state).doc_identificacao)
                                                  }, null, 8, ["modelValue", "onUpdate:modelValue", "onBlur"]), [
                                                    [_directive_mask, "###.###.###-##"]
                                                  ])
                                                ]),
                                                _: 1
                                              }),
                                              createVNode(VCol, {
                                                cols: "12",
                                                md: "6"
                                              }, {
                                                default: withCtx(() => [
                                                  createVNode(VTextField, {
                                                    modelValue: unref(state).nome,
                                                    "onUpdate:modelValue": ($event) => unref(state).nome = $event,
                                                    label: "Nome"
                                                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                                ]),
                                                _: 1
                                              }),
                                              createVNode(VCol, { md: "2" }, {
                                                default: withCtx(() => [
                                                  createVNode(VSelect, {
                                                    label: "Sexo",
                                                    modelValue: unref(state).tabvalores_sexo_id,
                                                    "onUpdate:modelValue": ($event) => unref(state).tabvalores_sexo_id = $event,
                                                    items: unref(sexoItemsData),
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
                                                  createVNode(VAutocomplete, {
                                                    modelValue: unref(state).tabvalores_estadocivil_id,
                                                    "onUpdate:modelValue": ($event) => unref(state).tabvalores_estadocivil_id = $event,
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
                                                    modelValue: unref(state).profissao,
                                                    "onUpdate:modelValue": ($event) => unref(state).profissao = $event,
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
                                                    modelValue: unref(state).local_trabalho,
                                                    "onUpdate:modelValue": ($event) => unref(state).local_trabalho = $event,
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
                                                md: "2"
                                              }, {
                                                default: withCtx(() => [
                                                  withDirectives(createVNode(VTextField, {
                                                    modelValue: unref(state).data_nascimento,
                                                    "onUpdate:modelValue": ($event) => unref(state).data_nascimento = $event,
                                                    label: "Data de nascimento",
                                                    placeholder: "dd/mm/yyyy"
                                                  }, null, 8, ["modelValue", "onUpdate:modelValue"]), [
                                                    [_directive_mask, "##/##/####"]
                                                  ])
                                                ]),
                                                _: 1
                                              }),
                                              createVNode(VCol, {
                                                cols: "12",
                                                md: "2"
                                              }, {
                                                default: withCtx(() => [
                                                  withDirectives(createVNode(VTextField, {
                                                    modelValue: unref(state).fone_celular,
                                                    "onUpdate:modelValue": ($event) => unref(state).fone_celular = $event,
                                                    label: "Celular",
                                                    placeholder: "'(99) 99999-9999'"
                                                  }, null, 8, ["modelValue", "onUpdate:modelValue"]), [
                                                    [_directive_mask, "(##) #####-####"]
                                                  ])
                                                ]),
                                                _: 1
                                              }),
                                              createVNode(VCol, {
                                                cols: "12",
                                                md: "4"
                                              }, {
                                                default: withCtx(() => [
                                                  createVNode(VAutocomplete, {
                                                    modelValue: unref(state).tabvalores_capacidadecivil_id,
                                                    "onUpdate:modelValue": ($event) => unref(state).tabvalores_capacidadecivil_id = $event,
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
                                                    modelValue: unref(state).cidade_nascimento_id,
                                                    "onUpdate:modelValue": ($event) => unref(state).cidade_nascimento_id = $event,
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
                                                    modelValue: unref(state).cpf_pai,
                                                    "onUpdate:modelValue": ($event) => unref(state).cpf_pai = $event,
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
                                                    modelValue: unref(state).nome_pai,
                                                    "onUpdate:modelValue": ($event) => unref(state).nome_pai = $event,
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
                                                    modelValue: unref(state).cpf_mae,
                                                    "onUpdate:modelValue": ($event) => unref(state).cpf_mae = $event,
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
                                                    modelValue: unref(state).nome_mae,
                                                    "onUpdate:modelValue": ($event) => unref(state).nome_mae = $event,
                                                    modelModifiers: { date: true },
                                                    label: "Nome da M\xE3e"
                                                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                                ]),
                                                _: 1
                                              })
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(VRow, { class: "mb-3" }, {
                                            default: withCtx(() => [
                                              createVNode(_component_NuxtLink, { to: "/pessoas/lista" }, {
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
                                              }),
                                              createVNode(VBtn, {
                                                onClick: ($event) => onUpdate(),
                                                class: "ml-4",
                                                size: "large",
                                                color: "green"
                                              }, {
                                                default: withCtx(() => [
                                                  createTextVNode("Salvar")
                                                ]),
                                                _: 1
                                              }, 8, ["onClick"])
                                            ]),
                                            _: 1
                                          })
                                        ];
                                      }
                                    }),
                                    _: 1
                                  }, _parent5, _scopeId4));
                                } else if (unref(state).tipo_pessoa === "JURIDICA") {
                                  _push5(ssrRenderComponent(_component_DadosJuridica, null, null, _parent5, _scopeId4));
                                } else if (unref(state).tipo_pessoa === "ESTRANGEIRA") {
                                  _push5(ssrRenderComponent(_component_DadosEstrangeira, null, null, _parent5, _scopeId4));
                                } else {
                                  _push5(`<!---->`);
                                }
                              } else {
                                return [
                                  unref(state).tipo_pessoa === "FISICA" ? (openBlock(), createBlock(VContainer, { key: 0 }, {
                                    default: withCtx(() => [
                                      createVNode(VRow, null, {
                                        default: withCtx(() => [
                                          createVNode(VCol, {
                                            cols: "12",
                                            md: "4"
                                          }, {
                                            default: withCtx(() => [
                                              withDirectives(createVNode(VTextField, {
                                                modelValue: unref(state).doc_identificacao,
                                                "onUpdate:modelValue": ($event) => unref(state).doc_identificacao = $event,
                                                label: "CPF",
                                                onBlur: ($event) => validarCpf(unref(state).doc_identificacao)
                                              }, null, 8, ["modelValue", "onUpdate:modelValue", "onBlur"]), [
                                                [_directive_mask, "###.###.###-##"]
                                              ])
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(VCol, {
                                            cols: "12",
                                            md: "6"
                                          }, {
                                            default: withCtx(() => [
                                              createVNode(VTextField, {
                                                modelValue: unref(state).nome,
                                                "onUpdate:modelValue": ($event) => unref(state).nome = $event,
                                                label: "Nome"
                                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(VCol, { md: "2" }, {
                                            default: withCtx(() => [
                                              createVNode(VSelect, {
                                                label: "Sexo",
                                                modelValue: unref(state).tabvalores_sexo_id,
                                                "onUpdate:modelValue": ($event) => unref(state).tabvalores_sexo_id = $event,
                                                items: unref(sexoItemsData),
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
                                              createVNode(VAutocomplete, {
                                                modelValue: unref(state).tabvalores_estadocivil_id,
                                                "onUpdate:modelValue": ($event) => unref(state).tabvalores_estadocivil_id = $event,
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
                                                modelValue: unref(state).profissao,
                                                "onUpdate:modelValue": ($event) => unref(state).profissao = $event,
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
                                                modelValue: unref(state).local_trabalho,
                                                "onUpdate:modelValue": ($event) => unref(state).local_trabalho = $event,
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
                                            md: "2"
                                          }, {
                                            default: withCtx(() => [
                                              withDirectives(createVNode(VTextField, {
                                                modelValue: unref(state).data_nascimento,
                                                "onUpdate:modelValue": ($event) => unref(state).data_nascimento = $event,
                                                label: "Data de nascimento",
                                                placeholder: "dd/mm/yyyy"
                                              }, null, 8, ["modelValue", "onUpdate:modelValue"]), [
                                                [_directive_mask, "##/##/####"]
                                              ])
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(VCol, {
                                            cols: "12",
                                            md: "2"
                                          }, {
                                            default: withCtx(() => [
                                              withDirectives(createVNode(VTextField, {
                                                modelValue: unref(state).fone_celular,
                                                "onUpdate:modelValue": ($event) => unref(state).fone_celular = $event,
                                                label: "Celular",
                                                placeholder: "'(99) 99999-9999'"
                                              }, null, 8, ["modelValue", "onUpdate:modelValue"]), [
                                                [_directive_mask, "(##) #####-####"]
                                              ])
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(VCol, {
                                            cols: "12",
                                            md: "4"
                                          }, {
                                            default: withCtx(() => [
                                              createVNode(VAutocomplete, {
                                                modelValue: unref(state).tabvalores_capacidadecivil_id,
                                                "onUpdate:modelValue": ($event) => unref(state).tabvalores_capacidadecivil_id = $event,
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
                                                modelValue: unref(state).cidade_nascimento_id,
                                                "onUpdate:modelValue": ($event) => unref(state).cidade_nascimento_id = $event,
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
                                                modelValue: unref(state).cpf_pai,
                                                "onUpdate:modelValue": ($event) => unref(state).cpf_pai = $event,
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
                                                modelValue: unref(state).nome_pai,
                                                "onUpdate:modelValue": ($event) => unref(state).nome_pai = $event,
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
                                                modelValue: unref(state).cpf_mae,
                                                "onUpdate:modelValue": ($event) => unref(state).cpf_mae = $event,
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
                                                modelValue: unref(state).nome_mae,
                                                "onUpdate:modelValue": ($event) => unref(state).nome_mae = $event,
                                                modelModifiers: { date: true },
                                                label: "Nome da M\xE3e"
                                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                            ]),
                                            _: 1
                                          })
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(VRow, { class: "mb-3" }, {
                                        default: withCtx(() => [
                                          createVNode(_component_NuxtLink, { to: "/pessoas/lista" }, {
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
                                          }),
                                          createVNode(VBtn, {
                                            onClick: ($event) => onUpdate(),
                                            class: "ml-4",
                                            size: "large",
                                            color: "green"
                                          }, {
                                            default: withCtx(() => [
                                              createTextVNode("Salvar")
                                            ]),
                                            _: 1
                                          }, 8, ["onClick"])
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  })) : unref(state).tipo_pessoa === "JURIDICA" ? (openBlock(), createBlock(_component_DadosJuridica, { key: 1 })) : unref(state).tipo_pessoa === "ESTRANGEIRA" ? (openBlock(), createBlock(_component_DadosEstrangeira, { key: 2 })) : createCommentVNode("", true)
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                          _push4(ssrRenderComponent(VTabsWindowItem, { value: "documento" }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(_component_Documentos, null, null, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(_component_Documentos)
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                          _push4(ssrRenderComponent(VTabsWindowItem, { value: "representante" }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(_component_PessoasCadastrosRepresentantes, null, null, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(_component_PessoasCadastrosRepresentantes)
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                          _push4(ssrRenderComponent(VTabsWindowItem, { value: "endereco" }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(_component_Endereco, null, null, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(_component_Endereco)
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                          _push4(ssrRenderComponent(VTabsWindowItem, { value: "biometria" }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(VContainer, { class: "mt-5" }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(ssrRenderComponent(_component_Biometria, { "link-ficha": unref(link_ficha) }, null, _parent6, _scopeId5));
                                    } else {
                                      return [
                                        createVNode(_component_Biometria, { "link-ficha": unref(link_ficha) }, null, 8, ["link-ficha"])
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(VContainer, { class: "mt-5" }, {
                                    default: withCtx(() => [
                                      createVNode(_component_Biometria, { "link-ficha": unref(link_ficha) }, null, 8, ["link-ficha"])
                                    ]),
                                    _: 1
                                  })
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                          _push4(ssrRenderComponent(VTabsWindowItem, { value: "restricao" }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(_component_Restricoes, null, null, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(_component_Restricoes)
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(VTabsWindowItem, { value: "dados" }, {
                              default: withCtx(() => [
                                unref(state).tipo_pessoa === "FISICA" ? (openBlock(), createBlock(VContainer, { key: 0 }, {
                                  default: withCtx(() => [
                                    createVNode(VRow, null, {
                                      default: withCtx(() => [
                                        createVNode(VCol, {
                                          cols: "12",
                                          md: "4"
                                        }, {
                                          default: withCtx(() => [
                                            withDirectives(createVNode(VTextField, {
                                              modelValue: unref(state).doc_identificacao,
                                              "onUpdate:modelValue": ($event) => unref(state).doc_identificacao = $event,
                                              label: "CPF",
                                              onBlur: ($event) => validarCpf(unref(state).doc_identificacao)
                                            }, null, 8, ["modelValue", "onUpdate:modelValue", "onBlur"]), [
                                              [_directive_mask, "###.###.###-##"]
                                            ])
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(VCol, {
                                          cols: "12",
                                          md: "6"
                                        }, {
                                          default: withCtx(() => [
                                            createVNode(VTextField, {
                                              modelValue: unref(state).nome,
                                              "onUpdate:modelValue": ($event) => unref(state).nome = $event,
                                              label: "Nome"
                                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(VCol, { md: "2" }, {
                                          default: withCtx(() => [
                                            createVNode(VSelect, {
                                              label: "Sexo",
                                              modelValue: unref(state).tabvalores_sexo_id,
                                              "onUpdate:modelValue": ($event) => unref(state).tabvalores_sexo_id = $event,
                                              items: unref(sexoItemsData),
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
                                            createVNode(VAutocomplete, {
                                              modelValue: unref(state).tabvalores_estadocivil_id,
                                              "onUpdate:modelValue": ($event) => unref(state).tabvalores_estadocivil_id = $event,
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
                                              modelValue: unref(state).profissao,
                                              "onUpdate:modelValue": ($event) => unref(state).profissao = $event,
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
                                              modelValue: unref(state).local_trabalho,
                                              "onUpdate:modelValue": ($event) => unref(state).local_trabalho = $event,
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
                                          md: "2"
                                        }, {
                                          default: withCtx(() => [
                                            withDirectives(createVNode(VTextField, {
                                              modelValue: unref(state).data_nascimento,
                                              "onUpdate:modelValue": ($event) => unref(state).data_nascimento = $event,
                                              label: "Data de nascimento",
                                              placeholder: "dd/mm/yyyy"
                                            }, null, 8, ["modelValue", "onUpdate:modelValue"]), [
                                              [_directive_mask, "##/##/####"]
                                            ])
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(VCol, {
                                          cols: "12",
                                          md: "2"
                                        }, {
                                          default: withCtx(() => [
                                            withDirectives(createVNode(VTextField, {
                                              modelValue: unref(state).fone_celular,
                                              "onUpdate:modelValue": ($event) => unref(state).fone_celular = $event,
                                              label: "Celular",
                                              placeholder: "'(99) 99999-9999'"
                                            }, null, 8, ["modelValue", "onUpdate:modelValue"]), [
                                              [_directive_mask, "(##) #####-####"]
                                            ])
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(VCol, {
                                          cols: "12",
                                          md: "4"
                                        }, {
                                          default: withCtx(() => [
                                            createVNode(VAutocomplete, {
                                              modelValue: unref(state).tabvalores_capacidadecivil_id,
                                              "onUpdate:modelValue": ($event) => unref(state).tabvalores_capacidadecivil_id = $event,
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
                                              modelValue: unref(state).cidade_nascimento_id,
                                              "onUpdate:modelValue": ($event) => unref(state).cidade_nascimento_id = $event,
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
                                              modelValue: unref(state).cpf_pai,
                                              "onUpdate:modelValue": ($event) => unref(state).cpf_pai = $event,
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
                                              modelValue: unref(state).nome_pai,
                                              "onUpdate:modelValue": ($event) => unref(state).nome_pai = $event,
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
                                              modelValue: unref(state).cpf_mae,
                                              "onUpdate:modelValue": ($event) => unref(state).cpf_mae = $event,
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
                                              modelValue: unref(state).nome_mae,
                                              "onUpdate:modelValue": ($event) => unref(state).nome_mae = $event,
                                              modelModifiers: { date: true },
                                              label: "Nome da M\xE3e"
                                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                          ]),
                                          _: 1
                                        })
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(VRow, { class: "mb-3" }, {
                                      default: withCtx(() => [
                                        createVNode(_component_NuxtLink, { to: "/pessoas/lista" }, {
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
                                        }),
                                        createVNode(VBtn, {
                                          onClick: ($event) => onUpdate(),
                                          class: "ml-4",
                                          size: "large",
                                          color: "green"
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode("Salvar")
                                          ]),
                                          _: 1
                                        }, 8, ["onClick"])
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                })) : unref(state).tipo_pessoa === "JURIDICA" ? (openBlock(), createBlock(_component_DadosJuridica, { key: 1 })) : unref(state).tipo_pessoa === "ESTRANGEIRA" ? (openBlock(), createBlock(_component_DadosEstrangeira, { key: 2 })) : createCommentVNode("", true)
                              ]),
                              _: 1
                            }),
                            createVNode(VTabsWindowItem, { value: "documento" }, {
                              default: withCtx(() => [
                                createVNode(_component_Documentos)
                              ]),
                              _: 1
                            }),
                            createVNode(VTabsWindowItem, { value: "representante" }, {
                              default: withCtx(() => [
                                createVNode(_component_PessoasCadastrosRepresentantes)
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
                                    createVNode(_component_Biometria, { "link-ficha": unref(link_ficha) }, null, 8, ["link-ficha"])
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
                    }, _parent3, _scopeId2));
                    _push3(`</div>`);
                  }
                } else {
                  return [
                    createVNode(VRow, { style: { "background-color": "#f5f2f2" } }, {
                      default: withCtx(() => [
                        createVNode("h1", { style: { "color": "#525050", "padding": "10px 0px 0px 30px" } }, toDisplayString(unref(id) ? "Atualiza\xE7\xE3o de Pessoas" : "Cadastramento de Pessoas"), 1),
                        createVNode("h3", { style: { "color": "#525050", "padding": "25px 0px 0px 20px" } }, " Cadastrado em " + toDisplayString(unref(criacaoData)), 1)
                      ]),
                      _: 1
                    }),
                    createVNode("div", { style: { "background-color": "#f5f2f2", "padding": "20px 0px 20px 20px" } }, [
                      createVNode(VAutocomplete, {
                        modelValue: unref(state).tipo_pessoa,
                        "onUpdate:modelValue": ($event) => unref(state).tipo_pessoa = $event,
                        style: { "width": "200px" },
                        items: pessoa_tipo,
                        "item-title": "label",
                        "item-value": "value",
                        label: "Tipo de pessoa",
                        "bg-color": "#F6F6F6",
                        disabled: ""
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    unref(loading) ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "d-flex justify-center"
                    }, [
                      createVNode(VProgressCircular, {
                        indeterminate: "",
                        class: "loading-spinner",
                        size: "64"
                      })
                    ])) : (openBlock(), createBlock("div", { key: 1 }, [
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
                          unref(state).tipo_pessoa === "FISICA" || unref(state).tipo_pessoa === "ESTRANGEIRA" ? (openBlock(), createBlock(VTab, {
                            key: 0,
                            value: "documento"
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Documentos")
                            ]),
                            _: 1
                          })) : createCommentVNode("", true),
                          unref(state).tipo_pessoa === "JURIDICA" ? (openBlock(), createBlock(VTab, {
                            key: 1,
                            value: "representante"
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Representantes")
                            ]),
                            _: 1
                          })) : createCommentVNode("", true),
                          createVNode(VTab, { value: "endereco" }, {
                            default: withCtx(() => [
                              createTextVNode("Endere\xE7os")
                            ]),
                            _: 1
                          }),
                          unref(state).tipo_pessoa === "FISICA" || unref(state).tipo_pessoa === "ESTRANGEIRA" ? (openBlock(), createBlock(VTab, {
                            key: 2,
                            value: "biometria"
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Biometria")
                            ]),
                            _: 1
                          })) : createCommentVNode("", true),
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
                              unref(state).tipo_pessoa === "FISICA" ? (openBlock(), createBlock(VContainer, { key: 0 }, {
                                default: withCtx(() => [
                                  createVNode(VRow, null, {
                                    default: withCtx(() => [
                                      createVNode(VCol, {
                                        cols: "12",
                                        md: "4"
                                      }, {
                                        default: withCtx(() => [
                                          withDirectives(createVNode(VTextField, {
                                            modelValue: unref(state).doc_identificacao,
                                            "onUpdate:modelValue": ($event) => unref(state).doc_identificacao = $event,
                                            label: "CPF",
                                            onBlur: ($event) => validarCpf(unref(state).doc_identificacao)
                                          }, null, 8, ["modelValue", "onUpdate:modelValue", "onBlur"]), [
                                            [_directive_mask, "###.###.###-##"]
                                          ])
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(VCol, {
                                        cols: "12",
                                        md: "6"
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(VTextField, {
                                            modelValue: unref(state).nome,
                                            "onUpdate:modelValue": ($event) => unref(state).nome = $event,
                                            label: "Nome"
                                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(VCol, { md: "2" }, {
                                        default: withCtx(() => [
                                          createVNode(VSelect, {
                                            label: "Sexo",
                                            modelValue: unref(state).tabvalores_sexo_id,
                                            "onUpdate:modelValue": ($event) => unref(state).tabvalores_sexo_id = $event,
                                            items: unref(sexoItemsData),
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
                                          createVNode(VAutocomplete, {
                                            modelValue: unref(state).tabvalores_estadocivil_id,
                                            "onUpdate:modelValue": ($event) => unref(state).tabvalores_estadocivil_id = $event,
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
                                            modelValue: unref(state).profissao,
                                            "onUpdate:modelValue": ($event) => unref(state).profissao = $event,
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
                                            modelValue: unref(state).local_trabalho,
                                            "onUpdate:modelValue": ($event) => unref(state).local_trabalho = $event,
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
                                        md: "2"
                                      }, {
                                        default: withCtx(() => [
                                          withDirectives(createVNode(VTextField, {
                                            modelValue: unref(state).data_nascimento,
                                            "onUpdate:modelValue": ($event) => unref(state).data_nascimento = $event,
                                            label: "Data de nascimento",
                                            placeholder: "dd/mm/yyyy"
                                          }, null, 8, ["modelValue", "onUpdate:modelValue"]), [
                                            [_directive_mask, "##/##/####"]
                                          ])
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(VCol, {
                                        cols: "12",
                                        md: "2"
                                      }, {
                                        default: withCtx(() => [
                                          withDirectives(createVNode(VTextField, {
                                            modelValue: unref(state).fone_celular,
                                            "onUpdate:modelValue": ($event) => unref(state).fone_celular = $event,
                                            label: "Celular",
                                            placeholder: "'(99) 99999-9999'"
                                          }, null, 8, ["modelValue", "onUpdate:modelValue"]), [
                                            [_directive_mask, "(##) #####-####"]
                                          ])
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(VCol, {
                                        cols: "12",
                                        md: "4"
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(VAutocomplete, {
                                            modelValue: unref(state).tabvalores_capacidadecivil_id,
                                            "onUpdate:modelValue": ($event) => unref(state).tabvalores_capacidadecivil_id = $event,
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
                                            modelValue: unref(state).cidade_nascimento_id,
                                            "onUpdate:modelValue": ($event) => unref(state).cidade_nascimento_id = $event,
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
                                            modelValue: unref(state).cpf_pai,
                                            "onUpdate:modelValue": ($event) => unref(state).cpf_pai = $event,
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
                                            modelValue: unref(state).nome_pai,
                                            "onUpdate:modelValue": ($event) => unref(state).nome_pai = $event,
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
                                            modelValue: unref(state).cpf_mae,
                                            "onUpdate:modelValue": ($event) => unref(state).cpf_mae = $event,
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
                                            modelValue: unref(state).nome_mae,
                                            "onUpdate:modelValue": ($event) => unref(state).nome_mae = $event,
                                            modelModifiers: { date: true },
                                            label: "Nome da M\xE3e"
                                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(VRow, { class: "mb-3" }, {
                                    default: withCtx(() => [
                                      createVNode(_component_NuxtLink, { to: "/pessoas/lista" }, {
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
                                      }),
                                      createVNode(VBtn, {
                                        onClick: ($event) => onUpdate(),
                                        class: "ml-4",
                                        size: "large",
                                        color: "green"
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode("Salvar")
                                        ]),
                                        _: 1
                                      }, 8, ["onClick"])
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              })) : unref(state).tipo_pessoa === "JURIDICA" ? (openBlock(), createBlock(_component_DadosJuridica, { key: 1 })) : unref(state).tipo_pessoa === "ESTRANGEIRA" ? (openBlock(), createBlock(_component_DadosEstrangeira, { key: 2 })) : createCommentVNode("", true)
                            ]),
                            _: 1
                          }),
                          createVNode(VTabsWindowItem, { value: "documento" }, {
                            default: withCtx(() => [
                              createVNode(_component_Documentos)
                            ]),
                            _: 1
                          }),
                          createVNode(VTabsWindowItem, { value: "representante" }, {
                            default: withCtx(() => [
                              createVNode(_component_PessoasCadastrosRepresentantes)
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
                                  createVNode(_component_Biometria, { "link-ficha": unref(link_ficha) }, null, 8, ["link-ficha"])
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
                    ]))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(VCard, { width: "1300" }, {
                default: withCtx(() => [
                  createVNode(VRow, { style: { "background-color": "#f5f2f2" } }, {
                    default: withCtx(() => [
                      createVNode("h1", { style: { "color": "#525050", "padding": "10px 0px 0px 30px" } }, toDisplayString(unref(id) ? "Atualiza\xE7\xE3o de Pessoas" : "Cadastramento de Pessoas"), 1),
                      createVNode("h3", { style: { "color": "#525050", "padding": "25px 0px 0px 20px" } }, " Cadastrado em " + toDisplayString(unref(criacaoData)), 1)
                    ]),
                    _: 1
                  }),
                  createVNode("div", { style: { "background-color": "#f5f2f2", "padding": "20px 0px 20px 20px" } }, [
                    createVNode(VAutocomplete, {
                      modelValue: unref(state).tipo_pessoa,
                      "onUpdate:modelValue": ($event) => unref(state).tipo_pessoa = $event,
                      style: { "width": "200px" },
                      items: pessoa_tipo,
                      "item-title": "label",
                      "item-value": "value",
                      label: "Tipo de pessoa",
                      "bg-color": "#F6F6F6",
                      disabled: ""
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  unref(loading) ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "d-flex justify-center"
                  }, [
                    createVNode(VProgressCircular, {
                      indeterminate: "",
                      class: "loading-spinner",
                      size: "64"
                    })
                  ])) : (openBlock(), createBlock("div", { key: 1 }, [
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
                        unref(state).tipo_pessoa === "FISICA" || unref(state).tipo_pessoa === "ESTRANGEIRA" ? (openBlock(), createBlock(VTab, {
                          key: 0,
                          value: "documento"
                        }, {
                          default: withCtx(() => [
                            createTextVNode("Documentos")
                          ]),
                          _: 1
                        })) : createCommentVNode("", true),
                        unref(state).tipo_pessoa === "JURIDICA" ? (openBlock(), createBlock(VTab, {
                          key: 1,
                          value: "representante"
                        }, {
                          default: withCtx(() => [
                            createTextVNode("Representantes")
                          ]),
                          _: 1
                        })) : createCommentVNode("", true),
                        createVNode(VTab, { value: "endereco" }, {
                          default: withCtx(() => [
                            createTextVNode("Endere\xE7os")
                          ]),
                          _: 1
                        }),
                        unref(state).tipo_pessoa === "FISICA" || unref(state).tipo_pessoa === "ESTRANGEIRA" ? (openBlock(), createBlock(VTab, {
                          key: 2,
                          value: "biometria"
                        }, {
                          default: withCtx(() => [
                            createTextVNode("Biometria")
                          ]),
                          _: 1
                        })) : createCommentVNode("", true),
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
                            unref(state).tipo_pessoa === "FISICA" ? (openBlock(), createBlock(VContainer, { key: 0 }, {
                              default: withCtx(() => [
                                createVNode(VRow, null, {
                                  default: withCtx(() => [
                                    createVNode(VCol, {
                                      cols: "12",
                                      md: "4"
                                    }, {
                                      default: withCtx(() => [
                                        withDirectives(createVNode(VTextField, {
                                          modelValue: unref(state).doc_identificacao,
                                          "onUpdate:modelValue": ($event) => unref(state).doc_identificacao = $event,
                                          label: "CPF",
                                          onBlur: ($event) => validarCpf(unref(state).doc_identificacao)
                                        }, null, 8, ["modelValue", "onUpdate:modelValue", "onBlur"]), [
                                          [_directive_mask, "###.###.###-##"]
                                        ])
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(VCol, {
                                      cols: "12",
                                      md: "6"
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(VTextField, {
                                          modelValue: unref(state).nome,
                                          "onUpdate:modelValue": ($event) => unref(state).nome = $event,
                                          label: "Nome"
                                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(VCol, { md: "2" }, {
                                      default: withCtx(() => [
                                        createVNode(VSelect, {
                                          label: "Sexo",
                                          modelValue: unref(state).tabvalores_sexo_id,
                                          "onUpdate:modelValue": ($event) => unref(state).tabvalores_sexo_id = $event,
                                          items: unref(sexoItemsData),
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
                                        createVNode(VAutocomplete, {
                                          modelValue: unref(state).tabvalores_estadocivil_id,
                                          "onUpdate:modelValue": ($event) => unref(state).tabvalores_estadocivil_id = $event,
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
                                          modelValue: unref(state).profissao,
                                          "onUpdate:modelValue": ($event) => unref(state).profissao = $event,
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
                                          modelValue: unref(state).local_trabalho,
                                          "onUpdate:modelValue": ($event) => unref(state).local_trabalho = $event,
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
                                      md: "2"
                                    }, {
                                      default: withCtx(() => [
                                        withDirectives(createVNode(VTextField, {
                                          modelValue: unref(state).data_nascimento,
                                          "onUpdate:modelValue": ($event) => unref(state).data_nascimento = $event,
                                          label: "Data de nascimento",
                                          placeholder: "dd/mm/yyyy"
                                        }, null, 8, ["modelValue", "onUpdate:modelValue"]), [
                                          [_directive_mask, "##/##/####"]
                                        ])
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(VCol, {
                                      cols: "12",
                                      md: "2"
                                    }, {
                                      default: withCtx(() => [
                                        withDirectives(createVNode(VTextField, {
                                          modelValue: unref(state).fone_celular,
                                          "onUpdate:modelValue": ($event) => unref(state).fone_celular = $event,
                                          label: "Celular",
                                          placeholder: "'(99) 99999-9999'"
                                        }, null, 8, ["modelValue", "onUpdate:modelValue"]), [
                                          [_directive_mask, "(##) #####-####"]
                                        ])
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(VCol, {
                                      cols: "12",
                                      md: "4"
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(VAutocomplete, {
                                          modelValue: unref(state).tabvalores_capacidadecivil_id,
                                          "onUpdate:modelValue": ($event) => unref(state).tabvalores_capacidadecivil_id = $event,
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
                                          modelValue: unref(state).cidade_nascimento_id,
                                          "onUpdate:modelValue": ($event) => unref(state).cidade_nascimento_id = $event,
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
                                          modelValue: unref(state).cpf_pai,
                                          "onUpdate:modelValue": ($event) => unref(state).cpf_pai = $event,
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
                                          modelValue: unref(state).nome_pai,
                                          "onUpdate:modelValue": ($event) => unref(state).nome_pai = $event,
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
                                          modelValue: unref(state).cpf_mae,
                                          "onUpdate:modelValue": ($event) => unref(state).cpf_mae = $event,
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
                                          modelValue: unref(state).nome_mae,
                                          "onUpdate:modelValue": ($event) => unref(state).nome_mae = $event,
                                          modelModifiers: { date: true },
                                          label: "Nome da M\xE3e"
                                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }),
                                createVNode(VRow, { class: "mb-3" }, {
                                  default: withCtx(() => [
                                    createVNode(_component_NuxtLink, { to: "/pessoas/lista" }, {
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
                                    }),
                                    createVNode(VBtn, {
                                      onClick: ($event) => onUpdate(),
                                      class: "ml-4",
                                      size: "large",
                                      color: "green"
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode("Salvar")
                                      ]),
                                      _: 1
                                    }, 8, ["onClick"])
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            })) : unref(state).tipo_pessoa === "JURIDICA" ? (openBlock(), createBlock(_component_DadosJuridica, { key: 1 })) : unref(state).tipo_pessoa === "ESTRANGEIRA" ? (openBlock(), createBlock(_component_DadosEstrangeira, { key: 2 })) : createCommentVNode("", true)
                          ]),
                          _: 1
                        }),
                        createVNode(VTabsWindowItem, { value: "documento" }, {
                          default: withCtx(() => [
                            createVNode(_component_Documentos)
                          ]),
                          _: 1
                        }),
                        createVNode(VTabsWindowItem, { value: "representante" }, {
                          default: withCtx(() => [
                            createVNode(_component_PessoasCadastrosRepresentantes)
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
                                createVNode(_component_Biometria, { "link-ficha": unref(link_ficha) }, null, 8, ["link-ficha"])
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
                  ]))
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
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/pessoas/atualizar/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : undefined;
};
const _id_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-03351b8b"]]);

export { _id_ as default };
//# sourceMappingURL=_id_-DBKWmWkj.mjs.map
