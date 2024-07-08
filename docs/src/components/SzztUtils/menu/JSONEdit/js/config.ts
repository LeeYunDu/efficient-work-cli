// 编辑器模式只展示以下字段
export const SimplificationKey = ['label', 'key', 'type', 'props', 'options']
// 黑名单，props不显示以下字段
export const SimplificationPropKeysBlackList = [
  'isDetail', 'componentType', 'fieldName', 'key', 'options',
  'sort', 'optionType', 'keyConfig', 'props', 'dynamicConfig', 'childrenProps', 'show-all-levels',
  'custom'
]
