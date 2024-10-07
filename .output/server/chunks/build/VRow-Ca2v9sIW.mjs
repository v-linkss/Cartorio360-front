import { p as wn, y as _n, A as vo, o as $n, ar as hl } from './server.mjs';
import { computed, h as h$1, capitalize } from 'vue';

const r = ["start", "end", "center"], u = ["space-between", "space-around", "space-evenly"];
function c(t2, n2) {
  return hl.reduce((e2, l2) => (e2[t2 + capitalize(l2)] = n2(), e2), {});
}
const g = [...r, "baseline", "stretch"], d = (t2) => g.includes(t2), f = c("align", () => ({ type: String, default: null, validator: d })), y = [...r, ...u], p = (t2) => y.includes(t2), v = c("justify", () => ({ type: String, default: null, validator: p })), j = [...r, ...u, "stretch"], w = (t2) => j.includes(t2), C = c("alignContent", () => ({ type: String, default: null, validator: w })), m = { align: Object.keys(f), justify: Object.keys(v), alignContent: Object.keys(C) }, S = { align: "align", justify: "justify", alignContent: "align-content" };
function b(t2, n2, e2) {
  let l2 = S[t2];
  if (null != e2) {
    if (n2) {
      l2 += `-${n2.replace(t2, "")}`;
    }
    return l2 += `-${e2}`, l2.toLowerCase();
  }
}
const h = wn({ dense: Boolean, noGutters: Boolean, align: { type: String, default: null, validator: d }, ...f, justify: { type: String, default: null, validator: p }, ...v, alignContent: { type: String, default: null, validator: w }, ...C, ..._n(), ...vo() }, "VRow"), $ = $n()({ name: "VRow", props: h(), setup(t2, n2) {
  let { slots: e2 } = n2;
  const l2 = computed(() => {
    const n3 = [];
    let e3;
    for (e3 in m)
      m[e3].forEach((l3) => {
        const a2 = t2[l3], s2 = b(e3, l3, a2);
        s2 && n3.push(s2);
      });
    return n3.push({ "v-row--no-gutters": t2.noGutters, "v-row--dense": t2.dense, [`align-${t2.align}`]: t2.align, [`justify-${t2.justify}`]: t2.justify, [`align-content-${t2.alignContent}`]: t2.alignContent }), n3;
  });
  return () => {
    var n3;
    return h$1(t2.tag, { class: ["v-row", l2.value, t2.class], style: t2.style }, null == (n3 = e2.default) ? void 0 : n3.call(e2));
  };
} });

export { $ };
//# sourceMappingURL=VRow-Ca2v9sIW.mjs.map
