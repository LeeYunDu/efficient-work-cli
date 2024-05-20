<template>
  <component
    :is="activeComponent"
    :options="fieldOption"
    :component-type="componentType"
    @updateOption="onOptionChange"
  />
</template>


<script setup lang="ts">

import { MenuMode } from '../../../../typings/model'
import {  throttle } from 'lodash-es'
import {  computed, PropType, reactive, ref, watch } from 'vue'
import { getOptionForField } from '../../../../utils'
import Rate from './other.components/rate.vue'
import Slider from './other.components/slider.vue'
let props = defineProps({
  field:{
    type:Object as PropType<MenuMode>,
    default:()=>({})
  },
  componentType:{
    type:String,
    default:'input'
  }
})

let fieldOption:any = reactive({})
const activeComponent = computed(()=>{
  let componentMap:{ [key: string]: any } = {
    rate:Rate,
    slider:Slider,
  }
  return componentMap[props.componentType]
})

let emits = defineEmits(['update','updateOption'])
const stopEmit = ref(false)
function onOptionChange (otherFieldOptions={}){
  if(stopEmit.value)return
  emits('updateOption',Object.assign({},fieldOption,otherFieldOptions))
}


function initCommonOption (){
  fieldOption = Object.assign(fieldOption,getOptionForField(props.field))
  if(stopEmit.value){
    setTimeout(()=>{
      stopEmit.value = false
    })
  }
}

watch(()=>props.componentType,val=>{
  // 这边设置 stopEmit是因为组件类型更新的时候会触发2次接口请求更新，优化一下,做一个更新标识器。
  updateOption()
})
initCommonOption()

watch(()=>fieldOption,throttle(onOptionChange,2000),{ deep:true })
function updateOption (){
  stopEmit.value = true
  initCommonOption()
}
defineExpose({
  updateOption
})

</script>


<style lang="scss" scoped>


</style>

