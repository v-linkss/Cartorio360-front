import{_ as G}from"./D1EtO9DA.js";import{_ as Q}from"./BEmK7xPZ.js";import{u as J,E as H,r as l,D as k,F as X,G as Y,o as Z,c as ee,b as s,w as r,q as a,O as oe,a as c,x as te,s as $,J as E,v as se}from"./D1KNRLNo.js";import{u as g}from"./NiBZevPt.js";import{_ as ae}from"./DCsXQasW.js";import{_ as ne}from"./iq-OhJk-.js";import{_ as re}from"./ToPptOUL.js";import{c as le,r as ue,u as ce,V as ie,_ as me}from"./B1dRzHWz.js";import{V}from"./DB0qw6uS.js";import{V as d}from"./Bbkb6pIh.js";import"./aItHlT65.js";const de=c("h1",null,"Reconhecimento por Semelhança",-1),pe=["onClick"],_e=c("img",{style:{width:"30px",height:"30px",cursor:"pointer"},src:ne,alt:"Remover"},null,-1),ve=[_e],fe=c("img",{class:"btn-pointer mt-10 mb-5",src:re,alt:"Sair",style:{cursor:"pointer"}},null,-1),Ce={__name:"semelhanca",props:{ato_token:{type:String,required:!0}},async setup(R){let _,w;const T=R,q=J(),x=H(),v=te(),M=`${v.public.managemant}/listarEscrevente`,O=`${v.public.managemant}/pesquisarPessoas`,F=`${v.public.managemant}/atoReconhecimento`,B=`${v.public.managemant}/etiquetaReconhecimento`,f=l(k("user-data").value.cartorio_token),D=l(k("user-service").value.token).value||l(k("user-service").value).value,U=k("auth_token").value,y=l([]),i=l([]),P=l([]),p=l([]),b=l(!1),S=l(""),C=[{title:"Documento",align:"start",key:"documento"},{title:"Pessoa",align:"start",key:"nome"},{value:"actions"}],n=X({quantidade:1,escrevente:null,nome:null,documento:null}),j={escrevente:{required:le.withMessage("O campo é obrigatorio",ue)}},h=ce(j,n),{data:A}=([_,w]=Y(()=>g(M,{method:"POST",body:{cartorio_token:f}},"$iEFsIjdWdW")),_=await _,w(),_);P.value=A.value[0].func_json_escreventes;async function N(){try{const{data:t,error:e}=await g(O,{method:"POST",body:{cartorio_token:f.value,documento:n.documento,nome:n.nome}},"$uzKb8LPV3v");t.value.length>0?y.value=t.value:y.value=[]}catch(t){console.error("Erro na requisição",t)}}function z(t){t.length>0?p.value=t.map(e=>{const[m,u,o]=e.split("-");return{nome:m,documento:u==="null"?null:u,pessoa_token:o}}):console.log("Nenhum item selecionado")}function I(t){p.value=p.value.filter(e=>e.pessoa_token!==t.pessoa_token),i.value=i.value.filter(e=>e!==`${t.nome}-${t.documento}-${t.pessoa_token}`)}async function K(){if(await h.value.$validate()){const t=p.value.map(e=>({pessoa_token:e.pessoa_token}));try{const{data:e,error:m,status:u}=await g(F,{method:"POST",body:{pessoas:t,cartorio_token:f.value,ordemserv_token:D,quantidade:n.quantidade,usuario_token:U,ato_tipo_token:T.ato_token}},"$MulQmK1LAp");u.value==="success"&&e.value[0].status==="OK"?L(e.value[0].token):(b.value=!0,S.value=ato_token.value.status_mensagem||m.value.data.details)}catch(e){console.error("Erro na requisição",e)}}}async function L(t){try{const{data:e,error:m,status:u}=await g(B,{method:"POST",body:{ato_token:t,cartorio_token:f.value,escrevente_token:n.escrevente}},"$fMGlIlw995");if(u.value==="success"){const o=window.open("","_blank");o.document.open(),o.document.write(e.value[0].etiqueta),o.document.close()}}catch(e){console.error("Erro na requisição",e)}}const W=()=>{const t=x.query.origem||"criar",e=x.query.id;t==="atualizar"?q.push(`/ordens-servicos/atualizar/${e}`):q.push("/ordens-servicos/criar-registro")};return(t,e)=>{const m=G,u=Q;return Z(),ee(oe,null,[de,s(V,{class:"mt-5"},{default:r(()=>[s(d,{cols:"5"},{default:r(()=>[s(ie,{label:"Tabelião/escrevente",modelValue:a(n).escrevente,"onUpdate:modelValue":e[0]||(e[0]=o=>a(n).escrevente=o),items:a(P),"item-title":"nome","item-value":"token",required:"","error-messages":a(h).escrevente.$errors.map(o=>o.$message),onBlur:a(h).escrevente.$touch,onInput:a(h).escrevente.$touch},null,8,["modelValue","items","error-messages","onBlur","onInput"])]),_:1}),s(d,{cols:"2"},{default:r(()=>[s($,{label:"Quantidade",type:"number",modelValue:a(n).quantidade,"onUpdate:modelValue":e[1]||(e[1]=o=>a(n).quantidade=o)},null,8,["modelValue"])]),_:1})]),_:1}),s(V,null,{default:r(()=>[s(d,{cols:"3"},{default:r(()=>[s($,{label:"Documento",modelValue:a(n).documento,"onUpdate:modelValue":e[2]||(e[2]=o=>a(n).documento=o)},null,8,["modelValue"])]),_:1}),s(d,{cols:"4"},{default:r(()=>[s($,{label:"Pessoa",modelValue:a(n).nome,"onUpdate:modelValue":e[3]||(e[3]=o=>a(n).nome=o)},null,8,["modelValue"])]),_:1}),c("div",null,[c("img",{class:"btn-pointer mt-3",src:ae,style:{width:"40px",cursor:"pointer"},onClick:N})])]),_:1}),s(V,null,{default:r(()=>[s(d,{class:"mr-10"},{default:r(()=>[s(E,{style:{height:"465px"},headers:C,items:a(y),"show-select":"",modelValue:a(i),"onUpdate:modelValue":e[4]||(e[4]=o=>se(i)?i.value=o:null),"item-value":o=>`${o.nome}-${o.documento}-${o.token}`,onchange:z(a(i))},null,8,["items","modelValue","item-value","onchange"])]),_:1}),s(d,null,{default:r(()=>[s(E,{headers:C,items:a(p),style:{height:"465px"},"item-key":"id"},{"item.actions":r(({item:o})=>[c("div",{style:{display:"flex","justify-content":"flex-end"},onClick:he=>I(o),title:"Remover"},ve,8,pe)]),_:1},8,["items"])]),_:1})]),_:1}),s(V,null,{default:r(()=>[s(m,{onClick:W},{default:r(()=>[fe]),_:1}),c("div",null,[c("img",{class:"mt-10 mb-5 ml-10",onClick:K,style:{cursor:"pointer"},src:me})])]),_:1}),s(u,{show:a(b),errorMessage:a(S),onClose:e[5]||(e[5]=o=>b.value=!1)},null,8,["show","errorMessage"])],64)}}};export{Ce as default};