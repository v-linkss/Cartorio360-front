import{_ as W}from"./yJVovkFZ.js";import{_ as X,a as Y}from"./ByMZnXHd.js";import{n as ee,E as te,u as ae,r as u,D as f,F as oe,G as S,H as se,o as c,A as k,w as r,x as re,b as s,a as n,t as ne,q as t,I as le,s as V,J as ie,K as ue,L as de,c as B}from"./DqpMzQgU.js";import{u as w}from"./BBHpzKVI.js";import{c as A,r as I,u as ce,V as pe,_ as me}from"./Bj-JFbqH.js";import{_ as _e,a as fe}from"./CrE-eFFQ.js";import{_ as ve,a as ge}from"./qu7Wfn_m.js";import{_ as he}from"./ToPptOUL.js";import{V as $e}from"./Dz8Jum05.js";import{V as v}from"./ChZts2m6.js";import{V as g}from"./guoWSuJ1.js";import"./mbpUFOYa.js";const xe=n("h1",null,"Ordem de Serviço nº",-1),ye={style:{color:"red","margin-left":"30px"}},be=n("h1",{class:"ml-5"},"Atos",-1),ke=n("img",{style:{width:"45px",height:"45px",cursor:"pointer"},src:_e,alt:"novo"},null,-1),Ve=["onClick"],we=n("img",{style:{width:"30px",height:"30px",cursor:"pointer"},src:Y,alt:"Reimprimir"},null,-1),Ce=[we],Oe=["onClick","title"],Re=["disabled","onClick"],Ee={key:0,style:{width:"30px",height:"30px",cursor:"pointer"},src:ge,alt:"Visualizar",title:"Reativar"},Se={key:1,src:fe,alt:"Excluir",class:"trash-icon",style:{width:"30px",height:"30px",cursor:"pointer"},title:"Excluir"},Be=n("img",{class:"btn-pointer mt-5",src:he,alt:"Sair"},null,-1),Le={__name:"[id]",async setup(Ae){let i,p;const{$toast:C}=ee(),T=te(),{id:h}=T.params,U=ae(),$=re(),q=`${$.public.managemant}/updateOrdensServico`,D=`${$.public.managemant}/getOrdensServicoById`,F=`${$.public.managemant}/listarAtos`,N=u(f("user-data").value.cartorio_id),P=u(f("user-data").value.usuario_id),z=u(f("user-service").value).value||null,G=u(f("user-data").value.cartorio_token).value,x=u([]),y=u(!1),O=u(null),b=u(null),a=oe({nacionalidade:"brasileiro",apresentante_nome:null,apresentante_cpf:null,documento:null}),M=[{title:"Protocolo",value:"protocolo"},{title:"Usuario",value:"usuario_nome"},{title:"Situação",value:"situacao"},{title:"Valor",value:"valor"},{title:"Tipo",value:"tipo"},{value:"actions"}],K=[{title:"BRASILEIRO",value:!1},{title:"ESTRANGEIRO",value:!0}],L={apresentante_nome:{required:A.withMessage("O campo é obrigatorio",I)},apresentante_cpf:{required:A.withMessage("O campo é obrigatorio",I)}},d=ce(L,a);function Q(l){if(l)return l.replace(/[.\-]/g,"");l=null}const H=l=>{O.value=l,y.value=!0};async function J(){const l={apresentante_cpf:Q(a.apresentante_cpf),apresentante_nome:a.apresentante_nome,user_id:P.value,cartorio_id:N.value},{error:o,status:_}=await w(`${q}/${h}`,{method:"PUT",body:l},"$K99ffdcGQC");_.value==="error"&&o.value.statusCode===500?C.error("Erro ao cadastrar ordem,erro no sistema."):(C.success("Ordem Atualizada com sucesso!"),U.push({path:"/ordens-servicos"}))}const{data:m}=([i,p]=S(()=>w(`${D}/${h}`,{method:"GET"},"$Q22OaB87ZU")),i=await i,p(),i);b.value=m.value.numero,a.nacionalidade=m.value.estrangeiro,a.apresentante_cpf=m.value.apresentante_cpf,a.apresentante_nome=m.value.apresentante_nome;const{data:R}=([i,p]=S(()=>w(F,{method:"POST",body:{cartorio_token:G,ordemserv_token:z}},"$Fci2yt5KvV")),i=await i,p(),i);return R.value.length>0?x.value=R.value:x.value=[],(l,o)=>{const _=W,Z=X,j=se("mask");return c(),k($e,{class:"mt-5"},{default:r(()=>[s(v,{class:"mb-5"},{default:r(()=>[xe,n("h1",ye,ne(t(b)),1)]),_:1}),s(v,null,{default:r(()=>[s(g,{md:"3"},{default:r(()=>[s(pe,{label:"Nacionalidade",items:K,modelValue:t(a).nacionalidade,"onUpdate:modelValue":o[0]||(o[0]=e=>t(a).nacionalidade=e)},null,8,["modelValue"])]),_:1}),s(g,{md:"2"},{default:r(()=>[t(a).nacionalidade==="brasileiro"?le((c(),k(V,{key:0,autofocus:"",modelValue:t(a).apresentante_cpf,"onUpdate:modelValue":o[1]||(o[1]=e=>t(a).apresentante_cpf=e),label:"CPF",required:"","error-messages":t(d).apresentante_cpf.$errors.map(e=>e.$message),onBlur:t(d).apresentante_cpf.$touch,onInput:t(d).apresentante_cpf.$touch},null,8,["modelValue","error-messages","onBlur","onInput"])),[[j,"###.###.###-##"]]):(c(),k(V,{key:1,autofocus:"",modelValue:t(a).apresentante_cpf,"onUpdate:modelValue":o[2]||(o[2]=e=>t(a).apresentante_cpf=e),label:"Documento",required:"","error-messages":t(d).apresentante_cpf.$errors.map(e=>e.$message),onBlur:t(d).apresentante_cpf.$touch},null,8,["modelValue","error-messages","onBlur"]))]),_:1}),s(g,{md:"4"},{default:r(()=>[s(V,{modelValue:t(a).apresentante_nome,"onUpdate:modelValue":o[3]||(o[3]=e=>t(a).apresentante_nome=e),label:"Nome Apresentante",required:"","error-messages":t(d).apresentante_nome.$errors.map(e=>e.$message),onInput:t(d).apresentante_nome.$touch},null,8,["modelValue","error-messages","onInput"])]),_:1}),s(g,null,{default:r(()=>[n("div",null,[n("img",{style:{width:"40px",height:"40px",cursor:"pointer"},src:me,alt:"Salvar",onClick:o[4]||(o[4]=e=>J())})])]),_:1})]),_:1}),s(v,{style:{display:"flex","margin-bottom":"10px",gap:"2rem"}},{default:r(()=>[be,s(_,{to:{path:"/ordens-servicos/criar-ato",query:{origem:"atualizar",id:t(h),numeroOs:t(b)}}},{default:r(()=>[ke]),_:1},8,["to"]),s(ie,{headers:M,items:t(x),"item-key":"id"},{"item.actions":r(({item:e})=>[s(v,{style:{display:"flex",gap:"10px","margin-top":"-5px"}},{default:r(()=>[n("div",{onClick:E=>H(e.token),title:"Reimprimir"},Ce,8,Ve),n("div",{class:de({disabled:!e.btn_editar}),onClick:E=>e.btn_editar?l.redirectToUpdate(e.id):null,title:e.btn_editar?"Editar":"Desabilitado"},[n("img",{style:ue({cursor:e.btn_editar?"pointer":"default",width:"30px",height:"30px"}),src:ve,alt:"Editar"},null,4)],10,Oe),n("div",{disabled:!e.btn_cancelar,onClick:E=>e.btn_cancelar?l.deleteEndereco(e):null,title:"Excluir"},[e.excluido?(c(),B("img",Ee)):(c(),B("img",Se))],8,Re)]),_:2},1024)]),_:1},8,["items"]),s(Z,{show:t(y),ato_token:t(O),onClose:o[5]||(o[5]=e=>y.value=!1)},null,8,["show","ato_token"])]),_:1}),s(_,{to:"/ordens-servicos"},{default:r(()=>[Be]),_:1})]),_:1})}}};export{Le as default};