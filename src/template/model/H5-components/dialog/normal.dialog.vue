
<template>
  <SimpleModal
    v-model="state.show"
    :title="state.title"
    :footer-show="true"
    @onOK="onConfirm"
    @closed="onClosed"
  >
    <template >
      
    </template>
  </SimpleModal>
</template>

<script lang="ts" setup>
import SimpleModal from '@/views/common/Simple.modal.vue'
import { reactive,computed, shallowRef } from 'vue'
import { Toast } from 'vant'

const props = defineProps({
  modelValue: { type: Boolean, default: false },
  row: { type: Object, default: () => ({}) },
  modalType:{
    type:String,
    default:''
  },
})

const emits = defineEmits(['update:modelValue','update:row','success'])
const row = computed(() => props.row || {})

const state = reactive({
  show: computed({
    get: () => {
      return props.modelValue
    },
    set: val =>  emits('update:modelValue', val)
  }),
  title: '弹窗名称',
  data:{},
  params:{

  }
})



async function onConfirm () {
  try {
    let params:any = Object.assign(
      {},
      state.params,
    )
    const { success,errMsg } = await apiName(params)

    if (!success) return  Toast.fail(errMsg)

    Toast(`操作成功!`)
    onClosed()
    emits('success', true)
  } catch (error) {
  }
}

function onClosed () {
  state.params = {}
  emits('update:row', {})
  emits('update:modelValue', false)
}



</script>

<style lang="scss" scoped>

</style>
