import { inject, computed, createVNode, withDirectives, resolveDirective, vShow, ref, mergeProps, Fragment, toRef, shallowRef, provide, useSSRContext, watch, unref, isRef, withCtx, createTextVNode, openBlock, createBlock, createCommentVNode } from 'vue';
import { ssrRenderComponent, ssrRenderAttr, ssrRenderStyle } from 'vue/server-renderer';
import * as UTIF from 'utif';
import { p as propsFactory, ab as makeRoundedProps, a9 as makeElevationProps, m as makeComponentProps, k as genericComponent, S as Ripple, l as useRtl, ag as useElevation, D as useTextColor, o as useRender, at as convertToUnit, b4 as VScaleTransition, ah as useRounded, X as useBackgroundColor, b5 as makeFocusProps, b6 as makeVInputProps, C as useProxiedModel, b7 as useFocus, b8 as VInput, U as VLabel, b3 as getDecimals, aM as createRange, _ as _export_sfc, an as clamp, e as useCookie, G as VIcon, f as VBtn, aN as keyValues, c as useRuntimeConfig, b1 as VProgressCircular } from './server.mjs';
import { u as useFetch } from './fetch-pt4nsUe7.mjs';
import { V as VDialog } from './VDialog-C710R8ST.mjs';
import { V as VCard, a as VCardTitle, c as VCardActions } from './VCard-BqP110Fm.mjs';
import { V as VContainer } from './VContainer-DT30lSDe.mjs';
import { V as VRow } from './VRow-DlYJpeem.mjs';
import { V as VCol } from './VCol-HDwo5SVF.mjs';

const _sfc_main$1 = {
  __name: "TiffViewer",
  __ssrInlineRender: true,
  props: {
    tiffUrl: String,
    isModal: {
      type: Boolean,
      default: false
    },
    zoomLevel: {
      type: Number,
      default: 1
    },
    rotationDegree: {
      type: Number,
      default: 0
    },
    translateX: { type: Number, default: 0 }
  },
  emits: ["error"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const tiffCanvas = ref(null);
    const tiffError = ref(false);
    const loading = ref(false);
    const emit = __emit;
    const canvasStyle = computed(() => ({
      width: props.isModal ? "100%" : `${250 * props.zoomLevel}px`,
      height: props.isModal ? "100%" : `${250 * props.zoomLevel}px`,
      transform: `scale(${props.zoomLevel}) rotate(${props.rotationDegree}deg)  translateX(${props.translateX}px)`,
      objectFit: "contain",
      transformOrigin: "left"
    }));
    const renderTiff = async () => {
      if (!props.tiffUrl) return;
      loading.value = true;
      try {
        const response = await fetch(props.tiffUrl);
        const buffer = await response.arrayBuffer();
        const ifds = UTIF.decode(buffer);
        UTIF.decodeImage(buffer, ifds[0]);
        const rgba = UTIF.toRGBA8(ifds[0]);
        if (tiffCanvas.value) {
          const canvas = tiffCanvas.value;
          const ctx = canvas.getContext("2d");
          canvas.width = ifds[0].width;
          canvas.height = ifds[0].height;
          const imageData = new ImageData(
            new Uint8ClampedArray(rgba),
            ifds[0].width,
            ifds[0].height
          );
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.save();
          ctx.translate(canvas.width / 2, canvas.height / 2);
          ctx.rotate(props.rotationDegree * Math.PI / 180);
          ctx.drawImage(canvas, -canvas.width / 2, -canvas.height / 2);
          ctx.restore();
          ctx.putImageData(imageData, 0, 0);
        }
        loading.value = false;
      } catch (error) {
        loading.value = false;
        tiffError.value = true;
        emit("error");
        console.error("Erro ao carregar TIFF:", error);
      }
    };
    watch(() => [props.tiffUrl, props.rotationDegree], renderTiff, {
      immediate: true
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      if (unref(loading)) {
        _push(ssrRenderComponent(VProgressCircular, {
          style: { "margin-left": "200px" },
          class: "loading-spinner",
          indeterminate: "",
          size: "64"
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (!unref(tiffError)) {
        _push(`<canvas style="${ssrRenderStyle(unref(canvasStyle))}"></canvas>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/TiffViewer.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : undefined;
};
const VSliderSymbol = Symbol.for("vuetify:v-slider");
function getOffset(e, el, direction) {
  const vertical = direction === "vertical";
  const rect = el.getBoundingClientRect();
  const touch = "touches" in e ? e.touches[0] : e;
  return vertical ? touch.clientY - (rect.top + rect.height / 2) : touch.clientX - (rect.left + rect.width / 2);
}
function getPosition(e, position) {
  if ("touches" in e && e.touches.length) return e.touches[0][position];
  else if ("changedTouches" in e && e.changedTouches.length) return e.changedTouches[0][position];
  else return e[position];
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
    default: undefined,
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
    if (step.value <= 0) return value;
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
    return props.error || props.disabled ? undefined : (_a = props.thumbColor) != null ? _a : props.color;
  });
  const trackColor = computed(() => {
    var _a;
    return props.error || props.disabled ? undefined : (_a = props.trackColor) != null ? _a : props.color;
  });
  const trackFillColor = computed(() => {
    var _a;
    return props.error || props.disabled ? undefined : (_a = props.trackFillColor) != null ? _a : props.color;
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
    } = (_a = trackContainerRef.value) == null ? undefined : _a.$el.getBoundingClientRect();
    const clickOffset = getPosition(e, position2);
    let clickPos = Math.min(Math.max((clickOffset - trackStart - startOffset.value) / trackLength, 0), 1) || 0;
    if (vertical2 ? indexFromEnd.value : indexFromEnd.value !== isRtl.value) clickPos = 1 - clickPos;
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
    if (!activeThumbRef.value) return;
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
    (undefined).removeEventListener("mousemove", onMouseMove, moveListenerOptions);
    (undefined).removeEventListener("mouseup", onSliderMouseUp);
  }
  function onSliderTouchend(e) {
    var _a;
    handleStop(e);
    (undefined).removeEventListener("touchmove", onMouseMove, moveListenerOptions);
    (_a = e.target) == null ? undefined : _a.removeEventListener("touchend", onSliderTouchend);
  }
  function onSliderTouchstart(e) {
    var _a;
    handleStart(e);
    (undefined).addEventListener("touchmove", onMouseMove, moveListenerOptions);
    (_a = e.target) == null ? undefined : _a.addEventListener("touchend", onSliderTouchend, {
      passive: false
    });
  }
  function onSliderMousedown(e) {
    e.preventDefault();
    handleStart(e);
    (undefined).addEventListener("mousemove", onMouseMove, moveListenerOptions);
    (undefined).addEventListener("mouseup", onSliderMouseUp, {
      passive: false
    });
  }
  const position = (val) => {
    const percentage = (val - min.value) / (max.value - min.value) * 100;
    return clamp(isNaN(percentage) ? 0 : percentage, 0, 100);
  };
  const showTicks = toRef(props, "showTicks");
  const parsedTicks = computed(() => {
    if (!showTicks.value) return [];
    if (!props.ticks) {
      return numTicks.value !== Infinity ? createRange(numTicks.value + 1).map((t) => {
        const value = min.value + t * step.value;
        return {
          value,
          position: position(value)
        };
      }) : [];
    }
    if (Array.isArray(props.ticks)) return props.ticks.map((t) => ({
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
    if (!slider) throw new Error("[Vuetify] v-slider-thumb must be used inside v-slider or v-range-slider");
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
    const elevationProps = computed(() => !disabled.value ? elevation.value : undefined);
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
      if (step.value) return [1, 2, 3];
      else return [1, 5, 10];
    });
    function parseKeydown(e, value) {
      if (!relevantKeys.includes(e.key)) return;
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
        "onKeydown": !readonly.value ? onKeydown : undefined
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
          }, [createVNode("div", null, [(_a2 = (_a = slots["thumb-label"]) == null ? undefined : _a.call(slots, {
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
    if (!slider) throw new Error("[Vuetify] v-slider-track must be inside v-slider or v-range-slider");
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
      if (!showTicks.value) return [];
      const ticks = vertical.value ? parsedTicks.value.slice().reverse() : parsedTicks.value;
      return ticks.map((tick, index) => {
        var _a2;
        var _a;
        const directionValue = tick.value !== min.value && tick.value !== max.value ? convertToUnit(tick.position, "%") : undefined;
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
        }, [(_a2 = (_a = slots["tick-label"]) == null ? undefined : _a.call(slots, {
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
    const model = useProxiedModel(props, "modelValue", undefined, (value) => {
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
        return (_a = thumbContainerRef.value) == null ? undefined : _a.$el;
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
          return createVNode(Fragment, null, [(_a2 = (_a = slots.label) == null ? undefined : _a.call(slots, slotProps)) != null ? _a2 : props.label ? createVNode(VLabel, {
            "id": slotProps.id.value,
            "class": "v-slider__label",
            "text": props.label
          }, null) : undefined, (_b = slots.prepend) == null ? undefined : _b.call(slots, slotProps)]);
        } : undefined,
        default: (_ref4) => {
          let {
            id,
            messagesId
          } = _ref4;
          return createVNode("div", {
            "class": "v-slider__container",
            "onMousedown": !readonly.value ? onSliderMousedown : undefined,
            "onTouchstartPassive": !readonly.value ? onSliderTouchstart : undefined
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
const _sfc_main = {
  __name: "FichaCard",
  __ssrInlineRender: true,
  props: {
    show: Boolean,
    item: Object,
    isView: {
      type: Boolean,
      default: false
    },
    linkView: String
  },
  emits: ["close", "confirmar"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const config = useRuntimeConfig();
    const buscarPessoa = `${config.public.managemant}/getLinkTipo`;
    const baixarDocumento = `${config.public.managemant}/download`;
    const hasTiff = computed(() => !!fichaRender.value);
    const hasFoto = computed(() => !!fotoRender.value);
    const isVisible = ref(props.show);
    const fichaRender = ref(null);
    const fotoRender = ref(null);
    const zoomLevel = ref(0.8);
    const rotationDegree = ref(0);
    const emit = __emit;
    const translateX = computed(() => {
      return (zoomLevel.value - 1) * -50;
    });
    watch(
      () => props.show,
      async (newVal) => {
        isVisible.value = newVal;
        fichaRender.value = null;
        await beforeOpenFicha();
      },
      { immediate: true }
    );
    watch(
      () => props.linkView,
      (newLinkView) => {
        if (props.isView) {
          if (newLinkView && newLinkView.includes(".tr7")) {
            fichaRender.value = newLinkView;
            fotoRender.value = null;
          } else {
            fichaRender.value = null;
            fotoRender.value = newLinkView;
          }
        }
      },
      { immediate: true }
    );
    const confirmarRecebimento = () => {
      emit("confirmar");
      closeModal();
    };
    const beforeOpenFicha = async () => {
      var _a;
      if (props.isView) {
        return;
      }
      if (!props.item.id) return;
      const { data: imagemBiometria } = await useFetch(buscarPessoa, {
        method: "POST",
        body: { tipo: "ficha", id: props.item.id }
      }, "$4omB3S9Tg3");
      if (!((_a = imagemBiometria.value) == null ? undefined : _a.link)) return;
      const { data: link } = await useFetch(baixarDocumento, {
        method: "POST",
        body: {
          bucket: useCookie("user-data").value.cartorio_token,
          path: imagemBiometria.value.link
        }
      }, "$yanMHqBuqW");
      const linkMinio = imagemBiometria.value.link;
      const linkPayload = link.value;
      if (/\.(tr7|tiff)$/i.test(linkMinio)) {
        fichaRender.value = linkPayload;
      } else {
        fotoRender.value = linkPayload;
      }
    };
    const closeModal = () => {
      isVisible.value = false;
      fichaRender.value = null;
      fotoRender.value = null;
      zoomLevel.value = 0.8;
      rotationDegree.value = 0;
      emit("close");
    };
    const rotateImage = () => {
      rotationDegree.value += 90;
      if (rotationDegree.value >= 360) {
        rotationDegree.value = 0;
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_TiffViewer = _sfc_main$1;
      _push(ssrRenderComponent(VDialog, mergeProps({
        persistent: "",
        modelValue: unref(isVisible),
        "onUpdate:modelValue": ($event) => isRef(isVisible) ? isVisible.value = $event : null,
        "max-width": "850"
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
                  _push3(ssrRenderComponent(VContainer, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VRow, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VCol, { cols: "10" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(VSlider, {
                                      modelValue: unref(zoomLevel),
                                      "onUpdate:modelValue": ($event) => isRef(zoomLevel) ? zoomLevel.value = $event : null,
                                      min: "0.5",
                                      max: "1.1",
                                      step: "0.1",
                                      label: "Zoom",
                                      class: "mt-3"
                                    }, null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(VSlider, {
                                        modelValue: unref(zoomLevel),
                                        "onUpdate:modelValue": ($event) => isRef(zoomLevel) ? zoomLevel.value = $event : null,
                                        min: "0.5",
                                        max: "1.1",
                                        step: "0.1",
                                        label: "Zoom",
                                        class: "mt-3"
                                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(VCol, { cols: "2" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(VIcon, {
                                      class: "ml-6",
                                      size: "50px",
                                      onClick: rotateImage
                                    }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`mdi-rotate-right`);
                                        } else {
                                          return [
                                            createTextVNode("mdi-rotate-right")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(VIcon, {
                                        class: "ml-6",
                                        size: "50px",
                                        onClick: rotateImage
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode("mdi-rotate-right")
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
                                createVNode(VCol, { cols: "10" }, {
                                  default: withCtx(() => [
                                    createVNode(VSlider, {
                                      modelValue: unref(zoomLevel),
                                      "onUpdate:modelValue": ($event) => isRef(zoomLevel) ? zoomLevel.value = $event : null,
                                      min: "0.5",
                                      max: "1.1",
                                      step: "0.1",
                                      label: "Zoom",
                                      class: "mt-3"
                                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                  ]),
                                  _: 1
                                }),
                                createVNode(VCol, { cols: "2" }, {
                                  default: withCtx(() => [
                                    createVNode(VIcon, {
                                      class: "ml-6",
                                      size: "50px",
                                      onClick: rotateImage
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode("mdi-rotate-right")
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
                      } else {
                        return [
                          createVNode(VRow, null, {
                            default: withCtx(() => [
                              createVNode(VCol, { cols: "10" }, {
                                default: withCtx(() => [
                                  createVNode(VSlider, {
                                    modelValue: unref(zoomLevel),
                                    "onUpdate:modelValue": ($event) => isRef(zoomLevel) ? zoomLevel.value = $event : null,
                                    min: "0.5",
                                    max: "1.1",
                                    step: "0.1",
                                    label: "Zoom",
                                    class: "mt-3"
                                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                ]),
                                _: 1
                              }),
                              createVNode(VCol, { cols: "2" }, {
                                default: withCtx(() => [
                                  createVNode(VIcon, {
                                    class: "ml-6",
                                    size: "50px",
                                    onClick: rotateImage
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode("mdi-rotate-right")
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
                  }, _parent3, _scopeId2));
                  _push3(`<div class="d-flex justify-center align-center" data-v-efe33cd3${_scopeId2}>`);
                  if (unref(hasTiff)) {
                    _push3(`<div class="ml-5 mt-15" data-v-efe33cd3${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_TiffViewer, {
                      "tiff-url": unref(fichaRender),
                      "is-modal": true,
                      "zoom-level": unref(zoomLevel),
                      "rotation-degree": unref(rotationDegree),
                      "translate-x": unref(translateX)
                    }, null, _parent3, _scopeId2));
                    _push3(`</div>`);
                  } else if (unref(hasFoto)) {
                    _push3(`<img${ssrRenderAttr("src", unref(fotoRender))} style="${ssrRenderStyle({
                      width: "70%",
                      height: "70%",
                      transform: `scale(${unref(zoomLevel)}) rotate(${unref(rotationDegree)}deg)`
                    })}" data-v-efe33cd3${_scopeId2}>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  if (!unref(fotoRender) && !unref(fichaRender)) {
                    _push3(`<div data-v-efe33cd3${_scopeId2}><h3 class="mb-5" data-v-efe33cd3${_scopeId2}> Este usuario n\xE3o possui ficha de firma cadastrada. </h3></div>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`</div>`);
                  _push3(ssrRenderComponent(VCardActions, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        if (!props.isView) {
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
                        } else {
                          _push4(`<!---->`);
                        }
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
                          !props.isView ? (openBlock(), createBlock(VBtn, {
                            key: 0,
                            style: { "background-color": "#429946", "color": "white" },
                            onClick: confirmarRecebimento
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Reconhecer")
                            ]),
                            _: 1
                          })) : createCommentVNode("", true),
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
                    createVNode(VContainer, null, {
                      default: withCtx(() => [
                        createVNode(VRow, null, {
                          default: withCtx(() => [
                            createVNode(VCol, { cols: "10" }, {
                              default: withCtx(() => [
                                createVNode(VSlider, {
                                  modelValue: unref(zoomLevel),
                                  "onUpdate:modelValue": ($event) => isRef(zoomLevel) ? zoomLevel.value = $event : null,
                                  min: "0.5",
                                  max: "1.1",
                                  step: "0.1",
                                  label: "Zoom",
                                  class: "mt-3"
                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                              ]),
                              _: 1
                            }),
                            createVNode(VCol, { cols: "2" }, {
                              default: withCtx(() => [
                                createVNode(VIcon, {
                                  class: "ml-6",
                                  size: "50px",
                                  onClick: rotateImage
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode("mdi-rotate-right")
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
                    }),
                    createVNode("div", { class: "d-flex justify-center align-center" }, [
                      unref(hasTiff) ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "ml-5 mt-15"
                      }, [
                        createVNode(_component_TiffViewer, {
                          "tiff-url": unref(fichaRender),
                          "is-modal": true,
                          "zoom-level": unref(zoomLevel),
                          "rotation-degree": unref(rotationDegree),
                          "translate-x": unref(translateX)
                        }, null, 8, ["tiff-url", "zoom-level", "rotation-degree", "translate-x"])
                      ])) : unref(hasFoto) ? (openBlock(), createBlock("img", {
                        key: 1,
                        src: unref(fotoRender),
                        style: {
                          width: "70%",
                          height: "70%",
                          transform: `scale(${unref(zoomLevel)}) rotate(${unref(rotationDegree)}deg)`
                        }
                      }, null, 12, ["src"])) : createCommentVNode("", true),
                      !unref(fotoRender) && !unref(fichaRender) ? (openBlock(), createBlock("div", { key: 2 }, [
                        createVNode("h3", { class: "mb-5" }, " Este usuario n\xE3o possui ficha de firma cadastrada. ")
                      ])) : createCommentVNode("", true)
                    ]),
                    createVNode(VCardActions, null, {
                      default: withCtx(() => [
                        !props.isView ? (openBlock(), createBlock(VBtn, {
                          key: 0,
                          style: { "background-color": "#429946", "color": "white" },
                          onClick: confirmarRecebimento
                        }, {
                          default: withCtx(() => [
                            createTextVNode("Reconhecer")
                          ]),
                          _: 1
                        })) : createCommentVNode("", true),
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
                  createVNode(VContainer, null, {
                    default: withCtx(() => [
                      createVNode(VRow, null, {
                        default: withCtx(() => [
                          createVNode(VCol, { cols: "10" }, {
                            default: withCtx(() => [
                              createVNode(VSlider, {
                                modelValue: unref(zoomLevel),
                                "onUpdate:modelValue": ($event) => isRef(zoomLevel) ? zoomLevel.value = $event : null,
                                min: "0.5",
                                max: "1.1",
                                step: "0.1",
                                label: "Zoom",
                                class: "mt-3"
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            _: 1
                          }),
                          createVNode(VCol, { cols: "2" }, {
                            default: withCtx(() => [
                              createVNode(VIcon, {
                                class: "ml-6",
                                size: "50px",
                                onClick: rotateImage
                              }, {
                                default: withCtx(() => [
                                  createTextVNode("mdi-rotate-right")
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
                  }),
                  createVNode("div", { class: "d-flex justify-center align-center" }, [
                    unref(hasTiff) ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "ml-5 mt-15"
                    }, [
                      createVNode(_component_TiffViewer, {
                        "tiff-url": unref(fichaRender),
                        "is-modal": true,
                        "zoom-level": unref(zoomLevel),
                        "rotation-degree": unref(rotationDegree),
                        "translate-x": unref(translateX)
                      }, null, 8, ["tiff-url", "zoom-level", "rotation-degree", "translate-x"])
                    ])) : unref(hasFoto) ? (openBlock(), createBlock("img", {
                      key: 1,
                      src: unref(fotoRender),
                      style: {
                        width: "70%",
                        height: "70%",
                        transform: `scale(${unref(zoomLevel)}) rotate(${unref(rotationDegree)}deg)`
                      }
                    }, null, 12, ["src"])) : createCommentVNode("", true),
                    !unref(fotoRender) && !unref(fichaRender) ? (openBlock(), createBlock("div", { key: 2 }, [
                      createVNode("h3", { class: "mb-5" }, " Este usuario n\xE3o possui ficha de firma cadastrada. ")
                    ])) : createCommentVNode("", true)
                  ]),
                  createVNode(VCardActions, null, {
                    default: withCtx(() => [
                      !props.isView ? (openBlock(), createBlock(VBtn, {
                        key: 0,
                        style: { "background-color": "#429946", "color": "white" },
                        onClick: confirmarRecebimento
                      }, {
                        default: withCtx(() => [
                          createTextVNode("Reconhecer")
                        ]),
                        _: 1
                      })) : createCommentVNode("", true),
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
  return _sfc_setup ? _sfc_setup(props, ctx) : undefined;
};
const __nuxt_component_1 = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-efe33cd3"]]);

export { VSlider as V, __nuxt_component_1 as _, _sfc_main$1 as a };
//# sourceMappingURL=FichaCard-LDNNOLnf.mjs.map
