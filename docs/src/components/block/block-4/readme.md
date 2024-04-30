

<script setup>
import { ref} from 'vue'
import Block from './block-4.vue'
let  data = ref([
  { label:'人才服务',icon:'service/service-icon-04.png',info:'人才认定、人才就业',path:'' },
  { label:'金融服务',icon:'service/service-icon-03.png',info:'银行贷款、上市服务',path:'' },
  { label:'科技服务',icon:'service/service-icon-02.png',info:'产学研合作、资源共享',path:'' },
  { label:'法律服务',icon:'service/service-icon-01.png',info:'法律咨询、法律援助',path:'' },
])
</script>
# Block
## 使用说明
常用于移动端

应用模块Block - 左边信息，右边图片
## 示例
<Block  :fields="data" > </Block>
``` vue
<template>
  <Block :data="data" :fields="fields" > </Block>
</template>
<script lang="ts" setup>
import { ref} from 'vue'
import Block from './block-4.vue'
let  data = ref([
  { label:'人才服务',icon:'service/service-icon-04.png',info:'人才认定、人才就业',path:'' },
  { label:'金融服务',icon:'service/service-icon-03.png',info:'银行贷款、上市服务',path:'' },
  { label:'科技服务',icon:'service/service-icon-02.png',info:'产学研合作、资源共享',path:'' },
  { label:'法律服务',icon:'service/service-icon-01.png',info:'法律咨询、法律援助',path:'' },
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
          <div class="info-box">
            <span class="label">{{ item.label }}</span>
            <div class="value-box">
              <span class="value">{{ item.info }}</span>
            </div>
          </div>
          <img class="icon" :src="`static/images/${item.icon}`" alt="">
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
  flex-direction: column;
  align-items: center;
  .item {
    width: 100%;
    &~.item{
      margin-top: 12px;
    }
    flex: 1;
    .main {
      border-radius: 4px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 88px;
      background: #FFFFFF;
      border-radius: 10px 10px 10px 10px;
      padding: 0 24px;
      .icon{
        width: 50px;
        height: 50px;
        margin-right: 6px;
      }
      .label {
        font-family: Source Han Sans CN, Source Han Sans CN;
        font-weight: bold;
        font-size: 14px;
        color: #363A44;
        text-align: left;
        font-style: normal;
        text-transform: none;
        height: 21px;
        margin-bottom: 6px;
      }
      .info-box{
        display: flex;
        flex-direction: column;
        padding-top: 3px;
      }
      .value-box {
        display: flex;
        align-items: center;
        .value {
          font-family: Source Han Sans CN, Source Han Sans CN;
          font-weight: 400;
          font-size: 12px;
          color: #888888;
          text-align: left;
          font-style: normal;
          text-transform: none;
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