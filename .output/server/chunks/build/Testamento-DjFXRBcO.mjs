import { _ as __nuxt_component_0 } from './nuxt-link-DyZc7qn_.mjs';
import { useSSRContext, ref, withCtx, createVNode, unref, isRef, mergeProps, createTextVNode } from 'vue';
import { al as useCookie, c as useNuxtApp, U as VImg, am as VSpacer, an as VBtn, ao as VSelect, b as useRuntimeConfig } from './server.mjs';
import { a as useFetch } from './fetch-3DdSDKmI.mjs';
import { ssrRenderComponent, ssrRenderAttr, ssrRenderStyle } from 'vue/server-renderer';
import { _ as _imports_0, a as _imports_1, V as VSlider } from './camera-Bklyje9c.mjs';
import { V as VRow, _ as _imports_0$1 } from './sair-B9PBMH_8.mjs';
import { _ as _imports_3 } from './salvar-DNXAfpCz.mjs';
import { _ as _imports_4 } from './trash-DzRaA21m.mjs';
import { V as VCol } from './VCol-QAPwXCIJ.mjs';
import { V as VDialog } from './VDialog-TcN6Okkn.mjs';
import { V as VCard } from './VCard-DoRh_S2C.mjs';
import { V as VContainer } from './VContainer-Mst0JKJ7.mjs';
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

const _sfc_main = {
  __name: "Testamento",
  __ssrInlineRender: true,
  setup(__props) {
    const video = ref(null);
    const devices = ref([]);
    const selectedDeviceId = ref("");
    const isDialogActive = ref(false);
    const zoomLevel = ref(1);
    const tokenCookie = useCookie("auth_token");
    const token = tokenCookie.value;
    const pessoaNome = useCookie("user-data").value;
    const nomePessoa = pessoaNome.nome;
    const config = useRuntimeConfig();
    const enviarFoto = `${config.public.managemant}/uploadFaceId`;
    const { $toast } = useNuxtApp();
    const updateDevices = async () => {
      const mediaDevices = await (void 0).mediaDevices.enumerateDevices();
      devices.value = mediaDevices.filter((device) => device.kind === "videoinput").map((device) => ({
        deviceId: device.deviceId,
        label: device.label || `Camera ${devices.value.length + 1}`
      }));
    };
    const openDialog = async () => {
      isDialogActive.value = true;
      try {
        await (void 0).mediaDevices.getUserMedia({ video: true });
        await updateDevices();
      } catch (error) {
        console.error("Erro ao acessar dispositivos de m\xEDdia:", error);
      }
    };
    const closeDialog = () => {
      isDialogActive.value = false;
      const stream = video.value.srcObject;
      if (stream) {
        const tracks = stream.getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
    const startVideo = async () => {
      if (selectedDeviceId.value) {
        const stream = await (void 0).mediaDevices.getUserMedia({
          video: { deviceId: { exact: selectedDeviceId.value } }
        });
        video.value.srcObject = stream;
      }
    };
    const handleCapture = async () => {
      const canvas = (void 0).createElement("canvas");
      const context = canvas.getContext("2d");
      const width = video.value.videoWidth;
      const height = video.value.videoHeight;
      const scaledWidth = width * zoomLevel.value;
      const scaledHeight = height * zoomLevel.value;
      const offsetX = (width - scaledWidth) / 2;
      const offsetY = (height - scaledHeight) / 2;
      canvas.width = width;
      canvas.height = height;
      context.drawImage(
        video.value,
        offsetX,
        offsetY,
        scaledWidth,
        scaledHeight
      );
      canvas.toBlob(async (blob) => {
        const formData = new FormData();
        formData.append("file", blob, `${nomePessoa}.jpg`);
        formData.append("pessoa_token", token);
        formData.append("bucket", "cartorio-teste");
        const { status } = await useFetch(enviarFoto, {
          method: "POST",
          body: formData
        }, "$YOrtzEAAm0");
        if (status.value === "success") {
          $toast.success("Imagem enviada!");
          closeDialog();
        } else {
          $toast.error("Erro ao enviar imagem para o sistema.");
        }
      }, "image/jpeg");
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<!--[-->`);
      _push(ssrRenderComponent(VRow, { class: "d-flex align-items-center justify-space-between" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VCol, { cols: "auto" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VImg, {
                    src: _imports_0,
                    width: 500,
                    class: "mr-4"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VImg, {
                      src: _imports_0,
                      width: 500,
                      class: "mr-4"
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(VSpacer, null, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(VCol, { cols: "auto" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VDialog, {
                    "max-width": "700",
                    modelValue: unref(isDialogActive),
                    "onUpdate:modelValue": ($event) => isRef(isDialogActive) ? isDialogActive.value = $event : null
                  }, {
                    activator: withCtx(({ props: activatorProps }, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VBtn, mergeProps(activatorProps, {
                          variant: "outlined",
                          style: { "width": "300px", "height": "300px" },
                          onClick: openDialog
                        }), {
                          default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<img${ssrRenderAttr("src", _imports_1)}${_scopeId4}>`);
                            } else {
                              return [
                                createVNode("img", { src: _imports_1 })
                              ];
                            }
                          }),
                          _: 2
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VBtn, mergeProps(activatorProps, {
                            variant: "outlined",
                            style: { "width": "300px", "height": "300px" },
                            onClick: openDialog
                          }), {
                            default: withCtx(() => [
                              createVNode("img", { src: _imports_1 })
                            ]),
                            _: 2
                          }, 1040)
                        ];
                      }
                    }),
                    default: withCtx(({ isActive }, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VCard, { title: "Biometria" }, {
                          default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VRow, null, {
                                default: withCtx((_4, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(VCol, null, {
                                      default: withCtx((_5, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(VSelect, {
                                            items: unref(devices),
                                            modelValue: unref(selectedDeviceId),
                                            "onUpdate:modelValue": ($event) => isRef(selectedDeviceId) ? selectedDeviceId.value = $event : null,
                                            "item-title": "label",
                                            "item-value": "deviceId",
                                            label: "Selecionar Webcam"
                                          }, null, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(VSelect, {
                                              items: unref(devices),
                                              modelValue: unref(selectedDeviceId),
                                              "onUpdate:modelValue": ($event) => isRef(selectedDeviceId) ? selectedDeviceId.value = $event : null,
                                              "item-title": "label",
                                              "item-value": "deviceId",
                                              label: "Selecionar Webcam"
                                            }, null, 8, ["items", "modelValue", "onUpdate:modelValue"])
                                          ];
                                        }
                                      }),
                                      _: 2
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(VCol, null, {
                                        default: withCtx(() => [
                                          createVNode(VSelect, {
                                            items: unref(devices),
                                            modelValue: unref(selectedDeviceId),
                                            "onUpdate:modelValue": ($event) => isRef(selectedDeviceId) ? selectedDeviceId.value = $event : null,
                                            "item-title": "label",
                                            "item-value": "deviceId",
                                            label: "Selecionar Webcam"
                                          }, null, 8, ["items", "modelValue", "onUpdate:modelValue"])
                                        ]),
                                        _: 1
                                      })
                                    ];
                                  }
                                }),
                                _: 2
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(VRow, null, {
                                default: withCtx((_4, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(VCol, null, {
                                      default: withCtx((_5, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(VBtn, { onClick: startVideo }, {
                                            default: withCtx((_6, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(`Exibir`);
                                              } else {
                                                return [
                                                  createTextVNode("Exibir")
                                                ];
                                              }
                                            }),
                                            _: 2
                                          }, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(VBtn, { onClick: startVideo }, {
                                              default: withCtx(() => [
                                                createTextVNode("Exibir")
                                              ]),
                                              _: 1
                                            })
                                          ];
                                        }
                                      }),
                                      _: 2
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(VCol, null, {
                                        default: withCtx(() => [
                                          createVNode(VBtn, { onClick: startVideo }, {
                                            default: withCtx(() => [
                                              createTextVNode("Exibir")
                                            ]),
                                            _: 1
                                          })
                                        ]),
                                        _: 1
                                      })
                                    ];
                                  }
                                }),
                                _: 2
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(VRow, null, {
                                default: withCtx((_4, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(VContainer, { style: { "overflow": "hidden" } }, {
                                      default: withCtx((_5, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(VCol, null, {
                                            default: withCtx((_6, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(`<video class="ml-3" width="640" height="480" autoplay style="${ssrRenderStyle({ transform: `scale(${unref(zoomLevel)})`, transformOrigin: "center center" })}"${_scopeId7}></video>`);
                                              } else {
                                                return [
                                                  createVNode("video", {
                                                    class: "ml-3",
                                                    ref_key: "video",
                                                    ref: video,
                                                    width: "640",
                                                    height: "480",
                                                    autoplay: "",
                                                    style: { transform: `scale(${unref(zoomLevel)})`, transformOrigin: "center center" }
                                                  }, null, 4)
                                                ];
                                              }
                                            }),
                                            _: 2
                                          }, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(VCol, null, {
                                              default: withCtx(() => [
                                                createVNode("video", {
                                                  class: "ml-3",
                                                  ref_key: "video",
                                                  ref: video,
                                                  width: "640",
                                                  height: "480",
                                                  autoplay: "",
                                                  style: { transform: `scale(${unref(zoomLevel)})`, transformOrigin: "center center" }
                                                }, null, 4)
                                              ]),
                                              _: 1
                                            })
                                          ];
                                        }
                                      }),
                                      _: 2
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(VContainer, { style: { "overflow": "hidden" } }, {
                                        default: withCtx(() => [
                                          createVNode(VCol, null, {
                                            default: withCtx(() => [
                                              createVNode("video", {
                                                class: "ml-3",
                                                ref_key: "video",
                                                ref: video,
                                                width: "640",
                                                height: "480",
                                                autoplay: "",
                                                style: { transform: `scale(${unref(zoomLevel)})`, transformOrigin: "center center" }
                                              }, null, 4)
                                            ]),
                                            _: 1
                                          })
                                        ]),
                                        _: 1
                                      })
                                    ];
                                  }
                                }),
                                _: 2
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(VContainer, null, {
                                default: withCtx((_4, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(VSlider, {
                                      modelValue: unref(zoomLevel),
                                      "onUpdate:modelValue": ($event) => isRef(zoomLevel) ? zoomLevel.value = $event : null,
                                      min: 1,
                                      max: 3,
                                      step: "0.1",
                                      label: "Zoom"
                                    }, null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(VSlider, {
                                        modelValue: unref(zoomLevel),
                                        "onUpdate:modelValue": ($event) => isRef(zoomLevel) ? zoomLevel.value = $event : null,
                                        min: 1,
                                        max: 3,
                                        step: "0.1",
                                        label: "Zoom"
                                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                    ];
                                  }
                                }),
                                _: 2
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(VRow, { class: "mt-10 justify-space-around" }, {
                                default: withCtx((_4, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`<div${_scopeId5}><img style="${ssrRenderStyle({ "cursor": "pointer" })}"${ssrRenderAttr("src", _imports_0$1)} alt="Excluir"${_scopeId5}></div><div${_scopeId5}><img style="${ssrRenderStyle({ "cursor": "pointer" })}"${ssrRenderAttr("src", _imports_3)} alt="Salvar"${_scopeId5}></div>`);
                                  } else {
                                    return [
                                      createVNode("div", { onClick: closeDialog }, [
                                        createVNode("img", {
                                          style: { "cursor": "pointer" },
                                          src: _imports_0$1,
                                          alt: "Excluir"
                                        })
                                      ]),
                                      createVNode("div", { onClick: handleCapture }, [
                                        createVNode("img", {
                                          style: { "cursor": "pointer" },
                                          src: _imports_3,
                                          alt: "Salvar"
                                        })
                                      ])
                                    ];
                                  }
                                }),
                                _: 2
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(VRow, null, {
                                  default: withCtx(() => [
                                    createVNode(VCol, null, {
                                      default: withCtx(() => [
                                        createVNode(VSelect, {
                                          items: unref(devices),
                                          modelValue: unref(selectedDeviceId),
                                          "onUpdate:modelValue": ($event) => isRef(selectedDeviceId) ? selectedDeviceId.value = $event : null,
                                          "item-title": "label",
                                          "item-value": "deviceId",
                                          label: "Selecionar Webcam"
                                        }, null, 8, ["items", "modelValue", "onUpdate:modelValue"])
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
                                        createVNode(VBtn, { onClick: startVideo }, {
                                          default: withCtx(() => [
                                            createTextVNode("Exibir")
                                          ]),
                                          _: 1
                                        })
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }),
                                createVNode(VRow, null, {
                                  default: withCtx(() => [
                                    createVNode(VContainer, { style: { "overflow": "hidden" } }, {
                                      default: withCtx(() => [
                                        createVNode(VCol, null, {
                                          default: withCtx(() => [
                                            createVNode("video", {
                                              class: "ml-3",
                                              ref_key: "video",
                                              ref: video,
                                              width: "640",
                                              height: "480",
                                              autoplay: "",
                                              style: { transform: `scale(${unref(zoomLevel)})`, transformOrigin: "center center" }
                                            }, null, 4)
                                          ]),
                                          _: 1
                                        })
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }),
                                createVNode(VContainer, null, {
                                  default: withCtx(() => [
                                    createVNode(VSlider, {
                                      modelValue: unref(zoomLevel),
                                      "onUpdate:modelValue": ($event) => isRef(zoomLevel) ? zoomLevel.value = $event : null,
                                      min: 1,
                                      max: 3,
                                      step: "0.1",
                                      label: "Zoom"
                                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                  ]),
                                  _: 1
                                }),
                                createVNode(VRow, { class: "mt-10 justify-space-around" }, {
                                  default: withCtx(() => [
                                    createVNode("div", { onClick: closeDialog }, [
                                      createVNode("img", {
                                        style: { "cursor": "pointer" },
                                        src: _imports_0$1,
                                        alt: "Excluir"
                                      })
                                    ]),
                                    createVNode("div", { onClick: handleCapture }, [
                                      createVNode("img", {
                                        style: { "cursor": "pointer" },
                                        src: _imports_3,
                                        alt: "Salvar"
                                      })
                                    ])
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 2
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VCard, { title: "Biometria" }, {
                            default: withCtx(() => [
                              createVNode(VRow, null, {
                                default: withCtx(() => [
                                  createVNode(VCol, null, {
                                    default: withCtx(() => [
                                      createVNode(VSelect, {
                                        items: unref(devices),
                                        modelValue: unref(selectedDeviceId),
                                        "onUpdate:modelValue": ($event) => isRef(selectedDeviceId) ? selectedDeviceId.value = $event : null,
                                        "item-title": "label",
                                        "item-value": "deviceId",
                                        label: "Selecionar Webcam"
                                      }, null, 8, ["items", "modelValue", "onUpdate:modelValue"])
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
                                      createVNode(VBtn, { onClick: startVideo }, {
                                        default: withCtx(() => [
                                          createTextVNode("Exibir")
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }),
                              createVNode(VRow, null, {
                                default: withCtx(() => [
                                  createVNode(VContainer, { style: { "overflow": "hidden" } }, {
                                    default: withCtx(() => [
                                      createVNode(VCol, null, {
                                        default: withCtx(() => [
                                          createVNode("video", {
                                            class: "ml-3",
                                            ref_key: "video",
                                            ref: video,
                                            width: "640",
                                            height: "480",
                                            autoplay: "",
                                            style: { transform: `scale(${unref(zoomLevel)})`, transformOrigin: "center center" }
                                          }, null, 4)
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }),
                              createVNode(VContainer, null, {
                                default: withCtx(() => [
                                  createVNode(VSlider, {
                                    modelValue: unref(zoomLevel),
                                    "onUpdate:modelValue": ($event) => isRef(zoomLevel) ? zoomLevel.value = $event : null,
                                    min: 1,
                                    max: 3,
                                    step: "0.1",
                                    label: "Zoom"
                                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                ]),
                                _: 1
                              }),
                              createVNode(VRow, { class: "mt-10 justify-space-around" }, {
                                default: withCtx(() => [
                                  createVNode("div", { onClick: closeDialog }, [
                                    createVNode("img", {
                                      style: { "cursor": "pointer" },
                                      src: _imports_0$1,
                                      alt: "Excluir"
                                    })
                                  ]),
                                  createVNode("div", { onClick: handleCapture }, [
                                    createVNode("img", {
                                      style: { "cursor": "pointer" },
                                      src: _imports_3,
                                      alt: "Salvar"
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
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VDialog, {
                      "max-width": "700",
                      modelValue: unref(isDialogActive),
                      "onUpdate:modelValue": ($event) => isRef(isDialogActive) ? isDialogActive.value = $event : null
                    }, {
                      activator: withCtx(({ props: activatorProps }) => [
                        createVNode(VBtn, mergeProps(activatorProps, {
                          variant: "outlined",
                          style: { "width": "300px", "height": "300px" },
                          onClick: openDialog
                        }), {
                          default: withCtx(() => [
                            createVNode("img", { src: _imports_1 })
                          ]),
                          _: 2
                        }, 1040)
                      ]),
                      default: withCtx(({ isActive }) => [
                        createVNode(VCard, { title: "Biometria" }, {
                          default: withCtx(() => [
                            createVNode(VRow, null, {
                              default: withCtx(() => [
                                createVNode(VCol, null, {
                                  default: withCtx(() => [
                                    createVNode(VSelect, {
                                      items: unref(devices),
                                      modelValue: unref(selectedDeviceId),
                                      "onUpdate:modelValue": ($event) => isRef(selectedDeviceId) ? selectedDeviceId.value = $event : null,
                                      "item-title": "label",
                                      "item-value": "deviceId",
                                      label: "Selecionar Webcam"
                                    }, null, 8, ["items", "modelValue", "onUpdate:modelValue"])
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
                                    createVNode(VBtn, { onClick: startVideo }, {
                                      default: withCtx(() => [
                                        createTextVNode("Exibir")
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }),
                            createVNode(VRow, null, {
                              default: withCtx(() => [
                                createVNode(VContainer, { style: { "overflow": "hidden" } }, {
                                  default: withCtx(() => [
                                    createVNode(VCol, null, {
                                      default: withCtx(() => [
                                        createVNode("video", {
                                          class: "ml-3",
                                          ref_key: "video",
                                          ref: video,
                                          width: "640",
                                          height: "480",
                                          autoplay: "",
                                          style: { transform: `scale(${unref(zoomLevel)})`, transformOrigin: "center center" }
                                        }, null, 4)
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }),
                            createVNode(VContainer, null, {
                              default: withCtx(() => [
                                createVNode(VSlider, {
                                  modelValue: unref(zoomLevel),
                                  "onUpdate:modelValue": ($event) => isRef(zoomLevel) ? zoomLevel.value = $event : null,
                                  min: 1,
                                  max: 3,
                                  step: "0.1",
                                  label: "Zoom"
                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                              ]),
                              _: 1
                            }),
                            createVNode(VRow, { class: "mt-10 justify-space-around" }, {
                              default: withCtx(() => [
                                createVNode("div", { onClick: closeDialog }, [
                                  createVNode("img", {
                                    style: { "cursor": "pointer" },
                                    src: _imports_0$1,
                                    alt: "Excluir"
                                  })
                                ]),
                                createVNode("div", { onClick: handleCapture }, [
                                  createVNode("img", {
                                    style: { "cursor": "pointer" },
                                    src: _imports_3,
                                    alt: "Salvar"
                                  })
                                ])
                              ]),
                              _: 1
                            })
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
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(VCol, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<img class="btn-pointer"${ssrRenderAttr("src", _imports_4)} alt="Excluir"${_scopeId2}>`);
                } else {
                  return [
                    createVNode("img", {
                      class: "btn-pointer",
                      src: _imports_4,
                      alt: "Excluir"
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(VCol, { cols: "auto" }, {
                default: withCtx(() => [
                  createVNode(VImg, {
                    src: _imports_0,
                    width: 500,
                    class: "mr-4"
                  })
                ]),
                _: 1
              }),
              createVNode(VSpacer),
              createVNode(VCol, { cols: "auto" }, {
                default: withCtx(() => [
                  createVNode(VDialog, {
                    "max-width": "700",
                    modelValue: unref(isDialogActive),
                    "onUpdate:modelValue": ($event) => isRef(isDialogActive) ? isDialogActive.value = $event : null
                  }, {
                    activator: withCtx(({ props: activatorProps }) => [
                      createVNode(VBtn, mergeProps(activatorProps, {
                        variant: "outlined",
                        style: { "width": "300px", "height": "300px" },
                        onClick: openDialog
                      }), {
                        default: withCtx(() => [
                          createVNode("img", { src: _imports_1 })
                        ]),
                        _: 2
                      }, 1040)
                    ]),
                    default: withCtx(({ isActive }) => [
                      createVNode(VCard, { title: "Biometria" }, {
                        default: withCtx(() => [
                          createVNode(VRow, null, {
                            default: withCtx(() => [
                              createVNode(VCol, null, {
                                default: withCtx(() => [
                                  createVNode(VSelect, {
                                    items: unref(devices),
                                    modelValue: unref(selectedDeviceId),
                                    "onUpdate:modelValue": ($event) => isRef(selectedDeviceId) ? selectedDeviceId.value = $event : null,
                                    "item-title": "label",
                                    "item-value": "deviceId",
                                    label: "Selecionar Webcam"
                                  }, null, 8, ["items", "modelValue", "onUpdate:modelValue"])
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
                                  createVNode(VBtn, { onClick: startVideo }, {
                                    default: withCtx(() => [
                                      createTextVNode("Exibir")
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(VRow, null, {
                            default: withCtx(() => [
                              createVNode(VContainer, { style: { "overflow": "hidden" } }, {
                                default: withCtx(() => [
                                  createVNode(VCol, null, {
                                    default: withCtx(() => [
                                      createVNode("video", {
                                        class: "ml-3",
                                        ref_key: "video",
                                        ref: video,
                                        width: "640",
                                        height: "480",
                                        autoplay: "",
                                        style: { transform: `scale(${unref(zoomLevel)})`, transformOrigin: "center center" }
                                      }, null, 4)
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(VContainer, null, {
                            default: withCtx(() => [
                              createVNode(VSlider, {
                                modelValue: unref(zoomLevel),
                                "onUpdate:modelValue": ($event) => isRef(zoomLevel) ? zoomLevel.value = $event : null,
                                min: 1,
                                max: 3,
                                step: "0.1",
                                label: "Zoom"
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            _: 1
                          }),
                          createVNode(VRow, { class: "mt-10 justify-space-around" }, {
                            default: withCtx(() => [
                              createVNode("div", { onClick: closeDialog }, [
                                createVNode("img", {
                                  style: { "cursor": "pointer" },
                                  src: _imports_0$1,
                                  alt: "Excluir"
                                })
                              ]),
                              createVNode("div", { onClick: handleCapture }, [
                                createVNode("img", {
                                  style: { "cursor": "pointer" },
                                  src: _imports_3,
                                  alt: "Salvar"
                                })
                              ])
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              }),
              createVNode(VCol, null, {
                default: withCtx(() => [
                  createVNode("img", {
                    class: "btn-pointer",
                    src: _imports_4,
                    alt: "Excluir"
                  })
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, { to: "/pessoas/registros" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<img class="mt-15"${ssrRenderAttr("src", _imports_0$1)} alt="Sair"${_scopeId}>`);
          } else {
            return [
              createVNode("img", {
                class: "mt-15",
                src: _imports_0$1,
                alt: "Sair"
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
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/fontes/atos/Testamento.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Testamento = _sfc_main;

export { Testamento as default };
//# sourceMappingURL=Testamento-DjFXRBcO.mjs.map
