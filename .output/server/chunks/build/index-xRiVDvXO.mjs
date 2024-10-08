import { ref, watchEffect, watch, getCurrentInstance } from 'vue';
import { i as it, r as lt } from './server.mjs';

function n(a2, n2 = {}) {
  const i = n2.head || it();
  if (i)
    return i.ssr ? i.push(a2, n2) : function(t2, a3, n3 = {}) {
      const i2 = ref(false), m = ref({});
      watchEffect(() => {
        m.value = i2.value ? {} : lt(a3);
      });
      const p = t2.push(m.value, n3);
      return watch(m, (r2) => {
        p.patch(r2);
      }), getCurrentInstance(), p;
    }(i, a2, n2);
}

export { n };
//# sourceMappingURL=index-xRiVDvXO.mjs.map
