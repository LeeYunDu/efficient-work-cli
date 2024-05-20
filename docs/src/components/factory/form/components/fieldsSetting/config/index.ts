// 组件类型配置


// e6: 'text',
// e7: 'input',
// e8: 'select',
// e9: 'cascader',
// e10: 'checkbox-group',
// e11: 'radio-group',
// e12: 'switch',
// e13: 'datePicker',
// e14: 'rate',
// e15: 'slider',
// e16: 'tag',
// e17: 'image',
// e18: 'colorPicker',
// e20: 'slot',
// e24: 'input-number',
// e99: 'slot'

/**
 * componentType 对应 menu 表中的组件类型
 * 下面的组件选择,又细分到了type  比如  <el-input  type='number'></el-input>
 * 此时又得添加一个字段做拓展,于是定义 attr 来存储一些自定义属性, 其中 componentType 必须要有。
 */

export const componentTypeOptions = [
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


// 正则校验配置
export const ruleOptions = [
  { label: '手机号校验', value: 'checkMobile' },
  { label: '邮箱校验', value: 'checkEmail' },
  { label: '身份证号校验', value: 'checkIdCard' },
  { label: '整数校验', value: 'checkInteger' },
  { label: '数值类型校验', value: 'checkNumber' },
]


// 表单标签摆放位置
export const labelPositionOptions = [
  { label: '左', value: 'left' },
  { label: '上', value: 'top' },
  { label: '右', value: 'right' },
]


export const otherComponentOptions: any = {
  'rate': {
    max: 5,
    'show-text': false,
    texts: ['极差', '失望', '一般', '满意', '惊喜'],
    'show-score': false,
    colors: ['#F7BA2A', '#F7BA2A', '#F7BA2A']
  },
  'slider': {
    max: 100,
    min: 0,
    step: '',
    'show-stops': false,
    'show-input': false,
    'range': false,

  }
}






export const quickEditFields = [
  { label: '字段名称', key: 'name' },
  { label: '字段key', key: 'key' },
  { label: '排序', key: 'orderNum' },
]
