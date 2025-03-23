import { ref, resolveComponent, mergeProps, withCtx, createVNode, unref, isRef, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderComponent } from 'vue/server-renderer';
import { u as useCartoriosStore, _ as _imports_0, a as _imports_1 } from './useCartoriosStore-CnwuVEsH.mjs';
import { u as useRouter$1, f as VBtn, c as useRuntimeConfig, e as useCookie } from './server.mjs';
import { f as fetchWithToken } from './fetchWithToken-Cv5nC8pK.mjs';
import { V as VRow } from './VRow-BVT9G9vF.mjs';
import { V as VCol } from './VCol-BfQDPyTL.mjs';
import { V as VContainer } from './VContainer-CTpFP9Uv.mjs';
import { V as VImg } from './VAvatar-C1Wv3qCt.mjs';
import { V as VAutocomplete } from './VAutocomplete-b82_SY3L.mjs';
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
import './fetch-Q70wXbL3.mjs';
import './VResponsive-BFQ60k4B.mjs';
import './filter-DBr0YsK-.mjs';
import './VList-DgVXz_Z-.mjs';

const _sfc_main = {
  __name: "tipo-perfil",
  __ssrInlineRender: true,
  setup(__props) {
    const cartorioStore = useCartoriosStore();
    const router = useRouter$1();
    const config = useRuntimeConfig();
    const listarMenu = `${config.public.auth}/service/gerencia/listarMenu`;
    const cartorios = cartorioStore.cartorioInfos;
    const perfil_descricao = ref(null);
    const acessarSistema = async () => {
      const { data: menuItems, status } = await fetchWithToken(listarMenu, {
        method: "POST",
        body: { perfil_descricao: perfil_descricao.value }
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
                  _push3(ssrRenderComponent(VContainer, null, {
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
                          style: { "background-color": "aliceblue", "margin-left": "90px" },
                          "item-title": "cartorio_descricao",
                          "item-value": "perfil_descricao",
                          label: "Selecione uma op\xE7\xE3o",
                          width: "570"
                        }, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VBtn, {
                          rounded: "",
                          onClick: ($event) => acessarSistema(),
                          color: "primary",
                          style: { "margin-bottom": "220px", "margin-top": "30px", "width": "570px", "margin-left": "90px" }
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
                            style: { "background-color": "aliceblue", "margin-left": "90px" },
                            "item-title": "cartorio_descricao",
                            "item-value": "perfil_descricao",
                            label: "Selecione uma op\xE7\xE3o",
                            width: "570"
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "items"]),
                          createVNode(VBtn, {
                            rounded: "",
                            onClick: ($event) => acessarSistema(),
                            color: "primary",
                            style: { "margin-bottom": "220px", "margin-top": "30px", "width": "570px", "margin-left": "90px" }
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
                    createVNode(VContainer, null, {
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
                          style: { "background-color": "aliceblue", "margin-left": "90px" },
                          "item-title": "cartorio_descricao",
                          "item-value": "perfil_descricao",
                          label: "Selecione uma op\xE7\xE3o",
                          width: "570"
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "items"]),
                        createVNode(VBtn, {
                          rounded: "",
                          onClick: ($event) => acessarSistema(),
                          color: "primary",
                          style: { "margin-bottom": "220px", "margin-top": "30px", "width": "570px", "margin-left": "90px" }
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
                  createVNode(VContainer, null, {
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
                        style: { "background-color": "aliceblue", "margin-left": "90px" },
                        "item-title": "cartorio_descricao",
                        "item-value": "perfil_descricao",
                        label: "Selecione uma op\xE7\xE3o",
                        width: "570"
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "items"]),
                      createVNode(VBtn, {
                        rounded: "",
                        onClick: ($event) => acessarSistema(),
                        color: "primary",
                        style: { "margin-bottom": "220px", "margin-top": "30px", "width": "570px", "margin-left": "90px" }
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
//# sourceMappingURL=tipo-perfil-BaV7C6Qj.mjs.map
