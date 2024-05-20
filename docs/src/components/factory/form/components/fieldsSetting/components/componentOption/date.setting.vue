<template>
  <!-- 日期组件通用属性 -->
  <el-form-item label="占位符内容:">
    <el-input v-model="fieldsOption.placeholder" />
  </el-form-item>
  <el-form-item label="显示格式化:">
    <el-input v-model="fieldsOption.format" />
  </el-form-item>
  <el-form-item label="数值格式化:">
    <el-input v-model="fieldsOption['value-format']" />
  </el-form-item>
</template>


<script setup lang="ts">

import { MenuMode } from '../../../../typings/model'
import {  throttle } from 'lodash-es'
import {  PropType, reactive, ref, watch } from 'vue'
import { getOptionForField } from '../../../../utils'

let props = defineProps({
  fields:{
    type:Object as PropType<MenuMode>,
    default:()=>({})
  },
  componentType:{
    type:String,
    default:'input'
  }
})

const formatMap = {
  'datePicker-year':'YYYY',
  'datePicker-month':'MM',
  'datePicker-day':'dd',
  'datePicker-week':'yyyy 第 WW 周',
  'datePicker-date':'yyyy-MM-dd',
  'datePicker-datetime':'yyyy-MM-dd HH:mm:ss',
  'datePicker-datetimerange':'yyyy-MM-dd',
}
const valueFormatMap = {
  'datePicker-year':'YYYY',
  'datePicker-month':'MM',
  'datePicker-day':'dd',
  'datePicker-week':'',
  'datePicker-date':'yyyy-MM-dd',
  'datePicker-datetime':'yyyy-MM-dd HH:mm:ss',
  'datePicker-datetimerange':'yyyy-MM-dd',
}
let fieldsOption:any = reactive({
  placeholder:'',
  format:formatMap[props.componentType],
  'value-format':valueFormatMap[props.componentType]
})


let emits = defineEmits(['update','updateOption'])
const stopEmit = ref(false)
function onOptionChange (){
  if(stopEmit.value)return

  emits('updateOption',fieldsOption)
}



function initCommonOption (){
  fieldsOption = Object.assign(fieldsOption,getOptionForField(props.fields))
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
watch(()=>fieldsOption,throttle(onOptionChange,2000),{ deep:true })

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

