import { hasInjectionContext, getCurrentInstance, inject, unref, version, ref, watch, onScopeDispose, isVNode, Comment, Fragment, computed, provide, defineComponent, capitalize, camelize, h, toRaw, createVNode, mergeProps, nextTick, shallowRef, isRef, toRef, reactive, toRefs, Text, watchEffect, Transition, resolveDynamicComponent, withDirectives, createTextVNode, readonly, Teleport, vShow, resolveDirective, cloneVNode, Suspense, warn, withModifiers, toDisplayString, shallowReactive, withCtx, isReadonly, effectScope, TransitionGroup, useSSRContext, createApp, getCurrentScope, isShallow, isReactive, onErrorCaptured, onServerPrefetch, defineAsyncComponent } from 'vue';
import { $ as $fetch, w as withQuery, l as hasProtocol, m as isScriptProtocol, n as joinURL, h as createError, p as parse, o as getRequestHeader, q as klona, r as defu, t as sanitizeStatusCode, v as destr, x as isEqual, y as setCookie, z as getCookie, A as deleteCookie, B as toRouteMatcher, C as createRouter$1, D as createHooks } from '../runtime.mjs';
import { b as baseURL } from '../routes/renderer.mjs';
import { getActiveHead, CapoPlugin } from 'unhead';
import { defineHeadPlugin } from '@unhead/shared';
import { useRoute, RouterView, createMemoryHistory, createRouter, START_LOCATION } from 'vue-router';
import Ve, { toast } from 'vue3-toastify';
import De from 'vue-the-mask';
import { ssrRenderComponent, ssrRenderSuspense, ssrRenderVNode } from 'vue/server-renderer';
import 'node:http';
import 'node:https';
import 'fs';
import 'path';
import 'node:fs';
import 'node:url';
import 'vue-bundle-renderer/runtime';
import 'devalue';
import '@unhead/ssr';

function createContext(opts = {}) {
  let currentInstance;
  let isSingleton = false;
  const checkConflict = (instance) => {
    if (currentInstance && currentInstance !== instance) {
      throw new Error("Context conflict");
    }
  };
  let als;
  if (opts.asyncContext) {
    const _AsyncLocalStorage = opts.AsyncLocalStorage || globalThis.AsyncLocalStorage;
    if (_AsyncLocalStorage) {
      als = new _AsyncLocalStorage();
    } else {
      console.warn("[unctx] `AsyncLocalStorage` is not provided.");
    }
  }
  const _getCurrentInstance = () => {
    if (als && currentInstance === void 0) {
      const instance = als.getStore();
      if (instance !== void 0) {
        return instance;
      }
    }
    return currentInstance;
  };
  return {
    use: () => {
      const _instance = _getCurrentInstance();
      if (_instance === void 0) {
        throw new Error("Context is not available");
      }
      return _instance;
    },
    tryUse: () => {
      return _getCurrentInstance();
    },
    set: (instance, replace) => {
      if (!replace) {
        checkConflict(instance);
      }
      currentInstance = instance;
      isSingleton = true;
    },
    unset: () => {
      currentInstance = void 0;
      isSingleton = false;
    },
    call: (instance, callback) => {
      checkConflict(instance);
      currentInstance = instance;
      try {
        return als ? als.run(instance, callback) : callback();
      } finally {
        if (!isSingleton) {
          currentInstance = void 0;
        }
      }
    },
    async callAsync(instance, callback) {
      currentInstance = instance;
      const onRestore = () => {
        currentInstance = instance;
      };
      const onLeave = () => currentInstance === instance ? onRestore : void 0;
      asyncHandlers.add(onLeave);
      try {
        const r = als ? als.run(instance, callback) : callback();
        if (!isSingleton) {
          currentInstance = void 0;
        }
        return await r;
      } finally {
        asyncHandlers.delete(onLeave);
      }
    }
  };
}
function createNamespace(defaultOpts = {}) {
  const contexts = {};
  return {
    get(key, opts = {}) {
      if (!contexts[key]) {
        contexts[key] = createContext({ ...defaultOpts, ...opts });
      }
      contexts[key];
      return contexts[key];
    }
  };
}
const _globalThis = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof global !== "undefined" ? global : {};
const globalKey = "__unctx__";
const defaultNamespace = _globalThis[globalKey] || (_globalThis[globalKey] = createNamespace());
const getContext = (key, opts = {}) => defaultNamespace.get(key, opts);
const asyncHandlersKey = "__unctx_async_handlers__";
const asyncHandlers = _globalThis[asyncHandlersKey] || (_globalThis[asyncHandlersKey] = /* @__PURE__ */ new Set());
<<<<<<< HEAD

globalThis.$fetch||(globalThis.$fetch=$fetch.create({baseURL:baseURL()}));const Te=!1,$e={componentName:"NuxtLink"},Me={value:null,errorValue:null,deep:!0},Le={},Re="nuxt-app";function Ne(e=Re){return getContext(e,{asyncContext:!1})}const je="__nuxt_plugin";function He(e,t){t.hooks&&e.hooks.addHooks(t.hooks);}function We(e){if("function"==typeof e)return e;const t=e._name||e.name;return delete e.name,Object.assign(e.setup||(()=>{}),e,{[je]:!0,_name:t})}function ze(e,t,a){const n=()=>t(),l=Ne(e._name);return e.vueApp.runWithContext((()=>l.callAsync(e,n)))}function Ue(e){const t=function(e){var t;let a;return hasInjectionContext()&&(a=null==(t=getCurrentInstance())?void 0:t.appContext.app.$nuxt),a=a||Ne(e).tryUse(),a||null}(e);if(!t)throw new Error("[nuxt] instance unavailable");return t}function Ye(e){return Ue().$config}function Ke(e,t,a){Object.defineProperty(e,t,{get:()=>a});}const Ge=Symbol("layout-meta"),qe=Symbol("route"),Ze=()=>{var e;return null==(e=Ue())?void 0:e.$router},Qe=()=>hasInjectionContext()?inject(qe,Ue()._route):Ue()._route;function Xe(e){return e}const Je=(e,t)=>{e||(e="/");const a="string"==typeof e?e:withQuery(e.path||"/",e.query||{})+(e.hash||""),n=(null==t?void 0:t.external)||hasProtocol(a,{acceptRelative:!0});if(n){if(!(null==t?void 0:t.external))throw new Error("Navigating to an external URL is not allowed by default. Use `navigateTo(url, { external: true })`.");const{protocol:e}=new URL(a,"http://localhost");if(e&&isScriptProtocol(e))throw new Error(`Cannot navigate to a URL with '${e}' protocol.`)}const l=(()=>{try{if(Ue()._processingMiddleware)return !0}catch{return !1}return !1})(),o=Ze(),r=Ue();if(r.ssrContext){const i="string"==typeof e||n?a:o.resolve(e).fullPath||"/",s=n?a:joinURL(Ye().app.baseURL,i),u=async function(e){await r.callHook("app:redirected");const a=s.replace(/"/g,"%22");return r.ssrContext._renderResponse={statusCode:sanitizeStatusCode((null==t?void 0:t.redirectCode)||302,302),body:`<!DOCTYPE html><html><head><meta http-equiv="refresh" content="0; url=${a}"></head></html>`,headers:{location:encodeURI(s)}},e};return !n&&l?(o.afterEach((e=>e.fullPath===i?u(!1):void 0)),e):u(!l&&void 0)}return n?(r._scope.stop(),(null==t?void 0:t.replace)?(void 0).replace(a):(void 0).href=a,l?!!r.isHydrating&&new Promise((()=>{})):Promise.resolve()):(null==t?void 0:t.replace)?o.replace(e):o.push(e)},et="__nuxt_error",tt=()=>toRef(Ue().payload,"error"),at=e=>{const t=nt(e);try{Ue();const e=tt();0,e.value=e.value||t;}catch{throw t}return t},nt=e=>{const t=createError(e);return Object.defineProperty(t,et,{value:!0,configurable:!1,writable:!1}),t};function lt(e,t=""){if(e instanceof Promise)return e;const a="function"==typeof(n=e)?n():unref(n);var n;return e&&a?Array.isArray(a)?a.map((e=>lt(e,t))):"object"==typeof a?Object.fromEntries(Object.entries(a).map((([e,t])=>"titleTemplate"===e||e.startsWith("on")?[e,unref(t)]:[e,lt(t,e)]))):a:a}version.startsWith("3"),defineHeadPlugin({hooks:{"entries:resolve":function(e){for(const t of e.entries)t.resolvedInput=lt(t.input);}}});const ot="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},rt="__unhead_injection_handler__";function it(){if(rt in ot)return ot[rt]();const e=inject("usehead");return e||"production"==="production"||console.warn("Unhead is missing Vue context, falling back to shared context. This may have unexpected results."),e||getActiveHead()}CapoPlugin({track:!0});const st=We({name:"nuxt:head",enforce:"pre",setup(e){const t=e.ssrContext.head;var a;a=()=>Ue().vueApp._context.provides.usehead,ot[rt]=a,e.vueApp.use(t);}});const ut="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof global?global:{},ct="__unctx__";ut[ct]||(ut[ct]=function(e={}){const t={};return {get:(a,n={})=>(t[a]||(t[a]=function(e={}){let t,a=!1;const n=e=>{if(t&&t!==e)throw new Error("Context conflict")};let l;if(e.asyncContext){const t=e.AsyncLocalStorage||globalThis.AsyncLocalStorage;t?l=new t:console.warn("[unctx] `AsyncLocalStorage` is not provided.");}const o=()=>{if(l&&void 0===t){const e=l.getStore();if(void 0!==e)return e}return t};return {use:()=>{const e=o();if(void 0===e)throw new Error("Context is not available");return e},tryUse:()=>o(),set:(e,l)=>{l||n(e),t=e,a=!0;},unset:()=>{t=void 0,a=!1;},call:(e,o)=>{n(e),t=e;try{return l?l.run(e,o):o()}finally{a||(t=void 0);}},async callAsync(e,n){t=e;const o=()=>{t=e;},r=()=>t===e?o:void 0;vt.add(r);try{const o=l?l.run(e,n):n();return a||(t=void 0),await o}finally{vt.delete(r);}}}}({...e,...n})),t[a],t[a])}}());const dt="__unctx_async_handlers__",vt=ut[dt]||(ut[dt]=new Set);function pt(e){const t=[];for(const l of vt){const e=l();e&&t.push(e);}const a=()=>{for(const e of t)e();};let n=e();return n&&"object"==typeof n&&"catch"in n&&(n=n.catch((e=>{throw a(),e}))),[n,a]}function ft(e){return Array.isArray(e)?e:[e]}const mt=[{name:"fontes-atos-autencidade",path:"/fontes/atos/autencidade",component:()=>import('./autencidade-EbCLfIT9.mjs').then((e=>e.default||e))},{name:"fontes-atos-autenticacao-autenticacao",path:"/fontes/atos/autenticacao/autenticacao",component:()=>import('./autenticacao-DDVHkOS2.mjs').then((e=>e.default||e))},{name:"fontes-atos-semelhanca",path:"/fontes/atos/semelhanca",component:()=>import('./semelhanca-BTFkoL7h.mjs').then((e=>e.default||e))},{name:"index",path:"/",component:()=>import('./index-CK8uBa1B.mjs').then((e=>e.default||e))},{name:"login",path:"/login",meta:{layout:"false"}||{},component:()=>import('./index-VUO0yGZa.mjs').then((e=>e.default||e))},{name:"ordens-servicos-atualizar-id",path:"/ordens-servicos/atualizar/:id()",component:()=>import('./_id_-C943dOmc.mjs').then((e=>e.default||e))},{name:"ordens-servicos-criar-ato",path:"/ordens-servicos/criar-ato",component:()=>import('./criar-ato-BvXE-N4O.mjs').then((e=>e.default||e))},{name:"ordens-servicos-criar-registro",path:"/ordens-servicos/criar-registro",component:()=>import('./criar-registro-CoC8K6IY.mjs').then((e=>e.default||e))},{name:"ordens-servicos",path:"/ordens-servicos",component:()=>import('./index-BdulsX8v.mjs').then((e=>e.default||e))},{name:"pessoas-atualizar-id",path:"/pessoas/atualizar/:id()",component:()=>import('./_id_-DXbBhuE7.mjs').then((e=>e.default||e))},{name:"pessoas-cadastro",path:"/pessoas/cadastro",component:()=>import('./index-C19ssuNr.mjs').then((e=>e.default||e))},{name:"pessoas-registros",path:"/pessoas/registros",component:()=>import('./index-D_-P6wXr.mjs').then((e=>e.default||e))},{name:"pessoas-vizualizar-id",path:"/pessoas/vizualizar/:id()",component:()=>import('./_id_-Ch8ttaA3.mjs').then((e=>e.default||e))}],gt=(e,t,a)=>(t=!0===t?{}:t,{default:()=>{var n;return t?h(e,t,a):null==(n=a.default)?void 0:n.call(a)}});function ht(e){const t=(null==e?void 0:e.meta.key)??e.path.replace(/(:\w+)\([^)]+\)/g,"$1").replace(/(:\w+)[?+*]/g,"$1").replace(/:\w+/g,(t=>{var a;return (null==(a=e.params[t.slice(1)])?void 0:a.toString())||""}));return "function"==typeof t?t(e):t}function yt(e){try{const t=(void 0).querySelector(e);if(t)return Number.parseFloat(getComputedStyle(t).scrollMarginTop)}catch{}return 0}const bt={hashMode:!1,scrollBehaviorType:"auto",...{scrollBehavior(e,t,a){var n;const l=Ue(),o=(null==(n=Ze().options)?void 0:n.scrollBehaviorType)??"auto";let r=a||void 0;const i="function"==typeof e.meta.scrollToTop?e.meta.scrollToTop(e,t):e.meta.scrollToTop;if(!r&&t&&e&&!1!==i&&function(e,t){return e!==t&&t!==START_LOCATION&&(ht(e)!==ht(t)||!e.matched.every(((e,a)=>{var n,l;return e.components&&e.components.default===(null==(l=null==(n=t.matched[a])?void 0:n.components)?void 0:l.default)})))}(e,t)&&(r={left:0,top:0}),e.path===t.path)return t.hash&&!e.hash?{left:0,top:0}:!!e.hash&&{el:e.hash,top:yt(e.hash),behavior:o};const s=e=>!!(e.meta.pageTransition??Te),u=s(t)&&s(e)?"page:transition:finish":"page:finish";return new Promise((t=>{l.hooks.hookOnce(u,(async()=>{await new Promise((e=>setTimeout(e,0))),e.hash&&(r={el:e.hash,top:yt(e.hash),behavior:o}),t(r);}));}))}}};function kt(e=Ue()){var t;return null==(t=e.ssrContext)?void 0:t.event}function xt(){var e;return (null==(e=kt())?void 0:e.$fetch)||globalThis.$fetch}const St={path:"/",watch:!0,decode:e=>destr(decodeURIComponent(e)),encode:e=>encodeURIComponent("string"==typeof e?e:JSON.stringify(e))};function Ct(e,t){var a;const n={...St,...t},l=function(e={}){return parse(getRequestHeader(kt(),"cookie")||"",e)}(n)||{};let o;void 0!==n.maxAge?o=1e3*n.maxAge:n.expires&&(o=n.expires.getTime()-Date.now());const r=klona(void 0!==o&&o<=0?void 0:l[e]??(null==(a=n.default)?void 0:a.call(n))),i=ref(r);{const t=Ue(),a=()=>{n.readonly||isEqual(i.value,l[e])||function(e,t,a,n={}){if(e){if(null!=a)return setCookie(e,t,a,n);if(void 0!==getCookie(e,t))deleteCookie(e,t,n);}}(kt(t),e,i.value,n);},o=t.hooks.hookOnce("app:rendered",a);t.hooks.hookOnce("app:error",(()=>(o(),a())));}return i}const wt=[Xe((async e=>{var t;let a,n;if(!(null==(t=e.meta)?void 0:t.validate))return;Ue(),Ze();const l=([a,n]=pt((()=>Promise.resolve(e.meta.validate(e)))),a=await a,n(),a);return !0!==l?l:void 0})),Xe(((e,t)=>{if(!Ct("auth_token").value&&"/login"!==e.path)return Je("/login")})),Xe((async e=>{}))],_t={},At=We({name:"nuxt:router",enforce:"pre",async setup(e){var n,l,o,r;let i,s,u=Ye().app.baseURL;bt.hashMode&&!u.includes("#")&&(u+="#");const c=(null==(n=bt.history)?void 0:n.call(bt,u))??createMemoryHistory(u),d=(null==(l=bt.routes)?void 0:l.call(bt,mt))??mt;let f;const m=createRouter({...bt,scrollBehavior:(e,t,a)=>{if(t!==START_LOCATION){if(bt.scrollBehavior){if(m.options.scrollBehavior=bt.scrollBehavior,"scrollRestoration"in(void 0).history){const e=m.beforeEach((()=>{e(),(void 0).history.scrollRestoration="manual";}));}return bt.scrollBehavior(e,START_LOCATION,f||a)}}else f=a;},history:c,routes:d});e.vueApp.use(m);const g=shallowRef(m.currentRoute.value);m.afterEach(((e,t)=>{g.value=t;})),Object.defineProperty(e.vueApp.config.globalProperties,"previousRoute",{get:()=>g.value});const h=e.ssrContext.url,y=shallowRef(m.currentRoute.value),b=()=>{y.value=m.currentRoute.value;};e.hook("page:finish",b),m.afterEach(((e,t)=>{var a,n,l,o;(null==(n=null==(a=e.matched[0])?void 0:a.components)?void 0:n.default)===(null==(o=null==(l=t.matched[0])?void 0:l.components)?void 0:o.default)&&b();}));const k={};for(const t in y.value)Object.defineProperty(k,t,{get:()=>y.value[t]});e._route=shallowReactive(k),e._middleware=e._middleware||{global:[],named:{}},tt(),(null==(o=e.ssrContext)?void 0:o.islandContext)||m.afterEach((async(t,a,n)=>{delete e._processingMiddleware,n&&await e.callHook("page:loading:end"),4!==(null==n?void 0:n.type)&&(0===t.matched.length?await e.runWithContext((()=>at(createError({statusCode:404,fatal:!1,statusMessage:`Page not found: ${t.fullPath}`,data:{path:t.fullPath}})))):t.redirectedFrom&&t.fullPath!==h&&await e.runWithContext((()=>Je(t.fullPath||"/"))));}));try{[i,s]=pt((()=>m.push(h))),await i,s(),[i,s]=pt((()=>m.isReady())),await i,s();}catch(C){[i,s]=pt((()=>e.runWithContext((()=>at(C))))),await i,s();}const x=m.currentRoute.value;if(b(),null==(r=e.ssrContext)?void 0:r.islandContext)return {provide:{router:m}};const S=e.payload.state._layout;return m.beforeEach((async(t,n)=>{var l,o;if(await e.callHook("page:loading:start"),t.meta=reactive(t.meta),e.isHydrating&&S&&!isReadonly(t.meta.layout)&&(t.meta.layout=S),e._processingMiddleware=!0,!(null==(l=e.ssrContext)?void 0:l.islandContext)){const a=new Set([...wt,...e._middleware.global]);for(const e of t.matched){const t=e.meta.middleware;if(t)for(const e of ft(t))a.add(e);}{const n=await e.runWithContext((()=>async function(e){{const t=toRouteMatcher(createRouter$1({routes:Ye().nitro.routeRules}));return defu({},...t.matchAll(e).reverse())}}(t.path)));if(n.appMiddleware)for(const e in n.appMiddleware)n.appMiddleware[e]?a.add(e):a.delete(e);}for(const l of a){const a="string"==typeof l?e._middleware.named[l]||await(null==(o=_t[l])?void 0:o.call(_t).then((e=>e.default||e))):l;if(!a)throw new Error(`Unknown route middleware: '${l}'.`);const r=await e.runWithContext((()=>a(t,n)));if(!1===r||r instanceof Error){const t=r||createError({statusCode:404,statusMessage:`Page Not Found: ${h}`});return await e.runWithContext((()=>at(t))),!1}if(!0!==r&&(r||!1===r))return r}}})),m.onError((async()=>{delete e._processingMiddleware,await e.callHook("page:loading:end");})),e.hooks.hookOnce("app:created",(async()=>{try{"name"in x&&(x.name=void 0),await m.replace({...x,force:!0}),m.options.scrollBehavior=bt.scrollBehavior;}catch(C){await e.runWithContext((()=>at(C)));}})),{provide:{router:m}}}});const It={NuxtError:e=>{return !!(t=e)&&"object"==typeof t&&et in t&&e.toJSON();var t;},EmptyShallowRef:e=>isRef(e)&&isShallow(e)&&!e.value&&("bigint"==typeof e.value?"0n":JSON.stringify(e.value)||"_"),EmptyRef:e=>isRef(e)&&!e.value&&("bigint"==typeof e.value?"0n":JSON.stringify(e.value)||"_"),ShallowRef:e=>isRef(e)&&isShallow(e)&&e.value,ShallowReactive:e=>isReactive(e)&&isShallow(e)&&toRaw(e),Ref:e=>isRef(e)&&e.value,Reactive:e=>isReactive(e)&&toRaw(e)},Pt=We({name:"nuxt:revive-payload:server",setup(){for(const a in It)e=a,t=It[a],Ue().ssrContext._payloadReducers[e]=t;var e,t;}}),Vt=We({name:"nuxt:global-components"}),Bt=We((({vueApp:e})=>(e.use(Ve,{autoClose:2e3}),toast.error=e=>toast(e,{type:"error",position:"top-right",icon:"❌",theme:"dark"}),{provide:{toast:toast}})));function Dt(t,a){let n;function l(){n=effectScope(),n.run((()=>a.length?a((()=>{null==n||n.stop(),l();})):a()));}watch(t,(e=>{e&&!n?l():e||(null==n||n.stop(),n=void 0);}),{immediate:!0}),onScopeDispose((()=>{null==n||n.stop();}));}const Ot=!1,Ft=Ot;function Et(e,t,a){const n=t.length-1;if(n<0)return void 0===e?a:e;for(let l=0;l<n;l++){if(null==e)return a;e=e[t[l]];}return null==e||void 0===e[t[n]]?a:e[t[n]]}function Tt(e,t){if(e===t)return !0;if(e instanceof Date&&t instanceof Date&&e.getTime()!==t.getTime())return !1;if(e!==Object(e)||t!==Object(t))return !1;const a=Object.keys(e);return a.length===Object.keys(t).length&&a.every((a=>Tt(e[a],t[a])))}function $t(e,t,a){return null!=e&&t&&"string"==typeof t?void 0!==e[t]?e[t]:Et(e,(t=(t=t.replace(/\[(\w+)\]/g,".$1")).replace(/^\./,"")).split("."),a):a}function Mt(e,t,a){if(!0===t)return void 0===e?a:e;if(null==t||"boolean"==typeof t)return a;if(e!==Object(e)){if("function"!=typeof t)return a;const n=t(e,a);return void 0===n?a:n}if("string"==typeof t)return $t(e,t,a);if(Array.isArray(t))return Et(e,t,a);if("function"!=typeof t)return a;const n=t(e,a);return void 0===n?a:n}function Lt(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;return Array.from({length:e},((e,a)=>t+a))}function Rt(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"px";return null==e||""===e?void 0:isNaN(+e)?String(e):isFinite(+e)?`${Number(e)}${t}`:void 0}function Nt(e){return null!==e&&"object"==typeof e&&!Array.isArray(e)}function jt(e){if(e&&"$el"in e){const t=e.$el;return (null==t?void 0:t.nodeType)===Node.TEXT_NODE?t.nextElementSibling:t}return e}const Ht=Object.freeze({enter:13,tab:9,delete:46,esc:27,space:32,up:38,down:40,left:37,right:39,end:35,home:36,del:46,backspace:8,insert:45,pageup:33,pagedown:34,shift:16}),Wt=Object.freeze({enter:"Enter",tab:"Tab",delete:"Delete",esc:"Escape",space:"Space",up:"ArrowUp",down:"ArrowDown",left:"ArrowLeft",right:"ArrowRight",end:"End",home:"Home",del:"Delete",backspace:"Backspace",insert:"Insert",pageup:"PageUp",pagedown:"PageDown",shift:"Shift"});function zt(e){return Object.keys(e)}function Ut(e,t){return t.every((t=>e.hasOwnProperty(t)))}function Yt(e,t){const a={},n=new Set(Object.keys(e));for(const l of t)n.has(l)&&(a[l]=e[l]);return a}function Kt(e,t,a){const n=Object.create(null),l=Object.create(null);for(const o in e)t.some((e=>e instanceof RegExp?e.test(o):e===o))&&!(void 0)?n[o]=e[o]:l[o]=e[o];return [n,l]}function Gt(e,t){const a={...e};return t.forEach((e=>delete a[e])),a}const qt=/^on[^a-z]/,Zt=e=>qt.test(e),Qt=["onAfterscriptexecute","onAnimationcancel","onAnimationend","onAnimationiteration","onAnimationstart","onAuxclick","onBeforeinput","onBeforescriptexecute","onChange","onClick","onCompositionend","onCompositionstart","onCompositionupdate","onContextmenu","onCopy","onCut","onDblclick","onFocusin","onFocusout","onFullscreenchange","onFullscreenerror","onGesturechange","onGestureend","onGesturestart","onGotpointercapture","onInput","onKeydown","onKeypress","onKeyup","onLostpointercapture","onMousedown","onMousemove","onMouseout","onMouseover","onMouseup","onMousewheel","onPaste","onPointercancel","onPointerdown","onPointerenter","onPointerleave","onPointermove","onPointerout","onPointerover","onPointerup","onReset","onSelect","onSubmit","onTouchcancel","onTouchend","onTouchmove","onTouchstart","onTransitioncancel","onTransitionend","onTransitionrun","onTransitionstart","onWheel"];function Xt(e){const[t,a]=Kt(e,[qt]),n=Gt(t,Qt),[l,o]=Kt(a,["class","style","id",/^data-/]);return Object.assign(l,t),Object.assign(o,n),[l,o]}function Jt(e){return null==e?[]:Array.isArray(e)?e:[e]}function ea(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:1;return Math.max(t,Math.min(a,e))}function ta(e){const t=e.toString().trim();return t.includes(".")?t.length-t.indexOf(".")-1:0}function aa(e,t){return e+(arguments.length>2&&void 0!==arguments[2]?arguments[2]:"0").repeat(Math.max(0,t-e.length))}function na(e,t){return (arguments.length>2&&void 0!==arguments[2]?arguments[2]:"0").repeat(Math.max(0,t-e.length))+e}function la(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},a=arguments.length>2?arguments[2]:void 0;const n={};for(const l in e)n[l]=e[l];for(const l in t){const o=e[l],r=t[l];Nt(o)&&Nt(r)?n[l]=la(o,r,a):Array.isArray(o)&&Array.isArray(r)&&a?n[l]=a(o,r):n[l]=r;}return n}function oa(e){return e.map((e=>e.type===Fragment?oa(e.children):e)).flat()}function ra(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";if(ra.cache.has(e))return ra.cache.get(e);const t=e.replace(/[^a-z]/gi,"-").replace(/\B([A-Z])/g,"-$1").toLowerCase();return ra.cache.set(e,t),t}function ia(e,t){if(!t||"object"!=typeof t)return [];if(Array.isArray(t))return t.map((t=>ia(e,t))).flat(1);if(t.suspense)return ia(e,t.ssContent);if(Array.isArray(t.children))return t.children.map((t=>ia(e,t))).flat(1);if(t.component){if(Object.getOwnPropertySymbols(t.component.provides).includes(e))return [t.component];if(t.component.subTree)return ia(e,t.component.subTree).flat(1)}return []}function sa(e){const t=reactive({}),n=computed(e);return watchEffect((()=>{for(const e in n.value)t[e]=n.value[e];}),{flush:"sync"}),toRefs(t)}function ua(e,t){return e.includes(t)}ra.cache=new Map;const ca=()=>[Function,Array];function da(e,t){return !!(e[t="on"+capitalize(t)]||e[`${t}Once`]||e[`${t}Capture`]||e[`${t}OnceCapture`]||e[`${t}CaptureOnce`])}function va(e){let t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];const a=["button","[href]",'input:not([type="hidden"])',"select","textarea","[tabindex]"].map((e=>`${e}${t?':not([tabindex="-1"])':""}:not([disabled])`)).join(", ");return [...e.querySelectorAll(a)]}function pa(e,t,a){let n,l=e.indexOf((void 0).activeElement);const o="next"===t?1:-1;do{l+=o,n=e[l];}while((!n||null==n.offsetParent||!((null==a?void 0:a(n))??1))&&l<e.length&&l>=0);return n}function fa(e,t){var a,n,l,o;const r=va(e);if(t)if("first"===t)null==(n=r[0])||n.focus();else if("last"===t)null==(l=r.at(-1))||l.focus();else if("number"==typeof t)null==(o=r[t])||o.focus();else {const a=pa(r,t);a?a.focus():fa(e,"next"===t?"first":"last");}else e!==(void 0).activeElement&&e.contains((void 0).activeElement)||null==(a=r[0])||a.focus();}function ma(e){return null==e||"string"==typeof e&&""===e.trim()}function ga(){}function ha(e,t){return null}function ya(e){return e.some((e=>!isVNode(e)||e.type!==Comment&&(e.type!==Fragment||ya(e.children))))?e:null}function ba(e,t){const a=shallowRef();return watchEffect((()=>{a.value=e();}),{flush:"sync",...t}),readonly(a)}function ka(){const e=shallowRef(),t=t=>{e.value=t;};return Object.defineProperty(t,"value",{enumerable:!0,get:()=>e.value,set:t=>e.value=t}),Object.defineProperty(t,"el",{enumerable:!0,get:()=>jt(e.value)}),t}const xa=["top","bottom"],Sa=["start","end","left","right"];function Ca(e,t){let[a,n]=e.split(" ");return n||(n=ua(xa,a)?"start":ua(Sa,a)?"top":"center"),{side:wa(a,t),align:wa(n,t)}}function wa(e,t){return "start"===e?t?"right":"left":"end"===e?t?"left":"right":e}function _a(e){return {side:{center:"center",top:"bottom",bottom:"top",left:"right",right:"left"}[e.side],align:e.align}}function Aa(e){return {side:e.side,align:{center:"center",top:"bottom",bottom:"top",left:"right",right:"left"}[e.align]}}function Ia(e){return {side:e.align,align:e.side}}function Pa(e){return ua(xa,e.side)?"y":"x"}class Va{constructor(e){let{x:t,y:a,width:n,height:l}=e;this.x=t,this.y=a,this.width=n,this.height=l;}get top(){return this.y}get bottom(){return this.y+this.height}get left(){return this.x}get right(){return this.x+this.width}}function Ba(e,t){return {x:{before:Math.max(0,t.left-e.left),after:Math.max(0,e.right-t.right)},y:{before:Math.max(0,t.top-e.top),after:Math.max(0,e.bottom-t.bottom)}}}function Da(e){return Array.isArray(e)?new Va({x:e[0],y:e[1],width:0,height:0}):e.getBoundingClientRect()}function Oa(e){const t=e.getBoundingClientRect(),a=getComputedStyle(e),n=a.transform;if(n){let l,o,r,i,s;if(n.startsWith("matrix3d("))l=n.slice(9,-1).split(/, /),o=+l[0],r=+l[5],i=+l[12],s=+l[13];else {if(!n.startsWith("matrix("))return new Va(t);l=n.slice(7,-1).split(/, /),o=+l[0],r=+l[3],i=+l[4],s=+l[5];}const u=a.transformOrigin,c=t.x-i-(1-o)*parseFloat(u),d=t.y-s-(1-r)*parseFloat(u.slice(u.indexOf(" ")+1)),v=o?t.width/o:e.offsetWidth+1,p=r?t.height/r:e.offsetHeight+1;return new Va({x:c,y:d,width:v,height:p})}return new Va(t)}function Fa(e,t,a){if(void 0===e.animate)return {finished:Promise.resolve()};let n;try{n=e.animate(t,a);}catch(l){return {finished:Promise.resolve()}}return void 0===n.finished&&(n.finished=new Promise((e=>{n.onfinish=()=>{e(n);};}))),n}const Ea=2.4,Ta=.2126729,$a=.7151522,Ma=.072175,La=.55,Ra=.58,Na=.57,ja=.62,Ha=.03,Wa=1.45,za=5e-4,Ua=1.25,Ya=1.25,Ka=.078,Ga=12.82051282051282,qa=.06,Za=.001;function Qa(e,t){const a=(e.r/255)**Ea,n=(e.g/255)**Ea,l=(e.b/255)**Ea,o=(t.r/255)**Ea,r=(t.g/255)**Ea,i=(t.b/255)**Ea;let s,u=a*Ta+n*$a+l*Ma,c=o*Ta+r*$a+i*Ma;if(u<=Ha&&(u+=(Ha-u)**Wa),c<=Ha&&(c+=(Ha-c)**Wa),Math.abs(c-u)<za)return 0;if(c>u){const e=(c**La-u**Ra)*Ua;s=e<Za?0:e<Ka?e-e*Ga*qa:e-qa;}else {const e=(c**ja-u**Na)*Ya;s=e>-Za?0:e>-Ka?e-e*Ga*qa:e+qa;}return 100*s}function Xa(e){warn(`Vuetify: ${e}`);}function Ja(e){warn(`Vuetify error: ${e}`);}const en=.20689655172413793,tn=e=>e>en**3?Math.cbrt(e):e/(3*en**2)+4/29,an=e=>e>en?e**3:3*en**2*(e-4/29);function nn(e){const t=tn,a=t(e[1]);return [116*a-16,500*(t(e[0]/.95047)-a),200*(a-t(e[2]/1.08883))]}function ln(e){const t=an,a=(e[0]+16)/116;return [.95047*t(a+e[1]/500),t(a),1.08883*t(a-e[2]/200)]}const on=[[3.2406,-1.5372,-.4986],[-.9689,1.8758,.0415],[.0557,-.204,1.057]],rn=e=>e<=.0031308?12.92*e:1.055*e**(1/2.4)-.055,sn=[[.4124,.3576,.1805],[.2126,.7152,.0722],[.0193,.1192,.9505]],un=e=>e<=.04045?e/12.92:((e+.055)/1.055)**2.4;function cn(e){const t=Array(3),a=rn,n=on;for(let l=0;l<3;++l)t[l]=Math.round(255*ea(a(n[l][0]*e[0]+n[l][1]*e[1]+n[l][2]*e[2])));return {r:t[0],g:t[1],b:t[2]}}function dn(e){let{r:t,g:a,b:n}=e;const l=[0,0,0],o=un,r=sn;t=o(t/255),a=o(a/255),n=o(n/255);for(let i=0;i<3;++i)l[i]=r[i][0]*t+r[i][1]*a+r[i][2]*n;return l}function vn(e){return !!e&&/^(#|var\(--|(rgb|hsl)a?\()/.test(e)}const pn=/^(?<fn>(?:rgb|hsl)a?)\((?<values>.+)\)/,fn={rgb:(e,t,a,n)=>({r:e,g:t,b:a,a:n}),rgba:(e,t,a,n)=>({r:e,g:t,b:a,a:n}),hsl:(e,t,a,n)=>hn({h:e,s:t,l:a,a:n}),hsla:(e,t,a,n)=>hn({h:e,s:t,l:a,a:n}),hsv:(e,t,a,n)=>gn({h:e,s:t,v:a,a:n}),hsva:(e,t,a,n)=>gn({h:e,s:t,v:a,a:n})};function mn(e){if("number"==typeof e)return (isNaN(e)||e<0||e>16777215)&&Xa(`'${e}' is not a valid hex color`),{r:(16711680&e)>>16,g:(65280&e)>>8,b:255&e};if("string"==typeof e&&pn.test(e)){const{groups:t}=e.match(pn),{fn:a,values:n}=t,l=n.split(/,\s*/).map((e=>e.endsWith("%")&&["hsl","hsla","hsv","hsva"].includes(a)?parseFloat(e)/100:parseFloat(e)));return fn[a](...l)}if("string"==typeof e){let t=e.startsWith("#")?e.slice(1):e;[3,4].includes(t.length)?t=t.split("").map((e=>e+e)).join(""):[6,8].includes(t.length)||Xa(`'${e}' is not a valid hex(a) color`);const a=parseInt(t,16);return (isNaN(a)||a<0||a>4294967295)&&Xa(`'${e}' is not a valid hex(a) color`),function(e){e=function(e){e.startsWith("#")&&(e=e.slice(1));e=e.replace(/([^0-9a-f])/gi,"F"),(3===e.length||4===e.length)&&(e=e.split("").map((e=>e+e)).join(""));6!==e.length&&(e=aa(aa(e,6),8,"F"));return e}(e);let[t,a,n,l]=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1;const a=[];let n=0;for(;n<e.length;)a.push(e.substr(n,t)),n+=t;return a}(e,2).map((e=>parseInt(e,16)));return l=void 0===l?l:l/255,{r:t,g:a,b:n,a:l}}(t)}if("object"==typeof e){if(Ut(e,["r","g","b"]))return e;if(Ut(e,["h","s","l"]))return gn(yn(e));if(Ut(e,["h","s","v"]))return gn(e)}throw new TypeError(`Invalid color: ${null==e?e:String(e)||e.constructor.name}\nExpected #hex, #hexa, rgb(), rgba(), hsl(), hsla(), object or number`)}function gn(e){const{h:t,s:a,v:n,a:l}=e,o=e=>{const l=(e+t/60)%6;return n-n*a*Math.max(Math.min(l,4-l,1),0)},r=[o(5),o(3),o(1)].map((e=>Math.round(255*e)));return {r:r[0],g:r[1],b:r[2],a:l}}function hn(e){return gn(yn(e))}function yn(e){const{h:t,s:a,l:n,a:l}=e,o=n+a*Math.min(n,1-n);return {h:t,s:0===o?0:2-2*n/o,v:o,a:l}}function bn(e){const t=Math.round(e).toString(16);return ("00".substr(0,2-t.length)+t).toUpperCase()}function kn(e){let{r:t,g:a,b:n,a:l}=e;return `#${[bn(t),bn(a),bn(n),void 0!==l?bn(Math.round(255*l)):""].join("")}`}function xn(e,t){const a=nn(dn(e));return a[0]=a[0]+10*t,cn(ln(a))}function Sn(e,t){const a=nn(dn(e));return a[0]=a[0]-10*t,cn(ln(a))}function Cn(e){const t=Math.abs(Qa(mn(0),mn(e)));return Math.abs(Qa(mn(16777215),mn(e)))>Math.min(t,50)?"#fff":"#000"}function wn(e,t){return a=>Object.keys(e).reduce(((n,l)=>{const o="object"==typeof e[l]&&null!=e[l]&&!Array.isArray(e[l])?e[l]:{type:e[l]};return n[l]=a&&l in a?{...o,default:a[l]}:o,t&&!n[l].source&&(n[l].source=t),n}),{})}const _n=wn({class:[String,Array,Object],style:{type:[String,Array,Object],default:null}},"component");function An(e,t){const a=getCurrentInstance();if(!a)throw new Error(`[Vuetify] ${e} must be called from inside a setup function`);return a}function In(){const e=An(arguments.length>0&&void 0!==arguments[0]?arguments[0]:"composables").type;return ra((null==e?void 0:e.aliasName)||(null==e?void 0:e.name))}let Pn=0,Vn=new WeakMap;function Bn(){const e=An("getUid");if(Vn.has(e))return Vn.get(e);{const t=Pn++;return Vn.set(e,t),t}}Bn.reset=()=>{Pn=0,Vn=new WeakMap;};const Dn=Symbol.for("vuetify:defaults");function On(){const e=inject(Dn);if(!e)throw new Error("[Vuetify] Could not find defaults instance");return e}function Fn(e,t){const a=On(),n=ref(e),l=computed((()=>{if(unref(null==t?void 0:t.disabled))return a.value;const e=unref(null==t?void 0:t.scoped),l=unref(null==t?void 0:t.reset),o=unref(null==t?void 0:t.root);if(null==n.value&&!(e||l||o))return a.value;let r=la(n.value,{prev:a.value});if(e)return r;if(l||o){const e=Number(l||1/0);for(let t=0;t<=e&&(r&&"prev"in r);t++)r=r.prev;return r&&"string"==typeof o&&o in r&&(r=la(la(r,{prev:r}),r[o])),r}return r.prev?la(r.prev,r):r}));return provide(Dn,l),l}function En(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=arguments.length>1?arguments[1]:void 0,a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:On();const n=An("useDefaults");if(t=t??n.type.name??n.type.__name,!t)throw new Error("[Vuetify] Could not determine component name");const l=computed((()=>{var n;return null==(n=a.value)?void 0:n[e._as??t]})),o=new Proxy(e,{get(e,t){var o,r,i,s,u,c,d;const v=Reflect.get(e,t);return "class"===t||"style"===t?[null==(o=l.value)?void 0:o[t],v].filter((e=>null!=e)):"string"!=typeof t||function(e,t){var a,n;return void 0!==(null==(a=e.props)?void 0:a[t])||void 0!==(null==(n=e.props)?void 0:n[ra(t)])}(n.vnode,t)?v:void 0!==(null==(r=l.value)?void 0:r[t])?null==(i=l.value)?void 0:i[t]:void 0!==(null==(u=null==(s=a.value)?void 0:s.global)?void 0:u[t])?null==(d=null==(c=a.value)?void 0:c.global)?void 0:d[t]:v}}),r=shallowRef();return watchEffect((()=>{if(l.value){const e=Object.entries(l.value).filter((e=>{let[t]=e;return t.startsWith(t[0].toUpperCase())}));r.value=e.length?Object.fromEntries(e):void 0;}else r.value=void 0;})),{props:o,provideSubDefaults:function(){const e=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:An("injectSelf");const{provides:a}=t;if(a&&e in a)return a[e]}(Dn,n);provide(Dn,computed((()=>r.value?la((null==e?void 0:e.value)??{},r.value):null==e?void 0:e.value)));}}}function Tn(e){if(e._setup=e._setup??e.setup,!e.name)return Xa("The component is missing an explicit name, unable to generate default prop value"),e;if(e._setup){e.props=wn(e.props??{},e.name)();const t=Object.keys(e.props).filter((e=>"class"!==e&&"style"!==e));e.filterProps=function(e){return Yt(e,t)},e.props._as=String,e.setup=function(t,a){const n=On();if(!n.value)return e._setup(t,a);const{props:l,provideSubDefaults:o}=En(t,t._as??e.name,n),r=e._setup(l,a);return o(),r};}return e}function $n(){let e=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];return t=>(e?Tn:defineComponent)(t)}function Mn(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"div",a=arguments.length>2?arguments[2]:void 0;return $n()({name:a??capitalize(camelize(e.replace(/__/g,"-"))),props:{tag:{type:String,default:t},..._n()},setup(t,a){let{slots:n}=a;return ()=>{var a;return h(t.tag,{class:[e,t.class],style:t.style},null==(a=n.default)?void 0:a.call(n))}}})}function Ln(e){if("function"!=typeof e.getRootNode){for(;e.parentNode;)e=e.parentNode;return void 0!==e?null:void 0}const t=e.getRootNode();return void 0!==t&&void 0!==t.getRootNode({composed:!0})?null:t}const Rn="cubic-bezier(0.4, 0, 0.2, 1)";function Nn(e,t,a){return Object.keys(e).filter((e=>Zt(e)&&e.endsWith(t))).reduce(((n,l)=>(n[l.slice(0,-t.length)]=t=>e[l](t,a(t)),n)),{})}function jn(e,t){const a=[];if(t&&e&&!t.contains(e))return a;for(;e&&(Hn(e)&&a.push(e),e!==t);)e=e.parentElement;return a}function Hn(e){if(!e||e.nodeType!==Node.ELEMENT_NODE)return !1;const t=(void 0).getComputedStyle(e);return "scroll"===t.overflowY||"auto"===t.overflowY&&e.scrollHeight>e.clientHeight}function Wn(e){if(!e||e.nodeType!==Node.ELEMENT_NODE)return !1;const t=(void 0).getComputedStyle(e);return ["scroll","auto"].includes(t.overflowY)}function zn(e){An("useRender").render=e;}function Un(e,t,a){let n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:e=>e,l=arguments.length>4&&void 0!==arguments[4]?arguments[4]:e=>e;const o=An("useProxiedModel"),r=ref(void 0!==e[t]?e[t]:a),i=ra(t),s=computed(i!==t?()=>{var a,n,l,r;return e[t],!(!(null==(a=o.vnode.props)?void 0:a.hasOwnProperty(t))&&!(null==(n=o.vnode.props)?void 0:n.hasOwnProperty(i))||!(null==(l=o.vnode.props)?void 0:l.hasOwnProperty(`onUpdate:${t}`))&&!(null==(r=o.vnode.props)?void 0:r.hasOwnProperty(`onUpdate:${i}`)))}:()=>{var a,n;return e[t],!(!(null==(a=o.vnode.props)?void 0:a.hasOwnProperty(t))||!(null==(n=o.vnode.props)?void 0:n.hasOwnProperty(`onUpdate:${t}`)))});Dt((()=>!s.value),(()=>{watch((()=>e[t]),(e=>{r.value=e;}));}));const u=computed({get(){const a=e[t];return n(s.value?a:r.value)},set(a){const i=l(a),u=toRaw(s.value?e[t]:r.value);u!==i&&n(u)!==a&&(r.value=i,null==o||o.emit(`update:${t}`,i));}});return Object.defineProperty(u,"externalValue",{get:()=>s.value?e[t]:r.value}),u}const Yn={badge:"Badge",open:"Open",close:"Close",dismiss:"Dismiss",confirmEdit:{ok:"OK",cancel:"Cancel"},dataIterator:{noResultsText:"No matching records found",loadingText:"Loading items..."},dataTable:{itemsPerPageText:"Rows per page:",ariaLabel:{sortDescending:"Sorted descending.",sortAscending:"Sorted ascending.",sortNone:"Not sorted.",activateNone:"Activate to remove sorting.",activateDescending:"Activate to sort descending.",activateAscending:"Activate to sort ascending."},sortBy:"Sort by"},dataFooter:{itemsPerPageText:"Items per page:",itemsPerPageAll:"All",nextPage:"Next page",prevPage:"Previous page",firstPage:"First page",lastPage:"Last page",pageText:"{0}-{1} of {2}"},dateRangeInput:{divider:"to"},datePicker:{itemsSelected:"{0} selected",range:{title:"Select dates",header:"Enter dates"},title:"Select date",header:"Enter date",input:{placeholder:"Enter date"}},noDataText:"No data available",carousel:{prev:"Previous visual",next:"Next visual",ariaLabel:{delimiter:"Carousel slide {0} of {1}"}},calendar:{moreEvents:"{0} more",today:"Today"},input:{clear:"Clear {0}",prependAction:"{0} prepended action",appendAction:"{0} appended action",otp:"Please enter OTP character {0}"},fileInput:{counter:"{0} files",counterSize:"{0} files ({1} in total)"},timePicker:{am:"AM",pm:"PM",title:"Select Time"},pagination:{ariaLabel:{root:"Pagination Navigation",next:"Next page",previous:"Previous page",page:"Go to page {0}",currentPage:"Page {0}, Current page",first:"First page",last:"Last page"}},stepper:{next:"Next",prev:"Previous"},rating:{ariaLabel:{item:"Rating {0} of {1}"}},loading:"Loading...",infiniteScroll:{loadMore:"Load more",empty:"No more"}},Kn="$vuetify.",Gn=(e,t)=>e.replace(/\{(\d+)\}/g,((e,a)=>String(t[+a]))),qn=(e,t,a)=>function(n){for(var l=arguments.length,o=new Array(l>1?l-1:0),r=1;r<l;r++)o[r-1]=arguments[r];if(!n.startsWith(Kn))return Gn(n,o);const i=n.replace(Kn,""),s=e.value&&a.value[e.value],u=t.value&&a.value[t.value];let c=$t(s,i,null);return c||(Xa(`Translation key "${n}" not found in "${e.value}", trying fallback locale`),c=$t(u,i,null)),c||(Ja(`Translation key "${n}" not found in fallback`),c=n),"string"!=typeof c&&(Ja(`Translation key "${n}" has a non-string value`),c=n),Gn(c,o)};function Zn(e,t){return (a,n)=>new Intl.NumberFormat([e.value,t.value],n).format(a)}function Qn(e,t,a){const n=Un(e,t,e[t]??a.value);return n.value=e[t]??a.value,watch(a,(l=>{null==e[t]&&(n.value=a.value);})),n}function Xn(e){return t=>{const a=Qn(t,"locale",e.current),n=Qn(t,"fallback",e.fallback),l=Qn(t,"messages",e.messages);return {name:"vuetify",current:a,fallback:n,messages:l,t:qn(a,n,l),n:Zn(a,n),provide:Xn({current:a,fallback:n,messages:l})}}}const Jn=Symbol.for("vuetify:locale");function el(e){const t=(null==e?void 0:e.adapter)&&null!=(null==e?void 0:e.adapter).name?null==e?void 0:e.adapter:function(e){const t=shallowRef((null==e?void 0:e.locale)??"en"),a=shallowRef((null==e?void 0:e.fallback)??"en"),n=ref({en:Yn,...null==e?void 0:e.messages});return {name:"vuetify",current:t,fallback:a,messages:n,t:qn(t,a,n),n:Zn(t,a),provide:Xn({current:t,fallback:a,messages:n})}}(e);const a=function(e,t){const a=ref((null==t?void 0:t.rtl)??{af:!1,ar:!0,bg:!1,ca:!1,ckb:!1,cs:!1,de:!1,el:!1,en:!1,es:!1,et:!1,fa:!0,fi:!1,fr:!1,hr:!1,hu:!1,he:!0,id:!1,it:!1,ja:!1,km:!1,ko:!1,lv:!1,lt:!1,nl:!1,no:!1,pl:!1,pt:!1,ro:!1,ru:!1,sk:!1,sl:!1,srCyrl:!1,srLatn:!1,sv:!1,th:!1,tr:!1,az:!1,uk:!1,vi:!1,zhHans:!1,zhHant:!1}),n=computed((()=>a.value[e.current.value]??!1));return {isRtl:n,rtl:a,rtlClasses:computed((()=>"v-locale--is-"+(n.value?"rtl":"ltr")))}}(t,e);return {...t,...a}}function tl(){const e=inject(Jn);if(!e)throw new Error("[Vuetify] Could not find injected locale instance");return e}function al(){const e=inject(Jn);if(!e)throw new Error("[Vuetify] Could not find injected rtl instance");return {isRtl:e.isRtl,rtlClasses:e.rtlClasses}}const nl={"001":1,AD:1,AE:6,AF:6,AG:0,AI:1,AL:1,AM:1,AN:1,AR:1,AS:0,AT:1,AU:1,AX:1,AZ:1,BA:1,BD:0,BE:1,BG:1,BH:6,BM:1,BN:1,BR:0,BS:0,BT:0,BW:0,BY:1,BZ:0,CA:0,CH:1,CL:1,CM:1,CN:1,CO:0,CR:1,CY:1,CZ:1,DE:1,DJ:6,DK:1,DM:0,DO:0,DZ:6,EC:1,EE:1,EG:6,ES:1,ET:0,FI:1,FJ:1,FO:1,FR:1,GB:1,"GB-alt-variant":0,GE:1,GF:1,GP:1,GR:1,GT:0,GU:0,HK:0,HN:0,HR:1,HU:1,ID:0,IE:1,IL:0,IN:0,IQ:6,IR:6,IS:1,IT:1,JM:0,JO:6,JP:0,KE:0,KG:1,KH:0,KR:0,KW:6,KZ:1,LA:0,LB:1,LI:1,LK:1,LT:1,LU:1,LV:1,LY:6,MC:1,MD:1,ME:1,MH:0,MK:1,MM:0,MN:1,MO:0,MQ:1,MT:0,MV:5,MX:0,MY:1,MZ:0,NI:0,NL:1,NO:1,NP:0,NZ:1,OM:6,PA:0,PE:0,PH:0,PK:0,PL:1,PR:0,PT:0,PY:0,QA:6,RE:1,RO:1,RS:1,RU:1,SA:0,SD:6,SE:1,SG:0,SI:1,SK:1,SM:1,SV:0,SY:6,TH:0,TJ:1,TM:1,TR:1,TT:0,TW:0,UA:1,UM:0,US:0,UY:1,UZ:1,VA:1,VE:0,VI:0,VN:1,WS:0,XK:1,YE:0,ZA:0,ZW:0};function ll(e){return new Date(e.getFullYear(),e.getMonth(),1)}function ol(e){return new Date(e.getFullYear(),e.getMonth()+1,0)}const rl=/^([12]\d{3}-([1-9]|0[1-9]|1[0-2])-([1-9]|0[1-9]|[12]\d|3[01]))$/;function il(e){if(null==e)return new Date;if(e instanceof Date)return e;if("string"==typeof e){let t;if(rl.test(e))return function(e){const t=e.split("-").map(Number);return new Date(t[0],t[1]-1,t[2])}(e);if(t=Date.parse(e),!isNaN(t))return new Date(t)}return null}const sl=new Date(2e3,0,2);function ul(e,t){return e.getTime()>t.getTime()}function cl(e,t){return e.getTime()===t.getTime()}function dl(e){return new Date(e.getFullYear(),e.getMonth(),e.getDate(),0,0,0,0)}class vl{constructor(e){this.locale=e.locale,this.formats=e.formats;}date(e){return il(e)}toJsDate(e){return e}toISO(e){return function(e,t){const a=e.toJsDate(t);return `${a.getFullYear()}-${na(String(a.getMonth()+1),2,"0")}-${na(String(a.getDate()),2,"0")}`}(this,e)}parseISO(e){return function(e){const[t,a,n]=e.split("-").map(Number);return new Date(t,a-1,n)}(e)}addMinutes(e,t){return function(e,t){const a=new Date(e);return a.setMinutes(a.getMinutes()+t),a}(e,t)}addHours(e,t){return function(e,t){const a=new Date(e);return a.setHours(a.getHours()+t),a}(e,t)}addDays(e,t){return function(e,t){const a=new Date(e);return a.setDate(a.getDate()+t),a}(e,t)}addWeeks(e,t){return function(e,t){const a=new Date(e);return a.setDate(a.getDate()+7*t),a}(e,t)}addMonths(e,t){return function(e,t){const a=new Date(e);return a.setDate(1),a.setMonth(a.getMonth()+t),a}(e,t)}getWeekArray(e){return function(e,t){const a=[];let n=[];const l=ll(e),o=ol(e),r=(l.getDay()-nl[t.slice(-2).toUpperCase()]+7)%7,i=(o.getDay()-nl[t.slice(-2).toUpperCase()]+7)%7;for(let s=0;s<r;s++){const e=new Date(l);e.setDate(e.getDate()-(r-s)),n.push(e);}for(let s=1;s<=o.getDate();s++){const t=new Date(e.getFullYear(),e.getMonth(),s);n.push(t),7===n.length&&(a.push(n),n=[]);}for(let s=1;s<7-i;s++){const e=new Date(o);e.setDate(e.getDate()+s),n.push(e);}return n.length>0&&a.push(n),a}(e,this.locale)}startOfWeek(e){return function(e,t){const a=new Date(e);for(;a.getDay()!==(nl[t.slice(-2).toUpperCase()]??0);)a.setDate(a.getDate()-1);return a}(e,this.locale)}endOfWeek(e){return function(e,t){const a=new Date(e),n=((nl[t.slice(-2).toUpperCase()]??0)+6)%7;for(;a.getDay()!==n;)a.setDate(a.getDate()+1);return a}(e,this.locale)}startOfMonth(e){return ll(e)}endOfMonth(e){return ol(e)}format(e,t){return function(e,t,a,n){const l=il(e)??new Date,o=null==n?void 0:n[t];if("function"==typeof o)return o(l,t,a);let r={};switch(t){case"fullDate":r={year:"numeric",month:"long",day:"numeric"};break;case"fullDateWithWeekday":r={weekday:"long",year:"numeric",month:"long",day:"numeric"};break;case"normalDate":return `${l.getDate()} ${new Intl.DateTimeFormat(a,{month:"long"}).format(l)}`;case"normalDateWithWeekday":r={weekday:"short",day:"numeric",month:"short"};break;case"shortDate":r={month:"short",day:"numeric"};break;case"year":r={year:"numeric"};break;case"month":r={month:"long"};break;case"monthShort":r={month:"short"};break;case"monthAndYear":r={month:"long",year:"numeric"};break;case"monthAndDate":r={month:"long",day:"numeric"};break;case"weekday":r={weekday:"long"};break;case"weekdayShort":r={weekday:"short"};break;case"dayOfMonth":return new Intl.NumberFormat(a).format(l.getDate());case"hours12h":r={hour:"numeric",hour12:!0};break;case"hours24h":r={hour:"numeric",hour12:!1};break;case"minutes":r={minute:"numeric"};break;case"seconds":r={second:"numeric"};break;case"fullTime":case"fullTime12h":r={hour:"numeric",minute:"numeric",second:"numeric",hour12:!0};break;case"fullTime24h":r={hour:"numeric",minute:"numeric",second:"numeric",hour12:!1};break;case"fullDateTime":case"fullDateTime12h":r={year:"numeric",month:"long",day:"numeric",hour:"numeric",minute:"numeric",second:"numeric",hour12:!0};break;case"fullDateTime24h":r={year:"numeric",month:"long",day:"numeric",hour:"numeric",minute:"numeric",second:"numeric",hour12:!1};break;case"keyboardDate":r={year:"numeric",month:"2-digit",day:"2-digit"};break;case"keyboardDateTime":case"keyboardDateTime24h":r={year:"numeric",month:"2-digit",day:"2-digit",hour:"numeric",minute:"numeric",second:"numeric",hour12:!1};break;case"keyboardDateTime12h":r={year:"numeric",month:"2-digit",day:"2-digit",hour:"numeric",minute:"numeric",second:"numeric",hour12:!0};break;default:r=o??{timeZone:"UTC",timeZoneName:"short"};}return new Intl.DateTimeFormat(a,r).format(l)}(e,t,this.locale,this.formats)}isEqual(e,t){return cl(e,t)}isValid(e){return function(e){const t=new Date(e);return t instanceof Date&&!isNaN(t.getTime())}(e)}isWithinRange(e,t){return function(e,t){return ul(e,t[0])&&function(e,t){return e.getTime()<t.getTime()}(e,t[1])}(e,t)}isAfter(e,t){return ul(e,t)}isAfterDay(e,t){return function(e,t){return ul(dl(e),dl(t))}(e,t)}isBefore(e,t){return !ul(e,t)&&!cl(e,t)}isSameDay(e,t){return function(e,t){return e.getDate()===t.getDate()&&e.getMonth()===t.getMonth()&&e.getFullYear()===t.getFullYear()}(e,t)}isSameMonth(e,t){return function(e,t){return e.getMonth()===t.getMonth()&&e.getFullYear()===t.getFullYear()}(e,t)}isSameYear(e,t){return function(e,t){return e.getFullYear()===t.getFullYear()}(e,t)}setMinutes(e,t){return function(e,t){const a=new Date(e);return a.setMinutes(t),a}(e,t)}setHours(e,t){return function(e,t){const a=new Date(e);return a.setHours(t),a}(e,t)}setMonth(e,t){return function(e,t){const a=new Date(e);return a.setMonth(t),a}(e,t)}setDate(e,t){return function(e,t){const a=new Date(e);return a.setDate(t),a}(e,t)}setYear(e,t){return function(e,t){const a=new Date(e);return a.setFullYear(t),a}(e,t)}getDiff(e,t,a){return function(e,t,a){const n=new Date(e),l=new Date(t);switch(a){case"years":return n.getFullYear()-l.getFullYear();case"quarters":return Math.floor((n.getMonth()-l.getMonth()+12*(n.getFullYear()-l.getFullYear()))/4);case"months":return n.getMonth()-l.getMonth()+12*(n.getFullYear()-l.getFullYear());case"weeks":return Math.floor((n.getTime()-l.getTime())/6048e5);case"days":return Math.floor((n.getTime()-l.getTime())/864e5);case"hours":return Math.floor((n.getTime()-l.getTime())/36e5);case"minutes":return Math.floor((n.getTime()-l.getTime())/6e4);case"seconds":return Math.floor((n.getTime()-l.getTime())/1e3);default:return n.getTime()-l.getTime()}}(e,t,a)}getWeekdays(){return function(e){const t=nl[e.slice(-2).toUpperCase()];return Lt(7).map((a=>{const n=new Date(sl);return n.setDate(sl.getDate()+t+a),new Intl.DateTimeFormat(e,{weekday:"narrow"}).format(n)}))}(this.locale)}getYear(e){return function(e){return e.getFullYear()}(e)}getMonth(e){return function(e){return e.getMonth()}(e)}getDate(e){return function(e){return e.getDate()}(e)}getNextMonth(e){return function(e){return new Date(e.getFullYear(),e.getMonth()+1,1)}(e)}getPreviousMonth(e){return function(e){return new Date(e.getFullYear(),e.getMonth()-1,1)}(e)}getHours(e){return function(e){return e.getHours()}(e)}getMinutes(e){return function(e){return e.getMinutes()}(e)}startOfDay(e){return dl(e)}endOfDay(e){return function(e){return new Date(e.getFullYear(),e.getMonth(),e.getDate(),23,59,59,999)}(e)}startOfYear(e){return function(e){return new Date(e.getFullYear(),0,1)}(e)}endOfYear(e){return function(e){return new Date(e.getFullYear(),11,31)}(e)}}const pl=Symbol.for("vuetify:date-options"),fl=Symbol.for("vuetify:date-adapter");function ml(e,t){const n=reactive("function"==typeof e.adapter?new e.adapter({locale:e.locale[t.current.value]??t.current.value,formats:e.formats}):e.adapter);return watch(t.current,(t=>{n.locale=e.locale[t]??t??n.locale;})),n}function gl(){const e=inject(pl);if(!e)throw new Error("[Vuetify] Could not find injected date options");return ml(e,tl())}const hl=["sm","md","lg","xl","xxl"],yl=Symbol.for("vuetify:display"),bl={mobileBreakpoint:"lg",thresholds:{xs:0,sm:600,md:960,lg:1280,xl:1920,xxl:2560}},kl=function(){return la(bl,arguments.length>0&&void 0!==arguments[0]?arguments[0]:bl)};function xl(e){return "object"==typeof e&&e.clientWidth||0}function Sl(e){return "object"==typeof e&&e.clientHeight||0}function Cl(e){function t(e){return Boolean("ssr".match(e))}return {android:t(/android/i),ios:t(/iphone|ipad|ipod/i),cordova:t(/cordova/i),electron:t(/electron/i),chrome:t(/chrome/i),edge:t(/edge/i),firefox:t(/firefox/i),opera:t(/opera/i),win:t(/win/i),mac:t(/mac/i),linux:t(/linux/i),touch:Ft,ssr:!0}}function wl(e,t){const{thresholds:n,mobileBreakpoint:l}=kl(e),o=shallowRef(Sl(t)),r=shallowRef(Cl()),i=reactive({}),s=shallowRef(xl(t));return watchEffect((()=>{const e=s.value<n.sm,t=s.value<n.md&&!e,a=s.value<n.lg&&!(t||e),u=s.value<n.xl&&!(a||t||e),c=s.value<n.xxl&&!(u||a||t||e),d=s.value>=n.xxl,v=e?"xs":t?"sm":a?"md":u?"lg":c?"xl":"xxl",p="number"==typeof l?l:n[l],f=s.value<p;i.xs=e,i.sm=t,i.md=a,i.lg=u,i.xl=c,i.xxl=d,i.smAndUp=!e,i.mdAndUp=!(e||t),i.lgAndUp=!(e||t||a),i.xlAndUp=!(e||t||a||u),i.smAndDown=!(a||u||c||d),i.mdAndDown=!(u||c||d),i.lgAndDown=!(c||d),i.xlAndDown=!d,i.name=v,i.height=o.value,i.width=s.value,i.mobile=f,i.mobileBreakpoint=l,i.platform=r.value,i.thresholds=n;})),{...toRefs(i),update:function(){o.value=Sl(),s.value=xl(),r.value=Cl();},ssr:!!t}}const _l=wn({mobile:{type:Boolean,default:!1},mobileBreakpoint:[Number,String]},"display");function Al(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:In();const a=inject(yl);if(!a)throw new Error("Could not find Vuetify display injection");const n=computed((()=>{if(null!=e.mobile)return e.mobile;if(!e.mobileBreakpoint)return a.mobile.value;const t="number"==typeof e.mobileBreakpoint?e.mobileBreakpoint:a.thresholds.value[e.mobileBreakpoint];return a.width.value<t})),l=computed((()=>t?{[`${t}--mobile`]:n.value}:{}));return {...a,displayClasses:l,mobile:n}}const Il=Symbol.for("vuetify:goto");const Dl={collapse:"mdi-chevron-up",complete:"mdi-check",cancel:"mdi-close-circle",close:"mdi-close",delete:"mdi-close-circle",clear:"mdi-close-circle",success:"mdi-check-circle",info:"mdi-information",warning:"mdi-alert-circle",error:"mdi-close-circle",prev:"mdi-chevron-left",next:"mdi-chevron-right",checkboxOn:"mdi-checkbox-marked",checkboxOff:"mdi-checkbox-blank-outline",checkboxIndeterminate:"mdi-minus-box",delimiter:"mdi-circle",sortAsc:"mdi-arrow-up",sortDesc:"mdi-arrow-down",expand:"mdi-chevron-down",menu:"mdi-menu",subgroup:"mdi-menu-down",dropdown:"mdi-menu-down",radioOn:"mdi-radiobox-marked",radioOff:"mdi-radiobox-blank",edit:"mdi-pencil",ratingEmpty:"mdi-star-outline",ratingFull:"mdi-star",ratingHalf:"mdi-star-half-full",loading:"mdi-cached",first:"mdi-page-first",last:"mdi-page-last",unfold:"mdi-unfold-more-horizontal",file:"mdi-paperclip",plus:"mdi-plus",minus:"mdi-minus",calendar:"mdi-calendar",treeviewCollapse:"mdi-menu-down",treeviewExpand:"mdi-menu-right",eyeDropper:"mdi-eyedropper"},Ol={component:e=>h(Ll,{...e,class:"mdi"})},Fl=[String,Function,Object,Array],El=Symbol.for("vuetify:icons"),Tl=wn({icon:{type:Fl},tag:{type:String,required:!0}},"icon"),$l=$n()({name:"VComponentIcon",props:Tl(),setup(e,t){let{slots:a}=t;return ()=>{const t=e.icon;return createVNode(e.tag,null,{default:()=>{var n;return [e.icon?createVNode(t,null,null):null==(n=a.default)?void 0:n.call(a)]}})}}}),Ml=Tn({name:"VSvgIcon",inheritAttrs:!1,props:Tl(),setup(e,t){let{attrs:a}=t;return ()=>createVNode(e.tag,mergeProps(a,{style:null}),{default:()=>[createVNode("svg",{class:"v-icon__svg",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",role:"img","aria-hidden":"true"},[Array.isArray(e.icon)?e.icon.map((e=>Array.isArray(e)?createVNode("path",{d:e[0],"fill-opacity":e[1]},null):createVNode("path",{d:e},null))):createVNode("path",{d:e.icon},null)])]})}});Tn({name:"VLigatureIcon",props:Tl(),setup:e=>()=>createVNode(e.tag,null,{default:()=>[e.icon]})});const Ll=Tn({name:"VClassIcon",props:Tl(),setup:e=>()=>createVNode(e.tag,{class:e.icon},null)});function Rl(e){const t={svg:{component:Ml},class:{component:Ll}},a=(null==e?void 0:e.defaultSet)??"mdi";return "mdi"!==a||t.mdi||(t.mdi=Ol),la({defaultSet:a,sets:t,aliases:{...Dl,vuetify:["M8.2241 14.2009L12 21L22 3H14.4459L8.2241 14.2009Z",["M7.26303 12.4733L7.00113 12L2 3H12.5261C12.5261 3 12.5261 3 12.5261 3L7.26303 12.4733Z",.6]],"vuetify-outline":"svg:M7.26 12.47 12.53 3H2L7.26 12.47ZM14.45 3 8.22 14.2 12 21 22 3H14.45ZM18.6 5 12 16.88 10.51 14.2 15.62 5ZM7.26 8.35 5.4 5H9.13L7.26 8.35Z","vuetify-play":["m6.376 13.184-4.11-7.192C1.505 4.66 2.467 3 4.003 3h8.532l-.953 1.576-.006.01-.396.677c-.429.732-.214 1.507.194 2.015.404.503 1.092.878 1.869.806a3.72 3.72 0 0 1 1.005.022c.276.053.434.143.523.237.138.146.38.635-.25 2.09-.893 1.63-1.553 1.722-1.847 1.677-.213-.033-.468-.158-.756-.406a4.95 4.95 0 0 1-.8-.927c-.39-.564-1.04-.84-1.66-.846-.625-.006-1.316.27-1.693.921l-.478.826-.911 1.506Z",["M9.093 11.552c.046-.079.144-.15.32-.148a.53.53 0 0 1 .43.207c.285.414.636.847 1.046 1.2.405.35.914.662 1.516.754 1.334.205 2.502-.698 3.48-2.495l.014-.028.013-.03c.687-1.574.774-2.852-.005-3.675-.37-.391-.861-.586-1.333-.676a5.243 5.243 0 0 0-1.447-.044c-.173.016-.393-.073-.54-.257-.145-.18-.127-.316-.082-.392l.393-.672L14.287 3h5.71c1.536 0 2.499 1.659 1.737 2.992l-7.997 13.996c-.768 1.344-2.706 1.344-3.473 0l-3.037-5.314 1.377-2.278.004-.006.004-.007.481-.831Z",.6]]}},e)}const Nl=Symbol.for("vuetify:theme"),jl=wn({theme:String},"theme");function Hl(e){const t=function(){var e,t;let a=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{defaultTheme:"light",variations:{colors:[],lighten:0,darken:0},themes:{light:{dark:!1,colors:{background:"#FFFFFF",surface:"#FFFFFF","surface-bright":"#FFFFFF","surface-light":"#EEEEEE","surface-variant":"#424242","on-surface-variant":"#EEEEEE",primary:"#1867C0","primary-darken-1":"#1F5592",secondary:"#48A9A6","secondary-darken-1":"#018786",error:"#B00020",info:"#2196F3",success:"#4CAF50",warning:"#FB8C00"},variables:{"border-color":"#000000","border-opacity":.12,"high-emphasis-opacity":.87,"medium-emphasis-opacity":.6,"disabled-opacity":.38,"idle-opacity":.04,"hover-opacity":.04,"focus-opacity":.12,"selected-opacity":.08,"activated-opacity":.12,"pressed-opacity":.12,"dragged-opacity":.08,"theme-kbd":"#212529","theme-on-kbd":"#FFFFFF","theme-code":"#F5F5F5","theme-on-code":"#000000"}},dark:{dark:!0,colors:{background:"#121212",surface:"#212121","surface-bright":"#ccbfd6","surface-light":"#424242","surface-variant":"#a3a3a3","on-surface-variant":"#424242",primary:"#2196F3","primary-darken-1":"#277CC1",secondary:"#54B6B2","secondary-darken-1":"#48A9A6",error:"#CF6679",info:"#2196F3",success:"#4CAF50",warning:"#FB8C00"},variables:{"border-color":"#FFFFFF","border-opacity":.12,"high-emphasis-opacity":1,"medium-emphasis-opacity":.7,"disabled-opacity":.5,"idle-opacity":.1,"hover-opacity":.04,"focus-opacity":.12,"selected-opacity":.08,"activated-opacity":.12,"pressed-opacity":.16,"dragged-opacity":.08,"theme-kbd":"#212529","theme-on-kbd":"#FFFFFF","theme-code":"#343434","theme-on-code":"#CCCCCC"}}}};const n={defaultTheme:"light",variations:{colors:[],lighten:0,darken:0},themes:{light:{dark:!1,colors:{background:"#FFFFFF",surface:"#FFFFFF","surface-bright":"#FFFFFF","surface-light":"#EEEEEE","surface-variant":"#424242","on-surface-variant":"#EEEEEE",primary:"#1867C0","primary-darken-1":"#1F5592",secondary:"#48A9A6","secondary-darken-1":"#018786",error:"#B00020",info:"#2196F3",success:"#4CAF50",warning:"#FB8C00"},variables:{"border-color":"#000000","border-opacity":.12,"high-emphasis-opacity":.87,"medium-emphasis-opacity":.6,"disabled-opacity":.38,"idle-opacity":.04,"hover-opacity":.04,"focus-opacity":.12,"selected-opacity":.08,"activated-opacity":.12,"pressed-opacity":.12,"dragged-opacity":.08,"theme-kbd":"#212529","theme-on-kbd":"#FFFFFF","theme-code":"#F5F5F5","theme-on-code":"#000000"}},dark:{dark:!0,colors:{background:"#121212",surface:"#212121","surface-bright":"#ccbfd6","surface-light":"#424242","surface-variant":"#a3a3a3","on-surface-variant":"#424242",primary:"#2196F3","primary-darken-1":"#277CC1",secondary:"#54B6B2","secondary-darken-1":"#48A9A6",error:"#CF6679",info:"#2196F3",success:"#4CAF50",warning:"#FB8C00"},variables:{"border-color":"#FFFFFF","border-opacity":.12,"high-emphasis-opacity":1,"medium-emphasis-opacity":.7,"disabled-opacity":.5,"idle-opacity":.1,"hover-opacity":.04,"focus-opacity":.12,"selected-opacity":.08,"activated-opacity":.12,"pressed-opacity":.16,"dragged-opacity":.08,"theme-kbd":"#212529","theme-on-kbd":"#FFFFFF","theme-code":"#343434","theme-on-code":"#CCCCCC"}}}};if(!a)return {...n,isDisabled:!0};const l={};for(const[o,r]of Object.entries(a.themes??{})){const a=r.dark||"dark"===o?null==(e=n.themes)?void 0:e.dark:null==(t=n.themes)?void 0:t.light;l[o]=la(a,r);}return la(n,{...a,themes:l})}(e),a=ref(t.defaultTheme),n=ref(t.themes),l=computed((()=>{const e={};for(const[a,l]of Object.entries(n.value)){const n=e[a]={...l,colors:{...l.colors}};if(t.variations)for(const e of t.variations.colors){const a=n.colors[e];if(a)for(const l of ["lighten","darken"]){const o="lighten"===l?xn:Sn;for(const r of Lt(t.variations[l],1))n.colors[`${e}-${l}-${r}`]=kn(o(mn(a),r));}}for(const e of Object.keys(n.colors)){if(/^on-[a-z]/.test(e)||n.colors[`on-${e}`])continue;const t=`on-${e}`,a=mn(n.colors[e]);n.colors[t]=Cn(a);}}return e})),o=computed((()=>l.value[a.value])),r=computed((()=>{var e;const t=[];(null==(e=o.value)?void 0:e.dark)&&zl(t,":root",["color-scheme: dark"]),zl(t,":root",Ul(o.value));for(const[o,i]of Object.entries(l.value))zl(t,`.v-theme--${o}`,["color-scheme: "+(i.dark?"dark":"normal"),...Ul(i)]);const a=[],n=[],r=new Set(Object.values(l.value).flatMap((e=>Object.keys(e.colors))));for(const l of r)/^on-[a-z]/.test(l)?zl(n,`.${l}`,[`color: rgb(var(--v-theme-${l})) !important`]):(zl(a,`.bg-${l}`,[`--v-theme-overlay-multiplier: var(--v-theme-${l}-overlay-multiplier)`,`background-color: rgb(var(--v-theme-${l})) !important`,`color: rgb(var(--v-theme-on-${l})) !important`]),zl(n,`.text-${l}`,[`color: rgb(var(--v-theme-${l})) !important`]),zl(n,`.border-${l}`,[`--v-border-color: var(--v-theme-${l})`]));return t.push(...a,...n),t.map(((e,t)=>0===t?e:`    ${e}`)).join("")}));function i(){return {style:[{children:r.value,id:"vuetify-theme-stylesheet",nonce:t.cspNonce||!1}]}}const s=computed((()=>t.isDisabled?void 0:`v-theme--${a.value}`));return {install:function(e){if(t.isDisabled)return;const a=e._context.provides.usehead;a&&(a.push?a.push(i):a.addHeadObjs(i()));},isDisabled:t.isDisabled,name:a,themes:n,current:o,computedThemes:l,themeClasses:s,styles:r,global:{name:a,current:o}}}function Wl(e){An("provideTheme");const t=inject(Nl,null);if(!t)throw new Error("Could not find Vuetify theme injection");const a=computed((()=>e.theme??t.name.value)),n=computed((()=>t.themes.value[a.value])),l=computed((()=>t.isDisabled?void 0:`v-theme--${a.value}`)),o={...t,name:a,current:n,themeClasses:l};return provide(Nl,o),o}function zl(e,t,a){e.push(`${t} {\n`,...a.map((e=>`  ${e};\n`)),"}\n");}function Ul(e){const t=e.dark?2:1,a=e.dark?1:2,n=[];for(const[o,r]of Object.entries(e.colors)){const e=mn(r);n.push(`--v-theme-${o}: ${e.r},${e.g},${e.b}`),o.startsWith("on-")||n.push(`--v-theme-${o}-overlay-multiplier: ${l=r,dn(mn(l))[1]>.18?t:a}`);}var l;for(const[o,r]of Object.entries(e.variables)){const e="string"==typeof r&&r.startsWith("#")?mn(r):void 0,t=e?`${e.r}, ${e.g}, ${e.b}`:void 0;n.push(`--v-${o}: ${t??r}`);}return n}function Yl(e){const t=ka(),a=ref();return {resizeRef:t,contentRect:readonly(a)}}const Kl=Symbol.for("vuetify:layout"),Gl=Symbol.for("vuetify:layout-item"),ql=wn({overlaps:{type:Array,default:()=>[]},fullHeight:Boolean},"layout"),Zl=wn({name:{type:String},order:{type:[Number,String],default:0},absolute:Boolean},"layout-item");function Ql(){const e=inject(Kl);if(!e)throw new Error("[Vuetify] Could not find injected layout");return {layoutIsReady:nextTick(),getLayoutItem:e.getLayoutItem,mainRect:e.mainRect,mainStyles:e.mainStyles}}function Xl(e){const t=inject(Kl);if(!t)throw new Error("[Vuetify] Could not find injected layout");const a=e.id??`layout-item-${Bn()}`,n=An("useLayoutItem");provide(Gl,{id:a});const l=shallowRef(!1),o=nextTick(),{layoutItemStyles:i,layoutItemScrimStyles:s}=t.register(n,{...e,active:computed((()=>!l.value&&e.active.value)),id:a});return {layoutItemStyles:i,layoutRect:t.layoutRect,layoutItemScrimStyles:s,layoutIsReady:o}}function Jl(e){const t=inject(Kl,null),n=computed((()=>t?t.rootZIndex.value-100:1e3)),l=ref([]),o=reactive(new Map),i=reactive(new Map),s=reactive(new Map),u=reactive(new Map),c=reactive(new Map),{resizeRef:v,contentRect:p}=Yl(),f=ba((()=>{const e=[...new Set([...s.values()].map((e=>e.value)))].sort(((e,t)=>e-t)),t=[];for(const a of e){const e=l.value.filter((e=>{var t;return (null==(t=s.get(e))?void 0:t.value)===a}));t.push(...e);}return ((e,t,a,n)=>{let l={top:0,left:0,right:0,bottom:0};const o=[{id:"",layer:{...l}}];for(const r of e){const e=t.get(r),i=a.get(r),s=n.get(r);if(!e||!i||!s)continue;const u={...l,[e.value]:parseInt(l[e.value],10)+(s.value?parseInt(i.value,10):0)};o.push({id:r,layer:u}),l=u;}return o})(t,o,i,u)})),m=computed((()=>!Array.from(c.values()).some((e=>e.value)))),g=computed((()=>f.value[f.value.length-1].layer)),h=computed((()=>({"--v-layout-left":Rt(g.value.left),"--v-layout-right":Rt(g.value.right),"--v-layout-top":Rt(g.value.top),"--v-layout-bottom":Rt(g.value.bottom),...m.value?void 0:{transition:"none"}}))),y=ba((()=>f.value.slice(1).map(((e,t)=>{let{id:a}=e;const{layer:n}=f.value[t],l=i.get(a),r=o.get(a);return {id:a,...n,size:Number(l.value),position:r.value}})))),b=e=>y.value.find((t=>t.id===e)),x=An("createLayout"),S=nextTick();provide(Kl,{register:(e,t)=>{let{id:a,order:r,position:d,layoutSize:v,elementSize:p,active:g,disableTransitions:h,absolute:b}=t;s.set(a,r),o.set(a,d),i.set(a,v),u.set(a,g),h&&c.set(a,h);const S=ia(Gl,null==x?void 0:x.vnode).indexOf(e);S>-1?l.value.splice(S,0,a):l.value.push(a);const C=computed((()=>y.value.findIndex((e=>e.id===a)))),w=computed((()=>n.value+2*f.value.length-2*C.value));return {layoutItemStyles:computed((()=>{const e="left"===d.value||"right"===d.value,t="right"===d.value,l="bottom"===d.value,o=p.value??v.value,r=0===o?"%":"px",i={[d.value]:0,zIndex:w.value,transform:`translate${e?"X":"Y"}(${(g.value?0:-(0===o?100:o))*(t||l?-1:1)}${r})`,position:b.value||1e3!==n.value?"absolute":"fixed",...m.value?void 0:{transition:"none"}};if(C.value<0)throw new Error(`Layout item "${a}" is missing`);const s=y.value[C.value];if(!s)throw new Error(`[Vuetify] Could not find layout item "${a}"`);return {...i,height:e?`calc(100% - ${s.top}px - ${s.bottom}px)`:p.value?`${p.value}px`:void 0,left:t?void 0:`${s.left}px`,right:t?`${s.right}px`:void 0,top:"bottom"!==d.value?`${s.top}px`:void 0,bottom:"top"!==d.value?`${s.bottom}px`:void 0,width:e?p.value?`${p.value}px`:void 0:`calc(100% - ${s.left}px - ${s.right}px)`}})),layoutItemScrimStyles:computed((()=>({zIndex:w.value-1}))),zIndex:w}},unregister:e=>{s.delete(e),o.delete(e),i.delete(e),u.delete(e),c.delete(e),l.value=l.value.filter((t=>t!==e));},mainRect:g,mainStyles:h,getLayoutItem:b,items:y,layoutRect:p,rootZIndex:n,layoutIsReady:S});return {layoutClasses:computed((()=>["v-layout",{"v-layout--full-height":e.fullHeight}])),layoutStyles:computed((()=>({zIndex:t?n.value:void 0,position:t?"relative":void 0,overflow:t?"hidden":void 0}))),getLayoutItem:b,items:y,layoutRect:p,layoutIsReady:S,layoutRef:v}}function eo(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};const{blueprint:t,...n}=e,l=la(t,n),{aliases:o={},components:r={},directives:i={}}=l,s=function(e){return ref(e)}(l.defaults),u=wl(l.display,l.ssr),c=Hl(l.theme),v=Rl(l.icons),p=el(l.locale),f=function(e,t){const a=la({adapter:vl,locale:{af:"af-ZA",bg:"bg-BG",ca:"ca-ES",ckb:"",cs:"cs-CZ",de:"de-DE",el:"el-GR",en:"en-US",et:"et-EE",fa:"fa-IR",fi:"fi-FI",hr:"hr-HR",hu:"hu-HU",he:"he-IL",id:"id-ID",it:"it-IT",ja:"ja-JP",ko:"ko-KR",lv:"lv-LV",lt:"lt-LT",nl:"nl-NL",no:"no-NO",pl:"pl-PL",pt:"pt-PT",ro:"ro-RO",ru:"ru-RU",sk:"sk-SK",sl:"sl-SI",srCyrl:"sr-SP",srLatn:"sr-SP",sv:"sv-SE",th:"th-TH",tr:"tr-TR",az:"az-AZ",uk:"uk-UA",vi:"vi-VN",zhHans:"zh-CN",zhHant:"zh-TW"}},e);return {options:a,instance:ml(a,t)}}(l.date,p),m=function(e,t){return {rtl:t.isRtl,options:la({container:void 0,duration:300,layout:!1,offset:0,easing:"easeInOutCubic",patterns:{linear:e=>e,easeInQuad:e=>e**2,easeOutQuad:e=>e*(2-e),easeInOutQuad:e=>e<.5?2*e**2:(4-2*e)*e-1,easeInCubic:e=>e**3,easeOutCubic:e=>--e**3+1,easeInOutCubic:e=>e<.5?4*e**3:(e-1)*(2*e-2)*(2*e-2)+1,easeInQuart:e=>e**4,easeOutQuart:e=>1- --e**4,easeInOutQuart:e=>e<.5?8*e**4:1-8*--e**4,easeInQuint:e=>e**5,easeOutQuint:e=>1+--e**5,easeInOutQuint:e=>e<.5?16*e**5:1+16*--e**5}},e)}}(l.goTo,p);return {install:e=>{for(const t in i)e.directive(t,i[t]);for(const t in r)e.component(t,r[t]);for(const t in o)e.component(t,Tn({...o[t],name:t,aliasName:o[t].name}));c.install(e),e.provide(Dn,s),e.provide(yl,u),e.provide(Nl,c),e.provide(El,v),e.provide(Jn,p),e.provide(pl,f.options),e.provide(fl,f.instance),e.provide(Il,m),Bn.reset(),e.mixin({computed:{$vuetify(){return reactive({defaults:to.call(this,Dn),display:to.call(this,yl),theme:to.call(this,Nl),icons:to.call(this,El),locale:to.call(this,Jn),date:to.call(this,fl)})}}});},defaults:s,display:u,theme:c,icons:v,locale:p,date:f,goTo:m}}function to(e){var t,a;const n=this.$,l=(null==(t=n.parent)?void 0:t.provides)??(null==(a=n.vnode.appContext)?void 0:a.provides);if(l&&e in l)return l[e]}eo.version="3.6.11";const ao=wn({border:[Boolean,Number,String]},"border");function no(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:In();return {borderClasses:computed((()=>{const a=isRef(e)?e.value:e.border,n=[];if(!0===a||""===a)n.push(`${t}--border`);else if("string"==typeof a||0===a)for(const e of String(a).split(" "))n.push(`border-${e}`);return n}))}}const lo=[null,"default","comfortable","compact"],oo=wn({density:{type:String,default:"default",validator:e=>lo.includes(e)}},"density");function ro(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:In();return {densityClasses:computed((()=>`${t}--density-${e.density}`))}}const io=wn({elevation:{type:[Number,String],validator(e){const t=parseInt(e);return !isNaN(t)&&t>=0&&t<=24}}},"elevation");function so(e){return {elevationClasses:computed((()=>{const t=isRef(e)?e.value:e.elevation,a=[];return null==t||a.push(`elevation-${t}`),a}))}}const uo=wn({rounded:{type:[Boolean,Number,String],default:void 0},tile:Boolean},"rounded");function co(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:In();return {roundedClasses:computed((()=>{const a=isRef(e)?e.value:e.rounded,n=isRef(e)?e.value:e.tile,l=[];if(!0===a||""===a)l.push(`${t}--rounded`);else if("string"==typeof a||0===a)for(const e of String(a).split(" "))l.push(`rounded-${e}`);else (n||!1===a)&&l.push("rounded-0");return l}))}}const vo=wn({tag:{type:String,default:"div"}},"tag");function po(e){return sa((()=>{const t=[],a={};if(e.value.background)if(vn(e.value.background)){if(a.backgroundColor=e.value.background,!e.value.text&&(vn(n=e.value.background)&&!/^((rgb|hsl)a?\()?var\(--/.test(n))){const t=mn(e.value.background);if(null==t.a||1===t.a){const e=Cn(t);a.color=e,a.caretColor=e;}}}else t.push(`bg-${e.value.background}`);var n;return e.value.text&&(vn(e.value.text)?(a.color=e.value.text,a.caretColor=e.value.text):t.push(`text-${e.value.text}`)),{colorClasses:t,colorStyles:a}}))}function fo(e,t){const a=computed((()=>({text:isRef(e)?e.value:t?e[t]:null}))),{colorClasses:n,colorStyles:l}=po(a);return {textColorClasses:n,textColorStyles:l}}function mo(e,t){const a=computed((()=>({background:isRef(e)?e.value:t?e[t]:null}))),{colorClasses:n,colorStyles:l}=po(a);return {backgroundColorClasses:n,backgroundColorStyles:l}}const go=["elevated","flat","tonal","outlined","text","plain"];function ho(e,t){return createVNode(Fragment,null,[e&&createVNode("span",{key:"overlay",class:`${t}__overlay`},null),createVNode("span",{key:"underlay",class:`${t}__underlay`},null)])}const yo=wn({color:String,variant:{type:String,default:"elevated",validator:e=>go.includes(e)}},"variant");function bo(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:In();const a=computed((()=>{const{variant:a}=unref(e);return `${t}--variant-${a}`})),{colorClasses:n,colorStyles:l}=po(computed((()=>{const{variant:t,color:a}=unref(e);return {[["elevated","flat"].includes(t)?"background":"text"]:a}})));return {colorClasses:n,colorStyles:l,variantClasses:a}}const ko=wn({baseColor:String,divided:Boolean,...ao(),..._n(),...oo(),...io(),...uo(),...vo(),...jl(),...yo()},"VBtnGroup"),xo=$n()({name:"VBtnGroup",props:ko(),setup(e,t){let{slots:a}=t;const{themeClasses:n}=Wl(e),{densityClasses:l}=ro(e),{borderClasses:o}=no(e),{elevationClasses:r}=so(e),{roundedClasses:s}=co(e);Fn({VBtn:{height:"auto",baseColor:toRef(e,"baseColor"),color:toRef(e,"color"),density:toRef(e,"density"),flat:!0,variant:toRef(e,"variant")}}),zn((()=>createVNode(e.tag,{class:["v-btn-group",{"v-btn-group--divided":e.divided},n.value,o.value,l.value,r.value,s.value,e.class],style:e.style},a)));}}),So=wn({modelValue:{type:null,default:void 0},multiple:Boolean,mandatory:[Boolean,String],max:Number,selectedClass:String,disabled:Boolean},"group"),Co=wn({value:null,disabled:Boolean,selectedClass:String},"group-item");function wo(e,t){let a=!(arguments.length>2&&void 0!==arguments[2])||arguments[2];const n=An("useGroupItem");if(!n)throw new Error("[Vuetify] useGroupItem composable must be used inside a component setup function");const l=Bn();provide(Symbol.for(`${t.description}:id`),l);const o=inject(t,null);if(!o){if(!a)return o;throw new Error(`[Vuetify] Could not find useGroup injection with symbol ${t.description}`)}const s=toRef(e,"value"),u=computed((()=>!(!o.disabled.value&&!e.disabled)));o.register({id:l,value:s,disabled:u},n);const c=computed((()=>o.isSelected(l))),d=computed((()=>o.items.value[0].id===l)),v=computed((()=>o.items.value[o.items.value.length-1].id===l)),p=computed((()=>c.value&&[o.selectedClass.value,e.selectedClass]));return watch(c,(e=>{n.emit("group:selected",{value:e});}),{flush:"sync"}),{id:l,isSelected:c,isFirst:d,isLast:v,toggle:()=>o.select(l,!c.value),select:e=>o.select(l,e),selectedClass:p,value:s,disabled:u,group:o}}function _o(e,t){const n=reactive([]),l=Un(e,"modelValue",[],(e=>null==e?[]:Ao(n,Jt(e))),(t=>{const a=function(e,t){const a=[];return t.forEach((t=>{const n=e.findIndex((e=>e.id===t));if(~n){const t=e[n];a.push(null!=t.value?t.value:n);}})),a}(n,t);return e.multiple?a:a[0]})),o=An("useGroup");function r(t){if(e.multiple&&Xa('This method is not supported when using "multiple" prop'),l.value.length){const e=l.value[0],a=n.findIndex((t=>t.id===e));let o=(a+t)%n.length,r=n[o];for(;r.disabled&&o!==a;)o=(o+t)%n.length,r=n[o];if(r.disabled)return;l.value=[n[o].id];}else {const e=n.find((e=>!e.disabled));e&&(l.value=[e.id]);}}const s={register:function(e,a){const l=e,r=ia(Symbol.for(`${t.description}:id`),null==o?void 0:o.vnode).indexOf(a);null==unref(l.value)&&(l.value=r,l.useIndexAsValue=!0),r>-1?n.splice(r,0,l):n.push(l);},unregister:function(t){!function(){const t=n.find((e=>!e.disabled));t&&"force"===e.mandatory&&!l.value.length&&(l.value=[t.id]);}();const a=n.findIndex((e=>e.id===t));n.splice(a,1);},selected:l,select:function(t,a){const o=n.find((e=>e.id===t));if(!a||!(null==o?void 0:o.disabled))if(e.multiple){const n=l.value.slice(),o=n.findIndex((e=>e===t)),r=~o;if(a=a??!r,r&&e.mandatory&&n.length<=1)return;if(!r&&null!=e.max&&n.length+1>e.max)return;o<0&&a?n.push(t):o>=0&&!a&&n.splice(o,1),l.value=n;}else {const n=l.value.includes(t);if(e.mandatory&&n)return;l.value=a??!n?[t]:[];}},disabled:toRef(e,"disabled"),prev:()=>r(n.length-1),next:()=>r(1),isSelected:e=>l.value.includes(e),selectedClass:computed((()=>e.selectedClass)),items:computed((()=>n)),getItemIndex:e=>function(e,t){const a=Ao(e,[t]);return a.length?e.findIndex((e=>e.id===a[0])):-1}(n,e)};return provide(t,s),s}function Ao(e,t){const a=[];return t.forEach((t=>{const n=e.find((e=>Tt(t,e.value))),l=e[t];null!=(null==n?void 0:n.value)?a.push(n.id):null!=l&&a.push(l.id);})),a}const Io=Symbol.for("vuetify:v-btn-toggle"),Po=wn({...ko(),...So()},"VBtnToggle");$n()({name:"VBtnToggle",props:Po(),emits:{"update:modelValue":e=>!0},setup(e,t){let{slots:a}=t;const{isSelected:n,next:l,prev:o,select:r,selected:i}=_o(e,Io);return zn((()=>{const t=xo.filterProps(e);return createVNode(xo,mergeProps({class:["v-btn-toggle",e.class]},t,{style:e.style}),{default:()=>{var e;return [null==(e=a.default)?void 0:e.call(a,{isSelected:n,next:l,prev:o,select:r,selected:i})]}})})),{next:l,prev:o,select:r}}});const Vo=wn({defaults:Object,disabled:Boolean,reset:[Number,String],root:[Boolean,String],scoped:Boolean},"VDefaultsProvider"),Bo=$n(!1)({name:"VDefaultsProvider",props:Vo(),setup(e,t){let{slots:a}=t;const{defaults:n,disabled:l,reset:o,root:r,scoped:i}=toRefs(e);return Fn(n,{reset:o,root:r,scoped:i,disabled:l}),()=>{var e;return null==(e=a.default)?void 0:e.call(a)}}}),Do=["x-small","small","default","large","x-large"],Oo=wn({size:{type:[String,Number],default:"default"}},"size");function Fo(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:In();return sa((()=>{let a,n;return ua(Do,e.size)?a=`${t}--size-${e.size}`:e.size&&(n={width:Rt(e.size),height:Rt(e.size)}),{sizeClasses:a,sizeStyles:n}}))}const Eo=wn({color:String,disabled:Boolean,start:Boolean,end:Boolean,icon:Fl,..._n(),...Oo(),...vo({tag:"i"}),...jl()},"VIcon"),To=$n()({name:"VIcon",props:Eo(),setup(e,t){let{attrs:a,slots:n}=t;const l=ref(),{themeClasses:o}=Wl(e),{iconData:s}=(e=>{const t=inject(El);if(!t)throw new Error("Missing Vuetify Icons provide!");return {iconData:computed((()=>{var a;const n=unref(e);if(!n)return {component:$l};let l=n;if("string"==typeof l&&(l=l.trim(),l.startsWith("$")&&(l=null==(a=t.aliases)?void 0:a[l.slice(1)])),l||Xa(`Could not find aliased icon "${n}"`),Array.isArray(l))return {component:Ml,icon:l};if("string"!=typeof l)return {component:$l,icon:l};const o=Object.keys(t.sets).find((e=>"string"==typeof l&&l.startsWith(`${e}:`))),r=o?l.slice(o.length+1):l;return {component:t.sets[o??t.defaultSet].component,icon:r}}))}})(computed((()=>l.value||e.icon))),{sizeClasses:c}=Fo(e),{textColorClasses:v,textColorStyles:p}=fo(toRef(e,"color"));return zn((()=>{var t,r;const i=null==(t=n.default)?void 0:t.call(n);i&&(l.value=null==(r=oa(i).filter((e=>e.type===Text&&e.children&&"string"==typeof e.children))[0])?void 0:r.children);const u=!(!a.onClick&&!a.onClickOnce);return createVNode(s.value.component,{tag:e.tag,icon:s.value.icon,class:["v-icon","notranslate",o.value,c.value,v.value,{"v-icon--clickable":u,"v-icon--disabled":e.disabled,"v-icon--start":e.start,"v-icon--end":e.end},e.class],style:[c.value?void 0:{fontSize:Rt(e.size),height:Rt(e.size),width:Rt(e.size)},p.value,e.style],role:u?"button":void 0,"aria-hidden":!u,tabindex:u?e.disabled?-1:0:void 0},{default:()=>[i]})})),{}}});function $o(e,t){return {intersectionRef:ref(),isIntersecting:shallowRef(!1)}}const Mo=wn({bgColor:String,color:String,indeterminate:[Boolean,String],modelValue:{type:[Number,String],default:0},rotate:{type:[Number,String],default:0},width:{type:[Number,String],default:4},..._n(),...Oo(),...vo({tag:"div"}),...jl()},"VProgressCircular"),Lo=$n()({name:"VProgressCircular",props:Mo(),setup(e,t){let{slots:a}=t;const n=2*Math.PI*20,l=ref(),{themeClasses:o}=Wl(e),{sizeClasses:r,sizeStyles:s}=Fo(e),{textColorClasses:u,textColorStyles:c}=fo(toRef(e,"color")),{textColorClasses:v,textColorStyles:p}=fo(toRef(e,"bgColor")),{intersectionRef:f,isIntersecting:m}=$o(),{resizeRef:g,contentRect:h}=Yl(),y=computed((()=>Math.max(0,Math.min(100,parseFloat(e.modelValue))))),b=computed((()=>Number(e.width))),S=computed((()=>s.value?Number(e.size):h.value?h.value.width:Math.max(b.value,32))),C=computed((()=>20/(1-b.value/S.value)*2)),w=computed((()=>b.value/S.value*C.value)),_=computed((()=>Rt((100-y.value)/100*n)));return watchEffect((()=>{f.value=l.value,g.value=l.value;})),zn((()=>createVNode(e.tag,{ref:l,class:["v-progress-circular",{"v-progress-circular--indeterminate":!!e.indeterminate,"v-progress-circular--visible":m.value,"v-progress-circular--disable-shrink":"disable-shrink"===e.indeterminate},o.value,r.value,u.value,e.class],style:[s.value,c.value,e.style],role:"progressbar","aria-valuemin":"0","aria-valuemax":"100","aria-valuenow":e.indeterminate?void 0:y.value},{default:()=>[createVNode("svg",{style:{transform:`rotate(calc(-90deg + ${Number(e.rotate)}deg))`},xmlns:"http://www.w3.org/2000/svg",viewBox:`0 0 ${C.value} ${C.value}`},[createVNode("circle",{class:["v-progress-circular__underlay",v.value],style:p.value,fill:"transparent",cx:"50%",cy:"50%",r:20,"stroke-width":w.value,"stroke-dasharray":n,"stroke-dashoffset":0},null),createVNode("circle",{class:"v-progress-circular__overlay",fill:"transparent",cx:"50%",cy:"50%",r:20,"stroke-width":w.value,"stroke-dasharray":n,"stroke-dashoffset":_.value},null)]),a.default&&createVNode("div",{class:"v-progress-circular__content"},[a.default({value:y.value})])]}))),{}}}),Ro=wn({height:[Number,String],maxHeight:[Number,String],maxWidth:[Number,String],minHeight:[Number,String],minWidth:[Number,String],width:[Number,String]},"dimension");function No(e){return {dimensionStyles:computed((()=>{const t={},a=Rt(e.height),n=Rt(e.maxHeight),l=Rt(e.maxWidth),o=Rt(e.minHeight),r=Rt(e.minWidth),i=Rt(e.width);return null!=a&&(t.height=a),null!=n&&(t.maxHeight=n),null!=l&&(t.maxWidth=l),null!=o&&(t.minHeight=o),null!=r&&(t.minWidth=r),null!=i&&(t.width=i),t}))}}const jo={center:"center",top:"bottom",bottom:"top",left:"right",right:"left"},Ho=wn({location:String},"location");function Wo(e){let t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],a=arguments.length>2?arguments[2]:void 0;const{isRtl:n}=al();return {locationStyles:computed((()=>{if(!e.location)return {};const{side:l,align:o}=Ca(e.location.split(" ").length>1?e.location:`${e.location} center`,n.value);function r(e){return a?a(e):0}const i={};return "center"!==l&&(t?i[jo[l]]=`calc(100% - ${r(l)}px)`:i[l]=0),"center"!==o?t?i[jo[o]]=`calc(100% - ${r(o)}px)`:i[o]=0:("center"===l?i.top=i.left="50%":i[{top:"left",bottom:"left",left:"top",right:"top"}[l]]="50%",i.transform={top:"translateX(-50%)",bottom:"translateX(-50%)",left:"translateY(-50%)",right:"translateY(-50%)",center:"translate(-50%, -50%)"}[l]),i}))}}const zo=wn({absolute:Boolean,active:{type:Boolean,default:!0},bgColor:String,bgOpacity:[Number,String],bufferValue:{type:[Number,String],default:0},bufferColor:String,bufferOpacity:[Number,String],clickable:Boolean,color:String,height:{type:[Number,String],default:4},indeterminate:Boolean,max:{type:[Number,String],default:100},modelValue:{type:[Number,String],default:0},opacity:[Number,String],reverse:Boolean,stream:Boolean,striped:Boolean,roundedBar:Boolean,..._n(),...Ho({location:"top"}),...uo(),...vo(),...jl()},"VProgressLinear"),Uo=$n()({name:"VProgressLinear",props:zo(),emits:{"update:modelValue":e=>!0},setup(e,t){let{slots:a}=t;const n=Un(e,"modelValue"),{isRtl:l,rtlClasses:o}=al(),{themeClasses:r}=Wl(e),{locationStyles:i}=Wo(e),{textColorClasses:s,textColorStyles:u}=fo(e,"color"),{backgroundColorClasses:c,backgroundColorStyles:d}=mo(computed((()=>e.bgColor||e.color))),{backgroundColorClasses:v,backgroundColorStyles:p}=mo(computed((()=>e.bufferColor||e.bgColor||e.color))),{backgroundColorClasses:f,backgroundColorStyles:m}=mo(e,"color"),{roundedClasses:g}=co(e),{intersectionRef:h,isIntersecting:y}=$o(),b=computed((()=>parseFloat(e.max))),x=computed((()=>parseFloat(e.height))),S=computed((()=>ea(parseFloat(e.bufferValue)/b.value*100,0,100))),C=computed((()=>ea(parseFloat(n.value)/b.value*100,0,100))),w=computed((()=>l.value!==e.reverse)),_=computed((()=>e.indeterminate?"fade-transition":"slide-x-transition"));function A(e){if(!h.value)return;const{left:t,right:a,width:l}=h.value.getBoundingClientRect(),o=w.value?l-e.clientX+(a-l):e.clientX-t;n.value=Math.round(o/l*b.value);}return zn((()=>createVNode(e.tag,{ref:h,class:["v-progress-linear",{"v-progress-linear--absolute":e.absolute,"v-progress-linear--active":e.active&&y.value,"v-progress-linear--reverse":w.value,"v-progress-linear--rounded":e.rounded,"v-progress-linear--rounded-bar":e.roundedBar,"v-progress-linear--striped":e.striped},g.value,r.value,o.value,e.class],style:[{bottom:"bottom"===e.location?0:void 0,top:"top"===e.location?0:void 0,height:e.active?Rt(x.value):0,"--v-progress-linear-height":Rt(x.value),...e.absolute?i.value:{}},e.style],role:"progressbar","aria-hidden":e.active?"false":"true","aria-valuemin":"0","aria-valuemax":e.max,"aria-valuenow":e.indeterminate?void 0:C.value,onClick:e.clickable&&A},{default:()=>[e.stream&&createVNode("div",{key:"stream",class:["v-progress-linear__stream",s.value],style:{...u.value,[w.value?"left":"right"]:Rt(-x.value),borderTop:`${Rt(x.value/2)} dotted`,opacity:parseFloat(e.bufferOpacity),top:`calc(50% - ${Rt(x.value/4)})`,width:Rt(100-S.value,"%"),"--v-progress-linear-stream-to":Rt(x.value*(w.value?1:-1))}},null),createVNode("div",{class:["v-progress-linear__background",c.value],style:[d.value,{opacity:parseFloat(e.bgOpacity),width:e.stream?0:void 0}]},null),createVNode("div",{class:["v-progress-linear__buffer",v.value],style:[p.value,{opacity:parseFloat(e.bufferOpacity),width:Rt(S.value,"%")}]},null),createVNode(Transition,{name:_.value},{default:()=>[e.indeterminate?createVNode("div",{class:"v-progress-linear__indeterminate"},[["long","short"].map((e=>createVNode("div",{key:e,class:["v-progress-linear__indeterminate",e,f.value],style:m.value},null)))]):createVNode("div",{class:["v-progress-linear__determinate",f.value],style:[m.value,{width:Rt(C.value,"%")}]},null)]}),a.default&&createVNode("div",{class:"v-progress-linear__content"},[a.default({value:C.value,buffer:S.value})])]}))),{}}}),Yo=wn({loading:[Boolean,String]},"loader");function Ko(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:In();return {loaderClasses:computed((()=>({[`${t}--loading`]:e.loading})))}}function Go(e,t){var a;let{slots:n}=t;return createVNode("div",{class:`${e.name}__loader`},[(null==(a=n.default)?void 0:a.call(n,{color:e.color,isActive:e.active}))||createVNode(Uo,{absolute:e.absolute,active:e.active,color:e.color,height:"2",indeterminate:!0},null)])}const qo=["static","relative","fixed","absolute","sticky"],Zo=wn({position:{type:String,validator:e=>qo.includes(e)}},"position");function Qo(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:In();return {positionClasses:computed((()=>e.position?`${t}--${e.position}`:void 0))}}function Xo(e,t){var a,n;const l=resolveDynamicComponent("RouterLink"),o=computed((()=>!(!e.href&&!e.to))),r=computed((()=>(null==o?void 0:o.value)||da(t,"click")||da(e,"click")));if("string"==typeof l||!("useLink"in l))return {isLink:o,isClickable:r,href:toRef(e,"href")};const s=computed((()=>({...e,to:toRef((()=>e.to||""))}))),u=l.useLink(s.value),c=computed((()=>e.to?u:void 0)),d=function(){const e=An("useRoute");return computed((()=>{var t;return null==(t=null==e?void 0:e.proxy)?void 0:t.$route}))}();return {isLink:o,isClickable:r,route:null==(a=c.value)?void 0:a.route,navigate:null==(n=c.value)?void 0:n.navigate,isActive:computed((()=>{var t,a,n;return !!c.value&&(e.exact?d.value?(null==(n=c.value.isExactActive)?void 0:n.value)&&Tt(c.value.route.value.query,d.value.query):(null==(a=c.value.isExactActive)?void 0:a.value)??!1:(null==(t=c.value.isActive)?void 0:t.value)??!1)})),href:computed((()=>{var t;return e.to?null==(t=c.value)?void 0:t.route.value.href:e.href}))}}const Jo=wn({href:String,replace:Boolean,to:[String,Object],exact:Boolean},"router");const er=Symbol("rippleStop"),tr=80;function ar(e,t){e.style.transform=t,e.style.webkitTransform=t;}function nr(e){return "TouchEvent"===e.constructor.name}function lr(e){return "KeyboardEvent"===e.constructor.name}const or={show(e,t){var a;let n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};if(!(null==(a=null==t?void 0:t._ripple)?void 0:a.enabled))return;const l=(void 0).createElement("span"),o=(void 0).createElement("span");l.appendChild(o),l.className="v-ripple__container",n.class&&(l.className+=` ${n.class}`);const{radius:r,scale:i,x:s,y:u,centerX:c,centerY:d}=function(e,t){var a;let n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},l=0,o=0;if(!lr(e)){const a=t.getBoundingClientRect(),n=nr(e)?e.touches[e.touches.length-1]:e;l=n.clientX-a.left,o=n.clientY-a.top;}let r=0,i=.3;(null==(a=t._ripple)?void 0:a.circle)?(i=.15,r=t.clientWidth/2,r=n.center?r:r+Math.sqrt((l-r)**2+(o-r)**2)/4):r=Math.sqrt(t.clientWidth**2+t.clientHeight**2)/2;const s=(t.clientWidth-2*r)/2+"px",u=(t.clientHeight-2*r)/2+"px";return {radius:r,scale:i,x:n.center?s:l-r+"px",y:n.center?u:o-r+"px",centerX:s,centerY:u}}(e,t,n),v=2*r+"px";o.className="v-ripple__animation",o.style.width=v,o.style.height=v,t.appendChild(l);const p=(void 0).getComputedStyle(t);p&&"static"===p.position&&(t.style.position="relative",t.dataset.previousPosition="static"),o.classList.add("v-ripple__animation--enter"),o.classList.add("v-ripple__animation--visible"),ar(o,`translate(${s}, ${u}) scale3d(${i},${i},${i})`),o.dataset.activated=String(performance.now()),setTimeout((()=>{o.classList.remove("v-ripple__animation--enter"),o.classList.add("v-ripple__animation--in"),ar(o,`translate(${c}, ${d}) scale3d(1,1,1)`);}),0);},hide(e){var t;if(!(null==(t=null==e?void 0:e._ripple)?void 0:t.enabled))return;const a=e.getElementsByClassName("v-ripple__animation");if(0===a.length)return;const n=a[a.length-1];if(n.dataset.isHiding)return;n.dataset.isHiding="true";const l=performance.now()-Number(n.dataset.activated),o=Math.max(250-l,0);setTimeout((()=>{n.classList.remove("v-ripple__animation--in"),n.classList.add("v-ripple__animation--out"),setTimeout((()=>{var t;1===e.getElementsByClassName("v-ripple__animation").length&&e.dataset.previousPosition&&(e.style.position=e.dataset.previousPosition,delete e.dataset.previousPosition),(null==(t=n.parentNode)?void 0:t.parentNode)===e&&e.removeChild(n.parentNode);}),300);}),o);}};function rr(e){return void 0===e||!!e}function ir(e){const t={},a=e.currentTarget;if((null==a?void 0:a._ripple)&&!a._ripple.touched&&!e[er]){if(e[er]=!0,nr(e))a._ripple.touched=!0,a._ripple.isTouch=!0;else if(a._ripple.isTouch)return;if(t.center=a._ripple.centered||lr(e),a._ripple.class&&(t.class=a._ripple.class),nr(e)){if(a._ripple.showTimerCommit)return;a._ripple.showTimerCommit=()=>{or.show(e,a,t);},a._ripple.showTimer=(void 0).setTimeout((()=>{var e;(null==(e=null==a?void 0:a._ripple)?void 0:e.showTimerCommit)&&(a._ripple.showTimerCommit(),a._ripple.showTimerCommit=null);}),tr);}else or.show(e,a,t);}}function sr(e){e[er]=!0;}function ur(e){const t=e.currentTarget;if(null==t?void 0:t._ripple){if((void 0).clearTimeout(t._ripple.showTimer),"touchend"===e.type&&t._ripple.showTimerCommit)return t._ripple.showTimerCommit(),t._ripple.showTimerCommit=null,void(t._ripple.showTimer=(void 0).setTimeout((()=>{ur(e);})));(void 0).setTimeout((()=>{t._ripple&&(t._ripple.touched=!1);})),or.hide(t);}}function cr(e){const t=e.currentTarget;(null==t?void 0:t._ripple)&&(t._ripple.showTimerCommit&&(t._ripple.showTimerCommit=null),(void 0).clearTimeout(t._ripple.showTimer));}let dr=!1;function vr(e){dr||e.keyCode!==Ht.enter&&e.keyCode!==Ht.space||(dr=!0,ir(e));}function pr(e){dr=!1,ur(e);}function fr(e){dr&&(dr=!1,ur(e));}function mr(e,t,a){const{value:n,modifiers:l}=t,o=rr(n);if(o||or.hide(e),e._ripple=e._ripple??{},e._ripple.enabled=o,e._ripple.centered=l.center,e._ripple.circle=l.circle,Nt(n)&&n.class&&(e._ripple.class=n.class),o&&!a){if(l.stop)return e.addEventListener("touchstart",sr,{passive:!0}),void e.addEventListener("mousedown",sr);e.addEventListener("touchstart",ir,{passive:!0}),e.addEventListener("touchend",ur,{passive:!0}),e.addEventListener("touchmove",cr,{passive:!0}),e.addEventListener("touchcancel",ur),e.addEventListener("mousedown",ir),e.addEventListener("mouseup",ur),e.addEventListener("mouseleave",ur),e.addEventListener("keydown",vr),e.addEventListener("keyup",pr),e.addEventListener("blur",fr),e.addEventListener("dragstart",ur,{passive:!0});}else !o&&a&&gr(e);}function gr(e){e.removeEventListener("mousedown",ir),e.removeEventListener("touchstart",ir),e.removeEventListener("touchend",ur),e.removeEventListener("touchmove",cr),e.removeEventListener("touchcancel",ur),e.removeEventListener("mouseup",ur),e.removeEventListener("mouseleave",ur),e.removeEventListener("keydown",vr),e.removeEventListener("keyup",pr),e.removeEventListener("dragstart",ur),e.removeEventListener("blur",fr);}const hr={mounted:function(e,t){mr(e,t,!1);},unmounted:function(e){delete e._ripple,gr(e);},updated:function(e,t){if(t.value===t.oldValue)return;mr(e,t,rr(t.oldValue));}},yr=wn({active:{type:Boolean,default:void 0},baseColor:String,symbol:{type:null,default:Io},flat:Boolean,icon:[Boolean,String,Function,Object],prependIcon:Fl,appendIcon:Fl,block:Boolean,readonly:Boolean,slim:Boolean,stacked:Boolean,ripple:{type:[Boolean,Object],default:!0},text:String,...ao(),..._n(),...oo(),...Ro(),...io(),...Co(),...Yo(),...Ho(),...Zo(),...uo(),...Jo(),...Oo(),...vo({tag:"button"}),...jl(),...yo({variant:"elevated"})},"VBtn"),br=$n()({name:"VBtn",props:yr(),emits:{"group:selected":e=>!0},setup(e,t){let{attrs:a,slots:n}=t;const{themeClasses:l}=Wl(e),{borderClasses:o}=no(e),{densityClasses:r}=ro(e),{dimensionStyles:i}=No(e),{elevationClasses:s}=so(e),{loaderClasses:u}=Ko(e),{locationStyles:c}=Wo(e),{positionClasses:d}=Qo(e),{roundedClasses:v}=co(e),{sizeClasses:p,sizeStyles:f}=Fo(e),m=wo(e,e.symbol,!1),g=Xo(e,a),h=computed((()=>{var t;return void 0!==e.active?e.active:g.isLink.value?null==(t=g.isActive)?void 0:t.value:null==m?void 0:m.isSelected.value})),b=computed((()=>{var t,a;return {color:(null==m?void 0:m.isSelected.value)&&(!g.isLink.value||(null==(t=g.isActive)?void 0:t.value))||!m||(null==(a=g.isActive)?void 0:a.value)?e.color??e.baseColor:e.baseColor,variant:e.variant}})),{colorClasses:x,colorStyles:S,variantClasses:C}=bo(b),w=computed((()=>(null==m?void 0:m.disabled.value)||e.disabled)),_=computed((()=>"elevated"===e.variant&&!(e.disabled||e.flat||e.border))),A=computed((()=>{if(void 0!==e.value&&"symbol"!=typeof e.value)return Object(e.value)===e.value?JSON.stringify(e.value,null,0):e.value}));function I(e){var t;w.value||g.isLink.value&&(e.metaKey||e.ctrlKey||e.shiftKey||0!==e.button||"_blank"===a.target)||(null==(t=g.navigate)||t.call(g,e),null==m||m.toggle());}return function(e,t){watch((()=>{var t;return null==(t=e.isActive)?void 0:t.value}),(a=>{e.isLink.value&&a&&t&&nextTick((()=>{t(!0);}));}),{immediate:!0});}(g,null==m?void 0:m.select),zn((()=>{const t=g.isLink.value?"a":e.tag,a=!(!e.prependIcon&&!n.prepend),y=!(!e.appendIcon&&!n.append),b=!(!e.icon||!0===e.icon);return withDirectives(createVNode(t,{type:"a"===t?void 0:"button",class:["v-btn",null==m?void 0:m.selectedClass.value,{"v-btn--active":h.value,"v-btn--block":e.block,"v-btn--disabled":w.value,"v-btn--elevated":_.value,"v-btn--flat":e.flat,"v-btn--icon":!!e.icon,"v-btn--loading":e.loading,"v-btn--readonly":e.readonly,"v-btn--slim":e.slim,"v-btn--stacked":e.stacked},l.value,o.value,x.value,r.value,s.value,u.value,d.value,v.value,p.value,C.value,e.class],style:[S.value,i.value,c.value,f.value,e.style],"aria-busy":!!e.loading||void 0,disabled:w.value||void 0,href:g.href.value,tabindex:e.loading||e.readonly?-1:void 0,onClick:I,value:A.value},{default:()=>{var t;return [ho(!0,"v-btn"),!e.icon&&a&&createVNode("span",{key:"prepend",class:"v-btn__prepend"},[n.prepend?createVNode(Bo,{key:"prepend-defaults",disabled:!e.prependIcon,defaults:{VIcon:{icon:e.prependIcon}}},n.prepend):createVNode(To,{key:"prepend-icon",icon:e.prependIcon},null)]),createVNode("span",{class:"v-btn__content","data-no-activator":""},[!n.default&&b?createVNode(To,{key:"content-icon",icon:e.icon},null):createVNode(Bo,{key:"content-defaults",disabled:!b,defaults:{VIcon:{icon:e.icon}}},{default:()=>{var t;return [(null==(t=n.default)?void 0:t.call(n))??e.text]}})]),!e.icon&&y&&createVNode("span",{key:"append",class:"v-btn__append"},[n.append?createVNode(Bo,{key:"append-defaults",disabled:!e.appendIcon,defaults:{VIcon:{icon:e.appendIcon}}},n.append):createVNode(To,{key:"append-icon",icon:e.appendIcon},null)]),!!e.loading&&createVNode("span",{key:"loader",class:"v-btn__loader"},[(null==(t=n.loader)?void 0:t.call(n))??createVNode(Lo,{color:"boolean"==typeof e.loading?void 0:e.loading,indeterminate:!0,width:"2"},null)])]}}),[[hr,!w.value&&!!e.ripple,"",{center:!!e.icon}]])})),{group:m}}}),kr=wn({modelValue:null,color:String,cancelText:{type:String,default:"$vuetify.confirmEdit.cancel"},okText:{type:String,default:"$vuetify.confirmEdit.ok"}},"VConfirmEdit"),xr=$n()({name:"VConfirmEdit",props:kr(),emits:{cancel:()=>!0,save:e=>!0,"update:modelValue":e=>!0},setup(e,t){let{emit:a,slots:n}=t;const l=Un(e,"modelValue"),o=ref();watchEffect((()=>{o.value=structuredClone(toRaw(l.value));}));const{t:r}=tl(),i=computed((()=>Tt(l.value,o.value)));function s(){l.value=o.value,a("save",o.value);}function u(){o.value=structuredClone(toRaw(l.value)),a("cancel");}let c=!1;return zn((()=>{var t;const a=createVNode(Fragment,null,[createVNode(br,{disabled:i.value,variant:"text",color:e.color,onClick:u,text:r(e.cancelText)},null),createVNode(br,{disabled:i.value,variant:"text",color:e.color,onClick:s,text:r(e.okText)},null)]);return createVNode(Fragment,null,[null==(t=n.default)?void 0:t.call(n,{model:o,save:s,cancel:u,isPristine:i.value,get actions(){return c=!0,a}}),!c&&a])})),{save:s,cancel:u,isPristine:i}}}),Sr=Mn("v-spacer","div","VSpacer"),Cr=wn({active:{type:[String,Array],default:void 0},disabled:{type:[Boolean,String,Array],default:!1},nextIcon:{type:[String],default:"$next"},prevIcon:{type:[String],default:"$prev"},modeIcon:{type:[String],default:"$subgroup"},text:String,viewMode:{type:String,default:"month"}},"VDatePickerControls"),wr=$n()({name:"VDatePickerControls",props:Cr(),emits:{"click:year":()=>!0,"click:month":()=>!0,"click:prev":()=>!0,"click:next":()=>!0,"click:text":()=>!0},setup(e,t){let{emit:a}=t;const n=computed((()=>Array.isArray(e.disabled)?e.disabled.includes("text"):!!e.disabled)),l=computed((()=>Array.isArray(e.disabled)?e.disabled.includes("mode"):!!e.disabled)),o=computed((()=>Array.isArray(e.disabled)?e.disabled.includes("prev"):!!e.disabled)),r=computed((()=>Array.isArray(e.disabled)?e.disabled.includes("next"):!!e.disabled));function i(){a("click:prev");}function s(){a("click:next");}function u(){a("click:year");}function c(){a("click:month");}return zn((()=>createVNode("div",{class:["v-date-picker-controls"]},[createVNode(br,{class:"v-date-picker-controls__month-btn",disabled:n.value,text:e.text,variant:"text",rounded:!0,onClick:c},null),createVNode(br,{key:"mode-btn",class:"v-date-picker-controls__mode-btn",disabled:l.value,density:"comfortable",icon:e.modeIcon,variant:"text",onClick:u},null),createVNode(Sr,{key:"mode-spacer"},null),createVNode("div",{key:"month-buttons",class:"v-date-picker-controls__month"},[createVNode(br,{disabled:o.value,icon:e.prevIcon,variant:"text",onClick:i},null),createVNode(br,{disabled:r.value,icon:e.nextIcon,variant:"text",onClick:s},null)])]))),{}}}),_r=wn({transition:{type:[Boolean,String,Object],default:"fade-transition",validator:e=>!0!==e}},"transition"),Ar=(e,t)=>{let{slots:a}=t;const{transition:n,disabled:l,group:o,...r}=e,{component:i=(o?TransitionGroup:Transition),...s}="object"==typeof n?n:{};return h(i,mergeProps("string"==typeof n?{name:l?"":n}:s,"string"==typeof n?{}:Object.fromEntries(Object.entries({disabled:l,group:o}).filter((e=>{let[t,a]=e;return void 0!==a}))),r),a)},Ir=wn({appendIcon:String,color:String,header:String,transition:String,onClick:ca()},"VDatePickerHeader"),Pr=$n()({name:"VDatePickerHeader",props:Ir(),emits:{click:()=>!0,"click:append":()=>!0},setup(e,t){let{emit:a,slots:n}=t;const{backgroundColorClasses:l,backgroundColorStyles:o}=mo(e,"color");function r(){a("click");}function i(){a("click:append");}return zn((()=>{const t=!(!n.default&&!e.header),a=!(!n.append&&!e.appendIcon);return createVNode("div",{class:["v-date-picker-header",{"v-date-picker-header--clickable":!!e.onClick},l.value],style:o.value,onClick:r},[n.prepend&&createVNode("div",{key:"prepend",class:"v-date-picker-header__prepend"},[n.prepend()]),t&&createVNode(Ar,{key:"content",name:e.transition},{default:()=>{var t;return [createVNode("div",{key:e.header,class:"v-date-picker-header__content"},[(null==(t=n.default)?void 0:t.call(n))??e.header])]}}),a&&createVNode("div",{class:"v-date-picker-header__append"},[n.append?createVNode(Bo,{key:"append-defaults",disabled:!e.appendIcon,defaults:{VBtn:{icon:e.appendIcon,variant:"text"}}},{default:()=>{var e;return [null==(e=n.append)?void 0:e.call(n)]}}):createVNode(br,{key:"append-btn",icon:e.appendIcon,variant:"text",onClick:i},null)])])})),{}}}),Vr=wn({allowedDates:[Array,Function],disabled:Boolean,displayValue:null,modelValue:Array,month:[Number,String],max:null,min:null,showAdjacentMonths:Boolean,year:[Number,String],weekdays:{type:Array,default:()=>[0,1,2,3,4,5,6]},weeksInMonth:{type:String,default:"dynamic"}},"calendar");function Br(e){const t=gl(),a=Un(e,"modelValue",[],(e=>Jt(e))),n=computed((()=>e.displayValue?t.date(e.displayValue):a.value.length>0?t.date(a.value[0]):e.min?t.date(e.min):Array.isArray(e.allowedDates)?t.date(e.allowedDates[0]):t.date())),l=Un(e,"year",void 0,(e=>{const a=null!=e?Number(e):t.getYear(n.value);return t.startOfYear(t.setYear(t.date(),a))}),(e=>t.getYear(e))),o=Un(e,"month",void 0,(e=>{const a=null!=e?Number(e):t.getMonth(n.value),o=t.setYear(t.startOfMonth(t.date()),t.getYear(l.value));return t.setMonth(o,a)}),(e=>t.getMonth(e))),r=computed((()=>{const a=t.getWeekArray(o.value),n=a.flat();if("static"===e.weeksInMonth&&n.length<42){const e=n[n.length-1];let l=[];for(let o=1;o<=42-n.length;o++)l.push(t.addDays(e,o)),o%7==0&&(a.push(l),l=[]);}return a}));function i(n,l){return n.filter((a=>e.weekdays.includes(t.toJsDate(a).getDay()))).map(((n,r)=>{const i=t.toISO(n),s=!t.isSameMonth(n,o.value),u=t.isSameDay(n,t.startOfMonth(o.value)),c=t.isSameDay(n,t.endOfMonth(o.value)),v=t.isSameDay(n,o.value);return {date:n,isoDate:i,formatted:t.format(n,"keyboardDate"),year:t.getYear(n),month:t.getMonth(n),isDisabled:d(n),isWeekStart:r%7==0,isWeekEnd:r%7==6,isToday:t.isSameDay(n,l),isAdjacent:s,isHidden:s&&!e.showAdjacentMonths,isStart:u,isSelected:a.value.some((e=>t.isSameDay(n,e))),isEnd:c,isSame:v,localized:t.format(n,"dayOfMonth")}}))}const s=computed((()=>{const e=t.startOfWeek(n.value),a=[];for(let n=0;n<=6;n++)a.push(t.addDays(e,n));return i(a,t.date())})),u=computed((()=>i(r.value.flat(),t.date()))),c=computed((()=>r.value.map((e=>e.length?function(e,t){const a=e.toJsDate(t);let n=a.getFullYear(),l=new Date(n,0,1);if(a<l)n-=1,l=new Date(n,0,1);else {const e=new Date(n+1,0,1);a>=e&&(n+=1,l=e);}const o=Math.abs(a.getTime()-l.getTime()),r=Math.ceil(o/864e5);return Math.floor(r/7)+1}(t,e[0]):null))));function d(a){if(e.disabled)return !0;const n=t.date(a);return !(!e.min||!t.isAfter(t.date(e.min),n))||(!(!e.max||!t.isAfter(n,t.date(e.max)))||(Array.isArray(e.allowedDates)&&e.allowedDates.length>0?!e.allowedDates.some((e=>t.isSameDay(t.date(e),n))):"function"==typeof e.allowedDates&&!e.allowedDates(n)))}return {displayValue:n,daysInMonth:u,daysInWeek:s,genDays:i,model:a,weeksInMonth:r,weekNumbers:c}}const Dr=wn({color:String,hideWeekdays:Boolean,multiple:[Boolean,Number,String],showWeek:Boolean,transition:{type:String,default:"picker-transition"},reverseTransition:{type:String,default:"picker-reverse-transition"},...Vr()},"VDatePickerMonth"),Or=$n()({name:"VDatePickerMonth",props:Dr(),emits:{"update:modelValue":e=>!0,"update:month":e=>!0,"update:year":e=>!0},setup(e,t){let{emit:a,slots:n}=t;const l=ref(),{daysInMonth:o,model:r,weekNumbers:i}=Br(e),s=gl(),u=shallowRef(),c=shallowRef(),p=shallowRef(!1),f=computed((()=>p.value?e.reverseTransition:e.transition));"range"===e.multiple&&r.value.length>0&&(u.value=r.value[0],r.value.length>1&&(c.value=r.value[r.value.length-1]));const m=computed((()=>{const t=["number","string"].includes(typeof e.multiple)?Number(e.multiple):1/0;return r.value.length>=t}));function g(t){"range"===e.multiple?function(e){const t=s.startOfDay(e);if(0===r.value.length&&(u.value=void 0),u.value)if(c.value)u.value=e,c.value=void 0,r.value=[u.value];else {if(s.isSameDay(t,u.value))return u.value=void 0,void(r.value=[]);s.isBefore(t,u.value)?(c.value=s.endOfDay(u.value),u.value=t):c.value=s.endOfDay(t);const e=s.getDiff(c.value,u.value,"days"),a=[u.value];for(let t=1;t<e;t++){const e=s.addDays(u.value,t);a.push(e);}a.push(c.value),r.value=a;}else u.value=t,r.value=[u.value];}(t):e.multiple?function(e){const t=r.value.findIndex((t=>s.isSameDay(t,e)));if(-1===t)r.value=[...r.value,e];else {const e=[...r.value];e.splice(t,1),r.value=e;}}(t):r.value=[t];}return watch(o,((e,t)=>{t&&(p.value=s.isBefore(e[0].date,t[0].date));})),()=>createVNode("div",{class:"v-date-picker-month"},[e.showWeek&&createVNode("div",{key:"weeks",class:"v-date-picker-month__weeks"},[!e.hideWeekdays&&createVNode("div",{key:"hide-week-days",class:"v-date-picker-month__day"},[createTextVNode(" ")]),i.value.map((e=>createVNode("div",{class:["v-date-picker-month__day","v-date-picker-month__day--adjacent"]},[e])))]),createVNode(Ar,{name:f.value},{default:()=>{var t;return [createVNode("div",{ref:l,key:null==(t=o.value[0].date)?void 0:t.toString(),class:"v-date-picker-month__days"},[!e.hideWeekdays&&s.getWeekdays().map((e=>createVNode("div",{class:["v-date-picker-month__day","v-date-picker-month__weekday"]},[e]))),o.value.map(((t,a)=>{const l={props:{onClick:()=>g(t.date)},item:t,i:a};return m.value&&!t.isSelected&&(t.isDisabled=!0),createVNode("div",{class:["v-date-picker-month__day",{"v-date-picker-month__day--adjacent":t.isAdjacent,"v-date-picker-month__day--hide-adjacent":t.isHidden,"v-date-picker-month__day--selected":t.isSelected,"v-date-picker-month__day--week-end":t.isWeekEnd,"v-date-picker-month__day--week-start":t.isWeekStart}],"data-v-date":t.isDisabled?void 0:t.isoDate},[(e.showAdjacentMonths||!t.isAdjacent)&&createVNode(Bo,{defaults:{VBtn:{class:"v-date-picker-month__day-btn",color:!t.isSelected&&!t.isToday||t.isDisabled?void 0:e.color,disabled:t.isDisabled,icon:!0,ripple:!1,text:t.localized,variant:t.isDisabled?t.isToday?"outlined":"text":t.isToday&&!t.isSelected?"outlined":"flat",onClick:()=>g(t.date)}}},{default:()=>{var e;return [(null==(e=n.day)?void 0:e.call(n,l))??createVNode(br,l.props,null)]}})])}))])]}})])}}),Fr=wn({color:String,height:[String,Number],min:null,max:null,modelValue:Number,year:Number},"VDatePickerMonths"),Er=$n()({name:"VDatePickerMonths",props:Fr(),emits:{"update:modelValue":e=>!0},setup(e,t){let{emit:a,slots:n}=t;const l=gl(),o=Un(e,"modelValue"),r=computed((()=>{let t=l.startOfYear(l.date());return e.year&&(t=l.setYear(t,e.year)),Lt(12).map((a=>{const n=l.format(t,"monthShort"),o=!!(e.min&&l.isAfter(l.startOfMonth(l.date(e.min)),t)||e.max&&l.isAfter(t,l.startOfMonth(l.date(e.max))));return t=l.getNextMonth(t),{isDisabled:o,text:n,value:a}}))}));return watchEffect((()=>{o.value=o.value??l.getMonth(l.date());})),zn((()=>createVNode("div",{class:"v-date-picker-months",style:{height:Rt(e.height)}},[createVNode("div",{class:"v-date-picker-months__content"},[r.value.map(((t,l)=>{var r;const i={active:o.value===l,color:o.value===l?e.color:void 0,disabled:t.isDisabled,rounded:!0,text:t.text,variant:o.value===t.value?"flat":"text",onClick:()=>function(e){if(o.value===e)return void a("update:modelValue",o.value);o.value=e;}(l)};return (null==(r=n.month)?void 0:r.call(n,{month:t,i:l,props:i}))??createVNode(br,mergeProps({key:"month"},i),null)}))])]))),{}}}),Tr=wn({color:String,height:[String,Number],min:null,max:null,modelValue:Number},"VDatePickerYears"),$r=$n()({name:"VDatePickerYears",props:Tr(),emits:{"update:modelValue":e=>!0},setup(e,t){let{emit:a,slots:n}=t;const l=gl(),o=Un(e,"modelValue"),r=computed((()=>{const t=l.getYear(l.date());let a=t-100,n=t+52;e.min&&(a=l.getYear(l.date(e.min))),e.max&&(n=l.getYear(l.date(e.max)));let o=l.startOfYear(l.date());return o=l.setYear(o,a),Lt(n-a+1,a).map((e=>{const t=l.format(o,"year");return o=l.setYear(o,l.getYear(o)+1),{text:t,value:e}}))}));watchEffect((()=>{o.value=o.value??l.getYear(l.date());}));const i=ka();return zn((()=>createVNode("div",{class:"v-date-picker-years",style:{height:Rt(e.height)}},[createVNode("div",{class:"v-date-picker-years__content"},[r.value.map(((t,l)=>{var r;const s={ref:o.value===t.value?i:void 0,active:o.value===t.value,color:o.value===t.value?e.color:void 0,rounded:!0,text:t.text,variant:o.value===t.value?"flat":"text",onClick:()=>{o.value!==t.value?o.value=t.value:a("update:modelValue",o.value);}};return (null==(r=n.year)?void 0:r.call(n,{year:t,i:l,props:s}))??createVNode(br,mergeProps({key:"month"},s),null)}))])]))),{}}}),Mr=wn({disabled:Boolean,group:Boolean,hideOnLeave:Boolean,leaveAbsolute:Boolean,mode:String,origin:String},"transition");function Lr(e,t,a){return $n()({name:e,props:Mr({mode:a,origin:t}),setup(t,a){let{slots:n}=a;const l={onBeforeEnter(e){t.origin&&(e.style.transformOrigin=t.origin);},onLeave(e){if(t.leaveAbsolute){const{offsetTop:t,offsetLeft:a,offsetWidth:n,offsetHeight:l}=e;e._transitionInitialStyles={position:e.style.position,top:e.style.top,left:e.style.left,width:e.style.width,height:e.style.height},e.style.position="absolute",e.style.top=`${t}px`,e.style.left=`${a}px`,e.style.width=`${n}px`,e.style.height=`${l}px`;}t.hideOnLeave&&e.style.setProperty("display","none","important");},onAfterLeave(e){if(t.leaveAbsolute&&(null==e?void 0:e._transitionInitialStyles)){const{position:t,top:a,left:n,width:l,height:o}=e._transitionInitialStyles;delete e._transitionInitialStyles,e.style.position=t||"",e.style.top=a||"",e.style.left=n||"",e.style.width=l||"",e.style.height=o||"";}}};return ()=>{const a=t.group?TransitionGroup:Transition;return h(a,{name:t.disabled?"":e,css:!t.disabled,...t.group?void 0:{mode:t.mode},...t.disabled?{}:l},n.default)}}})}function Rr(e,t){let a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"in-out";return $n()({name:e,props:{mode:{type:String,default:a},disabled:Boolean,group:Boolean},setup(a,n){let{slots:l}=n;const o=a.group?TransitionGroup:Transition;return ()=>h(o,{name:a.disabled?"":e,css:!a.disabled,...a.disabled?{}:t},l.default)}})}function Nr(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";const t=arguments.length>1&&void 0!==arguments[1]&&arguments[1]?"width":"height",a=camelize(`offset-${t}`);return {onBeforeEnter(e){e._parent=e.parentNode,e._initialStyle={transition:e.style.transition,overflow:e.style.overflow,[t]:e.style[t]};},onEnter(n){const l=n._initialStyle;n.style.setProperty("transition","none","important"),n.style.overflow="hidden";const o=`${n[a]}px`;n.style[t]="0",n.offsetHeight,n.style.transition=l.transition,e&&n._parent&&n._parent.classList.add(e),requestAnimationFrame((()=>{n.style[t]=o;}));},onAfterEnter:l,onEnterCancelled:l,onLeave(e){e._initialStyle={transition:"",overflow:e.style.overflow,[t]:e.style[t]},e.style.overflow="hidden",e.style[t]=`${e[a]}px`,e.offsetHeight,requestAnimationFrame((()=>e.style[t]="0"));},onAfterLeave:n,onLeaveCancelled:n};function n(t){e&&t._parent&&t._parent.classList.remove(e),l(t);}function l(e){const a=e._initialStyle[t];e.style.overflow=e._initialStyle.overflow,null!=a&&(e.style[t]=a),delete e._initialStyle;}}const jr=wn({target:[Object,Array]},"v-dialog-transition"),Hr=$n()({name:"VDialogTransition",props:jr(),setup(e,t){let{slots:a}=t;const n={onBeforeEnter(e){e.style.pointerEvents="none",e.style.visibility="hidden";},async onEnter(t,a){var n;await new Promise((e=>requestAnimationFrame(e))),await new Promise((e=>requestAnimationFrame(e))),t.style.visibility="";const{x:l,y:o,sx:r,sy:i,speed:s}=zr(e.target,t),u=Fa(t,[{transform:`translate(${l}px, ${o}px) scale(${r}, ${i})`,opacity:0},{}],{duration:225*s,easing:"cubic-bezier(0.0, 0, 0.2, 1)"});null==(n=Wr(t))||n.forEach((e=>{Fa(e,[{opacity:0},{opacity:0,offset:.33},{}],{duration:450*s,easing:Rn});})),u.finished.then((()=>a()));},onAfterEnter(e){e.style.removeProperty("pointer-events");},onBeforeLeave(e){e.style.pointerEvents="none";},async onLeave(t,a){var n;await new Promise((e=>requestAnimationFrame(e)));const{x:l,y:o,sx:r,sy:i,speed:s}=zr(e.target,t);Fa(t,[{},{transform:`translate(${l}px, ${o}px) scale(${r}, ${i})`,opacity:0}],{duration:125*s,easing:"cubic-bezier(0.4, 0, 1, 1)"}).finished.then((()=>a())),null==(n=Wr(t))||n.forEach((e=>{Fa(e,[{},{opacity:0,offset:.2},{opacity:0}],{duration:250*s,easing:Rn});}));},onAfterLeave(e){e.style.removeProperty("pointer-events");}};return ()=>e.target?createVNode(Transition,mergeProps({name:"dialog-transition"},n,{css:!1}),a):createVNode(Transition,{name:"dialog-transition"},a)}});function Wr(e){var t;const a=null==(t=e.querySelector(":scope > .v-card, :scope > .v-sheet, :scope > .v-list"))?void 0:t.children;return a&&[...a]}function zr(e,t){const a=Da(e),n=Oa(t),[l,o]=getComputedStyle(t).transformOrigin.split(" ").map((e=>parseFloat(e))),[r,i]=getComputedStyle(t).getPropertyValue("--v-overlay-anchor-origin").split(" ");let s=a.left+a.width/2;"left"===r||"left"===i?s-=a.width/2:"right"!==r&&"right"!==i||(s+=a.width/2);let u=a.top+a.height/2;"top"===r||"top"===i?u-=a.height/2:"bottom"!==r&&"bottom"!==i||(u+=a.height/2);const c=a.width/n.width,d=a.height/n.height,v=Math.max(1,c,d),p=c/v||0,f=d/v||0,m=n.width*n.height/((void 0).innerWidth*(void 0).innerHeight),g=m>.12?Math.min(1.5,10*(m-.12)+1):1;return {x:s-(l+n.left),y:u-(o+n.top),sx:p,sy:f,speed:g}}Lr("fab-transition","center center","out-in"),Lr("dialog-bottom-transition"),Lr("dialog-top-transition");const Ur=Lr("fade-transition"),Yr=Lr("scale-transition");Lr("scroll-x-transition"),Lr("scroll-x-reverse-transition"),Lr("scroll-y-transition"),Lr("scroll-y-reverse-transition"),Lr("slide-x-transition"),Lr("slide-x-reverse-transition");const Kr=Lr("slide-y-transition");Lr("slide-y-reverse-transition");const Gr=Rr("expand-transition",Nr()),qr=Rr("expand-x-transition",Nr("",!0)),Zr=Mn("v-picker-title"),Qr=wn({color:String,...ao(),..._n(),...Ro(),...io(),...Ho(),...Zo(),...uo(),...vo(),...jl()},"VSheet"),Xr=$n()({name:"VSheet",props:Qr(),setup(e,t){let{slots:a}=t;const{themeClasses:n}=Wl(e),{backgroundColorClasses:l,backgroundColorStyles:o}=mo(toRef(e,"color")),{borderClasses:r}=no(e),{dimensionStyles:s}=No(e),{elevationClasses:u}=so(e),{locationStyles:c}=Wo(e),{positionClasses:d}=Qo(e),{roundedClasses:v}=co(e);return zn((()=>createVNode(e.tag,{class:["v-sheet",n.value,l.value,r.value,u.value,d.value,v.value,e.class],style:[o.value,s.value,c.value,e.style]},a))),{}}}),Jr=wn({bgColor:String,landscape:Boolean,title:String,hideHeader:Boolean,...Qr()},"VPicker"),ei=$n()({name:"VPicker",props:Jr(),setup(e,t){let{slots:a}=t;const{backgroundColorClasses:n,backgroundColorStyles:l}=mo(toRef(e,"color"));return zn((()=>{const t=Xr.filterProps(e),o=!(!e.title&&!a.title);return createVNode(Xr,mergeProps(t,{color:e.bgColor,class:["v-picker",{"v-picker--landscape":e.landscape,"v-picker--with-actions":!!a.actions},e.class],style:e.style}),{default:()=>{var t;return [!e.hideHeader&&createVNode("div",{key:"header",class:[n.value],style:[l.value]},[o&&createVNode(Zr,{key:"picker-title"},{default:()=>{var t;return [(null==(t=a.title)?void 0:t.call(a))??e.title]}}),a.header&&createVNode("div",{class:"v-picker__header"},[a.header()])]),createVNode("div",{class:"v-picker__body"},[null==(t=a.default)?void 0:t.call(a)]),a.actions&&createVNode(Bo,{defaults:{VBtn:{slim:!0,variant:"text"}}},{default:()=>[createVNode("div",{class:"v-picker__actions"},[a.actions()])]})]}})})),{}}}),ti=wn({header:{type:String,default:"$vuetify.datePicker.header"},...Cr(),...Dr({weeksInMonth:"static"}),...Gt(Fr(),["modelValue"]),...Gt(Tr(),["modelValue"]),...Jr({title:"$vuetify.datePicker.title"}),modelValue:null},"VDatePicker"),ai=$n()({name:"VDatePicker",props:ti(),emits:{"update:modelValue":e=>!0,"update:month":e=>!0,"update:year":e=>!0,"update:viewMode":e=>!0},setup(e,t){let{emit:a,slots:n}=t;const l=gl(),{t:o}=tl(),r=Un(e,"modelValue",void 0,(e=>Jt(e)),(t=>e.multiple?t:t[0])),i=Un(e,"viewMode"),s=computed((()=>{var e;const t=l.date(null==(e=r.value)?void 0:e[0]);return t&&l.isValid(t)?t:l.date()})),u=ref(Number(e.month??l.getMonth(l.startOfMonth(s.value)))),c=ref(Number(e.year??l.getYear(l.startOfYear(l.setMonth(s.value,u.value))))),p=shallowRef(!1),f=computed((()=>e.multiple&&r.value.length>1?o("$vuetify.datePicker.itemsSelected",r.value.length):r.value[0]&&l.isValid(r.value[0])?l.format(l.date(r.value[0]),"normalDateWithWeekday"):o(e.header))),m=computed((()=>{let e=l.date();return e=l.setDate(e,1),e=l.setMonth(e,u.value),e=l.setYear(e,c.value),l.format(e,"monthAndYear")})),g=computed((()=>`date-picker-header${p.value?"-reverse":""}-transition`)),h=computed((()=>{const t=l.date(e.min);return e.min&&l.isValid(t)?t:null})),b=computed((()=>{const t=l.date(e.max);return e.max&&l.isValid(t)?t:null})),x=computed((()=>{if(e.disabled)return !0;const t=[];if("month"!==i.value)t.push("prev","next");else {let e=l.date();if(e=l.setYear(e,c.value),e=l.setMonth(e,u.value),h.value){const a=l.addDays(l.startOfMonth(e),-1);l.isAfter(h.value,a)&&t.push("prev");}if(b.value){const a=l.addDays(l.endOfMonth(e),1);l.isAfter(a,b.value)&&t.push("next");}}return t}));function S(){u.value<11?u.value++:(c.value++,u.value=0,V(c.value)),P(u.value);}function C(){u.value>0?u.value--:(c.value--,u.value=11,V(c.value)),P(u.value);}function w(){i.value="month";}function _(){i.value="months"===i.value?"month":"months";}function I(){i.value="year"===i.value?"month":"year";}function P(e){"months"===i.value&&_(),a("update:month",e);}function V(e){"year"===i.value&&I(),a("update:year",e);}return watch(r,((e,t)=>{const a=Jt(t),n=Jt(e);if(!n.length)return;const o=l.date(a[a.length-1]),r=l.date(n[n.length-1]),i=l.getMonth(r),s=l.getYear(r);i!==u.value&&(u.value=i,P(u.value)),s!==c.value&&(c.value=s,V(c.value)),p.value=l.isBefore(o,r);})),zn((()=>{const t=ei.filterProps(e),a=wr.filterProps(e),l=Pr.filterProps(e),s=Or.filterProps(e),d=Gt(Er.filterProps(e),["modelValue"]),v=Gt($r.filterProps(e),["modelValue"]),p={header:f.value,transition:g.value};return createVNode(ei,mergeProps(t,{class:["v-date-picker",`v-date-picker--${i.value}`,{"v-date-picker--show-week":e.showWeek},e.class],style:e.style}),{title:()=>{var t;return (null==(t=n.title)?void 0:t.call(n))??createVNode("div",{class:"v-date-picker__title"},[o(e.title)])},header:()=>n.header?createVNode(Bo,{defaults:{VDatePickerHeader:{...p}}},{default:()=>{var e;return [null==(e=n.header)?void 0:e.call(n,p)]}}):createVNode(Pr,mergeProps({key:"header"},l,p,{onClick:"month"!==i.value?w:void 0}),{...n,default:void 0}),default:()=>createVNode(Fragment,null,[createVNode(wr,mergeProps(a,{disabled:x.value,text:m.value,"onClick:next":S,"onClick:prev":C,"onClick:month":_,"onClick:year":I}),null),createVNode(Ur,{hideOnLeave:!0},{default:()=>["months"===i.value?createVNode(Er,mergeProps({key:"date-picker-months"},d,{modelValue:u.value,"onUpdate:modelValue":[e=>u.value=e,P],min:h.value,max:b.value,year:c.value}),null):"year"===i.value?createVNode($r,mergeProps({key:"date-picker-years"},v,{modelValue:c.value,"onUpdate:modelValue":[e=>c.value=e,V],min:h.value,max:b.value}),null):createVNode(Or,mergeProps({key:"date-picker-month"},s,{modelValue:r.value,"onUpdate:modelValue":e=>r.value=e,month:u.value,"onUpdate:month":[e=>u.value=e,P],year:c.value,"onUpdate:year":[e=>c.value=e,V],min:h.value,max:b.value}),null)]})]),actions:n.actions})})),{}}});function ni(e,t){return {x:e.x+t.x,y:e.y+t.y}}function li(e,t){if("top"===e.side||"bottom"===e.side){const{side:a,align:n}=e;return ni({x:"left"===n?0:"center"===n?t.width/2:"right"===n?t.width:n,y:"top"===a?0:"bottom"===a?t.height:a},t)}if("left"===e.side||"right"===e.side){const{side:a,align:n}=e;return ni({x:"left"===a?0:"right"===a?t.width:a,y:"top"===n?0:"center"===n?t.height/2:"bottom"===n?t.height:n},t)}return ni({x:t.width/2,y:t.height/2},t)}const oi={static:function(){},connected:function(e,t,a){(Array.isArray(e.target.value)||function(e){for(;e;){if("fixed"===(void 0).getComputedStyle(e).position)return !0;e=e.offsetParent;}return !1}(e.target.value))&&Object.assign(a.value,{position:"fixed",top:0,[e.isRtl.value?"right":"left"]:0});const{preferredAnchor:n,preferredOrigin:l}=sa((()=>{const a=Ca(t.location,e.isRtl.value),n="overlap"===t.origin?a:"auto"===t.origin?_a(a):Ca(t.origin,e.isRtl.value);return a.side===n.side&&a.align===Aa(n).align?{preferredAnchor:Ia(a),preferredOrigin:Ia(n)}:{preferredAnchor:a,preferredOrigin:n}})),[o,r,i,s]=["minWidth","minHeight","maxWidth","maxHeight"].map((e=>computed((()=>{const a=parseFloat(t[e]);return isNaN(a)?1/0:a})))),u=computed((()=>{if(Array.isArray(t.offset))return t.offset;if("string"==typeof t.offset){const e=t.offset.split(" ").map(parseFloat);return e.length<2&&e.push(0),e}return "number"==typeof t.offset?[t.offset,0]:[0,0]}));let c=!1;const d=new ResizeObserver((()=>{c&&v();}));function v(){if(c=!1,requestAnimationFrame((()=>c=!0)),!e.target.value||!e.contentEl.value)return;const t=Da(e.target.value),d=function(e,t){t?e.style.removeProperty("left"):e.style.removeProperty("right");const a=Oa(e);t?a.x+=parseFloat(e.style.right||0):a.x-=parseFloat(e.style.left||0);return a.y-=parseFloat(e.style.top||0),a}(e.contentEl.value,e.isRtl.value),v=jn(e.contentEl.value);v.length||(v.push((void 0).documentElement),e.contentEl.value.style.top&&e.contentEl.value.style.left||(d.x-=parseFloat((void 0).documentElement.style.getPropertyValue("--v-body-scroll-x")||0),d.y-=parseFloat((void 0).documentElement.style.getPropertyValue("--v-body-scroll-y")||0)));const p=v.reduce(((e,t)=>{const a=t.getBoundingClientRect(),n=new Va({x:t===(void 0).documentElement?0:a.x,y:t===(void 0).documentElement?0:a.y,width:t.clientWidth,height:t.clientHeight});return e?new Va({x:Math.max(e.left,n.left),y:Math.max(e.top,n.top),width:Math.min(e.right,n.right)-Math.max(e.left,n.left),height:Math.min(e.bottom,n.bottom)-Math.max(e.top,n.top)}):n}),void 0);p.x+=12,p.y+=12,p.width-=24,p.height-=24;let f={anchor:n.value,origin:l.value};function m(e){const a=new Va(d),n=li(e.anchor,t),l=li(e.origin,a);let{x:o,y:r}=(v=l,{x:(c=n).x-v.x,y:c.y-v.y});var c,v;switch(e.anchor.side){case"top":r-=u.value[0];break;case"bottom":r+=u.value[0];break;case"left":o-=u.value[0];break;case"right":o+=u.value[0];}switch(e.anchor.align){case"top":r-=u.value[1];break;case"bottom":r+=u.value[1];break;case"left":o-=u.value[1];break;case"right":o+=u.value[1];}a.x+=o,a.y+=r,a.width=Math.min(a.width,i.value),a.height=Math.min(a.height,s.value);return {overflows:Ba(a,p),x:o,y:r}}let g=0,h=0;const y={x:0,y:0},b={x:!1,y:!1};let k=-1;for(;;){if(k++>10){Ja("Infinite loop detected in connectedLocationStrategy");break}const{x:e,y:t,overflows:a}=m(f);g+=e,h+=t,d.x+=e,d.y+=t;{const e=Pa(f.anchor),t=a.x.before||a.x.after,n=a.y.before||a.y.after;let l=!1;if(["x","y"].forEach((o=>{if("x"===o&&t&&!b.x||"y"===o&&n&&!b.y){const t={anchor:{...f.anchor},origin:{...f.origin}},n="x"===o?"y"===e?Aa:_a:"y"===e?_a:Aa;t.anchor=n(t.anchor),t.origin=n(t.origin);const{overflows:r}=m(t);(r[o].before<=a[o].before&&r[o].after<=a[o].after||r[o].before+r[o].after<(a[o].before+a[o].after)/2)&&(f=t,l=b[o]=!0);}})),l)continue}a.x.before&&(g+=a.x.before,d.x+=a.x.before),a.x.after&&(g-=a.x.after,d.x-=a.x.after),a.y.before&&(h+=a.y.before,d.y+=a.y.before),a.y.after&&(h-=a.y.after,d.y-=a.y.after);{const e=Ba(d,p);y.x=p.width-e.x.before-e.x.after,y.y=p.height-e.y.before-e.y.after,g+=e.x.before,d.x+=e.x.before,h+=e.y.before,d.y+=e.y.before;}break}const x=Pa(f.anchor);return Object.assign(a.value,{"--v-overlay-anchor-origin":`${f.anchor.side} ${f.anchor.align}`,transformOrigin:`${f.origin.side} ${f.origin.align}`,top:Rt(ii(h)),left:e.isRtl.value?void 0:Rt(ii(g)),right:e.isRtl.value?Rt(ii(-g)):void 0,minWidth:Rt("y"===x?Math.min(o.value,t.width):o.value),maxWidth:Rt(si(ea(y.x,o.value===1/0?0:o.value,i.value))),maxHeight:Rt(si(ea(y.y,r.value===1/0?0:r.value,s.value)))}),{available:y,contentBox:d}}return watch([e.target,e.contentEl],((e,t)=>{let[a,n]=e,[l,o]=t;l&&!Array.isArray(l)&&d.unobserve(l),a&&!Array.isArray(a)&&d.observe(a),o&&d.unobserve(o),n&&d.observe(n);}),{immediate:!0}),onScopeDispose((()=>{d.disconnect();})),watch((()=>[n.value,l.value,t.offset,t.minWidth,t.minHeight,t.maxWidth,t.maxHeight]),(()=>v())),nextTick((()=>{const e=v();if(!e)return;const{available:t,contentBox:a}=e;a.height>t.y&&requestAnimationFrame((()=>{v(),requestAnimationFrame((()=>{v();}));}));})),{updateLocation:v}}},ri=wn({locationStrategy:{type:[String,Function],default:"static",validator:e=>"function"==typeof e||e in oi},location:{type:String,default:"bottom"},origin:{type:String,default:"auto"},offset:[Number,String,Array]},"VOverlay-location-strategies");function ii(e){return Math.round(e*devicePixelRatio)/devicePixelRatio}function si(e){return Math.ceil(e*devicePixelRatio)/devicePixelRatio}let ui=!0;const ci=[];let di=-1;function vi(){cancelAnimationFrame(di),di=requestAnimationFrame((()=>{const e=ci.shift();e&&e(),ci.length?vi():ui=!0;}));}const pi={none:null,close:function(e){mi(e.targetEl.value??e.contentEl.value,(function(t){e.isActive.value=!1;}));},block:function(e,t){var a;const n=null==(a=e.root.value)?void 0:a.offsetParent,l=[...new Set([...jn(e.targetEl.value,t.contained?n:void 0),...jn(e.contentEl.value,t.contained?n:void 0)])].filter((e=>!e.classList.contains("v-overlay-scroll-blocked"))),o=(void 0).innerWidth-(void 0).documentElement.offsetWidth,r=(i=n||(void 0).documentElement,Hn(i)&&i);var i;r&&e.root.value.classList.add("v-overlay--scroll-blocked");l.forEach(((e,t)=>{e.style.setProperty("--v-body-scroll-x",Rt(-e.scrollLeft)),e.style.setProperty("--v-body-scroll-y",Rt(-e.scrollTop)),e!==(void 0).documentElement&&e.style.setProperty("--v-scrollbar-offset",Rt(o)),e.classList.add("v-overlay-scroll-blocked");})),onScopeDispose((()=>{l.forEach(((e,t)=>{const a=parseFloat(e.style.getPropertyValue("--v-body-scroll-x")),n=parseFloat(e.style.getPropertyValue("--v-body-scroll-y")),l=e.style.scrollBehavior;e.style.scrollBehavior="auto",e.style.removeProperty("--v-body-scroll-x"),e.style.removeProperty("--v-body-scroll-y"),e.style.removeProperty("--v-scrollbar-offset"),e.classList.remove("v-overlay-scroll-blocked"),e.scrollLeft=-a,e.scrollTop=-n,e.style.scrollBehavior=l;})),r&&e.root.value.classList.remove("v-overlay--scroll-blocked");}));},reposition:function(e,t,a){let n=!1,l=-1,o=-1;function r(t){var a;a=()=>{var a,l;const o=performance.now();null==(l=(a=e.updateLocation).value)||l.call(a,t);const r=performance.now()-o;n=r/(1e3/60)>2;},!ui||ci.length?(ci.push(a),vi()):(ui=!1,a(),vi());}o=("undefined"==typeof requestIdleCallback?e=>e():requestIdleCallback)((()=>{a.run((()=>{mi(e.targetEl.value??e.contentEl.value,(e=>{n?(cancelAnimationFrame(l),l=requestAnimationFrame((()=>{l=requestAnimationFrame((()=>{r(e);}));}))):r(e);}));}));})),onScopeDispose((()=>{"undefined"!=typeof cancelIdleCallback&&cancelIdleCallback(o),cancelAnimationFrame(l);}));}},fi=wn({scrollStrategy:{type:[String,Function],default:"block",validator:e=>"function"==typeof e||e in pi}},"VOverlay-scroll-strategies");function mi(e,t){const a=[void 0,...jn(e)];a.forEach((e=>{e.addEventListener("scroll",t,{passive:!0});})),onScopeDispose((()=>{a.forEach((e=>{e.removeEventListener("scroll",t);}));}));}const gi=Symbol.for("vuetify:v-menu"),hi=wn({closeDelay:[Number,String],openDelay:[Number,String]},"delay");const yi=wn({target:[String,Object],activator:[String,Object],activatorProps:{type:Object,default:()=>({})},openOnClick:{type:Boolean,default:void 0},openOnHover:Boolean,openOnFocus:{type:Boolean,default:void 0},closeOnContentClick:Boolean,...hi()},"VOverlay-activator");function bi(e,t){let{isActive:a,isTop:n}=t;const l=An("useActivator"),o=ref();let i=!1,s=!1,u=!0;const c=computed((()=>e.openOnFocus||null==e.openOnFocus&&e.openOnHover)),v=computed((()=>e.openOnClick||null==e.openOnClick&&!e.openOnHover&&!c.value)),{runOpenDelay:p,runCloseDelay:f}=function(e,t){let a=()=>{};function n(n){return null==a||a(),Number(n?e.openDelay:e.closeDelay),new Promise((e=>{a=function(e,t){return t(),()=>{}}(0,(()=>{null==t||t(n),e(n);}));}))}return {clearDelay:a,runOpenDelay:function(){return n(!0)},runCloseDelay:function(){return n(!1)}}}(e,(t=>{t!==(e.openOnHover&&i||c.value&&s)||e.openOnHover&&a.value&&!n.value||(a.value!==t&&(u=!0),a.value=t);})),m=ref(),g=e=>{e.stopPropagation(),o.value=e.currentTarget||e.target,a.value||(m.value=[e.clientX,e.clientY]),a.value=!a.value;},h=e=>{var t;(null==(t=e.sourceCapabilities)?void 0:t.firesTouchEvents)||(i=!0,o.value=e.currentTarget||e.target,p());},S=e=>{i=!1,f();},C=e=>{!1!==(e.target,null)&&(s=!0,e.stopPropagation(),o.value=e.currentTarget||e.target,p());},w=e=>{s=!1,e.stopPropagation(),f();},_=computed((()=>{const t={};return v.value&&(t.onClick=g),e.openOnHover&&(t.onMouseenter=h,t.onMouseleave=S),c.value&&(t.onFocus=C,t.onBlur=w),t})),A=computed((()=>{const t={};if(e.openOnHover&&(t.onMouseenter=()=>{i=!0,p();},t.onMouseleave=()=>{i=!1,f();}),c.value&&(t.onFocusin=()=>{s=!0,p();},t.onFocusout=()=>{s=!1,f();}),e.closeOnContentClick){const e=inject(gi,null);t.onClick=()=>{a.value=!1,null==e||e.closeParents();};}return t})),I=computed((()=>{const t={};return e.openOnHover&&(t.onMouseenter=()=>{u&&(i=!0,u=!1,p());},t.onMouseleave=()=>{i=!1,f();}),t}));watch(n,(t=>{!t||(!e.openOnHover||i||c.value&&s)&&(!c.value||s||e.openOnHover&&i)||(a.value=!1);})),watch(a,(e=>{e||setTimeout((()=>{m.value=void 0;}));}),{flush:"post"});const P=ka();watchEffect((()=>{P.value&&nextTick((()=>{o.value=P.el;}));}));const V=ka(),B=computed((()=>"cursor"===e.target&&m.value?m.value:V.value?V.el:ki(e.target,l)||o.value)),D=computed((()=>Array.isArray(B.value)?void 0:B.value));return watch((()=>!!e.activator),(e=>{}),{flush:"post",immediate:!0}),onScopeDispose((()=>{})),{activatorEl:o,activatorRef:P,target:B,targetEl:D,targetRef:V,activatorEvents:_,contentEvents:A,scrimEvents:I}}function ki(e,t){var a,n;if(!e)return;let l;if("parent"===e){let e=null==(n=null==(a=null==t?void 0:t.proxy)?void 0:a.$el)?void 0:n.parentNode;for(;null==e?void 0:e.hasAttribute("data-no-activator");)e=e.parentNode;l=e;}else l="string"==typeof e?(void 0).querySelector(e):"$el"in e?e.$el:e;return l}const xi=wn({eager:Boolean},"lazy");function Si(e,t){const a=shallowRef(!1),n=computed((()=>a.value||e.eager||t.value));return watch(t,(()=>a.value=!0)),{isBooted:a,hasContent:n,onAfterLeave:function(){e.eager||(a.value=!1);}}}function Ci(){const e=An("useScopeId").vnode.scopeId;return {scopeId:e?{[e]:""}:void 0}}const wi=Symbol.for("vuetify:stack"),_i=reactive([]);function Ai(){return !0}function Ii(e,t,a){if(!e||!1===Pi(e,a))return !1;const n=Ln(t);if("undefined"!=typeof ShadowRoot&&n instanceof ShadowRoot&&n.host===e.target)return !1;const l=("object"==typeof a.value&&a.value.include||(()=>[]))();return l.push(t),!l.some((t=>null==t?void 0:t.contains(e.target)))}function Pi(e,t){return ("object"==typeof t.value&&t.value.closeConditional||Ai)(e)}function Vi(e,t){const a=Ln(e);t(void 0),"undefined"!=typeof ShadowRoot&&a instanceof ShadowRoot&&t(a);}const Bi={mounted(e,t){const a=a=>function(e,t,a){const n="function"==typeof a.value?a.value:a.value.handler;t._clickOutside.lastMousedownWasOutside&&Ii(e,t,a)&&setTimeout((()=>{Pi(e,a)&&n&&n(e);}),0);}(a,e,t),n=a=>{e._clickOutside.lastMousedownWasOutside=Ii(a,e,t);};Vi(e,(e=>{e.addEventListener("click",a,!0),e.addEventListener("mousedown",n,!0);})),e._clickOutside||(e._clickOutside={lastMousedownWasOutside:!1}),e._clickOutside[t.instance.$.uid]={onClick:a,onMousedown:n};},unmounted(e,t){e._clickOutside&&(Vi(e,(a=>{var n;if(!a||!(null==(n=e._clickOutside)?void 0:n[t.instance.$.uid]))return;const{onClick:l,onMousedown:o}=e._clickOutside[t.instance.$.uid];a.removeEventListener("click",l,!0),a.removeEventListener("mousedown",o,!0);})),delete e._clickOutside[t.instance.$.uid]);}};function Di(e){const{modelValue:t,color:a,...n}=e;return createVNode(Transition,{name:"fade-transition",appear:!0},{default:()=>[e.modelValue&&createVNode("div",mergeProps({class:["v-overlay__scrim",e.color.backgroundColorClasses.value],style:e.color.backgroundColorStyles.value},n),null)]})}const Oi=wn({absolute:Boolean,attach:[Boolean,String,Object],closeOnBack:{type:Boolean,default:!0},contained:Boolean,contentClass:null,contentProps:null,disabled:Boolean,opacity:[Number,String],noClickAnimation:Boolean,modelValue:Boolean,persistent:Boolean,scrim:{type:[Boolean,String],default:!0},zIndex:{type:[Number,String],default:2e3},...yi(),..._n(),...Ro(),...xi(),...ri(),...fi(),...jl(),..._r()},"VOverlay"),Fi=$n()({name:"VOverlay",directives:{ClickOutside:Bi},inheritAttrs:!1,props:{_disableGlobalStack:Boolean,...Oi()},emits:{"click:outside":e=>!0,"update:modelValue":e=>!0,afterEnter:()=>!0,afterLeave:()=>!0},setup(e,t){let{slots:n,attrs:l,emit:o}=t;const s=Un(e,"modelValue"),u=computed({get:()=>s.value,set:t=>{t&&e.disabled||(s.value=t);}}),{themeClasses:c}=Wl(e),{rtlClasses:p,isRtl:f}=al(),{hasContent:m,onAfterLeave:g}=Si(e,u),S=mo(computed((()=>"string"==typeof e.scrim?e.scrim:null))),{globalTop:C,localTop:w,stackStyles:_}=function(e,t,n){const l=An("useStack"),o=!n,i=inject(wi,void 0),s=reactive({activeChildren:new Set});provide(wi,s);const u=shallowRef(+t.value);Dt(e,(()=>{var e;const a=null==(e=_i.at(-1))?void 0:e[1];u.value=a?a+10:+t.value,o&&_i.push([l.uid,u.value]),null==i||i.activeChildren.add(l.uid),onScopeDispose((()=>{if(o){const e=toRaw(_i).findIndex((e=>e[0]===l.uid));_i.splice(e,1);}null==i||i.activeChildren.delete(l.uid);}));}));const c=shallowRef(!0);o&&watchEffect((()=>{var e;const t=(null==(e=_i.at(-1))?void 0:e[0])===l.uid;setTimeout((()=>c.value=t));}));const d=computed((()=>!s.activeChildren.size));return {globalTop:readonly(c),localTop:d,stackStyles:computed((()=>({zIndex:u.value})))}}(u,toRef(e,"zIndex"),e._disableGlobalStack),{activatorEl:P,activatorRef:B,target:D,targetEl:E,targetRef:T,activatorEvents:$,contentEvents:M,scrimEvents:R}=bi(e,{isActive:u,isTop:w}),N=computed((()=>{var e;return null==(e=null==P?void 0:P.value)?void 0:e.getRootNode()})),{teleportTarget:z}=function(e){return {teleportTarget:computed((()=>{e.value;}))}}(computed((()=>!!(e.attach||e.contained||N.value instanceof ShadowRoot)&&(N.value??!0)))),{dimensionStyles:U}=No(e),Y=shallowRef(!1),{scopeId:K}=Ci();watch((()=>e.disabled),(e=>{e&&(u.value=!1);}));const G=ref(),q=ref(),Z=ref(),{contentStyles:Q,updateLocation:X}={contentStyles:ref({}),updateLocation:ref()};function J(t){o("click:outside",t),e.persistent?le():u.value=!1;}function ee(t){return u.value&&C.value&&(!e.scrim||t.target===q.value)}var te,ae;null==(ae=null==(te=An("useRouter"))?void 0:te.proxy)||ae.$router,Dt((()=>e.closeOnBack),(()=>{}));const ne=ref();function le(){e.noClickAnimation||Z.value&&Fa(Z.value,[{transformOrigin:"center"},{transform:"scale(1.03)"},{transformOrigin:"center"}],{duration:150,easing:Rn});}function oe(){o("afterEnter");}function re(){g(),o("afterLeave");}return watch((()=>u.value&&(e.absolute||e.contained)&&null==z.value),(e=>{if(e){const e=function(e){let t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];for(;e;){if(t?Wn(e):Hn(e))return e;e=e.parentElement;}return (void 0).scrollingElement}(G.value);e&&e!==(void 0).scrollingElement&&(ne.value=e.scrollTop);}})),zn((()=>{var t;return createVNode(Fragment,null,[null==(t=n.activator)?void 0:t.call(n,{isActive:u.value,targetRef:T,props:mergeProps({ref:B},$.value,e.activatorProps)}),Y.value&&m.value&&createVNode(Teleport,{disabled:!z.value,to:z.value},{default:()=>[createVNode("div",mergeProps({class:["v-overlay",{"v-overlay--absolute":e.absolute||e.contained,"v-overlay--active":u.value,"v-overlay--contained":e.contained},c.value,p.value,e.class],style:[_.value,{"--v-overlay-opacity":e.opacity,top:Rt(ne.value)},e.style],ref:G},K,l),[createVNode(Di,mergeProps({color:S,modelValue:u.value&&!!e.scrim,ref:q},R.value),null),createVNode(Ar,{appear:!0,persisted:!0,transition:e.transition,target:D.value,onAfterEnter:oe,onAfterLeave:re},{default:()=>{var t;return [withDirectives(createVNode("div",mergeProps({ref:Z,class:["v-overlay__content",e.contentClass],style:[U.value,Q.value]},M.value,e.contentProps),[null==(t=n.default)?void 0:t.call(n,{isActive:u})]),[[vShow,u.value],[resolveDirective("click-outside"),{handler:J,closeConditional:ee,include:()=>[P.value]}]])]}})])]})])})),{activatorEl:P,scrimEl:q,target:D,animateClick:le,contentEl:Z,globalTop:C,localTop:w,updateLocation:X}}}),Ei=Symbol("Forwarded refs");function Ti(e,t){let a=e;for(;a;){const e=Reflect.getOwnPropertyDescriptor(a,t);if(e)return e;a=Object.getPrototypeOf(a);}}function $i(e){for(var t=arguments.length,a=new Array(t>1?t-1:0),n=1;n<t;n++)a[n-1]=arguments[n];return e[Ei]=a,new Proxy(e,{get(e,t){if(Reflect.has(e,t))return Reflect.get(e,t);if("symbol"!=typeof t&&!t.startsWith("$")&&!t.startsWith("__"))for(const n of a)if(n.value&&Reflect.has(n.value,t)){const e=Reflect.get(n.value,t);return "function"==typeof e?e.bind(n.value):e}},has(e,t){if(Reflect.has(e,t))return !0;if("symbol"==typeof t||t.startsWith("$")||t.startsWith("__"))return !1;for(const n of a)if(n.value&&Reflect.has(n.value,t))return !0;return !1},set(e,t,n){if(Reflect.has(e,t))return Reflect.set(e,t,n);if("symbol"==typeof t||t.startsWith("$")||t.startsWith("__"))return !1;for(const l of a)if(l.value&&Reflect.has(l.value,t))return Reflect.set(l.value,t,n);return !1},getOwnPropertyDescriptor(e,t){var n;const l=Reflect.getOwnPropertyDescriptor(e,t);if(l)return l;if("symbol"!=typeof t&&!t.startsWith("$")&&!t.startsWith("__")){for(const e of a){if(!e.value)continue;const a=Ti(e.value,t)??("_"in e.value?Ti(null==(n=e.value._)?void 0:n.setupState,t):void 0);if(a)return a}for(const e of a){const a=e.value&&e.value[Ei];if(!a)continue;const n=a.slice();for(;n.length;){const e=n.shift(),a=Ti(e.value,t);if(a)return a;const l=e.value&&e.value[Ei];l&&n.push(...l);}}}}})}const Mi=wn({id:String,...Gt(Oi({closeDelay:250,closeOnContentClick:!0,locationStrategy:"connected",openDelay:300,scrim:!1,scrollStrategy:"reposition",transition:{component:Hr}}),["absolute"])},"VMenu"),Li=$n()({name:"VMenu",props:Mi(),emits:{"update:modelValue":e=>!0},setup(e,t){let{slots:a}=t;const n=Un(e,"modelValue"),{scopeId:l}=Ci(),o=Bn(),i=computed((()=>e.id||`v-menu-${o}`)),s=ref(),u=inject(gi,null),c=shallowRef(0);async function p(e){var t,a,l;const o=e.relatedTarget,r=e.target;if(await nextTick(),n.value&&o!==r&&(null==(t=s.value)?void 0:t.contentEl)&&(null==(a=s.value)?void 0:a.globalTop)&&![void 0,s.value.contentEl].includes(r)&&!s.value.contentEl.contains(r)){null==(l=va(s.value.contentEl)[0])||l.focus();}}function f(e){null==u||u.closeParents(e);}function m(t){var a,l,o;if(!e.disabled)if("Tab"===t.key||"Enter"===t.key&&!e.closeOnContentClick){if("Enter"===t.key&&(t.target instanceof HTMLTextAreaElement||t.target instanceof HTMLInputElement&&t.target.closest("form")))return;"Enter"===t.key&&t.preventDefault();pa(va(null==(a=s.value)?void 0:a.contentEl,!1),t.shiftKey?"prev":"next",(e=>e.tabIndex>=0))||(n.value=!1,null==(o=null==(l=s.value)?void 0:l.activatorEl)||o.focus());}else ["Enter"," "].includes(t.key)&&e.closeOnContentClick&&(n.value=!1,null==u||u.closeParents());}function g(t){var a;if(e.disabled)return;const l=null==(a=s.value)?void 0:a.contentEl;l&&n.value?"ArrowDown"===t.key?(t.preventDefault(),fa(l,"next")):"ArrowUp"===t.key&&(t.preventDefault(),fa(l,"prev")):["ArrowDown","ArrowUp"].includes(t.key)&&(n.value=!0,t.preventDefault(),setTimeout((()=>setTimeout((()=>g(t))))));}provide(gi,{register(){++c.value;},unregister(){--c.value;},closeParents(t){setTimeout((()=>{c.value||e.persistent||null!=t&&(!t||function(e,t){const a=e.clientX,n=e.clientY,l=t.getBoundingClientRect(),o=l.left,r=l.top,i=l.right,s=l.bottom;return a>=o&&a<=i&&n>=r&&n<=s}(t,s.value.contentEl))||(n.value=!1,null==u||u.closeParents());}),40);}}),watch(n,(e=>{e?(null==u||u.register(),(void 0).addEventListener("focusin",p,{once:!0})):(null==u||u.unregister(),(void 0).removeEventListener("focusin",p));}));const h=computed((()=>mergeProps({"aria-haspopup":"menu","aria-expanded":String(n.value),"aria-owns":i.value,onKeydown:g},e.activatorProps)));return zn((()=>{const t=Fi.filterProps(e);return createVNode(Fi,mergeProps({ref:s,id:i.value,class:["v-menu",e.class],style:e.style},t,{modelValue:n.value,"onUpdate:modelValue":e=>n.value=e,absolute:!0,activatorProps:h.value,"onClick:outside":f,onKeydown:m},l),{activator:a.activator,default:function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return createVNode(Bo,{root:"VMenu"},{default:()=>{var e;return [null==(e=a.default)?void 0:e.call(a,...t)]}})}})})),$i({id:i,"ΨopenChildren":c},s)}}),Ri=wn({active:Boolean,disabled:Boolean,max:[Number,String],value:{type:[Number,String],default:0},..._n(),..._r({transition:{component:Kr}})},"VCounter"),Ni=$n()({name:"VCounter",functional:!0,props:Ri(),setup(e,t){let{slots:a}=t;const n=computed((()=>e.max?`${e.value} / ${e.max}`:String(e.value)));return zn((()=>createVNode(Ar,{transition:e.transition},{default:()=>[withDirectives(createVNode("div",{class:["v-counter",{"text-error":e.max&&!e.disabled&&parseFloat(e.value)>parseFloat(e.max)},e.class],style:e.style},[a.default?a.default({counter:n.value,max:e.max,value:e.value}):n.value]),[[vShow,e.active]])]}))),{}}}),ji=wn({text:String,onClick:ca(),..._n(),...jl()},"VLabel"),Hi=$n()({name:"VLabel",props:ji(),setup(e,t){let{slots:a}=t;return zn((()=>{var t;return createVNode("label",{class:["v-label",{"v-label--clickable":!!e.onClick},e.class],style:e.style,onClick:e.onClick},[e.text,null==(t=a.default)?void 0:t.call(a)])})),{}}}),Wi=wn({floating:Boolean,..._n()},"VFieldLabel"),zi=$n()({name:"VFieldLabel",props:Wi(),setup(e,t){let{slots:a}=t;return zn((()=>createVNode(Hi,{class:["v-field-label",{"v-field-label--floating":e.floating},e.class],style:e.style,"aria-hidden":e.floating||void 0},a))),{}}});function Ui(e){const{t:t}=tl();return {InputIcon:function(a){let{name:n}=a;const l={prepend:"prependAction",prependInner:"prependAction",append:"appendAction",appendInner:"appendAction",clear:"clear"}[n],o=e[`onClick:${n}`],r=o&&l?t(`$vuetify.input.${l}`,e.label??""):void 0;return createVNode(To,{icon:e[`${n}Icon`],"aria-label":r,onClick:o},null)}}}const Yi=wn({focused:Boolean,"onUpdate:focused":ca()},"focus");function Ki(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:In();const a=Un(e,"focused");return {focusClasses:computed((()=>({[`${t}--focused`]:a.value}))),isFocused:a,focus:function(){a.value=!0;},blur:function(){a.value=!1;}}}const Gi=["underlined","outlined","filled","solo","solo-inverted","solo-filled","plain"],qi=wn({appendInnerIcon:Fl,bgColor:String,clearable:Boolean,clearIcon:{type:Fl,default:"$clear"},active:Boolean,centerAffix:{type:Boolean,default:void 0},color:String,baseColor:String,dirty:Boolean,disabled:{type:Boolean,default:null},error:Boolean,flat:Boolean,label:String,persistentClear:Boolean,prependInnerIcon:Fl,reverse:Boolean,singleLine:Boolean,variant:{type:String,default:"filled",validator:e=>Gi.includes(e)},"onClick:clear":ca(),"onClick:appendInner":ca(),"onClick:prependInner":ca(),..._n(),...Yo(),...uo(),...jl()},"VField"),Zi=$n()({name:"VField",inheritAttrs:!1,props:{id:String,...Yi(),...qi()},emits:{"update:focused":e=>!0,"update:modelValue":e=>!0},setup(e,t){let{attrs:a,emit:n,slots:l}=t;const{themeClasses:o}=Wl(e),{loaderClasses:r}=Ko(e),{focusClasses:s,isFocused:u,focus:c,blur:v}=Ki(e),{InputIcon:p}=Ui(e),{roundedClasses:f}=co(e),{rtlClasses:m}=al(),g=computed((()=>e.dirty||e.active)),h=computed((()=>!(e.singleLine||!e.label&&!l.label))),b=Bn(),x=computed((()=>e.id||`input-${b}`)),S=computed((()=>`${x.value}-messages`)),C=ref(),w=ref(),_=ref(),I=computed((()=>["plain","underlined"].includes(e.variant))),{backgroundColorClasses:P,backgroundColorStyles:V}=mo(toRef(e,"bgColor")),{textColorClasses:B,textColorStyles:D}=fo(computed((()=>e.error||e.disabled?void 0:g.value&&u.value?e.color:e.baseColor)));watch(g,(e=>{if(h.value){const t=C.value.$el,a=w.value.$el;requestAnimationFrame((()=>{const n=Oa(t),l=a.getBoundingClientRect(),o=l.x-n.x,r=l.y-n.y-(n.height/2-l.height/2),i=l.width/.75,s=Math.abs(i-n.width)>1?{maxWidth:Rt(i)}:void 0,u=getComputedStyle(t),c=getComputedStyle(a),d=1e3*parseFloat(u.transitionDuration)||150,v=parseFloat(c.getPropertyValue("--v-field-label-scale")),p=c.getPropertyValue("color");t.style.visibility="visible",a.style.visibility="hidden",Fa(t,{transform:`translate(${o}px, ${r}px) scale(${v})`,color:p,...s},{duration:d,easing:Rn,direction:e?"normal":"reverse"}).finished.then((()=>{t.style.removeProperty("visibility"),a.style.removeProperty("visibility");}));}));}}),{flush:"post"});const E=computed((()=>({isActive:g,isFocused:u,controlRef:_,blur:v,focus:c})));function T(e){e.target!==(void 0).activeElement&&e.preventDefault();}function $(t){var a;"Enter"!==t.key&&" "!==t.key||(t.preventDefault(),t.stopPropagation(),null==(a=e["onClick:clear"])||a.call(e,new MouseEvent("click")));}return zn((()=>{var t,n,i;const u="outlined"===e.variant,d=!(!l["prepend-inner"]&&!e.prependInnerIcon),y=!(!e.clearable&&!l.clear),b=!!(l["append-inner"]||e.appendInnerIcon||y),k=()=>l.label?l.label({...E.value,label:e.label,props:{for:x.value}}):e.label;return createVNode("div",mergeProps({class:["v-field",{"v-field--active":g.value,"v-field--appended":b,"v-field--center-affix":e.centerAffix??!I.value,"v-field--disabled":e.disabled,"v-field--dirty":e.dirty,"v-field--error":e.error,"v-field--flat":e.flat,"v-field--has-background":!!e.bgColor,"v-field--persistent-clear":e.persistentClear,"v-field--prepended":d,"v-field--reverse":e.reverse,"v-field--single-line":e.singleLine,"v-field--no-label":!k(),[`v-field--variant-${e.variant}`]:!0},o.value,P.value,s.value,r.value,f.value,m.value,e.class],style:[V.value,e.style],onClick:T},a),[createVNode("div",{class:"v-field__overlay"},null),createVNode(Go,{name:"v-field",active:!!e.loading,color:e.error?"error":"string"==typeof e.loading?e.loading:e.color},{default:l.loader}),d&&createVNode("div",{key:"prepend",class:"v-field__prepend-inner"},[e.prependInnerIcon&&createVNode(p,{key:"prepend-icon",name:"prependInner"},null),null==(t=l["prepend-inner"])?void 0:t.call(l,E.value)]),createVNode("div",{class:"v-field__field","data-no-activator":""},[["filled","solo","solo-inverted","solo-filled"].includes(e.variant)&&h.value&&createVNode(zi,{key:"floating-label",ref:w,class:[B.value],floating:!0,for:x.value,style:D.value},{default:()=>[k()]}),createVNode(zi,{ref:C,for:x.value},{default:()=>[k()]}),null==(n=l.default)?void 0:n.call(l,{...E.value,props:{id:x.value,class:"v-field__input","aria-describedby":S.value},focus:c,blur:v})]),y&&createVNode(qr,{key:"clear"},{default:()=>[withDirectives(createVNode("div",{class:"v-field__clearable",onMousedown:e=>{e.preventDefault(),e.stopPropagation();}},[createVNode(Bo,{defaults:{VIcon:{icon:e.clearIcon}}},{default:()=>[l.clear?l.clear({...E.value,props:{onKeydown:$,onFocus:c,onBlur:v,onClick:e["onClick:clear"]}}):createVNode(p,{name:"clear",onKeydown:$,onFocus:c,onBlur:v},null)]})]),[[vShow,e.dirty]])]}),b&&createVNode("div",{key:"append",class:"v-field__append-inner"},[null==(i=l["append-inner"])?void 0:i.call(l,E.value),e.appendInnerIcon&&createVNode(p,{key:"append-icon",name:"appendInner"},null)]),createVNode("div",{class:["v-field__outline",B.value],style:D.value},[u&&createVNode(Fragment,null,[createVNode("div",{class:"v-field__outline__start"},null),h.value&&createVNode("div",{class:"v-field__outline__notch"},[createVNode(zi,{ref:w,floating:!0,for:x.value},{default:()=>[k()]})]),createVNode("div",{class:"v-field__outline__end"},null)]),I.value&&h.value&&createVNode(zi,{ref:w,floating:!0,for:x.value},{default:()=>[k()]})])])})),{controlRef:_}}});const Qi=wn({active:Boolean,color:String,messages:{type:[Array,String],default:()=>[]},..._n(),..._r({transition:{component:Kr,leaveAbsolute:!0,group:!0}})},"VMessages"),Xi=$n()({name:"VMessages",props:Qi(),setup(e,t){let{slots:a}=t;const n=computed((()=>Jt(e.messages))),{textColorClasses:l,textColorStyles:o}=fo(computed((()=>e.color)));return zn((()=>createVNode(Ar,{transition:e.transition,tag:"div",class:["v-messages",l.value,e.class],style:[o.value,e.style],role:"alert","aria-live":"polite"},{default:()=>[e.active&&n.value.map(((e,t)=>createVNode("div",{class:"v-messages__message",key:`${t}-${n.value}`},[a.message?a.message({message:e}):e])))]}))),{}}}),Ji=Symbol.for("vuetify:form");function es(){return inject(Ji,null)}const ts=wn({disabled:{type:Boolean,default:null},error:Boolean,errorMessages:{type:[Array,String],default:()=>[]},maxErrors:{type:[Number,String],default:1},name:String,label:String,readonly:{type:Boolean,default:null},rules:{type:Array,default:()=>[]},modelValue:null,validateOn:String,validationValue:null,...Yi()},"validation");const as=wn({id:String,appendIcon:Fl,centerAffix:{type:Boolean,default:!0},prependIcon:Fl,hideDetails:[Boolean,String],hideSpinButtons:Boolean,hint:String,persistentHint:Boolean,messages:{type:[Array,String],default:()=>[]},direction:{type:String,default:"horizontal",validator:e=>["horizontal","vertical"].includes(e)},"onClick:prepend":ca(),"onClick:append":ca(),..._n(),...oo(),...function(e,t){const a={};return t.forEach((t=>a[t]=e[t])),a}(Ro(),["maxWidth","minWidth","width"]),...jl(),...ts()},"VInput"),ns=$n()({name:"VInput",props:{...as()},emits:{"update:modelValue":e=>!0},setup(e,t){let{attrs:a,slots:n,emit:l}=t;const{densityClasses:o}=ro(e),{dimensionStyles:r}=No(e),{themeClasses:i}=Wl(e),{rtlClasses:s}=al(),{InputIcon:c}=Ui(e),p=Bn(),f=computed((()=>e.id||`input-${p}`)),m=computed((()=>`${f.value}-messages`)),{errorMessages:g,isDirty:h,isDisabled:b,isReadonly:x,isPristine:S,isValid:C,isValidating:w,reset:_,resetValidation:A,validate:I,validationClasses:P}=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:In(),a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:Bn();const n=Un(e,"modelValue"),l=computed((()=>void 0===e.validationValue?n.value:e.validationValue)),o=es(),r=ref([]),i=shallowRef(!0),s=computed((()=>!(!Jt(""===n.value?null:n.value).length&&!Jt(""===l.value?null:l.value).length))),c=computed((()=>!!(e.disabled??(null==o?void 0:o.isDisabled.value)))),p=computed((()=>!!(e.readonly??(null==o?void 0:o.isReadonly.value)))),f=computed((()=>{var t;return (null==(t=e.errorMessages)?void 0:t.length)?Jt(e.errorMessages).concat(r.value).slice(0,Math.max(0,+e.maxErrors)):r.value})),m=computed((()=>{let t=(e.validateOn??(null==o?void 0:o.validateOn.value))||"input";"lazy"===t&&(t="input lazy");const a=new Set((null==t?void 0:t.split(" "))??[]);return {blur:a.has("blur")||a.has("input"),input:a.has("input"),submit:a.has("submit"),lazy:a.has("lazy")}})),g=computed((()=>{var t;return !e.error&&!(null==(t=e.errorMessages)?void 0:t.length)&&(!e.rules.length||(i.value?!r.value.length&&!m.value.lazy||null:!r.value.length))})),h=shallowRef(!1),b=computed((()=>({[`${t}--error`]:!1===g.value,[`${t}--dirty`]:s.value,[`${t}--disabled`]:c.value,[`${t}--readonly`]:p.value})));An("validation");const x=computed((()=>e.name??unref(a)));async function S(){i.value=!0,m.value.lazy?r.value=[]:await C(!0);}async function C(){let t=arguments.length>0&&void 0!==arguments[0]&&arguments[0];const a=[];h.value=!0;for(const n of e.rules){if(a.length>=+(e.maxErrors??1))break;const t="function"==typeof n?n:()=>n,o=await t(l.value);!0!==o&&(!1===o||"string"==typeof o?a.push(o||""):console.warn(`${o} is not a valid value. Rule functions must return boolean true or a string.`));}return r.value=a,h.value=!1,i.value=t,r.value}return Dt((()=>m.value.input),(()=>{watch(l,(()=>{if(null!=l.value)C();else if(e.focused){const t=watch((()=>e.focused),(e=>{e||C(),t();}));}}));})),Dt((()=>m.value.blur),(()=>{watch((()=>e.focused),(e=>{e||C();}));})),watch([g,f],(()=>{null==o||o.update(x.value,g.value,f.value);})),{errorMessages:f,isDirty:s,isDisabled:c,isReadonly:p,isPristine:i,isValid:g,isValidating:h,reset:async function(){n.value=null,await nextTick(),await S();},resetValidation:S,validate:C,validationClasses:b}}(e,"v-input",f),V=computed((()=>({id:f,messagesId:m,isDirty:h,isDisabled:b,isReadonly:x,isPristine:S,isValid:C,isValidating:w,reset:_,resetValidation:A,validate:I}))),B=computed((()=>{var t;return (null==(t=e.errorMessages)?void 0:t.length)||!S.value&&g.value.length?g.value:e.hint&&(e.persistentHint||e.focused)?e.hint:e.messages}));return zn((()=>{var t,a,l,u;const d=!(!n.prepend&&!e.prependIcon),v=!(!n.append&&!e.appendIcon),p=B.value.length>0,f=!e.hideDetails||"auto"===e.hideDetails&&(p||!!n.details);return createVNode("div",{class:["v-input",`v-input--${e.direction}`,{"v-input--center-affix":e.centerAffix,"v-input--hide-spin-buttons":e.hideSpinButtons},o.value,i.value,s.value,P.value,e.class],style:[r.value,e.style]},[d&&createVNode("div",{key:"prepend",class:"v-input__prepend"},[null==(t=n.prepend)?void 0:t.call(n,V.value),e.prependIcon&&createVNode(c,{key:"prepend-icon",name:"prepend"},null)]),n.default&&createVNode("div",{class:"v-input__control"},[null==(a=n.default)?void 0:a.call(n,V.value)]),v&&createVNode("div",{key:"append",class:"v-input__append"},[e.appendIcon&&createVNode(c,{key:"append-icon",name:"append"},null),null==(l=n.append)?void 0:l.call(n,V.value)]),f&&createVNode("div",{class:"v-input__details"},[createVNode(Xi,{id:m.value,active:p,messages:B.value},{message:n.message}),null==(u=n.details)?void 0:u.call(n,V.value)])])})),{reset:_,resetValidation:A,validate:I,isValid:C,errorMessages:g}}});const ls={mounted:function(e,t){},unmounted:function(e,t){var a;const n=null==(a=e._observe)?void 0:a[t.instance.$.uid];n&&(n.observer.unobserve(e),delete e._observe[t.instance.$.uid]);}},os=["color","file","time","date","datetime-local","week","month"],rs=wn({autofocus:Boolean,counter:[Boolean,Number,String],counterValue:[Number,Function],prefix:String,placeholder:String,persistentPlaceholder:Boolean,persistentCounter:Boolean,suffix:String,role:String,type:{type:String,default:"text"},modelModifiers:Object,...as(),...qi()},"VTextField"),is=$n()({name:"VTextField",directives:{Intersect:ls},inheritAttrs:!1,props:rs(),emits:{"click:control":e=>!0,"mousedown:control":e=>!0,"update:focused":e=>!0,"update:modelValue":e=>!0},setup(e,t){let{attrs:a,emit:n,slots:l}=t;const o=Un(e,"modelValue"),{isFocused:r,focus:i,blur:s}=Ki(e),u=computed((()=>"function"==typeof e.counterValue?e.counterValue(o.value):"number"==typeof e.counterValue?e.counterValue:(o.value??"").toString().length)),c=computed((()=>a.maxlength?a.maxlength:!e.counter||"number"!=typeof e.counter&&"string"!=typeof e.counter?void 0:e.counter)),v=computed((()=>["plain","underlined"].includes(e.variant)));function p(t,a){var n,l;e.autofocus&&t&&(null==(l=null==(n=a[0].target)?void 0:n.focus)||l.call(n));}const f=ref(),m=ref(),g=ref(),h=computed((()=>os.includes(e.type)||e.persistentPlaceholder||r.value||e.active));function y(){var e;g.value!==(void 0).activeElement&&(null==(e=g.value)||e.focus()),r.value||i();}function b(e){n("mousedown:control",e),e.target!==g.value&&(y(),e.preventDefault());}function x(e){y(),n("click:control",e);}function S(t){t.stopPropagation(),y(),nextTick((()=>{o.value=null,function(e){for(var t=arguments.length,a=new Array(t>1?t-1:0),n=1;n<t;n++)a[n-1]=arguments[n];if(Array.isArray(e))for(const l of e)l(...a);else "function"==typeof e&&e(...a);}(e["onClick:clear"],t);}));}function C(t){var a;const n=t.target;if(o.value=n.value,(null==(a=e.modelModifiers)?void 0:a.trim)&&["text","search","password","tel","url"].includes(e.type)){const e=[n.selectionStart,n.selectionEnd];nextTick((()=>{n.selectionStart=e[0],n.selectionEnd=e[1];}));}}return zn((()=>{const t=!!(l.counter||!1!==e.counter&&null!=e.counter),n=!(!t&&!l.details),[i,d]=Xt(a),{modelValue:k,...w}=ns.filterProps(e),_=function(e){return Yt(e,Object.keys(Zi.props).filter((e=>!Zt(e)&&"class"!==e&&"style"!==e)))}(e);return createVNode(ns,mergeProps({ref:f,modelValue:o.value,"onUpdate:modelValue":e=>o.value=e,class:["v-text-field",{"v-text-field--prefixed":e.prefix,"v-text-field--suffixed":e.suffix,"v-input--plain-underlined":v.value},e.class],style:e.style},i,w,{centerAffix:!v.value,focused:r.value}),{...l,default:t=>{let{id:a,isDisabled:n,isDirty:i,isReadonly:u,isValid:c}=t;return createVNode(Zi,mergeProps({ref:m,onMousedown:b,onClick:x,"onClick:clear":S,"onClick:prependInner":e["onClick:prependInner"],"onClick:appendInner":e["onClick:appendInner"],role:e.role},_,{id:a.value,active:h.value||i.value,dirty:i.value||e.dirty,disabled:n.value,focused:r.value,error:!1===c.value}),{...l,default:t=>{let{props:{class:a,...r}}=t;const i=withDirectives(createVNode("input",mergeProps({ref:g,value:o.value,onInput:C,autofocus:e.autofocus,readonly:u.value,disabled:n.value,name:e.name,placeholder:e.placeholder,size:1,type:e.type,onFocus:y,onBlur:s},r,d),null),[[resolveDirective("intersect"),{handler:p},null,{once:!0}]]);return createVNode(Fragment,null,[e.prefix&&createVNode("span",{class:"v-text-field__prefix"},[createVNode("span",{class:"v-text-field__prefix__text"},[e.prefix])]),l.default?createVNode("div",{class:a,"data-no-activator":""},[l.default(),i]):cloneVNode(i,{class:a}),e.suffix&&createVNode("span",{class:"v-text-field__suffix"},[createVNode("span",{class:"v-text-field__suffix__text"},[e.suffix])])])}})},details:n?a=>{var n;return createVNode(Fragment,null,[null==(n=l.details)?void 0:n.call(l,a),t&&createVNode(Fragment,null,[createVNode("span",null,null),createVNode(Ni,{active:e.persistentCounter||r.value,value:u.value,max:c.value,disabled:e.disabled},l.counter)])])}:void 0})})),$i({},f,m,g)}}),ss=wn({hideActions:Boolean,...Yi(),...kr(),...rs({placeholder:"mm/dd/yyyy",prependIcon:"$calendar"}),...Gt(ti({weeksInMonth:"dynamic",hideHeader:!0}),["active"])},"VDateInput"),us=$n()({name:"VDateInput",props:ss(),emits:{"update:modelValue":e=>!0},setup(e,t){let{slots:a}=t;const{t:n}=tl(),l=gl(),{isFocused:o,focus:r,blur:i}=Ki(e),s=Un(e,"modelValue",e.multiple?[]:null),u=shallowRef(!1),c=computed((()=>{const t=Jt(s.value);if(!t.length)return null;if(!0===e.multiple)return n("$vuetify.datePicker.itemsSelected",t.length);if("range"===e.multiple){const e=t[0],a=t[t.length-1];return l.isValid(e)&&l.isValid(a)?`${l.format(e,"keyboardDate")} - ${l.format(a,"keyboardDate")}`:""}return l.isValid(s.value)?l.format(s.value,"keyboardDate"):""}));function d(e){if("Enter"!==e.key)return;if(!u.value||!o.value)return void(u.value=!0);const t=e.target;s.value=l.date(t.value);}function p(e){e.preventDefault(),e.stopPropagation(),u.value=!0;}function f(){u.value=!1;}zn((()=>{const t=xr.filterProps(e),n=ai.filterProps(Gt(e,["active"])),l=is.filterProps(e);return createVNode(is,mergeProps(l,{modelValue:c.value,onKeydown:d,focused:u.value||o.value,onFocus:r,onBlur:i,"onClick:control":p,"onClick:prepend":p}),{default:()=>{var l;return [createVNode(Li,{modelValue:u.value,"onUpdate:modelValue":e=>u.value=e,activator:"parent","min-width":"0",closeOnContentClick:!1,openOnClick:!1},{default:()=>[createVNode(xr,mergeProps(t,{modelValue:s.value,"onUpdate:modelValue":e=>s.value=e,onSave:f}),{default:t=>{let{actions:a,model:l}=t;return createVNode(ai,mergeProps(n,{modelValue:e.hideActions?s.value:l.value,"onUpdate:modelValue":t=>{e.hideActions?(s.value=t,e.multiple||(u.value=!1)):l.value=t;},onMousedown:e=>e.preventDefault()}),{actions:e.hideActions?void 0:()=>a})}})]}),null==(l=a.default)?void 0:l.call(a)]}})}));}}),cs={badge:"Distintivo",open:"Abrir",close:"Fechar",dismiss:"Dismiss",confirmEdit:{ok:"OK",cancel:"Cancel"},dataIterator:{noResultsText:"Nenhum dado encontrado",loadingText:"Carregando itens..."},dataTable:{itemsPerPageText:"Linhas por página:",ariaLabel:{sortDescending:"Ordenado decrescente.",sortAscending:"Ordenado crescente.",sortNone:"Não ordenado.",activateNone:"Ative para remover a ordenação.",activateDescending:"Ative para ordenar decrescente.",activateAscending:"Ative para ordenar crescente."},sortBy:"Ordenar por"},dataFooter:{itemsPerPageText:"Itens por página:",itemsPerPageAll:"Todos",nextPage:"Próxima página",prevPage:"Página anterior",firstPage:"Primeira página",lastPage:"Última página",pageText:"{0}-{1} de {2}"},dateRangeInput:{divider:"to"},datePicker:{itemsSelected:"{0} selecionados",range:{title:"Selecione as datas",header:"Digite as datas"},title:"Selecione a data",header:"Digite a data",input:{placeholder:"Insira a data"}},noDataText:"Não há dados disponíveis",carousel:{prev:"Visão anterior",next:"Próxima visão",ariaLabel:{delimiter:"Slide {0} de {1} do carrossel"}},calendar:{moreEvents:"Mais {0}",today:"Today"},input:{clear:"Limpar {0}",prependAction:"{0} prepended action",appendAction:"{0} appended action",otp:"Por favor insira o caracter OTP {0}"},fileInput:{counter:"{0} arquivo(s)",counterSize:"{0} arquivo(s) ({1} no total)"},timePicker:{am:"AM",pm:"PM",title:"Select Time"},pagination:{ariaLabel:{root:"Navegação de paginação",next:"Próxima página",previous:"Página anterior",page:"Ir à página {0}",currentPage:"Página atual, página {0}",first:"Primeira página",last:"Última página"}},stepper:{next:"Próximo",prev:"Anterior"},rating:{ariaLabel:{item:"Avaliação {0} de {1}"}},loading:"Carregando...",infiniteScroll:{loadMore:"Carregar mais",empty:"Não há mais dados"}},ds=wn({..._n(),...ql({fullHeight:!0}),...jl()},"VApp"),vs=$n()({name:"VApp",props:ds(),setup(e,t){let{slots:a}=t;const n=Wl(e),{layoutClasses:l,getLayoutItem:o,items:r,layoutRef:i}=Jl(e),{rtlClasses:s}=al();return zn((()=>createVNode("div",{ref:i,class:["v-application",n.themeClasses.value,l.value,s.value,e.class],style:[e.style]},[createVNode("div",{class:"v-application__wrap"},[createVNode(Suspense,null,{default:()=>{var e;return [createVNode(Fragment,null,[null==(e=a.default)?void 0:e.call(a)])]}})])]))),{getLayoutItem:o,items:r,theme:n}}});const ps=wn({aspectRatio:[String,Number],contentClass:null,inline:Boolean,..._n(),...Ro()},"VResponsive"),fs=$n()({name:"VResponsive",props:ps(),setup(e,t){let{slots:a}=t;const{aspectStyles:n}=function(e){return {aspectStyles:computed((()=>{const t=Number(e.aspectRatio);return t?{paddingBottom:String(1/t*100)+"%"}:void 0}))}}(e),{dimensionStyles:l}=No(e);return zn((()=>{var t;return createVNode("div",{class:["v-responsive",{"v-responsive--inline":e.inline},e.class],style:[l.value,e.style]},[createVNode("div",{class:"v-responsive__sizer",style:n.value},null),null==(t=a.additional)?void 0:t.call(a),a.default&&createVNode("div",{class:["v-responsive__content",e.contentClass]},[a.default()])])})),{}}}),ms=wn({alt:String,cover:Boolean,color:String,draggable:{type:[Boolean,String],default:void 0},eager:Boolean,gradient:String,lazySrc:String,options:{type:Object,default:()=>({root:void 0,rootMargin:void 0,threshold:void 0})},sizes:String,src:{type:[String,Object],default:""},crossorigin:String,referrerpolicy:String,srcset:String,position:String,...ps(),..._n(),...uo(),..._r()},"VImg"),gs=$n()({name:"VImg",directives:{intersect:ls},props:ms(),emits:{loadstart:e=>!0,load:e=>!0,error:e=>!0},setup(e,t){let{emit:a,slots:n}=t;const{backgroundColorClasses:l,backgroundColorStyles:o}=mo(toRef(e,"color")),{roundedClasses:r}=co(e),s=An("VImg"),u=shallowRef(""),c=ref(),p=shallowRef(e.eager?"loading":"idle"),f=shallowRef(),m=shallowRef(),g=computed((()=>e.src&&"object"==typeof e.src?{src:e.src.src,srcset:e.srcset||e.src.srcset,lazySrc:e.lazySrc||e.src.lazySrc,aspect:Number(e.aspectRatio||e.src.aspect||0)}:{src:e.src,srcset:e.srcset,lazySrc:e.lazySrc,aspect:Number(e.aspectRatio||0)})),h=computed((()=>g.value.aspect||f.value/m.value||0));function b(t){if(!e.eager||!t){if(p.value="loading",g.value.lazySrc){const e=new Image;e.src=g.value.lazySrc,_(e,null);}g.value.src&&nextTick((()=>{var e;a("loadstart",(null==(e=c.value)?void 0:e.currentSrc)||g.value.src),setTimeout((()=>{var e;if(!s.isUnmounted)if(null==(e=c.value)?void 0:e.complete){if(c.value.naturalWidth||S(),"error"===p.value)return;h.value||_(c.value,null),"loading"===p.value&&x();}else h.value||_(c.value),C();}));}));}}function x(){var e;s.isUnmounted||(C(),_(c.value),p.value="loaded",a("load",(null==(e=c.value)?void 0:e.currentSrc)||g.value.src));}function S(){var e;s.isUnmounted||(p.value="error",a("error",(null==(e=c.value)?void 0:e.currentSrc)||g.value.src));}function C(){const e=c.value;e&&(u.value=e.currentSrc||e.src);}watch((()=>e.src),(()=>{b("idle"!==p.value);})),watch(h,((e,t)=>{!e&&t&&c.value&&_(c.value);}));let w=-1;function _(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:100;const a=()=>{if(clearTimeout(w),s.isUnmounted)return;const{naturalHeight:n,naturalWidth:l}=e;n||l?(f.value=l,m.value=n):e.complete||"loading"!==p.value||null==t?(e.currentSrc.endsWith(".svg")||e.currentSrc.startsWith("data:image/svg+xml"))&&(f.value=1,m.value=1):w=(void 0).setTimeout(a,t);};a();}const I=computed((()=>({"v-img__img--cover":e.cover,"v-img__img--contain":!e.cover}))),P=()=>{var t;if(!g.value.src||"idle"===p.value)return null;const a=createVNode("img",{class:["v-img__img",I.value],style:{objectPosition:e.position},src:g.value.src,srcset:g.value.srcset,alt:e.alt,crossorigin:e.crossorigin,referrerpolicy:e.referrerpolicy,draggable:e.draggable,sizes:e.sizes,ref:c,onLoad:x,onError:S},null),l=null==(t=n.sources)?void 0:t.call(n);return createVNode(Ar,{transition:e.transition,appear:!0},{default:()=>[withDirectives(l?createVNode("picture",{class:"v-img__picture"},[l,a]):a,[[vShow,"loaded"===p.value]])]})},V=()=>createVNode(Ar,{transition:e.transition},{default:()=>[g.value.lazySrc&&"loaded"!==p.value&&createVNode("img",{class:["v-img__img","v-img__img--preload",I.value],style:{objectPosition:e.position},src:g.value.lazySrc,alt:e.alt,crossorigin:e.crossorigin,referrerpolicy:e.referrerpolicy,draggable:e.draggable},null)]}),B=()=>n.placeholder?createVNode(Ar,{transition:e.transition,appear:!0},{default:()=>[("loading"===p.value||"error"===p.value&&!n.error)&&createVNode("div",{class:"v-img__placeholder"},[n.placeholder()])]}):null,D=()=>n.error?createVNode(Ar,{transition:e.transition,appear:!0},{default:()=>["error"===p.value&&createVNode("div",{class:"v-img__error"},[n.error()])]}):null,T=()=>e.gradient?createVNode("div",{class:"v-img__gradient",style:{backgroundImage:`linear-gradient(${e.gradient})`}},null):null,$=shallowRef(!1);{const e=watch(h,(t=>{t&&(requestAnimationFrame((()=>{requestAnimationFrame((()=>{$.value=!0;}));})),e());}));}return zn((()=>{const t=fs.filterProps(e);return withDirectives(createVNode(fs,mergeProps({class:["v-img",{"v-img--booting":!$.value},l.value,r.value,e.class],style:[{width:Rt("auto"===e.width?f.value:e.width)},o.value,e.style]},t,{aspectRatio:h.value,"aria-label":e.alt,role:e.alt?"img":void 0}),{additional:()=>createVNode(Fragment,null,[createVNode(P,null,null),createVNode(V,null,null),createVNode(T,null,null),createVNode(B,null,null),createVNode(D,null,null)]),default:n.default}),[[resolveDirective("intersect"),{handler:b,options:e.options},null,{once:!0}]])})),{currentSrc:u,image:c,state:p,naturalWidth:f,naturalHeight:m}}});function hs(){const e=shallowRef(!1);return {ssrBootStyles:computed((()=>e.value?void 0:{transition:"none !important"})),isBooted:readonly(e)}}const ys=wn({start:Boolean,end:Boolean,icon:Fl,image:String,text:String,..._n(),...oo(),...uo(),...Oo(),...vo(),...jl(),...yo({variant:"flat"})},"VAvatar"),bs=$n()({name:"VAvatar",props:ys(),setup(e,t){let{slots:a}=t;const{themeClasses:n}=Wl(e),{colorClasses:l,colorStyles:o,variantClasses:r}=bo(e),{densityClasses:i}=ro(e),{roundedClasses:s}=co(e),{sizeClasses:u,sizeStyles:c}=Fo(e);return zn((()=>createVNode(e.tag,{class:["v-avatar",{"v-avatar--start":e.start,"v-avatar--end":e.end},n.value,l.value,i.value,s.value,u.value,r.value,e.class],style:[o.value,c.value,e.style]},{default:()=>[a.default?createVNode(Bo,{key:"content-defaults",defaults:{VImg:{cover:!0,image:e.image},VIcon:{icon:e.icon}}},{default:()=>[a.default()]}):e.image?createVNode(gs,{key:"image",src:e.image,alt:"",cover:!0},null):e.icon?createVNode(To,{key:"icon",icon:e.icon},null):e.text,ho(!1,"v-avatar")]}))),{}}}),ks=Symbol.for("vuetify:selection-control-group"),xs=wn({color:String,disabled:{type:Boolean,default:null},defaultsTarget:String,error:Boolean,id:String,inline:Boolean,falseIcon:Fl,trueIcon:Fl,ripple:{type:[Boolean,Object],default:!0},multiple:{type:Boolean,default:null},name:String,readonly:{type:Boolean,default:null},modelValue:null,type:String,valueComparator:{type:Function,default:Tt},..._n(),...oo(),...jl()},"SelectionControlGroup"),Ss=wn({...xs({defaultsTarget:"VSelectionControl"})},"VSelectionControlGroup");$n()({name:"VSelectionControlGroup",props:Ss(),emits:{"update:modelValue":e=>!0},setup(e,t){let{slots:a}=t;const n=Un(e,"modelValue"),l=Bn(),o=computed((()=>e.id||`v-selection-control-group-${l}`)),r=computed((()=>e.name||o.value)),s=new Set;return provide(ks,{modelValue:n,forceUpdate:()=>{s.forEach((e=>e()));},onForceUpdate:e=>{s.add(e),onScopeDispose((()=>{s.delete(e);}));}}),Fn({[e.defaultsTarget]:{color:toRef(e,"color"),disabled:toRef(e,"disabled"),density:toRef(e,"density"),error:toRef(e,"error"),inline:toRef(e,"inline"),modelValue:n,multiple:computed((()=>!!e.multiple||null==e.multiple&&Array.isArray(n.value))),name:r,falseIcon:toRef(e,"falseIcon"),trueIcon:toRef(e,"trueIcon"),readonly:toRef(e,"readonly"),ripple:toRef(e,"ripple"),type:toRef(e,"type"),valueComparator:toRef(e,"valueComparator")}}),zn((()=>{var t;return createVNode("div",{class:["v-selection-control-group",{"v-selection-control-group--inline":e.inline},e.class],style:e.style,role:"radio"===e.type?"radiogroup":void 0},[null==(t=a.default)?void 0:t.call(a)])})),{}}});const Cs=wn({label:String,baseColor:String,trueValue:null,falseValue:null,value:null,..._n(),...xs()},"VSelectionControl");const ws=$n()({name:"VSelectionControl",directives:{Ripple:hr},inheritAttrs:!1,props:Cs(),emits:{"update:modelValue":e=>!0},setup(e,t){let{attrs:a,slots:n}=t;const{group:l,densityClasses:o,icon:i,model:s,textColorClasses:u,textColorStyles:c,backgroundColorClasses:p,backgroundColorStyles:f,trueValue:m}=function(e){const t=inject(ks,void 0),{densityClasses:a}=ro(e),n=Un(e,"modelValue"),l=computed((()=>void 0!==e.trueValue?e.trueValue:void 0===e.value||e.value)),o=computed((()=>void 0!==e.falseValue&&e.falseValue)),i=computed((()=>!!e.multiple||null==e.multiple&&Array.isArray(n.value))),s=computed({get(){const a=t?t.modelValue.value:n.value;return i.value?Jt(a).some((t=>e.valueComparator(t,l.value))):e.valueComparator(a,l.value)},set(a){if(e.readonly)return;const r=a?l.value:o.value;let s=r;i.value&&(s=a?[...Jt(n.value),r]:Jt(n.value).filter((t=>!e.valueComparator(t,l.value)))),t?t.modelValue.value=s:n.value=s;}}),{textColorClasses:u,textColorStyles:c}=fo(computed((()=>{if(!e.error&&!e.disabled)return s.value?e.color:e.baseColor}))),{backgroundColorClasses:d,backgroundColorStyles:v}=mo(computed((()=>!s.value||e.error||e.disabled?e.baseColor:e.color))),p=computed((()=>s.value?e.trueIcon:e.falseIcon));return {group:t,densityClasses:a,trueValue:l,falseValue:o,model:s,textColorClasses:u,textColorStyles:c,backgroundColorClasses:d,backgroundColorStyles:v,icon:p}}(e),g=Bn(),h=shallowRef(!1),y=shallowRef(!1),b=ref(),x=computed((()=>e.id||`input-${g}`)),S=computed((()=>!e.disabled&&!e.readonly));function C(e){S.value&&(h.value=!0,!1!==(e.target,null)&&(y.value=!0));}function w(){h.value=!1,y.value=!1;}function _(e){e.stopPropagation();}function I(t){S.value?(e.readonly&&l&&nextTick((()=>l.forceUpdate())),s.value=t.target.checked):b.value&&(b.value.checked=s.value);}return null==l||l.onForceUpdate((()=>{b.value&&(b.value.checked=s.value);})),zn((()=>{var t,l;const r=n.label?n.label({label:e.label,props:{for:x.value}}):e.label,[d,v]=Xt(a),g=createVNode("input",mergeProps({ref:b,checked:s.value,disabled:!!e.disabled,id:x.value,onBlur:w,onFocus:C,onInput:I,"aria-disabled":!!e.disabled,"aria-label":e.label,type:e.type,value:m.value,name:e.name,"aria-checked":"checkbox"===e.type?s.value:void 0},v),null);return createVNode("div",mergeProps({class:["v-selection-control",{"v-selection-control--dirty":s.value,"v-selection-control--disabled":e.disabled,"v-selection-control--error":e.error,"v-selection-control--focused":h.value,"v-selection-control--focus-visible":y.value,"v-selection-control--inline":e.inline},o.value,e.class]},d,{style:e.style}),[createVNode("div",{class:["v-selection-control__wrapper",u.value],style:c.value},[null==(t=n.default)?void 0:t.call(n,{backgroundColorClasses:p,backgroundColorStyles:f}),withDirectives(createVNode("div",{class:["v-selection-control__input"]},[(null==(l=n.input)?void 0:l.call(n,{model:s,textColorClasses:u,textColorStyles:c,backgroundColorClasses:p,backgroundColorStyles:f,inputNode:g,icon:i.value,props:{onFocus:C,onBlur:w,id:x.value}}))??createVNode(Fragment,null,[i.value&&createVNode(To,{key:"icon",icon:i.value},null),g])]),[[resolveDirective("ripple"),e.ripple&&[!e.disabled&&!e.readonly,null,["center","circle"]]]])]),r&&createVNode(Hi,{for:x.value,onClick:_},{default:()=>[r]})])})),{isFocused:h,input:b}}}),_s=wn({indeterminate:Boolean,indeterminateIcon:{type:Fl,default:"$checkboxIndeterminate"},...Cs({falseIcon:"$checkboxOff",trueIcon:"$checkboxOn"})},"VCheckboxBtn"),As=$n()({name:"VCheckboxBtn",props:_s(),emits:{"update:modelValue":e=>!0,"update:indeterminate":e=>!0},setup(e,t){let{slots:a}=t;const n=Un(e,"indeterminate"),l=Un(e,"modelValue");function o(e){n.value&&(n.value=!1);}const r=computed((()=>n.value?e.indeterminateIcon:e.falseIcon)),i=computed((()=>n.value?e.indeterminateIcon:e.trueIcon));return zn((()=>{const t=Gt(ws.filterProps(e),["modelValue"]);return createVNode(ws,mergeProps(t,{modelValue:l.value,"onUpdate:modelValue":[e=>l.value=e,o],class:["v-checkbox-btn",e.class],style:e.style,type:"checkbox",falseIcon:r.value,trueIcon:i.value,"aria-checked":n.value?"mixed":void 0}),a)})),{}}});function Is(e,t){return (null==t?void 0:t[e?"offsetWidth":"offsetHeight"])||0}const Ps=Symbol.for("vuetify:v-slide-group"),Vs=wn({centerActive:Boolean,direction:{type:String,default:"horizontal"},symbol:{type:null,default:Ps},nextIcon:{type:Fl,default:"$next"},prevIcon:{type:Fl,default:"$prev"},showArrows:{type:[Boolean,String],validator:e=>"boolean"==typeof e||["always","desktop","mobile"].includes(e)},..._n(),..._l({mobile:null}),...vo(),...So({selectedClass:"v-slide-group-item--active"})},"VSlideGroup"),Bs=$n()({name:"VSlideGroup",props:Vs(),emits:{"update:modelValue":e=>!0},setup(e,t){let{slots:a}=t;const{isRtl:n}=al(),{displayClasses:l,mobile:o}=Al(e),i=_o(e,e.symbol),s=shallowRef(!1),u=shallowRef(0),c=shallowRef(0);shallowRef(0);const d=computed((()=>"horizontal"===e.direction)),{resizeRef:p,contentRect:f}=Yl(),{resizeRef:m,contentRect:g}=Yl();!function(){const t=inject(Il),{isRtl:a}=al();if(!t)throw new Error("[Vuetify] Could not find injected goto instance");({...t,rtl:computed((()=>t.rtl.value||a.value))});}(),computed((()=>({container:p.el,duration:200,easing:"easeOutQuart"}))),computed((()=>i.selected.value.length?i.items.value.findIndex((e=>e.id===i.selected.value[0])):-1)),computed((()=>i.selected.value.length?i.items.value.findIndex((e=>e.id===i.selected.value[i.selected.value.length-1])):-1));const h=shallowRef(!1);function y(e,t){!function(e){let{selectedElement:t,containerElement:a,isRtl:n,isHorizontal:l}=e;Is(l,a);(function(e,t,a){if(!a)return 0;const{scrollLeft:n,offsetWidth:l,scrollWidth:o}=a;return e?t?o-l+n:n:a.scrollTop})(l,n,a);Is(l,t);(function(e,t){return (null==t?void 0:t[e?"offsetLeft":"offsetTop"])||0})(l,t);}({containerElement:p.el,isHorizontal:d.value,isRtl:n.value,selectedElement:e});}function b(e){const{scrollTop:t,scrollLeft:a}=e.target;u.value=d.value?a:t;}function x(e){if(h.value=!0,s.value&&m.el)for(const t of e.composedPath())for(const e of m.el.children)if(e===t)return void y(e)}function S(e){h.value=!1;}let C=!1;function w(e){var t;C||h.value||e.relatedTarget&&(null==(t=m.el)?void 0:t.contains(e.relatedTarget))||I(),C=!1;}function _(){C=!0;}function A(e){function t(t){e.preventDefault(),I(t);}m.el&&(d.value?"ArrowRight"===e.key?t(n.value?"prev":"next"):"ArrowLeft"===e.key&&t(n.value?"next":"prev"):"ArrowDown"===e.key?t("next"):"ArrowUp"===e.key&&t("prev"),"Home"===e.key?t("first"):"End"===e.key&&t("last"));}function I(e){var t,a;if(!m.el)return;let n;if(e)if("next"===e){if(n=null==(t=m.el.querySelector(":focus"))?void 0:t.nextElementSibling,!n)return I("first")}else if("prev"===e){if(n=null==(a=m.el.querySelector(":focus"))?void 0:a.previousElementSibling,!n)return I("last")}else "first"===e?n=m.el.firstElementChild:"last"===e&&(n=m.el.lastElementChild);else {n=va(m.el)[0];}n&&n.focus({preventScroll:!0});}function P(e){d.value&&n.value?-1:1;c.value;u.value,d.value&&n.value&&p.el&&p.el;}const V=computed((()=>({next:i.next,prev:i.prev,select:i.select,isSelected:i.isSelected}))),B=computed((()=>{switch(e.showArrows){case"always":return !0;case"desktop":return !o.value;case!0:return s.value||Math.abs(u.value)>0;case"mobile":return o.value||s.value||Math.abs(u.value)>0;default:return !o.value&&(s.value||Math.abs(u.value)>0)}})),D=computed((()=>Math.abs(u.value)>1)),F=computed((()=>{if(!p.value)return !1;const e=function(e,t){return (null==t?void 0:t[e?"scrollWidth":"scrollHeight"])||0}(d.value,p.el),t=function(e,t){return (null==t?void 0:t[e?"clientWidth":"clientHeight"])||0}(d.value,p.el);return e-t-Math.abs(u.value)>1}));return zn((()=>createVNode(e.tag,{class:["v-slide-group",{"v-slide-group--vertical":!d.value,"v-slide-group--has-affixes":B.value,"v-slide-group--is-overflowing":s.value},l.value,e.class],style:e.style,tabindex:h.value||i.selected.value.length?-1:0,onFocus:w},{default:()=>{var t,l,o;return [B.value&&createVNode("div",{key:"prev",class:["v-slide-group__prev",{"v-slide-group__prev--disabled":!D.value}],onMousedown:_,onClick:()=>D.value&&P()},[(null==(t=a.prev)?void 0:t.call(a,V.value))??createVNode(Ur,null,{default:()=>[createVNode(To,{icon:n.value?e.nextIcon:e.prevIcon},null)]})]),createVNode("div",{key:"container",ref:p,class:"v-slide-group__container",onScroll:b},[createVNode("div",{ref:m,class:"v-slide-group__content",onFocusin:x,onFocusout:S,onKeydown:A},[null==(l=a.default)?void 0:l.call(a,V.value)])]),B.value&&createVNode("div",{key:"next",class:["v-slide-group__next",{"v-slide-group__next--disabled":!F.value}],onMousedown:_,onClick:()=>F.value&&P()},[(null==(o=a.next)?void 0:o.call(a,V.value))??createVNode(Ur,null,{default:()=>[createVNode(To,{icon:n.value?e.prevIcon:e.nextIcon},null)]})])]}}))),{selected:i.selected,scrollTo:P,scrollOffset:u,focus:I}}}),Ds=Symbol.for("vuetify:v-chip-group"),Os=wn({column:Boolean,filter:Boolean,valueComparator:{type:Function,default:Tt},...Vs(),..._n(),...So({selectedClass:"v-chip--selected"}),...vo(),...jl(),...yo({variant:"tonal"})},"VChipGroup");$n()({name:"VChipGroup",props:Os(),emits:{"update:modelValue":e=>!0},setup(e,t){let{slots:a}=t;const{themeClasses:n}=Wl(e),{isSelected:l,select:o,next:r,prev:s,selected:u}=_o(e,Ds);return Fn({VChip:{color:toRef(e,"color"),disabled:toRef(e,"disabled"),filter:toRef(e,"filter"),variant:toRef(e,"variant")}}),zn((()=>{const t=Bs.filterProps(e);return createVNode(Bs,mergeProps(t,{class:["v-chip-group",{"v-chip-group--column":e.column},n.value,e.class],style:e.style}),{default:()=>{var e;return [null==(e=a.default)?void 0:e.call(a,{isSelected:l,select:o,next:r,prev:s,selected:u.value})]}})})),{}}});const Fs=wn({activeClass:String,appendAvatar:String,appendIcon:Fl,closable:Boolean,closeIcon:{type:Fl,default:"$delete"},closeLabel:{type:String,default:"$vuetify.close"},draggable:Boolean,filter:Boolean,filterIcon:{type:String,default:"$complete"},label:Boolean,link:{type:Boolean,default:void 0},pill:Boolean,prependAvatar:String,prependIcon:Fl,ripple:{type:[Boolean,Object],default:!0},text:String,modelValue:{type:Boolean,default:!0},onClick:ca(),onClickOnce:ca(),...ao(),..._n(),...oo(),...io(),...Co(),...uo(),...Jo(),...Oo(),...vo({tag:"span"}),...jl(),...yo({variant:"tonal"})},"VChip"),Es=$n()({name:"VChip",directives:{Ripple:hr},props:Fs(),emits:{"click:close":e=>!0,"update:modelValue":e=>!0,"group:selected":e=>!0,click:e=>!0},setup(e,t){let{attrs:a,emit:n,slots:l}=t;const{t:o}=tl(),{borderClasses:r}=no(e),{colorClasses:i,colorStyles:s,variantClasses:u}=bo(e),{densityClasses:c}=ro(e),{elevationClasses:d}=so(e),{roundedClasses:v}=co(e),{sizeClasses:p}=Fo(e),{themeClasses:f}=Wl(e),m=Un(e,"modelValue"),g=wo(e,Ds,!1),h=Xo(e,a),y=computed((()=>!1!==e.link&&h.isLink.value)),b=computed((()=>!e.disabled&&!1!==e.link&&(!!g||e.link||h.isClickable.value))),x=computed((()=>({"aria-label":o(e.closeLabel),onClick(e){e.preventDefault(),e.stopPropagation(),m.value=!1,n("click:close",e);}})));function S(e){var t;n("click",e),b.value&&(null==(t=h.navigate)||t.call(h,e),null==g||g.toggle());}function C(e){"Enter"!==e.key&&" "!==e.key||(e.preventDefault(),S(e));}return ()=>{const t=h.isLink.value?"a":e.tag,a=!(!e.appendIcon&&!e.appendAvatar),n=!(!a&&!l.append),o=!(!l.close&&!e.closable),k=!(!l.filter&&!e.filter)&&g,w=!(!e.prependIcon&&!e.prependAvatar),_=!(!w&&!l.prepend),I=!g||g.isSelected.value;return m.value&&withDirectives(createVNode(t,{class:["v-chip",{"v-chip--disabled":e.disabled,"v-chip--label":e.label,"v-chip--link":b.value,"v-chip--filter":k,"v-chip--pill":e.pill},f.value,r.value,I?i.value:void 0,c.value,d.value,v.value,p.value,u.value,null==g?void 0:g.selectedClass.value,e.class],style:[I?s.value:void 0,e.style],disabled:e.disabled||void 0,draggable:e.draggable,href:h.href.value,tabindex:b.value?0:void 0,onClick:S,onKeydown:b.value&&!y.value&&C},{default:()=>{var t;return [ho(b.value,"v-chip"),k&&createVNode(qr,{key:"filter"},{default:()=>[withDirectives(createVNode("div",{class:"v-chip__filter"},[l.filter?createVNode(Bo,{key:"filter-defaults",disabled:!e.filterIcon,defaults:{VIcon:{icon:e.filterIcon}}},l.filter):createVNode(To,{key:"filter-icon",icon:e.filterIcon},null)]),[[vShow,g.isSelected.value]])]}),_&&createVNode("div",{key:"prepend",class:"v-chip__prepend"},[l.prepend?createVNode(Bo,{key:"prepend-defaults",disabled:!w,defaults:{VAvatar:{image:e.prependAvatar,start:!0},VIcon:{icon:e.prependIcon,start:!0}}},l.prepend):createVNode(Fragment,null,[e.prependIcon&&createVNode(To,{key:"prepend-icon",icon:e.prependIcon,start:!0},null),e.prependAvatar&&createVNode(bs,{key:"prepend-avatar",image:e.prependAvatar,start:!0},null)])]),createVNode("div",{class:"v-chip__content","data-no-activator":""},[(null==(t=l.default)?void 0:t.call(l,{isSelected:null==g?void 0:g.isSelected.value,selectedClass:null==g?void 0:g.selectedClass.value,select:null==g?void 0:g.select,toggle:null==g?void 0:g.toggle,value:null==g?void 0:g.value.value,disabled:e.disabled}))??e.text]),n&&createVNode("div",{key:"append",class:"v-chip__append"},[l.append?createVNode(Bo,{key:"append-defaults",disabled:!a,defaults:{VAvatar:{end:!0,image:e.appendAvatar},VIcon:{end:!0,icon:e.appendIcon}}},l.append):createVNode(Fragment,null,[e.appendIcon&&createVNode(To,{key:"append-icon",end:!0,icon:e.appendIcon},null),e.appendAvatar&&createVNode(bs,{key:"append-avatar",end:!0,image:e.appendAvatar},null)])]),o&&createVNode("button",mergeProps({key:"close",class:"v-chip__close",type:"button"},x.value),[l.close?createVNode(Bo,{key:"close-defaults",defaults:{VIcon:{icon:e.closeIcon,size:"x-small"}}},l.close):createVNode(To,{key:"close-icon",icon:e.closeIcon,size:"x-small"},null)])]}}),[[resolveDirective("ripple"),b.value&&e.ripple,null]])}}}),Ts=Symbol.for("vuetify:list");function $s(){const e=inject(Ts,{hasPrepend:shallowRef(!1),updateHasPrepend:()=>null}),t={hasPrepend:shallowRef(!1),updateHasPrepend:e=>{e&&(t.hasPrepend.value=e);}};return provide(Ts,t),e}function Ms(){return inject(Ts,null)}const Ls=e=>{const t={activate:t=>{let{id:a,value:n,activated:l}=t;return a=toRaw(a),e&&!n&&1===l.size&&l.has(a)||(n?l.add(a):l.delete(a)),l},in:(e,a,n)=>{let l=new Set;if(null!=e)for(const o of Jt(e))l=t.activate({id:o,value:!0,activated:new Set(l),children:a,parents:n});return l},out:e=>Array.from(e)};return t},Rs=e=>{const t=Ls(e);return {activate:e=>{let{activated:a,id:n,...l}=e;n=toRaw(n);const o=a.has(n)?new Set([n]):new Set;return t.activate({...l,id:n,activated:o})},in:(e,a,n)=>{let l=new Set;if(null!=e){const o=Jt(e);o.length&&(l=t.in(o.slice(0,1),a,n));}return l},out:(e,a,n)=>t.out(e,a,n)}},Ns={open:e=>{let{id:t,value:a,opened:n,parents:l}=e;if(a){const e=new Set;e.add(t);let a=l.get(t);for(;null!=a;)e.add(a),a=l.get(a);return e}return n.delete(t),n},select:()=>null},js={open:e=>{let{id:t,value:a,opened:n,parents:l}=e;if(a){let e=l.get(t);for(n.add(t);null!=e&&e!==t;)n.add(e),e=l.get(e);return n}return n.delete(t),n},select:()=>null},Hs={open:js.open,select:e=>{let{id:t,value:a,opened:n,parents:l}=e;if(!a)return n;const o=[];let r=l.get(t);for(;null!=r;)o.push(r),r=l.get(r);return new Set(o)}},Ws=e=>{const t={select:t=>{let{id:a,value:n,selected:l}=t;if(a=toRaw(a),e&&!n){const e=Array.from(l.entries()).reduce(((e,t)=>{let[a,n]=t;return "on"===n&&e.push(a),e}),[]);if(1===e.length&&e[0]===a)return l}return l.set(a,n?"on":"off"),l},in:(e,a,n)=>{let l=new Map;for(const o of e||[])l=t.select({id:o,value:!0,selected:new Map(l),children:a,parents:n});return l},out:e=>{const t=[];for(const[a,n]of e.entries())"on"===n&&t.push(a);return t}};return t},zs=e=>{const t=Ws(e);return {select:e=>{let{selected:a,id:n,...l}=e;n=toRaw(n);const o=a.has(n)?new Map([[n,a.get(n)]]):new Map;return t.select({...l,id:n,selected:o})},in:(e,a,n)=>{let l=new Map;return (null==e?void 0:e.length)&&(l=t.in(e.slice(0,1),a,n)),l},out:(e,a,n)=>t.out(e,a,n)}},Us=Symbol.for("vuetify:nested"),Ys={id:shallowRef(),root:{register:()=>null,unregister:()=>null,parents:ref(new Map),children:ref(new Map),open:()=>null,openOnSelect:()=>null,activate:()=>null,select:()=>null,activatable:ref(!1),selectable:ref(!1),opened:ref(new Set),activated:ref(new Set),selected:ref(new Map),selectedValues:ref([])}},Ks=wn({activatable:Boolean,selectable:Boolean,activeStrategy:[String,Function,Object],selectStrategy:[String,Function,Object],openStrategy:[String,Object],opened:null,activated:null,selected:null,mandatory:Boolean},"nested"),Gs=e=>{const t=ref(new Map),a=ref(new Map),n=Un(e,"opened",e.opened,(e=>new Set(e)),(e=>[...e.values()])),l=computed((()=>{if("object"==typeof e.activeStrategy)return e.activeStrategy;if("function"==typeof e.activeStrategy)return e.activeStrategy(e.mandatory);switch(e.activeStrategy){case"leaf":return (e=>{const t=Ls(e);return {activate:e=>{let{id:a,activated:n,children:l,...o}=e;return a=toRaw(a),l.has(a)?n:t.activate({id:a,activated:n,children:l,...o})},in:t.in,out:t.out}})(e.mandatory);case"single-leaf":return (e=>{const t=Rs(e);return {activate:e=>{let{id:a,activated:n,children:l,...o}=e;return a=toRaw(a),l.has(a)?n:t.activate({id:a,activated:n,children:l,...o})},in:t.in,out:t.out}})(e.mandatory);case"independent":return Ls(e.mandatory);default:return Rs(e.mandatory)}})),o=computed((()=>{if("object"==typeof e.selectStrategy)return e.selectStrategy;if("function"==typeof e.selectStrategy)return e.selectStrategy(e.mandatory);switch(e.selectStrategy){case"single-leaf":return (e=>{const t=zs(e);return {select:e=>{let{id:a,selected:n,children:l,...o}=e;return a=toRaw(a),l.has(a)?n:t.select({id:a,selected:n,children:l,...o})},in:t.in,out:t.out}})(e.mandatory);case"leaf":return (e=>{const t=Ws(e);return {select:e=>{let{id:a,selected:n,children:l,...o}=e;return a=toRaw(a),l.has(a)?n:t.select({id:a,selected:n,children:l,...o})},in:t.in,out:t.out}})(e.mandatory);case"independent":return Ws(e.mandatory);case"single-independent":return zs(e.mandatory);default:return (e=>{const t={select:t=>{let{id:a,value:n,selected:l,children:o,parents:r}=t;a=toRaw(a);const i=new Map(l),s=[a];for(;s.length;){const e=s.shift();l.set(e,n?"on":"off"),o.has(e)&&s.push(...o.get(e));}let u=r.get(a);for(;u;){const e=o.get(u),t=e.every((e=>"on"===l.get(e))),a=e.every((e=>!l.has(e)||"off"===l.get(e)));l.set(u,t?"on":a?"off":"indeterminate"),u=r.get(u);}return e&&!n&&0===Array.from(l.entries()).reduce(((e,t)=>{let[a,n]=t;return "on"===n&&e.push(a),e}),[]).length?i:l},in:(e,a,n)=>{let l=new Map;for(const o of e||[])l=t.select({id:o,value:!0,selected:new Map(l),children:a,parents:n});return l},out:(e,t)=>{const a=[];for(const[n,l]of e.entries())"on"!==l||t.has(n)||a.push(n);return a}};return t})(e.mandatory)}})),r=computed((()=>{if("object"==typeof e.openStrategy)return e.openStrategy;switch(e.openStrategy){case"list":return Hs;case"single":return Ns;default:return js}})),s=Un(e,"activated",e.activated,(e=>l.value.in(e,t.value,a.value)),(e=>l.value.out(e,t.value,a.value))),u=Un(e,"selected",e.selected,(e=>o.value.in(e,t.value,a.value)),(e=>o.value.out(e,t.value,a.value)));function c(e){const t=[];let n=e;for(;null!=n;)t.unshift(n),n=a.value.get(n);return t}const p=An("nested"),f={id:shallowRef(),root:{opened:n,activatable:toRef(e,"activatable"),selectable:toRef(e,"selectable"),activated:s,selected:u,selectedValues:computed((()=>{const e=[];for(const[t,a]of u.value.entries())"on"===a&&e.push(t);return e})),register:(e,n,l)=>{n&&e!==n&&a.value.set(e,n),l&&t.value.set(e,[]),null!=n&&t.value.set(n,[...t.value.get(n)||[],e]);},unregister:e=>{t.value.delete(e);const l=a.value.get(e);if(l){const a=t.value.get(l)??[];t.value.set(l,a.filter((t=>t!==e)));}a.value.delete(e),n.value.delete(e);},open:(e,l,o)=>{p.emit("click:open",{id:e,value:l,path:c(e),event:o});const i=r.value.open({id:e,value:l,opened:new Set(n.value),children:t.value,parents:a.value,event:o});i&&(n.value=i);},openOnSelect:(e,l,o)=>{const i=r.value.select({id:e,value:l,selected:new Map(u.value),opened:new Set(n.value),children:t.value,parents:a.value,event:o});i&&(n.value=i);},select:(e,n,l)=>{p.emit("click:select",{id:e,value:n,path:c(e),event:l});const r=o.value.select({id:e,value:n,selected:new Map(u.value),children:t.value,parents:a.value,event:l});r&&(u.value=r),f.root.openOnSelect(e,n,l);},activate:(n,o,r)=>{if(!e.activatable)return f.root.select(n,!0,r);p.emit("click:activate",{id:n,value:o,path:c(n),event:r});const i=l.value.activate({id:n,value:o,activated:new Set(s.value),children:t.value,parents:a.value,event:r});i&&(s.value=i);},children:t,parents:a}};return provide(Us,f),f.root},qs=(e,t)=>{const a=inject(Us,Ys),n=Symbol(Bn()),l=computed((()=>void 0!==e.value?e.value:n)),o={...a,id:l,open:(e,t)=>a.root.open(l.value,e,t),openOnSelect:(e,t)=>a.root.openOnSelect(l.value,e,t),isOpen:computed((()=>a.root.opened.value.has(l.value))),parent:computed((()=>a.root.parents.value.get(l.value))),activate:(e,t)=>a.root.activate(l.value,e,t),isActivated:computed((()=>a.root.activated.value.has(toRaw(l.value)))),select:(e,t)=>a.root.select(l.value,e,t),isSelected:computed((()=>"on"===a.root.selected.value.get(toRaw(l.value)))),isIndeterminate:computed((()=>"indeterminate"===a.root.selected.value.get(l.value))),isLeaf:computed((()=>!a.root.children.value.get(l.value))),isGroupActivator:a.isGroupActivator};return !a.isGroupActivator&&a.root.register(l.value,a.id.value,t),t&&provide(Us,o),o},Zs=Tn({name:"VListGroupActivator",setup(e,t){let{slots:a}=t;return (()=>{const e=inject(Us,Ys);provide(Us,{...e,isGroupActivator:!0});})(),()=>{var e;return null==(e=a.default)?void 0:e.call(a)}}}),Qs=wn({activeColor:String,baseColor:String,color:String,collapseIcon:{type:Fl,default:"$collapse"},expandIcon:{type:Fl,default:"$expand"},prependIcon:Fl,appendIcon:Fl,fluid:Boolean,subgroup:Boolean,title:String,value:null,..._n(),...vo()},"VListGroup"),Xs=$n()({name:"VListGroup",props:Qs(),setup(e,t){let{slots:a}=t;const{isOpen:n,open:l,id:o}=qs(toRef(e,"value"),!0),r=computed((()=>`v-list-group--id-${String(o.value)}`)),s=Ms(),{isBooted:u}=hs();function c(e){e.stopPropagation(),l(!n.value,e);}const d=computed((()=>({onClick:c,class:"v-list-group__header",id:r.value}))),v=computed((()=>n.value?e.collapseIcon:e.expandIcon)),p=computed((()=>({VListItem:{active:n.value,activeColor:e.activeColor,baseColor:e.baseColor,color:e.color,prependIcon:e.prependIcon||e.subgroup&&v.value,appendIcon:e.appendIcon||!e.subgroup&&v.value,title:e.title,value:e.value}})));return zn((()=>createVNode(e.tag,{class:["v-list-group",{"v-list-group--prepend":null==s?void 0:s.hasPrepend.value,"v-list-group--fluid":e.fluid,"v-list-group--subgroup":e.subgroup,"v-list-group--open":n.value},e.class],style:e.style},{default:()=>[a.activator&&createVNode(Bo,{defaults:p.value},{default:()=>[createVNode(Zs,null,{default:()=>[a.activator({props:d.value,isOpen:n.value})]})]}),createVNode(Ar,{transition:{component:Gr},disabled:!u.value},{default:()=>{var e;return [withDirectives(createVNode("div",{class:"v-list-group__items",role:"group","aria-labelledby":r.value},[null==(e=a.default)?void 0:e.call(a)]),[[vShow,n.value]])]}})]}))),{isOpen:n}}}),Js=wn({opacity:[Number,String],..._n(),...vo()},"VListItemSubtitle"),eu=$n()({name:"VListItemSubtitle",props:Js(),setup(e,t){let{slots:a}=t;return zn((()=>createVNode(e.tag,{class:["v-list-item-subtitle",e.class],style:[{"--v-list-item-subtitle-opacity":e.opacity},e.style]},a))),{}}}),tu=Mn("v-list-item-title"),au=wn({active:{type:Boolean,default:void 0},activeClass:String,activeColor:String,appendAvatar:String,appendIcon:Fl,baseColor:String,disabled:Boolean,lines:[Boolean,String],link:{type:Boolean,default:void 0},nav:Boolean,prependAvatar:String,prependIcon:Fl,ripple:{type:[Boolean,Object],default:!0},slim:Boolean,subtitle:[String,Number],title:[String,Number],value:null,onClick:ca(),onClickOnce:ca(),...ao(),..._n(),...oo(),...Ro(),...io(),...uo(),...Jo(),...vo(),...jl(),...yo({variant:"text"})},"VListItem"),nu=$n()({name:"VListItem",directives:{Ripple:hr},props:au(),emits:{click:e=>!0},setup(e,t){let{attrs:a,slots:n,emit:l}=t;const o=Xo(e,a),r=computed((()=>void 0===e.value?o.href.value:e.value)),{activate:i,isActivated:s,select:u,isSelected:c,isIndeterminate:d,isGroupActivator:v,root:p,parent:f,openOnSelect:m}=qs(r,!1),g=Ms(),h=computed((()=>{var t;return !1!==e.active&&(e.active||(null==(t=o.isActive)?void 0:t.value)||(p.activatable.value?s.value:c.value))})),b=computed((()=>!1!==e.link&&o.isLink.value)),x=computed((()=>!e.disabled&&!1!==e.link&&(e.link||o.isClickable.value||!!g&&(p.selectable.value||p.activatable.value||null!=e.value)))),S=computed((()=>e.rounded||e.nav)),C=computed((()=>e.color??e.activeColor)),w=computed((()=>({color:h.value?C.value??e.baseColor:e.baseColor,variant:e.variant})));watch((()=>{var e;return null==(e=o.isActive)?void 0:e.value}),(e=>{e&&null!=f.value&&p.open(f.value,!0),e&&m(e);}),{immediate:!0});const{themeClasses:_}=Wl(e),{borderClasses:I}=no(e),{colorClasses:V,colorStyles:B,variantClasses:D}=bo(w),{densityClasses:F}=ro(e),{dimensionStyles:E}=No(e),{elevationClasses:T}=so(e),{roundedClasses:$}=co(S),M=computed((()=>e.lines?`v-list-item--${e.lines}-line`:void 0)),R=computed((()=>({isActive:h.value,select:u,isSelected:c.value,isIndeterminate:d.value})));function N(t){var a;l("click",t),x.value&&(null==(a=o.navigate)||a.call(o,t),v||(p.activatable.value?i(!s.value,t):(p.selectable.value||null!=e.value)&&u(!c.value,t)));}function j(e){"Enter"!==e.key&&" "!==e.key||(e.preventDefault(),N(e));}return zn((()=>{const t=b.value?"a":e.tag,a=n.title||null!=e.title,l=n.subtitle||null!=e.subtitle,r=!(!e.appendAvatar&&!e.appendIcon),i=!(!r&&!n.append),s=!(!e.prependAvatar&&!e.prependIcon),u=!(!s&&!n.prepend);var c,d;return null==g||g.updateHasPrepend(u),e.activeColor&&(c="active-color",d=["color","base-color"],d=Array.isArray(d)?d.slice(0,-1).map((e=>`'${e}'`)).join(", ")+` or '${d.at(-1)}'`:`'${d}'`,warn(`[Vuetify UPGRADE] '${c}' is deprecated, use ${d} instead.`)),withDirectives(createVNode(t,{class:["v-list-item",{"v-list-item--active":h.value,"v-list-item--disabled":e.disabled,"v-list-item--link":x.value,"v-list-item--nav":e.nav,"v-list-item--prepend":!u&&(null==g?void 0:g.hasPrepend.value),"v-list-item--slim":e.slim,[`${e.activeClass}`]:e.activeClass&&h.value},_.value,I.value,V.value,F.value,T.value,M.value,$.value,D.value,e.class],style:[B.value,E.value,e.style],href:o.href.value,tabindex:x.value?g?-2:0:void 0,onClick:N,onKeydown:x.value&&!b.value&&j},{default:()=>{var t;return [ho(x.value||h.value,"v-list-item"),u&&createVNode("div",{key:"prepend",class:"v-list-item__prepend"},[n.prepend?createVNode(Bo,{key:"prepend-defaults",disabled:!s,defaults:{VAvatar:{density:e.density,image:e.prependAvatar},VIcon:{density:e.density,icon:e.prependIcon},VListItemAction:{start:!0}}},{default:()=>{var e;return [null==(e=n.prepend)?void 0:e.call(n,R.value)]}}):createVNode(Fragment,null,[e.prependAvatar&&createVNode(bs,{key:"prepend-avatar",density:e.density,image:e.prependAvatar},null),e.prependIcon&&createVNode(To,{key:"prepend-icon",density:e.density,icon:e.prependIcon},null)]),createVNode("div",{class:"v-list-item__spacer"},null)]),createVNode("div",{class:"v-list-item__content","data-no-activator":""},[a&&createVNode(tu,{key:"title"},{default:()=>{var t;return [(null==(t=n.title)?void 0:t.call(n,{title:e.title}))??e.title]}}),l&&createVNode(eu,{key:"subtitle"},{default:()=>{var t;return [(null==(t=n.subtitle)?void 0:t.call(n,{subtitle:e.subtitle}))??e.subtitle]}}),null==(t=n.default)?void 0:t.call(n,R.value)]),i&&createVNode("div",{key:"append",class:"v-list-item__append"},[n.append?createVNode(Bo,{key:"append-defaults",disabled:!r,defaults:{VAvatar:{density:e.density,image:e.appendAvatar},VIcon:{density:e.density,icon:e.appendIcon},VListItemAction:{end:!0}}},{default:()=>{var e;return [null==(e=n.append)?void 0:e.call(n,R.value)]}}):createVNode(Fragment,null,[e.appendIcon&&createVNode(To,{key:"append-icon",density:e.density,icon:e.appendIcon},null),e.appendAvatar&&createVNode(bs,{key:"append-avatar",density:e.density,image:e.appendAvatar},null)]),createVNode("div",{class:"v-list-item__spacer"},null)])]}}),[[resolveDirective("ripple"),x.value&&e.ripple]])})),{activate:i,isActivated:s,isGroupActivator:v,isSelected:c,list:g,select:u}}}),lu=wn({color:String,inset:Boolean,sticky:Boolean,title:String,..._n(),...vo()},"VListSubheader"),ou=$n()({name:"VListSubheader",props:lu(),setup(e,t){let{slots:a}=t;const{textColorClasses:n,textColorStyles:l}=fo(toRef(e,"color"));return zn((()=>{const t=!(!a.default&&!e.title);return createVNode(e.tag,{class:["v-list-subheader",{"v-list-subheader--inset":e.inset,"v-list-subheader--sticky":e.sticky},n.value,e.class],style:[{textColorStyles:l},e.style]},{default:()=>{var n;return [t&&createVNode("div",{class:"v-list-subheader__text"},[(null==(n=a.default)?void 0:n.call(a))??e.title])]}})})),{}}}),ru=wn({color:String,inset:Boolean,length:[Number,String],opacity:[Number,String],thickness:[Number,String],vertical:Boolean,..._n(),...jl()},"VDivider"),iu=$n()({name:"VDivider",props:ru(),setup(e,t){let{attrs:a,slots:n}=t;const{themeClasses:l}=Wl(e),{textColorClasses:o,textColorStyles:r}=fo(toRef(e,"color")),s=computed((()=>{const t={};return e.length&&(t[e.vertical?"height":"width"]=Rt(e.length)),e.thickness&&(t[e.vertical?"borderRightWidth":"borderTopWidth"]=Rt(e.thickness)),t}));return zn((()=>{const t=createVNode("hr",{class:[{"v-divider":!0,"v-divider--inset":e.inset,"v-divider--vertical":e.vertical},l.value,o.value,e.class],style:[s.value,r.value,{"--v-border-opacity":e.opacity},e.style],"aria-orientation":a.role&&"separator"!==a.role?void 0:e.vertical?"vertical":"horizontal",role:`${a.role||"separator"}`},null);return n.default?createVNode("div",{class:["v-divider__wrapper",{"v-divider__wrapper--vertical":e.vertical,"v-divider__wrapper--inset":e.inset}]},[t,createVNode("div",{class:"v-divider__content"},[n.default()]),t]):t})),{}}}),su=wn({items:Array,returnObject:Boolean},"VListChildren"),uu=$n()({name:"VListChildren",props:su(),setup(e,t){let{slots:a}=t;return $s(),()=>{var t,n;return (null==(t=a.default)?void 0:t.call(a))??(null==(n=e.items)?void 0:n.map((t=>{var n,l;let{children:o,props:r,type:i,raw:s}=t;if("divider"===i)return (null==(n=a.divider)?void 0:n.call(a,{props:r}))??createVNode(iu,r,null);if("subheader"===i)return (null==(l=a.subheader)?void 0:l.call(a,{props:r}))??createVNode(ou,r,null);const u={subtitle:a.subtitle?e=>{var t;return null==(t=a.subtitle)?void 0:t.call(a,{...e,item:s})}:void 0,prepend:a.prepend?e=>{var t;return null==(t=a.prepend)?void 0:t.call(a,{...e,item:s})}:void 0,append:a.append?e=>{var t;return null==(t=a.append)?void 0:t.call(a,{...e,item:s})}:void 0,title:a.title?e=>{var t;return null==(t=a.title)?void 0:t.call(a,{...e,item:s})}:void 0},c=Xs.filterProps(r);return o?createVNode(Xs,mergeProps({value:null==r?void 0:r.value},c),{activator:t=>{let{props:n}=t;const l={...r,...n,value:e.returnObject?s:r.value};return a.header?a.header({props:l}):createVNode(nu,l,u)},default:()=>createVNode(uu,{items:o,returnObject:e.returnObject},a)}):a.item?a.item({props:r}):createVNode(nu,mergeProps(r,{value:e.returnObject?s:r.value}),u)})))}}}),cu=wn({items:{type:Array,default:()=>[]},itemTitle:{type:[String,Array,Function],default:"title"},itemValue:{type:[String,Array,Function],default:"value"},itemChildren:{type:[Boolean,String,Array,Function],default:"children"},itemProps:{type:[Boolean,String,Array,Function],default:"props"},returnObject:Boolean,valueComparator:{type:Function,default:Tt}},"list-items");function du(e,t){const a=Mt(t,e.itemTitle,t),n=Mt(t,e.itemValue,a),l=Mt(t,e.itemChildren),o={title:a,value:n,...!0===e.itemProps?"object"!=typeof t||null==t||Array.isArray(t)?void 0:"children"in t?Gt(t,["children"]):t:Mt(t,e.itemProps)};return {title:String(o.title??""),value:o.value,props:o,children:Array.isArray(l)?vu(e,l):void 0,raw:t}}function vu(e,t){const a=[];for(const n of t)a.push(du(e,n));return a}function pu(e){const t=computed((()=>vu(e,e.items))),a=computed((()=>t.value.some((e=>null===e.value))));return {items:t,transformIn:function(n){return a.value||(n=n.filter((e=>null!==e))),n.map((a=>e.returnObject&&"string"==typeof a?du(e,a):t.value.find((t=>e.valueComparator(a,t.value)))||du(e,a)))},transformOut:function(t){return e.returnObject?t.map((e=>{let{raw:t}=e;return t})):t.map((e=>{let{value:t}=e;return t}))}}}function fu(e,t){const a=Mt(t,e.itemType,"item"),n=function(e){return "string"==typeof e||"number"==typeof e||"boolean"==typeof e}(t)?t:Mt(t,e.itemTitle),l=Mt(t,e.itemValue,void 0),o=Mt(t,e.itemChildren),r={title:n,value:l,...!0===e.itemProps?Gt(t,["children"]):Mt(t,e.itemProps)};return {type:a,title:r.title,value:r.value,props:r,children:"item"===a&&o?mu(e,o):void 0,raw:t}}function mu(e,t){const a=[];for(const n of t)a.push(fu(e,n));return a}const gu=wn({baseColor:String,activeColor:String,activeClass:String,bgColor:String,disabled:Boolean,expandIcon:String,collapseIcon:String,lines:{type:[Boolean,String],default:"one"},slim:Boolean,nav:Boolean,"onClick:open":ca(),"onClick:select":ca(),"onUpdate:opened":ca(),...Ks({selectStrategy:"single-leaf",openStrategy:"list"}),...ao(),..._n(),...oo(),...Ro(),...io(),itemType:{type:String,default:"type"},...cu(),...uo(),...vo(),...jl(),...yo({variant:"text"})},"VList"),hu=$n()({name:"VList",props:gu(),emits:{"update:selected":e=>!0,"update:activated":e=>!0,"update:opened":e=>!0,"click:open":e=>!0,"click:activate":e=>!0,"click:select":e=>!0},setup(e,t){let{slots:a}=t;const{items:n}=function(e){return {items:computed((()=>mu(e,e.items)))}}(e),{themeClasses:l}=Wl(e),{backgroundColorClasses:o,backgroundColorStyles:r}=mo(toRef(e,"bgColor")),{borderClasses:s}=no(e),{densityClasses:u}=ro(e),{dimensionStyles:c}=No(e),{elevationClasses:p}=so(e),{roundedClasses:f}=co(e),{children:m,open:g,parents:h,select:y}=Gs(e),b=computed((()=>e.lines?`v-list--${e.lines}-line`:void 0)),x=toRef(e,"activeColor"),S=toRef(e,"baseColor"),C=toRef(e,"color");$s(),Fn({VListGroup:{activeColor:x,baseColor:S,color:C,expandIcon:toRef(e,"expandIcon"),collapseIcon:toRef(e,"collapseIcon")},VListItem:{activeClass:toRef(e,"activeClass"),activeColor:x,baseColor:S,color:C,density:toRef(e,"density"),disabled:toRef(e,"disabled"),lines:toRef(e,"lines"),nav:toRef(e,"nav"),slim:toRef(e,"slim"),variant:toRef(e,"variant")}});const w=shallowRef(!1),_=ref();function A(e){w.value=!0;}function I(e){w.value=!1;}function P(e){var t;w.value||e.relatedTarget&&(null==(t=_.value)?void 0:t.contains(e.relatedTarget))||D();}function V(e){const t=e.target;if(_.value&&!["INPUT","TEXTAREA"].includes(t.tagName)){if("ArrowDown"===e.key)D("next");else if("ArrowUp"===e.key)D("prev");else if("Home"===e.key)D("first");else {if("End"!==e.key)return;D("last");}e.preventDefault();}}function B(e){w.value=!0;}function D(e){if(_.value)return fa(_.value,e)}return zn((()=>createVNode(e.tag,{ref:_,class:["v-list",{"v-list--disabled":e.disabled,"v-list--nav":e.nav,"v-list--slim":e.slim},l.value,o.value,s.value,u.value,p.value,b.value,f.value,e.class],style:[r.value,c.value,e.style],tabindex:e.disabled||w.value?-1:0,role:"listbox","aria-activedescendant":void 0,onFocusin:A,onFocusout:I,onFocus:P,onKeydown:V,onMousedown:B},{default:()=>[createVNode(uu,{items:n.value,returnObject:e.returnObject},a)]}))),{open:g,select:y,focus:D,children:m,parents:h}}}),yu=wn({renderless:Boolean,..._n()},"VVirtualScrollItem"),bu=$n()({name:"VVirtualScrollItem",inheritAttrs:!1,props:yu(),emits:{"update:height":e=>!0},setup(e,t){let{attrs:a,emit:n,slots:l}=t;const{resizeRef:o,contentRect:r}=Yl();watch((()=>{var e;return null==(e=r.value)?void 0:e.height}),(e=>{null!=e&&n("update:height",e);})),zn((()=>{var t,n;return e.renderless?createVNode(Fragment,null,[null==(t=l.default)?void 0:t.call(l,{itemRef:o})]):createVNode("div",mergeProps({ref:o,class:["v-virtual-scroll__item",e.class],style:e.style},a),[null==(n=l.default)?void 0:n.call(l)])}));}}),ku=wn({itemHeight:{type:[Number,String],default:null},height:[Number,String]},"virtual");function xu(e,t){const a=Al(),n=shallowRef(0);watchEffect((()=>{n.value=parseFloat(e.itemHeight||0);}));const l=shallowRef(0),o=shallowRef(Math.ceil((parseInt(e.height)||a.height.value)/(n.value||16))||1),r=shallowRef(0),i=shallowRef(0),s=ref(),c=ref();let p=0;const{resizeRef:f,contentRect:m}=Yl();watchEffect((()=>{f.value=s.value;}));const g=computed((()=>{var t;return s.value===(void 0).documentElement?a.height.value:(null==(t=m.value)?void 0:t.height)||parseInt(e.height)||0})),h=computed((()=>!!(s.value&&c.value&&g.value&&n.value)));let S=Array.from({length:t.value.length}),C=Array.from({length:t.value.length});const w=shallowRef(0);let _=-1;const A=function(e,t){let a=0;const n=function(){for(var n=arguments.length,l=new Array(n),o=0;o<n;o++)l[o]=arguments[o];clearTimeout(a),a=setTimeout((()=>e(...l)),unref(t));};return n.clear=()=>{clearTimeout(a);},n.immediate=e,n}((()=>{const e=performance.now();C[0]=0;const a=t.value.length;for(let t=1;t<=a-1;t++)C[t]=(C[t-1]||0)+(S[t-1]||n.value);w.value=Math.max(w.value,performance.now()-e);}),w),I=watch(h,(e=>{e&&(I(),p=c.value.offsetTop,A.immediate(),T(),~_&&nextTick((()=>{})));}));function P(e){return e=ea(e,0,t.value.length-1),C[e]||0}function V(e){return function(e,t){let a=e.length-1,n=0,l=0,o=null,r=-1;if(e[a]<t)return a;for(;n<=a;)if(l=n+a>>1,o=e[l],o>t)a=l-1;else {if(!(o<t))return o===t?l:n;r=l,n=l+1;}return r}(C,e)}onScopeDispose((()=>{A.clear();}));let B=0,D=0,O=0;watch(g,((e,t)=>{t&&(T(),e<t&&requestAnimationFrame((()=>{D=0,T();})));}));let F=-1;function T(){cancelAnimationFrame(F),F=requestAnimationFrame($);}function $(){if(!s.value||!g.value)return;const e=B-p,a=Math.sign(D),n=ea(V(Math.max(0,e-100)),0,t.value.length),u=ea(V(e+g.value+100)+1,n+1,t.value.length);if((-1!==a||n<l.value)&&(1!==a||u>o.value)){const e=P(l.value)-P(n),a=P(u)-P(o.value);Math.max(e,a)>100?(l.value=n,o.value=u):(n<=0&&(l.value=n),u>=t.value.length&&(o.value=u));}r.value=P(l.value),i.value=P(t.value.length)-P(o.value);}const M=computed((()=>t.value.slice(l.value,o.value).map(((e,t)=>({raw:e,index:t+l.value})))));return watch(t,(()=>{S=Array.from({length:t.value.length}),C=Array.from({length:t.value.length}),A.immediate(),T();}),{deep:!0}),{containerRef:s,markerRef:c,computedItems:M,paddingTop:r,paddingBottom:i,scrollToIndex:function(e){const t=P(e);!s.value||e&&!t?_=e:s.value.scrollTop=t;},handleScroll:function(){if(!s.value||!c.value)return;const e=s.value.scrollTop,t=performance.now();t-O>500?(D=Math.sign(e-B),p=c.value.offsetTop):D=e-B,B=e,O=t,T();},handleScrollend:function(){s.value&&c.value&&(D=0,O=0,T());},handleItemResize:function(e,t){const a=S[e],l=n.value;n.value=l?Math.min(n.value,t):t,a===t&&l===n.value||(S[e]=t,A());}}}const Su=wn({items:{type:Array,default:()=>[]},renderless:Boolean,...ku(),..._n(),...Ro()},"VVirtualScroll"),Cu=$n()({name:"VVirtualScroll",props:Su(),setup(e,t){let{slots:a}=t;An("VVirtualScroll");const{dimensionStyles:n}=No(e),{containerRef:l,markerRef:o,handleScroll:r,handleScrollend:s,handleItemResize:u,scrollToIndex:c,paddingTop:d,paddingBottom:v,computedItems:p}=xu(e,toRef(e,"items"));return Dt((()=>e.renderless),(()=>{onScopeDispose((function(){var e,t;const a=arguments.length>0&&void 0!==arguments[0]&&arguments[0]?"addEventListener":"removeEventListener";l.value===(void 0).documentElement?((void 0)[a]("scroll",r,{passive:!0}),(void 0)[a]("scrollend",s)):(null==(e=l.value)||e[a]("scroll",r,{passive:!0}),null==(t=l.value)||t[a]("scrollend",s));}));})),zn((()=>{const t=p.value.map((t=>createVNode(bu,{key:t.index,renderless:e.renderless,"onUpdate:height":e=>u(t.index,e)},{default:e=>{var n;return null==(n=a.default)?void 0:n.call(a,{item:t.raw,index:t.index,...e})}})));return e.renderless?createVNode(Fragment,null,[createVNode("div",{ref:o,class:"v-virtual-scroll__spacer",style:{paddingTop:Rt(d.value)}},null),t,createVNode("div",{class:"v-virtual-scroll__spacer",style:{paddingBottom:Rt(v.value)}},null)]):createVNode("div",{ref:l,class:["v-virtual-scroll",e.class],onScrollPassive:r,onScrollend:s,style:[n.value,e.style]},[createVNode("div",{ref:o,class:"v-virtual-scroll__container",style:{paddingTop:Rt(d.value),paddingBottom:Rt(v.value)}},[t])])})),{scrollToIndex:c}}});function wu(e,t){const a=shallowRef(!1);let n;return {onListScroll:function(e){cancelAnimationFrame(n),a.value=!0,n=requestAnimationFrame((()=>{n=requestAnimationFrame((()=>{a.value=!1;}));}));},onListKeydown:async function(n){var l,o;if("Tab"===n.key&&(null==(l=t.value)||l.focus()),!["PageDown","PageUp","Home","End"].includes(n.key))return;const r=null==(o=e.value)?void 0:o.$el;if(!r)return;"Home"!==n.key&&"End"!==n.key||r.scrollTo({top:"Home"===n.key?0:r.scrollHeight,behavior:"smooth"}),await async function(){await new Promise((e=>requestAnimationFrame(e))),await new Promise((e=>requestAnimationFrame(e))),await new Promise((e=>requestAnimationFrame(e))),await new Promise((e=>{if(a.value){const t=watch(a,(()=>{t(),e();}));}else e();}));}();const i=r.querySelectorAll(":scope > :not(.v-virtual-scroll__spacer)");if("PageDown"===n.key||"Home"===n.key){const e=r.getBoundingClientRect().top;for(const t of i)if(t.getBoundingClientRect().top>=e){t.focus();break}}else {const e=r.getBoundingClientRect().bottom;for(const t of [...i].reverse())if(t.getBoundingClientRect().bottom<=e){t.focus();break}}}}}const _u=wn({chips:Boolean,closableChips:Boolean,closeText:{type:String,default:"$vuetify.close"},openText:{type:String,default:"$vuetify.open"},eager:Boolean,hideNoData:Boolean,hideSelected:Boolean,listProps:{type:Object},menu:Boolean,menuIcon:{type:Fl,default:"$dropdown"},menuProps:{type:Object},multiple:Boolean,noDataText:{type:String,default:"$vuetify.noDataText"},openOnClear:Boolean,itemColor:String,...cu({itemChildren:!1})},"Select"),Au=wn({..._u(),...Gt(rs({modelValue:null,role:"combobox"}),["validationValue","dirty","appendInnerIcon"]),..._r({transition:{component:Hr}})},"VSelect"),Iu=$n()({name:"VSelect",props:Au(),emits:{"update:focused":e=>!0,"update:modelValue":e=>!0,"update:menu":e=>!0},setup(e,t){let{slots:a}=t;const{t:n}=tl(),l=ref(),o=ref(),r=ref(),i=Un(e,"menu"),s=computed({get:()=>i.value,set:e=>{var t;i.value&&!e&&(null==(t=o.value)?void 0:t.ΨopenChildren)||(i.value=e);}}),{items:u,transformIn:c,transformOut:p}=pu(e),f=Un(e,"modelValue",[],(e=>c(null===e?[null]:Jt(e))),(t=>{const a=p(t);return e.multiple?a:a[0]??null})),m=computed((()=>"function"==typeof e.counterValue?e.counterValue(f.value):"number"==typeof e.counterValue?e.counterValue:f.value.length)),g=es(),h=computed((()=>f.value.map((e=>e.value)))),b=shallowRef(!1),x=computed((()=>s.value?e.closeText:e.openText));let S,C="";const w=computed((()=>e.hideSelected?u.value.filter((t=>!f.value.some((a=>e.valueComparator(a,t))))):u.value)),_=computed((()=>e.hideNoData&&!w.value.length||e.readonly||(null==g?void 0:g.isReadonly.value))),I=computed((()=>{var t;return {...e.menuProps,activatorProps:{...(null==(t=e.menuProps)?void 0:t.activatorProps)||{},"aria-haspopup":"listbox"}}})),P=ref(),{onListScroll:V,onListKeydown:B}=wu(P,l);function D(t){e.openOnClear&&(s.value=!0);}function T(){_.value||(s.value=!s.value);}function $(t){var a,n;if(!t.key||e.readonly||(null==g?void 0:g.isReadonly.value))return;["Enter"," ","ArrowDown","ArrowUp","Home","End"].includes(t.key)&&t.preventDefault(),["Enter","ArrowDown"," "].includes(t.key)&&(s.value=!0),["Escape","Tab"].includes(t.key)&&(s.value=!1),"Home"===t.key?null==(a=P.value)||a.focus("first"):"End"===t.key&&(null==(n=P.value)||n.focus("last"));if(e.multiple||!function(e){const t=1===e.key.length,a=!e.ctrlKey&&!e.metaKey&&!e.altKey;return t&&a}(t))return;const l=performance.now();l-S>1e3&&(C=""),C+=t.key.toLowerCase(),S=l;const o=u.value.find((e=>e.title.toLowerCase().startsWith(C)));void 0!==o&&(f.value=[o],w.value.indexOf(o));}function M(t){let a=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];if(!t.props.disabled)if(e.multiple){const n=f.value.findIndex((a=>e.valueComparator(a.value,t.value))),l=null==a?!~n:a;if(~n){const e=l?[...f.value,t]:[...f.value];e.splice(n,1),f.value=e;}else l&&(f.value=[...f.value,t]);}else {const e=!1!==a;f.value=e?[t]:[],nextTick((()=>{s.value=!1;}));}}function L(e){var t;(null==(t=P.value)?void 0:t.$el.contains(e.relatedTarget))||(s.value=!1);}function R(){var e;b.value&&(null==(e=l.value)||e.focus());}function j(e){b.value=!0;}function H(e){if(null==e)f.value=[];else if(l.value,l.value,null);else l.value&&(l.value.value="");}return watch(s,(()=>{!e.hideSelected&&s.value&&f.value.length&&w.value.findIndex((t=>f.value.some((a=>e.valueComparator(a.value,t.value)))));})),watch((()=>e.items),((e,t)=>{s.value||b.value&&!t.length&&e.length&&(s.value=!0);})),zn((()=>{const t=!(!e.chips&&!a.chip),i=!!(!e.hideNoData||w.value.length||a["prepend-item"]||a["append-item"]||a["no-data"]),u=f.value.length>0,c=is.filterProps(e),d=u||!b.value&&e.label&&!e.persistentPlaceholder?void 0:e.placeholder;return createVNode(is,mergeProps({ref:l},c,{modelValue:f.value.map((e=>e.props.value)).join(", "),"onUpdate:modelValue":H,focused:b.value,"onUpdate:focused":e=>b.value=e,validationValue:f.externalValue,counterValue:m.value,dirty:u,class:["v-select",{"v-select--active-menu":s.value,"v-select--chips":!!e.chips,["v-select--"+(e.multiple?"multiple":"single")]:!0,"v-select--selected":f.value.length,"v-select--selection-slot":!!a.selection},e.class],style:e.style,inputmode:"none",placeholder:d,"onClick:clear":D,"onMousedown:control":T,onBlur:L,onKeydown:$,"aria-label":n(x.value),title:n(x.value)}),{...a,default:()=>createVNode(Fragment,null,[createVNode(Li,mergeProps({ref:o,modelValue:s.value,"onUpdate:modelValue":e=>s.value=e,activator:"parent",contentClass:"v-select__content",disabled:_.value,eager:e.eager,maxHeight:310,openOnClick:!1,closeOnContentClick:!1,transition:e.transition,onAfterLeave:R},I.value),{default:()=>[i&&createVNode(hu,mergeProps({ref:P,selected:h.value,selectStrategy:e.multiple?"independent":"single-independent",onMousedown:e=>e.preventDefault(),onKeydown:B,onFocusin:j,onScrollPassive:V,tabindex:"-1","aria-live":"polite",color:e.itemColor??e.color},e.listProps),{default:()=>{var t,l,o;return [null==(t=a["prepend-item"])?void 0:t.call(a),!w.value.length&&!e.hideNoData&&((null==(l=a["no-data"])?void 0:l.call(a))??createVNode(nu,{title:n(e.noDataText)},null)),createVNode(Cu,{ref:r,renderless:!0,items:w.value},{default:t=>{var n;let{item:l,index:o,itemRef:r}=t;const i=mergeProps(l.props,{ref:r,key:o,onClick:()=>M(l,null)});return (null==(n=a.item)?void 0:n.call(a,{item:l,index:o,props:i}))??createVNode(nu,mergeProps(i,{role:"option"}),{prepend:t=>{let{isSelected:a}=t;return createVNode(Fragment,null,[e.multiple&&!e.hideSelected?createVNode(As,{key:l.value,modelValue:a,ripple:!1,tabindex:"-1"},null):void 0,l.props.prependAvatar&&createVNode(bs,{image:l.props.prependAvatar},null),l.props.prependIcon&&createVNode(To,{icon:l.props.prependIcon},null)])}})}}),null==(o=a["append-item"])?void 0:o.call(a)]}})]}),f.value.map(((n,l)=>{function o(e){e.stopPropagation(),e.preventDefault(),M(n,!1);}const r={"onClick:close":o,onKeydown(e){"Enter"!==e.key&&" "!==e.key||(e.preventDefault(),e.stopPropagation(),o(e));},onMousedown(e){e.preventDefault(),e.stopPropagation();},modelValue:!0,"onUpdate:modelValue":void 0},i=t?!!a.chip:!!a.selection,s=i?ya(t?a.chip({item:n,index:l,props:r}):a.selection({item:n,index:l})):void 0;if(!i||s)return createVNode("div",{key:n.value,class:"v-select__selection"},[t?a.chip?createVNode(Bo,{key:"chip-defaults",defaults:{VChip:{closable:e.closableChips,size:"small",text:n.title}}},{default:()=>[s]}):createVNode(Es,mergeProps({key:"chip",closable:e.closableChips,size:"small",text:n.title,disabled:n.props.disabled},r),null):s??createVNode("span",{class:"v-select__selection-text"},[n.title,e.multiple&&l<f.value.length-1&&createVNode("span",{class:"v-select__selection-comma"},[createTextVNode(",")])])])}))]),"append-inner":function(){for(var t,n=arguments.length,l=new Array(n),o=0;o<n;o++)l[o]=arguments[o];return createVNode(Fragment,null,[null==(t=a["append-inner"])?void 0:t.call(a,...l),e.menuIcon?createVNode(To,{class:"v-select__menu-icon",icon:e.menuIcon},null):void 0])}})})),$i({isFocused:b,menu:s,select:M},l)}}),Pu=(e,t,a)=>null==e||null==t?-1:e.toString().toLocaleLowerCase().indexOf(t.toString().toLocaleLowerCase()),Vu=wn({customFilter:Function,customKeyFilter:Object,filterKeys:[Array,String],filterMode:{type:String,default:"intersection"},noFilter:Boolean},"filter");function Bu(e,t,a,n){const l=ref([]),o=ref(new Map),r=computed((()=>(null==n?void 0:n.transform)?unref(t).map((e=>[e,n.transform(e)])):unref(t)));return watchEffect((()=>{const i="function"==typeof a?a():unref(a),s="string"!=typeof i&&"number"!=typeof i?"":String(i),c=function(e,t,a){var n;const l=[],o=(null==a?void 0:a.default)??Pu,r=!!(null==a?void 0:a.filterKeys)&&Jt(a.filterKeys),i=Object.keys((null==a?void 0:a.customKeyFilter)??{}).length;if(!(null==e?void 0:e.length))return l;e:for(let s=0;s<e.length;s++){const[u,c=u]=Jt(e[s]),d={},v={};let p=-1;if((t||i>0)&&!(null==a?void 0:a.noFilter)){if("object"==typeof u){const e=r||Object.keys(c);for(const l of e){const e=Mt(c,l),r=null==(n=null==a?void 0:a.customKeyFilter)?void 0:n[l];if(p=r?r(e,t,u):o(e,t,u),-1!==p&&!1!==p)r?d[l]=p:v[l]=p;else if("every"===(null==a?void 0:a.filterMode))continue e}}else p=o(u,t,u),-1!==p&&!1!==p&&(v.title=p);const e=Object.keys(v).length,l=Object.keys(d).length;if(!e&&!l)continue;if("union"===(null==a?void 0:a.filterMode)&&l!==i&&!e)continue;if("intersection"===(null==a?void 0:a.filterMode)&&(l!==i||!e))continue}l.push({index:s,matches:{...v,...d}});}return l}(r.value,s,{customKeyFilter:{...e.customKeyFilter,...unref(null==n?void 0:n.customKeyFilter)},default:e.customFilter,filterKeys:e.filterKeys,filterMode:e.filterMode,noFilter:e.noFilter}),d=unref(t),v=[],p=new Map;c.forEach((e=>{let{index:t,matches:a}=e;const n=d[t];v.push(n),p.set(n.value,a);})),l.value=v,o.value=p;})),{filteredItems:l,filteredMatches:o,getMatches:function(e){return o.value.get(e.value)}}}const Du=wn({expandOnClick:Boolean,showExpand:Boolean,expanded:{type:Array,default:()=>[]}},"DataTable-expand"),Ou=Symbol.for("vuetify:datatable:expanded");function Fu(){const e=inject(Ou);if(!e)throw new Error("foo");return e}const Eu=wn({groupBy:{type:Array,default:()=>[]}},"DataTable-group"),Tu=Symbol.for("vuetify:data-table-group");function $u(){const e=inject(Tu);if(!e)throw new Error("Missing group!");return e}function Mu(e,t){let a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0,n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"root";if(!t.length)return [];const l=function(e,t){if(!e.length)return [];const a=new Map;for(const n of e){const e=$t(n.raw,t);a.has(e)||a.set(e,[]),a.get(e).push(n);}return a}(e,t[0]),o=[],r=t.slice(1);return l.forEach(((e,l)=>{const i=t[0],s=`${n}_${i}_${l}`;o.push({depth:a,id:s,key:i,value:l,items:r.length?Mu(e,r,a+1,s):e,type:"group"});})),o}function Lu(e,t){const a=[];for(const n of e)"type"in n&&"group"===n.type?(null!=n.value&&a.push(n),(t.has(n.id)||null==n.value)&&a.push(...Lu(n.items,t))):a.push(n);return a}function Ru(e,t,a){return {flatItems:computed((()=>{if(!t.value.length)return e.value;return Lu(Mu(e.value,t.value.map((e=>e.key))),a.value)}))}}const Nu=wn({page:{type:[Number,String],default:1},itemsPerPage:{type:[Number,String],default:10}},"DataTable-paginate"),ju=Symbol.for("vuetify:data-table-pagination");const Hu={showSelectAll:!1,allSelected:()=>[],select:e=>{var t;let{items:a,value:n}=e;return new Set(n?[null==(t=a[0])?void 0:t.value]:[])},selectAll:e=>{let{selected:t}=e;return t}},Wu={showSelectAll:!0,allSelected:e=>{let{currentPage:t}=e;return t},select:e=>{let{items:t,value:a,selected:n}=e;for(const l of t)a?n.add(l.value):n.delete(l.value);return n},selectAll:e=>{let{value:t,currentPage:a,selected:n}=e;return Wu.select({items:a,value:t,selected:n})}},zu={showSelectAll:!0,allSelected:e=>{let{allItems:t}=e;return t},select:e=>{let{items:t,value:a,selected:n}=e;for(const l of t)a?n.add(l.value):n.delete(l.value);return n},selectAll:e=>{let{value:t,allItems:a,selected:n}=e;return zu.select({items:a,value:t,selected:n})}},Uu=wn({showSelect:Boolean,selectStrategy:{type:[String,Object],default:"page"},modelValue:{type:Array,default:()=>[]},valueComparator:{type:Function,default:Tt}},"DataTable-select"),Yu=Symbol.for("vuetify:data-table-selection");function Ku(){const e=inject(Yu);if(!e)throw new Error("Missing selection!");return e}const Gu=wn({sortBy:{type:Array,default:()=>[]},customKeySort:Object,multiSort:Boolean,mustSort:Boolean},"DataTable-sort"),qu=Symbol.for("vuetify:data-table-sort");function Zu(){const e=inject(qu);if(!e)throw new Error("Missing sort!");return e}function Qu(e,t,a,n){const l=tl(),o=computed((()=>{var o,r;return !a.value.length||e.disableSort?t.value:function(e,t,a,n){const l=new Intl.Collator(a,{sensitivity:"accent",usage:"sort"}),o=e.map((e=>[e,(null==n?void 0:n.transform)?n.transform(e):e]));return o.sort(((e,a)=>{var o,r;for(let i=0;i<t.length;i++){let s=!1;const u=t[i].key,c=t[i].order??"asc";if(!1===c)continue;let d=e[1][u],v=a[1][u],p=e[0].raw,f=a[0].raw;if("desc"===c&&([d,v]=[v,d],[p,f]=[f,p]),null==(o=null==n?void 0:n.sortRawFunctions)?void 0:o[u]){const e=n.sortRawFunctions[u](p,f);if(null==e)continue;if(s=!0,e)return e}if(null==(r=null==n?void 0:n.sortFunctions)?void 0:r[u]){const e=n.sortFunctions[u](d,v);if(null==e)continue;if(s=!0,e)return e}if(!s){if(d instanceof Date&&v instanceof Date)return d.getTime()-v.getTime();if([d,v]=[d,v].map((e=>null!=e?e.toString().toLocaleLowerCase():e)),d!==v)return ma(d)&&ma(v)?0:ma(d)?-1:ma(v)?1:isNaN(d)||isNaN(v)?l.compare(d,v):Number(d)-Number(v)}}return 0})).map((e=>{let[t]=e;return t}))}(t.value,a.value,l.current.value,{transform:null==n?void 0:n.transform,sortFunctions:{...e.customKeySort,...null==(o=null==n?void 0:n.sortFunctions)?void 0:o.value},sortRawFunctions:null==(r=null==n?void 0:n.sortRawFunctions)?void 0:r.value})}));return {sortedItems:o}}const Xu=wn({activeColor:String,start:{type:[Number,String],default:1},modelValue:{type:Number,default:e=>e.start},disabled:Boolean,length:{type:[Number,String],default:1,validator:e=>e%1==0},totalVisible:[Number,String],firstIcon:{type:Fl,default:"$first"},prevIcon:{type:Fl,default:"$prev"},nextIcon:{type:Fl,default:"$next"},lastIcon:{type:Fl,default:"$last"},ariaLabel:{type:String,default:"$vuetify.pagination.ariaLabel.root"},pageAriaLabel:{type:String,default:"$vuetify.pagination.ariaLabel.page"},currentPageAriaLabel:{type:String,default:"$vuetify.pagination.ariaLabel.currentPage"},firstAriaLabel:{type:String,default:"$vuetify.pagination.ariaLabel.first"},previousAriaLabel:{type:String,default:"$vuetify.pagination.ariaLabel.previous"},nextAriaLabel:{type:String,default:"$vuetify.pagination.ariaLabel.next"},lastAriaLabel:{type:String,default:"$vuetify.pagination.ariaLabel.last"},ellipsis:{type:String,default:"..."},showFirstLastPage:Boolean,...ao(),..._n(),...oo(),...io(),...uo(),...Oo(),...vo({tag:"nav"}),...jl(),...yo({variant:"text"})},"VPagination"),Ju=$n()({name:"VPagination",props:Xu(),emits:{"update:modelValue":e=>!0,first:e=>!0,prev:e=>!0,next:e=>!0,last:e=>!0},setup(e,t){let{slots:a,emit:n}=t;const l=Un(e,"modelValue"),{t:o,n:r}=tl(),{isRtl:s}=al(),{themeClasses:u}=Wl(e),{width:c}=Al(),p=shallowRef(-1);Fn(void 0,{scoped:!0});const{resizeRef:f}=Yl(),m=computed((()=>parseInt(e.length,10))),g=computed((()=>parseInt(e.start,10))),h=computed((()=>null!=e.totalVisible?parseInt(e.totalVisible,10):p.value>=0?p.value:function(t,a){const n=e.showFirstLastPage?5:3;return Math.max(0,Math.floor(+((t-a*n)/a).toFixed(2)))}(c.value,58)));const y=computed((()=>{if(m.value<=0||isNaN(m.value)||m.value>Number.MAX_SAFE_INTEGER)return [];if(h.value<=0)return [];if(1===h.value)return [l.value];if(m.value<=h.value)return Lt(m.value,g.value);const t=h.value%2==0,a=t?h.value/2:Math.floor(h.value/2),n=t?a:a+1,o=m.value-a;if(n-l.value>=0)return [...Lt(Math.max(1,h.value-1),g.value),e.ellipsis,m.value];if(l.value-o>=(t?1:0)){const t=h.value-1,a=m.value-t+g.value;return [g.value,e.ellipsis,...Lt(t,a)]}{const t=Math.max(1,h.value-3),a=1===t?l.value:l.value-Math.ceil(t/2)+g.value;return [g.value,e.ellipsis,...Lt(t,a),e.ellipsis,m.value]}}));function b(e,t,a){e.preventDefault(),l.value=t,a&&n(a,t);}const{refs:x,updateRef:S}=function(){const e=ref([]);return {refs:e,updateRef:function(t,a){e.value[a]=t;}}}();Fn({VPaginationBtn:{color:toRef(e,"color"),border:toRef(e,"border"),density:toRef(e,"density"),size:toRef(e,"size"),variant:toRef(e,"variant"),rounded:toRef(e,"rounded"),elevation:toRef(e,"elevation")}});const C=computed((()=>y.value.map(((t,a)=>{const n=e=>S(e,a);if("string"==typeof t)return {isActive:!1,key:`ellipsis-${a}`,page:t,props:{ref:n,ellipsis:!0,icon:!0,disabled:!0}};{const a=t===l.value;return {isActive:a,key:t,page:r(t),props:{ref:n,ellipsis:!1,icon:!0,disabled:!!e.disabled||+e.length<2,color:a?e.activeColor:e.color,"aria-current":a,"aria-label":o(a?e.currentPageAriaLabel:e.pageAriaLabel,t),onClick:e=>b(e,t)}}}})))),w=computed((()=>{const t=!!e.disabled||l.value<=g.value,a=!!e.disabled||l.value>=g.value+m.value-1;return {first:e.showFirstLastPage?{icon:s.value?e.lastIcon:e.firstIcon,onClick:e=>b(e,g.value,"first"),disabled:t,"aria-label":o(e.firstAriaLabel),"aria-disabled":t}:void 0,prev:{icon:s.value?e.nextIcon:e.prevIcon,onClick:e=>b(e,l.value-1,"prev"),disabled:t,"aria-label":o(e.previousAriaLabel),"aria-disabled":t},next:{icon:s.value?e.prevIcon:e.nextIcon,onClick:e=>b(e,l.value+1,"next"),disabled:a,"aria-label":o(e.nextAriaLabel),"aria-disabled":a},last:e.showFirstLastPage?{icon:s.value?e.firstIcon:e.lastIcon,onClick:e=>b(e,g.value+m.value-1,"last"),disabled:a,"aria-label":o(e.lastAriaLabel),"aria-disabled":a}:void 0}}));function _(){var e;const t=l.value-g.value;null==(e=x.value[t])||e.$el.focus();}function A(t){t.key===Wt.left&&!e.disabled&&l.value>+e.start?(l.value=l.value-1,nextTick(_)):t.key===Wt.right&&!e.disabled&&l.value<g.value+m.value-1&&(l.value=l.value+1,nextTick(_));}return zn((()=>createVNode(e.tag,{ref:f,class:["v-pagination",u.value,e.class],style:e.style,role:"navigation","aria-label":o(e.ariaLabel),onKeydown:A,"data-test":"v-pagination-root"},{default:()=>[createVNode("ul",{class:"v-pagination__list"},[e.showFirstLastPage&&createVNode("li",{key:"first",class:"v-pagination__first","data-test":"v-pagination-first"},[a.first?a.first(w.value.first):createVNode(br,mergeProps({_as:"VPaginationBtn"},w.value.first),null)]),createVNode("li",{key:"prev",class:"v-pagination__prev","data-test":"v-pagination-prev"},[a.prev?a.prev(w.value.prev):createVNode(br,mergeProps({_as:"VPaginationBtn"},w.value.prev),null)]),C.value.map(((e,t)=>createVNode("li",{key:e.key,class:["v-pagination__item",{"v-pagination__item--is-active":e.isActive}],"data-test":"v-pagination-item"},[a.item?a.item(e):createVNode(br,mergeProps({_as:"VPaginationBtn"},e.props),{default:()=>[e.page]})]))),createVNode("li",{key:"next",class:"v-pagination__next","data-test":"v-pagination-next"},[a.next?a.next(w.value.next):createVNode(br,mergeProps({_as:"VPaginationBtn"},w.value.next),null)]),e.showFirstLastPage&&createVNode("li",{key:"last",class:"v-pagination__last","data-test":"v-pagination-last"},[a.last?a.last(w.value.last):createVNode(br,mergeProps({_as:"VPaginationBtn"},w.value.last),null)])])]}))),{}}}),ec=wn({prevIcon:{type:String,default:"$prev"},nextIcon:{type:String,default:"$next"},firstIcon:{type:String,default:"$first"},lastIcon:{type:String,default:"$last"},itemsPerPageText:{type:String,default:"$vuetify.dataFooter.itemsPerPageText"},pageText:{type:String,default:"$vuetify.dataFooter.pageText"},firstPageLabel:{type:String,default:"$vuetify.dataFooter.firstPage"},prevPageLabel:{type:String,default:"$vuetify.dataFooter.prevPage"},nextPageLabel:{type:String,default:"$vuetify.dataFooter.nextPage"},lastPageLabel:{type:String,default:"$vuetify.dataFooter.lastPage"},itemsPerPageOptions:{type:Array,default:()=>[{value:10,title:"10"},{value:25,title:"25"},{value:50,title:"50"},{value:100,title:"100"},{value:-1,title:"$vuetify.dataFooter.itemsPerPageAll"}]},showCurrentPage:Boolean},"VDataTableFooter"),tc=$n()({name:"VDataTableFooter",props:ec(),setup(e,t){let{slots:a}=t;const{t:n}=tl(),{page:l,pageCount:o,startIndex:i,stopIndex:s,itemsLength:u,itemsPerPage:c,setItemsPerPage:d}=function(){const e=inject(ju);if(!e)throw new Error("Missing pagination!");return e}(),v=computed((()=>e.itemsPerPageOptions.map((e=>"number"==typeof e?{value:e,title:-1===e?n("$vuetify.dataFooter.itemsPerPageAll"):String(e)}:{...e,title:isNaN(Number(e.title))?n(e.title):e.title}))));return zn((()=>{var t;const r=Ju.filterProps(e);return createVNode("div",{class:"v-data-table-footer"},[null==(t=a.prepend)?void 0:t.call(a),createVNode("div",{class:"v-data-table-footer__items-per-page"},[createVNode("span",null,[n(e.itemsPerPageText)]),createVNode(Iu,{items:v.value,modelValue:c.value,"onUpdate:modelValue":e=>d(Number(e)),density:"compact",variant:"outlined","hide-details":!0},null)]),createVNode("div",{class:"v-data-table-footer__info"},[createVNode("div",null,[n(e.pageText,u.value?i.value+1:0,s.value,u.value)])]),createVNode("div",{class:"v-data-table-footer__pagination"},[createVNode(Ju,mergeProps({modelValue:l.value,"onUpdate:modelValue":e=>l.value=e,density:"comfortable","first-aria-label":e.firstPageLabel,"last-aria-label":e.lastPageLabel,length:o.value,"next-aria-label":e.nextPageLabel,"previous-aria-label":e.prevPageLabel,rounded:!0,"show-first-last-page":!0,"total-visible":e.showCurrentPage?1:0,variant:"plain"},r),null)])])})),{}}}),ac=(nc={align:{type:String,default:"start"},fixed:Boolean,fixedOffset:[Number,String],height:[Number,String],lastFixed:Boolean,noPadding:Boolean,tag:String,width:[Number,String],maxWidth:[Number,String],nowrap:Boolean},lc=(e,t)=>{let{slots:a}=t;const n=e.tag??"td";return createVNode(n,{class:["v-data-table__td",{"v-data-table-column--fixed":e.fixed,"v-data-table-column--last-fixed":e.lastFixed,"v-data-table-column--no-padding":e.noPadding,"v-data-table-column--nowrap":e.nowrap},`v-data-table-column--align-${e.align}`],style:{height:Rt(e.height),width:Rt(e.width),maxWidth:Rt(e.maxWidth),left:Rt(e.fixedOffset||null)}},{default:()=>{var e;return [null==(e=a.default)?void 0:e.call(a)]}})},lc.props=nc,lc);var nc,lc;const oc=wn({headers:Array},"DataTable-header"),rc=Symbol.for("vuetify:data-table-headers"),ic={title:"",sortable:!1},sc={...ic,width:48};function uc(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[];if(e.children)for(const a of e.children)uc(a,t);else t.push(e);return t}function cc(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:new Set;for(const a of e)a.key&&t.add(a.key),a.children&&cc(a.children,t);return t}function dc(e){if(e.key)return "data-table-group"===e.key?ic:["data-table-expand","data-table-select"].includes(e.key)?sc:void 0}function vc(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;return e.children?Math.max(t,...e.children.map((e=>vc(e,t+1)))):t}function pc(e,t){const a=[];let n=0;const l=function(){const e=(arguments.length>0&&void 0!==arguments[0]?arguments[0]:[]).map((e=>({element:e,priority:0})));return {enqueue:(t,a)=>{let n=!1;for(let l=0;l<e.length;l++)if(e[l].priority>a){e.splice(l,0,{element:t,priority:a}),n=!0;break}n||e.push({element:t,priority:a});},size:()=>e.length,count:()=>{let t=0;if(!e.length)return 0;const a=Math.floor(e[0].priority);for(let n=0;n<e.length;n++)Math.floor(e[n].priority)===a&&(t+=1);return t},dequeue:()=>e.shift()}}(e);for(;l.size()>0;){let e=l.count();const o=[];let r=1;for(;e>0;){const{element:a,priority:i}=l.dequeue(),s=t-n-vc(a);if(o.push({...a,rowspan:s??1,colspan:a.children?uc(a).length:1}),a.children)for(const e of a.children){const t=i%1+r/Math.pow(10,n+2);l.enqueue(e,n+s+t);}r+=1,e-=1;}n+=1,a.push(o);}return {columns:e.map((e=>uc(e))).flat(),headers:a}}function fc(e){const t=[];for(const a of e){const e={...dc(a),...a},n=e.key??("string"==typeof e.value?e.value:null),l=e.value??n??null,o={...e,key:n,value:l,sortable:e.sortable??(null!=e.key||!!e.sort),children:e.children?fc(e.children):void 0};t.push(o);}return t}function mc(e,t){const a=ref([]),n=ref([]),l=ref({}),o=ref({}),r=ref({});watchEffect((()=>{var i,s,u;const c=(e.headers||Object.keys(e.items[0]??{}).map((e=>({key:e,title:capitalize(e)})))).slice(),d=cc(c);(null==(i=null==t?void 0:t.groupBy)?void 0:i.value.length)&&!d.has("data-table-group")&&c.unshift({key:"data-table-group",title:"Group"}),(null==(s=null==t?void 0:t.showSelect)?void 0:s.value)&&!d.has("data-table-select")&&c.unshift({key:"data-table-select"}),(null==(u=null==t?void 0:t.showExpand)?void 0:u.value)&&!d.has("data-table-expand")&&c.push({key:"data-table-expand"});const v=fc(c);!function(e){let t=!1;function a(e){if(e)if(arguments.length>1&&void 0!==arguments[1]&&arguments[1]&&(e.fixed=!0),e.fixed)if(e.children)for(let t=e.children.length-1;t>=0;t--)a(e.children[t],!0);else t?isNaN(+e.width)&&Ja(`Multiple fixed columns should have a static width (key: ${e.key})`):e.lastFixed=!0,t=!0;else if(e.children)for(let t=e.children.length-1;t>=0;t--)a(e.children[t]);else t=!1;}for(let o=e.length-1;o>=0;o--)a(e[o]);function n(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;if(!e)return t;if(e.children){e.fixedOffset=t;for(const a of e.children)t=n(a,t);}else e.fixed&&(e.fixedOffset=t,t+=parseFloat(e.width||"0")||0);return t}let l=0;for(const o of e)l=n(o,l);}(v);const p=Math.max(...v.map((e=>vc(e))))+1,f=pc(v,p);a.value=f.headers,n.value=f.columns;const m=f.headers.flat(1);for(const e of m)e.key&&(e.sortable&&(e.sort&&(l.value[e.key]=e.sort),e.sortRaw&&(o.value[e.key]=e.sortRaw)),e.filter&&(r.value[e.key]=e.filter));}));const i={headers:a,columns:n,sortFunctions:l,sortRawFunctions:o,filterFunctions:r};return provide(rc,i),i}function gc(){const e=inject(rc);if(!e)throw new Error("Missing headers!");return e}const hc=wn({color:String,sticky:Boolean,disableSort:Boolean,multiSort:Boolean,sortAscIcon:{type:Fl,default:"$sortAsc"},sortDescIcon:{type:Fl,default:"$sortDesc"},headerProps:{type:Object},..._l(),...Yo()},"VDataTableHeaders"),yc=$n()({name:"VDataTableHeaders",props:hc(),setup(e,t){let{slots:a}=t;const{t:n}=tl(),{toggleSort:l,sortBy:o,isSorted:r}=Zu(),{someSelected:i,allSelected:s,selectAll:u,showSelectAll:c}=Ku(),{columns:d,headers:v}=gc(),{loaderClasses:p}=Ko(e);function f(t,a){if(e.sticky||t.fixed)return {position:"sticky",left:t.fixed?Rt(t.fixedOffset):void 0,top:e.sticky?`calc(var(--v-table-header-height) * ${a})`:void 0}}function m(t){const a=o.value.find((e=>e.key===t.key));return a?"asc"===a.order?e.sortAscIcon:e.sortDescIcon:e.sortAscIcon}const{backgroundColorClasses:g,backgroundColorStyles:h}=mo(e,"color"),{displayClasses:y,mobile:b}=Al(e),x=computed((()=>({headers:v.value,columns:d.value,toggleSort:l,isSorted:r,sortBy:o.value,someSelected:i.value,allSelected:s.value,selectAll:u,getSortIcon:m}))),S=computed((()=>["v-data-table__th",{"v-data-table__th--sticky":e.sticky},y.value,p.value])),C=t=>{let{column:n,x:d,y:v}=t;const p="data-table-select"===n.key||"data-table-expand"===n.key,y=mergeProps(e.headerProps??{},n.headerProps??{});return createVNode(ac,mergeProps({tag:"th",align:n.align,class:[{"v-data-table__th--sortable":n.sortable&&!e.disableSort,"v-data-table__th--sorted":r(n),"v-data-table__th--fixed":n.fixed},...S.value],style:{width:Rt(n.width),minWidth:Rt(n.minWidth),maxWidth:Rt(n.maxWidth),...f(n,v)},colspan:n.colspan,rowspan:n.rowspan,onClick:n.sortable?()=>l(n):void 0,fixed:n.fixed,nowrap:n.nowrap,lastFixed:n.lastFixed,noPadding:p},y),{default:()=>{var t;const d=`header.${n.key}`,v={column:n,selectAll:u,isSorted:r,toggleSort:l,sortBy:o.value,someSelected:i.value,allSelected:s.value,getSortIcon:m};return a[d]?a[d](v):"data-table-select"===n.key?(null==(t=a["header.data-table-select"])?void 0:t.call(a,v))??(c.value&&createVNode(As,{modelValue:s.value,indeterminate:i.value&&!s.value,"onUpdate:modelValue":u},null)):createVNode("div",{class:"v-data-table-header__content"},[createVNode("span",null,[n.title]),n.sortable&&!e.disableSort&&createVNode(To,{key:"icon",class:"v-data-table-header__sort-icon",icon:m(n)},null),e.multiSort&&r(n)&&createVNode("div",{key:"badge",class:["v-data-table-header__sort-badge",...g.value],style:h.value},[o.value.findIndex((e=>e.key===n.key))+1])])}})},w=()=>{const t=mergeProps(e.headerProps??{}??{}),c=computed((()=>d.value.filter((t=>(null==t?void 0:t.sortable)&&!e.disableSort)))),p=computed((()=>{if(null!=d.value.find((e=>"data-table-select"===e.key)))return s.value?"$checkboxOn":i.value?"$checkboxIndeterminate":"$checkboxOff"}));return createVNode(ac,mergeProps({tag:"th",class:[...S.value],colspan:v.value.length+1},t),{default:()=>[createVNode("div",{class:"v-data-table-header__content"},[createVNode(Iu,{chips:!0,class:"v-data-table__td-sort-select",clearable:!0,density:"default",items:c.value,label:n("$vuetify.dataTable.sortBy"),multiple:e.multiSort,variant:"underlined","onClick:clear":()=>o.value=[],appendIcon:p.value,"onClick:append":()=>u(!s.value)},{...a,chip:e=>{var t;return createVNode(Es,{onClick:(null==(t=e.item.raw)?void 0:t.sortable)?()=>l(e.item.raw):void 0,onMousedown:e=>{e.preventDefault(),e.stopPropagation();}},{default:()=>[e.item.title,createVNode(To,{class:["v-data-table__td-sort-icon",r(e.item.raw)&&"v-data-table__td-sort-icon-active"],icon:m(e.item.raw),size:"small"},null)]})}})])]})};zn((()=>b.value?createVNode("tr",null,[createVNode(w,null,null)]):createVNode(Fragment,null,[a.headers?a.headers(x.value):v.value.map(((e,t)=>createVNode("tr",null,[e.map(((e,a)=>createVNode(C,{column:e,x:a,y:t},null)))]))),e.loading&&createVNode("tr",{class:"v-data-table-progress"},[createVNode("th",{colspan:d.value.length},[createVNode(Go,{name:"v-data-table-progress",absolute:!0,active:!0,color:"boolean"==typeof e.loading?void 0:e.loading,indeterminate:!0},{default:a.loader})])])])));}}),bc=wn({item:{type:Object,required:!0}},"VDataTableGroupHeaderRow"),kc=$n()({name:"VDataTableGroupHeaderRow",props:bc(),setup(e,t){let{slots:a}=t;const{isGroupOpen:n,toggleGroup:l,extractRows:o}=$u(),{isSelected:r,isSomeSelected:i,select:s}=Ku(),{columns:u}=gc(),c=computed((()=>o([e.item])));return ()=>createVNode("tr",{class:"v-data-table-group-header-row",style:{"--v-data-table-group-header-row-depth":e.item.depth}},[u.value.map((t=>{var o,u;if("data-table-group"===t.key){const t=n(e.item)?"$expand":"$next",r=()=>l(e.item);return (null==(o=a["data-table-group"])?void 0:o.call(a,{item:e.item,count:c.value.length,props:{icon:t,onClick:r}}))??createVNode(ac,{class:"v-data-table-group-header-row__column"},{default:()=>[createVNode(br,{size:"small",variant:"text",icon:t,onClick:r},null),createVNode("span",null,[e.item.value]),createVNode("span",null,[createTextVNode("("),c.value.length,createTextVNode(")")])]})}if("data-table-select"===t.key){const e=r(c.value),t=i(c.value)&&!e,n=e=>s(c.value,e);return (null==(u=a["data-table-select"])?void 0:u.call(a,{props:{modelValue:e,indeterminate:t,"onUpdate:modelValue":n}}))??createVNode("td",null,[createVNode(As,{modelValue:e,indeterminate:t,"onUpdate:modelValue":n},null)])}return createVNode("td",null,null)}))])}}),xc=wn({index:Number,item:Object,cellProps:[Object,Function],onClick:ca(),onContextmenu:ca(),onDblclick:ca(),..._l()},"VDataTableRow"),Sc=$n()({name:"VDataTableRow",props:xc(),setup(e,t){let{slots:a}=t;const{displayClasses:n,mobile:l}=Al(e,"v-data-table__tr"),{isSelected:o,toggleSelect:r,someSelected:i,allSelected:s,selectAll:u}=Ku(),{isExpanded:c,toggleExpand:d}=Fu(),{toggleSort:v,sortBy:p,isSorted:f}=Zu(),{columns:m}=gc();zn((()=>createVNode("tr",{class:["v-data-table__tr",{"v-data-table__tr--clickable":!!(e.onClick||e.onContextmenu||e.onDblclick)},n.value],onClick:e.onClick,onContextmenu:e.onContextmenu,onDblclick:e.onDblclick},[e.item&&m.value.map(((t,n)=>{const m=e.item,g=`item.${t.key}`,h=`header.${t.key}`,y={index:e.index,item:m.raw,internalItem:m,value:$t(m.columns,t.key),column:t,isSelected:o,toggleSelect:r,isExpanded:c,toggleExpand:d},b={column:t,selectAll:u,isSorted:f,toggleSort:v,sortBy:p.value,someSelected:i.value,allSelected:s.value,getSortIcon:()=>""},k="function"==typeof e.cellProps?e.cellProps({index:y.index,item:y.item,internalItem:y.internalItem,value:y.value,column:t}):e.cellProps,x="function"==typeof t.cellProps?t.cellProps({index:y.index,item:y.item,internalItem:y.internalItem,value:y.value}):t.cellProps;return createVNode(ac,mergeProps({align:t.align,class:{"v-data-table__td--expanded-row":"data-table-expand"===t.key,"v-data-table__td--select-row":"data-table-select"===t.key},fixed:t.fixed,fixedOffset:t.fixedOffset,lastFixed:t.lastFixed,maxWidth:l.value?void 0:t.maxWidth,noPadding:"data-table-select"===t.key||"data-table-expand"===t.key,nowrap:t.nowrap,width:l.value?void 0:t.width},k,x),{default:()=>{var e,n,i,s,u;if(a[g]&&!l.value)return null==(e=a[g])?void 0:e.call(a,y);if("data-table-select"===t.key)return (null==(n=a["item.data-table-select"])?void 0:n.call(a,y))??createVNode(As,{disabled:!m.selectable,modelValue:o([m]),onClick:withModifiers((()=>r(m)),["stop"])},null);if("data-table-expand"===t.key)return (null==(i=a["item.data-table-expand"])?void 0:i.call(a,y))??createVNode(br,{icon:c(m)?"$collapse":"$expand",size:"small",variant:"text",onClick:withModifiers((()=>d(m)),["stop"])},null);const v=toDisplayString(y.value);return l.value?createVNode(Fragment,null,[createVNode("div",{class:"v-data-table__td-title"},[(null==(s=a[h])?void 0:s.call(a,b))??t.title]),createVNode("div",{class:"v-data-table__td-value"},[(null==(u=a[g])?void 0:u.call(a,y))??v])]):v}})}))])));}}),Cc=wn({loading:[Boolean,String],loadingText:{type:String,default:"$vuetify.dataIterator.loadingText"},hideNoData:Boolean,items:{type:Array,default:()=>[]},noDataText:{type:String,default:"$vuetify.noDataText"},rowProps:[Object,Function],cellProps:[Object,Function],..._l()},"VDataTableRows"),wc=$n()({name:"VDataTableRows",inheritAttrs:!1,props:Cc(),setup(e,t){let{attrs:a,slots:n}=t;const{columns:l}=gc(),{expandOnClick:o,toggleExpand:r,isExpanded:i}=Fu(),{isSelected:s,toggleSelect:u}=Ku(),{toggleGroup:c,isGroupOpen:d}=$u(),{t:v}=tl(),{mobile:p}=Al(e);return zn((()=>{var t,f;return !e.loading||e.items.length&&!n.loading?e.loading||e.items.length||e.hideNoData?createVNode(Fragment,null,[e.items.map(((t,v)=>{var f;if("group"===t.type){const e={index:v,item:t,columns:l.value,isExpanded:i,toggleExpand:r,isSelected:s,toggleSelect:u,toggleGroup:c,isGroupOpen:d};return n["group-header"]?n["group-header"](e):createVNode(kc,mergeProps({key:`group-header_${t.id}`,item:t},Nn(a,":group-header",(()=>e))),n)}const m={index:v,item:t.raw,internalItem:t,columns:l.value,isExpanded:i,toggleExpand:r,isSelected:s,toggleSelect:u},g={...m,props:mergeProps({key:`item_${t.key??t.index}`,onClick:o.value?()=>{r(t);}:void 0,index:v,item:t,cellProps:e.cellProps,mobile:p.value},Nn(a,":row",(()=>m)),"function"==typeof e.rowProps?e.rowProps({item:m.item,index:m.index,internalItem:m.internalItem}):e.rowProps)};return createVNode(Fragment,{key:g.props.key},[n.item?n.item(g):createVNode(Sc,g.props,n),i(t)&&(null==(f=n["expanded-row"])?void 0:f.call(n,m))])}))]):createVNode("tr",{class:"v-data-table-rows-no-data",key:"no-data"},[createVNode("td",{colspan:l.value.length},[(null==(f=n["no-data"])?void 0:f.call(n))??v(e.noDataText)])]):createVNode("tr",{class:"v-data-table-rows-loading",key:"loading"},[createVNode("td",{colspan:l.value.length},[(null==(t=n.loading)?void 0:t.call(n))??v(e.loadingText)])])})),{}}}),_c=wn({fixedHeader:Boolean,fixedFooter:Boolean,height:[Number,String],hover:Boolean,..._n(),...oo(),...vo(),...jl()},"VTable"),Ac=$n()({name:"VTable",props:_c(),setup(e,t){let{slots:a,emit:n}=t;const{themeClasses:l}=Wl(e),{densityClasses:o}=ro(e);return zn((()=>createVNode(e.tag,{class:["v-table",{"v-table--fixed-height":!!e.height,"v-table--fixed-header":e.fixedHeader,"v-table--fixed-footer":e.fixedFooter,"v-table--has-top":!!a.top,"v-table--has-bottom":!!a.bottom,"v-table--hover":e.hover},l.value,o.value,e.class],style:e.style},{default:()=>{var t,n,l;return [null==(t=a.top)?void 0:t.call(a),a.default?createVNode("div",{class:"v-table__wrapper",style:{height:Rt(e.height)}},[createVNode("table",null,[a.default()])]):null==(n=a.wrapper)?void 0:n.call(a),null==(l=a.bottom)?void 0:l.call(a)]}}))),{}}}),Ic=wn({items:{type:Array,default:()=>[]},itemValue:{type:[String,Array,Function],default:"id"},itemSelectable:{type:[String,Array,Function],default:null},rowProps:[Object,Function],cellProps:[Object,Function],returnObject:Boolean},"DataTable-items");function Pc(e,t,a){return t.map(((t,n)=>function(e,t,a,n){const l=e.returnObject?t:Mt(t,e.itemValue),o=Mt(t,e.itemSelectable,!0),r=n.reduce(((e,a)=>(null!=a.key&&(e[a.key]=Mt(t,a.value)),e)),{});return {type:"item",key:e.returnObject?Mt(t,e.itemValue):l,index:a,value:l,selectable:o,columns:r,raw:t}}(e,t,n,a)))}const Vc=wn({...Cc(),hideDefaultBody:Boolean,hideDefaultFooter:Boolean,hideDefaultHeader:Boolean,width:[String,Number],search:String,...Du(),...Eu(),...oc(),...Ic(),...Uu(),...Gu(),...hc(),..._c()},"DataTable"),Bc=wn({...Nu(),...Vc(),...Vu(),...ec()},"VDataTable"),Dc=$n()({name:"VDataTable",props:Bc(),emits:{"update:modelValue":e=>!0,"update:page":e=>!0,"update:itemsPerPage":e=>!0,"update:sortBy":e=>!0,"update:options":e=>!0,"update:groupBy":e=>!0,"update:expanded":e=>!0,"update:currentItems":e=>!0},setup(e,t){let{attrs:a,slots:n}=t;const{groupBy:l}=function(e){return {groupBy:Un(e,"groupBy")}}(e),{sortBy:o,multiSort:r,mustSort:s}=function(e){return {sortBy:Un(e,"sortBy"),mustSort:toRef(e,"mustSort"),multiSort:toRef(e,"multiSort")}}(e),{page:u,itemsPerPage:c}=function(e){return {page:Un(e,"page",void 0,(e=>+(e??1))),itemsPerPage:Un(e,"itemsPerPage",void 0,(e=>+(e??10)))}}(e),{columns:v,headers:p,sortFunctions:f,sortRawFunctions:m,filterFunctions:g}=mc(e,{groupBy:l,showSelect:toRef(e,"showSelect"),showExpand:toRef(e,"showExpand")}),{items:h}=function(e,t){return {items:computed((()=>Pc(e,e.items,t.value)))}}(e,v),b=toRef(e,"search"),{filteredItems:S}=Bu(e,h,b,{transform:e=>e.columns,customKeyFilter:g}),{toggleSort:C}=function(e){const{sortBy:t,mustSort:a,multiSort:n,page:l}=e,o={sortBy:t,toggleSort:e=>{if(null==e.key)return;let o=t.value.map((e=>({...e})))??[];const r=o.find((t=>t.key===e.key));r?"desc"===r.order?a.value?r.order="asc":o=o.filter((t=>t.key!==e.key)):r.order="desc":o=n.value?[...o,{key:e.key,order:"asc"}]:[{key:e.key,order:"asc"}],t.value=o,l&&(l.value=1);},isSorted:function(e){return !!t.value.find((t=>t.key===e.key))}};return provide(qu,o),o}({sortBy:o,multiSort:r,mustSort:s,page:u}),{sortByWithGroups:w,opened:_,extractRows:I,isGroupOpen:P,toggleGroup:B}=function(e){const{groupBy:t,sortBy:a}=e,n=ref(new Set);function l(e){return n.value.has(e.id)}const o={sortByWithGroups:computed((()=>t.value.map((e=>({...e,order:e.order??!1}))).concat(a.value))),toggleGroup:function(e){const t=new Set(n.value);l(e)?t.delete(e.id):t.add(e.id),n.value=t;},opened:n,groupBy:t,extractRows:function(e){return function e(t){const a=[];for(const n of t.items)"type"in n&&"group"===n.type?a.push(...e(n)):a.push(n);return a}({type:"group",items:e,id:"dummy",key:"dummy",value:"dummy",depth:0})},isGroupOpen:l};return provide(Tu,o),o}({groupBy:l,sortBy:o}),{sortedItems:D}=Qu(e,S,w,{transform:e=>e.columns,sortFunctions:f,sortRawFunctions:m}),{flatItems:E}=Ru(D,l,_),T=computed((()=>E.value.length)),{startIndex:$,stopIndex:M,pageCount:L,setItemsPerPage:R}=function(e){const{page:t,itemsPerPage:a,itemsLength:n}=e,l=computed((()=>-1===a.value?0:a.value*(t.value-1))),o=computed((()=>-1===a.value?n.value:Math.min(n.value,l.value+a.value))),r=computed((()=>-1===a.value||0===n.value?1:Math.ceil(n.value/a.value)));watchEffect((()=>{t.value>r.value&&(t.value=r.value);}));const i={page:t,itemsPerPage:a,startIndex:l,stopIndex:o,pageCount:r,itemsLength:n,nextPage:function(){t.value=ea(t.value+1,1,r.value);},prevPage:function(){t.value=ea(t.value-1,1,r.value);},setPage:function(e){t.value=ea(e,1,r.value);},setItemsPerPage:function(e){a.value=e,t.value=1;}};return provide(ju,i),i}({page:u,itemsPerPage:c,itemsLength:T}),{paginatedItems:N}=function(e){const t=An("usePaginatedItems"),{items:a,startIndex:n,stopIndex:l,itemsPerPage:o}=e,r=computed((()=>o.value<=0?a.value:a.value.slice(n.value,l.value)));return watch(r,(e=>{t.emit("update:currentItems",e);})),{paginatedItems:r}}({items:E,startIndex:$,stopIndex:M,itemsPerPage:c}),j=computed((()=>I(N.value))),{isSelected:H,select:W,selectAll:z,toggleSelect:U,someSelected:Y,allSelected:K}=function(e,t){let{allItems:a,currentPage:n}=t;const l=Un(e,"modelValue",e.modelValue,(t=>new Set(Jt(t).map((t=>{var n;return (null==(n=a.value.find((a=>e.valueComparator(t,a.value))))?void 0:n.value)??t})))),(e=>[...e.values()])),o=computed((()=>a.value.filter((e=>e.selectable)))),r=computed((()=>n.value.filter((e=>e.selectable)))),i=computed((()=>{if("object"==typeof e.selectStrategy)return e.selectStrategy;switch(e.selectStrategy){case"single":return Hu;case"all":return zu;default:return Wu}}));function s(e){return Jt(e).every((e=>l.value.has(e.value)))}function u(e,t){const a=i.value.select({items:e,value:t,selected:new Set(l.value)});l.value=a;}const c=computed((()=>l.value.size>0)),d=computed((()=>{const e=i.value.allSelected({allItems:o.value,currentPage:r.value});return !!e.length&&s(e)})),v={toggleSelect:function(e){u([e],!s([e]));},select:u,selectAll:function(e){const t=i.value.selectAll({value:e,allItems:o.value,currentPage:r.value,selected:new Set(l.value)});l.value=t;},isSelected:s,isSomeSelected:function(e){return Jt(e).some((e=>l.value.has(e.value)))},someSelected:c,allSelected:d,showSelectAll:computed((()=>i.value.showSelectAll))};return provide(Yu,v),v}(e,{allItems:h,currentPage:j}),{isExpanded:G,toggleExpand:q}=function(e){const t=toRef(e,"expandOnClick"),a=Un(e,"expanded",e.expanded,(e=>new Set(e)),(e=>[...e.values()]));function n(e,t){const n=new Set(a.value);t?n.add(e.value):n.delete(e.value),a.value=n;}function l(e){return a.value.has(e.value)}const o={expand:n,expanded:a,expandOnClick:t,isExpanded:l,toggleExpand:function(e){n(e,!l(e));}};return provide(Ou,o),o}(e);!function(e){let{page:t,itemsPerPage:a,sortBy:n,groupBy:l,search:o}=e;const r=An("VDataTable"),i=computed((()=>({page:t.value,itemsPerPage:a.value,sortBy:n.value,groupBy:l.value,search:o.value})));let s=null;watch(i,(()=>{Tt(s,i.value)||(s&&s.search!==i.value.search&&(t.value=1),r.emit("update:options",i.value),s=i.value);}),{deep:!0,immediate:!0});}({page:u,itemsPerPage:c,sortBy:o,groupBy:l,search:b}),Fn({VDataTableRows:{hideNoData:toRef(e,"hideNoData"),noDataText:toRef(e,"noDataText"),loading:toRef(e,"loading"),loadingText:toRef(e,"loadingText")}});const Z=computed((()=>({page:u.value,itemsPerPage:c.value,sortBy:o.value,pageCount:L.value,toggleSort:C,setItemsPerPage:R,someSelected:Y.value,allSelected:K.value,isSelected:H,select:W,selectAll:z,toggleSelect:U,isExpanded:G,toggleExpand:q,isGroupOpen:P,toggleGroup:B,items:j.value.map((e=>e.raw)),internalItems:j.value,groupedItems:N.value,columns:v.value,headers:p.value})));return zn((()=>{const t=tc.filterProps(e),l=yc.filterProps(e),o=wc.filterProps(e),r=Ac.filterProps(e);return createVNode(Ac,mergeProps({class:["v-data-table",{"v-data-table--show-select":e.showSelect,"v-data-table--loading":e.loading},e.class],style:e.style},r),{top:()=>{var e;return null==(e=n.top)?void 0:e.call(n,Z.value)},default:()=>{var t,r,i,s,u,c;return n.default?n.default(Z.value):createVNode(Fragment,null,[null==(t=n.colgroup)?void 0:t.call(n,Z.value),!e.hideDefaultHeader&&createVNode("thead",{key:"thead"},[createVNode(yc,l,n)]),null==(r=n.thead)?void 0:r.call(n,Z.value),!e.hideDefaultBody&&createVNode("tbody",null,[null==(i=n["body.prepend"])?void 0:i.call(n,Z.value),n.body?n.body(Z.value):createVNode(wc,mergeProps(a,o,{items:N.value}),n),null==(s=n["body.append"])?void 0:s.call(n,Z.value)]),null==(u=n.tbody)?void 0:u.call(n,Z.value),null==(c=n.tfoot)?void 0:c.call(n,Z.value)])},bottom:()=>n.bottom?n.bottom(Z.value):!e.hideDefaultFooter&&createVNode(Fragment,null,[createVNode(iu,null,null),createVNode(tc,t,{prepend:n["footer.prepend"]})])})})),{}}}),Oc=[st,At,Pt,Vt,Bt,We((e=>{const t=eo({locale:{locale:"pt",messages:{pt:cs}},components:{VDateInput:us},defaults:{VAutocomplete:{noDataText:"Não há dados correspondentes",hideDetails:!0,density:"compact",clearable:!0},VTextField:{density:"compact"},VDataTable:{density:"compact"}}});e.vueApp.use(t),e.vueApp.use(Dc),e.vueApp.use(De);}))];function Fc(e={}){e.estimatedProgress;const o=Ue(),r=ref(0),i=ref(!1),s=ref(!1);function u(e=0){if(!o.isHydrating){if(e>=100)return c();r.value=e<0?0:e,i.value=!0;}}function c(e={}){r.value=100,e.error&&(s.value=!0),e.force&&(r.value=0,i.value=!1);}return {_cleanup:()=>{},progress:computed((()=>r.value)),isLoading:computed((()=>i.value)),error:computed((()=>s.value)),start:()=>{s.value=!1,u(0);},set:u,finish:c,clear:function(){}}}const Ec=defineComponent({name:"NuxtLoadingIndicator",props:{throttle:{type:Number,default:200},duration:{type:Number,default:2e3},height:{type:Number,default:3},color:{type:[String,Boolean],default:"repeating-linear-gradient(to right,#00dc82 0%,#34cdfe 50%,#0047e1 100%)"},errorColor:{type:String,default:"repeating-linear-gradient(to right,#f87171 0%,#ef4444 100%)"},estimatedProgress:{type:Function,required:!1}},setup(e,{slots:t,expose:a}){const{progress:n,isLoading:l,error:o,start:r,finish:i,clear:s}=function(e={}){const t=Ue();return t._loadingIndicator=t._loadingIndicator||Fc(e)}({duration:e.duration,throttle:e.throttle,estimatedProgress:e.estimatedProgress});return a({progress:n,isLoading:l,error:o,start:r,finish:i,clear:s}),()=>h("div",{class:"nuxt-loading-indicator",style:{position:"fixed",top:0,right:0,left:0,pointerEvents:"none",width:"auto",height:`${e.height}px`,opacity:l.value?1:0,background:o.value?e.errorColor:e.color||void 0,backgroundSize:100/n.value*100+"% auto",transform:`scaleX(${n.value}%)`,transformOrigin:"left",transition:"transform 0.1s, height 0.4s, opacity 0.4s",zIndex:999999}},t)}}),Tc={default:()=>import('./default-DXxZteQ5.mjs').then((e=>e.default||e))},$c=defineComponent({name:"LayoutLoader",inheritAttrs:!1,props:{name:String,layoutProps:Object},async setup(e,t){const a=await Tc[e.name]().then((e=>e.default||e));return ()=>h(a,e.layoutProps,t.slots)}}),Mc=defineComponent({name:"NuxtLayout",inheritAttrs:!1,props:{name:{type:[String,Boolean,Object],default:null},fallback:{type:[String,Object],default:null}},setup(e,t){const a=Ue(),n=inject(qe),l=n===Qe()?useRoute():n,o=computed((()=>{let t=unref(e.name)??l.meta.layout??"default";return t&&!(t in Tc)&&e.fallback&&(t=unref(e.fallback)),t})),i=ref();t.expose({layoutRef:i});const s=a.deferHydration();return ()=>{const a=o.value&&o.value in Tc,n=l.meta.layoutTransition??false;return gt(Transition,a&&n,{default:()=>h(Suspense,{suspensible:!0,onResolve:()=>{nextTick(s);}},{default:()=>h(Lc,{layoutProps:mergeProps(t.attrs,{ref:i}),key:o.value||void 0,name:o.value,shouldProvide:!e.name,hasTransition:!!n},t.slots)})}).default()}}}),Lc=defineComponent({name:"NuxtLayoutProvider",inheritAttrs:!1,props:{name:{type:[String,Boolean]},layoutProps:{type:Object},hasTransition:{type:Boolean},shouldProvide:{type:Boolean}},setup(e,t){const a=e.name;return e.shouldProvide&&provide(Ge,{isCurrent:e=>a===(e.meta.layout??"default")}),()=>{var n,l;return !a||"string"==typeof a&&!(a in Tc)?null==(l=(n=t.slots).default)?void 0:l.call(n):h($c,{key:a,layoutProps:e.layoutProps,name:a},t.slots)}}}),Rc=defineComponent({props:{vnode:{type:Object,required:!0},route:{type:Object,required:!0},vnodeRef:Object,renderKey:String,trackRootNodes:Boolean},setup(e){const a=e.renderKey,n=e.route,l={};for(const t in e.route)Object.defineProperty(l,t,{get:()=>a===e.renderKey?e.route[t]:n[t]});return provide(qe,shallowReactive(l)),()=>h(e.vnode,{ref:e.vnodeRef})}}),Nc=defineComponent({name:"NuxtPage",inheritAttrs:!1,props:{name:{type:String},transition:{type:[Boolean,Object],default:void 0},keepalive:{type:[Boolean,Object],default:void 0},route:{type:Object},pageKey:{type:[Function,String],default:null}},setup(e,{attrs:t,slots:a,expose:n}){const l=Ue(),o=ref(),i=inject(qe,null);let s,u;n({pageRef:o}),inject(Ge,null);const v=l.deferHydration();return e.pageKey&&watch((()=>e.pageKey),((e,t)=>{e!==t&&l.callHook("page:loading:start");})),()=>h(RouterView,{name:e.name,route:e.route,...t},{default:t=>{if(!t.Component)return void v();const n=((e,t)=>{const a=e.route.matched.find((t=>{var a;return (null==(a=t.components)?void 0:a.default)===e.Component.type})),n=t??(null==a?void 0:a.meta.key)??(a&&(l=e.route,a.path.replace(/(:\w+)\([^)]+\)/g,"$1").replace(/(:\w+)[?+*]/g,"$1").replace(/:\w+/g,(e=>{var t;return (null==(t=l.params[e.slice(1)])?void 0:t.toString())||""}))));var l;return "function"==typeof n?n(e.route):n})(t,e.pageKey);l.isHydrating||function(e,t,a){if(!e)return !1;return t.matched.findIndex((e=>{var t;return (null==(t=e.components)?void 0:t.default)===(null==a?void 0:a.type)}))<t.matched.length-1}(i,t.route,t.Component)||s!==n||l.callHook("page:loading:end"),s=n;const r=!!(e.transition??t.route.meta.pageTransition??Te),d=r&&function(e){const t=e.map((e=>({...e,onAfterLeave:e.onAfterLeave?ft(e.onAfterLeave):void 0})));return defu(...t)}([e.transition,t.route.meta.pageTransition,Te,{onAfterLeave:()=>{l.callHook("page:transition:finish",t.Component);}}].filter(Boolean));e.keepalive??t.route.meta.keepalive;var p;return u=gt(Transition,r&&d,(p=h(Suspense,{suspensible:!0,onPending:()=>l.callHook("page:start",t.Component),onResolve:()=>{nextTick((()=>l.callHook("page:finish",t.Component).then((()=>l.callHook("page:loading:end"))).finally(v)));}},{default:()=>h(Rc,{key:n||void 0,vnode:a.default?h(Fragment,void 0,a.default(t)):t.Component,route:t.route,renderKey:n||void 0,trackRootNodes:r,vnodeRef:o})}),{default:()=>p})).default(),u}})}});const jc=(e,t)=>{const a=e.__vccOpts||e;for(const[n,l]of t)a[n]=l;return a},Hc={};const Wc=Hc.setup;Hc.setup=(e,t)=>{const a=useSSRContext();return (a.modules||(a.modules=new Set)).add("app.vue"),Wc?Wc(e,t):void 0};const zc=jc(Hc,[["ssrRender",function(e,t,a,n){const l=Ec,o=Mc,r=Nc;t("\x3c!--[--\x3e"),t(ssrRenderComponent(l,null,null,a)),t(ssrRenderComponent(o,null,{default:withCtx(((e,t,a,n)=>{if(!t)return [createVNode(vs,null,{default:withCtx((()=>[createVNode(r)])),_:1})];t(ssrRenderComponent(vs,null,{default:withCtx(((e,t,a,n)=>{if(!t)return [createVNode(r)];t(ssrRenderComponent(r,null,null,a,n));})),_:1},a,n));})),_:1},a)),t("\x3c!--]--\x3e");}]]),Uc={__name:"nuxt-error-page",__ssrInlineRender:!0,props:{error:Object},setup(e){const t=e.error;t.stack&&t.stack.split("\n").splice(1).map((e=>({text:e.replace("webpack:/","").replace(".vue",".js").trim(),internal:e.includes("node_modules")&&!e.includes(".cache")||e.includes("internal")||e.includes("new Promise")}))).map((e=>`<span class="stack${e.internal?" internal":""}">${e.text}</span>`)).join("\n");const a=Number(t.statusCode||500),n=404===a,l=t.statusMessage??(n?"Page Not Found":"Internal Server Error"),o=t.message||t.toString(),r=defineAsyncComponent((()=>import('./error-404-CdAMvynQ.mjs').then((e=>e.default||e)))),i=defineAsyncComponent((()=>import('./error-500-BQi5fBCD.mjs').then((e=>e.default||e)))),s=n?r:i;return (e,t,n,r)=>{t(ssrRenderComponent(unref(s),mergeProps({statusCode:unref(a),statusMessage:unref(l),description:unref(o),stack:unref(undefined)},r),null,n));}}},Yc=Uc.setup;Uc.setup=(e,t)=>{const a=useSSRContext();return (a.modules||(a.modules=new Set)).add("node_modules/nuxt/dist/app/components/nuxt-error-page.vue"),Yc?Yc(e,t):void 0};const Kc={__name:"nuxt-root",__ssrInlineRender:!0,setup(e){const t=()=>null,a=Ue();a.deferHydration(),a.ssrContext.url;const n=!1;provide(qe,Qe()),a.hooks.callHookWith((e=>e.map((e=>e()))),"vue:setup");const l=tt(),o=l.value&&!a.ssrContext.error;onErrorCaptured(((e,t,n)=>{a.hooks.callHook("vue:error",e,t,n).catch((e=>console.error("[nuxt] Error in `vue:error` hook",e)));{const t=a.runWithContext((()=>at(e)));return onServerPrefetch((()=>t)),!1}}));const r=a.ssrContext.islandContext;return (e,a,i,s)=>{ssrRenderSuspense(a,{default:()=>{unref(o)?a("<div></div>"):unref(l)?a(ssrRenderComponent(unref(Uc),{error:unref(l)},null,i)):unref(r)?a(ssrRenderComponent(unref(t),{context:unref(r)},null,i)):unref(n)?ssrRenderVNode(a,createVNode(resolveDynamicComponent(unref(n)),null,null),i):a(ssrRenderComponent(unref(zc),null,null,i));},_:1});}}},Gc=Kc.setup;let qc;Kc.setup=(e,t)=>{const a=useSSRContext();return (a.modules||(a.modules=new Set)).add("node_modules/nuxt/dist/app/components/nuxt-root.vue"),Gc?Gc(e,t):void 0},qc=async function(l){const o=createApp(Kc),r=function(l){let o=0;const r={_name:Re,_scope:effectScope(),provide:void 0,globalName:"nuxt",versions:{get nuxt(){return "3.12.2"},get vue(){return r.vueApp.version}},payload:shallowReactive({data:shallowReactive({}),state:reactive({}),once:new Set,_errors:shallowReactive({})}),static:{data:{}},runWithContext:e=>r._scope.active&&!getCurrentScope()?r._scope.run((()=>ze(r,e))):ze(r,e),isHydrating:!1,deferHydration(){if(!r.isHydrating)return ()=>{};o++;let e=!1;return ()=>{if(!e)return e=!0,o--,0===o?(r.isHydrating=!1,r.callHook("app:suspense:resolve")):void 0}},_asyncDataPromises:{},_asyncData:shallowReactive({}),_payloadRevivers:{},...l};r.payload.serverRendered=!0,r.hooks=createHooks(),r.hook=r.hooks.hook;{const e=async function(e,t){for(const a of e)await r.runWithContext((()=>a(...t)));};r.hooks.callHook=(t,...a)=>r.hooks.callHookWith(e,t,...a);}r.callHook=r.hooks.callHook,r.provide=(e,t)=>{const a="$"+e;Ke(r,a,t),Ke(r.vueApp.config.globalProperties,a,t);},Ke(r.vueApp,"$nuxt",r),Ke(r.vueApp.config.globalProperties,"$nuxt",r),r.ssrContext&&(r.ssrContext.nuxt=r,r.ssrContext._payloadReducers={},r.payload.path=r.ssrContext.url),r.ssrContext=r.ssrContext||{},r.ssrContext.payload&&Object.assign(r.payload,r.ssrContext.payload),r.ssrContext.payload=r.payload,r.ssrContext.config={public:l.ssrContext.runtimeConfig.public,app:l.ssrContext.runtimeConfig.app};const i=l.ssrContext.runtimeConfig;return r.provide("config",i),r}({vueApp:o,ssrContext:l});try{await async function(e,t){var a,n,l,o;const r=[],i=[],s=[],u=[];let c=0;async function d(a){var n;const l=(null==(n=a.dependsOn)?void 0:n.filter((e=>t.some((t=>t._name===e))&&!r.includes(e))))??[];if(l.length>0)i.push([new Set(l),a]);else {const t=async function(e,t){if("function"==typeof t){const{provide:a}=await e.runWithContext((()=>t(e)))||{};if(a&&"object"==typeof a)for(const t in a)e.provide(t,a[t]);}}(e,a).then((async()=>{a._name&&(r.push(a._name),await Promise.all(i.map((async([e,t])=>{e.has(a._name)&&(e.delete(a._name),0===e.size&&(c++,await d(t)));}))));}));a.parallel?s.push(t.catch((e=>u.push(e)))):await t;}}for(const v of t)(null==(a=e.ssrContext)?void 0:a.islandContext)&&!1===(null==(n=v.env)?void 0:n.islands)||He(e,v);for(const v of t)(null==(l=e.ssrContext)?void 0:l.islandContext)&&!1===(null==(o=v.env)?void 0:o.islands)||await d(v);if(await Promise.all(s),c)for(let v=0;v<c;v++)await Promise.all(s);if(u.length)throw u[0]}(r,Oc),await r.hooks.callHook("app:created",o);}catch(i){await r.hooks.callHook("app:error",i),r.payload.error=r.payload.error||nt(i);}if(null==l?void 0:l._renderResponse)throw new Error("skipping render");return o};const Zc=e=>qc(e);

export { Qo as $, vo as A, Mn as B, oo as C, bs as D, To as E, ao as F, Ro as G, io as H, Fl as I, Yo as J, Ho as K, Zo as L, uo as M, Jo as N, jl as O, yo as P, Wl as Q, hr as R, no as S, bo as T, ro as U, br as V, No as W, so as X, Ko as Y, Wo as Z, jc as _, Je as a, Xl as a$, co as a0, Xo as a1, gs as a2, Go as a3, ho as a4, al as a5, Vu as a6, _u as a7, Gt as a8, rs as a9, hs as aA, Si as aB, Ar as aC, Rt as aD, ta as aE, Lt as aF, ea as aG, Yr as aH, Wt as aI, mo as aJ, Yi as aK, as as aL, Ki as aM, ns as aN, Hi as aO, yr as aP, Fa as aQ, Rn as aR, Vs as aS, Nt as aT, Bs as aU, Iu as aV, Xr as aW, fs as aX, Gr as aY, Zl as aZ, Dt as a_, _r as aa, tl as ab, pu as ac, fo as ad, es as ae, Bu as af, wu as ag, Li as ah, hu as ai, nu as aj, Cu as ak, As as al, ya as am, Es as an, ga as ao, Jt as ap, ha as aq, hl as ar, Sr as as, Dc as at, Lo as au, zt as av, _o as aw, Co as ax, xi as ay, wo as az, Ye as b, Ql as b0, vs as b1, tu as b2, Qe as c, Ct as d, Zc as default, is as e, Ue as f, Me as g, nt as h, it as i, Le as j, xt as k, Hr as l, Oi as m, $e as n, $n as o, wn as p, Un as q, lt as r, Ci as s, zn as t, Ze as u, $i as v, Fi as w, Bo as x, _n as y, Fn as z };
=======
function executeAsync(function_) {
  const restores = [];
  for (const leaveHandler of asyncHandlers) {
    const restore2 = leaveHandler();
    if (restore2) {
      restores.push(restore2);
    }
  }
  const restore = () => {
    for (const restore2 of restores) {
      restore2();
    }
  };
  let awaitable = function_();
  if (awaitable && typeof awaitable === "object" && "catch" in awaitable) {
    awaitable = awaitable.catch((error) => {
      restore();
      throw error;
    });
  }
  return [awaitable, restore];
}
const interpolatePath = (route, match) => {
  return match.path.replace(/(:\w+)\([^)]+\)/g, "$1").replace(/(:\w+)[?+*]/g, "$1").replace(/:\w+/g, (r) => {
    var _a;
    return ((_a = route.params[r.slice(1)]) == null ? void 0 : _a.toString()) || "";
  });
};
const generateRouteKey$1 = (routeProps, override) => {
  const matchedRoute = routeProps.route.matched.find((m) => {
    var _a;
    return ((_a = m.components) == null ? void 0 : _a.default) === routeProps.Component.type;
  });
  const source = override ?? (matchedRoute == null ? void 0 : matchedRoute.meta.key) ?? (matchedRoute && interpolatePath(routeProps.route, matchedRoute));
  return typeof source === "function" ? source(routeProps.route) : source;
};
const wrapInKeepAlive = (props, children) => {
  return { default: () => children };
};
function toArray(value) {
  return Array.isArray(value) ? value : [value];
}
async function getRouteRules(url) {
  {
    const _routeRulesMatcher = toRouteMatcher(
      createRouter$1({ routes: (/* @__PURE__ */ useRuntimeConfig()).nitro.routeRules })
    );
    return defu({}, ..._routeRulesMatcher.matchAll(url).reverse());
  }
}
const __nuxt_page_meta = {
  layout: "false"
};
const _routes = [
  {
    name: "fontes-atos-autencidade",
    path: "/fontes/atos/autencidade",
    component: () => import('./autencidade-53w3hMxo.mjs').then((m) => m.default || m)
  },
  {
    name: "fontes-atos-autenticacao-autenticacao",
    path: "/fontes/atos/autenticacao/autenticacao",
    component: () => import('./autenticacao-V96Qjjsm.mjs').then((m) => m.default || m)
  },
  {
    name: "fontes-atos-semelhanca",
    path: "/fontes/atos/semelhanca",
    component: () => import('./semelhanca-CPE0k2FF.mjs').then((m) => m.default || m)
  },
  {
    name: "index",
    path: "/",
    component: () => import('./index-CjWD5RTQ.mjs').then((m) => m.default || m)
  },
  {
    name: "login",
    path: "/login",
    meta: __nuxt_page_meta || {},
    component: () => import('./index-4EDSOmsR.mjs').then((m) => m.default || m)
  },
  {
    name: "ordens-servicos-atualizar-id",
    path: "/ordens-servicos/atualizar/:id()",
    component: () => import('./_id_-CdGn3OT4.mjs').then((m) => m.default || m)
  },
  {
    name: "ordens-servicos-criar-ato",
    path: "/ordens-servicos/criar-ato",
    component: () => import('./criar-ato-NZbza6Th.mjs').then((m) => m.default || m)
  },
  {
    name: "ordens-servicos-criar-registro",
    path: "/ordens-servicos/criar-registro",
    component: () => import('./criar-registro-Ca05Xzpn.mjs').then((m) => m.default || m)
  },
  {
    name: "ordens-servicos",
    path: "/ordens-servicos",
    component: () => import('./index-noqrYYLJ.mjs').then((m) => m.default || m)
  },
  {
    name: "pessoas-atualizar-id",
    path: "/pessoas/atualizar/:id()",
    component: () => import('./_id_-F4xaAc3q.mjs').then((m) => m.default || m)
  },
  {
    name: "pessoas-cadastro",
    path: "/pessoas/cadastro",
    component: () => import('./index-CYd8CcOZ.mjs').then((m) => m.default || m)
  },
  {
    name: "pessoas-registros",
    path: "/pessoas/registros",
    component: () => import('./index-B84c-O_y.mjs').then((m) => m.default || m)
  },
  {
    name: "pessoas-vizualizar-id",
    path: "/pessoas/vizualizar/:id()",
    component: () => import('./_id_-DAs6QZGK.mjs').then((m) => m.default || m)
  }
];
const _wrapIf = (component, props, slots) => {
  props = props === true ? {} : props;
  return { default: () => {
    var _a;
    return props ? h(component, props, slots) : (_a = slots.default) == null ? void 0 : _a.call(slots);
  } };
};
function generateRouteKey(route) {
  const source = (route == null ? void 0 : route.meta.key) ?? route.path.replace(/(:\w+)\([^)]+\)/g, "$1").replace(/(:\w+)[?+*]/g, "$1").replace(/:\w+/g, (r) => {
    var _a;
    return ((_a = route.params[r.slice(1)]) == null ? void 0 : _a.toString()) || "";
  });
  return typeof source === "function" ? source(route) : source;
}
function isChangingPage(to, from) {
  if (to === from || from === START_LOCATION) {
    return false;
  }
  if (generateRouteKey(to) !== generateRouteKey(from)) {
    return true;
  }
  const areComponentsSame = to.matched.every(
    (comp, index) => {
      var _a, _b;
      return comp.components && comp.components.default === ((_b = (_a = from.matched[index]) == null ? void 0 : _a.components) == null ? void 0 : _b.default);
    }
  );
  if (areComponentsSame) {
    return false;
  }
  return true;
}
const routerOptions0 = {
  scrollBehavior(to, from, savedPosition) {
    var _a;
    const nuxtApp = useNuxtApp();
    const behavior = ((_a = useRouter$1().options) == null ? void 0 : _a.scrollBehaviorType) ?? "auto";
    let position = savedPosition || void 0;
    const routeAllowsScrollToTop = typeof to.meta.scrollToTop === "function" ? to.meta.scrollToTop(to, from) : to.meta.scrollToTop;
    if (!position && from && to && routeAllowsScrollToTop !== false && isChangingPage(to, from)) {
      position = { left: 0, top: 0 };
    }
    if (to.path === from.path) {
      if (from.hash && !to.hash) {
        return { left: 0, top: 0 };
      }
      if (to.hash) {
        return { el: to.hash, top: _getHashElementScrollMarginTop(to.hash), behavior };
      }
      return false;
    }
    const hasTransition = (route) => !!(route.meta.pageTransition ?? appPageTransition);
    const hookToWait = hasTransition(from) && hasTransition(to) ? "page:transition:finish" : "page:finish";
    return new Promise((resolve) => {
      nuxtApp.hooks.hookOnce(hookToWait, async () => {
        await new Promise((resolve2) => setTimeout(resolve2, 0));
        if (to.hash) {
          position = { el: to.hash, top: _getHashElementScrollMarginTop(to.hash), behavior };
        }
        resolve(position);
      });
    });
  }
};
function _getHashElementScrollMarginTop(selector) {
  try {
    const elem = (void 0).querySelector(selector);
    if (elem) {
      return Number.parseFloat(getComputedStyle(elem).scrollMarginTop);
    }
  } catch {
  }
  return 0;
}
const configRouterOptions = {
  hashMode: false,
  scrollBehaviorType: "auto"
};
const routerOptions = {
  ...configRouterOptions,
  ...routerOptions0
};
const validate = /* @__PURE__ */ defineNuxtRouteMiddleware(async (to) => {
  var _a;
  let __temp, __restore;
  if (!((_a = to.meta) == null ? void 0 : _a.validate)) {
    return;
  }
  useNuxtApp();
  useRouter$1();
  const result = ([__temp, __restore] = executeAsync(() => Promise.resolve(to.meta.validate(to))), __temp = await __temp, __restore(), __temp);
  if (result === true) {
    return;
  }
  {
    return result;
  }
});
function useRequestEvent(nuxtApp = useNuxtApp()) {
  var _a;
  return (_a = nuxtApp.ssrContext) == null ? void 0 : _a.event;
}
function useRequestFetch() {
  var _a;
  return ((_a = useRequestEvent()) == null ? void 0 : _a.$fetch) || globalThis.$fetch;
}
const CookieDefaults = {
  path: "/",
  watch: true,
  decode: (val) => destr(decodeURIComponent(val)),
  encode: (val) => encodeURIComponent(typeof val === "string" ? val : JSON.stringify(val))
};
function useCookie(name, _opts) {
  var _a;
  const opts = { ...CookieDefaults, ..._opts };
  const cookies = readRawCookies(opts) || {};
  let delay;
  if (opts.maxAge !== void 0) {
    delay = opts.maxAge * 1e3;
  } else if (opts.expires) {
    delay = opts.expires.getTime() - Date.now();
  }
  const hasExpired = delay !== void 0 && delay <= 0;
  const cookieValue = klona(hasExpired ? void 0 : cookies[name] ?? ((_a = opts.default) == null ? void 0 : _a.call(opts)));
  const cookie = ref(cookieValue);
  {
    const nuxtApp = useNuxtApp();
    const writeFinalCookieValue = () => {
      if (opts.readonly || isEqual$1(cookie.value, cookies[name])) {
        return;
      }
      writeServerCookie(useRequestEvent(nuxtApp), name, cookie.value, opts);
    };
    const unhook = nuxtApp.hooks.hookOnce("app:rendered", writeFinalCookieValue);
    nuxtApp.hooks.hookOnce("app:error", () => {
      unhook();
      return writeFinalCookieValue();
    });
  }
  return cookie;
}
function readRawCookies(opts = {}) {
  {
    return parse$1(getRequestHeader(useRequestEvent(), "cookie") || "", opts);
  }
}
function writeServerCookie(event, name, value, opts = {}) {
  if (event) {
    if (value !== null && value !== void 0) {
      return setCookie(event, name, value, opts);
    }
    if (getCookie(event, name) !== void 0) {
      return deleteCookie(event, name, opts);
    }
  }
}
const auth_45global = /* @__PURE__ */ defineNuxtRouteMiddleware((to, from) => {
  const tokenCookie = useCookie("auth_token");
  const token = tokenCookie.value;
  if (!token && to.path !== "/login") {
    return navigateTo("/login");
  }
});
const manifest_45route_45rule = /* @__PURE__ */ defineNuxtRouteMiddleware(async (to) => {
  {
    return;
  }
});
const globalMiddleware = [
  validate,
  auth_45global,
  manifest_45route_45rule
];
const namedMiddleware = {};
const plugin = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:router",
  enforce: "pre",
  async setup(nuxtApp) {
    var _a, _b, _c, _d;
    let __temp, __restore;
    let routerBase = (/* @__PURE__ */ useRuntimeConfig()).app.baseURL;
    if (routerOptions.hashMode && !routerBase.includes("#")) {
      routerBase += "#";
    }
    const history = ((_a = routerOptions.history) == null ? void 0 : _a.call(routerOptions, routerBase)) ?? createMemoryHistory(routerBase);
    const routes = ((_b = routerOptions.routes) == null ? void 0 : _b.call(routerOptions, _routes)) ?? _routes;
    let startPosition;
    const router = createRouter({
      ...routerOptions,
      scrollBehavior: (to, from, savedPosition) => {
        if (from === START_LOCATION) {
          startPosition = savedPosition;
          return;
        }
        if (routerOptions.scrollBehavior) {
          router.options.scrollBehavior = routerOptions.scrollBehavior;
          if ("scrollRestoration" in (void 0).history) {
            const unsub = router.beforeEach(() => {
              unsub();
              (void 0).history.scrollRestoration = "manual";
            });
          }
          return routerOptions.scrollBehavior(to, START_LOCATION, startPosition || savedPosition);
        }
      },
      history,
      routes
    });
    nuxtApp.vueApp.use(router);
    const previousRoute = shallowRef(router.currentRoute.value);
    router.afterEach((_to, from) => {
      previousRoute.value = from;
    });
    Object.defineProperty(nuxtApp.vueApp.config.globalProperties, "previousRoute", {
      get: () => previousRoute.value
    });
    const initialURL = nuxtApp.ssrContext.url;
    const _route = shallowRef(router.currentRoute.value);
    const syncCurrentRoute = () => {
      _route.value = router.currentRoute.value;
    };
    nuxtApp.hook("page:finish", syncCurrentRoute);
    router.afterEach((to, from) => {
      var _a2, _b2, _c2, _d2;
      if (((_b2 = (_a2 = to.matched[0]) == null ? void 0 : _a2.components) == null ? void 0 : _b2.default) === ((_d2 = (_c2 = from.matched[0]) == null ? void 0 : _c2.components) == null ? void 0 : _d2.default)) {
        syncCurrentRoute();
      }
    });
    const route = {};
    for (const key in _route.value) {
      Object.defineProperty(route, key, {
        get: () => _route.value[key]
      });
    }
    nuxtApp._route = shallowReactive(route);
    nuxtApp._middleware = nuxtApp._middleware || {
      global: [],
      named: {}
    };
    useError();
    if (!((_c = nuxtApp.ssrContext) == null ? void 0 : _c.islandContext)) {
      router.afterEach(async (to, _from, failure) => {
        delete nuxtApp._processingMiddleware;
        if (failure) {
          await nuxtApp.callHook("page:loading:end");
        }
        if ((failure == null ? void 0 : failure.type) === 4) {
          return;
        }
        if (to.matched.length === 0) {
          await nuxtApp.runWithContext(() => showError(createError$1({
            statusCode: 404,
            fatal: false,
            statusMessage: `Page not found: ${to.fullPath}`,
            data: {
              path: to.fullPath
            }
          })));
        } else if (to.redirectedFrom && to.fullPath !== initialURL) {
          await nuxtApp.runWithContext(() => navigateTo(to.fullPath || "/"));
        }
      });
    }
    try {
      if (true) {
        ;
        [__temp, __restore] = executeAsync(() => router.push(initialURL)), await __temp, __restore();
        ;
      }
      ;
      [__temp, __restore] = executeAsync(() => router.isReady()), await __temp, __restore();
      ;
    } catch (error2) {
      [__temp, __restore] = executeAsync(() => nuxtApp.runWithContext(() => showError(error2))), await __temp, __restore();
    }
    const resolvedInitialRoute = router.currentRoute.value;
    syncCurrentRoute();
    if ((_d = nuxtApp.ssrContext) == null ? void 0 : _d.islandContext) {
      return { provide: { router } };
    }
    const initialLayout = nuxtApp.payload.state._layout;
    router.beforeEach(async (to, from) => {
      var _a2, _b2;
      await nuxtApp.callHook("page:loading:start");
      to.meta = reactive(to.meta);
      if (nuxtApp.isHydrating && initialLayout && !isReadonly(to.meta.layout)) {
        to.meta.layout = initialLayout;
      }
      nuxtApp._processingMiddleware = true;
      if (!((_a2 = nuxtApp.ssrContext) == null ? void 0 : _a2.islandContext)) {
        const middlewareEntries = /* @__PURE__ */ new Set([...globalMiddleware, ...nuxtApp._middleware.global]);
        for (const component of to.matched) {
          const componentMiddleware = component.meta.middleware;
          if (!componentMiddleware) {
            continue;
          }
          for (const entry2 of toArray(componentMiddleware)) {
            middlewareEntries.add(entry2);
          }
        }
        {
          const routeRules = await nuxtApp.runWithContext(() => getRouteRules(to.path));
          if (routeRules.appMiddleware) {
            for (const key in routeRules.appMiddleware) {
              if (routeRules.appMiddleware[key]) {
                middlewareEntries.add(key);
              } else {
                middlewareEntries.delete(key);
              }
            }
          }
        }
        for (const entry2 of middlewareEntries) {
          const middleware = typeof entry2 === "string" ? nuxtApp._middleware.named[entry2] || await ((_b2 = namedMiddleware[entry2]) == null ? void 0 : _b2.call(namedMiddleware).then((r) => r.default || r)) : entry2;
          if (!middleware) {
            throw new Error(`Unknown route middleware: '${entry2}'.`);
          }
          const result = await nuxtApp.runWithContext(() => middleware(to, from));
          {
            if (result === false || result instanceof Error) {
              const error2 = result || createError$1({
                statusCode: 404,
                statusMessage: `Page Not Found: ${initialURL}`
              });
              await nuxtApp.runWithContext(() => showError(error2));
              return false;
            }
          }
          if (result === true) {
            continue;
          }
          if (result || result === false) {
            return result;
          }
        }
      }
    });
    router.onError(async () => {
      delete nuxtApp._processingMiddleware;
      await nuxtApp.callHook("page:loading:end");
    });
    nuxtApp.hooks.hookOnce("app:created", async () => {
      try {
        if ("name" in resolvedInitialRoute) {
          resolvedInitialRoute.name = void 0;
        }
        await router.replace({
          ...resolvedInitialRoute,
          force: true
        });
        router.options.scrollBehavior = routerOptions.scrollBehavior;
      } catch (error2) {
        await nuxtApp.runWithContext(() => showError(error2));
      }
    });
    return { provide: { router } };
  }
});
function definePayloadReducer(name, reduce) {
  {
    useNuxtApp().ssrContext._payloadReducers[name] = reduce;
  }
}
const reducers = {
  NuxtError: (data) => isNuxtError(data) && data.toJSON(),
  EmptyShallowRef: (data) => isRef(data) && isShallow(data) && !data.value && (typeof data.value === "bigint" ? "0n" : JSON.stringify(data.value) || "_"),
  EmptyRef: (data) => isRef(data) && !data.value && (typeof data.value === "bigint" ? "0n" : JSON.stringify(data.value) || "_"),
  ShallowRef: (data) => isRef(data) && isShallow(data) && data.value,
  ShallowReactive: (data) => isReactive(data) && isShallow(data) && toRaw(data),
  Ref: (data) => isRef(data) && data.value,
  Reactive: (data) => isReactive(data) && toRaw(data)
};
const revive_payload_server_eJ33V7gbc6 = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:revive-payload:server",
  setup() {
    for (const reducer in reducers) {
      definePayloadReducer(reducer, reducers[reducer]);
    }
  }
});
const components_plugin_KR1HBZs4kY = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:global-components"
});
const toast_ysMjUcU7eJ = /* @__PURE__ */ defineNuxtPlugin(({ vueApp }) => {
  vueApp.use(Vue3Toastify, {
    autoClose: 2e3
  });
  toast.error = (message) => toast(message, {
    type: "error",
    position: "top-right",
    icon: "❌",
    theme: "dark"
  });
  return {
    provide: {
      toast
    }
  };
});
function useToggleScope(source, fn) {
  let scope;
  function start() {
    scope = effectScope();
    scope.run(() => fn.length ? fn(() => {
      scope == null ? void 0 : scope.stop();
      start();
    }) : fn());
  }
  watch(source, (active) => {
    if (active && !scope) {
      start();
    } else if (!active) {
      scope == null ? void 0 : scope.stop();
      scope = void 0;
    }
  }, {
    immediate: true
  });
  onScopeDispose(() => {
    scope == null ? void 0 : scope.stop();
  });
}
const IN_BROWSER = false;
const SUPPORTS_TOUCH = IN_BROWSER;
function getNestedValue(obj, path, fallback) {
  const last = path.length - 1;
  if (last < 0) return obj === void 0 ? fallback : obj;
  for (let i = 0; i < last; i++) {
    if (obj == null) {
      return fallback;
    }
    obj = obj[path[i]];
  }
  if (obj == null) return fallback;
  return obj[path[last]] === void 0 ? fallback : obj[path[last]];
}
function deepEqual(a, b) {
  if (a === b) return true;
  if (a instanceof Date && b instanceof Date && a.getTime() !== b.getTime()) {
    return false;
  }
  if (a !== Object(a) || b !== Object(b)) {
    return false;
  }
  const props = Object.keys(a);
  if (props.length !== Object.keys(b).length) {
    return false;
  }
  return props.every((p) => deepEqual(a[p], b[p]));
}
function getObjectValueByPath(obj, path, fallback) {
  if (obj == null || !path || typeof path !== "string") return fallback;
  if (obj[path] !== void 0) return obj[path];
  path = path.replace(/\[(\w+)\]/g, ".$1");
  path = path.replace(/^\./, "");
  return getNestedValue(obj, path.split("."), fallback);
}
function getPropertyFromItem(item, property, fallback) {
  if (property === true) return item === void 0 ? fallback : item;
  if (property == null || typeof property === "boolean") return fallback;
  if (item !== Object(item)) {
    if (typeof property !== "function") return fallback;
    const value2 = property(item, fallback);
    return typeof value2 === "undefined" ? fallback : value2;
  }
  if (typeof property === "string") return getObjectValueByPath(item, property, fallback);
  if (Array.isArray(property)) return getNestedValue(item, property, fallback);
  if (typeof property !== "function") return fallback;
  const value = property(item, fallback);
  return typeof value === "undefined" ? fallback : value;
}
function createRange(length) {
  let start = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
  return Array.from({
    length
  }, (v, k) => start + k);
}
function convertToUnit(str) {
  let unit = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "px";
  if (str == null || str === "") {
    return void 0;
  } else if (isNaN(+str)) {
    return String(str);
  } else if (!isFinite(+str)) {
    return void 0;
  } else {
    return `${Number(str)}${unit}`;
  }
}
function isObject(obj) {
  return obj !== null && typeof obj === "object" && !Array.isArray(obj);
}
function refElement(obj) {
  if (obj && "$el" in obj) {
    const el = obj.$el;
    if ((el == null ? void 0 : el.nodeType) === Node.TEXT_NODE) {
      return el.nextElementSibling;
    }
    return el;
  }
  return obj;
}
const keyCodes = Object.freeze({
  enter: 13,
  tab: 9,
  delete: 46,
  esc: 27,
  space: 32,
  up: 38,
  down: 40,
  left: 37,
  right: 39,
  end: 35,
  home: 36,
  del: 46,
  backspace: 8,
  insert: 45,
  pageup: 33,
  pagedown: 34,
  shift: 16
});
const keyValues = Object.freeze({
  enter: "Enter",
  tab: "Tab",
  delete: "Delete",
  esc: "Escape",
  space: "Space",
  up: "ArrowUp",
  down: "ArrowDown",
  left: "ArrowLeft",
  right: "ArrowRight",
  end: "End",
  home: "Home",
  del: "Delete",
  backspace: "Backspace",
  insert: "Insert",
  pageup: "PageUp",
  pagedown: "PageDown",
  shift: "Shift"
});
function keys(o) {
  return Object.keys(o);
}
function has(obj, key) {
  return key.every((k) => obj.hasOwnProperty(k));
}
function pick(obj, paths) {
  const found = {};
  const keys2 = new Set(Object.keys(obj));
  for (const path of paths) {
    if (keys2.has(path)) {
      found[path] = obj[path];
    }
  }
  return found;
}
function pickWithRest(obj, paths, exclude) {
  const found = /* @__PURE__ */ Object.create(null);
  const rest = /* @__PURE__ */ Object.create(null);
  for (const key in obj) {
    if (paths.some((path) => path instanceof RegExp ? path.test(key) : path === key) && !(void 0 )) {
      found[key] = obj[key];
    } else {
      rest[key] = obj[key];
    }
  }
  return [found, rest];
}
function omit(obj, exclude) {
  const clone = {
    ...obj
  };
  exclude.forEach((prop) => delete clone[prop]);
  return clone;
}
function only(obj, include) {
  const clone = {};
  include.forEach((prop) => clone[prop] = obj[prop]);
  return clone;
}
const onRE = /^on[^a-z]/;
const isOn = (key) => onRE.test(key);
const bubblingEvents = ["onAfterscriptexecute", "onAnimationcancel", "onAnimationend", "onAnimationiteration", "onAnimationstart", "onAuxclick", "onBeforeinput", "onBeforescriptexecute", "onChange", "onClick", "onCompositionend", "onCompositionstart", "onCompositionupdate", "onContextmenu", "onCopy", "onCut", "onDblclick", "onFocusin", "onFocusout", "onFullscreenchange", "onFullscreenerror", "onGesturechange", "onGestureend", "onGesturestart", "onGotpointercapture", "onInput", "onKeydown", "onKeypress", "onKeyup", "onLostpointercapture", "onMousedown", "onMousemove", "onMouseout", "onMouseover", "onMouseup", "onMousewheel", "onPaste", "onPointercancel", "onPointerdown", "onPointerenter", "onPointerleave", "onPointermove", "onPointerout", "onPointerover", "onPointerup", "onReset", "onSelect", "onSubmit", "onTouchcancel", "onTouchend", "onTouchmove", "onTouchstart", "onTransitioncancel", "onTransitionend", "onTransitionrun", "onTransitionstart", "onWheel"];
function filterInputAttrs(attrs) {
  const [events, props] = pickWithRest(attrs, [onRE]);
  const inputEvents = omit(events, bubblingEvents);
  const [rootAttrs, inputAttrs] = pickWithRest(props, ["class", "style", "id", /^data-/]);
  Object.assign(rootAttrs, events);
  Object.assign(inputAttrs, inputEvents);
  return [rootAttrs, inputAttrs];
}
function wrapInArray(v) {
  return v == null ? [] : Array.isArray(v) ? v : [v];
}
function debounce(fn, delay) {
  let timeoutId = 0;
  const wrap = function() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), unref(delay));
  };
  wrap.clear = () => {
    clearTimeout(timeoutId);
  };
  wrap.immediate = fn;
  return wrap;
}
function clamp(value) {
  let min = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
  let max = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 1;
  return Math.max(min, Math.min(max, value));
}
function getDecimals(value) {
  const trimmedStr = value.toString().trim();
  return trimmedStr.includes(".") ? trimmedStr.length - trimmedStr.indexOf(".") - 1 : 0;
}
function padEnd(str, length) {
  let char = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : "0";
  return str + char.repeat(Math.max(0, length - str.length));
}
function padStart(str, length) {
  let char = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : "0";
  return char.repeat(Math.max(0, length - str.length)) + str;
}
function chunk(str) {
  let size = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1;
  const chunked = [];
  let index = 0;
  while (index < str.length) {
    chunked.push(str.substr(index, size));
    index += size;
  }
  return chunked;
}
function mergeDeep() {
  let source = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
  let target = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  let arrayFn = arguments.length > 2 ? arguments[2] : void 0;
  const out = {};
  for (const key in source) {
    out[key] = source[key];
  }
  for (const key in target) {
    const sourceProperty = source[key];
    const targetProperty = target[key];
    if (isObject(sourceProperty) && isObject(targetProperty)) {
      out[key] = mergeDeep(sourceProperty, targetProperty, arrayFn);
      continue;
    }
    if (Array.isArray(sourceProperty) && Array.isArray(targetProperty) && arrayFn) {
      out[key] = arrayFn(sourceProperty, targetProperty);
      continue;
    }
    out[key] = targetProperty;
  }
  return out;
}
function flattenFragments(nodes) {
  return nodes.map((node) => {
    if (node.type === Fragment) {
      return flattenFragments(node.children);
    } else {
      return node;
    }
  }).flat();
}
function toKebabCase() {
  let str = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "";
  if (toKebabCase.cache.has(str)) return toKebabCase.cache.get(str);
  const kebab = str.replace(/[^a-z]/gi, "-").replace(/\B([A-Z])/g, "-$1").toLowerCase();
  toKebabCase.cache.set(str, kebab);
  return kebab;
}
toKebabCase.cache = /* @__PURE__ */ new Map();
function findChildrenWithProvide(key, vnode) {
  if (!vnode || typeof vnode !== "object") return [];
  if (Array.isArray(vnode)) {
    return vnode.map((child) => findChildrenWithProvide(key, child)).flat(1);
  } else if (vnode.suspense) {
    return findChildrenWithProvide(key, vnode.ssContent);
  } else if (Array.isArray(vnode.children)) {
    return vnode.children.map((child) => findChildrenWithProvide(key, child)).flat(1);
  } else if (vnode.component) {
    if (Object.getOwnPropertySymbols(vnode.component.provides).includes(key)) {
      return [vnode.component];
    } else if (vnode.component.subTree) {
      return findChildrenWithProvide(key, vnode.component.subTree).flat(1);
    }
  }
  return [];
}
function destructComputed(getter) {
  const refs = reactive({});
  const base = computed(getter);
  watchEffect(() => {
    for (const key in base.value) {
      refs[key] = base.value[key];
    }
  }, {
    flush: "sync"
  });
  return toRefs(refs);
}
function includes(arr, val) {
  return arr.includes(val);
}
function eventName(propName) {
  return propName[2].toLowerCase() + propName.slice(3);
}
const EventProp = () => [Function, Array];
function hasEvent(props, name) {
  name = "on" + capitalize(name);
  return !!(props[name] || props[`${name}Once`] || props[`${name}Capture`] || props[`${name}OnceCapture`] || props[`${name}CaptureOnce`]);
}
function callEvent(handler) {
  for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
    args[_key2 - 1] = arguments[_key2];
  }
  if (Array.isArray(handler)) {
    for (const h2 of handler) {
      h2(...args);
    }
  } else if (typeof handler === "function") {
    handler(...args);
  }
}
function focusableChildren(el) {
  let filterByTabIndex = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
  const targets = ["button", "[href]", 'input:not([type="hidden"])', "select", "textarea", "[tabindex]"].map((s) => `${s}${filterByTabIndex ? ':not([tabindex="-1"])' : ""}:not([disabled])`).join(", ");
  return [...el.querySelectorAll(targets)];
}
function getNextElement(elements, location, condition) {
  let _el;
  let idx = elements.indexOf((void 0).activeElement);
  const inc = location === "next" ? 1 : -1;
  do {
    idx += inc;
    _el = elements[idx];
  } while ((!_el || _el.offsetParent == null || !((condition == null ? void 0 : condition(_el)) ?? true)) && idx < elements.length && idx >= 0);
  return _el;
}
function focusChild(el, location) {
  var _a, _b, _c, _d;
  const focusable = focusableChildren(el);
  if (!location) {
    if (el === (void 0).activeElement || !el.contains((void 0).activeElement)) {
      (_a = focusable[0]) == null ? void 0 : _a.focus();
    }
  } else if (location === "first") {
    (_b = focusable[0]) == null ? void 0 : _b.focus();
  } else if (location === "last") {
    (_c = focusable.at(-1)) == null ? void 0 : _c.focus();
  } else if (typeof location === "number") {
    (_d = focusable[location]) == null ? void 0 : _d.focus();
  } else {
    const _el = getNextElement(focusable, location);
    if (_el) _el.focus();
    else focusChild(el, location === "next" ? "first" : "last");
  }
}
function isEmpty(val) {
  return val === null || val === void 0 || typeof val === "string" && val.trim() === "";
}
function noop() {
}
function matchesSelector(el, selector) {
  return null;
}
function ensureValidVNode(vnodes) {
  return vnodes.some((child) => {
    if (!isVNode(child)) return true;
    if (child.type === Comment) return false;
    return child.type !== Fragment || ensureValidVNode(child.children);
  }) ? vnodes : null;
}
function defer(timeout, cb) {
  {
    cb();
    return () => {
    };
  }
}
function eagerComputed(fn, options) {
  const result = shallowRef();
  watchEffect(() => {
    result.value = fn();
  }, {
    flush: "sync",
    ...options
  });
  return readonly(result);
}
function isClickInsideElement(event, targetDiv) {
  const mouseX = event.clientX;
  const mouseY = event.clientY;
  const divRect = targetDiv.getBoundingClientRect();
  const divLeft = divRect.left;
  const divTop = divRect.top;
  const divRight = divRect.right;
  const divBottom = divRect.bottom;
  return mouseX >= divLeft && mouseX <= divRight && mouseY >= divTop && mouseY <= divBottom;
}
function templateRef() {
  const el = shallowRef();
  const fn = (target) => {
    el.value = target;
  };
  Object.defineProperty(fn, "value", {
    enumerable: true,
    get: () => el.value,
    set: (val) => el.value = val
  });
  Object.defineProperty(fn, "el", {
    enumerable: true,
    get: () => refElement(el.value)
  });
  return fn;
}
const block = ["top", "bottom"];
const inline = ["start", "end", "left", "right"];
function parseAnchor(anchor, isRtl) {
  let [side, align] = anchor.split(" ");
  if (!align) {
    align = includes(block, side) ? "start" : includes(inline, side) ? "top" : "center";
  }
  return {
    side: toPhysical(side, isRtl),
    align: toPhysical(align, isRtl)
  };
}
function toPhysical(str, isRtl) {
  if (str === "start") return isRtl ? "right" : "left";
  if (str === "end") return isRtl ? "left" : "right";
  return str;
}
function flipSide(anchor) {
  return {
    side: {
      center: "center",
      top: "bottom",
      bottom: "top",
      left: "right",
      right: "left"
    }[anchor.side],
    align: anchor.align
  };
}
function flipAlign(anchor) {
  return {
    side: anchor.side,
    align: {
      center: "center",
      top: "bottom",
      bottom: "top",
      left: "right",
      right: "left"
    }[anchor.align]
  };
}
function flipCorner(anchor) {
  return {
    side: anchor.align,
    align: anchor.side
  };
}
function getAxis(anchor) {
  return includes(block, anchor.side) ? "y" : "x";
}
class Box {
  constructor(_ref) {
    let {
      x,
      y,
      width,
      height
    } = _ref;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }
  get top() {
    return this.y;
  }
  get bottom() {
    return this.y + this.height;
  }
  get left() {
    return this.x;
  }
  get right() {
    return this.x + this.width;
  }
}
function getOverflow(a, b) {
  return {
    x: {
      before: Math.max(0, b.left - a.left),
      after: Math.max(0, a.right - b.right)
    },
    y: {
      before: Math.max(0, b.top - a.top),
      after: Math.max(0, a.bottom - b.bottom)
    }
  };
}
function getTargetBox(target) {
  if (Array.isArray(target)) {
    return new Box({
      x: target[0],
      y: target[1],
      width: 0,
      height: 0
    });
  } else {
    return target.getBoundingClientRect();
  }
}
function nullifyTransforms(el) {
  const rect = el.getBoundingClientRect();
  const style = getComputedStyle(el);
  const tx = style.transform;
  if (tx) {
    let ta, sx, sy, dx, dy;
    if (tx.startsWith("matrix3d(")) {
      ta = tx.slice(9, -1).split(/, /);
      sx = +ta[0];
      sy = +ta[5];
      dx = +ta[12];
      dy = +ta[13];
    } else if (tx.startsWith("matrix(")) {
      ta = tx.slice(7, -1).split(/, /);
      sx = +ta[0];
      sy = +ta[3];
      dx = +ta[4];
      dy = +ta[5];
    } else {
      return new Box(rect);
    }
    const to = style.transformOrigin;
    const x = rect.x - dx - (1 - sx) * parseFloat(to);
    const y = rect.y - dy - (1 - sy) * parseFloat(to.slice(to.indexOf(" ") + 1));
    const w = sx ? rect.width / sx : el.offsetWidth + 1;
    const h2 = sy ? rect.height / sy : el.offsetHeight + 1;
    return new Box({
      x,
      y,
      width: w,
      height: h2
    });
  } else {
    return new Box(rect);
  }
}
function animate(el, keyframes, options) {
  if (typeof el.animate === "undefined") return {
    finished: Promise.resolve()
  };
  let animation;
  try {
    animation = el.animate(keyframes, options);
  } catch (err) {
    return {
      finished: Promise.resolve()
    };
  }
  if (typeof animation.finished === "undefined") {
    animation.finished = new Promise((resolve) => {
      animation.onfinish = () => {
        resolve(animation);
      };
    });
  }
  return animation;
}
const handlers = /* @__PURE__ */ new WeakMap();
function bindProps(el, props) {
  Object.keys(props).forEach((k) => {
    var _a;
    if (isOn(k)) {
      const name = eventName(k);
      const handler = handlers.get(el);
      if (props[k] == null) {
        handler == null ? void 0 : handler.forEach((v) => {
          const [n, fn] = v;
          if (n === name) {
            el.removeEventListener(name, fn);
            handler.delete(v);
          }
        });
      } else if (!handler || !((_a = [...handler]) == null ? void 0 : _a.some((v) => v[0] === name && v[1] === props[k]))) {
        el.addEventListener(name, props[k]);
        const _handler = handler || /* @__PURE__ */ new Set();
        _handler.add([name, props[k]]);
        if (!handlers.has(el)) handlers.set(el, _handler);
      }
    } else {
      if (props[k] == null) {
        el.removeAttribute(k);
      } else {
        el.setAttribute(k, props[k]);
      }
    }
  });
}
function unbindProps(el, props) {
  Object.keys(props).forEach((k) => {
    if (isOn(k)) {
      const name = eventName(k);
      const handler = handlers.get(el);
      handler == null ? void 0 : handler.forEach((v) => {
        const [n, fn] = v;
        if (n === name) {
          el.removeEventListener(name, fn);
          handler.delete(v);
        }
      });
    } else {
      el.removeAttribute(k);
    }
  });
}
const mainTRC = 2.4;
const Rco = 0.2126729;
const Gco = 0.7151522;
const Bco = 0.072175;
const normBG = 0.55;
const normTXT = 0.58;
const revTXT = 0.57;
const revBG = 0.62;
const blkThrs = 0.03;
const blkClmp = 1.45;
const deltaYmin = 5e-4;
const scaleBoW = 1.25;
const scaleWoB = 1.25;
const loConThresh = 0.078;
const loConFactor = 12.82051282051282;
const loConOffset = 0.06;
const loClip = 1e-3;
function APCAcontrast(text, background) {
  const Rtxt = (text.r / 255) ** mainTRC;
  const Gtxt = (text.g / 255) ** mainTRC;
  const Btxt = (text.b / 255) ** mainTRC;
  const Rbg = (background.r / 255) ** mainTRC;
  const Gbg = (background.g / 255) ** mainTRC;
  const Bbg = (background.b / 255) ** mainTRC;
  let Ytxt = Rtxt * Rco + Gtxt * Gco + Btxt * Bco;
  let Ybg = Rbg * Rco + Gbg * Gco + Bbg * Bco;
  if (Ytxt <= blkThrs) Ytxt += (blkThrs - Ytxt) ** blkClmp;
  if (Ybg <= blkThrs) Ybg += (blkThrs - Ybg) ** blkClmp;
  if (Math.abs(Ybg - Ytxt) < deltaYmin) return 0;
  let outputContrast;
  if (Ybg > Ytxt) {
    const SAPC = (Ybg ** normBG - Ytxt ** normTXT) * scaleBoW;
    outputContrast = SAPC < loClip ? 0 : SAPC < loConThresh ? SAPC - SAPC * loConFactor * loConOffset : SAPC - loConOffset;
  } else {
    const SAPC = (Ybg ** revBG - Ytxt ** revTXT) * scaleWoB;
    outputContrast = SAPC > -loClip ? 0 : SAPC > -loConThresh ? SAPC - SAPC * loConFactor * loConOffset : SAPC + loConOffset;
  }
  return outputContrast * 100;
}
function consoleWarn(message) {
  warn(`Vuetify: ${message}`);
}
function consoleError(message) {
  warn(`Vuetify error: ${message}`);
}
function deprecate(original, replacement) {
  replacement = Array.isArray(replacement) ? replacement.slice(0, -1).map((s) => `'${s}'`).join(", ") + ` or '${replacement.at(-1)}'` : `'${replacement}'`;
  warn(`[Vuetify UPGRADE] '${original}' is deprecated, use ${replacement} instead.`);
}
const delta = 0.20689655172413793;
const cielabForwardTransform = (t) => t > delta ** 3 ? Math.cbrt(t) : t / (3 * delta ** 2) + 4 / 29;
const cielabReverseTransform = (t) => t > delta ? t ** 3 : 3 * delta ** 2 * (t - 4 / 29);
function fromXYZ$1(xyz) {
  const transform2 = cielabForwardTransform;
  const transformedY = transform2(xyz[1]);
  return [116 * transformedY - 16, 500 * (transform2(xyz[0] / 0.95047) - transformedY), 200 * (transformedY - transform2(xyz[2] / 1.08883))];
}
function toXYZ$1(lab) {
  const transform2 = cielabReverseTransform;
  const Ln = (lab[0] + 16) / 116;
  return [transform2(Ln + lab[1] / 500) * 0.95047, transform2(Ln), transform2(Ln - lab[2] / 200) * 1.08883];
}
const srgbForwardMatrix = [[3.2406, -1.5372, -0.4986], [-0.9689, 1.8758, 0.0415], [0.0557, -0.204, 1.057]];
const srgbForwardTransform = (C) => C <= 31308e-7 ? C * 12.92 : 1.055 * C ** (1 / 2.4) - 0.055;
const srgbReverseMatrix = [[0.4124, 0.3576, 0.1805], [0.2126, 0.7152, 0.0722], [0.0193, 0.1192, 0.9505]];
const srgbReverseTransform = (C) => C <= 0.04045 ? C / 12.92 : ((C + 0.055) / 1.055) ** 2.4;
function fromXYZ(xyz) {
  const rgb = Array(3);
  const transform2 = srgbForwardTransform;
  const matrix = srgbForwardMatrix;
  for (let i = 0; i < 3; ++i) {
    rgb[i] = Math.round(clamp(transform2(matrix[i][0] * xyz[0] + matrix[i][1] * xyz[1] + matrix[i][2] * xyz[2])) * 255);
  }
  return {
    r: rgb[0],
    g: rgb[1],
    b: rgb[2]
  };
}
function toXYZ(_ref) {
  let {
    r,
    g,
    b
  } = _ref;
  const xyz = [0, 0, 0];
  const transform2 = srgbReverseTransform;
  const matrix = srgbReverseMatrix;
  r = transform2(r / 255);
  g = transform2(g / 255);
  b = transform2(b / 255);
  for (let i = 0; i < 3; ++i) {
    xyz[i] = matrix[i][0] * r + matrix[i][1] * g + matrix[i][2] * b;
  }
  return xyz;
}
function isCssColor(color) {
  return !!color && /^(#|var\(--|(rgb|hsl)a?\()/.test(color);
}
function isParsableColor(color) {
  return isCssColor(color) && !/^((rgb|hsl)a?\()?var\(--/.test(color);
}
const cssColorRe = /^(?<fn>(?:rgb|hsl)a?)\((?<values>.+)\)/;
const mappers = {
  rgb: (r, g, b, a) => ({
    r,
    g,
    b,
    a
  }),
  rgba: (r, g, b, a) => ({
    r,
    g,
    b,
    a
  }),
  hsl: (h2, s, l, a) => HSLtoRGB({
    h: h2,
    s,
    l,
    a
  }),
  hsla: (h2, s, l, a) => HSLtoRGB({
    h: h2,
    s,
    l,
    a
  }),
  hsv: (h2, s, v, a) => HSVtoRGB({
    h: h2,
    s,
    v,
    a
  }),
  hsva: (h2, s, v, a) => HSVtoRGB({
    h: h2,
    s,
    v,
    a
  })
};
function parseColor(color) {
  if (typeof color === "number") {
    if (isNaN(color) || color < 0 || color > 16777215) {
      consoleWarn(`'${color}' is not a valid hex color`);
    }
    return {
      r: (color & 16711680) >> 16,
      g: (color & 65280) >> 8,
      b: color & 255
    };
  } else if (typeof color === "string" && cssColorRe.test(color)) {
    const {
      groups
    } = color.match(cssColorRe);
    const {
      fn,
      values
    } = groups;
    const realValues = values.split(/,\s*/).map((v) => {
      if (v.endsWith("%") && ["hsl", "hsla", "hsv", "hsva"].includes(fn)) {
        return parseFloat(v) / 100;
      } else {
        return parseFloat(v);
      }
    });
    return mappers[fn](...realValues);
  } else if (typeof color === "string") {
    let hex = color.startsWith("#") ? color.slice(1) : color;
    if ([3, 4].includes(hex.length)) {
      hex = hex.split("").map((char) => char + char).join("");
    } else if (![6, 8].includes(hex.length)) {
      consoleWarn(`'${color}' is not a valid hex(a) color`);
    }
    const int = parseInt(hex, 16);
    if (isNaN(int) || int < 0 || int > 4294967295) {
      consoleWarn(`'${color}' is not a valid hex(a) color`);
    }
    return HexToRGB(hex);
  } else if (typeof color === "object") {
    if (has(color, ["r", "g", "b"])) {
      return color;
    } else if (has(color, ["h", "s", "l"])) {
      return HSVtoRGB(HSLtoHSV(color));
    } else if (has(color, ["h", "s", "v"])) {
      return HSVtoRGB(color);
    }
  }
  throw new TypeError(`Invalid color: ${color == null ? color : String(color) || color.constructor.name}
Expected #hex, #hexa, rgb(), rgba(), hsl(), hsla(), object or number`);
}
function HSVtoRGB(hsva) {
  const {
    h: h2,
    s,
    v,
    a
  } = hsva;
  const f = (n) => {
    const k = (n + h2 / 60) % 6;
    return v - v * s * Math.max(Math.min(k, 4 - k, 1), 0);
  };
  const rgb = [f(5), f(3), f(1)].map((v2) => Math.round(v2 * 255));
  return {
    r: rgb[0],
    g: rgb[1],
    b: rgb[2],
    a
  };
}
function HSLtoRGB(hsla) {
  return HSVtoRGB(HSLtoHSV(hsla));
}
function HSLtoHSV(hsl) {
  const {
    h: h2,
    s,
    l,
    a
  } = hsl;
  const v = l + s * Math.min(l, 1 - l);
  const sprime = v === 0 ? 0 : 2 - 2 * l / v;
  return {
    h: h2,
    s: sprime,
    v,
    a
  };
}
function toHex(v) {
  const h2 = Math.round(v).toString(16);
  return ("00".substr(0, 2 - h2.length) + h2).toUpperCase();
}
function RGBtoHex(_ref2) {
  let {
    r,
    g,
    b,
    a
  } = _ref2;
  return `#${[toHex(r), toHex(g), toHex(b), a !== void 0 ? toHex(Math.round(a * 255)) : ""].join("")}`;
}
function HexToRGB(hex) {
  hex = parseHex(hex);
  let [r, g, b, a] = chunk(hex, 2).map((c) => parseInt(c, 16));
  a = a === void 0 ? a : a / 255;
  return {
    r,
    g,
    b,
    a
  };
}
function parseHex(hex) {
  if (hex.startsWith("#")) {
    hex = hex.slice(1);
  }
  hex = hex.replace(/([^0-9a-f])/gi, "F");
  if (hex.length === 3 || hex.length === 4) {
    hex = hex.split("").map((x) => x + x).join("");
  }
  if (hex.length !== 6) {
    hex = padEnd(padEnd(hex, 6), 8, "F");
  }
  return hex;
}
function lighten(value, amount) {
  const lab = fromXYZ$1(toXYZ(value));
  lab[0] = lab[0] + amount * 10;
  return fromXYZ(toXYZ$1(lab));
}
function darken(value, amount) {
  const lab = fromXYZ$1(toXYZ(value));
  lab[0] = lab[0] - amount * 10;
  return fromXYZ(toXYZ$1(lab));
}
function getLuma(color) {
  const rgb = parseColor(color);
  return toXYZ(rgb)[1];
}
function getForeground(color) {
  const blackContrast = Math.abs(APCAcontrast(parseColor(0), parseColor(color)));
  const whiteContrast = Math.abs(APCAcontrast(parseColor(16777215), parseColor(color)));
  return whiteContrast > Math.min(blackContrast, 50) ? "#fff" : "#000";
}
function propsFactory(props, source) {
  return (defaults) => {
    return Object.keys(props).reduce((obj, prop) => {
      const isObjectDefinition = typeof props[prop] === "object" && props[prop] != null && !Array.isArray(props[prop]);
      const definition = isObjectDefinition ? props[prop] : {
        type: props[prop]
      };
      if (defaults && prop in defaults) {
        obj[prop] = {
          ...definition,
          default: defaults[prop]
        };
      } else {
        obj[prop] = definition;
      }
      if (source && !obj[prop].source) {
        obj[prop].source = source;
      }
      return obj;
    }, {});
  };
}
const makeComponentProps = propsFactory({
  class: [String, Array, Object],
  style: {
    type: [String, Array, Object],
    default: null
  }
}, "component");
function getCurrentInstance(name, message) {
  const vm = getCurrentInstance$1();
  if (!vm) {
    throw new Error(`[Vuetify] ${name} ${"must be called from inside a setup function"}`);
  }
  return vm;
}
function getCurrentInstanceName() {
  let name = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "composables";
  const vm = getCurrentInstance(name).type;
  return toKebabCase((vm == null ? void 0 : vm.aliasName) || (vm == null ? void 0 : vm.name));
}
let _uid = 0;
let _map = /* @__PURE__ */ new WeakMap();
function getUid() {
  const vm = getCurrentInstance("getUid");
  if (_map.has(vm)) return _map.get(vm);
  else {
    const uid = _uid++;
    _map.set(vm, uid);
    return uid;
  }
}
getUid.reset = () => {
  _uid = 0;
  _map = /* @__PURE__ */ new WeakMap();
};
function injectSelf(key) {
  let vm = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : getCurrentInstance("injectSelf");
  const {
    provides
  } = vm;
  if (provides && key in provides) {
    return provides[key];
  }
  return void 0;
}
const DefaultsSymbol = Symbol.for("vuetify:defaults");
function createDefaults(options) {
  return ref(options);
}
function injectDefaults() {
  const defaults = inject$1(DefaultsSymbol);
  if (!defaults) throw new Error("[Vuetify] Could not find defaults instance");
  return defaults;
}
function provideDefaults(defaults, options) {
  const injectedDefaults = injectDefaults();
  const providedDefaults = ref(defaults);
  const newDefaults = computed(() => {
    const disabled = unref(options == null ? void 0 : options.disabled);
    if (disabled) return injectedDefaults.value;
    const scoped = unref(options == null ? void 0 : options.scoped);
    const reset = unref(options == null ? void 0 : options.reset);
    const root = unref(options == null ? void 0 : options.root);
    if (providedDefaults.value == null && !(scoped || reset || root)) return injectedDefaults.value;
    let properties = mergeDeep(providedDefaults.value, {
      prev: injectedDefaults.value
    });
    if (scoped) return properties;
    if (reset || root) {
      const len = Number(reset || Infinity);
      for (let i = 0; i <= len; i++) {
        if (!properties || !("prev" in properties)) {
          break;
        }
        properties = properties.prev;
      }
      if (properties && typeof root === "string" && root in properties) {
        properties = mergeDeep(mergeDeep(properties, {
          prev: properties
        }), properties[root]);
      }
      return properties;
    }
    return properties.prev ? mergeDeep(properties.prev, properties) : properties;
  });
  provide(DefaultsSymbol, newDefaults);
  return newDefaults;
}
function propIsDefined(vnode, prop) {
  var _a, _b;
  return typeof ((_a = vnode.props) == null ? void 0 : _a[prop]) !== "undefined" || typeof ((_b = vnode.props) == null ? void 0 : _b[toKebabCase(prop)]) !== "undefined";
}
function internalUseDefaults() {
  let props = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
  let name = arguments.length > 1 ? arguments[1] : void 0;
  let defaults = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : injectDefaults();
  const vm = getCurrentInstance("useDefaults");
  name = name ?? vm.type.name ?? vm.type.__name;
  if (!name) {
    throw new Error("[Vuetify] Could not determine component name");
  }
  const componentDefaults = computed(() => {
    var _a;
    return (_a = defaults.value) == null ? void 0 : _a[props._as ?? name];
  });
  const _props = new Proxy(props, {
    get(target, prop) {
      var _a, _b, _c, _d, _e, _f, _g;
      const propValue = Reflect.get(target, prop);
      if (prop === "class" || prop === "style") {
        return [(_a = componentDefaults.value) == null ? void 0 : _a[prop], propValue].filter((v) => v != null);
      } else if (typeof prop === "string" && !propIsDefined(vm.vnode, prop)) {
        return ((_b = componentDefaults.value) == null ? void 0 : _b[prop]) !== void 0 ? (_c = componentDefaults.value) == null ? void 0 : _c[prop] : ((_e = (_d = defaults.value) == null ? void 0 : _d.global) == null ? void 0 : _e[prop]) !== void 0 ? (_g = (_f = defaults.value) == null ? void 0 : _f.global) == null ? void 0 : _g[prop] : propValue;
      }
      return propValue;
    }
  });
  const _subcomponentDefaults = shallowRef();
  watchEffect(() => {
    if (componentDefaults.value) {
      const subComponents = Object.entries(componentDefaults.value).filter((_ref) => {
        let [key] = _ref;
        return key.startsWith(key[0].toUpperCase());
      });
      _subcomponentDefaults.value = subComponents.length ? Object.fromEntries(subComponents) : void 0;
    } else {
      _subcomponentDefaults.value = void 0;
    }
  });
  function provideSubDefaults() {
    const injected = injectSelf(DefaultsSymbol, vm);
    provide(DefaultsSymbol, computed(() => {
      return _subcomponentDefaults.value ? mergeDeep((injected == null ? void 0 : injected.value) ?? {}, _subcomponentDefaults.value) : injected == null ? void 0 : injected.value;
    }));
  }
  return {
    props: _props,
    provideSubDefaults
  };
}
function defineComponent(options) {
  options._setup = options._setup ?? options.setup;
  if (!options.name) {
    consoleWarn("The component is missing an explicit name, unable to generate default prop value");
    return options;
  }
  if (options._setup) {
    options.props = propsFactory(options.props ?? {}, options.name)();
    const propKeys = Object.keys(options.props).filter((key) => key !== "class" && key !== "style");
    options.filterProps = function filterProps(props) {
      return pick(props, propKeys);
    };
    options.props._as = String;
    options.setup = function setup(props, ctx) {
      const defaults = injectDefaults();
      if (!defaults.value) return options._setup(props, ctx);
      const {
        props: _props,
        provideSubDefaults
      } = internalUseDefaults(props, props._as ?? options.name, defaults);
      const setupBindings = options._setup(_props, ctx);
      provideSubDefaults();
      return setupBindings;
    };
  }
  return options;
}
function genericComponent() {
  let exposeDefaults = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : true;
  return (options) => (exposeDefaults ? defineComponent : defineComponent$1)(options);
}
function defineFunctionalComponent(props, render) {
  render.props = props;
  return render;
}
function createSimpleFunctional(klass) {
  let tag = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "div";
  let name = arguments.length > 2 ? arguments[2] : void 0;
  return genericComponent()({
    name: name ?? capitalize(camelize(klass.replace(/__/g, "-"))),
    props: {
      tag: {
        type: String,
        default: tag
      },
      ...makeComponentProps()
    },
    setup(props, _ref) {
      let {
        slots
      } = _ref;
      return () => {
        var _a;
        return h(props.tag, {
          class: [klass, props.class],
          style: props.style
        }, (_a = slots.default) == null ? void 0 : _a.call(slots));
      };
    }
  });
}
function attachedRoot(node) {
  if (typeof node.getRootNode !== "function") {
    while (node.parentNode) node = node.parentNode;
    if (node !== void 0) return null;
    return void 0;
  }
  const root = node.getRootNode();
  if (root !== void 0 && root.getRootNode({
    composed: true
  }) !== void 0) return null;
  return root;
}
const standardEasing = "cubic-bezier(0.4, 0, 0.2, 1)";
const deceleratedEasing = "cubic-bezier(0.0, 0, 0.2, 1)";
const acceleratedEasing = "cubic-bezier(0.4, 0, 1, 1)";
function getPrefixedEventHandlers(attrs, suffix, getData) {
  return Object.keys(attrs).filter((key) => isOn(key) && key.endsWith(suffix)).reduce((acc, key) => {
    acc[key.slice(0, -suffix.length)] = (event) => attrs[key](event, getData(event));
    return acc;
  }, {});
}
function getScrollParent(el) {
  let includeHidden = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
  while (el) {
    if (includeHidden ? isPotentiallyScrollable(el) : hasScrollbar(el)) return el;
    el = el.parentElement;
  }
  return (void 0).scrollingElement;
}
function getScrollParents(el, stopAt) {
  const elements = [];
  if (stopAt && el && !stopAt.contains(el)) return elements;
  while (el) {
    if (hasScrollbar(el)) elements.push(el);
    if (el === stopAt) break;
    el = el.parentElement;
  }
  return elements;
}
function hasScrollbar(el) {
  if (!el || el.nodeType !== Node.ELEMENT_NODE) return false;
  const style = (void 0).getComputedStyle(el);
  return style.overflowY === "scroll" || style.overflowY === "auto" && el.scrollHeight > el.clientHeight;
}
function isPotentiallyScrollable(el) {
  if (!el || el.nodeType !== Node.ELEMENT_NODE) return false;
  const style = (void 0).getComputedStyle(el);
  return ["scroll", "auto"].includes(style.overflowY);
}
function isFixedPosition(el) {
  while (el) {
    if ((void 0).getComputedStyle(el).position === "fixed") {
      return true;
    }
    el = el.offsetParent;
  }
  return false;
}
function useRender(render) {
  const vm = getCurrentInstance("useRender");
  vm.render = render;
}
function useProxiedModel(props, prop, defaultValue) {
  let transformIn = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : (v) => v;
  let transformOut = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : (v) => v;
  const vm = getCurrentInstance("useProxiedModel");
  const internal = ref(props[prop] !== void 0 ? props[prop] : defaultValue);
  const kebabProp = toKebabCase(prop);
  const checkKebab = kebabProp !== prop;
  const isControlled = checkKebab ? computed(() => {
    var _a, _b, _c, _d;
    void props[prop];
    return !!((((_a = vm.vnode.props) == null ? void 0 : _a.hasOwnProperty(prop)) || ((_b = vm.vnode.props) == null ? void 0 : _b.hasOwnProperty(kebabProp))) && (((_c = vm.vnode.props) == null ? void 0 : _c.hasOwnProperty(`onUpdate:${prop}`)) || ((_d = vm.vnode.props) == null ? void 0 : _d.hasOwnProperty(`onUpdate:${kebabProp}`))));
  }) : computed(() => {
    var _a, _b;
    void props[prop];
    return !!(((_a = vm.vnode.props) == null ? void 0 : _a.hasOwnProperty(prop)) && ((_b = vm.vnode.props) == null ? void 0 : _b.hasOwnProperty(`onUpdate:${prop}`)));
  });
  useToggleScope(() => !isControlled.value, () => {
    watch(() => props[prop], (val) => {
      internal.value = val;
    });
  });
  const model = computed({
    get() {
      const externalValue = props[prop];
      return transformIn(isControlled.value ? externalValue : internal.value);
    },
    set(internalValue) {
      const newValue = transformOut(internalValue);
      const value = toRaw(isControlled.value ? props[prop] : internal.value);
      if (value === newValue || transformIn(value) === internalValue) {
        return;
      }
      internal.value = newValue;
      vm == null ? void 0 : vm.emit(`update:${prop}`, newValue);
    }
  });
  Object.defineProperty(model, "externalValue", {
    get: () => isControlled.value ? props[prop] : internal.value
  });
  return model;
}
const en = {
  badge: "Badge",
  open: "Open",
  close: "Close",
  dismiss: "Dismiss",
  confirmEdit: {
    ok: "OK",
    cancel: "Cancel"
  },
  dataIterator: {
    noResultsText: "No matching records found",
    loadingText: "Loading items..."
  },
  dataTable: {
    itemsPerPageText: "Rows per page:",
    ariaLabel: {
      sortDescending: "Sorted descending.",
      sortAscending: "Sorted ascending.",
      sortNone: "Not sorted.",
      activateNone: "Activate to remove sorting.",
      activateDescending: "Activate to sort descending.",
      activateAscending: "Activate to sort ascending."
    },
    sortBy: "Sort by"
  },
  dataFooter: {
    itemsPerPageText: "Items per page:",
    itemsPerPageAll: "All",
    nextPage: "Next page",
    prevPage: "Previous page",
    firstPage: "First page",
    lastPage: "Last page",
    pageText: "{0}-{1} of {2}"
  },
  dateRangeInput: {
    divider: "to"
  },
  datePicker: {
    itemsSelected: "{0} selected",
    range: {
      title: "Select dates",
      header: "Enter dates"
    },
    title: "Select date",
    header: "Enter date",
    input: {
      placeholder: "Enter date"
    }
  },
  noDataText: "No data available",
  carousel: {
    prev: "Previous visual",
    next: "Next visual",
    ariaLabel: {
      delimiter: "Carousel slide {0} of {1}"
    }
  },
  calendar: {
    moreEvents: "{0} more",
    today: "Today"
  },
  input: {
    clear: "Clear {0}",
    prependAction: "{0} prepended action",
    appendAction: "{0} appended action",
    otp: "Please enter OTP character {0}"
  },
  fileInput: {
    counter: "{0} files",
    counterSize: "{0} files ({1} in total)"
  },
  timePicker: {
    am: "AM",
    pm: "PM",
    title: "Select Time"
  },
  pagination: {
    ariaLabel: {
      root: "Pagination Navigation",
      next: "Next page",
      previous: "Previous page",
      page: "Go to page {0}",
      currentPage: "Page {0}, Current page",
      first: "First page",
      last: "Last page"
    }
  },
  stepper: {
    next: "Next",
    prev: "Previous"
  },
  rating: {
    ariaLabel: {
      item: "Rating {0} of {1}"
    }
  },
  loading: "Loading...",
  infiniteScroll: {
    loadMore: "Load more",
    empty: "No more"
  }
};
const LANG_PREFIX = "$vuetify.";
const replace = (str, params) => {
  return str.replace(/\{(\d+)\}/g, (match, index) => {
    return String(params[+index]);
  });
};
const createTranslateFunction = (current, fallback, messages) => {
  return function(key) {
    for (var _len = arguments.length, params = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      params[_key - 1] = arguments[_key];
    }
    if (!key.startsWith(LANG_PREFIX)) {
      return replace(key, params);
    }
    const shortKey = key.replace(LANG_PREFIX, "");
    const currentLocale = current.value && messages.value[current.value];
    const fallbackLocale = fallback.value && messages.value[fallback.value];
    let str = getObjectValueByPath(currentLocale, shortKey, null);
    if (!str) {
      consoleWarn(`Translation key "${key}" not found in "${current.value}", trying fallback locale`);
      str = getObjectValueByPath(fallbackLocale, shortKey, null);
    }
    if (!str) {
      consoleError(`Translation key "${key}" not found in fallback`);
      str = key;
    }
    if (typeof str !== "string") {
      consoleError(`Translation key "${key}" has a non-string value`);
      str = key;
    }
    return replace(str, params);
  };
};
function createNumberFunction(current, fallback) {
  return (value, options) => {
    const numberFormat = new Intl.NumberFormat([current.value, fallback.value], options);
    return numberFormat.format(value);
  };
}
function useProvided(props, prop, provided) {
  const internal = useProxiedModel(props, prop, props[prop] ?? provided.value);
  internal.value = props[prop] ?? provided.value;
  watch(provided, (v) => {
    if (props[prop] == null) {
      internal.value = provided.value;
    }
  });
  return internal;
}
function createProvideFunction(state) {
  return (props) => {
    const current = useProvided(props, "locale", state.current);
    const fallback = useProvided(props, "fallback", state.fallback);
    const messages = useProvided(props, "messages", state.messages);
    return {
      name: "vuetify",
      current,
      fallback,
      messages,
      t: createTranslateFunction(current, fallback, messages),
      n: createNumberFunction(current, fallback),
      provide: createProvideFunction({
        current,
        fallback,
        messages
      })
    };
  };
}
function createVuetifyAdapter(options) {
  const current = shallowRef((options == null ? void 0 : options.locale) ?? "en");
  const fallback = shallowRef((options == null ? void 0 : options.fallback) ?? "en");
  const messages = ref({
    en,
    ...options == null ? void 0 : options.messages
  });
  return {
    name: "vuetify",
    current,
    fallback,
    messages,
    t: createTranslateFunction(current, fallback, messages),
    n: createNumberFunction(current, fallback),
    provide: createProvideFunction({
      current,
      fallback,
      messages
    })
  };
}
const LocaleSymbol = Symbol.for("vuetify:locale");
function isLocaleInstance(obj) {
  return obj.name != null;
}
function createLocale(options) {
  const i18n = (options == null ? void 0 : options.adapter) && isLocaleInstance(options == null ? void 0 : options.adapter) ? options == null ? void 0 : options.adapter : createVuetifyAdapter(options);
  const rtl = createRtl(i18n, options);
  return {
    ...i18n,
    ...rtl
  };
}
function useLocale() {
  const locale = inject$1(LocaleSymbol);
  if (!locale) throw new Error("[Vuetify] Could not find injected locale instance");
  return locale;
}
function genDefaults$3() {
  return {
    af: false,
    ar: true,
    bg: false,
    ca: false,
    ckb: false,
    cs: false,
    de: false,
    el: false,
    en: false,
    es: false,
    et: false,
    fa: true,
    fi: false,
    fr: false,
    hr: false,
    hu: false,
    he: true,
    id: false,
    it: false,
    ja: false,
    km: false,
    ko: false,
    lv: false,
    lt: false,
    nl: false,
    no: false,
    pl: false,
    pt: false,
    ro: false,
    ru: false,
    sk: false,
    sl: false,
    srCyrl: false,
    srLatn: false,
    sv: false,
    th: false,
    tr: false,
    az: false,
    uk: false,
    vi: false,
    zhHans: false,
    zhHant: false
  };
}
function createRtl(i18n, options) {
  const rtl = ref((options == null ? void 0 : options.rtl) ?? genDefaults$3());
  const isRtl = computed(() => rtl.value[i18n.current.value] ?? false);
  return {
    isRtl,
    rtl,
    rtlClasses: computed(() => `v-locale--is-${isRtl.value ? "rtl" : "ltr"}`)
  };
}
function useRtl() {
  const locale = inject$1(LocaleSymbol);
  if (!locale) throw new Error("[Vuetify] Could not find injected rtl instance");
  return {
    isRtl: locale.isRtl,
    rtlClasses: locale.rtlClasses
  };
}
const firstDay = {
  "001": 1,
  AD: 1,
  AE: 6,
  AF: 6,
  AG: 0,
  AI: 1,
  AL: 1,
  AM: 1,
  AN: 1,
  AR: 1,
  AS: 0,
  AT: 1,
  AU: 1,
  AX: 1,
  AZ: 1,
  BA: 1,
  BD: 0,
  BE: 1,
  BG: 1,
  BH: 6,
  BM: 1,
  BN: 1,
  BR: 0,
  BS: 0,
  BT: 0,
  BW: 0,
  BY: 1,
  BZ: 0,
  CA: 0,
  CH: 1,
  CL: 1,
  CM: 1,
  CN: 1,
  CO: 0,
  CR: 1,
  CY: 1,
  CZ: 1,
  DE: 1,
  DJ: 6,
  DK: 1,
  DM: 0,
  DO: 0,
  DZ: 6,
  EC: 1,
  EE: 1,
  EG: 6,
  ES: 1,
  ET: 0,
  FI: 1,
  FJ: 1,
  FO: 1,
  FR: 1,
  GB: 1,
  "GB-alt-variant": 0,
  GE: 1,
  GF: 1,
  GP: 1,
  GR: 1,
  GT: 0,
  GU: 0,
  HK: 0,
  HN: 0,
  HR: 1,
  HU: 1,
  ID: 0,
  IE: 1,
  IL: 0,
  IN: 0,
  IQ: 6,
  IR: 6,
  IS: 1,
  IT: 1,
  JM: 0,
  JO: 6,
  JP: 0,
  KE: 0,
  KG: 1,
  KH: 0,
  KR: 0,
  KW: 6,
  KZ: 1,
  LA: 0,
  LB: 1,
  LI: 1,
  LK: 1,
  LT: 1,
  LU: 1,
  LV: 1,
  LY: 6,
  MC: 1,
  MD: 1,
  ME: 1,
  MH: 0,
  MK: 1,
  MM: 0,
  MN: 1,
  MO: 0,
  MQ: 1,
  MT: 0,
  MV: 5,
  MX: 0,
  MY: 1,
  MZ: 0,
  NI: 0,
  NL: 1,
  NO: 1,
  NP: 0,
  NZ: 1,
  OM: 6,
  PA: 0,
  PE: 0,
  PH: 0,
  PK: 0,
  PL: 1,
  PR: 0,
  PT: 0,
  PY: 0,
  QA: 6,
  RE: 1,
  RO: 1,
  RS: 1,
  RU: 1,
  SA: 0,
  SD: 6,
  SE: 1,
  SG: 0,
  SI: 1,
  SK: 1,
  SM: 1,
  SV: 0,
  SY: 6,
  TH: 0,
  TJ: 1,
  TM: 1,
  TR: 1,
  TT: 0,
  TW: 0,
  UA: 1,
  UM: 0,
  US: 0,
  UY: 1,
  UZ: 1,
  VA: 1,
  VE: 0,
  VI: 0,
  VN: 1,
  WS: 0,
  XK: 1,
  YE: 0,
  ZA: 0,
  ZW: 0
};
function getWeekArray(date2, locale) {
  const weeks = [];
  let currentWeek = [];
  const firstDayOfMonth = startOfMonth(date2);
  const lastDayOfMonth = endOfMonth(date2);
  const firstDayWeekIndex = (firstDayOfMonth.getDay() - firstDay[locale.slice(-2).toUpperCase()] + 7) % 7;
  const lastDayWeekIndex = (lastDayOfMonth.getDay() - firstDay[locale.slice(-2).toUpperCase()] + 7) % 7;
  for (let i = 0; i < firstDayWeekIndex; i++) {
    const adjacentDay = new Date(firstDayOfMonth);
    adjacentDay.setDate(adjacentDay.getDate() - (firstDayWeekIndex - i));
    currentWeek.push(adjacentDay);
  }
  for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
    const day = new Date(date2.getFullYear(), date2.getMonth(), i);
    currentWeek.push(day);
    if (currentWeek.length === 7) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  }
  for (let i = 1; i < 7 - lastDayWeekIndex; i++) {
    const adjacentDay = new Date(lastDayOfMonth);
    adjacentDay.setDate(adjacentDay.getDate() + i);
    currentWeek.push(adjacentDay);
  }
  if (currentWeek.length > 0) {
    weeks.push(currentWeek);
  }
  return weeks;
}
function startOfWeek(date2, locale) {
  const d = new Date(date2);
  while (d.getDay() !== (firstDay[locale.slice(-2).toUpperCase()] ?? 0)) {
    d.setDate(d.getDate() - 1);
  }
  return d;
}
function endOfWeek(date2, locale) {
  const d = new Date(date2);
  const lastDay = ((firstDay[locale.slice(-2).toUpperCase()] ?? 0) + 6) % 7;
  while (d.getDay() !== lastDay) {
    d.setDate(d.getDate() + 1);
  }
  return d;
}
function startOfMonth(date2) {
  return new Date(date2.getFullYear(), date2.getMonth(), 1);
}
function endOfMonth(date2) {
  return new Date(date2.getFullYear(), date2.getMonth() + 1, 0);
}
function parseLocalDate(value) {
  const parts = value.split("-").map(Number);
  return new Date(parts[0], parts[1] - 1, parts[2]);
}
const _YYYMMDD = /^([12]\d{3}-([1-9]|0[1-9]|1[0-2])-([1-9]|0[1-9]|[12]\d|3[01]))$/;
function date(value) {
  if (value == null) return /* @__PURE__ */ new Date();
  if (value instanceof Date) return value;
  if (typeof value === "string") {
    let parsed;
    if (_YYYMMDD.test(value)) {
      return parseLocalDate(value);
    } else {
      parsed = Date.parse(value);
    }
    if (!isNaN(parsed)) return new Date(parsed);
  }
  return null;
}
const sundayJanuarySecond2000 = new Date(2e3, 0, 2);
function getWeekdays(locale) {
  const daysFromSunday = firstDay[locale.slice(-2).toUpperCase()];
  return createRange(7).map((i) => {
    const weekday = new Date(sundayJanuarySecond2000);
    weekday.setDate(sundayJanuarySecond2000.getDate() + daysFromSunday + i);
    return new Intl.DateTimeFormat(locale, {
      weekday: "narrow"
    }).format(weekday);
  });
}
function format(value, formatString, locale, formats) {
  const newDate = date(value) ?? /* @__PURE__ */ new Date();
  const customFormat = formats == null ? void 0 : formats[formatString];
  if (typeof customFormat === "function") {
    return customFormat(newDate, formatString, locale);
  }
  let options = {};
  switch (formatString) {
    case "fullDate":
      options = {
        year: "numeric",
        month: "long",
        day: "numeric"
      };
      break;
    case "fullDateWithWeekday":
      options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
      };
      break;
    case "normalDate":
      const day = newDate.getDate();
      const month = new Intl.DateTimeFormat(locale, {
        month: "long"
      }).format(newDate);
      return `${day} ${month}`;
    case "normalDateWithWeekday":
      options = {
        weekday: "short",
        day: "numeric",
        month: "short"
      };
      break;
    case "shortDate":
      options = {
        month: "short",
        day: "numeric"
      };
      break;
    case "year":
      options = {
        year: "numeric"
      };
      break;
    case "month":
      options = {
        month: "long"
      };
      break;
    case "monthShort":
      options = {
        month: "short"
      };
      break;
    case "monthAndYear":
      options = {
        month: "long",
        year: "numeric"
      };
      break;
    case "monthAndDate":
      options = {
        month: "long",
        day: "numeric"
      };
      break;
    case "weekday":
      options = {
        weekday: "long"
      };
      break;
    case "weekdayShort":
      options = {
        weekday: "short"
      };
      break;
    case "dayOfMonth":
      return new Intl.NumberFormat(locale).format(newDate.getDate());
    case "hours12h":
      options = {
        hour: "numeric",
        hour12: true
      };
      break;
    case "hours24h":
      options = {
        hour: "numeric",
        hour12: false
      };
      break;
    case "minutes":
      options = {
        minute: "numeric"
      };
      break;
    case "seconds":
      options = {
        second: "numeric"
      };
      break;
    case "fullTime":
      options = {
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: true
      };
      break;
    case "fullTime12h":
      options = {
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: true
      };
      break;
    case "fullTime24h":
      options = {
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: false
      };
      break;
    case "fullDateTime":
      options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: true
      };
      break;
    case "fullDateTime12h":
      options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: true
      };
      break;
    case "fullDateTime24h":
      options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: false
      };
      break;
    case "keyboardDate":
      options = {
        year: "numeric",
        month: "2-digit",
        day: "2-digit"
      };
      break;
    case "keyboardDateTime":
      options = {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: false
      };
      break;
    case "keyboardDateTime12h":
      options = {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: true
      };
      break;
    case "keyboardDateTime24h":
      options = {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: false
      };
      break;
    default:
      options = customFormat ?? {
        timeZone: "UTC",
        timeZoneName: "short"
      };
  }
  return new Intl.DateTimeFormat(locale, options).format(newDate);
}
function toISO(adapter, value) {
  const date2 = adapter.toJsDate(value);
  const year = date2.getFullYear();
  const month = padStart(String(date2.getMonth() + 1), 2, "0");
  const day = padStart(String(date2.getDate()), 2, "0");
  return `${year}-${month}-${day}`;
}
function parseISO(value) {
  const [year, month, day] = value.split("-").map(Number);
  return new Date(year, month - 1, day);
}
function addMinutes(date2, amount) {
  const d = new Date(date2);
  d.setMinutes(d.getMinutes() + amount);
  return d;
}
function addHours(date2, amount) {
  const d = new Date(date2);
  d.setHours(d.getHours() + amount);
  return d;
}
function addDays(date2, amount) {
  const d = new Date(date2);
  d.setDate(d.getDate() + amount);
  return d;
}
function addWeeks(date2, amount) {
  const d = new Date(date2);
  d.setDate(d.getDate() + amount * 7);
  return d;
}
function addMonths(date2, amount) {
  const d = new Date(date2);
  d.setDate(1);
  d.setMonth(d.getMonth() + amount);
  return d;
}
function getYear(date2) {
  return date2.getFullYear();
}
function getMonth(date2) {
  return date2.getMonth();
}
function getDate(date2) {
  return date2.getDate();
}
function getNextMonth(date2) {
  return new Date(date2.getFullYear(), date2.getMonth() + 1, 1);
}
function getPreviousMonth(date2) {
  return new Date(date2.getFullYear(), date2.getMonth() - 1, 1);
}
function getHours(date2) {
  return date2.getHours();
}
function getMinutes(date2) {
  return date2.getMinutes();
}
function startOfYear(date2) {
  return new Date(date2.getFullYear(), 0, 1);
}
function endOfYear(date2) {
  return new Date(date2.getFullYear(), 11, 31);
}
function isWithinRange(date2, range) {
  return isAfter(date2, range[0]) && isBefore(date2, range[1]);
}
function isValid(date2) {
  const d = new Date(date2);
  return d instanceof Date && !isNaN(d.getTime());
}
function isAfter(date2, comparing) {
  return date2.getTime() > comparing.getTime();
}
function isAfterDay(date2, comparing) {
  return isAfter(startOfDay(date2), startOfDay(comparing));
}
function isBefore(date2, comparing) {
  return date2.getTime() < comparing.getTime();
}
function isEqual(date2, comparing) {
  return date2.getTime() === comparing.getTime();
}
function isSameDay(date2, comparing) {
  return date2.getDate() === comparing.getDate() && date2.getMonth() === comparing.getMonth() && date2.getFullYear() === comparing.getFullYear();
}
function isSameMonth(date2, comparing) {
  return date2.getMonth() === comparing.getMonth() && date2.getFullYear() === comparing.getFullYear();
}
function isSameYear(date2, comparing) {
  return date2.getFullYear() === comparing.getFullYear();
}
function getDiff(date2, comparing, unit) {
  const d = new Date(date2);
  const c = new Date(comparing);
  switch (unit) {
    case "years":
      return d.getFullYear() - c.getFullYear();
    case "quarters":
      return Math.floor((d.getMonth() - c.getMonth() + (d.getFullYear() - c.getFullYear()) * 12) / 4);
    case "months":
      return d.getMonth() - c.getMonth() + (d.getFullYear() - c.getFullYear()) * 12;
    case "weeks":
      return Math.floor((d.getTime() - c.getTime()) / (1e3 * 60 * 60 * 24 * 7));
    case "days":
      return Math.floor((d.getTime() - c.getTime()) / (1e3 * 60 * 60 * 24));
    case "hours":
      return Math.floor((d.getTime() - c.getTime()) / (1e3 * 60 * 60));
    case "minutes":
      return Math.floor((d.getTime() - c.getTime()) / (1e3 * 60));
    case "seconds":
      return Math.floor((d.getTime() - c.getTime()) / 1e3);
    default: {
      return d.getTime() - c.getTime();
    }
  }
}
function setHours(date2, count) {
  const d = new Date(date2);
  d.setHours(count);
  return d;
}
function setMinutes(date2, count) {
  const d = new Date(date2);
  d.setMinutes(count);
  return d;
}
function setMonth(date2, count) {
  const d = new Date(date2);
  d.setMonth(count);
  return d;
}
function setDate(date2, day) {
  const d = new Date(date2);
  d.setDate(day);
  return d;
}
function setYear(date2, year) {
  const d = new Date(date2);
  d.setFullYear(year);
  return d;
}
function startOfDay(date2) {
  return new Date(date2.getFullYear(), date2.getMonth(), date2.getDate(), 0, 0, 0, 0);
}
function endOfDay(date2) {
  return new Date(date2.getFullYear(), date2.getMonth(), date2.getDate(), 23, 59, 59, 999);
}
class VuetifyDateAdapter {
  constructor(options) {
    this.locale = options.locale;
    this.formats = options.formats;
  }
  date(value) {
    return date(value);
  }
  toJsDate(date2) {
    return date2;
  }
  toISO(date2) {
    return toISO(this, date2);
  }
  parseISO(date2) {
    return parseISO(date2);
  }
  addMinutes(date2, amount) {
    return addMinutes(date2, amount);
  }
  addHours(date2, amount) {
    return addHours(date2, amount);
  }
  addDays(date2, amount) {
    return addDays(date2, amount);
  }
  addWeeks(date2, amount) {
    return addWeeks(date2, amount);
  }
  addMonths(date2, amount) {
    return addMonths(date2, amount);
  }
  getWeekArray(date2) {
    return getWeekArray(date2, this.locale);
  }
  startOfWeek(date2) {
    return startOfWeek(date2, this.locale);
  }
  endOfWeek(date2) {
    return endOfWeek(date2, this.locale);
  }
  startOfMonth(date2) {
    return startOfMonth(date2);
  }
  endOfMonth(date2) {
    return endOfMonth(date2);
  }
  format(date2, formatString) {
    return format(date2, formatString, this.locale, this.formats);
  }
  isEqual(date2, comparing) {
    return isEqual(date2, comparing);
  }
  isValid(date2) {
    return isValid(date2);
  }
  isWithinRange(date2, range) {
    return isWithinRange(date2, range);
  }
  isAfter(date2, comparing) {
    return isAfter(date2, comparing);
  }
  isAfterDay(date2, comparing) {
    return isAfterDay(date2, comparing);
  }
  isBefore(date2, comparing) {
    return !isAfter(date2, comparing) && !isEqual(date2, comparing);
  }
  isSameDay(date2, comparing) {
    return isSameDay(date2, comparing);
  }
  isSameMonth(date2, comparing) {
    return isSameMonth(date2, comparing);
  }
  isSameYear(date2, comparing) {
    return isSameYear(date2, comparing);
  }
  setMinutes(date2, count) {
    return setMinutes(date2, count);
  }
  setHours(date2, count) {
    return setHours(date2, count);
  }
  setMonth(date2, count) {
    return setMonth(date2, count);
  }
  setDate(date2, day) {
    return setDate(date2, day);
  }
  setYear(date2, year) {
    return setYear(date2, year);
  }
  getDiff(date2, comparing, unit) {
    return getDiff(date2, comparing, unit);
  }
  getWeekdays() {
    return getWeekdays(this.locale);
  }
  getYear(date2) {
    return getYear(date2);
  }
  getMonth(date2) {
    return getMonth(date2);
  }
  getDate(date2) {
    return getDate(date2);
  }
  getNextMonth(date2) {
    return getNextMonth(date2);
  }
  getPreviousMonth(date2) {
    return getPreviousMonth(date2);
  }
  getHours(date2) {
    return getHours(date2);
  }
  getMinutes(date2) {
    return getMinutes(date2);
  }
  startOfDay(date2) {
    return startOfDay(date2);
  }
  endOfDay(date2) {
    return endOfDay(date2);
  }
  startOfYear(date2) {
    return startOfYear(date2);
  }
  endOfYear(date2) {
    return endOfYear(date2);
  }
}
const DateOptionsSymbol = Symbol.for("vuetify:date-options");
const DateAdapterSymbol = Symbol.for("vuetify:date-adapter");
function createDate(options, locale) {
  const _options = mergeDeep({
    adapter: VuetifyDateAdapter,
    locale: {
      af: "af-ZA",
      // ar: '', # not the same value for all variants
      bg: "bg-BG",
      ca: "ca-ES",
      ckb: "",
      cs: "cs-CZ",
      de: "de-DE",
      el: "el-GR",
      en: "en-US",
      // es: '', # not the same value for all variants
      et: "et-EE",
      fa: "fa-IR",
      fi: "fi-FI",
      // fr: '', #not the same value for all variants
      hr: "hr-HR",
      hu: "hu-HU",
      he: "he-IL",
      id: "id-ID",
      it: "it-IT",
      ja: "ja-JP",
      ko: "ko-KR",
      lv: "lv-LV",
      lt: "lt-LT",
      nl: "nl-NL",
      no: "no-NO",
      pl: "pl-PL",
      pt: "pt-PT",
      ro: "ro-RO",
      ru: "ru-RU",
      sk: "sk-SK",
      sl: "sl-SI",
      srCyrl: "sr-SP",
      srLatn: "sr-SP",
      sv: "sv-SE",
      th: "th-TH",
      tr: "tr-TR",
      az: "az-AZ",
      uk: "uk-UA",
      vi: "vi-VN",
      zhHans: "zh-CN",
      zhHant: "zh-TW"
    }
  }, options);
  return {
    options: _options,
    instance: createInstance(_options, locale)
  };
}
function createInstance(options, locale) {
  const instance = reactive(typeof options.adapter === "function" ? new options.adapter({
    locale: options.locale[locale.current.value] ?? locale.current.value,
    formats: options.formats
  }) : options.adapter);
  watch(locale.current, (value) => {
    instance.locale = options.locale[value] ?? value ?? instance.locale;
  });
  return instance;
}
function useDate() {
  const options = inject$1(DateOptionsSymbol);
  if (!options) throw new Error("[Vuetify] Could not find injected date options");
  const locale = useLocale();
  return createInstance(options, locale);
}
function getWeek(adapter, value) {
  const date2 = adapter.toJsDate(value);
  let year = date2.getFullYear();
  let d1w1 = new Date(year, 0, 1);
  if (date2 < d1w1) {
    year = year - 1;
    d1w1 = new Date(year, 0, 1);
  } else {
    const tv = new Date(year + 1, 0, 1);
    if (date2 >= tv) {
      year = year + 1;
      d1w1 = tv;
    }
  }
  const diffTime = Math.abs(date2.getTime() - d1w1.getTime());
  const diffDays = Math.ceil(diffTime / (1e3 * 60 * 60 * 24));
  return Math.floor(diffDays / 7) + 1;
}
const breakpoints = ["sm", "md", "lg", "xl", "xxl"];
const DisplaySymbol = Symbol.for("vuetify:display");
const defaultDisplayOptions = {
  mobileBreakpoint: "lg",
  thresholds: {
    xs: 0,
    sm: 600,
    md: 960,
    lg: 1280,
    xl: 1920,
    xxl: 2560
  }
};
const parseDisplayOptions = function() {
  let options = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : defaultDisplayOptions;
  return mergeDeep(defaultDisplayOptions, options);
};
function getClientWidth(ssr) {
  return typeof ssr === "object" && ssr.clientWidth || 0;
}
function getClientHeight(ssr) {
  return typeof ssr === "object" && ssr.clientHeight || 0;
}
function getPlatform(ssr) {
  const userAgent = "ssr";
  function match(regexp) {
    return Boolean(userAgent.match(regexp));
  }
  const android = match(/android/i);
  const ios = match(/iphone|ipad|ipod/i);
  const cordova = match(/cordova/i);
  const electron = match(/electron/i);
  const chrome = match(/chrome/i);
  const edge = match(/edge/i);
  const firefox = match(/firefox/i);
  const opera = match(/opera/i);
  const win = match(/win/i);
  const mac = match(/mac/i);
  const linux = match(/linux/i);
  return {
    android,
    ios,
    cordova,
    electron,
    chrome,
    edge,
    firefox,
    opera,
    win,
    mac,
    linux,
    touch: SUPPORTS_TOUCH,
    ssr: userAgent === "ssr"
  };
}
function createDisplay(options, ssr) {
  const {
    thresholds,
    mobileBreakpoint
  } = parseDisplayOptions(options);
  const height = shallowRef(getClientHeight(ssr));
  const platform = shallowRef(getPlatform());
  const state = reactive({});
  const width = shallowRef(getClientWidth(ssr));
  function updateSize() {
    height.value = getClientHeight();
    width.value = getClientWidth();
  }
  function update() {
    updateSize();
    platform.value = getPlatform();
  }
  watchEffect(() => {
    const xs = width.value < thresholds.sm;
    const sm = width.value < thresholds.md && !xs;
    const md = width.value < thresholds.lg && !(sm || xs);
    const lg = width.value < thresholds.xl && !(md || sm || xs);
    const xl = width.value < thresholds.xxl && !(lg || md || sm || xs);
    const xxl = width.value >= thresholds.xxl;
    const name = xs ? "xs" : sm ? "sm" : md ? "md" : lg ? "lg" : xl ? "xl" : "xxl";
    const breakpointValue = typeof mobileBreakpoint === "number" ? mobileBreakpoint : thresholds[mobileBreakpoint];
    const mobile = width.value < breakpointValue;
    state.xs = xs;
    state.sm = sm;
    state.md = md;
    state.lg = lg;
    state.xl = xl;
    state.xxl = xxl;
    state.smAndUp = !xs;
    state.mdAndUp = !(xs || sm);
    state.lgAndUp = !(xs || sm || md);
    state.xlAndUp = !(xs || sm || md || lg);
    state.smAndDown = !(md || lg || xl || xxl);
    state.mdAndDown = !(lg || xl || xxl);
    state.lgAndDown = !(xl || xxl);
    state.xlAndDown = !xxl;
    state.name = name;
    state.height = height.value;
    state.width = width.value;
    state.mobile = mobile;
    state.mobileBreakpoint = mobileBreakpoint;
    state.platform = platform.value;
    state.thresholds = thresholds;
  });
  return {
    ...toRefs(state),
    update,
    ssr: !!ssr
  };
}
const makeDisplayProps = propsFactory({
  mobile: {
    type: Boolean,
    default: false
  },
  mobileBreakpoint: [Number, String]
}, "display");
function useDisplay() {
  let props = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
  let name = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : getCurrentInstanceName();
  const display = inject$1(DisplaySymbol);
  if (!display) throw new Error("Could not find Vuetify display injection");
  const mobile = computed(() => {
    if (props.mobile != null) return props.mobile;
    if (!props.mobileBreakpoint) return display.mobile.value;
    const breakpointValue = typeof props.mobileBreakpoint === "number" ? props.mobileBreakpoint : display.thresholds.value[props.mobileBreakpoint];
    return display.width.value < breakpointValue;
  });
  const displayClasses = computed(() => {
    if (!name) return {};
    return {
      [`${name}--mobile`]: mobile.value
    };
  });
  return {
    ...display,
    displayClasses,
    mobile
  };
}
const GoToSymbol = Symbol.for("vuetify:goto");
function genDefaults$2() {
  return {
    container: void 0,
    duration: 300,
    layout: false,
    offset: 0,
    easing: "easeInOutCubic",
    patterns: {
      linear: (t) => t,
      easeInQuad: (t) => t ** 2,
      easeOutQuad: (t) => t * (2 - t),
      easeInOutQuad: (t) => t < 0.5 ? 2 * t ** 2 : -1 + (4 - 2 * t) * t,
      easeInCubic: (t) => t ** 3,
      easeOutCubic: (t) => --t ** 3 + 1,
      easeInOutCubic: (t) => t < 0.5 ? 4 * t ** 3 : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
      easeInQuart: (t) => t ** 4,
      easeOutQuart: (t) => 1 - --t ** 4,
      easeInOutQuart: (t) => t < 0.5 ? 8 * t ** 4 : 1 - 8 * --t ** 4,
      easeInQuint: (t) => t ** 5,
      easeOutQuint: (t) => 1 + --t ** 5,
      easeInOutQuint: (t) => t < 0.5 ? 16 * t ** 5 : 1 + 16 * --t ** 5
    }
  };
}
function getContainer(el) {
  return getTarget$1(el) ?? ((void 0).scrollingElement || (void 0).body);
}
function getTarget$1(el) {
  return typeof el === "string" ? (void 0).querySelector(el) : refElement(el);
}
function getOffset$1(target, horizontal, rtl) {
  if (typeof target === "number") return horizontal && rtl ? -target : target;
  let el = getTarget$1(target);
  let totalOffset = 0;
  while (el) {
    totalOffset += horizontal ? el.offsetLeft : el.offsetTop;
    el = el.offsetParent;
  }
  return totalOffset;
}
function createGoTo(options, locale) {
  return {
    rtl: locale.isRtl,
    options: mergeDeep(genDefaults$2(), options)
  };
}
async function scrollTo(_target, _options, horizontal, goTo) {
  const property = horizontal ? "scrollLeft" : "scrollTop";
  const options = mergeDeep((goTo == null ? void 0 : goTo.options) ?? genDefaults$2(), _options);
  const rtl = goTo == null ? void 0 : goTo.rtl.value;
  const target = (typeof _target === "number" ? _target : getTarget$1(_target)) ?? 0;
  const container = options.container === "parent" && target instanceof HTMLElement ? target.parentElement : getContainer(options.container);
  const ease = typeof options.easing === "function" ? options.easing : options.patterns[options.easing];
  if (!ease) throw new TypeError(`Easing function "${options.easing}" not found.`);
  let targetLocation;
  if (typeof target === "number") {
    targetLocation = getOffset$1(target, horizontal, rtl);
  } else {
    targetLocation = getOffset$1(target, horizontal, rtl) - getOffset$1(container, horizontal, rtl);
    if (options.layout) {
      const styles = (void 0).getComputedStyle(target);
      const layoutOffset = styles.getPropertyValue("--v-layout-top");
      if (layoutOffset) targetLocation -= parseInt(layoutOffset, 10);
    }
  }
  targetLocation += options.offset;
  targetLocation = clampTarget(container, targetLocation, !!rtl, !!horizontal);
  const startLocation = container[property] ?? 0;
  if (targetLocation === startLocation) return Promise.resolve(targetLocation);
  const startTime = performance.now();
  return new Promise((resolve) => requestAnimationFrame(function step(currentTime) {
    const timeElapsed = currentTime - startTime;
    const progress = timeElapsed / options.duration;
    const location = Math.floor(startLocation + (targetLocation - startLocation) * ease(clamp(progress, 0, 1)));
    container[property] = location;
    if (progress >= 1 && Math.abs(location - container[property]) < 10) {
      return resolve(targetLocation);
    } else if (progress > 2) {
      consoleWarn("Scroll target is not reachable");
      return resolve(container[property]);
    }
    requestAnimationFrame(step);
  }));
}
function useGoTo() {
  let _options = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
  const goToInstance = inject$1(GoToSymbol);
  const {
    isRtl
  } = useRtl();
  if (!goToInstance) throw new Error("[Vuetify] Could not find injected goto instance");
  const goTo = {
    ...goToInstance,
    // can be set via VLocaleProvider
    rtl: computed(() => goToInstance.rtl.value || isRtl.value)
  };
  async function go(target, options) {
    return scrollTo(target, mergeDeep(_options, options), false, goTo);
  }
  go.horizontal = async (target, options) => {
    return scrollTo(target, mergeDeep(_options, options), true, goTo);
  };
  return go;
}
function clampTarget(container, value, rtl, horizontal) {
  const {
    scrollWidth,
    scrollHeight
  } = container;
  const [containerWidth, containerHeight] = container === (void 0).scrollingElement ? [(void 0).innerWidth, (void 0).innerHeight] : [container.offsetWidth, container.offsetHeight];
  let min;
  let max;
  if (horizontal) {
    if (rtl) {
      min = -(scrollWidth - containerWidth);
      max = 0;
    } else {
      min = 0;
      max = scrollWidth - containerWidth;
    }
  } else {
    min = 0;
    max = scrollHeight + -containerHeight;
  }
  return Math.max(Math.min(value, max), min);
}
const aliases = {
  collapse: "mdi-chevron-up",
  complete: "mdi-check",
  cancel: "mdi-close-circle",
  close: "mdi-close",
  delete: "mdi-close-circle",
  // delete (e.g. v-chip close)
  clear: "mdi-close-circle",
  success: "mdi-check-circle",
  info: "mdi-information",
  warning: "mdi-alert-circle",
  error: "mdi-close-circle",
  prev: "mdi-chevron-left",
  next: "mdi-chevron-right",
  checkboxOn: "mdi-checkbox-marked",
  checkboxOff: "mdi-checkbox-blank-outline",
  checkboxIndeterminate: "mdi-minus-box",
  delimiter: "mdi-circle",
  // for carousel
  sortAsc: "mdi-arrow-up",
  sortDesc: "mdi-arrow-down",
  expand: "mdi-chevron-down",
  menu: "mdi-menu",
  subgroup: "mdi-menu-down",
  dropdown: "mdi-menu-down",
  radioOn: "mdi-radiobox-marked",
  radioOff: "mdi-radiobox-blank",
  edit: "mdi-pencil",
  ratingEmpty: "mdi-star-outline",
  ratingFull: "mdi-star",
  ratingHalf: "mdi-star-half-full",
  loading: "mdi-cached",
  first: "mdi-page-first",
  last: "mdi-page-last",
  unfold: "mdi-unfold-more-horizontal",
  file: "mdi-paperclip",
  plus: "mdi-plus",
  minus: "mdi-minus",
  calendar: "mdi-calendar",
  treeviewCollapse: "mdi-menu-down",
  treeviewExpand: "mdi-menu-right",
  eyeDropper: "mdi-eyedropper"
};
const mdi = {
  // Not using mergeProps here, functional components merge props by default (?)
  component: (props) => h(VClassIcon, {
    ...props,
    class: "mdi"
  })
};
const IconValue = [String, Function, Object, Array];
const IconSymbol = Symbol.for("vuetify:icons");
const makeIconProps = propsFactory({
  icon: {
    type: IconValue
  },
  // Could not remove this and use makeTagProps, types complained because it is not required
  tag: {
    type: String,
    required: true
  }
}, "icon");
const VComponentIcon = genericComponent()({
  name: "VComponentIcon",
  props: makeIconProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    return () => {
      const Icon = props.icon;
      return createVNode(props.tag, null, {
        default: () => {
          var _a;
          return [props.icon ? createVNode(Icon, null, null) : (_a = slots.default) == null ? void 0 : _a.call(slots)];
        }
      });
    };
  }
});
const VSvgIcon = defineComponent({
  name: "VSvgIcon",
  inheritAttrs: false,
  props: makeIconProps(),
  setup(props, _ref2) {
    let {
      attrs
    } = _ref2;
    return () => {
      return createVNode(props.tag, mergeProps(attrs, {
        "style": null
      }), {
        default: () => [createVNode("svg", {
          "class": "v-icon__svg",
          "xmlns": "http://www.w3.org/2000/svg",
          "viewBox": "0 0 24 24",
          "role": "img",
          "aria-hidden": "true"
        }, [Array.isArray(props.icon) ? props.icon.map((path) => Array.isArray(path) ? createVNode("path", {
          "d": path[0],
          "fill-opacity": path[1]
        }, null) : createVNode("path", {
          "d": path
        }, null)) : createVNode("path", {
          "d": props.icon
        }, null)])]
      });
    };
  }
});
defineComponent({
  name: "VLigatureIcon",
  props: makeIconProps(),
  setup(props) {
    return () => {
      return createVNode(props.tag, null, {
        default: () => [props.icon]
      });
    };
  }
});
const VClassIcon = defineComponent({
  name: "VClassIcon",
  props: makeIconProps(),
  setup(props) {
    return () => {
      return createVNode(props.tag, {
        "class": props.icon
      }, null);
    };
  }
});
function genDefaults$1() {
  return {
    svg: {
      component: VSvgIcon
    },
    class: {
      component: VClassIcon
    }
  };
}
function createIcons(options) {
  const sets = genDefaults$1();
  const defaultSet = (options == null ? void 0 : options.defaultSet) ?? "mdi";
  if (defaultSet === "mdi" && !sets.mdi) {
    sets.mdi = mdi;
  }
  return mergeDeep({
    defaultSet,
    sets,
    aliases: {
      ...aliases,
      /* eslint-disable max-len */
      vuetify: ["M8.2241 14.2009L12 21L22 3H14.4459L8.2241 14.2009Z", ["M7.26303 12.4733L7.00113 12L2 3H12.5261C12.5261 3 12.5261 3 12.5261 3L7.26303 12.4733Z", 0.6]],
      "vuetify-outline": "svg:M7.26 12.47 12.53 3H2L7.26 12.47ZM14.45 3 8.22 14.2 12 21 22 3H14.45ZM18.6 5 12 16.88 10.51 14.2 15.62 5ZM7.26 8.35 5.4 5H9.13L7.26 8.35Z",
      "vuetify-play": ["m6.376 13.184-4.11-7.192C1.505 4.66 2.467 3 4.003 3h8.532l-.953 1.576-.006.01-.396.677c-.429.732-.214 1.507.194 2.015.404.503 1.092.878 1.869.806a3.72 3.72 0 0 1 1.005.022c.276.053.434.143.523.237.138.146.38.635-.25 2.09-.893 1.63-1.553 1.722-1.847 1.677-.213-.033-.468-.158-.756-.406a4.95 4.95 0 0 1-.8-.927c-.39-.564-1.04-.84-1.66-.846-.625-.006-1.316.27-1.693.921l-.478.826-.911 1.506Z", ["M9.093 11.552c.046-.079.144-.15.32-.148a.53.53 0 0 1 .43.207c.285.414.636.847 1.046 1.2.405.35.914.662 1.516.754 1.334.205 2.502-.698 3.48-2.495l.014-.028.013-.03c.687-1.574.774-2.852-.005-3.675-.37-.391-.861-.586-1.333-.676a5.243 5.243 0 0 0-1.447-.044c-.173.016-.393-.073-.54-.257-.145-.18-.127-.316-.082-.392l.393-.672L14.287 3h5.71c1.536 0 2.499 1.659 1.737 2.992l-7.997 13.996c-.768 1.344-2.706 1.344-3.473 0l-3.037-5.314 1.377-2.278.004-.006.004-.007.481-.831Z", 0.6]]
      /* eslint-enable max-len */
    }
  }, options);
}
const useIcon = (props) => {
  const icons = inject$1(IconSymbol);
  if (!icons) throw new Error("Missing Vuetify Icons provide!");
  const iconData = computed(() => {
    var _a;
    const iconAlias = unref(props);
    if (!iconAlias) return {
      component: VComponentIcon
    };
    let icon = iconAlias;
    if (typeof icon === "string") {
      icon = icon.trim();
      if (icon.startsWith("$")) {
        icon = (_a = icons.aliases) == null ? void 0 : _a[icon.slice(1)];
      }
    }
    if (!icon) consoleWarn(`Could not find aliased icon "${iconAlias}"`);
    if (Array.isArray(icon)) {
      return {
        component: VSvgIcon,
        icon
      };
    } else if (typeof icon !== "string") {
      return {
        component: VComponentIcon,
        icon
      };
    }
    const iconSetName = Object.keys(icons.sets).find((setName) => typeof icon === "string" && icon.startsWith(`${setName}:`));
    const iconName = iconSetName ? icon.slice(iconSetName.length + 1) : icon;
    const iconSet = icons.sets[iconSetName ?? icons.defaultSet];
    return {
      component: iconSet.component,
      icon: iconName
    };
  });
  return {
    iconData
  };
};
const ThemeSymbol = Symbol.for("vuetify:theme");
const makeThemeProps = propsFactory({
  theme: String
}, "theme");
function genDefaults() {
  return {
    defaultTheme: "light",
    variations: {
      colors: [],
      lighten: 0,
      darken: 0
    },
    themes: {
      light: {
        dark: false,
        colors: {
          background: "#FFFFFF",
          surface: "#FFFFFF",
          "surface-bright": "#FFFFFF",
          "surface-light": "#EEEEEE",
          "surface-variant": "#424242",
          "on-surface-variant": "#EEEEEE",
          primary: "#1867C0",
          "primary-darken-1": "#1F5592",
          secondary: "#48A9A6",
          "secondary-darken-1": "#018786",
          error: "#B00020",
          info: "#2196F3",
          success: "#4CAF50",
          warning: "#FB8C00"
        },
        variables: {
          "border-color": "#000000",
          "border-opacity": 0.12,
          "high-emphasis-opacity": 0.87,
          "medium-emphasis-opacity": 0.6,
          "disabled-opacity": 0.38,
          "idle-opacity": 0.04,
          "hover-opacity": 0.04,
          "focus-opacity": 0.12,
          "selected-opacity": 0.08,
          "activated-opacity": 0.12,
          "pressed-opacity": 0.12,
          "dragged-opacity": 0.08,
          "theme-kbd": "#212529",
          "theme-on-kbd": "#FFFFFF",
          "theme-code": "#F5F5F5",
          "theme-on-code": "#000000"
        }
      },
      dark: {
        dark: true,
        colors: {
          background: "#121212",
          surface: "#212121",
          "surface-bright": "#ccbfd6",
          "surface-light": "#424242",
          "surface-variant": "#a3a3a3",
          "on-surface-variant": "#424242",
          primary: "#2196F3",
          "primary-darken-1": "#277CC1",
          secondary: "#54B6B2",
          "secondary-darken-1": "#48A9A6",
          error: "#CF6679",
          info: "#2196F3",
          success: "#4CAF50",
          warning: "#FB8C00"
        },
        variables: {
          "border-color": "#FFFFFF",
          "border-opacity": 0.12,
          "high-emphasis-opacity": 1,
          "medium-emphasis-opacity": 0.7,
          "disabled-opacity": 0.5,
          "idle-opacity": 0.1,
          "hover-opacity": 0.04,
          "focus-opacity": 0.12,
          "selected-opacity": 0.08,
          "activated-opacity": 0.12,
          "pressed-opacity": 0.16,
          "dragged-opacity": 0.08,
          "theme-kbd": "#212529",
          "theme-on-kbd": "#FFFFFF",
          "theme-code": "#343434",
          "theme-on-code": "#CCCCCC"
        }
      }
    }
  };
}
function parseThemeOptions() {
  var _a, _b;
  let options = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : genDefaults();
  const defaults = genDefaults();
  if (!options) return {
    ...defaults,
    isDisabled: true
  };
  const themes = {};
  for (const [key, theme] of Object.entries(options.themes ?? {})) {
    const defaultTheme = theme.dark || key === "dark" ? (_a = defaults.themes) == null ? void 0 : _a.dark : (_b = defaults.themes) == null ? void 0 : _b.light;
    themes[key] = mergeDeep(defaultTheme, theme);
  }
  return mergeDeep(defaults, {
    ...options,
    themes
  });
}
function createTheme(options) {
  const parsedOptions = parseThemeOptions(options);
  const name = ref(parsedOptions.defaultTheme);
  const themes = ref(parsedOptions.themes);
  const computedThemes = computed(() => {
    const acc = {};
    for (const [name2, original] of Object.entries(themes.value)) {
      const theme = acc[name2] = {
        ...original,
        colors: {
          ...original.colors
        }
      };
      if (parsedOptions.variations) {
        for (const name3 of parsedOptions.variations.colors) {
          const color = theme.colors[name3];
          if (!color) continue;
          for (const variation of ["lighten", "darken"]) {
            const fn = variation === "lighten" ? lighten : darken;
            for (const amount of createRange(parsedOptions.variations[variation], 1)) {
              theme.colors[`${name3}-${variation}-${amount}`] = RGBtoHex(fn(parseColor(color), amount));
            }
          }
        }
      }
      for (const color of Object.keys(theme.colors)) {
        if (/^on-[a-z]/.test(color) || theme.colors[`on-${color}`]) continue;
        const onColor = `on-${color}`;
        const colorVal = parseColor(theme.colors[color]);
        theme.colors[onColor] = getForeground(colorVal);
      }
    }
    return acc;
  });
  const current = computed(() => computedThemes.value[name.value]);
  const styles = computed(() => {
    var _a;
    const lines = [];
    if ((_a = current.value) == null ? void 0 : _a.dark) {
      createCssClass(lines, ":root", ["color-scheme: dark"]);
    }
    createCssClass(lines, ":root", genCssVariables(current.value));
    for (const [themeName, theme] of Object.entries(computedThemes.value)) {
      createCssClass(lines, `.v-theme--${themeName}`, [`color-scheme: ${theme.dark ? "dark" : "normal"}`, ...genCssVariables(theme)]);
    }
    const bgLines = [];
    const fgLines = [];
    const colors = new Set(Object.values(computedThemes.value).flatMap((theme) => Object.keys(theme.colors)));
    for (const key of colors) {
      if (/^on-[a-z]/.test(key)) {
        createCssClass(fgLines, `.${key}`, [`color: rgb(var(--v-theme-${key})) !important`]);
      } else {
        createCssClass(bgLines, `.bg-${key}`, [`--v-theme-overlay-multiplier: var(--v-theme-${key}-overlay-multiplier)`, `background-color: rgb(var(--v-theme-${key})) !important`, `color: rgb(var(--v-theme-on-${key})) !important`]);
        createCssClass(fgLines, `.text-${key}`, [`color: rgb(var(--v-theme-${key})) !important`]);
        createCssClass(fgLines, `.border-${key}`, [`--v-border-color: var(--v-theme-${key})`]);
      }
    }
    lines.push(...bgLines, ...fgLines);
    return lines.map((str, i) => i === 0 ? str : `    ${str}`).join("");
  });
  function getHead() {
    return {
      style: [{
        children: styles.value,
        id: "vuetify-theme-stylesheet",
        nonce: parsedOptions.cspNonce || false
      }]
    };
  }
  function install(app) {
    if (parsedOptions.isDisabled) return;
    const head = app._context.provides.usehead;
    if (head) {
      if (head.push) {
        head.push(getHead);
      } else {
        {
          head.addHeadObjs(getHead());
        }
      }
    }
  }
  const themeClasses = computed(() => parsedOptions.isDisabled ? void 0 : `v-theme--${name.value}`);
  return {
    install,
    isDisabled: parsedOptions.isDisabled,
    name,
    themes,
    current,
    computedThemes,
    themeClasses,
    styles,
    global: {
      name,
      current
    }
  };
}
function provideTheme(props) {
  getCurrentInstance("provideTheme");
  const theme = inject$1(ThemeSymbol, null);
  if (!theme) throw new Error("Could not find Vuetify theme injection");
  const name = computed(() => {
    return props.theme ?? theme.name.value;
  });
  const current = computed(() => theme.themes.value[name.value]);
  const themeClasses = computed(() => theme.isDisabled ? void 0 : `v-theme--${name.value}`);
  const newTheme = {
    ...theme,
    name,
    current,
    themeClasses
  };
  provide(ThemeSymbol, newTheme);
  return newTheme;
}
function createCssClass(lines, selector, content) {
  lines.push(`${selector} {
`, ...content.map((line) => `  ${line};
`), "}\n");
}
function genCssVariables(theme) {
  const lightOverlay = theme.dark ? 2 : 1;
  const darkOverlay = theme.dark ? 1 : 2;
  const variables = [];
  for (const [key, value] of Object.entries(theme.colors)) {
    const rgb = parseColor(value);
    variables.push(`--v-theme-${key}: ${rgb.r},${rgb.g},${rgb.b}`);
    if (!key.startsWith("on-")) {
      variables.push(`--v-theme-${key}-overlay-multiplier: ${getLuma(value) > 0.18 ? lightOverlay : darkOverlay}`);
    }
  }
  for (const [key, value] of Object.entries(theme.variables)) {
    const color = typeof value === "string" && value.startsWith("#") ? parseColor(value) : void 0;
    const rgb = color ? `${color.r}, ${color.g}, ${color.b}` : void 0;
    variables.push(`--v-${key}: ${rgb ?? value}`);
  }
  return variables;
}
function useResizeObserver(callback) {
  const resizeRef = templateRef();
  const contentRect = ref();
  return {
    resizeRef,
    contentRect: readonly(contentRect)
  };
}
const VuetifyLayoutKey = Symbol.for("vuetify:layout");
const VuetifyLayoutItemKey = Symbol.for("vuetify:layout-item");
const ROOT_ZINDEX = 1e3;
const makeLayoutProps = propsFactory({
  overlaps: {
    type: Array,
    default: () => []
  },
  fullHeight: Boolean
}, "layout");
const makeLayoutItemProps = propsFactory({
  name: {
    type: String
  },
  order: {
    type: [Number, String],
    default: 0
  },
  absolute: Boolean
}, "layout-item");
function useLayout() {
  const layout = inject$1(VuetifyLayoutKey);
  if (!layout) throw new Error("[Vuetify] Could not find injected layout");
  const layoutIsReady = nextTick();
  return {
    layoutIsReady,
    getLayoutItem: layout.getLayoutItem,
    mainRect: layout.mainRect,
    mainStyles: layout.mainStyles
  };
}
function useLayoutItem(options) {
  const layout = inject$1(VuetifyLayoutKey);
  if (!layout) throw new Error("[Vuetify] Could not find injected layout");
  const id = options.id ?? `layout-item-${getUid()}`;
  const vm = getCurrentInstance("useLayoutItem");
  provide(VuetifyLayoutItemKey, {
    id
  });
  const isKeptAlive = shallowRef(false);
  const layoutIsReady = nextTick();
  const {
    layoutItemStyles,
    layoutItemScrimStyles
  } = layout.register(vm, {
    ...options,
    active: computed(() => isKeptAlive.value ? false : options.active.value),
    id
  });
  return {
    layoutItemStyles,
    layoutRect: layout.layoutRect,
    layoutItemScrimStyles,
    layoutIsReady
  };
}
const generateLayers = (layout, positions, layoutSizes, activeItems) => {
  let previousLayer = {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  };
  const layers = [{
    id: "",
    layer: {
      ...previousLayer
    }
  }];
  for (const id of layout) {
    const position = positions.get(id);
    const amount = layoutSizes.get(id);
    const active = activeItems.get(id);
    if (!position || !amount || !active) continue;
    const layer = {
      ...previousLayer,
      [position.value]: parseInt(previousLayer[position.value], 10) + (active.value ? parseInt(amount.value, 10) : 0)
    };
    layers.push({
      id,
      layer
    });
    previousLayer = layer;
  }
  return layers;
};
function createLayout(props) {
  const parentLayout = inject$1(VuetifyLayoutKey, null);
  const rootZIndex = computed(() => parentLayout ? parentLayout.rootZIndex.value - 100 : ROOT_ZINDEX);
  const registered = ref([]);
  const positions = reactive(/* @__PURE__ */ new Map());
  const layoutSizes = reactive(/* @__PURE__ */ new Map());
  const priorities = reactive(/* @__PURE__ */ new Map());
  const activeItems = reactive(/* @__PURE__ */ new Map());
  const disabledTransitions = reactive(/* @__PURE__ */ new Map());
  const {
    resizeRef,
    contentRect: layoutRect
  } = useResizeObserver();
  const layers = eagerComputed(() => {
    const uniquePriorities = [...new Set([...priorities.values()].map((p) => p.value))].sort((a, b) => a - b);
    const layout = [];
    for (const p of uniquePriorities) {
      const items2 = registered.value.filter((id) => {
        var _a;
        return ((_a = priorities.get(id)) == null ? void 0 : _a.value) === p;
      });
      layout.push(...items2);
    }
    return generateLayers(layout, positions, layoutSizes, activeItems);
  });
  const transitionsEnabled = computed(() => {
    return !Array.from(disabledTransitions.values()).some((ref2) => ref2.value);
  });
  const mainRect = computed(() => {
    return layers.value[layers.value.length - 1].layer;
  });
  const mainStyles = computed(() => {
    return {
      "--v-layout-left": convertToUnit(mainRect.value.left),
      "--v-layout-right": convertToUnit(mainRect.value.right),
      "--v-layout-top": convertToUnit(mainRect.value.top),
      "--v-layout-bottom": convertToUnit(mainRect.value.bottom),
      ...transitionsEnabled.value ? void 0 : {
        transition: "none"
      }
    };
  });
  const items = eagerComputed(() => {
    return layers.value.slice(1).map((_ref, index) => {
      let {
        id
      } = _ref;
      const {
        layer
      } = layers.value[index];
      const size = layoutSizes.get(id);
      const position = positions.get(id);
      return {
        id,
        ...layer,
        size: Number(size.value),
        position: position.value
      };
    });
  });
  const getLayoutItem = (id) => {
    return items.value.find((item) => item.id === id);
  };
  const rootVm = getCurrentInstance("createLayout");
  const layoutIsReady = nextTick();
  provide(VuetifyLayoutKey, {
    register: (vm, _ref2) => {
      let {
        id,
        order,
        position,
        layoutSize,
        elementSize,
        active,
        disableTransitions,
        absolute
      } = _ref2;
      priorities.set(id, order);
      positions.set(id, position);
      layoutSizes.set(id, layoutSize);
      activeItems.set(id, active);
      disableTransitions && disabledTransitions.set(id, disableTransitions);
      const instances = findChildrenWithProvide(VuetifyLayoutItemKey, rootVm == null ? void 0 : rootVm.vnode);
      const instanceIndex = instances.indexOf(vm);
      if (instanceIndex > -1) registered.value.splice(instanceIndex, 0, id);
      else registered.value.push(id);
      const index = computed(() => items.value.findIndex((i) => i.id === id));
      const zIndex = computed(() => rootZIndex.value + layers.value.length * 2 - index.value * 2);
      const layoutItemStyles = computed(() => {
        const isHorizontal = position.value === "left" || position.value === "right";
        const isOppositeHorizontal = position.value === "right";
        const isOppositeVertical = position.value === "bottom";
        const size = elementSize.value ?? layoutSize.value;
        const unit = size === 0 ? "%" : "px";
        const styles = {
          [position.value]: 0,
          zIndex: zIndex.value,
          transform: `translate${isHorizontal ? "X" : "Y"}(${(active.value ? 0 : -(size === 0 ? 100 : size)) * (isOppositeHorizontal || isOppositeVertical ? -1 : 1)}${unit})`,
          position: absolute.value || rootZIndex.value !== ROOT_ZINDEX ? "absolute" : "fixed",
          ...transitionsEnabled.value ? void 0 : {
            transition: "none"
          }
        };
        if (index.value < 0) throw new Error(`Layout item "${id}" is missing`);
        const item = items.value[index.value];
        if (!item) throw new Error(`[Vuetify] Could not find layout item "${id}"`);
        return {
          ...styles,
          height: isHorizontal ? `calc(100% - ${item.top}px - ${item.bottom}px)` : elementSize.value ? `${elementSize.value}px` : void 0,
          left: isOppositeHorizontal ? void 0 : `${item.left}px`,
          right: isOppositeHorizontal ? `${item.right}px` : void 0,
          top: position.value !== "bottom" ? `${item.top}px` : void 0,
          bottom: position.value !== "top" ? `${item.bottom}px` : void 0,
          width: !isHorizontal ? `calc(100% - ${item.left}px - ${item.right}px)` : elementSize.value ? `${elementSize.value}px` : void 0
        };
      });
      const layoutItemScrimStyles = computed(() => ({
        zIndex: zIndex.value - 1
      }));
      return {
        layoutItemStyles,
        layoutItemScrimStyles,
        zIndex
      };
    },
    unregister: (id) => {
      priorities.delete(id);
      positions.delete(id);
      layoutSizes.delete(id);
      activeItems.delete(id);
      disabledTransitions.delete(id);
      registered.value = registered.value.filter((v) => v !== id);
    },
    mainRect,
    mainStyles,
    getLayoutItem,
    items,
    layoutRect,
    rootZIndex,
    layoutIsReady
  });
  const layoutClasses = computed(() => ["v-layout", {
    "v-layout--full-height": props.fullHeight
  }]);
  const layoutStyles = computed(() => ({
    zIndex: parentLayout ? rootZIndex.value : void 0,
    position: parentLayout ? "relative" : void 0,
    overflow: parentLayout ? "hidden" : void 0
  }));
  return {
    layoutClasses,
    layoutStyles,
    getLayoutItem,
    items,
    layoutRect,
    layoutIsReady,
    layoutRef: resizeRef
  };
}
function createVuetify() {
  let vuetify = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
  const {
    blueprint,
    ...rest
  } = vuetify;
  const options = mergeDeep(blueprint, rest);
  const {
    aliases: aliases2 = {},
    components = {},
    directives = {}
  } = options;
  const defaults = createDefaults(options.defaults);
  const display = createDisplay(options.display, options.ssr);
  const theme = createTheme(options.theme);
  const icons = createIcons(options.icons);
  const locale = createLocale(options.locale);
  const date2 = createDate(options.date, locale);
  const goTo = createGoTo(options.goTo, locale);
  const install = (app) => {
    for (const key in directives) {
      app.directive(key, directives[key]);
    }
    for (const key in components) {
      app.component(key, components[key]);
    }
    for (const key in aliases2) {
      app.component(key, defineComponent({
        ...aliases2[key],
        name: key,
        aliasName: aliases2[key].name
      }));
    }
    theme.install(app);
    app.provide(DefaultsSymbol, defaults);
    app.provide(DisplaySymbol, display);
    app.provide(ThemeSymbol, theme);
    app.provide(IconSymbol, icons);
    app.provide(LocaleSymbol, locale);
    app.provide(DateOptionsSymbol, date2.options);
    app.provide(DateAdapterSymbol, date2.instance);
    app.provide(GoToSymbol, goTo);
    getUid.reset();
    {
      app.mixin({
        computed: {
          $vuetify() {
            return reactive({
              defaults: inject.call(this, DefaultsSymbol),
              display: inject.call(this, DisplaySymbol),
              theme: inject.call(this, ThemeSymbol),
              icons: inject.call(this, IconSymbol),
              locale: inject.call(this, LocaleSymbol),
              date: inject.call(this, DateAdapterSymbol)
            });
          }
        }
      });
    }
  };
  return {
    install,
    defaults,
    display,
    theme,
    icons,
    locale,
    date: date2,
    goTo
  };
}
const version = "3.6.11";
createVuetify.version = version;
function inject(key) {
  var _a, _b;
  const vm = this.$;
  const provides = ((_a = vm.parent) == null ? void 0 : _a.provides) ?? ((_b = vm.vnode.appContext) == null ? void 0 : _b.provides);
  if (provides && key in provides) {
    return provides[key];
  }
}
const makeBorderProps = propsFactory({
  border: [Boolean, Number, String]
}, "border");
function useBorder(props) {
  let name = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : getCurrentInstanceName();
  const borderClasses = computed(() => {
    const border = isRef(props) ? props.value : props.border;
    const classes = [];
    if (border === true || border === "") {
      classes.push(`${name}--border`);
    } else if (typeof border === "string" || border === 0) {
      for (const value of String(border).split(" ")) {
        classes.push(`border-${value}`);
      }
    }
    return classes;
  });
  return {
    borderClasses
  };
}
const allowedDensities = [null, "default", "comfortable", "compact"];
const makeDensityProps = propsFactory({
  density: {
    type: String,
    default: "default",
    validator: (v) => allowedDensities.includes(v)
  }
}, "density");
function useDensity(props) {
  let name = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : getCurrentInstanceName();
  const densityClasses = computed(() => {
    return `${name}--density-${props.density}`;
  });
  return {
    densityClasses
  };
}
const makeElevationProps = propsFactory({
  elevation: {
    type: [Number, String],
    validator(v) {
      const value = parseInt(v);
      return !isNaN(value) && value >= 0 && // Material Design has a maximum elevation of 24
      // https://material.io/design/environment/elevation.html#default-elevations
      value <= 24;
    }
  }
}, "elevation");
function useElevation(props) {
  const elevationClasses = computed(() => {
    const elevation = isRef(props) ? props.value : props.elevation;
    const classes = [];
    if (elevation == null) return classes;
    classes.push(`elevation-${elevation}`);
    return classes;
  });
  return {
    elevationClasses
  };
}
const makeRoundedProps = propsFactory({
  rounded: {
    type: [Boolean, Number, String],
    default: void 0
  },
  tile: Boolean
}, "rounded");
function useRounded(props) {
  let name = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : getCurrentInstanceName();
  const roundedClasses = computed(() => {
    const rounded = isRef(props) ? props.value : props.rounded;
    const tile = isRef(props) ? props.value : props.tile;
    const classes = [];
    if (rounded === true || rounded === "") {
      classes.push(`${name}--rounded`);
    } else if (typeof rounded === "string" || rounded === 0) {
      for (const value of String(rounded).split(" ")) {
        classes.push(`rounded-${value}`);
      }
    } else if (tile || rounded === false) {
      classes.push("rounded-0");
    }
    return classes;
  });
  return {
    roundedClasses
  };
}
const makeTagProps = propsFactory({
  tag: {
    type: String,
    default: "div"
  }
}, "tag");
function useColor(colors) {
  return destructComputed(() => {
    const classes = [];
    const styles = {};
    if (colors.value.background) {
      if (isCssColor(colors.value.background)) {
        styles.backgroundColor = colors.value.background;
        if (!colors.value.text && isParsableColor(colors.value.background)) {
          const backgroundColor = parseColor(colors.value.background);
          if (backgroundColor.a == null || backgroundColor.a === 1) {
            const textColor = getForeground(backgroundColor);
            styles.color = textColor;
            styles.caretColor = textColor;
          }
        }
      } else {
        classes.push(`bg-${colors.value.background}`);
      }
    }
    if (colors.value.text) {
      if (isCssColor(colors.value.text)) {
        styles.color = colors.value.text;
        styles.caretColor = colors.value.text;
      } else {
        classes.push(`text-${colors.value.text}`);
      }
    }
    return {
      colorClasses: classes,
      colorStyles: styles
    };
  });
}
function useTextColor(props, name) {
  const colors = computed(() => ({
    text: isRef(props) ? props.value : name ? props[name] : null
  }));
  const {
    colorClasses: textColorClasses,
    colorStyles: textColorStyles
  } = useColor(colors);
  return {
    textColorClasses,
    textColorStyles
  };
}
function useBackgroundColor(props, name) {
  const colors = computed(() => ({
    background: isRef(props) ? props.value : name ? props[name] : null
  }));
  const {
    colorClasses: backgroundColorClasses,
    colorStyles: backgroundColorStyles
  } = useColor(colors);
  return {
    backgroundColorClasses,
    backgroundColorStyles
  };
}
const allowedVariants$1 = ["elevated", "flat", "tonal", "outlined", "text", "plain"];
function genOverlays(isClickable, name) {
  return createVNode(Fragment, null, [isClickable && createVNode("span", {
    "key": "overlay",
    "class": `${name}__overlay`
  }, null), createVNode("span", {
    "key": "underlay",
    "class": `${name}__underlay`
  }, null)]);
}
const makeVariantProps = propsFactory({
  color: String,
  variant: {
    type: String,
    default: "elevated",
    validator: (v) => allowedVariants$1.includes(v)
  }
}, "variant");
function useVariant(props) {
  let name = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : getCurrentInstanceName();
  const variantClasses = computed(() => {
    const {
      variant
    } = unref(props);
    return `${name}--variant-${variant}`;
  });
  const {
    colorClasses,
    colorStyles
  } = useColor(computed(() => {
    const {
      variant,
      color
    } = unref(props);
    return {
      [["elevated", "flat"].includes(variant) ? "background" : "text"]: color
    };
  }));
  return {
    colorClasses,
    colorStyles,
    variantClasses
  };
}
const makeVBtnGroupProps = propsFactory({
  baseColor: String,
  divided: Boolean,
  ...makeBorderProps(),
  ...makeComponentProps(),
  ...makeDensityProps(),
  ...makeElevationProps(),
  ...makeRoundedProps(),
  ...makeTagProps(),
  ...makeThemeProps(),
  ...makeVariantProps()
}, "VBtnGroup");
const VBtnGroup = genericComponent()({
  name: "VBtnGroup",
  props: makeVBtnGroupProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      themeClasses
    } = provideTheme(props);
    const {
      densityClasses
    } = useDensity(props);
    const {
      borderClasses
    } = useBorder(props);
    const {
      elevationClasses
    } = useElevation(props);
    const {
      roundedClasses
    } = useRounded(props);
    provideDefaults({
      VBtn: {
        height: "auto",
        baseColor: toRef(props, "baseColor"),
        color: toRef(props, "color"),
        density: toRef(props, "density"),
        flat: true,
        variant: toRef(props, "variant")
      }
    });
    useRender(() => {
      return createVNode(props.tag, {
        "class": ["v-btn-group", {
          "v-btn-group--divided": props.divided
        }, themeClasses.value, borderClasses.value, densityClasses.value, elevationClasses.value, roundedClasses.value, props.class],
        "style": props.style
      }, slots);
    });
  }
});
const makeGroupProps = propsFactory({
  modelValue: {
    type: null,
    default: void 0
  },
  multiple: Boolean,
  mandatory: [Boolean, String],
  max: Number,
  selectedClass: String,
  disabled: Boolean
}, "group");
const makeGroupItemProps = propsFactory({
  value: null,
  disabled: Boolean,
  selectedClass: String
}, "group-item");
function useGroupItem(props, injectKey) {
  let required = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : true;
  const vm = getCurrentInstance("useGroupItem");
  if (!vm) {
    throw new Error("[Vuetify] useGroupItem composable must be used inside a component setup function");
  }
  const id = getUid();
  provide(Symbol.for(`${injectKey.description}:id`), id);
  const group = inject$1(injectKey, null);
  if (!group) {
    if (!required) return group;
    throw new Error(`[Vuetify] Could not find useGroup injection with symbol ${injectKey.description}`);
  }
  const value = toRef(props, "value");
  const disabled = computed(() => !!(group.disabled.value || props.disabled));
  group.register({
    id,
    value,
    disabled
  }, vm);
  const isSelected = computed(() => {
    return group.isSelected(id);
  });
  const isFirst = computed(() => {
    return group.items.value[0].id === id;
  });
  const isLast = computed(() => {
    return group.items.value[group.items.value.length - 1].id === id;
  });
  const selectedClass = computed(() => isSelected.value && [group.selectedClass.value, props.selectedClass]);
  watch(isSelected, (value2) => {
    vm.emit("group:selected", {
      value: value2
    });
  }, {
    flush: "sync"
  });
  return {
    id,
    isSelected,
    isFirst,
    isLast,
    toggle: () => group.select(id, !isSelected.value),
    select: (value2) => group.select(id, value2),
    selectedClass,
    value,
    disabled,
    group
  };
}
function useGroup(props, injectKey) {
  const items = reactive([]);
  const selected = useProxiedModel(props, "modelValue", [], (v) => {
    if (v == null) return [];
    return getIds(items, wrapInArray(v));
  }, (v) => {
    const arr = getValues(items, v);
    return props.multiple ? arr : arr[0];
  });
  const groupVm = getCurrentInstance("useGroup");
  function register(item, vm) {
    const unwrapped = item;
    const key = Symbol.for(`${injectKey.description}:id`);
    const children = findChildrenWithProvide(key, groupVm == null ? void 0 : groupVm.vnode);
    const index = children.indexOf(vm);
    if (unref(unwrapped.value) == null) {
      unwrapped.value = index;
      unwrapped.useIndexAsValue = true;
    }
    if (index > -1) {
      items.splice(index, 0, unwrapped);
    } else {
      items.push(unwrapped);
    }
  }
  function unregister(id) {
    forceMandatoryValue();
    const index = items.findIndex((item) => item.id === id);
    items.splice(index, 1);
  }
  function forceMandatoryValue() {
    const item = items.find((item2) => !item2.disabled);
    if (item && props.mandatory === "force" && !selected.value.length) {
      selected.value = [item.id];
    }
  }
  function select(id, value) {
    const item = items.find((item2) => item2.id === id);
    if (value && (item == null ? void 0 : item.disabled)) return;
    if (props.multiple) {
      const internalValue = selected.value.slice();
      const index = internalValue.findIndex((v) => v === id);
      const isSelected = ~index;
      value = value ?? !isSelected;
      if (isSelected && props.mandatory && internalValue.length <= 1) return;
      if (!isSelected && props.max != null && internalValue.length + 1 > props.max) return;
      if (index < 0 && value) internalValue.push(id);
      else if (index >= 0 && !value) internalValue.splice(index, 1);
      selected.value = internalValue;
    } else {
      const isSelected = selected.value.includes(id);
      if (props.mandatory && isSelected) return;
      selected.value = value ?? !isSelected ? [id] : [];
    }
  }
  function step(offset) {
    if (props.multiple) consoleWarn('This method is not supported when using "multiple" prop');
    if (!selected.value.length) {
      const item = items.find((item2) => !item2.disabled);
      item && (selected.value = [item.id]);
    } else {
      const currentId = selected.value[0];
      const currentIndex = items.findIndex((i) => i.id === currentId);
      let newIndex = (currentIndex + offset) % items.length;
      let newItem = items[newIndex];
      while (newItem.disabled && newIndex !== currentIndex) {
        newIndex = (newIndex + offset) % items.length;
        newItem = items[newIndex];
      }
      if (newItem.disabled) return;
      selected.value = [items[newIndex].id];
    }
  }
  const state = {
    register,
    unregister,
    selected,
    select,
    disabled: toRef(props, "disabled"),
    prev: () => step(items.length - 1),
    next: () => step(1),
    isSelected: (id) => selected.value.includes(id),
    selectedClass: computed(() => props.selectedClass),
    items: computed(() => items),
    getItemIndex: (value) => getItemIndex(items, value)
  };
  provide(injectKey, state);
  return state;
}
function getItemIndex(items, value) {
  const ids = getIds(items, [value]);
  if (!ids.length) return -1;
  return items.findIndex((item) => item.id === ids[0]);
}
function getIds(items, modelValue) {
  const ids = [];
  modelValue.forEach((value) => {
    const item = items.find((item2) => deepEqual(value, item2.value));
    const itemByIndex = items[value];
    if ((item == null ? void 0 : item.value) != null) {
      ids.push(item.id);
    } else if (itemByIndex != null) {
      ids.push(itemByIndex.id);
    }
  });
  return ids;
}
function getValues(items, ids) {
  const values = [];
  ids.forEach((id) => {
    const itemIndex = items.findIndex((item) => item.id === id);
    if (~itemIndex) {
      const item = items[itemIndex];
      values.push(item.value != null ? item.value : itemIndex);
    }
  });
  return values;
}
const VBtnToggleSymbol = Symbol.for("vuetify:v-btn-toggle");
const makeVBtnToggleProps = propsFactory({
  ...makeVBtnGroupProps(),
  ...makeGroupProps()
}, "VBtnToggle");
genericComponent()({
  name: "VBtnToggle",
  props: makeVBtnToggleProps(),
  emits: {
    "update:modelValue": (value) => true
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      isSelected,
      next,
      prev,
      select,
      selected
    } = useGroup(props, VBtnToggleSymbol);
    useRender(() => {
      const btnGroupProps = VBtnGroup.filterProps(props);
      return createVNode(VBtnGroup, mergeProps({
        "class": ["v-btn-toggle", props.class]
      }, btnGroupProps, {
        "style": props.style
      }), {
        default: () => {
          var _a;
          return [(_a = slots.default) == null ? void 0 : _a.call(slots, {
            isSelected,
            next,
            prev,
            select,
            selected
          })];
        }
      });
    });
    return {
      next,
      prev,
      select
    };
  }
});
const makeVDefaultsProviderProps = propsFactory({
  defaults: Object,
  disabled: Boolean,
  reset: [Number, String],
  root: [Boolean, String],
  scoped: Boolean
}, "VDefaultsProvider");
const VDefaultsProvider = genericComponent(false)({
  name: "VDefaultsProvider",
  props: makeVDefaultsProviderProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      defaults,
      disabled,
      reset,
      root,
      scoped
    } = toRefs(props);
    provideDefaults(defaults, {
      reset,
      root,
      scoped,
      disabled
    });
    return () => {
      var _a;
      return (_a = slots.default) == null ? void 0 : _a.call(slots);
    };
  }
});
const predefinedSizes = ["x-small", "small", "default", "large", "x-large"];
const makeSizeProps = propsFactory({
  size: {
    type: [String, Number],
    default: "default"
  }
}, "size");
function useSize(props) {
  let name = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : getCurrentInstanceName();
  return destructComputed(() => {
    let sizeClasses;
    let sizeStyles;
    if (includes(predefinedSizes, props.size)) {
      sizeClasses = `${name}--size-${props.size}`;
    } else if (props.size) {
      sizeStyles = {
        width: convertToUnit(props.size),
        height: convertToUnit(props.size)
      };
    }
    return {
      sizeClasses,
      sizeStyles
    };
  });
}
const makeVIconProps = propsFactory({
  color: String,
  disabled: Boolean,
  start: Boolean,
  end: Boolean,
  icon: IconValue,
  ...makeComponentProps(),
  ...makeSizeProps(),
  ...makeTagProps({
    tag: "i"
  }),
  ...makeThemeProps()
}, "VIcon");
const VIcon = genericComponent()({
  name: "VIcon",
  props: makeVIconProps(),
  setup(props, _ref) {
    let {
      attrs,
      slots
    } = _ref;
    const slotIcon = ref();
    const {
      themeClasses
    } = provideTheme(props);
    const {
      iconData
    } = useIcon(computed(() => slotIcon.value || props.icon));
    const {
      sizeClasses
    } = useSize(props);
    const {
      textColorClasses,
      textColorStyles
    } = useTextColor(toRef(props, "color"));
    useRender(() => {
      var _a, _b;
      const slotValue = (_a = slots.default) == null ? void 0 : _a.call(slots);
      if (slotValue) {
        slotIcon.value = (_b = flattenFragments(slotValue).filter((node) => node.type === Text && node.children && typeof node.children === "string")[0]) == null ? void 0 : _b.children;
      }
      const hasClick = !!(attrs.onClick || attrs.onClickOnce);
      return createVNode(iconData.value.component, {
        "tag": props.tag,
        "icon": iconData.value.icon,
        "class": ["v-icon", "notranslate", themeClasses.value, sizeClasses.value, textColorClasses.value, {
          "v-icon--clickable": hasClick,
          "v-icon--disabled": props.disabled,
          "v-icon--start": props.start,
          "v-icon--end": props.end
        }, props.class],
        "style": [!sizeClasses.value ? {
          fontSize: convertToUnit(props.size),
          height: convertToUnit(props.size),
          width: convertToUnit(props.size)
        } : void 0, textColorStyles.value, props.style],
        "role": hasClick ? "button" : void 0,
        "aria-hidden": !hasClick,
        "tabindex": hasClick ? props.disabled ? -1 : 0 : void 0
      }, {
        default: () => [slotValue]
      });
    });
    return {};
  }
});
function useIntersectionObserver(callback, options) {
  const intersectionRef = ref();
  const isIntersecting = shallowRef(false);
  return {
    intersectionRef,
    isIntersecting
  };
}
const makeVProgressCircularProps = propsFactory({
  bgColor: String,
  color: String,
  indeterminate: [Boolean, String],
  modelValue: {
    type: [Number, String],
    default: 0
  },
  rotate: {
    type: [Number, String],
    default: 0
  },
  width: {
    type: [Number, String],
    default: 4
  },
  ...makeComponentProps(),
  ...makeSizeProps(),
  ...makeTagProps({
    tag: "div"
  }),
  ...makeThemeProps()
}, "VProgressCircular");
const VProgressCircular = genericComponent()({
  name: "VProgressCircular",
  props: makeVProgressCircularProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const MAGIC_RADIUS_CONSTANT = 20;
    const CIRCUMFERENCE = 2 * Math.PI * MAGIC_RADIUS_CONSTANT;
    const root = ref();
    const {
      themeClasses
    } = provideTheme(props);
    const {
      sizeClasses,
      sizeStyles
    } = useSize(props);
    const {
      textColorClasses,
      textColorStyles
    } = useTextColor(toRef(props, "color"));
    const {
      textColorClasses: underlayColorClasses,
      textColorStyles: underlayColorStyles
    } = useTextColor(toRef(props, "bgColor"));
    const {
      intersectionRef,
      isIntersecting
    } = useIntersectionObserver();
    const {
      resizeRef,
      contentRect
    } = useResizeObserver();
    const normalizedValue = computed(() => Math.max(0, Math.min(100, parseFloat(props.modelValue))));
    const width = computed(() => Number(props.width));
    const size = computed(() => {
      return sizeStyles.value ? Number(props.size) : contentRect.value ? contentRect.value.width : Math.max(width.value, 32);
    });
    const diameter = computed(() => MAGIC_RADIUS_CONSTANT / (1 - width.value / size.value) * 2);
    const strokeWidth = computed(() => width.value / size.value * diameter.value);
    const strokeDashOffset = computed(() => convertToUnit((100 - normalizedValue.value) / 100 * CIRCUMFERENCE));
    watchEffect(() => {
      intersectionRef.value = root.value;
      resizeRef.value = root.value;
    });
    useRender(() => createVNode(props.tag, {
      "ref": root,
      "class": ["v-progress-circular", {
        "v-progress-circular--indeterminate": !!props.indeterminate,
        "v-progress-circular--visible": isIntersecting.value,
        "v-progress-circular--disable-shrink": props.indeterminate === "disable-shrink"
      }, themeClasses.value, sizeClasses.value, textColorClasses.value, props.class],
      "style": [sizeStyles.value, textColorStyles.value, props.style],
      "role": "progressbar",
      "aria-valuemin": "0",
      "aria-valuemax": "100",
      "aria-valuenow": props.indeterminate ? void 0 : normalizedValue.value
    }, {
      default: () => [createVNode("svg", {
        "style": {
          transform: `rotate(calc(-90deg + ${Number(props.rotate)}deg))`
        },
        "xmlns": "http://www.w3.org/2000/svg",
        "viewBox": `0 0 ${diameter.value} ${diameter.value}`
      }, [createVNode("circle", {
        "class": ["v-progress-circular__underlay", underlayColorClasses.value],
        "style": underlayColorStyles.value,
        "fill": "transparent",
        "cx": "50%",
        "cy": "50%",
        "r": MAGIC_RADIUS_CONSTANT,
        "stroke-width": strokeWidth.value,
        "stroke-dasharray": CIRCUMFERENCE,
        "stroke-dashoffset": 0
      }, null), createVNode("circle", {
        "class": "v-progress-circular__overlay",
        "fill": "transparent",
        "cx": "50%",
        "cy": "50%",
        "r": MAGIC_RADIUS_CONSTANT,
        "stroke-width": strokeWidth.value,
        "stroke-dasharray": CIRCUMFERENCE,
        "stroke-dashoffset": strokeDashOffset.value
      }, null)]), slots.default && createVNode("div", {
        "class": "v-progress-circular__content"
      }, [slots.default({
        value: normalizedValue.value
      })])]
    }));
    return {};
  }
});
const makeDimensionProps = propsFactory({
  height: [Number, String],
  maxHeight: [Number, String],
  maxWidth: [Number, String],
  minHeight: [Number, String],
  minWidth: [Number, String],
  width: [Number, String]
}, "dimension");
function useDimension(props) {
  const dimensionStyles = computed(() => {
    const styles = {};
    const height = convertToUnit(props.height);
    const maxHeight = convertToUnit(props.maxHeight);
    const maxWidth = convertToUnit(props.maxWidth);
    const minHeight = convertToUnit(props.minHeight);
    const minWidth = convertToUnit(props.minWidth);
    const width = convertToUnit(props.width);
    if (height != null) styles.height = height;
    if (maxHeight != null) styles.maxHeight = maxHeight;
    if (maxWidth != null) styles.maxWidth = maxWidth;
    if (minHeight != null) styles.minHeight = minHeight;
    if (minWidth != null) styles.minWidth = minWidth;
    if (width != null) styles.width = width;
    return styles;
  });
  return {
    dimensionStyles
  };
}
const oppositeMap = {
  center: "center",
  top: "bottom",
  bottom: "top",
  left: "right",
  right: "left"
};
const makeLocationProps = propsFactory({
  location: String
}, "location");
function useLocation(props) {
  let opposite = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
  let offset = arguments.length > 2 ? arguments[2] : void 0;
  const {
    isRtl
  } = useRtl();
  const locationStyles = computed(() => {
    if (!props.location) return {};
    const {
      side,
      align
    } = parseAnchor(props.location.split(" ").length > 1 ? props.location : `${props.location} center`, isRtl.value);
    function getOffset2(side2) {
      return offset ? offset(side2) : 0;
    }
    const styles = {};
    if (side !== "center") {
      if (opposite) styles[oppositeMap[side]] = `calc(100% - ${getOffset2(side)}px)`;
      else styles[side] = 0;
    }
    if (align !== "center") {
      if (opposite) styles[oppositeMap[align]] = `calc(100% - ${getOffset2(align)}px)`;
      else styles[align] = 0;
    } else {
      if (side === "center") styles.top = styles.left = "50%";
      else {
        styles[{
          top: "left",
          bottom: "left",
          left: "top",
          right: "top"
        }[side]] = "50%";
      }
      styles.transform = {
        top: "translateX(-50%)",
        bottom: "translateX(-50%)",
        left: "translateY(-50%)",
        right: "translateY(-50%)",
        center: "translate(-50%, -50%)"
      }[side];
    }
    return styles;
  });
  return {
    locationStyles
  };
}
const makeVProgressLinearProps = propsFactory({
  absolute: Boolean,
  active: {
    type: Boolean,
    default: true
  },
  bgColor: String,
  bgOpacity: [Number, String],
  bufferValue: {
    type: [Number, String],
    default: 0
  },
  bufferColor: String,
  bufferOpacity: [Number, String],
  clickable: Boolean,
  color: String,
  height: {
    type: [Number, String],
    default: 4
  },
  indeterminate: Boolean,
  max: {
    type: [Number, String],
    default: 100
  },
  modelValue: {
    type: [Number, String],
    default: 0
  },
  opacity: [Number, String],
  reverse: Boolean,
  stream: Boolean,
  striped: Boolean,
  roundedBar: Boolean,
  ...makeComponentProps(),
  ...makeLocationProps({
    location: "top"
  }),
  ...makeRoundedProps(),
  ...makeTagProps(),
  ...makeThemeProps()
}, "VProgressLinear");
const VProgressLinear = genericComponent()({
  name: "VProgressLinear",
  props: makeVProgressLinearProps(),
  emits: {
    "update:modelValue": (value) => true
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const progress = useProxiedModel(props, "modelValue");
    const {
      isRtl,
      rtlClasses
    } = useRtl();
    const {
      themeClasses
    } = provideTheme(props);
    const {
      locationStyles
    } = useLocation(props);
    const {
      textColorClasses,
      textColorStyles
    } = useTextColor(props, "color");
    const {
      backgroundColorClasses,
      backgroundColorStyles
    } = useBackgroundColor(computed(() => props.bgColor || props.color));
    const {
      backgroundColorClasses: bufferColorClasses,
      backgroundColorStyles: bufferColorStyles
    } = useBackgroundColor(computed(() => props.bufferColor || props.bgColor || props.color));
    const {
      backgroundColorClasses: barColorClasses,
      backgroundColorStyles: barColorStyles
    } = useBackgroundColor(props, "color");
    const {
      roundedClasses
    } = useRounded(props);
    const {
      intersectionRef,
      isIntersecting
    } = useIntersectionObserver();
    const max = computed(() => parseFloat(props.max));
    const height = computed(() => parseFloat(props.height));
    const normalizedBuffer = computed(() => clamp(parseFloat(props.bufferValue) / max.value * 100, 0, 100));
    const normalizedValue = computed(() => clamp(parseFloat(progress.value) / max.value * 100, 0, 100));
    const isReversed = computed(() => isRtl.value !== props.reverse);
    const transition = computed(() => props.indeterminate ? "fade-transition" : "slide-x-transition");
    function handleClick(e) {
      if (!intersectionRef.value) return;
      const {
        left,
        right,
        width
      } = intersectionRef.value.getBoundingClientRect();
      const value = isReversed.value ? width - e.clientX + (right - width) : e.clientX - left;
      progress.value = Math.round(value / width * max.value);
    }
    useRender(() => createVNode(props.tag, {
      "ref": intersectionRef,
      "class": ["v-progress-linear", {
        "v-progress-linear--absolute": props.absolute,
        "v-progress-linear--active": props.active && isIntersecting.value,
        "v-progress-linear--reverse": isReversed.value,
        "v-progress-linear--rounded": props.rounded,
        "v-progress-linear--rounded-bar": props.roundedBar,
        "v-progress-linear--striped": props.striped
      }, roundedClasses.value, themeClasses.value, rtlClasses.value, props.class],
      "style": [{
        bottom: props.location === "bottom" ? 0 : void 0,
        top: props.location === "top" ? 0 : void 0,
        height: props.active ? convertToUnit(height.value) : 0,
        "--v-progress-linear-height": convertToUnit(height.value),
        ...props.absolute ? locationStyles.value : {}
      }, props.style],
      "role": "progressbar",
      "aria-hidden": props.active ? "false" : "true",
      "aria-valuemin": "0",
      "aria-valuemax": props.max,
      "aria-valuenow": props.indeterminate ? void 0 : normalizedValue.value,
      "onClick": props.clickable && handleClick
    }, {
      default: () => [props.stream && createVNode("div", {
        "key": "stream",
        "class": ["v-progress-linear__stream", textColorClasses.value],
        "style": {
          ...textColorStyles.value,
          [isReversed.value ? "left" : "right"]: convertToUnit(-height.value),
          borderTop: `${convertToUnit(height.value / 2)} dotted`,
          opacity: parseFloat(props.bufferOpacity),
          top: `calc(50% - ${convertToUnit(height.value / 4)})`,
          width: convertToUnit(100 - normalizedBuffer.value, "%"),
          "--v-progress-linear-stream-to": convertToUnit(height.value * (isReversed.value ? 1 : -1))
        }
      }, null), createVNode("div", {
        "class": ["v-progress-linear__background", backgroundColorClasses.value],
        "style": [backgroundColorStyles.value, {
          opacity: parseFloat(props.bgOpacity),
          width: props.stream ? 0 : void 0
        }]
      }, null), createVNode("div", {
        "class": ["v-progress-linear__buffer", bufferColorClasses.value],
        "style": [bufferColorStyles.value, {
          opacity: parseFloat(props.bufferOpacity),
          width: convertToUnit(normalizedBuffer.value, "%")
        }]
      }, null), createVNode(Transition, {
        "name": transition.value
      }, {
        default: () => [!props.indeterminate ? createVNode("div", {
          "class": ["v-progress-linear__determinate", barColorClasses.value],
          "style": [barColorStyles.value, {
            width: convertToUnit(normalizedValue.value, "%")
          }]
        }, null) : createVNode("div", {
          "class": "v-progress-linear__indeterminate"
        }, [["long", "short"].map((bar) => createVNode("div", {
          "key": bar,
          "class": ["v-progress-linear__indeterminate", bar, barColorClasses.value],
          "style": barColorStyles.value
        }, null))])]
      }), slots.default && createVNode("div", {
        "class": "v-progress-linear__content"
      }, [slots.default({
        value: normalizedValue.value,
        buffer: normalizedBuffer.value
      })])]
    }));
    return {};
  }
});
const makeLoaderProps = propsFactory({
  loading: [Boolean, String]
}, "loader");
function useLoader(props) {
  let name = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : getCurrentInstanceName();
  const loaderClasses = computed(() => ({
    [`${name}--loading`]: props.loading
  }));
  return {
    loaderClasses
  };
}
function LoaderSlot(props, _ref) {
  var _a;
  let {
    slots
  } = _ref;
  return createVNode("div", {
    "class": `${props.name}__loader`
  }, [((_a = slots.default) == null ? void 0 : _a.call(slots, {
    color: props.color,
    isActive: props.active
  })) || createVNode(VProgressLinear, {
    "absolute": props.absolute,
    "active": props.active,
    "color": props.color,
    "height": "2",
    "indeterminate": true
  }, null)]);
}
const positionValues = ["static", "relative", "fixed", "absolute", "sticky"];
const makePositionProps = propsFactory({
  position: {
    type: String,
    validator: (
      /* istanbul ignore next */
      (v) => positionValues.includes(v)
    )
  }
}, "position");
function usePosition(props) {
  let name = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : getCurrentInstanceName();
  const positionClasses = computed(() => {
    return props.position ? `${name}--${props.position}` : void 0;
  });
  return {
    positionClasses
  };
}
function useRoute() {
  const vm = getCurrentInstance("useRoute");
  return computed(() => {
    var _a;
    return (_a = vm == null ? void 0 : vm.proxy) == null ? void 0 : _a.$route;
  });
}
function useRouter() {
  var _a, _b;
  return (_b = (_a = getCurrentInstance("useRouter")) == null ? void 0 : _a.proxy) == null ? void 0 : _b.$router;
}
function useLink(props, attrs) {
  var _a, _b;
  const RouterLink = resolveDynamicComponent("RouterLink");
  const isLink = computed(() => !!(props.href || props.to));
  const isClickable = computed(() => {
    return (isLink == null ? void 0 : isLink.value) || hasEvent(attrs, "click") || hasEvent(props, "click");
  });
  if (typeof RouterLink === "string" || !("useLink" in RouterLink)) {
    return {
      isLink,
      isClickable,
      href: toRef(props, "href")
    };
  }
  const linkProps = computed(() => ({
    ...props,
    to: toRef(() => props.to || "")
  }));
  const routerLink = RouterLink.useLink(linkProps.value);
  const link = computed(() => props.to ? routerLink : void 0);
  const route = useRoute();
  return {
    isLink,
    isClickable,
    route: (_a = link.value) == null ? void 0 : _a.route,
    navigate: (_b = link.value) == null ? void 0 : _b.navigate,
    isActive: computed(() => {
      var _a2, _b2, _c;
      if (!link.value) return false;
      if (!props.exact) return ((_a2 = link.value.isActive) == null ? void 0 : _a2.value) ?? false;
      if (!route.value) return ((_b2 = link.value.isExactActive) == null ? void 0 : _b2.value) ?? false;
      return ((_c = link.value.isExactActive) == null ? void 0 : _c.value) && deepEqual(link.value.route.value.query, route.value.query);
    }),
    href: computed(() => {
      var _a2;
      return props.to ? (_a2 = link.value) == null ? void 0 : _a2.route.value.href : props.href;
    })
  };
}
const makeRouterProps = propsFactory({
  href: String,
  replace: Boolean,
  to: [String, Object],
  exact: Boolean
}, "router");
function useSelectLink(link, select) {
  watch(() => {
    var _a;
    return (_a = link.isActive) == null ? void 0 : _a.value;
  }, (isActive) => {
    if (link.isLink.value && isActive && select) {
      nextTick(() => {
        select(true);
      });
    }
  }, {
    immediate: true
  });
}
const stopSymbol = Symbol("rippleStop");
const DELAY_RIPPLE = 80;
function transform(el, value) {
  el.style.transform = value;
  el.style.webkitTransform = value;
}
function isTouchEvent(e) {
  return e.constructor.name === "TouchEvent";
}
function isKeyboardEvent(e) {
  return e.constructor.name === "KeyboardEvent";
}
const calculate = function(e, el) {
  var _a;
  let value = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
  let localX = 0;
  let localY = 0;
  if (!isKeyboardEvent(e)) {
    const offset = el.getBoundingClientRect();
    const target = isTouchEvent(e) ? e.touches[e.touches.length - 1] : e;
    localX = target.clientX - offset.left;
    localY = target.clientY - offset.top;
  }
  let radius = 0;
  let scale = 0.3;
  if ((_a = el._ripple) == null ? void 0 : _a.circle) {
    scale = 0.15;
    radius = el.clientWidth / 2;
    radius = value.center ? radius : radius + Math.sqrt((localX - radius) ** 2 + (localY - radius) ** 2) / 4;
  } else {
    radius = Math.sqrt(el.clientWidth ** 2 + el.clientHeight ** 2) / 2;
  }
  const centerX = `${(el.clientWidth - radius * 2) / 2}px`;
  const centerY = `${(el.clientHeight - radius * 2) / 2}px`;
  const x = value.center ? centerX : `${localX - radius}px`;
  const y = value.center ? centerY : `${localY - radius}px`;
  return {
    radius,
    scale,
    x,
    y,
    centerX,
    centerY
  };
};
const ripples = {
  /* eslint-disable max-statements */
  show(e, el) {
    var _a;
    let value = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    if (!((_a = el == null ? void 0 : el._ripple) == null ? void 0 : _a.enabled)) {
      return;
    }
    const container = (void 0).createElement("span");
    const animation = (void 0).createElement("span");
    container.appendChild(animation);
    container.className = "v-ripple__container";
    if (value.class) {
      container.className += ` ${value.class}`;
    }
    const {
      radius,
      scale,
      x,
      y,
      centerX,
      centerY
    } = calculate(e, el, value);
    const size = `${radius * 2}px`;
    animation.className = "v-ripple__animation";
    animation.style.width = size;
    animation.style.height = size;
    el.appendChild(container);
    const computed2 = (void 0).getComputedStyle(el);
    if (computed2 && computed2.position === "static") {
      el.style.position = "relative";
      el.dataset.previousPosition = "static";
    }
    animation.classList.add("v-ripple__animation--enter");
    animation.classList.add("v-ripple__animation--visible");
    transform(animation, `translate(${x}, ${y}) scale3d(${scale},${scale},${scale})`);
    animation.dataset.activated = String(performance.now());
    setTimeout(() => {
      animation.classList.remove("v-ripple__animation--enter");
      animation.classList.add("v-ripple__animation--in");
      transform(animation, `translate(${centerX}, ${centerY}) scale3d(1,1,1)`);
    }, 0);
  },
  hide(el) {
    var _a;
    if (!((_a = el == null ? void 0 : el._ripple) == null ? void 0 : _a.enabled)) return;
    const ripples2 = el.getElementsByClassName("v-ripple__animation");
    if (ripples2.length === 0) return;
    const animation = ripples2[ripples2.length - 1];
    if (animation.dataset.isHiding) return;
    else animation.dataset.isHiding = "true";
    const diff = performance.now() - Number(animation.dataset.activated);
    const delay = Math.max(250 - diff, 0);
    setTimeout(() => {
      animation.classList.remove("v-ripple__animation--in");
      animation.classList.add("v-ripple__animation--out");
      setTimeout(() => {
        var _a2;
        const ripples3 = el.getElementsByClassName("v-ripple__animation");
        if (ripples3.length === 1 && el.dataset.previousPosition) {
          el.style.position = el.dataset.previousPosition;
          delete el.dataset.previousPosition;
        }
        if (((_a2 = animation.parentNode) == null ? void 0 : _a2.parentNode) === el) el.removeChild(animation.parentNode);
      }, 300);
    }, delay);
  }
};
function isRippleEnabled(value) {
  return typeof value === "undefined" || !!value;
}
function rippleShow(e) {
  const value = {};
  const element = e.currentTarget;
  if (!(element == null ? void 0 : element._ripple) || element._ripple.touched || e[stopSymbol]) return;
  e[stopSymbol] = true;
  if (isTouchEvent(e)) {
    element._ripple.touched = true;
    element._ripple.isTouch = true;
  } else {
    if (element._ripple.isTouch) return;
  }
  value.center = element._ripple.centered || isKeyboardEvent(e);
  if (element._ripple.class) {
    value.class = element._ripple.class;
  }
  if (isTouchEvent(e)) {
    if (element._ripple.showTimerCommit) return;
    element._ripple.showTimerCommit = () => {
      ripples.show(e, element, value);
    };
    element._ripple.showTimer = (void 0).setTimeout(() => {
      var _a;
      if ((_a = element == null ? void 0 : element._ripple) == null ? void 0 : _a.showTimerCommit) {
        element._ripple.showTimerCommit();
        element._ripple.showTimerCommit = null;
      }
    }, DELAY_RIPPLE);
  } else {
    ripples.show(e, element, value);
  }
}
function rippleStop(e) {
  e[stopSymbol] = true;
}
function rippleHide(e) {
  const element = e.currentTarget;
  if (!(element == null ? void 0 : element._ripple)) return;
  (void 0).clearTimeout(element._ripple.showTimer);
  if (e.type === "touchend" && element._ripple.showTimerCommit) {
    element._ripple.showTimerCommit();
    element._ripple.showTimerCommit = null;
    element._ripple.showTimer = (void 0).setTimeout(() => {
      rippleHide(e);
    });
    return;
  }
  (void 0).setTimeout(() => {
    if (element._ripple) {
      element._ripple.touched = false;
    }
  });
  ripples.hide(element);
}
function rippleCancelShow(e) {
  const element = e.currentTarget;
  if (!(element == null ? void 0 : element._ripple)) return;
  if (element._ripple.showTimerCommit) {
    element._ripple.showTimerCommit = null;
  }
  (void 0).clearTimeout(element._ripple.showTimer);
}
let keyboardRipple = false;
function keyboardRippleShow(e) {
  if (!keyboardRipple && (e.keyCode === keyCodes.enter || e.keyCode === keyCodes.space)) {
    keyboardRipple = true;
    rippleShow(e);
  }
}
function keyboardRippleHide(e) {
  keyboardRipple = false;
  rippleHide(e);
}
function focusRippleHide(e) {
  if (keyboardRipple) {
    keyboardRipple = false;
    rippleHide(e);
  }
}
function updateRipple(el, binding, wasEnabled) {
  const {
    value,
    modifiers
  } = binding;
  const enabled = isRippleEnabled(value);
  if (!enabled) {
    ripples.hide(el);
  }
  el._ripple = el._ripple ?? {};
  el._ripple.enabled = enabled;
  el._ripple.centered = modifiers.center;
  el._ripple.circle = modifiers.circle;
  if (isObject(value) && value.class) {
    el._ripple.class = value.class;
  }
  if (enabled && !wasEnabled) {
    if (modifiers.stop) {
      el.addEventListener("touchstart", rippleStop, {
        passive: true
      });
      el.addEventListener("mousedown", rippleStop);
      return;
    }
    el.addEventListener("touchstart", rippleShow, {
      passive: true
    });
    el.addEventListener("touchend", rippleHide, {
      passive: true
    });
    el.addEventListener("touchmove", rippleCancelShow, {
      passive: true
    });
    el.addEventListener("touchcancel", rippleHide);
    el.addEventListener("mousedown", rippleShow);
    el.addEventListener("mouseup", rippleHide);
    el.addEventListener("mouseleave", rippleHide);
    el.addEventListener("keydown", keyboardRippleShow);
    el.addEventListener("keyup", keyboardRippleHide);
    el.addEventListener("blur", focusRippleHide);
    el.addEventListener("dragstart", rippleHide, {
      passive: true
    });
  } else if (!enabled && wasEnabled) {
    removeListeners(el);
  }
}
function removeListeners(el) {
  el.removeEventListener("mousedown", rippleShow);
  el.removeEventListener("touchstart", rippleShow);
  el.removeEventListener("touchend", rippleHide);
  el.removeEventListener("touchmove", rippleCancelShow);
  el.removeEventListener("touchcancel", rippleHide);
  el.removeEventListener("mouseup", rippleHide);
  el.removeEventListener("mouseleave", rippleHide);
  el.removeEventListener("keydown", keyboardRippleShow);
  el.removeEventListener("keyup", keyboardRippleHide);
  el.removeEventListener("dragstart", rippleHide);
  el.removeEventListener("blur", focusRippleHide);
}
function mounted$1(el, binding) {
  updateRipple(el, binding, false);
}
function unmounted$1(el) {
  delete el._ripple;
  removeListeners(el);
}
function updated(el, binding) {
  if (binding.value === binding.oldValue) {
    return;
  }
  const wasEnabled = isRippleEnabled(binding.oldValue);
  updateRipple(el, binding, wasEnabled);
}
const Ripple = {
  mounted: mounted$1,
  unmounted: unmounted$1,
  updated
};
const makeVBtnProps = propsFactory({
  active: {
    type: Boolean,
    default: void 0
  },
  baseColor: String,
  symbol: {
    type: null,
    default: VBtnToggleSymbol
  },
  flat: Boolean,
  icon: [Boolean, String, Function, Object],
  prependIcon: IconValue,
  appendIcon: IconValue,
  block: Boolean,
  readonly: Boolean,
  slim: Boolean,
  stacked: Boolean,
  ripple: {
    type: [Boolean, Object],
    default: true
  },
  text: String,
  ...makeBorderProps(),
  ...makeComponentProps(),
  ...makeDensityProps(),
  ...makeDimensionProps(),
  ...makeElevationProps(),
  ...makeGroupItemProps(),
  ...makeLoaderProps(),
  ...makeLocationProps(),
  ...makePositionProps(),
  ...makeRoundedProps(),
  ...makeRouterProps(),
  ...makeSizeProps(),
  ...makeTagProps({
    tag: "button"
  }),
  ...makeThemeProps(),
  ...makeVariantProps({
    variant: "elevated"
  })
}, "VBtn");
const VBtn = genericComponent()({
  name: "VBtn",
  props: makeVBtnProps(),
  emits: {
    "group:selected": (val) => true
  },
  setup(props, _ref) {
    let {
      attrs,
      slots
    } = _ref;
    const {
      themeClasses
    } = provideTheme(props);
    const {
      borderClasses
    } = useBorder(props);
    const {
      densityClasses
    } = useDensity(props);
    const {
      dimensionStyles
    } = useDimension(props);
    const {
      elevationClasses
    } = useElevation(props);
    const {
      loaderClasses
    } = useLoader(props);
    const {
      locationStyles
    } = useLocation(props);
    const {
      positionClasses
    } = usePosition(props);
    const {
      roundedClasses
    } = useRounded(props);
    const {
      sizeClasses,
      sizeStyles
    } = useSize(props);
    const group = useGroupItem(props, props.symbol, false);
    const link = useLink(props, attrs);
    const isActive = computed(() => {
      var _a;
      if (props.active !== void 0) {
        return props.active;
      }
      if (link.isLink.value) {
        return (_a = link.isActive) == null ? void 0 : _a.value;
      }
      return group == null ? void 0 : group.isSelected.value;
    });
    const variantProps = computed(() => {
      var _a, _b;
      const showColor = (group == null ? void 0 : group.isSelected.value) && (!link.isLink.value || ((_a = link.isActive) == null ? void 0 : _a.value)) || !group || ((_b = link.isActive) == null ? void 0 : _b.value);
      return {
        color: showColor ? props.color ?? props.baseColor : props.baseColor,
        variant: props.variant
      };
    });
    const {
      colorClasses,
      colorStyles,
      variantClasses
    } = useVariant(variantProps);
    const isDisabled = computed(() => (group == null ? void 0 : group.disabled.value) || props.disabled);
    const isElevated = computed(() => {
      return props.variant === "elevated" && !(props.disabled || props.flat || props.border);
    });
    const valueAttr = computed(() => {
      if (props.value === void 0 || typeof props.value === "symbol") return void 0;
      return Object(props.value) === props.value ? JSON.stringify(props.value, null, 0) : props.value;
    });
    function onClick(e) {
      var _a;
      if (isDisabled.value || link.isLink.value && (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0 || attrs.target === "_blank")) return;
      (_a = link.navigate) == null ? void 0 : _a.call(link, e);
      group == null ? void 0 : group.toggle();
    }
    useSelectLink(link, group == null ? void 0 : group.select);
    useRender(() => {
      const Tag = link.isLink.value ? "a" : props.tag;
      const hasPrepend = !!(props.prependIcon || slots.prepend);
      const hasAppend = !!(props.appendIcon || slots.append);
      const hasIcon = !!(props.icon && props.icon !== true);
      return withDirectives(createVNode(Tag, {
        "type": Tag === "a" ? void 0 : "button",
        "class": ["v-btn", group == null ? void 0 : group.selectedClass.value, {
          "v-btn--active": isActive.value,
          "v-btn--block": props.block,
          "v-btn--disabled": isDisabled.value,
          "v-btn--elevated": isElevated.value,
          "v-btn--flat": props.flat,
          "v-btn--icon": !!props.icon,
          "v-btn--loading": props.loading,
          "v-btn--readonly": props.readonly,
          "v-btn--slim": props.slim,
          "v-btn--stacked": props.stacked
        }, themeClasses.value, borderClasses.value, colorClasses.value, densityClasses.value, elevationClasses.value, loaderClasses.value, positionClasses.value, roundedClasses.value, sizeClasses.value, variantClasses.value, props.class],
        "style": [colorStyles.value, dimensionStyles.value, locationStyles.value, sizeStyles.value, props.style],
        "aria-busy": props.loading ? true : void 0,
        "disabled": isDisabled.value || void 0,
        "href": link.href.value,
        "tabindex": props.loading || props.readonly ? -1 : void 0,
        "onClick": onClick,
        "value": valueAttr.value
      }, {
        default: () => {
          var _a;
          return [genOverlays(true, "v-btn"), !props.icon && hasPrepend && createVNode("span", {
            "key": "prepend",
            "class": "v-btn__prepend"
          }, [!slots.prepend ? createVNode(VIcon, {
            "key": "prepend-icon",
            "icon": props.prependIcon
          }, null) : createVNode(VDefaultsProvider, {
            "key": "prepend-defaults",
            "disabled": !props.prependIcon,
            "defaults": {
              VIcon: {
                icon: props.prependIcon
              }
            }
          }, slots.prepend)]), createVNode("span", {
            "class": "v-btn__content",
            "data-no-activator": ""
          }, [!slots.default && hasIcon ? createVNode(VIcon, {
            "key": "content-icon",
            "icon": props.icon
          }, null) : createVNode(VDefaultsProvider, {
            "key": "content-defaults",
            "disabled": !hasIcon,
            "defaults": {
              VIcon: {
                icon: props.icon
              }
            }
          }, {
            default: () => {
              var _a2;
              return [((_a2 = slots.default) == null ? void 0 : _a2.call(slots)) ?? props.text];
            }
          })]), !props.icon && hasAppend && createVNode("span", {
            "key": "append",
            "class": "v-btn__append"
          }, [!slots.append ? createVNode(VIcon, {
            "key": "append-icon",
            "icon": props.appendIcon
          }, null) : createVNode(VDefaultsProvider, {
            "key": "append-defaults",
            "disabled": !props.appendIcon,
            "defaults": {
              VIcon: {
                icon: props.appendIcon
              }
            }
          }, slots.append)]), !!props.loading && createVNode("span", {
            "key": "loader",
            "class": "v-btn__loader"
          }, [((_a = slots.loader) == null ? void 0 : _a.call(slots)) ?? createVNode(VProgressCircular, {
            "color": typeof props.loading === "boolean" ? void 0 : props.loading,
            "indeterminate": true,
            "width": "2"
          }, null)])];
        }
      }), [[Ripple, !isDisabled.value && !!props.ripple, "", {
        center: !!props.icon
      }]]);
    });
    return {
      group
    };
  }
});
const makeVConfirmEditProps = propsFactory({
  modelValue: null,
  color: String,
  cancelText: {
    type: String,
    default: "$vuetify.confirmEdit.cancel"
  },
  okText: {
    type: String,
    default: "$vuetify.confirmEdit.ok"
  }
}, "VConfirmEdit");
const VConfirmEdit = genericComponent()({
  name: "VConfirmEdit",
  props: makeVConfirmEditProps(),
  emits: {
    cancel: () => true,
    save: (value) => true,
    "update:modelValue": (value) => true
  },
  setup(props, _ref) {
    let {
      emit,
      slots
    } = _ref;
    const model = useProxiedModel(props, "modelValue");
    const internalModel = ref();
    watchEffect(() => {
      internalModel.value = structuredClone(toRaw(model.value));
    });
    const {
      t
    } = useLocale();
    const isPristine = computed(() => {
      return deepEqual(model.value, internalModel.value);
    });
    function save() {
      model.value = internalModel.value;
      emit("save", internalModel.value);
    }
    function cancel() {
      internalModel.value = structuredClone(toRaw(model.value));
      emit("cancel");
    }
    let actionsUsed = false;
    useRender(() => {
      var _a;
      const actions = createVNode(Fragment, null, [createVNode(VBtn, {
        "disabled": isPristine.value,
        "variant": "text",
        "color": props.color,
        "onClick": cancel,
        "text": t(props.cancelText)
      }, null), createVNode(VBtn, {
        "disabled": isPristine.value,
        "variant": "text",
        "color": props.color,
        "onClick": save,
        "text": t(props.okText)
      }, null)]);
      return createVNode(Fragment, null, [(_a = slots.default) == null ? void 0 : _a.call(slots, {
        model: internalModel,
        save,
        cancel,
        isPristine: isPristine.value,
        get actions() {
          actionsUsed = true;
          return actions;
        }
      }), !actionsUsed && actions]);
    });
    return {
      save,
      cancel,
      isPristine
    };
  }
});
const VSpacer = createSimpleFunctional("v-spacer", "div", "VSpacer");
const makeVDatePickerControlsProps = propsFactory({
  active: {
    type: [String, Array],
    default: void 0
  },
  disabled: {
    type: [Boolean, String, Array],
    default: false
  },
  nextIcon: {
    type: [String],
    default: "$next"
  },
  prevIcon: {
    type: [String],
    default: "$prev"
  },
  modeIcon: {
    type: [String],
    default: "$subgroup"
  },
  text: String,
  viewMode: {
    type: String,
    default: "month"
  }
}, "VDatePickerControls");
const VDatePickerControls = genericComponent()({
  name: "VDatePickerControls",
  props: makeVDatePickerControlsProps(),
  emits: {
    "click:year": () => true,
    "click:month": () => true,
    "click:prev": () => true,
    "click:next": () => true,
    "click:text": () => true
  },
  setup(props, _ref) {
    let {
      emit
    } = _ref;
    const disableMonth = computed(() => {
      return Array.isArray(props.disabled) ? props.disabled.includes("text") : !!props.disabled;
    });
    const disableYear = computed(() => {
      return Array.isArray(props.disabled) ? props.disabled.includes("mode") : !!props.disabled;
    });
    const disablePrev = computed(() => {
      return Array.isArray(props.disabled) ? props.disabled.includes("prev") : !!props.disabled;
    });
    const disableNext = computed(() => {
      return Array.isArray(props.disabled) ? props.disabled.includes("next") : !!props.disabled;
    });
    function onClickPrev() {
      emit("click:prev");
    }
    function onClickNext() {
      emit("click:next");
    }
    function onClickYear() {
      emit("click:year");
    }
    function onClickMonth() {
      emit("click:month");
    }
    useRender(() => {
      return createVNode("div", {
        "class": ["v-date-picker-controls"]
      }, [createVNode(VBtn, {
        "class": "v-date-picker-controls__month-btn",
        "disabled": disableMonth.value,
        "text": props.text,
        "variant": "text",
        "rounded": true,
        "onClick": onClickMonth
      }, null), createVNode(VBtn, {
        "key": "mode-btn",
        "class": "v-date-picker-controls__mode-btn",
        "disabled": disableYear.value,
        "density": "comfortable",
        "icon": props.modeIcon,
        "variant": "text",
        "onClick": onClickYear
      }, null), createVNode(VSpacer, {
        "key": "mode-spacer"
      }, null), createVNode("div", {
        "key": "month-buttons",
        "class": "v-date-picker-controls__month"
      }, [createVNode(VBtn, {
        "disabled": disablePrev.value,
        "icon": props.prevIcon,
        "variant": "text",
        "onClick": onClickPrev
      }, null), createVNode(VBtn, {
        "disabled": disableNext.value,
        "icon": props.nextIcon,
        "variant": "text",
        "onClick": onClickNext
      }, null)])]);
    });
    return {};
  }
});
const makeTransitionProps$1 = propsFactory({
  transition: {
    type: [Boolean, String, Object],
    default: "fade-transition",
    validator: (val) => val !== true
  }
}, "transition");
const MaybeTransition = (props, _ref) => {
  let {
    slots
  } = _ref;
  const {
    transition,
    disabled,
    group,
    ...rest
  } = props;
  const {
    component = group ? TransitionGroup : Transition,
    ...customProps
  } = typeof transition === "object" ? transition : {};
  return h(component, mergeProps(typeof transition === "string" ? {
    name: disabled ? "" : transition
  } : customProps, typeof transition === "string" ? {} : Object.fromEntries(Object.entries({
    disabled,
    group
  }).filter((_ref2) => {
    let [_, v] = _ref2;
    return v !== void 0;
  })), rest), slots);
};
const makeVDatePickerHeaderProps = propsFactory({
  appendIcon: String,
  color: String,
  header: String,
  transition: String,
  onClick: EventProp()
}, "VDatePickerHeader");
const VDatePickerHeader = genericComponent()({
  name: "VDatePickerHeader",
  props: makeVDatePickerHeaderProps(),
  emits: {
    click: () => true,
    "click:append": () => true
  },
  setup(props, _ref) {
    let {
      emit,
      slots
    } = _ref;
    const {
      backgroundColorClasses,
      backgroundColorStyles
    } = useBackgroundColor(props, "color");
    function onClick() {
      emit("click");
    }
    function onClickAppend() {
      emit("click:append");
    }
    useRender(() => {
      const hasContent = !!(slots.default || props.header);
      const hasAppend = !!(slots.append || props.appendIcon);
      return createVNode("div", {
        "class": ["v-date-picker-header", {
          "v-date-picker-header--clickable": !!props.onClick
        }, backgroundColorClasses.value],
        "style": backgroundColorStyles.value,
        "onClick": onClick
      }, [slots.prepend && createVNode("div", {
        "key": "prepend",
        "class": "v-date-picker-header__prepend"
      }, [slots.prepend()]), hasContent && createVNode(MaybeTransition, {
        "key": "content",
        "name": props.transition
      }, {
        default: () => {
          var _a;
          return [createVNode("div", {
            "key": props.header,
            "class": "v-date-picker-header__content"
          }, [((_a = slots.default) == null ? void 0 : _a.call(slots)) ?? props.header])];
        }
      }), hasAppend && createVNode("div", {
        "class": "v-date-picker-header__append"
      }, [!slots.append ? createVNode(VBtn, {
        "key": "append-btn",
        "icon": props.appendIcon,
        "variant": "text",
        "onClick": onClickAppend
      }, null) : createVNode(VDefaultsProvider, {
        "key": "append-defaults",
        "disabled": !props.appendIcon,
        "defaults": {
          VBtn: {
            icon: props.appendIcon,
            variant: "text"
          }
        }
      }, {
        default: () => {
          var _a;
          return [(_a = slots.append) == null ? void 0 : _a.call(slots)];
        }
      })])]);
    });
    return {};
  }
});
const makeCalendarProps = propsFactory({
  allowedDates: [Array, Function],
  disabled: Boolean,
  displayValue: null,
  modelValue: Array,
  month: [Number, String],
  max: null,
  min: null,
  showAdjacentMonths: Boolean,
  year: [Number, String],
  weekdays: {
    type: Array,
    default: () => [0, 1, 2, 3, 4, 5, 6]
  },
  weeksInMonth: {
    type: String,
    default: "dynamic"
  }
}, "calendar");
function useCalendar(props) {
  const adapter = useDate();
  const model = useProxiedModel(props, "modelValue", [], (v) => wrapInArray(v));
  const displayValue = computed(() => {
    if (props.displayValue) return adapter.date(props.displayValue);
    if (model.value.length > 0) return adapter.date(model.value[0]);
    if (props.min) return adapter.date(props.min);
    if (Array.isArray(props.allowedDates)) return adapter.date(props.allowedDates[0]);
    return adapter.date();
  });
  const year = useProxiedModel(props, "year", void 0, (v) => {
    const value = v != null ? Number(v) : adapter.getYear(displayValue.value);
    return adapter.startOfYear(adapter.setYear(adapter.date(), value));
  }, (v) => adapter.getYear(v));
  const month = useProxiedModel(props, "month", void 0, (v) => {
    const value = v != null ? Number(v) : adapter.getMonth(displayValue.value);
    const date2 = adapter.setYear(adapter.startOfMonth(adapter.date()), adapter.getYear(year.value));
    return adapter.setMonth(date2, value);
  }, (v) => adapter.getMonth(v));
  const weeksInMonth = computed(() => {
    const weeks = adapter.getWeekArray(month.value);
    const days = weeks.flat();
    const daysInMonth2 = 6 * 7;
    if (props.weeksInMonth === "static" && days.length < daysInMonth2) {
      const lastDay = days[days.length - 1];
      let week = [];
      for (let day = 1; day <= daysInMonth2 - days.length; day++) {
        week.push(adapter.addDays(lastDay, day));
        if (day % 7 === 0) {
          weeks.push(week);
          week = [];
        }
      }
    }
    return weeks;
  });
  function genDays(days, today) {
    return days.filter((date2) => {
      return props.weekdays.includes(adapter.toJsDate(date2).getDay());
    }).map((date2, index) => {
      const isoDate = adapter.toISO(date2);
      const isAdjacent = !adapter.isSameMonth(date2, month.value);
      const isStart = adapter.isSameDay(date2, adapter.startOfMonth(month.value));
      const isEnd = adapter.isSameDay(date2, adapter.endOfMonth(month.value));
      const isSame = adapter.isSameDay(date2, month.value);
      return {
        date: date2,
        isoDate,
        formatted: adapter.format(date2, "keyboardDate"),
        year: adapter.getYear(date2),
        month: adapter.getMonth(date2),
        isDisabled: isDisabled(date2),
        isWeekStart: index % 7 === 0,
        isWeekEnd: index % 7 === 6,
        isToday: adapter.isSameDay(date2, today),
        isAdjacent,
        isHidden: isAdjacent && !props.showAdjacentMonths,
        isStart,
        isSelected: model.value.some((value) => adapter.isSameDay(date2, value)),
        isEnd,
        isSame,
        localized: adapter.format(date2, "dayOfMonth")
      };
    });
  }
  const daysInWeek = computed(() => {
    const lastDay = adapter.startOfWeek(displayValue.value);
    const week = [];
    for (let day = 0; day <= 6; day++) {
      week.push(adapter.addDays(lastDay, day));
    }
    const today = adapter.date();
    return genDays(week, today);
  });
  const daysInMonth = computed(() => {
    const days = weeksInMonth.value.flat();
    const today = adapter.date();
    return genDays(days, today);
  });
  const weekNumbers = computed(() => {
    return weeksInMonth.value.map((week) => {
      return week.length ? getWeek(adapter, week[0]) : null;
    });
  });
  function isDisabled(value) {
    if (props.disabled) return true;
    const date2 = adapter.date(value);
    if (props.min && adapter.isAfter(adapter.date(props.min), date2)) return true;
    if (props.max && adapter.isAfter(date2, adapter.date(props.max))) return true;
    if (Array.isArray(props.allowedDates) && props.allowedDates.length > 0) {
      return !props.allowedDates.some((d) => adapter.isSameDay(adapter.date(d), date2));
    }
    if (typeof props.allowedDates === "function") {
      return !props.allowedDates(date2);
    }
    return false;
  }
  return {
    displayValue,
    daysInMonth,
    daysInWeek,
    genDays,
    model,
    weeksInMonth,
    weekNumbers
  };
}
const makeVDatePickerMonthProps = propsFactory({
  color: String,
  hideWeekdays: Boolean,
  multiple: [Boolean, Number, String],
  showWeek: Boolean,
  transition: {
    type: String,
    default: "picker-transition"
  },
  reverseTransition: {
    type: String,
    default: "picker-reverse-transition"
  },
  ...makeCalendarProps()
}, "VDatePickerMonth");
const VDatePickerMonth = genericComponent()({
  name: "VDatePickerMonth",
  props: makeVDatePickerMonthProps(),
  emits: {
    "update:modelValue": (date2) => true,
    "update:month": (date2) => true,
    "update:year": (date2) => true
  },
  setup(props, _ref) {
    let {
      emit,
      slots
    } = _ref;
    const daysRef = ref();
    const {
      daysInMonth,
      model,
      weekNumbers
    } = useCalendar(props);
    const adapter = useDate();
    const rangeStart = shallowRef();
    const rangeStop = shallowRef();
    const isReverse = shallowRef(false);
    const transition = computed(() => {
      return !isReverse.value ? props.transition : props.reverseTransition;
    });
    if (props.multiple === "range" && model.value.length > 0) {
      rangeStart.value = model.value[0];
      if (model.value.length > 1) {
        rangeStop.value = model.value[model.value.length - 1];
      }
    }
    const atMax = computed(() => {
      const max = ["number", "string"].includes(typeof props.multiple) ? Number(props.multiple) : Infinity;
      return model.value.length >= max;
    });
    watch(daysInMonth, (val, oldVal) => {
      if (!oldVal) return;
      isReverse.value = adapter.isBefore(val[0].date, oldVal[0].date);
    });
    function onRangeClick(value) {
      const _value = adapter.startOfDay(value);
      if (model.value.length === 0) {
        rangeStart.value = void 0;
      }
      if (!rangeStart.value) {
        rangeStart.value = _value;
        model.value = [rangeStart.value];
      } else if (!rangeStop.value) {
        if (adapter.isSameDay(_value, rangeStart.value)) {
          rangeStart.value = void 0;
          model.value = [];
          return;
        } else if (adapter.isBefore(_value, rangeStart.value)) {
          rangeStop.value = adapter.endOfDay(rangeStart.value);
          rangeStart.value = _value;
        } else {
          rangeStop.value = adapter.endOfDay(_value);
        }
        const diff = adapter.getDiff(rangeStop.value, rangeStart.value, "days");
        const datesInRange = [rangeStart.value];
        for (let i = 1; i < diff; i++) {
          const nextDate = adapter.addDays(rangeStart.value, i);
          datesInRange.push(nextDate);
        }
        datesInRange.push(rangeStop.value);
        model.value = datesInRange;
      } else {
        rangeStart.value = value;
        rangeStop.value = void 0;
        model.value = [rangeStart.value];
      }
    }
    function onMultipleClick(value) {
      const index = model.value.findIndex((selection) => adapter.isSameDay(selection, value));
      if (index === -1) {
        model.value = [...model.value, value];
      } else {
        const value2 = [...model.value];
        value2.splice(index, 1);
        model.value = value2;
      }
    }
    function onClick(value) {
      if (props.multiple === "range") {
        onRangeClick(value);
      } else if (props.multiple) {
        onMultipleClick(value);
      } else {
        model.value = [value];
      }
    }
    return () => createVNode("div", {
      "class": "v-date-picker-month"
    }, [props.showWeek && createVNode("div", {
      "key": "weeks",
      "class": "v-date-picker-month__weeks"
    }, [!props.hideWeekdays && createVNode("div", {
      "key": "hide-week-days",
      "class": "v-date-picker-month__day"
    }, [createTextVNode(" ")]), weekNumbers.value.map((week) => createVNode("div", {
      "class": ["v-date-picker-month__day", "v-date-picker-month__day--adjacent"]
    }, [week]))]), createVNode(MaybeTransition, {
      "name": transition.value
    }, {
      default: () => {
        var _a;
        return [createVNode("div", {
          "ref": daysRef,
          "key": (_a = daysInMonth.value[0].date) == null ? void 0 : _a.toString(),
          "class": "v-date-picker-month__days"
        }, [!props.hideWeekdays && adapter.getWeekdays().map((weekDay) => createVNode("div", {
          "class": ["v-date-picker-month__day", "v-date-picker-month__weekday"]
        }, [weekDay])), daysInMonth.value.map((item, i) => {
          const slotProps = {
            props: {
              onClick: () => onClick(item.date)
            },
            item,
            i
          };
          if (atMax.value && !item.isSelected) {
            item.isDisabled = true;
          }
          return createVNode("div", {
            "class": ["v-date-picker-month__day", {
              "v-date-picker-month__day--adjacent": item.isAdjacent,
              "v-date-picker-month__day--hide-adjacent": item.isHidden,
              "v-date-picker-month__day--selected": item.isSelected,
              "v-date-picker-month__day--week-end": item.isWeekEnd,
              "v-date-picker-month__day--week-start": item.isWeekStart
            }],
            "data-v-date": !item.isDisabled ? item.isoDate : void 0
          }, [(props.showAdjacentMonths || !item.isAdjacent) && createVNode(VDefaultsProvider, {
            "defaults": {
              VBtn: {
                class: "v-date-picker-month__day-btn",
                color: (item.isSelected || item.isToday) && !item.isDisabled ? props.color : void 0,
                disabled: item.isDisabled,
                icon: true,
                ripple: false,
                text: item.localized,
                variant: item.isDisabled ? item.isToday ? "outlined" : "text" : item.isToday && !item.isSelected ? "outlined" : "flat",
                onClick: () => onClick(item.date)
              }
            }
          }, {
            default: () => {
              var _a2;
              return [((_a2 = slots.day) == null ? void 0 : _a2.call(slots, slotProps)) ?? createVNode(VBtn, slotProps.props, null)];
            }
          })]);
        })])];
      }
    })]);
  }
});
const makeVDatePickerMonthsProps = propsFactory({
  color: String,
  height: [String, Number],
  min: null,
  max: null,
  modelValue: Number,
  year: Number
}, "VDatePickerMonths");
const VDatePickerMonths = genericComponent()({
  name: "VDatePickerMonths",
  props: makeVDatePickerMonthsProps(),
  emits: {
    "update:modelValue": (date2) => true
  },
  setup(props, _ref) {
    let {
      emit,
      slots
    } = _ref;
    const adapter = useDate();
    const model = useProxiedModel(props, "modelValue");
    const months = computed(() => {
      let date2 = adapter.startOfYear(adapter.date());
      if (props.year) {
        date2 = adapter.setYear(date2, props.year);
      }
      return createRange(12).map((i) => {
        const text = adapter.format(date2, "monthShort");
        const isDisabled = !!(props.min && adapter.isAfter(adapter.startOfMonth(adapter.date(props.min)), date2) || props.max && adapter.isAfter(date2, adapter.startOfMonth(adapter.date(props.max))));
        date2 = adapter.getNextMonth(date2);
        return {
          isDisabled,
          text,
          value: i
        };
      });
    });
    watchEffect(() => {
      model.value = model.value ?? adapter.getMonth(adapter.date());
    });
    useRender(() => createVNode("div", {
      "class": "v-date-picker-months",
      "style": {
        height: convertToUnit(props.height)
      }
    }, [createVNode("div", {
      "class": "v-date-picker-months__content"
    }, [months.value.map((month, i) => {
      var _a;
      const btnProps = {
        active: model.value === i,
        color: model.value === i ? props.color : void 0,
        disabled: month.isDisabled,
        rounded: true,
        text: month.text,
        variant: model.value === month.value ? "flat" : "text",
        onClick: () => onClick(i)
      };
      function onClick(i2) {
        if (model.value === i2) {
          emit("update:modelValue", model.value);
          return;
        }
        model.value = i2;
      }
      return ((_a = slots.month) == null ? void 0 : _a.call(slots, {
        month,
        i,
        props: btnProps
      })) ?? createVNode(VBtn, mergeProps({
        "key": "month"
      }, btnProps), null);
    })])]));
    return {};
  }
});
const makeVDatePickerYearsProps = propsFactory({
  color: String,
  height: [String, Number],
  min: null,
  max: null,
  modelValue: Number
}, "VDatePickerYears");
const VDatePickerYears = genericComponent()({
  name: "VDatePickerYears",
  props: makeVDatePickerYearsProps(),
  emits: {
    "update:modelValue": (year) => true
  },
  setup(props, _ref) {
    let {
      emit,
      slots
    } = _ref;
    const adapter = useDate();
    const model = useProxiedModel(props, "modelValue");
    const years = computed(() => {
      const year = adapter.getYear(adapter.date());
      let min = year - 100;
      let max = year + 52;
      if (props.min) {
        min = adapter.getYear(adapter.date(props.min));
      }
      if (props.max) {
        max = adapter.getYear(adapter.date(props.max));
      }
      let date2 = adapter.startOfYear(adapter.date());
      date2 = adapter.setYear(date2, min);
      return createRange(max - min + 1, min).map((i) => {
        const text = adapter.format(date2, "year");
        date2 = adapter.setYear(date2, adapter.getYear(date2) + 1);
        return {
          text,
          value: i
        };
      });
    });
    watchEffect(() => {
      model.value = model.value ?? adapter.getYear(adapter.date());
    });
    const yearRef = templateRef();
    useRender(() => createVNode("div", {
      "class": "v-date-picker-years",
      "style": {
        height: convertToUnit(props.height)
      }
    }, [createVNode("div", {
      "class": "v-date-picker-years__content"
    }, [years.value.map((year, i) => {
      var _a;
      const btnProps = {
        ref: model.value === year.value ? yearRef : void 0,
        active: model.value === year.value,
        color: model.value === year.value ? props.color : void 0,
        rounded: true,
        text: year.text,
        variant: model.value === year.value ? "flat" : "text",
        onClick: () => {
          if (model.value === year.value) {
            emit("update:modelValue", model.value);
            return;
          }
          model.value = year.value;
        }
      };
      return ((_a = slots.year) == null ? void 0 : _a.call(slots, {
        year,
        i,
        props: btnProps
      })) ?? createVNode(VBtn, mergeProps({
        "key": "month"
      }, btnProps), null);
    })])]));
    return {};
  }
});
const makeTransitionProps = propsFactory({
  disabled: Boolean,
  group: Boolean,
  hideOnLeave: Boolean,
  leaveAbsolute: Boolean,
  mode: String,
  origin: String
}, "transition");
function createCssTransition(name, origin, mode) {
  return genericComponent()({
    name,
    props: makeTransitionProps({
      mode,
      origin
    }),
    setup(props, _ref) {
      let {
        slots
      } = _ref;
      const functions = {
        onBeforeEnter(el) {
          if (props.origin) {
            el.style.transformOrigin = props.origin;
          }
        },
        onLeave(el) {
          if (props.leaveAbsolute) {
            const {
              offsetTop,
              offsetLeft,
              offsetWidth,
              offsetHeight
            } = el;
            el._transitionInitialStyles = {
              position: el.style.position,
              top: el.style.top,
              left: el.style.left,
              width: el.style.width,
              height: el.style.height
            };
            el.style.position = "absolute";
            el.style.top = `${offsetTop}px`;
            el.style.left = `${offsetLeft}px`;
            el.style.width = `${offsetWidth}px`;
            el.style.height = `${offsetHeight}px`;
          }
          if (props.hideOnLeave) {
            el.style.setProperty("display", "none", "important");
          }
        },
        onAfterLeave(el) {
          if (props.leaveAbsolute && (el == null ? void 0 : el._transitionInitialStyles)) {
            const {
              position,
              top,
              left,
              width,
              height
            } = el._transitionInitialStyles;
            delete el._transitionInitialStyles;
            el.style.position = position || "";
            el.style.top = top || "";
            el.style.left = left || "";
            el.style.width = width || "";
            el.style.height = height || "";
          }
        }
      };
      return () => {
        const tag = props.group ? TransitionGroup : Transition;
        return h(tag, {
          name: props.disabled ? "" : name,
          css: !props.disabled,
          ...props.group ? void 0 : {
            mode: props.mode
          },
          ...props.disabled ? {} : functions
        }, slots.default);
      };
    }
  });
}
function createJavascriptTransition(name, functions) {
  let mode = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : "in-out";
  return genericComponent()({
    name,
    props: {
      mode: {
        type: String,
        default: mode
      },
      disabled: Boolean,
      group: Boolean
    },
    setup(props, _ref2) {
      let {
        slots
      } = _ref2;
      const tag = props.group ? TransitionGroup : Transition;
      return () => {
        return h(tag, {
          name: props.disabled ? "" : name,
          css: !props.disabled,
          // mode: props.mode, // TODO: vuejs/vue-next#3104
          ...props.disabled ? {} : functions
        }, slots.default);
      };
    }
  });
}
function ExpandTransitionGenerator() {
  let expandedParentClass = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "";
  let x = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
  const sizeProperty = x ? "width" : "height";
  const offsetProperty = camelize(`offset-${sizeProperty}`);
  return {
    onBeforeEnter(el) {
      el._parent = el.parentNode;
      el._initialStyle = {
        transition: el.style.transition,
        overflow: el.style.overflow,
        [sizeProperty]: el.style[sizeProperty]
      };
    },
    onEnter(el) {
      const initialStyle = el._initialStyle;
      el.style.setProperty("transition", "none", "important");
      el.style.overflow = "hidden";
      const offset = `${el[offsetProperty]}px`;
      el.style[sizeProperty] = "0";
      void el.offsetHeight;
      el.style.transition = initialStyle.transition;
      if (expandedParentClass && el._parent) {
        el._parent.classList.add(expandedParentClass);
      }
      requestAnimationFrame(() => {
        el.style[sizeProperty] = offset;
      });
    },
    onAfterEnter: resetStyles,
    onEnterCancelled: resetStyles,
    onLeave(el) {
      el._initialStyle = {
        transition: "",
        overflow: el.style.overflow,
        [sizeProperty]: el.style[sizeProperty]
      };
      el.style.overflow = "hidden";
      el.style[sizeProperty] = `${el[offsetProperty]}px`;
      void el.offsetHeight;
      requestAnimationFrame(() => el.style[sizeProperty] = "0");
    },
    onAfterLeave,
    onLeaveCancelled: onAfterLeave
  };
  function onAfterLeave(el) {
    if (expandedParentClass && el._parent) {
      el._parent.classList.remove(expandedParentClass);
    }
    resetStyles(el);
  }
  function resetStyles(el) {
    const size = el._initialStyle[sizeProperty];
    el.style.overflow = el._initialStyle.overflow;
    if (size != null) el.style[sizeProperty] = size;
    delete el._initialStyle;
  }
}
const makeVDialogTransitionProps = propsFactory({
  target: [Object, Array]
}, "v-dialog-transition");
const VDialogTransition = genericComponent()({
  name: "VDialogTransition",
  props: makeVDialogTransitionProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const functions = {
      onBeforeEnter(el) {
        el.style.pointerEvents = "none";
        el.style.visibility = "hidden";
      },
      async onEnter(el, done) {
        var _a;
        await new Promise((resolve) => requestAnimationFrame(resolve));
        await new Promise((resolve) => requestAnimationFrame(resolve));
        el.style.visibility = "";
        const {
          x,
          y,
          sx,
          sy,
          speed
        } = getDimensions(props.target, el);
        const animation = animate(el, [{
          transform: `translate(${x}px, ${y}px) scale(${sx}, ${sy})`,
          opacity: 0
        }, {}], {
          duration: 225 * speed,
          easing: deceleratedEasing
        });
        (_a = getChildren(el)) == null ? void 0 : _a.forEach((el2) => {
          animate(el2, [{
            opacity: 0
          }, {
            opacity: 0,
            offset: 0.33
          }, {}], {
            duration: 225 * 2 * speed,
            easing: standardEasing
          });
        });
        animation.finished.then(() => done());
      },
      onAfterEnter(el) {
        el.style.removeProperty("pointer-events");
      },
      onBeforeLeave(el) {
        el.style.pointerEvents = "none";
      },
      async onLeave(el, done) {
        var _a;
        await new Promise((resolve) => requestAnimationFrame(resolve));
        const {
          x,
          y,
          sx,
          sy,
          speed
        } = getDimensions(props.target, el);
        const animation = animate(el, [{}, {
          transform: `translate(${x}px, ${y}px) scale(${sx}, ${sy})`,
          opacity: 0
        }], {
          duration: 125 * speed,
          easing: acceleratedEasing
        });
        animation.finished.then(() => done());
        (_a = getChildren(el)) == null ? void 0 : _a.forEach((el2) => {
          animate(el2, [{}, {
            opacity: 0,
            offset: 0.2
          }, {
            opacity: 0
          }], {
            duration: 125 * 2 * speed,
            easing: standardEasing
          });
        });
      },
      onAfterLeave(el) {
        el.style.removeProperty("pointer-events");
      }
    };
    return () => {
      return props.target ? createVNode(Transition, mergeProps({
        "name": "dialog-transition"
      }, functions, {
        "css": false
      }), slots) : createVNode(Transition, {
        "name": "dialog-transition"
      }, slots);
    };
  }
});
function getChildren(el) {
  var _a;
  const els = (_a = el.querySelector(":scope > .v-card, :scope > .v-sheet, :scope > .v-list")) == null ? void 0 : _a.children;
  return els && [...els];
}
function getDimensions(target, el) {
  const targetBox = getTargetBox(target);
  const elBox = nullifyTransforms(el);
  const [originX, originY] = getComputedStyle(el).transformOrigin.split(" ").map((v) => parseFloat(v));
  const [anchorSide, anchorOffset] = getComputedStyle(el).getPropertyValue("--v-overlay-anchor-origin").split(" ");
  let offsetX = targetBox.left + targetBox.width / 2;
  if (anchorSide === "left" || anchorOffset === "left") {
    offsetX -= targetBox.width / 2;
  } else if (anchorSide === "right" || anchorOffset === "right") {
    offsetX += targetBox.width / 2;
  }
  let offsetY = targetBox.top + targetBox.height / 2;
  if (anchorSide === "top" || anchorOffset === "top") {
    offsetY -= targetBox.height / 2;
  } else if (anchorSide === "bottom" || anchorOffset === "bottom") {
    offsetY += targetBox.height / 2;
  }
  const tsx = targetBox.width / elBox.width;
  const tsy = targetBox.height / elBox.height;
  const maxs = Math.max(1, tsx, tsy);
  const sx = tsx / maxs || 0;
  const sy = tsy / maxs || 0;
  const asa = elBox.width * elBox.height / ((void 0).innerWidth * (void 0).innerHeight);
  const speed = asa > 0.12 ? Math.min(1.5, (asa - 0.12) * 10 + 1) : 1;
  return {
    x: offsetX - (originX + elBox.left),
    y: offsetY - (originY + elBox.top),
    sx,
    sy,
    speed
  };
}
createCssTransition("fab-transition", "center center", "out-in");
createCssTransition("dialog-bottom-transition");
createCssTransition("dialog-top-transition");
const VFadeTransition = createCssTransition("fade-transition");
const VScaleTransition = createCssTransition("scale-transition");
createCssTransition("scroll-x-transition");
createCssTransition("scroll-x-reverse-transition");
createCssTransition("scroll-y-transition");
createCssTransition("scroll-y-reverse-transition");
createCssTransition("slide-x-transition");
createCssTransition("slide-x-reverse-transition");
const VSlideYTransition = createCssTransition("slide-y-transition");
createCssTransition("slide-y-reverse-transition");
const VExpandTransition = createJavascriptTransition("expand-transition", ExpandTransitionGenerator());
const VExpandXTransition = createJavascriptTransition("expand-x-transition", ExpandTransitionGenerator("", true));
const VPickerTitle = createSimpleFunctional("v-picker-title");
const makeVSheetProps = propsFactory({
  color: String,
  ...makeBorderProps(),
  ...makeComponentProps(),
  ...makeDimensionProps(),
  ...makeElevationProps(),
  ...makeLocationProps(),
  ...makePositionProps(),
  ...makeRoundedProps(),
  ...makeTagProps(),
  ...makeThemeProps()
}, "VSheet");
const VSheet = genericComponent()({
  name: "VSheet",
  props: makeVSheetProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      themeClasses
    } = provideTheme(props);
    const {
      backgroundColorClasses,
      backgroundColorStyles
    } = useBackgroundColor(toRef(props, "color"));
    const {
      borderClasses
    } = useBorder(props);
    const {
      dimensionStyles
    } = useDimension(props);
    const {
      elevationClasses
    } = useElevation(props);
    const {
      locationStyles
    } = useLocation(props);
    const {
      positionClasses
    } = usePosition(props);
    const {
      roundedClasses
    } = useRounded(props);
    useRender(() => createVNode(props.tag, {
      "class": ["v-sheet", themeClasses.value, backgroundColorClasses.value, borderClasses.value, elevationClasses.value, positionClasses.value, roundedClasses.value, props.class],
      "style": [backgroundColorStyles.value, dimensionStyles.value, locationStyles.value, props.style]
    }, slots));
    return {};
  }
});
const makeVPickerProps = propsFactory({
  bgColor: String,
  landscape: Boolean,
  title: String,
  hideHeader: Boolean,
  ...makeVSheetProps()
}, "VPicker");
const VPicker = genericComponent()({
  name: "VPicker",
  props: makeVPickerProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      backgroundColorClasses,
      backgroundColorStyles
    } = useBackgroundColor(toRef(props, "color"));
    useRender(() => {
      const sheetProps = VSheet.filterProps(props);
      const hasTitle = !!(props.title || slots.title);
      return createVNode(VSheet, mergeProps(sheetProps, {
        "color": props.bgColor,
        "class": ["v-picker", {
          "v-picker--landscape": props.landscape,
          "v-picker--with-actions": !!slots.actions
        }, props.class],
        "style": props.style
      }), {
        default: () => {
          var _a;
          return [!props.hideHeader && createVNode("div", {
            "key": "header",
            "class": [backgroundColorClasses.value],
            "style": [backgroundColorStyles.value]
          }, [hasTitle && createVNode(VPickerTitle, {
            "key": "picker-title"
          }, {
            default: () => {
              var _a2;
              return [((_a2 = slots.title) == null ? void 0 : _a2.call(slots)) ?? props.title];
            }
          }), slots.header && createVNode("div", {
            "class": "v-picker__header"
          }, [slots.header()])]), createVNode("div", {
            "class": "v-picker__body"
          }, [(_a = slots.default) == null ? void 0 : _a.call(slots)]), slots.actions && createVNode(VDefaultsProvider, {
            "defaults": {
              VBtn: {
                slim: true,
                variant: "text"
              }
            }
          }, {
            default: () => [createVNode("div", {
              "class": "v-picker__actions"
            }, [slots.actions()])]
          })];
        }
      });
    });
    return {};
  }
});
const makeVDatePickerProps = propsFactory({
  // TODO: implement in v3.5
  // calendarIcon: {
  //   type: String,
  //   default: '$calendar',
  // },
  // keyboardIcon: {
  //   type: String,
  //   default: '$edit',
  // },
  // inputMode: {
  //   type: String as PropType<'calendar' | 'keyboard'>,
  //   default: 'calendar',
  // },
  // inputText: {
  //   type: String,
  //   default: '$vuetify.datePicker.input.placeholder',
  // },
  // inputPlaceholder: {
  //   type: String,
  //   default: 'dd/mm/yyyy',
  // },
  header: {
    type: String,
    default: "$vuetify.datePicker.header"
  },
  ...makeVDatePickerControlsProps(),
  ...makeVDatePickerMonthProps({
    weeksInMonth: "static"
  }),
  ...omit(makeVDatePickerMonthsProps(), ["modelValue"]),
  ...omit(makeVDatePickerYearsProps(), ["modelValue"]),
  ...makeVPickerProps({
    title: "$vuetify.datePicker.title"
  }),
  modelValue: null
}, "VDatePicker");
const VDatePicker = genericComponent()({
  name: "VDatePicker",
  props: makeVDatePickerProps(),
  emits: {
    "update:modelValue": (date2) => true,
    "update:month": (date2) => true,
    "update:year": (date2) => true,
    // 'update:inputMode': (date: any) => true,
    "update:viewMode": (date2) => true
  },
  setup(props, _ref) {
    let {
      emit,
      slots
    } = _ref;
    const adapter = useDate();
    const {
      t
    } = useLocale();
    const model = useProxiedModel(props, "modelValue", void 0, (v) => wrapInArray(v), (v) => props.multiple ? v : v[0]);
    const viewMode = useProxiedModel(props, "viewMode");
    const internal = computed(() => {
      var _a;
      const value = adapter.date((_a = model.value) == null ? void 0 : _a[0]);
      return value && adapter.isValid(value) ? value : adapter.date();
    });
    const month = ref(Number(props.month ?? adapter.getMonth(adapter.startOfMonth(internal.value))));
    const year = ref(Number(props.year ?? adapter.getYear(adapter.startOfYear(adapter.setMonth(internal.value, month.value)))));
    const isReversing = shallowRef(false);
    const header = computed(() => {
      if (props.multiple && model.value.length > 1) {
        return t("$vuetify.datePicker.itemsSelected", model.value.length);
      }
      return model.value[0] && adapter.isValid(model.value[0]) ? adapter.format(adapter.date(model.value[0]), "normalDateWithWeekday") : t(props.header);
    });
    const text = computed(() => {
      let date2 = adapter.date();
      date2 = adapter.setDate(date2, 1);
      date2 = adapter.setMonth(date2, month.value);
      date2 = adapter.setYear(date2, year.value);
      return adapter.format(date2, "monthAndYear");
    });
    const headerTransition = computed(() => `date-picker-header${isReversing.value ? "-reverse" : ""}-transition`);
    const minDate = computed(() => {
      const date2 = adapter.date(props.min);
      return props.min && adapter.isValid(date2) ? date2 : null;
    });
    const maxDate = computed(() => {
      const date2 = adapter.date(props.max);
      return props.max && adapter.isValid(date2) ? date2 : null;
    });
    const disabled = computed(() => {
      if (props.disabled) return true;
      const targets = [];
      if (viewMode.value !== "month") {
        targets.push(...["prev", "next"]);
      } else {
        let _date = adapter.date();
        _date = adapter.setYear(_date, year.value);
        _date = adapter.setMonth(_date, month.value);
        if (minDate.value) {
          const date2 = adapter.addDays(adapter.startOfMonth(_date), -1);
          adapter.isAfter(minDate.value, date2) && targets.push("prev");
        }
        if (maxDate.value) {
          const date2 = adapter.addDays(adapter.endOfMonth(_date), 1);
          adapter.isAfter(date2, maxDate.value) && targets.push("next");
        }
      }
      return targets;
    });
    function onClickNext() {
      if (month.value < 11) {
        month.value++;
      } else {
        year.value++;
        month.value = 0;
        onUpdateYear(year.value);
      }
      onUpdateMonth(month.value);
    }
    function onClickPrev() {
      if (month.value > 0) {
        month.value--;
      } else {
        year.value--;
        month.value = 11;
        onUpdateYear(year.value);
      }
      onUpdateMonth(month.value);
    }
    function onClickDate() {
      viewMode.value = "month";
    }
    function onClickMonth() {
      viewMode.value = viewMode.value === "months" ? "month" : "months";
    }
    function onClickYear() {
      viewMode.value = viewMode.value === "year" ? "month" : "year";
    }
    function onUpdateMonth(value) {
      if (viewMode.value === "months") onClickMonth();
      emit("update:month", value);
    }
    function onUpdateYear(value) {
      if (viewMode.value === "year") onClickYear();
      emit("update:year", value);
    }
    watch(model, (val, oldVal) => {
      const arrBefore = wrapInArray(oldVal);
      const arrAfter = wrapInArray(val);
      if (!arrAfter.length) return;
      const before = adapter.date(arrBefore[arrBefore.length - 1]);
      const after = adapter.date(arrAfter[arrAfter.length - 1]);
      const newMonth = adapter.getMonth(after);
      const newYear = adapter.getYear(after);
      if (newMonth !== month.value) {
        month.value = newMonth;
        onUpdateMonth(month.value);
      }
      if (newYear !== year.value) {
        year.value = newYear;
        onUpdateYear(year.value);
      }
      isReversing.value = adapter.isBefore(before, after);
    });
    useRender(() => {
      const pickerProps = VPicker.filterProps(props);
      const datePickerControlsProps = VDatePickerControls.filterProps(props);
      const datePickerHeaderProps = VDatePickerHeader.filterProps(props);
      const datePickerMonthProps = VDatePickerMonth.filterProps(props);
      const datePickerMonthsProps = omit(VDatePickerMonths.filterProps(props), ["modelValue"]);
      const datePickerYearsProps = omit(VDatePickerYears.filterProps(props), ["modelValue"]);
      const headerProps = {
        header: header.value,
        transition: headerTransition.value
      };
      return createVNode(VPicker, mergeProps(pickerProps, {
        "class": ["v-date-picker", `v-date-picker--${viewMode.value}`, {
          "v-date-picker--show-week": props.showWeek
        }, props.class],
        "style": props.style
      }), {
        title: () => {
          var _a;
          return ((_a = slots.title) == null ? void 0 : _a.call(slots)) ?? createVNode("div", {
            "class": "v-date-picker__title"
          }, [t(props.title)]);
        },
        header: () => slots.header ? createVNode(VDefaultsProvider, {
          "defaults": {
            VDatePickerHeader: {
              ...headerProps
            }
          }
        }, {
          default: () => {
            var _a;
            return [(_a = slots.header) == null ? void 0 : _a.call(slots, headerProps)];
          }
        }) : createVNode(VDatePickerHeader, mergeProps({
          "key": "header"
        }, datePickerHeaderProps, headerProps, {
          "onClick": viewMode.value !== "month" ? onClickDate : void 0
        }), {
          ...slots,
          default: void 0
        }),
        default: () => createVNode(Fragment, null, [createVNode(VDatePickerControls, mergeProps(datePickerControlsProps, {
          "disabled": disabled.value,
          "text": text.value,
          "onClick:next": onClickNext,
          "onClick:prev": onClickPrev,
          "onClick:month": onClickMonth,
          "onClick:year": onClickYear
        }), null), createVNode(VFadeTransition, {
          "hideOnLeave": true
        }, {
          default: () => [viewMode.value === "months" ? createVNode(VDatePickerMonths, mergeProps({
            "key": "date-picker-months"
          }, datePickerMonthsProps, {
            "modelValue": month.value,
            "onUpdate:modelValue": [($event) => month.value = $event, onUpdateMonth],
            "min": minDate.value,
            "max": maxDate.value,
            "year": year.value
          }), null) : viewMode.value === "year" ? createVNode(VDatePickerYears, mergeProps({
            "key": "date-picker-years"
          }, datePickerYearsProps, {
            "modelValue": year.value,
            "onUpdate:modelValue": [($event) => year.value = $event, onUpdateYear],
            "min": minDate.value,
            "max": maxDate.value
          }), null) : createVNode(VDatePickerMonth, mergeProps({
            "key": "date-picker-month"
          }, datePickerMonthProps, {
            "modelValue": model.value,
            "onUpdate:modelValue": ($event) => model.value = $event,
            "month": month.value,
            "onUpdate:month": [($event) => month.value = $event, onUpdateMonth],
            "year": year.value,
            "onUpdate:year": [($event) => year.value = $event, onUpdateYear],
            "min": minDate.value,
            "max": maxDate.value
          }), null)]
        })]),
        actions: slots.actions
      });
    });
    return {};
  }
});
function elementToViewport(point, offset) {
  return {
    x: point.x + offset.x,
    y: point.y + offset.y
  };
}
function getOffset(a, b) {
  return {
    x: a.x - b.x,
    y: a.y - b.y
  };
}
function anchorToPoint(anchor, box) {
  if (anchor.side === "top" || anchor.side === "bottom") {
    const {
      side,
      align
    } = anchor;
    const x = align === "left" ? 0 : align === "center" ? box.width / 2 : align === "right" ? box.width : align;
    const y = side === "top" ? 0 : side === "bottom" ? box.height : side;
    return elementToViewport({
      x,
      y
    }, box);
  } else if (anchor.side === "left" || anchor.side === "right") {
    const {
      side,
      align
    } = anchor;
    const x = side === "left" ? 0 : side === "right" ? box.width : side;
    const y = align === "top" ? 0 : align === "center" ? box.height / 2 : align === "bottom" ? box.height : align;
    return elementToViewport({
      x,
      y
    }, box);
  }
  return elementToViewport({
    x: box.width / 2,
    y: box.height / 2
  }, box);
}
const locationStrategies = {
  static: staticLocationStrategy,
  // specific viewport position, usually centered
  connected: connectedLocationStrategy
  // connected to a certain element
};
const makeLocationStrategyProps = propsFactory({
  locationStrategy: {
    type: [String, Function],
    default: "static",
    validator: (val) => typeof val === "function" || val in locationStrategies
  },
  location: {
    type: String,
    default: "bottom"
  },
  origin: {
    type: String,
    default: "auto"
  },
  offset: [Number, String, Array]
}, "VOverlay-location-strategies");
function useLocationStrategies(props, data) {
  const contentStyles = ref({});
  const updateLocation = ref();
  return {
    contentStyles,
    updateLocation
  };
}
function staticLocationStrategy() {
}
function getIntrinsicSize(el, isRtl) {
  if (isRtl) {
    el.style.removeProperty("left");
  } else {
    el.style.removeProperty("right");
  }
  const contentBox = nullifyTransforms(el);
  if (isRtl) {
    contentBox.x += parseFloat(el.style.right || 0);
  } else {
    contentBox.x -= parseFloat(el.style.left || 0);
  }
  contentBox.y -= parseFloat(el.style.top || 0);
  return contentBox;
}
function connectedLocationStrategy(data, props, contentStyles) {
  const activatorFixed = Array.isArray(data.target.value) || isFixedPosition(data.target.value);
  if (activatorFixed) {
    Object.assign(contentStyles.value, {
      position: "fixed",
      top: 0,
      [data.isRtl.value ? "right" : "left"]: 0
    });
  }
  const {
    preferredAnchor,
    preferredOrigin
  } = destructComputed(() => {
    const parsedAnchor = parseAnchor(props.location, data.isRtl.value);
    const parsedOrigin = props.origin === "overlap" ? parsedAnchor : props.origin === "auto" ? flipSide(parsedAnchor) : parseAnchor(props.origin, data.isRtl.value);
    if (parsedAnchor.side === parsedOrigin.side && parsedAnchor.align === flipAlign(parsedOrigin).align) {
      return {
        preferredAnchor: flipCorner(parsedAnchor),
        preferredOrigin: flipCorner(parsedOrigin)
      };
    } else {
      return {
        preferredAnchor: parsedAnchor,
        preferredOrigin: parsedOrigin
      };
    }
  });
  const [minWidth, minHeight, maxWidth, maxHeight] = ["minWidth", "minHeight", "maxWidth", "maxHeight"].map((key) => {
    return computed(() => {
      const val = parseFloat(props[key]);
      return isNaN(val) ? Infinity : val;
    });
  });
  const offset = computed(() => {
    if (Array.isArray(props.offset)) {
      return props.offset;
    }
    if (typeof props.offset === "string") {
      const offset2 = props.offset.split(" ").map(parseFloat);
      if (offset2.length < 2) offset2.push(0);
      return offset2;
    }
    return typeof props.offset === "number" ? [props.offset, 0] : [0, 0];
  });
  let observe = false;
  const observer = new ResizeObserver(() => {
    if (observe) updateLocation();
  });
  watch([data.target, data.contentEl], (_ref, _ref2) => {
    let [newTarget, newContentEl] = _ref;
    let [oldTarget, oldContentEl] = _ref2;
    if (oldTarget && !Array.isArray(oldTarget)) observer.unobserve(oldTarget);
    if (newTarget && !Array.isArray(newTarget)) observer.observe(newTarget);
    if (oldContentEl) observer.unobserve(oldContentEl);
    if (newContentEl) observer.observe(newContentEl);
  }, {
    immediate: true
  });
  onScopeDispose(() => {
    observer.disconnect();
  });
  function updateLocation() {
    observe = false;
    requestAnimationFrame(() => observe = true);
    if (!data.target.value || !data.contentEl.value) return;
    const targetBox = getTargetBox(data.target.value);
    const contentBox = getIntrinsicSize(data.contentEl.value, data.isRtl.value);
    const scrollParents = getScrollParents(data.contentEl.value);
    const viewportMargin = 12;
    if (!scrollParents.length) {
      scrollParents.push((void 0).documentElement);
      if (!(data.contentEl.value.style.top && data.contentEl.value.style.left)) {
        contentBox.x -= parseFloat((void 0).documentElement.style.getPropertyValue("--v-body-scroll-x") || 0);
        contentBox.y -= parseFloat((void 0).documentElement.style.getPropertyValue("--v-body-scroll-y") || 0);
      }
    }
    const viewport = scrollParents.reduce((box, el) => {
      const rect = el.getBoundingClientRect();
      const scrollBox = new Box({
        x: el === (void 0).documentElement ? 0 : rect.x,
        y: el === (void 0).documentElement ? 0 : rect.y,
        width: el.clientWidth,
        height: el.clientHeight
      });
      if (box) {
        return new Box({
          x: Math.max(box.left, scrollBox.left),
          y: Math.max(box.top, scrollBox.top),
          width: Math.min(box.right, scrollBox.right) - Math.max(box.left, scrollBox.left),
          height: Math.min(box.bottom, scrollBox.bottom) - Math.max(box.top, scrollBox.top)
        });
      }
      return scrollBox;
    }, void 0);
    viewport.x += viewportMargin;
    viewport.y += viewportMargin;
    viewport.width -= viewportMargin * 2;
    viewport.height -= viewportMargin * 2;
    let placement = {
      anchor: preferredAnchor.value,
      origin: preferredOrigin.value
    };
    function checkOverflow(_placement) {
      const box = new Box(contentBox);
      const targetPoint = anchorToPoint(_placement.anchor, targetBox);
      const contentPoint = anchorToPoint(_placement.origin, box);
      let {
        x: x2,
        y: y2
      } = getOffset(targetPoint, contentPoint);
      switch (_placement.anchor.side) {
        case "top":
          y2 -= offset.value[0];
          break;
        case "bottom":
          y2 += offset.value[0];
          break;
        case "left":
          x2 -= offset.value[0];
          break;
        case "right":
          x2 += offset.value[0];
          break;
      }
      switch (_placement.anchor.align) {
        case "top":
          y2 -= offset.value[1];
          break;
        case "bottom":
          y2 += offset.value[1];
          break;
        case "left":
          x2 -= offset.value[1];
          break;
        case "right":
          x2 += offset.value[1];
          break;
      }
      box.x += x2;
      box.y += y2;
      box.width = Math.min(box.width, maxWidth.value);
      box.height = Math.min(box.height, maxHeight.value);
      const overflows = getOverflow(box, viewport);
      return {
        overflows,
        x: x2,
        y: y2
      };
    }
    let x = 0;
    let y = 0;
    const available = {
      x: 0,
      y: 0
    };
    const flipped = {
      x: false,
      y: false
    };
    let resets = -1;
    while (true) {
      if (resets++ > 10) {
        consoleError("Infinite loop detected in connectedLocationStrategy");
        break;
      }
      const {
        x: _x,
        y: _y,
        overflows
      } = checkOverflow(placement);
      x += _x;
      y += _y;
      contentBox.x += _x;
      contentBox.y += _y;
      {
        const axis2 = getAxis(placement.anchor);
        const hasOverflowX = overflows.x.before || overflows.x.after;
        const hasOverflowY = overflows.y.before || overflows.y.after;
        let reset = false;
        ["x", "y"].forEach((key) => {
          if (key === "x" && hasOverflowX && !flipped.x || key === "y" && hasOverflowY && !flipped.y) {
            const newPlacement = {
              anchor: {
                ...placement.anchor
              },
              origin: {
                ...placement.origin
              }
            };
            const flip = key === "x" ? axis2 === "y" ? flipAlign : flipSide : axis2 === "y" ? flipSide : flipAlign;
            newPlacement.anchor = flip(newPlacement.anchor);
            newPlacement.origin = flip(newPlacement.origin);
            const {
              overflows: newOverflows
            } = checkOverflow(newPlacement);
            if (newOverflows[key].before <= overflows[key].before && newOverflows[key].after <= overflows[key].after || newOverflows[key].before + newOverflows[key].after < (overflows[key].before + overflows[key].after) / 2) {
              placement = newPlacement;
              reset = flipped[key] = true;
            }
          }
        });
        if (reset) continue;
      }
      if (overflows.x.before) {
        x += overflows.x.before;
        contentBox.x += overflows.x.before;
      }
      if (overflows.x.after) {
        x -= overflows.x.after;
        contentBox.x -= overflows.x.after;
      }
      if (overflows.y.before) {
        y += overflows.y.before;
        contentBox.y += overflows.y.before;
      }
      if (overflows.y.after) {
        y -= overflows.y.after;
        contentBox.y -= overflows.y.after;
      }
      {
        const overflows2 = getOverflow(contentBox, viewport);
        available.x = viewport.width - overflows2.x.before - overflows2.x.after;
        available.y = viewport.height - overflows2.y.before - overflows2.y.after;
        x += overflows2.x.before;
        contentBox.x += overflows2.x.before;
        y += overflows2.y.before;
        contentBox.y += overflows2.y.before;
      }
      break;
    }
    const axis = getAxis(placement.anchor);
    Object.assign(contentStyles.value, {
      "--v-overlay-anchor-origin": `${placement.anchor.side} ${placement.anchor.align}`,
      transformOrigin: `${placement.origin.side} ${placement.origin.align}`,
      // transform: `translate(${pixelRound(x)}px, ${pixelRound(y)}px)`,
      top: convertToUnit(pixelRound(y)),
      left: data.isRtl.value ? void 0 : convertToUnit(pixelRound(x)),
      right: data.isRtl.value ? convertToUnit(pixelRound(-x)) : void 0,
      minWidth: convertToUnit(axis === "y" ? Math.min(minWidth.value, targetBox.width) : minWidth.value),
      maxWidth: convertToUnit(pixelCeil(clamp(available.x, minWidth.value === Infinity ? 0 : minWidth.value, maxWidth.value))),
      maxHeight: convertToUnit(pixelCeil(clamp(available.y, minHeight.value === Infinity ? 0 : minHeight.value, maxHeight.value)))
    });
    return {
      available,
      contentBox
    };
  }
  watch(() => [preferredAnchor.value, preferredOrigin.value, props.offset, props.minWidth, props.minHeight, props.maxWidth, props.maxHeight], () => updateLocation());
  nextTick(() => {
    const result = updateLocation();
    if (!result) return;
    const {
      available,
      contentBox
    } = result;
    if (contentBox.height > available.y) {
      requestAnimationFrame(() => {
        updateLocation();
        requestAnimationFrame(() => {
          updateLocation();
        });
      });
    }
  });
  return {
    updateLocation
  };
}
function pixelRound(val) {
  return Math.round(val * devicePixelRatio) / devicePixelRatio;
}
function pixelCeil(val) {
  return Math.ceil(val * devicePixelRatio) / devicePixelRatio;
}
let clean = true;
const frames = [];
function requestNewFrame(cb) {
  if (!clean || frames.length) {
    frames.push(cb);
    run();
  } else {
    clean = false;
    cb();
    run();
  }
}
let raf = -1;
function run() {
  cancelAnimationFrame(raf);
  raf = requestAnimationFrame(() => {
    const frame = frames.shift();
    if (frame) frame();
    if (frames.length) run();
    else clean = true;
  });
}
const scrollStrategies = {
  none: null,
  close: closeScrollStrategy,
  block: blockScrollStrategy,
  reposition: repositionScrollStrategy
};
const makeScrollStrategyProps = propsFactory({
  scrollStrategy: {
    type: [String, Function],
    default: "block",
    validator: (val) => typeof val === "function" || val in scrollStrategies
  }
}, "VOverlay-scroll-strategies");
function closeScrollStrategy(data) {
  function onScroll(e) {
    data.isActive.value = false;
  }
  bindScroll(data.targetEl.value ?? data.contentEl.value, onScroll);
}
function blockScrollStrategy(data, props) {
  var _a;
  const offsetParent = (_a = data.root.value) == null ? void 0 : _a.offsetParent;
  const scrollElements = [.../* @__PURE__ */ new Set([...getScrollParents(data.targetEl.value, props.contained ? offsetParent : void 0), ...getScrollParents(data.contentEl.value, props.contained ? offsetParent : void 0)])].filter((el) => !el.classList.contains("v-overlay-scroll-blocked"));
  const scrollbarWidth = (void 0).innerWidth - (void 0).documentElement.offsetWidth;
  const scrollableParent = ((el) => hasScrollbar(el) && el)(offsetParent || (void 0).documentElement);
  if (scrollableParent) {
    data.root.value.classList.add("v-overlay--scroll-blocked");
  }
  scrollElements.forEach((el, i) => {
    el.style.setProperty("--v-body-scroll-x", convertToUnit(-el.scrollLeft));
    el.style.setProperty("--v-body-scroll-y", convertToUnit(-el.scrollTop));
    if (el !== (void 0).documentElement) {
      el.style.setProperty("--v-scrollbar-offset", convertToUnit(scrollbarWidth));
    }
    el.classList.add("v-overlay-scroll-blocked");
  });
  onScopeDispose(() => {
    scrollElements.forEach((el, i) => {
      const x = parseFloat(el.style.getPropertyValue("--v-body-scroll-x"));
      const y = parseFloat(el.style.getPropertyValue("--v-body-scroll-y"));
      const scrollBehavior = el.style.scrollBehavior;
      el.style.scrollBehavior = "auto";
      el.style.removeProperty("--v-body-scroll-x");
      el.style.removeProperty("--v-body-scroll-y");
      el.style.removeProperty("--v-scrollbar-offset");
      el.classList.remove("v-overlay-scroll-blocked");
      el.scrollLeft = -x;
      el.scrollTop = -y;
      el.style.scrollBehavior = scrollBehavior;
    });
    if (scrollableParent) {
      data.root.value.classList.remove("v-overlay--scroll-blocked");
    }
  });
}
function repositionScrollStrategy(data, props, scope) {
  let slow = false;
  let raf2 = -1;
  let ric = -1;
  function update(e) {
    requestNewFrame(() => {
      var _a, _b;
      const start = performance.now();
      (_b = (_a = data.updateLocation).value) == null ? void 0 : _b.call(_a, e);
      const time = performance.now() - start;
      slow = time / (1e3 / 60) > 2;
    });
  }
  ric = (typeof requestIdleCallback === "undefined" ? (cb) => cb() : requestIdleCallback)(() => {
    scope.run(() => {
      bindScroll(data.targetEl.value ?? data.contentEl.value, (e) => {
        if (slow) {
          cancelAnimationFrame(raf2);
          raf2 = requestAnimationFrame(() => {
            raf2 = requestAnimationFrame(() => {
              update(e);
            });
          });
        } else {
          update(e);
        }
      });
    });
  });
  onScopeDispose(() => {
    typeof cancelIdleCallback !== "undefined" && cancelIdleCallback(ric);
    cancelAnimationFrame(raf2);
  });
}
function bindScroll(el, onScroll) {
  const scrollElements = [void 0, ...getScrollParents(el)];
  scrollElements.forEach((el2) => {
    el2.addEventListener("scroll", onScroll, {
      passive: true
    });
  });
  onScopeDispose(() => {
    scrollElements.forEach((el2) => {
      el2.removeEventListener("scroll", onScroll);
    });
  });
}
const VMenuSymbol = Symbol.for("vuetify:v-menu");
const makeDelayProps = propsFactory({
  closeDelay: [Number, String],
  openDelay: [Number, String]
}, "delay");
function useDelay(props, cb) {
  let clearDelay = () => {
  };
  function runDelay(isOpening) {
    clearDelay == null ? void 0 : clearDelay();
    const delay = Number(isOpening ? props.openDelay : props.closeDelay);
    return new Promise((resolve) => {
      clearDelay = defer(delay, () => {
        cb == null ? void 0 : cb(isOpening);
        resolve(isOpening);
      });
    });
  }
  function runOpenDelay() {
    return runDelay(true);
  }
  function runCloseDelay() {
    return runDelay(false);
  }
  return {
    clearDelay,
    runOpenDelay,
    runCloseDelay
  };
}
const makeActivatorProps = propsFactory({
  target: [String, Object],
  activator: [String, Object],
  activatorProps: {
    type: Object,
    default: () => ({})
  },
  openOnClick: {
    type: Boolean,
    default: void 0
  },
  openOnHover: Boolean,
  openOnFocus: {
    type: Boolean,
    default: void 0
  },
  closeOnContentClick: Boolean,
  ...makeDelayProps()
}, "VOverlay-activator");
function useActivator(props, _ref) {
  let {
    isActive,
    isTop
  } = _ref;
  const vm = getCurrentInstance("useActivator");
  const activatorEl = ref();
  let isHovered = false;
  let isFocused = false;
  let firstEnter = true;
  const openOnFocus = computed(() => props.openOnFocus || props.openOnFocus == null && props.openOnHover);
  const openOnClick = computed(() => props.openOnClick || props.openOnClick == null && !props.openOnHover && !openOnFocus.value);
  const {
    runOpenDelay,
    runCloseDelay
  } = useDelay(props, (value) => {
    if (value === (props.openOnHover && isHovered || openOnFocus.value && isFocused) && !(props.openOnHover && isActive.value && !isTop.value)) {
      if (isActive.value !== value) {
        firstEnter = true;
      }
      isActive.value = value;
    }
  });
  const cursorTarget = ref();
  const availableEvents = {
    onClick: (e) => {
      e.stopPropagation();
      activatorEl.value = e.currentTarget || e.target;
      if (!isActive.value) {
        cursorTarget.value = [e.clientX, e.clientY];
      }
      isActive.value = !isActive.value;
    },
    onMouseenter: (e) => {
      var _a;
      if ((_a = e.sourceCapabilities) == null ? void 0 : _a.firesTouchEvents) return;
      isHovered = true;
      activatorEl.value = e.currentTarget || e.target;
      runOpenDelay();
    },
    onMouseleave: (e) => {
      isHovered = false;
      runCloseDelay();
    },
    onFocus: (e) => {
      if (matchesSelector(e.target) === false) ;
      isFocused = true;
      e.stopPropagation();
      activatorEl.value = e.currentTarget || e.target;
      runOpenDelay();
    },
    onBlur: (e) => {
      isFocused = false;
      e.stopPropagation();
      runCloseDelay();
    }
  };
  const activatorEvents = computed(() => {
    const events = {};
    if (openOnClick.value) {
      events.onClick = availableEvents.onClick;
    }
    if (props.openOnHover) {
      events.onMouseenter = availableEvents.onMouseenter;
      events.onMouseleave = availableEvents.onMouseleave;
    }
    if (openOnFocus.value) {
      events.onFocus = availableEvents.onFocus;
      events.onBlur = availableEvents.onBlur;
    }
    return events;
  });
  const contentEvents = computed(() => {
    const events = {};
    if (props.openOnHover) {
      events.onMouseenter = () => {
        isHovered = true;
        runOpenDelay();
      };
      events.onMouseleave = () => {
        isHovered = false;
        runCloseDelay();
      };
    }
    if (openOnFocus.value) {
      events.onFocusin = () => {
        isFocused = true;
        runOpenDelay();
      };
      events.onFocusout = () => {
        isFocused = false;
        runCloseDelay();
      };
    }
    if (props.closeOnContentClick) {
      const menu = inject$1(VMenuSymbol, null);
      events.onClick = () => {
        isActive.value = false;
        menu == null ? void 0 : menu.closeParents();
      };
    }
    return events;
  });
  const scrimEvents = computed(() => {
    const events = {};
    if (props.openOnHover) {
      events.onMouseenter = () => {
        if (firstEnter) {
          isHovered = true;
          firstEnter = false;
          runOpenDelay();
        }
      };
      events.onMouseleave = () => {
        isHovered = false;
        runCloseDelay();
      };
    }
    return events;
  });
  watch(isTop, (val) => {
    if (val && (props.openOnHover && !isHovered && (!openOnFocus.value || !isFocused) || openOnFocus.value && !isFocused && (!props.openOnHover || !isHovered))) {
      isActive.value = false;
    }
  });
  watch(isActive, (val) => {
    if (!val) {
      setTimeout(() => {
        cursorTarget.value = void 0;
      });
    }
  }, {
    flush: "post"
  });
  const activatorRef = templateRef();
  watchEffect(() => {
    if (!activatorRef.value) return;
    nextTick(() => {
      activatorEl.value = activatorRef.el;
    });
  });
  const targetRef = templateRef();
  const target = computed(() => {
    if (props.target === "cursor" && cursorTarget.value) return cursorTarget.value;
    if (targetRef.value) return targetRef.el;
    return getTarget(props.target, vm) || activatorEl.value;
  });
  const targetEl = computed(() => {
    return Array.isArray(target.value) ? void 0 : target.value;
  });
  let scope;
  watch(() => !!props.activator, (val) => {
    if (val && IN_BROWSER) {
      scope = effectScope();
      scope.run(() => {
        _useActivator(props, vm, {
          activatorEl,
          activatorEvents
        });
      });
    } else if (scope) {
      scope.stop();
    }
  }, {
    flush: "post",
    immediate: true
  });
  onScopeDispose(() => {
    scope == null ? void 0 : scope.stop();
  });
  return {
    activatorEl,
    activatorRef,
    target,
    targetEl,
    targetRef,
    activatorEvents,
    contentEvents,
    scrimEvents
  };
}
function _useActivator(props, vm, _ref2) {
  let {
    activatorEl,
    activatorEvents
  } = _ref2;
  watch(() => props.activator, (val, oldVal) => {
    if (oldVal && val !== oldVal) {
      const activator = getActivator(oldVal);
      activator && unbindActivatorProps(activator);
    }
    if (val) {
      nextTick(() => bindActivatorProps());
    }
  }, {
    immediate: true
  });
  watch(() => props.activatorProps, () => {
    bindActivatorProps();
  });
  onScopeDispose(() => {
    unbindActivatorProps();
  });
  function bindActivatorProps() {
    let el = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : getActivator();
    let _props = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : props.activatorProps;
    if (!el) return;
    bindProps(el, mergeProps(activatorEvents.value, _props));
  }
  function unbindActivatorProps() {
    let el = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : getActivator();
    let _props = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : props.activatorProps;
    if (!el) return;
    unbindProps(el, mergeProps(activatorEvents.value, _props));
  }
  function getActivator() {
    let selector = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : props.activator;
    const activator = getTarget(selector, vm);
    activatorEl.value = (activator == null ? void 0 : activator.nodeType) === Node.ELEMENT_NODE ? activator : void 0;
    return activatorEl.value;
  }
}
function getTarget(selector, vm) {
  var _a, _b;
  if (!selector) return;
  let target;
  if (selector === "parent") {
    let el = (_b = (_a = vm == null ? void 0 : vm.proxy) == null ? void 0 : _a.$el) == null ? void 0 : _b.parentNode;
    while (el == null ? void 0 : el.hasAttribute("data-no-activator")) {
      el = el.parentNode;
    }
    target = el;
  } else if (typeof selector === "string") {
    target = (void 0).querySelector(selector);
  } else if ("$el" in selector) {
    target = selector.$el;
  } else {
    target = selector;
  }
  return target;
}
function useHydration() {
  return shallowRef(false);
}
const makeLazyProps = propsFactory({
  eager: Boolean
}, "lazy");
function useLazy(props, active) {
  const isBooted = shallowRef(false);
  const hasContent = computed(() => isBooted.value || props.eager || active.value);
  watch(active, () => isBooted.value = true);
  function onAfterLeave() {
    if (!props.eager) isBooted.value = false;
  }
  return {
    isBooted,
    hasContent,
    onAfterLeave
  };
}
function useScopeId() {
  const vm = getCurrentInstance("useScopeId");
  const scopeId = vm.vnode.scopeId;
  return {
    scopeId: scopeId ? {
      [scopeId]: ""
    } : void 0
  };
}
const StackSymbol = Symbol.for("vuetify:stack");
const globalStack = reactive([]);
function useStack(isActive, zIndex, disableGlobalStack) {
  const vm = getCurrentInstance("useStack");
  const createStackEntry = !disableGlobalStack;
  const parent = inject$1(StackSymbol, void 0);
  const stack = reactive({
    activeChildren: /* @__PURE__ */ new Set()
  });
  provide(StackSymbol, stack);
  const _zIndex = shallowRef(+zIndex.value);
  useToggleScope(isActive, () => {
    var _a;
    const lastZIndex = (_a = globalStack.at(-1)) == null ? void 0 : _a[1];
    _zIndex.value = lastZIndex ? lastZIndex + 10 : +zIndex.value;
    if (createStackEntry) {
      globalStack.push([vm.uid, _zIndex.value]);
    }
    parent == null ? void 0 : parent.activeChildren.add(vm.uid);
    onScopeDispose(() => {
      if (createStackEntry) {
        const idx = toRaw(globalStack).findIndex((v) => v[0] === vm.uid);
        globalStack.splice(idx, 1);
      }
      parent == null ? void 0 : parent.activeChildren.delete(vm.uid);
    });
  });
  const globalTop = shallowRef(true);
  if (createStackEntry) {
    watchEffect(() => {
      var _a;
      const _isTop = ((_a = globalStack.at(-1)) == null ? void 0 : _a[0]) === vm.uid;
      setTimeout(() => globalTop.value = _isTop);
    });
  }
  const localTop = computed(() => !stack.activeChildren.size);
  return {
    globalTop: readonly(globalTop),
    localTop,
    stackStyles: computed(() => ({
      zIndex: _zIndex.value
    }))
  };
}
function useTeleport(target) {
  const teleportTarget = computed(() => {
    const _target = target.value;
    if (_target === true || !IN_BROWSER) return void 0;
    const targetElement = _target === false ? (void 0).body : typeof _target === "string" ? (void 0).querySelector(_target) : _target;
    if (targetElement == null) {
      warn(`Unable to locate target ${_target}`);
      return void 0;
    }
    let container = targetElement.querySelector(":scope > .v-overlay-container");
    if (!container) {
      container = (void 0).createElement("div");
      container.className = "v-overlay-container";
      targetElement.appendChild(container);
    }
    return container;
  });
  return {
    teleportTarget
  };
}
function defaultConditional() {
  return true;
}
function checkEvent(e, el, binding) {
  if (!e || checkIsActive(e, binding) === false) return false;
  const root = attachedRoot(el);
  if (typeof ShadowRoot !== "undefined" && root instanceof ShadowRoot && root.host === e.target) return false;
  const elements = (typeof binding.value === "object" && binding.value.include || (() => []))();
  elements.push(el);
  return !elements.some((el2) => el2 == null ? void 0 : el2.contains(e.target));
}
function checkIsActive(e, binding) {
  const isActive = typeof binding.value === "object" && binding.value.closeConditional || defaultConditional;
  return isActive(e);
}
function directive(e, el, binding) {
  const handler = typeof binding.value === "function" ? binding.value : binding.value.handler;
  el._clickOutside.lastMousedownWasOutside && checkEvent(e, el, binding) && setTimeout(() => {
    checkIsActive(e, binding) && handler && handler(e);
  }, 0);
}
function handleShadow(el, callback) {
  const root = attachedRoot(el);
  callback(void 0);
  if (typeof ShadowRoot !== "undefined" && root instanceof ShadowRoot) {
    callback(root);
  }
}
const ClickOutside = {
  // [data-app] may not be found
  // if using bind, inserted makes
  // sure that the root element is
  // available, iOS does not support
  // clicks on body
  mounted(el, binding) {
    const onClick = (e) => directive(e, el, binding);
    const onMousedown = (e) => {
      el._clickOutside.lastMousedownWasOutside = checkEvent(e, el, binding);
    };
    handleShadow(el, (app) => {
      app.addEventListener("click", onClick, true);
      app.addEventListener("mousedown", onMousedown, true);
    });
    if (!el._clickOutside) {
      el._clickOutside = {
        lastMousedownWasOutside: false
      };
    }
    el._clickOutside[binding.instance.$.uid] = {
      onClick,
      onMousedown
    };
  },
  unmounted(el, binding) {
    if (!el._clickOutside) return;
    handleShadow(el, (app) => {
      var _a;
      if (!app || !((_a = el._clickOutside) == null ? void 0 : _a[binding.instance.$.uid])) return;
      const {
        onClick,
        onMousedown
      } = el._clickOutside[binding.instance.$.uid];
      app.removeEventListener("click", onClick, true);
      app.removeEventListener("mousedown", onMousedown, true);
    });
    delete el._clickOutside[binding.instance.$.uid];
  }
};
function Scrim(props) {
  const {
    modelValue,
    color,
    ...rest
  } = props;
  return createVNode(Transition, {
    "name": "fade-transition",
    "appear": true
  }, {
    default: () => [props.modelValue && createVNode("div", mergeProps({
      "class": ["v-overlay__scrim", props.color.backgroundColorClasses.value],
      "style": props.color.backgroundColorStyles.value
    }, rest), null)]
  });
}
const makeVOverlayProps = propsFactory({
  absolute: Boolean,
  attach: [Boolean, String, Object],
  closeOnBack: {
    type: Boolean,
    default: true
  },
  contained: Boolean,
  contentClass: null,
  contentProps: null,
  disabled: Boolean,
  opacity: [Number, String],
  noClickAnimation: Boolean,
  modelValue: Boolean,
  persistent: Boolean,
  scrim: {
    type: [Boolean, String],
    default: true
  },
  zIndex: {
    type: [Number, String],
    default: 2e3
  },
  ...makeActivatorProps(),
  ...makeComponentProps(),
  ...makeDimensionProps(),
  ...makeLazyProps(),
  ...makeLocationStrategyProps(),
  ...makeScrollStrategyProps(),
  ...makeThemeProps(),
  ...makeTransitionProps$1()
}, "VOverlay");
const VOverlay = genericComponent()({
  name: "VOverlay",
  directives: {
    ClickOutside
  },
  inheritAttrs: false,
  props: {
    _disableGlobalStack: Boolean,
    ...makeVOverlayProps()
  },
  emits: {
    "click:outside": (e) => true,
    "update:modelValue": (value) => true,
    afterEnter: () => true,
    afterLeave: () => true
  },
  setup(props, _ref) {
    let {
      slots,
      attrs,
      emit
    } = _ref;
    const model = useProxiedModel(props, "modelValue");
    const isActive = computed({
      get: () => model.value,
      set: (v) => {
        if (!(v && props.disabled)) model.value = v;
      }
    });
    const {
      themeClasses
    } = provideTheme(props);
    const {
      rtlClasses,
      isRtl
    } = useRtl();
    const {
      hasContent,
      onAfterLeave: _onAfterLeave
    } = useLazy(props, isActive);
    const scrimColor = useBackgroundColor(computed(() => {
      return typeof props.scrim === "string" ? props.scrim : null;
    }));
    const {
      globalTop,
      localTop,
      stackStyles
    } = useStack(isActive, toRef(props, "zIndex"), props._disableGlobalStack);
    const {
      activatorEl,
      activatorRef,
      target,
      targetEl,
      targetRef,
      activatorEvents,
      contentEvents,
      scrimEvents
    } = useActivator(props, {
      isActive,
      isTop: localTop
    });
    const potentialShadowDomRoot = computed(() => {
      var _a;
      return (_a = activatorEl == null ? void 0 : activatorEl.value) == null ? void 0 : _a.getRootNode();
    });
    const {
      teleportTarget
    } = useTeleport(computed(() => props.attach || props.contained || potentialShadowDomRoot.value instanceof ShadowRoot ? potentialShadowDomRoot.value ?? true : false));
    const {
      dimensionStyles
    } = useDimension(props);
    const isMounted = useHydration();
    const {
      scopeId
    } = useScopeId();
    watch(() => props.disabled, (v) => {
      if (v) isActive.value = false;
    });
    const root = ref();
    const scrimEl = ref();
    const contentEl = ref();
    const {
      contentStyles,
      updateLocation
    } = useLocationStrategies();
    function onClickOutside(e) {
      emit("click:outside", e);
      if (!props.persistent) isActive.value = false;
      else animateClick();
    }
    function closeConditional(e) {
      return isActive.value && globalTop.value && // If using scrim, only close if clicking on it rather than anything opened on top
      (!props.scrim || e.target === scrimEl.value);
    }
    useRouter();
    useToggleScope(() => props.closeOnBack, () => {
    });
    const top = ref();
    watch(() => isActive.value && (props.absolute || props.contained) && teleportTarget.value == null, (val) => {
      if (val) {
        const scrollParent = getScrollParent(root.value);
        if (scrollParent && scrollParent !== (void 0).scrollingElement) {
          top.value = scrollParent.scrollTop;
        }
      }
    });
    function animateClick() {
      if (props.noClickAnimation) return;
      contentEl.value && animate(contentEl.value, [{
        transformOrigin: "center"
      }, {
        transform: "scale(1.03)"
      }, {
        transformOrigin: "center"
      }], {
        duration: 150,
        easing: standardEasing
      });
    }
    function onAfterEnter() {
      emit("afterEnter");
    }
    function onAfterLeave() {
      _onAfterLeave();
      emit("afterLeave");
    }
    useRender(() => {
      var _a;
      return createVNode(Fragment, null, [(_a = slots.activator) == null ? void 0 : _a.call(slots, {
        isActive: isActive.value,
        targetRef,
        props: mergeProps({
          ref: activatorRef
        }, activatorEvents.value, props.activatorProps)
      }), isMounted.value && hasContent.value && createVNode(Teleport, {
        "disabled": !teleportTarget.value,
        "to": teleportTarget.value
      }, {
        default: () => [createVNode("div", mergeProps({
          "class": ["v-overlay", {
            "v-overlay--absolute": props.absolute || props.contained,
            "v-overlay--active": isActive.value,
            "v-overlay--contained": props.contained
          }, themeClasses.value, rtlClasses.value, props.class],
          "style": [stackStyles.value, {
            "--v-overlay-opacity": props.opacity,
            top: convertToUnit(top.value)
          }, props.style],
          "ref": root
        }, scopeId, attrs), [createVNode(Scrim, mergeProps({
          "color": scrimColor,
          "modelValue": isActive.value && !!props.scrim,
          "ref": scrimEl
        }, scrimEvents.value), null), createVNode(MaybeTransition, {
          "appear": true,
          "persisted": true,
          "transition": props.transition,
          "target": target.value,
          "onAfterEnter": onAfterEnter,
          "onAfterLeave": onAfterLeave
        }, {
          default: () => {
            var _a2;
            return [withDirectives(createVNode("div", mergeProps({
              "ref": contentEl,
              "class": ["v-overlay__content", props.contentClass],
              "style": [dimensionStyles.value, contentStyles.value]
            }, contentEvents.value, props.contentProps), [(_a2 = slots.default) == null ? void 0 : _a2.call(slots, {
              isActive
            })]), [[vShow, isActive.value], [resolveDirective("click-outside"), {
              handler: onClickOutside,
              closeConditional,
              include: () => [activatorEl.value]
            }]])];
          }
        })])]
      })]);
    });
    return {
      activatorEl,
      scrimEl,
      target,
      animateClick,
      contentEl,
      globalTop,
      localTop,
      updateLocation
    };
  }
});
const Refs = Symbol("Forwarded refs");
function getDescriptor(obj, key) {
  let currentObj = obj;
  while (currentObj) {
    const descriptor = Reflect.getOwnPropertyDescriptor(currentObj, key);
    if (descriptor) return descriptor;
    currentObj = Object.getPrototypeOf(currentObj);
  }
  return void 0;
}
function forwardRefs(target) {
  for (var _len = arguments.length, refs = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    refs[_key - 1] = arguments[_key];
  }
  target[Refs] = refs;
  return new Proxy(target, {
    get(target2, key) {
      if (Reflect.has(target2, key)) {
        return Reflect.get(target2, key);
      }
      if (typeof key === "symbol" || key.startsWith("$") || key.startsWith("__")) return;
      for (const ref2 of refs) {
        if (ref2.value && Reflect.has(ref2.value, key)) {
          const val = Reflect.get(ref2.value, key);
          return typeof val === "function" ? val.bind(ref2.value) : val;
        }
      }
    },
    has(target2, key) {
      if (Reflect.has(target2, key)) {
        return true;
      }
      if (typeof key === "symbol" || key.startsWith("$") || key.startsWith("__")) return false;
      for (const ref2 of refs) {
        if (ref2.value && Reflect.has(ref2.value, key)) {
          return true;
        }
      }
      return false;
    },
    set(target2, key, value) {
      if (Reflect.has(target2, key)) {
        return Reflect.set(target2, key, value);
      }
      if (typeof key === "symbol" || key.startsWith("$") || key.startsWith("__")) return false;
      for (const ref2 of refs) {
        if (ref2.value && Reflect.has(ref2.value, key)) {
          return Reflect.set(ref2.value, key, value);
        }
      }
      return false;
    },
    getOwnPropertyDescriptor(target2, key) {
      var _a;
      const descriptor = Reflect.getOwnPropertyDescriptor(target2, key);
      if (descriptor) return descriptor;
      if (typeof key === "symbol" || key.startsWith("$") || key.startsWith("__")) return;
      for (const ref2 of refs) {
        if (!ref2.value) continue;
        const descriptor2 = getDescriptor(ref2.value, key) ?? ("_" in ref2.value ? getDescriptor((_a = ref2.value._) == null ? void 0 : _a.setupState, key) : void 0);
        if (descriptor2) return descriptor2;
      }
      for (const ref2 of refs) {
        const childRefs = ref2.value && ref2.value[Refs];
        if (!childRefs) continue;
        const queue = childRefs.slice();
        while (queue.length) {
          const ref3 = queue.shift();
          const descriptor2 = getDescriptor(ref3.value, key);
          if (descriptor2) return descriptor2;
          const childRefs2 = ref3.value && ref3.value[Refs];
          if (childRefs2) queue.push(...childRefs2);
        }
      }
      return void 0;
    }
  });
}
const makeVMenuProps = propsFactory({
  // TODO
  // disableKeys: Boolean,
  id: String,
  ...omit(makeVOverlayProps({
    closeDelay: 250,
    closeOnContentClick: true,
    locationStrategy: "connected",
    openDelay: 300,
    scrim: false,
    scrollStrategy: "reposition",
    transition: {
      component: VDialogTransition
    }
  }), ["absolute"])
}, "VMenu");
const VMenu = genericComponent()({
  name: "VMenu",
  props: makeVMenuProps(),
  emits: {
    "update:modelValue": (value) => true
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const isActive = useProxiedModel(props, "modelValue");
    const {
      scopeId
    } = useScopeId();
    const uid = getUid();
    const id = computed(() => props.id || `v-menu-${uid}`);
    const overlay = ref();
    const parent = inject$1(VMenuSymbol, null);
    const openChildren = shallowRef(0);
    provide(VMenuSymbol, {
      register() {
        ++openChildren.value;
      },
      unregister() {
        --openChildren.value;
      },
      closeParents(e) {
        setTimeout(() => {
          if (!openChildren.value && !props.persistent && (e == null || e && !isClickInsideElement(e, overlay.value.contentEl))) {
            isActive.value = false;
            parent == null ? void 0 : parent.closeParents();
          }
        }, 40);
      }
    });
    async function onFocusIn(e) {
      var _a, _b, _c;
      const before = e.relatedTarget;
      const after = e.target;
      await nextTick();
      if (isActive.value && before !== after && ((_a = overlay.value) == null ? void 0 : _a.contentEl) && // We're the topmost menu
      ((_b = overlay.value) == null ? void 0 : _b.globalTop) && // It isn't the document or the menu body
      ![void 0, overlay.value.contentEl].includes(after) && // It isn't inside the menu body
      !overlay.value.contentEl.contains(after)) {
        const focusable = focusableChildren(overlay.value.contentEl);
        (_c = focusable[0]) == null ? void 0 : _c.focus();
      }
    }
    watch(isActive, (val) => {
      if (val) {
        parent == null ? void 0 : parent.register();
        (void 0).addEventListener("focusin", onFocusIn, {
          once: true
        });
      } else {
        parent == null ? void 0 : parent.unregister();
        (void 0).removeEventListener("focusin", onFocusIn);
      }
    });
    function onClickOutside(e) {
      parent == null ? void 0 : parent.closeParents(e);
    }
    function onKeydown(e) {
      var _a, _b, _c;
      if (props.disabled) return;
      if (e.key === "Tab" || e.key === "Enter" && !props.closeOnContentClick) {
        if (e.key === "Enter" && (e.target instanceof HTMLTextAreaElement || e.target instanceof HTMLInputElement && !!e.target.closest("form"))) return;
        if (e.key === "Enter") e.preventDefault();
        const nextElement = getNextElement(focusableChildren((_a = overlay.value) == null ? void 0 : _a.contentEl, false), e.shiftKey ? "prev" : "next", (el) => el.tabIndex >= 0);
        if (!nextElement) {
          isActive.value = false;
          (_c = (_b = overlay.value) == null ? void 0 : _b.activatorEl) == null ? void 0 : _c.focus();
        }
      } else if (["Enter", " "].includes(e.key) && props.closeOnContentClick) {
        isActive.value = false;
        parent == null ? void 0 : parent.closeParents();
      }
    }
    function onActivatorKeydown(e) {
      var _a;
      if (props.disabled) return;
      const el = (_a = overlay.value) == null ? void 0 : _a.contentEl;
      if (el && isActive.value) {
        if (e.key === "ArrowDown") {
          e.preventDefault();
          focusChild(el, "next");
        } else if (e.key === "ArrowUp") {
          e.preventDefault();
          focusChild(el, "prev");
        }
      } else if (["ArrowDown", "ArrowUp"].includes(e.key)) {
        isActive.value = true;
        e.preventDefault();
        setTimeout(() => setTimeout(() => onActivatorKeydown(e)));
      }
    }
    const activatorProps = computed(() => mergeProps({
      "aria-haspopup": "menu",
      "aria-expanded": String(isActive.value),
      "aria-owns": id.value,
      onKeydown: onActivatorKeydown
    }, props.activatorProps));
    useRender(() => {
      const overlayProps = VOverlay.filterProps(props);
      return createVNode(VOverlay, mergeProps({
        "ref": overlay,
        "id": id.value,
        "class": ["v-menu", props.class],
        "style": props.style
      }, overlayProps, {
        "modelValue": isActive.value,
        "onUpdate:modelValue": ($event) => isActive.value = $event,
        "absolute": true,
        "activatorProps": activatorProps.value,
        "onClick:outside": onClickOutside,
        "onKeydown": onKeydown
      }, scopeId), {
        activator: slots.activator,
        default: function() {
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          return createVNode(VDefaultsProvider, {
            "root": "VMenu"
          }, {
            default: () => {
              var _a;
              return [(_a = slots.default) == null ? void 0 : _a.call(slots, ...args)];
            }
          });
        }
      });
    });
    return forwardRefs({
      id,
      ΨopenChildren: openChildren
    }, overlay);
  }
});
const makeVCounterProps = propsFactory({
  active: Boolean,
  disabled: Boolean,
  max: [Number, String],
  value: {
    type: [Number, String],
    default: 0
  },
  ...makeComponentProps(),
  ...makeTransitionProps$1({
    transition: {
      component: VSlideYTransition
    }
  })
}, "VCounter");
const VCounter = genericComponent()({
  name: "VCounter",
  functional: true,
  props: makeVCounterProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const counter = computed(() => {
      return props.max ? `${props.value} / ${props.max}` : String(props.value);
    });
    useRender(() => createVNode(MaybeTransition, {
      "transition": props.transition
    }, {
      default: () => [withDirectives(createVNode("div", {
        "class": ["v-counter", {
          "text-error": props.max && !props.disabled && parseFloat(props.value) > parseFloat(props.max)
        }, props.class],
        "style": props.style
      }, [slots.default ? slots.default({
        counter: counter.value,
        max: props.max,
        value: props.value
      }) : counter.value]), [[vShow, props.active]])]
    }));
    return {};
  }
});
const makeVLabelProps = propsFactory({
  text: String,
  onClick: EventProp(),
  ...makeComponentProps(),
  ...makeThemeProps()
}, "VLabel");
const VLabel = genericComponent()({
  name: "VLabel",
  props: makeVLabelProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    useRender(() => {
      var _a;
      return createVNode("label", {
        "class": ["v-label", {
          "v-label--clickable": !!props.onClick
        }, props.class],
        "style": props.style,
        "onClick": props.onClick
      }, [props.text, (_a = slots.default) == null ? void 0 : _a.call(slots)]);
    });
    return {};
  }
});
const makeVFieldLabelProps = propsFactory({
  floating: Boolean,
  ...makeComponentProps()
}, "VFieldLabel");
const VFieldLabel = genericComponent()({
  name: "VFieldLabel",
  props: makeVFieldLabelProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    useRender(() => createVNode(VLabel, {
      "class": ["v-field-label", {
        "v-field-label--floating": props.floating
      }, props.class],
      "style": props.style,
      "aria-hidden": props.floating || void 0
    }, slots));
    return {};
  }
});
function useInputIcon(props) {
  const {
    t
  } = useLocale();
  function InputIcon(_ref) {
    let {
      name
    } = _ref;
    const localeKey = {
      prepend: "prependAction",
      prependInner: "prependAction",
      append: "appendAction",
      appendInner: "appendAction",
      clear: "clear"
    }[name];
    const listener = props[`onClick:${name}`];
    const label = listener && localeKey ? t(`$vuetify.input.${localeKey}`, props.label ?? "") : void 0;
    return createVNode(VIcon, {
      "icon": props[`${name}Icon`],
      "aria-label": label,
      "onClick": listener
    }, null);
  }
  return {
    InputIcon
  };
}
const makeFocusProps = propsFactory({
  focused: Boolean,
  "onUpdate:focused": EventProp()
}, "focus");
function useFocus(props) {
  let name = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : getCurrentInstanceName();
  const isFocused = useProxiedModel(props, "focused");
  const focusClasses = computed(() => {
    return {
      [`${name}--focused`]: isFocused.value
    };
  });
  function focus() {
    isFocused.value = true;
  }
  function blur() {
    isFocused.value = false;
  }
  return {
    focusClasses,
    isFocused,
    focus,
    blur
  };
}
const allowedVariants = ["underlined", "outlined", "filled", "solo", "solo-inverted", "solo-filled", "plain"];
const makeVFieldProps = propsFactory({
  appendInnerIcon: IconValue,
  bgColor: String,
  clearable: Boolean,
  clearIcon: {
    type: IconValue,
    default: "$clear"
  },
  active: Boolean,
  centerAffix: {
    type: Boolean,
    default: void 0
  },
  color: String,
  baseColor: String,
  dirty: Boolean,
  disabled: {
    type: Boolean,
    default: null
  },
  error: Boolean,
  flat: Boolean,
  label: String,
  persistentClear: Boolean,
  prependInnerIcon: IconValue,
  reverse: Boolean,
  singleLine: Boolean,
  variant: {
    type: String,
    default: "filled",
    validator: (v) => allowedVariants.includes(v)
  },
  "onClick:clear": EventProp(),
  "onClick:appendInner": EventProp(),
  "onClick:prependInner": EventProp(),
  ...makeComponentProps(),
  ...makeLoaderProps(),
  ...makeRoundedProps(),
  ...makeThemeProps()
}, "VField");
const VField = genericComponent()({
  name: "VField",
  inheritAttrs: false,
  props: {
    id: String,
    ...makeFocusProps(),
    ...makeVFieldProps()
  },
  emits: {
    "update:focused": (focused) => true,
    "update:modelValue": (value) => true
  },
  setup(props, _ref) {
    let {
      attrs,
      emit,
      slots
    } = _ref;
    const {
      themeClasses
    } = provideTheme(props);
    const {
      loaderClasses
    } = useLoader(props);
    const {
      focusClasses,
      isFocused,
      focus,
      blur
    } = useFocus(props);
    const {
      InputIcon
    } = useInputIcon(props);
    const {
      roundedClasses
    } = useRounded(props);
    const {
      rtlClasses
    } = useRtl();
    const isActive = computed(() => props.dirty || props.active);
    const hasLabel = computed(() => !props.singleLine && !!(props.label || slots.label));
    const uid = getUid();
    const id = computed(() => props.id || `input-${uid}`);
    const messagesId = computed(() => `${id.value}-messages`);
    const labelRef = ref();
    const floatingLabelRef = ref();
    const controlRef = ref();
    const isPlainOrUnderlined = computed(() => ["plain", "underlined"].includes(props.variant));
    const {
      backgroundColorClasses,
      backgroundColorStyles
    } = useBackgroundColor(toRef(props, "bgColor"));
    const {
      textColorClasses,
      textColorStyles
    } = useTextColor(computed(() => {
      return props.error || props.disabled ? void 0 : isActive.value && isFocused.value ? props.color : props.baseColor;
    }));
    watch(isActive, (val) => {
      if (hasLabel.value) {
        const el = labelRef.value.$el;
        const targetEl = floatingLabelRef.value.$el;
        requestAnimationFrame(() => {
          const rect = nullifyTransforms(el);
          const targetRect = targetEl.getBoundingClientRect();
          const x = targetRect.x - rect.x;
          const y = targetRect.y - rect.y - (rect.height / 2 - targetRect.height / 2);
          const targetWidth = targetRect.width / 0.75;
          const width = Math.abs(targetWidth - rect.width) > 1 ? {
            maxWidth: convertToUnit(targetWidth)
          } : void 0;
          const style = getComputedStyle(el);
          const targetStyle = getComputedStyle(targetEl);
          const duration = parseFloat(style.transitionDuration) * 1e3 || 150;
          const scale = parseFloat(targetStyle.getPropertyValue("--v-field-label-scale"));
          const color = targetStyle.getPropertyValue("color");
          el.style.visibility = "visible";
          targetEl.style.visibility = "hidden";
          animate(el, {
            transform: `translate(${x}px, ${y}px) scale(${scale})`,
            color,
            ...width
          }, {
            duration,
            easing: standardEasing,
            direction: val ? "normal" : "reverse"
          }).finished.then(() => {
            el.style.removeProperty("visibility");
            targetEl.style.removeProperty("visibility");
          });
        });
      }
    }, {
      flush: "post"
    });
    const slotProps = computed(() => ({
      isActive,
      isFocused,
      controlRef,
      blur,
      focus
    }));
    function onClick(e) {
      if (e.target !== (void 0).activeElement) {
        e.preventDefault();
      }
    }
    function onKeydownClear(e) {
      var _a;
      if (e.key !== "Enter" && e.key !== " ") return;
      e.preventDefault();
      e.stopPropagation();
      (_a = props["onClick:clear"]) == null ? void 0 : _a.call(props, new MouseEvent("click"));
    }
    useRender(() => {
      var _a, _b, _c;
      const isOutlined = props.variant === "outlined";
      const hasPrepend = !!(slots["prepend-inner"] || props.prependInnerIcon);
      const hasClear = !!(props.clearable || slots.clear);
      const hasAppend = !!(slots["append-inner"] || props.appendInnerIcon || hasClear);
      const label = () => slots.label ? slots.label({
        ...slotProps.value,
        label: props.label,
        props: {
          for: id.value
        }
      }) : props.label;
      return createVNode("div", mergeProps({
        "class": ["v-field", {
          "v-field--active": isActive.value,
          "v-field--appended": hasAppend,
          "v-field--center-affix": props.centerAffix ?? !isPlainOrUnderlined.value,
          "v-field--disabled": props.disabled,
          "v-field--dirty": props.dirty,
          "v-field--error": props.error,
          "v-field--flat": props.flat,
          "v-field--has-background": !!props.bgColor,
          "v-field--persistent-clear": props.persistentClear,
          "v-field--prepended": hasPrepend,
          "v-field--reverse": props.reverse,
          "v-field--single-line": props.singleLine,
          "v-field--no-label": !label(),
          [`v-field--variant-${props.variant}`]: true
        }, themeClasses.value, backgroundColorClasses.value, focusClasses.value, loaderClasses.value, roundedClasses.value, rtlClasses.value, props.class],
        "style": [backgroundColorStyles.value, props.style],
        "onClick": onClick
      }, attrs), [createVNode("div", {
        "class": "v-field__overlay"
      }, null), createVNode(LoaderSlot, {
        "name": "v-field",
        "active": !!props.loading,
        "color": props.error ? "error" : typeof props.loading === "string" ? props.loading : props.color
      }, {
        default: slots.loader
      }), hasPrepend && createVNode("div", {
        "key": "prepend",
        "class": "v-field__prepend-inner"
      }, [props.prependInnerIcon && createVNode(InputIcon, {
        "key": "prepend-icon",
        "name": "prependInner"
      }, null), (_a = slots["prepend-inner"]) == null ? void 0 : _a.call(slots, slotProps.value)]), createVNode("div", {
        "class": "v-field__field",
        "data-no-activator": ""
      }, [["filled", "solo", "solo-inverted", "solo-filled"].includes(props.variant) && hasLabel.value && createVNode(VFieldLabel, {
        "key": "floating-label",
        "ref": floatingLabelRef,
        "class": [textColorClasses.value],
        "floating": true,
        "for": id.value,
        "style": textColorStyles.value
      }, {
        default: () => [label()]
      }), createVNode(VFieldLabel, {
        "ref": labelRef,
        "for": id.value
      }, {
        default: () => [label()]
      }), (_b = slots.default) == null ? void 0 : _b.call(slots, {
        ...slotProps.value,
        props: {
          id: id.value,
          class: "v-field__input",
          "aria-describedby": messagesId.value
        },
        focus,
        blur
      })]), hasClear && createVNode(VExpandXTransition, {
        "key": "clear"
      }, {
        default: () => [withDirectives(createVNode("div", {
          "class": "v-field__clearable",
          "onMousedown": (e) => {
            e.preventDefault();
            e.stopPropagation();
          }
        }, [createVNode(VDefaultsProvider, {
          "defaults": {
            VIcon: {
              icon: props.clearIcon
            }
          }
        }, {
          default: () => [slots.clear ? slots.clear({
            ...slotProps.value,
            props: {
              onKeydown: onKeydownClear,
              onFocus: focus,
              onBlur: blur,
              onClick: props["onClick:clear"]
            }
          }) : createVNode(InputIcon, {
            "name": "clear",
            "onKeydown": onKeydownClear,
            "onFocus": focus,
            "onBlur": blur
          }, null)]
        })]), [[vShow, props.dirty]])]
      }), hasAppend && createVNode("div", {
        "key": "append",
        "class": "v-field__append-inner"
      }, [(_c = slots["append-inner"]) == null ? void 0 : _c.call(slots, slotProps.value), props.appendInnerIcon && createVNode(InputIcon, {
        "key": "append-icon",
        "name": "appendInner"
      }, null)]), createVNode("div", {
        "class": ["v-field__outline", textColorClasses.value],
        "style": textColorStyles.value
      }, [isOutlined && createVNode(Fragment, null, [createVNode("div", {
        "class": "v-field__outline__start"
      }, null), hasLabel.value && createVNode("div", {
        "class": "v-field__outline__notch"
      }, [createVNode(VFieldLabel, {
        "ref": floatingLabelRef,
        "floating": true,
        "for": id.value
      }, {
        default: () => [label()]
      })]), createVNode("div", {
        "class": "v-field__outline__end"
      }, null)]), isPlainOrUnderlined.value && hasLabel.value && createVNode(VFieldLabel, {
        "ref": floatingLabelRef,
        "floating": true,
        "for": id.value
      }, {
        default: () => [label()]
      })])]);
    });
    return {
      controlRef
    };
  }
});
function filterFieldProps(attrs) {
  const keys2 = Object.keys(VField.props).filter((k) => !isOn(k) && k !== "class" && k !== "style");
  return pick(attrs, keys2);
}
const makeVMessagesProps = propsFactory({
  active: Boolean,
  color: String,
  messages: {
    type: [Array, String],
    default: () => []
  },
  ...makeComponentProps(),
  ...makeTransitionProps$1({
    transition: {
      component: VSlideYTransition,
      leaveAbsolute: true,
      group: true
    }
  })
}, "VMessages");
const VMessages = genericComponent()({
  name: "VMessages",
  props: makeVMessagesProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const messages = computed(() => wrapInArray(props.messages));
    const {
      textColorClasses,
      textColorStyles
    } = useTextColor(computed(() => props.color));
    useRender(() => createVNode(MaybeTransition, {
      "transition": props.transition,
      "tag": "div",
      "class": ["v-messages", textColorClasses.value, props.class],
      "style": [textColorStyles.value, props.style],
      "role": "alert",
      "aria-live": "polite"
    }, {
      default: () => [props.active && messages.value.map((message, i) => createVNode("div", {
        "class": "v-messages__message",
        "key": `${i}-${messages.value}`
      }, [slots.message ? slots.message({
        message
      }) : message]))]
    }));
    return {};
  }
});
const FormKey = Symbol.for("vuetify:form");
function useForm() {
  return inject$1(FormKey, null);
}
const makeValidationProps = propsFactory({
  disabled: {
    type: Boolean,
    default: null
  },
  error: Boolean,
  errorMessages: {
    type: [Array, String],
    default: () => []
  },
  maxErrors: {
    type: [Number, String],
    default: 1
  },
  name: String,
  label: String,
  readonly: {
    type: Boolean,
    default: null
  },
  rules: {
    type: Array,
    default: () => []
  },
  modelValue: null,
  validateOn: String,
  validationValue: null,
  ...makeFocusProps()
}, "validation");
function useValidation(props) {
  let name = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : getCurrentInstanceName();
  let id = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : getUid();
  const model = useProxiedModel(props, "modelValue");
  const validationModel = computed(() => props.validationValue === void 0 ? model.value : props.validationValue);
  const form = useForm();
  const internalErrorMessages = ref([]);
  const isPristine = shallowRef(true);
  const isDirty = computed(() => !!(wrapInArray(model.value === "" ? null : model.value).length || wrapInArray(validationModel.value === "" ? null : validationModel.value).length));
  const isDisabled = computed(() => !!(props.disabled ?? (form == null ? void 0 : form.isDisabled.value)));
  const isReadonly2 = computed(() => !!(props.readonly ?? (form == null ? void 0 : form.isReadonly.value)));
  const errorMessages = computed(() => {
    var _a;
    return ((_a = props.errorMessages) == null ? void 0 : _a.length) ? wrapInArray(props.errorMessages).concat(internalErrorMessages.value).slice(0, Math.max(0, +props.maxErrors)) : internalErrorMessages.value;
  });
  const validateOn = computed(() => {
    let value = (props.validateOn ?? (form == null ? void 0 : form.validateOn.value)) || "input";
    if (value === "lazy") value = "input lazy";
    const set = new Set((value == null ? void 0 : value.split(" ")) ?? []);
    return {
      blur: set.has("blur") || set.has("input"),
      input: set.has("input"),
      submit: set.has("submit"),
      lazy: set.has("lazy")
    };
  });
  const isValid2 = computed(() => {
    var _a;
    if (props.error || ((_a = props.errorMessages) == null ? void 0 : _a.length)) return false;
    if (!props.rules.length) return true;
    if (isPristine.value) {
      return internalErrorMessages.value.length || validateOn.value.lazy ? null : true;
    } else {
      return !internalErrorMessages.value.length;
    }
  });
  const isValidating = shallowRef(false);
  const validationClasses = computed(() => {
    return {
      [`${name}--error`]: isValid2.value === false,
      [`${name}--dirty`]: isDirty.value,
      [`${name}--disabled`]: isDisabled.value,
      [`${name}--readonly`]: isReadonly2.value
    };
  });
  getCurrentInstance("validation");
  const uid = computed(() => props.name ?? unref(id));
  useToggleScope(() => validateOn.value.input, () => {
    watch(validationModel, () => {
      if (validationModel.value != null) {
        validate2();
      } else if (props.focused) {
        const unwatch = watch(() => props.focused, (val) => {
          if (!val) validate2();
          unwatch();
        });
      }
    });
  });
  useToggleScope(() => validateOn.value.blur, () => {
    watch(() => props.focused, (val) => {
      if (!val) validate2();
    });
  });
  watch([isValid2, errorMessages], () => {
    form == null ? void 0 : form.update(uid.value, isValid2.value, errorMessages.value);
  });
  async function reset() {
    model.value = null;
    await nextTick();
    await resetValidation();
  }
  async function resetValidation() {
    isPristine.value = true;
    if (!validateOn.value.lazy) {
      await validate2(true);
    } else {
      internalErrorMessages.value = [];
    }
  }
  async function validate2() {
    let silent = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : false;
    const results = [];
    isValidating.value = true;
    for (const rule of props.rules) {
      if (results.length >= +(props.maxErrors ?? 1)) {
        break;
      }
      const handler = typeof rule === "function" ? rule : () => rule;
      const result = await handler(validationModel.value);
      if (result === true) continue;
      if (result !== false && typeof result !== "string") {
        console.warn(`${result} is not a valid value. Rule functions must return boolean true or a string.`);
        continue;
      }
      results.push(result || "");
    }
    internalErrorMessages.value = results;
    isValidating.value = false;
    isPristine.value = silent;
    return internalErrorMessages.value;
  }
  return {
    errorMessages,
    isDirty,
    isDisabled,
    isReadonly: isReadonly2,
    isPristine,
    isValid: isValid2,
    isValidating,
    reset,
    resetValidation,
    validate: validate2,
    validationClasses
  };
}
const makeVInputProps = propsFactory({
  id: String,
  appendIcon: IconValue,
  centerAffix: {
    type: Boolean,
    default: true
  },
  prependIcon: IconValue,
  hideDetails: [Boolean, String],
  hideSpinButtons: Boolean,
  hint: String,
  persistentHint: Boolean,
  messages: {
    type: [Array, String],
    default: () => []
  },
  direction: {
    type: String,
    default: "horizontal",
    validator: (v) => ["horizontal", "vertical"].includes(v)
  },
  "onClick:prepend": EventProp(),
  "onClick:append": EventProp(),
  ...makeComponentProps(),
  ...makeDensityProps(),
  ...only(makeDimensionProps(), ["maxWidth", "minWidth", "width"]),
  ...makeThemeProps(),
  ...makeValidationProps()
}, "VInput");
const VInput = genericComponent()({
  name: "VInput",
  props: {
    ...makeVInputProps()
  },
  emits: {
    "update:modelValue": (value) => true
  },
  setup(props, _ref) {
    let {
      attrs,
      slots,
      emit
    } = _ref;
    const {
      densityClasses
    } = useDensity(props);
    const {
      dimensionStyles
    } = useDimension(props);
    const {
      themeClasses
    } = provideTheme(props);
    const {
      rtlClasses
    } = useRtl();
    const {
      InputIcon
    } = useInputIcon(props);
    const uid = getUid();
    const id = computed(() => props.id || `input-${uid}`);
    const messagesId = computed(() => `${id.value}-messages`);
    const {
      errorMessages,
      isDirty,
      isDisabled,
      isReadonly: isReadonly2,
      isPristine,
      isValid: isValid2,
      isValidating,
      reset,
      resetValidation,
      validate: validate2,
      validationClasses
    } = useValidation(props, "v-input", id);
    const slotProps = computed(() => ({
      id,
      messagesId,
      isDirty,
      isDisabled,
      isReadonly: isReadonly2,
      isPristine,
      isValid: isValid2,
      isValidating,
      reset,
      resetValidation,
      validate: validate2
    }));
    const messages = computed(() => {
      var _a;
      if (((_a = props.errorMessages) == null ? void 0 : _a.length) || !isPristine.value && errorMessages.value.length) {
        return errorMessages.value;
      } else if (props.hint && (props.persistentHint || props.focused)) {
        return props.hint;
      } else {
        return props.messages;
      }
    });
    useRender(() => {
      var _a, _b, _c, _d;
      const hasPrepend = !!(slots.prepend || props.prependIcon);
      const hasAppend = !!(slots.append || props.appendIcon);
      const hasMessages = messages.value.length > 0;
      const hasDetails = !props.hideDetails || props.hideDetails === "auto" && (hasMessages || !!slots.details);
      return createVNode("div", {
        "class": ["v-input", `v-input--${props.direction}`, {
          "v-input--center-affix": props.centerAffix,
          "v-input--hide-spin-buttons": props.hideSpinButtons
        }, densityClasses.value, themeClasses.value, rtlClasses.value, validationClasses.value, props.class],
        "style": [dimensionStyles.value, props.style]
      }, [hasPrepend && createVNode("div", {
        "key": "prepend",
        "class": "v-input__prepend"
      }, [(_a = slots.prepend) == null ? void 0 : _a.call(slots, slotProps.value), props.prependIcon && createVNode(InputIcon, {
        "key": "prepend-icon",
        "name": "prepend"
      }, null)]), slots.default && createVNode("div", {
        "class": "v-input__control"
      }, [(_b = slots.default) == null ? void 0 : _b.call(slots, slotProps.value)]), hasAppend && createVNode("div", {
        "key": "append",
        "class": "v-input__append"
      }, [props.appendIcon && createVNode(InputIcon, {
        "key": "append-icon",
        "name": "append"
      }, null), (_c = slots.append) == null ? void 0 : _c.call(slots, slotProps.value)]), hasDetails && createVNode("div", {
        "class": "v-input__details"
      }, [createVNode(VMessages, {
        "id": messagesId.value,
        "active": hasMessages,
        "messages": messages.value
      }, {
        message: slots.message
      }), (_d = slots.details) == null ? void 0 : _d.call(slots, slotProps.value)])]);
    });
    return {
      reset,
      resetValidation,
      validate: validate2,
      isValid: isValid2,
      errorMessages
    };
  }
});
function mounted(el, binding) {
  return;
}
function unmounted(el, binding) {
  var _a;
  const observe = (_a = el._observe) == null ? void 0 : _a[binding.instance.$.uid];
  if (!observe) return;
  observe.observer.unobserve(el);
  delete el._observe[binding.instance.$.uid];
}
const Intersect = {
  mounted,
  unmounted
};
const activeTypes = ["color", "file", "time", "date", "datetime-local", "week", "month"];
const makeVTextFieldProps = propsFactory({
  autofocus: Boolean,
  counter: [Boolean, Number, String],
  counterValue: [Number, Function],
  prefix: String,
  placeholder: String,
  persistentPlaceholder: Boolean,
  persistentCounter: Boolean,
  suffix: String,
  role: String,
  type: {
    type: String,
    default: "text"
  },
  modelModifiers: Object,
  ...makeVInputProps(),
  ...makeVFieldProps()
}, "VTextField");
const VTextField = genericComponent()({
  name: "VTextField",
  directives: {
    Intersect
  },
  inheritAttrs: false,
  props: makeVTextFieldProps(),
  emits: {
    "click:control": (e) => true,
    "mousedown:control": (e) => true,
    "update:focused": (focused) => true,
    "update:modelValue": (val) => true
  },
  setup(props, _ref) {
    let {
      attrs,
      emit,
      slots
    } = _ref;
    const model = useProxiedModel(props, "modelValue");
    const {
      isFocused,
      focus,
      blur
    } = useFocus(props);
    const counterValue = computed(() => {
      return typeof props.counterValue === "function" ? props.counterValue(model.value) : typeof props.counterValue === "number" ? props.counterValue : (model.value ?? "").toString().length;
    });
    const max = computed(() => {
      if (attrs.maxlength) return attrs.maxlength;
      if (!props.counter || typeof props.counter !== "number" && typeof props.counter !== "string") return void 0;
      return props.counter;
    });
    const isPlainOrUnderlined = computed(() => ["plain", "underlined"].includes(props.variant));
    function onIntersect(isIntersecting, entries) {
      var _a, _b;
      if (!props.autofocus || !isIntersecting) return;
      (_b = (_a = entries[0].target) == null ? void 0 : _a.focus) == null ? void 0 : _b.call(_a);
    }
    const vInputRef = ref();
    const vFieldRef = ref();
    const inputRef = ref();
    const isActive = computed(() => activeTypes.includes(props.type) || props.persistentPlaceholder || isFocused.value || props.active);
    function onFocus() {
      var _a;
      if (inputRef.value !== (void 0).activeElement) {
        (_a = inputRef.value) == null ? void 0 : _a.focus();
      }
      if (!isFocused.value) focus();
    }
    function onControlMousedown(e) {
      emit("mousedown:control", e);
      if (e.target === inputRef.value) return;
      onFocus();
      e.preventDefault();
    }
    function onControlClick(e) {
      onFocus();
      emit("click:control", e);
    }
    function onClear(e) {
      e.stopPropagation();
      onFocus();
      nextTick(() => {
        model.value = null;
        callEvent(props["onClick:clear"], e);
      });
    }
    function onInput(e) {
      var _a;
      const el = e.target;
      model.value = el.value;
      if (((_a = props.modelModifiers) == null ? void 0 : _a.trim) && ["text", "search", "password", "tel", "url"].includes(props.type)) {
        const caretPosition = [el.selectionStart, el.selectionEnd];
        nextTick(() => {
          el.selectionStart = caretPosition[0];
          el.selectionEnd = caretPosition[1];
        });
      }
    }
    useRender(() => {
      const hasCounter = !!(slots.counter || props.counter !== false && props.counter != null);
      const hasDetails = !!(hasCounter || slots.details);
      const [rootAttrs, inputAttrs] = filterInputAttrs(attrs);
      const {
        modelValue: _,
        ...inputProps
      } = VInput.filterProps(props);
      const fieldProps = filterFieldProps(props);
      return createVNode(VInput, mergeProps({
        "ref": vInputRef,
        "modelValue": model.value,
        "onUpdate:modelValue": ($event) => model.value = $event,
        "class": ["v-text-field", {
          "v-text-field--prefixed": props.prefix,
          "v-text-field--suffixed": props.suffix,
          "v-input--plain-underlined": isPlainOrUnderlined.value
        }, props.class],
        "style": props.style
      }, rootAttrs, inputProps, {
        "centerAffix": !isPlainOrUnderlined.value,
        "focused": isFocused.value
      }), {
        ...slots,
        default: (_ref2) => {
          let {
            id,
            isDisabled,
            isDirty,
            isReadonly: isReadonly2,
            isValid: isValid2
          } = _ref2;
          return createVNode(VField, mergeProps({
            "ref": vFieldRef,
            "onMousedown": onControlMousedown,
            "onClick": onControlClick,
            "onClick:clear": onClear,
            "onClick:prependInner": props["onClick:prependInner"],
            "onClick:appendInner": props["onClick:appendInner"],
            "role": props.role
          }, fieldProps, {
            "id": id.value,
            "active": isActive.value || isDirty.value,
            "dirty": isDirty.value || props.dirty,
            "disabled": isDisabled.value,
            "focused": isFocused.value,
            "error": isValid2.value === false
          }), {
            ...slots,
            default: (_ref3) => {
              let {
                props: {
                  class: fieldClass,
                  ...slotProps
                }
              } = _ref3;
              const inputNode = withDirectives(createVNode("input", mergeProps({
                "ref": inputRef,
                "value": model.value,
                "onInput": onInput,
                "autofocus": props.autofocus,
                "readonly": isReadonly2.value,
                "disabled": isDisabled.value,
                "name": props.name,
                "placeholder": props.placeholder,
                "size": 1,
                "type": props.type,
                "onFocus": onFocus,
                "onBlur": blur
              }, slotProps, inputAttrs), null), [[resolveDirective("intersect"), {
                handler: onIntersect
              }, null, {
                once: true
              }]]);
              return createVNode(Fragment, null, [props.prefix && createVNode("span", {
                "class": "v-text-field__prefix"
              }, [createVNode("span", {
                "class": "v-text-field__prefix__text"
              }, [props.prefix])]), slots.default ? createVNode("div", {
                "class": fieldClass,
                "data-no-activator": ""
              }, [slots.default(), inputNode]) : cloneVNode(inputNode, {
                class: fieldClass
              }), props.suffix && createVNode("span", {
                "class": "v-text-field__suffix"
              }, [createVNode("span", {
                "class": "v-text-field__suffix__text"
              }, [props.suffix])])]);
            }
          });
        },
        details: hasDetails ? (slotProps) => {
          var _a;
          return createVNode(Fragment, null, [(_a = slots.details) == null ? void 0 : _a.call(slots, slotProps), hasCounter && createVNode(Fragment, null, [createVNode("span", null, null), createVNode(VCounter, {
            "active": props.persistentCounter || isFocused.value,
            "value": counterValue.value,
            "max": max.value,
            "disabled": props.disabled
          }, slots.counter)])]);
        } : void 0
      });
    });
    return forwardRefs({}, vInputRef, vFieldRef, inputRef);
  }
});
const makeVDateInputProps = propsFactory({
  hideActions: Boolean,
  ...makeFocusProps(),
  ...makeVConfirmEditProps(),
  ...makeVTextFieldProps({
    placeholder: "mm/dd/yyyy",
    prependIcon: "$calendar"
  }),
  ...omit(makeVDatePickerProps({
    weeksInMonth: "dynamic",
    hideHeader: true
  }), ["active"])
}, "VDateInput");
const VDateInput = genericComponent()({
  name: "VDateInput",
  props: makeVDateInputProps(),
  emits: {
    "update:modelValue": (val) => true
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      t
    } = useLocale();
    const adapter = useDate();
    const {
      isFocused,
      focus,
      blur
    } = useFocus(props);
    const model = useProxiedModel(props, "modelValue", props.multiple ? [] : null);
    const menu = shallowRef(false);
    const display = computed(() => {
      const value = wrapInArray(model.value);
      if (!value.length) return null;
      if (props.multiple === true) {
        return t("$vuetify.datePicker.itemsSelected", value.length);
      }
      if (props.multiple === "range") {
        const start = value[0];
        const end = value[value.length - 1];
        return adapter.isValid(start) && adapter.isValid(end) ? `${adapter.format(start, "keyboardDate")} - ${adapter.format(end, "keyboardDate")}` : "";
      }
      return adapter.isValid(model.value) ? adapter.format(model.value, "keyboardDate") : "";
    });
    function onKeydown(e) {
      if (e.key !== "Enter") return;
      if (!menu.value || !isFocused.value) {
        menu.value = true;
        return;
      }
      const target = e.target;
      model.value = adapter.date(target.value);
    }
    function onClick(e) {
      e.preventDefault();
      e.stopPropagation();
      menu.value = true;
    }
    function onSave() {
      menu.value = false;
    }
    useRender(() => {
      const confirmEditProps = VConfirmEdit.filterProps(props);
      const datePickerProps = VDatePicker.filterProps(omit(props, ["active"]));
      const textFieldProps = VTextField.filterProps(props);
      return createVNode(VTextField, mergeProps(textFieldProps, {
        "modelValue": display.value,
        "onKeydown": onKeydown,
        "focused": menu.value || isFocused.value,
        "onFocus": focus,
        "onBlur": blur,
        "onClick:control": onClick,
        "onClick:prepend": onClick
      }), {
        default: () => {
          var _a;
          return [createVNode(VMenu, {
            "modelValue": menu.value,
            "onUpdate:modelValue": ($event) => menu.value = $event,
            "activator": "parent",
            "min-width": "0",
            "closeOnContentClick": false,
            "openOnClick": false
          }, {
            default: () => [createVNode(VConfirmEdit, mergeProps(confirmEditProps, {
              "modelValue": model.value,
              "onUpdate:modelValue": ($event) => model.value = $event,
              "onSave": onSave
            }), {
              default: (_ref2) => {
                let {
                  actions,
                  model: proxyModel
                } = _ref2;
                return createVNode(VDatePicker, mergeProps(datePickerProps, {
                  "modelValue": props.hideActions ? model.value : proxyModel.value,
                  "onUpdate:modelValue": (val) => {
                    if (!props.hideActions) {
                      proxyModel.value = val;
                    } else {
                      model.value = val;
                      if (!props.multiple) menu.value = false;
                    }
                  },
                  "onMousedown": (e) => e.preventDefault()
                }), {
                  actions: !props.hideActions ? () => actions : void 0
                });
              }
            })]
          }), (_a = slots.default) == null ? void 0 : _a.call(slots)];
        }
      });
    });
  }
});
const pt = {
  badge: "Distintivo",
  open: "Abrir",
  close: "Fechar",
  dismiss: "Dismiss",
  confirmEdit: {
    ok: "OK",
    cancel: "Cancel"
  },
  dataIterator: {
    noResultsText: "Nenhum dado encontrado",
    loadingText: "Carregando itens..."
  },
  dataTable: {
    itemsPerPageText: "Linhas por página:",
    ariaLabel: {
      sortDescending: "Ordenado decrescente.",
      sortAscending: "Ordenado crescente.",
      sortNone: "Não ordenado.",
      activateNone: "Ative para remover a ordenação.",
      activateDescending: "Ative para ordenar decrescente.",
      activateAscending: "Ative para ordenar crescente."
    },
    sortBy: "Ordenar por"
  },
  dataFooter: {
    itemsPerPageText: "Itens por página:",
    itemsPerPageAll: "Todos",
    nextPage: "Próxima página",
    prevPage: "Página anterior",
    firstPage: "Primeira página",
    lastPage: "Última página",
    pageText: "{0}-{1} de {2}"
  },
  dateRangeInput: {
    divider: "to"
  },
  datePicker: {
    itemsSelected: "{0} selecionados",
    range: {
      title: "Selecione as datas",
      header: "Digite as datas"
    },
    title: "Selecione a data",
    header: "Digite a data",
    input: {
      placeholder: "Insira a data"
    }
  },
  noDataText: "Não há dados disponíveis",
  carousel: {
    prev: "Visão anterior",
    next: "Próxima visão",
    ariaLabel: {
      delimiter: "Slide {0} de {1} do carrossel"
    }
  },
  calendar: {
    moreEvents: "Mais {0}",
    today: "Today"
  },
  input: {
    clear: "Limpar {0}",
    prependAction: "{0} prepended action",
    appendAction: "{0} appended action",
    otp: "Por favor insira o caracter OTP {0}"
  },
  fileInput: {
    counter: "{0} arquivo(s)",
    counterSize: "{0} arquivo(s) ({1} no total)"
  },
  timePicker: {
    am: "AM",
    pm: "PM",
    title: "Select Time"
  },
  pagination: {
    ariaLabel: {
      root: "Navegação de paginação",
      next: "Próxima página",
      previous: "Página anterior",
      page: "Ir à página {0}",
      currentPage: "Página atual, página {0}",
      first: "Primeira página",
      last: "Última página"
    }
  },
  stepper: {
    next: "Próximo",
    prev: "Anterior"
  },
  rating: {
    ariaLabel: {
      item: "Avaliação {0} de {1}"
    }
  },
  loading: "Carregando...",
  infiniteScroll: {
    loadMore: "Carregar mais",
    empty: "Não há mais dados"
  }
};
const makeVAppProps = propsFactory({
  ...makeComponentProps(),
  ...makeLayoutProps({
    fullHeight: true
  }),
  ...makeThemeProps()
}, "VApp");
const VApp = genericComponent()({
  name: "VApp",
  props: makeVAppProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const theme = provideTheme(props);
    const {
      layoutClasses,
      getLayoutItem,
      items,
      layoutRef
    } = createLayout(props);
    const {
      rtlClasses
    } = useRtl();
    useRender(() => createVNode("div", {
      "ref": layoutRef,
      "class": ["v-application", theme.themeClasses.value, layoutClasses.value, rtlClasses.value, props.class],
      "style": [props.style]
    }, [createVNode("div", {
      "class": "v-application__wrap"
    }, [createVNode(Suspense, null, {
      default: () => {
        var _a;
        return [createVNode(Fragment, null, [(_a = slots.default) == null ? void 0 : _a.call(slots)])];
      }
    })])]));
    return {
      getLayoutItem,
      items,
      theme
    };
  }
});
function useAspectStyles(props) {
  return {
    aspectStyles: computed(() => {
      const ratio = Number(props.aspectRatio);
      return ratio ? {
        paddingBottom: String(1 / ratio * 100) + "%"
      } : void 0;
    })
  };
}
const makeVResponsiveProps = propsFactory({
  aspectRatio: [String, Number],
  contentClass: null,
  inline: Boolean,
  ...makeComponentProps(),
  ...makeDimensionProps()
}, "VResponsive");
const VResponsive = genericComponent()({
  name: "VResponsive",
  props: makeVResponsiveProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      aspectStyles
    } = useAspectStyles(props);
    const {
      dimensionStyles
    } = useDimension(props);
    useRender(() => {
      var _a;
      return createVNode("div", {
        "class": ["v-responsive", {
          "v-responsive--inline": props.inline
        }, props.class],
        "style": [dimensionStyles.value, props.style]
      }, [createVNode("div", {
        "class": "v-responsive__sizer",
        "style": aspectStyles.value
      }, null), (_a = slots.additional) == null ? void 0 : _a.call(slots), slots.default && createVNode("div", {
        "class": ["v-responsive__content", props.contentClass]
      }, [slots.default()])]);
    });
    return {};
  }
});
const makeVImgProps = propsFactory({
  alt: String,
  cover: Boolean,
  color: String,
  draggable: {
    type: [Boolean, String],
    default: void 0
  },
  eager: Boolean,
  gradient: String,
  lazySrc: String,
  options: {
    type: Object,
    // For more information on types, navigate to:
    // https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
    default: () => ({
      root: void 0,
      rootMargin: void 0,
      threshold: void 0
    })
  },
  sizes: String,
  src: {
    type: [String, Object],
    default: ""
  },
  crossorigin: String,
  referrerpolicy: String,
  srcset: String,
  position: String,
  ...makeVResponsiveProps(),
  ...makeComponentProps(),
  ...makeRoundedProps(),
  ...makeTransitionProps$1()
}, "VImg");
const VImg = genericComponent()({
  name: "VImg",
  directives: {
    intersect: Intersect
  },
  props: makeVImgProps(),
  emits: {
    loadstart: (value) => true,
    load: (value) => true,
    error: (value) => true
  },
  setup(props, _ref) {
    let {
      emit,
      slots
    } = _ref;
    const {
      backgroundColorClasses,
      backgroundColorStyles
    } = useBackgroundColor(toRef(props, "color"));
    const {
      roundedClasses
    } = useRounded(props);
    const vm = getCurrentInstance("VImg");
    const currentSrc = shallowRef("");
    const image = ref();
    const state = shallowRef(props.eager ? "loading" : "idle");
    const naturalWidth = shallowRef();
    const naturalHeight = shallowRef();
    const normalisedSrc = computed(() => {
      return props.src && typeof props.src === "object" ? {
        src: props.src.src,
        srcset: props.srcset || props.src.srcset,
        lazySrc: props.lazySrc || props.src.lazySrc,
        aspect: Number(props.aspectRatio || props.src.aspect || 0)
      } : {
        src: props.src,
        srcset: props.srcset,
        lazySrc: props.lazySrc,
        aspect: Number(props.aspectRatio || 0)
      };
    });
    const aspectRatio = computed(() => {
      return normalisedSrc.value.aspect || naturalWidth.value / naturalHeight.value || 0;
    });
    watch(() => props.src, () => {
      init(state.value !== "idle");
    });
    watch(aspectRatio, (val, oldVal) => {
      if (!val && oldVal && image.value) {
        pollForSize(image.value);
      }
    });
    function init(isIntersecting) {
      if (props.eager && isIntersecting) return;
      state.value = "loading";
      if (normalisedSrc.value.lazySrc) {
        const lazyImg = new Image();
        lazyImg.src = normalisedSrc.value.lazySrc;
        pollForSize(lazyImg, null);
      }
      if (!normalisedSrc.value.src) return;
      nextTick(() => {
        var _a;
        emit("loadstart", ((_a = image.value) == null ? void 0 : _a.currentSrc) || normalisedSrc.value.src);
        setTimeout(() => {
          var _a2;
          if (vm.isUnmounted) return;
          if ((_a2 = image.value) == null ? void 0 : _a2.complete) {
            if (!image.value.naturalWidth) {
              onError();
            }
            if (state.value === "error") return;
            if (!aspectRatio.value) pollForSize(image.value, null);
            if (state.value === "loading") onLoad();
          } else {
            if (!aspectRatio.value) pollForSize(image.value);
            getSrc();
          }
        });
      });
    }
    function onLoad() {
      var _a;
      if (vm.isUnmounted) return;
      getSrc();
      pollForSize(image.value);
      state.value = "loaded";
      emit("load", ((_a = image.value) == null ? void 0 : _a.currentSrc) || normalisedSrc.value.src);
    }
    function onError() {
      var _a;
      if (vm.isUnmounted) return;
      state.value = "error";
      emit("error", ((_a = image.value) == null ? void 0 : _a.currentSrc) || normalisedSrc.value.src);
    }
    function getSrc() {
      const img = image.value;
      if (img) currentSrc.value = img.currentSrc || img.src;
    }
    let timer = -1;
    function pollForSize(img) {
      let timeout = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 100;
      const poll = () => {
        clearTimeout(timer);
        if (vm.isUnmounted) return;
        const {
          naturalHeight: imgHeight,
          naturalWidth: imgWidth
        } = img;
        if (imgHeight || imgWidth) {
          naturalWidth.value = imgWidth;
          naturalHeight.value = imgHeight;
        } else if (!img.complete && state.value === "loading" && timeout != null) {
          timer = (void 0).setTimeout(poll, timeout);
        } else if (img.currentSrc.endsWith(".svg") || img.currentSrc.startsWith("data:image/svg+xml")) {
          naturalWidth.value = 1;
          naturalHeight.value = 1;
        }
      };
      poll();
    }
    const containClasses = computed(() => ({
      "v-img__img--cover": props.cover,
      "v-img__img--contain": !props.cover
    }));
    const __image = () => {
      var _a;
      if (!normalisedSrc.value.src || state.value === "idle") return null;
      const img = createVNode("img", {
        "class": ["v-img__img", containClasses.value],
        "style": {
          objectPosition: props.position
        },
        "src": normalisedSrc.value.src,
        "srcset": normalisedSrc.value.srcset,
        "alt": props.alt,
        "crossorigin": props.crossorigin,
        "referrerpolicy": props.referrerpolicy,
        "draggable": props.draggable,
        "sizes": props.sizes,
        "ref": image,
        "onLoad": onLoad,
        "onError": onError
      }, null);
      const sources = (_a = slots.sources) == null ? void 0 : _a.call(slots);
      return createVNode(MaybeTransition, {
        "transition": props.transition,
        "appear": true
      }, {
        default: () => [withDirectives(sources ? createVNode("picture", {
          "class": "v-img__picture"
        }, [sources, img]) : img, [[vShow, state.value === "loaded"]])]
      });
    };
    const __preloadImage = () => createVNode(MaybeTransition, {
      "transition": props.transition
    }, {
      default: () => [normalisedSrc.value.lazySrc && state.value !== "loaded" && createVNode("img", {
        "class": ["v-img__img", "v-img__img--preload", containClasses.value],
        "style": {
          objectPosition: props.position
        },
        "src": normalisedSrc.value.lazySrc,
        "alt": props.alt,
        "crossorigin": props.crossorigin,
        "referrerpolicy": props.referrerpolicy,
        "draggable": props.draggable
      }, null)]
    });
    const __placeholder = () => {
      if (!slots.placeholder) return null;
      return createVNode(MaybeTransition, {
        "transition": props.transition,
        "appear": true
      }, {
        default: () => [(state.value === "loading" || state.value === "error" && !slots.error) && createVNode("div", {
          "class": "v-img__placeholder"
        }, [slots.placeholder()])]
      });
    };
    const __error = () => {
      if (!slots.error) return null;
      return createVNode(MaybeTransition, {
        "transition": props.transition,
        "appear": true
      }, {
        default: () => [state.value === "error" && createVNode("div", {
          "class": "v-img__error"
        }, [slots.error()])]
      });
    };
    const __gradient = () => {
      if (!props.gradient) return null;
      return createVNode("div", {
        "class": "v-img__gradient",
        "style": {
          backgroundImage: `linear-gradient(${props.gradient})`
        }
      }, null);
    };
    const isBooted = shallowRef(false);
    {
      const stop = watch(aspectRatio, (val) => {
        if (val) {
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              isBooted.value = true;
            });
          });
          stop();
        }
      });
    }
    useRender(() => {
      const responsiveProps = VResponsive.filterProps(props);
      return withDirectives(createVNode(VResponsive, mergeProps({
        "class": ["v-img", {
          "v-img--booting": !isBooted.value
        }, backgroundColorClasses.value, roundedClasses.value, props.class],
        "style": [{
          width: convertToUnit(props.width === "auto" ? naturalWidth.value : props.width)
        }, backgroundColorStyles.value, props.style]
      }, responsiveProps, {
        "aspectRatio": aspectRatio.value,
        "aria-label": props.alt,
        "role": props.alt ? "img" : void 0
      }), {
        additional: () => createVNode(Fragment, null, [createVNode(__image, null, null), createVNode(__preloadImage, null, null), createVNode(__gradient, null, null), createVNode(__placeholder, null, null), createVNode(__error, null, null)]),
        default: slots.default
      }), [[resolveDirective("intersect"), {
        handler: init,
        options: props.options
      }, null, {
        once: true
      }]]);
    });
    return {
      currentSrc,
      image,
      state,
      naturalWidth,
      naturalHeight
    };
  }
});
function useSsrBoot() {
  const isBooted = shallowRef(false);
  const ssrBootStyles = computed(() => !isBooted.value ? {
    transition: "none !important"
  } : void 0);
  return {
    ssrBootStyles,
    isBooted: readonly(isBooted)
  };
}
const makeVAvatarProps = propsFactory({
  start: Boolean,
  end: Boolean,
  icon: IconValue,
  image: String,
  text: String,
  ...makeComponentProps(),
  ...makeDensityProps(),
  ...makeRoundedProps(),
  ...makeSizeProps(),
  ...makeTagProps(),
  ...makeThemeProps(),
  ...makeVariantProps({
    variant: "flat"
  })
}, "VAvatar");
const VAvatar = genericComponent()({
  name: "VAvatar",
  props: makeVAvatarProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      themeClasses
    } = provideTheme(props);
    const {
      colorClasses,
      colorStyles,
      variantClasses
    } = useVariant(props);
    const {
      densityClasses
    } = useDensity(props);
    const {
      roundedClasses
    } = useRounded(props);
    const {
      sizeClasses,
      sizeStyles
    } = useSize(props);
    useRender(() => createVNode(props.tag, {
      "class": ["v-avatar", {
        "v-avatar--start": props.start,
        "v-avatar--end": props.end
      }, themeClasses.value, colorClasses.value, densityClasses.value, roundedClasses.value, sizeClasses.value, variantClasses.value, props.class],
      "style": [colorStyles.value, sizeStyles.value, props.style]
    }, {
      default: () => [!slots.default ? props.image ? createVNode(VImg, {
        "key": "image",
        "src": props.image,
        "alt": "",
        "cover": true
      }, null) : props.icon ? createVNode(VIcon, {
        "key": "icon",
        "icon": props.icon
      }, null) : props.text : createVNode(VDefaultsProvider, {
        "key": "content-defaults",
        "defaults": {
          VImg: {
            cover: true,
            image: props.image
          },
          VIcon: {
            icon: props.icon
          }
        }
      }, {
        default: () => [slots.default()]
      }), genOverlays(false, "v-avatar")]
    }));
    return {};
  }
});
const VSelectionControlGroupSymbol = Symbol.for("vuetify:selection-control-group");
const makeSelectionControlGroupProps = propsFactory({
  color: String,
  disabled: {
    type: Boolean,
    default: null
  },
  defaultsTarget: String,
  error: Boolean,
  id: String,
  inline: Boolean,
  falseIcon: IconValue,
  trueIcon: IconValue,
  ripple: {
    type: [Boolean, Object],
    default: true
  },
  multiple: {
    type: Boolean,
    default: null
  },
  name: String,
  readonly: {
    type: Boolean,
    default: null
  },
  modelValue: null,
  type: String,
  valueComparator: {
    type: Function,
    default: deepEqual
  },
  ...makeComponentProps(),
  ...makeDensityProps(),
  ...makeThemeProps()
}, "SelectionControlGroup");
const makeVSelectionControlGroupProps = propsFactory({
  ...makeSelectionControlGroupProps({
    defaultsTarget: "VSelectionControl"
  })
}, "VSelectionControlGroup");
genericComponent()({
  name: "VSelectionControlGroup",
  props: makeVSelectionControlGroupProps(),
  emits: {
    "update:modelValue": (value) => true
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const modelValue = useProxiedModel(props, "modelValue");
    const uid = getUid();
    const id = computed(() => props.id || `v-selection-control-group-${uid}`);
    const name = computed(() => props.name || id.value);
    const updateHandlers = /* @__PURE__ */ new Set();
    provide(VSelectionControlGroupSymbol, {
      modelValue,
      forceUpdate: () => {
        updateHandlers.forEach((fn) => fn());
      },
      onForceUpdate: (cb) => {
        updateHandlers.add(cb);
        onScopeDispose(() => {
          updateHandlers.delete(cb);
        });
      }
    });
    provideDefaults({
      [props.defaultsTarget]: {
        color: toRef(props, "color"),
        disabled: toRef(props, "disabled"),
        density: toRef(props, "density"),
        error: toRef(props, "error"),
        inline: toRef(props, "inline"),
        modelValue,
        multiple: computed(() => !!props.multiple || props.multiple == null && Array.isArray(modelValue.value)),
        name,
        falseIcon: toRef(props, "falseIcon"),
        trueIcon: toRef(props, "trueIcon"),
        readonly: toRef(props, "readonly"),
        ripple: toRef(props, "ripple"),
        type: toRef(props, "type"),
        valueComparator: toRef(props, "valueComparator")
      }
    });
    useRender(() => {
      var _a;
      return createVNode("div", {
        "class": ["v-selection-control-group", {
          "v-selection-control-group--inline": props.inline
        }, props.class],
        "style": props.style,
        "role": props.type === "radio" ? "radiogroup" : void 0
      }, [(_a = slots.default) == null ? void 0 : _a.call(slots)]);
    });
    return {};
  }
});
const makeVSelectionControlProps = propsFactory({
  label: String,
  baseColor: String,
  trueValue: null,
  falseValue: null,
  value: null,
  ...makeComponentProps(),
  ...makeSelectionControlGroupProps()
}, "VSelectionControl");
function useSelectionControl(props) {
  const group = inject$1(VSelectionControlGroupSymbol, void 0);
  const {
    densityClasses
  } = useDensity(props);
  const modelValue = useProxiedModel(props, "modelValue");
  const trueValue = computed(() => props.trueValue !== void 0 ? props.trueValue : props.value !== void 0 ? props.value : true);
  const falseValue = computed(() => props.falseValue !== void 0 ? props.falseValue : false);
  const isMultiple = computed(() => !!props.multiple || props.multiple == null && Array.isArray(modelValue.value));
  const model = computed({
    get() {
      const val = group ? group.modelValue.value : modelValue.value;
      return isMultiple.value ? wrapInArray(val).some((v) => props.valueComparator(v, trueValue.value)) : props.valueComparator(val, trueValue.value);
    },
    set(val) {
      if (props.readonly) return;
      const currentValue = val ? trueValue.value : falseValue.value;
      let newVal = currentValue;
      if (isMultiple.value) {
        newVal = val ? [...wrapInArray(modelValue.value), currentValue] : wrapInArray(modelValue.value).filter((item) => !props.valueComparator(item, trueValue.value));
      }
      if (group) {
        group.modelValue.value = newVal;
      } else {
        modelValue.value = newVal;
      }
    }
  });
  const {
    textColorClasses,
    textColorStyles
  } = useTextColor(computed(() => {
    if (props.error || props.disabled) return void 0;
    return model.value ? props.color : props.baseColor;
  }));
  const {
    backgroundColorClasses,
    backgroundColorStyles
  } = useBackgroundColor(computed(() => {
    return model.value && !props.error && !props.disabled ? props.color : props.baseColor;
  }));
  const icon = computed(() => model.value ? props.trueIcon : props.falseIcon);
  return {
    group,
    densityClasses,
    trueValue,
    falseValue,
    model,
    textColorClasses,
    textColorStyles,
    backgroundColorClasses,
    backgroundColorStyles,
    icon
  };
}
const VSelectionControl = genericComponent()({
  name: "VSelectionControl",
  directives: {
    Ripple
  },
  inheritAttrs: false,
  props: makeVSelectionControlProps(),
  emits: {
    "update:modelValue": (value) => true
  },
  setup(props, _ref) {
    let {
      attrs,
      slots
    } = _ref;
    const {
      group,
      densityClasses,
      icon,
      model,
      textColorClasses,
      textColorStyles,
      backgroundColorClasses,
      backgroundColorStyles,
      trueValue
    } = useSelectionControl(props);
    const uid = getUid();
    const isFocused = shallowRef(false);
    const isFocusVisible = shallowRef(false);
    const input = ref();
    const id = computed(() => props.id || `input-${uid}`);
    const isInteractive = computed(() => !props.disabled && !props.readonly);
    group == null ? void 0 : group.onForceUpdate(() => {
      if (input.value) {
        input.value.checked = model.value;
      }
    });
    function onFocus(e) {
      if (!isInteractive.value) return;
      isFocused.value = true;
      if (matchesSelector(e.target) !== false) {
        isFocusVisible.value = true;
      }
    }
    function onBlur() {
      isFocused.value = false;
      isFocusVisible.value = false;
    }
    function onClickLabel(e) {
      e.stopPropagation();
    }
    function onInput(e) {
      if (!isInteractive.value) {
        if (input.value) {
          input.value.checked = model.value;
        }
        return;
      }
      if (props.readonly && group) {
        nextTick(() => group.forceUpdate());
      }
      model.value = e.target.checked;
    }
    useRender(() => {
      var _a, _b;
      const label = slots.label ? slots.label({
        label: props.label,
        props: {
          for: id.value
        }
      }) : props.label;
      const [rootAttrs, inputAttrs] = filterInputAttrs(attrs);
      const inputNode = createVNode("input", mergeProps({
        "ref": input,
        "checked": model.value,
        "disabled": !!props.disabled,
        "id": id.value,
        "onBlur": onBlur,
        "onFocus": onFocus,
        "onInput": onInput,
        "aria-disabled": !!props.disabled,
        "aria-label": props.label,
        "type": props.type,
        "value": trueValue.value,
        "name": props.name,
        "aria-checked": props.type === "checkbox" ? model.value : void 0
      }, inputAttrs), null);
      return createVNode("div", mergeProps({
        "class": ["v-selection-control", {
          "v-selection-control--dirty": model.value,
          "v-selection-control--disabled": props.disabled,
          "v-selection-control--error": props.error,
          "v-selection-control--focused": isFocused.value,
          "v-selection-control--focus-visible": isFocusVisible.value,
          "v-selection-control--inline": props.inline
        }, densityClasses.value, props.class]
      }, rootAttrs, {
        "style": props.style
      }), [createVNode("div", {
        "class": ["v-selection-control__wrapper", textColorClasses.value],
        "style": textColorStyles.value
      }, [(_a = slots.default) == null ? void 0 : _a.call(slots, {
        backgroundColorClasses,
        backgroundColorStyles
      }), withDirectives(createVNode("div", {
        "class": ["v-selection-control__input"]
      }, [((_b = slots.input) == null ? void 0 : _b.call(slots, {
        model,
        textColorClasses,
        textColorStyles,
        backgroundColorClasses,
        backgroundColorStyles,
        inputNode,
        icon: icon.value,
        props: {
          onFocus,
          onBlur,
          id: id.value
        }
      })) ?? createVNode(Fragment, null, [icon.value && createVNode(VIcon, {
        "key": "icon",
        "icon": icon.value
      }, null), inputNode])]), [[resolveDirective("ripple"), props.ripple && [!props.disabled && !props.readonly, null, ["center", "circle"]]]])]), label && createVNode(VLabel, {
        "for": id.value,
        "onClick": onClickLabel
      }, {
        default: () => [label]
      })]);
    });
    return {
      isFocused,
      input
    };
  }
});
const makeVCheckboxBtnProps = propsFactory({
  indeterminate: Boolean,
  indeterminateIcon: {
    type: IconValue,
    default: "$checkboxIndeterminate"
  },
  ...makeVSelectionControlProps({
    falseIcon: "$checkboxOff",
    trueIcon: "$checkboxOn"
  })
}, "VCheckboxBtn");
const VCheckboxBtn = genericComponent()({
  name: "VCheckboxBtn",
  props: makeVCheckboxBtnProps(),
  emits: {
    "update:modelValue": (value) => true,
    "update:indeterminate": (value) => true
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const indeterminate = useProxiedModel(props, "indeterminate");
    const model = useProxiedModel(props, "modelValue");
    function onChange(v) {
      if (indeterminate.value) {
        indeterminate.value = false;
      }
    }
    const falseIcon = computed(() => {
      return indeterminate.value ? props.indeterminateIcon : props.falseIcon;
    });
    const trueIcon = computed(() => {
      return indeterminate.value ? props.indeterminateIcon : props.trueIcon;
    });
    useRender(() => {
      const controlProps = omit(VSelectionControl.filterProps(props), ["modelValue"]);
      return createVNode(VSelectionControl, mergeProps(controlProps, {
        "modelValue": model.value,
        "onUpdate:modelValue": [($event) => model.value = $event, onChange],
        "class": ["v-checkbox-btn", props.class],
        "style": props.style,
        "type": "checkbox",
        "falseIcon": falseIcon.value,
        "trueIcon": trueIcon.value,
        "aria-checked": indeterminate.value ? "mixed" : void 0
      }), slots);
    });
    return {};
  }
});
function calculateUpdatedTarget(_ref) {
  let {
    selectedElement,
    containerElement,
    isRtl,
    isHorizontal
  } = _ref;
  const containerSize = getOffsetSize(isHorizontal, containerElement);
  const scrollPosition = getScrollPosition(isHorizontal, isRtl, containerElement);
  const childrenSize = getOffsetSize(isHorizontal, selectedElement);
  const childrenStartPosition = getOffsetPosition(isHorizontal, selectedElement);
  const additionalOffset = childrenSize * 0.4;
  if (scrollPosition > childrenStartPosition) {
    return childrenStartPosition - additionalOffset;
  } else if (scrollPosition + containerSize < childrenStartPosition + childrenSize) {
    return childrenStartPosition - containerSize + childrenSize + additionalOffset;
  }
  return scrollPosition;
}
function getScrollSize(isHorizontal, element) {
  const key = isHorizontal ? "scrollWidth" : "scrollHeight";
  return (element == null ? void 0 : element[key]) || 0;
}
function getClientSize(isHorizontal, element) {
  const key = isHorizontal ? "clientWidth" : "clientHeight";
  return (element == null ? void 0 : element[key]) || 0;
}
function getScrollPosition(isHorizontal, rtl, element) {
  if (!element) {
    return 0;
  }
  const {
    scrollLeft,
    offsetWidth,
    scrollWidth
  } = element;
  if (isHorizontal) {
    return rtl ? scrollWidth - offsetWidth + scrollLeft : scrollLeft;
  }
  return element.scrollTop;
}
function getOffsetSize(isHorizontal, element) {
  const key = isHorizontal ? "offsetWidth" : "offsetHeight";
  return (element == null ? void 0 : element[key]) || 0;
}
function getOffsetPosition(isHorizontal, element) {
  const key = isHorizontal ? "offsetLeft" : "offsetTop";
  return (element == null ? void 0 : element[key]) || 0;
}
const VSlideGroupSymbol = Symbol.for("vuetify:v-slide-group");
const makeVSlideGroupProps = propsFactory({
  centerActive: Boolean,
  direction: {
    type: String,
    default: "horizontal"
  },
  symbol: {
    type: null,
    default: VSlideGroupSymbol
  },
  nextIcon: {
    type: IconValue,
    default: "$next"
  },
  prevIcon: {
    type: IconValue,
    default: "$prev"
  },
  showArrows: {
    type: [Boolean, String],
    validator: (v) => typeof v === "boolean" || ["always", "desktop", "mobile"].includes(v)
  },
  ...makeComponentProps(),
  ...makeDisplayProps({
    mobile: null
  }),
  ...makeTagProps(),
  ...makeGroupProps({
    selectedClass: "v-slide-group-item--active"
  })
}, "VSlideGroup");
const VSlideGroup = genericComponent()({
  name: "VSlideGroup",
  props: makeVSlideGroupProps(),
  emits: {
    "update:modelValue": (value) => true
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      isRtl
    } = useRtl();
    const {
      displayClasses,
      mobile
    } = useDisplay(props);
    const group = useGroup(props, props.symbol);
    const isOverflowing = shallowRef(false);
    const scrollOffset = shallowRef(0);
    const containerSize = shallowRef(0);
    shallowRef(0);
    const isHorizontal = computed(() => props.direction === "horizontal");
    const {
      resizeRef: containerRef,
      contentRect: containerRect
    } = useResizeObserver();
    const {
      resizeRef: contentRef,
      contentRect
    } = useResizeObserver();
    useGoTo();
    computed(() => {
      return {
        container: containerRef.el,
        duration: 200,
        easing: "easeOutQuart"
      };
    });
    computed(() => {
      if (!group.selected.value.length) return -1;
      return group.items.value.findIndex((item) => item.id === group.selected.value[0]);
    });
    computed(() => {
      if (!group.selected.value.length) return -1;
      return group.items.value.findIndex((item) => item.id === group.selected.value[group.selected.value.length - 1]);
    });
    const isFocused = shallowRef(false);
    function scrollToChildren(children, center) {
      {
        calculateUpdatedTarget({
          containerElement: containerRef.el,
          isHorizontal: isHorizontal.value,
          isRtl: isRtl.value,
          selectedElement: children
        });
      }
    }
    function onScroll(e) {
      const {
        scrollTop,
        scrollLeft
      } = e.target;
      scrollOffset.value = isHorizontal.value ? scrollLeft : scrollTop;
    }
    function onFocusin(e) {
      isFocused.value = true;
      if (!isOverflowing.value || !contentRef.el) return;
      for (const el of e.composedPath()) {
        for (const item of contentRef.el.children) {
          if (item === el) {
            scrollToChildren(item);
            return;
          }
        }
      }
    }
    function onFocusout(e) {
      isFocused.value = false;
    }
    let ignoreFocusEvent = false;
    function onFocus(e) {
      var _a;
      if (!ignoreFocusEvent && !isFocused.value && !(e.relatedTarget && ((_a = contentRef.el) == null ? void 0 : _a.contains(e.relatedTarget)))) focus();
      ignoreFocusEvent = false;
    }
    function onFocusAffixes() {
      ignoreFocusEvent = true;
    }
    function onKeydown(e) {
      if (!contentRef.el) return;
      function toFocus(location) {
        e.preventDefault();
        focus(location);
      }
      if (isHorizontal.value) {
        if (e.key === "ArrowRight") {
          toFocus(isRtl.value ? "prev" : "next");
        } else if (e.key === "ArrowLeft") {
          toFocus(isRtl.value ? "next" : "prev");
        }
      } else {
        if (e.key === "ArrowDown") {
          toFocus("next");
        } else if (e.key === "ArrowUp") {
          toFocus("prev");
        }
      }
      if (e.key === "Home") {
        toFocus("first");
      } else if (e.key === "End") {
        toFocus("last");
      }
    }
    function focus(location) {
      var _a, _b;
      if (!contentRef.el) return;
      let el;
      if (!location) {
        const focusable = focusableChildren(contentRef.el);
        el = focusable[0];
      } else if (location === "next") {
        el = (_a = contentRef.el.querySelector(":focus")) == null ? void 0 : _a.nextElementSibling;
        if (!el) return focus("first");
      } else if (location === "prev") {
        el = (_b = contentRef.el.querySelector(":focus")) == null ? void 0 : _b.previousElementSibling;
        if (!el) return focus("last");
      } else if (location === "first") {
        el = contentRef.el.firstElementChild;
      } else if (location === "last") {
        el = contentRef.el.lastElementChild;
      }
      if (el) {
        el.focus({
          preventScroll: true
        });
      }
    }
    function scrollTo2(location) {
      const direction = isHorizontal.value && isRtl.value ? -1 : 1;
      const offsetStep = (location === "prev" ? -direction : direction) * containerSize.value;
      scrollOffset.value + offsetStep;
      if (isHorizontal.value && isRtl.value && containerRef.el) {
        containerRef.el;
      }
    }
    const slotProps = computed(() => ({
      next: group.next,
      prev: group.prev,
      select: group.select,
      isSelected: group.isSelected
    }));
    const hasAffixes = computed(() => {
      switch (props.showArrows) {
        case "always":
          return true;
        case "desktop":
          return !mobile.value;
        case true:
          return isOverflowing.value || Math.abs(scrollOffset.value) > 0;
        case "mobile":
          return mobile.value || isOverflowing.value || Math.abs(scrollOffset.value) > 0;
        default:
          return !mobile.value && (isOverflowing.value || Math.abs(scrollOffset.value) > 0);
      }
    });
    const hasPrev = computed(() => {
      return Math.abs(scrollOffset.value) > 1;
    });
    const hasNext = computed(() => {
      if (!containerRef.value) return false;
      const scrollSize = getScrollSize(isHorizontal.value, containerRef.el);
      const clientSize = getClientSize(isHorizontal.value, containerRef.el);
      const scrollSizeMax = scrollSize - clientSize;
      return scrollSizeMax - Math.abs(scrollOffset.value) > 1;
    });
    useRender(() => createVNode(props.tag, {
      "class": ["v-slide-group", {
        "v-slide-group--vertical": !isHorizontal.value,
        "v-slide-group--has-affixes": hasAffixes.value,
        "v-slide-group--is-overflowing": isOverflowing.value
      }, displayClasses.value, props.class],
      "style": props.style,
      "tabindex": isFocused.value || group.selected.value.length ? -1 : 0,
      "onFocus": onFocus
    }, {
      default: () => {
        var _a, _b, _c;
        return [hasAffixes.value && createVNode("div", {
          "key": "prev",
          "class": ["v-slide-group__prev", {
            "v-slide-group__prev--disabled": !hasPrev.value
          }],
          "onMousedown": onFocusAffixes,
          "onClick": () => hasPrev.value && scrollTo2("prev")
        }, [((_a = slots.prev) == null ? void 0 : _a.call(slots, slotProps.value)) ?? createVNode(VFadeTransition, null, {
          default: () => [createVNode(VIcon, {
            "icon": isRtl.value ? props.nextIcon : props.prevIcon
          }, null)]
        })]), createVNode("div", {
          "key": "container",
          "ref": containerRef,
          "class": "v-slide-group__container",
          "onScroll": onScroll
        }, [createVNode("div", {
          "ref": contentRef,
          "class": "v-slide-group__content",
          "onFocusin": onFocusin,
          "onFocusout": onFocusout,
          "onKeydown": onKeydown
        }, [(_b = slots.default) == null ? void 0 : _b.call(slots, slotProps.value)])]), hasAffixes.value && createVNode("div", {
          "key": "next",
          "class": ["v-slide-group__next", {
            "v-slide-group__next--disabled": !hasNext.value
          }],
          "onMousedown": onFocusAffixes,
          "onClick": () => hasNext.value && scrollTo2("next")
        }, [((_c = slots.next) == null ? void 0 : _c.call(slots, slotProps.value)) ?? createVNode(VFadeTransition, null, {
          default: () => [createVNode(VIcon, {
            "icon": isRtl.value ? props.prevIcon : props.nextIcon
          }, null)]
        })])];
      }
    }));
    return {
      selected: group.selected,
      scrollTo: scrollTo2,
      scrollOffset,
      focus
    };
  }
});
const VChipGroupSymbol = Symbol.for("vuetify:v-chip-group");
const makeVChipGroupProps = propsFactory({
  column: Boolean,
  filter: Boolean,
  valueComparator: {
    type: Function,
    default: deepEqual
  },
  ...makeVSlideGroupProps(),
  ...makeComponentProps(),
  ...makeGroupProps({
    selectedClass: "v-chip--selected"
  }),
  ...makeTagProps(),
  ...makeThemeProps(),
  ...makeVariantProps({
    variant: "tonal"
  })
}, "VChipGroup");
genericComponent()({
  name: "VChipGroup",
  props: makeVChipGroupProps(),
  emits: {
    "update:modelValue": (value) => true
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      themeClasses
    } = provideTheme(props);
    const {
      isSelected,
      select,
      next,
      prev,
      selected
    } = useGroup(props, VChipGroupSymbol);
    provideDefaults({
      VChip: {
        color: toRef(props, "color"),
        disabled: toRef(props, "disabled"),
        filter: toRef(props, "filter"),
        variant: toRef(props, "variant")
      }
    });
    useRender(() => {
      const slideGroupProps = VSlideGroup.filterProps(props);
      return createVNode(VSlideGroup, mergeProps(slideGroupProps, {
        "class": ["v-chip-group", {
          "v-chip-group--column": props.column
        }, themeClasses.value, props.class],
        "style": props.style
      }), {
        default: () => {
          var _a;
          return [(_a = slots.default) == null ? void 0 : _a.call(slots, {
            isSelected,
            select,
            next,
            prev,
            selected: selected.value
          })];
        }
      });
    });
    return {};
  }
});
const makeVChipProps = propsFactory({
  activeClass: String,
  appendAvatar: String,
  appendIcon: IconValue,
  closable: Boolean,
  closeIcon: {
    type: IconValue,
    default: "$delete"
  },
  closeLabel: {
    type: String,
    default: "$vuetify.close"
  },
  draggable: Boolean,
  filter: Boolean,
  filterIcon: {
    type: String,
    default: "$complete"
  },
  label: Boolean,
  link: {
    type: Boolean,
    default: void 0
  },
  pill: Boolean,
  prependAvatar: String,
  prependIcon: IconValue,
  ripple: {
    type: [Boolean, Object],
    default: true
  },
  text: String,
  modelValue: {
    type: Boolean,
    default: true
  },
  onClick: EventProp(),
  onClickOnce: EventProp(),
  ...makeBorderProps(),
  ...makeComponentProps(),
  ...makeDensityProps(),
  ...makeElevationProps(),
  ...makeGroupItemProps(),
  ...makeRoundedProps(),
  ...makeRouterProps(),
  ...makeSizeProps(),
  ...makeTagProps({
    tag: "span"
  }),
  ...makeThemeProps(),
  ...makeVariantProps({
    variant: "tonal"
  })
}, "VChip");
const VChip = genericComponent()({
  name: "VChip",
  directives: {
    Ripple
  },
  props: makeVChipProps(),
  emits: {
    "click:close": (e) => true,
    "update:modelValue": (value) => true,
    "group:selected": (val) => true,
    click: (e) => true
  },
  setup(props, _ref) {
    let {
      attrs,
      emit,
      slots
    } = _ref;
    const {
      t
    } = useLocale();
    const {
      borderClasses
    } = useBorder(props);
    const {
      colorClasses,
      colorStyles,
      variantClasses
    } = useVariant(props);
    const {
      densityClasses
    } = useDensity(props);
    const {
      elevationClasses
    } = useElevation(props);
    const {
      roundedClasses
    } = useRounded(props);
    const {
      sizeClasses
    } = useSize(props);
    const {
      themeClasses
    } = provideTheme(props);
    const isActive = useProxiedModel(props, "modelValue");
    const group = useGroupItem(props, VChipGroupSymbol, false);
    const link = useLink(props, attrs);
    const isLink = computed(() => props.link !== false && link.isLink.value);
    const isClickable = computed(() => !props.disabled && props.link !== false && (!!group || props.link || link.isClickable.value));
    const closeProps = computed(() => ({
      "aria-label": t(props.closeLabel),
      onClick(e) {
        e.preventDefault();
        e.stopPropagation();
        isActive.value = false;
        emit("click:close", e);
      }
    }));
    function onClick(e) {
      var _a;
      emit("click", e);
      if (!isClickable.value) return;
      (_a = link.navigate) == null ? void 0 : _a.call(link, e);
      group == null ? void 0 : group.toggle();
    }
    function onKeyDown(e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onClick(e);
      }
    }
    return () => {
      const Tag = link.isLink.value ? "a" : props.tag;
      const hasAppendMedia = !!(props.appendIcon || props.appendAvatar);
      const hasAppend = !!(hasAppendMedia || slots.append);
      const hasClose = !!(slots.close || props.closable);
      const hasFilter = !!(slots.filter || props.filter) && group;
      const hasPrependMedia = !!(props.prependIcon || props.prependAvatar);
      const hasPrepend = !!(hasPrependMedia || slots.prepend);
      const hasColor = !group || group.isSelected.value;
      return isActive.value && withDirectives(createVNode(Tag, {
        "class": ["v-chip", {
          "v-chip--disabled": props.disabled,
          "v-chip--label": props.label,
          "v-chip--link": isClickable.value,
          "v-chip--filter": hasFilter,
          "v-chip--pill": props.pill
        }, themeClasses.value, borderClasses.value, hasColor ? colorClasses.value : void 0, densityClasses.value, elevationClasses.value, roundedClasses.value, sizeClasses.value, variantClasses.value, group == null ? void 0 : group.selectedClass.value, props.class],
        "style": [hasColor ? colorStyles.value : void 0, props.style],
        "disabled": props.disabled || void 0,
        "draggable": props.draggable,
        "href": link.href.value,
        "tabindex": isClickable.value ? 0 : void 0,
        "onClick": onClick,
        "onKeydown": isClickable.value && !isLink.value && onKeyDown
      }, {
        default: () => {
          var _a;
          return [genOverlays(isClickable.value, "v-chip"), hasFilter && createVNode(VExpandXTransition, {
            "key": "filter"
          }, {
            default: () => [withDirectives(createVNode("div", {
              "class": "v-chip__filter"
            }, [!slots.filter ? createVNode(VIcon, {
              "key": "filter-icon",
              "icon": props.filterIcon
            }, null) : createVNode(VDefaultsProvider, {
              "key": "filter-defaults",
              "disabled": !props.filterIcon,
              "defaults": {
                VIcon: {
                  icon: props.filterIcon
                }
              }
            }, slots.filter)]), [[vShow, group.isSelected.value]])]
          }), hasPrepend && createVNode("div", {
            "key": "prepend",
            "class": "v-chip__prepend"
          }, [!slots.prepend ? createVNode(Fragment, null, [props.prependIcon && createVNode(VIcon, {
            "key": "prepend-icon",
            "icon": props.prependIcon,
            "start": true
          }, null), props.prependAvatar && createVNode(VAvatar, {
            "key": "prepend-avatar",
            "image": props.prependAvatar,
            "start": true
          }, null)]) : createVNode(VDefaultsProvider, {
            "key": "prepend-defaults",
            "disabled": !hasPrependMedia,
            "defaults": {
              VAvatar: {
                image: props.prependAvatar,
                start: true
              },
              VIcon: {
                icon: props.prependIcon,
                start: true
              }
            }
          }, slots.prepend)]), createVNode("div", {
            "class": "v-chip__content",
            "data-no-activator": ""
          }, [((_a = slots.default) == null ? void 0 : _a.call(slots, {
            isSelected: group == null ? void 0 : group.isSelected.value,
            selectedClass: group == null ? void 0 : group.selectedClass.value,
            select: group == null ? void 0 : group.select,
            toggle: group == null ? void 0 : group.toggle,
            value: group == null ? void 0 : group.value.value,
            disabled: props.disabled
          })) ?? props.text]), hasAppend && createVNode("div", {
            "key": "append",
            "class": "v-chip__append"
          }, [!slots.append ? createVNode(Fragment, null, [props.appendIcon && createVNode(VIcon, {
            "key": "append-icon",
            "end": true,
            "icon": props.appendIcon
          }, null), props.appendAvatar && createVNode(VAvatar, {
            "key": "append-avatar",
            "end": true,
            "image": props.appendAvatar
          }, null)]) : createVNode(VDefaultsProvider, {
            "key": "append-defaults",
            "disabled": !hasAppendMedia,
            "defaults": {
              VAvatar: {
                end: true,
                image: props.appendAvatar
              },
              VIcon: {
                end: true,
                icon: props.appendIcon
              }
            }
          }, slots.append)]), hasClose && createVNode("button", mergeProps({
            "key": "close",
            "class": "v-chip__close",
            "type": "button"
          }, closeProps.value), [!slots.close ? createVNode(VIcon, {
            "key": "close-icon",
            "icon": props.closeIcon,
            "size": "x-small"
          }, null) : createVNode(VDefaultsProvider, {
            "key": "close-defaults",
            "defaults": {
              VIcon: {
                icon: props.closeIcon,
                size: "x-small"
              }
            }
          }, slots.close)])];
        }
      }), [[resolveDirective("ripple"), isClickable.value && props.ripple, null]]);
    };
  }
});
const ListKey = Symbol.for("vuetify:list");
function createList() {
  const parent = inject$1(ListKey, {
    hasPrepend: shallowRef(false),
    updateHasPrepend: () => null
  });
  const data = {
    hasPrepend: shallowRef(false),
    updateHasPrepend: (value) => {
      if (value) data.hasPrepend.value = value;
    }
  };
  provide(ListKey, data);
  return parent;
}
function useList() {
  return inject$1(ListKey, null);
}
const independentActiveStrategy = (mandatory) => {
  const strategy = {
    activate: (_ref) => {
      let {
        id,
        value,
        activated
      } = _ref;
      id = toRaw(id);
      if (mandatory && !value && activated.size === 1 && activated.has(id)) return activated;
      if (value) {
        activated.add(id);
      } else {
        activated.delete(id);
      }
      return activated;
    },
    in: (v, children, parents) => {
      let set = /* @__PURE__ */ new Set();
      if (v != null) {
        for (const id of wrapInArray(v)) {
          set = strategy.activate({
            id,
            value: true,
            activated: new Set(set),
            children,
            parents
          });
        }
      }
      return set;
    },
    out: (v) => {
      return Array.from(v);
    }
  };
  return strategy;
};
const independentSingleActiveStrategy = (mandatory) => {
  const parentStrategy = independentActiveStrategy(mandatory);
  const strategy = {
    activate: (_ref2) => {
      let {
        activated,
        id,
        ...rest
      } = _ref2;
      id = toRaw(id);
      const singleSelected = activated.has(id) ? /* @__PURE__ */ new Set([id]) : /* @__PURE__ */ new Set();
      return parentStrategy.activate({
        ...rest,
        id,
        activated: singleSelected
      });
    },
    in: (v, children, parents) => {
      let set = /* @__PURE__ */ new Set();
      if (v != null) {
        const arr = wrapInArray(v);
        if (arr.length) {
          set = parentStrategy.in(arr.slice(0, 1), children, parents);
        }
      }
      return set;
    },
    out: (v, children, parents) => {
      return parentStrategy.out(v, children, parents);
    }
  };
  return strategy;
};
const leafActiveStrategy = (mandatory) => {
  const parentStrategy = independentActiveStrategy(mandatory);
  const strategy = {
    activate: (_ref3) => {
      let {
        id,
        activated,
        children,
        ...rest
      } = _ref3;
      id = toRaw(id);
      if (children.has(id)) return activated;
      return parentStrategy.activate({
        id,
        activated,
        children,
        ...rest
      });
    },
    in: parentStrategy.in,
    out: parentStrategy.out
  };
  return strategy;
};
const leafSingleActiveStrategy = (mandatory) => {
  const parentStrategy = independentSingleActiveStrategy(mandatory);
  const strategy = {
    activate: (_ref4) => {
      let {
        id,
        activated,
        children,
        ...rest
      } = _ref4;
      id = toRaw(id);
      if (children.has(id)) return activated;
      return parentStrategy.activate({
        id,
        activated,
        children,
        ...rest
      });
    },
    in: parentStrategy.in,
    out: parentStrategy.out
  };
  return strategy;
};
const singleOpenStrategy = {
  open: (_ref) => {
    let {
      id,
      value,
      opened,
      parents
    } = _ref;
    if (value) {
      const newOpened = /* @__PURE__ */ new Set();
      newOpened.add(id);
      let parent = parents.get(id);
      while (parent != null) {
        newOpened.add(parent);
        parent = parents.get(parent);
      }
      return newOpened;
    } else {
      opened.delete(id);
      return opened;
    }
  },
  select: () => null
};
const multipleOpenStrategy = {
  open: (_ref2) => {
    let {
      id,
      value,
      opened,
      parents
    } = _ref2;
    if (value) {
      let parent = parents.get(id);
      opened.add(id);
      while (parent != null && parent !== id) {
        opened.add(parent);
        parent = parents.get(parent);
      }
      return opened;
    } else {
      opened.delete(id);
    }
    return opened;
  },
  select: () => null
};
const listOpenStrategy = {
  open: multipleOpenStrategy.open,
  select: (_ref3) => {
    let {
      id,
      value,
      opened,
      parents
    } = _ref3;
    if (!value) return opened;
    const path = [];
    let parent = parents.get(id);
    while (parent != null) {
      path.push(parent);
      parent = parents.get(parent);
    }
    return new Set(path);
  }
};
const independentSelectStrategy = (mandatory) => {
  const strategy = {
    select: (_ref) => {
      let {
        id,
        value,
        selected
      } = _ref;
      id = toRaw(id);
      if (mandatory && !value) {
        const on = Array.from(selected.entries()).reduce((arr, _ref2) => {
          let [key, value2] = _ref2;
          if (value2 === "on") arr.push(key);
          return arr;
        }, []);
        if (on.length === 1 && on[0] === id) return selected;
      }
      selected.set(id, value ? "on" : "off");
      return selected;
    },
    in: (v, children, parents) => {
      let map = /* @__PURE__ */ new Map();
      for (const id of v || []) {
        map = strategy.select({
          id,
          value: true,
          selected: new Map(map),
          children,
          parents
        });
      }
      return map;
    },
    out: (v) => {
      const arr = [];
      for (const [key, value] of v.entries()) {
        if (value === "on") arr.push(key);
      }
      return arr;
    }
  };
  return strategy;
};
const independentSingleSelectStrategy = (mandatory) => {
  const parentStrategy = independentSelectStrategy(mandatory);
  const strategy = {
    select: (_ref3) => {
      let {
        selected,
        id,
        ...rest
      } = _ref3;
      id = toRaw(id);
      const singleSelected = selected.has(id) ? /* @__PURE__ */ new Map([[id, selected.get(id)]]) : /* @__PURE__ */ new Map();
      return parentStrategy.select({
        ...rest,
        id,
        selected: singleSelected
      });
    },
    in: (v, children, parents) => {
      let map = /* @__PURE__ */ new Map();
      if (v == null ? void 0 : v.length) {
        map = parentStrategy.in(v.slice(0, 1), children, parents);
      }
      return map;
    },
    out: (v, children, parents) => {
      return parentStrategy.out(v, children, parents);
    }
  };
  return strategy;
};
const leafSelectStrategy = (mandatory) => {
  const parentStrategy = independentSelectStrategy(mandatory);
  const strategy = {
    select: (_ref4) => {
      let {
        id,
        selected,
        children,
        ...rest
      } = _ref4;
      id = toRaw(id);
      if (children.has(id)) return selected;
      return parentStrategy.select({
        id,
        selected,
        children,
        ...rest
      });
    },
    in: parentStrategy.in,
    out: parentStrategy.out
  };
  return strategy;
};
const leafSingleSelectStrategy = (mandatory) => {
  const parentStrategy = independentSingleSelectStrategy(mandatory);
  const strategy = {
    select: (_ref5) => {
      let {
        id,
        selected,
        children,
        ...rest
      } = _ref5;
      id = toRaw(id);
      if (children.has(id)) return selected;
      return parentStrategy.select({
        id,
        selected,
        children,
        ...rest
      });
    },
    in: parentStrategy.in,
    out: parentStrategy.out
  };
  return strategy;
};
const classicSelectStrategy = (mandatory) => {
  const strategy = {
    select: (_ref6) => {
      let {
        id,
        value,
        selected,
        children,
        parents
      } = _ref6;
      id = toRaw(id);
      const original = new Map(selected);
      const items = [id];
      while (items.length) {
        const item = items.shift();
        selected.set(item, value ? "on" : "off");
        if (children.has(item)) {
          items.push(...children.get(item));
        }
      }
      let parent = parents.get(id);
      while (parent) {
        const childrenIds = children.get(parent);
        const everySelected = childrenIds.every((cid) => selected.get(cid) === "on");
        const noneSelected = childrenIds.every((cid) => !selected.has(cid) || selected.get(cid) === "off");
        selected.set(parent, everySelected ? "on" : noneSelected ? "off" : "indeterminate");
        parent = parents.get(parent);
      }
      if (mandatory && !value) {
        const on = Array.from(selected.entries()).reduce((arr, _ref7) => {
          let [key, value2] = _ref7;
          if (value2 === "on") arr.push(key);
          return arr;
        }, []);
        if (on.length === 0) return original;
      }
      return selected;
    },
    in: (v, children, parents) => {
      let map = /* @__PURE__ */ new Map();
      for (const id of v || []) {
        map = strategy.select({
          id,
          value: true,
          selected: new Map(map),
          children,
          parents
        });
      }
      return map;
    },
    out: (v, children) => {
      const arr = [];
      for (const [key, value] of v.entries()) {
        if (value === "on" && !children.has(key)) arr.push(key);
      }
      return arr;
    }
  };
  return strategy;
};
const VNestedSymbol = Symbol.for("vuetify:nested");
const emptyNested = {
  id: shallowRef(),
  root: {
    register: () => null,
    unregister: () => null,
    parents: ref(/* @__PURE__ */ new Map()),
    children: ref(/* @__PURE__ */ new Map()),
    open: () => null,
    openOnSelect: () => null,
    activate: () => null,
    select: () => null,
    activatable: ref(false),
    selectable: ref(false),
    opened: ref(/* @__PURE__ */ new Set()),
    activated: ref(/* @__PURE__ */ new Set()),
    selected: ref(/* @__PURE__ */ new Map()),
    selectedValues: ref([])
  }
};
const makeNestedProps = propsFactory({
  activatable: Boolean,
  selectable: Boolean,
  activeStrategy: [String, Function, Object],
  selectStrategy: [String, Function, Object],
  openStrategy: [String, Object],
  opened: null,
  activated: null,
  selected: null,
  mandatory: Boolean
}, "nested");
const useNested = (props) => {
  const children = ref(/* @__PURE__ */ new Map());
  const parents = ref(/* @__PURE__ */ new Map());
  const opened = useProxiedModel(props, "opened", props.opened, (v) => new Set(v), (v) => [...v.values()]);
  const activeStrategy = computed(() => {
    if (typeof props.activeStrategy === "object") return props.activeStrategy;
    if (typeof props.activeStrategy === "function") return props.activeStrategy(props.mandatory);
    switch (props.activeStrategy) {
      case "leaf":
        return leafActiveStrategy(props.mandatory);
      case "single-leaf":
        return leafSingleActiveStrategy(props.mandatory);
      case "independent":
        return independentActiveStrategy(props.mandatory);
      case "single-independent":
      default:
        return independentSingleActiveStrategy(props.mandatory);
    }
  });
  const selectStrategy = computed(() => {
    if (typeof props.selectStrategy === "object") return props.selectStrategy;
    if (typeof props.selectStrategy === "function") return props.selectStrategy(props.mandatory);
    switch (props.selectStrategy) {
      case "single-leaf":
        return leafSingleSelectStrategy(props.mandatory);
      case "leaf":
        return leafSelectStrategy(props.mandatory);
      case "independent":
        return independentSelectStrategy(props.mandatory);
      case "single-independent":
        return independentSingleSelectStrategy(props.mandatory);
      case "classic":
      default:
        return classicSelectStrategy(props.mandatory);
    }
  });
  const openStrategy = computed(() => {
    if (typeof props.openStrategy === "object") return props.openStrategy;
    switch (props.openStrategy) {
      case "list":
        return listOpenStrategy;
      case "single":
        return singleOpenStrategy;
      case "multiple":
      default:
        return multipleOpenStrategy;
    }
  });
  const activated = useProxiedModel(props, "activated", props.activated, (v) => activeStrategy.value.in(v, children.value, parents.value), (v) => activeStrategy.value.out(v, children.value, parents.value));
  const selected = useProxiedModel(props, "selected", props.selected, (v) => selectStrategy.value.in(v, children.value, parents.value), (v) => selectStrategy.value.out(v, children.value, parents.value));
  function getPath(id) {
    const path = [];
    let parent = id;
    while (parent != null) {
      path.unshift(parent);
      parent = parents.value.get(parent);
    }
    return path;
  }
  const vm = getCurrentInstance("nested");
  const nested = {
    id: shallowRef(),
    root: {
      opened,
      activatable: toRef(props, "activatable"),
      selectable: toRef(props, "selectable"),
      activated,
      selected,
      selectedValues: computed(() => {
        const arr = [];
        for (const [key, value] of selected.value.entries()) {
          if (value === "on") arr.push(key);
        }
        return arr;
      }),
      register: (id, parentId, isGroup) => {
        parentId && id !== parentId && parents.value.set(id, parentId);
        isGroup && children.value.set(id, []);
        if (parentId != null) {
          children.value.set(parentId, [...children.value.get(parentId) || [], id]);
        }
      },
      unregister: (id) => {
        children.value.delete(id);
        const parent = parents.value.get(id);
        if (parent) {
          const list = children.value.get(parent) ?? [];
          children.value.set(parent, list.filter((child) => child !== id));
        }
        parents.value.delete(id);
        opened.value.delete(id);
      },
      open: (id, value, event) => {
        vm.emit("click:open", {
          id,
          value,
          path: getPath(id),
          event
        });
        const newOpened = openStrategy.value.open({
          id,
          value,
          opened: new Set(opened.value),
          children: children.value,
          parents: parents.value,
          event
        });
        newOpened && (opened.value = newOpened);
      },
      openOnSelect: (id, value, event) => {
        const newOpened = openStrategy.value.select({
          id,
          value,
          selected: new Map(selected.value),
          opened: new Set(opened.value),
          children: children.value,
          parents: parents.value,
          event
        });
        newOpened && (opened.value = newOpened);
      },
      select: (id, value, event) => {
        vm.emit("click:select", {
          id,
          value,
          path: getPath(id),
          event
        });
        const newSelected = selectStrategy.value.select({
          id,
          value,
          selected: new Map(selected.value),
          children: children.value,
          parents: parents.value,
          event
        });
        newSelected && (selected.value = newSelected);
        nested.root.openOnSelect(id, value, event);
      },
      activate: (id, value, event) => {
        if (!props.activatable) {
          return nested.root.select(id, true, event);
        }
        vm.emit("click:activate", {
          id,
          value,
          path: getPath(id),
          event
        });
        const newActivated = activeStrategy.value.activate({
          id,
          value,
          activated: new Set(activated.value),
          children: children.value,
          parents: parents.value,
          event
        });
        newActivated && (activated.value = newActivated);
      },
      children,
      parents
    }
  };
  provide(VNestedSymbol, nested);
  return nested.root;
};
const useNestedItem = (id, isGroup) => {
  const parent = inject$1(VNestedSymbol, emptyNested);
  const uidSymbol = Symbol(getUid());
  const computedId = computed(() => id.value !== void 0 ? id.value : uidSymbol);
  const item = {
    ...parent,
    id: computedId,
    open: (open, e) => parent.root.open(computedId.value, open, e),
    openOnSelect: (open, e) => parent.root.openOnSelect(computedId.value, open, e),
    isOpen: computed(() => parent.root.opened.value.has(computedId.value)),
    parent: computed(() => parent.root.parents.value.get(computedId.value)),
    activate: (activated, e) => parent.root.activate(computedId.value, activated, e),
    isActivated: computed(() => parent.root.activated.value.has(toRaw(computedId.value))),
    select: (selected, e) => parent.root.select(computedId.value, selected, e),
    isSelected: computed(() => parent.root.selected.value.get(toRaw(computedId.value)) === "on"),
    isIndeterminate: computed(() => parent.root.selected.value.get(computedId.value) === "indeterminate"),
    isLeaf: computed(() => !parent.root.children.value.get(computedId.value)),
    isGroupActivator: parent.isGroupActivator
  };
  !parent.isGroupActivator && parent.root.register(computedId.value, parent.id.value, isGroup);
  isGroup && provide(VNestedSymbol, item);
  return item;
};
const useNestedGroupActivator = () => {
  const parent = inject$1(VNestedSymbol, emptyNested);
  provide(VNestedSymbol, {
    ...parent,
    isGroupActivator: true
  });
};
const VListGroupActivator = defineComponent({
  name: "VListGroupActivator",
  setup(_, _ref) {
    let {
      slots
    } = _ref;
    useNestedGroupActivator();
    return () => {
      var _a;
      return (_a = slots.default) == null ? void 0 : _a.call(slots);
    };
  }
});
const makeVListGroupProps = propsFactory({
  /* @deprecated */
  activeColor: String,
  baseColor: String,
  color: String,
  collapseIcon: {
    type: IconValue,
    default: "$collapse"
  },
  expandIcon: {
    type: IconValue,
    default: "$expand"
  },
  prependIcon: IconValue,
  appendIcon: IconValue,
  fluid: Boolean,
  subgroup: Boolean,
  title: String,
  value: null,
  ...makeComponentProps(),
  ...makeTagProps()
}, "VListGroup");
const VListGroup = genericComponent()({
  name: "VListGroup",
  props: makeVListGroupProps(),
  setup(props, _ref2) {
    let {
      slots
    } = _ref2;
    const {
      isOpen,
      open,
      id: _id
    } = useNestedItem(toRef(props, "value"), true);
    const id = computed(() => `v-list-group--id-${String(_id.value)}`);
    const list = useList();
    const {
      isBooted
    } = useSsrBoot();
    function onClick(e) {
      e.stopPropagation();
      open(!isOpen.value, e);
    }
    const activatorProps = computed(() => ({
      onClick,
      class: "v-list-group__header",
      id: id.value
    }));
    const toggleIcon = computed(() => isOpen.value ? props.collapseIcon : props.expandIcon);
    const activatorDefaults = computed(() => ({
      VListItem: {
        active: isOpen.value,
        activeColor: props.activeColor,
        baseColor: props.baseColor,
        color: props.color,
        prependIcon: props.prependIcon || props.subgroup && toggleIcon.value,
        appendIcon: props.appendIcon || !props.subgroup && toggleIcon.value,
        title: props.title,
        value: props.value
      }
    }));
    useRender(() => createVNode(props.tag, {
      "class": ["v-list-group", {
        "v-list-group--prepend": list == null ? void 0 : list.hasPrepend.value,
        "v-list-group--fluid": props.fluid,
        "v-list-group--subgroup": props.subgroup,
        "v-list-group--open": isOpen.value
      }, props.class],
      "style": props.style
    }, {
      default: () => [slots.activator && createVNode(VDefaultsProvider, {
        "defaults": activatorDefaults.value
      }, {
        default: () => [createVNode(VListGroupActivator, null, {
          default: () => [slots.activator({
            props: activatorProps.value,
            isOpen: isOpen.value
          })]
        })]
      }), createVNode(MaybeTransition, {
        "transition": {
          component: VExpandTransition
        },
        "disabled": !isBooted.value
      }, {
        default: () => {
          var _a;
          return [withDirectives(createVNode("div", {
            "class": "v-list-group__items",
            "role": "group",
            "aria-labelledby": id.value
          }, [(_a = slots.default) == null ? void 0 : _a.call(slots)]), [[vShow, isOpen.value]])];
        }
      })]
    }));
    return {
      isOpen
    };
  }
});
const makeVListItemSubtitleProps = propsFactory({
  opacity: [Number, String],
  ...makeComponentProps(),
  ...makeTagProps()
}, "VListItemSubtitle");
const VListItemSubtitle = genericComponent()({
  name: "VListItemSubtitle",
  props: makeVListItemSubtitleProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    useRender(() => createVNode(props.tag, {
      "class": ["v-list-item-subtitle", props.class],
      "style": [{
        "--v-list-item-subtitle-opacity": props.opacity
      }, props.style]
    }, slots));
    return {};
  }
});
const VListItemTitle = createSimpleFunctional("v-list-item-title");
const makeVListItemProps = propsFactory({
  active: {
    type: Boolean,
    default: void 0
  },
  activeClass: String,
  /* @deprecated */
  activeColor: String,
  appendAvatar: String,
  appendIcon: IconValue,
  baseColor: String,
  disabled: Boolean,
  lines: [Boolean, String],
  link: {
    type: Boolean,
    default: void 0
  },
  nav: Boolean,
  prependAvatar: String,
  prependIcon: IconValue,
  ripple: {
    type: [Boolean, Object],
    default: true
  },
  slim: Boolean,
  subtitle: [String, Number],
  title: [String, Number],
  value: null,
  onClick: EventProp(),
  onClickOnce: EventProp(),
  ...makeBorderProps(),
  ...makeComponentProps(),
  ...makeDensityProps(),
  ...makeDimensionProps(),
  ...makeElevationProps(),
  ...makeRoundedProps(),
  ...makeRouterProps(),
  ...makeTagProps(),
  ...makeThemeProps(),
  ...makeVariantProps({
    variant: "text"
  })
}, "VListItem");
const VListItem = genericComponent()({
  name: "VListItem",
  directives: {
    Ripple
  },
  props: makeVListItemProps(),
  emits: {
    click: (e) => true
  },
  setup(props, _ref) {
    let {
      attrs,
      slots,
      emit
    } = _ref;
    const link = useLink(props, attrs);
    const id = computed(() => props.value === void 0 ? link.href.value : props.value);
    const {
      activate,
      isActivated,
      select,
      isSelected,
      isIndeterminate,
      isGroupActivator,
      root,
      parent,
      openOnSelect
    } = useNestedItem(id, false);
    const list = useList();
    const isActive = computed(() => {
      var _a;
      return props.active !== false && (props.active || ((_a = link.isActive) == null ? void 0 : _a.value) || (root.activatable.value ? isActivated.value : isSelected.value));
    });
    const isLink = computed(() => props.link !== false && link.isLink.value);
    const isClickable = computed(() => !props.disabled && props.link !== false && (props.link || link.isClickable.value || !!list && (root.selectable.value || root.activatable.value || props.value != null)));
    const roundedProps = computed(() => props.rounded || props.nav);
    const color = computed(() => props.color ?? props.activeColor);
    const variantProps = computed(() => ({
      color: isActive.value ? color.value ?? props.baseColor : props.baseColor,
      variant: props.variant
    }));
    watch(() => {
      var _a;
      return (_a = link.isActive) == null ? void 0 : _a.value;
    }, (val) => {
      if (val && parent.value != null) {
        root.open(parent.value, true);
      }
      if (val) {
        openOnSelect(val);
      }
    }, {
      immediate: true
    });
    const {
      themeClasses
    } = provideTheme(props);
    const {
      borderClasses
    } = useBorder(props);
    const {
      colorClasses,
      colorStyles,
      variantClasses
    } = useVariant(variantProps);
    const {
      densityClasses
    } = useDensity(props);
    const {
      dimensionStyles
    } = useDimension(props);
    const {
      elevationClasses
    } = useElevation(props);
    const {
      roundedClasses
    } = useRounded(roundedProps);
    const lineClasses = computed(() => props.lines ? `v-list-item--${props.lines}-line` : void 0);
    const slotProps = computed(() => ({
      isActive: isActive.value,
      select,
      isSelected: isSelected.value,
      isIndeterminate: isIndeterminate.value
    }));
    function onClick(e) {
      var _a;
      emit("click", e);
      if (!isClickable.value) return;
      (_a = link.navigate) == null ? void 0 : _a.call(link, e);
      if (isGroupActivator) return;
      if (root.activatable.value) {
        activate(!isActivated.value, e);
      } else if (root.selectable.value) {
        select(!isSelected.value, e);
      } else if (props.value != null) {
        select(!isSelected.value, e);
      }
    }
    function onKeyDown(e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onClick(e);
      }
    }
    useRender(() => {
      const Tag = isLink.value ? "a" : props.tag;
      const hasTitle = slots.title || props.title != null;
      const hasSubtitle = slots.subtitle || props.subtitle != null;
      const hasAppendMedia = !!(props.appendAvatar || props.appendIcon);
      const hasAppend = !!(hasAppendMedia || slots.append);
      const hasPrependMedia = !!(props.prependAvatar || props.prependIcon);
      const hasPrepend = !!(hasPrependMedia || slots.prepend);
      list == null ? void 0 : list.updateHasPrepend(hasPrepend);
      if (props.activeColor) {
        deprecate("active-color", ["color", "base-color"]);
      }
      return withDirectives(createVNode(Tag, {
        "class": ["v-list-item", {
          "v-list-item--active": isActive.value,
          "v-list-item--disabled": props.disabled,
          "v-list-item--link": isClickable.value,
          "v-list-item--nav": props.nav,
          "v-list-item--prepend": !hasPrepend && (list == null ? void 0 : list.hasPrepend.value),
          "v-list-item--slim": props.slim,
          [`${props.activeClass}`]: props.activeClass && isActive.value
        }, themeClasses.value, borderClasses.value, colorClasses.value, densityClasses.value, elevationClasses.value, lineClasses.value, roundedClasses.value, variantClasses.value, props.class],
        "style": [colorStyles.value, dimensionStyles.value, props.style],
        "href": link.href.value,
        "tabindex": isClickable.value ? list ? -2 : 0 : void 0,
        "onClick": onClick,
        "onKeydown": isClickable.value && !isLink.value && onKeyDown
      }, {
        default: () => {
          var _a;
          return [genOverlays(isClickable.value || isActive.value, "v-list-item"), hasPrepend && createVNode("div", {
            "key": "prepend",
            "class": "v-list-item__prepend"
          }, [!slots.prepend ? createVNode(Fragment, null, [props.prependAvatar && createVNode(VAvatar, {
            "key": "prepend-avatar",
            "density": props.density,
            "image": props.prependAvatar
          }, null), props.prependIcon && createVNode(VIcon, {
            "key": "prepend-icon",
            "density": props.density,
            "icon": props.prependIcon
          }, null)]) : createVNode(VDefaultsProvider, {
            "key": "prepend-defaults",
            "disabled": !hasPrependMedia,
            "defaults": {
              VAvatar: {
                density: props.density,
                image: props.prependAvatar
              },
              VIcon: {
                density: props.density,
                icon: props.prependIcon
              },
              VListItemAction: {
                start: true
              }
            }
          }, {
            default: () => {
              var _a2;
              return [(_a2 = slots.prepend) == null ? void 0 : _a2.call(slots, slotProps.value)];
            }
          }), createVNode("div", {
            "class": "v-list-item__spacer"
          }, null)]), createVNode("div", {
            "class": "v-list-item__content",
            "data-no-activator": ""
          }, [hasTitle && createVNode(VListItemTitle, {
            "key": "title"
          }, {
            default: () => {
              var _a2;
              return [((_a2 = slots.title) == null ? void 0 : _a2.call(slots, {
                title: props.title
              })) ?? props.title];
            }
          }), hasSubtitle && createVNode(VListItemSubtitle, {
            "key": "subtitle"
          }, {
            default: () => {
              var _a2;
              return [((_a2 = slots.subtitle) == null ? void 0 : _a2.call(slots, {
                subtitle: props.subtitle
              })) ?? props.subtitle];
            }
          }), (_a = slots.default) == null ? void 0 : _a.call(slots, slotProps.value)]), hasAppend && createVNode("div", {
            "key": "append",
            "class": "v-list-item__append"
          }, [!slots.append ? createVNode(Fragment, null, [props.appendIcon && createVNode(VIcon, {
            "key": "append-icon",
            "density": props.density,
            "icon": props.appendIcon
          }, null), props.appendAvatar && createVNode(VAvatar, {
            "key": "append-avatar",
            "density": props.density,
            "image": props.appendAvatar
          }, null)]) : createVNode(VDefaultsProvider, {
            "key": "append-defaults",
            "disabled": !hasAppendMedia,
            "defaults": {
              VAvatar: {
                density: props.density,
                image: props.appendAvatar
              },
              VIcon: {
                density: props.density,
                icon: props.appendIcon
              },
              VListItemAction: {
                end: true
              }
            }
          }, {
            default: () => {
              var _a2;
              return [(_a2 = slots.append) == null ? void 0 : _a2.call(slots, slotProps.value)];
            }
          }), createVNode("div", {
            "class": "v-list-item__spacer"
          }, null)])];
        }
      }), [[resolveDirective("ripple"), isClickable.value && props.ripple]]);
    });
    return {
      activate,
      isActivated,
      isGroupActivator,
      isSelected,
      list,
      select
    };
  }
});
const makeVListSubheaderProps = propsFactory({
  color: String,
  inset: Boolean,
  sticky: Boolean,
  title: String,
  ...makeComponentProps(),
  ...makeTagProps()
}, "VListSubheader");
const VListSubheader = genericComponent()({
  name: "VListSubheader",
  props: makeVListSubheaderProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      textColorClasses,
      textColorStyles
    } = useTextColor(toRef(props, "color"));
    useRender(() => {
      const hasText = !!(slots.default || props.title);
      return createVNode(props.tag, {
        "class": ["v-list-subheader", {
          "v-list-subheader--inset": props.inset,
          "v-list-subheader--sticky": props.sticky
        }, textColorClasses.value, props.class],
        "style": [{
          textColorStyles
        }, props.style]
      }, {
        default: () => {
          var _a;
          return [hasText && createVNode("div", {
            "class": "v-list-subheader__text"
          }, [((_a = slots.default) == null ? void 0 : _a.call(slots)) ?? props.title])];
        }
      });
    });
    return {};
  }
});
const makeVDividerProps = propsFactory({
  color: String,
  inset: Boolean,
  length: [Number, String],
  opacity: [Number, String],
  thickness: [Number, String],
  vertical: Boolean,
  ...makeComponentProps(),
  ...makeThemeProps()
}, "VDivider");
const VDivider = genericComponent()({
  name: "VDivider",
  props: makeVDividerProps(),
  setup(props, _ref) {
    let {
      attrs,
      slots
    } = _ref;
    const {
      themeClasses
    } = provideTheme(props);
    const {
      textColorClasses,
      textColorStyles
    } = useTextColor(toRef(props, "color"));
    const dividerStyles = computed(() => {
      const styles = {};
      if (props.length) {
        styles[props.vertical ? "height" : "width"] = convertToUnit(props.length);
      }
      if (props.thickness) {
        styles[props.vertical ? "borderRightWidth" : "borderTopWidth"] = convertToUnit(props.thickness);
      }
      return styles;
    });
    useRender(() => {
      const divider = createVNode("hr", {
        "class": [{
          "v-divider": true,
          "v-divider--inset": props.inset,
          "v-divider--vertical": props.vertical
        }, themeClasses.value, textColorClasses.value, props.class],
        "style": [dividerStyles.value, textColorStyles.value, {
          "--v-border-opacity": props.opacity
        }, props.style],
        "aria-orientation": !attrs.role || attrs.role === "separator" ? props.vertical ? "vertical" : "horizontal" : void 0,
        "role": `${attrs.role || "separator"}`
      }, null);
      if (!slots.default) return divider;
      return createVNode("div", {
        "class": ["v-divider__wrapper", {
          "v-divider__wrapper--vertical": props.vertical,
          "v-divider__wrapper--inset": props.inset
        }]
      }, [divider, createVNode("div", {
        "class": "v-divider__content"
      }, [slots.default()]), divider]);
    });
    return {};
  }
});
const makeVListChildrenProps = propsFactory({
  items: Array,
  returnObject: Boolean
}, "VListChildren");
const VListChildren = genericComponent()({
  name: "VListChildren",
  props: makeVListChildrenProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    createList();
    return () => {
      var _a, _b;
      return ((_a = slots.default) == null ? void 0 : _a.call(slots)) ?? ((_b = props.items) == null ? void 0 : _b.map((_ref2) => {
        var _a2, _b2;
        let {
          children,
          props: itemProps,
          type,
          raw: item
        } = _ref2;
        if (type === "divider") {
          return ((_a2 = slots.divider) == null ? void 0 : _a2.call(slots, {
            props: itemProps
          })) ?? createVNode(VDivider, itemProps, null);
        }
        if (type === "subheader") {
          return ((_b2 = slots.subheader) == null ? void 0 : _b2.call(slots, {
            props: itemProps
          })) ?? createVNode(VListSubheader, itemProps, null);
        }
        const slotsWithItem = {
          subtitle: slots.subtitle ? (slotProps) => {
            var _a3;
            return (_a3 = slots.subtitle) == null ? void 0 : _a3.call(slots, {
              ...slotProps,
              item
            });
          } : void 0,
          prepend: slots.prepend ? (slotProps) => {
            var _a3;
            return (_a3 = slots.prepend) == null ? void 0 : _a3.call(slots, {
              ...slotProps,
              item
            });
          } : void 0,
          append: slots.append ? (slotProps) => {
            var _a3;
            return (_a3 = slots.append) == null ? void 0 : _a3.call(slots, {
              ...slotProps,
              item
            });
          } : void 0,
          title: slots.title ? (slotProps) => {
            var _a3;
            return (_a3 = slots.title) == null ? void 0 : _a3.call(slots, {
              ...slotProps,
              item
            });
          } : void 0
        };
        const listGroupProps = VListGroup.filterProps(itemProps);
        return children ? createVNode(VListGroup, mergeProps({
          "value": itemProps == null ? void 0 : itemProps.value
        }, listGroupProps), {
          activator: (_ref3) => {
            let {
              props: activatorProps
            } = _ref3;
            const listItemProps = {
              ...itemProps,
              ...activatorProps,
              value: props.returnObject ? item : itemProps.value
            };
            return slots.header ? slots.header({
              props: listItemProps
            }) : createVNode(VListItem, listItemProps, slotsWithItem);
          },
          default: () => createVNode(VListChildren, {
            "items": children,
            "returnObject": props.returnObject
          }, slots)
        }) : slots.item ? slots.item({
          props: itemProps
        }) : createVNode(VListItem, mergeProps(itemProps, {
          "value": props.returnObject ? item : itemProps.value
        }), slotsWithItem);
      }));
    };
  }
});
const makeItemsProps = propsFactory({
  items: {
    type: Array,
    default: () => []
  },
  itemTitle: {
    type: [String, Array, Function],
    default: "title"
  },
  itemValue: {
    type: [String, Array, Function],
    default: "value"
  },
  itemChildren: {
    type: [Boolean, String, Array, Function],
    default: "children"
  },
  itemProps: {
    type: [Boolean, String, Array, Function],
    default: "props"
  },
  returnObject: Boolean,
  valueComparator: {
    type: Function,
    default: deepEqual
  }
}, "list-items");
function transformItem$2(props, item) {
  const title = getPropertyFromItem(item, props.itemTitle, item);
  const value = getPropertyFromItem(item, props.itemValue, title);
  const children = getPropertyFromItem(item, props.itemChildren);
  const itemProps = props.itemProps === true ? typeof item === "object" && item != null && !Array.isArray(item) ? "children" in item ? omit(item, ["children"]) : item : void 0 : getPropertyFromItem(item, props.itemProps);
  const _props = {
    title,
    value,
    ...itemProps
  };
  return {
    title: String(_props.title ?? ""),
    value: _props.value,
    props: _props,
    children: Array.isArray(children) ? transformItems$2(props, children) : void 0,
    raw: item
  };
}
function transformItems$2(props, items) {
  const array = [];
  for (const item of items) {
    array.push(transformItem$2(props, item));
  }
  return array;
}
function useItems(props) {
  const items = computed(() => transformItems$2(props, props.items));
  const hasNullItem = computed(() => items.value.some((item) => item.value === null));
  function transformIn(value) {
    if (!hasNullItem.value) {
      value = value.filter((v) => v !== null);
    }
    return value.map((v) => {
      if (props.returnObject && typeof v === "string") {
        return transformItem$2(props, v);
      }
      return items.value.find((item) => props.valueComparator(v, item.value)) || transformItem$2(props, v);
    });
  }
  function transformOut(value) {
    return props.returnObject ? value.map((_ref) => {
      let {
        raw
      } = _ref;
      return raw;
    }) : value.map((_ref2) => {
      let {
        value: value2
      } = _ref2;
      return value2;
    });
  }
  return {
    items,
    transformIn,
    transformOut
  };
}
function isPrimitive(value) {
  return typeof value === "string" || typeof value === "number" || typeof value === "boolean";
}
function transformItem$1(props, item) {
  const type = getPropertyFromItem(item, props.itemType, "item");
  const title = isPrimitive(item) ? item : getPropertyFromItem(item, props.itemTitle);
  const value = getPropertyFromItem(item, props.itemValue, void 0);
  const children = getPropertyFromItem(item, props.itemChildren);
  const itemProps = props.itemProps === true ? omit(item, ["children"]) : getPropertyFromItem(item, props.itemProps);
  const _props = {
    title,
    value,
    ...itemProps
  };
  return {
    type,
    title: _props.title,
    value: _props.value,
    props: _props,
    children: type === "item" && children ? transformItems$1(props, children) : void 0,
    raw: item
  };
}
function transformItems$1(props, items) {
  const array = [];
  for (const item of items) {
    array.push(transformItem$1(props, item));
  }
  return array;
}
function useListItems(props) {
  const items = computed(() => transformItems$1(props, props.items));
  return {
    items
  };
}
const makeVListProps = propsFactory({
  baseColor: String,
  /* @deprecated */
  activeColor: String,
  activeClass: String,
  bgColor: String,
  disabled: Boolean,
  expandIcon: String,
  collapseIcon: String,
  lines: {
    type: [Boolean, String],
    default: "one"
  },
  slim: Boolean,
  nav: Boolean,
  "onClick:open": EventProp(),
  "onClick:select": EventProp(),
  "onUpdate:opened": EventProp(),
  ...makeNestedProps({
    selectStrategy: "single-leaf",
    openStrategy: "list"
  }),
  ...makeBorderProps(),
  ...makeComponentProps(),
  ...makeDensityProps(),
  ...makeDimensionProps(),
  ...makeElevationProps(),
  itemType: {
    type: String,
    default: "type"
  },
  ...makeItemsProps(),
  ...makeRoundedProps(),
  ...makeTagProps(),
  ...makeThemeProps(),
  ...makeVariantProps({
    variant: "text"
  })
}, "VList");
const VList = genericComponent()({
  name: "VList",
  props: makeVListProps(),
  emits: {
    "update:selected": (value) => true,
    "update:activated": (value) => true,
    "update:opened": (value) => true,
    "click:open": (value) => true,
    "click:activate": (value) => true,
    "click:select": (value) => true
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      items
    } = useListItems(props);
    const {
      themeClasses
    } = provideTheme(props);
    const {
      backgroundColorClasses,
      backgroundColorStyles
    } = useBackgroundColor(toRef(props, "bgColor"));
    const {
      borderClasses
    } = useBorder(props);
    const {
      densityClasses
    } = useDensity(props);
    const {
      dimensionStyles
    } = useDimension(props);
    const {
      elevationClasses
    } = useElevation(props);
    const {
      roundedClasses
    } = useRounded(props);
    const {
      children,
      open,
      parents,
      select
    } = useNested(props);
    const lineClasses = computed(() => props.lines ? `v-list--${props.lines}-line` : void 0);
    const activeColor = toRef(props, "activeColor");
    const baseColor = toRef(props, "baseColor");
    const color = toRef(props, "color");
    createList();
    provideDefaults({
      VListGroup: {
        activeColor,
        baseColor,
        color,
        expandIcon: toRef(props, "expandIcon"),
        collapseIcon: toRef(props, "collapseIcon")
      },
      VListItem: {
        activeClass: toRef(props, "activeClass"),
        activeColor,
        baseColor,
        color,
        density: toRef(props, "density"),
        disabled: toRef(props, "disabled"),
        lines: toRef(props, "lines"),
        nav: toRef(props, "nav"),
        slim: toRef(props, "slim"),
        variant: toRef(props, "variant")
      }
    });
    const isFocused = shallowRef(false);
    const contentRef = ref();
    function onFocusin(e) {
      isFocused.value = true;
    }
    function onFocusout(e) {
      isFocused.value = false;
    }
    function onFocus(e) {
      var _a;
      if (!isFocused.value && !(e.relatedTarget && ((_a = contentRef.value) == null ? void 0 : _a.contains(e.relatedTarget)))) focus();
    }
    function onKeydown(e) {
      const target = e.target;
      if (!contentRef.value || ["INPUT", "TEXTAREA"].includes(target.tagName)) return;
      if (e.key === "ArrowDown") {
        focus("next");
      } else if (e.key === "ArrowUp") {
        focus("prev");
      } else if (e.key === "Home") {
        focus("first");
      } else if (e.key === "End") {
        focus("last");
      } else {
        return;
      }
      e.preventDefault();
    }
    function onMousedown(e) {
      isFocused.value = true;
    }
    function focus(location) {
      if (contentRef.value) {
        return focusChild(contentRef.value, location);
      }
    }
    useRender(() => {
      return createVNode(props.tag, {
        "ref": contentRef,
        "class": ["v-list", {
          "v-list--disabled": props.disabled,
          "v-list--nav": props.nav,
          "v-list--slim": props.slim
        }, themeClasses.value, backgroundColorClasses.value, borderClasses.value, densityClasses.value, elevationClasses.value, lineClasses.value, roundedClasses.value, props.class],
        "style": [backgroundColorStyles.value, dimensionStyles.value, props.style],
        "tabindex": props.disabled || isFocused.value ? -1 : 0,
        "role": "listbox",
        "aria-activedescendant": void 0,
        "onFocusin": onFocusin,
        "onFocusout": onFocusout,
        "onFocus": onFocus,
        "onKeydown": onKeydown,
        "onMousedown": onMousedown
      }, {
        default: () => [createVNode(VListChildren, {
          "items": items.value,
          "returnObject": props.returnObject
        }, slots)]
      });
    });
    return {
      open,
      select,
      focus,
      children,
      parents
    };
  }
});
const makeVVirtualScrollItemProps = propsFactory({
  renderless: Boolean,
  ...makeComponentProps()
}, "VVirtualScrollItem");
const VVirtualScrollItem = genericComponent()({
  name: "VVirtualScrollItem",
  inheritAttrs: false,
  props: makeVVirtualScrollItemProps(),
  emits: {
    "update:height": (height) => true
  },
  setup(props, _ref) {
    let {
      attrs,
      emit,
      slots
    } = _ref;
    const {
      resizeRef,
      contentRect
    } = useResizeObserver();
    watch(() => {
      var _a;
      return (_a = contentRect.value) == null ? void 0 : _a.height;
    }, (height) => {
      if (height != null) emit("update:height", height);
    });
    useRender(() => {
      var _a, _b;
      return props.renderless ? createVNode(Fragment, null, [(_a = slots.default) == null ? void 0 : _a.call(slots, {
        itemRef: resizeRef
      })]) : createVNode("div", mergeProps({
        "ref": resizeRef,
        "class": ["v-virtual-scroll__item", props.class],
        "style": props.style
      }, attrs), [(_b = slots.default) == null ? void 0 : _b.call(slots)]);
    });
  }
});
const UP = -1;
const DOWN = 1;
const BUFFER_PX = 100;
const makeVirtualProps = propsFactory({
  itemHeight: {
    type: [Number, String],
    default: null
  },
  height: [Number, String]
}, "virtual");
function useVirtual(props, items) {
  const display = useDisplay();
  const itemHeight = shallowRef(0);
  watchEffect(() => {
    itemHeight.value = parseFloat(props.itemHeight || 0);
  });
  const first = shallowRef(0);
  const last = shallowRef(Math.ceil(
    // Assume 16px items filling the entire screen height if
    // not provided. This is probably incorrect but it minimises
    // the chance of ending up with empty space at the bottom.
    // The default value is set here to avoid poisoning getSize()
    (parseInt(props.height) || display.height.value) / (itemHeight.value || 16)
  ) || 1);
  const paddingTop = shallowRef(0);
  const paddingBottom = shallowRef(0);
  const containerRef = ref();
  const markerRef = ref();
  let markerOffset = 0;
  const {
    resizeRef,
    contentRect
  } = useResizeObserver();
  watchEffect(() => {
    resizeRef.value = containerRef.value;
  });
  const viewportHeight = computed(() => {
    var _a;
    return containerRef.value === (void 0).documentElement ? display.height.value : ((_a = contentRect.value) == null ? void 0 : _a.height) || parseInt(props.height) || 0;
  });
  const hasInitialRender = computed(() => {
    return !!(containerRef.value && markerRef.value && viewportHeight.value && itemHeight.value);
  });
  let sizes = Array.from({
    length: items.value.length
  });
  let offsets = Array.from({
    length: items.value.length
  });
  const updateTime = shallowRef(0);
  let targetScrollIndex = -1;
  function getSize(index) {
    return sizes[index] || itemHeight.value;
  }
  const updateOffsets = debounce(() => {
    const start = performance.now();
    offsets[0] = 0;
    const length = items.value.length;
    for (let i = 1; i <= length - 1; i++) {
      offsets[i] = (offsets[i - 1] || 0) + getSize(i - 1);
    }
    updateTime.value = Math.max(updateTime.value, performance.now() - start);
  }, updateTime);
  const unwatch = watch(hasInitialRender, (v) => {
    if (!v) return;
    unwatch();
    markerOffset = markerRef.value.offsetTop;
    updateOffsets.immediate();
    calculateVisibleItems();
    if (!~targetScrollIndex) return;
    nextTick(() => {
    });
  });
  onScopeDispose(() => {
    updateOffsets.clear();
  });
  function handleItemResize(index, height) {
    const prevHeight = sizes[index];
    const prevMinHeight = itemHeight.value;
    itemHeight.value = prevMinHeight ? Math.min(itemHeight.value, height) : height;
    if (prevHeight !== height || prevMinHeight !== itemHeight.value) {
      sizes[index] = height;
      updateOffsets();
    }
  }
  function calculateOffset(index) {
    index = clamp(index, 0, items.value.length - 1);
    return offsets[index] || 0;
  }
  function calculateIndex(scrollTop) {
    return binaryClosest(offsets, scrollTop);
  }
  let lastScrollTop = 0;
  let scrollVelocity = 0;
  let lastScrollTime = 0;
  watch(viewportHeight, (val, oldVal) => {
    if (oldVal) {
      calculateVisibleItems();
      if (val < oldVal) {
        requestAnimationFrame(() => {
          scrollVelocity = 0;
          calculateVisibleItems();
        });
      }
    }
  });
  function handleScroll() {
    if (!containerRef.value || !markerRef.value) return;
    const scrollTop = containerRef.value.scrollTop;
    const scrollTime = performance.now();
    const scrollDeltaT = scrollTime - lastScrollTime;
    if (scrollDeltaT > 500) {
      scrollVelocity = Math.sign(scrollTop - lastScrollTop);
      markerOffset = markerRef.value.offsetTop;
    } else {
      scrollVelocity = scrollTop - lastScrollTop;
    }
    lastScrollTop = scrollTop;
    lastScrollTime = scrollTime;
    calculateVisibleItems();
  }
  function handleScrollend() {
    if (!containerRef.value || !markerRef.value) return;
    scrollVelocity = 0;
    lastScrollTime = 0;
    calculateVisibleItems();
  }
  let raf2 = -1;
  function calculateVisibleItems() {
    cancelAnimationFrame(raf2);
    raf2 = requestAnimationFrame(_calculateVisibleItems);
  }
  function _calculateVisibleItems() {
    if (!containerRef.value || !viewportHeight.value) return;
    const scrollTop = lastScrollTop - markerOffset;
    const direction = Math.sign(scrollVelocity);
    const startPx = Math.max(0, scrollTop - BUFFER_PX);
    const start = clamp(calculateIndex(startPx), 0, items.value.length);
    const endPx = scrollTop + viewportHeight.value + BUFFER_PX;
    const end = clamp(calculateIndex(endPx) + 1, start + 1, items.value.length);
    if (
      // Only update the side we're scrolling towards,
      // the other side will be updated incidentally
      (direction !== UP || start < first.value) && (direction !== DOWN || end > last.value)
    ) {
      const topOverflow = calculateOffset(first.value) - calculateOffset(start);
      const bottomOverflow = calculateOffset(end) - calculateOffset(last.value);
      const bufferOverflow = Math.max(topOverflow, bottomOverflow);
      if (bufferOverflow > BUFFER_PX) {
        first.value = start;
        last.value = end;
      } else {
        if (start <= 0) first.value = start;
        if (end >= items.value.length) last.value = end;
      }
    }
    paddingTop.value = calculateOffset(first.value);
    paddingBottom.value = calculateOffset(items.value.length) - calculateOffset(last.value);
  }
  function scrollToIndex(index) {
    const offset = calculateOffset(index);
    if (!containerRef.value || index && !offset) {
      targetScrollIndex = index;
    } else {
      containerRef.value.scrollTop = offset;
    }
  }
  const computedItems = computed(() => {
    return items.value.slice(first.value, last.value).map((item, index) => ({
      raw: item,
      index: index + first.value
    }));
  });
  watch(items, () => {
    sizes = Array.from({
      length: items.value.length
    });
    offsets = Array.from({
      length: items.value.length
    });
    updateOffsets.immediate();
    calculateVisibleItems();
  }, {
    deep: true
  });
  return {
    containerRef,
    markerRef,
    computedItems,
    paddingTop,
    paddingBottom,
    scrollToIndex,
    handleScroll,
    handleScrollend,
    handleItemResize
  };
}
function binaryClosest(arr, val) {
  let high = arr.length - 1;
  let low = 0;
  let mid = 0;
  let item = null;
  let target = -1;
  if (arr[high] < val) {
    return high;
  }
  while (low <= high) {
    mid = low + high >> 1;
    item = arr[mid];
    if (item > val) {
      high = mid - 1;
    } else if (item < val) {
      target = mid;
      low = mid + 1;
    } else if (item === val) {
      return mid;
    } else {
      return low;
    }
  }
  return target;
}
const makeVVirtualScrollProps = propsFactory({
  items: {
    type: Array,
    default: () => []
  },
  renderless: Boolean,
  ...makeVirtualProps(),
  ...makeComponentProps(),
  ...makeDimensionProps()
}, "VVirtualScroll");
const VVirtualScroll = genericComponent()({
  name: "VVirtualScroll",
  props: makeVVirtualScrollProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    getCurrentInstance("VVirtualScroll");
    const {
      dimensionStyles
    } = useDimension(props);
    const {
      containerRef,
      markerRef,
      handleScroll,
      handleScrollend,
      handleItemResize,
      scrollToIndex,
      paddingTop,
      paddingBottom,
      computedItems
    } = useVirtual(props, toRef(props, "items"));
    useToggleScope(() => props.renderless, () => {
      function handleListeners() {
        var _a, _b;
        let add = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : false;
        const method = add ? "addEventListener" : "removeEventListener";
        if (containerRef.value === (void 0).documentElement) {
          (void 0)[method]("scroll", handleScroll, {
            passive: true
          });
          (void 0)[method]("scrollend", handleScrollend);
        } else {
          (_a = containerRef.value) == null ? void 0 : _a[method]("scroll", handleScroll, {
            passive: true
          });
          (_b = containerRef.value) == null ? void 0 : _b[method]("scrollend", handleScrollend);
        }
      }
      onScopeDispose(handleListeners);
    });
    useRender(() => {
      const children = computedItems.value.map((item) => createVNode(VVirtualScrollItem, {
        "key": item.index,
        "renderless": props.renderless,
        "onUpdate:height": (height) => handleItemResize(item.index, height)
      }, {
        default: (slotProps) => {
          var _a;
          return (_a = slots.default) == null ? void 0 : _a.call(slots, {
            item: item.raw,
            index: item.index,
            ...slotProps
          });
        }
      }));
      return props.renderless ? createVNode(Fragment, null, [createVNode("div", {
        "ref": markerRef,
        "class": "v-virtual-scroll__spacer",
        "style": {
          paddingTop: convertToUnit(paddingTop.value)
        }
      }, null), children, createVNode("div", {
        "class": "v-virtual-scroll__spacer",
        "style": {
          paddingBottom: convertToUnit(paddingBottom.value)
        }
      }, null)]) : createVNode("div", {
        "ref": containerRef,
        "class": ["v-virtual-scroll", props.class],
        "onScrollPassive": handleScroll,
        "onScrollend": handleScrollend,
        "style": [dimensionStyles.value, props.style]
      }, [createVNode("div", {
        "ref": markerRef,
        "class": "v-virtual-scroll__container",
        "style": {
          paddingTop: convertToUnit(paddingTop.value),
          paddingBottom: convertToUnit(paddingBottom.value)
        }
      }, [children])]);
    });
    return {
      scrollToIndex
    };
  }
});
function useScrolling(listRef, textFieldRef) {
  const isScrolling = shallowRef(false);
  let scrollTimeout;
  function onListScroll(e) {
    cancelAnimationFrame(scrollTimeout);
    isScrolling.value = true;
    scrollTimeout = requestAnimationFrame(() => {
      scrollTimeout = requestAnimationFrame(() => {
        isScrolling.value = false;
      });
    });
  }
  async function finishScrolling() {
    await new Promise((resolve) => requestAnimationFrame(resolve));
    await new Promise((resolve) => requestAnimationFrame(resolve));
    await new Promise((resolve) => requestAnimationFrame(resolve));
    await new Promise((resolve) => {
      if (isScrolling.value) {
        const stop = watch(isScrolling, () => {
          stop();
          resolve();
        });
      } else resolve();
    });
  }
  async function onListKeydown(e) {
    var _a, _b;
    if (e.key === "Tab") {
      (_a = textFieldRef.value) == null ? void 0 : _a.focus();
    }
    if (!["PageDown", "PageUp", "Home", "End"].includes(e.key)) return;
    const el = (_b = listRef.value) == null ? void 0 : _b.$el;
    if (!el) return;
    if (e.key === "Home" || e.key === "End") {
      el.scrollTo({
        top: e.key === "Home" ? 0 : el.scrollHeight,
        behavior: "smooth"
      });
    }
    await finishScrolling();
    const children = el.querySelectorAll(":scope > :not(.v-virtual-scroll__spacer)");
    if (e.key === "PageDown" || e.key === "Home") {
      const top = el.getBoundingClientRect().top;
      for (const child of children) {
        if (child.getBoundingClientRect().top >= top) {
          child.focus();
          break;
        }
      }
    } else {
      const bottom = el.getBoundingClientRect().bottom;
      for (const child of [...children].reverse()) {
        if (child.getBoundingClientRect().bottom <= bottom) {
          child.focus();
          break;
        }
      }
    }
  }
  return {
    onListScroll,
    onListKeydown
  };
}
const makeSelectProps = propsFactory({
  chips: Boolean,
  closableChips: Boolean,
  closeText: {
    type: String,
    default: "$vuetify.close"
  },
  openText: {
    type: String,
    default: "$vuetify.open"
  },
  eager: Boolean,
  hideNoData: Boolean,
  hideSelected: Boolean,
  listProps: {
    type: Object
  },
  menu: Boolean,
  menuIcon: {
    type: IconValue,
    default: "$dropdown"
  },
  menuProps: {
    type: Object
  },
  multiple: Boolean,
  noDataText: {
    type: String,
    default: "$vuetify.noDataText"
  },
  openOnClear: Boolean,
  itemColor: String,
  ...makeItemsProps({
    itemChildren: false
  })
}, "Select");
const makeVSelectProps = propsFactory({
  ...makeSelectProps(),
  ...omit(makeVTextFieldProps({
    modelValue: null,
    role: "combobox"
  }), ["validationValue", "dirty", "appendInnerIcon"]),
  ...makeTransitionProps$1({
    transition: {
      component: VDialogTransition
    }
  })
}, "VSelect");
const VSelect = genericComponent()({
  name: "VSelect",
  props: makeVSelectProps(),
  emits: {
    "update:focused": (focused) => true,
    "update:modelValue": (value) => true,
    "update:menu": (ue) => true
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      t
    } = useLocale();
    const vTextFieldRef = ref();
    const vMenuRef = ref();
    const vVirtualScrollRef = ref();
    const _menu = useProxiedModel(props, "menu");
    const menu = computed({
      get: () => _menu.value,
      set: (v) => {
        var _a;
        if (_menu.value && !v && ((_a = vMenuRef.value) == null ? void 0 : _a.ΨopenChildren)) return;
        _menu.value = v;
      }
    });
    const {
      items,
      transformIn,
      transformOut
    } = useItems(props);
    const model = useProxiedModel(props, "modelValue", [], (v) => transformIn(v === null ? [null] : wrapInArray(v)), (v) => {
      const transformed = transformOut(v);
      return props.multiple ? transformed : transformed[0] ?? null;
    });
    const counterValue = computed(() => {
      return typeof props.counterValue === "function" ? props.counterValue(model.value) : typeof props.counterValue === "number" ? props.counterValue : model.value.length;
    });
    const form = useForm();
    const selectedValues = computed(() => model.value.map((selection) => selection.value));
    const isFocused = shallowRef(false);
    const label = computed(() => menu.value ? props.closeText : props.openText);
    let keyboardLookupPrefix = "";
    let keyboardLookupLastTime;
    const displayItems = computed(() => {
      if (props.hideSelected) {
        return items.value.filter((item) => !model.value.some((s) => props.valueComparator(s, item)));
      }
      return items.value;
    });
    const menuDisabled = computed(() => props.hideNoData && !displayItems.value.length || props.readonly || (form == null ? void 0 : form.isReadonly.value));
    const computedMenuProps = computed(() => {
      var _a;
      return {
        ...props.menuProps,
        activatorProps: {
          ...((_a = props.menuProps) == null ? void 0 : _a.activatorProps) || {},
          "aria-haspopup": "listbox"
          // Set aria-haspopup to 'listbox'
        }
      };
    });
    const listRef = ref();
    const {
      onListScroll,
      onListKeydown
    } = useScrolling(listRef, vTextFieldRef);
    function onClear(e) {
      if (props.openOnClear) {
        menu.value = true;
      }
    }
    function onMousedownControl() {
      if (menuDisabled.value) return;
      menu.value = !menu.value;
    }
    function onKeydown(e) {
      var _a, _b;
      if (!e.key || props.readonly || (form == null ? void 0 : form.isReadonly.value)) return;
      if (["Enter", " ", "ArrowDown", "ArrowUp", "Home", "End"].includes(e.key)) {
        e.preventDefault();
      }
      if (["Enter", "ArrowDown", " "].includes(e.key)) {
        menu.value = true;
      }
      if (["Escape", "Tab"].includes(e.key)) {
        menu.value = false;
      }
      if (e.key === "Home") {
        (_a = listRef.value) == null ? void 0 : _a.focus("first");
      } else if (e.key === "End") {
        (_b = listRef.value) == null ? void 0 : _b.focus("last");
      }
      const KEYBOARD_LOOKUP_THRESHOLD = 1e3;
      function checkPrintable(e2) {
        const isPrintableChar = e2.key.length === 1;
        const noModifier = !e2.ctrlKey && !e2.metaKey && !e2.altKey;
        return isPrintableChar && noModifier;
      }
      if (props.multiple || !checkPrintable(e)) return;
      const now = performance.now();
      if (now - keyboardLookupLastTime > KEYBOARD_LOOKUP_THRESHOLD) {
        keyboardLookupPrefix = "";
      }
      keyboardLookupPrefix += e.key.toLowerCase();
      keyboardLookupLastTime = now;
      const item = items.value.find((item2) => item2.title.toLowerCase().startsWith(keyboardLookupPrefix));
      if (item !== void 0) {
        model.value = [item];
        displayItems.value.indexOf(item);
      }
    }
    function select(item) {
      let set = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
      if (item.props.disabled) return;
      if (props.multiple) {
        const index = model.value.findIndex((selection) => props.valueComparator(selection.value, item.value));
        const add = set == null ? !~index : set;
        if (~index) {
          const value = add ? [...model.value, item] : [...model.value];
          value.splice(index, 1);
          model.value = value;
        } else if (add) {
          model.value = [...model.value, item];
        }
      } else {
        const add = set !== false;
        model.value = add ? [item] : [];
        nextTick(() => {
          menu.value = false;
        });
      }
    }
    function onBlur(e) {
      var _a;
      if (!((_a = listRef.value) == null ? void 0 : _a.$el.contains(e.relatedTarget))) {
        menu.value = false;
      }
    }
    function onAfterLeave() {
      var _a;
      if (isFocused.value) {
        (_a = vTextFieldRef.value) == null ? void 0 : _a.focus();
      }
    }
    function onFocusin(e) {
      isFocused.value = true;
    }
    function onModelUpdate(v) {
      if (v == null) model.value = [];
      else if (matchesSelector(vTextFieldRef.value) || matchesSelector(vTextFieldRef.value)) ; else if (vTextFieldRef.value) {
        vTextFieldRef.value.value = "";
      }
    }
    watch(menu, () => {
      if (!props.hideSelected && menu.value && model.value.length) {
        displayItems.value.findIndex((item) => model.value.some((s) => props.valueComparator(s.value, item.value)));
      }
    });
    watch(() => props.items, (newVal, oldVal) => {
      if (menu.value) return;
      if (isFocused.value && !oldVal.length && newVal.length) {
        menu.value = true;
      }
    });
    useRender(() => {
      const hasChips = !!(props.chips || slots.chip);
      const hasList = !!(!props.hideNoData || displayItems.value.length || slots["prepend-item"] || slots["append-item"] || slots["no-data"]);
      const isDirty = model.value.length > 0;
      const textFieldProps = VTextField.filterProps(props);
      const placeholder = isDirty || !isFocused.value && props.label && !props.persistentPlaceholder ? void 0 : props.placeholder;
      return createVNode(VTextField, mergeProps({
        "ref": vTextFieldRef
      }, textFieldProps, {
        "modelValue": model.value.map((v) => v.props.value).join(", "),
        "onUpdate:modelValue": onModelUpdate,
        "focused": isFocused.value,
        "onUpdate:focused": ($event) => isFocused.value = $event,
        "validationValue": model.externalValue,
        "counterValue": counterValue.value,
        "dirty": isDirty,
        "class": ["v-select", {
          "v-select--active-menu": menu.value,
          "v-select--chips": !!props.chips,
          [`v-select--${props.multiple ? "multiple" : "single"}`]: true,
          "v-select--selected": model.value.length,
          "v-select--selection-slot": !!slots.selection
        }, props.class],
        "style": props.style,
        "inputmode": "none",
        "placeholder": placeholder,
        "onClick:clear": onClear,
        "onMousedown:control": onMousedownControl,
        "onBlur": onBlur,
        "onKeydown": onKeydown,
        "aria-label": t(label.value),
        "title": t(label.value)
      }), {
        ...slots,
        default: () => createVNode(Fragment, null, [createVNode(VMenu, mergeProps({
          "ref": vMenuRef,
          "modelValue": menu.value,
          "onUpdate:modelValue": ($event) => menu.value = $event,
          "activator": "parent",
          "contentClass": "v-select__content",
          "disabled": menuDisabled.value,
          "eager": props.eager,
          "maxHeight": 310,
          "openOnClick": false,
          "closeOnContentClick": false,
          "transition": props.transition,
          "onAfterLeave": onAfterLeave
        }, computedMenuProps.value), {
          default: () => [hasList && createVNode(VList, mergeProps({
            "ref": listRef,
            "selected": selectedValues.value,
            "selectStrategy": props.multiple ? "independent" : "single-independent",
            "onMousedown": (e) => e.preventDefault(),
            "onKeydown": onListKeydown,
            "onFocusin": onFocusin,
            "onScrollPassive": onListScroll,
            "tabindex": "-1",
            "aria-live": "polite",
            "color": props.itemColor ?? props.color
          }, props.listProps), {
            default: () => {
              var _a, _b, _c;
              return [(_a = slots["prepend-item"]) == null ? void 0 : _a.call(slots), !displayItems.value.length && !props.hideNoData && (((_b = slots["no-data"]) == null ? void 0 : _b.call(slots)) ?? createVNode(VListItem, {
                "title": t(props.noDataText)
              }, null)), createVNode(VVirtualScroll, {
                "ref": vVirtualScrollRef,
                "renderless": true,
                "items": displayItems.value
              }, {
                default: (_ref2) => {
                  var _a2;
                  let {
                    item,
                    index,
                    itemRef
                  } = _ref2;
                  const itemProps = mergeProps(item.props, {
                    ref: itemRef,
                    key: index,
                    onClick: () => select(item, null)
                  });
                  return ((_a2 = slots.item) == null ? void 0 : _a2.call(slots, {
                    item,
                    index,
                    props: itemProps
                  })) ?? createVNode(VListItem, mergeProps(itemProps, {
                    "role": "option"
                  }), {
                    prepend: (_ref3) => {
                      let {
                        isSelected
                      } = _ref3;
                      return createVNode(Fragment, null, [props.multiple && !props.hideSelected ? createVNode(VCheckboxBtn, {
                        "key": item.value,
                        "modelValue": isSelected,
                        "ripple": false,
                        "tabindex": "-1"
                      }, null) : void 0, item.props.prependAvatar && createVNode(VAvatar, {
                        "image": item.props.prependAvatar
                      }, null), item.props.prependIcon && createVNode(VIcon, {
                        "icon": item.props.prependIcon
                      }, null)]);
                    }
                  });
                }
              }), (_c = slots["append-item"]) == null ? void 0 : _c.call(slots)];
            }
          })]
        }), model.value.map((item, index) => {
          function onChipClose(e) {
            e.stopPropagation();
            e.preventDefault();
            select(item, false);
          }
          const slotProps = {
            "onClick:close": onChipClose,
            onKeydown(e) {
              if (e.key !== "Enter" && e.key !== " ") return;
              e.preventDefault();
              e.stopPropagation();
              onChipClose(e);
            },
            onMousedown(e) {
              e.preventDefault();
              e.stopPropagation();
            },
            modelValue: true,
            "onUpdate:modelValue": void 0
          };
          const hasSlot = hasChips ? !!slots.chip : !!slots.selection;
          const slotContent = hasSlot ? ensureValidVNode(hasChips ? slots.chip({
            item,
            index,
            props: slotProps
          }) : slots.selection({
            item,
            index
          })) : void 0;
          if (hasSlot && !slotContent) return void 0;
          return createVNode("div", {
            "key": item.value,
            "class": "v-select__selection"
          }, [hasChips ? !slots.chip ? createVNode(VChip, mergeProps({
            "key": "chip",
            "closable": props.closableChips,
            "size": "small",
            "text": item.title,
            "disabled": item.props.disabled
          }, slotProps), null) : createVNode(VDefaultsProvider, {
            "key": "chip-defaults",
            "defaults": {
              VChip: {
                closable: props.closableChips,
                size: "small",
                text: item.title
              }
            }
          }, {
            default: () => [slotContent]
          }) : slotContent ?? createVNode("span", {
            "class": "v-select__selection-text"
          }, [item.title, props.multiple && index < model.value.length - 1 && createVNode("span", {
            "class": "v-select__selection-comma"
          }, [createTextVNode(",")])])]);
        })]),
        "append-inner": function() {
          var _a;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          return createVNode(Fragment, null, [(_a = slots["append-inner"]) == null ? void 0 : _a.call(slots, ...args), props.menuIcon ? createVNode(VIcon, {
            "class": "v-select__menu-icon",
            "icon": props.menuIcon
          }, null) : void 0]);
        }
      });
    });
    return forwardRefs({
      isFocused,
      menu,
      select
    }, vTextFieldRef);
  }
});
const defaultFilter = (value, query, item) => {
  if (value == null || query == null) return -1;
  return value.toString().toLocaleLowerCase().indexOf(query.toString().toLocaleLowerCase());
};
const makeFilterProps = propsFactory({
  customFilter: Function,
  customKeyFilter: Object,
  filterKeys: [Array, String],
  filterMode: {
    type: String,
    default: "intersection"
  },
  noFilter: Boolean
}, "filter");
function filterItems(items, query, options) {
  var _a;
  const array = [];
  const filter = (options == null ? void 0 : options.default) ?? defaultFilter;
  const keys2 = (options == null ? void 0 : options.filterKeys) ? wrapInArray(options.filterKeys) : false;
  const customFiltersLength = Object.keys((options == null ? void 0 : options.customKeyFilter) ?? {}).length;
  if (!(items == null ? void 0 : items.length)) return array;
  loop: for (let i = 0; i < items.length; i++) {
    const [item, transformed = item] = wrapInArray(items[i]);
    const customMatches = {};
    const defaultMatches = {};
    let match = -1;
    if ((query || customFiltersLength > 0) && !(options == null ? void 0 : options.noFilter)) {
      if (typeof item === "object") {
        const filterKeys = keys2 || Object.keys(transformed);
        for (const key of filterKeys) {
          const value = getPropertyFromItem(transformed, key);
          const keyFilter = (_a = options == null ? void 0 : options.customKeyFilter) == null ? void 0 : _a[key];
          match = keyFilter ? keyFilter(value, query, item) : filter(value, query, item);
          if (match !== -1 && match !== false) {
            if (keyFilter) customMatches[key] = match;
            else defaultMatches[key] = match;
          } else if ((options == null ? void 0 : options.filterMode) === "every") {
            continue loop;
          }
        }
      } else {
        match = filter(item, query, item);
        if (match !== -1 && match !== false) {
          defaultMatches.title = match;
        }
      }
      const defaultMatchesLength = Object.keys(defaultMatches).length;
      const customMatchesLength = Object.keys(customMatches).length;
      if (!defaultMatchesLength && !customMatchesLength) continue;
      if ((options == null ? void 0 : options.filterMode) === "union" && customMatchesLength !== customFiltersLength && !defaultMatchesLength) continue;
      if ((options == null ? void 0 : options.filterMode) === "intersection" && (customMatchesLength !== customFiltersLength || !defaultMatchesLength)) continue;
    }
    array.push({
      index: i,
      matches: {
        ...defaultMatches,
        ...customMatches
      }
    });
  }
  return array;
}
function useFilter(props, items, query, options) {
  const filteredItems = ref([]);
  const filteredMatches = ref(/* @__PURE__ */ new Map());
  const transformedItems = computed(() => (options == null ? void 0 : options.transform) ? unref(items).map((item) => [item, options.transform(item)]) : unref(items));
  watchEffect(() => {
    const _query = typeof query === "function" ? query() : unref(query);
    const strQuery = typeof _query !== "string" && typeof _query !== "number" ? "" : String(_query);
    const results = filterItems(transformedItems.value, strQuery, {
      customKeyFilter: {
        ...props.customKeyFilter,
        ...unref(options == null ? void 0 : options.customKeyFilter)
      },
      default: props.customFilter,
      filterKeys: props.filterKeys,
      filterMode: props.filterMode,
      noFilter: props.noFilter
    });
    const originalItems = unref(items);
    const _filteredItems = [];
    const _filteredMatches = /* @__PURE__ */ new Map();
    results.forEach((_ref) => {
      let {
        index,
        matches
      } = _ref;
      const item = originalItems[index];
      _filteredItems.push(item);
      _filteredMatches.set(item.value, matches);
    });
    filteredItems.value = _filteredItems;
    filteredMatches.value = _filteredMatches;
  });
  function getMatches(item) {
    return filteredMatches.value.get(item.value);
  }
  return {
    filteredItems,
    filteredMatches,
    getMatches
  };
}
const makeDataTableExpandProps = propsFactory({
  expandOnClick: Boolean,
  showExpand: Boolean,
  expanded: {
    type: Array,
    default: () => []
  }
}, "DataTable-expand");
const VDataTableExpandedKey = Symbol.for("vuetify:datatable:expanded");
function provideExpanded(props) {
  const expandOnClick = toRef(props, "expandOnClick");
  const expanded = useProxiedModel(props, "expanded", props.expanded, (v) => {
    return new Set(v);
  }, (v) => {
    return [...v.values()];
  });
  function expand(item, value) {
    const newExpanded = new Set(expanded.value);
    if (!value) {
      newExpanded.delete(item.value);
    } else {
      newExpanded.add(item.value);
    }
    expanded.value = newExpanded;
  }
  function isExpanded(item) {
    return expanded.value.has(item.value);
  }
  function toggleExpand(item) {
    expand(item, !isExpanded(item));
  }
  const data = {
    expand,
    expanded,
    expandOnClick,
    isExpanded,
    toggleExpand
  };
  provide(VDataTableExpandedKey, data);
  return data;
}
function useExpanded() {
  const data = inject$1(VDataTableExpandedKey);
  if (!data) throw new Error("foo");
  return data;
}
const makeDataTableGroupProps = propsFactory({
  groupBy: {
    type: Array,
    default: () => []
  }
}, "DataTable-group");
const VDataTableGroupSymbol = Symbol.for("vuetify:data-table-group");
function createGroupBy(props) {
  const groupBy = useProxiedModel(props, "groupBy");
  return {
    groupBy
  };
}
function provideGroupBy(options) {
  const {
    groupBy,
    sortBy
  } = options;
  const opened = ref(/* @__PURE__ */ new Set());
  const sortByWithGroups = computed(() => {
    return groupBy.value.map((val) => ({
      ...val,
      order: val.order ?? false
    })).concat(sortBy.value);
  });
  function isGroupOpen(group) {
    return opened.value.has(group.id);
  }
  function toggleGroup(group) {
    const newOpened = new Set(opened.value);
    if (!isGroupOpen(group)) newOpened.add(group.id);
    else newOpened.delete(group.id);
    opened.value = newOpened;
  }
  function extractRows(items) {
    function dive(group) {
      const arr = [];
      for (const item of group.items) {
        if ("type" in item && item.type === "group") {
          arr.push(...dive(item));
        } else {
          arr.push(item);
        }
      }
      return arr;
    }
    return dive({
      type: "group",
      items,
      id: "dummy",
      key: "dummy",
      value: "dummy",
      depth: 0
    });
  }
  const data = {
    sortByWithGroups,
    toggleGroup,
    opened,
    groupBy,
    extractRows,
    isGroupOpen
  };
  provide(VDataTableGroupSymbol, data);
  return data;
}
function useGroupBy() {
  const data = inject$1(VDataTableGroupSymbol);
  if (!data) throw new Error("Missing group!");
  return data;
}
function groupItemsByProperty(items, groupBy) {
  if (!items.length) return [];
  const groups = /* @__PURE__ */ new Map();
  for (const item of items) {
    const value = getObjectValueByPath(item.raw, groupBy);
    if (!groups.has(value)) {
      groups.set(value, []);
    }
    groups.get(value).push(item);
  }
  return groups;
}
function groupItems(items, groupBy) {
  let depth = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 0;
  let prefix = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : "root";
  if (!groupBy.length) return [];
  const groupedItems = groupItemsByProperty(items, groupBy[0]);
  const groups = [];
  const rest = groupBy.slice(1);
  groupedItems.forEach((items2, value) => {
    const key = groupBy[0];
    const id = `${prefix}_${key}_${value}`;
    groups.push({
      depth,
      id,
      key,
      value,
      items: rest.length ? groupItems(items2, rest, depth + 1, id) : items2,
      type: "group"
    });
  });
  return groups;
}
function flattenItems(items, opened) {
  const flatItems = [];
  for (const item of items) {
    if ("type" in item && item.type === "group") {
      if (item.value != null) {
        flatItems.push(item);
      }
      if (opened.has(item.id) || item.value == null) {
        flatItems.push(...flattenItems(item.items, opened));
      }
    } else {
      flatItems.push(item);
    }
  }
  return flatItems;
}
function useGroupedItems(items, groupBy, opened) {
  const flatItems = computed(() => {
    if (!groupBy.value.length) return items.value;
    const groupedItems = groupItems(items.value, groupBy.value.map((item) => item.key));
    return flattenItems(groupedItems, opened.value);
  });
  return {
    flatItems
  };
}
function useOptions(_ref) {
  let {
    page,
    itemsPerPage,
    sortBy,
    groupBy,
    search
  } = _ref;
  const vm = getCurrentInstance("VDataTable");
  const options = computed(() => ({
    page: page.value,
    itemsPerPage: itemsPerPage.value,
    sortBy: sortBy.value,
    groupBy: groupBy.value,
    search: search.value
  }));
  let oldOptions = null;
  watch(options, () => {
    if (deepEqual(oldOptions, options.value)) return;
    if (oldOptions && oldOptions.search !== options.value.search) {
      page.value = 1;
    }
    vm.emit("update:options", options.value);
    oldOptions = options.value;
  }, {
    deep: true,
    immediate: true
  });
}
const makeDataTablePaginateProps = propsFactory({
  page: {
    type: [Number, String],
    default: 1
  },
  itemsPerPage: {
    type: [Number, String],
    default: 10
  }
}, "DataTable-paginate");
const VDataTablePaginationSymbol = Symbol.for("vuetify:data-table-pagination");
function createPagination(props) {
  const page = useProxiedModel(props, "page", void 0, (value) => +(value ?? 1));
  const itemsPerPage = useProxiedModel(props, "itemsPerPage", void 0, (value) => +(value ?? 10));
  return {
    page,
    itemsPerPage
  };
}
function providePagination(options) {
  const {
    page,
    itemsPerPage,
    itemsLength
  } = options;
  const startIndex = computed(() => {
    if (itemsPerPage.value === -1) return 0;
    return itemsPerPage.value * (page.value - 1);
  });
  const stopIndex = computed(() => {
    if (itemsPerPage.value === -1) return itemsLength.value;
    return Math.min(itemsLength.value, startIndex.value + itemsPerPage.value);
  });
  const pageCount = computed(() => {
    if (itemsPerPage.value === -1 || itemsLength.value === 0) return 1;
    return Math.ceil(itemsLength.value / itemsPerPage.value);
  });
  watchEffect(() => {
    if (page.value > pageCount.value) {
      page.value = pageCount.value;
    }
  });
  function setItemsPerPage(value) {
    itemsPerPage.value = value;
    page.value = 1;
  }
  function nextPage() {
    page.value = clamp(page.value + 1, 1, pageCount.value);
  }
  function prevPage() {
    page.value = clamp(page.value - 1, 1, pageCount.value);
  }
  function setPage(value) {
    page.value = clamp(value, 1, pageCount.value);
  }
  const data = {
    page,
    itemsPerPage,
    startIndex,
    stopIndex,
    pageCount,
    itemsLength,
    nextPage,
    prevPage,
    setPage,
    setItemsPerPage
  };
  provide(VDataTablePaginationSymbol, data);
  return data;
}
function usePagination() {
  const data = inject$1(VDataTablePaginationSymbol);
  if (!data) throw new Error("Missing pagination!");
  return data;
}
function usePaginatedItems(options) {
  const vm = getCurrentInstance("usePaginatedItems");
  const {
    items,
    startIndex,
    stopIndex,
    itemsPerPage
  } = options;
  const paginatedItems = computed(() => {
    if (itemsPerPage.value <= 0) return items.value;
    return items.value.slice(startIndex.value, stopIndex.value);
  });
  watch(paginatedItems, (val) => {
    vm.emit("update:currentItems", val);
  });
  return {
    paginatedItems
  };
}
const singleSelectStrategy = {
  showSelectAll: false,
  allSelected: () => [],
  select: (_ref) => {
    var _a;
    let {
      items,
      value
    } = _ref;
    return new Set(value ? [(_a = items[0]) == null ? void 0 : _a.value] : []);
  },
  selectAll: (_ref2) => {
    let {
      selected
    } = _ref2;
    return selected;
  }
};
const pageSelectStrategy = {
  showSelectAll: true,
  allSelected: (_ref3) => {
    let {
      currentPage
    } = _ref3;
    return currentPage;
  },
  select: (_ref4) => {
    let {
      items,
      value,
      selected
    } = _ref4;
    for (const item of items) {
      if (value) selected.add(item.value);
      else selected.delete(item.value);
    }
    return selected;
  },
  selectAll: (_ref5) => {
    let {
      value,
      currentPage,
      selected
    } = _ref5;
    return pageSelectStrategy.select({
      items: currentPage,
      value,
      selected
    });
  }
};
const allSelectStrategy = {
  showSelectAll: true,
  allSelected: (_ref6) => {
    let {
      allItems
    } = _ref6;
    return allItems;
  },
  select: (_ref7) => {
    let {
      items,
      value,
      selected
    } = _ref7;
    for (const item of items) {
      if (value) selected.add(item.value);
      else selected.delete(item.value);
    }
    return selected;
  },
  selectAll: (_ref8) => {
    let {
      value,
      allItems,
      selected
    } = _ref8;
    return allSelectStrategy.select({
      items: allItems,
      value,
      selected
    });
  }
};
const makeDataTableSelectProps = propsFactory({
  showSelect: Boolean,
  selectStrategy: {
    type: [String, Object],
    default: "page"
  },
  modelValue: {
    type: Array,
    default: () => []
  },
  valueComparator: {
    type: Function,
    default: deepEqual
  }
}, "DataTable-select");
const VDataTableSelectionSymbol = Symbol.for("vuetify:data-table-selection");
function provideSelection(props, _ref9) {
  let {
    allItems,
    currentPage
  } = _ref9;
  const selected = useProxiedModel(props, "modelValue", props.modelValue, (v) => {
    return new Set(wrapInArray(v).map((v2) => {
      var _a;
      return ((_a = allItems.value.find((item) => props.valueComparator(v2, item.value))) == null ? void 0 : _a.value) ?? v2;
    }));
  }, (v) => {
    return [...v.values()];
  });
  const allSelectable = computed(() => allItems.value.filter((item) => item.selectable));
  const currentPageSelectable = computed(() => currentPage.value.filter((item) => item.selectable));
  const selectStrategy = computed(() => {
    if (typeof props.selectStrategy === "object") return props.selectStrategy;
    switch (props.selectStrategy) {
      case "single":
        return singleSelectStrategy;
      case "all":
        return allSelectStrategy;
      case "page":
      default:
        return pageSelectStrategy;
    }
  });
  function isSelected(items) {
    return wrapInArray(items).every((item) => selected.value.has(item.value));
  }
  function isSomeSelected(items) {
    return wrapInArray(items).some((item) => selected.value.has(item.value));
  }
  function select(items, value) {
    const newSelected = selectStrategy.value.select({
      items,
      value,
      selected: new Set(selected.value)
    });
    selected.value = newSelected;
  }
  function toggleSelect(item) {
    select([item], !isSelected([item]));
  }
  function selectAll(value) {
    const newSelected = selectStrategy.value.selectAll({
      value,
      allItems: allSelectable.value,
      currentPage: currentPageSelectable.value,
      selected: new Set(selected.value)
    });
    selected.value = newSelected;
  }
  const someSelected = computed(() => selected.value.size > 0);
  const allSelected = computed(() => {
    const items = selectStrategy.value.allSelected({
      allItems: allSelectable.value,
      currentPage: currentPageSelectable.value
    });
    return !!items.length && isSelected(items);
  });
  const showSelectAll = computed(() => selectStrategy.value.showSelectAll);
  const data = {
    toggleSelect,
    select,
    selectAll,
    isSelected,
    isSomeSelected,
    someSelected,
    allSelected,
    showSelectAll
  };
  provide(VDataTableSelectionSymbol, data);
  return data;
}
function useSelection() {
  const data = inject$1(VDataTableSelectionSymbol);
  if (!data) throw new Error("Missing selection!");
  return data;
}
const makeDataTableSortProps = propsFactory({
  sortBy: {
    type: Array,
    default: () => []
  },
  customKeySort: Object,
  multiSort: Boolean,
  mustSort: Boolean
}, "DataTable-sort");
const VDataTableSortSymbol = Symbol.for("vuetify:data-table-sort");
function createSort(props) {
  const sortBy = useProxiedModel(props, "sortBy");
  const mustSort = toRef(props, "mustSort");
  const multiSort = toRef(props, "multiSort");
  return {
    sortBy,
    mustSort,
    multiSort
  };
}
function provideSort(options) {
  const {
    sortBy,
    mustSort,
    multiSort,
    page
  } = options;
  const toggleSort = (column) => {
    if (column.key == null) return;
    let newSortBy = sortBy.value.map((x) => ({
      ...x
    })) ?? [];
    const item = newSortBy.find((x) => x.key === column.key);
    if (!item) {
      if (multiSort.value) newSortBy = [...newSortBy, {
        key: column.key,
        order: "asc"
      }];
      else newSortBy = [{
        key: column.key,
        order: "asc"
      }];
    } else if (item.order === "desc") {
      if (mustSort.value) {
        item.order = "asc";
      } else {
        newSortBy = newSortBy.filter((x) => x.key !== column.key);
      }
    } else {
      item.order = "desc";
    }
    sortBy.value = newSortBy;
    if (page) page.value = 1;
  };
  function isSorted(column) {
    return !!sortBy.value.find((item) => item.key === column.key);
  }
  const data = {
    sortBy,
    toggleSort,
    isSorted
  };
  provide(VDataTableSortSymbol, data);
  return data;
}
function useSort() {
  const data = inject$1(VDataTableSortSymbol);
  if (!data) throw new Error("Missing sort!");
  return data;
}
function useSortedItems(props, items, sortBy, options) {
  const locale = useLocale();
  const sortedItems = computed(() => {
    var _a, _b;
    if (!sortBy.value.length || props.disableSort) return items.value;
    return sortItems(items.value, sortBy.value, locale.current.value, {
      transform: options == null ? void 0 : options.transform,
      sortFunctions: {
        ...props.customKeySort,
        ...(_a = options == null ? void 0 : options.sortFunctions) == null ? void 0 : _a.value
      },
      sortRawFunctions: (_b = options == null ? void 0 : options.sortRawFunctions) == null ? void 0 : _b.value
    });
  });
  return {
    sortedItems
  };
}
function sortItems(items, sortByItems, locale, options) {
  const stringCollator = new Intl.Collator(locale, {
    sensitivity: "accent",
    usage: "sort"
  });
  const transformedItems = items.map((item) => [item, (options == null ? void 0 : options.transform) ? options.transform(item) : item]);
  return transformedItems.sort((a, b) => {
    var _a, _b;
    for (let i = 0; i < sortByItems.length; i++) {
      let hasCustomResult = false;
      const sortKey = sortByItems[i].key;
      const sortOrder = sortByItems[i].order ?? "asc";
      if (sortOrder === false) continue;
      let sortA = a[1][sortKey];
      let sortB = b[1][sortKey];
      let sortARaw = a[0].raw;
      let sortBRaw = b[0].raw;
      if (sortOrder === "desc") {
        [sortA, sortB] = [sortB, sortA];
        [sortARaw, sortBRaw] = [sortBRaw, sortARaw];
      }
      if ((_a = options == null ? void 0 : options.sortRawFunctions) == null ? void 0 : _a[sortKey]) {
        const customResult = options.sortRawFunctions[sortKey](sortARaw, sortBRaw);
        if (customResult == null) continue;
        hasCustomResult = true;
        if (customResult) return customResult;
      }
      if ((_b = options == null ? void 0 : options.sortFunctions) == null ? void 0 : _b[sortKey]) {
        const customResult = options.sortFunctions[sortKey](sortA, sortB);
        if (customResult == null) continue;
        hasCustomResult = true;
        if (customResult) return customResult;
      }
      if (hasCustomResult) continue;
      if (sortA instanceof Date && sortB instanceof Date) {
        return sortA.getTime() - sortB.getTime();
      }
      [sortA, sortB] = [sortA, sortB].map((s) => s != null ? s.toString().toLocaleLowerCase() : s);
      if (sortA !== sortB) {
        if (isEmpty(sortA) && isEmpty(sortB)) return 0;
        if (isEmpty(sortA)) return -1;
        if (isEmpty(sortB)) return 1;
        if (!isNaN(sortA) && !isNaN(sortB)) return Number(sortA) - Number(sortB);
        return stringCollator.compare(sortA, sortB);
      }
    }
    return 0;
  }).map((_ref) => {
    let [item] = _ref;
    return item;
  });
}
function useRefs() {
  const refs = ref([]);
  function updateRef(e, i) {
    refs.value[i] = e;
  }
  return {
    refs,
    updateRef
  };
}
const makeVPaginationProps = propsFactory({
  activeColor: String,
  start: {
    type: [Number, String],
    default: 1
  },
  modelValue: {
    type: Number,
    default: (props) => props.start
  },
  disabled: Boolean,
  length: {
    type: [Number, String],
    default: 1,
    validator: (val) => val % 1 === 0
  },
  totalVisible: [Number, String],
  firstIcon: {
    type: IconValue,
    default: "$first"
  },
  prevIcon: {
    type: IconValue,
    default: "$prev"
  },
  nextIcon: {
    type: IconValue,
    default: "$next"
  },
  lastIcon: {
    type: IconValue,
    default: "$last"
  },
  ariaLabel: {
    type: String,
    default: "$vuetify.pagination.ariaLabel.root"
  },
  pageAriaLabel: {
    type: String,
    default: "$vuetify.pagination.ariaLabel.page"
  },
  currentPageAriaLabel: {
    type: String,
    default: "$vuetify.pagination.ariaLabel.currentPage"
  },
  firstAriaLabel: {
    type: String,
    default: "$vuetify.pagination.ariaLabel.first"
  },
  previousAriaLabel: {
    type: String,
    default: "$vuetify.pagination.ariaLabel.previous"
  },
  nextAriaLabel: {
    type: String,
    default: "$vuetify.pagination.ariaLabel.next"
  },
  lastAriaLabel: {
    type: String,
    default: "$vuetify.pagination.ariaLabel.last"
  },
  ellipsis: {
    type: String,
    default: "..."
  },
  showFirstLastPage: Boolean,
  ...makeBorderProps(),
  ...makeComponentProps(),
  ...makeDensityProps(),
  ...makeElevationProps(),
  ...makeRoundedProps(),
  ...makeSizeProps(),
  ...makeTagProps({
    tag: "nav"
  }),
  ...makeThemeProps(),
  ...makeVariantProps({
    variant: "text"
  })
}, "VPagination");
const VPagination = genericComponent()({
  name: "VPagination",
  props: makeVPaginationProps(),
  emits: {
    "update:modelValue": (value) => true,
    first: (value) => true,
    prev: (value) => true,
    next: (value) => true,
    last: (value) => true
  },
  setup(props, _ref) {
    let {
      slots,
      emit
    } = _ref;
    const page = useProxiedModel(props, "modelValue");
    const {
      t,
      n
    } = useLocale();
    const {
      isRtl
    } = useRtl();
    const {
      themeClasses
    } = provideTheme(props);
    const {
      width
    } = useDisplay();
    const maxButtons = shallowRef(-1);
    provideDefaults(void 0, {
      scoped: true
    });
    const {
      resizeRef
    } = useResizeObserver();
    const length = computed(() => parseInt(props.length, 10));
    const start = computed(() => parseInt(props.start, 10));
    const totalVisible = computed(() => {
      if (props.totalVisible != null) return parseInt(props.totalVisible, 10);
      else if (maxButtons.value >= 0) return maxButtons.value;
      return getMax(width.value, 58);
    });
    function getMax(totalWidth, itemWidth) {
      const minButtons = props.showFirstLastPage ? 5 : 3;
      return Math.max(0, Math.floor(
        // Round to two decimal places to avoid floating point errors
        +((totalWidth - itemWidth * minButtons) / itemWidth).toFixed(2)
      ));
    }
    const range = computed(() => {
      if (length.value <= 0 || isNaN(length.value) || length.value > Number.MAX_SAFE_INTEGER) return [];
      if (totalVisible.value <= 0) return [];
      else if (totalVisible.value === 1) return [page.value];
      if (length.value <= totalVisible.value) {
        return createRange(length.value, start.value);
      }
      const even = totalVisible.value % 2 === 0;
      const middle = even ? totalVisible.value / 2 : Math.floor(totalVisible.value / 2);
      const left = even ? middle : middle + 1;
      const right = length.value - middle;
      if (left - page.value >= 0) {
        return [...createRange(Math.max(1, totalVisible.value - 1), start.value), props.ellipsis, length.value];
      } else if (page.value - right >= (even ? 1 : 0)) {
        const rangeLength = totalVisible.value - 1;
        const rangeStart = length.value - rangeLength + start.value;
        return [start.value, props.ellipsis, ...createRange(rangeLength, rangeStart)];
      } else {
        const rangeLength = Math.max(1, totalVisible.value - 3);
        const rangeStart = rangeLength === 1 ? page.value : page.value - Math.ceil(rangeLength / 2) + start.value;
        return [start.value, props.ellipsis, ...createRange(rangeLength, rangeStart), props.ellipsis, length.value];
      }
    });
    function setValue(e, value, event) {
      e.preventDefault();
      page.value = value;
      event && emit(event, value);
    }
    const {
      refs,
      updateRef
    } = useRefs();
    provideDefaults({
      VPaginationBtn: {
        color: toRef(props, "color"),
        border: toRef(props, "border"),
        density: toRef(props, "density"),
        size: toRef(props, "size"),
        variant: toRef(props, "variant"),
        rounded: toRef(props, "rounded"),
        elevation: toRef(props, "elevation")
      }
    });
    const items = computed(() => {
      return range.value.map((item, index) => {
        const ref2 = (e) => updateRef(e, index);
        if (typeof item === "string") {
          return {
            isActive: false,
            key: `ellipsis-${index}`,
            page: item,
            props: {
              ref: ref2,
              ellipsis: true,
              icon: true,
              disabled: true
            }
          };
        } else {
          const isActive = item === page.value;
          return {
            isActive,
            key: item,
            page: n(item),
            props: {
              ref: ref2,
              ellipsis: false,
              icon: true,
              disabled: !!props.disabled || +props.length < 2,
              color: isActive ? props.activeColor : props.color,
              "aria-current": isActive,
              "aria-label": t(isActive ? props.currentPageAriaLabel : props.pageAriaLabel, item),
              onClick: (e) => setValue(e, item)
            }
          };
        }
      });
    });
    const controls = computed(() => {
      const prevDisabled = !!props.disabled || page.value <= start.value;
      const nextDisabled = !!props.disabled || page.value >= start.value + length.value - 1;
      return {
        first: props.showFirstLastPage ? {
          icon: isRtl.value ? props.lastIcon : props.firstIcon,
          onClick: (e) => setValue(e, start.value, "first"),
          disabled: prevDisabled,
          "aria-label": t(props.firstAriaLabel),
          "aria-disabled": prevDisabled
        } : void 0,
        prev: {
          icon: isRtl.value ? props.nextIcon : props.prevIcon,
          onClick: (e) => setValue(e, page.value - 1, "prev"),
          disabled: prevDisabled,
          "aria-label": t(props.previousAriaLabel),
          "aria-disabled": prevDisabled
        },
        next: {
          icon: isRtl.value ? props.prevIcon : props.nextIcon,
          onClick: (e) => setValue(e, page.value + 1, "next"),
          disabled: nextDisabled,
          "aria-label": t(props.nextAriaLabel),
          "aria-disabled": nextDisabled
        },
        last: props.showFirstLastPage ? {
          icon: isRtl.value ? props.firstIcon : props.lastIcon,
          onClick: (e) => setValue(e, start.value + length.value - 1, "last"),
          disabled: nextDisabled,
          "aria-label": t(props.lastAriaLabel),
          "aria-disabled": nextDisabled
        } : void 0
      };
    });
    function updateFocus() {
      var _a;
      const currentIndex = page.value - start.value;
      (_a = refs.value[currentIndex]) == null ? void 0 : _a.$el.focus();
    }
    function onKeydown(e) {
      if (e.key === keyValues.left && !props.disabled && page.value > +props.start) {
        page.value = page.value - 1;
        nextTick(updateFocus);
      } else if (e.key === keyValues.right && !props.disabled && page.value < start.value + length.value - 1) {
        page.value = page.value + 1;
        nextTick(updateFocus);
      }
    }
    useRender(() => createVNode(props.tag, {
      "ref": resizeRef,
      "class": ["v-pagination", themeClasses.value, props.class],
      "style": props.style,
      "role": "navigation",
      "aria-label": t(props.ariaLabel),
      "onKeydown": onKeydown,
      "data-test": "v-pagination-root"
    }, {
      default: () => [createVNode("ul", {
        "class": "v-pagination__list"
      }, [props.showFirstLastPage && createVNode("li", {
        "key": "first",
        "class": "v-pagination__first",
        "data-test": "v-pagination-first"
      }, [slots.first ? slots.first(controls.value.first) : createVNode(VBtn, mergeProps({
        "_as": "VPaginationBtn"
      }, controls.value.first), null)]), createVNode("li", {
        "key": "prev",
        "class": "v-pagination__prev",
        "data-test": "v-pagination-prev"
      }, [slots.prev ? slots.prev(controls.value.prev) : createVNode(VBtn, mergeProps({
        "_as": "VPaginationBtn"
      }, controls.value.prev), null)]), items.value.map((item, index) => createVNode("li", {
        "key": item.key,
        "class": ["v-pagination__item", {
          "v-pagination__item--is-active": item.isActive
        }],
        "data-test": "v-pagination-item"
      }, [slots.item ? slots.item(item) : createVNode(VBtn, mergeProps({
        "_as": "VPaginationBtn"
      }, item.props), {
        default: () => [item.page]
      })])), createVNode("li", {
        "key": "next",
        "class": "v-pagination__next",
        "data-test": "v-pagination-next"
      }, [slots.next ? slots.next(controls.value.next) : createVNode(VBtn, mergeProps({
        "_as": "VPaginationBtn"
      }, controls.value.next), null)]), props.showFirstLastPage && createVNode("li", {
        "key": "last",
        "class": "v-pagination__last",
        "data-test": "v-pagination-last"
      }, [slots.last ? slots.last(controls.value.last) : createVNode(VBtn, mergeProps({
        "_as": "VPaginationBtn"
      }, controls.value.last), null)])])]
    }));
    return {};
  }
});
const makeVDataTableFooterProps = propsFactory({
  prevIcon: {
    type: String,
    default: "$prev"
  },
  nextIcon: {
    type: String,
    default: "$next"
  },
  firstIcon: {
    type: String,
    default: "$first"
  },
  lastIcon: {
    type: String,
    default: "$last"
  },
  itemsPerPageText: {
    type: String,
    default: "$vuetify.dataFooter.itemsPerPageText"
  },
  pageText: {
    type: String,
    default: "$vuetify.dataFooter.pageText"
  },
  firstPageLabel: {
    type: String,
    default: "$vuetify.dataFooter.firstPage"
  },
  prevPageLabel: {
    type: String,
    default: "$vuetify.dataFooter.prevPage"
  },
  nextPageLabel: {
    type: String,
    default: "$vuetify.dataFooter.nextPage"
  },
  lastPageLabel: {
    type: String,
    default: "$vuetify.dataFooter.lastPage"
  },
  itemsPerPageOptions: {
    type: Array,
    default: () => [{
      value: 10,
      title: "10"
    }, {
      value: 25,
      title: "25"
    }, {
      value: 50,
      title: "50"
    }, {
      value: 100,
      title: "100"
    }, {
      value: -1,
      title: "$vuetify.dataFooter.itemsPerPageAll"
    }]
  },
  showCurrentPage: Boolean
}, "VDataTableFooter");
const VDataTableFooter = genericComponent()({
  name: "VDataTableFooter",
  props: makeVDataTableFooterProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      t
    } = useLocale();
    const {
      page,
      pageCount,
      startIndex,
      stopIndex,
      itemsLength,
      itemsPerPage,
      setItemsPerPage
    } = usePagination();
    const itemsPerPageOptions = computed(() => props.itemsPerPageOptions.map((option) => {
      if (typeof option === "number") {
        return {
          value: option,
          title: option === -1 ? t("$vuetify.dataFooter.itemsPerPageAll") : String(option)
        };
      }
      return {
        ...option,
        title: !isNaN(Number(option.title)) ? option.title : t(option.title)
      };
    }));
    useRender(() => {
      var _a;
      const paginationProps = VPagination.filterProps(props);
      return createVNode("div", {
        "class": "v-data-table-footer"
      }, [(_a = slots.prepend) == null ? void 0 : _a.call(slots), createVNode("div", {
        "class": "v-data-table-footer__items-per-page"
      }, [createVNode("span", null, [t(props.itemsPerPageText)]), createVNode(VSelect, {
        "items": itemsPerPageOptions.value,
        "modelValue": itemsPerPage.value,
        "onUpdate:modelValue": (v) => setItemsPerPage(Number(v)),
        "density": "compact",
        "variant": "outlined",
        "hide-details": true
      }, null)]), createVNode("div", {
        "class": "v-data-table-footer__info"
      }, [createVNode("div", null, [t(props.pageText, !itemsLength.value ? 0 : startIndex.value + 1, stopIndex.value, itemsLength.value)])]), createVNode("div", {
        "class": "v-data-table-footer__pagination"
      }, [createVNode(VPagination, mergeProps({
        "modelValue": page.value,
        "onUpdate:modelValue": ($event) => page.value = $event,
        "density": "comfortable",
        "first-aria-label": props.firstPageLabel,
        "last-aria-label": props.lastPageLabel,
        "length": pageCount.value,
        "next-aria-label": props.nextPageLabel,
        "previous-aria-label": props.prevPageLabel,
        "rounded": true,
        "show-first-last-page": true,
        "total-visible": props.showCurrentPage ? 1 : 0,
        "variant": "plain"
      }, paginationProps), null)])]);
    });
    return {};
  }
});
const VDataTableColumn = defineFunctionalComponent({
  align: {
    type: String,
    default: "start"
  },
  fixed: Boolean,
  fixedOffset: [Number, String],
  height: [Number, String],
  lastFixed: Boolean,
  noPadding: Boolean,
  tag: String,
  width: [Number, String],
  maxWidth: [Number, String],
  nowrap: Boolean
}, (props, _ref) => {
  let {
    slots
  } = _ref;
  const Tag = props.tag ?? "td";
  return createVNode(Tag, {
    "class": ["v-data-table__td", {
      "v-data-table-column--fixed": props.fixed,
      "v-data-table-column--last-fixed": props.lastFixed,
      "v-data-table-column--no-padding": props.noPadding,
      "v-data-table-column--nowrap": props.nowrap
    }, `v-data-table-column--align-${props.align}`],
    "style": {
      height: convertToUnit(props.height),
      width: convertToUnit(props.width),
      maxWidth: convertToUnit(props.maxWidth),
      left: convertToUnit(props.fixedOffset || null)
    }
  }, {
    default: () => {
      var _a;
      return [(_a = slots.default) == null ? void 0 : _a.call(slots)];
    }
  });
});
const makeDataTableHeaderProps = propsFactory({
  headers: Array
}, "DataTable-header");
const VDataTableHeadersSymbol = Symbol.for("vuetify:data-table-headers");
const defaultHeader = {
  title: "",
  sortable: false
};
const defaultActionHeader = {
  ...defaultHeader,
  width: 48
};
function priorityQueue() {
  let arr = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
  const queue = arr.map((element) => ({
    element,
    priority: 0
  }));
  return {
    enqueue: (element, priority) => {
      let added = false;
      for (let i = 0; i < queue.length; i++) {
        const item = queue[i];
        if (item.priority > priority) {
          queue.splice(i, 0, {
            element,
            priority
          });
          added = true;
          break;
        }
      }
      if (!added) queue.push({
        element,
        priority
      });
    },
    size: () => queue.length,
    count: () => {
      let count = 0;
      if (!queue.length) return 0;
      const whole = Math.floor(queue[0].priority);
      for (let i = 0; i < queue.length; i++) {
        if (Math.floor(queue[i].priority) === whole) count += 1;
      }
      return count;
    },
    dequeue: () => {
      return queue.shift();
    }
  };
}
function extractLeaves(item) {
  let columns = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [];
  if (!item.children) {
    columns.push(item);
  } else {
    for (const child of item.children) {
      extractLeaves(child, columns);
    }
  }
  return columns;
}
function extractKeys(headers) {
  let keys2 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : /* @__PURE__ */ new Set();
  for (const item of headers) {
    if (item.key) keys2.add(item.key);
    if (item.children) {
      extractKeys(item.children, keys2);
    }
  }
  return keys2;
}
function getDefaultItem(item) {
  if (!item.key) return void 0;
  if (item.key === "data-table-group") return defaultHeader;
  if (["data-table-expand", "data-table-select"].includes(item.key)) return defaultActionHeader;
  return void 0;
}
function getDepth(item) {
  let depth = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
  if (!item.children) return depth;
  return Math.max(depth, ...item.children.map((child) => getDepth(child, depth + 1)));
}
function parseFixedColumns(items) {
  let seenFixed = false;
  function setFixed(item) {
    let parentFixed = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
    if (!item) return;
    if (parentFixed) {
      item.fixed = true;
    }
    if (item.fixed) {
      if (item.children) {
        for (let i = item.children.length - 1; i >= 0; i--) {
          setFixed(item.children[i], true);
        }
      } else {
        if (!seenFixed) {
          item.lastFixed = true;
        } else if (isNaN(+item.width)) {
          consoleError(`Multiple fixed columns should have a static width (key: ${item.key})`);
        }
        seenFixed = true;
      }
    } else {
      if (item.children) {
        for (let i = item.children.length - 1; i >= 0; i--) {
          setFixed(item.children[i]);
        }
      } else {
        seenFixed = false;
      }
    }
  }
  for (let i = items.length - 1; i >= 0; i--) {
    setFixed(items[i]);
  }
  function setFixedOffset(item) {
    let fixedOffset2 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
    if (!item) return fixedOffset2;
    if (item.children) {
      item.fixedOffset = fixedOffset2;
      for (const child of item.children) {
        fixedOffset2 = setFixedOffset(child, fixedOffset2);
      }
    } else if (item.fixed) {
      item.fixedOffset = fixedOffset2;
      fixedOffset2 += parseFloat(item.width || "0") || 0;
    }
    return fixedOffset2;
  }
  let fixedOffset = 0;
  for (const item of items) {
    fixedOffset = setFixedOffset(item, fixedOffset);
  }
}
function parse(items, maxDepth) {
  const headers = [];
  let currentDepth = 0;
  const queue = priorityQueue(items);
  while (queue.size() > 0) {
    let rowSize = queue.count();
    const row = [];
    let fraction = 1;
    while (rowSize > 0) {
      const {
        element: item,
        priority
      } = queue.dequeue();
      const diff = maxDepth - currentDepth - getDepth(item);
      row.push({
        ...item,
        rowspan: diff ?? 1,
        colspan: item.children ? extractLeaves(item).length : 1
      });
      if (item.children) {
        for (const child of item.children) {
          const sort = priority % 1 + fraction / Math.pow(10, currentDepth + 2);
          queue.enqueue(child, currentDepth + diff + sort);
        }
      }
      fraction += 1;
      rowSize -= 1;
    }
    currentDepth += 1;
    headers.push(row);
  }
  const columns = items.map((item) => extractLeaves(item)).flat();
  return {
    columns,
    headers
  };
}
function convertToInternalHeaders(items) {
  const internalHeaders = [];
  for (const item of items) {
    const defaultItem = {
      ...getDefaultItem(item),
      ...item
    };
    const key = defaultItem.key ?? (typeof defaultItem.value === "string" ? defaultItem.value : null);
    const value = defaultItem.value ?? key ?? null;
    const internalItem = {
      ...defaultItem,
      key,
      value,
      sortable: defaultItem.sortable ?? (defaultItem.key != null || !!defaultItem.sort),
      children: defaultItem.children ? convertToInternalHeaders(defaultItem.children) : void 0
    };
    internalHeaders.push(internalItem);
  }
  return internalHeaders;
}
function createHeaders(props, options) {
  const headers = ref([]);
  const columns = ref([]);
  const sortFunctions = ref({});
  const sortRawFunctions = ref({});
  const filterFunctions = ref({});
  watchEffect(() => {
    var _a, _b, _c;
    const _headers = props.headers || Object.keys(props.items[0] ?? {}).map((key) => ({
      key,
      title: capitalize(key)
    }));
    const items = _headers.slice();
    const keys2 = extractKeys(items);
    if (((_a = options == null ? void 0 : options.groupBy) == null ? void 0 : _a.value.length) && !keys2.has("data-table-group")) {
      items.unshift({
        key: "data-table-group",
        title: "Group"
      });
    }
    if (((_b = options == null ? void 0 : options.showSelect) == null ? void 0 : _b.value) && !keys2.has("data-table-select")) {
      items.unshift({
        key: "data-table-select"
      });
    }
    if (((_c = options == null ? void 0 : options.showExpand) == null ? void 0 : _c.value) && !keys2.has("data-table-expand")) {
      items.push({
        key: "data-table-expand"
      });
    }
    const internalHeaders = convertToInternalHeaders(items);
    parseFixedColumns(internalHeaders);
    const maxDepth = Math.max(...internalHeaders.map((item) => getDepth(item))) + 1;
    const parsed = parse(internalHeaders, maxDepth);
    headers.value = parsed.headers;
    columns.value = parsed.columns;
    const flatHeaders = parsed.headers.flat(1);
    for (const header of flatHeaders) {
      if (!header.key) continue;
      if (header.sortable) {
        if (header.sort) {
          sortFunctions.value[header.key] = header.sort;
        }
        if (header.sortRaw) {
          sortRawFunctions.value[header.key] = header.sortRaw;
        }
      }
      if (header.filter) {
        filterFunctions.value[header.key] = header.filter;
      }
    }
  });
  const data = {
    headers,
    columns,
    sortFunctions,
    sortRawFunctions,
    filterFunctions
  };
  provide(VDataTableHeadersSymbol, data);
  return data;
}
function useHeaders() {
  const data = inject$1(VDataTableHeadersSymbol);
  if (!data) throw new Error("Missing headers!");
  return data;
}
const makeVDataTableHeadersProps = propsFactory({
  color: String,
  sticky: Boolean,
  disableSort: Boolean,
  multiSort: Boolean,
  sortAscIcon: {
    type: IconValue,
    default: "$sortAsc"
  },
  sortDescIcon: {
    type: IconValue,
    default: "$sortDesc"
  },
  headerProps: {
    type: Object
  },
  ...makeDisplayProps(),
  ...makeLoaderProps()
}, "VDataTableHeaders");
const VDataTableHeaders = genericComponent()({
  name: "VDataTableHeaders",
  props: makeVDataTableHeadersProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      t
    } = useLocale();
    const {
      toggleSort,
      sortBy,
      isSorted
    } = useSort();
    const {
      someSelected,
      allSelected,
      selectAll,
      showSelectAll
    } = useSelection();
    const {
      columns,
      headers
    } = useHeaders();
    const {
      loaderClasses
    } = useLoader(props);
    function getFixedStyles(column, y) {
      if (!props.sticky && !column.fixed) return void 0;
      return {
        position: "sticky",
        left: column.fixed ? convertToUnit(column.fixedOffset) : void 0,
        top: props.sticky ? `calc(var(--v-table-header-height) * ${y})` : void 0
      };
    }
    function getSortIcon(column) {
      const item = sortBy.value.find((item2) => item2.key === column.key);
      if (!item) return props.sortAscIcon;
      return item.order === "asc" ? props.sortAscIcon : props.sortDescIcon;
    }
    const {
      backgroundColorClasses,
      backgroundColorStyles
    } = useBackgroundColor(props, "color");
    const {
      displayClasses,
      mobile
    } = useDisplay(props);
    const slotProps = computed(() => ({
      headers: headers.value,
      columns: columns.value,
      toggleSort,
      isSorted,
      sortBy: sortBy.value,
      someSelected: someSelected.value,
      allSelected: allSelected.value,
      selectAll,
      getSortIcon
    }));
    const headerCellClasses = computed(() => ["v-data-table__th", {
      "v-data-table__th--sticky": props.sticky
    }, displayClasses.value, loaderClasses.value]);
    const VDataTableHeaderCell = (_ref2) => {
      let {
        column,
        x,
        y
      } = _ref2;
      const noPadding = column.key === "data-table-select" || column.key === "data-table-expand";
      const headerProps = mergeProps(props.headerProps ?? {}, column.headerProps ?? {});
      return createVNode(VDataTableColumn, mergeProps({
        "tag": "th",
        "align": column.align,
        "class": [{
          "v-data-table__th--sortable": column.sortable && !props.disableSort,
          "v-data-table__th--sorted": isSorted(column),
          "v-data-table__th--fixed": column.fixed
        }, ...headerCellClasses.value],
        "style": {
          width: convertToUnit(column.width),
          minWidth: convertToUnit(column.minWidth),
          maxWidth: convertToUnit(column.maxWidth),
          ...getFixedStyles(column, y)
        },
        "colspan": column.colspan,
        "rowspan": column.rowspan,
        "onClick": column.sortable ? () => toggleSort(column) : void 0,
        "fixed": column.fixed,
        "nowrap": column.nowrap,
        "lastFixed": column.lastFixed,
        "noPadding": noPadding
      }, headerProps), {
        default: () => {
          var _a;
          const columnSlotName = `header.${column.key}`;
          const columnSlotProps = {
            column,
            selectAll,
            isSorted,
            toggleSort,
            sortBy: sortBy.value,
            someSelected: someSelected.value,
            allSelected: allSelected.value,
            getSortIcon
          };
          if (slots[columnSlotName]) return slots[columnSlotName](columnSlotProps);
          if (column.key === "data-table-select") {
            return ((_a = slots["header.data-table-select"]) == null ? void 0 : _a.call(slots, columnSlotProps)) ?? (showSelectAll.value && createVNode(VCheckboxBtn, {
              "modelValue": allSelected.value,
              "indeterminate": someSelected.value && !allSelected.value,
              "onUpdate:modelValue": selectAll
            }, null));
          }
          return createVNode("div", {
            "class": "v-data-table-header__content"
          }, [createVNode("span", null, [column.title]), column.sortable && !props.disableSort && createVNode(VIcon, {
            "key": "icon",
            "class": "v-data-table-header__sort-icon",
            "icon": getSortIcon(column)
          }, null), props.multiSort && isSorted(column) && createVNode("div", {
            "key": "badge",
            "class": ["v-data-table-header__sort-badge", ...backgroundColorClasses.value],
            "style": backgroundColorStyles.value
          }, [sortBy.value.findIndex((x2) => x2.key === column.key) + 1])]);
        }
      });
    };
    const VDataTableMobileHeaderCell = () => {
      const headerProps = mergeProps(props.headerProps ?? {} ?? {});
      const displayItems = computed(() => {
        return columns.value.filter((column) => (column == null ? void 0 : column.sortable) && !props.disableSort);
      });
      const appendIcon = computed(() => {
        const showSelectColumn = columns.value.find((column) => column.key === "data-table-select");
        if (showSelectColumn == null) return;
        return allSelected.value ? "$checkboxOn" : someSelected.value ? "$checkboxIndeterminate" : "$checkboxOff";
      });
      return createVNode(VDataTableColumn, mergeProps({
        "tag": "th",
        "class": [...headerCellClasses.value],
        "colspan": headers.value.length + 1
      }, headerProps), {
        default: () => [createVNode("div", {
          "class": "v-data-table-header__content"
        }, [createVNode(VSelect, {
          "chips": true,
          "class": "v-data-table__td-sort-select",
          "clearable": true,
          "density": "default",
          "items": displayItems.value,
          "label": t("$vuetify.dataTable.sortBy"),
          "multiple": props.multiSort,
          "variant": "underlined",
          "onClick:clear": () => sortBy.value = [],
          "appendIcon": appendIcon.value,
          "onClick:append": () => selectAll(!allSelected.value)
        }, {
          ...slots,
          chip: (props2) => {
            var _a;
            return createVNode(VChip, {
              "onClick": ((_a = props2.item.raw) == null ? void 0 : _a.sortable) ? () => toggleSort(props2.item.raw) : void 0,
              "onMousedown": (e) => {
                e.preventDefault();
                e.stopPropagation();
              }
            }, {
              default: () => [props2.item.title, createVNode(VIcon, {
                "class": ["v-data-table__td-sort-icon", isSorted(props2.item.raw) && "v-data-table__td-sort-icon-active"],
                "icon": getSortIcon(props2.item.raw),
                "size": "small"
              }, null)]
            });
          }
        })])]
      });
    };
    useRender(() => {
      return mobile.value ? createVNode("tr", null, [createVNode(VDataTableMobileHeaderCell, null, null)]) : createVNode(Fragment, null, [slots.headers ? slots.headers(slotProps.value) : headers.value.map((row, y) => createVNode("tr", null, [row.map((column, x) => createVNode(VDataTableHeaderCell, {
        "column": column,
        "x": x,
        "y": y
      }, null))])), props.loading && createVNode("tr", {
        "class": "v-data-table-progress"
      }, [createVNode("th", {
        "colspan": columns.value.length
      }, [createVNode(LoaderSlot, {
        "name": "v-data-table-progress",
        "absolute": true,
        "active": true,
        "color": typeof props.loading === "boolean" ? void 0 : props.loading,
        "indeterminate": true
      }, {
        default: slots.loader
      })])])]);
    });
  }
});
const makeVDataTableGroupHeaderRowProps = propsFactory({
  item: {
    type: Object,
    required: true
  }
}, "VDataTableGroupHeaderRow");
const VDataTableGroupHeaderRow = genericComponent()({
  name: "VDataTableGroupHeaderRow",
  props: makeVDataTableGroupHeaderRowProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      isGroupOpen,
      toggleGroup,
      extractRows
    } = useGroupBy();
    const {
      isSelected,
      isSomeSelected,
      select
    } = useSelection();
    const {
      columns
    } = useHeaders();
    const rows = computed(() => {
      return extractRows([props.item]);
    });
    return () => createVNode("tr", {
      "class": "v-data-table-group-header-row",
      "style": {
        "--v-data-table-group-header-row-depth": props.item.depth
      }
    }, [columns.value.map((column) => {
      var _a, _b;
      if (column.key === "data-table-group") {
        const icon = isGroupOpen(props.item) ? "$expand" : "$next";
        const onClick = () => toggleGroup(props.item);
        return ((_a = slots["data-table-group"]) == null ? void 0 : _a.call(slots, {
          item: props.item,
          count: rows.value.length,
          props: {
            icon,
            onClick
          }
        })) ?? createVNode(VDataTableColumn, {
          "class": "v-data-table-group-header-row__column"
        }, {
          default: () => [createVNode(VBtn, {
            "size": "small",
            "variant": "text",
            "icon": icon,
            "onClick": onClick
          }, null), createVNode("span", null, [props.item.value]), createVNode("span", null, [createTextVNode("("), rows.value.length, createTextVNode(")")])]
        });
      }
      if (column.key === "data-table-select") {
        const modelValue = isSelected(rows.value);
        const indeterminate = isSomeSelected(rows.value) && !modelValue;
        const selectGroup = (v) => select(rows.value, v);
        return ((_b = slots["data-table-select"]) == null ? void 0 : _b.call(slots, {
          props: {
            modelValue,
            indeterminate,
            "onUpdate:modelValue": selectGroup
          }
        })) ?? createVNode("td", null, [createVNode(VCheckboxBtn, {
          "modelValue": modelValue,
          "indeterminate": indeterminate,
          "onUpdate:modelValue": selectGroup
        }, null)]);
      }
      return createVNode("td", null, null);
    })]);
  }
});
const makeVDataTableRowProps = propsFactory({
  index: Number,
  item: Object,
  cellProps: [Object, Function],
  onClick: EventProp(),
  onContextmenu: EventProp(),
  onDblclick: EventProp(),
  ...makeDisplayProps()
}, "VDataTableRow");
const VDataTableRow = genericComponent()({
  name: "VDataTableRow",
  props: makeVDataTableRowProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      displayClasses,
      mobile
    } = useDisplay(props, "v-data-table__tr");
    const {
      isSelected,
      toggleSelect,
      someSelected,
      allSelected,
      selectAll
    } = useSelection();
    const {
      isExpanded,
      toggleExpand
    } = useExpanded();
    const {
      toggleSort,
      sortBy,
      isSorted
    } = useSort();
    const {
      columns
    } = useHeaders();
    useRender(() => createVNode("tr", {
      "class": ["v-data-table__tr", {
        "v-data-table__tr--clickable": !!(props.onClick || props.onContextmenu || props.onDblclick)
      }, displayClasses.value],
      "onClick": props.onClick,
      "onContextmenu": props.onContextmenu,
      "onDblclick": props.onDblclick
    }, [props.item && columns.value.map((column, i) => {
      const item = props.item;
      const slotName = `item.${column.key}`;
      const headerSlotName = `header.${column.key}`;
      const slotProps = {
        index: props.index,
        item: item.raw,
        internalItem: item,
        value: getObjectValueByPath(item.columns, column.key),
        column,
        isSelected,
        toggleSelect,
        isExpanded,
        toggleExpand
      };
      const columnSlotProps = {
        column,
        selectAll,
        isSorted,
        toggleSort,
        sortBy: sortBy.value,
        someSelected: someSelected.value,
        allSelected: allSelected.value,
        getSortIcon: () => ""
      };
      const cellProps = typeof props.cellProps === "function" ? props.cellProps({
        index: slotProps.index,
        item: slotProps.item,
        internalItem: slotProps.internalItem,
        value: slotProps.value,
        column
      }) : props.cellProps;
      const columnCellProps = typeof column.cellProps === "function" ? column.cellProps({
        index: slotProps.index,
        item: slotProps.item,
        internalItem: slotProps.internalItem,
        value: slotProps.value
      }) : column.cellProps;
      return createVNode(VDataTableColumn, mergeProps({
        "align": column.align,
        "class": {
          "v-data-table__td--expanded-row": column.key === "data-table-expand",
          "v-data-table__td--select-row": column.key === "data-table-select"
        },
        "fixed": column.fixed,
        "fixedOffset": column.fixedOffset,
        "lastFixed": column.lastFixed,
        "maxWidth": !mobile.value ? column.maxWidth : void 0,
        "noPadding": column.key === "data-table-select" || column.key === "data-table-expand",
        "nowrap": column.nowrap,
        "width": !mobile.value ? column.width : void 0
      }, cellProps, columnCellProps), {
        default: () => {
          var _a, _b, _c, _d, _e;
          if (slots[slotName] && !mobile.value) return (_a = slots[slotName]) == null ? void 0 : _a.call(slots, slotProps);
          if (column.key === "data-table-select") {
            return ((_b = slots["item.data-table-select"]) == null ? void 0 : _b.call(slots, slotProps)) ?? createVNode(VCheckboxBtn, {
              "disabled": !item.selectable,
              "modelValue": isSelected([item]),
              "onClick": withModifiers(() => toggleSelect(item), ["stop"])
            }, null);
          }
          if (column.key === "data-table-expand") {
            return ((_c = slots["item.data-table-expand"]) == null ? void 0 : _c.call(slots, slotProps)) ?? createVNode(VBtn, {
              "icon": isExpanded(item) ? "$collapse" : "$expand",
              "size": "small",
              "variant": "text",
              "onClick": withModifiers(() => toggleExpand(item), ["stop"])
            }, null);
          }
          const displayValue = toDisplayString(slotProps.value);
          return !mobile.value ? displayValue : createVNode(Fragment, null, [createVNode("div", {
            "class": "v-data-table__td-title"
          }, [((_d = slots[headerSlotName]) == null ? void 0 : _d.call(slots, columnSlotProps)) ?? column.title]), createVNode("div", {
            "class": "v-data-table__td-value"
          }, [((_e = slots[slotName]) == null ? void 0 : _e.call(slots, slotProps)) ?? displayValue])]);
        }
      });
    })]));
  }
});
const makeVDataTableRowsProps = propsFactory({
  loading: [Boolean, String],
  loadingText: {
    type: String,
    default: "$vuetify.dataIterator.loadingText"
  },
  hideNoData: Boolean,
  items: {
    type: Array,
    default: () => []
  },
  noDataText: {
    type: String,
    default: "$vuetify.noDataText"
  },
  rowProps: [Object, Function],
  cellProps: [Object, Function],
  ...makeDisplayProps()
}, "VDataTableRows");
const VDataTableRows = genericComponent()({
  name: "VDataTableRows",
  inheritAttrs: false,
  props: makeVDataTableRowsProps(),
  setup(props, _ref) {
    let {
      attrs,
      slots
    } = _ref;
    const {
      columns
    } = useHeaders();
    const {
      expandOnClick,
      toggleExpand,
      isExpanded
    } = useExpanded();
    const {
      isSelected,
      toggleSelect
    } = useSelection();
    const {
      toggleGroup,
      isGroupOpen
    } = useGroupBy();
    const {
      t
    } = useLocale();
    const {
      mobile
    } = useDisplay(props);
    useRender(() => {
      var _a, _b;
      if (props.loading && (!props.items.length || slots.loading)) {
        return createVNode("tr", {
          "class": "v-data-table-rows-loading",
          "key": "loading"
        }, [createVNode("td", {
          "colspan": columns.value.length
        }, [((_a = slots.loading) == null ? void 0 : _a.call(slots)) ?? t(props.loadingText)])]);
      }
      if (!props.loading && !props.items.length && !props.hideNoData) {
        return createVNode("tr", {
          "class": "v-data-table-rows-no-data",
          "key": "no-data"
        }, [createVNode("td", {
          "colspan": columns.value.length
        }, [((_b = slots["no-data"]) == null ? void 0 : _b.call(slots)) ?? t(props.noDataText)])]);
      }
      return createVNode(Fragment, null, [props.items.map((item, index) => {
        var _a2;
        if (item.type === "group") {
          const slotProps2 = {
            index,
            item,
            columns: columns.value,
            isExpanded,
            toggleExpand,
            isSelected,
            toggleSelect,
            toggleGroup,
            isGroupOpen
          };
          return slots["group-header"] ? slots["group-header"](slotProps2) : createVNode(VDataTableGroupHeaderRow, mergeProps({
            "key": `group-header_${item.id}`,
            "item": item
          }, getPrefixedEventHandlers(attrs, ":group-header", () => slotProps2)), slots);
        }
        const slotProps = {
          index,
          item: item.raw,
          internalItem: item,
          columns: columns.value,
          isExpanded,
          toggleExpand,
          isSelected,
          toggleSelect
        };
        const itemSlotProps = {
          ...slotProps,
          props: mergeProps({
            key: `item_${item.key ?? item.index}`,
            onClick: expandOnClick.value ? () => {
              toggleExpand(item);
            } : void 0,
            index,
            item,
            cellProps: props.cellProps,
            mobile: mobile.value
          }, getPrefixedEventHandlers(attrs, ":row", () => slotProps), typeof props.rowProps === "function" ? props.rowProps({
            item: slotProps.item,
            index: slotProps.index,
            internalItem: slotProps.internalItem
          }) : props.rowProps)
        };
        return createVNode(Fragment, {
          "key": itemSlotProps.props.key
        }, [slots.item ? slots.item(itemSlotProps) : createVNode(VDataTableRow, itemSlotProps.props, slots), isExpanded(item) && ((_a2 = slots["expanded-row"]) == null ? void 0 : _a2.call(slots, slotProps))]);
      })]);
    });
    return {};
  }
});
const makeVTableProps = propsFactory({
  fixedHeader: Boolean,
  fixedFooter: Boolean,
  height: [Number, String],
  hover: Boolean,
  ...makeComponentProps(),
  ...makeDensityProps(),
  ...makeTagProps(),
  ...makeThemeProps()
}, "VTable");
const VTable = genericComponent()({
  name: "VTable",
  props: makeVTableProps(),
  setup(props, _ref) {
    let {
      slots,
      emit
    } = _ref;
    const {
      themeClasses
    } = provideTheme(props);
    const {
      densityClasses
    } = useDensity(props);
    useRender(() => createVNode(props.tag, {
      "class": ["v-table", {
        "v-table--fixed-height": !!props.height,
        "v-table--fixed-header": props.fixedHeader,
        "v-table--fixed-footer": props.fixedFooter,
        "v-table--has-top": !!slots.top,
        "v-table--has-bottom": !!slots.bottom,
        "v-table--hover": props.hover
      }, themeClasses.value, densityClasses.value, props.class],
      "style": props.style
    }, {
      default: () => {
        var _a, _b, _c;
        return [(_a = slots.top) == null ? void 0 : _a.call(slots), slots.default ? createVNode("div", {
          "class": "v-table__wrapper",
          "style": {
            height: convertToUnit(props.height)
          }
        }, [createVNode("table", null, [slots.default()])]) : (_b = slots.wrapper) == null ? void 0 : _b.call(slots), (_c = slots.bottom) == null ? void 0 : _c.call(slots)];
      }
    }));
    return {};
  }
});
const makeDataTableItemsProps = propsFactory({
  items: {
    type: Array,
    default: () => []
  },
  itemValue: {
    type: [String, Array, Function],
    default: "id"
  },
  itemSelectable: {
    type: [String, Array, Function],
    default: null
  },
  rowProps: [Object, Function],
  cellProps: [Object, Function],
  returnObject: Boolean
}, "DataTable-items");
function transformItem(props, item, index, columns) {
  const value = props.returnObject ? item : getPropertyFromItem(item, props.itemValue);
  const selectable = getPropertyFromItem(item, props.itemSelectable, true);
  const itemColumns = columns.reduce((obj, column) => {
    if (column.key != null) obj[column.key] = getPropertyFromItem(item, column.value);
    return obj;
  }, {});
  return {
    type: "item",
    key: props.returnObject ? getPropertyFromItem(item, props.itemValue) : value,
    index,
    value,
    selectable,
    columns: itemColumns,
    raw: item
  };
}
function transformItems(props, items, columns) {
  return items.map((item, index) => transformItem(props, item, index, columns));
}
function useDataTableItems(props, columns) {
  const items = computed(() => transformItems(props, props.items, columns.value));
  return {
    items
  };
}
const makeDataTableProps = propsFactory({
  ...makeVDataTableRowsProps(),
  hideDefaultBody: Boolean,
  hideDefaultFooter: Boolean,
  hideDefaultHeader: Boolean,
  width: [String, Number],
  search: String,
  ...makeDataTableExpandProps(),
  ...makeDataTableGroupProps(),
  ...makeDataTableHeaderProps(),
  ...makeDataTableItemsProps(),
  ...makeDataTableSelectProps(),
  ...makeDataTableSortProps(),
  ...makeVDataTableHeadersProps(),
  ...makeVTableProps()
}, "DataTable");
const makeVDataTableProps = propsFactory({
  ...makeDataTablePaginateProps(),
  ...makeDataTableProps(),
  ...makeFilterProps(),
  ...makeVDataTableFooterProps()
}, "VDataTable");
const VDataTable = genericComponent()({
  name: "VDataTable",
  props: makeVDataTableProps(),
  emits: {
    "update:modelValue": (value) => true,
    "update:page": (value) => true,
    "update:itemsPerPage": (value) => true,
    "update:sortBy": (value) => true,
    "update:options": (value) => true,
    "update:groupBy": (value) => true,
    "update:expanded": (value) => true,
    "update:currentItems": (value) => true
  },
  setup(props, _ref) {
    let {
      attrs,
      slots
    } = _ref;
    const {
      groupBy
    } = createGroupBy(props);
    const {
      sortBy,
      multiSort,
      mustSort
    } = createSort(props);
    const {
      page,
      itemsPerPage
    } = createPagination(props);
    const {
      columns,
      headers,
      sortFunctions,
      sortRawFunctions,
      filterFunctions
    } = createHeaders(props, {
      groupBy,
      showSelect: toRef(props, "showSelect"),
      showExpand: toRef(props, "showExpand")
    });
    const {
      items
    } = useDataTableItems(props, columns);
    const search = toRef(props, "search");
    const {
      filteredItems
    } = useFilter(props, items, search, {
      transform: (item) => item.columns,
      customKeyFilter: filterFunctions
    });
    const {
      toggleSort
    } = provideSort({
      sortBy,
      multiSort,
      mustSort,
      page
    });
    const {
      sortByWithGroups,
      opened,
      extractRows,
      isGroupOpen,
      toggleGroup
    } = provideGroupBy({
      groupBy,
      sortBy
    });
    const {
      sortedItems
    } = useSortedItems(props, filteredItems, sortByWithGroups, {
      transform: (item) => item.columns,
      sortFunctions,
      sortRawFunctions
    });
    const {
      flatItems
    } = useGroupedItems(sortedItems, groupBy, opened);
    const itemsLength = computed(() => flatItems.value.length);
    const {
      startIndex,
      stopIndex,
      pageCount,
      setItemsPerPage
    } = providePagination({
      page,
      itemsPerPage,
      itemsLength
    });
    const {
      paginatedItems
    } = usePaginatedItems({
      items: flatItems,
      startIndex,
      stopIndex,
      itemsPerPage
    });
    const paginatedItemsWithoutGroups = computed(() => extractRows(paginatedItems.value));
    const {
      isSelected,
      select,
      selectAll,
      toggleSelect,
      someSelected,
      allSelected
    } = provideSelection(props, {
      allItems: items,
      currentPage: paginatedItemsWithoutGroups
    });
    const {
      isExpanded,
      toggleExpand
    } = provideExpanded(props);
    useOptions({
      page,
      itemsPerPage,
      sortBy,
      groupBy,
      search
    });
    provideDefaults({
      VDataTableRows: {
        hideNoData: toRef(props, "hideNoData"),
        noDataText: toRef(props, "noDataText"),
        loading: toRef(props, "loading"),
        loadingText: toRef(props, "loadingText")
      }
    });
    const slotProps = computed(() => ({
      page: page.value,
      itemsPerPage: itemsPerPage.value,
      sortBy: sortBy.value,
      pageCount: pageCount.value,
      toggleSort,
      setItemsPerPage,
      someSelected: someSelected.value,
      allSelected: allSelected.value,
      isSelected,
      select,
      selectAll,
      toggleSelect,
      isExpanded,
      toggleExpand,
      isGroupOpen,
      toggleGroup,
      items: paginatedItemsWithoutGroups.value.map((item) => item.raw),
      internalItems: paginatedItemsWithoutGroups.value,
      groupedItems: paginatedItems.value,
      columns: columns.value,
      headers: headers.value
    }));
    useRender(() => {
      const dataTableFooterProps = VDataTableFooter.filterProps(props);
      const dataTableHeadersProps = VDataTableHeaders.filterProps(props);
      const dataTableRowsProps = VDataTableRows.filterProps(props);
      const tableProps = VTable.filterProps(props);
      return createVNode(VTable, mergeProps({
        "class": ["v-data-table", {
          "v-data-table--show-select": props.showSelect,
          "v-data-table--loading": props.loading
        }, props.class],
        "style": props.style
      }, tableProps), {
        top: () => {
          var _a;
          return (_a = slots.top) == null ? void 0 : _a.call(slots, slotProps.value);
        },
        default: () => {
          var _a, _b, _c, _d, _e, _f;
          return slots.default ? slots.default(slotProps.value) : createVNode(Fragment, null, [(_a = slots.colgroup) == null ? void 0 : _a.call(slots, slotProps.value), !props.hideDefaultHeader && createVNode("thead", {
            "key": "thead"
          }, [createVNode(VDataTableHeaders, dataTableHeadersProps, slots)]), (_b = slots.thead) == null ? void 0 : _b.call(slots, slotProps.value), !props.hideDefaultBody && createVNode("tbody", null, [(_c = slots["body.prepend"]) == null ? void 0 : _c.call(slots, slotProps.value), slots.body ? slots.body(slotProps.value) : createVNode(VDataTableRows, mergeProps(attrs, dataTableRowsProps, {
            "items": paginatedItems.value
          }), slots), (_d = slots["body.append"]) == null ? void 0 : _d.call(slots, slotProps.value)]), (_e = slots.tbody) == null ? void 0 : _e.call(slots, slotProps.value), (_f = slots.tfoot) == null ? void 0 : _f.call(slots, slotProps.value)]);
        },
        bottom: () => slots.bottom ? slots.bottom(slotProps.value) : !props.hideDefaultFooter && createVNode(Fragment, null, [createVNode(VDivider, null, null), createVNode(VDataTableFooter, dataTableFooterProps, {
          prepend: slots["footer.prepend"]
        })])
      });
    });
    return {};
  }
});
const vuetify_7h9QAQEssH = /* @__PURE__ */ defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
    locale: {
      locale: "pt",
      messages: { pt }
    },
    components: {
      VDateInput
    },
    defaults: {
      VAutocomplete: {
        noDataText: "Não há dados correspondentes",
        hideDetails: true,
        density: "compact",
        clearable: true
      },
      VTextField: {
        density: "compact"
      },
      VDataTable: {
        density: "compact"
      }
    }
  });
  app.vueApp.use(vuetify);
  app.vueApp.use(VDataTable);
  app.vueApp.use(VueTheMask);
});
const plugins = [
  unhead_KgADcZ0jPj,
  plugin,
  revive_payload_server_eJ33V7gbc6,
  components_plugin_KR1HBZs4kY,
  toast_ysMjUcU7eJ,
  vuetify_7h9QAQEssH
];
function defaultEstimatedProgress(duration, elapsed) {
  const completionPercentage = elapsed / duration * 100;
  return 2 / Math.PI * 100 * Math.atan(completionPercentage / 50);
}
function createLoadingIndicator(opts = {}) {
  const { duration = 2e3, throttle = 200, hideDelay = 500, resetDelay = 400 } = opts;
  opts.estimatedProgress || defaultEstimatedProgress;
  const nuxtApp = useNuxtApp();
  const progress = ref(0);
  const isLoading = ref(false);
  const error = ref(false);
  const start = () => {
    error.value = false;
    set(0);
  };
  function set(at = 0) {
    if (nuxtApp.isHydrating) {
      return;
    }
    if (at >= 100) {
      return finish();
    }
    progress.value = at < 0 ? 0 : at;
    if (throttle && false) {
      setTimeout(() => {
        isLoading.value = true;
      }, throttle);
    } else {
      isLoading.value = true;
    }
  }
  function finish(opts2 = {}) {
    progress.value = 100;
    if (opts2.error) {
      error.value = true;
    }
    if (opts2.force) {
      progress.value = 0;
      isLoading.value = false;
    }
  }
  function clear() {
  }
  let _cleanup = () => {
  };
  return {
    _cleanup,
    progress: computed(() => progress.value),
    isLoading: computed(() => isLoading.value),
    error: computed(() => error.value),
    start,
    set,
    finish,
    clear
  };
}
function useLoadingIndicator(opts = {}) {
  const nuxtApp = useNuxtApp();
  const indicator = nuxtApp._loadingIndicator = nuxtApp._loadingIndicator || createLoadingIndicator(opts);
  return indicator;
}
const __nuxt_component_0 = defineComponent$1({
  name: "NuxtLoadingIndicator",
  props: {
    throttle: {
      type: Number,
      default: 200
    },
    duration: {
      type: Number,
      default: 2e3
    },
    height: {
      type: Number,
      default: 3
    },
    color: {
      type: [String, Boolean],
      default: "repeating-linear-gradient(to right,#00dc82 0%,#34cdfe 50%,#0047e1 100%)"
    },
    errorColor: {
      type: String,
      default: "repeating-linear-gradient(to right,#f87171 0%,#ef4444 100%)"
    },
    estimatedProgress: {
      type: Function,
      required: false
    }
  },
  setup(props, { slots, expose }) {
    const { progress, isLoading, error, start, finish, clear } = useLoadingIndicator({
      duration: props.duration,
      throttle: props.throttle,
      estimatedProgress: props.estimatedProgress
    });
    expose({
      progress,
      isLoading,
      error,
      start,
      finish,
      clear
    });
    return () => h("div", {
      class: "nuxt-loading-indicator",
      style: {
        position: "fixed",
        top: 0,
        right: 0,
        left: 0,
        pointerEvents: "none",
        width: "auto",
        height: `${props.height}px`,
        opacity: isLoading.value ? 1 : 0,
        background: error.value ? props.errorColor : props.color || void 0,
        backgroundSize: `${100 / progress.value * 100}% auto`,
        transform: `scaleX(${progress.value}%)`,
        transformOrigin: "left",
        transition: "transform 0.1s, height 0.4s, opacity 0.4s",
        zIndex: 999999
      }
    }, slots);
  }
});
const layouts = {
  default: () => import('./default-DdjWxg2U.mjs').then((m) => m.default || m)
};
const LayoutLoader = defineComponent$1({
  name: "LayoutLoader",
  inheritAttrs: false,
  props: {
    name: String,
    layoutProps: Object
  },
  async setup(props, context) {
    const LayoutComponent = await layouts[props.name]().then((r) => r.default || r);
    return () => h(LayoutComponent, props.layoutProps, context.slots);
  }
});
const __nuxt_component_1 = defineComponent$1({
  name: "NuxtLayout",
  inheritAttrs: false,
  props: {
    name: {
      type: [String, Boolean, Object],
      default: null
    },
    fallback: {
      type: [String, Object],
      default: null
    }
  },
  setup(props, context) {
    const nuxtApp = useNuxtApp();
    const injectedRoute = inject$1(PageRouteSymbol);
    const route = injectedRoute === useRoute$1() ? useRoute$2() : injectedRoute;
    const layout = computed(() => {
      let layout2 = unref(props.name) ?? route.meta.layout ?? "default";
      if (layout2 && !(layout2 in layouts)) {
        if (props.fallback) {
          layout2 = unref(props.fallback);
        }
      }
      return layout2;
    });
    const layoutRef = ref();
    context.expose({ layoutRef });
    const done = nuxtApp.deferHydration();
    return () => {
      const hasLayout = layout.value && layout.value in layouts;
      const transitionProps = route.meta.layoutTransition ?? appLayoutTransition;
      return _wrapIf(Transition, hasLayout && transitionProps, {
        default: () => h(Suspense, { suspensible: true, onResolve: () => {
          nextTick(done);
        } }, {
          default: () => h(
            LayoutProvider,
            {
              layoutProps: mergeProps(context.attrs, { ref: layoutRef }),
              key: layout.value || void 0,
              name: layout.value,
              shouldProvide: !props.name,
              hasTransition: !!transitionProps
            },
            context.slots
          )
        })
      }).default();
    };
  }
});
const LayoutProvider = defineComponent$1({
  name: "NuxtLayoutProvider",
  inheritAttrs: false,
  props: {
    name: {
      type: [String, Boolean]
    },
    layoutProps: {
      type: Object
    },
    hasTransition: {
      type: Boolean
    },
    shouldProvide: {
      type: Boolean
    }
  },
  setup(props, context) {
    const name = props.name;
    if (props.shouldProvide) {
      provide(LayoutMetaSymbol, {
        isCurrent: (route) => name === (route.meta.layout ?? "default")
      });
    }
    return () => {
      var _a, _b;
      if (!name || typeof name === "string" && !(name in layouts)) {
        return (_b = (_a = context.slots).default) == null ? void 0 : _b.call(_a);
      }
      return h(
        LayoutLoader,
        { key: name, layoutProps: props.layoutProps, name },
        context.slots
      );
    };
  }
});
const RouteProvider = defineComponent$1({
  props: {
    vnode: {
      type: Object,
      required: true
    },
    route: {
      type: Object,
      required: true
    },
    vnodeRef: Object,
    renderKey: String,
    trackRootNodes: Boolean
  },
  setup(props) {
    const previousKey = props.renderKey;
    const previousRoute = props.route;
    const route = {};
    for (const key in props.route) {
      Object.defineProperty(route, key, {
        get: () => previousKey === props.renderKey ? props.route[key] : previousRoute[key]
      });
    }
    provide(PageRouteSymbol, shallowReactive(route));
    return () => {
      return h(props.vnode, { ref: props.vnodeRef });
    };
  }
});
const __nuxt_component_2 = defineComponent$1({
  name: "NuxtPage",
  inheritAttrs: false,
  props: {
    name: {
      type: String
    },
    transition: {
      type: [Boolean, Object],
      default: void 0
    },
    keepalive: {
      type: [Boolean, Object],
      default: void 0
    },
    route: {
      type: Object
    },
    pageKey: {
      type: [Function, String],
      default: null
    }
  },
  setup(props, { attrs, slots, expose }) {
    const nuxtApp = useNuxtApp();
    const pageRef = ref();
    const forkRoute = inject$1(PageRouteSymbol, null);
    let previousPageKey;
    expose({ pageRef });
    inject$1(LayoutMetaSymbol, null);
    let vnode;
    const done = nuxtApp.deferHydration();
    if (props.pageKey) {
      watch(() => props.pageKey, (next, prev) => {
        if (next !== prev) {
          nuxtApp.callHook("page:loading:start");
        }
      });
    }
    return () => {
      return h(RouterView, { name: props.name, route: props.route, ...attrs }, {
        default: (routeProps) => {
          if (!routeProps.Component) {
            done();
            return;
          }
          const key = generateRouteKey$1(routeProps, props.pageKey);
          if (!nuxtApp.isHydrating && !hasChildrenRoutes(forkRoute, routeProps.route, routeProps.Component) && previousPageKey === key) {
            nuxtApp.callHook("page:loading:end");
          }
          previousPageKey = key;
          const hasTransition = !!(props.transition ?? routeProps.route.meta.pageTransition ?? appPageTransition);
          const transitionProps = hasTransition && _mergeTransitionProps([
            props.transition,
            routeProps.route.meta.pageTransition,
            appPageTransition,
            { onAfterLeave: () => {
              nuxtApp.callHook("page:transition:finish", routeProps.Component);
            } }
          ].filter(Boolean));
          const keepaliveConfig = props.keepalive ?? routeProps.route.meta.keepalive ?? appKeepalive;
          vnode = _wrapIf(
            Transition,
            hasTransition && transitionProps,
            wrapInKeepAlive(
              keepaliveConfig,
              h(Suspense, {
                suspensible: true,
                onPending: () => nuxtApp.callHook("page:start", routeProps.Component),
                onResolve: () => {
                  nextTick(() => nuxtApp.callHook("page:finish", routeProps.Component).then(() => nuxtApp.callHook("page:loading:end")).finally(done));
                }
              }, {
                default: () => {
                  const providerVNode = h(RouteProvider, {
                    key: key || void 0,
                    vnode: slots.default ? h(Fragment, void 0, slots.default(routeProps)) : routeProps.Component,
                    route: routeProps.route,
                    renderKey: key || void 0,
                    trackRootNodes: hasTransition,
                    vnodeRef: pageRef
                  });
                  return providerVNode;
                }
              })
            )
          ).default();
          return vnode;
        }
      });
    };
  }
});
function _mergeTransitionProps(routeProps) {
  const _props = routeProps.map((prop) => ({
    ...prop,
    onAfterLeave: prop.onAfterLeave ? toArray(prop.onAfterLeave) : void 0
  }));
  return defu(..._props);
}
function hasChildrenRoutes(fork, newRoute, Component) {
  if (!fork) {
    return false;
  }
  const index = newRoute.matched.findIndex((m) => {
    var _a;
    return ((_a = m.components) == null ? void 0 : _a.default) === (Component == null ? void 0 : Component.type);
  });
  return index < newRoute.matched.length - 1;
}
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const _sfc_main$2 = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_NuxtLoadingIndicator = __nuxt_component_0;
  const _component_NuxtLayout = __nuxt_component_1;
  const _component_NuxtPage = __nuxt_component_2;
  _push(`<!--[-->`);
  _push(ssrRenderComponent(_component_NuxtLoadingIndicator, null, null, _parent));
  _push(ssrRenderComponent(_component_NuxtLayout, null, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(VApp, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(_component_NuxtPage, null, null, _parent3, _scopeId2));
            } else {
              return [
                createVNode(_component_NuxtPage)
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(VApp, null, {
            default: withCtx(() => [
              createVNode(_component_NuxtPage)
            ]),
            _: 1
          })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`<!--]-->`);
}
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("app.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const AppComponent = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["ssrRender", _sfc_ssrRender]]);
const _sfc_main$1 = {
  __name: "nuxt-error-page",
  __ssrInlineRender: true,
  props: {
    error: Object
  },
  setup(__props) {
    const props = __props;
    const _error = props.error;
    _error.stack ? _error.stack.split("\n").splice(1).map((line) => {
      const text = line.replace("webpack:/", "").replace(".vue", ".js").trim();
      return {
        text,
        internal: line.includes("node_modules") && !line.includes(".cache") || line.includes("internal") || line.includes("new Promise")
      };
    }).map((i) => `<span class="stack${i.internal ? " internal" : ""}">${i.text}</span>`).join("\n") : "";
    const statusCode = Number(_error.statusCode || 500);
    const is404 = statusCode === 404;
    const statusMessage = _error.statusMessage ?? (is404 ? "Page Not Found" : "Internal Server Error");
    const description = _error.message || _error.toString();
    const stack = void 0;
    const _Error404 = defineAsyncComponent(() => import('./error-404-BfGb2RI7.mjs').then((r) => r.default || r));
    const _Error = defineAsyncComponent(() => import('./error-500-5ktNSoSf.mjs').then((r) => r.default || r));
    const ErrorTemplate = is404 ? _Error404 : _Error;
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(ErrorTemplate), mergeProps({ statusCode: unref(statusCode), statusMessage: unref(statusMessage), description: unref(description), stack: unref(stack) }, _attrs), null, _parent));
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/nuxt/dist/app/components/nuxt-error-page.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "nuxt-root",
  __ssrInlineRender: true,
  setup(__props) {
    const IslandRenderer = () => null;
    const nuxtApp = useNuxtApp();
    nuxtApp.deferHydration();
    nuxtApp.ssrContext.url;
    const SingleRenderer = false;
    provide(PageRouteSymbol, useRoute$1());
    nuxtApp.hooks.callHookWith((hooks) => hooks.map((hook) => hook()), "vue:setup");
    const error = useError();
    const abortRender = error.value && !nuxtApp.ssrContext.error;
    onErrorCaptured((err, target, info) => {
      nuxtApp.hooks.callHook("vue:error", err, target, info).catch((hookError) => console.error("[nuxt] Error in `vue:error` hook", hookError));
      {
        const p = nuxtApp.runWithContext(() => showError(err));
        onServerPrefetch(() => p);
        return false;
      }
    });
    const islandContext = nuxtApp.ssrContext.islandContext;
    return (_ctx, _push, _parent, _attrs) => {
      ssrRenderSuspense(_push, {
        default: () => {
          if (unref(abortRender)) {
            _push(`<div></div>`);
          } else if (unref(error)) {
            _push(ssrRenderComponent(unref(_sfc_main$1), { error: unref(error) }, null, _parent));
          } else if (unref(islandContext)) {
            _push(ssrRenderComponent(unref(IslandRenderer), { context: unref(islandContext) }, null, _parent));
          } else if (unref(SingleRenderer)) {
            ssrRenderVNode(_push, createVNode(resolveDynamicComponent(unref(SingleRenderer)), null, null), _parent);
          } else {
            _push(ssrRenderComponent(unref(AppComponent), null, null, _parent));
          }
        },
        _: 1
      });
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/nuxt/dist/app/components/nuxt-root.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
let entry;
{
  entry = async function createNuxtAppServer(ssrContext) {
    const vueApp = createApp(_sfc_main);
    const nuxt = createNuxtApp({ vueApp, ssrContext });
    try {
      await applyPlugins(nuxt, plugins);
      await nuxt.hooks.callHook("app:created", vueApp);
    } catch (error) {
      await nuxt.hooks.callHook("app:error", error);
      nuxt.payload.error = nuxt.payload.error || createError(error);
    }
    if (ssrContext == null ? void 0 : ssrContext._renderResponse) {
      throw new Error("skipping render");
    }
    return vueApp;
  };
}
const entry$1 = (ssrContext) => entry(ssrContext);

<<<<<<< HEAD
export { IconValue as $, useFilter as A, useScrolling as B, useRender as C, forwardRefs as D, VMenu as E, VList as F, VListItem as G, VVirtualScroll as H, VCheckboxBtn as I, VAvatar as J, VIcon as K, ensureValidVNode as L, VChip as M, VDefaultsProvider as N, noop as O, wrapInArray as P, matchesSelector as Q, makeVOverlayProps as R, VDialogTransition as S, useScopeId as T, VOverlay as U, VBtn as V, makeComponentProps as W, provideDefaults as X, makeTagProps as Y, createSimpleFunctional as Z, _export_sfc as _, navigateTo as a, useLayoutItem as a$, makeDensityProps as a0, makeBorderProps as a1, makeDimensionProps as a2, makeElevationProps as a3, makeLoaderProps as a4, makeLocationProps as a5, makePositionProps as a6, makeRoundedProps as a7, makeRouterProps as a8, makeThemeProps as a9, useSsrBoot as aA, useLazy as aB, MaybeTransition as aC, convertToUnit as aD, getDecimals as aE, createRange as aF, clamp as aG, VScaleTransition as aH, keyValues as aI, useBackgroundColor as aJ, makeFocusProps as aK, makeVInputProps as aL, useFocus as aM, VInput as aN, VLabel as aO, makeVBtnProps as aP, animate as aQ, standardEasing as aR, makeVSlideGroupProps as aS, isObject as aT, VSlideGroup as aU, VSelect as aV, VSheet as aW, VResponsive as aX, VExpandTransition as aY, makeLayoutItemProps as aZ, useToggleScope as a_, makeVariantProps as aa, Ripple as ab, provideTheme as ac, useBorder as ad, useVariant as ae, useDensity as af, useDimension as ag, useElevation as ah, useLoader as ai, useLocation as aj, usePosition as ak, useRounded as al, useLink as am, VImg as an, LoaderSlot as ao, genOverlays as ap, useRtl as aq, breakpoints as ar, VSpacer as as, VDataTable as at, VProgressCircular as au, keys as av, useGroup as aw, makeGroupItemProps as ax, makeLazyProps as ay, useGroupItem as az, useRuntimeConfig as b, useLayout as b0, VApp as b1, VListItemTitle as b2, useRoute$1 as c, useCookie as d, entry$1 as default, VTextField as e, useNuxtApp as f, asyncDataDefaults as g, createError as h, injectHead as i, fetchDefaults as j, useRequestFetch as k, makeSelectProps as l, makeFilterProps as m, nuxtLinkDefaults as n, omit as o, propsFactory as p, makeVTextFieldProps as q, resolveUnrefHeadInput as r, makeTransitionProps$1 as s, genericComponent as t, useRouter$1 as u, useLocale as v, useProxiedModel as w, useItems as x, useTextColor as y, useForm as z };
>>>>>>> 453616216b7fdbf211f333044e28fe3dc5efecf3
=======
export { IconValue as $, useFilter as A, useScrolling as B, useRender as C, forwardRefs as D, VMenu as E, VList as F, VListItem as G, VVirtualScroll as H, VCheckboxBtn as I, VAvatar as J, VIcon as K, ensureValidVNode as L, VChip as M, VDefaultsProvider as N, noop as O, wrapInArray as P, matchesSelector as Q, makeVOverlayProps as R, VDialogTransition as S, useScopeId as T, VOverlay as U, VBtn as V, makeComponentProps as W, provideDefaults as X, makeTagProps as Y, createSimpleFunctional as Z, _export_sfc as _, navigateTo as a, VSlideGroup as a$, makeDensityProps as a0, makeBorderProps as a1, makeDimensionProps as a2, makeElevationProps as a3, makeLoaderProps as a4, makeLocationProps as a5, makePositionProps as a6, makeRoundedProps as a7, makeRouterProps as a8, makeThemeProps as a9, filterFieldProps as aA, VField as aB, VCounter as aC, callEvent as aD, convertToUnit as aE, clamp as aF, VProgressCircular as aG, keys as aH, useGroup as aI, makeGroupItemProps as aJ, makeLazyProps as aK, useGroupItem as aL, useSsrBoot as aM, useLazy as aN, MaybeTransition as aO, getDecimals as aP, createRange as aQ, VScaleTransition as aR, keyValues as aS, useBackgroundColor as aT, makeFocusProps as aU, VLabel as aV, makeVBtnProps as aW, animate as aX, standardEasing as aY, makeVSlideGroupProps as aZ, isObject as a_, makeVariantProps as aa, Ripple as ab, provideTheme as ac, useBorder as ad, useVariant as ae, useDensity as af, useDimension as ag, useElevation as ah, useLoader as ai, useLocation as aj, usePosition as ak, useRounded as al, useLink as am, VImg as an, LoaderSlot as ao, genOverlays as ap, useRtl as aq, breakpoints as ar, VSpacer as as, VDataTable as at, makeVInputProps as au, makeVFieldProps as av, Intersect as aw, useFocus as ax, filterInputAttrs as ay, VInput as az, useRuntimeConfig as b, VSelect as b0, VSheet as b1, VResponsive as b2, VExpandTransition as b3, makeLayoutItemProps as b4, useToggleScope as b5, useLayoutItem as b6, useLayout as b7, VApp as b8, VListItemTitle as b9, useRoute$1 as c, useCookie as d, entry$1 as default, VTextField as e, useNuxtApp as f, asyncDataDefaults as g, createError as h, injectHead as i, fetchDefaults as j, useRequestFetch as k, makeSelectProps as l, makeFilterProps as m, nuxtLinkDefaults as n, omit as o, propsFactory as p, makeVTextFieldProps as q, resolveUnrefHeadInput as r, makeTransitionProps$1 as s, genericComponent as t, useRouter$1 as u, useLocale as v, useProxiedModel as w, useItems as x, useTextColor as y, useForm as z };
>>>>>>> 94126230219c630ae8f8cd2e3089913d0ad226a7
//# sourceMappingURL=server.mjs.map
