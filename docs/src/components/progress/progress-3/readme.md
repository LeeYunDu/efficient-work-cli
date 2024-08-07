

<script setup>

</script>
# Progress-3
## 使用说明

简单版审核记录进度

## 示例


:::preview 

demo-preview=./demo.vue

:::

## Attributes

| 属性名      | 说明        |  类型         |  默认值       | 
| :---        | :---   |   :---  |:----: |
| data   | 数据集合        | array      |—  |

## Progress 源代码

::: details 查看源代码
``` vue 

<template>
  <div class="timeline-component">
    <template v-for="(item, index) in activities" :key="index">
      <div class="timeline-item">
        <div class="header">
          <div class="dot">
            <!-- <img src="static/images/talents/dot-1.png" class="dot" alt=""> -->
             
          </div>
          <div class="title">【部门初审】</div>
          <div class="info-1">操作人【人才办】备份</div>
          <div class="info-2">提交人才信息备份</div>
        </div>
        <div class="timeline-main">
          <div class="timeline-info-list">
            <div class="info-item">
              <div class="label">审核结果：</div>
              <div class="value">未通过</div>
            </div>
            <div class="info-item">
              <div class="label">审核意见：</div>
              <div class="value">需人员变更</div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
let props = defineProps({
  data: {
    type: Array,
    default: () => []
  }
})

let state = reactive({
  data: [],
  show: false
})

const activities = [
  {
    content: 'Event start',
    timestamp: '2018-04-15'
  },
  {
    content: 'Approved',
    timestamp: '2018-04-13'
  },
  {
    content: 'Success',
    timestamp: '2018-04-11'
  }
]
</script>

<style lang="scss" scoped>
.timeline-component {
  .header {
    display: flex;
    align-items: center;
    .second {
      font-family: PingFangSC, PingFang SC;
      font-weight: 400;
      font-size: 14px;
      color: #246bfc;
    }
    .title {
      height: 20px;
      font-family: PingFangSC, PingFang SC;
      font-weight: 500;
      font-size: 14px;
      color: #1f1f1f;
      line-height: 20px;
      margin: 0 8px;
    }
    .info-1{
      font-family: PingFangSC, PingFang SC;
      font-weight: 400;
      font-size: 14px;
      color: #246bfc;
    }
    .info-2{
      font-family: PingFangSC, PingFang SC;
      font-weight: 400;
      font-size: 14px;
      color: #191919;
      margin: 0 12px;
    }
    .dot {
      width: 16px;
      background: red;
      border-radius: 50%;
    }
  }
  .timeline-main{
    position: relative;
    padding: 5px 19px;
    margin: 0 0 3px 7px;
    height: auto;
    &::after{
      content: '';
      width: 1px;
      height: 100%;
      opacity: 1;
      background: #DCDCDC;
      position: absolute;
      left: 0px;
      top: 5px;
      margin-top: -5px;

    }

    .timeline-info-list{
      display: flex;
      flex-direction: column;
      .info-item{
        font-family: PingFangSC, PingFang SC;
        font-weight: 400;
        font-size: 14px;
        color: #6E6E6E;
        margin-bottom: 8px;
        display: flex;
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