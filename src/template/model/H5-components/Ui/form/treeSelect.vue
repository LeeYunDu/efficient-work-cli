<template>
  <section class="popup_mask">
    <van-popup v-model:show="show" round position="bottom">
      <van-cascader
        v-if="show"
        v-model="cascaderValue"
        title="请选择部门"
        :field-names="{
          text: labelKey,
          value: valueKey,
          children: childrenKey
        }"
        :options="optionList"
        active-color="#488DEC"
        @close="show = false"
        @change="onChange"
        @finish="onFinish"
        @click-tab="onClickTab"
      >
        <template #option="{ option }">
          <section class="option_item">
            <span>{{ option[labelKey] }}</span>
            <section class="option_item_right" @click.stop="clickItem(option)">
              <van-icon
                class="icon_checked"
                :class="{ selected: selectData.indexOf(option[valueKey]) >= 0 }"
                name="checked"
              />
            </section>
          </section>
        </template>
      </van-cascader>
      <section class="btn_list">
        <!-- <section class="tips">
          <p>当前选择部门:</p>
          <p>&nbsp;&nbsp;当前选择部门:</p>
        </section> -->
        <section class="submit active" @click="goSelect">确定</section>
      </section>
    </van-popup>
  </section>
</template>
<script lang="ts">
import { defineComponent, ref, watch, computed, SetupContext } from 'vue'
import { useVModel } from '@vueuse/core'
import { get, cloneDeep } from 'lodash-es'
import { Toast } from 'vant'

export default defineComponent({
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    modelValue: {
      type: [String, Object, Array],
      default: () => []
    },
    options: {
      type: [Array],
      default: () => []
    },
    mapper: {
      type: Object,
      default: () => {
        return {
          text: 'text',
          value: 'value',
          children: 'children'
        }
      }
    },
    lazy: {
      type: Boolean,
      default: false
    },
    lazyLoad: {
      type: Function
    }
  },
  emits: ['update:visible', 'update:modelValue', 'change'],
  setup (props: any, ctx: SetupContext) {
    // const store = useStore()
    const show = useVModel(props, 'visible', ctx.emit)
    const valueKey = computed(() => get(props, 'mapper.value', 'value'))
    const labelKey = computed(() => {
      return get(props, 'mapper.text', '') || get(props, 'mapper.label', 'label')
    })
    const childrenKey = computed(() => get(props, 'mapper.children', 'children'))
    const optionList = computed(() => props.options || [])

    const selectData: any = ref([])
    const currentList: any = ref([])
    const currentTab = ref(0)
    const cascaderValue = ref('')

    const initData = () => {
      cascaderValue.value = props.modelValue ? props.modelValue[props.modelValue.length - 1] : ''
      selectData.value = props.modelValue || []
      currentList.value =findTabs(selectData.value,optionList.value)
    }
    function findTabs (values:[], options:[]) {
      const tabs:any = []
      findCurrentTab(options,  0)
      return tabs
      function findCurrentTab (op:[],  index:number) {
        if (index < values.length) {
          const tab = op.find(item => item[valueKey.value] === values[index])
          tabs.push(tab)
          if (tab&&tab[childrenKey.value]) {
            findCurrentTab(tab[childrenKey.value], index + 1)
          }
        }
      }
    }

    watch(() => {
      return props.modelValue
    }, () => {
      initData()
    }, { deep: true })
    initData()


    const clickItem = (item: any) => {
      if (item.disabledSelect) {
        return Toast('该层级不可选择')
      }
      if (currentList.value.length > 0) {
        const parent = currentList.value.slice(0, currentTab.value).map((item: any) => item[valueKey.value])
        selectData.value = [...parent, item[valueKey.value]]
      } else {
        selectData.value = [item[valueKey.value]]
      }
    }
    const onClickTab = tabIndex => {
      currentTab.value = tabIndex
    }
    const onChange = async ({ value, selectedOptions, tabIndex }: any) => {
      currentList.value = selectedOptions
      currentTab.value = tabIndex + 1
      if (props.lazy && props.lazyLoad) {
        const children = await props.lazyLoad({ value, selectedOptions, tabIndex })
        if (children && children.length) {
          selectedOptions[selectedOptions.length - 1].children = children
        }
      }
    }
    const onFinish = ({ selectedOptions }: any) => {
      selectData.value = selectedOptions.map((item: any) => item[valueKey.value])
      // show.value = false
    }

    const goSelect = () => {
      ctx.emit('update:modelValue', selectData.value)
      ctx.emit('change', selectData.value)
      ctx.emit('update:visible', false)
    }

    return {
      show,
      selectData,
      valueKey,
      labelKey,
      childrenKey,

      optionList,
      cascaderValue,

      get,
      cloneDeep,
      clickItem,
      onChange,
      onFinish,
      goSelect,
      onClickTab
    }
  },
})
</script>
<style lang="scss" scoped>
.popup_mask {
  ::v-deep .van-popup {
    .van-cascader {
      .van-cascader__selected-icon {
        display: none;
      }
    }
  }
}

:deep(.van-cascader__option) {
  position: relative;
}

//
.option_item {
  width: 100%;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #999 !important;

  .option_item_right {
    position: absolute;
    width: 60px;
    height: 100%;
    right: 0;
    z-index: 10;
    display: flex;
    justify-content: center;
    align-items: center;

    .selected {
      &::before {
        color: #488DEC !important;
      }
    }

    .icon_checked {
      width: 20px;
      height: 20px;
      font-size: 18px;
      text-align: center;
      line-height: 20px;

      &::before {
        width: 100%;
        height: 100%;
      }
    }
  }

  &.active {
    color: #488DEC !important;
  }
}

.btn_list {
  width: 100%;
  // height: 40px;
  background: #fff;
  padding: 0px 7px;
  box-shadow: 0 1px 6px 0 rgba(34, 123, 124, 0.1);
  display: flex;
  align-items: center;

  .tips {
    flex: 1;
    margin: 8px;
    padding: 0;
    font-size: 14px;
    color: #333;
    line-height: 20px;
    text-align: justify;
  }

  .submit {
    flex: 1;
    border-radius: 4px;
    padding: 10px 12px;
    border: 1px solid $primary-color;
    background: #fff;
    font-size: 16px;
    color: $primary-color;
    text-align: center;
    line-height: 20px;
    margin: 8px;

    &.active {
      background: $primary-color;
      color: #fff;
    }
  }
}
</style>
