import{_ as Z}from"./COGwOujT.js";import{Q as x,ae as U,af as $,T as p,$ as w,b as a,bn as G,av as J,au as K,ag as ee,aF as te,ax as F,bu as ae,aA as le,aE as oe,ah as ne,ai as se,Y as T,M as m,aQ as ue,V as re,ba as R,a9 as P,bQ as ie,r as Y,aa as ce,h as H,Z as de,j as ve,bR as me,W as fe,bS as ge,aq as j,bT as he,z as N,f as be,bo as ye,bw as _e,bU as Se,_ as Ve,u as Te,o as Q,A as ke,w as n,bV as xe,a as Be,t as A,q as W,D as I,B as Ce,b2 as E,y as L,d as k,b3 as M,b4 as D,c as Pe,aT as He,N as Ie,bW as Ne,bX as pe}from"./BoJ9xM4o.js";import{V as we}from"./vN-BWfmu.js";const Re=x({text:String,...U(),...$()},"VToolbarTitle"),Ae=p()({name:"VToolbarTitle",props:Re(),setup(e,f){let{slots:t}=f;return w(()=>{const c=!!(t.default||t.text||e.text);return a(e.tag,{class:["v-toolbar-title",e.class],style:e.style},{default:()=>{var u;return[c&&a("div",{class:"v-toolbar-title__placeholder"},[t.text?t.text():e.text,(u=t.default)==null?void 0:u.call(t)])]}})}),{}}}),Ee=[null,"prominent","default","comfortable","compact"],X=x({absolute:Boolean,collapse:Boolean,color:String,density:{type:String,default:"default",validator:e=>Ee.includes(e)},extended:Boolean,extensionHeight:{type:[Number,String],default:48},flat:Boolean,floating:Boolean,height:{type:[Number,String],default:64},image:String,title:String,...G(),...U(),...J(),...K(),...$({tag:"header"}),...ee()},"VToolbar"),O=p()({name:"VToolbar",props:X(),setup(e,f){var y;let{slots:t}=f;const{backgroundColorClasses:c,backgroundColorStyles:u}=te(F(e,"color")),{borderClasses:l}=ae(e),{elevationClasses:d}=le(e),{roundedClasses:r}=oe(e),{themeClasses:s}=ne(e),{rtlClasses:b}=se(),v=T(!!(e.extended||(y=t.extension)!=null&&y.call(t))),g=m(()=>parseInt(Number(e.height)+(e.density==="prominent"?Number(e.height):0)-(e.density==="comfortable"?8:0)-(e.density==="compact"?16:0),10)),S=m(()=>v.value?parseInt(Number(e.extensionHeight)+(e.density==="prominent"?Number(e.extensionHeight):0)-(e.density==="comfortable"?4:0)-(e.density==="compact"?8:0),10):0);return ue({VBtn:{variant:"text"}}),w(()=>{var B;const i=!!(e.title||t.title),h=!!(t.image||e.image),V=(B=t.extension)==null?void 0:B.call(t);return v.value=!!(e.extended||V),a(e.tag,{class:["v-toolbar",{"v-toolbar--absolute":e.absolute,"v-toolbar--collapse":e.collapse,"v-toolbar--flat":e.flat,"v-toolbar--floating":e.floating,[`v-toolbar--density-${e.density}`]:!0},c.value,l.value,d.value,r.value,s.value,b.value,e.class],style:[u.value,e.style]},{default:()=>[h&&a("div",{key:"image",class:"v-toolbar__image"},[t.image?a(R,{key:"image-defaults",disabled:!e.image,defaults:{VImg:{cover:!0,src:e.image}}},t.image):a(re,{key:"image-img",cover:!0,src:e.image},null)]),a(R,{defaults:{VTabs:{height:P(g.value)}}},{default:()=>{var C,o,_;return[a("div",{class:"v-toolbar__content",style:{height:P(g.value)}},[t.prepend&&a("div",{class:"v-toolbar__prepend"},[(C=t.prepend)==null?void 0:C.call(t)]),i&&a(Ae,{key:"title",text:e.title},{text:t.title}),(o=t.default)==null?void 0:o.call(t),t.append&&a("div",{class:"v-toolbar__append"},[(_=t.append)==null?void 0:_.call(t)])])]}}),a(R,{defaults:{VTabs:{height:P(S.value)}}},{default:()=>[a(ie,null,{default:()=>[v.value&&a("div",{class:"v-toolbar__extension",style:{height:P(S.value)}},[V])]})]})]})}),{contentHeight:g,extensionHeight:S}}}),Le=x({scrollTarget:{type:String},scrollThreshold:{type:[String,Number],default:300}},"scroll");function Me(e){let f=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};const{canScroll:t}=f;let c=0,u=0;const l=Y(null),d=T(0),r=T(0),s=T(0),b=T(!1),v=T(!1),g=m(()=>Number(e.scrollThreshold)),S=m(()=>ce((g.value-d.value)/g.value||0)),y=()=>{const i=l.value;if(!i||t&&!t.value)return;c=d.value,d.value="window"in i?i.pageYOffset:i.scrollTop;const h=i instanceof Window?document.documentElement.scrollHeight:i.scrollHeight;if(u!==h){u=h;return}v.value=d.value<c,s.value=Math.abs(d.value-g.value)};return H(v,()=>{r.value=r.value||d.value}),H(b,()=>{r.value=0}),de(()=>{H(()=>e.scrollTarget,i=>{var V;const h=i?document.querySelector(i):window;h&&h!==l.value&&((V=l.value)==null||V.removeEventListener("scroll",y),l.value=h,l.value.addEventListener("scroll",y,{passive:!0}))},{immediate:!0})}),ve(()=>{var i;(i=l.value)==null||i.removeEventListener("scroll",y)}),t&&H(t,y,{immediate:!0}),{scrollThreshold:g,currentScroll:d,currentThreshold:s,isScrollActive:b,scrollRatio:S,isScrollingUp:v,savedScroll:r}}const De=x({scrollBehavior:String,modelValue:{type:Boolean,default:!0},location:{type:String,default:"top",validator:e=>["top","bottom"].includes(e)},...X(),...me(),...Le(),height:{type:[Number,String],default:64}},"VAppBar"),Fe=p()({name:"VAppBar",props:De(),emits:{"update:modelValue":e=>!0},setup(e,f){let{slots:t}=f;const c=Y(),u=fe(e,"modelValue"),l=m(()=>{var _;const o=new Set(((_=e.scrollBehavior)==null?void 0:_.split(" "))??[]);return{hide:o.has("hide"),fullyHide:o.has("fully-hide"),inverted:o.has("inverted"),collapse:o.has("collapse"),elevate:o.has("elevate"),fadeImage:o.has("fade-image")}}),d=m(()=>{const o=l.value;return o.hide||o.fullyHide||o.inverted||o.collapse||o.elevate||o.fadeImage||!u.value}),{currentScroll:r,scrollThreshold:s,isScrollingUp:b,scrollRatio:v}=Me(e,{canScroll:d}),g=m(()=>l.value.hide||l.value.fullyHide),S=m(()=>e.collapse||l.value.collapse&&(l.value.inverted?v.value>0:v.value===0)),y=m(()=>e.flat||l.value.fullyHide&&!u.value||l.value.elevate&&(l.value.inverted?r.value>0:r.value===0)),i=m(()=>l.value.fadeImage?l.value.inverted?1-v.value:v.value:void 0),h=m(()=>{var q,z;const o=Number(((q=c.value)==null?void 0:q.contentHeight)??e.height),_=Number(((z=c.value)==null?void 0:z.extensionHeight)??0);return g.value?r.value<s.value||l.value.fullyHide?o+_:o:o+_});ge(m(()=>!!e.scrollBehavior),()=>{be(()=>{g.value?l.value.inverted?u.value=r.value>s.value:u.value=b.value||r.value<s.value:u.value=!0})});const{ssrBootStyles:V}=j(),{layoutItemStyles:B,layoutIsReady:C}=he({id:e.name,order:m(()=>parseInt(e.order,10)),position:F(e,"location"),layoutSize:h,elementSize:T(void 0),active:u,absolute:F(e,"absolute")});return w(()=>{const o=O.filterProps(e);return a(O,N({ref:c,class:["v-app-bar",{"v-app-bar--bottom":e.location==="bottom"},e.class],style:[{...B.value,"--v-toolbar-image-opacity":i.value,height:void 0,...V.value},e.style]},o,{collapse:S.value,flat:y.value}),t)}),C}}),Ue=x({scrollable:Boolean,...U(),...ye(),...$({tag:"main"})},"VMain"),$e=p()({name:"VMain",props:Ue(),setup(e,f){let{slots:t}=f;const{dimensionStyles:c}=_e(e),{mainStyles:u,layoutIsReady:l}=Se(),{ssrBootStyles:d}=j();return w(()=>a(e.tag,{class:["v-main",{"v-main--scrollable":e.scrollable},e.class],style:[u.value,d.value,c.value,e.style]},{default:()=>{var r,s;return[e.scrollable?a("div",{class:"v-main__scroller"},[(r=t.default)==null?void 0:r.call(t)]):(s=t.default)==null?void 0:s.call(t)]}})),l}}),qe={style:{color:"#429946","margin-left":"30px"}},ze={__name:"default",setup(e){const f=Te(),t=[{title:"Alterar Senha"},{title:"Sair"}];function c(l){l==="Sair"&&u()}function u(){I("user-data").value="",I("auth_token").value="",f.push("/login")}return(l,d)=>{const r=Z;return Q(),ke(xe,null,{default:n(()=>[a(Fe,{color:"#C8FCCA",height:"85"},{default:n(()=>[Be("h5",qe,A(("useCookie"in l?l.useCookie:W(I))("user-data").value.cartorio_nome),1),a(Ce),a(E,null,{activator:n(({props:s})=>[a(L,N({style:{color:"#429946"}},s),{default:n(()=>[k(" Cadastros ")]),_:2},1040)]),default:n(()=>[a(M,null,{default:n(()=>[a(D,null,{default:n(()=>[a(r,{style:{"text-decoration":"none",color:"inherit"},to:"/pessoas/registros"},{default:n(()=>[k(" Pessoas ")]),_:1})]),_:1})]),_:1})]),_:1}),a(E,null,{activator:n(({props:s})=>[a(L,N({style:{color:"#429946"}},s),{default:n(()=>[k(" Atendimento ")]),_:2},1040)]),default:n(()=>[a(M,null,{default:n(()=>[a(D,null,{default:n(()=>[a(r,{style:{"text-decoration":"none",color:"inherit"},to:"/ordens-servicos"},{default:n(()=>[k(" Ordens de Serviços ")]),_:1})]),_:1})]),_:1})]),_:1}),a(E,null,{activator:n(({props:s})=>[a(L,N({class:"user"},s),{default:n(()=>[k(A(("useCookie"in l?l.useCookie:W(I))("user-data").value.nome),1)]),_:2},1040)]),default:n(()=>[a(M,null,{default:n(()=>[(Q(),Pe(Ie,null,He(t,(s,b)=>a(D,{key:b,value:b,onClick:v=>c(s.title)},{default:n(()=>[a(pe,null,{default:n(()=>[k(A(s.title),1)]),_:2},1024)]),_:2},1032,["value","onClick"])),64))]),_:1})]),_:1})]),_:1}),a($e,null,{default:n(()=>[a(we,null,{default:n(()=>[Ne(l.$slots,"default",{},void 0,!0)]),_:3})]),_:3})]),_:3})}}},Ye=Ve(ze,[["__scopeId","data-v-06ea286a"]]);export{Ye as default};