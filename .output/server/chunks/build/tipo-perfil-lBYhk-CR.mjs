import { ref, resolveComponent, mergeProps, withCtx, createVNode, unref, isRef, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderComponent } from 'vue/server-renderer';
import { u as useCartoriosStore, _ as _imports_0, a as _imports_1 } from './useCartoriosStore-CnwuVEsH.mjs';
import { u as useRouter$1, g as VBtn, c as useRuntimeConfig, e as useCookie } from './server.mjs';
import { f as fetchWithToken } from './fetchWithToken-BOdMs1av.mjs';
import { V as VRow } from './VRow-Bqz0CuIN.mjs';
import { V as VCol } from './VCol-BT4RzX0Q.mjs';
import { V as VContainer } from './VContainer-CUysD4sO.mjs';
import { V as VImg } from './VAvatar-ue719cLT.mjs';
import { V as VAutocomplete } from './VAutocomplete-Dcpr7zxR.mjs';
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
import './fetch-BoUya6B3.mjs';
import './asyncData-5-ZiIFU2.mjs';
import './VResponsive-D5W8jAiq.mjs';
import './filter-CJ_8gFu0.mjs';
import './VList-BPhVGERd.mjs';

const _sfc_main = {
  __name: "tipo-perfil",
  __ssrInlineRender: true,
  setup(__props) {
    const cartorioStore = useCartoriosStore();
    const router = useRouter$1();
    const config = useRuntimeConfig();
    const listarMenu = `${config.public.auth}/service/gerencia/listarMenu`;
    const cartorios = cartorioStore.cartorioInfos.cartorios;
    const perfil_descricao = ref(null);
    const acessarSistema = async () => {
      const { data: menuItems, status } = await fetchWithToken(listarMenu, {
        method: "POST",
        body: {
          usuario_id: cartorioStore.cartorioInfos.id,
          perfil_descricao: perfil_descricao.value
        }
      });
      const menuItemsCookie = useCookie("menu-navbar");
      menuItemsCookie.value = menuItems.value;
      if (status.value === "success") {
        router.push("/");
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
                        _push4(ssrRenderComponent(VAutocomplete, {
                          modelValue: unref(perfil_descricao),
                          "onUpdate:modelValue": ($event) => isRef(perfil_descricao) ? perfil_descricao.value = $event : null,
                          variant: "outlined",
                          items: unref(cartorios),
                          style: { "background-color": "aliceblue" },
                          "item-title": "cartorio_descricao",
                          "item-value": "perfil_descricao",
                          label: "Selecione uma op\xE7\xE3o"
                        }, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VBtn, {
                          rounded: "",
                          onClick: ($event) => acessarSistema(),
                          color: "primary",
                          style: { "margin-bottom": "220px", "margin-top": "30px" },
                          block: ""
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Acessar`);
                            } else {
                              return [
                                createTextVNode("Acessar")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
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
                          createVNode(VAutocomplete, {
                            modelValue: unref(perfil_descricao),
                            "onUpdate:modelValue": ($event) => isRef(perfil_descricao) ? perfil_descricao.value = $event : null,
                            variant: "outlined",
                            items: unref(cartorios),
                            style: { "background-color": "aliceblue" },
                            "item-title": "cartorio_descricao",
                            "item-value": "perfil_descricao",
                            label: "Selecione uma op\xE7\xE3o"
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "items"]),
                          createVNode(VBtn, {
                            rounded: "",
                            onClick: ($event) => acessarSistema(),
                            color: "primary",
                            style: { "margin-bottom": "220px", "margin-top": "30px" },
                            block: ""
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Acessar")
                            ]),
                            _: 1
                          }, 8, ["onClick"])
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
                        createVNode(VAutocomplete, {
                          modelValue: unref(perfil_descricao),
                          "onUpdate:modelValue": ($event) => isRef(perfil_descricao) ? perfil_descricao.value = $event : null,
                          variant: "outlined",
                          items: unref(cartorios),
                          style: { "background-color": "aliceblue" },
                          "item-title": "cartorio_descricao",
                          "item-value": "perfil_descricao",
                          label: "Selecione uma op\xE7\xE3o"
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "items"]),
                        createVNode(VBtn, {
                          rounded: "",
                          onClick: ($event) => acessarSistema(),
                          color: "primary",
                          style: { "margin-bottom": "220px", "margin-top": "30px" },
                          block: ""
                        }, {
                          default: withCtx(() => [
                            createTextVNode("Acessar")
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
                      createVNode(VAutocomplete, {
                        modelValue: unref(perfil_descricao),
                        "onUpdate:modelValue": ($event) => isRef(perfil_descricao) ? perfil_descricao.value = $event : null,
                        variant: "outlined",
                        items: unref(cartorios),
                        style: { "background-color": "aliceblue" },
                        "item-title": "cartorio_descricao",
                        "item-value": "perfil_descricao",
                        label: "Selecione uma op\xE7\xE3o"
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "items"]),
                      createVNode(VBtn, {
                        rounded: "",
                        onClick: ($event) => acessarSistema(),
                        color: "primary",
                        style: { "margin-bottom": "220px", "margin-top": "30px" },
                        block: ""
                      }, {
                        default: withCtx(() => [
                          createTextVNode("Acessar")
                        ]),
                        _: 1
                      }, 8, ["onClick"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/login/tipo-perfil.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : undefined;
};

export { _sfc_main as default };
//# sourceMappingURL=tipo-perfil-lBYhk-CR.mjs.map
