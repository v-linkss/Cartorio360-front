import { _ as __nuxt_component_0 } from './MoneyInput-ot-UsY0X.mjs';
import { ref, withAsyncContext, resolveComponent, withCtx, unref, createVNode, createTextVNode, withModifiers, useSSRContext } from 'vue';
import { ssrRenderComponent } from 'vue/server-renderer';
import { f as useRoute$1, e as useCookie, b as useNuxtApp, V as VTextField, g as VBtn, c as useRuntimeConfig, a as navigateTo } from './server.mjs';
import { u as useFetch } from './fetch-uf6n1sXR.mjs';
import { V as VContainer } from './VContainer-CUysD4sO.mjs';
import { V as VForm } from './VForm-DedwsU-K.mjs';
import { V as VRow } from './VRow-Bqz0CuIN.mjs';
import { V as VCol } from './VCol-BT4RzX0Q.mjs';
import { V as VAutocomplete } from './VAutocomplete-BKZ1aqE0.mjs';
import { V as VCheckbox } from './VCheckbox-BG2mTDGC.mjs';
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
import './asyncData-B8plM1p3.mjs';
import './filter-DktR6j_7.mjs';
import './VList-nUNnjYu3.mjs';
import './VAvatar-B-oWAlT9.mjs';
import './VResponsive-BwPb2GHE.mjs';

const _sfc_main = {
  __name: "[id]",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const config = useRuntimeConfig();
    const updateTipoAtos = `${config.public.managemant}/tipo-atos`;
    const tipoAto = `${config.public.managemant}/tipo-atos`;
    const getTipoTj = `${config.public.managemant}/listar_tipo_atos_tj`;
    const getTiposAtos = `${config.public.managemant}/listar_tipo_atos`;
    const getlivros = `${config.public.managemant}/listar_livros`;
    const route = useRoute$1();
    const { id } = route.params;
    const form = ref({
      pai_id: null,
      ato_tipo_tj_id: null,
      descricao: null,
      livro_id: null,
      usa_imoveis: false,
      qtd_limite_folhas: 0,
      vlr_adicional_folhas: 0,
      texto_padrao_etiqueta: null
    });
    const tiposAtos = ref([]);
    const tipoAtosTj = ref([]);
    const livros = ref([]);
    const userData = ref(useCookie("user-data").value || {});
    const cartorio_id = ref(useCookie("user-data").value.cartorio_id || null);
    const cartorio_token = ref(useCookie("user-data").value.cartorio_token) || null;
    const { $toast } = useNuxtApp();
    async function loadData() {
      try {
        const { data: atoTipoData } = await useFetch(`${tipoAto}/${id}`, { method: "GET" }, "$a1pqXxCHnm");
        if (atoTipoData.value) {
          form.value = {
            pai_id: atoTipoData.value.pai_id,
            ato_tipo_tj_id: atoTipoData.value.ato_tipo_tj_id,
            descricao: atoTipoData.value.descricao,
            livro_id: atoTipoData.value.livro_id,
            usa_imoveis: atoTipoData.value.usa_imoveis,
            qtd_limite_folhas: atoTipoData.value.qtd_limite_folhas,
            vlr_adicional_folhas: atoTipoData.value.vlr_adicional_folhas,
            texto_padrao_etiqueta: atoTipoData.value.texto_padrao_etiqueta
          };
        }
      } catch (error) {
        console.error("Erro ao carregar os dados do tipo de ato:", error);
      }
    }
    [__temp, __restore] = withAsyncContext(() => loadData()), await __temp, __restore();
    const tipoAtoServicoPayload = {
      cartorio_token: cartorio_token.value,
      tipo: "SERVI\xC7O"
    };
    const { data: atosTipos } = ([__temp, __restore] = withAsyncContext(() => useFetch(`${getTiposAtos}`, {
      method: "POST",
      body: tipoAtoServicoPayload
    }, "$6Hf5yCDh5z")), __temp = await __temp, __restore(), __temp);
    tiposAtos.value = atosTipos.value;
    const cartorioTokenPayload = {
      cartorio_token: cartorio_token.value
    };
    const { data: atosTj } = ([__temp, __restore] = withAsyncContext(() => useFetch(
      getTipoTj,
      {
        method: "POST",
        body: cartorioTokenPayload
      },
      "$cDTObqJ4KT"
    )), __temp = await __temp, __restore(), __temp);
    tipoAtosTj.value = atosTj.value;
    const { data: livrosData } = ([__temp, __restore] = withAsyncContext(() => useFetch(
      getlivros,
      {
        method: "POST",
        body: cartorioTokenPayload
      },
      "$AtblwnOroM"
    )), __temp = await __temp, __restore(), __temp);
    livros.value = livrosData.value;
    [__temp, __restore] = withAsyncContext(() => loadData()), await __temp, __restore();
    async function HandleSubmitEdit() {
      try {
        const edicaoTipoAto = {
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
        await useFetch(`${updateTipoAtos}/${id}`, {
          method: "PUT",
          body: edicaoTipoAto
        }, "$thRDX9GOoW");
        $toast.success("Tipo de ato atualizado com sucesso");
        navigateTo("/tipoAtos/lista");
      } catch (error) {
        console.error("Erro ao atualizar o tipo ato:", error);
        $toast.error(error.message || "Erro ao cadastrar tipo de ato");
      }
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_MoneyInput = __nuxt_component_0;
      const _component_v_text_fild = resolveComponent("v-text-fild");
      _push(ssrRenderComponent(VContainer, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h1 class="mb-5"${_scopeId}>Edi\xE7\xE3o de Tipo Ato</h1>`);
            _push2(ssrRenderComponent(VForm, { onSubmit: HandleSubmitEdit }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
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
                                modelValue: unref(form).ato_tipo_tj_id,
                                "onUpdate:modelValue": ($event) => unref(form).ato_tipo_tj_id = $event,
                                items: unref(tipoAtosTj),
                                "item-title": "descricao",
                                "item-value": "id",
                                label: "Ato tj",
                                required: "",
                                outlined: ""
                              }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(VAutocomplete, {
                                  class: "mr-5",
                                  modelValue: unref(form).ato_tipo_tj_id,
                                  "onUpdate:modelValue": ($event) => unref(form).ato_tipo_tj_id = $event,
                                  items: unref(tipoAtosTj),
                                  "item-title": "descricao",
                                  "item-value": "id",
                                  label: "Ato tj",
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
                                class: "mr-5",
                                modelValue: unref(form).ato_tipo_tj_id,
                                "onUpdate:modelValue": ($event) => unref(form).ato_tipo_tj_id = $event,
                                items: unref(tipoAtosTj),
                                "item-title": "descricao",
                                "item-value": "id",
                                label: "Ato tj",
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
                              _push5(ssrRenderComponent(_component_v_text_fild, {
                                modelValue: unref(form).texto_padrao_etiqueta,
                                "onUpdate:modelValue": ($event) => unref(form).texto_padrao_etiqueta = $event,
                                label: "Texto Padr\xE3o da Etiqueta",
                                outlined: ""
                              }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_v_text_fild, {
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
                              createVNode(_component_v_text_fild, {
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
                                to: "/tiposSelos/lista"
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
                                  to: "/tiposSelos/lista"
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
                                to: "/tiposSelos/lista"
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
                              modelValue: unref(form).ato_tipo_tj_id,
                              "onUpdate:modelValue": ($event) => unref(form).ato_tipo_tj_id = $event,
                              items: unref(tipoAtosTj),
                              "item-title": "descricao",
                              "item-value": "id",
                              label: "Ato tj",
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
                            createVNode(_component_v_text_fild, {
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
                              to: "/tiposSelos/lista"
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
              createVNode("h1", { class: "mb-5" }, "Edi\xE7\xE3o de Tipo Ato"),
              createVNode(VForm, {
                onSubmit: withModifiers(HandleSubmitEdit, ["prevent"])
              }, {
                default: withCtx(() => [
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
                            modelValue: unref(form).ato_tipo_tj_id,
                            "onUpdate:modelValue": ($event) => unref(form).ato_tipo_tj_id = $event,
                            items: unref(tipoAtosTj),
                            "item-title": "descricao",
                            "item-value": "id",
                            label: "Ato tj",
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
                          createVNode(_component_v_text_fild, {
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
                            to: "/tiposSelos/lista"
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/tipoAtos/atualizar/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : undefined;
};

export { _sfc_main as default };
//# sourceMappingURL=_id_-BWGIIYFx.mjs.map
