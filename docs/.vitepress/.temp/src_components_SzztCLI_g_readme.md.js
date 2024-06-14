import { useSSRContext, unref } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./imagePreview.CAnHPUTD.js";
const demo01 = "/efwork/assets/demo01.DemsMUiT.png";
const gc = "/efwork/assets/gc._Dzi3FIP.png";
const form = "/efwork/assets/form.CrIyfH9t.png";
const list = "/efwork/assets/list.DrREV235.png";
const __pageData = JSON.parse('{"title":"szzt g","description":"","frontmatter":{},"headers":[],"relativePath":"src/components/SzztCLI/g/readme.md","filePath":"src/components/SzztCLI/g/readme.md"}');
const __default__ = { name: "src/components/SzztCLI/g/readme.md" };
const _sfc_main = /* @__PURE__ */ Object.assign(__default__, {
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="szzt-g" tabindex="-1">szzt g <a class="header-anchor" href="#szzt-g" aria-label="Permalink to &quot;szzt g&quot;">​</a></h1><p>g = generator 的缩写，该指令的主要功能是生成文件。</p><h2 id="types" tabindex="-1">types <a class="header-anchor" href="#types" aria-label="Permalink to &quot;types&quot;">​</a></h2><p>该功能实现通过输入showDoc文档的IP+业务标识获取文档的resources,生成typescript的Interface类型声明。</p><p>声明的类型包含接口的请求参数和接口200响应的返回结果。</p><p>将接口按业务进行划分,生成 业务模块名称.types.ts 文件和 java.业务模块名称.ts 接口函数定义文件</p><p>每次调用该命令生成文件会覆盖原文件,后端接口更新再调用即可。</p><h3 id="示例" tabindex="-1">示例 <a class="header-anchor" href="#示例" aria-label="Permalink to &quot;示例&quot;">​</a></h3><div class="language-node vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">node</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>szzt g types</span></span></code></pre></div>`);
      _push(ssrRenderComponent(_sfc_main$1, {
        data: [unref(demo01)]
      }, null, _parent));
      _push(`<p>IP：172.16.208.12:18550</p><p>业务标识：zhaoshang-project-api</p><h3 id="版本更新说明" tabindex="-1">版本更新说明 <a class="header-anchor" href="#版本更新说明" aria-label="Permalink to &quot;版本更新说明&quot;">​</a></h3><ol><li>2023/02/27 初次上线</li><li>2023/02/28 feat 接口请求字段添加是否选填判断（fieldName？:string）</li><li>2023/03/08 （szzt-cli@3.2.0） feat:业务文件.ts、interface 修改为首字母大写；递归生成interface嵌套的实体类；添加字段类型判断interger、array&lt;originaRef|基本数据类型&gt;;</li><li>2023/04/27 （szzt-cli@3.4.0） fix: 修复接口文档路径返回乱码问题；修复递归生成interface 陷入死循环问题</li><li>2023/08/07 （szzt-cli@3.7.3） feat: 生成接口定义函数功能； 在项目文件夹 api/project 中定义所有业务接口函数 在项目文件夹 api/index.ts 中导出所有接口函数 判断项目中是否有 typings/params.ts 文件,调整 ResponseMode 中data字段为必有项 ，不存在则会生成一份模版文件</li><li>2023/11/16 （szzt-cli@3.8.2）feat: 修复GET类型的接口未生成问题；优化interface字段注释；项目中生成接口文档标识,优化重复输入接口文档地址的操作；</li></ol><h2 id="gc" tabindex="-1">gc <a class="header-anchor" href="#gc" aria-label="Permalink to &quot;gc&quot;">​</a></h2><p>在指定路径下生成生成gc-content模块文件。</p><p>如下示例，将在/views/demo路径下生成view.vue文件,内容为gc-content的模版。</p><div class="language-node vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">node</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>szzt g gc &#39;/views/demo/view.vue&#39;</span></span></code></pre></div>`);
      _push(ssrRenderComponent(_sfc_main$1, {
        data: [unref(gc)]
      }, null, _parent));
      _push(`<h2 id="list" tabindex="-1">list <a class="header-anchor" href="#list" aria-label="Permalink to &quot;list&quot;">​</a></h2><p>在指定路径下生成生成list模块文件。</p><p>如下示例，将在/views/demo路径下生成list.vue文件,内容为list的模版。</p><div class="language-node vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">node</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>szzt g list &#39;/views/demo/list.vue&#39;</span></span></code></pre></div>`);
      _push(ssrRenderComponent(_sfc_main$1, {
        data: [unref(list)]
      }, null, _parent));
      _push(`<h2 id="form" tabindex="-1">form <a class="header-anchor" href="#form" aria-label="Permalink to &quot;form&quot;">​</a></h2><p>在指定路径下生成生成form模块文件。</p><p>如下示例，将在/views/demo路径下生成form.vue文件,内容为form的模版。</p><div class="language-node vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">node</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>szzt g form &#39;/views/demo/form.vue&#39;</span></span></code></pre></div>`);
      _push(ssrRenderComponent(_sfc_main$1, {
        data: [unref(form)]
      }, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/SzztCLI/g/readme.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  __pageData,
  _sfc_main as default
};
