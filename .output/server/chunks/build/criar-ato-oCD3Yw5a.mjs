import { _ as _export_sfc, aL as useRoute$1, e as useCookie, c as useRuntimeConfig } from './server.mjs';
import { ref, computed, watch, withCtx, unref, createVNode, toDisplayString, isRef, resolveDynamicComponent, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderStyle, ssrInterpolate, ssrRenderVNode } from 'vue/server-renderer';
import _sfc_main$1 from './semelhanca-CJHDDFr-.mjs';
import _sfc_main$2 from './autencidade-DQA9WH3U.mjs';
import autenticacao from './autenticacao-aJP-ntTF.mjs';
import _sfc_main$3 from './geral-ctsZxYn_.mjs';
import _sfc_main$4 from './geral-A-F9cCQy.mjs';
import { u as useFetch } from './fetch-CmQgfhnJ.mjs';
import { V as VContainer } from './VContainer-DUPM_BP9.mjs';
import { V as VRow } from './VRow-DbcfFNio.mjs';
import { V as VCol } from './VCol-BY-FaYhw.mjs';
import { V as VAutocomplete } from './VAutocomplete-BkWVMD0Z.mjs';
import '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:fs';
import 'node:url';
import 'node:path';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'devalue';
import '@unhead/ssr';
import 'unhead';
import '@unhead/shared';
import 'pinia';
import 'vue-router';
import 'vue3-toastify';
import 'vue-the-mask';
import './RegistroPessoas-BwFZvz5e.mjs';
import '@vuelidate/core';
import '@vuelidate/validators';
import './fetchWithToken-cpPgQOwB.mjs';
import './filter-DK3_4lVs.mjs';
import './VList-iVnq_OpI.mjs';
import './VAvatar-DEYOjnUS.mjs';
import './VResponsive-_f8EzDDz.mjs';
import './nuxt-link-TpvcaGEw.mjs';
import './mudarStatus-CVlVNUDw.mjs';
import './formatDate-C0bMm8hr.mjs';
import './VDataTable-C53h7B9w.mjs';
import './VDialog-BSU3_51C.mjs';
import 'utif';
import './visualizar-BoZ30DMV.mjs';
import './FichaCard-Cqs6OLDm.mjs';
import './ErrorModalCard-swUmLE8W.mjs';
import './Anexos-DaGf1Diu.mjs';
import './escanear-DHLMxHvp.mjs';
import '@syncfusion/ej2-vue-documenteditor';
import '@syncfusion/ej2-base';
import './Imoveis-BtesMYk1.mjs';
import './MoneyInput-nC85fGUl.mjs';
import 'v-money3';
import './VTextarea-AmwKvadh.mjs';

const _sfc_main = {
  __name: "criar-ato",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute$1();
    const numeroOs = route.query.numeroOs;
    const components = {
      "/fontes/atos/reconhecimento/semelhanca": _sfc_main$1,
      "/fontes/atos/reconhecimento/autenticidade": _sfc_main$2,
      "/fontes/atos/autenticacao/autenticacao": autenticacao,
      "/fontes/atos/ato-sem-bem/geral": _sfc_main$3,
      "/fontes/atos/ato-com-bem/geral": _sfc_main$4
    };
    const servicos = ref([]);
    const atos = ref([]);
    const selectedServico = ref("");
    const selectedAto = ref(" ");
    const selectedComponent = computed(() => components[selectedAto.value.rota]);
    const config = useRuntimeConfig();
    const getTiposAtos = `${config.public.managemant}/tipoAtos`;
    const usuario_token = useCookie("auth_token").value;
    const cartorio_token = ref(useCookie("user-data").value.cartorio_token).value;
    const loadServicos = async () => {
      const { data } = await useFetch(getTiposAtos, {
        method: "POST",
        body: { usuario_token, cartorio_token }
      }, "$BALimOVqjo");
      servicos.value = data.value;
      if (servicos.value.length > 0) {
        selectedServico.value = servicos.value[0].token;
      }
    };
    const onServicoChange = async (token) => {
      const { data } = await useFetch(getTiposAtos, {
        method: "POST",
        body: {
          usuario_token,
          cartorio_token,
          servico_token: token
        }
      }, "$q4tUBUK2on");
      atos.value = data.value;
    };
    loadServicos();
    watch(selectedServico, async (newValue) => {
      if (newValue) {
        await onServicoChange(newValue);
        selectedAto.value = atos.value.length > 0 ? atos.value[0] : null;
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(VContainer, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VRow, { class: "mb-5" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                var _a, _b;
                if (_push3) {
                  _push3(`<h1 data-v-b8bd53c8${_scopeId2}>Ordem de Servi\xE7o n\xBA</h1><h1 style="${ssrRenderStyle({ "color": "red", "margin-left": "30px" })}" data-v-b8bd53c8${_scopeId2}>${ssrInterpolate(unref(numeroOs) || ((_a = ("useCookie" in _ctx ? _ctx.useCookie : unref(useCookie))("user-service").value) == null ? undefined : _a.numero) || null)}</h1>`);
                } else {
                  return [
                    createVNode("h1", null, "Ordem de Servi\xE7o n\xBA"),
                    createVNode("h1", { style: { "color": "red", "margin-left": "30px" } }, toDisplayString(unref(numeroOs) || ((_b = ("useCookie" in _ctx ? _ctx.useCookie : unref(useCookie))("user-service").value) == null ? undefined : _b.numero) || null), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(VRow, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VCol, { md: "6" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VAutocomplete, {
                          class: "mr-5",
                          label: "Selecione o Servico",
                          items: unref(servicos),
                          "item-title": "descricao",
                          "item-value": "token",
                          modelValue: unref(selectedServico),
                          "onUpdate:modelValue": ($event) => isRef(selectedServico) ? selectedServico.value = $event : null
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VAutocomplete, {
                            class: "mr-5",
                            label: "Selecione o Servico",
                            items: unref(servicos),
                            "item-title": "descricao",
                            "item-value": "token",
                            modelValue: unref(selectedServico),
                            "onUpdate:modelValue": ($event) => isRef(selectedServico) ? selectedServico.value = $event : null
                          }, null, 8, ["items", "modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VCol, { md: "6" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VAutocomplete, {
                          label: "Selecione o tipo de ato",
                          modelValue: unref(selectedAto),
                          "onUpdate:modelValue": ($event) => isRef(selectedAto) ? selectedAto.value = $event : null,
                          "item-title": "descricao",
                          "item-value": "token",
                          items: unref(atos),
                          "return-object": ""
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VAutocomplete, {
                            label: "Selecione o tipo de ato",
                            modelValue: unref(selectedAto),
                            "onUpdate:modelValue": ($event) => isRef(selectedAto) ? selectedAto.value = $event : null,
                            "item-title": "descricao",
                            "item-value": "token",
                            items: unref(atos),
                            "return-object": ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VCol, { md: "6" }, {
                      default: withCtx(() => [
                        createVNode(VAutocomplete, {
                          class: "mr-5",
                          label: "Selecione o Servico",
                          items: unref(servicos),
                          "item-title": "descricao",
                          "item-value": "token",
                          modelValue: unref(selectedServico),
                          "onUpdate:modelValue": ($event) => isRef(selectedServico) ? selectedServico.value = $event : null
                        }, null, 8, ["items", "modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, { md: "6" }, {
                      default: withCtx(() => [
                        createVNode(VAutocomplete, {
                          label: "Selecione o tipo de ato",
                          modelValue: unref(selectedAto),
                          "onUpdate:modelValue": ($event) => isRef(selectedAto) ? selectedAto.value = $event : null,
                          "item-title": "descricao",
                          "item-value": "token",
                          items: unref(atos),
                          "return-object": ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(VRow, { class: "mb-5" }, {
                default: withCtx(() => {
                  var _a;
                  return [
                    createVNode("h1", null, "Ordem de Servi\xE7o n\xBA"),
                    createVNode("h1", { style: { "color": "red", "margin-left": "30px" } }, toDisplayString(unref(numeroOs) || ((_a = ("useCookie" in _ctx ? _ctx.useCookie : unref(useCookie))("user-service").value) == null ? undefined : _a.numero) || null), 1)
                  ];
                }),
                _: 1
              }),
              createVNode(VRow, null, {
                default: withCtx(() => [
                  createVNode(VCol, { md: "6" }, {
                    default: withCtx(() => [
                      createVNode(VAutocomplete, {
                        class: "mr-5",
                        label: "Selecione o Servico",
                        items: unref(servicos),
                        "item-title": "descricao",
                        "item-value": "token",
                        modelValue: unref(selectedServico),
                        "onUpdate:modelValue": ($event) => isRef(selectedServico) ? selectedServico.value = $event : null
                      }, null, 8, ["items", "modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(VCol, { md: "6" }, {
                    default: withCtx(() => [
                      createVNode(VAutocomplete, {
                        label: "Selecione o tipo de ato",
                        modelValue: unref(selectedAto),
                        "onUpdate:modelValue": ($event) => isRef(selectedAto) ? selectedAto.value = $event : null,
                        "item-title": "descricao",
                        "item-value": "token",
                        items: unref(atos),
                        "return-object": ""
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
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
      }, _parent));
      ssrRenderVNode(_push, createVNode(resolveDynamicComponent(unref(selectedComponent)), {
        ato_token: unref(selectedAto).token
      }, null), _parent);
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/os/criar-ato.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : undefined;
};
const criarAto = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-b8bd53c8"]]);

export { criarAto as default };
//# sourceMappingURL=criar-ato-oCD3Yw5a.mjs.map
