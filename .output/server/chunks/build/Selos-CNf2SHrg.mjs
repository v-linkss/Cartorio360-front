import { ref, watch, mergeProps, unref, isRef, withCtx, createTextVNode, createVNode, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderAttr } from 'vue/server-renderer';
import { _ as _imports_2 } from './selo-BbPW8sAX.mjs';
import { V as VDialog, a as VCard, b as VCardTitle, d as VCardActions } from './VCard-B4PGaBQ9.mjs';
import { V as VContainer } from './VContainer-Dd724oJ4.mjs';
import { at as VDataTable } from './server.mjs';

const _sfc_main = {
  __name: "Selos",
  __ssrInlineRender: true,
  props: {
    show: Boolean
  },
  emits: ["close"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const isVisible = ref(props.show);
    const emit = __emit;
    const headers = [
      { title: "Numero", value: "protocolo" },
      { title: "Referencia", value: "usuario_nome" },
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
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(VDialog, mergeProps({
        modelValue: unref(isVisible),
        "onUpdate:modelValue": ($event) => isRef(isVisible) ? isVisible.value = $event : null,
        "max-width": "500"
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VCard, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VCardTitle, { class: "text-h5" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Reimpress\xE3o de Selos`);
                      } else {
                        return [
                          createTextVNode("Reimpress\xE3o de Selos")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VContainer, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<hr class="mb-5"${_scopeId3}>`);
                        _push4(ssrRenderComponent(VDataTable, {
                          headers,
                          items: _ctx.atosItems,
                          "item-key": "id",
                          "show-select": ""
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode("hr", { class: "mb-5" }),
                          createVNode(VDataTable, {
                            headers,
                            items: _ctx.atosItems,
                            "item-key": "id",
                            "show-select": ""
                          }, null, 8, ["items"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VCardActions, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div${_scopeId3}><img${ssrRenderAttr("src", _imports_2)} alt=""${_scopeId3}></div>`);
                      } else {
                        return [
                          createVNode("div", null, [
                            createVNode("img", {
                              src: _imports_2,
                              alt: "",
                              onClick: closeModal
                            })
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VCardTitle, { class: "text-h5" }, {
                      default: withCtx(() => [
                        createTextVNode("Reimpress\xE3o de Selos")
                      ]),
                      _: 1
                    }),
                    createVNode(VContainer, null, {
                      default: withCtx(() => [
                        createVNode("hr", { class: "mb-5" }),
                        createVNode(VDataTable, {
                          headers,
                          items: _ctx.atosItems,
                          "item-key": "id",
                          "show-select": ""
                        }, null, 8, ["items"])
                      ]),
                      _: 1
                    }),
                    createVNode(VCardActions, null, {
                      default: withCtx(() => [
                        createVNode("div", null, [
                          createVNode("img", {
                            src: _imports_2,
                            alt: "",
                            onClick: closeModal
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
                  createVNode(VCardTitle, { class: "text-h5" }, {
                    default: withCtx(() => [
                      createTextVNode("Reimpress\xE3o de Selos")
                    ]),
                    _: 1
                  }),
                  createVNode(VContainer, null, {
                    default: withCtx(() => [
                      createVNode("hr", { class: "mb-5" }),
                      createVNode(VDataTable, {
                        headers,
                        items: _ctx.atosItems,
                        "item-key": "id",
                        "show-select": ""
                      }, null, 8, ["items"])
                    ]),
                    _: 1
                  }),
                  createVNode(VCardActions, null, {
                    default: withCtx(() => [
                      createVNode("div", null, [
                        createVNode("img", {
                          src: _imports_2,
                          alt: "",
                          onClick: closeModal
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

export { _sfc_main as _ };
//# sourceMappingURL=Selos-CNf2SHrg.mjs.map
