<template>
  <el-form-item label="最大值:">
    <el-input v-model.number="fieldOption.max" type="number" />
  </el-form-item>
  <el-form-item label="最小值:">
    <el-input v-model.number="fieldOption.min" type="number" />
  </el-form-item>
  <el-form-item label="步长:">
    <el-input v-model.number="fieldOption.step" type="number" />
  </el-form-item>
  <!-- <el-form-item label="显示间隔点:">
    <el-switch v-model="fieldOption['show-stops']" active-text="是" inactive-text="否" />
  </el-form-item> -->
  <el-form-item label="显示输入框:">
    <el-switch v-model="fieldOption['show-input']" active-text="是" inactive-text="否" />
  </el-form-item>
  <el-form-item label="范围:">
    <el-switch v-model="fieldOption['range']" active-text="是" inactive-text="否" />
  </el-form-item>
</template>


<script setup lang="ts">
import {  throttle } from 'lodash-es'
import {  reactive, ref, watch } from 'vue'
import { otherComponentOptions } from '../../../config/index'
let props = defineProps({
  options:{
    type:Object,
    default:()=>({})
  },
  componentType:{
    type:String
  }
})


let fieldOption:any = reactive(Object.assign({},otherComponentOptions[props.componentType],props.options))


const state = reactive({
})
let emits = defineEmits(['update','updateOption'])
const stopEmit = ref(false)
function onOptionChange (){
  if(stopEmit.value)return
  emits('updateOption',fieldOption)
}


function initCommonOption (){
}

initCommonOption()
watch(()=>fieldOption,throttle(onOptionChange,2000),{ deep:true })

</script>


<style lang="scss" scoped>


</style>

