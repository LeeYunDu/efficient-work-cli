<template>
  <el-form
    label-position="left"
    label-width="auto"
    :model="model"
  >
    <div>
      <el-button type="text" @click="state.show=true">JSON编辑</el-button>
    </div>
    <h4>表单属性</h4>
    <FormOption
      ref="formOptionRef"
      v-bind="$attrs"
      :model="model"
      :component-option="componentOption"
      @updateOption="updateThrottle"
    />
  </el-form>

  <JSONEdit
    v-model="state.show"
    :component-options="model"
    @save="onSave"
  />
</template>

<script lang="ts" setup>
import {  computed, onMounted, onUnmounted, PropType, reactive, ref, shallowRef } from 'vue'
import JSONEdit from '../../../common/JSONEdit/index.vue'
import FormOption from './form.option.vue'
import { cloneDeep, get, throttle } from 'lodash-es'
import { FormComponentOptions,ComponentOption } from '../../../typings/model'

let props = defineProps({
  componentOption: {
    type: Object as PropType<ComponentOption>,
    default: () => ({})
  },
})
let model = reactive({
  props:{},
  options:{}
})

let emits = defineEmits(['update'])
const formOptionRef =  shallowRef < null|any>()

let state = reactive({
  show:false,
})


let updateThrottle =  throttle(updateOption,1500)

function updateOption (option:any){

  let deepComponentOption = cloneDeep(props.componentOption)
  let options:FormComponentOptions = deepComponentOption.options as  FormComponentOptions

  options.component = Object.assign(options.component,option)

  emits('update',deepComponentOption)
}

function init (){
  model.props = Object.assign({},model.props,get(props.componentOption.options,'component.props',{}))
  model.options = Object.assign({},model.options, get(props.componentOption.options,'component.options',{}))
}

function onSave (option:any){
  updateOption(option)
  setTimeout(()=>{
    formOptionRef.value.updateOption()
  })
}


onMounted(init)
onUnmounted(()=>{
  console.log('销毁-表单配置')
})


</script>
