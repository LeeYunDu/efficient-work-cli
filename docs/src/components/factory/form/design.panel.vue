<template>
  <el-dialog
    v-model="show"
    fullscreen
    destroy-on-close
    class="design-panel-dialog"
    @open="init"
  >
    <div class="design-container">
      <div class="left">
        <componentSetting
          :component-option="componentOption"
          @update="onUpdate"
        />
      </div>
      <div class="center">
        <UiForm
          :model="previewConfig.model"
          v-bind="previewConfig"
        />
      </div>
      <div class="right">
        <el-tabs v-model="activeTab">
          <el-tab-pane ref="fieldRef" label="字段属性" name="field" />
          <el-tab-pane ref="btnsRef" label="按钮配置" name="btns" />
          <el-tab-pane ref="formRef" label="表单属性" name="form" />
          <template v-if="activeTab==='form'">
            <FormSetting
              ref="formRef"
              :component-option="componentOption"
              @viewUpdate="onViewUpdate"
              @update="onUpdate"
            />
          </template>
          <template v-else-if="activeTab==='field'">
            <FieldSetting
              ref="fieldRef"
              :view-fields="viewFields"
              :component-option="componentOption"
              :menu-fields="menuFields"
              @update="onUpdate"
            />
          </template>
          <template v-else-if="activeTab==='btns'">
            <BtnsSetting
              ref="btnsRef"
              :component-option="componentOption"
              @viewUpdate="onViewUpdate"
              @update="onUpdate"
            />
          </template>
        </el-tabs>
      </div>
    </div>
  </el-dialog>
</template>
<script lang="ts" setup>

import { ComponentOption, VisualMenus,MenuMode,FieldItem, FormMode } from './typings/model'
import { PropType, computed, ref, Component, provide,watch, shallowRef } from 'vue'
import FormSetting from './components/formSetting/index.vue'
import FieldSetting from './components/fieldsSetting/index.vue'
import BtnsSetting from './components/btnsSetting/index.vue'
import componentSetting from './components/componentSetting/index.vue'
import { cloneDeep } from 'lodash-es'
import ConfigOpt from './config'
import UiForm from './libUi/form/src/form.vue'
import { conversionFunction } from './utils/index'
import { get } from 'lodash-es'
const Config: any = ConfigOpt

const props = defineProps({
  menu: {
    type: Object as PropType<VisualMenus>,
    default: () => ({})
  },
  componentOption: {
    type: Object as PropType<ComponentOption>,
    default: () => ({})
  },
  modelValue: { type: Boolean, default: false },
})

const emits = defineEmits(['update','update:modelValue'])

const formRef = shallowRef <Component | null>()
const fieldRef = shallowRef <Component | null>()
const btnsRef = shallowRef <Component | null>()


const activeTab = ref('field')
let previewConfig = ref({
  model:{
    id:123
  }
})

const show = computed({
  get: () => {
    if(props.modelValue){
    }
    return props.modelValue
  },
  set: val => emits('update:modelValue',val)
})


// 菜单字段
const menuFields = computed<MenuMode[]>(() => {
  return props.menu.fields || []
})

// 视图字段
const viewFields = computed<MenuMode[]>(() => {
  let fields = []
  let componentOption = cloneDeep(props.componentOption)
  let  options  = componentOption.options
  let { component } = options
  let { labels } = component

  if (labels) {
    fields = labels
  }
  return fields
})




// 字段id Map
const fieldIdGroup = computed<{ [x: string]: { [x: number]: MenuMode } }>(() => {
  let menuFieldGroup: { [x: number]: MenuMode } = {}
  let viewFieldGroup: { [x: number]: MenuMode } = {}

  menuFields.value.forEach((field: MenuMode) => {
    menuFieldGroup[(field.id as number)] = field
  })

  viewFields.value.forEach((field: MenuMode) => {
    viewFieldGroup[(field.id as number)] = field
  })
  let group =  { menuFieldGroup, viewFieldGroup,historyFields:historyFields.value }
  return group
})

const historyFields = computed<{ [x: string]: MenuMode }>(()=>{
  let fields = []
  let componentOption = cloneDeep(props.componentOption)
  let  options  = componentOption.options
  let { custom={} } = options
  let { historyFields } = custom
  if (historyFields) {
    fields = historyFields
  }
  return fields
})


provide('fieldIdGroup', fieldIdGroup)
provide('historyFields', historyFields)
provide('menu', props.menu)
provide('componentOption', props.componentOption)

/**
 * 当配置好menu表时,第一次全部加载字段,并且添加成为历史字段
 */
function init () {
  let componentOption = cloneDeep(props.componentOption)
  let  options  = componentOption.options
  let { component } = options
  let { labels } = component
  let historyFields:{ [x: number]: MenuMode } = {}
  props.menu.fields.forEach((field:MenuMode)=>{
    historyFields[(field.id as number)] = field
  })
  if (JSON.stringify(component) === '{}') {
    options =  {
      component: {
        labels:[]
      },
      custom: {
        historyFields:{}
      }
    }
    options.component.labels = props.menu.fields
    options.custom.historyFields = historyFields
    componentOption.options = options
    onUpdate(componentOption)
  }else if (labels&&labels.length===0){
    options.component.labels = props.menu.fields
    options.custom.historyFields = historyFields
    onUpdate(componentOption)
  }else{
    onUpdate(componentOption)
  }
}

function onViewUpdate (componentOption:ComponentOption){
  emits('update',componentOption)
  setPreviewConfig(componentOption)
}
/**
 *  更新
 * @param options
 */
function onUpdate (componentOption = props.componentOption){
  let deepComponentOption = componentOption
  let { menuFieldGroup,viewFieldGroup } = fieldIdGroup.value
  let options = deepComponentOption.options

  let { custom = {
    historyFields:{}
  } } = options
  let { component } = options
  let { labels=[] } = component
  let { historyFields = {} } = custom
  // 数据过长会导致接口存储失败 400
  custom.historyFields = {}

  // 为了对应上组件ui-form 所需字段结构,字段需要做处理。 处理方式参考useModule
  labels.map((field:any)=>{
    let { fieldConf={} } = JSON.parse(get(field,'_options',field.options))
    try {
      // 如果menu字段没有开启高级配置,则不会有props字段,则初始化一个
      if(!fieldConf.props){
        fieldConf.props = [{ type:'props',option:{} }]
      }
      let option:any = fieldConf.props.filter(item=>{
        return item.type==='props'
      })[0]||{}
      field.label = option.fieldName||field.name||field.label
      field.type= Config.dictData.FieldUIMapper[`e${ field.componentType }`]||'input'
    } catch (error) {
      console.log(`${field.name}更新出错`)
    }
    return field
  })
  labels = labels.sort((a,b)=>{
    return a.orderNum - b.orderNum
  })
  emits('update',deepComponentOption)
  setPreviewConfig(deepComponentOption)
}



/**
// 开发模型下预览组件效果
* 将labels 的props 处理一下,这处没用到 useModel 转化字段
*/
function setPreviewConfig (deepComponentOption:ComponentOption){
  let component = deepComponentOption.options.component
  let labels = component.labels
  // // 计算属性 - 模块字段初始化的话会出现 labels = undefined的情况
  if(labels){
    component.labels = labels.map((field:FormMode,index:number)=>{
      field.props = {}
      let options = JSON.parse(get(field,'_options',field.options)).fieldConf
      try {
        // 兼容menu字段,只有开启了高级配置后才有props字段
        if(options.props){
          let props = options.props.filter(item=>{
            return item.type==='props'
          })[0]
          // 将数据格式为函数的字段通过eval转化为可执行函数
          conversionFunction(props.option)
          field.props = props.option
        }
      } catch (error) {

      }
      /**
       * 这里做了一个字段名称替换处理,在预览模式下,ui-form 中的 el-select（其他的选择器是这个字段）的子集是用options字段获取,会有冲突
       * 处理1、针对多选框,还需要text字段来显示文字、children props 设置
       * 处理2、 下拉选项的键值对取值都需要对应 dynamicConfig 设置
       */
      field['_options'] = cloneDeep(get(field,'_options',field.options))
      if(['select','cascader','tree','checkbox-group','radio-group'].includes(field.type)){
        field.options = field.props.options||[]
        try {
          conversionOption(field.props.options,field)
        } catch (error) {
        }
      }else{
        delete field.options
        // field.options = null
      }
      return field
    })
  }

  previewConfig.value = component
}

function conversionOption (options:any[],field:FieldItem){
  let componentType = field.props.componentType
  // 处理 级联组件
  options.map((option:any)=>{
    option.label = option[field.props.dynamicConfig.label]
    option.value = option[field.props.dynamicConfig.value]
    if(option[field.props.dynamicConfig.children]&&componentType==='cascader'){
      conversionOption(option[field.props.dynamicConfig.children],field)
    }
  })
  // 处理 单选框和多选框组件
  if( ['checkbox-group','radio-group'].includes(componentType)){
    options.map(option=>{
      option.text = option[field.props.dynamicConfig.label]
      option.props = field.props.childrenProps
      return option
    })
  }
}

</script>

<style lang="scss" >
.design-container{
  display: flex;
  height: 100%;
  .right{
    width: 30%;
    border-left: 1px solid #eee;
    padding-left: 15px;
    padding-right: 15px;
  }
  .left{
    width: 300px;
    border-right: 1px solid #eee;
    padding-right: 15px;
    padding-left: 15px;
  }
  .center{
    flex: 1;
    margin: 0 10px;
  }
}

.design-panel-dialog{
  display: flex;
  flex-direction: column;
  .el-dialog__body{
    flex: 1;
    // padding: 0px;

  }

}
</style>
