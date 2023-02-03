export const tableColumns = [
  {
    label: '序号',
    key: 'index',
  },
  {
    label: '基本字段',
    key: 'y1',
    width: 100
  },
  {
    label: '字典字段',
    key: 'y2',
    formatType: 'dict',
    valueFormat: '15.dist'
  },
  {
    label: '时间字段',
    key: 'y3',
    formatType: 'time',
    valueFormat: '{y}-{m}-{d}'
  },
  {
    label: '插槽字段',
    key: 'y4',
    className: 'custom-class-name',
    slot: 'slotName',
  },
  {
    label: '操作',
    width: '120',
    slot: 'action',
    btns: [
      {
        label: '查看',
        key: 'detail'
      },
      {
        label: '修改',
        key: 'edit'
      },
      {
        label: '删除',
        key: 'delete'
      }
    ]
  }
]
export const formFields = [
  {
    label: '文本字段',
    key: 'name',
    inputType: 'input',
    span: 24,
    require: true
  },
  {
    label: '文件添加单位',
    key: 'y9',
    inputType: 'input',
    span: 12,
    require: true,
    inputUnit: '㎡'
  },
  {
    label: '文本域字段',
    key: 'content',
    inputType: 'input',
    type: 'textarea',
    span: 24,
    require: true,
    rows: 5,
    resize: 'none',
    maxlength: 200
  },
  {
    label: '下拉选项字段',
    key: 'y1',
    inputType: 'select',
    options: '4.list'
  },
  {
    label: '时间字段',
    key: 'y2',
    inputType: 'date',
    type: 'month',
    span: 24,
    require: true,
    valueFormat: 'YYYYMM'
  },
  {
    label: '数字字段',
    key: 'y3',
    inputType: 'input',
    type: 'number',
    span: 24,
    require: true,
    resize: 'none'
  },
  {
    label: '插槽字段',
    key: 'slotField',
    slotKey: 'slotName'
  },
]
export const detailFields = [
  {
    label: '序号',
    key: 'index',
  },
  {
    label: '基本字段',
    key: 'y1',
    width: 100
  },
  {
    label: '字典字段',
    key: 'y2',
    formatType: 'dict',
    valueFormat: '15.dist'
  },
  {
    label: '时间字段',
    key: 'y3',
    formatType: 'time',
    valueFormat: '{y}-{m}-{d}'
  },
  {
    label: '插槽字段',
    key: 'y4',
    className: 'custom-class-name',
    slot: 'slotName',
  },
  {
    label: '操作',
    width: '120',
    slot: 'action',
    btns: [
      {
        label: '查看',
        key: 'detail'
      },
      {
        label: '修改',
        key: 'edit'
      },
      {
        label: '删除',
        key: 'delete'
      }
    ]
  }
]