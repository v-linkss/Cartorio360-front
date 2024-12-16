import { a as buildAssetsURL } from '../routes/renderer.mjs';
import { provide, ref, withCtx, createTextVNode, createVNode, unref, useSSRContext, withAsyncContext, toDisplayString, openBlock, createBlock, createCommentVNode, reactive, watch, mergeProps, isRef } from 'vue';
import { f as useNuxtApp, u as useRouter$1, c as useRoute$1, e as VBtn, at as VSheet, b as useRuntimeConfig, d as useCookie } from './server.mjs';
import { u as useFetch } from './fetch-bT3G74K0.mjs';
import { ssrRenderComponent, ssrRenderStyle, ssrRenderAttr, ssrInterpolate } from 'vue/server-renderer';
import { V as VCard, a as VDialog, b as VCardActions, c as VCardText } from './VCard-uMKFEuGZ.mjs';
import { V as VContainer } from './VContainer-Dd724oJ4.mjs';
import { V as VRow } from './VRow-CVrt2SWs.mjs';
import { V as VAutocomplete } from './VAutocomplete-D1-afj5_.mjs';
import { _ as __nuxt_component_0 } from './nuxt-link-DyZc7qn_.mjs';
import { Toolbar, WordExport, DocumentEditorContainerComponent } from '@syncfusion/ej2-vue-documenteditor';
import { registerLicense } from '@syncfusion/ej2-base';
import { V as VCol } from './VCol-DvbNDJG_.mjs';

const _sfc_main$4 = {
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
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Modal/Representante.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const _sfc_main$3 = {
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
        body: { tipo_ato_token: props.ato_token }
      }, "$ZhqPztPn4g");
      papeisItems.value = data.value;
    };
    const updateAtoPessoa = async () => {
      const { data, error, status } = await useFetch(`${pessoasUpdate}/${props.ato_id}`, {
        method: "PUT",
        body: {
          tipo_parte_id: state.tipo_parte_id.id
        }
      }, "$OV7fMB4PJZ");
      console.log(props.ato_id, props.ato_token, state.tipo_parte_id.id);
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
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Modal/Papel.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _imports_5 = "" + buildAssetsURL("btn-pessoa.DOpc-kWJ.png");
const serviceUrl = "https://ej2services.syncfusion.com/production/web-services/api/documenteditor/";
const _sfc_main$2 = {
  __name: "Minuta",
  __ssrInlineRender: true,
  props: {
    ato_token: {
      type: String,
      required: true
    }
  },
  emits: ["page", "doc"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    provide("DocumentEditorContainer", [Toolbar, WordExport]);
    const config = useRuntimeConfig();
    const { $toast } = useNuxtApp();
    const router = useRouter$1();
    const route = useRoute$1();
    const emit = __emit;
    registerLicense(
      `${config.public.docEditor}`
    );
    const enviarDocumento = `${config.public.managemant}/upload`;
    const documentEditorContainer = ref(null);
    const onDocumentChange = async () => {
      const document = documentEditorContainer.value.ej2Instances.documentEditor;
      const sfdt = await document.saveAsBlob("Sfdt");
      const reader = new FileReader();
      reader.onload = () => {
        const sfdtText = reader.result;
        console.log(sfdtText);
        emit("doc", sfdtText);
      };
      reader.readAsText(sfdt);
    };
    const salvarDocumento = async () => {
      const document = documentEditorContainer.value.ej2Instances.documentEditor;
      const blob = await document.saveAsBlob("Docx");
      const formData = new FormData();
      formData.append("file", blob, `anexo.docx`);
      formData.append("cartorio_token", useCookie("user-data").value.cartorio_token);
      formData.append("token", props.ato_token);
      formData.append("tipo", "ato_minuta");
      const { data, status } = await useFetch(enviarDocumento, {
        method: "POST",
        body: formData
      }, "$071xxdqs20");
      if (status.value === "success") {
        $toast.success("Documento enviado!");
        const document2 = documentEditorContainer.value.ej2Instances.documentEditor;
        const pageCount = document2.pageCount;
        onDocumentChange();
        emit("page", pageCount);
      } else {
        $toast.error("Erro ao enviar documento para o sistema.");
      }
    };
    const goBack = () => {
      const origem = route.query.origem || "criar";
      const id = route.query.id;
      if (origem === "atualizar") {
        router.push(`/os/atualizar/${id}`);
      } else {
        router.push("/os/criar-registro");
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<!--[-->`);
      _push(ssrRenderComponent(VRow, { class: "ml-4 mt-4 mb-4" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VBtn, {
              size: "large",
              color: "green",
              onClick: salvarDocumento
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Salvar`);
                } else {
                  return [
                    createTextVNode("Salvar")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_NuxtLink, { class: "ml-4" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VBtn, {
                    size: "large",
                    onClick: goBack,
                    color: "red"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Voltar`);
                      } else {
                        return [
                          createTextVNode("Voltar")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VBtn, {
                      size: "large",
                      onClick: goBack,
                      color: "red"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Voltar")
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
              createVNode(VBtn, {
                size: "large",
                color: "green",
                onClick: salvarDocumento
              }, {
                default: withCtx(() => [
                  createTextVNode("Salvar")
                ]),
                _: 1
              }),
              createVNode(_component_NuxtLink, { class: "ml-4" }, {
                default: withCtx(() => [
                  createVNode(VBtn, {
                    size: "large",
                    onClick: goBack,
                    color: "red"
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Voltar")
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
      _push(ssrRenderComponent(unref(DocumentEditorContainerComponent), {
        height: "700px",
        ref_key: "documentEditorContainer",
        ref: documentEditorContainer,
        serviceUrl,
        enableToolbar: true,
        enableWordExport: true
      }, null, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Procuracao/Minuta.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = {
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
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Modal/Confirmacao.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _imports_0$1 = "" + buildAssetsURL("lavrar.D2Pu00F0.png");
const _sfc_main = {
  __name: "Livro",
  __ssrInlineRender: true,
  props: {
    ato_token: {
      type: String,
      required: true
    },
    pages: {
      type: Number,
      required: true
    },
    document: {
      type: String,
      required: true
    }
  },
  async setup(__props) {
    let __temp, __restore;
    const props = __props;
    const config = useRuntimeConfig();
    registerLicense(`${config.public.docEditor}`);
    const { $toast } = useNuxtApp();
    const router = useRouter$1();
    const route = useRoute$1();
    const baixarDocumento = `${config.public.managemant}/download`;
    const lavraAtoLivro = `${config.public.managemant}/lavrarAto`;
    const condMessage = ref(
      "Ao lavrar esse ato, a opera\xE7\xE3o n\xE3o poder\xE1 ser desfeita. Confirma ?"
    );
    const isModalCondOpen = ref(false);
    const lavraData = ref(null);
    const selo = ref(null);
    const documentEditorContainer = ref(null);
    [__temp, __restore] = withAsyncContext(() => useFetch(baixarDocumento, {
      method: "POST",
      body: { bucket: "cartorio-1", path: "ato-xkyaA/ato-xkyaA" }
    }, "$ZKnVBNYxp9")), __temp = await __temp, __restore();
    const lavraAto = async () => {
      try {
        const { data: data2, status: status2 } = await useFetch(lavraAtoLivro, {
          method: "POST",
          body: { ato_token: props.ato_token, qtd_paginas: props.pages }
        }, "$XouuxOFIWh");
        if (status2.value === "success") {
          lavraData.value = data2.value;
          selo.value = data2.value[0].selo;
          $toast.success("Ato lavrado com sucesso!");
        } else {
          $toast.error("Falha ao lavrar o ato.");
        }
      } catch (error) {
        $toast.error("Erro ao conectar com o servidor.");
      }
    };
    const confirmLavrar = () => {
      isModalCondOpen.value = false;
      lavraAto();
    };
    const onCreated = function() {
      documentEditorContainer.value.ej2Instances.documentEditor.open(
        props.document
      );
    };
    const goBack = () => {
      const origem = route.query.origem || "criar";
      const id = route.query.id;
      if (origem === "atualizar") {
        router.push(`/os/atualizar/${id}`);
      } else {
        router.push("/os/criar-registro");
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ModalConfirmacao = _sfc_main$1;
      _push(`<!--[-->`);
      _push(ssrRenderComponent(VRow, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VCol, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(DocumentEditorContainerComponent), {
                    restrictEditing: true,
                    enableToolbar: false,
                    created: props.document ? onCreated : null,
                    ref_key: "documentEditorContainer",
                    ref: documentEditorContainer,
                    height: "850px",
                    width: "850px"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(DocumentEditorContainerComponent), {
                      restrictEditing: true,
                      enableToolbar: false,
                      created: props.document ? onCreated : null,
                      ref_key: "documentEditorContainer",
                      ref: documentEditorContainer,
                      height: "850px",
                      width: "850px"
                    }, null, 8, ["created"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(VCol, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="d-flex align-center justify-center"${_scopeId2}><div${_scopeId2}><img class="ml-15" style="${ssrRenderStyle({ "height": "40px", "width": "40px", "cursor": "pointer", "margin-top": "350px" })}"${ssrRenderAttr("src", _imports_0$1)}${_scopeId2}>`);
                  if (unref(lavraData)) {
                    _push3(ssrRenderComponent(VCard, { class: "ml-8 mt-5" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        var _a;
                        if (_push4) {
                          _push4(ssrRenderComponent(VRow, { "no-gutters": "" }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(VCol, null, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(ssrRenderComponent(VSheet, {
                                        style: { "font-weight": "bold" },
                                        class: "pa-2 ma-2"
                                      }, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(` Livro: ${ssrInterpolate(unref(lavraData)[0].livro_numero)}`);
                                          } else {
                                            return [
                                              createTextVNode(" Livro: " + toDisplayString(unref(lavraData)[0].livro_numero), 1)
                                            ];
                                          }
                                        }),
                                        _: 1
                                      }, _parent6, _scopeId5));
                                    } else {
                                      return [
                                        createVNode(VSheet, {
                                          style: { "font-weight": "bold" },
                                          class: "pa-2 ma-2"
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode(" Livro: " + toDisplayString(unref(lavraData)[0].livro_numero), 1)
                                          ]),
                                          _: 1
                                        })
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent5, _scopeId4));
                                _push5(ssrRenderComponent(VCol, null, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(ssrRenderComponent(VSheet, {
                                        style: { "font-weight": "bold" },
                                        class: "pa-2 ma-2"
                                      }, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(` Folhas : ${ssrInterpolate(unref(lavraData)[0].pagina_inicial)} \xC1 ${ssrInterpolate(unref(lavraData)[0].pagina_final)}`);
                                          } else {
                                            return [
                                              createTextVNode(" Folhas : " + toDisplayString(unref(lavraData)[0].pagina_inicial) + " \xC1 " + toDisplayString(unref(lavraData)[0].pagina_final), 1)
                                            ];
                                          }
                                        }),
                                        _: 1
                                      }, _parent6, _scopeId5));
                                    } else {
                                      return [
                                        createVNode(VSheet, {
                                          style: { "font-weight": "bold" },
                                          class: "pa-2 ma-2"
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode(" Folhas : " + toDisplayString(unref(lavraData)[0].pagina_inicial) + " \xC1 " + toDisplayString(unref(lavraData)[0].pagina_final), 1)
                                          ]),
                                          _: 1
                                        })
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(VCol, null, {
                                    default: withCtx(() => [
                                      createVNode(VSheet, {
                                        style: { "font-weight": "bold" },
                                        class: "pa-2 ma-2"
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode(" Livro: " + toDisplayString(unref(lavraData)[0].livro_numero), 1)
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(VCol, null, {
                                    default: withCtx(() => [
                                      createVNode(VSheet, {
                                        style: { "font-weight": "bold" },
                                        class: "pa-2 ma-2"
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode(" Folhas : " + toDisplayString(unref(lavraData)[0].pagina_inicial) + " \xC1 " + toDisplayString(unref(lavraData)[0].pagina_final), 1)
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
                          }, _parent4, _scopeId3));
                          _push4(`<div${_scopeId3}>${(_a = unref(selo)) != null ? _a : ""}</div>`);
                        } else {
                          return [
                            createVNode(VRow, { "no-gutters": "" }, {
                              default: withCtx(() => [
                                createVNode(VCol, null, {
                                  default: withCtx(() => [
                                    createVNode(VSheet, {
                                      style: { "font-weight": "bold" },
                                      class: "pa-2 ma-2"
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(" Livro: " + toDisplayString(unref(lavraData)[0].livro_numero), 1)
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }),
                                createVNode(VCol, null, {
                                  default: withCtx(() => [
                                    createVNode(VSheet, {
                                      style: { "font-weight": "bold" },
                                      class: "pa-2 ma-2"
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(" Folhas : " + toDisplayString(unref(lavraData)[0].pagina_inicial) + " \xC1 " + toDisplayString(unref(lavraData)[0].pagina_final), 1)
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }),
                            createVNode("div", { innerHTML: unref(selo) }, null, 8, ["innerHTML"])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`</div></div>`);
                } else {
                  return [
                    createVNode("div", { class: "d-flex align-center justify-center" }, [
                      createVNode("div", null, [
                        createVNode("img", {
                          onClick: ($event) => isModalCondOpen.value = true,
                          class: "ml-15",
                          style: { "height": "40px", "width": "40px", "cursor": "pointer", "margin-top": "350px" },
                          src: _imports_0$1
                        }, null, 8, ["onClick"]),
                        unref(lavraData) ? (openBlock(), createBlock(VCard, {
                          key: 0,
                          class: "ml-8 mt-5"
                        }, {
                          default: withCtx(() => [
                            createVNode(VRow, { "no-gutters": "" }, {
                              default: withCtx(() => [
                                createVNode(VCol, null, {
                                  default: withCtx(() => [
                                    createVNode(VSheet, {
                                      style: { "font-weight": "bold" },
                                      class: "pa-2 ma-2"
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(" Livro: " + toDisplayString(unref(lavraData)[0].livro_numero), 1)
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }),
                                createVNode(VCol, null, {
                                  default: withCtx(() => [
                                    createVNode(VSheet, {
                                      style: { "font-weight": "bold" },
                                      class: "pa-2 ma-2"
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(" Folhas : " + toDisplayString(unref(lavraData)[0].pagina_inicial) + " \xC1 " + toDisplayString(unref(lavraData)[0].pagina_final), 1)
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }),
                            createVNode("div", { innerHTML: unref(selo) }, null, 8, ["innerHTML"])
                          ]),
                          _: 1
                        })) : createCommentVNode("", true)
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(VCol, null, {
                default: withCtx(() => [
                  createVNode(unref(DocumentEditorContainerComponent), {
                    restrictEditing: true,
                    enableToolbar: false,
                    created: props.document ? onCreated : null,
                    ref_key: "documentEditorContainer",
                    ref: documentEditorContainer,
                    height: "850px",
                    width: "850px"
                  }, null, 8, ["created"])
                ]),
                _: 1
              }),
              createVNode(VCol, null, {
                default: withCtx(() => [
                  createVNode("div", { class: "d-flex align-center justify-center" }, [
                    createVNode("div", null, [
                      createVNode("img", {
                        onClick: ($event) => isModalCondOpen.value = true,
                        class: "ml-15",
                        style: { "height": "40px", "width": "40px", "cursor": "pointer", "margin-top": "350px" },
                        src: _imports_0$1
                      }, null, 8, ["onClick"]),
                      unref(lavraData) ? (openBlock(), createBlock(VCard, {
                        key: 0,
                        class: "ml-8 mt-5"
                      }, {
                        default: withCtx(() => [
                          createVNode(VRow, { "no-gutters": "" }, {
                            default: withCtx(() => [
                              createVNode(VCol, null, {
                                default: withCtx(() => [
                                  createVNode(VSheet, {
                                    style: { "font-weight": "bold" },
                                    class: "pa-2 ma-2"
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(" Livro: " + toDisplayString(unref(lavraData)[0].livro_numero), 1)
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }),
                              createVNode(VCol, null, {
                                default: withCtx(() => [
                                  createVNode(VSheet, {
                                    style: { "font-weight": "bold" },
                                    class: "pa-2 ma-2"
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(" Folhas : " + toDisplayString(unref(lavraData)[0].pagina_inicial) + " \xC1 " + toDisplayString(unref(lavraData)[0].pagina_final), 1)
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode("div", { innerHTML: unref(selo) }, null, 8, ["innerHTML"])
                        ]),
                        _: 1
                      })) : createCommentVNode("", true)
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
      _push(ssrRenderComponent(VBtn, {
        color: "red",
        size: "large",
        onClick: goBack
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Voltar`);
          } else {
            return [
              createTextVNode("Voltar")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_ModalConfirmacao, {
        show: unref(isModalCondOpen),
        condMessage: unref(condMessage),
        onClose: ($event) => isModalCondOpen.value = false,
        onConfirm: confirmLavrar
      }, null, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Procuracao/Livro.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _imports_0 = "" + buildAssetsURL("escanear.DNtQsXN4.png");

export { _sfc_main$2 as _, _sfc_main as a, _imports_5 as b, _imports_0 as c, _sfc_main$4 as d, _sfc_main$3 as e };
//# sourceMappingURL=escanear--Cx8mmIm.mjs.map
