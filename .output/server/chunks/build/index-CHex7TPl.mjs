import { ref, mergeProps, unref, isRef, withCtx, createTextVNode, createVNode, openBlock, createBlock, createCommentVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle } from 'vue/server-renderer';
import { _ as _imports_0, u as useCartoriosStore } from './useCartoriosStore-ON-x27_A.mjs';
import { _ as _export_sfc, u as useRouter$1, b as useNuxtApp, V as VTextField, g as VBtn, aM as VSpacer, c as useRuntimeConfig, f as useCookie } from './server.mjs';
import { f as fetchWithToken } from './fetchWithToken-CwVOm4r7.mjs';
import { V as VImg } from './VAvatar-B9qm7FCz.mjs';
import { a as VDialog, V as VCard } from './VDialog-DQCqNySJ.mjs';
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
import 'pinia';
import 'vue-router';
import 'vue3-toastify';
import 'vue-the-mask';
import './fetch-DHRolmhg.mjs';
import './VResponsive-CX8fRIYg.mjs';

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
    const ShowNoPermissionError = ref(false);
    const showError = ref(false);
    const closeAlert = () => {
      showPasswordError.value = false;
      showEmailError.value = false;
      showError.value = false;
      ShowNoPermissionError.value = false;
      dialog.value = false;
    };
    const config = useRuntimeConfig();
    const listarMenu = `${config.public.auth}/service/gerencia/listarMenu`;
    const auth = config.public.auth;
    const authenticateUser = async () => {
      const { data, status, error } = await fetchWithToken(`${auth}/login`, {
        method: "POST",
        body: {
          senha: loginData.value.senha,
          email: loginData.value.email
        }
      });
      return { data: data == null ? undefined : data.value, status: status == null ? undefined : status.value, error: error == null ? undefined : error.value };
    };
    const setCookies = (userInfo) => {
      const userCookie = useCookie("user-data");
      userCookie.value = JSON.stringify({
        nome: userInfo.nome,
        usuario_id: userInfo.id,
        cartorio_id: userInfo.cartorios[0].cartorio_id,
        cartorio_nome: userInfo.cartorios[0].cartorio_descricao,
        cartorio_token: userInfo.cartorios[0].cartorio_token
      });
      const tokenCookie = useCookie("auth_token");
      tokenCookie.value = userInfo.token;
    };
    const handleErrors = (error) => {
      var _a, _b, _c;
      const errorData = (_c = (_b = (_a = error == null ? undefined : error.data) == null ? undefined : _a[0]) == null ? undefined : _b.func_autentica_acesso_v1) == null ? undefined : _c[0];
      const statusMessage = errorData == null ? undefined : errorData.status_mensagem;
      if (!errorData) {
        showError.value = true;
        return;
      }
      switch (statusMessage) {
        case "Esse email n\xE3o est\xE1 cadastrado no Durabil.":
          showEmailError.value = true;
          break;
        case "Senha inv\xE1lida.":
          showPasswordError.value = true;
          break;
        case "Seu cadastro est\xE1 desativado. Entre em contato com o administrador da conta.":
          ShowNoPermissionError.value = true;
          break;
        default:
          showError.value = true;
          break;
      }
    };
    const login = async () => {
      var _a, _b, _c, _d;
      const { data, status, error } = await authenticateUser();
      if (status === "success") {
        const userInfo = (_d = (_c = (_b = (_a = data == null ? undefined : data[0]) == null ? undefined : _a.func_autentica_acesso_v1) == null ? undefined : _b[0]) == null ? undefined : _c.registro) == null ? undefined : _d[0];
        useCartoriosStore().cartorioInfos = userInfo.cartorios;
        setCookies(userInfo);
        if (userInfo.cartorios.length > 1) {
          router.push({
            path: "/login/tipo-perfil"
          });
          return;
        }
        $toast.success("Login realizado com sucesso!");
        const { data: menuItems, status: statusMenu } = await fetchWithToken(
          listarMenu,
          {
            method: "POST",
            body: { perfil_descricao: userInfo.cartorios[0].perfil_descricao }
          }
        );
        if (statusMenu.value === "success") {
          const menuItemsCookie = useCookie("menu-navbar");
          menuItemsCookie.value = menuItems.value;
          router.push({
            path: "/"
          });
        }
      } else {
        if (status === "error" && (error == null ? undefined : error.statusCode) === 500) {
          showError.value = true;
        } else {
          handleErrors(error);
        }
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "container-main" }, _attrs))} data-v-bbf52909><div class="container-form" data-v-bbf52909>`);
      _push(ssrRenderComponent(VImg, {
        class: "image",
        width: 300,
        height: "230",
        src: _imports_0
      }, null, _parent));
      _push(`<div class="text" data-v-bbf52909>Log in</div>`);
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
            if (unref(ShowNoPermissionError)) {
              _push2(ssrRenderComponent(VCard, { text: "Seu cadastro est\xE1 desativado. Entre em contato com o administrador da conta." }, {
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
              })) : createCommentVNode("", true),
              unref(ShowNoPermissionError) ? (openBlock(), createBlock(VCard, {
                key: 3,
                text: "Seu cadastro est\xE1 desativado. Entre em contato com o administrador da conta."
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
      _push(`<a class="text-decoration-none" rel="noopener noreferrer" style="${ssrRenderStyle({ "color": "#429946" })}" data-v-bbf52909> Esqueceu a senha?</a></div><div class="background-image" data-v-bbf52909></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/login/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : undefined;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-bbf52909"]]);

export { index as default };
//# sourceMappingURL=index-CHex7TPl.mjs.map
