import{_ as ee}from"./DjgEsiay.js";import{a as _,V as ae,c as f,b as oe,d as te,e as le,f as se,g as de,h as ie,i as ne}from"./amHTH2OA.js";import{_ as ue,r as C,n as me,u as re,q as ce,A as x,s as pe,E as _e,o as u,v as r,w as l,z as fe,M as Ve,a as D,t as ve,x as a,b as e,c as N,F as be,d as c,G as V,C as S,V as m,N as $,y as E}from"./DEikABjm.js";import{u as Ce}from"./BXaguRPR.js";import{u as Ie}from"./D_RDeQ3U.js";import{a as ge}from"./BL6mdXsd.js";import{V as U}from"./DJR5Kekk.js";import{V as w}from"./B50rMhix.js";import{V as v}from"./FcAL8Eew.js";import{V as n}from"./BL_dJUne.js";import"./DK_vSCQY.js";import"./DfjuBLsA.js";import"./DCFVEE-h.js";import"./DQIbkNFL.js";import"./DcTGL1LI.js";import"./CZQ3-YOl.js";import"./Cnu1vHCn.js";import"./Bj0P96uG.js";const Ue={style:{"background-color":"#f5f2f2",color:"#525050",padding:"10px 0px 0px 20px"}},ke={style:{"background-color":"#f5f2f2",padding:"20px 0px 20px 20px"}},ye={key:0,class:"d-flex justify-center"},Ae={key:1},xe={__name:"[id]",emits:["saved"],setup($e,{emit:Fe}){const p=C(null),T=me(),{$toast:B}=re(),M=ce(),{id:I}=M.params,b=fe(),J=`${b.public.managemant}/updatePessoa`,z=`${b.public.managemant}/listarEstadoCivil`,G=`${b.public.managemant}/listarCapacidadeCivil`,j=`${b.public.managemant}/listarCidades`,L=`${b.public.managemant}/getPessoaById`,F=C([]),P=C([]),R=C([]),k=C(!0),W={nome:"",nome_pai:"",nome_mae:"",profissao:"",data_nascimento:"",doc_identificacao:"",cpf_pai:"",cpf_mae:"",tipo_pessoa:"FISICA",tabvalores_estadocivil_id:"",tabvalores_capacidadecivil_id:"",cidade_natural_id:"",cartorio_id:x("user-data").value.cartorio_id,user_id:x("user-data").value.usuario_id},q=[{label:"FÍSICA",value:"FISICA"},{label:"JURÍDICA",value:"JURIDICA"},{label:"ESTRANGEIRA",value:"ESTRANGEIRA"}],t=pe({...W});function O(d){if(d)return d.replace(/[.\-]/g,"");d=null}Ie(t);async function H(){try{const[d,o,i,g]=await Promise.all([$fetch(z),$fetch(G),$fetch(j),$fetch(`${L}/${I}`)]),y=x("pessoa_token");y.value=g.token,F.value=d,P.value=o,R.value=i,Object.assign(t,g)}catch(d){console.error("Erro ao carregar os dados da pessoa:",d)}finally{k.value=!1}}_e(()=>{I?H():k.value=!1});function K(d){const o={};for(const i in d)d[i]===""?o[i]=null:i==="doc_identificacao"||i==="cpf_pai"||i==="cpf_mae"?o[i]=O(d[i]):o[i]=d[i];return o}async function Q(){const d=K(t);await Ce(`${J}/${I}`,{method:"PUT",body:d},"$NdF8Uiv290"),B.success("Pessoa atualizada com sucesso!"),T.push("/pessoas/lista")}return(d,o)=>{const i=ee,g=te,y=le,X=se,Y=de,Z=ie,h=ne,A=Ve("mask");return u(),r(ge,{width:"1300"},{default:l(()=>[D("h1",Ue,ve(a(I)?"Atualização de Pessoas":"Cadastramento de Pessoas"),1),D("div",ke,[e(U,{modelValue:a(t).tipo_pessoa,"onUpdate:modelValue":o[0]||(o[0]=s=>a(t).tipo_pessoa=s),style:{width:"200px"},items:q,"item-title":"label","item-value":"value",label:"Tipo de pessoa","bg-color":"#F6F6F6",disabled:""},null,8,["modelValue"])]),a(k)?(u(),N("div",ye,[e(be,{indeterminate:"",class:"loading-spinner",size:"64"})])):(u(),N("div",Ae,[e(ae,{modelValue:a(p),"onUpdate:modelValue":o[1]||(o[1]=s=>S(p)?p.value=s:null),"bg-color":"#f5f2f2"},{default:l(()=>[e(_,{value:"dados"},{default:l(()=>[c("Dados")]),_:1}),a(t).tipo_pessoa==="FISICA"?(u(),r(_,{key:0,value:"documento"},{default:l(()=>[c("Documentos")]),_:1})):V("",!0),a(t).tipo_pessoa==="JURIDICA"?(u(),r(_,{key:1,value:"representante"},{default:l(()=>[c("Representantes")]),_:1})):V("",!0),a(t).tipo_pessoa==="JURIDICA"||a(t).tipo_pessoa==="FISICA"?(u(),r(_,{key:2,value:"endereco"},{default:l(()=>[c("Endereços")]),_:1})):V("",!0),a(t).tipo_pessoa==="FISICA"?(u(),r(_,{key:3,value:"biometria"},{default:l(()=>[c("Biometria")]),_:1})):V("",!0),a(t).tipo_pessoa==="JURIDICA"||a(t).tipo_pessoa==="FISICA"?(u(),r(_,{key:4,value:"restricao"},{default:l(()=>[c("Restrições")]),_:1})):V("",!0)]),_:1},8,["modelValue"]),e(oe,{modelValue:a(p),"onUpdate:modelValue":o[15]||(o[15]=s=>S(p)?p.value=s:null)},{default:l(()=>[e(f,{value:"dados"},{default:l(()=>[a(t).tipo_pessoa==="FISICA"?(u(),r(w,{key:0},{default:l(()=>[e(v,null,{default:l(()=>[e(n,{cols:"12",md:"8"},{default:l(()=>[e(m,{modelValue:a(t).nome,"onUpdate:modelValue":o[2]||(o[2]=s=>a(t).nome=s),label:"Nome"},null,8,["modelValue"])]),_:1}),e(n,{cols:"12",md:"4"},{default:l(()=>[$(e(m,{modelValue:a(t).doc_identificacao,"onUpdate:modelValue":o[3]||(o[3]=s=>a(t).doc_identificacao=s),label:"CPF"},null,8,["modelValue"]),[[A,"###.###.###-##"]])]),_:1})]),_:1}),e(v,null,{default:l(()=>[e(n,{cols:"12",md:"4"},{default:l(()=>[e(U,{modelValue:a(t).tabvalores_estadocivil_id,"onUpdate:modelValue":o[4]||(o[4]=s=>a(t).tabvalores_estadocivil_id=s),items:a(F),"item-title":"descricao","item-value":"id",label:"Estado Civil"},null,8,["modelValue","items"])]),_:1}),e(n,{cols:"12",md:"4"},{default:l(()=>[e(m,{modelValue:a(t).profissao,"onUpdate:modelValue":o[5]||(o[5]=s=>a(t).profissao=s),label:"Profissão"},null,8,["modelValue"])]),_:1}),e(n,{cols:"12",md:"4"},{default:l(()=>[e(m,{modelValue:a(t).local_trabalho,"onUpdate:modelValue":o[6]||(o[6]=s=>a(t).local_trabalho=s),label:"Local de trabalho"},null,8,["modelValue"])]),_:1})]),_:1}),e(v,null,{default:l(()=>[e(n,{cols:"12",md:"4"},{default:l(()=>[e(m,{modelValue:a(t).data_nascimento,"onUpdate:modelValue":o[7]||(o[7]=s=>a(t).data_nascimento=s),type:"date","prepend-icon":"",label:"Data de nascimento"},null,8,["modelValue"])]),_:1}),e(n,{cols:"12",md:"4"},{default:l(()=>[e(U,{modelValue:a(t).tabvalores_capacidadecivil_id,"onUpdate:modelValue":o[8]||(o[8]=s=>a(t).tabvalores_capacidadecivil_id=s),items:a(P),label:"Capacidade Civil","item-title":"descricao","item-value":"id"},null,8,["modelValue","items"])]),_:1}),e(n,{cols:"12",md:"4"},{default:l(()=>[e(U,{modelValue:a(t).cidade_natural_id,"onUpdate:modelValue":o[9]||(o[9]=s=>a(t).cidade_natural_id=s),items:a(R),label:"Cidade de nascimento","item-title":"descricao","item-value":"id"},null,8,["modelValue","items"])]),_:1})]),_:1}),e(v,null,{default:l(()=>[e(n,{cols:"12",md:"4"},{default:l(()=>[$(e(m,{modelValue:a(t).cpf_pai,"onUpdate:modelValue":o[10]||(o[10]=s=>a(t).cpf_pai=s),modelModifiers:{date:!0},label:"CPF do Pai"},null,8,["modelValue"]),[[A,"###.###.###-##"]])]),_:1}),e(n,{cols:"12",md:"4"},{default:l(()=>[e(m,{modelValue:a(t).nome_pai,"onUpdate:modelValue":o[11]||(o[11]=s=>a(t).nome_pai=s),modelModifiers:{date:!0},label:"Nome do Pai"},null,8,["modelValue"])]),_:1})]),_:1}),e(v,null,{default:l(()=>[e(n,{cols:"12",md:"4"},{default:l(()=>[$(e(m,{modelValue:a(t).cpf_mae,"onUpdate:modelValue":o[12]||(o[12]=s=>a(t).cpf_mae=s),modelModifiers:{date:!0},label:"CPF da Mãe"},null,8,["modelValue"]),[[A,"###.###.###-##"]])]),_:1}),e(n,{cols:"12",md:"4"},{default:l(()=>[e(m,{modelValue:a(t).nome_mae,"onUpdate:modelValue":o[13]||(o[13]=s=>a(t).nome_mae=s),modelModifiers:{date:!0},label:"Nome da Mãe"},null,8,["modelValue"])]),_:1})]),_:1}),e(v,{class:"mb-3"},{default:l(()=>[e(i,{to:"/pessoas/lista"},{default:l(()=>[e(E,{size:"large",color:"red"},{default:l(()=>[c("Voltar")]),_:1})]),_:1}),e(E,{onClick:o[14]||(o[14]=s=>Q()),class:"ml-4",size:"large",color:"green"},{default:l(()=>[c("Salvar")]),_:1})]),_:1})]),_:1})):a(t).tipo_pessoa==="JURIDICA"?(u(),r(g,{key:1})):V("",!0)]),_:1}),e(f,{value:"documento"},{default:l(()=>[e(y)]),_:1}),e(f,{value:"representante"},{default:l(()=>[e(X)]),_:1}),e(f,{value:"endereco"},{default:l(()=>[e(Y)]),_:1}),e(f,{value:"biometria"},{default:l(()=>[e(w,{class:"mt-5"},{default:l(()=>[e(Z)]),_:1})]),_:1}),e(f,{value:"restricao"},{default:l(()=>[e(h)]),_:1})]),_:1},8,["modelValue"])]))]),_:1})}}},He=ue(xe,[["__scopeId","data-v-48356863"]]);export{He as default};