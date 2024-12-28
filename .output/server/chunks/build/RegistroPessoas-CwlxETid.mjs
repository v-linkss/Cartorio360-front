import { u as useRouter$1, f as useNuxtApp, d as useCookie, at as VProgressCircular, V as VTextField, e as VBtn, as as VDataTable, b as useRuntimeConfig } from './server.mjs';
import { ref, reactive, withAsyncContext, resolveDirective, unref, withCtx, createVNode, mergeProps, withDirectives, createTextVNode, useSSRContext, openBlock, createBlock, watch, isRef, createCommentVNode } from 'vue';
import { b as useLazyAsyncData, u as useFetch } from './fetch-bT3G74K0.mjs';
import { ssrRenderComponent, ssrInterpolate, ssrGetDirectiveProps, ssrRenderAttr, ssrRenderStyle } from 'vue/server-renderer';
import { useVuelidate } from '@vuelidate/core';
import { helpers, required } from '@vuelidate/validators';
import { V as VContainer } from './VContainer-Dd724oJ4.mjs';
import { V as VRow } from './VRow-CVrt2SWs.mjs';
import { V as VCol } from './VCol-DvbNDJG_.mjs';
import { V as VAutocomplete } from './VAutocomplete-D1-afj5_.mjs';
import { V as VTabs, a as VTab, b as VTabsWindow, c as VTabsWindowItem, _ as _sfc_main$7, d as _sfc_main$6, e as _sfc_main$1$1, f as __nuxt_component_6 } from './Restricoes-CBy3G873.mjs';
import { _ as __nuxt_component_0 } from './nuxt-link-DyZc7qn_.mjs';
import { a as VDialog, V as VCard } from './VCard-uMKFEuGZ.mjs';
import { _ as _imports_1 } from './visualizar-BoZ30DMV.mjs';
import { _ as _imports_0, b as _imports_2, c as _imports_3 } from './mudarStatus-CVlVNUDw.mjs';

const cpf = helpers.withMessage("CPF inv\xE1lido", (value) => {
  if (!value)
    return false;
  const cpf2 = value.replace(/[^\d]+/g, "");
  if (cpf2.length !== 11)
    return false;
  if (/^(\d)\1+$/.test(cpf2))
    return false;
  let add = 0;
  for (let i = 0; i < 9; i++) {
    add += parseInt(cpf2.charAt(i)) * (10 - i);
  }
  let rev = 11 - add % 11;
  if (rev === 10 || rev === 11)
    rev = 0;
  if (rev !== parseInt(cpf2.charAt(9)))
    return false;
  add = 0;
  for (let i = 0; i < 10; i++) {
    add += parseInt(cpf2.charAt(i)) * (11 - i);
  }
  rev = 11 - add % 11;
  if (rev === 10 || rev === 11)
    rev = 0;
  if (rev !== parseInt(cpf2.charAt(10)))
    return false;
  return true;
});

const _sfc_main$3 = {
  __name: "Dados",
  __ssrInlineRender: true,
  props: {
    isModal: {
      type: Boolean,
      default: false
    }
  },
  emits: ["saved", "close-modal"],
  async setup(__props, { emit: __emit }) {
    let __temp, __restore;
    const props2 = __props;
    const emit2 = __emit;
    const router2 = useRouter$1();
    const { $toast } = useNuxtApp();
    const config = useRuntimeConfig();
    const createPessoa = `${config.public.managemant}/createPessoa`;
    const updatePessoa = `${config.public.managemant}/updatePessoa`;
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
    const isEditMode = ref(false);
    const pessoaId = useCookie("pessoa-id");
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
    const {
      data: dados,
      status,
      pending,
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
        }, "$fcbWHpl5XR");
        if (status2.value === "error" && error2.value.statusCode === 500) {
          $toast.error("Erro ao cadastrar pessoa,o CPF j\xE1 est\xE1 cadastrado.");
        } else {
          $toast.success("Pessoa cadastrada com sucesso!");
          const pessoaIdValue = data.value.id;
          pessoaId.value = pessoaIdValue;
          const pessoa_token = useCookie("pessoa_token");
          pessoa_token.value = data.value.token;
          isEditMode.value = true;
          emit2("saved");
        }
      } else {
        $toast.error("Erro ao cadastrar pessoa, preencha os campos obrigatorios.");
      }
    }
    async function onUpdate() {
      const payload = { ...state };
      for (const key in payload) {
        if (payload[key] === "") {
          payload[key] = null;
        }
      }
      const payloadFormated = {
        ...payload,
        doc_identificacao: removeFormatting(state.doc_identificacao),
        cpf_mae: removeFormatting(state.cpf_mae)
      };
      const { data, error: error2, status: status2 } = await useFetch(
        `${updatePessoa}/${pessoaId.value}`,
        {
          method: "PUT",
          body: payloadFormated
        },
        "$S30ZRYxneo"
      );
      if (status2.value === "success") {
        if (props2.isModal === true) {
          $toast.success("Pessoa atualizada com sucesso!");
          emit2("close-modal");
          return;
        }
        $toast.success("Pessoa atualizada com sucesso!");
        router2.push("/pessoas/lista");
      }
    }
    const voltar = () => {
      if (props2.isModal === true) {
        emit2("close-modal");
        return;
      }
      router2.push("/pessoas/lista");
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _directive_mask = resolveDirective("mask");
      _push(`<!--[-->`);
      if (unref(pending)) {
        _push(ssrRenderComponent(VProgressCircular, {
          class: "loading-spinner",
          indeterminate: "",
          size: "64"
        }, null, _parent));
      } else if (unref(error)) {
        _push(`<div>${ssrInterpolate(unref(error).message)}</div>`);
      } else {
        _push(`<!---->`);
      }
      if (!unref(pending)) {
        _push(ssrRenderComponent(VContainer, null, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(VRow, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(VCol, { md: "8" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(VTextField, {
                            modelValue: unref(state).nome,
                            "onUpdate:modelValue": ($event) => unref(state).nome = $event,
                            "error-messages": unref(v$).nome.$errors.map((e) => e.$message),
                            label: "Nome",
                            required: "",
                            onBlur: unref(v$).nome.$touch,
                            onInput: unref(v$).nome.$touch
                          }, null, _parent4, _scopeId3));
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
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(VCol, { md: "4" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(VTextField, mergeProps({
                            modelValue: unref(state).doc_identificacao,
                            "onUpdate:modelValue": ($event) => unref(state).doc_identificacao = $event,
                            "error-messages": unref(v$).doc_identificacao.$errors.map((e) => e.$message),
                            label: "CPF",
                            required: "",
                            onBlur: unref(v$).doc_identificacao.$touch,
                            onInput: unref(v$).doc_identificacao.$touch
                          }, ssrGetDirectiveProps(_ctx, _directive_mask, "###.###.###-##")), null, _parent4, _scopeId3));
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
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(VCol, { md: "8" }, {
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
                      createVNode(VCol, { md: "4" }, {
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
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(VRow, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(VCol, { md: "4" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(VAutocomplete, {
                            modelValue: unref(state).tabvalores_estadocivil_id,
                            "onUpdate:modelValue": ($event) => unref(state).tabvalores_estadocivil_id = $event,
                            items: unref(dados).estadoCivilItems,
                            "item-title": "descricao",
                            "item-value": "id",
                            label: "Estado Civil"
                          }, null, _parent4, _scopeId3));
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
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(VCol, { md: "4" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(VTextField, {
                            modelValue: unref(state).profissao,
                            "onUpdate:modelValue": ($event) => unref(state).profissao = $event,
                            label: "Profiss\xE3o"
                          }, null, _parent4, _scopeId3));
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
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(VCol, { md: "4" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(VTextField, {
                            modelValue: unref(state).local_trabalho,
                            "onUpdate:modelValue": ($event) => unref(state).local_trabalho = $event,
                            label: "Local de trabalho"
                          }, null, _parent4, _scopeId3));
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
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(VCol, { md: "4" }, {
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
                      createVNode(VCol, { md: "4" }, {
                        default: withCtx(() => [
                          createVNode(VTextField, {
                            modelValue: unref(state).profissao,
                            "onUpdate:modelValue": ($event) => unref(state).profissao = $event,
                            label: "Profiss\xE3o"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        _: 1
                      }),
                      createVNode(VCol, { md: "4" }, {
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
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(VRow, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(VCol, { md: "4" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(VTextField, {
                            modelValue: unref(state).data_nascimento,
                            "onUpdate:modelValue": ($event) => unref(state).data_nascimento = $event,
                            type: "date",
                            "prepend-icon": "",
                            label: "Data de nascimento"
                          }, null, _parent4, _scopeId3));
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
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(VCol, { md: "4" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(VAutocomplete, {
                            modelValue: unref(state).tabvalores_capacidadecivil_id,
                            "onUpdate:modelValue": ($event) => unref(state).tabvalores_capacidadecivil_id = $event,
                            items: unref(dados).capacidadeCivilItems,
                            label: "Capacidade Civil",
                            "item-title": "descricao",
                            "item-value": "id"
                          }, null, _parent4, _scopeId3));
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
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(VCol, { md: "4" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(VAutocomplete, {
                            modelValue: unref(state).cidade_natural_id,
                            "onUpdate:modelValue": ($event) => unref(state).cidade_natural_id = $event,
                            items: unref(dados).cidadeNascimentoItems,
                            label: "Cidade de nascimento",
                            "item-title": "descricao",
                            "item-value": "id"
                          }, null, _parent4, _scopeId3));
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
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(VCol, { md: "4" }, {
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
                      createVNode(VCol, { md: "4" }, {
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
                      createVNode(VCol, { md: "4" }, {
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
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(VRow, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(VCol, { md: "4" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(VTextField, mergeProps({
                            modelValue: unref(state).cpf_pai,
                            "onUpdate:modelValue": ($event) => unref(state).cpf_pai = $event,
                            modelModifiers: { date: true },
                            label: "CPF do Pai"
                          }, ssrGetDirectiveProps(_ctx, _directive_mask, "###.###.###-##")), null, _parent4, _scopeId3));
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
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(VCol, { md: "4" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(VTextField, {
                            modelValue: unref(state).nome_pai,
                            "onUpdate:modelValue": ($event) => unref(state).nome_pai = $event,
                            modelModifiers: { date: true },
                            label: "Nome do Pai"
                          }, null, _parent4, _scopeId3));
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
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(VCol, { md: "4" }, {
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
                      createVNode(VCol, { md: "4" }, {
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
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(VRow, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(VCol, { md: "4" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(VTextField, mergeProps({
                            modelValue: unref(state).cpf_mae,
                            "onUpdate:modelValue": ($event) => unref(state).cpf_mae = $event,
                            modelModifiers: { date: true },
                            label: "CPF da M\xE3e"
                          }, ssrGetDirectiveProps(_ctx, _directive_mask, "###.###.###-##")), null, _parent4, _scopeId3));
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
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(VCol, { md: "4" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(VTextField, {
                            modelValue: unref(state).nome_mae,
                            "onUpdate:modelValue": ($event) => unref(state).nome_mae = $event,
                            modelModifiers: { date: true },
                            "error-messages": unref(v$).nome_mae.$errors.map((e) => e.$message),
                            label: "Nome da M\xE3e",
                            required: "",
                            onBlur: unref(v$).nome_mae.$touch,
                            onInput: unref(v$).nome_mae.$touch
                          }, null, _parent4, _scopeId3));
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
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(VCol, { md: "4" }, {
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
                      createVNode(VCol, { md: "4" }, {
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
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(VRow, { class: "mb-3" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(VBtn, {
                      onClick: voltar,
                      size: "large",
                      color: "red"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`Voltar`);
                        } else {
                          return [
                            createTextVNode("Voltar")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(VBtn, {
                      onClick: ($event) => unref(isEditMode) ? onUpdate() : onSubmit(),
                      class: "ml-4",
                      size: "large",
                      color: "green"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`Salvar`);
                        } else {
                          return [
                            createTextVNode("Salvar")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(VBtn, {
                        onClick: voltar,
                        size: "large",
                        color: "red"
                      }, {
                        default: withCtx(() => [
                          createTextVNode("Voltar")
                        ]),
                        _: 1
                      }),
                      createVNode(VBtn, {
                        onClick: ($event) => unref(isEditMode) ? onUpdate() : onSubmit(),
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
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(VRow, null, {
                  default: withCtx(() => [
                    createVNode(VCol, { md: "8" }, {
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
                    createVNode(VCol, { md: "4" }, {
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
                    createVNode(VCol, { md: "4" }, {
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
                    createVNode(VCol, { md: "4" }, {
                      default: withCtx(() => [
                        createVNode(VTextField, {
                          modelValue: unref(state).profissao,
                          "onUpdate:modelValue": ($event) => unref(state).profissao = $event,
                          label: "Profiss\xE3o"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, { md: "4" }, {
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
                    createVNode(VCol, { md: "4" }, {
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
                    createVNode(VCol, { md: "4" }, {
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
                    createVNode(VCol, { md: "4" }, {
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
                    createVNode(VCol, { md: "4" }, {
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
                    createVNode(VCol, { md: "4" }, {
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
                    createVNode(VCol, { md: "4" }, {
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
                    createVNode(VCol, { md: "4" }, {
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
                createVNode(VRow, { class: "mb-3" }, {
                  default: withCtx(() => [
                    createVNode(VBtn, {
                      onClick: voltar,
                      size: "large",
                      color: "red"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Voltar")
                      ]),
                      _: 1
                    }),
                    createVNode(VBtn, {
                      onClick: ($event) => unref(isEditMode) ? onUpdate() : onSubmit(),
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
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props2, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Dados.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props2, ctx) : void 0;
};
const cnpj = helpers.withMessage("CNPJ inv\xE1lido", (value) => {
  if (!value)
    return false;
  const cnpj2 = value.replace(/[^\d]+/g, "");
  if (cnpj2.length !== 14)
    return false;
  if (/^(\d)\1+$/.test(cnpj2))
    return false;
  let tamanho = cnpj2.length - 2;
  let numeros = cnpj2.substring(0, tamanho);
  const digitos = cnpj2.substring(tamanho);
  let soma = 0;
  let pos = tamanho - 7;
  for (let i = tamanho; i >= 1; i--) {
    soma += parseInt(numeros.charAt(tamanho - i), 10) * pos--;
    if (pos < 2)
      pos = 9;
  }
  let resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
  if (resultado !== parseInt(digitos.charAt(0), 10))
    return false;
  tamanho += 1;
  numeros = cnpj2.substring(0, tamanho);
  soma = 0;
  pos = tamanho - 7;
  for (let i = tamanho; i >= 1; i--) {
    soma += parseInt(numeros.charAt(tamanho - i), 10) * pos--;
    if (pos < 2)
      pos = 9;
  }
  resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
  return resultado === parseInt(digitos.charAt(1), 10);
});
const _sfc_main$2 = {
  __name: "DadosJuridica",
  __ssrInlineRender: true,
  props: {
    isModal: {
      type: Boolean,
      default: false
    }
  },
  emits: ["saved", "close-modal"],
  setup(__props, { emit: __emit }) {
    const props2 = __props;
    const emit2 = __emit;
    const router2 = useRouter$1();
    const { $toast } = useNuxtApp();
    const config = useRuntimeConfig();
    const createPessoa = `${config.public.managemant}/createPessoa`;
    const updatePessoa = `${config.public.managemant}/updatePessoa`;
    const initialState = {
      nome: null,
      nome_fantasia: null,
      inscricao_estadual: null,
      observacao: null,
      doc_identificacao: null,
      tipo_pessoa: "JURIDICA",
      cartorio_id: useCookie("user-data").value.cartorio_id,
      user_id: useCookie("user-data").value.usuario_id
    };
    const isEditMode = ref(false);
    const pessoaId = useCookie("pessoa-id");
    const state = reactive({
      ...initialState
    });
    function removeFormatting(value) {
      if (value) {
        return value.replace(/[.\-/]/g, "");
      } else {
        return null;
      }
    }
    const rules = {
      nome: {
        required: helpers.withMessage("O campo \xE9 obrigatorio", required)
      },
      doc_identificacao: {
        required: helpers.withMessage("O campo \xE9 obrigatorio", required),
        cnpj
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
          doc_identificacao: removeFormatting(state.doc_identificacao)
        };
        const { data, error, status } = await useFetch(createPessoa, {
          method: "POST",
          body: payloadFormated
        }, "$kpCGWBoNdd");
        if (status.value === "error" && error.value.statusCode === 500) {
          console.log(error.value);
          $toast.error("Erro ao cadastrar Pessoa Juridica,o CNPJ j\xE1 est\xE1 cadastrado.");
        } else {
          $toast.success("Pessoa Juridica cadastrada com sucesso!");
          const pessoaIdValue = data.value.id;
          pessoaId.value = pessoaIdValue;
          const pessoa_token = useCookie("pessoa_token");
          pessoa_token.value = data.value.token;
          isEditMode.value = true;
          emit2("saved");
        }
      } else {
        $toast.error("Erro ao cadastrar pessoa juridica, preencha os campos obrigatorios.");
      }
    }
    async function onUpdate() {
      const payload = { ...state };
      for (const key in payload) {
        if (payload[key] === "") {
          payload[key] = null;
        }
      }
      const payloadFormated = {
        ...payload,
        doc_identificacao: removeFormatting(state.doc_identificacao)
      };
      const { data, error, status } = await useFetch(
        `${updatePessoa}/${pessoaId.value}`,
        {
          method: "PUT",
          body: payloadFormated
        },
        "$mSTT3Fc5La"
      );
      if (status.value === "success") {
        if (props2.isModal === true) {
          $toast.success("Pessoa Juridica atualizada com sucesso!");
          emit2("close-modal");
          return;
        }
        $toast.success("Pessoa Juridica atualizada com sucesso!");
        router2.push("/pessoas/lista");
      }
    }
    const voltar = () => {
      if (props2.isModal === true) {
        emit2("close-modal");
        return;
      }
      router2.push("/pessoas/lista");
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _directive_mask = resolveDirective("mask");
      _push(ssrRenderComponent(VContainer, mergeProps({
        class: "mt-3",
        style: { "height": "425px" }
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VRow, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VCol, { md: "8" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VTextField, {
                          modelValue: unref(state).nome,
                          "onUpdate:modelValue": ($event) => unref(state).nome = $event,
                          "error-messages": unref(v$).nome.$errors.map((e) => e.$message),
                          label: "Raz\xE3o Social",
                          required: "",
                          onBlur: unref(v$).nome.$touch,
                          onInput: unref(v$).nome.$touch
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VTextField, {
                            modelValue: unref(state).nome,
                            "onUpdate:modelValue": ($event) => unref(state).nome = $event,
                            "error-messages": unref(v$).nome.$errors.map((e) => e.$message),
                            label: "Raz\xE3o Social",
                            required: "",
                            onBlur: unref(v$).nome.$touch,
                            onInput: unref(v$).nome.$touch
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages", "onBlur", "onInput"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VCol, { md: "4" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VTextField, mergeProps({
                          modelValue: unref(state).doc_identificacao,
                          "onUpdate:modelValue": ($event) => unref(state).doc_identificacao = $event,
                          "error-messages": unref(v$).doc_identificacao.$errors.map((e) => e.$message),
                          label: "CNPJ",
                          required: "",
                          onBlur: unref(v$).doc_identificacao.$touch,
                          onInput: unref(v$).doc_identificacao.$touch
                        }, ssrGetDirectiveProps(_ctx, _directive_mask, "##.###.###/####-##")), null, _parent4, _scopeId3));
                      } else {
                        return [
                          withDirectives(createVNode(VTextField, {
                            modelValue: unref(state).doc_identificacao,
                            "onUpdate:modelValue": ($event) => unref(state).doc_identificacao = $event,
                            "error-messages": unref(v$).doc_identificacao.$errors.map((e) => e.$message),
                            label: "CNPJ",
                            required: "",
                            onBlur: unref(v$).doc_identificacao.$touch,
                            onInput: unref(v$).doc_identificacao.$touch
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages", "onBlur", "onInput"]), [
                            [_directive_mask, "##.###.###/####-##"]
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VCol, { md: "8" }, {
                      default: withCtx(() => [
                        createVNode(VTextField, {
                          modelValue: unref(state).nome,
                          "onUpdate:modelValue": ($event) => unref(state).nome = $event,
                          "error-messages": unref(v$).nome.$errors.map((e) => e.$message),
                          label: "Raz\xE3o Social",
                          required: "",
                          onBlur: unref(v$).nome.$touch,
                          onInput: unref(v$).nome.$touch
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages", "onBlur", "onInput"])
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, { md: "4" }, {
                      default: withCtx(() => [
                        withDirectives(createVNode(VTextField, {
                          modelValue: unref(state).doc_identificacao,
                          "onUpdate:modelValue": ($event) => unref(state).doc_identificacao = $event,
                          "error-messages": unref(v$).doc_identificacao.$errors.map((e) => e.$message),
                          label: "CNPJ",
                          required: "",
                          onBlur: unref(v$).doc_identificacao.$touch,
                          onInput: unref(v$).doc_identificacao.$touch
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages", "onBlur", "onInput"]), [
                          [_directive_mask, "##.###.###/####-##"]
                        ])
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(VRow, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VCol, { md: "8" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VTextField, {
                          modelValue: unref(state).nome_fantasia,
                          "onUpdate:modelValue": ($event) => unref(state).nome_fantasia = $event,
                          label: "Nome Fantasia"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VTextField, {
                            modelValue: unref(state).nome_fantasia,
                            "onUpdate:modelValue": ($event) => unref(state).nome_fantasia = $event,
                            label: "Nome Fantasia"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VCol, { md: "4" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VTextField, {
                          modelValue: unref(state).inscricao_estadual,
                          "onUpdate:modelValue": ($event) => unref(state).inscricao_estadual = $event,
                          label: "Inscri\xE7\xE3o Estadual"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VTextField, {
                            modelValue: unref(state).inscricao_estadual,
                            "onUpdate:modelValue": ($event) => unref(state).inscricao_estadual = $event,
                            label: "Inscri\xE7\xE3o Estadual"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VCol, { md: "8" }, {
                      default: withCtx(() => [
                        createVNode(VTextField, {
                          modelValue: unref(state).nome_fantasia,
                          "onUpdate:modelValue": ($event) => unref(state).nome_fantasia = $event,
                          label: "Nome Fantasia"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, { md: "4" }, {
                      default: withCtx(() => [
                        createVNode(VTextField, {
                          modelValue: unref(state).inscricao_estadual,
                          "onUpdate:modelValue": ($event) => unref(state).inscricao_estadual = $event,
                          label: "Inscri\xE7\xE3o Estadual"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(VRow, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VCol, { md: "12" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VTextField, {
                          modelValue: unref(state).observacao,
                          "onUpdate:modelValue": ($event) => unref(state).observacao = $event,
                          label: "Observa\xE7\xE3o"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VTextField, {
                            modelValue: unref(state).observacao,
                            "onUpdate:modelValue": ($event) => unref(state).observacao = $event,
                            label: "Observa\xE7\xE3o"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VCol, { md: "12" }, {
                      default: withCtx(() => [
                        createVNode(VTextField, {
                          modelValue: unref(state).observacao,
                          "onUpdate:modelValue": ($event) => unref(state).observacao = $event,
                          label: "Observa\xE7\xE3o"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(VRow, { class: "mb-3" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VBtn, {
                    onClick: voltar,
                    size: "large",
                    color: "red"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Voltar`);
                      } else {
                        return [
                          createTextVNode("Voltar")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VBtn, {
                    onClick: ($event) => unref(isEditMode) ? onUpdate() : onSubmit(),
                    class: "ml-4",
                    size: "large",
                    color: "green"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Salvar`);
                      } else {
                        return [
                          createTextVNode("Salvar")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VBtn, {
                      onClick: voltar,
                      size: "large",
                      color: "red"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Voltar")
                      ]),
                      _: 1
                    }),
                    createVNode(VBtn, {
                      onClick: ($event) => unref(isEditMode) ? onUpdate() : onSubmit(),
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
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(VRow, null, {
                default: withCtx(() => [
                  createVNode(VCol, { md: "8" }, {
                    default: withCtx(() => [
                      createVNode(VTextField, {
                        modelValue: unref(state).nome,
                        "onUpdate:modelValue": ($event) => unref(state).nome = $event,
                        "error-messages": unref(v$).nome.$errors.map((e) => e.$message),
                        label: "Raz\xE3o Social",
                        required: "",
                        onBlur: unref(v$).nome.$touch,
                        onInput: unref(v$).nome.$touch
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages", "onBlur", "onInput"])
                    ]),
                    _: 1
                  }),
                  createVNode(VCol, { md: "4" }, {
                    default: withCtx(() => [
                      withDirectives(createVNode(VTextField, {
                        modelValue: unref(state).doc_identificacao,
                        "onUpdate:modelValue": ($event) => unref(state).doc_identificacao = $event,
                        "error-messages": unref(v$).doc_identificacao.$errors.map((e) => e.$message),
                        label: "CNPJ",
                        required: "",
                        onBlur: unref(v$).doc_identificacao.$touch,
                        onInput: unref(v$).doc_identificacao.$touch
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages", "onBlur", "onInput"]), [
                        [_directive_mask, "##.###.###/####-##"]
                      ])
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(VRow, null, {
                default: withCtx(() => [
                  createVNode(VCol, { md: "8" }, {
                    default: withCtx(() => [
                      createVNode(VTextField, {
                        modelValue: unref(state).nome_fantasia,
                        "onUpdate:modelValue": ($event) => unref(state).nome_fantasia = $event,
                        label: "Nome Fantasia"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(VCol, { md: "4" }, {
                    default: withCtx(() => [
                      createVNode(VTextField, {
                        modelValue: unref(state).inscricao_estadual,
                        "onUpdate:modelValue": ($event) => unref(state).inscricao_estadual = $event,
                        label: "Inscri\xE7\xE3o Estadual"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(VRow, null, {
                default: withCtx(() => [
                  createVNode(VCol, { md: "12" }, {
                    default: withCtx(() => [
                      createVNode(VTextField, {
                        modelValue: unref(state).observacao,
                        "onUpdate:modelValue": ($event) => unref(state).observacao = $event,
                        label: "Observa\xE7\xE3o"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(VRow, { class: "mb-3" }, {
                default: withCtx(() => [
                  createVNode(VBtn, {
                    onClick: voltar,
                    size: "large",
                    color: "red"
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Voltar")
                    ]),
                    _: 1
                  }),
                  createVNode(VBtn, {
                    onClick: ($event) => unref(isEditMode) ? onUpdate() : onSubmit(),
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
      }, _parent));
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props2, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/DadosJuridica.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props2, ctx) : void 0;
};
const _sfc_main$1 = {
  __name: "Representantes",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const config = useRuntimeConfig();
    const { $toast } = useNuxtApp();
    const procurarPessoa = `${config.public.managemant}/pesquisarPessoas`;
    const papeisApresentante = `${config.public.managemant}/listarPapeis`;
    const criarAtoPessoa = `${config.public.managemant}/representante`;
    const pessoasUpdate = `${config.public.managemant}/updateAtosPessoa`;
    const cartorio_token = ref(useCookie("user-data").value.cartorio_token);
    const pessoasItems = ref([]);
    const pessoasTable = ref([]);
    const papeisItems = ref([]);
    const isModalRegistroOpen = ref(false);
    const headers = [
      {
        title: "Documento",
        align: "start",
        key: "pessoa.documento"
      },
      {
        title: "Pessoa",
        align: "start",
        key: "pessoa.nome"
      },
      {
        title: "Papel",
        align: "start",
        key: "papel.descricao"
      },
      { value: "actions" }
    ];
    const state = reactive({
      papeis: null,
      nome: null,
      pessoa: null,
      documento: null
    });
    const { data } = ([__temp, __restore] = withAsyncContext(() => useFetch(papeisApresentante, {
      method: "POST",
      body: { rotina: "CADASTRO_PJ" }
    }, "$r2PAdeai2X")), __temp = await __temp, __restore(), __temp);
    papeisItems.value = data.value;
    async function searchPessoasService() {
      try {
        const { data: pessoasData, error } = await useFetch(procurarPessoa, {
          method: "POST",
          body: {
            cartorio_token: cartorio_token.value,
            documento: state.documento,
            nome: state.nome
          }
        }, "$ssVep5GhCj");
        if (pessoasData.value.length > 0) {
          pessoasItems.value = pessoasData.value;
          state.pessoa = pessoasItems.value[0];
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
    const createRepresentante = async () => {
      const representante = {
        pessoa: state.pessoa,
        papel: papeisItems.value.find((papel) => papel.id === state.papeis),
        // Objeto completo do papel
        representante: { nome: null }
      };
      try {
        const { data: data2, error, status } = await useFetch(criarAtoPessoa, {
          method: "POST",
          body: {
            ato_id: null,
            representante_id: state.pessoa.id,
            pessoa_id: state.pessoa.id,
            tipo_parte_id: state.papeis,
            user_id: useCookie("user-data").value.usuario_id
          }
        }, "$8XMY7eo5oW");
        if (status.value === "success") {
          representante.id = data2.value.id;
          $toast.success("Pessoa Registrada com Sucesso!");
          pessoasTable.value.push(representante);
        } else {
          $toast.error("Erro ao registrar a pessoa!");
        }
      } catch (error) {
        $toast.error("Erro no servidor. Tente novamente.");
      }
    };
    async function deletePessoa(item) {
      item.excluido = !item.excluido;
      try {
        await useFetch(`${pessoasUpdate}/${item.id}`, {
          method: "PUT",
          body: JSON.stringify({ excluido: item.excluido })
        }, "$bMZzCc9jB6");
      } catch (error) {
        console.error("Erro ao excluir pessoa:", error);
      }
    }
    const voltar = () => {
      if (props.isModal === true) {
        emit("close-modal");
        return;
      }
      router.push("/pessoas/lista");
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      const _component_ModalRegistroPessoas = _sfc_main;
      _push(ssrRenderComponent(VContainer, mergeProps({ style: { "height": "660px" } }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VRow, { class: "mt-1" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VCol, { cols: "3" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VTextField, {
                          label: "Documento",
                          modelValue: unref(state).documento,
                          "onUpdate:modelValue": ($event) => unref(state).documento = $event
                        }, null, _parent4, _scopeId3));
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
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VCol, { cols: "4" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VTextField, {
                          label: "Pessoa",
                          modelValue: unref(state).nome,
                          "onUpdate:modelValue": ($event) => unref(state).nome = $event
                        }, null, _parent4, _scopeId3));
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
                  }, _parent3, _scopeId2));
                  _push3(`<div${_scopeId2}><img class="mt-1"${ssrRenderAttr("src", _imports_1)} style="${ssrRenderStyle({ "width": "40px", "cursor": "pointer" })}" title="Pesquisar Pessoa"${_scopeId2}></div><div${_scopeId2}><img class="mt-1 ml-2"${ssrRenderAttr("src", _imports_0)} style="${ssrRenderStyle({ "width": "40px", "cursor": "pointer" })}" title="Criar Pessoa"${_scopeId2}></div>`);
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
                        class: "mt-1",
                        src: _imports_1,
                        style: { "width": "40px", "cursor": "pointer" },
                        title: "Pesquisar Pessoa",
                        onClick: searchPessoasService
                      })
                    ]),
                    createVNode("div", null, [
                      createVNode("img", {
                        class: "mt-1 ml-2",
                        src: _imports_0,
                        style: { "width": "40px", "cursor": "pointer" },
                        title: "Criar Pessoa",
                        onClick: createPessoa
                      })
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(VRow, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VCol, { cols: "4" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VAutocomplete, {
                          label: "Selecione a Pessoa",
                          modelValue: unref(state).pessoa,
                          "onUpdate:modelValue": ($event) => unref(state).pessoa = $event,
                          items: unref(pessoasItems),
                          "item-title": "nome",
                          "item-value": "id",
                          "return-object": "",
                          required: ""
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VAutocomplete, {
                            label: "Selecione a Pessoa",
                            modelValue: unref(state).pessoa,
                            "onUpdate:modelValue": ($event) => unref(state).pessoa = $event,
                            items: unref(pessoasItems),
                            "item-title": "nome",
                            "item-value": "id",
                            "return-object": "",
                            required: ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VCol, { cols: "3" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VAutocomplete, {
                          label: "Papel",
                          modelValue: unref(state).papeis,
                          "onUpdate:modelValue": ($event) => unref(state).papeis = $event,
                          items: unref(papeisItems),
                          "item-title": "descricao",
                          "item-value": "id",
                          required: ""
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VAutocomplete, {
                            label: "Papel",
                            modelValue: unref(state).papeis,
                            "onUpdate:modelValue": ($event) => unref(state).papeis = $event,
                            items: unref(papeisItems),
                            "item-title": "descricao",
                            "item-value": "id",
                            required: ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<div${_scopeId2}><img class="mt-1"${ssrRenderAttr("src", _imports_0)} style="${ssrRenderStyle({ "width": "40px", "cursor": "pointer" })}" title="Criar Representante"${_scopeId2}></div>`);
                } else {
                  return [
                    createVNode(VCol, { cols: "4" }, {
                      default: withCtx(() => [
                        createVNode(VAutocomplete, {
                          label: "Selecione a Pessoa",
                          modelValue: unref(state).pessoa,
                          "onUpdate:modelValue": ($event) => unref(state).pessoa = $event,
                          items: unref(pessoasItems),
                          "item-title": "nome",
                          "item-value": "id",
                          "return-object": "",
                          required: ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, { cols: "3" }, {
                      default: withCtx(() => [
                        createVNode(VAutocomplete, {
                          label: "Papel",
                          modelValue: unref(state).papeis,
                          "onUpdate:modelValue": ($event) => unref(state).papeis = $event,
                          items: unref(papeisItems),
                          "item-title": "descricao",
                          "item-value": "id",
                          required: ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                      ]),
                      _: 1
                    }),
                    createVNode("div", null, [
                      createVNode("img", {
                        class: "mt-1",
                        src: _imports_0,
                        style: { "width": "40px", "cursor": "pointer" },
                        title: "Criar Representante",
                        onClick: createRepresentante
                      })
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(VRow, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VCol, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VDataTable, {
                          style: { "height": "465px" },
                          headers,
                          items: unref(pessoasTable)
                        }, {
                          "item.actions": withCtx(({ item }, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VRow, null, {
                                default: withCtx((_4, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`<div class="mr-2" style="${ssrRenderStyle({ "display": "flex", "cursor": "pointer", "justify-content": "flex-end" })}" title="Deletar Pessoa"${_scopeId5}>`);
                                    if (item.excluido) {
                                      _push6(`<img style="${ssrRenderStyle({ "width": "30px", "height": "30px" })}"${ssrRenderAttr("src", _imports_2)} alt="Visualizar" title="Reativar"${_scopeId5}>`);
                                    } else {
                                      _push6(`<img${ssrRenderAttr("src", _imports_3)} alt="Excluir" class="trash-icon" style="${ssrRenderStyle({ "width": "30px", "height": "30px" })}" title="Excluir"${_scopeId5}>`);
                                    }
                                    _push6(`</div>`);
                                  } else {
                                    return [
                                      createVNode("div", {
                                        class: "mr-2",
                                        style: { "display": "flex", "cursor": "pointer", "justify-content": "flex-end" },
                                        onClick: ($event) => deletePessoa(item),
                                        title: "Deletar Pessoa"
                                      }, [
                                        item.excluido ? (openBlock(), createBlock("img", {
                                          key: 0,
                                          style: { "width": "30px", "height": "30px" },
                                          src: _imports_2,
                                          alt: "Visualizar",
                                          title: "Reativar"
                                        })) : (openBlock(), createBlock("img", {
                                          key: 1,
                                          src: _imports_3,
                                          alt: "Excluir",
                                          class: "trash-icon",
                                          style: { "width": "30px", "height": "30px" },
                                          title: "Excluir"
                                        }))
                                      ], 8, ["onClick"])
                                    ];
                                  }
                                }),
                                _: 2
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(VRow, null, {
                                  default: withCtx(() => [
                                    createVNode("div", {
                                      class: "mr-2",
                                      style: { "display": "flex", "cursor": "pointer", "justify-content": "flex-end" },
                                      onClick: ($event) => deletePessoa(item),
                                      title: "Deletar Pessoa"
                                    }, [
                                      item.excluido ? (openBlock(), createBlock("img", {
                                        key: 0,
                                        style: { "width": "30px", "height": "30px" },
                                        src: _imports_2,
                                        alt: "Visualizar",
                                        title: "Reativar"
                                      })) : (openBlock(), createBlock("img", {
                                        key: 1,
                                        src: _imports_3,
                                        alt: "Excluir",
                                        class: "trash-icon",
                                        style: { "width": "30px", "height": "30px" },
                                        title: "Excluir"
                                      }))
                                    ], 8, ["onClick"])
                                  ]),
                                  _: 2
                                }, 1024)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VDataTable, {
                            style: { "height": "465px" },
                            headers,
                            items: unref(pessoasTable)
                          }, {
                            "item.actions": withCtx(({ item }) => [
                              createVNode(VRow, null, {
                                default: withCtx(() => [
                                  createVNode("div", {
                                    class: "mr-2",
                                    style: { "display": "flex", "cursor": "pointer", "justify-content": "flex-end" },
                                    onClick: ($event) => deletePessoa(item),
                                    title: "Deletar Pessoa"
                                  }, [
                                    item.excluido ? (openBlock(), createBlock("img", {
                                      key: 0,
                                      style: { "width": "30px", "height": "30px" },
                                      src: _imports_2,
                                      alt: "Visualizar",
                                      title: "Reativar"
                                    })) : (openBlock(), createBlock("img", {
                                      key: 1,
                                      src: _imports_3,
                                      alt: "Excluir",
                                      class: "trash-icon",
                                      style: { "width": "30px", "height": "30px" },
                                      title: "Excluir"
                                    }))
                                  ], 8, ["onClick"])
                                ]),
                                _: 2
                              }, 1024)
                            ]),
                            _: 1
                          }, 8, ["items"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VCol, null, {
                      default: withCtx(() => [
                        createVNode(VDataTable, {
                          style: { "height": "465px" },
                          headers,
                          items: unref(pessoasTable)
                        }, {
                          "item.actions": withCtx(({ item }) => [
                            createVNode(VRow, null, {
                              default: withCtx(() => [
                                createVNode("div", {
                                  class: "mr-2",
                                  style: { "display": "flex", "cursor": "pointer", "justify-content": "flex-end" },
                                  onClick: ($event) => deletePessoa(item),
                                  title: "Deletar Pessoa"
                                }, [
                                  item.excluido ? (openBlock(), createBlock("img", {
                                    key: 0,
                                    style: { "width": "30px", "height": "30px" },
                                    src: _imports_2,
                                    alt: "Visualizar",
                                    title: "Reativar"
                                  })) : (openBlock(), createBlock("img", {
                                    key: 1,
                                    src: _imports_3,
                                    alt: "Excluir",
                                    class: "trash-icon",
                                    style: { "width": "30px", "height": "30px" },
                                    title: "Excluir"
                                  }))
                                ], 8, ["onClick"])
                              ]),
                              _: 2
                            }, 1024)
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
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_NuxtLink, { onClick: voltar }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VBtn, {
                    size: "large",
                    color: "red"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Voltar`);
                      } else {
                        return [
                          createTextVNode("Voltar")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
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
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_ModalRegistroPessoas, {
              show: unref(isModalRegistroOpen),
              onClose: ($event) => isModalRegistroOpen.value = false
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(VRow, { class: "mt-1" }, {
                default: withCtx(() => [
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
                      class: "mt-1",
                      src: _imports_1,
                      style: { "width": "40px", "cursor": "pointer" },
                      title: "Pesquisar Pessoa",
                      onClick: searchPessoasService
                    })
                  ]),
                  createVNode("div", null, [
                    createVNode("img", {
                      class: "mt-1 ml-2",
                      src: _imports_0,
                      style: { "width": "40px", "cursor": "pointer" },
                      title: "Criar Pessoa",
                      onClick: createPessoa
                    })
                  ])
                ]),
                _: 1
              }),
              createVNode(VRow, null, {
                default: withCtx(() => [
                  createVNode(VCol, { cols: "4" }, {
                    default: withCtx(() => [
                      createVNode(VAutocomplete, {
                        label: "Selecione a Pessoa",
                        modelValue: unref(state).pessoa,
                        "onUpdate:modelValue": ($event) => unref(state).pessoa = $event,
                        items: unref(pessoasItems),
                        "item-title": "nome",
                        "item-value": "id",
                        "return-object": "",
                        required: ""
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                    ]),
                    _: 1
                  }),
                  createVNode(VCol, { cols: "3" }, {
                    default: withCtx(() => [
                      createVNode(VAutocomplete, {
                        label: "Papel",
                        modelValue: unref(state).papeis,
                        "onUpdate:modelValue": ($event) => unref(state).papeis = $event,
                        items: unref(papeisItems),
                        "item-title": "descricao",
                        "item-value": "id",
                        required: ""
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                    ]),
                    _: 1
                  }),
                  createVNode("div", null, [
                    createVNode("img", {
                      class: "mt-1",
                      src: _imports_0,
                      style: { "width": "40px", "cursor": "pointer" },
                      title: "Criar Representante",
                      onClick: createRepresentante
                    })
                  ])
                ]),
                _: 1
              }),
              createVNode(VRow, null, {
                default: withCtx(() => [
                  createVNode(VCol, null, {
                    default: withCtx(() => [
                      createVNode(VDataTable, {
                        style: { "height": "465px" },
                        headers,
                        items: unref(pessoasTable)
                      }, {
                        "item.actions": withCtx(({ item }) => [
                          createVNode(VRow, null, {
                            default: withCtx(() => [
                              createVNode("div", {
                                class: "mr-2",
                                style: { "display": "flex", "cursor": "pointer", "justify-content": "flex-end" },
                                onClick: ($event) => deletePessoa(item),
                                title: "Deletar Pessoa"
                              }, [
                                item.excluido ? (openBlock(), createBlock("img", {
                                  key: 0,
                                  style: { "width": "30px", "height": "30px" },
                                  src: _imports_2,
                                  alt: "Visualizar",
                                  title: "Reativar"
                                })) : (openBlock(), createBlock("img", {
                                  key: 1,
                                  src: _imports_3,
                                  alt: "Excluir",
                                  class: "trash-icon",
                                  style: { "width": "30px", "height": "30px" },
                                  title: "Excluir"
                                }))
                              ], 8, ["onClick"])
                            ]),
                            _: 2
                          }, 1024)
                        ]),
                        _: 1
                      }, 8, ["items"])
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(_component_NuxtLink, { onClick: voltar }, {
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
              createVNode(_component_ModalRegistroPessoas, {
                show: unref(isModalRegistroOpen),
                onClose: ($event) => isModalRegistroOpen.value = false
              }, null, 8, ["show", "onClose"])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props2, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Pessoas/Cadastros/Representantes.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props2, ctx) : void 0;
};
const _sfc_main = {
  __name: "RegistroPessoas",
  __ssrInlineRender: true,
  props: {
    show: Boolean
  },
  emits: ["close"],
  setup(__props, { emit: __emit }) {
    const props2 = __props;
    const isVisible = ref(props2.show);
    const emit2 = __emit;
    const tab = ref("dados");
    const showTabsFisica = ref(false);
    const showTabsJuridica = ref(false);
    const autocompleteDisabled = ref(false);
    const state = reactive({
      tipo_pessoa: "fisica"
      // Valor inicial
    });
    const pessoa_tipo = [
      { label: "F\xCDSICA", value: "fisica" },
      { label: "JUR\xCDDICA", value: "juridica" },
      { label: "ESTRANGEIRA", value: "estrangeira" }
    ];
    const handleSave = () => {
      showTabsFisica.value = true;
      autocompleteDisabled.value = true;
    };
    const handleSaveJuridica = () => {
      showTabsJuridica.value = true;
      autocompleteDisabled.value = true;
    };
    watch(
      () => props2.show,
      (newVal) => {
        isVisible.value = newVal;
      }
    );
    const closeModal = () => {
      isVisible.value = false;
      emit2("close");
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Dados = _sfc_main$3;
      const _component_DadosJuridica = _sfc_main$2;
      const _component_Documentos = _sfc_main$7;
      const _component_PessoasCadastrosRepresentantes = _sfc_main$1;
      const _component_Endereco = _sfc_main$6;
      const _component_Biometria = _sfc_main$1$1;
      const _component_Restricoes = __nuxt_component_6;
      _push(ssrRenderComponent(VDialog, mergeProps({
        persistent: "",
        modelValue: unref(isVisible),
        "onUpdate:modelValue": ($event) => isRef(isVisible) ? isVisible.value = $event : null,
        "max-width": "900"
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VCard, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VContainer, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<h1 style="${ssrRenderStyle({ "background-color": "#f5f2f2", "color": "#525050", "padding": "10px 0px 0px 20px" })}"${_scopeId3}> Cadastramento de pessoas </h1><div style="${ssrRenderStyle({ "background-color": "#f5f2f2", "padding": "5px 0px 0px 20px" })}"${_scopeId3}>`);
                        _push4(ssrRenderComponent(VAutocomplete, {
                          modelValue: unref(state).tipo_pessoa,
                          "onUpdate:modelValue": ($event) => unref(state).tipo_pessoa = $event,
                          style: { "width": "200px" },
                          items: pessoa_tipo,
                          "item-title": "label",
                          "item-value": "value",
                          label: "Tipo de pessoa",
                          "bg-color": "#F6F6F6",
                          disabled: unref(autocompleteDisabled)
                        }, null, _parent4, _scopeId3));
                        _push4(`</div>`);
                        _push4(ssrRenderComponent(VTabs, {
                          modelValue: unref(tab),
                          "onUpdate:modelValue": ($event) => isRef(tab) ? tab.value = $event : null,
                          "bg-color": "#f5f2f2"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VTab, { value: "dados" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Dados`);
                                  } else {
                                    return [
                                      createTextVNode("Dados")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              if (unref(showTabsFisica)) {
                                _push5(ssrRenderComponent(VTab, { value: "documento" }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(`Documentos`);
                                    } else {
                                      return [
                                        createTextVNode("Documentos")
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent5, _scopeId4));
                              } else {
                                _push5(`<!---->`);
                              }
                              if (unref(showTabsJuridica)) {
                                _push5(ssrRenderComponent(VTab, { value: "representante" }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(`Representantes`);
                                    } else {
                                      return [
                                        createTextVNode("Representantes")
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent5, _scopeId4));
                              } else {
                                _push5(`<!---->`);
                              }
                              if (unref(showTabsJuridica) || unref(showTabsFisica)) {
                                _push5(ssrRenderComponent(VTab, { value: "endereco" }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(`Endere\xE7os`);
                                    } else {
                                      return [
                                        createTextVNode("Endere\xE7os")
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent5, _scopeId4));
                              } else {
                                _push5(`<!---->`);
                              }
                              if (unref(showTabsFisica)) {
                                _push5(ssrRenderComponent(VTab, { value: "biometria" }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(`Biometria`);
                                    } else {
                                      return [
                                        createTextVNode("Biometria")
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent5, _scopeId4));
                              } else {
                                _push5(`<!---->`);
                              }
                              if (unref(showTabsJuridica) || unref(showTabsFisica)) {
                                _push5(ssrRenderComponent(VTab, { value: "restricao" }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(`Restri\xE7\xF5es`);
                                    } else {
                                      return [
                                        createTextVNode("Restri\xE7\xF5es")
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent5, _scopeId4));
                              } else {
                                _push5(`<!---->`);
                              }
                            } else {
                              return [
                                createVNode(VTab, { value: "dados" }, {
                                  default: withCtx(() => [
                                    createTextVNode("Dados")
                                  ]),
                                  _: 1
                                }),
                                unref(showTabsFisica) ? (openBlock(), createBlock(VTab, {
                                  key: 0,
                                  value: "documento"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode("Documentos")
                                  ]),
                                  _: 1
                                })) : createCommentVNode("", true),
                                unref(showTabsJuridica) ? (openBlock(), createBlock(VTab, {
                                  key: 1,
                                  value: "representante"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode("Representantes")
                                  ]),
                                  _: 1
                                })) : createCommentVNode("", true),
                                unref(showTabsJuridica) || unref(showTabsFisica) ? (openBlock(), createBlock(VTab, {
                                  key: 2,
                                  value: "endereco"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode("Endere\xE7os")
                                  ]),
                                  _: 1
                                })) : createCommentVNode("", true),
                                unref(showTabsFisica) ? (openBlock(), createBlock(VTab, {
                                  key: 3,
                                  value: "biometria"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode("Biometria")
                                  ]),
                                  _: 1
                                })) : createCommentVNode("", true),
                                unref(showTabsJuridica) || unref(showTabsFisica) ? (openBlock(), createBlock(VTab, {
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
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VTabsWindow, {
                          modelValue: unref(tab),
                          "onUpdate:modelValue": ($event) => isRef(tab) ? tab.value = $event : null
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VTabsWindowItem, { value: "dados" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    if (unref(state).tipo_pessoa === "fisica") {
                                      _push6(ssrRenderComponent(_component_Dados, {
                                        onSaved: handleSave,
                                        onCloseModal: closeModal,
                                        isModal: true
                                      }, null, _parent6, _scopeId5));
                                    } else if (unref(state).tipo_pessoa === "juridica") {
                                      _push6(ssrRenderComponent(_component_DadosJuridica, {
                                        onSaved: handleSaveJuridica,
                                        onCloseModal: closeModal,
                                        isModal: true
                                      }, null, _parent6, _scopeId5));
                                    } else {
                                      _push6(`<!---->`);
                                    }
                                  } else {
                                    return [
                                      unref(state).tipo_pessoa === "fisica" ? (openBlock(), createBlock(_component_Dados, {
                                        key: 0,
                                        onSaved: handleSave,
                                        onCloseModal: closeModal,
                                        isModal: true
                                      })) : unref(state).tipo_pessoa === "juridica" ? (openBlock(), createBlock(_component_DadosJuridica, {
                                        key: 1,
                                        onSaved: handleSaveJuridica,
                                        onCloseModal: closeModal,
                                        isModal: true
                                      })) : createCommentVNode("", true)
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              if (_ctx.showTabs) {
                                _push5(ssrRenderComponent(VTabsWindowItem, { value: "documento" }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(ssrRenderComponent(_component_Documentos, {
                                        onCloseModal: closeModal,
                                        isModal: true
                                      }, null, _parent6, _scopeId5));
                                    } else {
                                      return [
                                        createVNode(_component_Documentos, {
                                          onCloseModal: closeModal,
                                          isModal: true
                                        })
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent5, _scopeId4));
                              } else {
                                _push5(`<!---->`);
                              }
                              if (unref(showTabsJuridica)) {
                                _push5(ssrRenderComponent(VTabsWindowItem, { value: "representante" }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(ssrRenderComponent(_component_PessoasCadastrosRepresentantes, {
                                        onCloseModal: closeModal,
                                        isModal: true
                                      }, null, _parent6, _scopeId5));
                                    } else {
                                      return [
                                        createVNode(_component_PessoasCadastrosRepresentantes, {
                                          onCloseModal: closeModal,
                                          isModal: true
                                        })
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent5, _scopeId4));
                              } else {
                                _push5(`<!---->`);
                              }
                              if (unref(showTabsJuridica) || unref(showTabsFisica)) {
                                _push5(ssrRenderComponent(VTabsWindowItem, { value: "endereco" }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(ssrRenderComponent(_component_Endereco, {
                                        onCloseModal: closeModal,
                                        isModal: true
                                      }, null, _parent6, _scopeId5));
                                    } else {
                                      return [
                                        createVNode(_component_Endereco, {
                                          onCloseModal: closeModal,
                                          isModal: true
                                        })
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent5, _scopeId4));
                              } else {
                                _push5(`<!---->`);
                              }
                              if (_ctx.showTabs) {
                                _push5(ssrRenderComponent(VTabsWindowItem, { value: "biometria" }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(ssrRenderComponent(VContainer, null, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(ssrRenderComponent(_component_Biometria, {
                                              onCloseModal: closeModal,
                                              isModal: true
                                            }, null, _parent7, _scopeId6));
                                          } else {
                                            return [
                                              createVNode(_component_Biometria, {
                                                onCloseModal: closeModal,
                                                isModal: true
                                              })
                                            ];
                                          }
                                        }),
                                        _: 1
                                      }, _parent6, _scopeId5));
                                    } else {
                                      return [
                                        createVNode(VContainer, null, {
                                          default: withCtx(() => [
                                            createVNode(_component_Biometria, {
                                              onCloseModal: closeModal,
                                              isModal: true
                                            })
                                          ]),
                                          _: 1
                                        })
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent5, _scopeId4));
                              } else {
                                _push5(`<!---->`);
                              }
                              if (_ctx.showTabs) {
                                _push5(ssrRenderComponent(VTabsWindowItem, { value: "restricao" }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(ssrRenderComponent(_component_Restricoes, {
                                        onCloseModal: closeModal,
                                        isModal: true
                                      }, null, _parent6, _scopeId5));
                                    } else {
                                      return [
                                        createVNode(_component_Restricoes, {
                                          onCloseModal: closeModal,
                                          isModal: true
                                        })
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent5, _scopeId4));
                              } else {
                                _push5(`<!---->`);
                              }
                            } else {
                              return [
                                createVNode(VTabsWindowItem, { value: "dados" }, {
                                  default: withCtx(() => [
                                    unref(state).tipo_pessoa === "fisica" ? (openBlock(), createBlock(_component_Dados, {
                                      key: 0,
                                      onSaved: handleSave,
                                      onCloseModal: closeModal,
                                      isModal: true
                                    })) : unref(state).tipo_pessoa === "juridica" ? (openBlock(), createBlock(_component_DadosJuridica, {
                                      key: 1,
                                      onSaved: handleSaveJuridica,
                                      onCloseModal: closeModal,
                                      isModal: true
                                    })) : createCommentVNode("", true)
                                  ]),
                                  _: 1
                                }),
                                _ctx.showTabs ? (openBlock(), createBlock(VTabsWindowItem, {
                                  key: 0,
                                  value: "documento"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(_component_Documentos, {
                                      onCloseModal: closeModal,
                                      isModal: true
                                    })
                                  ]),
                                  _: 1
                                })) : createCommentVNode("", true),
                                unref(showTabsJuridica) ? (openBlock(), createBlock(VTabsWindowItem, {
                                  key: 1,
                                  value: "representante"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(_component_PessoasCadastrosRepresentantes, {
                                      onCloseModal: closeModal,
                                      isModal: true
                                    })
                                  ]),
                                  _: 1
                                })) : createCommentVNode("", true),
                                unref(showTabsJuridica) || unref(showTabsFisica) ? (openBlock(), createBlock(VTabsWindowItem, {
                                  key: 2,
                                  value: "endereco"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(_component_Endereco, {
                                      onCloseModal: closeModal,
                                      isModal: true
                                    })
                                  ]),
                                  _: 1
                                })) : createCommentVNode("", true),
                                _ctx.showTabs ? (openBlock(), createBlock(VTabsWindowItem, {
                                  key: 3,
                                  value: "biometria"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(VContainer, null, {
                                      default: withCtx(() => [
                                        createVNode(_component_Biometria, {
                                          onCloseModal: closeModal,
                                          isModal: true
                                        })
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                })) : createCommentVNode("", true),
                                _ctx.showTabs ? (openBlock(), createBlock(VTabsWindowItem, {
                                  key: 4,
                                  value: "restricao"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(_component_Restricoes, {
                                      onCloseModal: closeModal,
                                      isModal: true
                                    })
                                  ]),
                                  _: 1
                                })) : createCommentVNode("", true)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode("h1", { style: { "background-color": "#f5f2f2", "color": "#525050", "padding": "10px 0px 0px 20px" } }, " Cadastramento de pessoas "),
                          createVNode("div", { style: { "background-color": "#f5f2f2", "padding": "5px 0px 0px 20px" } }, [
                            createVNode(VAutocomplete, {
                              modelValue: unref(state).tipo_pessoa,
                              "onUpdate:modelValue": ($event) => unref(state).tipo_pessoa = $event,
                              style: { "width": "200px" },
                              items: pessoa_tipo,
                              "item-title": "label",
                              "item-value": "value",
                              label: "Tipo de pessoa",
                              "bg-color": "#F6F6F6",
                              disabled: unref(autocompleteDisabled)
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"])
                          ]),
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
                              unref(showTabsFisica) ? (openBlock(), createBlock(VTab, {
                                key: 0,
                                value: "documento"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode("Documentos")
                                ]),
                                _: 1
                              })) : createCommentVNode("", true),
                              unref(showTabsJuridica) ? (openBlock(), createBlock(VTab, {
                                key: 1,
                                value: "representante"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode("Representantes")
                                ]),
                                _: 1
                              })) : createCommentVNode("", true),
                              unref(showTabsJuridica) || unref(showTabsFisica) ? (openBlock(), createBlock(VTab, {
                                key: 2,
                                value: "endereco"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode("Endere\xE7os")
                                ]),
                                _: 1
                              })) : createCommentVNode("", true),
                              unref(showTabsFisica) ? (openBlock(), createBlock(VTab, {
                                key: 3,
                                value: "biometria"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode("Biometria")
                                ]),
                                _: 1
                              })) : createCommentVNode("", true),
                              unref(showTabsJuridica) || unref(showTabsFisica) ? (openBlock(), createBlock(VTab, {
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
                                  unref(state).tipo_pessoa === "fisica" ? (openBlock(), createBlock(_component_Dados, {
                                    key: 0,
                                    onSaved: handleSave,
                                    onCloseModal: closeModal,
                                    isModal: true
                                  })) : unref(state).tipo_pessoa === "juridica" ? (openBlock(), createBlock(_component_DadosJuridica, {
                                    key: 1,
                                    onSaved: handleSaveJuridica,
                                    onCloseModal: closeModal,
                                    isModal: true
                                  })) : createCommentVNode("", true)
                                ]),
                                _: 1
                              }),
                              _ctx.showTabs ? (openBlock(), createBlock(VTabsWindowItem, {
                                key: 0,
                                value: "documento"
                              }, {
                                default: withCtx(() => [
                                  createVNode(_component_Documentos, {
                                    onCloseModal: closeModal,
                                    isModal: true
                                  })
                                ]),
                                _: 1
                              })) : createCommentVNode("", true),
                              unref(showTabsJuridica) ? (openBlock(), createBlock(VTabsWindowItem, {
                                key: 1,
                                value: "representante"
                              }, {
                                default: withCtx(() => [
                                  createVNode(_component_PessoasCadastrosRepresentantes, {
                                    onCloseModal: closeModal,
                                    isModal: true
                                  })
                                ]),
                                _: 1
                              })) : createCommentVNode("", true),
                              unref(showTabsJuridica) || unref(showTabsFisica) ? (openBlock(), createBlock(VTabsWindowItem, {
                                key: 2,
                                value: "endereco"
                              }, {
                                default: withCtx(() => [
                                  createVNode(_component_Endereco, {
                                    onCloseModal: closeModal,
                                    isModal: true
                                  })
                                ]),
                                _: 1
                              })) : createCommentVNode("", true),
                              _ctx.showTabs ? (openBlock(), createBlock(VTabsWindowItem, {
                                key: 3,
                                value: "biometria"
                              }, {
                                default: withCtx(() => [
                                  createVNode(VContainer, null, {
                                    default: withCtx(() => [
                                      createVNode(_component_Biometria, {
                                        onCloseModal: closeModal,
                                        isModal: true
                                      })
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              })) : createCommentVNode("", true),
                              _ctx.showTabs ? (openBlock(), createBlock(VTabsWindowItem, {
                                key: 4,
                                value: "restricao"
                              }, {
                                default: withCtx(() => [
                                  createVNode(_component_Restricoes, {
                                    onCloseModal: closeModal,
                                    isModal: true
                                  })
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
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VContainer, null, {
                      default: withCtx(() => [
                        createVNode("h1", { style: { "background-color": "#f5f2f2", "color": "#525050", "padding": "10px 0px 0px 20px" } }, " Cadastramento de pessoas "),
                        createVNode("div", { style: { "background-color": "#f5f2f2", "padding": "5px 0px 0px 20px" } }, [
                          createVNode(VAutocomplete, {
                            modelValue: unref(state).tipo_pessoa,
                            "onUpdate:modelValue": ($event) => unref(state).tipo_pessoa = $event,
                            style: { "width": "200px" },
                            items: pessoa_tipo,
                            "item-title": "label",
                            "item-value": "value",
                            label: "Tipo de pessoa",
                            "bg-color": "#F6F6F6",
                            disabled: unref(autocompleteDisabled)
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"])
                        ]),
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
                            unref(showTabsFisica) ? (openBlock(), createBlock(VTab, {
                              key: 0,
                              value: "documento"
                            }, {
                              default: withCtx(() => [
                                createTextVNode("Documentos")
                              ]),
                              _: 1
                            })) : createCommentVNode("", true),
                            unref(showTabsJuridica) ? (openBlock(), createBlock(VTab, {
                              key: 1,
                              value: "representante"
                            }, {
                              default: withCtx(() => [
                                createTextVNode("Representantes")
                              ]),
                              _: 1
                            })) : createCommentVNode("", true),
                            unref(showTabsJuridica) || unref(showTabsFisica) ? (openBlock(), createBlock(VTab, {
                              key: 2,
                              value: "endereco"
                            }, {
                              default: withCtx(() => [
                                createTextVNode("Endere\xE7os")
                              ]),
                              _: 1
                            })) : createCommentVNode("", true),
                            unref(showTabsFisica) ? (openBlock(), createBlock(VTab, {
                              key: 3,
                              value: "biometria"
                            }, {
                              default: withCtx(() => [
                                createTextVNode("Biometria")
                              ]),
                              _: 1
                            })) : createCommentVNode("", true),
                            unref(showTabsJuridica) || unref(showTabsFisica) ? (openBlock(), createBlock(VTab, {
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
                                unref(state).tipo_pessoa === "fisica" ? (openBlock(), createBlock(_component_Dados, {
                                  key: 0,
                                  onSaved: handleSave,
                                  onCloseModal: closeModal,
                                  isModal: true
                                })) : unref(state).tipo_pessoa === "juridica" ? (openBlock(), createBlock(_component_DadosJuridica, {
                                  key: 1,
                                  onSaved: handleSaveJuridica,
                                  onCloseModal: closeModal,
                                  isModal: true
                                })) : createCommentVNode("", true)
                              ]),
                              _: 1
                            }),
                            _ctx.showTabs ? (openBlock(), createBlock(VTabsWindowItem, {
                              key: 0,
                              value: "documento"
                            }, {
                              default: withCtx(() => [
                                createVNode(_component_Documentos, {
                                  onCloseModal: closeModal,
                                  isModal: true
                                })
                              ]),
                              _: 1
                            })) : createCommentVNode("", true),
                            unref(showTabsJuridica) ? (openBlock(), createBlock(VTabsWindowItem, {
                              key: 1,
                              value: "representante"
                            }, {
                              default: withCtx(() => [
                                createVNode(_component_PessoasCadastrosRepresentantes, {
                                  onCloseModal: closeModal,
                                  isModal: true
                                })
                              ]),
                              _: 1
                            })) : createCommentVNode("", true),
                            unref(showTabsJuridica) || unref(showTabsFisica) ? (openBlock(), createBlock(VTabsWindowItem, {
                              key: 2,
                              value: "endereco"
                            }, {
                              default: withCtx(() => [
                                createVNode(_component_Endereco, {
                                  onCloseModal: closeModal,
                                  isModal: true
                                })
                              ]),
                              _: 1
                            })) : createCommentVNode("", true),
                            _ctx.showTabs ? (openBlock(), createBlock(VTabsWindowItem, {
                              key: 3,
                              value: "biometria"
                            }, {
                              default: withCtx(() => [
                                createVNode(VContainer, null, {
                                  default: withCtx(() => [
                                    createVNode(_component_Biometria, {
                                      onCloseModal: closeModal,
                                      isModal: true
                                    })
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            })) : createCommentVNode("", true),
                            _ctx.showTabs ? (openBlock(), createBlock(VTabsWindowItem, {
                              key: 4,
                              value: "restricao"
                            }, {
                              default: withCtx(() => [
                                createVNode(_component_Restricoes, {
                                  onCloseModal: closeModal,
                                  isModal: true
                                })
                              ]),
                              _: 1
                            })) : createCommentVNode("", true)
                          ]),
                          _: 1
                        }, 8, ["modelValue", "onUpdate:modelValue"])
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
                      createVNode("h1", { style: { "background-color": "#f5f2f2", "color": "#525050", "padding": "10px 0px 0px 20px" } }, " Cadastramento de pessoas "),
                      createVNode("div", { style: { "background-color": "#f5f2f2", "padding": "5px 0px 0px 20px" } }, [
                        createVNode(VAutocomplete, {
                          modelValue: unref(state).tipo_pessoa,
                          "onUpdate:modelValue": ($event) => unref(state).tipo_pessoa = $event,
                          style: { "width": "200px" },
                          items: pessoa_tipo,
                          "item-title": "label",
                          "item-value": "value",
                          label: "Tipo de pessoa",
                          "bg-color": "#F6F6F6",
                          disabled: unref(autocompleteDisabled)
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"])
                      ]),
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
                          unref(showTabsFisica) ? (openBlock(), createBlock(VTab, {
                            key: 0,
                            value: "documento"
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Documentos")
                            ]),
                            _: 1
                          })) : createCommentVNode("", true),
                          unref(showTabsJuridica) ? (openBlock(), createBlock(VTab, {
                            key: 1,
                            value: "representante"
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Representantes")
                            ]),
                            _: 1
                          })) : createCommentVNode("", true),
                          unref(showTabsJuridica) || unref(showTabsFisica) ? (openBlock(), createBlock(VTab, {
                            key: 2,
                            value: "endereco"
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Endere\xE7os")
                            ]),
                            _: 1
                          })) : createCommentVNode("", true),
                          unref(showTabsFisica) ? (openBlock(), createBlock(VTab, {
                            key: 3,
                            value: "biometria"
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Biometria")
                            ]),
                            _: 1
                          })) : createCommentVNode("", true),
                          unref(showTabsJuridica) || unref(showTabsFisica) ? (openBlock(), createBlock(VTab, {
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
                              unref(state).tipo_pessoa === "fisica" ? (openBlock(), createBlock(_component_Dados, {
                                key: 0,
                                onSaved: handleSave,
                                onCloseModal: closeModal,
                                isModal: true
                              })) : unref(state).tipo_pessoa === "juridica" ? (openBlock(), createBlock(_component_DadosJuridica, {
                                key: 1,
                                onSaved: handleSaveJuridica,
                                onCloseModal: closeModal,
                                isModal: true
                              })) : createCommentVNode("", true)
                            ]),
                            _: 1
                          }),
                          _ctx.showTabs ? (openBlock(), createBlock(VTabsWindowItem, {
                            key: 0,
                            value: "documento"
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_Documentos, {
                                onCloseModal: closeModal,
                                isModal: true
                              })
                            ]),
                            _: 1
                          })) : createCommentVNode("", true),
                          unref(showTabsJuridica) ? (openBlock(), createBlock(VTabsWindowItem, {
                            key: 1,
                            value: "representante"
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_PessoasCadastrosRepresentantes, {
                                onCloseModal: closeModal,
                                isModal: true
                              })
                            ]),
                            _: 1
                          })) : createCommentVNode("", true),
                          unref(showTabsJuridica) || unref(showTabsFisica) ? (openBlock(), createBlock(VTabsWindowItem, {
                            key: 2,
                            value: "endereco"
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_Endereco, {
                                onCloseModal: closeModal,
                                isModal: true
                              })
                            ]),
                            _: 1
                          })) : createCommentVNode("", true),
                          _ctx.showTabs ? (openBlock(), createBlock(VTabsWindowItem, {
                            key: 3,
                            value: "biometria"
                          }, {
                            default: withCtx(() => [
                              createVNode(VContainer, null, {
                                default: withCtx(() => [
                                  createVNode(_component_Biometria, {
                                    onCloseModal: closeModal,
                                    isModal: true
                                  })
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          })) : createCommentVNode("", true),
                          _ctx.showTabs ? (openBlock(), createBlock(VTabsWindowItem, {
                            key: 4,
                            value: "restricao"
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_Restricoes, {
                                onCloseModal: closeModal,
                                isModal: true
                              })
                            ]),
                            _: 1
                          })) : createCommentVNode("", true)
                        ]),
                        _: 1
                      }, 8, ["modelValue", "onUpdate:modelValue"])
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
_sfc_main.setup = (props2, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Modal/RegistroPessoas.vue");
  return _sfc_setup ? _sfc_setup(props2, ctx) : void 0;
};

export { _sfc_main as _, _sfc_main$3 as a, _sfc_main$2 as b, _sfc_main$1 as c };
//# sourceMappingURL=RegistroPessoas-CwlxETid.mjs.map
