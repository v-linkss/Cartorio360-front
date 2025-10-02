import { useSSRContext, ref, watch, mergeProps, unref, isRef, withCtx, createVNode, createTextVNode } from 'vue';
import { ssrRenderComponent } from 'vue/server-renderer';
import { b as useNuxtApp, g as useRoute$1, e as useCookie, V as VBtn, c as useRuntimeConfig } from './server.mjs';
import { u as useFetch } from './fetch-uf6n1sXR.mjs';
import { V as VDialog } from './VDialog-BVe31KMa.mjs';
import { V as VCard, c as VCardActions } from './VCard-CFn9vmiT.mjs';
import { V as VContainer } from './VContainer-CUysD4sO.mjs';
import { V as VRow } from './VRow-Bqz0CuIN.mjs';
import { V as VAutocomplete } from './VAutocomplete-BE6_PaUP.mjs';

const _sfc_main = {
  __name: "TiposAtos",
  __ssrInlineRender: true,
  props: {
    show: Boolean,
    servicos: Array,
    tiposAtos: Array
  },
  emits: ["close", "update-ato"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const isVisible = ref(props.show);
    const { $toast } = useNuxtApp();
    const route = useRoute$1();
    const selectedServico = ref("");
    const selectedAto = ref("");
    const config = useRuntimeConfig();
    const usuario_token = useCookie("auth_token").value;
    const cartorio_token = ref(useCookie("user-data").value.cartorio_token).value;
    const servicos = ref([]);
    const atos = ref([]);
    const emit = __emit;
    const updateAto = `${config.public.managemant}/updateAtos`;
    const getTiposAtos = `${config.public.managemant}/tipoAtos`;
    const loadServicos = async () => {
      const { data } = await useFetch(getTiposAtos, {
        method: "POST",
        body: { usuario_token, cartorio_token }
      }, "$6VlNS7ylT6");
      servicos.value = data.value;
      if (servicos.value.length > 0) {
        selectedServico.value = servicos.value[0];
      }
    };
    const onServicoChange = async (token) => {
      const { data } = await useFetch(getTiposAtos, {
        method: "POST",
        body: {
          usuario_token,
          cartorio_token,
          servico_token: token
        }
      }, "$pRqAaiCpuA");
      atos.value = data.value;
    };
    const updateTipoAto = async () => {
      const { data, status } = await useFetch(
        `${updateAto}/${route.query.ato_id}`,
        {
          method: "PUT",
          body: {
            ato_tipo_id: selectedAto.value.id
          }
        },
        "$Qxfq8aWnXP"
      );
      if (status.value === "success") {
        $toast.success("Tipo de ato atualizado com Sucesso!");
        emit("update-ato", {
          descricao: `${selectedServico.value.descricao} - ${selectedAto.value.descricao}`,
          usaImoveisParams: selectedAto.value.usa_imoveis
        });
        closeModal();
      }
    };
    const closeModal = () => {
      isVisible.value = false;
      emit("close");
    };
    watch(selectedServico, async (newValue) => {
      if (newValue) {
        await onServicoChange(newValue.token);
        selectedAto.value = atos.value.length > 0 ? atos.value[0] : null;
      }
    });
    loadServicos();
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
                              _push5(`<h1 class="ml-4"${_scopeId4}>Tipos de Atos</h1>`);
                            } else {
                              return [
                                createVNode("h1", { class: "ml-4" }, "Tipos de Atos")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`<hr class="mb-5"${_scopeId3}>`);
                        _push4(ssrRenderComponent(VAutocomplete, {
                          "item-title": "descricao",
                          "item-value": "token",
                          class: "mb-5",
                          label: "Selecione o Servi\xE7o",
                          modelValue: unref(selectedServico),
                          "onUpdate:modelValue": ($event) => isRef(selectedServico) ? selectedServico.value = $event : null,
                          items: unref(servicos),
                          "return-object": ""
                        }, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VAutocomplete, {
                          "item-title": "descricao",
                          "item-value": "id",
                          class: "mb-5",
                          label: "Selecione o Tipo de Ato",
                          modelValue: unref(selectedAto),
                          "onUpdate:modelValue": ($event) => isRef(selectedAto) ? selectedAto.value = $event : null,
                          items: unref(atos),
                          "return-object": ""
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VRow, {
                            class: "mt-1 mb-3",
                            style: { "justify-content": "space-between" }
                          }, {
                            default: withCtx(() => [
                              createVNode("h1", { class: "ml-4" }, "Tipos de Atos")
                            ]),
                            _: 1
                          }),
                          createVNode("hr", { class: "mb-5" }),
                          createVNode(VAutocomplete, {
                            "item-title": "descricao",
                            "item-value": "token",
                            class: "mb-5",
                            label: "Selecione o Servi\xE7o",
                            modelValue: unref(selectedServico),
                            "onUpdate:modelValue": ($event) => isRef(selectedServico) ? selectedServico.value = $event : null,
                            items: unref(servicos),
                            "return-object": ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "items"]),
                          createVNode(VAutocomplete, {
                            "item-title": "descricao",
                            "item-value": "id",
                            class: "mb-5",
                            label: "Selecione o Tipo de Ato",
                            modelValue: unref(selectedAto),
                            "onUpdate:modelValue": ($event) => isRef(selectedAto) ? selectedAto.value = $event : null,
                            items: unref(atos),
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
                          onClick: ($event) => updateTipoAto()
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
                            onClick: ($event) => updateTipoAto()
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Salvar")
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
                        createVNode(VRow, {
                          class: "mt-1 mb-3",
                          style: { "justify-content": "space-between" }
                        }, {
                          default: withCtx(() => [
                            createVNode("h1", { class: "ml-4" }, "Tipos de Atos")
                          ]),
                          _: 1
                        }),
                        createVNode("hr", { class: "mb-5" }),
                        createVNode(VAutocomplete, {
                          "item-title": "descricao",
                          "item-value": "token",
                          class: "mb-5",
                          label: "Selecione o Servi\xE7o",
                          modelValue: unref(selectedServico),
                          "onUpdate:modelValue": ($event) => isRef(selectedServico) ? selectedServico.value = $event : null,
                          items: unref(servicos),
                          "return-object": ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "items"]),
                        createVNode(VAutocomplete, {
                          "item-title": "descricao",
                          "item-value": "id",
                          class: "mb-5",
                          label: "Selecione o Tipo de Ato",
                          modelValue: unref(selectedAto),
                          "onUpdate:modelValue": ($event) => isRef(selectedAto) ? selectedAto.value = $event : null,
                          items: unref(atos),
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
                          onClick: ($event) => updateTipoAto()
                        }, {
                          default: withCtx(() => [
                            createTextVNode("Salvar")
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
                          createVNode("h1", { class: "ml-4" }, "Tipos de Atos")
                        ]),
                        _: 1
                      }),
                      createVNode("hr", { class: "mb-5" }),
                      createVNode(VAutocomplete, {
                        "item-title": "descricao",
                        "item-value": "token",
                        class: "mb-5",
                        label: "Selecione o Servi\xE7o",
                        modelValue: unref(selectedServico),
                        "onUpdate:modelValue": ($event) => isRef(selectedServico) ? selectedServico.value = $event : null,
                        items: unref(servicos),
                        "return-object": ""
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "items"]),
                      createVNode(VAutocomplete, {
                        "item-title": "descricao",
                        "item-value": "id",
                        class: "mb-5",
                        label: "Selecione o Tipo de Ato",
                        modelValue: unref(selectedAto),
                        "onUpdate:modelValue": ($event) => isRef(selectedAto) ? selectedAto.value = $event : null,
                        items: unref(atos),
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
                        onClick: ($event) => updateTipoAto()
                      }, {
                        default: withCtx(() => [
                          createTextVNode("Salvar")
                        ]),
                        _: 1
                      }, 8, ["onClick"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Modal/TiposAtos.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : undefined;
};

export { _sfc_main as _ };
//# sourceMappingURL=TiposAtos-BK21oOjn.mjs.map
