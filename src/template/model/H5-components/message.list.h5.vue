<template>
  <banner img-url="/layout/banner-9.png">
    <div class="message-list">
      <div class="total-box">
        共{{ state.total }}条,其中 <img src="static/images/message/icon-red.png" alt=""><span class="no-read">未读{{ noReadCount }}条</span>
        <span class="right" @click="allRead">
          <img src="static/images/message/icon-clear.png" alt="">
          一键已读
        </span>
      </div>
      <div v-for="(item,index) in state.data" :key="index" class="message-item">
        <div class="header">
          <div class="img-box">
            <img class="type-img" :src="`static/images/message/icon-0${index+1}.png`" alt="">
            <img
              v-show="item.isRead==0"
              class="red"
              src="static/images/message/icon-red.png"
              alt=""
            >
          </div>
          <div class="title">
            {{ item.messageType }}提醒
          </div>
          <div class="time">
            {{ parseTime(item.createTime,'{y}-{m}-{d} {h}:{i}') }}
          </div>
        </div>
        <div class="content">
          {{ item.content }}
        </div>
        <div class="fotter" @click="onRouter(item)">
          <span>查看详情</span>
          <img src="static/images/message/icon-right.png" alt="">
        </div>
      </div>
    </div>
  </banner>
</template>
<script lang="ts" setup>
import { parseTime } from '@/utils'
import banner from '../common/banner.vue'
import { useRouter } from 'vue-router'
import {  computed, reactive, ref } from 'vue'
// import { getAdsMessageListResultApi, readApi, totalReadApi } from '@/api'
import { Toast } from 'vant'
import { get } from 'lodash-es'
import { ElMessage } from 'element-plus'
import { getMsgPageApi } from '@/api'
import { readAllApi, readApi } from '@/api/project/java.message'
// import { AmRo, RParam } from '@/api/types/Message.type'



const props = defineProps({
  group: { type: Object, default: () => ({}) },
  data: { type: Object, default: () => ({}) },
  queryParams: { type: Object, default: () => ({}) }
})

let router = useRouter()

let state = reactive({
  row:{},
  total:0,
  data:[

  ]
})

const curParams:any = ref({
  pageNum: 1,
  pageSize: 10,
  publishStatus:''
})

let noReadCount = computed(()=>{
  return state.data.filter((item:AmRo)=>{
    return item.isRead==1
  }).length
})



async function onChangeStatus (row){
  let { id,isRead } = row
  if(isRead==2)return
  let params = {
    id,
    isRead:2
  }
  let { success,errMsg } = await readApi(params)
}

async function allRead (){
  const { status, success, errMsg }: any = await readAllApi({})
  Toast('操作成功')
  asyncData()
}



function onRouter (item:any){

  onChangeStatus(item)
  return

  let { content } = item
  let isConnect = content.indexOf('对接')>-1
  let json = JSON.parse(item.extJson||'{}')
  let { chooseType2Id,extId } = json

  let routeMap = {
    22:'/company-ability/detail',
    23:'/company-need/detail',
    24:'/company-product/detail',
  }
  if(isConnect){
    let routePath = ''
    switch (true) {
      case content.indexOf('能力')>-1:
        routePath = '/company-ability/list'
        break
      case content.indexOf('需求')>-1:
        routePath = '/company-need/list'
        break
      case content.indexOf('产品')>-1:
        routePath = '/company-product/list'
        break
      default:
        break
    }
    router.push({
      path:routePath,
    })
  }else{
    router.push({
      path:routeMap[chooseType2Id],
      query:{
        id:extId,
        chooseType2Id
      }
    })
  }


}

const asyncData = async () => {
  const params: any = Object.assign({},  curParams.value || {})
  const { status, errMsg, data }: any = await getMsgPageApi(params)
  if (!(status===200)) return ElMessage.error(errMsg)
  state.data= data.list
  state.total = data.total
}

asyncData()

</script>

<style lang="scss" scoped>
.message-list{
  margin: 0 16px;
  margin-top: 78px;
  .total-box{
    display: flex;
    align-items: center;
    background: rgba(255,255,255,0.71);
    border-radius: 6px 6px 6px 6px;
    font-size: 12px;
    padding: 6px 12px;
    color: rgba(124, 134, 153, 1);
    margin-bottom: 10px;
    .no-read{
      color: rgba(255, 42, 40, 1);
    }
    img{
      width: 16px;
      height: 16px;
    }

    .right{
      display: flex;
      align-items: center;
      margin-left: auto;
      font-size: 12px;
      font-family: Source Han Sans CN-Regular, Source Han Sans CN;
      font-weight: 400;
      color: rgba(0, 102, 255, 1);
      img{
        margin-right: 4px;
        width: 12px;
        height: 12px;
      }

    }
  }
  .message-item{
    border-radius: 4px;
    background: white;
    padding: 12px;
    &~.message-item{
      margin-top: 10px;
    }
    .header{
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      .img-box{
        display: flex;
        align-items: center;
        position: relative;
        margin-right: 10px;

        .type-img{
          width: 22px;
          height: 22px;
        }
        .red{
          position: absolute;
          right: -5px;
          top: -5px;
          width: 16px;
          height: 16px;
        }
      }
      .title{
        color: rgba(39, 44, 52, 1);
        font-weight: 600;
        font-size: 14px;
      }
      .time{
        margin-left: auto;
        color: rgba(164, 170, 183, 1);
        font-size: 12px;
      }
    }

    .content{
      font-size: 12px;
      font-weight: 400;
      color: #747686;
    }

    .fotter{
      border-top: 1px solid #E1E2EE;
      padding-top: 6px;
      color: rgba(92, 95, 122, 1);
      font-size: 12px;
      margin-top: 10px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      cursor: pointer;
      img{
        width: 16px;
        height: 16px;
      }
    }
  }
}
</style>
