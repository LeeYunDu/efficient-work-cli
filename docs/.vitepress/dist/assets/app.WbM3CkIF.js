import{ay as s,aR as p,aS as u,aT as c,aU as l,aV as f,aW as d,aX as m,aY as h,aZ as A,a_ as g,a$ as v,l as P,au as w,o as y,w as R,b0 as b,b1 as C,b2 as _,ac as E}from"./chunks/framework.dohoO8t4.js";import{R as T}from"./chunks/theme.2Mcb6FUe.js";function i(e){if(e.extends){const a=i(e.extends);return{...a,...e,async enhanceApp(t){a.enhanceApp&&await a.enhanceApp(t),e.enhanceApp&&await e.enhanceApp(t)}}}return e}const o=i(T),D=P({name:"VitePressApp",setup(){const{site:e,lang:a,dir:t}=w();return y(()=>{R(()=>{document.documentElement.lang=a.value,document.documentElement.dir=t.value})}),e.value.router.prefetchLinks&&b(),C(),_(),o.setup&&o.setup(),()=>E(o.Layout)}});async function S(){const e=O(),a=L();a.provide(u,e);const t=c(e.route);return a.provide(l,t),a.component("Content",f),a.component("ClientOnly",d),Object.defineProperties(a.config.globalProperties,{$frontmatter:{get(){return t.frontmatter.value}},$params:{get(){return t.page.value.params}}}),o.enhanceApp&&await o.enhanceApp({app:a,router:e,siteData:m}),{app:a,router:e,data:t}}function L(){return h(D)}function O(){let e=s,a;return A(t=>{let n=g(t),r=null;return n&&(e&&(a=n),(e||a===n)&&(n=n.replace(/\.js$/,".lean.js")),r=v(()=>import(n),__vite__mapDeps([]))),s&&(e=!1),r},o.NotFound)}s&&S().then(({app:e,router:a,data:t})=>{a.go().then(()=>{p(a.route,t.site),e.mount("#app")})});export{S as createApp};
function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = []
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}