import { a as buildAssetsURL } from '../routes/renderer.mjs';
import { _ as __nuxt_component_0 } from './nuxt-link-TpvcaGEw.mjs';
import { p as propsFactory, m as makeComponentProps, l as makeTagProps, o as genericComponent, s as useRender, L as makeBorderProps, N as makeElevationProps, O as makeRoundedProps, Q as makeThemeProps, a8 as useBackgroundColor, ao as useBorder, ar as useElevation, au as useRounded, S as provideTheme, q as useRtl, U as provideDefaults, F as VDefaultsProvider, a1 as convertToUnit, aP as VExpandTransition, be as makeLayoutItemProps, z as useProxiedModel, aM as useToggleScope, bf as useLayoutItem, aj as makeDimensionProps, aq as useDimension, bg as useLayout, _ as _export_sfc, $ as clamp, u as useRouter$1, e as useCookie, bh as VApp, b0 as VSpacer, D as VMenu, g as VBtn } from './server.mjs';
import { createVNode, toRef, shallowRef, computed, ref, mergeProps, watch, watchEffect, withCtx, unref, createTextVNode, toDisplayString, openBlock, createBlock, Fragment, renderList, renderSlot, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderAttr, ssrRenderStyle, ssrInterpolate, ssrRenderList, ssrRenderSlot } from 'vue/server-renderer';
import { V as VImg } from './VAvatar-Dy2zMqU_.mjs';
import { c as useSsrBoot, V as VList, a as VListItem, d as VListItemTitle } from './VList-BkmWkhVS.mjs';
import 'vue-bundle-renderer/runtime';
import '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:fs';
import 'node:url';
import 'node:path';
import 'devalue';
import '@unhead/ssr';
import 'unhead';
import '@unhead/shared';
import 'pinia';
import 'vue-router';
import 'vue3-toastify';
import 'vue-the-mask';
import './VResponsive-BwPb2GHE.mjs';

const _imports_0 = "" + buildAssetsURL("logo_navbar.WRqgS9jl.png");
const makeVToolbarTitleProps = propsFactory({
  text: String,
  ...makeComponentProps(),
  ...makeTagProps()
}, "VToolbarTitle");
const VToolbarTitle = genericComponent()({
  name: "VToolbarTitle",
  props: makeVToolbarTitleProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    useRender(() => {
      const hasText = !!(slots.default || slots.text || props.text);
      return createVNode(props.tag, {
        "class": ["v-toolbar-title", props.class],
        "style": props.style
      }, {
        default: () => {
          var _a;
          return [hasText && createVNode("div", {
            "class": "v-toolbar-title__placeholder"
          }, [slots.text ? slots.text() : props.text, (_a = slots.default) == null ? undefined : _a.call(slots)])];
        }
      });
    });
    return {};
  }
});
const allowedDensities = [null, "prominent", "default", "comfortable", "compact"];
const makeVToolbarProps = propsFactory({
  absolute: Boolean,
  collapse: Boolean,
  color: String,
  density: {
    type: String,
    default: "default",
    validator: (v) => allowedDensities.includes(v)
  },
  extended: Boolean,
  extensionHeight: {
    type: [Number, String],
    default: 48
  },
  flat: Boolean,
  floating: Boolean,
  height: {
    type: [Number, String],
    default: 64
  },
  image: String,
  title: String,
  ...makeBorderProps(),
  ...makeComponentProps(),
  ...makeElevationProps(),
  ...makeRoundedProps(),
  ...makeTagProps({
    tag: "header"
  }),
  ...makeThemeProps()
}, "VToolbar");
const VToolbar = genericComponent()({
  name: "VToolbar",
  props: makeVToolbarProps(),
  setup(props, _ref) {
    var _a;
    let {
      slots
    } = _ref;
    const {
      backgroundColorClasses,
      backgroundColorStyles
    } = useBackgroundColor(toRef(props, "color"));
    const {
      borderClasses
    } = useBorder(props);
    const {
      elevationClasses
    } = useElevation(props);
    const {
      roundedClasses
    } = useRounded(props);
    const {
      themeClasses
    } = provideTheme(props);
    const {
      rtlClasses
    } = useRtl();
    const isExtended = shallowRef(!!(props.extended || ((_a = slots.extension) == null ? undefined : _a.call(slots))));
    const contentHeight = computed(() => parseInt(Number(props.height) + (props.density === "prominent" ? Number(props.height) : 0) - (props.density === "comfortable" ? 8 : 0) - (props.density === "compact" ? 16 : 0), 10));
    const extensionHeight = computed(() => isExtended.value ? parseInt(Number(props.extensionHeight) + (props.density === "prominent" ? Number(props.extensionHeight) : 0) - (props.density === "comfortable" ? 4 : 0) - (props.density === "compact" ? 8 : 0), 10) : 0);
    provideDefaults({
      VBtn: {
        variant: "text"
      }
    });
    useRender(() => {
      var _a2;
      const hasTitle = !!(props.title || slots.title);
      const hasImage = !!(slots.image || props.image);
      const extension = (_a2 = slots.extension) == null ? undefined : _a2.call(slots);
      isExtended.value = !!(props.extended || extension);
      return createVNode(props.tag, {
        "class": ["v-toolbar", {
          "v-toolbar--absolute": props.absolute,
          "v-toolbar--collapse": props.collapse,
          "v-toolbar--flat": props.flat,
          "v-toolbar--floating": props.floating,
          [`v-toolbar--density-${props.density}`]: true
        }, backgroundColorClasses.value, borderClasses.value, elevationClasses.value, roundedClasses.value, themeClasses.value, rtlClasses.value, props.class],
        "style": [backgroundColorStyles.value, props.style]
      }, {
        default: () => [hasImage && createVNode("div", {
          "key": "image",
          "class": "v-toolbar__image"
        }, [!slots.image ? createVNode(VImg, {
          "key": "image-img",
          "cover": true,
          "src": props.image
        }, null) : createVNode(VDefaultsProvider, {
          "key": "image-defaults",
          "disabled": !props.image,
          "defaults": {
            VImg: {
              cover: true,
              src: props.image
            }
          }
        }, slots.image)]), createVNode(VDefaultsProvider, {
          "defaults": {
            VTabs: {
              height: convertToUnit(contentHeight.value)
            }
          }
        }, {
          default: () => {
            var _a3, _b, _c;
            return [createVNode("div", {
              "class": "v-toolbar__content",
              "style": {
                height: convertToUnit(contentHeight.value)
              }
            }, [slots.prepend && createVNode("div", {
              "class": "v-toolbar__prepend"
            }, [(_a3 = slots.prepend) == null ? undefined : _a3.call(slots)]), hasTitle && createVNode(VToolbarTitle, {
              "key": "title",
              "text": props.title
            }, {
              text: slots.title
            }), (_b = slots.default) == null ? undefined : _b.call(slots), slots.append && createVNode("div", {
              "class": "v-toolbar__append"
            }, [(_c = slots.append) == null ? undefined : _c.call(slots)])])];
          }
        }), createVNode(VDefaultsProvider, {
          "defaults": {
            VTabs: {
              height: convertToUnit(extensionHeight.value)
            }
          }
        }, {
          default: () => [createVNode(VExpandTransition, null, {
            default: () => [isExtended.value && createVNode("div", {
              "class": "v-toolbar__extension",
              "style": {
                height: convertToUnit(extensionHeight.value)
              }
            }, [extension])]
          })]
        })]
      });
    });
    return {
      contentHeight,
      extensionHeight
    };
  }
});
const makeScrollProps = propsFactory({
  scrollTarget: {
    type: String
  },
  scrollThreshold: {
    type: [String, Number],
    default: 300
  }
}, "scroll");
function useScroll(props) {
  let args = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  const {
    canScroll
  } = args;
  let previousScroll = 0;
  let previousScrollHeight = 0;
  const target = ref(null);
  const currentScroll = shallowRef(0);
  const savedScroll = shallowRef(0);
  const currentThreshold = shallowRef(0);
  const isScrollActive = shallowRef(false);
  const isScrollingUp = shallowRef(false);
  const scrollThreshold = computed(() => {
    return Number(props.scrollThreshold);
  });
  const scrollRatio = computed(() => {
    return clamp((scrollThreshold.value - currentScroll.value) / scrollThreshold.value || 0);
  });
  const onScroll = () => {
    const targetEl = target.value;
    if (!targetEl || canScroll && !canScroll.value) return;
    previousScroll = currentScroll.value;
    currentScroll.value = "window" in targetEl ? targetEl.pageYOffset : targetEl.scrollTop;
    const currentScrollHeight = targetEl instanceof Window ? (undefined).documentElement.scrollHeight : targetEl.scrollHeight;
    if (previousScrollHeight !== currentScrollHeight) {
      previousScrollHeight = currentScrollHeight;
      return;
    }
    isScrollingUp.value = currentScroll.value < previousScroll;
    currentThreshold.value = Math.abs(currentScroll.value - scrollThreshold.value);
  };
  watch(isScrollingUp, () => {
    savedScroll.value = savedScroll.value || currentScroll.value;
  });
  watch(isScrollActive, () => {
    savedScroll.value = 0;
  });
  canScroll && watch(canScroll, onScroll, {
    immediate: true
  });
  return {
    scrollThreshold,
    currentScroll,
    currentThreshold,
    isScrollActive,
    scrollRatio,
    // required only for testing
    // probably can be removed
    // later (2 chars chlng)
    isScrollingUp,
    savedScroll
  };
}
const makeVAppBarProps = propsFactory({
  scrollBehavior: String,
  modelValue: {
    type: Boolean,
    default: true
  },
  location: {
    type: String,
    default: "top",
    validator: (value) => ["top", "bottom"].includes(value)
  },
  ...makeVToolbarProps(),
  ...makeLayoutItemProps(),
  ...makeScrollProps(),
  height: {
    type: [Number, String],
    default: 64
  }
}, "VAppBar");
const VAppBar = genericComponent()({
  name: "VAppBar",
  props: makeVAppBarProps(),
  emits: {
    "update:modelValue": (value) => true
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const vToolbarRef = ref();
    const isActive = useProxiedModel(props, "modelValue");
    const scrollBehavior = computed(() => {
      var _a2;
      var _a;
      const behavior = new Set((_a2 = (_a = props.scrollBehavior) == null ? undefined : _a.split(" ")) != null ? _a2 : []);
      return {
        hide: behavior.has("hide"),
        fullyHide: behavior.has("fully-hide"),
        inverted: behavior.has("inverted"),
        collapse: behavior.has("collapse"),
        elevate: behavior.has("elevate"),
        fadeImage: behavior.has("fade-image")
        // shrink: behavior.has('shrink'),
      };
    });
    const canScroll = computed(() => {
      const behavior = scrollBehavior.value;
      return behavior.hide || behavior.fullyHide || behavior.inverted || behavior.collapse || behavior.elevate || behavior.fadeImage || // behavior.shrink ||
      !isActive.value;
    });
    const {
      currentScroll,
      scrollThreshold,
      isScrollingUp,
      scrollRatio
    } = useScroll(props, {
      canScroll
    });
    const canHide = computed(() => scrollBehavior.value.hide || scrollBehavior.value.fullyHide);
    const isCollapsed = computed(() => props.collapse || scrollBehavior.value.collapse && (scrollBehavior.value.inverted ? scrollRatio.value > 0 : scrollRatio.value === 0));
    const isFlat = computed(() => props.flat || scrollBehavior.value.fullyHide && !isActive.value || scrollBehavior.value.elevate && (scrollBehavior.value.inverted ? currentScroll.value > 0 : currentScroll.value === 0));
    const opacity = computed(() => scrollBehavior.value.fadeImage ? scrollBehavior.value.inverted ? 1 - scrollRatio.value : scrollRatio.value : undefined);
    const height = computed(() => {
      var _a2, _b2;
      var _a, _b;
      const height2 = Number((_a2 = (_a = vToolbarRef.value) == null ? undefined : _a.contentHeight) != null ? _a2 : props.height);
      const extensionHeight = Number((_b2 = (_b = vToolbarRef.value) == null ? undefined : _b.extensionHeight) != null ? _b2 : 0);
      if (!canHide.value) return height2 + extensionHeight;
      return currentScroll.value < scrollThreshold.value || scrollBehavior.value.fullyHide ? height2 + extensionHeight : height2;
    });
    useToggleScope(computed(() => !!props.scrollBehavior), () => {
      watchEffect(() => {
        if (canHide.value) {
          if (scrollBehavior.value.inverted) {
            isActive.value = currentScroll.value > scrollThreshold.value;
          } else {
            isActive.value = isScrollingUp.value || currentScroll.value < scrollThreshold.value;
          }
        } else {
          isActive.value = true;
        }
      });
    });
    const {
      ssrBootStyles
    } = useSsrBoot();
    const {
      layoutItemStyles,
      layoutIsReady
    } = useLayoutItem({
      id: props.name,
      order: computed(() => parseInt(props.order, 10)),
      position: toRef(props, "location"),
      layoutSize: height,
      elementSize: shallowRef(undefined),
      active: isActive,
      absolute: toRef(props, "absolute")
    });
    useRender(() => {
      const toolbarProps = VToolbar.filterProps(props);
      return createVNode(VToolbar, mergeProps({
        "ref": vToolbarRef,
        "class": ["v-app-bar", {
          "v-app-bar--bottom": props.location === "bottom"
        }, props.class],
        "style": [{
          ...layoutItemStyles.value,
          "--v-toolbar-image-opacity": opacity.value,
          height: undefined,
          ...ssrBootStyles.value
        }, props.style]
      }, toolbarProps, {
        "collapse": isCollapsed.value,
        "flat": isFlat.value
      }), slots);
    });
    return layoutIsReady;
  }
});
const makeVMainProps = propsFactory({
  scrollable: Boolean,
  ...makeComponentProps(),
  ...makeDimensionProps(),
  ...makeTagProps({
    tag: "main"
  })
}, "VMain");
const VMain = genericComponent()({
  name: "VMain",
  props: makeVMainProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      dimensionStyles
    } = useDimension(props);
    const {
      mainStyles,
      layoutIsReady
    } = useLayout();
    const {
      ssrBootStyles
    } = useSsrBoot();
    useRender(() => createVNode(props.tag, {
      "class": ["v-main", {
        "v-main--scrollable": props.scrollable
      }, props.class],
      "style": [mainStyles.value, ssrBootStyles.value, dimensionStyles.value, props.style]
    }, {
      default: () => {
        var _a, _b;
        return [props.scrollable ? createVNode("div", {
          "class": "v-main__scroller"
        }, [(_a = slots.default) == null ? undefined : _a.call(slots)]) : (_b = slots.default) == null ? undefined : _b.call(slots)];
      }
    }));
    return layoutIsReady;
  }
});
const _sfc_main = {
  __name: "default",
  __ssrInlineRender: true,
  setup(__props) {
    const router = useRouter$1();
    const items = [{ title: "Alterar Senha" }, { title: "Sair" }];
    const tipoPerfilData = useCookie("menu-navbar");
    const menuName = ref(
      Object.keys(tipoPerfilData.value || {}).filter((key) => key !== "Tela Principal").map((key) => ({
        name: key,
        subMenus: Object.keys(tipoPerfilData.value[key]).map((subKey) => ({
          name: subKey,
          url: tipoPerfilData.value[key][subKey].url
        }))
      }))
    );
    function itemClick(title) {
      if (title === "Sair") {
        logout();
      }
    }
    function logout() {
      useCookie("user-data").value = "";
      useCookie("auth_token").value = "";
      router.push("/login");
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(ssrRenderComponent(VApp, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VAppBar, {
              color: "#0a063b",
              height: "100"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div data-v-3dbb8198${_scopeId2}><img class="ml-5 mt-2"${ssrRenderAttr("width", 300)}${ssrRenderAttr("height", 50)}${ssrRenderAttr("src", _imports_0)} data-v-3dbb8198${_scopeId2}><h3 style="${ssrRenderStyle({ "color": "white", "margin-left": "30px" })}" data-v-3dbb8198${_scopeId2}>${ssrInterpolate(("useCookie" in _ctx ? _ctx.useCookie : unref(useCookie))("user-data").value.cartorio_nome)}</h3></div>`);
                  _push3(ssrRenderComponent(VSpacer, null, null, _parent3, _scopeId2));
                  _push3(`<!--[-->`);
                  ssrRenderList(unref(menuName), (menu, index) => {
                    _push3(ssrRenderComponent(VMenu, { key: index }, {
                      activator: withCtx(({ props }, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(VBtn, mergeProps({
                            style: { "color": "white" },
                            ref_for: true
                          }, props), {
                            default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`${ssrInterpolate(menu.name)}`);
                              } else {
                                return [
                                  createTextVNode(toDisplayString(menu.name), 1)
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(VBtn, mergeProps({
                              style: { "color": "white" },
                              ref_for: true
                            }, props), {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(menu.name), 1)
                              ]),
                              _: 2
                            }, 1040)
                          ];
                        }
                      }),
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(VList, null, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`<!--[-->`);
                                ssrRenderList(menu.subMenus, (subMenu, subIndex) => {
                                  _push5(ssrRenderComponent(VListItem, {
                                    key: subIndex,
                                    value: subMenu.url
                                  }, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(ssrRenderComponent(_component_NuxtLink, {
                                          style: { "text-decoration": "none", "color": "inherit" },
                                          to: `/${subMenu.url}`
                                        }, {
                                          default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                            if (_push7) {
                                              _push7(ssrRenderComponent(VListItemTitle, null, {
                                                default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                  if (_push8) {
                                                    _push8(`${ssrInterpolate(subMenu.name)}`);
                                                  } else {
                                                    return [
                                                      createTextVNode(toDisplayString(subMenu.name), 1)
                                                    ];
                                                  }
                                                }),
                                                _: 2
                                              }, _parent7, _scopeId6));
                                            } else {
                                              return [
                                                createVNode(VListItemTitle, null, {
                                                  default: withCtx(() => [
                                                    createTextVNode(toDisplayString(subMenu.name), 1)
                                                  ]),
                                                  _: 2
                                                }, 1024)
                                              ];
                                            }
                                          }),
                                          _: 2
                                        }, _parent6, _scopeId5));
                                      } else {
                                        return [
                                          createVNode(_component_NuxtLink, {
                                            style: { "text-decoration": "none", "color": "inherit" },
                                            to: `/${subMenu.url}`
                                          }, {
                                            default: withCtx(() => [
                                              createVNode(VListItemTitle, null, {
                                                default: withCtx(() => [
                                                  createTextVNode(toDisplayString(subMenu.name), 1)
                                                ]),
                                                _: 2
                                              }, 1024)
                                            ]),
                                            _: 2
                                          }, 1032, ["to"])
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                });
                                _push5(`<!--]-->`);
                              } else {
                                return [
                                  (openBlock(true), createBlock(Fragment, null, renderList(menu.subMenus, (subMenu, subIndex) => {
                                    return openBlock(), createBlock(VListItem, {
                                      key: subIndex,
                                      value: subMenu.url
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(_component_NuxtLink, {
                                          style: { "text-decoration": "none", "color": "inherit" },
                                          to: `/${subMenu.url}`
                                        }, {
                                          default: withCtx(() => [
                                            createVNode(VListItemTitle, null, {
                                              default: withCtx(() => [
                                                createTextVNode(toDisplayString(subMenu.name), 1)
                                              ]),
                                              _: 2
                                            }, 1024)
                                          ]),
                                          _: 2
                                        }, 1032, ["to"])
                                      ]),
                                      _: 2
                                    }, 1032, ["value"]);
                                  }), 128))
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(VList, null, {
                              default: withCtx(() => [
                                (openBlock(true), createBlock(Fragment, null, renderList(menu.subMenus, (subMenu, subIndex) => {
                                  return openBlock(), createBlock(VListItem, {
                                    key: subIndex,
                                    value: subMenu.url
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(_component_NuxtLink, {
                                        style: { "text-decoration": "none", "color": "inherit" },
                                        to: `/${subMenu.url}`
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(VListItemTitle, null, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(subMenu.name), 1)
                                            ]),
                                            _: 2
                                          }, 1024)
                                        ]),
                                        _: 2
                                      }, 1032, ["to"])
                                    ]),
                                    _: 2
                                  }, 1032, ["value"]);
                                }), 128))
                              ]),
                              _: 2
                            }, 1024)
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  });
                  _push3(`<!--]-->`);
                  _push3(ssrRenderComponent(VMenu, null, {
                    activator: withCtx(({ props }, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VBtn, mergeProps({ class: "user" }, props), {
                          default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`${ssrInterpolate(("useCookie" in _ctx ? _ctx.useCookie : unref(useCookie))("user-data").value.nome)}`);
                            } else {
                              return [
                                createTextVNode(toDisplayString(("useCookie" in _ctx ? _ctx.useCookie : unref(useCookie))("user-data").value.nome), 1)
                              ];
                            }
                          }),
                          _: 2
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VBtn, mergeProps({ class: "user" }, props), {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(("useCookie" in _ctx ? _ctx.useCookie : unref(useCookie))("user-data").value.nome), 1)
                            ]),
                            _: 2
                          }, 1040)
                        ];
                      }
                    }),
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VList, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<!--[-->`);
                              ssrRenderList(items, (item, index) => {
                                _push5(ssrRenderComponent(VListItem, {
                                  key: index,
                                  onClick: ($event) => itemClick(item.title)
                                }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(ssrRenderComponent(VListItemTitle, null, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(`${ssrInterpolate(item.title)}`);
                                          } else {
                                            return [
                                              createTextVNode(toDisplayString(item.title), 1)
                                            ];
                                          }
                                        }),
                                        _: 2
                                      }, _parent6, _scopeId5));
                                    } else {
                                      return [
                                        createVNode(VListItemTitle, null, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(item.title), 1)
                                          ]),
                                          _: 2
                                        }, 1024)
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent5, _scopeId4));
                              });
                              _push5(`<!--]-->`);
                            } else {
                              return [
                                (openBlock(), createBlock(Fragment, null, renderList(items, (item, index) => {
                                  return createVNode(VListItem, {
                                    key: index,
                                    onClick: ($event) => itemClick(item.title)
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(VListItemTitle, null, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(item.title), 1)
                                        ]),
                                        _: 2
                                      }, 1024)
                                    ]),
                                    _: 2
                                  }, 1032, ["onClick"]);
                                }), 64))
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VList, null, {
                            default: withCtx(() => [
                              (openBlock(), createBlock(Fragment, null, renderList(items, (item, index) => {
                                return createVNode(VListItem, {
                                  key: index,
                                  onClick: ($event) => itemClick(item.title)
                                }, {
                                  default: withCtx(() => [
                                    createVNode(VListItemTitle, null, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(item.title), 1)
                                      ]),
                                      _: 2
                                    }, 1024)
                                  ]),
                                  _: 2
                                }, 1032, ["onClick"]);
                              }), 64))
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode("div", null, [
                      createVNode("img", {
                        class: "ml-5 mt-2",
                        width: 300,
                        height: 50,
                        src: _imports_0
                      }),
                      createVNode("h3", { style: { "color": "white", "margin-left": "30px" } }, toDisplayString(("useCookie" in _ctx ? _ctx.useCookie : unref(useCookie))("user-data").value.cartorio_nome), 1)
                    ]),
                    createVNode(VSpacer),
                    (openBlock(true), createBlock(Fragment, null, renderList(unref(menuName), (menu, index) => {
                      return openBlock(), createBlock(VMenu, { key: index }, {
                        activator: withCtx(({ props }) => [
                          createVNode(VBtn, mergeProps({
                            style: { "color": "white" },
                            ref_for: true
                          }, props), {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(menu.name), 1)
                            ]),
                            _: 2
                          }, 1040)
                        ]),
                        default: withCtx(() => [
                          createVNode(VList, null, {
                            default: withCtx(() => [
                              (openBlock(true), createBlock(Fragment, null, renderList(menu.subMenus, (subMenu, subIndex) => {
                                return openBlock(), createBlock(VListItem, {
                                  key: subIndex,
                                  value: subMenu.url
                                }, {
                                  default: withCtx(() => [
                                    createVNode(_component_NuxtLink, {
                                      style: { "text-decoration": "none", "color": "inherit" },
                                      to: `/${subMenu.url}`
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(VListItemTitle, null, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(subMenu.name), 1)
                                          ]),
                                          _: 2
                                        }, 1024)
                                      ]),
                                      _: 2
                                    }, 1032, ["to"])
                                  ]),
                                  _: 2
                                }, 1032, ["value"]);
                              }), 128))
                            ]),
                            _: 2
                          }, 1024)
                        ]),
                        _: 2
                      }, 1024);
                    }), 128)),
                    createVNode(VMenu, null, {
                      activator: withCtx(({ props }) => [
                        createVNode(VBtn, mergeProps({ class: "user" }, props), {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(("useCookie" in _ctx ? _ctx.useCookie : unref(useCookie))("user-data").value.nome), 1)
                          ]),
                          _: 2
                        }, 1040)
                      ]),
                      default: withCtx(() => [
                        createVNode(VList, null, {
                          default: withCtx(() => [
                            (openBlock(), createBlock(Fragment, null, renderList(items, (item, index) => {
                              return createVNode(VListItem, {
                                key: index,
                                onClick: ($event) => itemClick(item.title)
                              }, {
                                default: withCtx(() => [
                                  createVNode(VListItemTitle, null, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(item.title), 1)
                                    ]),
                                    _: 2
                                  }, 1024)
                                ]),
                                _: 2
                              }, 1032, ["onClick"]);
                            }), 64))
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(VMain, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  ssrRenderSlot(_ctx.$slots, "default", {}, null, _push3, _parent3, _scopeId2);
                } else {
                  return [
                    renderSlot(_ctx.$slots, "default", {}, undefined, true)
                  ];
                }
              }),
              _: 3
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(VAppBar, {
                color: "#0a063b",
                height: "100"
              }, {
                default: withCtx(() => [
                  createVNode("div", null, [
                    createVNode("img", {
                      class: "ml-5 mt-2",
                      width: 300,
                      height: 50,
                      src: _imports_0
                    }),
                    createVNode("h3", { style: { "color": "white", "margin-left": "30px" } }, toDisplayString(("useCookie" in _ctx ? _ctx.useCookie : unref(useCookie))("user-data").value.cartorio_nome), 1)
                  ]),
                  createVNode(VSpacer),
                  (openBlock(true), createBlock(Fragment, null, renderList(unref(menuName), (menu, index) => {
                    return openBlock(), createBlock(VMenu, { key: index }, {
                      activator: withCtx(({ props }) => [
                        createVNode(VBtn, mergeProps({
                          style: { "color": "white" },
                          ref_for: true
                        }, props), {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(menu.name), 1)
                          ]),
                          _: 2
                        }, 1040)
                      ]),
                      default: withCtx(() => [
                        createVNode(VList, null, {
                          default: withCtx(() => [
                            (openBlock(true), createBlock(Fragment, null, renderList(menu.subMenus, (subMenu, subIndex) => {
                              return openBlock(), createBlock(VListItem, {
                                key: subIndex,
                                value: subMenu.url
                              }, {
                                default: withCtx(() => [
                                  createVNode(_component_NuxtLink, {
                                    style: { "text-decoration": "none", "color": "inherit" },
                                    to: `/${subMenu.url}`
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(VListItemTitle, null, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(subMenu.name), 1)
                                        ]),
                                        _: 2
                                      }, 1024)
                                    ]),
                                    _: 2
                                  }, 1032, ["to"])
                                ]),
                                _: 2
                              }, 1032, ["value"]);
                            }), 128))
                          ]),
                          _: 2
                        }, 1024)
                      ]),
                      _: 2
                    }, 1024);
                  }), 128)),
                  createVNode(VMenu, null, {
                    activator: withCtx(({ props }) => [
                      createVNode(VBtn, mergeProps({ class: "user" }, props), {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(("useCookie" in _ctx ? _ctx.useCookie : unref(useCookie))("user-data").value.nome), 1)
                        ]),
                        _: 2
                      }, 1040)
                    ]),
                    default: withCtx(() => [
                      createVNode(VList, null, {
                        default: withCtx(() => [
                          (openBlock(), createBlock(Fragment, null, renderList(items, (item, index) => {
                            return createVNode(VListItem, {
                              key: index,
                              onClick: ($event) => itemClick(item.title)
                            }, {
                              default: withCtx(() => [
                                createVNode(VListItemTitle, null, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(item.title), 1)
                                  ]),
                                  _: 2
                                }, 1024)
                              ]),
                              _: 2
                            }, 1032, ["onClick"]);
                          }), 64))
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(VMain, null, {
                default: withCtx(() => [
                  renderSlot(_ctx.$slots, "default", {}, undefined, true)
                ]),
                _: 3
              })
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/default.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : undefined;
};
const _default = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-3dbb8198"]]);

export { _default as default };
//# sourceMappingURL=default-BZRVjvdd.mjs.map
