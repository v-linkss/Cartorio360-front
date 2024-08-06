import { _ as __nuxt_component_0 } from './nuxt-link-DyZc7qn_.mjs';
import { _ as _export_sfc, u as useRouter$1, c as useNuxtApp, aF as useRoute$1, al as useCookie, aG as VProgressCircular, V as VTextField, b as useRuntimeConfig } from './server.mjs';
import { b as useLazyAsyncData, a as useFetch } from './fetch-3DdSDKmI.mjs';
import { reactive, withAsyncContext, resolveDirective, unref, withCtx, createVNode, mergeProps, withDirectives, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrInterpolate, ssrGetDirectiveProps, ssrRenderAttr } from 'vue/server-renderer';
import { V as VRow, _ as _imports_0 } from './sair-B9PBMH_8.mjs';
import { _ as _imports_3 } from './salvar-DNXAfpCz.mjs';
import { useVuelidate } from '@vuelidate/core';
import { V as VContainer } from './VContainer-Mst0JKJ7.mjs';
import { V as VCol } from './VCol-QAPwXCIJ.mjs';
import { V as VAutocomplete } from './VAutocomplete-BYlFWgTC.mjs';
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

const _sfc_main = {
  __name: "[id]",
  __ssrInlineRender: true,
  emits: ["saved"],
  async setup(__props, { emit: __emit }) {
    let __temp, __restore;
    const router = useRouter$1();
    const { $toast } = useNuxtApp();
    const route = useRoute$1();
    const { id } = route.params;
    const config = useRuntimeConfig();
    const updatePessoa = `${config.public.managemant}/updatePessoa`;
    const estadoCivil = `${config.public.managemant}/listarEstadoCivil`;
    const capacidadeCivil = `${config.public.managemant}/listarCapacidadeCivil`;
    const cidades = `${config.public.managemant}/listarCidades`;
    const buscarPessoa = `${config.public.managemant}/getPessoaById`;
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
      local_trabalho: "",
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
    const {
      data: dados,
      status,
      pending,
      error
    } = ([__temp, __restore] = withAsyncContext(async () => useLazyAsyncData("cliente-dados", async () => {
      const [estadoCivilItems, capacidadeCivilItems, cidadeNascimentoItems, pessoa] = await Promise.all([
        $fetch(estadoCivil),
        $fetch(capacidadeCivil),
        $fetch(cidades),
        $fetch(`${buscarPessoa}/${id}`)
      ]);
      Object.assign(state, pessoa);
      return { estadoCivilItems, capacidadeCivilItems, cidadeNascimentoItems };
    })), __temp = await __temp, __restore(), __temp);
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
      await useFetch(
        `${updatePessoa}/${id}`,
        {
          method: "PUT",
          body: payloadFormated
        },
        "$NdF8Uiv290"
      );
      $toast.success("Pessoa atualizada com sucesso!");
      router.push("/pessoas/registros");
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      const _directive_mask = resolveDirective("mask");
      _push(`<!--[-->`);
      if (unref(pending)) {
        _push(ssrRenderComponent(VProgressCircular, {
          class: "loading-spinner",
          indeterminate: "",
          size: "64"
        }, null, _parent));
      } else if (unref(error)) {
        _push(`<div data-v-d5265d57>${ssrInterpolate(unref(error).message)}</div>`);
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
                            modelValue: state.nome,
                            "onUpdate:modelValue": ($event) => state.nome = $event,
                            label: "Nome"
                          }, null, _parent4, _scopeId3));
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
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(VCol, {
                      cols: "12",
                      md: "4"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(VTextField, mergeProps({
                            modelValue: state.doc_identificacao,
                            "onUpdate:modelValue": ($event) => state.doc_identificacao = $event,
                            label: "CPF",
                            required: ""
                          }, ssrGetDirectiveProps(_ctx, _directive_mask, "###.###.###-##")), null, _parent4, _scopeId3));
                        } else {
                          return [
                            withDirectives(createVNode(VTextField, {
                              modelValue: state.doc_identificacao,
                              "onUpdate:modelValue": ($event) => state.doc_identificacao = $event,
                              label: "CPF",
                              required: ""
                            }, null, 8, ["modelValue", "onUpdate:modelValue"]), [
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
                            label: "CPF",
                            required: ""
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
                            modelValue: state.tabvalores_estadocivil_id,
                            "onUpdate:modelValue": ($event) => state.tabvalores_estadocivil_id = $event,
                            items: unref(dados).estadoCivilItems,
                            "item-title": "descricao",
                            "item-value": "id",
                            label: "Estado Civil"
                          }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(VAutocomplete, {
                              modelValue: state.tabvalores_estadocivil_id,
                              "onUpdate:modelValue": ($event) => state.tabvalores_estadocivil_id = $event,
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
                            modelValue: state.profissao,
                            "onUpdate:modelValue": ($event) => state.profissao = $event,
                            label: "Profiss\xE3o"
                          }, null, _parent4, _scopeId3));
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
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(VCol, {
                      cols: "12",
                      md: "4"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(VTextField, {
                            modelValue: state.local_trabalho,
                            "onUpdate:modelValue": ($event) => state.local_trabalho = $event,
                            label: "Local de trabalho"
                          }, null, _parent4, _scopeId3));
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
                    }, _parent3, _scopeId2));
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
                            modelValue: state.data_nascimento,
                            "onUpdate:modelValue": ($event) => state.data_nascimento = $event,
                            type: "date",
                            "prepend-icon": "",
                            label: "Data de nascimento"
                          }, null, _parent4, _scopeId3));
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
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(VCol, {
                      cols: "12",
                      md: "4"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(VAutocomplete, {
                            modelValue: state.tabvalores_capacidadecivil_id,
                            "onUpdate:modelValue": ($event) => state.tabvalores_capacidadecivil_id = $event,
                            items: unref(dados).capacidadeCivilItems,
                            label: "Capacidade Civil",
                            "item-title": "descricao",
                            "item-value": "id"
                          }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(VAutocomplete, {
                              modelValue: state.tabvalores_capacidadecivil_id,
                              "onUpdate:modelValue": ($event) => state.tabvalores_capacidadecivil_id = $event,
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
                            modelValue: state.cidade_natural_id,
                            "onUpdate:modelValue": ($event) => state.cidade_natural_id = $event,
                            items: unref(dados).cidadeNascimentoItems,
                            label: "Cidade de nascimento",
                            "item-title": "descricao",
                            "item-value": "id"
                          }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(VAutocomplete, {
                              modelValue: state.cidade_natural_id,
                              "onUpdate:modelValue": ($event) => state.cidade_natural_id = $event,
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
                            modelValue: state.cidade_natural_id,
                            "onUpdate:modelValue": ($event) => state.cidade_natural_id = $event,
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
                            modelValue: state.cpf_pai,
                            "onUpdate:modelValue": ($event) => state.cpf_pai = $event,
                            modelModifiers: { date: true },
                            label: "CPF do Pai"
                          }, ssrGetDirectiveProps(_ctx, _directive_mask, "###.###.###-##")), null, _parent4, _scopeId3));
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
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(VCol, {
                      cols: "12",
                      md: "4"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(VTextField, {
                            modelValue: state.nome_pai,
                            "onUpdate:modelValue": ($event) => state.nome_pai = $event,
                            modelModifiers: { date: true },
                            label: "Nome do Pai"
                          }, null, _parent4, _scopeId3));
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
                    }, _parent3, _scopeId2));
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
                            modelValue: state.cpf_mae,
                            "onUpdate:modelValue": ($event) => state.cpf_mae = $event,
                            modelModifiers: { date: true },
                            label: "CPF da M\xE3e"
                          }, ssrGetDirectiveProps(_ctx, _directive_mask, "###.###.###-##")), null, _parent4, _scopeId3));
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
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(VCol, {
                      cols: "12",
                      md: "4"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(VTextField, {
                            modelValue: state.nome_mae,
                            "onUpdate:modelValue": ($event) => state.nome_mae = $event,
                            modelModifiers: { date: true },
                            label: "Nome da M\xE3e"
                          }, null, _parent4, _scopeId3));
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
                    }, _parent3, _scopeId2));
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
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(VRow, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_NuxtLink, { to: "/pessoas/registros" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<img class="btn-pointer"${ssrRenderAttr("src", _imports_0)} alt="Sair" data-v-d5265d57${_scopeId3}>`);
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
                    _push3(`<img class="btn-pointer"${ssrRenderAttr("src", _imports_3)} data-v-d5265d57${_scopeId2}>`);
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
                        src: _imports_3,
                        onClick: ($event) => onUpdate()
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
                          label: "CPF",
                          required: ""
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
                          modelValue: state.cidade_natural_id,
                          "onUpdate:modelValue": ($event) => state.cidade_natural_id = $event,
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
                      src: _imports_3,
                      onClick: ($event) => onUpdate()
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
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/pessoas/atualizar/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _id_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-d5265d57"]]);

export { _id_ as default };
//# sourceMappingURL=_id_-DRhE9sE3.mjs.map
