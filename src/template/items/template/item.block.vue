<template>
  <section class="items">
    <template v-for="(item, index) in loopItems" :key="index">
      <section class="item">
        <div class="main">
          <div v-if="icon" class="icon-box">
            <img :src="`static/images/home/${getIcon(item)}.png`" alt>
          </div>
          <div class="info-box">
            <div class="label"><span>{{ getName(item) }}</span></div>
            <div class="value-box">
              <div class="value">{{ getValue(item) }}</div>
              <div class="unit">{{ getUnit(item) }}</div>
              <div v-if="rateType==='row'" class="rate-box">
                <div
                  class="rate-value"
                  :class="[getRate(item)>=0?'up':'down']"
                >
                  {{ getRate(item) }} %
                </div>
                <div class="rate-icon">
                  <img :src="`static/images/common/icon-${getRate(item)>=0?'up':'down'}.png`" alt>
                </div>
              </div>
            </div>
            <div v-if="rateType==='column'" class="rate-box">
              <div

                class="rate-value"
                :class="[getRate(item)>=0?'up':'down']"
              >
                {{ getRate(item) }} %
              </div>
              <div class="rate-icon">
                <img :src="`static/images/common/icon-${getRate(item)>=0?'up':'down'}.png`" alt>
              </div>
            </div>
          </div>
        </div>
      </section>
    </template>
  </section>
</template>

<script lang="ts" setup>
import { get } from 'lodash-es'
import { computed,PropType } from 'vue'
import { FieldItem } from '@/typings/items'
const props = defineProps({
  data: {
    type: Object||Array,
    default: () => []
  },
  fields:{
    type: Array as PropType<FieldItem[]>,
  },
  iconMap:{
    type:Object as PropType<{[x:string]:any}>,
    default:()=>{}
  },
  unit:{
    type:String,
    default:''
  },
  icon:{
    type:Boolean,
    default:false
  },
  rateType:{
    type:String,
    default:'row'
  }
})



/**
 * 这个组件应该要接收两种数据格式
 * 1、[{name:'数据1'},{name:'数据2'}]
 * 2、{y1:'数据1的数值',y2:'数据2的数值'}
 * 根据传入的数据类型,判断出列表渲染时的写法
 */


const propsData = computed(() => props.data||[])
const propsFields = computed(()=> props.fields||[
  { label:'名称',key:'name',unit:'',icon:'' },
  { label:'数值',key:'value',unit:'',icon:'' },
])

const isLoopData = computed(()=>Array.isArray(propsData.value))

const loopItems = computed<any>(()=>{
  // 待开发 sort 排序
  return Array.isArray(propsData.value)?propsData.value:propsFields.value
})


function getName (item){
  if(isLoopData.value){
    return  item[propsFields.value[0].key]||''
  }else{
    return get(propsData,item.key)
  }
}

function getIcon (item:any){
  if(isLoopData.value){
    return props.iconMap[getName(item)]||''
  }else{
    return item.icon||''
  }
}

function getValue (item:any){
  if(isLoopData.value){
    return  Number(get(item,props.fields[1].key)||0)
  }else{
    return get(propsData,item.key)||0
  }
}
function getRate (item:any){
  if(isLoopData.value){
    return  Number(get(item,props.fields[2].key)||0).toFixed(2)
  }else{
    return get(propsData,item.key)||0
  }
}

function getUnit (item:any){
  if(isLoopData.value){
    return  props.fields[1].unit||''
  }else{
    return item.unit
  }
}



</script>


<style lang="scss" scoped>
.items {
  display: flex;
  flex-wrap: wrap;
  margin-left: -5px;
  margin-right: -5px;
  .item {
    width: 50%;
    padding: 5px;
    .main{
      background: white;
      display: flex;
      padding: 10px;
      border-radius: 4px;
      overflow: hidden;
      .icon-box {
        margin-right: 8px;
        width: 38px;
        height: 38px;
      }
      .label{
        display: flex;
        color: rgb(112, 129, 155);
        font-size: 14px;
        margin-bottom: 4px;
        span{
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
          overflow: hidden;
        }
      }

      .value-box{
        display: flex;
        align-items: flex-end;
        .value{
          font-size: 20px;
          font-family: D-DIN-DIN-Bold, D-DIN-DIN;
          font-weight: bold;
          color: #0F3554;
        }

        .unit{
          font-size: 12px;
          font-family: Source Han Sans CN-Regular, Source Han Sans CN;
          font-weight: 400;
          margin-left: 4px;
        }

        .rate-box{
          margin-left: 8px;
        }
      }

      .rate-box{
        display: flex;
        .rate-value{
          font-size: 12px;
          font-family: Source Han Sans CN-Regular, Source Han Sans CN;
          font-weight: 400;

          &.up{
            color: #FF5252;
          }

          &.down{
            color: rgba(5, 183, 119, 1);
          }
        }
      }

    }
  }
}

</style>
