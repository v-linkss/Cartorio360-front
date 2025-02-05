import { _ as __nuxt_component_0 } from './MoneyInput-nC85fGUl.mjs';
import { _ as __nuxt_component_0$1 } from './nuxt-link-TpvcaGEw.mjs';
import { useSSRContext, ref, watch, mergeProps, unref, isRef, withCtx, createTextVNode, createVNode, openBlock, createBlock, createCommentVNode, reactive, withAsyncContext } from 'vue';
import { ssrRenderComponent, ssrRenderStyle, ssrRenderAttrs, ssrRenderAttr } from 'vue/server-renderer';
import { useVuelidate } from '@vuelidate/core';
import { helpers, required } from '@vuelidate/validators';
import { aL as useRoute$1, b as useNuxtApp, e as useCookie, aN as VProgressCircular, V as VTextField, F as VBtn, c as useRuntimeConfig } from './server.mjs';
import { u as useFetch } from './fetch-CmQgfhnJ.mjs';
import { V as VContainer } from './VContainer-DUPM_BP9.mjs';
import { V as VRow } from './VRow-DbcfFNio.mjs';
import { V as VCol } from './VCol-BY-FaYhw.mjs';
import { V as VTextarea } from './VTextarea-AmwKvadh.mjs';
import { V as VAutocomplete } from './VAutocomplete-BkWVMD0Z.mjs';
import { V as VTabs, a as VTab, b as VTabsWindow, c as VTabsWindowItem, _ as _sfc_main$3, d as _sfc_main$6 } from './RegistroPessoas-r3RP1qyC.mjs';
import { d as _sfc_main$1$1 } from './escanear-9blW2_Ek.mjs';
import { _ as _imports_1 } from './visualizar-BoZ30DMV.mjs';
import { _ as _imports_0, a as _imports_1$1, b as _imports_2, c as _imports_3 } from './mudarStatus-CVlVNUDw.mjs';
import { V as VDataTable } from './VDataTable-C53h7B9w.mjs';
import { a as VDialog, V as VCard } from './VDialog-BSU3_51C.mjs';

const _sfc_main$2 = {
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
  emits: ["saved", "close-modal"],
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
    const tipoLogradouroItems = ref([]);
    const cidadeItems = ref([]);
    const situacaoItems = ref([]);
    const tipoBensItems = ref([]);
    const loading = ref(true);
    const state = reactive({
      vlr_alienacao: null,
      tabvalores_tipo_regimovel_id: null,
      registro_cartorio: null,
      registro_matricula: null,
      registro_matricula_letra: null,
      tabvalores_nat_imovel_id: null,
      cib: null,
      end_cidade_id: null,
      end_quadra: null,
      end_lote: null,
      tabvalores_tipologradouro_id: null,
      end_logradouro: null,
      end_logradouro_numero: null,
      end_bairro: null,
      end_cep: null,
      end_complemento: null,
      tipo_id: null,
      descricao: null,
      inscricao_estadual: null,
      tabvalores_situacao_imoveis_id: null,
      tipo_id: null,
      vlr_alienacao: null,
      vlr_mercado: null,
      valor_mercado: "0.00",
      aliq_itbi: null,
      vlr_itbi: null,
      user_id,
      ato_id: Number(route.query.ato_id) || Number(props.ato_id)
    });
    const statePayload = reactive({ ...state });
    const rules = {
      descricao: {
        required: helpers.withMessage("O campo \xE9 obrigat\xF3rio", required)
      },
      tipo_id: { required: helpers.withMessage("O campo \xE9 obrigat\xF3rio", required) }
    };
    const v$ = useVuelidate(rules, state);
    const createImovel = async () => {
      const isValid = await v$.value.$validate();
      if (!isValid) {
        $toast.error("Preencha todos os campos obrigat\xF3rios!");
        return;
      }
      const { status } = await useFetch(`${createAtosBens}`, {
        method: "POST",
        body: state
      }, "$0Mdv6RF9cH");
      if (status.value === "success") {
        $toast.success("Imovel criado com sucesso!");
        emit("saved");
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
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_MoneyInput = __nuxt_component_0;
      const _component_NuxtLink = __nuxt_component_0$1;
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
                      class: "mt-5",
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
                        class: "mt-5",
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
                            "onUpdate:modelValue": ($event) => unref(state).registro_matricula = $event
                          }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(VTextField, {
                              label: "Matricula",
                              modelValue: unref(state).registro_matricula,
                              "onUpdate:modelValue": ($event) => unref(state).registro_matricula = $event
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
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
                            modelValue: unref(state).registro_matricula_letra,
                            "onUpdate:modelValue": ($event) => unref(state).registro_matricula_letra = $event
                          }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(VTextField, {
                              label: "Letra",
                              modelValue: unref(state).registro_matricula_letra,
                              "onUpdate:modelValue": ($event) => unref(state).registro_matricula_letra = $event
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(VCol, { cols: "2" }, {
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
                    _push3(ssrRenderComponent(VCol, { cols: "1" }, {
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
                            "onUpdate:modelValue": ($event) => unref(state).registro_matricula = $event
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        _: 1
                      }),
                      createVNode(VCol, null, {
                        default: withCtx(() => [
                          createVNode(VTextField, {
                            label: "Letra",
                            modelValue: unref(state).registro_matricula_letra,
                            "onUpdate:modelValue": ($event) => unref(state).registro_matricula_letra = $event
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        _: 1
                      }),
                      createVNode(VCol, { cols: "2" }, {
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
                      }),
                      createVNode(VCol, { cols: "1" }, {
                        default: withCtx(() => [
                          createVNode(VTextField, {
                            label: "CIB",
                            modelValue: unref(state).cib,
                            "onUpdate:modelValue": ($event) => unref(state).cib = $event
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
                    _push3(ssrRenderComponent(VCol, { cols: "3" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(VAutocomplete, {
                            label: "Cidade",
                            modelValue: unref(state).end_cidade_id,
                            "onUpdate:modelValue": ($event) => unref(state).end_cidade_id = $event,
                            items: unref(cidadeItems),
                            "item-title": "descricao",
                            "item-value": "id"
                          }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(VAutocomplete, {
                              label: "Cidade",
                              modelValue: unref(state).end_cidade_id,
                              "onUpdate:modelValue": ($event) => unref(state).end_cidade_id = $event,
                              items: unref(cidadeItems),
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
                    _push3(ssrRenderComponent(VCol, { cols: "4" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(VAutocomplete, {
                            label: "Logradouro",
                            modelValue: unref(state).tabvalores_tipologradouro_id,
                            "onUpdate:modelValue": ($event) => unref(state).tabvalores_tipologradouro_id = $event,
                            items: unref(tipoLogradouroItems),
                            "item-title": "descricao",
                            "item-value": "id"
                          }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(VAutocomplete, {
                              label: "Logradouro",
                              modelValue: unref(state).tabvalores_tipologradouro_id,
                              "onUpdate:modelValue": ($event) => unref(state).tabvalores_tipologradouro_id = $event,
                              items: unref(tipoLogradouroItems),
                              "item-title": "descricao",
                              "item-value": "id"
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
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
                            "onUpdate:modelValue": ($event) => unref(state).end_logradouro_numero = $event
                          }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(VTextField, {
                              label: "N*",
                              modelValue: unref(state).end_logradouro_numero,
                              "onUpdate:modelValue": ($event) => unref(state).end_logradouro_numero = $event
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
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
                            label: "Cidade",
                            modelValue: unref(state).end_cidade_id,
                            "onUpdate:modelValue": ($event) => unref(state).end_cidade_id = $event,
                            items: unref(cidadeItems),
                            "item-title": "descricao",
                            "item-value": "id"
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
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
                      }),
                      createVNode(VCol, { cols: "4" }, {
                        default: withCtx(() => [
                          createVNode(VAutocomplete, {
                            label: "Logradouro",
                            modelValue: unref(state).tabvalores_tipologradouro_id,
                            "onUpdate:modelValue": ($event) => unref(state).tabvalores_tipologradouro_id = $event,
                            items: unref(tipoLogradouroItems),
                            "item-title": "descricao",
                            "item-value": "id"
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                        ]),
                        _: 1
                      }),
                      createVNode(VCol, { cols: "1" }, {
                        default: withCtx(() => [
                          createVNode(VTextField, {
                            label: "N*",
                            modelValue: unref(state).end_logradouro_numero,
                            "onUpdate:modelValue": ($event) => unref(state).end_logradouro_numero = $event
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
                    _push3(ssrRenderComponent(VCol, null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(VTextField, {
                            label: "Bairro",
                            modelValue: unref(state).end_bairro,
                            "onUpdate:modelValue": ($event) => unref(state).end_bairro = $event
                          }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(VTextField, {
                              label: "Bairro",
                              modelValue: unref(state).end_bairro,
                              "onUpdate:modelValue": ($event) => unref(state).end_bairro = $event
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(VCol, null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(VTextField, {
                            label: "CEP",
                            modelValue: unref(state).end_cep,
                            "onUpdate:modelValue": ($event) => unref(state).end_cep = $event
                          }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(VTextField, {
                              label: "CEP",
                              modelValue: unref(state).end_cep,
                              "onUpdate:modelValue": ($event) => unref(state).end_cep = $event
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(VCol, null, {
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
                          _push4(ssrRenderComponent(VTextField, { label: "Inscri\xE7\xE3o Municipal" }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(VTextField, { label: "Inscri\xE7\xE3o Municipal" })
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(VCol, null, {
                        default: withCtx(() => [
                          createVNode(VTextField, {
                            label: "Bairro",
                            modelValue: unref(state).end_bairro,
                            "onUpdate:modelValue": ($event) => unref(state).end_bairro = $event
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        _: 1
                      }),
                      createVNode(VCol, null, {
                        default: withCtx(() => [
                          createVNode(VTextField, {
                            label: "CEP",
                            modelValue: unref(state).end_cep,
                            "onUpdate:modelValue": ($event) => unref(state).end_cep = $event
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        _: 1
                      }),
                      createVNode(VCol, null, {
                        default: withCtx(() => [
                          createVNode(VTextField, {
                            label: "Complemento",
                            modelValue: unref(state).end_complemento,
                            "onUpdate:modelValue": ($event) => unref(state).end_complemento = $event
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
                          createVNode(VTextField, { label: "Inscri\xE7\xE3o Municipal" })
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
                      class: "mt-6",
                      cols: "4"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(VAutocomplete, {
                            label: "Situa\xE7\xE3o",
                            items: unref(situacaoItems),
                            "item-title": "descricao",
                            "item-value": "id"
                          }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(VAutocomplete, {
                              label: "Situa\xE7\xE3o",
                              items: unref(situacaoItems),
                              "item-title": "descricao",
                              "item-value": "id"
                            }, null, 8, ["items"])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(VCol, { cols: "2" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<label${_scopeId3}>Valor Aliena\xE7\xE3o</label>`);
                          _push4(ssrRenderComponent(_component_MoneyInput, {
                            label: "Valor Aliena\xE7\xE3o",
                            modelValue: unref(state).vlr_alienacao,
                            "onUpdate:modelValue": ($event) => unref(state).vlr_alienacao = $event
                          }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode("label", null, "Valor Aliena\xE7\xE3o"),
                            createVNode(_component_MoneyInput, {
                              label: "Valor Aliena\xE7\xE3o",
                              modelValue: unref(state).vlr_alienacao,
                              "onUpdate:modelValue": ($event) => unref(state).vlr_alienacao = $event
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(VCol, { cols: "2" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<label${_scopeId3}>Valor Avalia\xE7\xE3o</label>`);
                          _push4(ssrRenderComponent(_component_MoneyInput, {
                            label: "Valor Avalia\xE7\xE3o",
                            modelValue: unref(state).vlr_avaliacao,
                            "onUpdate:modelValue": ($event) => unref(state).vlr_avaliacao = $event
                          }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode("label", null, "Valor Avalia\xE7\xE3o"),
                            createVNode(_component_MoneyInput, {
                              label: "Valor Avalia\xE7\xE3o",
                              modelValue: unref(state).vlr_avaliacao,
                              "onUpdate:modelValue": ($event) => unref(state).vlr_avaliacao = $event
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
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
                    _push3(ssrRenderComponent(VCol, { cols: "1" }, {
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
                  } else {
                    return [
                      createVNode(VCol, {
                        class: "mt-6",
                        cols: "4"
                      }, {
                        default: withCtx(() => [
                          createVNode(VAutocomplete, {
                            label: "Situa\xE7\xE3o",
                            items: unref(situacaoItems),
                            "item-title": "descricao",
                            "item-value": "id"
                          }, null, 8, ["items"])
                        ]),
                        _: 1
                      }),
                      createVNode(VCol, { cols: "2" }, {
                        default: withCtx(() => [
                          createVNode("label", null, "Valor Aliena\xE7\xE3o"),
                          createVNode(_component_MoneyInput, {
                            label: "Valor Aliena\xE7\xE3o",
                            modelValue: unref(state).vlr_alienacao,
                            "onUpdate:modelValue": ($event) => unref(state).vlr_alienacao = $event
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        _: 1
                      }),
                      createVNode(VCol, { cols: "2" }, {
                        default: withCtx(() => [
                          createVNode("label", null, "Valor Avalia\xE7\xE3o"),
                          createVNode(_component_MoneyInput, {
                            label: "Valor Avalia\xE7\xE3o",
                            modelValue: unref(state).vlr_avaliacao,
                            "onUpdate:modelValue": ($event) => unref(state).vlr_avaliacao = $event
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
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
                      createVNode(VCol, { cols: "1" }, {
                        default: withCtx(() => [
                          createVNode("label", null, "Valor ITB"),
                          createVNode(_component_MoneyInput, {
                            label: "Valor ITB",
                            modelValue: unref(state).vlr_itbi,
                            "onUpdate:modelValue": ($event) => unref(state).vlr_itbi = $event
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
                      _push3(ssrRenderComponent(VBtn, {
                        class: "ml-5",
                        size: "large",
                        color: "green",
                        onClick: createImovel
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
                        onClick: createImovel
                      }, {
                        default: withCtx(() => [
                          createTextVNode("Salvar")
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
                      class: "mt-5",
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
                          "onUpdate:modelValue": ($event) => unref(state).registro_matricula = $event
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, null, {
                      default: withCtx(() => [
                        createVNode(VTextField, {
                          label: "Letra",
                          modelValue: unref(state).registro_matricula_letra,
                          "onUpdate:modelValue": ($event) => unref(state).registro_matricula_letra = $event
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, { cols: "2" }, {
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
                    }),
                    createVNode(VCol, { cols: "1" }, {
                      default: withCtx(() => [
                        createVNode(VTextField, {
                          label: "CIB",
                          modelValue: unref(state).cib,
                          "onUpdate:modelValue": ($event) => unref(state).cib = $event
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
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
                          label: "Cidade",
                          modelValue: unref(state).end_cidade_id,
                          "onUpdate:modelValue": ($event) => unref(state).end_cidade_id = $event,
                          items: unref(cidadeItems),
                          "item-title": "descricao",
                          "item-value": "id"
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
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
                    }),
                    createVNode(VCol, { cols: "4" }, {
                      default: withCtx(() => [
                        createVNode(VAutocomplete, {
                          label: "Logradouro",
                          modelValue: unref(state).tabvalores_tipologradouro_id,
                          "onUpdate:modelValue": ($event) => unref(state).tabvalores_tipologradouro_id = $event,
                          items: unref(tipoLogradouroItems),
                          "item-title": "descricao",
                          "item-value": "id"
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, { cols: "1" }, {
                      default: withCtx(() => [
                        createVNode(VTextField, {
                          label: "N*",
                          modelValue: unref(state).end_logradouro_numero,
                          "onUpdate:modelValue": ($event) => unref(state).end_logradouro_numero = $event
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
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
                        createVNode(VTextField, {
                          label: "Bairro",
                          modelValue: unref(state).end_bairro,
                          "onUpdate:modelValue": ($event) => unref(state).end_bairro = $event
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, null, {
                      default: withCtx(() => [
                        createVNode(VTextField, {
                          label: "CEP",
                          modelValue: unref(state).end_cep,
                          "onUpdate:modelValue": ($event) => unref(state).end_cep = $event
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, null, {
                      default: withCtx(() => [
                        createVNode(VTextField, {
                          label: "Complemento",
                          modelValue: unref(state).end_complemento,
                          "onUpdate:modelValue": ($event) => unref(state).end_complemento = $event
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
                        createVNode(VTextField, { label: "Inscri\xE7\xE3o Municipal" })
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                createVNode(VRow, null, {
                  default: withCtx(() => [
                    createVNode(VCol, {
                      class: "mt-6",
                      cols: "4"
                    }, {
                      default: withCtx(() => [
                        createVNode(VAutocomplete, {
                          label: "Situa\xE7\xE3o",
                          items: unref(situacaoItems),
                          "item-title": "descricao",
                          "item-value": "id"
                        }, null, 8, ["items"])
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, { cols: "2" }, {
                      default: withCtx(() => [
                        createVNode("label", null, "Valor Aliena\xE7\xE3o"),
                        createVNode(_component_MoneyInput, {
                          label: "Valor Aliena\xE7\xE3o",
                          modelValue: unref(state).vlr_alienacao,
                          "onUpdate:modelValue": ($event) => unref(state).vlr_alienacao = $event
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, { cols: "2" }, {
                      default: withCtx(() => [
                        createVNode("label", null, "Valor Avalia\xE7\xE3o"),
                        createVNode(_component_MoneyInput, {
                          label: "Valor Avalia\xE7\xE3o",
                          modelValue: unref(state).vlr_avaliacao,
                          "onUpdate:modelValue": ($event) => unref(state).vlr_avaliacao = $event
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
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
                    createVNode(VCol, { cols: "1" }, {
                      default: withCtx(() => [
                        createVNode("label", null, "Valor ITB"),
                        createVNode(_component_MoneyInput, {
                          label: "Valor ITB",
                          modelValue: unref(state).vlr_itbi,
                          "onUpdate:modelValue": ($event) => unref(state).vlr_itbi = $event
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
                    }, 8, ["onClick"])) : (openBlock(), createBlock(VBtn, {
                      key: 1,
                      class: "ml-5",
                      size: "large",
                      color: "green",
                      onClick: createImovel
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Salvar")
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
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Modal/imoveis/elementos/Dados.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : undefined;
};
const _sfc_main$1 = {
  __name: "Partes",
  __ssrInlineRender: true,
  emits: ["saved", "close-modal"],
  async setup(__props, { emit: __emit }) {
    let __temp, __restore;
    const emit = __emit;
    const route = useRoute$1();
    const config = useRuntimeConfig();
    const { $toast } = useNuxtApp();
    const procurarPessoa = `${config.public.managemant}/pesquisarPessoas`;
    const papeisApresentante = `${config.public.managemant}/listarPapeis`;
    const buscarPessoa = `${config.public.managemant}/getLinkTipo`;
    const criarParteImovelPessoa = `${config.public.managemant}/bens_pessoa`;
    `${config.public.managemant}/bens_pessoa`;
    const getPartesId = `${config.public.managemant}/getAtosPessoaById`;
    const baixarDocumento = `${config.public.managemant}/download`;
    const cartorio_token = ref(useCookie("user-data").value.cartorio_token);
    const pessoasItems = ref([]);
    const pessoasTable = ref([]);
    const papeisItems = ref([]);
    const isModalRegistroOpen = ref(false);
    const isModalFichaOpen = ref(false);
    const isModalPapelOpen = ref(false);
    const representante_nome = ref(null);
    const ato_papel_id = ref(null);
    const ato_token = ref(route.query.tipo_ato_token);
    const fichaRender = ref(null);
    const headers = [
      {
        title: "Pessoa",
        align: "start",
        key: "pessoa.nome"
      },
      {
        title: "Papel",
        align: "start",
        key: "papel.descricao"
      },
      {
        title: "%",
        align: "start",
        key: "percentual.percentual"
      },
      { value: "actions" }
    ];
    const state = reactive({
      papeis: null,
      percentual: null,
      pessoa: null,
      documento: null
    });
    const { data } = ([__temp, __restore] = withAsyncContext(() => useFetch(papeisApresentante, {
      method: "POST",
      body: { tipo_ato_token: route.query.tipo_ato_token }
    }, "$X6FDd5A6WK")), __temp = await __temp, __restore(), __temp);
    papeisItems.value = data.value;
    const getDadosPartes = async () => {
      const { data: dadosParte } = await useFetch(
        `${getPartesId}/${route.query.ato_id}`,
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
    async function searchPessoasService() {
      try {
        const { data: pessoasData } = await useFetch(procurarPessoa, {
          method: "POST",
          body: {
            cartorio_token: cartorio_token.value,
            documento: state.documento,
            nome: state.nome
          }
        }, "$Ir36YwSBFY");
        if (pessoasData.value.length > 0) {
          pessoasItems.value = pessoasData.value;
          state.pessoa = pessoasItems.value[0];
        } else {
          pessoasItems.value = [];
        }
      } catch (error) {
        console.error("Erro na requisi\xE7\xE3o", error);
      }
    }
    const createPessoa = () => {
      isModalRegistroOpen.value = true;
    };
    const atualizarPapel = async () => {
      await getDadosPartes();
    };
    const createImovel = async () => {
      const representante = {
        pessoa: state.pessoa,
        papel: papeisItems.value.find((papel) => papel.id === state.papeis),
        // Objeto completo do papel
        percentual: state.percentual
      };
      const { data: data2, status } = await useFetch(criarParteImovelPessoa, {
        method: "POST",
        body: {
          ato_id: Number(route.query.ato_id),
          pessoa_id: state.pessoa.id,
          tipo_parte_id: state.papeis,
          user_id: useCookie("user-data").value.usuario_id,
          percentual: state.percentual
        }
      }, "$z4QOGPyvCc");
      if (status.value === "success") {
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
        body: { bucket: "qvgjz", path: imagemBiometria.value.link }
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
      ato_papel_id.value = item.id;
      representante_nome.value = item.pessoa.nome;
    };
    async function deletePessoa(item) {
      item.excluido = !item.excluido;
      try {
        await useFetch(`${pessoasUpdate}/${item.id}`, {
          method: "PUT",
          body: JSON.stringify({ excluido: item.excluido })
        }, "$3fKfAn4Pra");
      } catch (error) {
        console.error("Erro ao excluir pessoa:", error);
      }
    }
    const goBack = () => {
      emit("close-modal");
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_MoneyInput = __nuxt_component_0;
      const _component_ModalRegistroPessoas = _sfc_main$3;
      const _component_ModalPapel = _sfc_main$1$1;
      const _component_TiffViewer = _sfc_main$6;
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(ssrRenderComponent(VContainer, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VRow, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VCol, { cols: "3" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VTextField, {
                          label: "Documento",
                          modelValue: unref(state).documento,
                          "onUpdate:modelValue": ($event) => unref(state).documento = $event
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VTextField, {
                            label: "Documento",
                            modelValue: unref(state).documento,
                            "onUpdate:modelValue": ($event) => unref(state).documento = $event
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VCol, { cols: "4" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VTextField, {
                          label: "Pessoa",
                          modelValue: unref(state).nome,
                          "onUpdate:modelValue": ($event) => unref(state).nome = $event
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VTextField, {
                            label: "Pessoa",
                            modelValue: unref(state).nome,
                            "onUpdate:modelValue": ($event) => unref(state).nome = $event
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<div${_scopeId2}><img class="mt-1"${ssrRenderAttr("src", _imports_1)} style="${ssrRenderStyle({ "width": "40px", "cursor": "pointer" })}" title="Pesquisar Pessoa"${_scopeId2}></div><div${_scopeId2}><img class="mt-1 ml-2"${ssrRenderAttr("src", _imports_0)} style="${ssrRenderStyle({ "width": "40px", "cursor": "pointer" })}" title="Criar Pessoa"${_scopeId2}></div>`);
                } else {
                  return [
                    createVNode(VCol, { cols: "3" }, {
                      default: withCtx(() => [
                        createVNode(VTextField, {
                          label: "Documento",
                          modelValue: unref(state).documento,
                          "onUpdate:modelValue": ($event) => unref(state).documento = $event
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, { cols: "4" }, {
                      default: withCtx(() => [
                        createVNode(VTextField, {
                          label: "Pessoa",
                          modelValue: unref(state).nome,
                          "onUpdate:modelValue": ($event) => unref(state).nome = $event
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode("div", null, [
                      createVNode("img", {
                        class: "mt-1",
                        src: _imports_1,
                        style: { "width": "40px", "cursor": "pointer" },
                        title: "Pesquisar Pessoa",
                        onClick: searchPessoasService
                      })
                    ]),
                    createVNode("div", null, [
                      createVNode("img", {
                        class: "mt-1 ml-2",
                        src: _imports_0,
                        style: { "width": "40px", "cursor": "pointer" },
                        title: "Criar Pessoa",
                        onClick: createPessoa
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
                          "item-title": "nome",
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
                            "item-title": "nome",
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
                          "item-title": "nome",
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
                          style: { "height": "385px" },
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
                            style: { "height": "385px" },
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
                          style: { "height": "385px" },
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
            _push2(ssrRenderComponent(_component_ModalRegistroPessoas, {
              show: unref(isModalRegistroOpen),
              onClose: ($event) => isModalRegistroOpen.value = false
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_ModalPapel, {
              representante_nome: unref(representante_nome),
              ato_token: unref(ato_token),
              ato_id: unref(ato_papel_id),
              show: unref(isModalPapelOpen),
              onClose: ($event) => isModalPapelOpen.value = false,
              onUpdatePapel: atualizarPapel
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
                  _push3(ssrRenderComponent(VBtn, {
                    class: "ml-5",
                    size: "large",
                    color: "green"
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
                    createVNode(VBtn, {
                      class: "ml-5",
                      size: "large",
                      color: "green"
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
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(VRow, null, {
                default: withCtx(() => [
                  createVNode(VCol, { cols: "3" }, {
                    default: withCtx(() => [
                      createVNode(VTextField, {
                        label: "Documento",
                        modelValue: unref(state).documento,
                        "onUpdate:modelValue": ($event) => unref(state).documento = $event
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(VCol, { cols: "4" }, {
                    default: withCtx(() => [
                      createVNode(VTextField, {
                        label: "Pessoa",
                        modelValue: unref(state).nome,
                        "onUpdate:modelValue": ($event) => unref(state).nome = $event
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode("div", null, [
                    createVNode("img", {
                      class: "mt-1",
                      src: _imports_1,
                      style: { "width": "40px", "cursor": "pointer" },
                      title: "Pesquisar Pessoa",
                      onClick: searchPessoasService
                    })
                  ]),
                  createVNode("div", null, [
                    createVNode("img", {
                      class: "mt-1 ml-2",
                      src: _imports_0,
                      style: { "width": "40px", "cursor": "pointer" },
                      title: "Criar Pessoa",
                      onClick: createPessoa
                    })
                  ])
                ]),
                _: 1
              }),
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
                        "item-title": "nome",
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
                        style: { "height": "385px" },
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
              createVNode(_component_ModalRegistroPessoas, {
                show: unref(isModalRegistroOpen),
                onClose: ($event) => isModalRegistroOpen.value = false
              }, null, 8, ["show", "onClose"]),
              createVNode(_component_ModalPapel, {
                representante_nome: unref(representante_nome),
                ato_token: unref(ato_token),
                ato_id: unref(ato_papel_id),
                show: unref(isModalPapelOpen),
                onClose: ($event) => isModalPapelOpen.value = false,
                onUpdatePapel: atualizarPapel
              }, null, 8, ["representante_nome", "ato_token", "ato_id", "show", "onClose"]),
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
                  }),
                  createVNode(VBtn, {
                    class: "ml-5",
                    size: "large",
                    color: "green"
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
      }, _parent));
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Modal/imoveis/elementos/Partes.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : undefined;
};
const _sfc_main = {
  __name: "Cadastro",
  __ssrInlineRender: true,
  props: {
    show: Boolean
  },
  emits: ["close"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const tab = ref("dados");
    const isVisible = ref(props.show);
    const showPartes = ref(false);
    const emit = __emit;
    watch(
      () => props.show,
      (newVal) => {
        isVisible.value = newVal;
      }
    );
    const handleSave = () => {
      showPartes.value = true;
    };
    const closeModal = () => {
      isVisible.value = false;
      showPartes.value = false;
      emit("close");
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ModalImoveisElementosDados = _sfc_main$2;
      const _component_ModalImoveisElementosPartes = _sfc_main$1;
      _push(ssrRenderComponent(VDialog, mergeProps({
        persistent: "",
        modelValue: unref(isVisible),
        "onUpdate:modelValue": ($event) => isRef(isVisible) ? isVisible.value = $event : null,
        "max-width": "1000"
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VCard, null, {
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
                        _push4(ssrRenderComponent(VTabsWindow, {
                          modelValue: unref(tab),
                          "onUpdate:modelValue": ($event) => isRef(tab) ? tab.value = $event : null
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VTabsWindowItem, { value: "dados" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_ModalImoveisElementosDados, {
                                      onSaved: handleSave,
                                      onCloseModal: closeModal
                                    }, null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(_component_ModalImoveisElementosDados, {
                                        onSaved: handleSave,
                                        onCloseModal: closeModal
                                      })
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(VTabsWindowItem, { value: "partes" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    if (unref(showPartes)) {
                                      _push6(ssrRenderComponent(_component_ModalImoveisElementosPartes, { onCloseModal: closeModal }, null, _parent6, _scopeId5));
                                    } else {
                                      _push6(`<!---->`);
                                    }
                                  } else {
                                    return [
                                      unref(showPartes) ? (openBlock(), createBlock(_component_ModalImoveisElementosPartes, {
                                        key: 0,
                                        onCloseModal: closeModal
                                      })) : createCommentVNode("", true)
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(VTabsWindowItem, { value: "dados" }, {
                                  default: withCtx(() => [
                                    createVNode(_component_ModalImoveisElementosDados, {
                                      onSaved: handleSave,
                                      onCloseModal: closeModal
                                    })
                                  ]),
                                  _: 1
                                }),
                                createVNode(VTabsWindowItem, { value: "partes" }, {
                                  default: withCtx(() => [
                                    unref(showPartes) ? (openBlock(), createBlock(_component_ModalImoveisElementosPartes, {
                                      key: 0,
                                      onCloseModal: closeModal
                                    })) : createCommentVNode("", true)
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
                          createVNode(VTabsWindow, {
                            modelValue: unref(tab),
                            "onUpdate:modelValue": ($event) => isRef(tab) ? tab.value = $event : null
                          }, {
                            default: withCtx(() => [
                              createVNode(VTabsWindowItem, { value: "dados" }, {
                                default: withCtx(() => [
                                  createVNode(_component_ModalImoveisElementosDados, {
                                    onSaved: handleSave,
                                    onCloseModal: closeModal
                                  })
                                ]),
                                _: 1
                              }),
                              createVNode(VTabsWindowItem, { value: "partes" }, {
                                default: withCtx(() => [
                                  unref(showPartes) ? (openBlock(), createBlock(_component_ModalImoveisElementosPartes, {
                                    key: 0,
                                    onCloseModal: closeModal
                                  })) : createCommentVNode("", true)
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
                        createVNode(VTabsWindow, {
                          modelValue: unref(tab),
                          "onUpdate:modelValue": ($event) => isRef(tab) ? tab.value = $event : null
                        }, {
                          default: withCtx(() => [
                            createVNode(VTabsWindowItem, { value: "dados" }, {
                              default: withCtx(() => [
                                createVNode(_component_ModalImoveisElementosDados, {
                                  onSaved: handleSave,
                                  onCloseModal: closeModal
                                })
                              ]),
                              _: 1
                            }),
                            createVNode(VTabsWindowItem, { value: "partes" }, {
                              default: withCtx(() => [
                                unref(showPartes) ? (openBlock(), createBlock(_component_ModalImoveisElementosPartes, {
                                  key: 0,
                                  onCloseModal: closeModal
                                })) : createCommentVNode("", true)
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }, 8, ["modelValue", "onUpdate:modelValue"])
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
                      createVNode(VTabsWindow, {
                        modelValue: unref(tab),
                        "onUpdate:modelValue": ($event) => isRef(tab) ? tab.value = $event : null
                      }, {
                        default: withCtx(() => [
                          createVNode(VTabsWindowItem, { value: "dados" }, {
                            default: withCtx(() => [
                              createVNode(_component_ModalImoveisElementosDados, {
                                onSaved: handleSave,
                                onCloseModal: closeModal
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(VTabsWindowItem, { value: "partes" }, {
                            default: withCtx(() => [
                              unref(showPartes) ? (openBlock(), createBlock(_component_ModalImoveisElementosPartes, {
                                key: 0,
                                onCloseModal: closeModal
                              })) : createCommentVNode("", true)
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }, 8, ["modelValue", "onUpdate:modelValue"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Modal/imoveis/Cadastro.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : undefined;
};

export { _sfc_main as _, _sfc_main$2 as a, _sfc_main$1 as b };
//# sourceMappingURL=Cadastro-B9aFvhQs.mjs.map
