import { ref, shallowRef, computed, watch, nextTick, createVNode, mergeProps, Fragment, createTextVNode } from 'vue';
import { p as wn, a6 as Vu, a7 as _u, a8 as Gt, a9 as rs, aa as _r, o as $n, ab as tl, q as Un, ac as pu, ad as fo, ap as Jt, ae as es, af as Bu, ag as wu, t as zn, e as is, ah as Li, ai as hu, aj as nu, ak as Cu, al as As, D as bs, E as To, am as ya, x as Bo, an as Es, ao as ga, v as $i, aq as ha } from './server.mjs';

const B = wn({ autoSelectFirst: { type: [Boolean, String] }, clearOnSelect: Boolean, search: String, ...Vu({ filterKeys: ["title"] }), ..._u(), ...Gt(rs({ modelValue: null, role: "combobox" }), ["validationValue", "dirty", "appendInnerIcon"]), ..._r({ transition: false }) }, "VAutocomplete"), L = $n()({ name: "VAutocomplete", props: B(), emits: { "update:focused": (e2) => true, "update:search": (e2) => true, "update:modelValue": (e2) => true, "update:menu": (e2) => true }, setup(s2, r2) {
  let { slots: c2 } = r2;
  const { t: p2 } = tl(), d2 = ref(), m2 = shallowRef(false), f2 = shallowRef(true), B2 = shallowRef(false), L2 = ref(), N = ref(), j = Un(s2, "menu"), q = computed({ get: () => j.value, set: (e2) => {
    var l2;
    j.value && !e2 && (null == (l2 = L2.value) ? void 0 : l2.\u03A8openChildren) || (j.value = e2);
  } }), z = shallowRef(-1), H = computed(() => {
    var e2;
    return null == (e2 = d2.value) ? void 0 : e2.color;
  }), G = computed(() => q.value ? s2.closeText : s2.openText), { items: J, transformIn: Q, transformOut: W } = pu(s2), { textColorClasses: X, textColorStyles: Y } = fo(H), Z = Un(s2, "search", ""), $ = Un(s2, "modelValue", [], (e2) => Q(null === e2 ? [null] : Jt(e2)), (e2) => {
    var _a;
    const l2 = W(e2);
    return s2.multiple ? l2 : (_a = l2[0]) != null ? _a : null;
  }), ee = computed(() => "function" == typeof s2.counterValue ? s2.counterValue($.value) : "number" == typeof s2.counterValue ? s2.counterValue : $.value.length), le = es(), { filteredItems: ae, getMatches: te } = Bu(s2, J, () => f2.value ? "" : Z.value), ue = computed(() => s2.hideSelected ? ae.value.filter((e2) => !$.value.some((l2) => l2.value === e2.value)) : ae.value), ne = computed(() => !(!s2.chips && !c2.chip)), oe = computed(() => ne.value || !!c2.selection), ve = computed(() => $.value.map((e2) => e2.props.value)), ie = computed(() => {
    var e2;
    return (true === s2.autoSelectFirst || "exact" === s2.autoSelectFirst && Z.value === (null == (e2 = ue.value[0]) ? void 0 : e2.title)) && ue.value.length > 0 && !f2.value && !B2.value;
  }), se = computed(() => s2.hideNoData && !ue.value.length || s2.readonly || (null == le ? void 0 : le.isReadonly.value)), re = ref(), { onListScroll: ce, onListKeydown: pe } = wu(re, d2);
  function de(e2) {
    s2.openOnClear && (q.value = true), Z.value = "";
  }
  function me() {
    se.value || (q.value = true);
  }
  function fe(e2) {
    se.value || (m2.value && (e2.preventDefault(), e2.stopPropagation()), q.value = !q.value);
  }
  function he(e2) {
    var l2, a2, t2;
    if (s2.readonly || (null == le ? void 0 : le.isReadonly.value))
      return;
    const u2 = d2.value.selectionStart, n2 = $.value.length;
    if ((z.value > -1 || ["Enter", "ArrowDown", "ArrowUp"].includes(e2.key)) && e2.preventDefault(), ["Enter", "ArrowDown"].includes(e2.key) && (q.value = true), ["Escape"].includes(e2.key) && (q.value = false), ie.value && ["Enter", "Tab"].includes(e2.key) && !$.value.some((e3) => {
      let { value: l3 } = e3;
      return l3 === ue.value[0].value;
    }) && we(ue.value[0]), "ArrowDown" === e2.key && ie.value && (null == (l2 = re.value) || l2.focus("next")), ["Backspace", "Delete"].includes(e2.key)) {
      if (!s2.multiple && oe.value && $.value.length > 0 && !Z.value)
        return we($.value[0], false);
      if (~z.value) {
        const e3 = z.value;
        we($.value[z.value], false), z.value = e3 >= n2 - 1 ? n2 - 2 : e3;
      } else
        "Backspace" !== e2.key || Z.value || (z.value = n2 - 1);
    }
    if (s2.multiple) {
      if ("ArrowLeft" === e2.key) {
        if (z.value < 0 && u2 > 0)
          return;
        const e3 = z.value > -1 ? z.value - 1 : n2 - 1;
        $.value[e3] ? z.value = e3 : (z.value = -1, d2.value.setSelectionRange(null == (a2 = Z.value) ? void 0 : a2.length, null == (t2 = Z.value) ? void 0 : t2.length));
      }
      if ("ArrowRight" === e2.key) {
        if (z.value < 0)
          return;
        const e3 = z.value + 1;
        $.value[e3] ? z.value = e3 : (z.value = -1, d2.value.setSelectionRange(0, 0));
      }
    }
  }
  function ye(e2) {
    if (ha(d2.value) || ha(d2.value)) ;
  }
  function ge() {
    var e2;
    m2.value && (f2.value = true, null == (e2 = d2.value) || e2.focus());
  }
  function ke(e2) {
    m2.value = true, setTimeout(() => {
      B2.value = true;
    });
  }
  function xe(e2) {
    B2.value = false;
  }
  function Ve(e2) {
    null != e2 && ("" !== e2 || s2.multiple || oe.value) || ($.value = []);
  }
  const be = shallowRef(false);
  function we(e2) {
    let l2 = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
    if (e2 && !e2.props.disabled)
      if (s2.multiple) {
        const a2 = $.value.findIndex((l3) => s2.valueComparator(l3.value, e2.value)), t2 = null == l2 ? !~a2 : l2;
        if (~a2) {
          const l3 = t2 ? [...$.value, e2] : [...$.value];
          l3.splice(a2, 1), $.value = l3;
        } else
          t2 && ($.value = [...$.value, e2]);
        s2.clearOnSelect && (Z.value = "");
      } else {
        const a2 = false !== l2;
        $.value = a2 ? [e2] : [], Z.value = a2 && !oe.value ? e2.title : "", nextTick(() => {
          q.value = false, f2.value = true;
        });
      }
  }
  return watch(m2, (e2, l2) => {
    var _a;
    var a2;
    e2 !== l2 && (e2 ? (be.value = true, Z.value = s2.multiple || oe.value ? "" : String((_a = null == (a2 = $.value.at(-1)) ? void 0 : a2.props.title) != null ? _a : ""), f2.value = true, nextTick(() => be.value = false)) : (s2.multiple || null != Z.value || ($.value = []), q.value = false, $.value.some((e3) => {
      let { title: l3 } = e3;
      return l3 === Z.value;
    }) || (Z.value = ""), z.value = -1));
  }), watch(Z, (e2) => {
    m2.value && !be.value && (e2 && (q.value = true), f2.value = !e2);
  }), watch(q, () => {
    !s2.hideSelected && q.value && $.value.length && ue.value.findIndex((e2) => $.value.some((l2) => e2.value === l2.value));
  }), watch(() => s2.items, (e2, l2) => {
    q.value || m2.value && !l2.length && e2.length && (q.value = true);
  }), zn(() => {
    const e2 = !!(!s2.hideNoData || ue.value.length || c2["prepend-item"] || c2["append-item"] || c2["no-data"]), l2 = $.value.length > 0, a2 = is.filterProps(s2);
    return createVNode(is, mergeProps({ ref: d2 }, a2, { modelValue: Z.value, "onUpdate:modelValue": [(e3) => Z.value = e3, Ve], focused: m2.value, "onUpdate:focused": (e3) => m2.value = e3, validationValue: $.externalValue, counterValue: ee.value, dirty: l2, onChange: ye, class: ["v-autocomplete", "v-autocomplete--" + (s2.multiple ? "multiple" : "single"), { "v-autocomplete--active-menu": q.value, "v-autocomplete--chips": !!s2.chips, "v-autocomplete--selection-slot": !!oe.value, "v-autocomplete--selecting-index": z.value > -1 }, s2.class], style: s2.style, readonly: s2.readonly, placeholder: l2 ? void 0 : s2.placeholder, "onClick:clear": de, "onMousedown:control": me, onKeydown: he }), { ...c2, default: () => createVNode(Fragment, null, [createVNode(Li, mergeProps({ ref: L2, modelValue: q.value, "onUpdate:modelValue": (e3) => q.value = e3, activator: "parent", contentClass: "v-autocomplete__content", disabled: se.value, eager: s2.eager, maxHeight: 310, openOnClick: false, closeOnContentClick: false, transition: s2.transition, onAfterLeave: ge }, s2.menuProps), { default: () => {
      var _a;
      return [e2 && createVNode(hu, mergeProps({ ref: re, selected: ve.value, selectStrategy: s2.multiple ? "independent" : "single-independent", onMousedown: (e3) => e3.preventDefault(), onKeydown: pe, onFocusin: ke, onFocusout: xe, onScrollPassive: ce, tabindex: "-1", "aria-live": "polite", color: (_a = s2.itemColor) != null ? _a : s2.color }, s2.listProps), { default: () => {
        var _a2;
        var e3, l3, a3;
        return [null == (e3 = c2["prepend-item"]) ? void 0 : e3.call(c2), !ue.value.length && !s2.hideNoData && ((_a2 = null == (l3 = c2["no-data"]) ? void 0 : l3.call(c2)) != null ? _a2 : createVNode(nu, { title: p2(s2.noDataText) }, null)), createVNode(Cu, { ref: N, renderless: true, items: ue.value }, { default: (e4) => {
          var _a3;
          var l4;
          let { item: a4, index: t2, itemRef: u2 } = e4;
          const i2 = mergeProps(a4.props, { ref: u2, key: t2, active: !(!ie.value || 0 !== t2) || void 0, onClick: () => we(a4, null) });
          return (_a3 = null == (l4 = c2.item) ? void 0 : l4.call(c2, { item: a4, index: t2, props: i2 })) != null ? _a3 : createVNode(nu, mergeProps(i2, { role: "option" }), { prepend: (e5) => {
            let { isSelected: l5 } = e5;
            return createVNode(Fragment, null, [s2.multiple && !s2.hideSelected ? createVNode(As, { key: a4.value, modelValue: l5, ripple: false, tabindex: "-1" }, null) : void 0, a4.props.prependAvatar && createVNode(bs, { image: a4.props.prependAvatar }, null), a4.props.prependIcon && createVNode(To, { icon: a4.props.prependIcon }, null)]);
          }, title: () => {
            var _a4;
            var e5, l5;
            return f2.value ? a4.title : function(e6, l6, a5) {
              if (null == l6)
                return e6;
              if (Array.isArray(l6))
                throw new Error("Multiple matches is not implemented");
              return "number" == typeof l6 && ~l6 ? createVNode(Fragment, null, [createVNode("span", { class: "v-autocomplete__unmask" }, [e6.substr(0, l6)]), createVNode("span", { class: "v-autocomplete__mask" }, [e6.substr(l6, a5)]), createVNode("span", { class: "v-autocomplete__unmask" }, [e6.substr(l6 + a5)])]) : e6;
            }(a4.title, null == (e5 = te(a4)) ? void 0 : e5.title, (_a4 = null == (l5 = Z.value) ? void 0 : l5.length) != null ? _a4 : 0);
          } });
        } }), null == (a3 = c2["append-item"]) ? void 0 : a3.call(c2)];
      } })];
    } }), $.value.map((e3, l3) => {
      function a3(l4) {
        l4.stopPropagation(), l4.preventDefault(), we(e3, false);
      }
      const t2 = { "onClick:close": a3, onKeydown(e4) {
        "Enter" !== e4.key && " " !== e4.key || (e4.preventDefault(), e4.stopPropagation(), a3(e4));
      }, onMousedown(e4) {
        e4.preventDefault(), e4.stopPropagation();
      }, modelValue: true, "onUpdate:modelValue": void 0 }, u2 = ne.value ? !!c2.chip : !!c2.selection, v2 = u2 ? ya(ne.value ? c2.chip({ item: e3, index: l3, props: t2 }) : c2.selection({ item: e3, index: l3 })) : void 0;
      if (!u2 || v2)
        return createVNode("div", { key: e3.value, class: ["v-autocomplete__selection", l3 === z.value && ["v-autocomplete__selection--selected", X.value]], style: l3 === z.value ? Y.value : {} }, [ne.value ? c2.chip ? createVNode(Bo, { key: "chip-defaults", defaults: { VChip: { closable: s2.closableChips, size: "small", text: e3.title } } }, { default: () => [v2] }) : createVNode(Es, mergeProps({ key: "chip", closable: s2.closableChips, size: "small", text: e3.title, disabled: e3.props.disabled }, t2), null) : v2 != null ? v2 : createVNode("span", { class: "v-autocomplete__selection-text" }, [e3.title, s2.multiple && l3 < $.value.length - 1 && createVNode("span", { class: "v-autocomplete__selection-comma" }, [createTextVNode(",")])])]);
    })]), "append-inner": function() {
      for (var e3, l3 = arguments.length, a3 = new Array(l3), t2 = 0; t2 < l3; t2++)
        a3[t2] = arguments[t2];
      return createVNode(Fragment, null, [null == (e3 = c2["append-inner"]) ? void 0 : e3.call(c2, ...a3), s2.menuIcon ? createVNode(To, { class: "v-autocomplete__menu-icon", icon: s2.menuIcon, onMousedown: fe, onClick: ga, "aria-label": p2(G.value), title: p2(G.value), tabindex: "-1" }, null) : void 0]);
    } });
  }), $i({ isFocused: m2, isPristine: f2, menu: q, search: Z, filteredItems: ae, select: we }, d2);
} });

export { L };
//# sourceMappingURL=VAutocomplete-yDrVnvO6.mjs.map
