import{_ as r}from"./chunks/imagePreview.vue_vue_type_script_setup_true_lang.LA9QRrWK.js";import{at as d,p as g,O as h,R as t,u as y,aK as l,q as e,V as k,ad as F,m as c}from"./chunks/framework.dohoO8t4.js";const o="/efwork/assets/img01.0gVagotj.jpg";function C(n,i){const s=new XMLHttpRequest;s.open("GET",n,!0),s.responseType="blob",s.onload=function(){s.status===200&&i(s.response)},s.send()}function B(n,i){if("msSaveOrOpenBlob"in window.navigator)navigator.msSaveBlob(n,i);else{let s=document.createElement("a"),a=document.querySelector("body");s.href=window.URL.createObjectURL(n),s.download=i,s.style.display="none",a.appendChild(s),s.click(),a.removeChild(s),window.URL.revokeObjectURL(s.href)}}function A(n,i){C(n,function(s){B(s,i)})}const D="_button_a3kf5_2",u={button:D},m=l("",7),v=e("h2",{id:"浙里办服务上架审核要求20240201",tabindex:"-1"},[k("浙里办服务上架审核要求20240201 "),e("a",{class:"header-anchor",href:"#浙里办服务上架审核要求20240201","aria-label":'Permalink to "浙里办服务上架审核要求20240201"'},"​")],-1),b=l("",44),w=l("",8),x=JSON.parse('{"title":"浙里办上架指南","description":"","frontmatter":{},"headers":[],"relativePath":"src/components/appGuide/zlb/readme.md","filePath":"src/components/appGuide/zlb/readme.md"}'),f={name:"src/components/appGuide/zlb/readme.md"},q=Object.assign(f,{setup(n){function i(s,a){A(s,a)}return(s,a)=>{const p=F("el-button");return c(),g("div",null,[m,h(p,{type:"primary",onClick:a[0]||(a[0]=E=>i("./file01.pdf","《“浙里办”服务开发指引+V1.3.8》"))},{default:t(()=>[k("下载")]),_:1}),v,h(p,{type:"primary",onClick:a[1]||(a[1]=E=>i("./file02.pdf","浙里办服务上架审核要求20240201"))},{default:t(()=>[k("下载")]),_:1}),b,h(r,{data:[y(o)]},null,8,["data"]),w])}}}),S={$style:u},T=d(q,[["__cssModules",S]]);export{x as __pageData,T as default};
