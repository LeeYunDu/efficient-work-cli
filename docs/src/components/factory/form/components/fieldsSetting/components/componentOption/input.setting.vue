<template>
  <!-- 单行文本输入框 -->
  <template v-if="componentType==='input'">
    <el-form-item label="占位符内容:">
      <el-input v-model="fieldsOption.placeholder" />
    </el-form-item>
    <el-form-item label="前缀内容:">
      <el-input v-model="fieldsOption.prefixContent" disabled />
    </el-form-item>
    <el-form-item label="后缀内容:">
      <el-input v-model="fieldsOption.suffixContent" disabled />
    </el-form-item>
    <el-form-item label="长度限制:">
      <el-input v-model.number="fieldsOption.maxlength" step="10" type="number" />
    </el-form-item>
    <el-form-item label="显示计数:">
      <el-switch v-model="fieldsOption['show-word-limit']" active-text="是" inactive-text="否" />
    </el-form-item>
  </template>
  <!-- 文本域 -->
  <template v-if="componentType==='input-textarea'">
    <el-form-item label="占位符内容:">
      <el-input v-model="fieldsOption.placeholder" />
    </el-form-item>
    <el-form-item label="长度限制:">
      <el-input v-model.number="fieldsOption.maxlength" step="10" type="number" />
    </el-form-item>
    <el-form-item label="显示计数:">
      <el-switch v-model="fieldsOption['show-word-limit']" active-text="是" inactive-text="否" />
    </el-form-item>
    <el-form-item label="输入框行数:">
      <el-input v-model.number="fieldsOption['rows']" step="1" type="number" />
    </el-form-item>
  </template>
  <!-- 密码 -->
  <template v-if="componentType==='input-password'">
    <el-form-item label="占位符内容:">
      <el-input v-model="fieldsOption.placeholder" />
    </el-form-item>
    <el-form-item label="前缀内容:">
      <el-input v-model="fieldsOption.prefixContent" disabled />
    </el-form-item>
    <el-form-item label="后缀内容:">
      <el-input v-model="fieldsOption.suffixContent" disabled />
    </el-form-item>
    <el-form-item label="长度限制:">
      <el-input v-model.number="fieldsOption.maxlength" step="10" type="number" />
    </el-form-item>
    <el-form-item label="显示计数:">
      <el-switch v-model="fieldsOption['show-word-limit']" active-text="是" inactive-text="否" />
    </el-form-item>
    <el-form-item label="显示切换密码图标:">
      <el-switch v-model="fieldsOption['show-password']" active-text="是" inactive-text="否" />
    </el-form-item>
  </template>
  <!-- 计数器 -->
  <template v-if="componentType==='input-number'">
    <el-form-item label="最大值:">
      <el-input v-model.number="fieldsOption['max']" step="1" type="number" />
    </el-form-item>
    <el-form-item label="最小值:">
      <el-input v-model.number="fieldsOption['min']" step="1" type="number" />
    </el-form-item>
    <el-form-item label="步长:">
      <el-input v-model.number="fieldsOption['step']" step="1" type="number" />
    </el-form-item>
    <el-form-item label="精度:">
      <el-input v-model.number="fieldsOption['precision']" step="1" type="number" />
    </el-form-item>
  </template>
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


let fieldsOption:any = reactive({
  placeholder:'',
  prefixContent:'',
  suffixContent:'',
  // maxlength:500,
  'show-word-limit':false
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
  updateOption
})
initCommonOption()

function updateOption (){
  stopEmit.value = true
  initCommonOption()
}
defineExpose({
  updateOption
})
watch(()=>fieldsOption,throttle(onOptionChange,1000),{ deep:true })


</script>


<style lang="scss" scoped>

</style>

