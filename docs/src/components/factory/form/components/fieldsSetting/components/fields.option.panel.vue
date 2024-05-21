<template>
  <el-form
    label-position="left"
    label-width="auto"
    :model="model"
  >
    <!-- <div>
      <el-button type="primary" @click="state.show=true">JSON快速编辑</el-button>
    </div> -->
    <div class="form-title">基础属性</div>
    <commonOption
      v-bind="$attrs"
      ref="commonOptionRef"
      :fields="propsFields"
      :model="model"
      :component-type="componentType"
      @updateOption="updateThrottle"
    />
    <div class="form-title">组件属性</div>
    <component
      :is="componentOptionsSetting"
      ref="componentSettingRef"
      :fields="propsFields"
      :model="model"
      v-bind="$attrs"
      :component-type="componentType"
      @updateOption="updateThrottle"
    />
  </el-form>

  <JSONEdit v-model="state.show" :component-options="componentOptions" @save="onSave" />
</template>

<script lang="ts" setup>
import { MenuMode, } from '../../../typings/model'
import { cloneDeep, flatten, get, throttle } from 'lodash-es'
import {  computed, onUnmounted, PropType, reactive, ref, shallowRef } from 'vue'
import commonOption from './componentOption/common.option.vue'
import inputSetting from './componentOption/input.setting.vue'
import selectSetting from './componentOption/select.setting.vue'
import dateSetting from './componentOption/date.setting.vue'
import { componentTypeOptions } from '../config/index'
import { getOptionForField } from '../../../utils/index'
import JSONEdit from '../../../common/JSONEdit/index.vue'
import otherSetting from './componentOption/other.setting.vue'
let props = defineProps({
  fields:{
    type:Object as PropType<MenuMode>,
    default:()=>({})
  }
})
let model = reactive({
  componentItem:{},
  formItem:{},
  gridItem:{},
})

let emits = defineEmits(['update'])

const commonOptionRef =  shallowRef < null|any>()
const componentSettingRef =  shallowRef <null|any>()

let state = reactive({
  show:false,
})

const propsFields = ref(props.fields)
const componentType = computed(()=>{
  let options = getOptionForField(propsFields.value)

  return options.componentType
})

const componentOptions = computed(()=>{
  let options = getOptionForField(propsFields.value)
  return options
})
const componentOptionsSetting = computed(()=>{
  let component:any = null
  switch(true){
    case ['input','input-textarea','input-password','input-number'].includes(componentType.value):
      component = inputSetting
      break
    case ['select','cascader','tree','checkbox-group','radio-group','switch'].includes(componentType.value):
      component = selectSetting
      break
    case ['datePicker-year','datePicker-month','datePicker-day','datePicker-week','datePicker-date','datePicker-datetime','datePicker-datetimerange'].includes(componentType.value):
      component = dateSetting
      break
    case ['rate','rate','slider','tag','colorPicker'].includes(componentType.value):
      component = otherSetting
      break
  }
  return component
})

let updateThrottle =  throttle(updateOption,1500)

function updateOption (option:any){
  let fields:MenuMode = props.fields
  let options = JSON.parse(get(fields,'_options','{}'))
  let fieldConf = options.fieldConf

  if(!fieldConf.props){
    fieldConf.props = [{ type:'props',option:{} }]
  }
  // 初始化 - 如果menu字段没有开启高级配置,则不会有props字段
  let index = fieldConf.props.findIndex((item:MenuMode)=>{
    return item.type==='props'
  })
  fieldConf.props[index].option = Object.assign({},fieldConf.props[index].option,option,{
  })
  const { attr } = getComponentType(fieldConf.props[index].option )

  if(attr.type){
    fieldConf.props[index].option.type = attr.type||''
  }else{
    fieldConf.props[index].option.type = ''
  }
  
  
  fields.name = fieldConf.props[index].option.fieldName
  fields.key = fieldConf.props[index].option.key
  fields._options = JSON.stringify(options)
  fields.componentType = attr.componentType
  propsFields.value = fields
  emits('update',fields)
}





function onSave (option:any){
  updateOption(option)
  setTimeout(()=>{
    commonOptionRef.value.updateOption()
    componentSettingRef.value.updateOption()
  })
}
// 这边做一个组件类型的转化，目的是为了兼容以前的配置系统字段的组件类型
function getComponentType (fieldOption:any):any{
  let { componentType } = fieldOption
  let arr = flatten(componentTypeOptions.map(e=>e.options))
  let item =  arr.find(item=>{
    return item.value === componentType
  })
  return item
}
onUnmounted(()=>{
  console.log('销毁')
})


</script>


<style lang="scss" scoped>

</style>
