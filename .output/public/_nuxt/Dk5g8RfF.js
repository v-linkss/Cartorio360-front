import{_ as Y}from"./yJVovkFZ.js";import{a3 as x,aq as F,ar as U,a6 as N,ac as w,b as t,bz as K,aH as X,aG as Z,as as ee,aR as ae,aJ as z,bG as te,aM as le,aQ as oe,at as ne,au as se,aa as k,M as m,b0 as ue,V as re,bm as R,am as H,c0 as ie,r as J,an as ce,h as P,ab as de,j as ve,c1 as me,a8 as fe,c2 as ge,aC as Q,c3 as he,z as p,f as be,bA as ye,bI as _e,c4 as Se,_ as Ve,u as ke,o as $,A as Te,w as n,c5 as xe,a as Be,t as A,q as G,D as I,B as Ce,be as E,y as L,d as T,bf as M,bg as D,c as He,b3 as Pe,O as Ie,c6 as pe,c7 as Ne}from"./DqpMzQgU.js";import{V as we}from"./Dz8Jum05.js";const Re=x({text:String,...F(),...U()},"VToolbarTitle"),Ae=N()({name:"VToolbarTitle",props:Re(),setup(e,f){let{slots:a}=f;return w(()=>{const c=!!(a.default||a.text||e.text);return t(e.tag,{class:["v-toolbar-title",e.class],style:e.style},{default:()=>{var u;return[c&&t("div",{class:"v-toolbar-title__placeholder"},[a.text?a.text():e.text,(u=a.default)==null?void 0:u.call(a)])]}})}),{}}}),Ee=[null,"prominent","default","comfortable","compact"],W=x({absolute:Boolean,collapse:Boolean,color:String,density:{type:String,default:"default",validator:e=>Ee.includes(e)},extended:Boolean,extensionHeight:{type:[Number,String],default:48},flat:Boolean,floating:Boolean,height:{type:[Number,String],default:64},image:String,title:String,...K(),...F(),...X(),...Z(),...U({tag:"header"}),...ee()},"VToolbar"),j=N()({name:"VToolbar",props:W(),setup(e,f){var y;let{slots:a}=f;const{backgroundColorClasses:c,backgroundColorStyles:u}=ae(z(e,"color")),{borderClasses:l}=te(e),{elevationClasses:d}=le(e),{roundedClasses:r}=oe(e),{themeClasses:s}=ne(e),{rtlClasses:b}=se(),v=k(!!(e.extended||(y=a.extension)!=null&&y.call(a))),g=m(()=>parseInt(Number(e.height)+(e.density==="prominent"?Number(e.height):0)-(e.density==="comfortable"?8:0)-(e.density==="compact"?16:0),10)),S=m(()=>v.value?parseInt(Number(e.extensionHeight)+(e.density==="prominent"?Number(e.extensionHeight):0)-(e.density==="comfortable"?4:0)-(e.density==="compact"?8:0),10):0);return ue({VBtn:{variant:"text"}}),w(()=>{var B;const i=!!(e.title||a.title),h=!!(a.image||e.image),V=(B=a.extension)==null?void 0:B.call(a);return v.value=!!(e.extended||V),t(e.tag,{class:["v-toolbar",{"v-toolbar--absolute":e.absolute,"v-toolbar--collapse":e.collapse,"v-toolbar--flat":e.flat,"v-toolbar--floating":e.floating,[`v-toolbar--density-${e.density}`]:!0},c.value,l.value,d.value,r.value,s.value,b.value,e.class],style:[u.value,e.style]},{default:()=>[h&&t("div",{key:"image",class:"v-toolbar__image"},[a.image?t(R,{key:"image-defaults",disabled:!e.image,defaults:{VImg:{cover:!0,src:e.image}}},a.image):t(re,{key:"image-img",cover:!0,src:e.image},null)]),t(R,{defaults:{VTabs:{height:H(g.value)}}},{default:()=>{var C,o,_;return[t("div",{class:"v-toolbar__content",style:{height:H(g.value)}},[a.prepend&&t("div",{class:"v-toolbar__prepend"},[(C=a.prepend)==null?void 0:C.call(a)]),i&&t(Ae,{key:"title",text:e.title},{text:a.title}),(o=a.default)==null?void 0:o.call(a),a.append&&t("div",{class:"v-toolbar__append"},[(_=a.append)==null?void 0:_.call(a)])])]}}),t(R,{defaults:{VTabs:{height:H(S.value)}}},{default:()=>[t(ie,null,{default:()=>[v.value&&t("div",{class:"v-toolbar__extension",style:{height:H(S.value)}},[V])]})]})]})}),{contentHeight:g,extensionHeight:S}}}),Le=x({scrollTarget:{type:String},scrollThreshold:{type:[String,Number],default:300}},"scroll");function Me(e){let f=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};const{canScroll:a}=f;let c=0,u=0;const l=J(null),d=k(0),r=k(0),s=k(0),b=k(!1),v=k(!1),g=m(()=>Number(e.scrollThreshold)),S=m(()=>ce((g.value-d.value)/g.value||0)),y=()=>{const i=l.value;if(!i||a&&!a.value)return;c=d.value,d.value="window"in i?i.pageYOffset:i.scrollTop;const h=i instanceof Window?document.documentElement.scrollHeight:i.scrollHeight;if(u!==h){u=h;return}v.value=d.value<c,s.value=Math.abs(d.value-g.value)};return P(v,()=>{r.value=r.value||d.value}),P(b,()=>{r.value=0}),de(()=>{P(()=>e.scrollTarget,i=>{var V;const h=i?document.querySelector(i):window;h&&h!==l.value&&((V=l.value)==null||V.removeEventListener("scroll",y),l.value=h,l.value.addEventListener("scroll",y,{passive:!0}))},{immediate:!0})}),ve(()=>{var i;(i=l.value)==null||i.removeEventListener("scroll",y)}),a&&P(a,y,{immediate:!0}),{scrollThreshold:g,currentScroll:d,currentThreshold:s,isScrollActive:b,scrollRatio:S,isScrollingUp:v,savedScroll:r}}const De=x({scrollBehavior:String,modelValue:{type:Boolean,default:!0},location:{type:String,default:"top",validator:e=>["top","bottom"].includes(e)},...W(),...me(),...Le(),height:{type:[Number,String],default:64}},"VAppBar"),ze=N()({name:"VAppBar",props:De(),emits:{"update:modelValue":e=>!0},setup(e,f){let{slots:a}=f;const c=J(),u=fe(e,"modelValue"),l=m(()=>{var _;const o=new Set(((_=e.scrollBehavior)==null?void 0:_.split(" "))??[]);return{hide:o.has("hide"),fullyHide:o.has("fully-hide"),inverted:o.has("inverted"),collapse:o.has("collapse"),elevate:o.has("elevate"),fadeImage:o.has("fade-image")}}),d=m(()=>{const o=l.value;return o.hide||o.fullyHide||o.inverted||o.collapse||o.elevate||o.fadeImage||!u.value}),{currentScroll:r,scrollThreshold:s,isScrollingUp:b,scrollRatio:v}=Me(e,{canScroll:d}),g=m(()=>l.value.hide||l.value.fullyHide),S=m(()=>e.collapse||l.value.collapse&&(l.value.inverted?v.value>0:v.value===0)),y=m(()=>e.flat||l.value.fullyHide&&!u.value||l.value.elevate&&(l.value.inverted?r.value>0:r.value===0)),i=m(()=>l.value.fadeImage?l.value.inverted?1-v.value:v.value:void 0),h=m(()=>{var q,O;const o=Number(((q=c.value)==null?void 0:q.contentHeight)??e.height),_=Number(((O=c.value)==null?void 0:O.extensionHeight)??0);return g.value?r.value<s.value||l.value.fullyHide?o+_:o:o+_});ge(m(()=>!!e.scrollBehavior),()=>{be(()=>{g.value?l.value.inverted?u.value=r.value>s.value:u.value=b.value||r.value<s.value:u.value=!0})});const{ssrBootStyles:V}=Q(),{layoutItemStyles:B,layoutIsReady:C}=he({id:e.name,order:m(()=>parseInt(e.order,10)),position:z(e,"location"),layoutSize:h,elementSize:k(void 0),active:u,absolute:z(e,"absolute")});return w(()=>{const o=j.filterProps(e);return t(j,p({ref:c,class:["v-app-bar",{"v-app-bar--bottom":e.location==="bottom"},e.class],style:[{...B.value,"--v-toolbar-image-opacity":i.value,height:void 0,...V.value},e.style]},o,{collapse:S.value,flat:y.value}),a)}),C}}),Fe=x({scrollable:Boolean,...F(),...ye(),...U({tag:"main"})},"VMain"),Ue=N()({name:"VMain",props:Fe(),setup(e,f){let{slots:a}=f;const{dimensionStyles:c}=_e(e),{mainStyles:u,layoutIsReady:l}=Se(),{ssrBootStyles:d}=Q();return w(()=>t(e.tag,{class:["v-main",{"v-main--scrollable":e.scrollable},e.class],style:[u.value,d.value,c.value,e.style]},{default:()=>{var r,s;return[e.scrollable?t("div",{class:"v-main__scroller"},[(r=a.default)==null?void 0:r.call(a)]):(s=a.default)==null?void 0:s.call(a)]}})),l}}),qe={style:{color:"#429946","margin-left":"30px"}},Oe={__name:"default",setup(e){const f=ke(),a=[{title:"Alterar Senha"},{title:"Sair"}];function c(l){l==="Sair"&&u()}function u(){I("user-data").value="",I("auth_token").value="",f.push("/login")}return(l,d)=>{const r=Y;return $(),Te(xe,null,{default:n(()=>[t(ze,{color:"#C8FCCA",height:"85"},{default:n(()=>[Be("h5",qe,A(("useCookie"in l?l.useCookie:G(I))("user-data").value.cartorio_nome),1),t(Ce),t(E,null,{activator:n(({props:s})=>[t(L,p({style:{color:"#429946"}},s),{default:n(()=>[T(" Cadastros ")]),_:2},1040)]),default:n(()=>[t(M,null,{default:n(()=>[t(D,null,{default:n(()=>[t(r,{style:{"text-decoration":"none",color:"inherit"},to:"/pessoas/registros"},{default:n(()=>[T(" Pessoas ")]),_:1})]),_:1})]),_:1})]),_:1}),t(E,null,{activator:n(({props:s})=>[t(L,p({style:{color:"#429946"}},s),{default:n(()=>[T(" Atendimento ")]),_:2},1040)]),default:n(()=>[t(M,null,{default:n(()=>[t(D,null,{default:n(()=>[t(r,{style:{"text-decoration":"none",color:"inherit"},to:"/ordens-servicos"},{default:n(()=>[T(" Ordens de Serviços ")]),_:1})]),_:1})]),_:1})]),_:1}),t(E,null,{activator:n(({props:s})=>[t(L,p({class:"user"},s),{default:n(()=>[T(A(("useCookie"in l?l.useCookie:G(I))("user-data").value.nome),1)]),_:2},1040)]),default:n(()=>[t(M,null,{default:n(()=>[($(),He(Ie,null,Pe(a,(s,b)=>t(D,{key:b,value:b,onClick:v=>c(s.title)},{default:n(()=>[t(Ne,null,{default:n(()=>[T(A(s.title),1)]),_:2},1024)]),_:2},1032,["value","onClick"])),64))]),_:1})]),_:1})]),_:1}),t(Ue,null,{default:n(()=>[t(we,null,{default:n(()=>[pe(l.$slots,"default",{},void 0,!0)]),_:3})]),_:3})]),_:3})}}},Je=Ve(Oe,[["__scopeId","data-v-06ea286a"]]);export{Je as default};