import{bS as p,bT as ee,bU as te,bV as ae,bW as ne,bX as le,bY as oe,Q as y,r as v,bj as ue,f as ie,F as re,h as x,j as se,bZ as ce,b_ as de,b$ as A,c0 as fe,b as l,c1 as ve,K as k,I as R,N as G,M as xe,bG as me,c2 as ge,c3 as he,aW as S,c4 as we,c5 as Ve,c6 as ye}from"./pH1cEkPx.js";const be=p({autoGrow:Boolean,autofocus:Boolean,counter:[Boolean,Number,String],counterValue:Function,prefix:String,placeholder:String,persistentPlaceholder:Boolean,persistentCounter:Boolean,noResize:Boolean,rows:{type:[Number,String],default:5,validator:e=>!isNaN(parseFloat(e))},maxRows:{type:[Number,String],validator:e=>!isNaN(parseFloat(e))},suffix:String,modelModifiers:Object,...ee(),...te()},"VTextarea"),Ce=ae()({name:"VTextarea",directives:{Intersect:ne},inheritAttrs:!1,props:be(),emits:{"click:control":e=>!0,"mousedown:control":e=>!0,"update:focused":e=>!0,"update:modelValue":e=>!0},setup(e,U){let{attrs:b,emit:M,slots:i}=U;const o=le(e,"modelValue"),{isFocused:f,focus:D,blur:E}=oe(e),j=y(()=>typeof e.counterValue=="function"?e.counterValue(o.value):(o.value||"").toString().length),O=y(()=>{if(b.maxlength)return b.maxlength;if(!(!e.counter||typeof e.counter!="number"&&typeof e.counter!="string"))return e.counter});function $(t,n){var a,u;!e.autofocus||!t||(u=(a=n[0].target)==null?void 0:a.focus)==null||u.call(a)}const N=v(),m=v(),B=ue(""),g=v(),W=y(()=>e.persistentPlaceholder||f.value||e.active);function F(){var t;g.value!==document.activeElement&&((t=g.value)==null||t.focus()),f.value||D()}function K(t){F(),M("click:control",t)}function Q(t){M("mousedown:control",t)}function X(t){t.stopPropagation(),F(),S(()=>{o.value="",we(e["onClick:clear"],t)})}function Y(t){var a;const n=t.target;if(o.value=n.value,(a=e.modelModifiers)!=null&&a.trim){const u=[n.selectionStart,n.selectionEnd];S(()=>{n.selectionStart=u[0],n.selectionEnd=u[1]})}}const c=v(),h=v(+e.rows),C=y(()=>["plain","underlined"].includes(e.variant));ie(()=>{e.autoGrow||(h.value=+e.rows)});function d(){e.autoGrow&&S(()=>{if(!c.value||!m.value)return;const t=getComputedStyle(c.value),n=getComputedStyle(m.value.$el),a=parseFloat(t.getPropertyValue("--v-field-padding-top"))+parseFloat(t.getPropertyValue("--v-input-padding-top"))+parseFloat(t.getPropertyValue("--v-field-padding-bottom")),u=c.value.scrollHeight,w=parseFloat(t.lineHeight),P=Math.max(parseFloat(e.rows)*w+a,parseFloat(n.getPropertyValue("--v-input-control-height"))),I=parseFloat(e.maxRows)*w+a||1/0,s=ye(u??0,P,I);h.value=Math.floor((s-a)/w),B.value=Ve(s)})}re(d),x(o,d),x(()=>e.rows,d),x(()=>e.maxRows,d),x(()=>e.density,d);let r;return x(c,t=>{t?(r=new ResizeObserver(d),r.observe(c.value)):r==null||r.disconnect()}),se(()=>{r==null||r.disconnect()}),ce(()=>{const t=!!(i.counter||e.counter||e.counterValue),n=!!(t||i.details),[a,u]=de(b),{modelValue:w,...P}=A.filterProps(e),I=fe(e);return l(A,k({ref:N,modelValue:o.value,"onUpdate:modelValue":s=>o.value=s,class:["v-textarea v-text-field",{"v-textarea--prefixed":e.prefix,"v-textarea--suffixed":e.suffix,"v-text-field--prefixed":e.prefix,"v-text-field--suffixed":e.suffix,"v-textarea--auto-grow":e.autoGrow,"v-textarea--no-resize":e.noResize||e.autoGrow,"v-input--plain-underlined":C.value},e.class],style:e.style},a,P,{centerAffix:h.value===1&&!C.value,focused:f.value}),{...i,default:s=>{let{id:V,isDisabled:H,isDirty:T,isReadonly:Z,isValid:q}=s;return l(ve,k({ref:m,style:{"--v-textarea-control-height":B.value},onClick:K,onMousedown:Q,"onClick:clear":X,"onClick:prependInner":e["onClick:prependInner"],"onClick:appendInner":e["onClick:appendInner"]},I,{id:V.value,active:W.value||T.value,centerAffix:h.value===1&&!C.value,dirty:T.value||e.dirty,disabled:H.value,focused:f.value,error:q.value===!1}),{...i,default:J=>{let{props:{class:_,...z}}=J;return l(R,null,[e.prefix&&l("span",{class:"v-text-field__prefix"},[e.prefix]),G(l("textarea",k({ref:g,class:_,value:o.value,onInput:Y,autofocus:e.autofocus,readonly:Z.value,disabled:H.value,placeholder:e.placeholder,rows:e.rows,name:e.name,onFocus:F,onBlur:E},z,u),null),[[xe("intersect"),{handler:$},null,{once:!0}]]),e.autoGrow&&G(l("textarea",{class:[_,"v-textarea__sizer"],id:`${z.id}-sizer`,"onUpdate:modelValue":L=>o.value=L,ref:c,readonly:!0,"aria-hidden":"true"},null),[[me,o.value]]),e.suffix&&l("span",{class:"v-text-field__suffix"},[e.suffix])])}})},details:n?s=>{var V;return l(R,null,[(V=i.details)==null?void 0:V.call(i,s),t&&l(R,null,[l("span",null,null),l(ge,{active:e.persistentCounter||f.value,value:j.value,max:O.value,disabled:e.disabled},i.counter)])])}:void 0})}),he({},N,m,g)}});export{Ce as V};