import{S as P,aP as j,aQ as G,X as y,at as Q,aF as Z,r as $,aR as q,h as D,a3 as V,az as J,ad as K,aS as L,z as h,b as n,aT as I,aU as ee,T as p,aG as ae,U as x,aV as te,aW as A,aD as _,N as B,aX as N,P as R,aY as ne,aZ as le,af as se,a_ as ie,a$ as de,b0 as re,ae as ce,b1 as oe,W as ue,b2 as ve,ak as me,Y as fe,b3 as be,b4 as ge,aE as ye,b5 as Ve,al as ke,b6 as Pe,b7 as pe,b8 as Ce,ap as Ie,b9 as Ae,M as F,I as Se,H as he,V as xe,ba as Ee,bb as Te}from"./eeQKZhxA.js";const De=P({fullscreen:Boolean,retainFocus:{type:Boolean,default:!0},scrollable:Boolean,...j({origin:"center center",scrollStrategy:"block",transition:{component:G},zIndex:2400})},"VDialog"),Ue=y()({name:"VDialog",props:De(),emits:{"update:modelValue":e=>!0,afterLeave:()=>!0},setup(e,i){let{emit:t,slots:a}=i;const c=Q(e,"modelValue"),{scopeId:f}=Z(),s=$();function b(l){var u,m;const o=l.relatedTarget,v=l.target;if(o!==v&&((u=s.value)!=null&&u.contentEl)&&((m=s.value)!=null&&m.globalTop)&&![document,s.value.contentEl].includes(v)&&!s.value.contentEl.contains(v)){const d=ee(s.value.contentEl);if(!d.length)return;const r=d[0],S=d[d.length-1];o===r?S.focus():r.focus()}}q&&D(()=>c.value&&e.retainFocus,l=>{l?document.addEventListener("focusin",b):document.removeEventListener("focusin",b)},{immediate:!0});function k(){var l;(l=s.value)!=null&&l.contentEl&&!s.value.contentEl.contains(document.activeElement)&&s.value.contentEl.focus({preventScroll:!0})}function g(){t("afterLeave")}return D(c,async l=>{var o;l||(await K(),(o=s.value.activatorEl)==null||o.focus({preventScroll:!0}))}),V(()=>{const l=L.filterProps(e),o=h({"aria-haspopup":"dialog","aria-expanded":String(c.value)},e.activatorProps),v=h({tabindex:-1},e.contentProps);return n(L,h({ref:s,class:["v-dialog",{"v-dialog--fullscreen":e.fullscreen,"v-dialog--scrollable":e.scrollable},e.class],style:e.style},l,{modelValue:c.value,"onUpdate:modelValue":u=>c.value=u,"aria-modal":"true",activatorProps:o,contentProps:v,role:"dialog",onAfterEnter:k,onAfterLeave:g},f),{activator:a.activator,default:function(){for(var u=arguments.length,m=new Array(u),d=0;d<u;d++)m[d]=arguments[d];return n(I,{root:"VDialog"},{default:()=>{var r;return[(r=a.default)==null?void 0:r.call(a,...m)]}})}})}),J({},s)}}),Le=y()({name:"VCardActions",props:p(),setup(e,i){let{slots:t}=i;return ae({VBtn:{slim:!0,variant:"text"}}),V(()=>{var a;return n("div",{class:["v-card-actions",e.class],style:e.style},[(a=t.default)==null?void 0:a.call(t)])}),{}}}),Be=P({opacity:[Number,String],...p(),...x()},"VCardSubtitle"),Ne=y()({name:"VCardSubtitle",props:Be(),setup(e,i){let{slots:t}=i;return V(()=>n(e.tag,{class:["v-card-subtitle",e.class],style:[{"--v-card-subtitle-opacity":e.opacity},e.style]},t)),{}}}),Re=te("v-card-title"),Fe=P({appendAvatar:String,appendIcon:A,prependAvatar:String,prependIcon:A,subtitle:[String,Number],title:[String,Number],...p(),..._()},"VCardItem"),_e=y()({name:"VCardItem",props:Fe(),setup(e,i){let{slots:t}=i;return V(()=>{var g;const a=!!(e.prependAvatar||e.prependIcon),c=!!(a||t.prepend),f=!!(e.appendAvatar||e.appendIcon),s=!!(f||t.append),b=!!(e.title!=null||t.title),k=!!(e.subtitle!=null||t.subtitle);return n("div",{class:["v-card-item",e.class],style:e.style},[c&&n("div",{key:"prepend",class:"v-card-item__prepend"},[t.prepend?n(I,{key:"prepend-defaults",disabled:!a,defaults:{VAvatar:{density:e.density,image:e.prependAvatar},VIcon:{density:e.density,icon:e.prependIcon}}},t.prepend):n(B,null,[e.prependAvatar&&n(N,{key:"prepend-avatar",density:e.density,image:e.prependAvatar},null),e.prependIcon&&n(R,{key:"prepend-icon",density:e.density,icon:e.prependIcon},null)])]),n("div",{class:"v-card-item__content"},[b&&n(Re,{key:"title"},{default:()=>{var l;return[((l=t.title)==null?void 0:l.call(t))??e.title]}}),k&&n(Ne,{key:"subtitle"},{default:()=>{var l;return[((l=t.subtitle)==null?void 0:l.call(t))??e.subtitle]}}),(g=t.default)==null?void 0:g.call(t)]),s&&n("div",{key:"append",class:"v-card-item__append"},[t.append?n(I,{key:"append-defaults",disabled:!f,defaults:{VAvatar:{density:e.density,image:e.appendAvatar},VIcon:{density:e.density,icon:e.appendIcon}}},t.append):n(B,null,[e.appendIcon&&n(R,{key:"append-icon",density:e.density,icon:e.appendIcon},null),e.appendAvatar&&n(N,{key:"append-avatar",density:e.density,image:e.appendAvatar},null)])])])}),{}}}),we=P({opacity:[Number,String],...p(),...x()},"VCardText"),Oe=y()({name:"VCardText",props:we(),setup(e,i){let{slots:t}=i;return V(()=>n(e.tag,{class:["v-card-text",e.class],style:[{"--v-card-text-opacity":e.opacity},e.style]},t)),{}}}),Me=P({appendAvatar:String,appendIcon:A,disabled:Boolean,flat:Boolean,hover:Boolean,image:String,link:{type:Boolean,default:void 0},prependAvatar:String,prependIcon:A,ripple:{type:[Boolean,Object],default:!0},subtitle:[String,Number],text:[String,Number],title:[String,Number],...ne(),...p(),..._(),...le(),...se(),...ie(),...de(),...re(),...ce(),...oe(),...x(),...ue(),...ve({variant:"elevated"})},"VCard"),We=y()({name:"VCard",directives:{Ripple:me},props:Me(),setup(e,i){let{attrs:t,slots:a}=i;const{themeClasses:c}=fe(e),{borderClasses:f}=be(e),{colorClasses:s,colorStyles:b,variantClasses:k}=ge(e),{densityClasses:g}=ye(e),{dimensionStyles:l}=Ve(e),{elevationClasses:o}=ke(e),{loaderClasses:v}=Pe(e),{locationStyles:u}=pe(e),{positionClasses:m}=Ce(e),{roundedClasses:d}=Ie(e),r=Ae(e,t),S=F(()=>e.link!==!1&&r.isLink.value),C=F(()=>!e.disabled&&e.link!==!1&&(e.link||r.isClickable.value));return V(()=>{const w=S.value?"a":e.tag,O=!!(a.title||e.title!=null),M=!!(a.subtitle||e.subtitle!=null),z=O||M,U=!!(a.append||e.appendAvatar||e.appendIcon),W=!!(a.prepend||e.prependAvatar||e.prependIcon),H=!!(a.image||e.image),X=z||W||U,Y=!!(a.text||e.text!=null);return Se(n(w,{class:["v-card",{"v-card--disabled":e.disabled,"v-card--flat":e.flat,"v-card--hover":e.hover&&!(e.disabled||e.flat),"v-card--link":C.value},c.value,f.value,s.value,g.value,o.value,v.value,m.value,d.value,k.value,e.class],style:[b.value,l.value,u.value,e.style],href:r.href.value,onClick:C.value&&r.navigate,tabindex:e.disabled?-1:void 0},{default:()=>{var E;return[H&&n("div",{key:"image",class:"v-card__image"},[a.image?n(I,{key:"image-defaults",disabled:!e.image,defaults:{VImg:{cover:!0,src:e.image}}},a.image):n(xe,{key:"image-img",cover:!0,src:e.image},null)]),n(Ee,{name:"v-card",active:!!e.loading,color:typeof e.loading=="boolean"?void 0:e.loading},{default:a.loader}),X&&n(_e,{key:"item",prependAvatar:e.prependAvatar,prependIcon:e.prependIcon,title:e.title,subtitle:e.subtitle,appendAvatar:e.appendAvatar,appendIcon:e.appendIcon},{default:a.item,prepend:a.prepend,title:a.title,subtitle:a.subtitle,append:a.append}),Y&&n(Oe,{key:"text"},{default:()=>{var T;return[((T=a.text)==null?void 0:T.call(a))??e.text]}}),(E=a.default)==null?void 0:E.call(a),a.actions&&n(Le,null,{default:a.actions}),Te(C.value,"v-card")]}}),[[he("ripple"),C.value&&e.ripple]])}),{}}});export{Ue as V,We as a,Re as b,Oe as c,Le as d};