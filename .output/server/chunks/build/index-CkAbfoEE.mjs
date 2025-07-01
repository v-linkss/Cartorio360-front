import { ref, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrIncludeBooleanAttr, ssrRenderClass } from 'vue/server-renderer';
import { _ as _export_sfc, c as useRuntimeConfig } from './server.mjs';
import { u as useHead } from './index-C2merokO.mjs';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:fs';
import 'node:path';
import 'node:url';
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

const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const fileContent = ref("");
    const fileName = ref("");
    const uploadedFile = ref(null);
    const statusMessage = ref("");
    const statusClass = ref("");
    const isReadOnly = ref(false);
    const config = useRuntimeConfig();
    ref(null);
    `${config.public.managemant}/migracao_dados`;
    useHead({
      title: "Upload de Arquivo",
      meta: [
        { name: "description", content: "Ferramenta para enviar arquivos via FormData" }
      ]
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "container" }, _attrs))} data-v-841ff2d9><div class="bg-white rounded-lg shadow-sm p-6" data-v-841ff2d9><h1 class="text-2xl font-bold text-gray-800 mb-6" data-v-841ff2d9>Selecione um arquivo</h1><div class="mb-8 flex flex-col items-start gap-2" data-v-841ff2d9><input type="file" class="hidden" accept=".txt,.json,.md,.js,.html,.css,.xml,.csv" data-v-841ff2d9><button type="button" class="btn-primary" data-v-841ff2d9> Escolher Arquivo </button>`);
      if (fileName.value) {
        _push(`<div class="text-sm text-gray-600" data-v-841ff2d9><span class="font-medium" data-v-841ff2d9>Arquivo carregado:</span> ${ssrInterpolate(fileName.value)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="mb-6 w-full" data-v-841ff2d9><label class="block text-sm font-medium text-gray-700 mb-2" data-v-841ff2d9> Conte\xFAdo do arquivo </label><textarea class="w-full h-64 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm" placeholder="O conte\xFAdo do arquivo aparecer\xE1 aqui..."${ssrIncludeBooleanAttr(isReadOnly.value) ? " readonly" : ""} data-v-841ff2d9>${ssrInterpolate(fileContent.value)}</textarea></div><div class="flex gap-4" data-v-841ff2d9><button${ssrIncludeBooleanAttr(!uploadedFile.value) ? " disabled" : ""} class="btn-primary" data-v-841ff2d9> Salvar </button><button${ssrIncludeBooleanAttr(!fileContent.value) ? " disabled" : ""} class="btn-secondary" data-v-841ff2d9> Limpar </button></div>`);
      if (statusMessage.value) {
        _push(`<div class="${ssrRenderClass([statusClass.value, "mt-4 p-3 rounded-md"])}" data-v-841ff2d9>${ssrInterpolate(statusMessage.value)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/upload_arquivo_texto/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : undefined;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-841ff2d9"]]);

export { index as default };
//# sourceMappingURL=index-CkAbfoEE.mjs.map
