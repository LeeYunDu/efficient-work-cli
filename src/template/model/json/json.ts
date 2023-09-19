// import { FieldItem, FormMode, ItemMode } from '@/typings/items'

/**
 * common
 */
export const tableQueryFormFields: FormMode[] = [
  { label: '场景名称', key: 'name', type: 'input', },
  {
    label: '场景类型', key: 'key2', type: 'select', options: [
      { label: '选项1', value: 'valaue1', tValue: 'valuet1' }
    ]
  },
  { label: '发布部门', key: 'key3', type: 'input', },
  {
    label: '发布时间', key: 'key4', type: 'datePicker', props: {
      'value-format': 'x'
    }
  },
]

export const tableQueryFormOptions = {
  labels: tableQueryFormFields,
  props: {
    inline: true,
    labelWidth: '80px',
    rules: []
  },
  options: {
    gridItem: { span: 5 }
  }
}

export const tableColumn: FieldItem[] = [
  {
    label: '序号',
    key: 'index',
    props: {
      width: '80px'
    }
  },
  { label: '字段1', key: 'deptType', },
  { label: '字典字段2', key: 'deptName_t', transform: '1.dist' },
  { label: '时间字段3', key: 'hadFinished_t', transform: '{y}-{m}-{d}' },
  {
    label: '系统推送',
    key: 'key9',
    type: 'slot',
    slotName: 'msg',
  },
  {
    label: '操作',
    key: 'hadFinishedRate',
    type: 'slot',
    slotName: 'action',
    props: {
      width: '210px',
    },
  },
]

export const formFields: FormMode[] = [
  {
    label: '标题带字数限制', key: 'title', type: 'input',
    props: {
      gridItem: { span: 12 },
      formItem: { required: true },
      clearable: true,
      maxlength: 30,
      'show-word-limit': true,
      placeholder: '请输入标题,限30字内',
    },
  },
  {
    label: '选择器', key: 'y1', type: 'select', options: dictData['dict_1'], props: {
      gridItem: { span: 12 },
      clearable: true,
      formItem: { required: true, }
    },
  },
  {
    label: '数字带单位', key: 'y1', type: 'input',
    props: {
      clearable: true, gridItem: { span: 12 }, min: 0, type: 'number', 'suffix': '㎡', formItem: { required: true, }
    },
  },
  {
    label: '正则表达式', key: 'y2', type: 'input',
    props: {
      clearable: true, gridItem: { span: 12 }, formItem: { required: false, },
      rules: [
        { validator: checkLinkWay, trigger: 'blur' }
      ]
    },
  },
  {
    label: '单选框', key: 'isApply', type: 'radio-group', options: [
      { text: '需要报名', label: 0 },
      { text: '无需报名', label: 1 },
    ] as any,
    props: {
      formItem: { required: true, }
    },
    child: { type: 'radio' }
  },
  {
    label: '时间范围选择器', key: 'activityTimeGroup', type: 'datePicker', props: {
      'value-format': 'x',
      clearable: true,
      type: 'datetimerange',
      formItem: { required: true, },
      startPlaceholder: '活动开始时间',
      endPlaceholder: '活动结束时间',
      gridItem: {
        span: 13
      }
    }
  },
  {
    label: '富文本编辑器', key: 'content', type: 'slot', slotName: 'content', options: [
    ] as any,
    props: {
      clearable: true,
      formItem: { required: false, }
    },
  },
  {
    label: '图片', key: 'map', type: 'slot', slotName: 'upload',
    props: {
      formItem: { required: true, },
      size: 2 * 1024,
      limit: 5,
      tip: '支持JPG / PNG，建议800*600,最多上传5张，单张限2M内',
      accept: ['jpg', 'png', 'jpeg']
    },
  },
  {
    label: '视频', key: 'video', type: 'slot', slotName: 'upload',
    props: {
      formItem: { required: false, },
      size: 100 * 1024,
      limit: 3,
      tip: '支持各种格式，视频限100M内',
      accept: ['mp4', 'avi', 'mov', 'wmv', 'flv', 'webm', 'mpeg']
    },
  },
  {
    label: '地图坐标拾取', key: 'key6', type: 'slot', slotName: 'map',
    props: {
      formItem: { required: false, },
    },
  },
  { label: '', key: 'key6', type: 'slot', slotName: 'btns' },
]

export const addFormOptions = {
  labels: formFields,
  props: {
    rules: []
  },
  options: {
    gridItem: { span: 24 }
  }
}

export const detailFields: ItemMode[] = [
  { label: '场景类型', key: '' },
  { label: '发布时间', key: '' },
  { label: '响应截止时间', key: '' },
  { label: '联系人', key: '' },
  { label: '联系电话', key: '' },
  { label: '联系地址', key: '' },
]