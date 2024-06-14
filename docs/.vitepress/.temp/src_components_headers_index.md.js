import { resolveComponent, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"header","description":"","frontmatter":{"map":{"path":"/components/headers"}},"headers":[],"relativePath":"src/components/headers/index.md","filePath":"src/components/headers/index.md"}');
const _sfc_main = { name: "src/components/headers/index.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_demo = resolveComponent("demo");
  const _component_API = resolveComponent("API");
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="header" tabindex="-1">header <a class="header-anchor" href="#header" aria-label="Permalink to &quot;header&quot;">​</a></h1>`);
  _push(ssrRenderComponent(_component_demo, {
    src: "./demo.vue",
    title: "主标题",
    desc: "大屏主标题组件"
  }, null, _parent));
  _push(ssrRenderComponent(_component_API, {
    src: "./header-1/index.vue",
    lang: "zh"
  }, null, _parent));
  _push(`</div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/headers/index.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  index as default
};
