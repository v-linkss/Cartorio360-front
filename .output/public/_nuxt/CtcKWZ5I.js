import{bS as c,cc as l,cK as r,bV as u,cS as p,bZ as v,b as t,Q as m}from"./pH1cEkPx.js";function d(e){return{aspectStyles:m(()=>{const n=Number(e.aspectRatio);return n?{paddingBottom:String(1/n*100)+"%"}:void 0})}}const y=c({aspectRatio:[String,Number],contentClass:null,inline:Boolean,...l(),...r()},"VResponsive"),R=u()({name:"VResponsive",props:y(),setup(e,n){let{slots:s}=n;const{aspectStyles:o}=d(e),{dimensionStyles:i}=p(e);return v(()=>{var a;return t("div",{class:["v-responsive",{"v-responsive--inline":e.inline},e.class],style:[i.value,e.style]},[t("div",{class:"v-responsive__sizer",style:o.value},null),(a=s.additional)==null?void 0:a.call(s),s.default&&t("div",{class:["v-responsive__content",e.contentClass]},[s.default()])])}),{}}});export{R as V,y as m};