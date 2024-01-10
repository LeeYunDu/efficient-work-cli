
<template>
  <SimpleModal
    v-model="state.show"
    :title="state.title"
    :footer-show="true"
    @onOK="onConfirm"
    @onCancel="onClosed"
  >
    <UiForm
      v-bind="addFormOptions"
      ref="formRef"
      v-model:params="state.params"
      :groups="useFormLabels"
    />
  </SimpleModal>
</template>

<script lang="ts" setup>
import SimpleModal from '@/views/common/Simple.modal.vue'
import { reactive,computed, shallowRef } from 'vue'
import { GovAddAppeal } from '@/api'
import { useStore } from 'vuex'
import { checkLinkWay } from '@/utils/validator'
import { get } from 'lodash-es'
import { Toast } from 'vant'
import UiForm from '@/components/Ui/form/form.vue'


const props = defineProps({
  modelValue: { type: Boolean, default: false },
  row: { type: Object, default: () => ({}) },

})


const store = useStore()
const emits = defineEmits(['update:modelValue','update:row','success'])
const row = computed(() => props.row || {})
let formRef = shallowRef<null|InstanceType<typeof UiForm>>()

const addFormOptions = {
  props: {
    inline: true,
    labelWidth: 'auto',
    labelPosition: 'right',
    rules: []
  },
}



const state = reactive({
  show: computed({
    get: () => {
      return props.modelValue
    },
    set: val =>  emits('update:modelValue', val)
  }),
  title: '发起诉求',
  data:{},
  params:{

  }
})



async function onConfirm () {
  try {
    let result = await formRef.value?.validate()
    if(!result)return
    let params:any = Object.assign(
      {
        warnId:row.value.id,
      },
      state.params,
    )

    const { success,errMsg } = await apiName(params)
    if (!success) return  Toast.fail(errMsg)
    Toast('操作成功!')
    onClosed()
    emits('success', true)

  } catch (error) {
    console.log(error,'error')
  }
}

function onClosed () {
  state.params = {}
  emits('update:row', {})
  emits('update:modelValue', false)
}



const useFormLabels = computed(()=>{
  return [
    {
      label: '标题',
      type:'input',
      key: 'appealTitle',
      props: {
        placeholder: '请用一句话概述，如：企业减税咨询',
        maxlength: 30,
        showWordLimit: true,
        clearable: true,
        required: true
      },
    },
    {
      label: '诉求类型',
      key: 'chooseType2Id',
      type: 'select',
      options: store.getters.dictDataOnly('42.list'),
      props: {
        placeholder: '请选择',
        clearable: true,
        required: true
      },

    },
    // {
    //   label: '办理部门',  key: 'handleDeptType', type: 'radio-group',
    //   options: [
    //     { label: '企业服务中心', value: 0 },
    //     { label: '机关单位', value: 1 },
    //     { label: '乡镇街道', value: 2 },
    //   ],
    //   props: {
    //     required: true

    //   },
    // },
    {
      label: '详细描述',
      key: 'appealDetail',
      type:'input',
      props: {
        type: 'textarea',
        autosize: { minRows: 6, maxRows: 8 },
        placeholder: '请详细描述咨询内容',
        clearable: true,
        required: true
      },
      rules: [{ required: true, message: '请填写详细描述', trigger: 'blur' }],
    },
    {
      label: '上传附件', key: 'annex',
      type: 'upload', slotName: 'upload',
      props: {
        formItem: { required: false, },
        size: 10 * 1024,
        limit: 5,
        tip: '支持JPG/PNG，建议800*600，最多上传5张，单张限10M内',
        accept: ['.jpg', '.png', '.jpeg','.pdf','.doc','.docx','.xls','xlsx'],
      },
    },

    // {
    //   label: '企业名称',
    //   key: 'companyName',
    //   props: {
    //     disabled: true
    //   },
    //   rules: [{ required: true, message: '请填写企业名称', trigger: 'blur' }],
    //   itemStyle,
    //   inputStyle: inputStyle1
    // },
    // {
    //   label: '统一社会信用代码',
    //   key: 'creditNo',
    //   props: {
    //     disabled: true
    //   },
    //   rules: [
    //     { required: true, message: '请填写统一社会信用代码', trigger: 'blur' }
    //   ],
    //   itemStyle,
    //   inputStyle: inputStyle1
    // },
    {
      label: '企业地址',
      key: 'companyAddress',
      type:'input',
      props: {
        placeholder: '请填写企业地址',
        clearable: true,
        required: true
      },
    },
    {
      label: '联系人',
      key: 'contactPerson',
      type:'input',
      props: {
        placeholder: '请填写联系人',
        clearable: true,
        required: true
      },
    },
    {
      label: '联系电话', key: 'contactPhone', type: 'input',
      props: {
        clearable: true,  required: true,
        rules: [
          { validator: checkLinkWay, trigger: 'blur' }
        ]
      },
    },

  // {
  //   show: (config, values) => {
  //     return (
  //       !companyData.value.mobile ||
  //       (companyData.value.mobile &&
  //         values.contactPhone !== companyData.value.mobile)
  //     )
  //   },
  //   label: '验证码',
  //   type: 'slot',
  //   key: 'code',
  //   props: {
  //     placeholder: '请填写验证码',
  //     clearable: true
  //   },
  //   rules: [{ required: true, message: '请填写验证码', trigger: 'blur' }],
  //   itemStyle
  // }
  ]
})
</script>

<style lang="scss" scoped>



</style>
