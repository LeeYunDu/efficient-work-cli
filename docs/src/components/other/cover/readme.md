# Cover 封面
## 使用说明
用于带有显示图片的列表Item渲染。比如楼宇空间列表渲染时可能就需要显示宣传视频/区位图等静态资源。
PC端跟移动端都适用。v-viewer 很好的支持了移动端图片预览

1. video类型和image类型的区分
2. 图片支持预览模式

## 注意事项

1. 图片预览需要安装依赖 [v-viewer](https://github.com/mirari/v-viewer/tree/v3)
``` npm 
npm install v-viewer viewerjs
```
2. 示例项目为https地址，引入项目后需要调整下静态资源的加载地址，比如添加服务器前缀。
3. 暂无图片的开发


## 示例



:::preview 

demo-preview=./demo.vue

:::
## Attributes

| 属性名      | 说明        |  类型         |  默认值       | 
| :---        | :---   |   :---  |:----: |
| data   | 数据集合        | string / array      |—  |
| itemClass   | 自定义类名        | string       |—  |
| itemStyle   | 自定义样式       | string       |—  |

## Cover 源代码

::: details 查看源代码
``` vue


<template>
  <div class="">
    <viewer :images="data" class="flex">
      <template v-for="(item,index) in data" :key="index">
        <img
          class="cover-image"
          :src="item"
        >
      </template>
    </viewer>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
let props = defineProps({
  data:{
    type:Array,
    default:()=>[]
  },
})
</script>

<style lang="scss" scoped>
 
</style>


```

<style module>
.button {
  color: red;
  font-weight: bold;
}
</style>