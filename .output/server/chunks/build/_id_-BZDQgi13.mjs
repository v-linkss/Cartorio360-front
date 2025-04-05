import { ref, reactive, withAsyncContext, resolveDirective, mergeProps, withCtx, unref, isRef, createTextVNode, createVNode, withDirectives, openBlock, createBlock, createCommentVNode, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderStyle, ssrGetDirectiveProps } from 'vue/server-renderer';
import { aS as useRoute$1, u as useRouter$1, b as useNuxtApp, e as useCookie, V as VTextField, f as VBtn, c as useRuntimeConfig } from './server.mjs';
import { u as useLazyAsyncData, V as VRow } from './VRow-BVT9G9vF.mjs';
import { f as formatDate, a as formatToISO } from './formatDate-DflkuJ_V.mjs';
import { V as VCard } from './VCard-B1PhK9Ih.mjs';
import { V as VTabs, a as VTab, b as VTabsWindow, c as VTabsWindowItem } from './VTabs-DcRGEkxZ.mjs';
import { V as VContainer } from './VContainer-CTpFP9Uv.mjs';
import { V as VCol } from './VCol-BfQDPyTL.mjs';
import { V as VAutocomplete } from './VAutocomplete-ChQPKqBs.mjs';
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
import 'pinia';
import 'vue-router';
import 'vue3-toastify';
import 'vue-the-mask';
import './VAvatar-C1Wv3qCt.mjs';
import './VResponsive-BFQ60k4B.mjs';
import './VList-DgVXz_Z-.mjs';
import './filter-1TH8I8rV.mjs';

const _sfc_main = {
  __name: "[id]",
  __ssrInlineRender: true,
  emits: ["saved", "close-modal"],
  async setup(__props, { emit: __emit }) {
    let __temp, __restore;
    const tab = ref("dados");
    const route = useRoute$1();
    const id = route.params.id;
    const router = useRouter$1();
    const config = useRuntimeConfig();
    const { $toast } = useNuxtApp();
    const situacao = `${config.public.auth}/service/gerencia/listar_situacao_matriculas`;
    const naturezaImoveis = `${config.public.auth}/service/gerencia/natureza_imoveis`;
    const tipoLogradouros = `${config.public.auth}/service/gerencia/tipo_logradouros`;
    const cidades = `${config.public.auth}/service/gerencia/listarCidades`;
    const livro = `${config.public.auth}/service/gerencia/livro`;
    const matriculas = `${config.public.auth}/service/gerencia/matriculas`;
    const state = reactive({
      numero: null,
      protocolo: null,
      livro: null,
      folhas: null,
      data: null,
      descricao: null,
      cnm: null,
      livro_id: null,
      observacao: null,
      inscricao_municipal: null,
      situacao_id: null,
      tabvalores_natureza_id: null,
      tabvalores_tipologradouro_id: null,
      end_logradouro: null,
      end_logradouro_numero: null,
      end_bairro: null,
      end_cidade_id: null,
      end_cep: null,
      end_complemento: null,
      end_quadra: null,
      end_lote: null,
      pagina_inicial: null,
      pagina_final: null,
      user_alteracao_id: useCookie("user-data").value.usuario_id
    });
    const {
      data: dados,
      status,
      pending,
      error
    } = ([__temp, __restore] = withAsyncContext(() => useLazyAsyncData("cliente-dados", fetchData)), __temp = await __temp, __restore(), __temp);
    async function fetchData() {
      const tokenCookie = useCookie("auth_token");
      try {
        const [
          situacaoItens,
          naturezaImoveisItens,
          tipoLogradouroItens,
          cidadesItens,
          livroItens,
          matriculasItens
        ] = await Promise.all([
          $fetch(`${situacao}`, {
            method: "POST",
            body: {
              cartorio_token: useCookie("user-data").value.cartorio_token
            },
            headers: {
              Authorization: `Bearer ${tokenCookie.value}`
            }
          }),
          $fetch(`${naturezaImoveis}`, {
            headers: {
              Authorization: `Bearer ${tokenCookie.value}`
            }
          }),
          $fetch(`${tipoLogradouros}`, {
            headers: {
              Authorization: `Bearer ${tokenCookie.value}`
            }
          }),
          $fetch(`${cidades}`, {
            headers: {
              Authorization: `Bearer ${tokenCookie.value}`
            }
          }),
          $fetch(`${livro}`, {
            headers: {
              Authorization: `Bearer ${tokenCookie.value}`
            }
          }),
          $fetch(`${matriculas}/${id}`, {
            headers: {
              Authorization: `Bearer ${tokenCookie.value}`
            }
          })
        ]);
        if (matriculasItens.data) {
          matriculasItens.data = formatDate(matriculasItens.data, "dd/mm/yyyy");
        }
        Object.assign(state, matriculasItens);
        return {
          situacaoItens,
          naturezaImoveisItens,
          tipoLogradouroItens,
          cidadesItens,
          livroItens
        };
      } catch (error2) {
        console.error("Erro ao carregar dados:", error2);
        return {
          situacaoItens: [],
          naturezaImoveisItens: [],
          tipoLogradouroItens: [],
          cidadesItens: [],
          livroItens: []
        };
      }
    }
    async function onUpdate() {
      try {
        const tokenCookie = useCookie("auth_token");
        if (state.data) {
          state.data = formatToISO(state.data);
        }
        const response = await $fetch(
          `${config.public.auth}/service/gerencia/matriculas/${id}`,
          {
            method: "PUT",
            body: state,
            headers: {
              Authorization: `Bearer ${tokenCookie.value}`
            }
          }
        );
        if (response.statusCode === 500) {
          $toast.error("Erro ao cadastrar Matricula.");
        } else {
          $toast.success("Matr\xEDcula atualizada com sucesso!");
          router.push("/matriculas/lista");
        }
      } catch (error2) {
        console.log("Erro ao Atualizar:", error2);
        $toast.error("Erro ao Atualizar. Tente novamente.");
      }
    }
    function voltar() {
      router.push("/matriculas/lista");
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _directive_mask = resolveDirective("mask");
      _push(ssrRenderComponent(VCard, mergeProps({ width: "1300" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h1 style="${ssrRenderStyle({ "background-color": "#f5f2f2", "color": "#525050", "padding": "5px 0px 0px 20px" })}"${_scopeId}> Atualiza\xE7\xE3o de Matriculas </h1>`);
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
                  _push3(ssrRenderComponent(VTab, { value: "enderecos" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Endere\xE7o`);
                      } else {
                        return [
                          createTextVNode("Endere\xE7o")
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
                    createVNode(VTab, { value: "enderecos" }, {
                      default: withCtx(() => [
                        createTextVNode("Endere\xE7o")
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
                        if (!unref(pending)) {
                          _push4(ssrRenderComponent(VContainer, null, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(VRow, null, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(ssrRenderComponent(VCol, { md: "6" }, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(ssrRenderComponent(VTextField, {
                                              modelValue: unref(state).numero,
                                              "onUpdate:modelValue": ($event) => unref(state).numero = $event,
                                              label: "Matr\xEDcula",
                                              required: ""
                                            }, null, _parent7, _scopeId6));
                                          } else {
                                            return [
                                              createVNode(VTextField, {
                                                modelValue: unref(state).numero,
                                                "onUpdate:modelValue": ($event) => unref(state).numero = $event,
                                                label: "Matr\xEDcula",
                                                required: ""
                                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                            ];
                                          }
                                        }),
                                        _: 1
                                      }, _parent6, _scopeId5));
                                      _push6(ssrRenderComponent(VCol, { md: "4" }, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(ssrRenderComponent(VTextField, {
                                              modelValue: unref(state).protocolo,
                                              "onUpdate:modelValue": ($event) => unref(state).protocolo = $event,
                                              label: "Protocolo",
                                              required: "",
                                              disabled: ""
                                            }, null, _parent7, _scopeId6));
                                          } else {
                                            return [
                                              createVNode(VTextField, {
                                                modelValue: unref(state).protocolo,
                                                "onUpdate:modelValue": ($event) => unref(state).protocolo = $event,
                                                label: "Protocolo",
                                                required: "",
                                                disabled: ""
                                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                            ];
                                          }
                                        }),
                                        _: 1
                                      }, _parent6, _scopeId5));
                                      _push6(ssrRenderComponent(VCol, { md: "4" }, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(ssrRenderComponent(VAutocomplete, {
                                              modelValue: unref(state).livro_id,
                                              "onUpdate:modelValue": ($event) => unref(state).livro_id = $event,
                                              items: unref(dados).livroItens.data,
                                              label: "Livro",
                                              "item-title": "descricao",
                                              "item-value": "id",
                                              disabled: ""
                                            }, null, _parent7, _scopeId6));
                                          } else {
                                            return [
                                              createVNode(VAutocomplete, {
                                                modelValue: unref(state).livro_id,
                                                "onUpdate:modelValue": ($event) => unref(state).livro_id = $event,
                                                items: unref(dados).livroItens.data,
                                                label: "Livro",
                                                "item-title": "descricao",
                                                "item-value": "id",
                                                disabled: ""
                                              }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                                            ];
                                          }
                                        }),
                                        _: 1
                                      }, _parent6, _scopeId5));
                                      _push6(ssrRenderComponent(VCol, { md: "4" }, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(ssrRenderComponent(VTextField, {
                                              modelValue: unref(state).pagina_inicial,
                                              "onUpdate:modelValue": ($event) => unref(state).pagina_inicial = $event,
                                              modelModifiers: { number: true },
                                              label: "Folha inicial",
                                              type: "number",
                                              required: "",
                                              min: "0",
                                              disabled: ""
                                            }, null, _parent7, _scopeId6));
                                          } else {
                                            return [
                                              createVNode(VTextField, {
                                                modelValue: unref(state).pagina_inicial,
                                                "onUpdate:modelValue": ($event) => unref(state).pagina_inicial = $event,
                                                modelModifiers: { number: true },
                                                label: "Folha inicial",
                                                type: "number",
                                                required: "",
                                                min: "0",
                                                disabled: ""
                                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                            ];
                                          }
                                        }),
                                        _: 1
                                      }, _parent6, _scopeId5));
                                      _push6(ssrRenderComponent(VCol, { md: "4" }, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(ssrRenderComponent(VTextField, {
                                              modelValue: unref(state).pagina_final,
                                              "onUpdate:modelValue": ($event) => unref(state).pagina_final = $event,
                                              modelModifiers: { number: true },
                                              label: "Folha Final",
                                              type: "number",
                                              min: "0",
                                              disabled: ""
                                            }, null, _parent7, _scopeId6));
                                          } else {
                                            return [
                                              createVNode(VTextField, {
                                                modelValue: unref(state).pagina_final,
                                                "onUpdate:modelValue": ($event) => unref(state).pagina_final = $event,
                                                modelModifiers: { number: true },
                                                label: "Folha Final",
                                                type: "number",
                                                min: "0",
                                                disabled: ""
                                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                            ];
                                          }
                                        }),
                                        _: 1
                                      }, _parent6, _scopeId5));
                                      _push6(ssrRenderComponent(VCol, { md: "4" }, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(ssrRenderComponent(VTextField, mergeProps({
                                              modelValue: unref(state).data,
                                              "onUpdate:modelValue": ($event) => unref(state).data = $event,
                                              placeholder: "dd/mm/yyyy",
                                              label: "Data"
                                            }, ssrGetDirectiveProps(_ctx, _directive_mask, "##/##/####")), null, _parent7, _scopeId6));
                                          } else {
                                            return [
                                              withDirectives(createVNode(VTextField, {
                                                modelValue: unref(state).data,
                                                "onUpdate:modelValue": ($event) => unref(state).data = $event,
                                                placeholder: "dd/mm/yyyy",
                                                label: "Data"
                                              }, null, 8, ["modelValue", "onUpdate:modelValue"]), [
                                                [_directive_mask, "##/##/####"]
                                              ])
                                            ];
                                          }
                                        }),
                                        _: 1
                                      }, _parent6, _scopeId5));
                                      _push6(ssrRenderComponent(VCol, { md: "4" }, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(ssrRenderComponent(VAutocomplete, {
                                              modelValue: unref(state).situacao_id,
                                              "onUpdate:modelValue": ($event) => unref(state).situacao_id = $event,
                                              items: unref(dados).situacaoItens,
                                              label: "Situa\xE7\xE3o",
                                              "item-title": "descricao",
                                              "item-value": "id"
                                            }, null, _parent7, _scopeId6));
                                          } else {
                                            return [
                                              createVNode(VAutocomplete, {
                                                modelValue: unref(state).situacao_id,
                                                "onUpdate:modelValue": ($event) => unref(state).situacao_id = $event,
                                                items: unref(dados).situacaoItens,
                                                label: "Situa\xE7\xE3o",
                                                "item-title": "descricao",
                                                "item-value": "id"
                                              }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                                            ];
                                          }
                                        }),
                                        _: 1
                                      }, _parent6, _scopeId5));
                                      _push6(ssrRenderComponent(VCol, { md: "4" }, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(ssrRenderComponent(VTextField, {
                                              modelValue: unref(state).descricao,
                                              "onUpdate:modelValue": ($event) => unref(state).descricao = $event,
                                              label: "Descri\xE7\xE3o",
                                              required: ""
                                            }, null, _parent7, _scopeId6));
                                          } else {
                                            return [
                                              createVNode(VTextField, {
                                                modelValue: unref(state).descricao,
                                                "onUpdate:modelValue": ($event) => unref(state).descricao = $event,
                                                label: "Descri\xE7\xE3o",
                                                required: ""
                                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                            ];
                                          }
                                        }),
                                        _: 1
                                      }, _parent6, _scopeId5));
                                      _push6(ssrRenderComponent(VCol, { md: "4" }, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(ssrRenderComponent(VTextField, {
                                              modelValue: unref(state).cnm,
                                              "onUpdate:modelValue": ($event) => unref(state).cnm = $event,
                                              label: "CNM",
                                              required: ""
                                            }, null, _parent7, _scopeId6));
                                          } else {
                                            return [
                                              createVNode(VTextField, {
                                                modelValue: unref(state).cnm,
                                                "onUpdate:modelValue": ($event) => unref(state).cnm = $event,
                                                label: "CNM",
                                                required: ""
                                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                            ];
                                          }
                                        }),
                                        _: 1
                                      }, _parent6, _scopeId5));
                                      _push6(ssrRenderComponent(VCol, { md: "4" }, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(ssrRenderComponent(VTextField, {
                                              modelValue: unref(state).observacao,
                                              "onUpdate:modelValue": ($event) => unref(state).observacao = $event,
                                              label: "Observa\xE7\xE3o",
                                              required: ""
                                            }, null, _parent7, _scopeId6));
                                          } else {
                                            return [
                                              createVNode(VTextField, {
                                                modelValue: unref(state).observacao,
                                                "onUpdate:modelValue": ($event) => unref(state).observacao = $event,
                                                label: "Observa\xE7\xE3o",
                                                required: ""
                                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                            ];
                                          }
                                        }),
                                        _: 1
                                      }, _parent6, _scopeId5));
                                    } else {
                                      return [
                                        createVNode(VCol, { md: "6" }, {
                                          default: withCtx(() => [
                                            createVNode(VTextField, {
                                              modelValue: unref(state).numero,
                                              "onUpdate:modelValue": ($event) => unref(state).numero = $event,
                                              label: "Matr\xEDcula",
                                              required: ""
                                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(VCol, { md: "4" }, {
                                          default: withCtx(() => [
                                            createVNode(VTextField, {
                                              modelValue: unref(state).protocolo,
                                              "onUpdate:modelValue": ($event) => unref(state).protocolo = $event,
                                              label: "Protocolo",
                                              required: "",
                                              disabled: ""
                                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(VCol, { md: "4" }, {
                                          default: withCtx(() => [
                                            createVNode(VAutocomplete, {
                                              modelValue: unref(state).livro_id,
                                              "onUpdate:modelValue": ($event) => unref(state).livro_id = $event,
                                              items: unref(dados).livroItens.data,
                                              label: "Livro",
                                              "item-title": "descricao",
                                              "item-value": "id",
                                              disabled: ""
                                            }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(VCol, { md: "4" }, {
                                          default: withCtx(() => [
                                            createVNode(VTextField, {
                                              modelValue: unref(state).pagina_inicial,
                                              "onUpdate:modelValue": ($event) => unref(state).pagina_inicial = $event,
                                              modelModifiers: { number: true },
                                              label: "Folha inicial",
                                              type: "number",
                                              required: "",
                                              min: "0",
                                              disabled: ""
                                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(VCol, { md: "4" }, {
                                          default: withCtx(() => [
                                            createVNode(VTextField, {
                                              modelValue: unref(state).pagina_final,
                                              "onUpdate:modelValue": ($event) => unref(state).pagina_final = $event,
                                              modelModifiers: { number: true },
                                              label: "Folha Final",
                                              type: "number",
                                              min: "0",
                                              disabled: ""
                                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(VCol, { md: "4" }, {
                                          default: withCtx(() => [
                                            withDirectives(createVNode(VTextField, {
                                              modelValue: unref(state).data,
                                              "onUpdate:modelValue": ($event) => unref(state).data = $event,
                                              placeholder: "dd/mm/yyyy",
                                              label: "Data"
                                            }, null, 8, ["modelValue", "onUpdate:modelValue"]), [
                                              [_directive_mask, "##/##/####"]
                                            ])
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(VCol, { md: "4" }, {
                                          default: withCtx(() => [
                                            createVNode(VAutocomplete, {
                                              modelValue: unref(state).situacao_id,
                                              "onUpdate:modelValue": ($event) => unref(state).situacao_id = $event,
                                              items: unref(dados).situacaoItens,
                                              label: "Situa\xE7\xE3o",
                                              "item-title": "descricao",
                                              "item-value": "id"
                                            }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(VCol, { md: "4" }, {
                                          default: withCtx(() => [
                                            createVNode(VTextField, {
                                              modelValue: unref(state).descricao,
                                              "onUpdate:modelValue": ($event) => unref(state).descricao = $event,
                                              label: "Descri\xE7\xE3o",
                                              required: ""
                                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(VCol, { md: "4" }, {
                                          default: withCtx(() => [
                                            createVNode(VTextField, {
                                              modelValue: unref(state).cnm,
                                              "onUpdate:modelValue": ($event) => unref(state).cnm = $event,
                                              label: "CNM",
                                              required: ""
                                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(VCol, { md: "4" }, {
                                          default: withCtx(() => [
                                            createVNode(VTextField, {
                                              modelValue: unref(state).observacao,
                                              "onUpdate:modelValue": ($event) => unref(state).observacao = $event,
                                              label: "Observa\xE7\xE3o",
                                              required: ""
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
                                      _push6(ssrRenderComponent(VBtn, {
                                        onClick: voltar,
                                        size: "large",
                                        color: "red"
                                      }, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(`Voltar`);
                                          } else {
                                            return [
                                              createTextVNode("Voltar")
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
                                      createVNode(VCol, { md: "6" }, {
                                        default: withCtx(() => [
                                          createVNode(VTextField, {
                                            modelValue: unref(state).numero,
                                            "onUpdate:modelValue": ($event) => unref(state).numero = $event,
                                            label: "Matr\xEDcula",
                                            required: ""
                                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(VCol, { md: "4" }, {
                                        default: withCtx(() => [
                                          createVNode(VTextField, {
                                            modelValue: unref(state).protocolo,
                                            "onUpdate:modelValue": ($event) => unref(state).protocolo = $event,
                                            label: "Protocolo",
                                            required: "",
                                            disabled: ""
                                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(VCol, { md: "4" }, {
                                        default: withCtx(() => [
                                          createVNode(VAutocomplete, {
                                            modelValue: unref(state).livro_id,
                                            "onUpdate:modelValue": ($event) => unref(state).livro_id = $event,
                                            items: unref(dados).livroItens.data,
                                            label: "Livro",
                                            "item-title": "descricao",
                                            "item-value": "id",
                                            disabled: ""
                                          }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(VCol, { md: "4" }, {
                                        default: withCtx(() => [
                                          createVNode(VTextField, {
                                            modelValue: unref(state).pagina_inicial,
                                            "onUpdate:modelValue": ($event) => unref(state).pagina_inicial = $event,
                                            modelModifiers: { number: true },
                                            label: "Folha inicial",
                                            type: "number",
                                            required: "",
                                            min: "0",
                                            disabled: ""
                                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(VCol, { md: "4" }, {
                                        default: withCtx(() => [
                                          createVNode(VTextField, {
                                            modelValue: unref(state).pagina_final,
                                            "onUpdate:modelValue": ($event) => unref(state).pagina_final = $event,
                                            modelModifiers: { number: true },
                                            label: "Folha Final",
                                            type: "number",
                                            min: "0",
                                            disabled: ""
                                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(VCol, { md: "4" }, {
                                        default: withCtx(() => [
                                          withDirectives(createVNode(VTextField, {
                                            modelValue: unref(state).data,
                                            "onUpdate:modelValue": ($event) => unref(state).data = $event,
                                            placeholder: "dd/mm/yyyy",
                                            label: "Data"
                                          }, null, 8, ["modelValue", "onUpdate:modelValue"]), [
                                            [_directive_mask, "##/##/####"]
                                          ])
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(VCol, { md: "4" }, {
                                        default: withCtx(() => [
                                          createVNode(VAutocomplete, {
                                            modelValue: unref(state).situacao_id,
                                            "onUpdate:modelValue": ($event) => unref(state).situacao_id = $event,
                                            items: unref(dados).situacaoItens,
                                            label: "Situa\xE7\xE3o",
                                            "item-title": "descricao",
                                            "item-value": "id"
                                          }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(VCol, { md: "4" }, {
                                        default: withCtx(() => [
                                          createVNode(VTextField, {
                                            modelValue: unref(state).descricao,
                                            "onUpdate:modelValue": ($event) => unref(state).descricao = $event,
                                            label: "Descri\xE7\xE3o",
                                            required: ""
                                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(VCol, { md: "4" }, {
                                        default: withCtx(() => [
                                          createVNode(VTextField, {
                                            modelValue: unref(state).cnm,
                                            "onUpdate:modelValue": ($event) => unref(state).cnm = $event,
                                            label: "CNM",
                                            required: ""
                                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(VCol, { md: "4" }, {
                                        default: withCtx(() => [
                                          createVNode(VTextField, {
                                            modelValue: unref(state).observacao,
                                            "onUpdate:modelValue": ($event) => unref(state).observacao = $event,
                                            label: "Observa\xE7\xE3o",
                                            required: ""
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
                        } else {
                          _push4(`<!---->`);
                        }
                      } else {
                        return [
                          !unref(pending) ? (openBlock(), createBlock(VContainer, { key: 0 }, {
                            default: withCtx(() => [
                              createVNode(VRow, null, {
                                default: withCtx(() => [
                                  createVNode(VCol, { md: "6" }, {
                                    default: withCtx(() => [
                                      createVNode(VTextField, {
                                        modelValue: unref(state).numero,
                                        "onUpdate:modelValue": ($event) => unref(state).numero = $event,
                                        label: "Matr\xEDcula",
                                        required: ""
                                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(VCol, { md: "4" }, {
                                    default: withCtx(() => [
                                      createVNode(VTextField, {
                                        modelValue: unref(state).protocolo,
                                        "onUpdate:modelValue": ($event) => unref(state).protocolo = $event,
                                        label: "Protocolo",
                                        required: "",
                                        disabled: ""
                                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(VCol, { md: "4" }, {
                                    default: withCtx(() => [
                                      createVNode(VAutocomplete, {
                                        modelValue: unref(state).livro_id,
                                        "onUpdate:modelValue": ($event) => unref(state).livro_id = $event,
                                        items: unref(dados).livroItens.data,
                                        label: "Livro",
                                        "item-title": "descricao",
                                        "item-value": "id",
                                        disabled: ""
                                      }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(VCol, { md: "4" }, {
                                    default: withCtx(() => [
                                      createVNode(VTextField, {
                                        modelValue: unref(state).pagina_inicial,
                                        "onUpdate:modelValue": ($event) => unref(state).pagina_inicial = $event,
                                        modelModifiers: { number: true },
                                        label: "Folha inicial",
                                        type: "number",
                                        required: "",
                                        min: "0",
                                        disabled: ""
                                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(VCol, { md: "4" }, {
                                    default: withCtx(() => [
                                      createVNode(VTextField, {
                                        modelValue: unref(state).pagina_final,
                                        "onUpdate:modelValue": ($event) => unref(state).pagina_final = $event,
                                        modelModifiers: { number: true },
                                        label: "Folha Final",
                                        type: "number",
                                        min: "0",
                                        disabled: ""
                                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(VCol, { md: "4" }, {
                                    default: withCtx(() => [
                                      withDirectives(createVNode(VTextField, {
                                        modelValue: unref(state).data,
                                        "onUpdate:modelValue": ($event) => unref(state).data = $event,
                                        placeholder: "dd/mm/yyyy",
                                        label: "Data"
                                      }, null, 8, ["modelValue", "onUpdate:modelValue"]), [
                                        [_directive_mask, "##/##/####"]
                                      ])
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(VCol, { md: "4" }, {
                                    default: withCtx(() => [
                                      createVNode(VAutocomplete, {
                                        modelValue: unref(state).situacao_id,
                                        "onUpdate:modelValue": ($event) => unref(state).situacao_id = $event,
                                        items: unref(dados).situacaoItens,
                                        label: "Situa\xE7\xE3o",
                                        "item-title": "descricao",
                                        "item-value": "id"
                                      }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(VCol, { md: "4" }, {
                                    default: withCtx(() => [
                                      createVNode(VTextField, {
                                        modelValue: unref(state).descricao,
                                        "onUpdate:modelValue": ($event) => unref(state).descricao = $event,
                                        label: "Descri\xE7\xE3o",
                                        required: ""
                                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(VCol, { md: "4" }, {
                                    default: withCtx(() => [
                                      createVNode(VTextField, {
                                        modelValue: unref(state).cnm,
                                        "onUpdate:modelValue": ($event) => unref(state).cnm = $event,
                                        label: "CNM",
                                        required: ""
                                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(VCol, { md: "4" }, {
                                    default: withCtx(() => [
                                      createVNode(VTextField, {
                                        modelValue: unref(state).observacao,
                                        "onUpdate:modelValue": ($event) => unref(state).observacao = $event,
                                        label: "Observa\xE7\xE3o",
                                        required: ""
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
                          })) : createCommentVNode("", true)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VTabsWindowItem, { value: "enderecos" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VContainer, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VRow, null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(VCol, { md: "4" }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(VTextField, {
                                            modelValue: unref(state).inscricao_municipal,
                                            "onUpdate:modelValue": ($event) => unref(state).inscricao_municipal = $event,
                                            label: "Inscri\xE7\xE3o Municipal",
                                            required: ""
                                          }, null, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(VTextField, {
                                              modelValue: unref(state).inscricao_municipal,
                                              "onUpdate:modelValue": ($event) => unref(state).inscricao_municipal = $event,
                                              label: "Inscri\xE7\xE3o Municipal",
                                              required: ""
                                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(VCol, { md: "4" }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(VAutocomplete, {
                                            modelValue: unref(state).tabvalores_natureza_id,
                                            "onUpdate:modelValue": ($event) => unref(state).tabvalores_natureza_id = $event,
                                            items: unref(dados).naturezaImoveisItens,
                                            label: "Natureza Imovel",
                                            "item-title": "descricao",
                                            "item-value": "id"
                                          }, null, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(VAutocomplete, {
                                              modelValue: unref(state).tabvalores_natureza_id,
                                              "onUpdate:modelValue": ($event) => unref(state).tabvalores_natureza_id = $event,
                                              items: unref(dados).naturezaImoveisItens,
                                              label: "Natureza Imovel",
                                              "item-title": "descricao",
                                              "item-value": "id"
                                            }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(VCol, { md: "4" }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(VAutocomplete, {
                                            modelValue: unref(state).tabvalores_tipologradouro_id,
                                            "onUpdate:modelValue": ($event) => unref(state).tabvalores_tipologradouro_id = $event,
                                            items: unref(dados).tipoLogradouroItens,
                                            label: "Tipo de Logradouro",
                                            "item-title": "descricao",
                                            "item-value": "id"
                                          }, null, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(VAutocomplete, {
                                              modelValue: unref(state).tabvalores_tipologradouro_id,
                                              "onUpdate:modelValue": ($event) => unref(state).tabvalores_tipologradouro_id = $event,
                                              items: unref(dados).tipoLogradouroItens,
                                              label: "Tipo de Logradouro",
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
                                      createVNode(VCol, { md: "4" }, {
                                        default: withCtx(() => [
                                          createVNode(VTextField, {
                                            modelValue: unref(state).inscricao_municipal,
                                            "onUpdate:modelValue": ($event) => unref(state).inscricao_municipal = $event,
                                            label: "Inscri\xE7\xE3o Municipal",
                                            required: ""
                                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(VCol, { md: "4" }, {
                                        default: withCtx(() => [
                                          createVNode(VAutocomplete, {
                                            modelValue: unref(state).tabvalores_natureza_id,
                                            "onUpdate:modelValue": ($event) => unref(state).tabvalores_natureza_id = $event,
                                            items: unref(dados).naturezaImoveisItens,
                                            label: "Natureza Imovel",
                                            "item-title": "descricao",
                                            "item-value": "id"
                                          }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(VCol, { md: "4" }, {
                                        default: withCtx(() => [
                                          createVNode(VAutocomplete, {
                                            modelValue: unref(state).tabvalores_tipologradouro_id,
                                            "onUpdate:modelValue": ($event) => unref(state).tabvalores_tipologradouro_id = $event,
                                            items: unref(dados).tipoLogradouroItens,
                                            label: "Tipo de Logradouro",
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
                                    _push6(ssrRenderComponent(VCol, { md: "4" }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(VTextField, {
                                            modelValue: unref(state).end_logradouro,
                                            "onUpdate:modelValue": ($event) => unref(state).end_logradouro = $event,
                                            label: "Endere\xE7o",
                                            required: ""
                                          }, null, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(VTextField, {
                                              modelValue: unref(state).end_logradouro,
                                              "onUpdate:modelValue": ($event) => unref(state).end_logradouro = $event,
                                              label: "Endere\xE7o",
                                              required: ""
                                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(VCol, { md: "4" }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(VTextField, {
                                            modelValue: unref(state).end_logradouro_numero,
                                            "onUpdate:modelValue": ($event) => unref(state).end_logradouro_numero = $event,
                                            label: "Numero",
                                            required: ""
                                          }, null, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(VTextField, {
                                              modelValue: unref(state).end_logradouro_numero,
                                              "onUpdate:modelValue": ($event) => unref(state).end_logradouro_numero = $event,
                                              label: "Numero",
                                              required: ""
                                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(VCol, { md: "4" }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(VTextField, {
                                            modelValue: unref(state).end_bairro,
                                            "onUpdate:modelValue": ($event) => unref(state).end_bairro = $event,
                                            label: "Bairro",
                                            required: ""
                                          }, null, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(VTextField, {
                                              modelValue: unref(state).end_bairro,
                                              "onUpdate:modelValue": ($event) => unref(state).end_bairro = $event,
                                              label: "Bairro",
                                              required: ""
                                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(VCol, { md: "4" }, {
                                        default: withCtx(() => [
                                          createVNode(VTextField, {
                                            modelValue: unref(state).end_logradouro,
                                            "onUpdate:modelValue": ($event) => unref(state).end_logradouro = $event,
                                            label: "Endere\xE7o",
                                            required: ""
                                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(VCol, { md: "4" }, {
                                        default: withCtx(() => [
                                          createVNode(VTextField, {
                                            modelValue: unref(state).end_logradouro_numero,
                                            "onUpdate:modelValue": ($event) => unref(state).end_logradouro_numero = $event,
                                            label: "Numero",
                                            required: ""
                                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(VCol, { md: "4" }, {
                                        default: withCtx(() => [
                                          createVNode(VTextField, {
                                            modelValue: unref(state).end_bairro,
                                            "onUpdate:modelValue": ($event) => unref(state).end_bairro = $event,
                                            label: "Bairro",
                                            required: ""
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
                                    _push6(ssrRenderComponent(VCol, { md: "4" }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(VAutocomplete, {
                                            modelValue: unref(state).end_cidade_id,
                                            "onUpdate:modelValue": ($event) => unref(state).end_cidade_id = $event,
                                            items: unref(dados).cidadesItens,
                                            label: "Cidade",
                                            "item-title": "descricao",
                                            "item-value": "id"
                                          }, null, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(VAutocomplete, {
                                              modelValue: unref(state).end_cidade_id,
                                              "onUpdate:modelValue": ($event) => unref(state).end_cidade_id = $event,
                                              items: unref(dados).cidadesItens,
                                              label: "Cidade",
                                              "item-title": "descricao",
                                              "item-value": "id"
                                            }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(VCol, { md: "4" }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(VTextField, {
                                            modelValue: unref(state).end_cep,
                                            "onUpdate:modelValue": ($event) => unref(state).end_cep = $event,
                                            label: "CEP",
                                            required: ""
                                          }, null, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(VTextField, {
                                              modelValue: unref(state).end_cep,
                                              "onUpdate:modelValue": ($event) => unref(state).end_cep = $event,
                                              label: "CEP",
                                              required: ""
                                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(VCol, { md: "4" }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(VTextField, {
                                            modelValue: unref(state).end_complemento,
                                            "onUpdate:modelValue": ($event) => unref(state).end_complemento = $event,
                                            label: "Complemento",
                                            required: ""
                                          }, null, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(VTextField, {
                                              modelValue: unref(state).end_complemento,
                                              "onUpdate:modelValue": ($event) => unref(state).end_complemento = $event,
                                              label: "Complemento",
                                              required: ""
                                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(VCol, { md: "4" }, {
                                        default: withCtx(() => [
                                          createVNode(VAutocomplete, {
                                            modelValue: unref(state).end_cidade_id,
                                            "onUpdate:modelValue": ($event) => unref(state).end_cidade_id = $event,
                                            items: unref(dados).cidadesItens,
                                            label: "Cidade",
                                            "item-title": "descricao",
                                            "item-value": "id"
                                          }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(VCol, { md: "4" }, {
                                        default: withCtx(() => [
                                          createVNode(VTextField, {
                                            modelValue: unref(state).end_cep,
                                            "onUpdate:modelValue": ($event) => unref(state).end_cep = $event,
                                            label: "CEP",
                                            required: ""
                                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(VCol, { md: "4" }, {
                                        default: withCtx(() => [
                                          createVNode(VTextField, {
                                            modelValue: unref(state).end_complemento,
                                            "onUpdate:modelValue": ($event) => unref(state).end_complemento = $event,
                                            label: "Complemento",
                                            required: ""
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
                                    _push6(ssrRenderComponent(VCol, { md: "4" }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(VTextField, {
                                            modelValue: unref(state).end_quadra,
                                            "onUpdate:modelValue": ($event) => unref(state).end_quadra = $event,
                                            label: "Quadra",
                                            required: ""
                                          }, null, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(VTextField, {
                                              modelValue: unref(state).end_quadra,
                                              "onUpdate:modelValue": ($event) => unref(state).end_quadra = $event,
                                              label: "Quadra",
                                              required: ""
                                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(VCol, { md: "4" }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(VTextField, {
                                            modelValue: unref(state).end_lote,
                                            "onUpdate:modelValue": ($event) => unref(state).end_lote = $event,
                                            label: "Lote",
                                            required: ""
                                          }, null, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(VTextField, {
                                              modelValue: unref(state).end_lote,
                                              "onUpdate:modelValue": ($event) => unref(state).end_lote = $event,
                                              label: "Lote",
                                              required: ""
                                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(VCol, { md: "4" }, {
                                        default: withCtx(() => [
                                          createVNode(VTextField, {
                                            modelValue: unref(state).end_quadra,
                                            "onUpdate:modelValue": ($event) => unref(state).end_quadra = $event,
                                            label: "Quadra",
                                            required: ""
                                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(VCol, { md: "4" }, {
                                        default: withCtx(() => [
                                          createVNode(VTextField, {
                                            modelValue: unref(state).end_lote,
                                            "onUpdate:modelValue": ($event) => unref(state).end_lote = $event,
                                            label: "Lote",
                                            required: ""
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
                                    _push6(ssrRenderComponent(VBtn, {
                                      onClick: voltar,
                                      size: "large",
                                      color: "red"
                                    }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`Voltar`);
                                        } else {
                                          return [
                                            createTextVNode("Voltar")
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
                                    createVNode(VCol, { md: "4" }, {
                                      default: withCtx(() => [
                                        createVNode(VTextField, {
                                          modelValue: unref(state).inscricao_municipal,
                                          "onUpdate:modelValue": ($event) => unref(state).inscricao_municipal = $event,
                                          label: "Inscri\xE7\xE3o Municipal",
                                          required: ""
                                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(VCol, { md: "4" }, {
                                      default: withCtx(() => [
                                        createVNode(VAutocomplete, {
                                          modelValue: unref(state).tabvalores_natureza_id,
                                          "onUpdate:modelValue": ($event) => unref(state).tabvalores_natureza_id = $event,
                                          items: unref(dados).naturezaImoveisItens,
                                          label: "Natureza Imovel",
                                          "item-title": "descricao",
                                          "item-value": "id"
                                        }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(VCol, { md: "4" }, {
                                      default: withCtx(() => [
                                        createVNode(VAutocomplete, {
                                          modelValue: unref(state).tabvalores_tipologradouro_id,
                                          "onUpdate:modelValue": ($event) => unref(state).tabvalores_tipologradouro_id = $event,
                                          items: unref(dados).tipoLogradouroItens,
                                          label: "Tipo de Logradouro",
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
                                        createVNode(VTextField, {
                                          modelValue: unref(state).end_logradouro,
                                          "onUpdate:modelValue": ($event) => unref(state).end_logradouro = $event,
                                          label: "Endere\xE7o",
                                          required: ""
                                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(VCol, { md: "4" }, {
                                      default: withCtx(() => [
                                        createVNode(VTextField, {
                                          modelValue: unref(state).end_logradouro_numero,
                                          "onUpdate:modelValue": ($event) => unref(state).end_logradouro_numero = $event,
                                          label: "Numero",
                                          required: ""
                                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(VCol, { md: "4" }, {
                                      default: withCtx(() => [
                                        createVNode(VTextField, {
                                          modelValue: unref(state).end_bairro,
                                          "onUpdate:modelValue": ($event) => unref(state).end_bairro = $event,
                                          label: "Bairro",
                                          required: ""
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
                                        createVNode(VAutocomplete, {
                                          modelValue: unref(state).end_cidade_id,
                                          "onUpdate:modelValue": ($event) => unref(state).end_cidade_id = $event,
                                          items: unref(dados).cidadesItens,
                                          label: "Cidade",
                                          "item-title": "descricao",
                                          "item-value": "id"
                                        }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(VCol, { md: "4" }, {
                                      default: withCtx(() => [
                                        createVNode(VTextField, {
                                          modelValue: unref(state).end_cep,
                                          "onUpdate:modelValue": ($event) => unref(state).end_cep = $event,
                                          label: "CEP",
                                          required: ""
                                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(VCol, { md: "4" }, {
                                      default: withCtx(() => [
                                        createVNode(VTextField, {
                                          modelValue: unref(state).end_complemento,
                                          "onUpdate:modelValue": ($event) => unref(state).end_complemento = $event,
                                          label: "Complemento",
                                          required: ""
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
                                          modelValue: unref(state).end_quadra,
                                          "onUpdate:modelValue": ($event) => unref(state).end_quadra = $event,
                                          label: "Quadra",
                                          required: ""
                                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(VCol, { md: "4" }, {
                                      default: withCtx(() => [
                                        createVNode(VTextField, {
                                          modelValue: unref(state).end_lote,
                                          "onUpdate:modelValue": ($event) => unref(state).end_lote = $event,
                                          label: "Lote",
                                          required: ""
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
                      } else {
                        return [
                          createVNode(VContainer, null, {
                            default: withCtx(() => [
                              createVNode(VRow, null, {
                                default: withCtx(() => [
                                  createVNode(VCol, { md: "4" }, {
                                    default: withCtx(() => [
                                      createVNode(VTextField, {
                                        modelValue: unref(state).inscricao_municipal,
                                        "onUpdate:modelValue": ($event) => unref(state).inscricao_municipal = $event,
                                        label: "Inscri\xE7\xE3o Municipal",
                                        required: ""
                                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(VCol, { md: "4" }, {
                                    default: withCtx(() => [
                                      createVNode(VAutocomplete, {
                                        modelValue: unref(state).tabvalores_natureza_id,
                                        "onUpdate:modelValue": ($event) => unref(state).tabvalores_natureza_id = $event,
                                        items: unref(dados).naturezaImoveisItens,
                                        label: "Natureza Imovel",
                                        "item-title": "descricao",
                                        "item-value": "id"
                                      }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(VCol, { md: "4" }, {
                                    default: withCtx(() => [
                                      createVNode(VAutocomplete, {
                                        modelValue: unref(state).tabvalores_tipologradouro_id,
                                        "onUpdate:modelValue": ($event) => unref(state).tabvalores_tipologradouro_id = $event,
                                        items: unref(dados).tipoLogradouroItens,
                                        label: "Tipo de Logradouro",
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
                                      createVNode(VTextField, {
                                        modelValue: unref(state).end_logradouro,
                                        "onUpdate:modelValue": ($event) => unref(state).end_logradouro = $event,
                                        label: "Endere\xE7o",
                                        required: ""
                                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(VCol, { md: "4" }, {
                                    default: withCtx(() => [
                                      createVNode(VTextField, {
                                        modelValue: unref(state).end_logradouro_numero,
                                        "onUpdate:modelValue": ($event) => unref(state).end_logradouro_numero = $event,
                                        label: "Numero",
                                        required: ""
                                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(VCol, { md: "4" }, {
                                    default: withCtx(() => [
                                      createVNode(VTextField, {
                                        modelValue: unref(state).end_bairro,
                                        "onUpdate:modelValue": ($event) => unref(state).end_bairro = $event,
                                        label: "Bairro",
                                        required: ""
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
                                      createVNode(VAutocomplete, {
                                        modelValue: unref(state).end_cidade_id,
                                        "onUpdate:modelValue": ($event) => unref(state).end_cidade_id = $event,
                                        items: unref(dados).cidadesItens,
                                        label: "Cidade",
                                        "item-title": "descricao",
                                        "item-value": "id"
                                      }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(VCol, { md: "4" }, {
                                    default: withCtx(() => [
                                      createVNode(VTextField, {
                                        modelValue: unref(state).end_cep,
                                        "onUpdate:modelValue": ($event) => unref(state).end_cep = $event,
                                        label: "CEP",
                                        required: ""
                                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(VCol, { md: "4" }, {
                                    default: withCtx(() => [
                                      createVNode(VTextField, {
                                        modelValue: unref(state).end_complemento,
                                        "onUpdate:modelValue": ($event) => unref(state).end_complemento = $event,
                                        label: "Complemento",
                                        required: ""
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
                                        modelValue: unref(state).end_quadra,
                                        "onUpdate:modelValue": ($event) => unref(state).end_quadra = $event,
                                        label: "Quadra",
                                        required: ""
                                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(VCol, { md: "4" }, {
                                    default: withCtx(() => [
                                      createVNode(VTextField, {
                                        modelValue: unref(state).end_lote,
                                        "onUpdate:modelValue": ($event) => unref(state).end_lote = $event,
                                        label: "Lote",
                                        required: ""
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
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VTabsWindowItem, { value: "dados" }, {
                      default: withCtx(() => [
                        !unref(pending) ? (openBlock(), createBlock(VContainer, { key: 0 }, {
                          default: withCtx(() => [
                            createVNode(VRow, null, {
                              default: withCtx(() => [
                                createVNode(VCol, { md: "6" }, {
                                  default: withCtx(() => [
                                    createVNode(VTextField, {
                                      modelValue: unref(state).numero,
                                      "onUpdate:modelValue": ($event) => unref(state).numero = $event,
                                      label: "Matr\xEDcula",
                                      required: ""
                                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                  ]),
                                  _: 1
                                }),
                                createVNode(VCol, { md: "4" }, {
                                  default: withCtx(() => [
                                    createVNode(VTextField, {
                                      modelValue: unref(state).protocolo,
                                      "onUpdate:modelValue": ($event) => unref(state).protocolo = $event,
                                      label: "Protocolo",
                                      required: "",
                                      disabled: ""
                                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                  ]),
                                  _: 1
                                }),
                                createVNode(VCol, { md: "4" }, {
                                  default: withCtx(() => [
                                    createVNode(VAutocomplete, {
                                      modelValue: unref(state).livro_id,
                                      "onUpdate:modelValue": ($event) => unref(state).livro_id = $event,
                                      items: unref(dados).livroItens.data,
                                      label: "Livro",
                                      "item-title": "descricao",
                                      "item-value": "id",
                                      disabled: ""
                                    }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                                  ]),
                                  _: 1
                                }),
                                createVNode(VCol, { md: "4" }, {
                                  default: withCtx(() => [
                                    createVNode(VTextField, {
                                      modelValue: unref(state).pagina_inicial,
                                      "onUpdate:modelValue": ($event) => unref(state).pagina_inicial = $event,
                                      modelModifiers: { number: true },
                                      label: "Folha inicial",
                                      type: "number",
                                      required: "",
                                      min: "0",
                                      disabled: ""
                                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                  ]),
                                  _: 1
                                }),
                                createVNode(VCol, { md: "4" }, {
                                  default: withCtx(() => [
                                    createVNode(VTextField, {
                                      modelValue: unref(state).pagina_final,
                                      "onUpdate:modelValue": ($event) => unref(state).pagina_final = $event,
                                      modelModifiers: { number: true },
                                      label: "Folha Final",
                                      type: "number",
                                      min: "0",
                                      disabled: ""
                                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                  ]),
                                  _: 1
                                }),
                                createVNode(VCol, { md: "4" }, {
                                  default: withCtx(() => [
                                    withDirectives(createVNode(VTextField, {
                                      modelValue: unref(state).data,
                                      "onUpdate:modelValue": ($event) => unref(state).data = $event,
                                      placeholder: "dd/mm/yyyy",
                                      label: "Data"
                                    }, null, 8, ["modelValue", "onUpdate:modelValue"]), [
                                      [_directive_mask, "##/##/####"]
                                    ])
                                  ]),
                                  _: 1
                                }),
                                createVNode(VCol, { md: "4" }, {
                                  default: withCtx(() => [
                                    createVNode(VAutocomplete, {
                                      modelValue: unref(state).situacao_id,
                                      "onUpdate:modelValue": ($event) => unref(state).situacao_id = $event,
                                      items: unref(dados).situacaoItens,
                                      label: "Situa\xE7\xE3o",
                                      "item-title": "descricao",
                                      "item-value": "id"
                                    }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                                  ]),
                                  _: 1
                                }),
                                createVNode(VCol, { md: "4" }, {
                                  default: withCtx(() => [
                                    createVNode(VTextField, {
                                      modelValue: unref(state).descricao,
                                      "onUpdate:modelValue": ($event) => unref(state).descricao = $event,
                                      label: "Descri\xE7\xE3o",
                                      required: ""
                                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                  ]),
                                  _: 1
                                }),
                                createVNode(VCol, { md: "4" }, {
                                  default: withCtx(() => [
                                    createVNode(VTextField, {
                                      modelValue: unref(state).cnm,
                                      "onUpdate:modelValue": ($event) => unref(state).cnm = $event,
                                      label: "CNM",
                                      required: ""
                                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                  ]),
                                  _: 1
                                }),
                                createVNode(VCol, { md: "4" }, {
                                  default: withCtx(() => [
                                    createVNode(VTextField, {
                                      modelValue: unref(state).observacao,
                                      "onUpdate:modelValue": ($event) => unref(state).observacao = $event,
                                      label: "Observa\xE7\xE3o",
                                      required: ""
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
                        })) : createCommentVNode("", true)
                      ]),
                      _: 1
                    }),
                    createVNode(VTabsWindowItem, { value: "enderecos" }, {
                      default: withCtx(() => [
                        createVNode(VContainer, null, {
                          default: withCtx(() => [
                            createVNode(VRow, null, {
                              default: withCtx(() => [
                                createVNode(VCol, { md: "4" }, {
                                  default: withCtx(() => [
                                    createVNode(VTextField, {
                                      modelValue: unref(state).inscricao_municipal,
                                      "onUpdate:modelValue": ($event) => unref(state).inscricao_municipal = $event,
                                      label: "Inscri\xE7\xE3o Municipal",
                                      required: ""
                                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                  ]),
                                  _: 1
                                }),
                                createVNode(VCol, { md: "4" }, {
                                  default: withCtx(() => [
                                    createVNode(VAutocomplete, {
                                      modelValue: unref(state).tabvalores_natureza_id,
                                      "onUpdate:modelValue": ($event) => unref(state).tabvalores_natureza_id = $event,
                                      items: unref(dados).naturezaImoveisItens,
                                      label: "Natureza Imovel",
                                      "item-title": "descricao",
                                      "item-value": "id"
                                    }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                                  ]),
                                  _: 1
                                }),
                                createVNode(VCol, { md: "4" }, {
                                  default: withCtx(() => [
                                    createVNode(VAutocomplete, {
                                      modelValue: unref(state).tabvalores_tipologradouro_id,
                                      "onUpdate:modelValue": ($event) => unref(state).tabvalores_tipologradouro_id = $event,
                                      items: unref(dados).tipoLogradouroItens,
                                      label: "Tipo de Logradouro",
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
                                    createVNode(VTextField, {
                                      modelValue: unref(state).end_logradouro,
                                      "onUpdate:modelValue": ($event) => unref(state).end_logradouro = $event,
                                      label: "Endere\xE7o",
                                      required: ""
                                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                  ]),
                                  _: 1
                                }),
                                createVNode(VCol, { md: "4" }, {
                                  default: withCtx(() => [
                                    createVNode(VTextField, {
                                      modelValue: unref(state).end_logradouro_numero,
                                      "onUpdate:modelValue": ($event) => unref(state).end_logradouro_numero = $event,
                                      label: "Numero",
                                      required: ""
                                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                  ]),
                                  _: 1
                                }),
                                createVNode(VCol, { md: "4" }, {
                                  default: withCtx(() => [
                                    createVNode(VTextField, {
                                      modelValue: unref(state).end_bairro,
                                      "onUpdate:modelValue": ($event) => unref(state).end_bairro = $event,
                                      label: "Bairro",
                                      required: ""
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
                                    createVNode(VAutocomplete, {
                                      modelValue: unref(state).end_cidade_id,
                                      "onUpdate:modelValue": ($event) => unref(state).end_cidade_id = $event,
                                      items: unref(dados).cidadesItens,
                                      label: "Cidade",
                                      "item-title": "descricao",
                                      "item-value": "id"
                                    }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                                  ]),
                                  _: 1
                                }),
                                createVNode(VCol, { md: "4" }, {
                                  default: withCtx(() => [
                                    createVNode(VTextField, {
                                      modelValue: unref(state).end_cep,
                                      "onUpdate:modelValue": ($event) => unref(state).end_cep = $event,
                                      label: "CEP",
                                      required: ""
                                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                  ]),
                                  _: 1
                                }),
                                createVNode(VCol, { md: "4" }, {
                                  default: withCtx(() => [
                                    createVNode(VTextField, {
                                      modelValue: unref(state).end_complemento,
                                      "onUpdate:modelValue": ($event) => unref(state).end_complemento = $event,
                                      label: "Complemento",
                                      required: ""
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
                                      modelValue: unref(state).end_quadra,
                                      "onUpdate:modelValue": ($event) => unref(state).end_quadra = $event,
                                      label: "Quadra",
                                      required: ""
                                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                  ]),
                                  _: 1
                                }),
                                createVNode(VCol, { md: "4" }, {
                                  default: withCtx(() => [
                                    createVNode(VTextField, {
                                      modelValue: unref(state).end_lote,
                                      "onUpdate:modelValue": ($event) => unref(state).end_lote = $event,
                                      label: "Lote",
                                      required: ""
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
              createVNode("h1", { style: { "background-color": "#f5f2f2", "color": "#525050", "padding": "5px 0px 0px 20px" } }, " Atualiza\xE7\xE3o de Matriculas "),
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
                  createVNode(VTab, { value: "enderecos" }, {
                    default: withCtx(() => [
                      createTextVNode("Endere\xE7o")
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
                      !unref(pending) ? (openBlock(), createBlock(VContainer, { key: 0 }, {
                        default: withCtx(() => [
                          createVNode(VRow, null, {
                            default: withCtx(() => [
                              createVNode(VCol, { md: "6" }, {
                                default: withCtx(() => [
                                  createVNode(VTextField, {
                                    modelValue: unref(state).numero,
                                    "onUpdate:modelValue": ($event) => unref(state).numero = $event,
                                    label: "Matr\xEDcula",
                                    required: ""
                                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                ]),
                                _: 1
                              }),
                              createVNode(VCol, { md: "4" }, {
                                default: withCtx(() => [
                                  createVNode(VTextField, {
                                    modelValue: unref(state).protocolo,
                                    "onUpdate:modelValue": ($event) => unref(state).protocolo = $event,
                                    label: "Protocolo",
                                    required: "",
                                    disabled: ""
                                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                ]),
                                _: 1
                              }),
                              createVNode(VCol, { md: "4" }, {
                                default: withCtx(() => [
                                  createVNode(VAutocomplete, {
                                    modelValue: unref(state).livro_id,
                                    "onUpdate:modelValue": ($event) => unref(state).livro_id = $event,
                                    items: unref(dados).livroItens.data,
                                    label: "Livro",
                                    "item-title": "descricao",
                                    "item-value": "id",
                                    disabled: ""
                                  }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                                ]),
                                _: 1
                              }),
                              createVNode(VCol, { md: "4" }, {
                                default: withCtx(() => [
                                  createVNode(VTextField, {
                                    modelValue: unref(state).pagina_inicial,
                                    "onUpdate:modelValue": ($event) => unref(state).pagina_inicial = $event,
                                    modelModifiers: { number: true },
                                    label: "Folha inicial",
                                    type: "number",
                                    required: "",
                                    min: "0",
                                    disabled: ""
                                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                ]),
                                _: 1
                              }),
                              createVNode(VCol, { md: "4" }, {
                                default: withCtx(() => [
                                  createVNode(VTextField, {
                                    modelValue: unref(state).pagina_final,
                                    "onUpdate:modelValue": ($event) => unref(state).pagina_final = $event,
                                    modelModifiers: { number: true },
                                    label: "Folha Final",
                                    type: "number",
                                    min: "0",
                                    disabled: ""
                                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                ]),
                                _: 1
                              }),
                              createVNode(VCol, { md: "4" }, {
                                default: withCtx(() => [
                                  withDirectives(createVNode(VTextField, {
                                    modelValue: unref(state).data,
                                    "onUpdate:modelValue": ($event) => unref(state).data = $event,
                                    placeholder: "dd/mm/yyyy",
                                    label: "Data"
                                  }, null, 8, ["modelValue", "onUpdate:modelValue"]), [
                                    [_directive_mask, "##/##/####"]
                                  ])
                                ]),
                                _: 1
                              }),
                              createVNode(VCol, { md: "4" }, {
                                default: withCtx(() => [
                                  createVNode(VAutocomplete, {
                                    modelValue: unref(state).situacao_id,
                                    "onUpdate:modelValue": ($event) => unref(state).situacao_id = $event,
                                    items: unref(dados).situacaoItens,
                                    label: "Situa\xE7\xE3o",
                                    "item-title": "descricao",
                                    "item-value": "id"
                                  }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                                ]),
                                _: 1
                              }),
                              createVNode(VCol, { md: "4" }, {
                                default: withCtx(() => [
                                  createVNode(VTextField, {
                                    modelValue: unref(state).descricao,
                                    "onUpdate:modelValue": ($event) => unref(state).descricao = $event,
                                    label: "Descri\xE7\xE3o",
                                    required: ""
                                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                ]),
                                _: 1
                              }),
                              createVNode(VCol, { md: "4" }, {
                                default: withCtx(() => [
                                  createVNode(VTextField, {
                                    modelValue: unref(state).cnm,
                                    "onUpdate:modelValue": ($event) => unref(state).cnm = $event,
                                    label: "CNM",
                                    required: ""
                                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                ]),
                                _: 1
                              }),
                              createVNode(VCol, { md: "4" }, {
                                default: withCtx(() => [
                                  createVNode(VTextField, {
                                    modelValue: unref(state).observacao,
                                    "onUpdate:modelValue": ($event) => unref(state).observacao = $event,
                                    label: "Observa\xE7\xE3o",
                                    required: ""
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
                      })) : createCommentVNode("", true)
                    ]),
                    _: 1
                  }),
                  createVNode(VTabsWindowItem, { value: "enderecos" }, {
                    default: withCtx(() => [
                      createVNode(VContainer, null, {
                        default: withCtx(() => [
                          createVNode(VRow, null, {
                            default: withCtx(() => [
                              createVNode(VCol, { md: "4" }, {
                                default: withCtx(() => [
                                  createVNode(VTextField, {
                                    modelValue: unref(state).inscricao_municipal,
                                    "onUpdate:modelValue": ($event) => unref(state).inscricao_municipal = $event,
                                    label: "Inscri\xE7\xE3o Municipal",
                                    required: ""
                                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                ]),
                                _: 1
                              }),
                              createVNode(VCol, { md: "4" }, {
                                default: withCtx(() => [
                                  createVNode(VAutocomplete, {
                                    modelValue: unref(state).tabvalores_natureza_id,
                                    "onUpdate:modelValue": ($event) => unref(state).tabvalores_natureza_id = $event,
                                    items: unref(dados).naturezaImoveisItens,
                                    label: "Natureza Imovel",
                                    "item-title": "descricao",
                                    "item-value": "id"
                                  }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                                ]),
                                _: 1
                              }),
                              createVNode(VCol, { md: "4" }, {
                                default: withCtx(() => [
                                  createVNode(VAutocomplete, {
                                    modelValue: unref(state).tabvalores_tipologradouro_id,
                                    "onUpdate:modelValue": ($event) => unref(state).tabvalores_tipologradouro_id = $event,
                                    items: unref(dados).tipoLogradouroItens,
                                    label: "Tipo de Logradouro",
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
                                  createVNode(VTextField, {
                                    modelValue: unref(state).end_logradouro,
                                    "onUpdate:modelValue": ($event) => unref(state).end_logradouro = $event,
                                    label: "Endere\xE7o",
                                    required: ""
                                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                ]),
                                _: 1
                              }),
                              createVNode(VCol, { md: "4" }, {
                                default: withCtx(() => [
                                  createVNode(VTextField, {
                                    modelValue: unref(state).end_logradouro_numero,
                                    "onUpdate:modelValue": ($event) => unref(state).end_logradouro_numero = $event,
                                    label: "Numero",
                                    required: ""
                                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                ]),
                                _: 1
                              }),
                              createVNode(VCol, { md: "4" }, {
                                default: withCtx(() => [
                                  createVNode(VTextField, {
                                    modelValue: unref(state).end_bairro,
                                    "onUpdate:modelValue": ($event) => unref(state).end_bairro = $event,
                                    label: "Bairro",
                                    required: ""
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
                                  createVNode(VAutocomplete, {
                                    modelValue: unref(state).end_cidade_id,
                                    "onUpdate:modelValue": ($event) => unref(state).end_cidade_id = $event,
                                    items: unref(dados).cidadesItens,
                                    label: "Cidade",
                                    "item-title": "descricao",
                                    "item-value": "id"
                                  }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                                ]),
                                _: 1
                              }),
                              createVNode(VCol, { md: "4" }, {
                                default: withCtx(() => [
                                  createVNode(VTextField, {
                                    modelValue: unref(state).end_cep,
                                    "onUpdate:modelValue": ($event) => unref(state).end_cep = $event,
                                    label: "CEP",
                                    required: ""
                                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                ]),
                                _: 1
                              }),
                              createVNode(VCol, { md: "4" }, {
                                default: withCtx(() => [
                                  createVNode(VTextField, {
                                    modelValue: unref(state).end_complemento,
                                    "onUpdate:modelValue": ($event) => unref(state).end_complemento = $event,
                                    label: "Complemento",
                                    required: ""
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
                                    modelValue: unref(state).end_quadra,
                                    "onUpdate:modelValue": ($event) => unref(state).end_quadra = $event,
                                    label: "Quadra",
                                    required: ""
                                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                ]),
                                _: 1
                              }),
                              createVNode(VCol, { md: "4" }, {
                                default: withCtx(() => [
                                  createVNode(VTextField, {
                                    modelValue: unref(state).end_lote,
                                    "onUpdate:modelValue": ($event) => unref(state).end_lote = $event,
                                    label: "Lote",
                                    required: ""
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
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/matriculas/atualizar/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : undefined;
};

export { _sfc_main as default };
//# sourceMappingURL=_id_-BZDQgi13.mjs.map
