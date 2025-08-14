import { ref, resolveComponent, mergeProps, withCtx, createVNode, unref, isRef, createTextVNode, openBlock, createBlock, createCommentVNode, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderStyle } from 'vue/server-renderer';
import { _ as _imports_0, a as _imports_1, u as useCartoriosStore } from './useCartoriosStore-CnwuVEsH.mjs';
import { _ as _export_sfc, u as useRouter$1, b as useNuxtApp, V as VTextField, g as VBtn, b2 as VSpacer, c as useRuntimeConfig, e as useCookie } from './server.mjs';
import { f as fetchWithToken } from './fetchWithToken-Cjtduyn0.mjs';
import { u as useFetch } from './fetch-DOsfzFYE.mjs';
import { V as VRow } from './VRow-Bqz0CuIN.mjs';
import { V as VCol } from './VCol-BT4RzX0Q.mjs';
import { V as VContainer } from './VContainer-CUysD4sO.mjs';
import { V as VImg } from './VImg-B_WSu49B.mjs';
import { V as VDialog } from './VDialog-BVe31KMa.mjs';
import { V as VCard, a as VCardTitle, b as VCardText, c as VCardActions } from './VCard-GijVrXxT.mjs';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:fs';
import 'node:path';
import 'node:url';
import 'devalue';
import '@unhead/ssr';
import 'unhead';
import '@unhead/shared';
import 'pinia';
import 'vue-router';
import 'vue3-toastify';
import 'vue-the-mask';
import './asyncData-B13qrLU7.mjs';
import './VResponsive-BwPb2GHE.mjs';
import './VAvatar-_YaAqbOM.mjs';

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
    const showRecoverDialog = ref(false);
    const recoveryEmail = ref("");
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
    const managemant = config.public.managemant;
    ref("");
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
        useCartoriosStore().cartorioInfos = userInfo;
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
            body: { usuario_id: userInfo.id, perfil_descricao: userInfo.cartorios[0].perfil_descricao }
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
    const enviarCodigo = async () => {
      var _a, _b, _c, _d, _e;
      const { data, status, error } = await useFetch(`${managemant}/recupera_senha`, {
        method: "POST",
        body: {
          email: recoveryEmail.value,
          acao: "gerar"
        }
      }, "$iX10IJN3fa");
      if (status.value === "success") {
        $toast.success(data.value.status_mensagem || "C\xF3digo enviado");
        recoveryEmailCookie.value = recoveryEmail.value;
        showRecoverDialog.value = false;
      } else {
        $toast.error(((_c = (_b = (_a = error.value) == null ? undefined : _a.data) == null ? undefined : _b.menssage) == null ? undefined : _c.details) || ((_e = (_d = error.value) == null ? undefined : _d.data) == null ? undefined : _e.status_mensagem));
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_center = resolveComponent("center");
      _push(ssrRenderComponent(VRow, mergeProps({ style: { "background-color": "#0a063b" } }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VCol, {
              cols: "5",
              class: "d-flex align-center justify-center"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VContainer, { style: { "max-width": "650px" } }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_center, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VImg, {
                                style: { "margin-bottom": "30px" },
                                width: 400,
                                height: 330,
                                src: _imports_0
                              }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(VImg, {
                                  style: { "margin-bottom": "30px" },
                                  width: 400,
                                  height: 330,
                                  src: _imports_0
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`<div class="text" data-v-a21420b1${_scopeId3}>Login</div>`);
                        _push4(ssrRenderComponent(VTextField, {
                          autofocus: "",
                          autocomplete: "email",
                          type: "email",
                          modelValue: unref(loginData).email,
                          "onUpdate:modelValue": ($event) => unref(loginData).email = $event,
                          "persistent-hint": "",
                          class: "input mb-5",
                          style: { "background-color": "aliceblue" },
                          "hide-details": "",
                          density: "compact",
                          placeholder: "Email",
                          "prepend-inner-icon": "mdi-email-outline",
                          variant: "outlined"
                        }, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VTextField, {
                          modelValue: unref(loginData).senha,
                          "onUpdate:modelValue": ($event) => unref(loginData).senha = $event,
                          class: "input",
                          "append-inner-icon": unref(visible) ? "mdi-eye-off" : "mdi-eye",
                          type: unref(visible) ? "text" : "password",
                          density: "compact",
                          style: { "background-color": "aliceblue" },
                          "hide-details": "",
                          placeholder: "Senha",
                          "prepend-inner-icon": "mdi-lock-outline",
                          variant: "outlined",
                          "onClick:appendInner": ($event) => visible.value = !unref(visible)
                        }, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VDialog, {
                          modelValue: unref(dialog),
                          "onUpdate:modelValue": ($event) => isRef(dialog) ? dialog.value = $event : null,
                          "max-width": "400",
                          persistent: ""
                        }, {
                          activator: withCtx(({ props: activatorProps }, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VBtn, mergeProps({
                                rounded: "",
                                class: "mb-10 mt-4 ml-1"
                              }, activatorProps, {
                                color: "primary",
                                onClick: login,
                                modelValue: unref(dialog),
                                "onUpdate:modelValue": ($event) => isRef(dialog) ? dialog.value = $event : null,
                                block: ""
                              }), {
                                default: withCtx((_4, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(` Acessar `);
                                  } else {
                                    return [
                                      createTextVNode(" Acessar ")
                                    ];
                                  }
                                }),
                                _: 2
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(VBtn, mergeProps({
                                  rounded: "",
                                  class: "mb-10 mt-4 ml-1"
                                }, activatorProps, {
                                  color: "primary",
                                  onClick: login,
                                  modelValue: unref(dialog),
                                  "onUpdate:modelValue": ($event) => isRef(dialog) ? dialog.value = $event : null,
                                  block: ""
                                }), {
                                  default: withCtx(() => [
                                    createTextVNode(" Acessar ")
                                  ]),
                                  _: 2
                                }, 1040, ["modelValue", "onUpdate:modelValue"])
                              ];
                            }
                          }),
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              if (unref(showPasswordError)) {
                                _push5(ssrRenderComponent(VCard, { text: "Senha inv\xE1lida." }, {
                                  actions: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(ssrRenderComponent(VSpacer, null, null, _parent6, _scopeId5));
                                      _push6(ssrRenderComponent(VBtn, {
                                        onClick: closeAlert,
                                        style: { "background-color": "#429946", "color": "white" }
                                      }, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(` OK `);
                                          } else {
                                            return [
                                              createTextVNode(" OK ")
                                            ];
                                          }
                                        }),
                                        _: 1
                                      }, _parent6, _scopeId5));
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
                                }, _parent5, _scopeId4));
                              } else {
                                _push5(`<!---->`);
                              }
                              if (unref(showEmailError)) {
                                _push5(ssrRenderComponent(VCard, { text: "Esse email n\xE3o est\xE1 cadastrado." }, {
                                  actions: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(ssrRenderComponent(VSpacer, null, null, _parent6, _scopeId5));
                                      _push6(ssrRenderComponent(VBtn, {
                                        onClick: closeAlert,
                                        style: { "background-color": "#429946", "color": "white" }
                                      }, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(` OK `);
                                          } else {
                                            return [
                                              createTextVNode(" OK ")
                                            ];
                                          }
                                        }),
                                        _: 1
                                      }, _parent6, _scopeId5));
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
                                }, _parent5, _scopeId4));
                              } else {
                                _push5(`<!---->`);
                              }
                              if (unref(showError)) {
                                _push5(ssrRenderComponent(VCard, { text: "Erro no sistema, fora do ar." }, {
                                  actions: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(ssrRenderComponent(VSpacer, null, null, _parent6, _scopeId5));
                                      _push6(ssrRenderComponent(VBtn, {
                                        onClick: closeAlert,
                                        style: { "background-color": "#429946", "color": "white" }
                                      }, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(` OK `);
                                          } else {
                                            return [
                                              createTextVNode(" OK ")
                                            ];
                                          }
                                        }),
                                        _: 1
                                      }, _parent6, _scopeId5));
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
                                }, _parent5, _scopeId4));
                              } else {
                                _push5(`<!---->`);
                              }
                              if (unref(ShowNoPermissionError)) {
                                _push5(ssrRenderComponent(VCard, { text: "Seu cadastro est\xE1 desativado. Entre em contato com o administrador da conta." }, {
                                  actions: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(ssrRenderComponent(VSpacer, null, null, _parent6, _scopeId5));
                                      _push6(ssrRenderComponent(VBtn, {
                                        onClick: closeAlert,
                                        style: { "background-color": "#429946", "color": "white" }
                                      }, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(` OK `);
                                          } else {
                                            return [
                                              createTextVNode(" OK ")
                                            ];
                                          }
                                        }),
                                        _: 1
                                      }, _parent6, _scopeId5));
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
                                }, _parent5, _scopeId4));
                              } else {
                                _push5(`<!---->`);
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
                        }, _parent4, _scopeId3));
                        _push4(`<div data-v-a21420b1${_scopeId3}><a class="text-decoration-none" rel="noopener noreferrer" style="${ssrRenderStyle({ "color": "white", "margin-left": "10px", "cursor": "pointer" })}" data-v-a21420b1${_scopeId3}> Esqueceu a senha? </a></div>`);
                      } else {
                        return [
                          createVNode(_component_center, null, {
                            default: withCtx(() => [
                              createVNode(VImg, {
                                style: { "margin-bottom": "30px" },
                                width: 400,
                                height: 330,
                                src: _imports_0
                              })
                            ]),
                            _: 1
                          }),
                          createVNode("div", { class: "text" }, "Login"),
                          createVNode(VTextField, {
                            autofocus: "",
                            autocomplete: "email",
                            type: "email",
                            modelValue: unref(loginData).email,
                            "onUpdate:modelValue": ($event) => unref(loginData).email = $event,
                            "persistent-hint": "",
                            class: "input mb-5",
                            style: { "background-color": "aliceblue" },
                            "hide-details": "",
                            density: "compact",
                            placeholder: "Email",
                            "prepend-inner-icon": "mdi-email-outline",
                            variant: "outlined"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                          createVNode(VTextField, {
                            modelValue: unref(loginData).senha,
                            "onUpdate:modelValue": ($event) => unref(loginData).senha = $event,
                            class: "input",
                            "append-inner-icon": unref(visible) ? "mdi-eye-off" : "mdi-eye",
                            type: unref(visible) ? "text" : "password",
                            density: "compact",
                            style: { "background-color": "aliceblue" },
                            "hide-details": "",
                            placeholder: "Senha",
                            "prepend-inner-icon": "mdi-lock-outline",
                            variant: "outlined",
                            "onClick:appendInner": ($event) => visible.value = !unref(visible)
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "append-inner-icon", "type", "onClick:appendInner"]),
                          createVNode(VDialog, {
                            modelValue: unref(dialog),
                            "onUpdate:modelValue": ($event) => isRef(dialog) ? dialog.value = $event : null,
                            "max-width": "400",
                            persistent: ""
                          }, {
                            activator: withCtx(({ props: activatorProps }) => [
                              createVNode(VBtn, mergeProps({
                                rounded: "",
                                class: "mb-10 mt-4 ml-1"
                              }, activatorProps, {
                                color: "primary",
                                onClick: login,
                                modelValue: unref(dialog),
                                "onUpdate:modelValue": ($event) => isRef(dialog) ? dialog.value = $event : null,
                                block: ""
                              }), {
                                default: withCtx(() => [
                                  createTextVNode(" Acessar ")
                                ]),
                                _: 2
                              }, 1040, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            default: withCtx(() => [
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
                            ]),
                            _: 1
                          }, 8, ["modelValue", "onUpdate:modelValue"]),
                          createVNode("div", null, [
                            createVNode("a", {
                              class: "text-decoration-none",
                              rel: "noopener noreferrer",
                              style: { "color": "white", "margin-left": "10px", "cursor": "pointer" },
                              onClick: ($event) => showRecoverDialog.value = true
                            }, " Esqueceu a senha? ", 8, ["onClick"])
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VContainer, { style: { "max-width": "650px" } }, {
                      default: withCtx(() => [
                        createVNode(_component_center, null, {
                          default: withCtx(() => [
                            createVNode(VImg, {
                              style: { "margin-bottom": "30px" },
                              width: 400,
                              height: 330,
                              src: _imports_0
                            })
                          ]),
                          _: 1
                        }),
                        createVNode("div", { class: "text" }, "Login"),
                        createVNode(VTextField, {
                          autofocus: "",
                          autocomplete: "email",
                          type: "email",
                          modelValue: unref(loginData).email,
                          "onUpdate:modelValue": ($event) => unref(loginData).email = $event,
                          "persistent-hint": "",
                          class: "input mb-5",
                          style: { "background-color": "aliceblue" },
                          "hide-details": "",
                          density: "compact",
                          placeholder: "Email",
                          "prepend-inner-icon": "mdi-email-outline",
                          variant: "outlined"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                        createVNode(VTextField, {
                          modelValue: unref(loginData).senha,
                          "onUpdate:modelValue": ($event) => unref(loginData).senha = $event,
                          class: "input",
                          "append-inner-icon": unref(visible) ? "mdi-eye-off" : "mdi-eye",
                          type: unref(visible) ? "text" : "password",
                          density: "compact",
                          style: { "background-color": "aliceblue" },
                          "hide-details": "",
                          placeholder: "Senha",
                          "prepend-inner-icon": "mdi-lock-outline",
                          variant: "outlined",
                          "onClick:appendInner": ($event) => visible.value = !unref(visible)
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "append-inner-icon", "type", "onClick:appendInner"]),
                        createVNode(VDialog, {
                          modelValue: unref(dialog),
                          "onUpdate:modelValue": ($event) => isRef(dialog) ? dialog.value = $event : null,
                          "max-width": "400",
                          persistent: ""
                        }, {
                          activator: withCtx(({ props: activatorProps }) => [
                            createVNode(VBtn, mergeProps({
                              rounded: "",
                              class: "mb-10 mt-4 ml-1"
                            }, activatorProps, {
                              color: "primary",
                              onClick: login,
                              modelValue: unref(dialog),
                              "onUpdate:modelValue": ($event) => isRef(dialog) ? dialog.value = $event : null,
                              block: ""
                            }), {
                              default: withCtx(() => [
                                createTextVNode(" Acessar ")
                              ]),
                              _: 2
                            }, 1040, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          default: withCtx(() => [
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
                          ]),
                          _: 1
                        }, 8, ["modelValue", "onUpdate:modelValue"]),
                        createVNode("div", null, [
                          createVNode("a", {
                            class: "text-decoration-none",
                            rel: "noopener noreferrer",
                            style: { "color": "white", "margin-left": "10px", "cursor": "pointer" },
                            onClick: ($event) => showRecoverDialog.value = true
                          }, " Esqueceu a senha? ", 8, ["onClick"])
                        ])
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(VImg, {
              src: _imports_1,
              cover: ""
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(VDialog, {
              modelValue: unref(showRecoverDialog),
              "onUpdate:modelValue": ($event) => isRef(showRecoverDialog) ? showRecoverDialog.value = $event : null,
              "max-width": "500"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VCard, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VCardTitle, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Recuperar senha`);
                            } else {
                              return [
                                createTextVNode("Recuperar senha")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VCardText, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(` &#39; `);
                              _push5(ssrRenderComponent(VTextField, {
                                modelValue: unref(recoveryEmail),
                                "onUpdate:modelValue": ($event) => isRef(recoveryEmail) ? recoveryEmail.value = $event : null,
                                type: "email",
                                label: "Digite seu email",
                                "prepend-inner-icon": "mdi-email-outline"
                              }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createTextVNode(" ' "),
                                createVNode(VTextField, {
                                  modelValue: unref(recoveryEmail),
                                  "onUpdate:modelValue": ($event) => isRef(recoveryEmail) ? recoveryEmail.value = $event : null,
                                  type: "email",
                                  label: "Digite seu email",
                                  "prepend-inner-icon": "mdi-email-outline"
                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`&#39; `);
                        _push4(ssrRenderComponent(VCardActions, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VSpacer, null, null, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(VBtn, {
                                class: "bg-green text-white",
                                onClick: ($event) => enviarCodigo()
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(` Enviar `);
                                  } else {
                                    return [
                                      createTextVNode(" Enviar ")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(VBtn, {
                                class: "bg-red text-white",
                                onClick: ($event) => showRecoverDialog.value = false
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(` Cancelar `);
                                  } else {
                                    return [
                                      createTextVNode(" Cancelar ")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(VSpacer),
                                createVNode(VBtn, {
                                  class: "bg-green text-white",
                                  onClick: ($event) => enviarCodigo()
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(" Enviar ")
                                  ]),
                                  _: 1
                                }, 8, ["onClick"]),
                                createVNode(VBtn, {
                                  class: "bg-red text-white",
                                  onClick: ($event) => showRecoverDialog.value = false
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(" Cancelar ")
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
                          createVNode(VCardTitle, null, {
                            default: withCtx(() => [
                              createTextVNode("Recuperar senha")
                            ]),
                            _: 1
                          }),
                          createVNode(VCardText, null, {
                            default: withCtx(() => [
                              createTextVNode(" ' "),
                              createVNode(VTextField, {
                                modelValue: unref(recoveryEmail),
                                "onUpdate:modelValue": ($event) => isRef(recoveryEmail) ? recoveryEmail.value = $event : null,
                                type: "email",
                                label: "Digite seu email",
                                "prepend-inner-icon": "mdi-email-outline"
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            _: 1
                          }),
                          createTextVNode("' "),
                          createVNode(VCardActions, null, {
                            default: withCtx(() => [
                              createVNode(VSpacer),
                              createVNode(VBtn, {
                                class: "bg-green text-white",
                                onClick: ($event) => enviarCodigo()
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(" Enviar ")
                                ]),
                                _: 1
                              }, 8, ["onClick"]),
                              createVNode(VBtn, {
                                class: "bg-red text-white",
                                onClick: ($event) => showRecoverDialog.value = false
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(" Cancelar ")
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
                        createVNode(VCardTitle, null, {
                          default: withCtx(() => [
                            createTextVNode("Recuperar senha")
                          ]),
                          _: 1
                        }),
                        createVNode(VCardText, null, {
                          default: withCtx(() => [
                            createTextVNode(" ' "),
                            createVNode(VTextField, {
                              modelValue: unref(recoveryEmail),
                              "onUpdate:modelValue": ($event) => isRef(recoveryEmail) ? recoveryEmail.value = $event : null,
                              type: "email",
                              label: "Digite seu email",
                              "prepend-inner-icon": "mdi-email-outline"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          _: 1
                        }),
                        createTextVNode("' "),
                        createVNode(VCardActions, null, {
                          default: withCtx(() => [
                            createVNode(VSpacer),
                            createVNode(VBtn, {
                              class: "bg-green text-white",
                              onClick: ($event) => enviarCodigo()
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" Enviar ")
                              ]),
                              _: 1
                            }, 8, ["onClick"]),
                            createVNode(VBtn, {
                              class: "bg-red text-white",
                              onClick: ($event) => showRecoverDialog.value = false
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" Cancelar ")
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
          } else {
            return [
              createVNode(VCol, {
                cols: "5",
                class: "d-flex align-center justify-center"
              }, {
                default: withCtx(() => [
                  createVNode(VContainer, { style: { "max-width": "650px" } }, {
                    default: withCtx(() => [
                      createVNode(_component_center, null, {
                        default: withCtx(() => [
                          createVNode(VImg, {
                            style: { "margin-bottom": "30px" },
                            width: 400,
                            height: 330,
                            src: _imports_0
                          })
                        ]),
                        _: 1
                      }),
                      createVNode("div", { class: "text" }, "Login"),
                      createVNode(VTextField, {
                        autofocus: "",
                        autocomplete: "email",
                        type: "email",
                        modelValue: unref(loginData).email,
                        "onUpdate:modelValue": ($event) => unref(loginData).email = $event,
                        "persistent-hint": "",
                        class: "input mb-5",
                        style: { "background-color": "aliceblue" },
                        "hide-details": "",
                        density: "compact",
                        placeholder: "Email",
                        "prepend-inner-icon": "mdi-email-outline",
                        variant: "outlined"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                      createVNode(VTextField, {
                        modelValue: unref(loginData).senha,
                        "onUpdate:modelValue": ($event) => unref(loginData).senha = $event,
                        class: "input",
                        "append-inner-icon": unref(visible) ? "mdi-eye-off" : "mdi-eye",
                        type: unref(visible) ? "text" : "password",
                        density: "compact",
                        style: { "background-color": "aliceblue" },
                        "hide-details": "",
                        placeholder: "Senha",
                        "prepend-inner-icon": "mdi-lock-outline",
                        variant: "outlined",
                        "onClick:appendInner": ($event) => visible.value = !unref(visible)
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "append-inner-icon", "type", "onClick:appendInner"]),
                      createVNode(VDialog, {
                        modelValue: unref(dialog),
                        "onUpdate:modelValue": ($event) => isRef(dialog) ? dialog.value = $event : null,
                        "max-width": "400",
                        persistent: ""
                      }, {
                        activator: withCtx(({ props: activatorProps }) => [
                          createVNode(VBtn, mergeProps({
                            rounded: "",
                            class: "mb-10 mt-4 ml-1"
                          }, activatorProps, {
                            color: "primary",
                            onClick: login,
                            modelValue: unref(dialog),
                            "onUpdate:modelValue": ($event) => isRef(dialog) ? dialog.value = $event : null,
                            block: ""
                          }), {
                            default: withCtx(() => [
                              createTextVNode(" Acessar ")
                            ]),
                            _: 2
                          }, 1040, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        default: withCtx(() => [
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
                        ]),
                        _: 1
                      }, 8, ["modelValue", "onUpdate:modelValue"]),
                      createVNode("div", null, [
                        createVNode("a", {
                          class: "text-decoration-none",
                          rel: "noopener noreferrer",
                          style: { "color": "white", "margin-left": "10px", "cursor": "pointer" },
                          onClick: ($event) => showRecoverDialog.value = true
                        }, " Esqueceu a senha? ", 8, ["onClick"])
                      ])
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(VImg, {
                src: _imports_1,
                cover: ""
              }),
              createVNode(VDialog, {
                modelValue: unref(showRecoverDialog),
                "onUpdate:modelValue": ($event) => isRef(showRecoverDialog) ? showRecoverDialog.value = $event : null,
                "max-width": "500"
              }, {
                default: withCtx(() => [
                  createVNode(VCard, null, {
                    default: withCtx(() => [
                      createVNode(VCardTitle, null, {
                        default: withCtx(() => [
                          createTextVNode("Recuperar senha")
                        ]),
                        _: 1
                      }),
                      createVNode(VCardText, null, {
                        default: withCtx(() => [
                          createTextVNode(" ' "),
                          createVNode(VTextField, {
                            modelValue: unref(recoveryEmail),
                            "onUpdate:modelValue": ($event) => isRef(recoveryEmail) ? recoveryEmail.value = $event : null,
                            type: "email",
                            label: "Digite seu email",
                            "prepend-inner-icon": "mdi-email-outline"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        _: 1
                      }),
                      createTextVNode("' "),
                      createVNode(VCardActions, null, {
                        default: withCtx(() => [
                          createVNode(VSpacer),
                          createVNode(VBtn, {
                            class: "bg-green text-white",
                            onClick: ($event) => enviarCodigo()
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Enviar ")
                            ]),
                            _: 1
                          }, 8, ["onClick"]),
                          createVNode(VBtn, {
                            class: "bg-red text-white",
                            onClick: ($event) => showRecoverDialog.value = false
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Cancelar ")
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
              }, 8, ["modelValue", "onUpdate:modelValue"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/login/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : undefined;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-a21420b1"]]);

export { index as default };
//# sourceMappingURL=index-D6AazzuV.mjs.map
