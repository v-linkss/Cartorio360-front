import { a as buildAssetsURL } from '../routes/renderer.mjs';
import { ref, resolveComponent, withCtx, createVNode, unref, isRef, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderComponent } from 'vue/server-renderer';
import { u as useCartoriosStore, _ as _imports_0 } from './useCartoriosStore-ON-x27_A.mjs';
import { u as useRouter$1, F as VBtn, c as useRuntimeConfig, e as useCookie } from './server.mjs';
import { f as fetchWithToken } from './fetchWithToken-cpPgQOwB.mjs';
import { V as VRow } from './VRow-DbcfFNio.mjs';
import { V as VCol } from './VCol-BY-FaYhw.mjs';
import { V as VContainer } from './VContainer-DUPM_BP9.mjs';
import { V as VImg } from './VAvatar-DEYOjnUS.mjs';
import { V as VAutocomplete } from './VAutocomplete-BkWVMD0Z.mjs';
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
import './fetch-CmQgfhnJ.mjs';
import './VResponsive-_f8EzDDz.mjs';
import './filter-DK3_4lVs.mjs';
import './VList-iVnq_OpI.mjs';

const _imports_1 = "" + buildAssetsURL("Login.C6E4XCGu.jpg");
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
      _push(ssrRenderComponent(VRow, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VCol, {
              cols: "4",
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
                                width: 300,
                                height: 230,
                                src: _imports_0
                              }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(VImg, {
                                  style: { "margin-bottom": "30px" },
                                  width: 300,
                                  height: 230,
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
                          "item-title": "cartorio_descricao",
                          "item-value": "perfil_descricao",
                          label: "Selecione uma op\xE7\xE3o"
                        }, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VBtn, {
                          onClick: ($event) => acessarSistema(),
                          color: "green",
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
                                width: 300,
                                height: 230,
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
                            "item-title": "cartorio_descricao",
                            "item-value": "perfil_descricao",
                            label: "Selecione uma op\xE7\xE3o"
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "items"]),
                          createVNode(VBtn, {
                            onClick: ($event) => acessarSistema(),
                            color: "green",
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
                    createVNode(VContainer, null, {
                      default: withCtx(() => [
                        createVNode(_component_center, null, {
                          default: withCtx(() => [
                            createVNode(VImg, {
                              style: { "margin-bottom": "30px" },
                              width: 300,
                              height: 230,
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
                          "item-title": "cartorio_descricao",
                          "item-value": "perfil_descricao",
                          label: "Selecione uma op\xE7\xE3o"
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "items"]),
                        createVNode(VBtn, {
                          onClick: ($event) => acessarSistema(),
                          color: "green",
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
                cols: "4",
                class: "d-flex align-center justify-center"
              }, {
                default: withCtx(() => [
                  createVNode(VContainer, null, {
                    default: withCtx(() => [
                      createVNode(_component_center, null, {
                        default: withCtx(() => [
                          createVNode(VImg, {
                            style: { "margin-bottom": "30px" },
                            width: 300,
                            height: 230,
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
                        "item-title": "cartorio_descricao",
                        "item-value": "perfil_descricao",
                        label: "Selecione uma op\xE7\xE3o"
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "items"]),
                      createVNode(VBtn, {
                        onClick: ($event) => acessarSistema(),
                        color: "green",
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
//# sourceMappingURL=tipo-perfil-CF3pHu-d.mjs.map
