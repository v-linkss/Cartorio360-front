import { a as buildAssetsURL } from '../routes/renderer.mjs';
import { useSSRContext, ref, reactive, watch, withAsyncContext, mergeProps, unref, isRef, withCtx, createTextVNode, createVNode } from 'vue';
import { d as useCookie, x as VIcon, as as VDataTable, b as useRuntimeConfig } from './server.mjs';
import { u as useFetch } from './fetch-bT3G74K0.mjs';
import { ssrRenderComponent, ssrRenderAttr, ssrRenderStyle } from 'vue/server-renderer';
import { useVuelidate } from '@vuelidate/core';
import { helpers, required } from '@vuelidate/validators';
import { V as VDialog } from './VDialog-BwIFCBiT.mjs';
import { V as VCard, a as VCardActions } from './VCard-DyET5wem.mjs';
import { V as VContainer } from './VContainer-BgUKde2W.mjs';
import { V as VRow } from './VRow-TyzvXDuI.mjs';
import { V as VAutocomplete } from './VAutocomplete-B1xN05m5.mjs';

const _imports_2 = "" + buildAssetsURL("selo.D9mIBRmY.png");
const _sfc_main = {
  __name: "Selos",
  __ssrInlineRender: true,
  props: {
    show: Boolean,
    ato_token: String
  },
  emits: ["close"],
  async setup(__props, { emit: __emit }) {
    let __temp, __restore;
    const props = __props;
    const isVisible = ref(props.show);
    const config = useRuntimeConfig();
    const cartorio_token = ref(useCookie("user-data").value.cartorio_token).value;
    const getSelos = `${config.public.managemant}/listarSelos`;
    const reimprimeSelos = `${config.public.managemant}/reimprimirSelo`;
    const allEscreventes = `${config.public.managemant}/listarEscrevente`;
    const selosItems = ref([]);
    const selectedSelos = ref([]);
    const state = reactive({
      escrevente: null
    });
    const emit = __emit;
    const rules = {
      escrevente: {
        required: helpers.withMessage("O campo \xE9 obrigatorio", required)
      }
    };
    const v$ = useVuelidate(rules, state);
    const headers = [
      { title: "Numero", value: "numero" },
      { title: "Referencia", value: "referencia" },
      {
        value: "actions"
      }
    ];
    watch(
      () => props.show,
      (newVal) => {
        isVisible.value = newVal;
        if (newVal) {
          fetchSelos();
        }
      }
    );
    const closeModal = () => {
      isVisible.value = false;
      emit("close");
    };
    const escreventesItems = ref([]);
    const { data } = ([__temp, __restore] = withAsyncContext(() => useFetch(allEscreventes, {
      method: "POST",
      body: { cartorio_token }
    }, "$V2ulT7DYvP")), __temp = await __temp, __restore(), __temp);
    escreventesItems.value = data.value[0].func_json_escreventes;
    const reimprimeSelosAtos = async () => {
      if (await v$.value.$validate()) {
        const selosJson = selectedSelos.value.map((selo) => ({ selo_token: selo }));
        const body = {
          escrevente_token: state.escrevente,
          ato_token: props.ato_token,
          selos: selosJson
        };
        const { data: data2, error, status } = await useFetch(`${reimprimeSelos}`, {
          method: "POST",
          body
        }, "$45J51uHTfa");
        if (status.value === "success") {
          const newWindow = (void 0).open("", "_blank");
          newWindow.document.open();
          newWindow.document.write(data2.value[0].etiqueta);
          newWindow.document.close();
          closeModal();
        }
      }
    };
    const fetchSelos = async () => {
      const { data: data2, error } = await useFetch(`${getSelos}`, {
        method: "POST",
        body: { ato_token: props.ato_token }
      }, "$rLWIRtrfDz");
      if (data2.value.selos === null) {
        selosItems.value = [];
      } else {
        selosItems.value = data2.value.selos;
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(VDialog, mergeProps({
        persistent: "",
        modelValue: unref(isVisible),
        "onUpdate:modelValue": ($event) => isRef(isVisible) ? isVisible.value = $event : null,
        "max-width": "500"
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VCard, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VContainer, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VRow, {
                          class: "mt-1 mb-3",
                          style: { "justify-content": "space-between" }
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<h1 class="ml-4"${_scopeId4}>Reimpress\xE3o de Selos</h1>`);
                              _push5(ssrRenderComponent(VIcon, {
                                class: "mt-4 mr-4",
                                style: { "color": "red" },
                                onClick: closeModal
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`mdi-close`);
                                  } else {
                                    return [
                                      createTextVNode("mdi-close")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode("h1", { class: "ml-4" }, "Reimpress\xE3o de Selos"),
                                createVNode(VIcon, {
                                  class: "mt-4 mr-4",
                                  style: { "color": "red" },
                                  onClick: closeModal
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode("mdi-close")
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`<hr class="mb-5"${_scopeId3}>`);
                        _push4(ssrRenderComponent(VAutocomplete, {
                          class: "mb-5",
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
                        }, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VDataTable, {
                          headers,
                          items: unref(selosItems),
                          "item-value": "token",
                          "show-select": "",
                          modelValue: unref(selectedSelos),
                          "onUpdate:modelValue": ($event) => isRef(selectedSelos) ? selectedSelos.value = $event : null
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VRow, {
                            class: "mt-1 mb-3",
                            style: { "justify-content": "space-between" }
                          }, {
                            default: withCtx(() => [
                              createVNode("h1", { class: "ml-4" }, "Reimpress\xE3o de Selos"),
                              createVNode(VIcon, {
                                class: "mt-4 mr-4",
                                style: { "color": "red" },
                                onClick: closeModal
                              }, {
                                default: withCtx(() => [
                                  createTextVNode("mdi-close")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode("hr", { class: "mb-5" }),
                          createVNode(VAutocomplete, {
                            class: "mb-5",
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
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "items", "error-messages", "onBlur", "onInput"]),
                          createVNode(VDataTable, {
                            headers,
                            items: unref(selosItems),
                            "item-value": "token",
                            "show-select": "",
                            modelValue: unref(selectedSelos),
                            "onUpdate:modelValue": ($event) => isRef(selectedSelos) ? selectedSelos.value = $event : null
                          }, null, 8, ["items", "modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VCardActions, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div${_scopeId3}><img${ssrRenderAttr("src", _imports_2)} style="${ssrRenderStyle({ "cursor": "pointer" })}"${_scopeId3}></div>`);
                      } else {
                        return [
                          createVNode("div", null, [
                            createVNode("img", {
                              src: _imports_2,
                              style: { "cursor": "pointer" },
                              onClick: reimprimeSelosAtos
                            })
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VContainer, null, {
                      default: withCtx(() => [
                        createVNode(VRow, {
                          class: "mt-1 mb-3",
                          style: { "justify-content": "space-between" }
                        }, {
                          default: withCtx(() => [
                            createVNode("h1", { class: "ml-4" }, "Reimpress\xE3o de Selos"),
                            createVNode(VIcon, {
                              class: "mt-4 mr-4",
                              style: { "color": "red" },
                              onClick: closeModal
                            }, {
                              default: withCtx(() => [
                                createTextVNode("mdi-close")
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        createVNode("hr", { class: "mb-5" }),
                        createVNode(VAutocomplete, {
                          class: "mb-5",
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
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "items", "error-messages", "onBlur", "onInput"]),
                        createVNode(VDataTable, {
                          headers,
                          items: unref(selosItems),
                          "item-value": "token",
                          "show-select": "",
                          modelValue: unref(selectedSelos),
                          "onUpdate:modelValue": ($event) => isRef(selectedSelos) ? selectedSelos.value = $event : null
                        }, null, 8, ["items", "modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(VCardActions, null, {
                      default: withCtx(() => [
                        createVNode("div", null, [
                          createVNode("img", {
                            src: _imports_2,
                            style: { "cursor": "pointer" },
                            onClick: reimprimeSelosAtos
                          })
                        ])
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
              createVNode(VCard, null, {
                default: withCtx(() => [
                  createVNode(VContainer, null, {
                    default: withCtx(() => [
                      createVNode(VRow, {
                        class: "mt-1 mb-3",
                        style: { "justify-content": "space-between" }
                      }, {
                        default: withCtx(() => [
                          createVNode("h1", { class: "ml-4" }, "Reimpress\xE3o de Selos"),
                          createVNode(VIcon, {
                            class: "mt-4 mr-4",
                            style: { "color": "red" },
                            onClick: closeModal
                          }, {
                            default: withCtx(() => [
                              createTextVNode("mdi-close")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode("hr", { class: "mb-5" }),
                      createVNode(VAutocomplete, {
                        class: "mb-5",
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
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "items", "error-messages", "onBlur", "onInput"]),
                      createVNode(VDataTable, {
                        headers,
                        items: unref(selosItems),
                        "item-value": "token",
                        "show-select": "",
                        modelValue: unref(selectedSelos),
                        "onUpdate:modelValue": ($event) => isRef(selectedSelos) ? selectedSelos.value = $event : null
                      }, null, 8, ["items", "modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(VCardActions, null, {
                    default: withCtx(() => [
                      createVNode("div", null, [
                        createVNode("img", {
                          src: _imports_2,
                          style: { "cursor": "pointer" },
                          onClick: reimprimeSelosAtos
                        })
                      ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Reimpressao/Selos.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _imports_0 = "" + buildAssetsURL("salvar.b7udBb7s.png");

export { _imports_0 as _, _imports_2 as a, _sfc_main as b };
//# sourceMappingURL=salvar-6F79Bl8w.mjs.map
