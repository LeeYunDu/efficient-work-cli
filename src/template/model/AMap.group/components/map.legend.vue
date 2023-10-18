<template>
  <div class="legend-component">
    <template v-for="(item,index) in uFields" :key="index">
      <div class="legend-item">
        <img class="icon" :src="imgPath(item.icon)" alt="">
        <span class="label">{{ item.label }}</span>
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import { imgPath } from '@/utils'
import { FieldItem } from '@/typings/items'
let props = defineProps({
  data:{
    type:Array,
    default:()=>[]
  },


})


let uFields = ref<FieldItem[]>([
  { label:'楼宇',key:'',icon:'/map/legend01.png' },
  { label:'园区',key:'',icon:'/map/legend02.png' },
  { label:'厂房',key:'',icon:'/map/legend03.png' },
])

</script>

<style lang="scss" scoped>
.legend-component{
  position: absolute;
  z-index: 999;
  bottom: 30px;
  left: 10px;
  width: 84px;
  background: rgba(255,255,255,0.66);
  border-radius: 10px 10px 10px 10px;
  opacity: 1;
  display: flex;
  flex-direction: column;
  padding: 10px 14px;
  .legend-item{
    display: flex;
    align-items: center;
    cursor: pointer;
    &~.legend-item{
      margin-top: 20px;
    }
    .icon{
      width: 20px;
      height: 20px;
      margin-right: 8px;
    }
    .label{
      font-size: 14px;
      font-family: Source Han Sans CN-Regular, Source Han Sans CN;
      font-weight: 400;
      color: #647184;
    }
  }
}
</style>
