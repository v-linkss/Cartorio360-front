import { ref, mergeProps, withCtx, unref, isRef, createTextVNode, createVNode, openBlock, createBlock, createCommentVNode, useSSRContext, withAsyncContext, reactive, resolveDirective, withDirectives } from 'vue';
import { ssrRenderComponent, ssrRenderStyle, ssrInterpolate, ssrGetDirectiveProps } from 'vue/server-renderer';
import { useVuelidate } from '@vuelidate/core';
import { helpers, required } from '@vuelidate/validators';
import { u as useRouter$1, b as useNuxtApp, e as useCookie, b1 as VProgressCircular, V as VTextField, f as VBtn, c as useRuntimeConfig } from './server.mjs';
import { u as useLazyAsyncData, V as VRow } from './VRow-DlYJpeem.mjs';
import { a as formatToISO } from './formatDate-DflkuJ_V.mjs';
import { f as fetchWithToken } from './fetchWithToken-C8MltWUJ.mjs';
import { V as VContainer } from './VContainer-DT30lSDe.mjs';
import { V as VCol } from './VCol-HDwo5SVF.mjs';
import { V as VAutocomplete } from './VAutocomplete-CK-tWCuO.mjs';
import { V as VCard } from './VCard-BqP110Fm.mjs';
import { V as VTabs, a as VTab, d as VTabsWindow, e as VTabsWindowItem } from './VTabs-CugQte4B.mjs';
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
import './fetch-pt4nsUe7.mjs';
import './filter-cWQ1Yonf.mjs';
import './VList-D7gG12Ur.mjs';
import './VAvatar-BqhB4Z7D.mjs';
import './VResponsive-BWsCuDwY.mjs';

const _sfc_main$2 = {
  __name: "DadosMatricula",
  __ssrInlineRender: true,
  emits: ["saved", "close-modal"],
  async setup(__props, { emit: __emit }) {
    let __temp, __restore;
    const emit = __emit;
    const router = useRouter$1();
    const config = useRuntimeConfig();
    const { $toast } = useNuxtApp();
    const isEditMode = ref(false);
    const MatriculaId = useCookie("Matricula-id");
    const situacao = `${config.public.auth}/service/gerencia/listar_situacao_matriculas`;
    const naturezaImoveis = `${config.public.auth}/service/gerencia/natureza_imoveis`;
    const tipoLogradouros = `${config.public.auth}/service/gerencia/tipo_logradouros`;
    const cidades = `${config.public.auth}/service/gerencia/listarCidades`;
    const livro = `${config.public.auth}/service/gerencia/livro`;
    const {
      data: dados,
      status,
      pending,
      error
    } = ([__temp, __restore] = withAsyncContext(async () => useLazyAsyncData("cliente-dados", async () => {
      const tokenCookie = useCookie("auth_token");
      try {
        const [
          situacaoItens,
          naturezaImoveisItens,
          tipoLogradouroItens,
          cidadesItens,
          livroItens
        ] = await Promise.all([
          $fetch(`${situacao}`, {
            method: "POST",
            body: {
              cartorio_token: useCookie("user-data").value.cartorio_token
            },
            headers: {
              Authorization: `Bearer ${tokenCookie.value}`
            }
          }),
          $fetch(`${naturezaImoveis}`, {
            headers: {
              Authorization: `Bearer ${tokenCookie.value}`
            }
          }),
          $fetch(`${tipoLogradouros}`, {
            headers: {
              Authorization: `Bearer ${tokenCookie.value}`
            }
          }),
          $fetch(`${cidades}`, {
            headers: {
              Authorization: `Bearer ${tokenCookie.value}`
            }
          }),
          $fetch(`${livro}`, {
            headers: {
              Authorization: `Bearer ${tokenCookie.value}`
            }
          })
        ]);
        return {
          situacaoItens,
          naturezaImoveisItens,
          tipoLogradouroItens,
          cidadesItens,
          livroItens
        };
      } catch (error2) {
        console.error("Erro ao carregar dados:", error2);
        return {
          situacaoItens: [],
          naturezaImoveisItens: [],
          tipoLogradouroItens: [],
          cidadesItens: [],
          livroItens: []
        };
      }
    })), __temp = await __temp, __restore(), __temp);
    const state = reactive({
      numero: null,
      protocolo: null,
      livro: null,
      folhas: null,
      data: null,
      descricao: null,
      cnm: null,
      livro_id: null,
      observacao: null,
      inscricao_municipal: null,
      situacao_id: null,
      tabvalores_natureza_id: null,
      tabvalores_tipologradouro_id: null,
      end_logradouro: null,
      end_logradouro_numero: null,
      end_bairro: null,
      end_cidade_id: null,
      end_cep: null,
      end_complemento: null,
      end_quadra: null,
      end_lote: null,
      folha_inicial: null,
      folha_final: null,
      cartorio_id: useCookie("user-data").value.cartorio_id,
      user_id: useCookie("user-data").value.usuario_id
    });
    const rules = {
      numero: {
        required: helpers.withMessage("O campo \xE9 obrigat\xF3rio", required)
      },
      data: {
        required: helpers.withMessage("O campo \xE9 obrigat\xF3rio", required)
      },
      situacao_id: {
        required: helpers.withMessage("O campo \xE9 obrigat\xF3rio", required)
      },
      tabvalores_natureza_id: {
        required: helpers.withMessage("O campo \xE9 obrigat\xF3rio", required)
      },
      livro_id: {
        required: helpers.withMessage("O campo \xE9 obrigat\xF3rio", required)
      }
    };
    const v$ = useVuelidate(rules, state);
    async function onSubmit() {
      if (await v$.value.$validate()) {
        const payload = { ...state };
        for (const key in payload) {
          if (payload[key] === "") {
            payload[key] = null;
          }
        }
        const payloadFormated = {
          ...payload,
          data: formatToISO(state.data)
        };
        try {
          const tokenCookie = useCookie("auth_token");
          const response = await $fetch(
            `${config.public.auth}/service/gerencia/matriculas`,
            {
              method: "POST",
              body: payloadFormated,
              // Aqui usa o payload formatado
              headers: {
                Authorization: `Bearer ${tokenCookie.value}`
              }
            }
          );
          if (response.statusCode === 500) {
            $toast.error("Erro ao cadastrar Matricula, o CPF j\xE1 est\xE1 cadastrado.");
          } else {
            $toast.success("Matricula cadastrada com sucesso!");
            const MatriculaIdValue = response.id;
            MatriculaId.value = MatriculaIdValue;
            const Matricula_token = useCookie("Matricula_token");
            Matricula_token.value = response.token;
            isEditMode.value = true;
            emit("saved");
          }
        } catch (error2) {
          console.log("Erro ao cadastrar:", error2);
          $toast.error("Erro ao cadastrar. Tente novamente.");
        }
      }
    }
    async function onUpdate() {
      const payload = { ...state };
      for (const key in payload) {
        if (payload[key] === "") {
          payload[key] = null;
        }
      }
      const payloadFormated = {
        ...payload,
        data: formatToISO(state.data)
      };
      const { data, error: error2, status: status2 } = await fetchWithToken(
        `${updateMatricula}/${MatriculaId.value}`,
        {
          method: "PUT",
          body: payloadFormated
        }
      );
      if (status2.value === "success") {
        $toast.success("Matricula atualizada com sucesso!");
        router.push("/Matriculas/lista");
        return;
      }
    }
    function voltar() {
      router.push("/matriculas/lista");
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _directive_mask = resolveDirective("mask");
      _push(`<!--[-->`);
      if (unref(pending)) {
        _push(ssrRenderComponent(VProgressCircular, {
          class: "loading-spinner",
          indeterminate: "",
          size: "64"
        }, null, _parent));
      } else if (unref(error)) {
        _push(`<div>${ssrInterpolate(unref(error).message)}</div>`);
      } else {
        _push(`<!---->`);
      }
      if (!unref(pending)) {
        _push(ssrRenderComponent(VContainer, null, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(VRow, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(VCol, { md: "6" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(VTextField, {
                            modelValue: unref(state).numero,
                            "onUpdate:modelValue": ($event) => unref(state).numero = $event,
                            "error-messages": unref(v$).numero.$errors.map((e) => e.$message),
                            label: "Matr\xEDcula",
                            required: "",
                            onBlur: unref(v$).numero.$touch,
                            onInput: unref(v$).numero.$touch
                          }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(VTextField, {
                              modelValue: unref(state).numero,
                              "onUpdate:modelValue": ($event) => unref(state).numero = $event,
                              "error-messages": unref(v$).numero.$errors.map((e) => e.$message),
                              label: "Matr\xEDcula",
                              required: "",
                              onBlur: unref(v$).numero.$touch,
                              onInput: unref(v$).numero.$touch
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages", "onBlur", "onInput"])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(VCol, { md: "4" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(VTextField, {
                            modelValue: unref(state).protocolo,
                            "onUpdate:modelValue": ($event) => unref(state).protocolo = $event,
                            label: "Protocolo",
                            required: ""
                          }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(VTextField, {
                              modelValue: unref(state).protocolo,
                              "onUpdate:modelValue": ($event) => unref(state).protocolo = $event,
                              label: "Protocolo",
                              required: ""
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(VCol, { md: "4" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(VAutocomplete, {
                            modelValue: unref(state).livro_id,
                            "onUpdate:modelValue": ($event) => unref(state).livro_id = $event,
                            "error-messages": unref(v$).situacao_id.$errors.map((e) => e.$message),
                            items: unref(dados).livroItens.data,
                            label: "Livro",
                            required: "",
                            "item-title": "descricao",
                            "item-value": "id"
                          }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(VAutocomplete, {
                              modelValue: unref(state).livro_id,
                              "onUpdate:modelValue": ($event) => unref(state).livro_id = $event,
                              "error-messages": unref(v$).situacao_id.$errors.map((e) => e.$message),
                              items: unref(dados).livroItens.data,
                              label: "Livro",
                              required: "",
                              "item-title": "descricao",
                              "item-value": "id"
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages", "items"])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(VCol, { md: "4" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(VTextField, {
                            modelValue: unref(state).folha_inicial,
                            "onUpdate:modelValue": ($event) => unref(state).folha_inicial = $event,
                            modelModifiers: { number: true },
                            label: "Folha inicial",
                            type: "number",
                            required: "",
                            min: "0"
                          }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(VTextField, {
                              modelValue: unref(state).folha_inicial,
                              "onUpdate:modelValue": ($event) => unref(state).folha_inicial = $event,
                              modelModifiers: { number: true },
                              label: "Folha inicial",
                              type: "number",
                              required: "",
                              min: "0"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(VCol, { md: "4" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(VTextField, {
                            modelValue: unref(state).folha_final,
                            "onUpdate:modelValue": ($event) => unref(state).folha_final = $event,
                            modelModifiers: { number: true },
                            label: "Folha Final",
                            type: "number",
                            required: "",
                            min: "0"
                          }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(VTextField, {
                              modelValue: unref(state).folha_final,
                              "onUpdate:modelValue": ($event) => unref(state).folha_final = $event,
                              modelModifiers: { number: true },
                              label: "Folha Final",
                              type: "number",
                              required: "",
                              min: "0"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(VCol, { md: "4" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(VTextField, mergeProps({
                            modelValue: unref(state).data,
                            "onUpdate:modelValue": ($event) => unref(state).data = $event,
                            "error-messages": unref(v$).situacao_id.$errors.map((e) => e.$message),
                            onBlur: unref(v$).numero.$touch,
                            onInput: unref(v$).numero.$touch,
                            placeholder: "dd/mm/yyyy",
                            label: "Data"
                          }, ssrGetDirectiveProps(_ctx, _directive_mask, "##/##/####")), null, _parent4, _scopeId3));
                        } else {
                          return [
                            withDirectives(createVNode(VTextField, {
                              modelValue: unref(state).data,
                              "onUpdate:modelValue": ($event) => unref(state).data = $event,
                              "error-messages": unref(v$).situacao_id.$errors.map((e) => e.$message),
                              onBlur: unref(v$).numero.$touch,
                              onInput: unref(v$).numero.$touch,
                              placeholder: "dd/mm/yyyy",
                              label: "Data"
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages", "onBlur", "onInput"]), [
                              [_directive_mask, "##/##/####"]
                            ])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(VCol, { md: "4" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(VAutocomplete, {
                            modelValue: unref(state).situacao_id,
                            "onUpdate:modelValue": ($event) => unref(state).situacao_id = $event,
                            "error-messages": unref(v$).situacao_id.$errors.map((e) => e.$message),
                            items: unref(dados).situacaoItens,
                            label: "Situa\xE7\xE3o",
                            required: "",
                            onBlur: unref(v$).situacao_id.$touch,
                            onInput: unref(v$).situacao_id.$touch,
                            "item-title": "descricao",
                            "item-value": "id"
                          }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(VAutocomplete, {
                              modelValue: unref(state).situacao_id,
                              "onUpdate:modelValue": ($event) => unref(state).situacao_id = $event,
                              "error-messages": unref(v$).situacao_id.$errors.map((e) => e.$message),
                              items: unref(dados).situacaoItens,
                              label: "Situa\xE7\xE3o",
                              required: "",
                              onBlur: unref(v$).situacao_id.$touch,
                              onInput: unref(v$).situacao_id.$touch,
                              "item-title": "descricao",
                              "item-value": "id"
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages", "items", "onBlur", "onInput"])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(VCol, { md: "4" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(VTextField, {
                            modelValue: unref(state).descricao,
                            "onUpdate:modelValue": ($event) => unref(state).descricao = $event,
                            "error-messages": unref(v$).situacao_id.$errors.map((e) => e.$message),
                            label: "Descri\xE7\xE3o",
                            required: ""
                          }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(VTextField, {
                              modelValue: unref(state).descricao,
                              "onUpdate:modelValue": ($event) => unref(state).descricao = $event,
                              "error-messages": unref(v$).situacao_id.$errors.map((e) => e.$message),
                              label: "Descri\xE7\xE3o",
                              required: ""
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(VCol, { md: "4" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(VTextField, {
                            modelValue: unref(state).cnm,
                            "onUpdate:modelValue": ($event) => unref(state).cnm = $event,
                            label: "CNM",
                            required: ""
                          }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(VTextField, {
                              modelValue: unref(state).cnm,
                              "onUpdate:modelValue": ($event) => unref(state).cnm = $event,
                              label: "CNM",
                              required: ""
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(VCol, { md: "4" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(VTextField, {
                            modelValue: unref(state).observacao,
                            "onUpdate:modelValue": ($event) => unref(state).observacao = $event,
                            label: "Observa\xE7\xE3o",
                            required: ""
                          }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(VTextField, {
                              modelValue: unref(state).observacao,
                              "onUpdate:modelValue": ($event) => unref(state).observacao = $event,
                              label: "Observa\xE7\xE3o",
                              required: ""
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(VCol, { md: "6" }, {
                        default: withCtx(() => [
                          createVNode(VTextField, {
                            modelValue: unref(state).numero,
                            "onUpdate:modelValue": ($event) => unref(state).numero = $event,
                            "error-messages": unref(v$).numero.$errors.map((e) => e.$message),
                            label: "Matr\xEDcula",
                            required: "",
                            onBlur: unref(v$).numero.$touch,
                            onInput: unref(v$).numero.$touch
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages", "onBlur", "onInput"])
                        ]),
                        _: 1
                      }),
                      createVNode(VCol, { md: "4" }, {
                        default: withCtx(() => [
                          createVNode(VTextField, {
                            modelValue: unref(state).protocolo,
                            "onUpdate:modelValue": ($event) => unref(state).protocolo = $event,
                            label: "Protocolo",
                            required: ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        _: 1
                      }),
                      createVNode(VCol, { md: "4" }, {
                        default: withCtx(() => [
                          createVNode(VAutocomplete, {
                            modelValue: unref(state).livro_id,
                            "onUpdate:modelValue": ($event) => unref(state).livro_id = $event,
                            "error-messages": unref(v$).situacao_id.$errors.map((e) => e.$message),
                            items: unref(dados).livroItens.data,
                            label: "Livro",
                            required: "",
                            "item-title": "descricao",
                            "item-value": "id"
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages", "items"])
                        ]),
                        _: 1
                      }),
                      createVNode(VCol, { md: "4" }, {
                        default: withCtx(() => [
                          createVNode(VTextField, {
                            modelValue: unref(state).folha_inicial,
                            "onUpdate:modelValue": ($event) => unref(state).folha_inicial = $event,
                            modelModifiers: { number: true },
                            label: "Folha inicial",
                            type: "number",
                            required: "",
                            min: "0"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        _: 1
                      }),
                      createVNode(VCol, { md: "4" }, {
                        default: withCtx(() => [
                          createVNode(VTextField, {
                            modelValue: unref(state).folha_final,
                            "onUpdate:modelValue": ($event) => unref(state).folha_final = $event,
                            modelModifiers: { number: true },
                            label: "Folha Final",
                            type: "number",
                            required: "",
                            min: "0"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        _: 1
                      }),
                      createVNode(VCol, { md: "4" }, {
                        default: withCtx(() => [
                          withDirectives(createVNode(VTextField, {
                            modelValue: unref(state).data,
                            "onUpdate:modelValue": ($event) => unref(state).data = $event,
                            "error-messages": unref(v$).situacao_id.$errors.map((e) => e.$message),
                            onBlur: unref(v$).numero.$touch,
                            onInput: unref(v$).numero.$touch,
                            placeholder: "dd/mm/yyyy",
                            label: "Data"
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages", "onBlur", "onInput"]), [
                            [_directive_mask, "##/##/####"]
                          ])
                        ]),
                        _: 1
                      }),
                      createVNode(VCol, { md: "4" }, {
                        default: withCtx(() => [
                          createVNode(VAutocomplete, {
                            modelValue: unref(state).situacao_id,
                            "onUpdate:modelValue": ($event) => unref(state).situacao_id = $event,
                            "error-messages": unref(v$).situacao_id.$errors.map((e) => e.$message),
                            items: unref(dados).situacaoItens,
                            label: "Situa\xE7\xE3o",
                            required: "",
                            onBlur: unref(v$).situacao_id.$touch,
                            onInput: unref(v$).situacao_id.$touch,
                            "item-title": "descricao",
                            "item-value": "id"
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages", "items", "onBlur", "onInput"])
                        ]),
                        _: 1
                      }),
                      createVNode(VCol, { md: "4" }, {
                        default: withCtx(() => [
                          createVNode(VTextField, {
                            modelValue: unref(state).descricao,
                            "onUpdate:modelValue": ($event) => unref(state).descricao = $event,
                            "error-messages": unref(v$).situacao_id.$errors.map((e) => e.$message),
                            label: "Descri\xE7\xE3o",
                            required: ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"])
                        ]),
                        _: 1
                      }),
                      createVNode(VCol, { md: "4" }, {
                        default: withCtx(() => [
                          createVNode(VTextField, {
                            modelValue: unref(state).cnm,
                            "onUpdate:modelValue": ($event) => unref(state).cnm = $event,
                            label: "CNM",
                            required: ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        _: 1
                      }),
                      createVNode(VCol, { md: "4" }, {
                        default: withCtx(() => [
                          createVNode(VTextField, {
                            modelValue: unref(state).observacao,
                            "onUpdate:modelValue": ($event) => unref(state).observacao = $event,
                            label: "Observa\xE7\xE3o",
                            required: ""
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
                    _push3(ssrRenderComponent(VBtn, {
                      onClick: voltar,
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
                    _push3(ssrRenderComponent(VBtn, {
                      onClick: ($event) => unref(isEditMode) ? onUpdate() : onSubmit(),
                      class: "ml-4",
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
                      createVNode(VBtn, {
                        onClick: voltar,
                        size: "large",
                        color: "red"
                      }, {
                        default: withCtx(() => [
                          createTextVNode("Voltar")
                        ]),
                        _: 1
                      }),
                      createVNode(VBtn, {
                        onClick: ($event) => unref(isEditMode) ? onUpdate() : onSubmit(),
                        class: "ml-4",
                        size: "large",
                        color: "green"
                      }, {
                        default: withCtx(() => [
                          createTextVNode("Salvar")
                        ]),
                        _: 1
                      }, 8, ["onClick"])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(VRow, null, {
                  default: withCtx(() => [
                    createVNode(VCol, { md: "6" }, {
                      default: withCtx(() => [
                        createVNode(VTextField, {
                          modelValue: unref(state).numero,
                          "onUpdate:modelValue": ($event) => unref(state).numero = $event,
                          "error-messages": unref(v$).numero.$errors.map((e) => e.$message),
                          label: "Matr\xEDcula",
                          required: "",
                          onBlur: unref(v$).numero.$touch,
                          onInput: unref(v$).numero.$touch
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages", "onBlur", "onInput"])
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, { md: "4" }, {
                      default: withCtx(() => [
                        createVNode(VTextField, {
                          modelValue: unref(state).protocolo,
                          "onUpdate:modelValue": ($event) => unref(state).protocolo = $event,
                          label: "Protocolo",
                          required: ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, { md: "4" }, {
                      default: withCtx(() => [
                        createVNode(VAutocomplete, {
                          modelValue: unref(state).livro_id,
                          "onUpdate:modelValue": ($event) => unref(state).livro_id = $event,
                          "error-messages": unref(v$).situacao_id.$errors.map((e) => e.$message),
                          items: unref(dados).livroItens.data,
                          label: "Livro",
                          required: "",
                          "item-title": "descricao",
                          "item-value": "id"
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages", "items"])
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, { md: "4" }, {
                      default: withCtx(() => [
                        createVNode(VTextField, {
                          modelValue: unref(state).folha_inicial,
                          "onUpdate:modelValue": ($event) => unref(state).folha_inicial = $event,
                          modelModifiers: { number: true },
                          label: "Folha inicial",
                          type: "number",
                          required: "",
                          min: "0"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, { md: "4" }, {
                      default: withCtx(() => [
                        createVNode(VTextField, {
                          modelValue: unref(state).folha_final,
                          "onUpdate:modelValue": ($event) => unref(state).folha_final = $event,
                          modelModifiers: { number: true },
                          label: "Folha Final",
                          type: "number",
                          required: "",
                          min: "0"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, { md: "4" }, {
                      default: withCtx(() => [
                        withDirectives(createVNode(VTextField, {
                          modelValue: unref(state).data,
                          "onUpdate:modelValue": ($event) => unref(state).data = $event,
                          "error-messages": unref(v$).situacao_id.$errors.map((e) => e.$message),
                          onBlur: unref(v$).numero.$touch,
                          onInput: unref(v$).numero.$touch,
                          placeholder: "dd/mm/yyyy",
                          label: "Data"
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages", "onBlur", "onInput"]), [
                          [_directive_mask, "##/##/####"]
                        ])
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, { md: "4" }, {
                      default: withCtx(() => [
                        createVNode(VAutocomplete, {
                          modelValue: unref(state).situacao_id,
                          "onUpdate:modelValue": ($event) => unref(state).situacao_id = $event,
                          "error-messages": unref(v$).situacao_id.$errors.map((e) => e.$message),
                          items: unref(dados).situacaoItens,
                          label: "Situa\xE7\xE3o",
                          required: "",
                          onBlur: unref(v$).situacao_id.$touch,
                          onInput: unref(v$).situacao_id.$touch,
                          "item-title": "descricao",
                          "item-value": "id"
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages", "items", "onBlur", "onInput"])
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, { md: "4" }, {
                      default: withCtx(() => [
                        createVNode(VTextField, {
                          modelValue: unref(state).descricao,
                          "onUpdate:modelValue": ($event) => unref(state).descricao = $event,
                          "error-messages": unref(v$).situacao_id.$errors.map((e) => e.$message),
                          label: "Descri\xE7\xE3o",
                          required: ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "error-messages"])
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, { md: "4" }, {
                      default: withCtx(() => [
                        createVNode(VTextField, {
                          modelValue: unref(state).cnm,
                          "onUpdate:modelValue": ($event) => unref(state).cnm = $event,
                          label: "CNM",
                          required: ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, { md: "4" }, {
                      default: withCtx(() => [
                        createVNode(VTextField, {
                          modelValue: unref(state).observacao,
                          "onUpdate:modelValue": ($event) => unref(state).observacao = $event,
                          label: "Observa\xE7\xE3o",
                          required: ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                createVNode(VRow, { class: "mb-3" }, {
                  default: withCtx(() => [
                    createVNode(VBtn, {
                      onClick: voltar,
                      size: "large",
                      color: "red"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Voltar")
                      ]),
                      _: 1
                    }),
                    createVNode(VBtn, {
                      onClick: ($event) => unref(isEditMode) ? onUpdate() : onSubmit(),
                      class: "ml-4",
                      size: "large",
                      color: "green"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Salvar")
                      ]),
                      _: 1
                    }, 8, ["onClick"])
                  ]),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/DadosMatricula.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : undefined;
};
const _sfc_main$1 = {
  __name: "EnderecoMatricula",
  __ssrInlineRender: true,
  emits: ["saved", "close-modal"],
  async setup(__props, { emit: __emit }) {
    let __temp, __restore;
    const emit = __emit;
    const router = useRouter$1();
    const config = useRuntimeConfig();
    const { $toast } = useNuxtApp();
    const isEditMode = ref(false);
    const MatriculaId = useCookie("Matricula-id");
    const situacao = `${config.public.auth}/service/gerencia/listar_situacao_matriculas`;
    const naturezaImoveis = `${config.public.auth}/service/gerencia/natureza_imoveis`;
    const tipoLogradouros = `${config.public.auth}/service/gerencia/tipo_logradouros`;
    const cidades = `${config.public.auth}/service/gerencia/listarCidades`;
    const livro = `${config.public.auth}/service/gerencia/livro`;
    const {
      data: dados,
      status,
      pending,
      error
    } = ([__temp, __restore] = withAsyncContext(async () => useLazyAsyncData("cliente-dados", async () => {
      const tokenCookie = useCookie("auth_token");
      try {
        const [
          situacaoItens,
          naturezaImoveisItens,
          tipoLogradouroItens,
          cidadesItens,
          livroItens
        ] = await Promise.all([
          $fetch(`${situacao}`, {
            method: "POST",
            body: {
              cartorio_token: useCookie("user-data").value.cartorio_token
            },
            headers: {
              Authorization: `Bearer ${tokenCookie.value}`
            }
          }),
          $fetch(`${naturezaImoveis}`, {
            headers: {
              Authorization: `Bearer ${tokenCookie.value}`
            }
          }),
          $fetch(`${tipoLogradouros}`, {
            headers: {
              Authorization: `Bearer ${tokenCookie.value}`
            }
          }),
          $fetch(`${cidades}`, {
            headers: {
              Authorization: `Bearer ${tokenCookie.value}`
            }
          }),
          $fetch(`${livro}`, {
            headers: {
              Authorization: `Bearer ${tokenCookie.value}`
            }
          })
        ]);
        return {
          situacaoItens,
          naturezaImoveisItens,
          tipoLogradouroItens,
          cidadesItens,
          livroItens
        };
      } catch (error2) {
        console.error("Erro ao carregar dados:", error2);
        return {
          situacaoItens: [],
          naturezaImoveisItens: [],
          tipoLogradouroItens: [],
          cidadesItens: [],
          livroItens: []
        };
      }
    })), __temp = await __temp, __restore(), __temp);
    const state = reactive({
      inscricao_municipal: null,
      situacao_id: null,
      tabvalores_natureza_id: null,
      tabvalores_tipologradouro_id: null,
      end_logradouro: null,
      end_logradouro_numero: null,
      end_bairro: null,
      end_cidade_id: null,
      end_cep: null,
      end_complemento: null,
      end_quadra: null,
      end_lote: null,
      folha_inicial: null,
      folha_final: null,
      cartorio_id: useCookie("user-data").value.cartorio_id,
      user_id: useCookie("user-data").value.usuario_id
    });
    function removeFormatting(value) {
      if (value) {
        return value.replace(/[.\-]/g, "");
      } else {
        value = null;
      }
    }
    async function onSubmit() {
      const payload = { ...state };
      for (const key in payload) {
        if (payload[key] === "") {
          payload[key] = null;
        }
      }
      const payloadFormated = {
        ...payload,
        doc_identificacao: removeFormatting(state.doc_identificacao),
        cpf_pai: removeFormatting(state.cpf_pai),
        cpf_mae: removeFormatting(state.cpf_mae)
      };
      try {
        const tokenCookie = useCookie("auth_token");
        const response = await $fetch(
          `${config.public.auth}/service/gerencia/matriculas`,
          {
            method: "POST",
            body: payloadFormated,
            headers: {
              Authorization: `Bearer ${tokenCookie.value}`
            }
          }
        );
        if (response.statusCode === 500) {
          $toast.error("Erro ao cadastrar Matricula, o CPF j\xE1 est\xE1 cadastrado.");
        } else {
          $toast.success("Matricula cadastrada com sucesso!");
          const MatriculaIdValue = response.id;
          MatriculaId.value = MatriculaIdValue;
          const Matricula_token = useCookie("Matricula_token");
          Matricula_token.value = response.token;
          isEditMode.value = true;
          emit("saved");
        }
      } catch (error2) {
        console.log("Erro ao cadastrar:", error2);
        $toast.error("Erro ao cadastrar. Tente novamente.");
      }
    }
    async function onUpdate() {
      const payload = { ...state };
      for (const key in payload) {
        if (payload[key] === "") {
          payload[key] = null;
        }
      }
      const payloadFormated = {
        ...payload,
        doc_identificacao: removeFormatting(state.doc_identificacao),
        cpf_mae: removeFormatting(state.cpf_mae)
      };
      const { data, error: error2, status: status2 } = await fetchWithToken(
        `${updateMatricula}/${MatriculaId.value}`,
        {
          method: "PUT",
          body: payloadFormated
        }
      );
      if (status2.value === "success") {
        $toast.success("Matricula atualizada com sucesso!");
        router.push("/Matriculas/lista");
        return;
      }
    }
    function voltar() {
      router.push("/matriculas/lista");
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(VContainer, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VRow, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VCol, { md: "4" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VTextField, {
                          modelValue: unref(state).inscricao_municipal,
                          "onUpdate:modelValue": ($event) => unref(state).inscricao_municipal = $event,
                          label: "Inscri\xE7\xE3o Municipal",
                          required: ""
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VTextField, {
                            modelValue: unref(state).inscricao_municipal,
                            "onUpdate:modelValue": ($event) => unref(state).inscricao_municipal = $event,
                            label: "Inscri\xE7\xE3o Municipal",
                            required: ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VCol, { md: "4" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VAutocomplete, {
                          modelValue: unref(state).tabvalores_natureza_id,
                          "onUpdate:modelValue": ($event) => unref(state).tabvalores_natureza_id = $event,
                          items: unref(dados).naturezaImoveisItens,
                          label: "Natureza Imovel",
                          "item-title": "descricao",
                          "item-value": "id"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VAutocomplete, {
                            modelValue: unref(state).tabvalores_natureza_id,
                            "onUpdate:modelValue": ($event) => unref(state).tabvalores_natureza_id = $event,
                            items: unref(dados).naturezaImoveisItens,
                            label: "Natureza Imovel",
                            "item-title": "descricao",
                            "item-value": "id"
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VCol, { md: "4" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VAutocomplete, {
                          modelValue: unref(state).tabvalores_tipologradouro_id,
                          "onUpdate:modelValue": ($event) => unref(state).tabvalores_tipologradouro_id = $event,
                          items: unref(dados).tipoLogradouroItens,
                          label: "Tipo de Logradouro",
                          "item-title": "descricao",
                          "item-value": "id"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VAutocomplete, {
                            modelValue: unref(state).tabvalores_tipologradouro_id,
                            "onUpdate:modelValue": ($event) => unref(state).tabvalores_tipologradouro_id = $event,
                            items: unref(dados).tipoLogradouroItens,
                            label: "Tipo de Logradouro",
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
                    createVNode(VCol, { md: "4" }, {
                      default: withCtx(() => [
                        createVNode(VTextField, {
                          modelValue: unref(state).inscricao_municipal,
                          "onUpdate:modelValue": ($event) => unref(state).inscricao_municipal = $event,
                          label: "Inscri\xE7\xE3o Municipal",
                          required: ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, { md: "4" }, {
                      default: withCtx(() => [
                        createVNode(VAutocomplete, {
                          modelValue: unref(state).tabvalores_natureza_id,
                          "onUpdate:modelValue": ($event) => unref(state).tabvalores_natureza_id = $event,
                          items: unref(dados).naturezaImoveisItens,
                          label: "Natureza Imovel",
                          "item-title": "descricao",
                          "item-value": "id"
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, { md: "4" }, {
                      default: withCtx(() => [
                        createVNode(VAutocomplete, {
                          modelValue: unref(state).tabvalores_tipologradouro_id,
                          "onUpdate:modelValue": ($event) => unref(state).tabvalores_tipologradouro_id = $event,
                          items: unref(dados).tipoLogradouroItens,
                          label: "Tipo de Logradouro",
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
                  _push3(ssrRenderComponent(VCol, { md: "4" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VTextField, {
                          modelValue: unref(state).end_logradouro,
                          "onUpdate:modelValue": ($event) => unref(state).end_logradouro = $event,
                          label: "Endere\xE7o",
                          required: ""
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VTextField, {
                            modelValue: unref(state).end_logradouro,
                            "onUpdate:modelValue": ($event) => unref(state).end_logradouro = $event,
                            label: "Endere\xE7o",
                            required: ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VCol, { md: "4" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VTextField, {
                          modelValue: unref(state).end_logradouro_numero,
                          "onUpdate:modelValue": ($event) => unref(state).end_logradouro_numero = $event,
                          label: "Numero",
                          required: ""
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VTextField, {
                            modelValue: unref(state).end_logradouro_numero,
                            "onUpdate:modelValue": ($event) => unref(state).end_logradouro_numero = $event,
                            label: "Numero",
                            required: ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VCol, { md: "4" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VTextField, {
                          modelValue: unref(state).end_bairro,
                          "onUpdate:modelValue": ($event) => unref(state).end_bairro = $event,
                          label: "Bairro",
                          required: ""
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VTextField, {
                            modelValue: unref(state).end_bairro,
                            "onUpdate:modelValue": ($event) => unref(state).end_bairro = $event,
                            label: "Bairro",
                            required: ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VCol, { md: "4" }, {
                      default: withCtx(() => [
                        createVNode(VTextField, {
                          modelValue: unref(state).end_logradouro,
                          "onUpdate:modelValue": ($event) => unref(state).end_logradouro = $event,
                          label: "Endere\xE7o",
                          required: ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, { md: "4" }, {
                      default: withCtx(() => [
                        createVNode(VTextField, {
                          modelValue: unref(state).end_logradouro_numero,
                          "onUpdate:modelValue": ($event) => unref(state).end_logradouro_numero = $event,
                          label: "Numero",
                          required: ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, { md: "4" }, {
                      default: withCtx(() => [
                        createVNode(VTextField, {
                          modelValue: unref(state).end_bairro,
                          "onUpdate:modelValue": ($event) => unref(state).end_bairro = $event,
                          label: "Bairro",
                          required: ""
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
                  _push3(ssrRenderComponent(VCol, { md: "4" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VAutocomplete, {
                          modelValue: unref(state).end_cidade_id,
                          "onUpdate:modelValue": ($event) => unref(state).end_cidade_id = $event,
                          items: unref(dados).cidadesItens,
                          label: "Cidade",
                          "item-title": "descricao",
                          "item-value": "id"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VAutocomplete, {
                            modelValue: unref(state).end_cidade_id,
                            "onUpdate:modelValue": ($event) => unref(state).end_cidade_id = $event,
                            items: unref(dados).cidadesItens,
                            label: "Cidade",
                            "item-title": "descricao",
                            "item-value": "id"
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VCol, { md: "4" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VTextField, {
                          modelValue: unref(state).end_cep,
                          "onUpdate:modelValue": ($event) => unref(state).end_cep = $event,
                          label: "CEP",
                          required: ""
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VTextField, {
                            modelValue: unref(state).end_cep,
                            "onUpdate:modelValue": ($event) => unref(state).end_cep = $event,
                            label: "CEP",
                            required: ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VCol, { md: "4" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VTextField, {
                          modelValue: unref(state).end_complemento,
                          "onUpdate:modelValue": ($event) => unref(state).end_complemento = $event,
                          label: "Complemento",
                          required: ""
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VTextField, {
                            modelValue: unref(state).end_complemento,
                            "onUpdate:modelValue": ($event) => unref(state).end_complemento = $event,
                            label: "Complemento",
                            required: ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VCol, { md: "4" }, {
                      default: withCtx(() => [
                        createVNode(VAutocomplete, {
                          modelValue: unref(state).end_cidade_id,
                          "onUpdate:modelValue": ($event) => unref(state).end_cidade_id = $event,
                          items: unref(dados).cidadesItens,
                          label: "Cidade",
                          "item-title": "descricao",
                          "item-value": "id"
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, { md: "4" }, {
                      default: withCtx(() => [
                        createVNode(VTextField, {
                          modelValue: unref(state).end_cep,
                          "onUpdate:modelValue": ($event) => unref(state).end_cep = $event,
                          label: "CEP",
                          required: ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, { md: "4" }, {
                      default: withCtx(() => [
                        createVNode(VTextField, {
                          modelValue: unref(state).end_complemento,
                          "onUpdate:modelValue": ($event) => unref(state).end_complemento = $event,
                          label: "Complemento",
                          required: ""
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
                  _push3(ssrRenderComponent(VCol, { md: "4" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VTextField, {
                          modelValue: unref(state).end_quadra,
                          "onUpdate:modelValue": ($event) => unref(state).end_quadra = $event,
                          label: "Quadra",
                          required: ""
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VTextField, {
                            modelValue: unref(state).end_quadra,
                            "onUpdate:modelValue": ($event) => unref(state).end_quadra = $event,
                            label: "Quadra",
                            required: ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VCol, { md: "4" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VTextField, {
                          modelValue: unref(state).end_lote,
                          "onUpdate:modelValue": ($event) => unref(state).end_lote = $event,
                          label: "Lote",
                          required: ""
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VTextField, {
                            modelValue: unref(state).end_lote,
                            "onUpdate:modelValue": ($event) => unref(state).end_lote = $event,
                            label: "Lote",
                            required: ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VCol, { md: "4" }, {
                      default: withCtx(() => [
                        createVNode(VTextField, {
                          modelValue: unref(state).end_quadra,
                          "onUpdate:modelValue": ($event) => unref(state).end_quadra = $event,
                          label: "Quadra",
                          required: ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, { md: "4" }, {
                      default: withCtx(() => [
                        createVNode(VTextField, {
                          modelValue: unref(state).end_lote,
                          "onUpdate:modelValue": ($event) => unref(state).end_lote = $event,
                          label: "Lote",
                          required: ""
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
                  _push3(ssrRenderComponent(VBtn, {
                    onClick: voltar,
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
                  _push3(ssrRenderComponent(VBtn, {
                    onClick: ($event) => unref(isEditMode) ? onUpdate() : onSubmit(),
                    class: "ml-4",
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
                    createVNode(VBtn, {
                      onClick: voltar,
                      size: "large",
                      color: "red"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Voltar")
                      ]),
                      _: 1
                    }),
                    createVNode(VBtn, {
                      onClick: ($event) => unref(isEditMode) ? onUpdate() : onSubmit(),
                      class: "ml-4",
                      size: "large",
                      color: "green"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Salvar")
                      ]),
                      _: 1
                    }, 8, ["onClick"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(VRow, null, {
                default: withCtx(() => [
                  createVNode(VCol, { md: "4" }, {
                    default: withCtx(() => [
                      createVNode(VTextField, {
                        modelValue: unref(state).inscricao_municipal,
                        "onUpdate:modelValue": ($event) => unref(state).inscricao_municipal = $event,
                        label: "Inscri\xE7\xE3o Municipal",
                        required: ""
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(VCol, { md: "4" }, {
                    default: withCtx(() => [
                      createVNode(VAutocomplete, {
                        modelValue: unref(state).tabvalores_natureza_id,
                        "onUpdate:modelValue": ($event) => unref(state).tabvalores_natureza_id = $event,
                        items: unref(dados).naturezaImoveisItens,
                        label: "Natureza Imovel",
                        "item-title": "descricao",
                        "item-value": "id"
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                    ]),
                    _: 1
                  }),
                  createVNode(VCol, { md: "4" }, {
                    default: withCtx(() => [
                      createVNode(VAutocomplete, {
                        modelValue: unref(state).tabvalores_tipologradouro_id,
                        "onUpdate:modelValue": ($event) => unref(state).tabvalores_tipologradouro_id = $event,
                        items: unref(dados).tipoLogradouroItens,
                        label: "Tipo de Logradouro",
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
                  createVNode(VCol, { md: "4" }, {
                    default: withCtx(() => [
                      createVNode(VTextField, {
                        modelValue: unref(state).end_logradouro,
                        "onUpdate:modelValue": ($event) => unref(state).end_logradouro = $event,
                        label: "Endere\xE7o",
                        required: ""
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(VCol, { md: "4" }, {
                    default: withCtx(() => [
                      createVNode(VTextField, {
                        modelValue: unref(state).end_logradouro_numero,
                        "onUpdate:modelValue": ($event) => unref(state).end_logradouro_numero = $event,
                        label: "Numero",
                        required: ""
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(VCol, { md: "4" }, {
                    default: withCtx(() => [
                      createVNode(VTextField, {
                        modelValue: unref(state).end_bairro,
                        "onUpdate:modelValue": ($event) => unref(state).end_bairro = $event,
                        label: "Bairro",
                        required: ""
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(VRow, null, {
                default: withCtx(() => [
                  createVNode(VCol, { md: "4" }, {
                    default: withCtx(() => [
                      createVNode(VAutocomplete, {
                        modelValue: unref(state).end_cidade_id,
                        "onUpdate:modelValue": ($event) => unref(state).end_cidade_id = $event,
                        items: unref(dados).cidadesItens,
                        label: "Cidade",
                        "item-title": "descricao",
                        "item-value": "id"
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                    ]),
                    _: 1
                  }),
                  createVNode(VCol, { md: "4" }, {
                    default: withCtx(() => [
                      createVNode(VTextField, {
                        modelValue: unref(state).end_cep,
                        "onUpdate:modelValue": ($event) => unref(state).end_cep = $event,
                        label: "CEP",
                        required: ""
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(VCol, { md: "4" }, {
                    default: withCtx(() => [
                      createVNode(VTextField, {
                        modelValue: unref(state).end_complemento,
                        "onUpdate:modelValue": ($event) => unref(state).end_complemento = $event,
                        label: "Complemento",
                        required: ""
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(VRow, null, {
                default: withCtx(() => [
                  createVNode(VCol, { md: "4" }, {
                    default: withCtx(() => [
                      createVNode(VTextField, {
                        modelValue: unref(state).end_quadra,
                        "onUpdate:modelValue": ($event) => unref(state).end_quadra = $event,
                        label: "Quadra",
                        required: ""
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(VCol, { md: "4" }, {
                    default: withCtx(() => [
                      createVNode(VTextField, {
                        modelValue: unref(state).end_lote,
                        "onUpdate:modelValue": ($event) => unref(state).end_lote = $event,
                        label: "Lote",
                        required: ""
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(VRow, { class: "mb-3" }, {
                default: withCtx(() => [
                  createVNode(VBtn, {
                    onClick: voltar,
                    size: "large",
                    color: "red"
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Voltar")
                    ]),
                    _: 1
                  }),
                  createVNode(VBtn, {
                    onClick: ($event) => unref(isEditMode) ? onUpdate() : onSubmit(),
                    class: "ml-4",
                    size: "large",
                    color: "green"
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Salvar")
                    ]),
                    _: 1
                  }, 8, ["onClick"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/EnderecoMatricula.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : undefined;
};
const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const tab = ref("dados");
    const showTabs = ref(false);
    const autocompleteDisabled = ref(false);
    const handleSave = () => {
      showTabs.value = true;
      autocompleteDisabled.value = true;
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_DadosMatricula = _sfc_main$2;
      const _component_EnderecoMatricula = _sfc_main$1;
      _push(ssrRenderComponent(VCard, mergeProps({ width: "1300" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h1 style="${ssrRenderStyle({ "background-color": "#f5f2f2", "color": "#525050", "padding": "5px 0px 0px 20px" })}"${_scopeId}> Cadastramento de Matriculas </h1>`);
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
                  if (unref(showTabs)) {
                    _push3(ssrRenderComponent(VTab, { value: "endereco" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`Endere\xE7o`);
                        } else {
                          return [
                            createTextVNode("Endere\xE7o")
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
                      value: "endereco"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Endere\xE7o")
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
                        _push4(ssrRenderComponent(_component_DadosMatricula, { onSaved: handleSave }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_DadosMatricula, { onSaved: handleSave })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  if (unref(showTabs)) {
                    _push3(ssrRenderComponent(VTabsWindowItem, { value: "endereco" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_component_EnderecoMatricula, null, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_component_EnderecoMatricula)
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
                        createVNode(_component_DadosMatricula, { onSaved: handleSave })
                      ]),
                      _: 1
                    }),
                    unref(showTabs) ? (openBlock(), createBlock(VTabsWindowItem, {
                      key: 0,
                      value: "endereco"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_EnderecoMatricula)
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
              createVNode("h1", { style: { "background-color": "#f5f2f2", "color": "#525050", "padding": "5px 0px 0px 20px" } }, " Cadastramento de Matriculas "),
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
                  unref(showTabs) ? (openBlock(), createBlock(VTab, {
                    key: 0,
                    value: "endereco"
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Endere\xE7o")
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
                      createVNode(_component_DadosMatricula, { onSaved: handleSave })
                    ]),
                    _: 1
                  }),
                  unref(showTabs) ? (openBlock(), createBlock(VTabsWindowItem, {
                    key: 0,
                    value: "endereco"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_EnderecoMatricula)
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
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/matriculas/cadastro/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : undefined;
};

export { _sfc_main as default };
//# sourceMappingURL=index-Cssbnt07.mjs.map
