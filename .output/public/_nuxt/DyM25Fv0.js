import{_ as x,D as d,r as n,M as b,G as y,h as N,o as f,c as O,b as t,w as r,N as $,x as B,q as i,v,A as D,O as F}from"./CtDV-ous.js";import{u as J}from"./CD94D2s7.js";import R from"./CKr8MxSq.js";import T from"./XUaAHudU.js";import U from"./Bhgmq2MN.js";import{V as _}from"./CWiJ1Bav.js";import{V as q}from"./lKL4zjLk.js";import{V}from"./DnovXfEg.js";import{V as g}from"./qPaL_Swk.js";import"./BwoOglyv.js";import"./ToPptOUL.js";import"./BK2ApIgh.js";import"./5dVDj7iE.js";const E={__name:"criar-ato",async setup(G){let u,p;const k=`${B().public.managemant}/tipoAtos`,h=d("auth_token").value,C=n(d("user-data").value.cartorio_token).value,S={"/fontes/atos/semelhanca":R,"/fontes/atos/autenticidade":T,"/fontes/atos/autenticacao/autenticacao":U},s=n([]),e=n([]),l=n(""),o=n(""),A=b(()=>S[o.value]),{data:w}=([u,p]=y(()=>J(k,{method:"POST",body:{usuario_token:h,cartorio_token:C}},"$eDvF6utwet")),u=await u,p(),u);return s.value=w.value.map(a=>({descricao:a.descricao,atos:JSON.stringify(a.atos)})),s.value.length>0&&(l.value=s.value[0].atos,e.value=JSON.parse(s.value[0].atos),e.value.length>0&&(o.value=e.value[0].rota)),N(l,a=>{a&&(e.value=JSON.parse(a),o.value=e.value.length>0?e.value[0].rota:"")}),(a,c)=>(f(),O($,null,[t(_,null,{default:r(()=>[t(q,null,{default:r(()=>[t(V,{md:"6"},{default:r(()=>[t(g,{class:"mr-5",label:"Selecione o Servico",items:i(s),"item-title":"descricao","item-value":"atos",modelValue:i(l),"onUpdate:modelValue":c[0]||(c[0]=m=>v(l)?l.value=m:null)},null,8,["items","modelValue"])]),_:1}),t(V,{md:"6"},{default:r(()=>[t(g,{label:"Selecione o tipo de ato",modelValue:i(o),"onUpdate:modelValue":c[1]||(c[1]=m=>v(o)?o.value=m:null),"item-title":"descricao","item-value":"rota",items:i(e)},null,8,["modelValue","items"])]),_:1})]),_:1})]),_:1}),t(_,null,{default:r(()=>[(f(),D(F(i(A))))]),_:1})],64))}},te=x(E,[["__scopeId","data-v-6463a20f"]]);export{te as default};