<!-- 左边图片，右边标题+数值 -->
<template>
  <section class="items">
    <template v-for="(item, index) in propsFields" :key="item.key">
      <div class="item">
        <div class="main">
          <img class="icon" :src="`static/images/common/${item.icon}.png`" alt="">
          <div class="info-box">
            <span class="label">{{ item.label }}</span>
            <div class="value-box">
              <span class="value">{{
                item.unit == '家'
                  ? Number(get(propsData, item.key)).toFixed(0)
                  : get(propsData, item.key)
              }}</span>
              <span class="unit">{{ item.unit }}</span>
            </div>
          </div>
        </div>
      </div>
    </template>
  </section>
</template>

<script setup lang="ts">
import { get } from 'lodash-es'
import { computed,ref,PropType } from 'vue'
import { FieldItem } from '@/typings/items'

const props = defineProps({
  data: {
    type: Object,
    default: () => ({})
  },
  fields:{
    type: Array as PropType<FieldItem[]>,
    default:()=>[]
  }
})

const propsData = computed(() => props.data||[])

const propsFields = computed(()=> props.fields||[])

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
    return get(propsData.value,item.key,'0')
  }
}
function getRate (item:any){
  if(isLoopData.value){
    return  Number(get(item,props.fields[2].key)||0).toFixed(2)
  }else{
    return get(propsData.value,item.key,'0')
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
  align-items: center;
  flex-wrap: wrap;
  overflow: auto;
  margin-left: -5px;
  margin-right: -5px;

  .item {
    padding: 5px;
    &~.item{
      margin-left: 58px;
    }

    .main {
      border-radius: 4px;
      display: flex;
      .icon{
        width: 70px;
        height: 70px;
        margin-right: 18px;
      }
      .info-box{

      }
      .label {
        color: rgba(55, 59, 69, 1);
        font-size: 18px;

      }
      .value-box {
        .value {
          font-size: 34px;
          font-family: D-DIN-DIN-Bold, D-DIN-DIN;
          font-weight: bold;
          color: #0f3554;
        }
        .unit {
          font-size: 12px;
          font-family: Source Han Sans CN-Regular, Source Han Sans CN;
          font-weight: 400;
          margin-left: 4px;
        }
      }
    }
  }
}
</style>
