import { _ as _sfc_main$6, a as _sfc_main$5, b as _sfc_main$4, c as _sfc_main$3$1, d as _sfc_main$2$1, e as _sfc_main$1$1, f as _sfc_main$7 } from './TiposAtos-B3hq3KZD.mjs';
import { _ as __nuxt_component_0 } from './MoneyInput-ot-UsY0X.mjs';
import { _ as __nuxt_component_0$1 } from './nuxt-link-TpvcaGEw.mjs';
import { ref, withAsyncContext, withCtx, unref, createVNode, toDisplayString, isRef, createTextVNode, openBlock, createBlock, createCommentVNode, useSSRContext, reactive, computed, mergeProps } from 'vue';
import { ssrRenderComponent, ssrRenderStyle, ssrInterpolate, ssrRenderAttr } from 'vue/server-renderer';
import { _ as _imports_0, a as _imports_2, b as _imports_3 } from './excluido-CyV-jbSn.mjs';
import { _ as _imports_1$1 } from './visualizar-BoZ30DMV.mjs';
import { _ as _imports_1 } from './editar-BcGPsVK2.mjs';
import { aS as useRoute$1, e as useCookie, c as useRuntimeConfig, u as useRouter$1, b as useNuxtApp, aT as VSpacer, f as VBtn, V as VTextField } from './server.mjs';
import { u as useFetch } from './fetch-Q70wXbL3.mjs';
import { V as VContainer } from './VContainer-CTpFP9Uv.mjs';
import { V as VCol } from './VCol-BfQDPyTL.mjs';
import { V as VTextarea } from './VTextarea-CDvEJAu9.mjs';
import { V as VRow } from './VRow-BVT9G9vF.mjs';
import { V as VAutocomplete } from './VAutocomplete-b82_SY3L.mjs';
import { V as VDataTable } from './VDataTable-CK60pvn7.mjs';
import { V as VDialog } from './VDialog-CGFJar9P.mjs';
import { V as VCard, a as VCardTitle, b as VCardText, c as VCardActions } from './VCard-B1PhK9Ih.mjs';
import { _ as _sfc_main$1$2, a as _sfc_main$8 } from './Atualizar-C3ziNoXR.mjs';
import { f as fetchWithToken } from './fetchWithToken-Cv5nC8pK.mjs';
import { useVuelidate } from '@vuelidate/core';
import { helpers, required } from '@vuelidate/validators';
import { _ as __unimport_formatDate } from './formatDate-C0bMm8hr.mjs';
import { V as VTabs, a as VTab, b as VTabsWindow, c as VTabsWindowItem } from './VTabs-By7VHGMa.mjs';
import './RegistroPessoas-OYaUKPCb.mjs';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:fs';
import 'node:url';
import 'node:path';
import 'devalue';
import '@unhead/ssr';
import 'unhead';
import '@unhead/shared';
import './filter-DBr0YsK-.mjs';
import './VList-DgVXz_Z-.mjs';
import './VAvatar-C1Wv3qCt.mjs';
import './VResponsive-BFQ60k4B.mjs';
import 'utif';
import './escanear-D1wbsvZ-.mjs';
import './Confirmacao-BPmf7T_8.mjs';
import '@syncfusion/ej2-vue-documenteditor';
import '@syncfusion/ej2-base';
import 'v-money3';
import 'pinia';
import 'vue-router';
import 'vue3-toastify';
import 'vue-the-mask';

const _sfc_main$3 = {
  __name: "Bens",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const router = useRouter$1();
    const route = useRoute$1();
    const config = useRuntimeConfig();
    const { $toast } = useNuxtApp();
    const createAtosBens = `${config.public.managemant}/atos_bens`;
    const updateAtosBens = `${config.public.managemant}/atos_bens`;
    const getAtosBens = `${config.public.managemant}/listarBens`;
    const listarBens = `${config.public.managemant}/listarTipoBens`;
    const cartorio_token = ref(useCookie("user-data").value.cartorio_token);
    const user_id = ref(useCookie("user-data").value.usuario_id).value;
    const pessoasTable = ref([]);
    const selectedBem = ref([]);
    const isModalOpen = ref(false);
    const headers = [
      {
        title: "Descri\xE7\xE3o",
        align: "start",
        key: "descricao"
      },
      {
        title: "Valor",
        align: "end",
        key: "vlr_alienacao"
      },
      { align: "end", value: "actions" }
    ];
    const state = reactive({
      vlr_alienacao: null,
      descricao: null,
      tipo_id: null,
      tiposBens: []
    });
    const createTiposDeBens = async () => {
      if (!state.vlr_alienacao && !state.descricao) {
        $toast.error("Os campos Descri\xE7\xE3o e Valor s\xE3o Obrigatorios!");
        return;
      }
      const { data: data2, status } = await useFetch(`${createAtosBens}`, {
        method: "POST",
        body: {
          descricao: state.descricao,
          tipo_id: state.tipo_id,
          valor_mercado: "0.00",
          vlr_alienacao: state.vlr_alienacao.replace(/,/g, ""),
          user_id,
          ato_id: Number.parseInt(route.query.ato_id),
          token: route.query.ato_token_edit
        }
      }, "$aGIwRtPn6M");
      if (status.value === "success") {
        $toast.success("Bem registrado com sucesso!");
        pessoasTable.value.push(data2.value);
        Object.assign(state, {
          vlr_alienacao: null,
          descricao: null,
          tipo_id: null
        });
      }
    };
    const updateAtosBensModal = async (id) => {
      const { status } = await useFetch(`${updateAtosBens}/${id}`, {
        method: "PUT",
        body: {
          descricao: selectedBem.value.descricao,
          tipo_id: selectedBem.value.tipo_id,
          vlr_alienacao: selectedBem.value.vlr_alienacao.replace(/,/g, "")
        }
      }, "$4hUMyAQlzU");
      if (status.value === "success") {
        $toast.success("Bem Atualizado com sucesso!");
        isModalOpen.value = false;
      }
    };
    const redirectToUpdateBens = (id) => {
      const bem = pessoasTable.value.find((item) => item.id === id);
      if (bem) {
        selectedBem.value = bem;
        isModalOpen.value = true;
      }
    };
    const { data } = ([__temp, __restore] = withAsyncContext(() => useFetch(`${listarBens}`, {
      method: "POST",
      body: { cartorio_token: cartorio_token.value, imoveis: false }
    }, "$da802I2H8c")), __temp = await __temp, __restore(), __temp);
    state.tiposBens = data.value;
    const { data: bensPayload } = ([__temp, __restore] = withAsyncContext(() => useFetch(
      `${getAtosBens}`,
      {
        method: "POST",
        body: { ato_token: route.query.ato_token_edit }
      },
      "$iXfJJrO35d"
    )), __temp = await __temp, __restore(), __temp);
    pessoasTable.value = bensPayload.value && Object.keys(bensPayload.value).length === 0 ? [] : bensPayload.value;
    async function deletePessoa(item) {
      item.excluido = !item.excluido;
      try {
        await useFetch(`${updateAtosBens}/${item.id}`, {
          method: "PUT",
          body: JSON.stringify({ excluido: item.excluido })
        }, "$PGKHfsa7Pl");
      } catch (error) {
        console.error("Erro ao excluir pessoa:", error);
      }
    }
    const goBack = () => {
      const origem = route.query.origem || "criar";
      const id = route.query.id;
      if (origem === "atualizar") {
        router.push(`/os/atualizar/${id}`);
      } else {
        router.push("/os/criar-registro");
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_MoneyInput = __nuxt_component_0;
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(ssrRenderComponent(VContainer, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VCol, {
              class: "mt-5",
              cols: "12"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VTextarea, {
                    label: "Descri\xE7\xE3o",
                    modelValue: unref(state).descricao,
                    "onUpdate:modelValue": ($event) => unref(state).descricao = $event
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VTextarea, {
                      label: "Descri\xE7\xE3o",
                      modelValue: unref(state).descricao,
                      "onUpdate:modelValue": ($event) => unref(state).descricao = $event
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(VRow, { class: "ml-1 mb-3" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VCol, {
                    class: "mt-6",
                    cols: "8"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VAutocomplete, {
                          label: "Selecione o Tipo",
                          items: unref(state).tiposBens,
                          modelValue: unref(state).tipo_id,
                          "onUpdate:modelValue": ($event) => unref(state).tipo_id = $event,
                          "item-title": "descricao",
                          "item-value": "id"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VAutocomplete, {
                            label: "Selecione o Tipo",
                            items: unref(state).tiposBens,
                            modelValue: unref(state).tipo_id,
                            "onUpdate:modelValue": ($event) => unref(state).tipo_id = $event,
                            "item-title": "descricao",
                            "item-value": "id"
                          }, null, 8, ["items", "modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VCol, {
                    class: "ml-5",
                    cols: "3"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<label${_scopeId3}>Valor</label>`);
                        _push4(ssrRenderComponent(_component_MoneyInput, {
                          modelValue: unref(state).vlr_alienacao,
                          "onUpdate:modelValue": ($event) => unref(state).vlr_alienacao = $event
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode("label", null, "Valor"),
                          createVNode(_component_MoneyInput, {
                            modelValue: unref(state).vlr_alienacao,
                            "onUpdate:modelValue": ($event) => unref(state).vlr_alienacao = $event
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<div${_scopeId2}><img class="mt-7 ml-4"${ssrRenderAttr("src", _imports_0)} style="${ssrRenderStyle({ "width": "40px", "cursor": "pointer" })}" title="Criar Representante"${_scopeId2}></div>`);
                } else {
                  return [
                    createVNode(VCol, {
                      class: "mt-6",
                      cols: "8"
                    }, {
                      default: withCtx(() => [
                        createVNode(VAutocomplete, {
                          label: "Selecione o Tipo",
                          items: unref(state).tiposBens,
                          modelValue: unref(state).tipo_id,
                          "onUpdate:modelValue": ($event) => unref(state).tipo_id = $event,
                          "item-title": "descricao",
                          "item-value": "id"
                        }, null, 8, ["items", "modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, {
                      class: "ml-5",
                      cols: "3"
                    }, {
                      default: withCtx(() => [
                        createVNode("label", null, "Valor"),
                        createVNode(_component_MoneyInput, {
                          modelValue: unref(state).vlr_alienacao,
                          "onUpdate:modelValue": ($event) => unref(state).vlr_alienacao = $event
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode("div", null, [
                      createVNode("img", {
                        class: "mt-7 ml-4",
                        src: _imports_0,
                        style: { "width": "40px", "cursor": "pointer" },
                        title: "Criar Representante",
                        onClick: createTiposDeBens
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
                          "item.descricao": withCtx(({ item }, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<h3 style="${ssrRenderStyle({ "width": "800px", "font-weight": "500" })}"${_scopeId4}>${ssrInterpolate(item.descricao)}</h3>`);
                            } else {
                              return [
                                createVNode("h3", { style: { "width": "800px", "font-weight": "500" } }, toDisplayString(item.descricao), 1)
                              ];
                            }
                          }),
                          "item.actions": withCtx(({ item }, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VRow, {
                                style: { "margin-top": "-8px" },
                                justify: "end"
                              }, {
                                default: withCtx((_4, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`<div style="${ssrRenderStyle({ "cursor": "pointer" })}" class="mr-2" title="Visualizar Ficha"${_scopeId5}><img style="${ssrRenderStyle({ "width": "30px", "height": "30px" })}"${ssrRenderAttr("src", _imports_1$1)} alt="Visualizar"${_scopeId5}></div><div style="${ssrRenderStyle({ "cursor": "pointer" })}" class="mr-2" title="Alterar Papel"${_scopeId5}><img style="${ssrRenderStyle({ "width": "30px", "height": "30px" })}"${ssrRenderAttr("src", _imports_1)} alt="Editar"${_scopeId5}></div><div style="${ssrRenderStyle({ "cursor": "pointer" })}" class="mr-2" title="Deletar Pessoa"${_scopeId5}>`);
                                    if (item.excluido) {
                                      _push6(`<img style="${ssrRenderStyle({ "width": "30px", "height": "30px" })}"${ssrRenderAttr("src", _imports_2)} alt="Reativar" title="Reativar"${_scopeId5}>`);
                                    } else {
                                      _push6(`<img${ssrRenderAttr("src", _imports_3)} alt="Excluir" style="${ssrRenderStyle({ "width": "30px", "height": "30px" })}" title="Excluir"${_scopeId5}>`);
                                    }
                                    _push6(`</div>`);
                                  } else {
                                    return [
                                      createVNode("div", {
                                        style: { "cursor": "pointer" },
                                        class: "mr-2",
                                        onClick: ($event) => _ctx.redirectToFicha(item),
                                        title: "Visualizar Ficha"
                                      }, [
                                        createVNode("img", {
                                          style: { "width": "30px", "height": "30px" },
                                          src: _imports_1$1,
                                          alt: "Visualizar"
                                        })
                                      ], 8, ["onClick"]),
                                      createVNode("div", {
                                        style: { "cursor": "pointer" },
                                        class: "mr-2",
                                        onClick: ($event) => redirectToUpdateBens(item.id),
                                        title: "Alterar Papel"
                                      }, [
                                        createVNode("img", {
                                          style: { "width": "30px", "height": "30px" },
                                          src: _imports_1,
                                          alt: "Editar"
                                        })
                                      ], 8, ["onClick"]),
                                      createVNode("div", {
                                        style: { "cursor": "pointer" },
                                        class: "mr-2",
                                        onClick: ($event) => deletePessoa(item),
                                        title: "Deletar Pessoa"
                                      }, [
                                        item.excluido ? (openBlock(), createBlock("img", {
                                          key: 0,
                                          style: { "width": "30px", "height": "30px" },
                                          src: _imports_2,
                                          alt: "Reativar",
                                          title: "Reativar"
                                        })) : (openBlock(), createBlock("img", {
                                          key: 1,
                                          src: _imports_3,
                                          alt: "Excluir",
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
                                createVNode(VRow, {
                                  style: { "margin-top": "-8px" },
                                  justify: "end"
                                }, {
                                  default: withCtx(() => [
                                    createVNode("div", {
                                      style: { "cursor": "pointer" },
                                      class: "mr-2",
                                      onClick: ($event) => _ctx.redirectToFicha(item),
                                      title: "Visualizar Ficha"
                                    }, [
                                      createVNode("img", {
                                        style: { "width": "30px", "height": "30px" },
                                        src: _imports_1$1,
                                        alt: "Visualizar"
                                      })
                                    ], 8, ["onClick"]),
                                    createVNode("div", {
                                      style: { "cursor": "pointer" },
                                      class: "mr-2",
                                      onClick: ($event) => redirectToUpdateBens(item.id),
                                      title: "Alterar Papel"
                                    }, [
                                      createVNode("img", {
                                        style: { "width": "30px", "height": "30px" },
                                        src: _imports_1,
                                        alt: "Editar"
                                      })
                                    ], 8, ["onClick"]),
                                    createVNode("div", {
                                      style: { "cursor": "pointer" },
                                      class: "mr-2",
                                      onClick: ($event) => deletePessoa(item),
                                      title: "Deletar Pessoa"
                                    }, [
                                      item.excluido ? (openBlock(), createBlock("img", {
                                        key: 0,
                                        style: { "width": "30px", "height": "30px" },
                                        src: _imports_2,
                                        alt: "Reativar",
                                        title: "Reativar"
                                      })) : (openBlock(), createBlock("img", {
                                        key: 1,
                                        src: _imports_3,
                                        alt: "Excluir",
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
                            "item.descricao": withCtx(({ item }) => [
                              createVNode("h3", { style: { "width": "800px", "font-weight": "500" } }, toDisplayString(item.descricao), 1)
                            ]),
                            "item.actions": withCtx(({ item }) => [
                              createVNode(VRow, {
                                style: { "margin-top": "-8px" },
                                justify: "end"
                              }, {
                                default: withCtx(() => [
                                  createVNode("div", {
                                    style: { "cursor": "pointer" },
                                    class: "mr-2",
                                    onClick: ($event) => _ctx.redirectToFicha(item),
                                    title: "Visualizar Ficha"
                                  }, [
                                    createVNode("img", {
                                      style: { "width": "30px", "height": "30px" },
                                      src: _imports_1$1,
                                      alt: "Visualizar"
                                    })
                                  ], 8, ["onClick"]),
                                  createVNode("div", {
                                    style: { "cursor": "pointer" },
                                    class: "mr-2",
                                    onClick: ($event) => redirectToUpdateBens(item.id),
                                    title: "Alterar Papel"
                                  }, [
                                    createVNode("img", {
                                      style: { "width": "30px", "height": "30px" },
                                      src: _imports_1,
                                      alt: "Editar"
                                    })
                                  ], 8, ["onClick"]),
                                  createVNode("div", {
                                    style: { "cursor": "pointer" },
                                    class: "mr-2",
                                    onClick: ($event) => deletePessoa(item),
                                    title: "Deletar Pessoa"
                                  }, [
                                    item.excluido ? (openBlock(), createBlock("img", {
                                      key: 0,
                                      style: { "width": "30px", "height": "30px" },
                                      src: _imports_2,
                                      alt: "Reativar",
                                      title: "Reativar"
                                    })) : (openBlock(), createBlock("img", {
                                      key: 1,
                                      src: _imports_3,
                                      alt: "Excluir",
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
                          "item.descricao": withCtx(({ item }) => [
                            createVNode("h3", { style: { "width": "800px", "font-weight": "500" } }, toDisplayString(item.descricao), 1)
                          ]),
                          "item.actions": withCtx(({ item }) => [
                            createVNode(VRow, {
                              style: { "margin-top": "-8px" },
                              justify: "end"
                            }, {
                              default: withCtx(() => [
                                createVNode("div", {
                                  style: { "cursor": "pointer" },
                                  class: "mr-2",
                                  onClick: ($event) => _ctx.redirectToFicha(item),
                                  title: "Visualizar Ficha"
                                }, [
                                  createVNode("img", {
                                    style: { "width": "30px", "height": "30px" },
                                    src: _imports_1$1,
                                    alt: "Visualizar"
                                  })
                                ], 8, ["onClick"]),
                                createVNode("div", {
                                  style: { "cursor": "pointer" },
                                  class: "mr-2",
                                  onClick: ($event) => redirectToUpdateBens(item.id),
                                  title: "Alterar Papel"
                                }, [
                                  createVNode("img", {
                                    style: { "width": "30px", "height": "30px" },
                                    src: _imports_1,
                                    alt: "Editar"
                                  })
                                ], 8, ["onClick"]),
                                createVNode("div", {
                                  style: { "cursor": "pointer" },
                                  class: "mr-2",
                                  onClick: ($event) => deletePessoa(item),
                                  title: "Deletar Pessoa"
                                }, [
                                  item.excluido ? (openBlock(), createBlock("img", {
                                    key: 0,
                                    style: { "width": "30px", "height": "30px" },
                                    src: _imports_2,
                                    alt: "Reativar",
                                    title: "Reativar"
                                  })) : (openBlock(), createBlock("img", {
                                    key: 1,
                                    src: _imports_3,
                                    alt: "Excluir",
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
                              _push5(`Atualizar Bem`);
                            } else {
                              return [
                                createTextVNode("Atualizar Bem")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VCardText, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VCol, {
                                class: "mt-1",
                                cols: "12"
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(VTextarea, {
                                      label: "Descri\xE7\xE3o",
                                      modelValue: unref(selectedBem).descricao,
                                      "onUpdate:modelValue": ($event) => unref(selectedBem).descricao = $event
                                    }, null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(VTextarea, {
                                        label: "Descri\xE7\xE3o",
                                        modelValue: unref(selectedBem).descricao,
                                        "onUpdate:modelValue": ($event) => unref(selectedBem).descricao = $event
                                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(VRow, null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(VCol, {
                                      class: "mt-6 ml-3",
                                      cols: "8"
                                    }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(VAutocomplete, {
                                            label: "Selecione o Tipo",
                                            items: unref(state).tiposBens,
                                            modelValue: unref(selectedBem).tipo_id,
                                            "onUpdate:modelValue": ($event) => unref(selectedBem).tipo_id = $event,
                                            "item-title": "descricao",
                                            "item-value": "id"
                                          }, null, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(VAutocomplete, {
                                              label: "Selecione o Tipo",
                                              items: unref(state).tiposBens,
                                              modelValue: unref(selectedBem).tipo_id,
                                              "onUpdate:modelValue": ($event) => unref(selectedBem).tipo_id = $event,
                                              "item-title": "descricao",
                                              "item-value": "id"
                                            }, null, 8, ["items", "modelValue", "onUpdate:modelValue"])
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(VCol, {
                                      class: "ml-5",
                                      cols: "3"
                                    }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`<label${_scopeId6}>Valor</label>`);
                                          _push7(ssrRenderComponent(_component_MoneyInput, {
                                            modelValue: unref(selectedBem).vlr_alienacao,
                                            "onUpdate:modelValue": ($event) => unref(selectedBem).vlr_alienacao = $event
                                          }, null, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode("label", null, "Valor"),
                                            createVNode(_component_MoneyInput, {
                                              modelValue: unref(selectedBem).vlr_alienacao,
                                              "onUpdate:modelValue": ($event) => unref(selectedBem).vlr_alienacao = $event
                                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(VCol, {
                                        class: "mt-6 ml-3",
                                        cols: "8"
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(VAutocomplete, {
                                            label: "Selecione o Tipo",
                                            items: unref(state).tiposBens,
                                            modelValue: unref(selectedBem).tipo_id,
                                            "onUpdate:modelValue": ($event) => unref(selectedBem).tipo_id = $event,
                                            "item-title": "descricao",
                                            "item-value": "id"
                                          }, null, 8, ["items", "modelValue", "onUpdate:modelValue"])
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(VCol, {
                                        class: "ml-5",
                                        cols: "3"
                                      }, {
                                        default: withCtx(() => [
                                          createVNode("label", null, "Valor"),
                                          createVNode(_component_MoneyInput, {
                                            modelValue: unref(selectedBem).vlr_alienacao,
                                            "onUpdate:modelValue": ($event) => unref(selectedBem).vlr_alienacao = $event
                                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
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
                                createVNode(VCol, {
                                  class: "mt-1",
                                  cols: "12"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(VTextarea, {
                                      label: "Descri\xE7\xE3o",
                                      modelValue: unref(selectedBem).descricao,
                                      "onUpdate:modelValue": ($event) => unref(selectedBem).descricao = $event
                                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                  ]),
                                  _: 1
                                }),
                                createVNode(VRow, null, {
                                  default: withCtx(() => [
                                    createVNode(VCol, {
                                      class: "mt-6 ml-3",
                                      cols: "8"
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(VAutocomplete, {
                                          label: "Selecione o Tipo",
                                          items: unref(state).tiposBens,
                                          modelValue: unref(selectedBem).tipo_id,
                                          "onUpdate:modelValue": ($event) => unref(selectedBem).tipo_id = $event,
                                          "item-title": "descricao",
                                          "item-value": "id"
                                        }, null, 8, ["items", "modelValue", "onUpdate:modelValue"])
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(VCol, {
                                      class: "ml-5",
                                      cols: "3"
                                    }, {
                                      default: withCtx(() => [
                                        createVNode("label", null, "Valor"),
                                        createVNode(_component_MoneyInput, {
                                          modelValue: unref(selectedBem).vlr_alienacao,
                                          "onUpdate:modelValue": ($event) => unref(selectedBem).vlr_alienacao = $event
                                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
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
                                onClick: ($event) => updateAtosBensModal(unref(selectedBem).id)
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
                                  onClick: ($event) => updateAtosBensModal(unref(selectedBem).id)
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
                              createTextVNode("Atualizar Bem")
                            ]),
                            _: 1
                          }),
                          createVNode(VCardText, null, {
                            default: withCtx(() => [
                              createVNode(VCol, {
                                class: "mt-1",
                                cols: "12"
                              }, {
                                default: withCtx(() => [
                                  createVNode(VTextarea, {
                                    label: "Descri\xE7\xE3o",
                                    modelValue: unref(selectedBem).descricao,
                                    "onUpdate:modelValue": ($event) => unref(selectedBem).descricao = $event
                                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                ]),
                                _: 1
                              }),
                              createVNode(VRow, null, {
                                default: withCtx(() => [
                                  createVNode(VCol, {
                                    class: "mt-6 ml-3",
                                    cols: "8"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(VAutocomplete, {
                                        label: "Selecione o Tipo",
                                        items: unref(state).tiposBens,
                                        modelValue: unref(selectedBem).tipo_id,
                                        "onUpdate:modelValue": ($event) => unref(selectedBem).tipo_id = $event,
                                        "item-title": "descricao",
                                        "item-value": "id"
                                      }, null, 8, ["items", "modelValue", "onUpdate:modelValue"])
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(VCol, {
                                    class: "ml-5",
                                    cols: "3"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode("label", null, "Valor"),
                                      createVNode(_component_MoneyInput, {
                                        modelValue: unref(selectedBem).vlr_alienacao,
                                        "onUpdate:modelValue": ($event) => unref(selectedBem).vlr_alienacao = $event
                                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
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
                                onClick: ($event) => updateAtosBensModal(unref(selectedBem).id)
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
                            createTextVNode("Atualizar Bem")
                          ]),
                          _: 1
                        }),
                        createVNode(VCardText, null, {
                          default: withCtx(() => [
                            createVNode(VCol, {
                              class: "mt-1",
                              cols: "12"
                            }, {
                              default: withCtx(() => [
                                createVNode(VTextarea, {
                                  label: "Descri\xE7\xE3o",
                                  modelValue: unref(selectedBem).descricao,
                                  "onUpdate:modelValue": ($event) => unref(selectedBem).descricao = $event
                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                              ]),
                              _: 1
                            }),
                            createVNode(VRow, null, {
                              default: withCtx(() => [
                                createVNode(VCol, {
                                  class: "mt-6 ml-3",
                                  cols: "8"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(VAutocomplete, {
                                      label: "Selecione o Tipo",
                                      items: unref(state).tiposBens,
                                      modelValue: unref(selectedBem).tipo_id,
                                      "onUpdate:modelValue": ($event) => unref(selectedBem).tipo_id = $event,
                                      "item-title": "descricao",
                                      "item-value": "id"
                                    }, null, 8, ["items", "modelValue", "onUpdate:modelValue"])
                                  ]),
                                  _: 1
                                }),
                                createVNode(VCol, {
                                  class: "ml-5",
                                  cols: "3"
                                }, {
                                  default: withCtx(() => [
                                    createVNode("label", null, "Valor"),
                                    createVNode(_component_MoneyInput, {
                                      modelValue: unref(selectedBem).vlr_alienacao,
                                      "onUpdate:modelValue": ($event) => unref(selectedBem).vlr_alienacao = $event
                                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
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
                              onClick: ($event) => updateAtosBensModal(unref(selectedBem).id)
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
            _push2(ssrRenderComponent(VRow, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_NuxtLink, { onClick: goBack }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VBtn, {
                          size: "large",
                          color: "red"
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
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_NuxtLink, { onClick: goBack }, {
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
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(VCol, {
                class: "mt-5",
                cols: "12"
              }, {
                default: withCtx(() => [
                  createVNode(VTextarea, {
                    label: "Descri\xE7\xE3o",
                    modelValue: unref(state).descricao,
                    "onUpdate:modelValue": ($event) => unref(state).descricao = $event
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              }),
              createVNode(VRow, { class: "ml-1 mb-3" }, {
                default: withCtx(() => [
                  createVNode(VCol, {
                    class: "mt-6",
                    cols: "8"
                  }, {
                    default: withCtx(() => [
                      createVNode(VAutocomplete, {
                        label: "Selecione o Tipo",
                        items: unref(state).tiposBens,
                        modelValue: unref(state).tipo_id,
                        "onUpdate:modelValue": ($event) => unref(state).tipo_id = $event,
                        "item-title": "descricao",
                        "item-value": "id"
                      }, null, 8, ["items", "modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(VCol, {
                    class: "ml-5",
                    cols: "3"
                  }, {
                    default: withCtx(() => [
                      createVNode("label", null, "Valor"),
                      createVNode(_component_MoneyInput, {
                        modelValue: unref(state).vlr_alienacao,
                        "onUpdate:modelValue": ($event) => unref(state).vlr_alienacao = $event
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode("div", null, [
                    createVNode("img", {
                      class: "mt-7 ml-4",
                      src: _imports_0,
                      style: { "width": "40px", "cursor": "pointer" },
                      title: "Criar Representante",
                      onClick: createTiposDeBens
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
                        "item.descricao": withCtx(({ item }) => [
                          createVNode("h3", { style: { "width": "800px", "font-weight": "500" } }, toDisplayString(item.descricao), 1)
                        ]),
                        "item.actions": withCtx(({ item }) => [
                          createVNode(VRow, {
                            style: { "margin-top": "-8px" },
                            justify: "end"
                          }, {
                            default: withCtx(() => [
                              createVNode("div", {
                                style: { "cursor": "pointer" },
                                class: "mr-2",
                                onClick: ($event) => _ctx.redirectToFicha(item),
                                title: "Visualizar Ficha"
                              }, [
                                createVNode("img", {
                                  style: { "width": "30px", "height": "30px" },
                                  src: _imports_1$1,
                                  alt: "Visualizar"
                                })
                              ], 8, ["onClick"]),
                              createVNode("div", {
                                style: { "cursor": "pointer" },
                                class: "mr-2",
                                onClick: ($event) => redirectToUpdateBens(item.id),
                                title: "Alterar Papel"
                              }, [
                                createVNode("img", {
                                  style: { "width": "30px", "height": "30px" },
                                  src: _imports_1,
                                  alt: "Editar"
                                })
                              ], 8, ["onClick"]),
                              createVNode("div", {
                                style: { "cursor": "pointer" },
                                class: "mr-2",
                                onClick: ($event) => deletePessoa(item),
                                title: "Deletar Pessoa"
                              }, [
                                item.excluido ? (openBlock(), createBlock("img", {
                                  key: 0,
                                  style: { "width": "30px", "height": "30px" },
                                  src: _imports_2,
                                  alt: "Reativar",
                                  title: "Reativar"
                                })) : (openBlock(), createBlock("img", {
                                  key: 1,
                                  src: _imports_3,
                                  alt: "Excluir",
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
                          createTextVNode("Atualizar Bem")
                        ]),
                        _: 1
                      }),
                      createVNode(VCardText, null, {
                        default: withCtx(() => [
                          createVNode(VCol, {
                            class: "mt-1",
                            cols: "12"
                          }, {
                            default: withCtx(() => [
                              createVNode(VTextarea, {
                                label: "Descri\xE7\xE3o",
                                modelValue: unref(selectedBem).descricao,
                                "onUpdate:modelValue": ($event) => unref(selectedBem).descricao = $event
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            _: 1
                          }),
                          createVNode(VRow, null, {
                            default: withCtx(() => [
                              createVNode(VCol, {
                                class: "mt-6 ml-3",
                                cols: "8"
                              }, {
                                default: withCtx(() => [
                                  createVNode(VAutocomplete, {
                                    label: "Selecione o Tipo",
                                    items: unref(state).tiposBens,
                                    modelValue: unref(selectedBem).tipo_id,
                                    "onUpdate:modelValue": ($event) => unref(selectedBem).tipo_id = $event,
                                    "item-title": "descricao",
                                    "item-value": "id"
                                  }, null, 8, ["items", "modelValue", "onUpdate:modelValue"])
                                ]),
                                _: 1
                              }),
                              createVNode(VCol, {
                                class: "ml-5",
                                cols: "3"
                              }, {
                                default: withCtx(() => [
                                  createVNode("label", null, "Valor"),
                                  createVNode(_component_MoneyInput, {
                                    modelValue: unref(selectedBem).vlr_alienacao,
                                    "onUpdate:modelValue": ($event) => unref(selectedBem).vlr_alienacao = $event
                                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
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
                            onClick: ($event) => updateAtosBensModal(unref(selectedBem).id)
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
              }, 8, ["modelValue", "onUpdate:modelValue"]),
              createVNode(VRow, null, {
                default: withCtx(() => [
                  createVNode(_component_NuxtLink, { onClick: goBack }, {
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
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Procuracao/atualizar/Bens.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : undefined;
};
const _sfc_main$2 = {
  __name: "Imoveis",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const config = useRuntimeConfig();
    const imoveisLista = `${config.public.auth}/service/gerencia/atos_imoveis`;
    const imoveisUpdate = `${config.public.auth}/service/gerencia/atos_bens`;
    const router = useRouter$1();
    const route = useRoute$1();
    const search = ref("");
    const searchMatricula = ref("");
    const isModalCadastroImoveisOpen = ref(false);
    const isModalAtualizarImoveisOpen = ref(false);
    const idImovel = ref(null);
    const headers = [
      { title: "Matr\xEDcula", value: "registro_matricula" },
      { title: "Descri\xE7\xE3o", value: "descricao" },
      { value: "actions" }
    ];
    const { data: imoveisItems, status } = ([__temp, __restore] = withAsyncContext(() => fetchWithToken(imoveisLista, {
      method: "POST",
      body: { ato_token: route.query.ato_token_edit }
    })), __temp = await __temp, __restore(), __temp);
    const filteredImoveis = computed(() => {
      if (Object.keys(imoveisItems.value).length === 0) {
        return;
      }
      return imoveisItems.value.filter((item) => {
        const matriculaSearch = item.matricula ? item.matricula.toLowerCase() : "";
        const descricao = item.descricao ? item.descricao.toLowerCase() : "";
        const matchesMatricula = matriculaSearch.includes(
          searchMatricula.value.toLowerCase()
        );
        const matchesDescricao = descricao.includes(search.value.toLowerCase());
        return matchesMatricula && matchesDescricao;
      });
    });
    async function deletePessoa(item) {
      item.excluido = !item.excluido;
      try {
        await fetchWithToken(`${imoveisUpdate}/${item.id}`, {
          method: "PUT",
          body: { excluido: item.excluido }
        });
      } catch (error) {
        console.error("Erro ao excluir pessoa:", error);
      }
    }
    function redirectToUpdate(id) {
      idImovel.value = id;
      isModalAtualizarImoveisOpen.value = true;
    }
    const atualizarListaImoveis = async () => {
      await fetchWithToken(imoveisLista, {
        method: "POST",
        body: { ato_token: route.query.ato_token_edit }
      });
    };
    const goBack = () => {
      const origem = route.query.origem || "criar";
      const id = route.query.id;
      if (origem === "atualizar") {
        router.push(`/os/atualizar/${id}`);
      } else {
        router.push("/os/criar-registro");
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      const _component_ModalImoveisCadastro = _sfc_main$1$2;
      const _component_ModalImoveisAtualizar = _sfc_main$8;
      if (unref(status) === "success") {
        _push(ssrRenderComponent(VContainer, mergeProps({ class: "mt-5" }, _attrs), {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<img style="${ssrRenderStyle({ "cursor": "pointer" })}"${ssrRenderAttr("src", _imports_0)} alt="Cadastro"${_scopeId}>`);
              _push2(ssrRenderComponent(VRow, { style: { "gap": "3rem" } }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div style="${ssrRenderStyle({ "width": "200px" })}"${_scopeId2}>`);
                    _push3(ssrRenderComponent(VTextField, {
                      class: "mt-7 mb-4",
                      modelValue: unref(searchMatricula),
                      "onUpdate:modelValue": ($event) => isRef(searchMatricula) ? searchMatricula.value = $event : null,
                      label: "Matr\xEDcula",
                      "prepend-inner-icon": "mdi-magnify",
                      variant: "outlined",
                      "hide-details": ""
                    }, null, _parent3, _scopeId2));
                    _push3(`</div><div style="${ssrRenderStyle({ "width": "300px" })}"${_scopeId2}>`);
                    _push3(ssrRenderComponent(VTextField, {
                      class: "mt-7 mb-4",
                      modelValue: unref(search),
                      "onUpdate:modelValue": ($event) => isRef(search) ? search.value = $event : null,
                      label: "Descri\xE7\xE3o",
                      "prepend-inner-icon": "mdi-magnify",
                      variant: "outlined",
                      "hide-details": ""
                    }, null, _parent3, _scopeId2));
                    _push3(`</div>`);
                  } else {
                    return [
                      createVNode("div", { style: { "width": "200px" } }, [
                        createVNode(VTextField, {
                          class: "mt-7 mb-4",
                          modelValue: unref(searchMatricula),
                          "onUpdate:modelValue": ($event) => isRef(searchMatricula) ? searchMatricula.value = $event : null,
                          label: "Matr\xEDcula",
                          "prepend-inner-icon": "mdi-magnify",
                          variant: "outlined",
                          "hide-details": ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      createVNode("div", { style: { "width": "300px" } }, [
                        createVNode(VTextField, {
                          class: "mt-7 mb-4",
                          modelValue: unref(search),
                          "onUpdate:modelValue": ($event) => isRef(search) ? search.value = $event : null,
                          label: "Descri\xE7\xE3o",
                          "prepend-inner-icon": "mdi-magnify",
                          variant: "outlined",
                          "hide-details": ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(VDataTable, {
                density: "compact",
                headers,
                items: unref(filteredImoveis),
                "item-key": "id"
              }, {
                "item.descricao": withCtx(({ item }, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<h3 style="${ssrRenderStyle({ "width": "800px", "font-weight": "500" })}"${_scopeId2}>${ssrInterpolate(item.descricao)}</h3>`);
                  } else {
                    return [
                      createVNode("h3", { style: { "width": "800px", "font-weight": "500" } }, toDisplayString(item.descricao), 1)
                    ];
                  }
                }),
                "item.actions": withCtx(({ item }, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(VRow, { style: { "display": "flex", "gap": "10px", "justify-content": "flex-end" } }, {
                      default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<div style="${ssrRenderStyle({ "cursor": "pointer" })}" title="Visualizar"${_scopeId3}><img style="${ssrRenderStyle({ "width": "30px", "height": "30px" })}"${ssrRenderAttr("src", _imports_1$1)} alt="Visualizar"${_scopeId3}></div><div style="${ssrRenderStyle({ "cursor": "pointer" })}" title="Atualizar"${_scopeId3}><img style="${ssrRenderStyle({ "width": "30px", "height": "30px" })}"${ssrRenderAttr("src", _imports_1)} alt="Atualizar"${_scopeId3}></div><div style="${ssrRenderStyle({ "cursor": "pointer" })}" title="Deletar"${_scopeId3}>`);
                          if (item.excluido) {
                            _push4(`<img style="${ssrRenderStyle({ "width": "30px", "height": "30px" })}"${ssrRenderAttr("src", _imports_2)} alt="Visualizar" title="Reativar"${_scopeId3}>`);
                          } else {
                            _push4(`<img${ssrRenderAttr("src", _imports_3)} alt="Excluir" class="trash-icon" style="${ssrRenderStyle({ "width": "30px", "height": "30px" })}" title="Excluir"${_scopeId3}>`);
                          }
                          _push4(`</div>`);
                        } else {
                          return [
                            createVNode("div", {
                              style: { "cursor": "pointer" },
                              onClick: ($event) => _ctx.redirectToView(item.id),
                              title: "Visualizar"
                            }, [
                              createVNode("img", {
                                style: { "width": "30px", "height": "30px" },
                                src: _imports_1$1,
                                alt: "Visualizar"
                              })
                            ], 8, ["onClick"]),
                            createVNode("div", {
                              style: { "cursor": "pointer" },
                              onClick: ($event) => redirectToUpdate(item.id),
                              title: "Atualizar"
                            }, [
                              createVNode("img", {
                                style: { "width": "30px", "height": "30px" },
                                src: _imports_1,
                                alt: "Atualizar"
                              })
                            ], 8, ["onClick"]),
                            createVNode("div", {
                              style: { "cursor": "pointer" },
                              onClick: ($event) => deletePessoa(item),
                              title: "Deletar"
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
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(VRow, { style: { "display": "flex", "gap": "10px", "justify-content": "flex-end" } }, {
                        default: withCtx(() => [
                          createVNode("div", {
                            style: { "cursor": "pointer" },
                            onClick: ($event) => _ctx.redirectToView(item.id),
                            title: "Visualizar"
                          }, [
                            createVNode("img", {
                              style: { "width": "30px", "height": "30px" },
                              src: _imports_1$1,
                              alt: "Visualizar"
                            })
                          ], 8, ["onClick"]),
                          createVNode("div", {
                            style: { "cursor": "pointer" },
                            onClick: ($event) => redirectToUpdate(item.id),
                            title: "Atualizar"
                          }, [
                            createVNode("img", {
                              style: { "width": "30px", "height": "30px" },
                              src: _imports_1,
                              alt: "Atualizar"
                            })
                          ], 8, ["onClick"]),
                          createVNode("div", {
                            style: { "cursor": "pointer" },
                            onClick: ($event) => deletePessoa(item),
                            title: "Deletar"
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
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_NuxtLink, { onClick: goBack }, {
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
              _push2(ssrRenderComponent(_component_ModalImoveisCadastro, {
                onRefresh: atualizarListaImoveis,
                show: unref(isModalCadastroImoveisOpen),
                onClose: ($event) => isModalCadastroImoveisOpen.value = false
              }, null, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_ModalImoveisAtualizar, {
                onRefresh: atualizarListaImoveis,
                imovel_id: unref(idImovel),
                show: unref(isModalAtualizarImoveisOpen),
                onClose: ($event) => isModalAtualizarImoveisOpen.value = false
              }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode("img", {
                  onClick: ($event) => isModalCadastroImoveisOpen.value = true,
                  style: { "cursor": "pointer" },
                  src: _imports_0,
                  alt: "Cadastro"
                }, null, 8, ["onClick"]),
                createVNode(VRow, { style: { "gap": "3rem" } }, {
                  default: withCtx(() => [
                    createVNode("div", { style: { "width": "200px" } }, [
                      createVNode(VTextField, {
                        class: "mt-7 mb-4",
                        modelValue: unref(searchMatricula),
                        "onUpdate:modelValue": ($event) => isRef(searchMatricula) ? searchMatricula.value = $event : null,
                        label: "Matr\xEDcula",
                        "prepend-inner-icon": "mdi-magnify",
                        variant: "outlined",
                        "hide-details": ""
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    createVNode("div", { style: { "width": "300px" } }, [
                      createVNode(VTextField, {
                        class: "mt-7 mb-4",
                        modelValue: unref(search),
                        "onUpdate:modelValue": ($event) => isRef(search) ? search.value = $event : null,
                        label: "Descri\xE7\xE3o",
                        "prepend-inner-icon": "mdi-magnify",
                        variant: "outlined",
                        "hide-details": ""
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ])
                  ]),
                  _: 1
                }),
                createVNode(VDataTable, {
                  density: "compact",
                  headers,
                  items: unref(filteredImoveis),
                  "item-key": "id"
                }, {
                  "item.descricao": withCtx(({ item }) => [
                    createVNode("h3", { style: { "width": "800px", "font-weight": "500" } }, toDisplayString(item.descricao), 1)
                  ]),
                  "item.actions": withCtx(({ item }) => [
                    createVNode(VRow, { style: { "display": "flex", "gap": "10px", "justify-content": "flex-end" } }, {
                      default: withCtx(() => [
                        createVNode("div", {
                          style: { "cursor": "pointer" },
                          onClick: ($event) => _ctx.redirectToView(item.id),
                          title: "Visualizar"
                        }, [
                          createVNode("img", {
                            style: { "width": "30px", "height": "30px" },
                            src: _imports_1$1,
                            alt: "Visualizar"
                          })
                        ], 8, ["onClick"]),
                        createVNode("div", {
                          style: { "cursor": "pointer" },
                          onClick: ($event) => redirectToUpdate(item.id),
                          title: "Atualizar"
                        }, [
                          createVNode("img", {
                            style: { "width": "30px", "height": "30px" },
                            src: _imports_1,
                            alt: "Atualizar"
                          })
                        ], 8, ["onClick"]),
                        createVNode("div", {
                          style: { "cursor": "pointer" },
                          onClick: ($event) => deletePessoa(item),
                          title: "Deletar"
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
                }, 8, ["items"]),
                createVNode(_component_NuxtLink, { onClick: goBack }, {
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
                createVNode(_component_ModalImoveisCadastro, {
                  onRefresh: atualizarListaImoveis,
                  show: unref(isModalCadastroImoveisOpen),
                  onClose: ($event) => isModalCadastroImoveisOpen.value = false
                }, null, 8, ["show", "onClose"]),
                createVNode(_component_ModalImoveisAtualizar, {
                  onRefresh: atualizarListaImoveis,
                  imovel_id: unref(idImovel),
                  show: unref(isModalAtualizarImoveisOpen),
                  onClose: ($event) => isModalAtualizarImoveisOpen.value = false
                }, null, 8, ["imovel_id", "show", "onClose"])
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Procuracao/atualizar/Imoveis.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : undefined;
};
const _sfc_main$1 = {
  __name: "Outros",
  __ssrInlineRender: true,
  props: {
    ato_id: {
      type: Number,
      required: true
    }
  },
  async setup(__props) {
    let __temp, __restore;
    const router = useRouter$1();
    const route = useRoute$1();
    const config = useRuntimeConfig();
    const { $toast } = useNuxtApp();
    const allEscreventes = `${config.public.managemant}/listarEscrevente`;
    `${config.public.managemant}/getAtosTiposByToken`;
    const createAtoObservacao = `${config.public.managemant}/createAtosObservacao`;
    const observacaoUpdate = `${config.public.managemant}/updateAtosObservacao`;
    const getAtosObservacao = `${config.public.managemant}/getAtosObservacaoById`;
    const cartorio_token = ref(useCookie("user-data").value.cartorio_token);
    const observacoesItems = ref([]);
    const escreventesItems = ref([]);
    const headers = [
      { title: "Data", align: "start", key: "created" },
      { title: "Quantidade", align: "start", key: "users.nome" },
      { title: "Valor Unitario", align: "start", key: "users.nome" },
      { title: "Observa\xE7\xE3o", align: "start", key: "observacao" },
      { value: "actions" }
    ];
    const state = reactive({
      observacao: ""
    });
    const rules = {
      observacao: {
        required: helpers.withMessage("O campo \xE9 obrigat\xF3rio", required)
      }
    };
    const v$ = useVuelidate(rules, state);
    const { data: dadosObservacao } = ([__temp, __restore] = withAsyncContext(() => useFetch(
      `${getAtosObservacao}/${route.query.ato_id}`,
      {
        method: "GET"
      },
      "$kQ0nj1mhl6"
    )), __temp = await __temp, __restore(), __temp);
    if (dadosObservacao.value) {
      observacoesItems.value = dadosObservacao.value.map((item) => ({
        ...item,
        created: __unimport_formatDate(item.created, "dd/mm/yyyy hh:mm")
      }));
    }
    async function onSubmit() {
      if (state.observacao.trim() === "") {
        $toast.error("O campo de observa\xE7\xE3o est\xE1 vazio.");
        return;
      }
      if (await v$.value.$validate()) {
        const { data: data2, error, status } = await useFetch(createAtoObservacao, {
          method: "POST",
          body: {
            ato_id: route.query.ato_id,
            observacao: state.observacao,
            user_id: useCookie("user-data").value.usuario_id
          }
        }, "$DwnPGm5aLw");
        if (status.value === "success") {
          observacoesItems.value.push({
            created: __unimport_formatDate(data2.value.created, "dd/mm/yyyy hh:mm"),
            observacao: data2.value.observacao,
            id: data2.value.id,
            escrevente: useCookie("user-data").value.nome
          });
          state.observacao = "";
          $toast.success("Observa\xE7\xE3o registrada com sucesso");
        }
      } else {
        $toast.error("Preencha os campos obrigat\xF3rios.");
      }
    }
    async function deleteObservacao(item) {
      item.excluido = !item.excluido;
      try {
        await useFetch(`${observacaoUpdate}/${item.id}`, {
          method: "PUT",
          body: JSON.stringify({ excluido: item.excluido })
        }, "$2e0uNuFQSO");
      } catch (error) {
        console.error("Erro ao excluir observa\xE7\xE3o:", error);
      }
    }
    const { data } = ([__temp, __restore] = withAsyncContext(() => useFetch(allEscreventes, {
      method: "POST",
      body: { cartorio_token }
    }, "$YuLwFWKIry")), __temp = await __temp, __restore(), __temp);
    escreventesItems.value = data.value[0].func_json_escreventes;
    const goBack = () => {
      const origem = route.query.origem || "criar";
      const id = route.query.id;
      if (origem === "atualizar") {
        router.push(`/os/atualizar/${id}`);
      } else {
        router.push("/os/criar-registro");
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_MoneyInput = __nuxt_component_0;
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(ssrRenderComponent(VContainer, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VRow, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VCol, { cols: "3" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VTextField, {
                          label: "Observa\xE7\xE3o",
                          modelValue: state.observacao,
                          "onUpdate:modelValue": ($event) => state.observacao = $event,
                          required: ""
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VTextField, {
                            label: "Observa\xE7\xE3o",
                            modelValue: state.observacao,
                            "onUpdate:modelValue": ($event) => state.observacao = $event,
                            required: ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VCol, { cols: "5" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VAutocomplete, { label: "Outros Atos" }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VAutocomplete, { label: "Outros Atos" })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<div${_scopeId2}><img class="btn-pointer ml-2"${ssrRenderAttr("src", _imports_0)} style="${ssrRenderStyle({ "width": "40px", "cursor": "pointer" })}" title="Criar Pessoa"${_scopeId2}></div>`);
                } else {
                  return [
                    createVNode(VCol, { cols: "3" }, {
                      default: withCtx(() => [
                        createVNode(VTextField, {
                          label: "Observa\xE7\xE3o",
                          modelValue: state.observacao,
                          "onUpdate:modelValue": ($event) => state.observacao = $event,
                          required: ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, { cols: "5" }, {
                      default: withCtx(() => [
                        createVNode(VAutocomplete, { label: "Outros Atos" })
                      ]),
                      _: 1
                    }),
                    createVNode("div", null, [
                      createVNode("img", {
                        class: "btn-pointer ml-2",
                        src: _imports_0,
                        style: { "width": "40px", "cursor": "pointer" },
                        title: "Criar Pessoa",
                        onClick: onSubmit
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
                  _push3(ssrRenderComponent(VCol, {
                    cols: "4",
                    class: "mt-6"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VTextField, {
                          label: "Quantidade",
                          type: "number"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VTextField, {
                            label: "Quantidade",
                            type: "number"
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VCol, { cols: "4" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<label for=""${_scopeId3}>Valor unitario</label>`);
                        _push4(ssrRenderComponent(_component_MoneyInput, null, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode("label", { for: "" }, "Valor unitario"),
                          createVNode(_component_MoneyInput)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VCol, {
                      cols: "4",
                      class: "mt-6"
                    }, {
                      default: withCtx(() => [
                        createVNode(VTextField, {
                          label: "Quantidade",
                          type: "number"
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, { cols: "4" }, {
                      default: withCtx(() => [
                        createVNode("label", { for: "" }, "Valor unitario"),
                        createVNode(_component_MoneyInput)
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
                  _push3(ssrRenderComponent(VCol, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VDataTable, {
                          style: { "height": "465px" },
                          headers,
                          items: observacoesItems.value
                        }, {
                          "item.actions": withCtx(({ item }, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<div style="${ssrRenderStyle({ "display": "flex", "cursor": "pointer", "justify-content": "flex-end" })}" title="Deletar Observa\xE7\xE3o"${_scopeId4}>`);
                              if (item.excluido) {
                                _push5(`<img style="${ssrRenderStyle({ "width": "30px", "height": "30px" })}"${ssrRenderAttr("src", _imports_2)} alt="Visualizar" title="Reativar"${_scopeId4}>`);
                              } else {
                                _push5(`<img${ssrRenderAttr("src", _imports_3)} alt="Excluir" class="trash-icon" style="${ssrRenderStyle({ "width": "30px", "height": "30px" })}" title="Excluir"${_scopeId4}>`);
                              }
                              _push5(`</div>`);
                            } else {
                              return [
                                createVNode("div", {
                                  style: { "display": "flex", "cursor": "pointer", "justify-content": "flex-end" },
                                  onClick: ($event) => deleteObservacao(item),
                                  title: "Deletar Observa\xE7\xE3o"
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
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VDataTable, {
                            style: { "height": "465px" },
                            headers,
                            items: observacoesItems.value
                          }, {
                            "item.actions": withCtx(({ item }) => [
                              createVNode("div", {
                                style: { "display": "flex", "cursor": "pointer", "justify-content": "flex-end" },
                                onClick: ($event) => deleteObservacao(item),
                                title: "Deletar Observa\xE7\xE3o"
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
                          items: observacoesItems.value
                        }, {
                          "item.actions": withCtx(({ item }) => [
                            createVNode("div", {
                              style: { "display": "flex", "cursor": "pointer", "justify-content": "flex-end" },
                              onClick: ($event) => deleteObservacao(item),
                              title: "Deletar Observa\xE7\xE3o"
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
            _push2(ssrRenderComponent(VRow, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_NuxtLink, { onClick: goBack }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VBtn, {
                          size: "large",
                          color: "red"
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
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_NuxtLink, { onClick: goBack }, {
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
                  createVNode(VCol, { cols: "3" }, {
                    default: withCtx(() => [
                      createVNode(VTextField, {
                        label: "Observa\xE7\xE3o",
                        modelValue: state.observacao,
                        "onUpdate:modelValue": ($event) => state.observacao = $event,
                        required: ""
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(VCol, { cols: "5" }, {
                    default: withCtx(() => [
                      createVNode(VAutocomplete, { label: "Outros Atos" })
                    ]),
                    _: 1
                  }),
                  createVNode("div", null, [
                    createVNode("img", {
                      class: "btn-pointer ml-2",
                      src: _imports_0,
                      style: { "width": "40px", "cursor": "pointer" },
                      title: "Criar Pessoa",
                      onClick: onSubmit
                    })
                  ])
                ]),
                _: 1
              }),
              createVNode(VRow, null, {
                default: withCtx(() => [
                  createVNode(VCol, {
                    cols: "4",
                    class: "mt-6"
                  }, {
                    default: withCtx(() => [
                      createVNode(VTextField, {
                        label: "Quantidade",
                        type: "number"
                      })
                    ]),
                    _: 1
                  }),
                  createVNode(VCol, { cols: "4" }, {
                    default: withCtx(() => [
                      createVNode("label", { for: "" }, "Valor unitario"),
                      createVNode(_component_MoneyInput)
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
                      createVNode(VDataTable, {
                        style: { "height": "465px" },
                        headers,
                        items: observacoesItems.value
                      }, {
                        "item.actions": withCtx(({ item }) => [
                          createVNode("div", {
                            style: { "display": "flex", "cursor": "pointer", "justify-content": "flex-end" },
                            onClick: ($event) => deleteObservacao(item),
                            title: "Deletar Observa\xE7\xE3o"
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
                        _: 1
                      }, 8, ["items"])
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(VRow, null, {
                default: withCtx(() => [
                  createVNode(_component_NuxtLink, { onClick: goBack }, {
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Procuracao/atualizar/Outros.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : undefined;
};
const _sfc_main = {
  __name: "[id]",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const pages_prop = ref(null);
    const doc_prop = ref(null);
    const tab = ref(null);
    const config = useRuntimeConfig();
    const route = useRoute$1();
    const allSituacoes = `${config.public.auth}/service/gerencia/listarSituacoes`;
    const getAtoId = `${config.public.auth}/service/gerencia/getAtos`;
    const cartorio_token = ref(useCookie("user-data").value.cartorio_token);
    const body = route.query.id ? { ato_token: route.query.tipo_ato_token } : { cartorio_token };
    const situacoesItems = ref([]);
    const dadosData = ref([]);
    const label = ref("PROCURA\xC7\xD5ES");
    const modalVisible = ref(false);
    const usaImoveis = ref(route.query.usa_imoveis === "true" ? true : false);
    const updatedAtoDetails = ref(route.query.tipo_ato || "");
    async function loadData() {
      try {
        const { data: tipoAtoId } = await fetchWithToken(
          `${getAtoId}/${route.query.ato_id}`,
          {
            method: "GET"
          }
        );
        dadosData.value = tipoAtoId.value;
      } catch (error) {
        console.log(error);
      }
    }
    [__temp, __restore] = withAsyncContext(() => loadData()), await __temp, __restore();
    const { data: situacaoData, status } = ([__temp, __restore] = withAsyncContext(() => fetchWithToken(allSituacoes, {
      method: "POST",
      body
    })), __temp = await __temp, __restore(), __temp);
    situacoesItems.value = situacaoData.value;
    const getPages = (pages) => {
      pages_prop.value = pages;
    };
    const getDocument = (doc) => {
      doc_prop.value = doc;
    };
    function openModal() {
      if (!dadosData.dt_lavratura) {
        modalVisible.value = true;
      }
    }
    function handleUpdateAto({ descricao, usaImoveisParams }) {
      console.log(usaImoveisParams);
      updatedAtoDetails.value = descricao;
      usaImoveis.value = usaImoveisParams;
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ProcuracaoAtualizarDados = _sfc_main$6;
      const _component_ProcuracaoAtualizarPartes = _sfc_main$5;
      const _component_ProcuracaoAtualizarBens = _sfc_main$3;
      const _component_ProcuracaoAtualizarImoveis = _sfc_main$2;
      const _component_ProcuracaoAtualizarMinuta = _sfc_main$4;
      const _component_ProcuracaoAtualizarLivro = _sfc_main$3$1;
      const _component_ProcuracaoAtualizarObservacao = _sfc_main$2$1;
      const _component_ProcuracaoAtualizarAnexos = _sfc_main$1$1;
      const _component_ProcuracaoAtualizarOutros = _sfc_main$1;
      const _component_ModalTiposAtos = _sfc_main$7;
      _push(`<!--[--><div class="mb-10">`);
      _push(ssrRenderComponent(VRow, { class: "mb-5 mt-5" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h1${_scopeId}>Ordem de Servi\xE7o n\xBA</h1><h1 style="${ssrRenderStyle({ "color": "red", "margin-left": "30px" })}"${_scopeId}>${ssrInterpolate(unref(route).query.numero_os)}</h1>`);
          } else {
            return [
              createVNode("h1", null, "Ordem de Servi\xE7o n\xBA"),
              createVNode("h1", { style: { "color": "red", "margin-left": "30px" } }, toDisplayString(unref(route).query.numero_os), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(VRow, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VCol, { md: "6" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VAutocomplete, {
                    class: "mr-5",
                    modelValue: unref(label),
                    "onUpdate:modelValue": ($event) => isRef(label) ? label.value = $event : null,
                    disabled: ""
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VAutocomplete, {
                      class: "mr-5",
                      modelValue: unref(label),
                      "onUpdate:modelValue": ($event) => isRef(label) ? label.value = $event : null,
                      disabled: ""
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(VCol, { md: "5" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VAutocomplete, {
                    modelValue: unref(updatedAtoDetails),
                    "onUpdate:modelValue": ($event) => isRef(updatedAtoDetails) ? updatedAtoDetails.value = $event : null,
                    label: "Servi\xE7o e Tipo de Ato Selecionado",
                    disabled: ""
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VAutocomplete, {
                      modelValue: unref(updatedAtoDetails),
                      "onUpdate:modelValue": ($event) => isRef(updatedAtoDetails) ? updatedAtoDetails.value = $event : null,
                      label: "Servi\xE7o e Tipo de Ato Selecionado",
                      disabled: ""
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<div${_scopeId}><img class="mt-2" style="${ssrRenderStyle({
              cursor: unref(dadosData).dt_lavratura ? "default" : "pointer",
              width: "35px",
              height: "35px"
            })}"${ssrRenderAttr("src", _imports_1)} alt="Editar"${_scopeId}></div>`);
          } else {
            return [
              createVNode(VCol, { md: "6" }, {
                default: withCtx(() => [
                  createVNode(VAutocomplete, {
                    class: "mr-5",
                    modelValue: unref(label),
                    "onUpdate:modelValue": ($event) => isRef(label) ? label.value = $event : null,
                    disabled: ""
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              }),
              createVNode(VCol, { md: "5" }, {
                default: withCtx(() => [
                  createVNode(VAutocomplete, {
                    modelValue: unref(updatedAtoDetails),
                    "onUpdate:modelValue": ($event) => isRef(updatedAtoDetails) ? updatedAtoDetails.value = $event : null,
                    label: "Servi\xE7o e Tipo de Ato Selecionado",
                    disabled: ""
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              }),
              createVNode("div", null, [
                createVNode("img", {
                  class: "mt-2",
                  style: {
                    cursor: unref(dadosData).dt_lavratura ? "default" : "pointer",
                    width: "35px",
                    height: "35px"
                  },
                  src: _imports_1,
                  alt: "Editar",
                  onClick: openModal
                }, null, 4)
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(VCard, { width: "1300" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
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
                  _push3(ssrRenderComponent(VTab, { value: "partes" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Partes`);
                      } else {
                        return [
                          createTextVNode("Partes")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  if (unref(usaImoveis)) {
                    _push3(ssrRenderComponent(VTab, { value: "bens" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`Bens`);
                        } else {
                          return [
                            createTextVNode("Bens")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  if (unref(usaImoveis)) {
                    _push3(ssrRenderComponent(VTab, { value: "imoveis" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`Imoveis`);
                        } else {
                          return [
                            createTextVNode("Imoveis")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(ssrRenderComponent(VTab, { value: "minuta" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Minuta`);
                      } else {
                        return [
                          createTextVNode("Minuta")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VTab, { value: "livro" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Livro`);
                      } else {
                        return [
                          createTextVNode("Livro")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VTab, { value: "observacao" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Observa\xE7\xF5es`);
                      } else {
                        return [
                          createTextVNode("Observa\xE7\xF5es")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VTab, { value: "anexo" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Anexos`);
                      } else {
                        return [
                          createTextVNode("Anexos")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VTab, { value: "outros" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Outros`);
                      } else {
                        return [
                          createTextVNode("Outros")
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
                    createVNode(VTab, { value: "partes" }, {
                      default: withCtx(() => [
                        createTextVNode("Partes")
                      ]),
                      _: 1
                    }),
                    unref(usaImoveis) ? (openBlock(), createBlock(VTab, {
                      key: 0,
                      value: "bens"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Bens")
                      ]),
                      _: 1
                    })) : createCommentVNode("", true),
                    unref(usaImoveis) ? (openBlock(), createBlock(VTab, {
                      key: 1,
                      value: "imoveis"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Imoveis")
                      ]),
                      _: 1
                    })) : createCommentVNode("", true),
                    createVNode(VTab, { value: "minuta" }, {
                      default: withCtx(() => [
                        createTextVNode("Minuta")
                      ]),
                      _: 1
                    }),
                    createVNode(VTab, { value: "livro" }, {
                      default: withCtx(() => [
                        createTextVNode("Livro")
                      ]),
                      _: 1
                    }),
                    createVNode(VTab, { value: "observacao" }, {
                      default: withCtx(() => [
                        createTextVNode("Observa\xE7\xF5es")
                      ]),
                      _: 1
                    }),
                    createVNode(VTab, { value: "anexo" }, {
                      default: withCtx(() => [
                        createTextVNode("Anexos")
                      ]),
                      _: 1
                    }),
                    createVNode(VTab, { value: "outros" }, {
                      default: withCtx(() => [
                        createTextVNode("Outros")
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
                        _push4(ssrRenderComponent(_component_ProcuracaoAtualizarDados, {
                          item_dados: unref(dadosData),
                          item_situacoes: unref(situacoesItems)
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_ProcuracaoAtualizarDados, {
                            item_dados: unref(dadosData),
                            item_situacoes: unref(situacoesItems)
                          }, null, 8, ["item_dados", "item_situacoes"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VTabsWindowItem, { value: "partes" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_ProcuracaoAtualizarPartes, null, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_ProcuracaoAtualizarPartes)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  if (unref(usaImoveis)) {
                    _push3(ssrRenderComponent(VTabsWindowItem, { value: "bens" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_component_ProcuracaoAtualizarBens, null, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_component_ProcuracaoAtualizarBens)
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  if (unref(usaImoveis)) {
                    _push3(ssrRenderComponent(VTabsWindowItem, { value: "imoveis" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_component_ProcuracaoAtualizarImoveis, null, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_component_ProcuracaoAtualizarImoveis)
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(ssrRenderComponent(VTabsWindowItem, { value: "minuta" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_ProcuracaoAtualizarMinuta, {
                          onPage: getPages,
                          onDoc: getDocument
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_ProcuracaoAtualizarMinuta, {
                            onPage: getPages,
                            onDoc: getDocument
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VTabsWindowItem, { value: "livro" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_ProcuracaoAtualizarLivro, {
                          pages: unref(pages_prop),
                          document: unref(doc_prop)
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_ProcuracaoAtualizarLivro, {
                            pages: unref(pages_prop),
                            document: unref(doc_prop)
                          }, null, 8, ["pages", "document"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VTabsWindowItem, { value: "observacao" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_ProcuracaoAtualizarObservacao, null, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_ProcuracaoAtualizarObservacao)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VTabsWindowItem, { value: "anexo" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_ProcuracaoAtualizarAnexos, null, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_ProcuracaoAtualizarAnexos)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VTabsWindowItem, { value: "outros" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_ProcuracaoAtualizarOutros, null, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_ProcuracaoAtualizarOutros)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VTabsWindowItem, { value: "dados" }, {
                      default: withCtx(() => [
                        createVNode(_component_ProcuracaoAtualizarDados, {
                          item_dados: unref(dadosData),
                          item_situacoes: unref(situacoesItems)
                        }, null, 8, ["item_dados", "item_situacoes"])
                      ]),
                      _: 1
                    }),
                    createVNode(VTabsWindowItem, { value: "partes" }, {
                      default: withCtx(() => [
                        createVNode(_component_ProcuracaoAtualizarPartes)
                      ]),
                      _: 1
                    }),
                    unref(usaImoveis) ? (openBlock(), createBlock(VTabsWindowItem, {
                      key: 0,
                      value: "bens"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_ProcuracaoAtualizarBens)
                      ]),
                      _: 1
                    })) : createCommentVNode("", true),
                    unref(usaImoveis) ? (openBlock(), createBlock(VTabsWindowItem, {
                      key: 1,
                      value: "imoveis"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_ProcuracaoAtualizarImoveis)
                      ]),
                      _: 1
                    })) : createCommentVNode("", true),
                    createVNode(VTabsWindowItem, { value: "minuta" }, {
                      default: withCtx(() => [
                        createVNode(_component_ProcuracaoAtualizarMinuta, {
                          onPage: getPages,
                          onDoc: getDocument
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(VTabsWindowItem, { value: "livro" }, {
                      default: withCtx(() => [
                        createVNode(_component_ProcuracaoAtualizarLivro, {
                          pages: unref(pages_prop),
                          document: unref(doc_prop)
                        }, null, 8, ["pages", "document"])
                      ]),
                      _: 1
                    }),
                    createVNode(VTabsWindowItem, { value: "observacao" }, {
                      default: withCtx(() => [
                        createVNode(_component_ProcuracaoAtualizarObservacao)
                      ]),
                      _: 1
                    }),
                    createVNode(VTabsWindowItem, { value: "anexo" }, {
                      default: withCtx(() => [
                        createVNode(_component_ProcuracaoAtualizarAnexos)
                      ]),
                      _: 1
                    }),
                    createVNode(VTabsWindowItem, { value: "outros" }, {
                      default: withCtx(() => [
                        createVNode(_component_ProcuracaoAtualizarOutros)
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
                  createVNode(VTab, { value: "partes" }, {
                    default: withCtx(() => [
                      createTextVNode("Partes")
                    ]),
                    _: 1
                  }),
                  unref(usaImoveis) ? (openBlock(), createBlock(VTab, {
                    key: 0,
                    value: "bens"
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Bens")
                    ]),
                    _: 1
                  })) : createCommentVNode("", true),
                  unref(usaImoveis) ? (openBlock(), createBlock(VTab, {
                    key: 1,
                    value: "imoveis"
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Imoveis")
                    ]),
                    _: 1
                  })) : createCommentVNode("", true),
                  createVNode(VTab, { value: "minuta" }, {
                    default: withCtx(() => [
                      createTextVNode("Minuta")
                    ]),
                    _: 1
                  }),
                  createVNode(VTab, { value: "livro" }, {
                    default: withCtx(() => [
                      createTextVNode("Livro")
                    ]),
                    _: 1
                  }),
                  createVNode(VTab, { value: "observacao" }, {
                    default: withCtx(() => [
                      createTextVNode("Observa\xE7\xF5es")
                    ]),
                    _: 1
                  }),
                  createVNode(VTab, { value: "anexo" }, {
                    default: withCtx(() => [
                      createTextVNode("Anexos")
                    ]),
                    _: 1
                  }),
                  createVNode(VTab, { value: "outros" }, {
                    default: withCtx(() => [
                      createTextVNode("Outros")
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
                      createVNode(_component_ProcuracaoAtualizarDados, {
                        item_dados: unref(dadosData),
                        item_situacoes: unref(situacoesItems)
                      }, null, 8, ["item_dados", "item_situacoes"])
                    ]),
                    _: 1
                  }),
                  createVNode(VTabsWindowItem, { value: "partes" }, {
                    default: withCtx(() => [
                      createVNode(_component_ProcuracaoAtualizarPartes)
                    ]),
                    _: 1
                  }),
                  unref(usaImoveis) ? (openBlock(), createBlock(VTabsWindowItem, {
                    key: 0,
                    value: "bens"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_ProcuracaoAtualizarBens)
                    ]),
                    _: 1
                  })) : createCommentVNode("", true),
                  unref(usaImoveis) ? (openBlock(), createBlock(VTabsWindowItem, {
                    key: 1,
                    value: "imoveis"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_ProcuracaoAtualizarImoveis)
                    ]),
                    _: 1
                  })) : createCommentVNode("", true),
                  createVNode(VTabsWindowItem, { value: "minuta" }, {
                    default: withCtx(() => [
                      createVNode(_component_ProcuracaoAtualizarMinuta, {
                        onPage: getPages,
                        onDoc: getDocument
                      })
                    ]),
                    _: 1
                  }),
                  createVNode(VTabsWindowItem, { value: "livro" }, {
                    default: withCtx(() => [
                      createVNode(_component_ProcuracaoAtualizarLivro, {
                        pages: unref(pages_prop),
                        document: unref(doc_prop)
                      }, null, 8, ["pages", "document"])
                    ]),
                    _: 1
                  }),
                  createVNode(VTabsWindowItem, { value: "observacao" }, {
                    default: withCtx(() => [
                      createVNode(_component_ProcuracaoAtualizarObservacao)
                    ]),
                    _: 1
                  }),
                  createVNode(VTabsWindowItem, { value: "anexo" }, {
                    default: withCtx(() => [
                      createVNode(_component_ProcuracaoAtualizarAnexos)
                    ]),
                    _: 1
                  }),
                  createVNode(VTabsWindowItem, { value: "outros" }, {
                    default: withCtx(() => [
                      createVNode(_component_ProcuracaoAtualizarOutros)
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
      if (unref(modalVisible)) {
        _push(ssrRenderComponent(_component_ModalTiposAtos, {
          show: unref(modalVisible),
          servicos: unref(dadosData).servicos || [],
          tiposAtos: unref(dadosData).tiposAtos || [],
          onClose: ($event) => modalVisible.value = false,
          onUpdateAto: handleUpdateAto
        }, null, _parent));
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/fontes/atos/atos-com-bem/atualizar/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : undefined;
};

export { _sfc_main as default };
//# sourceMappingURL=_id_-CeYE-V8u.mjs.map
