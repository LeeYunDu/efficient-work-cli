<template>
  <el-dialog
    v-model="show"
    destroy-on-close
    :title="dialogTitle"
    width="80%"
    @open="init"
  >
    <el-button type="primary" @click="init">init</el-button>
    <div class="button-box">
      <el-radio-group v-model="state.model" @change="onTransformClick">
        <template v-for="(item,index) in editModelType" :key="index">
          <el-radio :label="item.key" border>{{ item.label }}</el-radio>
        </template>
      </el-radio-group>
      <el-button type="primary" @click="onSave">保存</el-button>
    </div>
    <div class="tip">{{ tip }}</div>
    <prism-editor
      v-if="['detail','simplification'].includes(state.model)"
      v-model="editorCode"
      class="my-editor  mb-4"
      :highlight="highlighter"
      line-numbers
    />
    <template v-if="state.model=='json'">
      <div  id="json-edit-container"></div>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
import { computed, onMounted,PropType,reactive,ref } from 'vue'
import JSONEditor from 'jsoneditor'
import 'jsoneditor/dist/jsoneditor.css'
import { cloneDeep, forEach, get,isFunction, result } from 'lodash-es'
import { getOptionForField } from '../../utils/index'
import { MenuMode } from '../../typings/model'
import { SimplificationKey,SimplificationPropKeysBlackList,editModelType } from './config'
import { Ast } from '../../utils/ast'
import { parse } from 'acorn'
import escodegen from 'escodegen'
import ConfigOpt from '../../config'
import { PrismEditor } from 'vue-prism-editor' 
import 'vue-prism-editor/dist/prismeditor.min.css' 
// import the styles somewhere

// import highlighting library (you can use any library you want just return html string)
import prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css' // import syntax highlighting styles


const props = defineProps({
  modelValue: { type: Boolean, default: false },
  fields:{
    type:Object as PropType<MenuMode[]>
  },
  modelType:{
    type:String,
    default:''
  }
})
const editorCode = ref('console.log("Hello World")')
const highlighter = code => {
  return prism.highlight(code, prism.languages.js)
}
let state = reactive({
  model:'simplification',
})

const emits = defineEmits(['update:modelValue','save'])

const show = computed({
  get: () => {
    if(props.modelValue){
    }
    return props.modelValue
  },
  set: val => emits('update:modelValue',val)
})



let useData = computed(()=>{
  return props.fields
})
let editorInstance = ref<any>(null)

const dialogTitle = computed(()=>{
  return `配置面板`
})


const tip = computed(()=>{
  if(props.modelType == 'import'){
    return '请输入JSON格式正确的配置'
  }
  if(state.model == 'simplification'){
    return `精简模式下只展示组件会使用到属性，比如${SimplificationKey.join('、')}字段`
  }else{
    return '详情模式展示 类型 MenuMode 的全量字段'
  }
})


function initJSONModel (data){
  const container = document.getElementById('json-edit-container')
    const options = {
      mode:'code'
    }
    const editor = new JSONEditor(container, options)
    editorInstance.value = editor
    editorInstance.value.set(data)
}
function init (){
  if(props.modelType == 'import'){
    editorCode.value = getASTResult([])
  }else{
    state.model = 'simplification'
    onTransformClick(state.model)
  }
  // editorInstance.value.set(props.componentOptions)
}


// 展示的类型
function onTransformClick (type:string){
  switch(type){
    case 'simplification':
      onTransformSimplification('simplification')
      break
    case 'json':
      onTransformSimplification('json')
      break
    case 'detail':
      onTransformDetail()
      break
  }
}



// 精简模式
function onTransformSimplification (type){
  // 只需展示这些字段
  let resultGroup:any = []
  forEach(useData.value,currentField=>{
    let result:{
      [key:string]:any
    } = {}
    
    SimplificationKey.forEach(key=>{
      if(key == 'props'){
        result.props = getOptionForField(currentField,option=>{
          Object.keys(option).forEach(key=>{
            let value = option[key]
            if(value === ''){
              delete option[key]
            }
            if(SimplificationPropKeysBlackList.includes(key)){
              delete option[key]
            }
            if(isFunction(value)){
              console.log('is Function ')
              value = value.toString()
            }else{

            }

          })
        })
      }else{

        let value = get(currentField,key)
        if(isFunction(value)){
          result[key] = value.toString()
        }else{
          result[key] = value

        }

      }
    })
    resultGroup.push(result)
  })

  // 渲染的结构是stirng类型
  if(type=='simplification'){
    editorCode.value = getASTResult(resultGroup)
  }else{
    initJSONModel(resultGroup)
  }
}
// 详细JSON模式
function onTransformDetail (){
  editorCode.value = getASTResult(useData.value)
  // editorInstance.value.set(cloneDeep(props.fields))
}
function onSave (){
  // if(state.model == 'json'){
  //   emits('save',editorInstance.value.get())
  //   show.value = false
  //   return 
  // }
  let labels:any[] = []
  switch (state.model) {
    case 'json':
      labels = editorInstance.value.get().map(field=>{
        return createFields(field)
      })
      break;
    case 'detail':
    case 'simplification':
      const configAst = new Ast(editorCode.value, {}, true)
      let  resultArray:any[] = []
      let node = configAst.ast?.attr('program.body')[0].expression.elements
      node.forEach(nodeItem=>{
        let resultItem = configAst.getObjectExpressionNodeValue(nodeItem)
        resultArray.push(resultItem)
      })
      labels = resultArray.map(field=>{
        return createFields(field)
      })
      break
    default:
      break;
  }
  
  emits('save',labels)
  show.value = false
}

function replaceSingleQuotesWithDoubleQuotes (str) {
  return str.replace(/'/g, '"')
}


function getASTResult (fields){

  // 这里的JSON.stringify(fields)是为了防止字段中有函数
  // 因为escodegen不支持函数
  // 所以这里需要先转成字符串再转成AST
  let configAst = new Ast(`
    ${JSON.stringify(fields)}
    `, {}, true)
  // ${JSON.stringify(fields)}

  // let formFieldsNode = configAst.getVariableNode('formFields')
  // let elements = formFieldsNode.attr('declarations')[0].init.elements

  // fields.forEach((item,index)=>{
  //   let node:any = configAst.generateNode({})
  //   for (const key in item) {
  //     if (Object.prototype.hasOwnProperty.call(item, key)) {
  //       const element = item[key]
  //       let singleField:any = configAst.generateNode({ [key]:element })

  //       node.properties = node.properties.concat(singleField.properties)
  //     }
  //   }
  //   elements.push(node)
  // })

  // 这里做了美化JSON格式的操作
  const acornAst = parse(configAst.ast.generate(), { sourceType: 'module' })
  let result = escodegen.generate(acornAst, { format: { indent: { style: '  ' } } })
  let beautifyResultAst = new Ast(result, {}, true)
  let node = beautifyResultAst.ast?.attr('program.body')[0].expression.elements
  node.forEach(nodeItem=>{
    let findNode = nodeItem.properties.filter(field=>{
      return ['testFunction','testFunction2'].includes(get(field,'key.value',''))
    })
    findNode.map(filterNode=>{
      filterNode.value = beautifyResultAst.generateNode(eval(`(${filterNode.value.value})`))
    })
    // findNode.value = beautifyResultAst.generateNode(eval(findNode.value.value))
  })
  return beautifyResultAst.ast.generate()


  return configAst.ast.generate()
  return
  // 创建一个Blob对象，用于生成JSON文件
  // const blob = new Blob([configAst.ast.generate()], { type: 'application/json' })
  const blob = new Blob([configAst.ast.generate()], { type: 'text/typescript' })

  // 创建一个链接，用于下载JSON文件
  const url = URL.createObjectURL(blob)

  // 创建一个<a>标签，用于触发下载操作
  const link = document.createElement('a')
  link.href = url
  link.download = 'myObject.ts'

  // 触发点击事件，开始下载JSON文件
  link.click()
}

const Config: any = cloneDeep(ConfigOpt)
let FieldUIMapper = get(Config,'dictData.FieldUIMapper')
let componentTypeNumber = {}

for (const key in FieldUIMapper) {
  if (Object.prototype.hasOwnProperty.call(FieldUIMapper, key)) {
    const element = FieldUIMapper[key]
    componentTypeNumber[element] = key.slice(1)
  }
}

let order = 1
function createFields (field):MenuMode{

  let componentType = get(componentTypeNumber,field.type,'99')
  let id = Math.floor(Math.random() * 100001)
  let initOption:any = field.props
  if(get(field,'options')){
    initOption.options = get(field,'options',[])
  }
  let fields:MenuMode = {
    'sid':id,
    'id':id,
    'name':field.label,
    'key': field.key,
    'menuType':5,
    'menuModule':'',
    'hidden':1,
    'parentId':'',
    'orderNum':order,
    'path':'#',
    'link':'#',
    'component':'#',
    'componentConfigId':'',
    'pageLoadType':1,
    'pageType':1,
    'componentType':componentType, // 组件类型
    'icon':'',
    'projectId':'',
    options:JSON.stringify({
      'hiddenSide':0,
      'hiddenHeader':0,
      'fieldConf':{ 'open':1,'transform':[{}],
        'props':[
          { 'type':'props','option':initOption }
        ]
      },
      'btnConf':{ 'open':0 } }
    ),
    'picture':'',
    'remark':'',
    'creater':'',
    'delete':0,
    'source':'page-view'
  }
  order++
  return fields
}
</script>

<style lang="scss"  scoped>

#json-edit-container{
  height: 500px;
}

.button-box{
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;

}

.tip{
  margin-bottom: 10px;
}

.my-editor {
  /* we dont use `language-` classes anymore so thats why we need to add background and text color manually */
  background: #2d2d2d;
  color: #ccc;

  /* you must provide font-family font-size line-height. Example: */
  font-family: Fira code, Fira Mono, Consolas, Menlo, Courier, monospace;
  font-size: 14px;
  line-height: 1.5;
  padding: 5px;
}

/* optional class for removing the outline */
.prism-editor__textarea:focus {
  outline: none;
}


.token.comment, .token.block-comment, .token.prolog, .token.doctype, .token.cdata{
  line-height: 1.5;
}
.height-200 {
  height: 200px;
}


</style>
