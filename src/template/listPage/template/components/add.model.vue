
<template>
  <SimpleModal
    v-model="state.show"
    :title="state.title"
    :footer-show="true"
    :width="configPropsModal.width ?? '50%'"
    :body-padding="configPropsModal.bodyPadding ?? '20'"
    :class="configPropsModal.center ? 'dialog-center' : ''"
    @onOK="onConfirm"
    @closed="onClosed"
  >
    <UiForm
      v-bind="addFormOptions"
      ref="formRef"
      :model="state.params"
    />
  </SimpleModal>
</template>

<script setup>
import SimpleModal from '@/views/common/Simple.modal.vue'
import { ElMessage } from 'element-plus'
import { UiForm } from 'static/lib/entry'
import _ from 'lodash-es'
import { addFormOptions } from '../json'
import { ref,defineProps,reactive,computed } from 'vue'

const props = defineProps({
  modelValue: { type: Boolean, default: false },
  row: { type: Object, default: () => ({}) },
  configProps: { type: Object, default: () => ({}) },
})

const emits = defineEmits([ 'update:modelValue', 'update:row','update:model', 'reload' ])

const formRef = ref(null)

const row = computed(() => props.row || {})


const _modalType = computed(() => row.value?._modalType || '')

const configPropsModal = computed(() => props.configProps?.modal || {})

const configPropsApis = computed(() => props.configProps?.apis || {})

const state = reactive({
  show: computed({
    get: () => {
      props.modelValue && ['edit','detail'].includes(_modalType.value) && asyncDataDetail()
      return props.modelValue
    },
    set: val =>  emits('update:modelValue', val)
  }),
  title: computed(() => ({ edit: '编辑', add: '新增', default: '' }[_modalType.value || 'default'] ?? '') + '弹窗'),

  params:{

  }
})


function onClosed () {
  formRef.value?.resetFields()
  emits('update:row', {})
}

async function onConfirm (cb) {

  try {
    await formRef.value?.validate()
    let handleApi = configPropsApis.value[_modalType.value]
    if(!handleApi)return
    const res = await handleApi(Object.assign(
      {},
      state.params,
      // _modalType.value === 'edit' && { id: row.value.id }
      { id: row.value.id }
    ))
    if (!res.success) throw new Error(res.errMsg)

    ElMessage.success(`${({ edit: '编辑', add: '新增', default: '操作' }[_modalType.value || 'default'] ?? '')}成功!`)
    emits('update:modelValue', false)
    emits('reload')
    cb()
  } catch (e) {
    e.message && message.error(e.message)
    cb()
  }
}

async function asyncDataDetail (){
  let handleApi = configPropsApis.value['detail']
  if(!handleApi)return
  let res = await handleApi(row.value.id)
  if (!res.success) throw new Error(res.errMsg)
  Object.assign(state.params, _.cloneDeep(res.data))
}

</script>
