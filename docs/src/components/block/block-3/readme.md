

<script setup>
import { ref} from 'vue'
import Block from './block-3.vue'
let  data = ref([
  {x1:'应用名称1',content:'一行文字简要概述'},
  {x1:'应用名称2',content:'一行文字简要概述'},
  {x1:'应用名称3',content:'一行文字简要概述'},
])
</script>
# Block
## 使用说明
常用于移动端

应用模块Block - 左边图片，右边信息
## 示例
<Block :data="data" :fields="fields" > </Block>
``` vue
<template>
  <Block :data="data" :fields="fields" > </Block>
</template>
<script lang="ts" setup>
import { ref} from 'vue'
import Block from './block-3.vue'
let  data = ref([
  {x1:'应用名称1',content:'一行文字简要概述'},
  {x1:'应用名称2',content:'一行文字简要概述'},
  {x1:'应用名称3',content:'一行文字简要概述'},
])
</script>
```
## Attributes

| 属性名      | 说明        |  类型         |  默认值       | 
| :---        | :---   |   :---  |:----: |
| data   | 数据集合        | array      |—  |

## Events

| 属性名      | 说明        |  类型         |  默认值       | 
| :---        | :---   |   :---  |:----: |
| change   | 当点击Block Item 触发的事件        | fields      |—  |

## Block 源代码
::: details 查看源代码
``` vue
<template>
  <section class="items">
    <template v-for="(item, index) in useFields" :key="item.key">
      <div class="item">
        <div class="main">
          <img class="icon" :src="`static/images/${item.icon}.png`" alt="">
          <div class="info-box">
            <span class="label">{{ item.label }}</span>
            <div class="value-box">
              <span class="value">{{ get(useData, item.key) }}</span>
              <span class="unit">{{ get(item,'unit','')}}</span>
            </div>
          </div>
        </div>
      </div>
    </template>
  </section>
</template>

<script setup lang="ts">
import { get } from 'lodash-es'
import { computed,ref,PropType } from 'vue'
import { FieldItem } from '@/typings/items'
const props = defineProps({
  data: {
    type: Object,
    default: () => ({})
  },
  fields:{
    type: Array as PropType<FieldItem[]>,
    default:()=>[]
  }
})

const useData = computed(() => props.data||[])
const useFields = computed(()=> props.fields||[])
</script>

<style lang="scss" scoped>
.items {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  overflow: auto;
  margin-left: -5px;
  margin-right: -5px;

  .item {
    padding: 5px;
    flex: 1;
    .main {
      border-radius: 4px;
      display: flex;
      .icon{
        width: 70px;
        height: 70px;
        margin-right: 10px;
      }
      .label {
        color: rgba(55, 59, 69, 1);
        font-size: 18px;
      }
      .value-box {
        display: flex;
        align-items: center;
        margin-top: 8px;
        .value {
          font-size: 28px;
          font-family: D-DIN-DIN-Bold, D-DIN-DIN;
          font-weight: bold;
          color: #0f3554;
        }
        .unit {
          font-size: 14px;
          font-family: Source Han Sans CN-Regular, Source Han Sans CN;
          font-weight: 400;
          margin-left: 4px;
        }
      }
    }
  }
}
</style>
``` 
:::

<style module>
.button {
  color: red;
  font-weight: bold;
}
</style>