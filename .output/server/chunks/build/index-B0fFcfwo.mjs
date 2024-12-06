import { ref, provide, unref, mergeProps, useSSRContext } from 'vue';
import { ssrRenderComponent } from 'vue/server-renderer';
import { Toolbar, DocumentEditorContainerComponent } from '@syncfusion/ej2-vue-documenteditor';
import { registerLicense } from '@syncfusion/ej2-base';

const serviceUrl = "https://ej2services.syncfusion.com/production/web-services/api/documenteditor/";
const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    registerLicense(
      "Ngo9BigBOggjHTQxAR8/V1NDaF1cX2hIfEx3R3xbf1x0ZFREallXTnRWUj0eQnxTdEFiW39bcXZQQGJVUUJ3Ww=="
    );
    ref(null);
    provide("DocumentEditorContainer", [Toolbar]);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(DocumentEditorContainerComponent), mergeProps({
        style: { "height": "80vh" },
        serviceUrl,
        enableToolbar: true
      }, _attrs), null, _parent));
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-B0fFcfwo.mjs.map
