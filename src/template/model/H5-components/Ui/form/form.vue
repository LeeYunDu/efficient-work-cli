<template>
  <section class="ui-component ui-form">
    <van-form
      ref="vanFormRef"
      v-model="model"
      v-bind="formProps"
      validate-trigger="onBlur"
      :class="attr.type"
    >
      <template v-for="(item, i) in useGroups" :key="i">
        <template v-if="item.type === 'multiSelect'">
          <div class="multiSelect" @click="onClick(item)">
            <van-field v-model="model[item.key]" :label="item.label" v-bind="item.props">
              <template #input>
                <div v-if="!params[item.key] || params[item.key]?.length === 0" class="placeholder van-field__control">
                  {{ `请选择${item.label}` }}
                </div>
                <div v-else class="pickerList">
                  <div v-for="(p, index) in params[item.key]" :key="p">
                    <van-tag
                      closeable
                      size="large"
                      type="primary"
                      @close="params[item.key].splice(index, 1)"
                    >
                      {{ parseDict(p, item.options || [], item) }}
                    </van-tag>
                  </div>
                </div>
              </template>
            </van-field>
          </div>
        </template>
        <template v-else>
          <template
            v-if="
              ['select', 'cascader', 'treeSelect', 'datetimePicker'].includes(
                item.type
              )
            "
          >
            <template v-if="attr.type === 'inline'">
              <div class="inline-field field-picker" @click="onClick(item)">
                <span class="text" :class="params[item.key] ? 'value' : 'placeholder'">
                  <template v-if="item.type === 'datetimePicker'">
                    {{
                      params[item.key]
                        ? dayjs(new Date(params[item.key])).format(
                          item.props.valueFormat
                        )
                        : item.label
                    }}
                  </template>
                  <template
                    v-if="
                      item.type === 'cascader' || item.type === 'treeSelect'
                    "
                  >
                    {{
                      parseTreeDicts(
                        params[item.key],
                        item.options || [],
                        item
                      ).join('/') || item.label
                    }}
                  </template>
                  <template v-if="item.type === 'select'">
                    {{
                      parseDict(params[item.key], item.options || [], item) ||
                        item.label
                    }}
                  </template>
                </span>
                <img src="@static/images/search/down.png">
              </div>
            </template>
            <van-field
              v-else
              v-model="model[item.key]"
              :name="item.key"
              :label="item.label"
              :class="[
                `labelPosition-${item.props?.labelPosition || attr['label-position']
                }`
              ]"
              is-link
              readonly
              :placeholder="`请选择${item.label}`"
              v-bind="item.props"
              @click="onClick(item)"
            >
              <template #label>
                <slot :name="`${item.key}-label`" v-bind="item">
                  <span>{{ item.label }}</span>
                </slot>
              </template>
              <template
                v-if="[
                  'select',
                  'cascader',
                  'treeSelect',
                  'datetimePicker'
                ].includes(item.type) && Array.isArray(params[item.key])
                  ? params[item.key].length > 0
                  : !!params[item.key]"
                #input
              >
                <template v-if="item.type === 'datetimePicker'">
                  {{
                    params[item.key] &&
                      dayjs(new Date(params[item.key])).format(
                        item.props.valueFormat
                      )
                  }}
                </template>
                <template
                  v-else-if="
                    item.type === 'cascader' || item.type === 'treeSelect'
                  "
                >
                  {{
                    parseTreeDicts(
                      params[item.key],
                      item.options || [],
                      item
                    ).join('/')
                  }}
                </template>
                <template v-else-if="item.type === 'select'">
                  {{ parseDict(params[item.key], item.options || [], item) }}
                </template>
              </template>
            </van-field>
          </template>
          <template v-else-if="item.type === 'search'">
            <van-search v-model="params[item.key]" :placeholder="item.label" />
          </template>
          <template v-else>
            <template v-if="attr.type === 'inline'">
              <div class="inline-field" @click="onClick(item)">
                <span class="text" :class="params[item.key] ? 'value' : 'placeholder'">
                  {{ params[item.key] || item.label }}</span>
              </div>
            </template>
            <van-field
              v-model="params[item.key]"
              :name="item.key"
              :label="item.label"
              :class="[
                `labelPosition-${item.props?.labelPosition || attr['label-position']
                }`
              ]"
              :placeholder="`请填写${item.label}`"
              v-bind="item.props"
              :rules="item.props?.rules?(item.props.required?item.props.rules.concat([{ required: true, message: `请填写${item.label}` }]):item.rules):item.props.required?[{ required: true, message: `请填写${item.label}` }]:[]"
            >
              <template v-if="item.label" #label>
                <slot :name="`${item.key}-label`" v-bind="item">
                  <span>{{ item.label }}</span>
                </slot>
              </template>
              <template v-if="['slot', 'upload'].includes(item.type)" #input>
                <template v-if="item.type === 'slot'">
                  <slot :name="`${item.key}-input`" v-bind="item"></slot>
                </template>
                <template v-else>
                  <ImageUploader v-model:files="params[item.key]" />
                </template>
              </template>
            </van-field>
          </template>
        </template>
      </template>
    </van-form>
  </section>
  <van-popup v-model:show="popup.visible" position="bottom" teleport="body">
    <template v-if="popup.contentType === 'datetimePicker'">
      <van-datetime-picker
        v-if="popup.visible"
        v-model="model[pickerTime.originKey]"
        type="date"
        :title="pickerTime.title || '请选择'"
        v-bind="pickerTime.props"
        @confirm="onTimeConfirm"
        @cancel="onClosePopup"
      />
    </template>
    <template v-else>
      <van-picker
        v-if="popup.visible"
        v-model="model[popup.key]"
        :default-index="picker.options.findIndex(i=>i[picker.customFieldName.value]===model[popup.key])"
        :columns="picker.options"
        :columns-field-names="picker.customFieldName"
        @confirm="onConfirm"
        @cancel="onClosePopup"
      />
    </template>
  </van-popup>
  <tree-select
    v-model:visible="treePopup.visible"
    v-model="params[treePopup.key]"
    :options="treePopup.options"
    :mapper="treePopup.mapper"
  />
</template>
<script lang="ts" setup>
import { computed, useAttrs, ref, watch, Ref, PropType } from 'vue'
import { cloneDeep, get, set } from 'lodash-es'
import dayjs from 'dayjs'
import { useStore } from 'vuex'
import TreeSelect from './treeSelect.vue'
import ImageUploader from '../upload/upload.vue'

const attr = useAttrs()

function useDictOptions (useLabels: any[]) {
  const store = useStore()
  const dictData = computed<any>(() => store.getters.dictData || {})
  const labels = ref<any[]>([])
  initLabels()

  function initLabels () {
    useLabels.map((item: any) => {
      if (!!item.optionsPath) {
        item.options = get(dictData.value, item.optionsPath, [])
      }
    })
    labels.value = useLabels
    return useLabels
  }

  return {
    labels
  }
}

const props = defineProps({
  groups: { type: Array, default: () => [] },
  params: { type: Object, default: () => ({}) },
  formProps: { type: Object, default: () => ({}) },
  options: { type: Object, default: () => ({}) },
  treeMapper: {
    type: Object,
    default: () => ({ text: 'name', value: 'id', children: 'childList' })
  }
})
const emits = defineEmits(['update:params','setParams'])
// const mapper = { text: 'name', value: 'id', children: 'childList' }
const mapper = computed(() => props.treeMapper)
const popup = ref<any>({
  visible: false,
  contentType: ''
})
const picker = ref<any>({
  type: '',
  key: '',
  originKey: '',
  options: [],
  customFieldName: mapper.value
})
const pickerTime = ref<any>({
  key: ''
})
const model: Ref = ref<any>({})
const useGroups = computed<any>(() => {
  props.groups.map((item: any) => {
    if (Array.isArray(item.key)) {
      item.originKey = item.key
      item.key = item.key.join('_')
    } else {
      item.originKey = item.key
    }
  })
  return props.groups
})
useDictOptions(useGroups.value.map((group: any) => group.items || []).flat())
const current = ref()

watch(
  () => props.params,
  () => {
    useGroups.value.map((item: any) => {
      const types = ['select', 'cascader', 'multiSelect', 'datetimePicker']
      if (types.includes(item.type)) {
        if (Array.isArray(item.originKey)) {
          // 是多个key
          const modelValue: any = []
          item.originKey.map((k: string, index: number) => {
            const getValue = get(props.params, k)
            set(modelValue, `[${index}]`, getValue)
          })
          set(model.value, `${item.key}`, modelValue)
        } else {
          // 不是多个key
          let modelValue: any = get(props.params, item.key, '')
          if (Array.isArray(modelValue)) {
            // 数值是数组
            if (item.type === 'multiSelect') {
              // 多选
              modelValue = modelValue.join(',')
            } else {
              modelValue = parseDicts(modelValue, item.options || [], item) || modelValue
            }
          } else if (item.type === 'datetimePicker') {
            modelValue = modelValue ? new Date(modelValue).getTime() : ''
          }
          set(model.value, `${item.key}`, modelValue)
        }
      } else {
        Object.keys(props.params).map(key => {
          set(model.value, `${key}`, get(props.params, key, ''))
        })
      }
    })
  },
  {
    immediate: true,
    deep: true
  }
)
const treePopup = ref({
  visible: false,
  key: '',
  originKey: '',
  options: [],
  mapper: mapper.value
})

function onClick (item: any) {
  current.value = item
  switch (true) {
    case ['treeSelect'].includes(item.type):
      treePopup.value.visible = true
      treePopup.value.originKey = item.originKey
      treePopup.value.key = item.key
      treePopup.value.options = item.options
      break
    case ['select', 'cascader', 'multiSelect'].includes(item.type):
      popup.value.visible = true
      popup.value.contentType = item.type
      popup.value.key = item.key
      picker.value.originKey = item.originKey
      picker.value.key = item.key
      picker.value.options = item.options
      model.value[item.key] = props.params[item.key]
      picker.value.customFieldName = Object.assign(
        {},
        mapper.value,
        props?.options?.mapper,
        item.mapper
      )
      break
    case ['datetimePicker'].includes(item.type):
      popup.value.visible = true
      model.value[item.key] = props.params[item.key]
      popup.value.contentType = item.type
      pickerTime.value.originKey = 'origin_' + item.key
      pickerTime.value.key = item.key
      pickerTime.value.props = item.props || {}
      break
    default:
      break
  }
}

const valueKey = computed(() => picker.value.customFieldName.value)
const textKey = computed(() => picker.value.customFieldName.text)

function onConfirm (value: any) {
  if (current.value.type === 'multiSelect') {
    const realValue = value[valueKey.value]
    const already = model.value[picker.value.key]
      ? model.value[picker.value.key].split(',')
      : []
    already.push(realValue)
    const uniArr = Array.from(new Set(already))
    model.value[picker.value.key] = uniArr.join(',')
  } else if (current.value.type === 'cascader') {
    const values = value.map((item: any) => item[valueKey.value])
    const names = value.map((item: any) => item[textKey.value])
    model.value[picker.value.key] = values

    if (Array.isArray(picker.value.originKey)) {
      picker.value.originKey.map((k: string, index: number) => {
        set(model.value, k, get(values, index))
      })
    } else {
      set(model.value, picker.value.originKey, values)
    }

  } else {
    set(model.value, picker.value.key, value[valueKey.value])
  }
  setParams()
  onClosePopup()
}

function parseTreeDicts (values: any[], options: any[], item?: any) {
  const vk =
    Object.assign(mapper.value, props?.options?.mapper, item?.mapper).value ||
    ''
  const ck =
    Object.assign(mapper.value, props?.options?.mapper, item?.mapper)
      .children || ''
  if (Array.isArray(values) && values.length > 0) {
    const valuesName: any = []
    parseChild(values[0], options, 0)
    function parseChild (value:any, options:any[], index:number) {
      if (index < values.length) {
        const text = parseDict(value, options, item)
        valuesName.push(text)
        const childOptions = options.find((opt:any) => opt[vk] === values[index])?.[
          ck
        ]
        parseChild(values[index + 1], childOptions, index + 1)
      }
    }
    return valuesName
  } else {
    return []
  }
}

function parseDicts (values: any[], options: any[], item?: any) {
  const vk =
    Object.assign(
      mapper.value,
      props?.options?.mapper || {},
      item?.mapper || {}
    ).value || ''
  const tk =
    Object.assign(
      mapper.value,
      props?.options?.mapper || {},
      item?.mapper || {}
    ).text || ''
  return values.map((value: any) => {
    return (options || []).find(opt => opt[vk] === value)?.[tk]
  })
}

function parseDict (value: any, options: any[], item: any) {
  const vk =
    Object.assign(
      mapper.value,
      props?.options?.mapper || {},
      item?.mapper || {}
    ).value || ''
  const tk =
    Object.assign(
      mapper.value,
      props?.options?.mapper || {},
      item?.mapper || {}
    ).text || ''


  return (options || []).find(opt => opt[vk] === value)?.[tk]
}

function onTimeConfirm (value: any) {
  set(model.value, pickerTime.value.originKey, new Date(value).getTime())
  setParams()
  onClosePopup()
}
function setParams () {
  const paramsObj = cloneDeep(props.params)
  useGroups.value.map((item: any) => {
    const types = ['select', 'cascader', 'multiSelect', 'datetimePicker']
    if (types.includes(item.type)) {
      if (Array.isArray(item.originKey)) {
        const modelValue: any = []
        item.originKey.map((k: string, index: number) => {
          const getValue = get(model.value, k)
          set(modelValue, `[${index}]`, getValue)
        })
        set(paramsObj, `${item.key}`, modelValue)
      } else {
        let modelValue: any = get(model.value, item.key, '')
        if (item.type === 'multiSelect' || item.type === 'cascader') {
          modelValue = modelValue && modelValue.split(',')
          set(paramsObj, `${item.key}`, modelValue)
        }
        if (item.type === 'datetimePicker' && pickerTime.value.originKey) {
          modelValue = get(model.value, pickerTime.value.originKey, '')
          set(
            paramsObj,
            `${pickerTime.value.originKey.split('_')[1]}`,
            modelValue
          )
        }
        if (item.type === 'select') {
          set(paramsObj, `${item.key}`, modelValue)
        }
      }
    }
  })

  emits('update:params', paramsObj)
  emits('setParams',paramsObj)
}
function onClosePopup () {
  popup.value.visible = false
}

const vanFormRef: any = ref(null)

async function validate () {
  try {
    await vanFormRef.value.validate()
    return true
  } catch {
    return false
  }
}

defineExpose({
  validate
})
</script>
<style lang="scss" scoped>
.ui-form {
  background-color: #fff;

  :deep {

    .van-field__label--required::before,
    .van-field__error-message {
      color: $red;
    }

    &.van-cell-group:last-child {
      margin-bottom: 0;
    }

    .multiSelect {
      .placeholder {
        color: $primary-color-placeholder;
      }

      .pickerList>div {
        margin-bottom: 5px;
      }
    }

    div.labelPosition-top {
      display: flex;
      flex-direction: column;
      position: relative;

      .van-field__label {
        max-width: 100%;
        width: 100% !important;
        margin-bottom: 6px;
      }

      .van-badge__wrapper {
        position: absolute;
        right: 15px;
        bottom: 10px;
      }
    }
  }

  .inline {
    display: flex;
    justify-content: space-around;
    align-items: center;

    .inline-field {
      padding: 5px 15px;
      margin: 5px;
      flex: 1;
      text-align: center;
      display: flex;
      justify-content: center;
      align-items: center;

      &:not(:last-child) {
        position: relative;

        &:after {
          content: '';
          position: absolute;
          width: 0;
          right: -5px;
          height: 60%;
          top: 20%;
        }
      }

      img {
        width: 8px;
      }

      .text {
        display: inline-block;
        margin-right: 5px;

        &.placeholder {
          color: #c8c9cc;
        }

        @include ellipsisMultiline(1);
      }

      &.field-picker {}
    }
  }
}
</style>
