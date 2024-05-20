import { MenuMode } from '@/typings/data'

export function getOptionForField (field: MenuMode, cb = fieldOption => {}): any {
  const { fieldConf = {} } = JSON.parse(field.options || '{}')
  let fieldOption = {}

  try {
    const props: any = fieldConf.props.filter(item => {
      return item.type === 'props'
    })[0] || {}
    fieldOption = Object.assign(fieldOption, props.option)
  } catch (error) {
  }

  cb(fieldOption)
  return fieldOption
}

// 字符串函数转化为可执行函数
export function conversionFunction (options) {
  Object.keys(options).map(key => {
    const item = options[key]
    try {
      if (isFunctionString(item)) {
        options[key] = eval('(' + item + ')')
      }
    } catch (error) {

    }
  })
}

// 判断字段是否是函数
function isFunctionString (str) {
  // 匹配函数的正则表达式模式
  const functionPattern = /^function\s*\w*\s*\([\w\s,]*\)\s*{.*}$/
  const arrowFunctionPattern = /^([\w\s,]*)\s*=>.*$/

  // 使用正则表达式进行匹配
  return functionPattern.test(str) || arrowFunctionPattern.test(str)
}


export function setClassNameOfFields () {

}

