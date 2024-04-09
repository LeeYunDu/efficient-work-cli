
<template>
  <div class="info-box"  >
    <div  v-for="(item,index) in data"  :key="index"  class="main" >
      <div class="view" >
        <div class="img-box">
          <!-- <img class="icon" :src="`static/images/${item.icon}.png`" alt=""> -->
          <img class="icon" src="./dome-01.png" alt="">
        </div>
        <div class="right" @click="onChange(item)">
          <div class="title">应用名称</div>
          <div class="content">一行文字简要概述</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { PropType, ref } from 'vue'
let props = defineProps({
  data:{
    type:Array as PropType<any[]>,
    default:()=>[]
  },
})


let emits = defineEmits(['change'])
function onChange(item){
  emits('change',item)
}

</script>

<style lang="scss" scoped>

.info-box{
  display: flex;
  flex-wrap: wrap;
  position: relative;
  margin-left: -6px;
  margin-right: -6px;

  .main{
    width: 50%;
    padding: 5px;
    .view{
      padding: 17px 12px;
      background: #FFFFFF linear-gradient(180deg, rgba(3,102,241,0.09) 0%, rgba(255,255,255,0) 100%);
      width: 100%;
      display: flex;
      border-radius: 4px 4px 4px 4px;
      border: 1px solid #FFFFFF;
    }
  }

  .right{
    display: flex;
    flex-direction: column;
    flex: 1;
    justify-content: space-between;

    .title{
      color: rgba(31, 36, 43, 1);
      font-size: 14px;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
      cursor: pointer;
      font-weight: 600;
      margin-bottom: 6px;



    }
    .content{
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      overflow: hidden;
      color: rgba(115, 122, 131, 1);
      font-size: 11px;
    }
  }


  .img-box{
    width: 40px;
    flex: 0 0 40px;
    height: 40px;
    margin-right: 10px;
    display: flex;
    align-items: center;
    img{
      width: 100%;height: 100%;
      object-fit: none;
    }
  }

}

</style>
