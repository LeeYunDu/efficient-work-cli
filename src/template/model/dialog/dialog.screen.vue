<template>
  <div class="custom-modal">
    <el-dialog
      v-model="show"
      v-bind="$attrs"
      destroy-on-close
      append-to-body
      @close="onCancel"
      class="Simple-modal"
      
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
  if (_.hasIn($attrs,'onCancel')) return emits('onCancel')
  show.value = false
}

</script>

<style lang="scss">
.Simple-modal {
  &.el-dialog{
    border-radius: 0;
    background: linear-gradient(180deg, #004f8d 0%, rgba(0, 37, 66, 0.78) 100%);
    border: 1px solid;
    border-image: linear-gradient(
      180deg,
      rgba(0, 133, 238, 0),
      rgba(0, 133, 238, 1)
    );
    .el-dialog__header {
      padding: 0px;
      width: 100%;
      height: 61px;
      display: flex;
      align-items: center;
      background: {
        image: url(static/images/dialog/bg-dialog-header.png);
        size: 100% 49px;
        position: bottom;
        repeat: no-repeat;
      }
      position: relative;
      .el-dialog__title {
        font-size: 32px;
        font-family: YouSheBiaoTiHei-Regular, YouSheBiaoTiHei;
        color: #ffffff!important;
        padding-left: 90px;
        letter-spacing: 4px;
      }
      button {
        i {
          display: block;
          width: 24px;
          height: 24px;
          background: {
            image: url(static/images/dialog/icon-close.png);
            size: 100% 100%;
          }
          > svg {
            display: none;
            width: 100%;
            height: 100%;
          }
        }
      }
      &:before {
        content: '';
        display: inline-block;
        width: 27.5px;
        height: 33px;
        background: {
          image: url(static/images/dialog/icon-arrow-light.png);
          size: 100% 100%;
        }
        position: absolute;
        left: 15px;
        top: 15px;
        animation: lightMove 1.5s infinite linear;
      }

      &:after {
        content: '';
        display: inline-block;
        width: 27.5px;
        height: 33px;
        background: {
          image: url(static/images/dialog/icon-arrow-light.png);
          size: 100% 100%;
        }
        position: absolute;
        left: 35px;
        top: 15px;
        animation: lightMove 1.5s infinite linear 0.2s;
      }
    }

    .el-dialog__body {
      display: flex;
      flex-direction: column;
      padding: 26px 17px;
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
}


</style>
