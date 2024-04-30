<template>
  <Block :data="data" :fields="fields" > </Block>
</template>
<script lang="ts" setup>
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