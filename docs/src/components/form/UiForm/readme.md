<script setup lang="ts">
import { get } from 'lodash-es'
import { ref } from 'vue'
// import { UiForm } from 'static/lib/entry'
import imagePreview from '@/global/components/imagePreview.vue'
import img01 from './dome.png'



let model = ref({})
const formFields2 = [
  {
    label: '表单label插槽', key: 'y1', type: 'input',
    props: {
      gridItem: { span: 24 },
      formItem: { required: true },
      clearable: true,
      maxlength: 30,
      'show-word-limit': true,
      placeholder: '请输入标题,限30字内',
    },
  },
  {label:'字段2',key:'y2',type: 'input'}
]

const formFields = [
  {
    label: '文本显示字数限制', key: 'y1', type: 'input',
    props: {
      gridItem: { span: 24 },
      formItem: { required: true },
      clearable: true,
      maxlength: 30,
      'show-word-limit': true,
      placeholder: '请输入标题,限30字内',
    },
  },
  {
    label: '输入框单位', key: 'y2', type: 'input',
    props: {
      clearable: true, 
      gridItem: { span: 24 }, 
      min: 0, 
      type: 'number', 
      'suffix': '㎡', 
      formItem: { required: true, },
      rules: [
        { validator: ()=>{}, trigger: 'blur' }
      ]
    },
  },
  {
    label: '时间范围选择器', key: 'y3', type: 'datePicker', props: {
      'value-format': 'x',
      clearable: true,
      type: 'datetimerange',
      formItem: { required: true, },
      startPlaceholder: '开始时间',
      endPlaceholder: '结束时间',
      gridItem: { span: 24 }
    }
  },
  {
    label: '单选框', key: 'y4', type: 'radio-group', options: [
      { label: '单选框1', value: true },
      { label: '单选框2', value: false },
    ],
    props: {
      formItem: { required: true, }
    },
    child: { type: 'radio' }
  },
  {
    label: '多选框', value: '', key: 'key1', type: 'checkbox-group', options: [
      { value: 1, label: '多选框1' },
      { value: 2, label: '多选框2' },
    ] as any, props: {
      formItem: { required: true, }
    },
  },
  {
      label: '选择器', key: 'y5', type: 'select', options: [
        {label:'选项一',value:'1'}
      ], props: {
        gridItem: { span: 24 },
        clearable: true,
        formItem: { required: true, }
      },
  },
  {
    label: '级联选择器',  key: 'y6', slotName: 'cascader', type: 'slot', options: [
      {name:'选项1',id:1,childList:[{name:'选项1-1',id:'1-1'}]},
      {name:'选项2',id:2}
    ],
    props: {
      clearable: true,
      formItem: { required: true, },
      gridItem: { span: 24 },
      props: {
        checkStrictly: true,
        value: 'id',
        label: 'name',
        children: 'childList',
        emitPath: false
      }
    }
  },
]

const formOptions = ref({
  props: {
    inline: true,
    labelWidth: 'auto',
    labelPosition: 'right',
    rules: [],
    'validate-on-rule-change': false,
    ruleTrigger: 'change'
  },
  options: {
    gridItem: { span: 24 }
  }
})

function onRadioChange(){

}
</script>
# UiForm

Lib下的通用组件，基于element-plus的el-form封装

## 使用说明

功能介绍

1. 结合配置系统使用
2. 自定义表单字段JSON使用

## 示例

<imagePreview :data="[img01]"></imagePreview>

<UiForm
  v-bind="formOptions"
  ref="formRef"
  :model="model"
  :labels="formFields"
>
  <template #cascader="{item}">
    <el-cascader
      v-model="model[item.key]"
      :options="item.options"
      v-bind="item.props"
    />
  </template>
</UiForm>

### 表单字段JSON配置


``` vue
<template>
  <UiForm
  v-bind="formOptions"
  ref="formRef"
  :model="model"
  :labels="formFields"
>
  <template #cascader="{item}">
    <el-cascader
      v-model="model[item.key]"
      :options="item.options"
      v-bind="item.props"
    />
  </template>
</UiForm>
</template>
<script lang="ts" setup>
import { ref} from 'vue'
import { UiForm } from 'static/lib/entry'
const formFields = [
  {
    label: '文本显示字数限制', key: 'y1', type: 'input',
    props: {
      gridItem: { span: 24 },
      formItem: { required: true },
      clearable: true,
      maxlength: 30,
      'show-word-limit': true,
      placeholder: '请输入标题,限30字内',
    },
  },
  {
    label: '不显示label', key: 'y1', type: 'input',
    props: {
      gridItem: { span: 24 },
      formItem: { required: true,labelWidth:0 },
    },
  },
  {
    label: '数字类型输入框', key: 'y2', type: 'input',
    props: {
      clearable: true, 
      gridItem: { span: 24 }, 
      min: 0, 
      type: 'number', 
      'suffix': '㎡', 
      formItem: { required: true, },
      rules: [
        { validator: ()=>{}, trigger: 'blur' }
      ]
    },
  },
  {
    label: '时间范围选择器', key: 'y3', type: 'datePicker', props: {
      'value-format': 'x',
      clearable: true,
      type: 'datetimerange',
      formItem: { required: true, },
      startPlaceholder: '开始时间',
      endPlaceholder: '结束时间',
      gridItem: { span: 24 }
    }
  },
  {
    label: '单选框', key: 'y4', type: 'radio-group', options: [
      { label: '单选框1', value: true },
      { label: '单选框2', value: false },
    ],
    props: {
      formItem: { required: true, }
    },
    child: { type: 'radio' }
  },
  {
    label: '多选框', value: '', key: 'key1', type: 'checkbox-group', options: [
      { value: 1, label: '多选框1' },
      { value: 2, label: '多选框2' },
    ] as any, props: {
      formItem: { required: true, }
    },
  },
  {
      label: '选择器', key: 'y5', type: 'select', options: [
        {label:'选项一',value:'1'}
      ], props: {
        gridItem: { span: 24 },
        clearable: true,
        formItem: { required: true, }
      },
  },
  {
    label: '级联选择器',  key: 'y6', slotName: 'cascader', type: 'slot', options: [
      {name:'选项1',id:1,childList:[{name:'选项1-1',id:'1-1'}]},
      {name:'选项2',id:2}
    ],
    props: {
      clearable: true,
      formItem: { required: true, },
      gridItem: { span: 24 },
      props: {
        checkStrictly: true,
        value: 'id',
        label: 'name',
        children: 'childList',
        emitPath: false
      }
    }
  },
   {
    label: '插槽字段',  key: 'y9', slotName: 'slotName', type: 'slot'
    props: {}
  },
]

const formOptions = ref({
  props: {
    inline: true,
    labelWidth: 'auto',
    labelPosition: 'right',
    rules: [],
    'validate-on-rule-change': false,
    ruleTrigger: 'change'
  },
  options: {
    gridItem: { span: 24 }
  }
})
</script>
```

## 表单的label插槽示例
<UiForm
  v-bind="formOptions"
  ref="formRef"
  :model="model"
  :labels="formFields2"
>
  <template  v-for="(o,oI) in formFields2" :key="oI"  #[String(`label-${o.key}`)]="{label,props}">
    {{o.label}}
  </template>
  <template #label-y1="{item}">
    这是插槽显示的名称
  </template>
</UiForm>

```vue
<UiForm
  v-bind="formOptions"
  ref="formRef"
  :model="model"
  :labels="formFields2"
>
  插槽名称规则 = #label + key
  <template #label-y1="{label,props}">
    这是插槽显示的名称
  </template>
  <template  v-for="(o,oI) in formFields2" :key="oI"  #[String(`label-${o.key}`)]="{label,props}">
    循环写法
  </template>
</UiForm>
```

## Attributes - uiFormProps 

| 属性名      | 说明        |  类型         |  默认值       | 
| :---        | :---   |   :---  |:----: |
| model   | 双向绑定参数        | object      |—  |
| labels   | 表单字段集合，<span style="color:blue;">下方查看LabelItem属性</span>| LabelItem[]      | —  |
| btns   | 按钮集合,<span style="color:blue;">下方查看LabelItem属性</span>        | LabelItem[]      | —  |
| props   | 传 el-form 官网组件属性        | FormProps      | —  |
| options   | 涉及到表单布局配置        | FormOptions      | — |


``` ts
const uiFormProps = {
  model: { type: Object, default: () => ({}) },
  labels: { type: definePropType<LabelItem[]>(Array), default: () => [] },
  btns: { type: definePropType<LabelItem[]>(Array), default: () => [] },
  props: { type: definePropType<FormProps>(Object), default: () => ({}) },
  options: { type: definePropType<FormOptions>(Object), default: () => ({}) }
}

``` 



## LabelItem

| 属性名      | 说明        |  类型         |  默认值       | 
| :---        | :---   |   :---  |:----: |
| label   | 名称       | string   |	— |
| key   | 键       | string   |	— |
| type   | 组件类型,<span style="color:blue;">下方查看枚举</span>     | string   |	— |
| props   | 表单组件官网属性       | LabelProps    |	— |
| slotName   | 插槽名称       | string   |	— |
| gridItem   | 表格属性       | GridProps   |	— |
| formItem   | el-form-item 官网属性       | FormItemProps   |— |
| options   | 选项集合       | LabelOptionItem   |	— |
| child   |  多选框、单选框的options的选项的配置      |  LabelItem  |	— |
| rules   |  表单校验      | array  参考element-plus写法  |	— |
| show   | 是否显示        | string / Function(model,labelItem)   |	— |
| change   |     change事件   |  Function(value,model,labelItem)  |	— |

``` ts

type LabelType = 'slot' | 'input' | 'select' | 'date-picker' 
|'switch' | 'time-picker' | 'time-select' | 'upload' 
| 'radio-group' | 'radio' | 'input-number' | 'color-picker' 
| 'checkbox-group' | 'checkbox' | 'autocomplete'

type LabelProps = {
  gridItem?: GridProps
  formItem?: FormItemProps
  rules?: FormRuleItem[]
  placeholder?: string
  [x: string]: any
}

type LabelItem = {
  label: string
  key: string
  type: LabelType
  props?: LabelProps
  slotName?: string
  gridProps?: GridProps
  formItemProps?: FormItemProps
  options?: LabelOptionItem[]
  child?: LabelItem
  rules?: FormRuleItem[]
  show?: boolean | ((model: any, label: LabelItem) => boolean)
  change?: (value: string | number, model: any, label: LabelItem) => void
  _visible?: boolean
}

interface FormItemProps {
  labelWidth?: string | number
  label?: string
  prop?: string
  required?: boolean
  rules?: FormRuleItem[]
  error?: string
  validateStatus?: string
  for?: string
  inlineMessage?: boolean | string
  showMessage?: boolean
  size?: string
}

interface FormChangeOutput {
  key: string
  params: any
  value: any
}

export interface GridProps {
  cols?: number | string
  xGap?: number | string
  yGap?: number | string
  style?: any | string
  itemStyle?: any | string
  span?: number | string
}

type FormProps = {
  rules?: FormRules
  labelPosition?: 'left' | 'right' | 'top'
  labelWidth?: string | number
  labelSuffix?: string
  inline?: boolean
  inlineMessage?: boolean
  statusIcon?: boolean
  showMessage?: boolean
  size?: string
  hideRequiredAsterisk?: boolean
  validateOnRuleChange?: boolean
  [key: string]: any
}

``` 

## Slots

| 插槽名      | 说明        |  子标签         |
| :---        | :---   |   :---  |
| label-[字段的key]   | 表单字段的自定义label插槽       |  —  |
| slotFields   | 字段type类型为slot时       |  —  |


## Event

| 事件名称      | 说明        |  类型         |
| :---        | :---   |   :---  |
| resetFields   | 	重置该表单项，将其值重置为初始值，并移除校验结果       |  ()=>void  |
| validate   |     对整个表单的内容进行验证。 接收一个回调函数，或返回 Promise。   |  ()=>Promis  |
| validateField   |    	验证具体的某个字段。   |  (key,callback)=>FormValidationResult  |
<style module>
.button {
  color: red;
  font-weight: bold;
}
</style>