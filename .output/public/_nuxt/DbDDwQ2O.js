import{_ as H}from"./DSqHEtss.js";import{n as J,E as Z,u as j,r as d,D as _,F as W,G as B,o as c,A as x,w as s,x as X,H as Y,b as o,a as r,t as ee,q as t,I as te,s as y,J as ae,K as oe,L as se,c as R}from"./j1uFeTuL.js";import{u as V}from"./DW-1i10V.js";import{c as S,r as A,u as re,_ as ne}from"./CDN0-eFS.js";import{_ as le,a as ie,b as ue,c as de}from"./CBYd86re.js";import{_ as ce}from"./9u6dNgKD.js";import{_ as pe}from"./ToPptOUL.js";import{V as me}from"./BSuZRSV0.js";import{V as f}from"./CE29Pb3h.js";import{V as v}from"./D7VFokNi.js";import{V as _e}from"./CHrGFEw2.js";const fe=r("h1",null,"Ordem de Serviço nº",-1),ve={style:{color:"red","margin-left":"30px"}},ge=r("h1",{class:"ml-5"},"Atos",-1),he=r("img",{style:{width:"45px",height:"45px",cursor:"pointer"},src:ie,alt:"novo"},null,-1),be=["onClick"],$e=r("img",{style:{width:"30px",height:"30px",cursor:"pointer"},src:ce,alt:"Receber"},null,-1),xe=[$e],ye=["onClick","title"],Ve=["disabled","onClick"],ke={key:0,style:{width:"30px",height:"30px",cursor:"pointer"},src:ue,alt:"Visualizar",title:"Reativar"},we={key:1,src:de,alt:"Excluir",class:"trash-icon",style:{width:"30px",height:"30px",cursor:"pointer"},title:"Excluir"},Ce=r("img",{class:"btn-pointer mt-5",src:pe,alt:"Sair"},null,-1),Ne={__name:"[id]",async setup(Oe){let i,p;const{$toast:k}=J(),I=Z(),{id:w}=I.params,U=j(),g=X(),T=`${g.public.managemant}/updateOrdensServico`,q=`${g.public.managemant}/getOrdensServicoById`,D=`${g.public.managemant}/listarAtos`,F=d(_("user-data").value.cartorio_id),N=d(_("user-data").value.usuario_id),P=d(_("user-service").value).value||null,z=d(_("user-data").value.cartorio_token).value,h=d([]),C=d(null),a=W({nacionalidade:"brasileiro",apresentante_nome:null,apresentante_cpf:null,documento:null}),G=[{title:"Protocolo",value:"protocolo"},{title:"Usuario",value:"usuario_nome"},{title:"Situação",value:"situacao"},{title:"Valor",value:"valor"},{title:"Tipo",value:"tipo"},{value:"actions"}],K=[{title:"BRASILEIRO",value:"brasileiro"},{title:"ESTRANGEIRO",value:"estrangeiro"}],L={apresentante_nome:{required:S.withMessage("O campo é obrigatorio",A)},apresentante_cpf:{required:S.withMessage("O campo é obrigatorio",A)}},u=re(L,a);function M(l){if(l)return l.replace(/[.\-]/g,"");l=null}async function Q(){const l={apresentante_cpf:M(a.apresentante_cpf),apresentante_nome:a.apresentante_nome,user_id:N.value,cartorio_id:F.value};if(await u.value.$validate()){const{data:n,error:m,status:$}=await V(`${T}/${w}`,{method:"PUT",body:l},"$K99ffdcGQC");$.value==="error"&&m.value.statusCode===500?k.error("Erro ao cadastrar ordem,erro no sistema."):(k.success("Ordem Atualizada com sucesso!"),U.push({path:"/ordens-servicos"}))}}const{data:b}=([i,p]=B(()=>V(`${q}/${w}`,{method:"GET"},"$Q22OaB87ZU")),i=await i,p(),i);C.value=b.value.numero,a.apresentante_cpf=b.value.apresentante_cpf,a.apresentante_nome=b.value.apresentante_nome;const{data:O}=([i,p]=B(()=>V(D,{method:"POST",body:{cartorio_token:z,ordemserv_token:P}},"$Fci2yt5KvV")),i=await i,p(),i);return O.value.length>0?h.value=O.value:h.value=[],(l,n)=>{const m=H,$=Y("mask");return c(),x(me,{class:"mt-5"},{default:s(()=>[o(f,{class:"mb-5"},{default:s(()=>[fe,r("h1",ve,ee(t(C)),1)]),_:1}),o(f,null,{default:s(()=>[o(v,{md:"3"},{default:s(()=>[o(_e,{label:"Nacionalidade",items:K,modelValue:t(a).nacionalidade,"onUpdate:modelValue":n[0]||(n[0]=e=>t(a).nacionalidade=e)},null,8,["modelValue"])]),_:1}),o(v,{md:"2"},{default:s(()=>[t(a).nacionalidade==="brasileiro"?te((c(),x(y,{key:0,autofocus:"",modelValue:t(a).apresentante_cpf,"onUpdate:modelValue":n[1]||(n[1]=e=>t(a).apresentante_cpf=e),label:"CPF",required:"","error-messages":t(u).apresentante_cpf.$errors.map(e=>e.$message),onBlur:t(u).apresentante_cpf.$touch,onInput:t(u).apresentante_cpf.$touch},null,8,["modelValue","error-messages","onBlur","onInput"])),[[$,"###.###.###-##"]]):(c(),x(y,{key:1,autofocus:"",modelValue:t(a).apresentante_cpf,"onUpdate:modelValue":n[2]||(n[2]=e=>t(a).apresentante_cpf=e),label:"Documento",required:"","error-messages":t(u).apresentante_cpf.$errors.map(e=>e.$message),onBlur:t(u).apresentante_cpf.$touch},null,8,["modelValue","error-messages","onBlur"]))]),_:1}),o(v,{md:"4"},{default:s(()=>[o(y,{modelValue:t(a).apresentante_nome,"onUpdate:modelValue":n[3]||(n[3]=e=>t(a).apresentante_nome=e),label:"Nome Apresentante",required:"","error-messages":t(u).apresentante_nome.$errors.map(e=>e.$message),onInput:t(u).apresentante_nome.$touch},null,8,["modelValue","error-messages","onInput"])]),_:1}),o(v,null,{default:s(()=>[r("div",null,[r("img",{style:{width:"40px",height:"40px",cursor:"pointer"},src:ne,alt:"Salvar",onClick:n[4]||(n[4]=e=>Q())})])]),_:1})]),_:1}),o(f,{style:{display:"flex","margin-bottom":"10px",gap:"2rem"}},{default:s(()=>[ge,o(m,{to:"/ordens-servicos/criar-ato"},{default:s(()=>[he]),_:1}),o(ae,{headers:G,items:t(h),"item-key":"id"},{"item.actions":s(({item:e})=>[o(f,{style:{display:"flex",gap:"10px","margin-top":"-5px"}},{default:s(()=>[r("div",{onClick:E=>l.redirectToUpdate(e.id),title:"Receber"},xe,8,be),r("div",{class:se({disabled:!e.btn_editar}),onClick:E=>e.btn_editar?l.redirectToUpdate(e.id):null,title:e.btn_editar?"Editar":"Desabilitado"},[r("img",{style:oe({cursor:e.btn_editar?"pointer":"default",width:"30px",height:"30px"}),src:le,alt:"Editar"},null,4)],10,ye),r("div",{disabled:!e.btn_cancelar,onClick:E=>e.btn_cancelar?l.deleteEndereco(e):null,title:"Excluir"},[e.excluido?(c(),R("img",ke)):(c(),R("img",we))],8,Ve)]),_:2},1024)]),_:1},8,["items"])]),_:1}),o(m,{to:"/ordens-servicos"},{default:s(()=>[Ce]),_:1})]),_:1})}}};export{Ne as default};