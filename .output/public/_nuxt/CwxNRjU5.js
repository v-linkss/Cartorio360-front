import{_ as ae}from"./Rp0T3DE9.js";import{_ as oe,u as te,n as se,D as q,r as A,F as Y,G as le,H as de,o as n,c as j,q as e,A as u,P as ie,t as ne,C as c,w as o,b as a,s as p,I as h,a as B,O as re,x as ue,p as me,e as ce,d as k,v as J}from"./Dn5CQgu_.js";import{a as pe,u as X}from"./lJVKA2VC.js";import{_ as _e}from"./ToPptOUL.js";import{c as O,r as z,u as fe,V as D,_ as Ve}from"./vOr1iifR.js";import{c as ve}from"./B3rMAqz3.js";import{V as g}from"./BQariJtQ.js";import{V as r}from"./BeKc_fSP.js";import{V as Z}from"./BhXv_H2M.js";import{V as F,a as be,b as w,c as Ce,_ as ge,d as $e,e as ye,f as Ie}from"./m3mfM0YE.js";import{a as xe}from"./DbDoFw-K.js";import"./BUe_X6z7.js";import"./CrE-eFFQ.js";import"./qu7Wfn_m.js";const ke=$=>(me("data-v-72971175"),$=$(),ce(),$),Fe={key:1},we=ke(()=>B("img",{class:"btn-pointer",src:_e,alt:"Sair"},null,-1)),Pe={__name:"Dados",emits:["saved"],async setup($,{emit:_}){let i,y;const L=_,P=te(),{$toast:C}=se(),b=ue(),W=`${b.public.managemant}/createPessoa`,f=`${b.public.managemant}/updatePessoa`,N=`${b.public.managemant}/listarEstadoCivil`,R=`${b.public.managemant}/listarCapacidadeCivil`,T=`${b.public.managemant}/listarCidades`,E={nome:"",nome_pai:"",nome_mae:"",profissao:"",local_trabalho:"",data_nascimento:"",doc_identificacao:"",cpf_pai:"",cpf_mae:"",tipo_pessoa:"FISICA",tabvalores_estadocivil_id:"",tabvalores_capacidadecivil_id:"",cidade_natural_id:"",cartorio_id:q("user-data").value.cartorio_id,user_id:q("user-data").value.usuario_id},U=A(!1),V=q("pessoa-id"),t=Y({...E});function I(d){if(d)return d.replace(/[.\-]/g,"");d=null}const{data:M,status:De,pending:G,error:H}=([i,y]=le(async()=>pe("cliente-dados",async()=>{const[d,s,v]=await Promise.all([$fetch(N),$fetch(R),$fetch(T)]);return{estadoCivilItems:d,capacidadeCivilItems:s,cidadeNascimentoItems:v}})),i=await i,y(),i),K={nome:{required:O.withMessage("O campo é obrigatorio",z)},nome_mae:{required:O.withMessage("O campo é obrigatorio",z)},doc_identificacao:{required:O.withMessage("O campo é obrigatorio",z),cpf:ve}},m=fe(K,t);async function Q(){if(await m.value.$validate()){const d={...t};for(const S in d)d[S]===""&&(d[S]=null);const s={...d,doc_identificacao:I(t.doc_identificacao),cpf_pai:I(t.cpf_pai),cpf_mae:I(t.cpf_mae)},{data:v,error:x,status:l}=await X(W,{method:"POST",body:s},"$fcbWHpl5XR");if(l.value==="error"&&x.value.statusCode===500)C.error("Erro ao cadastrar pessoa,o CPF já está cadastrado.");else{C.success("Pessoa cadastrada com sucesso!");const S=v.value.id;V.value=S,L("saved"),U.value=!0}}else C.error("Erro ao cadastrar pessoa, preencha os campos obrigatorios.")}async function ee(){const d={...t};for(const v in d)d[v]===""&&(d[v]=null);const s={...d,doc_identificacao:I(t.doc_identificacao),cpf_mae:I(t.cpf_mae)};await X(`${f}/${V.value}`,{method:"PUT",body:s},"$S30ZRYxneo"),C.success("Pessoa atualizada com sucesso!"),P.push("/pessoas/registros")}return(d,s)=>{const v=ae,x=de("mask");return n(),j(re,null,[e(G)?(n(),u(ie,{key:0,class:"loading-spinner",indeterminate:"",size:"64"})):e(H)?(n(),j("div",Fe,ne(e(H).message),1)):c("",!0),e(G)?c("",!0):(n(),u(Z,{key:2,class:"mt-5"},{default:o(()=>[a(g,null,{default:o(()=>[a(r,{cols:"12",md:"8"},{default:o(()=>[a(p,{modelValue:e(t).nome,"onUpdate:modelValue":s[0]||(s[0]=l=>e(t).nome=l),"error-messages":e(m).nome.$errors.map(l=>l.$message),label:"Nome",required:"",onBlur:e(m).nome.$touch,onInput:e(m).nome.$touch},null,8,["modelValue","error-messages","onBlur","onInput"])]),_:1}),a(r,{cols:"12",md:"4"},{default:o(()=>[h(a(p,{modelValue:e(t).doc_identificacao,"onUpdate:modelValue":s[1]||(s[1]=l=>e(t).doc_identificacao=l),"error-messages":e(m).doc_identificacao.$errors.map(l=>l.$message),label:"CPF",required:"",onBlur:e(m).doc_identificacao.$touch,onInput:e(m).doc_identificacao.$touch},null,8,["modelValue","error-messages","onBlur","onInput"]),[[x,"###.###.###-##"]])]),_:1})]),_:1}),a(g,null,{default:o(()=>[a(r,{cols:"12",md:"4"},{default:o(()=>[a(D,{modelValue:e(t).tabvalores_estadocivil_id,"onUpdate:modelValue":s[2]||(s[2]=l=>e(t).tabvalores_estadocivil_id=l),items:e(M).estadoCivilItems,"item-title":"descricao","item-value":"id",label:"Estado Civil"},null,8,["modelValue","items"])]),_:1}),a(r,{cols:"12",md:"4"},{default:o(()=>[a(p,{modelValue:e(t).profissao,"onUpdate:modelValue":s[3]||(s[3]=l=>e(t).profissao=l),label:"Profissão"},null,8,["modelValue"])]),_:1}),a(r,{cols:"12",md:"4"},{default:o(()=>[a(p,{modelValue:e(t).local_trabalho,"onUpdate:modelValue":s[4]||(s[4]=l=>e(t).local_trabalho=l),label:"Local de trabalho"},null,8,["modelValue"])]),_:1})]),_:1}),a(g,null,{default:o(()=>[a(r,{cols:"12",md:"4"},{default:o(()=>[a(p,{modelValue:e(t).data_nascimento,"onUpdate:modelValue":s[5]||(s[5]=l=>e(t).data_nascimento=l),type:"date","prepend-icon":"",label:"Data de nascimento"},null,8,["modelValue"])]),_:1}),a(r,{cols:"12",md:"4"},{default:o(()=>[a(D,{modelValue:e(t).tabvalores_capacidadecivil_id,"onUpdate:modelValue":s[6]||(s[6]=l=>e(t).tabvalores_capacidadecivil_id=l),items:e(M).capacidadeCivilItems,label:"Capacidade Civil","item-title":"descricao","item-value":"id"},null,8,["modelValue","items"])]),_:1}),a(r,{cols:"12",md:"4"},{default:o(()=>[a(D,{modelValue:e(t).cidade_natural_id,"onUpdate:modelValue":s[7]||(s[7]=l=>e(t).cidade_natural_id=l),items:e(M).cidadeNascimentoItems,label:"Cidade de nascimento","item-title":"descricao","item-value":"id"},null,8,["modelValue","items"])]),_:1})]),_:1}),a(g,null,{default:o(()=>[a(r,{cols:"12",md:"4"},{default:o(()=>[h(a(p,{modelValue:e(t).cpf_pai,"onUpdate:modelValue":s[8]||(s[8]=l=>e(t).cpf_pai=l),modelModifiers:{date:!0},label:"CPF do Pai"},null,8,["modelValue"]),[[x,"###.###.###-##"]])]),_:1}),a(r,{cols:"12",md:"4"},{default:o(()=>[a(p,{modelValue:e(t).nome_pai,"onUpdate:modelValue":s[9]||(s[9]=l=>e(t).nome_pai=l),modelModifiers:{date:!0},label:"Nome do Pai"},null,8,["modelValue"])]),_:1})]),_:1}),a(g,null,{default:o(()=>[a(r,{cols:"12",md:"4"},{default:o(()=>[h(a(p,{modelValue:e(t).cpf_mae,"onUpdate:modelValue":s[10]||(s[10]=l=>e(t).cpf_mae=l),modelModifiers:{date:!0},label:"CPF da Mãe"},null,8,["modelValue"]),[[x,"###.###.###-##"]])]),_:1}),a(r,{cols:"12",md:"4"},{default:o(()=>[a(p,{modelValue:e(t).nome_mae,"onUpdate:modelValue":s[11]||(s[11]=l=>e(t).nome_mae=l),modelModifiers:{date:!0},"error-messages":e(m).nome_mae.$errors.map(l=>l.$message),label:"Nome da Mãe",required:"",onBlur:e(m).nome_mae.$touch,onInput:e(m).nome_mae.$touch},null,8,["modelValue","error-messages","onBlur","onInput"])]),_:1})]),_:1}),a(g,null,{default:o(()=>[a(v,{to:"/pessoas/registros"},{default:o(()=>[we]),_:1}),B("img",{class:"btn-pointer",src:Ve,onClick:s[12]||(s[12]=l=>e(U)?ee():Q())})]),_:1})]),_:1}))],64)}}},Ue=oe(Pe,[["__scopeId","data-v-72971175"]]),Se=B("h1",{style:{"background-color":"#C8FCCA",color:"#429946",padding:"10px 0px 0px 20px"}}," Cadastramento de pessoas ",-1),Ae={style:{"background-color":"#C8FCCA",padding:"20px 0px 20px 20px"}},je={__name:"index",setup($){const _=A(null),i=A(!1),y=A(!1),P=Y({...{tipo_pessoa:"FISICA"}}),C=["FISICA","JURIDICA","ESTRANGEIRA"],b=()=>{i.value=!0,y.value=!0};return(W,f)=>{const N=Ue,R=ge,T=$e,E=ye,U=Ie;return n(),u(xe,{width:"1300"},{default:o(()=>[Se,B("div",Ae,[a(D,{modelValue:e(P).tipo_pessoa,"onUpdate:modelValue":f[0]||(f[0]=V=>e(P).tipo_pessoa=V),style:{width:"200px"},items:C,label:"Tipo de pessoa","bg-color":"#F6F6F6",disabled:e(y)},null,8,["modelValue","disabled"])]),a(be,{modelValue:e(_),"onUpdate:modelValue":f[1]||(f[1]=V=>J(_)?_.value=V:null),"bg-color":"#C8FCCA"},{default:o(()=>[a(F,{value:"dados"},{default:o(()=>[k("Dados")]),_:1}),e(i)?(n(),u(F,{key:0,value:"documento"},{default:o(()=>[k("Documentos")]),_:1})):c("",!0),e(i)?(n(),u(F,{key:1,value:"endereco"},{default:o(()=>[k("Endereços")]),_:1})):c("",!0),e(i)?(n(),u(F,{key:2,value:"biometria"},{default:o(()=>[k("Biometria")]),_:1})):c("",!0),e(i)?(n(),u(F,{key:3,value:"restricao"},{default:o(()=>[k("Restrições")]),_:1})):c("",!0)]),_:1},8,["modelValue"]),a(Ce,{modelValue:e(_),"onUpdate:modelValue":f[2]||(f[2]=V=>J(_)?_.value=V:null)},{default:o(()=>[a(w,{value:"dados"},{default:o(()=>[a(N,{onSaved:b})]),_:1}),e(i)?(n(),u(w,{key:0,value:"documento"},{default:o(()=>[a(R)]),_:1})):c("",!0),e(i)?(n(),u(w,{key:1,value:"endereco"},{default:o(()=>[a(T)]),_:1})):c("",!0),e(i)?(n(),u(w,{key:2,value:"biometria"},{default:o(()=>[a(Z,{class:"mt-5"},{default:o(()=>[a(E)]),_:1})]),_:1})):c("",!0),e(i)?(n(),u(w,{key:3,value:"restricao"},{default:o(()=>[a(U)]),_:1})):c("",!0)]),_:1},8,["modelValue"])]),_:1})}}};export{je as default};