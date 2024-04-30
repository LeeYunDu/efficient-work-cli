<template>
  <div class="filter" @click="state.show=true">打开</div>
  <SelectPanel
    v-model="state.show"
    v-model:params="curParams"
    :groups="items"
    @submit="asyncData"
  />
</template>

<script setup lang="ts">
import { ref , reactive } from 'vue'
import SelectPanel from './selectPanel.vue'
let state = reactive({
  data:[],
  show:false,
  total:0
})
let curParams = ref({

})

const items = ref([
  { label: '银行机构', key: 'bankName', children: ['不限', '临安农商银行', '工商银行杭州临安支行', '农业银行杭州临安支行', '兴业银行杭州临安支行', '浦发银行杭州临安支行'] },
  { label: '面向对象', key: 'customer', children: ['不限', '小微企业', '大中型企业', '科创企业', '农村市场', '固投项目'] },
  { label: '担保方式', key: 'guarantee', children: ['不限', '信用', '第三方保证', '抵押', '质押', '担保公司担保'] },
  { label: '产品类型', key: 'productType', children: ['不限', '贷款产品', '存款产品', '其他'] }
].map(e=>{
  e.children = e.children.map(children=>{
    return {
      label:children,
      value:children
    }
  })
  return e
}))

function asyncData(){}
</script>