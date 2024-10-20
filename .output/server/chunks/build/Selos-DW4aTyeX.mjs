import { useSSRContext, ref, reactive, watch, withAsyncContext, mergeProps, unref, isRef, withCtx, createTextVNode, createVNode } from 'vue';
import { d as useCookie, K as VIcon, as as VDataTable, b as useRuntimeConfig } from './server.mjs';
import { u as useFetch } from './fetch-Dsyde8UD.mjs';
import { ssrRenderComponent, ssrRenderAttr, ssrRenderStyle } from 'vue/server-renderer';
import { useVuelidate } from '@vuelidate/core';
import { helpers, required } from '@vuelidate/validators';
import { V as VDialog, a as VCard, c as VCardActions } from './VCard-DfTYaOUe.mjs';
import { V as VContainer } from './VContainer-chgtNZst.mjs';
import { V as VRow } from './VRow-BuaJrtx0.mjs';
import { V as VAutocomplete } from './salvar-DRINGrxl.mjs';

const _imports_2 = "data:image/png;base64,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";
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
      if (!error.value) {
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

export { _imports_2 as _, _sfc_main as a };
//# sourceMappingURL=Selos-DW4aTyeX.mjs.map
