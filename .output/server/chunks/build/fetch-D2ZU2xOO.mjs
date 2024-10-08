import { computed, toValue, reactive, ref, shallowRef, toRef, getCurrentInstance, onServerPrefetch, unref } from 'vue';
import { E as hash } from '../runtime.mjs';
import { j as Le, k as xt, f as Ue, g as Me, h as nt } from './server.mjs';

const m = (e2) => "defer" === e2 || false === e2;
function h(...o2) {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i;
  var c2;
  const l2 = "string" == typeof o2[o2.length - 1] ? o2.pop() : void 0;
  "string" != typeof o2[0] && o2.unshift(l2);
  let [y2, p2, h2 = {}] = o2;
  if ("string" != typeof y2)
    throw new TypeError("[nuxt] [asyncData] key must be a string.");
  if ("function" != typeof p2)
    throw new TypeError("[nuxt] [asyncData] handler must be a function.");
  const v2 = Ue(), g2 = p2;
  h2.server = (_a = h2.server) != null ? _a : true, h2.default = (_b = h2.default) != null ? _b : () => Me.value, h2.getCachedData = (_c = h2.getCachedData) != null ? _c : () => v2.isHydrating ? v2.payload.data[y2] : v2.static.data[y2], h2.lazy = (_d = h2.lazy) != null ? _d : false, h2.immediate = (_e = h2.immediate) != null ? _e : true, h2.deep = (_f = h2.deep) != null ? _f : Me.deep, h2.dedupe = (_g = h2.dedupe) != null ? _g : "cancel";
  const _2 = () => null != h2.getCachedData(y2, v2);
  if (!v2._asyncData[y2] || !h2.immediate) {
    (_h = (c2 = v2.payload._errors)[y2]) != null ? _h : c2[y2] = Me.errorValue;
    const r2 = h2.deep ? ref : shallowRef;
    v2._asyncData[y2] = { data: r2((_i = h2.getCachedData(y2, v2)) != null ? _i : h2.default()), pending: ref(!_2()), error: toRef(v2.payload._errors, y2), status: ref("idle"), _default: h2.default };
  }
  const D2 = { ...v2._asyncData[y2] };
  delete D2._default, D2.refresh = D2.execute = (e2 = {}) => {
    var _a2;
    if (v2._asyncDataPromises[y2]) {
      if (m((_a2 = e2.dedupe) != null ? _a2 : h2.dedupe))
        return v2._asyncDataPromises[y2];
      v2._asyncDataPromises[y2].cancelled = true;
    }
    if ((e2._initial || v2.isHydrating && false !== e2._initial) && _2())
      return Promise.resolve(h2.getCachedData(y2, v2));
    D2.pending.value = true, D2.status.value = "pending";
    const a2 = new Promise((e3, a3) => {
      try {
        e3(g2(v2));
      } catch (t2) {
        a3(t2);
      }
    }).then(async (e3) => {
      if (a2.cancelled)
        return v2._asyncDataPromises[y2];
      let t2 = e3;
      h2.transform && (t2 = await h2.transform(e3)), h2.pick && (t2 = function(e4, a3) {
        const t3 = {};
        for (const r2 of a3)
          t3[r2] = e4[r2];
        return t3;
      }(t2, h2.pick)), v2.payload.data[y2] = t2, D2.data.value = t2, D2.error.value = Me.errorValue, D2.status.value = "success";
    }).catch((e3) => {
      if (a2.cancelled)
        return v2._asyncDataPromises[y2];
      D2.error.value = nt(e3), D2.data.value = unref(h2.default()), D2.status.value = "error";
    }).finally(() => {
      a2.cancelled || (D2.pending.value = false, delete v2._asyncDataPromises[y2]);
    });
    return v2._asyncDataPromises[y2] = a2, v2._asyncDataPromises[y2];
  }, D2.clear = () => function(e2, a2) {
    a2 in e2.payload.data && (e2.payload.data[a2] = void 0);
    a2 in e2.payload._errors && (e2.payload._errors[a2] = Me.errorValue);
    e2._asyncData[a2] && (e2._asyncData[a2].data.value = void 0, e2._asyncData[a2].error.value = Me.errorValue, e2._asyncData[a2].pending.value = false, e2._asyncData[a2].status.value = "idle");
    a2 in e2._asyncDataPromises && (e2._asyncDataPromises[a2].cancelled = true, e2._asyncDataPromises[a2] = void 0);
  }(v2, y2);
  if (false !== h2.server && v2.payload.serverRendered && h2.immediate) {
    const e2 = D2.refresh({ _initial: true });
    getCurrentInstance() ? onServerPrefetch(() => e2) : v2.hook("app:created", async () => {
      await e2;
    });
  }
  const P = Promise.resolve(v2._asyncDataPromises[y2]).then(() => D2);
  return Object.assign(P, D2), P;
}
function v(...e2) {
  const a2 = "string" == typeof e2[e2.length - 1] ? e2.pop() : void 0;
  "string" != typeof e2[0] && e2.unshift(a2);
  const [t2, r2, s2 = {}] = e2;
  return h(t2, r2, { ...s2, lazy: true }, null);
}
function g(e2, a2, t2) {
  const [r2 = {}, s2] = "string" == typeof a2 ? [{}, a2] : [a2, t2], n2 = computed(() => toValue(e2)), u2 = r2.key || hash([s2, "string" == typeof n2.value ? n2.value : "", ...D(r2)]);
  if (!u2 || "string" != typeof u2)
    throw new TypeError("[nuxt] [useFetch] key must be a string: " + u2);
  if (!e2)
    throw new Error("[nuxt] [useFetch] request is missing.");
  const d2 = u2 === s2 ? "$f" + u2 : u2;
  if (!r2.baseURL && "string" == typeof n2.value && "/" === n2.value[0] && "/" === n2.value[1])
    throw new Error('[nuxt] [useFetch] the request URL must not start with "//".');
  const { server: f2, lazy: m2, default: v2, transform: g2, pick: _2, watch: P, immediate: b, getCachedData: w, deep: C, dedupe: x, ...k } = r2, T = reactive({ ...Le, ...k, cache: "boolean" == typeof r2.cache ? void 0 : r2.cache });
  let z;
  return h(d2, () => {
    var e3;
    null == (e3 = null == z ? void 0 : z.abort) || e3.call(z), z = "undefined" != typeof AbortController ? new AbortController() : {};
    const a3 = toValue(r2.timeout);
    let t3;
    a3 && (t3 = setTimeout(() => z.abort(), a3), z.signal.onabort = () => clearTimeout(t3));
    let s3 = r2.$fetch || globalThis.$fetch;
    if (!r2.$fetch) {
      "string" == typeof n2.value && "/" === n2.value[0] && (!toValue(r2.baseURL) || "/" === toValue(r2.baseURL)[0]) && (s3 = xt());
    }
    return s3(n2.value, { signal: z.signal, ...T }).finally(() => {
      clearTimeout(t3);
    });
  }, { server: f2, lazy: m2, default: v2, transform: g2, pick: _2, immediate: b, getCachedData: w, deep: C, dedupe: x, watch: false === P ? [] : [T, n2, ...P || []] });
}
function _(e2, a2, t2) {
  const [r2 = {}, s2] = [{}, a2];
  return g(e2, { ...r2, lazy: true }, s2);
}
function D(e2) {
  var a2;
  const t2 = [(null == (a2 = toValue(e2.method)) ? void 0 : a2.toUpperCase()) || "GET", toValue(e2.baseURL)];
  for (const r2 of [e2.params || e2.query]) {
    const e3 = toValue(r2);
    if (!e3)
      continue;
    const a3 = {};
    for (const [t3, r3] of Object.entries(e3))
      a3[toValue(t3)] = toValue(r3);
    t2.push(a3);
  }
  return t2;
}

export { _, g, v };
//# sourceMappingURL=fetch-D2ZU2xOO.mjs.map
