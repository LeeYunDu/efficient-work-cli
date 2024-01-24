<template>
  <div class="custom-modal">
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
.custom-modal {
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
