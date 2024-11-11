import { ref, reactive, watch, withAsyncContext, resolveDirective, mergeProps, unref, isRef, withCtx, createTextVNode, createVNode, withDirectives, openBlock, createBlock, toDisplayString, createCommentVNode, useSSRContext } from 'vue';
import { f as useNuxtApp, d as useCookie, at as VProgressCircular, V as VTextField, an as VImg, e as VBtn, b as useRuntimeConfig } from './server.mjs';
import { a as useLazyAsyncData, u as useFetch } from './fetch-Dsyde8UD.mjs';
import { ssrRenderComponent, ssrInterpolate, ssrGetDirectiveProps, ssrRenderStyle, ssrRenderAttr } from 'vue/server-renderer';
import { _ as _imports_0 } from './sair-CV1ySkp8.mjs';
import { V as VAutocomplete, _ as _imports_1 } from './salvar-DRINGrxl.mjs';
import { useVuelidate } from '@vuelidate/core';
import { helpers, required } from '@vuelidate/validators';
import { c as cpf } from './validaCpf-DuucUl6O.mjs';
import { V as VDialog, a as VCard, b as VCardTitle, c as VCardActions } from './VCard-DfTYaOUe.mjs';
import { V as VContainer } from './VContainer-chgtNZst.mjs';
import { V as VRow } from './VRow-BuaJrtx0.mjs';
import { V as VCol } from './VCol-uBIoF0At.mjs';

const _sfc_main$1 = {
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
                                _push5(`<div${_scopeId4}><img class="ml-5" style="${ssrRenderStyle({ "cursor": "pointer" })}"${ssrRenderAttr("src", _imports_0)} alt="Sair"${_scopeId4}></div><div${_scopeId4}><img style="${ssrRenderStyle({ "cursor": "pointer" })}" class="ml-5"${ssrRenderAttr("src", _imports_1)}${_scopeId4}></div>`);
                              } else {
                                return [
                                  createVNode("div", null, [
                                    createVNode("img", {
                                      class: "ml-5",
                                      style: { "cursor": "pointer" },
                                      src: _imports_0,
                                      alt: "Sair",
                                      onClick: closeModal
                                    })
                                  ]),
                                  createVNode("div", null, [
                                    createVNode("img", {
                                      style: { "cursor": "pointer" },
                                      class: "ml-5",
                                      src: _imports_1,
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
                                    src: _imports_0,
                                    alt: "Sair",
                                    onClick: closeModal
                                  })
                                ]),
                                createVNode("div", null, [
                                  createVNode("img", {
                                    style: { "cursor": "pointer" },
                                    class: "ml-5",
                                    src: _imports_1,
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
                                src: _imports_0,
                                alt: "Sair",
                                onClick: closeModal
                              })
                            ]),
                            createVNode("div", null, [
                              createVNode("img", {
                                style: { "cursor": "pointer" },
                                class: "ml-5",
                                src: _imports_1,
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
                              src: _imports_0,
                              alt: "Sair",
                              onClick: closeModal
                            })
                          ]),
                          createVNode("div", null, [
                            createVNode("img", {
                              style: { "cursor": "pointer" },
                              class: "ml-5",
                              src: _imports_1,
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
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Modal/RegistroPessoas.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "FichaCard",
  __ssrInlineRender: true,
  props: {
    show: Boolean,
    item: Object
  },
  emits: ["close", "confirmar"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const config = useRuntimeConfig();
    const buscarPessoa = `${config.public.managemant}/getLinkTipo`;
    const isVisible = ref(props.show);
    const fichaRender = ref();
    const emit = __emit;
    watch(
      () => props.show,
      async (newVal) => {
        isVisible.value = newVal;
        await beforeOpenFicha();
      }
    );
    const confirmarRecebimento = () => {
      emit("confirmar");
      closeModal();
    };
    const beforeOpenFicha = async () => {
      try {
        const { data: imagemBiometria } = await useFetch(
          `${buscarPessoa}`,
          {
            method: "POST",
            body: { id: props.item.id, tipo: "ficha" }
          },
          "$4omB3S9Tg3"
        );
        if (imagemBiometria.value && imagemBiometria.value.link) {
          fichaRender.value = `data:image/jpeg;base64,${imagemBiometria.value.link}`;
        } else {
          fichaRender.value = null;
        }
      } catch (error) {
        console.error("Erro ao buscar a imagem da ficha:", error);
      }
    };
    const closeModal = () => {
      isVisible.value = false;
      fichaRender.value = null;
      emit("close");
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(VDialog, mergeProps({
        persistent: "",
        modelValue: unref(isVisible),
        "onUpdate:modelValue": ($event) => isRef(isVisible) ? isVisible.value = $event : null,
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
                  _push3(ssrRenderComponent(VImg, { src: unref(fichaRender) }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VCardActions, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VBtn, {
                          style: { "background-color": "#429946", "color": "white" },
                          onClick: confirmarRecebimento
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Reconhecer`);
                            } else {
                              return [
                                createTextVNode("Reconhecer")
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
                              _push5(`Voltar`);
                            } else {
                              return [
                                createTextVNode("Voltar")
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
                              createTextVNode("Reconhecer")
                            ]),
                            _: 1
                          }),
                          createVNode(VBtn, {
                            style: { "background-color": "red", "color": "white" },
                            onClick: closeModal
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
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VCardTitle, { class: "text-h5" }, {
                      default: withCtx(() => [
                        createTextVNode("Ficha de Firma")
                      ]),
                      _: 1
                    }),
                    createVNode(VImg, { src: unref(fichaRender) }, null, 8, ["src"]),
                    createVNode(VCardActions, null, {
                      default: withCtx(() => [
                        createVNode(VBtn, {
                          style: { "background-color": "#429946", "color": "white" },
                          onClick: confirmarRecebimento
                        }, {
                          default: withCtx(() => [
                            createTextVNode("Reconhecer")
                          ]),
                          _: 1
                        }),
                        createVNode(VBtn, {
                          style: { "background-color": "red", "color": "white" },
                          onClick: closeModal
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
                  createVNode(VImg, { src: unref(fichaRender) }, null, 8, ["src"]),
                  createVNode(VCardActions, null, {
                    default: withCtx(() => [
                      createVNode(VBtn, {
                        style: { "background-color": "#429946", "color": "white" },
                        onClick: confirmarRecebimento
                      }, {
                        default: withCtx(() => [
                          createTextVNode("Reconhecer")
                        ]),
                        _: 1
                      }),
                      createVNode(VBtn, {
                        style: { "background-color": "red", "color": "white" },
                        onClick: closeModal
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Modal/FichaCard.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main$1 as _, _sfc_main as a };
//# sourceMappingURL=FichaCard-Cb7DAirv.mjs.map
