<template>
  <el-form-item label="最大星数:">
    <el-input v-model.number="fieldOption.max" type="number" />
  </el-form-item>

  <template v-if="!fieldOption['show-score']">
    <el-form-item label="是否显示文本:">
      <el-switch v-model="fieldOption['show-text']" active-text="是" inactive-text="否" />
    </el-form-item>
    <el-form-item v-if="fieldOption['show-text']" label="自定义文本:">
      <el-tag
        v-for="(tag,index) in fieldOption.texts"
        :key="tag"
        closable
        type=""
        style="margin:0px 2.5px 5px 2.5px;"
        @close="onTagClose(index,'text')"
      >
        {{ tag }}
      </el-tag>
      <el-input
        v-if="state.inputVisible"
        ref="InputRef"
        v-model="state.inputValue"

        size="small"
        @keyup.enter="handleInputConfirm"
        @blur="handleInputConfirm"
      />
      <el-button v-else style="margin-left: 5px;" size="small" @click="showInput">
        + New Tag
      </el-button>
    </el-form-item>
  </template>

  <el-form-item v-if="!fieldOption['show-text']" label="是否显示分数:">
    <el-switch v-model="fieldOption['show-score']" active-text="是" inactive-text="否" />
  </el-form-item>
  <el-form-item label="自定义颜色:">
    <el-tag
      v-for="(tag,index) in fieldOption.colors"
      :key="tag"
      closable
      style="margin:0px 2.5px 5px 2.5px;"
      @close="onTagClose(index,'color')"
    >
      <span
        :style="{
          color:tag
        }"
      >{{ tag }}</span>
    </el-tag>

    <el-color-picker
      v-model="state.color"
      @change="onColorChange"
    />
  </el-form-item>
</template>


<script setup lang="ts">
import {  throttle } from 'lodash-es'
import {  nextTick, reactive, ref, watch } from 'vue'
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
  inputVisible:false,
  inputValue:'',
  color:''
})
const InputRef = ref<any>()
const showInput = () => {
  state.inputVisible = true
  nextTick(() => {
    InputRef.value!.input!.focus()
  })
}
const handleInputConfirm = () => {
  if (state.inputValue) {
    fieldOption.texts.push(state.inputValue)
  }
  state.inputVisible = false
  state.inputValue = ''
}
function onColorChange (val){
  let colors = fieldOption.colors||[]
  colors.push(val)
  fieldOption.colors = colors
}

function onTagClose (index,type){
  let fieldMap = {
    color:'colors',
    text:'texts'
  }
  fieldOption[fieldMap[type]].splice(index,1)
}

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

