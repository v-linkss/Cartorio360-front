import{_ as le}from"./Dbi11VSu.js";import{_ as ne,a as ie}from"./CPWwDDbM.js";import{n as ue,r as i,D as o,F as de,G as ce,H as me,o as m,A as g,w as l,x as pe,b as n,a as u,t as ve,q as a,I as _e,s as S,C as z,K as fe,L as ge,c as M,J as be,y as he,d as ye}from"./DRR9lf64.js";import{u as O}from"./DpQ56Y3J.js";import"./DwxJipEU.js";import{_ as ke}from"./37abXc2X.js";import{_ as Ce,a as Ve}from"./CrE-eFFQ.js";import{_ as xe,a as $e}from"./qu7Wfn_m.js";import{c as G,r as H,u as we,V as Se}from"./CzE9nWNi.js";import{V as Oe}from"./BaMkntfk.js";import{V as y}from"./Cml2SLMY.js";import{V as k}from"./D7D83Ict.js";import"./Cq5hbXRZ.js";const Ee=u("h1",null,"Ordem de Serviço nº ",-1),Te={style:{color:"red","margin-left":"30px"}},De=u("h1",{class:"ml-5"},"Atos",-1),Re=u("img",{style:{width:"45px",height:"45px",cursor:"pointer"},src:Ce,alt:"novo"},null,-1),Ae=u("img",{style:{width:"30px",height:"30px",cursor:"pointer"},src:ie,alt:"Reimprimir"},null,-1),Ne=[Ae],Be=["onClick","title"],Fe=["disabled","onClick"],qe={key:0,style:{width:"30px",height:"30px",cursor:"pointer"},src:$e,alt:"Visualizar",title:"Reativar"},Ie={key:1,src:Ve,alt:"Excluir",class:"trash-icon",style:{width:"30px",height:"30px",cursor:"pointer"},title:"Excluir"},Ze={__name:"criar-registro",async setup(Pe){var N,B,F,q,I,P,U;let b,E;const{$toast:v}=ue(),C=pe(),J=`${C.public.managemant}/createOrdensServico`,j=`${C.public.managemant}/validarCpf`,K=`${C.public.managemant}/listarAtos`,Q=i(o("user-data").value.cartorio_id),Y=i(o("user-data").value.usuario_id),W=i((N=o("user-service").value)==null?void 0:N.token).value||null,X=i(o("user-data").value.cartorio_token).value,T=i((B=o("user-service").value)==null?void 0:B.numero),h=i((F=o("user-service").value)==null?void 0:F.isDisabled);let D=i(!!((q=o("user-service").value)!=null&&q.numero)),V=i(o("ordem-button").value),x=!1;const $=i(!1),w=i([]),r=de({nacionalidade:((I=o("user-service").value)==null?void 0:I.estrangeiro)||!1,apresentante_nome:(P=o("user-service").value)==null?void 0:P.apresentante_nome,apresentante_cpf:(U=o("user-service").value)==null?void 0:U.apresentante_cpf}),_=i(!1),Z=[{title:"Protocolo",value:"protocolo"},{title:"Usuario",value:"usuario_nome"},{title:"Situação",value:"situacao"},{title:"Valor",value:"valor"},{title:"Tipo",value:"tipo"},{value:"actions"}],ee=[{title:"BRASILEIRO",value:!1},{title:"ESTRANGEIRO",value:!0}],ae={apresentante_nome:{required:G.withMessage("O campo é obrigatorio",H)},apresentante_cpf:{required:G.withMessage("O campo é obrigatorio",H)}},c=we(ae,r);function R(s){if(s)return s.replace(/[.\-]/g,"");s=null}function te(){const s=o("user-service"),t=o("ordem-button");s.value=null,t.value=null}const oe=()=>{$.value=!0};async function re(){const s={apresentante_cpf:R(r.apresentante_cpf),apresentante_nome:r.apresentante_nome,user_id:Y.value,cartorio_id:Q.value,estrangeiro:r.nacionalidade};if(await c.value.$validate()){const{data:t,error:p,status:d}=await O(J,{method:"POST",body:s},"$omLGvLxYlw");if(d.value==="error"&&p.value.statusCode===500)v.error("Erro ao cadastrar ordem,erro no sistema.");else{v.success("Ordem registrada com sucesso!"),D.value=!0,V.value=!1,T.value=t.value.numero;const f=o("ordem-button");f.value=V.value;const e=o("user-service");e.value=e.value=JSON.stringify({numero:t.value.numero,id:t.value.id,apresentante_cpf:t.value.apresentante_cpf,apresentante_nome:t.value.apresentante_nome,estrangeiro:t.value.estrangeiro,token:t.value.token,isDisabled:!0}),_.value=!0}}}async function se(s){const t=R(s);if(t.length===11&&!x){x=!0;const p={cpf:t};try{const{data:d,error:f,status:e}=await O(j,{method:"POST",body:p},"$e6ybTA3ect");e.value==="error"&&f.value.statusCode===500?v.error("Erro ao cadastrar pessoa, o CPF já está cadastrado."):d.value.cpfValidation===!0?(r.apresentante_nome=d.value.nome,v.success("Cpf autenticado com sucesso!")):d.value.cpfValidation===!1&&v.error("Cpf não cadastrado!")}catch(d){console.error("Erro ao validar CPF:",d)}finally{x=!1}}}const{data:A}=([b,E]=ce(()=>O(K,{method:"POST",body:{cartorio_token:X,ordemserv_token:W}},"$Q1qkHbHde0")),b=await b,E(),b);return A.value.length>0?w.value=A.value:w.value=[],(s,t)=>{const p=le,d=ne,f=me("mask");return m(),g(Oe,{class:"mt-5"},{default:l(()=>[n(y,{class:"mb-5"},{default:l(()=>{var e;return[Ee,u("h1",Te,ve(a(T)||((e=("useCookie"in s?s.useCookie:a(o))("user-service").value)==null?void 0:e.numero)),1)]}),_:1}),n(y,null,{default:l(()=>[n(k,{md:"3"},{default:l(()=>[n(Se,{label:"Nacionalidade",items:ee,modelValue:a(r).nacionalidade,"onUpdate:modelValue":t[0]||(t[0]=e=>a(r).nacionalidade=e),disabled:a(h)||a(_)},null,8,["modelValue","disabled"])]),_:1}),n(k,{md:"2"},{default:l(()=>[a(r).nacionalidade===!1?_e((m(),g(S,{key:0,autofocus:"",modelValue:a(r).apresentante_cpf,"onUpdate:modelValue":t[1]||(t[1]=e=>a(r).apresentante_cpf=e),label:"CPF",required:"","error-messages":a(c).apresentante_cpf.$errors.map(e=>e.$message),onBlur:a(c).apresentante_cpf.$touch,onInput:t[2]||(t[2]=e=>se(a(r).apresentante_cpf)),disabled:a(h)||a(_)},null,8,["modelValue","error-messages","onBlur","disabled"])),[[f,"###.###.###-##"]]):(m(),g(S,{key:1,autofocus:"",modelValue:a(r).apresentante_cpf,"onUpdate:modelValue":t[3]||(t[3]=e=>a(r).apresentante_cpf=e),label:"Documento",required:"","error-messages":a(c).apresentante_cpf.$errors.map(e=>e.$message),onBlur:a(c).apresentante_cpf.$touch,disabled:a(h)||a(_)},null,8,["modelValue","error-messages","onBlur","disabled"]))]),_:1}),n(k,{md:"4"},{default:l(()=>[n(S,{modelValue:a(r).apresentante_nome,"onUpdate:modelValue":t[4]||(t[4]=e=>a(r).apresentante_nome=e),label:"Nome Apresentante",required:"","error-messages":a(c).apresentante_nome.$errors.map(e=>e.$message),onInput:a(c).apresentante_nome.$touch,disabled:a(h)||a(_)},null,8,["modelValue","error-messages","onInput","disabled"])]),_:1}),a(V)?(m(),g(k,{key:0},{default:l(()=>[u("div",null,[u("img",{style:{width:"40px",height:"40px",cursor:"pointer"},src:ke,alt:"Salvar",onClick:t[5]||(t[5]=e=>re())})])]),_:1})):z("",!0)]),_:1}),a(D)?(m(),g(y,{key:0,style:{display:"flex","margin-bottom":"10px",gap:"2rem"}},{default:l(()=>[De,n(p,{to:{path:"/ordens-servicos/criar-ato",query:{origem:"criar"}}},{default:l(()=>[Re]),_:1}),n(be,{headers:Z,items:a(w),"item-key":"id"},{"item.actions":l(({item:e})=>[n(y,{style:{display:"flex",gap:"10px","margin-top":"-5px"}},{default:l(()=>[u("div",{onClick:t[6]||(t[6]=L=>oe()),title:"Reimprimir"},Ne),u("div",{class:ge({disabled:!e.btn_editar}),onClick:L=>e.btn_editar?s.redirectToUpdate(e.id):null,title:e.btn_editar?"Editar":"Desabilitado"},[u("img",{style:fe({cursor:e.btn_editar?"pointer":"default",width:"30px",height:"30px"}),src:xe,alt:"Editar"},null,4)],10,Be),u("div",{disabled:!e.btn_cancelar,onClick:L=>e.btn_cancelar?s.deleteEndereco(e):null,title:"Excluir"},[e.excluido?(m(),M("img",qe)):(m(),M("img",Ie))],8,Fe)]),_:2},1024)]),_:1},8,["items"]),n(d,{show:a($),onClose:t[7]||(t[7]=e=>$.value=!1)},null,8,["show"])]),_:1})):z("",!0),n(p,{to:"/ordens-servicos"},{default:l(()=>[n(he,{size:"large",color:"red",onClick:te},{default:l(()=>[ye("Voltar")]),_:1})]),_:1})]),_:1})}}};export{Ze as default};