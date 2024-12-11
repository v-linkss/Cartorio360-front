import { a as buildAssetsURL } from '../routes/renderer.mjs';
import { u as useRouter$1, c as useRoute$1, a2 as VImg, e as VBtn, b as useRuntimeConfig, d as useCookie } from './server.mjs';
import { ref, resolveComponent, withCtx, createVNode, unref, isRef, createTextVNode, useSSRContext } from 'vue';
import { u as useLazyFetch } from './fetch-bT3G74K0.mjs';
import { ssrRenderComponent } from 'vue/server-renderer';
import { _ as _imports_0 } from './cartorio_logo-BZAUeW2y.mjs';
import { V as VRow } from './VRow-CVrt2SWs.mjs';
import { V as VCol } from './VCol-DvbNDJG_.mjs';
import { V as VContainer } from './VContainer-Dd724oJ4.mjs';
import { V as VAutocomplete } from './VAutocomplete-D1-afj5_.mjs';
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

const _imports_1 = "" + buildAssetsURL("Login.C6E4XCGu.jpg");
const _sfc_main = {
  __name: "tipo-perfil",
  __ssrInlineRender: true,
  setup(__props) {
    const router = useRouter$1();
    const route = useRoute$1();
    const config = useRuntimeConfig();
    const listarMenu = `${config.public.managemant}/listarMenu`;
    const cartorios = JSON.parse(route.query.cartorios || "[]");
    const perfil_descricao = ref(null);
    const acessarSistema = async () => {
      const { data: menuItems, status } = await useLazyFetch(listarMenu, {
        method: "POST",
        body: { perfil_descricao: perfil_descricao.value }
      }, "$oCKjSvGSDZ");
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
                          "item-title": "perfil_descricao",
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
                            "item-title": "perfil_descricao",
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
                          "item-title": "perfil_descricao",
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
                        "item-title": "perfil_descricao",
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
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=tipo-perfil-C-qujjrV.mjs.map
