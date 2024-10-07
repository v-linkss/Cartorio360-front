import { useSSRContext } from 'vue';
import { _ as jc } from './server.mjs';
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
import 'vue/server-renderer';
import '@unhead/ssr';
import 'unhead';
import '@unhead/shared';
import 'vue-router';
import 'vue3-toastify';
import 'vue-the-mask';

const r = {};
const e = r.setup;
r.setup = (t2, r2) => {
  const i2 = useSSRContext();
  return (i2.modules || (i2.modules = /* @__PURE__ */ new Set())).add("pages/index.vue"), e ? e(t2, r2) : void 0;
};
const i = jc(r, [["ssrRender", function(o2, t2, r2, e2) {
}]]);

export { i as default };
//# sourceMappingURL=index-CK8uBa1B.mjs.map
