import { _ as _sfc_main$1 } from './RegistroPessoas-BpMo1i9V.mjs';
import { _ as _sfc_main$2 } from './FichaCard-CU8NuRHD.mjs';
import { _ as _sfc_main$3 } from './ErrorModalCard-DJXKbqKt.mjs';
import { _ as __nuxt_component_0 } from './nuxt-link-TpvcaGEw.mjs';
import { ref, reactive, withAsyncContext, withCtx, unref, createVNode, openBlock, createBlock, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderAttr, ssrRenderStyle } from 'vue/server-renderer';
import { _ as _imports_1 } from './visualizar-BoZ30DMV.mjs';
import { _ as _imports_0 } from './novo-CWU3oYa5.mjs';
import { _ as _imports_2 } from './visualizar-vermelho-Ly_aKn8Z.mjs';
import { a as _imports_3 } from './excluido-ceRs5bdR.mjs';
import { u as useRouter$1, f as useRoute$1, b as useNuxtApp, e as useCookie, V as VTextField, g as VBtn, c as useRuntimeConfig } from './server.mjs';
import { u as useFetch } from './fetch-DOsfzFYE.mjs';
import { V as VRow } from './VRow-Bqz0CuIN.mjs';
import { V as VCol } from './VCol-BT4RzX0Q.mjs';
import { V as VAutocomplete } from './VAutocomplete-DxrmY4dO.mjs';
import { V as VDataTable } from './VDataTable-D6BQKL_5.mjs';
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
import '@vuelidate/core';
import '@vuelidate/validators';
import './asyncData-B13qrLU7.mjs';
import './fetchWithToken-Cjtduyn0.mjs';
import './formatDate-DflkuJ_V.mjs';
import './VContainer-CUysD4sO.mjs';
import './filter-D58pPGs5.mjs';
import './VList-BkmWkhVS.mjs';
import './VAvatar-Dy2zMqU_.mjs';
import './VResponsive-BwPb2GHE.mjs';
import './editar-BcGPsVK2.mjs';
import './VDialog-BVe31KMa.mjs';
import './VCard-CaQDfbK8.mjs';
import 'utif';
import './VTabs-Dr8AWOBN.mjs';
import 'pinia';
import 'vue-router';
import 'vue3-toastify';
import 'vue-the-mask';

const _sfc_main = {
  __name: "autencidade",
  __ssrInlineRender: true,
  props: {
    ato_token: {
      type: String,
      required: true
    }
  },
  emits: ["ato-created"],
  async setup(__props, { emit: __emit }) {
    let __temp, __restore;
    const props = __props;
    const emit = __emit;
    const router = useRouter$1();
    const route = useRoute$1();
    const config = useRuntimeConfig();
    const { $toast } = useNuxtApp();
    const allEscreventes = `${config.public.managemant}/listarEscrevente`;
    const procurarPessoa = `${config.public.managemant}/pesquisarPessoas`;
    const reconhecerPessoa = `${config.public.managemant}/atoReconhecimento`;
    const etiquetaAutencidade = `${config.public.managemant}/etiquetaAutenticidade`;
    const baixarDocumento = `${config.public.managemant}/download`;
    const imprimeZplSelo = `${config.public.envioDoc}/print`;
    const cartorio_token = ref(useCookie("user-data").value.cartorio_token);
    const ordemserv_token = ref(useCookie("user-service").value.token).value || ref(useCookie("user-service").value).value;
    const usuario_token = useCookie("auth_token").value;
    const pessoasItems = ref([]);
    const escreventesItems = ref([]);
    const selectedObjects = ref([]);
    const errorModalVisible = ref(false);
    const isModalRegistroOpen = ref(false);
    const isModalFichaOpen = ref(false);
    const selectedItem = ref(null);
    const linkFichaPessoa = ref(null);
    const errorMessage = ref("");
    const headers = [
      {
        title: "Documento",
        align: "start",
        key: "documento"
      },
      {
        title: "Pessoa",
        align: "start",
        key: "nome"
      },
      { value: "actions" }
    ];
    const state = reactive({
      quantidade: 1,
      escrevente: null,
      nome: null,
      documento: null
    });
    const { data } = ([__temp, __restore] = withAsyncContext(() => useFetch(allEscreventes, {
      method: "POST",
      body: { cartorio_token }
    }, "$qpB20nOlUE")), __temp = await __temp, __restore(), __temp);
    escreventesItems.value = data.value[0].func_json_escreventes;
    async function searchPessoasService() {
      try {
        const { data: pessoasData, error } = await useFetch(procurarPessoa, {
          method: "POST",
          body: {
            cartorio_token: cartorio_token.value,
            documento: state.documento,
            nome: state.nome
          }
        }, "$CfpM9wZnUE");
        if (pessoasData.value.length > 0) {
          emit("ato-created");
          pessoasItems.value = pessoasData.value;
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
    function confirmItem(item) {
      selectedObjects.value.push(item);
    }
    const redirectToFicha = async (item) => {
      selectedItem.value = item;
      isModalFichaOpen.value = true;
      const { data: linkUrl } = await useFetch(baixarDocumento, {
        method: "POST",
        body: {
          bucket: useCookie("user-data").value.cartorio_token,
          path: item.link_ficha
        }
      }, "$LrKAtpxZwH");
      linkFichaPessoa.value = linkUrl.value;
    };
    function removeFormValueFromTable(item) {
      selectedObjects.value = selectedObjects.value.filter(
        (pessoa) => pessoa.token !== item.token
      );
    }
    async function reconhecerAtoAutencidade() {
      if (!state.escrevente) {
        $toast.error("Por favor selecione um Escrevente");
        return;
      }
      try {
        const selectedTokens = selectedObjects.value.map((item) => {
          return { pessoa_token: item.token };
        });
        const { data: data2, error, status } = await useFetch(reconhecerPessoa, {
          method: "POST",
          body: {
            pessoas: selectedTokens,
            cartorio_token: cartorio_token.value,
            ordemserv_token,
            quantidade: state.quantidade,
            usuario_token,
            ato_tipo_token: props.ato_token
          }
        }, "$EE94jKo1pQ");
        if (status.value === "success" && data2.value[0].status === "OK") {
          reconhecerEtiquetaAutencidade(data2.value[0].token);
          goBack();
        } else {
          errorModalVisible.value = true;
          errorMessage.value = ato_token.value.status_mensagem || error.value.data.details;
        }
      } catch (error) {
        errorModalVisible.value = true;
        errorMessage.value = error;
        console.error("Erro na requisi\xE7\xE3o", error);
      }
    }
    async function reconhecerEtiquetaAutencidade(token) {
      try {
        const { data: data2, error, status } = await useFetch(etiquetaAutencidade, {
          method: "POST",
          body: {
            ato_token: token,
            cartorio_token: cartorio_token.value,
            escrevente_token: state.escrevente
          }
        }, "$KyoIzBxZyr");
        if (status.value === "success") {
          if (data2.value[0].tipo_etiqueta === "html") {
            const newWindow = (void 0).open("", "_blank");
            newWindow.document.open();
            newWindow.document.write(data2.value[0].etiqueta);
            newWindow.document.close();
          } else if (data2.value[0].tipo_etiqueta === "zpl") {
            const { status: zplStatus } = await useFetch(`${imprimeZplSelo}`, {
              method: "POST",
              body: {
                zpl: data2.value[0].selo
              }
            }, "$Vem9mHWYqw");
            if (zplStatus.value !== "success") {
              $toast.error("N\xE3o foi possivel fazer a impressao da etiqueta");
              return;
            }
          }
        }
      } catch (error) {
        console.error("Erro na requisi\xE7\xE3o", error);
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
      const _component_ModalRegistroPessoas = _sfc_main$1;
      const _component_ModalFichaCard = _sfc_main$2;
      const _component_ErrorModalCard = _sfc_main$3;
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<!--[-->`);
      _push(ssrRenderComponent(VRow, { class: "mt-5" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VCol, { cols: "5" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VAutocomplete, {
                    label: "Tabeli\xE3o/escrevente",
                    modelValue: unref(state).escrevente,
                    "onUpdate:modelValue": ($event) => unref(state).escrevente = $event,
                    items: unref(escreventesItems),
                    "item-title": "nome",
                    "item-value": "token",
                    required: ""
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VAutocomplete, {
                      label: "Tabeli\xE3o/escrevente",
                      modelValue: unref(state).escrevente,
                      "onUpdate:modelValue": ($event) => unref(state).escrevente = $event,
                      items: unref(escreventesItems),
                      "item-title": "nome",
                      "item-value": "token",
                      required: ""
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(VCol, { cols: "2" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VTextField, {
                    label: "Quantidade",
                    type: "number",
                    modelValue: unref(state).quantidade,
                    "onUpdate:modelValue": ($event) => unref(state).quantidade = $event
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VTextField, {
                      label: "Quantidade",
                      type: "number",
                      modelValue: unref(state).quantidade,
                      "onUpdate:modelValue": ($event) => unref(state).quantidade = $event
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(VCol, { cols: "5" }, {
                default: withCtx(() => [
                  createVNode(VAutocomplete, {
                    label: "Tabeli\xE3o/escrevente",
                    modelValue: unref(state).escrevente,
                    "onUpdate:modelValue": ($event) => unref(state).escrevente = $event,
                    items: unref(escreventesItems),
                    "item-title": "nome",
                    "item-value": "token",
                    required: ""
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                ]),
                _: 1
              }),
              createVNode(VCol, { cols: "2" }, {
                default: withCtx(() => [
                  createVNode(VTextField, {
                    label: "Quantidade",
                    type: "number",
                    modelValue: unref(state).quantidade,
                    "onUpdate:modelValue": ($event) => unref(state).quantidade = $event
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(VRow, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VCol, { cols: "3" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VTextField, {
                    label: "Documento",
                    modelValue: unref(state).documento,
                    "onUpdate:modelValue": ($event) => unref(state).documento = $event
                  }, null, _parent3, _scopeId2));
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
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(VCol, { cols: "4" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VTextField, {
                    label: "Pessoa",
                    modelValue: unref(state).nome,
                    "onUpdate:modelValue": ($event) => unref(state).nome = $event
                  }, null, _parent3, _scopeId2));
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
            }, _parent2, _scopeId));
            _push2(`<div${_scopeId}><img class="btn-pointer mt-1"${ssrRenderAttr("src", _imports_1)} style="${ssrRenderStyle({ "width": "40px", "cursor": "pointer" })}" title="Pesquisar Pessoa"${_scopeId}></div><div${_scopeId}><img class="btn-pointer mt-1 ml-2"${ssrRenderAttr("src", _imports_0)} style="${ssrRenderStyle({ "width": "40px", "cursor": "pointer" })}" title="Criar Pessoa"${_scopeId}></div>`);
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
                  class: "btn-pointer mt-1",
                  src: _imports_1,
                  style: { "width": "40px", "cursor": "pointer" },
                  title: "Pesquisar Pessoa",
                  onClick: searchPessoasService
                })
              ]),
              createVNode("div", null, [
                createVNode("img", {
                  class: "btn-pointer mt-1 ml-2",
                  src: _imports_0,
                  style: { "width": "40px", "cursor": "pointer" },
                  title: "Criar Pessoa",
                  onClick: createPessoa
                })
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(VRow, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VCol, { class: "mr-10" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VDataTable, {
                    style: { "height": "465px" },
                    headers,
                    items: unref(pessoasItems)
                  }, {
                    "item.actions": withCtx(({ item }, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div style="${ssrRenderStyle({ "display": "flex", "cursor": "pointer", "justify-content": "flex-end" })}" title="Visualizar Ficha"${_scopeId3}>`);
                        if (item.link_ficha) {
                          _push4(`<img style="${ssrRenderStyle({ "width": "30px", "height": "30px", "cursor": "pointer" })}"${ssrRenderAttr("src", _imports_1)} alt="Possui Ficha" title="Possui Ficha"${_scopeId3}>`);
                        } else {
                          _push4(`<img style="${ssrRenderStyle({ "width": "30px", "height": "30px", "cursor": "pointer" })}"${ssrRenderAttr("src", _imports_2)} alt="Visualizar" title="N\xE3o Possui Ficha"${_scopeId3}>`);
                        }
                        _push4(`</div>`);
                      } else {
                        return [
                          createVNode("div", {
                            style: { "display": "flex", "cursor": "pointer", "justify-content": "flex-end" },
                            onClick: ($event) => redirectToFicha(item),
                            title: "Visualizar Ficha"
                          }, [
                            item.link_ficha ? (openBlock(), createBlock("img", {
                              key: 0,
                              style: { "width": "30px", "height": "30px", "cursor": "pointer" },
                              src: _imports_1,
                              alt: "Possui Ficha",
                              title: "Possui Ficha"
                            })) : (openBlock(), createBlock("img", {
                              key: 1,
                              style: { "width": "30px", "height": "30px", "cursor": "pointer" },
                              src: _imports_2,
                              alt: "Visualizar",
                              title: "N\xE3o Possui Ficha"
                            }))
                          ], 8, ["onClick"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VDataTable, {
                      style: { "height": "465px" },
                      headers,
                      items: unref(pessoasItems)
                    }, {
                      "item.actions": withCtx(({ item }) => [
                        createVNode("div", {
                          style: { "display": "flex", "cursor": "pointer", "justify-content": "flex-end" },
                          onClick: ($event) => redirectToFicha(item),
                          title: "Visualizar Ficha"
                        }, [
                          item.link_ficha ? (openBlock(), createBlock("img", {
                            key: 0,
                            style: { "width": "30px", "height": "30px", "cursor": "pointer" },
                            src: _imports_1,
                            alt: "Possui Ficha",
                            title: "Possui Ficha"
                          })) : (openBlock(), createBlock("img", {
                            key: 1,
                            style: { "width": "30px", "height": "30px", "cursor": "pointer" },
                            src: _imports_2,
                            alt: "Visualizar",
                            title: "N\xE3o Possui Ficha"
                          }))
                        ], 8, ["onClick"])
                      ]),
                      _: 1
                    }, 8, ["items"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(VCol, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VDataTable, {
                    headers,
                    items: unref(selectedObjects),
                    style: { "height": "465px" },
                    "item-key": "id"
                  }, {
                    "item.actions": withCtx(({ item }, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div style="${ssrRenderStyle({ "display": "flex", "justify-content": "flex-end" })}" title="Remover"${_scopeId3}><img style="${ssrRenderStyle({ "width": "30px", "height": "30px", "cursor": "pointer" })}"${ssrRenderAttr("src", _imports_3)} alt="Remover"${_scopeId3}></div>`);
                      } else {
                        return [
                          createVNode("div", {
                            style: { "display": "flex", "justify-content": "flex-end" },
                            onClick: ($event) => removeFormValueFromTable(item),
                            title: "Remover"
                          }, [
                            createVNode("img", {
                              style: { "width": "30px", "height": "30px", "cursor": "pointer" },
                              src: _imports_3,
                              alt: "Remover"
                            })
                          ], 8, ["onClick"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VDataTable, {
                      headers,
                      items: unref(selectedObjects),
                      style: { "height": "465px" },
                      "item-key": "id"
                    }, {
                      "item.actions": withCtx(({ item }) => [
                        createVNode("div", {
                          style: { "display": "flex", "justify-content": "flex-end" },
                          onClick: ($event) => removeFormValueFromTable(item),
                          title: "Remover"
                        }, [
                          createVNode("img", {
                            style: { "width": "30px", "height": "30px", "cursor": "pointer" },
                            src: _imports_3,
                            alt: "Remover"
                          })
                        ], 8, ["onClick"])
                      ]),
                      _: 1
                    }, 8, ["items"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(VCol, { class: "mr-10" }, {
                default: withCtx(() => [
                  createVNode(VDataTable, {
                    style: { "height": "465px" },
                    headers,
                    items: unref(pessoasItems)
                  }, {
                    "item.actions": withCtx(({ item }) => [
                      createVNode("div", {
                        style: { "display": "flex", "cursor": "pointer", "justify-content": "flex-end" },
                        onClick: ($event) => redirectToFicha(item),
                        title: "Visualizar Ficha"
                      }, [
                        item.link_ficha ? (openBlock(), createBlock("img", {
                          key: 0,
                          style: { "width": "30px", "height": "30px", "cursor": "pointer" },
                          src: _imports_1,
                          alt: "Possui Ficha",
                          title: "Possui Ficha"
                        })) : (openBlock(), createBlock("img", {
                          key: 1,
                          style: { "width": "30px", "height": "30px", "cursor": "pointer" },
                          src: _imports_2,
                          alt: "Visualizar",
                          title: "N\xE3o Possui Ficha"
                        }))
                      ], 8, ["onClick"])
                    ]),
                    _: 1
                  }, 8, ["items"])
                ]),
                _: 1
              }),
              createVNode(VCol, null, {
                default: withCtx(() => [
                  createVNode(VDataTable, {
                    headers,
                    items: unref(selectedObjects),
                    style: { "height": "465px" },
                    "item-key": "id"
                  }, {
                    "item.actions": withCtx(({ item }) => [
                      createVNode("div", {
                        style: { "display": "flex", "justify-content": "flex-end" },
                        onClick: ($event) => removeFormValueFromTable(item),
                        title: "Remover"
                      }, [
                        createVNode("img", {
                          style: { "width": "30px", "height": "30px", "cursor": "pointer" },
                          src: _imports_3,
                          alt: "Remover"
                        })
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
      }, _parent));
      _push(ssrRenderComponent(_component_ModalRegistroPessoas, {
        show: unref(isModalRegistroOpen),
        onClose: ($event) => isModalRegistroOpen.value = false
      }, null, _parent));
      if (unref(isModalFichaOpen)) {
        _push(ssrRenderComponent(_component_ModalFichaCard, {
          show: unref(isModalFichaOpen),
          item: unref(selectedItem),
          "pessoa-obj": unref(selectedItem),
          "link-view": unref(linkFichaPessoa),
          onConfirmar: ($event) => confirmItem(unref(selectedItem)),
          onClose: ($event) => isModalFichaOpen.value = false
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(_component_ErrorModalCard, {
        show: unref(errorModalVisible),
        errorMessage: unref(errorMessage),
        onClose: ($event) => errorModalVisible.value = false
      }, null, _parent));
      _push(ssrRenderComponent(VRow, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
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
            _push2(ssrRenderComponent(VBtn, {
              class: "ml-5",
              onClick: reconhecerAtoAutencidade,
              size: "large",
              color: "green"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Salvar`);
                } else {
                  return [
                    createTextVNode("Salvar")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
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
              }),
              createVNode(VBtn, {
                class: "ml-5",
                onClick: reconhecerAtoAutencidade,
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
      }, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/fontes/atos/reconhecimento/autencidade.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : undefined;
};

export { _sfc_main as default };
//# sourceMappingURL=autencidade-pql7bmZH.mjs.map
