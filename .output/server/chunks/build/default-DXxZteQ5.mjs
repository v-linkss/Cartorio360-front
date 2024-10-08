import { g } from './nuxt-link-P_iIRbMa.mjs';
import { p as wn, y as _n, A as vo, o as $n, t as zn, F as ao, H as io, M as uo, O as jl, aJ as mo, S as no, X as so, a0 as co, Q as Wl, a5 as al, z as Fn, x as Bo, a2 as gs, aD as Rt, aY as Gr, aZ as Zl, q as Un, aG as ea, a_ as Dt, aA as hs, a$ as Xl, G as Ro, W as No, b0 as Ql, _ as jc, u as Ze, b1 as vs, d as Ct, as as Sr, ah as Li, V as br, ai as hu, aj as nu, b2 as tu } from './server.mjs';
import { createVNode, toRef, shallowRef, computed, ref, watch, watchEffect, mergeProps, withCtx, toDisplayString, unref, createTextVNode, openBlock, createBlock, Fragment, renderList, renderSlot, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderStyle, ssrInterpolate, ssrRenderList, ssrRenderSlot } from 'vue/server-renderer';
import { i } from './VContainer-Dwlw6VVY.mjs';
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
import 'vue3-toastify';
import 'vue-the-mask';

const de = wn({ text: String, ..._n(), ...vo() }, "VToolbarTitle"), ve = $n()({ name: "VToolbarTitle", props: de(), setup(e2, l2) {
  let { slots: t2 } = l2;
  return zn(() => {
    const l3 = !!(t2.default || t2.text || e2.text);
    return createVNode(e2.tag, { class: ["v-toolbar-title", e2.class], style: e2.style }, { default: () => {
      var a2;
      return [l3 && createVNode("div", { class: "v-toolbar-title__placeholder" }, [t2.text ? t2.text() : e2.text, null == (a2 = t2.default) ? void 0 : a2.call(t2)])];
    } });
  }), {};
} }), ce = [null, "prominent", "default", "comfortable", "compact"], fe = wn({ absolute: Boolean, collapse: Boolean, color: String, density: { type: String, default: "default", validator: (e2) => ce.includes(e2) }, extended: Boolean, extensionHeight: { type: [Number, String], default: 48 }, flat: Boolean, floating: Boolean, height: { type: [Number, String], default: 64 }, image: String, title: String, ...ao(), ..._n(), ...io(), ...uo(), ...vo({ tag: "header" }), ...jl() }, "VToolbar"), pe = $n()({ name: "VToolbar", props: fe(), setup(e2, l2) {
  var t2;
  let { slots: a2 } = l2;
  const { backgroundColorClasses: o2, backgroundColorStyles: r2 } = mo(toRef(e2, "color")), { borderClasses: u2 } = no(e2), { elevationClasses: n2 } = so(e2), { roundedClasses: i2 } = co(e2), { themeClasses: x2 } = Wl(e2), { rtlClasses: C2 } = al(), k2 = shallowRef(!(!e2.extended && !(null == (t2 = a2.extension) ? void 0 : t2.call(a2)))), S2 = computed(() => parseInt(Number(e2.height) + ("prominent" === e2.density ? Number(e2.height) : 0) - ("comfortable" === e2.density ? 8 : 0) - ("compact" === e2.density ? 16 : 0), 10)), V2 = computed(() => k2.value ? parseInt(Number(e2.extensionHeight) + ("prominent" === e2.density ? Number(e2.extensionHeight) : 0) - ("comfortable" === e2.density ? 4 : 0) - ("compact" === e2.density ? 8 : 0), 10) : 0);
  return Fn({ VBtn: { variant: "text" } }), zn(() => {
    var l3;
    const t3 = !(!e2.title && !a2.title), s2 = !(!a2.image && !e2.image), d2 = null == (l3 = a2.extension) ? void 0 : l3.call(a2);
    return k2.value = !(!e2.extended && !d2), createVNode(e2.tag, { class: ["v-toolbar", { "v-toolbar--absolute": e2.absolute, "v-toolbar--collapse": e2.collapse, "v-toolbar--flat": e2.flat, "v-toolbar--floating": e2.floating, [`v-toolbar--density-${e2.density}`]: true }, o2.value, u2.value, n2.value, i2.value, x2.value, C2.value, e2.class], style: [r2.value, e2.style] }, { default: () => [s2 && createVNode("div", { key: "image", class: "v-toolbar__image" }, [a2.image ? createVNode(Bo, { key: "image-defaults", disabled: !e2.image, defaults: { VImg: { cover: true, src: e2.image } } }, a2.image) : createVNode(gs, { key: "image-img", cover: true, src: e2.image }, null)]), createVNode(Bo, { defaults: { VTabs: { height: Rt(S2.value) } } }, { default: () => {
      var l4, o3, s3;
      return [createVNode("div", { class: "v-toolbar__content", style: { height: Rt(S2.value) } }, [a2.prepend && createVNode("div", { class: "v-toolbar__prepend" }, [null == (l4 = a2.prepend) ? void 0 : l4.call(a2)]), t3 && createVNode(ve, { key: "title", text: e2.title }, { text: a2.title }), null == (o3 = a2.default) ? void 0 : o3.call(a2), a2.append && createVNode("div", { class: "v-toolbar__append" }, [null == (s3 = a2.append) ? void 0 : s3.call(a2)])])];
    } }), createVNode(Bo, { defaults: { VTabs: { height: Rt(V2.value) } } }, { default: () => [createVNode(Gr, null, { default: () => [k2.value && createVNode("div", { class: "v-toolbar__extension", style: { height: Rt(V2.value) } }, [d2])] })] })] });
  }), { contentHeight: S2, extensionHeight: V2 };
} }), me = wn({ scrollTarget: { type: String }, scrollThreshold: { type: [String, Number], default: 300 } }, "scroll");
const _e = wn({ scrollBehavior: String, modelValue: { type: Boolean, default: true }, location: { type: String, default: "top", validator: (e2) => ["top", "bottom"].includes(e2) }, ...fe(), ...Zl(), ...me(), height: { type: [Number, String], default: 64 } }, "VAppBar"), he = $n()({ name: "VAppBar", props: _e(), emits: { "update:modelValue": (e2) => true }, setup(e2, l2) {
  let { slots: t2 } = l2;
  const a2 = ref(), o2 = Un(e2, "modelValue"), r2 = computed(() => {
    var _a;
    var l3;
    const t3 = new Set((_a = null == (l3 = e2.scrollBehavior) ? void 0 : l3.split(" ")) != null ? _a : []);
    return { hide: t3.has("hide"), fullyHide: t3.has("fully-hide"), inverted: t3.has("inverted"), collapse: t3.has("collapse"), elevate: t3.has("elevate"), fadeImage: t3.has("fade-image") };
  }), u2 = computed(() => {
    const e3 = r2.value;
    return e3.hide || e3.fullyHide || e3.inverted || e3.collapse || e3.elevate || e3.fadeImage || !o2.value;
  }), { currentScroll: n2, scrollThreshold: i2, isScrollingUp: d2, scrollRatio: v2 } = function(e3) {
    let l3 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
    const { canScroll: t3 } = l3;
    let a3 = 0, o3 = 0;
    const s2 = ref(null), r3 = shallowRef(0), u3 = shallowRef(0), n3 = shallowRef(0), i3 = shallowRef(false), d3 = shallowRef(false), v3 = computed(() => Number(e3.scrollThreshold)), c3 = computed(() => ea((v3.value - r3.value) / v3.value || 0));
    return watch(d3, () => {
      u3.value = u3.value || r3.value;
    }), watch(i3, () => {
      u3.value = 0;
    }), t3 && watch(t3, () => {
      const e4 = s2.value;
      if (!e4 || t3 && !t3.value)
        return;
      a3 = r3.value, r3.value = "window" in e4 ? e4.pageYOffset : e4.scrollTop;
      const l4 = e4 instanceof Window ? (void 0).documentElement.scrollHeight : e4.scrollHeight;
      o3 === l4 ? (d3.value = r3.value < a3, n3.value = Math.abs(r3.value - v3.value)) : o3 = l4;
    }, { immediate: true }), { scrollThreshold: v3, currentScroll: r3, currentThreshold: n3, isScrollActive: i3, scrollRatio: c3, isScrollingUp: d3, savedScroll: u3 };
  }(e2, { canScroll: u2 }), c2 = computed(() => r2.value.hide || r2.value.fullyHide), f2 = computed(() => e2.collapse || r2.value.collapse && (r2.value.inverted ? v2.value > 0 : 0 === v2.value)), p2 = computed(() => e2.flat || r2.value.fullyHide && !o2.value || r2.value.elevate && (r2.value.inverted ? n2.value > 0 : 0 === n2.value)), m2 = computed(() => r2.value.fadeImage ? r2.value.inverted ? 1 - v2.value : v2.value : void 0), _2 = computed(() => {
    var _a, _b;
    var l3, t3;
    const o3 = Number((_a = null == (l3 = a2.value) ? void 0 : l3.contentHeight) != null ? _a : e2.height), s2 = Number((_b = null == (t3 = a2.value) ? void 0 : t3.extensionHeight) != null ? _b : 0);
    return c2.value ? n2.value < i2.value || r2.value.fullyHide ? o3 + s2 : o3 : o3 + s2;
  });
  Dt(computed(() => !!e2.scrollBehavior), () => {
    watchEffect(() => {
      c2.value ? r2.value.inverted ? o2.value = n2.value > i2.value : o2.value = d2.value || n2.value < i2.value : o2.value = true;
    });
  });
  const { ssrBootStyles: h2 } = hs(), { layoutItemStyles: y2, layoutIsReady: g2 } = Xl({ id: e2.name, order: computed(() => parseInt(e2.order, 10)), position: toRef(e2, "location"), layoutSize: _2, elementSize: shallowRef(void 0), active: o2, absolute: toRef(e2, "absolute") });
  return zn(() => {
    const l3 = pe.filterProps(e2);
    return createVNode(pe, mergeProps({ ref: a2, class: ["v-app-bar", { "v-app-bar--bottom": "bottom" === e2.location }, e2.class], style: [{ ...y2.value, "--v-toolbar-image-opacity": m2.value, height: void 0, ...h2.value }, e2.style] }, l3, { collapse: f2.value, flat: p2.value }), t2);
  }), g2;
} }), ye = wn({ scrollable: Boolean, ..._n(), ...Ro(), ...vo({ tag: "main" }) }, "VMain"), ge = $n()({ name: "VMain", props: ye(), setup(e2, l2) {
  let { slots: t2 } = l2;
  const { dimensionStyles: a2 } = No(e2), { mainStyles: o2, layoutIsReady: r2 } = Ql(), { ssrBootStyles: u2 } = hs();
  return zn(() => createVNode(e2.tag, { class: ["v-main", { "v-main--scrollable": e2.scrollable }, e2.class], style: [o2.value, u2.value, a2.value, e2.style] }, { default: () => {
    var l3, a3;
    return [e2.scrollable ? createVNode("div", { class: "v-main__scroller" }, [null == (l3 = t2.default) ? void 0 : l3.call(t2)]) : null == (a3 = t2.default) ? void 0 : a3.call(t2)];
  } })), r2;
} }), be = { __name: "default", __ssrInlineRender: true, setup(l2) {
  const t2 = Ze(), a2 = [{ title: "Alterar Senha" }, { title: "Sair" }];
  function o2(e2) {
    "Sair" === e2 && (Ct("user-data").value = "", Ct("auth_token").value = "", t2.push("/login"));
  }
  return (l3, t3, s2, r2) => {
    const u2 = g;
    t3(ssrRenderComponent(vs, r2, { default: withCtx((e2, t4, s3, r3) => {
      if (!t4)
        return [createVNode(he, { color: "#C8FCCA", height: "85" }, { default: withCtx(() => [createVNode("h5", { style: { color: "#429946", "margin-left": "30px" } }, toDisplayString(("useCookie" in l3 ? l3.useCookie : unref(Ct))("user-data").value.cartorio_nome), 1), createVNode(Sr), createVNode(Li, null, { activator: withCtx(({ props: e3 }) => [createVNode(br, mergeProps({ style: { color: "#429946" } }, e3), { default: withCtx(() => [createTextVNode(" Cadastros ")]), _: 2 }, 1040)]), default: withCtx(() => [createVNode(hu, null, { default: withCtx(() => [createVNode(nu, null, { default: withCtx(() => [createVNode(u2, { style: { "text-decoration": "none", color: "inherit" }, to: "/pessoas/registros" }, { default: withCtx(() => [createTextVNode(" Pessoas ")]), _: 1 })]), _: 1 })]), _: 1 })]), _: 1 }), createVNode(Li, null, { activator: withCtx(({ props: e3 }) => [createVNode(br, mergeProps({ style: { color: "#429946" } }, e3), { default: withCtx(() => [createTextVNode(" Atendimento ")]), _: 2 }, 1040)]), default: withCtx(() => [createVNode(hu, null, { default: withCtx(() => [createVNode(nu, null, { default: withCtx(() => [createVNode(u2, { style: { "text-decoration": "none", color: "inherit" }, to: "/ordens-servicos" }, { default: withCtx(() => [createTextVNode(" Ordens de Servi\xE7os ")]), _: 1 })]), _: 1 })]), _: 1 })]), _: 1 }), createVNode(Li, null, { activator: withCtx(({ props: e3 }) => [createVNode(br, mergeProps({ class: "user" }, e3), { default: withCtx(() => [createTextVNode(toDisplayString(("useCookie" in l3 ? l3.useCookie : unref(Ct))("user-data").value.nome), 1)]), _: 2 }, 1040)]), default: withCtx(() => [createVNode(hu, null, { default: withCtx(() => [(openBlock(), createBlock(Fragment, null, renderList(a2, (e3, l4) => createVNode(nu, { key: l4, value: l4, onClick: (l5) => o2(e3.title) }, { default: withCtx(() => [createVNode(tu, null, { default: withCtx(() => [createTextVNode(toDisplayString(e3.title), 1)]), _: 2 }, 1024)]), _: 2 }, 1032, ["value", "onClick"])), 64))]), _: 1 })]), _: 1 })]), _: 1 }), createVNode(ge, null, { default: withCtx(() => [createVNode(i, null, { default: withCtx(() => [renderSlot(l3.$slots, "default", {}, void 0, true)]), _: 3 })]), _: 3 })];
      t4(ssrRenderComponent(he, { color: "#C8FCCA", height: "85" }, { default: withCtx((e3, t5, s4, r4) => {
        if (!t5)
          return [createVNode("h5", { style: { color: "#429946", "margin-left": "30px" } }, toDisplayString(("useCookie" in l3 ? l3.useCookie : unref(Ct))("user-data").value.cartorio_nome), 1), createVNode(Sr), createVNode(Li, null, { activator: withCtx(({ props: e4 }) => [createVNode(br, mergeProps({ style: { color: "#429946" } }, e4), { default: withCtx(() => [createTextVNode(" Cadastros ")]), _: 2 }, 1040)]), default: withCtx(() => [createVNode(hu, null, { default: withCtx(() => [createVNode(nu, null, { default: withCtx(() => [createVNode(u2, { style: { "text-decoration": "none", color: "inherit" }, to: "/pessoas/registros" }, { default: withCtx(() => [createTextVNode(" Pessoas ")]), _: 1 })]), _: 1 })]), _: 1 })]), _: 1 }), createVNode(Li, null, { activator: withCtx(({ props: e4 }) => [createVNode(br, mergeProps({ style: { color: "#429946" } }, e4), { default: withCtx(() => [createTextVNode(" Atendimento ")]), _: 2 }, 1040)]), default: withCtx(() => [createVNode(hu, null, { default: withCtx(() => [createVNode(nu, null, { default: withCtx(() => [createVNode(u2, { style: { "text-decoration": "none", color: "inherit" }, to: "/ordens-servicos" }, { default: withCtx(() => [createTextVNode(" Ordens de Servi\xE7os ")]), _: 1 })]), _: 1 })]), _: 1 })]), _: 1 }), createVNode(Li, null, { activator: withCtx(({ props: e4 }) => [createVNode(br, mergeProps({ class: "user" }, e4), { default: withCtx(() => [createTextVNode(toDisplayString(("useCookie" in l3 ? l3.useCookie : unref(Ct))("user-data").value.nome), 1)]), _: 2 }, 1040)]), default: withCtx(() => [createVNode(hu, null, { default: withCtx(() => [(openBlock(), createBlock(Fragment, null, renderList(a2, (e4, l4) => createVNode(nu, { key: l4, value: l4, onClick: (l5) => o2(e4.title) }, { default: withCtx(() => [createVNode(tu, null, { default: withCtx(() => [createTextVNode(toDisplayString(e4.title), 1)]), _: 2 }, 1024)]), _: 2 }, 1032, ["value", "onClick"])), 64))]), _: 1 })]), _: 1 })];
        t5(`<h5 style="${ssrRenderStyle({ color: "#429946", "margin-left": "30px" })}" data-v-feeb1427${r4}>${ssrInterpolate(("useCookie" in l3 ? l3.useCookie : unref(Ct))("user-data").value.cartorio_nome)}</h5>`), t5(ssrRenderComponent(Sr, null, null, s4, r4)), t5(ssrRenderComponent(Li, null, { activator: withCtx(({ props: e4 }, l4, t6, a3) => {
          if (!l4)
            return [createVNode(br, mergeProps({ style: { color: "#429946" } }, e4), { default: withCtx(() => [createTextVNode(" Cadastros ")]), _: 2 }, 1040)];
          l4(ssrRenderComponent(br, mergeProps({ style: { color: "#429946" } }, e4), { default: withCtx((e5, l5, t7, a4) => {
            if (!l5)
              return [createTextVNode(" Cadastros ")];
            l5(" Cadastros ");
          }), _: 2 }, t6, a3));
        }), default: withCtx((e4, l4, t6, a3) => {
          if (!l4)
            return [createVNode(hu, null, { default: withCtx(() => [createVNode(nu, null, { default: withCtx(() => [createVNode(u2, { style: { "text-decoration": "none", color: "inherit" }, to: "/pessoas/registros" }, { default: withCtx(() => [createTextVNode(" Pessoas ")]), _: 1 })]), _: 1 })]), _: 1 })];
          l4(ssrRenderComponent(hu, null, { default: withCtx((e5, l5, t7, a4) => {
            if (!l5)
              return [createVNode(nu, null, { default: withCtx(() => [createVNode(u2, { style: { "text-decoration": "none", color: "inherit" }, to: "/pessoas/registros" }, { default: withCtx(() => [createTextVNode(" Pessoas ")]), _: 1 })]), _: 1 })];
            l5(ssrRenderComponent(nu, null, { default: withCtx((e6, l6, t8, a5) => {
              if (!l6)
                return [createVNode(u2, { style: { "text-decoration": "none", color: "inherit" }, to: "/pessoas/registros" }, { default: withCtx(() => [createTextVNode(" Pessoas ")]), _: 1 })];
              l6(ssrRenderComponent(u2, { style: { "text-decoration": "none", color: "inherit" }, to: "/pessoas/registros" }, { default: withCtx((e7, l7, t9, a6) => {
                if (!l7)
                  return [createTextVNode(" Pessoas ")];
                l7(" Pessoas ");
              }), _: 1 }, t8, a5));
            }), _: 1 }, t7, a4));
          }), _: 1 }, t6, a3));
        }), _: 1 }, s4, r4)), t5(ssrRenderComponent(Li, null, { activator: withCtx(({ props: e4 }, l4, t6, a3) => {
          if (!l4)
            return [createVNode(br, mergeProps({ style: { color: "#429946" } }, e4), { default: withCtx(() => [createTextVNode(" Atendimento ")]), _: 2 }, 1040)];
          l4(ssrRenderComponent(br, mergeProps({ style: { color: "#429946" } }, e4), { default: withCtx((e5, l5, t7, a4) => {
            if (!l5)
              return [createTextVNode(" Atendimento ")];
            l5(" Atendimento ");
          }), _: 2 }, t6, a3));
        }), default: withCtx((e4, l4, t6, a3) => {
          if (!l4)
            return [createVNode(hu, null, { default: withCtx(() => [createVNode(nu, null, { default: withCtx(() => [createVNode(u2, { style: { "text-decoration": "none", color: "inherit" }, to: "/ordens-servicos" }, { default: withCtx(() => [createTextVNode(" Ordens de Servi\xE7os ")]), _: 1 })]), _: 1 })]), _: 1 })];
          l4(ssrRenderComponent(hu, null, { default: withCtx((e5, l5, t7, a4) => {
            if (!l5)
              return [createVNode(nu, null, { default: withCtx(() => [createVNode(u2, { style: { "text-decoration": "none", color: "inherit" }, to: "/ordens-servicos" }, { default: withCtx(() => [createTextVNode(" Ordens de Servi\xE7os ")]), _: 1 })]), _: 1 })];
            l5(ssrRenderComponent(nu, null, { default: withCtx((e6, l6, t8, a5) => {
              if (!l6)
                return [createVNode(u2, { style: { "text-decoration": "none", color: "inherit" }, to: "/ordens-servicos" }, { default: withCtx(() => [createTextVNode(" Ordens de Servi\xE7os ")]), _: 1 })];
              l6(ssrRenderComponent(u2, { style: { "text-decoration": "none", color: "inherit" }, to: "/ordens-servicos" }, { default: withCtx((e7, l7, t9, a6) => {
                if (!l7)
                  return [createTextVNode(" Ordens de Servi\xE7os ")];
                l7(" Ordens de Servi\xE7os ");
              }), _: 1 }, t8, a5));
            }), _: 1 }, t7, a4));
          }), _: 1 }, t6, a3));
        }), _: 1 }, s4, r4)), t5(ssrRenderComponent(Li, null, { activator: withCtx(({ props: e4 }, t6, a3, o3) => {
          if (!t6)
            return [createVNode(br, mergeProps({ class: "user" }, e4), { default: withCtx(() => [createTextVNode(toDisplayString(("useCookie" in l3 ? l3.useCookie : unref(Ct))("user-data").value.nome), 1)]), _: 2 }, 1040)];
          t6(ssrRenderComponent(br, mergeProps({ class: "user" }, e4), { default: withCtx((e5, t7, a4, o4) => {
            if (!t7)
              return [createTextVNode(toDisplayString(("useCookie" in l3 ? l3.useCookie : unref(Ct))("user-data").value.nome), 1)];
            t7(`${ssrInterpolate(("useCookie" in l3 ? l3.useCookie : unref(Ct))("user-data").value.nome)}`);
          }), _: 2 }, a3, o3));
        }), default: withCtx((e4, l4, t6, s5) => {
          if (!l4)
            return [createVNode(hu, null, { default: withCtx(() => [(openBlock(), createBlock(Fragment, null, renderList(a2, (e5, l5) => createVNode(nu, { key: l5, value: l5, onClick: (l6) => o2(e5.title) }, { default: withCtx(() => [createVNode(tu, null, { default: withCtx(() => [createTextVNode(toDisplayString(e5.title), 1)]), _: 2 }, 1024)]), _: 2 }, 1032, ["value", "onClick"])), 64))]), _: 1 })];
          l4(ssrRenderComponent(hu, null, { default: withCtx((e5, l5, t7, s6) => {
            if (!l5)
              return [(openBlock(), createBlock(Fragment, null, renderList(a2, (e6, l6) => createVNode(nu, { key: l6, value: l6, onClick: (l7) => o2(e6.title) }, { default: withCtx(() => [createVNode(tu, null, { default: withCtx(() => [createTextVNode(toDisplayString(e6.title), 1)]), _: 2 }, 1024)]), _: 2 }, 1032, ["value", "onClick"])), 64))];
            l5("<!--[-->"), ssrRenderList(a2, (e6, a3) => {
              l5(ssrRenderComponent(nu, { key: a3, value: a3, onClick: (l6) => o2(e6.title) }, { default: withCtx((l6, t8, a4, o3) => {
                if (!t8)
                  return [createVNode(tu, null, { default: withCtx(() => [createTextVNode(toDisplayString(e6.title), 1)]), _: 2 }, 1024)];
                t8(ssrRenderComponent(tu, null, { default: withCtx((l7, t9, a5, o4) => {
                  if (!t9)
                    return [createTextVNode(toDisplayString(e6.title), 1)];
                  t9(`${ssrInterpolate(e6.title)}`);
                }), _: 2 }, a4, o3));
              }), _: 2 }, t7, s6));
            }), l5("<!--]-->");
          }), _: 1 }, t6, s5));
        }), _: 1 }, s4, r4));
      }), _: 1 }, s3, r3)), t4(ssrRenderComponent(ge, null, { default: withCtx((e3, t5, a3, o3) => {
        if (!t5)
          return [createVNode(i, null, { default: withCtx(() => [renderSlot(l3.$slots, "default", {}, void 0, true)]), _: 3 })];
        t5(ssrRenderComponent(i, null, { default: withCtx((e4, t6, a4, o4) => {
          if (!t6)
            return [renderSlot(l3.$slots, "default", {}, void 0, true)];
          ssrRenderSlot(l3.$slots, "default", {}, null, t6, a4, o4);
        }), _: 3 }, a3, o3));
      }), _: 3 }, s3, r3));
    }), _: 3 }, s2));
  };
} }, xe = be.setup;
be.setup = (e2, l2) => {
  const t2 = useSSRContext();
  return (t2.modules || (t2.modules = /* @__PURE__ */ new Set())).add("layouts/default.vue"), xe ? xe(e2, l2) : void 0;
};
const Ce = jc(be, [["__scopeId", "data-v-feeb1427"]]);

export { Ce as default };
//# sourceMappingURL=default-DXxZteQ5.mjs.map
