
<template>
  <SimpleModal
    v-model="state.show"
    :title="state.title"
    :footer-show="true"
    width="700px"
    body-padding="20"
    @onOK="onConfirm"
    @onCancel="onClosed"
  >
    <UiForm
      v-bind="addFormOptions"
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
import { UiForm } from 'static/lib/entry'
import { FieldItem, FormMode, ItemMode } from '@/typings/items'
import store from '@/store'

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



const dictData = store.getters.dictData
 const formFields: FormMode[] = [
  {
    label: '标题带字数限制', key: 'title', type: 'input',
    props: {
      gridItem: { span: 12 },
      formItem: { required: true },
      clearable: true,
      maxlength: 30,
      'show-word-limit': true,
      placeholder: '请输入标题,限30字内',
    },
  },
  {
    label: '选择器', key: 'y1', type: 'select', options: get(dictData, 'dict_14.list', []), props: {
      gridItem: { span: 12 },
      clearable: true,
      formItem: { required: true, }
    },
  },
  {
    label: '数字带单位', key: 'y1', type: 'input',
    props: {
      clearable: true, gridItem: { span: 12 }, min: 0, type: 'number', 'suffix': '㎡', formItem: { required: true, }
    },
  },
  {
    label: '正则表达式', key: 'y2', type: 'input',
    props: {
      clearable: true, gridItem: { span: 12 }, formItem: { required: false, },
      // rules: [
      //   { validator: checkLinkWay, trigger: 'blur' }
      // ]
    },
  },
  {
    label: '单选框', key: 'isApply', type: 'radio-group', options: [
      { text: '需要报名', label: 0 },
      { text: '无需报名', label: 1 },
    ] as any,
    props: {
      formItem: { required: true, }
    },
    child: { type: 'radio' }
  },
  {
    label: '时间范围选择器', key: 'activityTimeGroup', type: 'datePicker', props: {
      'value-format': 'x',
      clearable: true,
      type: 'datetimerange',
      formItem: { required: true, },
      startPlaceholder: '活动开始时间',
      endPlaceholder: '活动结束时间',
      gridItem: {
        span: 13
      }
    }
  },
  {
    label: '富文本编辑器', key: 'content', type: 'slot', slotName: 'content', options: [
    ] as any,
    props: {
      clearable: true,
      formItem: { required: false, }
    },
  },
  {
    label: '图片', key: 'map', type: 'slot', slotName: 'upload',
    props: {
      formItem: { required: true, },
      size: 2 * 1024,
      limit: 5,
      tip: '支持JPG / PNG，建议800*600,最多上传5张，单张限2M内',
      accept: ['jpg', 'png', 'jpeg']
    },
  },
  {
    label: '视频', key: 'video', type: 'slot', slotName: 'upload',
    props: {
      formItem: { required: false, },
      size: 100 * 1024,
      limit: 3,
      tip: '支持各种格式，视频限100M内',
      accept: ['mp4', 'avi', 'mov', 'wmv', 'flv', 'webm', 'mpeg']
    },
  },
  {
    label: '地图坐标拾取', key: 'key6', type: 'slot', slotName: 'map',
    props: {
      formItem: { required: false, },
    },
  },
  { label: '', key: 'key6', type: 'slot', slotName: 'btns' },
]


const addFormOptions = {
  props: {
    inline: true,
    labelWidth: 'auto',
    labelPosition: 'left',
    rules: []
  },
  options: {
    gridItem: { span: 24 }
  }
}



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
    if (!success) return  ElMessage.error(errMsg)
    ElMessage.success(`${({ edit: '编辑', add: '新增', default: '操作' }[props.modalType || 'default'] ?? '')}成功!`)
    onClosed()
    emits('success', true)
    
    cb()
  } catch (error) {
    cb()
  }
}

function onClosed () {
  formRef.value?.resetFields()
  emits('update:row', {})
  emits('update:modelValue', false)
}

const curParams:any = ref({
  pageNum: 1,
  pageSize: 10
})

async function asyncDataDetail (){
  const params: any = Object.assign({},  curParams.value || {},props.modalType === 'edit' && { id: row.value.id })
  // const { success, errMsg, data,status }: any = await apiName(params)
  const  { success, errMsg, data,status }: any = { success:true,errMsg:'',data:{} }
  if (!(status == 200)) return ElMessage.error(errMsg)
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
