import { _ as __nuxt_component_0 } from './nuxt-link-TpvcaGEw.mjs';
import { _ as _imports_2, a as _sfc_main$1 } from './Selos-DZkoIFpO.mjs';
import { ref, reactive, withAsyncContext, resolveDirective, mergeProps, withCtx, unref, createVNode, toDisplayString, withDirectives, openBlock, createBlock, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderStyle, ssrInterpolate, ssrGetDirectiveProps, ssrRenderAttr, ssrRenderClass, ssrIncludeBooleanAttr } from 'vue/server-renderer';
import { _ as _imports_0 } from './salvar-DQISB1bG.mjs';
import { _ as _imports_0$1, a as _imports_1, b as _imports_2$1, c as _imports_3 } from './mudarStatus-CVlVNUDw.mjs';
import { helpers, required } from '@vuelidate/validators';
import { useVuelidate } from '@vuelidate/core';
import { b as useNuxtApp, aL as useRoute$1, u as useRouter$1, e as useCookie, V as VTextField, F as VBtn, c as useRuntimeConfig } from './server.mjs';
import { u as useFetch } from './fetch-CmQgfhnJ.mjs';
import { V as VContainer } from './VContainer-DUPM_BP9.mjs';
import { V as VRow } from './VRow-DbcfFNio.mjs';
import { V as VCol } from './VCol-BY-FaYhw.mjs';
import { V as VAutocomplete } from './VAutocomplete-BkWVMD0Z.mjs';
import { V as VDataTable } from './VDataTable-C53h7B9w.mjs';
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
import './VDialog-BSU3_51C.mjs';
import './VAvatar-DEYOjnUS.mjs';
import './VResponsive-_f8EzDDz.mjs';
import 'pinia';
import 'vue-router';
import 'vue3-toastify';
import 'vue-the-mask';
import './filter-DK3_4lVs.mjs';
import './VList-iVnq_OpI.mjs';

const _sfc_main = {
  __name: "[id]",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const { $toast } = useNuxtApp();
    const route = useRoute$1();
    const { id } = route.params;
    const router = useRouter$1();
    const config = useRuntimeConfig();
    const updateOs = `${config.public.managemant}/updateOrdensServico`;
    const getOsPayload = `${config.public.managemant}/getOrdensServicoById`;
    const atosPayload = `${config.public.managemant}/listarAtos`;
    const cartorio_id = ref(useCookie("user-data").value.cartorio_id);
    const pessoa_id = ref(useCookie("user-data").value.usuario_id);
    const ordemserv_token = ref(useCookie("user-service").value.token).value || null;
    const cartorio_token = ref(useCookie("user-data").value.cartorio_token).value;
    const atosItems = ref([]);
    const isModalReimprimirOpen = ref(false);
    const ato_token = ref(null);
    const numeroOs = ref(null);
    const state = reactive({
      nacionalidade: "brasileiro",
      apresentante_nome: null,
      apresentante_cpf: null,
      documento: null
    });
    const headers = [
      { title: "ID", value: "id" },
      { title: "Protocolo", value: "protocolo" },
      { title: "Usuario", value: "usuario_nome" },
      { title: "Situa\xE7\xE3o", value: "situacao" },
      { title: "Valor", value: "valor" },
      { title: "Tipo", value: "tipo" },
      {
        value: "actions"
      }
    ];
    const nacionalidade = [
      { title: "BRASILEIRO", value: false },
      { title: "ESTRANGEIRO", value: true }
    ];
    const rules = {
      apresentante_nome: {
        required: helpers.withMessage("O campo \xE9 obrigatorio", required)
      },
      apresentante_cpf: {
        required: helpers.withMessage("O campo \xE9 obrigatorio", required)
      }
    };
    const v$ = useVuelidate(rules, state);
    function removeFormatting(value) {
      if (value) {
        return value.replace(/[.\-]/g, "");
      } else {
        value = null;
      }
    }
    const redirectToModalReimprimir = (token) => {
      ato_token.value = token;
      isModalReimprimirOpen.value = true;
    };
    const redirectToUpdateAto = (item) => {
      if (item.tipo === "PROCURA\xC7\xC3O GERAL") {
        router.push({
          path: `/fontes/atos/atos-sem-bem/atualizar/${item.id}`,
          query: {
            origem: "atualizar",
            id,
            ato_id: item.id,
            ato_token_edit: item.token,
            numero_os: numeroOs.value
          }
        });
      } else if (item.tipo === "INVENT\xC1RIO E PARTILHA") {
        router.push({
          path: `/fontes/atos/atos-com-bem/atualizar/${item.id}`,
          query: {
            origem: "atualizar",
            id,
            ato_id: item.id,
            ato_token_edit: item.token,
            numero_os: numeroOs.value
          }
        });
      }
    };
    async function onUpdate() {
      const payloadFormated = {
        apresentante_cpf: removeFormatting(state.apresentante_cpf),
        apresentante_nome: state.apresentante_nome,
        user_id: pessoa_id.value,
        cartorio_id: cartorio_id.value
      };
      const { error, status } = await useFetch(`${updateOs}/${id}`, {
        method: "PUT",
        body: payloadFormated
      }, "$Fud06ay483");
      if (status.value === "error" && error.value.statusCode === 500) {
        $toast.error("Erro ao cadastrar ordem,erro no sistema.");
      } else {
        $toast.success("Ordem Atualizada com sucesso!");
        router.push({ path: `/os/lista` });
      }
    }
    const { data: dataOs } = ([__temp, __restore] = withAsyncContext(() => useFetch(`${getOsPayload}/${id}`, {
      method: "GET"
    }, "$wPUkUpDvPf")), __temp = await __temp, __restore(), __temp);
    numeroOs.value = dataOs.value.numero;
    state.nacionalidade = dataOs.value.estrangeiro;
    state.apresentante_cpf = dataOs.value.apresentante_cpf;
    state.apresentante_nome = dataOs.value.apresentante_nome;
    const { data } = ([__temp, __restore] = withAsyncContext(() => useFetch(atosPayload, {
      method: "POST",
      body: {
        cartorio_token,
        ordemserv_token
      }
    }, "$YXZ55K3IUf")), __temp = await __temp, __restore(), __temp);
    if (data.value.length > 0) {
      atosItems.value = data.value;
    } else {
      atosItems.value = [];
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      const _component_ReimpressaoSelos = _sfc_main$1;
      const _directive_mask = resolveDirective("mask");
      _push(ssrRenderComponent(VContainer, mergeProps({ class: "mt-5" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VRow, { class: "mb-5" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<h1${_scopeId2}>Ordem de Servi\xE7o n\xBA</h1><h1 style="${ssrRenderStyle({ "color": "red", "margin-left": "30px" })}"${_scopeId2}>${ssrInterpolate(unref(numeroOs))}</h1>`);
                } else {
                  return [
                    createVNode("h1", null, "Ordem de Servi\xE7o n\xBA"),
                    createVNode("h1", { style: { "color": "red", "margin-left": "30px" } }, toDisplayString(unref(numeroOs)), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(VRow, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VCol, { md: "3" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VAutocomplete, {
                          label: "Nacionalidade",
                          items: nacionalidade,
                          modelValue: unref(state).nacionalidade,
                          "onUpdate:modelValue": ($event) => unref(state).nacionalidade = $event
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VAutocomplete, {
                            label: "Nacionalidade",
                            items: nacionalidade,
                            modelValue: unref(state).nacionalidade,
                            "onUpdate:modelValue": ($event) => unref(state).nacionalidade = $event
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VCol, { md: "2" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        if (unref(state).nacionalidade === "brasileiro") {
                          _push4(ssrRenderComponent(VTextField, mergeProps({
                            autofocus: "",
                            modelValue: unref(state).apresentante_cpf,
                            "onUpdate:modelValue": ($event) => unref(state).apresentante_cpf = $event,
                            label: "CPF",
                            required: "",
                            "error-messages": unref(v$).apresentante_cpf.$errors.map((e) => e.$message),
                            onBlur: unref(v$).apresentante_cpf.$touch,
                            onInput: unref(v$).apresentante_cpf.$touch
                          }, ssrGetDirectiveProps(_ctx, _directive_mask, "###.###.###-##")), null, _parent4, _scopeId3));
                        } else {
                          _push4(ssrRenderComponent(VTextField, {
                            autofocus: "",
                            modelValue: unref(state).apresentante_cpf,
                            "onUpdate:modelValue": ($event) => unref(state).apresentante_cpf = $event,
                            label: "Documento",
                            required: "",
                            "error-messages": unref(v$).apresentante_cpf.$errors.map((e) => e.$message),
                            onBlur: unref(v$).apresentante_cpf.$touch
                          }, null, _parent4, _scopeId3));
                        }
                      } else {
                        return [
                          unref(state).nacionalidade === "brasileiro" ? withDirectives((openBlock(), createBlock(VTextField, {
                            key: 0,
                            autofocus: "",
                            modelValue: unref(state).apresentante_cpf,
                            "onUpdate:modelValue": ($event) => unref(state).apresentante_cpf = $event,
                            label: "CPF",
                            required: "",
                            "error-messages": unref(v$).apresentante_cpf.$errors.map((e) => e.$message),
                            onBlur: unref(v$).apresentante_cpf.$touch,
                            onInput: unref(v$).apresentante_cpf.$touch
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages", "onBlur", "onInput"])), [
                            [_directive_mask, "###.###.###-##"]
                          ]) : (openBlock(), createBlock(VTextField, {
                            key: 1,
                            autofocus: "",
                            modelValue: unref(state).apresentante_cpf,
                            "onUpdate:modelValue": ($event) => unref(state).apresentante_cpf = $event,
                            label: "Documento",
                            required: "",
                            "error-messages": unref(v$).apresentante_cpf.$errors.map((e) => e.$message),
                            onBlur: unref(v$).apresentante_cpf.$touch
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages", "onBlur"]))
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VCol, { md: "4" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VTextField, {
                          modelValue: unref(state).apresentante_nome,
                          "onUpdate:modelValue": ($event) => unref(state).apresentante_nome = $event,
                          label: "Nome Apresentante",
                          required: "",
                          "error-messages": unref(v$).apresentante_nome.$errors.map((e) => e.$message),
                          onInput: unref(v$).apresentante_nome.$touch
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VTextField, {
                            modelValue: unref(state).apresentante_nome,
                            "onUpdate:modelValue": ($event) => unref(state).apresentante_nome = $event,
                            label: "Nome Apresentante",
                            required: "",
                            "error-messages": unref(v$).apresentante_nome.$errors.map((e) => e.$message),
                            onInput: unref(v$).apresentante_nome.$touch
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages", "onInput"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VCol, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div${_scopeId3}><img style="${ssrRenderStyle({ "width": "40px", "height": "40px", "cursor": "pointer" })}"${ssrRenderAttr("src", _imports_0)} alt="Salvar"${_scopeId3}></div>`);
                      } else {
                        return [
                          createVNode("div", null, [
                            createVNode("img", {
                              style: { "width": "40px", "height": "40px", "cursor": "pointer" },
                              src: _imports_0,
                              alt: "Salvar",
                              onClick: ($event) => onUpdate()
                            }, null, 8, ["onClick"])
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VCol, { md: "3" }, {
                      default: withCtx(() => [
                        createVNode(VAutocomplete, {
                          label: "Nacionalidade",
                          items: nacionalidade,
                          modelValue: unref(state).nacionalidade,
                          "onUpdate:modelValue": ($event) => unref(state).nacionalidade = $event
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, { md: "2" }, {
                      default: withCtx(() => [
                        unref(state).nacionalidade === "brasileiro" ? withDirectives((openBlock(), createBlock(VTextField, {
                          key: 0,
                          autofocus: "",
                          modelValue: unref(state).apresentante_cpf,
                          "onUpdate:modelValue": ($event) => unref(state).apresentante_cpf = $event,
                          label: "CPF",
                          required: "",
                          "error-messages": unref(v$).apresentante_cpf.$errors.map((e) => e.$message),
                          onBlur: unref(v$).apresentante_cpf.$touch,
                          onInput: unref(v$).apresentante_cpf.$touch
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages", "onBlur", "onInput"])), [
                          [_directive_mask, "###.###.###-##"]
                        ]) : (openBlock(), createBlock(VTextField, {
                          key: 1,
                          autofocus: "",
                          modelValue: unref(state).apresentante_cpf,
                          "onUpdate:modelValue": ($event) => unref(state).apresentante_cpf = $event,
                          label: "Documento",
                          required: "",
                          "error-messages": unref(v$).apresentante_cpf.$errors.map((e) => e.$message),
                          onBlur: unref(v$).apresentante_cpf.$touch
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages", "onBlur"]))
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, { md: "4" }, {
                      default: withCtx(() => [
                        createVNode(VTextField, {
                          modelValue: unref(state).apresentante_nome,
                          "onUpdate:modelValue": ($event) => unref(state).apresentante_nome = $event,
                          label: "Nome Apresentante",
                          required: "",
                          "error-messages": unref(v$).apresentante_nome.$errors.map((e) => e.$message),
                          onInput: unref(v$).apresentante_nome.$touch
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages", "onInput"])
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, null, {
                      default: withCtx(() => [
                        createVNode("div", null, [
                          createVNode("img", {
                            style: { "width": "40px", "height": "40px", "cursor": "pointer" },
                            src: _imports_0,
                            alt: "Salvar",
                            onClick: ($event) => onUpdate()
                          }, null, 8, ["onClick"])
                        ])
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(VRow, { style: { "display": "flex", "margin-bottom": "10px", "gap": "2rem" } }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<h1 class="ml-5"${_scopeId2}>Atos</h1>`);
                  _push3(ssrRenderComponent(_component_NuxtLink, {
                    to: {
                      path: "/os/criar-ato",
                      query: { origem: "atualizar", id: unref(id), numeroOs: unref(numeroOs) }
                    }
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<img style="${ssrRenderStyle({ "width": "45px", "height": "45px", "cursor": "pointer" })}"${ssrRenderAttr("src", _imports_0$1)} alt="novo"${_scopeId3}>`);
                      } else {
                        return [
                          createVNode("img", {
                            style: { "width": "45px", "height": "45px", "cursor": "pointer" },
                            src: _imports_0$1,
                            alt: "novo"
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VDataTable, {
                    headers,
                    items: unref(atosItems),
                    "item-key": "id"
                  }, {
                    "item.actions": withCtx(({ item }, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VRow, { style: { "display": "flex", "gap": "10px", "margin-top": "-5px" } }, {
                          default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<div title="Reimprimir"${_scopeId4}><img style="${ssrRenderStyle({ "width": "30px", "height": "30px", "cursor": "pointer" })}"${ssrRenderAttr("src", _imports_2)} alt="Reimprimir"${_scopeId4}></div><div class="${ssrRenderClass({ disabled: !item.btn_editar })}"${ssrRenderAttr("title", item.btn_editar ? "Editar" : "Desabilitado")}${_scopeId4}><img style="${ssrRenderStyle({
                                cursor: item.btn_editar ? "pointer" : "default",
                                width: "30px",
                                height: "30px"
                              })}"${ssrRenderAttr("src", _imports_1)} alt="Editar"${_scopeId4}></div><div${ssrIncludeBooleanAttr(!item.btn_cancelar) ? " disabled" : ""} title="Excluir"${_scopeId4}>`);
                              if (item.excluido) {
                                _push5(`<img style="${ssrRenderStyle({ "width": "30px", "height": "30px", "cursor": "pointer" })}"${ssrRenderAttr("src", _imports_2$1)} alt="Visualizar" title="Reativar"${_scopeId4}>`);
                              } else {
                                _push5(`<img${ssrRenderAttr("src", _imports_3)} alt="Excluir" class="trash-icon" style="${ssrRenderStyle({ "width": "30px", "height": "30px", "cursor": "pointer" })}" title="Excluir"${_scopeId4}>`);
                              }
                              _push5(`</div>`);
                            } else {
                              return [
                                createVNode("div", {
                                  onClick: ($event) => redirectToModalReimprimir(item.token),
                                  title: "Reimprimir"
                                }, [
                                  createVNode("img", {
                                    style: { "width": "30px", "height": "30px", "cursor": "pointer" },
                                    src: _imports_2,
                                    alt: "Reimprimir"
                                  })
                                ], 8, ["onClick"]),
                                createVNode("div", {
                                  class: { disabled: !item.btn_editar },
                                  onClick: ($event) => item.btn_editar ? redirectToUpdateAto({
                                    id: item.id,
                                    tipo: item.tipo,
                                    token: item.token
                                  }) : null,
                                  title: item.btn_editar ? "Editar" : "Desabilitado"
                                }, [
                                  createVNode("img", {
                                    style: {
                                      cursor: item.btn_editar ? "pointer" : "default",
                                      width: "30px",
                                      height: "30px"
                                    },
                                    src: _imports_1,
                                    alt: "Editar"
                                  }, null, 4)
                                ], 10, ["onClick", "title"]),
                                createVNode("div", {
                                  disabled: !item.btn_cancelar,
                                  onClick: ($event) => item.btn_cancelar ? _ctx.deleteEndereco(item) : null,
                                  title: "Excluir"
                                }, [
                                  item.excluido ? (openBlock(), createBlock("img", {
                                    key: 0,
                                    style: { "width": "30px", "height": "30px", "cursor": "pointer" },
                                    src: _imports_2$1,
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
                                ], 8, ["disabled", "onClick"])
                              ];
                            }
                          }),
                          _: 2
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VRow, { style: { "display": "flex", "gap": "10px", "margin-top": "-5px" } }, {
                            default: withCtx(() => [
                              createVNode("div", {
                                onClick: ($event) => redirectToModalReimprimir(item.token),
                                title: "Reimprimir"
                              }, [
                                createVNode("img", {
                                  style: { "width": "30px", "height": "30px", "cursor": "pointer" },
                                  src: _imports_2,
                                  alt: "Reimprimir"
                                })
                              ], 8, ["onClick"]),
                              createVNode("div", {
                                class: { disabled: !item.btn_editar },
                                onClick: ($event) => item.btn_editar ? redirectToUpdateAto({
                                  id: item.id,
                                  tipo: item.tipo,
                                  token: item.token
                                }) : null,
                                title: item.btn_editar ? "Editar" : "Desabilitado"
                              }, [
                                createVNode("img", {
                                  style: {
                                    cursor: item.btn_editar ? "pointer" : "default",
                                    width: "30px",
                                    height: "30px"
                                  },
                                  src: _imports_1,
                                  alt: "Editar"
                                }, null, 4)
                              ], 10, ["onClick", "title"]),
                              createVNode("div", {
                                disabled: !item.btn_cancelar,
                                onClick: ($event) => item.btn_cancelar ? _ctx.deleteEndereco(item) : null,
                                title: "Excluir"
                              }, [
                                item.excluido ? (openBlock(), createBlock("img", {
                                  key: 0,
                                  style: { "width": "30px", "height": "30px", "cursor": "pointer" },
                                  src: _imports_2$1,
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
                              ], 8, ["disabled", "onClick"])
                            ]),
                            _: 2
                          }, 1024)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_ReimpressaoSelos, {
                    show: unref(isModalReimprimirOpen),
                    ato_token: unref(ato_token),
                    onClose: ($event) => isModalReimprimirOpen.value = false
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode("h1", { class: "ml-5" }, "Atos"),
                    createVNode(_component_NuxtLink, {
                      to: {
                        path: "/os/criar-ato",
                        query: { origem: "atualizar", id: unref(id), numeroOs: unref(numeroOs) }
                      }
                    }, {
                      default: withCtx(() => [
                        createVNode("img", {
                          style: { "width": "45px", "height": "45px", "cursor": "pointer" },
                          src: _imports_0$1,
                          alt: "novo"
                        })
                      ]),
                      _: 1
                    }, 8, ["to"]),
                    createVNode(VDataTable, {
                      headers,
                      items: unref(atosItems),
                      "item-key": "id"
                    }, {
                      "item.actions": withCtx(({ item }) => [
                        createVNode(VRow, { style: { "display": "flex", "gap": "10px", "margin-top": "-5px" } }, {
                          default: withCtx(() => [
                            createVNode("div", {
                              onClick: ($event) => redirectToModalReimprimir(item.token),
                              title: "Reimprimir"
                            }, [
                              createVNode("img", {
                                style: { "width": "30px", "height": "30px", "cursor": "pointer" },
                                src: _imports_2,
                                alt: "Reimprimir"
                              })
                            ], 8, ["onClick"]),
                            createVNode("div", {
                              class: { disabled: !item.btn_editar },
                              onClick: ($event) => item.btn_editar ? redirectToUpdateAto({
                                id: item.id,
                                tipo: item.tipo,
                                token: item.token
                              }) : null,
                              title: item.btn_editar ? "Editar" : "Desabilitado"
                            }, [
                              createVNode("img", {
                                style: {
                                  cursor: item.btn_editar ? "pointer" : "default",
                                  width: "30px",
                                  height: "30px"
                                },
                                src: _imports_1,
                                alt: "Editar"
                              }, null, 4)
                            ], 10, ["onClick", "title"]),
                            createVNode("div", {
                              disabled: !item.btn_cancelar,
                              onClick: ($event) => item.btn_cancelar ? _ctx.deleteEndereco(item) : null,
                              title: "Excluir"
                            }, [
                              item.excluido ? (openBlock(), createBlock("img", {
                                key: 0,
                                style: { "width": "30px", "height": "30px", "cursor": "pointer" },
                                src: _imports_2$1,
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
                            ], 8, ["disabled", "onClick"])
                          ]),
                          _: 2
                        }, 1024)
                      ]),
                      _: 1
                    }, 8, ["items"]),
                    createVNode(_component_ReimpressaoSelos, {
                      show: unref(isModalReimprimirOpen),
                      ato_token: unref(ato_token),
                      onClose: ($event) => isModalReimprimirOpen.value = false
                    }, null, 8, ["show", "ato_token", "onClose"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_NuxtLink, { to: "/os/lista" }, {
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
          } else {
            return [
              createVNode(VRow, { class: "mb-5" }, {
                default: withCtx(() => [
                  createVNode("h1", null, "Ordem de Servi\xE7o n\xBA"),
                  createVNode("h1", { style: { "color": "red", "margin-left": "30px" } }, toDisplayString(unref(numeroOs)), 1)
                ]),
                _: 1
              }),
              createVNode(VRow, null, {
                default: withCtx(() => [
                  createVNode(VCol, { md: "3" }, {
                    default: withCtx(() => [
                      createVNode(VAutocomplete, {
                        label: "Nacionalidade",
                        items: nacionalidade,
                        modelValue: unref(state).nacionalidade,
                        "onUpdate:modelValue": ($event) => unref(state).nacionalidade = $event
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(VCol, { md: "2" }, {
                    default: withCtx(() => [
                      unref(state).nacionalidade === "brasileiro" ? withDirectives((openBlock(), createBlock(VTextField, {
                        key: 0,
                        autofocus: "",
                        modelValue: unref(state).apresentante_cpf,
                        "onUpdate:modelValue": ($event) => unref(state).apresentante_cpf = $event,
                        label: "CPF",
                        required: "",
                        "error-messages": unref(v$).apresentante_cpf.$errors.map((e) => e.$message),
                        onBlur: unref(v$).apresentante_cpf.$touch,
                        onInput: unref(v$).apresentante_cpf.$touch
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages", "onBlur", "onInput"])), [
                        [_directive_mask, "###.###.###-##"]
                      ]) : (openBlock(), createBlock(VTextField, {
                        key: 1,
                        autofocus: "",
                        modelValue: unref(state).apresentante_cpf,
                        "onUpdate:modelValue": ($event) => unref(state).apresentante_cpf = $event,
                        label: "Documento",
                        required: "",
                        "error-messages": unref(v$).apresentante_cpf.$errors.map((e) => e.$message),
                        onBlur: unref(v$).apresentante_cpf.$touch
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages", "onBlur"]))
                    ]),
                    _: 1
                  }),
                  createVNode(VCol, { md: "4" }, {
                    default: withCtx(() => [
                      createVNode(VTextField, {
                        modelValue: unref(state).apresentante_nome,
                        "onUpdate:modelValue": ($event) => unref(state).apresentante_nome = $event,
                        label: "Nome Apresentante",
                        required: "",
                        "error-messages": unref(v$).apresentante_nome.$errors.map((e) => e.$message),
                        onInput: unref(v$).apresentante_nome.$touch
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages", "onInput"])
                    ]),
                    _: 1
                  }),
                  createVNode(VCol, null, {
                    default: withCtx(() => [
                      createVNode("div", null, [
                        createVNode("img", {
                          style: { "width": "40px", "height": "40px", "cursor": "pointer" },
                          src: _imports_0,
                          alt: "Salvar",
                          onClick: ($event) => onUpdate()
                        }, null, 8, ["onClick"])
                      ])
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(VRow, { style: { "display": "flex", "margin-bottom": "10px", "gap": "2rem" } }, {
                default: withCtx(() => [
                  createVNode("h1", { class: "ml-5" }, "Atos"),
                  createVNode(_component_NuxtLink, {
                    to: {
                      path: "/os/criar-ato",
                      query: { origem: "atualizar", id: unref(id), numeroOs: unref(numeroOs) }
                    }
                  }, {
                    default: withCtx(() => [
                      createVNode("img", {
                        style: { "width": "45px", "height": "45px", "cursor": "pointer" },
                        src: _imports_0$1,
                        alt: "novo"
                      })
                    ]),
                    _: 1
                  }, 8, ["to"]),
                  createVNode(VDataTable, {
                    headers,
                    items: unref(atosItems),
                    "item-key": "id"
                  }, {
                    "item.actions": withCtx(({ item }) => [
                      createVNode(VRow, { style: { "display": "flex", "gap": "10px", "margin-top": "-5px" } }, {
                        default: withCtx(() => [
                          createVNode("div", {
                            onClick: ($event) => redirectToModalReimprimir(item.token),
                            title: "Reimprimir"
                          }, [
                            createVNode("img", {
                              style: { "width": "30px", "height": "30px", "cursor": "pointer" },
                              src: _imports_2,
                              alt: "Reimprimir"
                            })
                          ], 8, ["onClick"]),
                          createVNode("div", {
                            class: { disabled: !item.btn_editar },
                            onClick: ($event) => item.btn_editar ? redirectToUpdateAto({
                              id: item.id,
                              tipo: item.tipo,
                              token: item.token
                            }) : null,
                            title: item.btn_editar ? "Editar" : "Desabilitado"
                          }, [
                            createVNode("img", {
                              style: {
                                cursor: item.btn_editar ? "pointer" : "default",
                                width: "30px",
                                height: "30px"
                              },
                              src: _imports_1,
                              alt: "Editar"
                            }, null, 4)
                          ], 10, ["onClick", "title"]),
                          createVNode("div", {
                            disabled: !item.btn_cancelar,
                            onClick: ($event) => item.btn_cancelar ? _ctx.deleteEndereco(item) : null,
                            title: "Excluir"
                          }, [
                            item.excluido ? (openBlock(), createBlock("img", {
                              key: 0,
                              style: { "width": "30px", "height": "30px", "cursor": "pointer" },
                              src: _imports_2$1,
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
                          ], 8, ["disabled", "onClick"])
                        ]),
                        _: 2
                      }, 1024)
                    ]),
                    _: 1
                  }, 8, ["items"]),
                  createVNode(_component_ReimpressaoSelos, {
                    show: unref(isModalReimprimirOpen),
                    ato_token: unref(ato_token),
                    onClose: ($event) => isModalReimprimirOpen.value = false
                  }, null, 8, ["show", "ato_token", "onClose"])
                ]),
                _: 1
              }),
              createVNode(_component_NuxtLink, { to: "/os/lista" }, {
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
      }, _parent));
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/os/atualizar/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : undefined;
};

export { _sfc_main as default };
//# sourceMappingURL=_id_-vLbKisnK.mjs.map
