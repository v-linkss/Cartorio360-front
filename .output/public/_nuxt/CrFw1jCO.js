import{a as V,b as _,d as h,c as p,V as w}from"./DXxJsYwY.js";import{r as g,h as k,o as t,A as x,w as e,b as s,d,c as i,t as C,y as v,q as y,v as B}from"./DI5se3tu.js";const M={key:0},b={key:1},q={__name:"ErrorModalCard",props:{show:Boolean,errorMessage:String},emits:["close"],setup(o,{emit:c}){const r=o,a=g(r.show),u=c;k(()=>r.show,l=>{a.value=l});const m=()=>{a.value=!1,u("close")};return(l,n)=>(t(),x(w,{persistent:"",modelValue:y(a),"onUpdate:modelValue":n[0]||(n[0]=f=>B(a)?a.value=f:null),per:"","max-width":"500"},{default:e(()=>[s(V,null,{default:e(()=>[s(_,{class:"text-h5"},{default:e(()=>[d("Erro na Requisição")]),_:1}),s(h,null,{default:e(()=>[o.errorMessage?(t(),i("div",M,C(o.errorMessage),1)):(t(),i("div",b,"Ocorreu um erro inesperado."))]),_:1}),s(p,null,{default:e(()=>[s(v,{style:{"background-color":"#429946",color:"white"},onClick:m},{default:e(()=>[d("OK")]),_:1})]),_:1})]),_:1})]),_:1},8,["modelValue"]))}};export{q as _};