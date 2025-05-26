import { _ as __nuxt_component_0 } from './nuxt-link-TpvcaGEw.mjs';
import { useSSRContext, watch, ref, reactive, withAsyncContext, withCtx, unref, createVNode, createTextVNode, computed, openBlock, createBlock, createCommentVNode, provide, toDisplayString } from 'vue';
import { ssrRenderComponent, ssrRenderAttr, ssrRenderStyle, ssrInterpolate } from 'vue/server-renderer';
import { useVuelidate } from '@vuelidate/core';
import { helpers, required } from '@vuelidate/validators';
import { u as useRouter$1, f as useRoute$1, b as useNuxtApp, e as useCookie, V as VTextField, g as VBtn, b9 as VProgressCircular, ba as VSheet, c as useRuntimeConfig } from './server.mjs';
import { u as useFetch } from './fetch-uf6n1sXR.mjs';
import { V as VContainer } from './VContainer-CUysD4sO.mjs';
import { V as VRow } from './VRow-Bqz0CuIN.mjs';
import { V as VCol } from './VCol-BT4RzX0Q.mjs';
import { V as VAutocomplete } from './VAutocomplete-BKZ1aqE0.mjs';
import { _ as _sfc_main$6 } from './RegistroPessoas-DDBqKvx0.mjs';
import { _ as _imports_5, T as Toolbar, W as WordExport, D as DocumentEditorContainerComponent, a as _imports_0$1, c as _imports_0$2, d as _imports_1$2, b as _imports_2$1, e as _sfc_main$1$1, f as _sfc_main$7 } from './abre-arquivo-verde-Zb2l3Sog.mjs';
import { r as registerLicense, _ as _sfc_main$8 } from './FichaCard-CJR9R2KX.mjs';
import { _ as _imports_1 } from './visualizar-BoZ30DMV.mjs';
import { _ as _imports_0 } from './novo-CWU3oYa5.mjs';
import { _ as _imports_1$1 } from './editar-BcGPsVK2.mjs';
import { _ as _imports_2, a as _imports_3 } from './excluido-ceRs5bdR.mjs';
import { V as VDataTable } from './VDataTable-0yHZ8pfB.mjs';
import { _ as _sfc_main$9 } from './Confirmacao-CxPc6IXj.mjs';
import { V as VCard } from './VCard-4px4Zqx0.mjs';
import { f as formatDate } from './formatDate-DflkuJ_V.mjs';

const _sfc_main$5 = {
  __name: "Dados",
  __ssrInlineRender: true,
  props: {
    ato_token: {
      type: String,
      required: true
    },
    ato_tipo_id: {
      type: Number
    }
  },
  emits: ["saved"],
  async setup(__props, { emit: __emit }) {
    let __temp, __restore;
    const props = __props;
    watch(() => props.ato_tipo_id, (value) => {
      tipoAtoId.value = { id: value };
    });
    const emit = __emit;
    const router = useRouter$1();
    const route = useRoute$1();
    const config = useRuntimeConfig();
    const { $toast } = useNuxtApp();
    const allSituacoes = `${config.public.managemant}/listarSituacoes`;
    const createAtoProcuracao = `${config.public.managemant}/createAtos`;
    `${config.public.managemant}/getAtosTiposByToken`;
    const cartorio_token = ref(useCookie("user-data").value.cartorio_token);
    const ordemserv_id = ref(useCookie("user-service").value.id).value || ref(useCookie("user-service").value).value;
    const situacoesItems = ref([]);
    const tipoAtoId = ref(props.ato_tipo_id ? { id: props.ato_tipo_id } : null);
    const state = reactive({
      dt_abertura: null,
      status: "EM EDI\xC7\xC3O",
      mne: null
    });
    const rules = {
      status: {
        required: helpers.withMessage("O campo \xE9 obrigatorio", required)
      }
    };
    const v$ = useVuelidate(rules, state);
    async function onSubmit() {
      if (await v$.value.$validate()) {
        const { data, error, status } = await useFetch(createAtoProcuracao, {
          method: "POST",
          body: {
            ato_tipo_id: tipoAtoId.value.id,
            cartorio_id: useCookie("user-data").value.cartorio_id,
            ordemserv_id,
            status: state.status,
            dt_abertura: state.dt_abertura,
            mne: state.mne,
            user_id: useCookie("user-data").value.usuario_id,
            user_alteracao_id: useCookie("user-data").value.usuario_id
          }
        }, "$9ZmTYsLk0K");
        if (status.value === "success") {
          $toast.success("Ato registrado com sucesso!");
          emit("saved", { id: data.value.id, token: data.value.token });
        }
      } else {
        $toast.error("Preencha os campos obrigatorios.");
      }
    }
    const { data: situacaoData } = ([__temp, __restore] = withAsyncContext(() => useFetch(allSituacoes, {
      method: "POST",
      body: { cartorio_token: cartorio_token.value }
    }, "$hyq5YcBEjF")), __temp = await __temp, __restore(), __temp);
    situacoesItems.value = situacaoData.value;
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
                          required: "",
                          "error-messages": unref(v$).status.$errors.map((e) => e.$message),
                          onBlur: unref(v$).status.$touch,
                          onInput: unref(v$).status.$touch
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
                            required: "",
                            "error-messages": unref(v$).status.$errors.map((e) => e.$message),
                            onBlur: unref(v$).status.$touch,
                            onInput: unref(v$).status.$touch
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "items", "error-messages", "onBlur", "onInput"])
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
                          required: "",
                          "error-messages": unref(v$).status.$errors.map((e) => e.$message),
                          onBlur: unref(v$).status.$touch,
                          onInput: unref(v$).status.$touch
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "items", "error-messages", "onBlur", "onInput"])
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
                          disabled: "",
                          readonly: ""
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VTextField, {
                            modelValue: unref(state).dt_abertura,
                            "onUpdate:modelValue": ($event) => unref(state).dt_abertura = $event,
                            type: "date",
                            label: "Data Lavratura",
                            disabled: "",
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
                          disabled: "",
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
                    onClick: onSubmit,
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
                      class: "ml-10",
                      onClick: onSubmit,
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
                        required: "",
                        "error-messages": unref(v$).status.$errors.map((e) => e.$message),
                        onBlur: unref(v$).status.$touch,
                        onInput: unref(v$).status.$touch
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "items", "error-messages", "onBlur", "onInput"])
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
                        disabled: "",
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
                    onClick: onSubmit,
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
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Procuracao/Dados.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : undefined;
};
const _sfc_main$4 = {
  __name: "Partes",
  __ssrInlineRender: true,
  props: {
    ato_token: {
      type: String,
      required: true
    },
    ato_id: {
      type: Number,
      required: true
    }
  },
  async setup(__props) {
    let __temp, __restore;
    const props = __props;
    const router = useRouter$1();
    const route = useRoute$1();
    const config = useRuntimeConfig();
    const { $toast } = useNuxtApp();
    const procurarPessoa = `${config.public.managemant}/pesquisarPessoas`;
    const papeisApresentante = `${config.public.managemant}/listarPapeis`;
    const baixarDocumento2 = `${config.public.managemant}/download`;
    const criarAtoPessoa = `${config.public.managemant}/createAtosPessoa`;
    const getAtoPessoa = `${config.public.managemant}/getAtosPessoaById`;
    const pessoasUpdate = `${config.public.managemant}/updateAtosPessoa`;
    const cartorio_token = ref(useCookie("user-data").value.cartorio_token);
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
    const representante_pessoa_id = ref(null);
    ref(null);
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
    computed(() => {
      var _a;
      return ((_a = state.pessoa) == null ? undefined : _a.link_ficha) || false;
    });
    const { data } = ([__temp, __restore] = withAsyncContext(() => useFetch(papeisApresentante, {
      method: "POST",
      body: { tipo_ato_token: props.ato_token }
    }, "$fFKndZhA4W")), __temp = await __temp, __restore(), __temp);
    papeisItems.value = data.value;
    async function searchPessoasService() {
      try {
        const { data: pessoasData, error } = await useFetch(procurarPessoa, {
          method: "POST",
          body: {
            cartorio_token: cartorio_token.value,
            documento: state.documento,
            nome: state.nome
          }
        }, "$o3ZL1rvYrY");
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
    const atualizarPapel = (descricao) => {
      pessoasTable.value = pessoasTable.value.map(
        (item) => item.id === ato_pessoa_id.value ? {
          ...item,
          papel: { ...item.papel, descricao }
        } : item
      );
    };
    const atualizarRepresentante = (nome) => {
      const pessoaAtualizada = pessoasTable.value.find(
        (item) => item.pessoa.id === representante_pessoa_id.value
      );
      pessoaAtualizada.representante.nome = nome;
    };
    const createRepresentante = async () => {
      const representante = {
        pessoa: state.pessoa,
        papel: papeisItems.value.find((papel) => papel.id === state.papeis),
        // Objeto completo do papel
        representante: { nome: null }
      };
      const atosPessoas = await useFetch(`${getAtoPessoa}/${props.ato_id}`, {
        method: "GET"
      }, "$kXSxUa4grs");
      for (const element of atosPessoas.data.value) {
        if (element.pessoa_id === state.pessoa.id && element.ato_id === props.ato_id && element.tipo_parte_id === state.papeis) {
          $toast.error("Pessoa J\xE1 Registrada Com Esse Papel!");
          return;
        }
      }
      try {
        const { data: data2, error, status } = await useFetch(criarAtoPessoa, {
          method: "POST",
          body: {
            ato_id: Number(props.ato_id),
            pessoa_id: state.pessoa.id,
            tipo_parte_id: state.papeis,
            user_id: Number(useCookie("user-data").value.usuario_id)
          }
        }, "$So3qnQu7ek");
        if (status.value === "success") {
          representante.id = data2.value.id;
          $toast.success("Pessoa Registrada com Sucesso!");
          pessoasTable.value.push(representante);
        } else {
          $toast.error(error.value.message);
        }
      } catch (error) {
        $toast.error("Erro no servidor. Tente novamente.");
      }
    };
    const redirectToFicha = async (item) => {
      isModalFichaOpen.value = true;
      const { data: linkUrl } = await useFetch(baixarDocumento2, {
        method: "POST",
        body: {
          bucket: useCookie("user-data").value.cartorio_token,
          path: item.pessoa.link_ficha
        }
      }, "$Q3kbIwtd9t");
      fichaRender.value = linkUrl.value;
      pessoasItem.value = item.pessoa;
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
      ato_pessoa_id.value = item.id;
      isModalPapelOpen.value = true;
      representante_nome.value = item.pessoa.nome;
    };
    async function deletePessoa(item) {
      item.excluido = !item.excluido;
      try {
        await useFetch(`${pessoasUpdate}/${ato_pessoa_id.value}`, {
          method: "PUT",
          body: JSON.stringify({ excluido: item.excluido })
        }, "$9xStKwGd7o");
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
      const _component_ModalRegistroPessoas = _sfc_main$6;
      const _component_ModalRepresentante = _sfc_main$1$1;
      const _component_ModalPapel = _sfc_main$7;
      const _component_ModalFichaCard = _sfc_main$8;
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
                  _push3(`<div${_scopeId2}><img class="mt-3"${ssrRenderAttr("src", _imports_1)} style="${ssrRenderStyle({ "width": "40px", "cursor": "pointer" })}" title="Pesquisar Pessoa"${_scopeId2}></div><div${_scopeId2}><img class="mt-3 ml-2"${ssrRenderAttr("src", _imports_0)} style="${ssrRenderStyle({ "width": "40px", "cursor": "pointer" })}" title="Criar Pessoa"${_scopeId2}></div>`);
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
                        class: "mt-3",
                        src: _imports_1,
                        style: { "width": "40px", "cursor": "pointer" },
                        title: "Pesquisar Pessoa",
                        onClick: searchPessoasService
                      })
                    ]),
                    createVNode("div", null, [
                      createVNode("img", {
                        class: "mt-3 ml-2",
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
                  _push3(`<div${_scopeId2}><img class="mt-3"${ssrRenderAttr("src", _imports_0)} style="${ssrRenderStyle({ "width": "40px", "cursor": "pointer" })}" title="Criar Representante"${_scopeId2}></div>`);
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
                        class: "mt-3",
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
              ato_token: props.ato_token,
              ato_id: unref(ato_pessoa_id),
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
                      class: "mt-3",
                      src: _imports_1,
                      style: { "width": "40px", "cursor": "pointer" },
                      title: "Pesquisar Pessoa",
                      onClick: searchPessoasService
                    })
                  ]),
                  createVNode("div", null, [
                    createVNode("img", {
                      class: "mt-3 ml-2",
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
                      class: "mt-3",
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
                ato_token: props.ato_token,
                ato_id: unref(ato_pessoa_id),
                show: unref(isModalPapelOpen),
                onClose: ($event) => isModalPapelOpen.value = false,
                onUpdatePapel: atualizarPapel
              }, null, 8, ["representante_nome", "ato_token", "ato_id", "show", "onClose"]),
              unref(isModalFichaOpen) ? (openBlock(), createBlock(_component_ModalFichaCard, {
                key: 0,
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Procuracao/Partes.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : undefined;
};
const serviceUrl = "https://ej2services.syncfusion.com/production/web-services/api/documenteditor/";
const _sfc_main$3 = {
  __name: "Minuta",
  __ssrInlineRender: true,
  props: {
    ato_token: {
      type: String,
      required: true
    }
  },
  emits: ["page", "doc"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    provide("DocumentEditorContainer", [Toolbar, WordExport]);
    const config = useRuntimeConfig();
    const { $toast } = useNuxtApp();
    const router = useRouter$1();
    const route = useRoute$1();
    const emit = __emit;
    registerLicense(`${config.public.docEditor}`);
    const enviarDocumento = `${config.public.managemant}/upload`;
    const documentEditorContainer = ref(null);
    const loading = ref(false);
    const onDocumentChange = async () => {
      const document = documentEditorContainer.value.ej2Instances.documentEditor;
      const sfdt = await document.saveAsBlob("Sfdt");
      const reader = new FileReader();
      reader.onload = () => {
        const sfdtText = reader.result;
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
        formData.append("file", blob, `anexo.docx`);
        formData.append(
          "cartorio_token",
          useCookie("user-data").value.cartorio_token
        );
        formData.append("token", props.ato_token);
        formData.append("tipo", "ato_minuta");
        const { data, status } = await useFetch(enviarDocumento, {
          method: "POST",
          body: formData
        }, "$071xxdqs20");
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
    const gerarMinuta = async () => {
      setLoading(true);
      try {
        await carregarModeloDeMinuta();
        setLoading(true);
        const { data, status } = await useFetch(substituirModelo, {
          method: "POST",
          body: { ato_token: props.ato_token }
        }, "$0ktpWliD4l");
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
          body: { bucket: useCookie("user-data").value.cartorio_token, path: "provider/modeloAto.sfdt" }
        }, "$jXVvQjEE6u");
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
        $toast.error("Falha ao carregar o modelo de minuta.");
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
                  _push3(`Salvar`);
                } else {
                  return [
                    createTextVNode("Salvar")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(VBtn, {
              class: "ml-4",
              size: "large",
              color: "blue",
              onClick: gerarMinuta
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
                  createTextVNode("Salvar")
                ]),
                _: 1
              }, 8, ["disabled"]),
              createVNode(VBtn, {
                class: "ml-4",
                size: "large",
                color: "blue",
                onClick: gerarMinuta
              }, {
                default: withCtx(() => [
                  createTextVNode("Gerar Minuta")
                ]),
                _: 1
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
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Procuracao/Minuta.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : undefined;
};
const _sfc_main$2 = {
  __name: "Livro",
  __ssrInlineRender: true,
  props: {
    ato_token: {
      type: String,
      required: true
    },
    pages: {
      type: Number,
      required: true
    },
    document: {
      type: String,
      required: true
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
    const allEscreventes = `${config.public.managemant}/listarEscrevente`;
    const lavraAtoLivro = `${config.public.managemant}/lavrarAto`;
    const condMessage = ref(
      "Ao lavrar esse ato, a opera\xE7\xE3o n\xE3o poder\xE1 ser desfeita. Confirma ?"
    );
    const isModalCondOpen = ref(false);
    const lavraData = ref(null);
    const selo = ref(null);
    const documentEditorContainer = ref(null);
    const cartorio_token = ref(useCookie("user-data").value.cartorio_token);
    const usuario_token = useCookie("auth_token").value;
    const escreventesItems = ref([]);
    const valorAto = ref({});
    const state = reactive({
      escrevente: null
    });
    const lavraAto = async () => {
      try {
        const { data: data2, status } = await useFetch(lavraAtoLivro, {
          method: "POST",
          body: {
            ato_token: props.ato_token,
            qtd_paginas: props.pages,
            escrevente_token: state.escrevente,
            usuario_token,
            cartorio_token
          }
        }, "$ZKnVBNYxp9");
        if (status.value === "success") {
          lavraData.value = data2.value;
          selo.value = data2.value[0].selo;
          $toast.success("Ato lavrado com sucesso!");
        } else {
          $toast.error("Falha ao lavrar o ato.");
        }
      } catch (error) {
        $toast.error("Erro ao conectar com o servidor.");
      }
    };
    const calcularAto = async () => {
      const { data: data2, status } = await useFetch(calculaAto, {
        method: "POST",
        body: {
          ato_token: route.query.ato_token_edit,
          cartorio_token,
          quantidade: 1,
          usuario_token,
          escrevente_token: state.escrevente,
          qtd_paginas: props.pages
        }
      }, "$XouuxOFIWh");
      if (status.value === "success") {
        valorAto.value = data2.value[0];
      } else {
        $toast.error("Falha ao calcular o ato.");
      }
    };
    const confirmLavrar = async () => {
      isModalCondOpen.value = false;
      await lavraAto();
    };
    const openModalCond = async () => {
      isModalCondOpen.value = true;
      await calcularAto();
    };
    const { data } = ([__temp, __restore] = withAsyncContext(() => useFetch(allEscreventes, {
      method: "POST",
      body: { cartorio_token }
    }, "$R51FaaSzOI")), __temp = await __temp, __restore(), __temp);
    escreventesItems.value = data.value[0].func_json_escreventes;
    const onCreated = function() {
      const documentEditor = documentEditorContainer.value.ej2Instances.documentEditor;
      documentEditor.open(props.document);
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
      const _component_ModalConfirmacao = _sfc_main$9;
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
                    created: props.document ? onCreated : null,
                    ref_key: "documentEditorContainer",
                    ref: documentEditorContainer,
                    height: "850px",
                    width: "850px",
                    key: props.document
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    (openBlock(), createBlock(unref(DocumentEditorContainerComponent), {
                      restrictEditing: true,
                      enableToolbar: false,
                      created: props.document ? onCreated : null,
                      ref_key: "documentEditorContainer",
                      ref: documentEditorContainer,
                      height: "850px",
                      width: "850px",
                      key: props.document
                    }, null, 8, ["created"]))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
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
                  _push3(`<div${_scopeId2}><div${_scopeId2}><img class="ml-2" style="${ssrRenderStyle({ "height": "80px", "width": "80px", "cursor": "pointer", "margin-top": "40px" })}"${ssrRenderAttr("src", _imports_0$1)}${_scopeId2}>`);
                  if (unref(lavraData)) {
                    _push3(ssrRenderComponent(VCard, { class: "mr-16" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        var _a;
                        if (_push4) {
                          _push4(ssrRenderComponent(VRow, { "no-gutters": "" }, {
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
                          _push4(`<div${_scopeId3}>${(_a = unref(selo)) != null ? _a : ""}</div>`);
                        } else {
                          return [
                            createVNode(VRow, { "no-gutters": "" }, {
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
                            createVNode("div", { innerHTML: unref(selo) }, null, 8, ["innerHTML"])
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
                    createVNode("div", null, [
                      createVNode("div", null, [
                        createVNode("img", {
                          onClick: ($event) => openModalCond(),
                          class: "ml-2",
                          style: { "height": "80px", "width": "80px", "cursor": "pointer", "margin-top": "40px" },
                          src: _imports_0$1
                        }, null, 8, ["onClick"]),
                        unref(lavraData) ? (openBlock(), createBlock(VCard, {
                          key: 0,
                          class: "mr-16"
                        }, {
                          default: withCtx(() => [
                            createVNode(VRow, { "no-gutters": "" }, {
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
                            createVNode("div", { innerHTML: unref(selo) }, null, 8, ["innerHTML"])
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
                  (openBlock(), createBlock(unref(DocumentEditorContainerComponent), {
                    restrictEditing: true,
                    enableToolbar: false,
                    created: props.document ? onCreated : null,
                    ref_key: "documentEditorContainer",
                    ref: documentEditorContainer,
                    height: "850px",
                    width: "850px",
                    key: props.document
                  }, null, 8, ["created"]))
                ]),
                _: 1
              }),
              createVNode(VCol, null, {
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
                  createVNode("div", null, [
                    createVNode("div", null, [
                      createVNode("img", {
                        onClick: ($event) => openModalCond(),
                        class: "ml-2",
                        style: { "height": "80px", "width": "80px", "cursor": "pointer", "margin-top": "40px" },
                        src: _imports_0$1
                      }, null, 8, ["onClick"]),
                      unref(lavraData) ? (openBlock(), createBlock(VCard, {
                        key: 0,
                        class: "mr-16"
                      }, {
                        default: withCtx(() => [
                          createVNode(VRow, { "no-gutters": "" }, {
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
                          createVNode("div", { innerHTML: unref(selo) }, null, 8, ["innerHTML"])
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
        valor: unref(valorAto),
        onClose: ($event) => isModalCondOpen.value = false,
        onConfirm: confirmLavrar
      }, null, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Procuracao/Livro.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : undefined;
};
const _sfc_main$1 = {
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
    const props = __props;
    const router = useRouter$1();
    const route = useRoute$1();
    const config = useRuntimeConfig();
    const { $toast } = useNuxtApp();
    const allEscreventes = `${config.public.managemant}/listarEscrevente`;
    const getAtoId = `${config.public.managemant}/getAtosTiposByToken`;
    const createAtoObservacao = `${config.public.managemant}/atos_observacao`;
    const observacaoUpdate = `${config.public.managemant}/atos_observacao`;
    const cartorio_token = ref(useCookie("user-data").value.cartorio_token);
    const observacoesItems = ref([]);
    const escreventesItems = ref([]);
    const headers = [
      {
        title: "Data",
        align: "start",
        key: "data"
      },
      {
        title: "Escrevente",
        align: "start",
        key: "escrevente"
      },
      {
        title: "Observa\xE7\xE3o",
        align: "start",
        key: "observacao"
      },
      { value: "actions" }
    ];
    const state = reactive({
      observacao: null
    });
    const rules = {
      observacao: {
        required: helpers.withMessage("O campo \xE9 obrigatorio", required)
      }
    };
    const v$ = useVuelidate(rules, state);
    [__temp, __restore] = withAsyncContext(() => useFetch(`${getAtoId}/${props.ato_token}`, {
      method: "GET"
    }, "$aJM1TL1buW")), __temp = await __temp, __restore();
    async function onSubmit() {
      if (await v$.value.$validate()) {
        const { data: data2, error, status } = await useFetch(createAtoObservacao, {
          method: "POST",
          body: {
            ato_id: props.ato_id,
            observacao: state.observacao,
            user_id: useCookie("user-data").value.usuario_id
          }
        }, "$dMg99jeUNP");
        if (status.value === "success") {
          observacoesItems.value.push({
            data: formatDate(data2.value.created, "dd/mm/yyyy hh:mm"),
            observacao: data2.value.observacao,
            id: data2.value.id,
            escrevente: useCookie("user-data").value.nome
          });
          $toast.success("Observa\xE7\xE3o registrada com sucesso");
        }
      } else {
        $toast.error("Preencha os campos obrigatorios.");
      }
    }
    async function deleteObservacao(item) {
      item.excluido = !item.excluido;
      try {
        await useFetch(`${observacaoUpdate}/${item.id}`, {
          method: "PUT",
          body: JSON.stringify({ excluido: item.excluido })
        }, "$B6PdRx8Gp4");
      } catch (error) {
        console.error("Erro ao excluir observacao:", error);
      }
    }
    const { data } = ([__temp, __restore] = withAsyncContext(() => useFetch(allEscreventes, {
      method: "POST",
      body: { cartorio_token }
    }, "$xFHPGua26S")), __temp = await __temp, __restore(), __temp);
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
                    modelValue: unref(state).observacao,
                    "onUpdate:modelValue": ($event) => unref(state).observacao = $event,
                    required: "",
                    "error-messages": unref(v$).observacao.$errors.map((e) => e.$message),
                    onBlur: unref(v$).observacao.$touch,
                    onInput: unref(v$).observacao.$touch
                  }, null, _parent3, _scopeId2));
                  _push3(`<div${_scopeId2}><img class="btn-pointer ml-2"${ssrRenderAttr("src", _imports_0)} style="${ssrRenderStyle({ "width": "40px", "cursor": "pointer" })}" title="Criar Pessoa"${_scopeId2}></div>`);
                } else {
                  return [
                    createVNode(VTextField, {
                      label: "Observa\xE7\xE3o",
                      modelValue: unref(state).observacao,
                      "onUpdate:modelValue": ($event) => unref(state).observacao = $event,
                      required: "",
                      "error-messages": unref(v$).observacao.$errors.map((e) => e.$message),
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
                          items: unref(observacoesItems)
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
                            items: unref(observacoesItems)
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
                          items: unref(observacoesItems)
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
                    modelValue: unref(state).observacao,
                    "onUpdate:modelValue": ($event) => unref(state).observacao = $event,
                    required: "",
                    "error-messages": unref(v$).observacao.$errors.map((e) => e.$message),
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
                        items: unref(observacoesItems)
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
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Procuracao/Observacao.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : undefined;
};
const _sfc_main = {
  __name: "Anexos",
  __ssrInlineRender: true,
  props: {
    ato_token: {
      type: String,
      required: true
    },
    ato_id: {
      type: Number,
      required: true
    }
  },
  setup(__props) {
    const props = __props;
    const config = useRuntimeConfig();
    const { $toast } = useNuxtApp();
    const router = useRouter$1();
    const route = useRoute$1();
    const acionarScanner = `${config.public.biometria}/run-scanner`;
    const criarAtoAnexo = `${config.public.managemant}/atos_anexos`;
    const atualizarAtoAnexo = `${config.public.managemant}/atos_anexos`;
    const downloadAnexo = `${config.public.managemant}/download`;
    `${config.public.managemant}/atos_anexos`;
    `${config.public.managemant}/upload`;
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
        const { data } = await useFetch(acionarScanner, { method: "GET" }, "$WazoKp68Tw");
      } catch (error) {
        $toast.error("Erro ao acionar o scanner:", error);
      }
    }
    async function enviarArquivo() {
      try {
        const { data, status } = await useFetch(
          "http://localhost:3500/uploadAnexo",
          {
            method: "POST",
            body: {
              tipo: "ato_translado",
              token: route.query.ato_token_edit,
              cartorio_token: useCookie("user-data").value.cartorio_token
            }
          },
          "$03Wxiia3aI"
        );
      } catch (error) {
        console.error("Erro ao enviar o arquivo:", error);
      }
    }
    const redirectToAnexo = async () => {
      isModalAnexoOpen.value = true;
    };
    function validarArquivoSelecionado(file) {
      if (!file) {
        console.error("Erro: Nenhum arquivo foi selecionado!");
        status_arquivo.value = false;
        return false;
      }
      return true;
    }
    const createAnexo = async () => {
      v$.value.$touch();
      if (v$.value.$invalid) {
        return;
      }
      if (validarArquivoSelecionado(state.fileEvent)) {
        const { data, error, status } = await useFetch(criarAtoAnexo, {
          method: "POST",
          body: {
            ato_id: props.ato_id,
            descricao: state.descricao,
            user_id: useCookie("user-data").value.usuario_id,
            link: "sdfsdfsdf"
          }
        }, "$WyW0hasRPI");
        if (status.value === "success") {
          $toast.success("Anexo registrado com sucesso!");
          anexos.value.push(data.value);
        }
      }
    };
    async function deleteAnexo(item) {
      item.excluido = !item.excluido;
      try {
        await useFetch(`${atualizarAtoAnexo}/${item.id}`, {
          method: "PUT",
          body: JSON.stringify({ excluido: item.excluido })
        }, "$Y3y6TjqbSV");
      } catch (error) {
        console.error("Erro ao excluir pessoa:", error);
      }
    }
    async function visualisarAnexo(item) {
      try {
        const data = await useFetch(`${downloadAnexo}`, {
          method: "POST",
          body: {
            bucket: useCookie("user-data").value.cartorio_token,
            path: item.link
          }
        }, "$bkXJSi7s76");
        const response = await fetch(data.data.value);
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
                  _push3(ssrRenderComponent(VCol, {
                    cols: "5",
                    class: "mt-2"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VTextField, {
                          modelValue: unref(state).descricao,
                          "onUpdate:modelValue": [($event) => unref(state).descricao = $event, unref(v$).descricao.$touch],
                          "error-messages": unref(v$).descricao.$errors.map((e) => e.$message),
                          onBlur: unref(v$).descricao.$touch,
                          required: "",
                          label: "Descri\xE7\xE3o"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VTextField, {
                            modelValue: unref(state).descricao,
                            "onUpdate:modelValue": [($event) => unref(state).descricao = $event, unref(v$).descricao.$touch],
                            "error-messages": unref(v$).descricao.$errors.map((e) => e.$message),
                            onBlur: unref(v$).descricao.$touch,
                            required: "",
                            label: "Descri\xE7\xE3o"
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages", "onBlur"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<div title="Criar" style="${ssrRenderStyle({ "padding-right": "10px" })}"${_scopeId2}>`);
                  if (unref(status_arquivo) === false) {
                    _push3(`<img class="mt-3 ml-2" style="${ssrRenderStyle({ "width": "40px", "height": "40px", "cursor": "pointer" })}"${ssrRenderAttr("src", _imports_0$2)} alt="Criar"${_scopeId2}>`);
                  } else if (unref(status_arquivo) === true) {
                    _push3(`<img class="mt-3 ml-2" style="${ssrRenderStyle({ "width": "40px", "height": "40px", "cursor": "pointer" })}"${ssrRenderAttr("src", _imports_1$2)} alt="Criar"${_scopeId2}>`);
                  } else {
                    _push3(`<img class="mt-3 ml-2" style="${ssrRenderStyle({ "width": "40px", "height": "40px", "cursor": "pointer" })}"${ssrRenderAttr("src", _imports_2$1)} alt="Criar"${_scopeId2}>`);
                  }
                  _push3(`</div><div title="Criar"${_scopeId2}><img class="mt-3" style="${ssrRenderStyle({ "width": "40px", "height": "40px", "cursor": "pointer" })}"${ssrRenderAttr("src", _imports_0)} alt="Escanear"${_scopeId2}></div>`);
                } else {
                  return [
                    createVNode(VCol, {
                      cols: "5",
                      class: "mt-2"
                    }, {
                      default: withCtx(() => [
                        createVNode(VTextField, {
                          modelValue: unref(state).descricao,
                          "onUpdate:modelValue": [($event) => unref(state).descricao = $event, unref(v$).descricao.$touch],
                          "error-messages": unref(v$).descricao.$errors.map((e) => e.$message),
                          onBlur: unref(v$).descricao.$touch,
                          required: "",
                          label: "Descri\xE7\xE3o"
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages", "onBlur"])
                      ]),
                      _: 1
                    }),
                    createVNode("div", {
                      onClick: handleScannerClick,
                      title: "Criar",
                      style: { "padding-right": "10px" }
                    }, [
                      unref(status_arquivo) === false ? (openBlock(), createBlock("img", {
                        key: 0,
                        class: "mt-3 ml-2",
                        style: { "width": "40px", "height": "40px", "cursor": "pointer" },
                        src: _imports_0$2,
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
                        src: _imports_2$1,
                        alt: "Criar"
                      }))
                    ]),
                    createVNode("div", {
                      onClick: createAnexo,
                      title: "Criar"
                    }, [
                      createVNode("img", {
                        class: "mt-3",
                        style: { "width": "40px", "height": "40px", "cursor": "pointer" },
                        src: _imports_0,
                        alt: "Escanear"
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
                      createVNode(VTextField, {
                        modelValue: unref(state).descricao,
                        "onUpdate:modelValue": [($event) => unref(state).descricao = $event, unref(v$).descricao.$touch],
                        "error-messages": unref(v$).descricao.$errors.map((e) => e.$message),
                        onBlur: unref(v$).descricao.$touch,
                        required: "",
                        label: "Descri\xE7\xE3o"
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages", "onBlur"])
                    ]),
                    _: 1
                  }),
                  createVNode("div", {
                    onClick: handleScannerClick,
                    title: "Criar",
                    style: { "padding-right": "10px" }
                  }, [
                    unref(status_arquivo) === false ? (openBlock(), createBlock("img", {
                      key: 0,
                      class: "mt-3 ml-2",
                      style: { "width": "40px", "height": "40px", "cursor": "pointer" },
                      src: _imports_0$2,
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
                      src: _imports_2$1,
                      alt: "Criar"
                    }))
                  ]),
                  createVNode("div", {
                    onClick: createAnexo,
                    title: "Criar"
                  }, [
                    createVNode("img", {
                      class: "mt-3",
                      style: { "width": "40px", "height": "40px", "cursor": "pointer" },
                      src: _imports_0,
                      alt: "Escanear"
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Procuracao/Anexos.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : undefined;
};

export { _sfc_main$5 as _, _sfc_main$4 as a, _sfc_main$3 as b, _sfc_main$2 as c, _sfc_main$1 as d, _sfc_main as e };
//# sourceMappingURL=Anexos-CfGx7rGZ.mjs.map
