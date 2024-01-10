<template>
  <div class="custom-modal">
    <van-dialog
      v-model:show="show"
      v-bind="$attrs"
      @confirm="onConfirm"
      @close="onCancel"
    >
      <template v-for="( slot, slotKey ) in $slots" #[slotKey]>
        <slot :name="slotKey"></slot>
      </template>
      <template #footer>
        <template v-if="footerShow && !$slots.footer">
          <div class="pass-box">
            <div class="poss-cancel btn" @click="onCancel">取消</div>
            <div class="poss-confirm btn" @click="onConfirm">{{ $attrs['confirm-text'] || '确定' }}</div>
          </div>
        </template>
      </template>
    </van-dialog>
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

<style lang="scss" >
.custom-modal {
  .van-dialog__header{
    padding-top: 10px;
  }
  .van-dialog__content{
    margin: 10px 0;
  }
}
.pass-box {
  text-align: center;
  padding-bottom: 10px;
  .btn {
    font-size: 12px;
    font-weight: 400;
    width: 96px;
    height: 28px;
    border-radius: 4px;
    padding: 0 20px;
    display: inline-block;
    line-height: 28px;
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
