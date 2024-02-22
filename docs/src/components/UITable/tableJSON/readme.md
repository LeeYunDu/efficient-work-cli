# 表格JSON
## 使用说明
ui-table 的字段JSON定义模版,如有数值转换字段，需要配合[函数transformTableData](#数值转化函数)使用

## 示例

数据异步请求
``` ts
const asyncData = async () => {
  const params: any = Object.assign({}, curParams.value || {})
  const { status, msg, data } = await ApiName(params)
  if (!(status === 200)) return ElMessage.error(msg)
  // 数值转化
  state.data= transformTableData(tableColumn(),get(data || {}, 'list', []))
  state.total = data?.total || 0
}
```
表格列JSON定义
``` ts
import { FieldItem, FormMode, ItemMode } from '@/typings/items'
import store from '@/store'
import { get } from 'lodash-es'
import { computed } from 'vue'
const dictData = computed(() => store.getters.dictData).value

export const tableColumn = (params: any): FieldItem[] => {
  [
    { label: '序号',  key: 'index',  props: { width: '80px'  } },
    { label: '文本字段', key: 'y1', },
    { label: '字典字段', key: 'chooseType12Name', transform: '12.dist' },
    { label: '时间字段', key: 'y3', transform: '{y}-{m}-{d}' },
    { label: '插槽字段', key: 'y4', type: 'slot',  slotName: 'msg' },
    {
        label: '函数字段',
        key: 'y5',
        transform: (data: any) => {
          return data == 0 ? '否' : '是'
        }
      },  
    {
      label: '操作',
      key:'action'
      type: 'slot',
      slotName: 'action',
      props: {
        width: '210px',
      },
    },
  ]
}

export const sortOptions = [
  { label: '按签约时间升序', value: 'signTime+' },
  { label: '按签约时间降序', value: 'signTime-' },
  { label: '按更新时间升序', value: 'modifyTime+' },
  { label: '按更新时间降序', value: 'modifyTime-' },
  { label: '按创建时间升序', value: 'createTime+' },
  { label: '按创建时间降序', value: 'createTime-' },
]
```

## 数值转化函数

``` ts

// 表格数据转化
export function transformTableData (fields: FieldItem[], data: any) {
  const needTransField = fields.filter((field: FieldItem) => {
    return field.transform
  })

  needTransField.forEach((field: FieldItem) => {
    const { transform, key, unit } = field
    let type = ''
    switch (true) {
      case isFunction(transform):
        type = 'function'
        break
      case (transform.indexOf('x') > -1 || (transform.indexOf('{') > -1 && transform.indexOf('}') > -1)):
        type = 'time'
        break
      case ((transform.indexOf('.list') > -1) || transform.indexOf('.tree') > -1):
        type = 'dict'
        break
    }
    data.map((e: any) => {
      switch (type) {
        case 'time':
          e[key] = parseTime(new Date(get(e, key, '')), transform) + (unit || '')
          break
        case 'dict':
          if (key.indexOf('Name') > -1 && key.indexOf('chooseType') > -1) {
            const valueKey = key.slice(0, key.indexOf('Name'))
            e[key] = getDictValue(transform, get(e, valueKey, '')) + (unit || '')
          } else {
            e[key] = getDictValue(transform, get(e, key, '')) + (unit || '')
          }
          break
        case 'function':
          e[key] = transform(get(e, key, ''), e)
        default:
          e[key] = get(e, key, '') + (unit || '')
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


// 字典值转换
export function getDictValue (target: any, value: any, valueKey?: string) {
  value = +value
  if (!value && !String(value)) return value
  return store.getters.dictDataOnly(target)?.find((dict: any) => +dict[valueKey || 'id'] === value)?.name || value
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



```