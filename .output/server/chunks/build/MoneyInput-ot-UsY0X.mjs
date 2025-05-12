import { Money3Directive } from 'v-money3';
import { useSSRContext, resolveDirective, mergeProps } from 'vue';
import { ssrRenderAttrs, ssrGetDirectiveProps, ssrGetDynamicModelProps } from 'vue/server-renderer';
import { _ as _export_sfc } from './server.mjs';

const _sfc_main = {
  name: "MoneyInput",
  props: {
    modelValue: {
      type: String,
      default: "0.00"
    }
  },
  data() {
    return {
      amount: this.modelValue,
      config: {
        thousands: ",",
        decimal: ".",
        precision: 2
      }
    };
  },
  directives: { money3: Money3Directive },
  watch: {
    amount(val) {
      this.$emit("update:modelValue", val);
    },
    modelValue(val) {
      this.amount = val;
    }
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _directive_money3 = resolveDirective("money3");
  let _temp0;
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "input-wrapper" }, _attrs))}><input${ssrRenderAttrs((_temp0 = mergeProps({
    id: "valor",
    style: { "border-bottom": "1px solid black", "background-color": "#f5f3f2", "padding": "7px 0px 7px 7px" },
    value: $data.amount
  }, ssrGetDirectiveProps(_ctx, _directive_money3, $data.config)), mergeProps(_temp0, ssrGetDynamicModelProps(_temp0, $data.amount))))}></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/MoneyInput.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : undefined;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { __nuxt_component_0 as _ };
//# sourceMappingURL=MoneyInput-ot-UsY0X.mjs.map
