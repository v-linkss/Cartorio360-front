import { a as buildAssetsURL } from '../routes/renderer.mjs';
import { useSSRContext, ref, reactive, watch, mergeProps, unref, isRef, withCtx, createVNode, toDisplayString, createTextVNode } from 'vue';
import { ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import { b as useNuxtApp, F as VBtn, aL as useRoute$1, c as useRuntimeConfig } from './server.mjs';
import { u as useFetch } from './fetch-CmQgfhnJ.mjs';
import { a as VDialog, V as VCard, d as VCardActions, c as VCardText } from './VDialog-BSU3_51C.mjs';
import { V as VContainer } from './VContainer-DUPM_BP9.mjs';
import { V as VRow } from './VRow-DbcfFNio.mjs';
import { V as VAutocomplete } from './VAutocomplete-BkWVMD0Z.mjs';

const _sfc_main$2 = {
  __name: "Representante",
  __ssrInlineRender: true,
  props: {
    show: Boolean,
    representantes: Array,
    ato_id: Number,
    representante_nome: String
  },
  emits: ["close", "update-representante"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const isVisible = ref(props.show);
    const config = useRuntimeConfig();
    const { $toast } = useNuxtApp();
    const pessoasUpdate = `${config.public.managemant}/updateAtosPessoa`;
    const state = reactive({
      representante_id: null
    });
    const emit = __emit;
    watch(
      () => props.show,
      async (newVal) => {
        isVisible.value = newVal;
      }
    );
    const closeModal = () => {
      state.representante_id = null;
      isVisible.value = false;
      emit("close");
    };
    const updateAtoPessoa = async () => {
      const { data, error, status } = await useFetch(
        `${pessoasUpdate}/${props.ato_id}`,
        {
          method: "PUT",
          body: {
            representante_id: state.representante_id.id
          }
        },
        "$itMuLcjYKy"
      );
      if (status.value === "success") {
        $toast.success("Representante Adicionado com Sucesso!");
        emit("update-representante", state.representante_id.nome);
        closeModal();
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(VDialog, mergeProps({
        persistent: "",
        modelValue: unref(isVisible),
        "onUpdate:modelValue": ($event) => isRef(isVisible) ? isVisible.value = $event : null,
        "max-width": "800"
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
                              _push5(`<h1 class="ml-4"${_scopeId4}> Representante para: ${ssrInterpolate(props.representante_nome)}</h1>`);
                            } else {
                              return [
                                createVNode("h1", { class: "ml-4" }, " Representante para: " + toDisplayString(props.representante_nome), 1)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`<hr class="mb-5"${_scopeId3}>`);
                        _push4(ssrRenderComponent(VAutocomplete, {
                          class: "mb-5",
                          label: "Selecione o Representante",
                          modelValue: unref(state).representante_id,
                          "onUpdate:modelValue": ($event) => unref(state).representante_id = $event,
                          items: props.representantes,
                          "item-title": "nome",
                          "item-value": "id",
                          "return-object": ""
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VRow, {
                            class: "mt-1 mb-3",
                            style: { "justify-content": "space-between" }
                          }, {
                            default: withCtx(() => [
                              createVNode("h1", { class: "ml-4" }, " Representante para: " + toDisplayString(props.representante_nome), 1)
                            ]),
                            _: 1
                          }),
                          createVNode("hr", { class: "mb-5" }),
                          createVNode(VAutocomplete, {
                            class: "mb-5",
                            label: "Selecione o Representante",
                            modelValue: unref(state).representante_id,
                            "onUpdate:modelValue": ($event) => unref(state).representante_id = $event,
                            items: props.representantes,
                            "item-title": "nome",
                            "item-value": "id",
                            "return-object": ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VCardActions, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VBtn, {
                          style: { "background-color": "red", "color": "white" },
                          onClick: closeModal
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Voltar`);
                            } else {
                              return [
                                createTextVNode("Voltar")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VBtn, {
                          style: { "background-color": "green", "color": "white" },
                          onClick: updateAtoPessoa
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Salvar`);
                            } else {
                              return [
                                createTextVNode("Salvar")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VBtn, {
                            style: { "background-color": "red", "color": "white" },
                            onClick: closeModal
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Voltar")
                            ]),
                            _: 1
                          }),
                          createVNode(VBtn, {
                            style: { "background-color": "green", "color": "white" },
                            onClick: updateAtoPessoa
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Salvar")
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
                        createVNode(VRow, {
                          class: "mt-1 mb-3",
                          style: { "justify-content": "space-between" }
                        }, {
                          default: withCtx(() => [
                            createVNode("h1", { class: "ml-4" }, " Representante para: " + toDisplayString(props.representante_nome), 1)
                          ]),
                          _: 1
                        }),
                        createVNode("hr", { class: "mb-5" }),
                        createVNode(VAutocomplete, {
                          class: "mb-5",
                          label: "Selecione o Representante",
                          modelValue: unref(state).representante_id,
                          "onUpdate:modelValue": ($event) => unref(state).representante_id = $event,
                          items: props.representantes,
                          "item-title": "nome",
                          "item-value": "id",
                          "return-object": ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                      ]),
                      _: 1
                    }),
                    createVNode(VCardActions, null, {
                      default: withCtx(() => [
                        createVNode(VBtn, {
                          style: { "background-color": "red", "color": "white" },
                          onClick: closeModal
                        }, {
                          default: withCtx(() => [
                            createTextVNode("Voltar")
                          ]),
                          _: 1
                        }),
                        createVNode(VBtn, {
                          style: { "background-color": "green", "color": "white" },
                          onClick: updateAtoPessoa
                        }, {
                          default: withCtx(() => [
                            createTextVNode("Salvar")
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
              createVNode(VCard, null, {
                default: withCtx(() => [
                  createVNode(VContainer, null, {
                    default: withCtx(() => [
                      createVNode(VRow, {
                        class: "mt-1 mb-3",
                        style: { "justify-content": "space-between" }
                      }, {
                        default: withCtx(() => [
                          createVNode("h1", { class: "ml-4" }, " Representante para: " + toDisplayString(props.representante_nome), 1)
                        ]),
                        _: 1
                      }),
                      createVNode("hr", { class: "mb-5" }),
                      createVNode(VAutocomplete, {
                        class: "mb-5",
                        label: "Selecione o Representante",
                        modelValue: unref(state).representante_id,
                        "onUpdate:modelValue": ($event) => unref(state).representante_id = $event,
                        items: props.representantes,
                        "item-title": "nome",
                        "item-value": "id",
                        "return-object": ""
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                    ]),
                    _: 1
                  }),
                  createVNode(VCardActions, null, {
                    default: withCtx(() => [
                      createVNode(VBtn, {
                        style: { "background-color": "red", "color": "white" },
                        onClick: closeModal
                      }, {
                        default: withCtx(() => [
                          createTextVNode("Voltar")
                        ]),
                        _: 1
                      }),
                      createVNode(VBtn, {
                        style: { "background-color": "green", "color": "white" },
                        onClick: updateAtoPessoa
                      }, {
                        default: withCtx(() => [
                          createTextVNode("Salvar")
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
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Modal/Representante.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : undefined;
};
const _sfc_main$1 = {
  __name: "Papel",
  __ssrInlineRender: true,
  props: {
    show: Boolean,
    ato_token: String,
    ato_id: Number,
    representante_nome: String
  },
  emits: ["close", "update-papel"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const isVisible = ref(props.show);
    const route = useRoute$1();
    const config = useRuntimeConfig();
    const { $toast } = useNuxtApp();
    const pessoasUpdate = `${config.public.managemant}/updateAtosPessoa`;
    const papeisApresentante = `${config.public.managemant}/listarPapeis`;
    const papeisItems = ref([]);
    const state = reactive({
      tipo_parte_id: null
    });
    const emit = __emit;
    watch(
      () => props.show,
      async (newVal) => {
        isVisible.value = newVal;
        if (newVal) {
          await getPapeis();
        }
      }
    );
    const closeModal = () => {
      isVisible.value = false;
      emit("close");
    };
    const getPapeis = async () => {
      const { data } = await useFetch(papeisApresentante, {
        method: "POST",
        body: { tipo_ato_token: route.query.tipo_ato_token || props.ato_token }
      }, "$ZhqPztPn4g");
      console.log(props.ato_token);
      papeisItems.value = data.value;
    };
    const updateAtoPessoa = async () => {
      const { data, error, status } = await useFetch(`${pessoasUpdate}/${props.ato_id}`, {
        method: "PUT",
        body: {
          tipo_parte_id: state.tipo_parte_id.id
        }
      }, "$OV7fMB4PJZ");
      if (status.value === "success") {
        $toast.success("Papel Atualizado com Sucesso!");
        emit("update-papel", state.tipo_parte_id.descricao);
        closeModal();
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(VDialog, mergeProps({
        persistent: "",
        modelValue: unref(isVisible),
        "onUpdate:modelValue": ($event) => isRef(isVisible) ? isVisible.value = $event : null,
        "max-width": "800"
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
                              _push5(`<h1 class="ml-4"${_scopeId4}> Altere o papel para: ${ssrInterpolate(props.representante_nome)}</h1>`);
                            } else {
                              return [
                                createVNode("h1", { class: "ml-4" }, " Altere o papel para: " + toDisplayString(props.representante_nome), 1)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`<hr class="mb-5"${_scopeId3}>`);
                        _push4(ssrRenderComponent(VAutocomplete, {
                          class: "mb-5",
                          label: "Selecione o Papel",
                          modelValue: unref(state).tipo_parte_id,
                          "onUpdate:modelValue": ($event) => unref(state).tipo_parte_id = $event,
                          items: unref(papeisItems),
                          "item-title": "descricao",
                          "item-value": "descricao",
                          "return-object": ""
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VRow, {
                            class: "mt-1 mb-3",
                            style: { "justify-content": "space-between" }
                          }, {
                            default: withCtx(() => [
                              createVNode("h1", { class: "ml-4" }, " Altere o papel para: " + toDisplayString(props.representante_nome), 1)
                            ]),
                            _: 1
                          }),
                          createVNode("hr", { class: "mb-5" }),
                          createVNode(VAutocomplete, {
                            class: "mb-5",
                            label: "Selecione o Papel",
                            modelValue: unref(state).tipo_parte_id,
                            "onUpdate:modelValue": ($event) => unref(state).tipo_parte_id = $event,
                            items: unref(papeisItems),
                            "item-title": "descricao",
                            "item-value": "descricao",
                            "return-object": ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VCardActions, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VBtn, {
                          style: { "background-color": "red", "color": "white" },
                          onClick: closeModal
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Voltar`);
                            } else {
                              return [
                                createTextVNode("Voltar")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VBtn, {
                          style: { "background-color": "green", "color": "white" },
                          onClick: updateAtoPessoa
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Salvar`);
                            } else {
                              return [
                                createTextVNode("Salvar")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VBtn, {
                            style: { "background-color": "red", "color": "white" },
                            onClick: closeModal
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Voltar")
                            ]),
                            _: 1
                          }),
                          createVNode(VBtn, {
                            style: { "background-color": "green", "color": "white" },
                            onClick: updateAtoPessoa
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Salvar")
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
                        createVNode(VRow, {
                          class: "mt-1 mb-3",
                          style: { "justify-content": "space-between" }
                        }, {
                          default: withCtx(() => [
                            createVNode("h1", { class: "ml-4" }, " Altere o papel para: " + toDisplayString(props.representante_nome), 1)
                          ]),
                          _: 1
                        }),
                        createVNode("hr", { class: "mb-5" }),
                        createVNode(VAutocomplete, {
                          class: "mb-5",
                          label: "Selecione o Papel",
                          modelValue: unref(state).tipo_parte_id,
                          "onUpdate:modelValue": ($event) => unref(state).tipo_parte_id = $event,
                          items: unref(papeisItems),
                          "item-title": "descricao",
                          "item-value": "descricao",
                          "return-object": ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                      ]),
                      _: 1
                    }),
                    createVNode(VCardActions, null, {
                      default: withCtx(() => [
                        createVNode(VBtn, {
                          style: { "background-color": "red", "color": "white" },
                          onClick: closeModal
                        }, {
                          default: withCtx(() => [
                            createTextVNode("Voltar")
                          ]),
                          _: 1
                        }),
                        createVNode(VBtn, {
                          style: { "background-color": "green", "color": "white" },
                          onClick: updateAtoPessoa
                        }, {
                          default: withCtx(() => [
                            createTextVNode("Salvar")
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
              createVNode(VCard, null, {
                default: withCtx(() => [
                  createVNode(VContainer, null, {
                    default: withCtx(() => [
                      createVNode(VRow, {
                        class: "mt-1 mb-3",
                        style: { "justify-content": "space-between" }
                      }, {
                        default: withCtx(() => [
                          createVNode("h1", { class: "ml-4" }, " Altere o papel para: " + toDisplayString(props.representante_nome), 1)
                        ]),
                        _: 1
                      }),
                      createVNode("hr", { class: "mb-5" }),
                      createVNode(VAutocomplete, {
                        class: "mb-5",
                        label: "Selecione o Papel",
                        modelValue: unref(state).tipo_parte_id,
                        "onUpdate:modelValue": ($event) => unref(state).tipo_parte_id = $event,
                        items: unref(papeisItems),
                        "item-title": "descricao",
                        "item-value": "descricao",
                        "return-object": ""
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                    ]),
                    _: 1
                  }),
                  createVNode(VCardActions, null, {
                    default: withCtx(() => [
                      createVNode(VBtn, {
                        style: { "background-color": "red", "color": "white" },
                        onClick: closeModal
                      }, {
                        default: withCtx(() => [
                          createTextVNode("Voltar")
                        ]),
                        _: 1
                      }),
                      createVNode(VBtn, {
                        style: { "background-color": "green", "color": "white" },
                        onClick: updateAtoPessoa
                      }, {
                        default: withCtx(() => [
                          createTextVNode("Salvar")
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
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Modal/Papel.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : undefined;
};
const _imports_5 = "" + buildAssetsURL("btn-pessoa.DOpc-kWJ.png");
const _sfc_main = {
  __name: "Confirmacao",
  __ssrInlineRender: true,
  props: {
    show: Boolean,
    condMessage: String
  },
  emits: ["close", "confirm"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const isVisible = ref(props.show);
    const emit = __emit;
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
    const confirmAction = () => {
      isVisible.value = false;
      emit("confirm");
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(VDialog, mergeProps({
        persistent: "",
        modelValue: unref(isVisible),
        "onUpdate:modelValue": ($event) => isRef(isVisible) ? isVisible.value = $event : null,
        per: "",
        "max-width": "500"
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VCard, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VCardText, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div${_scopeId3}>${ssrInterpolate(__props.condMessage)}</div>`);
                      } else {
                        return [
                          createVNode("div", null, toDisplayString(__props.condMessage), 1)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VCardActions, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VBtn, {
                          style: { "background-color": "red", "color": "white" },
                          onClick: closeModal
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`N\xE3o`);
                            } else {
                              return [
                                createTextVNode("N\xE3o")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VBtn, {
                          style: { "background-color": "green", "color": "white" },
                          onClick: confirmAction
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Sim`);
                            } else {
                              return [
                                createTextVNode("Sim")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VBtn, {
                            style: { "background-color": "red", "color": "white" },
                            onClick: closeModal
                          }, {
                            default: withCtx(() => [
                              createTextVNode("N\xE3o")
                            ]),
                            _: 1
                          }),
                          createVNode(VBtn, {
                            style: { "background-color": "green", "color": "white" },
                            onClick: confirmAction
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Sim")
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
                    createVNode(VCardText, null, {
                      default: withCtx(() => [
                        createVNode("div", null, toDisplayString(__props.condMessage), 1)
                      ]),
                      _: 1
                    }),
                    createVNode(VCardActions, null, {
                      default: withCtx(() => [
                        createVNode(VBtn, {
                          style: { "background-color": "red", "color": "white" },
                          onClick: closeModal
                        }, {
                          default: withCtx(() => [
                            createTextVNode("N\xE3o")
                          ]),
                          _: 1
                        }),
                        createVNode(VBtn, {
                          style: { "background-color": "green", "color": "white" },
                          onClick: confirmAction
                        }, {
                          default: withCtx(() => [
                            createTextVNode("Sim")
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
              createVNode(VCard, null, {
                default: withCtx(() => [
                  createVNode(VCardText, null, {
                    default: withCtx(() => [
                      createVNode("div", null, toDisplayString(__props.condMessage), 1)
                    ]),
                    _: 1
                  }),
                  createVNode(VCardActions, null, {
                    default: withCtx(() => [
                      createVNode(VBtn, {
                        style: { "background-color": "red", "color": "white" },
                        onClick: closeModal
                      }, {
                        default: withCtx(() => [
                          createTextVNode("N\xE3o")
                        ]),
                        _: 1
                      }),
                      createVNode(VBtn, {
                        style: { "background-color": "green", "color": "white" },
                        onClick: confirmAction
                      }, {
                        default: withCtx(() => [
                          createTextVNode("Sim")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Modal/Confirmacao.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : undefined;
};
const _imports_0$1 = "" + buildAssetsURL("lavrar.D2Pu00F0.png");
const _imports_0 = "" + buildAssetsURL("escanear.DNtQsXN4.png");

export { _imports_5 as _, _imports_0$1 as a, _imports_0 as b, _sfc_main$2 as c, _sfc_main$1 as d, _sfc_main as e };
//# sourceMappingURL=escanear-9blW2_Ek.mjs.map
