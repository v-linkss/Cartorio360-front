import { useSSRContext, ref, computed, createVNode, mergeProps, Fragment, shallowRef, watch, provide, withDirectives, resolveDirective, inject, vShow, toRef, reactive, withAsyncContext, unref, withCtx, createTextVNode, openBlock, createBlock, toDisplayString, isRef, nextTick } from 'vue';
import { ssrRenderComponent, ssrInterpolate, ssrGetDirectiveProps, ssrRenderStyle, ssrRenderAttr } from 'vue/server-renderer';
import { useVuelidate } from '@vuelidate/core';
import { helpers, required } from '@vuelidate/validators';
import { p as propsFactory, ap as omit, aW as makeVBtnProps, h as genericComponent, as as useTextColor, k as useRender, f as VBtn, an as forwardRefs, m as makeComponentProps, g as makeTagProps, B as makeThemeProps, F as provideTheme, j as useRtl, E as useLocale, aC as useGroup, D as useProxiedModel, aG as makeGroupItemProps, a_ as makeLazyProps, aI as useGroupItem, a$ as useLazy, aN as MaybeTransition, x as makeDensityProps, a2 as useDensity, Y as useBackgroundColor, am as useScopeId, H as provideDefaults, P as convertToUnit, u as useRouter$1, b as useNuxtApp, e as useCookie, aU as VProgressCircular, V as VTextField, aS as useRoute$1, aT as VSpacer, aX as animate, aY as standardEasing, b0 as isObject, c as useRuntimeConfig, aZ as keys } from './server.mjs';
import { a as useLazyAsyncData, V as VRow } from './VRow-CFCOc45b.mjs';
import { $ as $fetchWithToken, f as fetchWithToken } from './fetchWithToken-KwnGRuiU.mjs';
import { V as VContainer } from './VContainer-CTpFP9Uv.mjs';
import { V as VCol } from './VCol-SA9_fG05.mjs';
import { m as makeVSlideGroupProps, a as VSlideGroup, V as VSelect } from './filter-D8lmgvWc.mjs';
import { V as VAutocomplete } from './VAutocomplete-CsH0CvxZ.mjs';
import { _ as _imports_0, a as _imports_2, b as _imports_3 } from './excluido-CyV-jbSn.mjs';
import { _ as _imports_1 } from './editar-BcGPsVK2.mjs';
import { V as VDataTable } from './VDataTable-C3n1YD6y.mjs';
import { a as VDialog, V as VCard, b as VCardTitle, c as VCardText, d as VCardActions } from './VDialog-D0zunqbh.mjs';
import { u as useSsrBoot } from './VList-BYK7AaxH.mjs';

const cpf = helpers.withMessage("CPF inv\xE1lido", (value) => {
  if (!value) return false;
  const cpf2 = value.replace(/[^\d]+/g, "");
  if (cpf2.length !== 11) return false;
  if (/^(\d)\1+$/.test(cpf2)) return false;
  let add = 0;
  for (let i = 0; i < 9; i++) {
    add += parseInt(cpf2.charAt(i)) * (10 - i);
  }
  let rev = 11 - add % 11;
  if (rev === 10 || rev === 11) rev = 0;
  if (rev !== parseInt(cpf2.charAt(9))) return false;
  add = 0;
  for (let i = 0; i < 10; i++) {
    add += parseInt(cpf2.charAt(i)) * (11 - i);
  }
  rev = 11 - add % 11;
  if (rev === 10 || rev === 11) rev = 0;
  if (rev !== parseInt(cpf2.charAt(10))) return false;
  return true;
});

const _sfc_main$1 = {
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
    const props = __props;
    const emit = __emit;
    const router = useRouter$1();
    const { $toast } = useNuxtApp();
    const config = useRuntimeConfig();
    const createPessoa = `${config.public.auth}/service/gerencia/createPessoa`;
    const updatePessoa = `${config.public.auth}/service/gerencia/updatePessoa`;
    const estadoCivil = `${config.public.auth}/service/gerencia/listarEstadoCivil`;
    const capacidadeCivil = `${config.public.auth}/service/gerencia/listarCapacidadeCivil`;
    const cidade = `${config.public.auth}/service/gerencia/listarCidades`;
    const sexo = `${config.public.auth}/service/gerencia/listarSexo`;
    const initialState = {
      nome: null,
      nome_pai: null,
      nome_mae: null,
      profissao: null,
      local_trabalho: null,
      data_nascimento: null,
      doc_identificacao: null,
      cpf_pai: null,
      cpf_mae: null,
      tipo_pessoa: "FISICA",
      tabvalores_estadocivil_id: null,
      tabvalores_capacidadecivil_id: null,
      tabvalores_sexo_id: null,
      cidade_natural_id: null,
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
      const [estadoCivilItems, capacidadeCivilItems, cidadeNascimentoItems, sexoItems] = await Promise.all([
        $fetchWithToken(estadoCivil),
        $fetchWithToken(capacidadeCivil),
        $fetchWithToken(cidade),
        $fetchWithToken(sexo)
      ]);
      return { estadoCivilItems, capacidadeCivilItems, cidadeNascimentoItems, sexoItems };
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
        const { data, error: error2, status: status2 } = await fetchWithToken(createPessoa, {
          method: "POST",
          body: payloadFormated
        });
        if (status2.value === "error" && error2.value.statusCode === 500) {
          $toast.error("Erro ao cadastrar pessoa,o CPF j\xE1 est\xE1 cadastrado.");
        } else {
          $toast.success("Pessoa cadastrada com sucesso!");
          const pessoaIdValue = data.value.id;
          pessoaId.value = pessoaIdValue;
          const pessoa_token = useCookie("pessoa_token");
          pessoa_token.value = data.value.token;
          isEditMode.value = true;
          emit("saved");
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
      const { data, error: error2, status: status2 } = await fetchWithToken(
        `${updatePessoa}/${pessoaId.value}`,
        {
          method: "PUT",
          body: payloadFormated
        }
      );
      if (status2.value === "success") {
        if (props.isModal === true) {
          $toast.success("Pessoa atualizada com sucesso!");
          emit("close-modal");
          return;
        }
        $toast.success("Pessoa atualizada com sucesso!");
        router.push("/pessoas/lista");
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
                    _push3(ssrRenderComponent(VCol, { md: "6" }, {
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
                    _push3(ssrRenderComponent(VCol, { md: "2" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(VSelect, {
                            label: "Sexo",
                            modelValue: unref(state).tabvalores_sexo_id,
                            "onUpdate:modelValue": ($event) => unref(state).tabvalores_sexo_id = $event,
                            items: unref(dados).sexoItems,
                            "item-title": "descricao",
                            "item-value": "id"
                          }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(VSelect, {
                              label: "Sexo",
                              modelValue: unref(state).tabvalores_sexo_id,
                              "onUpdate:modelValue": ($event) => unref(state).tabvalores_sexo_id = $event,
                              items: unref(dados).sexoItems,
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
                      createVNode(VCol, { md: "6" }, {
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
                      }),
                      createVNode(VCol, { md: "2" }, {
                        default: withCtx(() => [
                          createVNode(VSelect, {
                            label: "Sexo",
                            modelValue: unref(state).tabvalores_sexo_id,
                            "onUpdate:modelValue": ($event) => unref(state).tabvalores_sexo_id = $event,
                            items: unref(dados).sexoItems,
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
                    createVNode(VCol, { md: "6" }, {
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
                    }),
                    createVNode(VCol, { md: "2" }, {
                      default: withCtx(() => [
                        createVNode(VSelect, {
                          label: "Sexo",
                          modelValue: unref(state).tabvalores_sexo_id,
                          "onUpdate:modelValue": ($event) => unref(state).tabvalores_sexo_id = $event,
                          items: unref(dados).sexoItems,
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
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Dados.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : undefined;
};
const _sfc_main = {
  __name: "Endereco",
  __ssrInlineRender: true,
  props: {
    isModal: {
      type: Boolean,
      default: false
    }
  },
  emits: ["close-modal"],
  async setup(__props, { emit: __emit }) {
    let __temp, __restore;
    const emit = __emit;
    const props = __props;
    const { $toast } = useNuxtApp();
    const route = useRoute$1();
    const { id } = route.params;
    const router = useRouter$1();
    const config = useRuntimeConfig();
    const allPaises = `${config.public.auth}/service/gerencia/listarPais`;
    const allEnderecos = `${config.public.auth}/service/gerencia/getPessoaEnderecoById`;
    const criarEnderecos = `${config.public.auth}/service/gerencia/createPessoaEndereco`;
    const updateEndereco = `${config.public.auth}/service/gerencia/updatePessoaEndereco`;
    const user_id = ref(useCookie("user-data").value.usuario_id).value;
    const pessoa_id = id ? Number(id) : Number(useCookie("pessoa-id").value);
    const state = reactive({
      tabvalores_pais_id: null,
      cidade_id: null,
      codcep: null,
      logradouro: null,
      numero: null,
      bairro: null,
      complemento: null,
      cidade_estrangeira: null
    });
    const headers = [
      { title: "Pa\xEDs", value: "pais.descricao" },
      { title: "CEP", value: "codcep" },
      { title: "Endere\xE7o", value: "logradouro" },
      {
        title: "N*",
        value: "numero"
      },
      {
        title: "Complemento",
        value: "complemento"
      },
      {
        title: "Bairro",
        value: "bairro"
      },
      {
        title: "Cidade",
        value: "cidade"
      },
      {
        value: "actions"
      }
    ];
    const isModalOpen = ref(false);
    const selectedEndereco = ref(null);
    const isForeign = computed(() => {
      const selectedPais = enderecos.value.paisItems.find(
        (pais) => pais.id === state.tabvalores_pais_id
      );
      return selectedPais ? selectedPais.estrangeiro : false;
    });
    const getCidadeNome = (item) => {
      var _a;
      return ((_a = item.cidades) == null ? undefined : _a.nome) || item.cidade_estrangeira;
    };
    const rules = {
      numero: {
        required: helpers.withMessage("O campo \xE9 obrigatorio", required)
      },
      bairro: {
        required: helpers.withMessage("O campo \xE9 obrigatorio", required)
      },
      logradouro: {
        required: helpers.withMessage("O campo \xE9 obrigatorio", required)
      },
      codcep: {
        required: helpers.withMessage(
          "O campo \xE9 obrigatorio e precisa de 8 digitos",
          required
        )
      }
    };
    const v$ = useVuelidate(rules, state);
    const {
      data: enderecos,
      status,
      pending,
      refresh
    } = ([__temp, __restore] = withAsyncContext(async () => useLazyAsyncData("cliente-enderecos", async () => {
      const [paisItems, enderecosItems, cidadesItems] = await Promise.all([
        $fetchWithToken(allPaises),
        $fetchWithToken(`${allEnderecos}/${pessoa_id}`),
        $fetchWithToken(`${config.public.auth}/service/gerencia/listarCidades`)
      ]);
      return { paisItems, enderecosItems, cidadesItems };
    })), __temp = await __temp, __restore(), __temp);
    async function onSubmitAdressNational() {
      if (await v$.value.$validate()) {
        const payload = { ...state };
        const payloadFormated = {
          ...payload,
          user_id,
          pessoa_id
        };
        const { data, error, status: status2 } = await fetchWithToken(criarEnderecos, {
          method: "POST",
          body: payloadFormated
        });
        if (status2.value === "error" && error.value.statusCode === 500) {
          $toast.error("Erro ao cadastrar endere\xE7o,erro no sistema.");
        } else {
          $toast.success("Endere\xE7o cadastrado com sucesso!");
          refresh();
          for (const key in state) {
            state[key] = null;
          }
          v$.value.$reset();
        }
      } else {
        $toast.error(
          "Erro ao cadastrar Endere\xE7o, preencha os campos obrigatorios."
        );
      }
    }
    async function onSubmitAdressForeign() {
      if (!state.cidade_estrangeira || !state.logradouro) {
        $toast.error("Os Campos Cidade Estrangeira e Endere\xE7o s\xE3o obrigatorios!");
        return;
      }
      const payload = { ...state };
      const payloadFormated = {
        ...payload,
        user_id,
        pessoa_id
      };
      const { data, error, status: status2 } = await fetchWithToken(criarEnderecos, {
        method: "POST",
        body: payloadFormated
      });
      if (status2.value === "error" && error.value.statusCode === 500) {
        $toast.error("Erro ao cadastrar endere\xE7o,erro no sistema.");
      } else {
        $toast.success("Endere\xE7o cadastrado com sucesso!");
        refresh();
        for (const key in state) {
          state[key] = null;
        }
        v$.value.$reset();
      }
    }
    function redirectToUpdate(id2) {
      const endereco = enderecos.value.enderecosItems.find(
        (item) => item.id === id2
      );
      if (endereco) {
        selectedEndereco.value = endereco;
        isModalOpen.value = true;
      }
    }
    async function onUpdate(id2) {
      const payloadFormated = {
        tabvalores_pais_id: selectedEndereco.value.tabvalores_pais_id,
        cidade_id: selectedEndereco.value.cidade_id,
        codcep: selectedEndereco.value.codcep,
        logradouro: selectedEndereco.value.logradouro,
        numero: selectedEndereco.value.numero,
        bairro: selectedEndereco.value.bairro,
        complemento: selectedEndereco.value.complemento
      };
      const { status: status2 } = await fetchWithToken(`${updateEndereco}/${id2}`, {
        method: "PUT",
        body: payloadFormated
      });
      if (status2.value === "success") {
        isModalOpen.value = false;
        $toast.success("Endere\xE7o atualizado com sucesso!");
        refresh();
      }
    }
    async function deleteEndereco(item) {
      item.excluido = !item.excluido;
      try {
        await fetchWithToken(`${updateEndereco}/${item.id}`, {
          method: "PUT",
          body: { excluido: item.excluido }
        });
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
      const _directive_mask = resolveDirective("mask");
      _push(`<!--[-->`);
      if (!unref(pending)) {
        _push(ssrRenderComponent(VContainer, {
          class: "mt-3",
          style: { "height": "425px" }
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(VRow, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(VCol, { md: "2" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(VAutocomplete, {
                            modelValue: unref(state).tabvalores_pais_id,
                            "onUpdate:modelValue": ($event) => unref(state).tabvalores_pais_id = $event,
                            items: unref(enderecos).paisItems,
                            label: "Pa\xEDs",
                            "item-title": "descricao",
                            "item-value": "id"
                          }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(VAutocomplete, {
                              modelValue: unref(state).tabvalores_pais_id,
                              "onUpdate:modelValue": ($event) => unref(state).tabvalores_pais_id = $event,
                              items: unref(enderecos).paisItems,
                              label: "Pa\xEDs",
                              "item-title": "descricao",
                              "item-value": "id"
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(VCol, { md: "2" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          if (!unref(isForeign)) {
                            _push4(ssrRenderComponent(VTextField, mergeProps({
                              modelValue: unref(state).codcep,
                              "onUpdate:modelValue": ($event) => unref(state).codcep = $event,
                              "error-messages": unref(v$).codcep.$errors.map((e) => e.$message),
                              required: "",
                              onBlur: unref(v$).codcep.$touch,
                              onInput: unref(v$).codcep.$touch,
                              label: "CEP"
                            }, ssrGetDirectiveProps(_ctx, _directive_mask, "########")), null, _parent4, _scopeId3));
                          } else {
                            _push4(ssrRenderComponent(VTextField, mergeProps({
                              modelValue: unref(state).codcep,
                              "onUpdate:modelValue": ($event) => unref(state).codcep = $event,
                              label: "CEP"
                            }, ssrGetDirectiveProps(_ctx, _directive_mask, "########")), null, _parent4, _scopeId3));
                          }
                        } else {
                          return [
                            !unref(isForeign) ? withDirectives((openBlock(), createBlock(VTextField, {
                              key: 0,
                              modelValue: unref(state).codcep,
                              "onUpdate:modelValue": ($event) => unref(state).codcep = $event,
                              "error-messages": unref(v$).codcep.$errors.map((e) => e.$message),
                              required: "",
                              onBlur: unref(v$).codcep.$touch,
                              onInput: unref(v$).codcep.$touch,
                              label: "CEP"
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages", "onBlur", "onInput"])), [
                              [_directive_mask, "########"]
                            ]) : withDirectives((openBlock(), createBlock(VTextField, {
                              key: 1,
                              modelValue: unref(state).codcep,
                              "onUpdate:modelValue": ($event) => unref(state).codcep = $event,
                              label: "CEP"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])), [
                              [_directive_mask, "########"]
                            ])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(VCol, { md: "6" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          if (!unref(isForeign)) {
                            _push4(ssrRenderComponent(VTextField, {
                              modelValue: unref(state).logradouro,
                              "onUpdate:modelValue": ($event) => unref(state).logradouro = $event,
                              label: "Endere\xE7o",
                              "error-messages": unref(v$).logradouro.$errors.map((e) => e.$message),
                              required: "",
                              onBlur: unref(v$).logradouro.$touch,
                              onInput: unref(v$).logradouro.$touch
                            }, null, _parent4, _scopeId3));
                          } else {
                            _push4(ssrRenderComponent(VTextField, {
                              modelValue: unref(state).logradouro,
                              "onUpdate:modelValue": ($event) => unref(state).logradouro = $event,
                              label: "Endere\xE7o"
                            }, null, _parent4, _scopeId3));
                          }
                        } else {
                          return [
                            !unref(isForeign) ? (openBlock(), createBlock(VTextField, {
                              key: 0,
                              modelValue: unref(state).logradouro,
                              "onUpdate:modelValue": ($event) => unref(state).logradouro = $event,
                              label: "Endere\xE7o",
                              "error-messages": unref(v$).logradouro.$errors.map((e) => e.$message),
                              required: "",
                              onBlur: unref(v$).logradouro.$touch,
                              onInput: unref(v$).logradouro.$touch
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages", "onBlur", "onInput"])) : (openBlock(), createBlock(VTextField, {
                              key: 1,
                              modelValue: unref(state).logradouro,
                              "onUpdate:modelValue": ($event) => unref(state).logradouro = $event,
                              label: "Endere\xE7o"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"]))
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(VCol, { md: "1" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          if (!unref(isForeign)) {
                            _push4(ssrRenderComponent(VTextField, {
                              modelValue: unref(state).numero,
                              "onUpdate:modelValue": ($event) => unref(state).numero = $event,
                              required: "",
                              "error-messages": unref(v$).numero.$errors.map((e) => e.$message),
                              onBlur: unref(v$).numero.$touch,
                              onInput: unref(v$).numero.$touch,
                              label: "N*"
                            }, null, _parent4, _scopeId3));
                          } else {
                            _push4(ssrRenderComponent(VTextField, {
                              modelValue: unref(state).numero,
                              "onUpdate:modelValue": ($event) => unref(state).numero = $event,
                              label: "N*"
                            }, null, _parent4, _scopeId3));
                          }
                        } else {
                          return [
                            !unref(isForeign) ? (openBlock(), createBlock(VTextField, {
                              key: 0,
                              modelValue: unref(state).numero,
                              "onUpdate:modelValue": ($event) => unref(state).numero = $event,
                              required: "",
                              "error-messages": unref(v$).numero.$errors.map((e) => e.$message),
                              onBlur: unref(v$).numero.$touch,
                              onInput: unref(v$).numero.$touch,
                              label: "N*"
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages", "onBlur", "onInput"])) : (openBlock(), createBlock(VTextField, {
                              key: 1,
                              modelValue: unref(state).numero,
                              "onUpdate:modelValue": ($event) => unref(state).numero = $event,
                              label: "N*"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"]))
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(`<div class="mt-1"${_scopeId2}><img style="${ssrRenderStyle({ "width": "40px", "height": "40px", "cursor": "pointer" })}"${ssrRenderAttr("src", _imports_0)} alt="novo"${_scopeId2}></div>`);
                    _push3(ssrRenderComponent(VCol, { md: "5" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(VTextField, {
                            modelValue: unref(state).complemento,
                            "onUpdate:modelValue": ($event) => unref(state).complemento = $event,
                            label: "Complemento"
                          }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(VTextField, {
                              modelValue: unref(state).complemento,
                              "onUpdate:modelValue": ($event) => unref(state).complemento = $event,
                              label: "Complemento"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(VCol, { md: "3" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          if (!unref(isForeign)) {
                            _push4(ssrRenderComponent(VTextField, {
                              modelValue: unref(state).bairro,
                              "onUpdate:modelValue": ($event) => unref(state).bairro = $event,
                              "error-messages": unref(v$).bairro.$errors.map((e) => e.$message),
                              required: "",
                              onBlur: unref(v$).bairro.$touch,
                              onInput: unref(v$).bairro.$touch,
                              label: "Bairro"
                            }, null, _parent4, _scopeId3));
                          } else {
                            _push4(ssrRenderComponent(VTextField, {
                              modelValue: unref(state).bairro,
                              "onUpdate:modelValue": ($event) => unref(state).bairro = $event,
                              label: "Bairro"
                            }, null, _parent4, _scopeId3));
                          }
                        } else {
                          return [
                            !unref(isForeign) ? (openBlock(), createBlock(VTextField, {
                              key: 0,
                              modelValue: unref(state).bairro,
                              "onUpdate:modelValue": ($event) => unref(state).bairro = $event,
                              "error-messages": unref(v$).bairro.$errors.map((e) => e.$message),
                              required: "",
                              onBlur: unref(v$).bairro.$touch,
                              onInput: unref(v$).bairro.$touch,
                              label: "Bairro"
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages", "onBlur", "onInput"])) : (openBlock(), createBlock(VTextField, {
                              key: 1,
                              modelValue: unref(state).bairro,
                              "onUpdate:modelValue": ($event) => unref(state).bairro = $event,
                              label: "Bairro"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"]))
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(VCol, { md: "3" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          if (!unref(isForeign)) {
                            _push4(ssrRenderComponent(VAutocomplete, {
                              modelValue: unref(state).cidade_id,
                              "onUpdate:modelValue": ($event) => unref(state).cidade_id = $event,
                              items: unref(enderecos).cidadesItems,
                              label: "Cidade",
                              "item-title": "descricao",
                              "item-value": "id"
                            }, null, _parent4, _scopeId3));
                          } else {
                            _push4(ssrRenderComponent(VTextField, {
                              modelValue: unref(state).cidade_estrangeira,
                              "onUpdate:modelValue": ($event) => unref(state).cidade_estrangeira = $event,
                              label: "Cidade Estrangeira"
                            }, null, _parent4, _scopeId3));
                          }
                        } else {
                          return [
                            !unref(isForeign) ? (openBlock(), createBlock(VAutocomplete, {
                              key: 0,
                              modelValue: unref(state).cidade_id,
                              "onUpdate:modelValue": ($event) => unref(state).cidade_id = $event,
                              items: unref(enderecos).cidadesItems,
                              label: "Cidade",
                              "item-title": "descricao",
                              "item-value": "id"
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])) : (openBlock(), createBlock(VTextField, {
                              key: 1,
                              modelValue: unref(state).cidade_estrangeira,
                              "onUpdate:modelValue": ($event) => unref(state).cidade_estrangeira = $event,
                              label: "Cidade Estrangeira"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"]))
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(VCol, { md: "2" }, {
                        default: withCtx(() => [
                          createVNode(VAutocomplete, {
                            modelValue: unref(state).tabvalores_pais_id,
                            "onUpdate:modelValue": ($event) => unref(state).tabvalores_pais_id = $event,
                            items: unref(enderecos).paisItems,
                            label: "Pa\xEDs",
                            "item-title": "descricao",
                            "item-value": "id"
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                        ]),
                        _: 1
                      }),
                      createVNode(VCol, { md: "2" }, {
                        default: withCtx(() => [
                          !unref(isForeign) ? withDirectives((openBlock(), createBlock(VTextField, {
                            key: 0,
                            modelValue: unref(state).codcep,
                            "onUpdate:modelValue": ($event) => unref(state).codcep = $event,
                            "error-messages": unref(v$).codcep.$errors.map((e) => e.$message),
                            required: "",
                            onBlur: unref(v$).codcep.$touch,
                            onInput: unref(v$).codcep.$touch,
                            label: "CEP"
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages", "onBlur", "onInput"])), [
                            [_directive_mask, "########"]
                          ]) : withDirectives((openBlock(), createBlock(VTextField, {
                            key: 1,
                            modelValue: unref(state).codcep,
                            "onUpdate:modelValue": ($event) => unref(state).codcep = $event,
                            label: "CEP"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])), [
                            [_directive_mask, "########"]
                          ])
                        ]),
                        _: 1
                      }),
                      createVNode(VCol, { md: "6" }, {
                        default: withCtx(() => [
                          !unref(isForeign) ? (openBlock(), createBlock(VTextField, {
                            key: 0,
                            modelValue: unref(state).logradouro,
                            "onUpdate:modelValue": ($event) => unref(state).logradouro = $event,
                            label: "Endere\xE7o",
                            "error-messages": unref(v$).logradouro.$errors.map((e) => e.$message),
                            required: "",
                            onBlur: unref(v$).logradouro.$touch,
                            onInput: unref(v$).logradouro.$touch
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages", "onBlur", "onInput"])) : (openBlock(), createBlock(VTextField, {
                            key: 1,
                            modelValue: unref(state).logradouro,
                            "onUpdate:modelValue": ($event) => unref(state).logradouro = $event,
                            label: "Endere\xE7o"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"]))
                        ]),
                        _: 1
                      }),
                      createVNode(VCol, { md: "1" }, {
                        default: withCtx(() => [
                          !unref(isForeign) ? (openBlock(), createBlock(VTextField, {
                            key: 0,
                            modelValue: unref(state).numero,
                            "onUpdate:modelValue": ($event) => unref(state).numero = $event,
                            required: "",
                            "error-messages": unref(v$).numero.$errors.map((e) => e.$message),
                            onBlur: unref(v$).numero.$touch,
                            onInput: unref(v$).numero.$touch,
                            label: "N*"
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages", "onBlur", "onInput"])) : (openBlock(), createBlock(VTextField, {
                            key: 1,
                            modelValue: unref(state).numero,
                            "onUpdate:modelValue": ($event) => unref(state).numero = $event,
                            label: "N*"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"]))
                        ]),
                        _: 1
                      }),
                      createVNode("div", { class: "mt-1" }, [
                        createVNode("img", {
                          style: { "width": "40px", "height": "40px", "cursor": "pointer" },
                          src: _imports_0,
                          alt: "novo",
                          onClick: ($event) => !unref(isForeign) ? onSubmitAdressNational() : onSubmitAdressForeign()
                        }, null, 8, ["onClick"])
                      ]),
                      createVNode(VCol, { md: "5" }, {
                        default: withCtx(() => [
                          createVNode(VTextField, {
                            modelValue: unref(state).complemento,
                            "onUpdate:modelValue": ($event) => unref(state).complemento = $event,
                            label: "Complemento"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        _: 1
                      }),
                      createVNode(VCol, { md: "3" }, {
                        default: withCtx(() => [
                          !unref(isForeign) ? (openBlock(), createBlock(VTextField, {
                            key: 0,
                            modelValue: unref(state).bairro,
                            "onUpdate:modelValue": ($event) => unref(state).bairro = $event,
                            "error-messages": unref(v$).bairro.$errors.map((e) => e.$message),
                            required: "",
                            onBlur: unref(v$).bairro.$touch,
                            onInput: unref(v$).bairro.$touch,
                            label: "Bairro"
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages", "onBlur", "onInput"])) : (openBlock(), createBlock(VTextField, {
                            key: 1,
                            modelValue: unref(state).bairro,
                            "onUpdate:modelValue": ($event) => unref(state).bairro = $event,
                            label: "Bairro"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"]))
                        ]),
                        _: 1
                      }),
                      createVNode(VCol, { md: "3" }, {
                        default: withCtx(() => [
                          !unref(isForeign) ? (openBlock(), createBlock(VAutocomplete, {
                            key: 0,
                            modelValue: unref(state).cidade_id,
                            "onUpdate:modelValue": ($event) => unref(state).cidade_id = $event,
                            items: unref(enderecos).cidadesItems,
                            label: "Cidade",
                            "item-title": "descricao",
                            "item-value": "id"
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])) : (openBlock(), createBlock(VTextField, {
                            key: 1,
                            modelValue: unref(state).cidade_estrangeira,
                            "onUpdate:modelValue": ($event) => unref(state).cidade_estrangeira = $event,
                            label: "Cidade Estrangeira"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"]))
                        ]),
                        _: 1
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(VDataTable, {
                style: { "max-height": "330px" },
                headers,
                items: unref(enderecos).enderecosItems,
                "item-key": "id"
              }, {
                "item.cidade": withCtx(({ item }, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<h4 style="${ssrRenderStyle({ "width": "150px", "font-weight": "500" })}"${_scopeId2}>${ssrInterpolate(getCidadeNome(item))}</h4>`);
                  } else {
                    return [
                      createVNode("h4", { style: { "width": "150px", "font-weight": "500" } }, toDisplayString(getCidadeNome(item)), 1)
                    ];
                  }
                }),
                "item.logradouro": withCtx(({ item }, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<h4 style="${ssrRenderStyle({ "width": "200px", "font-weight": "500" })}"${_scopeId2}>${ssrInterpolate(item.logradouro)}</h4>`);
                  } else {
                    return [
                      createVNode("h4", { style: { "width": "200px", "font-weight": "500" } }, toDisplayString(item.logradouro), 1)
                    ];
                  }
                }),
                "item.actions": withCtx(({ item }, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(VRow, { style: { "display": "flex", "margin-top": "-8px", "gap": "10px" } }, {
                      default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<div title="Visualizar"${_scopeId3}><img style="${ssrRenderStyle({ "width": "30px", "height": "30px", "cursor": "pointer" })}"${ssrRenderAttr("src", _imports_1)} alt="Visualizar"${_scopeId3}></div><div title="Visualizar"${_scopeId3}>`);
                          if (item.excluido) {
                            _push4(`<img style="${ssrRenderStyle({ "width": "30px", "height": "30px", "cursor": "pointer" })}"${ssrRenderAttr("src", _imports_2)} alt="Visualizar" title="Reativar"${_scopeId3}>`);
                          } else {
                            _push4(`<img${ssrRenderAttr("src", _imports_3)} alt="Excluir" class="trash-icon" style="${ssrRenderStyle({ "width": "30px", "height": "30px", "cursor": "pointer" })}" title="Excluir"${_scopeId3}>`);
                          }
                          _push4(`</div>`);
                        } else {
                          return [
                            createVNode("div", {
                              onClick: ($event) => redirectToUpdate(item.id),
                              title: "Visualizar"
                            }, [
                              createVNode("img", {
                                style: { "width": "30px", "height": "30px", "cursor": "pointer" },
                                src: _imports_1,
                                alt: "Visualizar"
                              })
                            ], 8, ["onClick"]),
                            createVNode("div", {
                              onClick: ($event) => deleteEndereco(item),
                              title: "Visualizar"
                            }, [
                              item.excluido ? (openBlock(), createBlock("img", {
                                key: 0,
                                style: { "width": "30px", "height": "30px", "cursor": "pointer" },
                                src: _imports_2,
                                alt: "Visualizar",
                                title: "Reativar"
                              })) : (openBlock(), createBlock("img", {
                                key: 1,
                                src: _imports_3,
                                alt: "Excluir",
                                class: "trash-icon",
                                style: { "width": "30px", "height": "30px", "cursor": "pointer" },
                                title: "Excluir"
                              }))
                            ], 8, ["onClick"])
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(VRow, { style: { "display": "flex", "margin-top": "-8px", "gap": "10px" } }, {
                        default: withCtx(() => [
                          createVNode("div", {
                            onClick: ($event) => redirectToUpdate(item.id),
                            title: "Visualizar"
                          }, [
                            createVNode("img", {
                              style: { "width": "30px", "height": "30px", "cursor": "pointer" },
                              src: _imports_1,
                              alt: "Visualizar"
                            })
                          ], 8, ["onClick"]),
                          createVNode("div", {
                            onClick: ($event) => deleteEndereco(item),
                            title: "Visualizar"
                          }, [
                            item.excluido ? (openBlock(), createBlock("img", {
                              key: 0,
                              style: { "width": "30px", "height": "30px", "cursor": "pointer" },
                              src: _imports_2,
                              alt: "Visualizar",
                              title: "Reativar"
                            })) : (openBlock(), createBlock("img", {
                              key: 1,
                              src: _imports_3,
                              alt: "Excluir",
                              class: "trash-icon",
                              style: { "width": "30px", "height": "30px", "cursor": "pointer" },
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
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(VDialog, {
                modelValue: unref(isModalOpen),
                "onUpdate:modelValue": ($event) => isRef(isModalOpen) ? isModalOpen.value = $event : null,
                "max-width": "600px"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(VCard, null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(VCardTitle, { style: { "color": "green" } }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`Atualizar Endere\xE7o`);
                              } else {
                                return [
                                  createTextVNode("Atualizar Endere\xE7o")
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                          _push4(ssrRenderComponent(VCardText, null, {
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
                                            _push7(ssrRenderComponent(VAutocomplete, {
                                              modelValue: unref(selectedEndereco).tabvalores_pais_id,
                                              "onUpdate:modelValue": ($event) => unref(selectedEndereco).tabvalores_pais_id = $event,
                                              items: unref(enderecos).paisItems,
                                              label: "Pa\xEDs",
                                              "item-title": "descricao",
                                              "item-value": "id"
                                            }, null, _parent7, _scopeId6));
                                          } else {
                                            return [
                                              createVNode(VAutocomplete, {
                                                modelValue: unref(selectedEndereco).tabvalores_pais_id,
                                                "onUpdate:modelValue": ($event) => unref(selectedEndereco).tabvalores_pais_id = $event,
                                                items: unref(enderecos).paisItems,
                                                label: "Pa\xEDs",
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
                                        md: "6"
                                      }, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(ssrRenderComponent(VTextField, {
                                              modelValue: unref(selectedEndereco).logradouro,
                                              "onUpdate:modelValue": ($event) => unref(selectedEndereco).logradouro = $event,
                                              label: "Logradouro"
                                            }, null, _parent7, _scopeId6));
                                          } else {
                                            return [
                                              createVNode(VTextField, {
                                                modelValue: unref(selectedEndereco).logradouro,
                                                "onUpdate:modelValue": ($event) => unref(selectedEndereco).logradouro = $event,
                                                label: "Logradouro"
                                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                            ];
                                          }
                                        }),
                                        _: 1
                                      }, _parent6, _scopeId5));
                                      _push6(ssrRenderComponent(VCol, {
                                        cols: "12",
                                        md: "6"
                                      }, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(ssrRenderComponent(VTextField, {
                                              modelValue: unref(selectedEndereco).complemento,
                                              "onUpdate:modelValue": ($event) => unref(selectedEndereco).complemento = $event,
                                              label: "Complemento"
                                            }, null, _parent7, _scopeId6));
                                          } else {
                                            return [
                                              createVNode(VTextField, {
                                                modelValue: unref(selectedEndereco).complemento,
                                                "onUpdate:modelValue": ($event) => unref(selectedEndereco).complemento = $event,
                                                label: "Complemento"
                                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                            ];
                                          }
                                        }),
                                        _: 1
                                      }, _parent6, _scopeId5));
                                      _push6(ssrRenderComponent(VCol, {
                                        cols: "12",
                                        md: "6"
                                      }, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(ssrRenderComponent(VTextField, {
                                              modelValue: unref(selectedEndereco).numero,
                                              "onUpdate:modelValue": ($event) => unref(selectedEndereco).numero = $event,
                                              label: "N\xFAmero"
                                            }, null, _parent7, _scopeId6));
                                          } else {
                                            return [
                                              createVNode(VTextField, {
                                                modelValue: unref(selectedEndereco).numero,
                                                "onUpdate:modelValue": ($event) => unref(selectedEndereco).numero = $event,
                                                label: "N\xFAmero"
                                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                            ];
                                          }
                                        }),
                                        _: 1
                                      }, _parent6, _scopeId5));
                                      _push6(ssrRenderComponent(VCol, {
                                        cols: "12",
                                        md: "6"
                                      }, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(ssrRenderComponent(VTextField, {
                                              modelValue: unref(selectedEndereco).bairro,
                                              "onUpdate:modelValue": ($event) => unref(selectedEndereco).bairro = $event,
                                              label: "Bairro"
                                            }, null, _parent7, _scopeId6));
                                          } else {
                                            return [
                                              createVNode(VTextField, {
                                                modelValue: unref(selectedEndereco).bairro,
                                                "onUpdate:modelValue": ($event) => unref(selectedEndereco).bairro = $event,
                                                label: "Bairro"
                                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                            ];
                                          }
                                        }),
                                        _: 1
                                      }, _parent6, _scopeId5));
                                      _push6(ssrRenderComponent(VCol, {
                                        cols: "12",
                                        md: "6"
                                      }, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(ssrRenderComponent(VTextField, {
                                              modelValue: unref(selectedEndereco).codcep,
                                              "onUpdate:modelValue": ($event) => unref(selectedEndereco).codcep = $event,
                                              label: "CEP"
                                            }, null, _parent7, _scopeId6));
                                          } else {
                                            return [
                                              createVNode(VTextField, {
                                                modelValue: unref(selectedEndereco).codcep,
                                                "onUpdate:modelValue": ($event) => unref(selectedEndereco).codcep = $event,
                                                label: "CEP"
                                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                            ];
                                          }
                                        }),
                                        _: 1
                                      }, _parent6, _scopeId5));
                                      _push6(ssrRenderComponent(VCol, {
                                        cols: "12",
                                        md: "6"
                                      }, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            if (unref(selectedEndereco).cidade_estrangeira) {
                                              _push7(ssrRenderComponent(VAutocomplete, {
                                                modelValue: unref(selectedEndereco).cidade_id,
                                                "onUpdate:modelValue": ($event) => unref(selectedEndereco).cidade_id = $event,
                                                items: unref(enderecos).cidadesItems,
                                                label: "Cidade",
                                                "item-title": "descricao",
                                                "item-value": "id"
                                              }, null, _parent7, _scopeId6));
                                            } else {
                                              _push7(ssrRenderComponent(VTextField, {
                                                modelValue: unref(selectedEndereco).cidade_estrangeira,
                                                "onUpdate:modelValue": ($event) => unref(selectedEndereco).cidade_estrangeira = $event,
                                                label: "Cidade Estrangeira"
                                              }, null, _parent7, _scopeId6));
                                            }
                                          } else {
                                            return [
                                              unref(selectedEndereco).cidade_estrangeira ? (openBlock(), createBlock(VAutocomplete, {
                                                key: 0,
                                                modelValue: unref(selectedEndereco).cidade_id,
                                                "onUpdate:modelValue": ($event) => unref(selectedEndereco).cidade_id = $event,
                                                items: unref(enderecos).cidadesItems,
                                                label: "Cidade",
                                                "item-title": "descricao",
                                                "item-value": "id"
                                              }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])) : (openBlock(), createBlock(VTextField, {
                                                key: 1,
                                                modelValue: unref(selectedEndereco).cidade_estrangeira,
                                                "onUpdate:modelValue": ($event) => unref(selectedEndereco).cidade_estrangeira = $event,
                                                label: "Cidade Estrangeira"
                                              }, null, 8, ["modelValue", "onUpdate:modelValue"]))
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
                                            createVNode(VAutocomplete, {
                                              modelValue: unref(selectedEndereco).tabvalores_pais_id,
                                              "onUpdate:modelValue": ($event) => unref(selectedEndereco).tabvalores_pais_id = $event,
                                              items: unref(enderecos).paisItems,
                                              label: "Pa\xEDs",
                                              "item-title": "descricao",
                                              "item-value": "id"
                                            }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(VCol, {
                                          cols: "12",
                                          md: "6"
                                        }, {
                                          default: withCtx(() => [
                                            createVNode(VTextField, {
                                              modelValue: unref(selectedEndereco).logradouro,
                                              "onUpdate:modelValue": ($event) => unref(selectedEndereco).logradouro = $event,
                                              label: "Logradouro"
                                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(VCol, {
                                          cols: "12",
                                          md: "6"
                                        }, {
                                          default: withCtx(() => [
                                            createVNode(VTextField, {
                                              modelValue: unref(selectedEndereco).complemento,
                                              "onUpdate:modelValue": ($event) => unref(selectedEndereco).complemento = $event,
                                              label: "Complemento"
                                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(VCol, {
                                          cols: "12",
                                          md: "6"
                                        }, {
                                          default: withCtx(() => [
                                            createVNode(VTextField, {
                                              modelValue: unref(selectedEndereco).numero,
                                              "onUpdate:modelValue": ($event) => unref(selectedEndereco).numero = $event,
                                              label: "N\xFAmero"
                                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(VCol, {
                                          cols: "12",
                                          md: "6"
                                        }, {
                                          default: withCtx(() => [
                                            createVNode(VTextField, {
                                              modelValue: unref(selectedEndereco).bairro,
                                              "onUpdate:modelValue": ($event) => unref(selectedEndereco).bairro = $event,
                                              label: "Bairro"
                                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(VCol, {
                                          cols: "12",
                                          md: "6"
                                        }, {
                                          default: withCtx(() => [
                                            createVNode(VTextField, {
                                              modelValue: unref(selectedEndereco).codcep,
                                              "onUpdate:modelValue": ($event) => unref(selectedEndereco).codcep = $event,
                                              label: "CEP"
                                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(VCol, {
                                          cols: "12",
                                          md: "6"
                                        }, {
                                          default: withCtx(() => [
                                            unref(selectedEndereco).cidade_estrangeira ? (openBlock(), createBlock(VAutocomplete, {
                                              key: 0,
                                              modelValue: unref(selectedEndereco).cidade_id,
                                              "onUpdate:modelValue": ($event) => unref(selectedEndereco).cidade_id = $event,
                                              items: unref(enderecos).cidadesItems,
                                              label: "Cidade",
                                              "item-title": "descricao",
                                              "item-value": "id"
                                            }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])) : (openBlock(), createBlock(VTextField, {
                                              key: 1,
                                              modelValue: unref(selectedEndereco).cidade_estrangeira,
                                              "onUpdate:modelValue": ($event) => unref(selectedEndereco).cidade_estrangeira = $event,
                                              label: "Cidade Estrangeira"
                                            }, null, 8, ["modelValue", "onUpdate:modelValue"]))
                                          ]),
                                          _: 1
                                        })
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
                                          createVNode(VAutocomplete, {
                                            modelValue: unref(selectedEndereco).tabvalores_pais_id,
                                            "onUpdate:modelValue": ($event) => unref(selectedEndereco).tabvalores_pais_id = $event,
                                            items: unref(enderecos).paisItems,
                                            label: "Pa\xEDs",
                                            "item-title": "descricao",
                                            "item-value": "id"
                                          }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(VCol, {
                                        cols: "12",
                                        md: "6"
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(VTextField, {
                                            modelValue: unref(selectedEndereco).logradouro,
                                            "onUpdate:modelValue": ($event) => unref(selectedEndereco).logradouro = $event,
                                            label: "Logradouro"
                                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(VCol, {
                                        cols: "12",
                                        md: "6"
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(VTextField, {
                                            modelValue: unref(selectedEndereco).complemento,
                                            "onUpdate:modelValue": ($event) => unref(selectedEndereco).complemento = $event,
                                            label: "Complemento"
                                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(VCol, {
                                        cols: "12",
                                        md: "6"
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(VTextField, {
                                            modelValue: unref(selectedEndereco).numero,
                                            "onUpdate:modelValue": ($event) => unref(selectedEndereco).numero = $event,
                                            label: "N\xFAmero"
                                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(VCol, {
                                        cols: "12",
                                        md: "6"
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(VTextField, {
                                            modelValue: unref(selectedEndereco).bairro,
                                            "onUpdate:modelValue": ($event) => unref(selectedEndereco).bairro = $event,
                                            label: "Bairro"
                                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(VCol, {
                                        cols: "12",
                                        md: "6"
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(VTextField, {
                                            modelValue: unref(selectedEndereco).codcep,
                                            "onUpdate:modelValue": ($event) => unref(selectedEndereco).codcep = $event,
                                            label: "CEP"
                                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(VCol, {
                                        cols: "12",
                                        md: "6"
                                      }, {
                                        default: withCtx(() => [
                                          unref(selectedEndereco).cidade_estrangeira ? (openBlock(), createBlock(VAutocomplete, {
                                            key: 0,
                                            modelValue: unref(selectedEndereco).cidade_id,
                                            "onUpdate:modelValue": ($event) => unref(selectedEndereco).cidade_id = $event,
                                            items: unref(enderecos).cidadesItems,
                                            label: "Cidade",
                                            "item-title": "descricao",
                                            "item-value": "id"
                                          }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])) : (openBlock(), createBlock(VTextField, {
                                            key: 1,
                                            modelValue: unref(selectedEndereco).cidade_estrangeira,
                                            "onUpdate:modelValue": ($event) => unref(selectedEndereco).cidade_estrangeira = $event,
                                            label: "Cidade Estrangeira"
                                          }, null, 8, ["modelValue", "onUpdate:modelValue"]))
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
                          }, _parent4, _scopeId3));
                          _push4(ssrRenderComponent(VCardActions, null, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(VSpacer, null, null, _parent5, _scopeId4));
                                _push5(ssrRenderComponent(VBtn, {
                                  color: "green",
                                  text: "",
                                  onClick: ($event) => isModalOpen.value = false
                                }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(`Cancelar`);
                                    } else {
                                      return [
                                        createTextVNode("Cancelar")
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent5, _scopeId4));
                                _push5(ssrRenderComponent(VBtn, {
                                  color: "green",
                                  text: "",
                                  onClick: ($event) => onUpdate(unref(selectedEndereco).id)
                                }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(`Salvar`);
                                    } else {
                                      return [
                                        createTextVNode("Salvar")
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(VSpacer),
                                  createVNode(VBtn, {
                                    color: "green",
                                    text: "",
                                    onClick: ($event) => isModalOpen.value = false
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode("Cancelar")
                                    ]),
                                    _: 1
                                  }, 8, ["onClick"]),
                                  createVNode(VBtn, {
                                    color: "green",
                                    text: "",
                                    onClick: ($event) => onUpdate(unref(selectedEndereco).id)
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
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(VCardTitle, { style: { "color": "green" } }, {
                              default: withCtx(() => [
                                createTextVNode("Atualizar Endere\xE7o")
                              ]),
                              _: 1
                            }),
                            createVNode(VCardText, null, {
                              default: withCtx(() => [
                                createVNode(VRow, null, {
                                  default: withCtx(() => [
                                    createVNode(VCol, {
                                      cols: "12",
                                      md: "6"
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(VAutocomplete, {
                                          modelValue: unref(selectedEndereco).tabvalores_pais_id,
                                          "onUpdate:modelValue": ($event) => unref(selectedEndereco).tabvalores_pais_id = $event,
                                          items: unref(enderecos).paisItems,
                                          label: "Pa\xEDs",
                                          "item-title": "descricao",
                                          "item-value": "id"
                                        }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(VCol, {
                                      cols: "12",
                                      md: "6"
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(VTextField, {
                                          modelValue: unref(selectedEndereco).logradouro,
                                          "onUpdate:modelValue": ($event) => unref(selectedEndereco).logradouro = $event,
                                          label: "Logradouro"
                                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(VCol, {
                                      cols: "12",
                                      md: "6"
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(VTextField, {
                                          modelValue: unref(selectedEndereco).complemento,
                                          "onUpdate:modelValue": ($event) => unref(selectedEndereco).complemento = $event,
                                          label: "Complemento"
                                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(VCol, {
                                      cols: "12",
                                      md: "6"
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(VTextField, {
                                          modelValue: unref(selectedEndereco).numero,
                                          "onUpdate:modelValue": ($event) => unref(selectedEndereco).numero = $event,
                                          label: "N\xFAmero"
                                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(VCol, {
                                      cols: "12",
                                      md: "6"
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(VTextField, {
                                          modelValue: unref(selectedEndereco).bairro,
                                          "onUpdate:modelValue": ($event) => unref(selectedEndereco).bairro = $event,
                                          label: "Bairro"
                                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(VCol, {
                                      cols: "12",
                                      md: "6"
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(VTextField, {
                                          modelValue: unref(selectedEndereco).codcep,
                                          "onUpdate:modelValue": ($event) => unref(selectedEndereco).codcep = $event,
                                          label: "CEP"
                                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(VCol, {
                                      cols: "12",
                                      md: "6"
                                    }, {
                                      default: withCtx(() => [
                                        unref(selectedEndereco).cidade_estrangeira ? (openBlock(), createBlock(VAutocomplete, {
                                          key: 0,
                                          modelValue: unref(selectedEndereco).cidade_id,
                                          "onUpdate:modelValue": ($event) => unref(selectedEndereco).cidade_id = $event,
                                          items: unref(enderecos).cidadesItems,
                                          label: "Cidade",
                                          "item-title": "descricao",
                                          "item-value": "id"
                                        }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])) : (openBlock(), createBlock(VTextField, {
                                          key: 1,
                                          modelValue: unref(selectedEndereco).cidade_estrangeira,
                                          "onUpdate:modelValue": ($event) => unref(selectedEndereco).cidade_estrangeira = $event,
                                          label: "Cidade Estrangeira"
                                        }, null, 8, ["modelValue", "onUpdate:modelValue"]))
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }),
                            createVNode(VCardActions, null, {
                              default: withCtx(() => [
                                createVNode(VSpacer),
                                createVNode(VBtn, {
                                  color: "green",
                                  text: "",
                                  onClick: ($event) => isModalOpen.value = false
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode("Cancelar")
                                  ]),
                                  _: 1
                                }, 8, ["onClick"]),
                                createVNode(VBtn, {
                                  color: "green",
                                  text: "",
                                  onClick: ($event) => onUpdate(unref(selectedEndereco).id)
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
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(VCard, null, {
                        default: withCtx(() => [
                          createVNode(VCardTitle, { style: { "color": "green" } }, {
                            default: withCtx(() => [
                              createTextVNode("Atualizar Endere\xE7o")
                            ]),
                            _: 1
                          }),
                          createVNode(VCardText, null, {
                            default: withCtx(() => [
                              createVNode(VRow, null, {
                                default: withCtx(() => [
                                  createVNode(VCol, {
                                    cols: "12",
                                    md: "6"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(VAutocomplete, {
                                        modelValue: unref(selectedEndereco).tabvalores_pais_id,
                                        "onUpdate:modelValue": ($event) => unref(selectedEndereco).tabvalores_pais_id = $event,
                                        items: unref(enderecos).paisItems,
                                        label: "Pa\xEDs",
                                        "item-title": "descricao",
                                        "item-value": "id"
                                      }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(VCol, {
                                    cols: "12",
                                    md: "6"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(VTextField, {
                                        modelValue: unref(selectedEndereco).logradouro,
                                        "onUpdate:modelValue": ($event) => unref(selectedEndereco).logradouro = $event,
                                        label: "Logradouro"
                                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(VCol, {
                                    cols: "12",
                                    md: "6"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(VTextField, {
                                        modelValue: unref(selectedEndereco).complemento,
                                        "onUpdate:modelValue": ($event) => unref(selectedEndereco).complemento = $event,
                                        label: "Complemento"
                                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(VCol, {
                                    cols: "12",
                                    md: "6"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(VTextField, {
                                        modelValue: unref(selectedEndereco).numero,
                                        "onUpdate:modelValue": ($event) => unref(selectedEndereco).numero = $event,
                                        label: "N\xFAmero"
                                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(VCol, {
                                    cols: "12",
                                    md: "6"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(VTextField, {
                                        modelValue: unref(selectedEndereco).bairro,
                                        "onUpdate:modelValue": ($event) => unref(selectedEndereco).bairro = $event,
                                        label: "Bairro"
                                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(VCol, {
                                    cols: "12",
                                    md: "6"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(VTextField, {
                                        modelValue: unref(selectedEndereco).codcep,
                                        "onUpdate:modelValue": ($event) => unref(selectedEndereco).codcep = $event,
                                        label: "CEP"
                                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(VCol, {
                                    cols: "12",
                                    md: "6"
                                  }, {
                                    default: withCtx(() => [
                                      unref(selectedEndereco).cidade_estrangeira ? (openBlock(), createBlock(VAutocomplete, {
                                        key: 0,
                                        modelValue: unref(selectedEndereco).cidade_id,
                                        "onUpdate:modelValue": ($event) => unref(selectedEndereco).cidade_id = $event,
                                        items: unref(enderecos).cidadesItems,
                                        label: "Cidade",
                                        "item-title": "descricao",
                                        "item-value": "id"
                                      }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])) : (openBlock(), createBlock(VTextField, {
                                        key: 1,
                                        modelValue: unref(selectedEndereco).cidade_estrangeira,
                                        "onUpdate:modelValue": ($event) => unref(selectedEndereco).cidade_estrangeira = $event,
                                        label: "Cidade Estrangeira"
                                      }, null, 8, ["modelValue", "onUpdate:modelValue"]))
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(VCardActions, null, {
                            default: withCtx(() => [
                              createVNode(VSpacer),
                              createVNode(VBtn, {
                                color: "green",
                                text: "",
                                onClick: ($event) => isModalOpen.value = false
                              }, {
                                default: withCtx(() => [
                                  createTextVNode("Cancelar")
                                ]),
                                _: 1
                              }, 8, ["onClick"]),
                              createVNode(VBtn, {
                                color: "green",
                                text: "",
                                onClick: ($event) => onUpdate(unref(selectedEndereco).id)
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
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(VRow, null, {
                  default: withCtx(() => [
                    createVNode(VCol, { md: "2" }, {
                      default: withCtx(() => [
                        createVNode(VAutocomplete, {
                          modelValue: unref(state).tabvalores_pais_id,
                          "onUpdate:modelValue": ($event) => unref(state).tabvalores_pais_id = $event,
                          items: unref(enderecos).paisItems,
                          label: "Pa\xEDs",
                          "item-title": "descricao",
                          "item-value": "id"
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, { md: "2" }, {
                      default: withCtx(() => [
                        !unref(isForeign) ? withDirectives((openBlock(), createBlock(VTextField, {
                          key: 0,
                          modelValue: unref(state).codcep,
                          "onUpdate:modelValue": ($event) => unref(state).codcep = $event,
                          "error-messages": unref(v$).codcep.$errors.map((e) => e.$message),
                          required: "",
                          onBlur: unref(v$).codcep.$touch,
                          onInput: unref(v$).codcep.$touch,
                          label: "CEP"
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages", "onBlur", "onInput"])), [
                          [_directive_mask, "########"]
                        ]) : withDirectives((openBlock(), createBlock(VTextField, {
                          key: 1,
                          modelValue: unref(state).codcep,
                          "onUpdate:modelValue": ($event) => unref(state).codcep = $event,
                          label: "CEP"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])), [
                          [_directive_mask, "########"]
                        ])
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, { md: "6" }, {
                      default: withCtx(() => [
                        !unref(isForeign) ? (openBlock(), createBlock(VTextField, {
                          key: 0,
                          modelValue: unref(state).logradouro,
                          "onUpdate:modelValue": ($event) => unref(state).logradouro = $event,
                          label: "Endere\xE7o",
                          "error-messages": unref(v$).logradouro.$errors.map((e) => e.$message),
                          required: "",
                          onBlur: unref(v$).logradouro.$touch,
                          onInput: unref(v$).logradouro.$touch
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages", "onBlur", "onInput"])) : (openBlock(), createBlock(VTextField, {
                          key: 1,
                          modelValue: unref(state).logradouro,
                          "onUpdate:modelValue": ($event) => unref(state).logradouro = $event,
                          label: "Endere\xE7o"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]))
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, { md: "1" }, {
                      default: withCtx(() => [
                        !unref(isForeign) ? (openBlock(), createBlock(VTextField, {
                          key: 0,
                          modelValue: unref(state).numero,
                          "onUpdate:modelValue": ($event) => unref(state).numero = $event,
                          required: "",
                          "error-messages": unref(v$).numero.$errors.map((e) => e.$message),
                          onBlur: unref(v$).numero.$touch,
                          onInput: unref(v$).numero.$touch,
                          label: "N*"
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages", "onBlur", "onInput"])) : (openBlock(), createBlock(VTextField, {
                          key: 1,
                          modelValue: unref(state).numero,
                          "onUpdate:modelValue": ($event) => unref(state).numero = $event,
                          label: "N*"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]))
                      ]),
                      _: 1
                    }),
                    createVNode("div", { class: "mt-1" }, [
                      createVNode("img", {
                        style: { "width": "40px", "height": "40px", "cursor": "pointer" },
                        src: _imports_0,
                        alt: "novo",
                        onClick: ($event) => !unref(isForeign) ? onSubmitAdressNational() : onSubmitAdressForeign()
                      }, null, 8, ["onClick"])
                    ]),
                    createVNode(VCol, { md: "5" }, {
                      default: withCtx(() => [
                        createVNode(VTextField, {
                          modelValue: unref(state).complemento,
                          "onUpdate:modelValue": ($event) => unref(state).complemento = $event,
                          label: "Complemento"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, { md: "3" }, {
                      default: withCtx(() => [
                        !unref(isForeign) ? (openBlock(), createBlock(VTextField, {
                          key: 0,
                          modelValue: unref(state).bairro,
                          "onUpdate:modelValue": ($event) => unref(state).bairro = $event,
                          "error-messages": unref(v$).bairro.$errors.map((e) => e.$message),
                          required: "",
                          onBlur: unref(v$).bairro.$touch,
                          onInput: unref(v$).bairro.$touch,
                          label: "Bairro"
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages", "onBlur", "onInput"])) : (openBlock(), createBlock(VTextField, {
                          key: 1,
                          modelValue: unref(state).bairro,
                          "onUpdate:modelValue": ($event) => unref(state).bairro = $event,
                          label: "Bairro"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]))
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, { md: "3" }, {
                      default: withCtx(() => [
                        !unref(isForeign) ? (openBlock(), createBlock(VAutocomplete, {
                          key: 0,
                          modelValue: unref(state).cidade_id,
                          "onUpdate:modelValue": ($event) => unref(state).cidade_id = $event,
                          items: unref(enderecos).cidadesItems,
                          label: "Cidade",
                          "item-title": "descricao",
                          "item-value": "id"
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])) : (openBlock(), createBlock(VTextField, {
                          key: 1,
                          modelValue: unref(state).cidade_estrangeira,
                          "onUpdate:modelValue": ($event) => unref(state).cidade_estrangeira = $event,
                          label: "Cidade Estrangeira"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]))
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                createVNode(VDataTable, {
                  style: { "max-height": "330px" },
                  headers,
                  items: unref(enderecos).enderecosItems,
                  "item-key": "id"
                }, {
                  "item.cidade": withCtx(({ item }) => [
                    createVNode("h4", { style: { "width": "150px", "font-weight": "500" } }, toDisplayString(getCidadeNome(item)), 1)
                  ]),
                  "item.logradouro": withCtx(({ item }) => [
                    createVNode("h4", { style: { "width": "200px", "font-weight": "500" } }, toDisplayString(item.logradouro), 1)
                  ]),
                  "item.actions": withCtx(({ item }) => [
                    createVNode(VRow, { style: { "display": "flex", "margin-top": "-8px", "gap": "10px" } }, {
                      default: withCtx(() => [
                        createVNode("div", {
                          onClick: ($event) => redirectToUpdate(item.id),
                          title: "Visualizar"
                        }, [
                          createVNode("img", {
                            style: { "width": "30px", "height": "30px", "cursor": "pointer" },
                            src: _imports_1,
                            alt: "Visualizar"
                          })
                        ], 8, ["onClick"]),
                        createVNode("div", {
                          onClick: ($event) => deleteEndereco(item),
                          title: "Visualizar"
                        }, [
                          item.excluido ? (openBlock(), createBlock("img", {
                            key: 0,
                            style: { "width": "30px", "height": "30px", "cursor": "pointer" },
                            src: _imports_2,
                            alt: "Visualizar",
                            title: "Reativar"
                          })) : (openBlock(), createBlock("img", {
                            key: 1,
                            src: _imports_3,
                            alt: "Excluir",
                            class: "trash-icon",
                            style: { "width": "30px", "height": "30px", "cursor": "pointer" },
                            title: "Excluir"
                          }))
                        ], 8, ["onClick"])
                      ]),
                      _: 2
                    }, 1024)
                  ]),
                  _: 1
                }, 8, ["items"]),
                createVNode(VDialog, {
                  modelValue: unref(isModalOpen),
                  "onUpdate:modelValue": ($event) => isRef(isModalOpen) ? isModalOpen.value = $event : null,
                  "max-width": "600px"
                }, {
                  default: withCtx(() => [
                    createVNode(VCard, null, {
                      default: withCtx(() => [
                        createVNode(VCardTitle, { style: { "color": "green" } }, {
                          default: withCtx(() => [
                            createTextVNode("Atualizar Endere\xE7o")
                          ]),
                          _: 1
                        }),
                        createVNode(VCardText, null, {
                          default: withCtx(() => [
                            createVNode(VRow, null, {
                              default: withCtx(() => [
                                createVNode(VCol, {
                                  cols: "12",
                                  md: "6"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(VAutocomplete, {
                                      modelValue: unref(selectedEndereco).tabvalores_pais_id,
                                      "onUpdate:modelValue": ($event) => unref(selectedEndereco).tabvalores_pais_id = $event,
                                      items: unref(enderecos).paisItems,
                                      label: "Pa\xEDs",
                                      "item-title": "descricao",
                                      "item-value": "id"
                                    }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                                  ]),
                                  _: 1
                                }),
                                createVNode(VCol, {
                                  cols: "12",
                                  md: "6"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(VTextField, {
                                      modelValue: unref(selectedEndereco).logradouro,
                                      "onUpdate:modelValue": ($event) => unref(selectedEndereco).logradouro = $event,
                                      label: "Logradouro"
                                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                  ]),
                                  _: 1
                                }),
                                createVNode(VCol, {
                                  cols: "12",
                                  md: "6"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(VTextField, {
                                      modelValue: unref(selectedEndereco).complemento,
                                      "onUpdate:modelValue": ($event) => unref(selectedEndereco).complemento = $event,
                                      label: "Complemento"
                                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                  ]),
                                  _: 1
                                }),
                                createVNode(VCol, {
                                  cols: "12",
                                  md: "6"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(VTextField, {
                                      modelValue: unref(selectedEndereco).numero,
                                      "onUpdate:modelValue": ($event) => unref(selectedEndereco).numero = $event,
                                      label: "N\xFAmero"
                                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                  ]),
                                  _: 1
                                }),
                                createVNode(VCol, {
                                  cols: "12",
                                  md: "6"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(VTextField, {
                                      modelValue: unref(selectedEndereco).bairro,
                                      "onUpdate:modelValue": ($event) => unref(selectedEndereco).bairro = $event,
                                      label: "Bairro"
                                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                  ]),
                                  _: 1
                                }),
                                createVNode(VCol, {
                                  cols: "12",
                                  md: "6"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(VTextField, {
                                      modelValue: unref(selectedEndereco).codcep,
                                      "onUpdate:modelValue": ($event) => unref(selectedEndereco).codcep = $event,
                                      label: "CEP"
                                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                  ]),
                                  _: 1
                                }),
                                createVNode(VCol, {
                                  cols: "12",
                                  md: "6"
                                }, {
                                  default: withCtx(() => [
                                    unref(selectedEndereco).cidade_estrangeira ? (openBlock(), createBlock(VAutocomplete, {
                                      key: 0,
                                      modelValue: unref(selectedEndereco).cidade_id,
                                      "onUpdate:modelValue": ($event) => unref(selectedEndereco).cidade_id = $event,
                                      items: unref(enderecos).cidadesItems,
                                      label: "Cidade",
                                      "item-title": "descricao",
                                      "item-value": "id"
                                    }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])) : (openBlock(), createBlock(VTextField, {
                                      key: 1,
                                      modelValue: unref(selectedEndereco).cidade_estrangeira,
                                      "onUpdate:modelValue": ($event) => unref(selectedEndereco).cidade_estrangeira = $event,
                                      label: "Cidade Estrangeira"
                                    }, null, 8, ["modelValue", "onUpdate:modelValue"]))
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        createVNode(VCardActions, null, {
                          default: withCtx(() => [
                            createVNode(VSpacer),
                            createVNode(VBtn, {
                              color: "green",
                              text: "",
                              onClick: ($event) => isModalOpen.value = false
                            }, {
                              default: withCtx(() => [
                                createTextVNode("Cancelar")
                              ]),
                              _: 1
                            }, 8, ["onClick"]),
                            createVNode(VBtn, {
                              color: "green",
                              text: "",
                              onClick: ($event) => onUpdate(unref(selectedEndereco).id)
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
                    })
                  ]),
                  _: 1
                }, 8, ["modelValue", "onUpdate:modelValue"])
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(VBtn, {
        onClick: voltar,
        class: "ml-10 mb-5",
        size: "large",
        color: "red"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Voltar`);
          } else {
            return [
              createTextVNode("Voltar")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Endereco.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : undefined;
};
const VTabsSymbol = Symbol.for("vuetify:v-tabs");
const makeVTabProps = propsFactory({
  fixed: Boolean,
  sliderColor: String,
  hideSlider: Boolean,
  direction: {
    type: String,
    default: "horizontal"
  },
  ...omit(makeVBtnProps({
    selectedClass: "v-tab--selected",
    variant: "text"
  }), ["active", "block", "flat", "location", "position", "symbol"])
}, "VTab");
const VTab = genericComponent()({
  name: "VTab",
  props: makeVTabProps(),
  setup(props, _ref) {
    let {
      slots,
      attrs
    } = _ref;
    const {
      textColorClasses: sliderColorClasses,
      textColorStyles: sliderColorStyles
    } = useTextColor(props, "sliderColor");
    const rootEl = ref();
    const sliderEl = ref();
    const isHorizontal = computed(() => props.direction === "horizontal");
    const isSelected = computed(() => {
      var _a2;
      var _a, _b;
      return (_a2 = (_b = (_a = rootEl.value) == null ? undefined : _a.group) == null ? undefined : _b.isSelected.value) != null ? _a2 : false;
    });
    function updateSlider(_ref2) {
      var _a, _b;
      let {
        value
      } = _ref2;
      if (value) {
        const prevEl = (_b = (_a = rootEl.value) == null ? undefined : _a.$el.parentElement) == null ? undefined : _b.querySelector(".v-tab--selected .v-tab__slider");
        const nextEl = sliderEl.value;
        if (!prevEl || !nextEl) return;
        const color = getComputedStyle(prevEl).color;
        const prevBox = prevEl.getBoundingClientRect();
        const nextBox = nextEl.getBoundingClientRect();
        const xy = isHorizontal.value ? "x" : "y";
        const XY = isHorizontal.value ? "X" : "Y";
        const rightBottom = isHorizontal.value ? "right" : "bottom";
        const widthHeight = isHorizontal.value ? "width" : "height";
        const prevPos = prevBox[xy];
        const nextPos = nextBox[xy];
        const delta = prevPos > nextPos ? prevBox[rightBottom] - nextBox[rightBottom] : prevBox[xy] - nextBox[xy];
        const origin = Math.sign(delta) > 0 ? isHorizontal.value ? "right" : "bottom" : Math.sign(delta) < 0 ? isHorizontal.value ? "left" : "top" : "center";
        const size = Math.abs(delta) + (Math.sign(delta) < 0 ? prevBox[widthHeight] : nextBox[widthHeight]);
        const scale = size / Math.max(prevBox[widthHeight], nextBox[widthHeight]) || 0;
        const initialScale = prevBox[widthHeight] / nextBox[widthHeight] || 0;
        const sigma = 1.5;
        animate(nextEl, {
          backgroundColor: [color, "currentcolor"],
          transform: [`translate${XY}(${delta}px) scale${XY}(${initialScale})`, `translate${XY}(${delta / sigma}px) scale${XY}(${(scale - 1) / sigma + 1})`, "none"],
          transformOrigin: Array(3).fill(origin)
        }, {
          duration: 225,
          easing: standardEasing
        });
      }
    }
    useRender(() => {
      const btnProps = VBtn.filterProps(props);
      return createVNode(VBtn, mergeProps({
        "symbol": VTabsSymbol,
        "ref": rootEl,
        "class": ["v-tab", props.class],
        "style": props.style,
        "tabindex": isSelected.value ? 0 : -1,
        "role": "tab",
        "aria-selected": String(isSelected.value),
        "active": false
      }, btnProps, attrs, {
        "block": props.fixed,
        "maxWidth": props.fixed ? 300 : undefined,
        "onGroup:selected": updateSlider
      }), {
        ...slots,
        default: () => {
          var _a2;
          var _a;
          return createVNode(Fragment, null, [(_a2 = (_a = slots.default) == null ? undefined : _a.call(slots)) != null ? _a2 : props.text, !props.hideSlider && createVNode("div", {
            "ref": sliderEl,
            "class": ["v-tab__slider", sliderColorClasses.value],
            "style": sliderColorStyles.value
          }, null)]);
        }
      });
    });
    return forwardRefs({}, rootEl);
  }
});
const handleGesture = (wrapper) => {
  const {
    touchstartX,
    touchendX,
    touchstartY,
    touchendY
  } = wrapper;
  const dirRatio = 0.5;
  const minDistance = 16;
  wrapper.offsetX = touchendX - touchstartX;
  wrapper.offsetY = touchendY - touchstartY;
  if (Math.abs(wrapper.offsetY) < dirRatio * Math.abs(wrapper.offsetX)) {
    wrapper.left && touchendX < touchstartX - minDistance && wrapper.left(wrapper);
    wrapper.right && touchendX > touchstartX + minDistance && wrapper.right(wrapper);
  }
  if (Math.abs(wrapper.offsetX) < dirRatio * Math.abs(wrapper.offsetY)) {
    wrapper.up && touchendY < touchstartY - minDistance && wrapper.up(wrapper);
    wrapper.down && touchendY > touchstartY + minDistance && wrapper.down(wrapper);
  }
};
function touchstart(event, wrapper) {
  var _a;
  const touch = event.changedTouches[0];
  wrapper.touchstartX = touch.clientX;
  wrapper.touchstartY = touch.clientY;
  (_a = wrapper.start) == null ? undefined : _a.call(wrapper, {
    originalEvent: event,
    ...wrapper
  });
}
function touchend(event, wrapper) {
  var _a;
  const touch = event.changedTouches[0];
  wrapper.touchendX = touch.clientX;
  wrapper.touchendY = touch.clientY;
  (_a = wrapper.end) == null ? undefined : _a.call(wrapper, {
    originalEvent: event,
    ...wrapper
  });
  handleGesture(wrapper);
}
function touchmove(event, wrapper) {
  var _a;
  const touch = event.changedTouches[0];
  wrapper.touchmoveX = touch.clientX;
  wrapper.touchmoveY = touch.clientY;
  (_a = wrapper.move) == null ? undefined : _a.call(wrapper, {
    originalEvent: event,
    ...wrapper
  });
}
function createHandlers() {
  let value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const wrapper = {
    touchstartX: 0,
    touchstartY: 0,
    touchendX: 0,
    touchendY: 0,
    touchmoveX: 0,
    touchmoveY: 0,
    offsetX: 0,
    offsetY: 0,
    left: value.left,
    right: value.right,
    up: value.up,
    down: value.down,
    start: value.start,
    move: value.move,
    end: value.end
  };
  return {
    touchstart: (e) => touchstart(e, wrapper),
    touchend: (e) => touchend(e, wrapper),
    touchmove: (e) => touchmove(e, wrapper)
  };
}
function mounted(el, binding) {
  var _a2, _b;
  var _a;
  const value = binding.value;
  const target = (value == null ? undefined : value.parent) ? el.parentElement : el;
  const options = (_a2 = value == null ? undefined : value.options) != null ? _a2 : {
    passive: true
  };
  const uid = (_a = binding.instance) == null ? undefined : _a.$.uid;
  if (!target || !uid) return;
  const handlers = createHandlers(binding.value);
  target._touchHandlers = (_b = target._touchHandlers) != null ? _b : /* @__PURE__ */ Object.create(null);
  target._touchHandlers[uid] = handlers;
  keys(handlers).forEach((eventName) => {
    target.addEventListener(eventName, handlers[eventName], options);
  });
}
function unmounted(el, binding) {
  var _a, _b;
  const target = ((_a = binding.value) == null ? undefined : _a.parent) ? el.parentElement : el;
  const uid = (_b = binding.instance) == null ? undefined : _b.$.uid;
  if (!(target == null ? undefined : target._touchHandlers) || !uid) return;
  const handlers = target._touchHandlers[uid];
  keys(handlers).forEach((eventName) => {
    target.removeEventListener(eventName, handlers[eventName]);
  });
  delete target._touchHandlers[uid];
}
const Touch = {
  mounted,
  unmounted
};
const VWindowSymbol = Symbol.for("vuetify:v-window");
const VWindowGroupSymbol = Symbol.for("vuetify:v-window-group");
const makeVWindowProps = propsFactory({
  continuous: Boolean,
  nextIcon: {
    type: [Boolean, String, Function, Object],
    default: "$next"
  },
  prevIcon: {
    type: [Boolean, String, Function, Object],
    default: "$prev"
  },
  reverse: Boolean,
  showArrows: {
    type: [Boolean, String],
    validator: (v) => typeof v === "boolean" || v === "hover"
  },
  touch: {
    type: [Object, Boolean],
    default: undefined
  },
  direction: {
    type: String,
    default: "horizontal"
  },
  modelValue: null,
  disabled: Boolean,
  selectedClass: {
    type: String,
    default: "v-window-item--active"
  },
  // TODO: mandatory should probably not be exposed but do this for now
  mandatory: {
    type: [Boolean, String],
    default: "force"
  },
  ...makeComponentProps(),
  ...makeTagProps(),
  ...makeThemeProps()
}, "VWindow");
const VWindow = genericComponent()({
  name: "VWindow",
  directives: {
    Touch
  },
  props: makeVWindowProps(),
  emits: {
    "update:modelValue": (value) => true
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      themeClasses
    } = provideTheme(props);
    const {
      isRtl
    } = useRtl();
    const {
      t
    } = useLocale();
    const group = useGroup(props, VWindowGroupSymbol);
    const rootRef = ref();
    const isRtlReverse = computed(() => isRtl.value ? !props.reverse : props.reverse);
    const isReversed = shallowRef(false);
    const transition = computed(() => {
      const axis = props.direction === "vertical" ? "y" : "x";
      const reverse = isRtlReverse.value ? !isReversed.value : isReversed.value;
      const direction = reverse ? "-reverse" : "";
      return `v-window-${axis}${direction}-transition`;
    });
    const transitionCount = shallowRef(0);
    const transitionHeight = ref(undefined);
    const activeIndex = computed(() => {
      return group.items.value.findIndex((item) => group.selected.value.includes(item.id));
    });
    watch(activeIndex, (newVal, oldVal) => {
      const itemsLength = group.items.value.length;
      const lastIndex = itemsLength - 1;
      if (itemsLength <= 2) {
        isReversed.value = newVal < oldVal;
      } else if (newVal === lastIndex && oldVal === 0) {
        isReversed.value = true;
      } else if (newVal === 0 && oldVal === lastIndex) {
        isReversed.value = false;
      } else {
        isReversed.value = newVal < oldVal;
      }
    });
    provide(VWindowSymbol, {
      transition,
      isReversed,
      transitionCount,
      transitionHeight,
      rootRef
    });
    const canMoveBack = computed(() => props.continuous || activeIndex.value !== 0);
    const canMoveForward = computed(() => props.continuous || activeIndex.value !== group.items.value.length - 1);
    function prev() {
      canMoveBack.value && group.prev();
    }
    function next() {
      canMoveForward.value && group.next();
    }
    const arrows = computed(() => {
      const arrows2 = [];
      const prevProps = {
        icon: isRtl.value ? props.nextIcon : props.prevIcon,
        class: `v-window__${isRtlReverse.value ? "right" : "left"}`,
        onClick: group.prev,
        "aria-label": t("$vuetify.carousel.prev")
      };
      arrows2.push(canMoveBack.value ? slots.prev ? slots.prev({
        props: prevProps
      }) : createVNode(VBtn, prevProps, null) : createVNode("div", null, null));
      const nextProps = {
        icon: isRtl.value ? props.prevIcon : props.nextIcon,
        class: `v-window__${isRtlReverse.value ? "left" : "right"}`,
        onClick: group.next,
        "aria-label": t("$vuetify.carousel.next")
      };
      arrows2.push(canMoveForward.value ? slots.next ? slots.next({
        props: nextProps
      }) : createVNode(VBtn, nextProps, null) : createVNode("div", null, null));
      return arrows2;
    });
    const touchOptions = computed(() => {
      if (props.touch === false) return props.touch;
      const options = {
        left: () => {
          isRtlReverse.value ? prev() : next();
        },
        right: () => {
          isRtlReverse.value ? next() : prev();
        },
        start: (_ref2) => {
          let {
            originalEvent
          } = _ref2;
          originalEvent.stopPropagation();
        }
      };
      return {
        ...options,
        ...props.touch === true ? {} : props.touch
      };
    });
    useRender(() => withDirectives(createVNode(props.tag, {
      "ref": rootRef,
      "class": ["v-window", {
        "v-window--show-arrows-on-hover": props.showArrows === "hover"
      }, themeClasses.value, props.class],
      "style": props.style
    }, {
      default: () => {
        var _a, _b;
        return [createVNode("div", {
          "class": "v-window__container",
          "style": {
            height: transitionHeight.value
          }
        }, [(_a = slots.default) == null ? undefined : _a.call(slots, {
          group
        }), props.showArrows !== false && createVNode("div", {
          "class": "v-window__controls"
        }, [arrows.value])]), (_b = slots.additional) == null ? undefined : _b.call(slots, {
          group
        })];
      }
    }), [[resolveDirective("touch"), touchOptions.value]]));
    return {
      group
    };
  }
});
const makeVTabsWindowProps = propsFactory({
  ...omit(makeVWindowProps(), ["continuous", "nextIcon", "prevIcon", "showArrows", "touch", "mandatory"])
}, "VTabsWindow");
const VTabsWindow = genericComponent()({
  name: "VTabsWindow",
  props: makeVTabsWindowProps(),
  emits: {
    "update:modelValue": (v) => true
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const group = inject(VTabsSymbol, null);
    const _model = useProxiedModel(props, "modelValue");
    const model = computed({
      get() {
        var _a;
        if (_model.value != null || !group) return _model.value;
        return (_a = group.items.value.find((item) => group.selected.value.includes(item.id))) == null ? undefined : _a.value;
      },
      set(val) {
        _model.value = val;
      }
    });
    useRender(() => {
      const windowProps = VWindow.filterProps(props);
      return createVNode(VWindow, mergeProps({
        "_as": "VTabsWindow"
      }, windowProps, {
        "modelValue": model.value,
        "onUpdate:modelValue": ($event) => model.value = $event,
        "class": ["v-tabs-window", props.class],
        "style": props.style,
        "mandatory": false,
        "touch": false
      }), slots);
    });
    return {};
  }
});
const makeVWindowItemProps = propsFactory({
  reverseTransition: {
    type: [Boolean, String],
    default: undefined
  },
  transition: {
    type: [Boolean, String],
    default: undefined
  },
  ...makeComponentProps(),
  ...makeGroupItemProps(),
  ...makeLazyProps()
}, "VWindowItem");
const VWindowItem = genericComponent()({
  name: "VWindowItem",
  directives: {
    Touch
  },
  props: makeVWindowItemProps(),
  emits: {
    "group:selected": (val) => true
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const window = inject(VWindowSymbol);
    const groupItem = useGroupItem(props, VWindowGroupSymbol);
    const {
      isBooted
    } = useSsrBoot();
    if (!window || !groupItem) throw new Error("[Vuetify] VWindowItem must be used inside VWindow");
    const isTransitioning = shallowRef(false);
    const hasTransition = computed(() => isBooted.value && (window.isReversed.value ? props.reverseTransition !== false : props.transition !== false));
    function onAfterTransition() {
      if (!isTransitioning.value || !window) {
        return;
      }
      isTransitioning.value = false;
      if (window.transitionCount.value > 0) {
        window.transitionCount.value -= 1;
        if (window.transitionCount.value === 0) {
          window.transitionHeight.value = undefined;
        }
      }
    }
    function onBeforeTransition() {
      var _a;
      if (isTransitioning.value || !window) {
        return;
      }
      isTransitioning.value = true;
      if (window.transitionCount.value === 0) {
        window.transitionHeight.value = convertToUnit((_a = window.rootRef.value) == null ? undefined : _a.clientHeight);
      }
      window.transitionCount.value += 1;
    }
    function onTransitionCancelled() {
      onAfterTransition();
    }
    function onEnterTransition(el) {
      if (!isTransitioning.value) {
        return;
      }
      nextTick(() => {
        if (!hasTransition.value || !isTransitioning.value || !window) {
          return;
        }
        window.transitionHeight.value = convertToUnit(el.clientHeight);
      });
    }
    const transition = computed(() => {
      const name = window.isReversed.value ? props.reverseTransition : props.transition;
      return !hasTransition.value ? false : {
        name: typeof name !== "string" ? window.transition.value : name,
        onBeforeEnter: onBeforeTransition,
        onAfterEnter: onAfterTransition,
        onEnterCancelled: onTransitionCancelled,
        onBeforeLeave: onBeforeTransition,
        onAfterLeave: onAfterTransition,
        onLeaveCancelled: onTransitionCancelled,
        onEnter: onEnterTransition
      };
    });
    const {
      hasContent
    } = useLazy(props, groupItem.isSelected);
    useRender(() => createVNode(MaybeTransition, {
      "transition": transition.value,
      "disabled": !isBooted.value
    }, {
      default: () => {
        var _a;
        return [withDirectives(createVNode("div", {
          "class": ["v-window-item", groupItem.selectedClass.value, props.class],
          "style": props.style
        }, [hasContent.value && ((_a = slots.default) == null ? undefined : _a.call(slots))]), [[vShow, groupItem.isSelected.value]])];
      }
    }));
    return {
      groupItem
    };
  }
});
const makeVTabsWindowItemProps = propsFactory({
  ...makeVWindowItemProps()
}, "VTabsWindowItem");
const VTabsWindowItem = genericComponent()({
  name: "VTabsWindowItem",
  props: makeVTabsWindowItemProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    useRender(() => {
      const windowItemProps = VWindowItem.filterProps(props);
      return createVNode(VWindowItem, mergeProps({
        "_as": "VTabsWindowItem"
      }, windowItemProps, {
        "class": ["v-tabs-window-item", props.class],
        "style": props.style
      }), slots);
    });
    return {};
  }
});
function parseItems(items) {
  if (!items) return [];
  return items.map((item) => {
    if (!isObject(item)) return {
      text: item,
      value: item
    };
    return item;
  });
}
const makeVTabsProps = propsFactory({
  alignTabs: {
    type: String,
    default: "start"
  },
  color: String,
  fixedTabs: Boolean,
  items: {
    type: Array,
    default: () => []
  },
  stacked: Boolean,
  bgColor: String,
  grow: Boolean,
  height: {
    type: [Number, String],
    default: undefined
  },
  hideSlider: Boolean,
  sliderColor: String,
  ...makeVSlideGroupProps({
    mandatory: "force",
    selectedClass: "v-tab-item--selected"
  }),
  ...makeDensityProps(),
  ...makeTagProps()
}, "VTabs");
const VTabs = genericComponent()({
  name: "VTabs",
  props: makeVTabsProps(),
  emits: {
    "update:modelValue": (v) => true
  },
  setup(props, _ref) {
    let {
      attrs,
      slots
    } = _ref;
    const model = useProxiedModel(props, "modelValue");
    const items = computed(() => parseItems(props.items));
    const {
      densityClasses
    } = useDensity(props);
    const {
      backgroundColorClasses,
      backgroundColorStyles
    } = useBackgroundColor(toRef(props, "bgColor"));
    const {
      scopeId
    } = useScopeId();
    provideDefaults({
      VTab: {
        color: toRef(props, "color"),
        direction: toRef(props, "direction"),
        stacked: toRef(props, "stacked"),
        fixed: toRef(props, "fixedTabs"),
        sliderColor: toRef(props, "sliderColor"),
        hideSlider: toRef(props, "hideSlider")
      }
    });
    useRender(() => {
      const slideGroupProps = VSlideGroup.filterProps(props);
      const hasWindow = !!(slots.window || props.items.length > 0);
      return createVNode(Fragment, null, [createVNode(VSlideGroup, mergeProps(slideGroupProps, {
        "modelValue": model.value,
        "onUpdate:modelValue": ($event) => model.value = $event,
        "class": ["v-tabs", `v-tabs--${props.direction}`, `v-tabs--align-tabs-${props.alignTabs}`, {
          "v-tabs--fixed-tabs": props.fixedTabs,
          "v-tabs--grow": props.grow,
          "v-tabs--stacked": props.stacked
        }, densityClasses.value, backgroundColorClasses.value, props.class],
        "style": [{
          "--v-tabs-height": convertToUnit(props.height)
        }, backgroundColorStyles.value, props.style],
        "role": "tablist",
        "symbol": VTabsSymbol
      }, scopeId, attrs), {
        default: () => {
          var _a2;
          var _a;
          return [(_a2 = (_a = slots.default) == null ? undefined : _a.call(slots)) != null ? _a2 : items.value.map((item) => {
            var _a3;
            var _a22;
            return (_a3 = (_a22 = slots.tab) == null ? undefined : _a22.call(slots, {
              item
            })) != null ? _a3 : createVNode(VTab, mergeProps(item, {
              "key": item.text,
              "value": item.value
            }), {
              default: slots[`tab.${item.value}`] ? () => {
                var _a32;
                return (_a32 = slots[`tab.${item.value}`]) == null ? undefined : _a32.call(slots, {
                  item
                });
              } : undefined
            });
          })];
        }
      }), hasWindow && createVNode(VTabsWindow, mergeProps({
        "modelValue": model.value,
        "onUpdate:modelValue": ($event) => model.value = $event,
        "key": "tabs-window"
      }, scopeId), {
        default: () => {
          var _a;
          return [items.value.map((item) => {
            var _a3;
            var _a2;
            return (_a3 = (_a2 = slots.item) == null ? undefined : _a2.call(slots, {
              item
            })) != null ? _a3 : createVNode(VTabsWindowItem, {
              "value": item.value
            }, {
              default: () => {
                var _a32;
                return (_a32 = slots[`item.${item.value}`]) == null ? undefined : _a32.call(slots, {
                  item
                });
              }
            });
          }), (_a = slots.window) == null ? undefined : _a.call(slots)];
        }
      })]);
    });
    return {};
  }
});

export { VTabs as V, _sfc_main$1 as _, VTab as a, VTabsWindow as b, VTabsWindowItem as c, _sfc_main as d };
//# sourceMappingURL=VTabs-ls7KM1Tt.mjs.map
