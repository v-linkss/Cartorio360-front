import{_ as d}from"./DYCjZhxV.js";import{_ as S}from"./BVz1G1IN.js";import{_ as E}from"./CV_4hpUE.js";import{_ as N,a as z}from"./DJvq3mCv.js";import{r as _,H as f,y as A,w as o,A as D,o as m,b as a,a as i,c as x,x as F}from"./Dlqmy1RL.js";import{u}from"./C_GLwl2T.js";import{V as T}from"./DAKMzE7Y.js";import{V as h}from"./BKuoGoND.js";import{V as B}from"./Dwnwy4ft.js";import"./C5gnfu47.js";import"./B1Y6quKv.js";import"./BLWE23di.js";import"./Ce67EB2p.js";import"./BN1Q8xcp.js";const L=["onClick"],U={key:0,style:{width:"30px",height:"30px",cursor:"pointer","margin-left":"7px"},src:N,alt:"Visualizar",title:"Reativar"},H={key:1,src:z,alt:"Excluir",class:"trash-icon",style:{width:"30px",height:"30px",cursor:"pointer","margin-left":"7px"},title:"Excluir"},et={__name:"lista",async setup(R){let t,l;const n=D(),g=`${n.public.managemant}/tipo-selos`,v=`${n.public.managemant}/tipo-selos`,y=`${n.public.managemant}/listarUF`,V=_([]),w=_([]),{data:$}=([t,l]=f(()=>u(y,{method:"GET"},"$7yCH3mLdj9")),t=await t,l(),t);w.value=$.value;const{data:p}=([t,l]=f(()=>u(g,{method:"GET"},"$sAxng7NVFv")),t=await t,l(),t);V.value=p.value;const b=[{title:"ID",value:"id"},{title:"UF",value:"uf"},{title:"Cor",value:"cor"},{title:"Descrição",value:"descricao"},{title:"Valor",value:"vlr_compra"},{title:"Ações",value:"actions",sortable:!1}];async function k(s){s.excluido=!s.excluido;const e=JSON.stringify({excluido:s.excluido});try{const{error:r}=await u(`${v}/${s.id}`,{method:"PUT",body:e},"$fzpNhzhZeF")}catch(r){console.error("Erro ao excluir selo:",r)}}return(s,e)=>{const r=d,C=d;return m(),A(T,null,{default:o(()=>[a(h,{class:"mb-5 mt-5"},{default:o(()=>[a(r,{to:"/tiposSelos/cadastro"},{default:o(()=>e[0]||(e[0]=[i("img",{class:"btn-pointer",src:S,alt:"Cadastro"},null,-1)])),_:1}),e[1]||(e[1]=i("h1",{class:"mt-3 ml-3"},"Tipos de Selos",-1))]),_:1}),a(B,{items:F(p),headers:b,"item-value":"id"},{"item.actions":o(({item:c})=>[a(h,{style:{"margin-top":"-6px"}},{default:o(()=>[i("div",null,[a(C,{to:`/tiposSelos/atualizar/${c.id}`},{default:o(()=>e[2]||(e[2]=[i("img",{style:{width:"30px",height:"30px",cursor:"pointer"},src:E,alt:"Atualizar"},null,-1)])),_:2},1032,["to"])]),i("div",{onClick:G=>k(c),title:"Deletar"},[c.excluido?(m(),x("img",U)):(m(),x("img",H))],8,L)]),_:2},1024)]),_:1},8,["items"])]),_:1})}}};export{et as default};
