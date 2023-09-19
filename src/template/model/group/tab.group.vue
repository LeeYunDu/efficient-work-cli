<template>
  <div class="tabs-component">
    <el-tabs v-bind="$attrs" class="demo-tabs">
      <template v-for="(item,index) in options" :key="index">
        <el-tab-pane :label="item.label" :name="item.key" />
      </template>
    </el-tabs>
  </div>
</template>

<script lang="ts" setup>
import { FieldItem } from '@/typings/items'
import { PropType } from 'vue'

let props = defineProps({
  options:{
    type:Array as PropType<FieldItem[]>,
    default:()=>[]
  }
})


</script>

<style lang="scss" scoped>
.tabs-component{
  height: 100%;
  ::v-deep(.el-tabs){
  height: 100%;

    .el-tabs__header{
      margin-bottom: 0px!important;
      height: 100%;
      .el-tabs__nav-wrap{
        height: 100%;
      }
    }
    .el-tabs__item{
      min-width: 120px;
      height: 52px;
      font-size: 16px;
      font-family: Source Han Sans CN-Regular, Source Han Sans CN;
      font-weight: 400;
      color: #363A44;

      &.is-active{
        font-size: 16px;
        font-family: Source Han Sans CN-Bold, Source Han Sans CN;
        font-weight: bold;
        color: #0366F1!important;
      }
    }
  }
}
</style>
