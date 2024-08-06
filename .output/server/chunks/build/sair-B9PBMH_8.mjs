import { p as propsFactory, m as makeComponentProps, h as makeTagProps, j as genericComponent, k as breakpoints } from './server.mjs';
import { computed, h, capitalize } from 'vue';

const ALIGNMENT = ["start", "end", "center"];
const SPACE = ["space-between", "space-around", "space-evenly"];
function makeRowProps(prefix, def) {
  return breakpoints.reduce((props, val) => {
    const prefixKey = prefix + capitalize(val);
    props[prefixKey] = def();
    return props;
  }, {});
}
const ALIGN_VALUES = [...ALIGNMENT, "baseline", "stretch"];
const alignValidator = (str) => ALIGN_VALUES.includes(str);
const alignProps = makeRowProps("align", () => ({
  type: String,
  default: null,
  validator: alignValidator
}));
const JUSTIFY_VALUES = [...ALIGNMENT, ...SPACE];
const justifyValidator = (str) => JUSTIFY_VALUES.includes(str);
const justifyProps = makeRowProps("justify", () => ({
  type: String,
  default: null,
  validator: justifyValidator
}));
const ALIGN_CONTENT_VALUES = [...ALIGNMENT, ...SPACE, "stretch"];
const alignContentValidator = (str) => ALIGN_CONTENT_VALUES.includes(str);
const alignContentProps = makeRowProps("alignContent", () => ({
  type: String,
  default: null,
  validator: alignContentValidator
}));
const propMap = {
  align: Object.keys(alignProps),
  justify: Object.keys(justifyProps),
  alignContent: Object.keys(alignContentProps)
};
const classMap = {
  align: "align",
  justify: "justify",
  alignContent: "align-content"
};
function breakpointClass(type, prop, val) {
  let className = classMap[type];
  if (val == null) {
    return void 0;
  }
  if (prop) {
    const breakpoint = prop.replace(type, "");
    className += `-${breakpoint}`;
  }
  className += `-${val}`;
  return className.toLowerCase();
}
const makeVRowProps = propsFactory({
  dense: Boolean,
  noGutters: Boolean,
  align: {
    type: String,
    default: null,
    validator: alignValidator
  },
  ...alignProps,
  justify: {
    type: String,
    default: null,
    validator: justifyValidator
  },
  ...justifyProps,
  alignContent: {
    type: String,
    default: null,
    validator: alignContentValidator
  },
  ...alignContentProps,
  ...makeComponentProps(),
  ...makeTagProps()
}, "VRow");
const VRow = genericComponent()({
  name: "VRow",
  props: makeVRowProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const classes = computed(() => {
      const classList = [];
      let type;
      for (type in propMap) {
        propMap[type].forEach((prop) => {
          const value = props[prop];
          const className = breakpointClass(type, prop, value);
          if (className)
            classList.push(className);
        });
      }
      classList.push({
        "v-row--no-gutters": props.noGutters,
        "v-row--dense": props.dense,
        [`align-${props.align}`]: props.align,
        [`justify-${props.justify}`]: props.justify,
        [`align-content-${props.alignContent}`]: props.alignContent
      });
      return classList;
    });
    return () => {
      var _a;
      return h(props.tag, {
        class: ["v-row", classes.value, props.class],
        style: props.style
      }, (_a = slots.default) == null ? void 0 : _a.call(slots));
    };
  }
});
const _imports_0 = "data:image/png;base64,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";

export { VRow as V, _imports_0 as _ };
//# sourceMappingURL=sair-B9PBMH_8.mjs.map
