import{_ as B,E as $,r as i,N as x,D as p,h as q,o as f,c as I,b as t,w as l,A as R,q as e,O as U,P as D,x as F,a as y,t as N,v as k,p as P,e as T}from"./DKofyMID.js";import{a as V}from"./BPBY4Qih.js";import E from"./Cy8umVDv.js";import K from"./ZGA-VDze.js";import j from"./DDW2se_c.js";import H from"./CbxHY2rL.js";import{V as L}from"./CYWSCjcg.js";import{V as h}from"./DzHMWvJG.js";import{V as S}from"./CjGtZkLM.js";import{V as g}from"./CP086_bt.js";import"./BMZBqIMV.js";import"./DxndgaOL.js";import"./CRm13XgG.js";import"./BImw4lz7.js";import"./1jhHzY5z.js";import"./DuSPdv5F.js";import"./Du82FIzl.js";import"./BTEUJRZz.js";import"./DDHWPolY.js";import"./HBU26js5.js";import"./CO3Xsw0R.js";import"./IlJfZQNA.js";import"./4fIsiXoN.js";const W=m=>(P("data-v-63d0797a"),m=m(),T(),m),X=W(()=>y("h1",null,"Ordem de Serviço nº",-1)),z={style:{color:"red","margin-left":"30px"}},G={__name:"criar-ato",setup(m){const C=$().query.numeroOs,A={yXA3K:E,WrhCH:K,bFsdV:j,xkyaA:H},u=i([]),c=i([]),n=i(""),a=i(" "),b=x(()=>A[a.value]),d=`${F().public.managemant}/tipoAtos`,_=p("auth_token").value,v=i(p("user-data").value.cartorio_token).value,w=async()=>{const{data:o}=await V(d,{method:"POST",body:{usuario_token:_,cartorio_token:v}},"$BALimOVqjo");u.value=o.value,u.value.length>0&&(n.value=u.value[0].token)},O=async o=>{const{data:s}=await V(d,{method:"POST",body:{usuario_token:_,cartorio_token:v,servico_token:o}},"$q4tUBUK2on");c.value=s.value};return w(),q(n,async o=>{o&&(await O(o),a.value=c.value.length>0?c.value[0].token:[])}),(o,s)=>(f(),I(D,null,[t(L,null,{default:l(()=>[t(h,{class:"mb-5"},{default:l(()=>{var r;return[X,y("h1",z,N(e(C)||((r=("useCookie"in o?o.useCookie:e(p))("user-service").value)==null?void 0:r.numero)||null),1)]}),_:1}),t(h,null,{default:l(()=>[t(S,{md:"6"},{default:l(()=>[t(g,{class:"mr-5",label:"Selecione o Servico",items:e(u),"item-title":"descricao","item-value":"token",modelValue:e(n),"onUpdate:modelValue":s[0]||(s[0]=r=>k(n)?n.value=r:null)},null,8,["items","modelValue"])]),_:1}),t(S,{md:"6"},{default:l(()=>[t(g,{label:"Selecione o tipo de ato",modelValue:e(a),"onUpdate:modelValue":s[1]||(s[1]=r=>k(a)?a.value=r:null),"item-title":"descricao","item-value":"token",items:e(c)},null,8,["modelValue","items"])]),_:1})]),_:1})]),_:1}),(f(),R(U(e(b)),{ato_token:e(a)},null,8,["ato_token"]))],64))}},go=B(G,[["__scopeId","data-v-63d0797a"]]);export{go as default};