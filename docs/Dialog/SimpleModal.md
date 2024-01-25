

<script setup>
import { ref } from 'vue'
import testVue from '../../src/template/model/other/test.vue'
</script>
# SimpleModal
基于element-plus Dialog 封装，又拓展了很多业务场景的Dialog，方便使用。
## 使用说明
通过脚手架可以下载多种类型的Dialog,各类型的Dialog都写了双向绑定和关闭事件、弹窗打开请求数据、props定义。
组件类型太多，不放置源码了。
## Table Dialog 用法
Dialog里显示表格,包含ui-table的基础用法、columns定义、表格交互函数的定义、异步请求数据
## Form Dialog 用法
Dialog里显示弹窗,包含ui-form的基础用法、labels定义、表格交互函数的定义、异步请求数据
## NoTitle Dialog 用法
Dialog里空空如也,并且标题不显示。
## Import Dialog 用法
Excel导入弹窗，内置功能 上传组件、模版文件下载、导入提示语
## Screen Dialog 用法
大屏项目使用的simple.dialog，写了el-dialog 中 header、body 的样式
## SimpleModal 源代码
::: details 查看源代码

``` vue
<template>
  <div class="simple-modal">
    <el-dialog
      v-model="show"
      v-bind="$attrs"
      @close="onCancel"
    >
      <template v-for="( slot, slotKey ) in $slots" #[slotKey]>
        <slot :name="slotKey"></slot>
      </template>
      <template v-if="footerShow && !$slots.footer" #footer>
        <div class="pass-box">
          <el-button class="poss-cancel btn" @click="onCancel">取消</el-button>
          <el-button :loading="btnLoading" class="poss-confirm btn" @click="onConfirm">{{ $attrs['confirm-text'] || '确定' }}</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>
<script setup lang="ts">
import _ from 'lodash-es'
import { computed, ref, useAttrs } from 'vue'
const props = defineProps({
  modelValue: { type: Boolean, default: false },
  footerShow: { type: Boolean, default: false },
  bodyPadding: { type: [Array,String], default: () => ([]) },
})

const emits = defineEmits(['update:modelValue','onOK','onCancel'])

const $attrs = useAttrs()

const show = computed({
  get: () => props.modelValue,
  set: val => emits('update:modelValue',val)
})

const _bodyPadding = computed(() => {
  const style = props.bodyPadding
  if (!style) return '10px'
  if (_.isString(style)) return style + 'px'
  return style.join('px ') + 'px'
})

const btnLoading = ref(false)

const onConfirm = () => {
  btnLoading.value = true
  emits('onOK',() => {
    btnLoading.value = false
  })
}

const onCancel = () => {
  if (!(_.hasIn($attrs,'onCancel'))) return emits('onCancel')
  show.value = false
}

</script>

<style lang="scss">
.simple-modal {
  .el-dialog {
    background: #FFFFFF;
    border-radius: 0;
    .el-dialog__header {
      display: flex;
      justify-content: center;
      align-items: end;
      padding: 0 24px;
      width: 100%;
      height: 46px;
      background: #FFFFFF;
      .el-dialog__title {
        font-size: 20px;
        font-weight: 600;
        color: #272727;
        line-height: 28px;
      }
      button {
        i {
          font-size: 25px;
          > svg {
            width: 100%;
            height: 100%;
          }
        }
      }
    }

    .el-dialog__body {
      padding: v-bind(_bodyPadding);
    }
  }
}
.pass-box {
  text-align: center;
  .btn {
    font-size: 14px;
    font-weight: 400;
    width: 96px;
    height: 36px;
    border-radius: 4px;
    padding: 0 20px;
    display: inline-block;
    line-height: 36px;
    cursor: pointer;
    min-height: initial;
  }
  .poss-confirm {
    margin-left: 20px;
    color: #FFFFFF;
    background: linear-gradient(56deg, #3061FF 0%, #3DA0FD 100%);
  }
  .poss-cancel {
    color: rgba(0, 0, 0, 0.65);
    background: #FFFFFF;
    border: 1px solid rgba(0, 0, 0, 0.15);
  }
}

</style>
``` 


:::

<style module>
.button {
  color: red;
  font-weight: bold;
}
</style>