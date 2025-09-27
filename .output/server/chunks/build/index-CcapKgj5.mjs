import { ref, computed, resolveComponent, mergeProps, withCtx, createVNode, unref, isRef, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderComponent } from 'vue/server-renderer';
import { _ as _imports_0, a as _imports_1 } from './useCartoriosStore-CnwuVEsH.mjs';
import { _ as _export_sfc, u as useRouter$1, b as useNuxtApp, f as VTextField, V as VBtn, c as useRuntimeConfig } from './server.mjs';
import { u as useFetch } from './fetch-uf6n1sXR.mjs';
import { V as VRow } from './VRow-Bqz0CuIN.mjs';
import { V as VCol } from './VCol-BT4RzX0Q.mjs';
import { V as VContainer } from './VContainer-CUysD4sO.mjs';
import { V as VImg } from './VImg-BQaOrhxX.mjs';
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
import './asyncData-B8plM1p3.mjs';
import './VResponsive-BwPb2GHE.mjs';

const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    useRouter$1();
    const { $toast } = useNuxtApp();
    ref({
      senha: "",
      email: ""
    });
    const visible = ref(false);
    const visible_confirmar = ref(false);
    const dialog = ref(false);
    const novaSenha = ref("");
    const confirmarSenha = ref("");
    ref(false);
    ref(false);
    ref(false);
    ref(false);
    const showRecoverDialog = ref(false);
    const recoveryEmail = ref("");
    const senhaInvalida = ref(false);
    const config = useRuntimeConfig();
    `${config.public.auth}/service/gerencia/listarMenu`;
    config.public.auth;
    const managemant = config.public.managemant;
    const codigoEnviado = ref(false);
    const recoveryCode = ref("");
    const alterarSenha = async () => {
      var _a, _b, _c, _d, _e;
      if (novaSenha.value !== confirmarSenha.value) {
        senhaInvalida.value = true;
        $toast.error("As senhas n\xE3o coincidem.");
        return;
      }
      senhaInvalida.value = false;
      try {
        const { data, status, error } = await useFetch(
          `${managemant}/verifica_codigo_recuperacao`,
          {
            method: "POST",
            body: {
              // email: useCookie("recovery-email").value,
              acao: "recuperar",
              token: recoveryCode.value,
              senha: novaSenha.value
            }
          },
          "$6PqqSha0mY"
        );
        if (status.value === "success") {
          $toast.success(data.value.status_mensagem || "Senha alterada com sucesso!");
        } else {
          console.log(error.value.data);
          $toast.error(
            ((_c = (_b = (_a = error.value) == null ? void 0 : _a.data) == null ? void 0 : _b.menssage) == null ? void 0 : _c.details) || ((_e = (_d = error.value) == null ? void 0 : _d.data) == null ? void 0 : _e.status_mensagem) || "Erro desconhecido ao alterar a senha."
          );
        }
        showRecoverDialog.value = false;
        codigoEnviado.value = false;
        recoveryEmail.value = "";
        recoveryCode.value = "";
        novaSenha.value = "";
        confirmarSenha.value = "";
      } catch (error) {
      }
    };
    const senhasValidas = computed(() => {
      return novaSenha.value && confirmarSenha.value && novaSenha.value === confirmarSenha.value;
    });
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
                        _push4(ssrRenderComponent(VTextField, {
                          modelValue: unref(recoveryCode),
                          "onUpdate:modelValue": ($event) => isRef(recoveryCode) ? recoveryCode.value = $event : null,
                          class: "input mt-5",
                          type: _ctx.text,
                          density: "compact",
                          style: { "background-color": "aliceblue" },
                          "hide-details": "",
                          placeholder: "C\xF3digo de verifica\xE7\xE3o",
                          variant: "outlined"
                        }, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VTextField, {
                          modelValue: unref(novaSenha),
                          "onUpdate:modelValue": ($event) => isRef(novaSenha) ? novaSenha.value = $event : null,
                          class: "input mt-5",
                          "append-inner-icon": unref(visible) ? "mdi-eye-off" : "mdi-eye",
                          type: unref(visible) ? "text" : "password",
                          density: "compact",
                          style: { "background-color": "aliceblue" },
                          "hide-details": "",
                          placeholder: "Nova Senha",
                          "prepend-inner-icon": "mdi-lock-outline",
                          variant: "outlined",
                          "onClick:appendInner": ($event) => visible.value = !unref(visible)
                        }, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VTextField, {
                          modelValue: unref(confirmarSenha),
                          "onUpdate:modelValue": ($event) => isRef(confirmarSenha) ? confirmarSenha.value = $event : null,
                          class: "input mt-3",
                          "append-inner-icon": unref(visible_confirmar) ? "mdi-eye-off" : "mdi-eye",
                          type: unref(visible_confirmar) ? "text" : "password",
                          density: "compact",
                          style: { "background-color": "aliceblue" },
                          "hide-details": "",
                          placeholder: "Confirmar Senha",
                          "prepend-inner-icon": "mdi-lock-outline",
                          variant: "outlined",
                          "onClick:appendInner": ($event) => visible_confirmar.value = !unref(visible_confirmar)
                        }, null, _parent4, _scopeId3));
                        _push4(`<div data-v-2f8282e2${_scopeId3}>`);
                        _push4(ssrRenderComponent(VBtn, mergeProps({
                          rounded: "",
                          class: "mb-10 mt-4 ml-1"
                        }, _ctx.activatorProps, {
                          color: "primary",
                          onClick: alterarSenha,
                          modelValue: unref(dialog),
                          "onUpdate:modelValue": ($event) => isRef(dialog) ? dialog.value = $event : null,
                          block: "",
                          disabled: !unref(senhasValidas)
                        }), {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(` Alterar Senha `);
                            } else {
                              return [
                                createTextVNode(" Alterar Senha ")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`</div>`);
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
                          createVNode(VTextField, {
                            modelValue: unref(recoveryCode),
                            "onUpdate:modelValue": ($event) => isRef(recoveryCode) ? recoveryCode.value = $event : null,
                            class: "input mt-5",
                            type: _ctx.text,
                            density: "compact",
                            style: { "background-color": "aliceblue" },
                            "hide-details": "",
                            placeholder: "C\xF3digo de verifica\xE7\xE3o",
                            variant: "outlined"
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "type"]),
                          createVNode(VTextField, {
                            modelValue: unref(novaSenha),
                            "onUpdate:modelValue": ($event) => isRef(novaSenha) ? novaSenha.value = $event : null,
                            class: "input mt-5",
                            "append-inner-icon": unref(visible) ? "mdi-eye-off" : "mdi-eye",
                            type: unref(visible) ? "text" : "password",
                            density: "compact",
                            style: { "background-color": "aliceblue" },
                            "hide-details": "",
                            placeholder: "Nova Senha",
                            "prepend-inner-icon": "mdi-lock-outline",
                            variant: "outlined",
                            "onClick:appendInner": ($event) => visible.value = !unref(visible)
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "append-inner-icon", "type", "onClick:appendInner"]),
                          createVNode(VTextField, {
                            modelValue: unref(confirmarSenha),
                            "onUpdate:modelValue": ($event) => isRef(confirmarSenha) ? confirmarSenha.value = $event : null,
                            class: "input mt-3",
                            "append-inner-icon": unref(visible_confirmar) ? "mdi-eye-off" : "mdi-eye",
                            type: unref(visible_confirmar) ? "text" : "password",
                            density: "compact",
                            style: { "background-color": "aliceblue" },
                            "hide-details": "",
                            placeholder: "Confirmar Senha",
                            "prepend-inner-icon": "mdi-lock-outline",
                            variant: "outlined",
                            "onClick:appendInner": ($event) => visible_confirmar.value = !unref(visible_confirmar)
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "append-inner-icon", "type", "onClick:appendInner"]),
                          createVNode("div", null, [
                            createVNode(VBtn, mergeProps({
                              rounded: "",
                              class: "mb-10 mt-4 ml-1"
                            }, _ctx.activatorProps, {
                              color: "primary",
                              onClick: alterarSenha,
                              modelValue: unref(dialog),
                              "onUpdate:modelValue": ($event) => isRef(dialog) ? dialog.value = $event : null,
                              block: "",
                              disabled: !unref(senhasValidas)
                            }), {
                              default: withCtx(() => [
                                createTextVNode(" Alterar Senha ")
                              ]),
                              _: 1
                            }, 16, ["modelValue", "onUpdate:modelValue", "disabled"])
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
                        createVNode(VTextField, {
                          modelValue: unref(recoveryCode),
                          "onUpdate:modelValue": ($event) => isRef(recoveryCode) ? recoveryCode.value = $event : null,
                          class: "input mt-5",
                          type: _ctx.text,
                          density: "compact",
                          style: { "background-color": "aliceblue" },
                          "hide-details": "",
                          placeholder: "C\xF3digo de verifica\xE7\xE3o",
                          variant: "outlined"
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "type"]),
                        createVNode(VTextField, {
                          modelValue: unref(novaSenha),
                          "onUpdate:modelValue": ($event) => isRef(novaSenha) ? novaSenha.value = $event : null,
                          class: "input mt-5",
                          "append-inner-icon": unref(visible) ? "mdi-eye-off" : "mdi-eye",
                          type: unref(visible) ? "text" : "password",
                          density: "compact",
                          style: { "background-color": "aliceblue" },
                          "hide-details": "",
                          placeholder: "Nova Senha",
                          "prepend-inner-icon": "mdi-lock-outline",
                          variant: "outlined",
                          "onClick:appendInner": ($event) => visible.value = !unref(visible)
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "append-inner-icon", "type", "onClick:appendInner"]),
                        createVNode(VTextField, {
                          modelValue: unref(confirmarSenha),
                          "onUpdate:modelValue": ($event) => isRef(confirmarSenha) ? confirmarSenha.value = $event : null,
                          class: "input mt-3",
                          "append-inner-icon": unref(visible_confirmar) ? "mdi-eye-off" : "mdi-eye",
                          type: unref(visible_confirmar) ? "text" : "password",
                          density: "compact",
                          style: { "background-color": "aliceblue" },
                          "hide-details": "",
                          placeholder: "Confirmar Senha",
                          "prepend-inner-icon": "mdi-lock-outline",
                          variant: "outlined",
                          "onClick:appendInner": ($event) => visible_confirmar.value = !unref(visible_confirmar)
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "append-inner-icon", "type", "onClick:appendInner"]),
                        createVNode("div", null, [
                          createVNode(VBtn, mergeProps({
                            rounded: "",
                            class: "mb-10 mt-4 ml-1"
                          }, _ctx.activatorProps, {
                            color: "primary",
                            onClick: alterarSenha,
                            modelValue: unref(dialog),
                            "onUpdate:modelValue": ($event) => isRef(dialog) ? dialog.value = $event : null,
                            block: "",
                            disabled: !unref(senhasValidas)
                          }), {
                            default: withCtx(() => [
                              createTextVNode(" Alterar Senha ")
                            ]),
                            _: 1
                          }, 16, ["modelValue", "onUpdate:modelValue", "disabled"])
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
                      createVNode(VTextField, {
                        modelValue: unref(recoveryCode),
                        "onUpdate:modelValue": ($event) => isRef(recoveryCode) ? recoveryCode.value = $event : null,
                        class: "input mt-5",
                        type: _ctx.text,
                        density: "compact",
                        style: { "background-color": "aliceblue" },
                        "hide-details": "",
                        placeholder: "C\xF3digo de verifica\xE7\xE3o",
                        variant: "outlined"
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "type"]),
                      createVNode(VTextField, {
                        modelValue: unref(novaSenha),
                        "onUpdate:modelValue": ($event) => isRef(novaSenha) ? novaSenha.value = $event : null,
                        class: "input mt-5",
                        "append-inner-icon": unref(visible) ? "mdi-eye-off" : "mdi-eye",
                        type: unref(visible) ? "text" : "password",
                        density: "compact",
                        style: { "background-color": "aliceblue" },
                        "hide-details": "",
                        placeholder: "Nova Senha",
                        "prepend-inner-icon": "mdi-lock-outline",
                        variant: "outlined",
                        "onClick:appendInner": ($event) => visible.value = !unref(visible)
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "append-inner-icon", "type", "onClick:appendInner"]),
                      createVNode(VTextField, {
                        modelValue: unref(confirmarSenha),
                        "onUpdate:modelValue": ($event) => isRef(confirmarSenha) ? confirmarSenha.value = $event : null,
                        class: "input mt-3",
                        "append-inner-icon": unref(visible_confirmar) ? "mdi-eye-off" : "mdi-eye",
                        type: unref(visible_confirmar) ? "text" : "password",
                        density: "compact",
                        style: { "background-color": "aliceblue" },
                        "hide-details": "",
                        placeholder: "Confirmar Senha",
                        "prepend-inner-icon": "mdi-lock-outline",
                        variant: "outlined",
                        "onClick:appendInner": ($event) => visible_confirmar.value = !unref(visible_confirmar)
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "append-inner-icon", "type", "onClick:appendInner"]),
                      createVNode("div", null, [
                        createVNode(VBtn, mergeProps({
                          rounded: "",
                          class: "mb-10 mt-4 ml-1"
                        }, _ctx.activatorProps, {
                          color: "primary",
                          onClick: alterarSenha,
                          modelValue: unref(dialog),
                          "onUpdate:modelValue": ($event) => isRef(dialog) ? dialog.value = $event : null,
                          block: "",
                          disabled: !unref(senhasValidas)
                        }), {
                          default: withCtx(() => [
                            createTextVNode(" Alterar Senha ")
                          ]),
                          _: 1
                        }, 16, ["modelValue", "onUpdate:modelValue", "disabled"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/recupera_senha/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : undefined;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-2f8282e2"]]);

export { index as default };
//# sourceMappingURL=index-CcapKgj5.mjs.map
