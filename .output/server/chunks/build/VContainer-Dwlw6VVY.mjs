import { createVNode } from 'vue';
import { p as wn, y as _n, A as vo, o as $n, a5 as al, t as zn } from './server.mjs';

const n = wn({ fluid: { type: Boolean, default: false }, ..._n(), ...vo() }, "VContainer"), i = $n()({ name: "VContainer", props: n(), setup(a2, t2) {
  let { slots: e2 } = t2;
  const { rtlClasses: o2 } = al();
  return zn(() => createVNode(a2.tag, { class: ["v-container", { "v-container--fluid": a2.fluid }, o2.value, a2.class], style: a2.style }, e2)), {};
} });

export { i };
//# sourceMappingURL=VContainer-Dwlw6VVY.mjs.map
