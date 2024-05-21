import { useSSRContext, unref } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./imagePreview.CAnHPUTD.js";
const demo = "/efwork/assets/demo.BMreOwpm.png";
const __pageData = JSON.parse('{"title":"szzt init","description":"","frontmatter":{},"headers":[],"relativePath":"src/components/SzztCLI/init/readme.md","filePath":"src/components/SzztCLI/init/readme.md"}');
const __default__ = { name: "src/components/SzztCLI/init/readme.md" };
const _sfc_main = /* @__PURE__ */ Object.assign(__default__, {
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="szzt-init" tabindex="-1">szzt init <a class="header-anchor" href="#szzt-init" aria-label="Permalink to &quot;szzt init&quot;">​</a></h1><p>该指令帮助开发快速创建项目模版。 项目模版如下：</p><ol><li>szzt-vue2.6</li><li>szzt-vue3.x</li><li>szzt-react</li></ol><h2 id="示例" tabindex="-1">示例 <a class="header-anchor" href="#示例" aria-label="Permalink to &quot;示例&quot;">​</a></h2><div class="language-node vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">node</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>// 创建项目方式一</span></span>
<span class="line"><span>szzt init </span></span>
<span class="line"><span>// 创建项目方式二</span></span>
<span class="line"><span>szzt init myProject</span></span>
<span class="line"><span>// 如果存在输入的项目目录，强制删除项目目录</span></span>
<span class="line"><span>szzt init myProject -f</span></span></code></pre></div>`);
      _push(ssrRenderComponent(_sfc_main$1, {
        data: [unref(demo)]
      }, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/SzztCLI/init/readme.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  __pageData,
  _sfc_main as default
};
