import { _ as __nuxt_component_0 } from './nuxt-link-DyZc7qn_.mjs';
import { _ as _sfc_main$1 } from './ErrorModalCard-J0BRDYKJ.mjs';
import { u as useRouter$1, c as useRoute$1, d as useCookie, V as VTextField, as as VDataTable, b as useRuntimeConfig } from './server.mjs';
import { ref, reactive, withAsyncContext, withCtx, unref, createVNode, isRef, useSSRContext } from 'vue';
import { u as useFetch } from './fetch-Dsyde8UD.mjs';
import { ssrRenderComponent, ssrRenderAttr, ssrRenderStyle } from 'vue/server-renderer';
import { _ as _imports_1 } from './visualizar-CsXww5Hd.mjs';
import { _ as _imports_4 } from './mudarStatus-8RJ9gJOS.mjs';
import { _ as _imports_0 } from './sair-CV1ySkp8.mjs';
import { V as VAutocomplete, _ as _imports_1$1 } from './salvar-DRINGrxl.mjs';
import { useVuelidate } from '@vuelidate/core';
import { helpers, required } from '@vuelidate/validators';
import { V as VRow } from './VRow-BuaJrtx0.mjs';
import { V as VCol } from './VCol-uBIoF0At.mjs';
import '../runtime.mjs';
import 'node:http';
import 'node:https';
import 'fs';
import 'path';
import 'node:fs';
import 'node:url';
import './VCard-DfTYaOUe.mjs';
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
  __name: "semelhanca",
  __ssrInlineRender: true,
  props: {
    ato_token: {
      type: String,
      required: true
    }
  },
  async setup(__props) {
    let __temp, __restore;
    const props = __props;
    const router = useRouter$1();
    const route = useRoute$1();
    const config = useRuntimeConfig();
    const allEscreventes = `${config.public.managemant}/listarEscrevente`;
    const procurarPessoa = `${config.public.managemant}/pesquisarPessoas`;
    const reconhecerPessoa = `${config.public.managemant}/atoReconhecimento`;
    const etiquetaSemelhanca = `${config.public.managemant}/etiquetaReconhecimento`;
    const cartorio_token = ref(useCookie("user-data").value.cartorio_token);
    const ordemserv_token = ref(useCookie("user-service").value.token).value || ref(useCookie("user-service").value).value;
    const usuario_token = useCookie("auth_token").value;
    const pessoasItems = ref([]);
    const selectedPessoasSemelhanca = ref([]);
    const escreventesItems = ref([]);
    const selectedObjects = ref([]);
    const errorModalVisible = ref(false);
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
    const rules = {
      escrevente: {
        required: helpers.withMessage("O campo \xE9 obrigatorio", required)
      }
    };
    const v$ = useVuelidate(rules, state);
    const { data } = ([__temp, __restore] = withAsyncContext(() => useFetch(allEscreventes, {
      method: "POST",
      body: { cartorio_token }
    }, "$iEFsIjdWdW")), __temp = await __temp, __restore(), __temp);
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
        }, "$uzKb8LPV3v");
        if (pessoasData.value.length > 0) {
          pessoasItems.value = pessoasData.value;
        } else {
          pessoasItems.value = [];
        }
      } catch (error) {
        console.error("Erro na requisi\xE7\xE3o", error);
      }
    }
    function updateSelectedPessoas(selectedItems) {
      if (selectedItems.length > 0) {
        selectedObjects.value = selectedItems.map((item) => {
          const [nome, documento, pessoa_token] = item.split("-");
          return {
            nome,
            documento: documento === "null" ? null : documento,
            pessoa_token
          };
        });
      } else {
        console.log("Nenhum item selecionado");
      }
    }
    function removeFormValueFromTable(item) {
      selectedObjects.value = selectedObjects.value.filter(
        (pessoa) => pessoa.pessoa_token !== item.pessoa_token
      );
      selectedPessoasSemelhanca.value = selectedPessoasSemelhanca.value.filter(
        (pessoa) => pessoa !== `${item.nome}-${item.documento}-${item.pessoa_token}`
      );
    }
    async function reconhecerAtoSemelhanca() {
      if (await v$.value.$validate()) {
        const selectedTokens = selectedObjects.value.map((item) => {
          return { pessoa_token: item.pessoa_token };
        });
        try {
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
          }, "$MulQmK1LAp");
          if (status.value === "success" && data2.value[0].status === "OK") {
            reconhecerEtiquetaSemelhanca(data2.value[0].token);
          } else {
            errorModalVisible.value = true;
            errorMessage.value = ato_token.value.status_mensagem || error.value.data.details;
          }
        } catch (error) {
          console.error("Erro na requisi\xE7\xE3o", error);
        }
      }
    }
    async function reconhecerEtiquetaSemelhanca(token) {
      try {
        const { data: data2, error, status } = await useFetch(etiquetaSemelhanca, {
          method: "POST",
          body: {
            ato_token: token,
            cartorio_token: cartorio_token.value,
            escrevente_token: state.escrevente
          }
        }, "$fMGlIlw995");
        if (status.value === "success") {
          const newWindow = (void 0).open("", "_blank");
          newWindow.document.open();
          newWindow.document.write(data2.value[0].etiqueta);
          newWindow.document.close();
        }
      } catch (error) {
        console.error("Erro na requisi\xE7\xE3o", error);
      }
    }
    const goBack = () => {
      const origem = route.query.origem || "criar";
      const id = route.query.id;
      if (origem === "atualizar") {
        router.push(`/ordens-servicos/atualizar/${id}`);
      } else {
        router.push("/ordens-servicos/criar-registro");
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      const _component_ErrorModalCard = _sfc_main$1;
      _push(`<!--[--><h1>Reconhecimento por Semelhan\xE7a</h1>`);
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
                    required: "",
                    "error-messages": unref(v$).escrevente.$errors.map((e) => e.$message),
                    onBlur: unref(v$).escrevente.$touch,
                    onInput: unref(v$).escrevente.$touch
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
                      required: "",
                      "error-messages": unref(v$).escrevente.$errors.map((e) => e.$message),
                      onBlur: unref(v$).escrevente.$touch,
                      onInput: unref(v$).escrevente.$touch
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "items", "error-messages", "onBlur", "onInput"])
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
                    required: "",
                    "error-messages": unref(v$).escrevente.$errors.map((e) => e.$message),
                    onBlur: unref(v$).escrevente.$touch,
                    onInput: unref(v$).escrevente.$touch
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "items", "error-messages", "onBlur", "onInput"])
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
            _push2(`<div${_scopeId}><img class="btn-pointer mt-3"${ssrRenderAttr("src", _imports_1)} style="${ssrRenderStyle({ "width": "40px", "cursor": "pointer" })}"${_scopeId}></div>`);
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
                  class: "btn-pointer mt-3",
                  src: _imports_1,
                  style: { "width": "40px", "cursor": "pointer" },
                  onClick: searchPessoasService
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
                    items: unref(pessoasItems),
                    "show-select": "",
                    modelValue: unref(selectedPessoasSemelhanca),
                    "onUpdate:modelValue": ($event) => isRef(selectedPessoasSemelhanca) ? selectedPessoasSemelhanca.value = $event : null,
                    "item-value": (pessoasItems2) => `${pessoasItems2.nome}-${pessoasItems2.documento}-${pessoasItems2.token}`,
                    onchange: updateSelectedPessoas(unref(selectedPessoasSemelhanca))
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VDataTable, {
                      style: { "height": "465px" },
                      headers,
                      items: unref(pessoasItems),
                      "show-select": "",
                      modelValue: unref(selectedPessoasSemelhanca),
                      "onUpdate:modelValue": ($event) => isRef(selectedPessoasSemelhanca) ? selectedPessoasSemelhanca.value = $event : null,
                      "item-value": (pessoasItems2) => `${pessoasItems2.nome}-${pessoasItems2.documento}-${pessoasItems2.token}`,
                      onchange: updateSelectedPessoas(unref(selectedPessoasSemelhanca))
                    }, null, 8, ["items", "modelValue", "onUpdate:modelValue", "item-value", "onchange"])
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
                        _push4(`<div style="${ssrRenderStyle({ "display": "flex", "justify-content": "flex-end" })}" title="Remover"${_scopeId3}><img style="${ssrRenderStyle({ "width": "30px", "height": "30px", "cursor": "pointer" })}"${ssrRenderAttr("src", _imports_4)} alt="Remover"${_scopeId3}></div>`);
                      } else {
                        return [
                          createVNode("div", {
                            style: { "display": "flex", "justify-content": "flex-end" },
                            onClick: ($event) => removeFormValueFromTable(item),
                            title: "Remover"
                          }, [
                            createVNode("img", {
                              style: { "width": "30px", "height": "30px", "cursor": "pointer" },
                              src: _imports_4,
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
                            src: _imports_4,
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
                    items: unref(pessoasItems),
                    "show-select": "",
                    modelValue: unref(selectedPessoasSemelhanca),
                    "onUpdate:modelValue": ($event) => isRef(selectedPessoasSemelhanca) ? selectedPessoasSemelhanca.value = $event : null,
                    "item-value": (pessoasItems2) => `${pessoasItems2.nome}-${pessoasItems2.documento}-${pessoasItems2.token}`,
                    onchange: updateSelectedPessoas(unref(selectedPessoasSemelhanca))
                  }, null, 8, ["items", "modelValue", "onUpdate:modelValue", "item-value", "onchange"])
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
                          src: _imports_4,
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
      _push(ssrRenderComponent(VRow, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_NuxtLink, { onClick: goBack }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<img class="btn-pointer mt-10 mb-5"${ssrRenderAttr("src", _imports_0)} alt="Sair" style="${ssrRenderStyle({ "cursor": "pointer" })}"${_scopeId2}>`);
                } else {
                  return [
                    createVNode("img", {
                      class: "btn-pointer mt-10 mb-5",
                      src: _imports_0,
                      alt: "Sair",
                      style: { "cursor": "pointer" }
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<div${_scopeId}><img class="mt-10 mb-5 ml-10" style="${ssrRenderStyle({ "cursor": "pointer" })}"${ssrRenderAttr("src", _imports_1$1)}${_scopeId}></div>`);
          } else {
            return [
              createVNode(_component_NuxtLink, { onClick: goBack }, {
                default: withCtx(() => [
                  createVNode("img", {
                    class: "btn-pointer mt-10 mb-5",
                    src: _imports_0,
                    alt: "Sair",
                    style: { "cursor": "pointer" }
                  })
                ]),
                _: 1
              }),
              createVNode("div", null, [
                createVNode("img", {
                  class: "mt-10 mb-5 ml-10",
                  onClick: reconhecerAtoSemelhanca,
                  style: { "cursor": "pointer" },
                  src: _imports_1$1
                })
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_ErrorModalCard, {
        show: unref(errorModalVisible),
        errorMessage: unref(errorMessage),
        onClose: ($event) => errorModalVisible.value = false
      }, null, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/fontes/atos/reconhecimento/semelhanca.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=semelhanca-CGhOD00j.mjs.map
