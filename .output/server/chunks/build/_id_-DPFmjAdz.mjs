import { _ as _sfc_main$5, a as _sfc_main$4, b as _sfc_main$3$1, c as _sfc_main$2$1, d as _sfc_main$1$1, e as _sfc_main$6 } from './Anexos-DAVZzdE-.mjs';
import { _ as __nuxt_component_0 } from './MoneyInput-ot-UsY0X.mjs';
import { _ as __nuxt_component_0$1 } from './nuxt-link-TpvcaGEw.mjs';
import { ref, withAsyncContext, withCtx, unref, createVNode, toDisplayString, isRef, openBlock, createBlock, createCommentVNode, createTextVNode, useSSRContext, reactive, computed, mergeProps, resolveDirective, withDirectives } from 'vue';
import { ssrRenderComponent, ssrRenderStyle, ssrInterpolate, ssrRenderAttr, ssrGetDirectiveProps } from 'vue/server-renderer';
import { _ as _imports_0 } from './novo-CWU3oYa5.mjs';
import { _ as _imports_1$1 } from './visualizar-BoZ30DMV.mjs';
import { _ as _imports_1 } from './editar-BcGPsVK2.mjs';
import { _ as _imports_2, a as _imports_3 } from './excluido-ceRs5bdR.mjs';
import { f as useRoute$1, e as useCookie, c as useRuntimeConfig, u as useRouter$1, b as useNuxtApp, b8 as VSpacer, g as VBtn, V as VTextField } from './server.mjs';
import { u as useFetch } from './fetch-DU4Y7Bqq.mjs';
import { V as VContainer } from './VContainer-CUysD4sO.mjs';
import { V as VCol } from './VCol-utZM6tT1.mjs';
import { V as VTextarea } from './VTextarea-CAGJgzo5.mjs';
import { V as VRow } from './VRow-Q0HVcY2O.mjs';
import { V as VAutocomplete } from './VAutocomplete-CbzVHXen.mjs';
import { V as VDataTable } from './VDataTable-BuyhRHPr.mjs';
import { V as VDialog } from './VDialog-BNyR4S2x.mjs';
import { V as VCard, a as VCardTitle, b as VCardText, c as VCardActions } from './VCard-EvDA1rxh.mjs';
import { _ as _sfc_main$1$2, a as _sfc_main$8 } from './Atualizar-hcf3ssj7.mjs';
import { f as fetchWithToken } from './fetchWithToken-CMmbn_BR.mjs';
import { useVuelidate } from '@vuelidate/core';
import { helpers, required } from '@vuelidate/validators';
import { _ as _sfc_main$7 } from './TiposAtos-BI27OG8j.mjs';
import { V as VTabs, a as VTab, d as VTabsWindow, e as VTabsWindowItem } from './VTabs-CJui92Gz.mjs';
import './RegistroPessoas-CY5MBalR.mjs';
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
import './formatDate-DflkuJ_V.mjs';
import './filter-C5q9WKLi.mjs';
import './VList-BVx0_kbp.mjs';
import './VAvatar-4QTupJBk.mjs';
import './VResponsive-BSalu4Ow.mjs';
import 'utif';
import './FichaCard-C6r6vs16.mjs';
import './abre-arquivo-verde-DJ0l5BBv.mjs';
import './visualizar-vermelho-Ly_aKn8Z.mjs';
import './Confirmacao-CfD-aZdo.mjs';
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
    const isVisualizar = ref(route.query.origem === "vizualizar");
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
      if (state.vlr_alienacao <= 0 && !state.descricao) {
        $toast.error("Os campos Descri\xE7\xE3o \xE9 obrigat\xF3rio e Valor n\xE3o pode ser 0 !");
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
    const { data: bensPayload } = ([__temp, __restore] = withAsyncContext(() => useFetch(`${getAtosBens}`, {
      method: "POST",
      body: { ato_token: route.query.ato_token_edit }
    }, "$iXfJJrO35d")), __temp = await __temp, __restore(), __temp);
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
      switch (origem) {
        case "atualizar":
        case "vizualizar":
          router.push(`/os/atualizar/${id}`);
          break;
        case "atualizar-lista":
        case "vizualizar-lista":
          router.push("/atos/lista");
          break;
        default:
          router.push("/os/criar-registro");
          break;
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_MoneyInput = __nuxt_component_0;
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(ssrRenderComponent(VContainer, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (!unref(isVisualizar)) {
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
            } else {
              _push2(`<!---->`);
            }
            if (!unref(isVisualizar)) {
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
            } else {
              _push2(`<!---->`);
            }
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
              !unref(isVisualizar) ? (openBlock(), createBlock(VCol, {
                key: 0,
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
              })) : createCommentVNode("", true),
              !unref(isVisualizar) ? (openBlock(), createBlock(VRow, {
                key: 1,
                class: "ml-1 mb-3"
              }, {
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
              })) : createCommentVNode("", true),
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
    const isVisualizar = ref(route.query.origem === "vizualizar");
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
      switch (origem) {
        case "atualizar":
        case "vizualizar":
          router.push(`/os/atualizar/${id}`);
          break;
        case "atualizar-lista":
        case "vizualizar-lista":
          router.push("/atos/lista");
          break;
        default:
          router.push("/os/criar-registro");
          break;
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
              if (!unref(isVisualizar)) {
                _push2(`<img style="${ssrRenderStyle({ "cursor": "pointer" })}"${ssrRenderAttr("src", _imports_0)} alt="Cadastro"${_scopeId}>`);
              } else {
                _push2(`<!---->`);
              }
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
                          if (!unref(isVisualizar)) {
                            _push4(`<div style="${ssrRenderStyle({ "cursor": "pointer" })}" title="Visualizar"${_scopeId3}><img style="${ssrRenderStyle({ "width": "30px", "height": "30px" })}"${ssrRenderAttr("src", _imports_1$1)} alt="Visualizar"${_scopeId3}></div>`);
                          } else {
                            _push4(`<!---->`);
                          }
                          if (!unref(isVisualizar)) {
                            _push4(`<div style="${ssrRenderStyle({ "cursor": "pointer" })}" title="Atualizar"${_scopeId3}><img style="${ssrRenderStyle({ "width": "30px", "height": "30px" })}"${ssrRenderAttr("src", _imports_1)} alt="Atualizar"${_scopeId3}></div>`);
                          } else {
                            _push4(`<!---->`);
                          }
                          if (!unref(isVisualizar)) {
                            _push4(`<div style="${ssrRenderStyle({ "cursor": "pointer" })}" title="Deletar"${_scopeId3}>`);
                            if (item.excluido) {
                              _push4(`<img style="${ssrRenderStyle({ "width": "30px", "height": "30px" })}"${ssrRenderAttr("src", _imports_2)} alt="Visualizar" title="Reativar"${_scopeId3}>`);
                            } else {
                              _push4(`<img${ssrRenderAttr("src", _imports_3)} alt="Excluir" class="trash-icon" style="${ssrRenderStyle({ "width": "30px", "height": "30px" })}" title="Excluir"${_scopeId3}>`);
                            }
                            _push4(`</div>`);
                          } else {
                            _push4(`<!---->`);
                          }
                        } else {
                          return [
                            !unref(isVisualizar) ? (openBlock(), createBlock("div", {
                              key: 0,
                              style: { "cursor": "pointer" },
                              onClick: ($event) => _ctx.redirectToView(item.id),
                              title: "Visualizar"
                            }, [
                              createVNode("img", {
                                style: { "width": "30px", "height": "30px" },
                                src: _imports_1$1,
                                alt: "Visualizar"
                              })
                            ], 8, ["onClick"])) : createCommentVNode("", true),
                            !unref(isVisualizar) ? (openBlock(), createBlock("div", {
                              key: 1,
                              style: { "cursor": "pointer" },
                              onClick: ($event) => redirectToUpdate(item.id),
                              title: "Atualizar"
                            }, [
                              createVNode("img", {
                                style: { "width": "30px", "height": "30px" },
                                src: _imports_1,
                                alt: "Atualizar"
                              })
                            ], 8, ["onClick"])) : createCommentVNode("", true),
                            !unref(isVisualizar) ? (openBlock(), createBlock("div", {
                              key: 2,
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
                            ], 8, ["onClick"])) : createCommentVNode("", true)
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(VRow, { style: { "display": "flex", "gap": "10px", "justify-content": "flex-end" } }, {
                        default: withCtx(() => [
                          !unref(isVisualizar) ? (openBlock(), createBlock("div", {
                            key: 0,
                            style: { "cursor": "pointer" },
                            onClick: ($event) => _ctx.redirectToView(item.id),
                            title: "Visualizar"
                          }, [
                            createVNode("img", {
                              style: { "width": "30px", "height": "30px" },
                              src: _imports_1$1,
                              alt: "Visualizar"
                            })
                          ], 8, ["onClick"])) : createCommentVNode("", true),
                          !unref(isVisualizar) ? (openBlock(), createBlock("div", {
                            key: 1,
                            style: { "cursor": "pointer" },
                            onClick: ($event) => redirectToUpdate(item.id),
                            title: "Atualizar"
                          }, [
                            createVNode("img", {
                              style: { "width": "30px", "height": "30px" },
                              src: _imports_1,
                              alt: "Atualizar"
                            })
                          ], 8, ["onClick"])) : createCommentVNode("", true),
                          !unref(isVisualizar) ? (openBlock(), createBlock("div", {
                            key: 2,
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
                          ], 8, ["onClick"])) : createCommentVNode("", true)
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
                !unref(isVisualizar) ? (openBlock(), createBlock("img", {
                  key: 0,
                  onClick: ($event) => isModalCadastroImoveisOpen.value = true,
                  style: { "cursor": "pointer" },
                  src: _imports_0,
                  alt: "Cadastro"
                }, null, 8, ["onClick"])) : createCommentVNode("", true),
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
                        !unref(isVisualizar) ? (openBlock(), createBlock("div", {
                          key: 0,
                          style: { "cursor": "pointer" },
                          onClick: ($event) => _ctx.redirectToView(item.id),
                          title: "Visualizar"
                        }, [
                          createVNode("img", {
                            style: { "width": "30px", "height": "30px" },
                            src: _imports_1$1,
                            alt: "Visualizar"
                          })
                        ], 8, ["onClick"])) : createCommentVNode("", true),
                        !unref(isVisualizar) ? (openBlock(), createBlock("div", {
                          key: 1,
                          style: { "cursor": "pointer" },
                          onClick: ($event) => redirectToUpdate(item.id),
                          title: "Atualizar"
                        }, [
                          createVNode("img", {
                            style: { "width": "30px", "height": "30px" },
                            src: _imports_1,
                            alt: "Atualizar"
                          })
                        ], 8, ["onClick"])) : createCommentVNode("", true),
                        !unref(isVisualizar) ? (openBlock(), createBlock("div", {
                          key: 2,
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
                        ], 8, ["onClick"])) : createCommentVNode("", true)
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
    const allOutrosTj = `${config.public.managemant}/outros_tj`;
    const getOutros = `${config.public.managemant}/outros`;
    const createAtoOutros = `${config.public.managemant}/atos_outros`;
    const outrosUpdate = `${config.public.managemant}/atos_outros`;
    `${config.public.managemant}/atos_outros`;
    const cartorio_token = ref(useCookie("user-data").value.cartorio_token);
    const isVisualizar = ref(route.query.origem === "vizualizar");
    const outrosItemsTable = ref([]);
    const outrosItems = ref([]);
    const headers = [
      { title: "Id", align: "start", key: "id" },
      { title: "Descri\xE7\xE3o", align: "start", key: "descricao" },
      { title: "Quantidade", align: "start", key: "quantidade" },
      { title: "Valor Unitario", align: "start", key: "valor_unitario" },
      { value: "actions" }
    ];
    const state = reactive({
      observacao: null,
      outros_tj_id: null,
      quantidade: 1,
      valor_unitario: null
    });
    const rules = {
      observacao: {
        required: helpers.withMessage("O campo \xE9 obrigat\xF3rio", required)
      }
    };
    useVuelidate(rules, state);
    async function onSubmit() {
      const { error, status } = await useFetch(createAtoOutros, {
        method: "POST",
        body: {
          ato_id: route.query.ato_id,
          observacao: state.observacao,
          valor_unitario: state.valor_unitario.replace(/,/g, ""),
          outros_tj_id: state.outros_tj_id,
          quantidade: state.quantidade,
          user_id: useCookie("user-data").value.usuario_id
        }
      }, "$kQ0nj1mhl6");
      if (status.value === "success") {
        $toast.success("Outro Ato registrado com sucesso");
        await fetchOutrosItemsTable();
      }
    }
    async function deleteObservacao(item) {
      item.excluido = !item.excluido;
      try {
        await useFetch(`${outrosUpdate}/${item.id}`, {
          method: "PUT",
          body: JSON.stringify({ excluido: item.excluido })
        }, "$DwnPGm5aLw");
      } catch (error) {
        console.error("Erro ao excluir observa\xE7\xE3o:", error);
      }
    }
    async function fetchOutrosItemsTable() {
      const { data: payloadOutros } = await useFetch(getOutros, {
        method: "POST",
        body: { ato_token: route.query.ato_token_edit }
      }, "$2e0uNuFQSO");
      outrosItemsTable.value = payloadOutros.value || [];
    }
    const { data } = ([__temp, __restore] = withAsyncContext(() => useFetch(allOutrosTj, {
      method: "POST",
      body: { cartorio_token }
    }, "$YuLwFWKIry")), __temp = await __temp, __restore(), __temp);
    outrosItems.value = data.value;
    [__temp, __restore] = withAsyncContext(() => fetchOutrosItemsTable()), await __temp, __restore();
    const goBack = () => {
      const origem = route.query.origem || "criar";
      const id = route.query.id;
      switch (origem) {
        case "atualizar":
        case "vizualizar":
          router.push(`/os/atualizar/${id}`);
          break;
        case "atualizar-lista":
        case "vizualizar-lista":
          router.push("/atos/lista");
          break;
        default:
          router.push("/os/criar-registro");
          break;
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_MoneyInput = __nuxt_component_0;
      const _component_NuxtLink = __nuxt_component_0$1;
      const _directive_mask = resolveDirective("mask");
      _push(ssrRenderComponent(VContainer, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (!isVisualizar.value) {
              _push2(ssrRenderComponent(VRow, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(VCol, {
                      cols: "5",
                      class: "mt-6"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(VAutocomplete, {
                            label: "Outros Atos",
                            items: outrosItems.value,
                            "item-title": "descricao",
                            "item-value": "id",
                            modelValue: state.outros_tj_id,
                            "onUpdate:modelValue": ($event) => state.outros_tj_id = $event
                          }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(VAutocomplete, {
                              label: "Outros Atos",
                              items: outrosItems.value,
                              "item-title": "descricao",
                              "item-value": "id",
                              modelValue: state.outros_tj_id,
                              "onUpdate:modelValue": ($event) => state.outros_tj_id = $event
                            }, null, 8, ["items", "modelValue", "onUpdate:modelValue"])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(VCol, {
                      cols: "2",
                      class: "mt-6"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(VTextField, mergeProps({
                            label: "QTD",
                            type: "number",
                            modelValue: state.quantidade,
                            "onUpdate:modelValue": ($event) => state.quantidade = $event
                          }, ssrGetDirectiveProps(_ctx, _directive_mask, "###")), null, _parent4, _scopeId3));
                        } else {
                          return [
                            withDirectives(createVNode(VTextField, {
                              label: "QTD",
                              type: "number",
                              modelValue: state.quantidade,
                              "onUpdate:modelValue": ($event) => state.quantidade = $event
                            }, null, 8, ["modelValue", "onUpdate:modelValue"]), [
                              [_directive_mask, "###"]
                            ])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(VCol, { cols: "2" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<label for=""${_scopeId3}>Valor unitario</label>`);
                          _push4(ssrRenderComponent(_component_MoneyInput, {
                            modelValue: state.valor_unitario,
                            "onUpdate:modelValue": ($event) => state.valor_unitario = $event
                          }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode("label", { for: "" }, "Valor unitario"),
                            createVNode(_component_MoneyInput, {
                              modelValue: state.valor_unitario,
                              "onUpdate:modelValue": ($event) => state.valor_unitario = $event
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(`<div${_scopeId2}><img class="btn-pointer ml-2 mt-7"${ssrRenderAttr("src", _imports_0)} style="${ssrRenderStyle({ "width": "40px", "cursor": "pointer" })}" title="Criar Pessoa"${_scopeId2}></div>`);
                  } else {
                    return [
                      createVNode(VCol, {
                        cols: "5",
                        class: "mt-6"
                      }, {
                        default: withCtx(() => [
                          createVNode(VAutocomplete, {
                            label: "Outros Atos",
                            items: outrosItems.value,
                            "item-title": "descricao",
                            "item-value": "id",
                            modelValue: state.outros_tj_id,
                            "onUpdate:modelValue": ($event) => state.outros_tj_id = $event
                          }, null, 8, ["items", "modelValue", "onUpdate:modelValue"])
                        ]),
                        _: 1
                      }),
                      createVNode(VCol, {
                        cols: "2",
                        class: "mt-6"
                      }, {
                        default: withCtx(() => [
                          withDirectives(createVNode(VTextField, {
                            label: "QTD",
                            type: "number",
                            modelValue: state.quantidade,
                            "onUpdate:modelValue": ($event) => state.quantidade = $event
                          }, null, 8, ["modelValue", "onUpdate:modelValue"]), [
                            [_directive_mask, "###"]
                          ])
                        ]),
                        _: 1
                      }),
                      createVNode(VCol, { cols: "2" }, {
                        default: withCtx(() => [
                          createVNode("label", { for: "" }, "Valor unitario"),
                          createVNode(_component_MoneyInput, {
                            modelValue: state.valor_unitario,
                            "onUpdate:modelValue": ($event) => state.valor_unitario = $event
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        _: 1
                      }),
                      createVNode("div", null, [
                        createVNode("img", {
                          class: "btn-pointer ml-2 mt-7",
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
            } else {
              _push2(`<!---->`);
            }
            if (!isVisualizar.value) {
              _push2(ssrRenderComponent(VRow, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(VCol, { cols: "9" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(VTextField, {
                            label: "Observa\xE7\xE3o",
                            modelValue: state.observacao,
                            "onUpdate:modelValue": ($event) => state.observacao = $event
                          }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(VTextField, {
                              label: "Observa\xE7\xE3o",
                              modelValue: state.observacao,
                              "onUpdate:modelValue": ($event) => state.observacao = $event
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(VCol, { cols: "9" }, {
                        default: withCtx(() => [
                          createVNode(VTextField, {
                            label: "Observa\xE7\xE3o",
                            modelValue: state.observacao,
                            "onUpdate:modelValue": ($event) => state.observacao = $event
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        _: 1
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(ssrRenderComponent(VRow, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VCol, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VDataTable, {
                          style: { "height": "465px" },
                          headers,
                          items: outrosItemsTable.value
                        }, {
                          "item.actions": withCtx(({ item }, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              if (!isVisualizar.value) {
                                _push5(`<div style="${ssrRenderStyle({ "display": "flex", "cursor": "pointer", "justify-content": "flex-end" })}" title="Deletar Observa\xE7\xE3o"${_scopeId4}>`);
                                if (item.excluido) {
                                  _push5(`<img style="${ssrRenderStyle({ "width": "30px", "height": "30px" })}"${ssrRenderAttr("src", _imports_2)} alt="Visualizar" title="Reativar"${_scopeId4}>`);
                                } else {
                                  _push5(`<img${ssrRenderAttr("src", _imports_3)} alt="Excluir" class="trash-icon" style="${ssrRenderStyle({ "width": "30px", "height": "30px" })}" title="Excluir"${_scopeId4}>`);
                                }
                                _push5(`</div>`);
                              } else {
                                _push5(`<!---->`);
                              }
                            } else {
                              return [
                                !isVisualizar.value ? (openBlock(), createBlock("div", {
                                  key: 0,
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
                                ], 8, ["onClick"])) : createCommentVNode("", true)
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
                            items: outrosItemsTable.value
                          }, {
                            "item.actions": withCtx(({ item }) => [
                              !isVisualizar.value ? (openBlock(), createBlock("div", {
                                key: 0,
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
                              ], 8, ["onClick"])) : createCommentVNode("", true)
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
                          items: outrosItemsTable.value
                        }, {
                          "item.actions": withCtx(({ item }) => [
                            !isVisualizar.value ? (openBlock(), createBlock("div", {
                              key: 0,
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
                            ], 8, ["onClick"])) : createCommentVNode("", true)
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
              !isVisualizar.value ? (openBlock(), createBlock(VRow, { key: 0 }, {
                default: withCtx(() => [
                  createVNode(VCol, {
                    cols: "5",
                    class: "mt-6"
                  }, {
                    default: withCtx(() => [
                      createVNode(VAutocomplete, {
                        label: "Outros Atos",
                        items: outrosItems.value,
                        "item-title": "descricao",
                        "item-value": "id",
                        modelValue: state.outros_tj_id,
                        "onUpdate:modelValue": ($event) => state.outros_tj_id = $event
                      }, null, 8, ["items", "modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(VCol, {
                    cols: "2",
                    class: "mt-6"
                  }, {
                    default: withCtx(() => [
                      withDirectives(createVNode(VTextField, {
                        label: "QTD",
                        type: "number",
                        modelValue: state.quantidade,
                        "onUpdate:modelValue": ($event) => state.quantidade = $event
                      }, null, 8, ["modelValue", "onUpdate:modelValue"]), [
                        [_directive_mask, "###"]
                      ])
                    ]),
                    _: 1
                  }),
                  createVNode(VCol, { cols: "2" }, {
                    default: withCtx(() => [
                      createVNode("label", { for: "" }, "Valor unitario"),
                      createVNode(_component_MoneyInput, {
                        modelValue: state.valor_unitario,
                        "onUpdate:modelValue": ($event) => state.valor_unitario = $event
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode("div", null, [
                    createVNode("img", {
                      class: "btn-pointer ml-2 mt-7",
                      src: _imports_0,
                      style: { "width": "40px", "cursor": "pointer" },
                      title: "Criar Pessoa",
                      onClick: onSubmit
                    })
                  ])
                ]),
                _: 1
              })) : createCommentVNode("", true),
              !isVisualizar.value ? (openBlock(), createBlock(VRow, { key: 1 }, {
                default: withCtx(() => [
                  createVNode(VCol, { cols: "9" }, {
                    default: withCtx(() => [
                      createVNode(VTextField, {
                        label: "Observa\xE7\xE3o",
                        modelValue: state.observacao,
                        "onUpdate:modelValue": ($event) => state.observacao = $event
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              })) : createCommentVNode("", true),
              createVNode(VRow, null, {
                default: withCtx(() => [
                  createVNode(VCol, null, {
                    default: withCtx(() => [
                      createVNode(VDataTable, {
                        style: { "height": "465px" },
                        headers,
                        items: outrosItemsTable.value
                      }, {
                        "item.actions": withCtx(({ item }) => [
                          !isVisualizar.value ? (openBlock(), createBlock("div", {
                            key: 0,
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
                          ], 8, ["onClick"])) : createCommentVNode("", true)
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
    const isVisualizar = ref(route.query.origem === "vizualizar");
    const allSituacoes = `${config.public.auth}/service/gerencia/listarSituacoes`;
    const getAtoId = `${config.public.auth}/service/gerencia/getAtos`;
    const cartorio_token = ref(useCookie("user-data").value.cartorio_token);
    const body = route.query.id ? { ato_token: route.query.tipo_ato_token } : { cartorio_token };
    const situacoesItems = ref([]);
    const dadosData = ref([]);
    const modalVisible = ref(false);
    const usaImoveis = ref(route.query.usa_imoveis === "true" ? true : false);
    const tipoAto = route.query.tipo_ato || "";
    const label = ref(null);
    const updatedAtoDetails = ref(null);
    const [initialLabel, initialUpdatedAtoDetails] = tipoAto.split(" - ");
    label.value = initialLabel || "";
    updatedAtoDetails.value = initialUpdatedAtoDetails || "";
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
        console.error(error);
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
      const [firstPart, secondPart] = descricao.split(" - ");
      label.value = firstPart || "";
      updatedAtoDetails.value = secondPart || "";
      usaImoveis.value = usaImoveisParams;
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ProcuracaoAtualizarDados = _sfc_main$5;
      const _component_ProcuracaoAtualizarPartes = _sfc_main$4;
      const _component_ProcuracaoAtualizarBens = _sfc_main$3;
      const _component_ProcuracaoAtualizarImoveis = _sfc_main$2;
      const _component_ProcuracaoAtualizarMinuta = _sfc_main$3$1;
      const _component_ProcuracaoAtualizarLivro = _sfc_main$2$1;
      const _component_ProcuracaoAtualizarObservacao = _sfc_main$1$1;
      const _component_ProcuracaoAtualizarAnexos = _sfc_main$6;
      const _component_ProcuracaoAtualizarOutros = _sfc_main$1;
      const _component_ModalTiposAtos = _sfc_main$7;
      _push(`<!--[-->`);
      _push(ssrRenderComponent(VContainer, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="mb-10"${_scopeId}>`);
            _push2(ssrRenderComponent(VRow, { class: "mb-5 mt-5" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<h1${_scopeId2}>Ordem de Servi\xE7o n\xBA</h1><h1 style="${ssrRenderStyle({ "color": "red", "margin-left": "30px" })}"${_scopeId2}>${ssrInterpolate(unref(route).query.numero_os)}</h1>`);
                } else {
                  return [
                    createVNode("h1", null, "Ordem de Servi\xE7o n\xBA"),
                    createVNode("h1", { style: { "color": "red", "margin-left": "30px" } }, toDisplayString(unref(route).query.numero_os), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(VRow, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VCol, { md: "6" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VAutocomplete, {
                          label: "Servi\xE7o",
                          class: "mr-5",
                          modelValue: unref(label),
                          "onUpdate:modelValue": ($event) => isRef(label) ? label.value = $event : null,
                          disabled: ""
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VAutocomplete, {
                            label: "Servi\xE7o",
                            class: "mr-5",
                            modelValue: unref(label),
                            "onUpdate:modelValue": ($event) => isRef(label) ? label.value = $event : null,
                            disabled: ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VCol, { md: "5" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VAutocomplete, {
                          modelValue: unref(updatedAtoDetails),
                          "onUpdate:modelValue": ($event) => isRef(updatedAtoDetails) ? updatedAtoDetails.value = $event : null,
                          label: "Tipo de Ato",
                          disabled: ""
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VAutocomplete, {
                            modelValue: unref(updatedAtoDetails),
                            "onUpdate:modelValue": ($event) => isRef(updatedAtoDetails) ? updatedAtoDetails.value = $event : null,
                            label: "Tipo de Ato",
                            disabled: ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  if (!unref(isVisualizar)) {
                    _push3(`<div${_scopeId2}><img class="mt-2" style="${ssrRenderStyle({
                      cursor: unref(dadosData).dt_lavratura ? "default" : "pointer",
                      width: "35px",
                      height: "35px"
                    })}"${ssrRenderAttr("src", _imports_1)} alt="Editar"${_scopeId2}></div>`);
                  } else {
                    _push3(`<!---->`);
                  }
                } else {
                  return [
                    createVNode(VCol, { md: "6" }, {
                      default: withCtx(() => [
                        createVNode(VAutocomplete, {
                          label: "Servi\xE7o",
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
                          label: "Tipo de Ato",
                          disabled: ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    !unref(isVisualizar) ? (openBlock(), createBlock("div", { key: 0 }, [
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
                    ])) : createCommentVNode("", true)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
            _push2(ssrRenderComponent(VCard, { width: "1300" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VTabs, {
                    modelValue: unref(tab),
                    "onUpdate:modelValue": ($event) => isRef(tab) ? tab.value = $event : null,
                    "bg-color": "#f5f2f2"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VTab, { value: "dados" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Dados`);
                            } else {
                              return [
                                createTextVNode("Dados")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VTab, { value: "partes" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Partes`);
                            } else {
                              return [
                                createTextVNode("Partes")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        if (unref(usaImoveis)) {
                          _push4(ssrRenderComponent(VTab, { value: "bens" }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`Bens`);
                              } else {
                                return [
                                  createTextVNode("Bens")
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        } else {
                          _push4(`<!---->`);
                        }
                        if (unref(usaImoveis)) {
                          _push4(ssrRenderComponent(VTab, { value: "imoveis" }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`Imoveis`);
                              } else {
                                return [
                                  createTextVNode("Imoveis")
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        } else {
                          _push4(`<!---->`);
                        }
                        _push4(ssrRenderComponent(VTab, { value: "minuta" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Minuta`);
                            } else {
                              return [
                                createTextVNode("Minuta")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VTab, { value: "livro" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Livro`);
                            } else {
                              return [
                                createTextVNode("Livro")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VTab, { value: "observacao" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Observa\xE7\xF5es`);
                            } else {
                              return [
                                createTextVNode("Observa\xE7\xF5es")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VTab, { value: "anexo" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Anexos`);
                            } else {
                              return [
                                createTextVNode("Anexos")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VTab, { value: "outros" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Outros`);
                            } else {
                              return [
                                createTextVNode("Outros")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
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
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VTabsWindow, {
                    modelValue: unref(tab),
                    "onUpdate:modelValue": ($event) => isRef(tab) ? tab.value = $event : null
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VTabsWindowItem, { value: "dados" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_ProcuracaoAtualizarDados, {
                                item_dados: unref(dadosData),
                                item_situacoes: unref(situacoesItems)
                              }, null, _parent5, _scopeId4));
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
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VTabsWindowItem, { value: "partes" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_ProcuracaoAtualizarPartes, null, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_ProcuracaoAtualizarPartes)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        if (unref(usaImoveis)) {
                          _push4(ssrRenderComponent(VTabsWindowItem, { value: "bens" }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(_component_ProcuracaoAtualizarBens, null, null, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(_component_ProcuracaoAtualizarBens)
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        } else {
                          _push4(`<!---->`);
                        }
                        if (unref(usaImoveis)) {
                          _push4(ssrRenderComponent(VTabsWindowItem, { value: "imoveis" }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(_component_ProcuracaoAtualizarImoveis, null, null, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(_component_ProcuracaoAtualizarImoveis)
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        } else {
                          _push4(`<!---->`);
                        }
                        _push4(ssrRenderComponent(VTabsWindowItem, { value: "minuta" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_ProcuracaoAtualizarMinuta, {
                                onPage: getPages,
                                onDoc: getDocument
                              }, null, _parent5, _scopeId4));
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
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VTabsWindowItem, { value: "livro" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_ProcuracaoAtualizarLivro, {
                                pages: unref(pages_prop),
                                document: unref(doc_prop)
                              }, null, _parent5, _scopeId4));
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
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VTabsWindowItem, { value: "observacao" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_ProcuracaoAtualizarObservacao, null, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_ProcuracaoAtualizarObservacao)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VTabsWindowItem, { value: "anexo" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_ProcuracaoAtualizarAnexos, null, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_ProcuracaoAtualizarAnexos)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VTabsWindowItem, { value: "outros" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_ProcuracaoAtualizarOutros, null, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_ProcuracaoAtualizarOutros)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
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
                  }, _parent3, _scopeId2));
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
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode("div", { class: "mb-10" }, [
                createVNode(VRow, { class: "mb-5 mt-5" }, {
                  default: withCtx(() => [
                    createVNode("h1", null, "Ordem de Servi\xE7o n\xBA"),
                    createVNode("h1", { style: { "color": "red", "margin-left": "30px" } }, toDisplayString(unref(route).query.numero_os), 1)
                  ]),
                  _: 1
                }),
                createVNode(VRow, null, {
                  default: withCtx(() => [
                    createVNode(VCol, { md: "6" }, {
                      default: withCtx(() => [
                        createVNode(VAutocomplete, {
                          label: "Servi\xE7o",
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
                          label: "Tipo de Ato",
                          disabled: ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    !unref(isVisualizar) ? (openBlock(), createBlock("div", { key: 0 }, [
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
                    ])) : createCommentVNode("", true)
                  ]),
                  _: 1
                })
              ]),
              createVNode(VCard, { width: "1300" }, {
                default: withCtx(() => [
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
                ]),
                _: 1
              })
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
//# sourceMappingURL=_id_-DPFmjAdz.mjs.map
