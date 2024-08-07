

# Block
## 使用说明

应用模块Block - 文件列表
## 示例
<Block  :fields="data" > </Block>
:::preview 

demo-preview=./demo.vue

:::
## Attributes

| 属性名      | 说明        |  类型         |  默认值       | 
| :---        | :---   |   :---  |:----: |
| data   | 数据集合        | array      |—  |
| fields   | 数据集合        | array      |—  |

## Events

| 属性名      | 说明        |  类型         |  默认值       | 
| :---        | :---   |   :---  |:----: |

## Block 源代码
::: details 查看源代码
``` vue


<template>
  <div class="info-file-component">
    <template v-for="(item, index) in fields" :key="index">
      <div class="file-item">
        <div class="label">{{ item.label }}</div>
        <div class="file-box">
          <div class="file-name">文件名称</div>
          <div class="actions">
            <div class="btn-item">查看</div>
            <div class="btn-item">下载</div>
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
  },
  fields: {
    type: Array,
    default: () => {
      ;[]
    }
  }
})

let state = reactive({
  data: [],
  show: false
})
</script>

<style lang="scss" scoped>
.info-file-component {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .file-item {
    width: calc(50% - 14px);
    margin-bottom: 20px;
    .label {
      font-family: PingFangSC, PingFang SC;
      font-weight: 600;
      font-size: 14px;
      color: #191919;
      line-height: 20px;
      margin-bottom: 12px;
    }
    .file-box {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 40px;
      background: rgba(243, 248, 255, 0.9);
      border-radius: 4px;
      border: 1px solid #e6e6e6;
      padding-left: 12px;

      .file-name {
        height: 20px;
        font-family: PingFangSC, PingFang SC;
        font-weight: 400;
        font-size: 14px;
        color: #191919;
        line-height: 20px;
      }
      .actions {
        margin-left: auto;
        display: flex;
        .btn-item {
          font-family: PingFangSC, PingFang SC;
          font-weight: 400;
          font-size: 14px;
          color: #1c6adf;
          cursor: pointer;
          margin-right: 20px;
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