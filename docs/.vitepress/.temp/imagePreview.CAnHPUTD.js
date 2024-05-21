import { defineComponent, resolveComponent, mergeProps, withCtx, openBlock, createBlock, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrRenderAttr } from "vue/server-renderer";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "imagePreview",
  __ssrInlineRender: true,
  props: {
    data: {
      type: Array,
      default: () => []
    }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_viewer = resolveComponent("viewer");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_viewer, {
        images: __props.data,
        class: "flex"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<!--[-->`);
            ssrRenderList(__props.data, (item, index) => {
              _push2(`<img class="cover-image"${ssrRenderAttr("src", item)}${_scopeId}>`);
            });
            _push2(`<!--]-->`);
          } else {
            return [
              (openBlock(true), createBlock(Fragment, null, renderList(__props.data, (item, index) => {
                return openBlock(), createBlock("img", {
                  key: index,
                  class: "cover-image",
                  src: item
                }, null, 8, ["src"]);
              }), 128))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/global/components/imagePreview.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
