import { ar as hl, p as wn, y as _n, A as vo, o as $n } from './server.mjs';
import { capitalize, computed, h } from 'vue';

const u = hl.reduce((e2, t2) => (e2[t2] = { type: [Boolean, String, Number], default: false }, e2), {}), c = hl.reduce((e2, t2) => (e2["offset" + capitalize(t2)] = { type: [String, Number], default: null }, e2), {}), f = hl.reduce((e2, t2) => (e2["order" + capitalize(t2)] = { type: [String, Number], default: null }, e2), {}), i = { col: Object.keys(u), offset: Object.keys(c), order: Object.keys(f) };
function d(e2, t2, l2) {
  let r2 = e2;
  if (null != l2 && false !== l2) {
    if (t2) {
      r2 += `-${t2.replace(e2, "")}`;
    }
    return "col" === e2 && (r2 = "v-" + r2), "col" !== e2 || "" !== l2 && true !== l2 ? (r2 += `-${l2}`, r2.toLowerCase()) : r2.toLowerCase();
  }
}
const p = ["auto", "start", "end", "center", "baseline", "stretch"], m = wn({ cols: { type: [Boolean, String, Number], default: false }, ...u, offset: { type: [String, Number], default: null }, ...c, order: { type: [String, Number], default: null }, ...f, alignSelf: { type: String, default: null, validator: (e2) => p.includes(e2) }, ..._n(), ...vo() }, "VCol"), y = $n()({ name: "VCol", props: m(), setup(e2, t2) {
  let { slots: l2 } = t2;
  const r2 = computed(() => {
    const t3 = [];
    let l3;
    for (l3 in i)
      i[l3].forEach((r4) => {
        const o2 = e2[r4], s2 = d(l3, r4, o2);
        s2 && t3.push(s2);
      });
    const r3 = t3.some((e3) => e3.startsWith("v-col-"));
    return t3.push({ "v-col": !r3 || !e2.cols, [`v-col-${e2.cols}`]: e2.cols, [`offset-${e2.offset}`]: e2.offset, [`order-${e2.order}`]: e2.order, [`align-self-${e2.alignSelf}`]: e2.alignSelf }), t3;
  });
  return () => {
    var t3;
    return h(e2.tag, { class: [r2.value, e2.class], style: e2.style }, null == (t3 = l2.default) ? void 0 : t3.call(l2));
  };
} });

export { y };
//# sourceMappingURL=VCol-CrrHdFZ4.mjs.map
