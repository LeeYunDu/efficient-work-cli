<template>
  <div class="view-component">
    这是门户类型的单组件Vue文件
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
  // const {status, success, msg, data } = await apiName(params)
  const  {status, success, msg, data } = {status:200, success:true,msg:'',data:{
    list:new Array(10).fill({
      name:'mock'
    }),total:10
  } }
  if (!(status===200)) return ElMessage.error(msg)
  state.data= data.list
}

asyncData()
</script>

<style lang="scss" >
 
</style>
