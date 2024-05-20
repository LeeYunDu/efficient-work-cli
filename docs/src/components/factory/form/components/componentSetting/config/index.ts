export const componentTypeOptions = [
  {
    label: 'UI-Form内部组件', options: [
      { label: '表单操作按钮组', value: 'operate', attr: { componentType: 99 } },
    ]
  },
  {
    label: '输入字段', options: [
      { label: '文本', value: 'input-text', attr: { componentType: 6, type: 'text' } },
      { label: '单行输入框', value: 'input', attr: { componentType: 7 } },
      { label: '多行文本', value: 'input-textarea', attr: { componentType: 7, type: 'textarea' } },
      { label: '密码', value: 'input-password', attr: { componentType: 7, type: 'password' } },
      { label: '计数器', value: 'input-number', attr: { componentType: 24 } },
    ]
  },
  {
    label: '选择字段', options: [
      { label: '下拉选择器', value: 'select', attr: { componentType: 8 } },
      { label: '级联选择器', value: 'cascader', attr: { componentType: 9 } },
      { label: '树型结构选择器', disabled: true, value: 'tree', attr: { componentType: 8, type: 'tree' } },
      { label: '多选框', value: 'checkbox-group', attr: { componentType: 10 } },
      { label: '单选框', value: 'radio-group', attr: { componentType: 11 } },
      { label: '开关', value: 'switch', attr: { componentType: 12 } },
    ]
  },
  {
    label: '日期时间字段', options: [
      { label: '年', value: 'datePicker-year', attr: { componentType: 13, type: 'year' } },
      { label: '月', value: 'datePicker-month', attr: { componentType: 13, type: 'month' } },
      { label: '日', value: 'datePicker-day', attr: { componentType: 13, type: 'day' } },
      { label: '周', value: 'datePicker-week', attr: { componentType: 13, type: 'week' } },
      { label: '日期默认', value: 'datePicker-date', attr: { componentType: 13 } },
      // { label: '时间', value: 'timePicker', attr: { componentType: 12, type: 'year' } },
      { label: '日期时间', value: 'datePicker-datetime', attr: { componentType: 13, type: 'datetime' } },
      { label: '时间范围', value: 'datePicker-datetimerange', attr: { componentType: 13, type: 'datetimerange' } },
    ]
  },
  {
    label: '上传字段', options: [
      { label: '上传', value: 'upload', attr: { componentType: 99 } },
    ]
  },
  {
    label: '其他', options: [
      { label: '插槽', value: 'slot', attr: { componentType: 99 } },
      { label: '评分', value: 'rate', attr: { componentType: 14 } },
      { label: '滑块', value: 'slider', attr: { componentType: 15 } },
      // { label: '标签', value: 'tag', attr: { componentType: 16 } },
      // { label: '颜色选择器', value: 'colorPicker', attr: { componentType: 18 } },
    ]
  },
]
