// 编辑器模式只展示以下字段
export const SimplificationKey = ['label', 'key', 'type', 'props', 'options', 'optionsSource']
// 黑名单，props不显示以下字段
export const SimplificationPropKeysBlackList = [
  'isDetail', 'componentType', 'fieldName', 'key', 'options',
  'sort', 'optionType', 'keyConfig', 'props', 'dynamicConfig', 'childrenProps', 'show-all-levels',
  'custom'
]


export const componentTypeOptions = [
  // 输入字段
  { label: '文本', value: 'input', attr: { componentType: 7, type: 'text' } },
  { label: '单行输入框', value: 'input', attr: { componentType: 7 } },
  { label: '多行文本', value: 'input', attr: { componentType: 7, type: 'textarea' } },
  { label: '密码', value: 'input', attr: { componentType: 7, type: 'password' } },
  { label: '计数器', value: 'input-number', attr: { componentType: 24 } },
  // 选择字段
  { label: '下拉选择器', value: 'select', attr: { componentType: 8 } },
  { label: '级联选择器', value: 'cascader', attr: { componentType: 9 } },
  { label: '树型结构选择器', disabled: true, value: 'tree', attr: { componentType: 8, type: 'tree' } },
  { label: '多选框', value: 'checkbox-group', attr: { componentType: 10 } },
  { label: '单选框', value: 'radio-group', attr: { componentType: 11 } },
  { label: '开关', value: 'switch', attr: { componentType: 12 } },
  // 日期时间字段
  { label: '年', value: 'datePicker', attr: { componentType: 13, type: 'year' } },
  { label: '月', value: 'datePicker', attr: { componentType: 13, type: 'month' } },
  { label: '日', value: 'datePicker', attr: { componentType: 13, type: 'day' } },
  { label: '周', value: 'datePicker', attr: { componentType: 13, type: 'week' } },
  { label: '日期默认', value: 'datePicker', attr: { componentType: 13 } },
  { label: '日期时间', value: 'datePicker', attr: { componentType: 13, type: 'datetime' } },
  { label: '时间范围', value: 'datePicker', attr: { componentType: 13, type: 'datetimerange' } },
  // 其他
  { label: '插槽', value: 'slot', attr: { componentType: 20 } },
  { label: '评分', value: 'rate', attr: { componentType: 14 } },
  { label: '滑块', value: 'slider', attr: { componentType: 15 } },
]