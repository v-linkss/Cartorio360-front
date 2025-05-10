import { _ as __nuxt_component_0 } from './nuxt-link-TpvcaGEw.mjs';
import { _ as _sfc_main$1 } from './FichaCard-DmDgMWr3.mjs';
import { ref, withAsyncContext, computed, unref, mergeProps, withCtx, createVNode, isRef, createTextVNode, toDisplayString, openBlock, createBlock, createCommentVNode, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderStyle, ssrRenderAttr, ssrInterpolate } from 'vue/server-renderer';
import { _ as _imports_0 } from './novo-CWU3oYa5.mjs';
import { _ as _imports_1 } from './visualizar-BoZ30DMV.mjs';
import { _ as _imports_2 } from './visualizar-vermelho-Ly_aKn8Z.mjs';
import { _ as _imports_1$1 } from './editar-BcGPsVK2.mjs';
import { _ as _imports_2$1, a as _imports_3 } from './excluido-ceRs5bdR.mjs';
import { u as useRouter$1, V as VTextField, c as useRuntimeConfig, e as useCookie } from './server.mjs';
import { f as fetchWithToken } from './fetchWithToken-C8MltWUJ.mjs';
import { u as useFetch } from './fetch-pt4nsUe7.mjs';
import { V as VContainer } from './VContainer-DT30lSDe.mjs';
import { V as VRow } from './VRow-DlYJpeem.mjs';
import { V as VDataTable } from './VDataTable-C86S73KO.mjs';
import '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:fs';
import 'node:url';
import 'node:path';
import './VDialog-C710R8ST.mjs';
import './VCard-BqP110Fm.mjs';
import './VAvatar-BqhB4Z7D.mjs';
import './VResponsive-BWsCuDwY.mjs';
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
import './filter-cWQ1Yonf.mjs';
import './VList-D7gG12Ur.mjs';

const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const config = useRuntimeConfig();
    const pessoasLista = `${config.public.auth}/service/gerencia/getAllPessoa`;
    const pessoasUpdate = `${config.public.auth}/service/gerencia/updatePessoa`;
    const baixarDocumento = `${config.public.managemant}/download`;
    const isModalFichaOpen = ref(false);
    const linkFichaPessoa = ref(null);
    const pathFichaPessoa = ref(null);
    const pessoaObj = ref({});
    const router = useRouter$1();
    const search = ref("");
    const searchDoc = ref("");
    const searchCartao = ref("");
    const headers = [
      { title: "Documento", value: "doc_identificacao", width: "190px" },
      { title: "Cart\xE3o", value: "numero_ficha" },
      { title: "Nome/Raz\xE3o Social", value: "nome", width: "400px" },
      { value: "actions" }
    ];
    const { data: pessoasItems, status } = ([__temp, __restore] = withAsyncContext(() => fetchWithToken(
      `${pessoasLista}?pageNumber=${1}&pageSize=${1e6}`
    )), __temp = await __temp, __restore(), __temp);
    const filteredPessoas = computed(() => {
      const normalizeText = (text) => String(text || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      return pessoasItems.value.data.filter((item) => {
        const docIdentificacao = normalizeText(item.doc_identificacao);
        const nome = normalizeText(item.nome);
        const numeroFicha = normalizeText(String(item.numero_ficha));
        const matchesDoc = docIdentificacao.includes(
          normalizeText(searchDoc.value)
        );
        const matchesNome = nome.includes(normalizeText(search.value));
        const matchesCartao = numeroFicha.includes(
          normalizeText(String(searchCartao.value))
          // Convertendo número para string
        );
        return matchesDoc && matchesNome && matchesCartao;
      });
    });
    function formatDoc(doc) {
      if (!doc) return "";
      const cleaned = doc.replace(/\D/g, "");
      if (cleaned.length === 11) {
        return cleaned.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
      } else if (cleaned.length === 14) {
        return cleaned.replace(
          /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
          "$1.$2.$3/$4-$5"
        );
      }
      return doc;
    }
    const openModalFicha = async (link, objeto) => {
      isModalFichaOpen.value = true;
      const { data: linkUrl } = await useFetch(baixarDocumento, {
        method: "POST",
        body: {
          bucket: useCookie("user-data").value.cartorio_token,
          path: link
        }
      }, "$Jxa9V4cJXG");
      linkFichaPessoa.value = linkUrl.value;
      pathFichaPessoa.value = link;
      pessoaObj.value = objeto;
    };
    async function deletePessoa(item) {
      item.excluido = !item.excluido;
      try {
        await fetchWithToken(`${pessoasUpdate}/${item.id}`, {
          method: "PUT",
          body: { excluido: item.excluido }
        });
      } catch (error) {
        console.error("Erro ao excluir pessoa:", error);
      }
    }
    function redirectToUpdate(id) {
      router.push({ path: `/pessoas/atualizar/${id}` });
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      const _component_ModalFichaCard = _sfc_main$1;
      if (unref(status) === "success") {
        _push(ssrRenderComponent(VContainer, mergeProps({ class: "mt-5" }, _attrs), {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_NuxtLink, { to: "/pessoas/cadastro" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<img style="${ssrRenderStyle({ "cursor": "pointer" })}"${ssrRenderAttr("src", _imports_0)} alt="Cadastro"${_scopeId2}>`);
                  } else {
                    return [
                      createVNode("img", {
                        style: { "cursor": "pointer" },
                        src: _imports_0,
                        alt: "Cadastro"
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(VRow, { style: { "gap": "1rem" } }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div style="${ssrRenderStyle({ "width": "200px" })}"${_scopeId2}>`);
                    _push3(ssrRenderComponent(VTextField, {
                      class: "mt-7 mb-4",
                      modelValue: unref(searchDoc),
                      "onUpdate:modelValue": ($event) => isRef(searchDoc) ? searchDoc.value = $event : null,
                      label: "Documento",
                      "prepend-inner-icon": "mdi-magnify",
                      variant: "outlined",
                      "hide-details": ""
                    }, null, _parent3, _scopeId2));
                    _push3(`</div><div style="${ssrRenderStyle({ "width": "150px" })}"${_scopeId2}>`);
                    _push3(ssrRenderComponent(VTextField, {
                      class: "mt-7 mb-4",
                      modelValue: unref(searchCartao),
                      "onUpdate:modelValue": ($event) => isRef(searchCartao) ? searchCartao.value = $event : null,
                      label: "Cart\xE3o",
                      "prepend-inner-icon": "mdi-magnify",
                      variant: "outlined",
                      "hide-details": ""
                    }, null, _parent3, _scopeId2));
                    _push3(`</div><div style="${ssrRenderStyle({ "width": "300px" })}"${_scopeId2}>`);
                    _push3(ssrRenderComponent(VTextField, {
                      class: "mt-7 mb-4",
                      modelValue: unref(search),
                      "onUpdate:modelValue": ($event) => isRef(search) ? search.value = $event : null,
                      label: "Pessoa",
                      "prepend-inner-icon": "mdi-magnify",
                      variant: "outlined",
                      "hide-details": ""
                    }, null, _parent3, _scopeId2));
                    _push3(`</div>`);
                  } else {
                    return [
                      createVNode("div", { style: { "width": "200px" } }, [
                        createVNode(VTextField, {
                          class: "mt-7 mb-4",
                          modelValue: unref(searchDoc),
                          "onUpdate:modelValue": ($event) => isRef(searchDoc) ? searchDoc.value = $event : null,
                          label: "Documento",
                          "prepend-inner-icon": "mdi-magnify",
                          variant: "outlined",
                          "hide-details": ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      createVNode("div", { style: { "width": "150px" } }, [
                        createVNode(VTextField, {
                          class: "mt-7 mb-4",
                          modelValue: unref(searchCartao),
                          "onUpdate:modelValue": ($event) => isRef(searchCartao) ? searchCartao.value = $event : null,
                          label: "Cart\xE3o",
                          "prepend-inner-icon": "mdi-magnify",
                          variant: "outlined",
                          "hide-details": ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      createVNode("div", { style: { "width": "300px" } }, [
                        createVNode(VTextField, {
                          class: "mt-7 mb-4",
                          modelValue: unref(search),
                          "onUpdate:modelValue": ($event) => isRef(search) ? search.value = $event : null,
                          label: "Pessoa",
                          "prepend-inner-icon": "mdi-magnify",
                          variant: "outlined",
                          "hide-details": ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(VDataTable, {
                density: "compact",
                headers,
                items: unref(filteredPessoas),
                "item-key": "id",
                "items-per-page-options": [10, 25, 50]
              }, {
                "item.doc_identificacao": withCtx(({ item }, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(formatDoc(item.doc_identificacao))}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(formatDoc(item.doc_identificacao)), 1)
                    ];
                  }
                }),
                "item.actions": withCtx(({ item }, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(VRow, { style: { "display": "flex", "gap": "10px", "justify-content": "flex-end" } }, {
                      default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<div style="${ssrRenderStyle({ "cursor": "pointer" })}" title="Visualizar"${_scopeId3}>`);
                          if (item.link_ficha) {
                            _push4(`<img style="${ssrRenderStyle({ "width": "30px", "height": "30px" })}"${ssrRenderAttr("src", _imports_1)} alt="Visualizar" title="Possui Ficha"${_scopeId3}>`);
                          } else {
                            _push4(`<img style="${ssrRenderStyle({ "width": "30px", "height": "30px" })}"${ssrRenderAttr("src", _imports_2)} alt="Visualizar" title="N\xE3o Ficha"${_scopeId3}>`);
                          }
                          _push4(`</div><div style="${ssrRenderStyle({ "cursor": "pointer" })}" title="Atualizar"${_scopeId3}><img style="${ssrRenderStyle({ "width": "30px", "height": "30px" })}"${ssrRenderAttr("src", _imports_1$1)} alt="Atualizar"${_scopeId3}></div><div style="${ssrRenderStyle({ "cursor": "pointer" })}" title="Deletar"${_scopeId3}>`);
                          if (item.excluido) {
                            _push4(`<img style="${ssrRenderStyle({ "width": "30px", "height": "30px" })}"${ssrRenderAttr("src", _imports_2$1)} alt="Visualizar" title="Reativar"${_scopeId3}>`);
                          } else {
                            _push4(`<img${ssrRenderAttr("src", _imports_3)} alt="Excluir" class="trash-icon" style="${ssrRenderStyle({ "width": "30px", "height": "30px" })}" title="Excluir"${_scopeId3}>`);
                          }
                          _push4(`</div>`);
                        } else {
                          return [
                            createVNode("div", {
                              style: { "cursor": "pointer" },
                              onClick: ($event) => openModalFicha(item.link_ficha, item),
                              title: "Visualizar"
                            }, [
                              item.link_ficha ? (openBlock(), createBlock("img", {
                                key: 0,
                                style: { "width": "30px", "height": "30px" },
                                src: _imports_1,
                                alt: "Visualizar",
                                title: "Possui Ficha"
                              })) : (openBlock(), createBlock("img", {
                                key: 1,
                                style: { "width": "30px", "height": "30px" },
                                src: _imports_2,
                                alt: "Visualizar",
                                title: "N\xE3o Ficha"
                              }))
                            ], 8, ["onClick"]),
                            createVNode("div", {
                              style: { "cursor": "pointer" },
                              onClick: ($event) => redirectToUpdate(item.id),
                              title: "Atualizar"
                            }, [
                              createVNode("img", {
                                style: { "width": "30px", "height": "30px" },
                                src: _imports_1$1,
                                alt: "Atualizar"
                              })
                            ], 8, ["onClick"]),
                            createVNode("div", {
                              style: { "cursor": "pointer" },
                              onClick: ($event) => deletePessoa(item),
                              title: "Deletar"
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
                      createVNode(VRow, { style: { "display": "flex", "gap": "10px", "justify-content": "flex-end" } }, {
                        default: withCtx(() => [
                          createVNode("div", {
                            style: { "cursor": "pointer" },
                            onClick: ($event) => openModalFicha(item.link_ficha, item),
                            title: "Visualizar"
                          }, [
                            item.link_ficha ? (openBlock(), createBlock("img", {
                              key: 0,
                              style: { "width": "30px", "height": "30px" },
                              src: _imports_1,
                              alt: "Visualizar",
                              title: "Possui Ficha"
                            })) : (openBlock(), createBlock("img", {
                              key: 1,
                              style: { "width": "30px", "height": "30px" },
                              src: _imports_2,
                              alt: "Visualizar",
                              title: "N\xE3o Ficha"
                            }))
                          ], 8, ["onClick"]),
                          createVNode("div", {
                            style: { "cursor": "pointer" },
                            onClick: ($event) => redirectToUpdate(item.id),
                            title: "Atualizar"
                          }, [
                            createVNode("img", {
                              style: { "width": "30px", "height": "30px" },
                              src: _imports_1$1,
                              alt: "Atualizar"
                            })
                          ], 8, ["onClick"]),
                          createVNode("div", {
                            style: { "cursor": "pointer" },
                            onClick: ($event) => deletePessoa(item),
                            title: "Deletar"
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
              if (unref(isModalFichaOpen)) {
                _push2(ssrRenderComponent(_component_ModalFichaCard, {
                  show: unref(isModalFichaOpen),
                  "link-view": unref(linkFichaPessoa),
                  "is-view": true,
                  "pessoa-obj": unref(pessoaObj),
                  onClose: ($event) => isModalFichaOpen.value = false
                }, null, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
            } else {
              return [
                createVNode(_component_NuxtLink, { to: "/pessoas/cadastro" }, {
                  default: withCtx(() => [
                    createVNode("img", {
                      style: { "cursor": "pointer" },
                      src: _imports_0,
                      alt: "Cadastro"
                    })
                  ]),
                  _: 1
                }),
                createVNode(VRow, { style: { "gap": "1rem" } }, {
                  default: withCtx(() => [
                    createVNode("div", { style: { "width": "200px" } }, [
                      createVNode(VTextField, {
                        class: "mt-7 mb-4",
                        modelValue: unref(searchDoc),
                        "onUpdate:modelValue": ($event) => isRef(searchDoc) ? searchDoc.value = $event : null,
                        label: "Documento",
                        "prepend-inner-icon": "mdi-magnify",
                        variant: "outlined",
                        "hide-details": ""
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    createVNode("div", { style: { "width": "150px" } }, [
                      createVNode(VTextField, {
                        class: "mt-7 mb-4",
                        modelValue: unref(searchCartao),
                        "onUpdate:modelValue": ($event) => isRef(searchCartao) ? searchCartao.value = $event : null,
                        label: "Cart\xE3o",
                        "prepend-inner-icon": "mdi-magnify",
                        variant: "outlined",
                        "hide-details": ""
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    createVNode("div", { style: { "width": "300px" } }, [
                      createVNode(VTextField, {
                        class: "mt-7 mb-4",
                        modelValue: unref(search),
                        "onUpdate:modelValue": ($event) => isRef(search) ? search.value = $event : null,
                        label: "Pessoa",
                        "prepend-inner-icon": "mdi-magnify",
                        variant: "outlined",
                        "hide-details": ""
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ])
                  ]),
                  _: 1
                }),
                createVNode(VDataTable, {
                  density: "compact",
                  headers,
                  items: unref(filteredPessoas),
                  "item-key": "id",
                  "items-per-page-options": [10, 25, 50]
                }, {
                  "item.doc_identificacao": withCtx(({ item }) => [
                    createTextVNode(toDisplayString(formatDoc(item.doc_identificacao)), 1)
                  ]),
                  "item.actions": withCtx(({ item }) => [
                    createVNode(VRow, { style: { "display": "flex", "gap": "10px", "justify-content": "flex-end" } }, {
                      default: withCtx(() => [
                        createVNode("div", {
                          style: { "cursor": "pointer" },
                          onClick: ($event) => openModalFicha(item.link_ficha, item),
                          title: "Visualizar"
                        }, [
                          item.link_ficha ? (openBlock(), createBlock("img", {
                            key: 0,
                            style: { "width": "30px", "height": "30px" },
                            src: _imports_1,
                            alt: "Visualizar",
                            title: "Possui Ficha"
                          })) : (openBlock(), createBlock("img", {
                            key: 1,
                            style: { "width": "30px", "height": "30px" },
                            src: _imports_2,
                            alt: "Visualizar",
                            title: "N\xE3o Ficha"
                          }))
                        ], 8, ["onClick"]),
                        createVNode("div", {
                          style: { "cursor": "pointer" },
                          onClick: ($event) => redirectToUpdate(item.id),
                          title: "Atualizar"
                        }, [
                          createVNode("img", {
                            style: { "width": "30px", "height": "30px" },
                            src: _imports_1$1,
                            alt: "Atualizar"
                          })
                        ], 8, ["onClick"]),
                        createVNode("div", {
                          style: { "cursor": "pointer" },
                          onClick: ($event) => deletePessoa(item),
                          title: "Deletar"
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
                unref(isModalFichaOpen) ? (openBlock(), createBlock(_component_ModalFichaCard, {
                  key: 0,
                  show: unref(isModalFichaOpen),
                  "link-view": unref(linkFichaPessoa),
                  "is-view": true,
                  "pessoa-obj": unref(pessoaObj),
                  onClose: ($event) => isModalFichaOpen.value = false
                }, null, 8, ["show", "link-view", "pessoa-obj", "onClose"])) : createCommentVNode("", true)
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/pessoas/lista/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : undefined;
};

export { _sfc_main as default };
//# sourceMappingURL=index-BY2Ss5pY.mjs.map
