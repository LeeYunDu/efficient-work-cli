
<template>
  <div
    class="info-box"
  >
    <div
      v-for="(item,index) in data"
      :key="index"
      class="main"
      :class="{
        active:modelValue == item.level
      }"
      @click="onClick(item)"
    >
      <div class="view">
        <div class="img-box">
          <img :src="$metaFilePath(get(iconMap,item.level,''))">
        </div>
        <div class="right">
          <div class="title">{{ item.level }}</div>
        </div>
        <div class="value-box">
          <div class="value">{{ item.count }}</div>
          <div class="unit">条</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { PropType, ref } from 'vue'
import { get } from 'lodash-es'
let props = defineProps({
  modelValue:{
    type:String
  },
  data:{
    type:Array as PropType<any[]>,
    default:()=>[]
  },
  active:{
    type:Number
  }
})

let iconMap = {
  '利好':'state-3.png',
  '高风险':'state-2.png',
  '风险':'state-1.png',
}

let emits = defineEmits(['update:modelValue','query'])
function onClick (item){
  let { level } = item
  emits('update:modelValue',level)
  emits('query')
}


</script>

<style lang="scss" scoped>

.info-box{
  display: flex;
  flex-wrap: wrap;
  position: relative;
  border-radius: 4px 4px 4px 4px;
  background:white;
  margin-bottom: 12px;

  .main{
    flex:1;
    position: relative;
    &:hover,&.active{
      .view{
        box-shadow: 0px 0px 10px 0px rgba(109,141,186,0.21);
        border: 1px solid #0366F1;
        background: white;
        cursor: pointer;
      }
    }
    &~.main{
      &::before{
        content: '';
        width: 1px;
        height: 24px;
        opacity: 1;
        background: #DEE2E7;
        position: absolute;
        left: 0;
        top: 50%;
        margin-top: -12px;
      }
    }
    .view{
      padding: 12px 0;
      border-radius: 4px 4px 4px 4px;
      width: 100%;
      display:flex;
      flex-direction: column;
      align-items: center;
    }
  }

  .right{
    display: flex;
    flex: 1;
    justify-content: space-between;
    .title{
      height: 18px;
      font-size: 12px;
      font-family: Source Han Sans CN, Source Han Sans CN;
      font-weight: 400;
      color: #686B73;
      line-height: 14px;
      margin:5px 0;
      text-align: center;
    }

  }
  .value-box{
      display: flex;
      align-items: center;
      .value{
        font-size: 16px;
        font-family: D-DIN Exp-DINExp, D-DIN Exp-DINExp;
        font-weight: bold;
        color: #363A44;
        line-height: 19px;
      }
      .unit{
        font-size: 16px;
        font-family: Source Han Sans CN, Source Han Sans CN;
        font-weight: 400;
        color: #363A44;
        margin-left:10px;
        display:none;
      }
    }

  .img-box{
    width: 36px;
    flex: 0 0 36px;
    height: 36px;
    display: flex;
    align-items: center;
    img{
      width: 100%;height: 100%;
    }
  }

}

</style>
