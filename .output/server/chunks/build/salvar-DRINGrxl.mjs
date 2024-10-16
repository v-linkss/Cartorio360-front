import { ref, shallowRef, computed, watch, nextTick, createVNode, mergeProps, Fragment, createTextVNode } from 'vue';
import { p as propsFactory, m as makeFilterProps, l as makeSelectProps, o as omit, q as makeVTextFieldProps, s as makeTransitionProps$1, t as genericComponent, v as useLocale, w as useProxiedModel, x as useItems, y as useTextColor, P as wrapInArray, z as useForm, A as useFilter, B as useScrolling, C as useRender, V as VTextField, E as VMenu, F as VList, G as VListItem, H as VVirtualScroll, I as VCheckboxBtn, J as VAvatar, K as VIcon, L as ensureValidVNode, M as VChip, N as VDefaultsProvider, O as noop, D as forwardRefs, Q as matchesSelector } from './server.mjs';

function highlightResult(text, matches, length) {
  if (matches == null)
    return text;
  if (Array.isArray(matches))
    throw new Error("Multiple matches is not implemented");
  return typeof matches === "number" && ~matches ? createVNode(Fragment, null, [createVNode("span", {
    "class": "v-autocomplete__unmask"
  }, [text.substr(0, matches)]), createVNode("span", {
    "class": "v-autocomplete__mask"
  }, [text.substr(matches, length)]), createVNode("span", {
    "class": "v-autocomplete__unmask"
  }, [text.substr(matches + length)])]) : text;
}
const makeVAutocompleteProps = propsFactory({
  autoSelectFirst: {
    type: [Boolean, String]
  },
  clearOnSelect: Boolean,
  search: String,
  ...makeFilterProps({
    filterKeys: ["title"]
  }),
  ...makeSelectProps(),
  ...omit(makeVTextFieldProps({
    modelValue: null,
    role: "combobox"
  }), ["validationValue", "dirty", "appendInnerIcon"]),
  ...makeTransitionProps$1({
    transition: false
  })
}, "VAutocomplete");
const VAutocomplete = genericComponent()({
  name: "VAutocomplete",
  props: makeVAutocompleteProps(),
  emits: {
    "update:focused": (focused) => true,
    "update:search": (value) => true,
    "update:modelValue": (value) => true,
    "update:menu": (value) => true
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      t
    } = useLocale();
    const vTextFieldRef = ref();
    const isFocused = shallowRef(false);
    const isPristine = shallowRef(true);
    const listHasFocus = shallowRef(false);
    const vMenuRef = ref();
    const vVirtualScrollRef = ref();
    const _menu = useProxiedModel(props, "menu");
    const menu = computed({
      get: () => _menu.value,
      set: (v) => {
        var _a;
        if (_menu.value && !v && ((_a = vMenuRef.value) == null ? void 0 : _a.\u03A8openChildren))
          return;
        _menu.value = v;
      }
    });
    const selectionIndex = shallowRef(-1);
    const color = computed(() => {
      var _a;
      return (_a = vTextFieldRef.value) == null ? void 0 : _a.color;
    });
    const label = computed(() => menu.value ? props.closeText : props.openText);
    const {
      items,
      transformIn,
      transformOut
    } = useItems(props);
    const {
      textColorClasses,
      textColorStyles
    } = useTextColor(color);
    const search = useProxiedModel(props, "search", "");
    const model = useProxiedModel(props, "modelValue", [], (v) => transformIn(v === null ? [null] : wrapInArray(v)), (v) => {
      var _a;
      const transformed = transformOut(v);
      return props.multiple ? transformed : (_a = transformed[0]) != null ? _a : null;
    });
    const counterValue = computed(() => {
      return typeof props.counterValue === "function" ? props.counterValue(model.value) : typeof props.counterValue === "number" ? props.counterValue : model.value.length;
    });
    const form = useForm();
    const {
      filteredItems,
      getMatches
    } = useFilter(props, items, () => isPristine.value ? "" : search.value);
    const displayItems = computed(() => {
      if (props.hideSelected) {
        return filteredItems.value.filter((filteredItem) => !model.value.some((s) => s.value === filteredItem.value));
      }
      return filteredItems.value;
    });
    const hasChips = computed(() => !!(props.chips || slots.chip));
    const hasSelectionSlot = computed(() => hasChips.value || !!slots.selection);
    const selectedValues = computed(() => model.value.map((selection) => selection.props.value));
    const highlightFirst = computed(() => {
      var _a;
      const selectFirst = props.autoSelectFirst === true || props.autoSelectFirst === "exact" && search.value === ((_a = displayItems.value[0]) == null ? void 0 : _a.title);
      return selectFirst && displayItems.value.length > 0 && !isPristine.value && !listHasFocus.value;
    });
    const menuDisabled = computed(() => props.hideNoData && !displayItems.value.length || props.readonly || (form == null ? void 0 : form.isReadonly.value));
    const listRef = ref();
    const {
      onListScroll,
      onListKeydown
    } = useScrolling(listRef, vTextFieldRef);
    function onClear(e) {
      if (props.openOnClear) {
        menu.value = true;
      }
      search.value = "";
    }
    function onMousedownControl() {
      if (menuDisabled.value)
        return;
      menu.value = true;
    }
    function onMousedownMenuIcon(e) {
      if (menuDisabled.value)
        return;
      if (isFocused.value) {
        e.preventDefault();
        e.stopPropagation();
      }
      menu.value = !menu.value;
    }
    function onKeydown(e) {
      var _a, _b, _c;
      if (props.readonly || (form == null ? void 0 : form.isReadonly.value))
        return;
      const selectionStart = vTextFieldRef.value.selectionStart;
      const length = model.value.length;
      if (selectionIndex.value > -1 || ["Enter", "ArrowDown", "ArrowUp"].includes(e.key)) {
        e.preventDefault();
      }
      if (["Enter", "ArrowDown"].includes(e.key)) {
        menu.value = true;
      }
      if (["Escape"].includes(e.key)) {
        menu.value = false;
      }
      if (highlightFirst.value && ["Enter", "Tab"].includes(e.key) && !model.value.some((_ref2) => {
        let {
          value
        } = _ref2;
        return value === displayItems.value[0].value;
      })) {
        select(displayItems.value[0]);
      }
      if (e.key === "ArrowDown" && highlightFirst.value) {
        (_a = listRef.value) == null ? void 0 : _a.focus("next");
      }
      if (["Backspace", "Delete"].includes(e.key)) {
        if (!props.multiple && hasSelectionSlot.value && model.value.length > 0 && !search.value)
          return select(model.value[0], false);
        if (~selectionIndex.value) {
          const originalSelectionIndex = selectionIndex.value;
          select(model.value[selectionIndex.value], false);
          selectionIndex.value = originalSelectionIndex >= length - 1 ? length - 2 : originalSelectionIndex;
        } else if (e.key === "Backspace" && !search.value) {
          selectionIndex.value = length - 1;
        }
      }
      if (!props.multiple)
        return;
      if (e.key === "ArrowLeft") {
        if (selectionIndex.value < 0 && selectionStart > 0)
          return;
        const prev = selectionIndex.value > -1 ? selectionIndex.value - 1 : length - 1;
        if (model.value[prev]) {
          selectionIndex.value = prev;
        } else {
          selectionIndex.value = -1;
          vTextFieldRef.value.setSelectionRange((_b = search.value) == null ? void 0 : _b.length, (_c = search.value) == null ? void 0 : _c.length);
        }
      }
      if (e.key === "ArrowRight") {
        if (selectionIndex.value < 0)
          return;
        const next = selectionIndex.value + 1;
        if (model.value[next]) {
          selectionIndex.value = next;
        } else {
          selectionIndex.value = -1;
          vTextFieldRef.value.setSelectionRange(0, 0);
        }
      }
    }
    function onChange(e) {
      if (matchesSelector(vTextFieldRef.value) || matchesSelector(vTextFieldRef.value)) ;
    }
    function onAfterLeave() {
      var _a;
      if (isFocused.value) {
        isPristine.value = true;
        (_a = vTextFieldRef.value) == null ? void 0 : _a.focus();
      }
    }
    function onFocusin(e) {
      isFocused.value = true;
      setTimeout(() => {
        listHasFocus.value = true;
      });
    }
    function onFocusout(e) {
      listHasFocus.value = false;
    }
    function onUpdateModelValue(v) {
      if (v == null || v === "" && !props.multiple && !hasSelectionSlot.value)
        model.value = [];
    }
    const isSelecting = shallowRef(false);
    function select(item) {
      let set = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
      if (!item || item.props.disabled)
        return;
      if (props.multiple) {
        const index = model.value.findIndex((selection) => props.valueComparator(selection.value, item.value));
        const add = set == null ? !~index : set;
        if (~index) {
          const value = add ? [...model.value, item] : [...model.value];
          value.splice(index, 1);
          model.value = value;
        } else if (add) {
          model.value = [...model.value, item];
        }
        if (props.clearOnSelect) {
          search.value = "";
        }
      } else {
        const add = set !== false;
        model.value = add ? [item] : [];
        search.value = add && !hasSelectionSlot.value ? item.title : "";
        nextTick(() => {
          menu.value = false;
          isPristine.value = true;
        });
      }
    }
    watch(isFocused, (val, oldVal) => {
      var _a2;
      var _a;
      if (val === oldVal)
        return;
      if (val) {
        isSelecting.value = true;
        search.value = props.multiple || hasSelectionSlot.value ? "" : String((_a2 = (_a = model.value.at(-1)) == null ? void 0 : _a.props.title) != null ? _a2 : "");
        isPristine.value = true;
        nextTick(() => isSelecting.value = false);
      } else {
        if (!props.multiple && search.value == null)
          model.value = [];
        menu.value = false;
        if (!model.value.some((_ref3) => {
          let {
            title
          } = _ref3;
          return title === search.value;
        }))
          search.value = "";
        selectionIndex.value = -1;
      }
    });
    watch(search, (val) => {
      if (!isFocused.value || isSelecting.value)
        return;
      if (val)
        menu.value = true;
      isPristine.value = !val;
    });
    watch(menu, () => {
      if (!props.hideSelected && menu.value && model.value.length) {
        displayItems.value.findIndex((item) => model.value.some((s) => item.value === s.value));
      }
    });
    watch(() => props.items, (newVal, oldVal) => {
      if (menu.value)
        return;
      if (isFocused.value && !oldVal.length && newVal.length) {
        menu.value = true;
      }
    });
    useRender(() => {
      const hasList = !!(!props.hideNoData || displayItems.value.length || slots["prepend-item"] || slots["append-item"] || slots["no-data"]);
      const isDirty = model.value.length > 0;
      const textFieldProps = VTextField.filterProps(props);
      return createVNode(VTextField, mergeProps({
        "ref": vTextFieldRef
      }, textFieldProps, {
        "modelValue": search.value,
        "onUpdate:modelValue": [($event) => search.value = $event, onUpdateModelValue],
        "focused": isFocused.value,
        "onUpdate:focused": ($event) => isFocused.value = $event,
        "validationValue": model.externalValue,
        "counterValue": counterValue.value,
        "dirty": isDirty,
        "onChange": onChange,
        "class": ["v-autocomplete", `v-autocomplete--${props.multiple ? "multiple" : "single"}`, {
          "v-autocomplete--active-menu": menu.value,
          "v-autocomplete--chips": !!props.chips,
          "v-autocomplete--selection-slot": !!hasSelectionSlot.value,
          "v-autocomplete--selecting-index": selectionIndex.value > -1
        }, props.class],
        "style": props.style,
        "readonly": props.readonly,
        "placeholder": isDirty ? void 0 : props.placeholder,
        "onClick:clear": onClear,
        "onMousedown:control": onMousedownControl,
        "onKeydown": onKeydown
      }), {
        ...slots,
        default: () => createVNode(Fragment, null, [createVNode(VMenu, mergeProps({
          "ref": vMenuRef,
          "modelValue": menu.value,
          "onUpdate:modelValue": ($event) => menu.value = $event,
          "activator": "parent",
          "contentClass": "v-autocomplete__content",
          "disabled": menuDisabled.value,
          "eager": props.eager,
          "maxHeight": 310,
          "openOnClick": false,
          "closeOnContentClick": false,
          "transition": props.transition,
          "onAfterLeave": onAfterLeave
        }, props.menuProps), {
          default: () => {
            var _a;
            return [hasList && createVNode(VList, mergeProps({
              "ref": listRef,
              "selected": selectedValues.value,
              "selectStrategy": props.multiple ? "independent" : "single-independent",
              "onMousedown": (e) => e.preventDefault(),
              "onKeydown": onListKeydown,
              "onFocusin": onFocusin,
              "onFocusout": onFocusout,
              "onScrollPassive": onListScroll,
              "tabindex": "-1",
              "aria-live": "polite",
              "color": (_a = props.itemColor) != null ? _a : props.color
            }, props.listProps), {
              default: () => {
                var _a3;
                var _a2, _b, _c;
                return [(_a2 = slots["prepend-item"]) == null ? void 0 : _a2.call(slots), !displayItems.value.length && !props.hideNoData && ((_a3 = (_b = slots["no-data"]) == null ? void 0 : _b.call(slots)) != null ? _a3 : createVNode(VListItem, {
                  "title": t(props.noDataText)
                }, null)), createVNode(VVirtualScroll, {
                  "ref": vVirtualScrollRef,
                  "renderless": true,
                  "items": displayItems.value
                }, {
                  default: (_ref4) => {
                    var _a4;
                    var _a22;
                    let {
                      item,
                      index,
                      itemRef
                    } = _ref4;
                    const itemProps = mergeProps(item.props, {
                      ref: itemRef,
                      key: index,
                      active: highlightFirst.value && index === 0 ? true : void 0,
                      onClick: () => select(item, null)
                    });
                    return (_a4 = (_a22 = slots.item) == null ? void 0 : _a22.call(slots, {
                      item,
                      index,
                      props: itemProps
                    })) != null ? _a4 : createVNode(VListItem, mergeProps(itemProps, {
                      "role": "option"
                    }), {
                      prepend: (_ref5) => {
                        let {
                          isSelected
                        } = _ref5;
                        return createVNode(Fragment, null, [props.multiple && !props.hideSelected ? createVNode(VCheckboxBtn, {
                          "key": item.value,
                          "modelValue": isSelected,
                          "ripple": false,
                          "tabindex": "-1"
                        }, null) : void 0, item.props.prependAvatar && createVNode(VAvatar, {
                          "image": item.props.prependAvatar
                        }, null), item.props.prependIcon && createVNode(VIcon, {
                          "icon": item.props.prependIcon
                        }, null)]);
                      },
                      title: () => {
                        var _a5;
                        var _a32, _b2;
                        return isPristine.value ? item.title : highlightResult(item.title, (_a32 = getMatches(item)) == null ? void 0 : _a32.title, (_a5 = (_b2 = search.value) == null ? void 0 : _b2.length) != null ? _a5 : 0);
                      }
                    });
                  }
                }), (_c = slots["append-item"]) == null ? void 0 : _c.call(slots)];
              }
            })];
          }
        }), model.value.map((item, index) => {
          function onChipClose(e) {
            e.stopPropagation();
            e.preventDefault();
            select(item, false);
          }
          const slotProps = {
            "onClick:close": onChipClose,
            onKeydown(e) {
              if (e.key !== "Enter" && e.key !== " ")
                return;
              e.preventDefault();
              e.stopPropagation();
              onChipClose(e);
            },
            onMousedown(e) {
              e.preventDefault();
              e.stopPropagation();
            },
            modelValue: true,
            "onUpdate:modelValue": void 0
          };
          const hasSlot = hasChips.value ? !!slots.chip : !!slots.selection;
          const slotContent = hasSlot ? ensureValidVNode(hasChips.value ? slots.chip({
            item,
            index,
            props: slotProps
          }) : slots.selection({
            item,
            index
          })) : void 0;
          if (hasSlot && !slotContent)
            return void 0;
          return createVNode("div", {
            "key": item.value,
            "class": ["v-autocomplete__selection", index === selectionIndex.value && ["v-autocomplete__selection--selected", textColorClasses.value]],
            "style": index === selectionIndex.value ? textColorStyles.value : {}
          }, [hasChips.value ? !slots.chip ? createVNode(VChip, mergeProps({
            "key": "chip",
            "closable": props.closableChips,
            "size": "small",
            "text": item.title,
            "disabled": item.props.disabled
          }, slotProps), null) : createVNode(VDefaultsProvider, {
            "key": "chip-defaults",
            "defaults": {
              VChip: {
                closable: props.closableChips,
                size: "small",
                text: item.title
              }
            }
          }, {
            default: () => [slotContent]
          }) : slotContent != null ? slotContent : createVNode("span", {
            "class": "v-autocomplete__selection-text"
          }, [item.title, props.multiple && index < model.value.length - 1 && createVNode("span", {
            "class": "v-autocomplete__selection-comma"
          }, [createTextVNode(",")])])]);
        })]),
        "append-inner": function() {
          var _a;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          return createVNode(Fragment, null, [(_a = slots["append-inner"]) == null ? void 0 : _a.call(slots, ...args), props.menuIcon ? createVNode(VIcon, {
            "class": "v-autocomplete__menu-icon",
            "icon": props.menuIcon,
            "onMousedown": onMousedownMenuIcon,
            "onClick": noop,
            "aria-label": t(label.value),
            "title": t(label.value),
            "tabindex": "-1"
          }, null) : void 0]);
        }
      });
    });
    return forwardRefs({
      isFocused,
      isPristine,
      menu,
      search,
      filteredItems,
      select
    }, vTextFieldRef);
  }
});
const _imports_1 = "data:image/png;base64,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";

export { VAutocomplete as V, _imports_1 as _ };
//# sourceMappingURL=salvar-DRINGrxl.mjs.map
