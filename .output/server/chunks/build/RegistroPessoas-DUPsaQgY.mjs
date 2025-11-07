import { a as buildAssetsURL } from '../routes/renderer.mjs';
import { useSSRContext, inject, computed, createVNode, withDirectives, resolveDirective, vShow, ref, mergeProps, Fragment, reactive, withAsyncContext, unref, withCtx, createTextVNode, openBlock, createBlock, isRef, watch, createCommentVNode, toDisplayString, toRef, shallowRef, provide, renderList } from 'vue';
import { ssrRenderComponent, ssrInterpolate, ssrGetDirectiveProps, ssrRenderStyle, ssrRenderAttr, ssrRenderList, ssrRenderAttrs } from 'vue/server-renderer';
import { useVuelidate } from '@vuelidate/core';
import { helpers, required } from '@vuelidate/validators';
import { p as propsFactory, O as makeRoundedProps, N as makeElevationProps, m as makeComponentProps, o as genericComponent, an as Ripple, q as useRtl, ar as useElevation, A as useTextColor, s as useRender, a1 as convertToUnit, bc as VScaleTransition, au as useRounded, a8 as useBackgroundColor, bd as makeFocusProps, ax as makeVInputProps, z as useProxiedModel, aA as useFocus, aC as VInput, a_ as VLabel, u as useRouter$1, g as useRoute$1, b as useNuxtApp, e as useCookie, b8 as VProgressCircular, f as VTextField, V as VBtn, ba as VSpacer, bb as getDecimals, X as createRange, _ as _export_sfc, c as useRuntimeConfig, $ as clamp, Y as keyValues } from './server.mjs';
import { u as useLazyAsyncData } from './asyncData-B8plM1p3.mjs';
import { $ as $fetchWithToken, f as fetchWithToken } from './fetchWithToken-CCGIQo0b.mjs';
import { f as formatDate, a as formatToISO } from './formatDate-DflkuJ_V.mjs';
import { V as VContainer } from './VContainer-CUysD4sO.mjs';
import { V as VRow } from './VRow-Bqz0CuIN.mjs';
import { V as VCol } from './VCol-BT4RzX0Q.mjs';
import { e as VSelect } from './filter-bkfdtiUs.mjs';
import { V as VAutocomplete } from './VAutocomplete-C8djLHoj.mjs';
import { _ as __nuxt_component_0$1 } from './nuxt-link-TpvcaGEw.mjs';
import { _ as _imports_0$4 } from './novo-CWU3oYa5.mjs';
import { _ as _imports_1$1 } from './editar-BcGPsVK2.mjs';
import { _ as _imports_2, a as _imports_3 } from './excluido-D7FHZla7.mjs';
import { _ as _imports_2$1 } from './escanear-CJoLAgRx.mjs';
import { u as useFetch } from './fetch-uf6n1sXR.mjs';
import { V as VDataTable } from './VDataTable-C_f4_7jt.mjs';
import { V as VDialog } from './VDialog-BVe31KMa.mjs';
import { V as VCard, b as VCardTitle, a as VCardText, c as VCardActions } from './VCard-DfXRXpQ0.mjs';
import * as UTIF from 'utif';
import { _ as _sfc_main$d } from './FichaCard-C0MTdS0w.mjs';
import { _ as _imports_1$2 } from './visualizar-BoZ30DMV.mjs';
import { V as VTabs, a as VTab, b as VTabsWindow, c as VTabsWindowItem } from './VTabs-BD9SkKR1.mjs';

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

const _sfc_main$c = {
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
    const emit2 = __emit;
    const router = useRouter$1();
    useRoute$1();
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
      fone_celular: null,
      cpf_pai: null,
      cpf_mae: null,
      tipo_pessoa: "FISICA",
      tabvalores_estadocivil_id: null,
      tabvalores_capacidadecivil_id: null,
      tabvalores_sexo_id: null,
      cidade_nascimento_id: null,
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
      const [
        estadoCivilItems,
        capacidadeCivilItems,
        cidadeNascimentoItems,
        sexoItems
      ] = await Promise.all([
        $fetchWithToken(estadoCivil),
        $fetchWithToken(capacidadeCivil),
        $fetchWithToken(cidade),
        $fetchWithToken(sexo)
      ]);
      return {
        estadoCivilItems,
        capacidadeCivilItems,
        cidadeNascimentoItems,
        sexoItems
      };
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
          cpf_mae: removeFormatting(state.cpf_mae),
          data_nascimento: formatToISO(state.data_nascimento),
          fone_celular: state.fone_celular ? state.fone_celular.replace(/[^0-9]/g, "") : null
          // Adicionada verificação
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
        cpf_mae: removeFormatting(state.cpf_mae),
        fone_celular: state.fone_celular.replace(/[^0-9]/g, ""),
        data_nascimento: formatToISO(state.data_nascimento)
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
          emit2("close-modal");
          return;
        }
        $toast.success("Pessoa atualizada com sucesso!");
        router.push("/pessoas/lista");
      } else {
        $toast.error("Erro ao atualizar Pessoa Fisica");
      }
    }
    const voltar = () => {
      if (props.isModal === true) {
        emit2("close-modal");
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
                    _push3(ssrRenderComponent(VCol, { md: "2" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(VTextField, mergeProps({
                            modelValue: unref(state).data_nascimento,
                            "onUpdate:modelValue": ($event) => unref(state).data_nascimento = $event,
                            label: "Data de nascimento",
                            placeholder: "dd/mm/yyyy"
                          }, ssrGetDirectiveProps(_ctx, _directive_mask, "##/##/####")), null, _parent4, _scopeId3));
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
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(VCol, { md: "2" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(VTextField, mergeProps({
                            modelValue: unref(state).fone_celular,
                            "onUpdate:modelValue": ($event) => unref(state).fone_celular = $event,
                            label: "Celular",
                            placeholder: "'(99) 99999-9999'"
                          }, ssrGetDirectiveProps(_ctx, _directive_mask, "(##) #####-####")), null, _parent4, _scopeId3));
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
                            modelValue: unref(state).cidade_nascimento_id,
                            "onUpdate:modelValue": ($event) => unref(state).cidade_nascimento_id = $event,
                            items: unref(dados).cidadeNascimentoItems,
                            label: "Cidade de nascimento",
                            "item-title": "descricao",
                            "item-value": "id"
                          }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(VAutocomplete, {
                              modelValue: unref(state).cidade_nascimento_id,
                              "onUpdate:modelValue": ($event) => unref(state).cidade_nascimento_id = $event,
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
                      createVNode(VCol, { md: "2" }, {
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
                      createVNode(VCol, { md: "2" }, {
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
                            modelValue: unref(state).cidade_nascimento_id,
                            "onUpdate:modelValue": ($event) => unref(state).cidade_nascimento_id = $event,
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
                            label: "CPF do Pai"
                          }, ssrGetDirectiveProps(_ctx, _directive_mask, "###.###.###-##")), null, _parent4, _scopeId3));
                        } else {
                          return [
                            withDirectives(createVNode(VTextField, {
                              modelValue: unref(state).cpf_pai,
                              "onUpdate:modelValue": ($event) => unref(state).cpf_pai = $event,
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
                            label: "Nome do Pai"
                          }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(VTextField, {
                              modelValue: unref(state).nome_pai,
                              "onUpdate:modelValue": ($event) => unref(state).nome_pai = $event,
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
                            label: "CPF da M\xE3e"
                          }, ssrGetDirectiveProps(_ctx, _directive_mask, "###.###.###-##")), null, _parent4, _scopeId3));
                        } else {
                          return [
                            withDirectives(createVNode(VTextField, {
                              modelValue: unref(state).cpf_mae,
                              "onUpdate:modelValue": ($event) => unref(state).cpf_mae = $event,
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
                    createVNode(VCol, { md: "2" }, {
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
                    createVNode(VCol, { md: "2" }, {
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
                          modelValue: unref(state).cidade_nascimento_id,
                          "onUpdate:modelValue": ($event) => unref(state).cidade_nascimento_id = $event,
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
const _sfc_setup$c = _sfc_main$c.setup;
_sfc_main$c.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Dados.vue");
  return _sfc_setup$c ? _sfc_setup$c(props, ctx) : undefined;
};
const cnpj = helpers.withMessage("CNPJ inv\xE1lido", (value) => {
  if (!value) return false;
  const cnpj2 = value.replace(/[^\d]+/g, "");
  if (cnpj2.length !== 14) return false;
  if (/^(\d)\1+$/.test(cnpj2)) return false;
  let tamanho = cnpj2.length - 2;
  let numeros = cnpj2.substring(0, tamanho);
  const digitos = cnpj2.substring(tamanho);
  let soma = 0;
  let pos = tamanho - 7;
  for (let i = tamanho; i >= 1; i--) {
    soma += parseInt(numeros.charAt(tamanho - i), 10) * pos--;
    if (pos < 2) pos = 9;
  }
  let resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
  if (resultado !== parseInt(digitos.charAt(0), 10)) return false;
  tamanho += 1;
  numeros = cnpj2.substring(0, tamanho);
  soma = 0;
  pos = tamanho - 7;
  for (let i = tamanho; i >= 1; i--) {
    soma += parseInt(numeros.charAt(tamanho - i), 10) * pos--;
    if (pos < 2) pos = 9;
  }
  resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
  return resultado === parseInt(digitos.charAt(1), 10);
});
const _sfc_main$b = {
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
    const props = __props;
    const emit2 = __emit;
    const router = useRouter$1();
    const route = useRoute$1();
    const { $toast } = useNuxtApp();
    const config = useRuntimeConfig();
    `${config.public.auth}/service/gerencia/getPessoaById`;
    const createPessoa = `${config.public.auth}/service/gerencia/createPessoa`;
    const updatePessoa = `${config.public.auth}/service/gerencia/updatePessoa`;
    const { id } = route.params;
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
        const { data, error, status } = await fetchWithToken(createPessoa, {
          method: "POST",
          body: payloadFormated
        });
        if (status.value === "error" && error.value.statusCode === 500) {
          $toast.error(
            "Erro ao cadastrar Pessoa Juridica,o CNPJ j\xE1 est\xE1 cadastrado."
          );
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
        $toast.error(
          "Erro ao cadastrar pessoa juridica, preencha os campos obrigatorios."
        );
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
      const { data, error, status } = await fetchWithToken(
        `${updatePessoa}/${id || pessoaId.value}`,
        {
          method: "PUT",
          body: payloadFormated
        }
      );
      if (status.value === "success") {
        if (props.isModal === true) {
          $toast.success("Pessoa Juridica atualizada com sucesso!");
          emit2("close-modal");
          return;
        }
        $toast.success("Pessoa Juridica atualizada com sucesso!");
        router.push("/pessoas/lista");
      } else {
        $toast.error("Erro ao atualizar Pessoa Juridica");
      }
    }
    const voltar = () => {
      if (props.isModal === true) {
        emit2("close-modal");
        return;
      }
      router.push("/pessoas/lista");
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
const _sfc_setup$b = _sfc_main$b.setup;
_sfc_main$b.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/DadosJuridica.vue");
  return _sfc_setup$b ? _sfc_setup$b(props, ctx) : undefined;
};
const _imports_0$3 = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHCAgICAgHBwgHBwoHBwcHBw8ICQcKIBEiIiARHx8YHSggGBolGx8TITEhJSkrLi4uFx8zODMsNygtLisBCgoKCg0FGg8HDisZExkrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIANcA6wMBIgACEQEDEQH/xAAWAAEBAQAAAAAAAAAAAAAAAAAAAQb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFgEBAQEAAAAAAAAAAAAAAAAAAAcE/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AyQDCrIqKCAAqAAAAogCooCAAAACggAKgAAACoCgAgoCAAAAAAAoIAAKAgAAoCAACoAAAAAAACggKCAAqAAqKAIAKgCoAAAAAAAKgAKgAqACgAIoIqKCAAAAKgAogAKCAoIqAKigIKgAqAKgAogAoCKIAoAIqAKACKAgqAAoCAAqACgAIAKACKAgAKigCCggAAAAoCAoICgioACoCoAAAAAAoCCgIKAgAAKCAAAAKgAqAAAKgAKiggAAKCAAogAAAqAAKCKigigCCoAAAoAioAKigiiACgCKAgqAqCgigCAAoigCKCAAKiggACoAAAqKgAAAAAAKACAAqAAAAAAqAKioAAAAACggAAKCKgAqAKioAKgAAAKCAAAAKigIqAAAKigigAgAKigCKCCoCoAAAKgAqKAIACoAogCggKgAqCgiooIKgKIoIKAAAiiAqACoqAKigiiAqKAgqAKgCggKIAoICoAAAAAAKCKigCKCKgCggAAAAAKCKAIKAgoAACCgAAIKAgoCCgIKAgoAACCgCKAIoD//Z";
const _imports_1 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABIgAAASIAQMAAABC4maAAAAAA1BMVEUAgACc+aWRAAAA1ElEQVR42uzBgQAAAACAoP2pF6kCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGD24EAAAAAAAMj/tRFUVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVaU9OCQAAAAAEPT/tS9MAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMwCla4AAb0OJ2IAAAAASUVORK5CYII=";
const _sfc_main$a = {
  __name: "Documentos",
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
    const emit2 = __emit;
    const props = __props;
    const { $toast } = useNuxtApp();
    const route = useRoute$1();
    const router = useRouter$1();
    const { id } = route.params;
    const config = useRuntimeConfig();
    const allTipos = `${config.public.auth}/service/gerencia/listarTipoDocumento`;
    const allUf = `${config.public.auth}/service/gerencia/listarUF`;
    const allDoc = `${config.public.auth}/service/gerencia/getPessoaDocById`;
    const createDoc = `${config.public.auth}/service/gerencia/createPessoaDoc`;
    const updateDoc = `${config.public.auth}/service/gerencia/updatePessoaDoc`;
    const isModalOpen = ref(false);
    const selectedDoc = ref(null);
    const user_id = ref(useCookie("user-data").value.usuario_id).value;
    const pessoa_id = id ? Number(id) : Number(useCookie("pessoa-id").value);
    const state = reactive({
      tabvalores_tipodoc_id: null,
      emissor: null,
      numero: null,
      data_emissao: null,
      data_vencimento: null,
      tabvalores_ufemissor_id: null
    });
    const headers = [
      { title: "Tipo", value: "tipoDocumento.descricao" },
      { title: "N\xFAmero", value: "numero" },
      { title: "Emissor", value: "emissor" },
      {
        title: "UF",
        value: "ufEmissor.descricao"
      },
      {
        title: "Emiss\xE3o",
        value: "data_emissao"
      },
      {
        title: "Validade",
        value: "data_vencimento"
      },
      {
        value: "actions"
      }
    ];
    const rules = {
      numero: {
        required: helpers.withMessage("O campo \xE9 obrigatorio", required)
      },
      emissor: {
        required: helpers.withMessage("O campo \xE9 obrigatorio", required)
      },
      tabvalores_ufemissor_id: {
        required: helpers.withMessage("O campo \xE9 obrigatorio", required)
      }
    };
    const v$ = useVuelidate(rules, state);
    const {
      data: documentos,
      pending,
      refresh
    } = ([__temp, __restore] = withAsyncContext(async () => useLazyAsyncData("cliente-documentos", async () => {
      const [tipoDocumentoItems, ufItems, pessoasDocsItems] = await Promise.all([
        $fetchWithToken(allTipos),
        $fetchWithToken(allUf),
        $fetchWithToken(`${allDoc}/${pessoa_id}`)
      ]);
      const formattedPessoasDocsItems = pessoasDocsItems.map((doc) => {
        return {
          ...doc,
          data_emissao: doc.data_emissao ? formatDate(doc.data_emissao, "dd/mm/yyyy") : null,
          data_vencimento: doc.data_vencimento ? formatDate(doc.data_vencimento, "dd/mm/yyyy") : null
        };
      });
      return {
        tipoDocumentoItems,
        ufItems,
        pessoasDocsItems: formattedPessoasDocsItems
      };
    })), __temp = await __temp, __restore(), __temp);
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
          user_id,
          pessoa_id
        };
        const { data, error, status } = await fetchWithToken(createDoc, {
          method: "POST",
          body: payloadFormated
        });
        if (status.value === "error" && error.value.statusCode === 500) {
          $toast.error(error.value.data.details);
        } else {
          $toast.success("Documento cadastrado com sucesso!");
          refresh();
          for (const key in state) {
            state[key] = "";
          }
          v$.value.$reset();
        }
      } else {
        $toast.error(
          "Erro ao cadastrar documento. Os seguintes campos s\xE3o obrigat\xF3rios: N\xFAmero, Emissor e UF."
        );
      }
    }
    async function handleScannerClick(pessoa_docs_token) {
      try {
        await openScanner();
        await enviarArquivo(pessoa_docs_token);
      } catch (error) {
        console.error("Erro ao executar scanner ou listar arquivos:", error);
      }
    }
    async function openScanner() {
      try {
        const { data } = await useFetch(acionarScanner, { method: "GET" }, "$cLGZtMLuJD");
      } catch (error) {
        $toast.error("Erro ao acionar o scanner:", error);
      }
    }
    async function enviarArquivo(pessoa_docs_token) {
      try {
        const { data, status } = await useFetch(
          "http://localhost:3500/uploadAnexo",
          {
            method: "POST",
            body: {
              tipo: "docs",
              token: route.query.ato_token_edit,
              cartorio_token: pessoa_docs_token
            }
          },
          "$2fkU5kgcxs"
        );
      } catch (error) {
        console.error("Erro ao enviar o arquivo:", error);
      }
    }
    function redirectToUpdate(item) {
      if (item) {
        selectedDoc.value = {
          ...item,
          data_emissao: item.data_emissao ? formatDate(item.data_emissao, "dd/mm/yyyy") : null,
          data_vencimento: item.data_vencimento ? formatDate(item.data_vencimento, "dd/mm/yyyy") : null
        };
        isModalOpen.value = true;
      }
    }
    async function onUpdate(id2) {
      const payloadFormated = {
        tabvalores_tipodoc_id: selectedDoc.value.tabvalores_tipodoc_id,
        numero: selectedDoc.value.numero,
        emissor: selectedDoc.value.emissor,
        tabvalores_ufemissor_id: selectedDoc.value.tabvalores_ufemissor_id,
        data_vencimento: selectedDoc.value.data_vencimento,
        data_emissao: formatToISO(selectedDoc.value.data_emissao)
      };
      const { status } = await fetchWithToken(`${updateDoc}/${id2}`, {
        method: "PUT",
        body: payloadFormated
      });
      if (status.value === "success") {
        isModalOpen.value = false;
        $toast.success("Pessoa atualizada com sucesso!");
        refresh();
      }
    }
    async function deleteDocumento(item) {
      item.excluido = !item.excluido;
      try {
        await fetchWithToken(`${updateDoc}/${item.id}`, {
          method: "PUT",
          body: JSON.stringify({ excluido: item.excluido })
        });
      } catch (error) {
        console.error("Erro ao excluir pessoa:", error);
      }
    }
    const voltar = () => {
      if (props.isModal === true) {
        emit2("close-modal");
        return;
      }
      router.push("/pessoas/lista");
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
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
                            modelValue: unref(state).tabvalores_tipodoc_id,
                            "onUpdate:modelValue": ($event) => unref(state).tabvalores_tipodoc_id = $event,
                            items: unref(documentos).tipoDocumentoItems,
                            label: "Tipo",
                            "item-title": "descricao",
                            "item-value": "id"
                          }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(VAutocomplete, {
                              modelValue: unref(state).tabvalores_tipodoc_id,
                              "onUpdate:modelValue": ($event) => unref(state).tabvalores_tipodoc_id = $event,
                              items: unref(documentos).tipoDocumentoItems,
                              label: "Tipo",
                              "item-title": "descricao",
                              "item-value": "id"
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(VCol, null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(VTextField, {
                            modelValue: unref(state).numero,
                            "onUpdate:modelValue": ($event) => unref(state).numero = $event,
                            "error-messages": unref(v$).numero.$errors.map((e) => e.$message),
                            label: "Numero",
                            required: "",
                            onBlur: unref(v$).numero.$touch,
                            onInput: unref(v$).numero.$touch
                          }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(VTextField, {
                              modelValue: unref(state).numero,
                              "onUpdate:modelValue": ($event) => unref(state).numero = $event,
                              "error-messages": unref(v$).numero.$errors.map((e) => e.$message),
                              label: "Numero",
                              required: "",
                              onBlur: unref(v$).numero.$touch,
                              onInput: unref(v$).numero.$touch
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages", "onBlur", "onInput"])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(VCol, { md: "2" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(VTextField, {
                            modelValue: unref(state).emissor,
                            "onUpdate:modelValue": ($event) => unref(state).emissor = $event,
                            "error-messages": unref(v$).emissor.$errors.map((e) => e.$message),
                            required: "",
                            onBlur: unref(v$).emissor.$touch,
                            onInput: unref(v$).emissor.$touch,
                            label: "Emissor"
                          }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(VTextField, {
                              modelValue: unref(state).emissor,
                              "onUpdate:modelValue": ($event) => unref(state).emissor = $event,
                              "error-messages": unref(v$).emissor.$errors.map((e) => e.$message),
                              required: "",
                              onBlur: unref(v$).emissor.$touch,
                              onInput: unref(v$).emissor.$touch,
                              label: "Emissor"
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages", "onBlur", "onInput"])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(VCol, null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(VAutocomplete, {
                            modelValue: unref(state).tabvalores_ufemissor_id,
                            "onUpdate:modelValue": ($event) => unref(state).tabvalores_ufemissor_id = $event,
                            error: unref(v$).tabvalores_ufemissor_id.$error,
                            "error-messages": unref(v$).tabvalores_ufemissor_id.$errors.map((e) => e.$message),
                            items: unref(documentos).ufItems,
                            label: "UF",
                            "item-title": "descricao",
                            "item-value": "id",
                            required: "",
                            onBlur: unref(v$).tabvalores_ufemissor_id.$touch,
                            onInput: unref(v$).tabvalores_ufemissor_id.$touch
                          }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(VAutocomplete, {
                              modelValue: unref(state).tabvalores_ufemissor_id,
                              "onUpdate:modelValue": ($event) => unref(state).tabvalores_ufemissor_id = $event,
                              error: unref(v$).tabvalores_ufemissor_id.$error,
                              "error-messages": unref(v$).tabvalores_ufemissor_id.$errors.map((e) => e.$message),
                              items: unref(documentos).ufItems,
                              label: "UF",
                              "item-title": "descricao",
                              "item-value": "id",
                              required: "",
                              onBlur: unref(v$).tabvalores_ufemissor_id.$touch,
                              onInput: unref(v$).tabvalores_ufemissor_id.$touch
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "error", "error-messages", "items", "onBlur", "onInput"])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(VCol, { md: "2" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(VTextField, mergeProps({
                            modelValue: unref(state).data_emissao,
                            "onUpdate:modelValue": ($event) => unref(state).data_emissao = $event,
                            label: "Emiss\xE3o",
                            placeholder: "dd/mm/yyyy"
                          }, ssrGetDirectiveProps(_ctx, _directive_mask, "##/##/####")), null, _parent4, _scopeId3));
                        } else {
                          return [
                            withDirectives(createVNode(VTextField, {
                              modelValue: unref(state).data_emissao,
                              "onUpdate:modelValue": ($event) => unref(state).data_emissao = $event,
                              label: "Emiss\xE3o",
                              placeholder: "dd/mm/yyyy"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"]), [
                              [_directive_mask, "##/##/####"]
                            ])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(VCol, { md: "2" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(VTextField, mergeProps({
                            modelValue: unref(state).data_vencimento,
                            "onUpdate:modelValue": ($event) => unref(state).data_vencimento = $event,
                            label: "Validade",
                            placeholder: "dd/mm/yyyy"
                          }, ssrGetDirectiveProps(_ctx, _directive_mask, "##/##/####")), null, _parent4, _scopeId3));
                        } else {
                          return [
                            withDirectives(createVNode(VTextField, {
                              modelValue: unref(state).data_vencimento,
                              "onUpdate:modelValue": ($event) => unref(state).data_vencimento = $event,
                              label: "Validade",
                              placeholder: "dd/mm/yyyy"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"]), [
                              [_directive_mask, "##/##/####"]
                            ])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(`<div class="mt-1"${_scopeId2}><img style="${ssrRenderStyle({ "width": "40px", "height": "40px", "cursor": "pointer" })}"${ssrRenderAttr("src", _imports_0$4)} alt="novo"${_scopeId2}></div>`);
                  } else {
                    return [
                      createVNode(VCol, { md: "2" }, {
                        default: withCtx(() => [
                          createVNode(VAutocomplete, {
                            modelValue: unref(state).tabvalores_tipodoc_id,
                            "onUpdate:modelValue": ($event) => unref(state).tabvalores_tipodoc_id = $event,
                            items: unref(documentos).tipoDocumentoItems,
                            label: "Tipo",
                            "item-title": "descricao",
                            "item-value": "id"
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                        ]),
                        _: 1
                      }),
                      createVNode(VCol, null, {
                        default: withCtx(() => [
                          createVNode(VTextField, {
                            modelValue: unref(state).numero,
                            "onUpdate:modelValue": ($event) => unref(state).numero = $event,
                            "error-messages": unref(v$).numero.$errors.map((e) => e.$message),
                            label: "Numero",
                            required: "",
                            onBlur: unref(v$).numero.$touch,
                            onInput: unref(v$).numero.$touch
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages", "onBlur", "onInput"])
                        ]),
                        _: 1
                      }),
                      createVNode(VCol, { md: "2" }, {
                        default: withCtx(() => [
                          createVNode(VTextField, {
                            modelValue: unref(state).emissor,
                            "onUpdate:modelValue": ($event) => unref(state).emissor = $event,
                            "error-messages": unref(v$).emissor.$errors.map((e) => e.$message),
                            required: "",
                            onBlur: unref(v$).emissor.$touch,
                            onInput: unref(v$).emissor.$touch,
                            label: "Emissor"
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages", "onBlur", "onInput"])
                        ]),
                        _: 1
                      }),
                      createVNode(VCol, null, {
                        default: withCtx(() => [
                          createVNode(VAutocomplete, {
                            modelValue: unref(state).tabvalores_ufemissor_id,
                            "onUpdate:modelValue": ($event) => unref(state).tabvalores_ufemissor_id = $event,
                            error: unref(v$).tabvalores_ufemissor_id.$error,
                            "error-messages": unref(v$).tabvalores_ufemissor_id.$errors.map((e) => e.$message),
                            items: unref(documentos).ufItems,
                            label: "UF",
                            "item-title": "descricao",
                            "item-value": "id",
                            required: "",
                            onBlur: unref(v$).tabvalores_ufemissor_id.$touch,
                            onInput: unref(v$).tabvalores_ufemissor_id.$touch
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "error", "error-messages", "items", "onBlur", "onInput"])
                        ]),
                        _: 1
                      }),
                      createVNode(VCol, { md: "2" }, {
                        default: withCtx(() => [
                          withDirectives(createVNode(VTextField, {
                            modelValue: unref(state).data_emissao,
                            "onUpdate:modelValue": ($event) => unref(state).data_emissao = $event,
                            label: "Emiss\xE3o",
                            placeholder: "dd/mm/yyyy"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"]), [
                            [_directive_mask, "##/##/####"]
                          ])
                        ]),
                        _: 1
                      }),
                      createVNode(VCol, { md: "2" }, {
                        default: withCtx(() => [
                          withDirectives(createVNode(VTextField, {
                            modelValue: unref(state).data_vencimento,
                            "onUpdate:modelValue": ($event) => unref(state).data_vencimento = $event,
                            label: "Validade",
                            placeholder: "dd/mm/yyyy"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"]), [
                            [_directive_mask, "##/##/####"]
                          ])
                        ]),
                        _: 1
                      }),
                      createVNode("div", { class: "mt-1" }, [
                        createVNode("img", {
                          style: { "width": "40px", "height": "40px", "cursor": "pointer" },
                          src: _imports_0$4,
                          alt: "novo",
                          onClick: onSubmit
                        })
                      ])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(VDataTable, {
                style: { "max-height": "330px" },
                headers,
                items: unref(documentos).pessoasDocsItems,
                "item-key": "id"
              }, {
                "item.actions": withCtx(({ item }, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(VRow, { style: { "display": "flex", "margin-top": "-8px", "gap": "10px" } }, {
                      default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<div title="editar"${_scopeId3}><img style="${ssrRenderStyle({ "width": "30px", "height": "30px", "cursor": "pointer" })}"${ssrRenderAttr("src", _imports_1$1)} alt="editar"${_scopeId3}></div><div title="deletar"${_scopeId3}>`);
                          if (item.excluido) {
                            _push4(`<img style="${ssrRenderStyle({ "width": "30px", "height": "30px", "cursor": "pointer" })}"${ssrRenderAttr("src", _imports_2)} alt="deletar" title="Reativar"${_scopeId3}>`);
                          } else {
                            _push4(`<img${ssrRenderAttr("src", _imports_3)} alt="reativar" class="trash-icon" style="${ssrRenderStyle({ "width": "30px", "height": "30px", "cursor": "pointer" })}" title="reativar"${_scopeId3}>`);
                          }
                          _push4(`</div><div title="Criar"${_scopeId3}>`);
                          if (_ctx.status_arquivo === false) {
                            _push4(`<img style="${ssrRenderStyle({ "width": "30px", "height": "30px", "cursor": "pointer" })}"${ssrRenderAttr("src", _imports_0$3)} alt="Criar"${_scopeId3}>`);
                          } else if (_ctx.status_arquivo === true) {
                            _push4(`<img style="${ssrRenderStyle({ "width": "30px", "height": "30px", "cursor": "pointer" })}"${ssrRenderAttr("src", _imports_1)} alt="Criar"${_scopeId3}>`);
                          } else {
                            _push4(`<img style="${ssrRenderStyle({ "width": "30px", "height": "30px", "cursor": "pointer" })}"${ssrRenderAttr("src", _imports_2$1)} alt="Criar"${_scopeId3}>`);
                          }
                          _push4(`</div>`);
                        } else {
                          return [
                            createVNode("div", {
                              onClick: ($event) => redirectToUpdate(item),
                              title: "editar"
                            }, [
                              createVNode("img", {
                                style: { "width": "30px", "height": "30px", "cursor": "pointer" },
                                src: _imports_1$1,
                                alt: "editar"
                              })
                            ], 8, ["onClick"]),
                            createVNode("div", {
                              onClick: ($event) => deleteDocumento(item),
                              title: "deletar"
                            }, [
                              item.excluido ? (openBlock(), createBlock("img", {
                                key: 0,
                                style: { "width": "30px", "height": "30px", "cursor": "pointer" },
                                src: _imports_2,
                                alt: "deletar",
                                title: "Reativar"
                              })) : (openBlock(), createBlock("img", {
                                key: 1,
                                src: _imports_3,
                                alt: "reativar",
                                class: "trash-icon",
                                style: { "width": "30px", "height": "30px", "cursor": "pointer" },
                                title: "reativar"
                              }))
                            ], 8, ["onClick"]),
                            createVNode("div", {
                              onClick: ($event) => handleScannerClick(item.token),
                              title: "Criar"
                            }, [
                              _ctx.status_arquivo === false ? (openBlock(), createBlock("img", {
                                key: 0,
                                style: { "width": "30px", "height": "30px", "cursor": "pointer" },
                                src: _imports_0$3,
                                alt: "Criar"
                              })) : _ctx.status_arquivo === true ? (openBlock(), createBlock("img", {
                                key: 1,
                                style: { "width": "30px", "height": "30px", "cursor": "pointer" },
                                src: _imports_1,
                                alt: "Criar"
                              })) : (openBlock(), createBlock("img", {
                                key: 2,
                                style: { "width": "30px", "height": "30px", "cursor": "pointer" },
                                src: _imports_2$1,
                                alt: "Criar"
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
                            onClick: ($event) => redirectToUpdate(item),
                            title: "editar"
                          }, [
                            createVNode("img", {
                              style: { "width": "30px", "height": "30px", "cursor": "pointer" },
                              src: _imports_1$1,
                              alt: "editar"
                            })
                          ], 8, ["onClick"]),
                          createVNode("div", {
                            onClick: ($event) => deleteDocumento(item),
                            title: "deletar"
                          }, [
                            item.excluido ? (openBlock(), createBlock("img", {
                              key: 0,
                              style: { "width": "30px", "height": "30px", "cursor": "pointer" },
                              src: _imports_2,
                              alt: "deletar",
                              title: "Reativar"
                            })) : (openBlock(), createBlock("img", {
                              key: 1,
                              src: _imports_3,
                              alt: "reativar",
                              class: "trash-icon",
                              style: { "width": "30px", "height": "30px", "cursor": "pointer" },
                              title: "reativar"
                            }))
                          ], 8, ["onClick"]),
                          createVNode("div", {
                            onClick: ($event) => handleScannerClick(item.token),
                            title: "Criar"
                          }, [
                            _ctx.status_arquivo === false ? (openBlock(), createBlock("img", {
                              key: 0,
                              style: { "width": "30px", "height": "30px", "cursor": "pointer" },
                              src: _imports_0$3,
                              alt: "Criar"
                            })) : _ctx.status_arquivo === true ? (openBlock(), createBlock("img", {
                              key: 1,
                              style: { "width": "30px", "height": "30px", "cursor": "pointer" },
                              src: _imports_1,
                              alt: "Criar"
                            })) : (openBlock(), createBlock("img", {
                              key: 2,
                              style: { "width": "30px", "height": "30px", "cursor": "pointer" },
                              src: _imports_2$1,
                              alt: "Criar"
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
                                              modelValue: unref(selectedDoc).tabvalores_tipodoc_id,
                                              "onUpdate:modelValue": ($event) => unref(selectedDoc).tabvalores_tipodoc_id = $event,
                                              items: unref(documentos).tipoDocumentoItems,
                                              label: "Tipo",
                                              "item-title": "descricao",
                                              "item-value": "id"
                                            }, null, _parent7, _scopeId6));
                                          } else {
                                            return [
                                              createVNode(VAutocomplete, {
                                                modelValue: unref(selectedDoc).tabvalores_tipodoc_id,
                                                "onUpdate:modelValue": ($event) => unref(selectedDoc).tabvalores_tipodoc_id = $event,
                                                items: unref(documentos).tipoDocumentoItems,
                                                label: "Tipo",
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
                                              modelValue: unref(selectedDoc).numero,
                                              "onUpdate:modelValue": ($event) => unref(selectedDoc).numero = $event,
                                              label: "N\xFAmero"
                                            }, null, _parent7, _scopeId6));
                                          } else {
                                            return [
                                              createVNode(VTextField, {
                                                modelValue: unref(selectedDoc).numero,
                                                "onUpdate:modelValue": ($event) => unref(selectedDoc).numero = $event,
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
                                              modelValue: unref(selectedDoc).emissor,
                                              "onUpdate:modelValue": ($event) => unref(selectedDoc).emissor = $event,
                                              label: "N\xFAmero"
                                            }, null, _parent7, _scopeId6));
                                          } else {
                                            return [
                                              createVNode(VTextField, {
                                                modelValue: unref(selectedDoc).emissor,
                                                "onUpdate:modelValue": ($event) => unref(selectedDoc).emissor = $event,
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
                                            _push7(ssrRenderComponent(VAutocomplete, {
                                              modelValue: unref(selectedDoc).tabvalores_ufemissor_id,
                                              "onUpdate:modelValue": ($event) => unref(selectedDoc).tabvalores_ufemissor_id = $event,
                                              items: unref(documentos).ufItems,
                                              label: "UF",
                                              "item-title": "descricao",
                                              "item-value": "id"
                                            }, null, _parent7, _scopeId6));
                                          } else {
                                            return [
                                              createVNode(VAutocomplete, {
                                                modelValue: unref(selectedDoc).tabvalores_ufemissor_id,
                                                "onUpdate:modelValue": ($event) => unref(selectedDoc).tabvalores_ufemissor_id = $event,
                                                items: unref(documentos).ufItems,
                                                label: "UF",
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
                                            _push7(ssrRenderComponent(VTextField, mergeProps({
                                              modelValue: unref(selectedDoc).data_emissao,
                                              "onUpdate:modelValue": ($event) => unref(selectedDoc).data_emissao = $event,
                                              label: "Emiss\xE3o",
                                              placeholder: "dd/mm/yyyy"
                                            }, ssrGetDirectiveProps(_ctx, _directive_mask, "##/##/####")), null, _parent7, _scopeId6));
                                          } else {
                                            return [
                                              withDirectives(createVNode(VTextField, {
                                                modelValue: unref(selectedDoc).data_emissao,
                                                "onUpdate:modelValue": ($event) => unref(selectedDoc).data_emissao = $event,
                                                label: "Emiss\xE3o",
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
                                        md: "6"
                                      }, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(ssrRenderComponent(VTextField, mergeProps({
                                              modelValue: unref(selectedDoc).data_vencimento,
                                              "onUpdate:modelValue": ($event) => unref(selectedDoc).data_vencimento = $event,
                                              label: "Validade",
                                              placeholder: "dd/mm/yyyy"
                                            }, ssrGetDirectiveProps(_ctx, _directive_mask, "##/##/####")), null, _parent7, _scopeId6));
                                          } else {
                                            return [
                                              withDirectives(createVNode(VTextField, {
                                                modelValue: unref(selectedDoc).data_vencimento,
                                                "onUpdate:modelValue": ($event) => unref(selectedDoc).data_vencimento = $event,
                                                label: "Validade",
                                                placeholder: "dd/mm/yyyy"
                                              }, null, 8, ["modelValue", "onUpdate:modelValue"]), [
                                                [_directive_mask, "##/##/####"]
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
                                          md: "6"
                                        }, {
                                          default: withCtx(() => [
                                            createVNode(VAutocomplete, {
                                              modelValue: unref(selectedDoc).tabvalores_tipodoc_id,
                                              "onUpdate:modelValue": ($event) => unref(selectedDoc).tabvalores_tipodoc_id = $event,
                                              items: unref(documentos).tipoDocumentoItems,
                                              label: "Tipo",
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
                                              modelValue: unref(selectedDoc).numero,
                                              "onUpdate:modelValue": ($event) => unref(selectedDoc).numero = $event,
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
                                              modelValue: unref(selectedDoc).emissor,
                                              "onUpdate:modelValue": ($event) => unref(selectedDoc).emissor = $event,
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
                                            createVNode(VAutocomplete, {
                                              modelValue: unref(selectedDoc).tabvalores_ufemissor_id,
                                              "onUpdate:modelValue": ($event) => unref(selectedDoc).tabvalores_ufemissor_id = $event,
                                              items: unref(documentos).ufItems,
                                              label: "UF",
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
                                            withDirectives(createVNode(VTextField, {
                                              modelValue: unref(selectedDoc).data_emissao,
                                              "onUpdate:modelValue": ($event) => unref(selectedDoc).data_emissao = $event,
                                              label: "Emiss\xE3o",
                                              placeholder: "dd/mm/yyyy"
                                            }, null, 8, ["modelValue", "onUpdate:modelValue"]), [
                                              [_directive_mask, "##/##/####"]
                                            ])
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(VCol, {
                                          cols: "12",
                                          md: "6"
                                        }, {
                                          default: withCtx(() => [
                                            withDirectives(createVNode(VTextField, {
                                              modelValue: unref(selectedDoc).data_vencimento,
                                              "onUpdate:modelValue": ($event) => unref(selectedDoc).data_vencimento = $event,
                                              label: "Validade",
                                              placeholder: "dd/mm/yyyy"
                                            }, null, 8, ["modelValue", "onUpdate:modelValue"]), [
                                              [_directive_mask, "##/##/####"]
                                            ])
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
                                            modelValue: unref(selectedDoc).tabvalores_tipodoc_id,
                                            "onUpdate:modelValue": ($event) => unref(selectedDoc).tabvalores_tipodoc_id = $event,
                                            items: unref(documentos).tipoDocumentoItems,
                                            label: "Tipo",
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
                                            modelValue: unref(selectedDoc).numero,
                                            "onUpdate:modelValue": ($event) => unref(selectedDoc).numero = $event,
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
                                            modelValue: unref(selectedDoc).emissor,
                                            "onUpdate:modelValue": ($event) => unref(selectedDoc).emissor = $event,
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
                                          createVNode(VAutocomplete, {
                                            modelValue: unref(selectedDoc).tabvalores_ufemissor_id,
                                            "onUpdate:modelValue": ($event) => unref(selectedDoc).tabvalores_ufemissor_id = $event,
                                            items: unref(documentos).ufItems,
                                            label: "UF",
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
                                          withDirectives(createVNode(VTextField, {
                                            modelValue: unref(selectedDoc).data_emissao,
                                            "onUpdate:modelValue": ($event) => unref(selectedDoc).data_emissao = $event,
                                            label: "Emiss\xE3o",
                                            placeholder: "dd/mm/yyyy"
                                          }, null, 8, ["modelValue", "onUpdate:modelValue"]), [
                                            [_directive_mask, "##/##/####"]
                                          ])
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(VCol, {
                                        cols: "12",
                                        md: "6"
                                      }, {
                                        default: withCtx(() => [
                                          withDirectives(createVNode(VTextField, {
                                            modelValue: unref(selectedDoc).data_vencimento,
                                            "onUpdate:modelValue": ($event) => unref(selectedDoc).data_vencimento = $event,
                                            label: "Validade",
                                            placeholder: "dd/mm/yyyy"
                                          }, null, 8, ["modelValue", "onUpdate:modelValue"]), [
                                            [_directive_mask, "##/##/####"]
                                          ])
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
                                  onClick: ($event) => onUpdate(unref(selectedDoc).id)
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
                                    onClick: ($event) => onUpdate(unref(selectedDoc).id)
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
                                          modelValue: unref(selectedDoc).tabvalores_tipodoc_id,
                                          "onUpdate:modelValue": ($event) => unref(selectedDoc).tabvalores_tipodoc_id = $event,
                                          items: unref(documentos).tipoDocumentoItems,
                                          label: "Tipo",
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
                                          modelValue: unref(selectedDoc).numero,
                                          "onUpdate:modelValue": ($event) => unref(selectedDoc).numero = $event,
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
                                          modelValue: unref(selectedDoc).emissor,
                                          "onUpdate:modelValue": ($event) => unref(selectedDoc).emissor = $event,
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
                                        createVNode(VAutocomplete, {
                                          modelValue: unref(selectedDoc).tabvalores_ufemissor_id,
                                          "onUpdate:modelValue": ($event) => unref(selectedDoc).tabvalores_ufemissor_id = $event,
                                          items: unref(documentos).ufItems,
                                          label: "UF",
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
                                        withDirectives(createVNode(VTextField, {
                                          modelValue: unref(selectedDoc).data_emissao,
                                          "onUpdate:modelValue": ($event) => unref(selectedDoc).data_emissao = $event,
                                          label: "Emiss\xE3o",
                                          placeholder: "dd/mm/yyyy"
                                        }, null, 8, ["modelValue", "onUpdate:modelValue"]), [
                                          [_directive_mask, "##/##/####"]
                                        ])
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(VCol, {
                                      cols: "12",
                                      md: "6"
                                    }, {
                                      default: withCtx(() => [
                                        withDirectives(createVNode(VTextField, {
                                          modelValue: unref(selectedDoc).data_vencimento,
                                          "onUpdate:modelValue": ($event) => unref(selectedDoc).data_vencimento = $event,
                                          label: "Validade",
                                          placeholder: "dd/mm/yyyy"
                                        }, null, 8, ["modelValue", "onUpdate:modelValue"]), [
                                          [_directive_mask, "##/##/####"]
                                        ])
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
                                  onClick: ($event) => onUpdate(unref(selectedDoc).id)
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
                                        modelValue: unref(selectedDoc).tabvalores_tipodoc_id,
                                        "onUpdate:modelValue": ($event) => unref(selectedDoc).tabvalores_tipodoc_id = $event,
                                        items: unref(documentos).tipoDocumentoItems,
                                        label: "Tipo",
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
                                        modelValue: unref(selectedDoc).numero,
                                        "onUpdate:modelValue": ($event) => unref(selectedDoc).numero = $event,
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
                                        modelValue: unref(selectedDoc).emissor,
                                        "onUpdate:modelValue": ($event) => unref(selectedDoc).emissor = $event,
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
                                      createVNode(VAutocomplete, {
                                        modelValue: unref(selectedDoc).tabvalores_ufemissor_id,
                                        "onUpdate:modelValue": ($event) => unref(selectedDoc).tabvalores_ufemissor_id = $event,
                                        items: unref(documentos).ufItems,
                                        label: "UF",
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
                                      withDirectives(createVNode(VTextField, {
                                        modelValue: unref(selectedDoc).data_emissao,
                                        "onUpdate:modelValue": ($event) => unref(selectedDoc).data_emissao = $event,
                                        label: "Emiss\xE3o",
                                        placeholder: "dd/mm/yyyy"
                                      }, null, 8, ["modelValue", "onUpdate:modelValue"]), [
                                        [_directive_mask, "##/##/####"]
                                      ])
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(VCol, {
                                    cols: "12",
                                    md: "6"
                                  }, {
                                    default: withCtx(() => [
                                      withDirectives(createVNode(VTextField, {
                                        modelValue: unref(selectedDoc).data_vencimento,
                                        "onUpdate:modelValue": ($event) => unref(selectedDoc).data_vencimento = $event,
                                        label: "Validade",
                                        placeholder: "dd/mm/yyyy"
                                      }, null, 8, ["modelValue", "onUpdate:modelValue"]), [
                                        [_directive_mask, "##/##/####"]
                                      ])
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
                                onClick: ($event) => onUpdate(unref(selectedDoc).id)
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
                          modelValue: unref(state).tabvalores_tipodoc_id,
                          "onUpdate:modelValue": ($event) => unref(state).tabvalores_tipodoc_id = $event,
                          items: unref(documentos).tipoDocumentoItems,
                          label: "Tipo",
                          "item-title": "descricao",
                          "item-value": "id"
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, null, {
                      default: withCtx(() => [
                        createVNode(VTextField, {
                          modelValue: unref(state).numero,
                          "onUpdate:modelValue": ($event) => unref(state).numero = $event,
                          "error-messages": unref(v$).numero.$errors.map((e) => e.$message),
                          label: "Numero",
                          required: "",
                          onBlur: unref(v$).numero.$touch,
                          onInput: unref(v$).numero.$touch
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages", "onBlur", "onInput"])
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, { md: "2" }, {
                      default: withCtx(() => [
                        createVNode(VTextField, {
                          modelValue: unref(state).emissor,
                          "onUpdate:modelValue": ($event) => unref(state).emissor = $event,
                          "error-messages": unref(v$).emissor.$errors.map((e) => e.$message),
                          required: "",
                          onBlur: unref(v$).emissor.$touch,
                          onInput: unref(v$).emissor.$touch,
                          label: "Emissor"
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages", "onBlur", "onInput"])
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, null, {
                      default: withCtx(() => [
                        createVNode(VAutocomplete, {
                          modelValue: unref(state).tabvalores_ufemissor_id,
                          "onUpdate:modelValue": ($event) => unref(state).tabvalores_ufemissor_id = $event,
                          error: unref(v$).tabvalores_ufemissor_id.$error,
                          "error-messages": unref(v$).tabvalores_ufemissor_id.$errors.map((e) => e.$message),
                          items: unref(documentos).ufItems,
                          label: "UF",
                          "item-title": "descricao",
                          "item-value": "id",
                          required: "",
                          onBlur: unref(v$).tabvalores_ufemissor_id.$touch,
                          onInput: unref(v$).tabvalores_ufemissor_id.$touch
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "error", "error-messages", "items", "onBlur", "onInput"])
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, { md: "2" }, {
                      default: withCtx(() => [
                        withDirectives(createVNode(VTextField, {
                          modelValue: unref(state).data_emissao,
                          "onUpdate:modelValue": ($event) => unref(state).data_emissao = $event,
                          label: "Emiss\xE3o",
                          placeholder: "dd/mm/yyyy"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]), [
                          [_directive_mask, "##/##/####"]
                        ])
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, { md: "2" }, {
                      default: withCtx(() => [
                        withDirectives(createVNode(VTextField, {
                          modelValue: unref(state).data_vencimento,
                          "onUpdate:modelValue": ($event) => unref(state).data_vencimento = $event,
                          label: "Validade",
                          placeholder: "dd/mm/yyyy"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]), [
                          [_directive_mask, "##/##/####"]
                        ])
                      ]),
                      _: 1
                    }),
                    createVNode("div", { class: "mt-1" }, [
                      createVNode("img", {
                        style: { "width": "40px", "height": "40px", "cursor": "pointer" },
                        src: _imports_0$4,
                        alt: "novo",
                        onClick: onSubmit
                      })
                    ])
                  ]),
                  _: 1
                }),
                createVNode(VDataTable, {
                  style: { "max-height": "330px" },
                  headers,
                  items: unref(documentos).pessoasDocsItems,
                  "item-key": "id"
                }, {
                  "item.actions": withCtx(({ item }) => [
                    createVNode(VRow, { style: { "display": "flex", "margin-top": "-8px", "gap": "10px" } }, {
                      default: withCtx(() => [
                        createVNode("div", {
                          onClick: ($event) => redirectToUpdate(item),
                          title: "editar"
                        }, [
                          createVNode("img", {
                            style: { "width": "30px", "height": "30px", "cursor": "pointer" },
                            src: _imports_1$1,
                            alt: "editar"
                          })
                        ], 8, ["onClick"]),
                        createVNode("div", {
                          onClick: ($event) => deleteDocumento(item),
                          title: "deletar"
                        }, [
                          item.excluido ? (openBlock(), createBlock("img", {
                            key: 0,
                            style: { "width": "30px", "height": "30px", "cursor": "pointer" },
                            src: _imports_2,
                            alt: "deletar",
                            title: "Reativar"
                          })) : (openBlock(), createBlock("img", {
                            key: 1,
                            src: _imports_3,
                            alt: "reativar",
                            class: "trash-icon",
                            style: { "width": "30px", "height": "30px", "cursor": "pointer" },
                            title: "reativar"
                          }))
                        ], 8, ["onClick"]),
                        createVNode("div", {
                          onClick: ($event) => handleScannerClick(item.token),
                          title: "Criar"
                        }, [
                          _ctx.status_arquivo === false ? (openBlock(), createBlock("img", {
                            key: 0,
                            style: { "width": "30px", "height": "30px", "cursor": "pointer" },
                            src: _imports_0$3,
                            alt: "Criar"
                          })) : _ctx.status_arquivo === true ? (openBlock(), createBlock("img", {
                            key: 1,
                            style: { "width": "30px", "height": "30px", "cursor": "pointer" },
                            src: _imports_1,
                            alt: "Criar"
                          })) : (openBlock(), createBlock("img", {
                            key: 2,
                            style: { "width": "30px", "height": "30px", "cursor": "pointer" },
                            src: _imports_2$1,
                            alt: "Criar"
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
                                      modelValue: unref(selectedDoc).tabvalores_tipodoc_id,
                                      "onUpdate:modelValue": ($event) => unref(selectedDoc).tabvalores_tipodoc_id = $event,
                                      items: unref(documentos).tipoDocumentoItems,
                                      label: "Tipo",
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
                                      modelValue: unref(selectedDoc).numero,
                                      "onUpdate:modelValue": ($event) => unref(selectedDoc).numero = $event,
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
                                      modelValue: unref(selectedDoc).emissor,
                                      "onUpdate:modelValue": ($event) => unref(selectedDoc).emissor = $event,
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
                                    createVNode(VAutocomplete, {
                                      modelValue: unref(selectedDoc).tabvalores_ufemissor_id,
                                      "onUpdate:modelValue": ($event) => unref(selectedDoc).tabvalores_ufemissor_id = $event,
                                      items: unref(documentos).ufItems,
                                      label: "UF",
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
                                    withDirectives(createVNode(VTextField, {
                                      modelValue: unref(selectedDoc).data_emissao,
                                      "onUpdate:modelValue": ($event) => unref(selectedDoc).data_emissao = $event,
                                      label: "Emiss\xE3o",
                                      placeholder: "dd/mm/yyyy"
                                    }, null, 8, ["modelValue", "onUpdate:modelValue"]), [
                                      [_directive_mask, "##/##/####"]
                                    ])
                                  ]),
                                  _: 1
                                }),
                                createVNode(VCol, {
                                  cols: "12",
                                  md: "6"
                                }, {
                                  default: withCtx(() => [
                                    withDirectives(createVNode(VTextField, {
                                      modelValue: unref(selectedDoc).data_vencimento,
                                      "onUpdate:modelValue": ($event) => unref(selectedDoc).data_vencimento = $event,
                                      label: "Validade",
                                      placeholder: "dd/mm/yyyy"
                                    }, null, 8, ["modelValue", "onUpdate:modelValue"]), [
                                      [_directive_mask, "##/##/####"]
                                    ])
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
                              onClick: ($event) => onUpdate(unref(selectedDoc).id)
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
      _push(ssrRenderComponent(_component_NuxtLink, { onClick: voltar }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VBtn, {
              size: "large",
              class: "ml-10 mb-5",
              color: "red"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Voltar`);
                } else {
                  return [
                    createTextVNode("Voltar")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(VBtn, {
                size: "large",
                class: "ml-10 mb-5",
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
      }, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup$a = _sfc_main$a.setup;
_sfc_main$a.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Documentos.vue");
  return _sfc_setup$a ? _sfc_setup$a(props, ctx) : undefined;
};
const _sfc_main$9 = {
  __name: "Representantes",
  __ssrInlineRender: true,
  props: {
    isModal: {
      type: Boolean,
      default: false
    }
  },
  async setup(__props) {
    let __temp, __restore;
    const props = __props;
    const config = useRuntimeConfig();
    const { $toast } = useNuxtApp();
    const route = useRoute$1();
    const router = useRouter$1();
    const procurarPessoa = `${config.public.auth}/service/gerencia/pesquisarPessoas`;
    const papeisApresentante = `${config.public.auth}/service/gerencia/listarPapeis`;
    const criarAtoPessoa = `${config.public.auth}/service/gerencia/representante`;
    `${config.public.auth}/service/gerencia/representante`;
    const pessoasUpdate = `${config.public.auth}/service/gerencia/representante`;
    const cartorio_token = ref(useCookie("user-data").value.cartorio_token);
    const { id } = route.params;
    const pessoa_id = id ? Number(id) : Number(useCookie("pessoa-id").value);
    const pessoasItems = ref([]);
    const pessoasTable = ref([]);
    const papeisItems = ref([]);
    const isModalRegistroOpen = ref(false);
    const headers = [
      {
        title: "Documento",
        align: "start",
        key: "representante",
        value: (item) => {
          var _a, _b;
          return ((_a = item.representante) == null ? undefined : _a.doc_identificacao) || ((_b = item.representante) == null ? undefined : _b.documento);
        }
      },
      {
        title: "Pessoa",
        align: "start",
        key: "representante.nome"
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
    const { data } = ([__temp, __restore] = withAsyncContext(() => fetchWithToken(papeisApresentante, {
      method: "POST",
      body: { rotina: "CADASTRO_PJ" }
    })), __temp = await __temp, __restore(), __temp);
    papeisItems.value = data.value;
    async function searchPessoasService() {
      try {
        const { data: pessoasData, error } = await fetchWithToken(procurarPessoa, {
          method: "POST",
          body: {
            cartorio_token: cartorio_token.value,
            documento: state.documento,
            nome: state.nome
          }
        });
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
        representante: state.pessoa,
        papel: papeisItems.value.find((papel) => papel.id === state.papeis)
      };
      try {
        const { data: data2, error, status } = await fetchWithToken(criarAtoPessoa, {
          method: "POST",
          body: {
            ato_id: null,
            representante_id: state.pessoa.id,
            pessoa_id: pessoa_id || id,
            papel_id: state.papeis,
            user_id: useCookie("user-data").value.usuario_id
          }
        });
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
        await fetchWithToken(`${pessoasUpdate}/${item.id}`, {
          method: "PUT",
          body: JSON.stringify({ excluido: item.excluido })
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
      const _component_ModalRegistroPessoas = _sfc_main;
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(`<!--[-->`);
      _push(ssrRenderComponent(VContainer, { style: { "height": "425px" } }, {
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
                  _push3(`<div${_scopeId2}><img class="mt-1"${ssrRenderAttr("src", _imports_1$2)} style="${ssrRenderStyle({ "width": "40px", "cursor": "pointer" })}" title="Pesquisar Pessoa"${_scopeId2}></div><div${_scopeId2}><img class="mt-1 ml-2"${ssrRenderAttr("src", _imports_0$4)} style="${ssrRenderStyle({ "width": "40px", "cursor": "pointer" })}" title="Criar Pessoa"${_scopeId2}></div>`);
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
                        src: _imports_1$2,
                        style: { "width": "40px", "cursor": "pointer" },
                        title: "Pesquisar Pessoa",
                        onClick: searchPessoasService
                      })
                    ]),
                    createVNode("div", null, [
                      createVNode("img", {
                        class: "mt-1 ml-2",
                        src: _imports_0$4,
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
                  _push3(`<div${_scopeId2}><img class="mt-1"${ssrRenderAttr("src", _imports_0$4)} style="${ssrRenderStyle({ "width": "40px", "cursor": "pointer" })}" title="Criar Representante"${_scopeId2}></div>`);
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
                        src: _imports_0$4,
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
                          style: { "max-height": "330px" },
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
                            style: { "max-height": "330px" },
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
                          style: { "max-height": "330px" },
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
                      src: _imports_1$2,
                      style: { "width": "40px", "cursor": "pointer" },
                      title: "Pesquisar Pessoa",
                      onClick: searchPessoasService
                    })
                  ]),
                  createVNode("div", null, [
                    createVNode("img", {
                      class: "mt-1 ml-2",
                      src: _imports_0$4,
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
                      src: _imports_0$4,
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
                        style: { "max-height": "330px" },
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
              createVNode(_component_ModalRegistroPessoas, {
                show: unref(isModalRegistroOpen),
                onClose: ($event) => isModalRegistroOpen.value = false
              }, null, 8, ["show", "onClose"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, { onClick: voltar }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VBtn, {
              size: "large",
              class: "ml-10 mb-5",
              color: "red"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Voltar`);
                } else {
                  return [
                    createTextVNode("Voltar")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(VBtn, {
                size: "large",
                class: "ml-10 mb-5",
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
      }, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup$9 = _sfc_main$9.setup;
_sfc_main$9.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Pessoas/Cadastros/Representantes.vue");
  return _sfc_setup$9 ? _sfc_setup$9(props, ctx) : undefined;
};
const _sfc_main$8 = {
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
    const emit2 = __emit;
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
    const cep = `${config.public.auth}/service/gerencia/cep`;
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
    const tokenCookie = useCookie("auth_token");
    const token = tokenCookie.value;
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
      } else {
        $toast.error("Erro ao atualizar Endere\xE7o");
      }
    }
    watch(
      () => state.codcep,
      async (newCep) => {
        if (newCep.length === 8) {
          try {
            const { data, error } = await useFetch(`${cep}/${newCep}`, {
              headers: {
                Authorization: token
              }
            }, "$xTfPNGciav");
            if (error.value) {
              console.error("Erro ao buscar CEP:", error.value);
              $toast.error("Erro ao buscar CEP no servidor.");
              return;
            }
            if (data.value.logradouro && data.value.bairro && data.value.localidade && data.value.uf) {
              state.logradouro = data.value.logradouro;
              state.bairro = data.value.bairro;
              state.complemento = data.value.complemento;
              let cidade = `${data.value.localidade}/${data.value.uf}`.toUpperCase();
              const cidadeItem = enderecos.value.cidadesItems.find(
                (item) => item.descricao === cidade
              );
              if (cidadeItem) {
                state.cidade_id = cidadeItem.id;
                state.tabvalores_pais_id = 76;
              } else {
                $toast.error("Cidade n\xE3o encontrada na lista!");
              }
            } else {
              $toast.error("CEP n\xE3o retornou dados v\xE1lidos!");
            }
          } catch (err) {
            console.error("Erro inesperado:", err);
            $toast.error("Erro inesperado. Verifique sua conex\xE3o.");
          }
        }
      }
    );
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
        emit2("close-modal");
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
                    if (!unref(isForeign)) {
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
                              _push4(`<!---->`);
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
                              ]) : createCommentVNode("", true)
                            ];
                          }
                        }),
                        _: 1
                      }, _parent3, _scopeId2));
                    } else {
                      _push3(`<!---->`);
                    }
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
                    _push3(`<div class="mt-1"${_scopeId2}><img style="${ssrRenderStyle({ "width": "40px", "height": "40px", "cursor": "pointer" })}"${ssrRenderAttr("src", _imports_0$4)} alt="novo"${_scopeId2}></div>`);
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
                              label: "Cidade"
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
                              label: "Cidade"
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
                      !unref(isForeign) ? (openBlock(), createBlock(VCol, {
                        key: 0,
                        md: "2"
                      }, {
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
                          ]) : createCommentVNode("", true)
                        ]),
                        _: 1
                      })) : createCommentVNode("", true),
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
                          src: _imports_0$4,
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
                            label: "Cidade"
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
                          _push4(`<div title="Visualizar"${_scopeId3}><img style="${ssrRenderStyle({ "width": "30px", "height": "30px", "cursor": "pointer" })}"${ssrRenderAttr("src", _imports_1$1)} alt="Visualizar"${_scopeId3}></div><div title="Visualizar"${_scopeId3}>`);
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
                                src: _imports_1$1,
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
                              src: _imports_1$1,
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
                                                label: "Cidade"
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
                                                label: "Cidade"
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
                                              label: "Cidade"
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
                                            label: "Cidade"
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
                                          label: "Cidade"
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
                                        label: "Cidade"
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
                    !unref(isForeign) ? (openBlock(), createBlock(VCol, {
                      key: 0,
                      md: "2"
                    }, {
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
                        ]) : createCommentVNode("", true)
                      ]),
                      _: 1
                    })) : createCommentVNode("", true),
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
                        src: _imports_0$4,
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
                          label: "Cidade"
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
                            src: _imports_1$1,
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
                                      label: "Cidade"
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
const _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Endereco.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : undefined;
};
const _sfc_main$7 = {
  __name: "Digital",
  __ssrInlineRender: true,
  setup(__props) {
    const leftFingers = ref(["E1", "E2", "E3", "E4", "E5"]);
    var colorLeftFingers = ref(["red", "red", "red", "red", "red"]);
    const rightFingers = ref(["D1", "D2", "D3", "D4", "D5"]);
    var colorRightFingers = ref(["red", "red", "red", "red", "red"]);
    const route = useRoute$1();
    const { $toast } = useNuxtApp();
    const config = useRuntimeConfig();
    const { id } = route.params;
    const pessoa_id = ref(useCookie("pessoa-id").value).value;
    const enviarDigital = `${config.public.biometria}/capture-finger`;
    const enviarDigitalBanco = `${config.public.managemant}/createPessoaBiometria`;
    `${config.public.managemant}/getPessoaBiometriaById`;
    async function captureBiometria(finger) {
      const { status, data: captureData } = await useFetch(enviarDigital, {
        method: "GET"
      }, "$b5yqRnLFV9");
      if (status.value === "success") {
        const hash = captureData.value.hash;
        const bodyDigital = {
          user_id: useCookie("user-data").value.usuario_id,
          pessoa_id: Number(id) || pessoa_id,
          dedo: finger,
          hash
        };
        const { status: status2 } = await useFetch(enviarDigitalBanco, {
          method: "POST",
          body: bodyDigital
        }, "$cWP9jlCX2Z");
        if (status2.value === "success") {
          $toast.success("Biometria enviada com sucesso!");
          updateFingerColor(finger, "green");
        } else {
          $toast.error("Falha ao enviar a biometria.");
        }
      } else {
        $toast.error("Erro ao Capturar biometria para o sistema.");
      }
    }
    function updateFingerColor(finger, color) {
      const leftIndex = leftFingers.value.findIndex((f) => f === finger);
      if (leftIndex !== -1) {
        colorLeftFingers.value[leftIndex] = color;
      } else {
        const rightIndex = rightFingers.value.findIndex((f) => f === finger);
        if (rightIndex !== -1) {
          colorRightFingers.value[rightIndex] = color;
        }
      }
    }
    function getFingerStyle(finger, side) {
      const baseTopLeft = {
        E1: { top: 82, left: -10 },
        E2: { top: 35, left: 4 },
        E3: { top: 0, left: 30 },
        E4: { top: 15, left: 75 },
        E5: { top: 50, left: 170 },
        D1: { top: 50, left: 210 },
        D2: { top: 18, left: 300 },
        D3: { top: 5, left: 350 },
        D4: { top: 35, left: 375 },
        D5: { top: 80, left: 390 }
      };
      const position = baseTopLeft[finger];
      let color = "red";
      if (side === "left") {
        const leftIndex = leftFingers.value.indexOf(finger);
        if (leftIndex !== -1) {
          color = colorLeftFingers.value[leftIndex];
        }
      } else if (side === "right") {
        const rightIndex = rightFingers.value.indexOf(finger);
        if (rightIndex !== -1) {
          color = colorRightFingers.value[rightIndex];
        }
      }
      return {
        backgroundColor: color,
        top: `${position.top}px`,
        left: `${position.left}px`
      };
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(VCol, mergeProps({
        style: { "margin-top": "20px" },
        cols: "auto",
        class: "biometria-container"
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="finger-container" data-v-12f11fb7${_scopeId}><!--[-->`);
            ssrRenderList(unref(leftFingers), (finger, index) => {
              _push2(`<div class="finger" style="${ssrRenderStyle(getFingerStyle(finger, "left"))}" data-v-12f11fb7${_scopeId}></div>`);
            });
            _push2(`<!--]--><!--[-->`);
            ssrRenderList(unref(rightFingers), (finger, index) => {
              _push2(`<div class="finger" style="${ssrRenderStyle(getFingerStyle(finger, "right"))}" data-v-12f11fb7${_scopeId}></div>`);
            });
            _push2(`<!--]--></div>`);
          } else {
            return [
              createVNode("div", { class: "finger-container" }, [
                (openBlock(true), createBlock(Fragment, null, renderList(unref(leftFingers), (finger, index) => {
                  return openBlock(), createBlock("div", {
                    key: index,
                    class: "finger",
                    style: getFingerStyle(finger, "left"),
                    onClick: ($event) => captureBiometria(finger)
                  }, null, 12, ["onClick"]);
                }), 128)),
                (openBlock(true), createBlock(Fragment, null, renderList(unref(rightFingers), (finger, index) => {
                  return openBlock(), createBlock("div", {
                    key: index,
                    class: "finger",
                    style: getFingerStyle(finger, "right"),
                    onClick: ($event) => captureBiometria(finger)
                  }, null, 12, ["onClick"]);
                }), 128))
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Biometria/Digital.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : undefined;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["__scopeId", "data-v-12f11fb7"]]);
const _sfc_main$6 = {
  __name: "TiffViewer",
  __ssrInlineRender: true,
  props: {
    tiffUrl: String,
    isModal: {
      type: Boolean,
      default: false
    },
    zoomLevel: {
      type: Number,
      default: 1
    },
    rotationDegree: {
      type: Number,
      default: 0
    },
    translateX: { type: Number, default: 0 }
  },
  emits: ["error"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const tiffCanvas = ref(null);
    const tiffError = ref(false);
    const loading = ref(false);
    const emit2 = __emit;
    const canvasStyle = computed(() => ({
      width: props.isModal ? "100%" : `${250 * props.zoomLevel}px`,
      height: props.isModal ? "100%" : `${250 * props.zoomLevel}px`,
      transform: `scale(${props.zoomLevel}) rotate(${props.rotationDegree}deg)  translateX(${props.translateX}px)`,
      objectFit: "contain",
      transformOrigin: "left"
    }));
    const renderTiff = async () => {
      if (!props.tiffUrl) return;
      loading.value = true;
      try {
        const response = await fetch(props.tiffUrl);
        const buffer = await response.arrayBuffer();
        const ifds = UTIF.decode(buffer);
        UTIF.decodeImage(buffer, ifds[0]);
        const rgba = UTIF.toRGBA8(ifds[0]);
        if (tiffCanvas.value) {
          const canvas = tiffCanvas.value;
          const ctx = canvas.getContext("2d");
          canvas.width = ifds[0].width;
          canvas.height = ifds[0].height;
          const imageData = new ImageData(
            new Uint8ClampedArray(rgba),
            ifds[0].width,
            ifds[0].height
          );
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.save();
          ctx.translate(canvas.width / 2, canvas.height / 2);
          ctx.rotate(props.rotationDegree * Math.PI / 180);
          ctx.drawImage(canvas, -canvas.width / 2, -canvas.height / 2);
          ctx.restore();
          ctx.putImageData(imageData, 0, 0);
        }
        loading.value = false;
      } catch (error) {
        loading.value = false;
        tiffError.value = true;
        emit2("error");
        console.error("Erro ao carregar TIFF:", error);
      }
    };
    watch(() => [props.tiffUrl, props.rotationDegree], renderTiff, {
      immediate: true
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      if (unref(loading)) {
        _push(ssrRenderComponent(VProgressCircular, {
          style: { "margin-left": "200px" },
          class: "loading-spinner",
          indeterminate: "",
          size: "64"
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (!unref(tiffError)) {
        _push(`<canvas style="${ssrRenderStyle(unref(canvasStyle))}"></canvas>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/TiffViewer.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : undefined;
};
const _imports_0$2 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAADsQAAA7EB9YPtSQAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAlmSURBVHic7Z1rjF1VFcd/zLSlUqYzLfJohxlKIBJTFAmmMcpjLNUAAY0JBIMxtISPimKCWm2V1wc/QpRHFCEYjSmvKtgXA8jDWkWKtFFMEGKlkKD2QaudaTvtjB/WvWFyufesfR57n33OXb9kfbkn9+z/3nudffZj7X3AMAzDMAzDMAzDMAzDMAzDMIw6c0zZAnIwH/g8cCHwceBE4ARghud0jwC7gf8ALwHPAY8DezynazQ4E3gAGAOmIrEx4H7gDI/57npmAKuBccqv8CRHWI3/Vqjr6AOeoPwKdrUngQEvJdGFzAVeofxKTWt/bmg3cjAD2ET5lZnVNmKvg1x8m/IrMa99s/BS6RJOBw5QfgXmtQPAomKLpju4C7cCfgm4FhgCegPo6gWGG2luddT4owC6asVcYD/JhToJfAfoKUkjjbRXNbQkad2PdQhTsRz9qVpVlrg2fA9d74rS1FWQdSQX5jbCNPeu9ALbSda8vjR1FWMecIjkwry+NHWduZ5kzYeR9QtD4TqqWZAD6I5rrwEHNpBciOvKk6ayHnsN5MKl+V9eljgHVlCx1itrPEA/cClwBfAxYLDxm28mgFOId+19PvAOMNNzOhPAv4G3gNeRhbINyHDTK8PIWrz2lPqyKjSh2mvAlx0Efgqc6iNTvcDtlL8WX4VOlNaJ9W1jwC0UOEyOZS0+uvdnB1xGAyFsIwXEJAwAf4kgM1PIO64qaCOZULadHFPQvYgXlZ2Jpl2ZNSMlcBXll1fT1pHxdXB7BOKbtp5qRTD3ENfDc3PaDAxTfofvKDLE+T4wO20GImA2UvCvI3kpsyzHkKG6Mw843nj6Wrzvsa/xHjNJH5Nwn+vN+9F7sUeBb1GtZrmu9AAr0VuZg8iITuWLyo2mkMo34mIler1d5XKjXyg32Yo9+THSA7xMct39rPVP7UKWz1USurNxs6rQB5yP5OujyLtzGDgOmeeYQAI39yL7/f4GvIb0bzYjHagqMAn8ENmi1olzXG6kxeIN55IZhkHgRuAFpIKz9p4PIZs/vwacFDQH2VhEcn72utxE60zEvNFhGTJt7WPYdRj4NdKaxMpM9M67ilYQMbIU2ELxld7JnkW2pcdI7vqrkgMsQDo2oSq+1R4CTvaQryHgEeR1vB9YC5zl+N+ucYBrgHcpr/Kbtgf4QoH5GkIOoGiXzpDD/2vvAMciPd2yK366TSKjo1kF5O+RhHQecvh/rR3gBKRnX3aFd7IngeNz5jFpFLbP4f+p6q/dhI5WyWVNAp0MjAIfyfDfw0gncRQZ5+9o2CHee2oXAIuBs4ElSMcyyxP9J+AyYFeG/4I4QKcp233oQR656y/GFmA+8FcHba32PDL9meWpnIcstoxmSPfFjGmCdPg63XeNw/9r9wqYjVRkmgpYi5wcVhSfIP36/iaytSBnIR2+1vvtwi3gs3YO8GMHTU17E/icRy3LgJ0p9NyRMZ0hpMO3r2FrcI/2rZUDfNlBz/Tm0Wm5MyfzgYcdNU1S7BDRhdo4wEJk7tqloH9A+M7pzY7a9uBnsqgTtXGAxxy0TAFfDaiplZsSdE23BwNqqoUDXOSgo/nkl81q3F4FoRaRauEAf3DQsYY4AlOOQc4K1vQ+E0hP5R1gxEHDm4Tp8LkyALyBrvtTAbRU3gFcniafQ72sXI6ue20AHZV2gFPQI3hCFGJWtFnDw8AHPWuotAN8wyH9Imf4iuYcdP1f8ayh0g7wrJL2857TLwJttfJpz+lX1gH6kSYyKe0qbBBdTnIexoEPeEy/sg7wWSXdQ+Rfaw/BHPQzji/2mH6q+ivzmNVWlijXtwD/CyEkJweQmIAkzgshxIWYHGCxcv2pICqK4ffKddcAT+/E5ACnK9dfDaKiGLYo180B2qDtX98RQkRB7FSuLwiiwoGYHECLddsRQkRB7FauR3N0fEwOMEe5Ph5ERTFoDhDNOkZMDjCpXK/SCSTaHrxoyj0aIcg4P4ljg6goBq2Jj2bLeUwOoMXRnxhERTFoWt8NosKBmBzgX8p1bZ4gJj6kXH8riAoHYnKAvyvXzw6iohg0rf8MosKBmBxAm+jRpopjYkS5vj2EiKzEvBg0z2P6RTEH/dP2n/GYfmVXA/uAI0ra13pMvyi+RLmrmpV1AND3AI56Tr8ItLCw5zynX2kHuNEh/ZgPaToX/SuiN3jWUGkHGEQPCt3oWUMetA9rHEECX31SaQcAOYpN07AsgI60uISFPxZAR+UdYKmDhp3E9fmYAWS1UtM9EkBL5R0A3M4BejSQFhceRdf7u0BaauEAFznomCLDlzA8cCtuWi8IpKcWDgByQoZLwd4UUFMrNyTomm6/DKipNg6wkPZn5bSz1YTfKXyLo7a9hA0Bq40DgJwG6lLIU8im0tzfyXNgALd3ftOcPtJQILVyAIB7HDQ17Q1kOOaLy4F/pNBzt0ctnaidA8wi/TFxozh+HMGR80j/9dSnKSeMrXYOANLsvuKgrdVeQPbqaQGn7TgOWdjJclDkVsK8jtqRqv6qdlTsJrI92WPIdq3NwB+RE0Z2N+woshJ5ErJhYzEyYfNJsm3i3Ibs/dMig32Ru/5ibAGaDBD3YdHPILucy6SWr4DpzALupfzKbrW7iCNyufYO0OQa3OcJfNou4GrPeU1D1zgAyGSR64yhD1tD2FNAXegqB2gygnTwQlX8ZsIc+ZaFrnSAJkuBX5HvW4GdbAKJVYj1a2FNutoBmiwEvg78lvwfjnwK+XBkbE19J1LVX5XmAbJyPPLBhyXAh4EzkbCs/ob1IAs2+4G3kenkV5GvfrxINY6lmU6q+usGB+g2UtVfu51Bddqm3W1odTPR+kM7B9CavGiONzHeh3bMzjutP7RzAO18m087yzFCs1S5/rbLTX5Oci9yK3FtKjWEHvQVU6cvl1yt3GQKWFmsdqMAVqHXm9NRu3OBg8qNjiJOYC1B+fQA30XfkjZOisOpXD/O/DKwAjgNGx2EZCawCLgO90CZn7S7Uacx/SDwGhIVY1SfceTYmvcdTdPb4Q//RdbdR/xpMgJyG/CbtH/qIX0gpFl8toHOD7pKP3KeTdmZMMtm2yjgWNo+3LZsm8Vl6ykwPrEX2YipHX5kVr4dQLbKeRmiDwL3oc8TmIW3cWSot7Bj7bUh69JuH3AJcAWyvj6EBEzYXEA49iLrNtuQfZEbqV7sgmEYhmEYhmEYhmEYhmEYhmEYnvk/IOetxTmdx/8AAAAASUVORK5CYII=";
const VSliderSymbol = Symbol.for("vuetify:v-slider");
function getOffset(e, el, direction) {
  const vertical = direction === "vertical";
  const rect = el.getBoundingClientRect();
  const touch = "touches" in e ? e.touches[0] : e;
  return vertical ? touch.clientY - (rect.top + rect.height / 2) : touch.clientX - (rect.left + rect.width / 2);
}
function getPosition(e, position) {
  if ("touches" in e && e.touches.length) return e.touches[0][position];
  else if ("changedTouches" in e && e.changedTouches.length) return e.changedTouches[0][position];
  else return e[position];
}
const makeSliderProps = propsFactory({
  disabled: {
    type: Boolean,
    default: null
  },
  error: Boolean,
  readonly: {
    type: Boolean,
    default: null
  },
  max: {
    type: [Number, String],
    default: 100
  },
  min: {
    type: [Number, String],
    default: 0
  },
  step: {
    type: [Number, String],
    default: 0
  },
  thumbColor: String,
  thumbLabel: {
    type: [Boolean, String],
    default: undefined,
    validator: (v) => typeof v === "boolean" || v === "always"
  },
  thumbSize: {
    type: [Number, String],
    default: 20
  },
  showTicks: {
    type: [Boolean, String],
    default: false,
    validator: (v) => typeof v === "boolean" || v === "always"
  },
  ticks: {
    type: [Array, Object]
  },
  tickSize: {
    type: [Number, String],
    default: 2
  },
  color: String,
  trackColor: String,
  trackFillColor: String,
  trackSize: {
    type: [Number, String],
    default: 4
  },
  direction: {
    type: String,
    default: "horizontal",
    validator: (v) => ["vertical", "horizontal"].includes(v)
  },
  reverse: Boolean,
  ...makeRoundedProps(),
  ...makeElevationProps({
    elevation: 2
  }),
  ripple: {
    type: Boolean,
    default: true
  }
}, "Slider");
const useSteps = (props) => {
  const min = computed(() => parseFloat(props.min));
  const max = computed(() => parseFloat(props.max));
  const step = computed(() => +props.step > 0 ? parseFloat(props.step) : 0);
  const decimals = computed(() => Math.max(getDecimals(step.value), getDecimals(min.value)));
  function roundValue(value) {
    value = parseFloat(value);
    if (step.value <= 0) return value;
    const clamped = clamp(value, min.value, max.value);
    const offset = min.value % step.value;
    const newValue = Math.round((clamped - offset) / step.value) * step.value + offset;
    return parseFloat(Math.min(newValue, max.value).toFixed(decimals.value));
  }
  return {
    min,
    max,
    step,
    decimals,
    roundValue
  };
};
const useSlider = (_ref) => {
  let {
    props,
    steps,
    onSliderStart,
    onSliderMove,
    onSliderEnd,
    getActiveThumb
  } = _ref;
  const {
    isRtl
  } = useRtl();
  const isReversed = toRef(props, "reverse");
  const vertical = computed(() => props.direction === "vertical");
  const indexFromEnd = computed(() => vertical.value !== isReversed.value);
  const {
    min,
    max,
    step,
    decimals,
    roundValue
  } = steps;
  const thumbSize = computed(() => parseInt(props.thumbSize, 10));
  const tickSize = computed(() => parseInt(props.tickSize, 10));
  const trackSize = computed(() => parseInt(props.trackSize, 10));
  const numTicks = computed(() => (max.value - min.value) / step.value);
  const disabled = toRef(props, "disabled");
  const thumbColor = computed(() => {
    var _a;
    return props.error || props.disabled ? undefined : (_a = props.thumbColor) != null ? _a : props.color;
  });
  const trackColor = computed(() => {
    var _a;
    return props.error || props.disabled ? undefined : (_a = props.trackColor) != null ? _a : props.color;
  });
  const trackFillColor = computed(() => {
    var _a;
    return props.error || props.disabled ? undefined : (_a = props.trackFillColor) != null ? _a : props.color;
  });
  const mousePressed = shallowRef(false);
  const startOffset = shallowRef(0);
  const trackContainerRef = ref();
  const activeThumbRef = ref();
  function parseMouseMove(e) {
    var _a;
    const vertical2 = props.direction === "vertical";
    const start = vertical2 ? "top" : "left";
    const length = vertical2 ? "height" : "width";
    const position2 = vertical2 ? "clientY" : "clientX";
    const {
      [start]: trackStart,
      [length]: trackLength
    } = (_a = trackContainerRef.value) == null ? undefined : _a.$el.getBoundingClientRect();
    const clickOffset = getPosition(e, position2);
    let clickPos = Math.min(Math.max((clickOffset - trackStart - startOffset.value) / trackLength, 0), 1) || 0;
    if (vertical2 ? indexFromEnd.value : indexFromEnd.value !== isRtl.value) clickPos = 1 - clickPos;
    return roundValue(min.value + clickPos * (max.value - min.value));
  }
  const handleStop = (e) => {
    onSliderEnd({
      value: parseMouseMove(e)
    });
    mousePressed.value = false;
    startOffset.value = 0;
  };
  const handleStart = (e) => {
    activeThumbRef.value = getActiveThumb(e);
    if (!activeThumbRef.value) return;
    activeThumbRef.value.focus();
    mousePressed.value = true;
    if (activeThumbRef.value.contains(e.target)) {
      startOffset.value = getOffset(e, activeThumbRef.value, props.direction);
    } else {
      startOffset.value = 0;
      onSliderMove({
        value: parseMouseMove(e)
      });
    }
    onSliderStart({
      value: parseMouseMove(e)
    });
  };
  const moveListenerOptions = {
    passive: true,
    capture: true
  };
  function onMouseMove(e) {
    onSliderMove({
      value: parseMouseMove(e)
    });
  }
  function onSliderMouseUp(e) {
    e.stopPropagation();
    e.preventDefault();
    handleStop(e);
    (undefined).removeEventListener("mousemove", onMouseMove, moveListenerOptions);
    (undefined).removeEventListener("mouseup", onSliderMouseUp);
  }
  function onSliderTouchend(e) {
    var _a;
    handleStop(e);
    (undefined).removeEventListener("touchmove", onMouseMove, moveListenerOptions);
    (_a = e.target) == null ? undefined : _a.removeEventListener("touchend", onSliderTouchend);
  }
  function onSliderTouchstart(e) {
    var _a;
    handleStart(e);
    (undefined).addEventListener("touchmove", onMouseMove, moveListenerOptions);
    (_a = e.target) == null ? undefined : _a.addEventListener("touchend", onSliderTouchend, {
      passive: false
    });
  }
  function onSliderMousedown(e) {
    e.preventDefault();
    handleStart(e);
    (undefined).addEventListener("mousemove", onMouseMove, moveListenerOptions);
    (undefined).addEventListener("mouseup", onSliderMouseUp, {
      passive: false
    });
  }
  const position = (val) => {
    const percentage = (val - min.value) / (max.value - min.value) * 100;
    return clamp(isNaN(percentage) ? 0 : percentage, 0, 100);
  };
  const showTicks = toRef(props, "showTicks");
  const parsedTicks = computed(() => {
    if (!showTicks.value) return [];
    if (!props.ticks) {
      return numTicks.value !== Infinity ? createRange(numTicks.value + 1).map((t) => {
        const value = min.value + t * step.value;
        return {
          value,
          position: position(value)
        };
      }) : [];
    }
    if (Array.isArray(props.ticks)) return props.ticks.map((t) => ({
      value: t,
      position: position(t),
      label: t.toString()
    }));
    return Object.keys(props.ticks).map((key) => ({
      value: parseFloat(key),
      position: position(parseFloat(key)),
      label: props.ticks[key]
    }));
  });
  const hasLabels = computed(() => parsedTicks.value.some((_ref2) => {
    let {
      label
    } = _ref2;
    return !!label;
  }));
  const data = {
    activeThumbRef,
    color: toRef(props, "color"),
    decimals,
    disabled,
    direction: toRef(props, "direction"),
    elevation: toRef(props, "elevation"),
    hasLabels,
    isReversed,
    indexFromEnd,
    min,
    max,
    mousePressed,
    numTicks,
    onSliderMousedown,
    onSliderTouchstart,
    parsedTicks,
    parseMouseMove,
    position,
    readonly: toRef(props, "readonly"),
    rounded: toRef(props, "rounded"),
    roundValue,
    showTicks,
    startOffset,
    step,
    thumbSize,
    thumbColor,
    thumbLabel: toRef(props, "thumbLabel"),
    ticks: toRef(props, "ticks"),
    tickSize,
    trackColor,
    trackContainerRef,
    trackFillColor,
    trackSize,
    vertical
  };
  provide(VSliderSymbol, data);
  return data;
};
const makeVSliderThumbProps = propsFactory({
  focused: Boolean,
  max: {
    type: Number,
    required: true
  },
  min: {
    type: Number,
    required: true
  },
  modelValue: {
    type: Number,
    required: true
  },
  position: {
    type: Number,
    required: true
  },
  ripple: {
    type: [Boolean, Object],
    default: true
  },
  name: String,
  ...makeComponentProps()
}, "VSliderThumb");
const VSliderThumb = genericComponent()({
  name: "VSliderThumb",
  directives: {
    Ripple
  },
  props: makeVSliderThumbProps(),
  emits: {
    "update:modelValue": (v) => true
  },
  setup(props, _ref) {
    let {
      slots,
      emit: emit2
    } = _ref;
    const slider = inject(VSliderSymbol);
    const {
      isRtl,
      rtlClasses
    } = useRtl();
    if (!slider) throw new Error("[Vuetify] v-slider-thumb must be used inside v-slider or v-range-slider");
    const {
      thumbColor,
      step,
      disabled,
      thumbSize,
      thumbLabel,
      direction,
      isReversed,
      vertical,
      readonly,
      elevation,
      mousePressed,
      decimals,
      indexFromEnd
    } = slider;
    const elevationProps = computed(() => !disabled.value ? elevation.value : undefined);
    const {
      elevationClasses
    } = useElevation(elevationProps);
    const {
      textColorClasses,
      textColorStyles
    } = useTextColor(thumbColor);
    const {
      pageup,
      pagedown,
      end,
      home,
      left,
      right,
      down,
      up
    } = keyValues;
    const relevantKeys = [pageup, pagedown, end, home, left, right, down, up];
    const multipliers = computed(() => {
      if (step.value) return [1, 2, 3];
      else return [1, 5, 10];
    });
    function parseKeydown(e, value) {
      if (!relevantKeys.includes(e.key)) return;
      e.preventDefault();
      const _step = step.value || 0.1;
      const steps = (props.max - props.min) / _step;
      if ([left, right, down, up].includes(e.key)) {
        const increase = vertical.value ? [isRtl.value ? left : right, isReversed.value ? down : up] : indexFromEnd.value !== isRtl.value ? [left, up] : [right, up];
        const direction2 = increase.includes(e.key) ? 1 : -1;
        const multiplier = e.shiftKey ? 2 : e.ctrlKey ? 1 : 0;
        value = value + direction2 * _step * multipliers.value[multiplier];
      } else if (e.key === home) {
        value = props.min;
      } else if (e.key === end) {
        value = props.max;
      } else {
        const direction2 = e.key === pagedown ? 1 : -1;
        value = value - direction2 * _step * (steps > 100 ? steps / 10 : 10);
      }
      return Math.max(props.min, Math.min(props.max, value));
    }
    function onKeydown(e) {
      const newValue = parseKeydown(e, props.modelValue);
      newValue != null && emit2("update:modelValue", newValue);
    }
    useRender(() => {
      const positionPercentage = convertToUnit(indexFromEnd.value ? 100 - props.position : props.position, "%");
      return createVNode("div", {
        "class": ["v-slider-thumb", {
          "v-slider-thumb--focused": props.focused,
          "v-slider-thumb--pressed": props.focused && mousePressed.value
        }, props.class, rtlClasses.value],
        "style": [{
          "--v-slider-thumb-position": positionPercentage,
          "--v-slider-thumb-size": convertToUnit(thumbSize.value)
        }, props.style],
        "role": "slider",
        "tabindex": disabled.value ? -1 : 0,
        "aria-label": props.name,
        "aria-valuemin": props.min,
        "aria-valuemax": props.max,
        "aria-valuenow": props.modelValue,
        "aria-readonly": !!readonly.value,
        "aria-orientation": direction.value,
        "onKeydown": !readonly.value ? onKeydown : undefined
      }, [createVNode("div", {
        "class": ["v-slider-thumb__surface", textColorClasses.value, elevationClasses.value],
        "style": {
          ...textColorStyles.value
        }
      }, null), withDirectives(createVNode("div", {
        "class": ["v-slider-thumb__ripple", textColorClasses.value],
        "style": textColorStyles.value
      }, null), [[resolveDirective("ripple"), props.ripple, null, {
        circle: true,
        center: true
      }]]), createVNode(VScaleTransition, {
        "origin": "bottom center"
      }, {
        default: () => {
          var _a2;
          var _a;
          return [withDirectives(createVNode("div", {
            "class": "v-slider-thumb__label-container"
          }, [createVNode("div", {
            "class": ["v-slider-thumb__label"]
          }, [createVNode("div", null, [(_a2 = (_a = slots["thumb-label"]) == null ? undefined : _a.call(slots, {
            modelValue: props.modelValue
          })) != null ? _a2 : props.modelValue.toFixed(step.value ? decimals.value : 1)])])]), [[vShow, thumbLabel.value && props.focused || thumbLabel.value === "always"]])];
        }
      })]);
    });
    return {};
  }
});
const makeVSliderTrackProps = propsFactory({
  start: {
    type: Number,
    required: true
  },
  stop: {
    type: Number,
    required: true
  },
  ...makeComponentProps()
}, "VSliderTrack");
const VSliderTrack = genericComponent()({
  name: "VSliderTrack",
  props: makeVSliderTrackProps(),
  emits: {},
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const slider = inject(VSliderSymbol);
    if (!slider) throw new Error("[Vuetify] v-slider-track must be inside v-slider or v-range-slider");
    const {
      color,
      parsedTicks,
      rounded,
      showTicks,
      tickSize,
      trackColor,
      trackFillColor,
      trackSize,
      vertical,
      min,
      max,
      indexFromEnd
    } = slider;
    const {
      roundedClasses
    } = useRounded(rounded);
    const {
      backgroundColorClasses: trackFillColorClasses,
      backgroundColorStyles: trackFillColorStyles
    } = useBackgroundColor(trackFillColor);
    const {
      backgroundColorClasses: trackColorClasses,
      backgroundColorStyles: trackColorStyles
    } = useBackgroundColor(trackColor);
    const startDir = computed(() => `inset-${vertical.value ? "block" : "inline"}-${indexFromEnd.value ? "end" : "start"}`);
    const endDir = computed(() => vertical.value ? "height" : "width");
    const backgroundStyles = computed(() => {
      return {
        [startDir.value]: "0%",
        [endDir.value]: "100%"
      };
    });
    const trackFillWidth = computed(() => props.stop - props.start);
    const trackFillStyles = computed(() => {
      return {
        [startDir.value]: convertToUnit(props.start, "%"),
        [endDir.value]: convertToUnit(trackFillWidth.value, "%")
      };
    });
    const computedTicks = computed(() => {
      if (!showTicks.value) return [];
      const ticks = vertical.value ? parsedTicks.value.slice().reverse() : parsedTicks.value;
      return ticks.map((tick, index) => {
        var _a2;
        var _a;
        const directionValue = tick.value !== min.value && tick.value !== max.value ? convertToUnit(tick.position, "%") : undefined;
        return createVNode("div", {
          "key": tick.value,
          "class": ["v-slider-track__tick", {
            "v-slider-track__tick--filled": tick.position >= props.start && tick.position <= props.stop,
            "v-slider-track__tick--first": tick.value === min.value,
            "v-slider-track__tick--last": tick.value === max.value
          }],
          "style": {
            [startDir.value]: directionValue
          }
        }, [(tick.label || slots["tick-label"]) && createVNode("div", {
          "class": "v-slider-track__tick-label"
        }, [(_a2 = (_a = slots["tick-label"]) == null ? undefined : _a.call(slots, {
          tick,
          index
        })) != null ? _a2 : tick.label])]);
      });
    });
    useRender(() => {
      return createVNode("div", {
        "class": ["v-slider-track", roundedClasses.value, props.class],
        "style": [{
          "--v-slider-track-size": convertToUnit(trackSize.value),
          "--v-slider-tick-size": convertToUnit(tickSize.value)
        }, props.style]
      }, [createVNode("div", {
        "class": ["v-slider-track__background", trackColorClasses.value, {
          "v-slider-track__background--opacity": !!color.value || !trackFillColor.value
        }],
        "style": {
          ...backgroundStyles.value,
          ...trackColorStyles.value
        }
      }, null), createVNode("div", {
        "class": ["v-slider-track__fill", trackFillColorClasses.value],
        "style": {
          ...trackFillStyles.value,
          ...trackFillColorStyles.value
        }
      }, null), showTicks.value && createVNode("div", {
        "class": ["v-slider-track__ticks", {
          "v-slider-track__ticks--always-show": showTicks.value === "always"
        }]
      }, [computedTicks.value])]);
    });
    return {};
  }
});
const makeVSliderProps = propsFactory({
  ...makeFocusProps(),
  ...makeSliderProps(),
  ...makeVInputProps(),
  modelValue: {
    type: [Number, String],
    default: 0
  }
}, "VSlider");
const VSlider = genericComponent()({
  name: "VSlider",
  props: makeVSliderProps(),
  emits: {
    "update:focused": (value) => true,
    "update:modelValue": (v) => true,
    start: (value) => true,
    end: (value) => true
  },
  setup(props, _ref) {
    let {
      slots,
      emit: emit2
    } = _ref;
    const thumbContainerRef = ref();
    const {
      rtlClasses
    } = useRtl();
    const steps = useSteps(props);
    const model = useProxiedModel(props, "modelValue", undefined, (value) => {
      return steps.roundValue(value == null ? steps.min.value : value);
    });
    const {
      min,
      max,
      mousePressed,
      roundValue,
      onSliderMousedown,
      onSliderTouchstart,
      trackContainerRef,
      position,
      hasLabels,
      readonly
    } = useSlider({
      props,
      steps,
      onSliderStart: () => {
        emit2("start", model.value);
      },
      onSliderEnd: (_ref2) => {
        let {
          value
        } = _ref2;
        const roundedValue = roundValue(value);
        model.value = roundedValue;
        emit2("end", roundedValue);
      },
      onSliderMove: (_ref3) => {
        let {
          value
        } = _ref3;
        return model.value = roundValue(value);
      },
      getActiveThumb: () => {
        var _a;
        return (_a = thumbContainerRef.value) == null ? undefined : _a.$el;
      }
    });
    const {
      isFocused,
      focus,
      blur
    } = useFocus(props);
    const trackStop = computed(() => position(model.value));
    useRender(() => {
      const inputProps = VInput.filterProps(props);
      const hasPrepend = !!(props.label || slots.label || slots.prepend);
      return createVNode(VInput, mergeProps({
        "class": ["v-slider", {
          "v-slider--has-labels": !!slots["tick-label"] || hasLabels.value,
          "v-slider--focused": isFocused.value,
          "v-slider--pressed": mousePressed.value,
          "v-slider--disabled": props.disabled
        }, rtlClasses.value, props.class],
        "style": props.style
      }, inputProps, {
        "focused": isFocused.value
      }), {
        ...slots,
        prepend: hasPrepend ? (slotProps) => {
          var _a2;
          var _a, _b;
          return createVNode(Fragment, null, [(_a2 = (_a = slots.label) == null ? undefined : _a.call(slots, slotProps)) != null ? _a2 : props.label ? createVNode(VLabel, {
            "id": slotProps.id.value,
            "class": "v-slider__label",
            "text": props.label
          }, null) : undefined, (_b = slots.prepend) == null ? undefined : _b.call(slots, slotProps)]);
        } : undefined,
        default: (_ref4) => {
          let {
            id,
            messagesId
          } = _ref4;
          return createVNode("div", {
            "class": "v-slider__container",
            "onMousedown": !readonly.value ? onSliderMousedown : undefined,
            "onTouchstartPassive": !readonly.value ? onSliderTouchstart : undefined
          }, [createVNode("input", {
            "id": id.value,
            "name": props.name || id.value,
            "disabled": !!props.disabled,
            "readonly": !!props.readonly,
            "tabindex": "-1",
            "value": model.value
          }, null), createVNode(VSliderTrack, {
            "ref": trackContainerRef,
            "start": 0,
            "stop": trackStop.value
          }, {
            "tick-label": slots["tick-label"]
          }), createVNode(VSliderThumb, {
            "ref": thumbContainerRef,
            "aria-describedby": messagesId.value,
            "focused": isFocused.value,
            "min": min.value,
            "max": max.value,
            "modelValue": model.value,
            "onUpdate:modelValue": (v) => model.value = v,
            "position": trackStop.value,
            "elevation": props.elevation,
            "onFocus": focus,
            "onBlur": blur,
            "ripple": props.ripple,
            "name": props.name
          }, {
            "thumb-label": slots["thumb-label"]
          })]);
        }
      });
    });
    return {};
  }
});
const _sfc_main$5 = {
  __name: "ReconhecimentoFacial",
  __ssrInlineRender: true,
  setup(__props) {
    const video = ref(null);
    const devices = ref([]);
    const selectedDeviceId = ref("");
    const isDialogActiveBiometria = ref(false);
    const fotoRender = ref(null);
    const tiffRender = ref(null);
    const route = useRoute$1();
    const { id } = route.params;
    const zoomLevel = ref(1);
    const tokenCookie = useCookie("pessoa_token");
    const token = tokenCookie.value;
    const pessoaNome = useCookie("user-data").value;
    const nomePessoa = pessoaNome.nome;
    const config = useRuntimeConfig();
    const enviarFoto = `${config.public.managemant}/upload`;
    const buscarPessoa = `${config.public.managemant}/getLinkTipo`;
    const baixarDocumento = `${config.public.managemant}/download`;
    const { $toast } = useNuxtApp();
    const hasTiff = computed(() => !!tiffRender.value);
    const hasFoto = computed(() => !!fotoRender.value);
    const tiffError = ref(false);
    const updateDevices = async () => {
      const mediaDevices = await (undefined).mediaDevices.enumerateDevices();
      devices.value = mediaDevices.filter((device) => device.kind === "videoinput").map((device) => ({
        deviceId: device.deviceId,
        label: device.label || `Camera ${devices.value.length + 1}`
      }));
    };
    const openDialog = async () => {
      isDialogActiveBiometria.value = true;
      try {
        await (void 0).mediaDevices.getUserMedia({ video: true });
        await updateDevices();
      } catch (error) {
        console.error("Erro ao acessar dispositivos de m\xEDdia:", error);
      }
    };
    const closeDialog = () => {
      isDialogActiveBiometria.value = false;
      const stream = video.value.srcObject;
      if (stream) {
        const tracks = stream.getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
    const startVideo = async () => {
      if (selectedDeviceId.value) {
        const stream = await (undefined).mediaDevices.getUserMedia({
          video: { deviceId: { exact: selectedDeviceId.value } }
        });
        video.value.srcObject = stream;
      }
    };
    const handleCapture = async () => {
      const canvas = (undefined).createElement("canvas");
      const context = canvas.getContext("2d");
      const width = video.value.videoWidth;
      const height = video.value.videoHeight;
      const scaledWidth = width * zoomLevel.value;
      const scaledHeight = height * zoomLevel.value;
      const offsetX = (width - scaledWidth) / 2;
      const offsetY = (height - scaledHeight) / 2;
      canvas.width = width;
      canvas.height = height;
      context.drawImage(video.value, offsetX, offsetY, scaledWidth, scaledHeight);
      canvas.toBlob(async (blob) => {
        const formData = new FormData();
        formData.append("file", blob, `${nomePessoa}.jpg`);
        formData.append(
          "cartorio_token",
          useCookie("user-data").value.cartorio_token
        );
        formData.append("token", token);
        formData.append("tipo", "foto");
        const { status } = await useFetch(enviarFoto, {
          method: "POST",
          body: formData
        }, "$fRRPU47ULS");
        if (status.value === "success") {
          $toast.success("Imagem enviada!");
          const photoUrl = URL.createObjectURL(blob);
          fotoRender.value = photoUrl;
          closeDialog();
        } else {
          $toast.error("Erro ao enviar imagem para o sistema.");
        }
      }, "image/jpeg");
    };
    const processarImagem = async (id2) => {
      var _a;
      if (!id2) return;
      const { data: imagemBiometria } = await useFetch(buscarPessoa, {
        method: "POST",
        body: { tipo: "foto", id: id2 }
      }, "$N16ZtKMkSh");
      if (!((_a = imagemBiometria.value) == null ? undefined : _a.link)) return;
      const { data: link } = await useFetch(baixarDocumento, {
        method: "POST",
        body: { bucket: useCookie("user-data").value.cartorio_token, path: imagemBiometria.value.link }
      }, "$mC9TAMOeqI");
      const linkMinio = imagemBiometria.value.link;
      const linkPayload = link.value;
      if (/\.(tr7|tiff)$/i.test(linkMinio)) {
        tiffRender.value = linkPayload;
        tiffError.value = false;
      } else {
        fotoRender.value = linkPayload;
      }
    };
    if (id) {
      processarImagem(id);
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_TiffViewer = _sfc_main$6;
      _push(ssrRenderComponent(VCol, mergeProps({ cols: "auto" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VDialog, {
              "max-width": "700",
              modelValue: unref(isDialogActiveBiometria),
              "onUpdate:modelValue": ($event) => isRef(isDialogActiveBiometria) ? isDialogActiveBiometria.value = $event : null
            }, {
              activator: withCtx(({ props: activatorProps }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VBtn, mergeProps(activatorProps, {
                    variant: "outlined",
                    style: { "width": "300px", "height": "300px" },
                    onClick: openDialog
                  }), {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        if (unref(hasTiff) && !unref(tiffError)) {
                          _push4(ssrRenderComponent(_component_TiffViewer, {
                            "tiff-url": unref(tiffRender),
                            onError: ($event) => tiffError.value = true
                          }, null, _parent4, _scopeId3));
                        } else if (unref(hasFoto)) {
                          _push4(`<img${ssrRenderAttr("src", unref(fotoRender))} style="${ssrRenderStyle({ "width": "100%", "height": "100%", "object-fit": "cover" })}"${_scopeId3}>`);
                        } else {
                          _push4(`<img${ssrRenderAttr("src", _imports_0$2)}${_scopeId3}>`);
                        }
                      } else {
                        return [
                          unref(hasTiff) && !unref(tiffError) ? (openBlock(), createBlock(_component_TiffViewer, {
                            key: 0,
                            "tiff-url": unref(tiffRender),
                            onError: ($event) => tiffError.value = true
                          }, null, 8, ["tiff-url", "onError"])) : unref(hasFoto) ? (openBlock(), createBlock("img", {
                            key: 1,
                            src: unref(fotoRender),
                            style: { "width": "100%", "height": "100%", "object-fit": "cover" }
                          }, null, 8, ["src"])) : (openBlock(), createBlock("img", {
                            key: 2,
                            src: _imports_0$2
                          }))
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VBtn, mergeProps(activatorProps, {
                      variant: "outlined",
                      style: { "width": "300px", "height": "300px" },
                      onClick: openDialog
                    }), {
                      default: withCtx(() => [
                        unref(hasTiff) && !unref(tiffError) ? (openBlock(), createBlock(_component_TiffViewer, {
                          key: 0,
                          "tiff-url": unref(tiffRender),
                          onError: ($event) => tiffError.value = true
                        }, null, 8, ["tiff-url", "onError"])) : unref(hasFoto) ? (openBlock(), createBlock("img", {
                          key: 1,
                          src: unref(fotoRender),
                          style: { "width": "100%", "height": "100%", "object-fit": "cover" }
                        }, null, 8, ["src"])) : (openBlock(), createBlock("img", {
                          key: 2,
                          src: _imports_0$2
                        }))
                      ]),
                      _: 2
                    }, 1040)
                  ];
                }
              }),
              default: withCtx(({ isActive }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VCard, { title: "Biometria" }, {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VRow, null, {
                          default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VCol, null, {
                                default: withCtx((_4, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(VContainer, null, {
                                      default: withCtx((_5, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(VSelect, {
                                            items: unref(devices),
                                            modelValue: unref(selectedDeviceId),
                                            "onUpdate:modelValue": ($event) => isRef(selectedDeviceId) ? selectedDeviceId.value = $event : null,
                                            "item-title": "label",
                                            "item-value": "deviceId",
                                            label: "Selecionar Webcam"
                                          }, null, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(VSelect, {
                                              items: unref(devices),
                                              modelValue: unref(selectedDeviceId),
                                              "onUpdate:modelValue": ($event) => isRef(selectedDeviceId) ? selectedDeviceId.value = $event : null,
                                              "item-title": "label",
                                              "item-value": "deviceId",
                                              label: "Selecionar Webcam"
                                            }, null, 8, ["items", "modelValue", "onUpdate:modelValue"])
                                          ];
                                        }
                                      }),
                                      _: 2
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(VContainer, null, {
                                        default: withCtx(() => [
                                          createVNode(VSelect, {
                                            items: unref(devices),
                                            modelValue: unref(selectedDeviceId),
                                            "onUpdate:modelValue": ($event) => isRef(selectedDeviceId) ? selectedDeviceId.value = $event : null,
                                            "item-title": "label",
                                            "item-value": "deviceId",
                                            label: "Selecionar Webcam"
                                          }, null, 8, ["items", "modelValue", "onUpdate:modelValue"])
                                        ]),
                                        _: 1
                                      })
                                    ];
                                  }
                                }),
                                _: 2
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(VCol, null, {
                                  default: withCtx(() => [
                                    createVNode(VContainer, null, {
                                      default: withCtx(() => [
                                        createVNode(VSelect, {
                                          items: unref(devices),
                                          modelValue: unref(selectedDeviceId),
                                          "onUpdate:modelValue": ($event) => isRef(selectedDeviceId) ? selectedDeviceId.value = $event : null,
                                          "item-title": "label",
                                          "item-value": "deviceId",
                                          label: "Selecionar Webcam"
                                        }, null, 8, ["items", "modelValue", "onUpdate:modelValue"])
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 2
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VRow, null, {
                          default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VCol, null, {
                                default: withCtx((_4, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(VBtn, {
                                      size: "large",
                                      class: "ml-5",
                                      onClick: startVideo
                                    }, {
                                      default: withCtx((_5, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`Exibir`);
                                        } else {
                                          return [
                                            createTextVNode("Exibir")
                                          ];
                                        }
                                      }),
                                      _: 2
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(VBtn, {
                                        size: "large",
                                        class: "ml-5",
                                        onClick: startVideo
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode("Exibir")
                                        ]),
                                        _: 1
                                      })
                                    ];
                                  }
                                }),
                                _: 2
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(VCol, null, {
                                  default: withCtx(() => [
                                    createVNode(VBtn, {
                                      size: "large",
                                      class: "ml-5",
                                      onClick: startVideo
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode("Exibir")
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 2
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VContainer, null, {
                          default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VSlider, {
                                modelValue: unref(zoomLevel),
                                "onUpdate:modelValue": ($event) => isRef(zoomLevel) ? zoomLevel.value = $event : null,
                                min: 1,
                                max: 3,
                                step: "0.1",
                                label: "Zoom"
                              }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(VSlider, {
                                  modelValue: unref(zoomLevel),
                                  "onUpdate:modelValue": ($event) => isRef(zoomLevel) ? zoomLevel.value = $event : null,
                                  min: 1,
                                  max: 3,
                                  step: "0.1",
                                  label: "Zoom"
                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                              ];
                            }
                          }),
                          _: 2
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VRow, null, {
                          default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VContainer, { style: { "overflow": "hidden" } }, {
                                default: withCtx((_4, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(VCol, { class: "d-flex justify-center align-center" }, {
                                      default: withCtx((_5, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`<video width="360" height="300" autoplay style="${ssrRenderStyle({
                                            transform: `scale(${unref(zoomLevel)})`,
                                            transformOrigin: "center center"
                                          })}"${_scopeId6}></video>`);
                                        } else {
                                          return [
                                            createVNode("video", {
                                              ref_key: "video",
                                              ref: video,
                                              width: "360",
                                              height: "300",
                                              autoplay: "",
                                              style: {
                                                transform: `scale(${unref(zoomLevel)})`,
                                                transformOrigin: "center center"
                                              }
                                            }, null, 4)
                                          ];
                                        }
                                      }),
                                      _: 2
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(VCol, { class: "d-flex justify-center align-center" }, {
                                        default: withCtx(() => [
                                          createVNode("video", {
                                            ref_key: "video",
                                            ref: video,
                                            width: "360",
                                            height: "300",
                                            autoplay: "",
                                            style: {
                                              transform: `scale(${unref(zoomLevel)})`,
                                              transformOrigin: "center center"
                                            }
                                          }, null, 4)
                                        ]),
                                        _: 1
                                      })
                                    ];
                                  }
                                }),
                                _: 2
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(VContainer, { style: { "overflow": "hidden" } }, {
                                  default: withCtx(() => [
                                    createVNode(VCol, { class: "d-flex justify-center align-center" }, {
                                      default: withCtx(() => [
                                        createVNode("video", {
                                          ref_key: "video",
                                          ref: video,
                                          width: "360",
                                          height: "300",
                                          autoplay: "",
                                          style: {
                                            transform: `scale(${unref(zoomLevel)})`,
                                            transformOrigin: "center center"
                                          }
                                        }, null, 4)
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 2
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VRow, { class: "mt-10 mb-5 ml-5" }, {
                          default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VBtn, {
                                color: "red",
                                size: "large",
                                onClick: closeDialog
                              }, {
                                default: withCtx((_4, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Fechar`);
                                  } else {
                                    return [
                                      createTextVNode("Fechar")
                                    ];
                                  }
                                }),
                                _: 2
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(VBtn, {
                                color: "green",
                                size: "large",
                                class: "ml-5",
                                onClick: handleCapture
                              }, {
                                default: withCtx((_4, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Salvar`);
                                  } else {
                                    return [
                                      createTextVNode("Salvar")
                                    ];
                                  }
                                }),
                                _: 2
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(VBtn, {
                                  color: "red",
                                  size: "large",
                                  onClick: closeDialog
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode("Fechar")
                                  ]),
                                  _: 1
                                }),
                                createVNode(VBtn, {
                                  color: "green",
                                  size: "large",
                                  class: "ml-5",
                                  onClick: handleCapture
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode("Salvar")
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 2
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VRow, null, {
                            default: withCtx(() => [
                              createVNode(VCol, null, {
                                default: withCtx(() => [
                                  createVNode(VContainer, null, {
                                    default: withCtx(() => [
                                      createVNode(VSelect, {
                                        items: unref(devices),
                                        modelValue: unref(selectedDeviceId),
                                        "onUpdate:modelValue": ($event) => isRef(selectedDeviceId) ? selectedDeviceId.value = $event : null,
                                        "item-title": "label",
                                        "item-value": "deviceId",
                                        label: "Selecionar Webcam"
                                      }, null, 8, ["items", "modelValue", "onUpdate:modelValue"])
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(VRow, null, {
                            default: withCtx(() => [
                              createVNode(VCol, null, {
                                default: withCtx(() => [
                                  createVNode(VBtn, {
                                    size: "large",
                                    class: "ml-5",
                                    onClick: startVideo
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode("Exibir")
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(VContainer, null, {
                            default: withCtx(() => [
                              createVNode(VSlider, {
                                modelValue: unref(zoomLevel),
                                "onUpdate:modelValue": ($event) => isRef(zoomLevel) ? zoomLevel.value = $event : null,
                                min: 1,
                                max: 3,
                                step: "0.1",
                                label: "Zoom"
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            _: 1
                          }),
                          createVNode(VRow, null, {
                            default: withCtx(() => [
                              createVNode(VContainer, { style: { "overflow": "hidden" } }, {
                                default: withCtx(() => [
                                  createVNode(VCol, { class: "d-flex justify-center align-center" }, {
                                    default: withCtx(() => [
                                      createVNode("video", {
                                        ref_key: "video",
                                        ref: video,
                                        width: "360",
                                        height: "300",
                                        autoplay: "",
                                        style: {
                                          transform: `scale(${unref(zoomLevel)})`,
                                          transformOrigin: "center center"
                                        }
                                      }, null, 4)
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(VRow, { class: "mt-10 mb-5 ml-5" }, {
                            default: withCtx(() => [
                              createVNode(VBtn, {
                                color: "red",
                                size: "large",
                                onClick: closeDialog
                              }, {
                                default: withCtx(() => [
                                  createTextVNode("Fechar")
                                ]),
                                _: 1
                              }),
                              createVNode(VBtn, {
                                color: "green",
                                size: "large",
                                class: "ml-5",
                                onClick: handleCapture
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
                    _: 2
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VCard, { title: "Biometria" }, {
                      default: withCtx(() => [
                        createVNode(VRow, null, {
                          default: withCtx(() => [
                            createVNode(VCol, null, {
                              default: withCtx(() => [
                                createVNode(VContainer, null, {
                                  default: withCtx(() => [
                                    createVNode(VSelect, {
                                      items: unref(devices),
                                      modelValue: unref(selectedDeviceId),
                                      "onUpdate:modelValue": ($event) => isRef(selectedDeviceId) ? selectedDeviceId.value = $event : null,
                                      "item-title": "label",
                                      "item-value": "deviceId",
                                      label: "Selecionar Webcam"
                                    }, null, 8, ["items", "modelValue", "onUpdate:modelValue"])
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        createVNode(VRow, null, {
                          default: withCtx(() => [
                            createVNode(VCol, null, {
                              default: withCtx(() => [
                                createVNode(VBtn, {
                                  size: "large",
                                  class: "ml-5",
                                  onClick: startVideo
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode("Exibir")
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        createVNode(VContainer, null, {
                          default: withCtx(() => [
                            createVNode(VSlider, {
                              modelValue: unref(zoomLevel),
                              "onUpdate:modelValue": ($event) => isRef(zoomLevel) ? zoomLevel.value = $event : null,
                              min: 1,
                              max: 3,
                              step: "0.1",
                              label: "Zoom"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          _: 1
                        }),
                        createVNode(VRow, null, {
                          default: withCtx(() => [
                            createVNode(VContainer, { style: { "overflow": "hidden" } }, {
                              default: withCtx(() => [
                                createVNode(VCol, { class: "d-flex justify-center align-center" }, {
                                  default: withCtx(() => [
                                    createVNode("video", {
                                      ref_key: "video",
                                      ref: video,
                                      width: "360",
                                      height: "300",
                                      autoplay: "",
                                      style: {
                                        transform: `scale(${unref(zoomLevel)})`,
                                        transformOrigin: "center center"
                                      }
                                    }, null, 4)
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        createVNode(VRow, { class: "mt-10 mb-5 ml-5" }, {
                          default: withCtx(() => [
                            createVNode(VBtn, {
                              color: "red",
                              size: "large",
                              onClick: closeDialog
                            }, {
                              default: withCtx(() => [
                                createTextVNode("Fechar")
                              ]),
                              _: 1
                            }),
                            createVNode(VBtn, {
                              color: "green",
                              size: "large",
                              class: "ml-5",
                              onClick: handleCapture
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
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(VDialog, {
                "max-width": "700",
                modelValue: unref(isDialogActiveBiometria),
                "onUpdate:modelValue": ($event) => isRef(isDialogActiveBiometria) ? isDialogActiveBiometria.value = $event : null
              }, {
                activator: withCtx(({ props: activatorProps }) => [
                  createVNode(VBtn, mergeProps(activatorProps, {
                    variant: "outlined",
                    style: { "width": "300px", "height": "300px" },
                    onClick: openDialog
                  }), {
                    default: withCtx(() => [
                      unref(hasTiff) && !unref(tiffError) ? (openBlock(), createBlock(_component_TiffViewer, {
                        key: 0,
                        "tiff-url": unref(tiffRender),
                        onError: ($event) => tiffError.value = true
                      }, null, 8, ["tiff-url", "onError"])) : unref(hasFoto) ? (openBlock(), createBlock("img", {
                        key: 1,
                        src: unref(fotoRender),
                        style: { "width": "100%", "height": "100%", "object-fit": "cover" }
                      }, null, 8, ["src"])) : (openBlock(), createBlock("img", {
                        key: 2,
                        src: _imports_0$2
                      }))
                    ]),
                    _: 2
                  }, 1040)
                ]),
                default: withCtx(({ isActive }) => [
                  createVNode(VCard, { title: "Biometria" }, {
                    default: withCtx(() => [
                      createVNode(VRow, null, {
                        default: withCtx(() => [
                          createVNode(VCol, null, {
                            default: withCtx(() => [
                              createVNode(VContainer, null, {
                                default: withCtx(() => [
                                  createVNode(VSelect, {
                                    items: unref(devices),
                                    modelValue: unref(selectedDeviceId),
                                    "onUpdate:modelValue": ($event) => isRef(selectedDeviceId) ? selectedDeviceId.value = $event : null,
                                    "item-title": "label",
                                    "item-value": "deviceId",
                                    label: "Selecionar Webcam"
                                  }, null, 8, ["items", "modelValue", "onUpdate:modelValue"])
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(VRow, null, {
                        default: withCtx(() => [
                          createVNode(VCol, null, {
                            default: withCtx(() => [
                              createVNode(VBtn, {
                                size: "large",
                                class: "ml-5",
                                onClick: startVideo
                              }, {
                                default: withCtx(() => [
                                  createTextVNode("Exibir")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(VContainer, null, {
                        default: withCtx(() => [
                          createVNode(VSlider, {
                            modelValue: unref(zoomLevel),
                            "onUpdate:modelValue": ($event) => isRef(zoomLevel) ? zoomLevel.value = $event : null,
                            min: 1,
                            max: 3,
                            step: "0.1",
                            label: "Zoom"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        _: 1
                      }),
                      createVNode(VRow, null, {
                        default: withCtx(() => [
                          createVNode(VContainer, { style: { "overflow": "hidden" } }, {
                            default: withCtx(() => [
                              createVNode(VCol, { class: "d-flex justify-center align-center" }, {
                                default: withCtx(() => [
                                  createVNode("video", {
                                    ref_key: "video",
                                    ref: video,
                                    width: "360",
                                    height: "300",
                                    autoplay: "",
                                    style: {
                                      transform: `scale(${unref(zoomLevel)})`,
                                      transformOrigin: "center center"
                                    }
                                  }, null, 4)
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(VRow, { class: "mt-10 mb-5 ml-5" }, {
                        default: withCtx(() => [
                          createVNode(VBtn, {
                            color: "red",
                            size: "large",
                            onClick: closeDialog
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Fechar")
                            ]),
                            _: 1
                          }),
                          createVNode(VBtn, {
                            color: "green",
                            size: "large",
                            class: "ml-5",
                            onClick: handleCapture
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
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Biometria/ReconhecimentoFacial.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : undefined;
};
const _imports_0$1 = "" + buildAssetsURL("escanearFicha.CgD8l9Wn.png");
const _sfc_main$4 = {
  __name: "Scanner",
  __ssrInlineRender: true,
  setup(__props) {
    const config = useRuntimeConfig();
    useNuxtApp();
    `${config.public.envioDoc}/upload`;
    `${config.public.biometria}/run-scanner?format=img`;
    const tokenCookie = useCookie("pessoa_token");
    tokenCookie.value;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)}><img${ssrRenderAttr("src", _imports_0$1)} style="${ssrRenderStyle({ "width": "280px", "height": "120px", "cursor": "pointer", "margin-top": "30px" })}"></div>`);
    };
  }
};
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Biometria/Scanner.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : undefined;
};
const _imports_0 = "" + buildAssetsURL("imprimirFicha.BlhLZ85F.png");
const _sfc_main$3 = {
  __name: "Impressao",
  __ssrInlineRender: true,
  props: {
    linkFicha: String
  },
  setup(__props) {
    const props = __props;
    const printHtml = ref("");
    const config = useRuntimeConfig();
    const impressao = `${config.public.managemant}/gerarRelatorioPessoa`;
    const baixarDocumento = `${config.public.managemant}/download`;
    const linkFichaPessoa = ref(null);
    const isView = ref(false);
    const isModalFichaOpen = ref(false);
    const pessoaObj = ref({});
    const consultaFicha = async () => {
      const response = await useFetch(impressao, {
        method: "POST",
        body: {
          consulta: "FICHA ASSINATURA",
          pessoa_token: useCookie("pessoa_token").value
        }
      }, "$LOyFO5WGQE");
      printHtml.value = response.data.value;
    };
    const redirectToFicha = async () => {
      isModalFichaOpen.value = true;
      isView.value = true;
      if (props.linkFicha) {
        pessoaObj.value = {
          token: useCookie("pessoa_token").value,
          link_ficha: props.linkFicha
        };
        const { data: link } = await useFetch(baixarDocumento, {
          method: "POST",
          body: {
            bucket: useCookie("user-data").value.cartorio_token,
            path: props.linkFicha
          }
        }, "$BxSla0y3eT");
        linkFichaPessoa.value = link.value;
      }
    };
    const printContent = async () => {
      await consultaFicha();
      const iframe = (undefined).createElement("iframe");
      iframe.style.position = "absolute";
      iframe.style.width = "0px";
      iframe.style.height = "0px";
      iframe.style.border = "none";
      (undefined).body.appendChild(iframe);
      const doc = iframe.contentWindow.document;
      doc.open();
      doc.write(printHtml.value);
      doc.close();
      iframe.contentWindow.focus();
      iframe.contentWindow.print();
      (undefined).body.removeChild(iframe);
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_BiometriaScanner = _sfc_main$4;
      const _component_ModalFichaCard = _sfc_main$d;
      _push(`<!--[-->`);
      _push(ssrRenderComponent(VCol, { cols: "auto" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div style="${ssrRenderStyle({ "display": "flex", "flex-direction": "column" })}"${_scopeId}><img${ssrRenderAttr("src", _imports_0)} style="${ssrRenderStyle({ "width": "280px", "height": "120px", "cursor": "pointer" })}"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_BiometriaScanner, null, null, _parent2, _scopeId));
            _push2(`</div>`);
            if (props.linkFicha) {
              _push2(`<div${_scopeId}><img style="${ssrRenderStyle({ "width": "80px", "height": "80px", "cursor": "pointer" })}"${ssrRenderAttr("src", _imports_1$2)} alt="Ver ficha"${_scopeId}></div>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode("div", { style: { "display": "flex", "flex-direction": "column" } }, [
                createVNode("img", {
                  onClick: ($event) => printContent(),
                  src: _imports_0,
                  style: { "width": "280px", "height": "120px", "cursor": "pointer" }
                }, null, 8, ["onClick"]),
                createVNode(_component_BiometriaScanner)
              ]),
              props.linkFicha ? (openBlock(), createBlock("div", { key: 0 }, [
                createVNode("img", {
                  onClick: ($event) => redirectToFicha(),
                  style: { "width": "80px", "height": "80px", "cursor": "pointer" },
                  src: _imports_1$2,
                  alt: "Ver ficha"
                }, null, 8, ["onClick"])
              ])) : createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
      if (unref(isModalFichaOpen)) {
        _push(ssrRenderComponent(_component_ModalFichaCard, {
          show: unref(isModalFichaOpen),
          "link-view": unref(linkFichaPessoa),
          "is-view": true,
          "pessoa-obj": unref(pessoaObj),
          onClose: ($event) => isModalFichaOpen.value = false
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Biometria/Impressao.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : undefined;
};
const _sfc_main$2 = {
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    isModal: {
      type: Boolean,
      default: false
    },
    linkFicha: String
  },
  emits: ["close-modal"],
  setup(__props, { emit: __emit }) {
    const router = useRouter$1();
    const emit2 = __emit;
    const props = __props;
    const voltar = () => {
      if (props.isModal === true) {
        emit2("close-modal");
        return;
      }
      router.push("/pessoas/lista");
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_BiometriaDigital = __nuxt_component_0;
      const _component_BiometriaReconhecimentoFacial = _sfc_main$5;
      const _component_BiometriaImpressao = _sfc_main$3;
      _push(`<!--[-->`);
      _push(ssrRenderComponent(VContainer, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VRow, { class: "d-flex align-items-center" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_BiometriaDigital, null, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_BiometriaReconhecimentoFacial, { class: "ml-5 mr-5" }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_BiometriaImpressao, {
                    "link-ficha": props.linkFicha
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_BiometriaDigital),
                    createVNode(_component_BiometriaReconhecimentoFacial, { class: "ml-5 mr-5" }),
                    createVNode(_component_BiometriaImpressao, {
                      "link-ficha": props.linkFicha
                    }, null, 8, ["link-ficha"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(VRow, { class: "d-flex align-items-center" }, {
                default: withCtx(() => [
                  createVNode(_component_BiometriaDigital),
                  createVNode(_component_BiometriaReconhecimentoFacial, { class: "ml-5 mr-5" }),
                  createVNode(_component_BiometriaImpressao, {
                    "link-ficha": props.linkFicha
                  }, null, 8, ["link-ficha"])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(VBtn, {
        onClick: voltar,
        class: "mt-10",
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
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Biometria/Index.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : undefined;
};
const _sfc_main$1 = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<div${ssrRenderAttrs(mergeProps({ style: { "height": "425px" } }, _attrs))}><h1>Restri\xE7\xF5es</h1></div>`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Restricoes.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : undefined;
};
const __nuxt_component_7 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender]]);
const _sfc_main = {
  __name: "RegistroPessoas",
  __ssrInlineRender: true,
  props: {
    show: Boolean
  },
  emits: ["close"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const isVisible = ref(props.show);
    const emit2 = __emit;
    const tab = ref("dados");
    const showTabsFisica = ref(false);
    const showTabsJuridica = ref(false);
    const autocompleteDisabled = ref(false);
    const state = reactive({
      tipo_pessoa: "FISICA"
      // Valor inicial
    });
    const pessoa_tipo = [
      { label: "F\xCDSICA", value: "FISICA" },
      { label: "JUR\xCDDICA", value: "JURIDICA" },
      { label: "ESTRANGEIRA", value: "ESTRANGEIRA" }
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
      () => props.show,
      (newVal) => {
        isVisible.value = newVal;
      }
    );
    const closeModal = () => {
      isVisible.value = false;
      emit2("close");
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Dados = _sfc_main$c;
      const _component_DadosJuridica = _sfc_main$b;
      const _component_Documentos = _sfc_main$a;
      const _component_PessoasCadastrosRepresentantes = _sfc_main$9;
      const _component_Endereco = _sfc_main$8;
      const _component_Biometria = _sfc_main$2;
      const _component_Restricoes = __nuxt_component_7;
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
                                    if (unref(state).tipo_pessoa === "FISICA") {
                                      _push6(ssrRenderComponent(_component_Dados, {
                                        onSaved: handleSave,
                                        onCloseModal: closeModal,
                                        isModal: true
                                      }, null, _parent6, _scopeId5));
                                    } else if (unref(state).tipo_pessoa === "JURIDICA") {
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
                                      unref(state).tipo_pessoa === "FISICA" ? (openBlock(), createBlock(_component_Dados, {
                                        key: 0,
                                        onSaved: handleSave,
                                        onCloseModal: closeModal,
                                        isModal: true
                                      })) : unref(state).tipo_pessoa === "JURIDICA" ? (openBlock(), createBlock(_component_DadosJuridica, {
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
                                    unref(state).tipo_pessoa === "FISICA" ? (openBlock(), createBlock(_component_Dados, {
                                      key: 0,
                                      onSaved: handleSave,
                                      onCloseModal: closeModal,
                                      isModal: true
                                    })) : unref(state).tipo_pessoa === "JURIDICA" ? (openBlock(), createBlock(_component_DadosJuridica, {
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
                                  unref(state).tipo_pessoa === "FISICA" ? (openBlock(), createBlock(_component_Dados, {
                                    key: 0,
                                    onSaved: handleSave,
                                    onCloseModal: closeModal,
                                    isModal: true
                                  })) : unref(state).tipo_pessoa === "JURIDICA" ? (openBlock(), createBlock(_component_DadosJuridica, {
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
                                unref(state).tipo_pessoa === "FISICA" ? (openBlock(), createBlock(_component_Dados, {
                                  key: 0,
                                  onSaved: handleSave,
                                  onCloseModal: closeModal,
                                  isModal: true
                                })) : unref(state).tipo_pessoa === "JURIDICA" ? (openBlock(), createBlock(_component_DadosJuridica, {
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
                              unref(state).tipo_pessoa === "FISICA" ? (openBlock(), createBlock(_component_Dados, {
                                key: 0,
                                onSaved: handleSave,
                                onCloseModal: closeModal,
                                isModal: true
                              })) : unref(state).tipo_pessoa === "JURIDICA" ? (openBlock(), createBlock(_component_DadosJuridica, {
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
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Modal/RegistroPessoas.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : undefined;
};

export { _imports_0$3 as _, _imports_1 as a, _sfc_main as b, _sfc_main$6 as c, _sfc_main$b as d, _sfc_main$a as e, _sfc_main$9 as f, _sfc_main$8 as g, _sfc_main$2 as h, __nuxt_component_7 as i, _sfc_main$c as j };
//# sourceMappingURL=RegistroPessoas-DUPsaQgY.mjs.map
