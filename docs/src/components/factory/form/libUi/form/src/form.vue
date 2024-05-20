<template>
  <section class="ui-component">
    <el-form
      ref="elFormRef"
      :model="params"
      v-bind="formProps"
      :rules="rules"
    >
      <ui-grid v-bind="gridPropsRef" :style="gridStyle">
        <template v-for="(item, index) in useLabels" :key="index">
          <template v-if="item._visible">
            <ui-grid-item v-bind="item.gridProps">
              <el-form-item
                class="ui-form-item"
                :class="[{ hiddenLabel: Number(item.formItemProps.labelWidth) === 0 }]"
                :label="item.label"
                :prop="item.key"
                v-bind="item.formItemProps"
              >
                <!-- slot title -->
                <template #label>
                  <slot :name="`label-${item.key}`">
                    <span>{{ item.label }}</span>
                  </slot>
                </template>
                <!-- slot form-item-content -->
                <template v-if="item.type === 'slot'">
                  <slot :name="item.slotName || item.key" :item="item"></slot>
                </template>

                <template v-else>
                  <template v-if="!(labelOptions.relation[item.type] && item.options && item.options.length > 0)">
                    <component
                      :is="`${itemPrefix}${item.type}`"
                      v-model="params[item.key]"
                      v-bind="item.props"
                      @input="val => itemChange(val, item)"
                      @change="val => itemChange(val, item)"
                    />
                  </template>
                  <template v-else>
                    <component
                      :is="`${itemPrefix}${item.type}`"
                      v-model="params[item.key]"
                      v-bind="item.props"
                      @change="val => itemChange(val, item)"
                    >
                      <template v-for="(child, ci) in item.options" :key="ci">
                        <template v-if="child.text">
                          <component
                            :is="`${itemPrefix}${item.child?.type || labelOptions.relation[item.type]}`"
                            v-bind="Object.assign(child, child?.props || {})"
                          >
                            <span v-html="child.text"></span>
                          </component>
                        </template>
                        <template v-else>
                          <component
                            :is="`${itemPrefix}${item.child?.type || labelOptions.relation[item.type]}`"
                            v-bind="Object.assign(child, child?.props || {})"
                          />
                        </template>
                      </template>
                    </component>
                  </template>
                </template>
              </el-form-item>
            </ui-grid-item>
          </template>
        </template>
      </ui-grid>
    </el-form>
  </section>
</template>
<script lang="ts" setup>
import {
  computed,
  ComputedRef,
  CSSProperties,
  PropType,
  ref,
  Ref,
  watch
} from 'vue'
import { FormMode } from '../../../typings/items'
import { set, get } from 'lodash-es'

import { UiGrid, UiGridItem } from '../../grid'
import { useVModel } from '@vueuse/core'
import { ChangeOutput, UiFormOptions } from '../types'
import { GridProps } from '../../grid/types'


function isFunction (){
  return false
}
const labelOptions = {
  relation: {
    table: 'table-column',
    select: 'option',
    'checkbox-group': 'checkbox',
    'radio-group': 'radio'
  }
}

const props = defineProps({
  model: { type: Object, default: () => ({}) },
  labels: { type: Array as PropType<FormMode[]>, default: () => [] },
  props: { type: Object, default: () => ({}) },
  options: { type: Object as PropType<UiFormOptions>, default: () => ({}) }
})



const emits = defineEmits(['change'])

defineExpose({
  resetFields,
  validate,
  validateField
})

const elFormRef: Ref<any> = ref()
const itemPrefix = ref('el-')
const params = ref<any>({})
const useModel: Ref<any> = useVModel(props, 'model', emits)
const showlist = ref<any[]>([])

const formProps: ComputedRef<any> = computed(() => {
  return Object.assign({}, {
    labelWidth: '100px'
  }, props.props)
})

const useLabels = ref<any[]>([])
const rules: ComputedRef<any> = computed(() => {
  const useRules = {} as any
  useLabels.value.map((label: FormMode) => {
    let { required } = label.props.formItem||{}
    useRules[label.key] = required?[
      { required: true, message: `${label.label} 是必填项！`, trigger: 'blur' },
      ...(label.props.rule || [])
    ]:(label.props.rule || undefined)
  })
  return useRules
})
watch(() => props.model, () => {
  Promise.resolve().then(() => {
    Object.keys(params.value).map((key: string) => {
      const label = useLabels.value.find((item: any) => item.key === key) || {}
      // 清除插槽的校验
      if (label.type === 'slot' && params.value[key] && Object.keys(params.value[key]).length > 0) {
        validateField(key)
      }
    })
    batchShow()
  })
  setValue(params.value, props.model, props.labels)
}, { immediate: true, deep: true })

watch(() => props.labels, () => {
  showlist.value = []
  useLabels.value = props.labels.map((item: FormMode) => {
    setPlaceholder(item)
    setProps(item)
    const { hasShowFn } = itemShow(item)
    hasShowFn && showlist.value.push(item)
    return item
  })
}, { immediate: true })

function setValue (ari: any, data: any, labels: any[]) {
  labels.map((label: any) => {
    const labelValue = get(data, label.key)
    ari[label.key] = labelValue
  })
}

function setProps (item: FormMode) {
  // grid item
  item.gridProps = Object.assign({}, props.options.gridItem || {
    span: 12
  }, item.props?.gridItem || {})
  // formItemProps
  item.formItemProps = item.props?.formItem || {}
  return item
}

function setPlaceholder (item: FormMode) {
  let placeholder = item.props?.placeholder
  if (!placeholder) {
    switch (true) {
      case ['input'].includes(String(item.type)):
        placeholder = '请输入'
        break
      default:
        placeholder = '请选择'
        break
    }
    set(item, 'props.placeholder', placeholder)
  }
}

// grid
const gridPropsRef = computed<GridProps>(() => props.options.grid || {
  xGap: 10,
  yGap: 5
})

const gridStyle = computed<CSSProperties>(() => {
  return Object.assign({
    alignItems: 'center'
  }, gridPropsRef.value.style || {}) as CSSProperties
})

/**
     * 显示隐藏
     */
function itemShow (item: FormMode) {
  let visible = true
  let hasShowFn = false

  switch (true) {
    case isFunction(item.show):
      visible = true
      hasShowFn = true
      break
    default:
      visible = item.show !== false
      break
  }
  item._visible = visible

  return {
    hasShowFn
  }
}

/**
     * item 值变化
     */
function itemChange (value: any, item: FormMode) {
  const useValue = value?.target ? value.target.value : value
  delete useModel.value[item.key]
  set(useModel.value, item.key, useValue)
  if (isFunction(item.change)) {
    item.change(useValue, useModel.value, item)
  }
  batchShow()
  const result: ChangeOutput = { params: useModel.value, key: item.key, value: useValue }
  emits('change', result)
}

function batchShow () {
  showlist.value.map((i: any) => {
    const useItem = useLabels.value.find((l: any) => l.key === i.key)
    useItem && itemShow(useItem)
  })
}

function validateField (key: string, callback?: any) {
  return elFormRef.value.validateField(key, callback)
}

function resetFields () {
  elFormRef.value.resetFields()
}

function validate () {
  return elFormRef.value.validate()
}

</script>
<style lang="scss" scoped>
.ui-component {
  .el-form {
    &.el-form--label-left {
      .el-form-item__label {
        justify-content: flex-start;
      }
    }
    &.el-form--label-top {
      .el-form-item__label {
        justify-content: flex-start;
      }
    }
    .el-form-item__label {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      line-height: 1.2;
    }
    .el-form-item {
      width: 100%;
      &.hiddenLabel {
        .el-form-item__label {
          display: none;
        }
      }
    }

    .el-radio-group {
      line-height: 28px;

      .el-radio {
        height: 26px;
        line-height: 24px;
        padding: 0 6px;
        margin-right: 12px;
        margin-left: 0px;
      }
    }
  }
}
</style>
