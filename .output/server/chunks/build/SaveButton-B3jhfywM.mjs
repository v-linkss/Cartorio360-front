import { useSSRContext, ref, mergeProps, unref, withCtx, createVNode, renderSlot, createTextVNode, toDisplayString } from 'vue';
import { ssrRenderComponent, ssrRenderSlot, ssrInterpolate } from 'vue/server-renderer';
import { V as VBtn, b9 as VProgressCircular } from './server.mjs';

const _sfc_main = {
  __name: "SaveButton",
  __ssrInlineRender: true,
  props: {
    onSave: {
      type: Function,
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    text: {
      type: String,
      default: "Salvar"
    }
  },
  setup(__props) {
    const props = __props;
    const loading = ref(false);
    async function handleClick() {
      if (loading.value) return;
      loading.value = true;
      try {
        await props.onSave();
      } finally {
        loading.value = false;
      }
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(VBtn, mergeProps({
        loading: unref(loading),
        disabled: unref(loading) || __props.disabled,
        color: "green",
        onClick: handleClick,
        size: "large"
      }, _attrs), {
        loader: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VProgressCircular, {
              indeterminate: "",
              color: "white",
              size: "24"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(VProgressCircular, {
                indeterminate: "",
                color: "white",
                size: "24"
              })
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "default", {}, () => {
              _push2(`${ssrInterpolate(__props.text)}`);
            }, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "default", {}, () => [
                createTextVNode(toDisplayString(__props.text), 1)
              ])
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/SaveButton.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : undefined;
};

export { _sfc_main as _ };
//# sourceMappingURL=SaveButton-B3jhfywM.mjs.map
