import { _ as __nuxt_component_0 } from './nuxt-link-TpvcaGEw.mjs';
import { _ as _imports_3, a as _sfc_main$1 } from './Selos-D-3Rgo5p.mjs';
import { b as useNuxtApp, e as useCookie, V as VTextField, g as VBtn, c as useRuntimeConfig } from './server.mjs';
import { ref, reactive, withAsyncContext, resolveDirective, mergeProps, withCtx, unref, createVNode, toDisplayString, withDirectives, openBlock, createBlock, createCommentVNode, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderStyle, ssrInterpolate, ssrGetDirectiveProps, ssrRenderAttr, ssrRenderClass, ssrIncludeBooleanAttr } from 'vue/server-renderer';
import { _ as _imports_0 } from './salvar-DQISB1bG.mjs';
import { _ as _imports_0$1 } from './novo-CWU3oYa5.mjs';
import { _ as _imports_1 } from './visualizar-BoZ30DMV.mjs';
import { _ as _imports_1$1 } from './editar-BcGPsVK2.mjs';
import { _ as _imports_2, a as _imports_3$1 } from './excluido-ceRs5bdR.mjs';
import { helpers, required } from '@vuelidate/validators';
import { useVuelidate } from '@vuelidate/core';
import { u as useFetch } from './fetch-DOsfzFYE.mjs';
import { f as fetchWithToken } from './fetchWithToken-Cjtduyn0.mjs';
import { V as VContainer } from './VContainer-CUysD4sO.mjs';
import { V as VRow } from './VRow-Bqz0CuIN.mjs';
import { V as VCol } from './VCol-BT4RzX0Q.mjs';
import { V as VAutocomplete } from './VAutocomplete-DxrmY4dO.mjs';
import { V as VDataTable } from './VDataTable-D6BQKL_5.mjs';
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
import './VDialog-BVe31KMa.mjs';
import './VCard-CaQDfbK8.mjs';
import './VAvatar-Dy2zMqU_.mjs';
import './VResponsive-BwPb2GHE.mjs';
import 'pinia';
import 'vue-router';
import 'vue3-toastify';
import 'vue-the-mask';
import './asyncData-B13qrLU7.mjs';
import './filter-D58pPGs5.mjs';
import './VList-BkmWkhVS.mjs';

const _sfc_main = {
  __name: "criar-registro",
  __ssrInlineRender: true,
  async setup(__props) {
    var _a, _b, _c, _d, _e, _f, _g;
    let __temp, __restore;
    const { $toast } = useNuxtApp();
    const config = useRuntimeConfig();
    const createOs = `${config.public.managemant}/createOrdensServico`;
    const routeValidaCpf = `${config.public.managemant}/validarCpf`;
    const atosPayload = `${config.public.managemant}/listarAtos`;
    const updateAto = `${config.public.managemant}/updateAtos`;
    const cartorio_id = ref(useCookie("user-data").value.cartorio_id);
    const pessoa_id = ref(useCookie("user-data").value.usuario_id);
    const ordemserv_token = ref((_a = useCookie("user-service").value) == null ? undefined : _a.token).value || null;
    const cartorio_token = ref(useCookie("user-data").value.cartorio_token).value;
    const ordemNumero = ref((_b = useCookie("user-service").value) == null ? undefined : _b.numero);
    const isDisabledCookie = ref((_c = useCookie("user-service").value) == null ? undefined : _c.isDisabled);
    let showCreateAtos = ref(!!((_d = useCookie("user-service").value) == null ? undefined : _d.numero));
    let showCreateOrdemServ = ref(useCookie("ordem-button").value);
    let isValidatingCpf = false;
    const isModalReimprimirOpen = ref(false);
    const atosItems = ref([]);
    const state = reactive({
      nacionalidade: ((_e = useCookie("user-service").value) == null ? undefined : _e.estrangeiro) || false,
      apresentante_nome: (_f = useCookie("user-service").value) == null ? undefined : _f.apresentante_nome,
      apresentante_cpf: (_g = useCookie("user-service").value) == null ? undefined : _g.apresentante_cpf
    });
    const isDisabled = ref(false);
    const headers = [
      { title: "ID", value: "id" },
      { title: "Protocolo", value: "protocolo" },
      { title: "Usuario", value: "usuario_nome" },
      { title: "Situa\xE7\xE3o", value: "situacao" },
      { title: "Valor", value: "valor" },
      { title: "Tipo", value: "tipo" },
      {
        value: "actions"
      }
    ];
    const nacionalidade = [
      { title: "BRASILEIRO", value: false },
      { title: "ESTRANGEIRO", value: true }
    ];
    const rules = {
      apresentante_nome: {
        required: helpers.withMessage("O campo \xE9 obrigatorio", required)
      },
      apresentante_cpf: {
        required: helpers.withMessage("O campo \xE9 obrigatorio", required)
      }
    };
    const v$ = useVuelidate(rules, state);
    function removeFormatting(value) {
      if (value) {
        return value.replace(/[.\-]/g, "");
      } else {
        value = null;
      }
    }
    const redirectoToView = (item) => {
      redirectTo({
        item,
        id: useCookie("user-service").value.id,
        numeroOs: ordemNumero.value,
        origem: "vizualizar"
      });
    };
    const redirectToUpdateAto = (item) => {
      redirectTo({
        item,
        id: useCookie("user-service").value.id,
        numeroOs: ordemNumero.value,
        origem: "atualizar"
      });
    };
    function limparDados() {
      const serviceCookie = useCookie("user-service");
      const isTrueOrdemServ = useCookie("ordem-button");
      serviceCookie.value = null;
      isTrueOrdemServ.value = null;
    }
    const redirectToModalReimprimir = () => {
      isModalReimprimirOpen.value = true;
    };
    async function onSubmit() {
      const payloadFormated = {
        apresentante_cpf: removeFormatting(state.apresentante_cpf),
        apresentante_nome: state.apresentante_nome,
        user_id: pessoa_id.value,
        cartorio_id: cartorio_id.value,
        estrangeiro: state.nacionalidade
      };
      if (await v$.value.$validate()) {
        const { data: data2, error, status } = await useFetch(createOs, {
          method: "POST",
          body: payloadFormated
        }, "$HqnOwnLBio");
        if (status.value === "error" && error.value.statusCode === 500) {
          $toast.error("Erro ao cadastrar ordem,erro no sistema.");
        } else {
          $toast.success("Ordem registrada com sucesso!");
          showCreateAtos.value = true;
          showCreateOrdemServ.value = false;
          ordemNumero.value = data2.value.numero;
          const isTrueOrdemServ = useCookie("ordem-button");
          isTrueOrdemServ.value = showCreateOrdemServ.value;
          const serviceCookie = useCookie("user-service");
          serviceCookie.value = serviceCookie.value = JSON.stringify({
            numero: data2.value.numero,
            id: data2.value.id,
            apresentante_cpf: data2.value.apresentante_cpf,
            apresentante_nome: data2.value.apresentante_nome,
            estrangeiro: data2.value.estrangeiro,
            token: data2.value.token,
            isDisabled: true
          });
          isDisabled.value = true;
        }
      }
    }
    async function validarCpf(cpf) {
      const cpfFormated = removeFormatting(cpf);
      if (cpfFormated.length === 11 && !isValidatingCpf) {
        isValidatingCpf = true;
        const payloadFormated = {
          cpf: cpfFormated
        };
        try {
          const { data: data2, error, status } = await useFetch(routeValidaCpf, {
            method: "POST",
            body: payloadFormated
          }, "$DfuVr7OuaN");
          if (status.value === "error" && error.value.statusCode === 500) {
            $toast.error("Erro ao cadastrar pessoa, o CPF j\xE1 est\xE1 cadastrado.");
          } else if (data2.value.cpfValidation === true) {
            state.apresentante_nome = data2.value.nome;
            $toast.success("Cpf autenticado com sucesso!");
          } else if (data2.value.cpfValidation === false) {
            $toast.error("Cpf n\xE3o cadastrado!");
          }
        } catch (error) {
          console.error("Erro ao validar CPF:", error);
        } finally {
          isValidatingCpf = false;
        }
      }
    }
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
    const { data } = ([__temp, __restore] = withAsyncContext(() => useFetch(atosPayload, {
      method: "POST",
      body: {
        cartorio_token,
        ordemserv_token
      }
    }, "$bJ1XcDsWLH")), __temp = await __temp, __restore(), __temp);
    if (data.value.length > 0) {
      atosItems.value = data.value;
    } else {
      atosItems.value = [];
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      const _component_ReimpressaoSelos = _sfc_main$1;
      const _directive_mask = resolveDirective("mask");
      _push(ssrRenderComponent(VContainer, mergeProps({ class: "mt-5" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VRow, { class: "mb-5" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                var _a2, _b2;
                if (_push3) {
                  _push3(`<h1${_scopeId2}>Ordem de Servi\xE7o n\xBA</h1><h1 style="${ssrRenderStyle({ "color": "red", "margin-left": "30px" })}"${_scopeId2}>${ssrInterpolate(unref(ordemNumero) || ((_a2 = ("useCookie" in _ctx ? _ctx.useCookie : unref(useCookie))("user-service").value) == null ? undefined : _a2.numero))}</h1>`);
                } else {
                  return [
                    createVNode("h1", null, "Ordem de Servi\xE7o n\xBA"),
                    createVNode("h1", { style: { "color": "red", "margin-left": "30px" } }, toDisplayString(unref(ordemNumero) || ((_b2 = ("useCookie" in _ctx ? _ctx.useCookie : unref(useCookie))("user-service").value) == null ? undefined : _b2.numero)), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(VRow, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VCol, { md: "3" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VAutocomplete, {
                          label: "Nacionalidade",
                          items: nacionalidade,
                          modelValue: unref(state).nacionalidade,
                          "onUpdate:modelValue": ($event) => unref(state).nacionalidade = $event,
                          disabled: unref(isDisabledCookie) || unref(isDisabled)
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VAutocomplete, {
                            label: "Nacionalidade",
                            items: nacionalidade,
                            modelValue: unref(state).nacionalidade,
                            "onUpdate:modelValue": ($event) => unref(state).nacionalidade = $event,
                            disabled: unref(isDisabledCookie) || unref(isDisabled)
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VCol, { md: "2" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        if (unref(state).nacionalidade === false) {
                          _push4(ssrRenderComponent(VTextField, mergeProps({
                            autofocus: "",
                            modelValue: unref(state).apresentante_cpf,
                            "onUpdate:modelValue": ($event) => unref(state).apresentante_cpf = $event,
                            label: "CPF",
                            required: "",
                            "error-messages": unref(v$).apresentante_cpf.$errors.map((e) => e.$message),
                            onBlur: unref(v$).apresentante_cpf.$touch,
                            onInput: ($event) => validarCpf(unref(state).apresentante_cpf),
                            disabled: unref(isDisabledCookie) || unref(isDisabled)
                          }, ssrGetDirectiveProps(_ctx, _directive_mask, "###.###.###-##")), null, _parent4, _scopeId3));
                        } else {
                          _push4(ssrRenderComponent(VTextField, {
                            autofocus: "",
                            modelValue: unref(state).apresentante_cpf,
                            "onUpdate:modelValue": ($event) => unref(state).apresentante_cpf = $event,
                            label: "Documento",
                            required: "",
                            "error-messages": unref(v$).apresentante_cpf.$errors.map((e) => e.$message),
                            onBlur: unref(v$).apresentante_cpf.$touch,
                            disabled: unref(isDisabledCookie) || unref(isDisabled)
                          }, null, _parent4, _scopeId3));
                        }
                      } else {
                        return [
                          unref(state).nacionalidade === false ? withDirectives((openBlock(), createBlock(VTextField, {
                            key: 0,
                            autofocus: "",
                            modelValue: unref(state).apresentante_cpf,
                            "onUpdate:modelValue": ($event) => unref(state).apresentante_cpf = $event,
                            label: "CPF",
                            required: "",
                            "error-messages": unref(v$).apresentante_cpf.$errors.map((e) => e.$message),
                            onBlur: unref(v$).apresentante_cpf.$touch,
                            onInput: ($event) => validarCpf(unref(state).apresentante_cpf),
                            disabled: unref(isDisabledCookie) || unref(isDisabled)
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages", "onBlur", "onInput", "disabled"])), [
                            [_directive_mask, "###.###.###-##"]
                          ]) : (openBlock(), createBlock(VTextField, {
                            key: 1,
                            autofocus: "",
                            modelValue: unref(state).apresentante_cpf,
                            "onUpdate:modelValue": ($event) => unref(state).apresentante_cpf = $event,
                            label: "Documento",
                            required: "",
                            "error-messages": unref(v$).apresentante_cpf.$errors.map((e) => e.$message),
                            onBlur: unref(v$).apresentante_cpf.$touch,
                            disabled: unref(isDisabledCookie) || unref(isDisabled)
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages", "onBlur", "disabled"]))
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VCol, { md: "4" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VTextField, {
                          modelValue: unref(state).apresentante_nome,
                          "onUpdate:modelValue": ($event) => unref(state).apresentante_nome = $event,
                          label: "Nome Apresentante",
                          required: "",
                          "error-messages": unref(v$).apresentante_nome.$errors.map((e) => e.$message),
                          onInput: unref(v$).apresentante_nome.$touch,
                          disabled: unref(isDisabledCookie) || unref(isDisabled)
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VTextField, {
                            modelValue: unref(state).apresentante_nome,
                            "onUpdate:modelValue": ($event) => unref(state).apresentante_nome = $event,
                            label: "Nome Apresentante",
                            required: "",
                            "error-messages": unref(v$).apresentante_nome.$errors.map((e) => e.$message),
                            onInput: unref(v$).apresentante_nome.$touch,
                            disabled: unref(isDisabledCookie) || unref(isDisabled)
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages", "onInput", "disabled"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  if (unref(showCreateOrdemServ)) {
                    _push3(ssrRenderComponent(VCol, null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<div${_scopeId3}><img style="${ssrRenderStyle({ "width": "40px", "height": "40px", "cursor": "pointer" })}"${ssrRenderAttr("src", _imports_0)} alt="Salvar"${_scopeId3}></div>`);
                        } else {
                          return [
                            createVNode("div", null, [
                              createVNode("img", {
                                style: { "width": "40px", "height": "40px", "cursor": "pointer" },
                                src: _imports_0,
                                alt: "Salvar",
                                onClick: ($event) => onSubmit()
                              }, null, 8, ["onClick"])
                            ])
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
                    createVNode(VCol, { md: "3" }, {
                      default: withCtx(() => [
                        createVNode(VAutocomplete, {
                          label: "Nacionalidade",
                          items: nacionalidade,
                          modelValue: unref(state).nacionalidade,
                          "onUpdate:modelValue": ($event) => unref(state).nacionalidade = $event,
                          disabled: unref(isDisabledCookie) || unref(isDisabled)
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"])
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, { md: "2" }, {
                      default: withCtx(() => [
                        unref(state).nacionalidade === false ? withDirectives((openBlock(), createBlock(VTextField, {
                          key: 0,
                          autofocus: "",
                          modelValue: unref(state).apresentante_cpf,
                          "onUpdate:modelValue": ($event) => unref(state).apresentante_cpf = $event,
                          label: "CPF",
                          required: "",
                          "error-messages": unref(v$).apresentante_cpf.$errors.map((e) => e.$message),
                          onBlur: unref(v$).apresentante_cpf.$touch,
                          onInput: ($event) => validarCpf(unref(state).apresentante_cpf),
                          disabled: unref(isDisabledCookie) || unref(isDisabled)
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages", "onBlur", "onInput", "disabled"])), [
                          [_directive_mask, "###.###.###-##"]
                        ]) : (openBlock(), createBlock(VTextField, {
                          key: 1,
                          autofocus: "",
                          modelValue: unref(state).apresentante_cpf,
                          "onUpdate:modelValue": ($event) => unref(state).apresentante_cpf = $event,
                          label: "Documento",
                          required: "",
                          "error-messages": unref(v$).apresentante_cpf.$errors.map((e) => e.$message),
                          onBlur: unref(v$).apresentante_cpf.$touch,
                          disabled: unref(isDisabledCookie) || unref(isDisabled)
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages", "onBlur", "disabled"]))
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, { md: "4" }, {
                      default: withCtx(() => [
                        createVNode(VTextField, {
                          modelValue: unref(state).apresentante_nome,
                          "onUpdate:modelValue": ($event) => unref(state).apresentante_nome = $event,
                          label: "Nome Apresentante",
                          required: "",
                          "error-messages": unref(v$).apresentante_nome.$errors.map((e) => e.$message),
                          onInput: unref(v$).apresentante_nome.$touch,
                          disabled: unref(isDisabledCookie) || unref(isDisabled)
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages", "onInput", "disabled"])
                      ]),
                      _: 1
                    }),
                    unref(showCreateOrdemServ) ? (openBlock(), createBlock(VCol, { key: 0 }, {
                      default: withCtx(() => [
                        createVNode("div", null, [
                          createVNode("img", {
                            style: { "width": "40px", "height": "40px", "cursor": "pointer" },
                            src: _imports_0,
                            alt: "Salvar",
                            onClick: ($event) => onSubmit()
                          }, null, 8, ["onClick"])
                        ])
                      ]),
                      _: 1
                    })) : createCommentVNode("", true)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            if (unref(showCreateAtos)) {
              _push2(ssrRenderComponent(VRow, { style: { "display": "flex", "margin-bottom": "10px", "gap": "2rem" } }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<h1 class="ml-5"${_scopeId2}>Atos</h1>`);
                    _push3(ssrRenderComponent(_component_NuxtLink, { to: { path: "/os/criar-ato", query: { origem: "criar" } } }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<img style="${ssrRenderStyle({ "width": "45px", "height": "45px", "cursor": "pointer" })}"${ssrRenderAttr("src", _imports_0$1)} alt="novo"${_scopeId3}>`);
                        } else {
                          return [
                            createVNode("img", {
                              style: { "width": "45px", "height": "45px", "cursor": "pointer" },
                              src: _imports_0$1,
                              alt: "novo"
                            })
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(VDataTable, {
                      headers,
                      items: unref(atosItems),
                      "item-key": "id"
                    }, {
                      "item.actions": withCtx(({ item }, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(VRow, { style: { "display": "flex", "gap": "2px", "margin-top": "-5px" } }, {
                            default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`<div title="Visualizar"${_scopeId4}><img style="${ssrRenderStyle({ "width": "30px", "height": "30px", "cursor": "pointer" })}"${ssrRenderAttr("src", _imports_1)} alt="Visualizar"${_scopeId4}></div><div title="Reimprimir"${_scopeId4}><img style="${ssrRenderStyle({ "width": "30px", "height": "30px", "cursor": "pointer" })}"${ssrRenderAttr("src", _imports_3)} alt="Reimprimir"${_scopeId4}></div><div class="${ssrRenderClass({ disabled: !item.btn_editar })}"${ssrRenderAttr("title", item.btn_editar ? "Editar" : "Desabilitado")}${_scopeId4}><img style="${ssrRenderStyle({
                                  cursor: item.btn_editar ? "pointer" : "default",
                                  width: "30px",
                                  height: "30px"
                                })}"${ssrRenderAttr("src", _imports_1$1)} alt="Editar"${_scopeId4}></div><div${ssrIncludeBooleanAttr(!item.btn_cancelar) ? " disabled" : ""} title="Excluir"${_scopeId4}>`);
                                if (item.excluido) {
                                  _push5(`<img style="${ssrRenderStyle({ "width": "30px", "height": "30px", "cursor": "pointer" })}"${ssrRenderAttr("src", _imports_2)} alt="Visualizar" title="Reativar"${_scopeId4}>`);
                                } else {
                                  _push5(`<img${ssrRenderAttr("src", _imports_3$1)} alt="Excluir" class="trash-icon" style="${ssrRenderStyle({ "width": "30px", "height": "30px", "cursor": "pointer" })}" title="Excluir"${_scopeId4}>`);
                                }
                                _push5(`</div>`);
                              } else {
                                return [
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
                                    onClick: ($event) => redirectToModalReimprimir(),
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
                                    disabled: !item.btn_cancelar,
                                    onClick: ($event) => item.btn_cancelar ? deleteAto(item) : null,
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
                                  ], 8, ["disabled", "onClick"])
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(VRow, { style: { "display": "flex", "gap": "2px", "margin-top": "-5px" } }, {
                              default: withCtx(() => [
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
                                  onClick: ($event) => redirectToModalReimprimir(),
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
                                  disabled: !item.btn_cancelar,
                                  onClick: ($event) => item.btn_cancelar ? deleteAto(item) : null,
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
                                ], 8, ["disabled", "onClick"])
                              ]),
                              _: 2
                            }, 1024)
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_ReimpressaoSelos, {
                      show: unref(isModalReimprimirOpen),
                      onClose: ($event) => isModalReimprimirOpen.value = false
                    }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode("h1", { class: "ml-5" }, "Atos"),
                      createVNode(_component_NuxtLink, { to: { path: "/os/criar-ato", query: { origem: "criar" } } }, {
                        default: withCtx(() => [
                          createVNode("img", {
                            style: { "width": "45px", "height": "45px", "cursor": "pointer" },
                            src: _imports_0$1,
                            alt: "novo"
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(VDataTable, {
                        headers,
                        items: unref(atosItems),
                        "item-key": "id"
                      }, {
                        "item.actions": withCtx(({ item }) => [
                          createVNode(VRow, { style: { "display": "flex", "gap": "2px", "margin-top": "-5px" } }, {
                            default: withCtx(() => [
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
                                onClick: ($event) => redirectToModalReimprimir(),
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
                                disabled: !item.btn_cancelar,
                                onClick: ($event) => item.btn_cancelar ? deleteAto(item) : null,
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
                              ], 8, ["disabled", "onClick"])
                            ]),
                            _: 2
                          }, 1024)
                        ]),
                        _: 1
                      }, 8, ["items"]),
                      createVNode(_component_ReimpressaoSelos, {
                        show: unref(isModalReimprimirOpen),
                        onClose: ($event) => isModalReimprimirOpen.value = false
                      }, null, 8, ["show", "onClose"])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(ssrRenderComponent(_component_NuxtLink, { to: "/os/lista" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VBtn, {
                    size: "large",
                    color: "red",
                    onClick: limparDados
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
                      color: "red",
                      onClick: limparDados
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
              createVNode(VRow, { class: "mb-5" }, {
                default: withCtx(() => {
                  var _a2;
                  return [
                    createVNode("h1", null, "Ordem de Servi\xE7o n\xBA"),
                    createVNode("h1", { style: { "color": "red", "margin-left": "30px" } }, toDisplayString(unref(ordemNumero) || ((_a2 = ("useCookie" in _ctx ? _ctx.useCookie : unref(useCookie))("user-service").value) == null ? undefined : _a2.numero)), 1)
                  ];
                }),
                _: 1
              }),
              createVNode(VRow, null, {
                default: withCtx(() => [
                  createVNode(VCol, { md: "3" }, {
                    default: withCtx(() => [
                      createVNode(VAutocomplete, {
                        label: "Nacionalidade",
                        items: nacionalidade,
                        modelValue: unref(state).nacionalidade,
                        "onUpdate:modelValue": ($event) => unref(state).nacionalidade = $event,
                        disabled: unref(isDisabledCookie) || unref(isDisabled)
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"])
                    ]),
                    _: 1
                  }),
                  createVNode(VCol, { md: "2" }, {
                    default: withCtx(() => [
                      unref(state).nacionalidade === false ? withDirectives((openBlock(), createBlock(VTextField, {
                        key: 0,
                        autofocus: "",
                        modelValue: unref(state).apresentante_cpf,
                        "onUpdate:modelValue": ($event) => unref(state).apresentante_cpf = $event,
                        label: "CPF",
                        required: "",
                        "error-messages": unref(v$).apresentante_cpf.$errors.map((e) => e.$message),
                        onBlur: unref(v$).apresentante_cpf.$touch,
                        onInput: ($event) => validarCpf(unref(state).apresentante_cpf),
                        disabled: unref(isDisabledCookie) || unref(isDisabled)
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages", "onBlur", "onInput", "disabled"])), [
                        [_directive_mask, "###.###.###-##"]
                      ]) : (openBlock(), createBlock(VTextField, {
                        key: 1,
                        autofocus: "",
                        modelValue: unref(state).apresentante_cpf,
                        "onUpdate:modelValue": ($event) => unref(state).apresentante_cpf = $event,
                        label: "Documento",
                        required: "",
                        "error-messages": unref(v$).apresentante_cpf.$errors.map((e) => e.$message),
                        onBlur: unref(v$).apresentante_cpf.$touch,
                        disabled: unref(isDisabledCookie) || unref(isDisabled)
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages", "onBlur", "disabled"]))
                    ]),
                    _: 1
                  }),
                  createVNode(VCol, { md: "4" }, {
                    default: withCtx(() => [
                      createVNode(VTextField, {
                        modelValue: unref(state).apresentante_nome,
                        "onUpdate:modelValue": ($event) => unref(state).apresentante_nome = $event,
                        label: "Nome Apresentante",
                        required: "",
                        "error-messages": unref(v$).apresentante_nome.$errors.map((e) => e.$message),
                        onInput: unref(v$).apresentante_nome.$touch,
                        disabled: unref(isDisabledCookie) || unref(isDisabled)
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages", "onInput", "disabled"])
                    ]),
                    _: 1
                  }),
                  unref(showCreateOrdemServ) ? (openBlock(), createBlock(VCol, { key: 0 }, {
                    default: withCtx(() => [
                      createVNode("div", null, [
                        createVNode("img", {
                          style: { "width": "40px", "height": "40px", "cursor": "pointer" },
                          src: _imports_0,
                          alt: "Salvar",
                          onClick: ($event) => onSubmit()
                        }, null, 8, ["onClick"])
                      ])
                    ]),
                    _: 1
                  })) : createCommentVNode("", true)
                ]),
                _: 1
              }),
              unref(showCreateAtos) ? (openBlock(), createBlock(VRow, {
                key: 0,
                style: { "display": "flex", "margin-bottom": "10px", "gap": "2rem" }
              }, {
                default: withCtx(() => [
                  createVNode("h1", { class: "ml-5" }, "Atos"),
                  createVNode(_component_NuxtLink, { to: { path: "/os/criar-ato", query: { origem: "criar" } } }, {
                    default: withCtx(() => [
                      createVNode("img", {
                        style: { "width": "45px", "height": "45px", "cursor": "pointer" },
                        src: _imports_0$1,
                        alt: "novo"
                      })
                    ]),
                    _: 1
                  }),
                  createVNode(VDataTable, {
                    headers,
                    items: unref(atosItems),
                    "item-key": "id"
                  }, {
                    "item.actions": withCtx(({ item }) => [
                      createVNode(VRow, { style: { "display": "flex", "gap": "2px", "margin-top": "-5px" } }, {
                        default: withCtx(() => [
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
                            onClick: ($event) => redirectToModalReimprimir(),
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
                            disabled: !item.btn_cancelar,
                            onClick: ($event) => item.btn_cancelar ? deleteAto(item) : null,
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
                          ], 8, ["disabled", "onClick"])
                        ]),
                        _: 2
                      }, 1024)
                    ]),
                    _: 1
                  }, 8, ["items"]),
                  createVNode(_component_ReimpressaoSelos, {
                    show: unref(isModalReimprimirOpen),
                    onClose: ($event) => isModalReimprimirOpen.value = false
                  }, null, 8, ["show", "onClose"])
                ]),
                _: 1
              })) : createCommentVNode("", true),
              createVNode(_component_NuxtLink, { to: "/os/lista" }, {
                default: withCtx(() => [
                  createVNode(VBtn, {
                    size: "large",
                    color: "red",
                    onClick: limparDados
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/os/criar-registro.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : undefined;
};

export { _sfc_main as default };
//# sourceMappingURL=criar-registro-DWIlvobI.mjs.map
