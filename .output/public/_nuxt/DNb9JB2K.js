import{R as C,aL as Q,aM as Y,W as b,as as Z,aE as $,r as q,aN as G,h as D,a2 as V,ay as J,ac as K,aO as L,z as h,b as n,aP as p,aQ as ee,S as P,aF as ae,T as x,aR as te,aS as A,aC as O,N as B,aT as N,aU as R,aV as ne,aW as le,ae as se,aX as ie,aY as de,aZ as re,ad as ce,a_ as oe,U as ue,a$ as ve,aj as me,X as fe,b0 as ge,b1 as ye,aD as be,b2 as Ve,ak as ke,b3 as Ce,b4 as Pe,b5 as Ie,ao as pe,b6 as Ae,M as F,I as Se,H as he,V as xe,b7 as Ee,b8 as Te}from"./j1uFeTuL.js";const De=C({fullscreen:Boolean,retainFocus:{type:Boolean,default:!0},scrollable:Boolean,...Q({origin:"center center",scrollStrategy:"block",transition:{component:Y},zIndex:2400})},"VDialog"),We=b()({name:"VDialog",props:De(),emits:{"update:modelValue":e=>!0,afterLeave:()=>!0},setup(e,i){let{emit:t,slots:a}=i;const c=Z(e,"modelValue"),{scopeId:f}=$(),s=q();function g(l){var u,m;const o=l.relatedTarget,v=l.target;if(o!==v&&((u=s.value)!=null&&u.contentEl)&&((m=s.value)!=null&&m.globalTop)&&![document,s.value.contentEl].includes(v)&&!s.value.contentEl.contains(v)){const d=ee(s.value.contentEl);if(!d.length)return;const r=d[0],S=d[d.length-1];o===r?S.focus():r.focus()}}G&&D(()=>c.value&&e.retainFocus,l=>{l?document.addEventListener("focusin",g):document.removeEventListener("focusin",g)},{immediate:!0});function k(){var l;(l=s.value)!=null&&l.contentEl&&!s.value.contentEl.contains(document.activeElement)&&s.value.contentEl.focus({preventScroll:!0})}function y(){t("afterLeave")}return D(c,async l=>{var o;l||(await K(),(o=s.value.activatorEl)==null||o.focus({preventScroll:!0}))}),V(()=>{const l=L.filterProps(e),o=h({"aria-haspopup":"dialog","aria-expanded":String(c.value)},e.activatorProps),v=h({tabindex:-1},e.contentProps);return n(L,h({ref:s,class:["v-dialog",{"v-dialog--fullscreen":e.fullscreen,"v-dialog--scrollable":e.scrollable},e.class],style:e.style},l,{modelValue:c.value,"onUpdate:modelValue":u=>c.value=u,"aria-modal":"true",activatorProps:o,contentProps:v,role:"dialog",onAfterEnter:k,onAfterLeave:y},f),{activator:a.activator,default:function(){for(var u=arguments.length,m=new Array(u),d=0;d<u;d++)m[d]=arguments[d];return n(p,{root:"VDialog"},{default:()=>{var r;return[(r=a.default)==null?void 0:r.call(a,...m)]}})}})}),J({},s)}}),Le=b()({name:"VCardActions",props:P(),setup(e,i){let{slots:t}=i;return ae({VBtn:{slim:!0,variant:"text"}}),V(()=>{var a;return n("div",{class:["v-card-actions",e.class],style:e.style},[(a=t.default)==null?void 0:a.call(t)])}),{}}}),Be=C({opacity:[Number,String],...P(),...x()},"VCardSubtitle"),Ne=b()({name:"VCardSubtitle",props:Be(),setup(e,i){let{slots:t}=i;return V(()=>n(e.tag,{class:["v-card-subtitle",e.class],style:[{"--v-card-subtitle-opacity":e.opacity},e.style]},t)),{}}}),Re=te("v-card-title"),Fe=C({appendAvatar:String,appendIcon:A,prependAvatar:String,prependIcon:A,subtitle:[String,Number],title:[String,Number],...P(),...O()},"VCardItem"),Oe=b()({name:"VCardItem",props:Fe(),setup(e,i){let{slots:t}=i;return V(()=>{var y;const a=!!(e.prependAvatar||e.prependIcon),c=!!(a||t.prepend),f=!!(e.appendAvatar||e.appendIcon),s=!!(f||t.append),g=!!(e.title!=null||t.title),k=!!(e.subtitle!=null||t.subtitle);return n("div",{class:["v-card-item",e.class],style:e.style},[c&&n("div",{key:"prepend",class:"v-card-item__prepend"},[t.prepend?n(p,{key:"prepend-defaults",disabled:!a,defaults:{VAvatar:{density:e.density,image:e.prependAvatar},VIcon:{density:e.density,icon:e.prependIcon}}},t.prepend):n(B,null,[e.prependAvatar&&n(N,{key:"prepend-avatar",density:e.density,image:e.prependAvatar},null),e.prependIcon&&n(R,{key:"prepend-icon",density:e.density,icon:e.prependIcon},null)])]),n("div",{class:"v-card-item__content"},[g&&n(Re,{key:"title"},{default:()=>{var l;return[((l=t.title)==null?void 0:l.call(t))??e.title]}}),k&&n(Ne,{key:"subtitle"},{default:()=>{var l;return[((l=t.subtitle)==null?void 0:l.call(t))??e.subtitle]}}),(y=t.default)==null?void 0:y.call(t)]),s&&n("div",{key:"append",class:"v-card-item__append"},[t.append?n(p,{key:"append-defaults",disabled:!f,defaults:{VAvatar:{density:e.density,image:e.appendAvatar},VIcon:{density:e.density,icon:e.appendIcon}}},t.append):n(B,null,[e.appendIcon&&n(R,{key:"append-icon",density:e.density,icon:e.appendIcon},null),e.appendAvatar&&n(N,{key:"append-avatar",density:e.density,image:e.appendAvatar},null)])])])}),{}}}),_e=C({opacity:[Number,String],...P(),...x()},"VCardText"),we=b()({name:"VCardText",props:_e(),setup(e,i){let{slots:t}=i;return V(()=>n(e.tag,{class:["v-card-text",e.class],style:[{"--v-card-text-opacity":e.opacity},e.style]},t)),{}}}),Me=C({appendAvatar:String,appendIcon:A,disabled:Boolean,flat:Boolean,hover:Boolean,image:String,link:{type:Boolean,default:void 0},prependAvatar:String,prependIcon:A,ripple:{type:[Boolean,Object],default:!0},subtitle:[String,Number],text:[String,Number],title:[String,Number],...ne(),...P(),...O(),...le(),...se(),...ie(),...de(),...re(),...ce(),...oe(),...x(),...ue(),...ve({variant:"elevated"})},"VCard"),je=b()({name:"VCard",directives:{Ripple:me},props:Me(),setup(e,i){let{attrs:t,slots:a}=i;const{themeClasses:c}=fe(e),{borderClasses:f}=ge(e),{colorClasses:s,colorStyles:g,variantClasses:k}=ye(e),{densityClasses:y}=be(e),{dimensionStyles:l}=Ve(e),{elevationClasses:o}=ke(e),{loaderClasses:v}=Ce(e),{locationStyles:u}=Pe(e),{positionClasses:m}=Ie(e),{roundedClasses:d}=pe(e),r=Ae(e,t),S=F(()=>e.link!==!1&&r.isLink.value),I=F(()=>!e.disabled&&e.link!==!1&&(e.link||r.isClickable.value));return V(()=>{const _=S.value?"a":e.tag,w=!!(a.title||e.title!=null),M=!!(a.subtitle||e.subtitle!=null),U=w||M,W=!!(a.append||e.appendAvatar||e.appendIcon),j=!!(a.prepend||e.prependAvatar||e.prependIcon),z=!!(a.image||e.image),H=U||j||W,X=!!(a.text||e.text!=null);return Se(n(_,{class:["v-card",{"v-card--disabled":e.disabled,"v-card--flat":e.flat,"v-card--hover":e.hover&&!(e.disabled||e.flat),"v-card--link":I.value},c.value,f.value,s.value,y.value,o.value,v.value,m.value,d.value,k.value,e.class],style:[g.value,l.value,u.value,e.style],href:r.href.value,onClick:I.value&&r.navigate,tabindex:e.disabled?-1:void 0},{default:()=>{var E;return[z&&n("div",{key:"image",class:"v-card__image"},[a.image?n(p,{key:"image-defaults",disabled:!e.image,defaults:{VImg:{cover:!0,src:e.image}}},a.image):n(xe,{key:"image-img",cover:!0,src:e.image},null)]),n(Ee,{name:"v-card",active:!!e.loading,color:typeof e.loading=="boolean"?void 0:e.loading},{default:a.loader}),H&&n(Oe,{key:"item",prependAvatar:e.prependAvatar,prependIcon:e.prependIcon,title:e.title,subtitle:e.subtitle,appendAvatar:e.appendAvatar,appendIcon:e.appendIcon},{default:a.item,prepend:a.prepend,title:a.title,subtitle:a.subtitle,append:a.append}),X&&n(we,{key:"text"},{default:()=>{var T;return[((T=a.text)==null?void 0:T.call(a))??e.text]}}),(E=a.default)==null?void 0:E.call(a),a.actions&&n(Le,null,{default:a.actions}),Te(I.value,"v-card")]}}),[[he("ripple"),I.value&&e.ripple]])}),{}}});export{We as V,je as a,Re as b,we as c,Le as d};