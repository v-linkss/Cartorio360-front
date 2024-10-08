import { ref, watch, nextTick, mergeProps, createVNode, Fragment, computed, withDirectives, resolveDirective } from 'vue';
import { p as wn, m as Oi, l as Hr, o as $n, q as Un, s as Ci, t as zn, w as Fi, x as Bo, v as $i, y as _n, z as Fn, A as vo, B as Mn, I as Fl, C as oo, D as bs, E as To, F as ao, G as Ro, H as io, J as Yo, K as Ho, L as Zo, M as uo, N as Jo, O as jl, P as yo, R as hr, Q as Wl, S as no, T as bo, U as ro, W as No, X as so, Y as Ko, Z as Wo, $ as Qo, a0 as co, a1 as Xo, a2 as gs, a3 as Go, a4 as ho } from './server.mjs';

const Z = wn({ fullscreen: Boolean, retainFocus: { type: Boolean, default: true }, scrollable: Boolean, ...Oi({ origin: "center center", scrollStrategy: "block", transition: { component: Hr }, zIndex: 2400 }) }, "VDialog"), $ = $n()({ name: "VDialog", props: Z(), emits: { "update:modelValue": (e2) => true, afterLeave: () => true }, setup(s2, r2) {
  let { emit: i2, slots: d2 } = r2;
  const o2 = Un(s2, "modelValue"), { scopeId: p2 } = Ci(), u2 = ref();
  function c2() {
    var e2;
    (null == (e2 = u2.value) ? void 0 : e2.contentEl) && !u2.value.contentEl.contains((void 0).activeElement) && u2.value.contentEl.focus({ preventScroll: true });
  }
  function I2() {
    i2("afterLeave");
  }
  return watch(o2, async (e2) => {
    var a2;
    e2 || (await nextTick(), null == (a2 = u2.value.activatorEl) || a2.focus({ preventScroll: true }));
  }), zn(() => {
    const e2 = Fi.filterProps(s2), a2 = mergeProps({ "aria-haspopup": "dialog", "aria-expanded": String(o2.value) }, s2.activatorProps), t2 = mergeProps({ tabindex: -1 }, s2.contentProps);
    return createVNode(Fi, mergeProps({ ref: u2, class: ["v-dialog", { "v-dialog--fullscreen": s2.fullscreen, "v-dialog--scrollable": s2.scrollable }, s2.class], style: s2.style }, e2, { modelValue: o2.value, "onUpdate:modelValue": (e3) => o2.value = e3, "aria-modal": "true", activatorProps: a2, contentProps: t2, role: "dialog", onAfterEnter: c2, onAfterLeave: I2 }, p2), { activator: d2.activator, default: function() {
      for (var e3 = arguments.length, a3 = new Array(e3), t3 = 0; t3 < e3; t3++)
        a3[t3] = arguments[t3];
      return createVNode(Bo, { root: "VDialog" }, { default: () => {
        var e4;
        return [null == (e4 = d2.default) ? void 0 : e4.call(d2, ...a3)];
      } });
    } });
  }), $i({}, u2);
} }), ee = $n()({ name: "VCardActions", props: _n(), setup(e2, a2) {
  let { slots: t2 } = a2;
  return Fn({ VBtn: { slim: true, variant: "text" } }), zn(() => {
    var a3;
    return createVNode("div", { class: ["v-card-actions", e2.class], style: e2.style }, [null == (a3 = t2.default) ? void 0 : a3.call(t2)]);
  }), {};
} }), ae = wn({ opacity: [Number, String], ..._n(), ...vo() }, "VCardSubtitle"), te = $n()({ name: "VCardSubtitle", props: ae(), setup(e2, a2) {
  let { slots: t2 } = a2;
  return zn(() => createVNode(e2.tag, { class: ["v-card-subtitle", e2.class], style: [{ "--v-card-subtitle-opacity": e2.opacity }, e2.style] }, t2)), {};
} }), le = Mn("v-card-title"), ne = wn({ appendAvatar: String, appendIcon: Fl, prependAvatar: String, prependIcon: Fl, subtitle: [String, Number], title: [String, Number], ..._n(), ...oo() }, "VCardItem"), se = $n()({ name: "VCardItem", props: ne(), setup(e2, a2) {
  let { slots: t2 } = a2;
  return zn(() => {
    var a3;
    const l2 = !(!e2.prependAvatar && !e2.prependIcon), r2 = !(!l2 && !t2.prepend), i2 = !(!e2.appendAvatar && !e2.appendIcon), d2 = !(!i2 && !t2.append), o2 = !(null == e2.title && !t2.title), p2 = !(null == e2.subtitle && !t2.subtitle);
    return createVNode("div", { class: ["v-card-item", e2.class], style: e2.style }, [r2 && createVNode("div", { key: "prepend", class: "v-card-item__prepend" }, [t2.prepend ? createVNode(Bo, { key: "prepend-defaults", disabled: !l2, defaults: { VAvatar: { density: e2.density, image: e2.prependAvatar }, VIcon: { density: e2.density, icon: e2.prependIcon } } }, t2.prepend) : createVNode(Fragment, null, [e2.prependAvatar && createVNode(bs, { key: "prepend-avatar", density: e2.density, image: e2.prependAvatar }, null), e2.prependIcon && createVNode(To, { key: "prepend-icon", density: e2.density, icon: e2.prependIcon }, null)])]), createVNode("div", { class: "v-card-item__content" }, [o2 && createVNode(le, { key: "title" }, { default: () => {
      var _a;
      var a4;
      return [(_a = null == (a4 = t2.title) ? void 0 : a4.call(t2)) != null ? _a : e2.title];
    } }), p2 && createVNode(te, { key: "subtitle" }, { default: () => {
      var _a;
      var a4;
      return [(_a = null == (a4 = t2.subtitle) ? void 0 : a4.call(t2)) != null ? _a : e2.subtitle];
    } }), null == (a3 = t2.default) ? void 0 : a3.call(t2)]), d2 && createVNode("div", { key: "append", class: "v-card-item__append" }, [t2.append ? createVNode(Bo, { key: "append-defaults", disabled: !i2, defaults: { VAvatar: { density: e2.density, image: e2.appendAvatar }, VIcon: { density: e2.density, icon: e2.appendIcon } } }, t2.append) : createVNode(Fragment, null, [e2.appendIcon && createVNode(To, { key: "append-icon", density: e2.density, icon: e2.appendIcon }, null), e2.appendAvatar && createVNode(bs, { key: "append-avatar", density: e2.density, image: e2.appendAvatar }, null)])])]);
  }), {};
} }), re = wn({ opacity: [Number, String], ..._n(), ...vo() }, "VCardText"), ie = $n()({ name: "VCardText", props: re(), setup(e2, a2) {
  let { slots: t2 } = a2;
  return zn(() => createVNode(e2.tag, { class: ["v-card-text", e2.class], style: [{ "--v-card-text-opacity": e2.opacity }, e2.style] }, t2)), {};
} }), de = wn({ appendAvatar: String, appendIcon: Fl, disabled: Boolean, flat: Boolean, hover: Boolean, image: String, link: { type: Boolean, default: void 0 }, prependAvatar: String, prependIcon: Fl, ripple: { type: [Boolean, Object], default: true }, subtitle: [String, Number], text: [String, Number], title: [String, Number], ...ao(), ..._n(), ...oo(), ...Ro(), ...io(), ...Yo(), ...Ho(), ...Zo(), ...uo(), ...Jo(), ...vo(), ...jl(), ...yo({ variant: "elevated" }) }, "VCard"), oe = $n()({ name: "VCard", directives: { Ripple: hr }, props: de(), setup(e2, a2) {
  let { attrs: t2, slots: l2 } = a2;
  const { themeClasses: s2 } = Wl(e2), { borderClasses: o2 } = no(e2), { colorClasses: p2, colorStyles: u2, variantClasses: c2 } = bo(e2), { densityClasses: v2 } = ro(e2), { dimensionStyles: y2 } = No(e2), { elevationClasses: g2 } = so(e2), { loaderClasses: f2 } = Ko(e2), { locationStyles: I2 } = Wo(e2), { positionClasses: A2 } = Qo(e2), { roundedClasses: k2 } = co(e2), V2 = Xo(e2, t2), S2 = computed(() => false !== e2.link && V2.isLink.value), C2 = computed(() => !e2.disabled && false !== e2.link && (e2.link || V2.isClickable.value));
  return zn(() => {
    const a3 = S2.value ? "a" : e2.tag, t3 = !(!l2.title && null == e2.title), r2 = !(!l2.subtitle && null == e2.subtitle), m2 = t3 || r2, x2 = !!(l2.append || e2.appendAvatar || e2.appendIcon), B2 = !!(l2.prepend || e2.prependAvatar || e2.prependIcon), h2 = !(!l2.image && !e2.image), N2 = m2 || B2 || x2, _2 = !(!l2.text && null == e2.text);
    return withDirectives(createVNode(a3, { class: ["v-card", { "v-card--disabled": e2.disabled, "v-card--flat": e2.flat, "v-card--hover": e2.hover && !(e2.disabled || e2.flat), "v-card--link": C2.value }, s2.value, o2.value, p2.value, v2.value, g2.value, f2.value, A2.value, k2.value, c2.value, e2.class], style: [u2.value, y2.value, I2.value, e2.style], href: V2.href.value, onClick: C2.value && V2.navigate, tabindex: e2.disabled ? -1 : void 0 }, { default: () => {
      var a4;
      return [h2 && createVNode("div", { key: "image", class: "v-card__image" }, [l2.image ? createVNode(Bo, { key: "image-defaults", disabled: !e2.image, defaults: { VImg: { cover: true, src: e2.image } } }, l2.image) : createVNode(gs, { key: "image-img", cover: true, src: e2.image }, null)]), createVNode(Go, { name: "v-card", active: !!e2.loading, color: "boolean" == typeof e2.loading ? void 0 : e2.loading }, { default: l2.loader }), N2 && createVNode(se, { key: "item", prependAvatar: e2.prependAvatar, prependIcon: e2.prependIcon, title: e2.title, subtitle: e2.subtitle, appendAvatar: e2.appendAvatar, appendIcon: e2.appendIcon }, { default: l2.item, prepend: l2.prepend, title: l2.title, subtitle: l2.subtitle, append: l2.append }), _2 && createVNode(ie, { key: "text" }, { default: () => {
        var _a;
        var a5;
        return [(_a = null == (a5 = l2.text) ? void 0 : a5.call(l2)) != null ? _a : e2.text];
      } }), null == (a4 = l2.default) ? void 0 : a4.call(l2), l2.actions && createVNode(ee, null, { default: l2.actions }), ho(C2.value, "v-card")];
    } }), [[resolveDirective("ripple"), C2.value && e2.ripple]]);
  }), {};
} });

export { $, ee as e, ie as i, le as l, oe as o };
//# sourceMappingURL=VCard-zlRMnW-z.mjs.map
