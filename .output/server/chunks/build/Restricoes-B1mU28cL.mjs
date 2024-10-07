import { a as buildAssetsURL } from '../routes/renderer.mjs';
import { ref, computed, shallowRef, watch, provide, createVNode, withDirectives, resolveDirective, inject, vShow, toRef, mergeProps, Fragment, useSSRContext, withCtx, nextTick, reactive, withAsyncContext, unref, openBlock, createBlock, isRef, createTextVNode, renderList, toDisplayString, createCommentVNode } from 'vue';
import { p as wn, y as _n, A as vo, O as jl$1, o as $n, Q as Wl$1, a5 as al, ab as tl, aw as _o, V as br, t as zn, ax as Co, ay as xi, az as wo, aA as hs, aB as Si, aC as Ar, M as uo, H as io, R as hr, X as so, ad as fo, aD as Rt, aH as Yr, a0 as co, aJ as mo, aK as Yi, aL as as, aE as ta, aG as ea$1, q as Un, aF as Lt, aM as Ki, aN as ns, aO as Hi, a8 as Gt, aP as yr, v as $i, aS as Vs, C as oo, aT as Nt, U as ro, s as Ci, z as Fn, aU as Bs, _ as jc, av as zt, aQ as Fa, aR as Rn, f as Ue, c as Qe, b as Ye, d as Ct, e as is, at as Dc, as as Sr, a2 as gs, aI as Wt, aV as Iu } from './server.mjs';
import { g as g$1 } from './nuxt-link-P_iIRbMa.mjs';
import { v, g as g$2 } from './fetch-D2ZU2xOO.mjs';
import { t } from './formatDate-Dt3m51Lf.mjs';
import { ssrRenderComponent, ssrRenderAttr, ssrRenderAttrs, ssrRenderStyle, ssrGetDirectiveProps, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
import { A as A$1, B, g, a } from './mudarStatus-COPzM8_6.mjs';
import { A } from './sair-ToPptOUL.mjs';
import { useVuelidate } from '@vuelidate/core';
import { helpers, required } from '@vuelidate/validators';
import { i } from './VContainer-Dwlw6VVY.mjs';
import { $ } from './VRow-Ca2v9sIW.mjs';
import { y } from './VCol-CrrHdFZ4.mjs';
import { L } from './VAutocomplete-yDrVnvO6.mjs';
import { $ as $$1, o as oe, l as le, i as ie, e as ee } from './VCard-zlRMnW-z.mjs';
import { A as A$2 } from './salvar-37abXc2X.mjs';

const ul = (e2) => {
  const { touchstartX: l2, touchendX: a2, touchstartY: o2, touchendY: t2 } = e2;
  e2.offsetX = a2 - l2, e2.offsetY = t2 - o2, Math.abs(e2.offsetY) < 0.5 * Math.abs(e2.offsetX) && (e2.left && a2 < l2 - 16 && e2.left(e2), e2.right && a2 > l2 + 16 && e2.right(e2)), Math.abs(e2.offsetX) < 0.5 * Math.abs(e2.offsetY) && (e2.up && t2 < o2 - 16 && e2.up(e2), e2.down && t2 > o2 + 16 && e2.down(e2));
};
function il() {
  let e2 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
  const l2 = { touchstartX: 0, touchstartY: 0, touchendX: 0, touchendY: 0, touchmoveX: 0, touchmoveY: 0, offsetX: 0, offsetY: 0, left: e2.left, right: e2.right, up: e2.up, down: e2.down, start: e2.start, move: e2.move, end: e2.end };
  return { touchstart: (e3) => function(e4, l3) {
    var a2;
    const o2 = e4.changedTouches[0];
    l3.touchstartX = o2.clientX, l3.touchstartY = o2.clientY, null == (a2 = l3.start) || a2.call(l3, { originalEvent: e4, ...l3 });
  }(e3, l2), touchend: (e3) => function(e4, l3) {
    var a2;
    const o2 = e4.changedTouches[0];
    l3.touchendX = o2.clientX, l3.touchendY = o2.clientY, null == (a2 = l3.end) || a2.call(l3, { originalEvent: e4, ...l3 }), ul(l3);
  }(e3, l2), touchmove: (e3) => function(e4, l3) {
    var a2;
    const o2 = e4.changedTouches[0];
    l3.touchmoveX = o2.clientX, l3.touchmoveY = o2.clientY, null == (a2 = l3.move) || a2.call(l3, { originalEvent: e4, ...l3 });
  }(e3, l2) };
}
const rl = { mounted: function(e2, l2) {
  var _a, _b;
  var a2;
  const o2 = l2.value, t2 = (null == o2 ? void 0 : o2.parent) ? e2.parentElement : e2, d2 = (_a = null == o2 ? void 0 : o2.options) != null ? _a : { passive: true }, u2 = null == (a2 = l2.instance) ? void 0 : a2.$.uid;
  if (!t2 || !u2)
    return;
  const i2 = il(l2.value);
  t2._touchHandlers = (_b = t2._touchHandlers) != null ? _b : /* @__PURE__ */ Object.create(null), t2._touchHandlers[u2] = i2, zt(i2).forEach((e3) => {
    t2.addEventListener(e3, i2[e3], d2);
  });
}, unmounted: function(e2, l2) {
  var a2, o2;
  const t2 = (null == (a2 = l2.value) ? void 0 : a2.parent) ? e2.parentElement : e2, d2 = null == (o2 = l2.instance) ? void 0 : o2.$.uid;
  if (!(null == t2 ? void 0 : t2._touchHandlers) || !d2)
    return;
  const u2 = t2._touchHandlers[d2];
  zt(u2).forEach((e3) => {
    t2.removeEventListener(e3, u2[e3]);
  }), delete t2._touchHandlers[d2];
} }, nl = rl, sl = Symbol.for("vuetify:v-window"), ml = Symbol.for("vuetify:v-window-group"), cl = wn({ continuous: Boolean, nextIcon: { type: [Boolean, String, Function, Object], default: "$next" }, prevIcon: { type: [Boolean, String, Function, Object], default: "$prev" }, reverse: Boolean, showArrows: { type: [Boolean, String], validator: (e2) => "boolean" == typeof e2 || "hover" === e2 }, touch: { type: [Object, Boolean], default: void 0 }, direction: { type: String, default: "horizontal" }, modelValue: null, disabled: Boolean, selectedClass: { type: String, default: "v-window-item--active" }, mandatory: { type: [Boolean, String], default: "force" }, ..._n(), ...vo(), ...jl$1() }, "VWindow"), pl = $n()({ name: "VWindow", directives: { Touch: rl }, props: cl(), emits: { "update:modelValue": (e2) => true }, setup(r2, n2) {
  let { slots: s2 } = n2;
  const { themeClasses: m2 } = Wl$1(r2), { isRtl: c2 } = al(), { t: p2 } = tl(), v2 = _o(r2, ml), f2 = ref(), V2 = computed(() => c2.value ? !r2.reverse : r2.reverse), _2 = shallowRef(false), b2 = computed(() => `v-window-${"vertical" === r2.direction ? "y" : "x"}${(V2.value ? !_2.value : _2.value) ? "-reverse" : ""}-transition`), g2 = shallowRef(0), h2 = ref(void 0), y2 = computed(() => v2.items.value.findIndex((e2) => v2.selected.value.includes(e2.id)));
  watch(y2, (e2, l2) => {
    const a2 = v2.items.value.length, o2 = a2 - 1;
    _2.value = a2 <= 2 ? e2 < l2 : e2 === o2 && 0 === l2 || (0 !== e2 || l2 !== o2) && e2 < l2;
  }), provide(sl, { transition: b2, isReversed: _2, transitionCount: g2, transitionHeight: h2, rootRef: f2 });
  const U2 = computed(() => r2.continuous || 0 !== y2.value), C2 = computed(() => r2.continuous || y2.value !== v2.items.value.length - 1);
  function x2() {
    U2.value && v2.prev();
  }
  function k2() {
    C2.value && v2.next();
  }
  const $2 = computed(() => {
    const e2 = [], l2 = { icon: c2.value ? r2.nextIcon : r2.prevIcon, class: "v-window__" + (V2.value ? "right" : "left"), onClick: v2.prev, "aria-label": p2("$vuetify.carousel.prev") };
    e2.push(U2.value ? s2.prev ? s2.prev({ props: l2 }) : createVNode(br, l2, null) : createVNode("div", null, null));
    const a2 = { icon: c2.value ? r2.prevIcon : r2.nextIcon, class: "v-window__" + (V2.value ? "left" : "right"), onClick: v2.next, "aria-label": p2("$vuetify.carousel.next") };
    return e2.push(C2.value ? s2.next ? s2.next({ props: a2 }) : createVNode(br, a2, null) : createVNode("div", null, null)), e2;
  }), w2 = computed(() => {
    if (false === r2.touch)
      return r2.touch;
    return { ...{ left: () => {
      V2.value ? x2() : k2();
    }, right: () => {
      V2.value ? k2() : x2();
    }, start: (e2) => {
      let { originalEvent: l2 } = e2;
      l2.stopPropagation();
    } }, ...true === r2.touch ? {} : r2.touch };
  });
  return zn(() => withDirectives(createVNode(r2.tag, { ref: f2, class: ["v-window", { "v-window--show-arrows-on-hover": "hover" === r2.showArrows }, m2.value, r2.class], style: r2.style }, { default: () => {
    var e2, l2;
    return [createVNode("div", { class: "v-window__container", style: { height: h2.value } }, [null == (e2 = s2.default) ? void 0 : e2.call(s2, { group: v2 }), false !== r2.showArrows && createVNode("div", { class: "v-window__controls" }, [$2.value])]), null == (l2 = s2.additional) ? void 0 : l2.call(s2, { group: v2 })];
  } }), [[resolveDirective("touch"), w2.value]])), { group: v2 };
} }), vl = wn({ reverseTransition: { type: [Boolean, String], default: void 0 }, transition: { type: [Boolean, String], default: void 0 }, ..._n(), ...Co(), ...xi() }, "VWindowItem"), fl = $n()({ name: "VWindowItem", directives: { Touch: nl }, props: vl(), emits: { "group:selected": (e2) => true }, setup(e2, o2) {
  let { slots: t2 } = o2;
  const i2 = inject(sl), m2 = wo(e2, ml), { isBooted: c2 } = hs();
  if (!i2 || !m2)
    throw new Error("[Vuetify] VWindowItem must be used inside VWindow");
  const p2 = shallowRef(false), v2 = computed(() => c2.value && (i2.isReversed.value ? false !== e2.reverseTransition : false !== e2.transition));
  function f2() {
    p2.value && i2 && (p2.value = false, i2.transitionCount.value > 0 && (i2.transitionCount.value -= 1, 0 === i2.transitionCount.value && (i2.transitionHeight.value = void 0)));
  }
  function V2() {
    var e3;
    !p2.value && i2 && (p2.value = true, 0 === i2.transitionCount.value && (i2.transitionHeight.value = Rt(null == (e3 = i2.rootRef.value) ? void 0 : e3.clientHeight)), i2.transitionCount.value += 1);
  }
  function _2() {
    f2();
  }
  function b2(e3) {
    p2.value && nextTick(() => {
      v2.value && p2.value && i2 && (i2.transitionHeight.value = Rt(e3.clientHeight));
    });
  }
  const g2 = computed(() => {
    const l2 = i2.isReversed.value ? e2.reverseTransition : e2.transition;
    return !!v2.value && { name: "string" != typeof l2 ? i2.transition.value : l2, onBeforeEnter: V2, onAfterEnter: f2, onEnterCancelled: _2, onBeforeLeave: V2, onAfterLeave: f2, onLeaveCancelled: _2, onEnter: b2 };
  }), { hasContent: h2 } = Si(e2, m2.isSelected);
  return zn(() => createVNode(Ar, { transition: g2.value, disabled: !c2.value }, { default: () => {
    var l2;
    return [withDirectives(createVNode("div", { class: ["v-window-item", m2.selectedClass.value, e2.class], style: e2.style }, [h2.value && (null == (l2 = t2.default) ? void 0 : l2.call(t2))]), [[vShow, m2.isSelected.value]])];
  } })), { groupItem: m2 };
} }), Vl = Symbol.for("vuetify:v-slider");
const _l = wn({ disabled: { type: Boolean, default: null }, error: Boolean, readonly: { type: Boolean, default: null }, max: { type: [Number, String], default: 100 }, min: { type: [Number, String], default: 0 }, step: { type: [Number, String], default: 0 }, thumbColor: String, thumbLabel: { type: [Boolean, String], default: void 0, validator: (e2) => "boolean" == typeof e2 || "always" === e2 }, thumbSize: { type: [Number, String], default: 20 }, showTicks: { type: [Boolean, String], default: false, validator: (e2) => "boolean" == typeof e2 || "always" === e2 }, ticks: { type: [Array, Object] }, tickSize: { type: [Number, String], default: 2 }, color: String, trackColor: String, trackFillColor: String, trackSize: { type: [Number, String], default: 4 }, direction: { type: String, default: "horizontal", validator: (e2) => ["vertical", "horizontal"].includes(e2) }, reverse: Boolean, ...uo(), ...io({ elevation: 2 }), ripple: { type: Boolean, default: true } }, "Slider"), bl = wn({ focused: Boolean, max: { type: Number, required: true }, min: { type: Number, required: true }, modelValue: { type: Number, required: true }, position: { type: Number, required: true }, ripple: { type: [Boolean, Object], default: true }, name: String, ..._n() }, "VSliderThumb"), gl = $n()({ name: "VSliderThumb", directives: { Ripple: hr }, props: bl(), emits: { "update:modelValue": (e2) => true }, setup(e2, a2) {
  let { slots: o2, emit: t2 } = a2;
  const s2 = inject(Vl), { isRtl: m2, rtlClasses: c2 } = al();
  if (!s2)
    throw new Error("[Vuetify] v-slider-thumb must be used inside v-slider or v-range-slider");
  const { thumbColor: p2, step: v2, disabled: f2, thumbSize: V2, thumbLabel: _2, direction: b2, isReversed: g2, vertical: h2, readonly: y2, elevation: U2, mousePressed: C2, decimals: x2, indexFromEnd: k2 } = s2, $2 = computed(() => f2.value ? void 0 : U2.value), { elevationClasses: w2 } = so($2), { textColorClasses: I2, textColorStyles: E2 } = fo(p2), { pageup: B2, pagedown: S2, end: A2, home: T2, left: N2, right: P2, down: z2, up: F2 } = Wt, L2 = [B2, S2, A2, T2, N2, P2, z2, F2], j2 = computed(() => v2.value ? [1, 2, 3] : [1, 5, 10]);
  function M2(l2) {
    const a3 = function(l3, a4) {
      if (!L2.includes(l3.key))
        return;
      l3.preventDefault();
      const o3 = v2.value || 0.1, t3 = (e2.max - e2.min) / o3;
      if ([N2, P2, z2, F2].includes(l3.key)) {
        const e3 = (h2.value ? [m2.value ? N2 : P2, g2.value ? z2 : F2] : k2.value !== m2.value ? [N2, F2] : [P2, F2]).includes(l3.key) ? 1 : -1, t4 = l3.shiftKey ? 2 : l3.ctrlKey ? 1 : 0;
        a4 += e3 * o3 * j2.value[t4];
      } else
        l3.key === T2 ? a4 = e2.min : l3.key === A2 ? a4 = e2.max : a4 -= (l3.key === S2 ? 1 : -1) * o3 * (t3 > 100 ? t3 / 10 : 10);
      return Math.max(e2.min, Math.min(e2.max, a4));
    }(l2, e2.modelValue);
    null != a3 && t2("update:modelValue", a3);
  }
  return zn(() => {
    const l2 = Rt(k2.value ? 100 - e2.position : e2.position, "%");
    return createVNode("div", { class: ["v-slider-thumb", { "v-slider-thumb--focused": e2.focused, "v-slider-thumb--pressed": e2.focused && C2.value }, e2.class, c2.value], style: [{ "--v-slider-thumb-position": l2, "--v-slider-thumb-size": Rt(V2.value) }, e2.style], role: "slider", tabindex: f2.value ? -1 : 0, "aria-label": e2.name, "aria-valuemin": e2.min, "aria-valuemax": e2.max, "aria-valuenow": e2.modelValue, "aria-readonly": !!y2.value, "aria-orientation": b2.value, onKeydown: y2.value ? void 0 : M2 }, [createVNode("div", { class: ["v-slider-thumb__surface", I2.value, w2.value], style: { ...E2.value } }, null), withDirectives(createVNode("div", { class: ["v-slider-thumb__ripple", I2.value], style: E2.value }, null), [[resolveDirective("ripple"), e2.ripple, null, { circle: true, center: true }]]), createVNode(Yr, { origin: "bottom center" }, { default: () => {
      var _a;
      var l3;
      return [withDirectives(createVNode("div", { class: "v-slider-thumb__label-container" }, [createVNode("div", { class: ["v-slider-thumb__label"] }, [createVNode("div", null, [(_a = null == (l3 = o2["thumb-label"]) ? void 0 : l3.call(o2, { modelValue: e2.modelValue })) != null ? _a : e2.modelValue.toFixed(v2.value ? x2.value : 1)])])]), [[vShow, _2.value && e2.focused || "always" === _2.value]])];
    } })]);
  }), {};
} }), hl = wn({ start: { type: Number, required: true }, stop: { type: Number, required: true }, ..._n() }, "VSliderTrack"), yl = $n()({ name: "VSliderTrack", props: hl(), emits: {}, setup(e2, a2) {
  let { slots: o2 } = a2;
  const t2 = inject(Vl);
  if (!t2)
    throw new Error("[Vuetify] v-slider-track must be inside v-slider or v-range-slider");
  const { color: u2, parsedTicks: i2, rounded: n2, showTicks: s2, tickSize: m2, trackColor: c2, trackFillColor: p2, trackSize: v2, vertical: f2, min: V2, max: _2, indexFromEnd: b2 } = t2, { roundedClasses: g2 } = co(n2), { backgroundColorClasses: h2, backgroundColorStyles: y2 } = mo(p2), { backgroundColorClasses: U2, backgroundColorStyles: C2 } = mo(c2), x2 = computed(() => `inset-${f2.value ? "block" : "inline"}-${b2.value ? "end" : "start"}`), k2 = computed(() => f2.value ? "height" : "width"), $2 = computed(() => ({ [x2.value]: "0%", [k2.value]: "100%" })), w2 = computed(() => e2.stop - e2.start), I2 = computed(() => ({ [x2.value]: Rt(e2.start, "%"), [k2.value]: Rt(w2.value, "%") })), E2 = computed(() => {
    if (!s2.value)
      return [];
    return (f2.value ? i2.value.slice().reverse() : i2.value).map((l2, a3) => {
      var _a;
      var t3;
      const u3 = l2.value !== V2.value && l2.value !== _2.value ? Rt(l2.position, "%") : void 0;
      return createVNode("div", { key: l2.value, class: ["v-slider-track__tick", { "v-slider-track__tick--filled": l2.position >= e2.start && l2.position <= e2.stop, "v-slider-track__tick--first": l2.value === V2.value, "v-slider-track__tick--last": l2.value === _2.value }], style: { [x2.value]: u3 } }, [(l2.label || o2["tick-label"]) && createVNode("div", { class: "v-slider-track__tick-label" }, [(_a = null == (t3 = o2["tick-label"]) ? void 0 : t3.call(o2, { tick: l2, index: a3 })) != null ? _a : l2.label])]);
    });
  });
  return zn(() => createVNode("div", { class: ["v-slider-track", g2.value, e2.class], style: [{ "--v-slider-track-size": Rt(v2.value), "--v-slider-tick-size": Rt(m2.value) }, e2.style] }, [createVNode("div", { class: ["v-slider-track__background", U2.value, { "v-slider-track__background--opacity": !!u2.value || !p2.value }], style: { ...$2.value, ...C2.value } }, null), createVNode("div", { class: ["v-slider-track__fill", h2.value], style: { ...I2.value, ...y2.value } }, null), s2.value && createVNode("div", { class: ["v-slider-track__ticks", { "v-slider-track__ticks--always-show": "always" === s2.value }] }, [E2.value])])), {};
} }), Ul = wn({ ...Yi(), ..._l(), ...as(), modelValue: { type: [Number, String], default: 0 } }, "VSlider"), Cl = $n()({ name: "VSlider", props: Ul(), emits: { "update:focused": (e2) => true, "update:modelValue": (e2) => true, start: (e2) => true, end: (e2) => true }, setup(o2, u2) {
  let { slots: i2, emit: r2 } = u2;
  const n2 = ref(), { rtlClasses: s2 } = al(), v2 = ((e2) => {
    const a2 = computed(() => parseFloat(e2.min)), o3 = computed(() => parseFloat(e2.max)), t2 = computed(() => +e2.step > 0 ? parseFloat(e2.step) : 0), d2 = computed(() => Math.max(ta(t2.value), ta(a2.value)));
    return { min: a2, max: o3, step: t2, decimals: d2, roundValue: function(e3) {
      if (e3 = parseFloat(e3), t2.value <= 0)
        return e3;
      const l2 = ea$1(e3, a2.value, o3.value), u3 = a2.value % t2.value, i3 = Math.round((l2 - u3) / t2.value) * t2.value + u3;
      return parseFloat(Math.min(i3, o3.value).toFixed(d2.value));
    } };
  })(o2), f2 = Un(o2, "modelValue", void 0, (e2) => v2.roundValue(null == e2 ? v2.min.value : e2)), { min: V2, max: _2, mousePressed: b2, roundValue: g2, onSliderMousedown: h2, onSliderTouchstart: y2, trackContainerRef: U2, position: C2, hasLabels: x2, readonly: k2 } = ((o3) => {
    let { props: d2, steps: u3, onSliderStart: i3, onSliderMove: r3, onSliderEnd: n3, getActiveThumb: s3 } = o3;
    const { isRtl: c2 } = al(), p2 = toRef(d2, "reverse"), v3 = computed(() => "vertical" === d2.direction), f3 = computed(() => v3.value !== p2.value), { min: V3, max: _3, step: b3, decimals: g3, roundValue: h3 } = u3, y3 = computed(() => parseInt(d2.thumbSize, 10)), U3 = computed(() => parseInt(d2.tickSize, 10)), C3 = computed(() => parseInt(d2.trackSize, 10)), x3 = computed(() => (_3.value - V3.value) / b3.value), k3 = toRef(d2, "disabled"), $3 = computed(() => {
      var _a;
      return d2.error || d2.disabled ? void 0 : (_a = d2.thumbColor) != null ? _a : d2.color;
    }), w3 = computed(() => {
      var _a;
      return d2.error || d2.disabled ? void 0 : (_a = d2.trackColor) != null ? _a : d2.color;
    }), I3 = computed(() => {
      var _a;
      return d2.error || d2.disabled ? void 0 : (_a = d2.trackFillColor) != null ? _a : d2.color;
    }), E3 = shallowRef(false), B2 = shallowRef(0), S2 = ref(), A2 = ref();
    function T2(e2) {
      var l2;
      const a2 = "vertical" === d2.direction, o4 = a2 ? "top" : "left", t2 = a2 ? "height" : "width", u4 = a2 ? "clientY" : "clientX", { [o4]: i4, [t2]: r4 } = null == (l2 = S2.value) ? void 0 : l2.$el.getBoundingClientRect(), n4 = function(e3, l3) {
        return "touches" in e3 && e3.touches.length ? e3.touches[0][l3] : "changedTouches" in e3 && e3.changedTouches.length ? e3.changedTouches[0][l3] : e3[l3];
      }(e2, u4);
      let s4 = Math.min(Math.max((n4 - i4 - B2.value) / r4, 0), 1) || 0;
      return (a2 ? f3.value : f3.value !== c2.value) && (s4 = 1 - s4), h3(V3.value + s4 * (_3.value - V3.value));
    }
    const N2 = (e2) => {
      n3({ value: T2(e2) }), E3.value = false, B2.value = 0;
    }, P2 = (e2) => {
      A2.value = s3(e2), A2.value && (A2.value.focus(), E3.value = true, A2.value.contains(e2.target) ? B2.value = function(e3, l2, a2) {
        const o4 = "vertical" === a2, t2 = l2.getBoundingClientRect(), d3 = "touches" in e3 ? e3.touches[0] : e3;
        return o4 ? d3.clientY - (t2.top + t2.height / 2) : d3.clientX - (t2.left + t2.width / 2);
      }(e2, A2.value, d2.direction) : (B2.value = 0, r3({ value: T2(e2) })), i3({ value: T2(e2) }));
    }, R2 = { passive: true, capture: true };
    function z2(e2) {
      r3({ value: T2(e2) });
    }
    function F2(e2) {
      e2.stopPropagation(), e2.preventDefault(), N2(e2), (void 0).removeEventListener("mousemove", z2, R2), (void 0).removeEventListener("mouseup", F2);
    }
    function L2(e2) {
      var l2;
      N2(e2), (void 0).removeEventListener("touchmove", z2, R2), null == (l2 = e2.target) || l2.removeEventListener("touchend", L2);
    }
    const j2 = (e2) => {
      const l2 = (e2 - V3.value) / (_3.value - V3.value) * 100;
      return ea$1(isNaN(l2) ? 0 : l2, 0, 100);
    }, M2 = toRef(d2, "showTicks"), O2 = computed(() => M2.value ? d2.ticks ? Array.isArray(d2.ticks) ? d2.ticks.map((e2) => ({ value: e2, position: j2(e2), label: e2.toString() })) : Object.keys(d2.ticks).map((e2) => ({ value: parseFloat(e2), position: j2(parseFloat(e2)), label: d2.ticks[e2] })) : x3.value !== 1 / 0 ? Lt(x3.value + 1).map((e2) => {
      const l2 = V3.value + e2 * b3.value;
      return { value: l2, position: j2(l2) };
    }) : [] : []), H2 = computed(() => O2.value.some((e2) => {
      let { label: l2 } = e2;
      return !!l2;
    })), q2 = { activeThumbRef: A2, color: toRef(d2, "color"), decimals: g3, disabled: k3, direction: toRef(d2, "direction"), elevation: toRef(d2, "elevation"), hasLabels: H2, isReversed: p2, indexFromEnd: f3, min: V3, max: _3, mousePressed: E3, numTicks: x3, onSliderMousedown: function(e2) {
      e2.preventDefault(), P2(e2), (void 0).addEventListener("mousemove", z2, R2), (void 0).addEventListener("mouseup", F2, { passive: false });
    }, onSliderTouchstart: function(e2) {
      var l2;
      P2(e2), (void 0).addEventListener("touchmove", z2, R2), null == (l2 = e2.target) || l2.addEventListener("touchend", L2, { passive: false });
    }, parsedTicks: O2, parseMouseMove: T2, position: j2, readonly: toRef(d2, "readonly"), rounded: toRef(d2, "rounded"), roundValue: h3, showTicks: M2, startOffset: B2, step: b3, thumbSize: y3, thumbColor: $3, thumbLabel: toRef(d2, "thumbLabel"), ticks: toRef(d2, "ticks"), tickSize: U3, trackColor: w3, trackContainerRef: S2, trackFillColor: I3, trackSize: C3, vertical: v3 };
    return provide(Vl, q2), q2;
  })({ props: o2, steps: v2, onSliderStart: () => {
    r2("start", f2.value);
  }, onSliderEnd: (e2) => {
    let { value: l2 } = e2;
    const a2 = g2(l2);
    f2.value = a2, r2("end", a2);
  }, onSliderMove: (e2) => {
    let { value: l2 } = e2;
    return f2.value = g2(l2);
  }, getActiveThumb: () => {
    var e2;
    return null == (e2 = n2.value) ? void 0 : e2.$el;
  } }), { isFocused: $2, focus: w2, blur: I2 } = Ki(o2), E2 = computed(() => C2(f2.value));
  return zn(() => {
    const e2 = ns.filterProps(o2), l2 = !!(o2.label || i2.label || i2.prepend);
    return createVNode(ns, mergeProps({ class: ["v-slider", { "v-slider--has-labels": !!i2["tick-label"] || x2.value, "v-slider--focused": $2.value, "v-slider--pressed": b2.value, "v-slider--disabled": o2.disabled }, s2.value, o2.class], style: o2.style }, e2, { focused: $2.value }), { ...i2, prepend: l2 ? (e3) => {
      var _a;
      var l3, a2;
      return createVNode(Fragment, null, [(_a = null == (l3 = i2.label) ? void 0 : l3.call(i2, e3)) != null ? _a : o2.label ? createVNode(Hi, { id: e3.id.value, class: "v-slider__label", text: o2.label }, null) : void 0, null == (a2 = i2.prepend) ? void 0 : a2.call(i2, e3)]);
    } : void 0, default: (e3) => {
      let { id: l3, messagesId: a2 } = e3;
      return createVNode("div", { class: "v-slider__container", onMousedown: k2.value ? void 0 : h2, onTouchstartPassive: k2.value ? void 0 : y2 }, [createVNode("input", { id: l3.value, name: o2.name || l3.value, disabled: !!o2.disabled, readonly: !!o2.readonly, tabindex: "-1", value: f2.value }, null), createVNode(yl, { ref: U2, start: 0, stop: E2.value }, { "tick-label": i2["tick-label"] }), createVNode(gl, { ref: n2, "aria-describedby": a2.value, focused: $2.value, min: V2.value, max: _2.value, modelValue: f2.value, "onUpdate:modelValue": (e4) => f2.value = e4, position: E2.value, elevation: o2.elevation, onFocus: w2, onBlur: I2, ripple: o2.ripple, name: o2.name }, { "thumb-label": i2["thumb-label"] })]);
    } });
  }), {};
} }), xl = Symbol.for("vuetify:v-tabs"), kl = wn({ fixed: Boolean, sliderColor: String, hideSlider: Boolean, direction: { type: String, default: "horizontal" }, ...Gt(yr({ selectedClass: "v-tab--selected", variant: "text" }), ["active", "block", "flat", "location", "position", "symbol"]) }, "VTab"), $l = $n()({ name: "VTab", props: kl(), setup(a2, o2) {
  let { slots: t2, attrs: u2 } = o2;
  const { textColorClasses: i2, textColorStyles: r2 } = fo(a2, "sliderColor"), n2 = ref(), s2 = ref(), m2 = computed(() => "horizontal" === a2.direction), v2 = computed(() => {
    var _a;
    var e2, l2;
    return (_a = null == (l2 = null == (e2 = n2.value) ? void 0 : e2.group) ? void 0 : l2.isSelected.value) != null ? _a : false;
  });
  function f2(e2) {
    var l2, a3;
    let { value: o3 } = e2;
    if (o3) {
      const e3 = null == (a3 = null == (l2 = n2.value) ? void 0 : l2.$el.parentElement) ? void 0 : a3.querySelector(".v-tab--selected .v-tab__slider"), o4 = s2.value;
      if (!e3 || !o4)
        return;
      const t3 = getComputedStyle(e3).color, d2 = e3.getBoundingClientRect(), u3 = o4.getBoundingClientRect(), i3 = m2.value ? "x" : "y", r3 = m2.value ? "X" : "Y", c2 = m2.value ? "right" : "bottom", p2 = m2.value ? "width" : "height", v3 = d2[i3] > u3[i3] ? d2[c2] - u3[c2] : d2[i3] - u3[i3], f3 = Math.sign(v3) > 0 ? m2.value ? "right" : "bottom" : Math.sign(v3) < 0 ? m2.value ? "left" : "top" : "center", V2 = (Math.abs(v3) + (Math.sign(v3) < 0 ? d2[p2] : u3[p2])) / Math.max(d2[p2], u3[p2]) || 0, _2 = d2[p2] / u3[p2] || 0, b2 = 1.5;
      Fa(o4, { backgroundColor: [t3, "currentcolor"], transform: [`translate${r3}(${v3}px) scale${r3}(${_2})`, `translate${r3}(${v3 / b2}px) scale${r3}(${(V2 - 1) / b2 + 1})`, "none"], transformOrigin: Array(3).fill(f3) }, { duration: 225, easing: Rn });
    }
  }
  return zn(() => {
    const e2 = br.filterProps(a2);
    return createVNode(br, mergeProps({ symbol: xl, ref: n2, class: ["v-tab", a2.class], style: a2.style, tabindex: v2.value ? 0 : -1, role: "tab", "aria-selected": String(v2.value), active: false }, e2, u2, { block: a2.fixed, maxWidth: a2.fixed ? 300 : void 0, "onGroup:selected": f2 }), { ...t2, default: () => {
      var _a;
      var e3;
      return createVNode(Fragment, null, [(_a = null == (e3 = t2.default) ? void 0 : e3.call(t2)) != null ? _a : a2.text, !a2.hideSlider && createVNode("div", { ref: s2, class: ["v-tab__slider", i2.value], style: r2.value }, null)]);
    } });
  }), $i({}, n2);
} }), wl = wn({ ...Gt(cl(), ["continuous", "nextIcon", "prevIcon", "showArrows", "touch", "mandatory"]) }, "VTabsWindow"), Il = $n()({ name: "VTabsWindow", props: wl(), emits: { "update:modelValue": (e2) => true }, setup(e2, a2) {
  let { slots: o2 } = a2;
  const t2 = inject(xl, null), u2 = Un(e2, "modelValue"), i2 = computed({ get() {
    var e3;
    return null == u2.value && t2 ? null == (e3 = t2.items.value.find((e4) => t2.selected.value.includes(e4.id))) ? void 0 : e3.value : u2.value;
  }, set(e3) {
    u2.value = e3;
  } });
  return zn(() => {
    const l2 = pl.filterProps(e2);
    return createVNode(pl, mergeProps({ _as: "VTabsWindow" }, l2, { modelValue: i2.value, "onUpdate:modelValue": (e3) => i2.value = e3, class: ["v-tabs-window", e2.class], style: e2.style, mandatory: false, touch: false }), o2);
  }), {};
} }), El = wn({ ...vl() }, "VTabsWindowItem"), Bl = $n()({ name: "VTabsWindowItem", props: El(), setup(e2, l2) {
  let { slots: a2 } = l2;
  return zn(() => {
    const l3 = fl.filterProps(e2);
    return createVNode(fl, mergeProps({ _as: "VTabsWindowItem" }, l3, { class: ["v-tabs-window-item", e2.class], style: e2.style }), a2);
  }), {};
} });
const Sl = wn({ alignTabs: { type: String, default: "start" }, color: String, fixedTabs: Boolean, items: { type: Array, default: () => [] }, stacked: Boolean, bgColor: String, grow: Boolean, height: { type: [Number, String], default: void 0 }, hideSlider: Boolean, sliderColor: String, ...Vs({ mandatory: "force", selectedClass: "v-tab-item--selected" }), ...oo(), ...vo() }, "VTabs"), Al = $n()({ name: "VTabs", props: Sl(), emits: { "update:modelValue": (e2) => true }, setup(e2, a2) {
  let { attrs: o2, slots: t2 } = a2;
  const u2 = Un(e2, "modelValue"), i2 = computed(() => function(e3) {
    return e3 ? e3.map((e4) => Nt(e4) ? e4 : { text: e4, value: e4 }) : [];
  }(e2.items)), { densityClasses: r2 } = ro(e2), { backgroundColorClasses: n2, backgroundColorStyles: s2 } = mo(toRef(e2, "bgColor")), { scopeId: v2 } = Ci();
  return Fn({ VTab: { color: toRef(e2, "color"), direction: toRef(e2, "direction"), stacked: toRef(e2, "stacked"), fixed: toRef(e2, "fixedTabs"), sliderColor: toRef(e2, "sliderColor"), hideSlider: toRef(e2, "hideSlider") } }), zn(() => {
    const l2 = Bs.filterProps(e2), a3 = !!(t2.window || e2.items.length > 0);
    return createVNode(Fragment, null, [createVNode(Bs, mergeProps(l2, { modelValue: u2.value, "onUpdate:modelValue": (e3) => u2.value = e3, class: ["v-tabs", `v-tabs--${e2.direction}`, `v-tabs--align-tabs-${e2.alignTabs}`, { "v-tabs--fixed-tabs": e2.fixedTabs, "v-tabs--grow": e2.grow, "v-tabs--stacked": e2.stacked }, r2.value, n2.value, e2.class], style: [{ "--v-tabs-height": Rt(e2.height) }, s2.value, e2.style], role: "tablist", symbol: xl }, v2, o2), { default: () => {
      var _a;
      var e3;
      return [(_a = null == (e3 = t2.default) ? void 0 : e3.call(t2)) != null ? _a : i2.value.map((e4) => {
        var _a2;
        var l3;
        return (_a2 = null == (l3 = t2.tab) ? void 0 : l3.call(t2, { item: e4 })) != null ? _a2 : createVNode($l, mergeProps(e4, { key: e4.text, value: e4.value }), { default: t2[`tab.${e4.value}`] ? () => {
          var l4;
          return null == (l4 = t2[`tab.${e4.value}`]) ? void 0 : l4.call(t2, { item: e4 });
        } : void 0 });
      })];
    } }), a3 && createVNode(Il, mergeProps({ modelValue: u2.value, "onUpdate:modelValue": (e3) => u2.value = e3, key: "tabs-window" }, v2), { default: () => {
      var e3;
      return [i2.value.map((e4) => {
        var _a;
        var l3;
        return (_a = null == (l3 = t2.item) ? void 0 : l3.call(t2, { item: e4 })) != null ? _a : createVNode(Bl, { value: e4.value }, { default: () => {
          var l4;
          return null == (l4 = t2[`item.${e4.value}`]) ? void 0 : l4.call(t2, { item: e4 });
        } });
      }), null == (e3 = t2.window) ? void 0 : e3.call(t2)];
    } })]);
  }), {};
} }), Dl = { __name: "Documentos", __ssrInlineRender: true, async setup(l2) {
  let a2, o2;
  const { $toast: t2 } = Ue(), u2 = Qe(), { id: i2 } = u2.params, r2 = Ye(), n2 = `${r2.public.managemant}/listarTipoDocumento`, s2 = `${r2.public.managemant}/listarUF`, m2 = `${r2.public.managemant}/getPessoaDocById`, p2 = `${r2.public.managemant}/createPessoaDoc`, U2 = `${r2.public.managemant}/updatePessoaDoc`, C2 = ref(false), x2 = ref(null), k2 = ref(Ct("user-data").value.usuario_id).value, $2 = Number(Ct("pessoa-id").value || i2), w2 = reactive({ tabvalores_tipodoc_id: "", emissor: "", validade: "", numero: "", data_emissao: "", data_vencimento: "", tabvalores_ufemissor_id: "" }), I2 = [{ title: "Tipo", value: "tipoDocumento.descricao" }, { title: "N\xFAmero", value: "numero" }, { title: "Emissor", value: "emissor" }, { title: "UF", value: "ufEmissor.descricao" }, { title: "Emiss\xE3o", value: "data_emissao" }, { title: "Validade", value: "data_vencimento" }, { value: "actions" }], E2 = { numero: { required: helpers.withMessage("O campo \xE9 obrigatorio", required) }, emissor: { required: helpers.withMessage("O campo \xE9 obrigatorio", required) } }, B2 = useVuelidate(E2, w2), { data: S2, pending: A2, refresh: D2 } = ([a2, o2] = withAsyncContext(async () => v("cliente-documentos", async () => {
    const [e2, l3, a3] = await Promise.all([$fetch(n2), $fetch(s2), $fetch(`${m2}/${$2}`)]);
    return { tipoDocumentoItems: e2, ufItems: l3, pessoasDocsItems: a3.map((e3) => ({ ...e3, data_emissao: t(e3.data_emissao), data_vencimento: t(e3.data_vencimento) })) };
  })), a2 = await a2, o2(), a2);
  async function T2() {
    if (await B2.value.$validate()) {
      const e2 = { ...w2 };
      for (const t3 in e2)
        "" === e2[t3] && (e2[t3] = null);
      const l3 = { ...e2, user_id: k2, pessoa_id: $2 }, { data: a3, error: o3, status: d2 } = await g$2(p2, { method: "POST", body: l3 }, "$cLGZtMLuJD");
      if ("error" === d2.value && 500 === o3.value.statusCode)
        t2.error("Erro ao cadastrar documento,erro no sistema.");
      else {
        t2.success("Documento cadastrado com sucesso!"), D2();
        for (const e3 in w2)
          w2[e3] = "";
        B2.value.$reset();
      }
    } else
      t2.error("Erro ao cadastrar documento, preencha os campos obrigatorios.");
  }
  function N2(e2) {
    const l3 = S2.value.pessoasDocsItems.find((l4) => l4.id === e2);
    l3 && (x2.value = l3, C2.value = true);
  }
  async function R2(e2) {
    const l3 = { tabvalores_tipodoc_id: x2.value.tabvalores_tipodoc_id, numero: x2.value.numero, emissor: x2.value.emissor, tabvalores_ufemissor_id: x2.value.tabvalores_ufemissor_id, data_vencimento: x2.value.data_vencimento, data_emissao: x2.value.data_emissao }, { status: a3 } = await g$2(`${U2}/${e2}`, { method: "PUT", body: l3 }, "$2fkU5kgcxs");
    "success" === a3.value && (C2.value = false, t2.success("Pessoa atualizada com sucesso!"), D2());
  }
  async function z2(e2) {
    e2.excluido = !e2.excluido;
    try {
      await g$2(`${U2}/${e2.id}`, { method: "PUT", body: JSON.stringify({ excluido: e2.excluido }) }, "$lMq37v4cfh");
    } catch (l3) {
      console.error("Erro ao excluir pessoa:", l3);
    }
  }
  return (e2, l3, a3, o3) => {
    const t3 = g$1;
    unref(A2) ? l3("<!---->") : l3(ssrRenderComponent(i, mergeProps({ class: "mt-5" }, o3), { default: withCtx((e3, l4, a4, o4) => {
      if (!l4)
        return [createVNode($, null, { default: withCtx(() => [createVNode(y, { md: "2" }, { default: withCtx(() => [createVNode(L, { modelValue: unref(w2).tabvalores_tipodoc_id, "onUpdate:modelValue": (e4) => unref(w2).tabvalores_tipodoc_id = e4, items: unref(S2).tipoDocumentoItems, label: "Tipo", "item-title": "descricao", "item-value": "id" }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])]), _: 1 }), createVNode(y, null, { default: withCtx(() => [createVNode(is, { modelValue: unref(w2).numero, "onUpdate:modelValue": (e4) => unref(w2).numero = e4, "error-messages": unref(B2).numero.$errors.map((e4) => e4.$message), label: "Numero", required: "", onBlur: unref(B2).numero.$touch, onInput: unref(B2).numero.$touch }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages", "onBlur", "onInput"])]), _: 1 }), createVNode(y, { md: "2" }, { default: withCtx(() => [createVNode(is, { modelValue: unref(w2).emissor, "onUpdate:modelValue": (e4) => unref(w2).emissor = e4, "error-messages": unref(B2).emissor.$errors.map((e4) => e4.$message), required: "", onBlur: unref(B2).emissor.$touch, onInput: unref(B2).emissor.$touch, label: "Emissor" }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages", "onBlur", "onInput"])]), _: 1 }), createVNode(y, null, { default: withCtx(() => [createVNode(L, { modelValue: unref(w2).tabvalores_ufemissor_id, "onUpdate:modelValue": (e4) => unref(w2).tabvalores_ufemissor_id = e4, items: unref(S2).ufItems, label: "UF", "item-title": "descricao", "item-value": "id" }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])]), _: 1 }), createVNode(y, { md: "2" }, { default: withCtx(() => [createVNode(is, { modelValue: unref(w2).data_emissao, "onUpdate:modelValue": (e4) => unref(w2).data_emissao = e4, type: "date", label: "Emiss\xE3o" }, null, 8, ["modelValue", "onUpdate:modelValue"])]), _: 1 }), createVNode(y, { md: "2" }, { default: withCtx(() => [createVNode(is, { modelValue: unref(w2).data_vencimento, "onUpdate:modelValue": (e4) => unref(w2).data_vencimento = e4, type: "date", label: "Validade" }, null, 8, ["modelValue", "onUpdate:modelValue"])]), _: 1 }), createVNode("div", { class: "mt-3" }, [createVNode("img", { style: { width: "40px", height: "40px", cursor: "pointer" }, src: A$1, alt: "novo", onClick: T2 })])]), _: 1 }), createVNode(Dc, { headers: I2, items: unref(S2).pessoasDocsItems, "item-key": "id" }, { "item.actions": withCtx(({ item: e4 }) => [createVNode($, { style: { display: "flex", gap: "10px" } }, { default: withCtx(() => [createVNode("div", { onClick: (l5) => N2(e4.id), title: "editar" }, [createVNode("img", { style: { width: "40px", height: "40px", cursor: "pointer" }, src: B, alt: "editar" })], 8, ["onClick"]), createVNode("div", { onClick: (l5) => z2(e4), title: "deletar" }, [e4.excluido ? (openBlock(), createBlock("img", { key: 0, style: { width: "40px", height: "40px", cursor: "pointer" }, src: g, alt: "deletar", title: "Reativar" })) : (openBlock(), createBlock("img", { key: 1, src: a, alt: "reativar", class: "trash-icon", style: { width: "40px", height: "40px", cursor: "pointer" }, title: "reativar" }))], 8, ["onClick"])]), _: 2 }, 1024)]), _: 1 }, 8, ["items"]), createVNode(t3, { to: "/pessoas/registros" }, { default: withCtx(() => [createVNode("img", { class: "btn-pointer", src: A, alt: "Sair" })]), _: 1 }), createVNode($$1, { modelValue: unref(C2), "onUpdate:modelValue": (e4) => isRef(C2) ? C2.value = e4 : null, "max-width": "600px" }, { default: withCtx(() => [createVNode(oe, null, { default: withCtx(() => [createVNode(le, { style: { color: "green" } }, { default: withCtx(() => [createTextVNode("Atualizar Endere\xE7o")]), _: 1 }), createVNode(ie, null, { default: withCtx(() => [createVNode($, null, { default: withCtx(() => [createVNode(y, { cols: "12", md: "6" }, { default: withCtx(() => [createVNode(L, { modelValue: unref(x2).tabvalores_tipodoc_id, "onUpdate:modelValue": (e4) => unref(x2).tabvalores_tipodoc_id = e4, items: unref(S2).tipoDocumentoItems, label: "Tipo", "item-title": "descricao", "item-value": "id" }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])]), _: 1 }), createVNode(y, { cols: "12", md: "6" }, { default: withCtx(() => [createVNode(is, { modelValue: unref(x2).numero, "onUpdate:modelValue": (e4) => unref(x2).numero = e4, label: "N\xFAmero" }, null, 8, ["modelValue", "onUpdate:modelValue"])]), _: 1 }), createVNode(y, { cols: "12", md: "6" }, { default: withCtx(() => [createVNode(is, { modelValue: unref(x2).emissor, "onUpdate:modelValue": (e4) => unref(x2).emissor = e4, label: "N\xFAmero" }, null, 8, ["modelValue", "onUpdate:modelValue"])]), _: 1 }), createVNode(y, { cols: "12", md: "6" }, { default: withCtx(() => [createVNode(L, { modelValue: unref(x2).tabvalores_ufemissor_id, "onUpdate:modelValue": (e4) => unref(x2).tabvalores_ufemissor_id = e4, items: unref(S2).ufItems, label: "UF", "item-title": "descricao", "item-value": "id" }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])]), _: 1 }), createVNode(y, { cols: "12", md: "6" }, { default: withCtx(() => [createVNode(is, { modelValue: unref(x2).data_emissao, "onUpdate:modelValue": (e4) => unref(x2).data_emissao = e4, type: "date", label: "Emiss\xE3o" }, null, 8, ["modelValue", "onUpdate:modelValue"])]), _: 1 }), createVNode(y, { cols: "12", md: "6" }, { default: withCtx(() => [createVNode(is, { modelValue: unref(x2).data_vencimento, "onUpdate:modelValue": (e4) => unref(x2).data_vencimento = e4, type: "date", label: "Validade" }, null, 8, ["modelValue", "onUpdate:modelValue"])]), _: 1 })]), _: 1 })]), _: 1 }), createVNode(ee, null, { default: withCtx(() => [createVNode(Sr), createVNode(br, { color: "green", text: "", onClick: (e4) => C2.value = false }, { default: withCtx(() => [createTextVNode("Cancelar")]), _: 1 }, 8, ["onClick"]), createVNode(br, { color: "green", text: "", onClick: (e4) => R2(unref(x2).id) }, { default: withCtx(() => [createTextVNode("Salvar")]), _: 1 }, 8, ["onClick"])]), _: 1 })]), _: 1 })]), _: 1 }, 8, ["modelValue", "onUpdate:modelValue"])];
      l4(ssrRenderComponent($, null, { default: withCtx((e4, l5, a5, o5) => {
        if (!l5)
          return [createVNode(y, { md: "2" }, { default: withCtx(() => [createVNode(L, { modelValue: unref(w2).tabvalores_tipodoc_id, "onUpdate:modelValue": (e5) => unref(w2).tabvalores_tipodoc_id = e5, items: unref(S2).tipoDocumentoItems, label: "Tipo", "item-title": "descricao", "item-value": "id" }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])]), _: 1 }), createVNode(y, null, { default: withCtx(() => [createVNode(is, { modelValue: unref(w2).numero, "onUpdate:modelValue": (e5) => unref(w2).numero = e5, "error-messages": unref(B2).numero.$errors.map((e5) => e5.$message), label: "Numero", required: "", onBlur: unref(B2).numero.$touch, onInput: unref(B2).numero.$touch }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages", "onBlur", "onInput"])]), _: 1 }), createVNode(y, { md: "2" }, { default: withCtx(() => [createVNode(is, { modelValue: unref(w2).emissor, "onUpdate:modelValue": (e5) => unref(w2).emissor = e5, "error-messages": unref(B2).emissor.$errors.map((e5) => e5.$message), required: "", onBlur: unref(B2).emissor.$touch, onInput: unref(B2).emissor.$touch, label: "Emissor" }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages", "onBlur", "onInput"])]), _: 1 }), createVNode(y, null, { default: withCtx(() => [createVNode(L, { modelValue: unref(w2).tabvalores_ufemissor_id, "onUpdate:modelValue": (e5) => unref(w2).tabvalores_ufemissor_id = e5, items: unref(S2).ufItems, label: "UF", "item-title": "descricao", "item-value": "id" }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])]), _: 1 }), createVNode(y, { md: "2" }, { default: withCtx(() => [createVNode(is, { modelValue: unref(w2).data_emissao, "onUpdate:modelValue": (e5) => unref(w2).data_emissao = e5, type: "date", label: "Emiss\xE3o" }, null, 8, ["modelValue", "onUpdate:modelValue"])]), _: 1 }), createVNode(y, { md: "2" }, { default: withCtx(() => [createVNode(is, { modelValue: unref(w2).data_vencimento, "onUpdate:modelValue": (e5) => unref(w2).data_vencimento = e5, type: "date", label: "Validade" }, null, 8, ["modelValue", "onUpdate:modelValue"])]), _: 1 }), createVNode("div", { class: "mt-3" }, [createVNode("img", { style: { width: "40px", height: "40px", cursor: "pointer" }, src: A$1, alt: "novo", onClick: T2 })])];
        l5(ssrRenderComponent(y, { md: "2" }, { default: withCtx((e5, l6, a6, o6) => {
          if (!l6)
            return [createVNode(L, { modelValue: unref(w2).tabvalores_tipodoc_id, "onUpdate:modelValue": (e6) => unref(w2).tabvalores_tipodoc_id = e6, items: unref(S2).tipoDocumentoItems, label: "Tipo", "item-title": "descricao", "item-value": "id" }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])];
          l6(ssrRenderComponent(L, { modelValue: unref(w2).tabvalores_tipodoc_id, "onUpdate:modelValue": (e6) => unref(w2).tabvalores_tipodoc_id = e6, items: unref(S2).tipoDocumentoItems, label: "Tipo", "item-title": "descricao", "item-value": "id" }, null, a6, o6));
        }), _: 1 }, a5, o5)), l5(ssrRenderComponent(y, null, { default: withCtx((e5, l6, a6, o6) => {
          if (!l6)
            return [createVNode(is, { modelValue: unref(w2).numero, "onUpdate:modelValue": (e6) => unref(w2).numero = e6, "error-messages": unref(B2).numero.$errors.map((e6) => e6.$message), label: "Numero", required: "", onBlur: unref(B2).numero.$touch, onInput: unref(B2).numero.$touch }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages", "onBlur", "onInput"])];
          l6(ssrRenderComponent(is, { modelValue: unref(w2).numero, "onUpdate:modelValue": (e6) => unref(w2).numero = e6, "error-messages": unref(B2).numero.$errors.map((e6) => e6.$message), label: "Numero", required: "", onBlur: unref(B2).numero.$touch, onInput: unref(B2).numero.$touch }, null, a6, o6));
        }), _: 1 }, a5, o5)), l5(ssrRenderComponent(y, { md: "2" }, { default: withCtx((e5, l6, a6, o6) => {
          if (!l6)
            return [createVNode(is, { modelValue: unref(w2).emissor, "onUpdate:modelValue": (e6) => unref(w2).emissor = e6, "error-messages": unref(B2).emissor.$errors.map((e6) => e6.$message), required: "", onBlur: unref(B2).emissor.$touch, onInput: unref(B2).emissor.$touch, label: "Emissor" }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages", "onBlur", "onInput"])];
          l6(ssrRenderComponent(is, { modelValue: unref(w2).emissor, "onUpdate:modelValue": (e6) => unref(w2).emissor = e6, "error-messages": unref(B2).emissor.$errors.map((e6) => e6.$message), required: "", onBlur: unref(B2).emissor.$touch, onInput: unref(B2).emissor.$touch, label: "Emissor" }, null, a6, o6));
        }), _: 1 }, a5, o5)), l5(ssrRenderComponent(y, null, { default: withCtx((e5, l6, a6, o6) => {
          if (!l6)
            return [createVNode(L, { modelValue: unref(w2).tabvalores_ufemissor_id, "onUpdate:modelValue": (e6) => unref(w2).tabvalores_ufemissor_id = e6, items: unref(S2).ufItems, label: "UF", "item-title": "descricao", "item-value": "id" }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])];
          l6(ssrRenderComponent(L, { modelValue: unref(w2).tabvalores_ufemissor_id, "onUpdate:modelValue": (e6) => unref(w2).tabvalores_ufemissor_id = e6, items: unref(S2).ufItems, label: "UF", "item-title": "descricao", "item-value": "id" }, null, a6, o6));
        }), _: 1 }, a5, o5)), l5(ssrRenderComponent(y, { md: "2" }, { default: withCtx((e5, l6, a6, o6) => {
          if (!l6)
            return [createVNode(is, { modelValue: unref(w2).data_emissao, "onUpdate:modelValue": (e6) => unref(w2).data_emissao = e6, type: "date", label: "Emiss\xE3o" }, null, 8, ["modelValue", "onUpdate:modelValue"])];
          l6(ssrRenderComponent(is, { modelValue: unref(w2).data_emissao, "onUpdate:modelValue": (e6) => unref(w2).data_emissao = e6, type: "date", label: "Emiss\xE3o" }, null, a6, o6));
        }), _: 1 }, a5, o5)), l5(ssrRenderComponent(y, { md: "2" }, { default: withCtx((e5, l6, a6, o6) => {
          if (!l6)
            return [createVNode(is, { modelValue: unref(w2).data_vencimento, "onUpdate:modelValue": (e6) => unref(w2).data_vencimento = e6, type: "date", label: "Validade" }, null, 8, ["modelValue", "onUpdate:modelValue"])];
          l6(ssrRenderComponent(is, { modelValue: unref(w2).data_vencimento, "onUpdate:modelValue": (e6) => unref(w2).data_vencimento = e6, type: "date", label: "Validade" }, null, a6, o6));
        }), _: 1 }, a5, o5)), l5(`<div class="mt-3"${o5}><img style="${ssrRenderStyle({ width: "40px", height: "40px", cursor: "pointer" })}"${ssrRenderAttr("src", A$1)} alt="novo"${o5}></div>`);
      }), _: 1 }, a4, o4)), l4(ssrRenderComponent(Dc, { headers: I2, items: unref(S2).pessoasDocsItems, "item-key": "id" }, { "item.actions": withCtx(({ item: e4 }, l5, a5, o5) => {
        if (!l5)
          return [createVNode($, { style: { display: "flex", gap: "10px" } }, { default: withCtx(() => [createVNode("div", { onClick: (l6) => N2(e4.id), title: "editar" }, [createVNode("img", { style: { width: "40px", height: "40px", cursor: "pointer" }, src: B, alt: "editar" })], 8, ["onClick"]), createVNode("div", { onClick: (l6) => z2(e4), title: "deletar" }, [e4.excluido ? (openBlock(), createBlock("img", { key: 0, style: { width: "40px", height: "40px", cursor: "pointer" }, src: g, alt: "deletar", title: "Reativar" })) : (openBlock(), createBlock("img", { key: 1, src: a, alt: "reativar", class: "trash-icon", style: { width: "40px", height: "40px", cursor: "pointer" }, title: "reativar" }))], 8, ["onClick"])]), _: 2 }, 1024)];
        l5(ssrRenderComponent($, { style: { display: "flex", gap: "10px" } }, { default: withCtx((l6, a6, o6, t4) => {
          if (!a6)
            return [createVNode("div", { onClick: (l7) => N2(e4.id), title: "editar" }, [createVNode("img", { style: { width: "40px", height: "40px", cursor: "pointer" }, src: B, alt: "editar" })], 8, ["onClick"]), createVNode("div", { onClick: (l7) => z2(e4), title: "deletar" }, [e4.excluido ? (openBlock(), createBlock("img", { key: 0, style: { width: "40px", height: "40px", cursor: "pointer" }, src: g, alt: "deletar", title: "Reativar" })) : (openBlock(), createBlock("img", { key: 1, src: a, alt: "reativar", class: "trash-icon", style: { width: "40px", height: "40px", cursor: "pointer" }, title: "reativar" }))], 8, ["onClick"])];
          a6(`<div title="editar"${t4}><img style="${ssrRenderStyle({ width: "40px", height: "40px", cursor: "pointer" })}"${ssrRenderAttr("src", B)} alt="editar"${t4}></div><div title="deletar"${t4}>`), e4.excluido ? a6(`<img style="${ssrRenderStyle({ width: "40px", height: "40px", cursor: "pointer" })}"${ssrRenderAttr("src", g)} alt="deletar" title="Reativar"${t4}>`) : a6(`<img${ssrRenderAttr("src", a)} alt="reativar" class="trash-icon" style="${ssrRenderStyle({ width: "40px", height: "40px", cursor: "pointer" })}" title="reativar"${t4}>`), a6("</div>");
        }), _: 2 }, a5, o5));
      }), _: 1 }, a4, o4)), l4(ssrRenderComponent(t3, { to: "/pessoas/registros" }, { default: withCtx((e4, l5, a5, o5) => {
        if (!l5)
          return [createVNode("img", { class: "btn-pointer", src: A, alt: "Sair" })];
        l5(`<img class="btn-pointer"${ssrRenderAttr("src", A)} alt="Sair"${o5}>`);
      }), _: 1 }, a4, o4)), l4(ssrRenderComponent($$1, { modelValue: unref(C2), "onUpdate:modelValue": (e4) => isRef(C2) ? C2.value = e4 : null, "max-width": "600px" }, { default: withCtx((e4, l5, a5, o5) => {
        if (!l5)
          return [createVNode(oe, null, { default: withCtx(() => [createVNode(le, { style: { color: "green" } }, { default: withCtx(() => [createTextVNode("Atualizar Endere\xE7o")]), _: 1 }), createVNode(ie, null, { default: withCtx(() => [createVNode($, null, { default: withCtx(() => [createVNode(y, { cols: "12", md: "6" }, { default: withCtx(() => [createVNode(L, { modelValue: unref(x2).tabvalores_tipodoc_id, "onUpdate:modelValue": (e5) => unref(x2).tabvalores_tipodoc_id = e5, items: unref(S2).tipoDocumentoItems, label: "Tipo", "item-title": "descricao", "item-value": "id" }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])]), _: 1 }), createVNode(y, { cols: "12", md: "6" }, { default: withCtx(() => [createVNode(is, { modelValue: unref(x2).numero, "onUpdate:modelValue": (e5) => unref(x2).numero = e5, label: "N\xFAmero" }, null, 8, ["modelValue", "onUpdate:modelValue"])]), _: 1 }), createVNode(y, { cols: "12", md: "6" }, { default: withCtx(() => [createVNode(is, { modelValue: unref(x2).emissor, "onUpdate:modelValue": (e5) => unref(x2).emissor = e5, label: "N\xFAmero" }, null, 8, ["modelValue", "onUpdate:modelValue"])]), _: 1 }), createVNode(y, { cols: "12", md: "6" }, { default: withCtx(() => [createVNode(L, { modelValue: unref(x2).tabvalores_ufemissor_id, "onUpdate:modelValue": (e5) => unref(x2).tabvalores_ufemissor_id = e5, items: unref(S2).ufItems, label: "UF", "item-title": "descricao", "item-value": "id" }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])]), _: 1 }), createVNode(y, { cols: "12", md: "6" }, { default: withCtx(() => [createVNode(is, { modelValue: unref(x2).data_emissao, "onUpdate:modelValue": (e5) => unref(x2).data_emissao = e5, type: "date", label: "Emiss\xE3o" }, null, 8, ["modelValue", "onUpdate:modelValue"])]), _: 1 }), createVNode(y, { cols: "12", md: "6" }, { default: withCtx(() => [createVNode(is, { modelValue: unref(x2).data_vencimento, "onUpdate:modelValue": (e5) => unref(x2).data_vencimento = e5, type: "date", label: "Validade" }, null, 8, ["modelValue", "onUpdate:modelValue"])]), _: 1 })]), _: 1 })]), _: 1 }), createVNode(ee, null, { default: withCtx(() => [createVNode(Sr), createVNode(br, { color: "green", text: "", onClick: (e5) => C2.value = false }, { default: withCtx(() => [createTextVNode("Cancelar")]), _: 1 }, 8, ["onClick"]), createVNode(br, { color: "green", text: "", onClick: (e5) => R2(unref(x2).id) }, { default: withCtx(() => [createTextVNode("Salvar")]), _: 1 }, 8, ["onClick"])]), _: 1 })]), _: 1 })];
        l5(ssrRenderComponent(oe, null, { default: withCtx((e5, l6, a6, o6) => {
          if (!l6)
            return [createVNode(le, { style: { color: "green" } }, { default: withCtx(() => [createTextVNode("Atualizar Endere\xE7o")]), _: 1 }), createVNode(ie, null, { default: withCtx(() => [createVNode($, null, { default: withCtx(() => [createVNode(y, { cols: "12", md: "6" }, { default: withCtx(() => [createVNode(L, { modelValue: unref(x2).tabvalores_tipodoc_id, "onUpdate:modelValue": (e6) => unref(x2).tabvalores_tipodoc_id = e6, items: unref(S2).tipoDocumentoItems, label: "Tipo", "item-title": "descricao", "item-value": "id" }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])]), _: 1 }), createVNode(y, { cols: "12", md: "6" }, { default: withCtx(() => [createVNode(is, { modelValue: unref(x2).numero, "onUpdate:modelValue": (e6) => unref(x2).numero = e6, label: "N\xFAmero" }, null, 8, ["modelValue", "onUpdate:modelValue"])]), _: 1 }), createVNode(y, { cols: "12", md: "6" }, { default: withCtx(() => [createVNode(is, { modelValue: unref(x2).emissor, "onUpdate:modelValue": (e6) => unref(x2).emissor = e6, label: "N\xFAmero" }, null, 8, ["modelValue", "onUpdate:modelValue"])]), _: 1 }), createVNode(y, { cols: "12", md: "6" }, { default: withCtx(() => [createVNode(L, { modelValue: unref(x2).tabvalores_ufemissor_id, "onUpdate:modelValue": (e6) => unref(x2).tabvalores_ufemissor_id = e6, items: unref(S2).ufItems, label: "UF", "item-title": "descricao", "item-value": "id" }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])]), _: 1 }), createVNode(y, { cols: "12", md: "6" }, { default: withCtx(() => [createVNode(is, { modelValue: unref(x2).data_emissao, "onUpdate:modelValue": (e6) => unref(x2).data_emissao = e6, type: "date", label: "Emiss\xE3o" }, null, 8, ["modelValue", "onUpdate:modelValue"])]), _: 1 }), createVNode(y, { cols: "12", md: "6" }, { default: withCtx(() => [createVNode(is, { modelValue: unref(x2).data_vencimento, "onUpdate:modelValue": (e6) => unref(x2).data_vencimento = e6, type: "date", label: "Validade" }, null, 8, ["modelValue", "onUpdate:modelValue"])]), _: 1 })]), _: 1 })]), _: 1 }), createVNode(ee, null, { default: withCtx(() => [createVNode(Sr), createVNode(br, { color: "green", text: "", onClick: (e6) => C2.value = false }, { default: withCtx(() => [createTextVNode("Cancelar")]), _: 1 }, 8, ["onClick"]), createVNode(br, { color: "green", text: "", onClick: (e6) => R2(unref(x2).id) }, { default: withCtx(() => [createTextVNode("Salvar")]), _: 1 }, 8, ["onClick"])]), _: 1 })];
          l6(ssrRenderComponent(le, { style: { color: "green" } }, { default: withCtx((e6, l7, a7, o7) => {
            if (!l7)
              return [createTextVNode("Atualizar Endere\xE7o")];
            l7("Atualizar Endere\xE7o");
          }), _: 1 }, a6, o6)), l6(ssrRenderComponent(ie, null, { default: withCtx((e6, l7, a7, o7) => {
            if (!l7)
              return [createVNode($, null, { default: withCtx(() => [createVNode(y, { cols: "12", md: "6" }, { default: withCtx(() => [createVNode(L, { modelValue: unref(x2).tabvalores_tipodoc_id, "onUpdate:modelValue": (e7) => unref(x2).tabvalores_tipodoc_id = e7, items: unref(S2).tipoDocumentoItems, label: "Tipo", "item-title": "descricao", "item-value": "id" }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])]), _: 1 }), createVNode(y, { cols: "12", md: "6" }, { default: withCtx(() => [createVNode(is, { modelValue: unref(x2).numero, "onUpdate:modelValue": (e7) => unref(x2).numero = e7, label: "N\xFAmero" }, null, 8, ["modelValue", "onUpdate:modelValue"])]), _: 1 }), createVNode(y, { cols: "12", md: "6" }, { default: withCtx(() => [createVNode(is, { modelValue: unref(x2).emissor, "onUpdate:modelValue": (e7) => unref(x2).emissor = e7, label: "N\xFAmero" }, null, 8, ["modelValue", "onUpdate:modelValue"])]), _: 1 }), createVNode(y, { cols: "12", md: "6" }, { default: withCtx(() => [createVNode(L, { modelValue: unref(x2).tabvalores_ufemissor_id, "onUpdate:modelValue": (e7) => unref(x2).tabvalores_ufemissor_id = e7, items: unref(S2).ufItems, label: "UF", "item-title": "descricao", "item-value": "id" }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])]), _: 1 }), createVNode(y, { cols: "12", md: "6" }, { default: withCtx(() => [createVNode(is, { modelValue: unref(x2).data_emissao, "onUpdate:modelValue": (e7) => unref(x2).data_emissao = e7, type: "date", label: "Emiss\xE3o" }, null, 8, ["modelValue", "onUpdate:modelValue"])]), _: 1 }), createVNode(y, { cols: "12", md: "6" }, { default: withCtx(() => [createVNode(is, { modelValue: unref(x2).data_vencimento, "onUpdate:modelValue": (e7) => unref(x2).data_vencimento = e7, type: "date", label: "Validade" }, null, 8, ["modelValue", "onUpdate:modelValue"])]), _: 1 })]), _: 1 })];
            l7(ssrRenderComponent($, null, { default: withCtx((e7, l8, a8, o8) => {
              if (!l8)
                return [createVNode(y, { cols: "12", md: "6" }, { default: withCtx(() => [createVNode(L, { modelValue: unref(x2).tabvalores_tipodoc_id, "onUpdate:modelValue": (e8) => unref(x2).tabvalores_tipodoc_id = e8, items: unref(S2).tipoDocumentoItems, label: "Tipo", "item-title": "descricao", "item-value": "id" }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])]), _: 1 }), createVNode(y, { cols: "12", md: "6" }, { default: withCtx(() => [createVNode(is, { modelValue: unref(x2).numero, "onUpdate:modelValue": (e8) => unref(x2).numero = e8, label: "N\xFAmero" }, null, 8, ["modelValue", "onUpdate:modelValue"])]), _: 1 }), createVNode(y, { cols: "12", md: "6" }, { default: withCtx(() => [createVNode(is, { modelValue: unref(x2).emissor, "onUpdate:modelValue": (e8) => unref(x2).emissor = e8, label: "N\xFAmero" }, null, 8, ["modelValue", "onUpdate:modelValue"])]), _: 1 }), createVNode(y, { cols: "12", md: "6" }, { default: withCtx(() => [createVNode(L, { modelValue: unref(x2).tabvalores_ufemissor_id, "onUpdate:modelValue": (e8) => unref(x2).tabvalores_ufemissor_id = e8, items: unref(S2).ufItems, label: "UF", "item-title": "descricao", "item-value": "id" }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])]), _: 1 }), createVNode(y, { cols: "12", md: "6" }, { default: withCtx(() => [createVNode(is, { modelValue: unref(x2).data_emissao, "onUpdate:modelValue": (e8) => unref(x2).data_emissao = e8, type: "date", label: "Emiss\xE3o" }, null, 8, ["modelValue", "onUpdate:modelValue"])]), _: 1 }), createVNode(y, { cols: "12", md: "6" }, { default: withCtx(() => [createVNode(is, { modelValue: unref(x2).data_vencimento, "onUpdate:modelValue": (e8) => unref(x2).data_vencimento = e8, type: "date", label: "Validade" }, null, 8, ["modelValue", "onUpdate:modelValue"])]), _: 1 })];
              l8(ssrRenderComponent(y, { cols: "12", md: "6" }, { default: withCtx((e8, l9, a9, o9) => {
                if (!l9)
                  return [createVNode(L, { modelValue: unref(x2).tabvalores_tipodoc_id, "onUpdate:modelValue": (e9) => unref(x2).tabvalores_tipodoc_id = e9, items: unref(S2).tipoDocumentoItems, label: "Tipo", "item-title": "descricao", "item-value": "id" }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])];
                l9(ssrRenderComponent(L, { modelValue: unref(x2).tabvalores_tipodoc_id, "onUpdate:modelValue": (e9) => unref(x2).tabvalores_tipodoc_id = e9, items: unref(S2).tipoDocumentoItems, label: "Tipo", "item-title": "descricao", "item-value": "id" }, null, a9, o9));
              }), _: 1 }, a8, o8)), l8(ssrRenderComponent(y, { cols: "12", md: "6" }, { default: withCtx((e8, l9, a9, o9) => {
                if (!l9)
                  return [createVNode(is, { modelValue: unref(x2).numero, "onUpdate:modelValue": (e9) => unref(x2).numero = e9, label: "N\xFAmero" }, null, 8, ["modelValue", "onUpdate:modelValue"])];
                l9(ssrRenderComponent(is, { modelValue: unref(x2).numero, "onUpdate:modelValue": (e9) => unref(x2).numero = e9, label: "N\xFAmero" }, null, a9, o9));
              }), _: 1 }, a8, o8)), l8(ssrRenderComponent(y, { cols: "12", md: "6" }, { default: withCtx((e8, l9, a9, o9) => {
                if (!l9)
                  return [createVNode(is, { modelValue: unref(x2).emissor, "onUpdate:modelValue": (e9) => unref(x2).emissor = e9, label: "N\xFAmero" }, null, 8, ["modelValue", "onUpdate:modelValue"])];
                l9(ssrRenderComponent(is, { modelValue: unref(x2).emissor, "onUpdate:modelValue": (e9) => unref(x2).emissor = e9, label: "N\xFAmero" }, null, a9, o9));
              }), _: 1 }, a8, o8)), l8(ssrRenderComponent(y, { cols: "12", md: "6" }, { default: withCtx((e8, l9, a9, o9) => {
                if (!l9)
                  return [createVNode(L, { modelValue: unref(x2).tabvalores_ufemissor_id, "onUpdate:modelValue": (e9) => unref(x2).tabvalores_ufemissor_id = e9, items: unref(S2).ufItems, label: "UF", "item-title": "descricao", "item-value": "id" }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])];
                l9(ssrRenderComponent(L, { modelValue: unref(x2).tabvalores_ufemissor_id, "onUpdate:modelValue": (e9) => unref(x2).tabvalores_ufemissor_id = e9, items: unref(S2).ufItems, label: "UF", "item-title": "descricao", "item-value": "id" }, null, a9, o9));
              }), _: 1 }, a8, o8)), l8(ssrRenderComponent(y, { cols: "12", md: "6" }, { default: withCtx((e8, l9, a9, o9) => {
                if (!l9)
                  return [createVNode(is, { modelValue: unref(x2).data_emissao, "onUpdate:modelValue": (e9) => unref(x2).data_emissao = e9, type: "date", label: "Emiss\xE3o" }, null, 8, ["modelValue", "onUpdate:modelValue"])];
                l9(ssrRenderComponent(is, { modelValue: unref(x2).data_emissao, "onUpdate:modelValue": (e9) => unref(x2).data_emissao = e9, type: "date", label: "Emiss\xE3o" }, null, a9, o9));
              }), _: 1 }, a8, o8)), l8(ssrRenderComponent(y, { cols: "12", md: "6" }, { default: withCtx((e8, l9, a9, o9) => {
                if (!l9)
                  return [createVNode(is, { modelValue: unref(x2).data_vencimento, "onUpdate:modelValue": (e9) => unref(x2).data_vencimento = e9, type: "date", label: "Validade" }, null, 8, ["modelValue", "onUpdate:modelValue"])];
                l9(ssrRenderComponent(is, { modelValue: unref(x2).data_vencimento, "onUpdate:modelValue": (e9) => unref(x2).data_vencimento = e9, type: "date", label: "Validade" }, null, a9, o9));
              }), _: 1 }, a8, o8));
            }), _: 1 }, a7, o7));
          }), _: 1 }, a6, o6)), l6(ssrRenderComponent(ee, null, { default: withCtx((e6, l7, a7, o7) => {
            if (!l7)
              return [createVNode(Sr), createVNode(br, { color: "green", text: "", onClick: (e7) => C2.value = false }, { default: withCtx(() => [createTextVNode("Cancelar")]), _: 1 }, 8, ["onClick"]), createVNode(br, { color: "green", text: "", onClick: (e7) => R2(unref(x2).id) }, { default: withCtx(() => [createTextVNode("Salvar")]), _: 1 }, 8, ["onClick"])];
            l7(ssrRenderComponent(Sr, null, null, a7, o7)), l7(ssrRenderComponent(br, { color: "green", text: "", onClick: (e7) => C2.value = false }, { default: withCtx((e7, l8, a8, o8) => {
              if (!l8)
                return [createTextVNode("Cancelar")];
              l8("Cancelar");
            }), _: 1 }, a7, o7)), l7(ssrRenderComponent(br, { color: "green", text: "", onClick: (e7) => R2(unref(x2).id) }, { default: withCtx((e7, l8, a8, o8) => {
              if (!l8)
                return [createTextVNode("Salvar")];
              l8("Salvar");
            }), _: 1 }, a7, o7));
          }), _: 1 }, a6, o6));
        }), _: 1 }, a5, o5));
      }), _: 1 }, a4, o4));
    }), _: 1 }, a3));
  };
} }, Tl = Dl.setup;
Dl.setup = (e2, l2) => {
  const a2 = useSSRContext();
  return (a2.modules || (a2.modules = /* @__PURE__ */ new Set())).add("components/Documentos.vue"), Tl ? Tl(e2, l2) : void 0;
};
const Nl = { __name: "Endereco", __ssrInlineRender: true, async setup(a2) {
  let o2, t2;
  const { $toast: r2 } = Ue(), n2 = Qe(), { id: s2 } = n2.params, m2 = Ye(), p2 = `${m2.public.managemant}/listarPais`, U2 = `${m2.public.managemant}/getPessoaEnderecoById`, C2 = `${m2.public.managemant}/createPessoaEndereco`, x2 = `${m2.public.managemant}/updatePessoaEndereco`, k2 = ref(Ct("user-data").value.usuario_id).value, $2 = Number(Ct("pessoa-id").value || s2), w2 = reactive({ tabvalores_pais_id: "", cidade_id: "", codcep: "", logradouro: "", numero: "", bairro: "", data_vencimento: "", tabvalores_ufemissor_id: "", complemento: "", cidade_estrangeira: "" }), I2 = [{ title: "Pa\xEDs", value: "pais.descricao" }, { title: "CEP", value: "codcep" }, { title: "Endere\xE7o", value: "logradouro" }, { title: "N*", value: "numero" }, { title: "Complemento", value: "complemento" }, { title: "Bairro", value: "logradouro" }, { title: "Cidade", value: "cidades.nome" }, { value: "actions" }], E2 = ref(false), B2 = ref(null), S2 = computed(() => {
    const e2 = T2.value.paisItems.find((e3) => e3.id === w2.tabvalores_pais_id);
    return !!e2 && e2.estrangeiro;
  }), A2 = { numero: { required: helpers.withMessage("O campo \xE9 obrigatorio", required) }, bairro: { required: helpers.withMessage("O campo \xE9 obrigatorio", required) }, logradouro: { required: helpers.withMessage("O campo \xE9 obrigatorio", required) }, codcep: { required: helpers.withMessage("O campo \xE9 obrigatorio e precisa de 8 digitos", required) } }, D2 = useVuelidate(A2, w2), { data: T2, status: N2, pending: R2, refresh: z2 } = ([o2, t2] = withAsyncContext(async () => v("cliente-enderecos", async () => {
    const [e2, l2, a3] = await Promise.all([$fetch(p2), $fetch(`${U2}/${$2}`), $fetch(`${m2.public.managemant}/listarCidades`)]);
    return { paisItems: e2, enderecosItems: l2, cidadesItems: a3 };
  })), o2 = await o2, t2(), o2);
  async function F2() {
    if (await D2.value.$validate()) {
      const e2 = { ...w2 };
      for (const d2 in e2)
        "" === e2[d2] && (e2[d2] = null);
      const l2 = { ...e2, user_id: k2, pessoa_id: $2 }, { data: a3, error: o3, status: t3 } = await g$2(C2, { method: "POST", body: l2 }, "$xTfPNGciav");
      if ("error" === t3.value && 500 === o3.value.statusCode)
        r2.error("Erro ao cadastrar endere\xE7o,erro no sistema.");
      else {
        r2.success("Endere\xE7o cadastrado com sucesso!"), z2();
        for (const e3 in w2)
          w2[e3] = "";
        D2.value.$reset();
      }
    } else
      r2.error("Erro ao cadastrar Endere\xE7o, preencha os campos obrigatorios.");
  }
  function L2(e2) {
    const l2 = T2.value.enderecosItems.find((l3) => l3.id === e2);
    l2 && (B2.value = l2, E2.value = true);
  }
  async function j2(e2) {
    const l2 = { tabvalores_pais_id: B2.value.tabvalores_pais_id, cidade_id: B2.value.cidade_id, codcep: B2.value.codcep, logradouro: B2.value.logradouro, numero: B2.value.numero, bairro: B2.value.bairro, complemento: B2.value.complemento }, { status: a3 } = await g$2(`${x2}/${e2}`, { method: "PUT", body: l2 }, "$DfOGkJVB8l");
    "success" === a3.value && (E2.value = false, r2.success("Endere\xE7o atualizado com sucesso!"), z2());
  }
  async function M2(e2) {
    e2.excluido = !e2.excluido;
    try {
      await g$2(`${x2}/${e2.id}`, { method: "PUT", body: JSON.stringify({ excluido: e2.excluido }) }, "$u4gWF5EA7L");
    } catch (l2) {
      console.error("Erro ao excluir pessoa:", l2);
    }
  }
  return (e2, l2, a3, o3) => {
    const t3 = g$1, r3 = resolveDirective("mask");
    unref(R2) ? l2("<!---->") : l2(ssrRenderComponent(i, mergeProps({ class: "mt-5" }, o3), { default: withCtx((l3, a4, o4, i2) => {
      if (!a4)
        return [createVNode($, null, { default: withCtx(() => [createVNode(y, { md: "2" }, { default: withCtx(() => [createVNode(L, { modelValue: unref(w2).tabvalores_pais_id, "onUpdate:modelValue": (e3) => unref(w2).tabvalores_pais_id = e3, items: unref(T2).paisItems, label: "Pa\xEDs", "item-title": "descricao", "item-value": "id" }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])]), _: 1 }), createVNode(y, { md: "2" }, { default: withCtx(() => [withDirectives(createVNode(is, { modelValue: unref(w2).codcep, "onUpdate:modelValue": (e3) => unref(w2).codcep = e3, "error-messages": unref(D2).codcep.$errors.map((e3) => e3.$message), required: "", onBlur: unref(D2).codcep.$touch, onInput: unref(D2).codcep.$touch, label: "CEP" }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages", "onBlur", "onInput"]), [[r3, "########"]])]), _: 1 }), createVNode(y, { md: "6" }, { default: withCtx(() => [createVNode(is, { modelValue: unref(w2).logradouro, "onUpdate:modelValue": (e3) => unref(w2).logradouro = e3, label: "Endere\xE7o", "error-messages": unref(D2).logradouro.$errors.map((e3) => e3.$message), required: "", onBlur: unref(D2).logradouro.$touch, onInput: unref(D2).logradouro.$touch }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages", "onBlur", "onInput"])]), _: 1 }), createVNode(y, { md: "1" }, { default: withCtx(() => [createVNode(is, { modelValue: unref(w2).numero, "onUpdate:modelValue": (e3) => unref(w2).numero = e3, "error-messages": unref(D2).numero.$errors.map((e3) => e3.$message), required: "", onBlur: unref(D2).numero.$touch, onInput: unref(D2).numero.$touch, label: "N*" }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages", "onBlur", "onInput"])]), _: 1 }), createVNode("div", { class: "mt-3" }, [createVNode("img", { style: { width: "40px", height: "40px", cursor: "pointer" }, src: A$1, alt: "novo", onClick: F2 })]), createVNode(y, { md: "5" }, { default: withCtx(() => [createVNode(is, { modelValue: unref(w2).complemento, "onUpdate:modelValue": (e3) => unref(w2).complemento = e3, label: "Complemento" }, null, 8, ["modelValue", "onUpdate:modelValue"])]), _: 1 }), createVNode(y, { md: "3" }, { default: withCtx(() => [createVNode(is, { modelValue: unref(w2).bairro, "onUpdate:modelValue": (e3) => unref(w2).bairro = e3, "error-messages": unref(D2).bairro.$errors.map((e3) => e3.$message), required: "", onBlur: unref(D2).bairro.$touch, onInput: unref(D2).bairro.$touch, label: "Bairro" }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages", "onBlur", "onInput"])]), _: 1 }), createVNode(y, { md: "3" }, { default: withCtx(() => [unref(S2) ? (openBlock(), createBlock(is, { key: 1, modelValue: unref(w2).cidade_estrangeira, "onUpdate:modelValue": (e3) => unref(w2).cidade_estrangeira = e3, label: "Cidade Estrangeira" }, null, 8, ["modelValue", "onUpdate:modelValue"])) : (openBlock(), createBlock(L, { key: 0, modelValue: unref(w2).cidade_id, "onUpdate:modelValue": (e3) => unref(w2).cidade_id = e3, items: unref(T2).cidadesItems, label: "Cidade", "item-title": "descricao", "item-value": "id" }, null, 8, ["modelValue", "onUpdate:modelValue", "items"]))]), _: 1 })]), _: 1 }), createVNode(Dc, { headers: I2, items: unref(T2).enderecosItems, "item-key": "id" }, { "item.actions": withCtx(({ item: e3 }) => [createVNode($, { style: { display: "flex", gap: "10px" } }, { default: withCtx(() => [createVNode("div", { onClick: (l4) => L2(e3.id), title: "Visualizar" }, [createVNode("img", { style: { width: "40px", height: "40px", cursor: "pointer" }, src: B, alt: "Visualizar" })], 8, ["onClick"]), createVNode("div", { onClick: (l4) => M2(e3), title: "Visualizar" }, [e3.excluido ? (openBlock(), createBlock("img", { key: 0, style: { width: "40px", height: "40px", cursor: "pointer" }, src: g, alt: "Visualizar", title: "Reativar" })) : (openBlock(), createBlock("img", { key: 1, src: a, alt: "Excluir", class: "trash-icon", style: { width: "40px", height: "40px", cursor: "pointer" }, title: "Excluir" }))], 8, ["onClick"])]), _: 2 }, 1024)]), _: 1 }, 8, ["items"]), createVNode(t3, { to: "/pessoas/registros" }, { default: withCtx(() => [createVNode("img", { class: "btn-pointer", src: A, alt: "Sair" })]), _: 1 }), createVNode($$1, { modelValue: unref(E2), "onUpdate:modelValue": (e3) => isRef(E2) ? E2.value = e3 : null, "max-width": "600px" }, { default: withCtx(() => [createVNode(oe, null, { default: withCtx(() => [createVNode(le, { style: { color: "green" } }, { default: withCtx(() => [createTextVNode("Atualizar Endere\xE7o")]), _: 1 }), createVNode(ie, null, { default: withCtx(() => [createVNode($, null, { default: withCtx(() => [createVNode(y, { cols: "12", md: "6" }, { default: withCtx(() => [createVNode(L, { modelValue: unref(B2).tabvalores_pais_id, "onUpdate:modelValue": (e3) => unref(B2).tabvalores_pais_id = e3, items: unref(T2).paisItems, label: "Pa\xEDs", "item-title": "descricao", "item-value": "id" }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])]), _: 1 }), createVNode(y, { cols: "12", md: "6" }, { default: withCtx(() => [createVNode(is, { modelValue: unref(B2).logradouro, "onUpdate:modelValue": (e3) => unref(B2).logradouro = e3, label: "Logradouro" }, null, 8, ["modelValue", "onUpdate:modelValue"])]), _: 1 }), createVNode(y, { cols: "12", md: "6" }, { default: withCtx(() => [createVNode(is, { modelValue: unref(B2).complemento, "onUpdate:modelValue": (e3) => unref(B2).complemento = e3, label: "Complemento" }, null, 8, ["modelValue", "onUpdate:modelValue"])]), _: 1 }), createVNode(y, { cols: "12", md: "6" }, { default: withCtx(() => [createVNode(is, { modelValue: unref(B2).numero, "onUpdate:modelValue": (e3) => unref(B2).numero = e3, label: "N\xFAmero" }, null, 8, ["modelValue", "onUpdate:modelValue"])]), _: 1 }), createVNode(y, { cols: "12", md: "6" }, { default: withCtx(() => [createVNode(is, { modelValue: unref(B2).bairro, "onUpdate:modelValue": (e3) => unref(B2).bairro = e3, label: "Bairro" }, null, 8, ["modelValue", "onUpdate:modelValue"])]), _: 1 }), createVNode(y, { cols: "12", md: "6" }, { default: withCtx(() => [createVNode(is, { modelValue: unref(B2).codcep, "onUpdate:modelValue": (e3) => unref(B2).codcep = e3, label: "CEP" }, null, 8, ["modelValue", "onUpdate:modelValue"])]), _: 1 }), createVNode(y, { cols: "12", md: "6" }, { default: withCtx(() => [createVNode(L, { modelValue: unref(B2).cidade_id, "onUpdate:modelValue": (e3) => unref(B2).cidade_id = e3, items: unref(T2).cidadesItems, label: "Cidade", "item-title": "descricao", "item-value": "id" }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])]), _: 1 })]), _: 1 })]), _: 1 }), createVNode(ee, null, { default: withCtx(() => [createVNode(Sr), createVNode(br, { color: "green", text: "", onClick: (e3) => E2.value = false }, { default: withCtx(() => [createTextVNode("Cancelar")]), _: 1 }, 8, ["onClick"]), createVNode(br, { color: "green", text: "", onClick: (e3) => j2(unref(B2).id) }, { default: withCtx(() => [createTextVNode("Salvar")]), _: 1 }, 8, ["onClick"])]), _: 1 })]), _: 1 })]), _: 1 }, 8, ["modelValue", "onUpdate:modelValue"])];
      a4(ssrRenderComponent($, null, { default: withCtx((l4, a5, o5, t4) => {
        if (!a5)
          return [createVNode(y, { md: "2" }, { default: withCtx(() => [createVNode(L, { modelValue: unref(w2).tabvalores_pais_id, "onUpdate:modelValue": (e3) => unref(w2).tabvalores_pais_id = e3, items: unref(T2).paisItems, label: "Pa\xEDs", "item-title": "descricao", "item-value": "id" }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])]), _: 1 }), createVNode(y, { md: "2" }, { default: withCtx(() => [withDirectives(createVNode(is, { modelValue: unref(w2).codcep, "onUpdate:modelValue": (e3) => unref(w2).codcep = e3, "error-messages": unref(D2).codcep.$errors.map((e3) => e3.$message), required: "", onBlur: unref(D2).codcep.$touch, onInput: unref(D2).codcep.$touch, label: "CEP" }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages", "onBlur", "onInput"]), [[r3, "########"]])]), _: 1 }), createVNode(y, { md: "6" }, { default: withCtx(() => [createVNode(is, { modelValue: unref(w2).logradouro, "onUpdate:modelValue": (e3) => unref(w2).logradouro = e3, label: "Endere\xE7o", "error-messages": unref(D2).logradouro.$errors.map((e3) => e3.$message), required: "", onBlur: unref(D2).logradouro.$touch, onInput: unref(D2).logradouro.$touch }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages", "onBlur", "onInput"])]), _: 1 }), createVNode(y, { md: "1" }, { default: withCtx(() => [createVNode(is, { modelValue: unref(w2).numero, "onUpdate:modelValue": (e3) => unref(w2).numero = e3, "error-messages": unref(D2).numero.$errors.map((e3) => e3.$message), required: "", onBlur: unref(D2).numero.$touch, onInput: unref(D2).numero.$touch, label: "N*" }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages", "onBlur", "onInput"])]), _: 1 }), createVNode("div", { class: "mt-3" }, [createVNode("img", { style: { width: "40px", height: "40px", cursor: "pointer" }, src: A$1, alt: "novo", onClick: F2 })]), createVNode(y, { md: "5" }, { default: withCtx(() => [createVNode(is, { modelValue: unref(w2).complemento, "onUpdate:modelValue": (e3) => unref(w2).complemento = e3, label: "Complemento" }, null, 8, ["modelValue", "onUpdate:modelValue"])]), _: 1 }), createVNode(y, { md: "3" }, { default: withCtx(() => [createVNode(is, { modelValue: unref(w2).bairro, "onUpdate:modelValue": (e3) => unref(w2).bairro = e3, "error-messages": unref(D2).bairro.$errors.map((e3) => e3.$message), required: "", onBlur: unref(D2).bairro.$touch, onInput: unref(D2).bairro.$touch, label: "Bairro" }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages", "onBlur", "onInput"])]), _: 1 }), createVNode(y, { md: "3" }, { default: withCtx(() => [unref(S2) ? (openBlock(), createBlock(is, { key: 1, modelValue: unref(w2).cidade_estrangeira, "onUpdate:modelValue": (e3) => unref(w2).cidade_estrangeira = e3, label: "Cidade Estrangeira" }, null, 8, ["modelValue", "onUpdate:modelValue"])) : (openBlock(), createBlock(L, { key: 0, modelValue: unref(w2).cidade_id, "onUpdate:modelValue": (e3) => unref(w2).cidade_id = e3, items: unref(T2).cidadesItems, label: "Cidade", "item-title": "descricao", "item-value": "id" }, null, 8, ["modelValue", "onUpdate:modelValue", "items"]))]), _: 1 })];
        a5(ssrRenderComponent(y, { md: "2" }, { default: withCtx((e3, l5, a6, o6) => {
          if (!l5)
            return [createVNode(L, { modelValue: unref(w2).tabvalores_pais_id, "onUpdate:modelValue": (e4) => unref(w2).tabvalores_pais_id = e4, items: unref(T2).paisItems, label: "Pa\xEDs", "item-title": "descricao", "item-value": "id" }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])];
          l5(ssrRenderComponent(L, { modelValue: unref(w2).tabvalores_pais_id, "onUpdate:modelValue": (e4) => unref(w2).tabvalores_pais_id = e4, items: unref(T2).paisItems, label: "Pa\xEDs", "item-title": "descricao", "item-value": "id" }, null, a6, o6));
        }), _: 1 }, o5, t4)), a5(ssrRenderComponent(y, { md: "2" }, { default: withCtx((l5, a6, o6, t5) => {
          if (!a6)
            return [withDirectives(createVNode(is, { modelValue: unref(w2).codcep, "onUpdate:modelValue": (e3) => unref(w2).codcep = e3, "error-messages": unref(D2).codcep.$errors.map((e3) => e3.$message), required: "", onBlur: unref(D2).codcep.$touch, onInput: unref(D2).codcep.$touch, label: "CEP" }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages", "onBlur", "onInput"]), [[r3, "########"]])];
          a6(ssrRenderComponent(is, mergeProps({ modelValue: unref(w2).codcep, "onUpdate:modelValue": (e3) => unref(w2).codcep = e3, "error-messages": unref(D2).codcep.$errors.map((e3) => e3.$message), required: "", onBlur: unref(D2).codcep.$touch, onInput: unref(D2).codcep.$touch, label: "CEP" }, ssrGetDirectiveProps(e2, r3, "########")), null, o6, t5));
        }), _: 1 }, o5, t4)), a5(ssrRenderComponent(y, { md: "6" }, { default: withCtx((e3, l5, a6, o6) => {
          if (!l5)
            return [createVNode(is, { modelValue: unref(w2).logradouro, "onUpdate:modelValue": (e4) => unref(w2).logradouro = e4, label: "Endere\xE7o", "error-messages": unref(D2).logradouro.$errors.map((e4) => e4.$message), required: "", onBlur: unref(D2).logradouro.$touch, onInput: unref(D2).logradouro.$touch }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages", "onBlur", "onInput"])];
          l5(ssrRenderComponent(is, { modelValue: unref(w2).logradouro, "onUpdate:modelValue": (e4) => unref(w2).logradouro = e4, label: "Endere\xE7o", "error-messages": unref(D2).logradouro.$errors.map((e4) => e4.$message), required: "", onBlur: unref(D2).logradouro.$touch, onInput: unref(D2).logradouro.$touch }, null, a6, o6));
        }), _: 1 }, o5, t4)), a5(ssrRenderComponent(y, { md: "1" }, { default: withCtx((e3, l5, a6, o6) => {
          if (!l5)
            return [createVNode(is, { modelValue: unref(w2).numero, "onUpdate:modelValue": (e4) => unref(w2).numero = e4, "error-messages": unref(D2).numero.$errors.map((e4) => e4.$message), required: "", onBlur: unref(D2).numero.$touch, onInput: unref(D2).numero.$touch, label: "N*" }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages", "onBlur", "onInput"])];
          l5(ssrRenderComponent(is, { modelValue: unref(w2).numero, "onUpdate:modelValue": (e4) => unref(w2).numero = e4, "error-messages": unref(D2).numero.$errors.map((e4) => e4.$message), required: "", onBlur: unref(D2).numero.$touch, onInput: unref(D2).numero.$touch, label: "N*" }, null, a6, o6));
        }), _: 1 }, o5, t4)), a5(`<div class="mt-3"${t4}><img style="${ssrRenderStyle({ width: "40px", height: "40px", cursor: "pointer" })}"${ssrRenderAttr("src", A$1)} alt="novo"${t4}></div>`), a5(ssrRenderComponent(y, { md: "5" }, { default: withCtx((e3, l5, a6, o6) => {
          if (!l5)
            return [createVNode(is, { modelValue: unref(w2).complemento, "onUpdate:modelValue": (e4) => unref(w2).complemento = e4, label: "Complemento" }, null, 8, ["modelValue", "onUpdate:modelValue"])];
          l5(ssrRenderComponent(is, { modelValue: unref(w2).complemento, "onUpdate:modelValue": (e4) => unref(w2).complemento = e4, label: "Complemento" }, null, a6, o6));
        }), _: 1 }, o5, t4)), a5(ssrRenderComponent(y, { md: "3" }, { default: withCtx((e3, l5, a6, o6) => {
          if (!l5)
            return [createVNode(is, { modelValue: unref(w2).bairro, "onUpdate:modelValue": (e4) => unref(w2).bairro = e4, "error-messages": unref(D2).bairro.$errors.map((e4) => e4.$message), required: "", onBlur: unref(D2).bairro.$touch, onInput: unref(D2).bairro.$touch, label: "Bairro" }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages", "onBlur", "onInput"])];
          l5(ssrRenderComponent(is, { modelValue: unref(w2).bairro, "onUpdate:modelValue": (e4) => unref(w2).bairro = e4, "error-messages": unref(D2).bairro.$errors.map((e4) => e4.$message), required: "", onBlur: unref(D2).bairro.$touch, onInput: unref(D2).bairro.$touch, label: "Bairro" }, null, a6, o6));
        }), _: 1 }, o5, t4)), a5(ssrRenderComponent(y, { md: "3" }, { default: withCtx((e3, l5, a6, o6) => {
          if (!l5)
            return [unref(S2) ? (openBlock(), createBlock(is, { key: 1, modelValue: unref(w2).cidade_estrangeira, "onUpdate:modelValue": (e4) => unref(w2).cidade_estrangeira = e4, label: "Cidade Estrangeira" }, null, 8, ["modelValue", "onUpdate:modelValue"])) : (openBlock(), createBlock(L, { key: 0, modelValue: unref(w2).cidade_id, "onUpdate:modelValue": (e4) => unref(w2).cidade_id = e4, items: unref(T2).cidadesItems, label: "Cidade", "item-title": "descricao", "item-value": "id" }, null, 8, ["modelValue", "onUpdate:modelValue", "items"]))];
          unref(S2) ? l5(ssrRenderComponent(is, { modelValue: unref(w2).cidade_estrangeira, "onUpdate:modelValue": (e4) => unref(w2).cidade_estrangeira = e4, label: "Cidade Estrangeira" }, null, a6, o6)) : l5(ssrRenderComponent(L, { modelValue: unref(w2).cidade_id, "onUpdate:modelValue": (e4) => unref(w2).cidade_id = e4, items: unref(T2).cidadesItems, label: "Cidade", "item-title": "descricao", "item-value": "id" }, null, a6, o6));
        }), _: 1 }, o5, t4));
      }), _: 1 }, o4, i2)), a4(ssrRenderComponent(Dc, { headers: I2, items: unref(T2).enderecosItems, "item-key": "id" }, { "item.actions": withCtx(({ item: e3 }, l4, a5, o5) => {
        if (!l4)
          return [createVNode($, { style: { display: "flex", gap: "10px" } }, { default: withCtx(() => [createVNode("div", { onClick: (l5) => L2(e3.id), title: "Visualizar" }, [createVNode("img", { style: { width: "40px", height: "40px", cursor: "pointer" }, src: B, alt: "Visualizar" })], 8, ["onClick"]), createVNode("div", { onClick: (l5) => M2(e3), title: "Visualizar" }, [e3.excluido ? (openBlock(), createBlock("img", { key: 0, style: { width: "40px", height: "40px", cursor: "pointer" }, src: g, alt: "Visualizar", title: "Reativar" })) : (openBlock(), createBlock("img", { key: 1, src: a, alt: "Excluir", class: "trash-icon", style: { width: "40px", height: "40px", cursor: "pointer" }, title: "Excluir" }))], 8, ["onClick"])]), _: 2 }, 1024)];
        l4(ssrRenderComponent($, { style: { display: "flex", gap: "10px" } }, { default: withCtx((l5, a6, o6, t4) => {
          if (!a6)
            return [createVNode("div", { onClick: (l6) => L2(e3.id), title: "Visualizar" }, [createVNode("img", { style: { width: "40px", height: "40px", cursor: "pointer" }, src: B, alt: "Visualizar" })], 8, ["onClick"]), createVNode("div", { onClick: (l6) => M2(e3), title: "Visualizar" }, [e3.excluido ? (openBlock(), createBlock("img", { key: 0, style: { width: "40px", height: "40px", cursor: "pointer" }, src: g, alt: "Visualizar", title: "Reativar" })) : (openBlock(), createBlock("img", { key: 1, src: a, alt: "Excluir", class: "trash-icon", style: { width: "40px", height: "40px", cursor: "pointer" }, title: "Excluir" }))], 8, ["onClick"])];
          a6(`<div title="Visualizar"${t4}><img style="${ssrRenderStyle({ width: "40px", height: "40px", cursor: "pointer" })}"${ssrRenderAttr("src", B)} alt="Visualizar"${t4}></div><div title="Visualizar"${t4}>`), e3.excluido ? a6(`<img style="${ssrRenderStyle({ width: "40px", height: "40px", cursor: "pointer" })}"${ssrRenderAttr("src", g)} alt="Visualizar" title="Reativar"${t4}>`) : a6(`<img${ssrRenderAttr("src", a)} alt="Excluir" class="trash-icon" style="${ssrRenderStyle({ width: "40px", height: "40px", cursor: "pointer" })}" title="Excluir"${t4}>`), a6("</div>");
        }), _: 2 }, a5, o5));
      }), _: 1 }, o4, i2)), a4(ssrRenderComponent(t3, { to: "/pessoas/registros" }, { default: withCtx((e3, l4, a5, o5) => {
        if (!l4)
          return [createVNode("img", { class: "btn-pointer", src: A, alt: "Sair" })];
        l4(`<img class="btn-pointer"${ssrRenderAttr("src", A)} alt="Sair"${o5}>`);
      }), _: 1 }, o4, i2)), a4(ssrRenderComponent($$1, { modelValue: unref(E2), "onUpdate:modelValue": (e3) => isRef(E2) ? E2.value = e3 : null, "max-width": "600px" }, { default: withCtx((e3, l4, a5, o5) => {
        if (!l4)
          return [createVNode(oe, null, { default: withCtx(() => [createVNode(le, { style: { color: "green" } }, { default: withCtx(() => [createTextVNode("Atualizar Endere\xE7o")]), _: 1 }), createVNode(ie, null, { default: withCtx(() => [createVNode($, null, { default: withCtx(() => [createVNode(y, { cols: "12", md: "6" }, { default: withCtx(() => [createVNode(L, { modelValue: unref(B2).tabvalores_pais_id, "onUpdate:modelValue": (e4) => unref(B2).tabvalores_pais_id = e4, items: unref(T2).paisItems, label: "Pa\xEDs", "item-title": "descricao", "item-value": "id" }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])]), _: 1 }), createVNode(y, { cols: "12", md: "6" }, { default: withCtx(() => [createVNode(is, { modelValue: unref(B2).logradouro, "onUpdate:modelValue": (e4) => unref(B2).logradouro = e4, label: "Logradouro" }, null, 8, ["modelValue", "onUpdate:modelValue"])]), _: 1 }), createVNode(y, { cols: "12", md: "6" }, { default: withCtx(() => [createVNode(is, { modelValue: unref(B2).complemento, "onUpdate:modelValue": (e4) => unref(B2).complemento = e4, label: "Complemento" }, null, 8, ["modelValue", "onUpdate:modelValue"])]), _: 1 }), createVNode(y, { cols: "12", md: "6" }, { default: withCtx(() => [createVNode(is, { modelValue: unref(B2).numero, "onUpdate:modelValue": (e4) => unref(B2).numero = e4, label: "N\xFAmero" }, null, 8, ["modelValue", "onUpdate:modelValue"])]), _: 1 }), createVNode(y, { cols: "12", md: "6" }, { default: withCtx(() => [createVNode(is, { modelValue: unref(B2).bairro, "onUpdate:modelValue": (e4) => unref(B2).bairro = e4, label: "Bairro" }, null, 8, ["modelValue", "onUpdate:modelValue"])]), _: 1 }), createVNode(y, { cols: "12", md: "6" }, { default: withCtx(() => [createVNode(is, { modelValue: unref(B2).codcep, "onUpdate:modelValue": (e4) => unref(B2).codcep = e4, label: "CEP" }, null, 8, ["modelValue", "onUpdate:modelValue"])]), _: 1 }), createVNode(y, { cols: "12", md: "6" }, { default: withCtx(() => [createVNode(L, { modelValue: unref(B2).cidade_id, "onUpdate:modelValue": (e4) => unref(B2).cidade_id = e4, items: unref(T2).cidadesItems, label: "Cidade", "item-title": "descricao", "item-value": "id" }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])]), _: 1 })]), _: 1 })]), _: 1 }), createVNode(ee, null, { default: withCtx(() => [createVNode(Sr), createVNode(br, { color: "green", text: "", onClick: (e4) => E2.value = false }, { default: withCtx(() => [createTextVNode("Cancelar")]), _: 1 }, 8, ["onClick"]), createVNode(br, { color: "green", text: "", onClick: (e4) => j2(unref(B2).id) }, { default: withCtx(() => [createTextVNode("Salvar")]), _: 1 }, 8, ["onClick"])]), _: 1 })]), _: 1 })];
        l4(ssrRenderComponent(oe, null, { default: withCtx((e4, l5, a6, o6) => {
          if (!l5)
            return [createVNode(le, { style: { color: "green" } }, { default: withCtx(() => [createTextVNode("Atualizar Endere\xE7o")]), _: 1 }), createVNode(ie, null, { default: withCtx(() => [createVNode($, null, { default: withCtx(() => [createVNode(y, { cols: "12", md: "6" }, { default: withCtx(() => [createVNode(L, { modelValue: unref(B2).tabvalores_pais_id, "onUpdate:modelValue": (e5) => unref(B2).tabvalores_pais_id = e5, items: unref(T2).paisItems, label: "Pa\xEDs", "item-title": "descricao", "item-value": "id" }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])]), _: 1 }), createVNode(y, { cols: "12", md: "6" }, { default: withCtx(() => [createVNode(is, { modelValue: unref(B2).logradouro, "onUpdate:modelValue": (e5) => unref(B2).logradouro = e5, label: "Logradouro" }, null, 8, ["modelValue", "onUpdate:modelValue"])]), _: 1 }), createVNode(y, { cols: "12", md: "6" }, { default: withCtx(() => [createVNode(is, { modelValue: unref(B2).complemento, "onUpdate:modelValue": (e5) => unref(B2).complemento = e5, label: "Complemento" }, null, 8, ["modelValue", "onUpdate:modelValue"])]), _: 1 }), createVNode(y, { cols: "12", md: "6" }, { default: withCtx(() => [createVNode(is, { modelValue: unref(B2).numero, "onUpdate:modelValue": (e5) => unref(B2).numero = e5, label: "N\xFAmero" }, null, 8, ["modelValue", "onUpdate:modelValue"])]), _: 1 }), createVNode(y, { cols: "12", md: "6" }, { default: withCtx(() => [createVNode(is, { modelValue: unref(B2).bairro, "onUpdate:modelValue": (e5) => unref(B2).bairro = e5, label: "Bairro" }, null, 8, ["modelValue", "onUpdate:modelValue"])]), _: 1 }), createVNode(y, { cols: "12", md: "6" }, { default: withCtx(() => [createVNode(is, { modelValue: unref(B2).codcep, "onUpdate:modelValue": (e5) => unref(B2).codcep = e5, label: "CEP" }, null, 8, ["modelValue", "onUpdate:modelValue"])]), _: 1 }), createVNode(y, { cols: "12", md: "6" }, { default: withCtx(() => [createVNode(L, { modelValue: unref(B2).cidade_id, "onUpdate:modelValue": (e5) => unref(B2).cidade_id = e5, items: unref(T2).cidadesItems, label: "Cidade", "item-title": "descricao", "item-value": "id" }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])]), _: 1 })]), _: 1 })]), _: 1 }), createVNode(ee, null, { default: withCtx(() => [createVNode(Sr), createVNode(br, { color: "green", text: "", onClick: (e5) => E2.value = false }, { default: withCtx(() => [createTextVNode("Cancelar")]), _: 1 }, 8, ["onClick"]), createVNode(br, { color: "green", text: "", onClick: (e5) => j2(unref(B2).id) }, { default: withCtx(() => [createTextVNode("Salvar")]), _: 1 }, 8, ["onClick"])]), _: 1 })];
          l5(ssrRenderComponent(le, { style: { color: "green" } }, { default: withCtx((e5, l6, a7, o7) => {
            if (!l6)
              return [createTextVNode("Atualizar Endere\xE7o")];
            l6("Atualizar Endere\xE7o");
          }), _: 1 }, a6, o6)), l5(ssrRenderComponent(ie, null, { default: withCtx((e5, l6, a7, o7) => {
            if (!l6)
              return [createVNode($, null, { default: withCtx(() => [createVNode(y, { cols: "12", md: "6" }, { default: withCtx(() => [createVNode(L, { modelValue: unref(B2).tabvalores_pais_id, "onUpdate:modelValue": (e6) => unref(B2).tabvalores_pais_id = e6, items: unref(T2).paisItems, label: "Pa\xEDs", "item-title": "descricao", "item-value": "id" }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])]), _: 1 }), createVNode(y, { cols: "12", md: "6" }, { default: withCtx(() => [createVNode(is, { modelValue: unref(B2).logradouro, "onUpdate:modelValue": (e6) => unref(B2).logradouro = e6, label: "Logradouro" }, null, 8, ["modelValue", "onUpdate:modelValue"])]), _: 1 }), createVNode(y, { cols: "12", md: "6" }, { default: withCtx(() => [createVNode(is, { modelValue: unref(B2).complemento, "onUpdate:modelValue": (e6) => unref(B2).complemento = e6, label: "Complemento" }, null, 8, ["modelValue", "onUpdate:modelValue"])]), _: 1 }), createVNode(y, { cols: "12", md: "6" }, { default: withCtx(() => [createVNode(is, { modelValue: unref(B2).numero, "onUpdate:modelValue": (e6) => unref(B2).numero = e6, label: "N\xFAmero" }, null, 8, ["modelValue", "onUpdate:modelValue"])]), _: 1 }), createVNode(y, { cols: "12", md: "6" }, { default: withCtx(() => [createVNode(is, { modelValue: unref(B2).bairro, "onUpdate:modelValue": (e6) => unref(B2).bairro = e6, label: "Bairro" }, null, 8, ["modelValue", "onUpdate:modelValue"])]), _: 1 }), createVNode(y, { cols: "12", md: "6" }, { default: withCtx(() => [createVNode(is, { modelValue: unref(B2).codcep, "onUpdate:modelValue": (e6) => unref(B2).codcep = e6, label: "CEP" }, null, 8, ["modelValue", "onUpdate:modelValue"])]), _: 1 }), createVNode(y, { cols: "12", md: "6" }, { default: withCtx(() => [createVNode(L, { modelValue: unref(B2).cidade_id, "onUpdate:modelValue": (e6) => unref(B2).cidade_id = e6, items: unref(T2).cidadesItems, label: "Cidade", "item-title": "descricao", "item-value": "id" }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])]), _: 1 })]), _: 1 })];
            l6(ssrRenderComponent($, null, { default: withCtx((e6, l7, a8, o8) => {
              if (!l7)
                return [createVNode(y, { cols: "12", md: "6" }, { default: withCtx(() => [createVNode(L, { modelValue: unref(B2).tabvalores_pais_id, "onUpdate:modelValue": (e7) => unref(B2).tabvalores_pais_id = e7, items: unref(T2).paisItems, label: "Pa\xEDs", "item-title": "descricao", "item-value": "id" }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])]), _: 1 }), createVNode(y, { cols: "12", md: "6" }, { default: withCtx(() => [createVNode(is, { modelValue: unref(B2).logradouro, "onUpdate:modelValue": (e7) => unref(B2).logradouro = e7, label: "Logradouro" }, null, 8, ["modelValue", "onUpdate:modelValue"])]), _: 1 }), createVNode(y, { cols: "12", md: "6" }, { default: withCtx(() => [createVNode(is, { modelValue: unref(B2).complemento, "onUpdate:modelValue": (e7) => unref(B2).complemento = e7, label: "Complemento" }, null, 8, ["modelValue", "onUpdate:modelValue"])]), _: 1 }), createVNode(y, { cols: "12", md: "6" }, { default: withCtx(() => [createVNode(is, { modelValue: unref(B2).numero, "onUpdate:modelValue": (e7) => unref(B2).numero = e7, label: "N\xFAmero" }, null, 8, ["modelValue", "onUpdate:modelValue"])]), _: 1 }), createVNode(y, { cols: "12", md: "6" }, { default: withCtx(() => [createVNode(is, { modelValue: unref(B2).bairro, "onUpdate:modelValue": (e7) => unref(B2).bairro = e7, label: "Bairro" }, null, 8, ["modelValue", "onUpdate:modelValue"])]), _: 1 }), createVNode(y, { cols: "12", md: "6" }, { default: withCtx(() => [createVNode(is, { modelValue: unref(B2).codcep, "onUpdate:modelValue": (e7) => unref(B2).codcep = e7, label: "CEP" }, null, 8, ["modelValue", "onUpdate:modelValue"])]), _: 1 }), createVNode(y, { cols: "12", md: "6" }, { default: withCtx(() => [createVNode(L, { modelValue: unref(B2).cidade_id, "onUpdate:modelValue": (e7) => unref(B2).cidade_id = e7, items: unref(T2).cidadesItems, label: "Cidade", "item-title": "descricao", "item-value": "id" }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])]), _: 1 })];
              l7(ssrRenderComponent(y, { cols: "12", md: "6" }, { default: withCtx((e7, l8, a9, o9) => {
                if (!l8)
                  return [createVNode(L, { modelValue: unref(B2).tabvalores_pais_id, "onUpdate:modelValue": (e8) => unref(B2).tabvalores_pais_id = e8, items: unref(T2).paisItems, label: "Pa\xEDs", "item-title": "descricao", "item-value": "id" }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])];
                l8(ssrRenderComponent(L, { modelValue: unref(B2).tabvalores_pais_id, "onUpdate:modelValue": (e8) => unref(B2).tabvalores_pais_id = e8, items: unref(T2).paisItems, label: "Pa\xEDs", "item-title": "descricao", "item-value": "id" }, null, a9, o9));
              }), _: 1 }, a8, o8)), l7(ssrRenderComponent(y, { cols: "12", md: "6" }, { default: withCtx((e7, l8, a9, o9) => {
                if (!l8)
                  return [createVNode(is, { modelValue: unref(B2).logradouro, "onUpdate:modelValue": (e8) => unref(B2).logradouro = e8, label: "Logradouro" }, null, 8, ["modelValue", "onUpdate:modelValue"])];
                l8(ssrRenderComponent(is, { modelValue: unref(B2).logradouro, "onUpdate:modelValue": (e8) => unref(B2).logradouro = e8, label: "Logradouro" }, null, a9, o9));
              }), _: 1 }, a8, o8)), l7(ssrRenderComponent(y, { cols: "12", md: "6" }, { default: withCtx((e7, l8, a9, o9) => {
                if (!l8)
                  return [createVNode(is, { modelValue: unref(B2).complemento, "onUpdate:modelValue": (e8) => unref(B2).complemento = e8, label: "Complemento" }, null, 8, ["modelValue", "onUpdate:modelValue"])];
                l8(ssrRenderComponent(is, { modelValue: unref(B2).complemento, "onUpdate:modelValue": (e8) => unref(B2).complemento = e8, label: "Complemento" }, null, a9, o9));
              }), _: 1 }, a8, o8)), l7(ssrRenderComponent(y, { cols: "12", md: "6" }, { default: withCtx((e7, l8, a9, o9) => {
                if (!l8)
                  return [createVNode(is, { modelValue: unref(B2).numero, "onUpdate:modelValue": (e8) => unref(B2).numero = e8, label: "N\xFAmero" }, null, 8, ["modelValue", "onUpdate:modelValue"])];
                l8(ssrRenderComponent(is, { modelValue: unref(B2).numero, "onUpdate:modelValue": (e8) => unref(B2).numero = e8, label: "N\xFAmero" }, null, a9, o9));
              }), _: 1 }, a8, o8)), l7(ssrRenderComponent(y, { cols: "12", md: "6" }, { default: withCtx((e7, l8, a9, o9) => {
                if (!l8)
                  return [createVNode(is, { modelValue: unref(B2).bairro, "onUpdate:modelValue": (e8) => unref(B2).bairro = e8, label: "Bairro" }, null, 8, ["modelValue", "onUpdate:modelValue"])];
                l8(ssrRenderComponent(is, { modelValue: unref(B2).bairro, "onUpdate:modelValue": (e8) => unref(B2).bairro = e8, label: "Bairro" }, null, a9, o9));
              }), _: 1 }, a8, o8)), l7(ssrRenderComponent(y, { cols: "12", md: "6" }, { default: withCtx((e7, l8, a9, o9) => {
                if (!l8)
                  return [createVNode(is, { modelValue: unref(B2).codcep, "onUpdate:modelValue": (e8) => unref(B2).codcep = e8, label: "CEP" }, null, 8, ["modelValue", "onUpdate:modelValue"])];
                l8(ssrRenderComponent(is, { modelValue: unref(B2).codcep, "onUpdate:modelValue": (e8) => unref(B2).codcep = e8, label: "CEP" }, null, a9, o9));
              }), _: 1 }, a8, o8)), l7(ssrRenderComponent(y, { cols: "12", md: "6" }, { default: withCtx((e7, l8, a9, o9) => {
                if (!l8)
                  return [createVNode(L, { modelValue: unref(B2).cidade_id, "onUpdate:modelValue": (e8) => unref(B2).cidade_id = e8, items: unref(T2).cidadesItems, label: "Cidade", "item-title": "descricao", "item-value": "id" }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])];
                l8(ssrRenderComponent(L, { modelValue: unref(B2).cidade_id, "onUpdate:modelValue": (e8) => unref(B2).cidade_id = e8, items: unref(T2).cidadesItems, label: "Cidade", "item-title": "descricao", "item-value": "id" }, null, a9, o9));
              }), _: 1 }, a8, o8));
            }), _: 1 }, a7, o7));
          }), _: 1 }, a6, o6)), l5(ssrRenderComponent(ee, null, { default: withCtx((e5, l6, a7, o7) => {
            if (!l6)
              return [createVNode(Sr), createVNode(br, { color: "green", text: "", onClick: (e6) => E2.value = false }, { default: withCtx(() => [createTextVNode("Cancelar")]), _: 1 }, 8, ["onClick"]), createVNode(br, { color: "green", text: "", onClick: (e6) => j2(unref(B2).id) }, { default: withCtx(() => [createTextVNode("Salvar")]), _: 1 }, 8, ["onClick"])];
            l6(ssrRenderComponent(Sr, null, null, a7, o7)), l6(ssrRenderComponent(br, { color: "green", text: "", onClick: (e6) => E2.value = false }, { default: withCtx((e6, l7, a8, o8) => {
              if (!l7)
                return [createTextVNode("Cancelar")];
              l7("Cancelar");
            }), _: 1 }, a7, o7)), l6(ssrRenderComponent(br, { color: "green", text: "", onClick: (e6) => j2(unref(B2).id) }, { default: withCtx((e6, l7, a8, o8) => {
              if (!l7)
                return [createTextVNode("Salvar")];
              l7("Salvar");
            }), _: 1 }, a7, o7));
          }), _: 1 }, a6, o6));
        }), _: 1 }, a5, o5));
      }), _: 1 }, o4, i2));
    }), _: 1 }, a3));
  };
} }, Pl = Nl.setup;
Nl.setup = (e2, l2) => {
  const a2 = useSSRContext();
  return (a2.modules || (a2.modules = /* @__PURE__ */ new Set())).add("components/Endereco.vue"), Pl ? Pl(e2, l2) : void 0;
};
const Rl = { __name: "Digital", __ssrInlineRender: true, setup(l2) {
  const a2 = ref(["E1", "E2", "E3", "E4", "E5"]);
  var o2 = ref(["red", "red", "red", "red", "red"]);
  const t2 = ref(["D1", "D2", "D3", "D4", "D5"]);
  var u2 = ref(["red", "red", "red", "red", "red"]);
  const i2 = ref(false), r2 = ref(null), n2 = ref(null), s2 = ref(null), m2 = Qe(), { id: v2 } = m2.params, { $toast: f2 } = Ue(), U2 = Ye(), $2 = `${U2.public.biometria}`, w2 = `${U2.public.managemant}/createPessoaBiometria`;
  function I2(e2) {
    r2.value = e2, i2.value = true;
  }
  function E2() {
    i2.value = false, r2.value = null, n2.value = null, s2.value = null;
  }
  async function B2() {
    const { status: e2, data: l3 } = await g$2($2, { method: "GET" }, "$b5yqRnLFV9");
    if ("success" === e2.value) {
      const e3 = l3.value.hash, a3 = { user_id: Ct("user-data").value.usuario_id, pessoa_id: Number(v2), dedo: r2.value, hash: e3 }, { status: o3, data: t3 } = await g$2(w2, { method: "POST", body: a3 }, "$cWP9jlCX2Z");
      "success" === o3.value ? (f2.success("Biometria enviada com sucesso!"), E2()) : f2.error("Falha ao enviar a biometria."), E2();
    } else
      f2.error("Erro ao Capturar biometria para o sistema.");
  }
  function S2(e2, l3) {
    const d2 = { E1: { top: 82, left: -10 }, E2: { top: 35, left: 4 }, E3: { top: 0, left: 30 }, E4: { top: 15, left: 75 }, E5: { top: 50, left: 170 }, D1: { top: 50, left: 210 }, D2: { top: 18, left: 300 }, D3: { top: 5, left: 350 }, D4: { top: 35, left: 375 }, D5: { top: 80, left: 390 } }[e2];
    let i3 = "red";
    if ("left" === l3) {
      const l4 = a2.value.indexOf(e2);
      -1 !== l4 && (i3 = o2.value[l4]);
    } else if ("right" === l3) {
      const l4 = t2.value.indexOf(e2);
      -1 !== l4 && (i3 = u2.value[l4]);
    }
    return { backgroundColor: i3, top: `${d2.top}px`, left: `${d2.left}px` };
  }
  return U2.public.managemant, (e2, l3, o3, u3) => {
    l3(ssrRenderComponent(y, mergeProps({ style: { "margin-top": "20px" }, cols: "auto", class: "biometria-container" }, u3), { default: withCtx((e3, l4, o4, u4) => {
      if (!l4)
        return [createVNode("div", { class: "finger-container" }, [(openBlock(true), createBlock(Fragment, null, renderList(unref(a2), (e4, l5) => (openBlock(), createBlock("div", { key: l5, class: "finger", style: S2(e4, "left"), onClick: (l6) => I2(e4) }, null, 12, ["onClick"]))), 128)), (openBlock(true), createBlock(Fragment, null, renderList(unref(t2), (e4, l5) => (openBlock(), createBlock("div", { key: l5, class: "finger", style: S2(e4, "right"), onClick: (l6) => I2(e4) }, null, 12, ["onClick"]))), 128))]), createVNode($$1, { modelValue: unref(i2), "onUpdate:modelValue": (e4) => isRef(i2) ? i2.value = e4 : null, "max-width": "600px" }, { default: withCtx(() => [createVNode(oe, null, { default: withCtx(() => [createVNode(le, null, { default: withCtx(() => [createTextVNode(" Captura de Biometria ")]), _: 1 }), createVNode(ie, null, { default: withCtx(() => [unref(n2) ? (openBlock(), createBlock("div", { key: 0 }, [createVNode("p", null, "Biometria existente para " + toDisplayString(unref(r2)) + ".", 1), createVNode(gs, { src: unref(n2), alt: "Biometria" }, null, 8, ["src"]), createVNode("p", null, "Deseja substituir?")])) : (openBlock(), createBlock("div", { key: 1 }, [createVNode("p", null, " Nenhuma biometria encontrada para " + toDisplayString(unref(r2)) + ". Capturando nova biometria... ", 1)])), unref(s2) ? (openBlock(), createBlock("div", { key: 2 }, [createVNode("p", null, "Dispositivo biom\xE9trico detectado: " + toDisplayString(unref(s2)), 1)])) : createCommentVNode("", true)]), _: 1 }), createVNode(ee, null, { default: withCtx(() => [createVNode(br, { color: "green", onClick: B2 }, { default: withCtx(() => [createTextVNode("Capturar")]), _: 1 }), createVNode(br, { color: "red", onClick: E2 }, { default: withCtx(() => [createTextVNode("Cancelar")]), _: 1 })]), _: 1 })]), _: 1 })]), _: 1 }, 8, ["modelValue", "onUpdate:modelValue"])];
      l4(`<div class="finger-container" data-v-4a18671e${u4}><!--[-->`), ssrRenderList(unref(a2), (e4, a3) => {
        l4(`<div class="finger" style="${ssrRenderStyle(S2(e4, "left"))}" data-v-4a18671e${u4}></div>`);
      }), l4("<!--]--><!--[-->"), ssrRenderList(unref(t2), (e4, a3) => {
        l4(`<div class="finger" style="${ssrRenderStyle(S2(e4, "right"))}" data-v-4a18671e${u4}></div>`);
      }), l4("<!--]--></div>"), l4(ssrRenderComponent($$1, { modelValue: unref(i2), "onUpdate:modelValue": (e4) => isRef(i2) ? i2.value = e4 : null, "max-width": "600px" }, { default: withCtx((e4, l5, a3, o5) => {
        if (!l5)
          return [createVNode(oe, null, { default: withCtx(() => [createVNode(le, null, { default: withCtx(() => [createTextVNode(" Captura de Biometria ")]), _: 1 }), createVNode(ie, null, { default: withCtx(() => [unref(n2) ? (openBlock(), createBlock("div", { key: 0 }, [createVNode("p", null, "Biometria existente para " + toDisplayString(unref(r2)) + ".", 1), createVNode(gs, { src: unref(n2), alt: "Biometria" }, null, 8, ["src"]), createVNode("p", null, "Deseja substituir?")])) : (openBlock(), createBlock("div", { key: 1 }, [createVNode("p", null, " Nenhuma biometria encontrada para " + toDisplayString(unref(r2)) + ". Capturando nova biometria... ", 1)])), unref(s2) ? (openBlock(), createBlock("div", { key: 2 }, [createVNode("p", null, "Dispositivo biom\xE9trico detectado: " + toDisplayString(unref(s2)), 1)])) : createCommentVNode("", true)]), _: 1 }), createVNode(ee, null, { default: withCtx(() => [createVNode(br, { color: "green", onClick: B2 }, { default: withCtx(() => [createTextVNode("Capturar")]), _: 1 }), createVNode(br, { color: "red", onClick: E2 }, { default: withCtx(() => [createTextVNode("Cancelar")]), _: 1 })]), _: 1 })]), _: 1 })];
        l5(ssrRenderComponent(oe, null, { default: withCtx((e5, l6, a4, o6) => {
          if (!l6)
            return [createVNode(le, null, { default: withCtx(() => [createTextVNode(" Captura de Biometria ")]), _: 1 }), createVNode(ie, null, { default: withCtx(() => [unref(n2) ? (openBlock(), createBlock("div", { key: 0 }, [createVNode("p", null, "Biometria existente para " + toDisplayString(unref(r2)) + ".", 1), createVNode(gs, { src: unref(n2), alt: "Biometria" }, null, 8, ["src"]), createVNode("p", null, "Deseja substituir?")])) : (openBlock(), createBlock("div", { key: 1 }, [createVNode("p", null, " Nenhuma biometria encontrada para " + toDisplayString(unref(r2)) + ". Capturando nova biometria... ", 1)])), unref(s2) ? (openBlock(), createBlock("div", { key: 2 }, [createVNode("p", null, "Dispositivo biom\xE9trico detectado: " + toDisplayString(unref(s2)), 1)])) : createCommentVNode("", true)]), _: 1 }), createVNode(ee, null, { default: withCtx(() => [createVNode(br, { color: "green", onClick: B2 }, { default: withCtx(() => [createTextVNode("Capturar")]), _: 1 }), createVNode(br, { color: "red", onClick: E2 }, { default: withCtx(() => [createTextVNode("Cancelar")]), _: 1 })]), _: 1 })];
          l6(ssrRenderComponent(le, null, { default: withCtx((e6, l7, a5, o7) => {
            if (!l7)
              return [createTextVNode(" Captura de Biometria ")];
            l7(" Captura de Biometria ");
          }), _: 1 }, a4, o6)), l6(ssrRenderComponent(ie, null, { default: withCtx((e6, l7, a5, o7) => {
            if (!l7)
              return [unref(n2) ? (openBlock(), createBlock("div", { key: 0 }, [createVNode("p", null, "Biometria existente para " + toDisplayString(unref(r2)) + ".", 1), createVNode(gs, { src: unref(n2), alt: "Biometria" }, null, 8, ["src"]), createVNode("p", null, "Deseja substituir?")])) : (openBlock(), createBlock("div", { key: 1 }, [createVNode("p", null, " Nenhuma biometria encontrada para " + toDisplayString(unref(r2)) + ". Capturando nova biometria... ", 1)])), unref(s2) ? (openBlock(), createBlock("div", { key: 2 }, [createVNode("p", null, "Dispositivo biom\xE9trico detectado: " + toDisplayString(unref(s2)), 1)])) : createCommentVNode("", true)];
            unref(n2) ? (l7(`<div data-v-4a18671e${o7}><p data-v-4a18671e${o7}>Biometria existente para ${ssrInterpolate(unref(r2))}.</p>`), l7(ssrRenderComponent(gs, { src: unref(n2), alt: "Biometria" }, null, a5, o7)), l7(`<p data-v-4a18671e${o7}>Deseja substituir?</p></div>`)) : l7(`<div data-v-4a18671e${o7}><p data-v-4a18671e${o7}> Nenhuma biometria encontrada para ${ssrInterpolate(unref(r2))}. Capturando nova biometria... </p></div>`), unref(s2) ? l7(`<div data-v-4a18671e${o7}><p data-v-4a18671e${o7}>Dispositivo biom\xE9trico detectado: ${ssrInterpolate(unref(s2))}</p></div>`) : l7("<!---->");
          }), _: 1 }, a4, o6)), l6(ssrRenderComponent(ee, null, { default: withCtx((e6, l7, a5, o7) => {
            if (!l7)
              return [createVNode(br, { color: "green", onClick: B2 }, { default: withCtx(() => [createTextVNode("Capturar")]), _: 1 }), createVNode(br, { color: "red", onClick: E2 }, { default: withCtx(() => [createTextVNode("Cancelar")]), _: 1 })];
            l7(ssrRenderComponent(br, { color: "green", onClick: B2 }, { default: withCtx((e7, l8, a6, o8) => {
              if (!l8)
                return [createTextVNode("Capturar")];
              l8("Capturar");
            }), _: 1 }, a5, o7)), l7(ssrRenderComponent(br, { color: "red", onClick: E2 }, { default: withCtx((e7, l8, a6, o8) => {
              if (!l8)
                return [createTextVNode("Cancelar")];
              l8("Cancelar");
            }), _: 1 }, a5, o7));
          }), _: 1 }, a4, o6));
        }), _: 1 }, a3, o5));
      }), _: 1 }, o4, u4));
    }), _: 1 }, o3));
  };
} }, zl = Rl.setup;
Rl.setup = (e2, l2) => {
  const a2 = useSSRContext();
  return (a2.modules || (a2.modules = /* @__PURE__ */ new Set())).add("components/Biometria/Digital.vue"), zl ? zl(e2, l2) : void 0;
};
const Fl = jc(Rl, [["__scopeId", "data-v-4a18671e"]]), Ll = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAADsQAAA7EB9YPtSQAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAlmSURBVHic7Z1rjF1VFcd/zLSlUqYzLfJohxlKIBJTFAmmMcpjLNUAAY0JBIMxtISPimKCWm2V1wc/QpRHFCEYjSmvKtgXA8jDWkWKtFFMEGKlkKD2QaudaTvtjB/WvWFyufesfR57n33OXb9kfbkn9+z/3nudffZj7X3AMAzDMAzDMAzDMAzDMAzDMIw6c0zZAnIwH/g8cCHwceBE4ARghud0jwC7gf8ALwHPAY8DezynazQ4E3gAGAOmIrEx4H7gDI/57npmAKuBccqv8CRHWI3/Vqjr6AOeoPwKdrUngQEvJdGFzAVeofxKTWt/bmg3cjAD2ET5lZnVNmKvg1x8m/IrMa99s/BS6RJOBw5QfgXmtQPAomKLpju4C7cCfgm4FhgCegPo6gWGG2luddT4owC6asVcYD/JhToJfAfoKUkjjbRXNbQkad2PdQhTsRz9qVpVlrg2fA9d74rS1FWQdSQX5jbCNPeu9ALbSda8vjR1FWMecIjkwry+NHWduZ5kzYeR9QtD4TqqWZAD6I5rrwEHNpBciOvKk6ayHnsN5MKl+V9eljgHVlCx1itrPEA/cClwBfAxYLDxm28mgFOId+19PvAOMNNzOhPAv4G3gNeRhbINyHDTK8PIWrz2lPqyKjSh2mvAlx0Efgqc6iNTvcDtlL8WX4VOlNaJ9W1jwC0UOEyOZS0+uvdnB1xGAyFsIwXEJAwAf4kgM1PIO64qaCOZULadHFPQvYgXlZ2Jpl2ZNSMlcBXll1fT1pHxdXB7BOKbtp5qRTD3ENfDc3PaDAxTfofvKDLE+T4wO20GImA2UvCvI3kpsyzHkKG6Mw843nj6Wrzvsa/xHjNJH5Nwn+vN+9F7sUeBb1GtZrmu9AAr0VuZg8iITuWLyo2mkMo34mIler1d5XKjXyg32Yo9+THSA7xMct39rPVP7UKWz1USurNxs6rQB5yP5OujyLtzGDgOmeeYQAI39yL7/f4GvIb0bzYjHagqMAn8ENmi1olzXG6kxeIN55IZhkHgRuAFpIKz9p4PIZs/vwacFDQH2VhEcn72utxE60zEvNFhGTJt7WPYdRj4NdKaxMpM9M67ilYQMbIU2ELxld7JnkW2pcdI7vqrkgMsQDo2oSq+1R4CTvaQryHgEeR1vB9YC5zl+N+ucYBrgHcpr/Kbtgf4QoH5GkIOoGiXzpDD/2vvAMciPd2yK366TSKjo1kF5O+RhHQecvh/rR3gBKRnX3aFd7IngeNz5jFpFLbP4f+p6q/dhI5WyWVNAp0MjAIfyfDfw0gncRQZ5+9o2CHee2oXAIuBs4ElSMcyyxP9J+AyYFeG/4I4QKcp233oQR656y/GFmA+8FcHba32PDL9meWpnIcstoxmSPfFjGmCdPg63XeNw/9r9wqYjVRkmgpYi5wcVhSfIP36/iaytSBnIR2+1vvtwi3gs3YO8GMHTU17E/icRy3LgJ0p9NyRMZ0hpMO3r2FrcI/2rZUDfNlBz/Tm0Wm5MyfzgYcdNU1S7BDRhdo4wEJk7tqloH9A+M7pzY7a9uBnsqgTtXGAxxy0TAFfDaiplZsSdE23BwNqqoUDXOSgo/nkl81q3F4FoRaRauEAf3DQsYY4AlOOQc4K1vQ+E0hP5R1gxEHDm4Tp8LkyALyBrvtTAbRU3gFcniafQ72sXI6ue20AHZV2gFPQI3hCFGJWtFnDw8AHPWuotAN8wyH9Imf4iuYcdP1f8ayh0g7wrJL2857TLwJttfJpz+lX1gH6kSYyKe0qbBBdTnIexoEPeEy/sg7wWSXdQ+Rfaw/BHPQzji/2mH6q+ivzmNVWlijXtwD/CyEkJweQmIAkzgshxIWYHGCxcv2pICqK4ffKddcAT+/E5ACnK9dfDaKiGLYo180B2qDtX98RQkRB7FSuLwiiwoGYHECLddsRQkRB7FauR3N0fEwOMEe5Ph5ERTFoDhDNOkZMDjCpXK/SCSTaHrxoyj0aIcg4P4ljg6goBq2Jj2bLeUwOoMXRnxhERTFoWt8NosKBmBzgX8p1bZ4gJj6kXH8riAoHYnKAvyvXzw6iohg0rf8MosKBmBxAm+jRpopjYkS5vj2EiKzEvBg0z2P6RTEH/dP2n/GYfmVXA/uAI0ra13pMvyi+RLmrmpV1AND3AI56Tr8ItLCw5zynX2kHuNEh/ZgPaToX/SuiN3jWUGkHGEQPCt3oWUMetA9rHEECX31SaQcAOYpN07AsgI60uISFPxZAR+UdYKmDhp3E9fmYAWS1UtM9EkBL5R0A3M4BejSQFhceRdf7u0BaauEAFznomCLDlzA8cCtuWi8IpKcWDgByQoZLwd4UUFMrNyTomm6/DKipNg6wkPZn5bSz1YTfKXyLo7a9hA0Bq40DgJwG6lLIU8im0tzfyXNgALd3ftOcPtJQILVyAIB7HDQ17Q1kOOaLy4F/pNBzt0ctnaidA8wi/TFxozh+HMGR80j/9dSnKSeMrXYOANLsvuKgrdVeQPbqaQGn7TgOWdjJclDkVsK8jtqRqv6qdlTsJrI92WPIdq3NwB+RE0Z2N+woshJ5ErJhYzEyYfNJsm3i3Ibs/dMig32Ru/5ibAGaDBD3YdHPILucy6SWr4DpzALupfzKbrW7iCNyufYO0OQa3OcJfNou4GrPeU1D1zgAyGSR64yhD1tD2FNAXegqB2gygnTwQlX8ZsIc+ZaFrnSAJkuBX5HvW4GdbAKJVYj1a2FNutoBmiwEvg78lvwfjnwK+XBkbE19J1LVX5XmAbJyPPLBhyXAh4EzkbCs/ob1IAs2+4G3kenkV5GvfrxINY6lmU6q+usGB+g2UtVfu51Bddqm3W1odTPR+kM7B9CavGiONzHeh3bMzjutP7RzAO18m087yzFCs1S5/rbLTX5Oci9yK3FtKjWEHvQVU6cvl1yt3GQKWFmsdqMAVqHXm9NRu3OBg8qNjiJOYC1B+fQA30XfkjZOisOpXD/O/DKwAjgNGx2EZCawCLgO90CZn7S7Uacx/SDwGhIVY1SfceTYmvcdTdPb4Q//RdbdR/xpMgJyG/CbtH/qIX0gpFl8toHOD7pKP3KeTdmZMMtm2yjgWNo+3LZsm8Vl6ykwPrEX2YipHX5kVr4dQLbKeRmiDwL3oc8TmIW3cWSot7Bj7bUh69JuH3AJcAWyvj6EBEzYXEA49iLrNtuQfZEbqV7sgmEYhmEYhmEYhmEYhmEYhmEYnvk/IOetxTmdx/8AAAAASUVORK5CYII=", jl = { __name: "ReconhecimentoFacial", __ssrInlineRender: true, setup(l2) {
  const a2 = ref(null), o2 = ref([]), t2 = ref(""), u2 = ref(false), i2 = ref(null), r2 = ref(1), n2 = Ct("auth_token").value, s2 = Ct("user-data").value.nome, m2 = `${Ye().public.managemant}/upload`, { $toast: p2 } = Ue(), v2 = async () => {
    u2.value = true;
    try {
      await (void 0).mediaDevices.getUserMedia({ video: true }), await (async () => {
        const e2 = await (void 0).mediaDevices.enumerateDevices();
        o2.value = e2.filter((e3) => "videoinput" === e3.kind).map((e3) => ({ deviceId: e3.deviceId, label: e3.label || `Camera ${o2.value.length + 1}` }));
      })();
    } catch (e2) {
      console.error("Erro ao acessar dispositivos de m\xEDdia:", e2);
    }
  }, f2 = () => {
    u2.value = false;
    const e2 = a2.value.srcObject;
    if (e2) {
      e2.getTracks().forEach((e3) => e3.stop());
    }
  }, U2 = async () => {
    if (t2.value) {
      const e2 = await (void 0).mediaDevices.getUserMedia({ video: { deviceId: { exact: t2.value } } });
      a2.value.srcObject = e2;
    }
  }, C2 = async () => {
    const e2 = (void 0).createElement("canvas"), l3 = e2.getContext("2d"), o3 = a2.value.videoWidth, t3 = a2.value.videoHeight, d2 = o3 * r2.value, u3 = t3 * r2.value, c2 = (o3 - d2) / 2, v3 = (t3 - u3) / 2;
    e2.width = o3, e2.height = t3, l3.drawImage(a2.value, c2, v3, d2, u3), e2.toBlob(async (e3) => {
      const l4 = new FormData();
      l4.append("file", e3, `${s2}.jpg`), l4.append("pessoa_token", n2), l4.append("bucket", "cartorio-teste"), l4.append("tipo", "foto");
      const { status: a3 } = await g$2(m2, { method: "POST", body: l4 }, "$fRRPU47ULS");
      if ("success" === a3.value) {
        const l5 = URL.createObjectURL(e3);
        p2.success("Imagem enviada!"), i2.value = l5, f2();
      } else
        p2.error("Erro ao enviar imagem para o sistema.");
    }, "image/jpeg");
  }, k2 = () => {
    i2.value = null;
  };
  return (e2, l3, n3, s3) => {
    l3(ssrRenderComponent(y, mergeProps({ cols: "auto" }, s3), { default: withCtx((e3, l4, n4, s4) => {
      if (!l4)
        return [createVNode($$1, { "max-width": "700", modelValue: unref(u2), "onUpdate:modelValue": (e4) => isRef(u2) ? u2.value = e4 : null }, { activator: withCtx(({ props: e4 }) => [createVNode(br, mergeProps(e4, { variant: "outlined", style: { width: "300px", height: "300px" }, onClick: v2 }), { default: withCtx(() => [unref(i2) ? createCommentVNode("", true) : (openBlock(), createBlock("img", { key: 0, src: Ll })), unref(i2) ? (openBlock(), createBlock("img", { key: 1, src: unref(i2), style: { width: "100%", height: "100%", "object-fit": "cover" } }, null, 8, ["src"])) : createCommentVNode("", true)]), _: 2 }, 1040)]), default: withCtx(({ isActive: e4 }) => [createVNode(oe, { title: "Biometria" }, { default: withCtx(() => [createVNode($, null, { default: withCtx(() => [createVNode(y, null, { default: withCtx(() => [createVNode(Iu, { items: unref(o2), modelValue: unref(t2), "onUpdate:modelValue": (e5) => isRef(t2) ? t2.value = e5 : null, "item-title": "label", "item-value": "deviceId", label: "Selecionar Webcam" }, null, 8, ["items", "modelValue", "onUpdate:modelValue"])]), _: 1 })]), _: 1 }), createVNode($, null, { default: withCtx(() => [createVNode(y, null, { default: withCtx(() => [createVNode(br, { onClick: U2 }, { default: withCtx(() => [createTextVNode("Exibir")]), _: 1 })]), _: 1 })]), _: 1 }), createVNode($, null, { default: withCtx(() => [createVNode(i, { style: { overflow: "hidden" } }, { default: withCtx(() => [createVNode(y, null, { default: withCtx(() => [createVNode("video", { class: "ml-3", ref_key: "video", ref: a2, width: "640", height: "480", autoplay: "", style: { transform: `scale(${unref(r2)})`, transformOrigin: "center center" } }, null, 4)]), _: 1 })]), _: 1 })]), _: 1 }), createVNode(i, null, { default: withCtx(() => [createVNode(Cl, { modelValue: unref(r2), "onUpdate:modelValue": (e5) => isRef(r2) ? r2.value = e5 : null, min: 1, max: 3, step: "0.1", label: "Zoom" }, null, 8, ["modelValue", "onUpdate:modelValue"])]), _: 1 }), createVNode($, { class: "mt-10 justify-space-around" }, { default: withCtx(() => [createVNode("div", { onClick: f2 }, [createVNode("img", { style: { cursor: "pointer" }, src: A, alt: "Excluir" })]), createVNode("div", { onClick: C2 }, [createVNode("img", { style: { cursor: "pointer" }, src: A$2, alt: "Salvar" })])]), _: 1 })]), _: 1 })]), _: 1 }, 8, ["modelValue", "onUpdate:modelValue"]), createVNode("img", { onClick: k2, style: { width: "40px", "margin-left": "10px", cursor: "pointer" }, src: a, alt: "Excluir" })];
      l4(ssrRenderComponent($$1, { "max-width": "700", modelValue: unref(u2), "onUpdate:modelValue": (e4) => isRef(u2) ? u2.value = e4 : null }, { activator: withCtx(({ props: e4 }, l5, a3, o3) => {
        if (!l5)
          return [createVNode(br, mergeProps(e4, { variant: "outlined", style: { width: "300px", height: "300px" }, onClick: v2 }), { default: withCtx(() => [unref(i2) ? createCommentVNode("", true) : (openBlock(), createBlock("img", { key: 0, src: Ll })), unref(i2) ? (openBlock(), createBlock("img", { key: 1, src: unref(i2), style: { width: "100%", height: "100%", "object-fit": "cover" } }, null, 8, ["src"])) : createCommentVNode("", true)]), _: 2 }, 1040)];
        l5(ssrRenderComponent(br, mergeProps(e4, { variant: "outlined", style: { width: "300px", height: "300px" }, onClick: v2 }), { default: withCtx((e5, l6, a4, o4) => {
          if (!l6)
            return [unref(i2) ? createCommentVNode("", true) : (openBlock(), createBlock("img", { key: 0, src: Ll })), unref(i2) ? (openBlock(), createBlock("img", { key: 1, src: unref(i2), style: { width: "100%", height: "100%", "object-fit": "cover" } }, null, 8, ["src"])) : createCommentVNode("", true)];
          unref(i2) ? l6("<!---->") : l6(`<img${ssrRenderAttr("src", Ll)}${o4}>`), unref(i2) ? l6(`<img${ssrRenderAttr("src", unref(i2))} style="${ssrRenderStyle({ width: "100%", height: "100%", "object-fit": "cover" })}"${o4}>`) : l6("<!---->");
        }), _: 2 }, a3, o3));
      }), default: withCtx(({ isActive: e4 }, l5, u3, i3) => {
        if (!l5)
          return [createVNode(oe, { title: "Biometria" }, { default: withCtx(() => [createVNode($, null, { default: withCtx(() => [createVNode(y, null, { default: withCtx(() => [createVNode(Iu, { items: unref(o2), modelValue: unref(t2), "onUpdate:modelValue": (e5) => isRef(t2) ? t2.value = e5 : null, "item-title": "label", "item-value": "deviceId", label: "Selecionar Webcam" }, null, 8, ["items", "modelValue", "onUpdate:modelValue"])]), _: 1 })]), _: 1 }), createVNode($, null, { default: withCtx(() => [createVNode(y, null, { default: withCtx(() => [createVNode(br, { onClick: U2 }, { default: withCtx(() => [createTextVNode("Exibir")]), _: 1 })]), _: 1 })]), _: 1 }), createVNode($, null, { default: withCtx(() => [createVNode(i, { style: { overflow: "hidden" } }, { default: withCtx(() => [createVNode(y, null, { default: withCtx(() => [createVNode("video", { class: "ml-3", ref_key: "video", ref: a2, width: "640", height: "480", autoplay: "", style: { transform: `scale(${unref(r2)})`, transformOrigin: "center center" } }, null, 4)]), _: 1 })]), _: 1 })]), _: 1 }), createVNode(i, null, { default: withCtx(() => [createVNode(Cl, { modelValue: unref(r2), "onUpdate:modelValue": (e5) => isRef(r2) ? r2.value = e5 : null, min: 1, max: 3, step: "0.1", label: "Zoom" }, null, 8, ["modelValue", "onUpdate:modelValue"])]), _: 1 }), createVNode($, { class: "mt-10 justify-space-around" }, { default: withCtx(() => [createVNode("div", { onClick: f2 }, [createVNode("img", { style: { cursor: "pointer" }, src: A, alt: "Excluir" })]), createVNode("div", { onClick: C2 }, [createVNode("img", { style: { cursor: "pointer" }, src: A$2, alt: "Salvar" })])]), _: 1 })]), _: 1 })];
        l5(ssrRenderComponent(oe, { title: "Biometria" }, { default: withCtx((e5, l6, u4, i4) => {
          if (!l6)
            return [createVNode($, null, { default: withCtx(() => [createVNode(y, null, { default: withCtx(() => [createVNode(Iu, { items: unref(o2), modelValue: unref(t2), "onUpdate:modelValue": (e6) => isRef(t2) ? t2.value = e6 : null, "item-title": "label", "item-value": "deviceId", label: "Selecionar Webcam" }, null, 8, ["items", "modelValue", "onUpdate:modelValue"])]), _: 1 })]), _: 1 }), createVNode($, null, { default: withCtx(() => [createVNode(y, null, { default: withCtx(() => [createVNode(br, { onClick: U2 }, { default: withCtx(() => [createTextVNode("Exibir")]), _: 1 })]), _: 1 })]), _: 1 }), createVNode($, null, { default: withCtx(() => [createVNode(i, { style: { overflow: "hidden" } }, { default: withCtx(() => [createVNode(y, null, { default: withCtx(() => [createVNode("video", { class: "ml-3", ref_key: "video", ref: a2, width: "640", height: "480", autoplay: "", style: { transform: `scale(${unref(r2)})`, transformOrigin: "center center" } }, null, 4)]), _: 1 })]), _: 1 })]), _: 1 }), createVNode(i, null, { default: withCtx(() => [createVNode(Cl, { modelValue: unref(r2), "onUpdate:modelValue": (e6) => isRef(r2) ? r2.value = e6 : null, min: 1, max: 3, step: "0.1", label: "Zoom" }, null, 8, ["modelValue", "onUpdate:modelValue"])]), _: 1 }), createVNode($, { class: "mt-10 justify-space-around" }, { default: withCtx(() => [createVNode("div", { onClick: f2 }, [createVNode("img", { style: { cursor: "pointer" }, src: A, alt: "Excluir" })]), createVNode("div", { onClick: C2 }, [createVNode("img", { style: { cursor: "pointer" }, src: A$2, alt: "Salvar" })])]), _: 1 })];
          l6(ssrRenderComponent($, null, { default: withCtx((e6, l7, a3, u5) => {
            if (!l7)
              return [createVNode(y, null, { default: withCtx(() => [createVNode(Iu, { items: unref(o2), modelValue: unref(t2), "onUpdate:modelValue": (e7) => isRef(t2) ? t2.value = e7 : null, "item-title": "label", "item-value": "deviceId", label: "Selecionar Webcam" }, null, 8, ["items", "modelValue", "onUpdate:modelValue"])]), _: 1 })];
            l7(ssrRenderComponent(y, null, { default: withCtx((e7, l8, a4, u6) => {
              if (!l8)
                return [createVNode(Iu, { items: unref(o2), modelValue: unref(t2), "onUpdate:modelValue": (e8) => isRef(t2) ? t2.value = e8 : null, "item-title": "label", "item-value": "deviceId", label: "Selecionar Webcam" }, null, 8, ["items", "modelValue", "onUpdate:modelValue"])];
              l8(ssrRenderComponent(Iu, { items: unref(o2), modelValue: unref(t2), "onUpdate:modelValue": (e8) => isRef(t2) ? t2.value = e8 : null, "item-title": "label", "item-value": "deviceId", label: "Selecionar Webcam" }, null, a4, u6));
            }), _: 2 }, a3, u5));
          }), _: 2 }, u4, i4)), l6(ssrRenderComponent($, null, { default: withCtx((e6, l7, a3, o3) => {
            if (!l7)
              return [createVNode(y, null, { default: withCtx(() => [createVNode(br, { onClick: U2 }, { default: withCtx(() => [createTextVNode("Exibir")]), _: 1 })]), _: 1 })];
            l7(ssrRenderComponent(y, null, { default: withCtx((e7, l8, a4, o4) => {
              if (!l8)
                return [createVNode(br, { onClick: U2 }, { default: withCtx(() => [createTextVNode("Exibir")]), _: 1 })];
              l8(ssrRenderComponent(br, { onClick: U2 }, { default: withCtx((e8, l9, a5, o5) => {
                if (!l9)
                  return [createTextVNode("Exibir")];
                l9("Exibir");
              }), _: 2 }, a4, o4));
            }), _: 2 }, a3, o3));
          }), _: 2 }, u4, i4)), l6(ssrRenderComponent($, null, { default: withCtx((e6, l7, o3, t3) => {
            if (!l7)
              return [createVNode(i, { style: { overflow: "hidden" } }, { default: withCtx(() => [createVNode(y, null, { default: withCtx(() => [createVNode("video", { class: "ml-3", ref_key: "video", ref: a2, width: "640", height: "480", autoplay: "", style: { transform: `scale(${unref(r2)})`, transformOrigin: "center center" } }, null, 4)]), _: 1 })]), _: 1 })];
            l7(ssrRenderComponent(i, { style: { overflow: "hidden" } }, { default: withCtx((e7, l8, o4, t4) => {
              if (!l8)
                return [createVNode(y, null, { default: withCtx(() => [createVNode("video", { class: "ml-3", ref_key: "video", ref: a2, width: "640", height: "480", autoplay: "", style: { transform: `scale(${unref(r2)})`, transformOrigin: "center center" } }, null, 4)]), _: 1 })];
              l8(ssrRenderComponent(y, null, { default: withCtx((e8, l9, o5, t5) => {
                if (!l9)
                  return [createVNode("video", { class: "ml-3", ref_key: "video", ref: a2, width: "640", height: "480", autoplay: "", style: { transform: `scale(${unref(r2)})`, transformOrigin: "center center" } }, null, 4)];
                l9(`<video class="ml-3" width="640" height="480" autoplay style="${ssrRenderStyle({ transform: `scale(${unref(r2)})`, transformOrigin: "center center" })}"${t5}></video>`);
              }), _: 2 }, o4, t4));
            }), _: 2 }, o3, t3));
          }), _: 2 }, u4, i4)), l6(ssrRenderComponent(i, null, { default: withCtx((e6, l7, a3, o3) => {
            if (!l7)
              return [createVNode(Cl, { modelValue: unref(r2), "onUpdate:modelValue": (e7) => isRef(r2) ? r2.value = e7 : null, min: 1, max: 3, step: "0.1", label: "Zoom" }, null, 8, ["modelValue", "onUpdate:modelValue"])];
            l7(ssrRenderComponent(Cl, { modelValue: unref(r2), "onUpdate:modelValue": (e7) => isRef(r2) ? r2.value = e7 : null, min: 1, max: 3, step: "0.1", label: "Zoom" }, null, a3, o3));
          }), _: 2 }, u4, i4)), l6(ssrRenderComponent($, { class: "mt-10 justify-space-around" }, { default: withCtx((e6, l7, a3, o3) => {
            if (!l7)
              return [createVNode("div", { onClick: f2 }, [createVNode("img", { style: { cursor: "pointer" }, src: A, alt: "Excluir" })]), createVNode("div", { onClick: C2 }, [createVNode("img", { style: { cursor: "pointer" }, src: A$2, alt: "Salvar" })])];
            l7(`<div${o3}><img style="${ssrRenderStyle({ cursor: "pointer" })}"${ssrRenderAttr("src", A)} alt="Excluir"${o3}></div><div${o3}><img style="${ssrRenderStyle({ cursor: "pointer" })}"${ssrRenderAttr("src", A$2)} alt="Salvar"${o3}></div>`);
          }), _: 2 }, u4, i4));
        }), _: 2 }, u3, i3));
      }), _: 1 }, n4, s4)), l4(`<img style="${ssrRenderStyle({ width: "40px", "margin-left": "10px", cursor: "pointer" })}"${ssrRenderAttr("src", a)} alt="Excluir"${s4}>`);
    }), _: 1 }, n3));
  };
} }, Ml = jl.setup;
jl.setup = (e2, l2) => {
  const a2 = useSSRContext();
  return (a2.modules || (a2.modules = /* @__PURE__ */ new Set())).add("components/Biometria/ReconhecimentoFacial.vue"), Ml ? Ml(e2, l2) : void 0;
};
const Ol = "" + buildAssetsURL("escanearFicha.CgD8l9Wn.png"), Hl = { __name: "Scanner", __ssrInlineRender: true, setup: (e2) => (Ye().public.biometria, (e3, l2, a2, o2) => {
  l2(`<div${ssrRenderAttrs(o2)}><img${ssrRenderAttr("src", Ol)} style="${ssrRenderStyle({ width: "280px", height: "120px", cursor: "pointer", "margin-top": "30px" })}"></div>`);
}) }, ql = Hl.setup;
Hl.setup = (e2, l2) => {
  const a2 = useSSRContext();
  return (a2.modules || (a2.modules = /* @__PURE__ */ new Set())).add("components/Biometria/Scanner.vue"), ql ? ql(e2, l2) : void 0;
};
const Yl = "" + buildAssetsURL("imprimirFicha.BlhLZ85F.png"), Wl = { __name: "Impressao", __ssrInlineRender: true, setup(l2) {
  const a2 = ref(false), o2 = ref(""), t2 = `${Ye().public.managemant}/gerarRelatorio`, u2 = async () => {
    const e2 = await g$2(t2, { method: "GET" }, "$LOyFO5WGQE");
    o2.value = e2.data.value, a2.value = true;
  }, i2 = () => {
    const e2 = (void 0).getElementById("ficha-pessoa").innerHTML, l3 = (void 0).createElement("iframe");
    (void 0).body.appendChild(l3);
    const a3 = l3.contentWindow.document;
    a3.open(), a3.write(e2), a3.close(), l3.contentWindow.focus(), l3.contentWindow.print();
  };
  return (e2, l3, t3, r2) => {
    const n2 = Hl;
    l3(ssrRenderComponent(y, mergeProps({ cols: "auto" }, r2), { default: withCtx((e3, l4, t4, r3) => {
      if (!l4)
        return [createVNode("div", { style: { display: "flex", "flex-direction": "column" } }, [createVNode("img", { onClick: u2, src: Yl, style: { width: "280px", height: "120px", cursor: "pointer" } }), createVNode(n2)]), createVNode($$1, { modelValue: unref(a2), "onUpdate:modelValue": (e4) => isRef(a2) ? a2.value = e4 : null, "max-width": "800" }, { default: withCtx(() => [createVNode(oe, null, { default: withCtx(() => [createVNode(le, null, { default: withCtx(() => [createVNode("span", null, "Dados para Impress\xE3o")]), _: 1 }), createVNode(ie, null, { default: withCtx(() => [createVNode("div", { id: "ficha-pessoa", ref: "printContent" }, [createVNode("div", { innerHTML: unref(o2) }, null, 8, ["innerHTML"])], 512)]), _: 1 }), createVNode(ee, null, { default: withCtx(() => [createVNode(Sr), createVNode(br, { color: "green", onClick: i2 }, { default: withCtx(() => [createTextVNode("Imprimir")]), _: 1 }), createVNode(br, { color: "red", onClick: (e4) => a2.value = false }, { default: withCtx(() => [createTextVNode("Fechar")]), _: 1 }, 8, ["onClick"])]), _: 1 })]), _: 1 })]), _: 1 }, 8, ["modelValue", "onUpdate:modelValue"])];
      l4(`<div style="${ssrRenderStyle({ display: "flex", "flex-direction": "column" })}"${r3}><img${ssrRenderAttr("src", Yl)} style="${ssrRenderStyle({ width: "280px", height: "120px", cursor: "pointer" })}"${r3}>`), l4(ssrRenderComponent(n2, null, null, t4, r3)), l4("</div>"), l4(ssrRenderComponent($$1, { modelValue: unref(a2), "onUpdate:modelValue": (e4) => isRef(a2) ? a2.value = e4 : null, "max-width": "800" }, { default: withCtx((e4, l5, t5, u3) => {
        if (!l5)
          return [createVNode(oe, null, { default: withCtx(() => [createVNode(le, null, { default: withCtx(() => [createVNode("span", null, "Dados para Impress\xE3o")]), _: 1 }), createVNode(ie, null, { default: withCtx(() => [createVNode("div", { id: "ficha-pessoa", ref: "printContent" }, [createVNode("div", { innerHTML: unref(o2) }, null, 8, ["innerHTML"])], 512)]), _: 1 }), createVNode(ee, null, { default: withCtx(() => [createVNode(Sr), createVNode(br, { color: "green", onClick: i2 }, { default: withCtx(() => [createTextVNode("Imprimir")]), _: 1 }), createVNode(br, { color: "red", onClick: (e5) => a2.value = false }, { default: withCtx(() => [createTextVNode("Fechar")]), _: 1 }, 8, ["onClick"])]), _: 1 })]), _: 1 })];
        l5(ssrRenderComponent(oe, null, { default: withCtx((e5, l6, t6, u4) => {
          if (!l6)
            return [createVNode(le, null, { default: withCtx(() => [createVNode("span", null, "Dados para Impress\xE3o")]), _: 1 }), createVNode(ie, null, { default: withCtx(() => [createVNode("div", { id: "ficha-pessoa", ref: "printContent" }, [createVNode("div", { innerHTML: unref(o2) }, null, 8, ["innerHTML"])], 512)]), _: 1 }), createVNode(ee, null, { default: withCtx(() => [createVNode(Sr), createVNode(br, { color: "green", onClick: i2 }, { default: withCtx(() => [createTextVNode("Imprimir")]), _: 1 }), createVNode(br, { color: "red", onClick: (e6) => a2.value = false }, { default: withCtx(() => [createTextVNode("Fechar")]), _: 1 }, 8, ["onClick"])]), _: 1 })];
          l6(ssrRenderComponent(le, null, { default: withCtx((e6, l7, a3, o3) => {
            if (!l7)
              return [createVNode("span", null, "Dados para Impress\xE3o")];
            l7(`<span${o3}>Dados para Impress\xE3o</span>`);
          }), _: 1 }, t6, u4)), l6(ssrRenderComponent(ie, null, { default: withCtx((e6, l7, a3, t7) => {
            var _a;
            if (!l7)
              return [createVNode("div", { id: "ficha-pessoa", ref: "printContent" }, [createVNode("div", { innerHTML: unref(o2) }, null, 8, ["innerHTML"])], 512)];
            l7(`<div id="ficha-pessoa"${t7}><div${t7}>${(_a = unref(o2)) != null ? _a : ""}</div></div>`);
          }), _: 1 }, t6, u4)), l6(ssrRenderComponent(ee, null, { default: withCtx((e6, l7, o3, t7) => {
            if (!l7)
              return [createVNode(Sr), createVNode(br, { color: "green", onClick: i2 }, { default: withCtx(() => [createTextVNode("Imprimir")]), _: 1 }), createVNode(br, { color: "red", onClick: (e7) => a2.value = false }, { default: withCtx(() => [createTextVNode("Fechar")]), _: 1 }, 8, ["onClick"])];
            l7(ssrRenderComponent(Sr, null, null, o3, t7)), l7(ssrRenderComponent(br, { color: "green", onClick: i2 }, { default: withCtx((e7, l8, a3, o4) => {
              if (!l8)
                return [createTextVNode("Imprimir")];
              l8("Imprimir");
            }), _: 1 }, o3, t7)), l7(ssrRenderComponent(br, { color: "red", onClick: (e7) => a2.value = false }, { default: withCtx((e7, l8, a3, o4) => {
              if (!l8)
                return [createTextVNode("Fechar")];
              l8("Fechar");
            }), _: 1 }, o3, t7));
          }), _: 1 }, t6, u4));
        }), _: 1 }, t5, u3));
      }), _: 1 }, t4, r3));
    }), _: 1 }, t3));
  };
} }, Xl = Wl.setup;
Wl.setup = (e2, l2) => {
  const a2 = useSSRContext();
  return (a2.modules || (a2.modules = /* @__PURE__ */ new Set())).add("components/Biometria/Impressao.vue"), Xl ? Xl(e2, l2) : void 0;
};
const Kl = {};
const Ql = Kl.setup;
Kl.setup = (e2, l2) => {
  const a2 = useSSRContext();
  return (a2.modules || (a2.modules = /* @__PURE__ */ new Set())).add("components/Biometria/Index.vue"), Ql ? Ql(e2, l2) : void 0;
};
const Gl = jc(Kl, [["ssrRender", function(e2, l2, a2, o2) {
  const t2 = Fl, u2 = jl, i2 = Wl, r2 = g$1;
  l2("<!--[-->"), l2(ssrRenderComponent($, { class: "d-flex align-items-center justify-space-between" }, { default: withCtx((e3, l3, a3, o3) => {
    if (!l3)
      return [createVNode(t2), createVNode(u2), createVNode(i2)];
    l3(ssrRenderComponent(t2, null, null, a3, o3)), l3(ssrRenderComponent(u2, null, null, a3, o3)), l3(ssrRenderComponent(i2, null, null, a3, o3));
  }), _: 1 }, a2)), l2(ssrRenderComponent(r2, { to: "/pessoas/registros" }, { default: withCtx((e3, l3, a3, o3) => {
    if (!l3)
      return [createVNode("img", { class: "mt-15", src: A, alt: "Sair" })];
    l3(`<img class="mt-15"${ssrRenderAttr("src", A)} alt="Sair"${o3}>`);
  }), _: 1 }, a2)), l2("<!--]-->");
}]]), Jl = {};
const Zl = Jl.setup;
Jl.setup = (e2, l2) => {
  const a2 = useSSRContext();
  return (a2.modules || (a2.modules = /* @__PURE__ */ new Set())).add("components/Restricoes.vue"), Zl ? Zl(e2, l2) : void 0;
};
const ea = jc(Jl, [["ssrRender", function(e2, l2, a2, o2) {
  l2(`<div${ssrRenderAttrs(o2)}><h1>Restri\xE7\xF5es</h1></div>`);
}]]);

export { $l as $, Al as A, Bl as B, Dl as D, Gl as G, Il as I, Nl as N, ea as e };
//# sourceMappingURL=Restricoes-B1mU28cL.mjs.map
