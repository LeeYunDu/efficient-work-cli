<template>
  <div>
    this is default vue file
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { ElMessage } from 'element-plus'

let props = defineProps({
  data:{
    type:Array,
    default:()=>[]
  },
  group: {
    type: Object,
    default: () => ({})
  },
  fields:{
    type:Array,default:()=>{[]}
  }
  
})

let state = reactive({
  data:[],
  show:false
})

const curParams:any = ref({
  pageNum: 1,
  pageSize: 10
})

const asyncData = async () => {
  const params: any = Object.assign({},  curParams.value || {})
  // const {status, success, errMsg, data }: any = await apiName(params)
  const  {status, success, errMsg, data }: any = { success:true,errMsg:'',data:{
    list:new Array(10).fill({
      name:'mock'
    }),total:10
  } }
  if (!(status===200)) return ElMessage.error(errMsg)
  state.data= data
}

asyncData()
</script>

<style lang="scss" scoped>
 
</style>
