import{bS as G,cH as J,dl as Re,cc as oe,cB as Me,cs as Se,bV as Y,bX as ae,ds as Oe,Q as p,D as tl,b1 as Ve,cE as ze,bq as R,bZ as te,b as r,cd as Ee,bj as O,r as Q,b_ as nl,J as j,N as ye,M as De,H as ee,bR as X,cl as al,aL as ol,cC as Le,db as ie,cf as ul,cj as il,dc as ge,aW as Ce,cm as He,dn as sl,cr as pe,dt as Ke,ca as cl,dg as Ge,cv as Ue,dh as ve,du as rl,c$ as re,h as le,dv as Pe,d1 as dl,cP as $e,ct as We,dq as we,cJ as fl,c8 as vl,cw as ml,c7 as hl,cO as yl,df as gl,cu as je,cQ as bl,cR as kl,ce as Sl,ci as Vl,dw as Cl,cy as pl,cW as Il,cY as xl,dx as Pl,cI as ce,bH as wl,f as be,c6 as me,dy as Al,cK as Fl,di as Tl,cS as Bl,dz as _l,c5 as fe,E as Rl,dA as Ml,d5 as Ol,d6 as zl,c_ as El,d7 as Dl,V as Ae,d8 as Ll,d9 as Hl,d as Kl,c3 as Gl,x as se,dr as Ul}from"./D90Z1kIp.js";import{m as $l,a as Wl,V as jl,b as Fe}from"./DtoTU6T2.js";import{a as ke}from"./DpxQ1YsO.js";const Ne=Symbol.for("vuetify:selection-control-group"),qe=G({color:String,disabled:{type:Boolean,default:null},defaultsTarget:String,error:Boolean,id:String,inline:Boolean,falseIcon:J,trueIcon:J,ripple:{type:[Boolean,Object],default:!0},multiple:{type:Boolean,default:null},name:String,readonly:{type:Boolean,default:null},modelValue:null,type:String,valueComparator:{type:Function,default:Re},...oe(),...Me(),...Se()},"SelectionControlGroup"),Nl=G({...qe({defaultsTarget:"VSelectionControl"})},"VSelectionControlGroup");Y()({name:"VSelectionControlGroup",props:Nl(),emits:{"update:modelValue":e=>!0},setup(e,u){let{slots:l}=u;const n=ae(e,"modelValue"),a=Oe(),m=p(()=>e.id||`v-selection-control-group-${a}`),v=p(()=>e.name||m.value),i=new Set;return tl(Ne,{modelValue:n,forceUpdate:()=>{i.forEach(t=>t())},onForceUpdate:t=>{i.add(t),Ve(()=>{i.delete(t)})}}),ze({[e.defaultsTarget]:{color:R(e,"color"),disabled:R(e,"disabled"),density:R(e,"density"),error:R(e,"error"),inline:R(e,"inline"),modelValue:n,multiple:p(()=>!!e.multiple||e.multiple==null&&Array.isArray(n.value)),name:v,falseIcon:R(e,"falseIcon"),trueIcon:R(e,"trueIcon"),readonly:R(e,"readonly"),ripple:R(e,"ripple"),type:R(e,"type"),valueComparator:R(e,"valueComparator")}}),te(()=>{var t;return r("div",{class:["v-selection-control-group",{"v-selection-control-group--inline":e.inline},e.class],style:e.style,role:e.type==="radio"?"radiogroup":void 0},[(t=l.default)==null?void 0:t.call(l)])}),{}}});const Qe=G({label:String,baseColor:String,trueValue:null,falseValue:null,value:null,...oe(),...qe()},"VSelectionControl");function ql(e){const u=ol(Ne,void 0),{densityClasses:l}=Le(e),n=ae(e,"modelValue"),a=p(()=>e.trueValue!==void 0?e.trueValue:e.value!==void 0?e.value:!0),m=p(()=>e.falseValue!==void 0?e.falseValue:!1),v=p(()=>!!e.multiple||e.multiple==null&&Array.isArray(n.value)),i=p({get(){const k=u?u.modelValue.value:n.value;return v.value?ie(k).some(y=>e.valueComparator(y,a.value)):e.valueComparator(k,a.value)},set(k){if(e.readonly)return;const y=k?a.value:m.value;let x=y;v.value&&(x=k?[...ie(n.value),y]:ie(n.value).filter(s=>!e.valueComparator(s,a.value))),u?u.modelValue.value=x:n.value=x}}),{textColorClasses:t,textColorStyles:g}=ul(p(()=>{if(!(e.error||e.disabled))return i.value?e.color:e.baseColor})),{backgroundColorClasses:P,backgroundColorStyles:S}=il(p(()=>i.value&&!e.error&&!e.disabled?e.color:e.baseColor)),d=p(()=>i.value?e.trueIcon:e.falseIcon);return{group:u,densityClasses:l,trueValue:a,falseValue:m,model:i,textColorClasses:t,textColorStyles:g,backgroundColorClasses:P,backgroundColorStyles:S,icon:d}}const Te=Y()({name:"VSelectionControl",directives:{Ripple:Ee},inheritAttrs:!1,props:Qe(),emits:{"update:modelValue":e=>!0},setup(e,u){let{attrs:l,slots:n}=u;const{group:a,densityClasses:m,icon:v,model:i,textColorClasses:t,textColorStyles:g,backgroundColorClasses:P,backgroundColorStyles:S,trueValue:d}=ql(e),k=Oe(),y=O(!1),x=O(!1),s=Q(),C=p(()=>e.id||`input-${k}`),F=p(()=>!e.disabled&&!e.readonly);a==null||a.onForceUpdate(()=>{s.value&&(s.value.checked=i.value)});function B(V){F.value&&(y.value=!0,ge(V.target,":focus-visible")!==!1&&(x.value=!0))}function T(){y.value=!1,x.value=!1}function U(V){V.stopPropagation()}function N(V){if(!F.value){s.value&&(s.value.checked=i.value);return}e.readonly&&a&&Ce(()=>a.forceUpdate()),i.value=V.target.checked}return te(()=>{var L,W;const V=n.label?n.label({label:e.label,props:{for:C.value}}):e.label,[z,$]=nl(l),_=r("input",j({ref:s,checked:i.value,disabled:!!e.disabled,id:C.value,onBlur:T,onFocus:B,onInput:N,"aria-disabled":!!e.disabled,"aria-label":e.label,type:e.type,value:d.value,name:e.name,"aria-checked":e.type==="checkbox"?i.value:void 0},$),null);return r("div",j({class:["v-selection-control",{"v-selection-control--dirty":i.value,"v-selection-control--disabled":e.disabled,"v-selection-control--error":e.error,"v-selection-control--focused":y.value,"v-selection-control--focus-visible":x.value,"v-selection-control--inline":e.inline},m.value,e.class]},z,{style:e.style}),[r("div",{class:["v-selection-control__wrapper",t.value],style:g.value},[(L=n.default)==null?void 0:L.call(n,{backgroundColorClasses:P,backgroundColorStyles:S}),ye(r("div",{class:["v-selection-control__input"]},[((W=n.input)==null?void 0:W.call(n,{model:i,textColorClasses:t,textColorStyles:g,backgroundColorClasses:P,backgroundColorStyles:S,inputNode:_,icon:v.value,props:{onFocus:B,onBlur:T,id:C.value}}))??r(ee,null,[v.value&&r(X,{key:"icon",icon:v.value},null),_])]),[[De("ripple"),e.ripple&&[!e.disabled&&!e.readonly,null,["center","circle"]]]])]),V&&r(al,{for:C.value,onClick:U},{default:()=>[V]})])}),{isFocused:y,input:s}}}),Ql=G({indeterminate:Boolean,indeterminateIcon:{type:J,default:"$checkboxIndeterminate"},...Qe({falseIcon:"$checkboxOff",trueIcon:"$checkboxOn"})},"VCheckboxBtn"),Xl=Y()({name:"VCheckboxBtn",props:Ql(),emits:{"update:modelValue":e=>!0,"update:indeterminate":e=>!0},setup(e,u){let{slots:l}=u;const n=ae(e,"indeterminate"),a=ae(e,"modelValue");function m(t){n.value&&(n.value=!1)}const v=p(()=>n.value?e.indeterminateIcon:e.falseIcon),i=p(()=>n.value?e.indeterminateIcon:e.trueIcon);return te(()=>{const t=He(Te.filterProps(e),["modelValue"]);return r(Te,j(t,{modelValue:a.value,"onUpdate:modelValue":[g=>a.value=g,m],class:["v-checkbox-btn",e.class],style:e.style,type:"checkbox",falseIcon:v.value,trueIcon:i.value,"aria-checked":n.value?"mixed":void 0}),l)}),{}}});function Jl(e){let{selectedElement:u,containerElement:l,isRtl:n,isHorizontal:a}=e;const m=de(a,l),v=Xe(a,n,l),i=de(a,u),t=Je(a,u),g=i*.4;return v>t?t-g:v+m<t+i?t-m+i+g:v}function Yl(e){let{selectedElement:u,containerElement:l,isHorizontal:n}=e;const a=de(n,l),m=Je(n,u),v=de(n,u);return m-a/2+v/2}function Be(e,u){const l=e?"scrollWidth":"scrollHeight";return(u==null?void 0:u[l])||0}function Zl(e,u){const l=e?"clientWidth":"clientHeight";return(u==null?void 0:u[l])||0}function Xe(e,u,l){if(!l)return 0;const{scrollLeft:n,offsetWidth:a,scrollWidth:m}=l;return e?u?m-a+n:n:l.scrollTop}function de(e,u){const l=e?"offsetWidth":"offsetHeight";return(u==null?void 0:u[l])||0}function Je(e,u){const l=e?"offsetLeft":"offsetTop";return(u==null?void 0:u[l])||0}const et=Symbol.for("vuetify:v-slide-group"),Ye=G({centerActive:Boolean,direction:{type:String,default:"horizontal"},symbol:{type:null,default:et},nextIcon:{type:J,default:"$next"},prevIcon:{type:J,default:"$prev"},showArrows:{type:[Boolean,String],validator:e=>typeof e=="boolean"||["always","desktop","mobile"].includes(e)},...oe(),...sl({mobile:null}),...pe(),...Ke({selectedClass:"v-slide-group-item--active"})},"VSlideGroup"),_e=Y()({name:"VSlideGroup",props:Ye(),emits:{"update:modelValue":e=>!0},setup(e,u){let{slots:l}=u;const{isRtl:n}=cl(),{displayClasses:a,mobile:m}=Ge(e),v=Ue(e,e.symbol),i=O(!1),t=O(0),g=O(0),P=O(0),S=p(()=>e.direction==="horizontal"),{resizeRef:d,contentRect:k}=ve(),{resizeRef:y,contentRect:x}=ve(),s=rl(),C=p(()=>({container:d.el,duration:200,easing:"easeOutQuart"})),F=p(()=>v.selected.value.length?v.items.value.findIndex(o=>o.id===v.selected.value[0]):-1),B=p(()=>v.selected.value.length?v.items.value.findIndex(o=>o.id===v.selected.value[v.selected.value.length-1]):-1);if(re){let o=-1;le(()=>[v.selected.value,k.value,x.value,S.value],()=>{cancelAnimationFrame(o),o=requestAnimationFrame(()=>{if(k.value&&x.value){const f=S.value?"width":"height";g.value=k.value[f],P.value=x.value[f],i.value=g.value+1<P.value}if(F.value>=0&&y.el){const f=y.el.children[B.value];U(f,e.centerActive)}})})}const T=O(!1);function U(o,f){let b=0;f?b=Yl({containerElement:d.el,isHorizontal:S.value,selectedElement:o}):b=Jl({containerElement:d.el,isHorizontal:S.value,isRtl:n.value,selectedElement:o}),N(b)}function N(o){if(!re||!d.el)return;const f=de(S.value,d.el),b=Xe(S.value,n.value,d.el);if(!(Be(S.value,d.el)<=f||Math.abs(o-b)<16)){if(S.value&&n.value&&d.el){const{scrollWidth:A,offsetWidth:w}=d.el;o=A-w-o}S.value?s.horizontal(o,C.value):s(o,C.value)}}function V(o){const{scrollTop:f,scrollLeft:b}=o.target;t.value=S.value?b:f}function z(o){if(T.value=!0,!(!i.value||!y.el)){for(const f of o.composedPath())for(const b of y.el.children)if(b===f){U(b);return}}}function $(o){T.value=!1}let _=!1;function L(o){var f;!_&&!T.value&&!(o.relatedTarget&&((f=y.el)!=null&&f.contains(o.relatedTarget)))&&H(),_=!1}function W(){_=!0}function q(o){if(!y.el)return;function f(b){o.preventDefault(),H(b)}S.value?o.key==="ArrowRight"?f(n.value?"prev":"next"):o.key==="ArrowLeft"&&f(n.value?"next":"prev"):o.key==="ArrowDown"?f("next"):o.key==="ArrowUp"&&f("prev"),o.key==="Home"?f("first"):o.key==="End"&&f("last")}function H(o){var b,I;if(!y.el)return;let f;if(!o)f=dl(y.el)[0];else if(o==="next"){if(f=(b=y.el.querySelector(":focus"))==null?void 0:b.nextElementSibling,!f)return H("first")}else if(o==="prev"){if(f=(I=y.el.querySelector(":focus"))==null?void 0:I.previousElementSibling,!f)return H("last")}else o==="first"?f=y.el.firstElementChild:o==="last"&&(f=y.el.lastElementChild);f&&f.focus({preventScroll:!0})}function M(o){const f=S.value&&n.value?-1:1,b=(o==="prev"?-f:f)*g.value;let I=t.value+b;if(S.value&&n.value&&d.el){const{scrollWidth:A,offsetWidth:w}=d.el;I+=A-w}N(I)}const ne=p(()=>({next:v.next,prev:v.prev,select:v.select,isSelected:v.isSelected})),Z=p(()=>{switch(e.showArrows){case"always":return!0;case"desktop":return!m.value;case!0:return i.value||Math.abs(t.value)>0;case"mobile":return m.value||i.value||Math.abs(t.value)>0;default:return!m.value&&(i.value||Math.abs(t.value)>0)}}),h=p(()=>Math.abs(t.value)>1),c=p(()=>{if(!d.value)return!1;const o=Be(S.value,d.el),f=Zl(S.value,d.el);return o-f-Math.abs(t.value)>1});return te(()=>r(e.tag,{class:["v-slide-group",{"v-slide-group--vertical":!S.value,"v-slide-group--has-affixes":Z.value,"v-slide-group--is-overflowing":i.value},a.value,e.class],style:e.style,tabindex:T.value||v.selected.value.length?-1:0,onFocus:L},{default:()=>{var o,f,b;return[Z.value&&r("div",{key:"prev",class:["v-slide-group__prev",{"v-slide-group__prev--disabled":!h.value}],onMousedown:W,onClick:()=>h.value&&M("prev")},[((o=l.prev)==null?void 0:o.call(l,ne.value))??r(Pe,null,{default:()=>[r(X,{icon:n.value?e.nextIcon:e.prevIcon},null)]})]),r("div",{key:"container",ref:d,class:"v-slide-group__container",onScroll:V},[r("div",{ref:y,class:"v-slide-group__content",onFocusin:z,onFocusout:$,onKeydown:q},[(f=l.default)==null?void 0:f.call(l,ne.value)])]),Z.value&&r("div",{key:"next",class:["v-slide-group__next",{"v-slide-group__next--disabled":!c.value}],onMousedown:W,onClick:()=>c.value&&M("next")},[((b=l.next)==null?void 0:b.call(l,ne.value))??r(Pe,null,{default:()=>[r(X,{icon:n.value?e.prevIcon:e.nextIcon},null)]})])]}})),{selected:v.selected,scrollTo:M,scrollOffset:t,focus:H}}}),Ze=Symbol.for("vuetify:v-chip-group"),lt=G({column:Boolean,filter:Boolean,valueComparator:{type:Function,default:Re},...Ye(),...oe(),...Ke({selectedClass:"v-chip--selected"}),...pe(),...Se(),...$e({variant:"tonal"})},"VChipGroup");Y()({name:"VChipGroup",props:lt(),emits:{"update:modelValue":e=>!0},setup(e,u){let{slots:l}=u;const{themeClasses:n}=We(e),{isSelected:a,select:m,next:v,prev:i,selected:t}=Ue(e,Ze);return ze({VChip:{color:R(e,"color"),disabled:R(e,"disabled"),filter:R(e,"filter"),variant:R(e,"variant")}}),te(()=>{const g=_e.filterProps(e);return r(_e,j(g,{class:["v-chip-group",{"v-chip-group--column":e.column},n.value,e.class],style:e.style}),{default:()=>{var P;return[(P=l.default)==null?void 0:P.call(l,{isSelected:a,select:m,next:v,prev:i,selected:t.value})]}})}),{}}});const tt=G({activeClass:String,appendAvatar:String,appendIcon:J,closable:Boolean,closeIcon:{type:J,default:"$delete"},closeLabel:{type:String,default:"$vuetify.close"},draggable:Boolean,filter:Boolean,filterIcon:{type:String,default:"$complete"},label:Boolean,link:{type:Boolean,default:void 0},pill:Boolean,prependAvatar:String,prependIcon:J,ripple:{type:[Boolean,Object],default:!0},text:String,modelValue:{type:Boolean,default:!0},onClick:we(),onClickOnce:we(),...fl(),...oe(),...Me(),...vl(),...ml(),...hl(),...yl(),...gl(),...pe({tag:"span"}),...Se(),...$e({variant:"tonal"})},"VChip"),nt=Y()({name:"VChip",directives:{Ripple:Ee},props:tt(),emits:{"click:close":e=>!0,"update:modelValue":e=>!0,"group:selected":e=>!0,click:e=>!0},setup(e,u){let{attrs:l,emit:n,slots:a}=u;const{t:m}=je(),{borderClasses:v}=bl(e),{colorClasses:i,colorStyles:t,variantClasses:g}=kl(e),{densityClasses:P}=Le(e),{elevationClasses:S}=Sl(e),{roundedClasses:d}=Vl(e),{sizeClasses:k}=Cl(e),{themeClasses:y}=We(e),x=ae(e,"modelValue"),s=pl(e,Ze,!1),C=Il(e,l),F=p(()=>e.link!==!1&&C.isLink.value),B=p(()=>!e.disabled&&e.link!==!1&&(!!s||e.link||C.isClickable.value)),T=p(()=>({"aria-label":m(e.closeLabel),onClick(V){V.preventDefault(),V.stopPropagation(),x.value=!1,n("click:close",V)}}));function U(V){var z;n("click",V),B.value&&((z=C.navigate)==null||z.call(C,V),s==null||s.toggle())}function N(V){(V.key==="Enter"||V.key===" ")&&(V.preventDefault(),U(V))}return()=>{const V=C.isLink.value?"a":e.tag,z=!!(e.appendIcon||e.appendAvatar),$=!!(z||a.append),_=!!(a.close||e.closable),L=!!(a.filter||e.filter)&&s,W=!!(e.prependIcon||e.prependAvatar),q=!!(W||a.prepend),H=!s||s.isSelected.value;return x.value&&ye(r(V,{class:["v-chip",{"v-chip--disabled":e.disabled,"v-chip--label":e.label,"v-chip--link":B.value,"v-chip--filter":L,"v-chip--pill":e.pill},y.value,v.value,H?i.value:void 0,P.value,S.value,d.value,k.value,g.value,s==null?void 0:s.selectedClass.value,e.class],style:[H?t.value:void 0,e.style],disabled:e.disabled||void 0,draggable:e.draggable,href:C.href.value,tabindex:B.value?0:void 0,onClick:U,onKeydown:B.value&&!F.value&&N},{default:()=>{var M;return[xl(B.value,"v-chip"),L&&r(Pl,{key:"filter"},{default:()=>[ye(r("div",{class:"v-chip__filter"},[a.filter?r(ce,{key:"filter-defaults",disabled:!e.filterIcon,defaults:{VIcon:{icon:e.filterIcon}}},a.filter):r(X,{key:"filter-icon",icon:e.filterIcon},null)]),[[wl,s.isSelected.value]])]}),q&&r("div",{key:"prepend",class:"v-chip__prepend"},[a.prepend?r(ce,{key:"prepend-defaults",disabled:!W,defaults:{VAvatar:{image:e.prependAvatar,start:!0},VIcon:{icon:e.prependIcon,start:!0}}},a.prepend):r(ee,null,[e.prependIcon&&r(X,{key:"prepend-icon",icon:e.prependIcon,start:!0},null),e.prependAvatar&&r(ke,{key:"prepend-avatar",image:e.prependAvatar,start:!0},null)])]),r("div",{class:"v-chip__content","data-no-activator":""},[((M=a.default)==null?void 0:M.call(a,{isSelected:s==null?void 0:s.isSelected.value,selectedClass:s==null?void 0:s.selectedClass.value,select:s==null?void 0:s.select,toggle:s==null?void 0:s.toggle,value:s==null?void 0:s.value.value,disabled:e.disabled}))??e.text]),$&&r("div",{key:"append",class:"v-chip__append"},[a.append?r(ce,{key:"append-defaults",disabled:!z,defaults:{VAvatar:{end:!0,image:e.appendAvatar},VIcon:{end:!0,icon:e.appendIcon}}},a.append):r(ee,null,[e.appendIcon&&r(X,{key:"append-icon",end:!0,icon:e.appendIcon},null),e.appendAvatar&&r(ke,{key:"append-avatar",end:!0,image:e.appendAvatar},null)])]),_&&r("button",j({key:"close",class:"v-chip__close",type:"button"},T.value),[a.close?r(ce,{key:"close-defaults",defaults:{VIcon:{icon:e.closeIcon,size:"x-small"}}},a.close):r(X,{key:"close-icon",icon:e.closeIcon,size:"x-small"},null)])]}}),[[De("ripple"),B.value&&e.ripple,null]])}}}),at=G({renderless:Boolean,...oe()},"VVirtualScrollItem"),ot=Y()({name:"VVirtualScrollItem",inheritAttrs:!1,props:at(),emits:{"update:height":e=>!0},setup(e,u){let{attrs:l,emit:n,slots:a}=u;const{resizeRef:m,contentRect:v}=ve(void 0,"border");le(()=>{var i;return(i=v.value)==null?void 0:i.height},i=>{i!=null&&n("update:height",i)}),te(()=>{var i,t;return e.renderless?r(ee,null,[(i=a.default)==null?void 0:i.call(a,{itemRef:m})]):r("div",j({ref:m,class:["v-virtual-scroll__item",e.class],style:e.style},l),[(t=a.default)==null?void 0:t.call(a)])})}}),ut=-1,it=1,he=100,st=G({itemHeight:{type:[Number,String],default:null},height:[Number,String]},"virtual");function ct(e,u){const l=Ge(),n=O(0);be(()=>{n.value=parseFloat(e.itemHeight||0)});const a=O(0),m=O(Math.ceil((parseInt(e.height)||l.height.value)/(n.value||16))||1),v=O(0),i=O(0),t=Q(),g=Q();let P=0;const{resizeRef:S,contentRect:d}=ve();be(()=>{S.value=t.value});const k=p(()=>{var c;return t.value===document.documentElement?l.height.value:((c=d.value)==null?void 0:c.height)||parseInt(e.height)||0}),y=p(()=>!!(t.value&&g.value&&k.value&&n.value));let x=Array.from({length:u.value.length}),s=Array.from({length:u.value.length});const C=O(0);let F=-1;function B(c){return x[c]||n.value}const T=Al(()=>{const c=performance.now();s[0]=0;const o=u.value.length;for(let f=1;f<=o-1;f++)s[f]=(s[f-1]||0)+B(f-1);C.value=Math.max(C.value,performance.now()-c)},C),U=le(y,c=>{c&&(U(),P=g.value.offsetTop,T.immediate(),M(),~F&&Ce(()=>{re&&window.requestAnimationFrame(()=>{Z(F),F=-1})}))});Ve(()=>{T.clear()});function N(c,o){const f=x[c],b=n.value;n.value=b?Math.min(n.value,o):o,(f!==o||b!==n.value)&&(x[c]=o,T())}function V(c){return c=me(c,0,u.value.length-1),s[c]||0}function z(c){return rt(s,c)}let $=0,_=0,L=0;le(k,(c,o)=>{o&&(M(),c<o&&requestAnimationFrame(()=>{_=0,M()}))});function W(){if(!t.value||!g.value)return;const c=t.value.scrollTop,o=performance.now();o-L>500?(_=Math.sign(c-$),P=g.value.offsetTop):_=c-$,$=c,L=o,M()}function q(){!t.value||!g.value||(_=0,L=0,M())}let H=-1;function M(){cancelAnimationFrame(H),H=requestAnimationFrame(ne)}function ne(){if(!t.value||!k.value)return;const c=$-P,o=Math.sign(_),f=Math.max(0,c-he),b=me(z(f),0,u.value.length),I=c+k.value+he,A=me(z(I)+1,b+1,u.value.length);if((o!==ut||b<a.value)&&(o!==it||A>m.value)){const w=V(a.value)-V(b),E=V(A)-V(m.value);Math.max(w,E)>he?(a.value=b,m.value=A):(b<=0&&(a.value=b),A>=u.value.length&&(m.value=A))}v.value=V(a.value),i.value=V(u.value.length)-V(m.value)}function Z(c){const o=V(c);!t.value||c&&!o?F=c:t.value.scrollTop=o}const h=p(()=>u.value.slice(a.value,m.value).map((c,o)=>({raw:c,index:o+a.value})));return le(u,()=>{x=Array.from({length:u.value.length}),s=Array.from({length:u.value.length}),T.immediate(),M()},{deep:!0}),{containerRef:t,markerRef:g,computedItems:h,paddingTop:v,paddingBottom:i,scrollToIndex:Z,handleScroll:W,handleScrollend:q,handleItemResize:N}}function rt(e,u){let l=e.length-1,n=0,a=0,m=null,v=-1;if(e[l]<u)return l;for(;n<=l;)if(a=n+l>>1,m=e[a],m>u)l=a-1;else if(m<u)v=a,n=a+1;else return m===u?a:n;return v}const dt=G({items:{type:Array,default:()=>[]},renderless:Boolean,...st(),...oe(),...Fl()},"VVirtualScroll"),ft=Y()({name:"VVirtualScroll",props:dt(),setup(e,u){let{slots:l}=u;const n=Tl("VVirtualScroll"),{dimensionStyles:a}=Bl(e),{containerRef:m,markerRef:v,handleScroll:i,handleScrollend:t,handleItemResize:g,scrollToIndex:P,paddingTop:S,paddingBottom:d,computedItems:k}=ct(e,R(e,"items"));return _l(()=>e.renderless,()=>{function y(){var C,F;const s=(arguments.length>0&&arguments[0]!==void 0?arguments[0]:!1)?"addEventListener":"removeEventListener";m.value===document.documentElement?(document[s]("scroll",i,{passive:!0}),document[s]("scrollend",t)):((C=m.value)==null||C[s]("scroll",i,{passive:!0}),(F=m.value)==null||F[s]("scrollend",t))}Rl(()=>{m.value=Ml(n.vnode.el,!0),y(!0)}),Ve(y)}),te(()=>{const y=k.value.map(x=>r(ot,{key:x.index,renderless:e.renderless,"onUpdate:height":s=>g(x.index,s)},{default:s=>{var C;return(C=l.default)==null?void 0:C.call(l,{item:x.raw,index:x.index,...s})}}));return e.renderless?r(ee,null,[r("div",{ref:v,class:"v-virtual-scroll__spacer",style:{paddingTop:fe(S.value)}},null),y,r("div",{class:"v-virtual-scroll__spacer",style:{paddingBottom:fe(d.value)}},null)]):r("div",{ref:m,class:["v-virtual-scroll",e.class],onScrollPassive:i,onScrollend:t,style:[a.value,e.style]},[r("div",{ref:v,class:"v-virtual-scroll__container",style:{paddingTop:fe(S.value),paddingBottom:fe(d.value)}},[y])])}),{scrollToIndex:P}}});function vt(e,u){const l=O(!1);let n;function a(i){cancelAnimationFrame(n),l.value=!0,n=requestAnimationFrame(()=>{n=requestAnimationFrame(()=>{l.value=!1})})}async function m(){await new Promise(i=>requestAnimationFrame(i)),await new Promise(i=>requestAnimationFrame(i)),await new Promise(i=>requestAnimationFrame(i)),await new Promise(i=>{if(l.value){const t=le(l,()=>{t(),i()})}else i()})}async function v(i){var P,S;if(i.key==="Tab"&&((P=u.value)==null||P.focus()),!["PageDown","PageUp","Home","End"].includes(i.key))return;const t=(S=e.value)==null?void 0:S.$el;if(!t)return;(i.key==="Home"||i.key==="End")&&t.scrollTo({top:i.key==="Home"?0:t.scrollHeight,behavior:"smooth"}),await m();const g=t.querySelectorAll(":scope > :not(.v-virtual-scroll__spacer)");if(i.key==="PageDown"||i.key==="Home"){const d=t.getBoundingClientRect().top;for(const k of g)if(k.getBoundingClientRect().top>=d){k.focus();break}}else{const d=t.getBoundingClientRect().bottom;for(const k of[...g].reverse())if(k.getBoundingClientRect().bottom<=d){k.focus();break}}}return{onListScroll:a,onListKeydown:v}}const mt=G({chips:Boolean,closableChips:Boolean,closeText:{type:String,default:"$vuetify.close"},openText:{type:String,default:"$vuetify.open"},eager:Boolean,hideNoData:Boolean,hideSelected:Boolean,listProps:{type:Object},menu:Boolean,menuIcon:{type:J,default:"$dropdown"},menuProps:{type:Object},multiple:Boolean,noDataText:{type:String,default:"$vuetify.noDataText"},openOnClear:Boolean,itemColor:String,...$l({itemChildren:!1})},"Select"),ht=G({...mt(),...He(Ol({modelValue:null,role:"combobox"}),["validationValue","dirty","appendInnerIcon"]),...zl({transition:{component:El}})},"VSelect"),Vt=Y()({name:"VSelect",props:ht(),emits:{"update:focused":e=>!0,"update:modelValue":e=>!0,"update:menu":e=>!0},setup(e,u){let{slots:l}=u;const{t:n}=je(),a=Q(),m=Q(),v=Q(),i=ae(e,"menu"),t=p({get:()=>i.value,set:h=>{var c;i.value&&!h&&((c=m.value)!=null&&c.ΨopenChildren)||(i.value=h)}}),{items:g,transformIn:P,transformOut:S}=Wl(e),d=ae(e,"modelValue",[],h=>P(h===null?[null]:ie(h)),h=>{const c=S(h);return e.multiple?c:c[0]??null}),k=p(()=>typeof e.counterValue=="function"?e.counterValue(d.value):typeof e.counterValue=="number"?e.counterValue:d.value.length),y=Dl(),x=p(()=>d.value.map(h=>h.value)),s=O(!1),C=p(()=>t.value?e.closeText:e.openText);let F="",B;const T=p(()=>e.hideSelected?g.value.filter(h=>!d.value.some(c=>e.valueComparator(c,h))):g.value),U=p(()=>e.hideNoData&&!T.value.length||e.readonly||(y==null?void 0:y.isReadonly.value)),N=p(()=>{var h;return{...e.menuProps,activatorProps:{...((h=e.menuProps)==null?void 0:h.activatorProps)||{},"aria-haspopup":"listbox"}}}),V=Q(),{onListScroll:z,onListKeydown:$}=vt(V,a);function _(h){e.openOnClear&&(t.value=!0)}function L(){U.value||(t.value=!t.value)}function W(h){var I,A;if(!h.key||e.readonly||y!=null&&y.isReadonly.value)return;["Enter"," ","ArrowDown","ArrowUp","Home","End"].includes(h.key)&&h.preventDefault(),["Enter","ArrowDown"," "].includes(h.key)&&(t.value=!0),["Escape","Tab"].includes(h.key)&&(t.value=!1),h.key==="Home"?(I=V.value)==null||I.focus("first"):h.key==="End"&&((A=V.value)==null||A.focus("last"));const c=1e3;function o(w){const E=w.key.length===1,D=!w.ctrlKey&&!w.metaKey&&!w.altKey;return E&&D}if(e.multiple||!o(h))return;const f=performance.now();f-B>c&&(F=""),F+=h.key.toLowerCase(),B=f;const b=g.value.find(w=>w.title.toLowerCase().startsWith(F));if(b!==void 0){d.value=[b];const w=T.value.indexOf(b);re&&window.requestAnimationFrame(()=>{var E;w>=0&&((E=v.value)==null||E.scrollToIndex(w))})}}function q(h){let c=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!0;if(!h.props.disabled)if(e.multiple){const o=d.value.findIndex(b=>e.valueComparator(b.value,h.value)),f=c??!~o;if(~o){const b=f?[...d.value,h]:[...d.value];b.splice(o,1),d.value=b}else f&&(d.value=[...d.value,h])}else{const o=c!==!1;d.value=o?[h]:[],Ce(()=>{t.value=!1})}}function H(h){var c;(c=V.value)!=null&&c.$el.contains(h.relatedTarget)||(t.value=!1)}function M(){var h;s.value&&((h=a.value)==null||h.focus())}function ne(h){s.value=!0}function Z(h){if(h==null)d.value=[];else if(ge(a.value,":autofill")||ge(a.value,":-webkit-autofill")){const c=g.value.find(o=>o.title===h);c&&q(c)}else a.value&&(a.value.value="")}return le(t,()=>{if(!e.hideSelected&&t.value&&d.value.length){const h=T.value.findIndex(c=>d.value.some(o=>e.valueComparator(o.value,c.value)));re&&window.requestAnimationFrame(()=>{var c;h>=0&&((c=v.value)==null||c.scrollToIndex(h))})}}),le(()=>e.items,(h,c)=>{t.value||s.value&&!c.length&&h.length&&(t.value=!0)}),te(()=>{const h=!!(e.chips||l.chip),c=!!(!e.hideNoData||T.value.length||l["prepend-item"]||l["append-item"]||l["no-data"]),o=d.value.length>0,f=Ae.filterProps(e),b=o||!s.value&&e.label&&!e.persistentPlaceholder?void 0:e.placeholder;return r(Ae,j({ref:a},f,{modelValue:d.value.map(I=>I.props.value).join(", "),"onUpdate:modelValue":Z,focused:s.value,"onUpdate:focused":I=>s.value=I,validationValue:d.externalValue,counterValue:k.value,dirty:o,class:["v-select",{"v-select--active-menu":t.value,"v-select--chips":!!e.chips,[`v-select--${e.multiple?"multiple":"single"}`]:!0,"v-select--selected":d.value.length,"v-select--selection-slot":!!l.selection},e.class],style:e.style,inputmode:"none",placeholder:b,"onClick:clear":_,"onMousedown:control":L,onBlur:H,onKeydown:W,"aria-label":n(C.value),title:n(C.value)}),{...l,default:()=>r(ee,null,[r(Ll,j({ref:m,modelValue:t.value,"onUpdate:modelValue":I=>t.value=I,activator:"parent",contentClass:"v-select__content",disabled:U.value,eager:e.eager,maxHeight:310,openOnClick:!1,closeOnContentClick:!1,transition:e.transition,onAfterLeave:M},N.value),{default:()=>[c&&r(jl,j({ref:V,selected:x.value,selectStrategy:e.multiple?"independent":"single-independent",onMousedown:I=>I.preventDefault(),onKeydown:$,onFocusin:ne,onScrollPassive:z,tabindex:"-1","aria-live":"polite",color:e.itemColor??e.color},e.listProps),{default:()=>{var I,A,w;return[(I=l["prepend-item"])==null?void 0:I.call(l),!T.value.length&&!e.hideNoData&&(((A=l["no-data"])==null?void 0:A.call(l))??r(Fe,{title:n(e.noDataText)},null)),r(ft,{ref:v,renderless:!0,items:T.value},{default:E=>{var xe;let{item:D,index:ue,itemRef:K}=E;const Ie=j(D.props,{ref:K,key:ue,onClick:()=>q(D,null)});return((xe=l.item)==null?void 0:xe.call(l,{item:D,index:ue,props:Ie}))??r(Fe,j(Ie,{role:"option"}),{prepend:el=>{let{isSelected:ll}=el;return r(ee,null,[e.multiple&&!e.hideSelected?r(Xl,{key:D.value,modelValue:ll,ripple:!1,tabindex:"-1"},null):void 0,D.props.prependAvatar&&r(ke,{image:D.props.prependAvatar},null),D.props.prependIcon&&r(X,{icon:D.props.prependIcon},null)])}})}}),(w=l["append-item"])==null?void 0:w.call(l)]}})]}),d.value.map((I,A)=>{function w(K){K.stopPropagation(),K.preventDefault(),q(I,!1)}const E={"onClick:close":w,onKeydown(K){K.key!=="Enter"&&K.key!==" "||(K.preventDefault(),K.stopPropagation(),w(K))},onMousedown(K){K.preventDefault(),K.stopPropagation()},modelValue:!0,"onUpdate:modelValue":void 0},D=h?!!l.chip:!!l.selection,ue=D?Hl(h?l.chip({item:I,index:A,props:E}):l.selection({item:I,index:A})):void 0;if(!(D&&!ue))return r("div",{key:I.value,class:"v-select__selection"},[h?l.chip?r(ce,{key:"chip-defaults",defaults:{VChip:{closable:e.closableChips,size:"small",text:I.title}}},{default:()=>[ue]}):r(nt,j({key:"chip",closable:e.closableChips,size:"small",text:I.title,disabled:I.props.disabled},E),null):ue??r("span",{class:"v-select__selection-text"},[I.title,e.multiple&&A<d.value.length-1&&r("span",{class:"v-select__selection-comma"},[Kl(",")])])])})]),"append-inner":function(){var E;for(var I=arguments.length,A=new Array(I),w=0;w<I;w++)A[w]=arguments[w];return r(ee,null,[(E=l["append-inner"])==null?void 0:E.call(l,...A),e.menuIcon?r(X,{class:"v-select__menu-icon",icon:e.menuIcon},null):void 0])}})}),Gl({isFocused:s,menu:t,select:q},a)}}),yt=(e,u,l)=>e==null||u==null?-1:e.toString().toLocaleLowerCase().indexOf(u.toString().toLocaleLowerCase()),Ct=G({customFilter:Function,customKeyFilter:Object,filterKeys:[Array,String],filterMode:{type:String,default:"intersection"},noFilter:Boolean},"filter");function gt(e,u,l){var i;const n=[],a=(l==null?void 0:l.default)??yt,m=l!=null&&l.filterKeys?ie(l.filterKeys):!1,v=Object.keys((l==null?void 0:l.customKeyFilter)??{}).length;if(!(e!=null&&e.length))return n;e:for(let t=0;t<e.length;t++){const[g,P=g]=ie(e[t]),S={},d={};let k=-1;if((u||v>0)&&!(l!=null&&l.noFilter)){if(typeof g=="object"){const s=m||Object.keys(P);for(const C of s){const F=Ul(P,C),B=(i=l==null?void 0:l.customKeyFilter)==null?void 0:i[C];if(k=B?B(F,u,g):a(F,u,g),k!==-1&&k!==!1)B?S[C]=k:d[C]=k;else if((l==null?void 0:l.filterMode)==="every")continue e}}else k=a(g,u,g),k!==-1&&k!==!1&&(d.title=k);const y=Object.keys(d).length,x=Object.keys(S).length;if(!y&&!x||(l==null?void 0:l.filterMode)==="union"&&x!==v&&!y||(l==null?void 0:l.filterMode)==="intersection"&&(x!==v||!y))continue}n.push({index:t,matches:{...d,...S}})}return n}function pt(e,u,l,n){const a=Q([]),m=Q(new Map),v=p(()=>n!=null&&n.transform?se(u).map(t=>[t,n.transform(t)]):se(u));be(()=>{const t=typeof l=="function"?l():se(l),g=typeof t!="string"&&typeof t!="number"?"":String(t),P=gt(v.value,g,{customKeyFilter:{...e.customKeyFilter,...se(n==null?void 0:n.customKeyFilter)},default:e.customFilter,filterKeys:e.filterKeys,filterMode:e.filterMode,noFilter:e.noFilter}),S=se(u),d=[],k=new Map;P.forEach(y=>{let{index:x,matches:s}=y;const C=S[x];d.push(C),k.set(C.value,s)}),a.value=d,m.value=k});function i(t){return m.value.get(t.value)}return{filteredItems:a,filteredMatches:m,getMatches:i}}export{Vt as V,_e as a,Ct as b,mt as c,vt as d,ft as e,Xl as f,nt as g,Ye as m,pt as u};