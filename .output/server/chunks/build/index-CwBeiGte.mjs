import { _ as __nuxt_component_0$1 } from './nuxt-link-DyZc7qn_.mjs';
import { u as useRouter$1, f as useNuxtApp, d as useCookie, at as VProgressCircular, V as VTextField, _ as _export_sfc, b as useRuntimeConfig } from './server.mjs';
import { ref, reactive, mergeProps, withCtx, unref, isRef, createTextVNode, createVNode, openBlock, createBlock, createCommentVNode, useSSRContext, withAsyncContext, resolveDirective, withDirectives } from 'vue';
import { a as useLazyAsyncData, u as useFetch } from './fetch-Dsyde8UD.mjs';
import { ssrRenderComponent, ssrRenderStyle, ssrInterpolate, ssrGetDirectiveProps, ssrRenderAttr } from 'vue/server-renderer';
import { _ as _imports_0 } from './sair-CV1ySkp8.mjs';
import { V as VAutocomplete, _ as _imports_1 } from './salvar-DRINGrxl.mjs';
import { useVuelidate } from '@vuelidate/core';
import { helpers, required } from '@vuelidate/validators';
import { c as cpf } from './validaCpf-DuucUl6O.mjs';
import { V as VContainer } from './VContainer-chgtNZst.mjs';
import { V as VRow } from './VRow-BuaJrtx0.mjs';
import { V as VCol } from './VCol-uBIoF0At.mjs';
import { V as VTabs, a as VTab, b as VTabsWindow, c as VTabsWindowItem, _ as _sfc_main$7, d as _sfc_main$6, e as __nuxt_component_3, f as __nuxt_component_4 } from './Restricoes-DZz1fv_D.mjs';
import { a as VCard } from './VCard-DfTYaOUe.mjs';
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
import 'vue-router';
import 'vue3-toastify';
import 'vue-the-mask';
import './formatDate-B6RUKh9-.mjs';
import './mudarStatus-D3vc2C0t.mjs';
import './excluido-CHOPYrBt.mjs';

const _sfc_main$1 = {
  __name: "Dados",
  __ssrInlineRender: true,
  emits: ["saved"],
  async setup(__props, { emit: __emit }) {
    let __temp, __restore;
    const emit = __emit;
    const router = useRouter$1();
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
          emit("saved");
          isEditMode.value = true;
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
      await useFetch(
        `${updatePessoa}/${pessoaId.value}`,
        {
          method: "PUT",
          body: payloadFormated
        },
        "$S30ZRYxneo"
      );
      $toast.success("Pessoa atualizada com sucesso!");
      router.push("/pessoas/registros");
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      const _directive_mask = resolveDirective("mask");
      _push(`<!--[-->`);
      if (unref(pending)) {
        _push(ssrRenderComponent(VProgressCircular, {
          class: "loading-spinner",
          indeterminate: "",
          size: "64"
        }, null, _parent));
      } else if (unref(error)) {
        _push(`<div data-v-72971175>${ssrInterpolate(unref(error).message)}</div>`);
      } else {
        _push(`<!---->`);
      }
      if (!unref(pending)) {
        _push(ssrRenderComponent(VContainer, { class: "mt-5" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(VRow, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(VCol, {
                      cols: "12",
                      md: "8"
                    }, {
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
                    _push3(ssrRenderComponent(VCol, {
                      cols: "12",
                      md: "4"
                    }, {
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
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(VRow, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(VCol, {
                      cols: "12",
                      md: "4"
                    }, {
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
                    _push3(ssrRenderComponent(VCol, {
                      cols: "12",
                      md: "4"
                    }, {
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
                    _push3(ssrRenderComponent(VCol, {
                      cols: "12",
                      md: "4"
                    }, {
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
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(VRow, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(VCol, {
                      cols: "12",
                      md: "4"
                    }, {
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
                    _push3(ssrRenderComponent(VCol, {
                      cols: "12",
                      md: "4"
                    }, {
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
                    _push3(ssrRenderComponent(VCol, {
                      cols: "12",
                      md: "4"
                    }, {
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
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(VRow, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(VCol, {
                      cols: "12",
                      md: "4"
                    }, {
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
                    _push3(ssrRenderComponent(VCol, {
                      cols: "12",
                      md: "4"
                    }, {
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
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(VRow, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(VCol, {
                      cols: "12",
                      md: "4"
                    }, {
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
                    _push3(ssrRenderComponent(VCol, {
                      cols: "12",
                      md: "4"
                    }, {
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
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(VRow, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_NuxtLink, { to: "/pessoas/registros" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<img class="btn-pointer"${ssrRenderAttr("src", _imports_0)} alt="Sair" data-v-72971175${_scopeId3}>`);
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
                    }, _parent3, _scopeId2));
                    _push3(`<img class="btn-pointer"${ssrRenderAttr("src", _imports_1)} data-v-72971175${_scopeId2}>`);
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
                        onClick: ($event) => unref(isEditMode) ? onUpdate() : onSubmit()
                      }, null, 8, ["onClick"])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
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
                      onClick: ($event) => unref(isEditMode) ? onUpdate() : onSubmit()
                    }, null, 8, ["onClick"])
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
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-72971175"]]);
const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const tab = ref(null);
    const showTabs = ref(false);
    const autocompleteDisabled = ref(false);
    const initialState = {
      tipo_pessoa: "FISICA"
    };
    const state = reactive({
      ...initialState
    });
    const pessoa_tipo = ["FISICA", "JURIDICA", "ESTRANGEIRA"];
    const handleSave = () => {
      showTabs.value = true;
      autocompleteDisabled.value = true;
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Dados = __nuxt_component_0;
      const _component_Documentos = _sfc_main$7;
      const _component_Endereco = _sfc_main$6;
      const _component_Biometria = __nuxt_component_3;
      const _component_Restricoes = __nuxt_component_4;
      _push(ssrRenderComponent(VCard, mergeProps({ width: "1300" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h1 style="${ssrRenderStyle({ "background-color": "#C8FCCA", "color": "#429946", "padding": "10px 0px 0px 20px" })}"${_scopeId}> Cadastramento de pessoas </h1><div style="${ssrRenderStyle({ "background-color": "#C8FCCA", "padding": "20px 0px 20px 20px" })}"${_scopeId}>`);
            _push2(ssrRenderComponent(VAutocomplete, {
              modelValue: unref(state).tipo_pessoa,
              "onUpdate:modelValue": ($event) => unref(state).tipo_pessoa = $event,
              style: { "width": "200px" },
              items: pessoa_tipo,
              label: "Tipo de pessoa",
              "bg-color": "#F6F6F6",
              disabled: unref(autocompleteDisabled)
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
                  if (unref(showTabs)) {
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
                  if (unref(showTabs)) {
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
                  if (unref(showTabs)) {
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
                  if (unref(showTabs)) {
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
                    unref(showTabs) ? (openBlock(), createBlock(VTab, {
                      key: 0,
                      value: "documento"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Documentos")
                      ]),
                      _: 1
                    })) : createCommentVNode("", true),
                    unref(showTabs) ? (openBlock(), createBlock(VTab, {
                      key: 1,
                      value: "endereco"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Endere\xE7os")
                      ]),
                      _: 1
                    })) : createCommentVNode("", true),
                    unref(showTabs) ? (openBlock(), createBlock(VTab, {
                      key: 2,
                      value: "biometria"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Biometria")
                      ]),
                      _: 1
                    })) : createCommentVNode("", true),
                    unref(showTabs) ? (openBlock(), createBlock(VTab, {
                      key: 3,
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
                        _push4(ssrRenderComponent(_component_Dados, { onSaved: handleSave }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_Dados, { onSaved: handleSave })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  if (unref(showTabs)) {
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
                  } else {
                    _push3(`<!---->`);
                  }
                  if (unref(showTabs)) {
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
                  } else {
                    _push3(`<!---->`);
                  }
                  if (unref(showTabs)) {
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
                  } else {
                    _push3(`<!---->`);
                  }
                  if (unref(showTabs)) {
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
                    _push3(`<!---->`);
                  }
                } else {
                  return [
                    createVNode(VTabsWindowItem, { value: "dados" }, {
                      default: withCtx(() => [
                        createVNode(_component_Dados, { onSaved: handleSave })
                      ]),
                      _: 1
                    }),
                    unref(showTabs) ? (openBlock(), createBlock(VTabsWindowItem, {
                      key: 0,
                      value: "documento"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_Documentos)
                      ]),
                      _: 1
                    })) : createCommentVNode("", true),
                    unref(showTabs) ? (openBlock(), createBlock(VTabsWindowItem, {
                      key: 1,
                      value: "endereco"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_Endereco)
                      ]),
                      _: 1
                    })) : createCommentVNode("", true),
                    unref(showTabs) ? (openBlock(), createBlock(VTabsWindowItem, {
                      key: 2,
                      value: "biometria"
                    }, {
                      default: withCtx(() => [
                        createVNode(VContainer, { class: "mt-5" }, {
                          default: withCtx(() => [
                            createVNode(_component_Biometria)
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    })) : createCommentVNode("", true),
                    unref(showTabs) ? (openBlock(), createBlock(VTabsWindowItem, {
                      key: 3,
                      value: "restricao"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_Restricoes)
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
              createVNode("h1", { style: { "background-color": "#C8FCCA", "color": "#429946", "padding": "10px 0px 0px 20px" } }, " Cadastramento de pessoas "),
              createVNode("div", { style: { "background-color": "#C8FCCA", "padding": "20px 0px 20px 20px" } }, [
                createVNode(VAutocomplete, {
                  modelValue: unref(state).tipo_pessoa,
                  "onUpdate:modelValue": ($event) => unref(state).tipo_pessoa = $event,
                  style: { "width": "200px" },
                  items: pessoa_tipo,
                  label: "Tipo de pessoa",
                  "bg-color": "#F6F6F6",
                  disabled: unref(autocompleteDisabled)
                }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"])
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
                  unref(showTabs) ? (openBlock(), createBlock(VTab, {
                    key: 0,
                    value: "documento"
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Documentos")
                    ]),
                    _: 1
                  })) : createCommentVNode("", true),
                  unref(showTabs) ? (openBlock(), createBlock(VTab, {
                    key: 1,
                    value: "endereco"
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Endere\xE7os")
                    ]),
                    _: 1
                  })) : createCommentVNode("", true),
                  unref(showTabs) ? (openBlock(), createBlock(VTab, {
                    key: 2,
                    value: "biometria"
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Biometria")
                    ]),
                    _: 1
                  })) : createCommentVNode("", true),
                  unref(showTabs) ? (openBlock(), createBlock(VTab, {
                    key: 3,
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
                      createVNode(_component_Dados, { onSaved: handleSave })
                    ]),
                    _: 1
                  }),
                  unref(showTabs) ? (openBlock(), createBlock(VTabsWindowItem, {
                    key: 0,
                    value: "documento"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_Documentos)
                    ]),
                    _: 1
                  })) : createCommentVNode("", true),
                  unref(showTabs) ? (openBlock(), createBlock(VTabsWindowItem, {
                    key: 1,
                    value: "endereco"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_Endereco)
                    ]),
                    _: 1
                  })) : createCommentVNode("", true),
                  unref(showTabs) ? (openBlock(), createBlock(VTabsWindowItem, {
                    key: 2,
                    value: "biometria"
                  }, {
                    default: withCtx(() => [
                      createVNode(VContainer, { class: "mt-5" }, {
                        default: withCtx(() => [
                          createVNode(_component_Biometria)
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })) : createCommentVNode("", true),
                  unref(showTabs) ? (openBlock(), createBlock(VTabsWindowItem, {
                    key: 3,
                    value: "restricao"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_Restricoes)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/pessoas/cadastro/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-CwBeiGte.mjs.map
