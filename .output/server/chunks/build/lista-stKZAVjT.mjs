import { d as useCookie, V as VTextField, e as VBtn, b as useRuntimeConfig } from './server.mjs';
import { ref, withAsyncContext, computed, unref, isRef, withCtx, openBlock, createBlock, createCommentVNode, createVNode, createTextVNode, Fragment, renderList, useSSRContext } from 'vue';
import { u as useFetch } from './fetch-bT3G74K0.mjs';
import { ssrRenderComponent, ssrRenderList } from 'vue/server-renderer';
import { V as VAutocomplete } from './VAutocomplete-DmQ99COP.mjs';
import { V as VForm } from './VForm-gzXeuPKa.mjs';
import { V as VRow } from './VRow-B_iA44Vb.mjs';
import { V as VCol } from './VCol-B4e6QNL9.mjs';
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
import './filter-DxEBKIwJ.mjs';
import './VList-CYYVz_6B.mjs';
import './VAvatar-CJ4Ett-u.mjs';
import './VResponsive-CDbSCp4e.mjs';

const _sfc_main = {
  __name: "lista",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const config = useRuntimeConfig();
    const getRelatorios = `${config.public.managemant}/getRelatorios`;
    const createRelatorios = `${config.public.managemant}/createRelatorio`;
    const getDadosDominio = `${config.public.managemant}/listaQuery`;
    const relatorios = ref([]);
    const selectedRelatorio = ref(null);
    const formInputs = ref([]);
    const tokens = {
      user_token: useCookie("auth_token").value,
      cartorio_token: useCookie("user-data").value.cartorio_token,
      user_name: useCookie("user-data").value.nome
    };
    const { data } = ([__temp, __restore] = withAsyncContext(() => useFetch(getRelatorios, {
      method: "POST",
      body: tokens
    }, "$53NFRNGH7x")), __temp = await __temp, __restore(), __temp);
    relatorios.value = Array.isArray(data.value) ? data.value : [];
    const options = computed(
      () => relatorios.value.every(
        (relatorio) => !relatorio.codigo && !relatorio.value && !relatorio.parametros
      ) ? [] : relatorios.value.map((relatorio) => ({
        label: relatorio.codigo,
        value: relatorio.codigo,
        parametros: relatorio.parametros
      }))
    );
    const handleRelatorioChange = async (selected) => {
      const selectedItem = options.value.find((option) => option.value === selected);
      if (selectedItem) {
        formInputs.value = selectedItem.parametros.map((param) => ({
          ...param,
          value: null,
          showDatePicker: false,
          items: []
          // Para armazenar os dados do autocomplete
        }));
        for (const input of formInputs.value) {
          if (input.tipo === "TABLE" && input.dominio) {
            try {
              const { data: data2 } = await useFetch(getDadosDominio, {
                method: "POST",
                body: {
                  cartorio_token: tokens.cartorio_token,
                  parametros: input.dominio
                }
              }, "$c4psqRQWRs");
              input.items = Array.isArray(data2.value) ? data2.value.map((item) => ({ label: item.nome, value: item.token })) : [];
            } catch (error) {
              console.error("Erro ao buscar dados para TABLE:", error);
            }
          }
        }
      } else {
        formInputs.value = [];
      }
    };
    const handleCreateRelatorio = async () => {
      const parametros = formInputs.value.reduce((acc, input) => {
        acc[input.parametro] = input.value;
        return acc;
      }, {});
      try {
        const novoRelatorio = {
          ...parametros,
          user_id: useCookie("user-data").value.usuario_id
        };
        const { data: data2 } = await useFetch(createRelatorios, {
          method: "POST",
          body: novoRelatorio
        }, "$6CLQJHdzNf");
        (void 0).open(data2.value, "_blank");
        formInputs.value = [];
        selectedRelatorio.value = null;
      } catch (error) {
        console.error("Erro ao criar o relat\xF3rio:", error);
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[--><h1>Relat\xF3rios</h1><div>`);
      _push(ssrRenderComponent(VAutocomplete, {
        modelValue: unref(selectedRelatorio),
        "onUpdate:modelValue": ($event) => isRef(selectedRelatorio) ? selectedRelatorio.value = $event : null,
        items: unref(options),
        class: "mb-5",
        "item-title": "label",
        "item-value": "value",
        label: "Selecione o relat\xF3rio",
        required: "",
        "onUpdate:search": handleRelatorioChange
      }, null, _parent));
      _push(`</div>`);
      if (unref(selectedRelatorio)) {
        _push(`<div>`);
        _push(ssrRenderComponent(VForm, null, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<!--[-->`);
              ssrRenderList(unref(formInputs), (input, index) => {
                _push2(ssrRenderComponent(VRow, { key: index }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(ssrRenderComponent(VCol, { cols: "4" }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            if (input.tipo !== "DATE" && input.tipo !== "TABLE") {
                              _push4(ssrRenderComponent(VTextField, {
                                modelValue: input.value,
                                "onUpdate:modelValue": ($event) => input.value = $event,
                                label: input.label,
                                required: input.obrigatorio
                              }, null, _parent4, _scopeId3));
                            } else {
                              _push4(`<!---->`);
                            }
                            if (input.tipo === "INTEGER") {
                              _push4(ssrRenderComponent(VTextField, {
                                modelValue: input.value,
                                "onUpdate:modelValue": ($event) => input.value = $event,
                                type: "number",
                                outlined: ""
                              }, null, _parent4, _scopeId3));
                            } else {
                              _push4(`<!---->`);
                            }
                            if (input.tipo === "DATE") {
                              _push4(ssrRenderComponent(VTextField, {
                                modelValue: input.value,
                                "onUpdate:modelValue": ($event) => input.value = $event,
                                type: "date"
                              }, null, _parent4, _scopeId3));
                            } else {
                              _push4(`<!---->`);
                            }
                            if (input.tipo === "TABLE") {
                              _push4(ssrRenderComponent(VAutocomplete, {
                                modelValue: input.value,
                                "onUpdate:modelValue": ($event) => input.value = $event,
                                items: input.items,
                                "item-title": "label",
                                "item-value": "value",
                                label: input.label,
                                required: input.obrigatorio
                              }, null, _parent4, _scopeId3));
                            } else {
                              _push4(`<!---->`);
                            }
                          } else {
                            return [
                              input.tipo !== "DATE" && input.tipo !== "TABLE" ? (openBlock(), createBlock(VTextField, {
                                key: 0,
                                modelValue: input.value,
                                "onUpdate:modelValue": ($event) => input.value = $event,
                                label: input.label,
                                required: input.obrigatorio
                              }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "required"])) : createCommentVNode("", true),
                              input.tipo === "INTEGER" ? (openBlock(), createBlock(VTextField, {
                                key: 1,
                                modelValue: input.value,
                                "onUpdate:modelValue": ($event) => input.value = $event,
                                type: "number",
                                outlined: ""
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])) : createCommentVNode("", true),
                              input.tipo === "DATE" ? (openBlock(), createBlock(VTextField, {
                                key: 2,
                                modelValue: input.value,
                                "onUpdate:modelValue": ($event) => input.value = $event,
                                type: "date"
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])) : createCommentVNode("", true),
                              input.tipo === "TABLE" ? (openBlock(), createBlock(VAutocomplete, {
                                key: 3,
                                modelValue: input.value,
                                "onUpdate:modelValue": ($event) => input.value = $event,
                                items: input.items,
                                "item-title": "label",
                                "item-value": "value",
                                label: input.label,
                                required: input.obrigatorio
                              }, null, 8, ["modelValue", "onUpdate:modelValue", "items", "label", "required"])) : createCommentVNode("", true)
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                    } else {
                      return [
                        createVNode(VCol, { cols: "4" }, {
                          default: withCtx(() => [
                            input.tipo !== "DATE" && input.tipo !== "TABLE" ? (openBlock(), createBlock(VTextField, {
                              key: 0,
                              modelValue: input.value,
                              "onUpdate:modelValue": ($event) => input.value = $event,
                              label: input.label,
                              required: input.obrigatorio
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "required"])) : createCommentVNode("", true),
                            input.tipo === "INTEGER" ? (openBlock(), createBlock(VTextField, {
                              key: 1,
                              modelValue: input.value,
                              "onUpdate:modelValue": ($event) => input.value = $event,
                              type: "number",
                              outlined: ""
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])) : createCommentVNode("", true),
                            input.tipo === "DATE" ? (openBlock(), createBlock(VTextField, {
                              key: 2,
                              modelValue: input.value,
                              "onUpdate:modelValue": ($event) => input.value = $event,
                              type: "date"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])) : createCommentVNode("", true),
                            input.tipo === "TABLE" ? (openBlock(), createBlock(VAutocomplete, {
                              key: 3,
                              modelValue: input.value,
                              "onUpdate:modelValue": ($event) => input.value = $event,
                              items: input.items,
                              "item-title": "label",
                              "item-value": "value",
                              label: input.label,
                              required: input.obrigatorio
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "items", "label", "required"])) : createCommentVNode("", true)
                          ]),
                          _: 2
                        }, 1024)
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
              });
              _push2(`<!--]-->`);
              _push2(ssrRenderComponent(VBtn, {
                color: "green",
                class: "mt-4",
                onClick: handleCreateRelatorio
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`Enviar`);
                  } else {
                    return [
                      createTextVNode("Enviar")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                (openBlock(true), createBlock(Fragment, null, renderList(unref(formInputs), (input, index) => {
                  return openBlock(), createBlock(VRow, { key: index }, {
                    default: withCtx(() => [
                      createVNode(VCol, { cols: "4" }, {
                        default: withCtx(() => [
                          input.tipo !== "DATE" && input.tipo !== "TABLE" ? (openBlock(), createBlock(VTextField, {
                            key: 0,
                            modelValue: input.value,
                            "onUpdate:modelValue": ($event) => input.value = $event,
                            label: input.label,
                            required: input.obrigatorio
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "required"])) : createCommentVNode("", true),
                          input.tipo === "INTEGER" ? (openBlock(), createBlock(VTextField, {
                            key: 1,
                            modelValue: input.value,
                            "onUpdate:modelValue": ($event) => input.value = $event,
                            type: "number",
                            outlined: ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])) : createCommentVNode("", true),
                          input.tipo === "DATE" ? (openBlock(), createBlock(VTextField, {
                            key: 2,
                            modelValue: input.value,
                            "onUpdate:modelValue": ($event) => input.value = $event,
                            type: "date"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])) : createCommentVNode("", true),
                          input.tipo === "TABLE" ? (openBlock(), createBlock(VAutocomplete, {
                            key: 3,
                            modelValue: input.value,
                            "onUpdate:modelValue": ($event) => input.value = $event,
                            items: input.items,
                            "item-title": "label",
                            "item-value": "value",
                            label: input.label,
                            required: input.obrigatorio
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "items", "label", "required"])) : createCommentVNode("", true)
                        ]),
                        _: 2
                      }, 1024)
                    ]),
                    _: 2
                  }, 1024);
                }), 128)),
                createVNode(VBtn, {
                  color: "green",
                  class: "mt-4",
                  onClick: handleCreateRelatorio
                }, {
                  default: withCtx(() => [
                    createTextVNode("Enviar")
                  ]),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/relatorios/lista.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=lista-stKZAVjT.mjs.map