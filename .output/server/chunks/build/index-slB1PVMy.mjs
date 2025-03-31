import { _ as __nuxt_component_0 } from './MoneyInput-ot-UsY0X.mjs';
import { ref, withAsyncContext, withCtx, createVNode, unref, createTextVNode, withModifiers, useSSRContext } from 'vue';
import { ssrRenderComponent } from 'vue/server-renderer';
import { e as useCookie, b as useNuxtApp, V as VTextField, f as VBtn, c as useRuntimeConfig, a as navigateTo } from './server.mjs';
import { u as useFetch } from './fetch-Q70wXbL3.mjs';
import { V as VContainer } from './VContainer-CTpFP9Uv.mjs';
import { V as VForm } from './VForm-CJ3zCVml.mjs';
import { V as VRow } from './VRow-BVT9G9vF.mjs';
import { V as VCol } from './VCol-BfQDPyTL.mjs';
import { V as VAutocomplete } from './VAutocomplete-ChQPKqBs.mjs';
import { V as VCheckbox } from './VCheckbox-C_slVRBl.mjs';
import { V as VTextarea } from './VTextarea-FT0NmkQr.mjs';
import 'v-money3';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:fs';
import 'node:path';
import 'node:url';
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
import './filter-1TH8I8rV.mjs';
import './VList-DgVXz_Z-.mjs';
import './VAvatar-C1Wv3qCt.mjs';
import './VResponsive-BFQ60k4B.mjs';

const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const config = useRuntimeConfig();
    const createTipoAtos = `${config.public.managemant}/tipo-atos`;
    const getTiposAtos = `${config.public.managemant}/listar_tipo_atos`;
    const getTiposAtosTj = `${config.public.managemant}/listar_tipo_atos_tj`;
    const getlivros = `${config.public.managemant}/listar_livros`;
    const userData = ref(useCookie("user-data").value || {});
    const cartorio_id = ref(useCookie("user-data").value.cartorio_id || null);
    ref(useCookie("auth_token").value) || null;
    const cartorio_token = ref(useCookie("user-data").value.cartorio_token) || null;
    const tiposAtos = ref([]);
    const tiposAtosTj = ref([]);
    const livros = ref([]);
    const { $toast } = useNuxtApp();
    const form = ref({
      pai_id: null,
      ato_tipo_tj_id: null,
      descricao: "",
      livro_id: null,
      usa_imoveis: false,
      qtd_limite_folhas: 0,
      vlr_adicional_folhas: 0,
      texto_padrao_etiqueta: ""
    });
    const tipoAtoServicoPayload = {
      cartorio_token: cartorio_token.value,
      tipo: "SERVI\xC7O"
    };
    const { data: atosTipos } = ([__temp, __restore] = withAsyncContext(() => useFetch(`${getTiposAtos}`, {
      method: "POST",
      body: tipoAtoServicoPayload
    }, "$WGpp8bHhrp")), __temp = await __temp, __restore(), __temp);
    tiposAtos.value = atosTipos.value;
    const cartorioTokenPayload = {
      cartorio_token: cartorio_token.value
    };
    const { data: atosTipoTj } = ([__temp, __restore] = withAsyncContext(() => useFetch(`${getTiposAtosTj}`, {
      method: "POST",
      body: cartorioTokenPayload
    }, "$s9DrfhzPit")), __temp = await __temp, __restore(), __temp);
    tiposAtosTj.value = atosTipoTj.value;
    const { data: livrosData } = ([__temp, __restore] = withAsyncContext(() => useFetch(`${getlivros}`, {
      method: "POST",
      body: cartorioTokenPayload
    }, "$6RgudaolUe")), __temp = await __temp, __restore(), __temp);
    livros.value = livrosData.value;
    const handleCreateTipoAtos = async () => {
      try {
        const tipoAtosPayload = {
          pai_id: form.value.pai_id,
          ato_tipo_tj_id: form.value.ato_tipo_tj_id,
          descricao: form.value.descricao,
          livro_id: form.value.livro_id,
          usa_imoveis: form.value.usa_imoveis,
          qtd_limite_folhas: form.value.qtd_limite_folhas,
          vlr_adicional_folhas: form.value.vlr_adicional_folhas,
          texto_padrao_etiqueta: form.value.texto_padrao_etiqueta,
          user_id: userData.value.usuario_id,
          user_alteracao_id: userData.value.usuario_id,
          cartorio_id: cartorio_id.value,
          tabvalores_tipotelaato_id: 1
        };
        const { data, error } = await useFetch(createTipoAtos, {
          method: "POST",
          body: tipoAtosPayload
        }, "$7rDtrpXpUV");
        if (error.value) {
          throw new Error(error.value.message || "Erro desconhecido na API");
        }
        $toast.success("Tipo de ato cadastrado com sucesso");
        navigateTo("/tipoAtos/lista");
      } catch (error) {
        console.error("Erro ao criar tipo de ato:", error);
        $toast.error(error.message || "Erro ao cadastrar tipo de ato");
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_MoneyInput = __nuxt_component_0;
      _push(ssrRenderComponent(VContainer, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h1 class="mb-5"${_scopeId}>Criar Tipo de Ato</h1>`);
            _push2(ssrRenderComponent(VForm, { onSubmit: handleCreateTipoAtos }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VRow, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VCol, { cols: "6" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VTextField, {
                                label: "C\xF3digo",
                                disabled: "",
                                outlined: ""
                              }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(VTextField, {
                                  label: "C\xF3digo",
                                  disabled: "",
                                  outlined: ""
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VCol, { cols: "6" }, {
                            default: withCtx(() => [
                              createVNode(VTextField, {
                                label: "C\xF3digo",
                                disabled: "",
                                outlined: ""
                              })
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VRow, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VCol, { cols: "6" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VAutocomplete, {
                                modelValue: unref(form).pai_id,
                                "onUpdate:modelValue": ($event) => unref(form).pai_id = $event,
                                items: unref(tiposAtos),
                                "item-title": "descricao",
                                "item-value": "id",
                                label: "Servi\xE7o",
                                required: "",
                                outlined: ""
                              }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(VAutocomplete, {
                                  modelValue: unref(form).pai_id,
                                  "onUpdate:modelValue": ($event) => unref(form).pai_id = $event,
                                  items: unref(tiposAtos),
                                  "item-title": "descricao",
                                  "item-value": "id",
                                  label: "Servi\xE7o",
                                  required: "",
                                  outlined: ""
                                }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VCol, { cols: "6" }, {
                            default: withCtx(() => [
                              createVNode(VAutocomplete, {
                                modelValue: unref(form).pai_id,
                                "onUpdate:modelValue": ($event) => unref(form).pai_id = $event,
                                items: unref(tiposAtos),
                                "item-title": "descricao",
                                "item-value": "id",
                                label: "Servi\xE7o",
                                required: "",
                                outlined: ""
                              }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VRow, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VCol, { cols: "6" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VAutocomplete, {
                                class: "mr-5",
                                label: "Ato tj",
                                items: unref(tiposAtosTj),
                                "item-title": "descricao",
                                "item-value": "id",
                                modelValue: unref(form).ato_tipo_tj_id,
                                "onUpdate:modelValue": ($event) => unref(form).ato_tipo_tj_id = $event
                              }, null, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(VCol, { md: "6" }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(VAutocomplete, {
                                  class: "mr-5",
                                  label: "Ato tj",
                                  items: unref(tiposAtosTj),
                                  "item-title": "descricao",
                                  "item-value": "id",
                                  modelValue: unref(form).ato_tipo_tj_id,
                                  "onUpdate:modelValue": ($event) => unref(form).ato_tipo_tj_id = $event
                                }, null, 8, ["items", "modelValue", "onUpdate:modelValue"]),
                                createVNode(VCol, { md: "6" })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VCol, { cols: "6" }, {
                            default: withCtx(() => [
                              createVNode(VAutocomplete, {
                                class: "mr-5",
                                label: "Ato tj",
                                items: unref(tiposAtosTj),
                                "item-title": "descricao",
                                "item-value": "id",
                                modelValue: unref(form).ato_tipo_tj_id,
                                "onUpdate:modelValue": ($event) => unref(form).ato_tipo_tj_id = $event
                              }, null, 8, ["items", "modelValue", "onUpdate:modelValue"]),
                              createVNode(VCol, { md: "6" })
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VRow, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VCol, { cols: "6" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VTextField, {
                                modelValue: unref(form).descricao,
                                "onUpdate:modelValue": ($event) => unref(form).descricao = $event,
                                label: "Descri\xE7\xE3o",
                                required: "",
                                outlined: ""
                              }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(VTextField, {
                                  modelValue: unref(form).descricao,
                                  "onUpdate:modelValue": ($event) => unref(form).descricao = $event,
                                  label: "Descri\xE7\xE3o",
                                  required: "",
                                  outlined: ""
                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VCol, { cols: "6" }, {
                            default: withCtx(() => [
                              createVNode(VTextField, {
                                modelValue: unref(form).descricao,
                                "onUpdate:modelValue": ($event) => unref(form).descricao = $event,
                                label: "Descri\xE7\xE3o",
                                required: "",
                                outlined: ""
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VRow, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VCol, { cols: "6" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VAutocomplete, {
                                modelValue: unref(form).livro_id,
                                "onUpdate:modelValue": ($event) => unref(form).livro_id = $event,
                                items: unref(livros),
                                "item-title": "descricao",
                                "item-value": "id",
                                label: "Livro",
                                required: "",
                                outlined: ""
                              }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(VAutocomplete, {
                                  modelValue: unref(form).livro_id,
                                  "onUpdate:modelValue": ($event) => unref(form).livro_id = $event,
                                  items: unref(livros),
                                  "item-title": "descricao",
                                  "item-value": "id",
                                  label: "Livro",
                                  required: "",
                                  outlined: ""
                                }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VCol, { cols: "6" }, {
                            default: withCtx(() => [
                              createVNode(VAutocomplete, {
                                modelValue: unref(form).livro_id,
                                "onUpdate:modelValue": ($event) => unref(form).livro_id = $event,
                                items: unref(livros),
                                "item-title": "descricao",
                                "item-value": "id",
                                label: "Livro",
                                required: "",
                                outlined: ""
                              }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VRow, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VCol, { cols: "6" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VCheckbox, {
                                modelValue: unref(form).usa_imoveis,
                                "onUpdate:modelValue": ($event) => unref(form).usa_imoveis = $event,
                                label: "Usa Im\xF3veis"
                              }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(VCheckbox, {
                                  modelValue: unref(form).usa_imoveis,
                                  "onUpdate:modelValue": ($event) => unref(form).usa_imoveis = $event,
                                  label: "Usa Im\xF3veis"
                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VCol, { cols: "6" }, {
                            default: withCtx(() => [
                              createVNode(VCheckbox, {
                                modelValue: unref(form).usa_imoveis,
                                "onUpdate:modelValue": ($event) => unref(form).usa_imoveis = $event,
                                label: "Usa Im\xF3veis"
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VRow, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VCol, { cols: "6" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VTextField, {
                                modelValue: unref(form).qtd_limite_folhas,
                                "onUpdate:modelValue": ($event) => unref(form).qtd_limite_folhas = $event,
                                modelModifiers: { number: true },
                                type: "number",
                                label: "Quantidade Limite de Folhas",
                                required: "",
                                outlined: ""
                              }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(VTextField, {
                                  modelValue: unref(form).qtd_limite_folhas,
                                  "onUpdate:modelValue": ($event) => unref(form).qtd_limite_folhas = $event,
                                  modelModifiers: { number: true },
                                  type: "number",
                                  label: "Quantidade Limite de Folhas",
                                  required: "",
                                  outlined: ""
                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VCol, { cols: "6" }, {
                            default: withCtx(() => [
                              createVNode(VTextField, {
                                modelValue: unref(form).qtd_limite_folhas,
                                "onUpdate:modelValue": ($event) => unref(form).qtd_limite_folhas = $event,
                                modelModifiers: { number: true },
                                type: "number",
                                label: "Quantidade Limite de Folhas",
                                required: "",
                                outlined: ""
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VRow, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VCol, { cols: "6" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_MoneyInput, {
                                required: "",
                                modelValue: unref(form).vlr_adicional_folhas,
                                "onUpdate:modelValue": ($event) => unref(form).vlr_adicional_folhas = $event,
                                label: "Valor Adicional por Folha"
                              }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_MoneyInput, {
                                  required: "",
                                  modelValue: unref(form).vlr_adicional_folhas,
                                  "onUpdate:modelValue": ($event) => unref(form).vlr_adicional_folhas = $event,
                                  label: "Valor Adicional por Folha"
                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VCol, { cols: "6" }, {
                            default: withCtx(() => [
                              createVNode(_component_MoneyInput, {
                                required: "",
                                modelValue: unref(form).vlr_adicional_folhas,
                                "onUpdate:modelValue": ($event) => unref(form).vlr_adicional_folhas = $event,
                                label: "Valor Adicional por Folha"
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VRow, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VCol, { cols: "6" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VTextarea, {
                                modelValue: unref(form).texto_padrao_etiqueta,
                                "onUpdate:modelValue": ($event) => unref(form).texto_padrao_etiqueta = $event,
                                label: "Texto Padr\xE3o da Etiqueta",
                                outlined: ""
                              }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(VTextarea, {
                                  modelValue: unref(form).texto_padrao_etiqueta,
                                  "onUpdate:modelValue": ($event) => unref(form).texto_padrao_etiqueta = $event,
                                  label: "Texto Padr\xE3o da Etiqueta",
                                  outlined: ""
                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VCol, { cols: "6" }, {
                            default: withCtx(() => [
                              createVNode(VTextarea, {
                                modelValue: unref(form).texto_padrao_etiqueta,
                                "onUpdate:modelValue": ($event) => unref(form).texto_padrao_etiqueta = $event,
                                label: "Texto Padr\xE3o da Etiqueta",
                                outlined: ""
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VRow, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VCol, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VBtn, {
                                size: "large",
                                color: "red",
                                to: "/tipoAtos/lista"
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Voltar`);
                                  } else {
                                    return [
                                      createTextVNode("Voltar")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(VBtn, {
                                type: "submit",
                                class: "ml-4",
                                size: "large",
                                color: "green"
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
                                createVNode(VBtn, {
                                  size: "large",
                                  color: "red",
                                  to: "/tipoAtos/lista"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode("Voltar")
                                  ]),
                                  _: 1
                                }),
                                createVNode(VBtn, {
                                  type: "submit",
                                  class: "ml-4",
                                  size: "large",
                                  color: "green"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode("Salvar")
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
                          createVNode(VCol, null, {
                            default: withCtx(() => [
                              createVNode(VBtn, {
                                size: "large",
                                color: "red",
                                to: "/tipoAtos/lista"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode("Voltar")
                                ]),
                                _: 1
                              }),
                              createVNode(VBtn, {
                                type: "submit",
                                class: "ml-4",
                                size: "large",
                                color: "green"
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
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VRow, null, {
                      default: withCtx(() => [
                        createVNode(VCol, { cols: "6" }, {
                          default: withCtx(() => [
                            createVNode(VTextField, {
                              label: "C\xF3digo",
                              disabled: "",
                              outlined: ""
                            })
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(VRow, null, {
                      default: withCtx(() => [
                        createVNode(VCol, { cols: "6" }, {
                          default: withCtx(() => [
                            createVNode(VAutocomplete, {
                              modelValue: unref(form).pai_id,
                              "onUpdate:modelValue": ($event) => unref(form).pai_id = $event,
                              items: unref(tiposAtos),
                              "item-title": "descricao",
                              "item-value": "id",
                              label: "Servi\xE7o",
                              required: "",
                              outlined: ""
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(VRow, null, {
                      default: withCtx(() => [
                        createVNode(VCol, { cols: "6" }, {
                          default: withCtx(() => [
                            createVNode(VAutocomplete, {
                              class: "mr-5",
                              label: "Ato tj",
                              items: unref(tiposAtosTj),
                              "item-title": "descricao",
                              "item-value": "id",
                              modelValue: unref(form).ato_tipo_tj_id,
                              "onUpdate:modelValue": ($event) => unref(form).ato_tipo_tj_id = $event
                            }, null, 8, ["items", "modelValue", "onUpdate:modelValue"]),
                            createVNode(VCol, { md: "6" })
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(VRow, null, {
                      default: withCtx(() => [
                        createVNode(VCol, { cols: "6" }, {
                          default: withCtx(() => [
                            createVNode(VTextField, {
                              modelValue: unref(form).descricao,
                              "onUpdate:modelValue": ($event) => unref(form).descricao = $event,
                              label: "Descri\xE7\xE3o",
                              required: "",
                              outlined: ""
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(VRow, null, {
                      default: withCtx(() => [
                        createVNode(VCol, { cols: "6" }, {
                          default: withCtx(() => [
                            createVNode(VAutocomplete, {
                              modelValue: unref(form).livro_id,
                              "onUpdate:modelValue": ($event) => unref(form).livro_id = $event,
                              items: unref(livros),
                              "item-title": "descricao",
                              "item-value": "id",
                              label: "Livro",
                              required: "",
                              outlined: ""
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(VRow, null, {
                      default: withCtx(() => [
                        createVNode(VCol, { cols: "6" }, {
                          default: withCtx(() => [
                            createVNode(VCheckbox, {
                              modelValue: unref(form).usa_imoveis,
                              "onUpdate:modelValue": ($event) => unref(form).usa_imoveis = $event,
                              label: "Usa Im\xF3veis"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(VRow, null, {
                      default: withCtx(() => [
                        createVNode(VCol, { cols: "6" }, {
                          default: withCtx(() => [
                            createVNode(VTextField, {
                              modelValue: unref(form).qtd_limite_folhas,
                              "onUpdate:modelValue": ($event) => unref(form).qtd_limite_folhas = $event,
                              modelModifiers: { number: true },
                              type: "number",
                              label: "Quantidade Limite de Folhas",
                              required: "",
                              outlined: ""
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(VRow, null, {
                      default: withCtx(() => [
                        createVNode(VCol, { cols: "6" }, {
                          default: withCtx(() => [
                            createVNode(_component_MoneyInput, {
                              required: "",
                              modelValue: unref(form).vlr_adicional_folhas,
                              "onUpdate:modelValue": ($event) => unref(form).vlr_adicional_folhas = $event,
                              label: "Valor Adicional por Folha"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(VRow, null, {
                      default: withCtx(() => [
                        createVNode(VCol, { cols: "6" }, {
                          default: withCtx(() => [
                            createVNode(VTextarea, {
                              modelValue: unref(form).texto_padrao_etiqueta,
                              "onUpdate:modelValue": ($event) => unref(form).texto_padrao_etiqueta = $event,
                              label: "Texto Padr\xE3o da Etiqueta",
                              outlined: ""
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
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
                              color: "red",
                              to: "/tipoAtos/lista"
                            }, {
                              default: withCtx(() => [
                                createTextVNode("Voltar")
                              ]),
                              _: 1
                            }),
                            createVNode(VBtn, {
                              type: "submit",
                              class: "ml-4",
                              size: "large",
                              color: "green"
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
              createVNode("h1", { class: "mb-5" }, "Criar Tipo de Ato"),
              createVNode(VForm, {
                onSubmit: withModifiers(handleCreateTipoAtos, ["prevent"])
              }, {
                default: withCtx(() => [
                  createVNode(VRow, null, {
                    default: withCtx(() => [
                      createVNode(VCol, { cols: "6" }, {
                        default: withCtx(() => [
                          createVNode(VTextField, {
                            label: "C\xF3digo",
                            disabled: "",
                            outlined: ""
                          })
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode(VRow, null, {
                    default: withCtx(() => [
                      createVNode(VCol, { cols: "6" }, {
                        default: withCtx(() => [
                          createVNode(VAutocomplete, {
                            modelValue: unref(form).pai_id,
                            "onUpdate:modelValue": ($event) => unref(form).pai_id = $event,
                            items: unref(tiposAtos),
                            "item-title": "descricao",
                            "item-value": "id",
                            label: "Servi\xE7o",
                            required: "",
                            outlined: ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode(VRow, null, {
                    default: withCtx(() => [
                      createVNode(VCol, { cols: "6" }, {
                        default: withCtx(() => [
                          createVNode(VAutocomplete, {
                            class: "mr-5",
                            label: "Ato tj",
                            items: unref(tiposAtosTj),
                            "item-title": "descricao",
                            "item-value": "id",
                            modelValue: unref(form).ato_tipo_tj_id,
                            "onUpdate:modelValue": ($event) => unref(form).ato_tipo_tj_id = $event
                          }, null, 8, ["items", "modelValue", "onUpdate:modelValue"]),
                          createVNode(VCol, { md: "6" })
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode(VRow, null, {
                    default: withCtx(() => [
                      createVNode(VCol, { cols: "6" }, {
                        default: withCtx(() => [
                          createVNode(VTextField, {
                            modelValue: unref(form).descricao,
                            "onUpdate:modelValue": ($event) => unref(form).descricao = $event,
                            label: "Descri\xE7\xE3o",
                            required: "",
                            outlined: ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode(VRow, null, {
                    default: withCtx(() => [
                      createVNode(VCol, { cols: "6" }, {
                        default: withCtx(() => [
                          createVNode(VAutocomplete, {
                            modelValue: unref(form).livro_id,
                            "onUpdate:modelValue": ($event) => unref(form).livro_id = $event,
                            items: unref(livros),
                            "item-title": "descricao",
                            "item-value": "id",
                            label: "Livro",
                            required: "",
                            outlined: ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode(VRow, null, {
                    default: withCtx(() => [
                      createVNode(VCol, { cols: "6" }, {
                        default: withCtx(() => [
                          createVNode(VCheckbox, {
                            modelValue: unref(form).usa_imoveis,
                            "onUpdate:modelValue": ($event) => unref(form).usa_imoveis = $event,
                            label: "Usa Im\xF3veis"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode(VRow, null, {
                    default: withCtx(() => [
                      createVNode(VCol, { cols: "6" }, {
                        default: withCtx(() => [
                          createVNode(VTextField, {
                            modelValue: unref(form).qtd_limite_folhas,
                            "onUpdate:modelValue": ($event) => unref(form).qtd_limite_folhas = $event,
                            modelModifiers: { number: true },
                            type: "number",
                            label: "Quantidade Limite de Folhas",
                            required: "",
                            outlined: ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode(VRow, null, {
                    default: withCtx(() => [
                      createVNode(VCol, { cols: "6" }, {
                        default: withCtx(() => [
                          createVNode(_component_MoneyInput, {
                            required: "",
                            modelValue: unref(form).vlr_adicional_folhas,
                            "onUpdate:modelValue": ($event) => unref(form).vlr_adicional_folhas = $event,
                            label: "Valor Adicional por Folha"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode(VRow, null, {
                    default: withCtx(() => [
                      createVNode(VCol, { cols: "6" }, {
                        default: withCtx(() => [
                          createVNode(VTextarea, {
                            modelValue: unref(form).texto_padrao_etiqueta,
                            "onUpdate:modelValue": ($event) => unref(form).texto_padrao_etiqueta = $event,
                            label: "Texto Padr\xE3o da Etiqueta",
                            outlined: ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
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
                            color: "red",
                            to: "/tipoAtos/lista"
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Voltar")
                            ]),
                            _: 1
                          }),
                          createVNode(VBtn, {
                            type: "submit",
                            class: "ml-4",
                            size: "large",
                            color: "green"
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/tipoAtos/cadastro/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : undefined;
};

export { _sfc_main as default };
//# sourceMappingURL=index-slB1PVMy.mjs.map
