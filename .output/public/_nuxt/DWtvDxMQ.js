import{r as b,A as i,B as q,Q as L,o as t,c as f,a as C,b as c,x as v,C as $,w as p,H as n,I as E,z as D,ba as F,y as I,d as P,v as m,V as y}from"./pH1cEkPx.js";import{u as k}from"./eWX9kTq8.js";import{V as T}from"./DQyD-MfE.js";import{V as Q}from"./CFip2q1w.js";import{V as S}from"./BLTi9DZL.js";import{V as H}from"./CteO4WHa.js";import"./BXGXbKpp.js";import"./BjjqCE1y.js";import"./DjRMAYTd.js";import"./CtcKWZ5I.js";const O=C("h1",null,"Relatórios",-1),z={key:0},oe={__name:"lista",async setup(G){let d,g;const V=D(),w=`${V.public.managemant}/getRelatorios`,B=`${V.public.managemant}/createRelatorio`,U=`${V.public.managemant}/listaQuery`,_=b([]),u=b(null),r=b([]),h={user_token:i("auth_token").value,cartorio_token:i("user-data").value.cartorio_token,user_name:i("user-data").value.nome},{data:R}=([d,g]=q(()=>k(w,{method:"POST",body:h},"$53NFRNGH7x")),d=await d,g(),d);_.value=Array.isArray(R.value)?R.value:[];const A=L(()=>_.value.every(a=>!a.codigo&&!a.value&&!a.parametros)?[]:_.value.map(a=>({label:a.codigo,value:a.codigo,parametros:a.parametros}))),x=async a=>{const o=A.value.find(e=>e.value===a);if(o){r.value=o.parametros.map(e=>({...e,value:null,showDatePicker:!1,items:[]}));for(const e of r.value)if(e.tipo==="TABLE"&&e.dominio)try{const{data:s}=await k(U,{method:"POST",body:{cartorio_token:h.cartorio_token,parametros:e.dominio}},"$c4psqRQWRs");e.items=Array.isArray(s.value)?s.value.map(l=>({label:l.nome,value:l.token})):[]}catch(s){console.error("Erro ao buscar dados para TABLE:",s)}}else r.value=[]},N=async()=>{const a=r.value.reduce((o,e)=>(o[e.parametro]=e.value,o),{});try{const o={...a,user_id:i("user-data").value.usuario_id},{data:e}=await k(B,{method:"POST",body:o},"$6CLQJHdzNf");window.open(e.value,"_blank"),r.value=[],u.value=null}catch(o){console.error("Erro ao criar o relatório:",o)}};return(a,o)=>(t(),f(E,null,[O,C("div",null,[c(T,{modelValue:v(u),"onUpdate:modelValue":o[0]||(o[0]=e=>$(u)?u.value=e:null),items:v(A),class:"mb-5","item-title":"label","item-value":"value",label:"Selecione o relatório",required:"","onUpdate:search":x},null,8,["modelValue","items"])]),v(u)?(t(),f("div",z,[c(Q,null,{default:p(()=>[(t(!0),f(E,null,F(v(r),(e,s)=>(t(),m(S,{key:s},{default:p(()=>[c(H,{cols:"4"},{default:p(()=>[e.tipo!=="DATE"&&e.tipo!=="TABLE"?(t(),m(y,{key:0,modelValue:e.value,"onUpdate:modelValue":l=>e.value=l,label:e.label,required:e.obrigatorio},null,8,["modelValue","onUpdate:modelValue","label","required"])):n("",!0),e.tipo==="INTEGER"?(t(),m(y,{key:1,modelValue:e.value,"onUpdate:modelValue":l=>e.value=l,type:"number",outlined:""},null,8,["modelValue","onUpdate:modelValue"])):n("",!0),e.tipo==="DATE"?(t(),m(y,{key:2,modelValue:e.value,"onUpdate:modelValue":l=>e.value=l,type:"date"},null,8,["modelValue","onUpdate:modelValue"])):n("",!0),e.tipo==="TABLE"?(t(),m(T,{key:3,modelValue:e.value,"onUpdate:modelValue":l=>e.value=l,items:e.items,"item-title":"label","item-value":"value",label:e.label,required:e.obrigatorio},null,8,["modelValue","onUpdate:modelValue","items","label","required"])):n("",!0)]),_:2},1024)]),_:2},1024))),128)),c(I,{color:"green",class:"mt-4",onClick:N},{default:p(()=>[P("Enviar")]),_:1})]),_:1})])):n("",!0)],64))}};export{oe as default};