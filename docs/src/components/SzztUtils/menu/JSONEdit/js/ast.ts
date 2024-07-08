import $ from 'gogocode'
import _ from 'lodash'
interface IAstNode {
  type: string
  attr: () => void
}
export default class Ast {
  /**
   * 抽象语法树类型枚举
   * FunctionDeclaration (函数)、VariableDeclaration(变量)
   * ImportDeclaration(ts import 引入对象)、CallExpression(表达式)
   * ExpressionStatement(表达式语句)
   * ExportNamedDeclaration(export)
   * Identifier(interface)
   * TSInterfaceBody(typescript interface 字段)
   *
   */
  ast
  // vue文件专属抽象语法树
  htmlAst: any
  jsAst: any

  filePath
  fileType // 枚举: html、vue、javascript(自己定义的)

  enumTypeNode: any = {
    FunctionDeclaration: [],
    VariableDeclaration: [],
    ImportDeclaration: [],
    ExportNamedDeclaration: [],
    Identifier: [],
    TSInterfaceBody: []
  }

  constructor(filePath: string, option: {}, templateString = false) {
    /**
     * templateString true 表示 filePath传入的是代码片段（字符串）,false表示的代码文件路径地址
     * 两者差别会改变语法树解析方式
     */
    if (templateString) {
      this.ast = $(filePath, option)
    } else {
      if (!this.checkExistsFile(filePath, option.hasJoin)) return
      this.filePath = filePath
      this.ast = $.loadFile(filePath, option)
      this.fileType = this.ast.parseOptions && this.ast.parseOptions.language || 'javascript'
    }
    this.init()
  }


  init () {
    try {
      switch (this.fileType) {
        case 'javascript':
          // 根据抽象语法树类型枚举过滤node
          this.ast.attr('program.body').forEach((node: { type: string }) => {
            if (node.type in this.enumTypeNode) {
              this.enumTypeNode[node.type].push(node)
            }
          })
          break
        case 'vue':
          this.ast.find('<script setup></script>').each((item: any) => {
            this.jsAst = item
          })
          this.ast.find('<template></template>').each((item: any) => {
            this.htmlAst = item
          })
          break
        case 'html':
          break
      }
    } catch (error) {
      throw new Error(`解析抽象语法树失败,请检查需插入的文件是否有语法错误!`)
    }

  }
  /**
   * 检查文件是否存在
   * 文件地址包含node_modules默认为szzt-cli 源码文件
   */
  checkExistsFile (filePath: string | string[], hasJoin = true) {
    const result = filePath.indexOf('node_modules') > -1 ? false : hasJoin
    if (!checkExists(filePath, result)) {
      console.log(new Error(`需注入代码的文件${filePath}缺失!`))
      return false
    } else {
      return true
    }
  }

  /**
   * 写入文件
   */
  writeFile (filePath = this.filePath) {
    $.writeFile(this.ast.generate(), filePath)
  }

  generateNode (value: any) {
    const type = Object.prototype.toString.call(value)
    let init
    const params = $(`let variable = ${['[object Object]', '[object Array]'].includes(type) ? JSON.stringify(value) : typeof value === 'string' ? `${value}` : value}`).find('variable').each((item: { nodePath: { parentPath: { value: { init: any } } } }[]) => {
      init = item[0].nodePath.parentPath.value.init
    })
    return init
  }

  /**
   * 修改对象其中一个字段
   * @param {*} obj
   * @param {*} key
   * @param {*} value
   */
  editObjectField (objectName: any, key: any, value: any, ast = this.ast) {
    const node = this.getVariableNode(objectName, ast) as IAstNode
    const nodeType = this.getNodeType(node)
    let fieldNode
    if (node) {
      if (nodeType === 'CallExpression') {
        // 此处针对vue中ref定义Object变量进行添加字段,ref本质上是一个函数
        fieldNode = node.attr('declarations')[0].init.arguments[0].properties.filter((node: { key: { name: string } }) => {
          return node.key.name === key
        })[0]
      } else {
        fieldNode = node.attr('declarations')[0].init.properties.filter((node: { key: { name: string } }) => {
          return node.key.name === key
        })[0]
      }
    }
    if (fieldNode) {
      fieldNode.value = this.generateNode(value)
    }
  }

  /**
   * 给对象添加字段
   * @param {ast} ast 抽象语法树
   * @param {String} objectName 被添加对象
   * @param {Object} injectObject 添加的对象
   */
  addFieldToObject (objectName: string, injectObject: any, ast = this.ast,) {
    // JSON序列化后生成抽象语法树,再获取到对象的properties
    const injectObjectAst = $(JSON.stringify(injectObject))
    const injectProperties = injectObjectAst.attr('properties') || []
    const node = this.getVariableNode(objectName, ast)
    if (node) {
      // 此处针对vue中ref定义Object变量进行添加字段,ref本质上是一个函数
      const nodeType = this.getNodeType(node)
      if (nodeType === 'CallExpression') {
        node.attr('declarations')[0].init.arguments[0].properties = node.attr('declarations')[0].init.arguments[0].properties.concat(injectProperties)
      } else {
        node.attr('declarations')[0].init.properties = node.attr('declarations')[0].init.properties.concat(injectProperties)
      }
    }


  }

  /**
   * 修改变量的值
   *
   * 当赋值值为string时,添加反单引号,`'value'`,当值为其他的变量名时,'value'
   *
   * bug:当赋予的值的类型对象,且存在key的值的类型为Function时,那么该key会被过滤
   * @param {string} variable 变量名称
   * @param {*} value
   */
  editVariableNode (variable: any, value: any, ast = this.ast) {
    const node = this.getVariableNode(variable, ast) as IAstNode
    const nodeType = this.getNodeType(node)
    if (node) {
      if (nodeType === 'CallExpression') {
        node.attr('declarations')[0].init.arguments = [this.generateNode(value)]
      } else {
        node.attr('declarations')[0].init = this.generateNode(value)
      }

    }

  }

  /**
   * 获取当前抽象节点树下的变量node
   * @param {*} ast
   * @param {string||number} variable
   * @returns {} 返回值 node:'变量节点',value:'变量值',name:'变量名称'
   */
  getVariableNode (variable: string, ast = this.ast): IAstNode | null {
    try {
      /**
       * 遍历node节点,找到抽象语法树中的声明变量
       * 过滤出变量名称与参数传入一致的节点
       * 修改节点的properties
       */
      // program.body 源文件作用域下的写法  ,body.body是函数当前作用域下的写法
      const body = ast.attr('program.body') || ast.attr('body.body')
      const varNode = body.filter((e: { type: string }) => {
        return e.type === 'VariableDeclaration'
      })
      const nodeArray = varNode.filter((e: { declarations: { id: { name: string } }[] }) => {
        return e.declarations[0].id.name === variable
      })
      if (nodeArray.length > 0) {
        return ast.find(nodeArray[0])
      } else {
        // logger.info(new Error(`未找到节点${variable}!`))
        return null
      }
    } catch (error: any) {
      throw new Error(error)
    }
  }


  // 获取变量的值
  getNodeValue (nodeOrVariable: string | IAstNode, ast = this.ast): any {
    let useNode: IAstNode | null
    if (_.isString(nodeOrVariable)) {
      useNode = this.getVariableNode(nodeOrVariable, ast)
    } else {
      useNode = nodeOrVariable
    }
    if (!useNode) return null

    const nodeValueType = this.getNodeType((useNode as IAstNode))
    let value: any = ''
    // 这里写的类型并不全面，遇到再补充
    switch (nodeValueType) {
      case 'StringLiteral':
      case 'NumericLiteral':
      case 'BooleanLiteral':
      case 'NullLiteral':
        value = _.get(useNode.attr('declarations'), '[0].init.value')
        break
      case 'ObjectExpression':
        break
      case 'ArrayExpression':
        break
      default:
        break
    }



    return value
  }
  // 获取Object类型的节点的值
  getObjectExpressionNodeValue (ObjectExpressionNode) {
    const { properties } = ObjectExpressionNode
    const result = {}
    if (properties.length > 0) {
      properties.map(item => {
        const propertiesResult = {}
        const key = _.get(item, 'key.value') || _.get(item, 'key.name')
        const valueType = _.get(item, 'value.type')
        let value = null
        switch (valueType) {
          case 'ObjectExpression':
            value = this.getObjectExpressionNodeValue(item.value)
            break
          case 'ArrayExpression':
            value = this.getArrayExpressionNodeValue(item.value)
            break
          case 'ArrowFunctionExpression':
          case 'FunctionExpression':
            value = eval(`(${$(item.value).generate()})`)
            break
          default:
            value = _.get(item, 'value.value')
        }
        result[key] = value
      })
    }
    return result
  }
  // 获取Array类型的值
  getArrayExpressionNodeValue (ArrayExpressionNode) {
    const { elements } = ArrayExpressionNode
    const result = []
    elements.map(item => {
      const valueType = _.get(item, 'type')
      let value = null
      switch (valueType) {
        case 'ObjectExpression':
          value = this.getObjectExpressionNodeValue(item)
          break
        case 'ArrayExpression':
          value = this.getArrayExpressionNodeValue(item)
          break
        default:
          value = _.get(item, 'value')
      }
      result.push(value)
    })
    return result

  }
  /**
   * 根据函数名获取函数内部node(节点)
   *
   * @param {*} ast
   * @param {*} fnName
   * @returns
   */
  getFunctoinNode (fnName: string, ast = this.ast) {
    try {
      const temp = ''
      let node = null
      ast.find(`function ${fnName}() {}`).each((item: any, index: any) => {
        node = item
      })
      return node
    } catch (error) {
      return null
    }
  }

  /**
   * 弃用
   * 根据函数名获取函数抽象语法树
   * @param {*} ast
   * @param {*} fnName
   * @returns
   */
  getFunctoinAst (fnName: string, ast = this.ast) {
    try {
      return $(ast.find(`function ${fnName}() {}`))
    } catch (error) {
      return null
    }
  }

  getCallFunction (fnName: string, ast = this.ast) {
    try {
      let node = null
      ast.find(`${fnName}()`).each((item: any, index: any) => {
        node = item
      })
      return node
    } catch (error) {
      return null
    }
  }

  /**
   * 同作用域下插入代码片段
   * @param {*} code
   * @param {*} ast
   */
  appendCode (code: any, ast = this.ast) {
    ast.after(code)
  }

  // 插入import
  insertImport (code: any, ast = this.ast) {
    // import 末尾插入
    if (this.enumTypeNode.ImportDeclaration.length > 0) {
      const lastImport = this.enumTypeNode.ImportDeclaration[this.enumTypeNode.ImportDeclaration.length - 1]
      ast.find(lastImport).each((e: { after: (arg0: any) => void }) => {
        e.after(code)
      })
    } else {
      // 文件开头插入
      ast.before(code)
    }
  }

  /**
   * 删除声明函数
   * @param {*} fnName
   * @param {*} ast
   */
  removeFunction (fnName: string, ast = this.ast) {
    ast.find(`function ${fnName}() {}`).remove()
  }

  /**
   * 删除声明变量
   * @param {*} variableName
   * @param {*} ast
   */
  removeVariable (variableName: string, ast = this.ast) {
    ast.find(`let ${variableName} = $_$1`).remove()
    ast.find(`var ${variableName} = $_$1`).remove()
    ast.find(`const ${variableName} = $_$1`).remove()
  }

  getNodeType (node: IAstNode) {
    if (node) {
      try {
        return node.attr('declarations')[0].init.type
      } catch (error) {
        return node.type
      }
    }
  }
}






