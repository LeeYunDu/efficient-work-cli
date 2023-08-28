<template>
  <div class="message-list">
    <div v-for="(item,index) in state.data" :key="index" class="message-item">
      <div class="tag flex f-aic f-jcc">
        <span>政策兑付提醒</span>
      </div>
      <div class="title" @click="onRouter(item)">{{ item.name }}</div>
      <div class="time">{{ parseTime(item.createTime,'{y}-{m}-{d}') }}</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import { parseTime } from '@/utils'
import { useRouter } from 'vue-router'

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


let router = useRouter()
function onRouter (item:any){
  router.push({
    path:'/activity/detail',
    query:{
      id:item.id,
      type:'activity'
    }
  })
}

const curParams:any = ref({
  pageNum: 1,
  pageSize: 10
})

const asyncData = async () => {
  const params: any = Object.assign({},  curParams.value || {})
  // const {status, success, msg, data } = await apiName(params)
  const  { status, success, msg, data } = { status:200, success:true,msg:'',data:{
    list:new Array(3).fill({
      name:'您申报的高层次人才租赁补贴本月补贴支付失败，请登录平台至政策申报详情查看…您申报的高层次人才租赁补贴本月补贴支付失败，请登录平台至政策申报详情查看…',
      createTime:new Date().getTime()
    }),total:10
  } }
  if (!(status===200)) return ElMessage.error(msg)
  state.data= data.list
}

asyncData()
</script>

<style lang="scss" scoped>
.message-list{
  display: flex;
  flex-direction: column;
  .message-item{
    padding:14px 0;
    border-bottom: 1px solid #ECECEC;
    display: flex;
    align-items: center;
    .tag{
      height: 37px;
      background: rgba(3,102,241,0.1);
      border-radius: 4px 4px 4px 4px;
      opacity: 1;
      text-align: center;
      white-space: nowrap;
      padding: 0 10px;


      font-size: 14px;
      font-family: Source Han Sans CN-Medium, Source Han Sans CN;
      font-weight: 500;
      color: #0366F1;
    }

    .title{
      font-size: 16px;
      font-family: Source Han Sans CN-Regular, Source Han Sans CN;
      font-weight: 400;
      color: #363A44;
      cursor: pointer;
      margin-left: 14px;
      margin-right: auto;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      overflow: hidden;
    }

    .time{
      font-size: 14px;
      font-family: Source Han Sans CN-Regular, Source Han Sans CN;
      font-weight: 400;
      color: #686B73;
      white-space: nowrap;
    }
  }
}
</style>
