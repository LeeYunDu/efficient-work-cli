var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key2, value2) => key2 in obj ? __defProp(obj, key2, { enumerable: true, configurable: true, writable: true, value: value2 }) : obj[key2] = value2;
var __publicField = (obj, key2, value2) => {
  __defNormalProp(obj, typeof key2 !== "symbol" ? key2 + "" : key2, value2);
  return value2;
};
import { defineComponent, reactive, computed, ref, resolveComponent, mergeProps, withCtx, createTextVNode, createVNode, toDisplayString, useSSRContext, watch, onMounted, unref, openBlock, createBlock, Fragment, renderList, shallowRef, onUnmounted, inject, createCommentVNode, withKeys, nextTick, resolveDynamicComponent, isRef, provide, toRef, renderSlot } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderAttrs, ssrRenderStyle, ssrRenderVNode, ssrRenderAttr, ssrRenderClass, ssrRenderSlot } from "vue/server-renderer";
import { get, cloneDeep, throttle, set, flatten, forEach, isFunction } from "lodash-es";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
import { ElTree, ElMessage, ElMessageBox } from "element-plus";
import JSONEditor from "jsoneditor";
import $ from "gogocode";
import _ from "lodash";
import { parse } from "acorn";
import escodegen from "escodegen";
import { PrismEditor } from "vue-prism-editor";
import "./prism-tomorrow.l0sNRNKZ.js";
import prism from "prismjs";
import { useVModel } from "@vueuse/core";
function getOptionForField(field, cb = (fieldOption) => {
}) {
  const { fieldConf = {} } = JSON.parse(get(field, "_options", field.options || "{}"));
  let fieldOption = {};
  try {
    const props2 = fieldConf.props.filter((item2) => {
      return item2.type === "props";
    })[0] || {};
    fieldOption = Object.assign(fieldOption, props2.option);
  } catch (error) {
  }
  cb(fieldOption);
  return fieldOption;
}
function conversionFunction(options) {
  Object.keys(options).map((key) => {
    const item = options[key];
    try {
      if (isFunctionString(item)) {
        options[key] = eval("(" + item + ")");
      }
    } catch (error) {
    }
  });
}
function isFunctionString(str) {
  const functionPattern = /^function\s*\w*\s*\([\w\s,]*\)\s*{.*}$/;
  const arrowFunctionPattern = /^([\w\s,]*)\s*=>.*$/;
  return functionPattern.test(str) || arrowFunctionPattern.test(str);
}
const SimplificationKey = ["label", "key", "type", "props", "options"];
const SimplificationPropKeysBlackList = [
  "isDetail",
  "componentType",
  "fieldName",
  "key",
  "options",
  "sort",
  "optionType",
  "keyConfig",
  "props",
  "dynamicConfig",
  "childrenProps",
  "show-all-levels"
];
const editModelType = [
  { label: "编辑器模式", key: "simplification" },
  { label: "JSON模式", key: "json" },
  { label: "详情模式", key: "detail" }
];
const _sfc_main$l = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  props: {
    modelValue: { type: Boolean, default: false },
    componentOptions: {
      type: Object
    }
  },
  emits: ["update:modelValue", "save"],
  setup(__props2, { emit: __emit2 }) {
    const props2 = __props2;
    let state2 = reactive({
      model: "simplification"
    });
    const emits2 = __emit2;
    const show2 = computed({
      get: () => {
        if (props2.modelValue)
          ;
        return props2.modelValue;
      },
      set: (val) => emits2("update:modelValue", val)
    });
    let editorInstance2 = ref(null);
    const dialogTitle2 = computed(() => {
      return `正在编辑字段：${get(props2.componentOptions, "name", "")}`;
    });
    const tip2 = computed(() => {
      if (state2.model == "simplification") {
        return `精简模式下只展示组件会使用到属性，比如${keys.join("、")}字段`;
      } else {
        return "详情模式展示 类型 MenuMode 的全量字段";
      }
    });
    function onTransformClick2(type) {
      state2.model = type;
      {
        onTransformSimplification2();
      }
    }
    let keys = SimplificationKey;
    function onTransformSimplification2() {
      let result2 = {};
      let currentField = cloneDeep(props2.componentOptions);
      SimplificationKey.forEach((key2) => {
        if (key2 == "props") {
          result2.props = getOptionForField(currentField, (option) => {
            Object.keys(option).forEach((key22) => {
              let value2 = option[key22];
              if (value2 === "") {
                delete option[key22];
              }
              if (SimplificationPropKeysBlackList.includes(key22)) {
                delete option[key22];
              }
            });
          });
        } else {
          result2[key2] = get(currentField, key2);
        }
      });
      editorInstance2.value.set(result2);
    }
    function onSave2() {
      const jsonData = editorInstance2.value.get();
      show2.value = false;
      emits2("save", jsonData);
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_dialog = resolveComponent("el-dialog");
      const _component_el_button_group = resolveComponent("el-button-group");
      const _component_el_button = resolveComponent("el-button");
      _push(ssrRenderComponent(_component_el_dialog, mergeProps({
        modelValue: show2.value,
        "onUpdate:modelValue": ($event) => show2.value = $event,
        "destroy-on-close": "",
        title: dialogTitle2.value,
        width: "80%"
      }, _attrs), {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="button-box" data-v-a759a373${_scopeId}>`);
            _push2(ssrRenderComponent(_component_el_button_group, null, {
              default: withCtx((_22, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_button, {
                    type: "primary",
                    onClick: ($event) => onTransformClick2("simplification")
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`精简组件模式`);
                      } else {
                        return [
                          createTextVNode("精简组件模式")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_button, {
                    type: "success",
                    onClick: onSave2
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`保存`);
                      } else {
                        return [
                          createTextVNode("保存")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_el_button, {
                      type: "primary",
                      onClick: ($event) => onTransformClick2("simplification")
                    }, {
                      default: withCtx(() => [
                        createTextVNode("精简组件模式")
                      ]),
                      _: 1
                    }, 8, ["onClick"]),
                    createVNode(_component_el_button, {
                      type: "success",
                      onClick: onSave2
                    }, {
                      default: withCtx(() => [
                        createTextVNode("保存")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<div class="tip" data-v-a759a373${_scopeId}>${ssrInterpolate(tip2.value)}</div></div><div id="json-edit-container" data-v-a759a373${_scopeId}></div>`);
          } else {
            return [
              createVNode("div", { class: "button-box" }, [
                createVNode(_component_el_button_group, null, {
                  default: withCtx(() => [
                    createVNode(_component_el_button, {
                      type: "primary",
                      onClick: ($event) => onTransformClick2("simplification")
                    }, {
                      default: withCtx(() => [
                        createTextVNode("精简组件模式")
                      ]),
                      _: 1
                    }, 8, ["onClick"]),
                    createVNode(_component_el_button, {
                      type: "success",
                      onClick: onSave2
                    }, {
                      default: withCtx(() => [
                        createTextVNode("保存")
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                createVNode("div", { class: "tip" }, toDisplayString(tip2.value), 1)
              ]),
              createVNode("div", { id: "json-edit-container" })
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$l = _sfc_main$l.setup;
_sfc_main$l.setup = (props2, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/factory/form/common/JSONEdit/index.vue");
  return _sfc_setup$l ? _sfc_setup$l(props2, ctx) : void 0;
};
const JSONEdit = /* @__PURE__ */ _export_sfc(_sfc_main$l, [["__scopeId", "data-v-a759a373"]]);
const labelPositionOptions$1 = [
  { label: "左", value: "left" },
  { label: "上", value: "top" },
  { label: "右", value: "right" }
];
const _sfc_main$k = /* @__PURE__ */ defineComponent({
  __name: "form.option",
  __ssrInlineRender: true,
  props: {
    model: {
      type: Object
    },
    componentOption: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ["update", "updateOption"],
  setup(__props2, { expose: __expose, emit: __emit2 }) {
    let props2 = __props2;
    const stopEmit = ref(false);
    let formOption = reactive({
      props: {
        size: "default",
        "label-suffix": ":",
        "label-width": "",
        labelPosition: "",
        inline: false
      },
      options: {
        gridItem: {},
        grid: {}
      },
      extra: {}
    });
    let emits2 = __emit2;
    function onOptionChange() {
      let cloneFormOption = cloneDeep(formOption);
      let labelWidth = cloneFormOption.props["label-width"];
      cloneFormOption.props["label-width"] = labelWidth > 0 ? cloneFormOption.props["label-width"] + "px" : "";
      if (stopEmit.value)
        return;
      emits2("updateOption", cloneFormOption);
    }
    function initCommonOption() {
      let cloneComponentOption = cloneDeep(props2.componentOption);
      let formOptionProps = get(cloneComponentOption.options, "component.props", {});
      let labelWidth = formOptionProps["label-width"] || "";
      formOptionProps["label-width"] = labelWidth.replace("px", "");
      formOption.props = formOptionProps;
      formOption.options = get(cloneComponentOption.options, "component.options", {});
      if (stopEmit.value) {
        setTimeout(() => {
          stopEmit.value = false;
        });
      }
    }
    watch(() => formOption, throttle(onOptionChange, 1e3), { deep: true });
    function updateOption() {
      stopEmit.value = true;
      initCommonOption();
    }
    onMounted(initCommonOption);
    __expose({
      updateOption
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_form_item = resolveComponent("el-form-item");
      const _component_el_select = resolveComponent("el-select");
      const _component_el_option = resolveComponent("el-option");
      const _component_el_input = resolveComponent("el-input");
      const _component_el_radio_group = resolveComponent("el-radio-group");
      const _component_el_radio_button = resolveComponent("el-radio-button");
      const _component_el_switch = resolveComponent("el-switch");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_el_form_item, { label: "标签对齐方式:" }, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_select, {
              modelValue: unref(formOption).props.labelPosition,
              "onUpdate:modelValue": ($event) => unref(formOption).props.labelPosition = $event,
              placeholder: "请选择标签对齐方式"
            }, {
              default: withCtx((_22, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<!--[-->`);
                  ssrRenderList(unref(labelPositionOptions$1), (item2, index) => {
                    _push3(ssrRenderComponent(_component_el_option, {
                      key: index,
                      label: item2.label,
                      value: item2.value
                    }, null, _parent3, _scopeId2));
                  });
                  _push3(`<!--]-->`);
                } else {
                  return [
                    (openBlock(true), createBlock(Fragment, null, renderList(unref(labelPositionOptions$1), (item2, index) => {
                      return openBlock(), createBlock(_component_el_option, {
                        key: index,
                        label: item2.label,
                        value: item2.value
                      }, null, 8, ["label", "value"]);
                    }), 128))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_el_select, {
                modelValue: unref(formOption).props.labelPosition,
                "onUpdate:modelValue": ($event) => unref(formOption).props.labelPosition = $event,
                placeholder: "请选择标签对齐方式"
              }, {
                default: withCtx(() => [
                  (openBlock(true), createBlock(Fragment, null, renderList(unref(labelPositionOptions$1), (item2, index) => {
                    return openBlock(), createBlock(_component_el_option, {
                      key: index,
                      label: item2.label,
                      value: item2.value
                    }, null, 8, ["label", "value"]);
                  }), 128))
                ]),
                _: 1
              }, 8, ["modelValue", "onUpdate:modelValue"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_el_form_item, { label: "标签宽度:" }, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_input, {
              modelValue: unref(formOption).props["label-width"],
              "onUpdate:modelValue": ($event) => unref(formOption).props["label-width"] = $event,
              modelModifiers: { number: true },
              type: "number",
              placeholder: "请输入标签宽度"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_el_input, {
                modelValue: unref(formOption).props["label-width"],
                "onUpdate:modelValue": ($event) => unref(formOption).props["label-width"] = $event,
                modelModifiers: { number: true },
                type: "number",
                placeholder: "请输入标签宽度"
              }, null, 8, ["modelValue", "onUpdate:modelValue"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_el_form_item, { label: "标签后缀:" }, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_input, {
              modelValue: unref(formOption).props["label-suffix"],
              "onUpdate:modelValue": ($event) => unref(formOption).props["label-suffix"] = $event,
              placeholder: "请输入标签后缀"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_el_input, {
                modelValue: unref(formOption).props["label-suffix"],
                "onUpdate:modelValue": ($event) => unref(formOption).props["label-suffix"] = $event,
                placeholder: "请输入标签后缀"
              }, null, 8, ["modelValue", "onUpdate:modelValue"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_el_form_item, { label: "表单尺寸:" }, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_radio_group, {
              modelValue: unref(formOption).props.size,
              "onUpdate:modelValue": ($event) => unref(formOption).props.size = $event
            }, {
              default: withCtx((_22, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_radio_button, { label: "large" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`large`);
                      } else {
                        return [
                          createTextVNode("large")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_radio_button, { label: "default" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`default`);
                      } else {
                        return [
                          createTextVNode("default")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_radio_button, { label: "small" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`small`);
                      } else {
                        return [
                          createTextVNode("small")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_el_radio_button, { label: "large" }, {
                      default: withCtx(() => [
                        createTextVNode("large")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_radio_button, { label: "default" }, {
                      default: withCtx(() => [
                        createTextVNode("default")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_radio_button, { label: "small" }, {
                      default: withCtx(() => [
                        createTextVNode("small")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_el_radio_group, {
                modelValue: unref(formOption).props.size,
                "onUpdate:modelValue": ($event) => unref(formOption).props.size = $event
              }, {
                default: withCtx(() => [
                  createVNode(_component_el_radio_button, { label: "large" }, {
                    default: withCtx(() => [
                      createTextVNode("large")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_el_radio_button, { label: "default" }, {
                    default: withCtx(() => [
                      createTextVNode("default")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_el_radio_button, { label: "small" }, {
                    default: withCtx(() => [
                      createTextVNode("small")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["modelValue", "onUpdate:modelValue"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_el_form_item, { label: "是否行内模式:" }, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_switch, {
              modelValue: unref(formOption).props.inline,
              "onUpdate:modelValue": ($event) => unref(formOption).props.inline = $event,
              "active-text": "是",
              "inactive-text": "否"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_el_switch, {
                modelValue: unref(formOption).props.inline,
                "onUpdate:modelValue": ($event) => unref(formOption).props.inline = $event,
                "active-text": "是",
                "inactive-text": "否"
              }, null, 8, ["modelValue", "onUpdate:modelValue"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup$k = _sfc_main$k.setup;
_sfc_main$k.setup = (props2, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/factory/form/components/formSetting/components/form.option.vue");
  return _sfc_setup$k ? _sfc_setup$k(props2, ctx) : void 0;
};
const _sfc_main$j = /* @__PURE__ */ defineComponent({
  __name: "form.option.panel",
  __ssrInlineRender: true,
  props: {
    componentOption: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ["update"],
  setup(__props2, { emit: __emit2 }) {
    let props2 = __props2;
    let model = reactive({
      props: {},
      options: {}
    });
    let emits2 = __emit2;
    const formOptionRef = shallowRef();
    let state2 = reactive({
      show: false
    });
    let updateThrottle = throttle(updateOption, 1500);
    function updateOption(option) {
      let deepComponentOption = cloneDeep(props2.componentOption);
      let options2 = deepComponentOption.options;
      options2.component = Object.assign(options2.component, option);
      emits2("update", deepComponentOption);
    }
    function init2() {
      model.props = Object.assign({}, model.props, get(props2.componentOption.options, "component.props", {}));
      model.options = Object.assign({}, model.options, get(props2.componentOption.options, "component.options", {}));
    }
    function onSave2(option) {
      updateOption(option);
      setTimeout(() => {
        formOptionRef.value.updateOption();
      });
    }
    onMounted(init2);
    onUnmounted(() => {
      console.log("销毁-表单配置");
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_form = resolveComponent("el-form");
      const _component_el_button = resolveComponent("el-button");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_el_form, {
        "label-position": "left",
        "label-width": "auto",
        model: unref(model)
      }, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div${_scopeId}>`);
            _push2(ssrRenderComponent(_component_el_button, {
              type: "text",
              onClick: ($event) => unref(state2).show = true
            }, {
              default: withCtx((_22, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`JSON编辑`);
                } else {
                  return [
                    createTextVNode("JSON编辑")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><h4${_scopeId}>表单属性</h4>`);
            _push2(ssrRenderComponent(_sfc_main$k, mergeProps({
              ref_key: "formOptionRef",
              ref: formOptionRef
            }, _ctx.$attrs, {
              model: unref(model),
              "component-option": __props2.componentOption,
              onUpdateOption: unref(updateThrottle)
            }), null, _parent2, _scopeId));
          } else {
            return [
              createVNode("div", null, [
                createVNode(_component_el_button, {
                  type: "text",
                  onClick: ($event) => unref(state2).show = true
                }, {
                  default: withCtx(() => [
                    createTextVNode("JSON编辑")
                  ]),
                  _: 1
                }, 8, ["onClick"])
              ]),
              createVNode("h4", null, "表单属性"),
              createVNode(_sfc_main$k, mergeProps({
                ref_key: "formOptionRef",
                ref: formOptionRef
              }, _ctx.$attrs, {
                model: unref(model),
                "component-option": __props2.componentOption,
                onUpdateOption: unref(updateThrottle)
              }), null, 16, ["model", "component-option", "onUpdateOption"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(JSONEdit, {
        modelValue: unref(state2).show,
        "onUpdate:modelValue": ($event) => unref(state2).show = $event,
        "component-options": unref(model),
        onSave: onSave2
      }, null, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup$j = _sfc_main$j.setup;
_sfc_main$j.setup = (props2, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/factory/form/components/formSetting/components/form.option.panel.vue");
  return _sfc_setup$j ? _sfc_setup$j(props2, ctx) : void 0;
};
const _sfc_main$i = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  props: {
    componentOption: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ["update", "viewUpdate"],
  setup(__props2, { emit: __emit2 }) {
    let props2 = __props2;
    const emits2 = __emit2;
    let fieldIdGroup = inject("fieldIdGroup");
    let state2 = reactive({
      checkedFields: []
    });
    watch(() => fieldIdGroup.value, (val) => {
      let { viewFieldGroup } = val;
      state2.checkedFields = Object.values(viewFieldGroup);
    }, { immediate: true, deep: true });
    const selectGroup = computed(() => {
      let { menuFieldGroup, viewFieldGroup, historyFields } = fieldIdGroup.value;
      const unuseFields = [];
      const useFields = [];
      const deleteFields = [];
      Object.keys(historyFields).forEach((id) => {
        let field = historyFields[id];
        if (!(id in menuFieldGroup)) {
          deleteFields.push(field);
        } else if (id in viewFieldGroup) {
          useFields.push(field);
        } else {
          unuseFields.push(field);
        }
      });
      return [
        { label: "正在使用", options: useFields },
        { label: "菜单配置中有,但视图未使用", options: unuseFields },
        { label: "历史字段", options: deleteFields }
      ];
    });
    computed(() => {
      let { menuFieldGroup, viewFieldGroup } = fieldIdGroup.value;
      const updateInfos = [];
      Object.keys(menuFieldGroup).forEach((id) => {
        let field = menuFieldGroup[id];
        if (id in viewFieldGroup) {
          let { name, key: key2 } = field;
          let viewField = viewFieldGroup[id];
          let status = {
            name: name === viewField.name,
            key: key2 === viewField.key
          };
          for (const statuskey in status) {
            if (Object.prototype.hasOwnProperty.call(status, statuskey)) {
              const element = status[statuskey];
              if (!element) {
                updateInfos.push({
                  field: viewField,
                  nKey: statuskey,
                  msg: `view中${viewField.name}的${statuskey}与Menu表中的不一致`
                });
              }
            }
          }
        }
      });
      return updateInfos;
    });
    function onCheckChange(items) {
      let deepComponentOption = cloneDeep(props2.componentOption);
      let options2 = deepComponentOption.options;
      options2.component.labels = items;
      emits2("update", deepComponentOption);
    }
    function onViewUpdate(options2) {
      emits2("viewUpdate", options2);
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_select = resolveComponent("el-select");
      const _component_el_option_group = resolveComponent("el-option-group");
      const _component_el_option = resolveComponent("el-option");
      _push(`<div${ssrRenderAttrs(_attrs)} data-v-abdeace6>`);
      _push(ssrRenderComponent(_sfc_main$j, {
        "component-option": __props2.componentOption,
        onUpdate: onViewUpdate
      }, null, _parent));
      _push(`<h4 data-v-abdeace6>字段集合</h4>`);
      _push(ssrRenderComponent(_component_el_select, {
        modelValue: unref(state2).checkedFields,
        "onUpdate:modelValue": ($event) => unref(state2).checkedFields = $event,
        "value-key": "id",
        placeholder: "请选择",
        clearable: "",
        multiple: "",
        class: "select-box",
        onChange: onCheckChange
      }, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<!--[-->`);
            ssrRenderList(selectGroup.value, (group) => {
              _push2(ssrRenderComponent(_component_el_option_group, {
                key: group.label,
                label: group.label
              }, {
                default: withCtx((_22, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<!--[-->`);
                    ssrRenderList(group.options, (field) => {
                      _push3(ssrRenderComponent(_component_el_option, {
                        key: field.id,
                        label: field.name,
                        value: field
                      }, null, _parent3, _scopeId2));
                    });
                    _push3(`<!--]-->`);
                  } else {
                    return [
                      (openBlock(true), createBlock(Fragment, null, renderList(group.options, (field) => {
                        return openBlock(), createBlock(_component_el_option, {
                          key: field.id,
                          label: field.name,
                          value: field
                        }, null, 8, ["label", "value"]);
                      }), 128))
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            });
            _push2(`<!--]-->`);
          } else {
            return [
              (openBlock(true), createBlock(Fragment, null, renderList(selectGroup.value, (group) => {
                return openBlock(), createBlock(_component_el_option_group, {
                  key: group.label,
                  label: group.label
                }, {
                  default: withCtx(() => [
                    (openBlock(true), createBlock(Fragment, null, renderList(group.options, (field) => {
                      return openBlock(), createBlock(_component_el_option, {
                        key: field.id,
                        label: field.name,
                        value: field
                      }, null, 8, ["label", "value"]);
                    }), 128))
                  ]),
                  _: 2
                }, 1032, ["label"]);
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
const _sfc_setup$i = _sfc_main$i.setup;
_sfc_main$i.setup = (props2, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/factory/form/components/formSetting/index.vue");
  return _sfc_setup$i ? _sfc_setup$i(props2, ctx) : void 0;
};
const FormSetting = /* @__PURE__ */ _export_sfc(_sfc_main$i, [["__scopeId", "data-v-abdeace6"]]);
const componentTypeOptions$1 = [
  {
    label: "输入字段",
    options: [
      { label: "文本", value: "input", attr: { componentType: 7, type: "text" } },
      { label: "单行输入框", value: "input", attr: { componentType: 7 } },
      { label: "多行文本", value: "input-textarea", attr: { componentType: 7, type: "textarea" } },
      { label: "密码", value: "input-password", attr: { componentType: 7, type: "password" } },
      { label: "计数器", value: "input-number", attr: { componentType: 24 } }
    ]
  },
  {
    label: "选择字段",
    options: [
      { label: "下拉选择器", value: "select", attr: { componentType: 8 } },
      { label: "级联选择器", value: "cascader", attr: { componentType: 9 } },
      { label: "树型结构选择器", disabled: true, value: "tree", attr: { componentType: 8, type: "tree" } },
      { label: "多选框", value: "checkbox-group", attr: { componentType: 10 } },
      { label: "单选框", value: "radio-group", attr: { componentType: 11 } },
      { label: "开关", value: "switch", attr: { componentType: 12 } }
    ]
  },
  {
    label: "日期时间字段",
    options: [
      { label: "年", value: "datePicker-year", attr: { componentType: 13, type: "year" } },
      { label: "月", value: "datePicker-month", attr: { componentType: 13, type: "month" } },
      { label: "日", value: "datePicker-day", attr: { componentType: 13, type: "day" } },
      { label: "周", value: "datePicker-week", attr: { componentType: 13, type: "week" } },
      { label: "日期默认", value: "datePicker-date", attr: { componentType: 13 } },
      // { label: '时间', value: 'timePicker', attr: { componentType: 12, type: 'year' } },
      { label: "日期时间", value: "datePicker-datetime", attr: { componentType: 13, type: "datetime" } },
      { label: "时间范围", value: "datePicker-datetimerange", attr: { componentType: 13, type: "datetimerange" } }
    ]
  },
  {
    label: "上传字段",
    options: [
      { label: "上传", value: "upload", attr: { componentType: 99 } }
    ]
  },
  {
    label: "其他",
    options: [
      { label: "插槽", value: "slot", attr: { componentType: 99 } },
      { label: "评分", value: "rate", attr: { componentType: 14 } },
      { label: "滑块", value: "slider", attr: { componentType: 15 } }
      // { label: '标签', value: 'tag', attr: { componentType: 16 } },
      // { label: '颜色选择器', value: 'colorPicker', attr: { componentType: 18 } },
    ]
  }
];
const ruleOptions = [
  { label: "手机号校验", value: "checkMobile" },
  { label: "邮箱校验", value: "checkEmail" },
  { label: "身份证号校验", value: "checkIdCard" },
  { label: "整数校验", value: "checkInteger" },
  { label: "数值类型校验", value: "checkNumber" }
];
const labelPositionOptions = [
  { label: "左", value: "left" },
  { label: "上", value: "top" },
  { label: "右", value: "right" }
];
const otherComponentOptions = {
  "rate": {
    max: 5,
    "show-text": false,
    texts: ["极差", "失望", "一般", "满意", "惊喜"],
    "show-score": false,
    colors: ["#F7BA2A", "#F7BA2A", "#F7BA2A"]
  },
  "slider": {
    max: 100,
    min: 0,
    step: "",
    "show-stops": false,
    "show-input": false,
    "range": false
  }
};
const quickEditFields = [
  { label: "字段名称", key: "name" },
  { label: "字段key", key: "key" },
  { label: "排序", key: "orderNum" }
];
const importModuleFields = [
  { label: "项目id", key: "projectId" },
  { label: "模块id", key: "menuId" }
];
const _sfc_main$h = /* @__PURE__ */ defineComponent({
  __name: "common.option",
  __ssrInlineRender: true,
  props: {
    fields: {
      type: Object,
      default: () => ({})
    },
    componentType: {
      type: String,
      default: "input"
    },
    model: {
      type: Object
    }
  },
  emits: ["updateOption"],
  setup(__props2, { expose: __expose, emit: __emit2 }) {
    let props2 = __props2;
    const stopEmit = ref(false);
    let fieldsOption = reactive({
      disabled: false,
      show: false,
      isDetail: false,
      clearable: false,
      rule: [],
      componentType: "input",
      fieldName: "",
      key: "",
      sort: 1,
      formItem: {
        labelWidth: 100,
        labelPosition: "left",
        required: false,
        class: ""
      },
      gridItem: {
        span: 12
      },
      extra: {}
    });
    const showRuleOption = computed(() => {
      return [7].includes(props2.componentType);
    });
    let emits2 = __emit2;
    function onOptionChange() {
      if (stopEmit.value)
        return;
      if (get(fieldsOption, "formItem.class", "")) {
        set(fieldsOption, "formItem.class", `form-item-${fieldsOption.key}`);
      }
      emits2("updateOption", fieldsOption);
    }
    function setComponentType(componentType, type) {
      let componentGroups = flatten(componentTypeOptions$1.map((e) => e.options));
      let useComponentType = Number(componentType) === -1 ? 6 : componentType;
      let item2 = componentGroups.find((item22) => {
        if (type) {
          return item22.attr.componentType === useComponentType && item22.attr.type === type;
        } else {
          return item22.attr.componentType === useComponentType;
        }
      });
      return item2;
    }
    function initCommonOption() {
      fieldsOption = Object.assign(fieldsOption, getOptionForField(props2.fields, (option) => {
        option.fieldName = props2.fields.name;
        option.key = props2.fields.key;
        if (!get(option, "formItem.class", "")) {
          set(option, "formItem.class", `form-item-${props2.fields.key}`);
        }
        let item2 = setComponentType(props2.fields.componentType, option.type);
        option.componentType = get(item2, "value", props2.fields.type);
        if (!option.sort) {
          setTimeout(() => {
            onOptionChange();
          }, 500);
        }
      }));
      if (stopEmit.value) {
        setTimeout(() => {
          stopEmit.value = false;
        });
      }
    }
    initCommonOption();
    watch(() => fieldsOption, throttle(onOptionChange, 2e3), { deep: true });
    function updateOption() {
      stopEmit.value = true;
      initCommonOption();
    }
    __expose({
      updateOption
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_form_item = resolveComponent("el-form-item");
      const _component_el_select = resolveComponent("el-select");
      const _component_el_option_group = resolveComponent("el-option-group");
      const _component_el_option = resolveComponent("el-option");
      const _component_el_input = resolveComponent("el-input");
      const _component_el_input_number = resolveComponent("el-input-number");
      const _component_el_switch = resolveComponent("el-switch");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_el_form_item, { label: "组件类型:" }, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_select, {
              modelValue: unref(fieldsOption).componentType,
              "onUpdate:modelValue": ($event) => unref(fieldsOption).componentType = $event,
              "value-key": "value",
              placeholder: "请输入组件类型"
            }, {
              default: withCtx((_22, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<!--[-->`);
                  ssrRenderList(unref(componentTypeOptions$1), (group, gIndex) => {
                    _push3(ssrRenderComponent(_component_el_option_group, {
                      key: gIndex,
                      label: group.label
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<!--[-->`);
                          ssrRenderList(group.options, (option, oInedx) => {
                            _push4(ssrRenderComponent(_component_el_option, {
                              label: option.label,
                              value: option.value,
                              disabled: option.disabled
                            }, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(`<span style="${ssrRenderStyle({ "float": "left" })}" data-v-ca513f3d${_scopeId4}>${ssrInterpolate(option.label)}</span><span style="${ssrRenderStyle({ "float": "right", "color": "#8492a6", "font-size": "13px" })}" data-v-ca513f3d${_scopeId4}>${ssrInterpolate(option.value)}</span>`);
                                } else {
                                  return [
                                    createVNode("span", { style: { "float": "left" } }, toDisplayString(option.label), 1),
                                    createVNode("span", { style: { "float": "right", "color": "#8492a6", "font-size": "13px" } }, toDisplayString(option.value), 1)
                                  ];
                                }
                              }),
                              _: 2
                            }, _parent4, _scopeId3));
                          });
                          _push4(`<!--]-->`);
                        } else {
                          return [
                            (openBlock(true), createBlock(Fragment, null, renderList(group.options, (option, oInedx) => {
                              return openBlock(), createBlock(_component_el_option, {
                                key: oInedx,
                                label: option.label,
                                value: option.value,
                                disabled: option.disabled
                              }, {
                                default: withCtx(() => [
                                  createVNode("span", { style: { "float": "left" } }, toDisplayString(option.label), 1),
                                  createVNode("span", { style: { "float": "right", "color": "#8492a6", "font-size": "13px" } }, toDisplayString(option.value), 1)
                                ]),
                                _: 2
                              }, 1032, ["label", "value", "disabled"]);
                            }), 128))
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  });
                  _push3(`<!--]-->`);
                } else {
                  return [
                    (openBlock(true), createBlock(Fragment, null, renderList(unref(componentTypeOptions$1), (group, gIndex) => {
                      return openBlock(), createBlock(_component_el_option_group, {
                        key: gIndex,
                        label: group.label
                      }, {
                        default: withCtx(() => [
                          (openBlock(true), createBlock(Fragment, null, renderList(group.options, (option, oInedx) => {
                            return openBlock(), createBlock(_component_el_option, {
                              key: oInedx,
                              label: option.label,
                              value: option.value,
                              disabled: option.disabled
                            }, {
                              default: withCtx(() => [
                                createVNode("span", { style: { "float": "left" } }, toDisplayString(option.label), 1),
                                createVNode("span", { style: { "float": "right", "color": "#8492a6", "font-size": "13px" } }, toDisplayString(option.value), 1)
                              ]),
                              _: 2
                            }, 1032, ["label", "value", "disabled"]);
                          }), 128))
                        ]),
                        _: 2
                      }, 1032, ["label"]);
                    }), 128))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_el_select, {
                modelValue: unref(fieldsOption).componentType,
                "onUpdate:modelValue": ($event) => unref(fieldsOption).componentType = $event,
                "value-key": "value",
                placeholder: "请输入组件类型"
              }, {
                default: withCtx(() => [
                  (openBlock(true), createBlock(Fragment, null, renderList(unref(componentTypeOptions$1), (group, gIndex) => {
                    return openBlock(), createBlock(_component_el_option_group, {
                      key: gIndex,
                      label: group.label
                    }, {
                      default: withCtx(() => [
                        (openBlock(true), createBlock(Fragment, null, renderList(group.options, (option, oInedx) => {
                          return openBlock(), createBlock(_component_el_option, {
                            key: oInedx,
                            label: option.label,
                            value: option.value,
                            disabled: option.disabled
                          }, {
                            default: withCtx(() => [
                              createVNode("span", { style: { "float": "left" } }, toDisplayString(option.label), 1),
                              createVNode("span", { style: { "float": "right", "color": "#8492a6", "font-size": "13px" } }, toDisplayString(option.value), 1)
                            ]),
                            _: 2
                          }, 1032, ["label", "value", "disabled"]);
                        }), 128))
                      ]),
                      _: 2
                    }, 1032, ["label"]);
                  }), 128))
                ]),
                _: 1
              }, 8, ["modelValue", "onUpdate:modelValue"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_el_form_item, { label: "标题:" }, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_input, {
              modelValue: unref(fieldsOption).fieldName,
              "onUpdate:modelValue": ($event) => unref(fieldsOption).fieldName = $event,
              placeholder: "请输入组件标题"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_el_input, {
                modelValue: unref(fieldsOption).fieldName,
                "onUpdate:modelValue": ($event) => unref(fieldsOption).fieldName = $event,
                placeholder: "请输入组件标题"
              }, null, 8, ["modelValue", "onUpdate:modelValue"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_el_form_item, { label: "key值:" }, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_input, {
              modelValue: unref(fieldsOption).key,
              "onUpdate:modelValue": ($event) => unref(fieldsOption).key = $event,
              placeholder: "请输入key"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_el_input, {
                modelValue: unref(fieldsOption).key,
                "onUpdate:modelValue": ($event) => unref(fieldsOption).key = $event,
                placeholder: "请输入key"
              }, null, 8, ["modelValue", "onUpdate:modelValue"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_el_form_item, { label: "ItemClassName:" }, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_input, {
              modelValue: unref(fieldsOption).formItem.class,
              "onUpdate:modelValue": ($event) => unref(fieldsOption).formItem.class = $event,
              disabled: "",
              placeholder: "请输入class类"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_el_input, {
                modelValue: unref(fieldsOption).formItem.class,
                "onUpdate:modelValue": ($event) => unref(fieldsOption).formItem.class = $event,
                disabled: "",
                placeholder: "请输入class类"
              }, null, 8, ["modelValue", "onUpdate:modelValue"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_el_form_item, { label: "标题宽度:" }, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_input, {
              modelValue: unref(fieldsOption).formItem.labelWidth,
              "onUpdate:modelValue": ($event) => unref(fieldsOption).formItem.labelWidth = $event,
              modelModifiers: { number: true },
              step: "10",
              type: "number",
              placeholder: "请输入标题宽度"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_el_input, {
                modelValue: unref(fieldsOption).formItem.labelWidth,
                "onUpdate:modelValue": ($event) => unref(fieldsOption).formItem.labelWidth = $event,
                modelModifiers: { number: true },
                step: "10",
                type: "number",
                placeholder: "请输入标题宽度"
              }, null, 8, ["modelValue", "onUpdate:modelValue"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_el_form_item, { label: "标题位置:" }, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_select, {
              modelValue: unref(fieldsOption).formItem.labelPosition,
              "onUpdate:modelValue": ($event) => unref(fieldsOption).formItem.labelPosition = $event,
              disabled: "",
              placeholder: "请选择组件标题显示位置"
            }, {
              default: withCtx((_22, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<!--[-->`);
                  ssrRenderList(unref(labelPositionOptions), (item2, index) => {
                    _push3(ssrRenderComponent(_component_el_option, {
                      key: index,
                      label: item2.label,
                      value: item2.value
                    }, null, _parent3, _scopeId2));
                  });
                  _push3(`<!--]-->`);
                } else {
                  return [
                    (openBlock(true), createBlock(Fragment, null, renderList(unref(labelPositionOptions), (item2, index) => {
                      return openBlock(), createBlock(_component_el_option, {
                        key: index,
                        label: item2.label,
                        value: item2.value
                      }, null, 8, ["label", "value"]);
                    }), 128))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_el_select, {
                modelValue: unref(fieldsOption).formItem.labelPosition,
                "onUpdate:modelValue": ($event) => unref(fieldsOption).formItem.labelPosition = $event,
                disabled: "",
                placeholder: "请选择组件标题显示位置"
              }, {
                default: withCtx(() => [
                  (openBlock(true), createBlock(Fragment, null, renderList(unref(labelPositionOptions), (item2, index) => {
                    return openBlock(), createBlock(_component_el_option, {
                      key: index,
                      label: item2.label,
                      value: item2.value
                    }, null, 8, ["label", "value"]);
                  }), 128))
                ]),
                _: 1
              }, 8, ["modelValue", "onUpdate:modelValue"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_el_form_item, { label: "表单栅格:" }, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_input, {
              modelValue: unref(fieldsOption).gridItem.span,
              "onUpdate:modelValue": ($event) => unref(fieldsOption).gridItem.span = $event,
              modelModifiers: { number: true },
              type: "number",
              placeholder: "请输入组件占比"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_el_input, {
                modelValue: unref(fieldsOption).gridItem.span,
                "onUpdate:modelValue": ($event) => unref(fieldsOption).gridItem.span = $event,
                modelModifiers: { number: true },
                type: "number",
                placeholder: "请输入组件占比"
              }, null, 8, ["modelValue", "onUpdate:modelValue"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_el_form_item, { label: "排序:" }, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_input_number, {
              modelValue: unref(fieldsOption).sort,
              "onUpdate:modelValue": ($event) => unref(fieldsOption).sort = $event,
              min: 1,
              max: 10,
              label: "描述文字"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_el_input_number, {
                modelValue: unref(fieldsOption).sort,
                "onUpdate:modelValue": ($event) => unref(fieldsOption).sort = $event,
                min: 1,
                max: 10,
                label: "描述文字"
              }, null, 8, ["modelValue", "onUpdate:modelValue"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_el_form_item, { label: "详情模式:" }, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_switch, {
              modelValue: unref(fieldsOption).isDetail,
              "onUpdate:modelValue": ($event) => unref(fieldsOption).isDetail = $event,
              disabled: "",
              "active-text": "是",
              "inactive-text": "否"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_el_switch, {
                modelValue: unref(fieldsOption).isDetail,
                "onUpdate:modelValue": ($event) => unref(fieldsOption).isDetail = $event,
                disabled: "",
                "active-text": "是",
                "inactive-text": "否"
              }, null, 8, ["modelValue", "onUpdate:modelValue"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_el_form_item, { label: "是否禁用:" }, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_switch, {
              modelValue: unref(fieldsOption).disabled,
              "onUpdate:modelValue": ($event) => unref(fieldsOption).disabled = $event,
              "active-text": "是",
              "inactive-text": "否"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_el_switch, {
                modelValue: unref(fieldsOption).disabled,
                "onUpdate:modelValue": ($event) => unref(fieldsOption).disabled = $event,
                "active-text": "是",
                "inactive-text": "否"
              }, null, 8, ["modelValue", "onUpdate:modelValue"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_el_form_item, { label: "是否可见:" }, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_switch, {
              modelValue: unref(fieldsOption).show,
              "onUpdate:modelValue": ($event) => unref(fieldsOption).show = $event,
              disabled: "",
              "active-text": "是",
              "inactive-text": "否"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_el_switch, {
                modelValue: unref(fieldsOption).show,
                "onUpdate:modelValue": ($event) => unref(fieldsOption).show = $event,
                disabled: "",
                "active-text": "是",
                "inactive-text": "否"
              }, null, 8, ["modelValue", "onUpdate:modelValue"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_el_form_item, { label: "是否必填:" }, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_switch, {
              modelValue: unref(fieldsOption).formItem.required,
              "onUpdate:modelValue": ($event) => unref(fieldsOption).formItem.required = $event,
              "active-text": "是",
              "inactive-text": "否"
            }, null, _parent2, _scopeId));
            if (unref(fieldsOption).required) {
              _push2(`<!--[-->`);
              if (showRuleOption.value) {
                _push2(`<div class="rule-box" data-v-ca513f3d${_scopeId}> 正则校验： `);
                _push2(ssrRenderComponent(_component_el_select, {
                  modelValue: unref(fieldsOption).rule,
                  "onUpdate:modelValue": ($event) => unref(fieldsOption).rule = $event,
                  multiple: ""
                }, {
                  default: withCtx((_22, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`<!--[-->`);
                      ssrRenderList(unref(ruleOptions), (item2, index) => {
                        _push3(ssrRenderComponent(_component_el_option, {
                          key: index,
                          label: item2.label,
                          value: item2.value
                        }, null, _parent3, _scopeId2));
                      });
                      _push3(`<!--]-->`);
                    } else {
                      return [
                        (openBlock(true), createBlock(Fragment, null, renderList(unref(ruleOptions), (item2, index) => {
                          return openBlock(), createBlock(_component_el_option, {
                            key: index,
                            label: item2.label,
                            value: item2.value
                          }, null, 8, ["label", "value"]);
                        }), 128))
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
                _push2(`</div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<!--]-->`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode(_component_el_switch, {
                modelValue: unref(fieldsOption).formItem.required,
                "onUpdate:modelValue": ($event) => unref(fieldsOption).formItem.required = $event,
                "active-text": "是",
                "inactive-text": "否"
              }, null, 8, ["modelValue", "onUpdate:modelValue"]),
              unref(fieldsOption).required ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                showRuleOption.value ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "rule-box"
                }, [
                  createTextVNode(" 正则校验： "),
                  createVNode(_component_el_select, {
                    modelValue: unref(fieldsOption).rule,
                    "onUpdate:modelValue": ($event) => unref(fieldsOption).rule = $event,
                    multiple: ""
                  }, {
                    default: withCtx(() => [
                      (openBlock(true), createBlock(Fragment, null, renderList(unref(ruleOptions), (item2, index) => {
                        return openBlock(), createBlock(_component_el_option, {
                          key: index,
                          label: item2.label,
                          value: item2.value
                        }, null, 8, ["label", "value"]);
                      }), 128))
                    ]),
                    _: 1
                  }, 8, ["modelValue", "onUpdate:modelValue"])
                ])) : createCommentVNode("", true)
              ], 64)) : createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
      if (!["switch", "radio-group", "checkbox-group", "upload", "slot", "rate", "slider", "tag", "colorPicker"].includes(__props2.componentType)) {
        _push(ssrRenderComponent(_component_el_form_item, { label: "一键清除:" }, {
          default: withCtx((_2, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_el_switch, {
                modelValue: unref(fieldsOption).clearable,
                "onUpdate:modelValue": ($event) => unref(fieldsOption).clearable = $event,
                "active-text": "是",
                "inactive-text": "否"
              }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_el_switch, {
                  modelValue: unref(fieldsOption).clearable,
                  "onUpdate:modelValue": ($event) => unref(fieldsOption).clearable = $event,
                  "active-text": "是",
                  "inactive-text": "否"
                }, null, 8, ["modelValue", "onUpdate:modelValue"])
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup$h = _sfc_main$h.setup;
_sfc_main$h.setup = (props2, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/factory/form/components/fieldsSetting/components/componentOption/common.option.vue");
  return _sfc_setup$h ? _sfc_setup$h(props2, ctx) : void 0;
};
const commonOption = /* @__PURE__ */ _export_sfc(_sfc_main$h, [["__scopeId", "data-v-ca513f3d"]]);
const _sfc_main$g = /* @__PURE__ */ defineComponent({
  __name: "input.setting",
  __ssrInlineRender: true,
  props: {
    fields: {
      type: Object,
      default: () => ({})
    },
    componentType: {
      type: String,
      default: "input"
    }
  },
  emits: ["update", "updateOption"],
  setup(__props2, { expose: __expose, emit: __emit2 }) {
    let props2 = __props2;
    let fieldsOption = reactive({
      placeholder: "",
      prefixContent: "",
      suffixContent: "",
      // maxlength:500,
      "show-word-limit": false
    });
    let emits2 = __emit2;
    const stopEmit = ref(false);
    function onOptionChange() {
      if (stopEmit.value)
        return;
      emits2("updateOption", fieldsOption);
    }
    function initCommonOption() {
      fieldsOption = Object.assign(fieldsOption, getOptionForField(props2.fields));
      if (stopEmit.value) {
        setTimeout(() => {
          stopEmit.value = false;
        });
      }
    }
    watch(() => props2.componentType, (val) => {
    });
    initCommonOption();
    function updateOption() {
      stopEmit.value = true;
      initCommonOption();
    }
    __expose({
      updateOption
    });
    watch(() => fieldsOption, throttle(onOptionChange, 1e3), { deep: true });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_form_item = resolveComponent("el-form-item");
      const _component_el_input = resolveComponent("el-input");
      const _component_el_switch = resolveComponent("el-switch");
      _push(`<!--[-->`);
      if (__props2.componentType === "input") {
        _push(`<!--[-->`);
        _push(ssrRenderComponent(_component_el_form_item, { label: "占位符内容:" }, {
          default: withCtx((_2, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_el_input, {
                modelValue: unref(fieldsOption).placeholder,
                "onUpdate:modelValue": ($event) => unref(fieldsOption).placeholder = $event
              }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_el_input, {
                  modelValue: unref(fieldsOption).placeholder,
                  "onUpdate:modelValue": ($event) => unref(fieldsOption).placeholder = $event
                }, null, 8, ["modelValue", "onUpdate:modelValue"])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_el_form_item, { label: "前缀内容:" }, {
          default: withCtx((_2, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_el_input, {
                modelValue: unref(fieldsOption).prefixContent,
                "onUpdate:modelValue": ($event) => unref(fieldsOption).prefixContent = $event,
                disabled: ""
              }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_el_input, {
                  modelValue: unref(fieldsOption).prefixContent,
                  "onUpdate:modelValue": ($event) => unref(fieldsOption).prefixContent = $event,
                  disabled: ""
                }, null, 8, ["modelValue", "onUpdate:modelValue"])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_el_form_item, { label: "后缀内容:" }, {
          default: withCtx((_2, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_el_input, {
                modelValue: unref(fieldsOption).suffixContent,
                "onUpdate:modelValue": ($event) => unref(fieldsOption).suffixContent = $event,
                disabled: ""
              }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_el_input, {
                  modelValue: unref(fieldsOption).suffixContent,
                  "onUpdate:modelValue": ($event) => unref(fieldsOption).suffixContent = $event,
                  disabled: ""
                }, null, 8, ["modelValue", "onUpdate:modelValue"])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_el_form_item, { label: "长度限制:" }, {
          default: withCtx((_2, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_el_input, {
                modelValue: unref(fieldsOption).maxlength,
                "onUpdate:modelValue": ($event) => unref(fieldsOption).maxlength = $event,
                modelModifiers: { number: true },
                step: "10",
                type: "number"
              }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_el_input, {
                  modelValue: unref(fieldsOption).maxlength,
                  "onUpdate:modelValue": ($event) => unref(fieldsOption).maxlength = $event,
                  modelModifiers: { number: true },
                  step: "10",
                  type: "number"
                }, null, 8, ["modelValue", "onUpdate:modelValue"])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_el_form_item, { label: "显示计数:" }, {
          default: withCtx((_2, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_el_switch, {
                modelValue: unref(fieldsOption)["show-word-limit"],
                "onUpdate:modelValue": ($event) => unref(fieldsOption)["show-word-limit"] = $event,
                "active-text": "是",
                "inactive-text": "否"
              }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_el_switch, {
                  modelValue: unref(fieldsOption)["show-word-limit"],
                  "onUpdate:modelValue": ($event) => unref(fieldsOption)["show-word-limit"] = $event,
                  "active-text": "是",
                  "inactive-text": "否"
                }, null, 8, ["modelValue", "onUpdate:modelValue"])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<!--]-->`);
      } else {
        _push(`<!---->`);
      }
      if (__props2.componentType === "input-textarea") {
        _push(`<!--[-->`);
        _push(ssrRenderComponent(_component_el_form_item, { label: "占位符内容:" }, {
          default: withCtx((_2, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_el_input, {
                modelValue: unref(fieldsOption).placeholder,
                "onUpdate:modelValue": ($event) => unref(fieldsOption).placeholder = $event
              }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_el_input, {
                  modelValue: unref(fieldsOption).placeholder,
                  "onUpdate:modelValue": ($event) => unref(fieldsOption).placeholder = $event
                }, null, 8, ["modelValue", "onUpdate:modelValue"])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_el_form_item, { label: "长度限制:" }, {
          default: withCtx((_2, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_el_input, {
                modelValue: unref(fieldsOption).maxlength,
                "onUpdate:modelValue": ($event) => unref(fieldsOption).maxlength = $event,
                modelModifiers: { number: true },
                step: "10",
                type: "number"
              }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_el_input, {
                  modelValue: unref(fieldsOption).maxlength,
                  "onUpdate:modelValue": ($event) => unref(fieldsOption).maxlength = $event,
                  modelModifiers: { number: true },
                  step: "10",
                  type: "number"
                }, null, 8, ["modelValue", "onUpdate:modelValue"])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_el_form_item, { label: "显示计数:" }, {
          default: withCtx((_2, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_el_switch, {
                modelValue: unref(fieldsOption)["show-word-limit"],
                "onUpdate:modelValue": ($event) => unref(fieldsOption)["show-word-limit"] = $event,
                "active-text": "是",
                "inactive-text": "否"
              }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_el_switch, {
                  modelValue: unref(fieldsOption)["show-word-limit"],
                  "onUpdate:modelValue": ($event) => unref(fieldsOption)["show-word-limit"] = $event,
                  "active-text": "是",
                  "inactive-text": "否"
                }, null, 8, ["modelValue", "onUpdate:modelValue"])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_el_form_item, { label: "输入框行数:" }, {
          default: withCtx((_2, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_el_input, {
                modelValue: unref(fieldsOption)["rows"],
                "onUpdate:modelValue": ($event) => unref(fieldsOption)["rows"] = $event,
                modelModifiers: { number: true },
                step: "1",
                type: "number"
              }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_el_input, {
                  modelValue: unref(fieldsOption)["rows"],
                  "onUpdate:modelValue": ($event) => unref(fieldsOption)["rows"] = $event,
                  modelModifiers: { number: true },
                  step: "1",
                  type: "number"
                }, null, 8, ["modelValue", "onUpdate:modelValue"])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<!--]-->`);
      } else {
        _push(`<!---->`);
      }
      if (__props2.componentType === "input-password") {
        _push(`<!--[-->`);
        _push(ssrRenderComponent(_component_el_form_item, { label: "占位符内容:" }, {
          default: withCtx((_2, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_el_input, {
                modelValue: unref(fieldsOption).placeholder,
                "onUpdate:modelValue": ($event) => unref(fieldsOption).placeholder = $event
              }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_el_input, {
                  modelValue: unref(fieldsOption).placeholder,
                  "onUpdate:modelValue": ($event) => unref(fieldsOption).placeholder = $event
                }, null, 8, ["modelValue", "onUpdate:modelValue"])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_el_form_item, { label: "前缀内容:" }, {
          default: withCtx((_2, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_el_input, {
                modelValue: unref(fieldsOption).prefixContent,
                "onUpdate:modelValue": ($event) => unref(fieldsOption).prefixContent = $event,
                disabled: ""
              }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_el_input, {
                  modelValue: unref(fieldsOption).prefixContent,
                  "onUpdate:modelValue": ($event) => unref(fieldsOption).prefixContent = $event,
                  disabled: ""
                }, null, 8, ["modelValue", "onUpdate:modelValue"])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_el_form_item, { label: "后缀内容:" }, {
          default: withCtx((_2, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_el_input, {
                modelValue: unref(fieldsOption).suffixContent,
                "onUpdate:modelValue": ($event) => unref(fieldsOption).suffixContent = $event,
                disabled: ""
              }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_el_input, {
                  modelValue: unref(fieldsOption).suffixContent,
                  "onUpdate:modelValue": ($event) => unref(fieldsOption).suffixContent = $event,
                  disabled: ""
                }, null, 8, ["modelValue", "onUpdate:modelValue"])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_el_form_item, { label: "长度限制:" }, {
          default: withCtx((_2, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_el_input, {
                modelValue: unref(fieldsOption).maxlength,
                "onUpdate:modelValue": ($event) => unref(fieldsOption).maxlength = $event,
                modelModifiers: { number: true },
                step: "10",
                type: "number"
              }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_el_input, {
                  modelValue: unref(fieldsOption).maxlength,
                  "onUpdate:modelValue": ($event) => unref(fieldsOption).maxlength = $event,
                  modelModifiers: { number: true },
                  step: "10",
                  type: "number"
                }, null, 8, ["modelValue", "onUpdate:modelValue"])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_el_form_item, { label: "显示计数:" }, {
          default: withCtx((_2, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_el_switch, {
                modelValue: unref(fieldsOption)["show-word-limit"],
                "onUpdate:modelValue": ($event) => unref(fieldsOption)["show-word-limit"] = $event,
                "active-text": "是",
                "inactive-text": "否"
              }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_el_switch, {
                  modelValue: unref(fieldsOption)["show-word-limit"],
                  "onUpdate:modelValue": ($event) => unref(fieldsOption)["show-word-limit"] = $event,
                  "active-text": "是",
                  "inactive-text": "否"
                }, null, 8, ["modelValue", "onUpdate:modelValue"])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_el_form_item, { label: "显示切换密码图标:" }, {
          default: withCtx((_2, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_el_switch, {
                modelValue: unref(fieldsOption)["show-password"],
                "onUpdate:modelValue": ($event) => unref(fieldsOption)["show-password"] = $event,
                "active-text": "是",
                "inactive-text": "否"
              }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_el_switch, {
                  modelValue: unref(fieldsOption)["show-password"],
                  "onUpdate:modelValue": ($event) => unref(fieldsOption)["show-password"] = $event,
                  "active-text": "是",
                  "inactive-text": "否"
                }, null, 8, ["modelValue", "onUpdate:modelValue"])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<!--]-->`);
      } else {
        _push(`<!---->`);
      }
      if (__props2.componentType === "input-number") {
        _push(`<!--[-->`);
        _push(ssrRenderComponent(_component_el_form_item, { label: "最大值:" }, {
          default: withCtx((_2, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_el_input, {
                modelValue: unref(fieldsOption)["max"],
                "onUpdate:modelValue": ($event) => unref(fieldsOption)["max"] = $event,
                modelModifiers: { number: true },
                step: "1",
                type: "number"
              }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_el_input, {
                  modelValue: unref(fieldsOption)["max"],
                  "onUpdate:modelValue": ($event) => unref(fieldsOption)["max"] = $event,
                  modelModifiers: { number: true },
                  step: "1",
                  type: "number"
                }, null, 8, ["modelValue", "onUpdate:modelValue"])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_el_form_item, { label: "最小值:" }, {
          default: withCtx((_2, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_el_input, {
                modelValue: unref(fieldsOption)["min"],
                "onUpdate:modelValue": ($event) => unref(fieldsOption)["min"] = $event,
                modelModifiers: { number: true },
                step: "1",
                type: "number"
              }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_el_input, {
                  modelValue: unref(fieldsOption)["min"],
                  "onUpdate:modelValue": ($event) => unref(fieldsOption)["min"] = $event,
                  modelModifiers: { number: true },
                  step: "1",
                  type: "number"
                }, null, 8, ["modelValue", "onUpdate:modelValue"])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_el_form_item, { label: "步长:" }, {
          default: withCtx((_2, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_el_input, {
                modelValue: unref(fieldsOption)["step"],
                "onUpdate:modelValue": ($event) => unref(fieldsOption)["step"] = $event,
                modelModifiers: { number: true },
                step: "1",
                type: "number"
              }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_el_input, {
                  modelValue: unref(fieldsOption)["step"],
                  "onUpdate:modelValue": ($event) => unref(fieldsOption)["step"] = $event,
                  modelModifiers: { number: true },
                  step: "1",
                  type: "number"
                }, null, 8, ["modelValue", "onUpdate:modelValue"])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_el_form_item, { label: "精度:" }, {
          default: withCtx((_2, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_el_input, {
                modelValue: unref(fieldsOption)["precision"],
                "onUpdate:modelValue": ($event) => unref(fieldsOption)["precision"] = $event,
                modelModifiers: { number: true },
                step: "1",
                type: "number"
              }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_el_input, {
                  modelValue: unref(fieldsOption)["precision"],
                  "onUpdate:modelValue": ($event) => unref(fieldsOption)["precision"] = $event,
                  modelModifiers: { number: true },
                  step: "1",
                  type: "number"
                }, null, 8, ["modelValue", "onUpdate:modelValue"])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<!--]-->`);
      } else {
        _push(`<!---->`);
      }
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup$g = _sfc_main$g.setup;
_sfc_main$g.setup = (props2, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/factory/form/components/fieldsSetting/components/componentOption/input.setting.vue");
  return _sfc_setup$g ? _sfc_setup$g(props2, ctx) : void 0;
};
const _sfc_main$f = /* @__PURE__ */ defineComponent({
  __name: "select.setting",
  __ssrInlineRender: true,
  props: {
    fields: {
      type: Object,
      default: () => ({})
    },
    componentType: {
      type: String,
      default: "input"
    }
  },
  emits: ["update", "updateOption"],
  setup(__props2, { expose: __expose, emit: __emit2 }) {
    let props2 = __props2;
    let state2 = reactive({
      show: false,
      nodeForm: {
        label: "",
        value: ""
      },
      path: "",
      activeNode: {},
      inputType: "string"
    });
    let fieldsOption = reactive({
      placeholder: "",
      multiple: false,
      // 多选
      filterable: false,
      // 搜索
      options: [],
      // 下拉子选项
      optionType: "static",
      keyConfig: {
        labelKey: "name",
        valueKey: "id",
        childrenKey: "children"
      },
      props: {
        multiple: false,
        checkStrictly: false
      },
      dynamicConfig: {
        sourceType: "chooseType",
        dataType: "",
        id: "",
        label: "name",
        value: "id",
        children: "children"
      },
      // 选项的配置
      childrenProps: {
        border: false,
        size: ""
      }
    });
    const settingOptions = ref([]);
    let emits2 = __emit2;
    const stopEmit = ref(false);
    function onOptionChange() {
      if (stopEmit.value)
        return;
      fieldsOption.options = settingOptions.value;
      emits2("updateOption", fieldsOption);
    }
    function addCascaderOptionItem(data, path = "root") {
      state2.path = path;
      state2.activeNode = data;
      state2.show = true;
    }
    function onClose() {
      state2.show = false;
      state2.nodeForm.label = "";
      state2.nodeForm.value = "";
    }
    function saveCascaderOptionItem() {
      let item2 = {
        [fieldsOption.dynamicConfig.label]: state2.nodeForm.label,
        [fieldsOption.dynamicConfig.value]: state2.nodeForm.value,
        [fieldsOption.dynamicConfig.children]: []
      };
      if (state2.path === "root") {
        settingOptions.value.push(item2);
      } else {
        state2.activeNode[fieldsOption.dynamicConfig.children] = state2.activeNode[fieldsOption.dynamicConfig.children] || [];
        state2.activeNode[fieldsOption.dynamicConfig.children].push(item2);
      }
      onClose();
    }
    function remove(node2, data) {
      let index = node2.parent.data.findIndex((childrenItem) => {
        return childrenItem.$treeNodeId === node2.id;
      });
      node2.parent.data.splice(index, 1);
    }
    const renderContent = (h2, {
      node: node2,
      data,
      store
    }) => {
      return h2(
        "span",
        {
          class: "custom-tree-node"
        },
        h2("span", {
          class: "node-label"
        }, data[fieldsOption.dynamicConfig.label]),
        h2(
          "span",
          null,
          h2(
            "a",
            {
              onClick: () => addCascaderOptionItem(data, "children")
            },
            "添加 "
          ),
          h2(
            "a",
            {
              style: "margin-left: 8px",
              onClick: () => remove(node2)
            },
            "删除"
          )
        )
      );
    };
    function initCommonOption() {
      fieldsOption = Object.assign(fieldsOption, getOptionForField(props2.fields));
      settingOptions.value = fieldsOption.options;
      if (stopEmit.value) {
        setTimeout(() => {
          stopEmit.value = false;
        });
      }
    }
    watch(() => props2.componentType, (val) => {
      updateOption();
    });
    initCommonOption();
    watch(() => fieldsOption, throttle(onOptionChange, 2e3), { deep: true });
    function updateOption() {
      stopEmit.value = true;
      initCommonOption();
    }
    function addOptionItem() {
      let item2 = {
        [fieldsOption.dynamicConfig.label]: "",
        [fieldsOption.dynamicConfig.value]: ""
      };
      settingOptions.value.push(item2);
    }
    function onDelete(index) {
      settingOptions.value.splice(index, 1);
    }
    __expose({
      updateOption
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_form_item = resolveComponent("el-form-item");
      const _component_el_input = resolveComponent("el-input");
      const _component_el_switch = resolveComponent("el-switch");
      const _component_el_radio_group = resolveComponent("el-radio-group");
      const _component_el_radio = resolveComponent("el-radio");
      const _component_el_button = resolveComponent("el-button");
      const _component_el_select = resolveComponent("el-select");
      const _component_el_option = resolveComponent("el-option");
      const _component_el_radio_button = resolveComponent("el-radio-button");
      const _component_el_dialog = resolveComponent("el-dialog");
      const _component_el_form = resolveComponent("el-form");
      _push(`<!--[-->`);
      if (__props2.componentType === "select") {
        _push(`<!--[-->`);
        _push(ssrRenderComponent(_component_el_form_item, { label: "占位符内容:" }, {
          default: withCtx((_2, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_el_input, {
                modelValue: unref(fieldsOption).placeholder,
                "onUpdate:modelValue": ($event) => unref(fieldsOption).placeholder = $event,
                placeholder: "请输入占位符内容"
              }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_el_input, {
                  modelValue: unref(fieldsOption).placeholder,
                  "onUpdate:modelValue": ($event) => unref(fieldsOption).placeholder = $event,
                  placeholder: "请输入占位符内容"
                }, null, 8, ["modelValue", "onUpdate:modelValue"])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_el_form_item, { label: "是否多选:" }, {
          default: withCtx((_2, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_el_switch, {
                modelValue: unref(fieldsOption)["multiple"],
                "onUpdate:modelValue": ($event) => unref(fieldsOption)["multiple"] = $event,
                "active-text": "是",
                "inactive-text": "否"
              }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_el_switch, {
                  modelValue: unref(fieldsOption)["multiple"],
                  "onUpdate:modelValue": ($event) => unref(fieldsOption)["multiple"] = $event,
                  "active-text": "是",
                  "inactive-text": "否"
                }, null, 8, ["modelValue", "onUpdate:modelValue"])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_el_form_item, { label: "是否可搜索:" }, {
          default: withCtx((_2, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_el_switch, {
                modelValue: unref(fieldsOption)["filterable"],
                "onUpdate:modelValue": ($event) => unref(fieldsOption)["filterable"] = $event,
                "active-text": "是",
                "inactive-text": "否"
              }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_el_switch, {
                  modelValue: unref(fieldsOption)["filterable"],
                  "onUpdate:modelValue": ($event) => unref(fieldsOption)["filterable"] = $event,
                  "active-text": "是",
                  "inactive-text": "否"
                }, null, 8, ["modelValue", "onUpdate:modelValue"])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_el_form_item, { label: "字典Key配置:" }, {
          default: withCtx((_2, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="option-data-box" data-v-5ee541fa${_scopeId}>`);
              _push2(ssrRenderComponent(_component_el_form_item, { label: "label-key值:" }, {
                default: withCtx((_22, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_el_input, {
                      modelValue: unref(fieldsOption).dynamicConfig.label,
                      "onUpdate:modelValue": ($event) => unref(fieldsOption).dynamicConfig.label = $event,
                      placeholder: "请输入需要转化的Key值"
                    }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_el_input, {
                        modelValue: unref(fieldsOption).dynamicConfig.label,
                        "onUpdate:modelValue": ($event) => unref(fieldsOption).dynamicConfig.label = $event,
                        placeholder: "请输入需要转化的Key值"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_el_form_item, { label: "value-key值:" }, {
                default: withCtx((_22, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_el_input, {
                      modelValue: unref(fieldsOption).dynamicConfig.value,
                      "onUpdate:modelValue": ($event) => unref(fieldsOption).dynamicConfig.value = $event,
                      placeholder: "请输入需要转化的Key值"
                    }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_el_input, {
                        modelValue: unref(fieldsOption).dynamicConfig.value,
                        "onUpdate:modelValue": ($event) => unref(fieldsOption).dynamicConfig.value = $event,
                        placeholder: "请输入需要转化的Key值"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_el_form_item, { label: "children-key值:" }, {
                default: withCtx((_22, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_el_input, {
                      modelValue: unref(fieldsOption).dynamicConfig.children,
                      "onUpdate:modelValue": ($event) => unref(fieldsOption).dynamicConfig.children = $event,
                      placeholder: "请输入需要转化的Key值"
                    }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_el_input, {
                        modelValue: unref(fieldsOption).dynamicConfig.children,
                        "onUpdate:modelValue": ($event) => unref(fieldsOption).dynamicConfig.children = $event,
                        placeholder: "请输入需要转化的Key值"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              return [
                createVNode("div", { class: "option-data-box" }, [
                  createVNode(_component_el_form_item, { label: "label-key值:" }, {
                    default: withCtx(() => [
                      createVNode(_component_el_input, {
                        modelValue: unref(fieldsOption).dynamicConfig.label,
                        "onUpdate:modelValue": ($event) => unref(fieldsOption).dynamicConfig.label = $event,
                        placeholder: "请输入需要转化的Key值"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_el_form_item, { label: "value-key值:" }, {
                    default: withCtx(() => [
                      createVNode(_component_el_input, {
                        modelValue: unref(fieldsOption).dynamicConfig.value,
                        "onUpdate:modelValue": ($event) => unref(fieldsOption).dynamicConfig.value = $event,
                        placeholder: "请输入需要转化的Key值"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_el_form_item, { label: "children-key值:" }, {
                    default: withCtx(() => [
                      createVNode(_component_el_input, {
                        modelValue: unref(fieldsOption).dynamicConfig.children,
                        "onUpdate:modelValue": ($event) => unref(fieldsOption).dynamicConfig.children = $event,
                        placeholder: "请输入需要转化的Key值"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  })
                ])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_el_form_item, { label: "选项数据:" }, {
          default: withCtx((_2, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="option-data-box" data-v-5ee541fa${_scopeId}>`);
              _push2(ssrRenderComponent(_component_el_radio_group, {
                modelValue: unref(fieldsOption).optionType,
                "onUpdate:modelValue": ($event) => unref(fieldsOption).optionType = $event
              }, {
                default: withCtx((_22, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_el_radio, { label: "static" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`静态数据`);
                        } else {
                          return [
                            createTextVNode("静态数据")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_el_radio, { label: "dynamic" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`远端获取`);
                        } else {
                          return [
                            createTextVNode("远端获取")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_el_radio, { label: "static" }, {
                        default: withCtx(() => [
                          createTextVNode("静态数据")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_el_radio, { label: "dynamic" }, {
                        default: withCtx(() => [
                          createTextVNode("远端获取")
                        ]),
                        _: 1
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              if (unref(fieldsOption).optionType === "static") {
                _push2(`<!--[--><div data-v-5ee541fa${_scopeId}>`);
                _push2(ssrRenderComponent(_component_el_button, {
                  type: "primary",
                  onClick: addOptionItem
                }, {
                  default: withCtx((_22, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`新增选项`);
                    } else {
                      return [
                        createTextVNode("新增选项")
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
                _push2(`</div><div class="option-list" data-v-5ee541fa${_scopeId}><div class="option-item" data-v-5ee541fa${_scopeId}><div class="label" data-v-5ee541fa${_scopeId}>名称</div><div class="value" data-v-5ee541fa${_scopeId}>数值</div></div><!--[-->`);
                ssrRenderList(settingOptions.value, (item2, index) => {
                  _push2(`<div class="option-item" data-v-5ee541fa${_scopeId}><div class="delete" data-v-5ee541fa${_scopeId}>删除</div><div class="label" data-v-5ee541fa${_scopeId}>`);
                  _push2(ssrRenderComponent(_component_el_input, {
                    modelValue: item2[unref(fieldsOption).dynamicConfig.label],
                    "onUpdate:modelValue": ($event) => item2[unref(fieldsOption).dynamicConfig.label] = $event,
                    placeholder: "请输入选项名称"
                  }, null, _parent2, _scopeId));
                  _push2(`</div><div class="value" data-v-5ee541fa${_scopeId}>`);
                  _push2(ssrRenderComponent(_component_el_input, {
                    modelValue: item2[unref(fieldsOption).dynamicConfig.value],
                    "onUpdate:modelValue": ($event) => item2[unref(fieldsOption).dynamicConfig.value] = $event,
                    placeholder: "请输入选项数值"
                  }, null, _parent2, _scopeId));
                  _push2(`</div></div>`);
                });
                _push2(`<!--]--></div><!--]-->`);
              } else {
                _push2(`<!--[-->`);
                _push2(ssrRenderComponent(_component_el_form_item, { label: "数据源" }, {
                  default: withCtx((_22, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(ssrRenderComponent(_component_el_select, {
                        modelValue: unref(fieldsOption).dynamicConfig.sourceType,
                        "onUpdate:modelValue": ($event) => unref(fieldsOption).dynamicConfig.sourceType = $event,
                        placeholder: "请输入数据来源方式"
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(ssrRenderComponent(_component_el_option, {
                              label: "内部约定接口",
                              value: "chooseType"
                            }, null, _parent4, _scopeId3));
                            _push4(ssrRenderComponent(_component_el_option, {
                              label: "node项目维护",
                              value: "node"
                            }, null, _parent4, _scopeId3));
                          } else {
                            return [
                              createVNode(_component_el_option, {
                                label: "内部约定接口",
                                value: "chooseType"
                              }),
                              createVNode(_component_el_option, {
                                label: "node项目维护",
                                value: "node"
                              })
                            ];
                          }
                        }),
                        _: 1
                      }, _parent3, _scopeId2));
                    } else {
                      return [
                        createVNode(_component_el_select, {
                          modelValue: unref(fieldsOption).dynamicConfig.sourceType,
                          "onUpdate:modelValue": ($event) => unref(fieldsOption).dynamicConfig.sourceType = $event,
                          placeholder: "请输入数据来源方式"
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_el_option, {
                              label: "内部约定接口",
                              value: "chooseType"
                            }),
                            createVNode(_component_el_option, {
                              label: "node项目维护",
                              value: "node"
                            })
                          ]),
                          _: 1
                        }, 8, ["modelValue", "onUpdate:modelValue"])
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
                _push2(ssrRenderComponent(_component_el_form_item, { label: "字典类型" }, {
                  default: withCtx((_22, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(ssrRenderComponent(_component_el_input, {
                        modelValue: unref(fieldsOption).dynamicConfig.id,
                        "onUpdate:modelValue": ($event) => unref(fieldsOption).dynamicConfig.id = $event,
                        placeholder: "请输入字典类型"
                      }, null, _parent3, _scopeId2));
                    } else {
                      return [
                        createVNode(_component_el_input, {
                          modelValue: unref(fieldsOption).dynamicConfig.id,
                          "onUpdate:modelValue": ($event) => unref(fieldsOption).dynamicConfig.id = $event,
                          placeholder: "请输入字典类型"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
                _push2(`<!--]-->`);
              }
              _push2(`</div>`);
            } else {
              return [
                createVNode("div", { class: "option-data-box" }, [
                  createVNode(_component_el_radio_group, {
                    modelValue: unref(fieldsOption).optionType,
                    "onUpdate:modelValue": ($event) => unref(fieldsOption).optionType = $event
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_el_radio, { label: "static" }, {
                        default: withCtx(() => [
                          createTextVNode("静态数据")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_el_radio, { label: "dynamic" }, {
                        default: withCtx(() => [
                          createTextVNode("远端获取")
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }, 8, ["modelValue", "onUpdate:modelValue"]),
                  unref(fieldsOption).optionType === "static" ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                    createVNode("div", null, [
                      createVNode(_component_el_button, {
                        type: "primary",
                        onClick: addOptionItem
                      }, {
                        default: withCtx(() => [
                          createTextVNode("新增选项")
                        ]),
                        _: 1
                      })
                    ]),
                    createVNode("div", { class: "option-list" }, [
                      createVNode("div", { class: "option-item" }, [
                        createVNode("div", { class: "label" }, "名称"),
                        createVNode("div", { class: "value" }, "数值")
                      ]),
                      (openBlock(true), createBlock(Fragment, null, renderList(settingOptions.value, (item2, index) => {
                        return openBlock(), createBlock("div", {
                          key: index,
                          class: "option-item"
                        }, [
                          createVNode("div", {
                            class: "delete",
                            onClick: ($event) => onDelete(index)
                          }, "删除", 8, ["onClick"]),
                          createVNode("div", { class: "label" }, [
                            createVNode(_component_el_input, {
                              modelValue: item2[unref(fieldsOption).dynamicConfig.label],
                              "onUpdate:modelValue": ($event) => item2[unref(fieldsOption).dynamicConfig.label] = $event,
                              placeholder: "请输入选项名称"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          createVNode("div", { class: "value" }, [
                            createVNode(_component_el_input, {
                              modelValue: item2[unref(fieldsOption).dynamicConfig.value],
                              "onUpdate:modelValue": ($event) => item2[unref(fieldsOption).dynamicConfig.value] = $event,
                              placeholder: "请输入选项数值"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ])
                        ]);
                      }), 128))
                    ])
                  ], 64)) : (openBlock(), createBlock(Fragment, { key: 1 }, [
                    createVNode(_component_el_form_item, { label: "数据源" }, {
                      default: withCtx(() => [
                        createVNode(_component_el_select, {
                          modelValue: unref(fieldsOption).dynamicConfig.sourceType,
                          "onUpdate:modelValue": ($event) => unref(fieldsOption).dynamicConfig.sourceType = $event,
                          placeholder: "请输入数据来源方式"
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_el_option, {
                              label: "内部约定接口",
                              value: "chooseType"
                            }),
                            createVNode(_component_el_option, {
                              label: "node项目维护",
                              value: "node"
                            })
                          ]),
                          _: 1
                        }, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_form_item, { label: "字典类型" }, {
                      default: withCtx(() => [
                        createVNode(_component_el_input, {
                          modelValue: unref(fieldsOption).dynamicConfig.id,
                          "onUpdate:modelValue": ($event) => unref(fieldsOption).dynamicConfig.id = $event,
                          placeholder: "请输入字典类型"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    })
                  ], 64))
                ])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<!--]-->`);
      } else {
        _push(`<!---->`);
      }
      if (__props2.componentType === "checkbox-group" || __props2.componentType === "radio-group") {
        _push(`<!--[-->`);
        _push(ssrRenderComponent(_component_el_form_item, { label: "边框:" }, {
          default: withCtx((_2, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_el_switch, {
                modelValue: unref(fieldsOption).childrenProps.border,
                "onUpdate:modelValue": ($event) => unref(fieldsOption).childrenProps.border = $event,
                "active-text": "是",
                "inactive-text": "否",
                "inactive-value": false,
                "active-value": true
              }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_el_switch, {
                  modelValue: unref(fieldsOption).childrenProps.border,
                  "onUpdate:modelValue": ($event) => unref(fieldsOption).childrenProps.border = $event,
                  "active-text": "是",
                  "inactive-text": "否",
                  "inactive-value": false,
                  "active-value": true
                }, null, 8, ["modelValue", "onUpdate:modelValue"])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_el_form_item, { label: "尺寸:" }, {
          default: withCtx((_2, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_el_radio_group, {
                modelValue: unref(fieldsOption).childrenProps.size,
                "onUpdate:modelValue": ($event) => unref(fieldsOption).childrenProps.size = $event
              }, {
                default: withCtx((_22, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_el_radio_button, { label: "" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`正常`);
                        } else {
                          return [
                            createTextVNode("正常")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_el_radio_button, { label: "large" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`大`);
                        } else {
                          return [
                            createTextVNode("大")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_el_radio_button, { label: "small" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`小`);
                        } else {
                          return [
                            createTextVNode("小")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_el_radio_button, { label: "" }, {
                        default: withCtx(() => [
                          createTextVNode("正常")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_el_radio_button, { label: "large" }, {
                        default: withCtx(() => [
                          createTextVNode("大")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_el_radio_button, { label: "small" }, {
                        default: withCtx(() => [
                          createTextVNode("小")
                        ]),
                        _: 1
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_el_radio_group, {
                  modelValue: unref(fieldsOption).childrenProps.size,
                  "onUpdate:modelValue": ($event) => unref(fieldsOption).childrenProps.size = $event
                }, {
                  default: withCtx(() => [
                    createVNode(_component_el_radio_button, { label: "" }, {
                      default: withCtx(() => [
                        createTextVNode("正常")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_radio_button, { label: "large" }, {
                      default: withCtx(() => [
                        createTextVNode("大")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_radio_button, { label: "small" }, {
                      default: withCtx(() => [
                        createTextVNode("小")
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }, 8, ["modelValue", "onUpdate:modelValue"])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_el_form_item, { label: "字典Key配置:" }, {
          default: withCtx((_2, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="option-data-box" data-v-5ee541fa${_scopeId}>`);
              _push2(ssrRenderComponent(_component_el_form_item, { label: "label-key值:" }, {
                default: withCtx((_22, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_el_input, {
                      modelValue: unref(fieldsOption).dynamicConfig.label,
                      "onUpdate:modelValue": ($event) => unref(fieldsOption).dynamicConfig.label = $event,
                      placeholder: "请输入需要转化的Key值"
                    }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_el_input, {
                        modelValue: unref(fieldsOption).dynamicConfig.label,
                        "onUpdate:modelValue": ($event) => unref(fieldsOption).dynamicConfig.label = $event,
                        placeholder: "请输入需要转化的Key值"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_el_form_item, { label: "value-key值:" }, {
                default: withCtx((_22, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_el_input, {
                      modelValue: unref(fieldsOption).dynamicConfig.value,
                      "onUpdate:modelValue": ($event) => unref(fieldsOption).dynamicConfig.value = $event,
                      placeholder: "请输入需要转化的Key值"
                    }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_el_input, {
                        modelValue: unref(fieldsOption).dynamicConfig.value,
                        "onUpdate:modelValue": ($event) => unref(fieldsOption).dynamicConfig.value = $event,
                        placeholder: "请输入需要转化的Key值"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              return [
                createVNode("div", { class: "option-data-box" }, [
                  createVNode(_component_el_form_item, { label: "label-key值:" }, {
                    default: withCtx(() => [
                      createVNode(_component_el_input, {
                        modelValue: unref(fieldsOption).dynamicConfig.label,
                        "onUpdate:modelValue": ($event) => unref(fieldsOption).dynamicConfig.label = $event,
                        placeholder: "请输入需要转化的Key值"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_el_form_item, { label: "value-key值:" }, {
                    default: withCtx(() => [
                      createVNode(_component_el_input, {
                        modelValue: unref(fieldsOption).dynamicConfig.value,
                        "onUpdate:modelValue": ($event) => unref(fieldsOption).dynamicConfig.value = $event,
                        placeholder: "请输入需要转化的Key值"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  })
                ])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_el_form_item, { label: "选项数据:" }, {
          default: withCtx((_2, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="option-data-box" data-v-5ee541fa${_scopeId}>`);
              _push2(ssrRenderComponent(_component_el_radio_group, {
                modelValue: unref(fieldsOption).optionType,
                "onUpdate:modelValue": ($event) => unref(fieldsOption).optionType = $event
              }, {
                default: withCtx((_22, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_el_radio, { label: "static" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`静态数据`);
                        } else {
                          return [
                            createTextVNode("静态数据")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_el_radio, { label: "dynamic" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`远端获取`);
                        } else {
                          return [
                            createTextVNode("远端获取")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_el_radio, { label: "static" }, {
                        default: withCtx(() => [
                          createTextVNode("静态数据")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_el_radio, { label: "dynamic" }, {
                        default: withCtx(() => [
                          createTextVNode("远端获取")
                        ]),
                        _: 1
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              if (unref(fieldsOption).optionType === "static") {
                _push2(`<!--[--><div data-v-5ee541fa${_scopeId}>`);
                _push2(ssrRenderComponent(_component_el_button, {
                  type: "primary",
                  onClick: addOptionItem
                }, {
                  default: withCtx((_22, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`新增选项`);
                    } else {
                      return [
                        createTextVNode("新增选项")
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
                _push2(`</div><div class="option-list" data-v-5ee541fa${_scopeId}><div class="option-item" data-v-5ee541fa${_scopeId}><div class="label" data-v-5ee541fa${_scopeId}>名称</div><div class="value" data-v-5ee541fa${_scopeId}>数值</div></div><!--[-->`);
                ssrRenderList(settingOptions.value, (item2, index) => {
                  _push2(`<div class="option-item" data-v-5ee541fa${_scopeId}><div class="delete" data-v-5ee541fa${_scopeId}>删除</div><div class="label" data-v-5ee541fa${_scopeId}>`);
                  _push2(ssrRenderComponent(_component_el_input, {
                    modelValue: item2[unref(fieldsOption).dynamicConfig.label],
                    "onUpdate:modelValue": ($event) => item2[unref(fieldsOption).dynamicConfig.label] = $event,
                    placeholder: "请输入选项名称"
                  }, null, _parent2, _scopeId));
                  _push2(`</div><div class="value" data-v-5ee541fa${_scopeId}>`);
                  _push2(ssrRenderComponent(_component_el_input, {
                    modelValue: item2[unref(fieldsOption).dynamicConfig.value],
                    "onUpdate:modelValue": ($event) => item2[unref(fieldsOption).dynamicConfig.value] = $event,
                    placeholder: "请输入选项数值"
                  }, null, _parent2, _scopeId));
                  _push2(`</div></div>`);
                });
                _push2(`<!--]--></div><!--]-->`);
              } else {
                _push2(`<!--[-->`);
                _push2(ssrRenderComponent(_component_el_form_item, { label: "数据源" }, {
                  default: withCtx((_22, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(ssrRenderComponent(_component_el_select, {
                        modelValue: unref(fieldsOption).dynamicConfig.sourceType,
                        "onUpdate:modelValue": ($event) => unref(fieldsOption).dynamicConfig.sourceType = $event,
                        placeholder: "请输入数据来源方式"
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(ssrRenderComponent(_component_el_option, {
                              label: "内部约定接口",
                              value: "chooseType"
                            }, null, _parent4, _scopeId3));
                            _push4(ssrRenderComponent(_component_el_option, {
                              label: "node项目维护",
                              value: "node"
                            }, null, _parent4, _scopeId3));
                          } else {
                            return [
                              createVNode(_component_el_option, {
                                label: "内部约定接口",
                                value: "chooseType"
                              }),
                              createVNode(_component_el_option, {
                                label: "node项目维护",
                                value: "node"
                              })
                            ];
                          }
                        }),
                        _: 1
                      }, _parent3, _scopeId2));
                    } else {
                      return [
                        createVNode(_component_el_select, {
                          modelValue: unref(fieldsOption).dynamicConfig.sourceType,
                          "onUpdate:modelValue": ($event) => unref(fieldsOption).dynamicConfig.sourceType = $event,
                          placeholder: "请输入数据来源方式"
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_el_option, {
                              label: "内部约定接口",
                              value: "chooseType"
                            }),
                            createVNode(_component_el_option, {
                              label: "node项目维护",
                              value: "node"
                            })
                          ]),
                          _: 1
                        }, 8, ["modelValue", "onUpdate:modelValue"])
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
                _push2(ssrRenderComponent(_component_el_form_item, { label: "字典类型" }, {
                  default: withCtx((_22, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(ssrRenderComponent(_component_el_input, {
                        modelValue: unref(fieldsOption).dynamicConfig.id,
                        "onUpdate:modelValue": ($event) => unref(fieldsOption).dynamicConfig.id = $event,
                        placeholder: "请输入字典类型"
                      }, null, _parent3, _scopeId2));
                    } else {
                      return [
                        createVNode(_component_el_input, {
                          modelValue: unref(fieldsOption).dynamicConfig.id,
                          "onUpdate:modelValue": ($event) => unref(fieldsOption).dynamicConfig.id = $event,
                          placeholder: "请输入字典类型"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
                _push2(`<!--]-->`);
              }
              _push2(`</div>`);
            } else {
              return [
                createVNode("div", { class: "option-data-box" }, [
                  createVNode(_component_el_radio_group, {
                    modelValue: unref(fieldsOption).optionType,
                    "onUpdate:modelValue": ($event) => unref(fieldsOption).optionType = $event
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_el_radio, { label: "static" }, {
                        default: withCtx(() => [
                          createTextVNode("静态数据")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_el_radio, { label: "dynamic" }, {
                        default: withCtx(() => [
                          createTextVNode("远端获取")
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }, 8, ["modelValue", "onUpdate:modelValue"]),
                  unref(fieldsOption).optionType === "static" ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                    createVNode("div", null, [
                      createVNode(_component_el_button, {
                        type: "primary",
                        onClick: addOptionItem
                      }, {
                        default: withCtx(() => [
                          createTextVNode("新增选项")
                        ]),
                        _: 1
                      })
                    ]),
                    createVNode("div", { class: "option-list" }, [
                      createVNode("div", { class: "option-item" }, [
                        createVNode("div", { class: "label" }, "名称"),
                        createVNode("div", { class: "value" }, "数值")
                      ]),
                      (openBlock(true), createBlock(Fragment, null, renderList(settingOptions.value, (item2, index) => {
                        return openBlock(), createBlock("div", {
                          key: index,
                          class: "option-item"
                        }, [
                          createVNode("div", {
                            class: "delete",
                            onClick: ($event) => onDelete(index)
                          }, "删除", 8, ["onClick"]),
                          createVNode("div", { class: "label" }, [
                            createVNode(_component_el_input, {
                              modelValue: item2[unref(fieldsOption).dynamicConfig.label],
                              "onUpdate:modelValue": ($event) => item2[unref(fieldsOption).dynamicConfig.label] = $event,
                              placeholder: "请输入选项名称"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          createVNode("div", { class: "value" }, [
                            createVNode(_component_el_input, {
                              modelValue: item2[unref(fieldsOption).dynamicConfig.value],
                              "onUpdate:modelValue": ($event) => item2[unref(fieldsOption).dynamicConfig.value] = $event,
                              placeholder: "请输入选项数值"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ])
                        ]);
                      }), 128))
                    ])
                  ], 64)) : (openBlock(), createBlock(Fragment, { key: 1 }, [
                    createVNode(_component_el_form_item, { label: "数据源" }, {
                      default: withCtx(() => [
                        createVNode(_component_el_select, {
                          modelValue: unref(fieldsOption).dynamicConfig.sourceType,
                          "onUpdate:modelValue": ($event) => unref(fieldsOption).dynamicConfig.sourceType = $event,
                          placeholder: "请输入数据来源方式"
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_el_option, {
                              label: "内部约定接口",
                              value: "chooseType"
                            }),
                            createVNode(_component_el_option, {
                              label: "node项目维护",
                              value: "node"
                            })
                          ]),
                          _: 1
                        }, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_form_item, { label: "字典类型" }, {
                      default: withCtx(() => [
                        createVNode(_component_el_input, {
                          modelValue: unref(fieldsOption).dynamicConfig.id,
                          "onUpdate:modelValue": ($event) => unref(fieldsOption).dynamicConfig.id = $event,
                          placeholder: "请输入字典类型"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    })
                  ], 64))
                ])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<!--]-->`);
      } else {
        _push(`<!---->`);
      }
      if (__props2.componentType === "switch") {
        _push(ssrRenderComponent(_component_el_form_item, { label: "自定义:" }, {
          default: withCtx((_2, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="switch-group" data-v-5ee541fa${_scopeId}><span data-v-5ee541fa${_scopeId}>打开时</span>`);
              _push2(ssrRenderComponent(_component_el_input, {
                modelValue: unref(fieldsOption)["active-text"],
                "onUpdate:modelValue": ($event) => unref(fieldsOption)["active-text"] = $event,
                placeholder: "请输入打开时的名称"
              }, null, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_el_input, {
                modelValue: unref(fieldsOption)["active-value"],
                "onUpdate:modelValue": ($event) => unref(fieldsOption)["active-value"] = $event,
                placeholder: "请输入打开时的数值"
              }, null, _parent2, _scopeId));
              _push2(`</div><div class="switch-group" data-v-5ee541fa${_scopeId}><span data-v-5ee541fa${_scopeId}>关闭时</span>`);
              _push2(ssrRenderComponent(_component_el_input, {
                modelValue: unref(fieldsOption)["inactive-text"],
                "onUpdate:modelValue": ($event) => unref(fieldsOption)["inactive-text"] = $event,
                placeholder: "请输入关闭时的名称"
              }, null, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_el_input, {
                modelValue: unref(fieldsOption)["inactive-value"],
                "onUpdate:modelValue": ($event) => unref(fieldsOption)["inactive-value"] = $event,
                placeholder: "请输入关闭时的数值"
              }, null, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              return [
                createVNode("div", { class: "switch-group" }, [
                  createVNode("span", null, "打开时"),
                  createVNode(_component_el_input, {
                    modelValue: unref(fieldsOption)["active-text"],
                    "onUpdate:modelValue": ($event) => unref(fieldsOption)["active-text"] = $event,
                    placeholder: "请输入打开时的名称"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                  createVNode(_component_el_input, {
                    modelValue: unref(fieldsOption)["active-value"],
                    "onUpdate:modelValue": ($event) => unref(fieldsOption)["active-value"] = $event,
                    placeholder: "请输入打开时的数值"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                createVNode("div", { class: "switch-group" }, [
                  createVNode("span", null, "关闭时"),
                  createVNode(_component_el_input, {
                    modelValue: unref(fieldsOption)["inactive-text"],
                    "onUpdate:modelValue": ($event) => unref(fieldsOption)["inactive-text"] = $event,
                    placeholder: "请输入关闭时的名称"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                  createVNode(_component_el_input, {
                    modelValue: unref(fieldsOption)["inactive-value"],
                    "onUpdate:modelValue": ($event) => unref(fieldsOption)["inactive-value"] = $event,
                    placeholder: "请输入关闭时的数值"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ])
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      if (__props2.componentType === "cascader") {
        _push(`<!--[-->`);
        _push(ssrRenderComponent(_component_el_form_item, { label: "占位符内容:" }, {
          default: withCtx((_2, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_el_input, {
                modelValue: unref(fieldsOption).placeholder,
                "onUpdate:modelValue": ($event) => unref(fieldsOption).placeholder = $event,
                placeholder: "请输入占位符内容"
              }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_el_input, {
                  modelValue: unref(fieldsOption).placeholder,
                  "onUpdate:modelValue": ($event) => unref(fieldsOption).placeholder = $event,
                  placeholder: "请输入占位符内容"
                }, null, 8, ["modelValue", "onUpdate:modelValue"])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_el_form_item, { label: "是否多选:" }, {
          default: withCtx((_2, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_el_switch, {
                modelValue: unref(fieldsOption).props.multiple,
                "onUpdate:modelValue": ($event) => unref(fieldsOption).props.multiple = $event,
                "active-text": "是",
                "inactive-text": "否"
              }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_el_switch, {
                  modelValue: unref(fieldsOption).props.multiple,
                  "onUpdate:modelValue": ($event) => unref(fieldsOption).props.multiple = $event,
                  "active-text": "是",
                  "inactive-text": "否"
                }, null, 8, ["modelValue", "onUpdate:modelValue"])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_el_form_item, { label: "是否可搜索:" }, {
          default: withCtx((_2, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_el_switch, {
                modelValue: unref(fieldsOption)["filterable"],
                "onUpdate:modelValue": ($event) => unref(fieldsOption)["filterable"] = $event,
                "active-text": "是",
                "inactive-text": "否"
              }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_el_switch, {
                  modelValue: unref(fieldsOption)["filterable"],
                  "onUpdate:modelValue": ($event) => unref(fieldsOption)["filterable"] = $event,
                  "active-text": "是",
                  "inactive-text": "否"
                }, null, 8, ["modelValue", "onUpdate:modelValue"])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_el_form_item, { label: "显示完整路径:" }, {
          default: withCtx((_2, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_el_switch, {
                modelValue: unref(fieldsOption)["show-all-levels"],
                "onUpdate:modelValue": ($event) => unref(fieldsOption)["show-all-levels"] = $event,
                "active-text": "是",
                "inactive-text": "否"
              }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_el_switch, {
                  modelValue: unref(fieldsOption)["show-all-levels"],
                  "onUpdate:modelValue": ($event) => unref(fieldsOption)["show-all-levels"] = $event,
                  "active-text": "是",
                  "inactive-text": "否"
                }, null, 8, ["modelValue", "onUpdate:modelValue"])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_el_form_item, { label: "选择任意一级选项:" }, {
          default: withCtx((_2, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_el_switch, {
                modelValue: unref(fieldsOption).props.checkStrictly,
                "onUpdate:modelValue": ($event) => unref(fieldsOption).props.checkStrictly = $event,
                "active-text": "是",
                "inactive-text": "否"
              }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_el_switch, {
                  modelValue: unref(fieldsOption).props.checkStrictly,
                  "onUpdate:modelValue": ($event) => unref(fieldsOption).props.checkStrictly = $event,
                  "active-text": "是",
                  "inactive-text": "否"
                }, null, 8, ["modelValue", "onUpdate:modelValue"])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_el_form_item, { label: "字典Key配置:" }, {
          default: withCtx((_2, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="option-data-box" data-v-5ee541fa${_scopeId}>`);
              _push2(ssrRenderComponent(_component_el_form_item, { label: "label-key值:" }, {
                default: withCtx((_22, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_el_input, {
                      modelValue: unref(fieldsOption).dynamicConfig.label,
                      "onUpdate:modelValue": ($event) => unref(fieldsOption).dynamicConfig.label = $event,
                      placeholder: "请输入需要转化的Key值"
                    }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_el_input, {
                        modelValue: unref(fieldsOption).dynamicConfig.label,
                        "onUpdate:modelValue": ($event) => unref(fieldsOption).dynamicConfig.label = $event,
                        placeholder: "请输入需要转化的Key值"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_el_form_item, { label: "value-key值:" }, {
                default: withCtx((_22, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_el_input, {
                      modelValue: unref(fieldsOption).dynamicConfig.value,
                      "onUpdate:modelValue": ($event) => unref(fieldsOption).dynamicConfig.value = $event,
                      placeholder: "请输入需要转化的Key值"
                    }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_el_input, {
                        modelValue: unref(fieldsOption).dynamicConfig.value,
                        "onUpdate:modelValue": ($event) => unref(fieldsOption).dynamicConfig.value = $event,
                        placeholder: "请输入需要转化的Key值"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_el_form_item, { label: "children-key值:" }, {
                default: withCtx((_22, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_el_input, {
                      modelValue: unref(fieldsOption).dynamicConfig.children,
                      "onUpdate:modelValue": ($event) => unref(fieldsOption).dynamicConfig.children = $event,
                      placeholder: "请输入需要转化的Key值"
                    }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_el_input, {
                        modelValue: unref(fieldsOption).dynamicConfig.children,
                        "onUpdate:modelValue": ($event) => unref(fieldsOption).dynamicConfig.children = $event,
                        placeholder: "请输入需要转化的Key值"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              return [
                createVNode("div", { class: "option-data-box" }, [
                  createVNode(_component_el_form_item, { label: "label-key值:" }, {
                    default: withCtx(() => [
                      createVNode(_component_el_input, {
                        modelValue: unref(fieldsOption).dynamicConfig.label,
                        "onUpdate:modelValue": ($event) => unref(fieldsOption).dynamicConfig.label = $event,
                        placeholder: "请输入需要转化的Key值"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_el_form_item, { label: "value-key值:" }, {
                    default: withCtx(() => [
                      createVNode(_component_el_input, {
                        modelValue: unref(fieldsOption).dynamicConfig.value,
                        "onUpdate:modelValue": ($event) => unref(fieldsOption).dynamicConfig.value = $event,
                        placeholder: "请输入需要转化的Key值"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_el_form_item, { label: "children-key值:" }, {
                    default: withCtx(() => [
                      createVNode(_component_el_input, {
                        modelValue: unref(fieldsOption).dynamicConfig.children,
                        "onUpdate:modelValue": ($event) => unref(fieldsOption).dynamicConfig.children = $event,
                        placeholder: "请输入需要转化的Key值"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  })
                ])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_el_form_item, { label: "选项数据:" }, {
          default: withCtx((_2, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="option-data-box" data-v-5ee541fa${_scopeId}>`);
              _push2(ssrRenderComponent(_component_el_radio_group, {
                modelValue: unref(fieldsOption).optionType,
                "onUpdate:modelValue": ($event) => unref(fieldsOption).optionType = $event
              }, {
                default: withCtx((_22, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_el_radio, { label: "static" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`静态数据`);
                        } else {
                          return [
                            createTextVNode("静态数据")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_el_radio, { label: "dynamic" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`远端获取`);
                        } else {
                          return [
                            createTextVNode("远端获取")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_el_radio, { label: "static" }, {
                        default: withCtx(() => [
                          createTextVNode("静态数据")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_el_radio, { label: "dynamic" }, {
                        default: withCtx(() => [
                          createTextVNode("远端获取")
                        ]),
                        _: 1
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              if (unref(fieldsOption).optionType === "static") {
                _push2(`<!--[--><div data-v-5ee541fa${_scopeId}>`);
                _push2(ssrRenderComponent(_component_el_button, {
                  type: "primary",
                  onClick: ($event) => addCascaderOptionItem({}, "root")
                }, {
                  default: withCtx((_22, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`添加父级选择器`);
                    } else {
                      return [
                        createTextVNode("添加父级选择器")
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
                _push2(`</div><div class="tree-panel" data-v-5ee541fa${_scopeId}>`);
                _push2(ssrRenderComponent(unref(ElTree), {
                  data: settingOptions.value,
                  "node-key": "id",
                  "default-expand-all": "",
                  "expand-on-click-node": false,
                  "render-content": renderContent
                }, null, _parent2, _scopeId));
                _push2(`</div><!--]-->`);
              } else {
                _push2(`<!--[-->`);
                _push2(ssrRenderComponent(_component_el_form_item, { label: "数据源" }, {
                  default: withCtx((_22, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(ssrRenderComponent(_component_el_select, {
                        modelValue: unref(fieldsOption).dynamicConfig.sourceType,
                        "onUpdate:modelValue": ($event) => unref(fieldsOption).dynamicConfig.sourceType = $event,
                        placeholder: "请输入数据来源方式"
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(ssrRenderComponent(_component_el_option, {
                              label: "内部约定接口",
                              value: "chooseType"
                            }, null, _parent4, _scopeId3));
                            _push4(ssrRenderComponent(_component_el_option, {
                              label: "node项目维护",
                              value: "node"
                            }, null, _parent4, _scopeId3));
                          } else {
                            return [
                              createVNode(_component_el_option, {
                                label: "内部约定接口",
                                value: "chooseType"
                              }),
                              createVNode(_component_el_option, {
                                label: "node项目维护",
                                value: "node"
                              })
                            ];
                          }
                        }),
                        _: 1
                      }, _parent3, _scopeId2));
                    } else {
                      return [
                        createVNode(_component_el_select, {
                          modelValue: unref(fieldsOption).dynamicConfig.sourceType,
                          "onUpdate:modelValue": ($event) => unref(fieldsOption).dynamicConfig.sourceType = $event,
                          placeholder: "请输入数据来源方式"
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_el_option, {
                              label: "内部约定接口",
                              value: "chooseType"
                            }),
                            createVNode(_component_el_option, {
                              label: "node项目维护",
                              value: "node"
                            })
                          ]),
                          _: 1
                        }, 8, ["modelValue", "onUpdate:modelValue"])
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
                _push2(ssrRenderComponent(_component_el_form_item, { label: "字典类型" }, {
                  default: withCtx((_22, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(ssrRenderComponent(_component_el_input, {
                        modelValue: unref(fieldsOption).dynamicConfig.id,
                        "onUpdate:modelValue": ($event) => unref(fieldsOption).dynamicConfig.id = $event,
                        placeholder: "请输入字典类型"
                      }, null, _parent3, _scopeId2));
                    } else {
                      return [
                        createVNode(_component_el_input, {
                          modelValue: unref(fieldsOption).dynamicConfig.id,
                          "onUpdate:modelValue": ($event) => unref(fieldsOption).dynamicConfig.id = $event,
                          placeholder: "请输入字典类型"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
                _push2(`<!--]-->`);
              }
              _push2(`</div>`);
            } else {
              return [
                createVNode("div", { class: "option-data-box" }, [
                  createVNode(_component_el_radio_group, {
                    modelValue: unref(fieldsOption).optionType,
                    "onUpdate:modelValue": ($event) => unref(fieldsOption).optionType = $event
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_el_radio, { label: "static" }, {
                        default: withCtx(() => [
                          createTextVNode("静态数据")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_el_radio, { label: "dynamic" }, {
                        default: withCtx(() => [
                          createTextVNode("远端获取")
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }, 8, ["modelValue", "onUpdate:modelValue"]),
                  unref(fieldsOption).optionType === "static" ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                    createVNode("div", null, [
                      createVNode(_component_el_button, {
                        type: "primary",
                        onClick: ($event) => addCascaderOptionItem({}, "root")
                      }, {
                        default: withCtx(() => [
                          createTextVNode("添加父级选择器")
                        ]),
                        _: 1
                      }, 8, ["onClick"])
                    ]),
                    createVNode("div", { class: "tree-panel" }, [
                      createVNode(unref(ElTree), {
                        data: settingOptions.value,
                        "node-key": "id",
                        "default-expand-all": "",
                        "expand-on-click-node": false,
                        "render-content": renderContent
                      }, null, 8, ["data"])
                    ])
                  ], 64)) : (openBlock(), createBlock(Fragment, { key: 1 }, [
                    createVNode(_component_el_form_item, { label: "数据源" }, {
                      default: withCtx(() => [
                        createVNode(_component_el_select, {
                          modelValue: unref(fieldsOption).dynamicConfig.sourceType,
                          "onUpdate:modelValue": ($event) => unref(fieldsOption).dynamicConfig.sourceType = $event,
                          placeholder: "请输入数据来源方式"
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_el_option, {
                              label: "内部约定接口",
                              value: "chooseType"
                            }),
                            createVNode(_component_el_option, {
                              label: "node项目维护",
                              value: "node"
                            })
                          ]),
                          _: 1
                        }, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_form_item, { label: "字典类型" }, {
                      default: withCtx(() => [
                        createVNode(_component_el_input, {
                          modelValue: unref(fieldsOption).dynamicConfig.id,
                          "onUpdate:modelValue": ($event) => unref(fieldsOption).dynamicConfig.id = $event,
                          placeholder: "请输入字典类型"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    })
                  ], 64))
                ])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<!--]-->`);
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(_component_el_dialog, {
        modelValue: unref(state2).show,
        "onUpdate:modelValue": ($event) => unref(state2).show = $event,
        title: "添加级联选择器选项"
      }, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_form, { "label-width": "80px" }, {
              default: withCtx((_22, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_form_item, {
                    label: unref(fieldsOption).dynamicConfig.label
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_el_input, {
                          modelValue: unref(state2).nodeForm.label,
                          "onUpdate:modelValue": ($event) => unref(state2).nodeForm.label = $event,
                          placeholder: "请输入选项名称"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_el_input, {
                            modelValue: unref(state2).nodeForm.label,
                            "onUpdate:modelValue": ($event) => unref(state2).nodeForm.label = $event,
                            placeholder: "请输入选项名称"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_form_item, {
                    label: unref(fieldsOption).dynamicConfig.value
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_el_input, {
                          modelValue: unref(state2).nodeForm.value,
                          "onUpdate:modelValue": ($event) => unref(state2).nodeForm.value = $event,
                          type: unref(state2).inputType,
                          placeholder: "请输入选项值"
                        }, {
                          append: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_el_select, {
                                modelValue: unref(state2).inputType,
                                "onUpdate:modelValue": ($event) => unref(state2).inputType = $event,
                                placeholder: "Select",
                                style: { "width": "115px" },
                                onChange: ($event) => unref(state2).nodeForm.value = ""
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_el_option, {
                                      label: "String",
                                      value: "string"
                                    }, null, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(_component_el_option, {
                                      label: "Number",
                                      value: "number"
                                    }, null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(_component_el_option, {
                                        label: "String",
                                        value: "string"
                                      }),
                                      createVNode(_component_el_option, {
                                        label: "Number",
                                        value: "number"
                                      })
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_el_select, {
                                  modelValue: unref(state2).inputType,
                                  "onUpdate:modelValue": ($event) => unref(state2).inputType = $event,
                                  placeholder: "Select",
                                  style: { "width": "115px" },
                                  onChange: ($event) => unref(state2).nodeForm.value = ""
                                }, {
                                  default: withCtx(() => [
                                    createVNode(_component_el_option, {
                                      label: "String",
                                      value: "string"
                                    }),
                                    createVNode(_component_el_option, {
                                      label: "Number",
                                      value: "number"
                                    })
                                  ]),
                                  _: 1
                                }, 8, ["modelValue", "onUpdate:modelValue", "onChange"])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_el_input, {
                            modelValue: unref(state2).nodeForm.value,
                            "onUpdate:modelValue": ($event) => unref(state2).nodeForm.value = $event,
                            type: unref(state2).inputType,
                            placeholder: "请输入选项值"
                          }, {
                            append: withCtx(() => [
                              createVNode(_component_el_select, {
                                modelValue: unref(state2).inputType,
                                "onUpdate:modelValue": ($event) => unref(state2).inputType = $event,
                                placeholder: "Select",
                                style: { "width": "115px" },
                                onChange: ($event) => unref(state2).nodeForm.value = ""
                              }, {
                                default: withCtx(() => [
                                  createVNode(_component_el_option, {
                                    label: "String",
                                    value: "string"
                                  }),
                                  createVNode(_component_el_option, {
                                    label: "Number",
                                    value: "number"
                                  })
                                ]),
                                _: 1
                              }, 8, ["modelValue", "onUpdate:modelValue", "onChange"])
                            ]),
                            _: 1
                          }, 8, ["modelValue", "onUpdate:modelValue", "type"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_el_form_item, {
                      label: unref(fieldsOption).dynamicConfig.label
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_el_input, {
                          modelValue: unref(state2).nodeForm.label,
                          "onUpdate:modelValue": ($event) => unref(state2).nodeForm.label = $event,
                          placeholder: "请输入选项名称"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }, 8, ["label"]),
                    createVNode(_component_el_form_item, {
                      label: unref(fieldsOption).dynamicConfig.value
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_el_input, {
                          modelValue: unref(state2).nodeForm.value,
                          "onUpdate:modelValue": ($event) => unref(state2).nodeForm.value = $event,
                          type: unref(state2).inputType,
                          placeholder: "请输入选项值"
                        }, {
                          append: withCtx(() => [
                            createVNode(_component_el_select, {
                              modelValue: unref(state2).inputType,
                              "onUpdate:modelValue": ($event) => unref(state2).inputType = $event,
                              placeholder: "Select",
                              style: { "width": "115px" },
                              onChange: ($event) => unref(state2).nodeForm.value = ""
                            }, {
                              default: withCtx(() => [
                                createVNode(_component_el_option, {
                                  label: "String",
                                  value: "string"
                                }),
                                createVNode(_component_el_option, {
                                  label: "Number",
                                  value: "number"
                                })
                              ]),
                              _: 1
                            }, 8, ["modelValue", "onUpdate:modelValue", "onChange"])
                          ]),
                          _: 1
                        }, 8, ["modelValue", "onUpdate:modelValue", "type"])
                      ]),
                      _: 1
                    }, 8, ["label"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<div class="footer flex f-jce" data-v-5ee541fa${_scopeId}>`);
            _push2(ssrRenderComponent(_component_el_button, { onClick: onClose }, {
              default: withCtx((_22, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`取消`);
                } else {
                  return [
                    createTextVNode("取消")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_button, {
              type: "primary",
              onClick: saveCascaderOptionItem
            }, {
              default: withCtx((_22, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`确认`);
                } else {
                  return [
                    createTextVNode("确认")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode(_component_el_form, { "label-width": "80px" }, {
                default: withCtx(() => [
                  createVNode(_component_el_form_item, {
                    label: unref(fieldsOption).dynamicConfig.label
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_el_input, {
                        modelValue: unref(state2).nodeForm.label,
                        "onUpdate:modelValue": ($event) => unref(state2).nodeForm.label = $event,
                        placeholder: "请输入选项名称"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }, 8, ["label"]),
                  createVNode(_component_el_form_item, {
                    label: unref(fieldsOption).dynamicConfig.value
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_el_input, {
                        modelValue: unref(state2).nodeForm.value,
                        "onUpdate:modelValue": ($event) => unref(state2).nodeForm.value = $event,
                        type: unref(state2).inputType,
                        placeholder: "请输入选项值"
                      }, {
                        append: withCtx(() => [
                          createVNode(_component_el_select, {
                            modelValue: unref(state2).inputType,
                            "onUpdate:modelValue": ($event) => unref(state2).inputType = $event,
                            placeholder: "Select",
                            style: { "width": "115px" },
                            onChange: ($event) => unref(state2).nodeForm.value = ""
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_el_option, {
                                label: "String",
                                value: "string"
                              }),
                              createVNode(_component_el_option, {
                                label: "Number",
                                value: "number"
                              })
                            ]),
                            _: 1
                          }, 8, ["modelValue", "onUpdate:modelValue", "onChange"])
                        ]),
                        _: 1
                      }, 8, ["modelValue", "onUpdate:modelValue", "type"])
                    ]),
                    _: 1
                  }, 8, ["label"])
                ]),
                _: 1
              }),
              createVNode("div", { class: "footer flex f-jce" }, [
                createVNode(_component_el_button, { onClick: onClose }, {
                  default: withCtx(() => [
                    createTextVNode("取消")
                  ]),
                  _: 1
                }),
                createVNode(_component_el_button, {
                  type: "primary",
                  onClick: saveCascaderOptionItem
                }, {
                  default: withCtx(() => [
                    createTextVNode("确认")
                  ]),
                  _: 1
                })
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup$f = _sfc_main$f.setup;
_sfc_main$f.setup = (props2, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/factory/form/components/fieldsSetting/components/componentOption/select.setting.vue");
  return _sfc_setup$f ? _sfc_setup$f(props2, ctx) : void 0;
};
const selectSetting = /* @__PURE__ */ _export_sfc(_sfc_main$f, [["__scopeId", "data-v-5ee541fa"]]);
const _sfc_main$e = /* @__PURE__ */ defineComponent({
  __name: "date.setting",
  __ssrInlineRender: true,
  props: {
    fields: {
      type: Object,
      default: () => ({})
    },
    componentType: {
      type: String,
      default: "input"
    }
  },
  emits: ["update", "updateOption"],
  setup(__props2, { expose: __expose, emit: __emit2 }) {
    let props2 = __props2;
    const formatMap = {
      "datePicker-year": "YYYY",
      "datePicker-month": "MM",
      "datePicker-day": "dd",
      "datePicker-week": "yyyy 第 WW 周",
      "datePicker-date": "yyyy-MM-dd",
      "datePicker-datetime": "yyyy-MM-dd HH:mm:ss",
      "datePicker-datetimerange": "yyyy-MM-dd"
    };
    const valueFormatMap = {
      "datePicker-year": "YYYY",
      "datePicker-month": "MM",
      "datePicker-day": "dd",
      "datePicker-week": "",
      "datePicker-date": "yyyy-MM-dd",
      "datePicker-datetime": "yyyy-MM-dd HH:mm:ss",
      "datePicker-datetimerange": "yyyy-MM-dd"
    };
    let fieldsOption = reactive({
      placeholder: "",
      format: formatMap[props2.componentType],
      "value-format": valueFormatMap[props2.componentType]
    });
    let emits2 = __emit2;
    const stopEmit = ref(false);
    function onOptionChange() {
      if (stopEmit.value)
        return;
      emits2("updateOption", fieldsOption);
    }
    function initCommonOption() {
      fieldsOption = Object.assign(fieldsOption, getOptionForField(props2.fields));
      if (stopEmit.value) {
        setTimeout(() => {
          stopEmit.value = false;
        });
      }
    }
    watch(() => props2.componentType, (val) => {
      updateOption();
    });
    initCommonOption();
    watch(() => fieldsOption, throttle(onOptionChange, 2e3), { deep: true });
    function updateOption() {
      stopEmit.value = true;
      initCommonOption();
    }
    __expose({
      updateOption
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_form_item = resolveComponent("el-form-item");
      const _component_el_input = resolveComponent("el-input");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_el_form_item, { label: "占位符内容:" }, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_input, {
              modelValue: unref(fieldsOption).placeholder,
              "onUpdate:modelValue": ($event) => unref(fieldsOption).placeholder = $event
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_el_input, {
                modelValue: unref(fieldsOption).placeholder,
                "onUpdate:modelValue": ($event) => unref(fieldsOption).placeholder = $event
              }, null, 8, ["modelValue", "onUpdate:modelValue"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_el_form_item, { label: "显示格式化:" }, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_input, {
              modelValue: unref(fieldsOption).format,
              "onUpdate:modelValue": ($event) => unref(fieldsOption).format = $event
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_el_input, {
                modelValue: unref(fieldsOption).format,
                "onUpdate:modelValue": ($event) => unref(fieldsOption).format = $event
              }, null, 8, ["modelValue", "onUpdate:modelValue"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_el_form_item, { label: "数值格式化:" }, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_input, {
              modelValue: unref(fieldsOption)["value-format"],
              "onUpdate:modelValue": ($event) => unref(fieldsOption)["value-format"] = $event
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_el_input, {
                modelValue: unref(fieldsOption)["value-format"],
                "onUpdate:modelValue": ($event) => unref(fieldsOption)["value-format"] = $event
              }, null, 8, ["modelValue", "onUpdate:modelValue"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup$e = _sfc_main$e.setup;
_sfc_main$e.setup = (props2, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/factory/form/components/fieldsSetting/components/componentOption/date.setting.vue");
  return _sfc_setup$e ? _sfc_setup$e(props2, ctx) : void 0;
};
const _sfc_main$d = /* @__PURE__ */ defineComponent({
  __name: "rate",
  __ssrInlineRender: true,
  props: {
    options: {
      type: Object,
      default: () => ({})
    },
    componentType: {
      type: String
    }
  },
  emits: ["update", "updateOption"],
  setup(__props2, { emit: __emit2 }) {
    let props2 = __props2;
    let fieldOption = reactive(Object.assign({}, otherComponentOptions[props2.componentType], props2.options));
    const state2 = reactive({
      inputVisible: false,
      inputValue: "",
      color: ""
    });
    const InputRef = ref();
    const showInput = () => {
      state2.inputVisible = true;
      nextTick(() => {
        InputRef.value.input.focus();
      });
    };
    const handleInputConfirm = () => {
      if (state2.inputValue) {
        fieldOption.texts.push(state2.inputValue);
      }
      state2.inputVisible = false;
      state2.inputValue = "";
    };
    function onColorChange(val) {
      let colors = fieldOption.colors || [];
      colors.push(val);
      fieldOption.colors = colors;
    }
    function onTagClose(index, type) {
      let fieldMap = {
        color: "colors",
        text: "texts"
      };
      fieldOption[fieldMap[type]].splice(index, 1);
    }
    let emits2 = __emit2;
    const stopEmit = ref(false);
    function onOptionChange() {
      if (stopEmit.value)
        return;
      emits2("updateOption", fieldOption);
    }
    watch(() => fieldOption, throttle(onOptionChange, 2e3), { deep: true });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_form_item = resolveComponent("el-form-item");
      const _component_el_input = resolveComponent("el-input");
      const _component_el_switch = resolveComponent("el-switch");
      const _component_el_tag = resolveComponent("el-tag");
      const _component_el_button = resolveComponent("el-button");
      const _component_el_color_picker = resolveComponent("el-color-picker");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_el_form_item, { label: "最大星数:" }, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_input, {
              modelValue: unref(fieldOption).max,
              "onUpdate:modelValue": ($event) => unref(fieldOption).max = $event,
              modelModifiers: { number: true },
              type: "number"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_el_input, {
                modelValue: unref(fieldOption).max,
                "onUpdate:modelValue": ($event) => unref(fieldOption).max = $event,
                modelModifiers: { number: true },
                type: "number"
              }, null, 8, ["modelValue", "onUpdate:modelValue"])
            ];
          }
        }),
        _: 1
      }, _parent));
      if (!unref(fieldOption)["show-score"]) {
        _push(`<!--[-->`);
        _push(ssrRenderComponent(_component_el_form_item, { label: "是否显示文本:" }, {
          default: withCtx((_2, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_el_switch, {
                modelValue: unref(fieldOption)["show-text"],
                "onUpdate:modelValue": ($event) => unref(fieldOption)["show-text"] = $event,
                "active-text": "是",
                "inactive-text": "否"
              }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_el_switch, {
                  modelValue: unref(fieldOption)["show-text"],
                  "onUpdate:modelValue": ($event) => unref(fieldOption)["show-text"] = $event,
                  "active-text": "是",
                  "inactive-text": "否"
                }, null, 8, ["modelValue", "onUpdate:modelValue"])
              ];
            }
          }),
          _: 1
        }, _parent));
        if (unref(fieldOption)["show-text"]) {
          _push(ssrRenderComponent(_component_el_form_item, { label: "自定义文本:" }, {
            default: withCtx((_2, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<!--[-->`);
                ssrRenderList(unref(fieldOption).texts, (tag, index) => {
                  _push2(ssrRenderComponent(_component_el_tag, {
                    key: tag,
                    closable: "",
                    type: "",
                    style: { "margin": "0px 2.5px 5px 2.5px" },
                    onClose: ($event) => onTagClose(index, "text")
                  }, {
                    default: withCtx((_22, _push3, _parent3, _scopeId2) => {
                      if (_push3) {
                        _push3(`${ssrInterpolate(tag)}`);
                      } else {
                        return [
                          createTextVNode(toDisplayString(tag), 1)
                        ];
                      }
                    }),
                    _: 2
                  }, _parent2, _scopeId));
                });
                _push2(`<!--]-->`);
                if (state2.inputVisible) {
                  _push2(ssrRenderComponent(_component_el_input, {
                    ref_key: "InputRef",
                    ref: InputRef,
                    modelValue: state2.inputValue,
                    "onUpdate:modelValue": ($event) => state2.inputValue = $event,
                    size: "small",
                    onKeyup: handleInputConfirm,
                    onBlur: handleInputConfirm
                  }, null, _parent2, _scopeId));
                } else {
                  _push2(ssrRenderComponent(_component_el_button, {
                    style: { "margin-left": "5px" },
                    size: "small",
                    onClick: showInput
                  }, {
                    default: withCtx((_22, _push3, _parent3, _scopeId2) => {
                      if (_push3) {
                        _push3(` + New Tag `);
                      } else {
                        return [
                          createTextVNode(" + New Tag ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent2, _scopeId));
                }
              } else {
                return [
                  (openBlock(true), createBlock(Fragment, null, renderList(unref(fieldOption).texts, (tag, index) => {
                    return openBlock(), createBlock(_component_el_tag, {
                      key: tag,
                      closable: "",
                      type: "",
                      style: { "margin": "0px 2.5px 5px 2.5px" },
                      onClose: ($event) => onTagClose(index, "text")
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(tag), 1)
                      ]),
                      _: 2
                    }, 1032, ["onClose"]);
                  }), 128)),
                  state2.inputVisible ? (openBlock(), createBlock(_component_el_input, {
                    key: 0,
                    ref_key: "InputRef",
                    ref: InputRef,
                    modelValue: state2.inputValue,
                    "onUpdate:modelValue": ($event) => state2.inputValue = $event,
                    size: "small",
                    onKeyup: withKeys(handleInputConfirm, ["enter"]),
                    onBlur: handleInputConfirm
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])) : (openBlock(), createBlock(_component_el_button, {
                    key: 1,
                    style: { "margin-left": "5px" },
                    size: "small",
                    onClick: showInput
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" + New Tag ")
                    ]),
                    _: 1
                  }))
                ];
              }
            }),
            _: 1
          }, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`<!--]-->`);
      } else {
        _push(`<!---->`);
      }
      if (!unref(fieldOption)["show-text"]) {
        _push(ssrRenderComponent(_component_el_form_item, { label: "是否显示分数:" }, {
          default: withCtx((_2, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_el_switch, {
                modelValue: unref(fieldOption)["show-score"],
                "onUpdate:modelValue": ($event) => unref(fieldOption)["show-score"] = $event,
                "active-text": "是",
                "inactive-text": "否"
              }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_el_switch, {
                  modelValue: unref(fieldOption)["show-score"],
                  "onUpdate:modelValue": ($event) => unref(fieldOption)["show-score"] = $event,
                  "active-text": "是",
                  "inactive-text": "否"
                }, null, 8, ["modelValue", "onUpdate:modelValue"])
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(_component_el_form_item, { label: "自定义颜色:" }, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<!--[-->`);
            ssrRenderList(unref(fieldOption).colors, (tag, index) => {
              _push2(ssrRenderComponent(_component_el_tag, {
                key: tag,
                closable: "",
                style: { "margin": "0px 2.5px 5px 2.5px" },
                onClose: ($event) => onTagClose(index, "color")
              }, {
                default: withCtx((_22, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<span style="${ssrRenderStyle({
                      color: tag
                    })}"${_scopeId2}>${ssrInterpolate(tag)}</span>`);
                  } else {
                    return [
                      createVNode("span", {
                        style: {
                          color: tag
                        }
                      }, toDisplayString(tag), 5)
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            });
            _push2(`<!--]-->`);
            _push2(ssrRenderComponent(_component_el_color_picker, {
              modelValue: state2.color,
              "onUpdate:modelValue": ($event) => state2.color = $event,
              onChange: onColorChange
            }, null, _parent2, _scopeId));
          } else {
            return [
              (openBlock(true), createBlock(Fragment, null, renderList(unref(fieldOption).colors, (tag, index) => {
                return openBlock(), createBlock(_component_el_tag, {
                  key: tag,
                  closable: "",
                  style: { "margin": "0px 2.5px 5px 2.5px" },
                  onClose: ($event) => onTagClose(index, "color")
                }, {
                  default: withCtx(() => [
                    createVNode("span", {
                      style: {
                        color: tag
                      }
                    }, toDisplayString(tag), 5)
                  ]),
                  _: 2
                }, 1032, ["onClose"]);
              }), 128)),
              createVNode(_component_el_color_picker, {
                modelValue: state2.color,
                "onUpdate:modelValue": ($event) => state2.color = $event,
                onChange: onColorChange
              }, null, 8, ["modelValue", "onUpdate:modelValue"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup$d = _sfc_main$d.setup;
_sfc_main$d.setup = (props2, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/factory/form/components/fieldsSetting/components/componentOption/other.components/rate.vue");
  return _sfc_setup$d ? _sfc_setup$d(props2, ctx) : void 0;
};
const _sfc_main$c = /* @__PURE__ */ defineComponent({
  __name: "slider",
  __ssrInlineRender: true,
  props: {
    options: {
      type: Object,
      default: () => ({})
    },
    componentType: {
      type: String
    }
  },
  emits: ["update", "updateOption"],
  setup(__props2, { emit: __emit2 }) {
    let props2 = __props2;
    let fieldOption = reactive(Object.assign({}, otherComponentOptions[props2.componentType], props2.options));
    reactive({});
    let emits2 = __emit2;
    const stopEmit = ref(false);
    function onOptionChange() {
      if (stopEmit.value)
        return;
      emits2("updateOption", fieldOption);
    }
    watch(() => fieldOption, throttle(onOptionChange, 2e3), { deep: true });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_form_item = resolveComponent("el-form-item");
      const _component_el_input = resolveComponent("el-input");
      const _component_el_switch = resolveComponent("el-switch");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_el_form_item, { label: "最大值:" }, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_input, {
              modelValue: unref(fieldOption).max,
              "onUpdate:modelValue": ($event) => unref(fieldOption).max = $event,
              modelModifiers: { number: true },
              type: "number"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_el_input, {
                modelValue: unref(fieldOption).max,
                "onUpdate:modelValue": ($event) => unref(fieldOption).max = $event,
                modelModifiers: { number: true },
                type: "number"
              }, null, 8, ["modelValue", "onUpdate:modelValue"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_el_form_item, { label: "最小值:" }, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_input, {
              modelValue: unref(fieldOption).min,
              "onUpdate:modelValue": ($event) => unref(fieldOption).min = $event,
              modelModifiers: { number: true },
              type: "number"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_el_input, {
                modelValue: unref(fieldOption).min,
                "onUpdate:modelValue": ($event) => unref(fieldOption).min = $event,
                modelModifiers: { number: true },
                type: "number"
              }, null, 8, ["modelValue", "onUpdate:modelValue"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_el_form_item, { label: "步长:" }, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_input, {
              modelValue: unref(fieldOption).step,
              "onUpdate:modelValue": ($event) => unref(fieldOption).step = $event,
              modelModifiers: { number: true },
              type: "number"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_el_input, {
                modelValue: unref(fieldOption).step,
                "onUpdate:modelValue": ($event) => unref(fieldOption).step = $event,
                modelModifiers: { number: true },
                type: "number"
              }, null, 8, ["modelValue", "onUpdate:modelValue"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_el_form_item, { label: "显示输入框:" }, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_switch, {
              modelValue: unref(fieldOption)["show-input"],
              "onUpdate:modelValue": ($event) => unref(fieldOption)["show-input"] = $event,
              "active-text": "是",
              "inactive-text": "否"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_el_switch, {
                modelValue: unref(fieldOption)["show-input"],
                "onUpdate:modelValue": ($event) => unref(fieldOption)["show-input"] = $event,
                "active-text": "是",
                "inactive-text": "否"
              }, null, 8, ["modelValue", "onUpdate:modelValue"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_el_form_item, { label: "范围:" }, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_switch, {
              modelValue: unref(fieldOption)["range"],
              "onUpdate:modelValue": ($event) => unref(fieldOption)["range"] = $event,
              "active-text": "是",
              "inactive-text": "否"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_el_switch, {
                modelValue: unref(fieldOption)["range"],
                "onUpdate:modelValue": ($event) => unref(fieldOption)["range"] = $event,
                "active-text": "是",
                "inactive-text": "否"
              }, null, 8, ["modelValue", "onUpdate:modelValue"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup$c = _sfc_main$c.setup;
_sfc_main$c.setup = (props2, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/factory/form/components/fieldsSetting/components/componentOption/other.components/slider.vue");
  return _sfc_setup$c ? _sfc_setup$c(props2, ctx) : void 0;
};
const _sfc_main$b = /* @__PURE__ */ defineComponent({
  __name: "other.setting",
  __ssrInlineRender: true,
  props: {
    field: {
      type: Object,
      default: () => ({})
    },
    componentType: {
      type: String,
      default: "input"
    }
  },
  emits: ["update", "updateOption"],
  setup(__props2, { expose: __expose, emit: __emit2 }) {
    let props2 = __props2;
    let fieldOption = reactive({});
    const activeComponent = computed(() => {
      let componentMap = {
        rate: _sfc_main$d,
        slider: _sfc_main$c
      };
      return componentMap[props2.componentType];
    });
    let emits2 = __emit2;
    const stopEmit = ref(false);
    function onOptionChange(otherFieldOptions = {}) {
      if (stopEmit.value)
        return;
      emits2("updateOption", Object.assign({}, fieldOption, otherFieldOptions));
    }
    function initCommonOption() {
      fieldOption = Object.assign(fieldOption, getOptionForField(props2.field));
      if (stopEmit.value) {
        setTimeout(() => {
          stopEmit.value = false;
        });
      }
    }
    watch(() => props2.componentType, (val) => {
      updateOption();
    });
    initCommonOption();
    watch(() => fieldOption, throttle(onOptionChange, 2e3), { deep: true });
    function updateOption() {
      stopEmit.value = true;
      initCommonOption();
    }
    __expose({
      updateOption
    });
    return (_ctx, _push, _parent, _attrs) => {
      ssrRenderVNode(_push, createVNode(resolveDynamicComponent(activeComponent.value), mergeProps({
        options: unref(fieldOption),
        "component-type": __props2.componentType,
        onUpdateOption: onOptionChange
      }, _attrs), null), _parent);
    };
  }
});
const _sfc_setup$b = _sfc_main$b.setup;
_sfc_main$b.setup = (props2, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/factory/form/components/fieldsSetting/components/componentOption/other.setting.vue");
  return _sfc_setup$b ? _sfc_setup$b(props2, ctx) : void 0;
};
const _sfc_main$a = /* @__PURE__ */ defineComponent({
  __name: "fields.option.panel",
  __ssrInlineRender: true,
  props: {
    fields: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ["update"],
  setup(__props2, { emit: __emit2 }) {
    let props2 = __props2;
    let model = reactive({
      componentItem: {},
      formItem: {},
      gridItem: {}
    });
    let emits2 = __emit2;
    const commonOptionRef = shallowRef();
    const componentSettingRef = shallowRef();
    let state2 = reactive({
      show: false
    });
    const propsFields = ref(props2.fields);
    const componentType = computed(() => {
      let options2 = getOptionForField(propsFields.value);
      return options2.componentType;
    });
    const componentOptions = computed(() => {
      let options2 = getOptionForField(propsFields.value);
      return options2;
    });
    const componentOptionsSetting = computed(() => {
      let component = null;
      switch (true) {
        case ["input", "input-textarea", "input-password", "input-number"].includes(componentType.value):
          component = _sfc_main$g;
          break;
        case ["select", "cascader", "tree", "checkbox-group", "radio-group", "switch"].includes(componentType.value):
          component = selectSetting;
          break;
        case ["datePicker-year", "datePicker-month", "datePicker-day", "datePicker-week", "datePicker-date", "datePicker-datetime", "datePicker-datetimerange"].includes(componentType.value):
          component = _sfc_main$e;
          break;
        case ["rate", "rate", "slider", "tag", "colorPicker"].includes(componentType.value):
          component = _sfc_main$b;
          break;
      }
      return component;
    });
    let updateThrottle = throttle(updateOption, 1500);
    function updateOption(option) {
      let fields2 = props2.fields;
      let options2 = JSON.parse(get(fields2, "_options", "{}"));
      let fieldConf = options2.fieldConf;
      if (!fieldConf.props) {
        fieldConf.props = [{ type: "props", option: {} }];
      }
      let index = fieldConf.props.findIndex((item2) => {
        return item2.type === "props";
      });
      fieldConf.props[index].option = Object.assign({}, fieldConf.props[index].option, option, {});
      const { attr } = getComponentType(fieldConf.props[index].option);
      if (attr.type) {
        fieldConf.props[index].option.type = attr.type || "";
      } else {
        fieldConf.props[index].option.type = "";
      }
      fields2.name = fieldConf.props[index].option.fieldName;
      fields2.key = fieldConf.props[index].option.key;
      fields2._options = JSON.stringify(options2);
      fields2.componentType = attr.componentType;
      propsFields.value = fields2;
      emits2("update", fields2);
    }
    function onSave2(option) {
      updateOption(option);
      setTimeout(() => {
        commonOptionRef.value.updateOption();
        componentSettingRef.value.updateOption();
      });
    }
    function getComponentType(fieldOption) {
      let { componentType: componentType2 } = fieldOption;
      let arr = flatten(componentTypeOptions$1.map((e) => e.options));
      let item2 = arr.find((item22) => {
        return item22.value === componentType2;
      });
      return item2;
    }
    onUnmounted(() => {
      console.log("销毁");
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_form = resolveComponent("el-form");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_el_form, {
        "label-position": "left",
        "label-width": "auto",
        model: unref(model)
      }, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="form-title"${_scopeId}>基础属性</div>`);
            _push2(ssrRenderComponent(commonOption, mergeProps(_ctx.$attrs, {
              ref_key: "commonOptionRef",
              ref: commonOptionRef,
              fields: propsFields.value,
              model: unref(model),
              "component-type": componentType.value,
              onUpdateOption: unref(updateThrottle)
            }), null, _parent2, _scopeId));
            _push2(`<div class="form-title"${_scopeId}>组件属性</div>`);
            ssrRenderVNode(_push2, createVNode(resolveDynamicComponent(componentOptionsSetting.value), mergeProps({
              ref_key: "componentSettingRef",
              ref: componentSettingRef,
              fields: propsFields.value,
              model: unref(model)
            }, _ctx.$attrs, {
              "component-type": componentType.value,
              onUpdateOption: unref(updateThrottle)
            }), null), _parent2, _scopeId);
          } else {
            return [
              createVNode("div", { class: "form-title" }, "基础属性"),
              createVNode(commonOption, mergeProps(_ctx.$attrs, {
                ref_key: "commonOptionRef",
                ref: commonOptionRef,
                fields: propsFields.value,
                model: unref(model),
                "component-type": componentType.value,
                onUpdateOption: unref(updateThrottle)
              }), null, 16, ["fields", "model", "component-type", "onUpdateOption"]),
              createVNode("div", { class: "form-title" }, "组件属性"),
              (openBlock(), createBlock(resolveDynamicComponent(componentOptionsSetting.value), mergeProps({
                ref_key: "componentSettingRef",
                ref: componentSettingRef,
                fields: propsFields.value,
                model: unref(model)
              }, _ctx.$attrs, {
                "component-type": componentType.value,
                onUpdateOption: unref(updateThrottle)
              }), null, 16, ["fields", "model", "component-type", "onUpdateOption"]))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(JSONEdit, {
        modelValue: unref(state2).show,
        "onUpdate:modelValue": ($event) => unref(state2).show = $event,
        "component-options": componentOptions.value,
        onSave: onSave2
      }, null, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup$a = _sfc_main$a.setup;
_sfc_main$a.setup = (props2, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/factory/form/components/fieldsSetting/components/fields.option.panel.vue");
  return _sfc_setup$a ? _sfc_setup$a(props2, ctx) : void 0;
};
class Ast {
  constructor(filePath, option, templateString = false) {
    /**
     * 抽象语法树类型枚举
     * FunctionDeclaration (函数)、VariableDeclaration(变量)
     * ImportDeclaration(ts import 引入对象)、CallExpression(表达式)
     * ExpressionStatement(表达式语句)
     * ExportNamedDeclaration(export)
     * Identifier(interface)
     * TSInterfaceBody(typescript interface 字段)
     *
     */
    __publicField(this, "ast");
    // vue文件专属抽象语法树
    __publicField(this, "htmlAst");
    __publicField(this, "jsAst");
    __publicField(this, "filePath");
    __publicField(this, "fileType");
    // 枚举: html、vue、javascript(自己定义的)
    __publicField(this, "enumTypeNode", {
      FunctionDeclaration: [],
      VariableDeclaration: [],
      ImportDeclaration: [],
      ExportNamedDeclaration: [],
      Identifier: [],
      TSInterfaceBody: []
    });
    if (templateString) {
      this.ast = $(filePath, option);
    } else {
      if (!this.checkExistsFile(filePath, option.hasJoin))
        return;
      this.filePath = filePath;
      this.ast = $.loadFile(filePath, option);
      this.fileType = this.ast.parseOptions && this.ast.parseOptions.language || "javascript";
    }
    this.init();
  }
  init() {
    try {
      switch (this.fileType) {
        case "javascript":
          this.ast.attr("program.body").forEach((node2) => {
            if (node2.type in this.enumTypeNode) {
              this.enumTypeNode[node2.type].push(node2);
            }
          });
          break;
        case "vue":
          this.ast.find("<script setup><\/script>").each((item2) => {
            this.jsAst = item2;
          });
          this.ast.find("<template></template>").each((item2) => {
            this.htmlAst = item2;
          });
          break;
        case "html":
          break;
      }
    } catch (error) {
      throw new Error(`解析抽象语法树失败,请检查需插入的文件是否有语法错误!`);
    }
  }
  /**
   * 检查文件是否存在
   * 文件地址包含node_modules默认为szzt-cli 源码文件
   */
  checkExistsFile(filePath, hasJoin = true) {
    const result2 = filePath.indexOf("node_modules") > -1 ? false : hasJoin;
    if (!checkExists(filePath, result2)) {
      console.log(new Error(`需注入代码的文件${filePath}缺失!`));
      return false;
    } else {
      return true;
    }
  }
  /**
   * 写入文件
   */
  writeFile(filePath = this.filePath) {
    $.writeFile(this.ast.generate(), filePath);
  }
  generateNode(value2) {
    const type = Object.prototype.toString.call(value2);
    let init2;
    $(`let variable = ${["[object Object]", "[object Array]"].includes(type) ? JSON.stringify(value2) : typeof value2 === "string" ? `${value2}` : value2}`).find("variable").each((item2) => {
      init2 = item2[0].nodePath.parentPath.value.init;
    });
    return init2;
  }
  /**
   * 修改对象其中一个字段
   * @param {*} obj
   * @param {*} key
   * @param {*} value
   */
  editObjectField(objectName, key2, value2, ast = this.ast) {
    const node2 = this.getVariableNode(objectName, ast);
    const nodeType = this.getNodeType(node2);
    let fieldNode;
    if (node2) {
      if (nodeType === "CallExpression") {
        fieldNode = node2.attr("declarations")[0].init.arguments[0].properties.filter((node22) => {
          return node22.key.name === key2;
        })[0];
      } else {
        fieldNode = node2.attr("declarations")[0].init.properties.filter((node22) => {
          return node22.key.name === key2;
        })[0];
      }
    }
    if (fieldNode) {
      fieldNode.value = this.generateNode(value2);
    }
  }
  /**
   * 给对象添加字段
   * @param {ast} ast 抽象语法树
   * @param {String} objectName 被添加对象
   * @param {Object} injectObject 添加的对象
   */
  addFieldToObject(objectName, injectObject, ast = this.ast) {
    const injectObjectAst = $(JSON.stringify(injectObject));
    const injectProperties = injectObjectAst.attr("properties") || [];
    const node2 = this.getVariableNode(objectName, ast);
    if (node2) {
      const nodeType = this.getNodeType(node2);
      if (nodeType === "CallExpression") {
        node2.attr("declarations")[0].init.arguments[0].properties = node2.attr("declarations")[0].init.arguments[0].properties.concat(injectProperties);
      } else {
        node2.attr("declarations")[0].init.properties = node2.attr("declarations")[0].init.properties.concat(injectProperties);
      }
    }
  }
  /**
   * 修改变量的值
   *
   * 当赋值值为string时,添加反单引号,`'value'`,当值为其他的变量名时,'value'
   *
   * bug:当赋予的值的类型对象,且存在key的值的类型为Function时,那么该key会被过滤
   * @param {string} variable 变量名称
   * @param {*} value
   */
  editVariableNode(variable, value2, ast = this.ast) {
    const node2 = this.getVariableNode(variable, ast);
    const nodeType = this.getNodeType(node2);
    if (node2) {
      if (nodeType === "CallExpression") {
        node2.attr("declarations")[0].init.arguments = [this.generateNode(value2)];
      } else {
        node2.attr("declarations")[0].init = this.generateNode(value2);
      }
    }
  }
  /**
   * 获取当前抽象节点树下的变量node
   * @param {*} ast
   * @param {string||number} variable
   * @returns {} 返回值 node:'变量节点',value:'变量值',name:'变量名称'
   */
  getVariableNode(variable, ast = this.ast) {
    try {
      const body = ast.attr("program.body") || ast.attr("body.body");
      const varNode = body.filter((e) => {
        return e.type === "VariableDeclaration";
      });
      const nodeArray = varNode.filter((e) => {
        return e.declarations[0].id.name === variable;
      });
      if (nodeArray.length > 0) {
        return ast.find(nodeArray[0]);
      } else {
        return null;
      }
    } catch (error) {
      throw new Error(error);
    }
  }
  // 获取变量的值
  getNodeValue(nodeOrVariable, ast = this.ast) {
    let useNode;
    if (_.isString(nodeOrVariable)) {
      useNode = this.getVariableNode(nodeOrVariable, ast);
    } else {
      useNode = nodeOrVariable;
    }
    if (!useNode)
      return null;
    const nodeValueType = this.getNodeType(useNode);
    let value2 = "";
    switch (nodeValueType) {
      case "StringLiteral":
      case "NumericLiteral":
      case "BooleanLiteral":
      case "NullLiteral":
        value2 = _.get(useNode.attr("declarations"), "[0].init.value");
        break;
    }
    return value2;
  }
  // 获取Object类型的节点的值
  getObjectExpressionNodeValue(ObjectExpressionNode) {
    const { properties } = ObjectExpressionNode;
    const result = {};
    if (properties.length > 0) {
      properties.map((item) => {
        const key = _.get(item, "key.value") || _.get(item, "key.name");
        const valueType = _.get(item, "value.type");
        let value = null;
        switch (valueType) {
          case "ObjectExpression":
            value = this.getObjectExpressionNodeValue(item.value);
            break;
          case "ArrayExpression":
            value = this.getArrayExpressionNodeValue(item.value);
            break;
          case "ArrowFunctionExpression":
          case "FunctionExpression":
            value = eval(`(${$(item.value).generate()})`);
            break;
          default:
            value = _.get(item, "value.value");
        }
        result[key] = value;
      });
    }
    return result;
  }
  // 获取Array类型的值
  getArrayExpressionNodeValue(ArrayExpressionNode) {
    const { elements } = ArrayExpressionNode;
    const result2 = [];
    elements.map((item2) => {
      const valueType2 = _.get(item2, "type");
      let value2 = null;
      switch (valueType2) {
        case "ObjectExpression":
          value2 = this.getObjectExpressionNodeValue(item2);
          break;
        case "ArrayExpression":
          value2 = this.getArrayExpressionNodeValue(item2);
          break;
        default:
          value2 = _.get(item2, "value");
      }
      result2.push(value2);
    });
    return result2;
  }
  /**
   * 根据函数名获取函数内部node(节点)
   *
   * @param {*} ast
   * @param {*} fnName
   * @returns
   */
  getFunctoinNode(fnName, ast = this.ast) {
    try {
      const temp = "";
      let node2 = null;
      ast.find(`function ${fnName}() {}`).each((item2, index) => {
        node2 = item2;
      });
      return node2;
    } catch (error) {
      return null;
    }
  }
  /**
   * 弃用
   * 根据函数名获取函数抽象语法树
   * @param {*} ast
   * @param {*} fnName
   * @returns
   */
  getFunctoinAst(fnName, ast = this.ast) {
    try {
      return $(ast.find(`function ${fnName}() {}`));
    } catch (error) {
      return null;
    }
  }
  getCallFunction(fnName, ast = this.ast) {
    try {
      let node2 = null;
      ast.find(`${fnName}()`).each((item2, index) => {
        node2 = item2;
      });
      return node2;
    } catch (error) {
      return null;
    }
  }
  /**
   * 同作用域下插入代码片段
   * @param {*} code
   * @param {*} ast
   */
  appendCode(code, ast = this.ast) {
    ast.after(code);
  }
  // 插入import
  insertImport(code, ast = this.ast) {
    if (this.enumTypeNode.ImportDeclaration.length > 0) {
      const lastImport = this.enumTypeNode.ImportDeclaration[this.enumTypeNode.ImportDeclaration.length - 1];
      ast.find(lastImport).each((e) => {
        e.after(code);
      });
    } else {
      ast.before(code);
    }
  }
  /**
   * 删除声明函数
   * @param {*} fnName
   * @param {*} ast
   */
  removeFunction(fnName, ast = this.ast) {
    ast.find(`function ${fnName}() {}`).remove();
  }
  /**
   * 删除声明变量
   * @param {*} variableName
   * @param {*} ast
   */
  removeVariable(variableName, ast = this.ast) {
    ast.find(`let ${variableName} = $_$1`).remove();
    ast.find(`var ${variableName} = $_$1`).remove();
    ast.find(`const ${variableName} = $_$1`).remove();
  }
  getNodeType(node2) {
    if (node2) {
      try {
        return node2.attr("declarations")[0].init.type;
      } catch (error) {
        return node2.type;
      }
    }
  }
}
const ConfigOpt = {
  component: {
    prefix: "el-"
  },
  dictData: {
    FieldUIMapper: {
      e6: "text",
      e7: "input",
      e8: "select",
      e9: "cascader",
      e10: "checkbox-group",
      e11: "radio-group",
      e12: "switch",
      e13: "datePicker",
      e14: "rate",
      e15: "slider",
      e16: "tag",
      e17: "image",
      e18: "colorPicker",
      e20: "slot",
      e24: "input-number",
      e99: "slot"
    }
  }
};
const _sfc_main$9 = /* @__PURE__ */ defineComponent({
  __name: "JSON.panel",
  __ssrInlineRender: true,
  props: {
    modelValue: { type: Boolean, default: false },
    fields: {
      type: Object
    },
    modelType: {
      type: String,
      default: ""
    }
  },
  emits: ["update:modelValue", "save"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const editorCode = ref('console.log("Hello World")');
    const highlighter = (code) => {
      return prism.highlight(code, prism.languages.js);
    };
    let state = reactive({
      model: "simplification"
    });
    const emits = __emit;
    const show = computed({
      get: () => {
        if (props.modelValue)
          ;
        return props.modelValue;
      },
      set: (val) => emits("update:modelValue", val)
    });
    let useData = computed(() => {
      return props.fields;
    });
    let editorInstance = ref(null);
    const dialogTitle = computed(() => {
      return `配置面板`;
    });
    const tip = computed(() => {
      if (props.modelType == "import") {
        return "请输入JSON格式正确的配置";
      }
      if (state.model == "simplification") {
        return `精简模式下只展示组件会使用到属性，比如${SimplificationKey.join("、")}字段`;
      } else {
        return "详情模式展示 类型 MenuMode 的全量字段";
      }
    });
    function initJSONModel(data) {
      const container = document.getElementById("json-edit-container");
      const options2 = {
        mode: "code"
      };
      const editor = new JSONEditor(container, options2);
      editorInstance.value = editor;
      editorInstance.value.set(data);
    }
    function init() {
      if (props.modelType == "import") {
        editorCode.value = getASTResult([]);
      } else {
        state.model = "simplification";
        onTransformClick(state.model);
      }
    }
    function onTransformClick(type) {
      switch (type) {
        case "simplification":
          onTransformSimplification("simplification");
          break;
        case "json":
          onTransformSimplification("json");
          break;
        case "detail":
          onTransformDetail();
          break;
      }
    }
    function onTransformSimplification(type) {
      let resultGroup = [];
      forEach(useData.value, (currentField) => {
        let result2 = {};
        SimplificationKey.forEach((key2) => {
          if (key2 == "props") {
            result2.props = getOptionForField(currentField, (option) => {
              Object.keys(option).forEach((key22) => {
                let value2 = option[key22];
                if (value2 === "") {
                  delete option[key22];
                }
                if (SimplificationPropKeysBlackList.includes(key22)) {
                  delete option[key22];
                }
                if (isFunction(value2)) {
                  console.log("is Function ");
                  value2 = value2.toString();
                }
              });
            });
          } else {
            let value2 = get(currentField, key2);
            if (isFunction(value2)) {
              result2[key2] = value2.toString();
            } else {
              result2[key2] = value2;
            }
          }
        });
        resultGroup.push(result2);
      });
      if (type == "simplification") {
        editorCode.value = getASTResult(resultGroup);
      } else {
        initJSONModel(resultGroup);
      }
    }
    function onTransformDetail() {
      editorCode.value = getASTResult(useData.value);
    }
    function onSave() {
      var _a;
      let labels = [];
      switch (state.model) {
        case "json":
          labels = editorInstance.value.get().map((field) => {
            return createFields(field);
          });
          break;
        case "detail":
        case "simplification":
          const configAst2 = new Ast(editorCode.value, {}, true);
          let resultArray = [];
          let node2 = (_a = configAst2.ast) == null ? void 0 : _a.attr("program.body")[0].expression.elements;
          node2.forEach((nodeItem2) => {
            let resultItem = configAst2.getObjectExpressionNodeValue(nodeItem2);
            resultArray.push(resultItem);
          });
          labels = resultArray.map((field) => {
            return createFields(field);
          });
          break;
      }
      emits("save", labels);
      show.value = false;
    }
    function getASTResult(fields) {
      var _a;
      let configAst = new Ast(`
    ${JSON.stringify(fields)}
    `, {}, true);
      const acornAst = parse(configAst.ast.generate(), { sourceType: "module" });
      let result = escodegen.generate(acornAst, { format: { indent: { style: "  " } } });
      let beautifyResultAst = new Ast(result, {}, true);
      let node = (_a = beautifyResultAst.ast) == null ? void 0 : _a.attr("program.body")[0].expression.elements;
      node.forEach((nodeItem) => {
        let findNode = nodeItem.properties.filter((field) => {
          return ["testFunction", "testFunction2"].includes(get(field, "key.value", ""));
        });
        findNode.map((filterNode) => {
          filterNode.value = beautifyResultAst.generateNode(eval(`(${filterNode.value.value})`));
        });
      });
      return beautifyResultAst.ast.generate();
    }
    const Config = cloneDeep(ConfigOpt);
    let FieldUIMapper = get(Config, "dictData.FieldUIMapper");
    let componentTypeNumber = {};
    for (const key2 in FieldUIMapper) {
      if (Object.prototype.hasOwnProperty.call(FieldUIMapper, key2)) {
        const element = FieldUIMapper[key2];
        componentTypeNumber[element] = key2.slice(1);
      }
    }
    let order = 1;
    function createFields(field) {
      let componentType = get(componentTypeNumber, field.type, "99");
      let id = Math.floor(Math.random() * 100001);
      let initOption = field.props;
      if (get(field, "options")) {
        initOption.options = get(field, "options", []);
      }
      let fields2 = {
        "sid": id,
        "id": id,
        "name": field.label,
        "key": field.key,
        "menuType": 5,
        "menuModule": "",
        "hidden": 1,
        "parentId": "",
        "orderNum": order,
        "path": "#",
        "link": "#",
        "component": "#",
        "componentConfigId": "",
        "pageLoadType": 1,
        "pageType": 1,
        "componentType": componentType,
        // 组件类型
        "icon": "",
        "projectId": "",
        options: JSON.stringify(
          {
            "hiddenSide": 0,
            "hiddenHeader": 0,
            "fieldConf": {
              "open": 1,
              "transform": [{}],
              "props": [
                { "type": "props", "option": initOption }
              ]
            },
            "btnConf": { "open": 0 }
          }
        ),
        "picture": "",
        "remark": "",
        "creater": "",
        "delete": 0,
        "source": "page-view"
      };
      order++;
      return fields2;
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_dialog = resolveComponent("el-dialog");
      const _component_el_radio_group = resolveComponent("el-radio-group");
      const _component_el_radio = resolveComponent("el-radio");
      const _component_el_button = resolveComponent("el-button");
      _push(ssrRenderComponent(_component_el_dialog, mergeProps({
        modelValue: show.value,
        "onUpdate:modelValue": ($event) => show.value = $event,
        "destroy-on-close": "",
        title: dialogTitle.value,
        width: "80%",
        onOpen: init
      }, _attrs), {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="button-box" data-v-b3b8c5db${_scopeId}>`);
            _push2(ssrRenderComponent(_component_el_radio_group, {
              modelValue: unref(state).model,
              "onUpdate:modelValue": ($event) => unref(state).model = $event,
              onChange: onTransformClick
            }, {
              default: withCtx((_22, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<!--[-->`);
                  ssrRenderList(unref(editModelType), (item2, index) => {
                    _push3(ssrRenderComponent(_component_el_radio, {
                      label: item2.key,
                      border: ""
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(item2.label)}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(item2.label), 1)
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  });
                  _push3(`<!--]-->`);
                } else {
                  return [
                    (openBlock(true), createBlock(Fragment, null, renderList(unref(editModelType), (item2, index) => {
                      return openBlock(), createBlock(_component_el_radio, {
                        key: index,
                        label: item2.key,
                        border: ""
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(item2.label), 1)
                        ]),
                        _: 2
                      }, 1032, ["label"]);
                    }), 128))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_button, {
              type: "primary",
              onClick: onSave
            }, {
              default: withCtx((_22, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`保存`);
                } else {
                  return [
                    createTextVNode("保存")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div class="tip" data-v-b3b8c5db${_scopeId}>${ssrInterpolate(tip.value)}</div>`);
            if (["detail", "simplification"].includes(unref(state).model)) {
              _push2(ssrRenderComponent(unref(PrismEditor), {
                modelValue: editorCode.value,
                "onUpdate:modelValue": ($event) => editorCode.value = $event,
                class: "my-editor",
                highlight: highlighter,
                "line-numbers": ""
              }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            if (unref(state).model == "json") {
              _push2(`<div id="json-edit-container" data-v-b3b8c5db${_scopeId}></div>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode("div", { class: "button-box" }, [
                createVNode(_component_el_radio_group, {
                  modelValue: unref(state).model,
                  "onUpdate:modelValue": ($event) => unref(state).model = $event,
                  onChange: onTransformClick
                }, {
                  default: withCtx(() => [
                    (openBlock(true), createBlock(Fragment, null, renderList(unref(editModelType), (item2, index) => {
                      return openBlock(), createBlock(_component_el_radio, {
                        key: index,
                        label: item2.key,
                        border: ""
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(item2.label), 1)
                        ]),
                        _: 2
                      }, 1032, ["label"]);
                    }), 128))
                  ]),
                  _: 1
                }, 8, ["modelValue", "onUpdate:modelValue"]),
                createVNode(_component_el_button, {
                  type: "primary",
                  onClick: onSave
                }, {
                  default: withCtx(() => [
                    createTextVNode("保存")
                  ]),
                  _: 1
                })
              ]),
              createVNode("div", { class: "tip" }, toDisplayString(tip.value), 1),
              ["detail", "simplification"].includes(unref(state).model) ? (openBlock(), createBlock(unref(PrismEditor), {
                key: 0,
                modelValue: editorCode.value,
                "onUpdate:modelValue": ($event) => editorCode.value = $event,
                class: "my-editor",
                highlight: highlighter,
                "line-numbers": ""
              }, null, 8, ["modelValue", "onUpdate:modelValue"])) : createCommentVNode("", true),
              unref(state).model == "json" ? (openBlock(), createBlock("div", {
                key: 1,
                id: "json-edit-container"
              })) : createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$9 = _sfc_main$9.setup;
_sfc_main$9.setup = (props2, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/factory/form/common/JSONEdit/JSON.panel.vue");
  return _sfc_setup$9 ? _sfc_setup$9(props2, ctx) : void 0;
};
const JSONPanel = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["__scopeId", "data-v-b3b8c5db"]]);
const _sfc_main$8 = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  props: {
    viewFields: {
      type: Array,
      default: () => []
    },
    componentOption: {
      type: Object,
      default: () => ({})
    },
    menuFields: {
      type: Array,
      default: () => []
    }
  },
  emits: ["update"],
  setup(__props2, { emit: __emit2 }) {
    let props2 = __props2;
    const emits2 = __emit2;
    watch(() => props2.viewFields, (val) => {
      state2.viewFields = cloneDeep(val);
    });
    let state2 = reactive({
      showPanel: false,
      showJSON: false,
      showJSONPanel: false,
      modelType: "",
      activeName: "",
      viewFields: cloneDeep(props2.viewFields),
      activeField: {}
    });
    let showImport = ref(false);
    let importForm = ref({
      projectId: "345",
      menuId: "48311"
    });
    async function onImportModule() {
      if (importForm.value.projectId == "") {
        ElMessage.warning("请输入项目id");
        return;
      }
      if (importForm.value.menuId == "") {
        ElMessage.warning("请输入模块id");
        return;
      }
      const nodeApi = "http://172.16.208.12:16050/node-szzt";
      const result2 = await fetch(`${nodeApi}/menu/query`, {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ "allMenus": true, "page": 1, "pageSize": 3e3, projectId: importForm.value.projectId })
      });
      const { data } = await result2.json();
      let list = data.list;
      let menus = list.filter((item2) => {
        return item2.parentId == importForm.value.menuId;
      });
      let cloneComponentOption = props2.componentOption;
      cloneComponentOption.options.component.labels = menus;
      emits2("update", cloneComponentOption);
    }
    function showFieldsJSON(actionType) {
      state2.modelType = actionType;
      state2.showJSONPanel = true;
      return;
    }
    function onFieldsUpdate(updateField) {
      let cloneComponentOption = props2.componentOption;
      let labels = cloneComponentOption.options.component.labels;
      let index = labels.findIndex((item2) => {
        return item2.id == updateField.id;
      });
      cloneComponentOption.options.component.labels[index] = updateField;
      emits2("update", cloneComponentOption);
    }
    function onFieldsPanelUpdate(updateFields) {
      let cloneComponentOption = props2.componentOption;
      cloneComponentOption.options.component.labels = updateFields;
      emits2("update", cloneComponentOption);
    }
    function updateOrderNum() {
      let deepComponentOption = props2.componentOption;
      let options2 = deepComponentOption.options;
      let labels = options2.component.labels;
      labels.map((fields2, index) => {
        fields2.orderNum = index * 4 + 1;
      });
      emits2("update", deepComponentOption);
    }
    function deleteAllFields() {
      ElMessageBox.confirm(
        "从设计面板中剔除全部字段,可从历史字段中找回。",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      ).then(() => {
        let deepComponentOption = props2.componentOption;
        let options2 = deepComponentOption.options;
        options2.component.labels = [];
        emits2("update", deepComponentOption);
      });
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_button_group = resolveComponent("el-button-group");
      const _component_el_popover = resolveComponent("el-popover");
      const _component_el_button = resolveComponent("el-button");
      const _component_el_form = resolveComponent("el-form");
      const _component_el_form_item = resolveComponent("el-form-item");
      const _component_el_input = resolveComponent("el-input");
      const _component_el_tag = resolveComponent("el-tag");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "setting-page" }, _attrs))} data-v-9317ee49>`);
      _push(ssrRenderComponent(_component_el_button_group, null, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_popover, {
              placement: "right",
              visible: unref(showImport),
              width: 400,
              trigger: "click"
            }, {
              reference: withCtx((_22, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_button, {
                    type: "primary",
                    onClick: ($event) => isRef(showImport) ? showImport.value = true : showImport = true
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`导入模块配置`);
                      } else {
                        return [
                          createTextVNode("导入模块配置")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_el_button, {
                      type: "primary",
                      onClick: ($event) => isRef(showImport) ? showImport.value = true : showImport = true
                    }, {
                      default: withCtx(() => [
                        createTextVNode("导入模块配置")
                      ]),
                      _: 1
                    }, 8, ["onClick"])
                  ];
                }
              }),
              default: withCtx((_22, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_form, { "label-width": "100" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<!--[-->`);
                        ssrRenderList(unref(importModuleFields), (item2, index) => {
                          _push4(ssrRenderComponent(_component_el_form_item, {
                            label: item2.label,
                            required: "true"
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(_component_el_input, {
                                  modelValue: unref(importForm)[item2.key],
                                  "onUpdate:modelValue": ($event) => unref(importForm)[item2.key] = $event
                                }, null, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(_component_el_input, {
                                    modelValue: unref(importForm)[item2.key],
                                    "onUpdate:modelValue": ($event) => unref(importForm)[item2.key] = $event
                                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                        });
                        _push4(`<!--]-->`);
                      } else {
                        return [
                          (openBlock(true), createBlock(Fragment, null, renderList(unref(importModuleFields), (item2, index) => {
                            return openBlock(), createBlock(_component_el_form_item, {
                              key: index,
                              label: item2.label,
                              required: "true"
                            }, {
                              default: withCtx(() => [
                                createVNode(_component_el_input, {
                                  modelValue: unref(importForm)[item2.key],
                                  "onUpdate:modelValue": ($event) => unref(importForm)[item2.key] = $event
                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                              ]),
                              _: 2
                            }, 1032, ["label"]);
                          }), 128))
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<div class="flex f-jcfe" style="${ssrRenderStyle({ "text-align": "right" })}" data-v-9317ee49${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_el_button, {
                    type: "text",
                    onClick: ($event) => onImportModule()
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`确定`);
                      } else {
                        return [
                          createTextVNode("确定")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_button, {
                    type: "text",
                    onClick: ($event) => isRef(showImport) ? showImport.value = false : showImport = false
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`取消`);
                      } else {
                        return [
                          createTextVNode("取消")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode(_component_el_form, { "label-width": "100" }, {
                      default: withCtx(() => [
                        (openBlock(true), createBlock(Fragment, null, renderList(unref(importModuleFields), (item2, index) => {
                          return openBlock(), createBlock(_component_el_form_item, {
                            key: index,
                            label: item2.label,
                            required: "true"
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_el_input, {
                                modelValue: unref(importForm)[item2.key],
                                "onUpdate:modelValue": ($event) => unref(importForm)[item2.key] = $event
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            _: 2
                          }, 1032, ["label"]);
                        }), 128))
                      ]),
                      _: 1
                    }),
                    createVNode("div", {
                      class: "flex f-jcfe",
                      style: { "text-align": "right" }
                    }, [
                      createVNode(_component_el_button, {
                        type: "text",
                        onClick: ($event) => onImportModule()
                      }, {
                        default: withCtx(() => [
                          createTextVNode("确定")
                        ]),
                        _: 1
                      }, 8, ["onClick"]),
                      createVNode(_component_el_button, {
                        type: "text",
                        onClick: ($event) => isRef(showImport) ? showImport.value = false : showImport = false
                      }, {
                        default: withCtx(() => [
                          createTextVNode("取消")
                        ]),
                        _: 1
                      }, 8, ["onClick"])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_button, {
              type: "primary",
              onClick: ($event) => showFieldsJSON("export")
            }, {
              default: withCtx((_22, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`配置面板`);
                } else {
                  return [
                    createTextVNode("配置面板")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_button, {
              type: "primary",
              onClick: updateOrderNum
            }, {
              default: withCtx((_22, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`一键刷新排序`);
                } else {
                  return [
                    createTextVNode("一键刷新排序")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_button, {
              type: "primary",
              onClick: deleteAllFields
            }, {
              default: withCtx((_22, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`一键清空`);
                } else {
                  return [
                    createTextVNode("一键清空")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_el_popover, {
                placement: "right",
                visible: unref(showImport),
                width: 400,
                trigger: "click"
              }, {
                reference: withCtx(() => [
                  createVNode(_component_el_button, {
                    type: "primary",
                    onClick: ($event) => isRef(showImport) ? showImport.value = true : showImport = true
                  }, {
                    default: withCtx(() => [
                      createTextVNode("导入模块配置")
                    ]),
                    _: 1
                  }, 8, ["onClick"])
                ]),
                default: withCtx(() => [
                  createVNode(_component_el_form, { "label-width": "100" }, {
                    default: withCtx(() => [
                      (openBlock(true), createBlock(Fragment, null, renderList(unref(importModuleFields), (item2, index) => {
                        return openBlock(), createBlock(_component_el_form_item, {
                          key: index,
                          label: item2.label,
                          required: "true"
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_el_input, {
                              modelValue: unref(importForm)[item2.key],
                              "onUpdate:modelValue": ($event) => unref(importForm)[item2.key] = $event
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          _: 2
                        }, 1032, ["label"]);
                      }), 128))
                    ]),
                    _: 1
                  }),
                  createVNode("div", {
                    class: "flex f-jcfe",
                    style: { "text-align": "right" }
                  }, [
                    createVNode(_component_el_button, {
                      type: "text",
                      onClick: ($event) => onImportModule()
                    }, {
                      default: withCtx(() => [
                        createTextVNode("确定")
                      ]),
                      _: 1
                    }, 8, ["onClick"]),
                    createVNode(_component_el_button, {
                      type: "text",
                      onClick: ($event) => isRef(showImport) ? showImport.value = false : showImport = false
                    }, {
                      default: withCtx(() => [
                        createTextVNode("取消")
                      ]),
                      _: 1
                    }, 8, ["onClick"])
                  ])
                ]),
                _: 1
              }, 8, ["visible"]),
              createVNode(_component_el_button, {
                type: "primary",
                onClick: ($event) => showFieldsJSON("export")
              }, {
                default: withCtx(() => [
                  createTextVNode("配置面板")
                ]),
                _: 1
              }, 8, ["onClick"]),
              createVNode(_component_el_button, {
                type: "primary",
                onClick: updateOrderNum
              }, {
                default: withCtx(() => [
                  createTextVNode("一键刷新排序")
                ]),
                _: 1
              }),
              createVNode(_component_el_button, {
                type: "primary",
                onClick: deleteAllFields
              }, {
                default: withCtx(() => [
                  createTextVNode("一键清空")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="collapse-list" data-v-9317ee49><!--[-->`);
      ssrRenderList(unref(state2).viewFields, (fields2, index) => {
        _push(`<div class="collapse-item" data-v-9317ee49><div class="header" data-v-9317ee49><div class="order" data-v-9317ee49>${ssrInterpolate(fields2.orderNum)}</div><div class="name" data-v-9317ee49>${ssrInterpolate(fields2.name)}</div><div class="key" data-v-9317ee49>`);
        _push(ssrRenderComponent(_component_el_tag, null, {
          default: withCtx((_2, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(fields2.key)}`);
            } else {
              return [
                createTextVNode(toDisplayString(fields2.key), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</div><div class="button-group" data-v-9317ee49>`);
        _push(ssrRenderComponent(_component_el_popover, {
          placement: "right",
          visible: fields2._show,
          width: 400,
          trigger: "click"
        }, {
          reference: withCtx((_2, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="button-item" data-v-9317ee49${_scopeId}>快速编辑</div>`);
            } else {
              return [
                createVNode("div", {
                  class: "button-item",
                  onClick: ($event) => fields2._show = true
                }, "快速编辑", 8, ["onClick"])
              ];
            }
          }),
          default: withCtx((_2, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_el_form, { "label-width": "100" }, {
                default: withCtx((_22, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<!--[-->`);
                    ssrRenderList(unref(quickEditFields), (item2, index2) => {
                      _push3(ssrRenderComponent(_component_el_form_item, {
                        label: item2.label
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(ssrRenderComponent(_component_el_input, {
                              modelValue: fields2[item2.key],
                              "onUpdate:modelValue": ($event) => fields2[item2.key] = $event
                            }, null, _parent4, _scopeId3));
                          } else {
                            return [
                              createVNode(_component_el_input, {
                                modelValue: fields2[item2.key],
                                "onUpdate:modelValue": ($event) => fields2[item2.key] = $event
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                    });
                    _push3(`<!--]-->`);
                  } else {
                    return [
                      (openBlock(true), createBlock(Fragment, null, renderList(unref(quickEditFields), (item2, index2) => {
                        return openBlock(), createBlock(_component_el_form_item, {
                          key: index2,
                          label: item2.label
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_el_input, {
                              modelValue: fields2[item2.key],
                              "onUpdate:modelValue": ($event) => fields2[item2.key] = $event
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          _: 2
                        }, 1032, ["label"]);
                      }), 128))
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(`<div class="flex f-jcfe" style="${ssrRenderStyle({ "text-align": "right" })}" data-v-9317ee49${_scopeId}>`);
              _push2(ssrRenderComponent(_component_el_button, {
                type: "text",
                onClick: ($event) => {
                  fields2._show = false;
                  onFieldsUpdate(fields2);
                }
              }, {
                default: withCtx((_22, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`确定`);
                  } else {
                    return [
                      createTextVNode("确定")
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_el_button, {
                type: "text",
                onClick: ($event) => fields2._show = false
              }, {
                default: withCtx((_22, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`取消`);
                  } else {
                    return [
                      createTextVNode("取消")
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              return [
                createVNode(_component_el_form, { "label-width": "100" }, {
                  default: withCtx(() => [
                    (openBlock(true), createBlock(Fragment, null, renderList(unref(quickEditFields), (item2, index2) => {
                      return openBlock(), createBlock(_component_el_form_item, {
                        key: index2,
                        label: item2.label
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_el_input, {
                            modelValue: fields2[item2.key],
                            "onUpdate:modelValue": ($event) => fields2[item2.key] = $event
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        _: 2
                      }, 1032, ["label"]);
                    }), 128))
                  ]),
                  _: 2
                }, 1024),
                createVNode("div", {
                  class: "flex f-jcfe",
                  style: { "text-align": "right" }
                }, [
                  createVNode(_component_el_button, {
                    type: "text",
                    onClick: ($event) => {
                      fields2._show = false;
                      onFieldsUpdate(fields2);
                    }
                  }, {
                    default: withCtx(() => [
                      createTextVNode("确定")
                    ]),
                    _: 2
                  }, 1032, ["onClick"]),
                  createVNode(_component_el_button, {
                    type: "text",
                    onClick: ($event) => fields2._show = false
                  }, {
                    default: withCtx(() => [
                      createTextVNode("取消")
                    ]),
                    _: 2
                  }, 1032, ["onClick"])
                ])
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`<div class="button-item" data-v-9317ee49>复制</div><div class="button-item" data-v-9317ee49>JSON编辑</div>`);
        if (unref(state2).showPanel && unref(state2).activeField.id == fields2.id) {
          _push(`<div class="button-item" data-v-9317ee49> 收起</div>`);
        } else {
          _push(`<div class="button-item" data-v-9317ee49> 编辑</div>`);
        }
        _push(`<div class="button-item" data-v-9317ee49>删除</div></div></div>`);
        if (unref(state2).showPanel && unref(state2).activeField.id == fields2.id) {
          _push(`<div class="main" data-v-9317ee49>`);
          _push(ssrRenderComponent(_sfc_main$a, {
            fields: unref(state2).activeField,
            onUpdate: onFieldsUpdate
          }, null, _parent));
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      });
      _push(`<!--]--></div>`);
      _push(ssrRenderComponent(JSONEdit, {
        modelValue: unref(state2).showJSON,
        "onUpdate:modelValue": ($event) => unref(state2).showJSON = $event,
        "component-options": unref(state2).activeField,
        onSave: onFieldsUpdate
      }, null, _parent));
      _push(ssrRenderComponent(JSONPanel, {
        modelValue: unref(state2).showJSONPanel,
        "onUpdate:modelValue": ($event) => unref(state2).showJSONPanel = $event,
        "model-type": unref(state2).modelType,
        fields: unref(state2).viewFields,
        onSave: onFieldsPanelUpdate
      }, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props2, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/factory/form/components/fieldsSetting/index.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props2, ctx) : void 0;
};
const FieldSetting = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["__scopeId", "data-v-9317ee49"]]);
const _sfc_main$7 = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  props: {
    componentOption: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ["update", "viewUpdate"],
  setup(__props2, { emit: __emit2 }) {
    const emits2 = __emit2;
    let fieldIdGroup = inject("fieldIdGroup");
    let state2 = reactive({
      checkedFields: []
    });
    watch(() => fieldIdGroup.value, (val) => {
      let { viewFieldGroup } = val;
      state2.checkedFields = Object.values(viewFieldGroup);
    }, { immediate: true, deep: true });
    computed(() => {
      let { menuFieldGroup, viewFieldGroup, historyFields } = fieldIdGroup.value;
      const unuseFields = [];
      const useFields = [];
      const deleteFields = [];
      Object.keys(historyFields).forEach((id) => {
        let field = historyFields[id];
        if (!(id in menuFieldGroup)) {
          deleteFields.push(field);
        } else if (id in viewFieldGroup) {
          useFields.push(field);
        } else {
          unuseFields.push(field);
        }
      });
      return [
        { label: "正在使用", options: useFields },
        { label: "菜单配置中有,但视图未使用", options: unuseFields },
        { label: "历史字段", options: deleteFields }
      ];
    });
    computed(() => {
      let { menuFieldGroup, viewFieldGroup } = fieldIdGroup.value;
      const updateInfos = [];
      Object.keys(menuFieldGroup).forEach((id) => {
        let field = menuFieldGroup[id];
        if (id in viewFieldGroup) {
          let { name, key: key2 } = field;
          let viewField = viewFieldGroup[id];
          let status = {
            name: name === viewField.name,
            key: key2 === viewField.key
          };
          for (const statuskey in status) {
            if (Object.prototype.hasOwnProperty.call(status, statuskey)) {
              const element = status[statuskey];
              if (!element) {
                updateInfos.push({
                  field: viewField,
                  nKey: statuskey,
                  msg: `view中${viewField.name}的${statuskey}与Menu表中的不一致`
                });
              }
            }
          }
        }
      });
      return updateInfos;
    });
    function onViewUpdate(options2) {
      emits2("viewUpdate", options2);
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_FormOptionPanel = resolveComponent("FormOptionPanel");
      _push(`<div${ssrRenderAttrs(_attrs)} data-v-dd213bd5>`);
      _push(ssrRenderComponent(_component_FormOptionPanel, {
        "component-option": __props2.componentOption,
        onUpdate: onViewUpdate
      }, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props2, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/factory/form/components/btnsSetting/index.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props2, ctx) : void 0;
};
const BtnsSetting = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["__scopeId", "data-v-dd213bd5"]]);
const componentTypeOptions = [
  {
    label: "UI-Form内部组件",
    options: [
      { label: "表单操作按钮组", value: "operate", attr: { componentType: 99 } }
    ]
  },
  {
    label: "输入字段",
    options: [
      { label: "文本", value: "input", attr: { componentType: 7, type: "text" } },
      { label: "单行输入框", value: "input", attr: { componentType: 7 } },
      { label: "多行文本", value: "input-textarea", attr: { componentType: 7, type: "textarea" } },
      { label: "密码", value: "input-password", attr: { componentType: 7, type: "password" } },
      { label: "计数器", value: "input-number", attr: { componentType: 24 } }
    ]
  },
  {
    label: "选择字段",
    options: [
      { label: "下拉选择器", value: "select", attr: { componentType: 8 } },
      { label: "级联选择器", value: "cascader", attr: { componentType: 9 } },
      { label: "树型结构选择器", disabled: true, value: "tree", attr: { componentType: 8, type: "tree" } },
      { label: "多选框", value: "checkbox-group", attr: { componentType: 10 } },
      { label: "单选框", value: "radio-group", attr: { componentType: 11 } },
      { label: "开关", value: "switch", attr: { componentType: 12 } }
    ]
  },
  {
    label: "日期时间字段",
    options: [
      { label: "年", value: "datePicker-year", attr: { componentType: 13, type: "year" } },
      { label: "月", value: "datePicker-month", attr: { componentType: 13, type: "month" } },
      { label: "日", value: "datePicker-day", attr: { componentType: 13, type: "day" } },
      { label: "周", value: "datePicker-week", attr: { componentType: 13, type: "week" } },
      { label: "日期默认", value: "datePicker-date", attr: { componentType: 13 } },
      // { label: '时间', value: 'timePicker', attr: { componentType: 12, type: 'year' } },
      { label: "日期时间", value: "datePicker-datetime", attr: { componentType: 13, type: "datetime" } },
      { label: "时间范围", value: "datePicker-datetimerange", attr: { componentType: 13, type: "datetimerange" } }
    ]
  },
  {
    label: "上传字段",
    options: [
      { label: "上传", value: "upload", attr: { componentType: 99 } }
    ]
  },
  {
    label: "其他",
    options: [
      { label: "插槽", value: "slot", attr: { componentType: 99 } },
      { label: "评分", value: "rate", attr: { componentType: 14 } },
      { label: "滑块", value: "slider", attr: { componentType: 15 } }
      // { label: '标签', value: 'tag', attr: { componentType: 16 } },
      // { label: '颜色选择器', value: 'colorPicker', attr: { componentType: 18 } },
    ]
  }
];
const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  props: {
    componentOption: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ["createFields", "update"],
  setup(__props2, { emit: __emit2 }) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "component-list" }, _attrs))} data-v-8ccbec67><!--[-->`);
      ssrRenderList(unref(componentTypeOptions), (group, gIndex) => {
        _push(`<div class="component-group"${ssrRenderAttr("label", group.label)} data-v-8ccbec67><div class="group-title" data-v-8ccbec67>${ssrInterpolate(group.label)}</div><div class="component-options" data-v-8ccbec67><!--[-->`);
        ssrRenderList(group.options, (option, oInedx) => {
          _push(`<div class="${ssrRenderClass([{
            gray: option.disabled
          }, "component-item"])}" data-v-8ccbec67><div class="main" data-v-8ccbec67>${ssrInterpolate(option.label)}</div></div>`);
        });
        _push(`<!--]--></div></div>`);
      });
      _push(`<!--]--></div>`);
    };
  }
});
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props2, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/factory/form/components/componentSetting/index.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props2, ctx) : void 0;
};
const componentSetting = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["__scopeId", "data-v-8ccbec67"]]);
const gridInjectionKey = Symbol("grid");
const defaultCols = 24;
const gridProps = {
  cols: {
    type: [Number, String],
    default: defaultCols
  },
  xGap: {
    type: [Number, String],
    default: 0
  },
  yGap: {
    type: [Number, String],
    default: 0
  },
  style: [Object, String],
  itemStyle: [Object, String]
};
const _sfc_main$5 = defineComponent({
  name: "UiGrid",
  props: gridProps,
  setup(props2) {
    const computedColsRef = computed(() => Number(props2.cols));
    const computedStyleRef = computed(() => props2.style);
    provide(gridInjectionKey, {
      itemStyleRef: toRef(props2, "itemStyle"),
      xGapRef: toRef(props2, "xGap")
    });
    const style = computed(() => {
      return {
        width: "100%",
        display: "grid",
        gridTemplateColumns: `repeat(${computedColsRef.value}, minmax(0, 1fr))`,
        gridGap: `${props2.yGap}px ${props2.xGap}px`
      };
    });
    return {
      style: [computedStyleRef.value, style.value]
    };
  }
});
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<section${ssrRenderAttrs(mergeProps({
    class: "ui-grid",
    style: _ctx.style
  }, _attrs))}>`);
  ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
  _push(`</section>`);
}
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props2, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/factory/form/libUi/grid/src/grid.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props2, ctx) : void 0;
};
const UiGrid = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["ssrRender", _sfc_ssrRender$1]]);
const defaultSpan = 1;
const gridItemProps = {
  span: {
    type: [Number, String],
    default: defaultSpan
  },
  offset: {
    type: [Number, String],
    default: 0
  },
  style: [Object, String],
  // private props
  privateOffset: Number,
  privateSpan: Number,
  privateColStart: Number,
  privateShow: {
    type: Boolean,
    default: true
  }
};
const _sfc_main$4 = defineComponent({
  name: "UiGridItem",
  components: {},
  props: gridItemProps,
  setup(props2) {
    const {
      itemStyleRef,
      xGapRef
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    } = inject(gridInjectionKey);
    function deriveStyle() {
      const {
        span,
        offset,
        privateShow = true,
        privateColStart = void 0
      } = props2;
      const { value: xGap } = xGapRef;
      const mergedXGap = `${xGap}px`;
      return {
        display: !privateShow ? "none" : "",
        gridColumn: `${privateColStart ?? `span ${span}`}`,
        marginLeft: offset ? `calc((100% - (${span} - 1) * ${mergedXGap}) / ${span} * ${offset} + ${mergedXGap} * ${offset})` : ""
      };
    }
    const itemStyle = computed(() => {
      return Object.assign({}, itemStyleRef.value, props2.style);
    });
    let style = computed(() => {
      return [itemStyle.value, deriveStyle()];
    });
    function onGridClick() {
      console.log(1);
    }
    return {
      style,
      onGridClick
    };
  }
});
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<section${ssrRenderAttrs(mergeProps({
    class: "grid-item",
    style: _ctx.style
  }, _attrs))} data-v-73d722c2>`);
  ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
  _push(`</section>`);
}
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props2, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/factory/form/libUi/grid/src/grid.item.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props2, ctx) : void 0;
};
const UiGridItem = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-73d722c2"]]);
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "form",
  __ssrInlineRender: true,
  props: {
    model: { type: Object, default: () => ({}) },
    labels: { type: Array, default: () => [] },
    props: { type: Object, default: () => ({}) },
    options: { type: Object, default: () => ({}) }
  },
  emits: ["change"],
  setup(__props2, { expose: __expose, emit: __emit2 }) {
    function isFunction2() {
      return false;
    }
    const labelOptions = {
      relation: {
        table: "table-column",
        select: "option",
        "checkbox-group": "checkbox",
        "radio-group": "radio"
      }
    };
    const props2 = __props2;
    const emits2 = __emit2;
    __expose({
      resetFields,
      validate,
      validateField
    });
    const elFormRef = ref();
    const itemPrefix = ref("el-");
    const params = ref({});
    const useModel = useVModel(props2, "model", emits2);
    const showlist = ref([]);
    const formProps = computed(() => {
      return Object.assign({}, {
        labelWidth: "100px"
      }, props2.props);
    });
    const useLabels = ref([]);
    const rules = computed(() => {
      const useRules = {};
      useLabels.value.map((label) => {
        let { required } = label.props.formItem || {};
        useRules[label.key] = required ? [
          { required: true, message: `${label.label} 是必填项！`, trigger: "blur" },
          ...label.props.rule || []
        ] : label.props.rule || void 0;
      });
      return useRules;
    });
    watch(() => props2.model, () => {
      Promise.resolve().then(() => {
        Object.keys(params.value).map((key2) => {
          const label = useLabels.value.find((item2) => item2.key === key2) || {};
          if (label.type === "slot" && params.value[key2] && Object.keys(params.value[key2]).length > 0) {
            validateField(key2);
          }
        });
        batchShow();
      });
      setValue(params.value, props2.model, props2.labels);
    }, { immediate: true, deep: true });
    watch(() => props2.labels, () => {
      showlist.value = [];
      useLabels.value = props2.labels.map((item2) => {
        setPlaceholder(item2);
        setProps(item2);
        const { hasShowFn } = itemShow(item2);
        hasShowFn && showlist.value.push(item2);
        return item2;
      });
    }, { immediate: true });
    function setValue(ari, data, labels) {
      labels.map((label) => {
        const labelValue = get(data, label.key);
        ari[label.key] = labelValue;
      });
    }
    function setProps(item2) {
      var _a, _b;
      item2.gridProps = Object.assign({}, props2.options.gridItem || {
        span: 12
      }, ((_a = item2.props) == null ? void 0 : _a.gridItem) || {});
      item2.formItemProps = ((_b = item2.props) == null ? void 0 : _b.formItem) || {};
      return item2;
    }
    function setPlaceholder(item2) {
      var _a;
      let placeholder = (_a = item2.props) == null ? void 0 : _a.placeholder;
      if (!placeholder) {
        switch (true) {
          case ["input"].includes(String(item2.type)):
            placeholder = "请输入";
            break;
          default:
            placeholder = "请选择";
            break;
        }
        set(item2, "props.placeholder", placeholder);
      }
    }
    const gridPropsRef = computed(() => props2.options.grid || {
      xGap: 10,
      yGap: 5
    });
    const gridStyle = computed(() => {
      return Object.assign({
        alignItems: "center"
      }, gridPropsRef.value.style || {});
    });
    function itemShow(item2) {
      let visible = true;
      let hasShowFn = false;
      switch (true) {
        case isFunction2(item2.show):
          visible = true;
          hasShowFn = true;
          break;
        default:
          visible = item2.show !== false;
          break;
      }
      item2._visible = visible;
      return {
        hasShowFn
      };
    }
    function itemChange(value2, item2) {
      const useValue = (value2 == null ? void 0 : value2.target) ? value2.target.value : value2;
      delete useModel.value[item2.key];
      set(useModel.value, item2.key, useValue);
      if (isFunction2(item2.change))
        ;
      batchShow();
      const result2 = { params: useModel.value, key: item2.key, value: useValue };
      emits2("change", result2);
    }
    function batchShow() {
      showlist.value.map((i) => {
        const useItem = useLabels.value.find((l) => l.key === i.key);
        useItem && itemShow(useItem);
      });
    }
    function validateField(key2, callback) {
      return elFormRef.value.validateField(key2, callback);
    }
    function resetFields() {
      elFormRef.value.resetFields();
    }
    function validate() {
      return elFormRef.value.validate();
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_form = resolveComponent("el-form");
      const _component_el_form_item = resolveComponent("el-form-item");
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "ui-component" }, _attrs))} data-v-e852253b>`);
      _push(ssrRenderComponent(_component_el_form, mergeProps({
        ref_key: "elFormRef",
        ref: elFormRef,
        model: params.value
      }, formProps.value, { rules: rules.value }), {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(UiGrid), mergeProps(gridPropsRef.value, { style: gridStyle.value }), {
              default: withCtx((_22, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<!--[-->`);
                  ssrRenderList(useLabels.value, (item2, index) => {
                    _push3(`<!--[-->`);
                    if (item2._visible) {
                      _push3(ssrRenderComponent(unref(UiGridItem), mergeProps({ ref_for: true }, item2.gridProps), {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(ssrRenderComponent(_component_el_form_item, mergeProps({
                              class: ["ui-form-item", [{ hiddenLabel: Number(item2.formItemProps.labelWidth) === 0 }]],
                              label: item2.label,
                              prop: item2.key,
                              ref_for: true
                            }, item2.formItemProps), {
                              label: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  ssrRenderSlot(_ctx.$slots, `label-${item2.key}`, {}, () => {
                                    _push5(`<span data-v-e852253b${_scopeId4}>${ssrInterpolate(item2.label)}</span>`);
                                  }, _push5, _parent5, _scopeId4);
                                } else {
                                  return [
                                    renderSlot(_ctx.$slots, `label-${item2.key}`, {}, () => [
                                      createVNode("span", null, toDisplayString(item2.label), 1)
                                    ], true)
                                  ];
                                }
                              }),
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  if (item2.type === "slot") {
                                    ssrRenderSlot(_ctx.$slots, item2.slotName || item2.key, { item: item2 }, null, _push5, _parent5, _scopeId4);
                                  } else {
                                    _push5(`<!--[-->`);
                                    if (!(labelOptions.relation[item2.type] && item2.options && item2.options.length > 0)) {
                                      ssrRenderVNode(_push5, createVNode(resolveDynamicComponent(`${itemPrefix.value}${item2.type}`), mergeProps({
                                        modelValue: params.value[item2.key],
                                        "onUpdate:modelValue": ($event) => params.value[item2.key] = $event,
                                        ref_for: true
                                      }, item2.props, {
                                        onInput: (val) => itemChange(val, item2),
                                        onChange: (val) => itemChange(val, item2)
                                      }), null), _parent5, _scopeId4);
                                    } else {
                                      ssrRenderVNode(_push5, createVNode(resolveDynamicComponent(`${itemPrefix.value}${item2.type}`), mergeProps({
                                        modelValue: params.value[item2.key],
                                        "onUpdate:modelValue": ($event) => params.value[item2.key] = $event,
                                        ref_for: true
                                      }, item2.props, {
                                        onChange: (val) => itemChange(val, item2)
                                      }), {
                                        default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                          if (_push6) {
                                            _push6(`<!--[-->`);
                                            ssrRenderList(item2.options, (child, ci) => {
                                              var _a, _b;
                                              _push6(`<!--[-->`);
                                              if (child.text) {
                                                ssrRenderVNode(_push6, createVNode(resolveDynamicComponent(`${itemPrefix.value}${((_a = item2.child) == null ? void 0 : _a.type) || labelOptions.relation[item2.type]}`), mergeProps({ ref_for: true }, Object.assign(child, (child == null ? void 0 : child.props) || {})), {
                                                  default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                                    if (_push7) {
                                                      _push7(`<span data-v-e852253b${_scopeId6}>${child.text ?? ""}</span>`);
                                                    } else {
                                                      return [
                                                        createVNode("span", {
                                                          innerHTML: child.text
                                                        }, null, 8, ["innerHTML"])
                                                      ];
                                                    }
                                                  }),
                                                  _: 2
                                                }), _parent6, _scopeId5);
                                              } else {
                                                ssrRenderVNode(_push6, createVNode(resolveDynamicComponent(`${itemPrefix.value}${((_b = item2.child) == null ? void 0 : _b.type) || labelOptions.relation[item2.type]}`), mergeProps({ ref_for: true }, Object.assign(child, (child == null ? void 0 : child.props) || {})), null), _parent6, _scopeId5);
                                              }
                                              _push6(`<!--]-->`);
                                            });
                                            _push6(`<!--]-->`);
                                          } else {
                                            return [
                                              (openBlock(true), createBlock(Fragment, null, renderList(item2.options, (child, ci) => {
                                                var _a, _b;
                                                return openBlock(), createBlock(Fragment, { key: ci }, [
                                                  child.text ? (openBlock(), createBlock(resolveDynamicComponent(`${itemPrefix.value}${((_a = item2.child) == null ? void 0 : _a.type) || labelOptions.relation[item2.type]}`), mergeProps({
                                                    key: 0,
                                                    ref_for: true
                                                  }, Object.assign(child, (child == null ? void 0 : child.props) || {})), {
                                                    default: withCtx(() => [
                                                      createVNode("span", {
                                                        innerHTML: child.text
                                                      }, null, 8, ["innerHTML"])
                                                    ]),
                                                    _: 2
                                                  }, 1040)) : (openBlock(), createBlock(resolveDynamicComponent(`${itemPrefix.value}${((_b = item2.child) == null ? void 0 : _b.type) || labelOptions.relation[item2.type]}`), mergeProps({
                                                    key: 1,
                                                    ref_for: true
                                                  }, Object.assign(child, (child == null ? void 0 : child.props) || {})), null, 16))
                                                ], 64);
                                              }), 128))
                                            ];
                                          }
                                        }),
                                        _: 2
                                      }), _parent5, _scopeId4);
                                    }
                                    _push5(`<!--]-->`);
                                  }
                                } else {
                                  return [
                                    item2.type === "slot" ? renderSlot(_ctx.$slots, item2.slotName || item2.key, {
                                      key: 0,
                                      item: item2
                                    }, void 0, true) : (openBlock(), createBlock(Fragment, { key: 1 }, [
                                      !(labelOptions.relation[item2.type] && item2.options && item2.options.length > 0) ? (openBlock(), createBlock(resolveDynamicComponent(`${itemPrefix.value}${item2.type}`), mergeProps({
                                        key: 0,
                                        modelValue: params.value[item2.key],
                                        "onUpdate:modelValue": ($event) => params.value[item2.key] = $event,
                                        ref_for: true
                                      }, item2.props, {
                                        onInput: (val) => itemChange(val, item2),
                                        onChange: (val) => itemChange(val, item2)
                                      }), null, 16, ["modelValue", "onUpdate:modelValue", "onInput", "onChange"])) : (openBlock(), createBlock(resolveDynamicComponent(`${itemPrefix.value}${item2.type}`), mergeProps({
                                        key: 1,
                                        modelValue: params.value[item2.key],
                                        "onUpdate:modelValue": ($event) => params.value[item2.key] = $event,
                                        ref_for: true
                                      }, item2.props, {
                                        onChange: (val) => itemChange(val, item2)
                                      }), {
                                        default: withCtx(() => [
                                          (openBlock(true), createBlock(Fragment, null, renderList(item2.options, (child, ci) => {
                                            var _a, _b;
                                            return openBlock(), createBlock(Fragment, { key: ci }, [
                                              child.text ? (openBlock(), createBlock(resolveDynamicComponent(`${itemPrefix.value}${((_a = item2.child) == null ? void 0 : _a.type) || labelOptions.relation[item2.type]}`), mergeProps({
                                                key: 0,
                                                ref_for: true
                                              }, Object.assign(child, (child == null ? void 0 : child.props) || {})), {
                                                default: withCtx(() => [
                                                  createVNode("span", {
                                                    innerHTML: child.text
                                                  }, null, 8, ["innerHTML"])
                                                ]),
                                                _: 2
                                              }, 1040)) : (openBlock(), createBlock(resolveDynamicComponent(`${itemPrefix.value}${((_b = item2.child) == null ? void 0 : _b.type) || labelOptions.relation[item2.type]}`), mergeProps({
                                                key: 1,
                                                ref_for: true
                                              }, Object.assign(child, (child == null ? void 0 : child.props) || {})), null, 16))
                                            ], 64);
                                          }), 128))
                                        ]),
                                        _: 2
                                      }, 1040, ["modelValue", "onUpdate:modelValue", "onChange"]))
                                    ], 64))
                                  ];
                                }
                              }),
                              _: 2
                            }, _parent4, _scopeId3));
                          } else {
                            return [
                              createVNode(_component_el_form_item, mergeProps({
                                class: ["ui-form-item", [{ hiddenLabel: Number(item2.formItemProps.labelWidth) === 0 }]],
                                label: item2.label,
                                prop: item2.key,
                                ref_for: true
                              }, item2.formItemProps), {
                                label: withCtx(() => [
                                  renderSlot(_ctx.$slots, `label-${item2.key}`, {}, () => [
                                    createVNode("span", null, toDisplayString(item2.label), 1)
                                  ], true)
                                ]),
                                default: withCtx(() => [
                                  item2.type === "slot" ? renderSlot(_ctx.$slots, item2.slotName || item2.key, {
                                    key: 0,
                                    item: item2
                                  }, void 0, true) : (openBlock(), createBlock(Fragment, { key: 1 }, [
                                    !(labelOptions.relation[item2.type] && item2.options && item2.options.length > 0) ? (openBlock(), createBlock(resolveDynamicComponent(`${itemPrefix.value}${item2.type}`), mergeProps({
                                      key: 0,
                                      modelValue: params.value[item2.key],
                                      "onUpdate:modelValue": ($event) => params.value[item2.key] = $event,
                                      ref_for: true
                                    }, item2.props, {
                                      onInput: (val) => itemChange(val, item2),
                                      onChange: (val) => itemChange(val, item2)
                                    }), null, 16, ["modelValue", "onUpdate:modelValue", "onInput", "onChange"])) : (openBlock(), createBlock(resolveDynamicComponent(`${itemPrefix.value}${item2.type}`), mergeProps({
                                      key: 1,
                                      modelValue: params.value[item2.key],
                                      "onUpdate:modelValue": ($event) => params.value[item2.key] = $event,
                                      ref_for: true
                                    }, item2.props, {
                                      onChange: (val) => itemChange(val, item2)
                                    }), {
                                      default: withCtx(() => [
                                        (openBlock(true), createBlock(Fragment, null, renderList(item2.options, (child, ci) => {
                                          var _a, _b;
                                          return openBlock(), createBlock(Fragment, { key: ci }, [
                                            child.text ? (openBlock(), createBlock(resolveDynamicComponent(`${itemPrefix.value}${((_a = item2.child) == null ? void 0 : _a.type) || labelOptions.relation[item2.type]}`), mergeProps({
                                              key: 0,
                                              ref_for: true
                                            }, Object.assign(child, (child == null ? void 0 : child.props) || {})), {
                                              default: withCtx(() => [
                                                createVNode("span", {
                                                  innerHTML: child.text
                                                }, null, 8, ["innerHTML"])
                                              ]),
                                              _: 2
                                            }, 1040)) : (openBlock(), createBlock(resolveDynamicComponent(`${itemPrefix.value}${((_b = item2.child) == null ? void 0 : _b.type) || labelOptions.relation[item2.type]}`), mergeProps({
                                              key: 1,
                                              ref_for: true
                                            }, Object.assign(child, (child == null ? void 0 : child.props) || {})), null, 16))
                                          ], 64);
                                        }), 128))
                                      ]),
                                      _: 2
                                    }, 1040, ["modelValue", "onUpdate:modelValue", "onChange"]))
                                  ], 64))
                                ]),
                                _: 2
                              }, 1040, ["class", "label", "prop"])
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                    } else {
                      _push3(`<!---->`);
                    }
                    _push3(`<!--]-->`);
                  });
                  _push3(`<!--]-->`);
                } else {
                  return [
                    (openBlock(true), createBlock(Fragment, null, renderList(useLabels.value, (item2, index) => {
                      return openBlock(), createBlock(Fragment, { key: index }, [
                        item2._visible ? (openBlock(), createBlock(unref(UiGridItem), mergeProps({
                          key: 0,
                          ref_for: true
                        }, item2.gridProps), {
                          default: withCtx(() => [
                            createVNode(_component_el_form_item, mergeProps({
                              class: ["ui-form-item", [{ hiddenLabel: Number(item2.formItemProps.labelWidth) === 0 }]],
                              label: item2.label,
                              prop: item2.key,
                              ref_for: true
                            }, item2.formItemProps), {
                              label: withCtx(() => [
                                renderSlot(_ctx.$slots, `label-${item2.key}`, {}, () => [
                                  createVNode("span", null, toDisplayString(item2.label), 1)
                                ], true)
                              ]),
                              default: withCtx(() => [
                                item2.type === "slot" ? renderSlot(_ctx.$slots, item2.slotName || item2.key, {
                                  key: 0,
                                  item: item2
                                }, void 0, true) : (openBlock(), createBlock(Fragment, { key: 1 }, [
                                  !(labelOptions.relation[item2.type] && item2.options && item2.options.length > 0) ? (openBlock(), createBlock(resolveDynamicComponent(`${itemPrefix.value}${item2.type}`), mergeProps({
                                    key: 0,
                                    modelValue: params.value[item2.key],
                                    "onUpdate:modelValue": ($event) => params.value[item2.key] = $event,
                                    ref_for: true
                                  }, item2.props, {
                                    onInput: (val) => itemChange(val, item2),
                                    onChange: (val) => itemChange(val, item2)
                                  }), null, 16, ["modelValue", "onUpdate:modelValue", "onInput", "onChange"])) : (openBlock(), createBlock(resolveDynamicComponent(`${itemPrefix.value}${item2.type}`), mergeProps({
                                    key: 1,
                                    modelValue: params.value[item2.key],
                                    "onUpdate:modelValue": ($event) => params.value[item2.key] = $event,
                                    ref_for: true
                                  }, item2.props, {
                                    onChange: (val) => itemChange(val, item2)
                                  }), {
                                    default: withCtx(() => [
                                      (openBlock(true), createBlock(Fragment, null, renderList(item2.options, (child, ci) => {
                                        var _a, _b;
                                        return openBlock(), createBlock(Fragment, { key: ci }, [
                                          child.text ? (openBlock(), createBlock(resolveDynamicComponent(`${itemPrefix.value}${((_a = item2.child) == null ? void 0 : _a.type) || labelOptions.relation[item2.type]}`), mergeProps({
                                            key: 0,
                                            ref_for: true
                                          }, Object.assign(child, (child == null ? void 0 : child.props) || {})), {
                                            default: withCtx(() => [
                                              createVNode("span", {
                                                innerHTML: child.text
                                              }, null, 8, ["innerHTML"])
                                            ]),
                                            _: 2
                                          }, 1040)) : (openBlock(), createBlock(resolveDynamicComponent(`${itemPrefix.value}${((_b = item2.child) == null ? void 0 : _b.type) || labelOptions.relation[item2.type]}`), mergeProps({
                                            key: 1,
                                            ref_for: true
                                          }, Object.assign(child, (child == null ? void 0 : child.props) || {})), null, 16))
                                        ], 64);
                                      }), 128))
                                    ]),
                                    _: 2
                                  }, 1040, ["modelValue", "onUpdate:modelValue", "onChange"]))
                                ], 64))
                              ]),
                              _: 2
                            }, 1040, ["class", "label", "prop"])
                          ]),
                          _: 2
                        }, 1040)) : createCommentVNode("", true)
                      ], 64);
                    }), 128))
                  ];
                }
              }),
              _: 3
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(UiGrid), mergeProps(gridPropsRef.value, { style: gridStyle.value }), {
                default: withCtx(() => [
                  (openBlock(true), createBlock(Fragment, null, renderList(useLabels.value, (item2, index) => {
                    return openBlock(), createBlock(Fragment, { key: index }, [
                      item2._visible ? (openBlock(), createBlock(unref(UiGridItem), mergeProps({
                        key: 0,
                        ref_for: true
                      }, item2.gridProps), {
                        default: withCtx(() => [
                          createVNode(_component_el_form_item, mergeProps({
                            class: ["ui-form-item", [{ hiddenLabel: Number(item2.formItemProps.labelWidth) === 0 }]],
                            label: item2.label,
                            prop: item2.key,
                            ref_for: true
                          }, item2.formItemProps), {
                            label: withCtx(() => [
                              renderSlot(_ctx.$slots, `label-${item2.key}`, {}, () => [
                                createVNode("span", null, toDisplayString(item2.label), 1)
                              ], true)
                            ]),
                            default: withCtx(() => [
                              item2.type === "slot" ? renderSlot(_ctx.$slots, item2.slotName || item2.key, {
                                key: 0,
                                item: item2
                              }, void 0, true) : (openBlock(), createBlock(Fragment, { key: 1 }, [
                                !(labelOptions.relation[item2.type] && item2.options && item2.options.length > 0) ? (openBlock(), createBlock(resolveDynamicComponent(`${itemPrefix.value}${item2.type}`), mergeProps({
                                  key: 0,
                                  modelValue: params.value[item2.key],
                                  "onUpdate:modelValue": ($event) => params.value[item2.key] = $event,
                                  ref_for: true
                                }, item2.props, {
                                  onInput: (val) => itemChange(val, item2),
                                  onChange: (val) => itemChange(val, item2)
                                }), null, 16, ["modelValue", "onUpdate:modelValue", "onInput", "onChange"])) : (openBlock(), createBlock(resolveDynamicComponent(`${itemPrefix.value}${item2.type}`), mergeProps({
                                  key: 1,
                                  modelValue: params.value[item2.key],
                                  "onUpdate:modelValue": ($event) => params.value[item2.key] = $event,
                                  ref_for: true
                                }, item2.props, {
                                  onChange: (val) => itemChange(val, item2)
                                }), {
                                  default: withCtx(() => [
                                    (openBlock(true), createBlock(Fragment, null, renderList(item2.options, (child, ci) => {
                                      var _a, _b;
                                      return openBlock(), createBlock(Fragment, { key: ci }, [
                                        child.text ? (openBlock(), createBlock(resolveDynamicComponent(`${itemPrefix.value}${((_a = item2.child) == null ? void 0 : _a.type) || labelOptions.relation[item2.type]}`), mergeProps({
                                          key: 0,
                                          ref_for: true
                                        }, Object.assign(child, (child == null ? void 0 : child.props) || {})), {
                                          default: withCtx(() => [
                                            createVNode("span", {
                                              innerHTML: child.text
                                            }, null, 8, ["innerHTML"])
                                          ]),
                                          _: 2
                                        }, 1040)) : (openBlock(), createBlock(resolveDynamicComponent(`${itemPrefix.value}${((_b = item2.child) == null ? void 0 : _b.type) || labelOptions.relation[item2.type]}`), mergeProps({
                                          key: 1,
                                          ref_for: true
                                        }, Object.assign(child, (child == null ? void 0 : child.props) || {})), null, 16))
                                      ], 64);
                                    }), 128))
                                  ]),
                                  _: 2
                                }, 1040, ["modelValue", "onUpdate:modelValue", "onChange"]))
                              ], 64))
                            ]),
                            _: 2
                          }, 1040, ["class", "label", "prop"])
                        ]),
                        _: 2
                      }, 1040)) : createCommentVNode("", true)
                    ], 64);
                  }), 128))
                ]),
                _: 3
              }, 16, ["style"])
            ];
          }
        }),
        _: 3
      }, _parent));
      _push(`</section>`);
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props2, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/factory/form/libUi/form/src/form.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props2, ctx) : void 0;
};
const UiForm = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-e852253b"]]);
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "design.panel",
  __ssrInlineRender: true,
  props: {
    menu: {
      type: Object,
      default: () => ({})
    },
    componentOption: {
      type: Object,
      default: () => ({})
    },
    modelValue: { type: Boolean, default: false }
  },
  emits: ["update", "update:modelValue"],
  setup(__props2, { emit: __emit2 }) {
    const Config2 = ConfigOpt;
    const props2 = __props2;
    const emits2 = __emit2;
    const formRef = shallowRef();
    const fieldRef = shallowRef();
    const btnsRef = shallowRef();
    const activeTab = ref("field");
    let previewConfig = ref({
      model: {
        id: 123
      }
    });
    const show2 = computed({
      get: () => {
        if (props2.modelValue)
          ;
        return props2.modelValue;
      },
      set: (val) => emits2("update:modelValue", val)
    });
    const menuFields = computed(() => {
      return props2.menu.fields || [];
    });
    const viewFields = computed(() => {
      let fields2 = [];
      let componentOption = cloneDeep(props2.componentOption);
      let options2 = componentOption.options;
      let { component } = options2;
      let { labels } = component;
      if (labels) {
        fields2 = labels;
      }
      return fields2;
    });
    const fieldIdGroup = computed(() => {
      let menuFieldGroup = {};
      let viewFieldGroup = {};
      menuFields.value.forEach((field) => {
        menuFieldGroup[field.id] = field;
      });
      viewFields.value.forEach((field) => {
        viewFieldGroup[field.id] = field;
      });
      let group = { menuFieldGroup, viewFieldGroup, historyFields: historyFields.value };
      return group;
    });
    const historyFields = computed(() => {
      let fields2 = [];
      let componentOption = cloneDeep(props2.componentOption);
      let options2 = componentOption.options;
      let { custom = {} } = options2;
      let { historyFields: historyFields2 } = custom;
      if (historyFields2) {
        fields2 = historyFields2;
      }
      return fields2;
    });
    provide("fieldIdGroup", fieldIdGroup);
    provide("historyFields", historyFields);
    provide("menu", props2.menu);
    provide("componentOption", props2.componentOption);
    function init2() {
      let componentOption = cloneDeep(props2.componentOption);
      let options2 = componentOption.options;
      let { component } = options2;
      let { labels } = component;
      let historyFields2 = {};
      props2.menu.fields.forEach((field) => {
        historyFields2[field.id] = field;
      });
      if (JSON.stringify(component) === "{}") {
        options2 = {
          component: {
            labels: []
          },
          custom: {
            historyFields: {}
          }
        };
        options2.component.labels = props2.menu.fields;
        options2.custom.historyFields = historyFields2;
        componentOption.options = options2;
        onUpdate(componentOption);
      } else if (labels && labels.length === 0) {
        options2.component.labels = props2.menu.fields;
        options2.custom.historyFields = historyFields2;
        onUpdate(componentOption);
      } else {
        onUpdate(componentOption);
      }
    }
    function onViewUpdate(componentOption) {
      emits2("update", componentOption);
      setPreviewConfig(componentOption);
    }
    function onUpdate(componentOption = props2.componentOption) {
      let deepComponentOption = componentOption;
      fieldIdGroup.value;
      let options2 = deepComponentOption.options;
      let { custom = {
        historyFields: {}
      } } = options2;
      let { component } = options2;
      let { labels = [] } = component;
      custom.historyFields = {};
      labels.map((field) => {
        let { fieldConf = {} } = JSON.parse(get(field, "_options", field.options));
        try {
          if (!fieldConf.props) {
            fieldConf.props = [{ type: "props", option: {} }];
          }
          let option = fieldConf.props.filter((item2) => {
            return item2.type === "props";
          })[0] || {};
          field.label = option.fieldName || field.name || field.label;
          field.type = Config2.dictData.FieldUIMapper[`e${field.componentType}`] || "input";
        } catch (error) {
          console.log(`${field.name}更新出错`);
        }
        return field;
      });
      labels = labels.sort((a, b) => {
        return a.orderNum - b.orderNum;
      });
      emits2("update", deepComponentOption);
      setPreviewConfig(deepComponentOption);
    }
    function setPreviewConfig(deepComponentOption) {
      let component = deepComponentOption.options.component;
      let labels = component.labels;
      if (labels) {
        component.labels = labels.map((field, index) => {
          field.props = {};
          let options2 = JSON.parse(get(field, "_options", field.options)).fieldConf;
          try {
            if (options2.props) {
              let props22 = options2.props.filter((item2) => {
                return item2.type === "props";
              })[0];
              conversionFunction(props22.option);
              field.props = props22.option;
            }
          } catch (error) {
          }
          field["_options"] = cloneDeep(get(field, "_options", field.options));
          if (["select", "cascader", "tree", "checkbox-group", "radio-group"].includes(field.type)) {
            field.options = field.props.options || [];
            try {
              conversionOption(field.props.options, field);
            } catch (error) {
            }
          } else {
            delete field.options;
          }
          return field;
        });
      }
      previewConfig.value = component;
    }
    function conversionOption(options2, field) {
      let componentType = field.props.componentType;
      options2.map((option) => {
        option.label = option[field.props.dynamicConfig.label];
        option.value = option[field.props.dynamicConfig.value];
        if (option[field.props.dynamicConfig.children] && componentType === "cascader") {
          conversionOption(option[field.props.dynamicConfig.children], field);
        }
      });
      if (["checkbox-group", "radio-group"].includes(componentType)) {
        options2.map((option) => {
          option.text = option[field.props.dynamicConfig.label];
          option.props = field.props.childrenProps;
          return option;
        });
      }
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_dialog = resolveComponent("el-dialog");
      const _component_el_tabs = resolveComponent("el-tabs");
      const _component_el_tab_pane = resolveComponent("el-tab-pane");
      _push(ssrRenderComponent(_component_el_dialog, mergeProps({
        modelValue: show2.value,
        "onUpdate:modelValue": ($event) => show2.value = $event,
        fullscreen: "",
        "destroy-on-close": "",
        class: "design-panel-dialog",
        onOpen: init2
      }, _attrs), {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="design-container"${_scopeId}><div class="left"${_scopeId}>`);
            _push2(ssrRenderComponent(componentSetting, {
              "component-option": __props2.componentOption,
              onUpdate
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="center"${_scopeId}>`);
            _push2(ssrRenderComponent(UiForm, mergeProps({
              model: unref(previewConfig).model
            }, unref(previewConfig)), null, _parent2, _scopeId));
            _push2(`</div><div class="right"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_el_tabs, {
              modelValue: activeTab.value,
              "onUpdate:modelValue": ($event) => activeTab.value = $event
            }, {
              default: withCtx((_22, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_tab_pane, {
                    ref_key: "fieldRef",
                    ref: fieldRef,
                    label: "字段属性",
                    name: "field"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_tab_pane, {
                    ref_key: "formRef",
                    ref: formRef,
                    label: "表单属性",
                    name: "form"
                  }, null, _parent3, _scopeId2));
                  if (activeTab.value === "form") {
                    _push3(ssrRenderComponent(FormSetting, {
                      ref_key: "formRef",
                      ref: formRef,
                      "component-option": __props2.componentOption,
                      onViewUpdate,
                      onUpdate
                    }, null, _parent3, _scopeId2));
                  } else if (activeTab.value === "field") {
                    _push3(ssrRenderComponent(FieldSetting, {
                      ref_key: "fieldRef",
                      ref: fieldRef,
                      "view-fields": viewFields.value,
                      "component-option": __props2.componentOption,
                      "menu-fields": menuFields.value,
                      onUpdate
                    }, null, _parent3, _scopeId2));
                  } else if (activeTab.value === "btns") {
                    _push3(ssrRenderComponent(BtnsSetting, {
                      ref_key: "btnsRef",
                      ref: btnsRef,
                      "component-option": __props2.componentOption,
                      onViewUpdate,
                      onUpdate
                    }, null, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                } else {
                  return [
                    createVNode(_component_el_tab_pane, {
                      ref_key: "fieldRef",
                      ref: fieldRef,
                      label: "字段属性",
                      name: "field"
                    }, null, 512),
                    createVNode(_component_el_tab_pane, {
                      ref_key: "formRef",
                      ref: formRef,
                      label: "表单属性",
                      name: "form"
                    }, null, 512),
                    activeTab.value === "form" ? (openBlock(), createBlock(FormSetting, {
                      key: 0,
                      ref_key: "formRef",
                      ref: formRef,
                      "component-option": __props2.componentOption,
                      onViewUpdate,
                      onUpdate
                    }, null, 8, ["component-option"])) : activeTab.value === "field" ? (openBlock(), createBlock(FieldSetting, {
                      key: 1,
                      ref_key: "fieldRef",
                      ref: fieldRef,
                      "view-fields": viewFields.value,
                      "component-option": __props2.componentOption,
                      "menu-fields": menuFields.value,
                      onUpdate
                    }, null, 8, ["view-fields", "component-option", "menu-fields"])) : activeTab.value === "btns" ? (openBlock(), createBlock(BtnsSetting, {
                      key: 2,
                      ref_key: "btnsRef",
                      ref: btnsRef,
                      "component-option": __props2.componentOption,
                      onViewUpdate,
                      onUpdate
                    }, null, 8, ["component-option"])) : createCommentVNode("", true)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", { class: "design-container" }, [
                createVNode("div", { class: "left" }, [
                  createVNode(componentSetting, {
                    "component-option": __props2.componentOption,
                    onUpdate
                  }, null, 8, ["component-option"])
                ]),
                createVNode("div", { class: "center" }, [
                  createVNode(UiForm, mergeProps({
                    model: unref(previewConfig).model
                  }, unref(previewConfig)), null, 16, ["model"])
                ]),
                createVNode("div", { class: "right" }, [
                  createVNode(_component_el_tabs, {
                    modelValue: activeTab.value,
                    "onUpdate:modelValue": ($event) => activeTab.value = $event
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_el_tab_pane, {
                        ref_key: "fieldRef",
                        ref: fieldRef,
                        label: "字段属性",
                        name: "field"
                      }, null, 512),
                      createVNode(_component_el_tab_pane, {
                        ref_key: "formRef",
                        ref: formRef,
                        label: "表单属性",
                        name: "form"
                      }, null, 512),
                      activeTab.value === "form" ? (openBlock(), createBlock(FormSetting, {
                        key: 0,
                        ref_key: "formRef",
                        ref: formRef,
                        "component-option": __props2.componentOption,
                        onViewUpdate,
                        onUpdate
                      }, null, 8, ["component-option"])) : activeTab.value === "field" ? (openBlock(), createBlock(FieldSetting, {
                        key: 1,
                        ref_key: "fieldRef",
                        ref: fieldRef,
                        "view-fields": viewFields.value,
                        "component-option": __props2.componentOption,
                        "menu-fields": menuFields.value,
                        onUpdate
                      }, null, 8, ["view-fields", "component-option", "menu-fields"])) : activeTab.value === "btns" ? (openBlock(), createBlock(BtnsSetting, {
                        key: 2,
                        ref_key: "btnsRef",
                        ref: btnsRef,
                        "component-option": __props2.componentOption,
                        onViewUpdate,
                        onUpdate
                      }, null, 8, ["component-option"])) : createCommentVNode("", true)
                    ]),
                    _: 1
                  }, 8, ["modelValue", "onUpdate:modelValue"])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props2, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/factory/form/design.panel.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props2, ctx) : void 0;
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "demo",
  __ssrInlineRender: true,
  setup(__props2) {
    let state2 = reactive({
      showDesignPanel: false
    });
    let menus = ref({
      fields: []
    });
    let componentOption = ref({
      id: 64,
      name: "ui-form",
      options: {
        "component": {
          "labels": [
            // {
            //     "sid": 1548,
            //     "id": 1548,
            //     "name": "文本",
            //     "key": "y37",
            //     "menuType": 5,
            //     "menuModule": "",
            //     "hidden": 1,
            //     "parentId": "",
            //     "orderNum": 1,
            //     "path": "#",
            //     "link": "#",
            //     "component": "#",
            //     "componentConfigId": "",
            //     "pageLoadType": 1,
            //     "pageType": 1,
            //     "componentType": 6,
            //     "icon": "",
            //     "projectId": "",
            //     "options": "{\"hiddenSide\":0,\"hiddenHeader\":0,\"fieldConf\":{\"open\":1,\"transform\":[{}],\"props\":[{\"type\":\"props\",\"option\":{\"type\":\"text\",\"disabled\":false,\"show\":false,\"isDetail\":false,\"clearable\":false,\"rule\":[],\"componentType\":\"input-text\",\"fieldName\":\"文本\",\"key\":\"y37\",\"sort\":1,\"formItem\":{\"class\":\"form-item-y37\"},\"gridItem\":{\"span\":12},\"extra\":{}}}]},\"btnConf\":{\"open\":0}}",
            //     "picture": "",
            //     "remark": "",
            //     "creater": "",
            //     "delete": 0,
            //     "source": "page-view",
            //     "label": "文本",
            //     "type": "text"
            // },
            // {
            //     "sid": 8381,
            //     "id": 8381,
            //     "name": "单行输入框",
            //     "key": "y77",
            //     "menuType": 5,
            //     "menuModule": "",
            //     "hidden": 1,
            //     "parentId": "",
            //     "orderNum": 99,
            //     "path": "#",
            //     "link": "#",
            //     "component": "#",
            //     "componentConfigId": "",
            //     "pageLoadType": 1,
            //     "pageType": 1,
            //     "componentType": 7,
            //     "icon": "",
            //     "projectId": "",
            //     "options": "{\"hiddenSide\":0,\"hiddenHeader\":0,\"fieldConf\":{\"open\":1,\"transform\":[{}],\"props\":[{\"type\":\"props\",\"option\":{\"disabled\":false,\"show\":false,\"isDetail\":false,\"clearable\":false,\"rule\":[],\"componentType\":\"input\",\"fieldName\":\"单行输入框\",\"key\":\"y77\",\"sort\":1,\"formItem\":{\"class\":\"form-item-y77\"},\"gridItem\":{\"span\":12},\"extra\":{},\"type\":\"\"}}]},\"btnConf\":{\"open\":0}}",
            //     "picture": "",
            //     "remark": "",
            //     "creater": "",
            //     "delete": 0,
            //     "source": "page-view",
            //     "label": "单行输入框",
            //     "type": "input"
            // },
            // {
            //     "sid": 9369,
            //     "id": 9369,
            //     "name": "表单操作按钮组",
            //     "key": "y28",
            //     "menuType": 5,
            //     "menuModule": "",
            //     "hidden": 1,
            //     "parentId": "",
            //     "orderNum": 99,
            //     "path": "#",
            //     "link": "#",
            //     "component": "#",
            //     "componentConfigId": "",
            //     "pageLoadType": 1,
            //     "pageType": 1,
            //     "componentType": 99,
            //     "icon": "",
            //     "projectId": "",
            //     "options": "{\"hiddenSide\":0,\"hiddenHeader\":0,\"fieldConf\":{\"open\":1,\"transform\":[{}],\"props\":[{\"type\":\"props\",\"option\":{\"type\":\"operate\"}}]},\"btnConf\":{\"open\":0}}",
            //     "picture": "",
            //     "remark": "",
            //     "creater": "",
            //     "delete": 0,
            //     "source": "page-view",
            //     "label": "表单操作按钮组",
            //     "type": "slot"
            // }
          ],
          "props": {
            // "label-width": "200px",
            // "labelPosition": "top",
            // "size": "large"
          },
          "options": {},
          "extra": {}
        },
        "custom": {
          "historyFields": {}
        }
      }
    });
    function onUpdate(componentOption2) {
      componentOption2.value = componentOption2;
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_button = resolveComponent("el-button");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_el_button, {
        onClick: ($event) => unref(state2).showDesignPanel = true
      }, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`设计模式`);
          } else {
            return [
              createTextVNode("设计模式")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_sfc_main$2, mergeProps({
        modelValue: unref(state2).showDesignPanel,
        "onUpdate:modelValue": ($event) => unref(state2).showDesignPanel = $event
      }, _ctx.$attrs, {
        onUpdate,
        menu: unref(menus),
        componentOption: unref(componentOption)
      }), null, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props2, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/factory/form/demo.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props2, ctx) : void 0;
};
const demo = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-f5db7916"]]);
const __pageData = JSON.parse('{"title":"表单设计器","description":"","frontmatter":{},"headers":[],"relativePath":"src/components/factory/form/readme.md","filePath":"src/components/factory/form/readme.md"}');
const __default__ = { name: "src/components/factory/form/readme.md" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...__default__,
  __ssrInlineRender: true,
  setup(__props2) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_demo_preview = resolveComponent("demo-preview");
      _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="表单设计器" tabindex="-1">表单设计器 <a class="header-anchor" href="#表单设计器" aria-label="Permalink to &quot;表单设计器&quot;">​</a></h1>`);
      _push(ssrRenderComponent(_component_demo_preview, {
        title: "",
        description: "",
        code: "%3Ctemplate%3E%0D%0A%20%20%3Cel-button%20@click=%22state.showDesignPanel%20=%20true%22%3E%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F%3C/el-button%3E%0D%0A%20%20%3CdesignPanel%20%0D%0A%20%20%20%20v-model=%22state.showDesignPanel%22%0D%0A%20%20%20%20v-bind=%22$attrs%22%20%0D%0A%20%20%20%20@update=%22onUpdate%22%20%0D%0A%20%20%20%20:menu=%22menus%22%0D%0A%20%20%20%20:componentOption=%22componentOption%22%20/%3E%0D%0A%3C/template%3E%0D%0A%0D%0A%0D%0A%3Cscript%20lang=%22ts%22%20setup%3E%0D%0Aimport%20%7B%20reactive,%20ref%20%7D%20from%20'vue'%0D%0Aimport%20designPanel%20from%20'./design.panel.vue'%0D%0A%0D%0A%0D%0Alet%20state%20=%20reactive(%7B%0D%0A%20%20showDesignPanel:%20false%0D%0A%7D)%0D%0A%0D%0A%0D%0Alet%20menus%20=%20ref(%7B%0D%0A%20%20fields:%20%5B%5D%0D%0A%7D)%0D%0Alet%20componentOption%20=%20ref%3Cany%3E(%7B%0D%0A%20%20id:%2064,%0D%0A%20%20name:%20%22ui-form%22,%0D%0A%20%20options:%20%7B%0D%0A%20%20%20%20%22component%22:%20%7B%0D%0A%20%20%20%20%20%20%22labels%22:%20%5B%0D%0A%20%20%20%20%20%20%20%20//%20%7B%0D%0A%20%20%20%20%20%20%20%20//%20%20%20%20%20%22sid%22:%201548,%0D%0A%20%20%20%20%20%20%20%20//%20%20%20%20%20%22id%22:%201548,%0D%0A%20%20%20%20%20%20%20%20//%20%20%20%20%20%22name%22:%20%22%E6%96%87%E6%9C%AC%22,%0D%0A%20%20%20%20%20%20%20%20//%20%20%20%20%20%22key%22:%20%22y37%22,%0D%0A%20%20%20%20%20%20%20%20//%20%20%20%20%20%22menuType%22:%205,%0D%0A%20%20%20%20%20%20%20%20//%20%20%20%20%20%22menuModule%22:%20%22%22,%0D%0A%20%20%20%20%20%20%20%20//%20%20%20%20%20%22hidden%22:%201,%0D%0A%20%20%20%20%20%20%20%20//%20%20%20%20%20%22parentId%22:%20%22%22,%0D%0A%20%20%20%20%20%20%20%20//%20%20%20%20%20%22orderNum%22:%201,%0D%0A%20%20%20%20%20%20%20%20//%20%20%20%20%20%22path%22:%20%22#%22,%0D%0A%20%20%20%20%20%20%20%20//%20%20%20%20%20%22link%22:%20%22#%22,%0D%0A%20%20%20%20%20%20%20%20//%20%20%20%20%20%22component%22:%20%22#%22,%0D%0A%20%20%20%20%20%20%20%20//%20%20%20%20%20%22componentConfigId%22:%20%22%22,%0D%0A%20%20%20%20%20%20%20%20//%20%20%20%20%20%22pageLoadType%22:%201,%0D%0A%20%20%20%20%20%20%20%20//%20%20%20%20%20%22pageType%22:%201,%0D%0A%20%20%20%20%20%20%20%20//%20%20%20%20%20%22componentType%22:%206,%0D%0A%20%20%20%20%20%20%20%20//%20%20%20%20%20%22icon%22:%20%22%22,%0D%0A%20%20%20%20%20%20%20%20//%20%20%20%20%20%22projectId%22:%20%22%22,%0D%0A%20%20%20%20%20%20%20%20//%20%20%20%20%20%22options%22:%20%22%7B%5C%22hiddenSide%5C%22:0,%5C%22hiddenHeader%5C%22:0,%5C%22fieldConf%5C%22:%7B%5C%22open%5C%22:1,%5C%22transform%5C%22:%5B%7B%7D%5D,%5C%22props%5C%22:%5B%7B%5C%22type%5C%22:%5C%22props%5C%22,%5C%22option%5C%22:%7B%5C%22type%5C%22:%5C%22text%5C%22,%5C%22disabled%5C%22:false,%5C%22show%5C%22:false,%5C%22isDetail%5C%22:false,%5C%22clearable%5C%22:false,%5C%22rule%5C%22:%5B%5D,%5C%22componentType%5C%22:%5C%22input-text%5C%22,%5C%22fieldName%5C%22:%5C%22%E6%96%87%E6%9C%AC%5C%22,%5C%22key%5C%22:%5C%22y37%5C%22,%5C%22sort%5C%22:1,%5C%22formItem%5C%22:%7B%5C%22class%5C%22:%5C%22form-item-y37%5C%22%7D,%5C%22gridItem%5C%22:%7B%5C%22span%5C%22:12%7D,%5C%22extra%5C%22:%7B%7D%7D%7D%5D%7D,%5C%22btnConf%5C%22:%7B%5C%22open%5C%22:0%7D%7D%22,%0D%0A%20%20%20%20%20%20%20%20//%20%20%20%20%20%22picture%22:%20%22%22,%0D%0A%20%20%20%20%20%20%20%20//%20%20%20%20%20%22remark%22:%20%22%22,%0D%0A%20%20%20%20%20%20%20%20//%20%20%20%20%20%22creater%22:%20%22%22,%0D%0A%20%20%20%20%20%20%20%20//%20%20%20%20%20%22delete%22:%200,%0D%0A%20%20%20%20%20%20%20%20//%20%20%20%20%20%22source%22:%20%22page-view%22,%0D%0A%20%20%20%20%20%20%20%20//%20%20%20%20%20%22label%22:%20%22%E6%96%87%E6%9C%AC%22,%0D%0A%20%20%20%20%20%20%20%20//%20%20%20%20%20%22type%22:%20%22text%22%0D%0A%20%20%20%20%20%20%20%20//%20%7D,%0D%0A%20%20%20%20%20%20%20%20//%20%7B%0D%0A%20%20%20%20%20%20%20%20//%20%20%20%20%20%22sid%22:%208381,%0D%0A%20%20%20%20%20%20%20%20//%20%20%20%20%20%22id%22:%208381,%0D%0A%20%20%20%20%20%20%20%20//%20%20%20%20%20%22name%22:%20%22%E5%8D%95%E8%A1%8C%E8%BE%93%E5%85%A5%E6%A1%86%22,%0D%0A%20%20%20%20%20%20%20%20//%20%20%20%20%20%22key%22:%20%22y77%22,%0D%0A%20%20%20%20%20%20%20%20//%20%20%20%20%20%22menuType%22:%205,%0D%0A%20%20%20%20%20%20%20%20//%20%20%20%20%20%22menuModule%22:%20%22%22,%0D%0A%20%20%20%20%20%20%20%20//%20%20%20%20%20%22hidden%22:%201,%0D%0A%20%20%20%20%20%20%20%20//%20%20%20%20%20%22parentId%22:%20%22%22,%0D%0A%20%20%20%20%20%20%20%20//%20%20%20%20%20%22orderNum%22:%2099,%0D%0A%20%20%20%20%20%20%20%20//%20%20%20%20%20%22path%22:%20%22#%22,%0D%0A%20%20%20%20%20%20%20%20//%20%20%20%20%20%22link%22:%20%22#%22,%0D%0A%20%20%20%20%20%20%20%20//%20%20%20%20%20%22component%22:%20%22#%22,%0D%0A%20%20%20%20%20%20%20%20//%20%20%20%20%20%22componentConfigId%22:%20%22%22,%0D%0A%20%20%20%20%20%20%20%20//%20%20%20%20%20%22pageLoadType%22:%201,%0D%0A%20%20%20%20%20%20%20%20//%20%20%20%20%20%22pageType%22:%201,%0D%0A%20%20%20%20%20%20%20%20//%20%20%20%20%20%22componentType%22:%207,%0D%0A%20%20%20%20%20%20%20%20//%20%20%20%20%20%22icon%22:%20%22%22,%0D%0A%20%20%20%20%20%20%20%20//%20%20%20%20%20%22projectId%22:%20%22%22,%0D%0A%20%20%20%20%20%20%20%20//%20%20%20%20%20%22options%22:%20%22%7B%5C%22hiddenSide%5C%22:0,%5C%22hiddenHeader%5C%22:0,%5C%22fieldConf%5C%22:%7B%5C%22open%5C%22:1,%5C%22transform%5C%22:%5B%7B%7D%5D,%5C%22props%5C%22:%5B%7B%5C%22type%5C%22:%5C%22props%5C%22,%5C%22option%5C%22:%7B%5C%22disabled%5C%22:false,%5C%22show%5C%22:false,%5C%22isDetail%5C%22:false,%5C%22clearable%5C%22:false,%5C%22rule%5C%22:%5B%5D,%5C%22componentType%5C%22:%5C%22input%5C%22,%5C%22fieldName%5C%22:%5C%22%E5%8D%95%E8%A1%8C%E8%BE%93%E5%85%A5%E6%A1%86%5C%22,%5C%22key%5C%22:%5C%22y77%5C%22,%5C%22sort%5C%22:1,%5C%22formItem%5C%22:%7B%5C%22class%5C%22:%5C%22form-item-y77%5C%22%7D,%5C%22gridItem%5C%22:%7B%5C%22span%5C%22:12%7D,%5C%22extra%5C%22:%7B%7D,%5C%22type%5C%22:%5C%22%5C%22%7D%7D%5D%7D,%5C%22btnConf%5C%22:%7B%5C%22open%5C%22:0%7D%7D%22,%0D%0A%20%20%20%20%20%20%20%20//%20%20%20%20%20%22picture%22:%20%22%22,%0D%0A%20%20%20%20%20%20%20%20//%20%20%20%20%20%22remark%22:%20%22%22,%0D%0A%20%20%20%20%20%20%20%20//%20%20%20%20%20%22creater%22:%20%22%22,%0D%0A%20%20%20%20%20%20%20%20//%20%20%20%20%20%22delete%22:%200,%0D%0A%20%20%20%20%20%20%20%20//%20%20%20%20%20%22source%22:%20%22page-view%22,%0D%0A%20%20%20%20%20%20%20%20//%20%20%20%20%20%22label%22:%20%22%E5%8D%95%E8%A1%8C%E8%BE%93%E5%85%A5%E6%A1%86%22,%0D%0A%20%20%20%20%20%20%20%20//%20%20%20%20%20%22type%22:%20%22input%22%0D%0A%20%20%20%20%20%20%20%20//%20%7D,%0D%0A%20%20%20%20%20%20%20%20//%20%7B%0D%0A%20%20%20%20%20%20%20%20//%20%20%20%20%20%22sid%22:%209369,%0D%0A%20%20%20%20%20%20%20%20//%20%20%20%20%20%22id%22:%209369,%0D%0A%20%20%20%20%20%20%20%20//%20%20%20%20%20%22name%22:%20%22%E8%A1%A8%E5%8D%95%E6%93%8D%E4%BD%9C%E6%8C%89%E9%92%AE%E7%BB%84%22,%0D%0A%20%20%20%20%20%20%20%20//%20%20%20%20%20%22key%22:%20%22y28%22,%0D%0A%20%20%20%20%20%20%20%20//%20%20%20%20%20%22menuType%22:%205,%0D%0A%20%20%20%20%20%20%20%20//%20%20%20%20%20%22menuModule%22:%20%22%22,%0D%0A%20%20%20%20%20%20%20%20//%20%20%20%20%20%22hidden%22:%201,%0D%0A%20%20%20%20%20%20%20%20//%20%20%20%20%20%22parentId%22:%20%22%22,%0D%0A%20%20%20%20%20%20%20%20//%20%20%20%20%20%22orderNum%22:%2099,%0D%0A%20%20%20%20%20%20%20%20//%20%20%20%20%20%22path%22:%20%22#%22,%0D%0A%20%20%20%20%20%20%20%20//%20%20%20%20%20%22link%22:%20%22#%22,%0D%0A%20%20%20%20%20%20%20%20//%20%20%20%20%20%22component%22:%20%22#%22,%0D%0A%20%20%20%20%20%20%20%20//%20%20%20%20%20%22componentConfigId%22:%20%22%22,%0D%0A%20%20%20%20%20%20%20%20//%20%20%20%20%20%22pageLoadType%22:%201,%0D%0A%20%20%20%20%20%20%20%20//%20%20%20%20%20%22pageType%22:%201,%0D%0A%20%20%20%20%20%20%20%20//%20%20%20%20%20%22componentType%22:%2099,%0D%0A%20%20%20%20%20%20%20%20//%20%20%20%20%20%22icon%22:%20%22%22,%0D%0A%20%20%20%20%20%20%20%20//%20%20%20%20%20%22projectId%22:%20%22%22,%0D%0A%20%20%20%20%20%20%20%20//%20%20%20%20%20%22options%22:%20%22%7B%5C%22hiddenSide%5C%22:0,%5C%22hiddenHeader%5C%22:0,%5C%22fieldConf%5C%22:%7B%5C%22open%5C%22:1,%5C%22transform%5C%22:%5B%7B%7D%5D,%5C%22props%5C%22:%5B%7B%5C%22type%5C%22:%5C%22props%5C%22,%5C%22option%5C%22:%7B%5C%22type%5C%22:%5C%22operate%5C%22%7D%7D%5D%7D,%5C%22btnConf%5C%22:%7B%5C%22open%5C%22:0%7D%7D%22,%0D%0A%20%20%20%20%20%20%20%20//%20%20%20%20%20%22picture%22:%20%22%22,%0D%0A%20%20%20%20%20%20%20%20//%20%20%20%20%20%22remark%22:%20%22%22,%0D%0A%20%20%20%20%20%20%20%20//%20%20%20%20%20%22creater%22:%20%22%22,%0D%0A%20%20%20%20%20%20%20%20//%20%20%20%20%20%22delete%22:%200,%0D%0A%20%20%20%20%20%20%20%20//%20%20%20%20%20%22source%22:%20%22page-view%22,%0D%0A%20%20%20%20%20%20%20%20//%20%20%20%20%20%22label%22:%20%22%E8%A1%A8%E5%8D%95%E6%93%8D%E4%BD%9C%E6%8C%89%E9%92%AE%E7%BB%84%22,%0D%0A%20%20%20%20%20%20%20%20//%20%20%20%20%20%22type%22:%20%22slot%22%0D%0A%20%20%20%20%20%20%20%20//%20%7D%0D%0A%20%20%20%20%20%20%5D,%0D%0A%20%20%20%20%20%20%22props%22:%20%7B%0D%0A%20%20%20%20%20%20%20%20//%20%22label-width%22:%20%22200px%22,%0D%0A%20%20%20%20%20%20%20%20//%20%22labelPosition%22:%20%22top%22,%0D%0A%20%20%20%20%20%20%20%20//%20%22size%22:%20%22large%22%0D%0A%20%20%20%20%20%20%7D,%0D%0A%20%20%20%20%20%20%22options%22:%20%7B%7D,%0D%0A%20%20%20%20%20%20%22extra%22:%20%7B%7D%0D%0A%20%20%20%20%7D,%0D%0A%20%20%20%20%22custom%22:%20%7B%0D%0A%20%20%20%20%20%20%22historyFields%22:%20%7B%7D%0D%0A%20%20%20%20%7D%0D%0A%20%20%7D%0D%0A%7D)%0D%0A%0D%0A%0D%0Afunction%20onUpdate(componentOption)%7B%0D%0A%20%20componentOption.value%20=%20componentOption%0D%0A%20%20%0D%0A%7D%0D%0A%3C/script%3E%0D%0A%0D%0A%3Cstyle%20lang=%22scss%22%20scoped%3E%0D%0A::v-deep(.form-title)%20%7B%0D%0A%20%20font-size:%2018px;%0D%0A%20%20font-family:%20Source%20Han%20Sans%20CN-Bold,%20Source%20Han%20Sans%20CN;%0D%0A%20%20font-weight:%20bold;%0D%0A%20%20color:%20#282F2C;%0D%0A%20%20position:%20relative;%0D%0A%20%20margin-bottom:%2010px;%0D%0A%20%20padding-left:%2010px;%0D%0A%0D%0A%20%20&::after%20%7B%0D%0A%20%20%20%20content:%20'';%0D%0A%20%20%20%20width:%204px;%0D%0A%20%20%20%20height:%2012px;%0D%0A%20%20%20%20background:%20#0366F1;%0D%0A%20%20%20%20border-radius:%200px%200px%200px%200px;%0D%0A%20%20%20%20opacity:%201;%0D%0A%20%20%20%20position:%20absolute;%0D%0A%20%20%20%20left:%200px;%0D%0A%20%20%20%20top:%2050%25;%0D%0A%20%20%20%20margin-top:%20-5px;%0D%0A%20%20%7D%0D%0A%7D%0D%0A%3C/style%3E%0D%0A",
        showCode: "%3Cpre%20class%3D%22shiki%20shiki-themes%20github-light%20github-dark%20vp-code%22%20v-pre%3D%22%22%3E%3Ccode%3E%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3E%26%23x3C%3B%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%2322863A%3B--shiki-dark%3A%2385E89D%22%3Etemplate%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3E%20%20%26%23x3C%3B%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%2322863A%3B--shiki-dark%3A%2385E89D%22%3Eel-button%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3E%20%40%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%236F42C1%3B--shiki-dark%3A%23B392F0%22%3Eclick%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3E%3D%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23032F62%3B--shiki-dark%3A%239ECBFF%22%3E%22%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3Estate.showDesignPanel%20%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23D73A49%3B--shiki-dark%3A%23F97583%22%3E%3D%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23005CC5%3B--shiki-dark%3A%2379B8FF%22%3E%20true%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23032F62%3B--shiki-dark%3A%239ECBFF%22%3E%22%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3E%3E%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F%26%23x3C%3B%2F%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%2322863A%3B--shiki-dark%3A%2385E89D%22%3Eel-button%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3E%20%20%26%23x3C%3B%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%2322863A%3B--shiki-dark%3A%2385E89D%22%3EdesignPanel%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3E%20%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%236F42C1%3B--shiki-dark%3A%23B392F0%22%3E%20%20%20%20v-model%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3E%3D%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23032F62%3B--shiki-dark%3A%239ECBFF%22%3E%22%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3Estate.showDesignPanel%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23032F62%3B--shiki-dark%3A%239ECBFF%22%3E%22%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%236F42C1%3B--shiki-dark%3A%23B392F0%22%3E%20%20%20%20v-bind%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3E%3D%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23032F62%3B--shiki-dark%3A%239ECBFF%22%3E%22%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3E%24attrs%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23032F62%3B--shiki-dark%3A%239ECBFF%22%3E%22%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3E%20%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3E%20%20%20%20%40%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%236F42C1%3B--shiki-dark%3A%23B392F0%22%3Eupdate%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3E%3D%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23032F62%3B--shiki-dark%3A%239ECBFF%22%3E%22%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3EonUpdate%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23032F62%3B--shiki-dark%3A%239ECBFF%22%3E%22%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3E%20%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3E%20%20%20%20%3A%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%236F42C1%3B--shiki-dark%3A%23B392F0%22%3Emenu%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3E%3D%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23032F62%3B--shiki-dark%3A%239ECBFF%22%3E%22%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3Emenus%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23032F62%3B--shiki-dark%3A%239ECBFF%22%3E%22%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3E%20%20%20%20%3A%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%236F42C1%3B--shiki-dark%3A%23B392F0%22%3EcomponentOption%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3E%3D%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23032F62%3B--shiki-dark%3A%239ECBFF%22%3E%22%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3EcomponentOption%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23032F62%3B--shiki-dark%3A%239ECBFF%22%3E%22%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3E%20%2F%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3E%26%23x3C%3B%2F%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%2322863A%3B--shiki-dark%3A%2385E89D%22%3Etemplate%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3E%26%23x3C%3B%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%2322863A%3B--shiki-dark%3A%2385E89D%22%3Escript%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%236F42C1%3B--shiki-dark%3A%23B392F0%22%3E%20lang%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3E%3D%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23032F62%3B--shiki-dark%3A%239ECBFF%22%3E%22ts%22%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%236F42C1%3B--shiki-dark%3A%23B392F0%22%3E%20setup%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%23D73A49%3B--shiki-dark%3A%23F97583%22%3Eimport%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3E%20%7B%20reactive%2C%20ref%20%7D%20%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23D73A49%3B--shiki-dark%3A%23F97583%22%3Efrom%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23032F62%3B--shiki-dark%3A%239ECBFF%22%3E%20'vue'%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%23D73A49%3B--shiki-dark%3A%23F97583%22%3Eimport%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3E%20designPanel%20%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23D73A49%3B--shiki-dark%3A%23F97583%22%3Efrom%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23032F62%3B--shiki-dark%3A%239ECBFF%22%3E%20'.%2Fdesign.panel.vue'%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%23D73A49%3B--shiki-dark%3A%23F97583%22%3Elet%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3E%20state%20%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23D73A49%3B--shiki-dark%3A%23F97583%22%3E%3D%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%236F42C1%3B--shiki-dark%3A%23B392F0%22%3E%20reactive%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3E(%7B%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3E%20%20showDesignPanel%3A%20%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23005CC5%3B--shiki-dark%3A%2379B8FF%22%3Efalse%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3E%7D)%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%23D73A49%3B--shiki-dark%3A%23F97583%22%3Elet%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3E%20menus%20%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23D73A49%3B--shiki-dark%3A%23F97583%22%3E%3D%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%236F42C1%3B--shiki-dark%3A%23B392F0%22%3E%20ref%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3E(%7B%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3E%20%20fields%3A%20%5B%5D%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3E%7D)%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%23D73A49%3B--shiki-dark%3A%23F97583%22%3Elet%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3E%20componentOption%20%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23D73A49%3B--shiki-dark%3A%23F97583%22%3E%3D%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%236F42C1%3B--shiki-dark%3A%23B392F0%22%3E%20ref%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3E%26%23x3C%3B%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23005CC5%3B--shiki-dark%3A%2379B8FF%22%3Eany%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3E%3E(%7B%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3E%20%20id%3A%20%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23005CC5%3B--shiki-dark%3A%2379B8FF%22%3E64%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3E%2C%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3E%20%20name%3A%20%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23032F62%3B--shiki-dark%3A%239ECBFF%22%3E%22ui-form%22%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3E%2C%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3E%20%20options%3A%20%7B%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%23032F62%3B--shiki-dark%3A%239ECBFF%22%3E%20%20%20%20%22component%22%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3E%3A%20%7B%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%23032F62%3B--shiki-dark%3A%239ECBFF%22%3E%20%20%20%20%20%20%22labels%22%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3E%3A%20%5B%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%236A737D%3B--shiki-dark%3A%236A737D%22%3E%20%20%20%20%20%20%20%20%2F%2F%20%7B%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%236A737D%3B--shiki-dark%3A%236A737D%22%3E%20%20%20%20%20%20%20%20%2F%2F%20%20%20%20%20%22sid%22%3A%201548%2C%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%236A737D%3B--shiki-dark%3A%236A737D%22%3E%20%20%20%20%20%20%20%20%2F%2F%20%20%20%20%20%22id%22%3A%201548%2C%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%236A737D%3B--shiki-dark%3A%236A737D%22%3E%20%20%20%20%20%20%20%20%2F%2F%20%20%20%20%20%22name%22%3A%20%22%E6%96%87%E6%9C%AC%22%2C%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%236A737D%3B--shiki-dark%3A%236A737D%22%3E%20%20%20%20%20%20%20%20%2F%2F%20%20%20%20%20%22key%22%3A%20%22y37%22%2C%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%236A737D%3B--shiki-dark%3A%236A737D%22%3E%20%20%20%20%20%20%20%20%2F%2F%20%20%20%20%20%22menuType%22%3A%205%2C%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%236A737D%3B--shiki-dark%3A%236A737D%22%3E%20%20%20%20%20%20%20%20%2F%2F%20%20%20%20%20%22menuModule%22%3A%20%22%22%2C%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%236A737D%3B--shiki-dark%3A%236A737D%22%3E%20%20%20%20%20%20%20%20%2F%2F%20%20%20%20%20%22hidden%22%3A%201%2C%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%236A737D%3B--shiki-dark%3A%236A737D%22%3E%20%20%20%20%20%20%20%20%2F%2F%20%20%20%20%20%22parentId%22%3A%20%22%22%2C%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%236A737D%3B--shiki-dark%3A%236A737D%22%3E%20%20%20%20%20%20%20%20%2F%2F%20%20%20%20%20%22orderNum%22%3A%201%2C%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%236A737D%3B--shiki-dark%3A%236A737D%22%3E%20%20%20%20%20%20%20%20%2F%2F%20%20%20%20%20%22path%22%3A%20%22%23%22%2C%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%236A737D%3B--shiki-dark%3A%236A737D%22%3E%20%20%20%20%20%20%20%20%2F%2F%20%20%20%20%20%22link%22%3A%20%22%23%22%2C%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%236A737D%3B--shiki-dark%3A%236A737D%22%3E%20%20%20%20%20%20%20%20%2F%2F%20%20%20%20%20%22component%22%3A%20%22%23%22%2C%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%236A737D%3B--shiki-dark%3A%236A737D%22%3E%20%20%20%20%20%20%20%20%2F%2F%20%20%20%20%20%22componentConfigId%22%3A%20%22%22%2C%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%236A737D%3B--shiki-dark%3A%236A737D%22%3E%20%20%20%20%20%20%20%20%2F%2F%20%20%20%20%20%22pageLoadType%22%3A%201%2C%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%236A737D%3B--shiki-dark%3A%236A737D%22%3E%20%20%20%20%20%20%20%20%2F%2F%20%20%20%20%20%22pageType%22%3A%201%2C%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%236A737D%3B--shiki-dark%3A%236A737D%22%3E%20%20%20%20%20%20%20%20%2F%2F%20%20%20%20%20%22componentType%22%3A%206%2C%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%236A737D%3B--shiki-dark%3A%236A737D%22%3E%20%20%20%20%20%20%20%20%2F%2F%20%20%20%20%20%22icon%22%3A%20%22%22%2C%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%236A737D%3B--shiki-dark%3A%236A737D%22%3E%20%20%20%20%20%20%20%20%2F%2F%20%20%20%20%20%22projectId%22%3A%20%22%22%2C%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%236A737D%3B--shiki-dark%3A%236A737D%22%3E%20%20%20%20%20%20%20%20%2F%2F%20%20%20%20%20%22options%22%3A%20%22%7B%5C%22hiddenSide%5C%22%3A0%2C%5C%22hiddenHeader%5C%22%3A0%2C%5C%22fieldConf%5C%22%3A%7B%5C%22open%5C%22%3A1%2C%5C%22transform%5C%22%3A%5B%7B%7D%5D%2C%5C%22props%5C%22%3A%5B%7B%5C%22type%5C%22%3A%5C%22props%5C%22%2C%5C%22option%5C%22%3A%7B%5C%22type%5C%22%3A%5C%22text%5C%22%2C%5C%22disabled%5C%22%3Afalse%2C%5C%22show%5C%22%3Afalse%2C%5C%22isDetail%5C%22%3Afalse%2C%5C%22clearable%5C%22%3Afalse%2C%5C%22rule%5C%22%3A%5B%5D%2C%5C%22componentType%5C%22%3A%5C%22input-text%5C%22%2C%5C%22fieldName%5C%22%3A%5C%22%E6%96%87%E6%9C%AC%5C%22%2C%5C%22key%5C%22%3A%5C%22y37%5C%22%2C%5C%22sort%5C%22%3A1%2C%5C%22formItem%5C%22%3A%7B%5C%22class%5C%22%3A%5C%22form-item-y37%5C%22%7D%2C%5C%22gridItem%5C%22%3A%7B%5C%22span%5C%22%3A12%7D%2C%5C%22extra%5C%22%3A%7B%7D%7D%7D%5D%7D%2C%5C%22btnConf%5C%22%3A%7B%5C%22open%5C%22%3A0%7D%7D%22%2C%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%236A737D%3B--shiki-dark%3A%236A737D%22%3E%20%20%20%20%20%20%20%20%2F%2F%20%20%20%20%20%22picture%22%3A%20%22%22%2C%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%236A737D%3B--shiki-dark%3A%236A737D%22%3E%20%20%20%20%20%20%20%20%2F%2F%20%20%20%20%20%22remark%22%3A%20%22%22%2C%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%236A737D%3B--shiki-dark%3A%236A737D%22%3E%20%20%20%20%20%20%20%20%2F%2F%20%20%20%20%20%22creater%22%3A%20%22%22%2C%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%236A737D%3B--shiki-dark%3A%236A737D%22%3E%20%20%20%20%20%20%20%20%2F%2F%20%20%20%20%20%22delete%22%3A%200%2C%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%236A737D%3B--shiki-dark%3A%236A737D%22%3E%20%20%20%20%20%20%20%20%2F%2F%20%20%20%20%20%22source%22%3A%20%22page-view%22%2C%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%236A737D%3B--shiki-dark%3A%236A737D%22%3E%20%20%20%20%20%20%20%20%2F%2F%20%20%20%20%20%22label%22%3A%20%22%E6%96%87%E6%9C%AC%22%2C%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%236A737D%3B--shiki-dark%3A%236A737D%22%3E%20%20%20%20%20%20%20%20%2F%2F%20%20%20%20%20%22type%22%3A%20%22text%22%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%236A737D%3B--shiki-dark%3A%236A737D%22%3E%20%20%20%20%20%20%20%20%2F%2F%20%7D%2C%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%236A737D%3B--shiki-dark%3A%236A737D%22%3E%20%20%20%20%20%20%20%20%2F%2F%20%7B%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%236A737D%3B--shiki-dark%3A%236A737D%22%3E%20%20%20%20%20%20%20%20%2F%2F%20%20%20%20%20%22sid%22%3A%208381%2C%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%236A737D%3B--shiki-dark%3A%236A737D%22%3E%20%20%20%20%20%20%20%20%2F%2F%20%20%20%20%20%22id%22%3A%208381%2C%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%236A737D%3B--shiki-dark%3A%236A737D%22%3E%20%20%20%20%20%20%20%20%2F%2F%20%20%20%20%20%22name%22%3A%20%22%E5%8D%95%E8%A1%8C%E8%BE%93%E5%85%A5%E6%A1%86%22%2C%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%236A737D%3B--shiki-dark%3A%236A737D%22%3E%20%20%20%20%20%20%20%20%2F%2F%20%20%20%20%20%22key%22%3A%20%22y77%22%2C%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%236A737D%3B--shiki-dark%3A%236A737D%22%3E%20%20%20%20%20%20%20%20%2F%2F%20%20%20%20%20%22menuType%22%3A%205%2C%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%236A737D%3B--shiki-dark%3A%236A737D%22%3E%20%20%20%20%20%20%20%20%2F%2F%20%20%20%20%20%22menuModule%22%3A%20%22%22%2C%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%236A737D%3B--shiki-dark%3A%236A737D%22%3E%20%20%20%20%20%20%20%20%2F%2F%20%20%20%20%20%22hidden%22%3A%201%2C%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%236A737D%3B--shiki-dark%3A%236A737D%22%3E%20%20%20%20%20%20%20%20%2F%2F%20%20%20%20%20%22parentId%22%3A%20%22%22%2C%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%236A737D%3B--shiki-dark%3A%236A737D%22%3E%20%20%20%20%20%20%20%20%2F%2F%20%20%20%20%20%22orderNum%22%3A%2099%2C%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%236A737D%3B--shiki-dark%3A%236A737D%22%3E%20%20%20%20%20%20%20%20%2F%2F%20%20%20%20%20%22path%22%3A%20%22%23%22%2C%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%236A737D%3B--shiki-dark%3A%236A737D%22%3E%20%20%20%20%20%20%20%20%2F%2F%20%20%20%20%20%22link%22%3A%20%22%23%22%2C%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%236A737D%3B--shiki-dark%3A%236A737D%22%3E%20%20%20%20%20%20%20%20%2F%2F%20%20%20%20%20%22component%22%3A%20%22%23%22%2C%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%236A737D%3B--shiki-dark%3A%236A737D%22%3E%20%20%20%20%20%20%20%20%2F%2F%20%20%20%20%20%22componentConfigId%22%3A%20%22%22%2C%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%236A737D%3B--shiki-dark%3A%236A737D%22%3E%20%20%20%20%20%20%20%20%2F%2F%20%20%20%20%20%22pageLoadType%22%3A%201%2C%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%236A737D%3B--shiki-dark%3A%236A737D%22%3E%20%20%20%20%20%20%20%20%2F%2F%20%20%20%20%20%22pageType%22%3A%201%2C%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%236A737D%3B--shiki-dark%3A%236A737D%22%3E%20%20%20%20%20%20%20%20%2F%2F%20%20%20%20%20%22componentType%22%3A%207%2C%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%236A737D%3B--shiki-dark%3A%236A737D%22%3E%20%20%20%20%20%20%20%20%2F%2F%20%20%20%20%20%22icon%22%3A%20%22%22%2C%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%236A737D%3B--shiki-dark%3A%236A737D%22%3E%20%20%20%20%20%20%20%20%2F%2F%20%20%20%20%20%22projectId%22%3A%20%22%22%2C%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%236A737D%3B--shiki-dark%3A%236A737D%22%3E%20%20%20%20%20%20%20%20%2F%2F%20%20%20%20%20%22options%22%3A%20%22%7B%5C%22hiddenSide%5C%22%3A0%2C%5C%22hiddenHeader%5C%22%3A0%2C%5C%22fieldConf%5C%22%3A%7B%5C%22open%5C%22%3A1%2C%5C%22transform%5C%22%3A%5B%7B%7D%5D%2C%5C%22props%5C%22%3A%5B%7B%5C%22type%5C%22%3A%5C%22props%5C%22%2C%5C%22option%5C%22%3A%7B%5C%22disabled%5C%22%3Afalse%2C%5C%22show%5C%22%3Afalse%2C%5C%22isDetail%5C%22%3Afalse%2C%5C%22clearable%5C%22%3Afalse%2C%5C%22rule%5C%22%3A%5B%5D%2C%5C%22componentType%5C%22%3A%5C%22input%5C%22%2C%5C%22fieldName%5C%22%3A%5C%22%E5%8D%95%E8%A1%8C%E8%BE%93%E5%85%A5%E6%A1%86%5C%22%2C%5C%22key%5C%22%3A%5C%22y77%5C%22%2C%5C%22sort%5C%22%3A1%2C%5C%22formItem%5C%22%3A%7B%5C%22class%5C%22%3A%5C%22form-item-y77%5C%22%7D%2C%5C%22gridItem%5C%22%3A%7B%5C%22span%5C%22%3A12%7D%2C%5C%22extra%5C%22%3A%7B%7D%2C%5C%22type%5C%22%3A%5C%22%5C%22%7D%7D%5D%7D%2C%5C%22btnConf%5C%22%3A%7B%5C%22open%5C%22%3A0%7D%7D%22%2C%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%236A737D%3B--shiki-dark%3A%236A737D%22%3E%20%20%20%20%20%20%20%20%2F%2F%20%20%20%20%20%22picture%22%3A%20%22%22%2C%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%236A737D%3B--shiki-dark%3A%236A737D%22%3E%20%20%20%20%20%20%20%20%2F%2F%20%20%20%20%20%22remark%22%3A%20%22%22%2C%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%236A737D%3B--shiki-dark%3A%236A737D%22%3E%20%20%20%20%20%20%20%20%2F%2F%20%20%20%20%20%22creater%22%3A%20%22%22%2C%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%236A737D%3B--shiki-dark%3A%236A737D%22%3E%20%20%20%20%20%20%20%20%2F%2F%20%20%20%20%20%22delete%22%3A%200%2C%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%236A737D%3B--shiki-dark%3A%236A737D%22%3E%20%20%20%20%20%20%20%20%2F%2F%20%20%20%20%20%22source%22%3A%20%22page-view%22%2C%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%236A737D%3B--shiki-dark%3A%236A737D%22%3E%20%20%20%20%20%20%20%20%2F%2F%20%20%20%20%20%22label%22%3A%20%22%E5%8D%95%E8%A1%8C%E8%BE%93%E5%85%A5%E6%A1%86%22%2C%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%236A737D%3B--shiki-dark%3A%236A737D%22%3E%20%20%20%20%20%20%20%20%2F%2F%20%20%20%20%20%22type%22%3A%20%22input%22%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%236A737D%3B--shiki-dark%3A%236A737D%22%3E%20%20%20%20%20%20%20%20%2F%2F%20%7D%2C%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%236A737D%3B--shiki-dark%3A%236A737D%22%3E%20%20%20%20%20%20%20%20%2F%2F%20%7B%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%236A737D%3B--shiki-dark%3A%236A737D%22%3E%20%20%20%20%20%20%20%20%2F%2F%20%20%20%20%20%22sid%22%3A%209369%2C%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%236A737D%3B--shiki-dark%3A%236A737D%22%3E%20%20%20%20%20%20%20%20%2F%2F%20%20%20%20%20%22id%22%3A%209369%2C%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%236A737D%3B--shiki-dark%3A%236A737D%22%3E%20%20%20%20%20%20%20%20%2F%2F%20%20%20%20%20%22name%22%3A%20%22%E8%A1%A8%E5%8D%95%E6%93%8D%E4%BD%9C%E6%8C%89%E9%92%AE%E7%BB%84%22%2C%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%236A737D%3B--shiki-dark%3A%236A737D%22%3E%20%20%20%20%20%20%20%20%2F%2F%20%20%20%20%20%22key%22%3A%20%22y28%22%2C%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%236A737D%3B--shiki-dark%3A%236A737D%22%3E%20%20%20%20%20%20%20%20%2F%2F%20%20%20%20%20%22menuType%22%3A%205%2C%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%236A737D%3B--shiki-dark%3A%236A737D%22%3E%20%20%20%20%20%20%20%20%2F%2F%20%20%20%20%20%22menuModule%22%3A%20%22%22%2C%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%236A737D%3B--shiki-dark%3A%236A737D%22%3E%20%20%20%20%20%20%20%20%2F%2F%20%20%20%20%20%22hidden%22%3A%201%2C%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%236A737D%3B--shiki-dark%3A%236A737D%22%3E%20%20%20%20%20%20%20%20%2F%2F%20%20%20%20%20%22parentId%22%3A%20%22%22%2C%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%236A737D%3B--shiki-dark%3A%236A737D%22%3E%20%20%20%20%20%20%20%20%2F%2F%20%20%20%20%20%22orderNum%22%3A%2099%2C%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%236A737D%3B--shiki-dark%3A%236A737D%22%3E%20%20%20%20%20%20%20%20%2F%2F%20%20%20%20%20%22path%22%3A%20%22%23%22%2C%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%236A737D%3B--shiki-dark%3A%236A737D%22%3E%20%20%20%20%20%20%20%20%2F%2F%20%20%20%20%20%22link%22%3A%20%22%23%22%2C%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%236A737D%3B--shiki-dark%3A%236A737D%22%3E%20%20%20%20%20%20%20%20%2F%2F%20%20%20%20%20%22component%22%3A%20%22%23%22%2C%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%236A737D%3B--shiki-dark%3A%236A737D%22%3E%20%20%20%20%20%20%20%20%2F%2F%20%20%20%20%20%22componentConfigId%22%3A%20%22%22%2C%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%236A737D%3B--shiki-dark%3A%236A737D%22%3E%20%20%20%20%20%20%20%20%2F%2F%20%20%20%20%20%22pageLoadType%22%3A%201%2C%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%236A737D%3B--shiki-dark%3A%236A737D%22%3E%20%20%20%20%20%20%20%20%2F%2F%20%20%20%20%20%22pageType%22%3A%201%2C%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%236A737D%3B--shiki-dark%3A%236A737D%22%3E%20%20%20%20%20%20%20%20%2F%2F%20%20%20%20%20%22componentType%22%3A%2099%2C%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%236A737D%3B--shiki-dark%3A%236A737D%22%3E%20%20%20%20%20%20%20%20%2F%2F%20%20%20%20%20%22icon%22%3A%20%22%22%2C%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%236A737D%3B--shiki-dark%3A%236A737D%22%3E%20%20%20%20%20%20%20%20%2F%2F%20%20%20%20%20%22projectId%22%3A%20%22%22%2C%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%236A737D%3B--shiki-dark%3A%236A737D%22%3E%20%20%20%20%20%20%20%20%2F%2F%20%20%20%20%20%22options%22%3A%20%22%7B%5C%22hiddenSide%5C%22%3A0%2C%5C%22hiddenHeader%5C%22%3A0%2C%5C%22fieldConf%5C%22%3A%7B%5C%22open%5C%22%3A1%2C%5C%22transform%5C%22%3A%5B%7B%7D%5D%2C%5C%22props%5C%22%3A%5B%7B%5C%22type%5C%22%3A%5C%22props%5C%22%2C%5C%22option%5C%22%3A%7B%5C%22type%5C%22%3A%5C%22operate%5C%22%7D%7D%5D%7D%2C%5C%22btnConf%5C%22%3A%7B%5C%22open%5C%22%3A0%7D%7D%22%2C%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%236A737D%3B--shiki-dark%3A%236A737D%22%3E%20%20%20%20%20%20%20%20%2F%2F%20%20%20%20%20%22picture%22%3A%20%22%22%2C%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%236A737D%3B--shiki-dark%3A%236A737D%22%3E%20%20%20%20%20%20%20%20%2F%2F%20%20%20%20%20%22remark%22%3A%20%22%22%2C%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%236A737D%3B--shiki-dark%3A%236A737D%22%3E%20%20%20%20%20%20%20%20%2F%2F%20%20%20%20%20%22creater%22%3A%20%22%22%2C%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%236A737D%3B--shiki-dark%3A%236A737D%22%3E%20%20%20%20%20%20%20%20%2F%2F%20%20%20%20%20%22delete%22%3A%200%2C%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%236A737D%3B--shiki-dark%3A%236A737D%22%3E%20%20%20%20%20%20%20%20%2F%2F%20%20%20%20%20%22source%22%3A%20%22page-view%22%2C%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%236A737D%3B--shiki-dark%3A%236A737D%22%3E%20%20%20%20%20%20%20%20%2F%2F%20%20%20%20%20%22label%22%3A%20%22%E8%A1%A8%E5%8D%95%E6%93%8D%E4%BD%9C%E6%8C%89%E9%92%AE%E7%BB%84%22%2C%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%236A737D%3B--shiki-dark%3A%236A737D%22%3E%20%20%20%20%20%20%20%20%2F%2F%20%20%20%20%20%22type%22%3A%20%22slot%22%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%236A737D%3B--shiki-dark%3A%236A737D%22%3E%20%20%20%20%20%20%20%20%2F%2F%20%7D%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3E%20%20%20%20%20%20%5D%2C%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%23032F62%3B--shiki-dark%3A%239ECBFF%22%3E%20%20%20%20%20%20%22props%22%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3E%3A%20%7B%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%236A737D%3B--shiki-dark%3A%236A737D%22%3E%20%20%20%20%20%20%20%20%2F%2F%20%22label-width%22%3A%20%22200px%22%2C%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%236A737D%3B--shiki-dark%3A%236A737D%22%3E%20%20%20%20%20%20%20%20%2F%2F%20%22labelPosition%22%3A%20%22top%22%2C%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%236A737D%3B--shiki-dark%3A%236A737D%22%3E%20%20%20%20%20%20%20%20%2F%2F%20%22size%22%3A%20%22large%22%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3E%20%20%20%20%20%20%7D%2C%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%23032F62%3B--shiki-dark%3A%239ECBFF%22%3E%20%20%20%20%20%20%22options%22%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3E%3A%20%7B%7D%2C%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%23032F62%3B--shiki-dark%3A%239ECBFF%22%3E%20%20%20%20%20%20%22extra%22%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3E%3A%20%7B%7D%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3E%20%20%20%20%7D%2C%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%23032F62%3B--shiki-dark%3A%239ECBFF%22%3E%20%20%20%20%22custom%22%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3E%3A%20%7B%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%23032F62%3B--shiki-dark%3A%239ECBFF%22%3E%20%20%20%20%20%20%22historyFields%22%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3E%3A%20%7B%7D%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3E%20%20%20%20%7D%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3E%20%20%7D%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3E%7D)%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%23D73A49%3B--shiki-dark%3A%23F97583%22%3Efunction%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%236F42C1%3B--shiki-dark%3A%23B392F0%22%3E%20onUpdate%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3E(%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23E36209%3B--shiki-dark%3A%23FFAB70%22%3EcomponentOption%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3E)%7B%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3E%20%20componentOption.value%20%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23D73A49%3B--shiki-dark%3A%23F97583%22%3E%3D%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3E%20componentOption%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3E%20%20%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3E%7D%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3E%26%23x3C%3B%2F%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%2322863A%3B--shiki-dark%3A%2385E89D%22%3Escript%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3E%26%23x3C%3B%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%2322863A%3B--shiki-dark%3A%2385E89D%22%3Estyle%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%236F42C1%3B--shiki-dark%3A%23B392F0%22%3E%20lang%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3E%3D%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23032F62%3B--shiki-dark%3A%239ECBFF%22%3E%22scss%22%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%236F42C1%3B--shiki-dark%3A%23B392F0%22%3E%20scoped%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3E%3A%3Av-deep(%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%236F42C1%3B--shiki-dark%3A%23B392F0%22%3E.form-title%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3E)%20%7B%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%23005CC5%3B--shiki-dark%3A%2379B8FF%22%3E%20%20font-size%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3E%3A%20%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23005CC5%3B--shiki-dark%3A%2379B8FF%22%3E18%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23D73A49%3B--shiki-dark%3A%23F97583%22%3Epx%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3E%3B%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%23005CC5%3B--shiki-dark%3A%2379B8FF%22%3E%20%20font-family%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3E%3A%20Source%20Han%20Sans%20CN%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23005CC5%3B--shiki-dark%3A%2379B8FF%22%3E-%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3EBold%2C%20Source%20Han%20Sans%20CN%3B%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%23005CC5%3B--shiki-dark%3A%2379B8FF%22%3E%20%20font-weight%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3E%3A%20%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23005CC5%3B--shiki-dark%3A%2379B8FF%22%3Ebold%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3E%3B%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%23005CC5%3B--shiki-dark%3A%2379B8FF%22%3E%20%20color%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3E%3A%20%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23005CC5%3B--shiki-dark%3A%2379B8FF%22%3E%23282F2C%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3E%3B%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%23005CC5%3B--shiki-dark%3A%2379B8FF%22%3E%20%20position%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3E%3A%20%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23005CC5%3B--shiki-dark%3A%2379B8FF%22%3Erelative%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3E%3B%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%23005CC5%3B--shiki-dark%3A%2379B8FF%22%3E%20%20margin-bottom%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3E%3A%20%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23005CC5%3B--shiki-dark%3A%2379B8FF%22%3E10%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23D73A49%3B--shiki-dark%3A%23F97583%22%3Epx%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3E%3B%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%23005CC5%3B--shiki-dark%3A%2379B8FF%22%3E%20%20padding-left%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3E%3A%20%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23005CC5%3B--shiki-dark%3A%2379B8FF%22%3E10%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23D73A49%3B--shiki-dark%3A%23F97583%22%3Epx%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3E%3B%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%2322863A%3B--shiki-dark%3A%2385E89D%22%3E%20%20%26%23x26%3B%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%236F42C1%3B--shiki-dark%3A%23B392F0%22%3E%3A%3Aafter%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3E%20%7B%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%2322863A%3B--shiki-dark%3A%2385E89D%22%3E%20%20%20%20content%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3E%3A%20%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23032F62%3B--shiki-dark%3A%239ECBFF%22%3E''%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3E%3B%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%23005CC5%3B--shiki-dark%3A%2379B8FF%22%3E%20%20%20%20width%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3E%3A%20%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23005CC5%3B--shiki-dark%3A%2379B8FF%22%3E4%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23D73A49%3B--shiki-dark%3A%23F97583%22%3Epx%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3E%3B%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%23005CC5%3B--shiki-dark%3A%2379B8FF%22%3E%20%20%20%20height%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3E%3A%20%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23005CC5%3B--shiki-dark%3A%2379B8FF%22%3E12%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23D73A49%3B--shiki-dark%3A%23F97583%22%3Epx%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3E%3B%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%23005CC5%3B--shiki-dark%3A%2379B8FF%22%3E%20%20%20%20background%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3E%3A%20%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23005CC5%3B--shiki-dark%3A%2379B8FF%22%3E%230366F1%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3E%3B%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%23005CC5%3B--shiki-dark%3A%2379B8FF%22%3E%20%20%20%20border-radius%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3E%3A%20%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23005CC5%3B--shiki-dark%3A%2379B8FF%22%3E0%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23D73A49%3B--shiki-dark%3A%23F97583%22%3Epx%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23005CC5%3B--shiki-dark%3A%2379B8FF%22%3E%200%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23D73A49%3B--shiki-dark%3A%23F97583%22%3Epx%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23005CC5%3B--shiki-dark%3A%2379B8FF%22%3E%200%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23D73A49%3B--shiki-dark%3A%23F97583%22%3Epx%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23005CC5%3B--shiki-dark%3A%2379B8FF%22%3E%200%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23D73A49%3B--shiki-dark%3A%23F97583%22%3Epx%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3E%3B%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%23005CC5%3B--shiki-dark%3A%2379B8FF%22%3E%20%20%20%20opacity%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3E%3A%20%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23005CC5%3B--shiki-dark%3A%2379B8FF%22%3E1%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3E%3B%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%23005CC5%3B--shiki-dark%3A%2379B8FF%22%3E%20%20%20%20position%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3E%3A%20%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23005CC5%3B--shiki-dark%3A%2379B8FF%22%3Eabsolute%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3E%3B%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%23005CC5%3B--shiki-dark%3A%2379B8FF%22%3E%20%20%20%20left%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3E%3A%20%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23005CC5%3B--shiki-dark%3A%2379B8FF%22%3E0%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23D73A49%3B--shiki-dark%3A%23F97583%22%3Epx%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3E%3B%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%23005CC5%3B--shiki-dark%3A%2379B8FF%22%3E%20%20%20%20top%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3E%3A%20%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23005CC5%3B--shiki-dark%3A%2379B8FF%22%3E50%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23D73A49%3B--shiki-dark%3A%23F97583%22%3E%25%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3E%3B%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%23005CC5%3B--shiki-dark%3A%2379B8FF%22%3E%20%20%20%20margin-top%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3E%3A%20%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23005CC5%3B--shiki-dark%3A%2379B8FF%22%3E-5%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23D73A49%3B--shiki-dark%3A%23F97583%22%3Epx%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3E%3B%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3E%20%20%7D%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3E%7D%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3E%26%23x3C%3B%2F%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%2322863A%3B--shiki-dark%3A%2385E89D%22%3Estyle%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%3C%2Fcode%3E%3C%2Fpre%3E",
        suffixName: "vue",
        absolutePath: "D:\\工作项目\\efficient-work-cli\\docs\\src\\components\\factory\\form\\demo.vue",
        relativePath: "./demo.vue"
      }, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<p${_scopeId}>`);
            _push2(ssrRenderComponent(demo, null, null, _parent2, _scopeId));
            _push2(`</p>`);
          } else {
            return [
              createVNode("p", null, [
                createVNode(demo)
              ])
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
_sfc_main.setup = (props2, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/factory/form/readme.md");
  return _sfc_setup ? _sfc_setup(props2, ctx) : void 0;
};
export {
  __pageData,
  _sfc_main as default
};
