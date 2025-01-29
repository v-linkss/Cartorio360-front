import { _ as _sfc_main$5, a as _sfc_main$4, b as _sfc_main$3, c as _sfc_main$2$1, d as _sfc_main$1$1, e as _sfc_main$6 } from './Anexos-BPqQ9p_m.mjs';
import { _ as __nuxt_component_0 } from './MoneyInput-nC85fGUl.mjs';
import { _ as __nuxt_component_0$1 } from './nuxt-link-TpvcaGEw.mjs';
import { ref, withAsyncContext, withCtx, unref, createVNode, toDisplayString, isRef, createTextVNode, useSSRContext, reactive, openBlock, createBlock } from 'vue';
import { ssrRenderComponent, ssrRenderStyle, ssrInterpolate, ssrRenderAttr } from 'vue/server-renderer';
import { _ as _imports_0, a as _imports_1$1, b as _imports_2, c as _imports_3 } from './mudarStatus-CVlVNUDw.mjs';
import { _ as _imports_1 } from './visualizar-BoZ30DMV.mjs';
import { aL as useRoute$1, e as useCookie, c as useRuntimeConfig, u as useRouter$1, b as useNuxtApp, aM as VSpacer, F as VBtn, V as VTextField } from './server.mjs';
import { u as useFetch } from './fetch-CmQgfhnJ.mjs';
import { V as VContainer } from './VContainer-DUPM_BP9.mjs';
import { V as VCol } from './VCol-BY-FaYhw.mjs';
import { V as VTextarea } from './VTextarea-AmwKvadh.mjs';
import { V as VRow } from './VRow-DbcfFNio.mjs';
import { V as VAutocomplete } from './VAutocomplete-BkWVMD0Z.mjs';
import { V as VDataTable } from './VDataTable-C53h7B9w.mjs';
import { V as VCard, a as VDialog, b as VCardTitle, c as VCardText, d as VCardActions } from './VDialog-BSU3_51C.mjs';
import { f as fetchWithToken } from './fetchWithToken-cpPgQOwB.mjs';
import { V as VTabs, a as VTab, b as VTabsWindow, c as VTabsWindowItem } from './RegistroPessoas-BwFZvz5e.mjs';
import './escanear-DHLMxHvp.mjs';
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
import '@syncfusion/ej2-vue-documenteditor';
import '@syncfusion/ej2-base';
import '@vuelidate/core';
import '@vuelidate/validators';
import './formatDate-C0bMm8hr.mjs';
import 'v-money3';
import 'pinia';
import 'vue-router';
import 'vue3-toastify';
import 'vue-the-mask';
import './filter-DK3_4lVs.mjs';
import './VList-iVnq_OpI.mjs';
import './VAvatar-DEYOjnUS.mjs';
import './VResponsive-_f8EzDDz.mjs';
import 'utif';

const _sfc_main$2 = {
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
    const getAtosBens = `${config.public.managemant}/atos_bens`;
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
        key: "valor_mercado"
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
          valor_mercado: state.vlr_alienacao,
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
          valor_mercado: selectedBem.value.valor_mercado
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
      `${getAtosBens}/${route.query.ato_id}`,
      {
        method: "GET"
      },
      "$iXfJJrO35d"
    )), __temp = await __temp, __restore(), __temp);
    pessoasTable.value = bensPayload.value;
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
                                    _push6(`<div style="${ssrRenderStyle({ "cursor": "pointer" })}" class="mr-2" title="Visualizar Ficha"${_scopeId5}><img style="${ssrRenderStyle({ "width": "30px", "height": "30px" })}"${ssrRenderAttr("src", _imports_1)} alt="Visualizar"${_scopeId5}></div><div style="${ssrRenderStyle({ "cursor": "pointer" })}" class="mr-2" title="Alterar Papel"${_scopeId5}><img style="${ssrRenderStyle({ "width": "30px", "height": "30px" })}"${ssrRenderAttr("src", _imports_1$1)} alt="Editar"${_scopeId5}></div><div style="${ssrRenderStyle({ "cursor": "pointer" })}" class="mr-2" title="Deletar Pessoa"${_scopeId5}>`);
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
                                          src: _imports_1,
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
                                          src: _imports_1$1,
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
                                        src: _imports_1,
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
                                        src: _imports_1$1,
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
                                      src: _imports_1,
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
                                      src: _imports_1$1,
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
                                    src: _imports_1,
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
                                    src: _imports_1$1,
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
                                            modelValue: unref(selectedBem).valor_mercado,
                                            "onUpdate:modelValue": ($event) => unref(selectedBem).valor_mercado = $event
                                          }, null, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode("label", null, "Valor"),
                                            createVNode(_component_MoneyInput, {
                                              modelValue: unref(selectedBem).valor_mercado,
                                              "onUpdate:modelValue": ($event) => unref(selectedBem).valor_mercado = $event
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
                                            modelValue: unref(selectedBem).valor_mercado,
                                            "onUpdate:modelValue": ($event) => unref(selectedBem).valor_mercado = $event
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
                                          modelValue: unref(selectedBem).valor_mercado,
                                          "onUpdate:modelValue": ($event) => unref(selectedBem).valor_mercado = $event
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
                                        modelValue: unref(selectedBem).valor_mercado,
                                        "onUpdate:modelValue": ($event) => unref(selectedBem).valor_mercado = $event
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
                                      modelValue: unref(selectedBem).valor_mercado,
                                      "onUpdate:modelValue": ($event) => unref(selectedBem).valor_mercado = $event
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
                                  src: _imports_1,
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
                                  src: _imports_1$1,
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
                                    modelValue: unref(selectedBem).valor_mercado,
                                    "onUpdate:modelValue": ($event) => unref(selectedBem).valor_mercado = $event
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
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Procuracao/atualizar/Bens.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : undefined;
};
const _sfc_main$1 = {
  __name: "Imoveis",
  __ssrInlineRender: true,
  props: {
    ato_token: {
      type: String,
      required: true
    },
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
    `${config.public.managemant}/atos_bens`;
    const updateAtosBens = `${config.public.managemant}/atos_bens`;
    const getAtosBens = `${config.public.managemant}/atos_bens`;
    const listarBens = `${config.public.managemant}/listarTipoBens`;
    const cartorio_token = ref(useCookie("user-data").value.cartorio_token);
    ref(useCookie("user-data").value.usuario_id).value;
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
        key: "valor_mercado"
      },
      { align: "end", value: "actions" }
    ];
    const state = reactive({
      vlr_alienacao: null,
      descricao: null,
      tipo_id: null,
      tiposBens: []
    });
    const updateAtosBensModal = async (id) => {
      const { status } = await useFetch(`${updateAtosBens}/${id}`, {
        method: "PUT",
        body: {
          descricao: selectedBem.value.descricao,
          tipo_id: selectedBem.value.tipo_id,
          valor_mercado: selectedBem.value.valor_mercado
        }
      }, "$emCqVdAoWQ");
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
    }, "$4w6N3eZ5Eo")), __temp = await __temp, __restore(), __temp);
    state.tiposBens = data.value;
    const { data: bensPayload } = ([__temp, __restore] = withAsyncContext(() => useFetch(
      `${getAtosBens}/${route.query.ato_id}`,
      {
        method: "GET"
      },
      "$JNNyuNGPqs"
    )), __temp = await __temp, __restore(), __temp);
    pessoasTable.value = bensPayload.value;
    async function deletePessoa(item) {
      item.excluido = !item.excluido;
      try {
        await useFetch(`${updateAtosBens}/${item.id}`, {
          method: "PUT",
          body: JSON.stringify({ excluido: item.excluido })
        }, "$Ws9ScoCJyh");
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
            _push2(ssrRenderComponent(VRow, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VCol, {
                    class: "mt-5",
                    cols: "12"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VTextarea, {
                          label: "Descri\xE7\xE3o",
                          modelValue: unref(state).descricao,
                          "onUpdate:modelValue": ($event) => unref(state).descricao = $event
                        }, null, _parent4, _scopeId3));
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
                  }, _parent3, _scopeId2));
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
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(VRow, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VCol, { cols: "3" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VAutocomplete, { label: "Selecione o Tipo de Registro" }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VAutocomplete, { label: "Selecione o Tipo de Registro" })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VCol, { cols: "2" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VTextField, { label: "Cart\xF3rio" }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VTextField, { label: "Cart\xF3rio" })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VCol, { cols: "2" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VTextField, { label: "Matricula" }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VTextField, { label: "Matricula" })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VCol, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VTextField, { label: "Letra" }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VTextField, { label: "Letra" })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VCol, { cols: "2" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VAutocomplete, { label: "Natureza" }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VAutocomplete, { label: "Natureza" })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VCol, { cols: "2" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VTextField, { label: "CIB" }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VTextField, { label: "CIB" })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VCol, { cols: "3" }, {
                      default: withCtx(() => [
                        createVNode(VAutocomplete, { label: "Selecione o Tipo de Registro" })
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, { cols: "2" }, {
                      default: withCtx(() => [
                        createVNode(VTextField, { label: "Cart\xF3rio" })
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, { cols: "2" }, {
                      default: withCtx(() => [
                        createVNode(VTextField, { label: "Matricula" })
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, null, {
                      default: withCtx(() => [
                        createVNode(VTextField, { label: "Letra" })
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, { cols: "2" }, {
                      default: withCtx(() => [
                        createVNode(VAutocomplete, { label: "Natureza" })
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, { cols: "2" }, {
                      default: withCtx(() => [
                        createVNode(VTextField, { label: "CIB" })
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
                  _push3(ssrRenderComponent(VCol, { cols: "3" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VAutocomplete, { label: "Selecione a Cidade" }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VAutocomplete, { label: "Selecione a Cidade" })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VCol, { cols: "2" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VTextField, { label: "Quadra" }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VTextField, { label: "Quadra" })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VCol, { cols: "2" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VTextField, { label: "Lote" }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VTextField, { label: "Lote" })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VCol, { cols: "4" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VAutocomplete, { label: "Logradouro" }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VAutocomplete, { label: "Logradouro" })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VCol, { cols: "1" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VTextField, { label: "N*" }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VTextField, { label: "N*" })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VCol, { cols: "3" }, {
                      default: withCtx(() => [
                        createVNode(VAutocomplete, { label: "Selecione a Cidade" })
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, { cols: "2" }, {
                      default: withCtx(() => [
                        createVNode(VTextField, { label: "Quadra" })
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, { cols: "2" }, {
                      default: withCtx(() => [
                        createVNode(VTextField, { label: "Lote" })
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, { cols: "4" }, {
                      default: withCtx(() => [
                        createVNode(VAutocomplete, { label: "Logradouro" })
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, { cols: "1" }, {
                      default: withCtx(() => [
                        createVNode(VTextField, { label: "N*" })
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
                        _push4(ssrRenderComponent(VTextField, { label: "Bairro" }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VTextField, { label: "Bairro" })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VCol, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VTextField, { label: "CEP" }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VTextField, { label: "CEP" })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VCol, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VTextField, { label: "Complemento" }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VTextField, { label: "Complemento" })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VCol, { cols: "3" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VAutocomplete, { label: "Selecione o tipo de imovel" }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VAutocomplete, { label: "Selecione o tipo de imovel" })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VCol, { cols: "3" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VTextField, { label: "Inscri\xE7\xE3o Municipal" }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VTextField, { label: "Inscri\xE7\xE3o Municipal" })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VCol, null, {
                      default: withCtx(() => [
                        createVNode(VTextField, { label: "Bairro" })
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, null, {
                      default: withCtx(() => [
                        createVNode(VTextField, { label: "CEP" })
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, null, {
                      default: withCtx(() => [
                        createVNode(VTextField, { label: "Complemento" })
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, { cols: "3" }, {
                      default: withCtx(() => [
                        createVNode(VAutocomplete, { label: "Selecione o tipo de imovel" })
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, { cols: "3" }, {
                      default: withCtx(() => [
                        createVNode(VTextField, { label: "Inscri\xE7\xE3o Municipal" })
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
                  _push3(ssrRenderComponent(VCol, { cols: "3" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VAutocomplete, { label: "Selecione a Situa\xE7\xE3o" }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VAutocomplete, { label: "Selecione a Situa\xE7\xE3o" })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VCol, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VTextField, { label: "Valor Aliena\xE7\xE3o" }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VTextField, { label: "Valor Aliena\xE7\xE3o" })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VCol, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VTextField, { label: "Valor Avalia\xE7\xE3o" }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VTextField, { label: "Valor Avalia\xE7\xE3o" })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VCol, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VTextField, { label: "Valor Mercado" }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VTextField, { label: "Valor Mercado" })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VCol, { cols: "1" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VTextField, { label: "%ITB" }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VTextField, { label: "%ITB" })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VCol, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VTextField, { label: "Valor ITB" }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VTextField, { label: "Valor ITB" })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VCol, { cols: "3" }, {
                      default: withCtx(() => [
                        createVNode(VAutocomplete, { label: "Selecione a Situa\xE7\xE3o" })
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, null, {
                      default: withCtx(() => [
                        createVNode(VTextField, { label: "Valor Aliena\xE7\xE3o" })
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, null, {
                      default: withCtx(() => [
                        createVNode(VTextField, { label: "Valor Avalia\xE7\xE3o" })
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, null, {
                      default: withCtx(() => [
                        createVNode(VTextField, { label: "Valor Mercado" })
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, { cols: "1" }, {
                      default: withCtx(() => [
                        createVNode(VTextField, { label: "%ITB" })
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, null, {
                      default: withCtx(() => [
                        createVNode(VTextField, { label: "Valor ITB" })
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
                                    _push6(`<div style="${ssrRenderStyle({ "cursor": "pointer" })}" class="mr-2" title="Visualizar Ficha"${_scopeId5}><img style="${ssrRenderStyle({ "width": "30px", "height": "30px" })}"${ssrRenderAttr("src", _imports_1)} alt="Visualizar"${_scopeId5}></div><div style="${ssrRenderStyle({ "cursor": "pointer" })}" class="mr-2" title="Alterar Papel"${_scopeId5}><img style="${ssrRenderStyle({ "width": "30px", "height": "30px" })}"${ssrRenderAttr("src", _imports_1$1)} alt="Editar"${_scopeId5}></div><div style="${ssrRenderStyle({ "cursor": "pointer" })}" class="mr-2" title="Deletar Pessoa"${_scopeId5}>`);
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
                                          src: _imports_1,
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
                                          src: _imports_1$1,
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
                                        src: _imports_1,
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
                                        src: _imports_1$1,
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
                                      src: _imports_1,
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
                                      src: _imports_1$1,
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
                                    src: _imports_1,
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
                                    src: _imports_1$1,
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
                                            modelValue: unref(selectedBem).valor_mercado,
                                            "onUpdate:modelValue": ($event) => unref(selectedBem).valor_mercado = $event
                                          }, null, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode("label", null, "Valor"),
                                            createVNode(_component_MoneyInput, {
                                              modelValue: unref(selectedBem).valor_mercado,
                                              "onUpdate:modelValue": ($event) => unref(selectedBem).valor_mercado = $event
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
                                            modelValue: unref(selectedBem).valor_mercado,
                                            "onUpdate:modelValue": ($event) => unref(selectedBem).valor_mercado = $event
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
                                          modelValue: unref(selectedBem).valor_mercado,
                                          "onUpdate:modelValue": ($event) => unref(selectedBem).valor_mercado = $event
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
                                        modelValue: unref(selectedBem).valor_mercado,
                                        "onUpdate:modelValue": ($event) => unref(selectedBem).valor_mercado = $event
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
                                      modelValue: unref(selectedBem).valor_mercado,
                                      "onUpdate:modelValue": ($event) => unref(selectedBem).valor_mercado = $event
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
              createVNode(VRow, null, {
                default: withCtx(() => [
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
                  })
                ]),
                _: 1
              }),
              createVNode(VRow, null, {
                default: withCtx(() => [
                  createVNode(VCol, { cols: "3" }, {
                    default: withCtx(() => [
                      createVNode(VAutocomplete, { label: "Selecione o Tipo de Registro" })
                    ]),
                    _: 1
                  }),
                  createVNode(VCol, { cols: "2" }, {
                    default: withCtx(() => [
                      createVNode(VTextField, { label: "Cart\xF3rio" })
                    ]),
                    _: 1
                  }),
                  createVNode(VCol, { cols: "2" }, {
                    default: withCtx(() => [
                      createVNode(VTextField, { label: "Matricula" })
                    ]),
                    _: 1
                  }),
                  createVNode(VCol, null, {
                    default: withCtx(() => [
                      createVNode(VTextField, { label: "Letra" })
                    ]),
                    _: 1
                  }),
                  createVNode(VCol, { cols: "2" }, {
                    default: withCtx(() => [
                      createVNode(VAutocomplete, { label: "Natureza" })
                    ]),
                    _: 1
                  }),
                  createVNode(VCol, { cols: "2" }, {
                    default: withCtx(() => [
                      createVNode(VTextField, { label: "CIB" })
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(VRow, null, {
                default: withCtx(() => [
                  createVNode(VCol, { cols: "3" }, {
                    default: withCtx(() => [
                      createVNode(VAutocomplete, { label: "Selecione a Cidade" })
                    ]),
                    _: 1
                  }),
                  createVNode(VCol, { cols: "2" }, {
                    default: withCtx(() => [
                      createVNode(VTextField, { label: "Quadra" })
                    ]),
                    _: 1
                  }),
                  createVNode(VCol, { cols: "2" }, {
                    default: withCtx(() => [
                      createVNode(VTextField, { label: "Lote" })
                    ]),
                    _: 1
                  }),
                  createVNode(VCol, { cols: "4" }, {
                    default: withCtx(() => [
                      createVNode(VAutocomplete, { label: "Logradouro" })
                    ]),
                    _: 1
                  }),
                  createVNode(VCol, { cols: "1" }, {
                    default: withCtx(() => [
                      createVNode(VTextField, { label: "N*" })
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
                      createVNode(VTextField, { label: "Bairro" })
                    ]),
                    _: 1
                  }),
                  createVNode(VCol, null, {
                    default: withCtx(() => [
                      createVNode(VTextField, { label: "CEP" })
                    ]),
                    _: 1
                  }),
                  createVNode(VCol, null, {
                    default: withCtx(() => [
                      createVNode(VTextField, { label: "Complemento" })
                    ]),
                    _: 1
                  }),
                  createVNode(VCol, { cols: "3" }, {
                    default: withCtx(() => [
                      createVNode(VAutocomplete, { label: "Selecione o tipo de imovel" })
                    ]),
                    _: 1
                  }),
                  createVNode(VCol, { cols: "3" }, {
                    default: withCtx(() => [
                      createVNode(VTextField, { label: "Inscri\xE7\xE3o Municipal" })
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(VRow, null, {
                default: withCtx(() => [
                  createVNode(VCol, { cols: "3" }, {
                    default: withCtx(() => [
                      createVNode(VAutocomplete, { label: "Selecione a Situa\xE7\xE3o" })
                    ]),
                    _: 1
                  }),
                  createVNode(VCol, null, {
                    default: withCtx(() => [
                      createVNode(VTextField, { label: "Valor Aliena\xE7\xE3o" })
                    ]),
                    _: 1
                  }),
                  createVNode(VCol, null, {
                    default: withCtx(() => [
                      createVNode(VTextField, { label: "Valor Avalia\xE7\xE3o" })
                    ]),
                    _: 1
                  }),
                  createVNode(VCol, null, {
                    default: withCtx(() => [
                      createVNode(VTextField, { label: "Valor Mercado" })
                    ]),
                    _: 1
                  }),
                  createVNode(VCol, { cols: "1" }, {
                    default: withCtx(() => [
                      createVNode(VTextField, { label: "%ITB" })
                    ]),
                    _: 1
                  }),
                  createVNode(VCol, null, {
                    default: withCtx(() => [
                      createVNode(VTextField, { label: "Valor ITB" })
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
                                  src: _imports_1,
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
                                  src: _imports_1$1,
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
                                    modelValue: unref(selectedBem).valor_mercado,
                                    "onUpdate:modelValue": ($event) => unref(selectedBem).valor_mercado = $event
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
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Procuracao/atualizar/Imoveis.vue");
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
    const body = route.query.id ? { ato_token: "xkyaA" } : { cartorio_token };
    const situacoesItems = ref([]);
    const dadosData = ref([]);
    const label = ref("PROCURA\xC7\xD5ES");
    const label2 = ref("PROCURA\xC7\xC3O COM BENS");
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
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ProcuracaoAtualizarDados = _sfc_main$5;
      const _component_ProcuracaoAtualizarPartes = _sfc_main$4;
      const _component_ProcuracaoAtualizarBens = _sfc_main$2;
      const _component_ProcuracaoAtualizarImoveis = _sfc_main$1;
      const _component_ProcuracaoAtualizarMinuta = _sfc_main$3;
      const _component_ProcuracaoAtualizarLivro = _sfc_main$2$1;
      const _component_ProcuracaoAtualizarObservacao = _sfc_main$1$1;
      const _component_ProcuracaoAtualizarAnexos = _sfc_main$6;
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
            _push2(ssrRenderComponent(VCol, { md: "6" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VAutocomplete, {
                    modelValue: unref(label2),
                    "onUpdate:modelValue": ($event) => isRef(label2) ? label2.value = $event : null,
                    disabled: ""
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VAutocomplete, {
                      modelValue: unref(label2),
                      "onUpdate:modelValue": ($event) => isRef(label2) ? label2.value = $event : null,
                      disabled: ""
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
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
              createVNode(VCol, { md: "6" }, {
                default: withCtx(() => [
                  createVNode(VAutocomplete, {
                    modelValue: unref(label2),
                    "onUpdate:modelValue": ($event) => isRef(label2) ? label2.value = $event : null,
                    disabled: ""
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              })
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
                    createVNode(VTab, { value: "bens" }, {
                      default: withCtx(() => [
                        createTextVNode("Bens")
                      ]),
                      _: 1
                    }),
                    createVNode(VTab, { value: "imoveis" }, {
                      default: withCtx(() => [
                        createTextVNode("Imoveis")
                      ]),
                      _: 1
                    }),
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
                    createVNode(VTabsWindowItem, { value: "bens" }, {
                      default: withCtx(() => [
                        createVNode(_component_ProcuracaoAtualizarBens)
                      ]),
                      _: 1
                    }),
                    createVNode(VTabsWindowItem, { value: "imoveis" }, {
                      default: withCtx(() => [
                        createVNode(_component_ProcuracaoAtualizarImoveis)
                      ]),
                      _: 1
                    }),
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
                  createVNode(VTab, { value: "bens" }, {
                    default: withCtx(() => [
                      createTextVNode("Bens")
                    ]),
                    _: 1
                  }),
                  createVNode(VTab, { value: "imoveis" }, {
                    default: withCtx(() => [
                      createTextVNode("Imoveis")
                    ]),
                    _: 1
                  }),
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
                  createVNode(VTabsWindowItem, { value: "bens" }, {
                    default: withCtx(() => [
                      createVNode(_component_ProcuracaoAtualizarBens)
                    ]),
                    _: 1
                  }),
                  createVNode(VTabsWindowItem, { value: "imoveis" }, {
                    default: withCtx(() => [
                      createVNode(_component_ProcuracaoAtualizarImoveis)
                    ]),
                    _: 1
                  }),
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
                  })
                ]),
                _: 1
              }, 8, ["modelValue", "onUpdate:modelValue"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/fontes/atos/atos-com-bem/atualizar/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : undefined;
};

export { _sfc_main as default };
//# sourceMappingURL=_id_-DYcrTOep.mjs.map
