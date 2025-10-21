import { _ as __nuxt_component_0 } from './nuxt-link-TpvcaGEw.mjs';
import { useSSRContext, ref, reactive, withCtx, unref, createVNode, createTextVNode, openBlock, createBlock, createCommentVNode, computed, withAsyncContext, provide, watch, toDisplayString } from 'vue';
import { ssrRenderComponent, ssrRenderAttr, ssrRenderStyle, ssrInterpolate } from 'vue/server-renderer';
import { b as useNuxtApp, u as useRouter$1, g as useRoute$1, f as VTextField, V as VBtn, e as useCookie, b8 as VProgressCircular, b9 as VSheet, c as useRuntimeConfig } from './server.mjs';
import { u as useFetch } from './fetch-uf6n1sXR.mjs';
import { V as VContainer } from './VContainer-CUysD4sO.mjs';
import { V as VRow } from './VRow-Bqz0CuIN.mjs';
import { V as VCol } from './VCol-BT4RzX0Q.mjs';
import { V as VAutocomplete } from './VAutocomplete-B9VRQqKl.mjs';
import { _ as _imports_0$3, a as _imports_1$2, b as _sfc_main$6 } from './RegistroPessoas-Bc8G__wj.mjs';
import { _ as _imports_5, T as Toolbar, W as WordExport, S as Search, D as DocumentEditorContainerComponent, a as _imports_0$1, b as _sfc_main$2$1, c as _sfc_main$1$1, d as _sfc_main$8 } from './Observacao-eVoNjoG5.mjs';
import { r as registerLicense, _ as _sfc_main$7 } from './FichaCard-BDq7cEeS.mjs';
import { _ as _imports_1 } from './visualizar-BoZ30DMV.mjs';
import { _ as _imports_0 } from './novo-CWU3oYa5.mjs';
import { _ as _imports_2 } from './visualizar-vermelho-Ly_aKn8Z.mjs';
import { _ as _imports_1$1 } from './editar-BcGPsVK2.mjs';
import { _ as _imports_2$1, a as _imports_3 } from './excluido-D7FHZla7.mjs';
import { V as VDataTable } from './VDataTable-BqxaRhj7.mjs';
import { _ as __nuxt_component_1 } from './Confirmacao-Dgl39c3X.mjs';
import { V as VCard } from './VCard-Dbn6yWsi.mjs';
import { f as formatDate } from './formatDate-DflkuJ_V.mjs';
import { _ as _imports_2$2 } from './escanear-CJoLAgRx.mjs';
import { _ as _imports_0$2 } from './abre-arquivo-KvIa04gq.mjs';
import { useVuelidate } from '@vuelidate/core';
import { helpers, required } from '@vuelidate/validators';

const _sfc_main$5 = {
  __name: "Dados",
  __ssrInlineRender: true,
  props: {
    item_dados: {
      type: Array,
      required: true
    },
    item_situacoes: {
      type: Array,
      required: true
    }
  },
  setup(__props) {
    const props = __props;
    const { $toast } = useNuxtApp();
    const config = useRuntimeConfig();
    const router = useRouter$1();
    const route = useRoute$1();
    const updateAtoProcuracao = `${config.public.managemant}/updateAtos`;
    const situacoesItems = ref(props.item_situacoes);
    const isVisualizar = ref(route.query.origem === "vizualizar");
    const state = reactive({
      dt_abertura: props.item_dados[0].dt_abertura || null,
      status: props.item_dados[0].status || null,
      mne: props.item_dados[0].mne || null
    });
    async function onUpdate() {
      const { data, error, status } = await useFetch(
        `${updateAtoProcuracao}/${route.query.ato_id}`,
        {
          method: "PUT",
          body: {
            status: state.status,
            mne: state.mne,
            dt_abertura: state.dt_abertura
          }
        },
        "$EIT5jtTUdX"
      );
      if (status.value === "success") {
        $toast.success("Ato Atualizado com sucesso");
      }
    }
    const goBack = () => {
      const origem = route.query.origem || "criar";
      const id = route.query.id;
      switch (origem) {
        case "atualizar":
        case "vizualizar":
          router.push(`/os/atualizar/${id}`);
          break;
        case "atualizar-lista":
        case "vizualizar-lista":
          router.push("/atos/lista");
          break;
        default:
          router.push("/os/criar-registro");
          break;
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(ssrRenderComponent(VContainer, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VRow, { class: "mt-5" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VCol, { cols: "3" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VAutocomplete, {
                          label: "Situa\xE7\xE3o",
                          modelValue: unref(state).status,
                          "onUpdate:modelValue": ($event) => unref(state).status = $event,
                          items: unref(situacoesItems),
                          "item-title": "descricao",
                          "item-value": "descricao",
                          required: ""
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VAutocomplete, {
                            label: "Situa\xE7\xE3o",
                            modelValue: unref(state).status,
                            "onUpdate:modelValue": ($event) => unref(state).status = $event,
                            items: unref(situacoesItems),
                            "item-title": "descricao",
                            "item-value": "descricao",
                            required: ""
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
                          label: "Situa\xE7\xE3o",
                          modelValue: unref(state).status,
                          "onUpdate:modelValue": ($event) => unref(state).status = $event,
                          items: unref(situacoesItems),
                          "item-title": "descricao",
                          "item-value": "descricao",
                          required: ""
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
                  _push3(ssrRenderComponent(VCol, { cols: "5" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VTextField, {
                          label: "MNE - Matr\xEDcula Notoria Eletr\xF4nica",
                          modelValue: unref(state).mne,
                          "onUpdate:modelValue": ($event) => unref(state).mne = $event
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VTextField, {
                            label: "MNE - Matr\xEDcula Notoria Eletr\xF4nica",
                            modelValue: unref(state).mne,
                            "onUpdate:modelValue": ($event) => unref(state).mne = $event
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VCol, { cols: "5" }, {
                      default: withCtx(() => [
                        createVNode(VTextField, {
                          label: "MNE - Matr\xEDcula Notoria Eletr\xF4nica",
                          modelValue: unref(state).mne,
                          "onUpdate:modelValue": ($event) => unref(state).mne = $event
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
                          modelValue: unref(state).dt_abertura,
                          "onUpdate:modelValue": ($event) => unref(state).dt_abertura = $event,
                          type: "date",
                          label: "Data Lavratura",
                          readonly: ""
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VTextField, {
                            modelValue: unref(state).dt_abertura,
                            "onUpdate:modelValue": ($event) => unref(state).dt_abertura = $event,
                            type: "date",
                            label: "Data Lavratura",
                            readonly: ""
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
                        createVNode(VTextField, {
                          modelValue: unref(state).dt_abertura,
                          "onUpdate:modelValue": ($event) => unref(state).dt_abertura = $event,
                          type: "date",
                          label: "Data Lavratura",
                          readonly: ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(VRow, { class: "mb-3" }, {
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
                  if (!unref(isVisualizar)) {
                    _push3(ssrRenderComponent(VBtn, {
                      class: "ml-10",
                      onClick: onUpdate,
                      size: "large",
                      color: "green"
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
                    _push3(`<!---->`);
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
                    !unref(isVisualizar) ? (openBlock(), createBlock(VBtn, {
                      key: 0,
                      class: "ml-10",
                      onClick: onUpdate,
                      size: "large",
                      color: "green"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Atualizar")
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
              createVNode(VRow, { class: "mt-5" }, {
                default: withCtx(() => [
                  createVNode(VCol, { cols: "3" }, {
                    default: withCtx(() => [
                      createVNode(VAutocomplete, {
                        label: "Situa\xE7\xE3o",
                        modelValue: unref(state).status,
                        "onUpdate:modelValue": ($event) => unref(state).status = $event,
                        items: unref(situacoesItems),
                        "item-title": "descricao",
                        "item-value": "descricao",
                        required: ""
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(VRow, null, {
                default: withCtx(() => [
                  createVNode(VCol, { cols: "5" }, {
                    default: withCtx(() => [
                      createVNode(VTextField, {
                        label: "MNE - Matr\xEDcula Notoria Eletr\xF4nica",
                        modelValue: unref(state).mne,
                        "onUpdate:modelValue": ($event) => unref(state).mne = $event
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
                        modelValue: unref(state).dt_abertura,
                        "onUpdate:modelValue": ($event) => unref(state).dt_abertura = $event,
                        type: "date",
                        label: "Data Lavratura",
                        readonly: ""
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(VRow, { class: "mb-3" }, {
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
                  !unref(isVisualizar) ? (openBlock(), createBlock(VBtn, {
                    key: 0,
                    class: "ml-10",
                    onClick: onUpdate,
                    size: "large",
                    color: "green"
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Atualizar")
                    ]),
                    _: 1
                  })) : createCommentVNode("", true)
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
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Procuracao/atualizar/Dados.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : undefined;
};
const _sfc_main$4 = {
  __name: "Partes",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const router = useRouter$1();
    const route = useRoute$1();
    const config = useRuntimeConfig();
    const { $toast } = useNuxtApp();
    const procurarPessoa = `${config.public.managemant}/pesquisarPessoas`;
    const papeisApresentante = `${config.public.managemant}/listarPapeis`;
    const criarAtoPessoa = `${config.public.managemant}/createAtosPessoa`;
    const pessoasUpdate = `${config.public.managemant}/updateAtosPessoa`;
    const getPartesId = `${config.public.managemant}/getAtosPessoaById`;
    const baixarDocumento = `${config.public.managemant}/download`;
    const cartorio_token = ref(useCookie("user-data").value.cartorio_token);
    const isVisualizar = ref(route.query.origem === "vizualizar");
    const pessoasItems = ref([]);
    const pessoasItem = ref({});
    const pessoasTable = ref([]);
    const papeisItems = ref([]);
    const isModalRepresentanteOpen = ref(false);
    const isModalRegistroOpen = ref(false);
    const isModalFichaOpen = ref(false);
    const isModalPapelOpen = ref(false);
    const pessoasRepresentantes = ref(null);
    const representante_nome = ref(null);
    const ato_pessoa_id = ref(null);
    const ato_papel_id = ref(null);
    const representante_pessoa_id = ref(null);
    const ato_token = ref(route.query.tipo_ato_token);
    const fichaRender = ref(null);
    const headers = [
      {
        title: "Documento",
        align: "start",
        key: "pessoa.documento"
      },
      {
        title: "Pessoa",
        align: "start",
        key: "pessoa.nome",
        width: "320px"
      },
      {
        title: "Papel",
        align: "start",
        key: "papel.descricao"
      },
      {
        title: "Representante",
        align: "start",
        key: "representante.nome",
        width: "320px"
      },
      { value: "actions" }
    ];
    const state = reactive({
      papeis: null,
      nome: null,
      pessoa: null,
      documento: null
    });
    computed(() => {
      var _a;
      return ((_a = state.pessoa) == null ? undefined : _a.link_ficha) || false;
    });
    const { data } = ([__temp, __restore] = withAsyncContext(() => useFetch(papeisApresentante, {
      method: "POST",
      body: { tipo_ato_token: route.query.tipo_ato_token }
    }, "$acoiTIUp00")), __temp = await __temp, __restore(), __temp);
    papeisItems.value = data.value;
    const getDadosPartes = async () => {
      const { data: dadosParte } = await useFetch(
        `${getPartesId}/${route.query.ato_id}`,
        {
          method: "GET"
        },
        "$ypnU9hCpVn"
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
        const { data: pessoasData, error } = await useFetch(procurarPessoa, {
          method: "POST",
          body: {
            cartorio_token: cartorio_token.value,
            documento: state.documento,
            nome: state.nome
          }
        }, "$pr30MyPXfY");
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
    const atualizarRepresentante = async () => {
      await getDadosPartes();
    };
    const createRepresentante = async () => {
      const representante = {
        pessoa: state.pessoa,
        papel: papeisItems.value.find((papel) => papel.id === state.papeis),
        // Objeto completo do papel
        representante: { nome: null }
      };
      const atosPessoas = await useFetch(`${getPartesId}/${route.query.ato_id}`, {
        method: "GET"
      }, "$scHdIvxj2D");
      for (const element of atosPessoas.data.value) {
        if (element.pessoa_id === state.pessoa.id && element.ato_id === Number(route.query.ato_id) && element.tipo_parte_id === state.papeis) {
          $toast.error("Pessoa J\xE1 Registrada Com Esse Papel!");
          return;
        }
      }
      const { data: data2, error, status } = await useFetch(criarAtoPessoa, {
        method: "POST",
        body: {
          ato_id: Number(route.query.ato_id),
          pessoa_id: state.pessoa.id,
          tipo_parte_id: state.papeis,
          user_id: useCookie("user-data").value.usuario_id
        }
      }, "$18isAgOJxG");
      if (status.value === "success") {
        representante.id = data2.value.id;
        $toast.success("Pessoa Registrada com Sucesso!");
        pessoasTable.value.push(representante);
      } else {
        $toast.error(error.value.message);
      }
    };
    const redirectToFicha = async (item) => {
      isModalFichaOpen.value = true;
      const { data: linkUrl } = await useFetch(baixarDocumento, {
        method: "POST",
        body: {
          bucket: useCookie("user-data").value.cartorio_token,
          path: item.pessoa.link_ficha
        }
      }, "$hmDzSF3F61");
      fichaRender.value = linkUrl.value;
      pessoasItem.value = item.pessoa;
    };
    const redirectToRepresentante = (item) => {
      const pessoasFiltradas = pessoasTable.value.filter((p) => p.pessoa.id !== item.pessoa.id && !p.excluido).map((p) => ({
        id: p.pessoa.id,
        nome: p.pessoa.nome
      }));
      ato_pessoa_id.value = item.id;
      pessoasRepresentantes.value = pessoasFiltradas;
      isModalRepresentanteOpen.value = true;
      representante_nome.value = item.pessoa.nome;
      representante_pessoa_id.value = item.pessoa.id;
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
        }, "$l09I6nLRfk");
      } catch (error) {
        console.error("Erro ao excluir pessoa:", error);
      }
    }
    const goBack = () => {
      const origem = route.query.origem || "criar";
      const id = route.query.id;
      switch (origem) {
        case "atualizar":
        case "vizualizar":
          router.push(`/os/atualizar/${id}`);
          break;
        case "atualizar-lista":
        case "vizualizar-lista":
          router.push("/atos/lista");
          break;
        default:
          router.push("/os/criar-registro");
          break;
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ModalRegistroPessoas = _sfc_main$6;
      const _component_ModalRepresentante = _sfc_main$2$1;
      const _component_ModalPapel = _sfc_main$1$1;
      const _component_ModalFichaCard = _sfc_main$7;
      const _component_NuxtLink = __nuxt_component_0;
      _push(ssrRenderComponent(VContainer, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (!unref(isVisualizar)) {
              _push2(ssrRenderComponent(VRow, { class: "mt-5" }, {
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
            } else {
              _push2(`<!---->`);
            }
            if (!unref(isVisualizar)) {
              _push2(ssrRenderComponent(VRow, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(VCol, { cols: "4" }, {
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
                    _push3(ssrRenderComponent(VCol, { cols: "3" }, {
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
                    if (!unref(isVisualizar)) {
                      _push3(`<div${_scopeId2}><img class="mt-1"${ssrRenderAttr("src", _imports_0)} style="${ssrRenderStyle({ "width": "40px", "cursor": "pointer" })}" title="Criar Representante"${_scopeId2}></div>`);
                    } else {
                      _push3(`<!---->`);
                    }
                  } else {
                    return [
                      createVNode(VCol, { cols: "4" }, {
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
                      createVNode(VCol, { cols: "3" }, {
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
                      !unref(isVisualizar) ? (openBlock(), createBlock("div", { key: 0 }, [
                        createVNode("img", {
                          class: "mt-1",
                          src: _imports_0,
                          style: { "width": "40px", "cursor": "pointer" },
                          title: "Criar Representante",
                          onClick: createRepresentante
                        })
                      ])) : createCommentVNode("", true)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(ssrRenderComponent(VRow, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VCol, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VDataTable, {
                          style: { "height": "465px" },
                          headers,
                          items: unref(pessoasTable)
                        }, {
                          "item.actions": withCtx(({ item }, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              if (!unref(isVisualizar)) {
                                _push5(ssrRenderComponent(VRow, null, {
                                  default: withCtx((_4, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(`<div style="${ssrRenderStyle({ "display": "flex", "cursor": "pointer", "justify-content": "flex-end" })}" class="mr-1" title="Visualizar Ficha"${_scopeId5}>`);
                                      if (item.pessoa.link_ficha) {
                                        _push6(`<img style="${ssrRenderStyle({ "width": "30px", "height": "30px" })}"${ssrRenderAttr("src", _imports_1)} alt="Visualizar"${_scopeId5}>`);
                                      } else {
                                        _push6(`<img style="${ssrRenderStyle({ "width": "30px", "height": "30px" })}"${ssrRenderAttr("src", _imports_2)} alt="Visualizar"${_scopeId5}>`);
                                      }
                                      _push6(`</div><div style="${ssrRenderStyle({ "display": "flex", "cursor": "pointer", "justify-content": "flex-end" })}" class="mr-1" title="Alterar Papel"${_scopeId5}><img style="${ssrRenderStyle({ "width": "30px", "height": "30px" })}"${ssrRenderAttr("src", _imports_1$1)} alt="Visualizar"${_scopeId5}></div><div class="mr-1" style="${ssrRenderStyle({ "display": "flex", "cursor": "pointer", "justify-content": "flex-end" })}" title="Deletar Pessoa"${_scopeId5}>`);
                                      if (item.excluido) {
                                        _push6(`<img style="${ssrRenderStyle({ "width": "30px", "height": "30px" })}"${ssrRenderAttr("src", _imports_2$1)} alt="Visualizar" title="Reativar"${_scopeId5}>`);
                                      } else {
                                        _push6(`<img${ssrRenderAttr("src", _imports_3)} alt="Excluir" class="trash-icon" style="${ssrRenderStyle({ "width": "30px", "height": "30px" })}" title="Excluir"${_scopeId5}>`);
                                      }
                                      _push6(`</div><div style="${ssrRenderStyle({ "display": "flex", "cursor": "pointer", "justify-content": "flex-end" })}" class="mr-1" title="Selecionar Representante"${_scopeId5}><img style="${ssrRenderStyle({ "width": "30px", "height": "30px" })}"${ssrRenderAttr("src", _imports_5)} alt="Visualizar"${_scopeId5}></div>`);
                                    } else {
                                      return [
                                        createVNode("div", {
                                          style: { "display": "flex", "cursor": "pointer", "justify-content": "flex-end" },
                                          class: "mr-1",
                                          onClick: ($event) => redirectToFicha(item),
                                          title: "Visualizar Ficha"
                                        }, [
                                          item.pessoa.link_ficha ? (openBlock(), createBlock("img", {
                                            key: 0,
                                            style: { "width": "30px", "height": "30px" },
                                            src: _imports_1,
                                            alt: "Visualizar"
                                          })) : (openBlock(), createBlock("img", {
                                            key: 1,
                                            style: { "width": "30px", "height": "30px" },
                                            src: _imports_2,
                                            alt: "Visualizar"
                                          }))
                                        ], 8, ["onClick"]),
                                        createVNode("div", {
                                          style: { "display": "flex", "cursor": "pointer", "justify-content": "flex-end" },
                                          onClick: ($event) => redirectToPapel(item),
                                          class: "mr-1",
                                          title: "Alterar Papel"
                                        }, [
                                          createVNode("img", {
                                            style: { "width": "30px", "height": "30px" },
                                            src: _imports_1$1,
                                            alt: "Visualizar"
                                          })
                                        ], 8, ["onClick"]),
                                        createVNode("div", {
                                          class: "mr-1",
                                          style: { "display": "flex", "cursor": "pointer", "justify-content": "flex-end" },
                                          onClick: ($event) => deletePessoa(item),
                                          title: "Deletar Pessoa"
                                        }, [
                                          item.excluido ? (openBlock(), createBlock("img", {
                                            key: 0,
                                            style: { "width": "30px", "height": "30px" },
                                            src: _imports_2$1,
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
                                        ], 8, ["onClick"]),
                                        createVNode("div", {
                                          style: { "display": "flex", "cursor": "pointer", "justify-content": "flex-end" },
                                          class: "mr-1",
                                          onClick: ($event) => redirectToRepresentante(item),
                                          title: "Selecionar Representante"
                                        }, [
                                          createVNode("img", {
                                            style: { "width": "30px", "height": "30px" },
                                            src: _imports_5,
                                            alt: "Visualizar"
                                          })
                                        ], 8, ["onClick"])
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent5, _scopeId4));
                              } else {
                                _push5(`<!---->`);
                              }
                            } else {
                              return [
                                !unref(isVisualizar) ? (openBlock(), createBlock(VRow, { key: 0 }, {
                                  default: withCtx(() => [
                                    createVNode("div", {
                                      style: { "display": "flex", "cursor": "pointer", "justify-content": "flex-end" },
                                      class: "mr-1",
                                      onClick: ($event) => redirectToFicha(item),
                                      title: "Visualizar Ficha"
                                    }, [
                                      item.pessoa.link_ficha ? (openBlock(), createBlock("img", {
                                        key: 0,
                                        style: { "width": "30px", "height": "30px" },
                                        src: _imports_1,
                                        alt: "Visualizar"
                                      })) : (openBlock(), createBlock("img", {
                                        key: 1,
                                        style: { "width": "30px", "height": "30px" },
                                        src: _imports_2,
                                        alt: "Visualizar"
                                      }))
                                    ], 8, ["onClick"]),
                                    createVNode("div", {
                                      style: { "display": "flex", "cursor": "pointer", "justify-content": "flex-end" },
                                      onClick: ($event) => redirectToPapel(item),
                                      class: "mr-1",
                                      title: "Alterar Papel"
                                    }, [
                                      createVNode("img", {
                                        style: { "width": "30px", "height": "30px" },
                                        src: _imports_1$1,
                                        alt: "Visualizar"
                                      })
                                    ], 8, ["onClick"]),
                                    createVNode("div", {
                                      class: "mr-1",
                                      style: { "display": "flex", "cursor": "pointer", "justify-content": "flex-end" },
                                      onClick: ($event) => deletePessoa(item),
                                      title: "Deletar Pessoa"
                                    }, [
                                      item.excluido ? (openBlock(), createBlock("img", {
                                        key: 0,
                                        style: { "width": "30px", "height": "30px" },
                                        src: _imports_2$1,
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
                                    ], 8, ["onClick"]),
                                    createVNode("div", {
                                      style: { "display": "flex", "cursor": "pointer", "justify-content": "flex-end" },
                                      class: "mr-1",
                                      onClick: ($event) => redirectToRepresentante(item),
                                      title: "Selecionar Representante"
                                    }, [
                                      createVNode("img", {
                                        style: { "width": "30px", "height": "30px" },
                                        src: _imports_5,
                                        alt: "Visualizar"
                                      })
                                    ], 8, ["onClick"])
                                  ]),
                                  _: 2
                                }, 1024)) : createCommentVNode("", true)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VDataTable, {
                            style: { "height": "465px" },
                            headers,
                            items: unref(pessoasTable)
                          }, {
                            "item.actions": withCtx(({ item }) => [
                              !unref(isVisualizar) ? (openBlock(), createBlock(VRow, { key: 0 }, {
                                default: withCtx(() => [
                                  createVNode("div", {
                                    style: { "display": "flex", "cursor": "pointer", "justify-content": "flex-end" },
                                    class: "mr-1",
                                    onClick: ($event) => redirectToFicha(item),
                                    title: "Visualizar Ficha"
                                  }, [
                                    item.pessoa.link_ficha ? (openBlock(), createBlock("img", {
                                      key: 0,
                                      style: { "width": "30px", "height": "30px" },
                                      src: _imports_1,
                                      alt: "Visualizar"
                                    })) : (openBlock(), createBlock("img", {
                                      key: 1,
                                      style: { "width": "30px", "height": "30px" },
                                      src: _imports_2,
                                      alt: "Visualizar"
                                    }))
                                  ], 8, ["onClick"]),
                                  createVNode("div", {
                                    style: { "display": "flex", "cursor": "pointer", "justify-content": "flex-end" },
                                    onClick: ($event) => redirectToPapel(item),
                                    class: "mr-1",
                                    title: "Alterar Papel"
                                  }, [
                                    createVNode("img", {
                                      style: { "width": "30px", "height": "30px" },
                                      src: _imports_1$1,
                                      alt: "Visualizar"
                                    })
                                  ], 8, ["onClick"]),
                                  createVNode("div", {
                                    class: "mr-1",
                                    style: { "display": "flex", "cursor": "pointer", "justify-content": "flex-end" },
                                    onClick: ($event) => deletePessoa(item),
                                    title: "Deletar Pessoa"
                                  }, [
                                    item.excluido ? (openBlock(), createBlock("img", {
                                      key: 0,
                                      style: { "width": "30px", "height": "30px" },
                                      src: _imports_2$1,
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
                                  ], 8, ["onClick"]),
                                  createVNode("div", {
                                    style: { "display": "flex", "cursor": "pointer", "justify-content": "flex-end" },
                                    class: "mr-1",
                                    onClick: ($event) => redirectToRepresentante(item),
                                    title: "Selecionar Representante"
                                  }, [
                                    createVNode("img", {
                                      style: { "width": "30px", "height": "30px" },
                                      src: _imports_5,
                                      alt: "Visualizar"
                                    })
                                  ], 8, ["onClick"])
                                ]),
                                _: 2
                              }, 1024)) : createCommentVNode("", true)
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
                          style: { "height": "465px" },
                          headers,
                          items: unref(pessoasTable)
                        }, {
                          "item.actions": withCtx(({ item }) => [
                            !unref(isVisualizar) ? (openBlock(), createBlock(VRow, { key: 0 }, {
                              default: withCtx(() => [
                                createVNode("div", {
                                  style: { "display": "flex", "cursor": "pointer", "justify-content": "flex-end" },
                                  class: "mr-1",
                                  onClick: ($event) => redirectToFicha(item),
                                  title: "Visualizar Ficha"
                                }, [
                                  item.pessoa.link_ficha ? (openBlock(), createBlock("img", {
                                    key: 0,
                                    style: { "width": "30px", "height": "30px" },
                                    src: _imports_1,
                                    alt: "Visualizar"
                                  })) : (openBlock(), createBlock("img", {
                                    key: 1,
                                    style: { "width": "30px", "height": "30px" },
                                    src: _imports_2,
                                    alt: "Visualizar"
                                  }))
                                ], 8, ["onClick"]),
                                createVNode("div", {
                                  style: { "display": "flex", "cursor": "pointer", "justify-content": "flex-end" },
                                  onClick: ($event) => redirectToPapel(item),
                                  class: "mr-1",
                                  title: "Alterar Papel"
                                }, [
                                  createVNode("img", {
                                    style: { "width": "30px", "height": "30px" },
                                    src: _imports_1$1,
                                    alt: "Visualizar"
                                  })
                                ], 8, ["onClick"]),
                                createVNode("div", {
                                  class: "mr-1",
                                  style: { "display": "flex", "cursor": "pointer", "justify-content": "flex-end" },
                                  onClick: ($event) => deletePessoa(item),
                                  title: "Deletar Pessoa"
                                }, [
                                  item.excluido ? (openBlock(), createBlock("img", {
                                    key: 0,
                                    style: { "width": "30px", "height": "30px" },
                                    src: _imports_2$1,
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
                                ], 8, ["onClick"]),
                                createVNode("div", {
                                  style: { "display": "flex", "cursor": "pointer", "justify-content": "flex-end" },
                                  class: "mr-1",
                                  onClick: ($event) => redirectToRepresentante(item),
                                  title: "Selecionar Representante"
                                }, [
                                  createVNode("img", {
                                    style: { "width": "30px", "height": "30px" },
                                    src: _imports_5,
                                    alt: "Visualizar"
                                  })
                                ], 8, ["onClick"])
                              ]),
                              _: 2
                            }, 1024)) : createCommentVNode("", true)
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
            _push2(ssrRenderComponent(_component_ModalRepresentante, {
              representante_nome: unref(representante_nome),
              representantes: unref(pessoasRepresentantes),
              ato_id: unref(ato_pessoa_id),
              show: unref(isModalRepresentanteOpen),
              onClose: ($event) => isModalRepresentanteOpen.value = false,
              onUpdateRepresentante: atualizarRepresentante
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_ModalPapel, {
              representante_nome: unref(representante_nome),
              ato_token: unref(ato_token),
              ato_id: unref(ato_papel_id),
              show: unref(isModalPapelOpen),
              onClose: ($event) => isModalPapelOpen.value = false,
              onUpdatePapel: atualizarPapel
            }, null, _parent2, _scopeId));
            if (unref(isModalFichaOpen)) {
              _push2(ssrRenderComponent(_component_ModalFichaCard, {
                show: unref(isModalFichaOpen),
                "link-view": unref(fichaRender),
                "pessoa-obj": unref(pessoasItem),
                "is-view": true,
                onClose: ($event) => isModalFichaOpen.value = false
              }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(ssrRenderComponent(VRow, null, {
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
              !unref(isVisualizar) ? (openBlock(), createBlock(VRow, {
                key: 0,
                class: "mt-5"
              }, {
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
              })) : createCommentVNode("", true),
              !unref(isVisualizar) ? (openBlock(), createBlock(VRow, { key: 1 }, {
                default: withCtx(() => [
                  createVNode(VCol, { cols: "4" }, {
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
                  createVNode(VCol, { cols: "3" }, {
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
                  !unref(isVisualizar) ? (openBlock(), createBlock("div", { key: 0 }, [
                    createVNode("img", {
                      class: "mt-1",
                      src: _imports_0,
                      style: { "width": "40px", "cursor": "pointer" },
                      title: "Criar Representante",
                      onClick: createRepresentante
                    })
                  ])) : createCommentVNode("", true)
                ]),
                _: 1
              })) : createCommentVNode("", true),
              createVNode(VRow, null, {
                default: withCtx(() => [
                  createVNode(VCol, null, {
                    default: withCtx(() => [
                      createVNode(VDataTable, {
                        style: { "height": "465px" },
                        headers,
                        items: unref(pessoasTable)
                      }, {
                        "item.actions": withCtx(({ item }) => [
                          !unref(isVisualizar) ? (openBlock(), createBlock(VRow, { key: 0 }, {
                            default: withCtx(() => [
                              createVNode("div", {
                                style: { "display": "flex", "cursor": "pointer", "justify-content": "flex-end" },
                                class: "mr-1",
                                onClick: ($event) => redirectToFicha(item),
                                title: "Visualizar Ficha"
                              }, [
                                item.pessoa.link_ficha ? (openBlock(), createBlock("img", {
                                  key: 0,
                                  style: { "width": "30px", "height": "30px" },
                                  src: _imports_1,
                                  alt: "Visualizar"
                                })) : (openBlock(), createBlock("img", {
                                  key: 1,
                                  style: { "width": "30px", "height": "30px" },
                                  src: _imports_2,
                                  alt: "Visualizar"
                                }))
                              ], 8, ["onClick"]),
                              createVNode("div", {
                                style: { "display": "flex", "cursor": "pointer", "justify-content": "flex-end" },
                                onClick: ($event) => redirectToPapel(item),
                                class: "mr-1",
                                title: "Alterar Papel"
                              }, [
                                createVNode("img", {
                                  style: { "width": "30px", "height": "30px" },
                                  src: _imports_1$1,
                                  alt: "Visualizar"
                                })
                              ], 8, ["onClick"]),
                              createVNode("div", {
                                class: "mr-1",
                                style: { "display": "flex", "cursor": "pointer", "justify-content": "flex-end" },
                                onClick: ($event) => deletePessoa(item),
                                title: "Deletar Pessoa"
                              }, [
                                item.excluido ? (openBlock(), createBlock("img", {
                                  key: 0,
                                  style: { "width": "30px", "height": "30px" },
                                  src: _imports_2$1,
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
                              ], 8, ["onClick"]),
                              createVNode("div", {
                                style: { "display": "flex", "cursor": "pointer", "justify-content": "flex-end" },
                                class: "mr-1",
                                onClick: ($event) => redirectToRepresentante(item),
                                title: "Selecionar Representante"
                              }, [
                                createVNode("img", {
                                  style: { "width": "30px", "height": "30px" },
                                  src: _imports_5,
                                  alt: "Visualizar"
                                })
                              ], 8, ["onClick"])
                            ]),
                            _: 2
                          }, 1024)) : createCommentVNode("", true)
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
              createVNode(_component_ModalRepresentante, {
                representante_nome: unref(representante_nome),
                representantes: unref(pessoasRepresentantes),
                ato_id: unref(ato_pessoa_id),
                show: unref(isModalRepresentanteOpen),
                onClose: ($event) => isModalRepresentanteOpen.value = false,
                onUpdateRepresentante: atualizarRepresentante
              }, null, 8, ["representante_nome", "representantes", "ato_id", "show", "onClose"]),
              createVNode(_component_ModalPapel, {
                representante_nome: unref(representante_nome),
                ato_token: unref(ato_token),
                ato_id: unref(ato_papel_id),
                show: unref(isModalPapelOpen),
                onClose: ($event) => isModalPapelOpen.value = false,
                onUpdatePapel: atualizarPapel
              }, null, 8, ["representante_nome", "ato_token", "ato_id", "show", "onClose"]),
              unref(isModalFichaOpen) ? (openBlock(), createBlock(_component_ModalFichaCard, {
                key: 2,
                show: unref(isModalFichaOpen),
                "link-view": unref(fichaRender),
                "pessoa-obj": unref(pessoasItem),
                "is-view": true,
                onClose: ($event) => isModalFichaOpen.value = false
              }, null, 8, ["show", "link-view", "pessoa-obj", "onClose"])) : createCommentVNode("", true),
              createVNode(VRow, null, {
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
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Procuracao/atualizar/Partes.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : undefined;
};
const serviceUrl = "https://ej2services.syncfusion.com/production/web-services/api/documenteditor/";
const _sfc_main$3 = {
  __name: "Minuta",
  __ssrInlineRender: true,
  emits: ["page", "doc"],
  setup(__props, { emit: __emit }) {
    provide("DocumentEditorContainer", [Toolbar, WordExport, Search]);
    const config = useRuntimeConfig();
    const { $toast } = useNuxtApp();
    const router = useRouter$1();
    const route = useRoute$1();
    const emit = __emit;
    registerLicense(`${config.public.docEditor}`);
    const baixarDocumento = `${config.public.managemant}/download`;
    `${config.public.managemant}/atos/files`;
    const substituirModelo = `${config.public.managemant}/subitituirModelo`;
    const enviarDocumento = `${config.public.managemant}/upload`;
    const documentEditorContainer = ref(null);
    const isModalMinutaOpen = ref(false);
    const condMessage = ref(
      "Ao executar a gera\xE7\xE3o, a minuta atual ser\xE1 substitu\xEDda e n\xE3o poder\xE1 ser recuperada.Confirma ?"
    );
    const isVisualizar = ref(route.query.origem === "vizualizar");
    const loading = ref(false);
    const fetchBlobFromMinIO = async (fileUrl) => {
      try {
        const response = await fetch(fileUrl);
        if (!response.ok) {
          throw new Error("Erro ao baixar o arquivo do MinIO.");
        }
        return await response.blob();
      } catch (error) {
        console.error(error);
        return null;
      }
    };
    const onDocumentChange = async () => {
      const document = documentEditorContainer.value.ej2Instances.documentEditor;
      const sfdt = await document.saveAsBlob("Sfdt");
      const reader = new FileReader();
      reader.onload = () => {
        const sfdtText = reader.result;
        const document2 = documentEditorContainer.value.ej2Instances.documentEditor;
        const pageCount = document2.pageCount;
        emit("page", pageCount);
        emit("doc", sfdtText);
      };
      reader.readAsText(sfdt);
    };
    const salvarDocumento = async () => {
      loading.value = true;
      try {
        const document = documentEditorContainer.value.ej2Instances.documentEditor;
        const blob = await document.saveAsBlob("Sfdt");
        const formData = new FormData();
        formData.append("file", blob, `anexo.sfdt`);
        formData.append(
          "cartorio_token",
          useCookie("user-data").value.cartorio_token
        );
        formData.append("token", route.query.ato_token_edit);
        formData.append("tipo", "ato_minuta");
        const { data, status } = await useFetch(enviarDocumento, {
          method: "POST",
          body: formData
        }, "$xv11VtUdMy");
        if (status.value === "success") {
          $toast.success("Documento enviado!");
          const document2 = documentEditorContainer.value.ej2Instances.documentEditor;
          const pageCount = document2.pageCount;
          onDocumentChange();
          emit("page", pageCount);
        } else {
          $toast.error("Erro ao enviar documento para o sistema.");
        }
      } catch (error) {
        $toast.error("Erro ao salvar documento.");
        console.error(error);
      } finally {
        loading.value = false;
      }
    };
    const confirmaGerarMinuta = () => {
      isModalMinutaOpen.value = false;
      gerarMinuta();
    };
    const gerarMinuta = async () => {
      setLoading(true);
      try {
        await carregarModeloDeMinuta();
        setLoading(true);
        const { data, status } = await useFetch(substituirModelo, {
          method: "POST",
          body: { ato_token: route.query.ato_token_edit }
        }, "$zyzWHTXTBW");
        if (data.value) {
          substituirMarcadoresNoDocumento(data.value);
        }
      } catch (error) {
        console.error("Erro ao gerar a minuta:", error);
        $toast.error("Ocorreu um erro ao gerar a minuta.");
      } finally {
        setLoading(false);
      }
    };
    const carregarModeloDeMinuta = async () => {
      try {
        const { data: docModelo } = await useFetch(baixarDocumento, {
          method: "POST",
          body: {
            bucket: useCookie("user-data").value.cartorio_token,
            path: "provider/modeloAto.sfdt"
          }
        }, "$KreLE0Ys81");
        const blob = await fetchBlobFromMinIO(docModelo.value);
        if (blob) {
          const reader = new FileReader();
          reader.onload = () => {
            const content = reader.result;
            const documentEditor = documentEditorContainer.value.ej2Instances.documentEditor;
            documentEditor.open(content);
            emit("doc", content);
          };
          reader.readAsText(blob);
        }
      } catch (error) {
        console.error("Erro ao carregar o modelo de minuta:", error);
      }
    };
    const substituirMarcadoresNoDocumento = (data) => {
      const documentEditor = documentEditorContainer.value.ej2Instances.documentEditor;
      const substituirMarcadores = (obj) => {
        for (const [chave, valor] of Object.entries(obj)) {
          if (/^<<.+>>$/.test(chave)) {
            try {
              documentEditor.search.findAll(chave);
              if (documentEditor.search.searchResults.length > 0) {
                documentEditor.search.searchResults.replaceAll(valor);
              }
            } catch (error) {
              console.error(`Erro ao substituir o marcador ${chave}:`, error);
            }
          } else if (chave === "partes" && Array.isArray(valor) && valor.length > 0) {
            for (const parte of valor) {
              if (typeof parte === "object") {
                substituirMarcadores(parte);
              }
            }
          }
        }
      };
      substituirMarcadores(data);
    };
    const setLoading = (status) => {
      loading.value = status;
    };
    const goBack = () => {
      const origem = route.query.origem || "criar";
      const id = route.query.id;
      switch (origem) {
        case "atualizar":
        case "vizualizar":
          router.push(`/os/atualizar/${id}`);
          break;
        case "atualizar-lista":
        case "vizualizar-lista":
          router.push("/atos/lista");
          break;
        default:
          router.push("/os/criar-registro");
          break;
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      const _component_ModalConfirmacao = __nuxt_component_1;
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(DocumentEditorContainerComponent), {
        height: "900px",
        ref_key: "documentEditorContainer",
        ref: documentEditorContainer,
        serviceUrl,
        enableToolbar: true,
        enableWordExport: true
      }, null, _parent));
      if (unref(loading)) {
        _push(`<div class="loading-overlay">`);
        _push(ssrRenderComponent(VProgressCircular, {
          indeterminate: "",
          color: "white",
          size: "60",
          class: "loading-spinner"
        }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(VRow, { class: "ml-4 mt-4 mb-4" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_NuxtLink, { class: "mr-4" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VBtn, {
                    size: "large",
                    onClick: goBack,
                    color: "red"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Voltar`);
                      } else {
                        return [
                          createTextVNode("Voltar")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VBtn, {
                      size: "large",
                      onClick: goBack,
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
            }, _parent2, _scopeId));
            if (!unref(isVisualizar)) {
              _push2(ssrRenderComponent(VBtn, {
                size: "large",
                color: "green",
                onClick: salvarDocumento,
                disabled: unref(loading)
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`Atualizar`);
                  } else {
                    return [
                      createTextVNode("Atualizar")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            if (!unref(isVisualizar)) {
              _push2(ssrRenderComponent(VBtn, {
                class: "ml-4",
                size: "large",
                color: "blue",
                onClick: ($event) => isModalMinutaOpen.value = true
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`Gerar Minuta`);
                  } else {
                    return [
                      createTextVNode("Gerar Minuta")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode(_component_NuxtLink, { class: "mr-4" }, {
                default: withCtx(() => [
                  createVNode(VBtn, {
                    size: "large",
                    onClick: goBack,
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
              !unref(isVisualizar) ? (openBlock(), createBlock(VBtn, {
                key: 0,
                size: "large",
                color: "green",
                onClick: salvarDocumento,
                disabled: unref(loading)
              }, {
                default: withCtx(() => [
                  createTextVNode("Atualizar")
                ]),
                _: 1
              }, 8, ["disabled"])) : createCommentVNode("", true),
              !unref(isVisualizar) ? (openBlock(), createBlock(VBtn, {
                key: 1,
                class: "ml-4",
                size: "large",
                color: "blue",
                onClick: ($event) => isModalMinutaOpen.value = true
              }, {
                default: withCtx(() => [
                  createTextVNode("Gerar Minuta")
                ]),
                _: 1
              }, 8, ["onClick"])) : createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_ModalConfirmacao, {
        onConfirm: confirmaGerarMinuta,
        condMessage: unref(condMessage),
        show: unref(isModalMinutaOpen),
        onClose: ($event) => isModalMinutaOpen.value = false
      }, null, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Procuracao/atualizar/Minuta.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : undefined;
};
const _sfc_main$2 = {
  __name: "Livro",
  __ssrInlineRender: true,
  props: {
    pages: {
      type: Number,
      required: true
    },
    document: {
      type: String,
      required: true
    },
    linkLivro: {
      type: String || null
    }
  },
  async setup(__props) {
    let __temp, __restore;
    const props = __props;
    const config = useRuntimeConfig();
    registerLicense(`${config.public.docEditor}`);
    const { $toast } = useNuxtApp();
    const router = useRouter$1();
    const route = useRoute$1();
    const baixarDocumento = `${config.public.managemant}/download`;
    const pegarCaminhoDocumento = `${config.public.managemant}/atos/files`;
    const lavraAtoLivro = `${config.public.managemant}/lavrarAto`;
    const validaAto = `${config.public.managemant}/valida_lavratura`;
    const allEscreventes = `${config.public.managemant}/listarEscrevente`;
    const calculaAto = `${config.public.managemant}/ato_calcular`;
    const cartorio_token = ref(useCookie("user-data").value.cartorio_token);
    const usuario_token = useCookie("auth_token").value;
    const condMessage = ref(
      "Ao lavrar esse ato, a opera\xE7\xE3o n\xE3o poder\xE1 ser desfeita. Confirma ?"
    );
    const condStatus = ref(null);
    const condStatusMensagem = ref("");
    const isModalCondOpen = ref(false);
    const lavraData = ref(null);
    const selo = ref(null);
    const isVisualizar = ref(route.query.origem === "vizualizar");
    const documentEditorContainer = ref(null);
    const escreventesItems = ref([]);
    const valorAto = ref({});
    const pdfUrl = ref(null);
    const state = reactive({
      escrevente: null
    });
    const fetchBlobFromMinIO = async (fileUrl) => {
      try {
        const response = await fetch(fileUrl);
        if (!response.ok) {
          throw new Error("Erro ao baixar o arquivo do MinIO.");
        }
        return await response.blob();
      } catch (error) {
        console.error(error);
        return null;
      }
    };
    const getPathFromDocument = async () => {
      try {
        const { data: data2 } = await useFetch(
          `${pegarCaminhoDocumento}/${route.query.ato_token_edit}`,
          {
            method: "GET"
          },
          "$FnEbAJEARP"
        );
        return data2.value.link_ato;
      } catch (error) {
        console.error("Erro ao carregar o documento:", error);
        $toast.error(error);
      }
    };
    const loadDefaultDocument = async () => {
      try {
        if (props.linkLivro) {
          const { data: data3 } = await useFetch(baixarDocumento, {
            method: "POST",
            body: {
              bucket: useCookie("user-data").value.cartorio_token,
              path: props.linkLivro
            }
          }, "$7ljqltMqa0");
          pdfUrl.value = data3.value;
          return;
        }
        const filePath = await getPathFromDocument();
        const { data: data2, status } = await useFetch(baixarDocumento, {
          method: "POST",
          body: {
            bucket: useCookie("user-data").value.cartorio_token,
            path: filePath
          }
        }, "$OWxZSQkyX8");
        const fileUrl = data2.value;
        const blob = await fetchBlobFromMinIO(fileUrl);
        if (blob) {
          const reader = new FileReader();
          reader.onload = () => {
            const content = reader.result;
            const documentEditor = documentEditorContainer.value.ej2Instances.documentEditor;
            documentEditor.open(content);
          };
          reader.readAsText(blob);
        }
      } catch (error) {
        $toast.error("Erro ao carregar o documento.");
      }
    };
    loadDefaultDocument();
    const lavraAto = async (force = false) => {
      const pages = documentEditorContainer.value.ej2Instances.documentEditor.pageCount;
      if (!force) {
        const { data: data3, error: error2, status } = await useFetch(validaAto, {
          method: "POST",
          body: { ato_token: route.query.ato_token_edit }
        }, "$sMqfUUQcBM");
        let statusResp, statusMsg;
        if (status.value === "success" && data3.value) {
          statusResp = data3.value[0].status;
          statusMsg = data3.value[0].status_mensagem;
        } else if (error2.value && error2.value.data) {
          statusResp = error2.value.data[0].status;
          statusMsg = error2.value.data[0].status_mensagem;
        }
        if (statusResp !== "OK") {
          condStatus.value = statusResp;
          condStatusMensagem.value = statusMsg;
          valorAto.value = null;
          isModalCondOpen.value = true;
          condMessage.value = ` O ato apresenta inconsist\xEAncias, deseja prosseguir?`;
          return;
        }
      }
      const {
        data: data2,
        status: statusLavrar,
        error
      } = await useFetch(lavraAtoLivro, {
        method: "POST",
        body: {
          ato_token: route.query.ato_token_edit,
          qtd_paginas: pages,
          escrevente_token: state.escrevente,
          usuario_token,
          cartorio_token
        }
      }, "$OVwiKSwcOE");
      if (statusLavrar.value === "success") {
        lavraData.value = data2.value;
        selo.value = data2.value[0].selo;
        $toast.success("Ato lavrado com sucesso!");
      } else {
        $toast.error(
          error.value.data[0].status_mensagem || "Falha ao lavrar o ato."
        );
      }
    };
    const restartProcess = () => {
      isModalCondOpen.value = false;
      condStatus.value = null;
      condStatusMensagem.value = "";
      valorAto.value = {};
    };
    const calcularAto = async () => {
      const pages = documentEditorContainer.value.ej2Instances.documentEditor.pageCount;
      const { data: data2, status } = await useFetch(calculaAto, {
        method: "POST",
        body: {
          ato_token: route.query.ato_token_edit,
          cartorio_token,
          quantidade: 1,
          usuario_token,
          escrevente_token: state.escrevente,
          qtd_paginas: pages
        }
      }, "$iv1N3XD6We");
      if (status.value === "success") {
        valorAto.value = data2.value[0];
      } else {
        $toast.error("Falha ao calcular o ato.");
      }
    };
    const confirmLavrar = async () => {
      isModalCondOpen.value = false;
      if (condStatus.value && condStatus.value !== "OK") {
        await lavraAto(true);
        condStatus.value = null;
        condStatusMensagem.value = "";
      } else {
        await lavraAto();
      }
    };
    const openModalCond = async () => {
      isModalCondOpen.value = true;
      condMessage.value = "Ao lavrar esse ato, a opera\xE7\xE3o n\xE3o poder\xE1 ser desfeita. Confirma ?";
      await calcularAto();
    };
    const { data } = ([__temp, __restore] = withAsyncContext(() => useFetch(allEscreventes, {
      method: "POST",
      body: { cartorio_token }
    }, "$Kj765fCvMC")), __temp = await __temp, __restore(), __temp);
    escreventesItems.value = data.value[0].func_json_escreventes;
    const goBack = () => {
      const origem = route.query.origem || "criar";
      const id = route.query.id;
      switch (origem) {
        case "atualizar":
        case "vizualizar":
          router.push(`/os/atualizar/${id}`);
          break;
        case "atualizar-lista":
        case "vizualizar-lista":
          router.push("/atos/lista");
          break;
        default:
          router.push("/os/criar-registro");
          break;
      }
    };
    watch(
      () => props.document,
      () => {
        loadDefaultDocument();
      }
    );
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ModalConfirmacao = __nuxt_component_1;
      _push(`<!--[-->`);
      _push(ssrRenderComponent(VRow, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VCol, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (props.linkLivro) {
                    _push3(`<div${_scopeId2}><iframe${ssrRenderAttr("src", unref(pdfUrl))} type="application/pdf" width="100%" height="850px"${_scopeId2}></iframe></div>`);
                  } else {
                    _push3(`<div${_scopeId2}>`);
                    _push3(ssrRenderComponent(unref(DocumentEditorContainerComponent), {
                      restrictEditing: true,
                      enableToolbar: false,
                      ref_key: "documentEditorContainer",
                      ref: documentEditorContainer,
                      height: "850px",
                      width: "850px"
                    }, null, _parent3, _scopeId2));
                    _push3(`</div>`);
                  }
                } else {
                  return [
                    props.linkLivro ? (openBlock(), createBlock("div", { key: 0 }, [
                      createVNode("iframe", {
                        src: unref(pdfUrl),
                        type: "application/pdf",
                        width: "100%",
                        height: "850px"
                      }, null, 8, ["src"])
                    ])) : (openBlock(), createBlock("div", { key: 1 }, [
                      createVNode(unref(DocumentEditorContainerComponent), {
                        restrictEditing: true,
                        enableToolbar: false,
                        ref_key: "documentEditorContainer",
                        ref: documentEditorContainer,
                        height: "850px",
                        width: "850px"
                      }, null, 512)
                    ]))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            if (!unref(isVisualizar)) {
              _push2(ssrRenderComponent(VCol, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(VAutocomplete, {
                      class: "mt-15",
                      label: "Tabeli\xE3o/escrevente",
                      modelValue: unref(state).escrevente,
                      "onUpdate:modelValue": ($event) => unref(state).escrevente = $event,
                      items: unref(escreventesItems),
                      "item-title": "nome",
                      "item-value": "token",
                      required: ""
                    }, null, _parent3, _scopeId2));
                    _push3(`<img style="${ssrRenderStyle({ "height": "80px", "width": "80px", "cursor": "pointer", "margin-top": "40px" })}"${ssrRenderAttr("src", _imports_0$1)}${_scopeId2}>`);
                    if (unref(lavraData)) {
                      _push3(ssrRenderComponent(VCard, { width: "360" }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          var _a;
                          if (_push4) {
                            _push4(ssrRenderComponent(VRow, null, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(ssrRenderComponent(VCol, null, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(ssrRenderComponent(VSheet, {
                                          style: { "font-weight": "bold" },
                                          class: "pa-2 ma-2"
                                        }, {
                                          default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                            if (_push7) {
                                              _push7(ssrRenderComponent(VCol, null, {
                                                default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                  if (_push8) {
                                                    _push8(` Livro: ${ssrInterpolate(unref(lavraData)[0].livro_numero)}`);
                                                  } else {
                                                    return [
                                                      createTextVNode(" Livro: " + toDisplayString(unref(lavraData)[0].livro_numero), 1)
                                                    ];
                                                  }
                                                }),
                                                _: 1
                                              }, _parent7, _scopeId6));
                                              _push7(ssrRenderComponent(VCol, null, {
                                                default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                  if (_push8) {
                                                    _push8(` Protocolo: ${ssrInterpolate(unref(lavraData)[0].protocolo ? unref(lavraData)[0].protocolo : null)}`);
                                                  } else {
                                                    return [
                                                      createTextVNode(" Protocolo: " + toDisplayString(unref(lavraData)[0].protocolo ? unref(lavraData)[0].protocolo : null), 1)
                                                    ];
                                                  }
                                                }),
                                                _: 1
                                              }, _parent7, _scopeId6));
                                            } else {
                                              return [
                                                createVNode(VCol, null, {
                                                  default: withCtx(() => [
                                                    createTextVNode(" Livro: " + toDisplayString(unref(lavraData)[0].livro_numero), 1)
                                                  ]),
                                                  _: 1
                                                }),
                                                createVNode(VCol, null, {
                                                  default: withCtx(() => [
                                                    createTextVNode(" Protocolo: " + toDisplayString(unref(lavraData)[0].protocolo ? unref(lavraData)[0].protocolo : null), 1)
                                                  ]),
                                                  _: 1
                                                })
                                              ];
                                            }
                                          }),
                                          _: 1
                                        }, _parent6, _scopeId5));
                                      } else {
                                        return [
                                          createVNode(VSheet, {
                                            style: { "font-weight": "bold" },
                                            class: "pa-2 ma-2"
                                          }, {
                                            default: withCtx(() => [
                                              createVNode(VCol, null, {
                                                default: withCtx(() => [
                                                  createTextVNode(" Livro: " + toDisplayString(unref(lavraData)[0].livro_numero), 1)
                                                ]),
                                                _: 1
                                              }),
                                              createVNode(VCol, null, {
                                                default: withCtx(() => [
                                                  createTextVNode(" Protocolo: " + toDisplayString(unref(lavraData)[0].protocolo ? unref(lavraData)[0].protocolo : null), 1)
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
                                  }, _parent5, _scopeId4));
                                  _push5(ssrRenderComponent(VCol, null, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(ssrRenderComponent(VSheet, {
                                          style: { "font-weight": "bold" },
                                          class: "pa-2 ma-2 mt-3"
                                        }, {
                                          default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                            if (_push7) {
                                              _push7(` Folhas : ${ssrInterpolate(unref(lavraData)[0].pagina_inicial)} A ${ssrInterpolate(unref(lavraData)[0].pagina_final)}`);
                                            } else {
                                              return [
                                                createTextVNode(" Folhas : " + toDisplayString(unref(lavraData)[0].pagina_inicial) + " A " + toDisplayString(unref(lavraData)[0].pagina_final), 1)
                                              ];
                                            }
                                          }),
                                          _: 1
                                        }, _parent6, _scopeId5));
                                      } else {
                                        return [
                                          createVNode(VSheet, {
                                            style: { "font-weight": "bold" },
                                            class: "pa-2 ma-2 mt-3"
                                          }, {
                                            default: withCtx(() => [
                                              createTextVNode(" Folhas : " + toDisplayString(unref(lavraData)[0].pagina_inicial) + " A " + toDisplayString(unref(lavraData)[0].pagina_final), 1)
                                            ]),
                                            _: 1
                                          })
                                        ];
                                      }
                                    }),
                                    _: 1
                                  }, _parent5, _scopeId4));
                                } else {
                                  return [
                                    createVNode(VCol, null, {
                                      default: withCtx(() => [
                                        createVNode(VSheet, {
                                          style: { "font-weight": "bold" },
                                          class: "pa-2 ma-2"
                                        }, {
                                          default: withCtx(() => [
                                            createVNode(VCol, null, {
                                              default: withCtx(() => [
                                                createTextVNode(" Livro: " + toDisplayString(unref(lavraData)[0].livro_numero), 1)
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(VCol, null, {
                                              default: withCtx(() => [
                                                createTextVNode(" Protocolo: " + toDisplayString(unref(lavraData)[0].protocolo ? unref(lavraData)[0].protocolo : null), 1)
                                              ]),
                                              _: 1
                                            })
                                          ]),
                                          _: 1
                                        })
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(VCol, null, {
                                      default: withCtx(() => [
                                        createVNode(VSheet, {
                                          style: { "font-weight": "bold" },
                                          class: "pa-2 ma-2 mt-3"
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode(" Folhas : " + toDisplayString(unref(lavraData)[0].pagina_inicial) + " A " + toDisplayString(unref(lavraData)[0].pagina_final), 1)
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
                            }, _parent4, _scopeId3));
                            _push4(`<div style="${ssrRenderStyle({ "margin-left": "10px", "padding-bottom": "20px", "margin-top": "-10px" })}"${_scopeId3}>${(_a = unref(selo)) != null ? _a : ""}</div>`);
                          } else {
                            return [
                              createVNode(VRow, null, {
                                default: withCtx(() => [
                                  createVNode(VCol, null, {
                                    default: withCtx(() => [
                                      createVNode(VSheet, {
                                        style: { "font-weight": "bold" },
                                        class: "pa-2 ma-2"
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(VCol, null, {
                                            default: withCtx(() => [
                                              createTextVNode(" Livro: " + toDisplayString(unref(lavraData)[0].livro_numero), 1)
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(VCol, null, {
                                            default: withCtx(() => [
                                              createTextVNode(" Protocolo: " + toDisplayString(unref(lavraData)[0].protocolo ? unref(lavraData)[0].protocolo : null), 1)
                                            ]),
                                            _: 1
                                          })
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(VCol, null, {
                                    default: withCtx(() => [
                                      createVNode(VSheet, {
                                        style: { "font-weight": "bold" },
                                        class: "pa-2 ma-2 mt-3"
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode(" Folhas : " + toDisplayString(unref(lavraData)[0].pagina_inicial) + " A " + toDisplayString(unref(lavraData)[0].pagina_final), 1)
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }),
                              createVNode("div", {
                                style: { "margin-left": "10px", "padding-bottom": "20px", "margin-top": "-10px" },
                                innerHTML: unref(selo)
                              }, null, 8, ["innerHTML"])
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
                      createVNode(VAutocomplete, {
                        class: "mt-15",
                        label: "Tabeli\xE3o/escrevente",
                        modelValue: unref(state).escrevente,
                        "onUpdate:modelValue": ($event) => unref(state).escrevente = $event,
                        items: unref(escreventesItems),
                        "item-title": "nome",
                        "item-value": "token",
                        required: ""
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "items"]),
                      createVNode("img", {
                        onClick: ($event) => openModalCond(),
                        style: { "height": "80px", "width": "80px", "cursor": "pointer", "margin-top": "40px" },
                        src: _imports_0$1
                      }, null, 8, ["onClick"]),
                      unref(lavraData) ? (openBlock(), createBlock(VCard, {
                        key: 0,
                        width: "360"
                      }, {
                        default: withCtx(() => [
                          createVNode(VRow, null, {
                            default: withCtx(() => [
                              createVNode(VCol, null, {
                                default: withCtx(() => [
                                  createVNode(VSheet, {
                                    style: { "font-weight": "bold" },
                                    class: "pa-2 ma-2"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(VCol, null, {
                                        default: withCtx(() => [
                                          createTextVNode(" Livro: " + toDisplayString(unref(lavraData)[0].livro_numero), 1)
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(VCol, null, {
                                        default: withCtx(() => [
                                          createTextVNode(" Protocolo: " + toDisplayString(unref(lavraData)[0].protocolo ? unref(lavraData)[0].protocolo : null), 1)
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }),
                              createVNode(VCol, null, {
                                default: withCtx(() => [
                                  createVNode(VSheet, {
                                    style: { "font-weight": "bold" },
                                    class: "pa-2 ma-2 mt-3"
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(" Folhas : " + toDisplayString(unref(lavraData)[0].pagina_inicial) + " A " + toDisplayString(unref(lavraData)[0].pagina_final), 1)
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode("div", {
                            style: { "margin-left": "10px", "padding-bottom": "20px", "margin-top": "-10px" },
                            innerHTML: unref(selo)
                          }, null, 8, ["innerHTML"])
                        ]),
                        _: 1
                      })) : createCommentVNode("", true)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode(VCol, null, {
                default: withCtx(() => [
                  props.linkLivro ? (openBlock(), createBlock("div", { key: 0 }, [
                    createVNode("iframe", {
                      src: unref(pdfUrl),
                      type: "application/pdf",
                      width: "100%",
                      height: "850px"
                    }, null, 8, ["src"])
                  ])) : (openBlock(), createBlock("div", { key: 1 }, [
                    createVNode(unref(DocumentEditorContainerComponent), {
                      restrictEditing: true,
                      enableToolbar: false,
                      ref_key: "documentEditorContainer",
                      ref: documentEditorContainer,
                      height: "850px",
                      width: "850px"
                    }, null, 512)
                  ]))
                ]),
                _: 1
              }),
              !unref(isVisualizar) ? (openBlock(), createBlock(VCol, { key: 0 }, {
                default: withCtx(() => [
                  createVNode(VAutocomplete, {
                    class: "mt-15",
                    label: "Tabeli\xE3o/escrevente",
                    modelValue: unref(state).escrevente,
                    "onUpdate:modelValue": ($event) => unref(state).escrevente = $event,
                    items: unref(escreventesItems),
                    "item-title": "nome",
                    "item-value": "token",
                    required: ""
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "items"]),
                  createVNode("img", {
                    onClick: ($event) => openModalCond(),
                    style: { "height": "80px", "width": "80px", "cursor": "pointer", "margin-top": "40px" },
                    src: _imports_0$1
                  }, null, 8, ["onClick"]),
                  unref(lavraData) ? (openBlock(), createBlock(VCard, {
                    key: 0,
                    width: "360"
                  }, {
                    default: withCtx(() => [
                      createVNode(VRow, null, {
                        default: withCtx(() => [
                          createVNode(VCol, null, {
                            default: withCtx(() => [
                              createVNode(VSheet, {
                                style: { "font-weight": "bold" },
                                class: "pa-2 ma-2"
                              }, {
                                default: withCtx(() => [
                                  createVNode(VCol, null, {
                                    default: withCtx(() => [
                                      createTextVNode(" Livro: " + toDisplayString(unref(lavraData)[0].livro_numero), 1)
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(VCol, null, {
                                    default: withCtx(() => [
                                      createTextVNode(" Protocolo: " + toDisplayString(unref(lavraData)[0].protocolo ? unref(lavraData)[0].protocolo : null), 1)
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(VCol, null, {
                            default: withCtx(() => [
                              createVNode(VSheet, {
                                style: { "font-weight": "bold" },
                                class: "pa-2 ma-2 mt-3"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(" Folhas : " + toDisplayString(unref(lavraData)[0].pagina_inicial) + " A " + toDisplayString(unref(lavraData)[0].pagina_final), 1)
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode("div", {
                        style: { "margin-left": "10px", "padding-bottom": "20px", "margin-top": "-10px" },
                        innerHTML: unref(selo)
                      }, null, 8, ["innerHTML"])
                    ]),
                    _: 1
                  })) : createCommentVNode("", true)
                ]),
                _: 1
              })) : createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(VBtn, {
        class: "mt-5 ml-7 mb-5",
        color: "red",
        size: "large",
        onClick: goBack
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Voltar`);
          } else {
            return [
              createTextVNode("Voltar")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_ModalConfirmacao, {
        show: unref(isModalCondOpen),
        condMessage: unref(condMessage),
        description: unref(condStatusMensagem),
        valor: unref(valorAto),
        onClose: restartProcess,
        onConfirm: confirmLavrar
      }, null, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Procuracao/atualizar/Livro.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : undefined;
};
const _sfc_main$1 = {
  __name: "Observacao",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const router = useRouter$1();
    const route = useRoute$1();
    const config = useRuntimeConfig();
    const allEscreventes = `${config.public.managemant}/listarEscrevente`;
    const observacaoUpdate = `${config.public.managemant}/atos_observacao`;
    const getAtosObservacao = `${config.public.managemant}/atos_observacao`;
    const cartorio_token = ref(useCookie("user-data").value.cartorio_token);
    const isVisualizar = ref(route.query.origem === "vizualizar");
    const isModalObservacaoOpen = ref(false);
    const isVisualizarModal = ref(false);
    const modalObservacaoText = ref("");
    const observacoesItems = ref([]);
    const escreventesItems = ref([]);
    function openModalVisualizar(item) {
      modalObservacaoText.value = item.observacao;
      isVisualizarModal.value = true;
      isModalObservacaoOpen.value = true;
    }
    const openModalCreateObservacao = () => {
      isVisualizarModal.value = false;
      isModalObservacaoOpen.value = true;
      modalObservacaoText.value = "";
    };
    const headers = [
      { title: "Data", align: "start", key: "created" },
      { title: "Escrevente", align: "start", key: "users.nome" },
      { title: "Observa\xE7\xE3o", align: "start", key: "observacao" },
      { value: "actions" }
    ];
    const refetchObservacoes = async () => {
      isModalObservacaoOpen.value = false;
      await fetchObservacoes();
    };
    async function fetchObservacoes() {
      const { data: data2 } = await useFetch(
        `${getAtosObservacao}/${route.query.ato_id}`,
        {
          method: "GET"
        },
        "$HyzoO40swN"
      );
      if (Array.isArray(data2.value)) {
        observacoesItems.value = data2.value.map((item) => ({
          ...item,
          created: formatDate(item.created, "dd/mm/yyyy hh:mm")
        }));
      } else if (data2.value && typeof data2.value === "object") {
        observacoesItems.value = [
          {
            ...data2.value,
            created: formatDate(data2.value.created, "dd/mm/yyyy hh:mm")
          }
        ];
      }
    }
    [__temp, __restore] = withAsyncContext(() => fetchObservacoes()), await __temp, __restore();
    async function deleteObservacao(item) {
      item.excluido = !item.excluido;
      try {
        await useFetch(`${observacaoUpdate}/${item.id}`, {
          method: "PUT",
          body: JSON.stringify({ excluido: item.excluido })
        }, "$gnHMo4uCXD");
      } catch (error) {
        console.error("Erro ao excluir observa\xE7\xE3o:", error);
      }
    }
    const { data } = ([__temp, __restore] = withAsyncContext(() => useFetch(allEscreventes, {
      method: "POST",
      body: { cartorio_token }
    }, "$sP9AKdd3Ky")), __temp = await __temp, __restore(), __temp);
    escreventesItems.value = data.value[0].func_json_escreventes;
    const goBack = () => {
      const origem = route.query.origem || "criar";
      const id = route.query.id;
      switch (origem) {
        case "atualizar":
        case "vizualizar":
          router.push(`/os/atualizar/${id}`);
          break;
        case "atualizar-lista":
        case "vizualizar-lista":
          router.push("/atos/lista");
          break;
        default:
          router.push("/os/criar-registro");
          break;
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ModalObservacao = _sfc_main$8;
      const _component_NuxtLink = __nuxt_component_0;
      _push(ssrRenderComponent(VContainer, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (!unref(isVisualizar)) {
              _push2(ssrRenderComponent(VRow, { class: "mt-5" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    if (!unref(isVisualizar)) {
                      _push3(ssrRenderComponent(VBtn, {
                        class: "mb-4 ml-8",
                        onClick: openModalCreateObservacao,
                        size: "large",
                        color: "green"
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`Novo`);
                          } else {
                            return [
                              createTextVNode("Novo")
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
                      !unref(isVisualizar) ? (openBlock(), createBlock(VBtn, {
                        key: 0,
                        class: "mb-4 ml-8",
                        onClick: openModalCreateObservacao,
                        size: "large",
                        color: "green"
                      }, {
                        default: withCtx(() => [
                          createTextVNode("Novo")
                        ]),
                        _: 1
                      })) : createCommentVNode("", true)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(ssrRenderComponent(VRow, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VCol, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VDataTable, {
                          style: { "height": "465px" },
                          headers,
                          items: unref(observacoesItems)
                        }, {
                          "item.observacao": withCtx(({ item }, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`${ssrInterpolate(item.observacao.length > 100 ? item.observacao.slice(0, 100) + "..." : item.observacao)}`);
                            } else {
                              return [
                                createTextVNode(toDisplayString(item.observacao.length > 100 ? item.observacao.slice(0, 100) + "..." : item.observacao), 1)
                              ];
                            }
                          }),
                          "item.actions": withCtx(({ item }, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VRow, null, {
                                default: withCtx((_4, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`<div${_scopeId5}><img style="${ssrRenderStyle({ "width": "30px", "height": "30px", "cursor": "pointer" })}"${ssrRenderAttr("src", _imports_1)} alt="Visualizar"${_scopeId5}></div><div style="${ssrRenderStyle({ "display": "flex", "cursor": "pointer", "justify-content": "flex-end", "margin-left": "5px" })}" title="Deletar Observa\xE7\xE3o"${_scopeId5}>`);
                                    if (item.excluido) {
                                      _push6(`<img style="${ssrRenderStyle({ "width": "30px", "height": "30px" })}"${ssrRenderAttr("src", _imports_2$1)} alt="Visualizar" title="Reativar"${_scopeId5}>`);
                                    } else {
                                      _push6(`<img${ssrRenderAttr("src", _imports_3)} alt="Excluir" class="trash-icon" style="${ssrRenderStyle({ "width": "30px", "height": "30px" })}" title="Excluir"${_scopeId5}>`);
                                    }
                                    _push6(`</div>`);
                                  } else {
                                    return [
                                      createVNode("div", {
                                        onClick: ($event) => openModalVisualizar(item)
                                      }, [
                                        createVNode("img", {
                                          style: { "width": "30px", "height": "30px", "cursor": "pointer" },
                                          src: _imports_1,
                                          alt: "Visualizar"
                                        })
                                      ], 8, ["onClick"]),
                                      createVNode("div", {
                                        style: { "display": "flex", "cursor": "pointer", "justify-content": "flex-end", "margin-left": "5px" },
                                        onClick: ($event) => deleteObservacao(item),
                                        title: "Deletar Observa\xE7\xE3o"
                                      }, [
                                        item.excluido ? (openBlock(), createBlock("img", {
                                          key: 0,
                                          style: { "width": "30px", "height": "30px" },
                                          src: _imports_2$1,
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
                                      onClick: ($event) => openModalVisualizar(item)
                                    }, [
                                      createVNode("img", {
                                        style: { "width": "30px", "height": "30px", "cursor": "pointer" },
                                        src: _imports_1,
                                        alt: "Visualizar"
                                      })
                                    ], 8, ["onClick"]),
                                    createVNode("div", {
                                      style: { "display": "flex", "cursor": "pointer", "justify-content": "flex-end", "margin-left": "5px" },
                                      onClick: ($event) => deleteObservacao(item),
                                      title: "Deletar Observa\xE7\xE3o"
                                    }, [
                                      item.excluido ? (openBlock(), createBlock("img", {
                                        key: 0,
                                        style: { "width": "30px", "height": "30px" },
                                        src: _imports_2$1,
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
                            style: { "height": "465px" },
                            headers,
                            items: unref(observacoesItems)
                          }, {
                            "item.observacao": withCtx(({ item }) => [
                              createTextVNode(toDisplayString(item.observacao.length > 100 ? item.observacao.slice(0, 100) + "..." : item.observacao), 1)
                            ]),
                            "item.actions": withCtx(({ item }) => [
                              createVNode(VRow, null, {
                                default: withCtx(() => [
                                  createVNode("div", {
                                    onClick: ($event) => openModalVisualizar(item)
                                  }, [
                                    createVNode("img", {
                                      style: { "width": "30px", "height": "30px", "cursor": "pointer" },
                                      src: _imports_1,
                                      alt: "Visualizar"
                                    })
                                  ], 8, ["onClick"]),
                                  createVNode("div", {
                                    style: { "display": "flex", "cursor": "pointer", "justify-content": "flex-end", "margin-left": "5px" },
                                    onClick: ($event) => deleteObservacao(item),
                                    title: "Deletar Observa\xE7\xE3o"
                                  }, [
                                    item.excluido ? (openBlock(), createBlock("img", {
                                      key: 0,
                                      style: { "width": "30px", "height": "30px" },
                                      src: _imports_2$1,
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
                          style: { "height": "465px" },
                          headers,
                          items: unref(observacoesItems)
                        }, {
                          "item.observacao": withCtx(({ item }) => [
                            createTextVNode(toDisplayString(item.observacao.length > 100 ? item.observacao.slice(0, 100) + "..." : item.observacao), 1)
                          ]),
                          "item.actions": withCtx(({ item }) => [
                            createVNode(VRow, null, {
                              default: withCtx(() => [
                                createVNode("div", {
                                  onClick: ($event) => openModalVisualizar(item)
                                }, [
                                  createVNode("img", {
                                    style: { "width": "30px", "height": "30px", "cursor": "pointer" },
                                    src: _imports_1,
                                    alt: "Visualizar"
                                  })
                                ], 8, ["onClick"]),
                                createVNode("div", {
                                  style: { "display": "flex", "cursor": "pointer", "justify-content": "flex-end", "margin-left": "5px" },
                                  onClick: ($event) => deleteObservacao(item),
                                  title: "Deletar Observa\xE7\xE3o"
                                }, [
                                  item.excluido ? (openBlock(), createBlock("img", {
                                    key: 0,
                                    style: { "width": "30px", "height": "30px" },
                                    src: _imports_2$1,
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
            if (unref(isModalObservacaoOpen)) {
              _push2(ssrRenderComponent(_component_ModalObservacao, {
                show: unref(isModalObservacaoOpen),
                observacao: unref(modalObservacaoText),
                visualizar: unref(isVisualizarModal),
                onClose: refetchObservacoes
              }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(ssrRenderComponent(VRow, null, {
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
              !unref(isVisualizar) ? (openBlock(), createBlock(VRow, {
                key: 0,
                class: "mt-5"
              }, {
                default: withCtx(() => [
                  !unref(isVisualizar) ? (openBlock(), createBlock(VBtn, {
                    key: 0,
                    class: "mb-4 ml-8",
                    onClick: openModalCreateObservacao,
                    size: "large",
                    color: "green"
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Novo")
                    ]),
                    _: 1
                  })) : createCommentVNode("", true)
                ]),
                _: 1
              })) : createCommentVNode("", true),
              createVNode(VRow, null, {
                default: withCtx(() => [
                  createVNode(VCol, null, {
                    default: withCtx(() => [
                      createVNode(VDataTable, {
                        style: { "height": "465px" },
                        headers,
                        items: unref(observacoesItems)
                      }, {
                        "item.observacao": withCtx(({ item }) => [
                          createTextVNode(toDisplayString(item.observacao.length > 100 ? item.observacao.slice(0, 100) + "..." : item.observacao), 1)
                        ]),
                        "item.actions": withCtx(({ item }) => [
                          createVNode(VRow, null, {
                            default: withCtx(() => [
                              createVNode("div", {
                                onClick: ($event) => openModalVisualizar(item)
                              }, [
                                createVNode("img", {
                                  style: { "width": "30px", "height": "30px", "cursor": "pointer" },
                                  src: _imports_1,
                                  alt: "Visualizar"
                                })
                              ], 8, ["onClick"]),
                              createVNode("div", {
                                style: { "display": "flex", "cursor": "pointer", "justify-content": "flex-end", "margin-left": "5px" },
                                onClick: ($event) => deleteObservacao(item),
                                title: "Deletar Observa\xE7\xE3o"
                              }, [
                                item.excluido ? (openBlock(), createBlock("img", {
                                  key: 0,
                                  style: { "width": "30px", "height": "30px" },
                                  src: _imports_2$1,
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
              unref(isModalObservacaoOpen) ? (openBlock(), createBlock(_component_ModalObservacao, {
                key: 1,
                show: unref(isModalObservacaoOpen),
                observacao: unref(modalObservacaoText),
                visualizar: unref(isVisualizarModal),
                onClose: refetchObservacoes
              }, null, 8, ["show", "observacao", "visualizar"])) : createCommentVNode("", true),
              createVNode(VRow, null, {
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
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Procuracao/atualizar/Observacao.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : undefined;
};
const _sfc_main = {
  __name: "Anexos",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const config = useRuntimeConfig();
    const { $toast } = useNuxtApp();
    const router = useRouter$1();
    const route = useRoute$1();
    const isVisualizar = ref(route.query.origem === "vizualizar");
    const acionarScanner = `${config.public.biometria}/run-scanner`;
    const criarAtoAnexo = `${config.public.managemant}/atos_anexos`;
    const atualizarAtoAnexo = `${config.public.managemant}/atos_anexos`;
    const downloadAnexo = `${config.public.managemant}/download`;
    const getAnexos = `${config.public.managemant}/atos_anexos`;
    const upload = `${config.public.managemant}/upload`;
    const isModalAnexoOpen = ref(false);
    const status_arquivo = ref(null);
    const anexos = ref([]);
    useCookie("pessoa_token");
    const state = reactive({
      descricao: "",
      fileEvent: null
    });
    const rules = {
      descricao: {
        required: helpers.withMessage("O campo \xE9 obrigat\xF3rio", required)
      }
    };
    const v$ = useVuelidate(rules, state, { $autoDirty: true });
    const headers = [
      {
        title: "Documento",
        key: "descricao"
      },
      { text: "A\xE7\xF5es", value: "actions" }
    ];
    const { data } = ([__temp, __restore] = withAsyncContext(() => useFetch(`${getAnexos}/${route.query.ato_id}`, {
      method: "GET"
    }, "$AOZpbz65MA")), __temp = await __temp, __restore(), __temp);
    anexos.value = data.value;
    async function handleScannerClick() {
      try {
        await openScanner();
        await enviarArquivo();
      } catch (error) {
        console.error("Erro ao executar scanner ou listar arquivos:", error);
      }
    }
    async function openScanner() {
      try {
        const { data: data2 } = await useFetch(acionarScanner, { method: "GET" }, "$KttjFhHivJ");
      } catch (error) {
        $toast.error("Erro ao acionar o scanner:", error);
      }
    }
    async function enviarArquivo() {
      try {
        const { data: data2, status } = await useFetch(
          "http://localhost:3500/uploadAnexo",
          {
            method: "POST",
            body: {
              tipo: "ato_translado",
              token: route.query.ato_token_edit,
              cartorio_token: useCookie("user-data").value.cartorio_token
            }
          },
          "$TqQrsgxUkd"
        );
      } catch (error) {
        console.error("Erro ao enviar o arquivo:", error);
      }
    }
    async function openFolderFromPc() {
      try {
        const input = (void 0).createElement("input");
        input.type = "file";
        input.accept = "*/*";
        input.onchange = async (event) => {
          state.fileEvent = event;
          const file = event.target.files[0];
          if (file) {
            status_arquivo.value = true;
          }
        };
        input.click();
      } catch (error) {
        console.error("Erro ao abrir o explorador de arquivos:", error);
      }
    }
    const redirectToAnexo = async () => {
      isModalAnexoOpen.value = true;
    };
    function validarArquivoSelecionado(file) {
      if (!file) {
        status_arquivo.value = false;
        return false;
      }
      return true;
    }
    const UploadAnexo = async (token) => {
      if (!state.fileEvent || !state.fileEvent.target.files.length) {
        $toast.error("Nenhum arquivo selecionado.");
        return;
      }
      const file = state.fileEvent.target.files[0];
      const formData = new FormData();
      formData.append("file", file);
      formData.append(
        "cartorio_token",
        useCookie("user-data").value.cartorio_token
      );
      formData.append("token", token);
      formData.append("tipo", "ato_anexo");
      try {
        const response = await useFetch(upload, {
          method: "POST",
          body: formData
        }, "$KDhIYzGKzM");
        $toast.success("Anexo registrado com sucesso!");
      } catch (error) {
        $toast.error("Erro ao enviar o arquivo.");
      }
    };
    const createAnexo = async () => {
      v$.value.$touch();
      if (v$.value.$invalid) {
        return;
      }
      if (validarArquivoSelecionado(state.fileEvent)) {
        const { data: data2, error, status } = await useFetch(criarAtoAnexo, {
          method: "POST",
          body: {
            ato_id: route.query.ato_id,
            descricao: state.descricao,
            user_id: useCookie("user-data").value.usuario_id,
            link: "sdfsdfsdf"
          }
        }, "$cdoFBGO0Ti");
        if (status.value === "success") {
          $toast.success("Anexo registrado com sucesso!");
          anexos.value.push(data2.value);
          UploadAnexo(data2.value.token);
        }
      }
    };
    async function deleteAnexo(item) {
      item.excluido = !item.excluido;
      try {
        await useFetch(`${atualizarAtoAnexo}/${item.id}`, {
          method: "PUT",
          body: JSON.stringify({ excluido: item.excluido })
        }, "$WLSrgYRoHq");
      } catch (error) {
        console.error("Erro ao excluir pessoa:", error);
      }
    }
    async function visualisarAnexo(item) {
      try {
        const data2 = await useFetch(`${downloadAnexo}`, {
          method: "POST",
          body: {
            bucket: useCookie("user-data").value.cartorio_token,
            path: item.link
          }
        }, "$NdgRjioizH");
        const response = await fetch(data2.data.value);
        const blob = await response.blob();
        const blobUrl = URL.createObjectURL(blob);
        (void 0).open(blobUrl, "_blank");
      } catch (error) {
        console.error("Erro ao excluir pessoa:", error);
      }
    }
    const goBack = () => {
      const origem = route.query.origem || "criar";
      const id = route.query.id;
      switch (origem) {
        case "atualizar":
        case "vizualizar":
          router.push(`/os/atualizar/${id}`);
          break;
        case "atualizar-lista":
        case "vizualizar-lista":
          router.push("/atos/lista");
          break;
        default:
          router.push("/os/criar-registro");
          break;
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(ssrRenderComponent(VContainer, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VRow, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VCol, {
                    cols: "5",
                    class: "mt-2"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        if (!unref(isVisualizar)) {
                          _push4(ssrRenderComponent(VTextField, {
                            modelValue: unref(state).descricao,
                            "onUpdate:modelValue": [($event) => unref(state).descricao = $event, unref(v$).descricao.$touch],
                            "error-messages": unref(v$).descricao.$errors.map((e) => e.$message),
                            onBlur: unref(v$).descricao.$touch,
                            required: "",
                            label: "Descri\xE7\xE3o"
                          }, null, _parent4, _scopeId3));
                        } else {
                          _push4(`<!---->`);
                        }
                      } else {
                        return [
                          !unref(isVisualizar) ? (openBlock(), createBlock(VTextField, {
                            key: 0,
                            modelValue: unref(state).descricao,
                            "onUpdate:modelValue": [($event) => unref(state).descricao = $event, unref(v$).descricao.$touch],
                            "error-messages": unref(v$).descricao.$errors.map((e) => e.$message),
                            onBlur: unref(v$).descricao.$touch,
                            required: "",
                            label: "Descri\xE7\xE3o"
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages", "onBlur"])) : createCommentVNode("", true)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  if (!unref(isVisualizar)) {
                    _push3(`<div title="Escanear"${_scopeId2}><img class="mt-3" style="${ssrRenderStyle({ "width": "40px", "height": "40px", "cursor": "pointer" })}"${ssrRenderAttr("src", _imports_2$2)} alt="Escanear"${_scopeId2}></div>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  if (!unref(isVisualizar)) {
                    _push3(`<div title="Criar"${_scopeId2}>`);
                    if (unref(status_arquivo) === false) {
                      _push3(`<img class="mt-3 ml-2" style="${ssrRenderStyle({ "width": "40px", "height": "40px", "cursor": "pointer" })}"${ssrRenderAttr("src", _imports_0$3)} alt="Criar"${_scopeId2}>`);
                    } else if (unref(status_arquivo) === true) {
                      _push3(`<img class="mt-3 ml-2" style="${ssrRenderStyle({ "width": "40px", "height": "40px", "cursor": "pointer" })}"${ssrRenderAttr("src", _imports_1$2)} alt="Criar"${_scopeId2}>`);
                    } else {
                      _push3(`<img class="mt-3 ml-2" style="${ssrRenderStyle({ "width": "40px", "height": "40px", "cursor": "pointer" })}"${ssrRenderAttr("src", _imports_0$2)} alt="Criar"${_scopeId2}>`);
                    }
                    _push3(`</div>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  if (!unref(isVisualizar)) {
                    _push3(`<div title="Criar"${_scopeId2}><img class="mt-3 ml-2" style="${ssrRenderStyle({ "width": "40px", "height": "40px", "cursor": "pointer" })}"${ssrRenderAttr("src", _imports_0)} alt="Criar"${_scopeId2}></div>`);
                  } else {
                    _push3(`<!---->`);
                  }
                } else {
                  return [
                    createVNode(VCol, {
                      cols: "5",
                      class: "mt-2"
                    }, {
                      default: withCtx(() => [
                        !unref(isVisualizar) ? (openBlock(), createBlock(VTextField, {
                          key: 0,
                          modelValue: unref(state).descricao,
                          "onUpdate:modelValue": [($event) => unref(state).descricao = $event, unref(v$).descricao.$touch],
                          "error-messages": unref(v$).descricao.$errors.map((e) => e.$message),
                          onBlur: unref(v$).descricao.$touch,
                          required: "",
                          label: "Descri\xE7\xE3o"
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages", "onBlur"])) : createCommentVNode("", true)
                      ]),
                      _: 1
                    }),
                    !unref(isVisualizar) ? (openBlock(), createBlock("div", {
                      key: 0,
                      onClick: handleScannerClick,
                      title: "Escanear"
                    }, [
                      createVNode("img", {
                        class: "mt-3",
                        style: { "width": "40px", "height": "40px", "cursor": "pointer" },
                        src: _imports_2$2,
                        alt: "Escanear"
                      })
                    ])) : createCommentVNode("", true),
                    !unref(isVisualizar) ? (openBlock(), createBlock("div", {
                      key: 1,
                      onClick: openFolderFromPc,
                      title: "Criar"
                    }, [
                      unref(status_arquivo) === false ? (openBlock(), createBlock("img", {
                        key: 0,
                        class: "mt-3 ml-2",
                        style: { "width": "40px", "height": "40px", "cursor": "pointer" },
                        src: _imports_0$3,
                        alt: "Criar"
                      })) : unref(status_arquivo) === true ? (openBlock(), createBlock("img", {
                        key: 1,
                        class: "mt-3 ml-2",
                        style: { "width": "40px", "height": "40px", "cursor": "pointer" },
                        src: _imports_1$2,
                        alt: "Criar"
                      })) : (openBlock(), createBlock("img", {
                        key: 2,
                        class: "mt-3 ml-2",
                        style: { "width": "40px", "height": "40px", "cursor": "pointer" },
                        src: _imports_0$2,
                        alt: "Criar"
                      }))
                    ])) : createCommentVNode("", true),
                    !unref(isVisualizar) ? (openBlock(), createBlock("div", {
                      key: 2,
                      onClick: createAnexo,
                      title: "Criar"
                    }, [
                      createVNode("img", {
                        class: "mt-3 ml-2",
                        style: { "width": "40px", "height": "40px", "cursor": "pointer" },
                        src: _imports_0,
                        alt: "Criar"
                      })
                    ])) : createCommentVNode("", true)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(VDataTable, {
              headers,
              items: unref(anexos),
              style: { "height": "465px", "max-width": "600px" }
            }, {
              "item.actions": withCtx(({ item }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VRow, null, {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div style="${ssrRenderStyle({ "display": "flex", "cursor": "pointer", "justify-content": "flex-end" })}" class="mr-2" title="Visualizar Anexo"${_scopeId3}><img style="${ssrRenderStyle({ "width": "30px", "height": "30px" })}"${ssrRenderAttr("src", _imports_1)} alt="Visualizar"${_scopeId3}></div><div class="mr-2" style="${ssrRenderStyle({ "display": "flex", "cursor": "pointer", "justify-content": "flex-end" })}" title="Deletar Pessoa"${_scopeId3}>`);
                        if (item.excluido) {
                          _push4(`<img style="${ssrRenderStyle({ "width": "30px", "height": "30px" })}"${ssrRenderAttr("src", _imports_2$1)} alt="Visualizar" title="Reativar"${_scopeId3}>`);
                        } else {
                          _push4(`<img${ssrRenderAttr("src", _imports_3)} alt="Excluir" class="trash-icon" style="${ssrRenderStyle({ "width": "30px", "height": "30px" })}" title="Excluir"${_scopeId3}>`);
                        }
                        _push4(`</div>`);
                      } else {
                        return [
                          createVNode("div", {
                            style: { "display": "flex", "cursor": "pointer", "justify-content": "flex-end" },
                            class: "mr-2",
                            onClick: ($event) => redirectToAnexo(),
                            title: "Visualizar Anexo"
                          }, [
                            createVNode("img", {
                              style: { "width": "30px", "height": "30px" },
                              onClick: ($event) => visualisarAnexo(item),
                              src: _imports_1,
                              alt: "Visualizar"
                            }, null, 8, ["onClick"])
                          ], 8, ["onClick"]),
                          createVNode("div", {
                            class: "mr-2",
                            style: { "display": "flex", "cursor": "pointer", "justify-content": "flex-end" },
                            onClick: ($event) => deleteAnexo(item),
                            title: "Deletar Pessoa"
                          }, [
                            item.excluido ? (openBlock(), createBlock("img", {
                              key: 0,
                              style: { "width": "30px", "height": "30px" },
                              src: _imports_2$1,
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
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VRow, null, {
                      default: withCtx(() => [
                        createVNode("div", {
                          style: { "display": "flex", "cursor": "pointer", "justify-content": "flex-end" },
                          class: "mr-2",
                          onClick: ($event) => redirectToAnexo(),
                          title: "Visualizar Anexo"
                        }, [
                          createVNode("img", {
                            style: { "width": "30px", "height": "30px" },
                            onClick: ($event) => visualisarAnexo(item),
                            src: _imports_1,
                            alt: "Visualizar"
                          }, null, 8, ["onClick"])
                        ], 8, ["onClick"]),
                        createVNode("div", {
                          class: "mr-2",
                          style: { "display": "flex", "cursor": "pointer", "justify-content": "flex-end" },
                          onClick: ($event) => deleteAnexo(item),
                          title: "Deletar Pessoa"
                        }, [
                          item.excluido ? (openBlock(), createBlock("img", {
                            key: 0,
                            style: { "width": "30px", "height": "30px" },
                            src: _imports_2$1,
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
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_NuxtLink, { onClick: goBack }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VBtn, {
                    size: "large",
                    color: "red"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Voltar`);
                      } else {
                        return [
                          createTextVNode("Voltar")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
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
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(VRow, null, {
                default: withCtx(() => [
                  createVNode(VCol, {
                    cols: "5",
                    class: "mt-2"
                  }, {
                    default: withCtx(() => [
                      !unref(isVisualizar) ? (openBlock(), createBlock(VTextField, {
                        key: 0,
                        modelValue: unref(state).descricao,
                        "onUpdate:modelValue": [($event) => unref(state).descricao = $event, unref(v$).descricao.$touch],
                        "error-messages": unref(v$).descricao.$errors.map((e) => e.$message),
                        onBlur: unref(v$).descricao.$touch,
                        required: "",
                        label: "Descri\xE7\xE3o"
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages", "onBlur"])) : createCommentVNode("", true)
                    ]),
                    _: 1
                  }),
                  !unref(isVisualizar) ? (openBlock(), createBlock("div", {
                    key: 0,
                    onClick: handleScannerClick,
                    title: "Escanear"
                  }, [
                    createVNode("img", {
                      class: "mt-3",
                      style: { "width": "40px", "height": "40px", "cursor": "pointer" },
                      src: _imports_2$2,
                      alt: "Escanear"
                    })
                  ])) : createCommentVNode("", true),
                  !unref(isVisualizar) ? (openBlock(), createBlock("div", {
                    key: 1,
                    onClick: openFolderFromPc,
                    title: "Criar"
                  }, [
                    unref(status_arquivo) === false ? (openBlock(), createBlock("img", {
                      key: 0,
                      class: "mt-3 ml-2",
                      style: { "width": "40px", "height": "40px", "cursor": "pointer" },
                      src: _imports_0$3,
                      alt: "Criar"
                    })) : unref(status_arquivo) === true ? (openBlock(), createBlock("img", {
                      key: 1,
                      class: "mt-3 ml-2",
                      style: { "width": "40px", "height": "40px", "cursor": "pointer" },
                      src: _imports_1$2,
                      alt: "Criar"
                    })) : (openBlock(), createBlock("img", {
                      key: 2,
                      class: "mt-3 ml-2",
                      style: { "width": "40px", "height": "40px", "cursor": "pointer" },
                      src: _imports_0$2,
                      alt: "Criar"
                    }))
                  ])) : createCommentVNode("", true),
                  !unref(isVisualizar) ? (openBlock(), createBlock("div", {
                    key: 2,
                    onClick: createAnexo,
                    title: "Criar"
                  }, [
                    createVNode("img", {
                      class: "mt-3 ml-2",
                      style: { "width": "40px", "height": "40px", "cursor": "pointer" },
                      src: _imports_0,
                      alt: "Criar"
                    })
                  ])) : createCommentVNode("", true)
                ]),
                _: 1
              }),
              createVNode(VDataTable, {
                headers,
                items: unref(anexos),
                style: { "height": "465px", "max-width": "600px" }
              }, {
                "item.actions": withCtx(({ item }) => [
                  createVNode(VRow, null, {
                    default: withCtx(() => [
                      createVNode("div", {
                        style: { "display": "flex", "cursor": "pointer", "justify-content": "flex-end" },
                        class: "mr-2",
                        onClick: ($event) => redirectToAnexo(),
                        title: "Visualizar Anexo"
                      }, [
                        createVNode("img", {
                          style: { "width": "30px", "height": "30px" },
                          onClick: ($event) => visualisarAnexo(item),
                          src: _imports_1,
                          alt: "Visualizar"
                        }, null, 8, ["onClick"])
                      ], 8, ["onClick"]),
                      createVNode("div", {
                        class: "mr-2",
                        style: { "display": "flex", "cursor": "pointer", "justify-content": "flex-end" },
                        onClick: ($event) => deleteAnexo(item),
                        title: "Deletar Pessoa"
                      }, [
                        item.excluido ? (openBlock(), createBlock("img", {
                          key: 0,
                          style: { "width": "30px", "height": "30px" },
                          src: _imports_2$1,
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
              }, 8, ["items"]),
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
      }, _parent));
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Procuracao/atualizar/Anexos.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : undefined;
};

export { _sfc_main$5 as _, _sfc_main$4 as a, _sfc_main$3 as b, _sfc_main$2 as c, _sfc_main$1 as d, _sfc_main as e };
//# sourceMappingURL=Anexos-CSRXSjWY.mjs.map
