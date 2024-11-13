import { _ as __nuxt_component_0 } from './nuxt-link-DyZc7qn_.mjs';
import { _ as _sfc_main$1 } from './ErrorModalCard-J0BRDYKJ.mjs';
import { _ as _export_sfc, u as useRouter$1, c as useRoute$1, d as useCookie, V as VTextField, b as useRuntimeConfig } from './server.mjs';
import { ref, reactive, withAsyncContext, mergeProps, withCtx, unref, createVNode, useSSRContext } from 'vue';
import { u as useFetch } from './fetch-Dsyde8UD.mjs';
import { ssrRenderComponent, ssrRenderStyle, ssrRenderAttr } from 'vue/server-renderer';
import { _ as _imports_0 } from './sair-CV1ySkp8.mjs';
import { V as VAutocomplete, _ as _imports_1 } from './salvar-DRINGrxl.mjs';
import { useVuelidate } from '@vuelidate/core';
import { helpers, required } from '@vuelidate/validators';
import { a as VCard } from './VCard-DfTYaOUe.mjs';
import { V as VContainer } from './VContainer-chgtNZst.mjs';
import { V as VRow } from './VRow-BuaJrtx0.mjs';
import '../runtime.mjs';
import 'node:http';
import 'node:https';
import 'fs';
import 'path';
import 'node:fs';
import 'node:url';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'devalue';
import '@unhead/ssr';
import 'unhead';
import '@unhead/shared';
import 'vue-router';
import '@ckeditor/ckeditor5-vue';
import 'vue3-toastify';
import 'vue-the-mask';

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
    const allEscreventes = `${config.public.managemant}/listarEscrevente`;
    const cartorio_token = ref(useCookie("user-data").value.cartorio_token).value;
    const ordemserv_token = ref(useCookie("user-service").value.token).value || ref(useCookie("user-service").value).value;
    const usuario_token = useCookie("auth_token").value;
    const autenticaAtos = `${config.public.managemant}/atoAutentica`;
    const autenticaEtiquetas = `${config.public.managemant}/etiquetaAutentica`;
    const errorModalVisible = ref(false);
    const errorMessage = ref("");
    const state = reactive({
      escrevente: null,
      quantidade: 1
    });
    const escreventesItems = ref([]);
    const { data } = ([__temp, __restore] = withAsyncContext(() => useFetch(allEscreventes, {
      method: "POST",
      body: { cartorio_token }
    }, "$nXL9eJBhI7")), __temp = await __temp, __restore(), __temp);
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
        } = await useFetch(autenticaAtos, {
          method: "POST",
          body: {
            usuario_token,
            cartorio_token,
            quantidade: Number(state.quantidade),
            ordemserv_token,
            ato_tipo_token: props.ato_token
          }
        }, "$dpfLzAlO85");
        if (status.value === "success" && ato_token.value.status === "OK") {
          etiquetaAutentica(ato_token.value.token);
        } else {
          errorModalVisible.value = true;
          errorMessage.value = ato_token.value.status_mensagem || error.value.data.details;
        }
      }
    };
    const etiquetaAutentica = async (ato_token) => {
      const { data: data2, status } = await useFetch(autenticaEtiquetas, {
        method: "POST",
        body: {
          escrevente_token: state.escrevente,
          cartorio_token,
          ato_token
        }
      }, "$fPnSl9XMLA");
      if (status.value === "success") {
        goBack();
        const newWindow = (void 0).open("", "_blank");
        newWindow.document.open();
        newWindow.document.write(data2.value.etiqueta);
        newWindow.document.close();
      }
    };
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
      _push(ssrRenderComponent(VCard, mergeProps({
        class: "mt-10",
        title: "Autentica\xE7\xE3o"
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VContainer, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div style="${ssrRenderStyle({ "width": "600px", "margin-top": "10px" })}" data-v-77412078${_scopeId2}>`);
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
                  _push3(`</div><div style="${ssrRenderStyle({ "width": "180px", "margin-top": "20px" })}" data-v-77412078${_scopeId2}>`);
                  _push3(ssrRenderComponent(VTextField, {
                    type: "number",
                    label: "Quantidade",
                    modelValue: unref(state).quantidade,
                    "onUpdate:modelValue": ($event) => unref(state).quantidade = $event
                  }, null, _parent3, _scopeId2));
                  _push3(`</div>`);
                  _push3(ssrRenderComponent(VRow, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div data-v-77412078${_scopeId3}>`);
                        _push4(ssrRenderComponent(_component_NuxtLink, { onClick: goBack }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<img class="btn-pointer mt-10 mb-5"${ssrRenderAttr("src", _imports_0)} alt="Sair" data-v-77412078${_scopeId4}>`);
                            } else {
                              return [
                                createVNode("img", {
                                  class: "btn-pointer mt-10 mb-5",
                                  src: _imports_0,
                                  alt: "Sair"
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`</div><img class="btn-pointer mt-10"${ssrRenderAttr("src", _imports_1)} data-v-77412078${_scopeId3}>`);
                      } else {
                        return [
                          createVNode("div", null, [
                            createVNode(_component_NuxtLink, { onClick: goBack }, {
                              default: withCtx(() => [
                                createVNode("img", {
                                  class: "btn-pointer mt-10 mb-5",
                                  src: _imports_0,
                                  alt: "Sair"
                                })
                              ]),
                              _: 1
                            })
                          ]),
                          createVNode("img", {
                            class: "btn-pointer mt-10",
                            src: _imports_1,
                            onClick: atoAutentica
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
                    createVNode(VRow, null, {
                      default: withCtx(() => [
                        createVNode("div", null, [
                          createVNode(_component_NuxtLink, { onClick: goBack }, {
                            default: withCtx(() => [
                              createVNode("img", {
                                class: "btn-pointer mt-10 mb-5",
                                src: _imports_0,
                                alt: "Sair"
                              })
                            ]),
                            _: 1
                          })
                        ]),
                        createVNode("img", {
                          class: "btn-pointer mt-10",
                          src: _imports_1,
                          onClick: atoAutentica
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
                  createVNode(VRow, null, {
                    default: withCtx(() => [
                      createVNode("div", null, [
                        createVNode(_component_NuxtLink, { onClick: goBack }, {
                          default: withCtx(() => [
                            createVNode("img", {
                              class: "btn-pointer mt-10 mb-5",
                              src: _imports_0,
                              alt: "Sair"
                            })
                          ]),
                          _: 1
                        })
                      ]),
                      createVNode("img", {
                        class: "btn-pointer mt-10",
                        src: _imports_1,
                        onClick: atoAutentica
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
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const autenticacao = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-77412078"]]);

export { autenticacao as default };
//# sourceMappingURL=autenticacao-C2YdNZeO.mjs.map
