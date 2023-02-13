
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
    <el-form
      ref="formRef"
      :model="propsModel"
      style="width:100%"
      :label-position="configPropsFrom.labelPosition ?? 'left'"
      :label-width="configPropsFrom.labelWidth ?? '100px'"
    >
      <el-row>
        <template
          v-for="{ key,inputType,type,slotKey,slotField, alignItems, event, vIf,disabled,...fieldProps } in formFields"
          :key="key"
        >
        
          <template v-if="vIf ? formItemShow(vIf): true">
            <FormItemCol
              v-model="propsModel[key]"
              v-bind="fieldProps"
              :prop="key"
              :type="type"
              :input-type="inputType"
              :slot-key="slotKey"
              show-word-limit
              :disabled="typeOf(disabled,'object') ? formItemDisabled(disabled) : disabled"
              :form-item-props="{
                style: {
                  alignItems: alignItems || type === 'textarea' ? 'start' : 'center'
                }
              }"
              v-on="event"
            >
              <template v-if="slotKey" #[slotKey]="_slotProps">
                <el-row style="width: 100%" :gutter="10">
                  <template v-if="slotField">
                    <template v-for="({ ...slotProps }) in slotField" :key="slotProps.key">
                      <FormItemCol
                        v-model="state.params[slotProps.key]"
                        :span="slotProps.span ?? 12"
                        v-bind="slotProps"
                        :prop="slotProps.key"
                        :input-type="slotProps.inputType"
                        show-word-limit
                        :form-item-props="{
                          style: {
                            marginBottom: 0,
                          }
                        }"
                      />
                    </template>
                  </template>
                  <template v-else>
                    <!-- 其余插槽 -->
                    <slot :name="slotKey" :$bind="_slotProps" :$key="key"></slot>
                  </template>
                </el-row>
              </template>
            </FormItemCol>
          </template>
        </template>
      </el-row>
    </el-form>
  </SimpleModal>
</template>

<script setup>
import SimpleModal from '@/views/components/Simple.modal.vue'
import FormItemCol from '@/views/components/FormItem.col.vue'
import { ElMessage } from 'element-plus'
import _ from 'lodash-es'

const props = defineProps({
  modelValue: { type: Boolean, default: false },
  row: { type: Object, default: () => ({}) },
  formFields: { type: Object, default: () => ({}) },
  configProps: { type: Object, default: () => ({}) },
  beforeSubmit: { type: Function, default: null },
  afterSubmit: { type: Function, default: null },
  model: { type: Object, default: () => ({}) }
})

const emits = defineEmits([ 'update:modelValue', 'update:row','update:model', 'reload' ])

// -------- inject --------
// -------- ref --------
const formRef = ref(null)
// -------- computed --------
const row = computed(() => props.row || {})


const _modalType = computed(() => row.value?._modalType || '')

const configPropsModal = computed(() => props.configProps?.modal || {})

const configPropsFrom = computed(() => props.configProps?.form || {})

const configPropsApis = computed(() => props.configProps?.apis || {})

const propsModel = computed({
  get: () => props.model,
  set: val => emits('update:model', val)
})

// -------- fn --------
const state = reactive({
  show: computed({
    get: () => {
      props.modelValue && ['edit','detail'].includes(_modalType.value) && asyncDataDetail()
      return props.modelValue
    },
    set: val =>  emits('update:modelValue', val)
  }),
  title: computed(() => ({ edit: '编辑', add: '新增', default: '' }[_modalType.value || 'default'] ?? '') + configPropsModal.value.title),
})

function formItemShow (vIf) {
  try {
    return vIf.handle({
      form: propsModel.value,
      row: row.value,
      type: _modalType.value
    })
  } catch (error) {
    console.log('表单字段显示错误:' + error)
    return true
  }

}

function formItemDisabled (disabled) {
  return disabled.handle({
    form: propsModel.value,
    row: row.value,
    type: _modalType.value
  })
}

function onClosed () {
  formRef.value?.resetFields()
  emits('update:row', {})
}

async function onConfirm (cb) {

  try {
    await formRef.value?.validate()
    let handleApi = configPropsApis.value[_modalType.value]
    const res = await handleApi(Object.assign(
      {},
      propsModel.value,
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
  let res = await handleApi(row.value.id)
  if (!res.success) throw new Error(res.errMsg)
  Object.assign(propsModel.value, _.cloneDeep(res.data))
}

function typeOf (value, type) {
  return Object.prototype.toString.call(value).slice(8, -1).toLowerCase() === type
}
// -------- watch --------

// -------- provide --------

// -------- expose --------
</script>
