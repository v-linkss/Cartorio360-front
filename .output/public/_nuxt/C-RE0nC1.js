import{_ as oe}from"./amHTH2OA.js";import{_ as se}from"./CX4V6En3.js";import{_ as ae}from"./ByIjPY1P.js";import{_ as ne}from"./DjgEsiay.js";import{n as re,q as le,u as ie,r as l,A as k,s as ue,B as ce,o as me,c as de,b as t,w as n,x as s,H as pe,z as _e,V as C,a as i,y as F,d as O}from"./DEikABjm.js";import{u as h}from"./BXaguRPR.js";import{_ as z}from"./Bj0P96uG.js";import{_ as ve,V as R,b as fe}from"./DCFVEE-h.js";import{V as g}from"./FcAL8Eew.js";import{V as c}from"./BL_dJUne.js";import{V as ke}from"./DJR5Kekk.js";import"./D_RDeQ3U.js";import"./DK_vSCQY.js";import"./B50rMhix.js";import"./DfjuBLsA.js";import"./BL6mdXsd.js";import"./CZQ3-YOl.js";import"./Cnu1vHCn.js";import"./DQIbkNFL.js";import"./DcTGL1LI.js";const he=["onClick"],ge=i("img",{style:{width:"30px",height:"30px"},src:z,alt:"Visualizar"},null,-1),ye=[ge],Ve=["onClick"],we=i("img",{style:{width:"30px",height:"30px",cursor:"pointer"},src:fe,alt:"Remover"},null,-1),be=[we],Ke={__name:"autencidade",props:{ato_token:{type:String,required:!0}},async setup(B){let p,q;const S=B,$=re(),P=le(),_=_e(),{$toast:U}=ie(),j=`${_.public.managemant}/listarEscrevente`,N=`${_.public.managemant}/pesquisarPessoas`,D=`${_.public.managemant}/atoReconhecimento`,I=`${_.public.managemant}/etiquetaAutenticidade`,v=l(k("user-data").value.cartorio_token),K=l(k("user-service").value.token).value||l(k("user-service").value).value,H=k("auth_token").value,y=l([]),E=l([]),m=l([]),V=l(!1),w=l(!1),b=l(!1),x=l(null),T=l(""),A=[{title:"Documento",align:"start",key:"documento"},{title:"Pessoa",align:"start",key:"nome"},{value:"actions"}],r=ue({quantidade:1,escrevente:null,nome:null,documento:null}),{data:L}=([p,q]=ce(()=>h(j,{method:"POST",body:{cartorio_token:v}},"$qpB20nOlUE")),p=await p,q(),p);E.value=L.value[0].func_json_escreventes;async function Q(){try{const{data:o,error:e}=await h(N,{method:"POST",body:{cartorio_token:v.value,documento:r.documento,nome:r.nome}},"$CfpM9wZnUE");o.value.length>0?y.value=o.value:y.value=[]}catch(o){console.error("Erro na requisição",o)}}const Z=()=>{w.value=!0};function W(o){m.value.push(o)}const G=o=>{x.value=o,b.value=!0};function J(o){m.value=m.value.filter(e=>e.token!==o.token)}async function X(){if(!r.escrevente){U.error("Por favor selecione um Escrevente");return}try{const o=m.value.map(u=>({pessoa_token:u.token})),{data:e,error:f,status:d}=await h(D,{method:"POST",body:{pessoas:o,cartorio_token:v.value,ordemserv_token:K,quantidade:r.quantidade,usuario_token:H,ato_tipo_token:S.ato_token}},"$LrKAtpxZwH");d.value==="success"&&e.value[0].status==="OK"?(Y(e.value[0].token),M()):(V.value=!0,T.value=ato_token.value.status_mensagem||f.value.data.details)}catch(o){console.error("Erro na requisição",o)}}async function Y(o){try{const{data:e,error:f,status:d}=await h(I,{method:"POST",body:{ato_token:o,cartorio_token:v.value,escrevente_token:r.escrevente}},"$EE94jKo1pQ");if(d.value==="success"){const u=window.open("","_blank");u.document.open(),u.document.write(e.value[0].etiqueta),u.document.close()}}catch(e){console.error("Erro na requisição",e)}}const M=()=>{const o=P.query.origem||"criar",e=P.query.id;o==="atualizar"?$.push(`/os/atualizar/${e}`):$.push("/os/criar-registro")};return(o,e)=>{const f=oe,d=se,u=ae,ee=ne;return me(),de(pe,null,[t(g,{class:"mt-5"},{default:n(()=>[t(c,{cols:"5"},{default:n(()=>[t(ke,{label:"Tabelião/escrevente",modelValue:s(r).escrevente,"onUpdate:modelValue":e[0]||(e[0]=a=>s(r).escrevente=a),items:s(E),"item-title":"nome","item-value":"token",required:""},null,8,["modelValue","items"])]),_:1}),t(c,{cols:"2"},{default:n(()=>[t(C,{label:"Quantidade",type:"number",modelValue:s(r).quantidade,"onUpdate:modelValue":e[1]||(e[1]=a=>s(r).quantidade=a)},null,8,["modelValue"])]),_:1})]),_:1}),t(g,null,{default:n(()=>[t(c,{cols:"3"},{default:n(()=>[t(C,{label:"Documento",modelValue:s(r).documento,"onUpdate:modelValue":e[2]||(e[2]=a=>s(r).documento=a)},null,8,["modelValue"])]),_:1}),t(c,{cols:"4"},{default:n(()=>[t(C,{label:"Pessoa",modelValue:s(r).nome,"onUpdate:modelValue":e[3]||(e[3]=a=>s(r).nome=a)},null,8,["modelValue"])]),_:1}),i("div",null,[i("img",{class:"btn-pointer mt-3",src:z,style:{width:"40px",cursor:"pointer"},title:"Pesquisar Pessoa",onClick:Q})]),i("div",null,[i("img",{class:"btn-pointer mt-3 ml-2",src:ve,style:{width:"40px",cursor:"pointer"},title:"Criar Pessoa",onClick:Z})])]),_:1}),t(g,null,{default:n(()=>[t(c,{class:"mr-10"},{default:n(()=>[t(R,{style:{height:"465px"},headers:A,items:s(y)},{"item.actions":n(({item:a})=>[i("div",{style:{display:"flex",cursor:"pointer","justify-content":"flex-end"},onClick:te=>G(a),title:"Visualizar Ficha"},ye,8,he)]),_:1},8,["items"])]),_:1}),t(c,null,{default:n(()=>[t(R,{headers:A,items:s(m),style:{height:"465px"},"item-key":"id"},{"item.actions":n(({item:a})=>[i("div",{style:{display:"flex","justify-content":"flex-end"},onClick:te=>J(a),title:"Remover"},be,8,Ve)]),_:1},8,["items"])]),_:1})]),_:1}),t(f,{show:s(w),onClose:e[4]||(e[4]=a=>w.value=!1)},null,8,["show"]),t(d,{show:s(b),item:s(x),onConfirmar:e[5]||(e[5]=a=>W(s(x))),onClose:e[6]||(e[6]=a=>b.value=!1)},null,8,["show","item"]),t(u,{show:s(V),errorMessage:s(T),onClose:e[7]||(e[7]=a=>V.value=!1)},null,8,["show","errorMessage"]),t(g,null,{default:n(()=>[t(ee,{onClick:M},{default:n(()=>[t(F,{size:"large",color:"red"},{default:n(()=>[O("Voltar")]),_:1})]),_:1}),t(F,{class:"ml-5",onClick:X,size:"large",color:"green"},{default:n(()=>[O("Salvar")]),_:1})]),_:1})],64)}}};export{Ke as default};