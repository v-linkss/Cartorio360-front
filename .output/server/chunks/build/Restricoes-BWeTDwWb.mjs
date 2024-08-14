import { ref, computed, shallowRef, watch, provide, createVNode, withDirectives, resolveDirective, inject, vShow, mergeProps, Fragment, toRef, useSSRContext, nextTick, reactive, withAsyncContext, unref, withCtx, openBlock, createBlock, isRef, createTextVNode } from 'vue';
import { p as propsFactory, m as makeComponentProps, h as makeTagProps, F as makeThemeProps, j as genericComponent, H as provideTheme, Y as useRtl, a3 as useLocale, aI as useGroup, an as VBtn, o as useRender, aJ as makeGroupItemProps, aK as makeLazyProps, aL as useGroupItem, aM as useSsrBoot, aN as useLazy, aO as MaybeTransition, a0 as omit, aP as makeVBtnProps, a6 as useTextColor, aa as forwardRefs, a4 as useProxiedModel, aS as makeVSlideGroupProps, s as makeDensityProps, L as useDensity, av as useBackgroundColor, aD as useScopeId, l as provideDefaults, aT as VSlideGroup, as as convertToUnit, aQ as animate, aR as standardEasing, aU as isObject, c as useNuxtApp, aF as useRoute$1, al as useCookie, V as VTextField, aV as VDataTable, am as VSpacer, U as VImg, ao as VSelect, _ as _export_sfc, aH as keys, b as useRuntimeConfig } from './server.mjs';
import { _ as __nuxt_component_0 } from './nuxt-link-DyZc7qn_.mjs';
import { b as useLazyAsyncData, a as useFetch } from './fetch-3DdSDKmI.mjs';
import { _ as __unimport_formatDate } from './formatDate-B6RUKh9-.mjs';
import { ssrRenderComponent, ssrRenderStyle, ssrRenderAttr, ssrGetDirectiveProps, ssrRenderAttrs } from 'vue/server-renderer';
import { _ as _imports_0, a as _imports_2, b as _imports_3, c as _imports_4 } from './mudarStatus-BMovbU8H.mjs';
import { V as VRow, _ as _imports_0$1 } from './sair-B9PBMH_8.mjs';
import { useVuelidate } from '@vuelidate/core';
import { helpers, required } from '@vuelidate/validators';
import { V as VContainer } from './VContainer-Mst0JKJ7.mjs';
import { V as VCol } from './VCol-QAPwXCIJ.mjs';
import { V as VAutocomplete } from './VAutocomplete-BYlFWgTC.mjs';
import { V as VDialog } from './VDialog-TcN6Okkn.mjs';
import { V as VCard, a as VCardTitle, b as VCardText, c as VCardActions } from './VCard-Bi_-FQxd.mjs';
import { _ as _imports_0$2, a as _imports_1, V as VSlider } from './camera-Bklyje9c.mjs';
import { _ as _imports_1$1 } from './salvar-BNBeYWMa.mjs';

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
const _sfc_main$3 = {
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
      const _component_NuxtLink = __nuxt_component_0;
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
                    _push3(`<div class="mt-3"${_scopeId2}><img style="${ssrRenderStyle({ "width": "40px", "height": "40px", "cursor": "pointer" })}"${ssrRenderAttr("src", _imports_0)} alt="novo"${_scopeId2}></div>`);
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
                          src: _imports_0,
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
                    _push3(`<img class="btn-pointer"${ssrRenderAttr("src", _imports_0$1)} alt="Sair"${_scopeId2}>`);
                  } else {
                    return [
                      createVNode("img", {
                        class: "btn-pointer",
                        src: _imports_0$1,
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
                        src: _imports_0,
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
                      src: _imports_0$1,
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
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Documentos.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = {
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
      const _component_NuxtLink = __nuxt_component_0;
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
                    _push3(`<div class="mt-3"${_scopeId2}><img style="${ssrRenderStyle({ "width": "40px", "height": "40px", "cursor": "pointer" })}"${ssrRenderAttr("src", _imports_0)} alt="novo"${_scopeId2}></div>`);
                    _push3(ssrRenderComponent(VCol, { md: "6" }, {
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
                    _push3(ssrRenderComponent(VCol, { md: "2" }, {
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
                          src: _imports_0,
                          alt: "novo",
                          onClick: onSubmit
                        })
                      ]),
                      createVNode(VCol, { md: "6" }, {
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
                      createVNode(VCol, { md: "2" }, {
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
                    _push3(`<img class="btn-pointer"${ssrRenderAttr("src", _imports_0$1)} alt="Sair"${_scopeId2}>`);
                  } else {
                    return [
                      createVNode("img", {
                        class: "btn-pointer",
                        src: _imports_0$1,
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
                        src: _imports_0,
                        alt: "novo",
                        onClick: onSubmit
                      })
                    ]),
                    createVNode(VCol, { md: "6" }, {
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
                    createVNode(VCol, { md: "2" }, {
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
                      src: _imports_0$1,
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
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Endereco.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _imports_5 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAABHNCSVQICAgIfAhkiAAAAAFzUkdCAK7OHOkAAAAEZ0FNQQAAsY8L/GEFAAAACXBIWXMAAA7CAAAOwgEVKEqAAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAABg5JREFUeF7tm2tsFFUUgM+52/KQRxANSvnhP42/fBAFK8Lu0t0SGk3AQEx8xEdot41RkASIohWEgAqC/nB3wUQjBI1EGiNWurvt9oHlkZT4R4zRGP0hBWN5RUXazj2emT0dKbNbijt9bHe/5Obec+5sZ+655545M52LkIZlny2b/Me5i28g0BIAPZO0GodKOnME0gCodDeA6iTAuptvnPrq/uX7/5RuG4cBvOFFb6FHr0SCYlGNDTT1kIJ3klXxdaKxsA1QW1tbdLik/Ru21v2iGpMQ4bH5nXPnbdiwodeUbcdundnePtYHb4JIc1pL2ttETBnAcnvE+yxNHoCAc/2RwBarbQW88xfOplvzmuBMkYatOJn2xZ+K/y7qnCDwcWCGvgSP8xjW8uTeIur/0Lrngjo3DX3R8h0c7VeK2kaTjjWHEuUi2vijwVe42pSSnDRVxdAbDbQrwAdENVys53NvlnY//JFgnKe9TEQbJNquUre6/pgzn27wV2IAdHFE+dVRGF5XnWn7hqBY13ENmkKxABGdEdFGAz2K3nDwslIwTnQWyoBViZrYThH70ecBhFCZrIztTmlHDt+u4Apevru4mdEDTPy7y1aDVttEFHS34sE7135x7yfSHDP0TJiyT5pXoIrNu4AjGWpa0eRwl1yn7cm6TmleSa4luO7jugEWfLhggjdSttAXCVZz9PWJetTiqgFKP3hkiqd7/CVeUyu5TAWCdWyIk6ZR5JBRh6sGGN/zzxIC2JsMJR7mW8+bTdWxckS4U12esFgOGXW4uwQU3AWEdSLZcMJxtzRHHa4aADVNROQE9GqQJkpr1FEktSuQh9q0Vh95w4GlC06XHmmd1e7llJE0qmY5JC0cLGv5Zvy6iIPCAH28pSoxR8T/jWsewMHuGd1LezwIM5TCw20lRy4jYSOfAZWmOn80sEwOdUAKv+f0u+56Cv/ZpPw8K5BTW45b/TEfaKTpIF0q7AuXLUalvjDAMMZB8dO92ngOlL4DyXOS8+16hbjdMAxdhEXljdUNA3rD9TLYVNgk3VizXgK+SPlSRPpca/i6pbqxL9p/KnUf7/neD7aRInPWHMa95hIg2MJ3lZdFcpWslwCStl6kIOg9loLxRgIv+MPBc75o8FlRmQdkfHBiLznEg1yVqbC3HZRDXSf7GKDgdrNC9PxgyYzixW8oQ/FdwZ5tXgY/StNBcyh+jGd4Z6aSrIq1y6Guk/1dgHCS6dSk4S/RcAxJvMuVWWy0h7pRi3AVvl3ly0nTYyIOCC+jjS2V8W9FzBp3EyGBI/4aM+B4o4EaUQ2I7va0clTfNJgy8ZLnZ/mZKwyJAYjUT0T6IC+BX0Q1IC3P159uCjWcGEw59OKhi/IzVxgSAyRDDQfM54FkdaJeVKOWrA3AQWqRmTckaxrsIJiO5IpYx0D5xUgxJB6QS+S9AbJOhb3hYD0pmJ3qHT74ltrRXB1bnG0qnLUHKAWTPAZMHe5inlcuIStceRgaSUbcA3KdrD2A5a849bk31Tuc4Am+zooR9wDi9ciP+tOHu5jnlUvIikIMkDpvydoDfJGyLzWqe1K97sGzerw5FFsqYkZG3AP45NPBMG51uyjz7w4DhRggdd5SMIDUeUvBAFLnLQUDSJ23FAwgdd5SMIDUeUvBAFLnLaYBHE9I/t1+5waDHKciXDFLmjYaiNJ+Lo9ALzVWxXeI2I++x2HzO30PkWMb2lBASlUkKxu+80cCjv82G4iTPQA3cXPAx+HMn8sjnRLJRhOslWZGrJMi3jYcBTWMt06apk8Gf20MWCMtGyL1W8YtM7wwEk2hWECknMYXDiRQ4UIRbcwtM9amqa6u82dBoWPjhLnNBD30NvvE3lzbQ5CKY+oJa+ZRzRC1DRH0XMSuadarL180sBUBr+n2YwYO+6Roc7Iyvt5+97cwGjiWDxsnTUjT0WR13NrVZucB806VPmhuKxVxbGLOPNDR+adLHxKN+YFbf6wdlUSrQakxtXnaXPOkYVtzTf8vTtO+/p4dnX3DNJq+0dpXR1Aixsj4qnyUwmOmbiA8pYAOnMezr3VUdfwtfQLAvzMJ5YQdJY7eAAAAAElFTkSuQmCC";
const _sfc_main$1 = {
  __name: "Biometria",
  __ssrInlineRender: true,
  setup(__props) {
    const video = ref(null);
    const devices = ref([]);
    const selectedDeviceId = ref("");
    const isDialogActiveBiometria = ref(false);
    const zoomLevel = ref(1);
    const tokenCookie = useCookie("auth_token");
    const token = tokenCookie.value;
    const pessoaNome = useCookie("user-data").value;
    const nomePessoa = pessoaNome.nome;
    const config = useRuntimeConfig();
    const enviarFoto = `${config.public.managemant}/uploadFaceId`;
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
        const { status } = await useFetch(enviarFoto, {
          method: "POST",
          body: formData
        }, "$Rc7uHa9zmE");
        if (status.value === "success") {
          $toast.success("Imagem enviada!");
          closeDialog();
        } else {
          $toast.error("Erro ao enviar imagem para o sistema.");
        }
      }, "image/jpeg");
    };
    const printPage = () => {
      (void 0).print();
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<!--[-->`);
      _push(ssrRenderComponent(VRow, { class: "d-flex align-items-center justify-space-between" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VCol, { cols: "auto" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VImg, {
                    src: _imports_0$2,
                    width: 500,
                    class: "mr-4"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VImg, {
                      src: _imports_0$2,
                      width: 500,
                      class: "mr-4"
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(VCol, { cols: "auto" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VDialog, {
                    "max-width": "700",
                    modelValue: unref(isDialogActiveBiometria),
                    "onUpdate:modelValue": ($event) => isRef(isDialogActiveBiometria) ? isDialogActiveBiometria.value = $event : null
                  }, {
                    activator: withCtx(({ props: activatorProps }, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VBtn, mergeProps(activatorProps, {
                          variant: "outlined",
                          style: { "width": "300px", "height": "300px" },
                          onClick: openDialog
                        }), {
                          default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<img${ssrRenderAttr("src", _imports_1)}${_scopeId4}>`);
                            } else {
                              return [
                                createVNode("img", { src: _imports_1 })
                              ];
                            }
                          }),
                          _: 2
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VBtn, mergeProps(activatorProps, {
                            variant: "outlined",
                            style: { "width": "300px", "height": "300px" },
                            onClick: openDialog
                          }), {
                            default: withCtx(() => [
                              createVNode("img", { src: _imports_1 })
                            ]),
                            _: 2
                          }, 1040)
                        ];
                      }
                    }),
                    default: withCtx(({ isActive }, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VCard, { title: "Biometria" }, {
                          default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VRow, null, {
                                default: withCtx((_4, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(VCol, null, {
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
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(VRow, null, {
                                default: withCtx((_4, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(VCol, null, {
                                      default: withCtx((_5, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(VBtn, { onClick: startVideo }, {
                                            default: withCtx((_6, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(`Exibir`);
                                              } else {
                                                return [
                                                  createTextVNode("Exibir")
                                                ];
                                              }
                                            }),
                                            _: 2
                                          }, _parent7, _scopeId6));
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
                                    }, _parent6, _scopeId5));
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
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(VRow, null, {
                                default: withCtx((_4, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(VContainer, { style: { "overflow": "hidden" } }, {
                                      default: withCtx((_5, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(VCol, null, {
                                            default: withCtx((_6, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(`<video class="ml-3" width="640" height="480" autoplay style="${ssrRenderStyle({ transform: `scale(${unref(zoomLevel)})`, transformOrigin: "center center" })}"${_scopeId7}></video>`);
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
                                          }, _parent7, _scopeId6));
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
                                    }, _parent6, _scopeId5));
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
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(VContainer, null, {
                                default: withCtx((_4, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(VSlider, {
                                      modelValue: unref(zoomLevel),
                                      "onUpdate:modelValue": ($event) => isRef(zoomLevel) ? zoomLevel.value = $event : null,
                                      min: 1,
                                      max: 3,
                                      step: "0.1",
                                      label: "Zoom"
                                    }, null, _parent6, _scopeId5));
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
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(VRow, { class: "mt-10 justify-space-around" }, {
                                default: withCtx((_4, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`<div${_scopeId5}><img style="${ssrRenderStyle({ "cursor": "pointer" })}"${ssrRenderAttr("src", _imports_0$1)} alt="Excluir"${_scopeId5}></div><div${_scopeId5}><img style="${ssrRenderStyle({ "cursor": "pointer" })}"${ssrRenderAttr("src", _imports_1$1)} alt="Salvar"${_scopeId5}></div>`);
                                  } else {
                                    return [
                                      createVNode("div", { onClick: closeDialog }, [
                                        createVNode("img", {
                                          style: { "cursor": "pointer" },
                                          src: _imports_0$1,
                                          alt: "Excluir"
                                        })
                                      ]),
                                      createVNode("div", { onClick: handleCapture }, [
                                        createVNode("img", {
                                          style: { "cursor": "pointer" },
                                          src: _imports_1$1,
                                          alt: "Salvar"
                                        })
                                      ])
                                    ];
                                  }
                                }),
                                _: 2
                              }, _parent5, _scopeId4));
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
                                        src: _imports_0$1,
                                        alt: "Excluir"
                                      })
                                    ]),
                                    createVNode("div", { onClick: handleCapture }, [
                                      createVNode("img", {
                                        style: { "cursor": "pointer" },
                                        src: _imports_1$1,
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
                        }, _parent4, _scopeId3));
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
                                      src: _imports_0$1,
                                      alt: "Excluir"
                                    })
                                  ]),
                                  createVNode("div", { onClick: handleCapture }, [
                                    createVNode("img", {
                                      style: { "cursor": "pointer" },
                                      src: _imports_1$1,
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
                  }, _parent3, _scopeId2));
                  _push3(`<img class="btn-pointer" style="${ssrRenderStyle({ "width": "40px", "margin-left": "10px" })}"${ssrRenderAttr("src", _imports_4)} alt="Excluir"${_scopeId2}>`);
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
                            createVNode("img", { src: _imports_1 })
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
                                    src: _imports_0$1,
                                    alt: "Excluir"
                                  })
                                ]),
                                createVNode("div", { onClick: handleCapture }, [
                                  createVNode("img", {
                                    style: { "cursor": "pointer" },
                                    src: _imports_1$1,
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
                      class: "btn-pointer",
                      style: { "width": "40px", "margin-left": "10px" },
                      src: _imports_4,
                      alt: "Excluir"
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(VCol, { cols: "auto" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VBtn, {
                    variant: "outlined",
                    style: { "width": "200px", "height": "200px" },
                    onClick: printPage
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<img${ssrRenderAttr("src", _imports_5)} style="${ssrRenderStyle({ "width": "180px", "height": "180px" })}"${_scopeId3}>`);
                      } else {
                        return [
                          createVNode("img", {
                            src: _imports_5,
                            style: { "width": "180px", "height": "180px" }
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VBtn, {
                      variant: "outlined",
                      style: { "width": "200px", "height": "200px" },
                      onClick: printPage
                    }, {
                      default: withCtx(() => [
                        createVNode("img", {
                          src: _imports_5,
                          style: { "width": "180px", "height": "180px" }
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
              createVNode(VCol, { cols: "auto" }, {
                default: withCtx(() => [
                  createVNode(VImg, {
                    src: _imports_0$2,
                    width: 500,
                    class: "mr-4"
                  })
                ]),
                _: 1
              }),
              createVNode(VCol, { cols: "auto" }, {
                default: withCtx(() => [
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
                          createVNode("img", { src: _imports_1 })
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
                                  src: _imports_0$1,
                                  alt: "Excluir"
                                })
                              ]),
                              createVNode("div", { onClick: handleCapture }, [
                                createVNode("img", {
                                  style: { "cursor": "pointer" },
                                  src: _imports_1$1,
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
                    class: "btn-pointer",
                    style: { "width": "40px", "margin-left": "10px" },
                    src: _imports_4,
                    alt: "Excluir"
                  })
                ]),
                _: 1
              }),
              createVNode(VCol, { cols: "auto" }, {
                default: withCtx(() => [
                  createVNode(VBtn, {
                    variant: "outlined",
                    style: { "width": "200px", "height": "200px" },
                    onClick: printPage
                  }, {
                    default: withCtx(() => [
                      createVNode("img", {
                        src: _imports_5,
                        style: { "width": "180px", "height": "180px" }
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
      _push(ssrRenderComponent(_component_NuxtLink, { to: "/pessoas/registros" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<img class="mt-15"${ssrRenderAttr("src", _imports_0$1)} alt="Sair"${_scopeId}>`);
          } else {
            return [
              createVNode("img", {
                class: "mt-15",
                src: _imports_0$1,
                alt: "Sair"
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Biometria.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
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

export { VTabs as V, _sfc_main$3 as _, VTab as a, VTabsWindow as b, VTabsWindowItem as c, _sfc_main$2 as d, _sfc_main$1 as e, __nuxt_component_4 as f };
//# sourceMappingURL=Restricoes-BWeTDwWb.mjs.map
