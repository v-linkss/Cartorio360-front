import { _ as _sfc_main$1 } from './TiposAtos-Dn2V1A2R.mjs';
import { _ as _imports_3, a as _sfc_main$2 } from './Selos-Y0oo929K.mjs';
import { _ as _sfc_main$3 } from './Ordem-CiteLUxi.mjs';
import { _ as _sfc_main$4 } from './Confirmacao-CIpq3t_m.mjs';
import { ref, reactive, resolveDirective, withCtx, createVNode, mergeProps, unref, withDirectives, openBlock, createBlock, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrGetDirectiveProps, ssrRenderStyle, ssrRenderAttr, ssrRenderClass } from 'vue/server-renderer';
import { _ as _imports_1 } from './visualizar-BoZ30DMV.mjs';
import { _ as _imports_1$1 } from './editar-BcGPsVK2.mjs';
import { _ as _imports_2, a as _imports_3$1 } from './excluido-ceRs5bdR.mjs';
import { _ as _export_sfc, b as useNuxtApp, u as useRouter$1, e as useCookie, V as VTextField, c as useRuntimeConfig } from './server.mjs';
import { u as useFetch } from './fetch-BGOGxZIT.mjs';
import { f as formatDate } from './formatDate-DflkuJ_V.mjs';
import { f as fetchWithToken } from './fetchWithToken-C6Hm_qcH.mjs';
import { V as VContainer } from './VContainer-CUysD4sO.mjs';
import { V as VRow } from './VRow-Bqz0CuIN.mjs';
import { V as VCol } from './VCol-BT4RzX0Q.mjs';
import { V as VAutocomplete } from './VAutocomplete-BkxeMWb7.mjs';
import { V as VListItem } from './VList-D6fdCBQk.mjs';
import { V as VDataTable } from './VDataTable-BIulIhGO.mjs';
import './VDialog-DUonz2jA.mjs';
import './VCard-CbJyOeQB.mjs';
import './VAvatar-CnoOhuaA.mjs';
import './VResponsive-D5W8jAiq.mjs';
import '../routes/renderer.mjs';
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
import '@vuelidate/core';
import '@vuelidate/validators';
import './MoneyInput-ot-UsY0X.mjs';
import 'v-money3';
import './novo-CWU3oYa5.mjs';
import 'pinia';
import 'vue-router';
import 'vue3-toastify';
import 'vue-the-mask';
import './asyncData-Diyd6umk.mjs';
import './filter-BT7qJclb.mjs';

const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const config = useRuntimeConfig();
    const { $toast } = useNuxtApp();
    const allUsuarios = `${config.public.managemant}/listarUsuarios`;
    const allTiposAtos = `${config.public.managemant}/listar_tipo_atos`;
    const cancelaLavratura = `${config.public.managemant}/cancela_lavratura`;
    const updateAto = `${config.public.managemant}/updateAtos`;
    const pesquisaAtos = `${config.public.managemant}/pesquisaAtos`;
    const router = useRouter$1();
    const usuario_token = ref(useCookie("auth_token").value) || null;
    const cartorio_token = ref(useCookie("user-data").value.cartorio_token) || null;
    const modalVisible = ref(false);
    const atos = ref([]);
    const usuariosItems = ref([]);
    const tipoAtosItems = ref([]);
    const situacaoItems = ref(["PENDENTE", "EM ANDAMENTO", "CONCLU\xCDDA", "LAVRADA"]);
    const isModalRecebimentoOpen = ref(false);
    const isModalCancelamentoOpen = ref(false);
    const condMessage = ref("");
    const numero_os = ref(null);
    const selectedOrder = ref({});
    const isModalReimprimirOpen = ref(false);
    const ato_token = ref(null);
    const state = reactive({
      numero: null,
      data_inicio: getCurrentDate(),
      data_fim: getCurrentDate(),
      data_lavratura_inicio: null,
      data_lavratura_fim: null,
      protocolo: null,
      parte: null,
      livro: null,
      folha: null,
      situacao: null,
      usuario_token: usuario_token.value,
      selo: null,
      ato_tipo_token: null,
      apresentante_cpf: null,
      apresentante_nome: null,
      valor: null
    });
    const headers = [
      {
        title: "ID/Protocolo",
        key: "protocoloId",
        width: "70px",
        value: (item) => item.protocolo ? `${item.id}
${item.protocolo}` : `${item.id}`,
        cellProps: {
          style: {
            whiteSpace: "pre-line",
            lineHeight: "2"
          }
        }
      },
      {
        title: "Abertura/CPF",
        key: "aberturaCpf",
        value: (item) => item.dt_abertura ? `${item.dt_abertura}
${item.apresentante_cpf}` : `${item.apresentante_cpf}`,
        cellProps: {
          style: {
            whiteSpace: "pre-line",
            lineHeight: "2"
          }
        }
      },
      {
        title: "Data lavratura/Parte",
        key: "lavraturaNome",
        value: (item) => item.dt_lavratura ? `${item.dt_lavratura}
${item.apresentante_nome}` : `${item.apresentante_nome}`,
        cellProps: {
          style: {
            whiteSpace: "pre-line",
            lineHeight: "2"
          }
        }
      },
      { title: "N\xB0 OS", value: "numero_os" },
      { title: "Usuario", value: "usuario_nome" },
      {
        title: "Situa\xE7\xE3o/Servi\xE7o",
        key: "situacaoServico",
        value: (item) => item.situacao ? `${item.situacao}
${item.ato_servico}` : `${item.ato_servico}`,
        cellProps: {
          style: {
            whiteSpace: "pre-line",
            lineHeight: "2"
          }
        }
      },
      { title: "Livro", value: "livro_numero" },
      { title: "Folha", value: "folha" },
      { title: "Valor", value: "valor" },
      { title: "A\xE7\xF5es", value: "actions" }
    ];
    function getCurrentDate() {
      const today = /* @__PURE__ */ new Date();
      const yyyy = today.getFullYear();
      const mm = String(today.getMonth() + 1).padStart(2, "0");
      const dd = String(today.getDate()).padStart(2, "0");
      return `${dd}-${mm}-${yyyy}`;
    }
    function convertToISODate(date) {
      if (!date) return null;
      const [dd, mm, yyyy] = date.split("/");
      return `${yyyy}-${mm}-${dd}`;
    }
    async function atosPayload() {
      const pesquisaSalva = sessionStorage.getItem("pesquisaAto");
      const dadosRestaurados = JSON.parse(pesquisaSalva);
      const { data: atosData } = await useFetch(pesquisaAtos, {
        method: "POST",
        body: {
          cartorio_token: useCookie("user-data").value.cartorio_token,
          usuario_token: dadosRestaurados.usuario_token || usuario_token.value,
          data_fim: convertToISODate(dadosRestaurados == null ? undefined : dadosRestaurados.data_fim),
          data_inicio: convertToISODate(dadosRestaurados == null ? undefined : dadosRestaurados.data_inicio)
        }
      }, "$1U9Iv6Es1X");
      if (atosData.value.length > 0) {
        atos.value = atosData.value.map((item) => {
          return {
            ...item,
            dt_lavratura: item.dt_lavratura ? formatDate(item.dt_lavratura, "dd/mm/yyyy hh:mm") : null,
            dt_abertura: formatDate(item.dt_abertura, "dd/mm/yyyy")
          };
        });
      }
    }
    async function usuariosDataPayload() {
      const { data: usuarioData } = await useFetch(allUsuarios, {
        method: "POST",
        body: {
          cartorio_token: cartorio_token.value
        }
      }, "$hvipqUJYtS");
      usuariosItems.value = usuarioData.value;
    }
    async function searchAtos() {
      try {
        sessionStorage.setItem("pesquisaAto", JSON.stringify(state));
        const { data: atosData, error } = await useFetch(pesquisaAtos, {
          method: "POST",
          body: {
            cartorio_token: cartorio_token.value,
            numero: state.numero || null,
            data_inicio: convertToISODate(state.data_inicio) || null,
            data_fim: convertToISODate(state.data_fim) || null,
            data_lavratura_inicio: convertToISODate(state.data_lavratura_inicio) || null,
            data_lavratura_fim: convertToISODate(state.data_lavratura_fim) || null,
            protocolo: state.protocolo || null,
            livro: state.livro || null,
            folha: state.folha || null,
            situacao: state.situacao || null,
            usuario_token: state.usuario_token,
            selo: state.selo || null,
            ato_tipo_token: state.ato_tipo_token,
            parte: state.parte || null
          }
        }, "$OjamgBH6nj");
        if (atosData.value.length > 0) {
          atos.value = atosData.value.map((item) => {
            return {
              ...item,
              dt_lavratura: item.dt_lavratura ? formatDate(item.dt_lavratura, "dd/mm/yyyy hh:mm") : null,
              dt_abertura: item.dt_abertura ? formatDate(item.dt_abertura, "dd/mm/yyyy") : null
            };
          });
        } else {
          atos.value = [];
          $toast.error("N\xE3o existe ato Registrado!");
        }
      } catch (error) {
        console.error("Erro na requisi\xE7\xE3o", error);
      }
    }
    const redirectoToView = (item) => {
      router.push({
        path: `/fontes/atos/atos-com-bem/atualizar/${item.id}`,
        query: {
          origem: "vizualizar-lista",
          id: item.id,
          ato_id: item.id,
          tipo_ato_token: item.tipo_token,
          tipo_ato: item.ato_servico,
          ato_token_edit: item.token,
          numero_os: item.numero_os,
          usa_imoveis: true
        }
      });
    };
    async function tipoAtosDataPayload() {
      const { data: tipoAtosData, error } = await useFetch(allTiposAtos, {
        method: "POST",
        body: {
          cartorio_token: cartorio_token.value,
          usuario_token: usuario_token.value,
          tipo_retorno: "servico_ato"
        }
      }, "$QxIfw0Zxe4");
      tipoAtosItems.value = tipoAtosData.value.map((item) => {
        return {
          ...item,
          descricao: item.descricao.replace(/\(/g, "<br>(")
        };
      });
    }
    const redirectToModalReimprimir = (token) => {
      ato_token.value = token;
      isModalReimprimirOpen.value = true;
    };
    async function deleteAto(item) {
      item.excluido = !item.excluido;
      try {
        await fetchWithToken(`${updateAto}/${item.id}`, {
          method: "PUT",
          body: { excluido: item.excluido }
        });
      } catch (error) {
        console.error("Erro ao excluir pessoa:", error);
      }
    }
    const cancelaAto = async (ato_token2) => {
      const { data, status } = await useFetch(cancelaLavratura, {
        method: "POST",
        body: {
          ato_token: ato_token2,
          user_token: usuario_token.value,
          cancelar_selo: false
        }
      }, "$ceiptlfDNO");
      if (status.value === "success" && data.value[0].status === "OK") {
        $toast.success("Lavratura cancelada com sucesso!");
      } else if (data.value[0].status === "ERRO") {
        isModalCancelamentoOpen.value = true;
        condMessage.value = data.value[0].status_mensagem;
      }
    };
    const redirectToUpdateAto = (item) => {
      if (item.usa_imoveis || !item.usa_imoveis) {
        router.push({
          path: `/fontes/atos/atos-com-bem/atualizar/${item.id}`,
          query: {
            origem: "atualizar-lista",
            id: item.id,
            ato_id: item.id,
            tipo_ato_token: item.tipo_token,
            tipo_ato: item.tipo,
            ato_token_edit: item.token,
            numero_os: item.numero_os,
            usa_imoveis: true
          }
        });
      }
    };
    usuariosDataPayload();
    tipoAtosDataPayload();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ModalTiposAtos = _sfc_main$1;
      const _component_ReimpressaoSelos = _sfc_main$2;
      const _component_RecebimentoOrdem = _sfc_main$3;
      const _component_ModalConfirmacao = _sfc_main$4;
      const _directive_mask = resolveDirective("mask");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(VContainer, { class: "mt-5" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VRow, { class: "mb-5" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<h1 data-v-c85eccdf${_scopeId2}>Atos</h1>`);
                } else {
                  return [
                    createVNode("h1", null, "Atos")
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
                        _push4(ssrRenderComponent(VTextField, mergeProps({
                          modelValue: unref(state).data_inicio,
                          "onUpdate:modelValue": ($event) => unref(state).data_inicio = $event,
                          label: "Abertura de",
                          placeholder: "dd/mm/yyyy",
                          dense: ""
                        }, ssrGetDirectiveProps(_ctx, _directive_mask, "##/##/####")), null, _parent4, _scopeId3));
                      } else {
                        return [
                          withDirectives(createVNode(VTextField, {
                            modelValue: unref(state).data_inicio,
                            "onUpdate:modelValue": ($event) => unref(state).data_inicio = $event,
                            label: "Abertura de",
                            placeholder: "dd/mm/yyyy",
                            dense: ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue"]), [
                            [_directive_mask, "##/##/####"]
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VCol, { cols: "2" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VTextField, mergeProps({
                          modelValue: unref(state).data_fim,
                          "onUpdate:modelValue": ($event) => unref(state).data_fim = $event,
                          label: "Abertura at\xE9",
                          placeholder: "dd/mm/yyyy",
                          dense: ""
                        }, ssrGetDirectiveProps(_ctx, _directive_mask, "##/##/####")), null, _parent4, _scopeId3));
                      } else {
                        return [
                          withDirectives(createVNode(VTextField, {
                            modelValue: unref(state).data_fim,
                            "onUpdate:modelValue": ($event) => unref(state).data_fim = $event,
                            label: "Abertura at\xE9",
                            placeholder: "dd/mm/yyyy",
                            dense: ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue"]), [
                            [_directive_mask, "##/##/####"]
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VCol, { cols: "2" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VTextField, mergeProps({
                          modelValue: unref(state).data_lavratura_inicio,
                          "onUpdate:modelValue": ($event) => unref(state).data_lavratura_inicio = $event,
                          label: "Lavratura de",
                          placeholder: "dd/mm/yyyy",
                          dense: ""
                        }, ssrGetDirectiveProps(_ctx, _directive_mask, "##/##/####")), null, _parent4, _scopeId3));
                      } else {
                        return [
                          withDirectives(createVNode(VTextField, {
                            modelValue: unref(state).data_lavratura_inicio,
                            "onUpdate:modelValue": ($event) => unref(state).data_lavratura_inicio = $event,
                            label: "Lavratura de",
                            placeholder: "dd/mm/yyyy",
                            dense: ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue"]), [
                            [_directive_mask, "##/##/####"]
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VCol, { cols: "2" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VTextField, mergeProps({
                          modelValue: unref(state).data_lavratura_fim,
                          "onUpdate:modelValue": ($event) => unref(state).data_lavratura_fim = $event,
                          label: "Lavratura at\xE9",
                          placeholder: "dd/mm/yyyy",
                          dense: ""
                        }, ssrGetDirectiveProps(_ctx, _directive_mask, "##/##/####")), null, _parent4, _scopeId3));
                      } else {
                        return [
                          withDirectives(createVNode(VTextField, {
                            modelValue: unref(state).data_lavratura_fim,
                            "onUpdate:modelValue": ($event) => unref(state).data_lavratura_fim = $event,
                            label: "Lavratura at\xE9",
                            placeholder: "dd/mm/yyyy",
                            dense: ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue"]), [
                            [_directive_mask, "##/##/####"]
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VCol, { cols: "2" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VTextField, {
                          modelValue: unref(state).numero,
                          "onUpdate:modelValue": ($event) => unref(state).numero = $event,
                          label: "N\xB0 OS"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VTextField, {
                            modelValue: unref(state).numero,
                            "onUpdate:modelValue": ($event) => unref(state).numero = $event,
                            label: "N\xB0 OS"
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
                          modelValue: unref(state).selo,
                          "onUpdate:modelValue": ($event) => unref(state).selo = $event,
                          label: "Selo",
                          dense: ""
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VTextField, {
                            modelValue: unref(state).selo,
                            "onUpdate:modelValue": ($event) => unref(state).selo = $event,
                            label: "Selo",
                            dense: ""
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
                          modelValue: unref(state).data_inicio,
                          "onUpdate:modelValue": ($event) => unref(state).data_inicio = $event,
                          label: "Abertura de",
                          placeholder: "dd/mm/yyyy",
                          dense: ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]), [
                          [_directive_mask, "##/##/####"]
                        ])
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, { cols: "2" }, {
                      default: withCtx(() => [
                        withDirectives(createVNode(VTextField, {
                          modelValue: unref(state).data_fim,
                          "onUpdate:modelValue": ($event) => unref(state).data_fim = $event,
                          label: "Abertura at\xE9",
                          placeholder: "dd/mm/yyyy",
                          dense: ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]), [
                          [_directive_mask, "##/##/####"]
                        ])
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, { cols: "2" }, {
                      default: withCtx(() => [
                        withDirectives(createVNode(VTextField, {
                          modelValue: unref(state).data_lavratura_inicio,
                          "onUpdate:modelValue": ($event) => unref(state).data_lavratura_inicio = $event,
                          label: "Lavratura de",
                          placeholder: "dd/mm/yyyy",
                          dense: ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]), [
                          [_directive_mask, "##/##/####"]
                        ])
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, { cols: "2" }, {
                      default: withCtx(() => [
                        withDirectives(createVNode(VTextField, {
                          modelValue: unref(state).data_lavratura_fim,
                          "onUpdate:modelValue": ($event) => unref(state).data_lavratura_fim = $event,
                          label: "Lavratura at\xE9",
                          placeholder: "dd/mm/yyyy",
                          dense: ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]), [
                          [_directive_mask, "##/##/####"]
                        ])
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, { cols: "2" }, {
                      default: withCtx(() => [
                        createVNode(VTextField, {
                          modelValue: unref(state).numero,
                          "onUpdate:modelValue": ($event) => unref(state).numero = $event,
                          label: "N\xB0 OS"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, { cols: "2" }, {
                      default: withCtx(() => [
                        createVNode(VTextField, {
                          modelValue: unref(state).selo,
                          "onUpdate:modelValue": ($event) => unref(state).selo = $event,
                          label: "Selo",
                          dense: ""
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
                  _push3(ssrRenderComponent(VCol, { cols: "2" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VTextField, {
                          modelValue: unref(state).protocolo,
                          "onUpdate:modelValue": ($event) => unref(state).protocolo = $event,
                          label: "Protocolo"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VTextField, {
                            modelValue: unref(state).protocolo,
                            "onUpdate:modelValue": ($event) => unref(state).protocolo = $event,
                            label: "Protocolo"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VCol, { cols: "2" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VTextField, mergeProps({
                          modelValue: unref(state).apresentante_cpf,
                          "onUpdate:modelValue": ($event) => unref(state).apresentante_cpf = $event,
                          label: "CPF",
                          dense: ""
                        }, ssrGetDirectiveProps(_ctx, _directive_mask, "###.###.###-##")), null, _parent4, _scopeId3));
                      } else {
                        return [
                          withDirectives(createVNode(VTextField, {
                            modelValue: unref(state).apresentante_cpf,
                            "onUpdate:modelValue": ($event) => unref(state).apresentante_cpf = $event,
                            label: "CPF",
                            dense: ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue"]), [
                            [_directive_mask, "###.###.###-##"]
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VCol, { cols: "3" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VTextField, {
                          modelValue: unref(state).parte,
                          "onUpdate:modelValue": ($event) => unref(state).parte = $event,
                          label: "Parte",
                          dense: ""
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VTextField, {
                            modelValue: unref(state).parte,
                            "onUpdate:modelValue": ($event) => unref(state).parte = $event,
                            label: "Parte",
                            dense: ""
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
                          modelValue: unref(state).ato_tipo_token,
                          "onUpdate:modelValue": ($event) => unref(state).ato_tipo_token = $event,
                          items: unref(tipoAtosItems),
                          "item-value": "token",
                          label: "Tipo Servi\xE7o",
                          "menu-props": {
                            maxWidth: "680px",
                            width: "680px"
                          },
                          dense: ""
                        }, {
                          item: withCtx(({ props, item }, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VListItem, props, {
                                title: withCtx((_4, _push6, _parent6, _scopeId5) => {
                                  var _a;
                                  if (_push6) {
                                    _push6(`<span data-v-c85eccdf${_scopeId5}>${(_a = item.raw.descricao) != null ? _a : ""}</span>`);
                                  } else {
                                    return [
                                      createVNode("span", {
                                        innerHTML: item.raw.descricao
                                      }, null, 8, ["innerHTML"])
                                    ];
                                  }
                                }),
                                _: 2
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(VListItem, props, {
                                  title: withCtx(() => [
                                    createVNode("span", {
                                      innerHTML: item.raw.descricao
                                    }, null, 8, ["innerHTML"])
                                  ]),
                                  _: 2
                                }, 1040)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VAutocomplete, {
                            modelValue: unref(state).ato_tipo_token,
                            "onUpdate:modelValue": ($event) => unref(state).ato_tipo_token = $event,
                            items: unref(tipoAtosItems),
                            "item-value": "token",
                            label: "Tipo Servi\xE7o",
                            "menu-props": {
                              maxWidth: "680px",
                              width: "680px"
                            },
                            dense: ""
                          }, {
                            item: withCtx(({ props, item }) => [
                              createVNode(VListItem, props, {
                                title: withCtx(() => [
                                  createVNode("span", {
                                    innerHTML: item.raw.descricao
                                  }, null, 8, ["innerHTML"])
                                ]),
                                _: 2
                              }, 1040)
                            ]),
                            _: 1
                          }, 8, ["modelValue", "onUpdate:modelValue", "items"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VCol, { cols: "2" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VAutocomplete, {
                          items: unref(usuariosItems),
                          modelValue: unref(state).usuario_token,
                          "onUpdate:modelValue": ($event) => unref(state).usuario_token = $event,
                          "item-title": "user_nome",
                          "item-value": "user_token",
                          label: "Usu\xE1rio",
                          dense: ""
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VAutocomplete, {
                            items: unref(usuariosItems),
                            modelValue: unref(state).usuario_token,
                            "onUpdate:modelValue": ($event) => unref(state).usuario_token = $event,
                            "item-title": "user_nome",
                            "item-value": "user_token",
                            label: "Usu\xE1rio",
                            dense: ""
                          }, null, 8, ["items", "modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VCol, { cols: "3" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VAutocomplete, {
                          modelValue: unref(state).situacao,
                          "onUpdate:modelValue": ($event) => unref(state).situacao = $event,
                          items: unref(situacaoItems),
                          label: "Situa\xE7\xE3o",
                          dense: ""
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VAutocomplete, {
                            modelValue: unref(state).situacao,
                            "onUpdate:modelValue": ($event) => unref(state).situacao = $event,
                            items: unref(situacaoItems),
                            label: "Situa\xE7\xE3o",
                            dense: ""
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
                          modelValue: unref(state).livro,
                          "onUpdate:modelValue": ($event) => unref(state).livro = $event,
                          label: "Livro",
                          dense: ""
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VTextField, {
                            modelValue: unref(state).livro,
                            "onUpdate:modelValue": ($event) => unref(state).livro = $event,
                            label: "Livro",
                            dense: ""
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
                          modelValue: unref(state).folha,
                          "onUpdate:modelValue": ($event) => unref(state).folha = $event,
                          label: "Folha",
                          dense: ""
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VTextField, {
                            modelValue: unref(state).folha,
                            "onUpdate:modelValue": ($event) => unref(state).folha = $event,
                            label: "Folha",
                            dense: ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VCol, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div data-v-c85eccdf${_scopeId3}><img style="${ssrRenderStyle({ "width": "40px", "height": "40px", "cursor": "pointer" })}"${ssrRenderAttr("src", _imports_1)} alt="Pesquisar" data-v-c85eccdf${_scopeId3}></div>`);
                      } else {
                        return [
                          createVNode("div", null, [
                            createVNode("img", {
                              onClick: searchAtos,
                              style: { "width": "40px", "height": "40px", "cursor": "pointer" },
                              src: _imports_1,
                              alt: "Pesquisar"
                            })
                          ])
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
                          modelValue: unref(state).protocolo,
                          "onUpdate:modelValue": ($event) => unref(state).protocolo = $event,
                          label: "Protocolo"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, { cols: "2" }, {
                      default: withCtx(() => [
                        withDirectives(createVNode(VTextField, {
                          modelValue: unref(state).apresentante_cpf,
                          "onUpdate:modelValue": ($event) => unref(state).apresentante_cpf = $event,
                          label: "CPF",
                          dense: ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]), [
                          [_directive_mask, "###.###.###-##"]
                        ])
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, { cols: "3" }, {
                      default: withCtx(() => [
                        createVNode(VTextField, {
                          modelValue: unref(state).parte,
                          "onUpdate:modelValue": ($event) => unref(state).parte = $event,
                          label: "Parte",
                          dense: ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, { cols: "3" }, {
                      default: withCtx(() => [
                        createVNode(VAutocomplete, {
                          modelValue: unref(state).ato_tipo_token,
                          "onUpdate:modelValue": ($event) => unref(state).ato_tipo_token = $event,
                          items: unref(tipoAtosItems),
                          "item-value": "token",
                          label: "Tipo Servi\xE7o",
                          "menu-props": {
                            maxWidth: "680px",
                            width: "680px"
                          },
                          dense: ""
                        }, {
                          item: withCtx(({ props, item }) => [
                            createVNode(VListItem, props, {
                              title: withCtx(() => [
                                createVNode("span", {
                                  innerHTML: item.raw.descricao
                                }, null, 8, ["innerHTML"])
                              ]),
                              _: 2
                            }, 1040)
                          ]),
                          _: 1
                        }, 8, ["modelValue", "onUpdate:modelValue", "items"])
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, { cols: "2" }, {
                      default: withCtx(() => [
                        createVNode(VAutocomplete, {
                          items: unref(usuariosItems),
                          modelValue: unref(state).usuario_token,
                          "onUpdate:modelValue": ($event) => unref(state).usuario_token = $event,
                          "item-title": "user_nome",
                          "item-value": "user_token",
                          label: "Usu\xE1rio",
                          dense: ""
                        }, null, 8, ["items", "modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, { cols: "3" }, {
                      default: withCtx(() => [
                        createVNode(VAutocomplete, {
                          modelValue: unref(state).situacao,
                          "onUpdate:modelValue": ($event) => unref(state).situacao = $event,
                          items: unref(situacaoItems),
                          label: "Situa\xE7\xE3o",
                          dense: ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, { cols: "1" }, {
                      default: withCtx(() => [
                        createVNode(VTextField, {
                          modelValue: unref(state).livro,
                          "onUpdate:modelValue": ($event) => unref(state).livro = $event,
                          label: "Livro",
                          dense: ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, { cols: "1" }, {
                      default: withCtx(() => [
                        createVNode(VTextField, {
                          modelValue: unref(state).folha,
                          "onUpdate:modelValue": ($event) => unref(state).folha = $event,
                          label: "Folha",
                          dense: ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, null, {
                      default: withCtx(() => [
                        createVNode("div", null, [
                          createVNode("img", {
                            onClick: searchAtos,
                            style: { "width": "40px", "height": "40px", "cursor": "pointer" },
                            src: _imports_1,
                            alt: "Pesquisar"
                          })
                        ])
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
                default: withCtx(() => [
                  createVNode("h1", null, "Atos")
                ]),
                _: 1
              }),
              createVNode(VRow, null, {
                default: withCtx(() => [
                  createVNode(VCol, { cols: "2" }, {
                    default: withCtx(() => [
                      withDirectives(createVNode(VTextField, {
                        modelValue: unref(state).data_inicio,
                        "onUpdate:modelValue": ($event) => unref(state).data_inicio = $event,
                        label: "Abertura de",
                        placeholder: "dd/mm/yyyy",
                        dense: ""
                      }, null, 8, ["modelValue", "onUpdate:modelValue"]), [
                        [_directive_mask, "##/##/####"]
                      ])
                    ]),
                    _: 1
                  }),
                  createVNode(VCol, { cols: "2" }, {
                    default: withCtx(() => [
                      withDirectives(createVNode(VTextField, {
                        modelValue: unref(state).data_fim,
                        "onUpdate:modelValue": ($event) => unref(state).data_fim = $event,
                        label: "Abertura at\xE9",
                        placeholder: "dd/mm/yyyy",
                        dense: ""
                      }, null, 8, ["modelValue", "onUpdate:modelValue"]), [
                        [_directive_mask, "##/##/####"]
                      ])
                    ]),
                    _: 1
                  }),
                  createVNode(VCol, { cols: "2" }, {
                    default: withCtx(() => [
                      withDirectives(createVNode(VTextField, {
                        modelValue: unref(state).data_lavratura_inicio,
                        "onUpdate:modelValue": ($event) => unref(state).data_lavratura_inicio = $event,
                        label: "Lavratura de",
                        placeholder: "dd/mm/yyyy",
                        dense: ""
                      }, null, 8, ["modelValue", "onUpdate:modelValue"]), [
                        [_directive_mask, "##/##/####"]
                      ])
                    ]),
                    _: 1
                  }),
                  createVNode(VCol, { cols: "2" }, {
                    default: withCtx(() => [
                      withDirectives(createVNode(VTextField, {
                        modelValue: unref(state).data_lavratura_fim,
                        "onUpdate:modelValue": ($event) => unref(state).data_lavratura_fim = $event,
                        label: "Lavratura at\xE9",
                        placeholder: "dd/mm/yyyy",
                        dense: ""
                      }, null, 8, ["modelValue", "onUpdate:modelValue"]), [
                        [_directive_mask, "##/##/####"]
                      ])
                    ]),
                    _: 1
                  }),
                  createVNode(VCol, { cols: "2" }, {
                    default: withCtx(() => [
                      createVNode(VTextField, {
                        modelValue: unref(state).numero,
                        "onUpdate:modelValue": ($event) => unref(state).numero = $event,
                        label: "N\xB0 OS"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(VCol, { cols: "2" }, {
                    default: withCtx(() => [
                      createVNode(VTextField, {
                        modelValue: unref(state).selo,
                        "onUpdate:modelValue": ($event) => unref(state).selo = $event,
                        label: "Selo",
                        dense: ""
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
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
                        modelValue: unref(state).protocolo,
                        "onUpdate:modelValue": ($event) => unref(state).protocolo = $event,
                        label: "Protocolo"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(VCol, { cols: "2" }, {
                    default: withCtx(() => [
                      withDirectives(createVNode(VTextField, {
                        modelValue: unref(state).apresentante_cpf,
                        "onUpdate:modelValue": ($event) => unref(state).apresentante_cpf = $event,
                        label: "CPF",
                        dense: ""
                      }, null, 8, ["modelValue", "onUpdate:modelValue"]), [
                        [_directive_mask, "###.###.###-##"]
                      ])
                    ]),
                    _: 1
                  }),
                  createVNode(VCol, { cols: "3" }, {
                    default: withCtx(() => [
                      createVNode(VTextField, {
                        modelValue: unref(state).parte,
                        "onUpdate:modelValue": ($event) => unref(state).parte = $event,
                        label: "Parte",
                        dense: ""
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(VCol, { cols: "3" }, {
                    default: withCtx(() => [
                      createVNode(VAutocomplete, {
                        modelValue: unref(state).ato_tipo_token,
                        "onUpdate:modelValue": ($event) => unref(state).ato_tipo_token = $event,
                        items: unref(tipoAtosItems),
                        "item-value": "token",
                        label: "Tipo Servi\xE7o",
                        "menu-props": {
                          maxWidth: "680px",
                          width: "680px"
                        },
                        dense: ""
                      }, {
                        item: withCtx(({ props, item }) => [
                          createVNode(VListItem, props, {
                            title: withCtx(() => [
                              createVNode("span", {
                                innerHTML: item.raw.descricao
                              }, null, 8, ["innerHTML"])
                            ]),
                            _: 2
                          }, 1040)
                        ]),
                        _: 1
                      }, 8, ["modelValue", "onUpdate:modelValue", "items"])
                    ]),
                    _: 1
                  }),
                  createVNode(VCol, { cols: "2" }, {
                    default: withCtx(() => [
                      createVNode(VAutocomplete, {
                        items: unref(usuariosItems),
                        modelValue: unref(state).usuario_token,
                        "onUpdate:modelValue": ($event) => unref(state).usuario_token = $event,
                        "item-title": "user_nome",
                        "item-value": "user_token",
                        label: "Usu\xE1rio",
                        dense: ""
                      }, null, 8, ["items", "modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(VCol, { cols: "3" }, {
                    default: withCtx(() => [
                      createVNode(VAutocomplete, {
                        modelValue: unref(state).situacao,
                        "onUpdate:modelValue": ($event) => unref(state).situacao = $event,
                        items: unref(situacaoItems),
                        label: "Situa\xE7\xE3o",
                        dense: ""
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                    ]),
                    _: 1
                  }),
                  createVNode(VCol, { cols: "1" }, {
                    default: withCtx(() => [
                      createVNode(VTextField, {
                        modelValue: unref(state).livro,
                        "onUpdate:modelValue": ($event) => unref(state).livro = $event,
                        label: "Livro",
                        dense: ""
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(VCol, { cols: "1" }, {
                    default: withCtx(() => [
                      createVNode(VTextField, {
                        modelValue: unref(state).folha,
                        "onUpdate:modelValue": ($event) => unref(state).folha = $event,
                        label: "Folha",
                        dense: ""
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(VCol, null, {
                    default: withCtx(() => [
                      createVNode("div", null, [
                        createVNode("img", {
                          onClick: searchAtos,
                          style: { "width": "40px", "height": "40px", "cursor": "pointer" },
                          src: _imports_1,
                          alt: "Pesquisar"
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
      }, _parent));
      _push(`<div style="${ssrRenderStyle({ "width": "1300px", "margin": "0 auto" })}" data-v-c85eccdf><hr class="mt-5 mb-5" data-v-c85eccdf>`);
      _push(ssrRenderComponent(VDataTable, {
        headers,
        items: unref(atos),
        style: { "font-size": "12px" },
        "item-key": "id"
      }, {
        "item.actions": withCtx(({ item }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div style="${ssrRenderStyle({ "display": "flex", "gap": "4px", "justify-content": "center" })}" data-v-c85eccdf${_scopeId}><div title="Visualizar" data-v-c85eccdf${_scopeId}><img style="${ssrRenderStyle({ "width": "30px", "height": "30px", "cursor": "pointer" })}"${ssrRenderAttr("src", _imports_1)} alt="Visualizar" data-v-c85eccdf${_scopeId}></div><div title="Reimprimir" data-v-c85eccdf${_scopeId}><img style="${ssrRenderStyle({ "width": "30px", "height": "30px", "cursor": "pointer" })}"${ssrRenderAttr("src", _imports_3)} alt="Reimprimir" data-v-c85eccdf${_scopeId}></div><div class="${ssrRenderClass({ disabled: !item.btn_editar })}"${ssrRenderAttr("title", item.btn_editar ? "Editar" : "Desabilitado")} data-v-c85eccdf${_scopeId}><img style="${ssrRenderStyle({
              cursor: item.btn_editar ? "pointer" : "default",
              width: "30px",
              height: "30px"
            })}"${ssrRenderAttr("src", _imports_1$1)} alt="Editar" data-v-c85eccdf${_scopeId}></div><div title="Excluir" data-v-c85eccdf${_scopeId}>`);
            if (item.excluido) {
              _push2(`<img style="${ssrRenderStyle({ "width": "30px", "height": "30px", "cursor": "pointer" })}"${ssrRenderAttr("src", _imports_2)} alt="Visualizar" title="Reativar" data-v-c85eccdf${_scopeId}>`);
            } else {
              _push2(`<img${ssrRenderAttr("src", _imports_3$1)} alt="Excluir" class="trash-icon" style="${ssrRenderStyle({ "width": "30px", "height": "30px", "cursor": "pointer" })}" title="Excluir" data-v-c85eccdf${_scopeId}>`);
            }
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", { style: { "display": "flex", "gap": "4px", "justify-content": "center" } }, [
                createVNode("div", {
                  onClick: ($event) => redirectoToView(item),
                  title: "Visualizar"
                }, [
                  createVNode("img", {
                    style: { "width": "30px", "height": "30px", "cursor": "pointer" },
                    src: _imports_1,
                    alt: "Visualizar"
                  })
                ], 8, ["onClick"]),
                createVNode("div", {
                  onClick: ($event) => redirectToModalReimprimir(item.token),
                  title: "Reimprimir"
                }, [
                  createVNode("img", {
                    style: { "width": "30px", "height": "30px", "cursor": "pointer" },
                    src: _imports_3,
                    alt: "Reimprimir"
                  })
                ], 8, ["onClick"]),
                createVNode("div", {
                  class: { disabled: !item.btn_editar },
                  onClick: ($event) => item.btn_editar ? redirectToUpdateAto({
                    id: item.id,
                    tipo: item.tipo,
                    token: item.token,
                    tipo_token: item.tipo_token,
                    usa_imoveis: item.usa_imoveis
                  }) : null,
                  title: item.btn_editar ? "Editar" : "Desabilitado"
                }, [
                  createVNode("img", {
                    style: {
                      cursor: item.btn_editar ? "pointer" : "default",
                      width: "30px",
                      height: "30px"
                    },
                    src: _imports_1$1,
                    alt: "Editar"
                  }, null, 4)
                ], 10, ["onClick", "title"]),
                createVNode("div", {
                  onClick: ($event) => deleteAto(item),
                  title: "Excluir"
                }, [
                  item.excluido ? (openBlock(), createBlock("img", {
                    key: 0,
                    style: { "width": "30px", "height": "30px", "cursor": "pointer" },
                    src: _imports_2,
                    alt: "Visualizar",
                    title: "Reativar"
                  })) : (openBlock(), createBlock("img", {
                    key: 1,
                    src: _imports_3$1,
                    alt: "Excluir",
                    class: "trash-icon",
                    style: { "width": "30px", "height": "30px", "cursor": "pointer" },
                    title: "Excluir"
                  }))
                ], 8, ["onClick"])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      if (unref(modalVisible)) {
        _push(ssrRenderComponent(_component_ModalTiposAtos, {
          show: unref(modalVisible),
          servicos: _ctx.dadosData.servicos || [],
          tiposAtos: _ctx.dadosData.tiposAtos || [],
          onClose: ($event) => modalVisible.value = false,
          onUpdateAto: _ctx.handleUpdateAto
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(_component_ReimpressaoSelos, {
        show: unref(isModalReimprimirOpen),
        ato_token: unref(ato_token),
        onClose: ($event) => isModalReimprimirOpen.value = false
      }, null, _parent));
      _push(ssrRenderComponent(_component_RecebimentoOrdem, {
        show: unref(isModalRecebimentoOpen),
        numero_os: unref(numero_os),
        ordem: unref(selectedOrder),
        onClose: ($event) => isModalRecebimentoOpen.value = false,
        onRefreshValue: ($event) => atosPayload()
      }, null, _parent));
      _push(ssrRenderComponent(_component_ModalConfirmacao, {
        show: unref(isModalCancelamentoOpen),
        condMessage: unref(condMessage),
        onClose: ($event) => isModalCancelamentoOpen.value = false,
        onConfirm: cancelaAto
      }, null, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/atos/lista/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : undefined;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-c85eccdf"]]);

export { index as default };
//# sourceMappingURL=index-D3lKdgUX.mjs.map
