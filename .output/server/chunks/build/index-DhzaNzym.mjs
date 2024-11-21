import { _ as __nuxt_component_0$1 } from './nuxt-link-DyZc7qn_.mjs';
import { Money3Directive } from 'v-money3';
import { computed, ref, shallowRef, watchEffect, watch, createVNode, mergeProps, Fragment, withDirectives, resolveDirective, vModelText, reactive, withCtx, unref, openBlock, createBlock, useSSRContext, nextTick, isRef, toDisplayString, createTextVNode, toRaw } from 'vue';
import { ssrRenderComponent, ssrRenderStyle, ssrRenderAttr, ssrRenderClass, ssrIncludeBooleanAttr, ssrInterpolate, ssrRenderAttrs, ssrGetDirectiveProps, ssrGetDynamicModelProps } from 'vue/server-renderer';
import { p as propsFactory, aL as makeVInputProps, aM as makeVFieldProps, t as genericComponent, aN as Intersect, w as useProxiedModel, aO as useFocus, C as useRender, aP as filterInputAttrs, aQ as VInput, aR as filterFieldProps, aS as VField, aT as VCounter, D as forwardRefs, u as useRouter$1, d as useCookie, V as VTextField, as as VDataTable, aU as callEvent, aB as convertToUnit, b as useRuntimeConfig, aV as clamp, f as useNuxtApp, _ as _export_sfc, e as VBtn } from './server.mjs';
import { V as VDialog, a as VCard, d as VCardText, c as VCardActions } from './VCard-DfTYaOUe.mjs';
import { V as VContainer } from './VContainer-chgtNZst.mjs';
import { V as VRow } from './VRow-BuaJrtx0.mjs';
import { u as useFetch } from './fetch-Dsyde8UD.mjs';
import { _ as _imports_0, a as _imports_4 } from './mudarStatus-D3vc2C0t.mjs';
import { _ as _imports_0$1 } from './sair-CV1ySkp8.mjs';
import { V as VAutocomplete, _ as _imports_1$2 } from './salvar-DRINGrxl.mjs';
import { useVuelidate } from '@vuelidate/core';
import { helpers, required } from '@vuelidate/validators';
import { _ as _imports_1$1 } from './visualizar-CsXww5Hd.mjs';
import { _ as _imports_2$1 } from './editar-D76uoVXa.mjs';
import { _ as _imports_3 } from './excluido-C2YSm4o2.mjs';
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
import '@ckeditor/ckeditor5-vue';
import 'vue3-toastify';
import 'vue-the-mask';

const makeVTextareaProps = propsFactory({
  autoGrow: Boolean,
  autofocus: Boolean,
  counter: [Boolean, Number, String],
  counterValue: Function,
  prefix: String,
  placeholder: String,
  persistentPlaceholder: Boolean,
  persistentCounter: Boolean,
  noResize: Boolean,
  rows: {
    type: [Number, String],
    default: 5,
    validator: (v) => !isNaN(parseFloat(v))
  },
  maxRows: {
    type: [Number, String],
    validator: (v) => !isNaN(parseFloat(v))
  },
  suffix: String,
  modelModifiers: Object,
  ...makeVInputProps(),
  ...makeVFieldProps()
}, "VTextarea");
const VTextarea = genericComponent()({
  name: "VTextarea",
  directives: {
    Intersect
  },
  inheritAttrs: false,
  props: makeVTextareaProps(),
  emits: {
    "click:control": (e) => true,
    "mousedown:control": (e) => true,
    "update:focused": (focused) => true,
    "update:modelValue": (val) => true
  },
  setup(props, _ref) {
    let {
      attrs,
      emit,
      slots
    } = _ref;
    const model = useProxiedModel(props, "modelValue");
    const {
      isFocused,
      focus,
      blur
    } = useFocus(props);
    const counterValue = computed(() => {
      return typeof props.counterValue === "function" ? props.counterValue(model.value) : (model.value || "").toString().length;
    });
    const max = computed(() => {
      if (attrs.maxlength)
        return attrs.maxlength;
      if (!props.counter || typeof props.counter !== "number" && typeof props.counter !== "string")
        return void 0;
      return props.counter;
    });
    function onIntersect(isIntersecting, entries) {
      var _a, _b;
      if (!props.autofocus || !isIntersecting)
        return;
      (_b = (_a = entries[0].target) == null ? void 0 : _a.focus) == null ? void 0 : _b.call(_a);
    }
    const vInputRef = ref();
    const vFieldRef = ref();
    const controlHeight = shallowRef("");
    const textareaRef = ref();
    const isActive = computed(() => props.persistentPlaceholder || isFocused.value || props.active);
    function onFocus() {
      var _a;
      if (textareaRef.value !== (void 0).activeElement) {
        (_a = textareaRef.value) == null ? void 0 : _a.focus();
      }
      if (!isFocused.value)
        focus();
    }
    function onControlClick(e) {
      onFocus();
      emit("click:control", e);
    }
    function onControlMousedown(e) {
      emit("mousedown:control", e);
    }
    function onClear(e) {
      e.stopPropagation();
      onFocus();
      nextTick(() => {
        model.value = "";
        callEvent(props["onClick:clear"], e);
      });
    }
    function onInput(e) {
      var _a;
      const el = e.target;
      model.value = el.value;
      if ((_a = props.modelModifiers) == null ? void 0 : _a.trim) {
        const caretPosition = [el.selectionStart, el.selectionEnd];
        nextTick(() => {
          el.selectionStart = caretPosition[0];
          el.selectionEnd = caretPosition[1];
        });
      }
    }
    const sizerRef = ref();
    const rows = ref(+props.rows);
    const isPlainOrUnderlined = computed(() => ["plain", "underlined"].includes(props.variant));
    watchEffect(() => {
      if (!props.autoGrow)
        rows.value = +props.rows;
    });
    function calculateInputHeight() {
      if (!props.autoGrow)
        return;
      nextTick(() => {
        if (!sizerRef.value || !vFieldRef.value)
          return;
        const style = getComputedStyle(sizerRef.value);
        const fieldStyle = getComputedStyle(vFieldRef.value.$el);
        const padding = parseFloat(style.getPropertyValue("--v-field-padding-top")) + parseFloat(style.getPropertyValue("--v-input-padding-top")) + parseFloat(style.getPropertyValue("--v-field-padding-bottom"));
        const height = sizerRef.value.scrollHeight;
        const lineHeight = parseFloat(style.lineHeight);
        const minHeight = Math.max(parseFloat(props.rows) * lineHeight + padding, parseFloat(fieldStyle.getPropertyValue("--v-input-control-height")));
        const maxHeight = parseFloat(props.maxRows) * lineHeight + padding || Infinity;
        const newHeight = clamp(height != null ? height : 0, minHeight, maxHeight);
        rows.value = Math.floor((newHeight - padding) / lineHeight);
        controlHeight.value = convertToUnit(newHeight);
      });
    }
    watch(model, calculateInputHeight);
    watch(() => props.rows, calculateInputHeight);
    watch(() => props.maxRows, calculateInputHeight);
    watch(() => props.density, calculateInputHeight);
    let observer;
    watch(sizerRef, (val) => {
      if (val) {
        observer = new ResizeObserver(calculateInputHeight);
        observer.observe(sizerRef.value);
      } else {
        observer == null ? void 0 : observer.disconnect();
      }
    });
    useRender(() => {
      const hasCounter = !!(slots.counter || props.counter || props.counterValue);
      const hasDetails = !!(hasCounter || slots.details);
      const [rootAttrs, inputAttrs] = filterInputAttrs(attrs);
      const {
        modelValue: _,
        ...inputProps
      } = VInput.filterProps(props);
      const fieldProps = filterFieldProps(props);
      return createVNode(VInput, mergeProps({
        "ref": vInputRef,
        "modelValue": model.value,
        "onUpdate:modelValue": ($event) => model.value = $event,
        "class": ["v-textarea v-text-field", {
          "v-textarea--prefixed": props.prefix,
          "v-textarea--suffixed": props.suffix,
          "v-text-field--prefixed": props.prefix,
          "v-text-field--suffixed": props.suffix,
          "v-textarea--auto-grow": props.autoGrow,
          "v-textarea--no-resize": props.noResize || props.autoGrow,
          "v-input--plain-underlined": isPlainOrUnderlined.value
        }, props.class],
        "style": props.style
      }, rootAttrs, inputProps, {
        "centerAffix": rows.value === 1 && !isPlainOrUnderlined.value,
        "focused": isFocused.value
      }), {
        ...slots,
        default: (_ref2) => {
          let {
            id,
            isDisabled,
            isDirty,
            isReadonly,
            isValid
          } = _ref2;
          return createVNode(VField, mergeProps({
            "ref": vFieldRef,
            "style": {
              "--v-textarea-control-height": controlHeight.value
            },
            "onClick": onControlClick,
            "onMousedown": onControlMousedown,
            "onClick:clear": onClear,
            "onClick:prependInner": props["onClick:prependInner"],
            "onClick:appendInner": props["onClick:appendInner"]
          }, fieldProps, {
            "id": id.value,
            "active": isActive.value || isDirty.value,
            "centerAffix": rows.value === 1 && !isPlainOrUnderlined.value,
            "dirty": isDirty.value || props.dirty,
            "disabled": isDisabled.value,
            "focused": isFocused.value,
            "error": isValid.value === false
          }), {
            ...slots,
            default: (_ref3) => {
              let {
                props: {
                  class: fieldClass,
                  ...slotProps
                }
              } = _ref3;
              return createVNode(Fragment, null, [props.prefix && createVNode("span", {
                "class": "v-text-field__prefix"
              }, [props.prefix]), withDirectives(createVNode("textarea", mergeProps({
                "ref": textareaRef,
                "class": fieldClass,
                "value": model.value,
                "onInput": onInput,
                "autofocus": props.autofocus,
                "readonly": isReadonly.value,
                "disabled": isDisabled.value,
                "placeholder": props.placeholder,
                "rows": props.rows,
                "name": props.name,
                "onFocus": onFocus,
                "onBlur": blur
              }, slotProps, inputAttrs), null), [[resolveDirective("intersect"), {
                handler: onIntersect
              }, null, {
                once: true
              }]]), props.autoGrow && withDirectives(createVNode("textarea", {
                "class": [fieldClass, "v-textarea__sizer"],
                "id": `${slotProps.id}-sizer`,
                "onUpdate:modelValue": ($event) => model.value = $event,
                "ref": sizerRef,
                "readonly": true,
                "aria-hidden": "true"
              }, null), [[vModelText, model.value]]), props.suffix && createVNode("span", {
                "class": "v-text-field__suffix"
              }, [props.suffix])]);
            }
          });
        },
        details: hasDetails ? (slotProps) => {
          var _a;
          return createVNode(Fragment, null, [(_a = slots.details) == null ? void 0 : _a.call(slots, slotProps), hasCounter && createVNode(Fragment, null, [createVNode("span", null, null), createVNode(VCounter, {
            "active": props.persistentCounter || isFocused.value,
            "value": counterValue.value,
            "max": max.value,
            "disabled": props.disabled
          }, slots.counter)])]);
        } : void 0
      });
    });
    return forwardRefs({}, vInputRef, vFieldRef, textareaRef);
  }
});
const _sfc_main$4 = {
  name: "MoneyInput",
  props: {
    modelValue: {
      type: String,
      default: "0.00"
    }
  },
  data() {
    return {
      amount: this.modelValue,
      config: {
        thousands: "",
        decimal: ".",
        precision: 2
      }
    };
  },
  directives: { money3: Money3Directive },
  watch: {
    amount(val) {
      this.$emit("update:modelValue", val);
    },
    modelValue(val) {
      this.amount = val;
    }
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _directive_money3 = resolveDirective("money3");
  let _temp0;
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "input-wrapper" }, _attrs))}><input${ssrRenderAttrs((_temp0 = mergeProps({
    id: "valor",
    style: { "border": "1px solid black", "background-color": "#E4E0E1", "border-radius": "4px", "padding": "7px 0px 7px 7px" },
    value: $data.amount
  }, ssrGetDirectiveProps(_ctx, _directive_money3, $data.config)), mergeProps(_temp0, ssrGetDynamicModelProps(_temp0, $data.amount))))}> ${ssrInterpolate(typeof $data.amount)}</div>`);
}
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/MoneyInput.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["ssrRender", _sfc_ssrRender]]);
const _sfc_main$3 = {
  __name: "ModalRecebimentoCond",
  __ssrInlineRender: true,
  props: {
    show: Boolean,
    faltaReceber: Number
  },
  emits: ["close", "confirmar"],
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
    const confirmarRecebimento = () => {
      emit("confirmar");
      closeModal();
    };
    const closeModal = () => {
      isVisible.value = false;
      emit("close");
    };
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
                              _push5(`<h1${_scopeId4}>Confirma\xE7\xE3o de Recebimento</h1>`);
                            } else {
                              return [
                                createVNode("h1", null, "Confirma\xE7\xE3o de Recebimento")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VRow, { class: "ml-2" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<p${_scopeId4}> O valor recebido \xE9 menor que o valor da OS, confirma o recebimento parcial? </p>`);
                            } else {
                              return [
                                createVNode("p", null, " O valor recebido \xE9 menor que o valor da OS, confirma o recebimento parcial? ")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VRow, { class: "mb-5 mt-1 ml-2" }, {
                            default: withCtx(() => [
                              createVNode("h1", null, "Confirma\xE7\xE3o de Recebimento")
                            ]),
                            _: 1
                          }),
                          createVNode(VRow, { class: "ml-2" }, {
                            default: withCtx(() => [
                              createVNode("p", null, " O valor recebido \xE9 menor que o valor da OS, confirma o recebimento parcial? ")
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VCardActions, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VBtn, {
                          style: { "background-color": "#429946", "color": "white" },
                          onClick: confirmarRecebimento
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Confirmar`);
                            } else {
                              return [
                                createTextVNode("Confirmar")
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
                              _push5(`Cancelar`);
                            } else {
                              return [
                                createTextVNode("Cancelar")
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
                              createTextVNode("Confirmar")
                            ]),
                            _: 1
                          }),
                          createVNode(VBtn, {
                            style: { "background-color": "red", "color": "white" },
                            onClick: closeModal
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Cancelar")
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
                        createVNode(VRow, { class: "mb-5 mt-1 ml-2" }, {
                          default: withCtx(() => [
                            createVNode("h1", null, "Confirma\xE7\xE3o de Recebimento")
                          ]),
                          _: 1
                        }),
                        createVNode(VRow, { class: "ml-2" }, {
                          default: withCtx(() => [
                            createVNode("p", null, " O valor recebido \xE9 menor que o valor da OS, confirma o recebimento parcial? ")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(VCardActions, null, {
                      default: withCtx(() => [
                        createVNode(VBtn, {
                          style: { "background-color": "#429946", "color": "white" },
                          onClick: confirmarRecebimento
                        }, {
                          default: withCtx(() => [
                            createTextVNode("Confirmar")
                          ]),
                          _: 1
                        }),
                        createVNode(VBtn, {
                          style: { "background-color": "red", "color": "white" },
                          onClick: closeModal
                        }, {
                          default: withCtx(() => [
                            createTextVNode("Cancelar")
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
                      createVNode(VRow, { class: "mb-5 mt-1 ml-2" }, {
                        default: withCtx(() => [
                          createVNode("h1", null, "Confirma\xE7\xE3o de Recebimento")
                        ]),
                        _: 1
                      }),
                      createVNode(VRow, { class: "ml-2" }, {
                        default: withCtx(() => [
                          createVNode("p", null, " O valor recebido \xE9 menor que o valor da OS, confirma o recebimento parcial? ")
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode(VCardActions, null, {
                    default: withCtx(() => [
                      createVNode(VBtn, {
                        style: { "background-color": "#429946", "color": "white" },
                        onClick: confirmarRecebimento
                      }, {
                        default: withCtx(() => [
                          createTextVNode("Confirmar")
                        ]),
                        _: 1
                      }),
                      createVNode(VBtn, {
                        style: { "background-color": "red", "color": "white" },
                        onClick: closeModal
                      }, {
                        default: withCtx(() => [
                          createTextVNode("Cancelar")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ModalRecebimentoCond.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _imports_1 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAOxAAADsQBlSsOGwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAATqSURBVHic7VtNbBtFFP7e2rGRCFZDBRJqoFRCHAAJkOiJHMCtjJwQiUs4AOKAiE2EhERvSAhygSOgSJS4BXHh1N4o1GCVVUVQD5w4IHFB0NC0HKBplSZS6p99HGgc73PGnlnPrieE7xS/fTN+++XNe7Pfjgkxo7hQzG5mW2UCXgDwCIDb+wzZAPAzQF/sH8udOP386Xqc8VGck+c/yR+Al/4awKNRxhPwEwfNZ/05/7Ll0Nrw4pq4uFDMDnLzAMDAY/BGzsycmslYDC2E2AjYzLbKGODmt8GPr167Pjv4PDsjHdfERHgR3GnA2YBS5fOz1ZVe4546WRz3gtYJAMW2keklAB/HEWdsGQDGQ50fdW4eAM7PVlfSTZRDUxEeth3eFuIjABjt/KBz81uovV67JEx3WIloB8RJwK5A3zaYXyxMs8fHiOkw+vdwV7AB4EcifPBdqfZVL8eeBBxZLLzPhLeshpY83vPLtbdVF5UE5BcL0yB8GU9MyYII06pMUNYA9vhYfCElCw7wpuqach9ATE+EDXjSL9UuWIwrNhytHJ0I4C21DYTDKt9eXSDUxnbLzQPAufK5H4RJ2Ub3fBv8n4BhBzBs7HkCtJ8G85UC9/fafdjzGdCLAO2nN9fBgHy6bENNAKGE/wAJDFzymEqq61qiaL5SWAZwX9uQSt/vv3p2efDw7CH/6eRBtJoXO0x/+OXawX7jNGsAr4c+Ba1RleewEDSacrd3Q2ecHgFEIQLA7BwBSAcypvUd/QT0CAjgPAFpTomYSIsAvX0A0TpCEq+nJODpyjNTBK4AYBBKfqlWTcKPxT+FiC1mgKgBnqfOAAIvAjgAYJwZlaT8ZFYGMmsV0CKARUHhgHqptONbfxBwb1J+TOGYyGN7RZBEBqBHBgwLLPQLBHo1QHMJyC4A5wggqVgTNnTG6S6BDWFwUB4XWUkWawCJnsoU35uaqCCIumRzCRCLguLgEpA1wGoRlDtBz3OPAIBEG7SZAYIAZnKPgK7daWCPgCa1xGTutUHIrJTPL8phOmh6kgDniiBYFGabBHgjaVFQ3FsCsgimuGVxJ7h5U7LpHAEkCUil7GVAJsg4TwBETLlczh4B1TeqNwE0OkyZOI+umaK4UMwCGOkw1XUPWJrI4iFG19bWnMmCulePpAYBBgSwmLSBlDOdgG/Lxk9A1/OAQ8JotyCqpwYBJkuAhMrqki7YJYiSVgsETAhwWBiNKogCRhkgJ1ULo0kjqiAKGHUBfWE0cUQURIGBimBPYTRRSEFUVw0CjNqgEBgcyoAuMYT1XosBRkvAXWE0qiAKmG2EHBZGowmiwCA1wCFhNKogCgzSBtVLYGXbRX0yw6ZfVw3QlMMAkwwQyrBSGL11sqTfyQy7fkIQhaddBLVPiRHROvP2G2KVMHrr7W2vd332/ZhHw2ddYsgAp4XRiILov0M1MdKiq8J0aH5+fujH7GZOzaTAONRpSzOv6o7XvoF9d+5bRrgV3r10z4UPJ45PjenOYRsTx6fGrl67/hGAuzrMN1Zp9aLuHEY/nT1SKXzGwCsmYxIH46T/Wk1dVAWMUpiD5jsA/W0eVWL4q0H0rskAIwL8Of8yEU0S8KdZXIngSsA8uVT+1ii2lOm3/H7m1ysPPvfA58xUB7AfQA4x/gS3DzYB/MLMlUaQefn7uW9+M53gH/TVyDpW2OO1AAAAAElFTkSuQmCC";
const _sfc_main$2 = {
  __name: "Ordem",
  __ssrInlineRender: true,
  props: {
    show: Boolean,
    ordem: {
      type: Object,
      required: true
    }
  },
  emits: ["close"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const { $toast } = useNuxtApp();
    const isVisible = ref(props.show);
    const isMoreOrLess = ref(false);
    const config = useRuntimeConfig();
    const listarFormasReceb = `${config.public.managemant}/listarFormasReceb`;
    const routereceberOs = `${config.public.managemant}/receberOs`;
    const usuario_token = useCookie("auth_token").value;
    const formaItens = ref([]);
    const faltaReceber = ref(null);
    const selosItems = ref([]);
    const recebimentos = ref([]);
    const state = reactive({
      descricao: null,
      forma: null,
      valor: ""
    });
    const emit = __emit;
    const headers = [
      { title: "Forma", value: "forma" },
      { title: "Valor", value: "valor" },
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
    const receberOsParcial = async () => {
      faltaReceber.value = Number(props.ordem.valor);
      isMoreOrLess.value = true;
    };
    const realizarRecebimentoCompleto = async () => {
      const body = {
        ordemserv_token: props.ordem.token,
        usuario_token,
        recebimentos: [recebimentos.value]
      };
      const { data, error } = await useFetch(routereceberOs, {
        method: "POST",
        body: JSON.stringify(body)
      }, "$vhMIR8Sr2p");
      if (data.value[0].status === "OK") {
        $toast.success("Valores Recebidos com Sucesso!");
        selosItems.value = [];
        closeModal();
      }
    };
    const formatDecimal = () => {
      props.ordem.valor = parseFloat(props.ordem.valor).toFixed(2);
      props.ordem.valor_pago = parseFloat(props.ordem.valor_pago).toFixed(2);
    };
    const loadEscreventes = async () => {
      try {
        const cartorio_token = ref(useCookie("user-data").value.cartorio_token);
        const body = {
          cartorio_token: cartorio_token.value
        };
        const { data: forma, error } = await useFetch(listarFormasReceb, {
          method: "POST",
          body: JSON.stringify(body)
        }, "$eiMzO5y6Bb");
        formaItens.value = toRaw(forma.value);
      } catch (error) {
        console.error("Erro ao realizar a requisi\xE7\xE3o:", error);
      }
    };
    const addNewRow = async () => {
      const selectedForma = formaItens.value.find(
        (forma) => forma.token === state.forma
      );
      if (!selectedForma) {
        $toast.error("Por favor, selecione uma forma.");
        return;
      }
      if (Number(props.ordem.valor) <= 0) {
        $toast.error(
          "O valor recebido n\xE3o deve ultrapassar o valor total da ordem."
        );
        return;
      }
      selosItems.value.push({
        forma: state.forma,
        descricao: selectedForma.descricao,
        valor: state.valor
      });
      recebimentos.value.push({
        forma_receb_token: state.forma,
        valor: Number(state.valor)
      });
      props.ordem.valor_pago = parseFloat(props.ordem.valor_pago) + parseFloat(state.valor);
      props.ordem.valor = parseFloat(props.ordem.valor) - parseFloat(state.valor);
      state.forma = null;
      state.valor = "0.00";
      formatDecimal();
    };
    const removeFormValueFromTable = (itemRemove) => {
      const index = selosItems.value.indexOf(itemRemove);
      if (index !== -1) {
        selosItems.value.splice(index, 1);
        recebimentos.value.splice(index, 1);
        props.ordem.valor_pago = parseFloat(props.ordem.valor_pago) - parseFloat(itemRemove.valor);
        props.ordem.valor = parseFloat(props.ordem.valor) + parseFloat(itemRemove.valor);
      }
    };
    loadEscreventes();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_MoneyInput = __nuxt_component_0;
      const _component_ModalRecebimentoCond = _sfc_main$3;
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
                              _push5(`<h1${_scopeId4}>Ordem de Servi\xE7o n\xBA</h1><h1 style="${ssrRenderStyle({ "color": "red", "margin-left": "18px" })}"${_scopeId4}>${ssrInterpolate(props.ordem.numero)}</h1>`);
                            } else {
                              return [
                                createVNode("h1", null, "Ordem de Servi\xE7o n\xBA"),
                                createVNode("h1", { style: { "color": "red", "margin-left": "18px" } }, toDisplayString(props.ordem.numero), 1)
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
                                      label: "Recebido",
                                      modelValue: props.ordem.valor_pago,
                                      "onUpdate:modelValue": ($event) => props.ordem.valor_pago = $event,
                                      disabled: ""
                                    }, null, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(VTextField, {
                                      label: "Falta Receber",
                                      modelValue: props.ordem.valor,
                                      "onUpdate:modelValue": ($event) => props.ordem.valor = $event,
                                      disabled: ""
                                    }, null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(VTextField, {
                                        class: "mr-5",
                                        label: "Recebido",
                                        modelValue: props.ordem.valor_pago,
                                        "onUpdate:modelValue": ($event) => props.ordem.valor_pago = $event,
                                        disabled: ""
                                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                                      createVNode(VTextField, {
                                        label: "Falta Receber",
                                        modelValue: props.ordem.valor,
                                        "onUpdate:modelValue": ($event) => props.ordem.valor = $event,
                                        disabled: ""
                                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
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
                                      modelValue: unref(state).forma,
                                      "onUpdate:modelValue": ($event) => unref(state).forma = $event,
                                      items: unref(formaItens),
                                      "item-title": "descricao",
                                      "item-value": "token"
                                    }, null, _parent6, _scopeId5));
                                    _push6(`<div style="${ssrRenderStyle({ "max-width": "180px" })}"${_scopeId5}>`);
                                    _push6(ssrRenderComponent(_component_MoneyInput, {
                                      modelValue: unref(state).valor,
                                      "onUpdate:modelValue": ($event) => unref(state).valor = $event
                                    }, null, _parent6, _scopeId5));
                                    _push6(`</div><div${_scopeId5}><img${ssrRenderAttr("src", _imports_0)} class="ml-5" style="${ssrRenderStyle({ "cursor": "pointer", "height": "40px", "width": "40px" })}"${_scopeId5}></div>`);
                                  } else {
                                    return [
                                      createVNode(VAutocomplete, {
                                        class: "mb-5 mr-5",
                                        label: "Forma",
                                        modelValue: unref(state).forma,
                                        "onUpdate:modelValue": ($event) => unref(state).forma = $event,
                                        items: unref(formaItens),
                                        "item-title": "descricao",
                                        "item-value": "token"
                                      }, null, 8, ["modelValue", "onUpdate:modelValue", "items"]),
                                      createVNode("div", { style: { "max-width": "180px" } }, [
                                        createVNode(_component_MoneyInput, {
                                          modelValue: unref(state).valor,
                                          "onUpdate:modelValue": ($event) => unref(state).valor = $event
                                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                      ]),
                                      createVNode("div", null, [
                                        createVNode("img", {
                                          src: _imports_0,
                                          class: "ml-5",
                                          style: { "cursor": "pointer", "height": "40px", "width": "40px" },
                                          onClick: addNewRow
                                        })
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
                                      label: "Recebido",
                                      modelValue: props.ordem.valor_pago,
                                      "onUpdate:modelValue": ($event) => props.ordem.valor_pago = $event,
                                      disabled: ""
                                    }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                                    createVNode(VTextField, {
                                      label: "Falta Receber",
                                      modelValue: props.ordem.valor,
                                      "onUpdate:modelValue": ($event) => props.ordem.valor = $event,
                                      disabled: ""
                                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                  ]),
                                  _: 1
                                }),
                                createVNode(VRow, null, {
                                  default: withCtx(() => [
                                    createVNode(VAutocomplete, {
                                      class: "mb-5 mr-5",
                                      label: "Forma",
                                      modelValue: unref(state).forma,
                                      "onUpdate:modelValue": ($event) => unref(state).forma = $event,
                                      items: unref(formaItens),
                                      "item-title": "descricao",
                                      "item-value": "token"
                                    }, null, 8, ["modelValue", "onUpdate:modelValue", "items"]),
                                    createVNode("div", { style: { "max-width": "180px" } }, [
                                      createVNode(_component_MoneyInput, {
                                        modelValue: unref(state).valor,
                                        "onUpdate:modelValue": ($event) => unref(state).valor = $event
                                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                    ]),
                                    createVNode("div", null, [
                                      createVNode("img", {
                                        src: _imports_0,
                                        class: "ml-5",
                                        style: { "cursor": "pointer", "height": "40px", "width": "40px" },
                                        onClick: addNewRow
                                      })
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
                        }, {
                          "item.forma": withCtx(({ item }, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`${ssrInterpolate(item.descricao)}`);
                            } else {
                              return [
                                createTextVNode(toDisplayString(item.descricao), 1)
                              ];
                            }
                          }),
                          "item.actions": withCtx(({ item }, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<div style="${ssrRenderStyle({ "display": "flex", "justify-content": "flex-end" })}" title="Remover"${_scopeId4}><img style="${ssrRenderStyle({ "width": "30px", "height": "30px", "cursor": "pointer" })}"${ssrRenderAttr("src", _imports_1)} alt="Remover"${_scopeId4}></div>`);
                            } else {
                              return [
                                createVNode("div", {
                                  style: { "display": "flex", "justify-content": "flex-end" },
                                  onClick: ($event) => removeFormValueFromTable(item),
                                  title: "Remover"
                                }, [
                                  createVNode("img", {
                                    style: { "width": "30px", "height": "30px", "cursor": "pointer" },
                                    src: _imports_1,
                                    alt: "Remover"
                                  })
                                ], 8, ["onClick"])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VRow, { class: "mb-5 mt-1 ml-2" }, {
                            default: withCtx(() => [
                              createVNode("h1", null, "Ordem de Servi\xE7o n\xBA"),
                              createVNode("h1", { style: { "color": "red", "margin-left": "18px" } }, toDisplayString(props.ordem.numero), 1)
                            ]),
                            _: 1
                          }),
                          createVNode(VContainer, null, {
                            default: withCtx(() => [
                              createVNode(VRow, null, {
                                default: withCtx(() => [
                                  createVNode(VTextField, {
                                    class: "mr-5",
                                    label: "Recebido",
                                    modelValue: props.ordem.valor_pago,
                                    "onUpdate:modelValue": ($event) => props.ordem.valor_pago = $event,
                                    disabled: ""
                                  }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                                  createVNode(VTextField, {
                                    label: "Falta Receber",
                                    modelValue: props.ordem.valor,
                                    "onUpdate:modelValue": ($event) => props.ordem.valor = $event,
                                    disabled: ""
                                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                ]),
                                _: 1
                              }),
                              createVNode(VRow, null, {
                                default: withCtx(() => [
                                  createVNode(VAutocomplete, {
                                    class: "mb-5 mr-5",
                                    label: "Forma",
                                    modelValue: unref(state).forma,
                                    "onUpdate:modelValue": ($event) => unref(state).forma = $event,
                                    items: unref(formaItens),
                                    "item-title": "descricao",
                                    "item-value": "token"
                                  }, null, 8, ["modelValue", "onUpdate:modelValue", "items"]),
                                  createVNode("div", { style: { "max-width": "180px" } }, [
                                    createVNode(_component_MoneyInput, {
                                      modelValue: unref(state).valor,
                                      "onUpdate:modelValue": ($event) => unref(state).valor = $event
                                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                  ]),
                                  createVNode("div", null, [
                                    createVNode("img", {
                                      src: _imports_0,
                                      class: "ml-5",
                                      style: { "cursor": "pointer", "height": "40px", "width": "40px" },
                                      onClick: addNewRow
                                    })
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
                          }, {
                            "item.forma": withCtx(({ item }) => [
                              createTextVNode(toDisplayString(item.descricao), 1)
                            ]),
                            "item.actions": withCtx(({ item }) => [
                              createVNode("div", {
                                style: { "display": "flex", "justify-content": "flex-end" },
                                onClick: ($event) => removeFormValueFromTable(item),
                                title: "Remover"
                              }, [
                                createVNode("img", {
                                  style: { "width": "30px", "height": "30px", "cursor": "pointer" },
                                  src: _imports_1,
                                  alt: "Remover"
                                })
                              ], 8, ["onClick"])
                            ]),
                            _: 1
                          }, 8, ["items"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<div style="${ssrRenderStyle({ "display": "flex", "justify-content": "flex-start" })}"${_scopeId2}><div class="ml-10"${_scopeId2}><img${ssrRenderAttr("src", _imports_0$1)} style="${ssrRenderStyle({ "cursor": "pointer" })}"${_scopeId2}></div><div class="ml-12 mb-5"${_scopeId2}>`);
                  if (Number(props.ordem.valor) > 0) {
                    _push3(`<img${ssrRenderAttr("src", _imports_1$2)} style="${ssrRenderStyle({ "cursor": "pointer" })}"${_scopeId2}>`);
                  } else {
                    _push3(`<img${ssrRenderAttr("src", _imports_1$2)} style="${ssrRenderStyle({ "cursor": "pointer" })}"${_scopeId2}>`);
                  }
                  _push3(`</div></div>`);
                } else {
                  return [
                    createVNode(VContainer, null, {
                      default: withCtx(() => [
                        createVNode(VRow, { class: "mb-5 mt-1 ml-2" }, {
                          default: withCtx(() => [
                            createVNode("h1", null, "Ordem de Servi\xE7o n\xBA"),
                            createVNode("h1", { style: { "color": "red", "margin-left": "18px" } }, toDisplayString(props.ordem.numero), 1)
                          ]),
                          _: 1
                        }),
                        createVNode(VContainer, null, {
                          default: withCtx(() => [
                            createVNode(VRow, null, {
                              default: withCtx(() => [
                                createVNode(VTextField, {
                                  class: "mr-5",
                                  label: "Recebido",
                                  modelValue: props.ordem.valor_pago,
                                  "onUpdate:modelValue": ($event) => props.ordem.valor_pago = $event,
                                  disabled: ""
                                }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                                createVNode(VTextField, {
                                  label: "Falta Receber",
                                  modelValue: props.ordem.valor,
                                  "onUpdate:modelValue": ($event) => props.ordem.valor = $event,
                                  disabled: ""
                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                              ]),
                              _: 1
                            }),
                            createVNode(VRow, null, {
                              default: withCtx(() => [
                                createVNode(VAutocomplete, {
                                  class: "mb-5 mr-5",
                                  label: "Forma",
                                  modelValue: unref(state).forma,
                                  "onUpdate:modelValue": ($event) => unref(state).forma = $event,
                                  items: unref(formaItens),
                                  "item-title": "descricao",
                                  "item-value": "token"
                                }, null, 8, ["modelValue", "onUpdate:modelValue", "items"]),
                                createVNode("div", { style: { "max-width": "180px" } }, [
                                  createVNode(_component_MoneyInput, {
                                    modelValue: unref(state).valor,
                                    "onUpdate:modelValue": ($event) => unref(state).valor = $event
                                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                ]),
                                createVNode("div", null, [
                                  createVNode("img", {
                                    src: _imports_0,
                                    class: "ml-5",
                                    style: { "cursor": "pointer", "height": "40px", "width": "40px" },
                                    onClick: addNewRow
                                  })
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
                        }, {
                          "item.forma": withCtx(({ item }) => [
                            createTextVNode(toDisplayString(item.descricao), 1)
                          ]),
                          "item.actions": withCtx(({ item }) => [
                            createVNode("div", {
                              style: { "display": "flex", "justify-content": "flex-end" },
                              onClick: ($event) => removeFormValueFromTable(item),
                              title: "Remover"
                            }, [
                              createVNode("img", {
                                style: { "width": "30px", "height": "30px", "cursor": "pointer" },
                                src: _imports_1,
                                alt: "Remover"
                              })
                            ], 8, ["onClick"])
                          ]),
                          _: 1
                        }, 8, ["items"])
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
                      createVNode("div", { class: "ml-12 mb-5" }, [
                        Number(props.ordem.valor) > 0 ? (openBlock(), createBlock("img", {
                          key: 0,
                          src: _imports_1$2,
                          style: { "cursor": "pointer" },
                          onClick: receberOsParcial
                        })) : (openBlock(), createBlock("img", {
                          key: 1,
                          src: _imports_1$2,
                          style: { "cursor": "pointer" },
                          onClick: realizarRecebimentoCompleto
                        }))
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_ModalRecebimentoCond, {
              modelValue: unref(isMoreOrLess),
              "onUpdate:modelValue": ($event) => isRef(isMoreOrLess) ? isMoreOrLess.value = $event : null,
              faltaReceber: unref(faltaReceber),
              onClose: ($event) => isMoreOrLess.value = false,
              onConfirmar: realizarRecebimentoCompleto
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(VCard, null, {
                default: withCtx(() => [
                  createVNode(VContainer, null, {
                    default: withCtx(() => [
                      createVNode(VRow, { class: "mb-5 mt-1 ml-2" }, {
                        default: withCtx(() => [
                          createVNode("h1", null, "Ordem de Servi\xE7o n\xBA"),
                          createVNode("h1", { style: { "color": "red", "margin-left": "18px" } }, toDisplayString(props.ordem.numero), 1)
                        ]),
                        _: 1
                      }),
                      createVNode(VContainer, null, {
                        default: withCtx(() => [
                          createVNode(VRow, null, {
                            default: withCtx(() => [
                              createVNode(VTextField, {
                                class: "mr-5",
                                label: "Recebido",
                                modelValue: props.ordem.valor_pago,
                                "onUpdate:modelValue": ($event) => props.ordem.valor_pago = $event,
                                disabled: ""
                              }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                              createVNode(VTextField, {
                                label: "Falta Receber",
                                modelValue: props.ordem.valor,
                                "onUpdate:modelValue": ($event) => props.ordem.valor = $event,
                                disabled: ""
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            _: 1
                          }),
                          createVNode(VRow, null, {
                            default: withCtx(() => [
                              createVNode(VAutocomplete, {
                                class: "mb-5 mr-5",
                                label: "Forma",
                                modelValue: unref(state).forma,
                                "onUpdate:modelValue": ($event) => unref(state).forma = $event,
                                items: unref(formaItens),
                                "item-title": "descricao",
                                "item-value": "token"
                              }, null, 8, ["modelValue", "onUpdate:modelValue", "items"]),
                              createVNode("div", { style: { "max-width": "180px" } }, [
                                createVNode(_component_MoneyInput, {
                                  modelValue: unref(state).valor,
                                  "onUpdate:modelValue": ($event) => unref(state).valor = $event
                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                              ]),
                              createVNode("div", null, [
                                createVNode("img", {
                                  src: _imports_0,
                                  class: "ml-5",
                                  style: { "cursor": "pointer", "height": "40px", "width": "40px" },
                                  onClick: addNewRow
                                })
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
                      }, {
                        "item.forma": withCtx(({ item }) => [
                          createTextVNode(toDisplayString(item.descricao), 1)
                        ]),
                        "item.actions": withCtx(({ item }) => [
                          createVNode("div", {
                            style: { "display": "flex", "justify-content": "flex-end" },
                            onClick: ($event) => removeFormValueFromTable(item),
                            title: "Remover"
                          }, [
                            createVNode("img", {
                              style: { "width": "30px", "height": "30px", "cursor": "pointer" },
                              src: _imports_1,
                              alt: "Remover"
                            })
                          ], 8, ["onClick"])
                        ]),
                        _: 1
                      }, 8, ["items"])
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
                    createVNode("div", { class: "ml-12 mb-5" }, [
                      Number(props.ordem.valor) > 0 ? (openBlock(), createBlock("img", {
                        key: 0,
                        src: _imports_1$2,
                        style: { "cursor": "pointer" },
                        onClick: receberOsParcial
                      })) : (openBlock(), createBlock("img", {
                        key: 1,
                        src: _imports_1$2,
                        style: { "cursor": "pointer" },
                        onClick: realizarRecebimentoCompleto
                      }))
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_ModalRecebimentoCond, {
                modelValue: unref(isMoreOrLess),
                "onUpdate:modelValue": ($event) => isRef(isMoreOrLess) ? isMoreOrLess.value = $event : null,
                faltaReceber: unref(faltaReceber),
                onClose: ($event) => isMoreOrLess.value = false,
                onConfirmar: realizarRecebimentoCompleto
              }, null, 8, ["modelValue", "onUpdate:modelValue", "faltaReceber", "onClose"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Recebimento/Ordem.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = {
  __name: "Ordem",
  __ssrInlineRender: true,
  props: {
    show: Boolean,
    numero_os: Number,
    ordemserv_token: String
  },
  emits: ["close"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const isVisible = ref(props.show);
    const config = useRuntimeConfig();
    ref(useCookie("user-data").value.cartorio_token).value;
    const usuario_token = useCookie("auth_token").value;
    const analisaCancelamento = `${config.public.managemant}/analisaCancelamento`;
    const cancelarOs = `${config.public.managemant}/cancelaOs`;
    const state = reactive({
      motivo: null
    });
    const analiseCancela = ref(null);
    const emit = __emit;
    const rules = {
      motivo: {
        required: helpers.withMessage("O campo \xE9 obrigatorio", required)
      }
    };
    const v$ = useVuelidate(rules, state);
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
    const analisaCancelamentoOs = async () => {
      const { data, error } = await useFetch(`${analisaCancelamento}`, {
        method: "POST",
        body: { ordemserv_token: props.ordemserv_token }
      }, "$1fnrIk2fgs");
      analiseCancela.value = data.value.mensagem;
    };
    analisaCancelamentoOs();
    const cancelarOrdemServ = async () => {
      if (await v$.value.$validate()) {
        const { status } = await useFetch(`${cancelarOs}`, {
          method: "POST",
          body: { usuario_token, motivo: state.motivo, ordemserv_token: props.ordemserv_token }
        }, "$21WlhUNXeM");
        if (status.value === "success") {
          (void 0).location.reload();
          closeModal();
        }
      }
    };
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
                              _push5(`<h1${_scopeId4}>Cancelamento da OS n\xBA</h1><h1 style="${ssrRenderStyle({ "color": "red", "margin-left": "18px" })}"${_scopeId4}>${ssrInterpolate(props.numero_os)}</h1>`);
                            } else {
                              return [
                                createVNode("h1", null, "Cancelamento da OS n\xBA"),
                                createVNode("h1", { style: { "color": "red", "margin-left": "18px" } }, toDisplayString(props.numero_os), 1)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VContainer, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VCard, {
                                variant: "outlined",
                                class: "mb-5"
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(VCardText, null, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`${ssrInterpolate(unref(analiseCancela))}`);
                                        } else {
                                          return [
                                            createTextVNode(toDisplayString(unref(analiseCancela)), 1)
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(VCardText, null, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(unref(analiseCancela)), 1)
                                        ]),
                                        _: 1
                                      })
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(VTextarea, {
                                label: "Motivo",
                                modelValue: unref(state).motivo,
                                "onUpdate:modelValue": ($event) => unref(state).motivo = $event,
                                required: "",
                                "error-messages": unref(v$).motivo.$errors.map((e) => e.$message),
                                onBlur: unref(v$).motivo.$touch,
                                onInput: unref(v$).motivo.$touch
                              }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(VCard, {
                                  variant: "outlined",
                                  class: "mb-5"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(VCardText, null, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(unref(analiseCancela)), 1)
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }),
                                createVNode(VTextarea, {
                                  label: "Motivo",
                                  modelValue: unref(state).motivo,
                                  "onUpdate:modelValue": ($event) => unref(state).motivo = $event,
                                  required: "",
                                  "error-messages": unref(v$).motivo.$errors.map((e) => e.$message),
                                  onBlur: unref(v$).motivo.$touch,
                                  onInput: unref(v$).motivo.$touch
                                }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages", "onBlur", "onInput"])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VRow, { class: "mb-5 mt-1 ml-2" }, {
                            default: withCtx(() => [
                              createVNode("h1", null, "Cancelamento da OS n\xBA"),
                              createVNode("h1", { style: { "color": "red", "margin-left": "18px" } }, toDisplayString(props.numero_os), 1)
                            ]),
                            _: 1
                          }),
                          createVNode(VContainer, null, {
                            default: withCtx(() => [
                              createVNode(VCard, {
                                variant: "outlined",
                                class: "mb-5"
                              }, {
                                default: withCtx(() => [
                                  createVNode(VCardText, null, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(unref(analiseCancela)), 1)
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }),
                              createVNode(VTextarea, {
                                label: "Motivo",
                                modelValue: unref(state).motivo,
                                "onUpdate:modelValue": ($event) => unref(state).motivo = $event,
                                required: "",
                                "error-messages": unref(v$).motivo.$errors.map((e) => e.$message),
                                onBlur: unref(v$).motivo.$touch,
                                onInput: unref(v$).motivo.$touch
                              }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages", "onBlur", "onInput"])
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<div style="${ssrRenderStyle({ "display": "flex", "justify-content": "flex-start" })}"${_scopeId2}><div class="ml-10"${_scopeId2}><img${ssrRenderAttr("src", _imports_0$1)} style="${ssrRenderStyle({ "cursor": "pointer" })}"${_scopeId2}></div><div class="ml-12"${_scopeId2}><img${ssrRenderAttr("src", _imports_1$2)} style="${ssrRenderStyle({ "cursor": "pointer" })}"${_scopeId2}></div></div>`);
                } else {
                  return [
                    createVNode(VContainer, null, {
                      default: withCtx(() => [
                        createVNode(VRow, { class: "mb-5 mt-1 ml-2" }, {
                          default: withCtx(() => [
                            createVNode("h1", null, "Cancelamento da OS n\xBA"),
                            createVNode("h1", { style: { "color": "red", "margin-left": "18px" } }, toDisplayString(props.numero_os), 1)
                          ]),
                          _: 1
                        }),
                        createVNode(VContainer, null, {
                          default: withCtx(() => [
                            createVNode(VCard, {
                              variant: "outlined",
                              class: "mb-5"
                            }, {
                              default: withCtx(() => [
                                createVNode(VCardText, null, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(unref(analiseCancela)), 1)
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }),
                            createVNode(VTextarea, {
                              label: "Motivo",
                              modelValue: unref(state).motivo,
                              "onUpdate:modelValue": ($event) => unref(state).motivo = $event,
                              required: "",
                              "error-messages": unref(v$).motivo.$errors.map((e) => e.$message),
                              onBlur: unref(v$).motivo.$touch,
                              onInput: unref(v$).motivo.$touch
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages", "onBlur", "onInput"])
                          ]),
                          _: 1
                        })
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
                          src: _imports_1$2,
                          style: { "cursor": "pointer" },
                          onClick: cancelarOrdemServ
                        })
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
                          createVNode("h1", null, "Cancelamento da OS n\xBA"),
                          createVNode("h1", { style: { "color": "red", "margin-left": "18px" } }, toDisplayString(props.numero_os), 1)
                        ]),
                        _: 1
                      }),
                      createVNode(VContainer, null, {
                        default: withCtx(() => [
                          createVNode(VCard, {
                            variant: "outlined",
                            class: "mb-5"
                          }, {
                            default: withCtx(() => [
                              createVNode(VCardText, null, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(unref(analiseCancela)), 1)
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(VTextarea, {
                            label: "Motivo",
                            modelValue: unref(state).motivo,
                            "onUpdate:modelValue": ($event) => unref(state).motivo = $event,
                            required: "",
                            "error-messages": unref(v$).motivo.$errors.map((e) => e.$message),
                            onBlur: unref(v$).motivo.$touch,
                            onInput: unref(v$).motivo.$touch
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages", "onBlur", "onInput"])
                        ]),
                        _: 1
                      })
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
                        src: _imports_1$2,
                        style: { "cursor": "pointer" },
                        onClick: cancelarOrdemServ
                      })
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Cancelamento/Ordem.vue");
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
    const isModalCancelamentoOpen = ref(false);
    const showCreateOrdemServ = ref(null);
    const ordemserv_token = ref(null);
    const numero_os = ref(null);
    const selectedOrder = ref({});
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
        sessionStorage.setItem("pesquisaOS", JSON.stringify(state));
        const { data: servicosData, error } = await useFetch(allServicos, {
          method: "POST",
          body: {
            cartorio_token: cartorio_token.value,
            numero: state.numero || null,
            data_inicio: state.data_inicio || null,
            data_fim: state.data_fim || null,
            data_lavratura_inicio: state.data_lavratura_inicio || null,
            data_lavratura_fim: state.data_lavratura_fim || null,
            protocolo: state.protocolo || null,
            livro: state.livro || null,
            folha: state.folha || null,
            situacao: state.situacao || null,
            usuario_token: state.usuario_token,
            selo: state.selo || null,
            ato_tipo_token: state.ato_tipo_token,
            apresentante: state.apresentante || null
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
    usuariosDataPayload();
    tipoAtosDataPayload();
    function redirectToCancelamento(numero, token, item) {
      numero_os.value = numero;
      ordemserv_token.value = token;
      isModalCancelamentoOpen.value = true;
    }
    function redirectToUpdate(id) {
      const serviceCookie = useCookie("user-service");
      const servico = servicosItems.value.find((item) => item.id === id);
      serviceCookie.value = servico.token;
      router.push({ path: `/ordens-servicos/atualizar/${id}` });
    }
    function redirectToRecebimento(numero, item) {
      numero_os.value = numero;
      selectedOrder.value = {
        token: item.token,
        numero: item.numero,
        valor: item.valor,
        valor_pago: item.valor_pago
      };
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
      const _component_NuxtLink = __nuxt_component_0$1;
      const _component_RecebimentoOrdem = _sfc_main$2;
      const _component_CancelamentoOrdem = _sfc_main$1;
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
                        _push4(`<div${_scopeId3}><img style="${ssrRenderStyle({ "width": "40px", "height": "40px", "cursor": "pointer" })}"${ssrRenderAttr("src", _imports_1$1)} alt="Pesquisar"${_scopeId3}></div>`);
                      } else {
                        return [
                          createVNode("div", null, [
                            createVNode("img", {
                              onClick: searchOrdersService,
                              style: { "width": "40px", "height": "40px", "cursor": "pointer" },
                              src: _imports_1$1,
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
                            src: _imports_1$1,
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
                        _push4(`<div class="${ssrRenderClass({ disabled: !item.btn_receber })}"${ssrRenderAttr("title", item.btn_receber ? "Receber" : "Bloqueado")} title="Receber"${_scopeId3}><img style="${ssrRenderStyle({
                          cursor: item.btn_receber ? "pointer" : "default",
                          width: "30px",
                          height: "30px"
                        })}"${ssrRenderAttr("src", _imports_2)} alt="Receber"${_scopeId3}></div><div class="${ssrRenderClass({ disabled: !item.btn_editar })}"${ssrRenderAttr("title", item.btn_editar ? "Editar" : "Bloqueado")}${_scopeId3}><img style="${ssrRenderStyle({
                          cursor: item.btn_editar ? "pointer" : "default",
                          width: "30px",
                          height: "30px"
                        })}"${ssrRenderAttr("src", _imports_2$1)} alt="Editar"${_scopeId3}></div><div${ssrIncludeBooleanAttr(!item.btn_cancelar) ? " disabled" : ""} title="Cancelamento"${_scopeId3}>`);
                        if (item.excluido) {
                          _push4(`<img style="${ssrRenderStyle({ "width": "30px", "height": "30px" })}"${ssrRenderAttr("src", _imports_3)} alt="Visualizar" title="Bloqueado"${_scopeId3}>`);
                        } else {
                          _push4(`<img${ssrRenderAttr("src", _imports_4)} alt="Cancelamento" class="trash-icon" style="${ssrRenderStyle({ "width": "30px", "height": "30px", "cursor": "pointer" })}" title="Cancelamento"${_scopeId3}>`);
                        }
                        _push4(`</div>`);
                      } else {
                        return [
                          createVNode("div", {
                            class: { disabled: !item.btn_receber },
                            title: item.btn_receber ? "Receber" : "Bloqueado",
                            onClick: ($event) => item.btn_receber ? redirectToRecebimento(item.numero, item) : null
                          }, [
                            createVNode("img", {
                              style: {
                                cursor: item.btn_receber ? "pointer" : "default",
                                width: "30px",
                                height: "30px"
                              },
                              src: _imports_2,
                              alt: "Receber"
                            }, null, 4)
                          ], 10, ["title", "onClick"]),
                          createVNode("div", {
                            class: { disabled: !item.btn_editar },
                            onClick: ($event) => item.btn_editar ? redirectToUpdate(item.id) : null,
                            title: item.btn_editar ? "Editar" : "Bloqueado"
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
                            onClick: ($event) => item.btn_cancelar ? redirectToCancelamento(item.numero, item.token) : null,
                            title: "Cancelamento"
                          }, [
                            item.excluido ? (openBlock(), createBlock("img", {
                              key: 0,
                              style: { "width": "30px", "height": "30px" },
                              src: _imports_3,
                              alt: "Visualizar",
                              title: "Bloqueado"
                            })) : (openBlock(), createBlock("img", {
                              key: 1,
                              src: _imports_4,
                              alt: "Cancelamento",
                              class: "trash-icon",
                              style: { "width": "30px", "height": "30px", "cursor": "pointer" },
                              title: "Cancelamento"
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
                          class: { disabled: !item.btn_receber },
                          title: item.btn_receber ? "Receber" : "Bloqueado",
                          onClick: ($event) => item.btn_receber ? redirectToRecebimento(item.numero, item) : null
                        }, [
                          createVNode("img", {
                            style: {
                              cursor: item.btn_receber ? "pointer" : "default",
                              width: "30px",
                              height: "30px"
                            },
                            src: _imports_2,
                            alt: "Receber"
                          }, null, 4)
                        ], 10, ["title", "onClick"]),
                        createVNode("div", {
                          class: { disabled: !item.btn_editar },
                          onClick: ($event) => item.btn_editar ? redirectToUpdate(item.id) : null,
                          title: item.btn_editar ? "Editar" : "Bloqueado"
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
                          onClick: ($event) => item.btn_cancelar ? redirectToCancelamento(item.numero, item.token) : null,
                          title: "Cancelamento"
                        }, [
                          item.excluido ? (openBlock(), createBlock("img", {
                            key: 0,
                            style: { "width": "30px", "height": "30px" },
                            src: _imports_3,
                            alt: "Visualizar",
                            title: "Bloqueado"
                          })) : (openBlock(), createBlock("img", {
                            key: 1,
                            src: _imports_4,
                            alt: "Cancelamento",
                            class: "trash-icon",
                            style: { "width": "30px", "height": "30px", "cursor": "pointer" },
                            title: "Cancelamento"
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
              ordem: unref(selectedOrder),
              onClose: ($event) => isModalRecebimentoOpen.value = false
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_CancelamentoOrdem, {
              show: unref(isModalCancelamentoOpen),
              numero_os: unref(numero_os),
              ordemserv_token: unref(ordemserv_token),
              onClose: ($event) => isModalCancelamentoOpen.value = false
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
                          src: _imports_1$1,
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
                        class: { disabled: !item.btn_receber },
                        title: item.btn_receber ? "Receber" : "Bloqueado",
                        onClick: ($event) => item.btn_receber ? redirectToRecebimento(item.numero, item) : null
                      }, [
                        createVNode("img", {
                          style: {
                            cursor: item.btn_receber ? "pointer" : "default",
                            width: "30px",
                            height: "30px"
                          },
                          src: _imports_2,
                          alt: "Receber"
                        }, null, 4)
                      ], 10, ["title", "onClick"]),
                      createVNode("div", {
                        class: { disabled: !item.btn_editar },
                        onClick: ($event) => item.btn_editar ? redirectToUpdate(item.id) : null,
                        title: item.btn_editar ? "Editar" : "Bloqueado"
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
                        onClick: ($event) => item.btn_cancelar ? redirectToCancelamento(item.numero, item.token) : null,
                        title: "Cancelamento"
                      }, [
                        item.excluido ? (openBlock(), createBlock("img", {
                          key: 0,
                          style: { "width": "30px", "height": "30px" },
                          src: _imports_3,
                          alt: "Visualizar",
                          title: "Bloqueado"
                        })) : (openBlock(), createBlock("img", {
                          key: 1,
                          src: _imports_4,
                          alt: "Cancelamento",
                          class: "trash-icon",
                          style: { "width": "30px", "height": "30px", "cursor": "pointer" },
                          title: "Cancelamento"
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
                ordem: unref(selectedOrder),
                onClose: ($event) => isModalRecebimentoOpen.value = false
              }, null, 8, ["show", "numero_os", "ordem", "onClose"]),
              createVNode(_component_CancelamentoOrdem, {
                show: unref(isModalCancelamentoOpen),
                numero_os: unref(numero_os),
                ordemserv_token: unref(ordemserv_token),
                onClose: ($event) => isModalCancelamentoOpen.value = false
              }, null, 8, ["show", "numero_os", "ordemserv_token", "onClose"])
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
//# sourceMappingURL=index-DhzaNzym.mjs.map
