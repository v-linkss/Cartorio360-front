import{_ as O,q as $,r as n,Q as x,A as p,h as R,o as f,c as q,b as t,w as l,v as I,x as e,R as U,H as F,z as T,a as g,t as D,C as k,p as H,e as K}from"./CjSmecsV.js";import{u as V}from"./CBiVWpN1.js";import N from"./CDbqLkS1.js";import P from"./DJEBQCWK.js";import j from"./BYk7xgMV.js";import z from"./BtIPS5i6.js";import{V as E}from"./ui_06wT2.js";import{V as h}from"./BsZJyy-L.js";import{V as S}from"./IEgq9ATL.js";import{V as C}from"./BftCIFik.js";import"./CUoPItWk.js";import"./qPRRb8n1.js";import"./kWy8o0UT.js";import"./DfjuBLsA.js";import"./1OPufMyb.js";import"./Bd5Y6xEg.js";import"./CKAn2jqS.js";import"./BLHH2bQT.js";import"./CD6_OfEl.js";import"./niuKjE1Y.js";import"./BsFXRMvy.js";import"./BNDfKRox.js";import"./CM1EkVLM.js";import"./BijMPXOi.js";import"./7RZiGzyd.js";const L=m=>(H("data-v-63d0797a"),m=m(),K(),m),Q=L(()=>g("h1",null,"Ordem de Serviço nº",-1)),W={style:{color:"red","margin-left":"30px"}},X={__name:"criar-ato",setup(m){const y=$().query.numeroOs,A={yXA3K:N,WrhCH:P,bFsdV:j,xkyaA:z},u=n([]),c=n([]),i=n(""),a=n(" "),b=x(()=>A[a.value]),d=`${T().public.managemant}/tipoAtos`,_=p("auth_token").value,v=n(p("user-data").value.cartorio_token).value,w=async()=>{const{data:o}=await V(d,{method:"POST",body:{usuario_token:_,cartorio_token:v}},"$BALimOVqjo");u.value=o.value,u.value.length>0&&(i.value=u.value[0].token)},B=async o=>{const{data:s}=await V(d,{method:"POST",body:{usuario_token:_,cartorio_token:v,servico_token:o}},"$q4tUBUK2on");c.value=s.value};return w(),R(i,async o=>{o&&(await B(o),a.value=c.value.length>0?c.value[0].token:[])}),(o,s)=>(f(),q(F,null,[t(E,null,{default:l(()=>[t(h,{class:"mb-5"},{default:l(()=>{var r;return[Q,g("h1",W,D(e(y)||((r=("useCookie"in o?o.useCookie:e(p))("user-service").value)==null?void 0:r.numero)||null),1)]}),_:1}),t(h,null,{default:l(()=>[t(S,{md:"6"},{default:l(()=>[t(C,{class:"mr-5",label:"Selecione o Servico",items:e(u),"item-title":"descricao","item-value":"token",modelValue:e(i),"onUpdate:modelValue":s[0]||(s[0]=r=>k(i)?i.value=r:null)},null,8,["items","modelValue"])]),_:1}),t(S,{md:"6"},{default:l(()=>[t(C,{label:"Selecione o tipo de ato",modelValue:e(a),"onUpdate:modelValue":s[1]||(s[1]=r=>k(a)?a.value=r:null),"item-title":"descricao","item-value":"token",items:e(c)},null,8,["modelValue","items"])]),_:1})]),_:1})]),_:1}),(f(),I(U(e(b)),{ato_token:e(a)},null,8,["ato_token"]))],64))}},yo=O(X,[["__scopeId","data-v-63d0797a"]]);export{yo as default};