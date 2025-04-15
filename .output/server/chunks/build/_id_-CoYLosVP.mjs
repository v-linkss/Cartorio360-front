import { _ as __nuxt_component_0 } from './nuxt-link-TpvcaGEw.mjs';
import { b as _sfc_main$b, c as _sfc_main$a, d as _sfc_main$9, e as _sfc_main$8, f as _sfc_main$2, g as __nuxt_component_6 } from './RegistroPessoas-Ch92pngm.mjs';
import { ref, reactive, resolveDirective, mergeProps, withCtx, unref, isRef, createTextVNode, createVNode, openBlock, createBlock, createCommentVNode, withDirectives, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderStyle, ssrInterpolate, ssrGetDirectiveProps } from 'vue/server-renderer';
import { _ as _export_sfc, u as useRouter$1, b as useNuxtApp, aZ as useRoute$1, e as useCookie, a$ as VProgressCircular, V as VTextField, f as VBtn, c as useRuntimeConfig } from './server.mjs';
import { f as fetchWithToken } from './fetchWithToken-D8Xr_sCB.mjs';
import { a as formatToISO } from './formatDate-DflkuJ_V.mjs';
import { V as VCard } from './VCard-sRL_sqEi.mjs';
import { V as VAutocomplete } from './VAutocomplete-DqtW1GoU.mjs';
import { V as VTabs, a as VTab, d as VTabsWindow, e as VTabsWindowItem } from './VTabs-DRgtA1OR.mjs';
import { V as VContainer } from './VContainer-CTpFP9Uv.mjs';
import { V as VRow } from './VRow-DVf727cH.mjs';
import { V as VCol } from './VCol-D9_5u2PU.mjs';
import { V as VSelect } from './filter-BuIQEza-.mjs';
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
import './novo-CWU3oYa5.mjs';
import './editar-BcGPsVK2.mjs';
import './excluido-ceRs5bdR.mjs';
import './VDataTable-DScAK-sC.mjs';
import './VList-Bep3Frr6.mjs';
import './VAvatar-D7LEgnBn.mjs';
import './VResponsive-Cv_UVb0M.mjs';
import './VDialog-x7_nItFY.mjs';
import './fetch-78FO9XjX.mjs';
import 'utif';
import './visualizar-BoZ30DMV.mjs';
import 'pinia';
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
    const updatePessoa = `${config.public.auth}/service/gerencia/updatePessoa`;
    `${config.public.auth}/service/gerencia/listarEstadoCivil`;
    `${config.public.auth}/service/gerencia/listarCapacidadeCivil`;
    `${config.public.auth}/service/gerencia/listarCidades`;
    `${config.public.auth}/service/gerencia/getPessoaById`;
    `${config.public.auth}/service/gerencia/listarSexo`;
    const estadoCivilItemsData = ref([]);
    const capacidadeCivilItemsData = ref([]);
    const cidadeNascimentoItemsData = ref([]);
    const sexoItemsData = ref([]);
    const loading = ref(true);
    const link_ficha = ref(null);
    const initialState = {
      nome: null,
      nome_pai: null,
      nome_mae: null,
      profissao: null,
      data_nascimento: null,
      doc_identificacao: null,
      cpf_pai: null,
      cpf_mae: null,
      tipo_pessoa: "FISICA",
      tabvalores_estadocivil_id: null,
      tabvalores_capacidadecivil_id: null,
      cidade_natural_id: null,
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
          default:
            formattedPayload[key] = payload[key] === "" ? null : payload[key];
            break;
        }
      }
      return formattedPayload;
    }
    async function onUpdate() {
      const payloadFormated = formatPayload(state);
      await fetchWithToken(`${updatePessoa}/${id}`, {
        method: "PUT",
        body: payloadFormated
      });
      $toast.success("Pessoa atualizada com sucesso!");
      router.push("/pessoas/lista");
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      const _component_DadosJuridica = _sfc_main$b;
      const _component_Documentos = _sfc_main$a;
      const _component_PessoasCadastrosRepresentantes = _sfc_main$9;
      const _component_Endereco = _sfc_main$8;
      const _component_Biometria = _sfc_main$2;
      const _component_Restricoes = __nuxt_component_6;
      const _directive_mask = resolveDirective("mask");
      _push(ssrRenderComponent(VCard, mergeProps({ width: "1300" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h1 style="${ssrRenderStyle({ "background-color": "#f5f2f2", "color": "#525050", "padding": "10px 0px 0px 20px" })}" data-v-78b49ef4${_scopeId}>${ssrInterpolate(unref(id) ? "Atualiza\xE7\xE3o de Pessoas" : "Cadastramento de Pessoas")}</h1><div style="${ssrRenderStyle({ "background-color": "#f5f2f2", "padding": "20px 0px 20px 20px" })}" data-v-78b49ef4${_scopeId}>`);
            _push2(ssrRenderComponent(VAutocomplete, {
              modelValue: unref(state).tipo_pessoa,
              "onUpdate:modelValue": ($event) => unref(state).tipo_pessoa = $event,
              style: { "width": "200px" },
              items: pessoa_tipo,
              "item-title": "label",
              "item-value": "value",
              label: "Tipo de pessoa",
              "bg-color": "#F6F6F6",
              disabled: ""
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
            if (unref(loading)) {
              _push2(`<div class="d-flex justify-center" data-v-78b49ef4${_scopeId}>`);
              _push2(ssrRenderComponent(VProgressCircular, {
                indeterminate: "",
                class: "loading-spinner",
                size: "64"
              }, null, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              _push2(`<div data-v-78b49ef4${_scopeId}>`);
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
                    if (unref(state).tipo_pessoa === "FISICA") {
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
                    } else {
                      _push3(`<!---->`);
                    }
                    if (unref(state).tipo_pessoa === "JURIDICA") {
                      _push3(ssrRenderComponent(VTab, { value: "representante" }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`Representantes`);
                          } else {
                            return [
                              createTextVNode("Representantes")
                            ];
                          }
                        }),
                        _: 1
                      }, _parent3, _scopeId2));
                    } else {
                      _push3(`<!---->`);
                    }
                    if (unref(state).tipo_pessoa === "JURIDICA" || unref(state).tipo_pessoa === "FISICA") {
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
                    } else {
                      _push3(`<!---->`);
                    }
                    if (unref(state).tipo_pessoa === "FISICA") {
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
                    } else {
                      _push3(`<!---->`);
                    }
                    if (unref(state).tipo_pessoa === "JURIDICA" || unref(state).tipo_pessoa === "FISICA") {
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
                      unref(state).tipo_pessoa === "FISICA" ? (openBlock(), createBlock(VTab, {
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
                      unref(state).tipo_pessoa === "JURIDICA" || unref(state).tipo_pessoa === "FISICA" ? (openBlock(), createBlock(VTab, {
                        key: 2,
                        value: "endereco"
                      }, {
                        default: withCtx(() => [
                          createTextVNode("Endere\xE7os")
                        ]),
                        _: 1
                      })) : createCommentVNode("", true),
                      unref(state).tipo_pessoa === "FISICA" ? (openBlock(), createBlock(VTab, {
                        key: 3,
                        value: "biometria"
                      }, {
                        default: withCtx(() => [
                          createTextVNode("Biometria")
                        ]),
                        _: 1
                      })) : createCommentVNode("", true),
                      unref(state).tipo_pessoa === "JURIDICA" || unref(state).tipo_pessoa === "FISICA" ? (openBlock(), createBlock(VTab, {
                        key: 4,
                        value: "restricao"
                      }, {
                        default: withCtx(() => [
                          createTextVNode("Restri\xE7\xF5es")
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
                "onUpdate:modelValue": ($event) => isRef(tab) ? tab.value = $event : null
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(VTabsWindowItem, { value: "dados" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          if (unref(state).tipo_pessoa === "FISICA") {
                            _push4(ssrRenderComponent(VContainer, null, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(ssrRenderComponent(VRow, null, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(ssrRenderComponent(VCol, {
                                          cols: "12",
                                          md: "6"
                                        }, {
                                          default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                            if (_push7) {
                                              _push7(ssrRenderComponent(VTextField, {
                                                modelValue: unref(state).nome,
                                                "onUpdate:modelValue": ($event) => unref(state).nome = $event,
                                                label: "Nome"
                                              }, null, _parent7, _scopeId6));
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
                                        }, _parent6, _scopeId5));
                                        _push6(ssrRenderComponent(VCol, {
                                          cols: "12",
                                          md: "4"
                                        }, {
                                          default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                            if (_push7) {
                                              _push7(ssrRenderComponent(VTextField, mergeProps({
                                                modelValue: unref(state).doc_identificacao,
                                                "onUpdate:modelValue": ($event) => unref(state).doc_identificacao = $event,
                                                label: "CPF"
                                              }, ssrGetDirectiveProps(_ctx, _directive_mask, "###.###.###-##")), null, _parent7, _scopeId6));
                                            } else {
                                              return [
                                                withDirectives(createVNode(VTextField, {
                                                  modelValue: unref(state).doc_identificacao,
                                                  "onUpdate:modelValue": ($event) => unref(state).doc_identificacao = $event,
                                                  label: "CPF"
                                                }, null, 8, ["modelValue", "onUpdate:modelValue"]), [
                                                  [_directive_mask, "###.###.###-##"]
                                                ])
                                              ];
                                            }
                                          }),
                                          _: 1
                                        }, _parent6, _scopeId5));
                                        _push6(ssrRenderComponent(VCol, { md: "2" }, {
                                          default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                            if (_push7) {
                                              _push7(ssrRenderComponent(VSelect, {
                                                label: "Sexo",
                                                modelValue: unref(state).tabvalores_sexo_id,
                                                "onUpdate:modelValue": ($event) => unref(state).tabvalores_sexo_id = $event,
                                                items: unref(sexoItemsData),
                                                "item-title": "descricao",
                                                "item-value": "id"
                                              }, null, _parent7, _scopeId6));
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
                                        }, _parent6, _scopeId5));
                                      } else {
                                        return [
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
                                          createVNode(VCol, {
                                            cols: "12",
                                            md: "4"
                                          }, {
                                            default: withCtx(() => [
                                              withDirectives(createVNode(VTextField, {
                                                modelValue: unref(state).doc_identificacao,
                                                "onUpdate:modelValue": ($event) => unref(state).doc_identificacao = $event,
                                                label: "CPF"
                                              }, null, 8, ["modelValue", "onUpdate:modelValue"]), [
                                                [_directive_mask, "###.###.###-##"]
                                              ])
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
                                                modelValue: unref(state).tabvalores_estadocivil_id,
                                                "onUpdate:modelValue": ($event) => unref(state).tabvalores_estadocivil_id = $event,
                                                items: unref(estadoCivilItemsData),
                                                "item-title": "descricao",
                                                "item-value": "id",
                                                label: "Estado Civil"
                                              }, null, _parent7, _scopeId6));
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
                                        }, _parent6, _scopeId5));
                                        _push6(ssrRenderComponent(VCol, {
                                          cols: "12",
                                          md: "4"
                                        }, {
                                          default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                            if (_push7) {
                                              _push7(ssrRenderComponent(VTextField, {
                                                modelValue: unref(state).profissao,
                                                "onUpdate:modelValue": ($event) => unref(state).profissao = $event,
                                                label: "Profiss\xE3o"
                                              }, null, _parent7, _scopeId6));
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
                                        }, _parent6, _scopeId5));
                                        _push6(ssrRenderComponent(VCol, {
                                          cols: "12",
                                          md: "4"
                                        }, {
                                          default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                            if (_push7) {
                                              _push7(ssrRenderComponent(VTextField, {
                                                modelValue: unref(state).local_trabalho,
                                                "onUpdate:modelValue": ($event) => unref(state).local_trabalho = $event,
                                                label: "Local de trabalho"
                                              }, null, _parent7, _scopeId6));
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
                                        }, _parent6, _scopeId5));
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
                                                modelValue: unref(state).data_nascimento,
                                                "onUpdate:modelValue": ($event) => unref(state).data_nascimento = $event,
                                                label: "Data de nascimento",
                                                placeholder: "dd/mm/yyyy"
                                              }, ssrGetDirectiveProps(_ctx, _directive_mask, "##/##/####")), null, _parent7, _scopeId6));
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
                                        }, _parent6, _scopeId5));
                                        _push6(ssrRenderComponent(VCol, {
                                          cols: "12",
                                          md: "4"
                                        }, {
                                          default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                            if (_push7) {
                                              _push7(ssrRenderComponent(VAutocomplete, {
                                                modelValue: unref(state).tabvalores_capacidadecivil_id,
                                                "onUpdate:modelValue": ($event) => unref(state).tabvalores_capacidadecivil_id = $event,
                                                items: unref(capacidadeCivilItemsData),
                                                label: "Capacidade Civil",
                                                "item-title": "descricao",
                                                "item-value": "id"
                                              }, null, _parent7, _scopeId6));
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
                                        }, _parent6, _scopeId5));
                                        _push6(ssrRenderComponent(VCol, {
                                          cols: "12",
                                          md: "4"
                                        }, {
                                          default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                            if (_push7) {
                                              _push7(ssrRenderComponent(VAutocomplete, {
                                                modelValue: unref(state).cidade_natural_id,
                                                "onUpdate:modelValue": ($event) => unref(state).cidade_natural_id = $event,
                                                items: unref(cidadeNascimentoItemsData),
                                                label: "Cidade de nascimento",
                                                "item-title": "descricao",
                                                "item-value": "id"
                                              }, null, _parent7, _scopeId6));
                                            } else {
                                              return [
                                                createVNode(VAutocomplete, {
                                                  modelValue: unref(state).cidade_natural_id,
                                                  "onUpdate:modelValue": ($event) => unref(state).cidade_natural_id = $event,
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
                                                modelValue: unref(state).cidade_natural_id,
                                                "onUpdate:modelValue": ($event) => unref(state).cidade_natural_id = $event,
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
                                                modelValue: unref(state).cpf_pai,
                                                "onUpdate:modelValue": ($event) => unref(state).cpf_pai = $event,
                                                modelModifiers: { date: true },
                                                label: "CPF do Pai"
                                              }, ssrGetDirectiveProps(_ctx, _directive_mask, "###.###.###-##")), null, _parent7, _scopeId6));
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
                                        }, _parent6, _scopeId5));
                                        _push6(ssrRenderComponent(VCol, {
                                          cols: "12",
                                          md: "4"
                                        }, {
                                          default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                            if (_push7) {
                                              _push7(ssrRenderComponent(VTextField, {
                                                modelValue: unref(state).nome_pai,
                                                "onUpdate:modelValue": ($event) => unref(state).nome_pai = $event,
                                                modelModifiers: { date: true },
                                                label: "Nome do Pai"
                                              }, null, _parent7, _scopeId6));
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
                                        }, _parent6, _scopeId5));
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
                                                modelValue: unref(state).cpf_mae,
                                                "onUpdate:modelValue": ($event) => unref(state).cpf_mae = $event,
                                                modelModifiers: { date: true },
                                                label: "CPF da M\xE3e"
                                              }, ssrGetDirectiveProps(_ctx, _directive_mask, "###.###.###-##")), null, _parent7, _scopeId6));
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
                                        }, _parent6, _scopeId5));
                                        _push6(ssrRenderComponent(VCol, {
                                          cols: "12",
                                          md: "4"
                                        }, {
                                          default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                            if (_push7) {
                                              _push7(ssrRenderComponent(VTextField, {
                                                modelValue: unref(state).nome_mae,
                                                "onUpdate:modelValue": ($event) => unref(state).nome_mae = $event,
                                                modelModifiers: { date: true },
                                                label: "Nome da M\xE3e"
                                              }, null, _parent7, _scopeId6));
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
                                        }, _parent6, _scopeId5));
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
                                  }, _parent5, _scopeId4));
                                  _push5(ssrRenderComponent(VRow, { class: "mb-3" }, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(ssrRenderComponent(_component_NuxtLink, { to: "/pessoas/lista" }, {
                                          default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                            if (_push7) {
                                              _push7(ssrRenderComponent(VBtn, {
                                                size: "large",
                                                color: "red"
                                              }, {
                                                default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                  if (_push8) {
                                                    _push8(`Voltar`);
                                                  } else {
                                                    return [
                                                      createTextVNode("Voltar")
                                                    ];
                                                  }
                                                }),
                                                _: 1
                                              }, _parent7, _scopeId6));
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
                                        }, _parent6, _scopeId5));
                                        _push6(ssrRenderComponent(VBtn, {
                                          onClick: ($event) => onUpdate(),
                                          class: "ml-4",
                                          size: "large",
                                          color: "green"
                                        }, {
                                          default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                            if (_push7) {
                                              _push7(`Salvar`);
                                            } else {
                                              return [
                                                createTextVNode("Salvar")
                                              ];
                                            }
                                          }),
                                          _: 1
                                        }, _parent6, _scopeId5));
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
                                  }, _parent5, _scopeId4));
                                } else {
                                  return [
                                    createVNode(VRow, null, {
                                      default: withCtx(() => [
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
                                        createVNode(VCol, {
                                          cols: "12",
                                          md: "4"
                                        }, {
                                          default: withCtx(() => [
                                            withDirectives(createVNode(VTextField, {
                                              modelValue: unref(state).doc_identificacao,
                                              "onUpdate:modelValue": ($event) => unref(state).doc_identificacao = $event,
                                              label: "CPF"
                                            }, null, 8, ["modelValue", "onUpdate:modelValue"]), [
                                              [_directive_mask, "###.###.###-##"]
                                            ])
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
                                          md: "4"
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
                                              modelValue: unref(state).cidade_natural_id,
                                              "onUpdate:modelValue": ($event) => unref(state).cidade_natural_id = $event,
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
                            }, _parent4, _scopeId3));
                          } else if (unref(state).tipo_pessoa === "JURIDICA") {
                            _push4(ssrRenderComponent(_component_DadosJuridica, null, null, _parent4, _scopeId3));
                          } else {
                            _push4(`<!---->`);
                          }
                        } else {
                          return [
                            unref(state).tipo_pessoa === "FISICA" ? (openBlock(), createBlock(VContainer, { key: 0 }, {
                              default: withCtx(() => [
                                createVNode(VRow, null, {
                                  default: withCtx(() => [
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
                                    createVNode(VCol, {
                                      cols: "12",
                                      md: "4"
                                    }, {
                                      default: withCtx(() => [
                                        withDirectives(createVNode(VTextField, {
                                          modelValue: unref(state).doc_identificacao,
                                          "onUpdate:modelValue": ($event) => unref(state).doc_identificacao = $event,
                                          label: "CPF"
                                        }, null, 8, ["modelValue", "onUpdate:modelValue"]), [
                                          [_directive_mask, "###.###.###-##"]
                                        ])
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
                                      md: "4"
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
                                          modelValue: unref(state).cidade_natural_id,
                                          "onUpdate:modelValue": ($event) => unref(state).cidade_natural_id = $event,
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
                            })) : unref(state).tipo_pessoa === "JURIDICA" ? (openBlock(), createBlock(_component_DadosJuridica, { key: 1 })) : createCommentVNode("", true)
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
                    _push3(ssrRenderComponent(VTabsWindowItem, { value: "representante" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_component_PessoasCadastrosRepresentantes, null, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_component_PessoasCadastrosRepresentantes)
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
                                _push5(ssrRenderComponent(_component_Biometria, { "link-ficha": unref(link_ficha) }, null, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(_component_Biometria, { "link-ficha": unref(link_ficha) }, null, 8, ["link-ficha"])
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
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
                          unref(state).tipo_pessoa === "FISICA" ? (openBlock(), createBlock(VContainer, { key: 0 }, {
                            default: withCtx(() => [
                              createVNode(VRow, null, {
                                default: withCtx(() => [
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
                                  createVNode(VCol, {
                                    cols: "12",
                                    md: "4"
                                  }, {
                                    default: withCtx(() => [
                                      withDirectives(createVNode(VTextField, {
                                        modelValue: unref(state).doc_identificacao,
                                        "onUpdate:modelValue": ($event) => unref(state).doc_identificacao = $event,
                                        label: "CPF"
                                      }, null, 8, ["modelValue", "onUpdate:modelValue"]), [
                                        [_directive_mask, "###.###.###-##"]
                                      ])
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
                                    md: "4"
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
                                        modelValue: unref(state).cidade_natural_id,
                                        "onUpdate:modelValue": ($event) => unref(state).cidade_natural_id = $event,
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
                          })) : unref(state).tipo_pessoa === "JURIDICA" ? (openBlock(), createBlock(_component_DadosJuridica, { key: 1 })) : createCommentVNode("", true)
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
              }, _parent2, _scopeId));
              _push2(`</div>`);
            }
          } else {
            return [
              createVNode("h1", { style: { "background-color": "#f5f2f2", "color": "#525050", "padding": "10px 0px 0px 20px" } }, toDisplayString(unref(id) ? "Atualiza\xE7\xE3o de Pessoas" : "Cadastramento de Pessoas"), 1),
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
                    unref(state).tipo_pessoa === "FISICA" ? (openBlock(), createBlock(VTab, {
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
                    unref(state).tipo_pessoa === "JURIDICA" || unref(state).tipo_pessoa === "FISICA" ? (openBlock(), createBlock(VTab, {
                      key: 2,
                      value: "endereco"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Endere\xE7os")
                      ]),
                      _: 1
                    })) : createCommentVNode("", true),
                    unref(state).tipo_pessoa === "FISICA" ? (openBlock(), createBlock(VTab, {
                      key: 3,
                      value: "biometria"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Biometria")
                      ]),
                      _: 1
                    })) : createCommentVNode("", true),
                    unref(state).tipo_pessoa === "JURIDICA" || unref(state).tipo_pessoa === "FISICA" ? (openBlock(), createBlock(VTab, {
                      key: 4,
                      value: "restricao"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Restri\xE7\xF5es")
                      ]),
                      _: 1
                    })) : createCommentVNode("", true)
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
                                createVNode(VCol, {
                                  cols: "12",
                                  md: "4"
                                }, {
                                  default: withCtx(() => [
                                    withDirectives(createVNode(VTextField, {
                                      modelValue: unref(state).doc_identificacao,
                                      "onUpdate:modelValue": ($event) => unref(state).doc_identificacao = $event,
                                      label: "CPF"
                                    }, null, 8, ["modelValue", "onUpdate:modelValue"]), [
                                      [_directive_mask, "###.###.###-##"]
                                    ])
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
                                  md: "4"
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
                                      modelValue: unref(state).cidade_natural_id,
                                      "onUpdate:modelValue": ($event) => unref(state).cidade_natural_id = $event,
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
                        })) : unref(state).tipo_pessoa === "JURIDICA" ? (openBlock(), createBlock(_component_DadosJuridica, { key: 1 })) : createCommentVNode("", true)
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
const _id_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-78b49ef4"]]);

export { _id_ as default };
//# sourceMappingURL=_id_-CoYLosVP.mjs.map
