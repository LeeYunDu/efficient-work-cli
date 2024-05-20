<template>
  <el-form-item label="组件类型:">
    <el-select
      v-model="fieldsOption.componentType"
      value-key="value"
      placeholder="请输入组件类型"
    >
      <el-option-group
        v-for="(group,gIndex) in componentTypeOptions"
        :key="gIndex"
        :label="group.label"
      >
        <template v-for="(option,oInedx) in group.options" :key="oInedx">
          <el-option
            :label="option.label"
            :value="option.value"
            :disabled="option.disabled"
          >
            <span style="float: left">{{ option.label }}</span>
            <span style="float: right; color: #8492a6; font-size: 13px">{{ option.value }}</span>
          </el-option>
        </template>
      </el-option-group>
    </el-select>
  </el-form-item>
  <el-form-item label="标题:">
    <el-input v-model="fieldsOption.fieldName" placeholder="请输入组件标题" />
  </el-form-item>
  <el-form-item label="key值:">
    <el-input v-model="fieldsOption.key" placeholder="请输入key" />
  </el-form-item>
  <el-form-item label="ItemClassName:">
    <el-input v-model="fieldsOption.formItem.class" disabled placeholder="请输入class类" />
  </el-form-item>
  <el-form-item label="标题宽度:">
    <el-input v-model.number="fieldsOption.formItem.labelWidth" step="10" type="number" placeholder="请输入标题宽度" />
  </el-form-item>
  <el-form-item label="标题位置:">
    <el-select v-model="fieldsOption.formItem.labelPosition" disabled placeholder="请选择组件标题显示位置">
      <el-option
        v-for="(item,index) in labelPositionOptions"
        :key="index"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
  </el-form-item>
  <el-form-item label="表单栅格:">
    <el-input v-model.number="fieldsOption.gridItem.span" type="number" placeholder="请输入组件占比" />
  </el-form-item>
  <el-form-item label="排序:">
    <el-input-number v-model="fieldsOption.sort" :min="1" :max="10" label="描述文字" />
  </el-form-item>
  <el-form-item label="详情模式:">
    <el-switch v-model="fieldsOption.isDetail" disabled active-text="是" inactive-text="否" />
  </el-form-item>
  <el-form-item label="是否禁用:">
    <el-switch v-model="fieldsOption.disabled" active-text="是" inactive-text="否" />
  </el-form-item>
  <el-form-item label="是否可见:">
    <el-switch v-model="fieldsOption.show" disabled active-text="是" inactive-text="否" />
  </el-form-item>
  <el-form-item label="是否必填:">
    <el-switch v-model="fieldsOption.formItem.required" active-text="是" inactive-text="否" />
    <template v-if="fieldsOption.required">
      <!-- ui-form 组件内置的正则规则 -->
      <div v-if="showRuleOption" class="rule-box">
        正则校验：
        <el-select v-model="fieldsOption.rule" multiple>
          <el-option
            v-for="(item,index) in ruleOptions"
            :key="index"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>
    </template>
  </el-form-item>
  <el-form-item
    v-if="!['switch','radio-group','checkbox-group','upload','slot','rate','slider','tag','colorPicker'].includes(componentType)"
    label="一键清除:"
  >
    <el-switch v-model="fieldsOption.clearable" active-text="是" inactive-text="否" />
  </el-form-item>
</template>

<script lang="ts" setup>
import { computed, PropType, reactive, ref } from 'vue'
import { componentTypeOptions,ruleOptions,labelPositionOptions } from '../../config/index'
import { watch } from 'vue'
import { MenuMode } from '../../../../typings/model'
import { throttle ,flatten ,get,set } from 'lodash-es'
import { getOptionForField } from '../../../../utils'

let props = defineProps({
  fields:{
    type:Object as PropType<MenuMode>,
    default:()=>({})
  },
  componentType:{
    type:String,
    default:'input'
  },
  model:{
    type:Object,
  }
})

const stopEmit = ref(false)
let fieldsOption:any = reactive({
  disabled:false,
  show:false,
  isDetail:false,
  clearable:false,
  rule:[],
  componentType:'input',
  fieldName:'',
  key:'',
  sort:1,
  formItem:{
    labelWidth:100,
    labelPosition:'left',
    required:false,
    class:''
  },
  gridItem:{
    span:12
  },
  extra:{}
})


const showRuleOption = computed(()=>{
  return [7].includes(props.componentType)
})
let emits = defineEmits(['updateOption'])

function onOptionChange (){
  if(stopEmit.value)return
  // key 值发生改变的时候需要同步调整 itemClassName
  if(get(fieldsOption,'formItem.class','')){
    set(fieldsOption,'formItem.class',`form-item-${fieldsOption.key}`)
  }
  emits('updateOption',fieldsOption)
}

// 初始化的时候设定组件类别
function setComponentType (componentType:any,type:string){
  let componentGroups = flatten(componentTypeOptions.map(e=>e.options))
  // menuFiled 字段未设置组件类型的时候，componentType值是-1,需要额外处理一下，默认给个 文本 组件类型
  let useComponentType = Number(componentType) === -1 ?  6 : componentType
  let item =  componentGroups.find(item=>{
    if(type){
      return  item.attr.componentType === useComponentType && item.attr.type === type
    }else{
      return item.attr.componentType === useComponentType
    }
  })
  return item
}

function initCommonOption (){
  fieldsOption = Object.assign(fieldsOption,getOptionForField(props.fields,option=>{
    option.fieldName = props.fields.name
    option.key = props.fields.key
    if(!get(option,'formItem.class','')){
      set(option,'formItem.class',`form-item-${props.fields.key}`)
    }
    let item = setComponentType(props.fields.componentType,option.type)
    option.componentType = get(item,'value',props.fields.type)
    //  如果是左侧组件列表新增的组件，初始化加载的时候是没有 fieldsOption 相关字段，需要给它添加一下，这里用sort来做一下判断
    if(!option.sort){
      setTimeout(()=>{onOptionChange()},500)
    }
  }))


  if(stopEmit.value){
    setTimeout(()=>{
      stopEmit.value = false
    })
  }
}



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


.rule-box{
  width: 100%;
}
</style>
