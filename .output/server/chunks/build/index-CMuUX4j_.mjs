import { _ as __nuxt_component_0 } from './nuxt-link-TpvcaGEw.mjs';
import { _ as _sfc_main$1 } from './FichaCard-BDq7cEeS.mjs';
import { ref, mergeProps, withCtx, createVNode, unref, isRef, createTextVNode, toDisplayString, openBlock, createBlock, createCommentVNode, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderStyle, ssrRenderAttr, ssrInterpolate } from 'vue/server-renderer';
import { _ as _imports_0 } from './novo-CWU3oYa5.mjs';
import { _ as _imports_1 } from './visualizar-BoZ30DMV.mjs';
import { _ as _imports_2 } from './visualizar-vermelho-Ly_aKn8Z.mjs';
import { _ as _imports_1$1 } from './editar-BcGPsVK2.mjs';
import { _ as _imports_2$1, a as _imports_3 } from './excluido-D7FHZla7.mjs';
import { u as useRouter$1, f as VTextField, b8 as VProgressCircular, c as useRuntimeConfig, e as useCookie } from './server.mjs';
import { f as fetchWithToken } from './fetchWithToken-CCGIQo0b.mjs';
import { u as useFetch } from './fetch-uf6n1sXR.mjs';
import { V as VContainer } from './VContainer-CUysD4sO.mjs';
import { V as VRow } from './VRow-Bqz0CuIN.mjs';
import { V as VDataTable } from './VDataTable-BqxaRhj7.mjs';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:fs';
import 'node:path';
import 'node:url';
import './VDialog-BVe31KMa.mjs';
import './VCard-Dbn6yWsi.mjs';
import './VAvatar-CfQAG9re.mjs';
import './VImg-CtUi4yCS.mjs';
import './VResponsive-BwPb2GHE.mjs';
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
import './asyncData-B8plM1p3.mjs';
import './filter-BaqCkjdl.mjs';
import './VList-w5fWkTAt.mjs';
import './VDivider-BxKHtM2e.mjs';
import './VSelectionControl-DI6QefPE.mjs';

const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const config = useRuntimeConfig();
    const pessoasLista = `${config.public.auth}/service/gerencia/pesquisarPessoas`;
    const pessoasUpdate = `${config.public.auth}/service/gerencia/updatePessoa`;
    const baixarDocumento = `${config.public.managemant}/lista_download`;
    const isModalFichaOpen = ref(false);
    const linkFichaPessoa = ref([]);
    const pathFichaPessoa = ref(null);
    const pessoaObj = ref({});
    const router = useRouter$1();
    const pending = ref(false);
    const pessoasItems = ref([]);
    const searchName = ref(null);
    const searchDoc = ref(null);
    const searchCartao = ref(null);
    const headers = [
      { title: "Documento", value: "doc_identificacao", width: "190px" },
      { title: "Cart\xE3o", value: "numero_ficha" },
      { title: "Nome/Raz\xE3o Social", value: "nome", width: "400px" },
      { value: "actions" }
    ];
    const searchPessoas = async () => {
      pending.value = true;
      const { data: pessoasResponse, status } = await fetchWithToken(
        `${pessoasLista}`,
        {
          method: "POST",
          body: {
            cartorio_token: useCookie("user-data").value.cartorio_token,
            nome: searchName.value ? searchName.value : null,
            documento: searchDoc.value ? searchDoc.value.replace(/\D/g, "") : null,
            numero_ficha: Number(searchCartao.value) ? Number(searchCartao.value) : null
          }
        }
      );
      if (status.value === "success") {
        pending.value = false;
        pessoasItems.value = pessoasResponse.value;
      }
    };
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
                    modelValue: unref(searchName),
                    "onUpdate:modelValue": ($event) => isRef(searchName) ? searchName.value = $event : null,
                    label: "Pessoa",
                    "prepend-inner-icon": "mdi-magnify",
                    variant: "outlined",
                    "hide-details": ""
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div style="${ssrRenderStyle({ "cursor": "pointer" })}" title="Visualizar" class="mt-7"${_scopeId2}><img style="${ssrRenderStyle({ "width": "40px", "height": "40px" })}"${ssrRenderAttr("src", _imports_1)} alt="Visualizar" title="Possui Ficha"${_scopeId2}></div>`);
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
                        modelValue: unref(searchName),
                        "onUpdate:modelValue": ($event) => isRef(searchName) ? searchName.value = $event : null,
                        label: "Pessoa",
                        "prepend-inner-icon": "mdi-magnify",
                        variant: "outlined",
                        "hide-details": ""
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    createVNode("div", {
                      style: { "cursor": "pointer" },
                      onClick: ($event) => searchPessoas(),
                      title: "Visualizar",
                      class: "mt-7"
                    }, [
                      createVNode("img", {
                        style: { "width": "40px", "height": "40px" },
                        src: _imports_1,
                        alt: "Visualizar",
                        title: "Possui Ficha"
                      })
                    ], 8, ["onClick"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            if (unref(pending)) {
              _push2(ssrRenderComponent(VProgressCircular, {
                class: "loading-spinner",
                indeterminate: "",
                size: "80"
              }, null, _parent2, _scopeId));
            } else {
              _push2(ssrRenderComponent(VDataTable, {
                density: "compact",
                headers,
                items: unref(pessoasItems),
                "item-key": "id",
                "items-per-page-options": [10, 25, 50]
              }, {
                "item.doc_identificacao": withCtx(({ item }, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(formatDoc(item.documento))}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(formatDoc(item.documento)), 1)
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
            }
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
                      modelValue: unref(searchName),
                      "onUpdate:modelValue": ($event) => isRef(searchName) ? searchName.value = $event : null,
                      label: "Pessoa",
                      "prepend-inner-icon": "mdi-magnify",
                      variant: "outlined",
                      "hide-details": ""
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  createVNode("div", {
                    style: { "cursor": "pointer" },
                    onClick: ($event) => searchPessoas(),
                    title: "Visualizar",
                    class: "mt-7"
                  }, [
                    createVNode("img", {
                      style: { "width": "40px", "height": "40px" },
                      src: _imports_1,
                      alt: "Visualizar",
                      title: "Possui Ficha"
                    })
                  ], 8, ["onClick"])
                ]),
                _: 1
              }),
              unref(pending) ? (openBlock(), createBlock(VProgressCircular, {
                key: 0,
                class: "loading-spinner",
                indeterminate: "",
                size: "80"
              })) : (openBlock(), createBlock(VDataTable, {
                key: 1,
                density: "compact",
                headers,
                items: unref(pessoasItems),
                "item-key": "id",
                "items-per-page-options": [10, 25, 50]
              }, {
                "item.doc_identificacao": withCtx(({ item }) => [
                  createTextVNode(toDisplayString(formatDoc(item.documento)), 1)
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
              }, 8, ["items"])),
              unref(isModalFichaOpen) ? (openBlock(), createBlock(_component_ModalFichaCard, {
                key: 2,
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
//# sourceMappingURL=index-CMuUX4j_.mjs.map
