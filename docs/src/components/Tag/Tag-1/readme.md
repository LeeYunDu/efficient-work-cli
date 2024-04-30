

<script setup>
</script>
# Block
## 使用说明
一个项目公用的Tag组件，自定义多种类型
## 示例


:::preview 

demo-preview=./demo.vue

:::

## Attributes

| 属性名      | 说明        |  类型         |  默认值       | 
| :---        | :---   |   :---  |:----: |
| label   | 名称        | string      |—  |
| type   | 类型     | string      | —  |


## Block 源代码
::: details 查看源代码
``` vue

<template>
  <div :class="[type,'tag']">{{ label }}</div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'

let props = defineProps({
  label:{
    type:String,
    default:''
  },
  type:{
    type:String,
    default:''
  },

})


</script>

<style lang="scss" scoped>

.tag{
  display: inline-block;
  padding: 6px 12px;
  background: rgba(132,147,172,0.1);
  border-radius: 4px;
  opacity: 1;
  color: #8493AC;
  font-size: 12px;
  text-align: center;

  &~.tag{
    margin-left: 5px;
  }

  &.blue{
    color: rgba(46, 124, 253, 1);
    background: rgba(46, 124, 253, 0.10);
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