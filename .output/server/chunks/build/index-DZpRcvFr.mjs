import { _ as __nuxt_component_0 } from './nuxt-link-DyZc7qn_.mjs';
import { ref, reactive, mergeProps, withCtx, createVNode, unref, openBlock, createBlock, useSSRContext, watch, isRef, toDisplayString } from 'vue';
import { u as useRouter$1, d as useCookie, e as VTextField, at as VDataTable, b as useRuntimeConfig } from './server.mjs';
import { ssrRenderComponent, ssrRenderStyle, ssrRenderAttr, ssrRenderClass, ssrIncludeBooleanAttr, ssrInterpolate } from 'vue/server-renderer';
import { _ as _imports_0, a as _imports_2$1, b as _imports_3, c as _imports_4 } from './mudarStatus-BMovbU8H.mjs';
import { _ as _imports_0$1 } from './sair-CV1ySkp8.mjs';
import { V as VAutocomplete, _ as _imports_1$1 } from './salvar-BSOMUYLt.mjs';
import { useVuelidate } from '@vuelidate/core';
import { helpers, required } from '@vuelidate/validators';
import { V as VDialog, a as VCard } from './VCard-e7pECtGK.mjs';
import { V as VContainer } from './VContainer-chgtNZst.mjs';
import { V as VRow } from './VRow-BuaJrtx0.mjs';
import { u as useFetch } from './fetch-Dsyde8UD.mjs';
import { _ as _imports_1 } from './visualizar-CsXww5Hd.mjs';
import { V as VCol } from './VCol-uBIoF0At.mjs';
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

const _sfc_main$1 = {
  __name: "Ordem",
  __ssrInlineRender: true,
  props: {
    show: Boolean,
    numero_os: Number
  },
  emits: ["close"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const isVisible = ref(props.show);
    const config = useRuntimeConfig();
    ref(useCookie("user-data").value.cartorio_token).value;
    `${config.public.managemant}/listarSelos`;
    `${config.public.managemant}/reimprimirSelo`;
    `${config.public.managemant}/listarEscrevente`;
    const selosItems = ref([]);
    ref([]);
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
      { title: "Forma", value: "numero" },
      { title: "Valor", value: "referencia" },
      {
        value: "actions"
      }
    ];
    watch(
      () => props.show,
      (newVal) => {
        isVisible.value = newVal;
      }
    );
    const closeModal = () => {
      isVisible.value = false;
      emit("close");
    };
    const escreventesItems = ref([]);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(VDialog, mergeProps({
        persistent: "",
        modelValue: unref(isVisible),
        "onUpdate:modelValue": ($event) => isRef(isVisible) ? isVisible.value = $event : null,
        "max-width": "650"
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VCard, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VContainer, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VRow, { class: "mb-5 mt-1 ml-2" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<h1${_scopeId4}>Ordem de Servi\xE7o n\xBA</h1><h1 style="${ssrRenderStyle({ "color": "red", "margin-left": "18px" })}"${_scopeId4}>${ssrInterpolate(props.numero_os)}</h1>`);
                            } else {
                              return [
                                createVNode("h1", null, "Ordem de Servi\xE7o n\xBA"),
                                createVNode("h1", { style: { "color": "red", "margin-left": "18px" } }, toDisplayString(props.numero_os), 1)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VContainer, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VRow, null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(VTextField, {
                                      class: "mr-5",
                                      label: "Recebido"
                                    }, null, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(VTextField, { label: "Falta Receber" }, null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(VTextField, {
                                        class: "mr-5",
                                        label: "Recebido"
                                      }),
                                      createVNode(VTextField, { label: "Falta Receber" })
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(VRow, null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(VAutocomplete, {
                                      class: "mb-5 mr-5",
                                      label: "Forma",
                                      modelValue: unref(state).escrevente,
                                      "onUpdate:modelValue": ($event) => unref(state).escrevente = $event,
                                      items: unref(escreventesItems),
                                      "item-title": "nome",
                                      "item-value": "token",
                                      required: "",
                                      "error-messages": unref(v$).escrevente.$errors.map((e) => e.$message),
                                      onBlur: unref(v$).escrevente.$touch,
                                      onInput: unref(v$).escrevente.$touch
                                    }, null, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(VTextField, { label: "Valor" }, null, _parent6, _scopeId5));
                                    _push6(`<div${_scopeId5}><img${ssrRenderAttr("src", _imports_0)} class="ml-5" style="${ssrRenderStyle({ "cursor": "pointer", "height": "40px", "width": "40px" })}"${_scopeId5}></div>`);
                                  } else {
                                    return [
                                      createVNode(VAutocomplete, {
                                        class: "mb-5 mr-5",
                                        label: "Forma",
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
                                      createVNode(VTextField, { label: "Valor" }),
                                      createVNode("div", null, [
                                        createVNode("img", {
                                          src: _imports_0,
                                          class: "ml-5",
                                          style: { "cursor": "pointer", "height": "40px", "width": "40px" },
                                          onClick: _ctx.reimprimeSelosAtos
                                        }, null, 8, ["onClick"])
                                      ])
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(VRow, null, {
                                  default: withCtx(() => [
                                    createVNode(VTextField, {
                                      class: "mr-5",
                                      label: "Recebido"
                                    }),
                                    createVNode(VTextField, { label: "Falta Receber" })
                                  ]),
                                  _: 1
                                }),
                                createVNode(VRow, null, {
                                  default: withCtx(() => [
                                    createVNode(VAutocomplete, {
                                      class: "mb-5 mr-5",
                                      label: "Forma",
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
                                    createVNode(VTextField, { label: "Valor" }),
                                    createVNode("div", null, [
                                      createVNode("img", {
                                        src: _imports_0,
                                        class: "ml-5",
                                        style: { "cursor": "pointer", "height": "40px", "width": "40px" },
                                        onClick: _ctx.reimprimeSelosAtos
                                      }, null, 8, ["onClick"])
                                    ])
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`<hr class="mb-5"${_scopeId3}>`);
                        _push4(ssrRenderComponent(VDataTable, {
                          headers,
                          items: unref(selosItems),
                          "item-value": "token"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VRow, { class: "mb-5 mt-1 ml-2" }, {
                            default: withCtx(() => [
                              createVNode("h1", null, "Ordem de Servi\xE7o n\xBA"),
                              createVNode("h1", { style: { "color": "red", "margin-left": "18px" } }, toDisplayString(props.numero_os), 1)
                            ]),
                            _: 1
                          }),
                          createVNode(VContainer, null, {
                            default: withCtx(() => [
                              createVNode(VRow, null, {
                                default: withCtx(() => [
                                  createVNode(VTextField, {
                                    class: "mr-5",
                                    label: "Recebido"
                                  }),
                                  createVNode(VTextField, { label: "Falta Receber" })
                                ]),
                                _: 1
                              }),
                              createVNode(VRow, null, {
                                default: withCtx(() => [
                                  createVNode(VAutocomplete, {
                                    class: "mb-5 mr-5",
                                    label: "Forma",
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
                                  createVNode(VTextField, { label: "Valor" }),
                                  createVNode("div", null, [
                                    createVNode("img", {
                                      src: _imports_0,
                                      class: "ml-5",
                                      style: { "cursor": "pointer", "height": "40px", "width": "40px" },
                                      onClick: _ctx.reimprimeSelosAtos
                                    }, null, 8, ["onClick"])
                                  ])
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode("hr", { class: "mb-5" }),
                          createVNode(VDataTable, {
                            headers,
                            items: unref(selosItems),
                            "item-value": "token"
                          }, null, 8, ["items"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<div style="${ssrRenderStyle({ "display": "flex", "justify-content": "flex-start" })}"${_scopeId2}><div class="ml-10"${_scopeId2}><img${ssrRenderAttr("src", _imports_0$1)} style="${ssrRenderStyle({ "cursor": "pointer" })}"${_scopeId2}></div><div class="ml-12"${_scopeId2}><img${ssrRenderAttr("src", _imports_1$1)} style="${ssrRenderStyle({ "cursor": "pointer" })}"${_scopeId2}></div></div>`);
                } else {
                  return [
                    createVNode(VContainer, null, {
                      default: withCtx(() => [
                        createVNode(VRow, { class: "mb-5 mt-1 ml-2" }, {
                          default: withCtx(() => [
                            createVNode("h1", null, "Ordem de Servi\xE7o n\xBA"),
                            createVNode("h1", { style: { "color": "red", "margin-left": "18px" } }, toDisplayString(props.numero_os), 1)
                          ]),
                          _: 1
                        }),
                        createVNode(VContainer, null, {
                          default: withCtx(() => [
                            createVNode(VRow, null, {
                              default: withCtx(() => [
                                createVNode(VTextField, {
                                  class: "mr-5",
                                  label: "Recebido"
                                }),
                                createVNode(VTextField, { label: "Falta Receber" })
                              ]),
                              _: 1
                            }),
                            createVNode(VRow, null, {
                              default: withCtx(() => [
                                createVNode(VAutocomplete, {
                                  class: "mb-5 mr-5",
                                  label: "Forma",
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
                                createVNode(VTextField, { label: "Valor" }),
                                createVNode("div", null, [
                                  createVNode("img", {
                                    src: _imports_0,
                                    class: "ml-5",
                                    style: { "cursor": "pointer", "height": "40px", "width": "40px" },
                                    onClick: _ctx.reimprimeSelosAtos
                                  }, null, 8, ["onClick"])
                                ])
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        createVNode("hr", { class: "mb-5" }),
                        createVNode(VDataTable, {
                          headers,
                          items: unref(selosItems),
                          "item-value": "token"
                        }, null, 8, ["items"])
                      ]),
                      _: 1
                    }),
                    createVNode("div", { style: { "display": "flex", "justify-content": "flex-start" } }, [
                      createVNode("div", { class: "ml-10" }, [
                        createVNode("img", {
                          src: _imports_0$1,
                          style: { "cursor": "pointer" },
                          onClick: closeModal
                        })
                      ]),
                      createVNode("div", { class: "ml-12" }, [
                        createVNode("img", {
                          src: _imports_1$1,
                          style: { "cursor": "pointer" },
                          onClick: _ctx.reimprimeSelosAtos
                        }, null, 8, ["onClick"])
                      ])
                    ])
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
                      createVNode(VRow, { class: "mb-5 mt-1 ml-2" }, {
                        default: withCtx(() => [
                          createVNode("h1", null, "Ordem de Servi\xE7o n\xBA"),
                          createVNode("h1", { style: { "color": "red", "margin-left": "18px" } }, toDisplayString(props.numero_os), 1)
                        ]),
                        _: 1
                      }),
                      createVNode(VContainer, null, {
                        default: withCtx(() => [
                          createVNode(VRow, null, {
                            default: withCtx(() => [
                              createVNode(VTextField, {
                                class: "mr-5",
                                label: "Recebido"
                              }),
                              createVNode(VTextField, { label: "Falta Receber" })
                            ]),
                            _: 1
                          }),
                          createVNode(VRow, null, {
                            default: withCtx(() => [
                              createVNode(VAutocomplete, {
                                class: "mb-5 mr-5",
                                label: "Forma",
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
                              createVNode(VTextField, { label: "Valor" }),
                              createVNode("div", null, [
                                createVNode("img", {
                                  src: _imports_0,
                                  class: "ml-5",
                                  style: { "cursor": "pointer", "height": "40px", "width": "40px" },
                                  onClick: _ctx.reimprimeSelosAtos
                                }, null, 8, ["onClick"])
                              ])
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode("hr", { class: "mb-5" }),
                      createVNode(VDataTable, {
                        headers,
                        items: unref(selosItems),
                        "item-value": "token"
                      }, null, 8, ["items"])
                    ]),
                    _: 1
                  }),
                  createVNode("div", { style: { "display": "flex", "justify-content": "flex-start" } }, [
                    createVNode("div", { class: "ml-10" }, [
                      createVNode("img", {
                        src: _imports_0$1,
                        style: { "cursor": "pointer" },
                        onClick: closeModal
                      })
                    ]),
                    createVNode("div", { class: "ml-12" }, [
                      createVNode("img", {
                        src: _imports_1$1,
                        style: { "cursor": "pointer" },
                        onClick: _ctx.reimprimeSelosAtos
                      }, null, 8, ["onClick"])
                    ])
                  ])
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
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Recebimento/Ordem.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _imports_2 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFUAAABVCAYAAAA49ahaAAAACXBIWXMAABOvAAATrwFj5o7DAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAADWFJREFUeJztnXtwVOd5xp/nO2d3xQohrgYXM8Rjxm2ZkMQRCRHBJNrVBUiBJgxqbULjC5YZ125N49aTJq5MnbppXbeJmRgkoNOp7diFOoVgY5CQhDEVTIJMgpk0deykriEO4SbQBUm753v6x0oUS7vsCvasxOU3s//sfpf3PPud873f7T2UhGRwNd254xZOwYjuexzLMlpNAzVKoAuJJJPmu6oQIEKE4gDPiniXRH08FNq45xfb3le14smyMZmoJbXz5xjFl4AmAmCygHxCAQGGuBbU/DCCRMAKjBHoAHAUso2W8Zebqpr29k//IVEXrFkwqiMYK3VplgOaDXIChGtOxPRIAI4Dao4Lz+X3BHZtf2j72b5fz4u6YM2CUV7QmxWjngD4SQKBoTL5SkFSDOBB19Njrufu7xPW9CVod3rKY9A3Ac4EdF3QTCACIIriLv663ekp7/vaAIlnaMB1loG8DZDD63d8RiR0kgPgkwGXy0pqS+YAgMvVdCOTSpeAnE0wgOSCWkndBM/IoIOiB3nJ3YarCToU5cAiH1AhyRAuuLuBPmERADDbwP0lwWbOXbPwZjfYvQXEjGSdkiSBPAGimTIvxMIde98IvXFSS9WTmysbOljJ4O2Lbh/ndI2YS6s7BRRTGJ/Mn0x4Bzh8ui2+yMWI7nvgYXJKQQ0P0WpdLNy1tbOz80zLl1u6BNncXNbQok3qIXmsqKZoWzgc3hPszFsk8gEBM9jvllaiBU8uLDB3u45lmaD8JDe9BXmSVuvOjQ1ta15a90GOrmVYIckC6ATQOXvdwlfCphvW4gkajkO/R4GgfIgVhlbTkrlPkrpBNMfyu7Y2L912NEfXMKxpXrntKIzdQoN9grr7/04gQGKaATFKkBmYgGcUw4udnZ1ncmPylUGrbW2zcbwEcYAuiREnCl0AbrKhpww6utW2t6WqpSsn1ibh8+vLlzvAp/t/T5hTwZvM09vn//8oJle0VLV0ferZ8r0jiY6BdpEAXFcQk/mlFL194/YdH8pOyRH/HMCM/t8LirnH3BcB5FxUQZYTKo9FTp2OgwNucAiiSenoy9O14DZdClq6qQfGJG1sBDFQ6utcNsNWVJIGw9i+i+EOtQF9lKwuycPk4GJjuQTUrEhN+UQAoRTJAx2x7h9HaypOE/w5jPY6Pdha92Ddj3r9yiFlyEWNboxOlRf4K3NjcAksRiXm2jPIKIRATBI0CcLt8QAfLVlXdqp0XcWrjNnv1D9Uf9B341MwZKLOrJ0ZLsSYbwLu/YQNp5jIGQQyJMcL+IpCZllk/fwDruNV191TV5cVgwfBkDyzStd/6dZCjP8RZFYByIKgF5AoyiXsZzzPbI/Ulu8urSmdnr0K0pNzUcs2lt0GdewDNN3XaVsBkByCn4Nxfhitmfdo5ebKoI81nienopauL73V80yDgLG5rFdCPmj/9tSps6+Ubiid6Hd9ORN1wZoFoyB3G4Exuarzw5CCyhQ3r5X8S8loP2vKiagkzbk8PSbo1swzSbi4HzD4lQcCMDgyIX9C56DzDoKciBrZEJlC2T/OMLkVdMCJYRnE/0qWgEJcwtcBbhZwWsx0IZ1H3BFcsWnpJl+H3zkR1djggwRGXDRRQpRzIu5rrKr7VN0DdS8C8pIlFaGRodB/NFTtqBw/pnCSC30F4k97W3eqCnqM8ZbuXL7zN5dzLZngu5/60c2VIydKf5guHYEe4+r3B+tX9ra65wA8F9kwb7HxtEbElP6Fw5qv16/YsX8wZV8qvrfUCWePf0TSpHTpJD57uY5644odW8eOLZwm2acAnB+uUtw199ezvn05ZQ8G30VlV+gWQ178jiC6rNO9MRv1bVq6qafx/vq/MMZ+FsAZkCdacWJxdXV10s1kfuC7qI6rGUrbUbOtzWv7RTbrrV9Rv5/G+21ruksOVB3wtbfvj+/PVEs7Nu1/58GXv3fXil3HABzLfskXx//en0zvvlCjwl54mu+25AjfRRX5q7SJiFCA4UeYbNHnCsT3izDWeyujhI7ujNaW/X3J6pI8n03yHd+fqbGe8P84we5zaZ1/wRH4Z5wUiJZtLPvGmFFj6v22zS98b6mRk0XvkzqcYXLS8BPWOltPnT77FsnJvhrnE76LWl1dHXcNn0SmEyC986CCbpWU0ynCbJGT5ZSeIz07eGPghyRnXcLc0kAotz3W/a3SZxc8b+Lxn8ROx95vqm4asp00/clJb9tU3dRFp+APBLVmpUCRFBbL9TZ7I3iIvxV6K1pb9o+lNaXTS3YPfUeXMxem4d6X33OMIgCzu1VHyKM0DTCrROeQ+XnwcHTjvEf9noi+GDn1C+vvrT8YHhOYTuBdn6pwINxCT99iLPi/0ZqKJ1avXp3zFeOcO9vblm47uqtq5zQDuxqJzbRZRwAoFID4xhs37jtaUVMx1496UjFkI5j6qvrHQ93OjQb8NojTfh3LFHRDnGyK1FR8LVcjtiEdFm5/aPvZ+qodq0Jdzke8GOZbsAlER/b1lSHxN5Ga8tW5EHbIt/0ACXEB7CBYF90QnRDzTJFLLofwRTDlfqrBQhh+LVI77xCqsDlLZSZlWIjahyCLFTgGYDuA7ZGaircIfDR7FciB9EzphtI9vdOCvjCsZ4WYcomaFsAhEW1IcbQ+daGYJLp3Xa5tF2NYi5oaeZR3B018BsA/gfg2L1iTSp8bK/x0ta5QUYFwKGwb7m14r+H+nWvO8MRttFwJ4GQmeQndtPum3b/jl21XrKgXcqDqQGf9yh3rY3kmIuhE2gxUiArd4pc9V4Wofez5o9cOycOqNNuFAJHG2rTL5pfKVSUqAHgFBQ0U29Klk4xvcwM5FbVsY9kXImt/r8jPOiaFnDZB7enSGfp3nClnos5dO/9j1pp/pxv7z2hNdGHv6ZOs03W6Kw9KP2AgM3j2XiI5EbXiHypucI3dCSEPQkh0t0ZqSp/2Y2dzu9c+FWS6PbCWlr/Odt19+C7qzNqZ4VihtpI43zEQIGgePnm69e2S2vlzslUXV9NFwP07JDnAfCEiOoJjgz/NVr398VVUgmY0xz5D8TMDfhQAcKoDvR6pLd/92fXln7isukgTmVz+OMRIerv0s20+Hrf3dexfWlv+pwLuvlgaQYbg50YILdHaisNwtXZcwejnNy3dlLaz6SO6MTo1WluxVlbz+keMGFgfAHBdpmVfCr6JWvHdilk2gCeR4d0gwID4GGJce7L1zD9Faiv+G8CU5AoJbZ3dH49sqCg3Hr8IusWSQhntpiaOdLW3bcn8SgaPfy31HH4pVz8mk9z6qRAS7UzII/Dx1OkYMC6/B4miElJmIKgAWegvm1c1n8rYpkvAt2fqzkd2/kah2HwAL/XOKmUPAoDMYEPm0WrLDaNH/1tWbUmCrx1V011NrXM/mL3cWKwEMNRhQ948d67d90MUQI52qNSv3LGe9D4N4hUkdqPmFFH73bOY7/dt30fORlS77tv1dmNV3WLj2MUAfjKY+c9LhoiJqtGvYiU7H/H/VEofOV1O6T2L/yqAVxMnSfCwqGIBoWyu9RHwBL0JN/hw492vNGex6IwYsjWqxhU7tgLYGn06OhVhZxkcLpHwu4YMJQvplAFWxFmK9R74TFPVawOCxeaKIV/4a/hqw3sAngTwZOXmymBre2txrFufN+R0GH4BQn6KrCdBHJf0LsWD8OKvNT3QuH84hMwbclEvpLdnfr33g2htxSEkCaEEIJYfDM35wV0/+Fku7cuUq26SejhwXVQfMClXc+iQlcxJJIcrjcrNlUFYm7RBCoLbu0g2MNYf5RRHiieQ/GCowhJ51FOpYv3FJ8bTHyXyAYKm/Hj5RLnGTeoGEnIBxAUNDKJokR9yC+YU1RRtg09bHtOx+76655A4IT1sKKotyusJYjY95PdvioIEIW4gnE0+ulEhre4Mh8OFuTH3ymC0GV1A4Q5QA3QhYEGcMaLeERAbkIAMCSgOduYtmr1u4RV59CbbzF63cHI8zkX0NNuAAxYXBcZg8Y5Lw12wmAag/wEEQ2G8yAfCphulG0q3tNrWtpb7W7qGQ+i3XEHSFNUU5Y02owuC4ALHmAcFjEeSfohAJ2HrOPdfF97snuveAmgGkgWnBSSrEzTYZ+N4qce079k3bt/xayEMKCsZLI4UTwi5BXMo3EFPs2U4PsWSjRVwmG3xRcTjcCOTSp8CeSfAG1KUbwV1QzwD2g5axOEkjx96VWFByQZAkw+q0IAhpfLtiWOe7Pder9r1iKtqxUtqS14m3ZthsQBEIEmgWkNwBIgRgEkUe/W/OiGxln5+z0fyDVpKvF8pRth9RPz7ghIObFNV014T0/PG8CBFL30kiesACUFJeqDejMX1Qt9rlM435aAXrDOO85iAFoADvIHrJEGMCWpR3Dw+0gueD6oz4H1U7U5PuWucL9OomOD4lM+QaxsL6ATA5ljce2GkF6xL+j6qCympLZlj4H4JMFEAk3vfWBEQaXgNvvRLgEhYCTECnQKOWNgGwv1+ssnwpKICiTHubU9HphQWmLshVpCYRqEQZMow9lcdiVkRSYiDOgPhHQNbp3b9c+NXG99PNSH+fzZMXGHcTk4pAAAAAElFTkSuQmCC";
const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const config = useRuntimeConfig();
    const allUsuarios = `${config.public.managemant}/listarUsuarios`;
    const allServicos = `${config.public.managemant}/listarOrdensServico`;
    const allTiposAtos = `${config.public.managemant}/tipoAtos`;
    const router = useRouter$1();
    const usuario_token = ref(useCookie("auth_token").value) || null;
    const cartorio_token = ref(useCookie("user-data").value.cartorio_token) || null;
    const servicosItems = ref([]);
    const usuariosItems = ref([]);
    const tipoAtosItems = ref([]);
    const situacaoItems = ref(["PENDENTE", "EM ANDAMENTO", "CONCLU\xCDDA", "LAVRADA"]);
    const isModalRecebimentoOpen = ref(false);
    const showCreateOrdemServ = ref(null);
    const numero_os = ref(null);
    const state = reactive({
      numero: null,
      data_inicio: getCurrentDate(),
      data_fim: getCurrentDate(),
      data_lavratura_inicio: null,
      data_lavratura_fim: null,
      protocolo: null,
      livro: null,
      folha: null,
      situacao: null,
      usuario_token: usuario_token.value,
      selo: null,
      ato_tipo_token: null,
      apresentante: null
    });
    const headers = [
      { title: "N\xFAmero", value: "numero" },
      { title: "Situa\xE7\xE3o", value: "situacao" },
      { title: "CPF", value: "apresentante_cpf" },
      { title: "Apresentante", value: "apresentante_nome" },
      { title: "Usuario", value: "usuario_nome" },
      { title: "Data Recebimento", value: "dt_pagto" },
      {
        value: "actions"
      }
    ];
    function getCurrentDate() {
      const today = /* @__PURE__ */ new Date();
      const yyyy = today.getFullYear();
      const MM = String(today.getMonth() + 1).padStart(2, "0");
      const dd = String(today.getDate()).padStart(2, "0");
      return `${yyyy}-${MM}-${dd}`;
    }
    async function usuariosDataPayload() {
      const { data: usuarioData, error } = await useFetch(allUsuarios, {
        method: "POST",
        body: {
          cartorio_token: cartorio_token.value
        }
      }, "$865v1qFEsl");
      usuariosItems.value = usuarioData.value;
    }
    async function searchOrdersService() {
      try {
        const { data: servicosData, error } = await useFetch(allServicos, {
          method: "POST",
          body: {
            cartorio_token: cartorio_token.value,
            numero: state.numero,
            data_inicio: state.data_inicio,
            data_fim: state.data_fim,
            data_lavratura_inicio: state.data_lavratura_inicio,
            data_lavratura_fim: state.data_lavratura_fim,
            protocolo: state.protocolo,
            livro: state.livro,
            folha: state.folha,
            situacao: state.situacao,
            usuario_token: state.usuario_token,
            selo: state.selo,
            ato_tipo_token: state.ato_tipo_token,
            apresentante: state.apresentante
          }
        }, "$GorUGsNsKS");
        if (servicosData.value.length > 0) {
          servicosItems.value = servicosData.value;
        } else {
          servicosItems.value = [];
        }
      } catch (error) {
        console.error("Erro na requisi\xE7\xE3o", error);
      }
    }
    async function tipoAtosDataPayload() {
      const { data: tipoAtosData, error } = await useFetch(allTiposAtos, {
        method: "POST",
        body: {
          cartorio_token: cartorio_token.value,
          usuario_token: usuario_token.value
        }
      }, "$wkWiNo8Od3");
      tipoAtosItems.value = tipoAtosData.value;
    }
    async function servicosDataTable() {
      const currentDate = getCurrentDate();
      const { data: servicosData, error } = await useFetch(allServicos, {
        method: "POST",
        body: {
          cartorio_token: cartorio_token.value,
          usuario_token: usuario_token.value,
          data_fim: currentDate,
          data_inicio: currentDate
        }
      }, "$zDH8ovqZZe");
      if (servicosData.value.length > 0) {
        servicosItems.value = servicosData.value;
        console.log(servicosData.value);
      } else {
        servicosItems.value = [];
      }
    }
    usuariosDataPayload();
    tipoAtosDataPayload();
    servicosDataTable();
    async function deleteEndereco(item) {
      console.log("excluido");
    }
    function redirectToUpdate(id) {
      const serviceCookie = useCookie("user-service");
      const servico = servicosItems.value.find(
        (item) => item.id === id
      );
      serviceCookie.value = servico.token;
      router.push({ path: `/ordens-servicos/atualizar/${id}` });
    }
    function redirectToRecebimento(numero) {
      console.log(numero);
      numero_os.value = numero;
      isModalRecebimentoOpen.value = true;
    }
    const showCreateOrdem = () => {
      const serviceCookie = useCookie("user-service");
      const isTrueOrdemServ = useCookie("ordem-button");
      serviceCookie.value = null;
      showCreateOrdemServ.value = true;
      isTrueOrdemServ.value = showCreateOrdemServ.value;
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      const _component_RecebimentoOrdem = _sfc_main$1;
      _push(ssrRenderComponent(VContainer, mergeProps({ class: "mt-5" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VRow, { class: "mb-5" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<h1${_scopeId2}>Ordens de Servi\xE7o</h1>`);
                  _push3(ssrRenderComponent(_component_NuxtLink, { to: "/ordens-servicos/criar-registro" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<img style="${ssrRenderStyle({ "width": "60px", "height": "60px", "cursor": "pointer", "margin-left": "70px" })}"${ssrRenderAttr("src", _imports_0)} alt="novo"${_scopeId3}>`);
                      } else {
                        return [
                          createVNode("img", {
                            style: { "width": "60px", "height": "60px", "cursor": "pointer", "margin-left": "70px" },
                            src: _imports_0,
                            alt: "novo",
                            onClick: showCreateOrdem
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode("h1", null, "Ordens de Servi\xE7o"),
                    createVNode(_component_NuxtLink, { to: "/ordens-servicos/criar-registro" }, {
                      default: withCtx(() => [
                        createVNode("img", {
                          style: { "width": "60px", "height": "60px", "cursor": "pointer", "margin-left": "70px" },
                          src: _imports_0,
                          alt: "novo",
                          onClick: showCreateOrdem
                        })
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(VRow, { style: { "margin-bottom": "-35px" } }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VCol, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VTextField, {
                          modelValue: unref(state).numero,
                          "onUpdate:modelValue": ($event) => unref(state).numero = $event,
                          label: "N\xFAmero",
                          style: { "width": "110px" }
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VTextField, {
                            modelValue: unref(state).numero,
                            "onUpdate:modelValue": ($event) => unref(state).numero = $event,
                            label: "N\xFAmero",
                            style: { "width": "110px" }
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VCol, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VTextField, {
                          modelValue: unref(state).data_inicio,
                          "onUpdate:modelValue": ($event) => unref(state).data_inicio = $event,
                          type: "date",
                          label: "Abertura de",
                          style: { "width": "150px" }
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VTextField, {
                            modelValue: unref(state).data_inicio,
                            "onUpdate:modelValue": ($event) => unref(state).data_inicio = $event,
                            type: "date",
                            label: "Abertura de",
                            style: { "width": "150px" }
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VCol, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VTextField, {
                          modelValue: unref(state).data_fim,
                          "onUpdate:modelValue": ($event) => unref(state).data_fim = $event,
                          type: "date",
                          label: "Abertura at\xE9",
                          style: { "width": "150px" }
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VTextField, {
                            modelValue: unref(state).data_fim,
                            "onUpdate:modelValue": ($event) => unref(state).data_fim = $event,
                            type: "date",
                            label: "Abertura at\xE9",
                            style: { "width": "150px" }
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VCol, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VTextField, {
                          modelValue: unref(state).data_lavratura_inicio,
                          "onUpdate:modelValue": ($event) => unref(state).data_lavratura_inicio = $event,
                          type: "date",
                          label: "Lavratura de",
                          style: { "width": "150px" }
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VTextField, {
                            modelValue: unref(state).data_lavratura_inicio,
                            "onUpdate:modelValue": ($event) => unref(state).data_lavratura_inicio = $event,
                            type: "date",
                            label: "Lavratura de",
                            style: { "width": "150px" }
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VCol, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VTextField, {
                          modelValue: unref(state).data_lavratura_fim,
                          "onUpdate:modelValue": ($event) => unref(state).data_lavratura_fim = $event,
                          type: "date",
                          label: "Lavratura at\xE9",
                          style: { "width": "150px" }
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VTextField, {
                            modelValue: unref(state).data_lavratura_fim,
                            "onUpdate:modelValue": ($event) => unref(state).data_lavratura_fim = $event,
                            type: "date",
                            label: "Lavratura at\xE9",
                            style: { "width": "150px" }
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VCol, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VTextField, {
                          modelValue: unref(state).protocolo,
                          "onUpdate:modelValue": ($event) => unref(state).protocolo = $event,
                          label: "Protocolo",
                          style: { "width": "110px" }
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VTextField, {
                            modelValue: unref(state).protocolo,
                            "onUpdate:modelValue": ($event) => unref(state).protocolo = $event,
                            label: "Protocolo",
                            style: { "width": "110px" }
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VCol, { md: "1" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VTextField, {
                          modelValue: unref(state).livro,
                          "onUpdate:modelValue": ($event) => unref(state).livro = $event,
                          label: "Livro",
                          style: { "width": "80px" }
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VTextField, {
                            modelValue: unref(state).livro,
                            "onUpdate:modelValue": ($event) => unref(state).livro = $event,
                            label: "Livro",
                            style: { "width": "80px" }
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VCol, { md: "1" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VTextField, {
                          modelValue: unref(state).folha,
                          "onUpdate:modelValue": ($event) => unref(state).folha = $event,
                          label: "Folha",
                          style: { "width": "80px" }
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VTextField, {
                            modelValue: unref(state).folha,
                            "onUpdate:modelValue": ($event) => unref(state).folha = $event,
                            label: "Folha",
                            style: { "width": "80px" }
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VCol, null, {
                      default: withCtx(() => [
                        createVNode(VTextField, {
                          modelValue: unref(state).numero,
                          "onUpdate:modelValue": ($event) => unref(state).numero = $event,
                          label: "N\xFAmero",
                          style: { "width": "110px" }
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, null, {
                      default: withCtx(() => [
                        createVNode(VTextField, {
                          modelValue: unref(state).data_inicio,
                          "onUpdate:modelValue": ($event) => unref(state).data_inicio = $event,
                          type: "date",
                          label: "Abertura de",
                          style: { "width": "150px" }
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, null, {
                      default: withCtx(() => [
                        createVNode(VTextField, {
                          modelValue: unref(state).data_fim,
                          "onUpdate:modelValue": ($event) => unref(state).data_fim = $event,
                          type: "date",
                          label: "Abertura at\xE9",
                          style: { "width": "150px" }
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, null, {
                      default: withCtx(() => [
                        createVNode(VTextField, {
                          modelValue: unref(state).data_lavratura_inicio,
                          "onUpdate:modelValue": ($event) => unref(state).data_lavratura_inicio = $event,
                          type: "date",
                          label: "Lavratura de",
                          style: { "width": "150px" }
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, null, {
                      default: withCtx(() => [
                        createVNode(VTextField, {
                          modelValue: unref(state).data_lavratura_fim,
                          "onUpdate:modelValue": ($event) => unref(state).data_lavratura_fim = $event,
                          type: "date",
                          label: "Lavratura at\xE9",
                          style: { "width": "150px" }
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, null, {
                      default: withCtx(() => [
                        createVNode(VTextField, {
                          modelValue: unref(state).protocolo,
                          "onUpdate:modelValue": ($event) => unref(state).protocolo = $event,
                          label: "Protocolo",
                          style: { "width": "110px" }
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, { md: "1" }, {
                      default: withCtx(() => [
                        createVNode(VTextField, {
                          modelValue: unref(state).livro,
                          "onUpdate:modelValue": ($event) => unref(state).livro = $event,
                          label: "Livro",
                          style: { "width": "80px" }
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, { md: "1" }, {
                      default: withCtx(() => [
                        createVNode(VTextField, {
                          modelValue: unref(state).folha,
                          "onUpdate:modelValue": ($event) => unref(state).folha = $event,
                          label: "Folha",
                          style: { "width": "80px" }
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(VRow, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VCol, { md: "3" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VAutocomplete, {
                          modelValue: unref(state).situacao,
                          "onUpdate:modelValue": ($event) => unref(state).situacao = $event,
                          items: unref(situacaoItems),
                          label: "Situa\xE7\xE3o"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VAutocomplete, {
                            modelValue: unref(state).situacao,
                            "onUpdate:modelValue": ($event) => unref(state).situacao = $event,
                            items: unref(situacaoItems),
                            label: "Situa\xE7\xE3o"
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VCol, { md: "2" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VAutocomplete, {
                          items: unref(usuariosItems),
                          modelValue: unref(state).usuario_token,
                          "onUpdate:modelValue": ($event) => unref(state).usuario_token = $event,
                          "item-title": "user_nome",
                          "item-value": "user_token",
                          label: "Usuario"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VAutocomplete, {
                            items: unref(usuariosItems),
                            modelValue: unref(state).usuario_token,
                            "onUpdate:modelValue": ($event) => unref(state).usuario_token = $event,
                            "item-title": "user_nome",
                            "item-value": "user_token",
                            label: "Usuario"
                          }, null, 8, ["items", "modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VCol, { md: "1" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VTextField, {
                          modelValue: unref(state).selo,
                          "onUpdate:modelValue": ($event) => unref(state).selo = $event,
                          label: "Selo"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VTextField, {
                            modelValue: unref(state).selo,
                            "onUpdate:modelValue": ($event) => unref(state).selo = $event,
                            label: "Selo"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VCol, { md: "3" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VAutocomplete, {
                          modelValue: unref(state).ato_tipo_token,
                          "onUpdate:modelValue": ($event) => unref(state).ato_tipo_token = $event,
                          items: unref(tipoAtosItems),
                          "item-title": "descricao",
                          "item-value": "token",
                          label: "Servi\xE7o"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VAutocomplete, {
                            modelValue: unref(state).ato_tipo_token,
                            "onUpdate:modelValue": ($event) => unref(state).ato_tipo_token = $event,
                            items: unref(tipoAtosItems),
                            "item-title": "descricao",
                            "item-value": "token",
                            label: "Servi\xE7o"
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VCol, { md: "2" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VTextField, {
                          modelValue: unref(state).apresentante,
                          "onUpdate:modelValue": ($event) => unref(state).apresentante = $event,
                          label: "Apresentante"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VTextField, {
                            modelValue: unref(state).apresentante,
                            "onUpdate:modelValue": ($event) => unref(state).apresentante = $event,
                            label: "Apresentante"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VCol, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div${_scopeId3}><img style="${ssrRenderStyle({ "width": "40px", "height": "40px", "cursor": "pointer" })}"${ssrRenderAttr("src", _imports_1)} alt="Pesquisar"${_scopeId3}></div>`);
                      } else {
                        return [
                          createVNode("div", null, [
                            createVNode("img", {
                              onClick: searchOrdersService,
                              style: { "width": "40px", "height": "40px", "cursor": "pointer" },
                              src: _imports_1,
                              alt: "Pesquisar"
                            })
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VCol, { md: "3" }, {
                      default: withCtx(() => [
                        createVNode(VAutocomplete, {
                          modelValue: unref(state).situacao,
                          "onUpdate:modelValue": ($event) => unref(state).situacao = $event,
                          items: unref(situacaoItems),
                          label: "Situa\xE7\xE3o"
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, { md: "2" }, {
                      default: withCtx(() => [
                        createVNode(VAutocomplete, {
                          items: unref(usuariosItems),
                          modelValue: unref(state).usuario_token,
                          "onUpdate:modelValue": ($event) => unref(state).usuario_token = $event,
                          "item-title": "user_nome",
                          "item-value": "user_token",
                          label: "Usuario"
                        }, null, 8, ["items", "modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, { md: "1" }, {
                      default: withCtx(() => [
                        createVNode(VTextField, {
                          modelValue: unref(state).selo,
                          "onUpdate:modelValue": ($event) => unref(state).selo = $event,
                          label: "Selo"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, { md: "3" }, {
                      default: withCtx(() => [
                        createVNode(VAutocomplete, {
                          modelValue: unref(state).ato_tipo_token,
                          "onUpdate:modelValue": ($event) => unref(state).ato_tipo_token = $event,
                          items: unref(tipoAtosItems),
                          "item-title": "descricao",
                          "item-value": "token",
                          label: "Servi\xE7o"
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, { md: "2" }, {
                      default: withCtx(() => [
                        createVNode(VTextField, {
                          modelValue: unref(state).apresentante,
                          "onUpdate:modelValue": ($event) => unref(state).apresentante = $event,
                          label: "Apresentante"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, null, {
                      default: withCtx(() => [
                        createVNode("div", null, [
                          createVNode("img", {
                            onClick: searchOrdersService,
                            style: { "width": "40px", "height": "40px", "cursor": "pointer" },
                            src: _imports_1,
                            alt: "Pesquisar"
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
            _push2(`<hr class="mt-5 mb-5"${_scopeId}>`);
            _push2(ssrRenderComponent(VDataTable, {
              headers,
              items: unref(servicosItems),
              "item-key": "id"
            }, {
              "item.actions": withCtx(({ item }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VRow, { style: { "display": "flex", "gap": "10px", "margin-top": "-5px" } }, {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div title="Receber"${_scopeId3}><img style="${ssrRenderStyle({ "width": "30px", "height": "30px", "cursor": "pointer" })}"${ssrRenderAttr("src", _imports_2)} alt="Receber"${_scopeId3}></div><div class="${ssrRenderClass({ disabled: !item.btn_editar })}"${ssrRenderAttr("title", item.btn_editar ? "Editar" : "Desabilitado")}${_scopeId3}><img style="${ssrRenderStyle({
                          cursor: item.btn_editar ? "pointer" : "default",
                          width: "30px",
                          height: "30px"
                        })}"${ssrRenderAttr("src", _imports_2$1)} alt="Editar"${_scopeId3}></div><div${ssrIncludeBooleanAttr(!item.btn_cancelar) ? " disabled" : ""} title="Excluir"${_scopeId3}>`);
                        if (item.excluido) {
                          _push4(`<img style="${ssrRenderStyle({ "width": "30px", "height": "30px", "cursor": "pointer" })}"${ssrRenderAttr("src", _imports_3)} alt="Visualizar" title="Reativar"${_scopeId3}>`);
                        } else {
                          _push4(`<img${ssrRenderAttr("src", _imports_4)} alt="Excluir" class="trash-icon" style="${ssrRenderStyle({ "width": "30px", "height": "30px", "cursor": "pointer" })}" title="Excluir"${_scopeId3}>`);
                        }
                        _push4(`</div>`);
                      } else {
                        return [
                          createVNode("div", {
                            onClick: ($event) => redirectToRecebimento(item.numero),
                            title: "Receber"
                          }, [
                            createVNode("img", {
                              style: { "width": "30px", "height": "30px", "cursor": "pointer" },
                              src: _imports_2,
                              alt: "Receber"
                            })
                          ], 8, ["onClick"]),
                          createVNode("div", {
                            class: { disabled: !item.btn_editar },
                            onClick: ($event) => item.btn_editar ? redirectToUpdate(item.id) : null,
                            title: item.btn_editar ? "Editar" : "Desabilitado"
                          }, [
                            createVNode("img", {
                              style: {
                                cursor: item.btn_editar ? "pointer" : "default",
                                width: "30px",
                                height: "30px"
                              },
                              src: _imports_2$1,
                              alt: "Editar"
                            }, null, 4)
                          ], 10, ["onClick", "title"]),
                          createVNode("div", {
                            disabled: !item.btn_cancelar,
                            onClick: ($event) => item.btn_cancelar ? deleteEndereco() : null,
                            title: "Excluir"
                          }, [
                            item.excluido ? (openBlock(), createBlock("img", {
                              key: 0,
                              style: { "width": "30px", "height": "30px", "cursor": "pointer" },
                              src: _imports_3,
                              alt: "Visualizar",
                              title: "Reativar"
                            })) : (openBlock(), createBlock("img", {
                              key: 1,
                              src: _imports_4,
                              alt: "Excluir",
                              class: "trash-icon",
                              style: { "width": "30px", "height": "30px", "cursor": "pointer" },
                              title: "Excluir"
                            }))
                          ], 8, ["disabled", "onClick"])
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VRow, { style: { "display": "flex", "gap": "10px", "margin-top": "-5px" } }, {
                      default: withCtx(() => [
                        createVNode("div", {
                          onClick: ($event) => redirectToRecebimento(item.numero),
                          title: "Receber"
                        }, [
                          createVNode("img", {
                            style: { "width": "30px", "height": "30px", "cursor": "pointer" },
                            src: _imports_2,
                            alt: "Receber"
                          })
                        ], 8, ["onClick"]),
                        createVNode("div", {
                          class: { disabled: !item.btn_editar },
                          onClick: ($event) => item.btn_editar ? redirectToUpdate(item.id) : null,
                          title: item.btn_editar ? "Editar" : "Desabilitado"
                        }, [
                          createVNode("img", {
                            style: {
                              cursor: item.btn_editar ? "pointer" : "default",
                              width: "30px",
                              height: "30px"
                            },
                            src: _imports_2$1,
                            alt: "Editar"
                          }, null, 4)
                        ], 10, ["onClick", "title"]),
                        createVNode("div", {
                          disabled: !item.btn_cancelar,
                          onClick: ($event) => item.btn_cancelar ? deleteEndereco() : null,
                          title: "Excluir"
                        }, [
                          item.excluido ? (openBlock(), createBlock("img", {
                            key: 0,
                            style: { "width": "30px", "height": "30px", "cursor": "pointer" },
                            src: _imports_3,
                            alt: "Visualizar",
                            title: "Reativar"
                          })) : (openBlock(), createBlock("img", {
                            key: 1,
                            src: _imports_4,
                            alt: "Excluir",
                            class: "trash-icon",
                            style: { "width": "30px", "height": "30px", "cursor": "pointer" },
                            title: "Excluir"
                          }))
                        ], 8, ["disabled", "onClick"])
                      ]),
                      _: 2
                    }, 1024)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_RecebimentoOrdem, {
              show: unref(isModalRecebimentoOpen),
              numero_os: unref(numero_os),
              onClose: ($event) => isModalRecebimentoOpen.value = false
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(VRow, { class: "mb-5" }, {
                default: withCtx(() => [
                  createVNode("h1", null, "Ordens de Servi\xE7o"),
                  createVNode(_component_NuxtLink, { to: "/ordens-servicos/criar-registro" }, {
                    default: withCtx(() => [
                      createVNode("img", {
                        style: { "width": "60px", "height": "60px", "cursor": "pointer", "margin-left": "70px" },
                        src: _imports_0,
                        alt: "novo",
                        onClick: showCreateOrdem
                      })
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(VRow, { style: { "margin-bottom": "-35px" } }, {
                default: withCtx(() => [
                  createVNode(VCol, null, {
                    default: withCtx(() => [
                      createVNode(VTextField, {
                        modelValue: unref(state).numero,
                        "onUpdate:modelValue": ($event) => unref(state).numero = $event,
                        label: "N\xFAmero",
                        style: { "width": "110px" }
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(VCol, null, {
                    default: withCtx(() => [
                      createVNode(VTextField, {
                        modelValue: unref(state).data_inicio,
                        "onUpdate:modelValue": ($event) => unref(state).data_inicio = $event,
                        type: "date",
                        label: "Abertura de",
                        style: { "width": "150px" }
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(VCol, null, {
                    default: withCtx(() => [
                      createVNode(VTextField, {
                        modelValue: unref(state).data_fim,
                        "onUpdate:modelValue": ($event) => unref(state).data_fim = $event,
                        type: "date",
                        label: "Abertura at\xE9",
                        style: { "width": "150px" }
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(VCol, null, {
                    default: withCtx(() => [
                      createVNode(VTextField, {
                        modelValue: unref(state).data_lavratura_inicio,
                        "onUpdate:modelValue": ($event) => unref(state).data_lavratura_inicio = $event,
                        type: "date",
                        label: "Lavratura de",
                        style: { "width": "150px" }
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(VCol, null, {
                    default: withCtx(() => [
                      createVNode(VTextField, {
                        modelValue: unref(state).data_lavratura_fim,
                        "onUpdate:modelValue": ($event) => unref(state).data_lavratura_fim = $event,
                        type: "date",
                        label: "Lavratura at\xE9",
                        style: { "width": "150px" }
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(VCol, null, {
                    default: withCtx(() => [
                      createVNode(VTextField, {
                        modelValue: unref(state).protocolo,
                        "onUpdate:modelValue": ($event) => unref(state).protocolo = $event,
                        label: "Protocolo",
                        style: { "width": "110px" }
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(VCol, { md: "1" }, {
                    default: withCtx(() => [
                      createVNode(VTextField, {
                        modelValue: unref(state).livro,
                        "onUpdate:modelValue": ($event) => unref(state).livro = $event,
                        label: "Livro",
                        style: { "width": "80px" }
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(VCol, { md: "1" }, {
                    default: withCtx(() => [
                      createVNode(VTextField, {
                        modelValue: unref(state).folha,
                        "onUpdate:modelValue": ($event) => unref(state).folha = $event,
                        label: "Folha",
                        style: { "width": "80px" }
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(VRow, null, {
                default: withCtx(() => [
                  createVNode(VCol, { md: "3" }, {
                    default: withCtx(() => [
                      createVNode(VAutocomplete, {
                        modelValue: unref(state).situacao,
                        "onUpdate:modelValue": ($event) => unref(state).situacao = $event,
                        items: unref(situacaoItems),
                        label: "Situa\xE7\xE3o"
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                    ]),
                    _: 1
                  }),
                  createVNode(VCol, { md: "2" }, {
                    default: withCtx(() => [
                      createVNode(VAutocomplete, {
                        items: unref(usuariosItems),
                        modelValue: unref(state).usuario_token,
                        "onUpdate:modelValue": ($event) => unref(state).usuario_token = $event,
                        "item-title": "user_nome",
                        "item-value": "user_token",
                        label: "Usuario"
                      }, null, 8, ["items", "modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(VCol, { md: "1" }, {
                    default: withCtx(() => [
                      createVNode(VTextField, {
                        modelValue: unref(state).selo,
                        "onUpdate:modelValue": ($event) => unref(state).selo = $event,
                        label: "Selo"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(VCol, { md: "3" }, {
                    default: withCtx(() => [
                      createVNode(VAutocomplete, {
                        modelValue: unref(state).ato_tipo_token,
                        "onUpdate:modelValue": ($event) => unref(state).ato_tipo_token = $event,
                        items: unref(tipoAtosItems),
                        "item-title": "descricao",
                        "item-value": "token",
                        label: "Servi\xE7o"
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                    ]),
                    _: 1
                  }),
                  createVNode(VCol, { md: "2" }, {
                    default: withCtx(() => [
                      createVNode(VTextField, {
                        modelValue: unref(state).apresentante,
                        "onUpdate:modelValue": ($event) => unref(state).apresentante = $event,
                        label: "Apresentante"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(VCol, null, {
                    default: withCtx(() => [
                      createVNode("div", null, [
                        createVNode("img", {
                          onClick: searchOrdersService,
                          style: { "width": "40px", "height": "40px", "cursor": "pointer" },
                          src: _imports_1,
                          alt: "Pesquisar"
                        })
                      ])
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode("hr", { class: "mt-5 mb-5" }),
              createVNode(VDataTable, {
                headers,
                items: unref(servicosItems),
                "item-key": "id"
              }, {
                "item.actions": withCtx(({ item }) => [
                  createVNode(VRow, { style: { "display": "flex", "gap": "10px", "margin-top": "-5px" } }, {
                    default: withCtx(() => [
                      createVNode("div", {
                        onClick: ($event) => redirectToRecebimento(item.numero),
                        title: "Receber"
                      }, [
                        createVNode("img", {
                          style: { "width": "30px", "height": "30px", "cursor": "pointer" },
                          src: _imports_2,
                          alt: "Receber"
                        })
                      ], 8, ["onClick"]),
                      createVNode("div", {
                        class: { disabled: !item.btn_editar },
                        onClick: ($event) => item.btn_editar ? redirectToUpdate(item.id) : null,
                        title: item.btn_editar ? "Editar" : "Desabilitado"
                      }, [
                        createVNode("img", {
                          style: {
                            cursor: item.btn_editar ? "pointer" : "default",
                            width: "30px",
                            height: "30px"
                          },
                          src: _imports_2$1,
                          alt: "Editar"
                        }, null, 4)
                      ], 10, ["onClick", "title"]),
                      createVNode("div", {
                        disabled: !item.btn_cancelar,
                        onClick: ($event) => item.btn_cancelar ? deleteEndereco() : null,
                        title: "Excluir"
                      }, [
                        item.excluido ? (openBlock(), createBlock("img", {
                          key: 0,
                          style: { "width": "30px", "height": "30px", "cursor": "pointer" },
                          src: _imports_3,
                          alt: "Visualizar",
                          title: "Reativar"
                        })) : (openBlock(), createBlock("img", {
                          key: 1,
                          src: _imports_4,
                          alt: "Excluir",
                          class: "trash-icon",
                          style: { "width": "30px", "height": "30px", "cursor": "pointer" },
                          title: "Excluir"
                        }))
                      ], 8, ["disabled", "onClick"])
                    ]),
                    _: 2
                  }, 1024)
                ]),
                _: 1
              }, 8, ["items"]),
              createVNode(_component_RecebimentoOrdem, {
                show: unref(isModalRecebimentoOpen),
                numero_os: unref(numero_os),
                onClose: ($event) => isModalRecebimentoOpen.value = false
              }, null, 8, ["show", "numero_os", "onClose"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/ordens-servicos/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-DZpRcvFr.mjs.map
