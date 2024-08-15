<template>
  <div class="view-component">
    <h3>加载字段示例</h3>
    <template v-for="(item, index) in mockData" :key="index">
      <el-button type="primary" @click="onAction(item)">{{ item.label }}</el-button>
    </template>
    <h3>使用工具</h3>
    <template v-for="(item, index) in actionItems" :key="index">
      <el-button type="primary" @click="onAction(item)">{{ item.label }}</el-button>
    </template>

    <el-popover placement="right" :visible="state.showImport" :width="400" trigger="click">
      <template #reference>
        <el-button type="warning" @click="state.showImport = true">导入配置系统中的模块</el-button>
      </template>
      <h2 style="margin-bottom: 20px;">该操作会将导入配置系统中指定项目ID的指定模块</h2>
      <h1>操作步骤</h1>
      <ul>
        <li>输入项目ID和菜单ID进行导入</li>
      </ul>
      <el-form label-width="100">
        <template v-for="(item, index) in quickEditFields" :key="index">
          <el-form-item :label="item.label"> <el-input v-model="state.params[item.key]" v-bind="item.props" />
          </el-form-item>
        </template>
      </el-form>
      <div class="flex f-jcfe" style="text-align: right;">
        <el-button type="text" @click=" onAction({ key: 'import' })">确定</el-button>
        <el-button type="text" @click="state.showImport = false">取消</el-button>
      </div>
    </el-popover>
    <el-popover placement="right" :visible="state.show" :width="400" trigger="click">
      <template #reference>
        <el-button type="warning" @click="state.show = true">导出到menu表</el-button>
      </template>
      <h2 style="margin-bottom: 20px;">该操作会将下面编辑器配置的字段导出到配置系统中指定的项目ID的模块中</h2>
      <p style="margin-bottom: 20px;">目前只支持导出简单的label、key、props、type等字段</p>
      <h1>操作步骤</h1>
      <ul>
        <li>1、清空编辑器内容，将代码中编写的JSON配置字段复制至下发的编辑器内，点击转化按钮</li>
        <li>2、点击“导出到menu表”按钮，输入项目ID和菜单ID进行导出</li>
      </ul>
      <el-form label-width="100">
        <template v-for="(item, index) in quickEditFields" :key="index">
          <el-form-item :label="item.label"> <el-input v-model="state.params[item.key]" v-bind="item.props" />
          </el-form-item>
        </template>
      </el-form>
      <div class="flex f-jcfe" style="text-align: right;">
        <el-button type="text" @click=" onAction({ key: 'export' })">确定</el-button>
        <el-button type="text" @click="state.show = false">取消</el-button>
      </div>
    </el-popover>
    <JSONEdit :code="code" ref="jsonRef"></JSONEdit>
    <template v-for="(item, index) in actionItems" :key="index">
      <el-button type="primary" @click="onAction(item)">{{ item.label }}</el-button>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus'
import JSONEdit from './JSONEdit/index.vue'
import { mockFields, tableFields, formFields } from './mock'
import { get, set } from 'lodash-es'
import { componentTypeOptions } from './JSONEdit/js/config'

let state = reactive({
  data: [],
  show: false,
  showImport: false,
  params: {
    projectId: '',
    parentId: ''
  }
})


let componentTypeMap = {}
componentTypeOptions.map(e => {
  set(componentTypeMap, e.value, get(e, 'attr.componentType', ''))
})


let mockData = [
  { label: '信息字段', key: 'info' },
  { label: '表格字段', key: 'table' },
  { label: '表单字段', key: 'form' },
]

const quickEditFields = [
  { label: '项目ID', key: 'projectId', props: { placeholder: '请输入导出到具体项目的id' } },
  { label: '菜单ID', key: 'parentId', props: { placeholder: '请输入导出到具体项目的菜单的id' } },
]

const actionItems = [
  { label: '清空', key: 'clear' },
  { label: '转化', key: 'transform' },
]

let code = ref<any>(formFields)
let jsonRef = ref()


const nodeApi = 'http://172.16.208.12:16050/node-szzt'
let FieldUIMapper = {
  e6: 'text',
  e7: 'input',
  e8: 'select',
  e9: 'cascader',
  e10: 'checkbox-group',
  e11: 'radio-group',
  e12: 'switch',
  e13: 'datePicker',
  e14: 'rate',
  e15: 'slider',
  e16: 'tag',
  e17: 'image',
  e18: 'colorPicker',
  e20: 'slot',
  e24: 'input-number',
  e99: 'slot',
  'e-1':''
}
async function onAction (item) {
  let { key } = item
  switch (key) {
    case 'info':
      code.value = mockFields
      break
    case 'table':
      code.value = tableFields
      break
    case 'form':
      code.value = formFields
      break
    case 'transform':
      let { stringifyCode, handleResult } = jsonRef.value.getData()
      code.value = handleResult
      break
    case 'clear':
      code.value = []
      break
    case 'import':
      const result = await fetch(`${nodeApi}/menu/query`, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ "allMenus": true, "page": 1, "pageSize": 3000, projectId: state.params.projectId })
      })

      const { data } = await result.json()
      let list = data.list.sort((a,b)=>{
        return a.orderNum - b.orderNum
      })
      let menus = list.filter(item => {
        return item.parentId == state.params.parentId
      })
      // 为了对应上组件ui-form 所需字段结构,字段需要做处理。 处理方式参考useModule
      let handleFields = menus.map((field: any) => {
        let { fieldConf = {
          props:[],
          transform:[]
        } } = JSON.parse(get(field, '_options', field.options))
        delete field.options
        let {transform} = fieldConf
        try {
          // 如果menu字段没有开启高级配置,则不会有props字段,则初始化一个
          if (!fieldConf.props) {
            fieldConf.props = [{ type: 'props', option: {} }]
          }
          // props
          let props: any = fieldConf.props.find(item => {
            return item.type === 'props'
          })
          if(props){
            field.props = props.option
          }
          transform.forEach(e=>{
            if(['time','defaultValue','unit'].includes(e.type)){
              set(field.props,e.type,get(e,'option.value',''))
            }else{
              if(e.type == 'dict'){
                delete e.option.options
              }
              set(field.props,e.type,e.option)
            }
          })
          // options
          let options: any = fieldConf.props.find(item => {
            return item.type === 'options'
          })
          if(options){
            let { sourceType,id,label,value} = options.option
            if(sourceType == 'chooseType'){
              set(field.props,'optionsSource',`dict_${id}.tree`)
            }else if (sourceType === 'node'){
              set(field.props,'optionsSource',`dict_n${id}.tree`)
            }
          }
          
          field.label = field.name
          field.type = get(FieldUIMapper,`e${field.componentType}`,'')
          if(!field.type){
            delete field.type
          }
        } catch (error) {
          console.log(`${field.name}更新出错`,error)
        }
        return field
      })

      
      onAction({ key: 'clear' })
      code.value = menus
      state.params.projectId = ''
      state.params.parentId = ''
      state.showImport = false
      break
    case 'export':
      if (state.params.projectId == '' || state.params.parentId == '') {
        return ElMessage.info('id没有输入')
      }
      let jsonRefData = jsonRef.value.getData()
      try {
        let promiseList: any[] = []
        jsonRefData.handleResult.forEach(e => {
          let params = {
            menu: createFields(e)
          }
          promiseList.push(fetch(`${nodeApi}/menu/create`, {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(params)
          }))
        })
        Promise.all(promiseList).then(res => {
          ElMessage.success('添加成功')
        })
      } catch (error) {
        console.log(error, 'error');

      }
      state.show = false;
      state.params.projectId = ''
      state.params.parentId = ''
      break
    default:
      break
  }

  setTimeout(() => {
    jsonRef.value.init()
  })
}


function createFields (fieldsItem) {
  let { key, label, props = {}, type } = fieldsItem
  // componentType的枚举 跟 menu表的字段对应
  let componentType = get(componentTypeMap, type, '-1')
  // 在这里可以根据type类型,获取一些组件的初始化属性
  let initOption: any = props
  if (type) {
    set(initOption, 'type', get(props, 'type', fieldsItem.type || ''))
  }
  let transform:any[] = []
  for (const key in props) {
    if (Object.prototype.hasOwnProperty.call(props, key)) {
      const element = props[key];
      if(['unit','time','defaultValue'].includes(key)){
        transform.push({
          type:key,
          option:{value:element}
        })
        delete props[key]
      }else if(['substring','number','dict'].includes(key)){
        if(key == 'dict'){
          delete element.options
        }
        transform.push({
          type:key,
          option:element
        })
        delete props[key]
      }
    }
  }
  let fields = {
    'name': label,
    'key': key,
    'menuType': 5, // 表示字段
    'menuModule': '',
    'hidden': 1,
    'parentId': state.params.parentId,
    'orderNum': 99,
    'path': '#',
    'link': '#',
    'component': '#',
    'componentConfigId': '',
    'pageLoadType': 1,
    'pageType': 1,
    'componentType': componentType, // 组件类型
    'icon': '',
    'projectId': state.params.projectId,
    options: JSON.stringify({
      'hiddenSide': 0,
      'hiddenHeader': 0,
      'fieldConf': {
        'open': 1, 'transform': transform,
        'props': [
          { 'type': 'props', 'option': initOption }
        ]
      },
      'btnConf': { 'open': 0 }
    }
    ),
    'picture': '',
    'remark': '',
    'creater': '',
    'delete': 0,
    'source': 'page-view'
  }
  return fields
}


</script>

<style lang="scss" scoped></style>
