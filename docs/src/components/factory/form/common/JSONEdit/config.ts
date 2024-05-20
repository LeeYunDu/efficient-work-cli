// 编辑器模式只展示以下字段
export const SimplificationKey = ['label', 'key', 'type', 'props', 'testFunction', 'testFunction2']
// 黑名单，props不显示以下字段
export const SimplificationPropKeysBlackList = [
  'isDetail', 'componentType', 'fieldName', 'key', 'options',
  'sort', 'optionType', 'keyConfig', 'props', 'dynamicConfig', 'childrenProps', 'show-all-levels'
]



export const editModelType = [
  { label: '编辑器模式', key: 'simplification' },
  { label: 'JSON模式', key: 'json' },
  { label: '详情模式', key: 'detail' },
]
