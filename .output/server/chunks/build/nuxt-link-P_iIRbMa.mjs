import { defineComponent, ref, h as h$1, resolveComponent, computed } from 'vue';
import { F as parseQuery, l as hasProtocol, w as withQuery, n as joinURL, G as withTrailingSlash, H as withoutTrailingSlash } from '../runtime.mjs';
import { u as Ze, n as $e, b as Ye, a as Je } from './server.mjs';

function h(s2) {
  const v2 = s2.componentName || "NuxtLink";
  function c2(e2, t2) {
    if (!e2 || "append" !== s2.trailingSlash && "remove" !== s2.trailingSlash)
      return e2;
    if ("string" == typeof e2)
      return m(e2, s2.trailingSlash);
    const r2 = "path" in e2 && void 0 !== e2.path ? e2.path : t2(e2).path;
    return { ...e2, name: void 0, path: m(r2, s2.trailingSlash) };
  }
  function h2(e2) {
    var _a, _b, _c;
    const t2 = Ze(), r2 = Ye(), u2 = computed(() => !!e2.target && "_self" !== e2.target), s3 = computed(() => {
      const t3 = e2.to || e2.href || "";
      return "string" == typeof t3 && hasProtocol(t3, { acceptRelative: true });
    }), v3 = resolveComponent("RouterLink"), h3 = v3 && "string" != typeof v3 ? v3.useLink : void 0, g2 = computed(() => {
      if (e2.external)
        return true;
      const t3 = e2.to || e2.href || "";
      return "object" != typeof t3 && ("" === t3 || s3.value);
    }), m2 = computed(() => {
      const r3 = e2.to || e2.href || "";
      return g2.value ? r3 : c2(r3, t2.resolve);
    }), y = g2.value || null == h3 ? void 0 : h3({ ...e2, to: m2 }), q = computed(() => {
      var _a2;
      var e3;
      if (!m2.value || s3.value)
        return m2.value;
      if (g2.value) {
        return c2("object" == typeof m2.value ? function(e4) {
          return withQuery(e4.path || "", e4.query || {}) + (e4.hash ? "#" + e4.hash : "");
        }(m2.value) : m2.value, t2.resolve);
      }
      return "object" == typeof m2.value ? (_a2 = null == (e3 = t2.resolve(m2.value)) ? void 0 : e3.href) != null ? _a2 : null : c2(joinURL(r2.app.baseURL, m2.value), t2.resolve);
    });
    return { to: m2, hasTarget: u2, isAbsoluteUrl: s3, isExternal: g2, href: q, isActive: (_a = null == y ? void 0 : y.isActive) != null ? _a : computed(() => m2.value === t2.currentRoute.value.path), isExactActive: (_b = null == y ? void 0 : y.isExactActive) != null ? _b : computed(() => m2.value === t2.currentRoute.value.path), route: (_c = null == y ? void 0 : y.route) != null ? _c : computed(() => t2.resolve(m2.value)), async navigate() {
      await Je(q.value, { replace: e2.replace, external: g2.value || u2.value });
    } };
  }
  return defineComponent({ name: v2, props: { to: { type: [String, Object], default: void 0, required: false }, href: { type: [String, Object], default: void 0, required: false }, target: { type: String, default: void 0, required: false }, rel: { type: String, default: void 0, required: false }, noRel: { type: Boolean, default: void 0, required: false }, prefetch: { type: Boolean, default: void 0, required: false }, noPrefetch: { type: Boolean, default: void 0, required: false }, activeClass: { type: String, default: void 0, required: false }, exactActiveClass: { type: String, default: void 0, required: false }, prefetchedClass: { type: String, default: void 0, required: false }, replace: { type: Boolean, default: void 0, required: false }, ariaCurrentValue: { type: String, default: void 0, required: false }, external: { type: Boolean, default: void 0, required: false }, custom: { type: Boolean, default: void 0, required: false } }, useLink: h2, setup(e2, { slots: l2 }) {
    Ze();
    const { to: i2, href: n2, navigate: o2, isExternal: v3, hasTarget: c3, isAbsoluteUrl: f2 } = h2(e2), p2 = ref(false);
    return () => {
      var t2;
      if (!v3.value && !c3.value) {
        const t3 = { ref: void 0, to: i2.value, activeClass: e2.activeClass || s2.activeClass, exactActiveClass: e2.exactActiveClass || s2.exactActiveClass, replace: e2.replace, ariaCurrentValue: e2.ariaCurrentValue, custom: e2.custom };
        return e2.custom || (p2.value && (t3.class = e2.prefetchedClass || s2.prefetchedClass), t3.rel = e2.rel || void 0), h$1(resolveComponent("RouterLink"), t3, l2.default);
      }
      const d2 = e2.target || null, h3 = ((...e3) => e3.find((e4) => void 0 !== e4))(e2.noRel ? "" : e2.rel, s2.externalRelAttribute, f2.value || c3.value ? "noopener noreferrer" : "") || null;
      return e2.custom ? l2.default ? l2.default({ href: n2.value, navigate: o2, get route() {
        if (!n2.value)
          return;
        const e3 = new URL(n2.value, "http://localhost");
        return { path: e3.pathname, fullPath: e3.pathname, get query() {
          return parseQuery(e3.search);
        }, hash: e3.hash, params: {}, name: void 0, matched: [], redirectedFrom: void 0, meta: {}, href: n2.value };
      }, rel: h3, target: d2, isExternal: v3.value || c3.value, isActive: false, isExactActive: false }) : null : h$1("a", { ref: void 0, href: n2.value || null, rel: h3, target: d2 }, null == (t2 = l2.default) ? void 0 : t2.call(l2));
    };
  } });
}
const g = h($e);
function m(e2, t2) {
  const r2 = "append" === t2 ? withTrailingSlash : withoutTrailingSlash;
  return hasProtocol(e2) && !e2.startsWith("http") ? e2 : r2(e2, true);
}

export { g };
//# sourceMappingURL=nuxt-link-P_iIRbMa.mjs.map
