import { _ as __nuxt_component_0 } from './nuxt-link-DyZc7qn_.mjs';
import { c as useRoute$1, d as useCookie, b as useRuntimeConfig, f as useNuxtApp, u as useRouter$1, V as VTextField, e as VBtn, aL as VProgressCircular, aM as VSheet } from './server.mjs';
import { ref, withAsyncContext, withCtx, unref, createVNode, toDisplayString, isRef, createTextVNode, useSSRContext, reactive, openBlock, createBlock, provide, watch, createCommentVNode } from 'vue';
import { u as useFetch } from './fetch-bT3G74K0.mjs';
import { ssrRenderComponent, ssrRenderStyle, ssrInterpolate, ssrRenderAttr } from 'vue/server-renderer';
import { V as VContainer } from './VContainer-BOtutO2k.mjs';
import { V as VRow } from './VRow-B_iA44Vb.mjs';
import { V as VCol } from './VCol-B4e6QNL9.mjs';
import { V as VAutocomplete } from './VAutocomplete-D-WLtvKq.mjs';
import { V as VTabs, a as VTab, b as VTabsWindow, c as VTabsWindowItem, _ as _sfc_main$7 } from './RegistroPessoas-BxKsh7nc.mjs';
import { _ as _imports_5, a as _imports_0$1, b as _imports_0$2, c as _sfc_main$2$1, d as _sfc_main$1$1, e as _sfc_main$8 } from './escanear-BNt9d3Ni.mjs';
import { _ as _imports_1 } from './visualizar-BoZ30DMV.mjs';
import { _ as _imports_0, V as VDataTable, a as _imports_1$1, b as _imports_2, c as _imports_3 } from './VDataTable-CWU4gxts.mjs';
import { V as VCard, a as VDialog } from './VDialog-BnIkuznU.mjs';
import { V as VImg } from './VAvatar-CJ4Ett-u.mjs';
import { Toolbar, WordExport, DocumentEditorContainerComponent } from '@syncfusion/ej2-vue-documenteditor';
import { registerLicense } from '@syncfusion/ej2-base';
import { _ as __unimport_formatDate } from './formatDate-BbsHL418.mjs';
import { useVuelidate } from '@vuelidate/core';
import { helpers, required } from '@vuelidate/validators';
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
import './filter-BuDLV-Lc.mjs';
import './VList-CYYVz_6B.mjs';
import './VResponsive-CDbSCp4e.mjs';

const _sfc_main$6 = {
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
    const state = reactive({
      dt_abertura: props.item_dados[0].dt_abertura || null,
      status: props.item_dados[0].status || null,
      mne: props.item_dados[0].mne || null
    });
    async function onUpdate() {
      const { data, error, status } = await useFetch(`${updateAtoProcuracao}/${route.query.ato_id}`, {
        method: "PUT",
        body: {
          status: state.status,
          mne: state.mne,
          dt_abertura: state.dt_abertura
        }
      }, "$EIT5jtTUdX");
      if (status.value === "success") {
        $toast.success("Ato Atualizado com sucesso");
      }
    }
    const goBack = () => {
      const origem = route.query.origem || "criar";
      const id = route.query.id;
      if (origem === "atualizar") {
        router.push(`/os/atualizar/${id}`);
      } else {
        router.push("/os/criar-registro");
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
                      class: "ml-10",
                      onClick: onUpdate,
                      size: "large",
                      color: "green"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Atualizar")
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
                  createVNode(VBtn, {
                    class: "ml-10",
                    onClick: onUpdate,
                    size: "large",
                    color: "green"
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Atualizar")
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
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Procuracao/atualizar/Dados.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const _sfc_main$5 = {
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
    const buscarPessoa = `${config.public.managemant}/getLinkTipo`;
    const criarAtoPessoa = `${config.public.managemant}/createAtosPessoa`;
    const pessoasUpdate = `${config.public.managemant}/updateAtosPessoa`;
    const getPartesId = `${config.public.managemant}/getAtosPessoaById`;
    const cartorio_token = ref(useCookie("user-data").value.cartorio_token);
    const pessoasItems = ref([]);
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
    const ato_token = ref("xkyaA");
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
        key: "pessoa.nome"
      },
      {
        title: "Papel",
        align: "start",
        key: "papel.descricao"
      },
      {
        title: "Representante",
        align: "start",
        key: "representante.nome"
      },
      { value: "actions" }
    ];
    const state = reactive({
      papeis: null,
      nome: null,
      pessoa: null,
      documento: null
    });
    const { data } = ([__temp, __restore] = withAsyncContext(() => useFetch(papeisApresentante, {
      method: "POST",
      body: { tipo_ato_token: "xkyaA" }
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
          ato_id: route.query.ato_id,
          pessoa_id: state.pessoa.id,
          tipo_parte_id: state.papeis,
          user_id: useCookie("user-data").value.usuario_id
        }
      }, "$18isAgOJxG");
      if (status.value === "success") {
        representante.id = data2.value.id;
        $toast.success("Pessoa Registrada com Sucesso!");
        pessoasTable.value.push(representante);
      }
    };
    const redirectToFicha = async (item) => {
      isModalFichaOpen.value = true;
      fichaRender.value = null;
      const { data: imagemBiometria } = await useFetch(`${buscarPessoa}`, {
        method: "POST",
        body: { id: item.pessoa.id, tipo: "ficha" }
      }, "$hmDzSF3F61");
      if (imagemBiometria.value && imagemBiometria.value.link) {
        fichaRender.value = `data:image/jpeg;base64,${imagemBiometria.value.link}`;
      } else {
        fichaRender.value = null;
      }
    };
    const redirectToRepresentante = (item) => {
      const pessoasFiltradas = pessoasTable.value.filter((p) => p.pessoa.id !== item.pessoa.id).map((p) => ({
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
      if (origem === "atualizar") {
        router.push(`/os/atualizar/${id}`);
      } else {
        router.push("/os/criar-registro");
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ModalRegistroPessoas = _sfc_main$7;
      const _component_ModalRepresentante = _sfc_main$2$1;
      const _component_ModalPapel = _sfc_main$1$1;
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
                  _push3(`<div${_scopeId2}><img class="mt-1"${ssrRenderAttr("src", _imports_0)} style="${ssrRenderStyle({ "width": "40px", "cursor": "pointer" })}" title="Criar Representante"${_scopeId2}></div>`);
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
                    createVNode("div", null, [
                      createVNode("img", {
                        class: "mt-1",
                        src: _imports_0,
                        style: { "width": "40px", "cursor": "pointer" },
                        title: "Criar Representante",
                        onClick: createRepresentante
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
                          style: { "height": "465px" },
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
                                    _push6(`</div><div style="${ssrRenderStyle({ "display": "flex", "cursor": "pointer", "justify-content": "flex-end" })}" class="mr-2" title="Selecionar Representante"${_scopeId5}><img style="${ssrRenderStyle({ "width": "30px", "height": "30px" })}"${ssrRenderAttr("src", _imports_5)} alt="Visualizar"${_scopeId5}></div>`);
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
                                      ], 8, ["onClick"]),
                                      createVNode("div", {
                                        style: { "display": "flex", "cursor": "pointer", "justify-content": "flex-end" },
                                        class: "mr-2",
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
                                    ], 8, ["onClick"]),
                                    createVNode("div", {
                                      style: { "display": "flex", "cursor": "pointer", "justify-content": "flex-end" },
                                      class: "mr-2",
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
                                  ], 8, ["onClick"]),
                                  createVNode("div", {
                                    style: { "display": "flex", "cursor": "pointer", "justify-content": "flex-end" },
                                    class: "mr-2",
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
                                ], 8, ["onClick"]),
                                createVNode("div", {
                                  style: { "display": "flex", "cursor": "pointer", "justify-content": "flex-end" },
                                  class: "mr-2",
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
                        _push4(ssrRenderComponent(VImg, { src: unref(fichaRender) }, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VBtn, {
                          class: "ms-auto mt-3 mb-3",
                          text: "Fechar",
                          size: "large",
                          color: "red",
                          onClick: ($event) => isModalFichaOpen.value = false
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VImg, { src: unref(fichaRender) }, null, 8, ["src"]),
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
                        createVNode(VImg, { src: unref(fichaRender) }, null, 8, ["src"]),
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
              createVNode(VRow, { class: "mt-5" }, {
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
                  createVNode("div", null, [
                    createVNode("img", {
                      class: "mt-1",
                      src: _imports_0,
                      style: { "width": "40px", "cursor": "pointer" },
                      title: "Criar Representante",
                      onClick: createRepresentante
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
                        style: { "height": "465px" },
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
                              ], 8, ["onClick"]),
                              createVNode("div", {
                                style: { "display": "flex", "cursor": "pointer", "justify-content": "flex-end" },
                                class: "mr-2",
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
                      createVNode(VImg, { src: unref(fichaRender) }, null, 8, ["src"]),
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
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Procuracao/atualizar/Partes.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const serviceUrl = "https://ej2services.syncfusion.com/production/web-services/api/documenteditor/";
const _sfc_main$4 = {
  __name: "Minuta",
  __ssrInlineRender: true,
  emits: ["page", "doc"],
  setup(__props, { emit: __emit }) {
    provide("DocumentEditorContainer", [Toolbar, WordExport]);
    const config = useRuntimeConfig();
    const { $toast } = useNuxtApp();
    const router = useRouter$1();
    const route = useRoute$1();
    const emit = __emit;
    registerLicense(`${config.public.docEditor}`);
    `${config.public.managemant}/download`;
    `${config.public.managemant}/atos/files`;
    const enviarDocumento = `${config.public.managemant}/upload`;
    const documentEditorContainer = ref(null);
    const loading = ref(false);
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
        formData.append("cartorio_token", useCookie("user-data").value.cartorio_token);
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
    const goBack = () => {
      const origem = route.query.origem || "criar";
      const id = route.query.id;
      if (origem === "atualizar") {
        router.push(`/os/atualizar/${id}`);
      } else {
        router.push("/os/criar-registro");
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
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
              createVNode(VBtn, {
                size: "large",
                color: "green",
                onClick: salvarDocumento,
                disabled: unref(loading)
              }, {
                default: withCtx(() => [
                  createTextVNode("Atualizar")
                ]),
                _: 1
              }, 8, ["disabled"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Procuracao/atualizar/Minuta.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const _sfc_main$3 = {
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
    }
  },
  setup(__props) {
    const props = __props;
    const config = useRuntimeConfig();
    registerLicense(`${config.public.docEditor}`);
    const { $toast } = useNuxtApp();
    const router = useRouter$1();
    const route = useRoute$1();
    const baixarDocumento = `${config.public.managemant}/download`;
    const pegarCaminhoDocumento = `${config.public.managemant}/atos/files`;
    const lavraAtoLivro = `${config.public.managemant}/lavrarAto`;
    const condMessage = ref(
      "Ao lavrar esse ato, a opera\xE7\xE3o n\xE3o poder\xE1 ser desfeita. Confirma ?"
    );
    const isModalCondOpen = ref(false);
    const lavraData = ref(null);
    const selo = ref(null);
    const documentEditorContainer = ref(null);
    const fetchBlobFromMinIO = async (fileUrl) => {
      try {
        const response = await fetch(fileUrl);
        if (!response.ok) {
          throw new Error("Erro ao baixar o arquivo do MinIO.");
        }
        return await response.blob();
      } catch (error) {
        console.error(error);
        $toast.error("Erro ao carregar o documento inicial.");
        return null;
      }
    };
    const getPathFromDocument = async () => {
      try {
        const { data } = await useFetch(
          `${pegarCaminhoDocumento}/${route.query.ato_token_edit}`,
          {
            method: "GET"
          },
          "$FnEbAJEARP"
        );
        return data.value.link_ato;
      } catch (error) {
        console.error("Erro ao carregar o documento:", error);
        $toast.error(error);
      }
    };
    const loadDefaultDocument = async () => {
      try {
        const filePath = await getPathFromDocument();
        const { data, status } = await useFetch(baixarDocumento, {
          method: "POST",
          body: { bucket: "qvgjz", path: filePath }
        }, "$7ljqltMqa0");
        const fileUrl = data.value;
        const blob = await fetchBlobFromMinIO(fileUrl);
        if (blob) {
          const reader = new FileReader();
          reader.onload = () => {
            const content = reader.result;
            const documentEditor = documentEditorContainer.value.ej2Instances.documentEditor;
            documentEditor.open(content);
            console.log("asdfdsf");
          };
          reader.readAsText(blob);
        }
      } catch (error) {
        $toast.error("Erro ao carregar o documento.");
      }
    };
    loadDefaultDocument();
    const lavraAto = async () => {
      try {
        const { data, status } = await useFetch(lavraAtoLivro, {
          method: "POST",
          body: { ato_token: route.query.ato_token_edit, qtd_paginas: props.pages }
        }, "$OWxZSQkyX8");
        if (status.value === "success") {
          lavraData.value = data.value;
          selo.value = data.value[0].selo;
          $toast.success("Ato lavrado com sucesso!");
        } else {
          $toast.error("Falha ao lavrar o ato.");
        }
      } catch (error) {
        $toast.error("Erro ao conectar com o servidor.");
      }
    };
    const confirmLavrar = () => {
      isModalCondOpen.value = false;
      lavraAto();
    };
    const goBack = () => {
      const origem = route.query.origem || "criar";
      const id = route.query.id;
      if (origem === "atualizar") {
        router.push(`/os/atualizar/${id}`);
      } else {
        router.push("/os/criar-registro");
      }
    };
    watch(
      () => props.document,
      (newVal, oldVal) => {
        loadDefaultDocument();
      }
    );
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ModalConfirmacao = _sfc_main$8;
      _push(`<!--[-->`);
      _push(ssrRenderComponent(VRow, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VCol, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(DocumentEditorContainerComponent), {
                    restrictEditing: true,
                    enableToolbar: false,
                    ref_key: "documentEditorContainer",
                    ref: documentEditorContainer,
                    height: "850px",
                    width: "850px"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(DocumentEditorContainerComponent), {
                      restrictEditing: true,
                      enableToolbar: false,
                      ref_key: "documentEditorContainer",
                      ref: documentEditorContainer,
                      height: "850px",
                      width: "850px"
                    }, null, 512)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(VCol, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="d-flex align-center justify-center"${_scopeId2}><div${_scopeId2}><img class="ml-15" style="${ssrRenderStyle({ "height": "40px", "width": "40px", "cursor": "pointer", "margin-top": "350px" })}"${ssrRenderAttr("src", _imports_0$1)}${_scopeId2}>`);
                  if (unref(lavraData)) {
                    _push3(ssrRenderComponent(VCard, {
                      width: "360px",
                      class: "mr-16"
                    }, {
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
                                            _push7(` Livro: ${ssrInterpolate(unref(lavraData)[0].livro_numero)}`);
                                          } else {
                                            return [
                                              createTextVNode(" Livro: " + toDisplayString(unref(lavraData)[0].livro_numero), 1)
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
                                            createTextVNode(" Livro: " + toDisplayString(unref(lavraData)[0].livro_numero), 1)
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
                                        class: "pa-2 ma-2"
                                      }, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(` Folhas : ${ssrInterpolate(unref(lavraData)[0].pagina_inicial)} \xC1 ${ssrInterpolate(unref(lavraData)[0].pagina_final)}`);
                                          } else {
                                            return [
                                              createTextVNode(" Folhas : " + toDisplayString(unref(lavraData)[0].pagina_inicial) + " \xC1 " + toDisplayString(unref(lavraData)[0].pagina_final), 1)
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
                                            createTextVNode(" Folhas : " + toDisplayString(unref(lavraData)[0].pagina_inicial) + " \xC1 " + toDisplayString(unref(lavraData)[0].pagina_final), 1)
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
                                          createTextVNode(" Livro: " + toDisplayString(unref(lavraData)[0].livro_numero), 1)
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
                                        class: "pa-2 ma-2"
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode(" Folhas : " + toDisplayString(unref(lavraData)[0].pagina_inicial) + " \xC1 " + toDisplayString(unref(lavraData)[0].pagina_final), 1)
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
                          _push4(`<div style="${ssrRenderStyle({ "border": "1px solid black", "border-radius": "8px", "padding-bottom": "20px", "margin-top": "-10px" })}" class="ml-2 mb-2 mr-2"${_scopeId3}>${(_a = unref(selo)) != null ? _a : ""}</div>`);
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
                                        createTextVNode(" Livro: " + toDisplayString(unref(lavraData)[0].livro_numero), 1)
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
                                      class: "pa-2 ma-2"
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(" Folhas : " + toDisplayString(unref(lavraData)[0].pagina_inicial) + " \xC1 " + toDisplayString(unref(lavraData)[0].pagina_final), 1)
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
                              style: { "border": "1px solid black", "border-radius": "8px", "padding-bottom": "20px", "margin-top": "-10px" },
                              class: "ml-2 mb-2 mr-2",
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
                  _push3(`</div></div>`);
                } else {
                  return [
                    createVNode("div", { class: "d-flex align-center justify-center" }, [
                      createVNode("div", null, [
                        createVNode("img", {
                          onClick: ($event) => isModalCondOpen.value = true,
                          class: "ml-15",
                          style: { "height": "40px", "width": "40px", "cursor": "pointer", "margin-top": "350px" },
                          src: _imports_0$1
                        }, null, 8, ["onClick"]),
                        unref(lavraData) ? (openBlock(), createBlock(VCard, {
                          key: 0,
                          width: "360px",
                          class: "mr-16"
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
                                        createTextVNode(" Livro: " + toDisplayString(unref(lavraData)[0].livro_numero), 1)
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
                                      class: "pa-2 ma-2"
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(" Folhas : " + toDisplayString(unref(lavraData)[0].pagina_inicial) + " \xC1 " + toDisplayString(unref(lavraData)[0].pagina_final), 1)
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
                              style: { "border": "1px solid black", "border-radius": "8px", "padding-bottom": "20px", "margin-top": "-10px" },
                              class: "ml-2 mb-2 mr-2",
                              innerHTML: unref(selo)
                            }, null, 8, ["innerHTML"])
                          ]),
                          _: 1
                        })) : createCommentVNode("", true)
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(VCol, null, {
                default: withCtx(() => [
                  createVNode(unref(DocumentEditorContainerComponent), {
                    restrictEditing: true,
                    enableToolbar: false,
                    ref_key: "documentEditorContainer",
                    ref: documentEditorContainer,
                    height: "850px",
                    width: "850px"
                  }, null, 512)
                ]),
                _: 1
              }),
              createVNode(VCol, null, {
                default: withCtx(() => [
                  createVNode("div", { class: "d-flex align-center justify-center" }, [
                    createVNode("div", null, [
                      createVNode("img", {
                        onClick: ($event) => isModalCondOpen.value = true,
                        class: "ml-15",
                        style: { "height": "40px", "width": "40px", "cursor": "pointer", "margin-top": "350px" },
                        src: _imports_0$1
                      }, null, 8, ["onClick"]),
                      unref(lavraData) ? (openBlock(), createBlock(VCard, {
                        key: 0,
                        width: "360px",
                        class: "mr-16"
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
                                      createTextVNode(" Livro: " + toDisplayString(unref(lavraData)[0].livro_numero), 1)
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
                                    class: "pa-2 ma-2"
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(" Folhas : " + toDisplayString(unref(lavraData)[0].pagina_inicial) + " \xC1 " + toDisplayString(unref(lavraData)[0].pagina_final), 1)
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
                            style: { "border": "1px solid black", "border-radius": "8px", "padding-bottom": "20px", "margin-top": "-10px" },
                            class: "ml-2 mb-2 mr-2",
                            innerHTML: unref(selo)
                          }, null, 8, ["innerHTML"])
                        ]),
                        _: 1
                      })) : createCommentVNode("", true)
                    ])
                  ])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(` ${ssrInterpolate(props.pages)} `);
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
        onClose: ($event) => isModalCondOpen.value = false,
        onConfirm: confirmLavrar
      }, null, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Procuracao/atualizar/Livro.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = {
  __name: "Observacao",
  __ssrInlineRender: true,
  props: {
    ato_id: {
      type: Number,
      required: true
    }
  },
  async setup(__props) {
    let __temp, __restore;
    const router = useRouter$1();
    const route = useRoute$1();
    const config = useRuntimeConfig();
    const { $toast } = useNuxtApp();
    const allEscreventes = `${config.public.managemant}/listarEscrevente`;
    `${config.public.managemant}/getAtosTiposByToken`;
    const createAtoObservacao = `${config.public.managemant}/createAtosObservacao`;
    const observacaoUpdate = `${config.public.managemant}/updateAtosObservacao`;
    const getAtosObservacao = `${config.public.managemant}/getAtosObservacaoById`;
    const cartorio_token = ref(useCookie("user-data").value.cartorio_token);
    const observacoesItems = ref([]);
    const escreventesItems = ref([]);
    const headers = [
      { title: "Data", align: "start", key: "created" },
      { title: "Escrevente", align: "start", key: "users.nome" },
      { title: "Observa\xE7\xE3o", align: "start", key: "observacao" },
      { value: "actions" }
    ];
    const state = reactive({
      observacao: ""
    });
    const rules = {
      observacao: {
        required: helpers.withMessage("O campo \xE9 obrigat\xF3rio", required)
      }
    };
    const v$ = useVuelidate(rules, state);
    const { data: dadosObservacao } = ([__temp, __restore] = withAsyncContext(() => useFetch(
      `${getAtosObservacao}/${route.query.ato_id}`,
      {
        method: "GET"
      },
      "$HyzoO40swN"
    )), __temp = await __temp, __restore(), __temp);
    observacoesItems.value = dadosObservacao.value.map((item) => ({
      ...item,
      created: __unimport_formatDate(item.created, "dd/mm/yyyy hh:mm")
    }));
    async function onSubmit() {
      if (state.observacao.trim() === "") {
        $toast.error("O campo de observa\xE7\xE3o est\xE1 vazio.");
        return;
      }
      if (await v$.value.$validate()) {
        const { data: data2, error, status } = await useFetch(createAtoObservacao, {
          method: "POST",
          body: {
            ato_id: route.query.ato_id,
            observacao: state.observacao,
            user_id: useCookie("user-data").value.usuario_id
          }
        }, "$gnHMo4uCXD");
        if (status.value === "success") {
          observacoesItems.value.push({
            created: __unimport_formatDate(data2.value.created, "dd/mm/yyyy hh:mm"),
            observacao: data2.value.observacao,
            id: data2.value.id,
            escrevente: useCookie("user-data").value.nome
          });
          state.observacao = "";
          $toast.success("Observa\xE7\xE3o registrada com sucesso");
        }
      } else {
        $toast.error("Preencha os campos obrigat\xF3rios.");
      }
    }
    async function deleteObservacao(item) {
      item.excluido = !item.excluido;
      try {
        await useFetch(`${observacaoUpdate}/${item.id}`, {
          method: "PUT",
          body: JSON.stringify({ excluido: item.excluido })
        }, "$sP9AKdd3Ky");
      } catch (error) {
        console.error("Erro ao excluir observa\xE7\xE3o:", error);
      }
    }
    const { data } = ([__temp, __restore] = withAsyncContext(() => useFetch(allEscreventes, {
      method: "POST",
      body: { cartorio_token }
    }, "$HL9pndqGh0")), __temp = await __temp, __restore(), __temp);
    escreventesItems.value = data.value[0].func_json_escreventes;
    const goBack = () => {
      const origem = route.query.origem || "criar";
      const id = route.query.id;
      if (origem === "atualizar") {
        router.push(`/os/atualizar/${id}`);
      } else {
        router.push("/os/criar-registro");
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
                  _push3(ssrRenderComponent(VTextField, {
                    label: "Observa\xE7\xE3o",
                    modelValue: state.observacao,
                    "onUpdate:modelValue": ($event) => state.observacao = $event,
                    required: "",
                    "error-messages": unref(v$).observacao.$errors.length > 0 ? unref(v$).observacao.$errors.map((e) => e.$message) : [],
                    onBlur: unref(v$).observacao.$touch,
                    onInput: unref(v$).observacao.$touch
                  }, null, _parent3, _scopeId2));
                  _push3(`<div${_scopeId2}><img class="btn-pointer ml-2"${ssrRenderAttr("src", _imports_0)} style="${ssrRenderStyle({ "width": "40px", "cursor": "pointer" })}" title="Criar Pessoa"${_scopeId2}></div>`);
                } else {
                  return [
                    createVNode(VTextField, {
                      label: "Observa\xE7\xE3o",
                      modelValue: state.observacao,
                      "onUpdate:modelValue": ($event) => state.observacao = $event,
                      required: "",
                      "error-messages": unref(v$).observacao.$errors.length > 0 ? unref(v$).observacao.$errors.map((e) => e.$message) : [],
                      onBlur: unref(v$).observacao.$touch,
                      onInput: unref(v$).observacao.$touch
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages", "onBlur", "onInput"]),
                    createVNode("div", null, [
                      createVNode("img", {
                        class: "btn-pointer ml-2",
                        src: _imports_0,
                        style: { "width": "40px", "cursor": "pointer" },
                        title: "Criar Pessoa",
                        onClick: onSubmit
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
                          style: { "height": "465px" },
                          headers,
                          items: observacoesItems.value
                        }, {
                          "item.actions": withCtx(({ item }, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<div style="${ssrRenderStyle({ "display": "flex", "cursor": "pointer", "justify-content": "flex-end" })}" title="Deletar Observa\xE7\xE3o"${_scopeId4}>`);
                              if (item.excluido) {
                                _push5(`<img style="${ssrRenderStyle({ "width": "30px", "height": "30px" })}"${ssrRenderAttr("src", _imports_2)} alt="Visualizar" title="Reativar"${_scopeId4}>`);
                              } else {
                                _push5(`<img${ssrRenderAttr("src", _imports_3)} alt="Excluir" class="trash-icon" style="${ssrRenderStyle({ "width": "30px", "height": "30px" })}" title="Excluir"${_scopeId4}>`);
                              }
                              _push5(`</div>`);
                            } else {
                              return [
                                createVNode("div", {
                                  style: { "display": "flex", "cursor": "pointer", "justify-content": "flex-end" },
                                  onClick: ($event) => deleteObservacao(item),
                                  title: "Deletar Observa\xE7\xE3o"
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
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VDataTable, {
                            style: { "height": "465px" },
                            headers,
                            items: observacoesItems.value
                          }, {
                            "item.actions": withCtx(({ item }) => [
                              createVNode("div", {
                                style: { "display": "flex", "cursor": "pointer", "justify-content": "flex-end" },
                                onClick: ($event) => deleteObservacao(item),
                                title: "Deletar Observa\xE7\xE3o"
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
                          items: observacoesItems.value
                        }, {
                          "item.actions": withCtx(({ item }) => [
                            createVNode("div", {
                              style: { "display": "flex", "cursor": "pointer", "justify-content": "flex-end" },
                              onClick: ($event) => deleteObservacao(item),
                              title: "Deletar Observa\xE7\xE3o"
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
              createVNode(VRow, { class: "mt-5" }, {
                default: withCtx(() => [
                  createVNode(VTextField, {
                    label: "Observa\xE7\xE3o",
                    modelValue: state.observacao,
                    "onUpdate:modelValue": ($event) => state.observacao = $event,
                    required: "",
                    "error-messages": unref(v$).observacao.$errors.length > 0 ? unref(v$).observacao.$errors.map((e) => e.$message) : [],
                    onBlur: unref(v$).observacao.$touch,
                    onInput: unref(v$).observacao.$touch
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages", "onBlur", "onInput"]),
                  createVNode("div", null, [
                    createVNode("img", {
                      class: "btn-pointer ml-2",
                      src: _imports_0,
                      style: { "width": "40px", "cursor": "pointer" },
                      title: "Criar Pessoa",
                      onClick: onSubmit
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
                        style: { "height": "465px" },
                        headers,
                        items: observacoesItems.value
                      }, {
                        "item.actions": withCtx(({ item }) => [
                          createVNode("div", {
                            style: { "display": "flex", "cursor": "pointer", "justify-content": "flex-end" },
                            onClick: ($event) => deleteObservacao(item),
                            title: "Deletar Observa\xE7\xE3o"
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
                        _: 1
                      }, 8, ["items"])
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
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
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Procuracao/atualizar/Observacao.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = {
  __name: "Anexos",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const config = useRuntimeConfig();
    const { $toast } = useNuxtApp();
    const router = useRouter$1();
    const route = useRoute$1();
    const acionarScanner = `${config.public.biometria}/run-scanner`;
    const criarAtoAnexo = `${config.public.managemant}/atos_anexos`;
    const atualizarAtoAnexo = `${config.public.managemant}/atos_anexos`;
    const getAnexos = `${config.public.managemant}/atos_anexos`;
    const isModalAnexoOpen = ref(false);
    const anexos = ref([]);
    const state = reactive({
      descricao: ""
    });
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
        const { data: data2, status } = await useFetch("http://localhost:3500/uploadAnexo", {
          method: "POST",
          body: { tipo: "ato_translado", token: route.query.ato_token_edit, cartorio_token: useCookie("user-data").value.cartorio_token }
        }, "$TqQrsgxUkd");
      } catch (error) {
        console.error("Erro ao enviar o arquivo:", error);
      }
    }
    const redirectToAnexo = async () => {
      isModalAnexoOpen.value = true;
    };
    const createAnexo = async () => {
      const { data: data2, error, status } = await useFetch(criarAtoAnexo, {
        method: "POST",
        body: {
          ato_id: route.query.ato_id,
          descricao: state.descricao,
          user_id: useCookie("user-data").value.usuario_id,
          link: "sdfsdfsdf"
        }
      }, "$KDhIYzGKzM");
      if (status.value === "success") {
        $toast.success("Anexo registrado com sucesso!");
        anexos.value.push(data2.value);
      }
    };
    async function deleteAnexo(item) {
      item.excluido = !item.excluido;
      try {
        await useFetch(`${atualizarAtoAnexo}/${item.id}`, {
          method: "PUT",
          body: JSON.stringify({ excluido: item.excluido })
        }, "$cdoFBGO0Ti");
      } catch (error) {
        console.error("Erro ao excluir pessoa:", error);
      }
    }
    const goBack = () => {
      const origem = route.query.origem || "criar";
      const id = route.query.id;
      if (origem === "atualizar") {
        router.push(`/os/atualizar/${id}`);
      } else {
        router.push("/os/criar-registro");
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
                  _push3(ssrRenderComponent(VCol, { cols: "5" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VTextField, {
                          modelValue: unref(state).descricao,
                          "onUpdate:modelValue": ($event) => unref(state).descricao = $event,
                          label: "Descri\xE7\xE3o"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VTextField, {
                            modelValue: unref(state).descricao,
                            "onUpdate:modelValue": ($event) => unref(state).descricao = $event,
                            label: "Descri\xE7\xE3o"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<div title="Escanear"${_scopeId2}><img class="mt-3" style="${ssrRenderStyle({ "width": "40px", "height": "40px", "cursor": "pointer" })}"${ssrRenderAttr("src", _imports_0$2)} alt="Escanear"${_scopeId2}></div><div title="Criar"${_scopeId2}><img class="mt-3 ml-2" style="${ssrRenderStyle({ "width": "40px", "height": "40px", "cursor": "pointer" })}"${ssrRenderAttr("src", _imports_0)} alt="Criar"${_scopeId2}></div>`);
                } else {
                  return [
                    createVNode(VCol, { cols: "5" }, {
                      default: withCtx(() => [
                        createVNode(VTextField, {
                          modelValue: unref(state).descricao,
                          "onUpdate:modelValue": ($event) => unref(state).descricao = $event,
                          label: "Descri\xE7\xE3o"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode("div", {
                      onClick: handleScannerClick,
                      title: "Escanear"
                    }, [
                      createVNode("img", {
                        class: "mt-3",
                        style: { "width": "40px", "height": "40px", "cursor": "pointer" },
                        src: _imports_0$2,
                        alt: "Escanear"
                      })
                    ]),
                    createVNode("div", {
                      onClick: createAnexo,
                      title: "Criar"
                    }, [
                      createVNode("img", {
                        class: "mt-3 ml-2",
                        style: { "width": "40px", "height": "40px", "cursor": "pointer" },
                        src: _imports_0,
                        alt: "Criar"
                      })
                    ])
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
                          _push4(`<img style="${ssrRenderStyle({ "width": "30px", "height": "30px" })}"${ssrRenderAttr("src", _imports_2)} alt="Visualizar" title="Reativar"${_scopeId3}>`);
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
                              src: _imports_1,
                              alt: "Visualizar"
                            })
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
                            src: _imports_1,
                            alt: "Visualizar"
                          })
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
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(VDialog, {
              modelValue: unref(isModalAnexoOpen),
              "onUpdate:modelValue": ($event) => isRef(isModalAnexoOpen) ? isModalAnexoOpen.value = $event : null,
              width: "600"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VCard, {
                    "max-width": "600",
                    title: "Anexo"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VBtn, {
                          class: "ms-auto mt-3 mb-3",
                          text: "Fechar",
                          size: "large",
                          color: "red",
                          onClick: ($event) => isModalAnexoOpen.value = false
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VBtn, {
                            class: "ms-auto mt-3 mb-3",
                            text: "Fechar",
                            size: "large",
                            color: "red",
                            onClick: ($event) => isModalAnexoOpen.value = false
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
                      title: "Anexo"
                    }, {
                      default: withCtx(() => [
                        createVNode(VBtn, {
                          class: "ms-auto mt-3 mb-3",
                          text: "Fechar",
                          size: "large",
                          color: "red",
                          onClick: ($event) => isModalAnexoOpen.value = false
                        }, null, 8, ["onClick"])
                      ]),
                      _: 1
                    })
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
                  createVNode(VCol, { cols: "5" }, {
                    default: withCtx(() => [
                      createVNode(VTextField, {
                        modelValue: unref(state).descricao,
                        "onUpdate:modelValue": ($event) => unref(state).descricao = $event,
                        label: "Descri\xE7\xE3o"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode("div", {
                    onClick: handleScannerClick,
                    title: "Escanear"
                  }, [
                    createVNode("img", {
                      class: "mt-3",
                      style: { "width": "40px", "height": "40px", "cursor": "pointer" },
                      src: _imports_0$2,
                      alt: "Escanear"
                    })
                  ]),
                  createVNode("div", {
                    onClick: createAnexo,
                    title: "Criar"
                  }, [
                    createVNode("img", {
                      class: "mt-3 ml-2",
                      style: { "width": "40px", "height": "40px", "cursor": "pointer" },
                      src: _imports_0,
                      alt: "Criar"
                    })
                  ])
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
                          src: _imports_1,
                          alt: "Visualizar"
                        })
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
              }, 8, ["items"]),
              createVNode(VDialog, {
                modelValue: unref(isModalAnexoOpen),
                "onUpdate:modelValue": ($event) => isRef(isModalAnexoOpen) ? isModalAnexoOpen.value = $event : null,
                width: "600"
              }, {
                default: withCtx(() => [
                  createVNode(VCard, {
                    "max-width": "600",
                    title: "Anexo"
                  }, {
                    default: withCtx(() => [
                      createVNode(VBtn, {
                        class: "ms-auto mt-3 mb-3",
                        text: "Fechar",
                        size: "large",
                        color: "red",
                        onClick: ($event) => isModalAnexoOpen.value = false
                      }, null, 8, ["onClick"])
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["modelValue", "onUpdate:modelValue"]),
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
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Procuracao/atualizar/Anexos.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "[id]",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const pages_prop = ref(null);
    const doc_prop = ref(null);
    const tab = ref(null);
    const config = useRuntimeConfig();
    const route = useRoute$1();
    const allSituacoes = `${config.public.managemant}/listarSituacoes`;
    const getAtoId = `${config.public.managemant}/getAtos`;
    const cartorio_token = ref(useCookie("user-data").value.cartorio_token);
    const body = route.query.id ? { ato_token: "xkyaA" } : { cartorio_token };
    const situacoesItems = ref([]);
    const dadosData = ref([]);
    const label = ref("PROCURA\xC7\xD5ES");
    const label2 = ref("PROCURA\xC7\xC3O");
    async function loadData() {
      try {
        const { data: tipoAtoId } = await useFetch(
          `${getAtoId}/${route.query.ato_id}`,
          {
            method: "GET"
          },
          "$j0JpHHj7PB"
        );
        dadosData.value = tipoAtoId.value;
      } catch (error) {
        console.log(error);
      }
    }
    [__temp, __restore] = withAsyncContext(() => loadData()), await __temp, __restore();
    const { data: situacaoData, status } = ([__temp, __restore] = withAsyncContext(() => useFetch(allSituacoes, {
      method: "POST",
      body
    }, "$mGbp7gAEjS")), __temp = await __temp, __restore(), __temp);
    situacoesItems.value = situacaoData.value;
    const getPages = (pages) => {
      pages_prop.value = pages;
    };
    const getDocument = (doc) => {
      doc_prop.value = doc;
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ProcuracaoAtualizarDados = _sfc_main$6;
      const _component_ProcuracaoAtualizarPartes = _sfc_main$5;
      const _component_ProcuracaoAtualizarMinuta = _sfc_main$4;
      const _component_ProcuracaoAtualizarLivro = _sfc_main$3;
      const _component_ProcuracaoAtualizarObservacao = _sfc_main$2;
      const _component_ProcuracaoAtualizarAnexos = _sfc_main$1;
      _push(`<!--[--><div class="mb-10">`);
      _push(ssrRenderComponent(VRow, { class: "mb-5 mt-5" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h1${_scopeId}>Ordem de Servi\xE7o n\xBA</h1><h1 style="${ssrRenderStyle({ "color": "red", "margin-left": "30px" })}"${_scopeId}>${ssrInterpolate(unref(route).query.numero_os)}</h1>`);
          } else {
            return [
              createVNode("h1", null, "Ordem de Servi\xE7o n\xBA"),
              createVNode("h1", { style: { "color": "red", "margin-left": "30px" } }, toDisplayString(unref(route).query.numero_os), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(VRow, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VCol, { md: "6" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VAutocomplete, {
                    class: "mr-5",
                    modelValue: unref(label),
                    "onUpdate:modelValue": ($event) => isRef(label) ? label.value = $event : null,
                    disabled: ""
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VAutocomplete, {
                      class: "mr-5",
                      modelValue: unref(label),
                      "onUpdate:modelValue": ($event) => isRef(label) ? label.value = $event : null,
                      disabled: ""
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(VCol, { md: "6" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VAutocomplete, {
                    modelValue: unref(label2),
                    "onUpdate:modelValue": ($event) => isRef(label2) ? label2.value = $event : null,
                    disabled: ""
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VAutocomplete, {
                      modelValue: unref(label2),
                      "onUpdate:modelValue": ($event) => isRef(label2) ? label2.value = $event : null,
                      disabled: ""
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(VCol, { md: "6" }, {
                default: withCtx(() => [
                  createVNode(VAutocomplete, {
                    class: "mr-5",
                    modelValue: unref(label),
                    "onUpdate:modelValue": ($event) => isRef(label) ? label.value = $event : null,
                    disabled: ""
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              }),
              createVNode(VCol, { md: "6" }, {
                default: withCtx(() => [
                  createVNode(VAutocomplete, {
                    modelValue: unref(label2),
                    "onUpdate:modelValue": ($event) => isRef(label2) ? label2.value = $event : null,
                    disabled: ""
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(VCard, { width: "1300" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VTabs, {
              modelValue: unref(tab),
              "onUpdate:modelValue": ($event) => isRef(tab) ? tab.value = $event : null,
              "bg-color": "#f5f2f2"
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
                  _push3(ssrRenderComponent(VTab, { value: "partes" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Partes`);
                      } else {
                        return [
                          createTextVNode("Partes")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VTab, { value: "minuta" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Minuta`);
                      } else {
                        return [
                          createTextVNode("Minuta")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VTab, { value: "livro" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Livro`);
                      } else {
                        return [
                          createTextVNode("Livro")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VTab, { value: "observacao" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Observa\xE7\xF5es`);
                      } else {
                        return [
                          createTextVNode("Observa\xE7\xF5es")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VTab, { value: "anexo" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Anexos`);
                      } else {
                        return [
                          createTextVNode("Anexos")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VTab, { value: "dados" }, {
                      default: withCtx(() => [
                        createTextVNode("Dados")
                      ]),
                      _: 1
                    }),
                    createVNode(VTab, { value: "partes" }, {
                      default: withCtx(() => [
                        createTextVNode("Partes")
                      ]),
                      _: 1
                    }),
                    createVNode(VTab, { value: "minuta" }, {
                      default: withCtx(() => [
                        createTextVNode("Minuta")
                      ]),
                      _: 1
                    }),
                    createVNode(VTab, { value: "livro" }, {
                      default: withCtx(() => [
                        createTextVNode("Livro")
                      ]),
                      _: 1
                    }),
                    createVNode(VTab, { value: "observacao" }, {
                      default: withCtx(() => [
                        createTextVNode("Observa\xE7\xF5es")
                      ]),
                      _: 1
                    }),
                    createVNode(VTab, { value: "anexo" }, {
                      default: withCtx(() => [
                        createTextVNode("Anexos")
                      ]),
                      _: 1
                    })
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
                        _push4(ssrRenderComponent(_component_ProcuracaoAtualizarDados, {
                          item_dados: unref(dadosData),
                          item_situacoes: unref(situacoesItems)
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_ProcuracaoAtualizarDados, {
                            item_dados: unref(dadosData),
                            item_situacoes: unref(situacoesItems)
                          }, null, 8, ["item_dados", "item_situacoes"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VTabsWindowItem, { value: "partes" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_ProcuracaoAtualizarPartes, null, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_ProcuracaoAtualizarPartes)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VTabsWindowItem, { value: "minuta" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_ProcuracaoAtualizarMinuta, {
                          onPage: getPages,
                          onDoc: getDocument
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_ProcuracaoAtualizarMinuta, {
                            onPage: getPages,
                            onDoc: getDocument
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VTabsWindowItem, { value: "livro" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_ProcuracaoAtualizarLivro, {
                          pages: unref(pages_prop),
                          document: unref(doc_prop)
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_ProcuracaoAtualizarLivro, {
                            pages: unref(pages_prop),
                            document: unref(doc_prop)
                          }, null, 8, ["pages", "document"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VTabsWindowItem, { value: "observacao" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_ProcuracaoAtualizarObservacao, null, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_ProcuracaoAtualizarObservacao)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VTabsWindowItem, { value: "anexo" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_ProcuracaoAtualizarAnexos, null, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_ProcuracaoAtualizarAnexos)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VTabsWindowItem, { value: "dados" }, {
                      default: withCtx(() => [
                        createVNode(_component_ProcuracaoAtualizarDados, {
                          item_dados: unref(dadosData),
                          item_situacoes: unref(situacoesItems)
                        }, null, 8, ["item_dados", "item_situacoes"])
                      ]),
                      _: 1
                    }),
                    createVNode(VTabsWindowItem, { value: "partes" }, {
                      default: withCtx(() => [
                        createVNode(_component_ProcuracaoAtualizarPartes)
                      ]),
                      _: 1
                    }),
                    createVNode(VTabsWindowItem, { value: "minuta" }, {
                      default: withCtx(() => [
                        createVNode(_component_ProcuracaoAtualizarMinuta, {
                          onPage: getPages,
                          onDoc: getDocument
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(VTabsWindowItem, { value: "livro" }, {
                      default: withCtx(() => [
                        createVNode(_component_ProcuracaoAtualizarLivro, {
                          pages: unref(pages_prop),
                          document: unref(doc_prop)
                        }, null, 8, ["pages", "document"])
                      ]),
                      _: 1
                    }),
                    createVNode(VTabsWindowItem, { value: "observacao" }, {
                      default: withCtx(() => [
                        createVNode(_component_ProcuracaoAtualizarObservacao)
                      ]),
                      _: 1
                    }),
                    createVNode(VTabsWindowItem, { value: "anexo" }, {
                      default: withCtx(() => [
                        createVNode(_component_ProcuracaoAtualizarAnexos)
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
                  createVNode(VTab, { value: "partes" }, {
                    default: withCtx(() => [
                      createTextVNode("Partes")
                    ]),
                    _: 1
                  }),
                  createVNode(VTab, { value: "minuta" }, {
                    default: withCtx(() => [
                      createTextVNode("Minuta")
                    ]),
                    _: 1
                  }),
                  createVNode(VTab, { value: "livro" }, {
                    default: withCtx(() => [
                      createTextVNode("Livro")
                    ]),
                    _: 1
                  }),
                  createVNode(VTab, { value: "observacao" }, {
                    default: withCtx(() => [
                      createTextVNode("Observa\xE7\xF5es")
                    ]),
                    _: 1
                  }),
                  createVNode(VTab, { value: "anexo" }, {
                    default: withCtx(() => [
                      createTextVNode("Anexos")
                    ]),
                    _: 1
                  })
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
                      createVNode(_component_ProcuracaoAtualizarDados, {
                        item_dados: unref(dadosData),
                        item_situacoes: unref(situacoesItems)
                      }, null, 8, ["item_dados", "item_situacoes"])
                    ]),
                    _: 1
                  }),
                  createVNode(VTabsWindowItem, { value: "partes" }, {
                    default: withCtx(() => [
                      createVNode(_component_ProcuracaoAtualizarPartes)
                    ]),
                    _: 1
                  }),
                  createVNode(VTabsWindowItem, { value: "minuta" }, {
                    default: withCtx(() => [
                      createVNode(_component_ProcuracaoAtualizarMinuta, {
                        onPage: getPages,
                        onDoc: getDocument
                      })
                    ]),
                    _: 1
                  }),
                  createVNode(VTabsWindowItem, { value: "livro" }, {
                    default: withCtx(() => [
                      createVNode(_component_ProcuracaoAtualizarLivro, {
                        pages: unref(pages_prop),
                        document: unref(doc_prop)
                      }, null, 8, ["pages", "document"])
                    ]),
                    _: 1
                  }),
                  createVNode(VTabsWindowItem, { value: "observacao" }, {
                    default: withCtx(() => [
                      createVNode(_component_ProcuracaoAtualizarObservacao)
                    ]),
                    _: 1
                  }),
                  createVNode(VTabsWindowItem, { value: "anexo" }, {
                    default: withCtx(() => [
                      createVNode(_component_ProcuracaoAtualizarAnexos)
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
      }, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/fontes/atos/procuracoes/atualizar/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_id_-BJgJPVU5.mjs.map
