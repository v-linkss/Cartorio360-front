import { _ as _export_sfc, aS as useRoute$1, e as useCookie, c as useRuntimeConfig } from './server.mjs';
import { ref, computed, watch, withCtx, unref, createVNode, toDisplayString, isRef, resolveDynamicComponent, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderStyle, ssrInterpolate, ssrRenderVNode } from 'vue/server-renderer';
import _sfc_main$1 from './semelhanca-XSW1E4tL.mjs';
import _sfc_main$2 from './autencidade-BQ5skNxT.mjs';
import autenticacao from './autenticacao-DxLypiL9.mjs';
import _sfc_main$3 from './geral-gNViTXvw.mjs';
import _sfc_main$4 from './geral-dMSKQoa4.mjs';
import { u as useFetch } from './fetch-Q70wXbL3.mjs';
import { V as VContainer } from './VContainer-CTpFP9Uv.mjs';
import { V as VRow } from './VRow-BVT9G9vF.mjs';
import { V as VCol } from './VCol-BfQDPyTL.mjs';
import { V as VAutocomplete } from './VAutocomplete-ChQPKqBs.mjs';
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
import './RegistroPessoas-CjpDMW-L.mjs';
import '@vuelidate/core';
import '@vuelidate/validators';
import './fetchWithToken-Cv5nC8pK.mjs';
import './formatDate-DflkuJ_V.mjs';
import './filter-1TH8I8rV.mjs';
import './VList-DgVXz_Z-.mjs';
import './VAvatar-C1Wv3qCt.mjs';
import './VResponsive-BFQ60k4B.mjs';
import './nuxt-link-TpvcaGEw.mjs';
import './novo-CWU3oYa5.mjs';
import './editar-BcGPsVK2.mjs';
import './excluido-D7FHZla7.mjs';
import './VDataTable-DomJgUVT.mjs';
import './VDialog-CGFJar9P.mjs';
import './VCard-B1PhK9Ih.mjs';
import 'utif';
import './VTabs-DcRGEkxZ.mjs';
import './visualizar-BoZ30DMV.mjs';
import './FichaCard-DTuN4y4K.mjs';
import './ErrorModalCard-CXw1DLzW.mjs';
import './Anexos-mPF3bqqr.mjs';
import './abre-arquivo-verde-Df3w2CT0.mjs';
import '@syncfusion/ej2-vue-documenteditor';
import '@syncfusion/ej2-base';
import './Confirmacao-BPmf7T_8.mjs';
import './Outros-B7BPDK3r.mjs';
import './MoneyInput-ot-UsY0X.mjs';
import 'v-money3';
import './Imoveis-DjLG1rup.mjs';
import './VTextarea-FT0NmkQr.mjs';
import './Atualizar-CxgQRf9I.mjs';

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
    const selectedAto = ref(null);
    const combolistsBlockeds = ref(false);
    const selectedComponent = computed(() => {
      var _a;
      return ((_a = selectedAto.value) == null ? undefined : _a.rota) ? components[selectedAto.value.rota] : null;
    });
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
    const blockCombolists = () => {
      combolistsBlockeds.value = true;
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
      var _a, _b, _c;
      _push(`<!--[-->`);
      _push(ssrRenderComponent(VContainer, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VRow, { class: "mb-5" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                var _a2, _b2;
                if (_push3) {
                  _push3(`<h1 data-v-d51cc4a9${_scopeId2}>Ordem de Servi\xE7o n\xBA</h1><h1 style="${ssrRenderStyle({ "color": "red", "margin-left": "30px" })}" data-v-d51cc4a9${_scopeId2}>${ssrInterpolate(unref(numeroOs) || ((_a2 = ("useCookie" in _ctx ? _ctx.useCookie : unref(useCookie))("user-service").value) == null ? undefined : _a2.numero) || null)}</h1>`);
                } else {
                  return [
                    createVNode("h1", null, "Ordem de Servi\xE7o n\xBA"),
                    createVNode("h1", { style: { "color": "red", "margin-left": "30px" } }, toDisplayString(unref(numeroOs) || ((_b2 = ("useCookie" in _ctx ? _ctx.useCookie : unref(useCookie))("user-service").value) == null ? undefined : _b2.numero) || null), 1)
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
                          "onUpdate:modelValue": ($event) => isRef(selectedServico) ? selectedServico.value = $event : null,
                          disabled: unref(combolistsBlockeds)
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
                            "onUpdate:modelValue": ($event) => isRef(selectedServico) ? selectedServico.value = $event : null,
                            disabled: unref(combolistsBlockeds)
                          }, null, 8, ["items", "modelValue", "onUpdate:modelValue", "disabled"])
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
                          disabled: unref(combolistsBlockeds),
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
                            disabled: unref(combolistsBlockeds),
                            "return-object": ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "items", "disabled"])
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
                          "onUpdate:modelValue": ($event) => isRef(selectedServico) ? selectedServico.value = $event : null,
                          disabled: unref(combolistsBlockeds)
                        }, null, 8, ["items", "modelValue", "onUpdate:modelValue", "disabled"])
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
                          disabled: unref(combolistsBlockeds),
                          "return-object": ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "items", "disabled"])
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
                  var _a2;
                  return [
                    createVNode("h1", null, "Ordem de Servi\xE7o n\xBA"),
                    createVNode("h1", { style: { "color": "red", "margin-left": "30px" } }, toDisplayString(unref(numeroOs) || ((_a2 = ("useCookie" in _ctx ? _ctx.useCookie : unref(useCookie))("user-service").value) == null ? undefined : _a2.numero) || null), 1)
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
                        "onUpdate:modelValue": ($event) => isRef(selectedServico) ? selectedServico.value = $event : null,
                        disabled: unref(combolistsBlockeds)
                      }, null, 8, ["items", "modelValue", "onUpdate:modelValue", "disabled"])
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
                        disabled: unref(combolistsBlockeds),
                        "return-object": ""
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "items", "disabled"])
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
        ato_token: (_a = unref(selectedAto)) == null ? undefined : _a.token,
        ato_tipo_id: (_b = unref(selectedAto)) == null ? undefined : _b.id,
        usa_imoveis: (_c = unref(selectedAto)) == null ? undefined : _c.usa_imoveis,
        onAtoCreated: blockCombolists
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
const criarAto = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-d51cc4a9"]]);

export { criarAto as default };
//# sourceMappingURL=criar-ato-DLepUCt2.mjs.map
