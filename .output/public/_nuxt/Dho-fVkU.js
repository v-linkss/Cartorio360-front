import{_ as le}from"./DjgEsiay.js";import{_ as ue,a as de,b as ce}from"./CcrpU9ym.js";import{u as pe,n as me,r as l,A as r,s as _e,B as ve,o as p,v as g,w as i,z as fe,M as ge,b as n,a as u,t as be,x as a,N as he,V as O,G as M,O as ke,P as Ve,c as L,y as ye,d as Ce}from"./DEikABjm.js";import{u as S}from"./BXaguRPR.js";import"./DK_vSCQY.js";import{c as xe,V as $e,_ as we,a as Oe,b as Se}from"./DCFVEE-h.js";import{c as G,r as H,u as Re}from"./D_RDeQ3U.js";import{V as De}from"./B50rMhix.js";import{V as k}from"./FcAL8Eew.js";import{V}from"./BL_dJUne.js";import{V as Ee}from"./DJR5Kekk.js";import"./BL6mdXsd.js";import"./CZQ3-YOl.js";import"./Cnu1vHCn.js";import"./DQIbkNFL.js";import"./DcTGL1LI.js";const Ne=u("h1",null,"Ordem de Serviço nº",-1),Ae={style:{color:"red","margin-left":"30px"}},Be=u("h1",{class:"ml-5"},"Atos",-1),Te=u("img",{style:{width:"45px",height:"45px",cursor:"pointer"},src:we,alt:"novo"},null,-1),Pe=u("img",{style:{width:"30px",height:"30px",cursor:"pointer"},src:ce,alt:"Reimprimir"},null,-1),qe=[Pe],Fe=["onClick","title"],Ie=["disabled","onClick"],ze={key:0,style:{width:"30px",height:"30px",cursor:"pointer"},src:Oe,alt:"Visualizar",title:"Reativar"},Ue={key:1,src:Se,alt:"Excluir",class:"trash-icon",style:{width:"30px",height:"30px",cursor:"pointer"},title:"Excluir"},sa={__name:"criar-registro",async setup(Me){var B,T,P,q,F,I,z;let b,R;const{$toast:_}=pe(),J=me(),y=fe(),j=`${y.public.managemant}/createOrdensServico`,W=`${y.public.managemant}/validarCpf`,X=`${y.public.managemant}/listarAtos`,K=l(r("user-data").value.cartorio_id),Q=l(r("user-data").value.usuario_id),Y=l((B=r("user-service").value)==null?void 0:B.token).value||null,Z=l(r("user-data").value.cartorio_token).value,D=l((T=r("user-service").value)==null?void 0:T.numero),h=l((P=r("user-service").value)==null?void 0:P.isDisabled);let E=l(!!((q=r("user-service").value)!=null&&q.numero)),C=l(r("ordem-button").value),x=!1;const $=l(!1),w=l([]),s=_e({nacionalidade:((F=r("user-service").value)==null?void 0:F.estrangeiro)||!1,apresentante_nome:(I=r("user-service").value)==null?void 0:I.apresentante_nome,apresentante_cpf:(z=r("user-service").value)==null?void 0:z.apresentante_cpf}),v=l(!1),ee=[{title:"ID",value:"id"},{title:"Protocolo",value:"protocolo"},{title:"Usuario",value:"usuario_nome"},{title:"Situação",value:"situacao"},{title:"Valor",value:"valor"},{title:"Tipo",value:"tipo"},{value:"actions"}],ae=[{title:"BRASILEIRO",value:!1},{title:"ESTRANGEIRO",value:!0}],te={apresentante_nome:{required:G.withMessage("O campo é obrigatorio",H)},apresentante_cpf:{required:G.withMessage("O campo é obrigatorio",H)}},c=Re(te,s);function N(o){if(o)return o.replace(/[.\-]/g,"");o=null}const oe=o=>{o.tipo==="PROCURAÇÃO"&&J.push({path:`/fontes/atos/procuracoes/atualizar/${o.id}`,query:{origem:"atualizar",id:r("user-service").value.id,ato_id:o.id,ato_token_edit:o.token,numero_os:numeroOs}})};function re(){const o=r("user-service"),t=r("ordem-button");o.value=null,t.value=null}const se=()=>{$.value=!0};async function ie(){const o={apresentante_cpf:N(s.apresentante_cpf),apresentante_nome:s.apresentante_nome,user_id:Q.value,cartorio_id:K.value,estrangeiro:s.nacionalidade};if(await c.value.$validate()){const{data:t,error:m,status:d}=await S(j,{method:"POST",body:o},"$HqnOwnLBio");if(d.value==="error"&&m.value.statusCode===500)_.error("Erro ao cadastrar ordem,erro no sistema.");else{_.success("Ordem registrada com sucesso!"),E.value=!0,C.value=!1,D.value=t.value.numero;const f=r("ordem-button");f.value=C.value;const e=r("user-service");e.value=e.value=JSON.stringify({numero:t.value.numero,id:t.value.id,apresentante_cpf:t.value.apresentante_cpf,apresentante_nome:t.value.apresentante_nome,estrangeiro:t.value.estrangeiro,token:t.value.token,isDisabled:!0}),v.value=!0}}}async function ne(o){const t=N(o);if(t.length===11&&!x){x=!0;const m={cpf:t};try{const{data:d,error:f,status:e}=await S(W,{method:"POST",body:m},"$DfuVr7OuaN");e.value==="error"&&f.value.statusCode===500?_.error("Erro ao cadastrar pessoa, o CPF já está cadastrado."):d.value.cpfValidation===!0?(s.apresentante_nome=d.value.nome,_.success("Cpf autenticado com sucesso!")):d.value.cpfValidation===!1&&_.error("Cpf não cadastrado!")}catch(d){console.error("Erro ao validar CPF:",d)}finally{x=!1}}}const{data:A}=([b,R]=ve(()=>S(X,{method:"POST",body:{cartorio_token:Z,ordemserv_token:Y}},"$bJ1XcDsWLH")),b=await b,R(),b);return A.value.length>0?w.value=A.value:w.value=[],(o,t)=>{const m=le,d=de,f=ge("mask");return p(),g(De,{class:"mt-5"},{default:i(()=>[n(k,{class:"mb-5"},{default:i(()=>{var e;return[Ne,u("h1",Ae,be(a(D)||((e=("useCookie"in o?o.useCookie:a(r))("user-service").value)==null?void 0:e.numero)),1)]}),_:1}),n(k,null,{default:i(()=>[n(V,{md:"3"},{default:i(()=>[n(Ee,{label:"Nacionalidade",items:ae,modelValue:a(s).nacionalidade,"onUpdate:modelValue":t[0]||(t[0]=e=>a(s).nacionalidade=e),disabled:a(h)||a(v)},null,8,["modelValue","disabled"])]),_:1}),n(V,{md:"2"},{default:i(()=>[a(s).nacionalidade===!1?he((p(),g(O,{key:0,autofocus:"",modelValue:a(s).apresentante_cpf,"onUpdate:modelValue":t[1]||(t[1]=e=>a(s).apresentante_cpf=e),label:"CPF",required:"","error-messages":a(c).apresentante_cpf.$errors.map(e=>e.$message),onBlur:a(c).apresentante_cpf.$touch,onInput:t[2]||(t[2]=e=>ne(a(s).apresentante_cpf)),disabled:a(h)||a(v)},null,8,["modelValue","error-messages","onBlur","disabled"])),[[f,"###.###.###-##"]]):(p(),g(O,{key:1,autofocus:"",modelValue:a(s).apresentante_cpf,"onUpdate:modelValue":t[3]||(t[3]=e=>a(s).apresentante_cpf=e),label:"Documento",required:"","error-messages":a(c).apresentante_cpf.$errors.map(e=>e.$message),onBlur:a(c).apresentante_cpf.$touch,disabled:a(h)||a(v)},null,8,["modelValue","error-messages","onBlur","disabled"]))]),_:1}),n(V,{md:"4"},{default:i(()=>[n(O,{modelValue:a(s).apresentante_nome,"onUpdate:modelValue":t[4]||(t[4]=e=>a(s).apresentante_nome=e),label:"Nome Apresentante",required:"","error-messages":a(c).apresentante_nome.$errors.map(e=>e.$message),onInput:a(c).apresentante_nome.$touch,disabled:a(h)||a(v)},null,8,["modelValue","error-messages","onInput","disabled"])]),_:1}),a(C)?(p(),g(V,{key:0},{default:i(()=>[u("div",null,[u("img",{style:{width:"40px",height:"40px",cursor:"pointer"},src:ue,alt:"Salvar",onClick:t[5]||(t[5]=e=>ie())})])]),_:1})):M("",!0)]),_:1}),a(E)?(p(),g(k,{key:0,style:{display:"flex","margin-bottom":"10px",gap:"2rem"}},{default:i(()=>[Be,n(m,{to:{path:"/os/criar-ato",query:{origem:"criar"}}},{default:i(()=>[Te]),_:1}),n($e,{headers:ee,items:a(w),"item-key":"id"},{"item.actions":i(({item:e})=>[n(k,{style:{display:"flex",gap:"10px","margin-top":"-5px"}},{default:i(()=>[u("div",{onClick:t[6]||(t[6]=U=>se()),title:"Reimprimir"},qe),u("div",{class:Ve({disabled:!e.btn_editar}),onClick:U=>e.btn_editar?oe({id:e.id,tipo:e.tipo,token:e.token}):null,title:e.btn_editar?"Editar":"Desabilitado"},[u("img",{style:ke({cursor:e.btn_editar?"pointer":"default",width:"30px",height:"30px"}),src:xe,alt:"Editar"},null,4)],10,Fe),u("div",{disabled:!e.btn_cancelar,onClick:U=>e.btn_cancelar?o.deleteEndereco(e):null,title:"Excluir"},[e.excluido?(p(),L("img",ze)):(p(),L("img",Ue))],8,Ie)]),_:2},1024)]),_:1},8,["items"]),n(d,{show:a($),onClose:t[7]||(t[7]=e=>$.value=!1)},null,8,["show"])]),_:1})):M("",!0),n(m,{to:"/os/lista"},{default:i(()=>[n(ye,{size:"large",color:"red",onClick:re},{default:i(()=>[Ce("Voltar")]),_:1})]),_:1})]),_:1})}}};export{sa as default};