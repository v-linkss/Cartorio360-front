import { a as buildAssetsURL } from '../routes/renderer.mjs';
import { _ as __nuxt_component_0$1 } from './nuxt-link-DyZc7qn_.mjs';
import { u as useRouter$1, c as useRoute$1, f as useNuxtApp, d as useCookie, V as VTextField, e as VBtn, as as VDataTable, _ as _export_sfc, b as useRuntimeConfig } from './server.mjs';
import { defineComponent, ref, provide, createElementBlock, withCtx, unref, isRef, createTextVNode, createVNode, openBlock, createBlock, createCommentVNode, useSSRContext, reactive, withAsyncContext } from 'vue';
import { u as useFetch } from './fetch-Dsyde8UD.mjs';
import { ssrRenderComponent, ssrRenderAttr, ssrRenderStyle, ssrRenderAttrs } from 'vue/server-renderer';
import { useVuelidate } from '@vuelidate/core';
import { helpers, required } from '@vuelidate/validators';
import { V as VContainer } from './VContainer-Dd724oJ4.mjs';
import { V as VRow } from './VRow-CVrt2SWs.mjs';
import { V as VCol } from './VCol-DvbNDJG_.mjs';
import { V as VAutocomplete } from './VAutocomplete-D1-afj5_.mjs';
import { _ as _sfc_main$1$1, a as _sfc_main$7 } from './FichaCard-L0y6eYkN.mjs';
import { _ as _sfc_main$8 } from './ErrorModalCard-DUPV_dzc.mjs';
import { _ as _imports_1 } from './visualizar-CsXww5Hd.mjs';
import { _ as _imports_0, a as _imports_4$1 } from './mudarStatus-D3vc2C0t.mjs';
import { _ as _imports_2, a as _imports_3 } from './excluido-CHOPYrBt.mjs';
import mammoth from 'mammoth';
import { DecoupledEditor, AccessibilityHelp, Alignment, Autoformat, AutoImage, AutoLink, Autosave, BalloonToolbar, Base64UploadAdapter, BlockQuote, Bold, Code, CodeBlock, Essentials, FindAndReplace, FontBackgroundColor, FontColor, FontFamily, FontSize, GeneralHtmlSupport, Heading, Highlight, HorizontalLine, HtmlComment, HtmlEmbed, ImageBlock, ImageCaption, ImageInline, ImageInsert, ImageInsertViaUrl, ImageResize, ImageStyle, ImageTextAlternative, ImageToolbar, ImageUpload, Indent, IndentBlock, Italic, Link, LinkImage, List, ListProperties, Markdown, MediaEmbed, PageBreak, Paragraph, PasteFromMarkdownExperimental, PasteFromOffice, RemoveFormat, SelectAll, ShowBlocks, SpecialCharacters, SpecialCharactersArrows, SpecialCharactersCurrency, SpecialCharactersEssentials, SpecialCharactersLatin, SpecialCharactersMathematical, SpecialCharactersText, Strikethrough, Style, Subscript, Superscript, Table, TableCaption, TableCellProperties, TableColumnResize, TableProperties, TableToolbar, TextTransformation, TodoList, Underline, Undo } from 'ckeditor5';
import translations from 'ckeditor5/translations/pt.js';
import { a as VCard } from './VCard-uMKFEuGZ.mjs';
import { V as VTabs, a as VTab, b as VTabsWindow, c as VTabsWindowItem } from './VTabs-eFSwjNml.mjs';
import 'vue-bundle-renderer/runtime';
import '../runtime.mjs';
import 'node:http';
import 'node:https';
import 'fs';
import 'path';
import 'node:fs';
import 'node:url';
import 'devalue';
import '@unhead/ssr';
import 'unhead';
import '@unhead/shared';
import 'vue-router';
import '@ckeditor/ckeditor5-vue';
import 'vue3-toastify';
import 'vue-the-mask';
import './validaCpf-DuucUl6O.mjs';

const _sfc_main$6 = {
  __name: "Dados",
  __ssrInlineRender: true,
  props: {
    ato_token: {
      type: String,
      required: true
    }
  },
  emits: ["saved"],
  async setup(__props, { emit: __emit }) {
    let __temp, __restore;
    const props = __props;
    const emit = __emit;
    const router = useRouter$1();
    const route = useRoute$1();
    const config = useRuntimeConfig();
    const { $toast } = useNuxtApp();
    const allSituacoes = `${config.public.managemant}/listarSituacoes`;
    const createAtoProcuracao = `${config.public.managemant}/createAtos`;
    const getAtoId = `${config.public.managemant}/getAtosTiposByToken`;
    const cartorio_token = ref(useCookie("user-data").value.cartorio_token);
    const body = route.query.id ? { ato_token: props.ato_token } : { cartorio_token };
    const ordemserv_id = ref(useCookie("user-service").value.id).value || ref(useCookie("user-service").value).value;
    const situacoesItems = ref([]);
    const state = reactive({
      dt_abertura: getCurrentDate(),
      status: null,
      mne: null
    });
    const rules = {
      status: {
        required: helpers.withMessage("O campo \xE9 obrigatorio", required)
      }
    };
    const v$ = useVuelidate(rules, state);
    const { data: tipoAtoId } = ([__temp, __restore] = withAsyncContext(() => useFetch(`${getAtoId}/${props.ato_token}`, {
      method: "GET"
    }, "$9ZmTYsLk0K")), __temp = await __temp, __restore(), __temp);
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
        }, "$hyq5YcBEjF");
        if (status.value === "success") {
          $toast.success("Situa\xE7\xE3o registrada com sucesso");
          emit("saved", data.value.id);
        }
      } else {
        $toast.error("Preencha os campos obrigatorios.");
      }
    }
    function getCurrentDate() {
      const today = /* @__PURE__ */ new Date();
      const yyyy = today.getFullYear();
      const MM = String(today.getMonth() + 1).padStart(2, "0");
      const dd = String(today.getDate()).padStart(2, "0");
      return `${yyyy}-${MM}-${dd}`;
    }
    const { data: situacaoData } = ([__temp, __restore] = withAsyncContext(() => useFetch(allSituacoes, {
      method: "POST",
      body
    }, "$S3qwbpImEh")), __temp = await __temp, __restore(), __temp);
    situacoesItems.value = situacaoData.value;
    const goBack = () => {
      const origem = route.query.origem || "criar";
      const id = route.query.id;
      if (origem === "atualizar") {
        router.push(`/ordens-servicos/atualizar/${id}`);
      } else {
        router.push("/ordens-servicos/criar-registro");
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
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
                          "item-value": "token",
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
                            "item-value": "token",
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
                          "item-value": "token",
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
                        "item-value": "token",
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
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Procuracao/Dados.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const _imports_4 = "" + buildAssetsURL("btn-pessoa.CF_QQ4dq.png");
const _sfc_main$5 = {
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
    useNuxtApp();
    const procurarPessoa = `${config.public.managemant}/pesquisarPessoas`;
    `${config.public.managemant}/createAtosPessoa`;
    const papeisApresentante = `${config.public.managemant}/listarPapeis`;
    const cartorio_token = ref(useCookie("user-data").value.cartorio_token);
    ref(useCookie("user-service").value.token).value || ref(useCookie("user-service").value).value;
    useCookie("auth_token").value;
    const pessoasItems = ref([]);
    const pessoasTable = ref([]);
    const papeisItems = ref([]);
    const selectedObjects = ref([]);
    const errorModalVisible = ref(false);
    const isModalRegistroOpen = ref(false);
    const isModalFichaOpen = ref(false);
    const selectedItem = ref(null);
    const errorMessage = ref("");
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
        key: "nome"
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
    const createRepresentante = async () => {
      const representante = {
        pessoa: state.pessoa,
        papel: papeisItems.value.find((papel) => papel.id === state.papeis)
        // Objeto completo do papel
      };
      console.log(representante);
      pessoasTable.value.push(representante);
    };
    function confirmItem(item) {
      selectedObjects.value.push(item);
    }
    const redirectToFicha = (item) => {
      selectedItem.value = item.pessoa.id;
      isModalFichaOpen.value = true;
    };
    const goBack = () => {
      const origem = route.query.origem || "criar";
      const id = route.query.id;
      if (origem === "atualizar") {
        router.push(`/ordens-servicos/atualizar/${id}`);
      } else {
        router.push("/ordens-servicos/criar-registro");
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ModalRegistroPessoas = _sfc_main$1$1;
      const _component_ModalFichaCard = _sfc_main$7;
      const _component_ErrorModalCard = _sfc_main$8;
      const _component_NuxtLink = __nuxt_component_0$1;
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
                  _push3(`<div${_scopeId2}><img class="btn-pointer mt-3"${ssrRenderAttr("src", _imports_1)} style="${ssrRenderStyle({ "width": "40px", "cursor": "pointer" })}" title="Pesquisar Pessoa"${_scopeId2}></div><div${_scopeId2}><img class="btn-pointer mt-3 ml-2"${ssrRenderAttr("src", _imports_0)} style="${ssrRenderStyle({ "width": "40px", "cursor": "pointer" })}" title="Criar Pessoa"${_scopeId2}></div>`);
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
                        class: "btn-pointer mt-3",
                        src: _imports_1,
                        style: { "width": "40px", "cursor": "pointer" },
                        title: "Pesquisar Pessoa",
                        onClick: searchPessoasService
                      })
                    ]),
                    createVNode("div", null, [
                      createVNode("img", {
                        class: "btn-pointer mt-3 ml-2",
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
                  _push3(`<div${_scopeId2}><img class="btn-pointer mt-3"${ssrRenderAttr("src", _imports_0)} style="${ssrRenderStyle({ "width": "40px", "cursor": "pointer" })}" title="Criar Representante"${_scopeId2}></div>`);
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
                        class: "btn-pointer mt-3",
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
                                    _push6(`<div style="${ssrRenderStyle({ "display": "flex", "cursor": "pointer", "justify-content": "flex-end" })}" class="mr-2" title="Visualizar Ficha"${_scopeId5}><img style="${ssrRenderStyle({ "width": "30px", "height": "30px" })}"${ssrRenderAttr("src", _imports_1)} alt="Visualizar"${_scopeId5}></div><div style="${ssrRenderStyle({ "display": "flex", "cursor": "pointer", "justify-content": "flex-end" })}" class="mr-2" title="Alterar Papel"${_scopeId5}><img style="${ssrRenderStyle({ "width": "30px", "height": "30px" })}"${ssrRenderAttr("src", _imports_2)} alt="Visualizar"${_scopeId5}></div><div class="mr-2" style="${ssrRenderStyle({ "display": "flex", "cursor": "pointer", "justify-content": "flex-end" })}" title="Deletar Pessoa"${_scopeId5}><img style="${ssrRenderStyle({ "width": "30px", "height": "30px" })}"${ssrRenderAttr("src", _imports_4$1)} alt="Visualizar"${_scopeId5}></div><div style="${ssrRenderStyle({ "display": "flex", "cursor": "pointer", "justify-content": "flex-end" })}" class="mr-2" title="Selecionar Representante"${_scopeId5}><img style="${ssrRenderStyle({ "width": "30px", "height": "30px" })}"${ssrRenderAttr("src", _imports_4)} alt="Visualizar"${_scopeId5}></div>`);
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
                                        onClick: ($event) => redirectToFicha(item),
                                        class: "mr-2",
                                        title: "Alterar Papel"
                                      }, [
                                        createVNode("img", {
                                          style: { "width": "30px", "height": "30px" },
                                          src: _imports_2,
                                          alt: "Visualizar"
                                        })
                                      ], 8, ["onClick"]),
                                      createVNode("div", {
                                        class: "mr-2",
                                        style: { "display": "flex", "cursor": "pointer", "justify-content": "flex-end" },
                                        onClick: ($event) => _ctx.deletePessoa(item),
                                        title: "Deletar Pessoa"
                                      }, [
                                        createVNode("img", {
                                          style: { "width": "30px", "height": "30px" },
                                          src: _imports_4$1,
                                          alt: "Visualizar"
                                        })
                                      ], 8, ["onClick"]),
                                      createVNode("div", {
                                        style: { "display": "flex", "cursor": "pointer", "justify-content": "flex-end" },
                                        class: "mr-2",
                                        onClick: ($event) => _ctx.redirectToRepresentante(item),
                                        title: "Selecionar Representante"
                                      }, [
                                        createVNode("img", {
                                          style: { "width": "30px", "height": "30px" },
                                          src: _imports_4,
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
                                      onClick: ($event) => redirectToFicha(item),
                                      class: "mr-2",
                                      title: "Alterar Papel"
                                    }, [
                                      createVNode("img", {
                                        style: { "width": "30px", "height": "30px" },
                                        src: _imports_2,
                                        alt: "Visualizar"
                                      })
                                    ], 8, ["onClick"]),
                                    createVNode("div", {
                                      class: "mr-2",
                                      style: { "display": "flex", "cursor": "pointer", "justify-content": "flex-end" },
                                      onClick: ($event) => _ctx.deletePessoa(item),
                                      title: "Deletar Pessoa"
                                    }, [
                                      createVNode("img", {
                                        style: { "width": "30px", "height": "30px" },
                                        src: _imports_4$1,
                                        alt: "Visualizar"
                                      })
                                    ], 8, ["onClick"]),
                                    createVNode("div", {
                                      style: { "display": "flex", "cursor": "pointer", "justify-content": "flex-end" },
                                      class: "mr-2",
                                      onClick: ($event) => _ctx.redirectToRepresentante(item),
                                      title: "Selecionar Representante"
                                    }, [
                                      createVNode("img", {
                                        style: { "width": "30px", "height": "30px" },
                                        src: _imports_4,
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
                                    onClick: ($event) => redirectToFicha(item),
                                    class: "mr-2",
                                    title: "Alterar Papel"
                                  }, [
                                    createVNode("img", {
                                      style: { "width": "30px", "height": "30px" },
                                      src: _imports_2,
                                      alt: "Visualizar"
                                    })
                                  ], 8, ["onClick"]),
                                  createVNode("div", {
                                    class: "mr-2",
                                    style: { "display": "flex", "cursor": "pointer", "justify-content": "flex-end" },
                                    onClick: ($event) => _ctx.deletePessoa(item),
                                    title: "Deletar Pessoa"
                                  }, [
                                    createVNode("img", {
                                      style: { "width": "30px", "height": "30px" },
                                      src: _imports_4$1,
                                      alt: "Visualizar"
                                    })
                                  ], 8, ["onClick"]),
                                  createVNode("div", {
                                    style: { "display": "flex", "cursor": "pointer", "justify-content": "flex-end" },
                                    class: "mr-2",
                                    onClick: ($event) => _ctx.redirectToRepresentante(item),
                                    title: "Selecionar Representante"
                                  }, [
                                    createVNode("img", {
                                      style: { "width": "30px", "height": "30px" },
                                      src: _imports_4,
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
                                  onClick: ($event) => redirectToFicha(item),
                                  class: "mr-2",
                                  title: "Alterar Papel"
                                }, [
                                  createVNode("img", {
                                    style: { "width": "30px", "height": "30px" },
                                    src: _imports_2,
                                    alt: "Visualizar"
                                  })
                                ], 8, ["onClick"]),
                                createVNode("div", {
                                  class: "mr-2",
                                  style: { "display": "flex", "cursor": "pointer", "justify-content": "flex-end" },
                                  onClick: ($event) => _ctx.deletePessoa(item),
                                  title: "Deletar Pessoa"
                                }, [
                                  createVNode("img", {
                                    style: { "width": "30px", "height": "30px" },
                                    src: _imports_4$1,
                                    alt: "Visualizar"
                                  })
                                ], 8, ["onClick"]),
                                createVNode("div", {
                                  style: { "display": "flex", "cursor": "pointer", "justify-content": "flex-end" },
                                  class: "mr-2",
                                  onClick: ($event) => _ctx.redirectToRepresentante(item),
                                  title: "Selecionar Representante"
                                }, [
                                  createVNode("img", {
                                    style: { "width": "30px", "height": "30px" },
                                    src: _imports_4,
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
            _push2(ssrRenderComponent(_component_ModalFichaCard, {
              show: unref(isModalFichaOpen),
              item: unref(selectedItem),
              onConfirmar: ($event) => confirmItem(unref(selectedItem)),
              onClose: ($event) => isModalFichaOpen.value = false
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_ErrorModalCard, {
              show: unref(errorModalVisible),
              errorMessage: unref(errorMessage),
              onClose: ($event) => errorModalVisible.value = false
            }, null, _parent2, _scopeId));
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
                      class: "btn-pointer mt-3",
                      src: _imports_1,
                      style: { "width": "40px", "cursor": "pointer" },
                      title: "Pesquisar Pessoa",
                      onClick: searchPessoasService
                    })
                  ]),
                  createVNode("div", null, [
                    createVNode("img", {
                      class: "btn-pointer mt-3 ml-2",
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
                      class: "btn-pointer mt-3",
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
                                onClick: ($event) => redirectToFicha(item),
                                class: "mr-2",
                                title: "Alterar Papel"
                              }, [
                                createVNode("img", {
                                  style: { "width": "30px", "height": "30px" },
                                  src: _imports_2,
                                  alt: "Visualizar"
                                })
                              ], 8, ["onClick"]),
                              createVNode("div", {
                                class: "mr-2",
                                style: { "display": "flex", "cursor": "pointer", "justify-content": "flex-end" },
                                onClick: ($event) => _ctx.deletePessoa(item),
                                title: "Deletar Pessoa"
                              }, [
                                createVNode("img", {
                                  style: { "width": "30px", "height": "30px" },
                                  src: _imports_4$1,
                                  alt: "Visualizar"
                                })
                              ], 8, ["onClick"]),
                              createVNode("div", {
                                style: { "display": "flex", "cursor": "pointer", "justify-content": "flex-end" },
                                class: "mr-2",
                                onClick: ($event) => _ctx.redirectToRepresentante(item),
                                title: "Selecionar Representante"
                              }, [
                                createVNode("img", {
                                  style: { "width": "30px", "height": "30px" },
                                  src: _imports_4,
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
              createVNode(_component_ModalFichaCard, {
                show: unref(isModalFichaOpen),
                item: unref(selectedItem),
                onConfirmar: ($event) => confirmItem(unref(selectedItem)),
                onClose: ($event) => isModalFichaOpen.value = false
              }, null, 8, ["show", "item", "onConfirmar", "onClose"]),
              createVNode(_component_ErrorModalCard, {
                show: unref(errorModalVisible),
                errorMessage: unref(errorMessage),
                onClose: ($event) => errorModalVisible.value = false
              }, null, 8, ["show", "errorMessage", "onClose"]),
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Procuracao/Partes.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const clientOnlySymbol = Symbol.for("nuxt:client-only");
const __nuxt_component_0 = defineComponent({
  name: "ClientOnly",
  inheritAttrs: false,
  props: ["fallback", "placeholder", "placeholderTag", "fallbackTag"],
  setup(_, { slots, attrs }) {
    const mounted = ref(false);
    provide(clientOnlySymbol, true);
    return (props) => {
      var _a;
      if (mounted.value) {
        return (_a = slots.default) == null ? void 0 : _a.call(slots);
      }
      const slot = slots.fallback || slots.placeholder;
      if (slot) {
        return slot();
      }
      const fallbackStr = props.fallback || props.placeholder || "";
      const fallbackTag = props.fallbackTag || props.placeholderTag || "span";
      return createElementBlock(fallbackTag, attrs, fallbackStr);
    };
  }
});
const _sfc_main$4 = {
  name: "app",
  data() {
    return {
      isLayoutReady: false,
      config: null,
      // CKEditor needs the DOM tree before calculating the configuration.
      editor: DecoupledEditor
    };
  },
  mounted() {
    this.config = {
      toolbar: {
        items: [
          "undo",
          "redo",
          "|",
          "showBlocks",
          "findAndReplace",
          "|",
          "heading",
          "style",
          "|",
          "fontSize",
          "fontFamily",
          "fontColor",
          "fontBackgroundColor",
          "|",
          "bold",
          "italic",
          "underline",
          "strikethrough",
          "subscript",
          "superscript",
          "code",
          "removeFormat",
          "|",
          "specialCharacters",
          "horizontalLine",
          "pageBreak",
          "link",
          "insertImage",
          "insertImageViaUrl",
          "mediaEmbed",
          "insertTable",
          "highlight",
          "blockQuote",
          "codeBlock",
          "htmlEmbed",
          "|",
          "alignment",
          "|",
          "bulletedList",
          "numberedList",
          "todoList",
          "outdent",
          "indent"
        ],
        shouldNotGroupWhenFull: false
      },
      plugins: [
        AccessibilityHelp,
        Alignment,
        Autoformat,
        AutoImage,
        AutoLink,
        Autosave,
        BalloonToolbar,
        Base64UploadAdapter,
        BlockQuote,
        Bold,
        Code,
        CodeBlock,
        Essentials,
        FindAndReplace,
        FontBackgroundColor,
        FontColor,
        FontFamily,
        FontSize,
        GeneralHtmlSupport,
        Heading,
        Highlight,
        HorizontalLine,
        HtmlComment,
        HtmlEmbed,
        ImageBlock,
        ImageCaption,
        ImageInline,
        ImageInsert,
        ImageInsertViaUrl,
        ImageResize,
        ImageStyle,
        ImageTextAlternative,
        ImageToolbar,
        ImageUpload,
        Indent,
        IndentBlock,
        Italic,
        Link,
        LinkImage,
        List,
        ListProperties,
        Markdown,
        MediaEmbed,
        PageBreak,
        Paragraph,
        PasteFromMarkdownExperimental,
        PasteFromOffice,
        RemoveFormat,
        SelectAll,
        ShowBlocks,
        SpecialCharacters,
        SpecialCharactersArrows,
        SpecialCharactersCurrency,
        SpecialCharactersEssentials,
        SpecialCharactersLatin,
        SpecialCharactersMathematical,
        SpecialCharactersText,
        Strikethrough,
        Style,
        Subscript,
        Superscript,
        Table,
        TableCaption,
        TableCellProperties,
        TableColumnResize,
        TableProperties,
        TableToolbar,
        TextTransformation,
        TodoList,
        Underline,
        Undo
      ],
      balloonToolbar: [
        "bold",
        "italic",
        "|",
        "link",
        "insertImage",
        "|",
        "bulletedList",
        "numberedList"
      ],
      fontFamily: {
        supportAllValues: true
      },
      fontSize: {
        options: [10, 12, 14, "default", 18, 20, 22],
        supportAllValues: true
      },
      heading: {
        options: [
          {
            model: "paragraph",
            title: "Paragraph",
            class: "ck-heading_paragraph"
          },
          {
            model: "heading1",
            view: "h1",
            title: "Heading 1",
            class: "ck-heading_heading1"
          },
          {
            model: "heading2",
            view: "h2",
            title: "Heading 2",
            class: "ck-heading_heading2"
          },
          {
            model: "heading3",
            view: "h3",
            title: "Heading 3",
            class: "ck-heading_heading3"
          },
          {
            model: "heading4",
            view: "h4",
            title: "Heading 4",
            class: "ck-heading_heading4"
          },
          {
            model: "heading5",
            view: "h5",
            title: "Heading 5",
            class: "ck-heading_heading5"
          },
          {
            model: "heading6",
            view: "h6",
            title: "Heading 6",
            class: "ck-heading_heading6"
          }
        ]
      },
      htmlSupport: {
        allow: [
          {
            name: /^.*$/,
            styles: true,
            attributes: true,
            classes: true
          }
        ]
      },
      image: {
        toolbar: [
          "toggleImageCaption",
          "imageTextAlternative",
          "|",
          "imageStyle:inline",
          "imageStyle:wrapText",
          "imageStyle:breakText",
          "|",
          "resizeImage"
        ]
      },
      language: "pt",
      link: {
        addTargetToExternalLinks: true,
        defaultProtocol: "https://",
        decorators: {
          toggleDownloadable: {
            mode: "manual",
            label: "Downloadable",
            attributes: {
              download: "file"
            }
          }
        }
      },
      list: {
        properties: {
          styles: true,
          startIndex: true,
          reversed: true
        }
      },
      menuBar: {
        isVisible: true
      },
      placeholder: "Coloque o conte\xFAdo aqui!",
      style: {
        definitions: [
          {
            name: "Article category",
            element: "h3",
            classes: ["category"]
          },
          {
            name: "Title",
            element: "h2",
            classes: ["document-title"]
          },
          {
            name: "Subtitle",
            element: "h3",
            classes: ["document-subtitle"]
          },
          {
            name: "Info box",
            element: "p",
            classes: ["info-box"]
          },
          {
            name: "Side quote",
            element: "blockquote",
            classes: ["side-quote"]
          },
          {
            name: "Marker",
            element: "span",
            classes: ["marker"]
          },
          {
            name: "Spoiler",
            element: "span",
            classes: ["spoiler"]
          },
          {
            name: "Code (dark)",
            element: "pre",
            classes: ["fancy-code", "fancy-code-dark"]
          },
          {
            name: "Code (bright)",
            element: "pre",
            classes: ["fancy-code", "fancy-code-bright"]
          }
        ]
      },
      table: {
        contentToolbar: [
          "tableColumn",
          "tableRow",
          "mergeTableCells",
          "tableProperties",
          "tableCellProperties"
        ]
      },
      translations: [translations]
    };
    this.isLayoutReady = true;
  },
  methods: {
    onReady(editor) {
      Array.from(this.$refs.editorToolbarElement.children).forEach(
        (child) => child.remove()
      );
      Array.from(this.$refs.editorMenuBarElement.children).forEach(
        (child) => child.remove()
      );
      this.$refs.editorToolbarElement.appendChild(
        editor.ui.view.toolbar.element
      );
      this.$refs.editorMenuBarElement.appendChild(
        editor.ui.view.menuBarView.element
      );
      this.editorInstance = editor;
    },
    async importWordFile(event) {
      const file = event.target.files[0];
      if (file && file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
        try {
          const arrayBuffer = await file.arrayBuffer();
          const options = {
            styleMap: [
              "b => strong",
              "i => em",
              "u => u",
              "strike => strike",
              "p[style-name='Heading 1'] => h1:fresh",
              "p[style-name='Heading 2'] => h2:fresh",
              "p[style-name='Heading 3'] => h3:fresh",
              "r[style-name='Bold'] => strong",
              "r[style-name='Italic'] => em",
              "r[style-name='Underline'] => u",
              "highlight => span.highlight"
            ],
            includeDefaultStyleMap: true,
            // Incluir mapa de estilos padrão
            convertImage: mammoth.images.imgElement(
              (image) => image.read("base64").then((imageBuffer) => ({
                src: `data:image/jpeg;base64,${imageBuffer}`
              }))
            ),
            ignoreEmptyParagraphs: false
          };
          const result = await mammoth.convertToHtml({ arrayBuffer }, options);
          if (this.editorInstance) {
            this.editorInstance.setData(result.value);
          } else {
            console.error("Editor n\xE3o est\xE1 pronto.");
          }
        } catch (error) {
          console.error("Erro ao importar o arquivo Word:", error);
        }
      } else {
        alert("Por favor, selecione um arquivo .docx");
      }
    }
  }
};
function _sfc_ssrRender$2(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_ClientOnly = __nuxt_component_0;
  _push(ssrRenderComponent(_component_ClientOnly, _attrs, {}, _parent));
}
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Procuracao/Texto.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const __nuxt_component_2 = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["ssrRender", _sfc_ssrRender$2]]);
const _sfc_main$3 = {};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs) {
  _push(`<div${ssrRenderAttrs(_attrs)}></div>`);
}
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Procuracao/Imagem.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const __nuxt_component_3 = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["ssrRender", _sfc_ssrRender$1]]);
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
    const props = __props;
    const router = useRouter$1();
    const route = useRoute$1();
    const config = useRuntimeConfig();
    const { $toast } = useNuxtApp();
    const allEscreventes = `${config.public.managemant}/listarEscrevente`;
    const getAtoId = `${config.public.managemant}/getAtosTiposByToken`;
    const createAtoObservacao = `${config.public.managemant}/createAtosObservacao`;
    const observacaoUpdate = `${config.public.managemant}/updateAtosObservacao`;
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
        key: "nome"
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
            data: data2.value.created,
            observacao: data2.value.observacao,
            id: data2.value.id
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
        router.push(`/ordens-servicos/atualizar/${id}`);
      } else {
        router.push("/ordens-servicos/criar-registro");
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
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
                                _push5(`<img style="${ssrRenderStyle({ "width": "30px", "height": "30px" })}"${ssrRenderAttr("src", _imports_3)} alt="Visualizar" title="Reativar"${_scopeId4}>`);
                              } else {
                                _push5(`<img${ssrRenderAttr("src", _imports_4$1)} alt="Excluir" class="trash-icon" style="${ssrRenderStyle({ "width": "30px", "height": "30px" })}" title="Excluir"${_scopeId4}>`);
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
                                    src: _imports_3,
                                    alt: "Visualizar",
                                    title: "Reativar"
                                  })) : (openBlock(), createBlock("img", {
                                    key: 1,
                                    src: _imports_4$1,
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
                                  src: _imports_3,
                                  alt: "Visualizar",
                                  title: "Reativar"
                                })) : (openBlock(), createBlock("img", {
                                  key: 1,
                                  src: _imports_4$1,
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
                                src: _imports_3,
                                alt: "Visualizar",
                                title: "Reativar"
                              })) : (openBlock(), createBlock("img", {
                                key: 1,
                                src: _imports_4$1,
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
                              src: _imports_3,
                              alt: "Visualizar",
                              title: "Reativar"
                            })) : (openBlock(), createBlock("img", {
                              key: 1,
                              src: _imports_4$1,
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Procuracao/Observacao.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<div${ssrRenderAttrs(_attrs)}></div>`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Procuracao/Anexos.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_5 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender]]);
const _sfc_main = {
  __name: "procuracao",
  __ssrInlineRender: true,
  props: {
    ato_token: {
      type: String,
      required: true
    }
  },
  setup(__props) {
    const props = __props;
    const ato_id_prop = ref(null);
    const tab = ref(null);
    const showTabs = ref(false);
    const selectedAto = ref(props.ato_token);
    const handleSave = (atoId) => {
      ato_id_prop.value = atoId;
      showTabs.value = true;
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ProcuracaoDados = _sfc_main$6;
      const _component_ProcuracaoPartes = _sfc_main$5;
      const _component_ProcuracaoTexto = __nuxt_component_2;
      const _component_ProcuracaoImagem = __nuxt_component_3;
      const _component_ProcuracaoObservacao = _sfc_main$2;
      const _component_ProcuracaoAnexos = __nuxt_component_5;
      _push(`<!--[--><h1 class="mb-2">Procura\xE7\xE3o</h1>`);
      _push(ssrRenderComponent(VCard, { width: "1300" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VTabs, {
              modelValue: unref(tab),
              "onUpdate:modelValue": ($event) => isRef(tab) ? tab.value = $event : null,
              "bg-color": "#C8FCCA"
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
                  if (unref(showTabs)) {
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
                  } else {
                    _push3(`<!---->`);
                  }
                  if (unref(showTabs)) {
                    _push3(ssrRenderComponent(VTab, { value: "texto" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`Texto`);
                        } else {
                          return [
                            createTextVNode("Texto")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  if (unref(showTabs)) {
                    _push3(ssrRenderComponent(VTab, { value: "imagem" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`Imagem`);
                        } else {
                          return [
                            createTextVNode("Imagem")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  if (unref(showTabs)) {
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
                  } else {
                    _push3(`<!---->`);
                  }
                  if (unref(showTabs)) {
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
                    _push3(`<!---->`);
                  }
                } else {
                  return [
                    createVNode(VTab, { value: "dados" }, {
                      default: withCtx(() => [
                        createTextVNode("Dados")
                      ]),
                      _: 1
                    }),
                    unref(showTabs) ? (openBlock(), createBlock(VTab, {
                      key: 0,
                      value: "partes"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Partes")
                      ]),
                      _: 1
                    })) : createCommentVNode("", true),
                    unref(showTabs) ? (openBlock(), createBlock(VTab, {
                      key: 1,
                      value: "texto"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Texto")
                      ]),
                      _: 1
                    })) : createCommentVNode("", true),
                    unref(showTabs) ? (openBlock(), createBlock(VTab, {
                      key: 2,
                      value: "imagem"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Imagem")
                      ]),
                      _: 1
                    })) : createCommentVNode("", true),
                    unref(showTabs) ? (openBlock(), createBlock(VTab, {
                      key: 3,
                      value: "observacao"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Observa\xE7\xF5es")
                      ]),
                      _: 1
                    })) : createCommentVNode("", true),
                    unref(showTabs) ? (openBlock(), createBlock(VTab, {
                      key: 4,
                      value: "anexo"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Anexos")
                      ]),
                      _: 1
                    })) : createCommentVNode("", true)
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
                        _push4(ssrRenderComponent(_component_ProcuracaoDados, {
                          onSaved: handleSave,
                          ato_token: unref(selectedAto)
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_ProcuracaoDados, {
                            onSaved: handleSave,
                            ato_token: unref(selectedAto)
                          }, null, 8, ["ato_token"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  if (unref(showTabs)) {
                    _push3(ssrRenderComponent(VTabsWindowItem, { value: "partes" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_component_ProcuracaoPartes, {
                            ato_token: unref(selectedAto),
                            ato_id: unref(ato_id_prop)
                          }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_component_ProcuracaoPartes, {
                              ato_token: unref(selectedAto),
                              ato_id: unref(ato_id_prop)
                            }, null, 8, ["ato_token", "ato_id"])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  if (unref(showTabs)) {
                    _push3(ssrRenderComponent(VTabsWindowItem, { value: "texto" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_component_ProcuracaoTexto, null, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_component_ProcuracaoTexto)
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  if (unref(showTabs)) {
                    _push3(ssrRenderComponent(VTabsWindowItem, { value: "imagem" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_component_ProcuracaoImagem, null, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_component_ProcuracaoImagem)
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  if (unref(showTabs)) {
                    _push3(ssrRenderComponent(VTabsWindowItem, { value: "observacao" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_component_ProcuracaoObservacao, { ato_id: unref(ato_id_prop) }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_component_ProcuracaoObservacao, { ato_id: unref(ato_id_prop) }, null, 8, ["ato_id"])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  if (unref(showTabs)) {
                    _push3(ssrRenderComponent(VTabsWindowItem, { value: "anexo" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_component_ProcuracaoAnexos, null, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_component_ProcuracaoAnexos)
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
                    createVNode(VTabsWindowItem, { value: "dados" }, {
                      default: withCtx(() => [
                        createVNode(_component_ProcuracaoDados, {
                          onSaved: handleSave,
                          ato_token: unref(selectedAto)
                        }, null, 8, ["ato_token"])
                      ]),
                      _: 1
                    }),
                    unref(showTabs) ? (openBlock(), createBlock(VTabsWindowItem, {
                      key: 0,
                      value: "partes"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_ProcuracaoPartes, {
                          ato_token: unref(selectedAto),
                          ato_id: unref(ato_id_prop)
                        }, null, 8, ["ato_token", "ato_id"])
                      ]),
                      _: 1
                    })) : createCommentVNode("", true),
                    unref(showTabs) ? (openBlock(), createBlock(VTabsWindowItem, {
                      key: 1,
                      value: "texto"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_ProcuracaoTexto)
                      ]),
                      _: 1
                    })) : createCommentVNode("", true),
                    unref(showTabs) ? (openBlock(), createBlock(VTabsWindowItem, {
                      key: 2,
                      value: "imagem"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_ProcuracaoImagem)
                      ]),
                      _: 1
                    })) : createCommentVNode("", true),
                    unref(showTabs) ? (openBlock(), createBlock(VTabsWindowItem, {
                      key: 3,
                      value: "observacao"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_ProcuracaoObservacao, { ato_id: unref(ato_id_prop) }, null, 8, ["ato_id"])
                      ]),
                      _: 1
                    })) : createCommentVNode("", true),
                    unref(showTabs) ? (openBlock(), createBlock(VTabsWindowItem, {
                      key: 4,
                      value: "anexo"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_ProcuracaoAnexos)
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
              createVNode(VTabs, {
                modelValue: unref(tab),
                "onUpdate:modelValue": ($event) => isRef(tab) ? tab.value = $event : null,
                "bg-color": "#C8FCCA"
              }, {
                default: withCtx(() => [
                  createVNode(VTab, { value: "dados" }, {
                    default: withCtx(() => [
                      createTextVNode("Dados")
                    ]),
                    _: 1
                  }),
                  unref(showTabs) ? (openBlock(), createBlock(VTab, {
                    key: 0,
                    value: "partes"
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Partes")
                    ]),
                    _: 1
                  })) : createCommentVNode("", true),
                  unref(showTabs) ? (openBlock(), createBlock(VTab, {
                    key: 1,
                    value: "texto"
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Texto")
                    ]),
                    _: 1
                  })) : createCommentVNode("", true),
                  unref(showTabs) ? (openBlock(), createBlock(VTab, {
                    key: 2,
                    value: "imagem"
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Imagem")
                    ]),
                    _: 1
                  })) : createCommentVNode("", true),
                  unref(showTabs) ? (openBlock(), createBlock(VTab, {
                    key: 3,
                    value: "observacao"
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Observa\xE7\xF5es")
                    ]),
                    _: 1
                  })) : createCommentVNode("", true),
                  unref(showTabs) ? (openBlock(), createBlock(VTab, {
                    key: 4,
                    value: "anexo"
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Anexos")
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
                      createVNode(_component_ProcuracaoDados, {
                        onSaved: handleSave,
                        ato_token: unref(selectedAto)
                      }, null, 8, ["ato_token"])
                    ]),
                    _: 1
                  }),
                  unref(showTabs) ? (openBlock(), createBlock(VTabsWindowItem, {
                    key: 0,
                    value: "partes"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_ProcuracaoPartes, {
                        ato_token: unref(selectedAto),
                        ato_id: unref(ato_id_prop)
                      }, null, 8, ["ato_token", "ato_id"])
                    ]),
                    _: 1
                  })) : createCommentVNode("", true),
                  unref(showTabs) ? (openBlock(), createBlock(VTabsWindowItem, {
                    key: 1,
                    value: "texto"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_ProcuracaoTexto)
                    ]),
                    _: 1
                  })) : createCommentVNode("", true),
                  unref(showTabs) ? (openBlock(), createBlock(VTabsWindowItem, {
                    key: 2,
                    value: "imagem"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_ProcuracaoImagem)
                    ]),
                    _: 1
                  })) : createCommentVNode("", true),
                  unref(showTabs) ? (openBlock(), createBlock(VTabsWindowItem, {
                    key: 3,
                    value: "observacao"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_ProcuracaoObservacao, { ato_id: unref(ato_id_prop) }, null, 8, ["ato_id"])
                    ]),
                    _: 1
                  })) : createCommentVNode("", true),
                  unref(showTabs) ? (openBlock(), createBlock(VTabsWindowItem, {
                    key: 4,
                    value: "anexo"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_ProcuracaoAnexos)
                    ]),
                    _: 1
                  })) : createCommentVNode("", true)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/fontes/atos/procuracoes/procuracao.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=procuracao-DahlDEn8.mjs.map
