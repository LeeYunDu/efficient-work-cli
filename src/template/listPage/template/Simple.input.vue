<template>
  <section class="simple-input" :class="{ inline: inline }">
    <div v-if="label" class="label">
      <span>{{ label }}</span>
    </div>
    <template v-if="!isSlot">
      <template v-if="type === 'select'">
        <el-select
          v-model="selectValue"
          size="large"
          v-bind="$attrs"
          :placeholder="placeholder"
          @change="onSelectChange"
        >
          <el-option
            v-for="item in selectOption"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </template>
      <template v-if="type === 'input'">
        <el-input
          size="large"
          v-bind="$attrs"
          :placeholder="placeholder"
        >
          <template v-for="( slot, slotKey ) in $slots" #[slotKey]>
            <slot :name="slotKey"></slot>
          </template>
        </el-input>
      </template>
      <template v-if="type === 'textarea'">
        <el-input
          size="large"
          v-bind="$attrs"
          :placeholder="placeholder"
          type="textarea"
        >
          <template v-for="( slot, slotKey ) in $slots" #[slotKey]>
            <slot :name="slotKey"></slot>
          </template>
        </el-input>
      </template>
      <template v-if="type === 'date'">
        <el-date-picker
          size="large"
          v-bind="$attrs"
          :type="$attrs['date-type'] ? $attrs['date-type'] : 'date'"
          :value-format="$attrs['value-format'] ? $attrs['value-format'] : 'x'"
          style="width: 100%"
          :placeholder="placeholder"
          range-separator="-"
          :start-placeholder="$attrs['date-type'] === 'daterange' && '开始时间'"
          :end-placeholder="$attrs['date-type'] === 'daterange' && '结束时间'"
        />
      </template>
      <template v-if="type === 'radio'">
        <el-radio-group v-bind="$attrs" clearable style="width: 100%">
          <el-radio
            v-for="item in selectOption"
            :key="item.value"
            :label="item.value"
            size="large"
          >
            {{ item.label }}
          </el-radio>
        </el-radio-group>
      </template>
    </template>

    <template v-else>
      <slot
        :name="slotKey"
        v-bind="$attrs"
      ></slot>
    </template>
  </section>
</template>

<script setup>
import { ref, computed, useAttrs, useSlots, unref } from 'vue'
import { isString, isNumber,size } from 'lodash-es'
import { useStore } from 'vuex'

const props = defineProps({
  options: { type: [Array,String,Object], default: () => ([]) },
  defaultValue: { type: [Number,String], default: '' },
  label: { type: String, default: '' },
  inline: { type: Boolean, default: false },
  optionWhiteList: { type: Array, default: () => ([]) },
  labelWidth: { type: [Number,String], default: '' },
  type: { type: String, default: 'input' },
  slotKey: { type: String, default: '' }
})

const store = useStore()

const attrs =  useAttrs()

const slots =  useSlots()


const emits = defineEmits(['selectChange'])
// -------- inject --------

// -------- ref --------

// -------- computed --------
const defaultValue = computed(() => props.defaultValue || '')

const selectOption = computed(() => {
  let options = []

  const typeOf = value => Object.prototype.toString.call(value)

  const optionsType = typeOf(props.options)

  if (optionsType === '[object Array]') {
    options = props.options
  }

  if (optionsType === '[object String]') {
    options =  store.getters.dictDataOnly(props.options)?.map(item => ({
      label: item.name,
      value: item.id
    })) || []
  }

  // 对象需另外配置渲染的label和value
  if (optionsType === '[object Object]') {
    const { target, labelKey = 'name',valueKey } = props.options

    if (!(target && labelKey && valueKey)) return []

    const targetData = typeOf(target) === '[object String]' ? store.getters.dictDataOnly(target) : target

    options = targetData.map(item => ({
      label: item[labelKey],
      value: item[valueKey]
    })) || []
  }

  if (!size(options)) return []

  if (!size(props.optionWhiteList)) return options

  options = options.filter(item => props.optionWhiteList.includes(item.value))

  return options
})

const labelWidth = computed(() => {
  const transitionRem = value => (+value / 192) + 'rem'

  if (!props.labelWidth) return transitionRem(100) // 默认值

  if (isNumber(props.labelWidth)) return transitionRem(props.labelWidth)

  if (isString(props.labelWidth) && props.labelWidth.indexOf('px') !== -1) {
    const num = props.labelWidth.replace('px', '')
    return transitionRem(num)
  }

  return transitionRem(props.labelWidth)
})

const placeholder = computed(() => {
  if (props.label && !('placeholder' in attrs)) return [
    'select',
  ].includes(props.type) ? `请选择${props.label}` : `请输入${props.label}`
  return attrs.placeholder || ''
})

const isSlot = computed(() => Object.keys(slots).includes(props.slotKey))
// -------- fn --------
const selectValue = ref(defaultValue.value)


function onSelectChange (value) {
  const cur = selectOption.value.find(item => item.value === value)
  emits('selectChange', cur)
}

// -------- watch --------

// -------- init --------

// -------- provide --------

// -------- expose --------
</script>

<style lang="scss" scoped>
.simple-input {
  width: 100%;

  &.inline {
    display: flex;
    align-items: center;

    .label {
      display: block;
      width: v-bind(labelWidth);
      flex-shrink: 0;
      margin-bottom: initial;
    }

    ::v-deep(.el-select) {
      flex: 1;
    }

  }

  .label {
    //width: v-bind(labelWidth);
    margin-bottom: 10px;
    > span {
      font-size: 19px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: rgba(0,0,0,0.9);
    }
  }
  ::v-deep(.el-select) {
    width: 100%;
    .el-input__inner {
    }
  }
  ::v-deep(.el-input) {
    width: 100%;
    .el-input__wrapper {
      width: 100%;
    }
  }
}
</style>
