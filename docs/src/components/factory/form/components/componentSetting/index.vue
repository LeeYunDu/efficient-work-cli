<template>
  <div class="component-list">
    <div v-for="(group, gIndex) in componentTypeOptions" :key="gIndex" class="component-group" :label="group.label">
      <div class="group-title"> {{ group.label }} </div>
      <div class="component-options">
        <template v-for="(option, oInedx) in group.options" :key="oInedx">
          <div class="component-item" :class="{
      gray: option.disabled
    }" @click="onClick(option)">
            <div class="main">{{ option.label }}</div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { MenuMode } from '@/typings/data'
import { cloneDeep, set } from 'lodash-es'
import { ComponentOption } from 'static/lib/group-content/index'
import { PropType } from 'vue'
import { FormComponentOptions } from './types/model'
import { componentTypeOptions } from './config/index'
import { get } from 'lodash-es'

let props = defineProps({
  componentOption: {
    type: Object as PropType<ComponentOption>,
    default: () => ({})
  },
})


const emits = defineEmits(['createFields', 'update'])

/**
 * 新增字段
 * @param option
 */
function onClick (componentItem) {
  let { attr, disabled } = componentItem
  if (disabled) return
  let fields = createFields(componentItem)
  onAddFields(fields)
}

function createFields (componentItem): MenuMode {
  let { attr, disabled, label } = componentItem

  // componentType的枚举 跟 menu表的字段对应
  let componentType = attr.componentType
  let type = get(attr, 'type', '')
  let id = Math.floor(Math.random() * 10001)

  // 在这里可以根据type类型,获取一些组件的初始化属性
  let initOption: any = {

    formItem: { required: false },
    gridItem: {},
  }
  addPropsOption(initOption, componentItem)
  if (type) {
    initOption.type = type
  }
  let fields: MenuMode = {
    'sid': id,
    'id': id,
    'name': label,
    'label': label,
    'key': 'y' + (Math.random() * 100).toFixed(0),
    'menuType': 5, // 表示字段
    'menuModule': '',
    'hidden': 1,
    'parentId': '',
    'orderNum': 99,
    'path': '#',
    'link': '#',
    'component': '#',
    'componentConfigId': '',
    'pageLoadType': 1,
    'pageType': 1,
    'componentType': componentType, // 组件类型
    'icon': '',
    'projectId': '',
    options: JSON.stringify({
      'hiddenSide': 0,
      'hiddenHeader': 0,
      'fieldConf': {
        'open': 1, 'transform': [{}],
        'props': [
          { 'type': 'props', 'option': initOption }
        ]
      },
      'btnConf': { 'open': 0 }
    }
    ),
    'picture': '',
    'remark': '',
    'creater': '',
    'delete': 0,
    'source': 'page-view'
  }
  return fields
}


function addPropsOption (option, componentItem) {
  let { attr, disabled, label } = componentItem
  let componentType = attr.componentType
  switch (Number(componentType)) {
    // 输入框
    case 7:
      let obj1 = {
        clearable: true,
        placeholder: `请输入${label}`,
      }
      if (attr.type == 'textarea') {
        set(obj1, 'maxlength', 500)
        set(obj1, 'show-word-limit', true)
        set(obj1, 'rows', 5)
      }
      Object.assign(option, obj1)
      break;
    // 选择器
    case 8:
    case 9:
    case 10:
    case 11:
      let obj2 = {
        clearable: true,
        placeholder: `请选择${label}`,
      }

      if (componentType == 11) {
        set(obj2, 'child', { type: 'radio' })
      }

      Object.assign(option, obj2)
      break
    // 日期选择器
    case 13:
      let object = {
        'value-format': 'x',
        clearable: true,
      }
      if (attr.type == 'datetimerange') {
        object['start-placeholder'] = '开始时间'
        object['end-placeholder'] = '结束时间'
      }
      Object.assign(option, object)
      break
    default:
      break;
  }
}









/**
 * 新增字段
 * @param fields
 */
function onAddFields (fields: MenuMode) {
  let deepComponentOption = props.componentOption
  let options: FormComponentOptions = deepComponentOption.options as FormComponentOptions
  let labels = options.component.labels
  labels.push(fields)
  emits('update', deepComponentOption)
}

</script>
<style lang="scss" scoped>
.component-list {
  display: flex;
  flex-direction: column;

  .component-group {
    .group-title {
      margin-bottom: 4px;
      color: #2c3e50;
      font-size: 14px;
    }

    .component-options {
      display: flex;
      flex-wrap: wrap;
      margin-left: -4px;
      margin-right: -4px;

      .component-item {
        width: 50%;

        text-align: center;
        height: 30px;
        line-height: 30px;
        padding: 4px;
        margin-bottom: 8px;
        cursor: pointer;

        &.gray {
          cursor: not-allowed;
        }

        .main {
          background: #f4f6fc;
          border: 1px solid #f4f6fc;
          color: #333;
          font-size: 12px;

          &:hover {
            color: #409eff;
            border: 1px dashed #409eff;
          }
        }
      }
    }

    & ~ .component-group {
      margin-top: 15px;
    }
  }
}
</style>
