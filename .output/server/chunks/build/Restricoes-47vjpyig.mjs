import { a as buildAssetsURL } from '../routes/renderer.mjs';
import { _ as __nuxt_component_0$1 } from './nuxt-link-DyZc7qn_.mjs';
import { q as propsFactory, F as makeRoundedProps, B as makeElevationProps, m as makeComponentProps, l as genericComponent, R as Ripple, $ as useRtl, P as useElevation, a8 as useTextColor, o as useRender, aA as convertToUnit, aZ as VScaleTransition, U as useRounded, aF as useBackgroundColor, a$ as makeFocusProps, aM as makeVInputProps, a6 as useProxiedModel, aP as useFocus, aR as VInput, b0 as VLabel, f as useNuxtApp, c as useRoute$1, d as useCookie, V as VTextField, aI as VDataTable, e as VBtn, aL as VSpacer, _ as _export_sfc, aX as getDecimals, aY as createRange, b as useRuntimeConfig, aW as clamp, a_ as keyValues, b1 as VSelect } from './server.mjs';
import { inject, computed, createVNode, withDirectives, resolveDirective, vShow, ref, mergeProps, Fragment, reactive, withAsyncContext, unref, withCtx, openBlock, createBlock, createTextVNode, isRef, useSSRContext, toRef, shallowRef, provide, renderList, createCommentVNode } from 'vue';
import { b as useLazyAsyncData, u as useFetch } from './fetch-bT3G74K0.mjs';
import { _ as __unimport_formatDate } from './formatDate-BppdwRXZ.mjs';
import { ssrRenderComponent, ssrRenderStyle, ssrRenderAttr, ssrGetDirectiveProps, ssrRenderAttrs, ssrRenderList } from 'vue/server-renderer';
import { _ as _imports_0$3, a as _imports_3 } from './mudarStatus-Cy2HtZEH.mjs';
import { _ as _imports_1, a as _imports_2 } from './excluido-BjtyjLDf.mjs';
import { useVuelidate } from '@vuelidate/core';
import { helpers, required } from '@vuelidate/validators';
import { V as VContainer } from './VContainer-BgUKde2W.mjs';
import { V as VRow } from './VRow-TyzvXDuI.mjs';
import { V as VCol } from './VCol-pkLQlHzw.mjs';
import { V as VAutocomplete } from './VAutocomplete-B1xN05m5.mjs';
import { V as VDialog } from './VDialog-BwIFCBiT.mjs';
import { V as VCard, c as VCardTitle, b as VCardText, a as VCardActions } from './VCard-DyET5wem.mjs';

const VSliderSymbol = Symbol.for("vuetify:v-slider");
function getOffset(e, el, direction) {
  const vertical = direction === "vertical";
  const rect = el.getBoundingClientRect();
  const touch = "touches" in e ? e.touches[0] : e;
  return vertical ? touch.clientY - (rect.top + rect.height / 2) : touch.clientX - (rect.left + rect.width / 2);
}
function getPosition(e, position) {
  if ("touches" in e && e.touches.length)
    return e.touches[0][position];
  else if ("changedTouches" in e && e.changedTouches.length)
    return e.changedTouches[0][position];
  else
    return e[position];
}
const makeSliderProps = propsFactory({
  disabled: {
    type: Boolean,
    default: null
  },
  error: Boolean,
  readonly: {
    type: Boolean,
    default: null
  },
  max: {
    type: [Number, String],
    default: 100
  },
  min: {
    type: [Number, String],
    default: 0
  },
  step: {
    type: [Number, String],
    default: 0
  },
  thumbColor: String,
  thumbLabel: {
    type: [Boolean, String],
    default: void 0,
    validator: (v) => typeof v === "boolean" || v === "always"
  },
  thumbSize: {
    type: [Number, String],
    default: 20
  },
  showTicks: {
    type: [Boolean, String],
    default: false,
    validator: (v) => typeof v === "boolean" || v === "always"
  },
  ticks: {
    type: [Array, Object]
  },
  tickSize: {
    type: [Number, String],
    default: 2
  },
  color: String,
  trackColor: String,
  trackFillColor: String,
  trackSize: {
    type: [Number, String],
    default: 4
  },
  direction: {
    type: String,
    default: "horizontal",
    validator: (v) => ["vertical", "horizontal"].includes(v)
  },
  reverse: Boolean,
  ...makeRoundedProps(),
  ...makeElevationProps({
    elevation: 2
  }),
  ripple: {
    type: Boolean,
    default: true
  }
}, "Slider");
const useSteps = (props) => {
  const min = computed(() => parseFloat(props.min));
  const max = computed(() => parseFloat(props.max));
  const step = computed(() => +props.step > 0 ? parseFloat(props.step) : 0);
  const decimals = computed(() => Math.max(getDecimals(step.value), getDecimals(min.value)));
  function roundValue(value) {
    value = parseFloat(value);
    if (step.value <= 0)
      return value;
    const clamped = clamp(value, min.value, max.value);
    const offset = min.value % step.value;
    const newValue = Math.round((clamped - offset) / step.value) * step.value + offset;
    return parseFloat(Math.min(newValue, max.value).toFixed(decimals.value));
  }
  return {
    min,
    max,
    step,
    decimals,
    roundValue
  };
};
const useSlider = (_ref) => {
  let {
    props,
    steps,
    onSliderStart,
    onSliderMove,
    onSliderEnd,
    getActiveThumb
  } = _ref;
  const {
    isRtl
  } = useRtl();
  const isReversed = toRef(props, "reverse");
  const vertical = computed(() => props.direction === "vertical");
  const indexFromEnd = computed(() => vertical.value !== isReversed.value);
  const {
    min,
    max,
    step,
    decimals,
    roundValue
  } = steps;
  const thumbSize = computed(() => parseInt(props.thumbSize, 10));
  const tickSize = computed(() => parseInt(props.tickSize, 10));
  const trackSize = computed(() => parseInt(props.trackSize, 10));
  const numTicks = computed(() => (max.value - min.value) / step.value);
  const disabled = toRef(props, "disabled");
  const thumbColor = computed(() => {
    var _a;
    return props.error || props.disabled ? void 0 : (_a = props.thumbColor) != null ? _a : props.color;
  });
  const trackColor = computed(() => {
    var _a;
    return props.error || props.disabled ? void 0 : (_a = props.trackColor) != null ? _a : props.color;
  });
  const trackFillColor = computed(() => {
    var _a;
    return props.error || props.disabled ? void 0 : (_a = props.trackFillColor) != null ? _a : props.color;
  });
  const mousePressed = shallowRef(false);
  const startOffset = shallowRef(0);
  const trackContainerRef = ref();
  const activeThumbRef = ref();
  function parseMouseMove(e) {
    var _a;
    const vertical2 = props.direction === "vertical";
    const start = vertical2 ? "top" : "left";
    const length = vertical2 ? "height" : "width";
    const position2 = vertical2 ? "clientY" : "clientX";
    const {
      [start]: trackStart,
      [length]: trackLength
    } = (_a = trackContainerRef.value) == null ? void 0 : _a.$el.getBoundingClientRect();
    const clickOffset = getPosition(e, position2);
    let clickPos = Math.min(Math.max((clickOffset - trackStart - startOffset.value) / trackLength, 0), 1) || 0;
    if (vertical2 ? indexFromEnd.value : indexFromEnd.value !== isRtl.value)
      clickPos = 1 - clickPos;
    return roundValue(min.value + clickPos * (max.value - min.value));
  }
  const handleStop = (e) => {
    onSliderEnd({
      value: parseMouseMove(e)
    });
    mousePressed.value = false;
    startOffset.value = 0;
  };
  const handleStart = (e) => {
    activeThumbRef.value = getActiveThumb(e);
    if (!activeThumbRef.value)
      return;
    activeThumbRef.value.focus();
    mousePressed.value = true;
    if (activeThumbRef.value.contains(e.target)) {
      startOffset.value = getOffset(e, activeThumbRef.value, props.direction);
    } else {
      startOffset.value = 0;
      onSliderMove({
        value: parseMouseMove(e)
      });
    }
    onSliderStart({
      value: parseMouseMove(e)
    });
  };
  const moveListenerOptions = {
    passive: true,
    capture: true
  };
  function onMouseMove(e) {
    onSliderMove({
      value: parseMouseMove(e)
    });
  }
  function onSliderMouseUp(e) {
    e.stopPropagation();
    e.preventDefault();
    handleStop(e);
    (void 0).removeEventListener("mousemove", onMouseMove, moveListenerOptions);
    (void 0).removeEventListener("mouseup", onSliderMouseUp);
  }
  function onSliderTouchend(e) {
    var _a;
    handleStop(e);
    (void 0).removeEventListener("touchmove", onMouseMove, moveListenerOptions);
    (_a = e.target) == null ? void 0 : _a.removeEventListener("touchend", onSliderTouchend);
  }
  function onSliderTouchstart(e) {
    var _a;
    handleStart(e);
    (void 0).addEventListener("touchmove", onMouseMove, moveListenerOptions);
    (_a = e.target) == null ? void 0 : _a.addEventListener("touchend", onSliderTouchend, {
      passive: false
    });
  }
  function onSliderMousedown(e) {
    e.preventDefault();
    handleStart(e);
    (void 0).addEventListener("mousemove", onMouseMove, moveListenerOptions);
    (void 0).addEventListener("mouseup", onSliderMouseUp, {
      passive: false
    });
  }
  const position = (val) => {
    const percentage = (val - min.value) / (max.value - min.value) * 100;
    return clamp(isNaN(percentage) ? 0 : percentage, 0, 100);
  };
  const showTicks = toRef(props, "showTicks");
  const parsedTicks = computed(() => {
    if (!showTicks.value)
      return [];
    if (!props.ticks) {
      return numTicks.value !== Infinity ? createRange(numTicks.value + 1).map((t) => {
        const value = min.value + t * step.value;
        return {
          value,
          position: position(value)
        };
      }) : [];
    }
    if (Array.isArray(props.ticks))
      return props.ticks.map((t) => ({
        value: t,
        position: position(t),
        label: t.toString()
      }));
    return Object.keys(props.ticks).map((key) => ({
      value: parseFloat(key),
      position: position(parseFloat(key)),
      label: props.ticks[key]
    }));
  });
  const hasLabels = computed(() => parsedTicks.value.some((_ref2) => {
    let {
      label
    } = _ref2;
    return !!label;
  }));
  const data = {
    activeThumbRef,
    color: toRef(props, "color"),
    decimals,
    disabled,
    direction: toRef(props, "direction"),
    elevation: toRef(props, "elevation"),
    hasLabels,
    isReversed,
    indexFromEnd,
    min,
    max,
    mousePressed,
    numTicks,
    onSliderMousedown,
    onSliderTouchstart,
    parsedTicks,
    parseMouseMove,
    position,
    readonly: toRef(props, "readonly"),
    rounded: toRef(props, "rounded"),
    roundValue,
    showTicks,
    startOffset,
    step,
    thumbSize,
    thumbColor,
    thumbLabel: toRef(props, "thumbLabel"),
    ticks: toRef(props, "ticks"),
    tickSize,
    trackColor,
    trackContainerRef,
    trackFillColor,
    trackSize,
    vertical
  };
  provide(VSliderSymbol, data);
  return data;
};
const makeVSliderThumbProps = propsFactory({
  focused: Boolean,
  max: {
    type: Number,
    required: true
  },
  min: {
    type: Number,
    required: true
  },
  modelValue: {
    type: Number,
    required: true
  },
  position: {
    type: Number,
    required: true
  },
  ripple: {
    type: [Boolean, Object],
    default: true
  },
  name: String,
  ...makeComponentProps()
}, "VSliderThumb");
const VSliderThumb = genericComponent()({
  name: "VSliderThumb",
  directives: {
    Ripple
  },
  props: makeVSliderThumbProps(),
  emits: {
    "update:modelValue": (v) => true
  },
  setup(props, _ref) {
    let {
      slots,
      emit
    } = _ref;
    const slider = inject(VSliderSymbol);
    const {
      isRtl,
      rtlClasses
    } = useRtl();
    if (!slider)
      throw new Error("[Vuetify] v-slider-thumb must be used inside v-slider or v-range-slider");
    const {
      thumbColor,
      step,
      disabled,
      thumbSize,
      thumbLabel,
      direction,
      isReversed,
      vertical,
      readonly,
      elevation,
      mousePressed,
      decimals,
      indexFromEnd
    } = slider;
    const elevationProps = computed(() => !disabled.value ? elevation.value : void 0);
    const {
      elevationClasses
    } = useElevation(elevationProps);
    const {
      textColorClasses,
      textColorStyles
    } = useTextColor(thumbColor);
    const {
      pageup,
      pagedown,
      end,
      home,
      left,
      right,
      down,
      up
    } = keyValues;
    const relevantKeys = [pageup, pagedown, end, home, left, right, down, up];
    const multipliers = computed(() => {
      if (step.value)
        return [1, 2, 3];
      else
        return [1, 5, 10];
    });
    function parseKeydown(e, value) {
      if (!relevantKeys.includes(e.key))
        return;
      e.preventDefault();
      const _step = step.value || 0.1;
      const steps = (props.max - props.min) / _step;
      if ([left, right, down, up].includes(e.key)) {
        const increase = vertical.value ? [isRtl.value ? left : right, isReversed.value ? down : up] : indexFromEnd.value !== isRtl.value ? [left, up] : [right, up];
        const direction2 = increase.includes(e.key) ? 1 : -1;
        const multiplier = e.shiftKey ? 2 : e.ctrlKey ? 1 : 0;
        value = value + direction2 * _step * multipliers.value[multiplier];
      } else if (e.key === home) {
        value = props.min;
      } else if (e.key === end) {
        value = props.max;
      } else {
        const direction2 = e.key === pagedown ? 1 : -1;
        value = value - direction2 * _step * (steps > 100 ? steps / 10 : 10);
      }
      return Math.max(props.min, Math.min(props.max, value));
    }
    function onKeydown(e) {
      const newValue = parseKeydown(e, props.modelValue);
      newValue != null && emit("update:modelValue", newValue);
    }
    useRender(() => {
      const positionPercentage = convertToUnit(indexFromEnd.value ? 100 - props.position : props.position, "%");
      return createVNode("div", {
        "class": ["v-slider-thumb", {
          "v-slider-thumb--focused": props.focused,
          "v-slider-thumb--pressed": props.focused && mousePressed.value
        }, props.class, rtlClasses.value],
        "style": [{
          "--v-slider-thumb-position": positionPercentage,
          "--v-slider-thumb-size": convertToUnit(thumbSize.value)
        }, props.style],
        "role": "slider",
        "tabindex": disabled.value ? -1 : 0,
        "aria-label": props.name,
        "aria-valuemin": props.min,
        "aria-valuemax": props.max,
        "aria-valuenow": props.modelValue,
        "aria-readonly": !!readonly.value,
        "aria-orientation": direction.value,
        "onKeydown": !readonly.value ? onKeydown : void 0
      }, [createVNode("div", {
        "class": ["v-slider-thumb__surface", textColorClasses.value, elevationClasses.value],
        "style": {
          ...textColorStyles.value
        }
      }, null), withDirectives(createVNode("div", {
        "class": ["v-slider-thumb__ripple", textColorClasses.value],
        "style": textColorStyles.value
      }, null), [[resolveDirective("ripple"), props.ripple, null, {
        circle: true,
        center: true
      }]]), createVNode(VScaleTransition, {
        "origin": "bottom center"
      }, {
        default: () => {
          var _a2;
          var _a;
          return [withDirectives(createVNode("div", {
            "class": "v-slider-thumb__label-container"
          }, [createVNode("div", {
            "class": ["v-slider-thumb__label"]
          }, [createVNode("div", null, [(_a2 = (_a = slots["thumb-label"]) == null ? void 0 : _a.call(slots, {
            modelValue: props.modelValue
          })) != null ? _a2 : props.modelValue.toFixed(step.value ? decimals.value : 1)])])]), [[vShow, thumbLabel.value && props.focused || thumbLabel.value === "always"]])];
        }
      })]);
    });
    return {};
  }
});
const makeVSliderTrackProps = propsFactory({
  start: {
    type: Number,
    required: true
  },
  stop: {
    type: Number,
    required: true
  },
  ...makeComponentProps()
}, "VSliderTrack");
const VSliderTrack = genericComponent()({
  name: "VSliderTrack",
  props: makeVSliderTrackProps(),
  emits: {},
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const slider = inject(VSliderSymbol);
    if (!slider)
      throw new Error("[Vuetify] v-slider-track must be inside v-slider or v-range-slider");
    const {
      color,
      parsedTicks,
      rounded,
      showTicks,
      tickSize,
      trackColor,
      trackFillColor,
      trackSize,
      vertical,
      min,
      max,
      indexFromEnd
    } = slider;
    const {
      roundedClasses
    } = useRounded(rounded);
    const {
      backgroundColorClasses: trackFillColorClasses,
      backgroundColorStyles: trackFillColorStyles
    } = useBackgroundColor(trackFillColor);
    const {
      backgroundColorClasses: trackColorClasses,
      backgroundColorStyles: trackColorStyles
    } = useBackgroundColor(trackColor);
    const startDir = computed(() => `inset-${vertical.value ? "block" : "inline"}-${indexFromEnd.value ? "end" : "start"}`);
    const endDir = computed(() => vertical.value ? "height" : "width");
    const backgroundStyles = computed(() => {
      return {
        [startDir.value]: "0%",
        [endDir.value]: "100%"
      };
    });
    const trackFillWidth = computed(() => props.stop - props.start);
    const trackFillStyles = computed(() => {
      return {
        [startDir.value]: convertToUnit(props.start, "%"),
        [endDir.value]: convertToUnit(trackFillWidth.value, "%")
      };
    });
    const computedTicks = computed(() => {
      if (!showTicks.value)
        return [];
      const ticks = vertical.value ? parsedTicks.value.slice().reverse() : parsedTicks.value;
      return ticks.map((tick, index) => {
        var _a2;
        var _a;
        const directionValue = tick.value !== min.value && tick.value !== max.value ? convertToUnit(tick.position, "%") : void 0;
        return createVNode("div", {
          "key": tick.value,
          "class": ["v-slider-track__tick", {
            "v-slider-track__tick--filled": tick.position >= props.start && tick.position <= props.stop,
            "v-slider-track__tick--first": tick.value === min.value,
            "v-slider-track__tick--last": tick.value === max.value
          }],
          "style": {
            [startDir.value]: directionValue
          }
        }, [(tick.label || slots["tick-label"]) && createVNode("div", {
          "class": "v-slider-track__tick-label"
        }, [(_a2 = (_a = slots["tick-label"]) == null ? void 0 : _a.call(slots, {
          tick,
          index
        })) != null ? _a2 : tick.label])]);
      });
    });
    useRender(() => {
      return createVNode("div", {
        "class": ["v-slider-track", roundedClasses.value, props.class],
        "style": [{
          "--v-slider-track-size": convertToUnit(trackSize.value),
          "--v-slider-tick-size": convertToUnit(tickSize.value)
        }, props.style]
      }, [createVNode("div", {
        "class": ["v-slider-track__background", trackColorClasses.value, {
          "v-slider-track__background--opacity": !!color.value || !trackFillColor.value
        }],
        "style": {
          ...backgroundStyles.value,
          ...trackColorStyles.value
        }
      }, null), createVNode("div", {
        "class": ["v-slider-track__fill", trackFillColorClasses.value],
        "style": {
          ...trackFillStyles.value,
          ...trackFillColorStyles.value
        }
      }, null), showTicks.value && createVNode("div", {
        "class": ["v-slider-track__ticks", {
          "v-slider-track__ticks--always-show": showTicks.value === "always"
        }]
      }, [computedTicks.value])]);
    });
    return {};
  }
});
const makeVSliderProps = propsFactory({
  ...makeFocusProps(),
  ...makeSliderProps(),
  ...makeVInputProps(),
  modelValue: {
    type: [Number, String],
    default: 0
  }
}, "VSlider");
const VSlider = genericComponent()({
  name: "VSlider",
  props: makeVSliderProps(),
  emits: {
    "update:focused": (value) => true,
    "update:modelValue": (v) => true,
    start: (value) => true,
    end: (value) => true
  },
  setup(props, _ref) {
    let {
      slots,
      emit
    } = _ref;
    const thumbContainerRef = ref();
    const {
      rtlClasses
    } = useRtl();
    const steps = useSteps(props);
    const model = useProxiedModel(props, "modelValue", void 0, (value) => {
      return steps.roundValue(value == null ? steps.min.value : value);
    });
    const {
      min,
      max,
      mousePressed,
      roundValue,
      onSliderMousedown,
      onSliderTouchstart,
      trackContainerRef,
      position,
      hasLabels,
      readonly
    } = useSlider({
      props,
      steps,
      onSliderStart: () => {
        emit("start", model.value);
      },
      onSliderEnd: (_ref2) => {
        let {
          value
        } = _ref2;
        const roundedValue = roundValue(value);
        model.value = roundedValue;
        emit("end", roundedValue);
      },
      onSliderMove: (_ref3) => {
        let {
          value
        } = _ref3;
        return model.value = roundValue(value);
      },
      getActiveThumb: () => {
        var _a;
        return (_a = thumbContainerRef.value) == null ? void 0 : _a.$el;
      }
    });
    const {
      isFocused,
      focus,
      blur
    } = useFocus(props);
    const trackStop = computed(() => position(model.value));
    useRender(() => {
      const inputProps = VInput.filterProps(props);
      const hasPrepend = !!(props.label || slots.label || slots.prepend);
      return createVNode(VInput, mergeProps({
        "class": ["v-slider", {
          "v-slider--has-labels": !!slots["tick-label"] || hasLabels.value,
          "v-slider--focused": isFocused.value,
          "v-slider--pressed": mousePressed.value,
          "v-slider--disabled": props.disabled
        }, rtlClasses.value, props.class],
        "style": props.style
      }, inputProps, {
        "focused": isFocused.value
      }), {
        ...slots,
        prepend: hasPrepend ? (slotProps) => {
          var _a2;
          var _a, _b;
          return createVNode(Fragment, null, [(_a2 = (_a = slots.label) == null ? void 0 : _a.call(slots, slotProps)) != null ? _a2 : props.label ? createVNode(VLabel, {
            "id": slotProps.id.value,
            "class": "v-slider__label",
            "text": props.label
          }, null) : void 0, (_b = slots.prepend) == null ? void 0 : _b.call(slots, slotProps)]);
        } : void 0,
        default: (_ref4) => {
          let {
            id,
            messagesId
          } = _ref4;
          return createVNode("div", {
            "class": "v-slider__container",
            "onMousedown": !readonly.value ? onSliderMousedown : void 0,
            "onTouchstartPassive": !readonly.value ? onSliderTouchstart : void 0
          }, [createVNode("input", {
            "id": id.value,
            "name": props.name || id.value,
            "disabled": !!props.disabled,
            "readonly": !!props.readonly,
            "tabindex": "-1",
            "value": model.value
          }, null), createVNode(VSliderTrack, {
            "ref": trackContainerRef,
            "start": 0,
            "stop": trackStop.value
          }, {
            "tick-label": slots["tick-label"]
          }), createVNode(VSliderThumb, {
            "ref": thumbContainerRef,
            "aria-describedby": messagesId.value,
            "focused": isFocused.value,
            "min": min.value,
            "max": max.value,
            "modelValue": model.value,
            "onUpdate:modelValue": (v) => model.value = v,
            "position": trackStop.value,
            "elevation": props.elevation,
            "onFocus": focus,
            "onBlur": blur,
            "ripple": props.ripple,
            "name": props.name
          }, {
            "thumb-label": slots["thumb-label"]
          })]);
        }
      });
    });
    return {};
  }
});
const _sfc_main$7 = {
  __name: "Documentos",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const { $toast } = useNuxtApp();
    const route = useRoute$1();
    const { id } = route.params;
    const config = useRuntimeConfig();
    const allTipos = `${config.public.managemant}/listarTipoDocumento`;
    const allUf = `${config.public.managemant}/listarUF`;
    const allDoc = `${config.public.managemant}/getPessoaDocById`;
    const createDoc = `${config.public.managemant}/createPessoaDoc`;
    const updateDoc = `${config.public.managemant}/updatePessoaDoc`;
    const isModalOpen = ref(false);
    const selectedDoc = ref(null);
    const user_id = ref(useCookie("user-data").value.usuario_id).value;
    const pessoa_id = Number(useCookie("pessoa-id").value || id);
    const state = reactive({
      tabvalores_tipodoc_id: "",
      emissor: "",
      validade: "",
      numero: "",
      data_emissao: "",
      data_vencimento: "",
      tabvalores_ufemissor_id: ""
    });
    const headers = [
      { title: "Tipo", value: "tipoDocumento.descricao" },
      { title: "N\xFAmero", value: "numero" },
      { title: "Emissor", value: "emissor" },
      {
        title: "UF",
        value: "ufEmissor.descricao"
      },
      {
        title: "Emiss\xE3o",
        value: "data_emissao"
      },
      {
        title: "Validade",
        value: "data_vencimento"
      },
      {
        value: "actions"
      }
    ];
    const rules = {
      numero: {
        required: helpers.withMessage("O campo \xE9 obrigatorio", required)
      },
      emissor: {
        required: helpers.withMessage("O campo \xE9 obrigatorio", required)
      }
    };
    const v$ = useVuelidate(rules, state);
    const {
      data: documentos,
      pending,
      refresh
    } = ([__temp, __restore] = withAsyncContext(async () => useLazyAsyncData("cliente-documentos", async () => {
      const [tipoDocumentoItems, ufItems, pessoasDocsItems] = await Promise.all([
        $fetch(allTipos),
        $fetch(allUf),
        $fetch(`${allDoc}/${pessoa_id}`)
      ]);
      const formattedPessoasDocsItems = pessoasDocsItems.map((doc) => {
        return {
          ...doc,
          data_emissao: __unimport_formatDate(doc.data_emissao),
          data_vencimento: __unimport_formatDate(doc.data_vencimento)
        };
      });
      return { tipoDocumentoItems, ufItems, pessoasDocsItems: formattedPessoasDocsItems };
    })), __temp = await __temp, __restore(), __temp);
    async function onSubmit() {
      if (await v$.value.$validate()) {
        const payload = { ...state };
        for (const key in payload) {
          if (payload[key] === "") {
            payload[key] = null;
          }
        }
        const payloadFormated = {
          ...payload,
          user_id,
          pessoa_id
        };
        const { data, error, status } = await useFetch(
          createDoc,
          {
            method: "POST",
            body: payloadFormated
          },
          "$cLGZtMLuJD"
        );
        if (status.value === "error" && error.value.statusCode === 500) {
          $toast.error("Erro ao cadastrar documento,erro no sistema.");
        } else {
          $toast.success("Documento cadastrado com sucesso!");
          refresh();
          for (const key in state) {
            state[key] = "";
          }
          v$.value.$reset();
        }
      } else {
        $toast.error("Erro ao cadastrar documento, preencha os campos obrigatorios.");
      }
    }
    function redirectToUpdate(id2) {
      const documento = documentos.value.pessoasDocsItems.find(
        (item) => item.id === id2
      );
      if (documento) {
        selectedDoc.value = documento;
        isModalOpen.value = true;
      }
    }
    async function onUpdate(id2) {
      const payloadFormated = {
        tabvalores_tipodoc_id: selectedDoc.value.tabvalores_tipodoc_id,
        numero: selectedDoc.value.numero,
        emissor: selectedDoc.value.emissor,
        tabvalores_ufemissor_id: selectedDoc.value.tabvalores_ufemissor_id,
        data_vencimento: selectedDoc.value.data_vencimento,
        data_emissao: selectedDoc.value.data_emissao
      };
      const { status } = await useFetch(`${updateDoc}/${id2}`, {
        method: "PUT",
        body: payloadFormated
      }, "$2fkU5kgcxs");
      if (status.value === "success") {
        isModalOpen.value = false;
        $toast.success("Pessoa atualizada com sucesso!");
        refresh();
      }
    }
    async function deleteDocumento(item) {
      item.excluido = !item.excluido;
      try {
        await useFetch(`${updateDoc}/${item.id}`, {
          method: "PUT",
          body: JSON.stringify({ excluido: item.excluido })
        }, "$lMq37v4cfh");
      } catch (error) {
        console.error("Erro ao excluir pessoa:", error);
      }
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      if (!unref(pending)) {
        _push(ssrRenderComponent(VContainer, mergeProps({ class: "mt-5" }, _attrs), {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(VRow, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(VCol, { md: "2" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(VAutocomplete, {
                            modelValue: unref(state).tabvalores_tipodoc_id,
                            "onUpdate:modelValue": ($event) => unref(state).tabvalores_tipodoc_id = $event,
                            items: unref(documentos).tipoDocumentoItems,
                            label: "Tipo",
                            "item-title": "descricao",
                            "item-value": "id"
                          }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(VAutocomplete, {
                              modelValue: unref(state).tabvalores_tipodoc_id,
                              "onUpdate:modelValue": ($event) => unref(state).tabvalores_tipodoc_id = $event,
                              items: unref(documentos).tipoDocumentoItems,
                              label: "Tipo",
                              "item-title": "descricao",
                              "item-value": "id"
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(VCol, null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(VTextField, {
                            modelValue: unref(state).numero,
                            "onUpdate:modelValue": ($event) => unref(state).numero = $event,
                            "error-messages": unref(v$).numero.$errors.map((e) => e.$message),
                            label: "Numero",
                            required: "",
                            onBlur: unref(v$).numero.$touch,
                            onInput: unref(v$).numero.$touch
                          }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(VTextField, {
                              modelValue: unref(state).numero,
                              "onUpdate:modelValue": ($event) => unref(state).numero = $event,
                              "error-messages": unref(v$).numero.$errors.map((e) => e.$message),
                              label: "Numero",
                              required: "",
                              onBlur: unref(v$).numero.$touch,
                              onInput: unref(v$).numero.$touch
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages", "onBlur", "onInput"])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(VCol, { md: "2" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(VTextField, {
                            modelValue: unref(state).emissor,
                            "onUpdate:modelValue": ($event) => unref(state).emissor = $event,
                            "error-messages": unref(v$).emissor.$errors.map((e) => e.$message),
                            required: "",
                            onBlur: unref(v$).emissor.$touch,
                            onInput: unref(v$).emissor.$touch,
                            label: "Emissor"
                          }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(VTextField, {
                              modelValue: unref(state).emissor,
                              "onUpdate:modelValue": ($event) => unref(state).emissor = $event,
                              "error-messages": unref(v$).emissor.$errors.map((e) => e.$message),
                              required: "",
                              onBlur: unref(v$).emissor.$touch,
                              onInput: unref(v$).emissor.$touch,
                              label: "Emissor"
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages", "onBlur", "onInput"])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(VCol, null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(VAutocomplete, {
                            modelValue: unref(state).tabvalores_ufemissor_id,
                            "onUpdate:modelValue": ($event) => unref(state).tabvalores_ufemissor_id = $event,
                            items: unref(documentos).ufItems,
                            label: "UF",
                            "item-title": "descricao",
                            "item-value": "id"
                          }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(VAutocomplete, {
                              modelValue: unref(state).tabvalores_ufemissor_id,
                              "onUpdate:modelValue": ($event) => unref(state).tabvalores_ufemissor_id = $event,
                              items: unref(documentos).ufItems,
                              label: "UF",
                              "item-title": "descricao",
                              "item-value": "id"
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
                            modelValue: unref(state).data_emissao,
                            "onUpdate:modelValue": ($event) => unref(state).data_emissao = $event,
                            type: "date",
                            label: "Emiss\xE3o"
                          }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(VTextField, {
                              modelValue: unref(state).data_emissao,
                              "onUpdate:modelValue": ($event) => unref(state).data_emissao = $event,
                              type: "date",
                              label: "Emiss\xE3o"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(VCol, { md: "2" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(VTextField, {
                            modelValue: unref(state).data_vencimento,
                            "onUpdate:modelValue": ($event) => unref(state).data_vencimento = $event,
                            type: "date",
                            label: "Validade"
                          }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(VTextField, {
                              modelValue: unref(state).data_vencimento,
                              "onUpdate:modelValue": ($event) => unref(state).data_vencimento = $event,
                              type: "date",
                              label: "Validade"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(`<div class="mt-3"${_scopeId2}><img style="${ssrRenderStyle({ "width": "40px", "height": "40px", "cursor": "pointer" })}"${ssrRenderAttr("src", _imports_0$3)} alt="novo"${_scopeId2}></div>`);
                  } else {
                    return [
                      createVNode(VCol, { md: "2" }, {
                        default: withCtx(() => [
                          createVNode(VAutocomplete, {
                            modelValue: unref(state).tabvalores_tipodoc_id,
                            "onUpdate:modelValue": ($event) => unref(state).tabvalores_tipodoc_id = $event,
                            items: unref(documentos).tipoDocumentoItems,
                            label: "Tipo",
                            "item-title": "descricao",
                            "item-value": "id"
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                        ]),
                        _: 1
                      }),
                      createVNode(VCol, null, {
                        default: withCtx(() => [
                          createVNode(VTextField, {
                            modelValue: unref(state).numero,
                            "onUpdate:modelValue": ($event) => unref(state).numero = $event,
                            "error-messages": unref(v$).numero.$errors.map((e) => e.$message),
                            label: "Numero",
                            required: "",
                            onBlur: unref(v$).numero.$touch,
                            onInput: unref(v$).numero.$touch
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages", "onBlur", "onInput"])
                        ]),
                        _: 1
                      }),
                      createVNode(VCol, { md: "2" }, {
                        default: withCtx(() => [
                          createVNode(VTextField, {
                            modelValue: unref(state).emissor,
                            "onUpdate:modelValue": ($event) => unref(state).emissor = $event,
                            "error-messages": unref(v$).emissor.$errors.map((e) => e.$message),
                            required: "",
                            onBlur: unref(v$).emissor.$touch,
                            onInput: unref(v$).emissor.$touch,
                            label: "Emissor"
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages", "onBlur", "onInput"])
                        ]),
                        _: 1
                      }),
                      createVNode(VCol, null, {
                        default: withCtx(() => [
                          createVNode(VAutocomplete, {
                            modelValue: unref(state).tabvalores_ufemissor_id,
                            "onUpdate:modelValue": ($event) => unref(state).tabvalores_ufemissor_id = $event,
                            items: unref(documentos).ufItems,
                            label: "UF",
                            "item-title": "descricao",
                            "item-value": "id"
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                        ]),
                        _: 1
                      }),
                      createVNode(VCol, { md: "2" }, {
                        default: withCtx(() => [
                          createVNode(VTextField, {
                            modelValue: unref(state).data_emissao,
                            "onUpdate:modelValue": ($event) => unref(state).data_emissao = $event,
                            type: "date",
                            label: "Emiss\xE3o"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        _: 1
                      }),
                      createVNode(VCol, { md: "2" }, {
                        default: withCtx(() => [
                          createVNode(VTextField, {
                            modelValue: unref(state).data_vencimento,
                            "onUpdate:modelValue": ($event) => unref(state).data_vencimento = $event,
                            type: "date",
                            label: "Validade"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        _: 1
                      }),
                      createVNode("div", { class: "mt-3" }, [
                        createVNode("img", {
                          style: { "width": "40px", "height": "40px", "cursor": "pointer" },
                          src: _imports_0$3,
                          alt: "novo",
                          onClick: onSubmit
                        })
                      ])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(VDataTable, {
                headers,
                items: unref(documentos).pessoasDocsItems,
                "item-key": "id"
              }, {
                "item.actions": withCtx(({ item }, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(VRow, { style: { "display": "flex", "margin-top": "-8px", "gap": "10px" } }, {
                      default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<div title="editar"${_scopeId3}><img style="${ssrRenderStyle({ "width": "30px", "height": "30px", "cursor": "pointer" })}"${ssrRenderAttr("src", _imports_1)} alt="editar"${_scopeId3}></div><div title="deletar"${_scopeId3}>`);
                          if (item.excluido) {
                            _push4(`<img style="${ssrRenderStyle({ "width": "30px", "height": "30px", "cursor": "pointer" })}"${ssrRenderAttr("src", _imports_2)} alt="deletar" title="Reativar"${_scopeId3}>`);
                          } else {
                            _push4(`<img${ssrRenderAttr("src", _imports_3)} alt="reativar" class="trash-icon" style="${ssrRenderStyle({ "width": "30px", "height": "30px", "cursor": "pointer" })}" title="reativar"${_scopeId3}>`);
                          }
                          _push4(`</div>`);
                        } else {
                          return [
                            createVNode("div", {
                              onClick: ($event) => redirectToUpdate(item.id),
                              title: "editar"
                            }, [
                              createVNode("img", {
                                style: { "width": "30px", "height": "30px", "cursor": "pointer" },
                                src: _imports_1,
                                alt: "editar"
                              })
                            ], 8, ["onClick"]),
                            createVNode("div", {
                              onClick: ($event) => deleteDocumento(item),
                              title: "deletar"
                            }, [
                              item.excluido ? (openBlock(), createBlock("img", {
                                key: 0,
                                style: { "width": "30px", "height": "30px", "cursor": "pointer" },
                                src: _imports_2,
                                alt: "deletar",
                                title: "Reativar"
                              })) : (openBlock(), createBlock("img", {
                                key: 1,
                                src: _imports_3,
                                alt: "reativar",
                                class: "trash-icon",
                                style: { "width": "30px", "height": "30px", "cursor": "pointer" },
                                title: "reativar"
                              }))
                            ], 8, ["onClick"])
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(VRow, { style: { "display": "flex", "margin-top": "-8px", "gap": "10px" } }, {
                        default: withCtx(() => [
                          createVNode("div", {
                            onClick: ($event) => redirectToUpdate(item.id),
                            title: "editar"
                          }, [
                            createVNode("img", {
                              style: { "width": "30px", "height": "30px", "cursor": "pointer" },
                              src: _imports_1,
                              alt: "editar"
                            })
                          ], 8, ["onClick"]),
                          createVNode("div", {
                            onClick: ($event) => deleteDocumento(item),
                            title: "deletar"
                          }, [
                            item.excluido ? (openBlock(), createBlock("img", {
                              key: 0,
                              style: { "width": "30px", "height": "30px", "cursor": "pointer" },
                              src: _imports_2,
                              alt: "deletar",
                              title: "Reativar"
                            })) : (openBlock(), createBlock("img", {
                              key: 1,
                              src: _imports_3,
                              alt: "reativar",
                              class: "trash-icon",
                              style: { "width": "30px", "height": "30px", "cursor": "pointer" },
                              title: "reativar"
                            }))
                          ], 8, ["onClick"])
                        ]),
                        _: 2
                      }, 1024)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_NuxtLink, { to: "/pessoas/lista" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(VBtn, {
                      size: "large",
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
              _push2(ssrRenderComponent(VDialog, {
                modelValue: unref(isModalOpen),
                "onUpdate:modelValue": ($event) => isRef(isModalOpen) ? isModalOpen.value = $event : null,
                "max-width": "600px"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(VCard, null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(VCardTitle, { style: { "color": "green" } }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`Atualizar Endere\xE7o`);
                              } else {
                                return [
                                  createTextVNode("Atualizar Endere\xE7o")
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                          _push4(ssrRenderComponent(VCardText, null, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(VRow, null, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(ssrRenderComponent(VCol, {
                                        cols: "12",
                                        md: "6"
                                      }, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(ssrRenderComponent(VAutocomplete, {
                                              modelValue: unref(selectedDoc).tabvalores_tipodoc_id,
                                              "onUpdate:modelValue": ($event) => unref(selectedDoc).tabvalores_tipodoc_id = $event,
                                              items: unref(documentos).tipoDocumentoItems,
                                              label: "Tipo",
                                              "item-title": "descricao",
                                              "item-value": "id"
                                            }, null, _parent7, _scopeId6));
                                          } else {
                                            return [
                                              createVNode(VAutocomplete, {
                                                modelValue: unref(selectedDoc).tabvalores_tipodoc_id,
                                                "onUpdate:modelValue": ($event) => unref(selectedDoc).tabvalores_tipodoc_id = $event,
                                                items: unref(documentos).tipoDocumentoItems,
                                                label: "Tipo",
                                                "item-title": "descricao",
                                                "item-value": "id"
                                              }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                                            ];
                                          }
                                        }),
                                        _: 1
                                      }, _parent6, _scopeId5));
                                      _push6(ssrRenderComponent(VCol, {
                                        cols: "12",
                                        md: "6"
                                      }, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(ssrRenderComponent(VTextField, {
                                              modelValue: unref(selectedDoc).numero,
                                              "onUpdate:modelValue": ($event) => unref(selectedDoc).numero = $event,
                                              label: "N\xFAmero"
                                            }, null, _parent7, _scopeId6));
                                          } else {
                                            return [
                                              createVNode(VTextField, {
                                                modelValue: unref(selectedDoc).numero,
                                                "onUpdate:modelValue": ($event) => unref(selectedDoc).numero = $event,
                                                label: "N\xFAmero"
                                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                            ];
                                          }
                                        }),
                                        _: 1
                                      }, _parent6, _scopeId5));
                                      _push6(ssrRenderComponent(VCol, {
                                        cols: "12",
                                        md: "6"
                                      }, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(ssrRenderComponent(VTextField, {
                                              modelValue: unref(selectedDoc).emissor,
                                              "onUpdate:modelValue": ($event) => unref(selectedDoc).emissor = $event,
                                              label: "N\xFAmero"
                                            }, null, _parent7, _scopeId6));
                                          } else {
                                            return [
                                              createVNode(VTextField, {
                                                modelValue: unref(selectedDoc).emissor,
                                                "onUpdate:modelValue": ($event) => unref(selectedDoc).emissor = $event,
                                                label: "N\xFAmero"
                                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                            ];
                                          }
                                        }),
                                        _: 1
                                      }, _parent6, _scopeId5));
                                      _push6(ssrRenderComponent(VCol, {
                                        cols: "12",
                                        md: "6"
                                      }, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(ssrRenderComponent(VAutocomplete, {
                                              modelValue: unref(selectedDoc).tabvalores_ufemissor_id,
                                              "onUpdate:modelValue": ($event) => unref(selectedDoc).tabvalores_ufemissor_id = $event,
                                              items: unref(documentos).ufItems,
                                              label: "UF",
                                              "item-title": "descricao",
                                              "item-value": "id"
                                            }, null, _parent7, _scopeId6));
                                          } else {
                                            return [
                                              createVNode(VAutocomplete, {
                                                modelValue: unref(selectedDoc).tabvalores_ufemissor_id,
                                                "onUpdate:modelValue": ($event) => unref(selectedDoc).tabvalores_ufemissor_id = $event,
                                                items: unref(documentos).ufItems,
                                                label: "UF",
                                                "item-title": "descricao",
                                                "item-value": "id"
                                              }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                                            ];
                                          }
                                        }),
                                        _: 1
                                      }, _parent6, _scopeId5));
                                      _push6(ssrRenderComponent(VCol, {
                                        cols: "12",
                                        md: "6"
                                      }, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(ssrRenderComponent(VTextField, {
                                              modelValue: unref(selectedDoc).data_emissao,
                                              "onUpdate:modelValue": ($event) => unref(selectedDoc).data_emissao = $event,
                                              type: "date",
                                              label: "Emiss\xE3o"
                                            }, null, _parent7, _scopeId6));
                                          } else {
                                            return [
                                              createVNode(VTextField, {
                                                modelValue: unref(selectedDoc).data_emissao,
                                                "onUpdate:modelValue": ($event) => unref(selectedDoc).data_emissao = $event,
                                                type: "date",
                                                label: "Emiss\xE3o"
                                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                            ];
                                          }
                                        }),
                                        _: 1
                                      }, _parent6, _scopeId5));
                                      _push6(ssrRenderComponent(VCol, {
                                        cols: "12",
                                        md: "6"
                                      }, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(ssrRenderComponent(VTextField, {
                                              modelValue: unref(selectedDoc).data_vencimento,
                                              "onUpdate:modelValue": ($event) => unref(selectedDoc).data_vencimento = $event,
                                              type: "date",
                                              label: "Validade"
                                            }, null, _parent7, _scopeId6));
                                          } else {
                                            return [
                                              createVNode(VTextField, {
                                                modelValue: unref(selectedDoc).data_vencimento,
                                                "onUpdate:modelValue": ($event) => unref(selectedDoc).data_vencimento = $event,
                                                type: "date",
                                                label: "Validade"
                                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                            ];
                                          }
                                        }),
                                        _: 1
                                      }, _parent6, _scopeId5));
                                    } else {
                                      return [
                                        createVNode(VCol, {
                                          cols: "12",
                                          md: "6"
                                        }, {
                                          default: withCtx(() => [
                                            createVNode(VAutocomplete, {
                                              modelValue: unref(selectedDoc).tabvalores_tipodoc_id,
                                              "onUpdate:modelValue": ($event) => unref(selectedDoc).tabvalores_tipodoc_id = $event,
                                              items: unref(documentos).tipoDocumentoItems,
                                              label: "Tipo",
                                              "item-title": "descricao",
                                              "item-value": "id"
                                            }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(VCol, {
                                          cols: "12",
                                          md: "6"
                                        }, {
                                          default: withCtx(() => [
                                            createVNode(VTextField, {
                                              modelValue: unref(selectedDoc).numero,
                                              "onUpdate:modelValue": ($event) => unref(selectedDoc).numero = $event,
                                              label: "N\xFAmero"
                                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(VCol, {
                                          cols: "12",
                                          md: "6"
                                        }, {
                                          default: withCtx(() => [
                                            createVNode(VTextField, {
                                              modelValue: unref(selectedDoc).emissor,
                                              "onUpdate:modelValue": ($event) => unref(selectedDoc).emissor = $event,
                                              label: "N\xFAmero"
                                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(VCol, {
                                          cols: "12",
                                          md: "6"
                                        }, {
                                          default: withCtx(() => [
                                            createVNode(VAutocomplete, {
                                              modelValue: unref(selectedDoc).tabvalores_ufemissor_id,
                                              "onUpdate:modelValue": ($event) => unref(selectedDoc).tabvalores_ufemissor_id = $event,
                                              items: unref(documentos).ufItems,
                                              label: "UF",
                                              "item-title": "descricao",
                                              "item-value": "id"
                                            }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(VCol, {
                                          cols: "12",
                                          md: "6"
                                        }, {
                                          default: withCtx(() => [
                                            createVNode(VTextField, {
                                              modelValue: unref(selectedDoc).data_emissao,
                                              "onUpdate:modelValue": ($event) => unref(selectedDoc).data_emissao = $event,
                                              type: "date",
                                              label: "Emiss\xE3o"
                                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(VCol, {
                                          cols: "12",
                                          md: "6"
                                        }, {
                                          default: withCtx(() => [
                                            createVNode(VTextField, {
                                              modelValue: unref(selectedDoc).data_vencimento,
                                              "onUpdate:modelValue": ($event) => unref(selectedDoc).data_vencimento = $event,
                                              type: "date",
                                              label: "Validade"
                                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
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
                                  createVNode(VRow, null, {
                                    default: withCtx(() => [
                                      createVNode(VCol, {
                                        cols: "12",
                                        md: "6"
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(VAutocomplete, {
                                            modelValue: unref(selectedDoc).tabvalores_tipodoc_id,
                                            "onUpdate:modelValue": ($event) => unref(selectedDoc).tabvalores_tipodoc_id = $event,
                                            items: unref(documentos).tipoDocumentoItems,
                                            label: "Tipo",
                                            "item-title": "descricao",
                                            "item-value": "id"
                                          }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(VCol, {
                                        cols: "12",
                                        md: "6"
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(VTextField, {
                                            modelValue: unref(selectedDoc).numero,
                                            "onUpdate:modelValue": ($event) => unref(selectedDoc).numero = $event,
                                            label: "N\xFAmero"
                                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(VCol, {
                                        cols: "12",
                                        md: "6"
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(VTextField, {
                                            modelValue: unref(selectedDoc).emissor,
                                            "onUpdate:modelValue": ($event) => unref(selectedDoc).emissor = $event,
                                            label: "N\xFAmero"
                                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(VCol, {
                                        cols: "12",
                                        md: "6"
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(VAutocomplete, {
                                            modelValue: unref(selectedDoc).tabvalores_ufemissor_id,
                                            "onUpdate:modelValue": ($event) => unref(selectedDoc).tabvalores_ufemissor_id = $event,
                                            items: unref(documentos).ufItems,
                                            label: "UF",
                                            "item-title": "descricao",
                                            "item-value": "id"
                                          }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(VCol, {
                                        cols: "12",
                                        md: "6"
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(VTextField, {
                                            modelValue: unref(selectedDoc).data_emissao,
                                            "onUpdate:modelValue": ($event) => unref(selectedDoc).data_emissao = $event,
                                            type: "date",
                                            label: "Emiss\xE3o"
                                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(VCol, {
                                        cols: "12",
                                        md: "6"
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(VTextField, {
                                            modelValue: unref(selectedDoc).data_vencimento,
                                            "onUpdate:modelValue": ($event) => unref(selectedDoc).data_vencimento = $event,
                                            type: "date",
                                            label: "Validade"
                                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
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
                          _push4(ssrRenderComponent(VCardActions, null, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(VSpacer, null, null, _parent5, _scopeId4));
                                _push5(ssrRenderComponent(VBtn, {
                                  color: "green",
                                  text: "",
                                  onClick: ($event) => isModalOpen.value = false
                                }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(`Cancelar`);
                                    } else {
                                      return [
                                        createTextVNode("Cancelar")
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent5, _scopeId4));
                                _push5(ssrRenderComponent(VBtn, {
                                  color: "green",
                                  text: "",
                                  onClick: ($event) => onUpdate(unref(selectedDoc).id)
                                }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(`Salvar`);
                                    } else {
                                      return [
                                        createTextVNode("Salvar")
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(VSpacer),
                                  createVNode(VBtn, {
                                    color: "green",
                                    text: "",
                                    onClick: ($event) => isModalOpen.value = false
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode("Cancelar")
                                    ]),
                                    _: 1
                                  }, 8, ["onClick"]),
                                  createVNode(VBtn, {
                                    color: "green",
                                    text: "",
                                    onClick: ($event) => onUpdate(unref(selectedDoc).id)
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
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(VCardTitle, { style: { "color": "green" } }, {
                              default: withCtx(() => [
                                createTextVNode("Atualizar Endere\xE7o")
                              ]),
                              _: 1
                            }),
                            createVNode(VCardText, null, {
                              default: withCtx(() => [
                                createVNode(VRow, null, {
                                  default: withCtx(() => [
                                    createVNode(VCol, {
                                      cols: "12",
                                      md: "6"
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(VAutocomplete, {
                                          modelValue: unref(selectedDoc).tabvalores_tipodoc_id,
                                          "onUpdate:modelValue": ($event) => unref(selectedDoc).tabvalores_tipodoc_id = $event,
                                          items: unref(documentos).tipoDocumentoItems,
                                          label: "Tipo",
                                          "item-title": "descricao",
                                          "item-value": "id"
                                        }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(VCol, {
                                      cols: "12",
                                      md: "6"
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(VTextField, {
                                          modelValue: unref(selectedDoc).numero,
                                          "onUpdate:modelValue": ($event) => unref(selectedDoc).numero = $event,
                                          label: "N\xFAmero"
                                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(VCol, {
                                      cols: "12",
                                      md: "6"
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(VTextField, {
                                          modelValue: unref(selectedDoc).emissor,
                                          "onUpdate:modelValue": ($event) => unref(selectedDoc).emissor = $event,
                                          label: "N\xFAmero"
                                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(VCol, {
                                      cols: "12",
                                      md: "6"
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(VAutocomplete, {
                                          modelValue: unref(selectedDoc).tabvalores_ufemissor_id,
                                          "onUpdate:modelValue": ($event) => unref(selectedDoc).tabvalores_ufemissor_id = $event,
                                          items: unref(documentos).ufItems,
                                          label: "UF",
                                          "item-title": "descricao",
                                          "item-value": "id"
                                        }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(VCol, {
                                      cols: "12",
                                      md: "6"
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(VTextField, {
                                          modelValue: unref(selectedDoc).data_emissao,
                                          "onUpdate:modelValue": ($event) => unref(selectedDoc).data_emissao = $event,
                                          type: "date",
                                          label: "Emiss\xE3o"
                                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(VCol, {
                                      cols: "12",
                                      md: "6"
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(VTextField, {
                                          modelValue: unref(selectedDoc).data_vencimento,
                                          "onUpdate:modelValue": ($event) => unref(selectedDoc).data_vencimento = $event,
                                          type: "date",
                                          label: "Validade"
                                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }),
                            createVNode(VCardActions, null, {
                              default: withCtx(() => [
                                createVNode(VSpacer),
                                createVNode(VBtn, {
                                  color: "green",
                                  text: "",
                                  onClick: ($event) => isModalOpen.value = false
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode("Cancelar")
                                  ]),
                                  _: 1
                                }, 8, ["onClick"]),
                                createVNode(VBtn, {
                                  color: "green",
                                  text: "",
                                  onClick: ($event) => onUpdate(unref(selectedDoc).id)
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
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(VCard, null, {
                        default: withCtx(() => [
                          createVNode(VCardTitle, { style: { "color": "green" } }, {
                            default: withCtx(() => [
                              createTextVNode("Atualizar Endere\xE7o")
                            ]),
                            _: 1
                          }),
                          createVNode(VCardText, null, {
                            default: withCtx(() => [
                              createVNode(VRow, null, {
                                default: withCtx(() => [
                                  createVNode(VCol, {
                                    cols: "12",
                                    md: "6"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(VAutocomplete, {
                                        modelValue: unref(selectedDoc).tabvalores_tipodoc_id,
                                        "onUpdate:modelValue": ($event) => unref(selectedDoc).tabvalores_tipodoc_id = $event,
                                        items: unref(documentos).tipoDocumentoItems,
                                        label: "Tipo",
                                        "item-title": "descricao",
                                        "item-value": "id"
                                      }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(VCol, {
                                    cols: "12",
                                    md: "6"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(VTextField, {
                                        modelValue: unref(selectedDoc).numero,
                                        "onUpdate:modelValue": ($event) => unref(selectedDoc).numero = $event,
                                        label: "N\xFAmero"
                                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(VCol, {
                                    cols: "12",
                                    md: "6"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(VTextField, {
                                        modelValue: unref(selectedDoc).emissor,
                                        "onUpdate:modelValue": ($event) => unref(selectedDoc).emissor = $event,
                                        label: "N\xFAmero"
                                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(VCol, {
                                    cols: "12",
                                    md: "6"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(VAutocomplete, {
                                        modelValue: unref(selectedDoc).tabvalores_ufemissor_id,
                                        "onUpdate:modelValue": ($event) => unref(selectedDoc).tabvalores_ufemissor_id = $event,
                                        items: unref(documentos).ufItems,
                                        label: "UF",
                                        "item-title": "descricao",
                                        "item-value": "id"
                                      }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(VCol, {
                                    cols: "12",
                                    md: "6"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(VTextField, {
                                        modelValue: unref(selectedDoc).data_emissao,
                                        "onUpdate:modelValue": ($event) => unref(selectedDoc).data_emissao = $event,
                                        type: "date",
                                        label: "Emiss\xE3o"
                                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(VCol, {
                                    cols: "12",
                                    md: "6"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(VTextField, {
                                        modelValue: unref(selectedDoc).data_vencimento,
                                        "onUpdate:modelValue": ($event) => unref(selectedDoc).data_vencimento = $event,
                                        type: "date",
                                        label: "Validade"
                                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(VCardActions, null, {
                            default: withCtx(() => [
                              createVNode(VSpacer),
                              createVNode(VBtn, {
                                color: "green",
                                text: "",
                                onClick: ($event) => isModalOpen.value = false
                              }, {
                                default: withCtx(() => [
                                  createTextVNode("Cancelar")
                                ]),
                                _: 1
                              }, 8, ["onClick"]),
                              createVNode(VBtn, {
                                color: "green",
                                text: "",
                                onClick: ($event) => onUpdate(unref(selectedDoc).id)
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
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(VRow, null, {
                  default: withCtx(() => [
                    createVNode(VCol, { md: "2" }, {
                      default: withCtx(() => [
                        createVNode(VAutocomplete, {
                          modelValue: unref(state).tabvalores_tipodoc_id,
                          "onUpdate:modelValue": ($event) => unref(state).tabvalores_tipodoc_id = $event,
                          items: unref(documentos).tipoDocumentoItems,
                          label: "Tipo",
                          "item-title": "descricao",
                          "item-value": "id"
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, null, {
                      default: withCtx(() => [
                        createVNode(VTextField, {
                          modelValue: unref(state).numero,
                          "onUpdate:modelValue": ($event) => unref(state).numero = $event,
                          "error-messages": unref(v$).numero.$errors.map((e) => e.$message),
                          label: "Numero",
                          required: "",
                          onBlur: unref(v$).numero.$touch,
                          onInput: unref(v$).numero.$touch
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages", "onBlur", "onInput"])
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, { md: "2" }, {
                      default: withCtx(() => [
                        createVNode(VTextField, {
                          modelValue: unref(state).emissor,
                          "onUpdate:modelValue": ($event) => unref(state).emissor = $event,
                          "error-messages": unref(v$).emissor.$errors.map((e) => e.$message),
                          required: "",
                          onBlur: unref(v$).emissor.$touch,
                          onInput: unref(v$).emissor.$touch,
                          label: "Emissor"
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages", "onBlur", "onInput"])
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, null, {
                      default: withCtx(() => [
                        createVNode(VAutocomplete, {
                          modelValue: unref(state).tabvalores_ufemissor_id,
                          "onUpdate:modelValue": ($event) => unref(state).tabvalores_ufemissor_id = $event,
                          items: unref(documentos).ufItems,
                          label: "UF",
                          "item-title": "descricao",
                          "item-value": "id"
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, { md: "2" }, {
                      default: withCtx(() => [
                        createVNode(VTextField, {
                          modelValue: unref(state).data_emissao,
                          "onUpdate:modelValue": ($event) => unref(state).data_emissao = $event,
                          type: "date",
                          label: "Emiss\xE3o"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, { md: "2" }, {
                      default: withCtx(() => [
                        createVNode(VTextField, {
                          modelValue: unref(state).data_vencimento,
                          "onUpdate:modelValue": ($event) => unref(state).data_vencimento = $event,
                          type: "date",
                          label: "Validade"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode("div", { class: "mt-3" }, [
                      createVNode("img", {
                        style: { "width": "40px", "height": "40px", "cursor": "pointer" },
                        src: _imports_0$3,
                        alt: "novo",
                        onClick: onSubmit
                      })
                    ])
                  ]),
                  _: 1
                }),
                createVNode(VDataTable, {
                  headers,
                  items: unref(documentos).pessoasDocsItems,
                  "item-key": "id"
                }, {
                  "item.actions": withCtx(({ item }) => [
                    createVNode(VRow, { style: { "display": "flex", "margin-top": "-8px", "gap": "10px" } }, {
                      default: withCtx(() => [
                        createVNode("div", {
                          onClick: ($event) => redirectToUpdate(item.id),
                          title: "editar"
                        }, [
                          createVNode("img", {
                            style: { "width": "30px", "height": "30px", "cursor": "pointer" },
                            src: _imports_1,
                            alt: "editar"
                          })
                        ], 8, ["onClick"]),
                        createVNode("div", {
                          onClick: ($event) => deleteDocumento(item),
                          title: "deletar"
                        }, [
                          item.excluido ? (openBlock(), createBlock("img", {
                            key: 0,
                            style: { "width": "30px", "height": "30px", "cursor": "pointer" },
                            src: _imports_2,
                            alt: "deletar",
                            title: "Reativar"
                          })) : (openBlock(), createBlock("img", {
                            key: 1,
                            src: _imports_3,
                            alt: "reativar",
                            class: "trash-icon",
                            style: { "width": "30px", "height": "30px", "cursor": "pointer" },
                            title: "reativar"
                          }))
                        ], 8, ["onClick"])
                      ]),
                      _: 2
                    }, 1024)
                  ]),
                  _: 1
                }, 8, ["items"]),
                createVNode(_component_NuxtLink, { to: "/pessoas/lista" }, {
                  default: withCtx(() => [
                    createVNode(VBtn, {
                      size: "large",
                      color: "red"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Voltar")
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                createVNode(VDialog, {
                  modelValue: unref(isModalOpen),
                  "onUpdate:modelValue": ($event) => isRef(isModalOpen) ? isModalOpen.value = $event : null,
                  "max-width": "600px"
                }, {
                  default: withCtx(() => [
                    createVNode(VCard, null, {
                      default: withCtx(() => [
                        createVNode(VCardTitle, { style: { "color": "green" } }, {
                          default: withCtx(() => [
                            createTextVNode("Atualizar Endere\xE7o")
                          ]),
                          _: 1
                        }),
                        createVNode(VCardText, null, {
                          default: withCtx(() => [
                            createVNode(VRow, null, {
                              default: withCtx(() => [
                                createVNode(VCol, {
                                  cols: "12",
                                  md: "6"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(VAutocomplete, {
                                      modelValue: unref(selectedDoc).tabvalores_tipodoc_id,
                                      "onUpdate:modelValue": ($event) => unref(selectedDoc).tabvalores_tipodoc_id = $event,
                                      items: unref(documentos).tipoDocumentoItems,
                                      label: "Tipo",
                                      "item-title": "descricao",
                                      "item-value": "id"
                                    }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                                  ]),
                                  _: 1
                                }),
                                createVNode(VCol, {
                                  cols: "12",
                                  md: "6"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(VTextField, {
                                      modelValue: unref(selectedDoc).numero,
                                      "onUpdate:modelValue": ($event) => unref(selectedDoc).numero = $event,
                                      label: "N\xFAmero"
                                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                  ]),
                                  _: 1
                                }),
                                createVNode(VCol, {
                                  cols: "12",
                                  md: "6"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(VTextField, {
                                      modelValue: unref(selectedDoc).emissor,
                                      "onUpdate:modelValue": ($event) => unref(selectedDoc).emissor = $event,
                                      label: "N\xFAmero"
                                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                  ]),
                                  _: 1
                                }),
                                createVNode(VCol, {
                                  cols: "12",
                                  md: "6"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(VAutocomplete, {
                                      modelValue: unref(selectedDoc).tabvalores_ufemissor_id,
                                      "onUpdate:modelValue": ($event) => unref(selectedDoc).tabvalores_ufemissor_id = $event,
                                      items: unref(documentos).ufItems,
                                      label: "UF",
                                      "item-title": "descricao",
                                      "item-value": "id"
                                    }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                                  ]),
                                  _: 1
                                }),
                                createVNode(VCol, {
                                  cols: "12",
                                  md: "6"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(VTextField, {
                                      modelValue: unref(selectedDoc).data_emissao,
                                      "onUpdate:modelValue": ($event) => unref(selectedDoc).data_emissao = $event,
                                      type: "date",
                                      label: "Emiss\xE3o"
                                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                  ]),
                                  _: 1
                                }),
                                createVNode(VCol, {
                                  cols: "12",
                                  md: "6"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(VTextField, {
                                      modelValue: unref(selectedDoc).data_vencimento,
                                      "onUpdate:modelValue": ($event) => unref(selectedDoc).data_vencimento = $event,
                                      type: "date",
                                      label: "Validade"
                                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        createVNode(VCardActions, null, {
                          default: withCtx(() => [
                            createVNode(VSpacer),
                            createVNode(VBtn, {
                              color: "green",
                              text: "",
                              onClick: ($event) => isModalOpen.value = false
                            }, {
                              default: withCtx(() => [
                                createTextVNode("Cancelar")
                              ]),
                              _: 1
                            }, 8, ["onClick"]),
                            createVNode(VBtn, {
                              color: "green",
                              text: "",
                              onClick: ($event) => onUpdate(unref(selectedDoc).id)
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
                  ]),
                  _: 1
                }, 8, ["modelValue", "onUpdate:modelValue"])
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
    };
  }
};
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Documentos.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const _sfc_main$6 = {
  __name: "Endereco",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const { $toast } = useNuxtApp();
    const route = useRoute$1();
    const { id } = route.params;
    const config = useRuntimeConfig();
    const allPaises = `${config.public.managemant}/listarPais`;
    const allEnderecos = `${config.public.managemant}/getPessoaEnderecoById`;
    const criarEnderecos = `${config.public.managemant}/createPessoaEndereco`;
    const updateEndereco = `${config.public.managemant}/updatePessoaEndereco`;
    const user_id = ref(useCookie("user-data").value.usuario_id).value;
    const pessoa_id = Number(useCookie("pessoa-id").value || id);
    const state = reactive({
      tabvalores_pais_id: "",
      cidade_id: "",
      codcep: "",
      logradouro: "",
      numero: "",
      bairro: "",
      data_vencimento: "",
      tabvalores_ufemissor_id: "",
      complemento: "",
      cidade_estrangeira: ""
    });
    const headers = [
      { title: "Pa\xEDs", value: "pais.descricao" },
      { title: "CEP", value: "codcep" },
      { title: "Endere\xE7o", value: "logradouro", width: "200px" },
      {
        title: "N*",
        value: "numero"
      },
      {
        title: "Complemento",
        value: "complemento"
      },
      {
        title: "Bairro",
        value: "bairro"
      },
      {
        title: "Cidade",
        value: "cidades.nome"
      },
      {
        value: "actions"
      }
    ];
    const isModalOpen = ref(false);
    const selectedEndereco = ref(null);
    const isForeign = computed(() => {
      const selectedPais = enderecos.value.paisItems.find(
        (pais) => pais.id === state.tabvalores_pais_id
      );
      return selectedPais ? selectedPais.estrangeiro : false;
    });
    const rules = {
      numero: {
        required: helpers.withMessage("O campo \xE9 obrigatorio", required)
      },
      bairro: {
        required: helpers.withMessage("O campo \xE9 obrigatorio", required)
      },
      logradouro: {
        required: helpers.withMessage("O campo \xE9 obrigatorio", required)
      },
      codcep: {
        required: helpers.withMessage(
          "O campo \xE9 obrigatorio e precisa de 8 digitos",
          required
        )
      }
    };
    const v$ = useVuelidate(rules, state);
    const {
      data: enderecos,
      status,
      pending,
      refresh
    } = ([__temp, __restore] = withAsyncContext(async () => useLazyAsyncData("cliente-enderecos", async () => {
      const [paisItems, enderecosItems, cidadesItems] = await Promise.all([
        $fetch(allPaises),
        $fetch(`${allEnderecos}/${pessoa_id}`),
        $fetch(`${config.public.managemant}/listarCidades`)
      ]);
      return { paisItems, enderecosItems, cidadesItems };
    })), __temp = await __temp, __restore(), __temp);
    async function onSubmit() {
      if (await v$.value.$validate()) {
        const payload = { ...state };
        for (const key in payload) {
          if (payload[key] === "") {
            payload[key] = null;
          }
        }
        const payloadFormated = {
          ...payload,
          user_id,
          pessoa_id
        };
        const { data, error, status: status2 } = await useFetch(criarEnderecos, {
          method: "POST",
          body: payloadFormated
        }, "$xTfPNGciav");
        if (status2.value === "error" && error.value.statusCode === 500) {
          $toast.error("Erro ao cadastrar endere\xE7o,erro no sistema.");
        } else {
          $toast.success("Endere\xE7o cadastrado com sucesso!");
          refresh();
          for (const key in state) {
            state[key] = "";
          }
          v$.value.$reset();
        }
      } else {
        $toast.error(
          "Erro ao cadastrar Endere\xE7o, preencha os campos obrigatorios."
        );
      }
    }
    function redirectToUpdate(id2) {
      const endereco = enderecos.value.enderecosItems.find(
        (item) => item.id === id2
      );
      if (endereco) {
        selectedEndereco.value = endereco;
        isModalOpen.value = true;
      }
    }
    async function onUpdate(id2) {
      const payloadFormated = {
        tabvalores_pais_id: selectedEndereco.value.tabvalores_pais_id,
        cidade_id: selectedEndereco.value.cidade_id,
        codcep: selectedEndereco.value.codcep,
        logradouro: selectedEndereco.value.logradouro,
        numero: selectedEndereco.value.numero,
        bairro: selectedEndereco.value.bairro,
        complemento: selectedEndereco.value.complemento
      };
      const { status: status2 } = await useFetch(`${updateEndereco}/${id2}`, {
        method: "PUT",
        body: payloadFormated
      }, "$DfOGkJVB8l");
      if (status2.value === "success") {
        isModalOpen.value = false;
        $toast.success("Endere\xE7o atualizado com sucesso!");
        refresh();
      }
    }
    async function deleteEndereco(item) {
      item.excluido = !item.excluido;
      try {
        await useFetch(`${updateEndereco}/${item.id}`, {
          method: "PUT",
          body: { excluido: item.excluido }
        }, "$u4gWF5EA7L");
      } catch (error) {
        console.error("Erro ao excluir pessoa:", error);
      }
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      const _directive_mask = resolveDirective("mask");
      if (!unref(pending)) {
        _push(ssrRenderComponent(VContainer, mergeProps({ class: "mt-5" }, _attrs), {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(VRow, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(VCol, { md: "2" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(VAutocomplete, {
                            modelValue: unref(state).tabvalores_pais_id,
                            "onUpdate:modelValue": ($event) => unref(state).tabvalores_pais_id = $event,
                            items: unref(enderecos).paisItems,
                            label: "Pa\xEDs",
                            "item-title": "descricao",
                            "item-value": "id"
                          }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(VAutocomplete, {
                              modelValue: unref(state).tabvalores_pais_id,
                              "onUpdate:modelValue": ($event) => unref(state).tabvalores_pais_id = $event,
                              items: unref(enderecos).paisItems,
                              label: "Pa\xEDs",
                              "item-title": "descricao",
                              "item-value": "id"
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(VCol, { md: "2" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(VTextField, mergeProps({
                            modelValue: unref(state).codcep,
                            "onUpdate:modelValue": ($event) => unref(state).codcep = $event,
                            "error-messages": unref(v$).codcep.$errors.map((e) => e.$message),
                            required: "",
                            onBlur: unref(v$).codcep.$touch,
                            onInput: unref(v$).codcep.$touch,
                            label: "CEP"
                          }, ssrGetDirectiveProps(_ctx, _directive_mask, "########")), null, _parent4, _scopeId3));
                        } else {
                          return [
                            withDirectives(createVNode(VTextField, {
                              modelValue: unref(state).codcep,
                              "onUpdate:modelValue": ($event) => unref(state).codcep = $event,
                              "error-messages": unref(v$).codcep.$errors.map((e) => e.$message),
                              required: "",
                              onBlur: unref(v$).codcep.$touch,
                              onInput: unref(v$).codcep.$touch,
                              label: "CEP"
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages", "onBlur", "onInput"]), [
                              [_directive_mask, "########"]
                            ])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(VCol, { md: "6" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(VTextField, {
                            modelValue: unref(state).logradouro,
                            "onUpdate:modelValue": ($event) => unref(state).logradouro = $event,
                            label: "Endere\xE7o",
                            "error-messages": unref(v$).logradouro.$errors.map((e) => e.$message),
                            required: "",
                            onBlur: unref(v$).logradouro.$touch,
                            onInput: unref(v$).logradouro.$touch
                          }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(VTextField, {
                              modelValue: unref(state).logradouro,
                              "onUpdate:modelValue": ($event) => unref(state).logradouro = $event,
                              label: "Endere\xE7o",
                              "error-messages": unref(v$).logradouro.$errors.map((e) => e.$message),
                              required: "",
                              onBlur: unref(v$).logradouro.$touch,
                              onInput: unref(v$).logradouro.$touch
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages", "onBlur", "onInput"])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(VCol, { md: "1" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(VTextField, {
                            modelValue: unref(state).numero,
                            "onUpdate:modelValue": ($event) => unref(state).numero = $event,
                            "error-messages": unref(v$).numero.$errors.map((e) => e.$message),
                            required: "",
                            onBlur: unref(v$).numero.$touch,
                            onInput: unref(v$).numero.$touch,
                            label: "N*"
                          }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(VTextField, {
                              modelValue: unref(state).numero,
                              "onUpdate:modelValue": ($event) => unref(state).numero = $event,
                              "error-messages": unref(v$).numero.$errors.map((e) => e.$message),
                              required: "",
                              onBlur: unref(v$).numero.$touch,
                              onInput: unref(v$).numero.$touch,
                              label: "N*"
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages", "onBlur", "onInput"])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(`<div class="mt-3"${_scopeId2}><img style="${ssrRenderStyle({ "width": "40px", "height": "40px", "cursor": "pointer" })}"${ssrRenderAttr("src", _imports_0$3)} alt="novo"${_scopeId2}></div>`);
                    _push3(ssrRenderComponent(VCol, { md: "5" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(VTextField, {
                            modelValue: unref(state).complemento,
                            "onUpdate:modelValue": ($event) => unref(state).complemento = $event,
                            label: "Complemento"
                          }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(VTextField, {
                              modelValue: unref(state).complemento,
                              "onUpdate:modelValue": ($event) => unref(state).complemento = $event,
                              label: "Complemento"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(VCol, { md: "3" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(VTextField, {
                            modelValue: unref(state).bairro,
                            "onUpdate:modelValue": ($event) => unref(state).bairro = $event,
                            "error-messages": unref(v$).bairro.$errors.map((e) => e.$message),
                            required: "",
                            onBlur: unref(v$).bairro.$touch,
                            onInput: unref(v$).bairro.$touch,
                            label: "Bairro"
                          }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(VTextField, {
                              modelValue: unref(state).bairro,
                              "onUpdate:modelValue": ($event) => unref(state).bairro = $event,
                              "error-messages": unref(v$).bairro.$errors.map((e) => e.$message),
                              required: "",
                              onBlur: unref(v$).bairro.$touch,
                              onInput: unref(v$).bairro.$touch,
                              label: "Bairro"
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages", "onBlur", "onInput"])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(VCol, { md: "3" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          if (!unref(isForeign)) {
                            _push4(ssrRenderComponent(VAutocomplete, {
                              modelValue: unref(state).cidade_id,
                              "onUpdate:modelValue": ($event) => unref(state).cidade_id = $event,
                              items: unref(enderecos).cidadesItems,
                              label: "Cidade",
                              "item-title": "descricao",
                              "item-value": "id"
                            }, null, _parent4, _scopeId3));
                          } else {
                            _push4(ssrRenderComponent(VTextField, {
                              modelValue: unref(state).cidade_estrangeira,
                              "onUpdate:modelValue": ($event) => unref(state).cidade_estrangeira = $event,
                              label: "Cidade Estrangeira"
                            }, null, _parent4, _scopeId3));
                          }
                        } else {
                          return [
                            !unref(isForeign) ? (openBlock(), createBlock(VAutocomplete, {
                              key: 0,
                              modelValue: unref(state).cidade_id,
                              "onUpdate:modelValue": ($event) => unref(state).cidade_id = $event,
                              items: unref(enderecos).cidadesItems,
                              label: "Cidade",
                              "item-title": "descricao",
                              "item-value": "id"
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])) : (openBlock(), createBlock(VTextField, {
                              key: 1,
                              modelValue: unref(state).cidade_estrangeira,
                              "onUpdate:modelValue": ($event) => unref(state).cidade_estrangeira = $event,
                              label: "Cidade Estrangeira"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"]))
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(VCol, { md: "2" }, {
                        default: withCtx(() => [
                          createVNode(VAutocomplete, {
                            modelValue: unref(state).tabvalores_pais_id,
                            "onUpdate:modelValue": ($event) => unref(state).tabvalores_pais_id = $event,
                            items: unref(enderecos).paisItems,
                            label: "Pa\xEDs",
                            "item-title": "descricao",
                            "item-value": "id"
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                        ]),
                        _: 1
                      }),
                      createVNode(VCol, { md: "2" }, {
                        default: withCtx(() => [
                          withDirectives(createVNode(VTextField, {
                            modelValue: unref(state).codcep,
                            "onUpdate:modelValue": ($event) => unref(state).codcep = $event,
                            "error-messages": unref(v$).codcep.$errors.map((e) => e.$message),
                            required: "",
                            onBlur: unref(v$).codcep.$touch,
                            onInput: unref(v$).codcep.$touch,
                            label: "CEP"
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages", "onBlur", "onInput"]), [
                            [_directive_mask, "########"]
                          ])
                        ]),
                        _: 1
                      }),
                      createVNode(VCol, { md: "6" }, {
                        default: withCtx(() => [
                          createVNode(VTextField, {
                            modelValue: unref(state).logradouro,
                            "onUpdate:modelValue": ($event) => unref(state).logradouro = $event,
                            label: "Endere\xE7o",
                            "error-messages": unref(v$).logradouro.$errors.map((e) => e.$message),
                            required: "",
                            onBlur: unref(v$).logradouro.$touch,
                            onInput: unref(v$).logradouro.$touch
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages", "onBlur", "onInput"])
                        ]),
                        _: 1
                      }),
                      createVNode(VCol, { md: "1" }, {
                        default: withCtx(() => [
                          createVNode(VTextField, {
                            modelValue: unref(state).numero,
                            "onUpdate:modelValue": ($event) => unref(state).numero = $event,
                            "error-messages": unref(v$).numero.$errors.map((e) => e.$message),
                            required: "",
                            onBlur: unref(v$).numero.$touch,
                            onInput: unref(v$).numero.$touch,
                            label: "N*"
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages", "onBlur", "onInput"])
                        ]),
                        _: 1
                      }),
                      createVNode("div", { class: "mt-3" }, [
                        createVNode("img", {
                          style: { "width": "40px", "height": "40px", "cursor": "pointer" },
                          src: _imports_0$3,
                          alt: "novo",
                          onClick: onSubmit
                        })
                      ]),
                      createVNode(VCol, { md: "5" }, {
                        default: withCtx(() => [
                          createVNode(VTextField, {
                            modelValue: unref(state).complemento,
                            "onUpdate:modelValue": ($event) => unref(state).complemento = $event,
                            label: "Complemento"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        _: 1
                      }),
                      createVNode(VCol, { md: "3" }, {
                        default: withCtx(() => [
                          createVNode(VTextField, {
                            modelValue: unref(state).bairro,
                            "onUpdate:modelValue": ($event) => unref(state).bairro = $event,
                            "error-messages": unref(v$).bairro.$errors.map((e) => e.$message),
                            required: "",
                            onBlur: unref(v$).bairro.$touch,
                            onInput: unref(v$).bairro.$touch,
                            label: "Bairro"
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages", "onBlur", "onInput"])
                        ]),
                        _: 1
                      }),
                      createVNode(VCol, { md: "3" }, {
                        default: withCtx(() => [
                          !unref(isForeign) ? (openBlock(), createBlock(VAutocomplete, {
                            key: 0,
                            modelValue: unref(state).cidade_id,
                            "onUpdate:modelValue": ($event) => unref(state).cidade_id = $event,
                            items: unref(enderecos).cidadesItems,
                            label: "Cidade",
                            "item-title": "descricao",
                            "item-value": "id"
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])) : (openBlock(), createBlock(VTextField, {
                            key: 1,
                            modelValue: unref(state).cidade_estrangeira,
                            "onUpdate:modelValue": ($event) => unref(state).cidade_estrangeira = $event,
                            label: "Cidade Estrangeira"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"]))
                        ]),
                        _: 1
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(VDataTable, {
                headers,
                items: unref(enderecos).enderecosItems,
                "item-key": "id"
              }, {
                "item.actions": withCtx(({ item }, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(VRow, { style: { "display": "flex", "margin-top": "-8px", "gap": "10px" } }, {
                      default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<div title="Visualizar"${_scopeId3}><img style="${ssrRenderStyle({ "width": "30px", "height": "30px", "cursor": "pointer" })}"${ssrRenderAttr("src", _imports_1)} alt="Visualizar"${_scopeId3}></div><div title="Visualizar"${_scopeId3}>`);
                          if (item.excluido) {
                            _push4(`<img style="${ssrRenderStyle({ "width": "30px", "height": "30px", "cursor": "pointer" })}"${ssrRenderAttr("src", _imports_2)} alt="Visualizar" title="Reativar"${_scopeId3}>`);
                          } else {
                            _push4(`<img${ssrRenderAttr("src", _imports_3)} alt="Excluir" class="trash-icon" style="${ssrRenderStyle({ "width": "30px", "height": "30px", "cursor": "pointer" })}" title="Excluir"${_scopeId3}>`);
                          }
                          _push4(`</div>`);
                        } else {
                          return [
                            createVNode("div", {
                              onClick: ($event) => redirectToUpdate(item.id),
                              title: "Visualizar"
                            }, [
                              createVNode("img", {
                                style: { "width": "30px", "height": "30px", "cursor": "pointer" },
                                src: _imports_1,
                                alt: "Visualizar"
                              })
                            ], 8, ["onClick"]),
                            createVNode("div", {
                              onClick: ($event) => deleteEndereco(item),
                              title: "Visualizar"
                            }, [
                              item.excluido ? (openBlock(), createBlock("img", {
                                key: 0,
                                style: { "width": "30px", "height": "30px", "cursor": "pointer" },
                                src: _imports_2,
                                alt: "Visualizar",
                                title: "Reativar"
                              })) : (openBlock(), createBlock("img", {
                                key: 1,
                                src: _imports_3,
                                alt: "Excluir",
                                class: "trash-icon",
                                style: { "width": "30px", "height": "30px", "cursor": "pointer" },
                                title: "Excluir"
                              }))
                            ], 8, ["onClick"])
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(VRow, { style: { "display": "flex", "margin-top": "-8px", "gap": "10px" } }, {
                        default: withCtx(() => [
                          createVNode("div", {
                            onClick: ($event) => redirectToUpdate(item.id),
                            title: "Visualizar"
                          }, [
                            createVNode("img", {
                              style: { "width": "30px", "height": "30px", "cursor": "pointer" },
                              src: _imports_1,
                              alt: "Visualizar"
                            })
                          ], 8, ["onClick"]),
                          createVNode("div", {
                            onClick: ($event) => deleteEndereco(item),
                            title: "Visualizar"
                          }, [
                            item.excluido ? (openBlock(), createBlock("img", {
                              key: 0,
                              style: { "width": "30px", "height": "30px", "cursor": "pointer" },
                              src: _imports_2,
                              alt: "Visualizar",
                              title: "Reativar"
                            })) : (openBlock(), createBlock("img", {
                              key: 1,
                              src: _imports_3,
                              alt: "Excluir",
                              class: "trash-icon",
                              style: { "width": "30px", "height": "30px", "cursor": "pointer" },
                              title: "Excluir"
                            }))
                          ], 8, ["onClick"])
                        ]),
                        _: 2
                      }, 1024)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_NuxtLink, { to: "/pessoas/lista" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(VBtn, {
                      size: "large",
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
              _push2(ssrRenderComponent(VDialog, {
                modelValue: unref(isModalOpen),
                "onUpdate:modelValue": ($event) => isRef(isModalOpen) ? isModalOpen.value = $event : null,
                "max-width": "600px"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(VCard, null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(VCardTitle, { style: { "color": "green" } }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`Atualizar Endere\xE7o`);
                              } else {
                                return [
                                  createTextVNode("Atualizar Endere\xE7o")
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                          _push4(ssrRenderComponent(VCardText, null, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(VRow, null, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(ssrRenderComponent(VCol, {
                                        cols: "12",
                                        md: "6"
                                      }, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(ssrRenderComponent(VAutocomplete, {
                                              modelValue: unref(selectedEndereco).tabvalores_pais_id,
                                              "onUpdate:modelValue": ($event) => unref(selectedEndereco).tabvalores_pais_id = $event,
                                              items: unref(enderecos).paisItems,
                                              label: "Pa\xEDs",
                                              "item-title": "descricao",
                                              "item-value": "id"
                                            }, null, _parent7, _scopeId6));
                                          } else {
                                            return [
                                              createVNode(VAutocomplete, {
                                                modelValue: unref(selectedEndereco).tabvalores_pais_id,
                                                "onUpdate:modelValue": ($event) => unref(selectedEndereco).tabvalores_pais_id = $event,
                                                items: unref(enderecos).paisItems,
                                                label: "Pa\xEDs",
                                                "item-title": "descricao",
                                                "item-value": "id"
                                              }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                                            ];
                                          }
                                        }),
                                        _: 1
                                      }, _parent6, _scopeId5));
                                      _push6(ssrRenderComponent(VCol, {
                                        cols: "12",
                                        md: "6"
                                      }, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(ssrRenderComponent(VTextField, {
                                              modelValue: unref(selectedEndereco).logradouro,
                                              "onUpdate:modelValue": ($event) => unref(selectedEndereco).logradouro = $event,
                                              label: "Logradouro"
                                            }, null, _parent7, _scopeId6));
                                          } else {
                                            return [
                                              createVNode(VTextField, {
                                                modelValue: unref(selectedEndereco).logradouro,
                                                "onUpdate:modelValue": ($event) => unref(selectedEndereco).logradouro = $event,
                                                label: "Logradouro"
                                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                            ];
                                          }
                                        }),
                                        _: 1
                                      }, _parent6, _scopeId5));
                                      _push6(ssrRenderComponent(VCol, {
                                        cols: "12",
                                        md: "6"
                                      }, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(ssrRenderComponent(VTextField, {
                                              modelValue: unref(selectedEndereco).complemento,
                                              "onUpdate:modelValue": ($event) => unref(selectedEndereco).complemento = $event,
                                              label: "Complemento"
                                            }, null, _parent7, _scopeId6));
                                          } else {
                                            return [
                                              createVNode(VTextField, {
                                                modelValue: unref(selectedEndereco).complemento,
                                                "onUpdate:modelValue": ($event) => unref(selectedEndereco).complemento = $event,
                                                label: "Complemento"
                                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                            ];
                                          }
                                        }),
                                        _: 1
                                      }, _parent6, _scopeId5));
                                      _push6(ssrRenderComponent(VCol, {
                                        cols: "12",
                                        md: "6"
                                      }, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(ssrRenderComponent(VTextField, {
                                              modelValue: unref(selectedEndereco).numero,
                                              "onUpdate:modelValue": ($event) => unref(selectedEndereco).numero = $event,
                                              label: "N\xFAmero"
                                            }, null, _parent7, _scopeId6));
                                          } else {
                                            return [
                                              createVNode(VTextField, {
                                                modelValue: unref(selectedEndereco).numero,
                                                "onUpdate:modelValue": ($event) => unref(selectedEndereco).numero = $event,
                                                label: "N\xFAmero"
                                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                            ];
                                          }
                                        }),
                                        _: 1
                                      }, _parent6, _scopeId5));
                                      _push6(ssrRenderComponent(VCol, {
                                        cols: "12",
                                        md: "6"
                                      }, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(ssrRenderComponent(VTextField, {
                                              modelValue: unref(selectedEndereco).bairro,
                                              "onUpdate:modelValue": ($event) => unref(selectedEndereco).bairro = $event,
                                              label: "Bairro"
                                            }, null, _parent7, _scopeId6));
                                          } else {
                                            return [
                                              createVNode(VTextField, {
                                                modelValue: unref(selectedEndereco).bairro,
                                                "onUpdate:modelValue": ($event) => unref(selectedEndereco).bairro = $event,
                                                label: "Bairro"
                                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                            ];
                                          }
                                        }),
                                        _: 1
                                      }, _parent6, _scopeId5));
                                      _push6(ssrRenderComponent(VCol, {
                                        cols: "12",
                                        md: "6"
                                      }, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(ssrRenderComponent(VTextField, {
                                              modelValue: unref(selectedEndereco).codcep,
                                              "onUpdate:modelValue": ($event) => unref(selectedEndereco).codcep = $event,
                                              label: "CEP"
                                            }, null, _parent7, _scopeId6));
                                          } else {
                                            return [
                                              createVNode(VTextField, {
                                                modelValue: unref(selectedEndereco).codcep,
                                                "onUpdate:modelValue": ($event) => unref(selectedEndereco).codcep = $event,
                                                label: "CEP"
                                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                            ];
                                          }
                                        }),
                                        _: 1
                                      }, _parent6, _scopeId5));
                                      _push6(ssrRenderComponent(VCol, {
                                        cols: "12",
                                        md: "6"
                                      }, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(ssrRenderComponent(VAutocomplete, {
                                              modelValue: unref(selectedEndereco).cidade_id,
                                              "onUpdate:modelValue": ($event) => unref(selectedEndereco).cidade_id = $event,
                                              items: unref(enderecos).cidadesItems,
                                              label: "Cidade",
                                              "item-title": "descricao",
                                              "item-value": "id"
                                            }, null, _parent7, _scopeId6));
                                          } else {
                                            return [
                                              createVNode(VAutocomplete, {
                                                modelValue: unref(selectedEndereco).cidade_id,
                                                "onUpdate:modelValue": ($event) => unref(selectedEndereco).cidade_id = $event,
                                                items: unref(enderecos).cidadesItems,
                                                label: "Cidade",
                                                "item-title": "descricao",
                                                "item-value": "id"
                                              }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                                            ];
                                          }
                                        }),
                                        _: 1
                                      }, _parent6, _scopeId5));
                                    } else {
                                      return [
                                        createVNode(VCol, {
                                          cols: "12",
                                          md: "6"
                                        }, {
                                          default: withCtx(() => [
                                            createVNode(VAutocomplete, {
                                              modelValue: unref(selectedEndereco).tabvalores_pais_id,
                                              "onUpdate:modelValue": ($event) => unref(selectedEndereco).tabvalores_pais_id = $event,
                                              items: unref(enderecos).paisItems,
                                              label: "Pa\xEDs",
                                              "item-title": "descricao",
                                              "item-value": "id"
                                            }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(VCol, {
                                          cols: "12",
                                          md: "6"
                                        }, {
                                          default: withCtx(() => [
                                            createVNode(VTextField, {
                                              modelValue: unref(selectedEndereco).logradouro,
                                              "onUpdate:modelValue": ($event) => unref(selectedEndereco).logradouro = $event,
                                              label: "Logradouro"
                                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(VCol, {
                                          cols: "12",
                                          md: "6"
                                        }, {
                                          default: withCtx(() => [
                                            createVNode(VTextField, {
                                              modelValue: unref(selectedEndereco).complemento,
                                              "onUpdate:modelValue": ($event) => unref(selectedEndereco).complemento = $event,
                                              label: "Complemento"
                                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(VCol, {
                                          cols: "12",
                                          md: "6"
                                        }, {
                                          default: withCtx(() => [
                                            createVNode(VTextField, {
                                              modelValue: unref(selectedEndereco).numero,
                                              "onUpdate:modelValue": ($event) => unref(selectedEndereco).numero = $event,
                                              label: "N\xFAmero"
                                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(VCol, {
                                          cols: "12",
                                          md: "6"
                                        }, {
                                          default: withCtx(() => [
                                            createVNode(VTextField, {
                                              modelValue: unref(selectedEndereco).bairro,
                                              "onUpdate:modelValue": ($event) => unref(selectedEndereco).bairro = $event,
                                              label: "Bairro"
                                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(VCol, {
                                          cols: "12",
                                          md: "6"
                                        }, {
                                          default: withCtx(() => [
                                            createVNode(VTextField, {
                                              modelValue: unref(selectedEndereco).codcep,
                                              "onUpdate:modelValue": ($event) => unref(selectedEndereco).codcep = $event,
                                              label: "CEP"
                                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(VCol, {
                                          cols: "12",
                                          md: "6"
                                        }, {
                                          default: withCtx(() => [
                                            createVNode(VAutocomplete, {
                                              modelValue: unref(selectedEndereco).cidade_id,
                                              "onUpdate:modelValue": ($event) => unref(selectedEndereco).cidade_id = $event,
                                              items: unref(enderecos).cidadesItems,
                                              label: "Cidade",
                                              "item-title": "descricao",
                                              "item-value": "id"
                                            }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
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
                                  createVNode(VRow, null, {
                                    default: withCtx(() => [
                                      createVNode(VCol, {
                                        cols: "12",
                                        md: "6"
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(VAutocomplete, {
                                            modelValue: unref(selectedEndereco).tabvalores_pais_id,
                                            "onUpdate:modelValue": ($event) => unref(selectedEndereco).tabvalores_pais_id = $event,
                                            items: unref(enderecos).paisItems,
                                            label: "Pa\xEDs",
                                            "item-title": "descricao",
                                            "item-value": "id"
                                          }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(VCol, {
                                        cols: "12",
                                        md: "6"
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(VTextField, {
                                            modelValue: unref(selectedEndereco).logradouro,
                                            "onUpdate:modelValue": ($event) => unref(selectedEndereco).logradouro = $event,
                                            label: "Logradouro"
                                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(VCol, {
                                        cols: "12",
                                        md: "6"
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(VTextField, {
                                            modelValue: unref(selectedEndereco).complemento,
                                            "onUpdate:modelValue": ($event) => unref(selectedEndereco).complemento = $event,
                                            label: "Complemento"
                                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(VCol, {
                                        cols: "12",
                                        md: "6"
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(VTextField, {
                                            modelValue: unref(selectedEndereco).numero,
                                            "onUpdate:modelValue": ($event) => unref(selectedEndereco).numero = $event,
                                            label: "N\xFAmero"
                                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(VCol, {
                                        cols: "12",
                                        md: "6"
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(VTextField, {
                                            modelValue: unref(selectedEndereco).bairro,
                                            "onUpdate:modelValue": ($event) => unref(selectedEndereco).bairro = $event,
                                            label: "Bairro"
                                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(VCol, {
                                        cols: "12",
                                        md: "6"
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(VTextField, {
                                            modelValue: unref(selectedEndereco).codcep,
                                            "onUpdate:modelValue": ($event) => unref(selectedEndereco).codcep = $event,
                                            label: "CEP"
                                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(VCol, {
                                        cols: "12",
                                        md: "6"
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(VAutocomplete, {
                                            modelValue: unref(selectedEndereco).cidade_id,
                                            "onUpdate:modelValue": ($event) => unref(selectedEndereco).cidade_id = $event,
                                            items: unref(enderecos).cidadesItems,
                                            label: "Cidade",
                                            "item-title": "descricao",
                                            "item-value": "id"
                                          }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
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
                          _push4(ssrRenderComponent(VCardActions, null, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(VSpacer, null, null, _parent5, _scopeId4));
                                _push5(ssrRenderComponent(VBtn, {
                                  color: "green",
                                  text: "",
                                  onClick: ($event) => isModalOpen.value = false
                                }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(`Cancelar`);
                                    } else {
                                      return [
                                        createTextVNode("Cancelar")
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent5, _scopeId4));
                                _push5(ssrRenderComponent(VBtn, {
                                  color: "green",
                                  text: "",
                                  onClick: ($event) => onUpdate(unref(selectedEndereco).id)
                                }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(`Salvar`);
                                    } else {
                                      return [
                                        createTextVNode("Salvar")
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(VSpacer),
                                  createVNode(VBtn, {
                                    color: "green",
                                    text: "",
                                    onClick: ($event) => isModalOpen.value = false
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode("Cancelar")
                                    ]),
                                    _: 1
                                  }, 8, ["onClick"]),
                                  createVNode(VBtn, {
                                    color: "green",
                                    text: "",
                                    onClick: ($event) => onUpdate(unref(selectedEndereco).id)
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
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(VCardTitle, { style: { "color": "green" } }, {
                              default: withCtx(() => [
                                createTextVNode("Atualizar Endere\xE7o")
                              ]),
                              _: 1
                            }),
                            createVNode(VCardText, null, {
                              default: withCtx(() => [
                                createVNode(VRow, null, {
                                  default: withCtx(() => [
                                    createVNode(VCol, {
                                      cols: "12",
                                      md: "6"
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(VAutocomplete, {
                                          modelValue: unref(selectedEndereco).tabvalores_pais_id,
                                          "onUpdate:modelValue": ($event) => unref(selectedEndereco).tabvalores_pais_id = $event,
                                          items: unref(enderecos).paisItems,
                                          label: "Pa\xEDs",
                                          "item-title": "descricao",
                                          "item-value": "id"
                                        }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(VCol, {
                                      cols: "12",
                                      md: "6"
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(VTextField, {
                                          modelValue: unref(selectedEndereco).logradouro,
                                          "onUpdate:modelValue": ($event) => unref(selectedEndereco).logradouro = $event,
                                          label: "Logradouro"
                                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(VCol, {
                                      cols: "12",
                                      md: "6"
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(VTextField, {
                                          modelValue: unref(selectedEndereco).complemento,
                                          "onUpdate:modelValue": ($event) => unref(selectedEndereco).complemento = $event,
                                          label: "Complemento"
                                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(VCol, {
                                      cols: "12",
                                      md: "6"
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(VTextField, {
                                          modelValue: unref(selectedEndereco).numero,
                                          "onUpdate:modelValue": ($event) => unref(selectedEndereco).numero = $event,
                                          label: "N\xFAmero"
                                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(VCol, {
                                      cols: "12",
                                      md: "6"
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(VTextField, {
                                          modelValue: unref(selectedEndereco).bairro,
                                          "onUpdate:modelValue": ($event) => unref(selectedEndereco).bairro = $event,
                                          label: "Bairro"
                                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(VCol, {
                                      cols: "12",
                                      md: "6"
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(VTextField, {
                                          modelValue: unref(selectedEndereco).codcep,
                                          "onUpdate:modelValue": ($event) => unref(selectedEndereco).codcep = $event,
                                          label: "CEP"
                                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(VCol, {
                                      cols: "12",
                                      md: "6"
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(VAutocomplete, {
                                          modelValue: unref(selectedEndereco).cidade_id,
                                          "onUpdate:modelValue": ($event) => unref(selectedEndereco).cidade_id = $event,
                                          items: unref(enderecos).cidadesItems,
                                          label: "Cidade",
                                          "item-title": "descricao",
                                          "item-value": "id"
                                        }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }),
                            createVNode(VCardActions, null, {
                              default: withCtx(() => [
                                createVNode(VSpacer),
                                createVNode(VBtn, {
                                  color: "green",
                                  text: "",
                                  onClick: ($event) => isModalOpen.value = false
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode("Cancelar")
                                  ]),
                                  _: 1
                                }, 8, ["onClick"]),
                                createVNode(VBtn, {
                                  color: "green",
                                  text: "",
                                  onClick: ($event) => onUpdate(unref(selectedEndereco).id)
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
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(VCard, null, {
                        default: withCtx(() => [
                          createVNode(VCardTitle, { style: { "color": "green" } }, {
                            default: withCtx(() => [
                              createTextVNode("Atualizar Endere\xE7o")
                            ]),
                            _: 1
                          }),
                          createVNode(VCardText, null, {
                            default: withCtx(() => [
                              createVNode(VRow, null, {
                                default: withCtx(() => [
                                  createVNode(VCol, {
                                    cols: "12",
                                    md: "6"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(VAutocomplete, {
                                        modelValue: unref(selectedEndereco).tabvalores_pais_id,
                                        "onUpdate:modelValue": ($event) => unref(selectedEndereco).tabvalores_pais_id = $event,
                                        items: unref(enderecos).paisItems,
                                        label: "Pa\xEDs",
                                        "item-title": "descricao",
                                        "item-value": "id"
                                      }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(VCol, {
                                    cols: "12",
                                    md: "6"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(VTextField, {
                                        modelValue: unref(selectedEndereco).logradouro,
                                        "onUpdate:modelValue": ($event) => unref(selectedEndereco).logradouro = $event,
                                        label: "Logradouro"
                                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(VCol, {
                                    cols: "12",
                                    md: "6"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(VTextField, {
                                        modelValue: unref(selectedEndereco).complemento,
                                        "onUpdate:modelValue": ($event) => unref(selectedEndereco).complemento = $event,
                                        label: "Complemento"
                                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(VCol, {
                                    cols: "12",
                                    md: "6"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(VTextField, {
                                        modelValue: unref(selectedEndereco).numero,
                                        "onUpdate:modelValue": ($event) => unref(selectedEndereco).numero = $event,
                                        label: "N\xFAmero"
                                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(VCol, {
                                    cols: "12",
                                    md: "6"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(VTextField, {
                                        modelValue: unref(selectedEndereco).bairro,
                                        "onUpdate:modelValue": ($event) => unref(selectedEndereco).bairro = $event,
                                        label: "Bairro"
                                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(VCol, {
                                    cols: "12",
                                    md: "6"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(VTextField, {
                                        modelValue: unref(selectedEndereco).codcep,
                                        "onUpdate:modelValue": ($event) => unref(selectedEndereco).codcep = $event,
                                        label: "CEP"
                                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(VCol, {
                                    cols: "12",
                                    md: "6"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(VAutocomplete, {
                                        modelValue: unref(selectedEndereco).cidade_id,
                                        "onUpdate:modelValue": ($event) => unref(selectedEndereco).cidade_id = $event,
                                        items: unref(enderecos).cidadesItems,
                                        label: "Cidade",
                                        "item-title": "descricao",
                                        "item-value": "id"
                                      }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(VCardActions, null, {
                            default: withCtx(() => [
                              createVNode(VSpacer),
                              createVNode(VBtn, {
                                color: "green",
                                text: "",
                                onClick: ($event) => isModalOpen.value = false
                              }, {
                                default: withCtx(() => [
                                  createTextVNode("Cancelar")
                                ]),
                                _: 1
                              }, 8, ["onClick"]),
                              createVNode(VBtn, {
                                color: "green",
                                text: "",
                                onClick: ($event) => onUpdate(unref(selectedEndereco).id)
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
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(VRow, null, {
                  default: withCtx(() => [
                    createVNode(VCol, { md: "2" }, {
                      default: withCtx(() => [
                        createVNode(VAutocomplete, {
                          modelValue: unref(state).tabvalores_pais_id,
                          "onUpdate:modelValue": ($event) => unref(state).tabvalores_pais_id = $event,
                          items: unref(enderecos).paisItems,
                          label: "Pa\xEDs",
                          "item-title": "descricao",
                          "item-value": "id"
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, { md: "2" }, {
                      default: withCtx(() => [
                        withDirectives(createVNode(VTextField, {
                          modelValue: unref(state).codcep,
                          "onUpdate:modelValue": ($event) => unref(state).codcep = $event,
                          "error-messages": unref(v$).codcep.$errors.map((e) => e.$message),
                          required: "",
                          onBlur: unref(v$).codcep.$touch,
                          onInput: unref(v$).codcep.$touch,
                          label: "CEP"
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages", "onBlur", "onInput"]), [
                          [_directive_mask, "########"]
                        ])
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, { md: "6" }, {
                      default: withCtx(() => [
                        createVNode(VTextField, {
                          modelValue: unref(state).logradouro,
                          "onUpdate:modelValue": ($event) => unref(state).logradouro = $event,
                          label: "Endere\xE7o",
                          "error-messages": unref(v$).logradouro.$errors.map((e) => e.$message),
                          required: "",
                          onBlur: unref(v$).logradouro.$touch,
                          onInput: unref(v$).logradouro.$touch
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages", "onBlur", "onInput"])
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, { md: "1" }, {
                      default: withCtx(() => [
                        createVNode(VTextField, {
                          modelValue: unref(state).numero,
                          "onUpdate:modelValue": ($event) => unref(state).numero = $event,
                          "error-messages": unref(v$).numero.$errors.map((e) => e.$message),
                          required: "",
                          onBlur: unref(v$).numero.$touch,
                          onInput: unref(v$).numero.$touch,
                          label: "N*"
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages", "onBlur", "onInput"])
                      ]),
                      _: 1
                    }),
                    createVNode("div", { class: "mt-3" }, [
                      createVNode("img", {
                        style: { "width": "40px", "height": "40px", "cursor": "pointer" },
                        src: _imports_0$3,
                        alt: "novo",
                        onClick: onSubmit
                      })
                    ]),
                    createVNode(VCol, { md: "5" }, {
                      default: withCtx(() => [
                        createVNode(VTextField, {
                          modelValue: unref(state).complemento,
                          "onUpdate:modelValue": ($event) => unref(state).complemento = $event,
                          label: "Complemento"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, { md: "3" }, {
                      default: withCtx(() => [
                        createVNode(VTextField, {
                          modelValue: unref(state).bairro,
                          "onUpdate:modelValue": ($event) => unref(state).bairro = $event,
                          "error-messages": unref(v$).bairro.$errors.map((e) => e.$message),
                          required: "",
                          onBlur: unref(v$).bairro.$touch,
                          onInput: unref(v$).bairro.$touch,
                          label: "Bairro"
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages", "onBlur", "onInput"])
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, { md: "3" }, {
                      default: withCtx(() => [
                        !unref(isForeign) ? (openBlock(), createBlock(VAutocomplete, {
                          key: 0,
                          modelValue: unref(state).cidade_id,
                          "onUpdate:modelValue": ($event) => unref(state).cidade_id = $event,
                          items: unref(enderecos).cidadesItems,
                          label: "Cidade",
                          "item-title": "descricao",
                          "item-value": "id"
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])) : (openBlock(), createBlock(VTextField, {
                          key: 1,
                          modelValue: unref(state).cidade_estrangeira,
                          "onUpdate:modelValue": ($event) => unref(state).cidade_estrangeira = $event,
                          label: "Cidade Estrangeira"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]))
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                createVNode(VDataTable, {
                  headers,
                  items: unref(enderecos).enderecosItems,
                  "item-key": "id"
                }, {
                  "item.actions": withCtx(({ item }) => [
                    createVNode(VRow, { style: { "display": "flex", "margin-top": "-8px", "gap": "10px" } }, {
                      default: withCtx(() => [
                        createVNode("div", {
                          onClick: ($event) => redirectToUpdate(item.id),
                          title: "Visualizar"
                        }, [
                          createVNode("img", {
                            style: { "width": "30px", "height": "30px", "cursor": "pointer" },
                            src: _imports_1,
                            alt: "Visualizar"
                          })
                        ], 8, ["onClick"]),
                        createVNode("div", {
                          onClick: ($event) => deleteEndereco(item),
                          title: "Visualizar"
                        }, [
                          item.excluido ? (openBlock(), createBlock("img", {
                            key: 0,
                            style: { "width": "30px", "height": "30px", "cursor": "pointer" },
                            src: _imports_2,
                            alt: "Visualizar",
                            title: "Reativar"
                          })) : (openBlock(), createBlock("img", {
                            key: 1,
                            src: _imports_3,
                            alt: "Excluir",
                            class: "trash-icon",
                            style: { "width": "30px", "height": "30px", "cursor": "pointer" },
                            title: "Excluir"
                          }))
                        ], 8, ["onClick"])
                      ]),
                      _: 2
                    }, 1024)
                  ]),
                  _: 1
                }, 8, ["items"]),
                createVNode(_component_NuxtLink, { to: "/pessoas/lista" }, {
                  default: withCtx(() => [
                    createVNode(VBtn, {
                      size: "large",
                      color: "red"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Voltar")
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                createVNode(VDialog, {
                  modelValue: unref(isModalOpen),
                  "onUpdate:modelValue": ($event) => isRef(isModalOpen) ? isModalOpen.value = $event : null,
                  "max-width": "600px"
                }, {
                  default: withCtx(() => [
                    createVNode(VCard, null, {
                      default: withCtx(() => [
                        createVNode(VCardTitle, { style: { "color": "green" } }, {
                          default: withCtx(() => [
                            createTextVNode("Atualizar Endere\xE7o")
                          ]),
                          _: 1
                        }),
                        createVNode(VCardText, null, {
                          default: withCtx(() => [
                            createVNode(VRow, null, {
                              default: withCtx(() => [
                                createVNode(VCol, {
                                  cols: "12",
                                  md: "6"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(VAutocomplete, {
                                      modelValue: unref(selectedEndereco).tabvalores_pais_id,
                                      "onUpdate:modelValue": ($event) => unref(selectedEndereco).tabvalores_pais_id = $event,
                                      items: unref(enderecos).paisItems,
                                      label: "Pa\xEDs",
                                      "item-title": "descricao",
                                      "item-value": "id"
                                    }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                                  ]),
                                  _: 1
                                }),
                                createVNode(VCol, {
                                  cols: "12",
                                  md: "6"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(VTextField, {
                                      modelValue: unref(selectedEndereco).logradouro,
                                      "onUpdate:modelValue": ($event) => unref(selectedEndereco).logradouro = $event,
                                      label: "Logradouro"
                                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                  ]),
                                  _: 1
                                }),
                                createVNode(VCol, {
                                  cols: "12",
                                  md: "6"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(VTextField, {
                                      modelValue: unref(selectedEndereco).complemento,
                                      "onUpdate:modelValue": ($event) => unref(selectedEndereco).complemento = $event,
                                      label: "Complemento"
                                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                  ]),
                                  _: 1
                                }),
                                createVNode(VCol, {
                                  cols: "12",
                                  md: "6"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(VTextField, {
                                      modelValue: unref(selectedEndereco).numero,
                                      "onUpdate:modelValue": ($event) => unref(selectedEndereco).numero = $event,
                                      label: "N\xFAmero"
                                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                  ]),
                                  _: 1
                                }),
                                createVNode(VCol, {
                                  cols: "12",
                                  md: "6"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(VTextField, {
                                      modelValue: unref(selectedEndereco).bairro,
                                      "onUpdate:modelValue": ($event) => unref(selectedEndereco).bairro = $event,
                                      label: "Bairro"
                                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                  ]),
                                  _: 1
                                }),
                                createVNode(VCol, {
                                  cols: "12",
                                  md: "6"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(VTextField, {
                                      modelValue: unref(selectedEndereco).codcep,
                                      "onUpdate:modelValue": ($event) => unref(selectedEndereco).codcep = $event,
                                      label: "CEP"
                                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                  ]),
                                  _: 1
                                }),
                                createVNode(VCol, {
                                  cols: "12",
                                  md: "6"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(VAutocomplete, {
                                      modelValue: unref(selectedEndereco).cidade_id,
                                      "onUpdate:modelValue": ($event) => unref(selectedEndereco).cidade_id = $event,
                                      items: unref(enderecos).cidadesItems,
                                      label: "Cidade",
                                      "item-title": "descricao",
                                      "item-value": "id"
                                    }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        createVNode(VCardActions, null, {
                          default: withCtx(() => [
                            createVNode(VSpacer),
                            createVNode(VBtn, {
                              color: "green",
                              text: "",
                              onClick: ($event) => isModalOpen.value = false
                            }, {
                              default: withCtx(() => [
                                createTextVNode("Cancelar")
                              ]),
                              _: 1
                            }, 8, ["onClick"]),
                            createVNode(VBtn, {
                              color: "green",
                              text: "",
                              onClick: ($event) => onUpdate(unref(selectedEndereco).id)
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
                  ]),
                  _: 1
                }, 8, ["modelValue", "onUpdate:modelValue"])
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
    };
  }
};
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Endereco.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const _sfc_main$5 = {
  __name: "Digital",
  __ssrInlineRender: true,
  setup(__props) {
    const leftFingers = ref(["E1", "E2", "E3", "E4", "E5"]);
    var colorLeftFingers = ref(["red", "red", "red", "red", "red"]);
    const rightFingers = ref(["D1", "D2", "D3", "D4", "D5"]);
    var colorRightFingers = ref(["red", "red", "red", "red", "red"]);
    const route = useRoute$1();
    const { $toast } = useNuxtApp();
    const config = useRuntimeConfig();
    const { id } = route.params;
    const pessoa_id = ref(useCookie("pessoa-id").value).value;
    const enviarDigital = `${config.public.biometria}/capture-finger`;
    const enviarDigitalBanco = `${config.public.managemant}/createPessoaBiometria`;
    `${config.public.managemant}/getPessoaBiometriaById`;
    async function captureBiometria(finger) {
      const { status, data: captureData } = await useFetch(enviarDigital, {
        method: "GET"
      }, "$b5yqRnLFV9");
      if (status.value === "success") {
        const hash = captureData.value.hash;
        const bodyDigital = {
          user_id: useCookie("user-data").value.usuario_id,
          pessoa_id: Number(id) || pessoa_id,
          dedo: finger,
          hash
        };
        const { status: status2 } = await useFetch(enviarDigitalBanco, {
          method: "POST",
          body: bodyDigital
        }, "$cWP9jlCX2Z");
        if (status2.value === "success") {
          $toast.success("Biometria enviada com sucesso!");
          updateFingerColor(finger, "green");
        } else {
          $toast.error("Falha ao enviar a biometria.");
        }
      } else {
        $toast.error("Erro ao Capturar biometria para o sistema.");
      }
    }
    function updateFingerColor(finger, color) {
      const leftIndex = leftFingers.value.findIndex((f) => f === finger);
      if (leftIndex !== -1) {
        colorLeftFingers.value[leftIndex] = color;
      } else {
        const rightIndex = rightFingers.value.findIndex((f) => f === finger);
        if (rightIndex !== -1) {
          colorRightFingers.value[rightIndex] = color;
        }
      }
    }
    function getFingerStyle(finger, side) {
      const baseTopLeft = {
        E1: { top: 82, left: -10 },
        E2: { top: 35, left: 4 },
        E3: { top: 0, left: 30 },
        E4: { top: 15, left: 75 },
        E5: { top: 50, left: 170 },
        D1: { top: 50, left: 210 },
        D2: { top: 18, left: 300 },
        D3: { top: 5, left: 350 },
        D4: { top: 35, left: 375 },
        D5: { top: 80, left: 390 }
      };
      const position = baseTopLeft[finger];
      let color = "red";
      if (side === "left") {
        const leftIndex = leftFingers.value.indexOf(finger);
        if (leftIndex !== -1) {
          color = colorLeftFingers.value[leftIndex];
        }
      } else if (side === "right") {
        const rightIndex = rightFingers.value.indexOf(finger);
        if (rightIndex !== -1) {
          color = colorRightFingers.value[rightIndex];
        }
      }
      return {
        backgroundColor: color,
        top: `${position.top}px`,
        left: `${position.left}px`
      };
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(VCol, mergeProps({
        style: { "margin-top": "20px" },
        cols: "auto",
        class: "biometria-container"
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="finger-container" data-v-e66c5c12${_scopeId}><!--[-->`);
            ssrRenderList(unref(leftFingers), (finger, index) => {
              _push2(`<div class="finger" style="${ssrRenderStyle(getFingerStyle(finger, "left"))}" data-v-e66c5c12${_scopeId}></div>`);
            });
            _push2(`<!--]--><!--[-->`);
            ssrRenderList(unref(rightFingers), (finger, index) => {
              _push2(`<div class="finger" style="${ssrRenderStyle(getFingerStyle(finger, "right"))}" data-v-e66c5c12${_scopeId}></div>`);
            });
            _push2(`<!--]--></div>`);
          } else {
            return [
              createVNode("div", { class: "finger-container" }, [
                (openBlock(true), createBlock(Fragment, null, renderList(unref(leftFingers), (finger, index) => {
                  return openBlock(), createBlock("div", {
                    key: index,
                    class: "finger",
                    style: getFingerStyle(finger, "left"),
                    onClick: ($event) => captureBiometria(finger)
                  }, null, 12, ["onClick"]);
                }), 128)),
                (openBlock(true), createBlock(Fragment, null, renderList(unref(rightFingers), (finger, index) => {
                  return openBlock(), createBlock("div", {
                    key: index,
                    class: "finger",
                    style: getFingerStyle(finger, "right"),
                    onClick: ($event) => captureBiometria(finger)
                  }, null, 12, ["onClick"]);
                }), 128))
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Biometria/Digital.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["__scopeId", "data-v-e66c5c12"]]);
const _imports_0$2 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAADsQAAA7EB9YPtSQAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAlmSURBVHic7Z1rjF1VFcd/zLSlUqYzLfJohxlKIBJTFAmmMcpjLNUAAY0JBIMxtISPimKCWm2V1wc/QpRHFCEYjSmvKtgXA8jDWkWKtFFMEGKlkKD2QaudaTvtjB/WvWFyufesfR57n33OXb9kfbkn9+z/3nudffZj7X3AMAzDMAzDMAzDMAzDMAzDMIw6c0zZAnIwH/g8cCHwceBE4ARghud0jwC7gf8ALwHPAY8DezynazQ4E3gAGAOmIrEx4H7gDI/57npmAKuBccqv8CRHWI3/Vqjr6AOeoPwKdrUngQEvJdGFzAVeofxKTWt/bmg3cjAD2ET5lZnVNmKvg1x8m/IrMa99s/BS6RJOBw5QfgXmtQPAomKLpju4C7cCfgm4FhgCegPo6gWGG2luddT4owC6asVcYD/JhToJfAfoKUkjjbRXNbQkad2PdQhTsRz9qVpVlrg2fA9d74rS1FWQdSQX5jbCNPeu9ALbSda8vjR1FWMecIjkwry+NHWduZ5kzYeR9QtD4TqqWZAD6I5rrwEHNpBciOvKk6ayHnsN5MKl+V9eljgHVlCx1itrPEA/cClwBfAxYLDxm28mgFOId+19PvAOMNNzOhPAv4G3gNeRhbINyHDTK8PIWrz2lPqyKjSh2mvAlx0Efgqc6iNTvcDtlL8WX4VOlNaJ9W1jwC0UOEyOZS0+uvdnB1xGAyFsIwXEJAwAf4kgM1PIO64qaCOZULadHFPQvYgXlZ2Jpl2ZNSMlcBXll1fT1pHxdXB7BOKbtp5qRTD3ENfDc3PaDAxTfofvKDLE+T4wO20GImA2UvCvI3kpsyzHkKG6Mw843nj6Wrzvsa/xHjNJH5Nwn+vN+9F7sUeBb1GtZrmu9AAr0VuZg8iITuWLyo2mkMo34mIler1d5XKjXyg32Yo9+THSA7xMct39rPVP7UKWz1USurNxs6rQB5yP5OujyLtzGDgOmeeYQAI39yL7/f4GvIb0bzYjHagqMAn8ENmi1olzXG6kxeIN55IZhkHgRuAFpIKz9p4PIZs/vwacFDQH2VhEcn72utxE60zEvNFhGTJt7WPYdRj4NdKaxMpM9M67ilYQMbIU2ELxld7JnkW2pcdI7vqrkgMsQDo2oSq+1R4CTvaQryHgEeR1vB9YC5zl+N+ucYBrgHcpr/Kbtgf4QoH5GkIOoGiXzpDD/2vvAMciPd2yK366TSKjo1kF5O+RhHQecvh/rR3gBKRnX3aFd7IngeNz5jFpFLbP4f+p6q/dhI5WyWVNAp0MjAIfyfDfw0gncRQZ5+9o2CHee2oXAIuBs4ElSMcyyxP9J+AyYFeG/4I4QKcp233oQR656y/GFmA+8FcHba32PDL9meWpnIcstoxmSPfFjGmCdPg63XeNw/9r9wqYjVRkmgpYi5wcVhSfIP36/iaytSBnIR2+1vvtwi3gs3YO8GMHTU17E/icRy3LgJ0p9NyRMZ0hpMO3r2FrcI/2rZUDfNlBz/Tm0Wm5MyfzgYcdNU1S7BDRhdo4wEJk7tqloH9A+M7pzY7a9uBnsqgTtXGAxxy0TAFfDaiplZsSdE23BwNqqoUDXOSgo/nkl81q3F4FoRaRauEAf3DQsYY4AlOOQc4K1vQ+E0hP5R1gxEHDm4Tp8LkyALyBrvtTAbRU3gFcniafQ72sXI6ue20AHZV2gFPQI3hCFGJWtFnDw8AHPWuotAN8wyH9Imf4iuYcdP1f8ayh0g7wrJL2857TLwJttfJpz+lX1gH6kSYyKe0qbBBdTnIexoEPeEy/sg7wWSXdQ+Rfaw/BHPQzji/2mH6q+ivzmNVWlijXtwD/CyEkJweQmIAkzgshxIWYHGCxcv2pICqK4ffKddcAT+/E5ACnK9dfDaKiGLYo180B2qDtX98RQkRB7FSuLwiiwoGYHECLddsRQkRB7FauR3N0fEwOMEe5Ph5ERTFoDhDNOkZMDjCpXK/SCSTaHrxoyj0aIcg4P4ljg6goBq2Jj2bLeUwOoMXRnxhERTFoWt8NosKBmBzgX8p1bZ4gJj6kXH8riAoHYnKAvyvXzw6iohg0rf8MosKBmBxAm+jRpopjYkS5vj2EiKzEvBg0z2P6RTEH/dP2n/GYfmVXA/uAI0ra13pMvyi+RLmrmpV1AND3AI56Tr8ItLCw5zynX2kHuNEh/ZgPaToX/SuiN3jWUGkHGEQPCt3oWUMetA9rHEECX31SaQcAOYpN07AsgI60uISFPxZAR+UdYKmDhp3E9fmYAWS1UtM9EkBL5R0A3M4BejSQFhceRdf7u0BaauEAFznomCLDlzA8cCtuWi8IpKcWDgByQoZLwd4UUFMrNyTomm6/DKipNg6wkPZn5bSz1YTfKXyLo7a9hA0Bq40DgJwG6lLIU8im0tzfyXNgALd3ftOcPtJQILVyAIB7HDQ17Q1kOOaLy4F/pNBzt0ctnaidA8wi/TFxozh+HMGR80j/9dSnKSeMrXYOANLsvuKgrdVeQPbqaQGn7TgOWdjJclDkVsK8jtqRqv6qdlTsJrI92WPIdq3NwB+RE0Z2N+woshJ5ErJhYzEyYfNJsm3i3Ibs/dMig32Ru/5ibAGaDBD3YdHPILucy6SWr4DpzALupfzKbrW7iCNyufYO0OQa3OcJfNou4GrPeU1D1zgAyGSR64yhD1tD2FNAXegqB2gygnTwQlX8ZsIc+ZaFrnSAJkuBX5HvW4GdbAKJVYj1a2FNutoBmiwEvg78lvwfjnwK+XBkbE19J1LVX5XmAbJyPPLBhyXAh4EzkbCs/ob1IAs2+4G3kenkV5GvfrxINY6lmU6q+usGB+g2UtVfu51Bddqm3W1odTPR+kM7B9CavGiONzHeh3bMzjutP7RzAO18m087yzFCs1S5/rbLTX5Oci9yK3FtKjWEHvQVU6cvl1yt3GQKWFmsdqMAVqHXm9NRu3OBg8qNjiJOYC1B+fQA30XfkjZOisOpXD/O/DKwAjgNGx2EZCawCLgO90CZn7S7Uacx/SDwGhIVY1SfceTYmvcdTdPb4Q//RdbdR/xpMgJyG/CbtH/qIX0gpFl8toHOD7pKP3KeTdmZMMtm2yjgWNo+3LZsm8Vl6ykwPrEX2YipHX5kVr4dQLbKeRmiDwL3oc8TmIW3cWSot7Bj7bUh69JuH3AJcAWyvj6EBEzYXEA49iLrNtuQfZEbqV7sgmEYhmEYhmEYhmEYhmEYhmEYnvk/IOetxTmdx/8AAAAASUVORK5CYII=";
const _sfc_main$4 = {
  __name: "ReconhecimentoFacial",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const video = ref(null);
    const devices = ref([]);
    const selectedDeviceId = ref("");
    const isDialogActiveBiometria = ref(false);
    const capturedPhoto = ref(null);
    const fotoRender = ref(null);
    const route = useRoute$1();
    const { id } = route.params;
    const zoomLevel = ref(1);
    const tokenCookie = useCookie("pessoa_token");
    const token = tokenCookie.value;
    const pessoaNome = useCookie("user-data").value;
    const nomePessoa = pessoaNome.nome;
    const config = useRuntimeConfig();
    const enviarFoto = `${config.public.managemant}/uploadPessoa`;
    const buscarPessoa = `${config.public.managemant}/getLinkTipo`;
    const { $toast } = useNuxtApp();
    const updateDevices = async () => {
      const mediaDevices = await (void 0).mediaDevices.enumerateDevices();
      devices.value = mediaDevices.filter((device) => device.kind === "videoinput").map((device) => ({
        deviceId: device.deviceId,
        label: device.label || `Camera ${devices.value.length + 1}`
      }));
    };
    const openDialog = async () => {
      isDialogActiveBiometria.value = true;
      try {
        await (void 0).mediaDevices.getUserMedia({ video: true });
        await updateDevices();
      } catch (error) {
        console.error("Erro ao acessar dispositivos de m\xEDdia:", error);
      }
    };
    const closeDialog = () => {
      isDialogActiveBiometria.value = false;
      const stream = video.value.srcObject;
      if (stream) {
        const tracks = stream.getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
    const startVideo = async () => {
      if (selectedDeviceId.value) {
        const stream = await (void 0).mediaDevices.getUserMedia({
          video: { deviceId: { exact: selectedDeviceId.value } }
        });
        video.value.srcObject = stream;
      }
    };
    const handleCapture = async () => {
      const canvas = (void 0).createElement("canvas");
      const context = canvas.getContext("2d");
      const width = video.value.videoWidth;
      const height = video.value.videoHeight;
      const scaledWidth = width * zoomLevel.value;
      const scaledHeight = height * zoomLevel.value;
      const offsetX = (width - scaledWidth) / 2;
      const offsetY = (height - scaledHeight) / 2;
      canvas.width = width;
      canvas.height = height;
      context.drawImage(video.value, offsetX, offsetY, scaledWidth, scaledHeight);
      canvas.toBlob(async (blob) => {
        const formData = new FormData();
        formData.append("file", blob, `${nomePessoa}.jpg`);
        formData.append("pessoa_token", token);
        formData.append("tipo", "foto");
        const { status } = await useFetch(enviarFoto, {
          method: "POST",
          body: formData
        }, "$fRRPU47ULS");
        if (status.value === "success") {
          $toast.success("Imagem enviada!");
          const photoUrl = URL.createObjectURL(blob);
          fotoRender.value = photoUrl;
          closeDialog();
        } else {
          $toast.error("Erro ao enviar imagem para o sistema.");
        }
      }, "image/jpeg");
    };
    const handleDelete = () => {
      capturedPhoto.value = null;
    };
    if (id) {
      const { data: imagemBiometria } = ([__temp, __restore] = withAsyncContext(() => useFetch(buscarPessoa, {
        method: "POST",
        body: { tipo: "foto", id }
      }, "$N16ZtKMkSh")), __temp = await __temp, __restore(), __temp);
      if (imagemBiometria.value !== null && imagemBiometria.value.link !== null) {
        fotoRender.value = `data:image/jpeg;base64,${imagemBiometria.value.link}`;
      }
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(VCol, mergeProps({ cols: "auto" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VDialog, {
              "max-width": "700",
              modelValue: unref(isDialogActiveBiometria),
              "onUpdate:modelValue": ($event) => isRef(isDialogActiveBiometria) ? isDialogActiveBiometria.value = $event : null
            }, {
              activator: withCtx(({ props: activatorProps }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VBtn, mergeProps(activatorProps, {
                    variant: "outlined",
                    style: { "width": "300px", "height": "300px" },
                    onClick: openDialog
                  }), {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        if (unref(fotoRender) === null) {
                          _push4(`<img${ssrRenderAttr("src", _imports_0$2)}${_scopeId3}>`);
                        } else {
                          _push4(`<!---->`);
                        }
                        if (unref(fotoRender) !== null) {
                          _push4(`<img${ssrRenderAttr("src", unref(fotoRender))} style="${ssrRenderStyle({ "width": "100%", "height": "100%", "object-fit": "cover" })}"${_scopeId3}>`);
                        } else {
                          _push4(`<!---->`);
                        }
                      } else {
                        return [
                          unref(fotoRender) === null ? (openBlock(), createBlock("img", {
                            key: 0,
                            src: _imports_0$2
                          })) : createCommentVNode("", true),
                          unref(fotoRender) !== null ? (openBlock(), createBlock("img", {
                            key: 1,
                            src: unref(fotoRender),
                            style: { "width": "100%", "height": "100%", "object-fit": "cover" }
                          }, null, 8, ["src"])) : createCommentVNode("", true)
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VBtn, mergeProps(activatorProps, {
                      variant: "outlined",
                      style: { "width": "300px", "height": "300px" },
                      onClick: openDialog
                    }), {
                      default: withCtx(() => [
                        unref(fotoRender) === null ? (openBlock(), createBlock("img", {
                          key: 0,
                          src: _imports_0$2
                        })) : createCommentVNode("", true),
                        unref(fotoRender) !== null ? (openBlock(), createBlock("img", {
                          key: 1,
                          src: unref(fotoRender),
                          style: { "width": "100%", "height": "100%", "object-fit": "cover" }
                        }, null, 8, ["src"])) : createCommentVNode("", true)
                      ]),
                      _: 2
                    }, 1040)
                  ];
                }
              }),
              default: withCtx(({ isActive }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VCard, { title: "Biometria" }, {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VRow, null, {
                          default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VCol, null, {
                                default: withCtx((_4, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(VContainer, null, {
                                      default: withCtx((_5, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(VSelect, {
                                            items: unref(devices),
                                            modelValue: unref(selectedDeviceId),
                                            "onUpdate:modelValue": ($event) => isRef(selectedDeviceId) ? selectedDeviceId.value = $event : null,
                                            "item-title": "label",
                                            "item-value": "deviceId",
                                            label: "Selecionar Webcam"
                                          }, null, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(VSelect, {
                                              items: unref(devices),
                                              modelValue: unref(selectedDeviceId),
                                              "onUpdate:modelValue": ($event) => isRef(selectedDeviceId) ? selectedDeviceId.value = $event : null,
                                              "item-title": "label",
                                              "item-value": "deviceId",
                                              label: "Selecionar Webcam"
                                            }, null, 8, ["items", "modelValue", "onUpdate:modelValue"])
                                          ];
                                        }
                                      }),
                                      _: 2
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(VContainer, null, {
                                        default: withCtx(() => [
                                          createVNode(VSelect, {
                                            items: unref(devices),
                                            modelValue: unref(selectedDeviceId),
                                            "onUpdate:modelValue": ($event) => isRef(selectedDeviceId) ? selectedDeviceId.value = $event : null,
                                            "item-title": "label",
                                            "item-value": "deviceId",
                                            label: "Selecionar Webcam"
                                          }, null, 8, ["items", "modelValue", "onUpdate:modelValue"])
                                        ]),
                                        _: 1
                                      })
                                    ];
                                  }
                                }),
                                _: 2
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(VCol, null, {
                                  default: withCtx(() => [
                                    createVNode(VContainer, null, {
                                      default: withCtx(() => [
                                        createVNode(VSelect, {
                                          items: unref(devices),
                                          modelValue: unref(selectedDeviceId),
                                          "onUpdate:modelValue": ($event) => isRef(selectedDeviceId) ? selectedDeviceId.value = $event : null,
                                          "item-title": "label",
                                          "item-value": "deviceId",
                                          label: "Selecionar Webcam"
                                        }, null, 8, ["items", "modelValue", "onUpdate:modelValue"])
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 2
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VRow, null, {
                          default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VCol, null, {
                                default: withCtx((_4, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(VBtn, {
                                      size: "large",
                                      class: "ml-5",
                                      onClick: startVideo
                                    }, {
                                      default: withCtx((_5, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`Exibir`);
                                        } else {
                                          return [
                                            createTextVNode("Exibir")
                                          ];
                                        }
                                      }),
                                      _: 2
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(VBtn, {
                                        size: "large",
                                        class: "ml-5",
                                        onClick: startVideo
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode("Exibir")
                                        ]),
                                        _: 1
                                      })
                                    ];
                                  }
                                }),
                                _: 2
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(VCol, null, {
                                  default: withCtx(() => [
                                    createVNode(VBtn, {
                                      size: "large",
                                      class: "ml-5",
                                      onClick: startVideo
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode("Exibir")
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 2
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VRow, null, {
                          default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VContainer, { style: { "overflow": "hidden" } }, {
                                default: withCtx((_4, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(VCol, null, {
                                      default: withCtx((_5, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`<video class="ml-3" width="640" height="480" autoplay style="${ssrRenderStyle({
                                            transform: `scale(${unref(zoomLevel)})`,
                                            transformOrigin: "center center"
                                          })}"${_scopeId6}></video>`);
                                        } else {
                                          return [
                                            createVNode("video", {
                                              class: "ml-3",
                                              ref_key: "video",
                                              ref: video,
                                              width: "640",
                                              height: "480",
                                              autoplay: "",
                                              style: {
                                                transform: `scale(${unref(zoomLevel)})`,
                                                transformOrigin: "center center"
                                              }
                                            }, null, 4)
                                          ];
                                        }
                                      }),
                                      _: 2
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(VCol, null, {
                                        default: withCtx(() => [
                                          createVNode("video", {
                                            class: "ml-3",
                                            ref_key: "video",
                                            ref: video,
                                            width: "640",
                                            height: "480",
                                            autoplay: "",
                                            style: {
                                              transform: `scale(${unref(zoomLevel)})`,
                                              transformOrigin: "center center"
                                            }
                                          }, null, 4)
                                        ]),
                                        _: 1
                                      })
                                    ];
                                  }
                                }),
                                _: 2
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(VContainer, { style: { "overflow": "hidden" } }, {
                                  default: withCtx(() => [
                                    createVNode(VCol, null, {
                                      default: withCtx(() => [
                                        createVNode("video", {
                                          class: "ml-3",
                                          ref_key: "video",
                                          ref: video,
                                          width: "640",
                                          height: "480",
                                          autoplay: "",
                                          style: {
                                            transform: `scale(${unref(zoomLevel)})`,
                                            transformOrigin: "center center"
                                          }
                                        }, null, 4)
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 2
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VContainer, null, {
                          default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VSlider, {
                                modelValue: unref(zoomLevel),
                                "onUpdate:modelValue": ($event) => isRef(zoomLevel) ? zoomLevel.value = $event : null,
                                min: 1,
                                max: 3,
                                step: "0.1",
                                label: "Zoom"
                              }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(VSlider, {
                                  modelValue: unref(zoomLevel),
                                  "onUpdate:modelValue": ($event) => isRef(zoomLevel) ? zoomLevel.value = $event : null,
                                  min: 1,
                                  max: 3,
                                  step: "0.1",
                                  label: "Zoom"
                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                              ];
                            }
                          }),
                          _: 2
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VRow, { class: "mt-10 mb-5 ml-5" }, {
                          default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VBtn, {
                                color: "red",
                                size: "large",
                                onClick: closeDialog
                              }, {
                                default: withCtx((_4, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Fechar`);
                                  } else {
                                    return [
                                      createTextVNode("Fechar")
                                    ];
                                  }
                                }),
                                _: 2
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(VBtn, {
                                color: "green",
                                size: "large",
                                class: "ml-5",
                                onClick: handleCapture
                              }, {
                                default: withCtx((_4, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Salvar`);
                                  } else {
                                    return [
                                      createTextVNode("Salvar")
                                    ];
                                  }
                                }),
                                _: 2
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(VBtn, {
                                  color: "red",
                                  size: "large",
                                  onClick: closeDialog
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode("Fechar")
                                  ]),
                                  _: 1
                                }),
                                createVNode(VBtn, {
                                  color: "green",
                                  size: "large",
                                  class: "ml-5",
                                  onClick: handleCapture
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode("Salvar")
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 2
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VRow, null, {
                            default: withCtx(() => [
                              createVNode(VCol, null, {
                                default: withCtx(() => [
                                  createVNode(VContainer, null, {
                                    default: withCtx(() => [
                                      createVNode(VSelect, {
                                        items: unref(devices),
                                        modelValue: unref(selectedDeviceId),
                                        "onUpdate:modelValue": ($event) => isRef(selectedDeviceId) ? selectedDeviceId.value = $event : null,
                                        "item-title": "label",
                                        "item-value": "deviceId",
                                        label: "Selecionar Webcam"
                                      }, null, 8, ["items", "modelValue", "onUpdate:modelValue"])
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(VRow, null, {
                            default: withCtx(() => [
                              createVNode(VCol, null, {
                                default: withCtx(() => [
                                  createVNode(VBtn, {
                                    size: "large",
                                    class: "ml-5",
                                    onClick: startVideo
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode("Exibir")
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(VRow, null, {
                            default: withCtx(() => [
                              createVNode(VContainer, { style: { "overflow": "hidden" } }, {
                                default: withCtx(() => [
                                  createVNode(VCol, null, {
                                    default: withCtx(() => [
                                      createVNode("video", {
                                        class: "ml-3",
                                        ref_key: "video",
                                        ref: video,
                                        width: "640",
                                        height: "480",
                                        autoplay: "",
                                        style: {
                                          transform: `scale(${unref(zoomLevel)})`,
                                          transformOrigin: "center center"
                                        }
                                      }, null, 4)
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(VContainer, null, {
                            default: withCtx(() => [
                              createVNode(VSlider, {
                                modelValue: unref(zoomLevel),
                                "onUpdate:modelValue": ($event) => isRef(zoomLevel) ? zoomLevel.value = $event : null,
                                min: 1,
                                max: 3,
                                step: "0.1",
                                label: "Zoom"
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            _: 1
                          }),
                          createVNode(VRow, { class: "mt-10 mb-5 ml-5" }, {
                            default: withCtx(() => [
                              createVNode(VBtn, {
                                color: "red",
                                size: "large",
                                onClick: closeDialog
                              }, {
                                default: withCtx(() => [
                                  createTextVNode("Fechar")
                                ]),
                                _: 1
                              }),
                              createVNode(VBtn, {
                                color: "green",
                                size: "large",
                                class: "ml-5",
                                onClick: handleCapture
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
                    _: 2
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VCard, { title: "Biometria" }, {
                      default: withCtx(() => [
                        createVNode(VRow, null, {
                          default: withCtx(() => [
                            createVNode(VCol, null, {
                              default: withCtx(() => [
                                createVNode(VContainer, null, {
                                  default: withCtx(() => [
                                    createVNode(VSelect, {
                                      items: unref(devices),
                                      modelValue: unref(selectedDeviceId),
                                      "onUpdate:modelValue": ($event) => isRef(selectedDeviceId) ? selectedDeviceId.value = $event : null,
                                      "item-title": "label",
                                      "item-value": "deviceId",
                                      label: "Selecionar Webcam"
                                    }, null, 8, ["items", "modelValue", "onUpdate:modelValue"])
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        createVNode(VRow, null, {
                          default: withCtx(() => [
                            createVNode(VCol, null, {
                              default: withCtx(() => [
                                createVNode(VBtn, {
                                  size: "large",
                                  class: "ml-5",
                                  onClick: startVideo
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode("Exibir")
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        createVNode(VRow, null, {
                          default: withCtx(() => [
                            createVNode(VContainer, { style: { "overflow": "hidden" } }, {
                              default: withCtx(() => [
                                createVNode(VCol, null, {
                                  default: withCtx(() => [
                                    createVNode("video", {
                                      class: "ml-3",
                                      ref_key: "video",
                                      ref: video,
                                      width: "640",
                                      height: "480",
                                      autoplay: "",
                                      style: {
                                        transform: `scale(${unref(zoomLevel)})`,
                                        transformOrigin: "center center"
                                      }
                                    }, null, 4)
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        createVNode(VContainer, null, {
                          default: withCtx(() => [
                            createVNode(VSlider, {
                              modelValue: unref(zoomLevel),
                              "onUpdate:modelValue": ($event) => isRef(zoomLevel) ? zoomLevel.value = $event : null,
                              min: 1,
                              max: 3,
                              step: "0.1",
                              label: "Zoom"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          _: 1
                        }),
                        createVNode(VRow, { class: "mt-10 mb-5 ml-5" }, {
                          default: withCtx(() => [
                            createVNode(VBtn, {
                              color: "red",
                              size: "large",
                              onClick: closeDialog
                            }, {
                              default: withCtx(() => [
                                createTextVNode("Fechar")
                              ]),
                              _: 1
                            }),
                            createVNode(VBtn, {
                              color: "green",
                              size: "large",
                              class: "ml-5",
                              onClick: handleCapture
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
            }, _parent2, _scopeId));
            _push2(`<img style="${ssrRenderStyle({ "width": "40px", "margin-left": "10px", "cursor": "pointer" })}"${ssrRenderAttr("src", _imports_3)} alt="Excluir"${_scopeId}>`);
          } else {
            return [
              createVNode(VDialog, {
                "max-width": "700",
                modelValue: unref(isDialogActiveBiometria),
                "onUpdate:modelValue": ($event) => isRef(isDialogActiveBiometria) ? isDialogActiveBiometria.value = $event : null
              }, {
                activator: withCtx(({ props: activatorProps }) => [
                  createVNode(VBtn, mergeProps(activatorProps, {
                    variant: "outlined",
                    style: { "width": "300px", "height": "300px" },
                    onClick: openDialog
                  }), {
                    default: withCtx(() => [
                      unref(fotoRender) === null ? (openBlock(), createBlock("img", {
                        key: 0,
                        src: _imports_0$2
                      })) : createCommentVNode("", true),
                      unref(fotoRender) !== null ? (openBlock(), createBlock("img", {
                        key: 1,
                        src: unref(fotoRender),
                        style: { "width": "100%", "height": "100%", "object-fit": "cover" }
                      }, null, 8, ["src"])) : createCommentVNode("", true)
                    ]),
                    _: 2
                  }, 1040)
                ]),
                default: withCtx(({ isActive }) => [
                  createVNode(VCard, { title: "Biometria" }, {
                    default: withCtx(() => [
                      createVNode(VRow, null, {
                        default: withCtx(() => [
                          createVNode(VCol, null, {
                            default: withCtx(() => [
                              createVNode(VContainer, null, {
                                default: withCtx(() => [
                                  createVNode(VSelect, {
                                    items: unref(devices),
                                    modelValue: unref(selectedDeviceId),
                                    "onUpdate:modelValue": ($event) => isRef(selectedDeviceId) ? selectedDeviceId.value = $event : null,
                                    "item-title": "label",
                                    "item-value": "deviceId",
                                    label: "Selecionar Webcam"
                                  }, null, 8, ["items", "modelValue", "onUpdate:modelValue"])
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(VRow, null, {
                        default: withCtx(() => [
                          createVNode(VCol, null, {
                            default: withCtx(() => [
                              createVNode(VBtn, {
                                size: "large",
                                class: "ml-5",
                                onClick: startVideo
                              }, {
                                default: withCtx(() => [
                                  createTextVNode("Exibir")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(VRow, null, {
                        default: withCtx(() => [
                          createVNode(VContainer, { style: { "overflow": "hidden" } }, {
                            default: withCtx(() => [
                              createVNode(VCol, null, {
                                default: withCtx(() => [
                                  createVNode("video", {
                                    class: "ml-3",
                                    ref_key: "video",
                                    ref: video,
                                    width: "640",
                                    height: "480",
                                    autoplay: "",
                                    style: {
                                      transform: `scale(${unref(zoomLevel)})`,
                                      transformOrigin: "center center"
                                    }
                                  }, null, 4)
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(VContainer, null, {
                        default: withCtx(() => [
                          createVNode(VSlider, {
                            modelValue: unref(zoomLevel),
                            "onUpdate:modelValue": ($event) => isRef(zoomLevel) ? zoomLevel.value = $event : null,
                            min: 1,
                            max: 3,
                            step: "0.1",
                            label: "Zoom"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        _: 1
                      }),
                      createVNode(VRow, { class: "mt-10 mb-5 ml-5" }, {
                        default: withCtx(() => [
                          createVNode(VBtn, {
                            color: "red",
                            size: "large",
                            onClick: closeDialog
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Fechar")
                            ]),
                            _: 1
                          }),
                          createVNode(VBtn, {
                            color: "green",
                            size: "large",
                            class: "ml-5",
                            onClick: handleCapture
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
                ]),
                _: 1
              }, 8, ["modelValue", "onUpdate:modelValue"]),
              createVNode("img", {
                onClick: handleDelete,
                style: { "width": "40px", "margin-left": "10px", "cursor": "pointer" },
                src: _imports_3,
                alt: "Excluir"
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Biometria/ReconhecimentoFacial.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const _imports_0$1 = "" + buildAssetsURL("escanearFicha.CgD8l9Wn.png");
const _sfc_main$3 = {
  __name: "Scanner",
  __ssrInlineRender: true,
  setup(__props) {
    const config = useRuntimeConfig();
    useNuxtApp();
    `${config.public.envioDoc}`;
    `${config.public.biometria}/run-scanner`;
    const tokenCookie = useCookie("pessoa_token");
    tokenCookie.value;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)}><img${ssrRenderAttr("src", _imports_0$1)} style="${ssrRenderStyle({ "width": "280px", "height": "120px", "cursor": "pointer", "margin-top": "30px" })}"></div>`);
    };
  }
};
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Biometria/Scanner.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _imports_0 = "" + buildAssetsURL("imprimirFicha.BlhLZ85F.png");
const _sfc_main$2 = {
  __name: "Impressao",
  __ssrInlineRender: true,
  setup(__props) {
    const printHtml = ref("");
    const config = useRuntimeConfig();
    const impressao = `${config.public.managemant}/gerarRelatorio`;
    const consultaFicha = async () => {
      const response = await useFetch(impressao, {
        method: "POST",
        body: {
          consulta: "FICHA ASSINATURA",
          pessoa_token: useCookie("pessoa_token").value
        }
      }, "$LOyFO5WGQE");
      printHtml.value = response.data.value;
    };
    const printContent = async () => {
      await consultaFicha();
      const iframe = (void 0).createElement("iframe");
      iframe.style.position = "absolute";
      iframe.style.width = "0px";
      iframe.style.height = "0px";
      iframe.style.border = "none";
      (void 0).body.appendChild(iframe);
      const doc = iframe.contentWindow.document;
      doc.open();
      doc.write(printHtml.value);
      doc.close();
      iframe.contentWindow.focus();
      iframe.contentWindow.print();
      (void 0).body.removeChild(iframe);
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_BiometriaScanner = _sfc_main$3;
      _push(ssrRenderComponent(VCol, mergeProps({ cols: "auto" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div style="${ssrRenderStyle({ "display": "flex", "flex-direction": "column" })}"${_scopeId}><img${ssrRenderAttr("src", _imports_0)} style="${ssrRenderStyle({ "width": "280px", "height": "120px", "cursor": "pointer" })}"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_BiometriaScanner, null, null, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { style: { "display": "flex", "flex-direction": "column" } }, [
                createVNode("img", {
                  onClick: ($event) => printContent(),
                  src: _imports_0,
                  style: { "width": "280px", "height": "120px", "cursor": "pointer" }
                }, null, 8, ["onClick"]),
                createVNode(_component_BiometriaScanner)
              ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Biometria/Impressao.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = {};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs) {
  const _component_BiometriaDigital = __nuxt_component_0;
  const _component_BiometriaReconhecimentoFacial = _sfc_main$4;
  const _component_BiometriaImpressao = _sfc_main$2;
  const _component_NuxtLink = __nuxt_component_0$1;
  _push(`<!--[-->`);
  _push(ssrRenderComponent(VRow, { class: "d-flex align-items-center justify-space-between" }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_BiometriaDigital, null, null, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_BiometriaReconhecimentoFacial, null, null, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_BiometriaImpressao, null, null, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_BiometriaDigital),
          createVNode(_component_BiometriaReconhecimentoFacial),
          createVNode(_component_BiometriaImpressao)
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_NuxtLink, { to: "/pessoas/lista" }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(VBtn, {
          class: "mt-10",
          size: "large",
          color: "red"
        }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`Voltar`);
            } else {
              return [
                createTextVNode("Voltar")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(VBtn, {
            class: "mt-10",
            size: "large",
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
  }, _parent));
  _push(`<!--]-->`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Biometria/Index.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_3 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender$1]]);
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1>Restri\xE7\xF5es</h1></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Restricoes.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_4 = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { _sfc_main$7 as _, _sfc_main$6 as a, __nuxt_component_3 as b, __nuxt_component_4 as c };
//# sourceMappingURL=Restricoes-47vjpyig.mjs.map
