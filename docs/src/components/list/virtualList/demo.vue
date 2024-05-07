<template>
  <div class="demo-list">
    <VirtualList :dataSource="state.data" :estimatedHeight="30" @getMoreData="asyncData" ></VirtualList>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import VirtualList from './virtualList.vue'
import { ElMessage } from 'element-plus'

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
    list:new Array(100).fill({}),total:10
  } }
  ElMessage.success('加载成功')
  state.data = state.data.concat(data.list.map((e,index)=>{
    return {
      ...e,
      name:'机器人'
    }
  })) 
}

asyncData()
</script>

<style lang="scss" scoped>
 .demo-list{
  height: 500px;
 }
</style>
