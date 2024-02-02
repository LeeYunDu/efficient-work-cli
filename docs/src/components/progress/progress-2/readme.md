

<script setup>
import { ref} from 'vue'
import Progress from './progress-2.vue'
let  data = ref([  { y1:'10000',y2:55 }])

</script>
# Progress
## 使用说明
Svg 实现环形进度条，常用驾驶舱项目

自定义环形颜色、支持渐变色

## 示例
<Progress :data="data" > </Progress>
``` vue
<template>
  <Progress :data="data" > </Progress>
</template>
<script lang="ts" setup>
import { ref} from 'vue'
import Progress from './progress-1.vue'
let  data = ref([  { y1:'10000',y2:55 }])


</script>
```
## Attributes

| 属性名      | 说明        |  类型         |  默认值       | 
| :---        | :---   |   :---  |:----: |
| data   | 数据集合        | array      |—  |

## Block 源代码

::: details 查看源代码
``` vue 
<template>
  <template v-for="(item, index) in propsData" :key="index">
    <div class="progress-box">
      <div class="circle">
        <svg class="svg-box" viewBox="0 0 140 140">
          <defs>
            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style="stop-color:#0E6CF8;stop-opacity:1" />
              <stop offset="100%" style="stop-color:#FF7E06;stop-opacity:1" />
            </linearGradient>
          </defs>
          <path id="path" d="M 70,70 m 0,-65 a 65,65 0 1 0 0,130 a 65,65 0 1 0 0,-130" stroke-linecap="round" fill="none"
                stroke-dasharray="408 408" :stroke-dashoffset="((408 - 408 * get(item, 'y2', 0) / 100) * -1)"
                stroke="url(#grad1)" stroke-width="5" />
        </svg>
        <div class="count-value">
          <div class="value-div flex f-aic">
            <span :id="`${get(item, 'x1', 0)}_value`" class="value">{{ get(item, 'y1', 0) }}</span>
            <span class="unit">件</span>
          </div>
          <div :id="`${get(item, 'x1', 0)}_percent`" class="percent">{{ get(item, 'y2', 0) }}%</div>
        </div>
      </div>
    </div>
  </template>
</template>

<script lang="ts" setup>
import { get } from 'lodash-es'
import { computed } from 'vue'
const props = defineProps({
  data: {
    type: Object || Array,
    default: () => []
  },

})
const propsData = computed(() => props.data || [])
</script>

<style lang="scss" scoped>
.progress-box {

  .circle {
    width: 126px;
    height: 126px;
    border-radius: 50%;
    position: relative;

    .svg-box {
      position: absolute;
      left: -7.5px;
      top: -6px;
      width: 140px;
      height: 140px;
      z-index: 11;

      #path {
        transition: stroke-dasharray 0.6s ease 0s, stroke 0.6s ease 0s, opacity 0.6s ease 0s;
      }
    }

    &::after {
      content: '';
      width: 126px;
      height: 126px;
      border-radius: 50%;
      background: linear-gradient(180deg, #7DA1FF 0%, rgba(86, 154, 255, 0) 100%), linear-gradient(238deg, #85FFD3 0%, rgba(255, 255, 255, 0) 38%);
      position: absolute;
      opacity: .3;
    }

    .count-value {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 24px;
      display: flex;
      justify-content: center;
      flex-wrap: wrap;

      .value-div {
        display: flex;
        align-items: center;
      }


      .value {
        font-size: 24px;
        font-family: D-DIN;
        font-weight: bold;
        color: block;
      }

      .unit {
        font-size: 16px;
        font-weight: 400;
        color: #A6BFE4;
        margin-left: 6px;
      }

      .percent {
        font-size: 16px;
        font-family: D-DIN;
        font-weight: 400;
        color: #8EBBFF;
        margin-top: 6px;
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