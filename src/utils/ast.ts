import $ from 'gogocode'

const logger = require('./logger')
import { checkExists } from './index'
export class Ast {

  /**
   * 抽象语法树类型枚举 
   * FunctionDeclaration (函数)、VariableDeclaration(变量)
   * ImportDeclaration(ts import 引入对象)、CallExpression(表达式)
   * ExpressionStatement(表达式语句)
   */

  ast: any = null

  // vue文件专属抽象语法树
  htmlAst: any = null
  jsAst: any = null

  filePath: string = ''
  fileType: string = '' // 枚举: html、vue、javascript(自己定义的)



  enumTypeNode: any = {
    FunctionDeclaration: [],
    VariableDeclaration: [],
    ImportDeclaration: [],
    ExportNamedDeclaration: [],
    Identifier: [],
    TSInterfaceBody: []
  }


  constructor(filePath: string, option: any, templateString = false) {
    /**
     * templateString true 表示 filePath传入的是代码片段（字符串）,false表示的代码文件路径地址
     * 两者差别会改变语法树解析方式
     */
    if (templateString) {
      this.ast = $(filePath, option)
    } else {
      if (!this.checkExistsFile(filePath)) return
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
          this.ast.attr('program.body').forEach((node: any, index: number) => {
            if (index === 0) {
              // console.log(node.declaration.declarations[0].id.name, 'node.type');

            }

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
      logger.exit(new Error(`解析抽象语法树失败,请检查需插入的文件是否有语法错误!`))
    }

  }
  /**
   * 检查文件是否存在
   */
  checkExistsFile (filePath: string) {
    if (!checkExists(filePath, filePath.indexOf('node_modules') > -1 ? false : true)) {
      logger.exit(new Error(`需注入代码的文件${filePath}缺失!`))
      return false
    } else {
      return true
    }
  }

  /**
   * 写入文件
   */
  writeFile (filePath: string = this.filePath) {
    let res = $.writeFile(this.ast.generate(), filePath)
    // logger.success(`${filePath},文件写入成功`)
  }

  generateNode (value: any) {
    let type = Object.prototype.toString.call(value)
    let init
    let params = $(`let variable = ${['[object Object]', '[object Array]'].includes(type) ? JSON.stringify(value) : typeof value === 'string' ? `${value}` : value}`).find('variable').each((item: any, index: number) => {
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
  editObjectField (objectName: string, key: string, value: any, ast = this.ast) {
    let node = this.getVariableNode(objectName, ast)
    let nodeType = this.getNodeType(node)
    let fieldNode
    if (node) {
      if (nodeType === 'CallExpression') {
        // 此处针对vue中ref定义Object变量进行添加字段,ref本质上是一个函数
        fieldNode = node.attr('declarations')[0].init.arguments[0].properties.filter((node: any) => {
          return node.key.name === key
        })[0]
      } else {
        fieldNode = node.attr('declarations')[0].init.properties.filter((node: any) => {
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
    let injectObjectAst = $(JSON.stringify(injectObject))
    let injectProperties = injectObjectAst.attr('properties') || []
    let node = this.getVariableNode(objectName, ast)
    if (node) {
      // 此处针对vue中ref定义Object变量进行添加字段,ref本质上是一个函数
      let nodeType = this.getNodeType(node)
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
  editVariableNode (variable: string, value: any, ast = this.ast) {
    let node = this.getVariableNode(variable, ast)
    let nodeType = this.getNodeType(node)
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
  getVariableNode (variable: string, ast = this.ast) {
    try {
      /**
       * 遍历node节点,找到抽象语法树中的声明变量
       * 过滤出变量名称与参数传入一致的节点
       * 修改节点的properties
       */
      // program.body 源文件作用域下的写法  ,body.body是函数当前作用域下的写法
      let body = ast.attr('program.body') || ast.attr('body.body')
      let varNode = body.filter((e: any) => {
        return e.type === 'VariableDeclaration'
      })
      let nodeArray = varNode.filter((e: any) => {
        return e.declarations[0].id.name === variable
      })
      if (nodeArray.length > 0) {
        return ast.find(nodeArray[0])
      } else {
        logger.exit(new Error(`未找到节点${variable}!`))
        return null
      }
    } catch (error) {
      console.log(error);
      return null
    }
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
      let temp = ''
      let node = null
      ast.find(`function ${fnName}() {}`).each((item: any, index: number) => {
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
      ast.find(`${fnName}()`).each((item: any, index: number) => {
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
  appendCode (code: string, ast = this.ast) {
    ast.after(code)
  }

  // 插入import
  insertImport (code: string, ast = this.ast) {
    // import 末尾插入
    if (this.enumTypeNode.ImportDeclaration.length > 0) {
      let lastImport = this.enumTypeNode.ImportDeclaration[this.enumTypeNode.ImportDeclaration.length - 1]
      ast.find(lastImport).each((e: any) => {
        e.after('\n' + code)
      })
    } else {
      // 文件开头插入
      ast.before('\n' + code)
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


  /**
   * 删除节点,返回根节点
   * @param node 
   */
  removeNode (node: any, ast = this.ast) {
    ast.find(node).remove()
  }


  /**
   * 获取节点类型
   * @param node 
   * @returns 
   */
  getNodeType (node: any) {
    if (node) {
      return node.attr('declarations')[0].init.type
    }
  }


  /**
   * 根据export的变量名称找到对应的node
   * @param variableName 
   * @returns 
   * @description 目前实例只支持常量
   */
  getExportNode (variableName: string) {
    let resultNode: any
    this.enumTypeNode['ExportNamedDeclaration'].forEach((node: any) => {
      try {
        if (node.declaration.declarations[0].id.name === variableName) {
          resultNode = node
        }
      } catch (error) {

      }
    })
    if (resultNode) {
      return resultNode
    } else {
      logger.error('没有找到export对象')
    }
  }
  /**
 * 解析 typescript interface 相关代码
 */


  /**
   * 生成interface Node
   * generateInterfaceNode
   * @param {*} name 
   */

  generateIdentifierNode (name: any, hasT = false) {
    let template: any = hasT ? $(`
    interface 占位符<T = any> {
      
    }
  `) : $(`
  interface 占位符 {
    
  }
`)
    let node = template.attr('program').body[0]
    node.id = name
    node.loc.identifierName = name
    return node
    /**
     * interfacePanel.attr('program').body[0].id 最外层 interface名称
     * nterfacePanel.attr('program').body[0].body interface的字段配置
     * 字段配置相关的  名称、类型、注释 
     * 注释相关的字段为 leadingComments、comments
     */
  }
  // interface 字段类型
  generateTSTypeAnnotationNode (keyName: any, keyType: any, comment: any, businessName: any, required: string[] = []) {
    let template: any = $(`
      interface customName<T = any> {
        //注释占位符
        string: string
        //注释占位符
        number: number
        //注释占位符
        boolean: boolean
        //注释占位符
        any:any
        //注释占位符
        array_string:Array<string>
        //注释占位符
        array_interface:Array<interfaceName>
        //注释占位符
        choosable?:any
        //注释占位符
        t: T
        //注释占位符
        list:${businessName}List
      }
    `)


    // 字段类型
    let mapType = ''
    switch (keyType) {
      case 'number':
        mapType = 'number'
        break;
      case 'string':
        mapType = 'string'
        break;
      case 'boolean':
        mapType = 'boolean'
        break
      case 'list':
        // 列表字段类型  名称为业务表示名称 + List
        mapType = 'list'
        break
      default:
        mapType = 't'
        break;
    }
    let fieldNodes
    try {
      fieldNodes = template.attr('program').body[0].body.body
    } catch (error) {
      return null
    }
    let filterNode = fieldNodes.filter((node: { key: { name: string } }) => {
      return node.key.name === mapType
    })[0]
    if (required.includes(keyName)) {
      filterNode.optional = true
    }

    // 字段名称
    filterNode.key.name = keyName
    // 注释
    if (comment) {
      filterNode.leadingComments[0].value = comment
      filterNode.comments[0].value = comment
    } else {
      delete filterNode.leadingComments
      delete filterNode.comments
    }

    return filterNode
  }


}

