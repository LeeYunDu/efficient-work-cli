<template>
  <div class="json-edit-component">
    <div class="button-group">
      <template v-for="(item, index) in actionButtons" :key="index">
        <button class="button-item" @click="onAction(item)">
          {{ item.label }}
        </button>
      </template>
    </div>
    <prism-editor
      v-if="show"
      v-model="editorCode"
      class="my-editor editor-panel mb-4"
      :highlight="highlighter"
      line-numbers
    />
    <!-- <prism-editor v-model="editorCode" class="editor-panel" :highlight="highlighter" line-numbers /> -->
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, reactive, ref } from 'vue';
import escodegen from 'escodegen'
import { parse } from 'acorn'
import { PrismEditor } from 'vue-prism-editor' 
import 'vue-prism-editor/dist/prismeditor.min.css' 
import prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css' // import syntax highlighting styles
import { cloneDeep, forEach, get, isArray, isFunction, isObject, isString, result, set } from 'lodash-es'
import Ast from './js/ast'
import { emit } from 'process';

interface IEditPanelProps {
  code: Object | Array<any>
}

let props = defineProps<IEditPanelProps>()

let show = ref(false)
let emits = defineEmits(['save'])
const editorCode = ref('')
let dataType = ref('')
const highlighter = code => {
  return prism.highlight(code, prism.languages.js)
}


let actionButtons = ref([
  { label: '保存', key: 'save' },
  { label: '运行', key: 'run' },
  { label: '格式化', key: 'format' },
])


function onAction ({ key }) {
  switch (key) {
    case 'save':
      onSave()
      break;
    case 'run':

      break
    case 'format':

      break
    default:
      break;
  }
}

// 格式化代码片段
function beautifyResultAst (handleResult, type: string) {
  // AST的代码片段不支持支持传Object,所以用Array包裹一层
  let orginAst = new Ast(`
  ${type == 'object' ? `[${JSON.stringify(handleResult)}]` : JSON.stringify(handleResult)} 
    `, {}, true)
  let codeTemplate: string = orginAst.ast.generate()

  const acornAst = parse(codeTemplate, {
    sourceType: 'module',
    locations: true
  })

  let result = escodegen.generate(acornAst, {
    format: {
      indent: {
        style: '  ', // 使用两个空格进行缩进
        base: 0, // 缩进基数
        adjustMultilineComment: false // 是否调整多行注释的缩进
      },
      lineEnd: '\n' // 设置换行符
    }
  })

  let beautifyResultAst = new Ast(result, {}, true)
  let node = beautifyResultAst.ast?.attr('program.body')[0].expression.elements
  node.forEach(nodeItem => {

    if (nodeItem.type == 'ArrayExpression') {
      handleAstNodeArray(nodeItem.elements, beautifyResultAst)
    } else if (nodeItem.type == 'ObjectExpression') {
      handleAstNodeProperties(nodeItem.properties, beautifyResultAst)
    } else if (nodeItem.type == 'StringLiteral') {
      if (nodeItem.value.indexOf('function') > -1 || nodeItem.value.indexOf('=>') > -1) {
        try {
          nodeItem.value = eval(`(${nodeItem.value})`)
        } catch (error) {
          console.log(error);
        }
      }
    }

  })
  return beautifyResultAst.ast.generate()
}


// 处理数组类型的AST节点
function handleAstNodeArray (arrayNodes, ast) {
  arrayNodes.map(arrayNode => {
    if (arrayNode.type == 'ObjectExpression') {
      handleAstNodeProperties(arrayNode.properties, ast)
    } else if (arrayNode.type == 'StringLiteral') {
      if (arrayNode.value.indexOf('function') > -1 || arrayNode.value.indexOf('=>') > -1) {
        try {
          arrayNode.value = eval(`(${arrayNode.value})`)
        } catch (error) {
          console.log(error);
        }
      }
    } else if (arrayNode.type == 'ArrayExpression') {
      handleAstNodeArray(arrayNode.elements, ast)
    }
  })
}


// 处理对象类型的AST节点
function handleAstNodeProperties (properties, ast) {
  properties.map(item => {
    let valueType = get(item, 'value.type', 'type')
    if (valueType == 'StringLiteral') {
      try {
        item.value = ast.generateNode(eval(`(${item.value.value})`))
      } catch (error) {

      }
    } else if (valueType == 'ObjectExpression') {
      handleAstNodeProperties(get(item, 'value.properties', []), ast)
    } else if (valueType == 'ArrayExpression') {
      let arrayNodes = get(item, 'value.elements', [])
      handleAstNodeArray(arrayNodes, ast)
    }
  })
}

// 处理对象类型的数据
function handleObject (data) {
  for (const key in data) {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      const element = data[key];
      if (isFunction(element)) {
        set(data, key, element.toString())
      } else if (isObject(element)) {
        set(data, key, handleObject(element))
      } else if (isArray(element)) {
        set(data, key, element.map(e => handleObject(e)))
      }
    }
  }
  return data
}

// 处理数组类型的对象
function handleArray (data) {
  return data.map(element => {
    if (isFunction(element)) {
      element = element.toString()
    } else if (isObject(element)) {
      element = handleObject(element)
    } else if (isArray(element)) {
      element = element.map(e => handleObject(e))
    }
    return element
  })

}

function onSave () {
  
  let value = eval(editorCode.value)
  let handleResult = ''
  try {
    if (dataType.value == 'object') {
      handleResult = handleObject(value)
    } else if (dataType.value == 'array') {
      handleResult = handleArray(value)
    }
    let result = {
      code:editorCode.value,
      evalCode:eval(editorCode.value),
      handleResult,
      stringifyCode:JSON.stringify(handleResult)
    }
    emits('save',result)
    
  } catch (error) {
    console.log(error);
    console.log('eval 对象失败');

  }


}



function init () {
  if(props.code){
    let handleResult = null
    let type = ''
    if (isArray(props.code)) {
      handleResult = handleArray(props.code)
      type = 'array'
    } else if (isObject(props.code)) {
      handleResult = handleObject(props.code)
      type = 'object'
    } else if (isString(props.code)) {

    } else if (isFunction(props.code)) {

    }
    dataType.value = type
    editorCode.value = beautifyResultAst(handleResult, type)
  }
 
}

onMounted(() => {
  show.value = true
  init()

  // // http://172.16.208.12:16050/efwork/static/App.vue
  // fetch('http://172.16.208.12:16050/efwork/static/App.vue', {
  //   headers: {
  //     'Accept': 'text/plain'
  //   }
  // }).then(res => {
  //   res.text().then(response => {
  //   // editorCode.value = response

  //     let orginAst = new Ast(response, {
  //       parseOptions: { language: 'vue' }
  //     }, true)
      
  //       })
  // })
})


defineExpose({
  getData:onSave()
})

</script>

<style lang="scss" scoped>
.json-edit-component {}


.editor-panel {
  /* we dont use `language-` classes anymore so thats why we need to add background and text color manually */
  background: #2d2d2d;
  color: #ccc;
  /* you must provide font-family font-size line-height. Example: */
  font-family: Fira code, Fira Mono, Consolas, Menlo, Courier, monospace;
  font-size: 14px;
  padding: 5px;
}

/* optional class for removing the outline */
.prism-editor__textarea:focus {
  outline: none;
}


.token.comment,
.token.block-comment,
.token.prolog,
.token.doctype,
.token.cdata {
  line-height: 1.5;
}


.button-group {
  margin-bottom: 10px;

  .button-item {
    background: rgb(247, 251, 255);
    border: 1px solid rgb(220, 223, 230);
    border-radius: 4px;
    padding: 4px 15px;
    font-size: 14px;

    & ~ .button-item {
      margin-left: 10px;
    }
  }
}
</style>
