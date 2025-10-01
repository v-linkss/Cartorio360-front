import { useSSRContext, ref, watch, mergeProps, unref, isRef, withCtx, createTextVNode, createVNode, openBlock, createBlock, createCommentVNode, reactive, withAsyncContext, toDisplayString, resolveDirective, withDirectives } from 'vue';
import { ssrRenderComponent, ssrRenderStyle, ssrRenderAttrs, ssrInterpolate, ssrGetDirectiveProps, ssrRenderAttr } from 'vue/server-renderer';
import { V as VDialog } from './VDialog-BVe31KMa.mjs';
import { V as VCard, c as VCardActions } from './VCard-CFn9vmiT.mjs';
import { V as VContainer } from './VContainer-CUysD4sO.mjs';
import { V as VTabs, a as VTab } from './VTabs-GFlkZVhH.mjs';
import { _ as __nuxt_component_0 } from './MoneyInput-ot-UsY0X.mjs';
import { _ as __nuxt_component_0$1 } from './nuxt-link-TpvcaGEw.mjs';
import { _ as _sfc_main$6 } from './SaveButton-B3jhfywM.mjs';
import { useVuelidate } from '@vuelidate/core';
import { helpers, required } from '@vuelidate/validators';
import { g as useRoute$1, b as useNuxtApp, e as useCookie, b9 as VProgressCircular, f as VTextField, V as VBtn, c as useRuntimeConfig } from './server.mjs';
import { u as useFetch } from './fetch-uf6n1sXR.mjs';
import { V as VRow } from './VRow-Bqz0CuIN.mjs';
import { V as VCol } from './VCol-BT4RzX0Q.mjs';
import { V as VTextarea } from './VTextarea-DJCeftNm.mjs';
import { V as VAutocomplete } from './VAutocomplete-BE6_PaUP.mjs';
import { V as VCheckbox } from './VCheckbox-ByoVH3N8.mjs';
import { a as _sfc_main$6$1 } from './RegistroPessoas-CxsNBCBT.mjs';
import { _ as _imports_0 } from './novo-CWU3oYa5.mjs';
import { _ as _imports_1 } from './visualizar-BoZ30DMV.mjs';
import { _ as _imports_1$1 } from './editar-BcGPsVK2.mjs';
import { _ as _imports_2, a as _imports_3 } from './excluido-D7FHZla7.mjs';
import { V as VDataTable } from './VDataTable-BsvkD4vs.mjs';

const _sfc_main$5 = {
  __name: "Dados",
  __ssrInlineRender: true,
  props: {
    ato_token: {
      type: String,
      required: true
    },
    ato_id: {
      type: Number,
      required: true
    },
    isUpdate: {
      type: Boolean
    },
    imovel_id: {
      type: Number
    }
  },
  emits: ["saved", "close-modal", "refresh-list"],
  async setup(__props, { emit: __emit }) {
    let __temp, __restore;
    const props = __props;
    const emit = __emit;
    const route = useRoute$1();
    const config = useRuntimeConfig();
    const { $toast } = useNuxtApp();
    route.params;
    const createAtosBens = `${config.public.managemant}/atos_bens`;
    const getImoveisById = `${config.public.managemant}/atos_bens`;
    const updateImovel = `${config.public.managemant}/atos_bens`;
    `${config.public.managemant}/registro_imoveis`;
    `${config.public.managemant}/natureza_imoveis`;
    `${config.public.managemant}/tipo_logradouros`;
    `${config.public.managemant}/situacao_imoveis`;
    `${config.public.managemant}/listarCidades`;
    const listarBens = `${config.public.managemant}/listarTipoBens`;
    const cartorio_token = ref(useCookie("user-data").value.cartorio_token);
    const user_id = ref(useCookie("user-data").value.usuario_id).value;
    const registroItems = ref([]);
    const naturezaItems = ref([]);
    ref([]);
    ref([]);
    const situacaoItems = ref([]);
    const tipoBensItems = ref([]);
    const loading = ref(true);
    const state = reactive({
      tabvalores_tipo_regimovel_id: null,
      registro_cartorio: null,
      registro_matricula: null,
      matricula_letra: null,
      tabvalores_nat_imovel_id: null,
      cib: null,
      sem_recebimento: false,
      tabvalores_tipologradouro_id: null,
      tipo_id: null,
      descricao: null,
      inscricao_estadual: null,
      tabvalores_situacao_imoveis_id: null,
      vlr_avaliacao: null,
      vlr_mercado: null,
      valor_mercado: "0.00",
      aliq_itbi: null,
      vlr_itbi: null,
      vlr_pago_dinheiro: null,
      user_id,
      ato_id: Number(route.query.ato_id) || Number(props.ato_id)
    });
    const statePayload = reactive({ ...state });
    const rules = {
      descricao: {
        required: helpers.withMessage("O campo \xE9 obrigat\xF3rio", required)
      },
      tipo_id: { required: helpers.withMessage("O campo \xE9 obrigat\xF3rio", required) },
      registro_matricula: {
        required: helpers.withMessage("O campo \xE9 obrigat\xF3rio", required)
      },
      inscricao_estadual: {
        required: helpers.withMessage("O campo \xE9 obrigat\xF3rio", required)
      },
      vlr_avaliacao: {
        required: helpers.withMessage("O campo \xE9 obrigat\xF3rio", required),
        notZero: helpers.withMessage(
          "O valor n\xE3o pode ser zero",
          (value) => !!value && Number(value.toString().replace(/,/g, "")) > 0
        )
      }
    };
    const v$ = useVuelidate(rules, state);
    const createImovel = async () => {
      var _a, _b, _c, _d;
      const isValid = await v$.value.$validate();
      if (!isValid) {
        $toast.error("Preencha todos os campos obrigat\xF3rios!");
        return;
      }
      const valorRecebido = Number(
        (state.vlr_pago_dinheiro || "0").toString().replace(/,/g, "")
      );
      if (valorRecebido === 0 && !state.sem_recebimento) {
        $toast.error(
          "\xC9 obrigat\xF3rio marcar a declara\xE7\xE3o quando n\xE3o houver recebimento em esp\xE9cie."
        );
        return;
      }
      const payload = {
        ...state,
        vlr_avaliacao: (_a = state.vlr_avaliacao) == null ? undefined : _a.replace(/,/g, ""),
        vlr_mercado: (_b = state.vlr_mercado) == null ? undefined : _b.replace(/,/g, ""),
        aliq_itbi: (_c = state.aliq_itbi) == null ? undefined : _c.replace(/,/g, ""),
        vlr_itbi: (_d = state.vlr_itbi) == null ? undefined : _d.replace(/,/g, "")
      };
      const { data: data2, status } = await useFetch(`${createAtosBens}`, {
        method: "POST",
        body: payload
      }, "$0Mdv6RF9cH");
      if (status.value === "success") {
        $toast.success("Imovel criado com sucesso!");
        emit("saved", {
          id: data2.value.id,
          token: data2.value.token,
          ato_id: data2.value.ato_id
        });
      }
    };
    const { data } = ([__temp, __restore] = withAsyncContext(() => useFetch(`${listarBens}`, {
      method: "POST",
      body: { cartorio_token: cartorio_token.value, imoveis: true }
    }, "$H1S2cTYpdB")), __temp = await __temp, __restore(), __temp);
    tipoBensItems.value = data.value;
    if (props.isUpdate === true) {
      const { data: dadosParte } = ([__temp, __restore] = withAsyncContext(() => useFetch(
        `${getImoveisById}/${props.imovel_id}`,
        {
          method: "GET"
        },
        "$jHrIlABk8l"
      )), __temp = await __temp, __restore(), __temp);
      if (dadosParte.value) {
        Object.keys(state).forEach((key) => {
          if (dadosParte.value[key] !== undefined) {
            state[key] = dadosParte.value[key];
          }
        });
      }
      Object.assign(statePayload, state);
    }
    const updateImovelModal = async (id) => {
      const updatedValues = {};
      Object.keys(state).forEach((key) => {
        if (state[key] !== statePayload[key]) {
          updatedValues[key] = state[key];
        }
      });
      const valorRecebido = Number(
        (state.vlr_pago_dinheiro || "0").toString().replace(/,/g, "")
      );
      if (valorRecebido === 0 && !state.sem_recebimento) {
        $toast.error(
          "\xC9 obrigat\xF3rio marcar a declara\xE7\xE3o quando n\xE3o houver recebimento em esp\xE9cie."
        );
        return;
      }
      [
        "vlr_avaliacao",
        "vlr_mercado",
        "aliq_itbi",
        "vlr_itbi",
        "vlr_pago_dinheiro"
      ].forEach((campo) => {
        var _a;
        if (updatedValues[campo]) {
          updatedValues[campo] = (_a = updatedValues[campo]) == null ? undefined : _a.toString().replace(/,/g, "");
        }
      });
      if (Object.keys(updatedValues).length === 0) {
        return;
      }
      const { status } = await useFetch(`${updateImovel}/${id}`, {
        method: "PUT",
        body: updatedValues
      }, "$BZjXR26AL9");
      if (status.value === "success") {
        $toast.success("Imovel Atualizado com sucesso!");
        emit("close-modal");
      }
    };
    const goBack = () => {
      emit("close-modal");
      emit("refresh-list");
    };
    watch(
      [
        () => state.vlr_avaliacao ? state.vlr_avaliacao.replace(/,/g, "") : "0",
        () => state.aliq_itbi ? state.aliq_itbi.replace(/,/g, "") : "0"
      ],
      ([novo_vlr_avaliacao, novo_aliq_itbi]) => {
        state.vlr_itbi = (Number(novo_vlr_avaliacao) * Number(novo_aliq_itbi) / 100).toFixed(2);
      }
    );
    return (_ctx, _push, _parent, _attrs) => {
      const _component_MoneyInput = __nuxt_component_0;
      const _component_NuxtLink = __nuxt_component_0$1;
      const _component_SaveButton = _sfc_main$6;
      if (unref(loading)) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "d-flex justify-center" }, _attrs))}>`);
        _push(ssrRenderComponent(VProgressCircular, {
          indeterminate: "",
          class: "loading-spinner",
          size: "64"
        }, null, _parent));
        _push(`</div>`);
      } else {
        _push(ssrRenderComponent(VContainer, _attrs, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(VRow, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(VCol, {
                      class: "mt-2",
                      cols: "12"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(VTextarea, {
                            label: "Descri\xE7\xE3o",
                            modelValue: unref(state).descricao,
                            "onUpdate:modelValue": ($event) => unref(state).descricao = $event,
                            "error-messages": unref(v$).descricao.$errors.map((e) => e.$message)
                          }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(VTextarea, {
                              label: "Descri\xE7\xE3o",
                              modelValue: unref(state).descricao,
                              "onUpdate:modelValue": ($event) => unref(state).descricao = $event,
                              "error-messages": unref(v$).descricao.$errors.map((e) => e.$message)
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(VCol, {
                        class: "mt-2",
                        cols: "12"
                      }, {
                        default: withCtx(() => [
                          createVNode(VTextarea, {
                            label: "Descri\xE7\xE3o",
                            modelValue: unref(state).descricao,
                            "onUpdate:modelValue": ($event) => unref(state).descricao = $event,
                            "error-messages": unref(v$).descricao.$errors.map((e) => e.$message)
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"])
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
                    _push3(ssrRenderComponent(VCol, { cols: "3" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(VAutocomplete, {
                            label: "Tipo de Registro",
                            modelValue: unref(state).tabvalores_tipo_regimovel_id,
                            "onUpdate:modelValue": ($event) => unref(state).tabvalores_tipo_regimovel_id = $event,
                            items: unref(registroItems),
                            "item-title": "descricao",
                            "item-value": "id"
                          }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(VAutocomplete, {
                              label: "Tipo de Registro",
                              modelValue: unref(state).tabvalores_tipo_regimovel_id,
                              "onUpdate:modelValue": ($event) => unref(state).tabvalores_tipo_regimovel_id = $event,
                              items: unref(registroItems),
                              "item-title": "descricao",
                              "item-value": "id"
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(VCol, { cols: "2" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(VTextField, {
                            label: "Cart\xF3rio",
                            modelValue: unref(state).registro_cartorio,
                            "onUpdate:modelValue": ($event) => unref(state).registro_cartorio = $event
                          }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(VTextField, {
                              label: "Cart\xF3rio",
                              modelValue: unref(state).registro_cartorio,
                              "onUpdate:modelValue": ($event) => unref(state).registro_cartorio = $event
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(VCol, { cols: "2" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(VTextField, {
                            label: "Matricula",
                            modelValue: unref(state).registro_matricula,
                            "onUpdate:modelValue": ($event) => unref(state).registro_matricula = $event,
                            "error-messages": unref(v$).registro_matricula.$errors.map((e) => e.$message)
                          }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(VTextField, {
                              label: "Matricula",
                              modelValue: unref(state).registro_matricula,
                              "onUpdate:modelValue": ($event) => unref(state).registro_matricula = $event,
                              "error-messages": unref(v$).registro_matricula.$errors.map((e) => e.$message)
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(VCol, null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(VTextField, {
                            label: "Letra",
                            modelValue: unref(state).matricula_letra,
                            "onUpdate:modelValue": ($event) => unref(state).matricula_letra = $event
                          }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(VTextField, {
                              label: "Letra",
                              modelValue: unref(state).matricula_letra,
                              "onUpdate:modelValue": ($event) => unref(state).matricula_letra = $event
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(VCol, { cols: "4" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(VAutocomplete, {
                            label: "Natureza",
                            modelValue: unref(state).tabvalores_nat_imovel_id,
                            "onUpdate:modelValue": ($event) => unref(state).tabvalores_nat_imovel_id = $event,
                            items: unref(naturezaItems),
                            "item-title": "descricao",
                            "item-value": "id"
                          }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(VAutocomplete, {
                              label: "Natureza",
                              modelValue: unref(state).tabvalores_nat_imovel_id,
                              "onUpdate:modelValue": ($event) => unref(state).tabvalores_nat_imovel_id = $event,
                              items: unref(naturezaItems),
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
                      createVNode(VCol, { cols: "3" }, {
                        default: withCtx(() => [
                          createVNode(VAutocomplete, {
                            label: "Tipo de Registro",
                            modelValue: unref(state).tabvalores_tipo_regimovel_id,
                            "onUpdate:modelValue": ($event) => unref(state).tabvalores_tipo_regimovel_id = $event,
                            items: unref(registroItems),
                            "item-title": "descricao",
                            "item-value": "id"
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                        ]),
                        _: 1
                      }),
                      createVNode(VCol, { cols: "2" }, {
                        default: withCtx(() => [
                          createVNode(VTextField, {
                            label: "Cart\xF3rio",
                            modelValue: unref(state).registro_cartorio,
                            "onUpdate:modelValue": ($event) => unref(state).registro_cartorio = $event
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        _: 1
                      }),
                      createVNode(VCol, { cols: "2" }, {
                        default: withCtx(() => [
                          createVNode(VTextField, {
                            label: "Matricula",
                            modelValue: unref(state).registro_matricula,
                            "onUpdate:modelValue": ($event) => unref(state).registro_matricula = $event,
                            "error-messages": unref(v$).registro_matricula.$errors.map((e) => e.$message)
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"])
                        ]),
                        _: 1
                      }),
                      createVNode(VCol, null, {
                        default: withCtx(() => [
                          createVNode(VTextField, {
                            label: "Letra",
                            modelValue: unref(state).matricula_letra,
                            "onUpdate:modelValue": ($event) => unref(state).matricula_letra = $event
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        _: 1
                      }),
                      createVNode(VCol, { cols: "4" }, {
                        default: withCtx(() => [
                          createVNode(VAutocomplete, {
                            label: "Natureza",
                            modelValue: unref(state).tabvalores_nat_imovel_id,
                            "onUpdate:modelValue": ($event) => unref(state).tabvalores_nat_imovel_id = $event,
                            items: unref(naturezaItems),
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
                    _push3(ssrRenderComponent(VCol, { cols: "2" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(VTextField, {
                            label: "CIB",
                            modelValue: unref(state).cib,
                            "onUpdate:modelValue": ($event) => unref(state).cib = $event
                          }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(VTextField, {
                              label: "CIB",
                              modelValue: unref(state).cib,
                              "onUpdate:modelValue": ($event) => unref(state).cib = $event
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(VCol, { cols: "3" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(VAutocomplete, {
                            modelValue: unref(state).tipo_id,
                            "onUpdate:modelValue": ($event) => unref(state).tipo_id = $event,
                            items: unref(tipoBensItems),
                            label: "Tipo de imovel",
                            "item-title": "descricao",
                            "item-value": "id",
                            "error-messages": unref(v$).tipo_id.$errors.map((e) => e.$message)
                          }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(VAutocomplete, {
                              modelValue: unref(state).tipo_id,
                              "onUpdate:modelValue": ($event) => unref(state).tipo_id = $event,
                              items: unref(tipoBensItems),
                              label: "Tipo de imovel",
                              "item-title": "descricao",
                              "item-value": "id",
                              "error-messages": unref(v$).tipo_id.$errors.map((e) => e.$message)
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "items", "error-messages"])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(VCol, { cols: "3" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(VTextField, {
                            label: "Inscri\xE7\xE3o Municipal",
                            modelValue: unref(state).inscricao_estadual,
                            "onUpdate:modelValue": ($event) => unref(state).inscricao_estadual = $event,
                            "error-messages": unref(v$).inscricao_estadual.$errors.map((e) => e.$message)
                          }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(VTextField, {
                              label: "Inscri\xE7\xE3o Municipal",
                              modelValue: unref(state).inscricao_estadual,
                              "onUpdate:modelValue": ($event) => unref(state).inscricao_estadual = $event,
                              "error-messages": unref(v$).inscricao_estadual.$errors.map((e) => e.$message)
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(VCol, { cols: "4" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(VAutocomplete, {
                            label: "Situa\xE7\xE3o",
                            items: unref(situacaoItems),
                            "item-title": "descricao",
                            "item-value": "id",
                            modelValue: unref(state).tabvalores_situacao_imoveis_id,
                            "onUpdate:modelValue": ($event) => unref(state).tabvalores_situacao_imoveis_id = $event
                          }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(VAutocomplete, {
                              label: "Situa\xE7\xE3o",
                              items: unref(situacaoItems),
                              "item-title": "descricao",
                              "item-value": "id",
                              modelValue: unref(state).tabvalores_situacao_imoveis_id,
                              "onUpdate:modelValue": ($event) => unref(state).tabvalores_situacao_imoveis_id = $event
                            }, null, 8, ["items", "modelValue", "onUpdate:modelValue"])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(VCol, { cols: "2" }, {
                        default: withCtx(() => [
                          createVNode(VTextField, {
                            label: "CIB",
                            modelValue: unref(state).cib,
                            "onUpdate:modelValue": ($event) => unref(state).cib = $event
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        _: 1
                      }),
                      createVNode(VCol, { cols: "3" }, {
                        default: withCtx(() => [
                          createVNode(VAutocomplete, {
                            modelValue: unref(state).tipo_id,
                            "onUpdate:modelValue": ($event) => unref(state).tipo_id = $event,
                            items: unref(tipoBensItems),
                            label: "Tipo de imovel",
                            "item-title": "descricao",
                            "item-value": "id",
                            "error-messages": unref(v$).tipo_id.$errors.map((e) => e.$message)
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "items", "error-messages"])
                        ]),
                        _: 1
                      }),
                      createVNode(VCol, { cols: "3" }, {
                        default: withCtx(() => [
                          createVNode(VTextField, {
                            label: "Inscri\xE7\xE3o Municipal",
                            modelValue: unref(state).inscricao_estadual,
                            "onUpdate:modelValue": ($event) => unref(state).inscricao_estadual = $event,
                            "error-messages": unref(v$).inscricao_estadual.$errors.map((e) => e.$message)
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"])
                        ]),
                        _: 1
                      }),
                      createVNode(VCol, { cols: "4" }, {
                        default: withCtx(() => [
                          createVNode(VAutocomplete, {
                            label: "Situa\xE7\xE3o",
                            items: unref(situacaoItems),
                            "item-title": "descricao",
                            "item-value": "id",
                            modelValue: unref(state).tabvalores_situacao_imoveis_id,
                            "onUpdate:modelValue": ($event) => unref(state).tabvalores_situacao_imoveis_id = $event
                          }, null, 8, ["items", "modelValue", "onUpdate:modelValue"])
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
                    _push3(ssrRenderComponent(VCol, { cols: "2" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        var _a, _b;
                        if (_push4) {
                          _push4(`<label${_scopeId3}>Valor Avalia\xE7\xE3o</label>`);
                          _push4(ssrRenderComponent(_component_MoneyInput, {
                            label: "Valor Avalia\xE7\xE3o",
                            modelValue: unref(state).vlr_avaliacao,
                            "onUpdate:modelValue": ($event) => unref(state).vlr_avaliacao = $event
                          }, null, _parent4, _scopeId3));
                          if (unref(v$).vlr_avaliacao.$error) {
                            _push4(`<div class="text-error text-caption mt-1"${_scopeId3}>${ssrInterpolate((_a = unref(v$).vlr_avaliacao.$errors[0]) == null ? undefined : _a.$message)}</div>`);
                          } else {
                            _push4(`<!---->`);
                          }
                        } else {
                          return [
                            createVNode("label", null, "Valor Avalia\xE7\xE3o"),
                            createVNode(_component_MoneyInput, {
                              label: "Valor Avalia\xE7\xE3o",
                              modelValue: unref(state).vlr_avaliacao,
                              "onUpdate:modelValue": ($event) => unref(state).vlr_avaliacao = $event
                            }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                            unref(v$).vlr_avaliacao.$error ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "text-error text-caption mt-1"
                            }, toDisplayString((_b = unref(v$).vlr_avaliacao.$errors[0]) == null ? undefined : _b.$message), 1)) : createCommentVNode("", true)
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(VCol, { cols: "2" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<label${_scopeId3}>Valor Mercado</label>`);
                          _push4(ssrRenderComponent(_component_MoneyInput, {
                            label: "Valor Mercado",
                            modelValue: unref(state).vlr_mercado,
                            "onUpdate:modelValue": ($event) => unref(state).vlr_mercado = $event
                          }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode("label", null, "Valor Mercado"),
                            createVNode(_component_MoneyInput, {
                              label: "Valor Mercado",
                              modelValue: unref(state).vlr_mercado,
                              "onUpdate:modelValue": ($event) => unref(state).vlr_mercado = $event
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(VCol, { cols: "1" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<label${_scopeId3}>%ITB</label>`);
                          _push4(ssrRenderComponent(_component_MoneyInput, {
                            label: "%ITB",
                            modelValue: unref(state).aliq_itbi,
                            "onUpdate:modelValue": ($event) => unref(state).aliq_itbi = $event
                          }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode("label", null, "%ITB"),
                            createVNode(_component_MoneyInput, {
                              label: "%ITB",
                              modelValue: unref(state).aliq_itbi,
                              "onUpdate:modelValue": ($event) => unref(state).aliq_itbi = $event
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(VCol, { cols: "2" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<label${_scopeId3}>Valor ITB</label>`);
                          _push4(ssrRenderComponent(_component_MoneyInput, {
                            label: "Valor ITB",
                            modelValue: unref(state).vlr_itbi,
                            "onUpdate:modelValue": ($event) => unref(state).vlr_itbi = $event
                          }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode("label", null, "Valor ITB"),
                            createVNode(_component_MoneyInput, {
                              label: "Valor ITB",
                              modelValue: unref(state).vlr_itbi,
                              "onUpdate:modelValue": ($event) => unref(state).vlr_itbi = $event
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(VCol, null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<label${_scopeId3}>Valor Recebido em R$</label>`);
                          _push4(ssrRenderComponent(_component_MoneyInput, {
                            label: "Valor Recebido em R$",
                            modelValue: unref(state).vlr_pago_dinheiro,
                            "onUpdate:modelValue": ($event) => unref(state).vlr_pago_dinheiro = $event,
                            style: { "width": "160px" }
                          }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode("label", null, "Valor Recebido em R$"),
                            createVNode(_component_MoneyInput, {
                              label: "Valor Recebido em R$",
                              modelValue: unref(state).vlr_pago_dinheiro,
                              "onUpdate:modelValue": ($event) => unref(state).vlr_pago_dinheiro = $event,
                              style: { "width": "160px" }
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(VCol, null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(VCheckbox, {
                            modelValue: unref(state).sem_recebimento,
                            "onUpdate:modelValue": ($event) => unref(state).sem_recebimento = $event,
                            label: "N\xE3o houve recebimento em R$"
                          }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(VCheckbox, {
                              modelValue: unref(state).sem_recebimento,
                              "onUpdate:modelValue": ($event) => unref(state).sem_recebimento = $event,
                              label: "N\xE3o houve recebimento em R$"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(VCol, { cols: "2" }, {
                        default: withCtx(() => {
                          var _a;
                          return [
                            createVNode("label", null, "Valor Avalia\xE7\xE3o"),
                            createVNode(_component_MoneyInput, {
                              label: "Valor Avalia\xE7\xE3o",
                              modelValue: unref(state).vlr_avaliacao,
                              "onUpdate:modelValue": ($event) => unref(state).vlr_avaliacao = $event
                            }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                            unref(v$).vlr_avaliacao.$error ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "text-error text-caption mt-1"
                            }, toDisplayString((_a = unref(v$).vlr_avaliacao.$errors[0]) == null ? undefined : _a.$message), 1)) : createCommentVNode("", true)
                          ];
                        }),
                        _: 1
                      }),
                      createVNode(VCol, { cols: "2" }, {
                        default: withCtx(() => [
                          createVNode("label", null, "Valor Mercado"),
                          createVNode(_component_MoneyInput, {
                            label: "Valor Mercado",
                            modelValue: unref(state).vlr_mercado,
                            "onUpdate:modelValue": ($event) => unref(state).vlr_mercado = $event
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        _: 1
                      }),
                      createVNode(VCol, { cols: "1" }, {
                        default: withCtx(() => [
                          createVNode("label", null, "%ITB"),
                          createVNode(_component_MoneyInput, {
                            label: "%ITB",
                            modelValue: unref(state).aliq_itbi,
                            "onUpdate:modelValue": ($event) => unref(state).aliq_itbi = $event
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        _: 1
                      }),
                      createVNode(VCol, { cols: "2" }, {
                        default: withCtx(() => [
                          createVNode("label", null, "Valor ITB"),
                          createVNode(_component_MoneyInput, {
                            label: "Valor ITB",
                            modelValue: unref(state).vlr_itbi,
                            "onUpdate:modelValue": ($event) => unref(state).vlr_itbi = $event
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        _: 1
                      }),
                      createVNode(VCol, null, {
                        default: withCtx(() => [
                          createVNode("label", null, "Valor Recebido em R$"),
                          createVNode(_component_MoneyInput, {
                            label: "Valor Recebido em R$",
                            modelValue: unref(state).vlr_pago_dinheiro,
                            "onUpdate:modelValue": ($event) => unref(state).vlr_pago_dinheiro = $event,
                            style: { "width": "160px" }
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        _: 1
                      }),
                      createVNode(VCol, null, {
                        default: withCtx(() => [
                          createVNode(VCheckbox, {
                            modelValue: unref(state).sem_recebimento,
                            "onUpdate:modelValue": ($event) => unref(state).sem_recebimento = $event,
                            label: "N\xE3o houve recebimento em R$"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        _: 1
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(VRow, { class: "mt-10" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_NuxtLink, { onClick: goBack }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(VBtn, {
                            size: "large",
                            color: "red"
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`Voltar`);
                              } else {
                                return [
                                  createTextVNode("Voltar")
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(VBtn, {
                              size: "large",
                              color: "red"
                            }, {
                              default: withCtx(() => [
                                createTextVNode("Voltar")
                              ]),
                              _: 1
                            })
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    if (__props.isUpdate) {
                      _push3(ssrRenderComponent(VBtn, {
                        class: "ml-5",
                        size: "large",
                        color: "green",
                        onClick: ($event) => updateImovelModal(props.imovel_id)
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`Atualizar`);
                          } else {
                            return [
                              createTextVNode("Atualizar")
                            ];
                          }
                        }),
                        _: 1
                      }, _parent3, _scopeId2));
                    } else {
                      _push3(ssrRenderComponent(_component_SaveButton, {
                        class: "ml-5",
                        onSave: createImovel
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(` Salvar `);
                          } else {
                            return [
                              createTextVNode(" Salvar ")
                            ];
                          }
                        }),
                        _: 1
                      }, _parent3, _scopeId2));
                    }
                  } else {
                    return [
                      createVNode(_component_NuxtLink, { onClick: goBack }, {
                        default: withCtx(() => [
                          createVNode(VBtn, {
                            size: "large",
                            color: "red"
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Voltar")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      __props.isUpdate ? (openBlock(), createBlock(VBtn, {
                        key: 0,
                        class: "ml-5",
                        size: "large",
                        color: "green",
                        onClick: ($event) => updateImovelModal(props.imovel_id)
                      }, {
                        default: withCtx(() => [
                          createTextVNode("Atualizar")
                        ]),
                        _: 1
                      }, 8, ["onClick"])) : (openBlock(), createBlock(_component_SaveButton, {
                        key: 1,
                        class: "ml-5",
                        onSave: createImovel
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Salvar ")
                        ]),
                        _: 1
                      }))
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
                      class: "mt-2",
                      cols: "12"
                    }, {
                      default: withCtx(() => [
                        createVNode(VTextarea, {
                          label: "Descri\xE7\xE3o",
                          modelValue: unref(state).descricao,
                          "onUpdate:modelValue": ($event) => unref(state).descricao = $event,
                          "error-messages": unref(v$).descricao.$errors.map((e) => e.$message)
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"])
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                createVNode(VRow, null, {
                  default: withCtx(() => [
                    createVNode(VCol, { cols: "3" }, {
                      default: withCtx(() => [
                        createVNode(VAutocomplete, {
                          label: "Tipo de Registro",
                          modelValue: unref(state).tabvalores_tipo_regimovel_id,
                          "onUpdate:modelValue": ($event) => unref(state).tabvalores_tipo_regimovel_id = $event,
                          items: unref(registroItems),
                          "item-title": "descricao",
                          "item-value": "id"
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, { cols: "2" }, {
                      default: withCtx(() => [
                        createVNode(VTextField, {
                          label: "Cart\xF3rio",
                          modelValue: unref(state).registro_cartorio,
                          "onUpdate:modelValue": ($event) => unref(state).registro_cartorio = $event
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, { cols: "2" }, {
                      default: withCtx(() => [
                        createVNode(VTextField, {
                          label: "Matricula",
                          modelValue: unref(state).registro_matricula,
                          "onUpdate:modelValue": ($event) => unref(state).registro_matricula = $event,
                          "error-messages": unref(v$).registro_matricula.$errors.map((e) => e.$message)
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"])
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, null, {
                      default: withCtx(() => [
                        createVNode(VTextField, {
                          label: "Letra",
                          modelValue: unref(state).matricula_letra,
                          "onUpdate:modelValue": ($event) => unref(state).matricula_letra = $event
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, { cols: "4" }, {
                      default: withCtx(() => [
                        createVNode(VAutocomplete, {
                          label: "Natureza",
                          modelValue: unref(state).tabvalores_nat_imovel_id,
                          "onUpdate:modelValue": ($event) => unref(state).tabvalores_nat_imovel_id = $event,
                          items: unref(naturezaItems),
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
                    createVNode(VCol, { cols: "2" }, {
                      default: withCtx(() => [
                        createVNode(VTextField, {
                          label: "CIB",
                          modelValue: unref(state).cib,
                          "onUpdate:modelValue": ($event) => unref(state).cib = $event
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, { cols: "3" }, {
                      default: withCtx(() => [
                        createVNode(VAutocomplete, {
                          modelValue: unref(state).tipo_id,
                          "onUpdate:modelValue": ($event) => unref(state).tipo_id = $event,
                          items: unref(tipoBensItems),
                          label: "Tipo de imovel",
                          "item-title": "descricao",
                          "item-value": "id",
                          "error-messages": unref(v$).tipo_id.$errors.map((e) => e.$message)
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "items", "error-messages"])
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, { cols: "3" }, {
                      default: withCtx(() => [
                        createVNode(VTextField, {
                          label: "Inscri\xE7\xE3o Municipal",
                          modelValue: unref(state).inscricao_estadual,
                          "onUpdate:modelValue": ($event) => unref(state).inscricao_estadual = $event,
                          "error-messages": unref(v$).inscricao_estadual.$errors.map((e) => e.$message)
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"])
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, { cols: "4" }, {
                      default: withCtx(() => [
                        createVNode(VAutocomplete, {
                          label: "Situa\xE7\xE3o",
                          items: unref(situacaoItems),
                          "item-title": "descricao",
                          "item-value": "id",
                          modelValue: unref(state).tabvalores_situacao_imoveis_id,
                          "onUpdate:modelValue": ($event) => unref(state).tabvalores_situacao_imoveis_id = $event
                        }, null, 8, ["items", "modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                createVNode(VRow, null, {
                  default: withCtx(() => [
                    createVNode(VCol, { cols: "2" }, {
                      default: withCtx(() => {
                        var _a;
                        return [
                          createVNode("label", null, "Valor Avalia\xE7\xE3o"),
                          createVNode(_component_MoneyInput, {
                            label: "Valor Avalia\xE7\xE3o",
                            modelValue: unref(state).vlr_avaliacao,
                            "onUpdate:modelValue": ($event) => unref(state).vlr_avaliacao = $event
                          }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                          unref(v$).vlr_avaliacao.$error ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "text-error text-caption mt-1"
                          }, toDisplayString((_a = unref(v$).vlr_avaliacao.$errors[0]) == null ? undefined : _a.$message), 1)) : createCommentVNode("", true)
                        ];
                      }),
                      _: 1
                    }),
                    createVNode(VCol, { cols: "2" }, {
                      default: withCtx(() => [
                        createVNode("label", null, "Valor Mercado"),
                        createVNode(_component_MoneyInput, {
                          label: "Valor Mercado",
                          modelValue: unref(state).vlr_mercado,
                          "onUpdate:modelValue": ($event) => unref(state).vlr_mercado = $event
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, { cols: "1" }, {
                      default: withCtx(() => [
                        createVNode("label", null, "%ITB"),
                        createVNode(_component_MoneyInput, {
                          label: "%ITB",
                          modelValue: unref(state).aliq_itbi,
                          "onUpdate:modelValue": ($event) => unref(state).aliq_itbi = $event
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, { cols: "2" }, {
                      default: withCtx(() => [
                        createVNode("label", null, "Valor ITB"),
                        createVNode(_component_MoneyInput, {
                          label: "Valor ITB",
                          modelValue: unref(state).vlr_itbi,
                          "onUpdate:modelValue": ($event) => unref(state).vlr_itbi = $event
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, null, {
                      default: withCtx(() => [
                        createVNode("label", null, "Valor Recebido em R$"),
                        createVNode(_component_MoneyInput, {
                          label: "Valor Recebido em R$",
                          modelValue: unref(state).vlr_pago_dinheiro,
                          "onUpdate:modelValue": ($event) => unref(state).vlr_pago_dinheiro = $event,
                          style: { "width": "160px" }
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, null, {
                      default: withCtx(() => [
                        createVNode(VCheckbox, {
                          modelValue: unref(state).sem_recebimento,
                          "onUpdate:modelValue": ($event) => unref(state).sem_recebimento = $event,
                          label: "N\xE3o houve recebimento em R$"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                createVNode(VRow, { class: "mt-10" }, {
                  default: withCtx(() => [
                    createVNode(_component_NuxtLink, { onClick: goBack }, {
                      default: withCtx(() => [
                        createVNode(VBtn, {
                          size: "large",
                          color: "red"
                        }, {
                          default: withCtx(() => [
                            createTextVNode("Voltar")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    __props.isUpdate ? (openBlock(), createBlock(VBtn, {
                      key: 0,
                      class: "ml-5",
                      size: "large",
                      color: "green",
                      onClick: ($event) => updateImovelModal(props.imovel_id)
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Atualizar")
                      ]),
                      _: 1
                    }, 8, ["onClick"])) : (openBlock(), createBlock(_component_SaveButton, {
                      key: 1,
                      class: "ml-5",
                      onSave: createImovel
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Salvar ")
                      ]),
                      _: 1
                    }))
                  ]),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent));
      }
    };
  }
};
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Modal/imoveis/elementos/Dados.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : undefined;
};
const _sfc_main$4 = {
  __name: "Enderecos",
  __ssrInlineRender: true,
  props: {
    ato_token: {
      type: String,
      required: true
    },
    ato_id: {
      type: Number,
      required: true
    },
    isUpdate: {
      type: Boolean
    },
    imovel_id: {
      type: Number
    }
  },
  emits: ["saved", "close-modal", "refresh-list"],
  async setup(__props, { emit: __emit }) {
    let __temp, __restore;
    const props = __props;
    const emit = __emit;
    const route = useRoute$1();
    const config = useRuntimeConfig();
    const { $toast } = useNuxtApp();
    route.params;
    const getImoveisById = `${config.public.managemant}/atos_bens`;
    const updateImovel = `${config.public.managemant}/atos_bens`;
    `${config.public.managemant}/registro_imoveis`;
    `${config.public.managemant}/natureza_imoveis`;
    `${config.public.managemant}/tipo_logradouros`;
    `${config.public.managemant}/situacao_imoveis`;
    const cep = `${config.public.auth}/service/gerencia/cep`;
    `${config.public.managemant}/listarCidades`;
    const listarBens = `${config.public.managemant}/listarTipoBens`;
    const cartorio_token = ref(useCookie("user-data").value.cartorio_token);
    const user_id = ref(useCookie("user-data").value.usuario_id).value;
    const tokenCookie = useCookie("auth_token");
    const token = tokenCookie.value;
    const triedSubmit = ref(false);
    ref([]);
    ref([]);
    const tipoLogradouroItems = ref([]);
    const cidadeItems = ref([]);
    ref([]);
    const tipoBensItems = ref([]);
    const loading = ref(true);
    const state = reactive({
      end_cidade_id: null,
      end_quadra: null,
      end_lote: null,
      tabvalores_tipologradouro_id: null,
      end_logradouro: null,
      end_logradouro_numero: null,
      end_bairro: null,
      end_cep: null,
      end_complemento: null,
      user_id,
      ato_id: Number(route.query.ato_id) || Number(props.ato_id)
    });
    const statePayload = reactive({ ...state });
    const rules = {
      end_logradouro_numero: {
        required: helpers.withMessage("", required)
      },
      end_cep: { required: helpers.withMessage("O campo \xE9 obrigat\xF3rio", required) },
      end_bairro: {
        required: helpers.withMessage("O campo \xE9 obrigat\xF3rio", required)
      },
      end_cidade_id: {
        required: helpers.withMessage("O campo \xE9 obrigat\xF3rio", required)
      },
      tabvalores_tipologradouro_id: {
        required: helpers.withMessage("O campo \xE9 obrigat\xF3rio", required)
      }
    };
    const v$ = useVuelidate(rules, state);
    const { data } = ([__temp, __restore] = withAsyncContext(() => useFetch(`${listarBens}`, {
      method: "POST",
      body: { cartorio_token: cartorio_token.value, imoveis: true }
    }, "$W62VZQp5Tx")), __temp = await __temp, __restore(), __temp);
    tipoBensItems.value = data.value;
    if (props.isUpdate === true) {
      const { data: dadosParte } = ([__temp, __restore] = withAsyncContext(() => useFetch(
        `${getImoveisById}/${props.imovel_id}`,
        {
          method: "GET"
        },
        "$uGMUgsxHFk"
      )), __temp = await __temp, __restore(), __temp);
      if (dadosParte.value) {
        Object.keys(state).forEach((key) => {
          if (dadosParte.value[key] !== undefined) {
            state[key] = dadosParte.value[key];
          }
        });
      }
      Object.assign(statePayload, state);
    }
    const updateImovelModal = async (id) => {
      triedSubmit.value = true;
      if (!props.isUpdate) {
        const isValid = await v$.value.$validate();
        if (!isValid) {
          $toast.error("Preencha todos os campos obrigat\xF3rios!");
          return;
        }
      }
      const updatedValues = {};
      Object.keys(state).forEach((key) => {
        if (state[key] !== statePayload[key]) {
          updatedValues[key] = state[key];
        }
      });
      if (Object.keys(updatedValues).length === 0) {
        return;
      }
      const { status } = await useFetch(`${updateImovel}/${id}`, {
        method: "PUT",
        body: updatedValues
      }, "$JWP9Pf1MfJ");
      if (status.value === "success") {
        $toast.success("Imovel Atualizado com sucesso!");
      }
    };
    const goBack = () => {
      emit("close-modal");
      emit("refresh-list");
    };
    watch(
      () => state.end_cep,
      async (newCep) => {
        if (newCep && newCep.length === 8) {
          try {
            const { data: data2, error } = await useFetch(`${cep}/${newCep}`, {
              headers: {
                Authorization: token
              }
            }, "$b99zbpjYFS");
            if (error.value) {
              console.error("Erro ao buscar CEP:", error.value);
              $toast.error("Erro ao buscar CEP no servidor.");
              return;
            }
            if (data2.value.logradouro && data2.value.bairro && data2.value.localidade && data2.value.uf) {
              state.end_logradouro = data2.value.logradouro;
              state.end_bairro = data2.value.bairro;
              state.end_complemento = data2.value.complemento;
              let cidade = `${data2.value.localidade}/${data2.value.uf}`.toUpperCase();
              const cidadeItem = cidadeItems.value.find(
                (item) => item.descricao === cidade
              );
              if (cidadeItem) {
                state.end_cidade_id = cidadeItem.id;
              } else {
                $toast.error("Cidade n\xE3o encontrada na lista!");
              }
            } else {
              $toast.error("CEP n\xE3o retornou dados v\xE1lidos!");
            }
          } catch (err) {
            console.error("Erro inesperado:", err);
            $toast.error("Erro inesperado. Verifique sua conex\xE3o.");
          }
        }
      }
    );
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      const _directive_mask = resolveDirective("mask");
      if (unref(loading)) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "d-flex justify-center" }, _attrs))}>`);
        _push(ssrRenderComponent(VProgressCircular, {
          indeterminate: "",
          class: "loading-spinner",
          size: "64"
        }, null, _parent));
        _push(`</div>`);
      } else {
        _push(ssrRenderComponent(VContainer, mergeProps({
          style: { "height": "500px" },
          class: "mt-2"
        }, _attrs), {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(VRow, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(VCol, { cols: "2" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(VTextField, mergeProps({
                            label: "CEP",
                            modelValue: unref(state).end_cep,
                            "onUpdate:modelValue": ($event) => unref(state).end_cep = $event,
                            modelModifiers: { trim: true },
                            "error-messages": unref(v$).end_cep.$errors.map((e) => e.$message)
                          }, ssrGetDirectiveProps(_ctx, _directive_mask, "########")), null, _parent4, _scopeId3));
                        } else {
                          return [
                            withDirectives(createVNode(VTextField, {
                              label: "CEP",
                              modelValue: unref(state).end_cep,
                              "onUpdate:modelValue": ($event) => unref(state).end_cep = $event,
                              modelModifiers: { trim: true },
                              "error-messages": unref(v$).end_cep.$errors.map((e) => e.$message)
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"]), [
                              [_directive_mask, "########"]
                            ])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(VCol, { cols: "5" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(VAutocomplete, {
                            label: "Cidade",
                            modelValue: unref(state).end_cidade_id,
                            "onUpdate:modelValue": ($event) => unref(state).end_cidade_id = $event,
                            items: unref(cidadeItems),
                            "item-title": "descricao",
                            "item-value": "id",
                            "error-messages": unref(v$).end_cidade_id.$errors.map((e) => e.$message)
                          }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(VAutocomplete, {
                              label: "Cidade",
                              modelValue: unref(state).end_cidade_id,
                              "onUpdate:modelValue": ($event) => unref(state).end_cidade_id = $event,
                              items: unref(cidadeItems),
                              "item-title": "descricao",
                              "item-value": "id",
                              "error-messages": unref(v$).end_cidade_id.$errors.map((e) => e.$message)
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "items", "error-messages"])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(VCol, { cols: "2" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(VTextField, {
                            label: "Quadra",
                            modelValue: unref(state).end_quadra,
                            "onUpdate:modelValue": ($event) => unref(state).end_quadra = $event
                          }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(VTextField, {
                              label: "Quadra",
                              modelValue: unref(state).end_quadra,
                              "onUpdate:modelValue": ($event) => unref(state).end_quadra = $event
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(VCol, { cols: "2" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(VTextField, {
                            label: "Lote",
                            modelValue: unref(state).end_lote,
                            "onUpdate:modelValue": ($event) => unref(state).end_lote = $event
                          }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(VTextField, {
                              label: "Lote",
                              modelValue: unref(state).end_lote,
                              "onUpdate:modelValue": ($event) => unref(state).end_lote = $event
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(VCol, { cols: "2" }, {
                        default: withCtx(() => [
                          withDirectives(createVNode(VTextField, {
                            label: "CEP",
                            modelValue: unref(state).end_cep,
                            "onUpdate:modelValue": ($event) => unref(state).end_cep = $event,
                            modelModifiers: { trim: true },
                            "error-messages": unref(v$).end_cep.$errors.map((e) => e.$message)
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"]), [
                            [_directive_mask, "########"]
                          ])
                        ]),
                        _: 1
                      }),
                      createVNode(VCol, { cols: "5" }, {
                        default: withCtx(() => [
                          createVNode(VAutocomplete, {
                            label: "Cidade",
                            modelValue: unref(state).end_cidade_id,
                            "onUpdate:modelValue": ($event) => unref(state).end_cidade_id = $event,
                            items: unref(cidadeItems),
                            "item-title": "descricao",
                            "item-value": "id",
                            "error-messages": unref(v$).end_cidade_id.$errors.map((e) => e.$message)
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "items", "error-messages"])
                        ]),
                        _: 1
                      }),
                      createVNode(VCol, { cols: "2" }, {
                        default: withCtx(() => [
                          createVNode(VTextField, {
                            label: "Quadra",
                            modelValue: unref(state).end_quadra,
                            "onUpdate:modelValue": ($event) => unref(state).end_quadra = $event
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        _: 1
                      }),
                      createVNode(VCol, { cols: "2" }, {
                        default: withCtx(() => [
                          createVNode(VTextField, {
                            label: "Lote",
                            modelValue: unref(state).end_lote,
                            "onUpdate:modelValue": ($event) => unref(state).end_lote = $event
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
                    _push3(ssrRenderComponent(VCol, { cols: "4" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(VAutocomplete, {
                            label: "Tipo de Logradouro",
                            modelValue: unref(state).tabvalores_tipologradouro_id,
                            "onUpdate:modelValue": ($event) => unref(state).tabvalores_tipologradouro_id = $event,
                            items: unref(tipoLogradouroItems),
                            "item-title": "descricao",
                            "item-value": "id",
                            "error-messages": unref(v$).tabvalores_tipologradouro_id.$errors.map((e) => e.$message)
                          }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(VAutocomplete, {
                              label: "Tipo de Logradouro",
                              modelValue: unref(state).tabvalores_tipologradouro_id,
                              "onUpdate:modelValue": ($event) => unref(state).tabvalores_tipologradouro_id = $event,
                              items: unref(tipoLogradouroItems),
                              "item-title": "descricao",
                              "item-value": "id",
                              "error-messages": unref(v$).tabvalores_tipologradouro_id.$errors.map((e) => e.$message)
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "items", "error-messages"])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(VCol, { cols: "6" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(VTextField, {
                            label: "Logradouro",
                            modelValue: unref(state).end_logradouro,
                            "onUpdate:modelValue": ($event) => unref(state).end_logradouro = $event
                          }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(VTextField, {
                              label: "Logradouro",
                              modelValue: unref(state).end_logradouro,
                              "onUpdate:modelValue": ($event) => unref(state).end_logradouro = $event
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(VCol, { cols: "1" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(VTextField, {
                            label: "N*",
                            modelValue: unref(state).end_logradouro_numero,
                            "onUpdate:modelValue": ($event) => unref(state).end_logradouro_numero = $event,
                            "error-messages": unref(v$).end_logradouro_numero.$errors.map((e) => e.$message)
                          }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(VTextField, {
                              label: "N*",
                              modelValue: unref(state).end_logradouro_numero,
                              "onUpdate:modelValue": ($event) => unref(state).end_logradouro_numero = $event,
                              "error-messages": unref(v$).end_logradouro_numero.$errors.map((e) => e.$message)
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(VCol, { cols: "4" }, {
                        default: withCtx(() => [
                          createVNode(VAutocomplete, {
                            label: "Tipo de Logradouro",
                            modelValue: unref(state).tabvalores_tipologradouro_id,
                            "onUpdate:modelValue": ($event) => unref(state).tabvalores_tipologradouro_id = $event,
                            items: unref(tipoLogradouroItems),
                            "item-title": "descricao",
                            "item-value": "id",
                            "error-messages": unref(v$).tabvalores_tipologradouro_id.$errors.map((e) => e.$message)
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "items", "error-messages"])
                        ]),
                        _: 1
                      }),
                      createVNode(VCol, { cols: "6" }, {
                        default: withCtx(() => [
                          createVNode(VTextField, {
                            label: "Logradouro",
                            modelValue: unref(state).end_logradouro,
                            "onUpdate:modelValue": ($event) => unref(state).end_logradouro = $event
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        _: 1
                      }),
                      createVNode(VCol, { cols: "1" }, {
                        default: withCtx(() => [
                          createVNode(VTextField, {
                            label: "N*",
                            modelValue: unref(state).end_logradouro_numero,
                            "onUpdate:modelValue": ($event) => unref(state).end_logradouro_numero = $event,
                            "error-messages": unref(v$).end_logradouro_numero.$errors.map((e) => e.$message)
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"])
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
                    _push3(ssrRenderComponent(VCol, { cols: "6" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(VTextField, {
                            label: "Bairro",
                            modelValue: unref(state).end_bairro,
                            "onUpdate:modelValue": ($event) => unref(state).end_bairro = $event,
                            "error-messages": unref(v$).end_bairro.$errors.map((e) => e.$message)
                          }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(VTextField, {
                              label: "Bairro",
                              modelValue: unref(state).end_bairro,
                              "onUpdate:modelValue": ($event) => unref(state).end_bairro = $event,
                              "error-messages": unref(v$).end_bairro.$errors.map((e) => e.$message)
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(VCol, { cols: "5" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(VTextField, {
                            label: "Complemento",
                            modelValue: unref(state).end_complemento,
                            "onUpdate:modelValue": ($event) => unref(state).end_complemento = $event
                          }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(VTextField, {
                              label: "Complemento",
                              modelValue: unref(state).end_complemento,
                              "onUpdate:modelValue": ($event) => unref(state).end_complemento = $event
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(VCol, { cols: "6" }, {
                        default: withCtx(() => [
                          createVNode(VTextField, {
                            label: "Bairro",
                            modelValue: unref(state).end_bairro,
                            "onUpdate:modelValue": ($event) => unref(state).end_bairro = $event,
                            "error-messages": unref(v$).end_bairro.$errors.map((e) => e.$message)
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"])
                        ]),
                        _: 1
                      }),
                      createVNode(VCol, { cols: "5" }, {
                        default: withCtx(() => [
                          createVNode(VTextField, {
                            label: "Complemento",
                            modelValue: unref(state).end_complemento,
                            "onUpdate:modelValue": ($event) => unref(state).end_complemento = $event
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        _: 1
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(VRow, { class: "mt-10 justify-start" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_NuxtLink, { onClick: goBack }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(VBtn, {
                            size: "large",
                            color: "red"
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`Voltar`);
                              } else {
                                return [
                                  createTextVNode("Voltar")
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(VBtn, {
                              size: "large",
                              color: "red"
                            }, {
                              default: withCtx(() => [
                                createTextVNode("Voltar")
                              ]),
                              _: 1
                            })
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    if (__props.isUpdate) {
                      _push3(ssrRenderComponent(VBtn, {
                        class: "ml-5",
                        size: "large",
                        color: "green",
                        onClick: ($event) => updateImovelModal(props.imovel_id)
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`Atualizar`);
                          } else {
                            return [
                              createTextVNode("Atualizar")
                            ];
                          }
                        }),
                        _: 1
                      }, _parent3, _scopeId2));
                    } else {
                      _push3(ssrRenderComponent(VBtn, {
                        class: "ml-5",
                        size: "large",
                        color: "green",
                        onClick: ($event) => updateImovelModal(props.imovel_id)
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`Salvar`);
                          } else {
                            return [
                              createTextVNode("Salvar")
                            ];
                          }
                        }),
                        _: 1
                      }, _parent3, _scopeId2));
                    }
                  } else {
                    return [
                      createVNode(_component_NuxtLink, { onClick: goBack }, {
                        default: withCtx(() => [
                          createVNode(VBtn, {
                            size: "large",
                            color: "red"
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Voltar")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      __props.isUpdate ? (openBlock(), createBlock(VBtn, {
                        key: 0,
                        class: "ml-5",
                        size: "large",
                        color: "green",
                        onClick: ($event) => updateImovelModal(props.imovel_id)
                      }, {
                        default: withCtx(() => [
                          createTextVNode("Atualizar")
                        ]),
                        _: 1
                      }, 8, ["onClick"])) : (openBlock(), createBlock(VBtn, {
                        key: 1,
                        class: "ml-5",
                        size: "large",
                        color: "green",
                        onClick: ($event) => updateImovelModal(props.imovel_id)
                      }, {
                        default: withCtx(() => [
                          createTextVNode("Salvar")
                        ]),
                        _: 1
                      }, 8, ["onClick"]))
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(VRow, null, {
                  default: withCtx(() => [
                    createVNode(VCol, { cols: "2" }, {
                      default: withCtx(() => [
                        withDirectives(createVNode(VTextField, {
                          label: "CEP",
                          modelValue: unref(state).end_cep,
                          "onUpdate:modelValue": ($event) => unref(state).end_cep = $event,
                          modelModifiers: { trim: true },
                          "error-messages": unref(v$).end_cep.$errors.map((e) => e.$message)
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"]), [
                          [_directive_mask, "########"]
                        ])
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, { cols: "5" }, {
                      default: withCtx(() => [
                        createVNode(VAutocomplete, {
                          label: "Cidade",
                          modelValue: unref(state).end_cidade_id,
                          "onUpdate:modelValue": ($event) => unref(state).end_cidade_id = $event,
                          items: unref(cidadeItems),
                          "item-title": "descricao",
                          "item-value": "id",
                          "error-messages": unref(v$).end_cidade_id.$errors.map((e) => e.$message)
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "items", "error-messages"])
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, { cols: "2" }, {
                      default: withCtx(() => [
                        createVNode(VTextField, {
                          label: "Quadra",
                          modelValue: unref(state).end_quadra,
                          "onUpdate:modelValue": ($event) => unref(state).end_quadra = $event
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, { cols: "2" }, {
                      default: withCtx(() => [
                        createVNode(VTextField, {
                          label: "Lote",
                          modelValue: unref(state).end_lote,
                          "onUpdate:modelValue": ($event) => unref(state).end_lote = $event
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                createVNode(VRow, null, {
                  default: withCtx(() => [
                    createVNode(VCol, { cols: "4" }, {
                      default: withCtx(() => [
                        createVNode(VAutocomplete, {
                          label: "Tipo de Logradouro",
                          modelValue: unref(state).tabvalores_tipologradouro_id,
                          "onUpdate:modelValue": ($event) => unref(state).tabvalores_tipologradouro_id = $event,
                          items: unref(tipoLogradouroItems),
                          "item-title": "descricao",
                          "item-value": "id",
                          "error-messages": unref(v$).tabvalores_tipologradouro_id.$errors.map((e) => e.$message)
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "items", "error-messages"])
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, { cols: "6" }, {
                      default: withCtx(() => [
                        createVNode(VTextField, {
                          label: "Logradouro",
                          modelValue: unref(state).end_logradouro,
                          "onUpdate:modelValue": ($event) => unref(state).end_logradouro = $event
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, { cols: "1" }, {
                      default: withCtx(() => [
                        createVNode(VTextField, {
                          label: "N*",
                          modelValue: unref(state).end_logradouro_numero,
                          "onUpdate:modelValue": ($event) => unref(state).end_logradouro_numero = $event,
                          "error-messages": unref(v$).end_logradouro_numero.$errors.map((e) => e.$message)
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"])
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                createVNode(VRow, null, {
                  default: withCtx(() => [
                    createVNode(VCol, { cols: "6" }, {
                      default: withCtx(() => [
                        createVNode(VTextField, {
                          label: "Bairro",
                          modelValue: unref(state).end_bairro,
                          "onUpdate:modelValue": ($event) => unref(state).end_bairro = $event,
                          "error-messages": unref(v$).end_bairro.$errors.map((e) => e.$message)
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"])
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, { cols: "5" }, {
                      default: withCtx(() => [
                        createVNode(VTextField, {
                          label: "Complemento",
                          modelValue: unref(state).end_complemento,
                          "onUpdate:modelValue": ($event) => unref(state).end_complemento = $event
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                createVNode(VRow, { class: "mt-10 justify-start" }, {
                  default: withCtx(() => [
                    createVNode(_component_NuxtLink, { onClick: goBack }, {
                      default: withCtx(() => [
                        createVNode(VBtn, {
                          size: "large",
                          color: "red"
                        }, {
                          default: withCtx(() => [
                            createTextVNode("Voltar")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    __props.isUpdate ? (openBlock(), createBlock(VBtn, {
                      key: 0,
                      class: "ml-5",
                      size: "large",
                      color: "green",
                      onClick: ($event) => updateImovelModal(props.imovel_id)
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Atualizar")
                      ]),
                      _: 1
                    }, 8, ["onClick"])) : (openBlock(), createBlock(VBtn, {
                      key: 1,
                      class: "ml-5",
                      size: "large",
                      color: "green",
                      onClick: ($event) => updateImovelModal(props.imovel_id)
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Salvar")
                      ]),
                      _: 1
                    }, 8, ["onClick"]))
                  ]),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent));
      }
    };
  }
};
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Modal/imoveis/elementos/Enderecos.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : undefined;
};
const _sfc_main$3 = {
  __name: "Partes",
  __ssrInlineRender: true,
  props: {
    show: Boolean,
    ato_token: String,
    ato_id: Number,
    partes_imovel: Object
  },
  emits: ["close", "update-imovel"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const isVisible = ref(props.show);
    const route = useRoute$1();
    const config = useRuntimeConfig();
    const { $toast } = useNuxtApp();
    const pessoasImovelUpdate = `${config.public.managemant}/bens_pessoa`;
    const papeisApresentante = `${config.public.managemant}/listarPapeis`;
    const partesItems = ref([]);
    const state = reactive({
      percentual: null,
      tipo_parte_id: null
    });
    const initialState = ref({});
    const emit = __emit;
    watch(
      () => props.show,
      async (newVal) => {
        isVisible.value = newVal;
        if (newVal) {
          await getPartesAtos();
          state.tipo_parte_id = props.partes_imovel.papel.descricao || null;
          state.percentual = props.partes_imovel.percentual.replace(/,/g, "") || null;
          initialState.value = {
            tipo_parte_id: state.tipo_parte_id,
            percentual: state.percentual.replace(/,/g, "")
          };
        }
      }
    );
    const closeModal = () => {
      state.tipo_parte_id = null;
      state.percentual = null;
      isVisible.value = false;
      emit("close");
    };
    const getPartesAtos = async () => {
      const { data } = await useFetch(papeisApresentante, {
        method: "POST",
        body: { tipo_ato_token: route.query.tipo_ato_token }
      }, "$IjSu4kwy4b");
      partesItems.value = data.value;
    };
    const updateAtoPessoa = async () => {
      const updatedValues = {};
      Object.keys(state).forEach((key) => {
        let newValue = state[key];
        if (key === "tipo_parte_id" && newValue) {
          newValue = newValue.id;
        }
        if (newValue !== initialState.value[key]) {
          updatedValues[key] = newValue;
        }
      });
      if (updatedValues.percentual) {
        updatedValues.percentual = updatedValues.percentual.toString().replace(/,/g, "");
      }
      const { status } = await useFetch(
        `${pessoasImovelUpdate}/${props.partes_imovel.id}`,
        {
          method: "PUT",
          body: updatedValues
        },
        "$QkvGl1R6ZY"
      );
      if (status.value === "success") {
        $toast.success("Parte Atualizada com Sucesso!");
        emit("update-imovel", updatedValues);
        closeModal();
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_MoneyInput = __nuxt_component_0;
      _push(ssrRenderComponent(VDialog, mergeProps({
        persistent: "",
        modelValue: unref(isVisible),
        "onUpdate:modelValue": ($event) => isRef(isVisible) ? isVisible.value = $event : null,
        "max-width": "800"
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VCard, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VContainer, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VRow, {
                          class: "mt-1 mb-3",
                          style: { "justify-content": "space-between" }
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<h1 class="ml-4"${_scopeId4}> Altere o papel para: ${ssrInterpolate(props.partes_imovel.pessoa.nome)}</h1>`);
                            } else {
                              return [
                                createVNode("h1", { class: "ml-4" }, " Altere o papel para: " + toDisplayString(props.partes_imovel.pessoa.nome), 1)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`<hr class="mb-5"${_scopeId3}>`);
                        _push4(ssrRenderComponent(VRow, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VCol, { cols: "8" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(VAutocomplete, {
                                      class: "mt-6",
                                      label: "Selecione o Papel",
                                      modelValue: unref(state).tipo_parte_id,
                                      "onUpdate:modelValue": ($event) => unref(state).tipo_parte_id = $event,
                                      items: unref(partesItems),
                                      "item-title": "descricao",
                                      "item-value": "descricao",
                                      "return-object": ""
                                    }, null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(VAutocomplete, {
                                        class: "mt-6",
                                        label: "Selecione o Papel",
                                        modelValue: unref(state).tipo_parte_id,
                                        "onUpdate:modelValue": ($event) => unref(state).tipo_parte_id = $event,
                                        items: unref(partesItems),
                                        "item-title": "descricao",
                                        "item-value": "descricao",
                                        "return-object": ""
                                      }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(VCol, { cols: "2" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`<label${_scopeId5}>%</label>`);
                                    _push6(ssrRenderComponent(_component_MoneyInput, {
                                      modelValue: unref(state).percentual,
                                      "onUpdate:modelValue": ($event) => unref(state).percentual = $event
                                    }, null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode("label", null, "%"),
                                      createVNode(_component_MoneyInput, {
                                        modelValue: unref(state).percentual,
                                        "onUpdate:modelValue": ($event) => unref(state).percentual = $event
                                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(VCol, { cols: "8" }, {
                                  default: withCtx(() => [
                                    createVNode(VAutocomplete, {
                                      class: "mt-6",
                                      label: "Selecione o Papel",
                                      modelValue: unref(state).tipo_parte_id,
                                      "onUpdate:modelValue": ($event) => unref(state).tipo_parte_id = $event,
                                      items: unref(partesItems),
                                      "item-title": "descricao",
                                      "item-value": "descricao",
                                      "return-object": ""
                                    }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                                  ]),
                                  _: 1
                                }),
                                createVNode(VCol, { cols: "2" }, {
                                  default: withCtx(() => [
                                    createVNode("label", null, "%"),
                                    createVNode(_component_MoneyInput, {
                                      modelValue: unref(state).percentual,
                                      "onUpdate:modelValue": ($event) => unref(state).percentual = $event
                                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
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
                          createVNode(VRow, {
                            class: "mt-1 mb-3",
                            style: { "justify-content": "space-between" }
                          }, {
                            default: withCtx(() => [
                              createVNode("h1", { class: "ml-4" }, " Altere o papel para: " + toDisplayString(props.partes_imovel.pessoa.nome), 1)
                            ]),
                            _: 1
                          }),
                          createVNode("hr", { class: "mb-5" }),
                          createVNode(VRow, null, {
                            default: withCtx(() => [
                              createVNode(VCol, { cols: "8" }, {
                                default: withCtx(() => [
                                  createVNode(VAutocomplete, {
                                    class: "mt-6",
                                    label: "Selecione o Papel",
                                    modelValue: unref(state).tipo_parte_id,
                                    "onUpdate:modelValue": ($event) => unref(state).tipo_parte_id = $event,
                                    items: unref(partesItems),
                                    "item-title": "descricao",
                                    "item-value": "descricao",
                                    "return-object": ""
                                  }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                                ]),
                                _: 1
                              }),
                              createVNode(VCol, { cols: "2" }, {
                                default: withCtx(() => [
                                  createVNode("label", null, "%"),
                                  createVNode(_component_MoneyInput, {
                                    modelValue: unref(state).percentual,
                                    "onUpdate:modelValue": ($event) => unref(state).percentual = $event
                                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
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
                  _push3(ssrRenderComponent(VCardActions, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VBtn, {
                          style: { "background-color": "red", "color": "white" },
                          onClick: closeModal
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Voltar`);
                            } else {
                              return [
                                createTextVNode("Voltar")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VBtn, {
                          style: { "background-color": "green", "color": "white" },
                          onClick: updateAtoPessoa
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Salvar`);
                            } else {
                              return [
                                createTextVNode("Salvar")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VBtn, {
                            style: { "background-color": "red", "color": "white" },
                            onClick: closeModal
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Voltar")
                            ]),
                            _: 1
                          }),
                          createVNode(VBtn, {
                            style: { "background-color": "green", "color": "white" },
                            onClick: updateAtoPessoa
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Salvar")
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
                    createVNode(VContainer, null, {
                      default: withCtx(() => [
                        createVNode(VRow, {
                          class: "mt-1 mb-3",
                          style: { "justify-content": "space-between" }
                        }, {
                          default: withCtx(() => [
                            createVNode("h1", { class: "ml-4" }, " Altere o papel para: " + toDisplayString(props.partes_imovel.pessoa.nome), 1)
                          ]),
                          _: 1
                        }),
                        createVNode("hr", { class: "mb-5" }),
                        createVNode(VRow, null, {
                          default: withCtx(() => [
                            createVNode(VCol, { cols: "8" }, {
                              default: withCtx(() => [
                                createVNode(VAutocomplete, {
                                  class: "mt-6",
                                  label: "Selecione o Papel",
                                  modelValue: unref(state).tipo_parte_id,
                                  "onUpdate:modelValue": ($event) => unref(state).tipo_parte_id = $event,
                                  items: unref(partesItems),
                                  "item-title": "descricao",
                                  "item-value": "descricao",
                                  "return-object": ""
                                }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                              ]),
                              _: 1
                            }),
                            createVNode(VCol, { cols: "2" }, {
                              default: withCtx(() => [
                                createVNode("label", null, "%"),
                                createVNode(_component_MoneyInput, {
                                  modelValue: unref(state).percentual,
                                  "onUpdate:modelValue": ($event) => unref(state).percentual = $event
                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(VCardActions, null, {
                      default: withCtx(() => [
                        createVNode(VBtn, {
                          style: { "background-color": "red", "color": "white" },
                          onClick: closeModal
                        }, {
                          default: withCtx(() => [
                            createTextVNode("Voltar")
                          ]),
                          _: 1
                        }),
                        createVNode(VBtn, {
                          style: { "background-color": "green", "color": "white" },
                          onClick: updateAtoPessoa
                        }, {
                          default: withCtx(() => [
                            createTextVNode("Salvar")
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
          } else {
            return [
              createVNode(VCard, null, {
                default: withCtx(() => [
                  createVNode(VContainer, null, {
                    default: withCtx(() => [
                      createVNode(VRow, {
                        class: "mt-1 mb-3",
                        style: { "justify-content": "space-between" }
                      }, {
                        default: withCtx(() => [
                          createVNode("h1", { class: "ml-4" }, " Altere o papel para: " + toDisplayString(props.partes_imovel.pessoa.nome), 1)
                        ]),
                        _: 1
                      }),
                      createVNode("hr", { class: "mb-5" }),
                      createVNode(VRow, null, {
                        default: withCtx(() => [
                          createVNode(VCol, { cols: "8" }, {
                            default: withCtx(() => [
                              createVNode(VAutocomplete, {
                                class: "mt-6",
                                label: "Selecione o Papel",
                                modelValue: unref(state).tipo_parte_id,
                                "onUpdate:modelValue": ($event) => unref(state).tipo_parte_id = $event,
                                items: unref(partesItems),
                                "item-title": "descricao",
                                "item-value": "descricao",
                                "return-object": ""
                              }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                            ]),
                            _: 1
                          }),
                          createVNode(VCol, { cols: "2" }, {
                            default: withCtx(() => [
                              createVNode("label", null, "%"),
                              createVNode(_component_MoneyInput, {
                                modelValue: unref(state).percentual,
                                "onUpdate:modelValue": ($event) => unref(state).percentual = $event
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode(VCardActions, null, {
                    default: withCtx(() => [
                      createVNode(VBtn, {
                        style: { "background-color": "red", "color": "white" },
                        onClick: closeModal
                      }, {
                        default: withCtx(() => [
                          createTextVNode("Voltar")
                        ]),
                        _: 1
                      }),
                      createVNode(VBtn, {
                        style: { "background-color": "green", "color": "white" },
                        onClick: updateAtoPessoa
                      }, {
                        default: withCtx(() => [
                          createTextVNode("Salvar")
                        ]),
                        _: 1
                      })
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
    };
  }
};
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Modal/imoveis/elementos/atualizar/Partes.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : undefined;
};
const _sfc_main$2 = {
  __name: "Partes",
  __ssrInlineRender: true,
  props: {
    ato_token: {
      type: String
    },
    ato_token_selected: {
      type: String
    },
    ato_id: {
      type: Number
    },
    isUpdate: {
      type: Boolean
    },
    imovel_id: {
      type: Number
    }
  },
  emits: ["saved", "close-modal", "refresh-list"],
  async setup(__props, { emit: __emit }) {
    let __temp, __restore;
    const props = __props;
    const emit = __emit;
    const route = useRoute$1();
    const config = useRuntimeConfig();
    const { $toast } = useNuxtApp();
    const listarPartesAtos = `${config.public.managemant}/partes_atos`;
    const papeisApresentante = `${config.public.managemant}/listarPapeis`;
    const buscarPessoa = `${config.public.managemant}/getLinkTipo`;
    const criarParteImovelPessoa = `${config.public.managemant}/bens_pessoa`;
    const getPartesId = `${config.public.managemant}/bens_pessoa`;
    const pessoasImovelDelete = `${config.public.managemant}/bens_pessoa`;
    const baixarDocumento = `${config.public.managemant}/download`;
    const imovelItem = ref(null);
    const pessoasItems = ref([]);
    const pessoasTable = ref([]);
    const papeisItems = ref([]);
    const isModalFichaOpen = ref(false);
    const isModalPapelOpen = ref(false);
    const ato_papel_id = ref(null);
    const ato_token = ref(route.query.tipo_ato_token);
    const fichaRender = ref(null);
    const headers = [
      {
        title: "Pessoa",
        align: "start",
        key: "pessoa.nome",
        width: "50%"
      },
      {
        title: "Papel",
        align: "start",
        key: "papel.descricao"
      },
      {
        title: "%",
        align: "start",
        key: "percentual"
      },
      { value: "actions" }
    ];
    const state = reactive({
      papeis: null,
      percentual: null
    });
    const { data } = ([__temp, __restore] = withAsyncContext(() => useFetch(papeisApresentante, {
      method: "POST"
    }, "$X6FDd5A6WK")), __temp = await __temp, __restore(), __temp);
    papeisItems.value = data.value;
    const getDadosPartes = async () => {
      const { data: dadosParte } = await useFetch(
        `${getPartesId}/${props.imovel_id}`,
        {
          method: "GET"
        },
        "$Dyv7lSgcqT"
      );
      const transformarObjetos = (listaDePartes) => {
        return listaDePartes.map((parte) => ({
          ...parte,
          pessoa: {
            ...parte.pessoa,
            documento: parte.pessoa.doc_identificacao
          },
          papel: {
            ...parte.partes_tipos
          }
        }));
      };
      const listaTransformada = transformarObjetos(dadosParte.value);
      pessoasTable.value = listaTransformada;
    };
    getDadosPartes();
    const atualizarPapel = async () => {
      await getDadosPartes();
    };
    const { data: parteAtos, status } = ([__temp, __restore] = withAsyncContext(() => useFetch(listarPartesAtos, {
      method: "POST",
      body: {
        ato_token: props.ato_token || route.query.ato_token_edit
      }
    }, "$Ir36YwSBFY")), __temp = await __temp, __restore(), __temp);
    pessoasItems.value = parteAtos.value && Object.keys(parteAtos.value).length === 0 ? [] : parteAtos.value;
    const createImovel = async () => {
      const representante = {
        pessoa: { nome: state.pessoa.pessoa_nome },
        papel: papeisItems.value.find((papel) => papel.id === state.papeis),
        percentual: state.percentual
      };
      const { data: data2, status: status2 } = await useFetch(criarParteImovelPessoa, {
        method: "POST",
        body: {
          bem_id: props.imovel_id,
          ato_id: Number(route.query.ato_id),
          pessoa_id: state.pessoa.pessoa_id,
          tipo_parte_id: state.papeis,
          user_id: useCookie("user-data").value.usuario_id,
          percentual: state.percentual.replace(/,/g, "")
        }
      }, "$z4QOGPyvCc");
      if (status2.value === "success") {
        representante.id = data2.value.id;
        $toast.success("Pessoa Registrada com Sucesso!");
        pessoasTable.value.push(representante);
      }
    };
    const redirectToFicha = async (item) => {
      var _a;
      isModalFichaOpen.value = true;
      fichaRender.value = null;
      if (!item.pessoa.id) return;
      const { data: imagemBiometria } = await useFetch(buscarPessoa, {
        method: "POST",
        body: { tipo: "ficha", id: item.pessoa.id }
      }, "$XYnqHmowsR");
      if (!((_a = imagemBiometria.value) == null ? undefined : _a.link)) return;
      const { data: link } = await useFetch(baixarDocumento, {
        method: "POST",
        body: {
          bucket: useCookie("user-data").value.cartorio_token,
          path: imagemBiometria.value.link
        }
      }, "$63DgHOk5hC");
      const linkMinio = imagemBiometria.value.link;
      const linkPayload = link.value;
      if (/\.(tr7|tiff)$/i.test(linkMinio)) {
        fichaRender.value = linkPayload;
      } else {
        fotoRender.value = `data:image/jpeg;base64,${linkPayload}`;
      }
    };
    const redirectToPapel = (item) => {
      isModalPapelOpen.value = true;
      imovelItem.value = item;
      ato_papel_id.value = item.id;
    };
    async function deletePessoa(item) {
      item.excluido = !item.excluido;
      try {
        await useFetch(`${pessoasImovelDelete}/${item.id}`, {
          method: "PUT",
          body: JSON.stringify({ excluido: item.excluido })
        }, "$3fKfAn4Pra");
      } catch (error) {
        console.error("Erro ao excluir pessoa:", error);
      }
    }
    const goBack = () => {
      emit("close-modal");
      emit("refresh-list");
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_MoneyInput = __nuxt_component_0;
      const _component_ModalImoveisElementosAtualizarPartes = _sfc_main$3;
      const _component_TiffViewer = _sfc_main$6$1;
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(ssrRenderComponent(VContainer, mergeProps({ style: { "height": "500px" } }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VRow, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VCol, {
                    class: "mt-6",
                    cols: "4"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VAutocomplete, {
                          label: "Selecione a Pessoa",
                          modelValue: unref(state).pessoa,
                          "onUpdate:modelValue": ($event) => unref(state).pessoa = $event,
                          items: unref(pessoasItems),
                          "item-title": "pessoa_nome",
                          "item-value": "id",
                          "return-object": "",
                          required: ""
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VAutocomplete, {
                            label: "Selecione a Pessoa",
                            modelValue: unref(state).pessoa,
                            "onUpdate:modelValue": ($event) => unref(state).pessoa = $event,
                            items: unref(pessoasItems),
                            "item-title": "pessoa_nome",
                            "item-value": "id",
                            "return-object": "",
                            required: ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VCol, {
                    class: "mt-6",
                    cols: "3"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VAutocomplete, {
                          label: "Papel",
                          modelValue: unref(state).papeis,
                          "onUpdate:modelValue": ($event) => unref(state).papeis = $event,
                          items: unref(papeisItems),
                          "item-title": "descricao",
                          "item-value": "id",
                          required: ""
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VAutocomplete, {
                            label: "Papel",
                            modelValue: unref(state).papeis,
                            "onUpdate:modelValue": ($event) => unref(state).papeis = $event,
                            items: unref(papeisItems),
                            "item-title": "descricao",
                            "item-value": "id",
                            required: ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VCol, { cols: "1" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<label${_scopeId3}>%</label>`);
                        _push4(ssrRenderComponent(_component_MoneyInput, {
                          modelValue: unref(state).percentual,
                          "onUpdate:modelValue": ($event) => unref(state).percentual = $event
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode("label", null, "%"),
                          createVNode(_component_MoneyInput, {
                            modelValue: unref(state).percentual,
                            "onUpdate:modelValue": ($event) => unref(state).percentual = $event
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<div${_scopeId2}><img class="mt-7"${ssrRenderAttr("src", _imports_0)} style="${ssrRenderStyle({ "width": "40px", "cursor": "pointer" })}" title="Criar Imovel"${_scopeId2}></div>`);
                } else {
                  return [
                    createVNode(VCol, {
                      class: "mt-6",
                      cols: "4"
                    }, {
                      default: withCtx(() => [
                        createVNode(VAutocomplete, {
                          label: "Selecione a Pessoa",
                          modelValue: unref(state).pessoa,
                          "onUpdate:modelValue": ($event) => unref(state).pessoa = $event,
                          items: unref(pessoasItems),
                          "item-title": "pessoa_nome",
                          "item-value": "id",
                          "return-object": "",
                          required: ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, {
                      class: "mt-6",
                      cols: "3"
                    }, {
                      default: withCtx(() => [
                        createVNode(VAutocomplete, {
                          label: "Papel",
                          modelValue: unref(state).papeis,
                          "onUpdate:modelValue": ($event) => unref(state).papeis = $event,
                          items: unref(papeisItems),
                          "item-title": "descricao",
                          "item-value": "id",
                          required: ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, { cols: "1" }, {
                      default: withCtx(() => [
                        createVNode("label", null, "%"),
                        createVNode(_component_MoneyInput, {
                          modelValue: unref(state).percentual,
                          "onUpdate:modelValue": ($event) => unref(state).percentual = $event
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode("div", null, [
                      createVNode("img", {
                        class: "mt-7",
                        src: _imports_0,
                        style: { "width": "40px", "cursor": "pointer" },
                        title: "Criar Imovel",
                        onClick: createImovel
                      })
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(VRow, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VCol, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VDataTable, {
                          style: { "height": "350px" },
                          headers,
                          items: unref(pessoasTable)
                        }, {
                          "item.actions": withCtx(({ item }, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VRow, null, {
                                default: withCtx((_4, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`<div style="${ssrRenderStyle({ "display": "flex", "cursor": "pointer", "justify-content": "flex-end" })}" class="mr-2" title="Visualizar Ficha"${_scopeId5}><img style="${ssrRenderStyle({ "width": "30px", "height": "30px" })}"${ssrRenderAttr("src", _imports_1)} alt="Visualizar"${_scopeId5}></div><div style="${ssrRenderStyle({ "display": "flex", "cursor": "pointer", "justify-content": "flex-end" })}" class="mr-2" title="Alterar Papel"${_scopeId5}><img style="${ssrRenderStyle({ "width": "30px", "height": "30px" })}"${ssrRenderAttr("src", _imports_1$1)} alt="Visualizar"${_scopeId5}></div><div class="mr-2" style="${ssrRenderStyle({ "display": "flex", "cursor": "pointer", "justify-content": "flex-end" })}" title="Deletar Pessoa"${_scopeId5}>`);
                                    if (item.excluido) {
                                      _push6(`<img style="${ssrRenderStyle({ "width": "30px", "height": "30px" })}"${ssrRenderAttr("src", _imports_2)} alt="Visualizar" title="Reativar"${_scopeId5}>`);
                                    } else {
                                      _push6(`<img${ssrRenderAttr("src", _imports_3)} alt="Excluir" class="trash-icon" style="${ssrRenderStyle({ "width": "30px", "height": "30px" })}" title="Excluir"${_scopeId5}>`);
                                    }
                                    _push6(`</div>`);
                                  } else {
                                    return [
                                      createVNode("div", {
                                        style: { "display": "flex", "cursor": "pointer", "justify-content": "flex-end" },
                                        class: "mr-2",
                                        onClick: ($event) => redirectToFicha(item),
                                        title: "Visualizar Ficha"
                                      }, [
                                        createVNode("img", {
                                          style: { "width": "30px", "height": "30px" },
                                          src: _imports_1,
                                          alt: "Visualizar"
                                        })
                                      ], 8, ["onClick"]),
                                      createVNode("div", {
                                        style: { "display": "flex", "cursor": "pointer", "justify-content": "flex-end" },
                                        onClick: ($event) => redirectToPapel(item),
                                        class: "mr-2",
                                        title: "Alterar Papel"
                                      }, [
                                        createVNode("img", {
                                          style: { "width": "30px", "height": "30px" },
                                          src: _imports_1$1,
                                          alt: "Visualizar"
                                        })
                                      ], 8, ["onClick"]),
                                      createVNode("div", {
                                        class: "mr-2",
                                        style: { "display": "flex", "cursor": "pointer", "justify-content": "flex-end" },
                                        onClick: ($event) => deletePessoa(item),
                                        title: "Deletar Pessoa"
                                      }, [
                                        item.excluido ? (openBlock(), createBlock("img", {
                                          key: 0,
                                          style: { "width": "30px", "height": "30px" },
                                          src: _imports_2,
                                          alt: "Visualizar",
                                          title: "Reativar"
                                        })) : (openBlock(), createBlock("img", {
                                          key: 1,
                                          src: _imports_3,
                                          alt: "Excluir",
                                          class: "trash-icon",
                                          style: { "width": "30px", "height": "30px" },
                                          title: "Excluir"
                                        }))
                                      ], 8, ["onClick"])
                                    ];
                                  }
                                }),
                                _: 2
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(VRow, null, {
                                  default: withCtx(() => [
                                    createVNode("div", {
                                      style: { "display": "flex", "cursor": "pointer", "justify-content": "flex-end" },
                                      class: "mr-2",
                                      onClick: ($event) => redirectToFicha(item),
                                      title: "Visualizar Ficha"
                                    }, [
                                      createVNode("img", {
                                        style: { "width": "30px", "height": "30px" },
                                        src: _imports_1,
                                        alt: "Visualizar"
                                      })
                                    ], 8, ["onClick"]),
                                    createVNode("div", {
                                      style: { "display": "flex", "cursor": "pointer", "justify-content": "flex-end" },
                                      onClick: ($event) => redirectToPapel(item),
                                      class: "mr-2",
                                      title: "Alterar Papel"
                                    }, [
                                      createVNode("img", {
                                        style: { "width": "30px", "height": "30px" },
                                        src: _imports_1$1,
                                        alt: "Visualizar"
                                      })
                                    ], 8, ["onClick"]),
                                    createVNode("div", {
                                      class: "mr-2",
                                      style: { "display": "flex", "cursor": "pointer", "justify-content": "flex-end" },
                                      onClick: ($event) => deletePessoa(item),
                                      title: "Deletar Pessoa"
                                    }, [
                                      item.excluido ? (openBlock(), createBlock("img", {
                                        key: 0,
                                        style: { "width": "30px", "height": "30px" },
                                        src: _imports_2,
                                        alt: "Visualizar",
                                        title: "Reativar"
                                      })) : (openBlock(), createBlock("img", {
                                        key: 1,
                                        src: _imports_3,
                                        alt: "Excluir",
                                        class: "trash-icon",
                                        style: { "width": "30px", "height": "30px" },
                                        title: "Excluir"
                                      }))
                                    ], 8, ["onClick"])
                                  ]),
                                  _: 2
                                }, 1024)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VDataTable, {
                            style: { "height": "350px" },
                            headers,
                            items: unref(pessoasTable)
                          }, {
                            "item.actions": withCtx(({ item }) => [
                              createVNode(VRow, null, {
                                default: withCtx(() => [
                                  createVNode("div", {
                                    style: { "display": "flex", "cursor": "pointer", "justify-content": "flex-end" },
                                    class: "mr-2",
                                    onClick: ($event) => redirectToFicha(item),
                                    title: "Visualizar Ficha"
                                  }, [
                                    createVNode("img", {
                                      style: { "width": "30px", "height": "30px" },
                                      src: _imports_1,
                                      alt: "Visualizar"
                                    })
                                  ], 8, ["onClick"]),
                                  createVNode("div", {
                                    style: { "display": "flex", "cursor": "pointer", "justify-content": "flex-end" },
                                    onClick: ($event) => redirectToPapel(item),
                                    class: "mr-2",
                                    title: "Alterar Papel"
                                  }, [
                                    createVNode("img", {
                                      style: { "width": "30px", "height": "30px" },
                                      src: _imports_1$1,
                                      alt: "Visualizar"
                                    })
                                  ], 8, ["onClick"]),
                                  createVNode("div", {
                                    class: "mr-2",
                                    style: { "display": "flex", "cursor": "pointer", "justify-content": "flex-end" },
                                    onClick: ($event) => deletePessoa(item),
                                    title: "Deletar Pessoa"
                                  }, [
                                    item.excluido ? (openBlock(), createBlock("img", {
                                      key: 0,
                                      style: { "width": "30px", "height": "30px" },
                                      src: _imports_2,
                                      alt: "Visualizar",
                                      title: "Reativar"
                                    })) : (openBlock(), createBlock("img", {
                                      key: 1,
                                      src: _imports_3,
                                      alt: "Excluir",
                                      class: "trash-icon",
                                      style: { "width": "30px", "height": "30px" },
                                      title: "Excluir"
                                    }))
                                  ], 8, ["onClick"])
                                ]),
                                _: 2
                              }, 1024)
                            ]),
                            _: 1
                          }, 8, ["items"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VCol, null, {
                      default: withCtx(() => [
                        createVNode(VDataTable, {
                          style: { "height": "350px" },
                          headers,
                          items: unref(pessoasTable)
                        }, {
                          "item.actions": withCtx(({ item }) => [
                            createVNode(VRow, null, {
                              default: withCtx(() => [
                                createVNode("div", {
                                  style: { "display": "flex", "cursor": "pointer", "justify-content": "flex-end" },
                                  class: "mr-2",
                                  onClick: ($event) => redirectToFicha(item),
                                  title: "Visualizar Ficha"
                                }, [
                                  createVNode("img", {
                                    style: { "width": "30px", "height": "30px" },
                                    src: _imports_1,
                                    alt: "Visualizar"
                                  })
                                ], 8, ["onClick"]),
                                createVNode("div", {
                                  style: { "display": "flex", "cursor": "pointer", "justify-content": "flex-end" },
                                  onClick: ($event) => redirectToPapel(item),
                                  class: "mr-2",
                                  title: "Alterar Papel"
                                }, [
                                  createVNode("img", {
                                    style: { "width": "30px", "height": "30px" },
                                    src: _imports_1$1,
                                    alt: "Visualizar"
                                  })
                                ], 8, ["onClick"]),
                                createVNode("div", {
                                  class: "mr-2",
                                  style: { "display": "flex", "cursor": "pointer", "justify-content": "flex-end" },
                                  onClick: ($event) => deletePessoa(item),
                                  title: "Deletar Pessoa"
                                }, [
                                  item.excluido ? (openBlock(), createBlock("img", {
                                    key: 0,
                                    style: { "width": "30px", "height": "30px" },
                                    src: _imports_2,
                                    alt: "Visualizar",
                                    title: "Reativar"
                                  })) : (openBlock(), createBlock("img", {
                                    key: 1,
                                    src: _imports_3,
                                    alt: "Excluir",
                                    class: "trash-icon",
                                    style: { "width": "30px", "height": "30px" },
                                    title: "Excluir"
                                  }))
                                ], 8, ["onClick"])
                              ]),
                              _: 2
                            }, 1024)
                          ]),
                          _: 1
                        }, 8, ["items"])
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_ModalImoveisElementosAtualizarPartes, {
              partes_imovel: unref(imovelItem),
              ato_token: unref(ato_token),
              ato_id: unref(ato_papel_id),
              show: unref(isModalPapelOpen),
              onClose: ($event) => isModalPapelOpen.value = false,
              onUpdateImovel: atualizarPapel
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(VDialog, {
              modelValue: unref(isModalFichaOpen),
              "onUpdate:modelValue": ($event) => isRef(isModalFichaOpen) ? isModalFichaOpen.value = $event : null,
              width: "600"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VCard, {
                    "max-width": "600",
                    title: "Ficha"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_TiffViewer, { "tiff-url": unref(fichaRender) }, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VBtn, {
                          class: "ms-auto mt-3 mb-3",
                          text: "Fechar",
                          size: "large",
                          color: "red",
                          onClick: ($event) => isModalFichaOpen.value = false
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_TiffViewer, { "tiff-url": unref(fichaRender) }, null, 8, ["tiff-url"]),
                          createVNode(VBtn, {
                            class: "ms-auto mt-3 mb-3",
                            text: "Fechar",
                            size: "large",
                            color: "red",
                            onClick: ($event) => isModalFichaOpen.value = false
                          }, null, 8, ["onClick"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VCard, {
                      "max-width": "600",
                      title: "Ficha"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_TiffViewer, { "tiff-url": unref(fichaRender) }, null, 8, ["tiff-url"]),
                        createVNode(VBtn, {
                          class: "ms-auto mt-3 mb-3",
                          text: "Fechar",
                          size: "large",
                          color: "red",
                          onClick: ($event) => isModalFichaOpen.value = false
                        }, null, 8, ["onClick"])
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(VRow, { class: "mt-5" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_NuxtLink, { onClick: goBack }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VBtn, {
                          size: "large",
                          color: "red"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Voltar`);
                            } else {
                              return [
                                createTextVNode("Voltar")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VBtn, {
                            size: "large",
                            color: "red"
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Voltar")
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
                    createVNode(_component_NuxtLink, { onClick: goBack }, {
                      default: withCtx(() => [
                        createVNode(VBtn, {
                          size: "large",
                          color: "red"
                        }, {
                          default: withCtx(() => [
                            createTextVNode("Voltar")
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
          } else {
            return [
              createVNode(VRow, null, {
                default: withCtx(() => [
                  createVNode(VCol, {
                    class: "mt-6",
                    cols: "4"
                  }, {
                    default: withCtx(() => [
                      createVNode(VAutocomplete, {
                        label: "Selecione a Pessoa",
                        modelValue: unref(state).pessoa,
                        "onUpdate:modelValue": ($event) => unref(state).pessoa = $event,
                        items: unref(pessoasItems),
                        "item-title": "pessoa_nome",
                        "item-value": "id",
                        "return-object": "",
                        required: ""
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                    ]),
                    _: 1
                  }),
                  createVNode(VCol, {
                    class: "mt-6",
                    cols: "3"
                  }, {
                    default: withCtx(() => [
                      createVNode(VAutocomplete, {
                        label: "Papel",
                        modelValue: unref(state).papeis,
                        "onUpdate:modelValue": ($event) => unref(state).papeis = $event,
                        items: unref(papeisItems),
                        "item-title": "descricao",
                        "item-value": "id",
                        required: ""
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                    ]),
                    _: 1
                  }),
                  createVNode(VCol, { cols: "1" }, {
                    default: withCtx(() => [
                      createVNode("label", null, "%"),
                      createVNode(_component_MoneyInput, {
                        modelValue: unref(state).percentual,
                        "onUpdate:modelValue": ($event) => unref(state).percentual = $event
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode("div", null, [
                    createVNode("img", {
                      class: "mt-7",
                      src: _imports_0,
                      style: { "width": "40px", "cursor": "pointer" },
                      title: "Criar Imovel",
                      onClick: createImovel
                    })
                  ])
                ]),
                _: 1
              }),
              createVNode(VRow, null, {
                default: withCtx(() => [
                  createVNode(VCol, null, {
                    default: withCtx(() => [
                      createVNode(VDataTable, {
                        style: { "height": "350px" },
                        headers,
                        items: unref(pessoasTable)
                      }, {
                        "item.actions": withCtx(({ item }) => [
                          createVNode(VRow, null, {
                            default: withCtx(() => [
                              createVNode("div", {
                                style: { "display": "flex", "cursor": "pointer", "justify-content": "flex-end" },
                                class: "mr-2",
                                onClick: ($event) => redirectToFicha(item),
                                title: "Visualizar Ficha"
                              }, [
                                createVNode("img", {
                                  style: { "width": "30px", "height": "30px" },
                                  src: _imports_1,
                                  alt: "Visualizar"
                                })
                              ], 8, ["onClick"]),
                              createVNode("div", {
                                style: { "display": "flex", "cursor": "pointer", "justify-content": "flex-end" },
                                onClick: ($event) => redirectToPapel(item),
                                class: "mr-2",
                                title: "Alterar Papel"
                              }, [
                                createVNode("img", {
                                  style: { "width": "30px", "height": "30px" },
                                  src: _imports_1$1,
                                  alt: "Visualizar"
                                })
                              ], 8, ["onClick"]),
                              createVNode("div", {
                                class: "mr-2",
                                style: { "display": "flex", "cursor": "pointer", "justify-content": "flex-end" },
                                onClick: ($event) => deletePessoa(item),
                                title: "Deletar Pessoa"
                              }, [
                                item.excluido ? (openBlock(), createBlock("img", {
                                  key: 0,
                                  style: { "width": "30px", "height": "30px" },
                                  src: _imports_2,
                                  alt: "Visualizar",
                                  title: "Reativar"
                                })) : (openBlock(), createBlock("img", {
                                  key: 1,
                                  src: _imports_3,
                                  alt: "Excluir",
                                  class: "trash-icon",
                                  style: { "width": "30px", "height": "30px" },
                                  title: "Excluir"
                                }))
                              ], 8, ["onClick"])
                            ]),
                            _: 2
                          }, 1024)
                        ]),
                        _: 1
                      }, 8, ["items"])
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(_component_ModalImoveisElementosAtualizarPartes, {
                partes_imovel: unref(imovelItem),
                ato_token: unref(ato_token),
                ato_id: unref(ato_papel_id),
                show: unref(isModalPapelOpen),
                onClose: ($event) => isModalPapelOpen.value = false,
                onUpdateImovel: atualizarPapel
              }, null, 8, ["partes_imovel", "ato_token", "ato_id", "show", "onClose"]),
              createVNode(VDialog, {
                modelValue: unref(isModalFichaOpen),
                "onUpdate:modelValue": ($event) => isRef(isModalFichaOpen) ? isModalFichaOpen.value = $event : null,
                width: "600"
              }, {
                default: withCtx(() => [
                  createVNode(VCard, {
                    "max-width": "600",
                    title: "Ficha"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_TiffViewer, { "tiff-url": unref(fichaRender) }, null, 8, ["tiff-url"]),
                      createVNode(VBtn, {
                        class: "ms-auto mt-3 mb-3",
                        text: "Fechar",
                        size: "large",
                        color: "red",
                        onClick: ($event) => isModalFichaOpen.value = false
                      }, null, 8, ["onClick"])
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["modelValue", "onUpdate:modelValue"]),
              createVNode(VRow, { class: "mt-5" }, {
                default: withCtx(() => [
                  createVNode(_component_NuxtLink, { onClick: goBack }, {
                    default: withCtx(() => [
                      createVNode(VBtn, {
                        size: "large",
                        color: "red"
                      }, {
                        default: withCtx(() => [
                          createTextVNode("Voltar")
                        ]),
                        _: 1
                      })
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
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Modal/imoveis/elementos/Partes.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : undefined;
};
const _sfc_main$1 = {
  __name: "Cadastro",
  __ssrInlineRender: true,
  props: {
    show: Boolean,
    imovel_id: Number,
    ato_token: String,
    ato_id: Number,
    ato_token_selected: String
  },
  emits: ["close", "refresh"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const tab = ref("dados");
    const isVisible = ref(props.show);
    const imovel_id_prop = ref(null);
    const ato_id_imovel = ref(null);
    const showPartes = ref(false);
    const emit = __emit;
    watch(
      () => props.show,
      (newVal) => {
        isVisible.value = newVal;
      }
    );
    const handleSave = (imovel) => {
      showPartes.value = true;
      ato_id_imovel.value = imovel.ato_id;
      imovel_id_prop.value = imovel.id;
    };
    const closeModal = () => {
      isVisible.value = false;
      showPartes.value = false;
      emit("close");
    };
    const refreshList = () => {
      emit("refresh");
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ModalImoveisElementosDados = _sfc_main$5;
      const _component_ModalImoveisElementosEnderecos = _sfc_main$4;
      const _component_ModalImoveisElementosPartes = _sfc_main$2;
      _push(ssrRenderComponent(VDialog, mergeProps({
        persistent: "",
        modelValue: unref(isVisible),
        "onUpdate:modelValue": ($event) => isRef(isVisible) ? isVisible.value = $event : null,
        "max-width": "1000"
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VCard, { style: { "height": "650px" } }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VContainer, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<h1 style="${ssrRenderStyle({ "background-color": "#f5f2f2", "color": "#525050", "padding": "10px 0px 0px 20px" })}"${_scopeId3}> Cadastro de imoveis </h1>`);
                        _push4(ssrRenderComponent(VTabs, {
                          modelValue: unref(tab),
                          "onUpdate:modelValue": ($event) => isRef(tab) ? tab.value = $event : null,
                          "bg-color": "#f5f2f2"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VTab, { value: "dados" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Dados`);
                                  } else {
                                    return [
                                      createTextVNode("Dados")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              if (unref(showPartes)) {
                                _push5(ssrRenderComponent(VTab, { value: "enderecos" }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(`Endereco`);
                                    } else {
                                      return [
                                        createTextVNode("Endereco")
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent5, _scopeId4));
                              } else {
                                _push5(`<!---->`);
                              }
                              if (unref(showPartes)) {
                                _push5(ssrRenderComponent(VTab, { value: "partes" }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(`Partes`);
                                    } else {
                                      return [
                                        createTextVNode("Partes")
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent5, _scopeId4));
                              } else {
                                _push5(`<!---->`);
                              }
                            } else {
                              return [
                                createVNode(VTab, { value: "dados" }, {
                                  default: withCtx(() => [
                                    createTextVNode("Dados")
                                  ]),
                                  _: 1
                                }),
                                unref(showPartes) ? (openBlock(), createBlock(VTab, {
                                  key: 0,
                                  value: "enderecos"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode("Endereco")
                                  ]),
                                  _: 1
                                })) : createCommentVNode("", true),
                                unref(showPartes) ? (openBlock(), createBlock(VTab, {
                                  key: 1,
                                  value: "partes"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode("Partes")
                                  ]),
                                  _: 1
                                })) : createCommentVNode("", true)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        if (unref(tab) === "dados") {
                          _push4(`<div${_scopeId3}>`);
                          _push4(ssrRenderComponent(_component_ModalImoveisElementosDados, {
                            onRefreshList: refreshList,
                            ato_id: props.ato_id,
                            onSaved: handleSave,
                            onCloseModal: closeModal
                          }, null, _parent4, _scopeId3));
                          _push4(`</div>`);
                        } else {
                          _push4(`<!---->`);
                        }
                        if (unref(tab) === "enderecos" && unref(showPartes)) {
                          _push4(`<div${_scopeId3}>`);
                          _push4(ssrRenderComponent(_component_ModalImoveisElementosEnderecos, {
                            onRefreshList: refreshList,
                            isUpdate: false,
                            ato_id: unref(ato_id_imovel),
                            ato_token: props.ato_token,
                            imovel_id: unref(imovel_id_prop),
                            onCloseModal: closeModal
                          }, null, _parent4, _scopeId3));
                          _push4(`</div>`);
                        } else {
                          _push4(`<!---->`);
                        }
                        if (unref(tab) === "partes" && unref(showPartes)) {
                          _push4(`<div${_scopeId3}>`);
                          _push4(ssrRenderComponent(_component_ModalImoveisElementosPartes, {
                            onRefreshList: refreshList,
                            imovel_id: unref(imovel_id_prop),
                            ato_token: props.ato_token,
                            ato_id: props.ato_id,
                            ato_token_selected: props.ato_token_selected,
                            onCloseModal: closeModal
                          }, null, _parent4, _scopeId3));
                          _push4(`</div>`);
                        } else {
                          _push4(`<!---->`);
                        }
                      } else {
                        return [
                          createVNode("h1", { style: { "background-color": "#f5f2f2", "color": "#525050", "padding": "10px 0px 0px 20px" } }, " Cadastro de imoveis "),
                          createVNode(VTabs, {
                            modelValue: unref(tab),
                            "onUpdate:modelValue": ($event) => isRef(tab) ? tab.value = $event : null,
                            "bg-color": "#f5f2f2"
                          }, {
                            default: withCtx(() => [
                              createVNode(VTab, { value: "dados" }, {
                                default: withCtx(() => [
                                  createTextVNode("Dados")
                                ]),
                                _: 1
                              }),
                              unref(showPartes) ? (openBlock(), createBlock(VTab, {
                                key: 0,
                                value: "enderecos"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode("Endereco")
                                ]),
                                _: 1
                              })) : createCommentVNode("", true),
                              unref(showPartes) ? (openBlock(), createBlock(VTab, {
                                key: 1,
                                value: "partes"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode("Partes")
                                ]),
                                _: 1
                              })) : createCommentVNode("", true)
                            ]),
                            _: 1
                          }, 8, ["modelValue", "onUpdate:modelValue"]),
                          unref(tab) === "dados" ? (openBlock(), createBlock("div", { key: 0 }, [
                            createVNode(_component_ModalImoveisElementosDados, {
                              onRefreshList: refreshList,
                              ato_id: props.ato_id,
                              onSaved: handleSave,
                              onCloseModal: closeModal
                            }, null, 8, ["ato_id"])
                          ])) : createCommentVNode("", true),
                          unref(tab) === "enderecos" && unref(showPartes) ? (openBlock(), createBlock("div", { key: 1 }, [
                            createVNode(_component_ModalImoveisElementosEnderecos, {
                              onRefreshList: refreshList,
                              isUpdate: false,
                              ato_id: unref(ato_id_imovel),
                              ato_token: props.ato_token,
                              imovel_id: unref(imovel_id_prop),
                              onCloseModal: closeModal
                            }, null, 8, ["ato_id", "ato_token", "imovel_id"])
                          ])) : createCommentVNode("", true),
                          unref(tab) === "partes" && unref(showPartes) ? (openBlock(), createBlock("div", { key: 2 }, [
                            createVNode(_component_ModalImoveisElementosPartes, {
                              onRefreshList: refreshList,
                              imovel_id: unref(imovel_id_prop),
                              ato_token: props.ato_token,
                              ato_id: props.ato_id,
                              ato_token_selected: props.ato_token_selected,
                              onCloseModal: closeModal
                            }, null, 8, ["imovel_id", "ato_token", "ato_id", "ato_token_selected"])
                          ])) : createCommentVNode("", true)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VContainer, null, {
                      default: withCtx(() => [
                        createVNode("h1", { style: { "background-color": "#f5f2f2", "color": "#525050", "padding": "10px 0px 0px 20px" } }, " Cadastro de imoveis "),
                        createVNode(VTabs, {
                          modelValue: unref(tab),
                          "onUpdate:modelValue": ($event) => isRef(tab) ? tab.value = $event : null,
                          "bg-color": "#f5f2f2"
                        }, {
                          default: withCtx(() => [
                            createVNode(VTab, { value: "dados" }, {
                              default: withCtx(() => [
                                createTextVNode("Dados")
                              ]),
                              _: 1
                            }),
                            unref(showPartes) ? (openBlock(), createBlock(VTab, {
                              key: 0,
                              value: "enderecos"
                            }, {
                              default: withCtx(() => [
                                createTextVNode("Endereco")
                              ]),
                              _: 1
                            })) : createCommentVNode("", true),
                            unref(showPartes) ? (openBlock(), createBlock(VTab, {
                              key: 1,
                              value: "partes"
                            }, {
                              default: withCtx(() => [
                                createTextVNode("Partes")
                              ]),
                              _: 1
                            })) : createCommentVNode("", true)
                          ]),
                          _: 1
                        }, 8, ["modelValue", "onUpdate:modelValue"]),
                        unref(tab) === "dados" ? (openBlock(), createBlock("div", { key: 0 }, [
                          createVNode(_component_ModalImoveisElementosDados, {
                            onRefreshList: refreshList,
                            ato_id: props.ato_id,
                            onSaved: handleSave,
                            onCloseModal: closeModal
                          }, null, 8, ["ato_id"])
                        ])) : createCommentVNode("", true),
                        unref(tab) === "enderecos" && unref(showPartes) ? (openBlock(), createBlock("div", { key: 1 }, [
                          createVNode(_component_ModalImoveisElementosEnderecos, {
                            onRefreshList: refreshList,
                            isUpdate: false,
                            ato_id: unref(ato_id_imovel),
                            ato_token: props.ato_token,
                            imovel_id: unref(imovel_id_prop),
                            onCloseModal: closeModal
                          }, null, 8, ["ato_id", "ato_token", "imovel_id"])
                        ])) : createCommentVNode("", true),
                        unref(tab) === "partes" && unref(showPartes) ? (openBlock(), createBlock("div", { key: 2 }, [
                          createVNode(_component_ModalImoveisElementosPartes, {
                            onRefreshList: refreshList,
                            imovel_id: unref(imovel_id_prop),
                            ato_token: props.ato_token,
                            ato_id: props.ato_id,
                            ato_token_selected: props.ato_token_selected,
                            onCloseModal: closeModal
                          }, null, 8, ["imovel_id", "ato_token", "ato_id", "ato_token_selected"])
                        ])) : createCommentVNode("", true)
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
              createVNode(VCard, { style: { "height": "650px" } }, {
                default: withCtx(() => [
                  createVNode(VContainer, null, {
                    default: withCtx(() => [
                      createVNode("h1", { style: { "background-color": "#f5f2f2", "color": "#525050", "padding": "10px 0px 0px 20px" } }, " Cadastro de imoveis "),
                      createVNode(VTabs, {
                        modelValue: unref(tab),
                        "onUpdate:modelValue": ($event) => isRef(tab) ? tab.value = $event : null,
                        "bg-color": "#f5f2f2"
                      }, {
                        default: withCtx(() => [
                          createVNode(VTab, { value: "dados" }, {
                            default: withCtx(() => [
                              createTextVNode("Dados")
                            ]),
                            _: 1
                          }),
                          unref(showPartes) ? (openBlock(), createBlock(VTab, {
                            key: 0,
                            value: "enderecos"
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Endereco")
                            ]),
                            _: 1
                          })) : createCommentVNode("", true),
                          unref(showPartes) ? (openBlock(), createBlock(VTab, {
                            key: 1,
                            value: "partes"
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Partes")
                            ]),
                            _: 1
                          })) : createCommentVNode("", true)
                        ]),
                        _: 1
                      }, 8, ["modelValue", "onUpdate:modelValue"]),
                      unref(tab) === "dados" ? (openBlock(), createBlock("div", { key: 0 }, [
                        createVNode(_component_ModalImoveisElementosDados, {
                          onRefreshList: refreshList,
                          ato_id: props.ato_id,
                          onSaved: handleSave,
                          onCloseModal: closeModal
                        }, null, 8, ["ato_id"])
                      ])) : createCommentVNode("", true),
                      unref(tab) === "enderecos" && unref(showPartes) ? (openBlock(), createBlock("div", { key: 1 }, [
                        createVNode(_component_ModalImoveisElementosEnderecos, {
                          onRefreshList: refreshList,
                          isUpdate: false,
                          ato_id: unref(ato_id_imovel),
                          ato_token: props.ato_token,
                          imovel_id: unref(imovel_id_prop),
                          onCloseModal: closeModal
                        }, null, 8, ["ato_id", "ato_token", "imovel_id"])
                      ])) : createCommentVNode("", true),
                      unref(tab) === "partes" && unref(showPartes) ? (openBlock(), createBlock("div", { key: 2 }, [
                        createVNode(_component_ModalImoveisElementosPartes, {
                          onRefreshList: refreshList,
                          imovel_id: unref(imovel_id_prop),
                          ato_token: props.ato_token,
                          ato_id: props.ato_id,
                          ato_token_selected: props.ato_token_selected,
                          onCloseModal: closeModal
                        }, null, 8, ["imovel_id", "ato_token", "ato_id", "ato_token_selected"])
                      ])) : createCommentVNode("", true)
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
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Modal/imoveis/Cadastro.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : undefined;
};
const _sfc_main = {
  __name: "Atualizar",
  __ssrInlineRender: true,
  props: {
    show: Boolean,
    imovel_id: Number,
    ato_token_selected: String
  },
  emits: ["close", "refresh"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const tab = ref("dados");
    const isVisible = ref(props.show);
    const emit = __emit;
    watch(
      () => props.show,
      (newVal) => {
        isVisible.value = newVal;
      }
    );
    const closeModal = () => {
      isVisible.value = false;
      emit("close");
    };
    const refreshList = () => {
      emit("refresh");
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ModalImoveisElementosDados = _sfc_main$5;
      const _component_ModalImoveisElementosEnderecos = _sfc_main$4;
      const _component_ModalImoveisElementosPartes = _sfc_main$2;
      _push(ssrRenderComponent(VDialog, mergeProps({
        persistent: "",
        modelValue: unref(isVisible),
        "onUpdate:modelValue": ($event) => isRef(isVisible) ? isVisible.value = $event : null,
        "max-width": "1000"
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VCard, { style: { "height": "650px" } }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VContainer, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<h1 style="${ssrRenderStyle({ "background-color": "#f5f2f2", "color": "#525050", "padding": "10px 0px 0px 20px" })}"${_scopeId3}> Atualizar imovel </h1>`);
                        _push4(ssrRenderComponent(VTabs, {
                          modelValue: unref(tab),
                          "onUpdate:modelValue": ($event) => isRef(tab) ? tab.value = $event : null,
                          "bg-color": "#f5f2f2"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VTab, { value: "dados" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Dados`);
                                  } else {
                                    return [
                                      createTextVNode("Dados")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(VTab, { value: "enderecos" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Endere\xE7o`);
                                  } else {
                                    return [
                                      createTextVNode("Endere\xE7o")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(VTab, { value: "partes" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Partes`);
                                  } else {
                                    return [
                                      createTextVNode("Partes")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(VTab, { value: "dados" }, {
                                  default: withCtx(() => [
                                    createTextVNode("Dados")
                                  ]),
                                  _: 1
                                }),
                                createVNode(VTab, { value: "enderecos" }, {
                                  default: withCtx(() => [
                                    createTextVNode("Endere\xE7o")
                                  ]),
                                  _: 1
                                }),
                                createVNode(VTab, { value: "partes" }, {
                                  default: withCtx(() => [
                                    createTextVNode("Partes")
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        if (unref(tab) === "dados") {
                          _push4(`<div${_scopeId3}>`);
                          _push4(ssrRenderComponent(_component_ModalImoveisElementosDados, {
                            onRefreshList: refreshList,
                            isUpdate: true,
                            imovel_id: props.imovel_id,
                            onCloseModal: closeModal
                          }, null, _parent4, _scopeId3));
                          _push4(`</div>`);
                        } else {
                          _push4(`<!---->`);
                        }
                        if (unref(tab) === "enderecos") {
                          _push4(`<div${_scopeId3}>`);
                          _push4(ssrRenderComponent(_component_ModalImoveisElementosEnderecos, {
                            onRefreshList: refreshList,
                            isUpdate: true,
                            imovel_id: props.imovel_id,
                            onCloseModal: closeModal
                          }, null, _parent4, _scopeId3));
                          _push4(`</div>`);
                        } else {
                          _push4(`<!---->`);
                        }
                        if (unref(tab) === "partes") {
                          _push4(`<div${_scopeId3}>`);
                          _push4(ssrRenderComponent(_component_ModalImoveisElementosPartes, {
                            imovel_id: props.imovel_id,
                            ato_token_selected: props.ato_token_selected,
                            onCloseModal: closeModal
                          }, null, _parent4, _scopeId3));
                          _push4(`</div>`);
                        } else {
                          _push4(`<!---->`);
                        }
                      } else {
                        return [
                          createVNode("h1", { style: { "background-color": "#f5f2f2", "color": "#525050", "padding": "10px 0px 0px 20px" } }, " Atualizar imovel "),
                          createVNode(VTabs, {
                            modelValue: unref(tab),
                            "onUpdate:modelValue": ($event) => isRef(tab) ? tab.value = $event : null,
                            "bg-color": "#f5f2f2"
                          }, {
                            default: withCtx(() => [
                              createVNode(VTab, { value: "dados" }, {
                                default: withCtx(() => [
                                  createTextVNode("Dados")
                                ]),
                                _: 1
                              }),
                              createVNode(VTab, { value: "enderecos" }, {
                                default: withCtx(() => [
                                  createTextVNode("Endere\xE7o")
                                ]),
                                _: 1
                              }),
                              createVNode(VTab, { value: "partes" }, {
                                default: withCtx(() => [
                                  createTextVNode("Partes")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }, 8, ["modelValue", "onUpdate:modelValue"]),
                          unref(tab) === "dados" ? (openBlock(), createBlock("div", { key: 0 }, [
                            createVNode(_component_ModalImoveisElementosDados, {
                              onRefreshList: refreshList,
                              isUpdate: true,
                              imovel_id: props.imovel_id,
                              onCloseModal: closeModal
                            }, null, 8, ["imovel_id"])
                          ])) : createCommentVNode("", true),
                          unref(tab) === "enderecos" ? (openBlock(), createBlock("div", { key: 1 }, [
                            createVNode(_component_ModalImoveisElementosEnderecos, {
                              onRefreshList: refreshList,
                              isUpdate: true,
                              imovel_id: props.imovel_id,
                              onCloseModal: closeModal
                            }, null, 8, ["imovel_id"])
                          ])) : createCommentVNode("", true),
                          unref(tab) === "partes" ? (openBlock(), createBlock("div", { key: 2 }, [
                            createVNode(_component_ModalImoveisElementosPartes, {
                              imovel_id: props.imovel_id,
                              ato_token_selected: props.ato_token_selected,
                              onCloseModal: closeModal
                            }, null, 8, ["imovel_id", "ato_token_selected"])
                          ])) : createCommentVNode("", true)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VContainer, null, {
                      default: withCtx(() => [
                        createVNode("h1", { style: { "background-color": "#f5f2f2", "color": "#525050", "padding": "10px 0px 0px 20px" } }, " Atualizar imovel "),
                        createVNode(VTabs, {
                          modelValue: unref(tab),
                          "onUpdate:modelValue": ($event) => isRef(tab) ? tab.value = $event : null,
                          "bg-color": "#f5f2f2"
                        }, {
                          default: withCtx(() => [
                            createVNode(VTab, { value: "dados" }, {
                              default: withCtx(() => [
                                createTextVNode("Dados")
                              ]),
                              _: 1
                            }),
                            createVNode(VTab, { value: "enderecos" }, {
                              default: withCtx(() => [
                                createTextVNode("Endere\xE7o")
                              ]),
                              _: 1
                            }),
                            createVNode(VTab, { value: "partes" }, {
                              default: withCtx(() => [
                                createTextVNode("Partes")
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }, 8, ["modelValue", "onUpdate:modelValue"]),
                        unref(tab) === "dados" ? (openBlock(), createBlock("div", { key: 0 }, [
                          createVNode(_component_ModalImoveisElementosDados, {
                            onRefreshList: refreshList,
                            isUpdate: true,
                            imovel_id: props.imovel_id,
                            onCloseModal: closeModal
                          }, null, 8, ["imovel_id"])
                        ])) : createCommentVNode("", true),
                        unref(tab) === "enderecos" ? (openBlock(), createBlock("div", { key: 1 }, [
                          createVNode(_component_ModalImoveisElementosEnderecos, {
                            onRefreshList: refreshList,
                            isUpdate: true,
                            imovel_id: props.imovel_id,
                            onCloseModal: closeModal
                          }, null, 8, ["imovel_id"])
                        ])) : createCommentVNode("", true),
                        unref(tab) === "partes" ? (openBlock(), createBlock("div", { key: 2 }, [
                          createVNode(_component_ModalImoveisElementosPartes, {
                            imovel_id: props.imovel_id,
                            ato_token_selected: props.ato_token_selected,
                            onCloseModal: closeModal
                          }, null, 8, ["imovel_id", "ato_token_selected"])
                        ])) : createCommentVNode("", true)
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
              createVNode(VCard, { style: { "height": "650px" } }, {
                default: withCtx(() => [
                  createVNode(VContainer, null, {
                    default: withCtx(() => [
                      createVNode("h1", { style: { "background-color": "#f5f2f2", "color": "#525050", "padding": "10px 0px 0px 20px" } }, " Atualizar imovel "),
                      createVNode(VTabs, {
                        modelValue: unref(tab),
                        "onUpdate:modelValue": ($event) => isRef(tab) ? tab.value = $event : null,
                        "bg-color": "#f5f2f2"
                      }, {
                        default: withCtx(() => [
                          createVNode(VTab, { value: "dados" }, {
                            default: withCtx(() => [
                              createTextVNode("Dados")
                            ]),
                            _: 1
                          }),
                          createVNode(VTab, { value: "enderecos" }, {
                            default: withCtx(() => [
                              createTextVNode("Endere\xE7o")
                            ]),
                            _: 1
                          }),
                          createVNode(VTab, { value: "partes" }, {
                            default: withCtx(() => [
                              createTextVNode("Partes")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }, 8, ["modelValue", "onUpdate:modelValue"]),
                      unref(tab) === "dados" ? (openBlock(), createBlock("div", { key: 0 }, [
                        createVNode(_component_ModalImoveisElementosDados, {
                          onRefreshList: refreshList,
                          isUpdate: true,
                          imovel_id: props.imovel_id,
                          onCloseModal: closeModal
                        }, null, 8, ["imovel_id"])
                      ])) : createCommentVNode("", true),
                      unref(tab) === "enderecos" ? (openBlock(), createBlock("div", { key: 1 }, [
                        createVNode(_component_ModalImoveisElementosEnderecos, {
                          onRefreshList: refreshList,
                          isUpdate: true,
                          imovel_id: props.imovel_id,
                          onCloseModal: closeModal
                        }, null, 8, ["imovel_id"])
                      ])) : createCommentVNode("", true),
                      unref(tab) === "partes" ? (openBlock(), createBlock("div", { key: 2 }, [
                        createVNode(_component_ModalImoveisElementosPartes, {
                          imovel_id: props.imovel_id,
                          ato_token_selected: props.ato_token_selected,
                          onCloseModal: closeModal
                        }, null, 8, ["imovel_id", "ato_token_selected"])
                      ])) : createCommentVNode("", true)
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
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Modal/imoveis/Atualizar.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : undefined;
};

export { _sfc_main$1 as _, _sfc_main as a };
//# sourceMappingURL=Atualizar-DnYXJOrn.mjs.map
