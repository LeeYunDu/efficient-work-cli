<template>
  <el-form-item label="标签对齐方式:">
    <el-select v-model="formOption.props.labelPosition" placeholder="请选择标签对齐方式">
      <el-option
        v-for="(item,index) in labelPositionOptions"
        :key="index"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
  </el-form-item>
  <el-form-item label="标签宽度:">
    <el-input v-model.number="formOption.props['label-width']" type="number" placeholder="请输入标签宽度" />
  </el-form-item>
  <el-form-item label="标签后缀:">
    <el-input v-model="formOption.props['label-suffix']" placeholder="请输入标签后缀" />
  </el-form-item>
  <!-- <el-form-item label="项之间的间隔:">
    <el-input-number v-model="formOption.sort" :min="1" :max="10" label="描述文字" />
  </el-form-item> -->
  <el-form-item label="表单尺寸:">
    <el-radio-group v-model="formOption.props.size">
      <el-radio-button label="large">large</el-radio-button>
      <el-radio-button label="default">default</el-radio-button>
      <el-radio-button label="small">small</el-radio-button>
    </el-radio-group>
  </el-form-item>
  <el-form-item label="是否行内模式:">
    <el-switch v-model="formOption.props.inline" active-text="是" inactive-text="否" />
  </el-form-item>
  <!-- <el-form-item label="多分组转标签:">
    <el-switch v-model="formOption.isDetail" disabled active-text="是" inactive-text="否" />
  </el-form-item> -->
  <!-- <el-form-item label="详情模式:">
    <el-switch v-model="formOption.isDetail" disabled active-text="是" inactive-text="否" />
  </el-form-item> -->
  <!-- <el-form-item label="显示按钮:">
    <el-switch v-model="formOption.disabled" active-text="是" inactive-text="否" />
  </el-form-item>
  <el-form-item label="显示提交按钮:">
    <el-switch v-model="formOption.disabled" active-text="是" inactive-text="否" />
  </el-form-item>
  <el-form-item label="提交按钮文字：">
    <el-input v-model="formOption.formItem.span" type="number" placeholder="请输入标签后缀" />
  </el-form-item>
  <el-form-item label="显示清空按钮:">
    <el-switch v-model="formOption.disabled" active-text="是" inactive-text="否" />
  </el-form-item>
  <el-form-item label="提交清空文字：">
    <el-input v-model="formOption.formItem.span" type="number" placeholder="请输入标签后缀" />
  </el-form-item>
  <el-form-item label="全局只读:">
    <el-switch v-model="formOption.show" disabled active-text="是" inactive-text="否" />
  </el-form-item>
  <el-form-item label="全局禁用:">
    <el-switch v-model="formOption.show" disabled active-text="是" inactive-text="否" />
  </el-form-item> -->
</template>

<script lang="ts" setup>
import { onMounted, PropType, reactive, ref } from 'vue'
import { labelPositionOptions } from '../config/index'
import { watch } from 'vue'
import {  cloneDeep, get, throttle } from 'lodash-es'
import { ComponentOption } from '@/views/visual/types/models'

let props = defineProps({
  model:{
    type:Object,
  },
  componentOption: {
    type: Object as PropType<ComponentOption>,
    default: () => ({})
  },
})

const stopEmit = ref(false)
let formOption:any = reactive({
  props:{
    size:'default',
    'label-suffix':':',
    'label-width':'',
    labelPosition:'',
    inline:false,
  },
  options:{
    gridItem:{},
    grid:{},
  },
  extra:{}
})

let emits = defineEmits(['update','updateOption'])

function onOptionChange (){
  let cloneFormOption = cloneDeep(formOption)
  let labelWidth = cloneFormOption.props['label-width']
  cloneFormOption.props['label-width'] = labelWidth>0? cloneFormOption.props['label-width'] + 'px' : ''
  if(stopEmit.value)return
  emits('updateOption',cloneFormOption)
}

function initCommonOption (){
  let cloneComponentOption = cloneDeep(props.componentOption)
  let formOptionProps =  get(cloneComponentOption.options,'component.props',{})
  let labelWidth = formOptionProps['label-width']||''
  formOptionProps['label-width'] = labelWidth.replace('px','')
  formOption.props = formOptionProps
  formOption.options = get(cloneComponentOption.options,'component.options',{})

  if(stopEmit.value){
    setTimeout(()=>{
      stopEmit.value = false
    })
  }
}


watch(()=>formOption,throttle(onOptionChange,1000),{ deep:true })
function updateOption (){
  stopEmit.value = true
  initCommonOption()
}

onMounted(initCommonOption)
defineExpose({
  updateOption
})
</script>

<style lang="scss" scoped>

</style>
