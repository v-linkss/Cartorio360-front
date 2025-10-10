import { _ as __nuxt_component_0 } from './nuxt-link-TpvcaGEw.mjs';
import { _ as _sfc_main$1 } from './ErrorModalCard-BjuJgtQ6.mjs';
import { ref, reactive, withAsyncContext, mergeProps, withCtx, unref, createTextVNode, createVNode, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderStyle } from 'vue/server-renderer';
import { useVuelidate } from '@vuelidate/core';
import { helpers, required } from '@vuelidate/validators';
import { _ as _export_sfc, u as useRouter$1, g as useRoute$1, e as useCookie, f as VTextField, V as VBtn, c as useRuntimeConfig } from './server.mjs';
import { f as fetchWithToken } from './fetchWithToken-CCGIQo0b.mjs';
import { u as useFetch } from './fetch-uf6n1sXR.mjs';
import { V as VCard } from './VCard-Dbn6yWsi.mjs';
import { V as VContainer } from './VContainer-CUysD4sO.mjs';
import { V as VAutocomplete } from './VAutocomplete-B9VRQqKl.mjs';
import { V as VRow } from './VRow-Bqz0CuIN.mjs';
import '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:fs';
import 'node:url';
import 'node:path';
import './VDialog-BVe31KMa.mjs';
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
import './VAvatar-CfQAG9re.mjs';
import './VImg-CtUi4yCS.mjs';
import './VResponsive-BwPb2GHE.mjs';
import './filter-BaqCkjdl.mjs';
import './VList-w5fWkTAt.mjs';
import './VDivider-BxKHtM2e.mjs';
import './VSelectionControl-DI6QefPE.mjs';

const _sfc_main = {
  __name: "autenticacao",
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
    const allEscreventes = `${config.public.auth}/service/gerencia/listarEscrevente`;
    const cartorio_token = ref(useCookie("user-data").value.cartorio_token).value;
    const ordemserv_token = ref(useCookie("user-service").value.token).value || ref(useCookie("user-service").value).value;
    const usuario_token = useCookie("auth_token").value;
    const autenticaAtos = `${config.public.auth}/service/gerencia/atoAutentica`;
    const autenticaEtiquetas = `${config.public.auth}/service/gerencia/etiquetaAutentica`;
    const imprimeZplSelo = `${config.public.envioDoc}/print`;
    const errorModalVisible = ref(false);
    const errorMessage = ref("");
    const state = reactive({
      escrevente: null,
      quantidade: 1
    });
    const escreventesItems = ref([]);
    const { data } = ([__temp, __restore] = withAsyncContext(() => fetchWithToken(allEscreventes, {
      method: "POST",
      body: { cartorio_token }
    })), __temp = await __temp, __restore(), __temp);
    escreventesItems.value = data.value[0].func_json_escreventes;
    const rules = {
      escrevente: {
        required: helpers.withMessage("O campo \xE9 obrigatorio", required)
      }
    };
    const v$ = useVuelidate(rules, state);
    const atoAutentica = async () => {
      if (await v$.value.$validate()) {
        const {
          data: ato_token,
          status,
          error
        } = await fetchWithToken(autenticaAtos, {
          method: "POST",
          body: {
            usuario_token,
            cartorio_token,
            quantidade: Number(state.quantidade),
            ordemserv_token,
            ato_tipo_token: props.ato_token
          }
        });
        if (status.value === "success" && ato_token.value.status === "OK") {
          etiquetaAutentica(ato_token.value.token);
        } else {
          errorModalVisible.value = true;
          errorMessage.value = ato_token.value.status_mensagem || error.value.data.details;
        }
      }
    };
    const etiquetaAutentica = async (ato_token) => {
      const { data: data2, status } = await fetchWithToken(autenticaEtiquetas, {
        method: "POST",
        body: {
          escrevente_token: state.escrevente,
          cartorio_token,
          ato_token
        }
      });
      if (status.value === "success") {
        if (data2.value.tipo_etiqueta === "html") {
          const newWindow = (undefined).open("", "_blank");
          newWindow.document.open();
          newWindow.document.write(data2.value.etiqueta);
          newWindow.document.close();
        } else if (data2.value.tipo_etiqueta === "zpl") {
          const { status: zplStatus } = await useFetch(`${imprimeZplSelo}`, {
            method: "POST",
            body: {
              zpl: atob(data2.value.etiqueta)
            }
          }, "$nXL9eJBhI7");
          if (zplStatus.value !== "success") {
            $toast.error("N\xE3o foi possivel fazer a impressao da etiqueta");
            return;
          }
        }
        goBack();
      }
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
      const _component_NuxtLink = __nuxt_component_0;
      const _component_ErrorModalCard = _sfc_main$1;
      _push(ssrRenderComponent(VCard, mergeProps({ class: "mt-10" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VContainer, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div style="${ssrRenderStyle({ "width": "600px", "margin-top": "10px" })}" data-v-2546cd23${_scopeId2}>`);
                  _push3(ssrRenderComponent(VAutocomplete, {
                    label: "Tabeli\xE3o/escriv\xE3o",
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
                  _push3(`</div><div style="${ssrRenderStyle({ "width": "180px", "margin-top": "20px" })}" data-v-2546cd23${_scopeId2}>`);
                  _push3(ssrRenderComponent(VTextField, {
                    type: "number",
                    label: "Quantidade",
                    modelValue: unref(state).quantidade,
                    "onUpdate:modelValue": ($event) => unref(state).quantidade = $event
                  }, null, _parent3, _scopeId2));
                  _push3(`</div>`);
                  _push3(ssrRenderComponent(VRow, { class: "mb-3 mt-2" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_NuxtLink, { onClick: goBack }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VBtn, {
                                class: "ml-4",
                                size: "large",
                                color: "red"
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
                            } else {
                              return [
                                createVNode(VBtn, {
                                  class: "ml-4",
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
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VBtn, {
                          class: "ml-4",
                          size: "large",
                          color: "green",
                          onClick: atoAutentica
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Salvar`);
                            } else {
                              return [
                                createTextVNode("Salvar")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_NuxtLink, { onClick: goBack }, {
                            default: withCtx(() => [
                              createVNode(VBtn, {
                                class: "ml-4",
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
                            class: "ml-4",
                            size: "large",
                            color: "green",
                            onClick: atoAutentica
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
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode("div", { style: { "width": "600px", "margin-top": "10px" } }, [
                      createVNode(VAutocomplete, {
                        label: "Tabeli\xE3o/escriv\xE3o",
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
                    createVNode("div", { style: { "width": "180px", "margin-top": "20px" } }, [
                      createVNode(VTextField, {
                        type: "number",
                        label: "Quantidade",
                        modelValue: unref(state).quantidade,
                        "onUpdate:modelValue": ($event) => unref(state).quantidade = $event
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    createVNode(VRow, { class: "mb-3 mt-2" }, {
                      default: withCtx(() => [
                        createVNode(_component_NuxtLink, { onClick: goBack }, {
                          default: withCtx(() => [
                            createVNode(VBtn, {
                              class: "ml-4",
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
                          class: "ml-4",
                          size: "large",
                          color: "green",
                          onClick: atoAutentica
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
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_ErrorModalCard, {
              show: unref(errorModalVisible),
              errorMessage: unref(errorMessage),
              onClose: ($event) => errorModalVisible.value = false
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(VContainer, null, {
                default: withCtx(() => [
                  createVNode("div", { style: { "width": "600px", "margin-top": "10px" } }, [
                    createVNode(VAutocomplete, {
                      label: "Tabeli\xE3o/escriv\xE3o",
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
                  createVNode("div", { style: { "width": "180px", "margin-top": "20px" } }, [
                    createVNode(VTextField, {
                      type: "number",
                      label: "Quantidade",
                      modelValue: unref(state).quantidade,
                      "onUpdate:modelValue": ($event) => unref(state).quantidade = $event
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  createVNode(VRow, { class: "mb-3 mt-2" }, {
                    default: withCtx(() => [
                      createVNode(_component_NuxtLink, { onClick: goBack }, {
                        default: withCtx(() => [
                          createVNode(VBtn, {
                            class: "ml-4",
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
                        class: "ml-4",
                        size: "large",
                        color: "green",
                        onClick: atoAutentica
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
              }),
              createVNode(_component_ErrorModalCard, {
                show: unref(errorModalVisible),
                errorMessage: unref(errorMessage),
                onClose: ($event) => errorModalVisible.value = false
              }, null, 8, ["show", "errorMessage", "onClose"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/fontes/atos/autenticacao/autenticacao.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : undefined;
};
const autenticacao = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-2546cd23"]]);

export { autenticacao as default };
//# sourceMappingURL=autenticacao-CVxNTpYl.mjs.map
