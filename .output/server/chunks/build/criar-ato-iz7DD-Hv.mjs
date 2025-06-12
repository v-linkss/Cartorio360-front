import { _ as _export_sfc, f as useRoute$1, e as useCookie, c as useRuntimeConfig } from './server.mjs';
import { ref, computed, watch, withCtx, unref, createVNode, toDisplayString, isRef, resolveDynamicComponent, openBlock, createBlock, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderStyle, ssrInterpolate, ssrRenderVNode } from 'vue/server-renderer';
import _sfc_main$1 from './semelhanca-C1ZjUcVE.mjs';
import _sfc_main$2 from './autencidade-C6RW463q.mjs';
import autenticacao from './autenticacao-DzyFAwqO.mjs';
import _sfc_main$3 from './geral-B0MD_uTG.mjs';
import _sfc_main$4 from './geral-BxmIB1x3.mjs';
import { u as useFetch } from './fetch-BGOGxZIT.mjs';
import { V as VContainer } from './VContainer-CUysD4sO.mjs';
import { V as VRow } from './VRow-Bqz0CuIN.mjs';
import { V as VCol } from './VCol-BT4RzX0Q.mjs';
import { V as VAutocomplete } from './VAutocomplete-BkxeMWb7.mjs';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:fs';
import 'node:path';
import 'node:url';
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
import './RegistroPessoas-BM4sHuUg.mjs';
import '@vuelidate/core';
import '@vuelidate/validators';
import './asyncData-Diyd6umk.mjs';
import './fetchWithToken-C6Hm_qcH.mjs';
import './formatDate-DflkuJ_V.mjs';
import './filter-BT7qJclb.mjs';
import './VList-D6fdCBQk.mjs';
import './VAvatar-CnoOhuaA.mjs';
import './VResponsive-D5W8jAiq.mjs';
import './nuxt-link-TpvcaGEw.mjs';
import './novo-CWU3oYa5.mjs';
import './editar-BcGPsVK2.mjs';
import './excluido-ceRs5bdR.mjs';
import './VDataTable-BIulIhGO.mjs';
import './VDialog-DUonz2jA.mjs';
import './VCard-CbJyOeQB.mjs';
import 'utif';
import './FichaCard-D8zJ-Ndw.mjs';
import './visualizar-BoZ30DMV.mjs';
import './VTabs-B7kqkrCW.mjs';
import './ErrorModalCard-aehpvdM9.mjs';
import './visualizar-vermelho-Ly_aKn8Z.mjs';
import './Anexos-CUf_65OD.mjs';
import './lavrar-CouJz3f8.mjs';
import './Confirmacao-CKqc08y-.mjs';
import './Outros-B4AeML3Y.mjs';
import './MoneyInput-ot-UsY0X.mjs';
import 'v-money3';
import './Imoveis-Bj5_B5Zk.mjs';
import './VTextarea-DmujWS6L.mjs';
import './Atualizar-Cagg_deg.mjs';
import './SaveButton-NegzxXb_.mjs';

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
      _push(ssrRenderComponent(VContainer, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a, _b, _c, _d, _e, _f;
          if (_push2) {
            _push2(ssrRenderComponent(VRow, { class: "mb-5" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                var _a2, _b2;
                if (_push3) {
                  _push3(`<h1 data-v-25f05248${_scopeId2}>Ordem de Servi\xE7o n\xBA</h1><h1 style="${ssrRenderStyle({ "color": "red", "margin-left": "30px" })}" data-v-25f05248${_scopeId2}>${ssrInterpolate(unref(numeroOs) || ((_a2 = ("useCookie" in _ctx ? _ctx.useCookie : unref(useCookie))("user-service").value) == null ? undefined : _a2.numero) || null)}</h1>`);
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
            ssrRenderVNode(_push2, createVNode(resolveDynamicComponent(unref(selectedComponent)), {
              class: "mt-10",
              ato_token: (_a = unref(selectedAto)) == null ? undefined : _a.token,
              ato_tipo_id: (_b = unref(selectedAto)) == null ? undefined : _b.id,
              usa_imoveis: (_c = unref(selectedAto)) == null ? undefined : _c.usa_imoveis,
              onAtoCreated: blockCombolists
            }, null), _parent2, _scopeId);
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
              }),
              (openBlock(), createBlock(resolveDynamicComponent(unref(selectedComponent)), {
                class: "mt-10",
                ato_token: (_d = unref(selectedAto)) == null ? undefined : _d.token,
                ato_tipo_id: (_e = unref(selectedAto)) == null ? undefined : _e.id,
                usa_imoveis: (_f = unref(selectedAto)) == null ? undefined : _f.usa_imoveis,
                onAtoCreated: blockCombolists
              }, null, 40, ["ato_token", "ato_tipo_id", "usa_imoveis"]))
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/os/criar-ato.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : undefined;
};
const criarAto = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-25f05248"]]);

export { criarAto as default };
//# sourceMappingURL=criar-ato-iz7DD-Hv.mjs.map
