

<script setup>
import { ref} from 'vue'
import Block from './block-2.vue'
let  data = ref({y1:'1',y2:'2',y3:'3'})
let fields = ref([
  {
    label: '已入库', key: '', unit: '个', children: [
      { label: '签约项目', key: 'x2', unit: '个' },
      { label: '落地项目', key: 'x3', unit: '个' },
    ]
  },
  {
    label: '未入库', key: 'x4', unit: '个', children: [
      { label: '黄色预警', key: 'x5', unit: '个',class:'yellow' },
      { label: '红色预警', key: 'x6', unit: '个',class:'red' },
    ]
  },
  {
    label: '转化率', key: '', unit: '', children: [
      { label: '签约转化率', key: 'x7', unit: '%' },
      { label: '落地转化率', key: 'x8', unit: '%' },
    ]
  }
])

</script>
# Block
## 使用说明
指标统计组件 - 左边大数值，右边子数值组合
## 示例
<Block :data="data" :fields="fields" > </Block>
``` vue
<template>
  <Block :data="data" :fields="fields" > </Block>
</template>
<script lang="ts" setup>
import { ref} from 'vue'
import Block from './block-1.vue'
let  data = ref({y1:'1',y2:'2',y3:'3'})
let fields = ref([
  {
    label: '已入库', key: '', unit: '个', children: [
      { label: '签约项目', key: 'x2', unit: '个' },
      { label: '落地项目', key: 'x3', unit: '个' },
    ]
  },
  {
    label: '未入库', key: 'x4', unit: '个', children: [
      { label: '黄色预警', key: 'x5', unit: '个',class:'yellow' },
      { label: '红色预警', key: 'x6', unit: '个',class:'red' },
    ]
  },
  {
    label: '转化率', key: '', unit: '', children: [
      { label: '签约转化率', key: 'x7', unit: '%' },
      { label: '落地转化率', key: 'x8', unit: '%' },
    ]
  }
])
</script>
```
## Attributes

| 属性名      | 说明        |  类型         |  默认值       | 
| :---        | :---   |   :---  |:----: |
| data   | 数据集合        | array      |—  |
| fields   | 字段      | FieldItem[]      | —  |



## Events

| 属性名      | 说明        |  类型         |  默认值       | 
| :---        | :---   |   :---  |:----: |
| change   | 当点击Block Item 触发的事件        | fields      |—  |


## Block 源代码

::: details 查看源代码
``` vue
<template>
    <div class="block-group">
      <template v-for="(item, index) in useFields" :key="index">
        <div class="block" @click="onChange(item)">
          <div class="left">
            <div class="title">{{ item.label }}</div>
            <div v-if="item.key" class="value-box ">
              <span class="value">{{ get(data,item.key,'0') }}</span>
              <span class="unit">{{ item.unit }}</span>
            </div>
          </div>
          <div class="right">
            <template v-for="(children, childrenIndex) in item.children" :key="childrenIndex">
              <div class="children-item">
                <span class="label">{{ children.label }}</span>
                <div class="value-box ">
                  <span class="value" :class="[children.class??'']">{{ get(data,children.key,'0') }}</span>
                  <span class="unit">{{ children.unit }}</span>
                </div>
              </div>
            </template>
          </div>
        </div>
      </template>
    </div>
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

let emits = defineEmits(['change'])
function onChange(item){
  emits('change',item)
}

const useData = computed(() => props.data||[])
const useFields = computed(()=> props.fields||[])
</script>

<style lang="scss" scoped>
.block-group {
  flex: 1;
  display: flex;
  flex-direction: column;

  .block {
    flex: 1;
    max-width: 290px;
    background: rgba(93, 121, 160, 0.06);
    border-radius: 10px 10px 10px 10px;
    opacity: 1;
    display: flex;
    align-items: center;
    padding: 16px 16px 16px 32px;

    & ~ .block {
      margin-top: 10px;
    }

    .left {
      display: flex;
      height: 100%;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .title {
        height: 24px;
        font-size: 16px;
        font-family: Source Han Sans CN, Source Han Sans CN;
        font-weight: 400;
        color: #2D486E;
        line-height: 19px;
        margin-bottom: 10px;
      }

      .value-box {
        .value {
          height: 24px;
          font-size: 22px;
          font-family: D-DIN Exp-DINExp, D-DIN Exp-DINExp;
          font-weight: bold;
          color: #272C32;
          line-height: 26px;
        }

        .unit {
          font-size: 16px;
          font-family: Source Han Sans CN, Source Han Sans CN;
          font-weight: 400;
          color: #405066;
          margin-left: 6px;
        }
      }
    }

    .right {
      flex: 1;
      position: relative;
      margin-left: 33px;
      padding-left: 20px;
      position: relative;

      &::after {
        content: '';
        width: 1px;
        height: 30px;
        opacity: 1;
        border-left: 1px dashed #9BA3BA;
        position: absolute;
        left: 0;
        top: 50%;
        margin-top: -15px;
      }

      .children-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .label {
          font-size: 14px;
          font-family: Source Han Sans CN, Source Han Sans CN;
          font-weight: 400;
          color: #686B73;
        }

        .value-box {
          display: flex;
          align-items: center;
          .value {
            font-size: 18px;
            font-family: D-DIN Exp, D-DIN Exp;
            font-weight: 400;
            color: #272C32;
            line-height: 21px;

            &.yellow {
              color: #F8C434;
            }

            &.red{
              color: #EC2F2F;
            }
          }

          .unit {
            font-size: 14px;
            font-family: Source Han Sans CN, Source Han Sans CN;
            font-weight: 400;
            color: #405066;
            margin-left: 6px;
          }

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