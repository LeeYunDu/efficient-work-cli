<template>
  <SimpleModal
    v-model="state.show"
    :title="state.title"
    :footer-show="false"
    width="60%"
    body-padding="20"
    @closed="onClosed"
  >
    dialog
  </SimpleModal>
</template>

<script setup lang="ts">
import SimpleModal from '@/views/common/Simple.modal.vue'
import {reactive,ref,inject,computed} from 'vue'
import { ElMessage } from 'element-plus'
import { get } from 'lodash-es'

const props = defineProps({
  modelValue: { type: Boolean, default: false },
  row: { type: Object, default: () => ({}) }
})

const emits = defineEmits(['update:modelValue','update:row','success'])

const row = computed(() => props.row || {})

const state = reactive({
  show: computed({
    get: () => {
      props.modelValue && asyncData()
      return props.modelValue
    },
    set: val =>  emits('update:modelValue', val)
  }),
  title: '弹窗标题',
  data:{}
})


function onClosed () {
  emits('update:row', {})
  emits('update:modelValue',false)
}

function onSuccess(){
  ElMessage.success('操作成功')
  onClosed()
}
const curParams:any = ref({
  pageNum: 1,
  pageSize: 10
})

async function asyncData(){
  const params: any = Object.assign({},  curParams.value || {})
  // const { success, errMsg, data }: any = await apiName(params)
  const  { success, errMsg, data }: any = { success:true,errMsg:'',data:{
    list:new Array(10).fill({
      name:'mock'
    }),total:10
  } }
  if (!success) return ElMessage.error(errMsg)
  state.data= get(data || {}, 'list', [])
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
