import { a as buildAssetsURL } from '../routes/renderer.mjs';
import { shallowRef, computed, toRef, createVNode, mergeProps, Fragment, createTextVNode, withModifiers, toDisplayString, ref, nextTick, watchEffect, provide, inject, watch, capitalize } from 'vue';
import { k as propsFactory, I as IconValue, v as makeBorderProps, m as makeComponentProps, q as makeDensityProps, x as makeElevationProps, B as makeRoundedProps, am as makeSizeProps, l as makeTagProps, D as makeThemeProps, E as makeVariantProps, h as genericComponent, X as useProxiedModel, a4 as useLocale, a0 as useRtl, F as provideTheme, au as useDisplay, p as provideDefaults, aw as useResizeObserver, aQ as createRange, j as useRender, g as VBtn, b3 as defineFunctionalComponent, ak as convertToUnit, as as makeDisplayProps, y as makeLoaderProps, M as useLoader, ai as useBackgroundColor, S as LoaderSlot, aA as EventProp, b6 as getObjectValueByPath, J as useDensity, b2 as isOn, aS as keyValues, aj as getCurrentInstance, ao as deepEqual, aa as wrapInArray, b5 as isEmpty, s as VIcon, aE as clamp, aH as getPropertyFromItem, b4 as consoleError } from './server.mjs';
import { V as VSelect, f as VCheckboxBtn, b as makeFilterProps, u as useFilter, g as VChip } from './filter-CDw0eX0n.mjs';
import { c as VDivider } from './VList-DxPVpBFj.mjs';

function getPrefixedEventHandlers(attrs, suffix, getData) {
  return Object.keys(attrs).filter((key) => isOn(key) && key.endsWith(suffix)).reduce((acc, key) => {
    acc[key.slice(0, -suffix.length)] = (event) => attrs[key](event, getData(event));
    return acc;
  }, {});
}
const _imports_0 = "data:image/png;base64,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";
const _imports_1 = "" + buildAssetsURL("editar.DtDFP9oF.png");
const _imports_2 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAHCAAABwgHoPH1UAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAABOFJREFUeJztm1tsFFUYx3/fmYFeDCBQt5S2gQq2EGPig0Q0tknFJiYKwQceeJEmxktCYiQaEy8vkogxIcZLohhCgCcTH5QYjBESiQpGGh+NaVV0e5HStdBQBBaZ2c+H3dkdENKend0OlPm97Mw55/vOf/47Z85s9hzhKoZIrTBor2I6QduBhUDt1e1uErLABMivgn7nI/uWMfZHuIEEB3+yvNblwnvAU4Azw0JnCl9ht0/9tjbSWSgYMExLHfz7DbA2VnkzhMKxDJnu++BywYDUx8AzoTYeyCHQPoExkFw8UqOiRqERuB/oAdxSnXzQytjzMkRqhcAAxdte+g3+xmbGB2ZecPX4i4aOHM4B0FWFIs9H2o1BeymNeW82XjxAM+MDDt4TgF8och201+Sf9gFyaDZefMBSTvcDh0sl2ukWprqg4HilOuunYd5tmNcVOsrNYcBTOJFl/pt38ftkhaT9CDyaP5QOl/w8D4DC3xXqhFrMc8DLMmXL66OFzzrOnQV2RFcFCpmQpkWGK15y9FIlOgFw4I5K5So8ySuVLXyNte5121UUOSL4X9hEKM4G0O5qKQqYIQP4uYXxd20Chmm8E6i6AabaHdzolHUH/MbK+bVMviZIF+iSa7VRuD109uQIqfU2fSi6MHS2ZYTUhmu3lFMK32aZt6OcmcLaAIU5w0weBDq1+JyekgUKC2z7ml68LgfW1jL5gMI6Ac8msfUQGKFpvUDn1C1nnK5Rlj5uG1TGHeDfHcyjghz28N+yzVFJXJxXFO0B8PDuAQ7YxVtikLnBrZ9DR5czfsQ2RyUZItUbfCEGmWsbH2kaFKQuzYK2KDmiIkgd038W/Y+I7wG6yaFmU7QcUSn/4iF5D0gMKGMWmLMjx7l3AAw1bwNPF6p25rhUkV9sU2GoeRV4Ka+H/cqlbfnyeVnbXNYGtDJyEbgIMETKL/20FG8ZZyds85XDMI1eMPYdxG8u9nvWOlcyBKqZfJDG9Q6sBBC0r5nMsaAuTUO3i3MvgEF/WUrm66DuBEvW1KAPAShmsJXRz6qlsaoGGNis6GYAhTeAogEu5jFFXwTwkd1A0YA55LoUdubPcgeBqhlwyw+BxIC4BcRNYkDcAuImMSBuAXGTGBC3gLhJDIhbQNwkBsQtIG4SA+IWEDeJAXELiJvEgLgFxE1iQNwC4iYxIG4BcVPV/wUEnQAZBMih/4TrFCalVHfFf1oGzgdxoGeqqbGqBrSQ2QpsvVZdK5ntwPbrxO0CdlVRWpFkCEQJNnChtD5D14zQ8EJkRdNA0TXBcQ7OR8kVyYAc7k9SWpa3TjHrouQrD9MXKZr81rICUmMT3MrJT0G+jCIgIl+1MPqJXYiEtwBmXWACaAIQyyXuAr4ytnGExi2Qe1CRxXZiykPQ02B+aGFsv5S2wEwzllTo9IwLOgDSVCiw3jaXX5o6tgfYYxsbE+Fr7DcCR0MFPSdZvOrqiNlCmqbVwCOhoqPGx+wltJPKxzkwG01I07Tawf+c0A45D7NXAIZI7RJ4NtTeJ7+76rhCxiBWK7BvFHKoWxjza8l/88UtwQIftpDZKlDcN3yEW2TrrMDRy9T3tJHOGoA20lmP+m6Bj7Bcb3+T4YG8f4rMw1dsng6TprHNQXtBu0DagUXc3NvnzwD9wPceZl8bp9LhBv8B7XNZmfqBOzYAAAAASUVORK5CYII=";
const _imports_3 = "data:image/png;base64,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";
function useRefs() {
  const refs = ref([]);
  function updateRef(e, i) {
    refs.value[i] = e;
  }
  return {
    refs,
    updateRef
  };
}
const makeVPaginationProps = propsFactory({
  activeColor: String,
  start: {
    type: [Number, String],
    default: 1
  },
  modelValue: {
    type: Number,
    default: (props) => props.start
  },
  disabled: Boolean,
  length: {
    type: [Number, String],
    default: 1,
    validator: (val) => val % 1 === 0
  },
  totalVisible: [Number, String],
  firstIcon: {
    type: IconValue,
    default: "$first"
  },
  prevIcon: {
    type: IconValue,
    default: "$prev"
  },
  nextIcon: {
    type: IconValue,
    default: "$next"
  },
  lastIcon: {
    type: IconValue,
    default: "$last"
  },
  ariaLabel: {
    type: String,
    default: "$vuetify.pagination.ariaLabel.root"
  },
  pageAriaLabel: {
    type: String,
    default: "$vuetify.pagination.ariaLabel.page"
  },
  currentPageAriaLabel: {
    type: String,
    default: "$vuetify.pagination.ariaLabel.currentPage"
  },
  firstAriaLabel: {
    type: String,
    default: "$vuetify.pagination.ariaLabel.first"
  },
  previousAriaLabel: {
    type: String,
    default: "$vuetify.pagination.ariaLabel.previous"
  },
  nextAriaLabel: {
    type: String,
    default: "$vuetify.pagination.ariaLabel.next"
  },
  lastAriaLabel: {
    type: String,
    default: "$vuetify.pagination.ariaLabel.last"
  },
  ellipsis: {
    type: String,
    default: "..."
  },
  showFirstLastPage: Boolean,
  ...makeBorderProps(),
  ...makeComponentProps(),
  ...makeDensityProps(),
  ...makeElevationProps(),
  ...makeRoundedProps(),
  ...makeSizeProps(),
  ...makeTagProps({
    tag: "nav"
  }),
  ...makeThemeProps(),
  ...makeVariantProps({
    variant: "text"
  })
}, "VPagination");
const VPagination = genericComponent()({
  name: "VPagination",
  props: makeVPaginationProps(),
  emits: {
    "update:modelValue": (value) => true,
    first: (value) => true,
    prev: (value) => true,
    next: (value) => true,
    last: (value) => true
  },
  setup(props, _ref) {
    let {
      slots,
      emit
    } = _ref;
    const page = useProxiedModel(props, "modelValue");
    const {
      t,
      n
    } = useLocale();
    const {
      isRtl
    } = useRtl();
    const {
      themeClasses
    } = provideTheme(props);
    const {
      width
    } = useDisplay();
    const maxButtons = shallowRef(-1);
    provideDefaults(undefined, {
      scoped: true
    });
    const {
      resizeRef
    } = useResizeObserver();
    const length = computed(() => parseInt(props.length, 10));
    const start = computed(() => parseInt(props.start, 10));
    const totalVisible = computed(() => {
      if (props.totalVisible != null) return parseInt(props.totalVisible, 10);
      else if (maxButtons.value >= 0) return maxButtons.value;
      return getMax(width.value, 58);
    });
    function getMax(totalWidth, itemWidth) {
      const minButtons = props.showFirstLastPage ? 5 : 3;
      return Math.max(0, Math.floor(
        // Round to two decimal places to avoid floating point errors
        +((totalWidth - itemWidth * minButtons) / itemWidth).toFixed(2)
      ));
    }
    const range = computed(() => {
      if (length.value <= 0 || isNaN(length.value) || length.value > Number.MAX_SAFE_INTEGER) return [];
      if (totalVisible.value <= 0) return [];
      else if (totalVisible.value === 1) return [page.value];
      if (length.value <= totalVisible.value) {
        return createRange(length.value, start.value);
      }
      const even = totalVisible.value % 2 === 0;
      const middle = even ? totalVisible.value / 2 : Math.floor(totalVisible.value / 2);
      const left = even ? middle : middle + 1;
      const right = length.value - middle;
      if (left - page.value >= 0) {
        return [...createRange(Math.max(1, totalVisible.value - 1), start.value), props.ellipsis, length.value];
      } else if (page.value - right >= (even ? 1 : 0)) {
        const rangeLength = totalVisible.value - 1;
        const rangeStart = length.value - rangeLength + start.value;
        return [start.value, props.ellipsis, ...createRange(rangeLength, rangeStart)];
      } else {
        const rangeLength = Math.max(1, totalVisible.value - 3);
        const rangeStart = rangeLength === 1 ? page.value : page.value - Math.ceil(rangeLength / 2) + start.value;
        return [start.value, props.ellipsis, ...createRange(rangeLength, rangeStart), props.ellipsis, length.value];
      }
    });
    function setValue(e, value, event) {
      e.preventDefault();
      page.value = value;
      event && emit(event, value);
    }
    const {
      refs,
      updateRef
    } = useRefs();
    provideDefaults({
      VPaginationBtn: {
        color: toRef(props, "color"),
        border: toRef(props, "border"),
        density: toRef(props, "density"),
        size: toRef(props, "size"),
        variant: toRef(props, "variant"),
        rounded: toRef(props, "rounded"),
        elevation: toRef(props, "elevation")
      }
    });
    const items = computed(() => {
      return range.value.map((item, index) => {
        const ref2 = (e) => updateRef(e, index);
        if (typeof item === "string") {
          return {
            isActive: false,
            key: `ellipsis-${index}`,
            page: item,
            props: {
              ref: ref2,
              ellipsis: true,
              icon: true,
              disabled: true
            }
          };
        } else {
          const isActive = item === page.value;
          return {
            isActive,
            key: item,
            page: n(item),
            props: {
              ref: ref2,
              ellipsis: false,
              icon: true,
              disabled: !!props.disabled || +props.length < 2,
              color: isActive ? props.activeColor : props.color,
              "aria-current": isActive,
              "aria-label": t(isActive ? props.currentPageAriaLabel : props.pageAriaLabel, item),
              onClick: (e) => setValue(e, item)
            }
          };
        }
      });
    });
    const controls = computed(() => {
      const prevDisabled = !!props.disabled || page.value <= start.value;
      const nextDisabled = !!props.disabled || page.value >= start.value + length.value - 1;
      return {
        first: props.showFirstLastPage ? {
          icon: isRtl.value ? props.lastIcon : props.firstIcon,
          onClick: (e) => setValue(e, start.value, "first"),
          disabled: prevDisabled,
          "aria-label": t(props.firstAriaLabel),
          "aria-disabled": prevDisabled
        } : undefined,
        prev: {
          icon: isRtl.value ? props.nextIcon : props.prevIcon,
          onClick: (e) => setValue(e, page.value - 1, "prev"),
          disabled: prevDisabled,
          "aria-label": t(props.previousAriaLabel),
          "aria-disabled": prevDisabled
        },
        next: {
          icon: isRtl.value ? props.prevIcon : props.nextIcon,
          onClick: (e) => setValue(e, page.value + 1, "next"),
          disabled: nextDisabled,
          "aria-label": t(props.nextAriaLabel),
          "aria-disabled": nextDisabled
        },
        last: props.showFirstLastPage ? {
          icon: isRtl.value ? props.firstIcon : props.lastIcon,
          onClick: (e) => setValue(e, start.value + length.value - 1, "last"),
          disabled: nextDisabled,
          "aria-label": t(props.lastAriaLabel),
          "aria-disabled": nextDisabled
        } : undefined
      };
    });
    function updateFocus() {
      var _a;
      const currentIndex = page.value - start.value;
      (_a = refs.value[currentIndex]) == null ? undefined : _a.$el.focus();
    }
    function onKeydown(e) {
      if (e.key === keyValues.left && !props.disabled && page.value > +props.start) {
        page.value = page.value - 1;
        nextTick(updateFocus);
      } else if (e.key === keyValues.right && !props.disabled && page.value < start.value + length.value - 1) {
        page.value = page.value + 1;
        nextTick(updateFocus);
      }
    }
    useRender(() => createVNode(props.tag, {
      "ref": resizeRef,
      "class": ["v-pagination", themeClasses.value, props.class],
      "style": props.style,
      "role": "navigation",
      "aria-label": t(props.ariaLabel),
      "onKeydown": onKeydown,
      "data-test": "v-pagination-root"
    }, {
      default: () => [createVNode("ul", {
        "class": "v-pagination__list"
      }, [props.showFirstLastPage && createVNode("li", {
        "key": "first",
        "class": "v-pagination__first",
        "data-test": "v-pagination-first"
      }, [slots.first ? slots.first(controls.value.first) : createVNode(VBtn, mergeProps({
        "_as": "VPaginationBtn"
      }, controls.value.first), null)]), createVNode("li", {
        "key": "prev",
        "class": "v-pagination__prev",
        "data-test": "v-pagination-prev"
      }, [slots.prev ? slots.prev(controls.value.prev) : createVNode(VBtn, mergeProps({
        "_as": "VPaginationBtn"
      }, controls.value.prev), null)]), items.value.map((item, index) => createVNode("li", {
        "key": item.key,
        "class": ["v-pagination__item", {
          "v-pagination__item--is-active": item.isActive
        }],
        "data-test": "v-pagination-item"
      }, [slots.item ? slots.item(item) : createVNode(VBtn, mergeProps({
        "_as": "VPaginationBtn"
      }, item.props), {
        default: () => [item.page]
      })])), createVNode("li", {
        "key": "next",
        "class": "v-pagination__next",
        "data-test": "v-pagination-next"
      }, [slots.next ? slots.next(controls.value.next) : createVNode(VBtn, mergeProps({
        "_as": "VPaginationBtn"
      }, controls.value.next), null)]), props.showFirstLastPage && createVNode("li", {
        "key": "last",
        "class": "v-pagination__last",
        "data-test": "v-pagination-last"
      }, [slots.last ? slots.last(controls.value.last) : createVNode(VBtn, mergeProps({
        "_as": "VPaginationBtn"
      }, controls.value.last), null)])])]
    }));
    return {};
  }
});
const makeDataTablePaginateProps = propsFactory({
  page: {
    type: [Number, String],
    default: 1
  },
  itemsPerPage: {
    type: [Number, String],
    default: 10
  }
}, "DataTable-paginate");
const VDataTablePaginationSymbol = Symbol.for("vuetify:data-table-pagination");
function createPagination(props) {
  const page = useProxiedModel(props, "page", undefined, (value) => +(value != null ? value : 1));
  const itemsPerPage = useProxiedModel(props, "itemsPerPage", undefined, (value) => +(value != null ? value : 10));
  return {
    page,
    itemsPerPage
  };
}
function providePagination(options) {
  const {
    page,
    itemsPerPage,
    itemsLength
  } = options;
  const startIndex = computed(() => {
    if (itemsPerPage.value === -1) return 0;
    return itemsPerPage.value * (page.value - 1);
  });
  const stopIndex = computed(() => {
    if (itemsPerPage.value === -1) return itemsLength.value;
    return Math.min(itemsLength.value, startIndex.value + itemsPerPage.value);
  });
  const pageCount = computed(() => {
    if (itemsPerPage.value === -1 || itemsLength.value === 0) return 1;
    return Math.ceil(itemsLength.value / itemsPerPage.value);
  });
  watchEffect(() => {
    if (page.value > pageCount.value) {
      page.value = pageCount.value;
    }
  });
  function setItemsPerPage(value) {
    itemsPerPage.value = value;
    page.value = 1;
  }
  function nextPage() {
    page.value = clamp(page.value + 1, 1, pageCount.value);
  }
  function prevPage() {
    page.value = clamp(page.value - 1, 1, pageCount.value);
  }
  function setPage(value) {
    page.value = clamp(value, 1, pageCount.value);
  }
  const data = {
    page,
    itemsPerPage,
    startIndex,
    stopIndex,
    pageCount,
    itemsLength,
    nextPage,
    prevPage,
    setPage,
    setItemsPerPage
  };
  provide(VDataTablePaginationSymbol, data);
  return data;
}
function usePagination() {
  const data = inject(VDataTablePaginationSymbol);
  if (!data) throw new Error("Missing pagination!");
  return data;
}
function usePaginatedItems(options) {
  const vm = getCurrentInstance("usePaginatedItems");
  const {
    items,
    startIndex,
    stopIndex,
    itemsPerPage
  } = options;
  const paginatedItems = computed(() => {
    if (itemsPerPage.value <= 0) return items.value;
    return items.value.slice(startIndex.value, stopIndex.value);
  });
  watch(paginatedItems, (val) => {
    vm.emit("update:currentItems", val);
  });
  return {
    paginatedItems
  };
}
const makeVDataTableFooterProps = propsFactory({
  prevIcon: {
    type: String,
    default: "$prev"
  },
  nextIcon: {
    type: String,
    default: "$next"
  },
  firstIcon: {
    type: String,
    default: "$first"
  },
  lastIcon: {
    type: String,
    default: "$last"
  },
  itemsPerPageText: {
    type: String,
    default: "$vuetify.dataFooter.itemsPerPageText"
  },
  pageText: {
    type: String,
    default: "$vuetify.dataFooter.pageText"
  },
  firstPageLabel: {
    type: String,
    default: "$vuetify.dataFooter.firstPage"
  },
  prevPageLabel: {
    type: String,
    default: "$vuetify.dataFooter.prevPage"
  },
  nextPageLabel: {
    type: String,
    default: "$vuetify.dataFooter.nextPage"
  },
  lastPageLabel: {
    type: String,
    default: "$vuetify.dataFooter.lastPage"
  },
  itemsPerPageOptions: {
    type: Array,
    default: () => [{
      value: 10,
      title: "10"
    }, {
      value: 25,
      title: "25"
    }, {
      value: 50,
      title: "50"
    }, {
      value: 100,
      title: "100"
    }, {
      value: -1,
      title: "$vuetify.dataFooter.itemsPerPageAll"
    }]
  },
  showCurrentPage: Boolean
}, "VDataTableFooter");
const VDataTableFooter = genericComponent()({
  name: "VDataTableFooter",
  props: makeVDataTableFooterProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      t
    } = useLocale();
    const {
      page,
      pageCount,
      startIndex,
      stopIndex,
      itemsLength,
      itemsPerPage,
      setItemsPerPage
    } = usePagination();
    const itemsPerPageOptions = computed(() => props.itemsPerPageOptions.map((option) => {
      if (typeof option === "number") {
        return {
          value: option,
          title: option === -1 ? t("$vuetify.dataFooter.itemsPerPageAll") : String(option)
        };
      }
      return {
        ...option,
        title: !isNaN(Number(option.title)) ? option.title : t(option.title)
      };
    }));
    useRender(() => {
      var _a;
      const paginationProps = VPagination.filterProps(props);
      return createVNode("div", {
        "class": "v-data-table-footer"
      }, [(_a = slots.prepend) == null ? undefined : _a.call(slots), createVNode("div", {
        "class": "v-data-table-footer__items-per-page"
      }, [createVNode("span", null, [t(props.itemsPerPageText)]), createVNode(VSelect, {
        "items": itemsPerPageOptions.value,
        "modelValue": itemsPerPage.value,
        "onUpdate:modelValue": (v) => setItemsPerPage(Number(v)),
        "density": "compact",
        "variant": "outlined",
        "hide-details": true
      }, null)]), createVNode("div", {
        "class": "v-data-table-footer__info"
      }, [createVNode("div", null, [t(props.pageText, !itemsLength.value ? 0 : startIndex.value + 1, stopIndex.value, itemsLength.value)])]), createVNode("div", {
        "class": "v-data-table-footer__pagination"
      }, [createVNode(VPagination, mergeProps({
        "modelValue": page.value,
        "onUpdate:modelValue": ($event) => page.value = $event,
        "density": "comfortable",
        "first-aria-label": props.firstPageLabel,
        "last-aria-label": props.lastPageLabel,
        "length": pageCount.value,
        "next-aria-label": props.nextPageLabel,
        "previous-aria-label": props.prevPageLabel,
        "rounded": true,
        "show-first-last-page": true,
        "total-visible": props.showCurrentPage ? 1 : 0,
        "variant": "plain"
      }, paginationProps), null)])]);
    });
    return {};
  }
});
const VDataTableColumn = defineFunctionalComponent({
  align: {
    type: String,
    default: "start"
  },
  fixed: Boolean,
  fixedOffset: [Number, String],
  height: [Number, String],
  lastFixed: Boolean,
  noPadding: Boolean,
  tag: String,
  width: [Number, String],
  maxWidth: [Number, String],
  nowrap: Boolean
}, (props, _ref) => {
  var _a;
  let {
    slots
  } = _ref;
  const Tag = (_a = props.tag) != null ? _a : "td";
  return createVNode(Tag, {
    "class": ["v-data-table__td", {
      "v-data-table-column--fixed": props.fixed,
      "v-data-table-column--last-fixed": props.lastFixed,
      "v-data-table-column--no-padding": props.noPadding,
      "v-data-table-column--nowrap": props.nowrap
    }, `v-data-table-column--align-${props.align}`],
    "style": {
      height: convertToUnit(props.height),
      width: convertToUnit(props.width),
      maxWidth: convertToUnit(props.maxWidth),
      left: convertToUnit(props.fixedOffset || null)
    }
  }, {
    default: () => {
      var _a2;
      return [(_a2 = slots.default) == null ? undefined : _a2.call(slots)];
    }
  });
});
const makeDataTableHeaderProps = propsFactory({
  headers: Array
}, "DataTable-header");
const VDataTableHeadersSymbol = Symbol.for("vuetify:data-table-headers");
const defaultHeader = {
  title: "",
  sortable: false
};
const defaultActionHeader = {
  ...defaultHeader,
  width: 48
};
function priorityQueue() {
  let arr = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  const queue = arr.map((element) => ({
    element,
    priority: 0
  }));
  return {
    enqueue: (element, priority) => {
      let added = false;
      for (let i = 0; i < queue.length; i++) {
        const item = queue[i];
        if (item.priority > priority) {
          queue.splice(i, 0, {
            element,
            priority
          });
          added = true;
          break;
        }
      }
      if (!added) queue.push({
        element,
        priority
      });
    },
    size: () => queue.length,
    count: () => {
      let count = 0;
      if (!queue.length) return 0;
      const whole = Math.floor(queue[0].priority);
      for (let i = 0; i < queue.length; i++) {
        if (Math.floor(queue[i].priority) === whole) count += 1;
      }
      return count;
    },
    dequeue: () => {
      return queue.shift();
    }
  };
}
function extractLeaves(item) {
  let columns = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  if (!item.children) {
    columns.push(item);
  } else {
    for (const child of item.children) {
      extractLeaves(child, columns);
    }
  }
  return columns;
}
function extractKeys(headers) {
  let keys = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : /* @__PURE__ */ new Set();
  for (const item of headers) {
    if (item.key) keys.add(item.key);
    if (item.children) {
      extractKeys(item.children, keys);
    }
  }
  return keys;
}
function getDefaultItem(item) {
  if (!item.key) return undefined;
  if (item.key === "data-table-group") return defaultHeader;
  if (["data-table-expand", "data-table-select"].includes(item.key)) return defaultActionHeader;
  return undefined;
}
function getDepth(item) {
  let depth = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  if (!item.children) return depth;
  return Math.max(depth, ...item.children.map((child) => getDepth(child, depth + 1)));
}
function parseFixedColumns(items) {
  let seenFixed = false;
  function setFixed(item) {
    let parentFixed = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    if (!item) return;
    if (parentFixed) {
      item.fixed = true;
    }
    if (item.fixed) {
      if (item.children) {
        for (let i = item.children.length - 1; i >= 0; i--) {
          setFixed(item.children[i], true);
        }
      } else {
        if (!seenFixed) {
          item.lastFixed = true;
        } else if (isNaN(+item.width)) {
          consoleError(`Multiple fixed columns should have a static width (key: ${item.key})`);
        }
        seenFixed = true;
      }
    } else {
      if (item.children) {
        for (let i = item.children.length - 1; i >= 0; i--) {
          setFixed(item.children[i]);
        }
      } else {
        seenFixed = false;
      }
    }
  }
  for (let i = items.length - 1; i >= 0; i--) {
    setFixed(items[i]);
  }
  function setFixedOffset(item) {
    let fixedOffset2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    if (!item) return fixedOffset2;
    if (item.children) {
      item.fixedOffset = fixedOffset2;
      for (const child of item.children) {
        fixedOffset2 = setFixedOffset(child, fixedOffset2);
      }
    } else if (item.fixed) {
      item.fixedOffset = fixedOffset2;
      fixedOffset2 += parseFloat(item.width || "0") || 0;
    }
    return fixedOffset2;
  }
  let fixedOffset = 0;
  for (const item of items) {
    fixedOffset = setFixedOffset(item, fixedOffset);
  }
}
function parse(items, maxDepth) {
  const headers = [];
  let currentDepth = 0;
  const queue = priorityQueue(items);
  while (queue.size() > 0) {
    let rowSize = queue.count();
    const row = [];
    let fraction = 1;
    while (rowSize > 0) {
      const {
        element: item,
        priority
      } = queue.dequeue();
      const diff = maxDepth - currentDepth - getDepth(item);
      row.push({
        ...item,
        rowspan: diff != null ? diff : 1,
        colspan: item.children ? extractLeaves(item).length : 1
      });
      if (item.children) {
        for (const child of item.children) {
          const sort = priority % 1 + fraction / Math.pow(10, currentDepth + 2);
          queue.enqueue(child, currentDepth + diff + sort);
        }
      }
      fraction += 1;
      rowSize -= 1;
    }
    currentDepth += 1;
    headers.push(row);
  }
  const columns = items.map((item) => extractLeaves(item)).flat();
  return {
    columns,
    headers
  };
}
function convertToInternalHeaders(items) {
  var _a, _b, _c, _d;
  const internalHeaders = [];
  for (const item of items) {
    const defaultItem = {
      ...getDefaultItem(item),
      ...item
    };
    const key = (_a = defaultItem.key) != null ? _a : typeof defaultItem.value === "string" ? defaultItem.value : null;
    const value = (_c = (_b = defaultItem.value) != null ? _b : key) != null ? _c : null;
    const internalItem = {
      ...defaultItem,
      key,
      value,
      sortable: (_d = defaultItem.sortable) != null ? _d : defaultItem.key != null || !!defaultItem.sort,
      children: defaultItem.children ? convertToInternalHeaders(defaultItem.children) : undefined
    };
    internalHeaders.push(internalItem);
  }
  return internalHeaders;
}
function createHeaders(props, options) {
  const headers = ref([]);
  const columns = ref([]);
  const sortFunctions = ref({});
  const sortRawFunctions = ref({});
  const filterFunctions = ref({});
  watchEffect(() => {
    var _a2;
    var _a, _b, _c;
    const _headers = props.headers || Object.keys((_a2 = props.items[0]) != null ? _a2 : {}).map((key) => ({
      key,
      title: capitalize(key)
    }));
    const items = _headers.slice();
    const keys = extractKeys(items);
    if (((_a = options == null ? undefined : options.groupBy) == null ? undefined : _a.value.length) && !keys.has("data-table-group")) {
      items.unshift({
        key: "data-table-group",
        title: "Group"
      });
    }
    if (((_b = options == null ? undefined : options.showSelect) == null ? undefined : _b.value) && !keys.has("data-table-select")) {
      items.unshift({
        key: "data-table-select"
      });
    }
    if (((_c = options == null ? undefined : options.showExpand) == null ? undefined : _c.value) && !keys.has("data-table-expand")) {
      items.push({
        key: "data-table-expand"
      });
    }
    const internalHeaders = convertToInternalHeaders(items);
    parseFixedColumns(internalHeaders);
    const maxDepth = Math.max(...internalHeaders.map((item) => getDepth(item))) + 1;
    const parsed = parse(internalHeaders, maxDepth);
    headers.value = parsed.headers;
    columns.value = parsed.columns;
    const flatHeaders = parsed.headers.flat(1);
    for (const header of flatHeaders) {
      if (!header.key) continue;
      if (header.sortable) {
        if (header.sort) {
          sortFunctions.value[header.key] = header.sort;
        }
        if (header.sortRaw) {
          sortRawFunctions.value[header.key] = header.sortRaw;
        }
      }
      if (header.filter) {
        filterFunctions.value[header.key] = header.filter;
      }
    }
  });
  const data = {
    headers,
    columns,
    sortFunctions,
    sortRawFunctions,
    filterFunctions
  };
  provide(VDataTableHeadersSymbol, data);
  return data;
}
function useHeaders() {
  const data = inject(VDataTableHeadersSymbol);
  if (!data) throw new Error("Missing headers!");
  return data;
}
const singleSelectStrategy = {
  showSelectAll: false,
  allSelected: () => [],
  select: (_ref) => {
    var _a;
    let {
      items,
      value
    } = _ref;
    return new Set(value ? [(_a = items[0]) == null ? undefined : _a.value] : []);
  },
  selectAll: (_ref2) => {
    let {
      selected
    } = _ref2;
    return selected;
  }
};
const pageSelectStrategy = {
  showSelectAll: true,
  allSelected: (_ref3) => {
    let {
      currentPage
    } = _ref3;
    return currentPage;
  },
  select: (_ref4) => {
    let {
      items,
      value,
      selected
    } = _ref4;
    for (const item of items) {
      if (value) selected.add(item.value);
      else selected.delete(item.value);
    }
    return selected;
  },
  selectAll: (_ref5) => {
    let {
      value,
      currentPage,
      selected
    } = _ref5;
    return pageSelectStrategy.select({
      items: currentPage,
      value,
      selected
    });
  }
};
const allSelectStrategy = {
  showSelectAll: true,
  allSelected: (_ref6) => {
    let {
      allItems
    } = _ref6;
    return allItems;
  },
  select: (_ref7) => {
    let {
      items,
      value,
      selected
    } = _ref7;
    for (const item of items) {
      if (value) selected.add(item.value);
      else selected.delete(item.value);
    }
    return selected;
  },
  selectAll: (_ref8) => {
    let {
      value,
      allItems,
      selected
    } = _ref8;
    return allSelectStrategy.select({
      items: allItems,
      value,
      selected
    });
  }
};
const makeDataTableSelectProps = propsFactory({
  showSelect: Boolean,
  selectStrategy: {
    type: [String, Object],
    default: "page"
  },
  modelValue: {
    type: Array,
    default: () => []
  },
  valueComparator: {
    type: Function,
    default: deepEqual
  }
}, "DataTable-select");
const VDataTableSelectionSymbol = Symbol.for("vuetify:data-table-selection");
function provideSelection(props, _ref9) {
  let {
    allItems,
    currentPage
  } = _ref9;
  const selected = useProxiedModel(props, "modelValue", props.modelValue, (v) => {
    return new Set(wrapInArray(v).map((v2) => {
      var _a2;
      var _a;
      return (_a2 = (_a = allItems.value.find((item) => props.valueComparator(v2, item.value))) == null ? undefined : _a.value) != null ? _a2 : v2;
    }));
  }, (v) => {
    return [...v.values()];
  });
  const allSelectable = computed(() => allItems.value.filter((item) => item.selectable));
  const currentPageSelectable = computed(() => currentPage.value.filter((item) => item.selectable));
  const selectStrategy = computed(() => {
    if (typeof props.selectStrategy === "object") return props.selectStrategy;
    switch (props.selectStrategy) {
      case "single":
        return singleSelectStrategy;
      case "all":
        return allSelectStrategy;
      case "page":
      default:
        return pageSelectStrategy;
    }
  });
  function isSelected(items) {
    return wrapInArray(items).every((item) => selected.value.has(item.value));
  }
  function isSomeSelected(items) {
    return wrapInArray(items).some((item) => selected.value.has(item.value));
  }
  function select(items, value) {
    const newSelected = selectStrategy.value.select({
      items,
      value,
      selected: new Set(selected.value)
    });
    selected.value = newSelected;
  }
  function toggleSelect(item) {
    select([item], !isSelected([item]));
  }
  function selectAll(value) {
    const newSelected = selectStrategy.value.selectAll({
      value,
      allItems: allSelectable.value,
      currentPage: currentPageSelectable.value,
      selected: new Set(selected.value)
    });
    selected.value = newSelected;
  }
  const someSelected = computed(() => selected.value.size > 0);
  const allSelected = computed(() => {
    const items = selectStrategy.value.allSelected({
      allItems: allSelectable.value,
      currentPage: currentPageSelectable.value
    });
    return !!items.length && isSelected(items);
  });
  const showSelectAll = computed(() => selectStrategy.value.showSelectAll);
  const data = {
    toggleSelect,
    select,
    selectAll,
    isSelected,
    isSomeSelected,
    someSelected,
    allSelected,
    showSelectAll
  };
  provide(VDataTableSelectionSymbol, data);
  return data;
}
function useSelection() {
  const data = inject(VDataTableSelectionSymbol);
  if (!data) throw new Error("Missing selection!");
  return data;
}
const makeDataTableSortProps = propsFactory({
  sortBy: {
    type: Array,
    default: () => []
  },
  customKeySort: Object,
  multiSort: Boolean,
  mustSort: Boolean
}, "DataTable-sort");
const VDataTableSortSymbol = Symbol.for("vuetify:data-table-sort");
function createSort(props) {
  const sortBy = useProxiedModel(props, "sortBy");
  const mustSort = toRef(props, "mustSort");
  const multiSort = toRef(props, "multiSort");
  return {
    sortBy,
    mustSort,
    multiSort
  };
}
function provideSort(options) {
  const {
    sortBy,
    mustSort,
    multiSort,
    page
  } = options;
  const toggleSort = (column) => {
    var _a;
    if (column.key == null) return;
    let newSortBy = (_a = sortBy.value.map((x) => ({
      ...x
    }))) != null ? _a : [];
    const item = newSortBy.find((x) => x.key === column.key);
    if (!item) {
      if (multiSort.value) newSortBy = [...newSortBy, {
        key: column.key,
        order: "asc"
      }];
      else newSortBy = [{
        key: column.key,
        order: "asc"
      }];
    } else if (item.order === "desc") {
      if (mustSort.value) {
        item.order = "asc";
      } else {
        newSortBy = newSortBy.filter((x) => x.key !== column.key);
      }
    } else {
      item.order = "desc";
    }
    sortBy.value = newSortBy;
    if (page) page.value = 1;
  };
  function isSorted(column) {
    return !!sortBy.value.find((item) => item.key === column.key);
  }
  const data = {
    sortBy,
    toggleSort,
    isSorted
  };
  provide(VDataTableSortSymbol, data);
  return data;
}
function useSort() {
  const data = inject(VDataTableSortSymbol);
  if (!data) throw new Error("Missing sort!");
  return data;
}
function useSortedItems(props, items, sortBy, options) {
  const locale = useLocale();
  const sortedItems = computed(() => {
    var _a, _b;
    if (!sortBy.value.length || props.disableSort) return items.value;
    return sortItems(items.value, sortBy.value, locale.current.value, {
      transform: options == null ? undefined : options.transform,
      sortFunctions: {
        ...props.customKeySort,
        ...(_a = options == null ? undefined : options.sortFunctions) == null ? undefined : _a.value
      },
      sortRawFunctions: (_b = options == null ? undefined : options.sortRawFunctions) == null ? undefined : _b.value
    });
  });
  return {
    sortedItems
  };
}
function sortItems(items, sortByItems, locale, options) {
  const stringCollator = new Intl.Collator(locale, {
    sensitivity: "accent",
    usage: "sort"
  });
  const transformedItems = items.map((item) => [item, (options == null ? undefined : options.transform) ? options.transform(item) : item]);
  return transformedItems.sort((a, b) => {
    var _a2;
    var _a, _b;
    for (let i = 0; i < sortByItems.length; i++) {
      let hasCustomResult = false;
      const sortKey = sortByItems[i].key;
      const sortOrder = (_a2 = sortByItems[i].order) != null ? _a2 : "asc";
      if (sortOrder === false) continue;
      let sortA = a[1][sortKey];
      let sortB = b[1][sortKey];
      let sortARaw = a[0].raw;
      let sortBRaw = b[0].raw;
      if (sortOrder === "desc") {
        [sortA, sortB] = [sortB, sortA];
        [sortARaw, sortBRaw] = [sortBRaw, sortARaw];
      }
      if ((_a = options == null ? undefined : options.sortRawFunctions) == null ? undefined : _a[sortKey]) {
        const customResult = options.sortRawFunctions[sortKey](sortARaw, sortBRaw);
        if (customResult == null) continue;
        hasCustomResult = true;
        if (customResult) return customResult;
      }
      if ((_b = options == null ? undefined : options.sortFunctions) == null ? undefined : _b[sortKey]) {
        const customResult = options.sortFunctions[sortKey](sortA, sortB);
        if (customResult == null) continue;
        hasCustomResult = true;
        if (customResult) return customResult;
      }
      if (hasCustomResult) continue;
      if (sortA instanceof Date && sortB instanceof Date) {
        return sortA.getTime() - sortB.getTime();
      }
      [sortA, sortB] = [sortA, sortB].map((s) => s != null ? s.toString().toLocaleLowerCase() : s);
      if (sortA !== sortB) {
        if (isEmpty(sortA) && isEmpty(sortB)) return 0;
        if (isEmpty(sortA)) return -1;
        if (isEmpty(sortB)) return 1;
        if (!isNaN(sortA) && !isNaN(sortB)) return Number(sortA) - Number(sortB);
        return stringCollator.compare(sortA, sortB);
      }
    }
    return 0;
  }).map((_ref) => {
    let [item] = _ref;
    return item;
  });
}
const makeVDataTableHeadersProps = propsFactory({
  color: String,
  sticky: Boolean,
  disableSort: Boolean,
  multiSort: Boolean,
  sortAscIcon: {
    type: IconValue,
    default: "$sortAsc"
  },
  sortDescIcon: {
    type: IconValue,
    default: "$sortDesc"
  },
  headerProps: {
    type: Object
  },
  ...makeDisplayProps(),
  ...makeLoaderProps()
}, "VDataTableHeaders");
const VDataTableHeaders = genericComponent()({
  name: "VDataTableHeaders",
  props: makeVDataTableHeadersProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      t
    } = useLocale();
    const {
      toggleSort,
      sortBy,
      isSorted
    } = useSort();
    const {
      someSelected,
      allSelected,
      selectAll,
      showSelectAll
    } = useSelection();
    const {
      columns,
      headers
    } = useHeaders();
    const {
      loaderClasses
    } = useLoader(props);
    function getFixedStyles(column, y) {
      if (!props.sticky && !column.fixed) return undefined;
      return {
        position: "sticky",
        left: column.fixed ? convertToUnit(column.fixedOffset) : undefined,
        top: props.sticky ? `calc(var(--v-table-header-height) * ${y})` : undefined
      };
    }
    function getSortIcon(column) {
      const item = sortBy.value.find((item2) => item2.key === column.key);
      if (!item) return props.sortAscIcon;
      return item.order === "asc" ? props.sortAscIcon : props.sortDescIcon;
    }
    const {
      backgroundColorClasses,
      backgroundColorStyles
    } = useBackgroundColor(props, "color");
    const {
      displayClasses,
      mobile
    } = useDisplay(props);
    const slotProps = computed(() => ({
      headers: headers.value,
      columns: columns.value,
      toggleSort,
      isSorted,
      sortBy: sortBy.value,
      someSelected: someSelected.value,
      allSelected: allSelected.value,
      selectAll,
      getSortIcon
    }));
    const headerCellClasses = computed(() => ["v-data-table__th", {
      "v-data-table__th--sticky": props.sticky
    }, displayClasses.value, loaderClasses.value]);
    const VDataTableHeaderCell = (_ref2) => {
      var _a, _b;
      let {
        column,
        x,
        y
      } = _ref2;
      const noPadding = column.key === "data-table-select" || column.key === "data-table-expand";
      const headerProps = mergeProps((_a = props.headerProps) != null ? _a : {}, (_b = column.headerProps) != null ? _b : {});
      return createVNode(VDataTableColumn, mergeProps({
        "tag": "th",
        "align": column.align,
        "class": [{
          "v-data-table__th--sortable": column.sortable && !props.disableSort,
          "v-data-table__th--sorted": isSorted(column),
          "v-data-table__th--fixed": column.fixed
        }, ...headerCellClasses.value],
        "style": {
          width: convertToUnit(column.width),
          minWidth: convertToUnit(column.minWidth),
          maxWidth: convertToUnit(column.maxWidth),
          ...getFixedStyles(column, y)
        },
        "colspan": column.colspan,
        "rowspan": column.rowspan,
        "onClick": column.sortable ? () => toggleSort(column) : undefined,
        "fixed": column.fixed,
        "nowrap": column.nowrap,
        "lastFixed": column.lastFixed,
        "noPadding": noPadding
      }, headerProps), {
        default: () => {
          var _a3;
          var _a2;
          const columnSlotName = `header.${column.key}`;
          const columnSlotProps = {
            column,
            selectAll,
            isSorted,
            toggleSort,
            sortBy: sortBy.value,
            someSelected: someSelected.value,
            allSelected: allSelected.value,
            getSortIcon
          };
          if (slots[columnSlotName]) return slots[columnSlotName](columnSlotProps);
          if (column.key === "data-table-select") {
            return (_a3 = (_a2 = slots["header.data-table-select"]) == null ? undefined : _a2.call(slots, columnSlotProps)) != null ? _a3 : showSelectAll.value && createVNode(VCheckboxBtn, {
              "modelValue": allSelected.value,
              "indeterminate": someSelected.value && !allSelected.value,
              "onUpdate:modelValue": selectAll
            }, null);
          }
          return createVNode("div", {
            "class": "v-data-table-header__content"
          }, [createVNode("span", null, [column.title]), column.sortable && !props.disableSort && createVNode(VIcon, {
            "key": "icon",
            "class": "v-data-table-header__sort-icon",
            "icon": getSortIcon(column)
          }, null), props.multiSort && isSorted(column) && createVNode("div", {
            "key": "badge",
            "class": ["v-data-table-header__sort-badge", ...backgroundColorClasses.value],
            "style": backgroundColorStyles.value
          }, [sortBy.value.findIndex((x2) => x2.key === column.key) + 1])]);
        }
      });
    };
    const VDataTableMobileHeaderCell = () => {
      var _a, _b;
      const headerProps = mergeProps((_b = (_a = props.headerProps) != null ? _a : {}) != null ? _b : {});
      const displayItems = computed(() => {
        return columns.value.filter((column) => (column == null ? undefined : column.sortable) && !props.disableSort);
      });
      const appendIcon = computed(() => {
        const showSelectColumn = columns.value.find((column) => column.key === "data-table-select");
        if (showSelectColumn == null) return;
        return allSelected.value ? "$checkboxOn" : someSelected.value ? "$checkboxIndeterminate" : "$checkboxOff";
      });
      return createVNode(VDataTableColumn, mergeProps({
        "tag": "th",
        "class": [...headerCellClasses.value],
        "colspan": headers.value.length + 1
      }, headerProps), {
        default: () => [createVNode("div", {
          "class": "v-data-table-header__content"
        }, [createVNode(VSelect, {
          "chips": true,
          "class": "v-data-table__td-sort-select",
          "clearable": true,
          "density": "default",
          "items": displayItems.value,
          "label": t("$vuetify.dataTable.sortBy"),
          "multiple": props.multiSort,
          "variant": "underlined",
          "onClick:clear": () => sortBy.value = [],
          "appendIcon": appendIcon.value,
          "onClick:append": () => selectAll(!allSelected.value)
        }, {
          ...slots,
          chip: (props2) => {
            var _a2;
            return createVNode(VChip, {
              "onClick": ((_a2 = props2.item.raw) == null ? undefined : _a2.sortable) ? () => toggleSort(props2.item.raw) : undefined,
              "onMousedown": (e) => {
                e.preventDefault();
                e.stopPropagation();
              }
            }, {
              default: () => [props2.item.title, createVNode(VIcon, {
                "class": ["v-data-table__td-sort-icon", isSorted(props2.item.raw) && "v-data-table__td-sort-icon-active"],
                "icon": getSortIcon(props2.item.raw),
                "size": "small"
              }, null)]
            });
          }
        })])]
      });
    };
    useRender(() => {
      return mobile.value ? createVNode("tr", null, [createVNode(VDataTableMobileHeaderCell, null, null)]) : createVNode(Fragment, null, [slots.headers ? slots.headers(slotProps.value) : headers.value.map((row, y) => createVNode("tr", null, [row.map((column, x) => createVNode(VDataTableHeaderCell, {
        "column": column,
        "x": x,
        "y": y
      }, null))])), props.loading && createVNode("tr", {
        "class": "v-data-table-progress"
      }, [createVNode("th", {
        "colspan": columns.value.length
      }, [createVNode(LoaderSlot, {
        "name": "v-data-table-progress",
        "absolute": true,
        "active": true,
        "color": typeof props.loading === "boolean" ? undefined : props.loading,
        "indeterminate": true
      }, {
        default: slots.loader
      })])])]);
    });
  }
});
const makeDataTableGroupProps = propsFactory({
  groupBy: {
    type: Array,
    default: () => []
  }
}, "DataTable-group");
const VDataTableGroupSymbol = Symbol.for("vuetify:data-table-group");
function createGroupBy(props) {
  const groupBy = useProxiedModel(props, "groupBy");
  return {
    groupBy
  };
}
function provideGroupBy(options) {
  const {
    groupBy,
    sortBy
  } = options;
  const opened = ref(/* @__PURE__ */ new Set());
  const sortByWithGroups = computed(() => {
    return groupBy.value.map((val) => {
      var _a;
      return {
        ...val,
        order: (_a = val.order) != null ? _a : false
      };
    }).concat(sortBy.value);
  });
  function isGroupOpen(group) {
    return opened.value.has(group.id);
  }
  function toggleGroup(group) {
    const newOpened = new Set(opened.value);
    if (!isGroupOpen(group)) newOpened.add(group.id);
    else newOpened.delete(group.id);
    opened.value = newOpened;
  }
  function extractRows(items) {
    function dive(group) {
      const arr = [];
      for (const item of group.items) {
        if ("type" in item && item.type === "group") {
          arr.push(...dive(item));
        } else {
          arr.push(item);
        }
      }
      return arr;
    }
    return dive({
      type: "group",
      items,
      id: "dummy",
      key: "dummy",
      value: "dummy",
      depth: 0
    });
  }
  const data = {
    sortByWithGroups,
    toggleGroup,
    opened,
    groupBy,
    extractRows,
    isGroupOpen
  };
  provide(VDataTableGroupSymbol, data);
  return data;
}
function useGroupBy() {
  const data = inject(VDataTableGroupSymbol);
  if (!data) throw new Error("Missing group!");
  return data;
}
function groupItemsByProperty(items, groupBy) {
  if (!items.length) return [];
  const groups = /* @__PURE__ */ new Map();
  for (const item of items) {
    const value = getObjectValueByPath(item.raw, groupBy);
    if (!groups.has(value)) {
      groups.set(value, []);
    }
    groups.get(value).push(item);
  }
  return groups;
}
function groupItems(items, groupBy) {
  let depth = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  let prefix = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "root";
  if (!groupBy.length) return [];
  const groupedItems = groupItemsByProperty(items, groupBy[0]);
  const groups = [];
  const rest = groupBy.slice(1);
  groupedItems.forEach((items2, value) => {
    const key = groupBy[0];
    const id = `${prefix}_${key}_${value}`;
    groups.push({
      depth,
      id,
      key,
      value,
      items: rest.length ? groupItems(items2, rest, depth + 1, id) : items2,
      type: "group"
    });
  });
  return groups;
}
function flattenItems(items, opened) {
  const flatItems = [];
  for (const item of items) {
    if ("type" in item && item.type === "group") {
      if (item.value != null) {
        flatItems.push(item);
      }
      if (opened.has(item.id) || item.value == null) {
        flatItems.push(...flattenItems(item.items, opened));
      }
    } else {
      flatItems.push(item);
    }
  }
  return flatItems;
}
function useGroupedItems(items, groupBy, opened) {
  const flatItems = computed(() => {
    if (!groupBy.value.length) return items.value;
    const groupedItems = groupItems(items.value, groupBy.value.map((item) => item.key));
    return flattenItems(groupedItems, opened.value);
  });
  return {
    flatItems
  };
}
const makeVDataTableGroupHeaderRowProps = propsFactory({
  item: {
    type: Object,
    required: true
  }
}, "VDataTableGroupHeaderRow");
const VDataTableGroupHeaderRow = genericComponent()({
  name: "VDataTableGroupHeaderRow",
  props: makeVDataTableGroupHeaderRowProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      isGroupOpen,
      toggleGroup,
      extractRows
    } = useGroupBy();
    const {
      isSelected,
      isSomeSelected,
      select
    } = useSelection();
    const {
      columns
    } = useHeaders();
    const rows = computed(() => {
      return extractRows([props.item]);
    });
    return () => createVNode("tr", {
      "class": "v-data-table-group-header-row",
      "style": {
        "--v-data-table-group-header-row-depth": props.item.depth
      }
    }, [columns.value.map((column) => {
      var _a2, _b2;
      var _a, _b;
      if (column.key === "data-table-group") {
        const icon = isGroupOpen(props.item) ? "$expand" : "$next";
        const onClick = () => toggleGroup(props.item);
        return (_a2 = (_a = slots["data-table-group"]) == null ? undefined : _a.call(slots, {
          item: props.item,
          count: rows.value.length,
          props: {
            icon,
            onClick
          }
        })) != null ? _a2 : createVNode(VDataTableColumn, {
          "class": "v-data-table-group-header-row__column"
        }, {
          default: () => [createVNode(VBtn, {
            "size": "small",
            "variant": "text",
            "icon": icon,
            "onClick": onClick
          }, null), createVNode("span", null, [props.item.value]), createVNode("span", null, [createTextVNode("("), rows.value.length, createTextVNode(")")])]
        });
      }
      if (column.key === "data-table-select") {
        const modelValue = isSelected(rows.value);
        const indeterminate = isSomeSelected(rows.value) && !modelValue;
        const selectGroup = (v) => select(rows.value, v);
        return (_b2 = (_b = slots["data-table-select"]) == null ? undefined : _b.call(slots, {
          props: {
            modelValue,
            indeterminate,
            "onUpdate:modelValue": selectGroup
          }
        })) != null ? _b2 : createVNode("td", null, [createVNode(VCheckboxBtn, {
          "modelValue": modelValue,
          "indeterminate": indeterminate,
          "onUpdate:modelValue": selectGroup
        }, null)]);
      }
      return createVNode("td", null, null);
    })]);
  }
});
const makeDataTableExpandProps = propsFactory({
  expandOnClick: Boolean,
  showExpand: Boolean,
  expanded: {
    type: Array,
    default: () => []
  }
}, "DataTable-expand");
const VDataTableExpandedKey = Symbol.for("vuetify:datatable:expanded");
function provideExpanded(props) {
  const expandOnClick = toRef(props, "expandOnClick");
  const expanded = useProxiedModel(props, "expanded", props.expanded, (v) => {
    return new Set(v);
  }, (v) => {
    return [...v.values()];
  });
  function expand(item, value) {
    const newExpanded = new Set(expanded.value);
    if (!value) {
      newExpanded.delete(item.value);
    } else {
      newExpanded.add(item.value);
    }
    expanded.value = newExpanded;
  }
  function isExpanded(item) {
    return expanded.value.has(item.value);
  }
  function toggleExpand(item) {
    expand(item, !isExpanded(item));
  }
  const data = {
    expand,
    expanded,
    expandOnClick,
    isExpanded,
    toggleExpand
  };
  provide(VDataTableExpandedKey, data);
  return data;
}
function useExpanded() {
  const data = inject(VDataTableExpandedKey);
  if (!data) throw new Error("foo");
  return data;
}
const makeVDataTableRowProps = propsFactory({
  index: Number,
  item: Object,
  cellProps: [Object, Function],
  onClick: EventProp(),
  onContextmenu: EventProp(),
  onDblclick: EventProp(),
  ...makeDisplayProps()
}, "VDataTableRow");
const VDataTableRow = genericComponent()({
  name: "VDataTableRow",
  props: makeVDataTableRowProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      displayClasses,
      mobile
    } = useDisplay(props, "v-data-table__tr");
    const {
      isSelected,
      toggleSelect,
      someSelected,
      allSelected,
      selectAll
    } = useSelection();
    const {
      isExpanded,
      toggleExpand
    } = useExpanded();
    const {
      toggleSort,
      sortBy,
      isSorted
    } = useSort();
    const {
      columns
    } = useHeaders();
    useRender(() => createVNode("tr", {
      "class": ["v-data-table__tr", {
        "v-data-table__tr--clickable": !!(props.onClick || props.onContextmenu || props.onDblclick)
      }, displayClasses.value],
      "onClick": props.onClick,
      "onContextmenu": props.onContextmenu,
      "onDblclick": props.onDblclick
    }, [props.item && columns.value.map((column, i) => {
      const item = props.item;
      const slotName = `item.${column.key}`;
      const headerSlotName = `header.${column.key}`;
      const slotProps = {
        index: props.index,
        item: item.raw,
        internalItem: item,
        value: getObjectValueByPath(item.columns, column.key),
        column,
        isSelected,
        toggleSelect,
        isExpanded,
        toggleExpand
      };
      const columnSlotProps = {
        column,
        selectAll,
        isSorted,
        toggleSort,
        sortBy: sortBy.value,
        someSelected: someSelected.value,
        allSelected: allSelected.value,
        getSortIcon: () => ""
      };
      const cellProps = typeof props.cellProps === "function" ? props.cellProps({
        index: slotProps.index,
        item: slotProps.item,
        internalItem: slotProps.internalItem,
        value: slotProps.value,
        column
      }) : props.cellProps;
      const columnCellProps = typeof column.cellProps === "function" ? column.cellProps({
        index: slotProps.index,
        item: slotProps.item,
        internalItem: slotProps.internalItem,
        value: slotProps.value
      }) : column.cellProps;
      return createVNode(VDataTableColumn, mergeProps({
        "align": column.align,
        "class": {
          "v-data-table__td--expanded-row": column.key === "data-table-expand",
          "v-data-table__td--select-row": column.key === "data-table-select"
        },
        "fixed": column.fixed,
        "fixedOffset": column.fixedOffset,
        "lastFixed": column.lastFixed,
        "maxWidth": !mobile.value ? column.maxWidth : undefined,
        "noPadding": column.key === "data-table-select" || column.key === "data-table-expand",
        "nowrap": column.nowrap,
        "width": !mobile.value ? column.width : undefined
      }, cellProps, columnCellProps), {
        default: () => {
          var _a2, _b2, _c2, _d2;
          var _a, _b, _c, _d, _e;
          if (slots[slotName] && !mobile.value) return (_a = slots[slotName]) == null ? undefined : _a.call(slots, slotProps);
          if (column.key === "data-table-select") {
            return (_a2 = (_b = slots["item.data-table-select"]) == null ? undefined : _b.call(slots, slotProps)) != null ? _a2 : createVNode(VCheckboxBtn, {
              "disabled": !item.selectable,
              "modelValue": isSelected([item]),
              "onClick": withModifiers(() => toggleSelect(item), ["stop"])
            }, null);
          }
          if (column.key === "data-table-expand") {
            return (_b2 = (_c = slots["item.data-table-expand"]) == null ? undefined : _c.call(slots, slotProps)) != null ? _b2 : createVNode(VBtn, {
              "icon": isExpanded(item) ? "$collapse" : "$expand",
              "size": "small",
              "variant": "text",
              "onClick": withModifiers(() => toggleExpand(item), ["stop"])
            }, null);
          }
          const displayValue = toDisplayString(slotProps.value);
          return !mobile.value ? displayValue : createVNode(Fragment, null, [createVNode("div", {
            "class": "v-data-table__td-title"
          }, [(_c2 = (_d = slots[headerSlotName]) == null ? undefined : _d.call(slots, columnSlotProps)) != null ? _c2 : column.title]), createVNode("div", {
            "class": "v-data-table__td-value"
          }, [(_d2 = (_e = slots[slotName]) == null ? undefined : _e.call(slots, slotProps)) != null ? _d2 : displayValue])]);
        }
      });
    })]));
  }
});
const makeVDataTableRowsProps = propsFactory({
  loading: [Boolean, String],
  loadingText: {
    type: String,
    default: "$vuetify.dataIterator.loadingText"
  },
  hideNoData: Boolean,
  items: {
    type: Array,
    default: () => []
  },
  noDataText: {
    type: String,
    default: "$vuetify.noDataText"
  },
  rowProps: [Object, Function],
  cellProps: [Object, Function],
  ...makeDisplayProps()
}, "VDataTableRows");
const VDataTableRows = genericComponent()({
  name: "VDataTableRows",
  inheritAttrs: false,
  props: makeVDataTableRowsProps(),
  setup(props, _ref) {
    let {
      attrs,
      slots
    } = _ref;
    const {
      columns
    } = useHeaders();
    const {
      expandOnClick,
      toggleExpand,
      isExpanded
    } = useExpanded();
    const {
      isSelected,
      toggleSelect
    } = useSelection();
    const {
      toggleGroup,
      isGroupOpen
    } = useGroupBy();
    const {
      t
    } = useLocale();
    const {
      mobile
    } = useDisplay(props);
    useRender(() => {
      var _a2, _b2;
      var _a, _b;
      if (props.loading && (!props.items.length || slots.loading)) {
        return createVNode("tr", {
          "class": "v-data-table-rows-loading",
          "key": "loading"
        }, [createVNode("td", {
          "colspan": columns.value.length
        }, [(_a2 = (_a = slots.loading) == null ? undefined : _a.call(slots)) != null ? _a2 : t(props.loadingText)])]);
      }
      if (!props.loading && !props.items.length && !props.hideNoData) {
        return createVNode("tr", {
          "class": "v-data-table-rows-no-data",
          "key": "no-data"
        }, [createVNode("td", {
          "colspan": columns.value.length
        }, [(_b2 = (_b = slots["no-data"]) == null ? undefined : _b.call(slots)) != null ? _b2 : t(props.noDataText)])]);
      }
      return createVNode(Fragment, null, [props.items.map((item, index) => {
        var _a3;
        var _a22;
        if (item.type === "group") {
          const slotProps2 = {
            index,
            item,
            columns: columns.value,
            isExpanded,
            toggleExpand,
            isSelected,
            toggleSelect,
            toggleGroup,
            isGroupOpen
          };
          return slots["group-header"] ? slots["group-header"](slotProps2) : createVNode(VDataTableGroupHeaderRow, mergeProps({
            "key": `group-header_${item.id}`,
            "item": item
          }, getPrefixedEventHandlers(attrs, ":group-header", () => slotProps2)), slots);
        }
        const slotProps = {
          index,
          item: item.raw,
          internalItem: item,
          columns: columns.value,
          isExpanded,
          toggleExpand,
          isSelected,
          toggleSelect
        };
        const itemSlotProps = {
          ...slotProps,
          props: mergeProps({
            key: `item_${(_a3 = item.key) != null ? _a3 : item.index}`,
            onClick: expandOnClick.value ? () => {
              toggleExpand(item);
            } : undefined,
            index,
            item,
            cellProps: props.cellProps,
            mobile: mobile.value
          }, getPrefixedEventHandlers(attrs, ":row", () => slotProps), typeof props.rowProps === "function" ? props.rowProps({
            item: slotProps.item,
            index: slotProps.index,
            internalItem: slotProps.internalItem
          }) : props.rowProps)
        };
        return createVNode(Fragment, {
          "key": itemSlotProps.props.key
        }, [slots.item ? slots.item(itemSlotProps) : createVNode(VDataTableRow, itemSlotProps.props, slots), isExpanded(item) && ((_a22 = slots["expanded-row"]) == null ? undefined : _a22.call(slots, slotProps))]);
      })]);
    });
    return {};
  }
});
const makeVTableProps = propsFactory({
  fixedHeader: Boolean,
  fixedFooter: Boolean,
  height: [Number, String],
  hover: Boolean,
  ...makeComponentProps(),
  ...makeDensityProps(),
  ...makeTagProps(),
  ...makeThemeProps()
}, "VTable");
const VTable = genericComponent()({
  name: "VTable",
  props: makeVTableProps(),
  setup(props, _ref) {
    let {
      slots,
      emit
    } = _ref;
    const {
      themeClasses
    } = provideTheme(props);
    const {
      densityClasses
    } = useDensity(props);
    useRender(() => createVNode(props.tag, {
      "class": ["v-table", {
        "v-table--fixed-height": !!props.height,
        "v-table--fixed-header": props.fixedHeader,
        "v-table--fixed-footer": props.fixedFooter,
        "v-table--has-top": !!slots.top,
        "v-table--has-bottom": !!slots.bottom,
        "v-table--hover": props.hover
      }, themeClasses.value, densityClasses.value, props.class],
      "style": props.style
    }, {
      default: () => {
        var _a, _b, _c;
        return [(_a = slots.top) == null ? undefined : _a.call(slots), slots.default ? createVNode("div", {
          "class": "v-table__wrapper",
          "style": {
            height: convertToUnit(props.height)
          }
        }, [createVNode("table", null, [slots.default()])]) : (_b = slots.wrapper) == null ? undefined : _b.call(slots), (_c = slots.bottom) == null ? undefined : _c.call(slots)];
      }
    }));
    return {};
  }
});
const makeDataTableItemsProps = propsFactory({
  items: {
    type: Array,
    default: () => []
  },
  itemValue: {
    type: [String, Array, Function],
    default: "id"
  },
  itemSelectable: {
    type: [String, Array, Function],
    default: null
  },
  rowProps: [Object, Function],
  cellProps: [Object, Function],
  returnObject: Boolean
}, "DataTable-items");
function transformItem(props, item, index, columns) {
  const value = props.returnObject ? item : getPropertyFromItem(item, props.itemValue);
  const selectable = getPropertyFromItem(item, props.itemSelectable, true);
  const itemColumns = columns.reduce((obj, column) => {
    if (column.key != null) obj[column.key] = getPropertyFromItem(item, column.value);
    return obj;
  }, {});
  return {
    type: "item",
    key: props.returnObject ? getPropertyFromItem(item, props.itemValue) : value,
    index,
    value,
    selectable,
    columns: itemColumns,
    raw: item
  };
}
function transformItems(props, items, columns) {
  return items.map((item, index) => transformItem(props, item, index, columns));
}
function useDataTableItems(props, columns) {
  const items = computed(() => transformItems(props, props.items, columns.value));
  return {
    items
  };
}
function useOptions(_ref) {
  let {
    page,
    itemsPerPage,
    sortBy,
    groupBy,
    search
  } = _ref;
  const vm = getCurrentInstance("VDataTable");
  const options = computed(() => ({
    page: page.value,
    itemsPerPage: itemsPerPage.value,
    sortBy: sortBy.value,
    groupBy: groupBy.value,
    search: search.value
  }));
  let oldOptions = null;
  watch(options, () => {
    if (deepEqual(oldOptions, options.value)) return;
    if (oldOptions && oldOptions.search !== options.value.search) {
      page.value = 1;
    }
    vm.emit("update:options", options.value);
    oldOptions = options.value;
  }, {
    deep: true,
    immediate: true
  });
}
const makeDataTableProps = propsFactory({
  ...makeVDataTableRowsProps(),
  hideDefaultBody: Boolean,
  hideDefaultFooter: Boolean,
  hideDefaultHeader: Boolean,
  width: [String, Number],
  search: String,
  ...makeDataTableExpandProps(),
  ...makeDataTableGroupProps(),
  ...makeDataTableHeaderProps(),
  ...makeDataTableItemsProps(),
  ...makeDataTableSelectProps(),
  ...makeDataTableSortProps(),
  ...makeVDataTableHeadersProps(),
  ...makeVTableProps()
}, "DataTable");
const makeVDataTableProps = propsFactory({
  ...makeDataTablePaginateProps(),
  ...makeDataTableProps(),
  ...makeFilterProps(),
  ...makeVDataTableFooterProps()
}, "VDataTable");
const VDataTable = genericComponent()({
  name: "VDataTable",
  props: makeVDataTableProps(),
  emits: {
    "update:modelValue": (value) => true,
    "update:page": (value) => true,
    "update:itemsPerPage": (value) => true,
    "update:sortBy": (value) => true,
    "update:options": (value) => true,
    "update:groupBy": (value) => true,
    "update:expanded": (value) => true,
    "update:currentItems": (value) => true
  },
  setup(props, _ref) {
    let {
      attrs,
      slots
    } = _ref;
    const {
      groupBy
    } = createGroupBy(props);
    const {
      sortBy,
      multiSort,
      mustSort
    } = createSort(props);
    const {
      page,
      itemsPerPage
    } = createPagination(props);
    const {
      columns,
      headers,
      sortFunctions,
      sortRawFunctions,
      filterFunctions
    } = createHeaders(props, {
      groupBy,
      showSelect: toRef(props, "showSelect"),
      showExpand: toRef(props, "showExpand")
    });
    const {
      items
    } = useDataTableItems(props, columns);
    const search = toRef(props, "search");
    const {
      filteredItems
    } = useFilter(props, items, search, {
      transform: (item) => item.columns,
      customKeyFilter: filterFunctions
    });
    const {
      toggleSort
    } = provideSort({
      sortBy,
      multiSort,
      mustSort,
      page
    });
    const {
      sortByWithGroups,
      opened,
      extractRows,
      isGroupOpen,
      toggleGroup
    } = provideGroupBy({
      groupBy,
      sortBy
    });
    const {
      sortedItems
    } = useSortedItems(props, filteredItems, sortByWithGroups, {
      transform: (item) => item.columns,
      sortFunctions,
      sortRawFunctions
    });
    const {
      flatItems
    } = useGroupedItems(sortedItems, groupBy, opened);
    const itemsLength = computed(() => flatItems.value.length);
    const {
      startIndex,
      stopIndex,
      pageCount,
      setItemsPerPage
    } = providePagination({
      page,
      itemsPerPage,
      itemsLength
    });
    const {
      paginatedItems
    } = usePaginatedItems({
      items: flatItems,
      startIndex,
      stopIndex,
      itemsPerPage
    });
    const paginatedItemsWithoutGroups = computed(() => extractRows(paginatedItems.value));
    const {
      isSelected,
      select,
      selectAll,
      toggleSelect,
      someSelected,
      allSelected
    } = provideSelection(props, {
      allItems: items,
      currentPage: paginatedItemsWithoutGroups
    });
    const {
      isExpanded,
      toggleExpand
    } = provideExpanded(props);
    useOptions({
      page,
      itemsPerPage,
      sortBy,
      groupBy,
      search
    });
    provideDefaults({
      VDataTableRows: {
        hideNoData: toRef(props, "hideNoData"),
        noDataText: toRef(props, "noDataText"),
        loading: toRef(props, "loading"),
        loadingText: toRef(props, "loadingText")
      }
    });
    const slotProps = computed(() => ({
      page: page.value,
      itemsPerPage: itemsPerPage.value,
      sortBy: sortBy.value,
      pageCount: pageCount.value,
      toggleSort,
      setItemsPerPage,
      someSelected: someSelected.value,
      allSelected: allSelected.value,
      isSelected,
      select,
      selectAll,
      toggleSelect,
      isExpanded,
      toggleExpand,
      isGroupOpen,
      toggleGroup,
      items: paginatedItemsWithoutGroups.value.map((item) => item.raw),
      internalItems: paginatedItemsWithoutGroups.value,
      groupedItems: paginatedItems.value,
      columns: columns.value,
      headers: headers.value
    }));
    useRender(() => {
      const dataTableFooterProps = VDataTableFooter.filterProps(props);
      const dataTableHeadersProps = VDataTableHeaders.filterProps(props);
      const dataTableRowsProps = VDataTableRows.filterProps(props);
      const tableProps = VTable.filterProps(props);
      return createVNode(VTable, mergeProps({
        "class": ["v-data-table", {
          "v-data-table--show-select": props.showSelect,
          "v-data-table--loading": props.loading
        }, props.class],
        "style": props.style
      }, tableProps), {
        top: () => {
          var _a;
          return (_a = slots.top) == null ? undefined : _a.call(slots, slotProps.value);
        },
        default: () => {
          var _a, _b, _c, _d, _e, _f;
          return slots.default ? slots.default(slotProps.value) : createVNode(Fragment, null, [(_a = slots.colgroup) == null ? undefined : _a.call(slots, slotProps.value), !props.hideDefaultHeader && createVNode("thead", {
            "key": "thead"
          }, [createVNode(VDataTableHeaders, dataTableHeadersProps, slots)]), (_b = slots.thead) == null ? undefined : _b.call(slots, slotProps.value), !props.hideDefaultBody && createVNode("tbody", null, [(_c = slots["body.prepend"]) == null ? undefined : _c.call(slots, slotProps.value), slots.body ? slots.body(slotProps.value) : createVNode(VDataTableRows, mergeProps(attrs, dataTableRowsProps, {
            "items": paginatedItems.value
          }), slots), (_d = slots["body.append"]) == null ? undefined : _d.call(slots, slotProps.value)]), (_e = slots.tbody) == null ? undefined : _e.call(slots, slotProps.value), (_f = slots.tfoot) == null ? undefined : _f.call(slots, slotProps.value)]);
        },
        bottom: () => slots.bottom ? slots.bottom(slotProps.value) : !props.hideDefaultFooter && createVNode(Fragment, null, [createVNode(VDivider, null, null), createVNode(VDataTableFooter, dataTableFooterProps, {
          prepend: slots["footer.prepend"]
        })])
      });
    });
    return {};
  }
});

export { VDataTable as V, _imports_0 as _, _imports_1 as a, _imports_2 as b, _imports_3 as c };
//# sourceMappingURL=VDataTable-StJxFe3i.mjs.map
