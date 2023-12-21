
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
      :labels="formFields"
    >
    <template #address="scopeProps">
            <el-input
              v-model="state.params[scopeProps.item.key]"
              v-bind="scopeProps.item.props"
              @change="throttleFn"
            >
              <template #append>
                <img
                  class="icon-position"
                  src="@static/images/common/icon-position.png"
                  alt=""
                  @click="throttleFn"
                >
              </template>
            </el-input>
          </template>
          <template #upload="scopeProps">
            <UploadInput
              v-model="state.params[scopeProps.item.key]"
              :show-file-list="false"
              :custom-show-file-list="true"
              file-list-type="file"
              v-bind="scopeProps.item.props"
              tip=""
            />
          </template>
          
          <template #uploadVideo="scopeProps">
            <UploadInput
              v-model="state.params[scopeProps.item.key]"
              :show-file-list="false"
              :custom-show-file-list="true"
              file-list-type="file"
              v-bind="scopeProps.item.props"
              tip=""
            />

            <!-- label附带提示语 -->
          <template #label-address="{label,props}">
            <FormTip :label="label" :tip="longitude" />
          </template>
          </template>
    </UiForm>
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
let formRef = shallowRef<null|InstanceType<typeof UiForm>>()


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
      { text: '是', label: 0 },
      { text: '否', label: 1 },
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
      startPlaceholder: '开始时间',
      endPlaceholder: '结束时间',
      gridItem: {
        span: 24
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
    label: '现场照片', key: 'fileParams553', type: 'slot', slotName: 'upload',
    props: {
      formItem: { required: true, },
      size: 10 * 1024,
      limit: 5,
      tip: '支持JPG/PNG，建议800*600，最多上传5张，单张限10M内',
      accept: ['.jpg', '.png', '.jpeg'],
      listType: 'picture-card'
    },
  },
  {
    label: '房源视频', key: 'fileParams527', type: 'slot', slotName: 'uploadVideo',
    props: {
      formItem: { required: false, },
      size: 500 * 1024,
      limit: 1,
      tip: '支持 MP4/mkv 视频格式，最多上传一份，大小限制500M',
      accept: ['.mp4', '.mkv']
    },
  },
  {
    label: '地理位置', key: 'address', type: 'slot', slotName: 'address',
    props: {
      gridItem: { span: 12 },
      formItem: { required: true },
      clearable: true,
      append: 'append',
      // maxlength: 30,
      // 'show-word-limit': true,
      placeholder: '输入地址，若有多个用|隔开',
    },
  },
  { label: '', key: 'key6', type: 'slot', slotName: 'btns' },
]


const addFormOptions = {
  props: {
    inline: true,
    labelWidth: 'auto',
    labelPosition: 'left',
    rules: [],
    'validate-on-rule-change': false,
    ruleTrigger: 'change'
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
  title: '弹窗标题',
  data:{},
  params:{

  }
})

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
  state.params = {}
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
