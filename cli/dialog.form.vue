
<template>
    <SimpleModal v-model="state.show" 
   :title="state.title" 
   :footer-show="true" 
   width="700px" 
   body-padding="20" 
   @onOK="onConfirm" 
   @onCancel="onClosed" 
  >
      <UiForm v-bind="planFormOptions" 
   ref="formRef" 
   :model="state.params" 
  />
    </SimpleModal>
</template>

<script lang="ts" setup>
import SimpleModal from '@/views/common/Simple.modal.vue'
import { reactive,ref,computed, shallowRef } from 'vue'
import { ElMessage } from 'element-plus'
import { get,cloneDeep } from 'lodash-es'
import { planFormOptions } from '../json'
import { UiForm } from 'static/lib/entry'

const props = defineProps({
  modelValue: { type: Boolean, default: false },
  row: { type: Object, default: () => ({}) },
  modalType:{
    type:String,
    default:'add'
  }
})

const emits = defineEmits(['update:modelValue','update:row','success'])

const row = computed(() => props.row || {})

const state = reactive({
  show: computed({
    get: () => {
      props.modelValue && ['edit','detail'].includes(props.modalType) && asyncDataDetail()
      return props.modelValue
    },
    set: val =>  emits('update:modelValue', val)
  }),
  title: '新增跟进',
  data:{},
  params:{

  }
})

let formRef = shallowRef<null|InstanceType<typeof UiForm>>()
async function onConfirm (cb:any) {
  try {
    await formRef.value?.validate()
    const { success,errMsg } = await handleApi(Object.assign(
      {},
      state.params,
      props.modalType === 'edit' && { id: row.value.id }
    ))
    if (!success) ElMessage.error(errMsg)
    ElMessage.success(`${({ edit: '编辑', add: '新增', default: '操作' }[props.modalType || 'default'] ?? '')}成功!`)
    emits('update:modelValue', false)
    emits('success', true)
    cb()
  } catch (error) {
    cb()
  }
}

function onClosed () {
  formRef.value?.resetFields()
  emits('update:row', {})
}

const curParams:any = ref({
  pageNum: 1,
  pageSize: 10
})

async function asyncDataDetail (){
  const params: any = Object.assign({},  curParams.value || {},props.modalType === 'edit' && { id: row.value.id })
  // const { success, errMsg, data }: any = await apiName(params)
  const  { success, errMsg, data }: any = { success:true,errMsg:'',data:{} }
  if (!success) return ElMessage.error(errMsg)
  Object.assign(state.params, cloneDeep(data))
}

</script>

<style lang="scss" scoped>

  :deep .el-dialog__body {
    // height: 500px;
    // min-height: 500px;
    // max-height: 600px;
    display: flex;
    flex-direction: column;
  }

</style>
