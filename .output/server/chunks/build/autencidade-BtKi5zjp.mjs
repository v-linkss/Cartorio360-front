import { _ as _sfc_main$2 } from './RegistroPessoas-CxsNBCBT.mjs';
import { _ as _sfc_main$3 } from './FichaCard-DEXJEoA9.mjs';
import { _ as _sfc_main$4 } from './ErrorModalCard-q6DNMzIg.mjs';
import { ref, reactive, withAsyncContext, withCtx, unref, createVNode, openBlock, createBlock, createTextVNode, useSSRContext, watch, mergeProps, isRef, toDisplayString, withKeys, createCommentVNode } from 'vue';
import { ssrRenderComponent, ssrRenderAttr, ssrRenderStyle, ssrInterpolate } from 'vue/server-renderer';
import { u as useRouter$1, g as useRoute$1, b as useNuxtApp, e as useCookie, f as VTextField, V as VBtn, c as useRuntimeConfig, _ as _export_sfc } from './server.mjs';
import { V as VDialog } from './VDialog-BVe31KMa.mjs';
import { V as VCard, a as VCardText, c as VCardActions } from './VCard-CFn9vmiT.mjs';
import { _ as __nuxt_component_0 } from './nuxt-link-TpvcaGEw.mjs';
import { _ as _imports_1 } from './visualizar-BoZ30DMV.mjs';
import { _ as _imports_0 } from './novo-CWU3oYa5.mjs';
import { _ as _imports_2 } from './visualizar-vermelho-Ly_aKn8Z.mjs';
import { a as _imports_3 } from './excluido-D7FHZla7.mjs';
import { u as useFetch } from './fetch-uf6n1sXR.mjs';
import { V as VRow } from './VRow-Bqz0CuIN.mjs';
import { V as VCol } from './VCol-BT4RzX0Q.mjs';
import { V as VAutocomplete } from './VAutocomplete-BE6_PaUP.mjs';
import { V as VDataTable } from './VDataTable-BsvkD4vs.mjs';
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
import './asyncData-B8plM1p3.mjs';
import './fetchWithToken-CCGIQo0b.mjs';
import './formatDate-DflkuJ_V.mjs';
import './VContainer-CUysD4sO.mjs';
import './filter-C0rfsHC2.mjs';
import './VList-p98P2nQM.mjs';
import './VAvatar-qPSA6PD-.mjs';
import './VImg-BQaOrhxX.mjs';
import './VResponsive-BwPb2GHE.mjs';
import './editar-BcGPsVK2.mjs';
import 'utif';
import './VTabs-GFlkZVhH.mjs';
import 'pinia';
import 'vue-router';
import 'vue3-toastify';
import 'vue-the-mask';

const _sfc_main$1 = {
  __name: "ValidadorAutencidade",
  __ssrInlineRender: true,
  props: {
    show: Boolean
  },
  emits: ["close", "confirm"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const isVisible = ref(props.show);
    const randomNumbers = ref([]);
    const userInput = ref("");
    const errorMessage = ref("");
    function generateRandomNumbers() {
      randomNumbers.value = [];
      for (let i = 0; i < 4; i++) {
        randomNumbers.value.push(Math.floor(Math.random() * 10));
      }
    }
    watch(
      () => props.show,
      (newVal) => {
        isVisible.value = newVal;
        if (newVal) {
          generateRandomNumbers();
          userInput.value = "";
          errorMessage.value = "";
        }
      }
    );
    const closeModal = () => {
      isVisible.value = false;
      emit("close");
    };
    const validateInput = () => {
      if (userInput.value === randomNumbers.value.join("")) {
        errorMessage.value = "";
        isVisible.value = false;
        emit("confirm");
      } else {
        errorMessage.value = "N\xFAmeros digitados incorretos. Tente novamente.";
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(VDialog, mergeProps({
        persistent: "",
        modelValue: unref(isVisible),
        "onUpdate:modelValue": ($event) => isRef(isVisible) ? isVisible.value = $event : null,
        "max-width": "500"
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VCard, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VCardText, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div data-v-c978e7cc${_scopeId3}><p data-v-c978e7cc${_scopeId3}> Digite o c\xF3digo de valida\xE7\xE3o para confirmar o ato de reconhecimento por autenticidade: </p><div class="random-numbers" data-v-c978e7cc${_scopeId3}><span data-v-c978e7cc${_scopeId3}>${ssrInterpolate(unref(randomNumbers).join(" "))}</span></div>`);
                        _push4(ssrRenderComponent(VTextField, {
                          modelValue: unref(userInput),
                          "onUpdate:modelValue": ($event) => isRef(userInput) ? userInput.value = $event : null,
                          label: "Digite os n\xFAmeros",
                          maxlength: "4",
                          outlined: "",
                          dense: "",
                          onKeyup: validateInput
                        }, null, _parent4, _scopeId3));
                        if (unref(errorMessage)) {
                          _push4(`<div class="error-message" data-v-c978e7cc${_scopeId3}>${ssrInterpolate(unref(errorMessage))}</div>`);
                        } else {
                          _push4(`<!---->`);
                        }
                        _push4(`</div>`);
                      } else {
                        return [
                          createVNode("div", null, [
                            createVNode("p", null, " Digite o c\xF3digo de valida\xE7\xE3o para confirmar o ato de reconhecimento por autenticidade: "),
                            createVNode("div", { class: "random-numbers" }, [
                              createVNode("span", null, toDisplayString(unref(randomNumbers).join(" ")), 1)
                            ]),
                            createVNode(VTextField, {
                              modelValue: unref(userInput),
                              "onUpdate:modelValue": ($event) => isRef(userInput) ? userInput.value = $event : null,
                              label: "Digite os n\xFAmeros",
                              maxlength: "4",
                              outlined: "",
                              dense: "",
                              onKeyup: withKeys(validateInput, ["enter"])
                            }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                            unref(errorMessage) ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "error-message"
                            }, toDisplayString(unref(errorMessage)), 1)) : createCommentVNode("", true)
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VCardActions, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VBtn, {
                          style: { "background-color": "red", "color": "white" },
                          onClick: closeModal
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Cancelar`);
                            } else {
                              return [
                                createTextVNode("Cancelar")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VBtn, {
                          style: { "background-color": "green", "color": "white" },
                          onClick: validateInput
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Validar`);
                            } else {
                              return [
                                createTextVNode("Validar")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VBtn, {
                            style: { "background-color": "red", "color": "white" },
                            onClick: closeModal
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Cancelar")
                            ]),
                            _: 1
                          }),
                          createVNode(VBtn, {
                            style: { "background-color": "green", "color": "white" },
                            onClick: validateInput
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Validar")
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
                    createVNode(VCardText, null, {
                      default: withCtx(() => [
                        createVNode("div", null, [
                          createVNode("p", null, " Digite o c\xF3digo de valida\xE7\xE3o para confirmar o ato de reconhecimento por autenticidade: "),
                          createVNode("div", { class: "random-numbers" }, [
                            createVNode("span", null, toDisplayString(unref(randomNumbers).join(" ")), 1)
                          ]),
                          createVNode(VTextField, {
                            modelValue: unref(userInput),
                            "onUpdate:modelValue": ($event) => isRef(userInput) ? userInput.value = $event : null,
                            label: "Digite os n\xFAmeros",
                            maxlength: "4",
                            outlined: "",
                            dense: "",
                            onKeyup: withKeys(validateInput, ["enter"])
                          }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                          unref(errorMessage) ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "error-message"
                          }, toDisplayString(unref(errorMessage)), 1)) : createCommentVNode("", true)
                        ])
                      ]),
                      _: 1
                    }),
                    createVNode(VCardActions, null, {
                      default: withCtx(() => [
                        createVNode(VBtn, {
                          style: { "background-color": "red", "color": "white" },
                          onClick: closeModal
                        }, {
                          default: withCtx(() => [
                            createTextVNode("Cancelar")
                          ]),
                          _: 1
                        }),
                        createVNode(VBtn, {
                          style: { "background-color": "green", "color": "white" },
                          onClick: validateInput
                        }, {
                          default: withCtx(() => [
                            createTextVNode("Validar")
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
              createVNode(VCard, null, {
                default: withCtx(() => [
                  createVNode(VCardText, null, {
                    default: withCtx(() => [
                      createVNode("div", null, [
                        createVNode("p", null, " Digite o c\xF3digo de valida\xE7\xE3o para confirmar o ato de reconhecimento por autenticidade: "),
                        createVNode("div", { class: "random-numbers" }, [
                          createVNode("span", null, toDisplayString(unref(randomNumbers).join(" ")), 1)
                        ]),
                        createVNode(VTextField, {
                          modelValue: unref(userInput),
                          "onUpdate:modelValue": ($event) => isRef(userInput) ? userInput.value = $event : null,
                          label: "Digite os n\xFAmeros",
                          maxlength: "4",
                          outlined: "",
                          dense: "",
                          onKeyup: withKeys(validateInput, ["enter"])
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                        unref(errorMessage) ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "error-message"
                        }, toDisplayString(unref(errorMessage)), 1)) : createCommentVNode("", true)
                      ])
                    ]),
                    _: 1
                  }),
                  createVNode(VCardActions, null, {
                    default: withCtx(() => [
                      createVNode(VBtn, {
                        style: { "background-color": "red", "color": "white" },
                        onClick: closeModal
                      }, {
                        default: withCtx(() => [
                          createTextVNode("Cancelar")
                        ]),
                        _: 1
                      }),
                      createVNode(VBtn, {
                        style: { "background-color": "green", "color": "white" },
                        onClick: validateInput
                      }, {
                        default: withCtx(() => [
                          createTextVNode("Validar")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Modal/ValidadorAutencidade.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : undefined;
};
const __nuxt_component_3 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-c978e7cc"]]);
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
    const isValidadorModalOpen = ref(false);
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
    function onSaveClick() {
      isValidadorModalOpen.value = true;
    }
    function handleValidadorConfirm() {
      isValidadorModalOpen.value = false;
      reconhecerAtoAutencidade();
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
          if (data2.value[0].livro && data2.value[0].livro !== null) {
            console.log("############################ livro valido");
            const newWindow = (void 0).open("", "_blank");
            newWindow.document.open();
            newWindow.document.write(data2.value[0].livro);
            newWindow.document.close();
          }
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
                zpl: atob(data2.value[0].etiqueta)
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
      const _component_ModalRegistroPessoas = _sfc_main$2;
      const _component_ModalFichaCard = _sfc_main$3;
      const _component_ErrorModalCard = _sfc_main$4;
      const _component_ModalValidadorAutencidade = __nuxt_component_3;
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
      _push(ssrRenderComponent(_component_ModalValidadorAutencidade, {
        show: unref(isValidadorModalOpen),
        onClose: ($event) => isValidadorModalOpen.value = false,
        onConfirm: handleValidadorConfirm
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
              onClick: onSaveClick,
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
                onClick: onSaveClick,
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
//# sourceMappingURL=autencidade-BtKi5zjp.mjs.map
