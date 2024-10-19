import { a as buildAssetsURL } from '../routes/renderer.mjs';
import { ref, reactive, withAsyncContext, withCtx, unref, createVNode, useSSRContext, watch, resolveDirective, mergeProps, isRef, createTextVNode, withDirectives, openBlock, createBlock, toDisplayString, createCommentVNode } from 'vue';
import { u as useRouter$1, c as useRoute$1, d as useCookie, V as VTextField, at as VDataTable, b as useRuntimeConfig, f as useNuxtApp, as as VProgressCircular, an as VImg, e as VBtn } from './server.mjs';
import { u as useFetch, a as useLazyAsyncData } from './fetch-Dsyde8UD.mjs';
import { ssrRenderComponent, ssrRenderAttr, ssrRenderStyle, ssrInterpolate, ssrGetDirectiveProps } from 'vue/server-renderer';
import { _ as _imports_0$2 } from './sair-CV1ySkp8.mjs';
import { V as VAutocomplete, _ as _imports_1$1 } from './salvar-DRINGrxl.mjs';
import { useVuelidate } from '@vuelidate/core';
import { helpers, required } from '@vuelidate/validators';
import { c as cpf } from './validaCpf-DuucUl6O.mjs';
import { V as VDialog, a as VCard, b as VCardTitle, c as VCardActions } from './VCard-DfTYaOUe.mjs';
import { V as VContainer } from './VContainer-chgtNZst.mjs';
import { V as VRow } from './VRow-BuaJrtx0.mjs';
import { V as VCol } from './VCol-uBIoF0At.mjs';
import { _ as __nuxt_component_0 } from './nuxt-link-DyZc7qn_.mjs';
import { _ as _sfc_main$3 } from './ErrorModalCard-J0BRDYKJ.mjs';
import { _ as _imports_1 } from './visualizar-CsXww5Hd.mjs';
import { _ as _imports_0$1, a as _imports_4 } from './mudarStatus-D3vc2C0t.mjs';
import 'vue-bundle-renderer/runtime';
import '../runtime.mjs';
import 'node:http';
import 'node:https';
import 'fs';
import 'path';
import 'node:fs';
import 'node:url';
import 'devalue';
import '@unhead/ssr';
import 'unhead';
import '@unhead/shared';
import 'vue-router';
import 'vue3-toastify';
import 'vue-the-mask';

const _sfc_main$2 = {
  __name: "RegistroPessoas",
  __ssrInlineRender: true,
  props: {
    show: Boolean
  },
  emits: ["close"],
  async setup(__props, { emit: __emit }) {
    let __temp, __restore;
    const props = __props;
    const isVisible = ref(props.show);
    const emit = __emit;
    const { $toast } = useNuxtApp();
    const config = useRuntimeConfig();
    const createPessoa = `${config.public.managemant}/createPessoa`;
    const estadoCivil = `${config.public.managemant}/listarEstadoCivil`;
    const capacidadeCivil = `${config.public.managemant}/listarCapacidadeCivil`;
    const cidade = `${config.public.managemant}/listarCidades`;
    const initialState = {
      nome: "",
      nome_pai: "",
      nome_mae: "",
      profissao: "",
      local_trabalho: "",
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
    watch(
      () => props.show,
      (newVal) => {
        isVisible.value = newVal;
      }
    );
    const closeModal = () => {
      isVisible.value = false;
      emit("close");
    };
    function removeFormatting(value) {
      if (value) {
        return value.replace(/[.\-]/g, "");
      } else {
        value = null;
      }
    }
    const {
      data: dados,
      pending,
      status,
      error
    } = ([__temp, __restore] = withAsyncContext(async () => useLazyAsyncData("cliente-dados", async () => {
      const [estadoCivilItems, capacidadeCivilItems, cidadeNascimentoItems] = await Promise.all([
        $fetch(estadoCivil),
        $fetch(capacidadeCivil),
        $fetch(cidade)
      ]);
      return { estadoCivilItems, capacidadeCivilItems, cidadeNascimentoItems };
    })), __temp = await __temp, __restore(), __temp);
    const rules = {
      nome: {
        required: helpers.withMessage("O campo \xE9 obrigatorio", required)
      },
      nome_mae: {
        required: helpers.withMessage("O campo \xE9 obrigatorio", required)
      },
      doc_identificacao: {
        required: helpers.withMessage("O campo \xE9 obrigatorio", required),
        cpf
      }
    };
    const v$ = useVuelidate(rules, state);
    async function onSubmit() {
      if (await v$.value.$validate()) {
        const payload = { ...state };
        for (const key in payload) {
          if (payload[key] === "") {
            payload[key] = null;
          }
        }
        const payloadFormated = {
          ...payload,
          doc_identificacao: removeFormatting(state.doc_identificacao),
          cpf_pai: removeFormatting(state.cpf_pai),
          cpf_mae: removeFormatting(state.cpf_mae)
        };
        const { data, error: error2, status: status2 } = await useFetch(createPessoa, {
          method: "POST",
          body: payloadFormated
        }, "$BiOjXVCR5N");
        if (status2.value === "error" && error2.value.statusCode === 500) {
          $toast.error("Erro ao cadastrar pessoa,o CPF j\xE1 est\xE1 cadastrado.");
        } else {
          $toast.success("Pessoa cadastrada com sucesso!");
          closeModal();
        }
      } else {
        $toast.error("Erro ao cadastrar pessoa, preencha os campos obrigatorios.");
      }
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _directive_mask = resolveDirective("mask");
      _push(ssrRenderComponent(VDialog, mergeProps({
        persistent: "",
        modelValue: unref(isVisible),
        "onUpdate:modelValue": ($event) => isRef(isVisible) ? isVisible.value = $event : null,
        "max-width": "1000"
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VCard, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VCardTitle, { class: "text-h5 mt-3" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Criar Pessoa`);
                      } else {
                        return [
                          createTextVNode("Criar Pessoa")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  if (unref(status) === "pending") {
                    _push3(ssrRenderComponent(VProgressCircular, {
                      class: "loading-spinner",
                      indeterminate: "",
                      size: "64"
                    }, null, _parent3, _scopeId2));
                  } else if (unref(error)) {
                    _push3(`<div${_scopeId2}>${ssrInterpolate(unref(error).message)}</div>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  if (unref(status) === "success") {
                    _push3(ssrRenderComponent(VContainer, { class: "mt-5" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(VRow, null, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(VCol, {
                                  cols: "12",
                                  md: "8"
                                }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(ssrRenderComponent(VTextField, {
                                        modelValue: unref(state).nome,
                                        "onUpdate:modelValue": ($event) => unref(state).nome = $event,
                                        "error-messages": unref(v$).nome.$errors.map((e) => e.$message),
                                        label: "Nome",
                                        required: "",
                                        onBlur: unref(v$).nome.$touch,
                                        onInput: unref(v$).nome.$touch
                                      }, null, _parent6, _scopeId5));
                                    } else {
                                      return [
                                        createVNode(VTextField, {
                                          modelValue: unref(state).nome,
                                          "onUpdate:modelValue": ($event) => unref(state).nome = $event,
                                          "error-messages": unref(v$).nome.$errors.map((e) => e.$message),
                                          label: "Nome",
                                          required: "",
                                          onBlur: unref(v$).nome.$touch,
                                          onInput: unref(v$).nome.$touch
                                        }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages", "onBlur", "onInput"])
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent5, _scopeId4));
                                _push5(ssrRenderComponent(VCol, {
                                  cols: "12",
                                  md: "4"
                                }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(ssrRenderComponent(VTextField, mergeProps({
                                        modelValue: unref(state).doc_identificacao,
                                        "onUpdate:modelValue": ($event) => unref(state).doc_identificacao = $event,
                                        "error-messages": unref(v$).doc_identificacao.$errors.map((e) => e.$message),
                                        label: "CPF",
                                        required: "",
                                        onBlur: unref(v$).doc_identificacao.$touch,
                                        onInput: unref(v$).doc_identificacao.$touch
                                      }, ssrGetDirectiveProps(_ctx, _directive_mask, "###.###.###-##")), null, _parent6, _scopeId5));
                                    } else {
                                      return [
                                        withDirectives(createVNode(VTextField, {
                                          modelValue: unref(state).doc_identificacao,
                                          "onUpdate:modelValue": ($event) => unref(state).doc_identificacao = $event,
                                          "error-messages": unref(v$).doc_identificacao.$errors.map((e) => e.$message),
                                          label: "CPF",
                                          required: "",
                                          onBlur: unref(v$).doc_identificacao.$touch,
                                          onInput: unref(v$).doc_identificacao.$touch
                                        }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages", "onBlur", "onInput"]), [
                                          [_directive_mask, "###.###.###-##"]
                                        ])
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(VCol, {
                                    cols: "12",
                                    md: "8"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(VTextField, {
                                        modelValue: unref(state).nome,
                                        "onUpdate:modelValue": ($event) => unref(state).nome = $event,
                                        "error-messages": unref(v$).nome.$errors.map((e) => e.$message),
                                        label: "Nome",
                                        required: "",
                                        onBlur: unref(v$).nome.$touch,
                                        onInput: unref(v$).nome.$touch
                                      }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages", "onBlur", "onInput"])
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
                                        "error-messages": unref(v$).doc_identificacao.$errors.map((e) => e.$message),
                                        label: "CPF",
                                        required: "",
                                        onBlur: unref(v$).doc_identificacao.$touch,
                                        onInput: unref(v$).doc_identificacao.$touch
                                      }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages", "onBlur", "onInput"]), [
                                        [_directive_mask, "###.###.###-##"]
                                      ])
                                    ]),
                                    _: 1
                                  })
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                          _push4(ssrRenderComponent(VRow, null, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(VCol, {
                                  cols: "12",
                                  md: "4"
                                }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(ssrRenderComponent(VAutocomplete, {
                                        modelValue: unref(state).tabvalores_estadocivil_id,
                                        "onUpdate:modelValue": ($event) => unref(state).tabvalores_estadocivil_id = $event,
                                        items: unref(dados).estadoCivilItems,
                                        "item-title": "descricao",
                                        "item-value": "id",
                                        label: "Estado Civil"
                                      }, null, _parent6, _scopeId5));
                                    } else {
                                      return [
                                        createVNode(VAutocomplete, {
                                          modelValue: unref(state).tabvalores_estadocivil_id,
                                          "onUpdate:modelValue": ($event) => unref(state).tabvalores_estadocivil_id = $event,
                                          items: unref(dados).estadoCivilItems,
                                          "item-title": "descricao",
                                          "item-value": "id",
                                          label: "Estado Civil"
                                        }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent5, _scopeId4));
                                _push5(ssrRenderComponent(VCol, {
                                  cols: "12",
                                  md: "4"
                                }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(ssrRenderComponent(VTextField, {
                                        modelValue: unref(state).profissao,
                                        "onUpdate:modelValue": ($event) => unref(state).profissao = $event,
                                        label: "Profiss\xE3o"
                                      }, null, _parent6, _scopeId5));
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
                                }, _parent5, _scopeId4));
                                _push5(ssrRenderComponent(VCol, {
                                  cols: "12",
                                  md: "4"
                                }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(ssrRenderComponent(VTextField, {
                                        modelValue: unref(state).local_trabalho,
                                        "onUpdate:modelValue": ($event) => unref(state).local_trabalho = $event,
                                        label: "Local de trabalho"
                                      }, null, _parent6, _scopeId5));
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
                                }, _parent5, _scopeId4));
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
                                        items: unref(dados).estadoCivilItems,
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
                          }, _parent4, _scopeId3));
                          _push4(ssrRenderComponent(VRow, null, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(VCol, {
                                  cols: "12",
                                  md: "4"
                                }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(ssrRenderComponent(VTextField, {
                                        modelValue: unref(state).data_nascimento,
                                        "onUpdate:modelValue": ($event) => unref(state).data_nascimento = $event,
                                        type: "date",
                                        "prepend-icon": "",
                                        label: "Data de nascimento"
                                      }, null, _parent6, _scopeId5));
                                    } else {
                                      return [
                                        createVNode(VTextField, {
                                          modelValue: unref(state).data_nascimento,
                                          "onUpdate:modelValue": ($event) => unref(state).data_nascimento = $event,
                                          type: "date",
                                          "prepend-icon": "",
                                          label: "Data de nascimento"
                                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent5, _scopeId4));
                                _push5(ssrRenderComponent(VCol, {
                                  cols: "12",
                                  md: "4"
                                }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(ssrRenderComponent(VAutocomplete, {
                                        modelValue: unref(state).tabvalores_capacidadecivil_id,
                                        "onUpdate:modelValue": ($event) => unref(state).tabvalores_capacidadecivil_id = $event,
                                        items: unref(dados).capacidadeCivilItems,
                                        label: "Capacidade Civil",
                                        "item-title": "descricao",
                                        "item-value": "id"
                                      }, null, _parent6, _scopeId5));
                                    } else {
                                      return [
                                        createVNode(VAutocomplete, {
                                          modelValue: unref(state).tabvalores_capacidadecivil_id,
                                          "onUpdate:modelValue": ($event) => unref(state).tabvalores_capacidadecivil_id = $event,
                                          items: unref(dados).capacidadeCivilItems,
                                          label: "Capacidade Civil",
                                          "item-title": "descricao",
                                          "item-value": "id"
                                        }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent5, _scopeId4));
                                _push5(ssrRenderComponent(VCol, {
                                  cols: "12",
                                  md: "4"
                                }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(ssrRenderComponent(VAutocomplete, {
                                        modelValue: unref(state).cidade_natural_id,
                                        "onUpdate:modelValue": ($event) => unref(state).cidade_natural_id = $event,
                                        items: unref(dados).cidadeNascimentoItems,
                                        label: "Cidade de nascimento",
                                        "item-title": "descricao",
                                        "item-value": "id"
                                      }, null, _parent6, _scopeId5));
                                    } else {
                                      return [
                                        createVNode(VAutocomplete, {
                                          modelValue: unref(state).cidade_natural_id,
                                          "onUpdate:modelValue": ($event) => unref(state).cidade_natural_id = $event,
                                          items: unref(dados).cidadeNascimentoItems,
                                          label: "Cidade de nascimento",
                                          "item-title": "descricao",
                                          "item-value": "id"
                                        }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(VCol, {
                                    cols: "12",
                                    md: "4"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(VTextField, {
                                        modelValue: unref(state).data_nascimento,
                                        "onUpdate:modelValue": ($event) => unref(state).data_nascimento = $event,
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
                                        modelValue: unref(state).tabvalores_capacidadecivil_id,
                                        "onUpdate:modelValue": ($event) => unref(state).tabvalores_capacidadecivil_id = $event,
                                        items: unref(dados).capacidadeCivilItems,
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
                                        items: unref(dados).cidadeNascimentoItems,
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
                          }, _parent4, _scopeId3));
                          _push4(ssrRenderComponent(VRow, null, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(VCol, {
                                  cols: "12",
                                  md: "4"
                                }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(ssrRenderComponent(VTextField, mergeProps({
                                        modelValue: unref(state).cpf_pai,
                                        "onUpdate:modelValue": ($event) => unref(state).cpf_pai = $event,
                                        modelModifiers: { date: true },
                                        label: "CPF do Pai"
                                      }, ssrGetDirectiveProps(_ctx, _directive_mask, "###.###.###-##")), null, _parent6, _scopeId5));
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
                                }, _parent5, _scopeId4));
                                _push5(ssrRenderComponent(VCol, {
                                  cols: "12",
                                  md: "4"
                                }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(ssrRenderComponent(VTextField, {
                                        modelValue: unref(state).nome_pai,
                                        "onUpdate:modelValue": ($event) => unref(state).nome_pai = $event,
                                        modelModifiers: { date: true },
                                        label: "Nome do Pai"
                                      }, null, _parent6, _scopeId5));
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
                                }, _parent5, _scopeId4));
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
                          }, _parent4, _scopeId3));
                          _push4(ssrRenderComponent(VRow, null, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(VCol, {
                                  cols: "12",
                                  md: "4"
                                }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(ssrRenderComponent(VTextField, mergeProps({
                                        modelValue: unref(state).cpf_mae,
                                        "onUpdate:modelValue": ($event) => unref(state).cpf_mae = $event,
                                        modelModifiers: { date: true },
                                        label: "CPF da M\xE3e"
                                      }, ssrGetDirectiveProps(_ctx, _directive_mask, "###.###.###-##")), null, _parent6, _scopeId5));
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
                                }, _parent5, _scopeId4));
                                _push5(ssrRenderComponent(VCol, {
                                  cols: "12",
                                  md: "4"
                                }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(ssrRenderComponent(VTextField, {
                                        modelValue: unref(state).nome_mae,
                                        "onUpdate:modelValue": ($event) => unref(state).nome_mae = $event,
                                        modelModifiers: { date: true },
                                        "error-messages": unref(v$).nome_mae.$errors.map((e) => e.$message),
                                        label: "Nome da M\xE3e",
                                        required: "",
                                        onBlur: unref(v$).nome_mae.$touch,
                                        onInput: unref(v$).nome_mae.$touch
                                      }, null, _parent6, _scopeId5));
                                    } else {
                                      return [
                                        createVNode(VTextField, {
                                          modelValue: unref(state).nome_mae,
                                          "onUpdate:modelValue": ($event) => unref(state).nome_mae = $event,
                                          modelModifiers: { date: true },
                                          "error-messages": unref(v$).nome_mae.$errors.map((e) => e.$message),
                                          label: "Nome da M\xE3e",
                                          required: "",
                                          onBlur: unref(v$).nome_mae.$touch,
                                          onInput: unref(v$).nome_mae.$touch
                                        }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages", "onBlur", "onInput"])
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent5, _scopeId4));
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
                                        "error-messages": unref(v$).nome_mae.$errors.map((e) => e.$message),
                                        label: "Nome da M\xE3e",
                                        required: "",
                                        onBlur: unref(v$).nome_mae.$touch,
                                        onInput: unref(v$).nome_mae.$touch
                                      }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages", "onBlur", "onInput"])
                                    ]),
                                    _: 1
                                  })
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                          _push4(ssrRenderComponent(VRow, null, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`<div${_scopeId4}><img class="ml-5" style="${ssrRenderStyle({ "cursor": "pointer" })}"${ssrRenderAttr("src", _imports_0$2)} alt="Sair"${_scopeId4}></div><div${_scopeId4}><img style="${ssrRenderStyle({ "cursor": "pointer" })}" class="ml-5"${ssrRenderAttr("src", _imports_1$1)}${_scopeId4}></div>`);
                              } else {
                                return [
                                  createVNode("div", null, [
                                    createVNode("img", {
                                      class: "ml-5",
                                      style: { "cursor": "pointer" },
                                      src: _imports_0$2,
                                      alt: "Sair",
                                      onClick: closeModal
                                    })
                                  ]),
                                  createVNode("div", null, [
                                    createVNode("img", {
                                      style: { "cursor": "pointer" },
                                      class: "ml-5",
                                      src: _imports_1$1,
                                      onClick: ($event) => onSubmit()
                                    }, null, 8, ["onClick"])
                                  ])
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
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
                                      modelValue: unref(state).nome,
                                      "onUpdate:modelValue": ($event) => unref(state).nome = $event,
                                      "error-messages": unref(v$).nome.$errors.map((e) => e.$message),
                                      label: "Nome",
                                      required: "",
                                      onBlur: unref(v$).nome.$touch,
                                      onInput: unref(v$).nome.$touch
                                    }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages", "onBlur", "onInput"])
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
                                      "error-messages": unref(v$).doc_identificacao.$errors.map((e) => e.$message),
                                      label: "CPF",
                                      required: "",
                                      onBlur: unref(v$).doc_identificacao.$touch,
                                      onInput: unref(v$).doc_identificacao.$touch
                                    }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages", "onBlur", "onInput"]), [
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
                                      modelValue: unref(state).tabvalores_estadocivil_id,
                                      "onUpdate:modelValue": ($event) => unref(state).tabvalores_estadocivil_id = $event,
                                      items: unref(dados).estadoCivilItems,
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
                                    createVNode(VTextField, {
                                      modelValue: unref(state).data_nascimento,
                                      "onUpdate:modelValue": ($event) => unref(state).data_nascimento = $event,
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
                                      modelValue: unref(state).tabvalores_capacidadecivil_id,
                                      "onUpdate:modelValue": ($event) => unref(state).tabvalores_capacidadecivil_id = $event,
                                      items: unref(dados).capacidadeCivilItems,
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
                                      items: unref(dados).cidadeNascimentoItems,
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
                                      "error-messages": unref(v$).nome_mae.$errors.map((e) => e.$message),
                                      label: "Nome da M\xE3e",
                                      required: "",
                                      onBlur: unref(v$).nome_mae.$touch,
                                      onInput: unref(v$).nome_mae.$touch
                                    }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages", "onBlur", "onInput"])
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }),
                            createVNode(VRow, null, {
                              default: withCtx(() => [
                                createVNode("div", null, [
                                  createVNode("img", {
                                    class: "ml-5",
                                    style: { "cursor": "pointer" },
                                    src: _imports_0$2,
                                    alt: "Sair",
                                    onClick: closeModal
                                  })
                                ]),
                                createVNode("div", null, [
                                  createVNode("img", {
                                    style: { "cursor": "pointer" },
                                    class: "ml-5",
                                    src: _imports_1$1,
                                    onClick: ($event) => onSubmit()
                                  }, null, 8, ["onClick"])
                                ])
                              ]),
                              _: 1
                            })
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
                    createVNode(VCardTitle, { class: "text-h5 mt-3" }, {
                      default: withCtx(() => [
                        createTextVNode("Criar Pessoa")
                      ]),
                      _: 1
                    }),
                    unref(status) === "pending" ? (openBlock(), createBlock(VProgressCircular, {
                      key: 0,
                      class: "loading-spinner",
                      indeterminate: "",
                      size: "64"
                    })) : unref(error) ? (openBlock(), createBlock("div", { key: 1 }, toDisplayString(unref(error).message), 1)) : createCommentVNode("", true),
                    unref(status) === "success" ? (openBlock(), createBlock(VContainer, {
                      key: 2,
                      class: "mt-5"
                    }, {
                      default: withCtx(() => [
                        createVNode(VRow, null, {
                          default: withCtx(() => [
                            createVNode(VCol, {
                              cols: "12",
                              md: "8"
                            }, {
                              default: withCtx(() => [
                                createVNode(VTextField, {
                                  modelValue: unref(state).nome,
                                  "onUpdate:modelValue": ($event) => unref(state).nome = $event,
                                  "error-messages": unref(v$).nome.$errors.map((e) => e.$message),
                                  label: "Nome",
                                  required: "",
                                  onBlur: unref(v$).nome.$touch,
                                  onInput: unref(v$).nome.$touch
                                }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages", "onBlur", "onInput"])
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
                                  "error-messages": unref(v$).doc_identificacao.$errors.map((e) => e.$message),
                                  label: "CPF",
                                  required: "",
                                  onBlur: unref(v$).doc_identificacao.$touch,
                                  onInput: unref(v$).doc_identificacao.$touch
                                }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages", "onBlur", "onInput"]), [
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
                                  modelValue: unref(state).tabvalores_estadocivil_id,
                                  "onUpdate:modelValue": ($event) => unref(state).tabvalores_estadocivil_id = $event,
                                  items: unref(dados).estadoCivilItems,
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
                                createVNode(VTextField, {
                                  modelValue: unref(state).data_nascimento,
                                  "onUpdate:modelValue": ($event) => unref(state).data_nascimento = $event,
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
                                  modelValue: unref(state).tabvalores_capacidadecivil_id,
                                  "onUpdate:modelValue": ($event) => unref(state).tabvalores_capacidadecivil_id = $event,
                                  items: unref(dados).capacidadeCivilItems,
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
                                  items: unref(dados).cidadeNascimentoItems,
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
                                  "error-messages": unref(v$).nome_mae.$errors.map((e) => e.$message),
                                  label: "Nome da M\xE3e",
                                  required: "",
                                  onBlur: unref(v$).nome_mae.$touch,
                                  onInput: unref(v$).nome_mae.$touch
                                }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages", "onBlur", "onInput"])
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        createVNode(VRow, null, {
                          default: withCtx(() => [
                            createVNode("div", null, [
                              createVNode("img", {
                                class: "ml-5",
                                style: { "cursor": "pointer" },
                                src: _imports_0$2,
                                alt: "Sair",
                                onClick: closeModal
                              })
                            ]),
                            createVNode("div", null, [
                              createVNode("img", {
                                style: { "cursor": "pointer" },
                                class: "ml-5",
                                src: _imports_1$1,
                                onClick: ($event) => onSubmit()
                              }, null, 8, ["onClick"])
                            ])
                          ]),
                          _: 1
                        })
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
              createVNode(VCard, null, {
                default: withCtx(() => [
                  createVNode(VCardTitle, { class: "text-h5 mt-3" }, {
                    default: withCtx(() => [
                      createTextVNode("Criar Pessoa")
                    ]),
                    _: 1
                  }),
                  unref(status) === "pending" ? (openBlock(), createBlock(VProgressCircular, {
                    key: 0,
                    class: "loading-spinner",
                    indeterminate: "",
                    size: "64"
                  })) : unref(error) ? (openBlock(), createBlock("div", { key: 1 }, toDisplayString(unref(error).message), 1)) : createCommentVNode("", true),
                  unref(status) === "success" ? (openBlock(), createBlock(VContainer, {
                    key: 2,
                    class: "mt-5"
                  }, {
                    default: withCtx(() => [
                      createVNode(VRow, null, {
                        default: withCtx(() => [
                          createVNode(VCol, {
                            cols: "12",
                            md: "8"
                          }, {
                            default: withCtx(() => [
                              createVNode(VTextField, {
                                modelValue: unref(state).nome,
                                "onUpdate:modelValue": ($event) => unref(state).nome = $event,
                                "error-messages": unref(v$).nome.$errors.map((e) => e.$message),
                                label: "Nome",
                                required: "",
                                onBlur: unref(v$).nome.$touch,
                                onInput: unref(v$).nome.$touch
                              }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages", "onBlur", "onInput"])
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
                                "error-messages": unref(v$).doc_identificacao.$errors.map((e) => e.$message),
                                label: "CPF",
                                required: "",
                                onBlur: unref(v$).doc_identificacao.$touch,
                                onInput: unref(v$).doc_identificacao.$touch
                              }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages", "onBlur", "onInput"]), [
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
                                modelValue: unref(state).tabvalores_estadocivil_id,
                                "onUpdate:modelValue": ($event) => unref(state).tabvalores_estadocivil_id = $event,
                                items: unref(dados).estadoCivilItems,
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
                              createVNode(VTextField, {
                                modelValue: unref(state).data_nascimento,
                                "onUpdate:modelValue": ($event) => unref(state).data_nascimento = $event,
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
                                modelValue: unref(state).tabvalores_capacidadecivil_id,
                                "onUpdate:modelValue": ($event) => unref(state).tabvalores_capacidadecivil_id = $event,
                                items: unref(dados).capacidadeCivilItems,
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
                                items: unref(dados).cidadeNascimentoItems,
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
                                "error-messages": unref(v$).nome_mae.$errors.map((e) => e.$message),
                                label: "Nome da M\xE3e",
                                required: "",
                                onBlur: unref(v$).nome_mae.$touch,
                                onInput: unref(v$).nome_mae.$touch
                              }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages", "onBlur", "onInput"])
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(VRow, null, {
                        default: withCtx(() => [
                          createVNode("div", null, [
                            createVNode("img", {
                              class: "ml-5",
                              style: { "cursor": "pointer" },
                              src: _imports_0$2,
                              alt: "Sair",
                              onClick: closeModal
                            })
                          ]),
                          createVNode("div", null, [
                            createVNode("img", {
                              style: { "cursor": "pointer" },
                              class: "ml-5",
                              src: _imports_1$1,
                              onClick: ($event) => onSubmit()
                            }, null, 8, ["onClick"])
                          ])
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })) : createCommentVNode("", true)
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
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Modal/RegistroPessoas.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _imports_0 = "" + buildAssetsURL("ficha.DrpzE7Jr.png");
const _sfc_main$1 = {
  __name: "FichaCard",
  __ssrInlineRender: true,
  props: {
    show: Boolean
  },
  emits: ["close", "confirmar"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const isVisible = ref(props.show);
    const emit = __emit;
    watch(
      () => props.show,
      (newVal) => {
        isVisible.value = newVal;
      }
    );
    const confirmarRecebimento = () => {
      emit("confirmar");
      closeModal();
    };
    const closeModal = () => {
      isVisible.value = false;
      emit("close");
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(VDialog, mergeProps({
        persistent: "",
        modelValue: unref(isVisible),
        "onUpdate:modelValue": ($event) => isRef(isVisible) ? isVisible.value = $event : null,
        per: "",
        "max-width": "700"
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VCard, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VCardTitle, { class: "text-h5" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Ficha de Firma`);
                      } else {
                        return [
                          createTextVNode("Ficha de Firma")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VImg, { src: _imports_0 }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VCardActions, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VBtn, {
                          style: { "background-color": "#429946", "color": "white" },
                          onClick: confirmarRecebimento
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Confirmar`);
                            } else {
                              return [
                                createTextVNode("Confirmar")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VBtn, {
                          style: { "background-color": "red", "color": "white" },
                          onClick: closeModal
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Cancelar`);
                            } else {
                              return [
                                createTextVNode("Cancelar")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VBtn, {
                            style: { "background-color": "#429946", "color": "white" },
                            onClick: confirmarRecebimento
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Confirmar")
                            ]),
                            _: 1
                          }),
                          createVNode(VBtn, {
                            style: { "background-color": "red", "color": "white" },
                            onClick: closeModal
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Cancelar")
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
                    createVNode(VCardTitle, { class: "text-h5" }, {
                      default: withCtx(() => [
                        createTextVNode("Ficha de Firma")
                      ]),
                      _: 1
                    }),
                    createVNode(VImg, { src: _imports_0 }),
                    createVNode(VCardActions, null, {
                      default: withCtx(() => [
                        createVNode(VBtn, {
                          style: { "background-color": "#429946", "color": "white" },
                          onClick: confirmarRecebimento
                        }, {
                          default: withCtx(() => [
                            createTextVNode("Confirmar")
                          ]),
                          _: 1
                        }),
                        createVNode(VBtn, {
                          style: { "background-color": "red", "color": "white" },
                          onClick: closeModal
                        }, {
                          default: withCtx(() => [
                            createTextVNode("Cancelar")
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
                  createVNode(VCardTitle, { class: "text-h5" }, {
                    default: withCtx(() => [
                      createTextVNode("Ficha de Firma")
                    ]),
                    _: 1
                  }),
                  createVNode(VImg, { src: _imports_0 }),
                  createVNode(VCardActions, null, {
                    default: withCtx(() => [
                      createVNode(VBtn, {
                        style: { "background-color": "#429946", "color": "white" },
                        onClick: confirmarRecebimento
                      }, {
                        default: withCtx(() => [
                          createTextVNode("Confirmar")
                        ]),
                        _: 1
                      }),
                      createVNode(VBtn, {
                        style: { "background-color": "red", "color": "white" },
                        onClick: closeModal
                      }, {
                        default: withCtx(() => [
                          createTextVNode("Cancelar")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Modal/FichaCard.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "semelhanca",
  __ssrInlineRender: true,
  props: {
    ato_token: {
      type: String,
      required: true
    }
  },
  async setup(__props) {
    let __temp, __restore;
    const props = __props;
    const router = useRouter$1();
    const route = useRoute$1();
    const config = useRuntimeConfig();
    const allEscreventes = `${config.public.managemant}/listarEscrevente`;
    const procurarPessoa = `${config.public.managemant}/pesquisarPessoas`;
    const reconhecerPessoa = `${config.public.managemant}/atoReconhecimento`;
    const etiquetaSemelhanca = `${config.public.managemant}/etiquetaReconhecimento`;
    const cartorio_token = ref(useCookie("user-data").value.cartorio_token);
    const ordemserv_token = ref(useCookie("user-service").value.token).value || ref(useCookie("user-service").value).value;
    const usuario_token = useCookie("auth_token").value;
    const pessoasItems = ref([]);
    const selectedPessoasSemelhanca = ref([]);
    const escreventesItems = ref([]);
    const selectedObjects = ref([]);
    const errorModalVisible = ref(false);
    const isModalRegistroOpen = ref(false);
    const isModalFichaOpen = ref(false);
    const selectedItem = ref(null);
    const errorMessage = ref("");
    const headers = [
      {
        title: "Documento",
        align: "start",
        key: "documento"
      },
      {
        title: "Pessoa",
        align: "start",
        key: "nome"
      },
      { value: "actions" }
    ];
    const state = reactive({
      quantidade: 1,
      escrevente: null,
      nome: null,
      documento: null
    });
    const rules = {
      escrevente: {
        required: helpers.withMessage("O campo \xE9 obrigatorio", required)
      }
    };
    const v$ = useVuelidate(rules, state);
    const { data } = ([__temp, __restore] = withAsyncContext(() => useFetch(allEscreventes, {
      method: "POST",
      body: { cartorio_token }
    }, "$iEFsIjdWdW")), __temp = await __temp, __restore(), __temp);
    escreventesItems.value = data.value[0].func_json_escreventes;
    async function searchPessoasService() {
      try {
        const { data: pessoasData, error } = await useFetch(procurarPessoa, {
          method: "POST",
          body: {
            cartorio_token: cartorio_token.value,
            documento: state.documento,
            nome: state.nome
          }
        }, "$uzKb8LPV3v");
        if (pessoasData.value.length > 0) {
          pessoasItems.value = pessoasData.value;
        } else {
          pessoasItems.value = [];
        }
      } catch (error) {
        console.error("Erro na requisi\xE7\xE3o", error);
      }
    }
    const createPessoa = () => {
      isModalRegistroOpen.value = true;
    };
    function confirmItem(item) {
      selectedObjects.value.push(item);
    }
    const redirectToFicha = (item) => {
      selectedItem.value = item;
      isModalFichaOpen.value = true;
    };
    function removeFormValueFromTable(item) {
      selectedObjects.value = selectedObjects.value.filter(
        (pessoa) => pessoa.pessoa_token !== item.pessoa_token
      );
      selectedPessoasSemelhanca.value = selectedPessoasSemelhanca.value.filter(
        (pessoa) => pessoa !== `${item.nome}-${item.documento}-${item.pessoa_token}`
      );
    }
    async function reconhecerAtoSemelhanca() {
      if (await v$.value.$validate()) {
        const selectedTokens = selectedObjects.value.map((item) => {
          return { pessoa_token: item.pessoa_token };
        });
        try {
          const { data: data2, error, status } = await useFetch(reconhecerPessoa, {
            method: "POST",
            body: {
              pessoas: selectedTokens,
              cartorio_token: cartorio_token.value,
              ordemserv_token,
              quantidade: state.quantidade,
              usuario_token,
              ato_tipo_token: props.ato_token
            }
          }, "$MulQmK1LAp");
          if (status.value === "success" && data2.value[0].status === "OK") {
            reconhecerEtiquetaSemelhanca(data2.value[0].token);
          } else {
            errorModalVisible.value = true;
            errorMessage.value = ato_token.value.status_mensagem || error.value.data.details;
          }
        } catch (error) {
          console.error("Erro na requisi\xE7\xE3o", error);
        }
      }
    }
    async function reconhecerEtiquetaSemelhanca(token) {
      try {
        const { data: data2, error, status } = await useFetch(etiquetaSemelhanca, {
          method: "POST",
          body: {
            ato_token: token,
            cartorio_token: cartorio_token.value,
            escrevente_token: state.escrevente
          }
        }, "$fMGlIlw995");
        if (status.value === "success") {
          const newWindow = (void 0).open("", "_blank");
          newWindow.document.open();
          newWindow.document.write(data2.value[0].etiqueta);
          newWindow.document.close();
        }
      } catch (error) {
        console.error("Erro na requisi\xE7\xE3o", error);
      }
    }
    const goBack = () => {
      const origem = route.query.origem || "criar";
      const id = route.query.id;
      if (origem === "atualizar") {
        router.push(`/ordens-servicos/atualizar/${id}`);
      } else {
        router.push("/ordens-servicos/criar-registro");
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ModalRegistroPessoas = _sfc_main$2;
      const _component_ModalFichaCard = _sfc_main$1;
      const _component_NuxtLink = __nuxt_component_0;
      const _component_ErrorModalCard = _sfc_main$3;
      _push(`<!--[--><h1>Reconhecimento por Semelhan\xE7a</h1>`);
      _push(ssrRenderComponent(VRow, { class: "mt-5" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VCol, { cols: "5" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VAutocomplete, {
                    label: "Tabeli\xE3o/escrevente",
                    modelValue: unref(state).escrevente,
                    "onUpdate:modelValue": ($event) => unref(state).escrevente = $event,
                    items: unref(escreventesItems),
                    "item-title": "nome",
                    "item-value": "token",
                    required: "",
                    "error-messages": unref(v$).escrevente.$errors.map((e) => e.$message),
                    onBlur: unref(v$).escrevente.$touch,
                    onInput: unref(v$).escrevente.$touch
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VAutocomplete, {
                      label: "Tabeli\xE3o/escrevente",
                      modelValue: unref(state).escrevente,
                      "onUpdate:modelValue": ($event) => unref(state).escrevente = $event,
                      items: unref(escreventesItems),
                      "item-title": "nome",
                      "item-value": "token",
                      required: "",
                      "error-messages": unref(v$).escrevente.$errors.map((e) => e.$message),
                      onBlur: unref(v$).escrevente.$touch,
                      onInput: unref(v$).escrevente.$touch
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "items", "error-messages", "onBlur", "onInput"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(VCol, { cols: "2" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VTextField, {
                    label: "Quantidade",
                    type: "number",
                    modelValue: unref(state).quantidade,
                    "onUpdate:modelValue": ($event) => unref(state).quantidade = $event
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VTextField, {
                      label: "Quantidade",
                      type: "number",
                      modelValue: unref(state).quantidade,
                      "onUpdate:modelValue": ($event) => unref(state).quantidade = $event
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(VCol, { cols: "5" }, {
                default: withCtx(() => [
                  createVNode(VAutocomplete, {
                    label: "Tabeli\xE3o/escrevente",
                    modelValue: unref(state).escrevente,
                    "onUpdate:modelValue": ($event) => unref(state).escrevente = $event,
                    items: unref(escreventesItems),
                    "item-title": "nome",
                    "item-value": "token",
                    required: "",
                    "error-messages": unref(v$).escrevente.$errors.map((e) => e.$message),
                    onBlur: unref(v$).escrevente.$touch,
                    onInput: unref(v$).escrevente.$touch
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "items", "error-messages", "onBlur", "onInput"])
                ]),
                _: 1
              }),
              createVNode(VCol, { cols: "2" }, {
                default: withCtx(() => [
                  createVNode(VTextField, {
                    label: "Quantidade",
                    type: "number",
                    modelValue: unref(state).quantidade,
                    "onUpdate:modelValue": ($event) => unref(state).quantidade = $event
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(VRow, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VCol, { cols: "3" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VTextField, {
                    label: "Documento",
                    modelValue: unref(state).documento,
                    "onUpdate:modelValue": ($event) => unref(state).documento = $event
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VTextField, {
                      label: "Documento",
                      modelValue: unref(state).documento,
                      "onUpdate:modelValue": ($event) => unref(state).documento = $event
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(VCol, { cols: "4" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VTextField, {
                    label: "Pessoa",
                    modelValue: unref(state).nome,
                    "onUpdate:modelValue": ($event) => unref(state).nome = $event
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VTextField, {
                      label: "Pessoa",
                      modelValue: unref(state).nome,
                      "onUpdate:modelValue": ($event) => unref(state).nome = $event
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<div${_scopeId}><img class="btn-pointer mt-3"${ssrRenderAttr("src", _imports_1)} style="${ssrRenderStyle({ "width": "40px", "cursor": "pointer" })}" title="Pesquisar Pessoa"${_scopeId}></div><div${_scopeId}><img class="btn-pointer mt-3 ml-2"${ssrRenderAttr("src", _imports_0$1)} style="${ssrRenderStyle({ "width": "40px", "cursor": "pointer" })}" title="Criar Pessoa"${_scopeId}></div>`);
          } else {
            return [
              createVNode(VCol, { cols: "3" }, {
                default: withCtx(() => [
                  createVNode(VTextField, {
                    label: "Documento",
                    modelValue: unref(state).documento,
                    "onUpdate:modelValue": ($event) => unref(state).documento = $event
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              }),
              createVNode(VCol, { cols: "4" }, {
                default: withCtx(() => [
                  createVNode(VTextField, {
                    label: "Pessoa",
                    modelValue: unref(state).nome,
                    "onUpdate:modelValue": ($event) => unref(state).nome = $event
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              }),
              createVNode("div", null, [
                createVNode("img", {
                  class: "btn-pointer mt-3",
                  src: _imports_1,
                  style: { "width": "40px", "cursor": "pointer" },
                  title: "Pesquisar Pessoa",
                  onClick: searchPessoasService
                })
              ]),
              createVNode("div", null, [
                createVNode("img", {
                  class: "btn-pointer mt-3 ml-2",
                  src: _imports_0$1,
                  style: { "width": "40px", "cursor": "pointer" },
                  title: "Criar Pessoa",
                  onClick: createPessoa
                })
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(VRow, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VCol, { class: "mr-10" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VDataTable, {
                    style: { "height": "465px" },
                    headers,
                    items: unref(pessoasItems)
                  }, {
                    "item.actions": withCtx(({ item }, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div style="${ssrRenderStyle({ "display": "flex", "cursor": "pointer", "justify-content": "flex-end" })}" title="Visualizar Ficha"${_scopeId3}><img style="${ssrRenderStyle({ "width": "30px", "height": "30px" })}"${ssrRenderAttr("src", _imports_1)} alt="Visualizar"${_scopeId3}></div>`);
                      } else {
                        return [
                          createVNode("div", {
                            style: { "display": "flex", "cursor": "pointer", "justify-content": "flex-end" },
                            onClick: ($event) => redirectToFicha(item),
                            title: "Visualizar Ficha"
                          }, [
                            createVNode("img", {
                              style: { "width": "30px", "height": "30px" },
                              src: _imports_1,
                              alt: "Visualizar"
                            })
                          ], 8, ["onClick"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VDataTable, {
                      style: { "height": "465px" },
                      headers,
                      items: unref(pessoasItems)
                    }, {
                      "item.actions": withCtx(({ item }) => [
                        createVNode("div", {
                          style: { "display": "flex", "cursor": "pointer", "justify-content": "flex-end" },
                          onClick: ($event) => redirectToFicha(item),
                          title: "Visualizar Ficha"
                        }, [
                          createVNode("img", {
                            style: { "width": "30px", "height": "30px" },
                            src: _imports_1,
                            alt: "Visualizar"
                          })
                        ], 8, ["onClick"])
                      ]),
                      _: 1
                    }, 8, ["items"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(VCol, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VDataTable, {
                    headers,
                    items: unref(selectedObjects),
                    style: { "height": "465px" },
                    "item-key": "id"
                  }, {
                    "item.actions": withCtx(({ item }, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div style="${ssrRenderStyle({ "display": "flex", "justify-content": "flex-end" })}" title="Remover"${_scopeId3}><img style="${ssrRenderStyle({ "width": "30px", "height": "30px", "cursor": "pointer" })}"${ssrRenderAttr("src", _imports_4)} alt="Remover"${_scopeId3}></div>`);
                      } else {
                        return [
                          createVNode("div", {
                            style: { "display": "flex", "justify-content": "flex-end" },
                            onClick: ($event) => removeFormValueFromTable(item),
                            title: "Remover"
                          }, [
                            createVNode("img", {
                              style: { "width": "30px", "height": "30px", "cursor": "pointer" },
                              src: _imports_4,
                              alt: "Remover"
                            })
                          ], 8, ["onClick"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VDataTable, {
                      headers,
                      items: unref(selectedObjects),
                      style: { "height": "465px" },
                      "item-key": "id"
                    }, {
                      "item.actions": withCtx(({ item }) => [
                        createVNode("div", {
                          style: { "display": "flex", "justify-content": "flex-end" },
                          onClick: ($event) => removeFormValueFromTable(item),
                          title: "Remover"
                        }, [
                          createVNode("img", {
                            style: { "width": "30px", "height": "30px", "cursor": "pointer" },
                            src: _imports_4,
                            alt: "Remover"
                          })
                        ], 8, ["onClick"])
                      ]),
                      _: 1
                    }, 8, ["items"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(VCol, { class: "mr-10" }, {
                default: withCtx(() => [
                  createVNode(VDataTable, {
                    style: { "height": "465px" },
                    headers,
                    items: unref(pessoasItems)
                  }, {
                    "item.actions": withCtx(({ item }) => [
                      createVNode("div", {
                        style: { "display": "flex", "cursor": "pointer", "justify-content": "flex-end" },
                        onClick: ($event) => redirectToFicha(item),
                        title: "Visualizar Ficha"
                      }, [
                        createVNode("img", {
                          style: { "width": "30px", "height": "30px" },
                          src: _imports_1,
                          alt: "Visualizar"
                        })
                      ], 8, ["onClick"])
                    ]),
                    _: 1
                  }, 8, ["items"])
                ]),
                _: 1
              }),
              createVNode(VCol, null, {
                default: withCtx(() => [
                  createVNode(VDataTable, {
                    headers,
                    items: unref(selectedObjects),
                    style: { "height": "465px" },
                    "item-key": "id"
                  }, {
                    "item.actions": withCtx(({ item }) => [
                      createVNode("div", {
                        style: { "display": "flex", "justify-content": "flex-end" },
                        onClick: ($event) => removeFormValueFromTable(item),
                        title: "Remover"
                      }, [
                        createVNode("img", {
                          style: { "width": "30px", "height": "30px", "cursor": "pointer" },
                          src: _imports_4,
                          alt: "Remover"
                        })
                      ], 8, ["onClick"])
                    ]),
                    _: 1
                  }, 8, ["items"])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_ModalRegistroPessoas, {
        show: unref(isModalRegistroOpen),
        onClose: ($event) => isModalRegistroOpen.value = false
      }, null, _parent));
      _push(ssrRenderComponent(_component_ModalFichaCard, {
        show: unref(isModalFichaOpen),
        item: unref(selectedItem),
        onConfirmar: ($event) => confirmItem(unref(selectedItem)),
        onClose: ($event) => isModalFichaOpen.value = false
      }, null, _parent));
      _push(ssrRenderComponent(VRow, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_NuxtLink, { onClick: goBack }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<img class="btn-pointer mt-10 mb-5"${ssrRenderAttr("src", _imports_0$2)} alt="Sair" style="${ssrRenderStyle({ "cursor": "pointer" })}"${_scopeId2}>`);
                } else {
                  return [
                    createVNode("img", {
                      class: "btn-pointer mt-10 mb-5",
                      src: _imports_0$2,
                      alt: "Sair",
                      style: { "cursor": "pointer" }
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<div${_scopeId}><img class="mt-10 mb-5 ml-10" style="${ssrRenderStyle({ "cursor": "pointer" })}"${ssrRenderAttr("src", _imports_1$1)}${_scopeId}></div>`);
          } else {
            return [
              createVNode(_component_NuxtLink, { onClick: goBack }, {
                default: withCtx(() => [
                  createVNode("img", {
                    class: "btn-pointer mt-10 mb-5",
                    src: _imports_0$2,
                    alt: "Sair",
                    style: { "cursor": "pointer" }
                  })
                ]),
                _: 1
              }),
              createVNode("div", null, [
                createVNode("img", {
                  class: "mt-10 mb-5 ml-10",
                  onClick: reconhecerAtoSemelhanca,
                  style: { "cursor": "pointer" },
                  src: _imports_1$1
                })
              ])
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
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/fontes/atos/reconhecimento/semelhanca.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=semelhanca-BQbXQNkJ.mjs.map
