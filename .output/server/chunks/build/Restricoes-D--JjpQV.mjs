import { a as buildAssetsURL } from '../routes/renderer.mjs';
import { ref, computed, shallowRef, watch, provide, createVNode, withDirectives, resolveDirective, inject, vShow, mergeProps, Fragment, toRef, useSSRContext, nextTick, reactive, withAsyncContext, unref, withCtx, openBlock, createBlock, isRef, createTextVNode, toDisplayString, createCommentVNode, renderList } from 'vue';
import { p as propsFactory, W as makeComponentProps, Y as makeTagProps, a9 as makeThemeProps, t as genericComponent, ac as provideTheme, aq as useRtl, v as useLocale, aI as useGroup, V as VBtn, C as useRender, aJ as makeGroupItemProps, aK as makeLazyProps, aL as useGroupItem, aM as useSsrBoot, aN as useLazy, aO as MaybeTransition, a7 as makeRoundedProps, a3 as makeElevationProps, ab as Ripple, ah as useElevation, y as useTextColor, aE as convertToUnit, aR as VScaleTransition, al as useRounded, aT as useBackgroundColor, aU as makeFocusProps, au as makeVInputProps, w as useProxiedModel, ax as useFocus, az as VInput, aV as VLabel, o as omit, aW as makeVBtnProps, D as forwardRefs, aZ as makeVSlideGroupProps, a0 as makeDensityProps, af as useDensity, T as useScopeId, X as provideDefaults, a$ as VSlideGroup, aP as getDecimals, aQ as createRange, aX as animate, aY as standardEasing, a_ as isObject, f as useNuxtApp, c as useRoute$1, d as useCookie, e as VTextField, as as VDataTable, at as VSpacer, _ as _export_sfc, aH as keys, aF as clamp, b as useRuntimeConfig, an as VImg, aS as keyValues, b0 as VSelect } from './server.mjs';
import { _ as __nuxt_component_0$1 } from './nuxt-link-DyZc7qn_.mjs';
import { a as useLazyAsyncData, u as useFetch } from './fetch-Dsyde8UD.mjs';
import { _ as __unimport_formatDate } from './formatDate-B6RUKh9-.mjs';
import { ssrRenderComponent, ssrRenderStyle, ssrRenderAttr, ssrGetDirectiveProps, ssrRenderList, ssrInterpolate, ssrRenderAttrs } from 'vue/server-renderer';
import { _ as _imports_0$3, a as _imports_2, b as _imports_3 } from './excluido-BJN1kjTO.mjs';
import { _ as _imports_4 } from './mudarStatus-8RJ9gJOS.mjs';
import { _ as _imports_0$4 } from './sair-CV1ySkp8.mjs';
import { useVuelidate } from '@vuelidate/core';
import { helpers, required } from '@vuelidate/validators';
import { V as VContainer } from './VContainer-chgtNZst.mjs';
import { V as VRow } from './VRow-BuaJrtx0.mjs';
import { V as VCol } from './VCol-uBIoF0At.mjs';
import { V as VAutocomplete, _ as _imports_1 } from './salvar-BSOMUYLt.mjs';
import { V as VDialog, a as VCard, b as VCardTitle, c as VCardText, d as VCardActions } from './VCard-e7pECtGK.mjs';

const handleGesture = (wrapper) => {
  const {
    touchstartX,
    touchendX,
    touchstartY,
    touchendY
  } = wrapper;
  const dirRatio = 0.5;
  const minDistance = 16;
  wrapper.offsetX = touchendX - touchstartX;
  wrapper.offsetY = touchendY - touchstartY;
  if (Math.abs(wrapper.offsetY) < dirRatio * Math.abs(wrapper.offsetX)) {
    wrapper.left && touchendX < touchstartX - minDistance && wrapper.left(wrapper);
    wrapper.right && touchendX > touchstartX + minDistance && wrapper.right(wrapper);
  }
  if (Math.abs(wrapper.offsetX) < dirRatio * Math.abs(wrapper.offsetY)) {
    wrapper.up && touchendY < touchstartY - minDistance && wrapper.up(wrapper);
    wrapper.down && touchendY > touchstartY + minDistance && wrapper.down(wrapper);
  }
};
function touchstart(event, wrapper) {
  var _a;
  const touch = event.changedTouches[0];
  wrapper.touchstartX = touch.clientX;
  wrapper.touchstartY = touch.clientY;
  (_a = wrapper.start) == null ? void 0 : _a.call(wrapper, {
    originalEvent: event,
    ...wrapper
  });
}
function touchend(event, wrapper) {
  var _a;
  const touch = event.changedTouches[0];
  wrapper.touchendX = touch.clientX;
  wrapper.touchendY = touch.clientY;
  (_a = wrapper.end) == null ? void 0 : _a.call(wrapper, {
    originalEvent: event,
    ...wrapper
  });
  handleGesture(wrapper);
}
function touchmove(event, wrapper) {
  var _a;
  const touch = event.changedTouches[0];
  wrapper.touchmoveX = touch.clientX;
  wrapper.touchmoveY = touch.clientY;
  (_a = wrapper.move) == null ? void 0 : _a.call(wrapper, {
    originalEvent: event,
    ...wrapper
  });
}
function createHandlers() {
  let value = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
  const wrapper = {
    touchstartX: 0,
    touchstartY: 0,
    touchendX: 0,
    touchendY: 0,
    touchmoveX: 0,
    touchmoveY: 0,
    offsetX: 0,
    offsetY: 0,
    left: value.left,
    right: value.right,
    up: value.up,
    down: value.down,
    start: value.start,
    move: value.move,
    end: value.end
  };
  return {
    touchstart: (e) => touchstart(e, wrapper),
    touchend: (e) => touchend(e, wrapper),
    touchmove: (e) => touchmove(e, wrapper)
  };
}
function mounted(el, binding) {
  var _a2, _b;
  var _a;
  const value = binding.value;
  const target = (value == null ? void 0 : value.parent) ? el.parentElement : el;
  const options = (_a2 = value == null ? void 0 : value.options) != null ? _a2 : {
    passive: true
  };
  const uid = (_a = binding.instance) == null ? void 0 : _a.$.uid;
  if (!target || !uid)
    return;
  const handlers = createHandlers(binding.value);
  target._touchHandlers = (_b = target._touchHandlers) != null ? _b : /* @__PURE__ */ Object.create(null);
  target._touchHandlers[uid] = handlers;
  keys(handlers).forEach((eventName) => {
    target.addEventListener(eventName, handlers[eventName], options);
  });
}
function unmounted(el, binding) {
  var _a, _b;
  const target = ((_a = binding.value) == null ? void 0 : _a.parent) ? el.parentElement : el;
  const uid = (_b = binding.instance) == null ? void 0 : _b.$.uid;
  if (!(target == null ? void 0 : target._touchHandlers) || !uid)
    return;
  const handlers = target._touchHandlers[uid];
  keys(handlers).forEach((eventName) => {
    target.removeEventListener(eventName, handlers[eventName]);
  });
  delete target._touchHandlers[uid];
}
const Touch = {
  mounted,
  unmounted
};
const Touch$1 = Touch;
const VWindowSymbol = Symbol.for("vuetify:v-window");
const VWindowGroupSymbol = Symbol.for("vuetify:v-window-group");
const makeVWindowProps = propsFactory({
  continuous: Boolean,
  nextIcon: {
    type: [Boolean, String, Function, Object],
    default: "$next"
  },
  prevIcon: {
    type: [Boolean, String, Function, Object],
    default: "$prev"
  },
  reverse: Boolean,
  showArrows: {
    type: [Boolean, String],
    validator: (v) => typeof v === "boolean" || v === "hover"
  },
  touch: {
    type: [Object, Boolean],
    default: void 0
  },
  direction: {
    type: String,
    default: "horizontal"
  },
  modelValue: null,
  disabled: Boolean,
  selectedClass: {
    type: String,
    default: "v-window-item--active"
  },
  // TODO: mandatory should probably not be exposed but do this for now
  mandatory: {
    type: [Boolean, String],
    default: "force"
  },
  ...makeComponentProps(),
  ...makeTagProps(),
  ...makeThemeProps()
}, "VWindow");
const VWindow = genericComponent()({
  name: "VWindow",
  directives: {
    Touch
  },
  props: makeVWindowProps(),
  emits: {
    "update:modelValue": (value) => true
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      themeClasses
    } = provideTheme(props);
    const {
      isRtl
    } = useRtl();
    const {
      t
    } = useLocale();
    const group = useGroup(props, VWindowGroupSymbol);
    const rootRef = ref();
    const isRtlReverse = computed(() => isRtl.value ? !props.reverse : props.reverse);
    const isReversed = shallowRef(false);
    const transition = computed(() => {
      const axis = props.direction === "vertical" ? "y" : "x";
      const reverse = isRtlReverse.value ? !isReversed.value : isReversed.value;
      const direction = reverse ? "-reverse" : "";
      return `v-window-${axis}${direction}-transition`;
    });
    const transitionCount = shallowRef(0);
    const transitionHeight = ref(void 0);
    const activeIndex = computed(() => {
      return group.items.value.findIndex((item) => group.selected.value.includes(item.id));
    });
    watch(activeIndex, (newVal, oldVal) => {
      const itemsLength = group.items.value.length;
      const lastIndex = itemsLength - 1;
      if (itemsLength <= 2) {
        isReversed.value = newVal < oldVal;
      } else if (newVal === lastIndex && oldVal === 0) {
        isReversed.value = true;
      } else if (newVal === 0 && oldVal === lastIndex) {
        isReversed.value = false;
      } else {
        isReversed.value = newVal < oldVal;
      }
    });
    provide(VWindowSymbol, {
      transition,
      isReversed,
      transitionCount,
      transitionHeight,
      rootRef
    });
    const canMoveBack = computed(() => props.continuous || activeIndex.value !== 0);
    const canMoveForward = computed(() => props.continuous || activeIndex.value !== group.items.value.length - 1);
    function prev() {
      canMoveBack.value && group.prev();
    }
    function next() {
      canMoveForward.value && group.next();
    }
    const arrows = computed(() => {
      const arrows2 = [];
      const prevProps = {
        icon: isRtl.value ? props.nextIcon : props.prevIcon,
        class: `v-window__${isRtlReverse.value ? "right" : "left"}`,
        onClick: group.prev,
        "aria-label": t("$vuetify.carousel.prev")
      };
      arrows2.push(canMoveBack.value ? slots.prev ? slots.prev({
        props: prevProps
      }) : createVNode(VBtn, prevProps, null) : createVNode("div", null, null));
      const nextProps = {
        icon: isRtl.value ? props.prevIcon : props.nextIcon,
        class: `v-window__${isRtlReverse.value ? "left" : "right"}`,
        onClick: group.next,
        "aria-label": t("$vuetify.carousel.next")
      };
      arrows2.push(canMoveForward.value ? slots.next ? slots.next({
        props: nextProps
      }) : createVNode(VBtn, nextProps, null) : createVNode("div", null, null));
      return arrows2;
    });
    const touchOptions = computed(() => {
      if (props.touch === false)
        return props.touch;
      const options = {
        left: () => {
          isRtlReverse.value ? prev() : next();
        },
        right: () => {
          isRtlReverse.value ? next() : prev();
        },
        start: (_ref2) => {
          let {
            originalEvent
          } = _ref2;
          originalEvent.stopPropagation();
        }
      };
      return {
        ...options,
        ...props.touch === true ? {} : props.touch
      };
    });
    useRender(() => withDirectives(createVNode(props.tag, {
      "ref": rootRef,
      "class": ["v-window", {
        "v-window--show-arrows-on-hover": props.showArrows === "hover"
      }, themeClasses.value, props.class],
      "style": props.style
    }, {
      default: () => {
        var _a, _b;
        return [createVNode("div", {
          "class": "v-window__container",
          "style": {
            height: transitionHeight.value
          }
        }, [(_a = slots.default) == null ? void 0 : _a.call(slots, {
          group
        }), props.showArrows !== false && createVNode("div", {
          "class": "v-window__controls"
        }, [arrows.value])]), (_b = slots.additional) == null ? void 0 : _b.call(slots, {
          group
        })];
      }
    }), [[resolveDirective("touch"), touchOptions.value]]));
    return {
      group
    };
  }
});
const makeVWindowItemProps = propsFactory({
  reverseTransition: {
    type: [Boolean, String],
    default: void 0
  },
  transition: {
    type: [Boolean, String],
    default: void 0
  },
  ...makeComponentProps(),
  ...makeGroupItemProps(),
  ...makeLazyProps()
}, "VWindowItem");
const VWindowItem = genericComponent()({
  name: "VWindowItem",
  directives: {
    Touch: Touch$1
  },
  props: makeVWindowItemProps(),
  emits: {
    "group:selected": (val) => true
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const window = inject(VWindowSymbol);
    const groupItem = useGroupItem(props, VWindowGroupSymbol);
    const {
      isBooted
    } = useSsrBoot();
    if (!window || !groupItem)
      throw new Error("[Vuetify] VWindowItem must be used inside VWindow");
    const isTransitioning = shallowRef(false);
    const hasTransition = computed(() => isBooted.value && (window.isReversed.value ? props.reverseTransition !== false : props.transition !== false));
    function onAfterTransition() {
      if (!isTransitioning.value || !window) {
        return;
      }
      isTransitioning.value = false;
      if (window.transitionCount.value > 0) {
        window.transitionCount.value -= 1;
        if (window.transitionCount.value === 0) {
          window.transitionHeight.value = void 0;
        }
      }
    }
    function onBeforeTransition() {
      var _a;
      if (isTransitioning.value || !window) {
        return;
      }
      isTransitioning.value = true;
      if (window.transitionCount.value === 0) {
        window.transitionHeight.value = convertToUnit((_a = window.rootRef.value) == null ? void 0 : _a.clientHeight);
      }
      window.transitionCount.value += 1;
    }
    function onTransitionCancelled() {
      onAfterTransition();
    }
    function onEnterTransition(el) {
      if (!isTransitioning.value) {
        return;
      }
      nextTick(() => {
        if (!hasTransition.value || !isTransitioning.value || !window) {
          return;
        }
        window.transitionHeight.value = convertToUnit(el.clientHeight);
      });
    }
    const transition = computed(() => {
      const name = window.isReversed.value ? props.reverseTransition : props.transition;
      return !hasTransition.value ? false : {
        name: typeof name !== "string" ? window.transition.value : name,
        onBeforeEnter: onBeforeTransition,
        onAfterEnter: onAfterTransition,
        onEnterCancelled: onTransitionCancelled,
        onBeforeLeave: onBeforeTransition,
        onAfterLeave: onAfterTransition,
        onLeaveCancelled: onTransitionCancelled,
        onEnter: onEnterTransition
      };
    });
    const {
      hasContent
    } = useLazy(props, groupItem.isSelected);
    useRender(() => createVNode(MaybeTransition, {
      "transition": transition.value,
      "disabled": !isBooted.value
    }, {
      default: () => {
        var _a;
        return [withDirectives(createVNode("div", {
          "class": ["v-window-item", groupItem.selectedClass.value, props.class],
          "style": props.style
        }, [hasContent.value && ((_a = slots.default) == null ? void 0 : _a.call(slots))]), [[vShow, groupItem.isSelected.value]])];
      }
    }));
    return {
      groupItem
    };
  }
});
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
const VTabsSymbol = Symbol.for("vuetify:v-tabs");
const makeVTabProps = propsFactory({
  fixed: Boolean,
  sliderColor: String,
  hideSlider: Boolean,
  direction: {
    type: String,
    default: "horizontal"
  },
  ...omit(makeVBtnProps({
    selectedClass: "v-tab--selected",
    variant: "text"
  }), ["active", "block", "flat", "location", "position", "symbol"])
}, "VTab");
const VTab = genericComponent()({
  name: "VTab",
  props: makeVTabProps(),
  setup(props, _ref) {
    let {
      slots,
      attrs
    } = _ref;
    const {
      textColorClasses: sliderColorClasses,
      textColorStyles: sliderColorStyles
    } = useTextColor(props, "sliderColor");
    const rootEl = ref();
    const sliderEl = ref();
    const isHorizontal = computed(() => props.direction === "horizontal");
    const isSelected = computed(() => {
      var _a2;
      var _a, _b;
      return (_a2 = (_b = (_a = rootEl.value) == null ? void 0 : _a.group) == null ? void 0 : _b.isSelected.value) != null ? _a2 : false;
    });
    function updateSlider(_ref2) {
      var _a, _b;
      let {
        value
      } = _ref2;
      if (value) {
        const prevEl = (_b = (_a = rootEl.value) == null ? void 0 : _a.$el.parentElement) == null ? void 0 : _b.querySelector(".v-tab--selected .v-tab__slider");
        const nextEl = sliderEl.value;
        if (!prevEl || !nextEl)
          return;
        const color = getComputedStyle(prevEl).color;
        const prevBox = prevEl.getBoundingClientRect();
        const nextBox = nextEl.getBoundingClientRect();
        const xy = isHorizontal.value ? "x" : "y";
        const XY = isHorizontal.value ? "X" : "Y";
        const rightBottom = isHorizontal.value ? "right" : "bottom";
        const widthHeight = isHorizontal.value ? "width" : "height";
        const prevPos = prevBox[xy];
        const nextPos = nextBox[xy];
        const delta = prevPos > nextPos ? prevBox[rightBottom] - nextBox[rightBottom] : prevBox[xy] - nextBox[xy];
        const origin = Math.sign(delta) > 0 ? isHorizontal.value ? "right" : "bottom" : Math.sign(delta) < 0 ? isHorizontal.value ? "left" : "top" : "center";
        const size = Math.abs(delta) + (Math.sign(delta) < 0 ? prevBox[widthHeight] : nextBox[widthHeight]);
        const scale = size / Math.max(prevBox[widthHeight], nextBox[widthHeight]) || 0;
        const initialScale = prevBox[widthHeight] / nextBox[widthHeight] || 0;
        const sigma = 1.5;
        animate(nextEl, {
          backgroundColor: [color, "currentcolor"],
          transform: [`translate${XY}(${delta}px) scale${XY}(${initialScale})`, `translate${XY}(${delta / sigma}px) scale${XY}(${(scale - 1) / sigma + 1})`, "none"],
          transformOrigin: Array(3).fill(origin)
        }, {
          duration: 225,
          easing: standardEasing
        });
      }
    }
    useRender(() => {
      const btnProps = VBtn.filterProps(props);
      return createVNode(VBtn, mergeProps({
        "symbol": VTabsSymbol,
        "ref": rootEl,
        "class": ["v-tab", props.class],
        "style": props.style,
        "tabindex": isSelected.value ? 0 : -1,
        "role": "tab",
        "aria-selected": String(isSelected.value),
        "active": false
      }, btnProps, attrs, {
        "block": props.fixed,
        "maxWidth": props.fixed ? 300 : void 0,
        "onGroup:selected": updateSlider
      }), {
        ...slots,
        default: () => {
          var _a2;
          var _a;
          return createVNode(Fragment, null, [(_a2 = (_a = slots.default) == null ? void 0 : _a.call(slots)) != null ? _a2 : props.text, !props.hideSlider && createVNode("div", {
            "ref": sliderEl,
            "class": ["v-tab__slider", sliderColorClasses.value],
            "style": sliderColorStyles.value
          }, null)]);
        }
      });
    });
    return forwardRefs({}, rootEl);
  }
});
const makeVTabsWindowProps = propsFactory({
  ...omit(makeVWindowProps(), ["continuous", "nextIcon", "prevIcon", "showArrows", "touch", "mandatory"])
}, "VTabsWindow");
const VTabsWindow = genericComponent()({
  name: "VTabsWindow",
  props: makeVTabsWindowProps(),
  emits: {
    "update:modelValue": (v) => true
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const group = inject(VTabsSymbol, null);
    const _model = useProxiedModel(props, "modelValue");
    const model = computed({
      get() {
        var _a;
        if (_model.value != null || !group)
          return _model.value;
        return (_a = group.items.value.find((item) => group.selected.value.includes(item.id))) == null ? void 0 : _a.value;
      },
      set(val) {
        _model.value = val;
      }
    });
    useRender(() => {
      const windowProps = VWindow.filterProps(props);
      return createVNode(VWindow, mergeProps({
        "_as": "VTabsWindow"
      }, windowProps, {
        "modelValue": model.value,
        "onUpdate:modelValue": ($event) => model.value = $event,
        "class": ["v-tabs-window", props.class],
        "style": props.style,
        "mandatory": false,
        "touch": false
      }), slots);
    });
    return {};
  }
});
const makeVTabsWindowItemProps = propsFactory({
  ...makeVWindowItemProps()
}, "VTabsWindowItem");
const VTabsWindowItem = genericComponent()({
  name: "VTabsWindowItem",
  props: makeVTabsWindowItemProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    useRender(() => {
      const windowItemProps = VWindowItem.filterProps(props);
      return createVNode(VWindowItem, mergeProps({
        "_as": "VTabsWindowItem"
      }, windowItemProps, {
        "class": ["v-tabs-window-item", props.class],
        "style": props.style
      }), slots);
    });
    return {};
  }
});
function parseItems(items) {
  if (!items)
    return [];
  return items.map((item) => {
    if (!isObject(item))
      return {
        text: item,
        value: item
      };
    return item;
  });
}
const makeVTabsProps = propsFactory({
  alignTabs: {
    type: String,
    default: "start"
  },
  color: String,
  fixedTabs: Boolean,
  items: {
    type: Array,
    default: () => []
  },
  stacked: Boolean,
  bgColor: String,
  grow: Boolean,
  height: {
    type: [Number, String],
    default: void 0
  },
  hideSlider: Boolean,
  sliderColor: String,
  ...makeVSlideGroupProps({
    mandatory: "force",
    selectedClass: "v-tab-item--selected"
  }),
  ...makeDensityProps(),
  ...makeTagProps()
}, "VTabs");
const VTabs = genericComponent()({
  name: "VTabs",
  props: makeVTabsProps(),
  emits: {
    "update:modelValue": (v) => true
  },
  setup(props, _ref) {
    let {
      attrs,
      slots
    } = _ref;
    const model = useProxiedModel(props, "modelValue");
    const items = computed(() => parseItems(props.items));
    const {
      densityClasses
    } = useDensity(props);
    const {
      backgroundColorClasses,
      backgroundColorStyles
    } = useBackgroundColor(toRef(props, "bgColor"));
    const {
      scopeId
    } = useScopeId();
    provideDefaults({
      VTab: {
        color: toRef(props, "color"),
        direction: toRef(props, "direction"),
        stacked: toRef(props, "stacked"),
        fixed: toRef(props, "fixedTabs"),
        sliderColor: toRef(props, "sliderColor"),
        hideSlider: toRef(props, "hideSlider")
      }
    });
    useRender(() => {
      const slideGroupProps = VSlideGroup.filterProps(props);
      const hasWindow = !!(slots.window || props.items.length > 0);
      return createVNode(Fragment, null, [createVNode(VSlideGroup, mergeProps(slideGroupProps, {
        "modelValue": model.value,
        "onUpdate:modelValue": ($event) => model.value = $event,
        "class": ["v-tabs", `v-tabs--${props.direction}`, `v-tabs--align-tabs-${props.alignTabs}`, {
          "v-tabs--fixed-tabs": props.fixedTabs,
          "v-tabs--grow": props.grow,
          "v-tabs--stacked": props.stacked
        }, densityClasses.value, backgroundColorClasses.value, props.class],
        "style": [{
          "--v-tabs-height": convertToUnit(props.height)
        }, backgroundColorStyles.value, props.style],
        "role": "tablist",
        "symbol": VTabsSymbol
      }, scopeId, attrs), {
        default: () => {
          var _a2;
          var _a;
          return [(_a2 = (_a = slots.default) == null ? void 0 : _a.call(slots)) != null ? _a2 : items.value.map((item) => {
            var _a3;
            var _a22;
            return (_a3 = (_a22 = slots.tab) == null ? void 0 : _a22.call(slots, {
              item
            })) != null ? _a3 : createVNode(VTab, mergeProps(item, {
              "key": item.text,
              "value": item.value
            }), {
              default: slots[`tab.${item.value}`] ? () => {
                var _a32;
                return (_a32 = slots[`tab.${item.value}`]) == null ? void 0 : _a32.call(slots, {
                  item
                });
              } : void 0
            });
          })];
        }
      }), hasWindow && createVNode(VTabsWindow, mergeProps({
        "modelValue": model.value,
        "onUpdate:modelValue": ($event) => model.value = $event,
        "key": "tabs-window"
      }, scopeId), {
        default: () => {
          var _a;
          return [items.value.map((item) => {
            var _a3;
            var _a2;
            return (_a3 = (_a2 = slots.item) == null ? void 0 : _a2.call(slots, {
              item
            })) != null ? _a3 : createVNode(VTabsWindowItem, {
              "value": item.value
            }, {
              default: () => {
                var _a32;
                return (_a32 = slots[`item.${item.value}`]) == null ? void 0 : _a32.call(slots, {
                  item
                });
              }
            });
          }), (_a = slots.window) == null ? void 0 : _a.call(slots)];
        }
      })]);
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
                    _push3(ssrRenderComponent(VRow, { style: { "display": "flex", "gap": "10px" } }, {
                      default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<div title="editar"${_scopeId3}><img style="${ssrRenderStyle({ "width": "40px", "height": "40px", "cursor": "pointer" })}"${ssrRenderAttr("src", _imports_2)} alt="editar"${_scopeId3}></div><div title="deletar"${_scopeId3}>`);
                          if (item.excluido) {
                            _push4(`<img style="${ssrRenderStyle({ "width": "40px", "height": "40px", "cursor": "pointer" })}"${ssrRenderAttr("src", _imports_3)} alt="deletar" title="Reativar"${_scopeId3}>`);
                          } else {
                            _push4(`<img${ssrRenderAttr("src", _imports_4)} alt="reativar" class="trash-icon" style="${ssrRenderStyle({ "width": "40px", "height": "40px", "cursor": "pointer" })}" title="reativar"${_scopeId3}>`);
                          }
                          _push4(`</div>`);
                        } else {
                          return [
                            createVNode("div", {
                              onClick: ($event) => redirectToUpdate(item.id),
                              title: "editar"
                            }, [
                              createVNode("img", {
                                style: { "width": "40px", "height": "40px", "cursor": "pointer" },
                                src: _imports_2,
                                alt: "editar"
                              })
                            ], 8, ["onClick"]),
                            createVNode("div", {
                              onClick: ($event) => deleteDocumento(item),
                              title: "deletar"
                            }, [
                              item.excluido ? (openBlock(), createBlock("img", {
                                key: 0,
                                style: { "width": "40px", "height": "40px", "cursor": "pointer" },
                                src: _imports_3,
                                alt: "deletar",
                                title: "Reativar"
                              })) : (openBlock(), createBlock("img", {
                                key: 1,
                                src: _imports_4,
                                alt: "reativar",
                                class: "trash-icon",
                                style: { "width": "40px", "height": "40px", "cursor": "pointer" },
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
                      createVNode(VRow, { style: { "display": "flex", "gap": "10px" } }, {
                        default: withCtx(() => [
                          createVNode("div", {
                            onClick: ($event) => redirectToUpdate(item.id),
                            title: "editar"
                          }, [
                            createVNode("img", {
                              style: { "width": "40px", "height": "40px", "cursor": "pointer" },
                              src: _imports_2,
                              alt: "editar"
                            })
                          ], 8, ["onClick"]),
                          createVNode("div", {
                            onClick: ($event) => deleteDocumento(item),
                            title: "deletar"
                          }, [
                            item.excluido ? (openBlock(), createBlock("img", {
                              key: 0,
                              style: { "width": "40px", "height": "40px", "cursor": "pointer" },
                              src: _imports_3,
                              alt: "deletar",
                              title: "Reativar"
                            })) : (openBlock(), createBlock("img", {
                              key: 1,
                              src: _imports_4,
                              alt: "reativar",
                              class: "trash-icon",
                              style: { "width": "40px", "height": "40px", "cursor": "pointer" },
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
              _push2(ssrRenderComponent(_component_NuxtLink, { to: "/pessoas/registros" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<img class="btn-pointer"${ssrRenderAttr("src", _imports_0$4)} alt="Sair"${_scopeId2}>`);
                  } else {
                    return [
                      createVNode("img", {
                        class: "btn-pointer",
                        src: _imports_0$4,
                        alt: "Sair"
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
                    createVNode(VRow, { style: { "display": "flex", "gap": "10px" } }, {
                      default: withCtx(() => [
                        createVNode("div", {
                          onClick: ($event) => redirectToUpdate(item.id),
                          title: "editar"
                        }, [
                          createVNode("img", {
                            style: { "width": "40px", "height": "40px", "cursor": "pointer" },
                            src: _imports_2,
                            alt: "editar"
                          })
                        ], 8, ["onClick"]),
                        createVNode("div", {
                          onClick: ($event) => deleteDocumento(item),
                          title: "deletar"
                        }, [
                          item.excluido ? (openBlock(), createBlock("img", {
                            key: 0,
                            style: { "width": "40px", "height": "40px", "cursor": "pointer" },
                            src: _imports_3,
                            alt: "deletar",
                            title: "Reativar"
                          })) : (openBlock(), createBlock("img", {
                            key: 1,
                            src: _imports_4,
                            alt: "reativar",
                            class: "trash-icon",
                            style: { "width": "40px", "height": "40px", "cursor": "pointer" },
                            title: "reativar"
                          }))
                        ], 8, ["onClick"])
                      ]),
                      _: 2
                    }, 1024)
                  ]),
                  _: 1
                }, 8, ["items"]),
                createVNode(_component_NuxtLink, { to: "/pessoas/registros" }, {
                  default: withCtx(() => [
                    createVNode("img", {
                      class: "btn-pointer",
                      src: _imports_0$4,
                      alt: "Sair"
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
      { title: "Endere\xE7o", value: "logradouro" },
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
        value: "logradouro"
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
          body: JSON.stringify({ excluido: item.excluido })
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
                    _push3(ssrRenderComponent(VRow, { style: { "display": "flex", "gap": "10px" } }, {
                      default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<div title="Visualizar"${_scopeId3}><img style="${ssrRenderStyle({ "width": "40px", "height": "40px", "cursor": "pointer" })}"${ssrRenderAttr("src", _imports_2)} alt="Visualizar"${_scopeId3}></div><div title="Visualizar"${_scopeId3}>`);
                          if (item.excluido) {
                            _push4(`<img style="${ssrRenderStyle({ "width": "40px", "height": "40px", "cursor": "pointer" })}"${ssrRenderAttr("src", _imports_3)} alt="Visualizar" title="Reativar"${_scopeId3}>`);
                          } else {
                            _push4(`<img${ssrRenderAttr("src", _imports_4)} alt="Excluir" class="trash-icon" style="${ssrRenderStyle({ "width": "40px", "height": "40px", "cursor": "pointer" })}" title="Excluir"${_scopeId3}>`);
                          }
                          _push4(`</div>`);
                        } else {
                          return [
                            createVNode("div", {
                              onClick: ($event) => redirectToUpdate(item.id),
                              title: "Visualizar"
                            }, [
                              createVNode("img", {
                                style: { "width": "40px", "height": "40px", "cursor": "pointer" },
                                src: _imports_2,
                                alt: "Visualizar"
                              })
                            ], 8, ["onClick"]),
                            createVNode("div", {
                              onClick: ($event) => deleteEndereco(item),
                              title: "Visualizar"
                            }, [
                              item.excluido ? (openBlock(), createBlock("img", {
                                key: 0,
                                style: { "width": "40px", "height": "40px", "cursor": "pointer" },
                                src: _imports_3,
                                alt: "Visualizar",
                                title: "Reativar"
                              })) : (openBlock(), createBlock("img", {
                                key: 1,
                                src: _imports_4,
                                alt: "Excluir",
                                class: "trash-icon",
                                style: { "width": "40px", "height": "40px", "cursor": "pointer" },
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
                      createVNode(VRow, { style: { "display": "flex", "gap": "10px" } }, {
                        default: withCtx(() => [
                          createVNode("div", {
                            onClick: ($event) => redirectToUpdate(item.id),
                            title: "Visualizar"
                          }, [
                            createVNode("img", {
                              style: { "width": "40px", "height": "40px", "cursor": "pointer" },
                              src: _imports_2,
                              alt: "Visualizar"
                            })
                          ], 8, ["onClick"]),
                          createVNode("div", {
                            onClick: ($event) => deleteEndereco(item),
                            title: "Visualizar"
                          }, [
                            item.excluido ? (openBlock(), createBlock("img", {
                              key: 0,
                              style: { "width": "40px", "height": "40px", "cursor": "pointer" },
                              src: _imports_3,
                              alt: "Visualizar",
                              title: "Reativar"
                            })) : (openBlock(), createBlock("img", {
                              key: 1,
                              src: _imports_4,
                              alt: "Excluir",
                              class: "trash-icon",
                              style: { "width": "40px", "height": "40px", "cursor": "pointer" },
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
              _push2(ssrRenderComponent(_component_NuxtLink, { to: "/pessoas/registros" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<img class="btn-pointer"${ssrRenderAttr("src", _imports_0$4)} alt="Sair"${_scopeId2}>`);
                  } else {
                    return [
                      createVNode("img", {
                        class: "btn-pointer",
                        src: _imports_0$4,
                        alt: "Sair"
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
                    createVNode(VRow, { style: { "display": "flex", "gap": "10px" } }, {
                      default: withCtx(() => [
                        createVNode("div", {
                          onClick: ($event) => redirectToUpdate(item.id),
                          title: "Visualizar"
                        }, [
                          createVNode("img", {
                            style: { "width": "40px", "height": "40px", "cursor": "pointer" },
                            src: _imports_2,
                            alt: "Visualizar"
                          })
                        ], 8, ["onClick"]),
                        createVNode("div", {
                          onClick: ($event) => deleteEndereco(item),
                          title: "Visualizar"
                        }, [
                          item.excluido ? (openBlock(), createBlock("img", {
                            key: 0,
                            style: { "width": "40px", "height": "40px", "cursor": "pointer" },
                            src: _imports_3,
                            alt: "Visualizar",
                            title: "Reativar"
                          })) : (openBlock(), createBlock("img", {
                            key: 1,
                            src: _imports_4,
                            alt: "Excluir",
                            class: "trash-icon",
                            style: { "width": "40px", "height": "40px", "cursor": "pointer" },
                            title: "Excluir"
                          }))
                        ], 8, ["onClick"])
                      ]),
                      _: 2
                    }, 1024)
                  ]),
                  _: 1
                }, 8, ["items"]),
                createVNode(_component_NuxtLink, { to: "/pessoas/registros" }, {
                  default: withCtx(() => [
                    createVNode("img", {
                      class: "btn-pointer",
                      src: _imports_0$4,
                      alt: "Sair"
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
    const isModalOpen = ref(false);
    const selectedFinger = ref(null);
    const currentFingerBiometria = ref(null);
    const biometricDevice = ref(null);
    const route = useRoute$1();
    const { id } = route.params;
    const { $toast } = useNuxtApp();
    const config = useRuntimeConfig();
    const enviarDigital = `${config.public.biometria}`;
    const enviarDigitalBanco = `${config.public.managemant}/createPessoaBiometria`;
    `${config.public.managemant}/getPessoaBiometriaById`;
    function openModal(finger) {
      selectedFinger.value = finger;
      isModalOpen.value = true;
    }
    function closeModal() {
      isModalOpen.value = false;
      selectedFinger.value = null;
      currentFingerBiometria.value = null;
      biometricDevice.value = null;
    }
    async function captureBiometria() {
      const { status, data: captureData } = await useFetch(enviarDigital, {
        method: "GET"
      }, "$b5yqRnLFV9");
      if (status.value === "success") {
        const hash = captureData.value.hash;
        const bodyDigital = {
          user_id: useCookie("user-data").value.usuario_id,
          pessoa_id: Number(id),
          dedo: selectedFinger.value,
          hash
        };
        const { status: status2, data } = await useFetch(enviarDigitalBanco, {
          method: "POST",
          body: bodyDigital
        }, "$cWP9jlCX2Z");
        if (status2.value === "success") {
          $toast.success("Biometria enviada com sucesso!");
          closeModal();
        } else {
          $toast.error("Falha ao enviar a biometria.");
        }
        closeModal();
      } else {
        $toast.error("Erro ao Capturar biometria para o sistema.");
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
            _push2(`<div class="finger-container" data-v-fa7db5fb${_scopeId}><!--[-->`);
            ssrRenderList(unref(leftFingers), (finger, index) => {
              _push2(`<div class="finger" style="${ssrRenderStyle(getFingerStyle(finger, "left"))}" data-v-fa7db5fb${_scopeId}></div>`);
            });
            _push2(`<!--]--><!--[-->`);
            ssrRenderList(unref(rightFingers), (finger, index) => {
              _push2(`<div class="finger" style="${ssrRenderStyle(getFingerStyle(finger, "right"))}" data-v-fa7db5fb${_scopeId}></div>`);
            });
            _push2(`<!--]--></div>`);
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
                        _push4(ssrRenderComponent(VCardTitle, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(` Captura de Biometria `);
                            } else {
                              return [
                                createTextVNode(" Captura de Biometria ")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VCardText, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              if (unref(currentFingerBiometria)) {
                                _push5(`<div data-v-fa7db5fb${_scopeId4}><p data-v-fa7db5fb${_scopeId4}>Biometria existente para ${ssrInterpolate(unref(selectedFinger))}.</p>`);
                                _push5(ssrRenderComponent(VImg, {
                                  src: unref(currentFingerBiometria),
                                  alt: "Biometria"
                                }, null, _parent5, _scopeId4));
                                _push5(`<p data-v-fa7db5fb${_scopeId4}>Deseja substituir?</p></div>`);
                              } else {
                                _push5(`<div data-v-fa7db5fb${_scopeId4}><p data-v-fa7db5fb${_scopeId4}> Nenhuma biometria encontrada para ${ssrInterpolate(unref(selectedFinger))}. Capturando nova biometria... </p></div>`);
                              }
                              if (unref(biometricDevice)) {
                                _push5(`<div data-v-fa7db5fb${_scopeId4}><p data-v-fa7db5fb${_scopeId4}>Dispositivo biom\xE9trico detectado: ${ssrInterpolate(unref(biometricDevice))}</p></div>`);
                              } else {
                                _push5(`<!---->`);
                              }
                            } else {
                              return [
                                unref(currentFingerBiometria) ? (openBlock(), createBlock("div", { key: 0 }, [
                                  createVNode("p", null, "Biometria existente para " + toDisplayString(unref(selectedFinger)) + ".", 1),
                                  createVNode(VImg, {
                                    src: unref(currentFingerBiometria),
                                    alt: "Biometria"
                                  }, null, 8, ["src"]),
                                  createVNode("p", null, "Deseja substituir?")
                                ])) : (openBlock(), createBlock("div", { key: 1 }, [
                                  createVNode("p", null, " Nenhuma biometria encontrada para " + toDisplayString(unref(selectedFinger)) + ". Capturando nova biometria... ", 1)
                                ])),
                                unref(biometricDevice) ? (openBlock(), createBlock("div", { key: 2 }, [
                                  createVNode("p", null, "Dispositivo biom\xE9trico detectado: " + toDisplayString(unref(biometricDevice)), 1)
                                ])) : createCommentVNode("", true)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VCardActions, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VBtn, {
                                color: "green",
                                onClick: captureBiometria
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Capturar`);
                                  } else {
                                    return [
                                      createTextVNode("Capturar")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(VBtn, {
                                color: "red",
                                onClick: closeModal
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
                            } else {
                              return [
                                createVNode(VBtn, {
                                  color: "green",
                                  onClick: captureBiometria
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode("Capturar")
                                  ]),
                                  _: 1
                                }),
                                createVNode(VBtn, {
                                  color: "red",
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
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VCardTitle, null, {
                            default: withCtx(() => [
                              createTextVNode(" Captura de Biometria ")
                            ]),
                            _: 1
                          }),
                          createVNode(VCardText, null, {
                            default: withCtx(() => [
                              unref(currentFingerBiometria) ? (openBlock(), createBlock("div", { key: 0 }, [
                                createVNode("p", null, "Biometria existente para " + toDisplayString(unref(selectedFinger)) + ".", 1),
                                createVNode(VImg, {
                                  src: unref(currentFingerBiometria),
                                  alt: "Biometria"
                                }, null, 8, ["src"]),
                                createVNode("p", null, "Deseja substituir?")
                              ])) : (openBlock(), createBlock("div", { key: 1 }, [
                                createVNode("p", null, " Nenhuma biometria encontrada para " + toDisplayString(unref(selectedFinger)) + ". Capturando nova biometria... ", 1)
                              ])),
                              unref(biometricDevice) ? (openBlock(), createBlock("div", { key: 2 }, [
                                createVNode("p", null, "Dispositivo biom\xE9trico detectado: " + toDisplayString(unref(biometricDevice)), 1)
                              ])) : createCommentVNode("", true)
                            ]),
                            _: 1
                          }),
                          createVNode(VCardActions, null, {
                            default: withCtx(() => [
                              createVNode(VBtn, {
                                color: "green",
                                onClick: captureBiometria
                              }, {
                                default: withCtx(() => [
                                  createTextVNode("Capturar")
                                ]),
                                _: 1
                              }),
                              createVNode(VBtn, {
                                color: "red",
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
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VCard, null, {
                      default: withCtx(() => [
                        createVNode(VCardTitle, null, {
                          default: withCtx(() => [
                            createTextVNode(" Captura de Biometria ")
                          ]),
                          _: 1
                        }),
                        createVNode(VCardText, null, {
                          default: withCtx(() => [
                            unref(currentFingerBiometria) ? (openBlock(), createBlock("div", { key: 0 }, [
                              createVNode("p", null, "Biometria existente para " + toDisplayString(unref(selectedFinger)) + ".", 1),
                              createVNode(VImg, {
                                src: unref(currentFingerBiometria),
                                alt: "Biometria"
                              }, null, 8, ["src"]),
                              createVNode("p", null, "Deseja substituir?")
                            ])) : (openBlock(), createBlock("div", { key: 1 }, [
                              createVNode("p", null, " Nenhuma biometria encontrada para " + toDisplayString(unref(selectedFinger)) + ". Capturando nova biometria... ", 1)
                            ])),
                            unref(biometricDevice) ? (openBlock(), createBlock("div", { key: 2 }, [
                              createVNode("p", null, "Dispositivo biom\xE9trico detectado: " + toDisplayString(unref(biometricDevice)), 1)
                            ])) : createCommentVNode("", true)
                          ]),
                          _: 1
                        }),
                        createVNode(VCardActions, null, {
                          default: withCtx(() => [
                            createVNode(VBtn, {
                              color: "green",
                              onClick: captureBiometria
                            }, {
                              default: withCtx(() => [
                                createTextVNode("Capturar")
                              ]),
                              _: 1
                            }),
                            createVNode(VBtn, {
                              color: "red",
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
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode("div", { class: "finger-container" }, [
                (openBlock(true), createBlock(Fragment, null, renderList(unref(leftFingers), (finger, index) => {
                  return openBlock(), createBlock("div", {
                    key: index,
                    class: "finger",
                    style: getFingerStyle(finger, "left"),
                    onClick: ($event) => openModal(finger)
                  }, null, 12, ["onClick"]);
                }), 128)),
                (openBlock(true), createBlock(Fragment, null, renderList(unref(rightFingers), (finger, index) => {
                  return openBlock(), createBlock("div", {
                    key: index,
                    class: "finger",
                    style: getFingerStyle(finger, "right"),
                    onClick: ($event) => openModal(finger)
                  }, null, 12, ["onClick"]);
                }), 128))
              ]),
              createVNode(VDialog, {
                modelValue: unref(isModalOpen),
                "onUpdate:modelValue": ($event) => isRef(isModalOpen) ? isModalOpen.value = $event : null,
                "max-width": "600px"
              }, {
                default: withCtx(() => [
                  createVNode(VCard, null, {
                    default: withCtx(() => [
                      createVNode(VCardTitle, null, {
                        default: withCtx(() => [
                          createTextVNode(" Captura de Biometria ")
                        ]),
                        _: 1
                      }),
                      createVNode(VCardText, null, {
                        default: withCtx(() => [
                          unref(currentFingerBiometria) ? (openBlock(), createBlock("div", { key: 0 }, [
                            createVNode("p", null, "Biometria existente para " + toDisplayString(unref(selectedFinger)) + ".", 1),
                            createVNode(VImg, {
                              src: unref(currentFingerBiometria),
                              alt: "Biometria"
                            }, null, 8, ["src"]),
                            createVNode("p", null, "Deseja substituir?")
                          ])) : (openBlock(), createBlock("div", { key: 1 }, [
                            createVNode("p", null, " Nenhuma biometria encontrada para " + toDisplayString(unref(selectedFinger)) + ". Capturando nova biometria... ", 1)
                          ])),
                          unref(biometricDevice) ? (openBlock(), createBlock("div", { key: 2 }, [
                            createVNode("p", null, "Dispositivo biom\xE9trico detectado: " + toDisplayString(unref(biometricDevice)), 1)
                          ])) : createCommentVNode("", true)
                        ]),
                        _: 1
                      }),
                      createVNode(VCardActions, null, {
                        default: withCtx(() => [
                          createVNode(VBtn, {
                            color: "green",
                            onClick: captureBiometria
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Capturar")
                            ]),
                            _: 1
                          }),
                          createVNode(VBtn, {
                            color: "red",
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
                ]),
                _: 1
              }, 8, ["modelValue", "onUpdate:modelValue"])
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
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["__scopeId", "data-v-fa7db5fb"]]);
const _imports_0$2 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAADsQAAA7EB9YPtSQAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAlmSURBVHic7Z1rjF1VFcd/zLSlUqYzLfJohxlKIBJTFAmmMcpjLNUAAY0JBIMxtISPimKCWm2V1wc/QpRHFCEYjSmvKtgXA8jDWkWKtFFMEGKlkKD2QaudaTvtjB/WvWFyufesfR57n33OXb9kfbkn9+z/3nudffZj7X3AMAzDMAzDMAzDMAzDMAzDMIw6c0zZAnIwH/g8cCHwceBE4ARghud0jwC7gf8ALwHPAY8DezynazQ4E3gAGAOmIrEx4H7gDI/57npmAKuBccqv8CRHWI3/Vqjr6AOeoPwKdrUngQEvJdGFzAVeofxKTWt/bmg3cjAD2ET5lZnVNmKvg1x8m/IrMa99s/BS6RJOBw5QfgXmtQPAomKLpju4C7cCfgm4FhgCegPo6gWGG2luddT4owC6asVcYD/JhToJfAfoKUkjjbRXNbQkad2PdQhTsRz9qVpVlrg2fA9d74rS1FWQdSQX5jbCNPeu9ALbSda8vjR1FWMecIjkwry+NHWduZ5kzYeR9QtD4TqqWZAD6I5rrwEHNpBciOvKk6ayHnsN5MKl+V9eljgHVlCx1itrPEA/cClwBfAxYLDxm28mgFOId+19PvAOMNNzOhPAv4G3gNeRhbINyHDTK8PIWrz2lPqyKjSh2mvAlx0Efgqc6iNTvcDtlL8WX4VOlNaJ9W1jwC0UOEyOZS0+uvdnB1xGAyFsIwXEJAwAf4kgM1PIO64qaCOZULadHFPQvYgXlZ2Jpl2ZNSMlcBXll1fT1pHxdXB7BOKbtp5qRTD3ENfDc3PaDAxTfofvKDLE+T4wO20GImA2UvCvI3kpsyzHkKG6Mw843nj6Wrzvsa/xHjNJH5Nwn+vN+9F7sUeBb1GtZrmu9AAr0VuZg8iITuWLyo2mkMo34mIler1d5XKjXyg32Yo9+THSA7xMct39rPVP7UKWz1USurNxs6rQB5yP5OujyLtzGDgOmeeYQAI39yL7/f4GvIb0bzYjHagqMAn8ENmi1olzXG6kxeIN55IZhkHgRuAFpIKz9p4PIZs/vwacFDQH2VhEcn72utxE60zEvNFhGTJt7WPYdRj4NdKaxMpM9M67ilYQMbIU2ELxld7JnkW2pcdI7vqrkgMsQDo2oSq+1R4CTvaQryHgEeR1vB9YC5zl+N+ucYBrgHcpr/Kbtgf4QoH5GkIOoGiXzpDD/2vvAMciPd2yK366TSKjo1kF5O+RhHQecvh/rR3gBKRnX3aFd7IngeNz5jFpFLbP4f+p6q/dhI5WyWVNAp0MjAIfyfDfw0gncRQZ5+9o2CHee2oXAIuBs4ElSMcyyxP9J+AyYFeG/4I4QKcp233oQR656y/GFmA+8FcHba32PDL9meWpnIcstoxmSPfFjGmCdPg63XeNw/9r9wqYjVRkmgpYi5wcVhSfIP36/iaytSBnIR2+1vvtwi3gs3YO8GMHTU17E/icRy3LgJ0p9NyRMZ0hpMO3r2FrcI/2rZUDfNlBz/Tm0Wm5MyfzgYcdNU1S7BDRhdo4wEJk7tqloH9A+M7pzY7a9uBnsqgTtXGAxxy0TAFfDaiplZsSdE23BwNqqoUDXOSgo/nkl81q3F4FoRaRauEAf3DQsYY4AlOOQc4K1vQ+E0hP5R1gxEHDm4Tp8LkyALyBrvtTAbRU3gFcniafQ72sXI6ue20AHZV2gFPQI3hCFGJWtFnDw8AHPWuotAN8wyH9Imf4iuYcdP1f8ayh0g7wrJL2857TLwJttfJpz+lX1gH6kSYyKe0qbBBdTnIexoEPeEy/sg7wWSXdQ+Rfaw/BHPQzji/2mH6q+ivzmNVWlijXtwD/CyEkJweQmIAkzgshxIWYHGCxcv2pICqK4ffKddcAT+/E5ACnK9dfDaKiGLYo180B2qDtX98RQkRB7FSuLwiiwoGYHECLddsRQkRB7FauR3N0fEwOMEe5Ph5ERTFoDhDNOkZMDjCpXK/SCSTaHrxoyj0aIcg4P4ljg6goBq2Jj2bLeUwOoMXRnxhERTFoWt8NosKBmBzgX8p1bZ4gJj6kXH8riAoHYnKAvyvXzw6iohg0rf8MosKBmBxAm+jRpopjYkS5vj2EiKzEvBg0z2P6RTEH/dP2n/GYfmVXA/uAI0ra13pMvyi+RLmrmpV1AND3AI56Tr8ItLCw5zynX2kHuNEh/ZgPaToX/SuiN3jWUGkHGEQPCt3oWUMetA9rHEECX31SaQcAOYpN07AsgI60uISFPxZAR+UdYKmDhp3E9fmYAWS1UtM9EkBL5R0A3M4BejSQFhceRdf7u0BaauEAFznomCLDlzA8cCtuWi8IpKcWDgByQoZLwd4UUFMrNyTomm6/DKipNg6wkPZn5bSz1YTfKXyLo7a9hA0Bq40DgJwG6lLIU8im0tzfyXNgALd3ftOcPtJQILVyAIB7HDQ17Q1kOOaLy4F/pNBzt0ctnaidA8wi/TFxozh+HMGR80j/9dSnKSeMrXYOANLsvuKgrdVeQPbqaQGn7TgOWdjJclDkVsK8jtqRqv6qdlTsJrI92WPIdq3NwB+RE0Z2N+woshJ5ErJhYzEyYfNJsm3i3Ibs/dMig32Ru/5ibAGaDBD3YdHPILucy6SWr4DpzALupfzKbrW7iCNyufYO0OQa3OcJfNou4GrPeU1D1zgAyGSR64yhD1tD2FNAXegqB2gygnTwQlX8ZsIc+ZaFrnSAJkuBX5HvW4GdbAKJVYj1a2FNutoBmiwEvg78lvwfjnwK+XBkbE19J1LVX5XmAbJyPPLBhyXAh4EzkbCs/ob1IAs2+4G3kenkV5GvfrxINY6lmU6q+usGB+g2UtVfu51Bddqm3W1odTPR+kM7B9CavGiONzHeh3bMzjutP7RzAO18m087yzFCs1S5/rbLTX5Oci9yK3FtKjWEHvQVU6cvl1yt3GQKWFmsdqMAVqHXm9NRu3OBg8qNjiJOYC1B+fQA30XfkjZOisOpXD/O/DKwAjgNGx2EZCawCLgO90CZn7S7Uacx/SDwGhIVY1SfceTYmvcdTdPb4Q//RdbdR/xpMgJyG/CbtH/qIX0gpFl8toHOD7pKP3KeTdmZMMtm2yjgWNo+3LZsm8Vl6ykwPrEX2YipHX5kVr4dQLbKeRmiDwL3oc8TmIW3cWSot7Bj7bUh69JuH3AJcAWyvj6EBEzYXEA49iLrNtuQfZEbqV7sgmEYhmEYhmEYhmEYhmEYhmEYnvk/IOetxTmdx/8AAAAASUVORK5CYII=";
const _sfc_main$4 = {
  __name: "ReconhecimentoFacial",
  __ssrInlineRender: true,
  setup(__props) {
    const video = ref(null);
    const devices = ref([]);
    const selectedDeviceId = ref("");
    const isDialogActiveBiometria = ref(false);
    const capturedPhoto = ref(null);
    const zoomLevel = ref(1);
    const tokenCookie = useCookie("auth_token");
    const token = tokenCookie.value;
    const pessoaNome = useCookie("user-data").value;
    const nomePessoa = pessoaNome.nome;
    const config = useRuntimeConfig();
    const enviarFoto = `${config.public.managemant}/upload`;
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
      context.drawImage(
        video.value,
        offsetX,
        offsetY,
        scaledWidth,
        scaledHeight
      );
      canvas.toBlob(async (blob) => {
        const formData = new FormData();
        formData.append("file", blob, `${nomePessoa}.jpg`);
        formData.append("pessoa_token", token);
        formData.append("bucket", "cartorio-teste");
        formData.append("tipo", "foto");
        const { status } = await useFetch(enviarFoto, {
          method: "POST",
          body: formData
        }, "$fRRPU47ULS");
        if (status.value === "success") {
          const photoUrl = URL.createObjectURL(blob);
          $toast.success("Imagem enviada!");
          capturedPhoto.value = photoUrl;
          closeDialog();
        } else {
          $toast.error("Erro ao enviar imagem para o sistema.");
        }
      }, "image/jpeg");
    };
    const handleDelete = () => {
      capturedPhoto.value = null;
    };
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
                        if (!unref(capturedPhoto)) {
                          _push4(`<img${ssrRenderAttr("src", _imports_0$2)}${_scopeId3}>`);
                        } else {
                          _push4(`<!---->`);
                        }
                        if (unref(capturedPhoto)) {
                          _push4(`<img${ssrRenderAttr("src", unref(capturedPhoto))} style="${ssrRenderStyle({ "width": "100%", "height": "100%", "object-fit": "cover" })}"${_scopeId3}>`);
                        } else {
                          _push4(`<!---->`);
                        }
                      } else {
                        return [
                          !unref(capturedPhoto) ? (openBlock(), createBlock("img", {
                            key: 0,
                            src: _imports_0$2
                          })) : createCommentVNode("", true),
                          unref(capturedPhoto) ? (openBlock(), createBlock("img", {
                            key: 1,
                            src: unref(capturedPhoto),
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
                        !unref(capturedPhoto) ? (openBlock(), createBlock("img", {
                          key: 0,
                          src: _imports_0$2
                        })) : createCommentVNode("", true),
                        unref(capturedPhoto) ? (openBlock(), createBlock("img", {
                          key: 1,
                          src: unref(capturedPhoto),
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
                                    _push6(ssrRenderComponent(VSelect, {
                                      items: unref(devices),
                                      modelValue: unref(selectedDeviceId),
                                      "onUpdate:modelValue": ($event) => isRef(selectedDeviceId) ? selectedDeviceId.value = $event : null,
                                      "item-title": "label",
                                      "item-value": "deviceId",
                                      label: "Selecionar Webcam"
                                    }, null, _parent6, _scopeId5));
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
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(VCol, null, {
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
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VRow, null, {
                          default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VCol, null, {
                                default: withCtx((_4, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(VBtn, { onClick: startVideo }, {
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
                                      createVNode(VBtn, { onClick: startVideo }, {
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
                                    createVNode(VBtn, { onClick: startVideo }, {
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
                                          _push7(`<video class="ml-3" width="640" height="480" autoplay style="${ssrRenderStyle({ transform: `scale(${unref(zoomLevel)})`, transformOrigin: "center center" })}"${_scopeId6}></video>`);
                                        } else {
                                          return [
                                            createVNode("video", {
                                              class: "ml-3",
                                              ref_key: "video",
                                              ref: video,
                                              width: "640",
                                              height: "480",
                                              autoplay: "",
                                              style: { transform: `scale(${unref(zoomLevel)})`, transformOrigin: "center center" }
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
                                            style: { transform: `scale(${unref(zoomLevel)})`, transformOrigin: "center center" }
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
                                          style: { transform: `scale(${unref(zoomLevel)})`, transformOrigin: "center center" }
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
                        _push4(ssrRenderComponent(VRow, { class: "mt-10 justify-space-around" }, {
                          default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<div${_scopeId4}><img style="${ssrRenderStyle({ "cursor": "pointer" })}"${ssrRenderAttr("src", _imports_0$4)} alt="Excluir"${_scopeId4}></div><div${_scopeId4}><img style="${ssrRenderStyle({ "cursor": "pointer" })}"${ssrRenderAttr("src", _imports_1)} alt="Salvar"${_scopeId4}></div>`);
                            } else {
                              return [
                                createVNode("div", { onClick: closeDialog }, [
                                  createVNode("img", {
                                    style: { "cursor": "pointer" },
                                    src: _imports_0$4,
                                    alt: "Excluir"
                                  })
                                ]),
                                createVNode("div", { onClick: handleCapture }, [
                                  createVNode("img", {
                                    style: { "cursor": "pointer" },
                                    src: _imports_1,
                                    alt: "Salvar"
                                  })
                                ])
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
                          }),
                          createVNode(VRow, null, {
                            default: withCtx(() => [
                              createVNode(VCol, null, {
                                default: withCtx(() => [
                                  createVNode(VBtn, { onClick: startVideo }, {
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
                                        style: { transform: `scale(${unref(zoomLevel)})`, transformOrigin: "center center" }
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
                          createVNode(VRow, { class: "mt-10 justify-space-around" }, {
                            default: withCtx(() => [
                              createVNode("div", { onClick: closeDialog }, [
                                createVNode("img", {
                                  style: { "cursor": "pointer" },
                                  src: _imports_0$4,
                                  alt: "Excluir"
                                })
                              ]),
                              createVNode("div", { onClick: handleCapture }, [
                                createVNode("img", {
                                  style: { "cursor": "pointer" },
                                  src: _imports_1,
                                  alt: "Salvar"
                                })
                              ])
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
                        }),
                        createVNode(VRow, null, {
                          default: withCtx(() => [
                            createVNode(VCol, null, {
                              default: withCtx(() => [
                                createVNode(VBtn, { onClick: startVideo }, {
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
                                      style: { transform: `scale(${unref(zoomLevel)})`, transformOrigin: "center center" }
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
                        createVNode(VRow, { class: "mt-10 justify-space-around" }, {
                          default: withCtx(() => [
                            createVNode("div", { onClick: closeDialog }, [
                              createVNode("img", {
                                style: { "cursor": "pointer" },
                                src: _imports_0$4,
                                alt: "Excluir"
                              })
                            ]),
                            createVNode("div", { onClick: handleCapture }, [
                              createVNode("img", {
                                style: { "cursor": "pointer" },
                                src: _imports_1,
                                alt: "Salvar"
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
            }, _parent2, _scopeId));
            _push2(`<img style="${ssrRenderStyle({ "width": "40px", "margin-left": "10px", "cursor": "pointer" })}"${ssrRenderAttr("src", _imports_4)} alt="Excluir"${_scopeId}>`);
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
                      !unref(capturedPhoto) ? (openBlock(), createBlock("img", {
                        key: 0,
                        src: _imports_0$2
                      })) : createCommentVNode("", true),
                      unref(capturedPhoto) ? (openBlock(), createBlock("img", {
                        key: 1,
                        src: unref(capturedPhoto),
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
                      }),
                      createVNode(VRow, null, {
                        default: withCtx(() => [
                          createVNode(VCol, null, {
                            default: withCtx(() => [
                              createVNode(VBtn, { onClick: startVideo }, {
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
                                    style: { transform: `scale(${unref(zoomLevel)})`, transformOrigin: "center center" }
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
                      createVNode(VRow, { class: "mt-10 justify-space-around" }, {
                        default: withCtx(() => [
                          createVNode("div", { onClick: closeDialog }, [
                            createVNode("img", {
                              style: { "cursor": "pointer" },
                              src: _imports_0$4,
                              alt: "Excluir"
                            })
                          ]),
                          createVNode("div", { onClick: handleCapture }, [
                            createVNode("img", {
                              style: { "cursor": "pointer" },
                              src: _imports_1,
                              alt: "Salvar"
                            })
                          ])
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
                src: _imports_4,
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
    `${config.public.biometria}/run-scanner`;
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
    const isPrintModalOpen = ref(false);
    const printHtml = ref("");
    const config = useRuntimeConfig();
    const impressao = `${config.public.managemant}/gerarRelatorio`;
    const openPrintModal = async () => {
      const response = await useFetch(impressao, {
        method: "GET"
      }, "$LOyFO5WGQE");
      printHtml.value = response.data.value;
      isPrintModalOpen.value = true;
    };
    const printContent = () => {
      const printContents = (void 0).getElementById("ficha-pessoa").innerHTML;
      const iframe = (void 0).createElement("iframe");
      (void 0).body.appendChild(iframe);
      const doc = iframe.contentWindow.document;
      doc.open();
      doc.write(printContents);
      doc.close();
      iframe.contentWindow.focus();
      iframe.contentWindow.print();
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_BiometriaScanner = _sfc_main$3;
      _push(ssrRenderComponent(VCol, mergeProps({ cols: "auto" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div style="${ssrRenderStyle({ "display": "flex", "flex-direction": "column" })}"${_scopeId}><img${ssrRenderAttr("src", _imports_0)} style="${ssrRenderStyle({ "width": "280px", "height": "120px", "cursor": "pointer" })}"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_BiometriaScanner, null, null, _parent2, _scopeId));
            _push2(`</div>`);
            _push2(ssrRenderComponent(VDialog, {
              modelValue: unref(isPrintModalOpen),
              "onUpdate:modelValue": ($event) => isRef(isPrintModalOpen) ? isPrintModalOpen.value = $event : null,
              "max-width": "800"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VCard, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VCardTitle, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<span${_scopeId4}>Dados para Impress\xE3o</span>`);
                            } else {
                              return [
                                createVNode("span", null, "Dados para Impress\xE3o")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VCardText, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            var _a;
                            if (_push5) {
                              _push5(`<div id="ficha-pessoa"${_scopeId4}><div${_scopeId4}>${(_a = unref(printHtml)) != null ? _a : ""}</div></div>`);
                            } else {
                              return [
                                createVNode("div", {
                                  id: "ficha-pessoa",
                                  ref: "printContent"
                                }, [
                                  createVNode("div", { innerHTML: unref(printHtml) }, null, 8, ["innerHTML"])
                                ], 512)
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
                                onClick: printContent
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Imprimir`);
                                  } else {
                                    return [
                                      createTextVNode("Imprimir")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(VBtn, {
                                color: "red",
                                onClick: ($event) => isPrintModalOpen.value = false
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Fechar`);
                                  } else {
                                    return [
                                      createTextVNode("Fechar")
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
                                  onClick: printContent
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode("Imprimir")
                                  ]),
                                  _: 1
                                }),
                                createVNode(VBtn, {
                                  color: "red",
                                  onClick: ($event) => isPrintModalOpen.value = false
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode("Fechar")
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
                          createVNode(VCardTitle, null, {
                            default: withCtx(() => [
                              createVNode("span", null, "Dados para Impress\xE3o")
                            ]),
                            _: 1
                          }),
                          createVNode(VCardText, null, {
                            default: withCtx(() => [
                              createVNode("div", {
                                id: "ficha-pessoa",
                                ref: "printContent"
                              }, [
                                createVNode("div", { innerHTML: unref(printHtml) }, null, 8, ["innerHTML"])
                              ], 512)
                            ]),
                            _: 1
                          }),
                          createVNode(VCardActions, null, {
                            default: withCtx(() => [
                              createVNode(VSpacer),
                              createVNode(VBtn, {
                                color: "green",
                                onClick: printContent
                              }, {
                                default: withCtx(() => [
                                  createTextVNode("Imprimir")
                                ]),
                                _: 1
                              }),
                              createVNode(VBtn, {
                                color: "red",
                                onClick: ($event) => isPrintModalOpen.value = false
                              }, {
                                default: withCtx(() => [
                                  createTextVNode("Fechar")
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
                        createVNode(VCardTitle, null, {
                          default: withCtx(() => [
                            createVNode("span", null, "Dados para Impress\xE3o")
                          ]),
                          _: 1
                        }),
                        createVNode(VCardText, null, {
                          default: withCtx(() => [
                            createVNode("div", {
                              id: "ficha-pessoa",
                              ref: "printContent"
                            }, [
                              createVNode("div", { innerHTML: unref(printHtml) }, null, 8, ["innerHTML"])
                            ], 512)
                          ]),
                          _: 1
                        }),
                        createVNode(VCardActions, null, {
                          default: withCtx(() => [
                            createVNode(VSpacer),
                            createVNode(VBtn, {
                              color: "green",
                              onClick: printContent
                            }, {
                              default: withCtx(() => [
                                createTextVNode("Imprimir")
                              ]),
                              _: 1
                            }),
                            createVNode(VBtn, {
                              color: "red",
                              onClick: ($event) => isPrintModalOpen.value = false
                            }, {
                              default: withCtx(() => [
                                createTextVNode("Fechar")
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
              createVNode("div", { style: { "display": "flex", "flex-direction": "column" } }, [
                createVNode("img", {
                  onClick: openPrintModal,
                  src: _imports_0,
                  style: { "width": "280px", "height": "120px", "cursor": "pointer" }
                }),
                createVNode(_component_BiometriaScanner)
              ]),
              createVNode(VDialog, {
                modelValue: unref(isPrintModalOpen),
                "onUpdate:modelValue": ($event) => isRef(isPrintModalOpen) ? isPrintModalOpen.value = $event : null,
                "max-width": "800"
              }, {
                default: withCtx(() => [
                  createVNode(VCard, null, {
                    default: withCtx(() => [
                      createVNode(VCardTitle, null, {
                        default: withCtx(() => [
                          createVNode("span", null, "Dados para Impress\xE3o")
                        ]),
                        _: 1
                      }),
                      createVNode(VCardText, null, {
                        default: withCtx(() => [
                          createVNode("div", {
                            id: "ficha-pessoa",
                            ref: "printContent"
                          }, [
                            createVNode("div", { innerHTML: unref(printHtml) }, null, 8, ["innerHTML"])
                          ], 512)
                        ]),
                        _: 1
                      }),
                      createVNode(VCardActions, null, {
                        default: withCtx(() => [
                          createVNode(VSpacer),
                          createVNode(VBtn, {
                            color: "green",
                            onClick: printContent
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Imprimir")
                            ]),
                            _: 1
                          }),
                          createVNode(VBtn, {
                            color: "red",
                            onClick: ($event) => isPrintModalOpen.value = false
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Fechar")
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
  _push(ssrRenderComponent(_component_NuxtLink, { to: "/pessoas/registros" }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<img class="mt-15"${ssrRenderAttr("src", _imports_0$4)} alt="Sair"${_scopeId}>`);
      } else {
        return [
          createVNode("img", {
            class: "mt-15",
            src: _imports_0$4,
            alt: "Sair"
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

export { VTabs as V, _sfc_main$7 as _, VTab as a, VTabsWindow as b, VTabsWindowItem as c, _sfc_main$6 as d, __nuxt_component_3 as e, __nuxt_component_4 as f };
//# sourceMappingURL=Restricoes-D--JjpQV.mjs.map
