import { a as buildAssetsURL } from '../routes/renderer.mjs';
import { ref, mergeProps, unref, isRef, withCtx, createTextVNode, createVNode, openBlock, createBlock, createCommentVNode, useSSRContext } from 'vue';
import { _ as _export_sfc, u as useRouter$1, f as useNuxtApp, a2 as VImg, e as VTextField, V as VBtn, as as VSpacer, b as useRuntimeConfig, d as useCookie } from './server.mjs';
import { u as useFetch } from './fetch-Dsyde8UD.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle } from 'vue/server-renderer';
import { V as VDialog, a as VCard } from './VCard-B4PGaBQ9.mjs';
import 'vue-bundle-renderer/runtime';
import '../runtime.mjs';
import 'node:http';
import 'node:https';
import 'fs';
import 'path';
import 'node:fs';
import 'node:url';
import 'devalue';
import '@unhead/ssr';
import 'unhead';
import '@unhead/shared';
import 'vue-router';
import 'vue3-toastify';
import 'vue-the-mask';

const _imports_0 = "" + buildAssetsURL("cartorio_logo.CfnnJMUp.jpeg");
const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const router = useRouter$1();
    const { $toast } = useNuxtApp();
    const loginData = ref({
      senha: "",
      email: ""
    });
    const visible = ref(false);
    const dialog = ref(false);
    const showPasswordError = ref(false);
    const showEmailError = ref(false);
    const showError = ref(false);
    const closeAlert = () => {
      showPasswordError.value = false;
      showEmailError.value = false;
      showError.value = false;
      dialog.value = false;
    };
    const config = useRuntimeConfig();
    const auth = config.public.auth;
    const login = async () => {
      const {
        data: responseData,
        status,
        error
      } = await useFetch(`${auth}/login`, {
        method: "POST",
        body: {
          senha: loginData.value.senha,
          email: loginData.value.email
        }
      }, "$iX10IJN3fa");
      if (status.value === "success") {
        const userInfo = responseData.value[0].func_autentica_acesso_v1[0].registro[0];
        const userCookie = useCookie("user-data");
        userCookie.value = userCookie.value = JSON.stringify({
          nome: userInfo.nome,
          usuario_id: userInfo.id,
          cartorio_id: userInfo.cartorios[0].cartorio_id,
          cartorio_nome: userInfo.cartorios[0].cartorio_descricao,
          cartorio_token: userInfo.cartorios[0].cartorio_token
        });
        $toast.success("Login realizado com sucesso!");
        const tokenAuth = responseData.value[0].func_autentica_acesso_v1[0].registro[0].token;
        const tokenCookie = useCookie("auth_token");
        tokenCookie.value = tokenAuth;
        router.push("/");
      } else {
        if (status.value === "error" && error.value.statusCode === 500) {
          showError.value = true;
        }
        const errorData = error.value.data[0].func_autentica_acesso_v1[0];
        switch (errorData.status_mensagem) {
          case "Esse email n\xE3o est\xE1 cadastrado no Durabil.":
            showEmailError.value = true;
            break;
          case "Senha inv\xE1lida.":
            showPasswordError.value = true;
            break;
          default:
            if (errorData.error === "Erro ao autenticar usu\xE1rio") {
              showError.value = true;
            }
            break;
        }
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "container-main" }, _attrs))} data-v-e009a382><div class="container-form" data-v-e009a382>`);
      _push(ssrRenderComponent(VImg, {
        class: "image",
        width: 300,
        height: "230",
        src: _imports_0
      }, null, _parent));
      _push(`<div class="text" data-v-e009a382>Log in</div>`);
      _push(ssrRenderComponent(VTextField, {
        autofocus: "",
        autocomplete: "email",
        type: "email",
        modelValue: unref(loginData).email,
        "onUpdate:modelValue": ($event) => unref(loginData).email = $event,
        "persistent-hint": "",
        class: "input",
        density: "compact",
        placeholder: "Email",
        "prepend-inner-icon": "mdi-email-outline",
        variant: "outlined"
      }, null, _parent));
      _push(ssrRenderComponent(VTextField, {
        modelValue: unref(loginData).senha,
        "onUpdate:modelValue": ($event) => unref(loginData).senha = $event,
        class: "input",
        "append-inner-icon": unref(visible) ? "mdi-eye-off" : "mdi-eye",
        type: unref(visible) ? "text" : "password",
        density: "compact",
        placeholder: "Senha",
        "prepend-inner-icon": "mdi-lock-outline",
        variant: "outlined",
        "onClick:appendInner": ($event) => visible.value = !unref(visible)
      }, null, _parent));
      _push(ssrRenderComponent(VDialog, {
        modelValue: unref(dialog),
        "onUpdate:modelValue": ($event) => isRef(dialog) ? dialog.value = $event : null,
        "max-width": "400",
        persistent: ""
      }, {
        activator: withCtx(({ props: activatorProps }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VBtn, mergeProps({
              block: "",
              rounded: "",
              class: "button mb-10 mt-4"
            }, activatorProps, {
              onClick: login,
              modelValue: unref(dialog),
              "onUpdate:modelValue": ($event) => isRef(dialog) ? dialog.value = $event : null
            }), {
              default: withCtx((_, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Acessar `);
                } else {
                  return [
                    createTextVNode(" Acessar ")
                  ];
                }
              }),
              _: 2
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(VBtn, mergeProps({
                block: "",
                rounded: "",
                class: "button mb-10 mt-4"
              }, activatorProps, {
                onClick: login,
                modelValue: unref(dialog),
                "onUpdate:modelValue": ($event) => isRef(dialog) ? dialog.value = $event : null
              }), {
                default: withCtx(() => [
                  createTextVNode(" Acessar ")
                ]),
                _: 2
              }, 1040, ["modelValue", "onUpdate:modelValue"])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (unref(showPasswordError)) {
              _push2(ssrRenderComponent(VCard, { text: "Senha inv\xE1lida." }, {
                actions: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(VSpacer, null, null, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(VBtn, {
                      onClick: closeAlert,
                      style: { "background-color": "#429946", "color": "white" }
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(` OK `);
                        } else {
                          return [
                            createTextVNode(" OK ")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(VSpacer),
                      createVNode(VBtn, {
                        onClick: closeAlert,
                        style: { "background-color": "#429946", "color": "white" }
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" OK ")
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
            if (unref(showEmailError)) {
              _push2(ssrRenderComponent(VCard, { text: "Esse email n\xE3o est\xE1 cadastrado." }, {
                actions: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(VSpacer, null, null, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(VBtn, {
                      onClick: closeAlert,
                      style: { "background-color": "#429946", "color": "white" }
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(` OK `);
                        } else {
                          return [
                            createTextVNode(" OK ")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(VSpacer),
                      createVNode(VBtn, {
                        onClick: closeAlert,
                        style: { "background-color": "#429946", "color": "white" }
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" OK ")
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
            if (unref(showError)) {
              _push2(ssrRenderComponent(VCard, { text: "Erro no sistema, fora do ar." }, {
                actions: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(VSpacer, null, null, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(VBtn, {
                      onClick: closeAlert,
                      style: { "background-color": "#429946", "color": "white" }
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(` OK `);
                        } else {
                          return [
                            createTextVNode(" OK ")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(VSpacer),
                      createVNode(VBtn, {
                        onClick: closeAlert,
                        style: { "background-color": "#429946", "color": "white" }
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" OK ")
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
          } else {
            return [
              unref(showPasswordError) ? (openBlock(), createBlock(VCard, {
                key: 0,
                text: "Senha inv\xE1lida."
              }, {
                actions: withCtx(() => [
                  createVNode(VSpacer),
                  createVNode(VBtn, {
                    onClick: closeAlert,
                    style: { "background-color": "#429946", "color": "white" }
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" OK ")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              })) : createCommentVNode("", true),
              unref(showEmailError) ? (openBlock(), createBlock(VCard, {
                key: 1,
                text: "Esse email n\xE3o est\xE1 cadastrado."
              }, {
                actions: withCtx(() => [
                  createVNode(VSpacer),
                  createVNode(VBtn, {
                    onClick: closeAlert,
                    style: { "background-color": "#429946", "color": "white" }
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" OK ")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              })) : createCommentVNode("", true),
              unref(showError) ? (openBlock(), createBlock(VCard, {
                key: 2,
                text: "Erro no sistema, fora do ar."
              }, {
                actions: withCtx(() => [
                  createVNode(VSpacer),
                  createVNode(VBtn, {
                    onClick: closeAlert,
                    style: { "background-color": "#429946", "color": "white" }
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" OK ")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              })) : createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<a class="text-decoration-none" rel="noopener noreferrer" style="${ssrRenderStyle({ "color": "#429946" })}" data-v-e009a382> Esqueceu a senha?</a></div><div class="background-image" data-v-e009a382></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/login/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-e009a382"]]);

export { index as default };
//# sourceMappingURL=index-CkwYIq42.mjs.map
