import{g as n}from"./chunks/theme.Tpwjy7Tt.js";import{l as b,e as r,m as p,p as E,P as x,a8 as _,q as a,X as o,U as g,V as q,T as P,at as u,a as C,O as T,u as B,aK as A}from"./chunks/framework.6tnn-OSo.js";const N={class:"items"},S={key:0,class:"icon-box"},V=["src"],I={class:"progress-box"},O={class:"top"},L={class:"label"},M={class:"value"},j={class:"unit"},w={key:0,class:"rate-box"},$={class:"bottom"},z={class:"progress-bar-box"},R=b({__name:"progress-1",props:{data:{type:Object||Array,default:()=>[]},fields:{type:Array},iconMap:{type:Object},unit:{type:String,default:""},rate:{type:Boolean,default:!0}},setup(e){const k=e,i=r(()=>k.data||[]),d=r(()=>k.fields||[{label:"名称",key:"name",unit:"",icon:""},{label:"数值",key:"value",unit:"",icon:""}]),t=r(()=>Array.isArray(i.value)),D=r(()=>Array.isArray(i.value)?i.value:d.value);function F(s){return t.value?n(s,n(k.fields,"0.key",""),0):n(i,s.key)}function m(s){return t.value?k.iconMap[F(s)]||"":s.icon}function y(s){return t.value?n(s,n(k.fields,"1.key",""),0):n(i.value,s.key,"0")}const c=r(()=>{let s=0;try{if(t.value)i.value.map(l=>{s+=Number(n(l,n(d.value,"1.key",""),0))});else for(const l in i.value)if(Object.prototype.hasOwnProperty.call(i.value,l)){const h=i.value[l];s+=Number(n(h,n(d.value,"1.key",""),0))}}catch(l){console.log(l)}return s});function f(s){return(y(s)/c.value*100).toFixed(2)}return(s,l)=>(p(),E("section",N,[(p(!0),E(x,null,_(D.value,(h,v)=>(p(),E("section",{key:v,class:"item"},[e.iconMap?(p(),E("div",S,[a("img",{src:`static/images/common/${m(h)}.png`,alt:""},null,8,V)])):o("",!0),a("div",I,[a("section",O,[a("section",L,[a("span",null,g(F(h)),1)]),a("section",M,[a("span",null,[q(g(y(h))+" ",1),a("small",j,g(t.value?e.unit:h.unit??""),1)])]),e.rate?(p(),E("section",w," / "+g(f(h))+"% ",1)):o("",!0)]),a("section",$,[a("div",z,[a("div",{class:"bar",style:P({width:y(h)/c.value*100+"%"})},null,4)])])])]))),128))]))}}),J=u(R,[["__scopeId","data-v-f9c9c09d"]]),K="_button_a3kf5_2",U={button:K},X=A("",5),G=A("",5),ss=JSON.parse('{"title":"Progress","description":"","frontmatter":{},"headers":[],"relativePath":"src/components/progress/progress-1/readme.md","filePath":"src/components/progress/progress-1/readme.md"}'),H={name:"src/components/progress/progress-1/readme.md"},Q=Object.assign(H,{setup(e){let k=C([{x1:"数据01",y1:"1",y2:"2"},{x1:"数据02",y1:"1",y2:"2"},{x1:"数据03",y1:"1",y2:"2"}]),i=C([{label:"名称",key:"x1",unit:"",icon:""},{label:"数值",key:"y1",unit:"",icon:""},{label:"比率",key:"y2",unit:"",icon:""}]);return(d,t)=>(p(),E("div",null,[X,T(J,{data:B(k),fields:B(i),unit:"个"},null,8,["data","fields"]),G]))}}),W={$style:U},is=u(Q,[["__cssModules",W]]);export{ss as __pageData,is as default};
