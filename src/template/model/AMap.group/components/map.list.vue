<template>
  <div class="map-list-component">
    <ModuleTitle title="空间资源" />
    <div class="list-box">
      <ItemNoData :data="state.data" tip="" :img-style="{width:'191px',height:'170px'}">
        <template v-for="(item,index) in state.data" :key="index">
          <div class="item">
            <img class="icon" src="@static/images/map/list-icon.png" alt="">
            <div class="right">
              <div class="label">{{ get(item,'name','-') }}</div>
              <div class="tag-box">
                <ItemTag tpye="gray" :label=" getDictValue('2.tree',get(item,'deptId','')) " />
                <ItemTag tpye="gray" :label="get(item,'chooseType21Names')" />
              </div>
              <div class="address">地址：{{ get(item,'address','') }}</div>
            </div>
          </div>
        </template>
      </ItemNoData>
    </div>


    <div class="pagination-box">
      <SimplePage
        v-model:pageNun="curParams.pageNum"
        :total="state.total"
        :pager-count="1"
        @pageChange="asyncData"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import ModuleTitle from '@/views/common/module.title.vue'
import SimplePage from '@/views/common/Simple.page.vue'
import ItemTag from '@/views/common/item.tag.vue'
import { GpParam } from '@/api/types/BuildingInfo.type'
import { BuildingInfoGetPage } from '@/api'
import { get } from 'lodash-es'
import { getDictValue } from '@/utils'
import ItemNoData from '@/views/common/item.noData.vue'

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
  show:false,
  projectShow:false,
  total:0,
  id:''
})

const curParams:any = ref({
  pageNum: 1,
  pageSize: 10
})



PubSub.subscribe('map-query', (key,params)=>{
  curParams.value = Object.assign(curParams.value,params,{ pageNum:1 })
  asyncData()
})

const asyncData = async () => {
  const params: GpParam = Object.assign({}, curParams.value || {})
  if(params.availableCovered){
    let range1 = params.availableCovered.split('~')
    params.availableCovered = {
      min:Number(range1[0]),
      max:Number(range1[1]),
    }
  }

  if(params.avgRent){
    let range2 = params.avgRent.split('~')
    params.avgRent = {
      min:Number(range2[0]),
      max:Number(range2[1]),
    }
  }
  const { status, msg, data } = await BuildingInfoGetPage(params)
  if (!(status === 200)) return ElMessage.error(msg)
  data.list.map(e => {
    e.areaCode = getDictValue('13.list', Number(e.areaCode), 'valueRange')
  })
  state.data = data.list.slice(0,11)
  PubSub.publish('map-addMarker',state.data)
  // state.data= transformTableData(tableColumn,get(data || {}, 'list', []))
}

asyncData()
</script>

<style lang="scss" scoped>


.map-list-component{
  z-index: 999;
  position: absolute;
  right: 0;
  top: 0;
  width: 354px;
  bottom: 0;
  background: white;
  padding: 20px;
  display: flex;
  flex-direction: column;
  .list-box{
    flex: 1;
    overflow: scroll;
  }
}

.item{
  margin-top: 12px;
  margin-bottom: 12px;
  padding-bottom: 12px;
  border-bottom: 1px solid #DEE5EE;
  display: flex;
  align-items: center;
  .icon{
    width: 44px;
    height: 44px;
    margin-right: 18px;
  }
  .right{
    .label{
      height: 27px;
font-size: 18px;
font-family: Source Han Sans CN-Medium, Source Han Sans CN;
font-weight: 500;
color: #363A44;
line-height: 21px;
margin-bottom: 6px;
font-weight: 600;
cursor: pointer;
    }
    .tag-box{
      margin-bottom: 10px;
    }
    .address{
      height: 21px;
font-size: 14px;
font-family: Source Han Sans CN-Regular, Source Han Sans CN;
font-weight: 400;
color: #686B73;
line-height: 16px;
    }
  }
}
</style>
