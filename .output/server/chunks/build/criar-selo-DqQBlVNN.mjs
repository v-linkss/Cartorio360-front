import { _ as __nuxt_component_1 } from './MoneyInput-CqoPZ5qG.mjs';
import { V as VTextField, e as VBtn, b as useRuntimeConfig, d as useCookie, a as navigateTo } from './server.mjs';
import { ref, withAsyncContext, mergeProps, withCtx, createVNode, unref, createTextVNode, withModifiers, useSSRContext } from 'vue';
import { a as useFetch } from './fetch-bT3G74K0.mjs';
import { ssrRenderComponent } from 'vue/server-renderer';
import { V as VCard, b as VCardTitle, a as VCardActions } from './VCard-DyET5wem.mjs';
import { V as VForm } from './VForm-CswDZHD8.mjs';
import { V as VContainer } from './VContainer-BgUKde2W.mjs';
import { V as VAutocomplete } from './VAutocomplete-B1xN05m5.mjs';
import 'v-money3';
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
import 'vue3-toastify';
import 'vue-the-mask';

const _sfc_main = {
  __name: "criar-selo",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const config = useRuntimeConfig();
    const createSelo = `${config.public.managemant}/tipo-selos`;
    const getUfs = `${config.public.managemant}/uf`;
    const form = ref({
      uf: null,
      cor: null,
      descricao: null,
      vlr_compra: null
    });
    const ufList = ref([]);
    const { data: ufs } = ([__temp, __restore] = withAsyncContext(() => useFetch(getUfs, { method: "GET" }, "$yaSq8t86nm")), __temp = await __temp, __restore(), __temp);
    ufList.value = ufs.value;
    const HandleCreateSelo = async () => {
      try {
        const novoSelo = {
          uf: form.value.uf,
          cor: form.value.cor,
          descricao: form.value.descricao,
          vlr_compra: form.value.vlr_compra,
          user_id: useCookie("user-data").value.usuario_id,
          user_alteracao_id: useCookie("user-data").value.usuario_id
        };
        await useFetch(`${createSelo}`, {
          method: "POST",
          body: novoSelo
        }, "$NHjbFQtvV6");
        navigateTo("/tiposSelos/lista");
      } catch (error) {
        console.error("Erro ao criar selo:", error);
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_MoneyInput = __nuxt_component_1;
      _push(ssrRenderComponent(VCard, mergeProps({
        elevation: "4",
        "max-width": "1000"
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VCardTitle, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span class="text-h6"${_scopeId2}>Criar Novo Selo</span>`);
                } else {
                  return [
                    createVNode("span", { class: "text-h6" }, "Criar Novo Selo")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(VForm, { onSubmit: HandleCreateSelo }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VContainer, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VAutocomplete, {
                          modelValue: unref(form).uf,
                          "onUpdate:modelValue": ($event) => unref(form).uf = $event,
                          items: unref(ufList),
                          "item-title": "descricao",
                          "item-value": "sigla",
                          label: "UF",
                          required: "",
                          outlined: "",
                          class: "mb-5"
                        }, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VTextField, {
                          modelValue: unref(form).cor,
                          "onUpdate:modelValue": ($event) => unref(form).cor = $event,
                          label: "Cor",
                          required: "",
                          outlined: ""
                        }, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VTextField, {
                          modelValue: unref(form).descricao,
                          "onUpdate:modelValue": ($event) => unref(form).descricao = $event,
                          label: "Descri\xE7\xE3o",
                          required: "",
                          outlined: ""
                        }, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_MoneyInput, {
                          required: "",
                          modelValue: unref(form).vlr_compra,
                          "onUpdate:modelValue": ($event) => unref(form).vlr_compra = $event
                        }, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VCardActions, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VBtn, {
                                size: "large",
                                color: "red",
                                to: "/tiposSelos/lista"
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
                              _push5(ssrRenderComponent(VBtn, {
                                type: "submit",
                                class: "ml-4",
                                size: "large",
                                color: "green"
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(` Salvar `);
                                  } else {
                                    return [
                                      createTextVNode(" Salvar ")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(VBtn, {
                                  size: "large",
                                  color: "red",
                                  to: "/tiposSelos/lista"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode("Voltar")
                                  ]),
                                  _: 1
                                }),
                                createVNode(VBtn, {
                                  type: "submit",
                                  class: "ml-4",
                                  size: "large",
                                  color: "green"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(" Salvar ")
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VAutocomplete, {
                            modelValue: unref(form).uf,
                            "onUpdate:modelValue": ($event) => unref(form).uf = $event,
                            items: unref(ufList),
                            "item-title": "descricao",
                            "item-value": "sigla",
                            label: "UF",
                            required: "",
                            outlined: "",
                            class: "mb-5"
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "items"]),
                          createVNode(VTextField, {
                            modelValue: unref(form).cor,
                            "onUpdate:modelValue": ($event) => unref(form).cor = $event,
                            label: "Cor",
                            required: "",
                            outlined: ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                          createVNode(VTextField, {
                            modelValue: unref(form).descricao,
                            "onUpdate:modelValue": ($event) => unref(form).descricao = $event,
                            label: "Descri\xE7\xE3o",
                            required: "",
                            outlined: ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                          createVNode(_component_MoneyInput, {
                            required: "",
                            modelValue: unref(form).vlr_compra,
                            "onUpdate:modelValue": ($event) => unref(form).vlr_compra = $event
                          }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                          createVNode(VCardActions, null, {
                            default: withCtx(() => [
                              createVNode(VBtn, {
                                size: "large",
                                color: "red",
                                to: "/tiposSelos/lista"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode("Voltar")
                                ]),
                                _: 1
                              }),
                              createVNode(VBtn, {
                                type: "submit",
                                class: "ml-4",
                                size: "large",
                                color: "green"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(" Salvar ")
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
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VContainer, null, {
                      default: withCtx(() => [
                        createVNode(VAutocomplete, {
                          modelValue: unref(form).uf,
                          "onUpdate:modelValue": ($event) => unref(form).uf = $event,
                          items: unref(ufList),
                          "item-title": "descricao",
                          "item-value": "sigla",
                          label: "UF",
                          required: "",
                          outlined: "",
                          class: "mb-5"
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "items"]),
                        createVNode(VTextField, {
                          modelValue: unref(form).cor,
                          "onUpdate:modelValue": ($event) => unref(form).cor = $event,
                          label: "Cor",
                          required: "",
                          outlined: ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                        createVNode(VTextField, {
                          modelValue: unref(form).descricao,
                          "onUpdate:modelValue": ($event) => unref(form).descricao = $event,
                          label: "Descri\xE7\xE3o",
                          required: "",
                          outlined: ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                        createVNode(_component_MoneyInput, {
                          required: "",
                          modelValue: unref(form).vlr_compra,
                          "onUpdate:modelValue": ($event) => unref(form).vlr_compra = $event
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                        createVNode(VCardActions, null, {
                          default: withCtx(() => [
                            createVNode(VBtn, {
                              size: "large",
                              color: "red",
                              to: "/tiposSelos/lista"
                            }, {
                              default: withCtx(() => [
                                createTextVNode("Voltar")
                              ]),
                              _: 1
                            }),
                            createVNode(VBtn, {
                              type: "submit",
                              class: "ml-4",
                              size: "large",
                              color: "green"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" Salvar ")
                              ]),
                              _: 1
                            })
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
              createVNode(VCardTitle, null, {
                default: withCtx(() => [
                  createVNode("span", { class: "text-h6" }, "Criar Novo Selo")
                ]),
                _: 1
              }),
              createVNode(VForm, {
                onSubmit: withModifiers(HandleCreateSelo, ["prevent"])
              }, {
                default: withCtx(() => [
                  createVNode(VContainer, null, {
                    default: withCtx(() => [
                      createVNode(VAutocomplete, {
                        modelValue: unref(form).uf,
                        "onUpdate:modelValue": ($event) => unref(form).uf = $event,
                        items: unref(ufList),
                        "item-title": "descricao",
                        "item-value": "sigla",
                        label: "UF",
                        required: "",
                        outlined: "",
                        class: "mb-5"
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "items"]),
                      createVNode(VTextField, {
                        modelValue: unref(form).cor,
                        "onUpdate:modelValue": ($event) => unref(form).cor = $event,
                        label: "Cor",
                        required: "",
                        outlined: ""
                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                      createVNode(VTextField, {
                        modelValue: unref(form).descricao,
                        "onUpdate:modelValue": ($event) => unref(form).descricao = $event,
                        label: "Descri\xE7\xE3o",
                        required: "",
                        outlined: ""
                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                      createVNode(_component_MoneyInput, {
                        required: "",
                        modelValue: unref(form).vlr_compra,
                        "onUpdate:modelValue": ($event) => unref(form).vlr_compra = $event
                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                      createVNode(VCardActions, null, {
                        default: withCtx(() => [
                          createVNode(VBtn, {
                            size: "large",
                            color: "red",
                            to: "/tiposSelos/lista"
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Voltar")
                            ]),
                            _: 1
                          }),
                          createVNode(VBtn, {
                            type: "submit",
                            class: "ml-4",
                            size: "large",
                            color: "green"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Salvar ")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })
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
      }, _parent));
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/tiposSelos/criar-selo.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=criar-selo-DqQBlVNN.mjs.map
