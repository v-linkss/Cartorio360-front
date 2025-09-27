import { a as buildAssetsURL } from '../routes/renderer.mjs';
import { _ as __nuxt_component_0 } from './nuxt-link-TpvcaGEw.mjs';
import { createVNode, toRef, shallowRef, computed, ref, mergeProps, withDirectives, vShow, watch, watchEffect, withCtx, createTextVNode, toDisplayString, openBlock, createBlock, Fragment, renderList, renderSlot, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderAttr, ssrInterpolate, ssrRenderList, ssrRenderSlot } from 'vue/server-renderer';
import { useRouter } from 'vue-router';
import { p as propsFactory, m as makeComponentProps, l as makeTagProps, o as genericComponent, s as useRender, L as makeBorderProps, N as makeElevationProps, O as makeRoundedProps, Q as makeThemeProps, a8 as useBackgroundColor, ao as useBorder, ar as useElevation, au as useRounded, S as provideTheme, q as useRtl, U as provideDefaults, F as VDefaultsProvider, a1 as convertToUnit, aY as VExpandTransition, be as makeLayoutItemProps, z as useProxiedModel, aV as useToggleScope, bf as useLayoutItem, K as IconValue, ak as makeLocationProps, x as makeTransitionProps$1, y as useLocale, A as useTextColor, bg as useTheme, as as useLocation, bh as pickWithRest, aX as MaybeTransition, h as VIcon, aj as makeDimensionProps, aq as useDimension, bi as useLayout, _ as _export_sfc, $ as clamp, e as useCookie, bj as VApp, ba as VSpacer, D as VMenu, V as VBtn } from './server.mjs';
import { V as VImg } from './VImg-BQaOrhxX.mjs';
import { c as useSsrBoot, V as VList, a as VListItem, d as VListItemTitle } from './VList-p98P2nQM.mjs';
import 'vue-bundle-renderer/runtime';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:fs';
import 'node:path';
import 'node:url';
import 'devalue';
import '@unhead/ssr';
import 'unhead';
import '@unhead/shared';
import 'pinia';
import 'vue3-toastify';
import 'vue-the-mask';
import './VResponsive-BwPb2GHE.mjs';
import './VAvatar-qPSA6PD-.mjs';

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
const makeVBadgeProps = propsFactory({
  bordered: Boolean,
  color: String,
  content: [Number, String],
  dot: Boolean,
  floating: Boolean,
  icon: IconValue,
  inline: Boolean,
  label: {
    type: String,
    default: "$vuetify.badge"
  },
  max: [Number, String],
  modelValue: {
    type: Boolean,
    default: true
  },
  offsetX: [Number, String],
  offsetY: [Number, String],
  textColor: String,
  ...makeComponentProps(),
  ...makeLocationProps({
    location: "top end"
  }),
  ...makeRoundedProps(),
  ...makeTagProps(),
  ...makeThemeProps(),
  ...makeTransitionProps$1({
    transition: "scale-rotate-transition"
  })
}, "VBadge");
const VBadge = genericComponent()({
  name: "VBadge",
  inheritAttrs: false,
  props: makeVBadgeProps(),
  setup(props, ctx) {
    const {
      backgroundColorClasses,
      backgroundColorStyles
    } = useBackgroundColor(toRef(props, "color"));
    const {
      roundedClasses
    } = useRounded(props);
    const {
      t
    } = useLocale();
    const {
      textColorClasses,
      textColorStyles
    } = useTextColor(toRef(props, "textColor"));
    const {
      themeClasses
    } = useTheme();
    const {
      locationStyles
    } = useLocation(props, true, (side) => {
      var _a, _b;
      const base = props.floating ? props.dot ? 2 : 4 : props.dot ? 8 : 12;
      return base + (["top", "bottom"].includes(side) ? +((_a = props.offsetY) != null ? _a : 0) : ["left", "right"].includes(side) ? +((_b = props.offsetX) != null ? _b : 0) : 0);
    });
    useRender(() => {
      const value = Number(props.content);
      const content = !props.max || isNaN(value) ? props.content : value <= +props.max ? value : `${props.max}+`;
      const [badgeAttrs, attrs] = pickWithRest(ctx.attrs, ["aria-atomic", "aria-label", "aria-live", "role", "title"]);
      return createVNode(props.tag, mergeProps({
        "class": ["v-badge", {
          "v-badge--bordered": props.bordered,
          "v-badge--dot": props.dot,
          "v-badge--floating": props.floating,
          "v-badge--inline": props.inline
        }, props.class]
      }, attrs, {
        "style": props.style
      }), {
        default: () => {
          var _a, _b;
          return [createVNode("div", {
            "class": "v-badge__wrapper"
          }, [(_b = (_a = ctx.slots).default) == null ? undefined : _b.call(_a), createVNode(MaybeTransition, {
            "transition": props.transition
          }, {
            default: () => {
              var _a2, _b2;
              return [withDirectives(createVNode("span", mergeProps({
                "class": ["v-badge__badge", themeClasses.value, backgroundColorClasses.value, roundedClasses.value, textColorClasses.value],
                "style": [backgroundColorStyles.value, textColorStyles.value, props.inline ? {} : locationStyles.value],
                "aria-atomic": "true",
                "aria-label": t(props.label, value),
                "aria-live": "polite",
                "role": "status"
              }, badgeAttrs), [props.dot ? undefined : ctx.slots.badge ? (_b2 = (_a2 = ctx.slots).badge) == null ? undefined : _b2.call(_a2) : props.icon ? createVNode(VIcon, {
                "icon": props.icon
              }, null) : content]), [[vShow, props.modelValue]])];
            }
          })])];
        }
      });
    });
    return {};
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
    const router = useRouter();
    const items = [{ title: "Alterar Senha" }, { title: "Sair" }];
    const perfilCookie = useCookie("menu-navbar");
    const userCookie = useCookie("user-data");
    const authToken = useCookie("auth_token");
    const menuName = computed(
      () => Object.keys(perfilCookie.value || {}).filter((key) => key !== "Tela Principal").map((key) => ({
        name: key,
        subMenus: Object.keys(perfilCookie.value[key]).map((subKey) => ({
          name: subKey,
          url: perfilCookie.value[key][subKey].url
        }))
      }))
    );
    const userName = computed(() => {
      var _a2;
      var _a;
      return (_a2 = (_a = userCookie.value) == null ? undefined : _a.nome) != null ? _a2 : "Usu\xE1rio";
    });
    const cartorioNome = computed(() => {
      var _a2;
      var _a;
      return (_a2 = (_a = userCookie.value) == null ? undefined : _a.cartorio_nome) != null ? _a2 : "";
    });
    const userNameCookie = useCookie("userName");
    userNameCookie.value = userName.value;
    const notificationCount = ref(0);
    function openNotificationPanel() {
      router.push("/chat_atendimento");
    }
    function itemClick(title) {
      if (title === "Sair") logout();
    }
    function logout() {
      userCookie.value = "";
      authToken.value = "";
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
                  _push3(`<div class="d-flex align-center" data-v-9706ff91${_scopeId2}><img class="ml-5 mt-2" width="300" height="50"${ssrRenderAttr("src", _imports_0)} data-v-9706ff91${_scopeId2}><h3 class="cartorio ml-6" data-v-9706ff91${_scopeId2}>${ssrInterpolate(cartorioNome.value)}</h3></div>`);
                  _push3(ssrRenderComponent(VSpacer, null, null, _parent3, _scopeId2));
                  _push3(`<!--[-->`);
                  ssrRenderList(menuName.value, (menu, idx) => {
                    _push3(ssrRenderComponent(VMenu, null, {
                      activator: withCtx(({ props }, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(VBtn, mergeProps({ ref_for: true }, props, {
                            text: "",
                            class: "white--text"
                          }), {
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
                            createVNode(VBtn, mergeProps({ ref_for: true }, props, {
                              text: "",
                              class: "white--text"
                            }), {
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
                                ssrRenderList(menu.subMenus, (sub, sIdx) => {
                                  _push5(ssrRenderComponent(VListItem, {
                                    key: `submenu-${sIdx}`
                                  }, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(ssrRenderComponent(_component_NuxtLink, {
                                          to: `/${sub.url}`,
                                          class: "text-decoration-none inherit"
                                        }, {
                                          default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                            if (_push7) {
                                              _push7(ssrRenderComponent(VListItemTitle, null, {
                                                default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                  if (_push8) {
                                                    _push8(`${ssrInterpolate(sub.name)}`);
                                                  } else {
                                                    return [
                                                      createTextVNode(toDisplayString(sub.name), 1)
                                                    ];
                                                  }
                                                }),
                                                _: 2
                                              }, _parent7, _scopeId6));
                                            } else {
                                              return [
                                                createVNode(VListItemTitle, null, {
                                                  default: withCtx(() => [
                                                    createTextVNode(toDisplayString(sub.name), 1)
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
                                            to: `/${sub.url}`,
                                            class: "text-decoration-none inherit"
                                          }, {
                                            default: withCtx(() => [
                                              createVNode(VListItemTitle, null, {
                                                default: withCtx(() => [
                                                  createTextVNode(toDisplayString(sub.name), 1)
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
                                  (openBlock(true), createBlock(Fragment, null, renderList(menu.subMenus, (sub, sIdx) => {
                                    return openBlock(), createBlock(VListItem, {
                                      key: `submenu-${sIdx}`
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(_component_NuxtLink, {
                                          to: `/${sub.url}`,
                                          class: "text-decoration-none inherit"
                                        }, {
                                          default: withCtx(() => [
                                            createVNode(VListItemTitle, null, {
                                              default: withCtx(() => [
                                                createTextVNode(toDisplayString(sub.name), 1)
                                              ]),
                                              _: 2
                                            }, 1024)
                                          ]),
                                          _: 2
                                        }, 1032, ["to"])
                                      ]),
                                      _: 2
                                    }, 1024);
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
                                (openBlock(true), createBlock(Fragment, null, renderList(menu.subMenus, (sub, sIdx) => {
                                  return openBlock(), createBlock(VListItem, {
                                    key: `submenu-${sIdx}`
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(_component_NuxtLink, {
                                        to: `/${sub.url}`,
                                        class: "text-decoration-none inherit"
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(VListItemTitle, null, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(sub.name), 1)
                                            ]),
                                            _: 2
                                          }, 1024)
                                        ]),
                                        _: 2
                                      }, 1032, ["to"])
                                    ]),
                                    _: 2
                                  }, 1024);
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
                  if (notificationCount.value > 0) {
                    _push3(ssrRenderComponent(VBadge, {
                      content: notificationCount.value,
                      color: "red",
                      overlap: ""
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(VBtn, {
                            icon: "",
                            onClick: openNotificationPanel
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(VIcon, { color: "white" }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(`mdi-bell`);
                                    } else {
                                      return [
                                        createTextVNode("mdi-bell")
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(VIcon, { color: "white" }, {
                                    default: withCtx(() => [
                                      createTextVNode("mdi-bell")
                                    ]),
                                    _: 1
                                  })
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(VBtn, {
                              icon: "",
                              onClick: openNotificationPanel
                            }, {
                              default: withCtx(() => [
                                createVNode(VIcon, { color: "white" }, {
                                  default: withCtx(() => [
                                    createTextVNode("mdi-bell")
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
                    }, _parent3, _scopeId2));
                  } else {
                    _push3(ssrRenderComponent(VBtn, {
                      icon: "",
                      onClick: openNotificationPanel
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(VIcon, { color: "white" }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`mdi-bell`);
                              } else {
                                return [
                                  createTextVNode("mdi-bell")
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(VIcon, { color: "white" }, {
                              default: withCtx(() => [
                                createTextVNode("mdi-bell")
                              ]),
                              _: 1
                            })
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  }
                  _push3(ssrRenderComponent(VMenu, null, {
                    activator: withCtx(({ props }, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VBtn, mergeProps({ class: "user" }, props), {
                          default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`${ssrInterpolate(userName.value)}`);
                            } else {
                              return [
                                createTextVNode(toDisplayString(userName.value), 1)
                              ];
                            }
                          }),
                          _: 2
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VBtn, mergeProps({ class: "user" }, props), {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(userName.value), 1)
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
                              ssrRenderList(items, (item, i) => {
                                _push5(ssrRenderComponent(VListItem, {
                                  key: `item-${i}`,
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
                                (openBlock(), createBlock(Fragment, null, renderList(items, (item, i) => {
                                  return createVNode(VListItem, {
                                    key: `item-${i}`,
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
                              (openBlock(), createBlock(Fragment, null, renderList(items, (item, i) => {
                                return createVNode(VListItem, {
                                  key: `item-${i}`,
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
                    createVNode("div", { class: "d-flex align-center" }, [
                      createVNode("img", {
                        class: "ml-5 mt-2",
                        width: "300",
                        height: "50",
                        src: _imports_0
                      }),
                      createVNode("h3", { class: "cartorio ml-6" }, toDisplayString(cartorioNome.value), 1)
                    ]),
                    createVNode(VSpacer),
                    (openBlock(true), createBlock(Fragment, null, renderList(menuName.value, (menu, idx) => {
                      return openBlock(), createBlock(VMenu, {
                        key: `menu-${idx}`
                      }, {
                        activator: withCtx(({ props }) => [
                          createVNode(VBtn, mergeProps({ ref_for: true }, props, {
                            text: "",
                            class: "white--text"
                          }), {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(menu.name), 1)
                            ]),
                            _: 2
                          }, 1040)
                        ]),
                        default: withCtx(() => [
                          createVNode(VList, null, {
                            default: withCtx(() => [
                              (openBlock(true), createBlock(Fragment, null, renderList(menu.subMenus, (sub, sIdx) => {
                                return openBlock(), createBlock(VListItem, {
                                  key: `submenu-${sIdx}`
                                }, {
                                  default: withCtx(() => [
                                    createVNode(_component_NuxtLink, {
                                      to: `/${sub.url}`,
                                      class: "text-decoration-none inherit"
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(VListItemTitle, null, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(sub.name), 1)
                                          ]),
                                          _: 2
                                        }, 1024)
                                      ]),
                                      _: 2
                                    }, 1032, ["to"])
                                  ]),
                                  _: 2
                                }, 1024);
                              }), 128))
                            ]),
                            _: 2
                          }, 1024)
                        ]),
                        _: 2
                      }, 1024);
                    }), 128)),
                    notificationCount.value > 0 ? (openBlock(), createBlock(VBadge, {
                      key: 0,
                      content: notificationCount.value,
                      color: "red",
                      overlap: ""
                    }, {
                      default: withCtx(() => [
                        createVNode(VBtn, {
                          icon: "",
                          onClick: openNotificationPanel
                        }, {
                          default: withCtx(() => [
                            createVNode(VIcon, { color: "white" }, {
                              default: withCtx(() => [
                                createTextVNode("mdi-bell")
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }, 8, ["content"])) : (openBlock(), createBlock(VBtn, {
                      key: 1,
                      icon: "",
                      onClick: openNotificationPanel
                    }, {
                      default: withCtx(() => [
                        createVNode(VIcon, { color: "white" }, {
                          default: withCtx(() => [
                            createTextVNode("mdi-bell")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    })),
                    createVNode(VMenu, null, {
                      activator: withCtx(({ props }) => [
                        createVNode(VBtn, mergeProps({ class: "user" }, props), {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(userName.value), 1)
                          ]),
                          _: 2
                        }, 1040)
                      ]),
                      default: withCtx(() => [
                        createVNode(VList, null, {
                          default: withCtx(() => [
                            (openBlock(), createBlock(Fragment, null, renderList(items, (item, i) => {
                              return createVNode(VListItem, {
                                key: `item-${i}`,
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
                  createVNode("div", { class: "d-flex align-center" }, [
                    createVNode("img", {
                      class: "ml-5 mt-2",
                      width: "300",
                      height: "50",
                      src: _imports_0
                    }),
                    createVNode("h3", { class: "cartorio ml-6" }, toDisplayString(cartorioNome.value), 1)
                  ]),
                  createVNode(VSpacer),
                  (openBlock(true), createBlock(Fragment, null, renderList(menuName.value, (menu, idx) => {
                    return openBlock(), createBlock(VMenu, {
                      key: `menu-${idx}`
                    }, {
                      activator: withCtx(({ props }) => [
                        createVNode(VBtn, mergeProps({ ref_for: true }, props, {
                          text: "",
                          class: "white--text"
                        }), {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(menu.name), 1)
                          ]),
                          _: 2
                        }, 1040)
                      ]),
                      default: withCtx(() => [
                        createVNode(VList, null, {
                          default: withCtx(() => [
                            (openBlock(true), createBlock(Fragment, null, renderList(menu.subMenus, (sub, sIdx) => {
                              return openBlock(), createBlock(VListItem, {
                                key: `submenu-${sIdx}`
                              }, {
                                default: withCtx(() => [
                                  createVNode(_component_NuxtLink, {
                                    to: `/${sub.url}`,
                                    class: "text-decoration-none inherit"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(VListItemTitle, null, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(sub.name), 1)
                                        ]),
                                        _: 2
                                      }, 1024)
                                    ]),
                                    _: 2
                                  }, 1032, ["to"])
                                ]),
                                _: 2
                              }, 1024);
                            }), 128))
                          ]),
                          _: 2
                        }, 1024)
                      ]),
                      _: 2
                    }, 1024);
                  }), 128)),
                  notificationCount.value > 0 ? (openBlock(), createBlock(VBadge, {
                    key: 0,
                    content: notificationCount.value,
                    color: "red",
                    overlap: ""
                  }, {
                    default: withCtx(() => [
                      createVNode(VBtn, {
                        icon: "",
                        onClick: openNotificationPanel
                      }, {
                        default: withCtx(() => [
                          createVNode(VIcon, { color: "white" }, {
                            default: withCtx(() => [
                              createTextVNode("mdi-bell")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }, 8, ["content"])) : (openBlock(), createBlock(VBtn, {
                    key: 1,
                    icon: "",
                    onClick: openNotificationPanel
                  }, {
                    default: withCtx(() => [
                      createVNode(VIcon, { color: "white" }, {
                        default: withCtx(() => [
                          createTextVNode("mdi-bell")
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })),
                  createVNode(VMenu, null, {
                    activator: withCtx(({ props }) => [
                      createVNode(VBtn, mergeProps({ class: "user" }, props), {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(userName.value), 1)
                        ]),
                        _: 2
                      }, 1040)
                    ]),
                    default: withCtx(() => [
                      createVNode(VList, null, {
                        default: withCtx(() => [
                          (openBlock(), createBlock(Fragment, null, renderList(items, (item, i) => {
                            return createVNode(VListItem, {
                              key: `item-${i}`,
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
const _default = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-9706ff91"]]);

export { _default as default };
//# sourceMappingURL=default-YB7AOFBV.mjs.map
