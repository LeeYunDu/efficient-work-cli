
<template>
  <div v-if="show" class="no-data">
    <img :src="url" alt="" :style="imgStyle">
    <div class="tip">{{ tip }}</div>
  </div>
  <template v-if="!show">
    <slot></slot>
  </template>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

let props = defineProps({
  data:{
    type:Object,
    default:()=>({})
  },
  imgStyle:{
    type:Array||Object,
    default:()=>({
      width:'383px',
      height:'340px'
    })
  },
  tip:{
    type:String,
    default:'暂无数据'
  },
  url:{
    type:String,
    default:'static/images/common/no-data.png'
  }

})

const show = computed(()=>{
  try {
    // 数组
    if(Array.isArray(props.data)){
      return props.data.length===0
    }else if('dimensions' in props.data && 'data' in props.data){
      // 图表数据
      let length = props.data?.data.length??0
      return !(length>0)
    }else{
      // 对象
      return JSON.stringify(props.data)==='{}'
    }
  } catch (error) {
    return false
  }

})

</script>

<style lang="scss" scoped>
.no-data{
  text-align: center;
  width: 100%;
  img{
    width: 180px;
    height: 120px;
  }
  .tip{
    font-size: 12px;
    font-family: PingFang SC-Regular, PingFang SC;
    font-weight: 400;
    color: #686B73;
  }
}
</style>
