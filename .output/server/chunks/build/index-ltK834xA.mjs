import { _ as __nuxt_component_0$1 } from './nuxt-link-DyZc7qn_.mjs';
import { p as propsFactory, an as omit, aS as makeVBtnProps, x as genericComponent, z as useTextColor, A as useRender, f as VBtn, U as forwardRefs, I as useProxiedModel, aV as makeVSlideGroupProps, Z as makeDensityProps, M as makeTagProps, ac as useDensity, F as useBackgroundColor, Q as useScopeId, W as provideDefaults, aW as VSlideGroup, B as convertToUnit, aT as animate, aU as standardEasing, aX as isObject, u as useRouter$1, d as useNuxtApp, c as useCookie, aR as VProgressCircular, ak as VTextField, _ as _export_sfc, aY as VDataTable, V as VImg, e as VSpacer, g as VSelect, b as useRuntimeConfig } from './server.mjs';
import { b as useLazyAsyncData, u as useFetch } from './fetch-CXRKblKa.mjs';
import { ref, computed, createVNode, mergeProps, Fragment, inject, toRef, reactive, withCtx, unref, isRef, createTextVNode, openBlock, createBlock, createCommentVNode, useSSRContext, withAsyncContext, resolveDirective, withDirectives } from 'vue';
import { ssrRenderComponent, ssrRenderStyle, ssrInterpolate, ssrGetDirectiveProps, ssrRenderAttr, ssrRenderAttrs } from 'vue/server-renderer';
import { V as VRow, _ as _imports_0 } from './sair-B-uLsLLb.mjs';
import { _ as _imports_3 } from './salvar-DNXAfpCz.mjs';
import { useVuelidate } from '@vuelidate/core';
import { helpers, required } from '@vuelidate/validators';
import { V as VContainer } from './VContainer-yRa93Mia.mjs';
import { V as VCol } from './VCol-B1dzFcQw.mjs';
import { V as VAutocomplete } from './VAutocomplete-C8KrUryE.mjs';
import { _ as _imports_0$1 } from './novo-ZDaciQiz.mjs';
import { _ as _imports_0$2, a as _imports_1, V as VSlider } from './camera-3GA36VfK.mjs';
import { _ as _imports_4 } from './trash-DzRaA21m.mjs';
import { V as VDialog } from './VDialog-Bcs5SAw5.mjs';
import { V as VCard } from './VCard-BC0uejm3.mjs';
import { m as makeVWindowProps, V as VWindow, a as makeVWindowItemProps, b as VWindowItem } from './VWindowItem-WRzzTVXF.mjs';
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
import '@unhead/ssr';
import 'unhead';
import '@unhead/shared';
import 'vue-router';
import 'vue3-toastify';
import 'vue-the-mask';

const VTabsSymbol = Symbol.for("vuetify:v-tabs");
const makeVTabProps = propsFactory({
  fixed: Boolean,
  sliderColor: String,
  hideSlider: Boolean,
  direction: {
    type: String,
    default: "horizontal"
  },
  ...omit(makeVBtnProps({
    selectedClass: "v-tab--selected",
    variant: "text"
  }), ["active", "block", "flat", "location", "position", "symbol"])
}, "VTab");
const VTab = genericComponent()({
  name: "VTab",
  props: makeVTabProps(),
  setup(props, _ref) {
    let {
      slots,
      attrs
    } = _ref;
    const {
      textColorClasses: sliderColorClasses,
      textColorStyles: sliderColorStyles
    } = useTextColor(props, "sliderColor");
    const rootEl = ref();
    const sliderEl = ref();
    const isHorizontal = computed(() => props.direction === "horizontal");
    const isSelected = computed(() => {
      var _a2;
      var _a, _b;
      return (_a2 = (_b = (_a = rootEl.value) == null ? void 0 : _a.group) == null ? void 0 : _b.isSelected.value) != null ? _a2 : false;
    });
    function updateSlider(_ref2) {
      var _a, _b;
      let {
        value
      } = _ref2;
      if (value) {
        const prevEl = (_b = (_a = rootEl.value) == null ? void 0 : _a.$el.parentElement) == null ? void 0 : _b.querySelector(".v-tab--selected .v-tab__slider");
        const nextEl = sliderEl.value;
        if (!prevEl || !nextEl)
          return;
        const color = getComputedStyle(prevEl).color;
        const prevBox = prevEl.getBoundingClientRect();
        const nextBox = nextEl.getBoundingClientRect();
        const xy = isHorizontal.value ? "x" : "y";
        const XY = isHorizontal.value ? "X" : "Y";
        const rightBottom = isHorizontal.value ? "right" : "bottom";
        const widthHeight = isHorizontal.value ? "width" : "height";
        const prevPos = prevBox[xy];
        const nextPos = nextBox[xy];
        const delta = prevPos > nextPos ? prevBox[rightBottom] - nextBox[rightBottom] : prevBox[xy] - nextBox[xy];
        const origin = Math.sign(delta) > 0 ? isHorizontal.value ? "right" : "bottom" : Math.sign(delta) < 0 ? isHorizontal.value ? "left" : "top" : "center";
        const size = Math.abs(delta) + (Math.sign(delta) < 0 ? prevBox[widthHeight] : nextBox[widthHeight]);
        const scale = size / Math.max(prevBox[widthHeight], nextBox[widthHeight]) || 0;
        const initialScale = prevBox[widthHeight] / nextBox[widthHeight] || 0;
        const sigma = 1.5;
        animate(nextEl, {
          backgroundColor: [color, "currentcolor"],
          transform: [`translate${XY}(${delta}px) scale${XY}(${initialScale})`, `translate${XY}(${delta / sigma}px) scale${XY}(${(scale - 1) / sigma + 1})`, "none"],
          transformOrigin: Array(3).fill(origin)
        }, {
          duration: 225,
          easing: standardEasing
        });
      }
    }
    useRender(() => {
      const btnProps = VBtn.filterProps(props);
      return createVNode(VBtn, mergeProps({
        "symbol": VTabsSymbol,
        "ref": rootEl,
        "class": ["v-tab", props.class],
        "style": props.style,
        "tabindex": isSelected.value ? 0 : -1,
        "role": "tab",
        "aria-selected": String(isSelected.value),
        "active": false
      }, btnProps, attrs, {
        "block": props.fixed,
        "maxWidth": props.fixed ? 300 : void 0,
        "onGroup:selected": updateSlider
      }), {
        ...slots,
        default: () => {
          var _a2;
          var _a;
          return createVNode(Fragment, null, [(_a2 = (_a = slots.default) == null ? void 0 : _a.call(slots)) != null ? _a2 : props.text, !props.hideSlider && createVNode("div", {
            "ref": sliderEl,
            "class": ["v-tab__slider", sliderColorClasses.value],
            "style": sliderColorStyles.value
          }, null)]);
        }
      });
    });
    return forwardRefs({}, rootEl);
  }
});
const makeVTabsWindowProps = propsFactory({
  ...omit(makeVWindowProps(), ["continuous", "nextIcon", "prevIcon", "showArrows", "touch", "mandatory"])
}, "VTabsWindow");
const VTabsWindow = genericComponent()({
  name: "VTabsWindow",
  props: makeVTabsWindowProps(),
  emits: {
    "update:modelValue": (v) => true
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const group = inject(VTabsSymbol, null);
    const _model = useProxiedModel(props, "modelValue");
    const model = computed({
      get() {
        var _a;
        if (_model.value != null || !group)
          return _model.value;
        return (_a = group.items.value.find((item) => group.selected.value.includes(item.id))) == null ? void 0 : _a.value;
      },
      set(val) {
        _model.value = val;
      }
    });
    useRender(() => {
      const windowProps = VWindow.filterProps(props);
      return createVNode(VWindow, mergeProps({
        "_as": "VTabsWindow"
      }, windowProps, {
        "modelValue": model.value,
        "onUpdate:modelValue": ($event) => model.value = $event,
        "class": ["v-tabs-window", props.class],
        "style": props.style,
        "mandatory": false,
        "touch": false
      }), slots);
    });
    return {};
  }
});
const makeVTabsWindowItemProps = propsFactory({
  ...makeVWindowItemProps()
}, "VTabsWindowItem");
const VTabsWindowItem = genericComponent()({
  name: "VTabsWindowItem",
  props: makeVTabsWindowItemProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    useRender(() => {
      const windowItemProps = VWindowItem.filterProps(props);
      return createVNode(VWindowItem, mergeProps({
        "_as": "VTabsWindowItem"
      }, windowItemProps, {
        "class": ["v-tabs-window-item", props.class],
        "style": props.style
      }), slots);
    });
    return {};
  }
});
function parseItems(items) {
  if (!items)
    return [];
  return items.map((item) => {
    if (!isObject(item))
      return {
        text: item,
        value: item
      };
    return item;
  });
}
const makeVTabsProps = propsFactory({
  alignTabs: {
    type: String,
    default: "start"
  },
  color: String,
  fixedTabs: Boolean,
  items: {
    type: Array,
    default: () => []
  },
  stacked: Boolean,
  bgColor: String,
  grow: Boolean,
  height: {
    type: [Number, String],
    default: void 0
  },
  hideSlider: Boolean,
  sliderColor: String,
  ...makeVSlideGroupProps({
    mandatory: "force",
    selectedClass: "v-tab-item--selected"
  }),
  ...makeDensityProps(),
  ...makeTagProps()
}, "VTabs");
const VTabs = genericComponent()({
  name: "VTabs",
  props: makeVTabsProps(),
  emits: {
    "update:modelValue": (v) => true
  },
  setup(props, _ref) {
    let {
      attrs,
      slots
    } = _ref;
    const model = useProxiedModel(props, "modelValue");
    const items = computed(() => parseItems(props.items));
    const {
      densityClasses
    } = useDensity(props);
    const {
      backgroundColorClasses,
      backgroundColorStyles
    } = useBackgroundColor(toRef(props, "bgColor"));
    const {
      scopeId
    } = useScopeId();
    provideDefaults({
      VTab: {
        color: toRef(props, "color"),
        direction: toRef(props, "direction"),
        stacked: toRef(props, "stacked"),
        fixed: toRef(props, "fixedTabs"),
        sliderColor: toRef(props, "sliderColor"),
        hideSlider: toRef(props, "hideSlider")
      }
    });
    useRender(() => {
      const slideGroupProps = VSlideGroup.filterProps(props);
      const hasWindow = !!(slots.window || props.items.length > 0);
      return createVNode(Fragment, null, [createVNode(VSlideGroup, mergeProps(slideGroupProps, {
        "modelValue": model.value,
        "onUpdate:modelValue": ($event) => model.value = $event,
        "class": ["v-tabs", `v-tabs--${props.direction}`, `v-tabs--align-tabs-${props.alignTabs}`, {
          "v-tabs--fixed-tabs": props.fixedTabs,
          "v-tabs--grow": props.grow,
          "v-tabs--stacked": props.stacked
        }, densityClasses.value, backgroundColorClasses.value, props.class],
        "style": [{
          "--v-tabs-height": convertToUnit(props.height)
        }, backgroundColorStyles.value, props.style],
        "role": "tablist",
        "symbol": VTabsSymbol
      }, scopeId, attrs), {
        default: () => {
          var _a2;
          var _a;
          return [(_a2 = (_a = slots.default) == null ? void 0 : _a.call(slots)) != null ? _a2 : items.value.map((item) => {
            var _a3;
            var _a22;
            return (_a3 = (_a22 = slots.tab) == null ? void 0 : _a22.call(slots, {
              item
            })) != null ? _a3 : createVNode(VTab, mergeProps(item, {
              "key": item.text,
              "value": item.value
            }), {
              default: slots[`tab.${item.value}`] ? () => {
                var _a32;
                return (_a32 = slots[`tab.${item.value}`]) == null ? void 0 : _a32.call(slots, {
                  item
                });
              } : void 0
            });
          })];
        }
      }), hasWindow && createVNode(VTabsWindow, mergeProps({
        "modelValue": model.value,
        "onUpdate:modelValue": ($event) => model.value = $event,
        "key": "tabs-window"
      }, scopeId), {
        default: () => {
          var _a;
          return [items.value.map((item) => {
            var _a3;
            var _a2;
            return (_a3 = (_a2 = slots.item) == null ? void 0 : _a2.call(slots, {
              item
            })) != null ? _a3 : createVNode(VTabsWindowItem, {
              "value": item.value
            }, {
              default: () => {
                var _a32;
                return (_a32 = slots[`item.${item.value}`]) == null ? void 0 : _a32.call(slots, {
                  item
                });
              }
            });
          }), (_a = slots.window) == null ? void 0 : _a.call(slots)];
        }
      })]);
    });
    return {};
  }
});
const cpf = helpers.withMessage("CPF inv\xE1lido", (value) => {
  if (!value)
    return false;
  const cpf2 = value.replace(/[^\d]+/g, "");
  if (cpf2.length !== 11)
    return false;
  if (/^(\d)\1+$/.test(cpf2))
    return false;
  let add = 0;
  for (let i = 0; i < 9; i++) {
    add += parseInt(cpf2.charAt(i)) * (10 - i);
  }
  let rev = 11 - add % 11;
  if (rev === 10 || rev === 11)
    rev = 0;
  if (rev !== parseInt(cpf2.charAt(9)))
    return false;
  add = 0;
  for (let i = 0; i < 10; i++) {
    add += parseInt(cpf2.charAt(i)) * (11 - i);
  }
  rev = 11 - add % 11;
  if (rev === 10 || rev === 11)
    rev = 0;
  if (rev !== parseInt(cpf2.charAt(10)))
    return false;
  return true;
});
const _sfc_main$5 = {
  __name: "Dados",
  __ssrInlineRender: true,
  emits: ["saved"],
  async setup(__props, { emit: __emit }) {
    let __temp, __restore;
    const emit = __emit;
    const router = useRouter$1();
    const { $toast } = useNuxtApp();
    const config = useRuntimeConfig();
    config.public.createPessoaUrl;
    const updatePessoa = config.public.updatePessoaUrl;
    const estadoCivil = config.public.listarEstadoCivilUrl;
    const capacidadeCivil = config.public.listarCapacidadeCivilUrl;
    const cidades = config.public.listarCidadesUrl;
    const initialState = {
      nome: "",
      nome_pai: "",
      nome_mae: "",
      profissao: "",
      local_trabalho: "",
      data_nascimento: "",
      doc_identificacao: "",
      cpf_pai: "",
      cpf_mae: "",
      local_trabalho: "",
      tipo_pessoa: "FISICA",
      tabvalores_estadocivil_id: "",
      tabvalores_capacidadecivil_id: "",
      cidade_natural_id: "",
      cartorio_id: useCookie("user-data").value.cartorio_id,
      user_id: useCookie("user-data").value.usuario_id
    };
    const isEditMode = ref(false);
    const pessoaId = useCookie("pessoa-id");
    const state = reactive({
      ...initialState
    });
    function removeFormatting(value) {
      if (value) {
        return value.replace(/[.\-]/g, "");
      } else {
        value = null;
      }
    }
    const {
      data: dados,
      status,
      pending,
      error
    } = ([__temp, __restore] = withAsyncContext(async () => useLazyAsyncData("cliente-dados", async () => {
      const [estadoCivilItems, capacidadeCivilItems, cidadeNascimentoItems] = await Promise.all([
        $fetch(estadoCivil),
        $fetch(capacidadeCivil),
        $fetch(cidades)
      ]);
      return { estadoCivilItems, capacidadeCivilItems, cidadeNascimentoItems };
    })), __temp = await __temp, __restore(), __temp);
    const rules = {
      nome: {
        required: helpers.withMessage("O campo \xE9 obrigatorio", required)
      },
      nome_mae: {
        required: helpers.withMessage("O campo \xE9 obrigatorio", required)
      },
      doc_identificacao: {
        required: helpers.withMessage("O campo \xE9 obrigatorio", required),
        cpf
      },
      cpf_mae: {
        required: helpers.withMessage("O campo \xE9 obrigatorio", required),
        cpf
      }
    };
    const v$ = useVuelidate(rules, state);
    async function onSubmit() {
      emit("saved");
    }
    async function onUpdate() {
      const payload = { ...state };
      for (const key in payload) {
        if (payload[key] === "") {
          payload[key] = null;
        }
      }
      const payloadFormated = {
        ...payload,
        doc_identificacao: removeFormatting(state.doc_identificacao),
        cpf_mae: removeFormatting(state.cpf_mae)
      };
      await useFetch(
        `${updatePessoa}/${pessoaId.value}`,
        {
          method: "PUT",
          body: payloadFormated
        },
        "$fcbWHpl5XR"
      );
      $toast.success("Pessoa atualizada com sucesso!");
      router.push("/pessoas/registros");
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      const _directive_mask = resolveDirective("mask");
      _push(`<!--[-->`);
      if (unref(pending)) {
        _push(ssrRenderComponent(VProgressCircular, {
          class: "loading-spinner",
          indeterminate: "",
          size: "64"
        }, null, _parent));
      } else if (unref(error)) {
        _push(`<div data-v-eec6267a>${ssrInterpolate(unref(error).message)}</div>`);
      } else {
        _push(`<!---->`);
      }
      if (!unref(pending)) {
        _push(ssrRenderComponent(VContainer, { class: "mt-5" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(VRow, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(VCol, {
                      cols: "12",
                      md: "8"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(VTextField, {
                            modelValue: state.nome,
                            "onUpdate:modelValue": ($event) => state.nome = $event,
                            "error-messages": unref(v$).nome.$errors.map((e) => e.$message),
                            label: "Nome",
                            required: "",
                            onBlur: unref(v$).nome.$touch,
                            onInput: unref(v$).nome.$touch
                          }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(VTextField, {
                              modelValue: state.nome,
                              "onUpdate:modelValue": ($event) => state.nome = $event,
                              "error-messages": unref(v$).nome.$errors.map((e) => e.$message),
                              label: "Nome",
                              required: "",
                              onBlur: unref(v$).nome.$touch,
                              onInput: unref(v$).nome.$touch
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages", "onBlur", "onInput"])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(VCol, {
                      cols: "12",
                      md: "4"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(VTextField, mergeProps({
                            modelValue: state.doc_identificacao,
                            "onUpdate:modelValue": ($event) => state.doc_identificacao = $event,
                            "error-messages": unref(v$).doc_identificacao.$errors.map((e) => e.$message),
                            label: "CPF",
                            required: "",
                            onBlur: unref(v$).doc_identificacao.$touch,
                            onInput: unref(v$).doc_identificacao.$touch
                          }, ssrGetDirectiveProps(_ctx, _directive_mask, "###.###.###-##")), null, _parent4, _scopeId3));
                        } else {
                          return [
                            withDirectives(createVNode(VTextField, {
                              modelValue: state.doc_identificacao,
                              "onUpdate:modelValue": ($event) => state.doc_identificacao = $event,
                              "error-messages": unref(v$).doc_identificacao.$errors.map((e) => e.$message),
                              label: "CPF",
                              required: "",
                              onBlur: unref(v$).doc_identificacao.$touch,
                              onInput: unref(v$).doc_identificacao.$touch
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages", "onBlur", "onInput"]), [
                              [_directive_mask, "###.###.###-##"]
                            ])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(VCol, {
                        cols: "12",
                        md: "8"
                      }, {
                        default: withCtx(() => [
                          createVNode(VTextField, {
                            modelValue: state.nome,
                            "onUpdate:modelValue": ($event) => state.nome = $event,
                            "error-messages": unref(v$).nome.$errors.map((e) => e.$message),
                            label: "Nome",
                            required: "",
                            onBlur: unref(v$).nome.$touch,
                            onInput: unref(v$).nome.$touch
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages", "onBlur", "onInput"])
                        ]),
                        _: 1
                      }),
                      createVNode(VCol, {
                        cols: "12",
                        md: "4"
                      }, {
                        default: withCtx(() => [
                          withDirectives(createVNode(VTextField, {
                            modelValue: state.doc_identificacao,
                            "onUpdate:modelValue": ($event) => state.doc_identificacao = $event,
                            "error-messages": unref(v$).doc_identificacao.$errors.map((e) => e.$message),
                            label: "CPF",
                            required: "",
                            onBlur: unref(v$).doc_identificacao.$touch,
                            onInput: unref(v$).doc_identificacao.$touch
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages", "onBlur", "onInput"]), [
                            [_directive_mask, "###.###.###-##"]
                          ])
                        ]),
                        _: 1
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(VRow, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(VCol, {
                      cols: "12",
                      md: "4"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(VAutocomplete, {
                            modelValue: state.tabvalores_estadocivil_id,
                            "onUpdate:modelValue": ($event) => state.tabvalores_estadocivil_id = $event,
                            items: unref(dados).estadoCivilItems,
                            "item-title": "descricao",
                            "item-value": "id",
                            label: "Estado Civil"
                          }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(VAutocomplete, {
                              modelValue: state.tabvalores_estadocivil_id,
                              "onUpdate:modelValue": ($event) => state.tabvalores_estadocivil_id = $event,
                              items: unref(dados).estadoCivilItems,
                              "item-title": "descricao",
                              "item-value": "id",
                              label: "Estado Civil"
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(VCol, {
                      cols: "12",
                      md: "4"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(VTextField, {
                            modelValue: state.profissao,
                            "onUpdate:modelValue": ($event) => state.profissao = $event,
                            label: "Profiss\xE3o"
                          }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(VTextField, {
                              modelValue: state.profissao,
                              "onUpdate:modelValue": ($event) => state.profissao = $event,
                              label: "Profiss\xE3o"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(VCol, {
                      cols: "12",
                      md: "4"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(VTextField, {
                            modelValue: state.local_trabalho,
                            "onUpdate:modelValue": ($event) => state.local_trabalho = $event,
                            label: "Local de trabalho"
                          }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(VTextField, {
                              modelValue: state.local_trabalho,
                              "onUpdate:modelValue": ($event) => state.local_trabalho = $event,
                              label: "Local de trabalho"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(VCol, {
                        cols: "12",
                        md: "4"
                      }, {
                        default: withCtx(() => [
                          createVNode(VAutocomplete, {
                            modelValue: state.tabvalores_estadocivil_id,
                            "onUpdate:modelValue": ($event) => state.tabvalores_estadocivil_id = $event,
                            items: unref(dados).estadoCivilItems,
                            "item-title": "descricao",
                            "item-value": "id",
                            label: "Estado Civil"
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                        ]),
                        _: 1
                      }),
                      createVNode(VCol, {
                        cols: "12",
                        md: "4"
                      }, {
                        default: withCtx(() => [
                          createVNode(VTextField, {
                            modelValue: state.profissao,
                            "onUpdate:modelValue": ($event) => state.profissao = $event,
                            label: "Profiss\xE3o"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        _: 1
                      }),
                      createVNode(VCol, {
                        cols: "12",
                        md: "4"
                      }, {
                        default: withCtx(() => [
                          createVNode(VTextField, {
                            modelValue: state.local_trabalho,
                            "onUpdate:modelValue": ($event) => state.local_trabalho = $event,
                            label: "Local de trabalho"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        _: 1
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(VRow, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(VCol, {
                      cols: "12",
                      md: "4"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(VTextField, {
                            modelValue: state.data_nascimento,
                            "onUpdate:modelValue": ($event) => state.data_nascimento = $event,
                            type: "date",
                            "prepend-icon": "",
                            label: "Data de nascimento"
                          }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(VTextField, {
                              modelValue: state.data_nascimento,
                              "onUpdate:modelValue": ($event) => state.data_nascimento = $event,
                              type: "date",
                              "prepend-icon": "",
                              label: "Data de nascimento"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(VCol, {
                      cols: "12",
                      md: "4"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(VAutocomplete, {
                            modelValue: state.tabvalores_capacidadecivil_id,
                            "onUpdate:modelValue": ($event) => state.tabvalores_capacidadecivil_id = $event,
                            items: unref(dados).capacidadeCivilItems,
                            label: "Capacidade Civil",
                            "item-title": "descricao",
                            "item-value": "id"
                          }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(VAutocomplete, {
                              modelValue: state.tabvalores_capacidadecivil_id,
                              "onUpdate:modelValue": ($event) => state.tabvalores_capacidadecivil_id = $event,
                              items: unref(dados).capacidadeCivilItems,
                              label: "Capacidade Civil",
                              "item-title": "descricao",
                              "item-value": "id"
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(VCol, {
                      cols: "12",
                      md: "4"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(VAutocomplete, {
                            modelValue: state.cidade_natural_id,
                            "onUpdate:modelValue": ($event) => state.cidade_natural_id = $event,
                            items: unref(dados).cidadeNascimentoItems,
                            label: "Cidade de nascimento",
                            "item-title": "descricao",
                            "item-value": "id"
                          }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(VAutocomplete, {
                              modelValue: state.cidade_natural_id,
                              "onUpdate:modelValue": ($event) => state.cidade_natural_id = $event,
                              items: unref(dados).cidadeNascimentoItems,
                              label: "Cidade de nascimento",
                              "item-title": "descricao",
                              "item-value": "id"
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(VCol, {
                        cols: "12",
                        md: "4"
                      }, {
                        default: withCtx(() => [
                          createVNode(VTextField, {
                            modelValue: state.data_nascimento,
                            "onUpdate:modelValue": ($event) => state.data_nascimento = $event,
                            type: "date",
                            "prepend-icon": "",
                            label: "Data de nascimento"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        _: 1
                      }),
                      createVNode(VCol, {
                        cols: "12",
                        md: "4"
                      }, {
                        default: withCtx(() => [
                          createVNode(VAutocomplete, {
                            modelValue: state.tabvalores_capacidadecivil_id,
                            "onUpdate:modelValue": ($event) => state.tabvalores_capacidadecivil_id = $event,
                            items: unref(dados).capacidadeCivilItems,
                            label: "Capacidade Civil",
                            "item-title": "descricao",
                            "item-value": "id"
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                        ]),
                        _: 1
                      }),
                      createVNode(VCol, {
                        cols: "12",
                        md: "4"
                      }, {
                        default: withCtx(() => [
                          createVNode(VAutocomplete, {
                            modelValue: state.cidade_natural_id,
                            "onUpdate:modelValue": ($event) => state.cidade_natural_id = $event,
                            items: unref(dados).cidadeNascimentoItems,
                            label: "Cidade de nascimento",
                            "item-title": "descricao",
                            "item-value": "id"
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                        ]),
                        _: 1
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(VRow, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(VCol, {
                      cols: "12",
                      md: "4"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(VTextField, mergeProps({
                            modelValue: state.cpf_pai,
                            "onUpdate:modelValue": ($event) => state.cpf_pai = $event,
                            modelModifiers: { date: true },
                            label: "CPF do Pai"
                          }, ssrGetDirectiveProps(_ctx, _directive_mask, "###.###.###-##")), null, _parent4, _scopeId3));
                        } else {
                          return [
                            withDirectives(createVNode(VTextField, {
                              modelValue: state.cpf_pai,
                              "onUpdate:modelValue": ($event) => state.cpf_pai = $event,
                              modelModifiers: { date: true },
                              label: "CPF do Pai"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"]), [
                              [_directive_mask, "###.###.###-##"]
                            ])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(VCol, {
                      cols: "12",
                      md: "4"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(VTextField, {
                            modelValue: state.nome_pai,
                            "onUpdate:modelValue": ($event) => state.nome_pai = $event,
                            modelModifiers: { date: true },
                            label: "Nome do Pai"
                          }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(VTextField, {
                              modelValue: state.nome_pai,
                              "onUpdate:modelValue": ($event) => state.nome_pai = $event,
                              modelModifiers: { date: true },
                              label: "Nome do Pai"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(VCol, {
                        cols: "12",
                        md: "4"
                      }, {
                        default: withCtx(() => [
                          withDirectives(createVNode(VTextField, {
                            modelValue: state.cpf_pai,
                            "onUpdate:modelValue": ($event) => state.cpf_pai = $event,
                            modelModifiers: { date: true },
                            label: "CPF do Pai"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"]), [
                            [_directive_mask, "###.###.###-##"]
                          ])
                        ]),
                        _: 1
                      }),
                      createVNode(VCol, {
                        cols: "12",
                        md: "4"
                      }, {
                        default: withCtx(() => [
                          createVNode(VTextField, {
                            modelValue: state.nome_pai,
                            "onUpdate:modelValue": ($event) => state.nome_pai = $event,
                            modelModifiers: { date: true },
                            label: "Nome do Pai"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        _: 1
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(VRow, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(VCol, {
                      cols: "12",
                      md: "4"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(VTextField, mergeProps({
                            modelValue: state.cpf_mae,
                            "onUpdate:modelValue": ($event) => state.cpf_mae = $event,
                            modelModifiers: { date: true },
                            "error-messages": unref(v$).cpf_mae.$errors.map((e) => e.$message),
                            label: "CPF da M\xE3e",
                            required: "",
                            onBlur: unref(v$).cpf_mae.$touch,
                            onInput: unref(v$).cpf_mae.$touch
                          }, ssrGetDirectiveProps(_ctx, _directive_mask, "###.###.###-##")), null, _parent4, _scopeId3));
                        } else {
                          return [
                            withDirectives(createVNode(VTextField, {
                              modelValue: state.cpf_mae,
                              "onUpdate:modelValue": ($event) => state.cpf_mae = $event,
                              modelModifiers: { date: true },
                              "error-messages": unref(v$).cpf_mae.$errors.map((e) => e.$message),
                              label: "CPF da M\xE3e",
                              required: "",
                              onBlur: unref(v$).cpf_mae.$touch,
                              onInput: unref(v$).cpf_mae.$touch
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages", "onBlur", "onInput"]), [
                              [_directive_mask, "###.###.###-##"]
                            ])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(VCol, {
                      cols: "12",
                      md: "4"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(VTextField, {
                            modelValue: state.nome_mae,
                            "onUpdate:modelValue": ($event) => state.nome_mae = $event,
                            modelModifiers: { date: true },
                            "error-messages": unref(v$).nome_mae.$errors.map((e) => e.$message),
                            label: "Nome da M\xE3e",
                            required: "",
                            onBlur: unref(v$).nome_mae.$touch,
                            onInput: unref(v$).nome_mae.$touch
                          }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(VTextField, {
                              modelValue: state.nome_mae,
                              "onUpdate:modelValue": ($event) => state.nome_mae = $event,
                              modelModifiers: { date: true },
                              "error-messages": unref(v$).nome_mae.$errors.map((e) => e.$message),
                              label: "Nome da M\xE3e",
                              required: "",
                              onBlur: unref(v$).nome_mae.$touch,
                              onInput: unref(v$).nome_mae.$touch
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages", "onBlur", "onInput"])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(VCol, {
                        cols: "12",
                        md: "4"
                      }, {
                        default: withCtx(() => [
                          withDirectives(createVNode(VTextField, {
                            modelValue: state.cpf_mae,
                            "onUpdate:modelValue": ($event) => state.cpf_mae = $event,
                            modelModifiers: { date: true },
                            "error-messages": unref(v$).cpf_mae.$errors.map((e) => e.$message),
                            label: "CPF da M\xE3e",
                            required: "",
                            onBlur: unref(v$).cpf_mae.$touch,
                            onInput: unref(v$).cpf_mae.$touch
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages", "onBlur", "onInput"]), [
                            [_directive_mask, "###.###.###-##"]
                          ])
                        ]),
                        _: 1
                      }),
                      createVNode(VCol, {
                        cols: "12",
                        md: "4"
                      }, {
                        default: withCtx(() => [
                          createVNode(VTextField, {
                            modelValue: state.nome_mae,
                            "onUpdate:modelValue": ($event) => state.nome_mae = $event,
                            modelModifiers: { date: true },
                            "error-messages": unref(v$).nome_mae.$errors.map((e) => e.$message),
                            label: "Nome da M\xE3e",
                            required: "",
                            onBlur: unref(v$).nome_mae.$touch,
                            onInput: unref(v$).nome_mae.$touch
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages", "onBlur", "onInput"])
                        ]),
                        _: 1
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(VRow, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_NuxtLink, { to: "/pessoas/registros" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<img class="btn-pointer"${ssrRenderAttr("src", _imports_0)} alt="Sair" data-v-eec6267a${_scopeId3}>`);
                        } else {
                          return [
                            createVNode("img", {
                              class: "btn-pointer",
                              src: _imports_0,
                              alt: "Sair"
                            })
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(`<img class="btn-pointer"${ssrRenderAttr("src", _imports_3)} data-v-eec6267a${_scopeId2}>`);
                  } else {
                    return [
                      createVNode(_component_NuxtLink, { to: "/pessoas/registros" }, {
                        default: withCtx(() => [
                          createVNode("img", {
                            class: "btn-pointer",
                            src: _imports_0,
                            alt: "Sair"
                          })
                        ]),
                        _: 1
                      }),
                      createVNode("img", {
                        class: "btn-pointer",
                        src: _imports_3,
                        onClick: ($event) => isEditMode.value ? onUpdate() : onSubmit()
                      }, null, 8, ["onClick"])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(VRow, null, {
                  default: withCtx(() => [
                    createVNode(VCol, {
                      cols: "12",
                      md: "8"
                    }, {
                      default: withCtx(() => [
                        createVNode(VTextField, {
                          modelValue: state.nome,
                          "onUpdate:modelValue": ($event) => state.nome = $event,
                          "error-messages": unref(v$).nome.$errors.map((e) => e.$message),
                          label: "Nome",
                          required: "",
                          onBlur: unref(v$).nome.$touch,
                          onInput: unref(v$).nome.$touch
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages", "onBlur", "onInput"])
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, {
                      cols: "12",
                      md: "4"
                    }, {
                      default: withCtx(() => [
                        withDirectives(createVNode(VTextField, {
                          modelValue: state.doc_identificacao,
                          "onUpdate:modelValue": ($event) => state.doc_identificacao = $event,
                          "error-messages": unref(v$).doc_identificacao.$errors.map((e) => e.$message),
                          label: "CPF",
                          required: "",
                          onBlur: unref(v$).doc_identificacao.$touch,
                          onInput: unref(v$).doc_identificacao.$touch
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages", "onBlur", "onInput"]), [
                          [_directive_mask, "###.###.###-##"]
                        ])
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                createVNode(VRow, null, {
                  default: withCtx(() => [
                    createVNode(VCol, {
                      cols: "12",
                      md: "4"
                    }, {
                      default: withCtx(() => [
                        createVNode(VAutocomplete, {
                          modelValue: state.tabvalores_estadocivil_id,
                          "onUpdate:modelValue": ($event) => state.tabvalores_estadocivil_id = $event,
                          items: unref(dados).estadoCivilItems,
                          "item-title": "descricao",
                          "item-value": "id",
                          label: "Estado Civil"
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, {
                      cols: "12",
                      md: "4"
                    }, {
                      default: withCtx(() => [
                        createVNode(VTextField, {
                          modelValue: state.profissao,
                          "onUpdate:modelValue": ($event) => state.profissao = $event,
                          label: "Profiss\xE3o"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, {
                      cols: "12",
                      md: "4"
                    }, {
                      default: withCtx(() => [
                        createVNode(VTextField, {
                          modelValue: state.local_trabalho,
                          "onUpdate:modelValue": ($event) => state.local_trabalho = $event,
                          label: "Local de trabalho"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                createVNode(VRow, null, {
                  default: withCtx(() => [
                    createVNode(VCol, {
                      cols: "12",
                      md: "4"
                    }, {
                      default: withCtx(() => [
                        createVNode(VTextField, {
                          modelValue: state.data_nascimento,
                          "onUpdate:modelValue": ($event) => state.data_nascimento = $event,
                          type: "date",
                          "prepend-icon": "",
                          label: "Data de nascimento"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, {
                      cols: "12",
                      md: "4"
                    }, {
                      default: withCtx(() => [
                        createVNode(VAutocomplete, {
                          modelValue: state.tabvalores_capacidadecivil_id,
                          "onUpdate:modelValue": ($event) => state.tabvalores_capacidadecivil_id = $event,
                          items: unref(dados).capacidadeCivilItems,
                          label: "Capacidade Civil",
                          "item-title": "descricao",
                          "item-value": "id"
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, {
                      cols: "12",
                      md: "4"
                    }, {
                      default: withCtx(() => [
                        createVNode(VAutocomplete, {
                          modelValue: state.cidade_natural_id,
                          "onUpdate:modelValue": ($event) => state.cidade_natural_id = $event,
                          items: unref(dados).cidadeNascimentoItems,
                          label: "Cidade de nascimento",
                          "item-title": "descricao",
                          "item-value": "id"
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                createVNode(VRow, null, {
                  default: withCtx(() => [
                    createVNode(VCol, {
                      cols: "12",
                      md: "4"
                    }, {
                      default: withCtx(() => [
                        withDirectives(createVNode(VTextField, {
                          modelValue: state.cpf_pai,
                          "onUpdate:modelValue": ($event) => state.cpf_pai = $event,
                          modelModifiers: { date: true },
                          label: "CPF do Pai"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]), [
                          [_directive_mask, "###.###.###-##"]
                        ])
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, {
                      cols: "12",
                      md: "4"
                    }, {
                      default: withCtx(() => [
                        createVNode(VTextField, {
                          modelValue: state.nome_pai,
                          "onUpdate:modelValue": ($event) => state.nome_pai = $event,
                          modelModifiers: { date: true },
                          label: "Nome do Pai"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                createVNode(VRow, null, {
                  default: withCtx(() => [
                    createVNode(VCol, {
                      cols: "12",
                      md: "4"
                    }, {
                      default: withCtx(() => [
                        withDirectives(createVNode(VTextField, {
                          modelValue: state.cpf_mae,
                          "onUpdate:modelValue": ($event) => state.cpf_mae = $event,
                          modelModifiers: { date: true },
                          "error-messages": unref(v$).cpf_mae.$errors.map((e) => e.$message),
                          label: "CPF da M\xE3e",
                          required: "",
                          onBlur: unref(v$).cpf_mae.$touch,
                          onInput: unref(v$).cpf_mae.$touch
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages", "onBlur", "onInput"]), [
                          [_directive_mask, "###.###.###-##"]
                        ])
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, {
                      cols: "12",
                      md: "4"
                    }, {
                      default: withCtx(() => [
                        createVNode(VTextField, {
                          modelValue: state.nome_mae,
                          "onUpdate:modelValue": ($event) => state.nome_mae = $event,
                          modelModifiers: { date: true },
                          "error-messages": unref(v$).nome_mae.$errors.map((e) => e.$message),
                          label: "Nome da M\xE3e",
                          required: "",
                          onBlur: unref(v$).nome_mae.$touch,
                          onInput: unref(v$).nome_mae.$touch
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages", "onBlur", "onInput"])
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                createVNode(VRow, null, {
                  default: withCtx(() => [
                    createVNode(_component_NuxtLink, { to: "/pessoas/registros" }, {
                      default: withCtx(() => [
                        createVNode("img", {
                          class: "btn-pointer",
                          src: _imports_0,
                          alt: "Sair"
                        })
                      ]),
                      _: 1
                    }),
                    createVNode("img", {
                      class: "btn-pointer",
                      src: _imports_3,
                      onClick: ($event) => isEditMode.value ? onUpdate() : onSubmit()
                    }, null, 8, ["onClick"])
                  ]),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Dados.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["__scopeId", "data-v-eec6267a"]]);
const _sfc_main$4 = {
  __name: "Documentos",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    useNuxtApp();
    const config = useRuntimeConfig();
    const allTipos = config.public.listarTipoDocumentoUrl;
    const allUf = config.public.listarUfUrl;
    const allDoc = config.public.allPessoaDocApiUrl;
    config.public.createPessoaDocUrl;
    const state = reactive({
      tabvalores_tipodoc_id: "",
      emissor: "",
      validade: "",
      numero: "",
      data_emissao: "",
      data_vencimento: "",
      tabvalores_ufemissor_id: ""
    });
    const headers = [
      { title: "Tipo", value: "tabvalores_tipodoc_id" },
      { title: "N\xFAmero", value: "numero" },
      { title: "Emissor", value: "emissor" },
      {
        title: "UF",
        value: "tabvalores_ufemissor_id"
      },
      {
        title: "Emiss\xE3o",
        value: "data_emissao"
      },
      {
        title: "Validade",
        value: "data_vencimento"
      }
    ];
    const rules = {
      numero: {
        required: helpers.withMessage("O campo \xE9 obrigatorio", required)
      },
      emissor: {
        required: helpers.withMessage("O campo \xE9 obrigatorio", required)
      }
    };
    const v$ = useVuelidate(rules, state);
    const {
      data: documentos,
      pending
    } = ([__temp, __restore] = withAsyncContext(async () => useLazyAsyncData("cliente-documentos", async () => {
      const [tipoDocumentoItems, ufItems, pessoasDocsItems] = await Promise.all([
        $fetch(allTipos),
        $fetch(allUf),
        $fetch(allDoc)
      ]);
      return { tipoDocumentoItems, ufItems, pessoasDocsItems };
    })), __temp = await __temp, __restore(), __temp);
    async function onSubmit() {
      const payload = { ...state };
      for (const key in payload) {
        if (payload[key] === "") {
          payload[key] = null;
        }
      }
      const payloadFormated = {
        ...payload
      };
      console.log(payloadFormated);
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      if (!unref(pending)) {
        _push(ssrRenderComponent(VContainer, mergeProps({ class: "mt-5" }, _attrs), {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(VRow, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(VCol, { md: "2" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(VAutocomplete, {
                            modelValue: unref(state).tabvalores_tipodoc_id,
                            "onUpdate:modelValue": ($event) => unref(state).tabvalores_tipodoc_id = $event,
                            items: unref(documentos).tipoDocumentoItems,
                            label: "Tipo",
                            "item-title": "descricao",
                            "item-value": "id"
                          }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(VAutocomplete, {
                              modelValue: unref(state).tabvalores_tipodoc_id,
                              "onUpdate:modelValue": ($event) => unref(state).tabvalores_tipodoc_id = $event,
                              items: unref(documentos).tipoDocumentoItems,
                              label: "Tipo",
                              "item-title": "descricao",
                              "item-value": "id"
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(VCol, null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(VTextField, {
                            modelValue: unref(state).numero,
                            "onUpdate:modelValue": ($event) => unref(state).numero = $event,
                            "error-messages": unref(v$).numero.$errors.map((e) => e.$message),
                            label: "Numero",
                            required: "",
                            onBlur: unref(v$).numero.$touch,
                            onInput: unref(v$).numero.$touch
                          }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(VTextField, {
                              modelValue: unref(state).numero,
                              "onUpdate:modelValue": ($event) => unref(state).numero = $event,
                              "error-messages": unref(v$).numero.$errors.map((e) => e.$message),
                              label: "Numero",
                              required: "",
                              onBlur: unref(v$).numero.$touch,
                              onInput: unref(v$).numero.$touch
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages", "onBlur", "onInput"])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(VCol, { md: "2" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(VTextField, {
                            modelValue: unref(state).emissor,
                            "onUpdate:modelValue": ($event) => unref(state).emissor = $event,
                            "error-messages": unref(v$).emissor.$errors.map((e) => e.$message),
                            required: "",
                            onBlur: unref(v$).emissor.$touch,
                            onInput: unref(v$).emissor.$touch,
                            label: "Emissor"
                          }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(VTextField, {
                              modelValue: unref(state).emissor,
                              "onUpdate:modelValue": ($event) => unref(state).emissor = $event,
                              "error-messages": unref(v$).emissor.$errors.map((e) => e.$message),
                              required: "",
                              onBlur: unref(v$).emissor.$touch,
                              onInput: unref(v$).emissor.$touch,
                              label: "Emissor"
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages", "onBlur", "onInput"])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(VCol, null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(VAutocomplete, {
                            modelValue: unref(state).tabvalores_ufemissor_id,
                            "onUpdate:modelValue": ($event) => unref(state).tabvalores_ufemissor_id = $event,
                            items: unref(documentos).ufItems,
                            label: "UF",
                            "item-title": "descricao",
                            "item-value": "id"
                          }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(VAutocomplete, {
                              modelValue: unref(state).tabvalores_ufemissor_id,
                              "onUpdate:modelValue": ($event) => unref(state).tabvalores_ufemissor_id = $event,
                              items: unref(documentos).ufItems,
                              label: "UF",
                              "item-title": "descricao",
                              "item-value": "id"
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(VCol, { md: "2" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(VTextField, {
                            modelValue: unref(state).data_emissao,
                            "onUpdate:modelValue": ($event) => unref(state).data_emissao = $event,
                            type: "date",
                            label: "Emiss\xE3o"
                          }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(VTextField, {
                              modelValue: unref(state).data_emissao,
                              "onUpdate:modelValue": ($event) => unref(state).data_emissao = $event,
                              type: "date",
                              label: "Emiss\xE3o"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(VCol, { md: "2" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(VTextField, {
                            modelValue: unref(state).data_vencimento,
                            "onUpdate:modelValue": ($event) => unref(state).data_vencimento = $event,
                            type: "date",
                            label: "Validade"
                          }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(VTextField, {
                              modelValue: unref(state).data_vencimento,
                              "onUpdate:modelValue": ($event) => unref(state).data_vencimento = $event,
                              type: "date",
                              label: "Validade"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(`<div class="mt-3"${_scopeId2}><img style="${ssrRenderStyle({ "width": "40px", "height": "40px", "cursor": "pointer" })}"${ssrRenderAttr("src", _imports_0$1)} alt="novo"${_scopeId2}></div>`);
                  } else {
                    return [
                      createVNode(VCol, { md: "2" }, {
                        default: withCtx(() => [
                          createVNode(VAutocomplete, {
                            modelValue: unref(state).tabvalores_tipodoc_id,
                            "onUpdate:modelValue": ($event) => unref(state).tabvalores_tipodoc_id = $event,
                            items: unref(documentos).tipoDocumentoItems,
                            label: "Tipo",
                            "item-title": "descricao",
                            "item-value": "id"
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                        ]),
                        _: 1
                      }),
                      createVNode(VCol, null, {
                        default: withCtx(() => [
                          createVNode(VTextField, {
                            modelValue: unref(state).numero,
                            "onUpdate:modelValue": ($event) => unref(state).numero = $event,
                            "error-messages": unref(v$).numero.$errors.map((e) => e.$message),
                            label: "Numero",
                            required: "",
                            onBlur: unref(v$).numero.$touch,
                            onInput: unref(v$).numero.$touch
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages", "onBlur", "onInput"])
                        ]),
                        _: 1
                      }),
                      createVNode(VCol, { md: "2" }, {
                        default: withCtx(() => [
                          createVNode(VTextField, {
                            modelValue: unref(state).emissor,
                            "onUpdate:modelValue": ($event) => unref(state).emissor = $event,
                            "error-messages": unref(v$).emissor.$errors.map((e) => e.$message),
                            required: "",
                            onBlur: unref(v$).emissor.$touch,
                            onInput: unref(v$).emissor.$touch,
                            label: "Emissor"
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages", "onBlur", "onInput"])
                        ]),
                        _: 1
                      }),
                      createVNode(VCol, null, {
                        default: withCtx(() => [
                          createVNode(VAutocomplete, {
                            modelValue: unref(state).tabvalores_ufemissor_id,
                            "onUpdate:modelValue": ($event) => unref(state).tabvalores_ufemissor_id = $event,
                            items: unref(documentos).ufItems,
                            label: "UF",
                            "item-title": "descricao",
                            "item-value": "id"
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                        ]),
                        _: 1
                      }),
                      createVNode(VCol, { md: "2" }, {
                        default: withCtx(() => [
                          createVNode(VTextField, {
                            modelValue: unref(state).data_emissao,
                            "onUpdate:modelValue": ($event) => unref(state).data_emissao = $event,
                            type: "date",
                            label: "Emiss\xE3o"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        _: 1
                      }),
                      createVNode(VCol, { md: "2" }, {
                        default: withCtx(() => [
                          createVNode(VTextField, {
                            modelValue: unref(state).data_vencimento,
                            "onUpdate:modelValue": ($event) => unref(state).data_vencimento = $event,
                            type: "date",
                            label: "Validade"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        _: 1
                      }),
                      createVNode("div", { class: "mt-3" }, [
                        createVNode("img", {
                          style: { "width": "40px", "height": "40px", "cursor": "pointer" },
                          src: _imports_0$1,
                          alt: "novo",
                          onClick: onSubmit
                        })
                      ])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(VDataTable, {
                headers,
                items: unref(documentos).pessoasDocsItems,
                "item-key": "name"
              }, null, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_NuxtLink, { to: "/pessoas/registros" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<img class="btn-pointer"${ssrRenderAttr("src", _imports_0)} alt="Sair"${_scopeId2}>`);
                  } else {
                    return [
                      createVNode("img", {
                        class: "btn-pointer",
                        src: _imports_0,
                        alt: "Sair"
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(VRow, null, {
                  default: withCtx(() => [
                    createVNode(VCol, { md: "2" }, {
                      default: withCtx(() => [
                        createVNode(VAutocomplete, {
                          modelValue: unref(state).tabvalores_tipodoc_id,
                          "onUpdate:modelValue": ($event) => unref(state).tabvalores_tipodoc_id = $event,
                          items: unref(documentos).tipoDocumentoItems,
                          label: "Tipo",
                          "item-title": "descricao",
                          "item-value": "id"
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, null, {
                      default: withCtx(() => [
                        createVNode(VTextField, {
                          modelValue: unref(state).numero,
                          "onUpdate:modelValue": ($event) => unref(state).numero = $event,
                          "error-messages": unref(v$).numero.$errors.map((e) => e.$message),
                          label: "Numero",
                          required: "",
                          onBlur: unref(v$).numero.$touch,
                          onInput: unref(v$).numero.$touch
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages", "onBlur", "onInput"])
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, { md: "2" }, {
                      default: withCtx(() => [
                        createVNode(VTextField, {
                          modelValue: unref(state).emissor,
                          "onUpdate:modelValue": ($event) => unref(state).emissor = $event,
                          "error-messages": unref(v$).emissor.$errors.map((e) => e.$message),
                          required: "",
                          onBlur: unref(v$).emissor.$touch,
                          onInput: unref(v$).emissor.$touch,
                          label: "Emissor"
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages", "onBlur", "onInput"])
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, null, {
                      default: withCtx(() => [
                        createVNode(VAutocomplete, {
                          modelValue: unref(state).tabvalores_ufemissor_id,
                          "onUpdate:modelValue": ($event) => unref(state).tabvalores_ufemissor_id = $event,
                          items: unref(documentos).ufItems,
                          label: "UF",
                          "item-title": "descricao",
                          "item-value": "id"
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, { md: "2" }, {
                      default: withCtx(() => [
                        createVNode(VTextField, {
                          modelValue: unref(state).data_emissao,
                          "onUpdate:modelValue": ($event) => unref(state).data_emissao = $event,
                          type: "date",
                          label: "Emiss\xE3o"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, { md: "2" }, {
                      default: withCtx(() => [
                        createVNode(VTextField, {
                          modelValue: unref(state).data_vencimento,
                          "onUpdate:modelValue": ($event) => unref(state).data_vencimento = $event,
                          type: "date",
                          label: "Validade"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode("div", { class: "mt-3" }, [
                      createVNode("img", {
                        style: { "width": "40px", "height": "40px", "cursor": "pointer" },
                        src: _imports_0$1,
                        alt: "novo",
                        onClick: onSubmit
                      })
                    ])
                  ]),
                  _: 1
                }),
                createVNode(VDataTable, {
                  headers,
                  items: unref(documentos).pessoasDocsItems,
                  "item-key": "name"
                }, null, 8, ["items"]),
                createVNode(_component_NuxtLink, { to: "/pessoas/registros" }, {
                  default: withCtx(() => [
                    createVNode("img", {
                      class: "btn-pointer",
                      src: _imports_0,
                      alt: "Sair"
                    })
                  ]),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
    };
  }
};
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Documentos.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const _sfc_main$3 = {
  __name: "Endereco",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const { $toast } = useNuxtApp();
    const config = useRuntimeConfig();
    const allPaises = config.public.listarPaisUrl;
    const allEnderecos = config.public.getAllPessoaEnderecoUrl;
    const cidades = config.public.listarCidadesUrl;
    const criarEnderecos = config.public.createPessoaEnderecoUrl;
    const state = reactive({
      tabvalores_pais_id: "",
      cidade_id: "",
      codcep: "",
      logradouro: "",
      numero: "",
      bairro: "",
      data_vencimento: "",
      tabvalores_ufemissor_id: ""
    });
    const headers = [
      { title: "Pa\xEDs", value: "tabvalores_pais_id" },
      { title: "CEP", value: "codcep" },
      { title: "Endere\xE7o", value: "logradouro" },
      {
        title: "N*",
        value: "numero"
      },
      {
        title: "Bairro",
        value: "data_vencimento"
      },
      {
        title: "Cidade",
        value: " tabvalores_ufemissor_id"
      }
    ];
    const rules = {
      numero: {
        required: helpers.withMessage("O campo \xE9 obrigatorio", required)
      },
      bairro: {
        required: helpers.withMessage("O campo \xE9 obrigatorio", required)
      },
      logradouro: {
        required: helpers.withMessage("O campo \xE9 obrigatorio", required)
      },
      codcep: {
        required: helpers.withMessage("O campo \xE9 obrigatorio e precisa de 8 digitos", required)
      }
    };
    const v$ = useVuelidate(rules, state);
    const {
      data: enderecos,
      status,
      pending
    } = ([__temp, __restore] = withAsyncContext(async () => useLazyAsyncData("cliente-enderecos", async () => {
      const [paisItems, enderecosItems, cidadesItems] = await Promise.all([
        $fetch(allPaises),
        $fetch(allEnderecos),
        $fetch(cidades)
      ]);
      return { paisItems, enderecosItems, cidadesItems };
    })), __temp = await __temp, __restore(), __temp);
    async function onSubmit() {
      if (await v$.value.$validate()) {
        const payload = { ...state };
        for (const key in payload) {
          if (payload[key] === "") {
            payload[key] = null;
          }
        }
        const payloadFormated = {
          ...payload
        };
        const { data, error, status: status2 } = await useFetch(
          criarEnderecos,
          {
            method: "POST",
            body: payloadFormated
          },
          "$xTfPNGciav"
        );
        if (status2.value === "error" && error.value.statusCode === 500) {
          $toast.error("Erro ao cadastrar endere\xE7o,falta de id obrigatorios.");
        } else {
          $toast.success("Endere\xE7o cadastrado com sucesso!");
        }
      } else {
        $toast.error("Erro ao cadastrar Endere\xE7o, preencha os campos obrigatorios.");
      }
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      const _directive_mask = resolveDirective("mask");
      if (!unref(pending)) {
        _push(ssrRenderComponent(VContainer, mergeProps({ class: "mt-5" }, _attrs), {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(VRow, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(VCol, { md: "2" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(VAutocomplete, {
                            modelValue: unref(state).tabvalores_pais_id,
                            "onUpdate:modelValue": ($event) => unref(state).tabvalores_pais_id = $event,
                            items: unref(enderecos).paisItems,
                            label: "Pa\xEDs",
                            "item-title": "descricao",
                            "item-value": "id"
                          }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(VAutocomplete, {
                              modelValue: unref(state).tabvalores_pais_id,
                              "onUpdate:modelValue": ($event) => unref(state).tabvalores_pais_id = $event,
                              items: unref(enderecos).paisItems,
                              label: "Pa\xEDs",
                              "item-title": "descricao",
                              "item-value": "id"
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(VCol, null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(VTextField, mergeProps({
                            modelValue: unref(state).codcep,
                            "onUpdate:modelValue": ($event) => unref(state).codcep = $event,
                            "error-messages": unref(v$).codcep.$errors.map((e) => e.$message),
                            required: "",
                            onBlur: unref(v$).codcep.$touch,
                            onInput: unref(v$).codcep.$touch,
                            label: "CEP"
                          }, ssrGetDirectiveProps(_ctx, _directive_mask, "########")), null, _parent4, _scopeId3));
                        } else {
                          return [
                            withDirectives(createVNode(VTextField, {
                              modelValue: unref(state).codcep,
                              "onUpdate:modelValue": ($event) => unref(state).codcep = $event,
                              "error-messages": unref(v$).codcep.$errors.map((e) => e.$message),
                              required: "",
                              onBlur: unref(v$).codcep.$touch,
                              onInput: unref(v$).codcep.$touch,
                              label: "CEP"
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages", "onBlur", "onInput"]), [
                              [_directive_mask, "########"]
                            ])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(VCol, { md: "2" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(VTextField, {
                            modelValue: unref(state).logradouro,
                            "onUpdate:modelValue": ($event) => unref(state).logradouro = $event,
                            label: "Endere\xE7o",
                            "error-messages": unref(v$).logradouro.$errors.map((e) => e.$message),
                            required: "",
                            onBlur: unref(v$).logradouro.$touch,
                            onInput: unref(v$).logradouro.$touch
                          }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(VTextField, {
                              modelValue: unref(state).logradouro,
                              "onUpdate:modelValue": ($event) => unref(state).logradouro = $event,
                              label: "Endere\xE7o",
                              "error-messages": unref(v$).logradouro.$errors.map((e) => e.$message),
                              required: "",
                              onBlur: unref(v$).logradouro.$touch,
                              onInput: unref(v$).logradouro.$touch
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages", "onBlur", "onInput"])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(VCol, { md: "1" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(VTextField, {
                            modelValue: unref(state).numero,
                            "onUpdate:modelValue": ($event) => unref(state).numero = $event,
                            "error-messages": unref(v$).numero.$errors.map((e) => e.$message),
                            required: "",
                            onBlur: unref(v$).numero.$touch,
                            onInput: unref(v$).numero.$touch,
                            label: "N*"
                          }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(VTextField, {
                              modelValue: unref(state).numero,
                              "onUpdate:modelValue": ($event) => unref(state).numero = $event,
                              "error-messages": unref(v$).numero.$errors.map((e) => e.$message),
                              required: "",
                              onBlur: unref(v$).numero.$touch,
                              onInput: unref(v$).numero.$touch,
                              label: "N*"
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages", "onBlur", "onInput"])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(VCol, { md: "2" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(VTextField, {
                            modelValue: unref(state).bairro,
                            "onUpdate:modelValue": ($event) => unref(state).bairro = $event,
                            "error-messages": unref(v$).bairro.$errors.map((e) => e.$message),
                            required: "",
                            onBlur: unref(v$).bairro.$touch,
                            onInput: unref(v$).bairro.$touch,
                            label: "Bairro"
                          }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(VTextField, {
                              modelValue: unref(state).bairro,
                              "onUpdate:modelValue": ($event) => unref(state).bairro = $event,
                              "error-messages": unref(v$).bairro.$errors.map((e) => e.$message),
                              required: "",
                              onBlur: unref(v$).bairro.$touch,
                              onInput: unref(v$).bairro.$touch,
                              label: "Bairro"
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages", "onBlur", "onInput"])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(VCol, { md: "2" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(VAutocomplete, {
                            modelValue: unref(state).cidade_id,
                            "onUpdate:modelValue": ($event) => unref(state).cidade_id = $event,
                            items: unref(enderecos).cidadesItems,
                            label: "Cidade",
                            "item-title": "descricao",
                            "item-value": "id"
                          }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(VAutocomplete, {
                              modelValue: unref(state).cidade_id,
                              "onUpdate:modelValue": ($event) => unref(state).cidade_id = $event,
                              items: unref(enderecos).cidadesItems,
                              label: "Cidade",
                              "item-title": "descricao",
                              "item-value": "id"
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(`<div class="mt-3"${_scopeId2}><img style="${ssrRenderStyle({ "width": "40px", "height": "40px", "cursor": "pointer" })}"${ssrRenderAttr("src", _imports_0$1)} alt="novo"${_scopeId2}></div>`);
                  } else {
                    return [
                      createVNode(VCol, { md: "2" }, {
                        default: withCtx(() => [
                          createVNode(VAutocomplete, {
                            modelValue: unref(state).tabvalores_pais_id,
                            "onUpdate:modelValue": ($event) => unref(state).tabvalores_pais_id = $event,
                            items: unref(enderecos).paisItems,
                            label: "Pa\xEDs",
                            "item-title": "descricao",
                            "item-value": "id"
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                        ]),
                        _: 1
                      }),
                      createVNode(VCol, null, {
                        default: withCtx(() => [
                          withDirectives(createVNode(VTextField, {
                            modelValue: unref(state).codcep,
                            "onUpdate:modelValue": ($event) => unref(state).codcep = $event,
                            "error-messages": unref(v$).codcep.$errors.map((e) => e.$message),
                            required: "",
                            onBlur: unref(v$).codcep.$touch,
                            onInput: unref(v$).codcep.$touch,
                            label: "CEP"
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages", "onBlur", "onInput"]), [
                            [_directive_mask, "########"]
                          ])
                        ]),
                        _: 1
                      }),
                      createVNode(VCol, { md: "2" }, {
                        default: withCtx(() => [
                          createVNode(VTextField, {
                            modelValue: unref(state).logradouro,
                            "onUpdate:modelValue": ($event) => unref(state).logradouro = $event,
                            label: "Endere\xE7o",
                            "error-messages": unref(v$).logradouro.$errors.map((e) => e.$message),
                            required: "",
                            onBlur: unref(v$).logradouro.$touch,
                            onInput: unref(v$).logradouro.$touch
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages", "onBlur", "onInput"])
                        ]),
                        _: 1
                      }),
                      createVNode(VCol, { md: "1" }, {
                        default: withCtx(() => [
                          createVNode(VTextField, {
                            modelValue: unref(state).numero,
                            "onUpdate:modelValue": ($event) => unref(state).numero = $event,
                            "error-messages": unref(v$).numero.$errors.map((e) => e.$message),
                            required: "",
                            onBlur: unref(v$).numero.$touch,
                            onInput: unref(v$).numero.$touch,
                            label: "N*"
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages", "onBlur", "onInput"])
                        ]),
                        _: 1
                      }),
                      createVNode(VCol, { md: "2" }, {
                        default: withCtx(() => [
                          createVNode(VTextField, {
                            modelValue: unref(state).bairro,
                            "onUpdate:modelValue": ($event) => unref(state).bairro = $event,
                            "error-messages": unref(v$).bairro.$errors.map((e) => e.$message),
                            required: "",
                            onBlur: unref(v$).bairro.$touch,
                            onInput: unref(v$).bairro.$touch,
                            label: "Bairro"
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages", "onBlur", "onInput"])
                        ]),
                        _: 1
                      }),
                      createVNode(VCol, { md: "2" }, {
                        default: withCtx(() => [
                          createVNode(VAutocomplete, {
                            modelValue: unref(state).cidade_id,
                            "onUpdate:modelValue": ($event) => unref(state).cidade_id = $event,
                            items: unref(enderecos).cidadesItems,
                            label: "Cidade",
                            "item-title": "descricao",
                            "item-value": "id"
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                        ]),
                        _: 1
                      }),
                      createVNode("div", { class: "mt-3" }, [
                        createVNode("img", {
                          style: { "width": "40px", "height": "40px", "cursor": "pointer" },
                          src: _imports_0$1,
                          alt: "novo",
                          onClick: onSubmit
                        })
                      ])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(VDataTable, {
                headers,
                items: unref(enderecos).enderecosItems,
                "item-key": "name"
              }, null, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_NuxtLink, { to: "/pessoas/registros" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<img class="btn-pointer"${ssrRenderAttr("src", _imports_0)} alt="Sair"${_scopeId2}>`);
                  } else {
                    return [
                      createVNode("img", {
                        class: "btn-pointer",
                        src: _imports_0,
                        alt: "Sair"
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(VRow, null, {
                  default: withCtx(() => [
                    createVNode(VCol, { md: "2" }, {
                      default: withCtx(() => [
                        createVNode(VAutocomplete, {
                          modelValue: unref(state).tabvalores_pais_id,
                          "onUpdate:modelValue": ($event) => unref(state).tabvalores_pais_id = $event,
                          items: unref(enderecos).paisItems,
                          label: "Pa\xEDs",
                          "item-title": "descricao",
                          "item-value": "id"
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, null, {
                      default: withCtx(() => [
                        withDirectives(createVNode(VTextField, {
                          modelValue: unref(state).codcep,
                          "onUpdate:modelValue": ($event) => unref(state).codcep = $event,
                          "error-messages": unref(v$).codcep.$errors.map((e) => e.$message),
                          required: "",
                          onBlur: unref(v$).codcep.$touch,
                          onInput: unref(v$).codcep.$touch,
                          label: "CEP"
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages", "onBlur", "onInput"]), [
                          [_directive_mask, "########"]
                        ])
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, { md: "2" }, {
                      default: withCtx(() => [
                        createVNode(VTextField, {
                          modelValue: unref(state).logradouro,
                          "onUpdate:modelValue": ($event) => unref(state).logradouro = $event,
                          label: "Endere\xE7o",
                          "error-messages": unref(v$).logradouro.$errors.map((e) => e.$message),
                          required: "",
                          onBlur: unref(v$).logradouro.$touch,
                          onInput: unref(v$).logradouro.$touch
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages", "onBlur", "onInput"])
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, { md: "1" }, {
                      default: withCtx(() => [
                        createVNode(VTextField, {
                          modelValue: unref(state).numero,
                          "onUpdate:modelValue": ($event) => unref(state).numero = $event,
                          "error-messages": unref(v$).numero.$errors.map((e) => e.$message),
                          required: "",
                          onBlur: unref(v$).numero.$touch,
                          onInput: unref(v$).numero.$touch,
                          label: "N*"
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages", "onBlur", "onInput"])
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, { md: "2" }, {
                      default: withCtx(() => [
                        createVNode(VTextField, {
                          modelValue: unref(state).bairro,
                          "onUpdate:modelValue": ($event) => unref(state).bairro = $event,
                          "error-messages": unref(v$).bairro.$errors.map((e) => e.$message),
                          required: "",
                          onBlur: unref(v$).bairro.$touch,
                          onInput: unref(v$).bairro.$touch,
                          label: "Bairro"
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages", "onBlur", "onInput"])
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, { md: "2" }, {
                      default: withCtx(() => [
                        createVNode(VAutocomplete, {
                          modelValue: unref(state).cidade_id,
                          "onUpdate:modelValue": ($event) => unref(state).cidade_id = $event,
                          items: unref(enderecos).cidadesItems,
                          label: "Cidade",
                          "item-title": "descricao",
                          "item-value": "id"
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                      ]),
                      _: 1
                    }),
                    createVNode("div", { class: "mt-3" }, [
                      createVNode("img", {
                        style: { "width": "40px", "height": "40px", "cursor": "pointer" },
                        src: _imports_0$1,
                        alt: "novo",
                        onClick: onSubmit
                      })
                    ])
                  ]),
                  _: 1
                }),
                createVNode(VDataTable, {
                  headers,
                  items: unref(enderecos).enderecosItems,
                  "item-key": "name"
                }, null, 8, ["items"]),
                createVNode(_component_NuxtLink, { to: "/pessoas/registros" }, {
                  default: withCtx(() => [
                    createVNode("img", {
                      class: "btn-pointer",
                      src: _imports_0,
                      alt: "Sair"
                    })
                  ]),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
    };
  }
};
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Endereco.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = {
  __name: "Biometria",
  __ssrInlineRender: true,
  setup(__props) {
    const video = ref(null);
    const devices = ref([]);
    const selectedDeviceId = ref("");
    const isDialogActive = ref(false);
    const zoomLevel = ref(1);
    const tokenCookie = useCookie("auth_token");
    const token = tokenCookie.value;
    const pessoaNome = useCookie("user-data").value;
    const nomePessoa = pessoaNome.nome;
    const config = useRuntimeConfig();
    const enviarFoto = config.public.minioUploadFaceIdUrl;
    const { $toast } = useNuxtApp();
    const updateDevices = async () => {
      const mediaDevices = await (void 0).mediaDevices.enumerateDevices();
      devices.value = mediaDevices.filter((device) => device.kind === "videoinput").map((device) => ({
        deviceId: device.deviceId,
        label: device.label || `Camera ${devices.value.length + 1}`
      }));
    };
    const openDialog = async () => {
      isDialogActive.value = true;
      try {
        await (void 0).mediaDevices.getUserMedia({ video: true });
        await updateDevices();
      } catch (error) {
        console.error("Erro ao acessar dispositivos de m\xEDdia:", error);
      }
    };
    const closeDialog = () => {
      isDialogActive.value = false;
      const stream = video.value.srcObject;
      if (stream) {
        const tracks = stream.getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
    const startVideo = async () => {
      if (selectedDeviceId.value) {
        const stream = await (void 0).mediaDevices.getUserMedia({
          video: { deviceId: { exact: selectedDeviceId.value } }
        });
        video.value.srcObject = stream;
      }
    };
    const handleCapture = async () => {
      const canvas = (void 0).createElement("canvas");
      const context = canvas.getContext("2d");
      const width = video.value.videoWidth;
      const height = video.value.videoHeight;
      const scaledWidth = width * zoomLevel.value;
      const scaledHeight = height * zoomLevel.value;
      const offsetX = (width - scaledWidth) / 2;
      const offsetY = (height - scaledHeight) / 2;
      canvas.width = width;
      canvas.height = height;
      context.drawImage(
        video.value,
        offsetX,
        offsetY,
        scaledWidth,
        scaledHeight
      );
      canvas.toBlob(async (blob) => {
        const formData = new FormData();
        formData.append("file", blob, `${nomePessoa}.jpg`);
        formData.append("pessoa_token", token);
        const { status } = await useFetch(enviarFoto, {
          method: "POST",
          body: formData
        }, "$Rc7uHa9zmE");
        if (status.value === "success") {
          $toast.success("Imagem enviada!");
          closeDialog();
        } else {
          $toast.error("Erro ao enviar imagem para o sistema.");
        }
      }, "image/jpeg");
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(`<!--[-->`);
      _push(ssrRenderComponent(VRow, { class: "d-flex align-items-center justify-space-between" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VCol, { cols: "auto" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VImg, {
                    src: _imports_0$2,
                    width: 500,
                    class: "mr-4"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VImg, {
                      src: _imports_0$2,
                      width: 500,
                      class: "mr-4"
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(VSpacer, null, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(VCol, { cols: "auto" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VDialog, {
                    "max-width": "700",
                    modelValue: unref(isDialogActive),
                    "onUpdate:modelValue": ($event) => isRef(isDialogActive) ? isDialogActive.value = $event : null
                  }, {
                    activator: withCtx(({ props: activatorProps }, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VBtn, mergeProps(activatorProps, {
                          variant: "outlined",
                          style: { "width": "300px", "height": "300px" },
                          onClick: openDialog
                        }), {
                          default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<img${ssrRenderAttr("src", _imports_1)}${_scopeId4}>`);
                            } else {
                              return [
                                createVNode("img", { src: _imports_1 })
                              ];
                            }
                          }),
                          _: 2
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VBtn, mergeProps(activatorProps, {
                            variant: "outlined",
                            style: { "width": "300px", "height": "300px" },
                            onClick: openDialog
                          }), {
                            default: withCtx(() => [
                              createVNode("img", { src: _imports_1 })
                            ]),
                            _: 2
                          }, 1040)
                        ];
                      }
                    }),
                    default: withCtx(({ isActive }, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VCard, { title: "Biometria" }, {
                          default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VRow, null, {
                                default: withCtx((_4, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(VCol, null, {
                                      default: withCtx((_5, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(VSelect, {
                                            items: unref(devices),
                                            modelValue: unref(selectedDeviceId),
                                            "onUpdate:modelValue": ($event) => isRef(selectedDeviceId) ? selectedDeviceId.value = $event : null,
                                            "item-title": "label",
                                            "item-value": "deviceId",
                                            label: "Selecionar Webcam"
                                          }, null, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(VSelect, {
                                              items: unref(devices),
                                              modelValue: unref(selectedDeviceId),
                                              "onUpdate:modelValue": ($event) => isRef(selectedDeviceId) ? selectedDeviceId.value = $event : null,
                                              "item-title": "label",
                                              "item-value": "deviceId",
                                              label: "Selecionar Webcam"
                                            }, null, 8, ["items", "modelValue", "onUpdate:modelValue"])
                                          ];
                                        }
                                      }),
                                      _: 2
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(VCol, null, {
                                        default: withCtx(() => [
                                          createVNode(VSelect, {
                                            items: unref(devices),
                                            modelValue: unref(selectedDeviceId),
                                            "onUpdate:modelValue": ($event) => isRef(selectedDeviceId) ? selectedDeviceId.value = $event : null,
                                            "item-title": "label",
                                            "item-value": "deviceId",
                                            label: "Selecionar Webcam"
                                          }, null, 8, ["items", "modelValue", "onUpdate:modelValue"])
                                        ]),
                                        _: 1
                                      })
                                    ];
                                  }
                                }),
                                _: 2
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(VRow, null, {
                                default: withCtx((_4, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(VCol, null, {
                                      default: withCtx((_5, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(VBtn, { onClick: startVideo }, {
                                            default: withCtx((_6, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(`Exibir`);
                                              } else {
                                                return [
                                                  createTextVNode("Exibir")
                                                ];
                                              }
                                            }),
                                            _: 2
                                          }, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(VBtn, { onClick: startVideo }, {
                                              default: withCtx(() => [
                                                createTextVNode("Exibir")
                                              ]),
                                              _: 1
                                            })
                                          ];
                                        }
                                      }),
                                      _: 2
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(VCol, null, {
                                        default: withCtx(() => [
                                          createVNode(VBtn, { onClick: startVideo }, {
                                            default: withCtx(() => [
                                              createTextVNode("Exibir")
                                            ]),
                                            _: 1
                                          })
                                        ]),
                                        _: 1
                                      })
                                    ];
                                  }
                                }),
                                _: 2
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(VRow, null, {
                                default: withCtx((_4, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(VContainer, { style: { "overflow": "hidden" } }, {
                                      default: withCtx((_5, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(VCol, null, {
                                            default: withCtx((_6, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(`<video class="ml-3" width="640" height="480" autoplay style="${ssrRenderStyle({ transform: `scale(${unref(zoomLevel)})`, transformOrigin: "center center" })}"${_scopeId7}></video>`);
                                              } else {
                                                return [
                                                  createVNode("video", {
                                                    class: "ml-3",
                                                    ref_key: "video",
                                                    ref: video,
                                                    width: "640",
                                                    height: "480",
                                                    autoplay: "",
                                                    style: { transform: `scale(${unref(zoomLevel)})`, transformOrigin: "center center" }
                                                  }, null, 4)
                                                ];
                                              }
                                            }),
                                            _: 2
                                          }, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(VCol, null, {
                                              default: withCtx(() => [
                                                createVNode("video", {
                                                  class: "ml-3",
                                                  ref_key: "video",
                                                  ref: video,
                                                  width: "640",
                                                  height: "480",
                                                  autoplay: "",
                                                  style: { transform: `scale(${unref(zoomLevel)})`, transformOrigin: "center center" }
                                                }, null, 4)
                                              ]),
                                              _: 1
                                            })
                                          ];
                                        }
                                      }),
                                      _: 2
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(VContainer, { style: { "overflow": "hidden" } }, {
                                        default: withCtx(() => [
                                          createVNode(VCol, null, {
                                            default: withCtx(() => [
                                              createVNode("video", {
                                                class: "ml-3",
                                                ref_key: "video",
                                                ref: video,
                                                width: "640",
                                                height: "480",
                                                autoplay: "",
                                                style: { transform: `scale(${unref(zoomLevel)})`, transformOrigin: "center center" }
                                              }, null, 4)
                                            ]),
                                            _: 1
                                          })
                                        ]),
                                        _: 1
                                      })
                                    ];
                                  }
                                }),
                                _: 2
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(VContainer, null, {
                                default: withCtx((_4, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(VSlider, {
                                      modelValue: unref(zoomLevel),
                                      "onUpdate:modelValue": ($event) => isRef(zoomLevel) ? zoomLevel.value = $event : null,
                                      min: 1,
                                      max: 3,
                                      step: "0.1",
                                      label: "Zoom"
                                    }, null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(VSlider, {
                                        modelValue: unref(zoomLevel),
                                        "onUpdate:modelValue": ($event) => isRef(zoomLevel) ? zoomLevel.value = $event : null,
                                        min: 1,
                                        max: 3,
                                        step: "0.1",
                                        label: "Zoom"
                                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                    ];
                                  }
                                }),
                                _: 2
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(VRow, { class: "mt-10 justify-space-around" }, {
                                default: withCtx((_4, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`<div${_scopeId5}><img style="${ssrRenderStyle({ "cursor": "pointer" })}"${ssrRenderAttr("src", _imports_0)} alt="Excluir"${_scopeId5}></div><div${_scopeId5}><img style="${ssrRenderStyle({ "cursor": "pointer" })}"${ssrRenderAttr("src", _imports_3)} alt="Salvar"${_scopeId5}></div>`);
                                  } else {
                                    return [
                                      createVNode("div", { onClick: closeDialog }, [
                                        createVNode("img", {
                                          style: { "cursor": "pointer" },
                                          src: _imports_0,
                                          alt: "Excluir"
                                        })
                                      ]),
                                      createVNode("div", { onClick: handleCapture }, [
                                        createVNode("img", {
                                          style: { "cursor": "pointer" },
                                          src: _imports_3,
                                          alt: "Salvar"
                                        })
                                      ])
                                    ];
                                  }
                                }),
                                _: 2
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(VRow, null, {
                                  default: withCtx(() => [
                                    createVNode(VCol, null, {
                                      default: withCtx(() => [
                                        createVNode(VSelect, {
                                          items: unref(devices),
                                          modelValue: unref(selectedDeviceId),
                                          "onUpdate:modelValue": ($event) => isRef(selectedDeviceId) ? selectedDeviceId.value = $event : null,
                                          "item-title": "label",
                                          "item-value": "deviceId",
                                          label: "Selecionar Webcam"
                                        }, null, 8, ["items", "modelValue", "onUpdate:modelValue"])
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }),
                                createVNode(VRow, null, {
                                  default: withCtx(() => [
                                    createVNode(VCol, null, {
                                      default: withCtx(() => [
                                        createVNode(VBtn, { onClick: startVideo }, {
                                          default: withCtx(() => [
                                            createTextVNode("Exibir")
                                          ]),
                                          _: 1
                                        })
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }),
                                createVNode(VRow, null, {
                                  default: withCtx(() => [
                                    createVNode(VContainer, { style: { "overflow": "hidden" } }, {
                                      default: withCtx(() => [
                                        createVNode(VCol, null, {
                                          default: withCtx(() => [
                                            createVNode("video", {
                                              class: "ml-3",
                                              ref_key: "video",
                                              ref: video,
                                              width: "640",
                                              height: "480",
                                              autoplay: "",
                                              style: { transform: `scale(${unref(zoomLevel)})`, transformOrigin: "center center" }
                                            }, null, 4)
                                          ]),
                                          _: 1
                                        })
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }),
                                createVNode(VContainer, null, {
                                  default: withCtx(() => [
                                    createVNode(VSlider, {
                                      modelValue: unref(zoomLevel),
                                      "onUpdate:modelValue": ($event) => isRef(zoomLevel) ? zoomLevel.value = $event : null,
                                      min: 1,
                                      max: 3,
                                      step: "0.1",
                                      label: "Zoom"
                                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                  ]),
                                  _: 1
                                }),
                                createVNode(VRow, { class: "mt-10 justify-space-around" }, {
                                  default: withCtx(() => [
                                    createVNode("div", { onClick: closeDialog }, [
                                      createVNode("img", {
                                        style: { "cursor": "pointer" },
                                        src: _imports_0,
                                        alt: "Excluir"
                                      })
                                    ]),
                                    createVNode("div", { onClick: handleCapture }, [
                                      createVNode("img", {
                                        style: { "cursor": "pointer" },
                                        src: _imports_3,
                                        alt: "Salvar"
                                      })
                                    ])
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 2
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VCard, { title: "Biometria" }, {
                            default: withCtx(() => [
                              createVNode(VRow, null, {
                                default: withCtx(() => [
                                  createVNode(VCol, null, {
                                    default: withCtx(() => [
                                      createVNode(VSelect, {
                                        items: unref(devices),
                                        modelValue: unref(selectedDeviceId),
                                        "onUpdate:modelValue": ($event) => isRef(selectedDeviceId) ? selectedDeviceId.value = $event : null,
                                        "item-title": "label",
                                        "item-value": "deviceId",
                                        label: "Selecionar Webcam"
                                      }, null, 8, ["items", "modelValue", "onUpdate:modelValue"])
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }),
                              createVNode(VRow, null, {
                                default: withCtx(() => [
                                  createVNode(VCol, null, {
                                    default: withCtx(() => [
                                      createVNode(VBtn, { onClick: startVideo }, {
                                        default: withCtx(() => [
                                          createTextVNode("Exibir")
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }),
                              createVNode(VRow, null, {
                                default: withCtx(() => [
                                  createVNode(VContainer, { style: { "overflow": "hidden" } }, {
                                    default: withCtx(() => [
                                      createVNode(VCol, null, {
                                        default: withCtx(() => [
                                          createVNode("video", {
                                            class: "ml-3",
                                            ref_key: "video",
                                            ref: video,
                                            width: "640",
                                            height: "480",
                                            autoplay: "",
                                            style: { transform: `scale(${unref(zoomLevel)})`, transformOrigin: "center center" }
                                          }, null, 4)
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }),
                              createVNode(VContainer, null, {
                                default: withCtx(() => [
                                  createVNode(VSlider, {
                                    modelValue: unref(zoomLevel),
                                    "onUpdate:modelValue": ($event) => isRef(zoomLevel) ? zoomLevel.value = $event : null,
                                    min: 1,
                                    max: 3,
                                    step: "0.1",
                                    label: "Zoom"
                                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                ]),
                                _: 1
                              }),
                              createVNode(VRow, { class: "mt-10 justify-space-around" }, {
                                default: withCtx(() => [
                                  createVNode("div", { onClick: closeDialog }, [
                                    createVNode("img", {
                                      style: { "cursor": "pointer" },
                                      src: _imports_0,
                                      alt: "Excluir"
                                    })
                                  ]),
                                  createVNode("div", { onClick: handleCapture }, [
                                    createVNode("img", {
                                      style: { "cursor": "pointer" },
                                      src: _imports_3,
                                      alt: "Salvar"
                                    })
                                  ])
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
                  return [
                    createVNode(VDialog, {
                      "max-width": "700",
                      modelValue: unref(isDialogActive),
                      "onUpdate:modelValue": ($event) => isRef(isDialogActive) ? isDialogActive.value = $event : null
                    }, {
                      activator: withCtx(({ props: activatorProps }) => [
                        createVNode(VBtn, mergeProps(activatorProps, {
                          variant: "outlined",
                          style: { "width": "300px", "height": "300px" },
                          onClick: openDialog
                        }), {
                          default: withCtx(() => [
                            createVNode("img", { src: _imports_1 })
                          ]),
                          _: 2
                        }, 1040)
                      ]),
                      default: withCtx(({ isActive }) => [
                        createVNode(VCard, { title: "Biometria" }, {
                          default: withCtx(() => [
                            createVNode(VRow, null, {
                              default: withCtx(() => [
                                createVNode(VCol, null, {
                                  default: withCtx(() => [
                                    createVNode(VSelect, {
                                      items: unref(devices),
                                      modelValue: unref(selectedDeviceId),
                                      "onUpdate:modelValue": ($event) => isRef(selectedDeviceId) ? selectedDeviceId.value = $event : null,
                                      "item-title": "label",
                                      "item-value": "deviceId",
                                      label: "Selecionar Webcam"
                                    }, null, 8, ["items", "modelValue", "onUpdate:modelValue"])
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }),
                            createVNode(VRow, null, {
                              default: withCtx(() => [
                                createVNode(VCol, null, {
                                  default: withCtx(() => [
                                    createVNode(VBtn, { onClick: startVideo }, {
                                      default: withCtx(() => [
                                        createTextVNode("Exibir")
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }),
                            createVNode(VRow, null, {
                              default: withCtx(() => [
                                createVNode(VContainer, { style: { "overflow": "hidden" } }, {
                                  default: withCtx(() => [
                                    createVNode(VCol, null, {
                                      default: withCtx(() => [
                                        createVNode("video", {
                                          class: "ml-3",
                                          ref_key: "video",
                                          ref: video,
                                          width: "640",
                                          height: "480",
                                          autoplay: "",
                                          style: { transform: `scale(${unref(zoomLevel)})`, transformOrigin: "center center" }
                                        }, null, 4)
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }),
                            createVNode(VContainer, null, {
                              default: withCtx(() => [
                                createVNode(VSlider, {
                                  modelValue: unref(zoomLevel),
                                  "onUpdate:modelValue": ($event) => isRef(zoomLevel) ? zoomLevel.value = $event : null,
                                  min: 1,
                                  max: 3,
                                  step: "0.1",
                                  label: "Zoom"
                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                              ]),
                              _: 1
                            }),
                            createVNode(VRow, { class: "mt-10 justify-space-around" }, {
                              default: withCtx(() => [
                                createVNode("div", { onClick: closeDialog }, [
                                  createVNode("img", {
                                    style: { "cursor": "pointer" },
                                    src: _imports_0,
                                    alt: "Excluir"
                                  })
                                ]),
                                createVNode("div", { onClick: handleCapture }, [
                                  createVNode("img", {
                                    style: { "cursor": "pointer" },
                                    src: _imports_3,
                                    alt: "Salvar"
                                  })
                                ])
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(VCol, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<img class="btn-pointer"${ssrRenderAttr("src", _imports_4)} alt="Excluir"${_scopeId2}>`);
                } else {
                  return [
                    createVNode("img", {
                      class: "btn-pointer",
                      src: _imports_4,
                      alt: "Excluir"
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(VCol, { cols: "auto" }, {
                default: withCtx(() => [
                  createVNode(VImg, {
                    src: _imports_0$2,
                    width: 500,
                    class: "mr-4"
                  })
                ]),
                _: 1
              }),
              createVNode(VSpacer),
              createVNode(VCol, { cols: "auto" }, {
                default: withCtx(() => [
                  createVNode(VDialog, {
                    "max-width": "700",
                    modelValue: unref(isDialogActive),
                    "onUpdate:modelValue": ($event) => isRef(isDialogActive) ? isDialogActive.value = $event : null
                  }, {
                    activator: withCtx(({ props: activatorProps }) => [
                      createVNode(VBtn, mergeProps(activatorProps, {
                        variant: "outlined",
                        style: { "width": "300px", "height": "300px" },
                        onClick: openDialog
                      }), {
                        default: withCtx(() => [
                          createVNode("img", { src: _imports_1 })
                        ]),
                        _: 2
                      }, 1040)
                    ]),
                    default: withCtx(({ isActive }) => [
                      createVNode(VCard, { title: "Biometria" }, {
                        default: withCtx(() => [
                          createVNode(VRow, null, {
                            default: withCtx(() => [
                              createVNode(VCol, null, {
                                default: withCtx(() => [
                                  createVNode(VSelect, {
                                    items: unref(devices),
                                    modelValue: unref(selectedDeviceId),
                                    "onUpdate:modelValue": ($event) => isRef(selectedDeviceId) ? selectedDeviceId.value = $event : null,
                                    "item-title": "label",
                                    "item-value": "deviceId",
                                    label: "Selecionar Webcam"
                                  }, null, 8, ["items", "modelValue", "onUpdate:modelValue"])
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(VRow, null, {
                            default: withCtx(() => [
                              createVNode(VCol, null, {
                                default: withCtx(() => [
                                  createVNode(VBtn, { onClick: startVideo }, {
                                    default: withCtx(() => [
                                      createTextVNode("Exibir")
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(VRow, null, {
                            default: withCtx(() => [
                              createVNode(VContainer, { style: { "overflow": "hidden" } }, {
                                default: withCtx(() => [
                                  createVNode(VCol, null, {
                                    default: withCtx(() => [
                                      createVNode("video", {
                                        class: "ml-3",
                                        ref_key: "video",
                                        ref: video,
                                        width: "640",
                                        height: "480",
                                        autoplay: "",
                                        style: { transform: `scale(${unref(zoomLevel)})`, transformOrigin: "center center" }
                                      }, null, 4)
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(VContainer, null, {
                            default: withCtx(() => [
                              createVNode(VSlider, {
                                modelValue: unref(zoomLevel),
                                "onUpdate:modelValue": ($event) => isRef(zoomLevel) ? zoomLevel.value = $event : null,
                                min: 1,
                                max: 3,
                                step: "0.1",
                                label: "Zoom"
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            _: 1
                          }),
                          createVNode(VRow, { class: "mt-10 justify-space-around" }, {
                            default: withCtx(() => [
                              createVNode("div", { onClick: closeDialog }, [
                                createVNode("img", {
                                  style: { "cursor": "pointer" },
                                  src: _imports_0,
                                  alt: "Excluir"
                                })
                              ]),
                              createVNode("div", { onClick: handleCapture }, [
                                createVNode("img", {
                                  style: { "cursor": "pointer" },
                                  src: _imports_3,
                                  alt: "Salvar"
                                })
                              ])
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              }),
              createVNode(VCol, null, {
                default: withCtx(() => [
                  createVNode("img", {
                    class: "btn-pointer",
                    src: _imports_4,
                    alt: "Excluir"
                  })
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, { to: "/pessoas/registro" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<img class="mt-15"${ssrRenderAttr("src", _imports_0)} alt="Sair"${_scopeId}>`);
          } else {
            return [
              createVNode("img", {
                class: "mt-15",
                src: _imports_0,
                alt: "Sair"
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Biometria.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1>Restri\xE7\xF5es</h1></div>`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Restricoes.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_4 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender]]);
const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const tab = ref(null);
    const showTabs = ref(false);
    const autocompleteDisabled = ref(false);
    const initialState = {
      tipo_pessoa: "FISICA"
    };
    const state = reactive({
      ...initialState
    });
    const pessoa_tipo = ["FISICA", "JURIDICA", "ESTRANGEIRA"];
    const handleSave = () => {
      showTabs.value = true;
      autocompleteDisabled.value = true;
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Dados = __nuxt_component_0;
      const _component_Documentos = _sfc_main$4;
      const _component_Endereco = _sfc_main$3;
      const _component_Biometria = _sfc_main$2;
      const _component_Restricoes = __nuxt_component_4;
      _push(ssrRenderComponent(VCard, mergeProps({ width: "1300" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h1 style="${ssrRenderStyle({ "background-color": "#C8FCCA", "color": "#429946", "padding": "10px 0px 0px 20px" })}"${_scopeId}> Cadastramento de pessoas </h1><div style="${ssrRenderStyle({ "background-color": "#C8FCCA", "padding": "20px 0px 20px 20px" })}"${_scopeId}>`);
            _push2(ssrRenderComponent(VAutocomplete, {
              modelValue: unref(state).tipo_pessoa,
              "onUpdate:modelValue": ($event) => unref(state).tipo_pessoa = $event,
              style: { "width": "200px" },
              items: pessoa_tipo,
              label: "Tipo de pessoa",
              "bg-color": "#F6F6F6",
              disabled: unref(autocompleteDisabled)
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
            _push2(ssrRenderComponent(VTabs, {
              modelValue: unref(tab),
              "onUpdate:modelValue": ($event) => isRef(tab) ? tab.value = $event : null,
              "bg-color": "#C8FCCA"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VTab, { value: "dados" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Dados`);
                      } else {
                        return [
                          createTextVNode("Dados")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  if (unref(showTabs)) {
                    _push3(ssrRenderComponent(VTab, { value: "documento" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`Documentos`);
                        } else {
                          return [
                            createTextVNode("Documentos")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  if (unref(showTabs)) {
                    _push3(ssrRenderComponent(VTab, { value: "endereco" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`Endere\xE7os`);
                        } else {
                          return [
                            createTextVNode("Endere\xE7os")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  if (unref(showTabs)) {
                    _push3(ssrRenderComponent(VTab, { value: "biometria" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`Biometria`);
                        } else {
                          return [
                            createTextVNode("Biometria")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  if (unref(showTabs)) {
                    _push3(ssrRenderComponent(VTab, { value: "restricao" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`Restri\xE7\xF5es`);
                        } else {
                          return [
                            createTextVNode("Restri\xE7\xF5es")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                } else {
                  return [
                    createVNode(VTab, { value: "dados" }, {
                      default: withCtx(() => [
                        createTextVNode("Dados")
                      ]),
                      _: 1
                    }),
                    unref(showTabs) ? (openBlock(), createBlock(VTab, {
                      key: 0,
                      value: "documento"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Documentos")
                      ]),
                      _: 1
                    })) : createCommentVNode("", true),
                    unref(showTabs) ? (openBlock(), createBlock(VTab, {
                      key: 1,
                      value: "endereco"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Endere\xE7os")
                      ]),
                      _: 1
                    })) : createCommentVNode("", true),
                    unref(showTabs) ? (openBlock(), createBlock(VTab, {
                      key: 2,
                      value: "biometria"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Biometria")
                      ]),
                      _: 1
                    })) : createCommentVNode("", true),
                    unref(showTabs) ? (openBlock(), createBlock(VTab, {
                      key: 3,
                      value: "restricao"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Restri\xE7\xF5es")
                      ]),
                      _: 1
                    })) : createCommentVNode("", true)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(VTabsWindow, {
              modelValue: unref(tab),
              "onUpdate:modelValue": ($event) => isRef(tab) ? tab.value = $event : null
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VTabsWindowItem, { value: "dados" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_Dados, { onSaved: handleSave }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_Dados, { onSaved: handleSave })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  if (unref(showTabs)) {
                    _push3(ssrRenderComponent(VTabsWindowItem, { value: "documento" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_component_Documentos, null, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_component_Documentos)
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  if (unref(showTabs)) {
                    _push3(ssrRenderComponent(VTabsWindowItem, { value: "endereco" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_component_Endereco, null, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_component_Endereco)
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  if (unref(showTabs)) {
                    _push3(ssrRenderComponent(VTabsWindowItem, { value: "biometria" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(VContainer, { class: "mt-5" }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(_component_Biometria, null, null, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(_component_Biometria)
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(VContainer, { class: "mt-5" }, {
                              default: withCtx(() => [
                                createVNode(_component_Biometria)
                              ]),
                              _: 1
                            })
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  if (unref(showTabs)) {
                    _push3(ssrRenderComponent(VTabsWindowItem, { value: "restricao" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_component_Restricoes, null, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_component_Restricoes)
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                } else {
                  return [
                    createVNode(VTabsWindowItem, { value: "dados" }, {
                      default: withCtx(() => [
                        createVNode(_component_Dados, { onSaved: handleSave })
                      ]),
                      _: 1
                    }),
                    unref(showTabs) ? (openBlock(), createBlock(VTabsWindowItem, {
                      key: 0,
                      value: "documento"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_Documentos)
                      ]),
                      _: 1
                    })) : createCommentVNode("", true),
                    unref(showTabs) ? (openBlock(), createBlock(VTabsWindowItem, {
                      key: 1,
                      value: "endereco"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_Endereco)
                      ]),
                      _: 1
                    })) : createCommentVNode("", true),
                    unref(showTabs) ? (openBlock(), createBlock(VTabsWindowItem, {
                      key: 2,
                      value: "biometria"
                    }, {
                      default: withCtx(() => [
                        createVNode(VContainer, { class: "mt-5" }, {
                          default: withCtx(() => [
                            createVNode(_component_Biometria)
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    })) : createCommentVNode("", true),
                    unref(showTabs) ? (openBlock(), createBlock(VTabsWindowItem, {
                      key: 3,
                      value: "restricao"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_Restricoes)
                      ]),
                      _: 1
                    })) : createCommentVNode("", true)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode("h1", { style: { "background-color": "#C8FCCA", "color": "#429946", "padding": "10px 0px 0px 20px" } }, " Cadastramento de pessoas "),
              createVNode("div", { style: { "background-color": "#C8FCCA", "padding": "20px 0px 20px 20px" } }, [
                createVNode(VAutocomplete, {
                  modelValue: unref(state).tipo_pessoa,
                  "onUpdate:modelValue": ($event) => unref(state).tipo_pessoa = $event,
                  style: { "width": "200px" },
                  items: pessoa_tipo,
                  label: "Tipo de pessoa",
                  "bg-color": "#F6F6F6",
                  disabled: unref(autocompleteDisabled)
                }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"])
              ]),
              createVNode(VTabs, {
                modelValue: unref(tab),
                "onUpdate:modelValue": ($event) => isRef(tab) ? tab.value = $event : null,
                "bg-color": "#C8FCCA"
              }, {
                default: withCtx(() => [
                  createVNode(VTab, { value: "dados" }, {
                    default: withCtx(() => [
                      createTextVNode("Dados")
                    ]),
                    _: 1
                  }),
                  unref(showTabs) ? (openBlock(), createBlock(VTab, {
                    key: 0,
                    value: "documento"
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Documentos")
                    ]),
                    _: 1
                  })) : createCommentVNode("", true),
                  unref(showTabs) ? (openBlock(), createBlock(VTab, {
                    key: 1,
                    value: "endereco"
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Endere\xE7os")
                    ]),
                    _: 1
                  })) : createCommentVNode("", true),
                  unref(showTabs) ? (openBlock(), createBlock(VTab, {
                    key: 2,
                    value: "biometria"
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Biometria")
                    ]),
                    _: 1
                  })) : createCommentVNode("", true),
                  unref(showTabs) ? (openBlock(), createBlock(VTab, {
                    key: 3,
                    value: "restricao"
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Restri\xE7\xF5es")
                    ]),
                    _: 1
                  })) : createCommentVNode("", true)
                ]),
                _: 1
              }, 8, ["modelValue", "onUpdate:modelValue"]),
              createVNode(VTabsWindow, {
                modelValue: unref(tab),
                "onUpdate:modelValue": ($event) => isRef(tab) ? tab.value = $event : null
              }, {
                default: withCtx(() => [
                  createVNode(VTabsWindowItem, { value: "dados" }, {
                    default: withCtx(() => [
                      createVNode(_component_Dados, { onSaved: handleSave })
                    ]),
                    _: 1
                  }),
                  unref(showTabs) ? (openBlock(), createBlock(VTabsWindowItem, {
                    key: 0,
                    value: "documento"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_Documentos)
                    ]),
                    _: 1
                  })) : createCommentVNode("", true),
                  unref(showTabs) ? (openBlock(), createBlock(VTabsWindowItem, {
                    key: 1,
                    value: "endereco"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_Endereco)
                    ]),
                    _: 1
                  })) : createCommentVNode("", true),
                  unref(showTabs) ? (openBlock(), createBlock(VTabsWindowItem, {
                    key: 2,
                    value: "biometria"
                  }, {
                    default: withCtx(() => [
                      createVNode(VContainer, { class: "mt-5" }, {
                        default: withCtx(() => [
                          createVNode(_component_Biometria)
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })) : createCommentVNode("", true),
                  unref(showTabs) ? (openBlock(), createBlock(VTabsWindowItem, {
                    key: 3,
                    value: "restricao"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_Restricoes)
                    ]),
                    _: 1
                  })) : createCommentVNode("", true)
                ]),
                _: 1
              }, 8, ["modelValue", "onUpdate:modelValue"])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/pessoas/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-ltK834xA.mjs.map
