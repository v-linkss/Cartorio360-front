import{_ as I}from"./Du82FIzl.js";import{_ as P,u as R,r as y,H as T,N as U,q as u,o as _,A as B,w as i,C as E,x as S,b as a,a as o,s as v,v as g,c as V,K as F,p as J,e as j}from"./DKofyMID.js";import{u as q,a as G}from"./BPBY4Qih.js";import{_ as H,a as K}from"./HBU26js5.js";import{_ as X}from"./DDHWPolY.js";import{_ as M,a as O}from"./CO3Xsw0R.js";import{V as Q}from"./CYWSCjcg.js";import{V as w}from"./DzHMWvJG.js";const m=n=>(J("data-v-a73331dd"),n=n(),j(),n),W=m(()=>o("img",{class:"btn-pointer",src:H,alt:"Cadastro"},null,-1)),Y={style:{width:"200px"}},Z={style:{width:"300px"}},ee=["onClick"],te=m(()=>o("img",{style:{width:"30px",height:"30px"},src:X,alt:"Visualizar"},null,-1)),se=[te],oe=["onClick"],ae=m(()=>o("img",{style:{width:"30px",height:"30px"},src:M,alt:"Atualizar"},null,-1)),ie=[ae],ne=["onClick"],le={key:0,style:{width:"30px",height:"30px"},src:O,alt:"Visualizar",title:"Reativar"},ce={key:1,src:K,alt:"Excluir",class:"trash-icon",style:{width:"30px",height:"30px"},title:"Excluir"},re={__name:"index",async setup(n){let l,h;const f=S(),C=`${f.public.managemant}/getAllPessoa`,k=`${f.public.managemant}/updatePessoa`,x=R(),c=y(""),r=y(""),b=[{title:"Documento",value:"doc_identificacao"},{title:"Nome/Razão Social",value:"nome"},{value:"actions"}],{data:$,pending:z}=([l,h]=T(()=>q(C,"$Jxa9V4cJXG")),l=await l,h(),l),L=U(()=>$.value.filter(e=>{const s=e.doc_identificacao?e.doc_identificacao.toLowerCase():"",p=e.nome?e.nome.toLowerCase():"",t=s.includes(r.value.toLowerCase()),d=p.includes(c.value.toLowerCase());return t&&d}));async function N(e){e.excluido=!e.excluido;try{await G(`${k}/${e.id}`,{method:"PUT",body:{excluido:e.excluido}},"$yehyeyA3ii")}catch(s){console.error("Erro ao excluir pessoa:",s)}}function A(e){x.push({path:`/pessoas/vizualizar/${e}`})}function D(e){x.push({path:`/pessoas/atualizar/${e}`})}return(e,s)=>{const p=I;return u(z)?E("",!0):(_(),B(Q,{key:0,class:"mt-5"},{default:i(()=>[a(p,{to:"/pessoas/cadastro"},{default:i(()=>[W]),_:1}),a(w,{style:{gap:"10rem"}},{default:i(()=>[o("div",Y,[a(v,{class:"mt-7 mb-4",modelValue:u(r),"onUpdate:modelValue":s[0]||(s[0]=t=>g(r)?r.value=t:null),label:"Documento","prepend-inner-icon":"mdi-magnify",variant:"outlined","hide-details":"","single-line":""},null,8,["modelValue"])]),o("div",Z,[a(v,{class:"mt-7 mb-4",modelValue:u(c),"onUpdate:modelValue":s[1]||(s[1]=t=>g(c)?c.value=t:null),label:"Pessoa","prepend-inner-icon":"mdi-magnify",variant:"outlined","hide-details":"","single-line":""},null,8,["modelValue"])])]),_:1}),a(F,{density:"compact",headers:b,items:u(L),"item-key":"id"},{"item.actions":i(({item:t})=>[a(w,{style:{display:"flex",gap:"10px","justify-content":"flex-end"}},{default:i(()=>[o("div",{class:"btn-pointer",onClick:d=>A(t.id),title:"Visualizar"},se,8,ee),o("div",{class:"btn-pointer",onClick:d=>D(t.id),title:"Atualizar"},ie,8,oe),o("div",{class:"btn-pointer",onClick:d=>N(t),title:"Deletar"},[t.excluido?(_(),V("img",le)):(_(),V("img",ce))],8,ne)]),_:2},1024)]),_:1},8,["items"])]),_:1}))}}},ye=P(re,[["__scopeId","data-v-a73331dd"]]);export{ye as default};