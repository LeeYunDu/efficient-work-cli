<template>
  <el-alert
    v-if="show"
    :title="msg"
    type="success"
    effect="dark"
    close-text="一键全部更新"
    @click="onUpdateAll"
  />
  <template v-for="(item,index) in data?.slice(0,2)" :key="index">
    <el-alert
      :title="item.msg"
      type="info"
      close-text="更新"
      class="view-alert"
      @close="()=>onUpdate(item)"
    />
  </template>
</template>

<script lang="ts" setup>

import { MenuMode } from '@/typings/data'
import { VisualMenus } from '@/views/visual/types/models'
import { computed,inject, PropType } from 'vue'
import { TooltipMsg } from './typings/model'


let props = defineProps({
  data:{
    type:Array as PropType<TooltipMsg[]>,
    default:()=>([])
  }
})

const emits = defineEmits(['update'])
const menu:VisualMenus = (inject('menu') as VisualMenus)
const msg = computed(()=>{
  return `一共有${props.data?.length}条更新信息`
})

const show = computed(()=>{
  try {
    return props.data?.length > 2
  } catch (error) {
    return false
  }
})

function onUpdateAll ():void{
  props.data.forEach((item:TooltipMsg)=>{
    onUpdate(item)
  })
}

function onUpdate (item:TooltipMsg):void{
  let { field,nKey } = item
  let { fields }  = menu
  let menuField = fields.filter((mField:MenuMode)=>{
    return mField.id === field.id
  })[0]
  if(menuField){
    (field as any)[nKey] = (menuField as any)[nKey]
  }
  emits('update')
}
</script>

<style lang="scss" scoped>
.view-alert {
  ::v-deep(.el-alert__content){
    padding-right: 30px;
    padding-left: 0px;
    .is-customed {
      // top: 50%;
      // transform: translateY(-50%);
    }
  }
}
</style>
