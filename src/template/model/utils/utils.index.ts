



// 字典值转换
export function getDictValue (target: any, value: any, valueKey?: string) {
  value = +value
  if (!value && !String(value)) return value
  return store.getters.dictDataOnly(target)?.find((dict: any) => +dict[valueKey || 'id'] === value)?.name || value
}

// 表格数据转化
export function transformTableData (fields: FieldItem[], data: any) {
  const needTransField = fields.filter((field: FieldItem) => {
    return field.transform
  })

  needTransField.forEach((field: FieldItem) => {
    const { transform, key } = field
    let tKey = ''
    try {
      tKey = key.split('_')[0]
    } catch (error) {
      console.log(error)

    }
    // 目前就判断下是否为时间、字典
    let type = ''
    if (transform.indexOf('x') > -1 || (transform.indexOf('{') > -1 && transform.indexOf('}') > -1)) {
      type = 'time'
    }
    if (transform.indexOf('.') > -1) {
      type = 'dict'
    }
    data.map((e: any) => {
      switch (type) {
        case 'time':
          e[key] = parseTime(e[tKey], transform)
          console.log(e[key], 'e[key]')

          break
        case 'dict':
          e[key] = getDictValue(transform, e[tKey])
          break
        default:
          break
      }
      return e
    })
  })

  return data
}


// 表单数据转化
export function transformValue (field: ItemMode, data: any) {
  const { type, unit, key, option = {} } = field
  let result: any = ''
  const value = data[key]

  switch (type) {
    case 'time':
      if ('format' in option) {
        result = parseTime(value, option.format)
      }
      break
    case 'dict':
      if ('format' in option) {
        result = getDictValue(option.format, value)
      }
      break
    default:
      if (unit) {
        result = value ? value + unit : 0
      } else {
        result = value
      }
      break
  }
  return result
}

/**
 * 导出excel功能
 * 1、请求接口拿到数据
 */
async function onExport () {
  let { data } = await apiName(Object.assign({}, table.value.params, {}))
  exportExcelByJson(data.excelData, '项目清单.xlsx')
}

/**
 *  xlsx 下载
 *  "xlsx": "^0.18.5"
 * @param data 
 * @param fileName 
 * @returns 
 */
export const exportExcelByJson = function (data, fileName) {
  if (!isArray(data)) return
  const excelBook = XLSX.utils.book_new()
  const excelSheet = XLSX.utils.aoa_to_sheet(data)
  XLSX.utils.book_append_sheet(excelBook, excelSheet, 'sheet1')
  XLSX.writeFile(excelBook, fileName)
}


interface ExcelStreamParam {
  url: string,
  name: string,
  params: any
}
async function exportExcelByStream (options: ExcelStreamParam) {
  let { url, name, params } = options
  var xhr = new XMLHttpRequest()
  xhr.open('POST', url, true)
  xhr.responseType = 'arraybuffer'
  //发送合适的请求头信息
  xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8')
  xhr.onload = function () {
    // 请求结束后，在此处写处理代码
    if (xhr.status === 200) {
      var blob = new Blob([xhr.response], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
      var url = URL.createObjectURL(blob)
      var link = document.createElement('a')
      link.href = url
      link.download = `${name}.xlsx`
      link.click()
    }
  }
  xhr.send(JSON.stringify(params))
}