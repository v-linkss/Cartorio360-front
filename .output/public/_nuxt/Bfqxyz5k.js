import{_ as a,u as e,n as o,r as s,o as t,c as l,a as n,b as i,V as r,q as c,s as u,w as d,v as m,x as p,y as v,z as _,d as h,A as f,B as k,C as y,p as g,e as b,D as V}from"./Cqiv77yc.js";import{u as w}from"./D0-0VRaN.js";import{V as x,a as C}from"./oKXwpsuu.js";const E=""+new URL("cartorio_logo.CfnnJMUp.jpeg",import.meta.url).href,U=a=>(g("data-v-578b0a84"),a=a(),b(),a),O={class:"container-main"},S={class:"container-form"},j=U((()=>n("div",{class:"text"},"Log in",-1))),I=U((()=>n("a",{class:"text-decoration-none",rel:"noopener noreferrer",style:{color:"#429946"}}," Esqueceu a senha?",-1))),J=U((()=>n("div",{class:"background-image"},null,-1))),K=a({__name:"index",setup(a){const g=e(),{$toast:b}=o(),U=s({senha:"",email:""}),K=s(!1),L=s(!1),$=s(!1),q=s(!1),z=s(!1),A=()=>{$.value=!1,q.value=!1,z.value=!1,L.value=!1},D=p().public.auth,N=async()=>{const{data:a,status:e,error:o}=await w(`${D}/login`,{method:"POST",body:{senha:U.value.senha,email:U.value.email}},"$iX10IJN3fa");if("success"===e.value){const e=a.value[0].func_autentica_acesso_v1[0].registro[0],o=V("user-data");o.value=o.value=JSON.stringify({nome:e.nome,usuario_id:e.id,cartorio_id:e.cartorios[0].cartorio_id,cartorio_nome:e.cartorios[0].cartorio_descricao,cartorio_token:e.cartorios[0].cartorio_token}),b.success("Login realizado com sucesso!");const s=a.value[0].func_autentica_acesso_v1[0].registro[0].token;V("auth_token").value=s,g.push("/")}else{"error"===e.value&&500===o.value.statusCode&&(z.value=!0);const a=o.value.data[0].func_autentica_acesso_v1[0];switch(a.status_mensagem){case"Esse email não está cadastrado no Durabil.":q.value=!0;break;case"Senha inválida.":$.value=!0;break;default:"Erro ao autenticar usuário"===a.error&&(z.value=!0)}}};return(a,e)=>(t(),l("div",O,[n("div",S,[i(r,{class:"image",width:300,height:"230",src:E}),j,i(u,{autofocus:"",autocomplete:"email",type:"email",modelValue:c(U).email,"onUpdate:modelValue":e[0]||(e[0]=a=>c(U).email=a),"persistent-hint":"",class:"input",density:"compact",placeholder:"Email","prepend-inner-icon":"mdi-email-outline",variant:"outlined"},null,8,["modelValue"]),i(u,{modelValue:c(U).senha,"onUpdate:modelValue":e[1]||(e[1]=a=>c(U).senha=a),class:"input","append-inner-icon":c(K)?"mdi-eye-off":"mdi-eye",type:c(K)?"text":"password",density:"compact",placeholder:"Senha","prepend-inner-icon":"mdi-lock-outline",variant:"outlined","onClick:appendInner":e[2]||(e[2]=a=>K.value=!c(K))},null,8,["modelValue","append-inner-icon","type"]),i(x,{modelValue:c(L),"onUpdate:modelValue":e[4]||(e[4]=a=>m(L)?L.value=a:null),"max-width":"400",persistent:""},{activator:d((({props:a})=>[i(v,_({block:"",rounded:"",class:"button mb-10 mt-4"},a,{onClick:N,modelValue:c(L),"onUpdate:modelValue":e[3]||(e[3]=a=>m(L)?L.value=a:null)}),{default:d((()=>[h(" Acessar ")])),_:2},1040,["modelValue"])])),default:d((()=>[c($)?(t(),f(C,{key:0,text:"Senha inválida."},{actions:d((()=>[i(k),i(v,{onClick:A,style:{"background-color":"#429946",color:"white"}},{default:d((()=>[h(" OK ")])),_:1})])),_:1})):y("",!0),c(q)?(t(),f(C,{key:1,text:"Esse email não está cadastrado."},{actions:d((()=>[i(k),i(v,{onClick:A,style:{"background-color":"#429946",color:"white"}},{default:d((()=>[h(" OK ")])),_:1})])),_:1})):y("",!0),c(z)?(t(),f(C,{key:2,text:"Erro no sistema, fora do ar."},{actions:d((()=>[i(k),i(v,{onClick:A,style:{"background-color":"#429946",color:"white"}},{default:d((()=>[h(" OK ")])),_:1})])),_:1})):y("",!0)])),_:1},8,["modelValue"]),I]),J]))}},[["__scopeId","data-v-578b0a84"]]);export{K as default};