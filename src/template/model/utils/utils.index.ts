import { get, isFunction, isArray } from 'lodash-es'
function getValue (data, field) {
  let uValue: any = '-'
  try {
    switch (true) {
      case field.format && isFunction(field.format):
        uValue = field.format(data, field)
        break
      case !!field.valueFormat:
        uValue = getDictValue(field.valueFormat, get(data, field.key, '-'))
        break
      case !!field.parseTime:
        uValue = get(data, field.key, '') ? parseTime(new Date(get(data, field.key, '')), field.parseTime) : '-'
        break
      case isArray(field.key):
        uValue = field.key.map((item: string) => get(data, item, '-')).join(field.split || ' - ')
        break
      default:
        uValue = get(data, field.key, '-') + (field.unit || '')
        break
    }
    if (field.unit) {
      // uValue = uValue + field.unit
    }
  } catch (error) {

  }
  return uValue
}
/**
 * 时间转换
 */
export function parseTime (time: string | number | Date, cFormat?: string) {
  if (!time) {
    return ''
  }
  if (arguments.length === 0) {
    return null
  }

  if ((time + '').length === 10) {
    time = +time * 1000
  }

  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    date = new Date(parseInt(String(time)))
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  } as any
  const timeStr = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result: any, key: string | number) => {
    let value = formatObj[key]
    if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1]
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return timeStr
}

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
    const { transform, key, unit } = field
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
          e[key] = parseTime(new Date(e[tKey]), transform) + (unit || '')
          break
        case 'dict':
          e[key] = getDictValue(transform, e[tKey]) + (unit || '')
          break
        case 'function':
          e[key] = transform(e[key])
        default:
          e[key] = e[key] ?? '-' + (unit || '')
          break
      }
      if (unit) {
        e[key] = e[key]
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



export function getImage (item, key = 'pic', single = true) {
  let pic = item[key]
  if (pic) {
    let { VITE_FILE_PATH } = import.meta.env
    try {
      let f = JSON.parse(pic)
      if (single) {
        return VITE_FILE_PATH + f[0].url
      } else {
        return f.map(e => {
          e.url = VITE_FILE_PATH + e.url
          return e
        })
      }
    } catch (error) {
      return ''
    }
  } else {
    return ''
  }
}



function exportPDFByStream () {
  let params = {

  }
  let url = apiUrl()
  var xhr = new XMLHttpRequest()
  xhr.open('POST', url, true)
  xhr.responseType = 'arraybuffer'
  //发送合适的请求头信息
  xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8')
  xhr.onload = function () {
    // 请求结束后，在此处写处理代码
    if (xhr.status === 200) {
      var blob = new Blob([xhr.response], { type: 'application/pdf' })
      var url2 = URL.createObjectURL(blob)
      var link = document.createElement('a')
      link.href = url2
      window.open(url2)
      link.download = '测试用例.pdf'
      link.click()
    }
  }
  xhr.send(JSON.stringify(params))
}

// 输入地址获取地图上的经纬度
export function getLngLat (address) {
  return new Promise((resolve, reject) => {
    if (address.indexOf('|' !== -1)) {
      address = address.split('|')[0]
    }

    AMap.plugin('AMap.Geocoder', function () {
      const geocoder = new AMap.Geocoder({
        apiKey: '4de45b8fff6ae93a940c6e813092045f',
        city: '杭州' // 城市设为杭州，默认：“全国”
      })

      geocoder.getLocation(address, (status, result) => {
        if (status === 'complete' && result.geocodes.length) {
          const lnglat = result.geocodes[0].location
          resolve(lnglat)
        }
      })
    })
  })
}
