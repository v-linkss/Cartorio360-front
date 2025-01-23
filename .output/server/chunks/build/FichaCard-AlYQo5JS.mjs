import { d as _sfc_main$6 } from './RegistroPessoas-C-brOBcf.mjs';
import { e as VBtn, b as useRuntimeConfig } from './server.mjs';
import { ref, watch, mergeProps, unref, isRef, withCtx, createTextVNode, createVNode, useSSRContext } from 'vue';
import { u as useFetch } from './fetch-bT3G74K0.mjs';
import { ssrRenderComponent } from 'vue/server-renderer';
import { a as VDialog, V as VCard, b as VCardTitle, d as VCardActions } from './VDialog-BnIkuznU.mjs';

const _sfc_main = {
  __name: "FichaCard",
  __ssrInlineRender: true,
  props: {
    show: Boolean,
    item: Object
  },
  emits: ["close", "confirmar"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const config = useRuntimeConfig();
    const buscarPessoa = `${config.public.managemant}/getLinkTipo`;
    const baixarDocumento = `${config.public.managemant}/download`;
    const isVisible = ref(props.show);
    const fichaRender = ref();
    const emit = __emit;
    watch(
      () => props.show,
      async (newVal) => {
        isVisible.value = newVal;
        await beforeOpenFicha();
      }
    );
    const confirmarRecebimento = () => {
      emit("confirmar");
      closeModal();
    };
    const beforeOpenFicha = async () => {
      var _a;
      if (!props.item.id)
        return;
      const { data: imagemBiometria } = await useFetch(buscarPessoa, {
        method: "POST",
        body: { tipo: "ficha", id: props.item.id }
      }, "$4omB3S9Tg3");
      if (!((_a = imagemBiometria.value) == null ? void 0 : _a.link))
        return;
      const { data: link } = await useFetch(baixarDocumento, {
        method: "POST",
        body: { bucket: "qvgjz", path: imagemBiometria.value.link }
      }, "$yanMHqBuqW");
      const linkMinio = imagemBiometria.value.link;
      const linkPayload = link.value;
      if (/\.(tr7|tiff)$/i.test(linkMinio)) {
        fichaRender.value = linkPayload;
        console.log("rasdf");
      } else {
        fotoRender.value = `data:image/jpeg;base64,${linkPayload}`;
      }
    };
    const closeModal = () => {
      isVisible.value = false;
      fichaRender.value = null;
      emit("close");
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_TiffViewer = _sfc_main$6;
      _push(ssrRenderComponent(VDialog, mergeProps({
        persistent: "",
        modelValue: unref(isVisible),
        "onUpdate:modelValue": ($event) => isRef(isVisible) ? isVisible.value = $event : null,
        "max-width": "700"
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VCard, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VCardTitle, { class: "text-h5" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Ficha de Firma`);
                      } else {
                        return [
                          createTextVNode("Ficha de Firma")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_TiffViewer, { "tiff-url": unref(fichaRender) }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VCardActions, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VBtn, {
                          style: { "background-color": "#429946", "color": "white" },
                          onClick: confirmarRecebimento
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Reconhecer`);
                            } else {
                              return [
                                createTextVNode("Reconhecer")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
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
                      } else {
                        return [
                          createVNode(VBtn, {
                            style: { "background-color": "#429946", "color": "white" },
                            onClick: confirmarRecebimento
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Reconhecer")
                            ]),
                            _: 1
                          }),
                          createVNode(VBtn, {
                            style: { "background-color": "red", "color": "white" },
                            onClick: closeModal
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
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VCardTitle, { class: "text-h5" }, {
                      default: withCtx(() => [
                        createTextVNode("Ficha de Firma")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_TiffViewer, { "tiff-url": unref(fichaRender) }, null, 8, ["tiff-url"]),
                    createVNode(VCardActions, null, {
                      default: withCtx(() => [
                        createVNode(VBtn, {
                          style: { "background-color": "#429946", "color": "white" },
                          onClick: confirmarRecebimento
                        }, {
                          default: withCtx(() => [
                            createTextVNode("Reconhecer")
                          ]),
                          _: 1
                        }),
                        createVNode(VBtn, {
                          style: { "background-color": "red", "color": "white" },
                          onClick: closeModal
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
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(VCard, null, {
                default: withCtx(() => [
                  createVNode(VCardTitle, { class: "text-h5" }, {
                    default: withCtx(() => [
                      createTextVNode("Ficha de Firma")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_TiffViewer, { "tiff-url": unref(fichaRender) }, null, 8, ["tiff-url"]),
                  createVNode(VCardActions, null, {
                    default: withCtx(() => [
                      createVNode(VBtn, {
                        style: { "background-color": "#429946", "color": "white" },
                        onClick: confirmarRecebimento
                      }, {
                        default: withCtx(() => [
                          createTextVNode("Reconhecer")
                        ]),
                        _: 1
                      }),
                      createVNode(VBtn, {
                        style: { "background-color": "red", "color": "white" },
                        onClick: closeModal
                      }, {
                        default: withCtx(() => [
                          createTextVNode("Voltar")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Modal/FichaCard.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as _ };
//# sourceMappingURL=FichaCard-AlYQo5JS.mjs.map
